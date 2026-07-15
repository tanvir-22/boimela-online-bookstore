"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Pencil, Trash2, Plus, BookOpen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getAllBooks, deleteBook } from "@/lib/book";
import { isAdminUid } from "@/lib/admin";
import { useAuth } from "@/hooks/useAuth";
import { TBook } from "@/types/book";

export default function ManageBooksPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [books, setBooks] = useState<TBook[]>([]);
  const [fetching, setFetching] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Auth guard
  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (!isAdminUid(user.uid)) {
      router.replace("/");
    }
  }, [loading, user, router]);

  // Load books
  useEffect(() => {
    if (loading || !user || !isAdminUid(user.uid)) return;

    getAllBooks()
      .then(setBooks)
      .catch(() => toast.error("Failed to load books."))
      .finally(() => setFetching(false));
  }, [loading, user]);

  async function handleDelete(book: TBook) {
    try {
      setDeletingId(book.id);

      await deleteBook(book.id);

      setBooks((prev) => prev.filter((b) => b.id !== book.id));

      toast.success("Book deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete book.");
    } finally {
      setDeletingId(null);
    }
  }

  if (loading || !user || !isAdminUid(user.uid)) return null;

  return (
    <main className="min-h-screen bg-[#F7F2E7] py-14">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex flex-col items-start justify-between gap-4 border-b border-[#1F3A2E]/15 pb-8 sm:flex-row sm:items-end"
        >
          <div>
            <span className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.25em] text-[#C9A24B]">
              Admin
            </span>
            <h1 className="mt-3 font-['Fraunces'] text-4xl font-medium tracking-tight text-[#1F3A2E]">
              Manage Books
            </h1>
            <p className="mt-2 font-['Inter'] text-[#1F3A2E]/70">
              {fetching ? "Loading…" : `${books.length} titles on the shelf.`}
            </p>
          </div>

          <Link href="/products/create">
            <Button className="flex items-center gap-2 rounded-xl bg-[#C9A24B] font-semibold text-[#1F3A2E] hover:bg-[#b9923e]">
              <Plus className="h-4 w-4" />
              Add Book
            </Button>
          </Link>
        </motion.div>

        {fetching ? (
          <p className="py-20 text-center font-['Inter'] text-[#1F3A2E]/50">
            Loading the shelf…
          </p>
        ) : books.length === 0 ? (
          <p className="py-20 text-center font-['Inter'] text-[#1F3A2E]/50">
            No books yet. Add your first one.
          </p>
        ) : (
          <div className="flex flex-col divide-y divide-[#1F3A2E]/10 border-t border-[#1F3A2E]/10">
            {books.map((book, i) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-5 py-4"
              >
                <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-md bg-[#EEE7D8]">
                  {book.cover ? (
                    <Image
                      src={book.cover}
                      fill
                      alt={book.title}
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <BookOpen className="h-6 w-6 text-[#C9A24B]" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-[0.15em] text-[#7A2A2A]">
                    {book.genre}
                  </p>
                  <h3 className="truncate font-['Fraunces'] text-lg text-[#1F3A2E]">
                    {book.title}
                  </h3>
                  <p className="truncate text-sm text-[#1F3A2E]/60">
                    {book.author}
                  </p>
                </div>

                <div className="hidden shrink-0 text-right sm:block">
                  <p className="font-['Inter'] text-sm text-[#1F3A2E]">
                    ${book.price}
                  </p>
                  <p className="font-['Inter'] text-xs text-[#1F3A2E]/50">
                    {book.stock} in stock
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <Link href={`/books/${book.id}/edit`}>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex items-center gap-2 rounded-xl border-[#1F3A2E]/20 text-[#1F3A2E] hover:bg-[#1F3A2E]/5"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="hidden sm:inline">Edit</span>
                    </Button>
                  </Link>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        disabled={deletingId === book.id}
                        className="flex items-center gap-2 rounded-xl border-[#7A2A2A]/30 text-[#7A2A2A] hover:bg-[#7A2A2A]/5"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="hidden sm:inline">
                          {deletingId === book.id ? "Deleting..." : "Delete"}
                        </span>
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="border-[#1F3A2E]/10 bg-[#F7F2E7]">
                      <DialogHeader>
                        <DialogTitle className="font-['Fraunces'] text-2xl text-[#1F3A2E]">
                          Delete Book
                        </DialogTitle>

                        <DialogDescription className="font-['Inter'] text-[#1F3A2E]/65">
                          Are you sure you want to permanently delete
                          <span className="font-semibold text-[#1F3A2E]">
                            {" "}
                            "{book.title}"
                          </span>
                          ?
                          <br />
                          This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>

                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          className="border-[#1F3A2E]/20"
                        >
                          Cancel
                        </Button>

                        <Button
                          type="button"
                          onClick={() => handleDelete(book)}
                          className="bg-[#7A2A2A] text-white hover:bg-[#6d2323]"
                        >
                          Delete Book
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
