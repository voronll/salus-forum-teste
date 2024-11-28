'use client';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="bg-zinc-900 w-64 min-h-screen p-4 text-white">
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
          Navegação
        </h2>
      </div>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/home_page" className="hover:text-orange-400">
              Início
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
