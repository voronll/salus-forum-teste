import Image from "next/image";
import SalusLogo from "@/app/assets/SalusLogoV2.png";

const Header = () => {
  return (
    <header className="bg-black w-full py-4 border-b-2 border-gray-600 flex justify-between items-center">
      <a href="/" className="flex items-center text-white no-underline">
        <Image src={SalusLogo} alt="Logo" width={70} height={70} className="mr-4" />
        <span className="text-3xl bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
          Salus
        </span>
      </a>

      <nav>
        <ul className="flex space-x-4">
          <li>
            <a
              href="/comunidade/page"
              className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"
            >
              Documentação
            </a>
          </li>
          <li>
            <a
              href="/comunidade/"
              className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"
            >
              Comunidade
            </a>
          </li>
          <li>
            <a
              href="/login/"
              className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"
            >
              Login
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
