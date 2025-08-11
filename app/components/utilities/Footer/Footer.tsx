import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-start flex-grow">
          {/* Logo dan Deskripsi */}
          <div className="max-w-[500px] flex-grow">
            <div className="flex items-center mb-4">
              {/* Ganti dengan logo Anda */}
              <Image
                src="/images/stream-play-white.svg"
                alt="Logo"
                className="h-[40px] mr-2"
                width={200}
                height={200}
              />
            </div>
            <p className="text-sm">
              Deskripsi singkat tentang perusahaan atau website Anda. Ini adalah
              tempat yang bagus untuk menjelaskan misi atau visi Anda.
            </p>
          </div>

          <div className="flex gap-[50px]">
            {/* Kolom Tautan 1 */}
            <div className="w-full">
              <h3 className="text-lg font-semibold mb-4 text-white">Produk</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    Fitur
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Harga
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Portofolio
                  </a>
                </li>
              </ul>
            </div>

            {/* Kolom Tautan 3 (opsional) */}
            <div className="w-full whitespace-nowrap">
              <h3 className="text-lg font-semibold mb-4 text-white">
                Dukungan
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    Bantuan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Kebijakan Privasi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Syarat & Ketentuan
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Streamplay. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
