// components/sections/TestimonialSection.tsx
"use client";

import { motion } from "framer-motion";

type TTestimonial = {
  id: string;
  name: string;
  quote: string;
};

const testimonials: TTestimonial[] = [
  {
    id: "alice",
    name: "Alice Johnson",
    quote:
      "I walked in looking for one title and left with three I'd never heard of. That's the mark of a good bookseller.",
  },
  {
    id: "mark",
    name: "Mark Wilson",
    quote:
      "They tracked down an out-of-print copy I'd been searching for on and off for two years. Genuinely didn't think it existed anymore.",
  },
  {
    id: "sophia",
    name: "Sophia Lee",
    quote:
      "The reading circle is the best part of my month. Small group, good picks, no pressure to have finished the book.",
  },
];

export const TestimonialSection = () => {
  return (
    <section className="bg-[#F7F2E7] px-8 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.25em] text-[#C9A24B]">
            Word of mouth
          </span>
          <h2 className="mt-3 font-['Fraunces'] text-3xl font-medium text-[#1F3A2E]">
            What Readers Say
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="relative border border-[#1F3A2E]/12 bg-white p-8 shadow-[0_1px_2px_rgba(31,58,46,0.06)] transition-shadow hover:shadow-[0_12px_24px_-12px_rgba(31,58,46,0.25)]"
            >
              {/* oversized quote mark set in Fraunces, standing in for a
                  decorative drop-cap rather than a generic quote icon */}
              <span className="pointer-events-none absolute -top-3 left-6 font-['Fraunces'] text-6xl leading-none text-[#C9A24B]/30">
                “
              </span>

              <p className="relative font-['Inter'] text-[#1F3A2E]/75 leading-relaxed">
                {t.quote}
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-[#1F3A2E]/10 pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1F3A2E] font-['Fraunces'] text-sm text-[#C9A24B]">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h4 className="font-['Inter'] text-sm font-semibold text-[#1F3A2E]">
                  {t.name}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
