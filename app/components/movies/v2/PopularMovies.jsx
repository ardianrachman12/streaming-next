import Link from "next/link";
import MovieTrendSwiper from "./MovieTrendSwiper";
import GenreList from "./GenreListNew.jsx";

const PopularMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
    },
  };
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const movies = await res.json();

  const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?language=en-US`;
  const genreRes = await fetch(genreUrl, options);
  const genres = await genreRes.json();
  return (
    <div className="flex flex-col gap-5 py-[30px]">
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl md:text-[40px] text-white">Popular</h1>
        <Link href="/v2/popular-movies" className="flex items-center gap-[10px]">
          <h2 className="text-lg md:text-2xl text-blue-400 font-semibold">See More</h2>
          <img src="/images/icons/more-info-blue.svg" alt="" className="" />
        </Link>
      </div>
      <GenreList genres={genres.genres} />
      <MovieTrendSwiper movies={movies} />
    </div>
  );
};

export default PopularMovies;
