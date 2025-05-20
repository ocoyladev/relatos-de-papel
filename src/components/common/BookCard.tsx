import React from 'react';
import { Link } from 'react-router-dom';
import { Book as BookType } from '../../types';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

interface BookCardProps {
  book: BookType;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book);
  };

  return (
    <div className="book-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
      <Link to={`/book/${book.id}`} className="book-card__link block no-underline text-inherit">
        <div className="book-card__image-container relative h-64 overflow-hidden">
          <img 
            src={book.coverImage} 
            alt={`Portada de ${book.title}`} 
            className="book-card__image w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {book.featured && (
            <div className="book-card__featured-badge absolute top-0 right-0 bg-secondary text-white px-3 py-1 text-sm font-semibold">
              Destacado
            </div>
          )}
        </div>
        
        <div className="book-card__content p-4">
          <h3 className="book-card__title text-lg font-serif font-bold mb-1 line-clamp-2">{book.title}</h3>
          <p className="book-card__author text-sm text-gray-600 mb-2">{book.author}</p>
          
          <div className="book-card__details flex justify-between items-center mt-3">
            <p className="book-card__price font-semibold text-primary">{book.price.toFixed(2)} €</p>
            
            <button 
              onClick={handleAddToCart}
              className="book-card__cart-button flex items-center justify-center bg-primary hover:bg-primary-light text-white rounded-full w-10 h-10 transition-colors"
              aria-label={`Añadir ${book.title} al carrito`}
            >
              <ShoppingBag size={18} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;