"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const SearchMovies = () => {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [sort, setSort] = useState("popularity.desc");
  const [type, setType] = useState("movie"); // 🔹 NEW: "movie" or "tv"
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN;

  // 🔹 Fetch genre sesuai tipe (movie/tv)
  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/${type}/list?language=en`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      const data = await res.json();
      setGenres(data.genres || []);
    };
    fetchGenres();
  }, [API_KEY, type]);

  const fetchMovies = async (pageNum = 1) => {
    setLoading(true);

    let url = `https://api.themoviedb.org/3/discover/${type}?language=en-US&page=${pageNum}&sort_by=${sort}`;

    if (genre) url += `&with_genres=${genre}`;
    if (year) {
      if (type === "movie") url += `&primary_release_year=${year}`;
      else url += `&first_air_date_year=${year}`;
    }
    if (query) url += `&with_text_query=${encodeURIComponent(query)}`;

    const res = await fetch(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    const data = await res.json();

    let filtered = data.results || [];
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter((m) =>
        (m.title || m.name || "").toLowerCase().includes(q)
      );
    }

    setMovies(filtered);
    setTotalPages(data.total_pages);
    setPage(pageNum);
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(1);
  };

  const handlePageChange = (newPage) => {
    fetchMovies(newPage);
  };

  return (
    <section className="bg-[#030A1B] min-h-screen text-white pb-10 pt-[120px]">
      <div className="max-w-[1240px] mx-auto px-4 xl:px-0">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-lg md:text-4xl font-semibold">Search</h1>
          <Link
            href="/v2"
            className="text-sm md:text-lg text-blue-400 hover:text-blue-600 transition-all"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Filter Form */}
        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 bg-[#101828] p-5 rounded-[15px] mb-8"
        >
          <input
            type="text"
            placeholder="Search by title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-8 py-3 rounded-[15px] bg-[#1E293B] border border-gray-600 text-white"
          />

          {/* 🔹 Filter Type (Movie / Series) */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-8 py-3 rounded-[15px] bg-[#1E293B] border border-gray-600 text-white"
          >
            <option value="movie">Movies</option>
            <option value="tv">Series</option>
          </select>

          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="px-8 py-3 rounded-[15px] bg-[#1E293B] border border-gray-600 text-white"
          >
            <option value="">All Genres</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Year (e.g. 2024)"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="px-8 py-3 rounded-[15px] bg-[#1E293B] border border-gray-600 text-white"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-8 py-3 rounded-[15px] bg-[#1E293B] border border-gray-600 text-white"
          >
            <option value="popularity.desc">Most Popular</option>
            <option value="release_date.desc">Newest Release</option>
            <option value="vote_average.desc">Highest Rated</option>
          </select>

          <button
            type="submit"
            className="sm:col-span-2 lg:col-span-5 mt-2 py-2 bg-[#228ee5] hover:bg-blue-600 rounded-[15px] font-semibold transition-all ease-in-out duration-300"
          >
            Search
          </button>
        </form>

        {/* Result */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : movies.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {movies.map((movie) => (
                <Link
                  href={
                    type === "tv"
                      ? `/v2/series/${movie.id}`
                      : `/v2/detail/${movie.id}`
                  }
                  key={movie.id}
                  className="group rounded-[15px] overflow-hidden shadow-lg bg-[#101828] hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/images/no-image.png"
                    }
                    alt={movie.title || movie.name}
                    className="w-full h-[300px] object-cover"
                  />
                  <div className="p-3">
                    <h2 className="text-base font-semibold group-hover:text-blue-400 transition">
                      {movie.title || movie.name}
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">
                      ⭐ {movie.vote_average?.toFixed(1) ?? "N/A"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 mt-10">
              {page > 1 && (
                <button
                  onClick={() => handlePageChange(page - 1)}
                  className="px-4 py-2 bg-blue-500 rounded-[15px] hover:bg-blue-600 transition-all"
                >
                  Prev
                </button>
              )}

              <span className="text-lg font-medium">
                Page {page} / {totalPages > 500 ? 500 : totalPages}
              </span>

              {page < totalPages && page < 500 && (
                <button
                  onClick={() => handlePageChange(page + 1)}
                  className="px-4 py-2 bg-blue-500 rounded-[15px] hover:bg-blue-600 transition-all"
                >
                  Next
                </button>
              )}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-400 mt-10">
            No results found. Try adjusting your filters.
          </p>
        )}
      </div>
    </section>
  );
};

export default SearchMovies;
