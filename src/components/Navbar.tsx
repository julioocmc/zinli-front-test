import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface NavbarProps {
  search?: {
    query: string;
    setQuery: (val: string) => void;
  };
}

export default function Navbar({ search }: NavbarProps) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <nav className="bg-primary-100 text-white p-4 flex justify-between items-center shadow">
      <Link to="/feed" className="font-bold text-lg">
        Digital Tech Inc.{' '}
      </Link>

      {location.pathname === '/feed' && search && (
        <div className="relative w-52 mr-4 hidden sm:block">
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

      {user && (
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex cursor-pointer items-center gap-2 focus:outline-none"
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
            className={`absolute right-0 mt-2 w-48 bg-primary-100 rounded shadow-lg text-white origin-top-right transform transition-all duration-200 ease-in-out
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
              className="block px-4 p-2 hover:bg-white/20"
            >
              Mi perfil
            </Link>
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="w-full cursor-pointer text-left px-4 p-2 hover:bg-white/20"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
