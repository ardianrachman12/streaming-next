"use client";
import Image from "next/image";
import Link from "next/link";

const CardMovies = ({ movie }) => {
  function formatReleaseDate(dateString) {
    // Pastikan input adalah string dan formatnya benar
    if (!dateString || typeof dateString !== "string") {
      return "Tanggal tidak valid";
    }

    const date = new Date(dateString);

    // Cek apakah tanggal valid
    if (isNaN(date.getTime())) {
      return "Tanggal tidak valid";
    }

    // Opsi untuk format tanggal
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    // Menggunakan Intl.DateTimeFormat untuk memformat tanggal ke bahasa Indonesia
    return new Intl.DateTimeFormat("id-ID", options).format(date);
  }

  return (
    <div className="flex flex-col items-center gap-y-2 rounded-lg border border-black/[0.1] bg-[#f7f7f7] overflow-hidden">
      <Image
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        width={500}
        height={750}
        className="w-full object-cover rounded-t-lg aspect-[3/4] hover:scale-[102%] transition-transform duration-200"
        alt={movie.original_title}
      />
      <div className="flex flex-col gap-y-2 px-4 py-2 flex-grow">
        <div className="flex flex-col gap-2 flex-grow">
          <p className="bg-gray-700 text-sm px-2 py-1 rounded-full w-fit text-white font-medium">
            {formatReleaseDate(movie.release_date)}
          </p>
          <h1 className="text-xl font-bold">{movie.original_title}</h1>
          <p className="text-gray-600 line-clamp-3">{movie.overview}</p>
        </div>
        <Link
          href={`/movies/detail/${movie.id}`}
          className="bg-blue-500 text-white w-full py-2 rounded-[16px] text-center hover:bg-blue-600 hover:scale-[102%] transition-all duration-200"
        >
          <h1 className="font-bold">Details</h1>
        </Link>
      </div>
    </div>
  );
};

export default CardMovies;
