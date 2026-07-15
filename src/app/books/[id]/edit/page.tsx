"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  BookOpen,
  DollarSign,
  Minus,
  Plus,
  Star,
  Package,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { getBookById, updateBook, deleteBook } from "@/lib/book";
import { isAdminUid } from "@/lib/admin";
import { useAuth } from "@/hooks/useAuth";

export default function EditBookPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    cover: "",
    pages: 300,
    price: 20,
    rating: 4.5,
    stock: 10,
  });

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

  // Load existing book
  useEffect(() => {
    if (!params?.id) return;

    getBookById(params.id)
      .then((book) => {
        if (!book) {
          toast.error("Book not found.");
          router.replace("/books");
          return;
        }

        setForm({
          title: book.title,
          author: book.author,
          genre: book.genre,
          description: book.description,
          cover: book.cover,
          pages: book.pages,
          price: book.price,
          rating: book.rating,
          stock: book.stock,
        });
      })
      .catch(() => {
        toast.error("Failed to load book. Please try again.");
      })
      .finally(() => setFetching(false));
  }, [params?.id, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: ["pages", "price", "rating", "stock"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!params?.id) return;

    try {
      setSaving(true);

      await updateBook(params.id, form);

      toast.success("Book updated successfully!");
      router.push("/products");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!params?.id) return;

    const confirmed = window.confirm(
      `Delete "${form.title || "this book"}"? This can't be undone.`,
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      await deleteBook(params.id);

      toast.success("Book deleted.");
      router.push("/products");
    } catch (err) {
      toast.error("Failed to delete book. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  if (loading || fetching || !user || !isAdminUid(user.uid)) return null;

  return (
    <main className="min-h-screen bg-[#F7F2E7] py-14">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col items-center gap-4 text-center"
        >
          <h1 className="font-['Fraunces'] text-5xl text-[#1F3A2E]">
            Edit Book
          </h1>

          <p className="font-['Inter'] text-[#1F3A2E]/60">
            Update the details or remove this title from the shelf.
          </p>
        </motion.div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-10 lg:grid-cols-[360px_1fr]"
        >
          {/* Preview */}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl border border-[#1F3A2E]/10 bg-white p-6 shadow-xl"
          >
            <div className="relative mx-auto aspect-[2/3] w-full overflow-hidden rounded-xl bg-[#EEE7D8]">
              {form.cover ? (
                <Image
                  src={form.cover}
                  fill
                  alt="Preview"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <BookOpen className="h-20 w-20 text-[#C9A24B]" />
                </div>
              )}
            </div>

            <div className="mt-6 text-center">
              <p className="font-['IBM_Plex_Mono'] uppercase tracking-[0.2em] text-[#7A2A2A]">
                {form.genre || "Genre"}
              </p>

              <h2 className="mt-2 font-['Fraunces'] text-2xl text-[#1F3A2E]">
                {form.title || "Book Title"}
              </h2>

              <p className="text-[#1F3A2E]/60">{form.author || "Author"}</p>

              <div className="mt-5 flex items-center justify-center gap-2">
                <Star className="h-5 w-5 fill-[#C9A24B] text-[#C9A24B]" />
                {form.rating}
              </div>
            </div>

            <Button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              variant="outline"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border-[#7A2A2A]/40 text-[#7A2A2A] hover:bg-[#7A2A2A]/5 disabled:opacity-60"
            >
              <Trash2 className="h-4 w-4" />
              {deleting ? "Deleting..." : "Delete Book"}
            </Button>
          </motion.div>

          {/* Form */}

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl border border-[#1F3A2E]/10 bg-white p-8 shadow-xl"
          >
            <div className="grid gap-6">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Book Title"
                className="rounded-xl border border-[#1F3A2E]/10 p-4 outline-none transition focus:border-[#C9A24B]"
              />

              <input
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Author"
                className="rounded-xl border border-[#1F3A2E]/10 p-4 outline-none transition focus:border-[#C9A24B]"
              />

              <input
                name="genre"
                value={form.genre}
                onChange={handleChange}
                placeholder="Genre"
                className="rounded-xl border border-[#1F3A2E]/10 p-4 outline-none transition focus:border-[#C9A24B]"
              />

              <input
                name="cover"
                value={form.cover}
                onChange={handleChange}
                placeholder="Cover Image URL"
                className="rounded-xl border border-[#1F3A2E]/10 p-4 outline-none transition focus:border-[#C9A24B]"
              />

              <textarea
                rows={6}
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Book Description..."
                className="rounded-xl border border-[#1F3A2E]/10 p-4 outline-none transition focus:border-[#C9A24B]"
              />

              <div className="grid gap-5 md:grid-cols-2">
                <div className="flex items-center rounded-xl border border-[#1F3A2E]/10 px-4">
                  <DollarSign className="text-[#C9A24B]" />
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full bg-transparent p-4 outline-none"
                  />
                </div>

                <div className="flex items-center rounded-xl border border-[#1F3A2E]/10 px-4">
                  <Package className="text-[#C9A24B]" />
                  <input
                    type="number"
                    name="pages"
                    value={form.pages}
                    onChange={handleChange}
                    className="w-full bg-transparent p-4 outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block font-medium text-[#1F3A2E]">
                    Rating
                  </label>

                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    name="rating"
                    value={form.rating}
                    onChange={handleChange}
                    className="w-full accent-[#C9A24B]"
                  />

                  <div className="mt-2 flex items-center gap-2">
                    <Star className="h-5 w-5 fill-[#C9A24B] text-[#C9A24B]" />
                    {form.rating}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-medium text-[#1F3A2E]">
                    Stock
                  </label>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        setForm((p) => ({
                          ...p,
                          stock: Math.max(0, p.stock - 1),
                        }))
                      }
                      className="rounded-lg border p-2"
                    >
                      <Minus />
                    </button>

                    <span className="text-2xl font-semibold">{form.stock}</span>

                    <button
                      type="button"
                      onClick={() =>
                        setForm((p) => ({
                          ...p,
                          stock: p.stock + 1,
                        }))
                      }
                      className="rounded-lg border p-2"
                    >
                      <Plus />
                    </button>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={saving}
                className="mt-6 h-14 rounded-xl bg-[#C9A24B] text-lg font-semibold text-[#1F3A2E] hover:bg-[#b9923e] disabled:opacity-60"
              >
                {saving ? "Saving Changes..." : "Save Changes"}
              </Button>
            </div>
          </motion.div>
        </form>
      </div>
    </main>
  );
}
