import Link from "next/link";
import { Search } from "lucide-react";

export default function SearchButton() {
  return (
    <Link href="/v2/search">
      <button className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-xl py-3 px-5 shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300">
        <Search className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span>Search Your Movies</span>
      </button>
    </Link>
  );
}
