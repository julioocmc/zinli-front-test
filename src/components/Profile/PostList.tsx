import PostCard from '../Post/PostCard';
import type { Post } from '../../types/post';

interface Props {
  posts: Post[];
  tab: 'published' | 'drafted' | 'deleted';
  onPublish: (id: string) => void;
  onDelete: (id: string) => void;
}

export function PostList({ posts, tab, onPublish, onDelete }: Props) {
  if (!posts.length)
    return (
      <p className="text-center text-text-200">
        {tab === 'published'
          ? 'No has publicado nada aún.'
          : tab === 'drafted'
          ? 'No tienes borradores.'
          : 'No hay publicaciones eliminadas.'}
      </p>
    );

  return (
    <div className="flex flex-col gap-4">
      {posts.map((p) => (
        <div key={p.id} className="relative">
          <PostCard post={p} />
          {tab === 'drafted' && (
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => onPublish(p.id)}
                className="px-2 py-1 text-xs bg-accent-100 rounded-lg cursor-pointer"
              >
                Publicar
              </button>
              <button
                onClick={() => onDelete(p.id)}
                className="px-2 py-1 text-xs bg-accent-100 rounded-lg cursor-pointer"
              >
                Eliminar
              </button>
            </div>
          )}
          {tab === 'deleted' && (
            <div className="absolute top-2 right-2">
              <button
                onClick={() => onPublish(p.id)}
                className="px-2 py-1 text-xs bg-accent-100 rounded-lg cursor-pointer"
              >
                Restaurar
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
