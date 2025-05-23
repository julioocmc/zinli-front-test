import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { useUsers } from '../hooks/useUsers';
import SplashScreen from '../components/SplashScreen';
import Footer from '../components/Footer';
import { UsernameInput } from '../components/Register/UsernameInput';
import { AvatarInput } from '../components/Register/AvatarInput';

export default function Register() {
  const { login } = useAuth();
  const { addUser, findUserByUsername } = useUsers();
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: '',
    name: '',
    surname: '',
    avatar: '',
  });
  const [loading, setLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  const validate = () => {
    if (data.username.length < 3 || data.username.length > 20)
      return 'Username inválido';
    if (data.name.length < 3 || data.name.length > 20) return 'Nombre inválido';
    if (data.surname.length < 3 || data.surname.length > 20)
      return 'Apellido inválido';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) return toast.error(err);

    if (findUserByUsername(data.username))
      return toast.error('Este username ya está registrado');

    setLoading(true);
    setTimeout(() => {
      addUser(data);
      toast.success('Registro exitoso');
      setLoading(false);
      setShowSplash(true);
      setTimeout(() => {
        login(data);
        navigate('/feed');
      }, 1500);
    }, 1000);
  };

  if (showSplash) return <SplashScreen onFinish={() => {}} />;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center p-4 bg-bg-200 text-text-100">
        <div className="bg-primary-100 rounded-2xl shadow-lg p-6 w-full max-w-sm flex flex-col">
          <h1 className="text-2xl font-bold mb-4 text-center">Registro</h1>

          {loading ? (
            <div className="text-center py-6">...registrando</div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <UsernameInput
                value={data.username}
                onChange={(v) => setData({ ...data, username: v })}
              />

              <input
                placeholder="Nombre"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="p-2 rounded bg-bg-100"
                required
              />
              <input
                placeholder="Apellido"
                value={data.surname}
                onChange={(e) => setData({ ...data, surname: e.target.value })}
                className="p-2 rounded bg-bg-100"
                required
              />

              <AvatarInput
                src={data.avatar}
                onChange={(img) => setData({ ...data, avatar: img })}
                onClear={() => setData({ ...data, avatar: '' })}
              />

              <button
                type="submit"
                className="bg-bg-200 p-2 rounded text-white mt-2 cursor-pointer"
              >
                Registrarse
              </button>
            </form>
          )}

          <p className="text-sm mt-4 text-center text-text-200">
            ¿Ya tienes cuenta?{' '}
            <Link to="/" className="underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
