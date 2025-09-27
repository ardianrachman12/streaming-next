import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full py-4 bg-[#e0e1dd]">
      <div className="w-full py-2 flex justify-center items-center rounded-[20px]">
        <Link href="/">
          <Image
            src="/images/stream-play.svg"
            width={20}
            height={20}
            className="w-auto aspect-auto h-[40px]"
            alt="Stream Play"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
