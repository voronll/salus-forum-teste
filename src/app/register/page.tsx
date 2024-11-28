// /app/register/page.tsx

'use client';
import SalusLogo from "@/app/assets/SalusLogoV2.png";
import Image from "next/image";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/login');
      } else {
        setError(data.error || 'Erro ao cadastrar usuário');
      }
    } catch (error) {
      console.error(error);
      setError('Erro ao cadastrar usuário');
    }
  };

  return (
    <div
      className="relative flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('/assets/images/bg-login.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
  
      <div
        className="relative z-10 w-full max-w-sm p-6 bg-black border-2 border-orange-500 rounded-lg shadow-md"
        style={{
          height: '550px',
        }}
      >
        <div className="flex justify-center mb-4">
          <Image
            src={SalusLogo}
            alt="Logo"
            width={70}
            height={70}
            className="mr-4"
          />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4 text-center">Salus</h1>
        <h1 className="text-2xl font-bold text-white mb-4 text-center">
          Crie sua conta
        </h1>
        <form onSubmit={handleRegister} className="space-y-4">
          {error && <div className="text-red-500">{error}</div>}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nome de usuário"
            required
            className="w-full p-2 border border-gray-500 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-2 border border-gray-500 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
            className="w-full p-2 border border-gray-500 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmar Senha"
            required
            className="w-full p-2 border border-gray-500 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition"
          >
            Cadastrar
          </button>
        </form>
        <p className="text-center text-white mt-4">
          Já tem uma conta?{' '}
          <a href="/login" className="text-orange-500 hover:underline">
            Faça login!
          </a>
        </p>
      </div>
    </div>
  );
  
};

export default RegisterPage;
