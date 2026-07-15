// app/books/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { Star } from "lucide-react";

import { getBook } from "../../../lib/book";
import { AddToCartButton } from "@/components/AddToCartButton";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { TBook } from "@/types/book";

function BookDetailsContent() {
  const params = useParams<{ id: string }>();
  const [book, setBook] = useState<TBook | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBook(params.id)
      .then(setBook)
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#F7F2E7]">
        <p className="font-['Inter'] text-[#1F3A2E]/60">Loading…</p>
      </main>
    );
  }

  if (!book) {
    notFound();
  }

  const inStock = book.stock > 0;

  return (
    <main className="bg-[#F7F2E7] py-16">
      <div className="container mx-auto grid gap-16 px-6 lg:grid-cols-2">
        <div className="flex justify-center lg:justify-start">
          <div className="relative aspect-[2/3] w-full max-w-sm shadow-[0_24px_40px_-16px_rgba(31,58,46,0.35)]">
            <Image
              src={book.cover}
              alt={`Cover of ${book.title}`}
              fill
              className="rounded-[2px] object-cover ring-1 ring-[#1F3A2E]/10"
              priority
            />
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <span className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.25em] text-[#7A2A2A]">
              {book.genre}
            </span>
            <h1 className="mt-2 font-['Fraunces'] text-4xl font-medium tracking-tight text-[#1F3A2E]">
              {book.title}
            </h1>
            <p className="mt-1 font-['Inter'] text-[#1F3A2E]/60">
              by {book.author}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-[#C9A24B] text-[#C9A24B]" />
            <span className="font-['Inter'] text-sm text-[#1F3A2E]">
              {book.rating.toFixed(1)}
            </span>
          </div>

          <p className="font-['Inter'] leading-relaxed text-[#1F3A2E]/75">
            {book.description}
          </p>

          <div className="divide-y divide-[#1F3A2E]/10 border-y border-[#1F3A2E]/10 font-['Inter'] text-sm">
            <div className="flex items-center justify-between py-3">
              <span className="text-[#1F3A2E]/55">Pages</span>
              <span className="text-[#1F3A2E]">{book.pages}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-[#1F3A2E]/55">Availability</span>
              <span className={inStock ? "text-[#1F3A2E]" : "text-[#7A2A2A]"}>
                {inStock ? `${book.stock} in stock` : "Out of stock"}
              </span>
            </div>
          </div>

          <div className="font-['Fraunces'] text-4xl text-[#1F3A2E]">
            ${book.price.toFixed(2)}
          </div>

          <AddToCartButton book={book} />
        </div>
      </div>
    </main>
  );
}

export default function BookDetailsPage() {
  return (

      <BookDetailsContent />
   
  );
}
