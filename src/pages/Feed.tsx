// src/pages/Feed.tsx
import { useState, useDeferredValue } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostContext';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Feed() {
  const { user } = useAuth();
  const { posts, addPost } = usePosts();

  const [showMine, setShowMine] = useState(false);
  const [query, setQuery] = useState('');
  const q = useDeferredValue(query.toLowerCase());

  const published = posts
    .filter((p) => p.status === 'published')
    .filter((p) => (showMine ? p.author.username === user?.username : true))
    .filter(
      (p) =>
        p.message.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
    )
    .sort((a, b) => b.create_at.getTime() - a.create_at.getTime());

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-bg-200 text-text-100">
        <Navbar />
        <main className="flex-grow p-4 text-center">
          <p>No has iniciado sesión.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-200 text-text-100">
      <Navbar />

      <main className="flex-grow p-4 max-w-2xl mx-auto w-full space-y-6">
        <PostForm addPost={addPost} currentUser={user} />

        <div className="flex justify-end">
          <div className="relative w-52">
            <MagnifyingGlassIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-text-200" />
            <input
              type="text"
              placeholder="Buscar..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-8 pr-2 py-2 rounded-lg bg-bg-300 placeholder:text-text-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-100"
            />
          </div>
        </div>

        <div className="flex justify-center gap-4 text-sm font-semibold">
          <button
            onClick={() => setShowMine(false)}
            className={`px-3 py-1 rounded-lg cursor-pointer ${
              !showMine ? 'bg-accent-100 text-white' : 'bg-bg-300'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setShowMine(true)}
            className={`px-3 py-1 rounded-lg cursor-pointer ${
              showMine ? 'bg-accent-100 text-white' : 'bg-bg-300'
            }`}
          >
            Mis posts
          </button>
        </div>

        {published.length === 0 ? (
          <p className="text-center text-text-200">
            {showMine
              ? 'Aún no tienes publicaciones.'
              : 'No hay publicaciones que coincidan.'}
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {published.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
