import { useState } from 'react';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { username, name, surname, avatar } = formData;
    if (username.length < 3 || username.length > 20) return 'Username inválido';
    if (name.length < 3 || name.length > 20) return 'Nombre inválido';
    if (surname.length < 3 || surname.length > 20) return 'Apellido inválido';
    if (avatar && (!avatar.endsWith('.png') || avatar.length > 200))
      return 'Avatar debe ser un .png válido y de tamaño razonable';
    return '';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'image/png') {
      const err = 'Solo se aceptan archivos PNG';
      setError(err);
      toast.error(err);
      return;
    }

    if (file.size > 200 * 1024) {
      const err = 'El archivo PNG debe ser menor a 200KB';
      setError(err);
      toast.error(err);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        avatar: reader.result as string,
      }));
      setError('');
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
                  <input
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="p-2 rounded bg-bg-100 text-text-100 placeholder-text-200"
                    required
                  />
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
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, avatar: '' }))
                          }
                          className="absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 text-white text-xs flex items-center justify-center hover:bg-red-600"
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
