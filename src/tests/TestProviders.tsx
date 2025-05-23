import { AuthProvider } from '../context/AuthContext';
import type { ReactNode } from 'react';
import { PostsProvider } from '../context/PostContext';

export function TestProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <PostsProvider>{children}</PostsProvider>
    </AuthProvider>
  );
}
