import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../../types';
import { ChevronRight } from 'lucide-react';
import Rating from '../common/Rating';

interface FeaturedBooksProps {
  books: Book[];
}

const FeaturedBooks: React.FC<FeaturedBooksProps> = ({ books }) => {
  if (books.length === 0) return null;

  return (
    <section className="featured-books py-8 mb-8">
      <div className="featured-books__container max-w-7xl mx-auto px-4 md:px-8">
        <header className="featured-books__header flex justify-between items-center mb-6">
          <h2 className="featured-books__title text-2xl md:text-3xl font-serif font-bold">
            Libros destacados
          </h2>
          <Link 
            to="/home" 
            className="featured-books__view-all text-primary hover:text-primary-dark flex items-center text-sm font-semibold"
          >
            Ver todos <ChevronRight size={16} />
          </Link>
        </header>
        
        <div className="featured-books__carousel overflow-x-auto flex pb-4 space-x-6">
          {books.map(book => (
            <div 
              key={book.id} 
              className="featured-books__item flex-shrink-0 w-64 md:w-72 bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Link to={`/book/${book.id}`} className="block no-underline text-inherit hover:no-underline">
                <div className="featured-books__item-image-container h-80 overflow-hidden">
                  <img 
                    src={book.coverImage} 
                    alt={`Portada de ${book.title}`}
                    className="featured-books__item-image w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                
                <div className="featured-books__item-content p-4">
                  <h3 className="featured-books__item-title text-lg font-serif font-bold mb-1 line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="featured-books__item-author text-sm text-gray-600 mb-2">
                    {book.author}
                  </p>
                  
                  <div className="featured-books__item-meta flex justify-between items-center mt-3">
                    <div className="featured-books__item-rating">
                      <Rating rating={book.rating} />
                    </div>
                    <p className="featured-books__item-price font-semibold text-primary">
                      {book.price.toFixed(2)} €
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;