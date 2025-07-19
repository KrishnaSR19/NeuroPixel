import { navLinks } from "@/constants";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <>
      <section className="sm:flex justify-center items-center hidden h-72 flex-col gap-4 rounded-[20px] border bg-banner bg-cover bg-no-repeat p-10 shadow-inner">
        <h1 className="text-[36px] font-semibold sm:text-[44px] leading-[120%] sm:leading-[56px] max-w-[500px] flex-wrap text-center text-white shadow-sm">
          Unleash Your Creative Vision with Neuropixel
        </h1>
        <ul className="flex justify-center items-center">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex justify-center flex-col gap-2"
            >
              <li>

              </li>
              <p>
                {link.label}
              </p>

            </Link>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Home;
