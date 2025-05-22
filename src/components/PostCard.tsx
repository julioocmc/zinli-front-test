import { motion } from 'framer-motion';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';
import { timeAgo } from '../utils/timeAgo';
import type { Post } from '../types/post';
import { usePosts } from '../context/PostContext';

export default function PostCard({ post }: { post: Post }) {
  const { user } = useAuth();
  const { toggleLike } = usePosts();

  const hasLiked = post.likes.some((u) => u.username === user?.username);

  return (
    <div className="bg-bg-100 rounded-xl p-4 shadow">
      <div className="flex items-center gap-3 mb-2">
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
      {post.image && (
        <img
          src={post.image}
          alt="Imagen del post"
          className="max-w-full max-h-[300px] object-cover rounded mb-2 mx-auto"
        />
      )}
      <p className="mb-2">{post.message}</p>
      <motion.button
        onClick={() => user && toggleLike(post.id, user)}
        whileTap={{ scale: 0.8 }}
        animate={{ scale: hasLiked ? 1.2 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
        aria-pressed={hasLiked}
        className="flex items-center gap-1 select-none cursor-pointer"
      >
        {hasLiked ? (
          <HeartSolid className="w-6 h-6 text-red-500 transition-colors" />
        ) : (
          <HeartOutline className="w-6 h-6 text-text-200 transition-colors" />
        )}
        <span className="text-sm font-semibold">{post.likes.length}</span>
      </motion.button>
    </div>
  );
}
