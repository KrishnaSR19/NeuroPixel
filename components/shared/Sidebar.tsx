"use client";

import { navLinks } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";


const Sidebar = () => {
  const pathname = usePathname();


  return (
    <aside className="hidden h-screen w-72 flex-col bg-white p-5 shadow-md shadow-purple-200/50 lg:flex">
      <div className="flex size-full flex-col gap-4">
        <Link href="/">
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={180}
            height={28}
          />
        </Link>

        <nav className="h-full flex-col justify-between md:flex md:gap-4">
          <SignedIn>
            <ul className=" hidden w-full flex-col items-start gap-2 md:flex">
              {navLinks.slice(0, 6).map((link) => {
                const isActive = link.route === pathname;

                return (
                  <li
                    key={link.route}
                    className={`flex justify-center items-center font-semibold text-[16px] leading-[140%] w-full whitespace-nowrap rounded-full bg-cover  transition-all hover:bg-purple-100 hover:shadow-inner ${
                      isActive
                        ? "bg-purple-gradient text-amber-900"
                        : "text-gray-700"
                    }`}
                  >
                    <Link
                      className=" font-semibold text-[16px] leading-[140%] flex size-full gap-4 p-4"
                      href={link.route}
                    >
                      <Image
                        src={link.icon}
                        alt="logo"
                        width={24}
                        height={24}
                        className={`${isActive && "brightness-200"}`}
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <ul className="hidden w-full flex-col items-start gap-2 md:flex">
             
                {navLinks.slice(6).map((link) => {
                  const isActive = link.route === pathname;

                  return (
                    <li
                      key={link.route}
                      className={`flex justify-center items-center font-semibold text-[16px] leading-[140%] w-full whitespace-nowrap rounded-full bg-cover  transition-all hover:bg-purple-100 hover:shadow-inner ${
                        isActive
                          ? "bg-purple-gradient text-white"
                          : "text-gray-700"
                      }`}
                    >
                      <Link
                        className=" font-semibold text-[16px] leading-[140%] flex size-full gap-4 p-4"
                        href={link.route}
                      >
                        <Image
                          src={link.icon}
                          alt="logo"
                          width={24}
                          height={24}
                          className={`${isActive && "brightness-200"}`}
                        />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
           
              <li className="flex justify-center items-center cursor-pointer gap-2 p-4">
                <UserButton afterSwitchSessionUrl="/"  />    <p className="text-sm font-semibold">
      {/* {user.username || user.fullName || user.primaryEmailAddress?.emailAddress} */}
    </p>
              </li>
            </ul>
          </SignedIn>

          <SignedOut>
            <Button
              asChild
              className="py-4 px-6 flex justify-center items-center gap-3 rounded-full  font-semibold text-[16px] leading-[140%] focus-visible:ring-offset-0 focus-visible:ring-transparent !important bg-purple-gradient bg-cover"
            ></Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
