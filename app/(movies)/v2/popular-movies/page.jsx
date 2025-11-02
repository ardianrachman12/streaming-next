import Link from "next/link";

const PopularMovies = async ({ searchParams }) => {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;

  const url = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
    },
    next: { revalidate: 60 }, // cache 1 menit
  };

  const res = await fetch(url, options);
  if (!res.ok) throw new Error("Failed to fetch trending movies");

  const data = await res.json();
  const movies = data.results;
  const totalPages = data.total_pages;

  return (
    <section className="bg-[#030A1B] min-h-screen text-white pb-10 pt-[120px]">
      <div className="max-w-[1240px] mx-auto px-4 xl:px-0">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-lg sm:text-4xl font-semibold">Popular Movies</h1>
          <Link
            href="/v2"
            className="text-sm sm:text-lg text-blue-400 hover:text-blue-600 transition-all"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Daftar Movie */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <Link
              href={`/v2/detail/${movie.id}`}
              key={movie.id}
              className="group rounded-lg overflow-hidden shadow-lg bg-[#101828] hover:scale-105 transition-transform duration-300"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-[300px] object-cover"
              />
              <div className="p-3">
                <h2 className="text-base font-semibold group-hover:text-blue-400 transition">
                  {movie.title}
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  ⭐ {movie.vote_average.toFixed(1)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-3 mt-10">
          {page > 1 && (
            <Link
              href={`/v2/trending?page=${page - 1}`}
              className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-all"
            >
              Prev
            </Link>
          )}

          <span className="text-lg font-medium">
            Page {page} / {totalPages > 500 ? 500 : totalPages}
          </span>

          {page < totalPages && page < 500 && (
            <Link
              href={`/v2/popular-movies?page=${page + 1}`}
              className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-all"
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularMovies;
