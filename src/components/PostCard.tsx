import type { Post } from '../types/post';
import { useAuth } from '../context/AuthContext';
import { timeAgo } from '../utils/timeAgo';
import { usePosts } from '../context/PostContext';

export default function PostCard({ post }: { post: Post }) {
  const { user } = useAuth();
  const { likePost } = usePosts();

  const hasLiked = post.likes?.some((u) => u.username === user?.username);

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
          <p className="font-semibold">{post.author.username}</p>{' '}
          <p className="text-sm text-text-200 mb-2">📍 {post.location}</p>
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

      <p className="mb-1">{post.message}</p>

      <button onClick={() => user && !hasLiked && likePost(post.id, user)}>
        ❤️ {post.likes?.length ?? 0} Me gusta
      </button>
    </div>
  );
}
