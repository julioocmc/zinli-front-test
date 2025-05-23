/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState } from 'react';
import { toast } from 'sonner';
import { useUsers } from './useUsers';

export function useUsernameCheck() {
  const { findUserByUsername } = useUsers();
  const [checking, setChecking] = useState(false);

  const check = async (username: string) => {
    if (username.length < 3) {
      toast.error('El username es demasiado corto para verificar');
      return false;
    }
    setChecking(true);
    await new Promise((r) => setTimeout(r, 1200));

    const exists = !!findUserByUsername(username);
    exists
      ? toast.error('Username no disponible')
      : toast.success('Username disponible');
    setChecking(false);
    return !exists;
  };

  return { checking, check };
}
