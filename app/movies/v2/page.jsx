import Link from "next/link";
import MovieTrendSwiper from "../../components/movies/v2/MovieTrendSwiper";
import PopularMovies from "../../components/movies/v2/PopularMovies";

const Movies = async ({ searchParams }) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`;
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
  // console.log(movies); // Log the entire response to the console
  // console.log(movies.results); // Log the movie data to the console
  return (
    <section className="bg-[#030A1B] w-full">
      <div
        className="w-full flex min-h-[725px]"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movies.results[0].backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-[1240px] mx-auto px-4 xl:px-0 w-full relative">
          <div className="w-full flex flex-col max-w-[553px] gap-[20px] absolute bottom-[100px]">
            <div className="flex flex-col gap-3">
              <h1 className="text-[48px] font-semibold text-white">
                {movies.results[0].original_title}
              </h1>
              <p className="font-medium text-base text-white">
                {movies.results[0].overview}
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex justify-center items-center gap-1 rounded-[28px] bg-blue-400 hover:bg-blue-700 transition-all duration-300 ease-in-out px-6 py-[10px]">
                <div className="">
                  <img
                    src="/images/icons/play-icon.svg"
                    className="w-auto"
                    alt=""
                  />
                </div>
                <h1 className="text-white">Watch Now</h1>
              </button>
              <button className="flex justify-center items-center gap-1 rounded-[28px] bg-none border border-blue-400 px-6 py-[10px] hover:bg-blue-400 transition-all duration-500">
                <h1 className="text-white">More Info</h1>
                <div className="">
                  <img
                    src="/images/icons/more-info.svg"
                    className="w-auto"
                    alt=""
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto px-4 xl:px-0 w-full relative max-w-[1240px]">
        <div className="flex flex-col gap-5 py-[30px]">
          <div className="flex justify-between">
            <h1 className="font-semibold text-[48px] text-white">Trends</h1>
            <Link href="#" className="flex items-center gap-[10px]">
              <h2 className="text-2xl text-blue-400 font-semibold">See More</h2>
              <img src="/images/icons/more-info-blue.svg" alt="" className="" />
            </Link>
          </div>
          <MovieTrendSwiper movies={movies} />
        </div>

        <PopularMovies />
      </div>
    </section>
  );
};

export default Movies;
