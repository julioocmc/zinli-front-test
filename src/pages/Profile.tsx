// src/pages/Profile.tsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostContext';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PostCard from '../components/PostCard';

type TabType = 'published' | 'drafted' | 'deleted';

export default function Profile() {
  const { user } = useAuth();
  const { posts, updateStatus } = usePosts();
  const [tab, setTab] = useState<TabType>('published');

  if (!user) return null;

  const filtered = posts
    .filter((p) => p.author.username === user.username && p.status === tab)
    .sort((a, b) => b.create_at.getTime() - a.create_at.getTime());

  const publishDraft = (id: string) => {
    updateStatus(id, 'published');
    toast.success('¡Borrador publicado!');
  };
  const deletePost = (id: string) => {
    updateStatus(id, 'deleted');
    toast.success('Publicación eliminada');
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-200 text-text-100">
      <Navbar />
      <main className="flex-grow p-4 max-w-2xl mx-auto w-full space-y-6">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar || '/DummyPFP.jpeg'}
            alt={user.username}
            className="w-16 h-16 rounded-full object-cover border-2 border-white"
          />
          <div>
            <h2 className="text-xl font-bold">{user.username}</h2>
            <p className="text-text-200">
              {user.name} {user.surname}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mt-4 font-semibold">
          {(['published', 'drafted', 'deleted'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1 rounded-full cursor-pointer text-sm ${
                tab === t ? 'bg-accent-100 text-white' : 'bg-bg-300'
              }`}
            >
              {t === 'published'
                ? 'Publicados'
                : t === 'drafted'
                ? 'Borradores'
                : 'Eliminados'}
            </button>
          ))}
        </div>

        {/* Lista */}
        {filtered.length === 0 ? (
          <p className="text-center text-text-200">
            {tab === 'published'
              ? 'No has publicado nada aún.'
              : tab === 'drafted'
              ? 'No tienes borradores.'
              : 'No hay publicaciones eliminadas.'}
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((p) => (
              <div key={p.id} className="relative">
                <PostCard post={p} />
                {tab === 'drafted' && (
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => publishDraft(p.id)}
                      className="px-2 py-1 cursor-pointer text-xs bg-accent-100 rounded"
                    >
                      Publicar
                    </button>
                    <button
                      onClick={() => deletePost(p.id)}
                      className="px-2 py-1 text-xs bg-accent-100 cursor-pointer rounded"
                    >
                      Eliminar
                    </button>
                  </div>
                )}

                {tab === 'deleted' && (
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => publishDraft(p.id)}
                      className="px-2 py-1 text-xs bg-accent-100 cursor-pointer rounded"
                    >
                      Restaurar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
