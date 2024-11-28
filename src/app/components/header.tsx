'use client';

import Image from "next/image";
import SalusLogo from "@/app/assets/SalusLogoV2.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


const Header = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado para controle do dropdown
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
      router.push('/login'); // Redireciona para login após logout
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

          {username ? (
              <>
                <li className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent space-x-2" 
                  >
                    <span className="text-lg font-medium">{username}</span> {/* Texto do nome com tamanho aumentado */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-8 h-8" // Tamanho do ícone aumentado
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
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
              </>
            ) : (
              <li>
                <a
                  href="/login/"
                  className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"
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
