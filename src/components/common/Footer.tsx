import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-primary-dark text-white pt-12 pb-8">
      <div className="footer__container max-w-7xl mx-auto px-4 md:px-8">
        <div className="footer__content grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="footer__section">
            <h3 className="footer__title text-xl font-serif mb-4">Relatos de Papel</h3>
            <p className="footer__description text-sm leading-relaxed text-gray-300">
              Tu librería online especializada en literatura en español, con una cuidada selección 
              de obras clásicas y contemporáneas.
            </p>
            <div className="footer__social-links flex mt-4 space-x-4">
              <a href="#" className="footer__social-link text-white hover:text-secondary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="footer__social-link text-white hover:text-secondary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="footer__social-link text-white hover:text-secondary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div className="footer__section">
            <h3 className="footer__title text-xl font-serif mb-4">Enlaces rápidos</h3>
            <ul className="footer__links space-y-2 list-none p-0">
              <li><a href="#" className="footer__link text-gray-300 hover:text-secondary transition-colors">Sobre nosotros</a></li>
              <li><a href="#" className="footer__link text-gray-300 hover:text-secondary transition-colors">Preguntas frecuentes</a></li>
              <li><a href="#" className="footer__link text-gray-300 hover:text-secondary transition-colors">Política de privacidad</a></li>
              <li><a href="#" className="footer__link text-gray-300 hover:text-secondary transition-colors">Términos y condiciones</a></li>
              <li><a href="#" className="footer__link text-gray-300 hover:text-secondary transition-colors">Política de envíos</a></li>
            </ul>
          </div>
          
          <div className="footer__section">
            <h3 className="footer__title text-xl font-serif mb-4">Contacto</h3>
            <address className="footer__contact space-y-3 not-italic text-sm text-gray-300">
              <p className="footer__contact-item flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>Calle Librería 123, 28001 Madrid, España</span>
              </p>
              <p className="footer__contact-item flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <span>+34 912 345 678</span>
              </p>
              <p className="footer__contact-item flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <span>info@relatosdepapel.com</span>
              </p>
            </address>
          </div>
        </div>
        
        <div className="footer__bottom mt-12 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Relatos de Papel. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;