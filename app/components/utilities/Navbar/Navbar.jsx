import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="py-2 flex justify-center items-center bg-[#f8f8f8] shadow-md z-[50]">
      <Image src="/images/stream-play.svg" width={600} height={600} className="w-auto aspect-auto h-[40px]" alt="Stream Play" />
    </nav>
  );
};

export default Navbar;
