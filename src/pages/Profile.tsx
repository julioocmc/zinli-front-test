/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { saveAs } from 'file-saver';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PostCard from '../components/PostCard';
import { useAuth } from '../context/AuthContext';
import type { Post } from '../types/post';
import { usePosts } from '../context/PostContext';

type TabType = 'published' | 'drafted' | 'deleted';

export default function Profile() {
  const { user } = useAuth();
  const { posts, addPost, updateStatus } = usePosts();
  const [tab, setTab] = useState<TabType>('published');

  const fileRef = useRef<HTMLInputElement | null>(null);

  const exportPosts = () => {
    const mine = posts.filter((p) => p.author.username === user?.username);
    const blob = new Blob([JSON.stringify(mine, null, 2)], {
      type: 'application/json',
    });
    saveAs(blob, 'misPublicaciones.json');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    file.text().then((txt) => {
      try {
        const arr: Post[] = JSON.parse(txt);

        arr.forEach((p) => {
          const { id: _omit, ...rest } = p;
          addPost({
            ...rest,
            create_at: new Date(p.create_at),
            likes: p.likes ?? [],
          });
        });

        toast.success('Publicaciones importadas');
      } catch {
        toast.error('Archivo JSON no válido');
      }
    });
  };

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
        {tab === 'published' && (
          <div className="flex gap-3 justify-end">
            <button
              onClick={exportPosts}
              className="px-3 py-1 text-sm bg-accent-100 rounded cursor-pointer"
            >
              Exportar JSON
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json"
              onChange={handleImport}
              className="hidden"
            />
            <button
              onClick={() => fileRef.current?.click()}
              className="px-3 py-1 text-sm bg-bg-300 rounded cursor-pointer"
            >
              Importar JSON
            </button>
          </div>
        )}

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
