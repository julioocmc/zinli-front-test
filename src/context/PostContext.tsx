/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { faker } from '@faker-js/faker';
import type { Post } from '../types/post';
import type { User } from '../types/user';

interface PostsContextType {
  posts: Post[];
  addPost: (post: Omit<Post, 'id'>) => void;
  toggleLike: (id: string, user: User) => void;
  updateStatus: (id: string, status: Post['status']) => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

function generateDummyData(): Post[] {
  const dummyUsers: User[] = Array.from({ length: 5 }).map(() => ({
    avatar: faker.image.avatarGitHub(),
    username: faker.internet.username().toLowerCase(),
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
  }));

  return Array.from({ length: 12 }).map(() => {
    const author = faker.helpers.arrayElement(dummyUsers);
    return {
      id: uuid(),
      image: faker.image.urlPicsumPhotos({ width: 600, height: 400 }),
      message: faker.lorem.sentences({ min: 2, max: 4 }),
      likes: [],
      author,
      create_at: faker.date.recent({ days: 7 }),
      location: faker.location.city(),
      status: 'published' as const,
    };
  });
}

export function PostsProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(() => {
    const stored = localStorage.getItem('posts');

    if (stored) {
      return JSON.parse(stored, (_k, v) =>
        typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(v) ? new Date(v) : v
      );
    }

    const seed = generateDummyData();
    localStorage.setItem('posts', JSON.stringify(seed));
    return seed;
  });

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (post: Omit<Post, 'id'>) =>
    setPosts((prev) => [...prev, { ...post, id: uuid() }]);

  const toggleLike = (id: string, user: User) =>
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? p.likes.some((u) => u.username === user.username)
            ? {
                ...p,
                likes: p.likes.filter((u) => u.username !== user.username),
              }
            : { ...p, likes: [...p.likes, user] }
          : p
      )
    );

  const updateStatus = (id: string, status: Post['status']) =>
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));

  return (
    <PostsContext.Provider value={{ posts, addPost, toggleLike, updateStatus }}>
      {children}
    </PostsContext.Provider>
  );
}

export const usePosts = () => {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error('usePosts debe usarse dentro de PostsProvider');
  return ctx;
};
