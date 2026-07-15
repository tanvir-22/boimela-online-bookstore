"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useAuth } from "@/hooks/useAuth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const inputClasses =
  "rounded-none border-[#1F3A2E]/25 bg-transparent text-[#1F3A2E] placeholder:text-[#1F3A2E]/40 focus-visible:ring-[#7A2A2A]/40 dark:border-[#F7F2E7]/25 dark:text-[#F7F2E7] dark:placeholder:text-[#F7F2E7]/40";

const labelClasses =
  "text-xs tracking-widest text-[#1F3A2E]/70 dark:text-[#F7F2E7]/70";

export function SignupForm() {
  const { register, googleSignIn } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await register(name, email, password);
      router.push("/");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <h1
            className="text-2xl text-[#1F3A2E] dark:text-[#F7F2E7]"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            Create your account
          </h1>

          <p className="mt-2 text-sm text-[#1F3A2E]/70 dark:text-[#F7F2E7]/70">
            Create an account to buy books.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label className={labelClasses}>FULL NAME</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Reader"
              className={inputClasses}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label className={labelClasses}>EMAIL</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@email.com"
              className={inputClasses}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label className={labelClasses}>PASSWORD</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className={inputClasses}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-none bg-[#7A2A2A] text-[#F7F2E7] transition-transform hover:bg-[#631F1F] active:scale-[0.98]"
          >
            Create account
          </Button>
        </div>

        <div className="text-center text-sm text-[#1F3A2E]/70 dark:text-[#F7F2E7]/70">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#7A2A2A] underline underline-offset-4 dark:text-[#C9A24B]"
          >
            Login
          </Link>
        </div>
      </div>
    </form>
  );
}
