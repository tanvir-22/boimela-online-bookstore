// components/BookPagination.tsx

"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

export const BookPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Book catalog pages"
      className="mt-16 flex items-center justify-center gap-8 border-t border-[#1F3A2E]/10 pt-10"
    >
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`flex items-center gap-2 font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.15em] ${
          currentPage === 1
            ? "cursor-not-allowed text-[#1F3A2E]/25"
            : "text-[#1F3A2E] hover:text-[#C9A24B]"
        }`}
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Prev
      </button>

      {/* page numbers set like ledger entries, current page underlined in brass */}
      <ul className="flex items-center gap-5">
        {pages.map((p) => (
          <li key={p}>
            <button
              type="button"
              onClick={() => onPageChange(p)}
              className={`font-['Fraunces'] text-base transition-colors ${
                p === currentPage
                  ? "border-b-2 border-[#C9A24B] text-[#1F3A2E]"
                  : "border-b-2 border-transparent text-[#1F3A2E]/45 hover:text-[#1F3A2E]"
              }`}
            >
              {String(p).padStart(2, "0")}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-2 font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.15em] ${
          currentPage === totalPages
            ? "cursor-not-allowed text-[#1F3A2E]/25"
            : "text-[#1F3A2E] hover:text-[#C9A24B]"
        }`}
      >
        Next
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </nav>
  );
};
