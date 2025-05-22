import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUsers } from '../hooks/useUsers';
import { toast } from 'sonner';
import SplashScreen from '../components/SplashScreen';
import Footer from '../components/Footer';

export default function Register() {
  const { login } = useAuth();
  const { addUser, findUserByUsername } = useUsers();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    name: '',
    surname: '',
    avatar: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const checkUsernameAvailability = async () => {
    if (formData.username.length < 3) {
      toast.error('El username es demasiado corto para verificar');
      return;
    }
    setCheckingUsername(true);

    await new Promise((r) => setTimeout(r, 1200));

    const exists = findUserByUsername(formData.username);
    if (exists) {
      toast.error('Username no disponible');
    } else {
      toast.success('Username disponible');
    }

    setCheckingUsername(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { username, name, surname } = formData;
    if (username.length < 3 || username.length > 20) return 'Username inválido';
    if (name.length < 3 || name.length > 20) return 'Nombre inválido';
    if (surname.length < 3 || surname.length > 20) return 'Apellido inválido';

    return '';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        avatar: reader.result as string,
      }));
      setError('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    if (findUserByUsername(formData.username)) {
      const msg = 'Este username ya está registrado';
      setError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const user = { ...formData };
      addUser(user);
      toast.success('Registro exitoso');
      setLoading(false);
      setShowSplash(true);
      setTimeout(() => {
        login(user);
        navigate('/feed');
      }, 1500);
    }, 1000);
  };

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => {}} />}
      {!showSplash && (
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow flex items-center justify-center p-4 bg-bg-200 text-text-100">
            <div className="bg-primary-100 rounded-2xl shadow-lg p-6 w-full max-w-sm flex flex-col items-center">
              <h1 className="text-2xl font-bold mb-4">Registro</h1>
              {loading ? (
                <div className="text-center py-6">
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mb-2"></div>
                  <p className="text-sm">Registrando...</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col gap-3"
                >
                  <div className="relative w-full">
                    <input
                      name="username"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleChange}
                      className="p-2 rounded bg-bg-100 text-text-100 placeholder-text-200 w-full pr-28" // espacio para el botón
                      required
                    />
                    <button
                      type="button"
                      onClick={checkUsernameAvailability}
                      disabled={checkingUsername}
                      className="absolute top-1/2 right-1.5 -translate-y-1/2 bg-bg-300 cursor-pointer text-text-100 rounded px-3 py-1 text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {checkingUsername ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Verificando...
                        </>
                      ) : (
                        'Verificar'
                      )}
                    </button>
                  </div>

                  <input
                    name="name"
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={handleChange}
                    className="p-2 rounded bg-bg-100 text-text-100 placeholder-text-200"
                    required
                  />
                  <input
                    name="surname"
                    placeholder="Apellido"
                    value={formData.surname}
                    onChange={handleChange}
                    className="p-2 rounded bg-bg-100 text-text-100 placeholder-text-200"
                    required
                  />
                  <div className="flex flex-col items-start">
                    <label
                      htmlFor="avatar-upload"
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-bg-300 text-text-100 rounded select-none w-full"
                    >
                      Avatar (opcional)
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/png"
                      onChange={handleFileChange}
                      className="hidden"
                      ref={fileInputRef}
                    />

                    {formData.avatar && (
                      <div className="relative mt-2">
                        <img
                          src={formData.avatar}
                          alt="Vista previa avatar"
                          className="w-24 h-24 rounded-full object-cover border-2 border-bg-300"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, avatar: '' }));
                            if (fileInputRef.current) {
                              fileInputRef.current.value = '';
                            }
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 mt-2 text-white text-xs flex items-center justify-center cursor-pointer hover:bg-red-600"
                          aria-label="Eliminar avatar"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>

                  {error && <p className="text-red-300 text-sm">{error}</p>}
                  <button
                    type="submit"
                    className="w-full bg-bg-200 cursor-pointer p-2 rounded text-white mt-2"
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
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}
