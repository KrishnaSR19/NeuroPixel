import { navLinks } from "@/constants";
import Link from "next/link";
import React from "react";
import Image from "next/image"
import { Collection } from "@/components/shared/Collections";

const Home = ({searchParams}:SearchParamProps) => {

  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string ) || "";

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
              <li className="flex justify-center w-fit rounded-full bg-white p-4"> 
                 <Image src={link.icon} alt="image" width={24} height={24} />

              </li>
              <p className="font-medium text-[14px] leading-[120%] text-center text-white">
                {link.label}
              </p>

            </Link>
          ))}
        </ul>
      </section>
      <section className="sm:mt-12">
        <Collection />

      </section>
    </>
  );
};

export default Home;
