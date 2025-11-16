"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SubtitleList from "../../movies/v2/SubtitleList";

export default function SeriesDetailClient({ id, subtitles }) {
  const [series, setSeries] = useState(null);
  const [seasonData, setSeasonData] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [loading, setLoading] = useState(true);
  const [currentSeasonSub, setCurrentSeasonSub] = useState(null);

  useEffect(() => {
    const fetchSeries = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
          },
        }
      );
      const data = await res.json();
      setSeries(data);
      if (data?.seasons?.length > 0) {
        setSelectedSeason(data.seasons[0].season_number);
      }
      setLoading(false);
    };
    fetchSeries();
  }, [id]);

  useEffect(() => {
    if (!selectedSeason) return;
    const fetchSeason = async () => {
      setSeasonData(null);
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/season/${selectedSeason}?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
          },
        }
      );
      const data = await res.json();
      // console.log(data);
      setSeasonData(data);

      const currentSeasonSub = subtitles?.find(
        (item) => item.season == selectedSeason
      );

      setCurrentSeasonSub(currentSeasonSub);
      // console.log(currentSeasonSub);
    };
    fetchSeason();
  }, [selectedSeason, id]);

  if (loading || !series)
    return (
      <div className="flex justify-center items-center h-48">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="p-6 text-white">
      {/* header */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <Image
          src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
          className="w-full sm:w-60 rounded-lg aspect-auto"
          alt={series.name}
          width={700}
          height={700}
        ></Image>
        {/* <img
          src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
          className="w-full sm:w-60 rounded-lg"
          alt={series.name}
        /> */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">{series.name}</h1>
          <p className="text-xs sm:text-base text-gray-300 mb-4 sm:line-clamp-4 lg:line-clamp-none">
            {series.overview}
          </p>
          <div className="mt-5">
            <label className="block text-sm text-gray-400 mb-2">
              Select Season:
            </label>
            <div className="flex gap-2 flex-wrap">
              {series.seasons.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSeason(s.season_number)}
                  className={`px-4 py-2 rounded-lg ${
                    selectedSeason == s.season_number
                      ? "bg-amber-500 text-black"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* episodes */}
      {seasonData ? (
        <div>
          <div className="flex justify-between items-center py-3">
            <h2 className="text-2xl font-semibold">{seasonData.name}</h2>
            <div className="">
              <Link
                href={`/v2/series`}
                className="text-sm sm:text-base bg-blue-500 hover:bg-blue-700 px-5 py-2 rounded-lg text-white"
              >
                ← Back
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {seasonData.episodes.map((ep) => (
              <Link
                href={`/v2/series/${id}/season/${seasonData.season_number}/episode/${ep.episode_number}`}
                key={ep.id}
                className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition"
              >
                <h3 className="text-lg font-semibold mb-2">
                  Episode {ep.episode_number}: {ep.name}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-3">
                  {ep.overview}
                </p>
                <div className="aspect-video mt-3">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${ep.still_path}`}
                    alt={ep.name}
                    className="w-full rounded-lg mb-3"
                  />
                </div>
              </Link>
            ))}
          </div>

          <SubtitleList data={currentSeasonSub.subtitles}></SubtitleList>
        </div>
      ) : (
        <div className="flex justify-center items-center h-48">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
