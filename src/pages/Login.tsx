import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUsers } from '../hooks/useUsers';
import { toast } from 'sonner';
import SplashScreen from '../components/SplashScreen';
import Footer from '../components/Footer';

export default function Login() {
  const { login } = useAuth();
  const { findUserByUsername } = useUsers();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [showSplash, setShowSplash] = useState(false);

  const handleLogin = () => {
    if (username.length < 3 || username.length > 20) {
      toast.error('Username inválido');
      return;
    }
    const user = findUserByUsername(username);
    if (!user) {
      setError('Usuario no registrado');
      toast.error('Usuario no registrado');
      return;
    }

    setShowSplash(true);
    setTimeout(() => {
      login(user);
      setShowSplash(false);
      navigate('/feed');
    }, 1500);
  };

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex items-center justify-center p-4 bg-bg-200 text-text-100">
          <div className="bg-primary-100 rounded-2xl shadow-lg p-6 w-full max-w-sm flex flex-col items-center">
            <h1 className="text-xl text-text-100 font-bold mb-4">
              Iniciar Sesión
            </h1>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setError('');
                setUsername(e.target.value);
              }}
              className="w-full p-2 mb-2 rounded bg-bg-100 text-text-100 placeholder-text-200"
            />
            {error && <p className="text-red-300 text-sm">{error}</p>}
            <button
              onClick={handleLogin}
              className="w-full bg-bg-200 cursor-pointer p-2 rounded text-white mt-2"
            >
              Entrar
            </button>
            <p className="text-sm mt-4 text-text-200">
              ¿No tienes cuenta?{' '}
              <Link to="/register" className="underline">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
