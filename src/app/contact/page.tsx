"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

/**
 * Bookshop color system — matches Hero / About.
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

const EMPTY_FORM = { name: "", email: "", subject: "", message: "" };

const inputClasses =
  "rounded-none border-[#1F3A2E]/25 bg-transparent text-[#1F3A2E] placeholder:text-[#1F3A2E]/40 focus-visible:ring-[#7A2A2A]/40 dark:border-[#F7F2E7]/25 dark:text-[#F7F2E7] dark:placeholder:text-[#F7F2E7]/40";

const labelClasses =
  "text-xs tracking-widest text-[#1F3A2E]/70 dark:text-[#F7F2E7]/70";

export default function ContactPage() {
  const [form, setForm] = useState<any>(EMPTY_FORM);
  const [errors, setErrors] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(field: any) {
    return (e: any) => {
      setForm((f: any) => ({ ...f, [field]: e.target.value }));
      setErrors((er: any) => ({ ...er, [field]: undefined }));
    };
  }
  function validate() {
    const next: any = {};
    if (!form.name.trim()) next.name = "Tell us your name.";
    if (!form.email.trim()) next.email = "We'll need an email to reply to.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      next.email = "That email doesn't look quite right.";
    if (!form.subject.trim()) next.subject = "What's this about?";
    if (!form.message.trim()) next.message = "Add a note before sending.";
    return next;
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // In a real app, send `form` to your API route here.
    setSubmitted(true);
    setForm(EMPTY_FORM);

    setTimeout(() => setSubmitted(false), 4000);
  }

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
          animate="show"
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
            <Badge className="rounded-none border border-[#1F3A2E]/30 bg-transparent px-3 py-1 font-mono text-xs tracking-widest text-[#1F3A2E] dark:border-[#C9A24B]/40 dark:text-[#F7F2E7]">
              GET IN TOUCH
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-6 text-4xl font-normal leading-[1.1] tracking-tight text-[#1F3A2E] dark:text-[#F7F2E7] md:text-5xl"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            Let&apos;s talk books.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="mx-auto mt-6 max-w-xl text-lg leading-8 text-[#1F3A2E]/70 dark:text-[#F7F2E7]/70"
          >
            Question about an order, a recommendation you&apos;re after, or just
            want to talk about what you&apos;re reading — write in, a real
            person reads every note.
          </motion.p>
        </motion.div>
      </section>

      {/* Form + details */}
      <section className="container mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative border border-[#1F3A2E]/20 bg-[#EFE7D6] p-8 dark:border-[#F7F2E7]/15 dark:bg-[#1B2A22] sm:p-10"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <motion.div
                    initial={{ rotate: -8, scale: 0.7 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <CheckCircle2 className="h-12 w-12 text-[#7A2A2A] dark:text-[#C9A24B]" />
                  </motion.div>
                  <h3
                    className="mt-5 text-2xl text-[#1F3A2E] dark:text-[#F7F2E7]"
                    style={{ fontFamily: "Fraunces, serif" }}
                  >
                    Message sent.
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-[#1F3A2E]/70 dark:text-[#F7F2E7]/70">
                    Thanks for writing in — we typically reply within a business
                    day.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-6"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className={labelClasses}>
                        NAME
                      </Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={handleChange("name")}
                        placeholder="Jane Reader"
                        className={inputClasses}
                      />
                      {errors.name && (
                        <p className="text-xs text-[#7A2A2A] dark:text-[#C9A24B]">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className={labelClasses}>
                        EMAIL
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange("email")}
                        placeholder="jane@email.com"
                        className={inputClasses}
                      />
                      {errors.email && (
                        <p className="text-xs text-[#7A2A2A] dark:text-[#C9A24B]">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className={labelClasses}>
                      SUBJECT
                    </Label>
                    <Input
                      id="subject"
                      value={form.subject}
                      onChange={handleChange("subject")}
                      placeholder="An order, a recommendation, a hello"
                      className={inputClasses}
                    />
                    {errors.subject && (
                      <p className="text-xs text-[#7A2A2A] dark:text-[#C9A24B]">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className={labelClasses}>
                      MESSAGE
                    </Label>
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={handleChange("message")}
                      placeholder="Write your note here..."
                      rows={5}
                      className={inputClasses}
                    />
                    {errors.message && (
                      <p className="text-xs text-[#7A2A2A] dark:text-[#C9A24B]">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-none bg-[#7A2A2A] text-[#F7F2E7] transition-transform hover:bg-[#631F1F] active:scale-[0.98] sm:w-auto"
                  >
                    Send message
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact details */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {[
              {
                icon: MapPin,
                label: "VISIT",
                value: "14 Elm Row, Reading Quarter",
              },
              {
                icon: Mail,
                label: "WRITE",
                value: "hello@yourbookshop.com",
              },
              {
                icon: Clock,
                label: "HOURS",
                value: "Mon–Sat, 10am–7pm",
              },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-4 border-b border-[#1F3A2E]/15 pb-6 last:border-b-0 dark:border-[#F7F2E7]/15"
              >
                <Icon className="mt-1 h-5 w-5 shrink-0 text-[#7A2A2A] dark:text-[#C9A24B]" />
                <div>
                  <p
                    className="text-xs tracking-widest text-[#1F3A2E]/60 dark:text-[#F7F2E7]/60"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {label}
                  </p>
                  <p className="mt-1 text-[#1F3A2E] dark:text-[#F7F2E7]">
                    {value}
                  </p>
                </div>
              </div>
            ))}

            <div className="border border-[#1F3A2E]/20 bg-transparent px-5 py-4 dark:border-[#F7F2E7]/15">
              <p className="text-sm leading-6 text-[#1F3A2E]/70 dark:text-[#F7F2E7]/70">
                Prefer to ask in person? Our reading room stays open for
                browsing, no purchase necessary.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
