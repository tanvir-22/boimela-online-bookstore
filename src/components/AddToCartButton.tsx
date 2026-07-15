"use client";

import { useState } from "react";
import { Check, Loader2, Minus, Plus, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/cart";
import { useAuth } from "@/hooks/useAuth";
import { TBook } from "@/types/book";
import { useRouter } from "next/navigation";
export const AddToCartButton = ({ book }: { book: TBook }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "added" | "error">(
    "idle",
  );

  const inStock = book.stock > 0;

  const handleAddToCart = async () => {
    if (!user) // ProtectedRoute should prevent this, but guard anyway
    {
      router.push("/login");
      return;
    }
    try {
      await addToCart(user.uid, book, quantity);
      setStatus("added");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
    }
  };

  return (
    <div className="space-y-4">
      {/* quantity stepper, ledger-line style to match the rest of the page */}
      <div className="flex items-center gap-4 font-['Inter'] text-sm">
        <span className="text-[#1F3A2E]/55">Quantity</span>
        <div className="flex items-center border border-[#1F3A2E]/15">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={!inStock}
            className="flex h-9 w-9 items-center justify-center text-[#1F3A2E] hover:bg-[#1F3A2E]/5 disabled:opacity-30"
            aria-label="Decrease quantity"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-10 text-center text-[#1F3A2E]">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(book.stock, q + 1))}
            disabled={!inStock || quantity >= book.stock}
            className="flex h-9 w-9 items-center justify-center text-[#1F3A2E] hover:bg-[#1F3A2E]/5 disabled:opacity-30"
            aria-label="Increase quantity"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <Button
        size="lg"
        onClick={handleAddToCart}
        disabled={!inStock || status === "loading"}
        className="bg-[#C9A24B] font-['Inter'] font-medium text-[#1F3A2E] hover:bg-[#C9A24B]/90 disabled:opacity-40"
      >
        {status === "loading" && (
          <Loader2 className="mr-2 size-5 animate-spin" />
        )}
        {status === "added" && <Check className="mr-2 size-5" />}
        {status === "idle" && <ShoppingCart className="mr-2 size-5" />}
        {status === "error" && <ShoppingCart className="mr-2 size-5" />}

        {!inStock
          ? "Out of Stock"
          : status === "loading"
            ? "Adding…"
            : status === "added"
              ? "Added to Cart"
              : status === "error"
                ? "Try Again"
                : "Add to Cart"}
      </Button>
    </div>
  );
};
