// components/Pagination.jsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const Pagination = ({ totalPages }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const renderPages = () => {
    // Logic untuk menampilkan halaman di tengah (misal: 1 ... 4 5 6 ... 100)
    const delta = 2; // Jumlah halaman yang ditampilkan di sekitar halaman saat ini
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    let pagesToShow = [];
    if (currentPage > delta + 1) {
      pagesToShow.push(1, "...");
    } else {
      pagesToShow.push(1);
    }

    for (let i = start; i <= end; i++) {
      pagesToShow.push(i);
    }

    if (currentPage < totalPages - delta) {
      pagesToShow.push("...", totalPages);
    } else if (totalPages > 1) {
      pagesToShow.push(totalPages);
    }

    // Menggabungkan kembali jika ada duplikasi di awal/akhir
    if (pagesToShow[0] === pagesToShow[1] && pagesToShow.length > 1) {
      pagesToShow.shift();
    }
    if (
      pagesToShow[pagesToShow.length - 1] ===
        pagesToShow[pagesToShow.length - 2] &&
      pagesToShow.length > 1
    ) {
      pagesToShow.pop();
    }

    // Logic untuk memastikan 1 dan totalPages selalu terlihat
    if (!pagesToShow.includes(1)) {
      pagesToShow.unshift(1, "...");
    }
    if (!pagesToShow.includes(totalPages) && totalPages > 1) {
      pagesToShow.push("...", totalPages);
    }

    // Membersihkan duplikasi dan '...' yang tidak perlu
    pagesToShow = Array.from(
      new Set(
        pagesToShow.filter(
          (page, index, self) =>
            !(
              page === "..." &&
              (self[index - 1] === "..." || self[index + 1] === "...")
            )
        )
      )
    );

    return pagesToShow.map((page, index) => {
      if (page === "...") {
        return (
          <span
            key={`ellipsis-${index}`}
            className="px-3 py-1 text-gray-400 cursor-not-allowed"
          >
            ...
          </span>
        );
      }
      return (
        <a
          key={page}
          href={createPageURL(page)}
          className={`px-3 py-1 rounded-full border transition-colors duration-200 ${
            currentPage === page
              ? "bg-black text-white border-black"
              : "bg-white text-black border-gray-300 hover:bg-gray-100"
          }`}
        >
          {page}
        </a>
      );
    });
  };

  return (
    <div className="flex justify-center items-center space-x-2 my-8">
      <a
        href={createPageURL(currentPage - 1)}
        className={`px-4 py-2 rounded-full border transition-colors duration-200 ${
          currentPage <= 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-200"
            : "bg-white text-black border-gray-300 hover:bg-gray-100"
        }`}
        aria-disabled={currentPage <= 1}
      >
        Previous
      </a>

      <div className="flex space-x-1">{renderPages()}</div>

      <a
        href={createPageURL(currentPage + 1)}
        className={`px-4 py-2 rounded-full border transition-colors duration-200 ${
          currentPage >= totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-200"
            : "bg-white text-black border-gray-300 hover:bg-gray-100"
        }`}
        aria-disabled={currentPage >= totalPages}
      >
        Next
      </a>
    </div>
  );
};

export default Pagination;
