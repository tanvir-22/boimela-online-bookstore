"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * Bookshop color system — reuse everywhere for consistency.
 * ink #1F3A2E · brass #C9A24B · cloth #7A2A2A · parchment #F7F2E7
 * Fraunces (display) · Inter (body) · IBM Plex Mono (meta)
 *
 * npm install framer-motion
 */

const spines = [
  { h: 210, w: 26, color: "#1F3A2E" },
  { h: 240, w: 22, color: "#C9A24B" },
  { h: 190, w: 30, color: "#7A2A2A" },
  { h: 230, w: 20, color: "#F7F2E7", border: true },
  { h: 205, w: 26, color: "#1F3A2E" },
  { h: 245, w: 24, color: "#7A2A2A" },
  { h: 195, w: 22, color: "#C9A24B" },
  { h: 220, w: 28, color: "#1F3A2E" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F7F2E7] dark:bg-[#14201A]">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          color: "#1F3A2E",
        }}
      />

      <div className="container mx-auto grid min-h-[85vh] items-center gap-16 px-6 py-20 lg:grid-cols-2">
        {/* Left */}
        <motion.div
          className="max-w-xl"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
            <Badge className="rounded-none border border-[#1F3A2E]/30 bg-transparent px-3 py-1 font-mono text-xs tracking-widest text-[#1F3A2E] dark:border-[#C9A24B]/40 dark:text-[#F7F2E7]">
              EST. 2026 &middot; INDEPENDENT ONLINE BOOKSHOP
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-6 text-5xl font-normal leading-[1.05] tracking-tight text-[#1F3A2E] dark:text-[#F7F2E7] lg:text-6xl"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            Every book
            <br />
            has a next
            <span className="relative ml-3 inline-block text-[#7A2A2A] dark:text-[#C9A24B]">
              reader.
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="8"
                viewBox="0 0 200 8"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M0 5 Q 50 0 100 4 T 200 3"
                  stroke="#C9A24B"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mt-8 text-lg leading-8 text-[#1F3A2E]/70 dark:text-[#F7F2E7]/70"
          >
            Fiction, classics, and rare finds — catalogued by hand and shelved
            with care. Browse what our readers are adding next.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="/products">
              <Button
                size="lg"
                className="group rounded-none bg-[#7A2A2A] px-8 text-[#F7F2E7] transition-transform hover:bg-[#631F1F] active:scale-[0.97]"
              >
                Browse the shelves
              </Button>
            </Link>

            <Link href="/">
              <Button
                variant="outline"
                size="lg"
                className="rounded-none border-[#1F3A2E]/30 bg-transparent px-8 text-[#1F3A2E] transition-transform hover:bg-[#1F3A2E]/5 active:scale-[0.97] dark:border-[#F7F2E7]/30 dark:text-[#F7F2E7]"
              >
                New arrivals
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mt-12 flex divide-x divide-[#1F3A2E]/15 border-y border-[#1F3A2E]/15 py-5 dark:divide-[#F7F2E7]/15 dark:border-[#F7F2E7]/15"
          >
            {[
              { n: "12,400", label: "Titles catalogued" },
              { n: "15,200", label: "Members" },
              { n: "4.9", label: "Average rating" },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`flex-1 ${i === 0 ? "pr-6" : i === 2 ? "pl-6" : "px-6"}`}
              >
                <p
                  className="text-2xl text-[#1F3A2E] dark:text-[#F7F2E7]"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {s.n}
                </p>
                <p className="mt-1 text-sm text-[#1F3A2E]/60 dark:text-[#F7F2E7]/60">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — animated bookshelf */}
        <div className="relative flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-sm border border-[#1F3A2E]/10 bg-[#EFE7D6] p-10 shadow-sm dark:bg-[#1B2A22]"
          >
            <div className="flex items-end gap-[6px]">
              {spines.map((s, i) => (
                <motion.div
                  key={i}
                  style={{
                    width: s.w,
                    backgroundColor: s.color,
                    border: s.border ? "1px solid #1F3A2E33" : undefined,
                  }}
                  className="rounded-t-[2px] shadow-[inset_-3px_0_0_rgba(0,0,0,0.08)]"
                  initial={{ height: 0 }}
                  animate={{ height: s.h }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -6 }}
                />
              ))}
            </div>
            <div className="mt-1 h-3 w-full rounded-sm bg-[#1F3A2E]/80" />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 3 }}
              transition={{ duration: 0.5, delay: 1.2, ease: "easeOut" }}
              whileHover={{ rotate: 0, scale: 1.03 }}
              className="absolute -top-6 -right-6 w-44 border border-[#1F3A2E]/20 bg-[#F7F2E7] px-4 py-3 shadow-md"
            >
              <p
                className="text-[10px] tracking-widest text-[#1F3A2E]/60"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                MEMBER CARD
              </p>
              <p className="mt-1 font-semibold text-[#7A2A2A]">
                Save 20% today
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
