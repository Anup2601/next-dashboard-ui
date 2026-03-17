'use client';

import { ITEM_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";

const TableSearch = () => {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value= (e.currentTarget[0] as HTMLInputElement).value;

    const params = new URLSearchParams(window.location.search);
    params.set("search", value);
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full md:w-auto flex items-center gap-2 bg-white px-4 py-2 rounded-full ring-1 ring-gray-300 shadow-sm text-xs">
      <Image src="/search.png" alt="Search Icon" width={14} height={14} />
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          placeholder="Search..."
          className="bg-transparent outline-none"
        />
      </form>
    </div>
  );
};

export default TableSearch;
