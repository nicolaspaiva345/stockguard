import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem('token'))
  );

  useEffect(() => {
    function handleAuthChange() {
      setIsAuthenticated(Boolean(localStorage.getItem('token')));
    }

    window.addEventListener('auth-change', handleAuthChange);

    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');

    window.dispatchEvent(new Event('auth-change'));

    navigate('/login');
  }

  return (
    <nav className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          onClick={() => navigate('/')}
          className="text-xl font-bold text-zinc-900"
        >
          StockGuard
        </button>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate('/admin')}
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
              >
                Painel
              </button>

              <button
                onClick={handleLogout}
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
              >
                Sair
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
            >
              Entrar
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}