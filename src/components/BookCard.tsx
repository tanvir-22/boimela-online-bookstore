

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookMarked, Check, Loader2, ShoppingCart } from "lucide-react";

import { TBook } from "@/types/book";
import { useAuth } from "@/hooks/useAuth";
import { addToCart } from "@/lib/cart";

export const BookCard = ({
  book,
  index = 0,
}: {
  book: TBook;
  index?: number;
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "added">("idle");

  const inStock = book.stock > 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    // card is wrapped in a Link — stop the click from also navigating
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      router.push("/login");
      return;
    }
    if (!inStock || status === "loading") return;

    setStatus("loading");
    try {
      await addToCart(user.uid, book, 1);
      setStatus("added");
      setTimeout(() => setStatus("idle"), 1500);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      setStatus("idle");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
      className="group"
      style={{ perspective: "1000px" }}
    >
      <Link href={`/books/${book.id}`} className="block">
        <div className="relative">
          <div
            className="relative mx-auto aspect-[2/3] w-[70%] origin-bottom
                       shadow-[0_10px_20px_-8px_rgba(31,58,46,0.35)]
                       transition-transform duration-500 ease-out
                       group-hover:-translate-y-2 group-hover:rotate-[-3deg]
                       group-hover:shadow-[0_28px_36px_-14px_rgba(31,58,46,0.45)]"
          >
            <Image
              src={book.cover}
              alt={`Cover of ${book.title}`}
              fill
              className="rounded-[2px] object-cover ring-1 ring-[#1F3A2E]/10"
              sizes="(max-width: 768px) 50vw, 300px"
            />
          </div>

          <div
            className="absolute left-1/2 top-0 flex -translate-x-[10%] items-center gap-1
                       bg-[#C9A24B] px-2 py-1 text-[#1F3A2E] shadow-sm
                       transition-transform duration-500 group-hover:-translate-y-1"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)",
            }}
          >
            <BookMarked className="h-3 w-3" />
            <span className="font-['IBM_Plex_Mono'] text-[11px] font-semibold">
              {book.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <span className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-[0.2em] text-[#7A2A2A]">
            {book.genre}
          </span>
          <h3 className="mt-1 font-['Fraunces'] text-lg font-medium text-[#1F3A2E] line-clamp-1">
            {book.title}
          </h3>
          <p className="font-['Inter'] text-sm text-[#1F3A2E]/60">
            {book.author}
          </p>
          <p className="mt-2 font-['Fraunces'] text-lg text-[#1F3A2E]">
            ${book.price.toFixed(2)}
          </p>
        </div>
      </Link>

      {/* quick add — outside the Link so the click doesn't navigate */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={!inStock || status === "loading"}
        className="mx-auto mt-4 flex w-[70%] items-center justify-center gap-2
                   border border-[#1F3A2E]/15 py-2 font-['Inter'] text-sm text-[#1F3A2E]
                   transition-colors hover:bg-[#1F3A2E] hover:text-[#F7F2E7]
                   disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#1F3A2E]"
      >
        {status === "loading" && (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        )}
        {status === "added" && <Check className="h-3.5 w-3.5" />}
        {status === "idle" && <ShoppingCart className="h-3.5 w-3.5" />}
        {!inStock
          ? "Out of Stock"
          : status === "loading"
            ? "Adding…"
            : status === "added"
              ? "Added"
              : "Add to Cart"}
      </button>
    </motion.div>
  );
};
