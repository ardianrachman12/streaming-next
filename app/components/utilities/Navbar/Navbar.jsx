"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NavbarUserMenu from "../Navbar/NavbarUserMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-[20px] left-1/2 -translate-x-1/2 px-4 xl:px-0 w-full max-w-[1200px] z-[1000]">
      <div className="w-full py-5 flex justify-between px-5 items-center rounded-[20px] border border-white/20 bg-[rgba(26,25,25,0.3)] backdrop-blur z-[50]">
        {/* Logo */}
        <Link href="/v2">
          <Image
            src="/images/stream-play-white.svg"
            width={20}
            height={20}
            className="w-auto aspect-auto h-[38px]"
            alt="Stream Play"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-[10px] lg:gap-[20px] justify-between items-center">
          {[
            { name: "Movies", icon: MoviesIcon, url: "/v2" },
            { name: "TV Series", icon: TVIcon, url: "/v2/series" },
            { name: "Trending Movies", icon: FireIcon, url: "/v2/trending" },
            { name: "Actors", icon: UsersIcon, url: "/v2/actors" },
          ].map((item, index) => (
            <Link
              href={item.url}
              key={index}
              className="flex items-center gap-[3px] cursor-pointer group transition-all duration-300 ease-in-out"
            >
              <item.icon />
              <h2 className="text-white font-normal text-sm lg:text-base leading-[normal] group-hover:text-blue-300">
                {item.name}
              </h2>
            </Link>
          ))}
        </div>

        {/* Search + Hamburger */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <Link
            href={"/v2/search"}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <SearchIcon />
            <h2 className="text-white font-normal text-sm lg:text-base leading-[normal] group-hover:text-blue-300">
              Search
            </h2>
          </Link>
          <NavbarUserMenu />

          {/* Hamburger Icon */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-3 px-6 py-4 rounded-[15px] border border-white/20 bg-[rgba(26,25,25,0.85)] backdrop-blur">
          {[
            { name: "Movies", icon: MoviesIcon, url: "/v2" },
            { name: "TV Series", icon: TVIcon, url: "/v2/series" },
            { name: "Trending Movies", icon: FireIcon, url: "/v2/trending" },
            { name: "Actors", icon: UsersIcon, url: "/v2/actors" },
          ].map((item, index) => (
            <Link href={item.url} key={index} className="flex items-center gap-2 text-white">
              <item.icon />
              <h2 className="text-sm">{item.name}</h2>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

/* ===== SVG ICON COMPONENTS ===== */

const MoviesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-[22px] text-white group-hover:text-blue-300"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="m19.729 3.917l.05.16l.552 1.922a.75.75 0 0 1-.418.893l-.096.035L9.09 10.002h11.16a.75.75 0 0 1 .742.65l.007.1v8.499a2.75 2.75 0 0 1-2.582 2.745l-.168.005H5.75a2.75 2.75 0 0 1-2.745-2.582L3 19.25v-8.392l-.522-1.821a2.75 2.75 0 0 1 1.726-3.35l.16-.052L16.378 2.19a2.75 2.75 0 0 1 3.35 1.726"
    />
  </svg>
);

const TVIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-[24px] text-white group-hover:text-blue-300"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M8.16 3L6.75 4.41L9.34 7H4c-1.11 0-2 .89-2 2v10c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V9c0-1.11-.89-2-2-2h-5.34l2.59-2.59L15.84 3L12 6.84zM4 9h13v10H4zm15.5 0a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1m0 3a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1"
    />
  </svg>
);

const FireIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-[20px] text-white group-hover:text-blue-300"
    viewBox="0 0 14 14"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M5.454.141a1.01 1.01 0 0 1 .998-.02c3.95 1.838 6.2 5.656 6.062 8.87v.005c-.061 1.352-.547 2.611-1.493 3.534c-.949.924-2.305 1.458-4.005 1.461A5.223 5.223 0 0 1 1.482 8.99v-.01a4.43 4.43 0 0 1 2.277-3.986a.625.625 0 0 1 .876.294c.21.479.498.918.85 1.302c.399-.585.587-1.322.58-2.137c-.007-1.044-.335-2.167-.887-3.125A.88.88 0 0 1 5.454.141"
    />
  </svg>
);

const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-[20px] text-white group-hover:text-blue-300"
    viewBox="0 0 15 16"
  >
    <path
      fill="currentColor"
      d="M7.5 7a2.5 2.5 0 0 1 0-5a2.5 2.5 0 0 1 0 5m0-4C6.67 3 6 3.67 6 4.5S6.67 6 7.5 6S9 5.33 9 4.5S8.33 3 7.5 3"
    />
    <path
      fill="currentColor"
      d="M13.5 11c-.28 0-.5-.22-.5-.5s.22-.5.5-.5s.5-.22.5-.5A2.5 2.5 0 0 0 11.5 7h-1c-.28 0-.5-.22-.5-.5s.22-.5.5-.5c.83 0 1.5-.67 1.5-1.5S11.33 3 10.5 3c-.28 0-.5-.22-.5-.5s.22-.5.5-.5A2.5 2.5 0 0 1 13 4.5c0 .62-.22 1.18-.6 1.62c1.49.4 2.6 1.76 2.6 3.38c0 .83-.67 1.5-1.5 1.5m-12 0C.67 11 0 10.33 0 9.5c0-1.62 1.1-2.98 2.6-3.38c-.37-.44-.6-1-.6-1.62A2.5 2.5 0 0 1 4.5 2c.28 0 .5.22.5.5s-.22.5-.5.5C3.67 3 3 3.67 3 4.5S3.67 6 4.5 6c.28 0 .5.22.5.5s-.22.5-.5.5h-1A2.5 2.5 0 0 0 1 9.5c0 .28.22.5.5.5s.5.22.5.5s-.22.5-.5.5m9 3h-6c-.83 0-1.5-.67-1.5-1.5v-1C3 9.57 4.57 8 6.5 8h2c1.93 0 3.5 1.57 3.5 3.5v1c0 .83-.67 1.5-1.5 1.5m-4-5A2.5 2.5 0 0 0 4 11.5v1c0 .28.22.5.5.5h6c.28 0 .5-.22.5-.5v-1A2.5 2.5 0 0 0 8.5 9z"
    />
  </svg>
);

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-white group-hover:text-blue-300"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M10 4a6 6 0 1 0 0 12a6 6 0 0 0 0-12m-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10"
    />
  </svg>
);
