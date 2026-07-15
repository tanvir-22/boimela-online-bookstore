import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
  query,
  orderBy,
  increment,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { TBook } from "@/types/book";

const BOOKS_COLLECTION = "books";

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function getAllBooks(): Promise<TBook[]> {
  const q = query(collection(db, BOOKS_COLLECTION), orderBy("title"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<TBook, "id">),
  }));
}

export async function decreaseBookStock(bookId: string, quantity: number) {
  await updateDoc(doc(db, BOOKS_COLLECTION, bookId), {
    stock: increment(-quantity),
  });
}
export async function getBook(id: string): Promise<TBook | null> {
  const snap = await getDoc(doc(db, BOOKS_COLLECTION, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as Omit<TBook, "id">) };
}

export async function createBook(book: Omit<TBook, "id">): Promise<string> {
  let id = slugify(book.title);
  // avoid overwriting an existing doc if the slug collides
  const existing = await getDoc(doc(db, BOOKS_COLLECTION, id));
  if (existing.exists()) {
    id = `${id}-${Date.now().toString(36)}`;
  }
  await setDoc(doc(db, BOOKS_COLLECTION, id), book);
  return id;
}



// One-time migration from the old static booksData.ts array.
// Safe to call more than once — it overwrites by id, doesn't duplicate.
export async function seedBooks(initialBooks: TBook[]) {
  const batch = writeBatch(db);
  initialBooks.forEach((book) => {
    const { id, ...rest } = book;
    batch.set(doc(db, BOOKS_COLLECTION, id), rest);
  });
  await batch.commit();
}

export async function getBookById(id: string): Promise<TBook | null> {
  const ref = doc(db, "books", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return { id: snap.id, ...snap.data() } as TBook;
}

export async function updateBook(id: string, data: Partial<Omit<TBook, "id">>) {
  const ref = doc(db, "books", id);
  await updateDoc(ref, data);
}

export async function deleteBook(id: string) {
  const ref = doc(db, "books", id);
  await deleteDoc(ref);
}
