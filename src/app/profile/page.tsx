'use client';

import { useEffect, useState } from 'react';
import Header from '../components/header';

const ProfilePage = () => {
  const [userData, setUserData] = useState<{ username: string; email: string } | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/users/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Inclui cookies na requisição
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Erro ao buscar os dados do usuário.');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-2xl font-semibold">Carregando...</h1>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
    <Header /> 
    <div className="flex flex-col items-center justify-center min-h-screen">
      
      <h1 className="text-3xl font-bold">Perfil do Usuário</h1>
      <div className="mt-4 p-4 border border-gray-300 rounded-lg max-w-md w-full">
        <p className="text-lg">
          <strong>Nome de usuário:</strong> {userData.username}
        </p>
        <p className="text-lg">
          <strong>Email:</strong> {userData.email}
        </p>
      </div>
    </div>
    </div>
  );
};

export default ProfilePage;
