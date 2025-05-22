import type { User } from './user';

export interface Post {
  image?: string;
  message: string;
  likes?: Array<User>;
  author: User;
  create_at: Date;
  location: string;
  status: 'drafted' | 'deleted' | 'published';
}
