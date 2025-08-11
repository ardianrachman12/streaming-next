const MovieDetailPage = async ({ params }) => {
  const url = `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN}`,
    },
  };

  const res = await fetch(url, options);
  const movie = await res.json();
  console.log(movie);
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Movie Detail Page</h1>
      {/* Add your movie detail content here */}
      <div className="flex flex-col md:flex-row gap-5">
        <div className="relative w-full max-w-[800px] aspect-video rounded-xl shadow-xl">
          <iframe
            loading="lazy"
            src={`https://multiembed.mov/?video_id=${movie.imdb_id}`}
            title="Movie Trailer"
            className="w-full h-full border-none aspect-auto rounded-xl"
            allowFullScreen
          ></iframe>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">
            Title : {movie.title}
          </h1>
          <p className="text-base">
            Release Date: {movie.release_date}
          </p>
          <p className="text-base">
            {movie.overview}
          </p>
          {movie.genres && movie.genres.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
