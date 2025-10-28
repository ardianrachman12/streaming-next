import Link from "next/link";

const EpisodeDetail = async ({ params }) => {
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
      {/* Banner Episode */}
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

      {/* Iframe Player */}
      <div className="max-w-[1240px] mx-auto px-4 mt-10">
        <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 shadow-lg">
          <iframe
            src={`https://multiembed.mov/?video_id=${id}&tmdb=1&s=${season_number}&e=${episode_number}`}
            allowFullScreen
            loading="lazy"
            className="w-full h-full"
          ></iframe>
        </div>
      </div>

      {/* Info Tambahan */}
      <div className="max-w-[1240px] mx-auto px-4 py-10">
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-semibold">Episode Information</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#101a33] p-5 rounded-xl">
              <h3 className="font-semibold mb-2">Episode ID</h3>
              <p className="text-gray-400">{episode.id}</p>
            </div>
            <div className="bg-[#101a33] p-5 rounded-xl">
              <h3 className="font-semibold mb-2">Season</h3>
              <p className="text-gray-400">{episode.season_number}</p>
            </div>
            <div className="bg-[#101a33] p-5 rounded-xl">
              <h3 className="font-semibold mb-2">Episode</h3>
              <p className="text-gray-400">{episode.episode_number}</p>
            </div>
          </div>

          {/* Guest Stars */}
          {episode.guest_stars?.length > 0 && (
            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-4">Guest Stars</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-5">
                {episode.guest_stars.map((star) => (
                  <div
                    key={star.id}
                    className="bg-[#101a33] p-2 sm:p-4 rounded-xl hover:scale-105 transition"
                  >
                    <img
                      src={
                        star.profile_path
                          ? `https://image.tmdb.org/t/p/w300${star.profile_path}`
                          : "/images/no-profile.png"
                      }
                      alt={star.name}
                      className="w-full aspect-auto object-cover rounded-lg mb-3"
                    />
                    <h3 className="text-sm font-semibold">{star.name}</h3>
                    <p className="text-xs text-gray-400">
                      as {star.character}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-10">
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

export default EpisodeDetail;
