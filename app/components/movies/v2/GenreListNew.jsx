"use client"; // Tambahkan baris ini
import { Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const GenreList = ({genres}) => {
  return (
    <div className="">
      <Swiper
        modules={[Scrollbar]}
        spaceBetween={20}
        slidesPerView={"auto"}
        // scrollbar={{ draggable: true, hide: true }}
      >
        {genres.map((genre) => (
          <SwiperSlide key={genre.id} style={{ width: "auto" }}>
            <button className="py-3 px-[28px] bg-[#EC5BAA] rounded-[25px]">
              <h2 className="text-white font-medium text-sm">{genre.name}</h2>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GenreList;
