// lib/cart.ts

import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  getDocs,
  collection,
  writeBatch,
  onSnapshot,
  increment,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { TBook } from "@/types/book";

export type TCartItem = {
  id: string; // doc id === bookId
  bookId: string;
  title: string;
  author: string;
  price: number;
  cover: string;
  quantity: number;
  addedAt?: Timestamp;
  updatedAt?: Timestamp;
};

// Cart lives at: users/{uid}/cart/{bookId}

export async function addToCart(uid: string, book: TBook, quantity: number) {
  const cartItemRef = doc(db, "users", uid, "cart", book.id);
  const existing = await getDoc(cartItemRef);

  if (existing.exists()) {
    await setDoc(
      cartItemRef,
      { quantity: increment(quantity), updatedAt: serverTimestamp() },
      { merge: true },
    );
  } else {
    await setDoc(cartItemRef, {
      bookId: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      cover: book.cover,
      quantity,
      addedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
}

export async function removeFromCart(uid: string, bookId: string) {
  await deleteDoc(doc(db, "users", uid, "cart", bookId));
}

export async function setCartQuantity(
  uid: string,
  bookId: string,
  quantity: number,
) {
  if (quantity <= 0) {
    await removeFromCart(uid, bookId);
    return;
  }
  await setDoc(
    doc(db, "users", uid, "cart", bookId),
    { quantity, updatedAt: serverTimestamp() },
    { merge: true },
  );
}

// Live-subscribes to a user's cart. Returns the unsubscribe function.
export function subscribeToCart(
  uid: string,
  onChange: (items: TCartItem[]) => void,
) {
  const cartRef = collection(db, "users", uid, "cart");
  return onSnapshot(cartRef, (snapshot) => {
    const items = snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<TCartItem, "id">),
    }));
    onChange(items);
  });
}

// Deletes every item in the cart — used after a (currently simulated) payment.
export async function clearCart(uid: string) {
  const cartRef = collection(db, "users", uid, "cart");
  const snapshot = await getDocs(cartRef);

  const batch = writeBatch(db);
  snapshot.docs.forEach((d) => batch.delete(d.ref));
  await batch.commit();
}
