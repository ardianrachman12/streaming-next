"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function ProgressProvider() {
  const pathname = usePathname();
  // const searchParams = useSearchParams();

  // Selesai loading ketika URL berubah
  useEffect(() => {
    NProgress.done();
  }, [pathname]);

  // Listener klik Link sebelum pindah page
  useEffect(() => {
    const handleClick = (e) => {
      const link = e.target.closest("a");

      if (link && link.href.startsWith(window.location.origin)) {
        NProgress.start();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
