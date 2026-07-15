"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

import { booksData } from "../../data/bookdata";
import { getAllBooks } from "../../lib/book";
import { seedBooks } from "../../lib/book";
import { BookCard } from "@/components/BookCard";
import { BookPagination } from "@/components/BookPagination";
import { TBook } from "@/types/book";

const PAGE_SIZE = 6;

export default function BooksPage() {
  const [books, setBooks] = useState<TBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");

  useEffect(() => {
    getAllBooks()
      .then(setBooks)
      .finally(() => setLoading(false));
  }, []);

  const genres = useMemo(
    () => ["All", ...Array.from(new Set(books.map((b) => b.genre))).sort()],
    [books],
  );

  const filteredBooks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return books.filter((book) => {
      const matchesQuery =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q);
      const matchesGenre = genre === "All" || book.genre === genre;
      return matchesQuery && matchesGenre;
    });
  }, [books, query, genre]);

  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const pageBooks = filteredBooks.slice(start, start + PAGE_SIZE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setCurrentPage(1);
  };

  const handleGenreChange = (value: string) => {
    setGenre(value);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#F7F2E7]">
        <p className="font-['Inter'] text-[#1F3A2E]/60">Loading the shelf…</p>
      </main>
    );
  }

  return (
    <main className="bg-[#F7F2E7] py-20">
      <div className="container text-center mx-auto px-6">
        <div className="mb-10 border-b border-[#1F3A2E]/15 pb-8">
          <span className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.25em] text-[#C9A24B]">
            The full catalog
          </span>
          <h1 className="mt-3 font-['Fraunces'] text-4xl font-medium tracking-tight text-[#1F3A2E]">
            All Books
          </h1>
          <p className="mt-2 font-['Inter'] text-[#1F3A2E]/70">
            {books.length} titles on the shelf.
          </p>
        </div>

        <div className="relative mx-auto mb-3 sm:max-w-sm">
          <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1F3A2E]/40" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search by title or author…"
            className="w-full border-b border-[#1F3A2E]/20 bg-transparent py-2 pl-6 font-['Inter'] text-sm text-[#1F3A2E] placeholder:text-[#1F3A2E]/40 outline-none focus:border-[#C9A24B]"
          />
        </div>
        <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {genres.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => handleGenreChange(g)}
                className={`font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.1em] px-3 py-1.5 transition-colors ${
                  genre === g
                    ? "bg-[#1F3A2E] text-[#F7F2E7]"
                    : "border border-[#1F3A2E]/15 text-[#1F3A2E]/60 hover:border-[#1F3A2E]/40 hover:text-[#1F3A2E]"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {pageBooks.length === 0 ? (
          <p className="py-20 text-center font-['Inter'] text-[#1F3A2E]/50">
            No books match "{query}"{genre !== "All" ? ` in ${genre}` : ""}.
          </p>
        ) : (
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {pageBooks.map((book, i) => (
              <BookCard key={book.id} book={book} index={i} />
            ))}
          </div>
        )}

        <BookPagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
}
