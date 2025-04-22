import React from 'react';
import { Book, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-indigo-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-semibold transition-transform hover:scale-105"
          >
            <Book className="h-6 w-6" />
            <span>Controle de Petições e Prazos</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center space-x-6">
            <NavLink to="/" active={location.pathname === '/'} onClick={closeMenu}>
              Dashboard
            </NavLink>
            <NavLink to="/clients" active={location.pathname.includes('/clients')} onClick={closeMenu}>
              Clientes
            </NavLink>
            <NavLink to="/lawyers" active={location.pathname === '/lawyers'} onClick={closeMenu}>
              Advogados
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-indigo-800 py-4 px-4 animate-fadeIn">
          <div className="flex flex-col space-y-3">
            <NavLink to="/" active={location.pathname === '/'} onClick={closeMenu}>
              Dashboard
            </NavLink>
            <NavLink to="/clients" active={location.pathname.includes('/clients')} onClick={closeMenu}>
              Clientes
            </NavLink>
            <NavLink to="/lawyers" active={location.pathname === '/lawyers'} onClick={closeMenu}>
              Advogados
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, onClick, children }) => {
  return (
    <Link
      to={to}
      className={`transition-all duration-200 py-2 border-b-2 ${
        active
          ? 'border-yellow-400 text-yellow-400'
          : 'border-transparent hover:border-yellow-300 hover:text-yellow-300'
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Header;