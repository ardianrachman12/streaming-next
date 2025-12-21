import Link from "next/link";

const Watch = async ({ params }) => {
  const { id, season_number, episode_number } = await params;

  // Fetch episode detail dari TMDB
  const url = `https://api.themoviedb.org/3/tv/${id}/season/${season_number}/episode/${episode_number}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
    },
  };

  const res = await fetch(url, options);
  if (!res.ok) throw new Error("Failed to fetch episode detail");
  const episode = await res.json();

  return (
    <section className="bg-[#030A1B] min-h-screen text-white">
      <div
        className="relative w-full h-[450px] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://image.tmdb.org/t/p/original${episode.still_path})`,
        }}
      >
        <div className="absolute bottom-10 left-10 max-w-[700px]">
          <h1 className="text-4xl font-bold mb-2">
            {episode.episode_number}. {episode.name}
          </h1>
          <p className="text-gray-300 mb-4">{episode.overview}</p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>Air Date: {episode.air_date}</span>
            <span>Runtime: {episode.runtime} min</span>
            <span>⭐ {episode.vote_average?.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 mt-10 flex flex-col gap-y-10 w-full h-full pb-10">
        <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 shadow-lg">
          <iframe
            src={`https://multiembed.mov/?video_id=${id}&tmdb=1&s=${season_number}&e=${episode_number}`}
            allowFullScreen
            loading="lazy"
            className="w-full h-full"
          ></iframe>
        </div>

        <div className="">
          <Link
            href={`/v2/series/${id}`}
            className="bg-blue-500 hover:bg-blue-700 px-5 py-2 rounded-lg text-white"
          >
            ← Back to Series
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Watch;
