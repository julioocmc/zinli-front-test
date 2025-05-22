import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';
import PostCard from '../components/PostCard';
import Navbar from '../components/Navbar';
import PostForm from '../components/PostForm';
import { usePosts } from '../context/PostContext';
import { useState } from 'react';

export default function Feed() {
  const { user } = useAuth();
  const { posts, addPost } = usePosts();
  const [showMine, setShowMine] = useState(false);

  const published = posts
    .filter((p) => p.status === 'published')
    .filter((p) => (showMine ? p.author.username === user?.username : true))
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

        <div className="flex justify-center gap-4 text-sm font-semibold">
          <button
            className={`px-3 py-1 cursor-pointer rounded-lg ${
              !showMine ? 'bg-accent-100 text-white' : 'bg-bg-300'
            }`}
            onClick={() => setShowMine(false)}
          >
            Todos
          </button>
          <button
            className={`px-3 py-1 cursor-pointer rounded-lg ${
              showMine ? 'bg-accent-100 text-white' : 'bg-bg-300'
            }`}
            onClick={() => setShowMine(true)}
          >
            Mis posts
          </button>
        </div>

        {published.length === 0 ? (
          <p className="text-center text-text-200">
            {showMine
              ? 'Aún no tienes publicaciones.'
              : 'No hay publicaciones aún.'}
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
