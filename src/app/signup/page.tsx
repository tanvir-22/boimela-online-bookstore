import { SignupForm } from "@/components/forms/SignupForm";
import Link from "next/link";

/**
 * Bookshop color system — matches Hero / About / Contact.
 * ink #1F3A2E · brass #C9A24B · cloth #7A2A2A · parchment #F7F2E7
 */

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 bg-[#F7F2E7] p-6 dark:bg-[#14201A] md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#1F3A2E] dark:text-[#F7F2E7]"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            <div className="flex size-6 items-center justify-center rounded-full bg-[#7A2A2A] text-sm text-[#F7F2E7]">
              B
            </div>
            Bookshop
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <SignupForm />
          </div>
        </div>
      </div>

      <div className="relative hidden bg-[#1F3A2E] lg:block">
        <img
          src="https://images.unsplash.com/photo-1521123845560-14093637aa7d?w=1200"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F3A2E]/90 via-[#1F3A2E]/20 to-[#1F3A2E]/40" />

        <div className="absolute bottom-10 left-10 right-10 border border-[#F7F2E7]/20 bg-[#1F3A2E]/60 px-6 py-5 backdrop-blur-sm">
          <p
            className="text-xs tracking-widest text-[#C9A24B]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            BOOK LOVERS
          </p>
          <p
            className="mt-2 text-xl text-[#F7F2E7]"
            style={{ fontFamily: "Fraunces, serif" }}
          >
            15,200 customers have built their libraries with us.
          </p>
        </div>
      </div>
    </div>
  );
}
