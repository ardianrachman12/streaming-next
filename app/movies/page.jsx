import CardMovies from "../components/movies/CardMovies";
import Pagination from "../components/movies/Pagination";
import MovieSwiper from "../components/movies/MovieSwiper";


const Movies = async ({searchParams}) => {
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
  console.log(movies); // Log the entire response to the console
  // console.log(movies.results); // Log the movie data to the console
  return (
    <section className="max-w-[1240px] mx-auto px-4 xl:px-0">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Movies Page</h1>
        <div className="grid grid-cols-5 gap-5">
          {movies.results.map((movie) => (
            <CardMovies key={movie.id} movie={movie} />
          ))}
        </div>
        {/* <MovieSwiper movies={movies} /> */}
      </div>
      <Pagination totalPages={movies.total_pages} />
    </section>
  );
};

export default Movies;
