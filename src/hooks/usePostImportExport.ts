/* eslint-disable @typescript-eslint/no-unused-vars */
import { saveAs } from 'file-saver';
import { useRef } from 'react';
import { toast } from 'sonner';
import type { Post } from '../types/post';
import { usePosts } from '../context/PostContext';

export function usePostImportExport(username: string) {
  const { posts, addPost } = usePosts();
  const fileRef = useRef<HTMLInputElement>(null);

  const exportMyPosts = () => {
    const mine = posts.filter((p) => p.author.username === username);
    const blob = new Blob([JSON.stringify(mine, null, 2)], {
      type: 'application/json',
    });
    saveAs(blob, 'misPublicaciones.json');
  };

  const triggerImport = () => fileRef.current?.click();

  const handleImport: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    file.text().then((txt) => {
      try {
        const arr: Post[] = JSON.parse(txt);
        arr.forEach((p) => {
          const { id: _omit, ...rest } = p;
          addPost({
            ...rest,
            create_at: new Date(p.create_at),
            likes: p.likes ?? [],
          });
        });
        toast.success('Publicaciones importadas');
      } catch {
        toast.error('Archivo JSON no válido');
      }
    });
  };

  return { exportMyPosts, triggerImport, handleImport, fileRef };
}
