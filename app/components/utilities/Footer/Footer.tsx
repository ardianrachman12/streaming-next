import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Streamplay by <span className="font-semibold text-orange-200">ArdianR</span>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
