import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, LogOut, LayoutDashboard, Terminal } from 'lucide-react';
import { AuthContext } from '../context/AuthContext.jsx';

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const navigate = useNavigate();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const navLinks = [
    { name: 'All News', path: '/' },
    { name: 'Tech News', path: '/category/tech-news' },
    { name: 'Startups', path: '/category/startups' },
    { name: 'Coding', path: '/category/coding' },
    { name: 'AI', path: '/category/ai' },
    { name: 'Spotlight', path: '/category/sponsored' },
  ];

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-brand-darkBorder bg-white/80 dark:bg-brand-darkBg/85 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
            <span className="flex items-center justify-center bg-brand-primary text-white p-1.5 rounded-lg shadow-md shadow-indigo-500/20">
              <Terminal size={20} className="stroke-[2.5]" />
            </span>
            <span>
              TECH<span className="text-brand-primary">SPOTLIGHT</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-semibold tracking-wide transition-colors ${
                    isActive
                      ? 'text-brand-primary font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-brand-primary dark:hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Actions (Theme toggle, Admin indicators) */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {user ? (
              <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-4">
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-1.5 text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-lg font-medium transition-all"
                >
                  <LayoutDashboard size={14} />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogoutClick}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link
                to="/admin"
                className="text-xs text-slate-400 dark:text-slate-500 hover:text-brand-primary dark:hover:text-slate-300 transition-colors"
              >
                Portal
              </Link>
            )}
          </div>

          {/* Mobile Hamburger menu */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Open menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-brand-darkBorder bg-white dark:bg-brand-darkBg px-4 pt-2 pb-4 space-y-1 transition-all">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                  isActive
                    ? 'bg-slate-100 dark:bg-slate-800 text-brand-primary'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-primary'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          {user ? (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <div className="px-3 text-xs font-semibold text-slate-500">
                Logged in as {user.name}
              </div>
              <Link
                to="/admin/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <LayoutDashboard size={18} />
                Admin Dashboard
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogoutClick();
                }}
                className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="block text-center text-xs text-slate-500 hover:text-brand-primary pt-3"
            >
              Admin Portal
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
