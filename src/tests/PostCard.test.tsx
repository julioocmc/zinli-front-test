import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, it, expect } from 'vitest';
import PostCard from '../components/Post/PostCard';

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({ user: { username: 'alice' } }),
}));

const toggleLike = vi.fn();
vi.mock('../context/PostContext', () => ({
  usePosts: () => ({ toggleLike }),
}));

const post = {
  id: '1',
  message: 'Hola mundo',
  image: '',
  likes: [],
  author: {
    username: 'bob',
    name: 'Bob',
    surname: 'Builder',
    avatar: '',
  },
  create_at: new Date(),
  location: 'Madrid',
  status: 'published' as const,
};

it('llama toggleLike al pulsar el corazón', async () => {
  render(<PostCard post={post} />);
  await userEvent.click(screen.getByRole('button'));
  expect(toggleLike).toHaveBeenCalledWith('1', { username: 'alice' });
});
