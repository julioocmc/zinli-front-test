import { useState, useDeferredValue } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostContext';
import PostForm from '../components/Post/PostForm';
import PostCard from '../components/Post/PostCard';

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
      <Navbar search={{ query, setQuery }} />

      <main className="flex-grow p-4 max-w-2xl mx-auto w-full space-y-6">
        <PostForm addPost={addPost} currentUser={user} />

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
