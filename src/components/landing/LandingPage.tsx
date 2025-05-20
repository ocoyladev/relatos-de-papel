import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Search, ShoppingBag, CreditCard } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to main page after 5 seconds if no action is taken
    const timer = setTimeout(() => {
      navigate('/home');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleExploreClick = () => {
    navigate('/home');
  };

  return (
    <div className="landing-page min-h-screen flex flex-col">
      <main className="landing-page__main flex-grow">
        <div className="landing-page__hero relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white overflow-hidden">
          {/* Background pattern */}
          <div className="landing-page__background absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMCAxLjEtLjkgMi0yIDJoLTRjLTEuMSAwLTItLjktMi0ydi00YzAtMS4xLjktMiAyLTJoNGMxLjEgMCAyIC45IDIgMnY0em0tMTYgMGMwIDEuMS0uOSAyLTIgMmgtNGMtMS4xIDAtMi0uOS0yLTJ2LTRjMC0xLjEuOS0yIDItMmg0YzEuMSAwIDIgLjkgMiAydjR6bTE2LTE2YzAgMS4xLS45IDItMiAyaC00Yy0xLjEgMC0yLS45LTItMnYtNGMwLTEuMS45LTIgMi0yaDRjMS4xIDAgMiAuOSAyIDJ2NHptLTE2IDBjMCAxLjEtLjkgMi0yIDJoLTRjLTEuMSAwLTItLjktMi0ydi00YzAtMS4xLjktMiAyLTJoNGMxLjEgMCAyIC45IDIgMnY0eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+')]"></div>
          </div>
          
          <div className="landing-page__content text-center px-6 py-16 z-10 animate-fade-in">
            <div className="landing-page__logo flex justify-center mb-8">
              <BookOpen size={80} className="text-white" />
            </div>
            
            <h1 className="landing-page__title text-4xl md:text-6xl font-serif font-bold mb-6">
              Relatos de Papel
            </h1>
            
            <p className="landing-page__tagline text-xl md:text-2xl max-w-2xl mx-auto mb-8 text-white/90">
              Descubre un mundo de historias en tu librería online favorita
            </p>
            
            <button 
              onClick={handleExploreClick}
              className="landing-page__cta-button bg-secondary hover:bg-secondary-light text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Explorar libros
            </button>
            
            <div className="landing-page__features grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
              <div className="landing-page__feature flex flex-col items-center">
                <div className="landing-page__feature-icon bg-white/10 p-4 rounded-full mb-4">
                  <Search className="text-secondary" size={28} />
                </div>
                <h3 className="landing-page__feature-title text-lg font-semibold mb-2">Encuentra tu próxima lectura</h3>
                <p className="landing-page__feature-text text-white/80">Miles de títulos organizados para que descubras tu próximo libro favorito.</p>
              </div>
              
              <div className="landing-page__feature flex flex-col items-center">
                <div className="landing-page__feature-icon bg-white/10 p-4 rounded-full mb-4">
                  <ShoppingBag className="text-secondary" size={28} />
                </div>
                <h3 className="landing-page__feature-title text-lg font-semibold mb-2">Compra fácil y segura</h3>
                <p className="landing-page__feature-text text-white/80">Proceso de compra simplificado para que disfrutes de tu libro lo antes posible.</p>
              </div>
              
              <div className="landing-page__feature flex flex-col items-center">
                <div className="landing-page__feature-icon bg-white/10 p-4 rounded-full mb-4">
                  <CreditCard className="text-secondary" size={28} />
                </div>
                <h3 className="landing-page__feature-title text-lg font-semibold mb-2">Pago seguro</h3>
                <p className="landing-page__feature-text text-white/80">Múltiples métodos de pago con la máxima seguridad para tus datos.</p>
              </div>
            </div>
            
            <p className="landing-page__redirect-notice mt-12 text-white/60 text-sm">
              Serás redirigido a la página principal en unos segundos...
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;