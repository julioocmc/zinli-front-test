import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Feed from '../pages/Feed';
import Profile from '../pages/Profile';
import { useAuth } from '../context/AuthContext';

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Home → login o feed */}
        <Route
          path="/"
          element={user ? <Navigate to="/feed" replace /> : <Login />}
        />

        {/* Registro */}
        <Route
          path="/register"
          element={user ? <Navigate to="/feed" replace /> : <Register />}
        />

        {/* Feed (protegido) */}
        <Route
          path="/feed"
          element={user ? <Feed /> : <Navigate to="/" replace />}
        />

        {/* Perfil (protegido) */}
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/" replace />}
        />

        {/* 404 */}
        <Route path="*" element={<div>Página no encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
}
