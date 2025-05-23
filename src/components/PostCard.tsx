import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  HeartIcon as HeartOutline,
  EllipsisVerticalIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';
import { timeAgo } from '../utils/timeAgo';
import type { Post } from '../types/post';
import { Modal, ModalHeader, ModalBody } from './Modal';
import { usePosts } from '../context/PostContext';

export default function PostCard({ post }: { post: Post }) {
  const { user } = useAuth();
  const { toggleLike, updateStatus } = usePosts();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [likesOpen, setLikesOpen] = useState(false);

  const hasLiked = post.likes.some((u) => u.username === user?.username);
  const isAuthor = user?.username === post.author.username;
  const isPublished = post.status === 'published';

  useEffect(() => {
    const h = (e: MouseEvent) =>
      menuRef.current &&
      !menuRef.current.contains(e.target as Node) &&
      setMenuOpen(false);
    if (menuOpen) document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [menuOpen]);

  const confirmDelete = () =>
    toast.custom(
      (id) => (
        <div className="flex flex-col items-center bg-accent-100 rounded-lg p-4 gap-4 text-center">
          <span>¿Eliminar esta publicación?</span>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => toast.dismiss(id)}
              className="px-4 py-1 bg-bg-300 rounded text-sm"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                updateStatus(post.id, 'deleted');
                toast.dismiss(id);
                toast.success('Publicación eliminada');
              }}
              className="px-4 py-1 bg-primary-300 rounded text-sm"
            >
              Eliminar
            </button>
          </div>
        </div>
      ),
      { duration: Infinity, position: 'top-center' }
    );

  const likesCount = post.likes.length;
  const firstUser = likesCount ? post.likes[0].username : '';
  const others = likesCount > 1 ? likesCount - 1 : 0;
  const likeSentence =
    likesCount === 1
      ? `Le gusta a ${firstUser}`
      : `Le gusta a ${firstUser} y a ${others} más`;

  return (
    <div className="relative bg-bg-100 rounded-xl p-4 shadow">
      <div className="flex items-start justify-between mb-2">
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

        {isAuthor && isPublished && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1 rounded hover:bg-white/10"
            >
              <EllipsisVerticalIcon className="w-5 h-5" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-bg-300 rounded shadow z-10">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    confirmDelete();
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-white/10"
                >
                  <TrashIcon className="w-4 h-4" />
                  Eliminar
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {post.image && (
        <img
          src={post.image}
          alt="Imagen del post"
          className="max-w-full max-h-[300px] object-cover rounded mb-2 mx-auto"
        />
      )}

      <p className="mb-2">{post.message}</p>

      {isPublished && (
        <>
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => user && toggleLike(post.id, user)}
              whileTap={{ scale: 0.8 }}
              animate={{ scale: hasLiked ? 1.2 : 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              aria-pressed={hasLiked}
              className="cursor-pointer"
            >
              {hasLiked ? (
                <HeartSolid className="w-4 h-4 text-red-500" />
              ) : (
                <HeartOutline className="w-4 h-4 text-text-200" />
              )}
            </motion.button>

            {likesCount > 0 && (
              <p className="text-sm">
                {likesCount === 1 ? (
                  likeSentence
                ) : (
                  <>
                    Le gusta a {firstUser}{' '}
                    <button
                      onClick={() => setLikesOpen(true)}
                      className="underline hover:text-accent-100 cursor-pointer"
                    >
                      y a {others} más
                    </button>
                  </>
                )}
              </p>
            )}
          </div>

          <Modal isOpen={likesOpen} onClose={() => setLikesOpen(false)}>
            <ModalHeader>Le gusta a:</ModalHeader>
            <ModalBody>
              {post.likes.map((u) => (
                <p key={u.username} className="py-1 border-b last:border-none">
                  {u.username}
                </p>
              ))}
            </ModalBody>
          </Modal>
        </>
      )}
    </div>
  );
}
