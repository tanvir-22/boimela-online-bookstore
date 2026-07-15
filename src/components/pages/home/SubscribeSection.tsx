// components/sections/SubscribeSection.tsx
"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const SubscribeSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#7A2A2A] px-8 py-24 text-center">
      {/* faint brass rule top and bottom, like a bookplate border */}
      <div className="pointer-events-none absolute inset-x-8 top-6 h-px bg-[#C9A24B]/30" />
      <div className="pointer-events-none absolute inset-x-8 bottom-6 h-px bg-[#C9A24B]/30" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-md"
      >
        <span className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-[0.25em] text-[#C9A24B]">
          The Reading List
        </span>
        <h2 className="mt-3 font-['Fraunces'] text-3xl font-medium text-[#F7F2E7]">
          Join Our Newsletter
        </h2>
        <p className="mt-3 font-['Inter'] text-[#F7F2E7]/70">
          New arrivals, staff picks, and reading circle dates — once a month, no
          clutter.
        </p>

        <div className="mt-8 flex justify-center gap-0">
          <Input
            placeholder="Enter your email"
            className="rounded-none border-[#C9A24B]/40 bg-[#F7F2E7] font-['Inter'] text-[#1F3A2E] placeholder:text-[#1F3A2E]/40 focus-visible:ring-[#C9A24B]"
          />
          <Button className="flex shrink-0 items-center gap-2 rounded-none bg-[#C9A24B] font-['Inter'] font-medium text-[#1F3A2E] hover:bg-[#C9A24B]/90">
            <Mail size={16} /> Subscribe
          </Button>
        </div>
      </motion.div>
    </section>
  );
};
