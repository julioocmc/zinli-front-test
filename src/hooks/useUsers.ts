import type { User } from '../types/user';

export const useUsers = () => {
  const getUsers = (): User[] => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  };

  const addUser = (newUser: User) => {
    const users = getUsers();
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  };

  const findUserByUsername = (username: string): User | undefined => {
    return getUsers().find((user) => user.username === username);
  };

  return { getUsers, addUser, findUserByUsername };
};
