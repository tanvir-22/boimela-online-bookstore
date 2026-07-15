

"use client";

import Link from "next/link";
import { isAdminUid } from "@/lib/admin";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BookOpen, Menu, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAdmin = isAdminUid(user?.uid);

  const baseMenuItems = [
    { title: "Home", url: "/" },
    { title: "Books", url: "/products" },
    { title: "About", url: "/about" },
    { title: "Contact", url: "/contact" },
  ];

  const menuItems = user
    ? isAdmin
      ? [
          ...baseMenuItems,
          { title: "Manage Books", url: "/products/manage" },
          { title: "Add Book", url: "/products/create" },
        ]
      : [...baseMenuItems, { title: "Cart", url: "/cart" }]
    : baseMenuItems;

  const handleNavigation = (url: string) => {
    router.push(url);
    setMobileOpen(false);
  };

  const handleLogoutClick = () => {
    setMobileOpen(false);
    logout();
  };

  const initial =
    user?.displayName?.[0]?.toUpperCase() ??
    user?.email?.[0]?.toUpperCase() ??
    "?";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1F3A2E]/10 bg-[#F7F2E7]/95 backdrop-blur supports-backdrop-filter:bg-[#F7F2E7]/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <button
          onClick={() => handleNavigation("/")}
          className="flex items-center gap-2 font-['Fraunces'] text-xl font-medium text-[#1F3A2E] transition-opacity hover:opacity-80"
        >
          <BookOpen className="h-6 w-6 text-[#C9A24B]" />
          <span>Boimela</span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {menuItems.map((item) => (
            <Link href={item.url} key={item.url}>
              <button className="font-['Inter'] text-sm font-medium text-[#1F3A2E]/70 transition-colors hover:text-[#1F3A2E]">
                {item.title}
              </button>
            </Link>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-4 md:flex">
          {user ? (
            <>
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1F3A2E] font-['Fraunces'] text-sm text-[#C9A24B]"
                title={user.email ?? undefined}
              >
                {initial}
              </div>
              <Button
                onClick={handleLogoutClick}
                size="sm"
                className="bg-[#7A2A2A] font-['Inter'] text-[#F7F2E7] hover:bg-[#7A2A2A]/90"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => handleNavigation("/signup")}
                size="sm"
                className="border-[#1F3A2E]/30 font-['Inter'] text-[#1F3A2E] hover:bg-[#1F3A2E] hover:text-[#F7F2E7]"
              >
                Sign Up
              </Button>
              <Button
                onClick={() => handleNavigation("/login")}
                size="sm"
                className="bg-[#C9A24B] font-['Inter'] text-[#1F3A2E] hover:bg-[#C9A24B]/90"
              >
                Login
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger className="md:hidden">
            <Button variant="ghost" size="icon" className="text-[#1F3A2E]">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-75 border-[#1F3A2E]/10 bg-[#F7F2E7]"
          >
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 font-['Fraunces'] text-[#1F3A2E]">
                <ShoppingBag className="h-5 w-5 text-[#C9A24B]" />
                Next Mart
              </SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex flex-col gap-4">
              <nav className="flex flex-col gap-1">
                {menuItems.map((item) => (
                  <Link href={item.url} key={item.url}>
                    <button
                      onClick={() => setMobileOpen(false)}
                      className="w-full rounded-md px-3 py-2 text-left font-['Inter'] text-[#1F3A2E] transition-colors hover:bg-[#1F3A2E]/5"
                    >
                      {item.title}
                    </button>
                  </Link>
                ))}
              </nav>

              <div className="flex flex-col gap-3 border-t border-[#1F3A2E]/10 pt-4">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 px-3 py-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1F3A2E] font-['Fraunces'] text-sm text-[#C9A24B]">
                        {initial}
                      </div>
                      <span className="truncate font-['Inter'] text-sm text-[#1F3A2E]/70">
                        {user.email}
                      </span>
                    </div>
                    <Button
                      onClick={handleLogoutClick}
                      variant="outline"
                      className="w-full border-[#1F3A2E]/30 font-['Inter'] text-[#1F3A2E]"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => handleNavigation("/login")}
                      variant="outline"
                      className="w-full border-[#1F3A2E]/30 font-['Inter'] text-[#1F3A2E]"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => handleNavigation("/signup")}
                      className="w-full bg-[#C9A24B] font-['Inter'] text-[#1F3A2E] hover:bg-[#C9A24B]/90"
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
