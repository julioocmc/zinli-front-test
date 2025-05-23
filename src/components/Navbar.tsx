import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MagnifyingGlassIcon, HomeIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { useClickOutside } from '../hooks/useClickOutside';

interface NavbarProps {
  search?: {
    query: string;
    setQuery: (val: string) => void;
  };
}

export default function Navbar({ search }: NavbarProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, () => setOpen(false));

  return (
    <nav className="bg-primary-100 text-white p-4 flex justify-between items-center shadow">
      <Link to="/feed" className="font-bold text-lg">
        Digital Tech Inc.
      </Link>
      {location.pathname === '/feed' && search && (
        <div className="relative w-52 mr-4 sm:block">
          <MagnifyingGlassIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-text-200" />
          <input
            type="text"
            placeholder="Buscar..."
            value={search.query}
            onChange={(e) => search.setQuery(e.target.value)}
            className="w-full pl-8 pr-2 py-1.5 rounded-lg bg-bg-300 placeholder:text-text-200 text-sm focus:outline-none focus:ring-2 focus:ring-accent-100"
          />
        </div>
      )}
      {location.pathname !== '/feed' && (
        <Link
          to="/feed"
          aria-label="Ir al feed"
          className="p-1 rounded hover:bg-white/10"
        >
          <HomeIcon className="w-6 h-6" />
        </Link>
      )}
      <div className="flex items-center gap-4">
        {user && (
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 cursor-pointer"
              aria-haspopup="true"
              aria-expanded={open}
            >
              <span className="hidden sm:block">{user.username}</span>
              <img
                src={user.avatar || '/DummyPFP.jpeg'}
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover border-2 border-white"
              />
            </button>

            <div
              className={`absolute right-0 mt-2 w-48 bg-primary-100 rounded shadow-lg transition transform origin-top-right
                ${
                  open
                    ? 'opacity-100 scale-100 pointer-events-auto'
                    : 'opacity-0 scale-95 pointer-events-none'
                }`}
            >
              <div className="px-4 py-3 border-b border-white/30">
                <p className="font-semibold">
                  {user.name} {user.surname}
                </p>
              </div>
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 hover:bg-white/20"
              >
                Mi perfil
              </Link>
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-white/20 cursor-pointer"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
