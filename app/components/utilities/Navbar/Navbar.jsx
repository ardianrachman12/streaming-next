import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-[20px] left-1/2 -translate-x-1/2 px-4 xl:px-0 w-full max-w-[1200px] z-[1000]">
      <div className="w-full py-2 flex justify-center items-center rounded-[20px] border border-white/20 bg-[rgba(26, 25, 25, 0.3)] backdrop-blur z-[50]">
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
