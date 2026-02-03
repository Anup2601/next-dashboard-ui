import Image from "next/image";
import React from "react";

const TableSearch = () => {
  return (
    <div className="w-full md:w-auto flex items-center gap-2 bg-white px-4 py-2 rounded-full ring-1 ring-gray-300 shadow-sm text-xs">
      <Image src="/search.png" alt="Search Icon" width={14} height={14} />
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent outline-none"
      />
    </div>
  );
};

export default TableSearch;
