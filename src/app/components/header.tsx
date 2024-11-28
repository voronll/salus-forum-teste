'use client';

import Image from "next/image";
import SalusLogo from "@/app/assets/SalusLogoV2.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/users/session', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
        }
      } catch (error) {
        console.error("Erro ao obter usuário:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/users/logout', { method: 'POST', credentials: 'include' });
      setUsername(null);
      router.push('/login');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header className="bg-black w-full py-4 border-b-2 border-gray-600 flex justify-between items-center">
      <a href="/" className="flex items-center text-white no-underline">
        <Image src={SalusLogo} alt="Logo" width={70} height={70} className="mr-4" />
        <span className="text-3xl bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
          Salus
        </span>
      </a>
  
      <nav>
        <ul className="flex space-x-6 items-center">
          <li>
            <a
              href="/comunidade/"
              className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent text-lg font-medium"
            >
              Comunidade
            </a>
          </li>
  
          {username ? (
      <li className="relative">
        <button onClick={toggleDropdown} className="flex items-center px-10">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-orange-500">
            <Image
              src="/assets/images/anime-izanami.gif" 
              alt="Foto do usuário"
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
          <span className="ml-2 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent text-lg font-medium">{username}</span> {/* Exibe o nome do usuário */}
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg z-10">
            <ul>
              <li>
                <a
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Perfil
                </a>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </li>
    ) : (
  <li>
    <a
      href="/login/"
      className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent text-lg font-medium"
    >
      Login
    </a>
  </li>
)}

        </ul>
      </nav>
    </header>
  );
};

export default Header;
