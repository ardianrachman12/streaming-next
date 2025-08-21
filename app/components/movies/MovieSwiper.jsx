"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import CardMovies from "./CardMovies";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MovieSwiper = ({ movies }) => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={5}
        navigation
        pagination={{ clickable: true }}
        className="swiperMovies"
        breakpoints={{
          0: {
            slidesPerView: 1.2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {movies.results.map((movie) => (
          <SwiperSlide key={movie.id}>
            <CardMovies movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieSwiper;
