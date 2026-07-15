"use client";

import { motion } from "framer-motion";
import { BookMarked, Stamp, MessagesSquare } from "lucide-react";

const features = [
  {
    icon: BookMarked,
    eyebrow: "For readers",
    title: "Hand-catalogued",
    body: "Every title is entered and described by our own team, not scraped from a feed — so listings are accurate down to the edition.",
  },
  {
    icon: Stamp,
    eyebrow: "For confidence",
    title: "Condition verified",
    body: "Each copy is checked against its listing before it ships, from first-print status to cover wear, so what you see is what arrives.",
  },
  {
    icon: MessagesSquare,
    eyebrow: "For questions",
    title: "Real booksellers, on call",
    body: "Reach an actual reader on our team for recommendations or order help — not a script, seven days a week.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function ServiceSection() {
  return (
    <section className="bg-[#F7F2E7] px-8 py-24 dark:bg-[#14201A]">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center font-mono text-xs tracking-widest text-[#1F3A2E]/50 dark:text-[#F7F2E7]/50"
        >
          WHY SHOP WITH US
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 text-center text-4xl text-[#1F3A2E] dark:text-[#F7F2E7]"
          style={{ fontFamily: "Fraunces, serif" }}
        >
          Built for people who read
        </motion.h2>

        <motion.div
          className="mt-14 grid gap-6 md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map(({ icon: Icon, eyebrow, title, body }) => (
            <motion.div
              key={title}
              variants={card}
              whileHover={{ y: -4 }}
              className="flex flex-col items-start border border-[#1F3A2E]/12 bg-[#FBF8F1] p-8 transition-colors hover:border-[#1F3A2E]/25 hover:shadow-sm dark:border-[#F7F2E7]/12 dark:bg-[#1B2A22]"
            >
              <motion.div
                whileHover={{ rotate: -8, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1F3A2E]/8 text-[#7A2A2A] dark:bg-[#F7F2E7]/8 dark:text-[#C9A24B]"
              >
                <Icon size={22} strokeWidth={1.75} />
              </motion.div>

              <p className="mt-6 font-mono text-[11px] tracking-widest text-[#1F3A2E]/50 dark:text-[#F7F2E7]/50">
                {eyebrow.toUpperCase()}
              </p>

              <h3
                className="mt-2 text-xl text-[#1F3A2E] dark:text-[#F7F2E7]"
                style={{ fontFamily: "Fraunces, serif" }}
              >
                {title}
              </h3>

              <p className="mt-3 text-[15px] leading-7 text-[#1F3A2E]/70 dark:text-[#F7F2E7]/70">
                {body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
