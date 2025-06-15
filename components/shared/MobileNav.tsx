"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm lg:hidden">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/assets/images/logo-text.svg"
          alt="logo"
          width={150}
          height={28}
          priority
        />
      </Link>

      {/* User + Hamburger Menu */}
      <nav className="flex items-center gap-4">
        <SignedIn>
          <UserButton afterSwitchSessionUrl="/" />

          <Sheet>
            <SheetTrigger className="focus:outline-none">
              <Image
                src="/assets/icons/menu.svg"
                alt="menu"
                width={28}
                height={28}
                className="cursor-pointer transition-transform hover:scale-110"
              />
            </SheetTrigger>

            <SheetContent side="right" className="sm:w-72 w-[90vw]">
              <SheetHeader>
                <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
                <SheetDescription className="text-sm text-muted-foreground">
                  Quick links to navigate the app
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6">
                <Image
                  src="/assets/images/logo-text.svg"
                  alt="logo"
                  width={140}
                  height={22}
                  className="mb-4"
                />

                <ul className="flex flex-col gap-4">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.route;
                    return (
                      <li key={link.route} className="w-full">
                        <Link
                          href={link.route}
                          className={`flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-purple-100 text-purple-700"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          <Image
                            src={link.icon}
                            alt={link.label}
                            width={20}
                            height={20}
                          />
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </SignedIn>

        <SignedOut>
         <Button asChild className="py-4 px-6 flex-center gap-3 rounded-full font-semibold text-[16px] leading-[140%] focus-visible:ring-offset-0 focus-visible:ring-transparent !important bg-purple-gradient bg-cover">
          <Link href="/sign-in">Login</Link>
         </Button>
        </SignedOut>
      </nav>
    </header>

  );
};

export default MobileNav;
