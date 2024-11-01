import React from "react";
import InputSearch from "./InputSearch";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { User, UserCircle } from "@phosphor-icons/react";

interface setSearchQueryProps {
  setSearchQuery: (query: string | null) => void;
}

const Navbar: React.FC<setSearchQueryProps> = ({ setSearchQuery }) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="">
      <div className="flex justify-between p-6 max-sm:p-4 items-center max-sm:block">
        <h1 className="text-2xl font-bold">EvstMovie</h1>
        <InputSearch setSearchQuery={setSearchQuery} />
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="max-sm:absolute top-12 right-6"
          >
            {theme === "dark" ? (
              <SunIcon width={24} height={24} className="max-sm:w-10 max-sm:h-10" />
            ) : (
              <MoonIcon width={24} height={24} className="max-sm:w-10 max-sm:h-10" />
            )}
          </button>
      </div>
    </div>
  );
};

export default Navbar;
