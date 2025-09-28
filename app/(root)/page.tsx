import { navLinks } from "@/constants";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Collection } from "@/components/shared/Collections";
import { getAllImages } from "@/lib/actions/image.actions";

interface SearchParamProps {
  searchParams: Promise<{
    page?: string;
    query?: string;
  }>;
}

const Home = async ({ searchParams }: SearchParamProps) => {
  const params = await searchParams; // dynamic routing fix using await
  const page = params?.page ? Number(params.page) : 1;
  const searchQuery = params?.query ?? "";

  const images = await getAllImages({
    limit: 9,
    page,
    searchQuery,
  });

  return (
    <>
      {/* Banner Section */}
      <section className="hidden sm:flex flex-col items-center justify-center h-72 gap-4 rounded-[20px] border bg-banner bg-cover bg-no-repeat p-10 shadow-inner">
        <h1 className="text-3xl sm:text-4xl font-semibold leading-[120%] sm:leading-[56px] max-w-[500px] text-center text-white shadow-sm">
          Unleash Your Creative Vision with Neuropixel
        </h1>

        <ul className="flex items-center justify-center gap-6 flex-wrap">
          {navLinks.slice(1, 5).map((link) => (
            <li key={link.route} className="flex flex-col items-center gap-2">
              <Link
                href={link.route}
                className="flex flex-col items-center gap-2"
              >
                <div className="p-4 bg-white rounded-full">
                  <Image
                    src={link.icon}
                    alt={link.label}
                    width={24}
                    height={24}
                  />
                </div>
                <p className="text-sm font-medium leading-snug text-white text-center">
                  {link.label}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Collection Section */}
      <section className="mt-12">
        <Collection
          hasSearch={true}
          images={images?.data || []}
          totalPages={images?.totalPage || 1}
          page={page}
        />
      </section>
    </>
  );
};

export default Home;
