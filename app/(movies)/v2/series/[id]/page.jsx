import SeriesDetailClient from "../../../../components/movies/v2/SeriesDetailClient";
import { getMovieIdFromImdb, getSubtitles } from "@/lib/subsource";

export default async function SeriesPage({ params }) {
  const { id } = await params;

  // 🔹 GET external ids
  const externalRes = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/external_ids`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
      },
      cache: "no-store",
    }
  );
  const externalIds = await externalRes.json();

  // 🔹 Ambil IMDb ID
  const imdbId = externalIds.imdb_id;

  // 🔹 GET Subtitles (via server, AMAN dari CORS)
  // let subtitles = null;
  let subtitlesResults = [];

  if (imdbId) {
    // 2️⃣ Get SubSource MovieId
    const movieData = await getMovieIdFromImdb(imdbId);
    console.log(movieData);

    if (movieData?.data?.length > 0) {
      // 2️⃣ Loop setiap movieId
      for (const item of movieData.data) {
        const sub = await getSubtitles(item.movieId, "indonesian");

        subtitlesResults.push({
          movieId: item.movieId,
          title: item.title ?? null,
          season: item.season ?? null,
          subtitles: sub?.data ?? [],
        });
      }
    }
  }
  console.log(subtitlesResults);

  return (
    <div className="w-full bg-[#030A1B] pt-[120px] pb-10">
      <SeriesDetailClient id={id} subtitles={subtitlesResults} />
    </div>
  );
}
