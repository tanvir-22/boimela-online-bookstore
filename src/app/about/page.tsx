"use client";

import { motion } from "framer-motion";
import { BookOpen, Feather, Users, Quote, Library } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Bookshop color system — matches Hero.
 * ink #1F3A2E · brass #C9A24B · cloth #7A2A2A · parchment #F7F2E7
 * Fraunces (display) · Inter (body) · IBM Plex Mono (meta)
 */

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

const chapters = [
  {
    num: "01",
    year: "2024",
    title: "A reading habit outgrows its shelf",
    text: "It started as a spreadsheet of books we couldn't stop recommending to friends. Within a year the spreadsheet had a waiting list.",
  },
  {
    num: "02",
    year: "2025",
    title: "The catalogue gets its own address",
    text: "We built a home for that list online — every title hand-catalogued, every description written by someone who actually finished the book.",
  },
  {
    num: "03",
    year: "2026",
    title: "Open to readers everywhere",
    text: "Today the shelves are digital but the care isn't. Every order still gets packed by hand, on the same afternoon it's placed.",
  },
];

const values = [
  {
    icon: BookOpen,
    title: "Curated, not algorithmic",
    text: "Every title on our shelves has been read by someone on the team before it's listed — no bestseller lists, no filler.",
  },
  {
    icon: Feather,
    title: "Notes in the margins",
    text: "Staff picks come with a handwritten card tucked inside, the way a good friend would press a book into your hands.",
  },
  {
    icon: Library,
    title: "Built to be kept",
    text: "We favor editions worth keeping on a shelf for decades, not just getting through once.",
  },
  {
    icon: Users,
    title: "A community of readers",
    text: "Members trade recommendations, join monthly reading circles, and help shape what we stock next.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-[#F7F2E7] dark:bg-[#14201A]">
      {/* Intro */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "18px 18px",
            color: "#1F3A2E",
          }}
        />

        <motion.div
          className="container mx-auto max-w-3xl px-6 py-24 text-center"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
            <Badge className="rounded-none border border-[#1F3A2E]/30 bg-transparent px-3 py-1 font-mono text-xs tracking-widest text-[#1F3A2E] dark:border-[#C9A24B]/40 dark:text-[#F7F2E7]">
              OUR STORY
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-6 text-4xl font-normal leading-[1.1] tracking-tight text-[#1F3A2E] dark:text-[#F7F2E7] md:text-5xl"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            Books don&apos;t need to shout.
            <br />
            Neither do we.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[#1F3A2E]/70 dark:text-[#F7F2E7]/70"
          >
            We&apos;re a small team of readers who got tired of scrolling past
            books instead of falling into them. So we built a shop that reads
            more like a shelf you&apos;d trust.
          </motion.p>
        </motion.div>
      </section>

      {/* Chapters — origin story as a spine timeline */}
      <section className="container mx-auto max-w-3xl px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
          className="relative"
        >
          <div className="absolute left-[27px] top-2 bottom-2 w-px bg-[#1F3A2E]/15 dark:bg-[#F7F2E7]/15" />

          {chapters.map((c) => (
            <motion.div
              key={c.num}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="relative mb-14 pl-16 last:mb-0"
            >
              <div
                className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full border border-[#1F3A2E]/20 bg-[#F7F2E7] text-sm text-[#7A2A2A] dark:border-[#F7F2E7]/20 dark:bg-[#14201A] dark:text-[#C9A24B]"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {c.num}
              </div>

              <p
                className="text-xs tracking-widest text-[#C9A24B]"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {c.year}
              </p>

              <h3
                className="mt-2 text-2xl text-[#1F3A2E] dark:text-[#F7F2E7]"
                style={{ fontFamily: "Fraunces, serif" }}
              >
                {c.title}
              </h3>

              <p className="mt-3 max-w-lg text-[#1F3A2E]/70 dark:text-[#F7F2E7]/70">
                {c.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Values */}
      <section className="container mx-auto max-w-5xl px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
          className="grid gap-6 sm:grid-cols-2"
        >
          {values.map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full rounded-none border-[#1F3A2E]/15 bg-transparent shadow-none dark:border-[#F7F2E7]/15">
                <CardContent className="flex items-start gap-4 py-6">
                  <Icon className="mt-1 h-7 w-7 shrink-0 text-[#7A2A2A] dark:text-[#C9A24B]" />
                  <div>
                    <h3
                      className="text-lg text-[#1F3A2E] dark:text-[#F7F2E7]"
                      style={{ fontFamily: "Fraunces, serif" }}
                    >
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#1F3A2E]/70 dark:text-[#F7F2E7]/70">
                      {text}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Founder note — styled like the hero's member card */}
      <section className="container mx-auto max-w-3xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative border border-[#1F3A2E]/20 bg-[#EFE7D6] px-8 py-10 dark:border-[#F7F2E7]/15 dark:bg-[#1B2A22]"
        >
          <Quote className="h-8 w-8 text-[#C9A24B]" />
          <p
            className="mt-4 text-xl leading-8 text-[#1F3A2E] dark:text-[#F7F2E7]"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            We never wanted to be the biggest shop — just the one you&apos;d
            trust to hand you the right book at the right time.
          </p>
          <p
            className="mt-6 text-xs tracking-widest text-[#1F3A2E]/60 dark:text-[#F7F2E7]/60"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            — FOUNDING BOOKSELLER
          </p>
        </motion.div>
      </section>

      {/* Closing */}
      <section className="container mx-auto max-w-4xl px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-y border-[#1F3A2E]/15 py-14 text-center dark:border-[#F7F2E7]/15"
        >
          <h2
            className="text-3xl text-[#1F3A2E] dark:text-[#F7F2E7]"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            Come find your next read.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#1F3A2E]/70 dark:text-[#F7F2E7]/70">
            New arrivals go up every week, and the shelves are always open.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
