'use client';

import Image from "next/image";
import SalusLogo from "@/app/assets/SalusLogoV2.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Checa se há um usuário autenticado
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
              <li>
                <span className="text-white">Bem-vindo, {username}</span>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent"
                >
                  Logout
                </button>
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
