"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";
import Image from "next/image";

const MovieTrendSwiper = ({ movies }) => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={30}
        slidesPerView={"auto"}
        scrollbar={{ draggable: true }}
        className="swiperMovies"
      >
        {movies.results.map((movie) => (
          <SwiperSlide key={movie.id} style={{ width: "auto" }}>
            <Link href={`/v2/detail/${movie.id}`}>
              <div className="relative group overflow-hidden rounded-[12px]">
                <Image
                  width={500}
                  height={750}
                  className="aspect-[2/3] h-[280px] object-cover w-auto group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title || "Movie poster"}
                />
                {/* Gradient overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 w-full p-4 transition-all duration-300 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                  <div className="flex flex-col">
                    <h1 className="text-base font-semibold text-white truncate">
                      {movie.title}
                    </h1>
                    <p className="text-sm font-medium text-white/80">
                      {movie.release_date ? movie.release_date.split("-")[0] : ""}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieTrendSwiper;
