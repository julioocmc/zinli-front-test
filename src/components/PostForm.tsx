// src/components/PostForm.tsx
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { Image as ImageIcon } from 'lucide-react';
import type { Post } from '../types/post';
import type { User } from '../types/user';

interface PostFormProps {
  addPost: (post: Omit<Post, 'id'>) => void;
  currentUser: User;
}

export default function PostForm({ addPost, currentUser }: PostFormProps) {
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');
  const [imageBase64, setImageBase64] = useState<string | undefined>();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const validate = () => {
    if (message.length < 10 || message.length > 500) {
      toast.error('El mensaje debe tener entre 10 y 500 caracteres');
      return false;
    }
    if (location.length < 4 || location.length > 30) {
      toast.error('La ubicación debe tener entre 4 y 30 caracteres');
      return false;
    }
    return true;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImageBase64(undefined);
      return;
    }
    if (!file.type.startsWith('image/')) {
      toast.error('El archivo debe ser una imagen');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImageBase64(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

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
    toast.success('¡Publicación creada!');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-primary-100/90 backdrop-blur-sm p-6 rounded-2xl mb-6 shadow-xl text-text-100 flex flex-col space-y-4"
    >
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Comparte algo interesante…"
        rows={4}
        required
        className="w-full rounded-lg border border-primary-300 bg-accent-200 p-3 text-sm placeholder:text-text-200 focus:outline-none focus:ring-2 focus:ring-accent-100"
      />
      <div className="grid grid-cols-12 gap-4 items-end">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="¿Dónde te encuentras?"
          required
          className="col-span-12 sm:col-span-8 md:col-span-7 rounded-lg border border-primary-300 bg-accent-200 p-3 text-sm placeholder:text-text-200 focus:outline-none focus:ring-2 focus:ring-accent-100"
        />
        <div className="col-span-12 sm:col-span-4 md:col-span-5">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-full h-11 cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg border border-primary-300 bg-accent-200 hover:bg-bg-300 transition"
          >
            <ImageIcon className="w-5 h-5" />
            {imageBase64 ? 'Imagen seleccionada' : 'Adjuntar foto'}
          </button>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-8 py-2 cursor-pointer rounded-lg bg-accent-200 border border-primary-300 shadow-md font-semibold"
        >
          Publicar
        </button>
      </div>
    </form>
  );
}
