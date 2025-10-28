import Link from "next/link";
import SeriesDetailClient from "../../../../components/movies/v2/SeriesDetailClient";

export default async function SeriesPage({ params }) {
  const { id } = await params; // ✅ Fix untuk warning "params is a Promise"
  return (
    <div className="w-full bg-[#030A1B] pt-[120px] pb-10">
      <SeriesDetailClient id={id} />
    </div>
  );
}
