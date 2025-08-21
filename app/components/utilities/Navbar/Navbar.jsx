import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav
      className="fixed top-[20px] left-1/2 -translate-x-1/2 w-full max-w-[1200px] py-2 flex justify-center items-center rounded-[20px] border border-white/20 bg-[rgba(26, 25, 25, 0.3)] backdrop-blur z-[50]"
    >
      <Link href="/">
        <Image src="/images/stream-play.svg" width={600} height={600} className="w-auto aspect-auto h-[40px]" alt="Stream Play" />
      </Link>
    </nav>
  );
};

export default Navbar;
