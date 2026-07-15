"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const inputClasses =
  "rounded-none border-[#1F3A2E]/25 bg-transparent text-[#1F3A2E] placeholder:text-[#1F3A2E]/40 focus-visible:ring-[#7A2A2A]/40 dark:border-[#F7F2E7]/25 dark:text-[#F7F2E7] dark:placeholder:text-[#F7F2E7]/40";

const labelClasses =
  "text-xs tracking-widest text-[#1F3A2E]/70 dark:text-[#F7F2E7]/70";

export function LoginForm() {
  const router = useRouter();
  const { login, googleSignIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await login(email, password);
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
            Welcome back, reader
          </h1>

          <p className="mt-2 text-sm text-[#1F3A2E]/70 dark:text-[#F7F2E7]/70">
            Enter your email below to login to your account.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label className={labelClasses}>EMAIL</Label>

            <Input
              type="email"
              placeholder="jane@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClasses}
              required
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label className={labelClasses}>PASSWORD</Label>

            
            </div>

            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClasses}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-none bg-[#7A2A2A] text-[#F7F2E7] transition-transform hover:bg-[#631F1F] active:scale-[0.98]"
          >
            Login
          </Button>

          
       
        </div>

        <div className="text-center text-sm text-[#1F3A2E]/70 dark:text-[#F7F2E7]/70">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-[#7A2A2A] underline underline-offset-4 dark:text-[#C9A24B]"
          >
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
}
