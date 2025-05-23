import { useAuth } from '../../context/AuthContext';
import { usePosts } from '../../context/PostContext';
import type { Post } from '../../types/post';
import { PostFooter } from './PostFooter';
import { PostHeader } from './PostHeader';
import { PostImage } from './PostImage';

export default function PostCard({ post }: { post: Post }) {
  const { user } = useAuth();
  const { toggleLike, updateStatus } = usePosts();

  const isAuthor =
    user?.username === post.author.username && post.status === 'published';
  const hasLiked = post.likes.some((u) => u.username === user?.username);

  return (
    <article className="relative bg-bg-100 rounded-xl p-4 shadow">
      <PostHeader
        post={post}
        isAuthor={isAuthor}
        onDelete={() => updateStatus(post.id, 'deleted')}
      />

      <PostImage src={post.image} alt="Imagen del post" />

      <p className="mb-2">{post.message}</p>

      {post.status === 'published' && (
        <PostFooter
          likes={post.likes}
          hasLiked={hasLiked}
          onToggle={() => user && toggleLike(post.id, user)}
        />
      )}
    </article>
  );
}
