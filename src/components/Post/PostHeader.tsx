import { useState, useRef } from 'react';
import { EllipsisVerticalIcon, TrashIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';
import type { Post } from '../../types/post';
import { useClickOutside } from '../../hooks/useClickOutside';
import { timeAgo } from '../../utils/timeAgo';

interface Props {
  post: Post;
  isAuthor: boolean;
  onDelete: () => void;
}

export function PostHeader({ post, isAuthor, onDelete }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, () => setMenuOpen(false));

  const confirmDelete = () =>
    toast.custom(
      (id) => (
        <div className="flex flex-col items-center bg-accent-100 rounded-lg p-4 gap-4 text-center">
          <span>¿Eliminar esta publicación?</span>
          <div className="flex gap-3">
            <button
              className="px-4 py-1 bg-bg-300 rounded text-sm cursor-pointer"
              onClick={() => toast.dismiss(id)}
            >
              Cancelar
            </button>
            <button
              className="px-4 py-1 bg-primary-300 rounded text-sm cursor-pointer"
              onClick={() => {
                onDelete();
                toast.dismiss(id);
                toast.success('Publicación eliminada');
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
      ),
      { duration: Infinity, position: 'top-center' }
    );

  return (
    <header className="flex items-start justify-between mb-2">
      <div className="flex items-center gap-3">
        {post.author.avatar && (
          <img
            src={post.author.avatar}
            alt={post.author.username}
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
        <div>
          <p className="font-semibold">{post.author.username}</p>
          <p className="text-sm text-text-200 mb-1">📍 {post.location}</p>
          <p className="text-sm text-text-200">{timeAgo(post.create_at)}</p>
        </div>
      </div>

      {isAuthor && (
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 rounded hover:bg-white/10 cursor-pointer"
          >
            <EllipsisVerticalIcon className="w-5 h-5" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-1 w-36 bg-bg-300 rounded shadow">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  confirmDelete();
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-white/10 cursor-pointer"
              >
                <TrashIcon className="w-4 h-4" />
                Eliminar
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
