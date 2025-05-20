import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, ShoppingCart } from 'lucide-react';
// import { useCart } from '../../hooks/useCart';
import { useCartContext } from '../../context/CartContext';

const Header: React.FC = () => {
  const { getTotalItems, toggleCart } = useCartContext();
  const location = useLocation();
  
  return (
    <header className="header">
      <div className="header__container bg-primary py-4 px-4 md:px-8 shadow-md">
        <div className="header__content flex justify-between items-center max-w-7xl mx-auto">
          <Link to="/home" className="header__logo flex items-center text-white no-underline">
            <BookOpen className="header__logo-icon w-8 h-8 mr-2" />
            <h1 className="header__title text-xl md:text-2xl font-serif font-bold m-0">Relatos de Papel</h1>
          </Link>
          
          <nav className="header__nav">
            <ul className="header__nav-list flex space-x-4 md:space-x-8 list-none p-0 m-0">
              <li className="header__nav-item">
                <Link 
                  to="/home" 
                  className={`header__nav-link text-white hover:text-secondary-light transition-colors ${
                    location.pathname === '/home' ? 'border-b-2 border-secondary' : ''
                  }`}
                >
                  Inicio
                </Link>
              </li>
              <li className="header__nav-item hidden sm:block">
                <Link 
                  to="/categories" 
                  className={`header__nav-link text-white hover:text-secondary-light transition-colors ${
                    location.pathname === '/categories' ? 'border-b-2 border-secondary' : ''
                  }`}
                >
                  Categorías
                </Link>
              </li>
              <li className="header__nav-item hidden sm:block">
                <Link 
                  to="/news" 
                  className={`header__nav-link text-white hover:text-secondary-light transition-colors ${
                    location.pathname === '/news' ? 'border-b-2 border-secondary' : ''
                  }`}
                >
                  Destacados
                </Link>
              </li>
              <li className="header__nav-item">
                <button 
                  onClick={toggleCart}
                  className="header__cart-button flex items-center text-white hover:text-secondary-light transition-colors bg-transparent border-0 cursor-pointer p-0"
                >
                  <ShoppingCart className="header__cart-icon w-5 h-5 mr-1" />
                  <span className="header__cart-count">
                    {getTotalItems()}
                  </span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;