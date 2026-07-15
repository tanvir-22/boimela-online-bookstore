import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F2E7]">
      <div className="text-center">
        <h1 className="font-['Fraunces'] text-7xl text-[#1F3A2E]">404</h1>

        <p className="mt-4 text-[#1F3A2E]/70">
          The page you're looking for doesn't exist.
        </p>

        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-[#C9A24B] px-6 py-3 text-[#1F3A2E]"
        >
          Back Home
        </Link>
      </div>
    </main>
  );
}
