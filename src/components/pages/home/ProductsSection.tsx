
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookMarked } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getAllBooks } from "@/lib/book";
import { TBook } from "@/types/book";

export const FeaturedBooksSection = () => {
  const [books, setBooks] = useState<TBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const data = await getAllBooks();

        // Optional: highest-rated books
        const featured = [...data]
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 6);

        setBooks(featured);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#F7F2E7] py-20">
        <p className="text-center font-['Inter'] text-[#1F3A2E]/60">
          Bringing books to the shelf…
        </p>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#F7F2E7] py-24">
      {/* faint shelf rule under the heading, echoes a physical shelf edge */}
      <div className="container mx-auto px-6">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 border-b border-[#1F3A2E]/15 pb-8 sm:flex-row sm:items-end">
          <div>
            <span className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.25em] text-[#C9A24B]">
              From the shelf
            </span>
            <h2 className="mt-3 font-['Fraunces'] text-4xl font-medium tracking-tight text-[#1F3A2E]">
              Featured Books
            </h2>
            <p className="mt-2 max-w-md font-['Inter'] text-[#1F3A2E]/70">
              A shortlist worth pulling off the shelf this month.
            </p>
          </div>

          <Link href="/products" className="flex items-center">
            <Button
              variant="outline"
              className="border-[#1F3A2E]/30 text-[#1F3A2E] hover:bg-[#1F3A2E] hover:text-[#F7F2E7]"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>{" "}
          </Link>
        </div>

        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {books.slice(0, 6).map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group"
              style={{ perspective: "1000px" }}
            >
              <Link href={`/books/${book.id}`} className="block">
                {/* the cover rests flat, like a spine on a shelf, then tilts
                    forward on hover as if being pulled toward you */}
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

                  {/* brass foil rating ribbon, tucked at the top edge of the cover */}
                  <div
                    className="absolute left-1/2 top-0 flex -translate-x-[10%] items-center gap-1
                               bg-[#C9A24B] px-2 py-1 text-[#1F3A2E] shadow-sm
                               transition-transform duration-500 group-hover:-translate-y-1"
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)",
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
