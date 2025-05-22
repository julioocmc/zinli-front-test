/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import type { Post } from '../types/post';
import type { User } from '../types/user';

interface PostsContextType {
  posts: Post[];
  addPost: (post: Omit<Post, 'id'>) => void;
  likePost: (id: string, user: User) => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(() => {
    const stored = localStorage.getItem('posts');
    return stored
      ? JSON.parse(stored, (_k, v) =>
          typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(v)
            ? new Date(v)
            : v
        )
      : [];
  });

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (post: Omit<Post, 'id'>) => {
    setPosts((prev) => [...prev, { ...post, id: uuid() }]);
  };

  const likePost = (id: string, user: User) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const already = p.likes?.some((u) => u.username === user.username);
        return already ? p : { ...p, likes: [...(p.likes ?? []), user] };
      })
    );
  };

  return (
    <PostsContext.Provider value={{ posts, addPost, likePost }}>
      {children}
    </PostsContext.Provider>
  );
}

export const usePosts = () => {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error('usePosts debe usarse dentro de PostsProvider');
  return ctx;
};
