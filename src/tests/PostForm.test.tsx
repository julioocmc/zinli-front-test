import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TestProviders } from './TestProviders';
import { vi, it, expect } from 'vitest';
import PostForm from '../components/Post/PostForm';

const dummyUser = {
  username: 'alice',
  name: 'Alice',
  surname: 'Doe',
  avatar: '',
};

it('envía addPost con los valores introducidos', async () => {
  const addPost = vi.fn();
  render(
    <TestProviders>
      <PostForm addPost={addPost} currentUser={dummyUser} />
    </TestProviders>
  );

  await userEvent.type(
    screen.getByPlaceholderText(/comparte algo/i),
    'Mensaje de prueba con más de diez caracteres'
  );

  await userEvent.type(
    screen.getByPlaceholderText(/dónde te encuentras/i),
    'Caracas'
  );

  await userEvent.click(screen.getByRole('button', { name: /publicar/i }));

  expect(addPost).toHaveBeenCalledTimes(1);
  expect(addPost.mock.calls[0][0]).toMatchObject({
    message: expect.stringContaining('Mensaje de prueba'),
    location: 'Caracas',
    author: dummyUser,
  });
});
