import Link from "next/link";

const MovieDetail = async ({ params }) => {
  const { id } = await params;

  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch movie detail");
  }

  const movie = await res.json();
  // console.log(movie);

  const urlVideo = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
  const resVideo = await fetch(urlVideo, options);
  const video = await resVideo.json();
  // console.log("trailer : ", video);

  const results = video?.results ?? [];

  const trailer =
    results.find(
      (item) => item.type === "Trailer" && item.site === "YouTube"
    ) ||
    results.find((item) => item.type === "Teaser" && item.site === "YouTube") ||
    results[0] ||
    null;

  // console.log(trailer);

  return (
    <section className="bg-[#030A1B] min-h-screen text-white">
      <div
        className="w-full h-[500px] flex items-end"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-[1240px] mx-auto px-4 pb-10">
          <h1 className="text-5xl font-bold">{movie.title}</h1>
          <p className="text-lg mt-2">{movie.tagline}</p>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 w-full">
        <div className="py-10 flex flex-col lg:flex-row gap-8">
          {trailer && (
            <div className="w-full lg:w-[900px] h-full !aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?controls=0&modestbranding=1&rel=0`}
                title="Movie Trailer"
                className="w-full h-full rounded-xl border-none"
                allowFullScreen
              />
            </div>
          )}

          <div className="w-fit flex flex-wrap flex-col gap-4">
            <h2 className="text-3xl font-semibold">Overview</h2>
            <p className="text-gray-300">{movie.overview}</p>

            <div className="flex flex-wrap gap-4 mt-6 text-gray-300">
              <div>
                <h3 className="font-semibold text-white">Release Date</h3>
                <p>{movie.release_date}</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">Runtime</h3>
                <p>{movie.runtime} min</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">Rating</h3>
                <p>⭐ {movie.vote_average.toFixed(1)}</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">Genres</h3>
                <p>{movie.genres.map((g) => g.name).join(", ")}</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">Status</h3>
                <p>{movie.status}</p>
              </div>
            </div>

            <Link
              href={`/v2/detail/${id}/watch`}
              className="px-8 py-3 rounded-lg text-base font-semibold bg-blue-700 w-fit hover:bg-blue-500 transition-colors cursor-pointer"
            >
              <span>Watch Full Movie Now!</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieDetail;
