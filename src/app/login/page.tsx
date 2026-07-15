import { LoginForm } from "@/components/forms/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 bg-[#F7F2E7] p-6 dark:bg-[#14201A] md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
      </div>

      <div className="relative hidden bg-[#1F3A2E] lg:block">
        <img
          src="https://plus.unsplash.com/premium_photo-1750530064416-cd3044da57c0?q=80&w=1170"
          alt="Bookshop reading corner"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F3A2E]/90 via-[#1F3A2E]/20 to-[#1F3A2E]/40" />

        <div className="absolute bottom-10 left-10 right-10 border border-[#F7F2E7]/20 bg-[#1F3A2E]/60 px-6 py-5 backdrop-blur-sm">
          <p
            className="text-xs tracking-widest text-[#C9A24B]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            HAPPY READERS
          </p>
          <p
            className="mt-2 text-xl text-[#F7F2E7]"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            15,200 books delivered to happy readers.
          </p>
        </div>
      </div>
    </div>
  );
}
