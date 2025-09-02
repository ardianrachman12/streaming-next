import { Loader2 } from "lucide-react";
import Image from "next/image";

// A server-side component to fetch and display movie details
// It receives params from the URL
export default async function MovieDetailPage({ params }: any) {
  const { imdbID } = params;

  // Check if imdbID is available
  if (!imdbID) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 font-medium">
        No movie ID provided.
      </div>
    );
  }

  const apiKey = "bf881a3e";
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}`;
  let movie = null;
  let error = null;

  try {
    // Fetch movie details using the 'i' parameter (imdbID)
    const response = await fetch(`${apiUrl}&i=${imdbID}`);

    if (!response.ok) {
      throw new Error("Failed to fetch movie details from the API.");
    }

    const data = await response.json();

    if (data.Response === "True") {
      movie = data;
      // console.log("Movie details:", movie);
    } else {
      error = data.Error || "Movie details not found.";
    }
  } catch (err : any) {
    error = err.message || "An error occurred while fetching details.";
    console.error(err);
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 font-medium">
        {error}
      </div>
    );
  }

  if (!movie) {
    // Fallback if no movie data
    return null;
  }

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 xl:px-0 font-sans py-10 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          <Image
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://placehold.co/300x450/e2e8f0/64748b?text=No+Image"
            }
            alt={movie.Title || "Movie poster"}
            width={300}
            height={450}
            className="w-full h-auto object-cover rounded-xl shadow-md"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-gray-900">{movie.Title}</h1>
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Year:</span> {movie.Year}
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Genre:</span> {movie.Genre}
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Plot:</span> {movie.Plot}
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Director:</span> {movie.Director}
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Actors:</span> {movie.Actors}
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Rating:</span> {movie.imdbRating}
          </p>

          <h2 className="text-2xl font-bold mt-6">Watch Trailer</h2>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl">
            <iframe loading="lazy"
              src={`https://multiembed.mov/?video_id=${movie.imdbID}`}
              title="Movie Trailer"
              className="absolute top-0 left-0 w-full h-full border-none"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
