// app/v2/series/page.jsx
import Link from "next/link";

const SeriesPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;

  const url = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
    },
  };

  const res = await fetch(url, options, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch TV Series");

  const data = await res.json();

  return (
    <section className="bg-[#030A1B] min-h-screen text-white pb-10 pt-[120px]">
      <div className="max-w-[1240px] mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Popular TV Series</h1>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.results.map((series) => (
            <Link
              href={`/v2/series/${series.id}`}
              key={series.id}
              className="group bg-[#101a33] rounded-xl overflow-hidden hover:scale-105 transition-all"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                alt={series.name}
                className="w-full h-[350px] object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold group-hover:text-blue-400 transition">
                  {series.name}
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  ⭐ {series.vote_average.toFixed(1)} | {series.first_air_date}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-10">
          {page > 1 && (
            <Link
              href={`/v2/series?page=${page - 1}`}
              className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
            >
              Prev
            </Link>
          )}
          <span>Page {page}</span>
          {page < data.total_pages && (
            <Link
              href={`/v2/series?page=${page + 1}`}
              className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default SeriesPage;
