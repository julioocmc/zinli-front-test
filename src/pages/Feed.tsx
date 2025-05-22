import { useAuth } from '../context/AuthContext';

export default function Feed() {
  const { user, logout } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Bienvenido, {user?.username}</h1>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
