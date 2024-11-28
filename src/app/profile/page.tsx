'use client';
import SalusLogo from "@/app/assets/SalusLogoV2.png";
import Image from "next/image";
import { useEffect, useState } from 'react';
import Header from '../components/header';

const ProfilePage = () => {
  const [userData, setUserData] = useState<{ username: string; email: string } | null>(null);
  const [posts, setPosts] = useState<{ id: string; title: string; content: string }[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/users/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
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

    const fetchUserPosts = async () => {
      try {
        const response = await fetch('/api/users/posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error('Erro ao buscar os posts do usuário.');
        }
      } catch (error) {
        console.error('Erro na requisição dos posts:', error);
      }
    };

    fetchUserData();
    fetchUserPosts();
  }, []);

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-2xl font-semibold">Carregando...</h1>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header />
      <div
        className="relative w-full h-64 bg-cover bg-center"
        style={{
          backgroundImage: `url('/assets/images/bg-login.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
      </div>
      <div className="flex justify-between px-4 py-6">
        <div className="flex flex-col w-full max-w-md">
          <div className="flex items-center mt-6 space-x-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-orange-500">
              <Image
                src="/assets/images/anime-izanami.gif"
                alt="Foto do usuário"
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-semibold">{userData.username}</h2>
            </div>
          </div>
          <div className="mt-6 p-6 border-2 border-orange-500 rounded-lg bg-gray-900 w-full">
            <p className="text-lg text-white">
              <strong>Nome de usuário:</strong> {userData.username}
            </p>
            <p className="text-lg text-white">
              <strong>Email:</strong> {userData.email}
            </p>
          </div>
        </div>
        <div className="mt-6 w-full  flex-1 mr-3 ml-3">
          <div className="h-full p-6 border-2 border-orange-500 rounded-lg bg-gray-900">
            <h3 className="text-2xl font-semibold text-white mb-4">Posts do Usuário</h3>
            <div className="space-y-4 h-full overflow-auto">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <div key={post.id} className="p-4 border-b border-gray-600">
                    <h4 className="text-xl text-white font-bold">{post.title}</h4>
                    <p className="text-white">{post.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-white">Ainda não há posts.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
