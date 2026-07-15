"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import {
  subscribeToCart,
  setCartQuantity,
  removeFromCart,
  clearCart,
  TCartItem,
} from "@/lib/cart";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { decreaseBookStock } from "../../lib/book";
function CartContent() {
  const { user } = useAuth();
  const [items, setItems] = useState<TCartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeToCart(user.uid, (cartItems) => {
      setItems(cartItems);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleQuantityChange = async (bookId: string, quantity: number) => {
    if (!user) return;
    await setCartQuantity(user.uid, bookId, quantity);
  };

  const handleRemove = async (bookId: string) => {
    if (!user) return;
    await removeFromCart(user.uid, bookId);
  };

  const handleProceedToPayment = () => {
    setConfirmOpen(true);
  };

  const handleConfirmPayment = async () => {
    if (!user) return;
    setPaying(true);
    try {
      // No payment gateway wired up yet — this simulates a successful charge.
     await new Promise((resolve) => setTimeout(resolve, 900));

     await Promise.all(
       items.map((item) => decreaseBookStock(item.bookId, item.quantity)),
     );

     await clearCart(user.uid);
      setConfirmOpen(false);
      setPaymentDone(true);
    } catch (error) {
      console.error("Failed to complete payment:", error);
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#F7F2E7]">
        <p className="font-['Inter'] text-[#1F3A2E]/60">Loading your cart…</p>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-[#F7F2E7] py-16">
      <div className="container mx-auto px-6">
        <div className="mb-12 border-b border-[#1F3A2E]/15 pb-6">
          <span className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.25em] text-[#C9A24B]">
            Your basket
          </span>
          <h1 className="mt-2 font-['Fraunces'] text-4xl font-medium tracking-tight text-[#1F3A2E]">
            Cart
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <ShoppingBag className="h-10 w-10 text-[#1F3A2E]/25" />
            <p className="font-['Inter'] text-[#1F3A2E]/60">
              Your cart is empty.
            </p>
            <Link href="/products">
              <Button className="bg-[#C9A24B] font-['Inter'] font-medium text-[#1F3A2E] hover:bg-[#C9A24B]/90">
                Browse Books
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
            {/* line items, ledger rows again for consistency */}
            <div className="divide-y divide-[#1F3A2E]/10 border-y border-[#1F3A2E]/10">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-5 py-6">
                  <div className="relative h-24 w-16 shrink-0 shadow-[0_8px_16px_-8px_rgba(31,58,46,0.35)]">
                    <Image
                      src={item.cover}
                      alt={`Cover of ${item.title}`}
                      fill
                      className="rounded-[2px] object-cover ring-1 ring-[#1F3A2E]/10"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-['Fraunces'] text-lg text-[#1F3A2E]">
                      {item.title}
                    </h3>
                    <p className="font-['Inter'] text-sm text-[#1F3A2E]/55">
                      {item.author}
                    </p>
                    <p className="mt-1 font-['Inter'] text-sm text-[#1F3A2E]">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center border border-[#1F3A2E]/15">
                    <button
                      type="button"
                      onClick={() =>
                        handleQuantityChange(item.bookId, item.quantity - 1)
                      }
                      className="flex h-8 w-8 items-center justify-center text-[#1F3A2E] hover:bg-[#1F3A2E]/5"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center font-['Inter'] text-sm text-[#1F3A2E]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleQuantityChange(item.bookId, item.quantity + 1)
                      }
                      className="flex h-8 w-8 items-center justify-center text-[#1F3A2E] hover:bg-[#1F3A2E]/5"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <p className="w-20 text-right font-['Fraunces'] text-[#1F3A2E]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleRemove(item.bookId)}
                    className="text-[#7A2A2A]/60 transition-colors hover:text-[#7A2A2A]"
                    aria-label={`Remove ${item.title}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* summary */}
            <div className="h-fit border border-[#1F3A2E]/15 bg-white p-8">
              <h2 className="font-['Fraunces'] text-xl text-[#1F3A2E]">
                Order Summary
              </h2>

              <div className="mt-6 space-y-3 border-b border-[#1F3A2E]/10 pb-6 font-['Inter'] text-sm">
                <div className="flex justify-between text-[#1F3A2E]/70">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#1F3A2E]/70">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
              </div>

              <div className="mt-6 flex justify-between font-['Fraunces'] text-xl text-[#1F3A2E]">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <Button
                onClick={handleProceedToPayment}
                size="lg"
                className="mt-8 w-full bg-[#C9A24B] font-['Inter'] font-medium text-[#1F3A2E] hover:bg-[#C9A24B]/90"
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* payment confirmation dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="border-[#1F3A2E]/15 bg-[#F7F2E7]">
          <DialogHeader>
            <DialogTitle className="font-['Fraunces'] text-[#1F3A2E]">
              Confirm Payment
            </DialogTitle>
            <DialogDescription className="font-['Inter'] text-[#1F3A2E]/65">
              Are you sure you want to proceed with the payment of $
              {subtotal.toFixed(2)}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmOpen(false)}
              disabled={paying}
              className="border-[#1F3A2E]/30 font-['Inter'] text-[#1F3A2E]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmPayment}
              disabled={paying}
              className="bg-[#C9A24B] font-['Inter'] font-medium text-[#1F3A2E] hover:bg-[#C9A24B]/90"
            >
              {paying ? "Processing…" : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* payment success dialog */}
      <Dialog open={paymentDone} onOpenChange={setPaymentDone}>
        <DialogContent className="border-[#1F3A2E]/15 bg-[#F7F2E7] text-center">
          <div className="flex flex-col items-center gap-4 py-4">
            <CheckCircle2 className="h-12 w-12 text-[#C9A24B]" />
            <DialogTitle className="font-['Fraunces'] text-2xl text-[#1F3A2E]">
              Payment Done
            </DialogTitle>
            <DialogDescription className="font-['Inter'] text-[#1F3A2E]/65">
              Your order has been placed. Your cart is now empty.
            </DialogDescription>
            <Link href="/products" className="mt-2 w-full">
              <Button className="w-full bg-[#C9A24B] font-['Inter'] font-medium text-[#1F3A2E] hover:bg-[#C9A24B]/90">
                Continue Browsing
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}

export default function CartPage() {
  return (
    <ProtectedRoute>
      <CartContent />
    </ProtectedRoute>
  );
}
