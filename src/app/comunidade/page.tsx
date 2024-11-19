'use client'
import { useEffect, useState } from "react"; 
import Header from "../components/header";
import Sidebar from "../components/sidebar";

interface Post {
  id: number;
  title: string;
  content: string;
  author_id: string;
  image_url?: string; 
}

export default function Comunidade() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('api/posts');
        const data: Post[] = await res.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <Header /> 
      <div className="flex">
        <Sidebar /> 
        <main className="flex-1 p-8">
          <section className="py-8">
            <h1 className="text-4xl font-bold text-white mb-6">Posts da Comunidade</h1>

            {loading ? (
              <p className="text-white">Carregando posts...</p>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-zinc-900 p-4 rounded-lg shadow-lg text-white"
                  >
                    <h2 className="text-2xl font-bold">{post.title}</h2>
                    <p>{post.content}</p>
                    {post.image_url && (
                      <img
                        src={post.image_url}
                        alt={`Imagem do post ${post.title}`}
                        className="w-full h-auto rounded-lg mt-4"
                      />
                    )}
                    <p className="text-gray-400 text-sm">Autor: {post.author_id}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
