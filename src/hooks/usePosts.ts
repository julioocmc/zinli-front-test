// src/hooks/usePosts.ts
import { useState, useEffect } from 'react';
import type { Post } from '../types/post';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>(() => {
    const stored = localStorage.getItem('posts');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (post: Post) => {
    setPosts((prev) => [...prev, post]);
  };

  const likePost = (index: number, user: Post['author']) => {
    setPosts((prev) => {
      const updated = [...prev];
      const likes = updated[index].likes ?? [];
      const alreadyLiked = likes.some((u) => u.username === user.username);
      if (!alreadyLiked) {
        updated[index].likes = [...likes, user];
      }
      return updated;
    });
  };

  return { posts, addPost, likePost };
};
