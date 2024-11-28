'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CriarPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null); 
  const router = useRouter();

  useEffect(() => {
    const getUserId = async () => {
      try {
        const response = await fetch('/api/users/session');
        const data = await response.json();
  
        console.log('Resposta do servidor:', data);
  
        if (response.ok && data.user_id) {
          setUserId(data.user_id);
        } else {
          setError('Usuário não autenticado');
          console.log('Usuário não autenticado, redirecionando...');
          router.push('/comunidade');
        }
      } catch (error) {
        setError('Sessão expirada ou inválida');
        console.error('Erro ao obter user_id:', error);
        router.push('/login');
      }
    };
  
    getUserId();
  }, [router]);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submetendo formulário...');

    if (!userId) {
      setError('Usuário não autenticado');
      console.log('Erro: Usuário não autenticado'); 
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          author_id: userId,
        }),
      });

      console.log('Resposta da criação do post:', response); 

      if (response.ok) {
        const data = await response.json();
        console.log('Post criado com sucesso:', data); 
        router.push('/');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Erro ao criar o post.');
        console.log('Erro na criação do post:', errorData); 
      }
    } catch (error) {
      setError('Erro ao criar o post.');
      console.error('Erro na requisição POST:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <header className="py-4 bg-gray-900 text-white text-center">
        <h1 className="text-3xl font-bold">Criar Post</h1>
      </header>

      <main className="flex-1 p-8">
        <div className="max-w-xl mx-auto bg-zinc-900 p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-white text-lg font-semibold">
                Título
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 mt-2 bg-gray-800 text-white rounded-lg border-2 border-gray-600 focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-white text-lg font-semibold">
                Conteúdo
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-3 mt-2 bg-gray-800 text-white rounded-lg border-2 border-gray-600 focus:outline-none"
                rows={6}
                required
              />
            </div>

            {error && (
              <p className="text-red-500">{error}</p>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                className={`bg-orange-500 text-white py-2 px-6 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'}`}
                disabled={loading}
              >
                {loading ? 'Criando...' : 'Criar Post'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CriarPost;
