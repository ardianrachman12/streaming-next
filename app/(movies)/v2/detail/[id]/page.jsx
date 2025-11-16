import SubtitleList from "@/app/components/movies/v2/SubtitleList";
import { getMovieIdFromImdb, getSubtitles } from "@/lib/subsource";

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

  // Get SubSource MovieId
  const movieId = await getMovieIdFromImdb(movie.imdb_id);

  // Fetch subtitles
  const dataSubtitles = await getSubtitles(
    movieId.data[0].movieId,
    "indonesian"
  );

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

      <div className="max-w-[1240px] mx-auto px-4">
        <div className="py-10 flex flex-col lg:flex-row gap-8">
          <div className="w-full">
            <iframe
              loading="lazy"
              src={`https://multiembed.mov/?video_id=${movie.id}&tmdb=1`}
              title="Movie Trailer"
              className="w-full h-full border-none aspect-video rounded-xl"
              allowFullScreen
            ></iframe>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-semibold">Overview</h2>
            <p className="text-gray-300">{movie.overview}</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 text-gray-300">
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
          </div>
        </div>

        <SubtitleList data={dataSubtitles.data}></SubtitleList>
      </div>
    </section>
  );
};

export default MovieDetail;
