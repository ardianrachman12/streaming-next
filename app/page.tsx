"use client";
import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  imageError?: boolean;
}

// Main App component
export default function App() {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const router = useRouter();

  const moviesPerPage = 10; // OMDb API returns 10 results per page

  /**
   * Fetches search results from the OMDb API for a specific page.
   */
  const fetchResults = async (page: number) => {
    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const apiKey = "bf881a3e";
      const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}`;

      const params = new URLSearchParams({
        s: query,
        y: year,
        type: type,
        page: page.toString(),
      });

      const response = await fetch(`${apiUrl}&${params.toString()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data from API.");
      }

      const data = await response.json();
      console.log(data);

      if (data.Response === "True") {
        setResults(data.Search);
        setTotalResults(parseInt(data.totalResults, 10));
      } else {
        setResults([]);
        setTotalResults(0);
        setError(data.Error || "No results found.");
      }
    } catch (err: any) {
      setError(
        err.message || "An error occurred while searching. Please try again."
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles the initial search form submission.
   */
  const handleSearch = (e: any) => {
    e.preventDefault();
    if (!query.trim()) {
      return;
    }
    setCurrentPage(1); // Reset to page 1 for a new search
    fetchResults(1);
  };

  const handleMovieClick = (imdbID: any) => {
    router.push(`/detail/${imdbID}`);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchResults(newPage);
  };

  const totalPages = Math.ceil(totalResults / moviesPerPage);
  const showPagination = totalResults > 0;

  return (
    <section className="w-full max-w-[1240px] mx-auto px-4 xl:px-0 font-sans min-h-screen pt-[100px]">
      <div className="flex flex-col items-center justify-center gap-10 py-10">
        {/* Header */}
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-4xl font-bold">Welcome to the App</h1>
          <p className="text-xl text-gray-600">
            Search your movies, series, and more right here!
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="w-full mx-auto max-w-[500px] flex gap-x-2 items-stretch"
        >
          <input
            type="text"
            className="rounded-xl font-normal w-full px-5 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="Search..."
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <input type="number" name="year" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" className="rounded-xl font-normal w-[50%] px-5 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300" />
          <select name="type" id="" value={type} onChange={(e) => setType(e.target.value)} className="rounded-xl font-normal w-[50%] px-5 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300">
            <option value="">All</option>
            <option value="movie">Movies</option>
            <option value="series">Series</option>
            <option value="episode">Episode</option>
          </select>
          <button
            type="submit"
            className="rounded-xl font-bold text-base bg-gray-800 text-white px-5 py-3 flex justify-center items-center gap-2 transition-transform duration-200 transform active:scale-95"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Search size={20} />
            )}
            {/* <span className="hidden sm:block">Search</span> */}
          </button>
        </form>

        {/* Display Area */}
        <div className="w-full">
          {error && (
            <div className="text-center text-red-500 font-medium">{error}</div>
          )}
          {isLoading && (
            <div className="flex items-center justify-center text-gray-500 font-medium">
              <Loader2 className="animate-spin mr-2" size={24} />
              Loading results...
            </div>
          )}
          {!isLoading && results.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6">
              {results.map((item) => (
                <div
                  key={item.imdbID}
                  onClick={() => handleMovieClick(item.imdbID)}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-200 hover:scale-105 cursor-pointer"
                >
                  <Image
                    src={
                      // Check if the poster URL is not 'N/A', otherwise use a placeholder image
                      item.Poster !== "N/A"
                        ? item.Poster
                        : "https://placehold.co/200x300/e2e8f0/64748b?text=No+Image"
                    }
                    alt={item.Title || "Movie/Series poster"}
                    width={300}
                    height={400}
                    className="w-full h-auto object-cover rounded-t-xl aspect-[10/16]"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {item.Title}
                    </h3>
                    <p className="text-sm text-gray-500">{item.Year}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {!isLoading &&
            !error &&
            results.length === 0 &&
            query.trim() !== "" && (
              <div className="text-center text-gray-500 font-medium">
                No results found for "{query}".
              </div>
            )}
          {!isLoading &&
            !error &&
            results.length === 0 &&
            query.trim() === "" && (
              <div className="text-center text-gray-500 font-medium">
                Start searching for your favorite movies or series!
              </div>
            )}
        </div>

        {/* Pagination Controls */}
        {showPagination && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-full bg-gray-800 text-white p-3 disabled:bg-gray-400 transition-transform duration-200 transform active:scale-95"
            >
              Previous
            </button>
            <span className="text-gray-700 font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="rounded-full bg-gray-800 text-white p-3 disabled:bg-gray-400 transition-transform duration-200 transform active:scale-95"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
