import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Feed from '../pages/Feed';
import { useAuth } from '../context/AuthContext';

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/feed" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/feed" replace /> : <Register />}
        />
        <Route
          path="/feed"
          element={user ? <Feed /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<div>Página no encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
}
