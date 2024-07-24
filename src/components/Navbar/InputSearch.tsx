"use client"

import React, { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

interface SearchQueryProps {
  setSearchQuery: (query: string | null) => void
}

const InputSearch: React.FC<SearchQueryProps> = ({ setSearchQuery }) => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const router = useRouter()

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm) {
      setSearchQuery(trimmedSearchTerm);
      console.log(trimmedSearchTerm);
      router.push(`/search/${encodeURIComponent(trimmedSearchTerm)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <button onClick={handleSearch}>
      <MagnifyingGlass width={24} height={24} className="absolute top-8 left-[595px] max-sm:right-48 max-sm:hidden" />
      </button>
      <input
        type="text"
        placeholder="search movie..."
        className="border border-opacity-45 shadow-md p-2 rounded-md pl-8 px-4 max-sm:mt-1"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default InputSearch;
