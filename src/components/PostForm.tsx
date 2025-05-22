import { useState } from 'react';
import type { Post } from '../types/post';
import type { User } from '../types/user';

interface PostFormProps {
  addPost: (post: Omit<Post, 'id'>) => void;
  currentUser: User;
}

export default function PostForm({ addPost, currentUser }: PostFormProps) {
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');
  const [imageBase64, setImageBase64] = useState<string | undefined>(undefined);
  const [error, setError] = useState('');

  const validate = () => {
    if (message.length < 10 || message.length > 500)
      return 'El mensaje debe tener entre 10 y 500 caracteres';
    if (location.length < 4 || location.length > 30)
      return 'La ubicación debe tener entre 4 y 30 caracteres';
    return '';
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImageBase64(undefined);
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('El archivo debe ser una imagen');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result as string);
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    const newPost: Omit<Post, 'id'> = {
      message,
      location,
      image: imageBase64,
      author: currentUser,
      create_at: new Date(),
      likes: [],
      status: 'published',
    };

    addPost(newPost);
    setMessage('');
    setLocation('');
    setImageBase64(undefined);
    setError('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-primary-100 p-4 rounded mb-6 text-white w-full max-w-full"
    >
      {error && <p className="mb-2 text-red-400 text-sm">{error}</p>}

      <textarea
        placeholder="Escribe tu publicación (10-500 caracteres)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 mb-2 rounded text-black text-sm"
        rows={4}
        required
      />

      <input
        type="text"
        placeholder="Ubicación (4-30 caracteres)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full p-2 mb-2 rounded text-black text-sm"
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4 text-sm"
      />

      <button
        type="submit"
        className="bg-bg-300 hover:bg-bg-100 text-text-100 px-4 py-2 rounded w-full sm:w-auto"
      >
        Publicar
      </button>
    </form>
  );
}
