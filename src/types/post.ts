import type { User } from './user';

export interface Post {
  id: string;
  image?: string;
  message: string;
  likes: User[];
  author: User;
  create_at: Date;
  location: string;
  status: 'drafted' | 'deleted' | 'published';
}
