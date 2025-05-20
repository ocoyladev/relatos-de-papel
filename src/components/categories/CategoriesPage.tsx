import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Cart from '../common/Cart';
import { books } from '../../data/books';
import BookCard from '../common/BookCard';

const CategoriesPage: React.FC = () => {
  // Get unique genres from all books
  const allGenres = Array.from(
    new Set(books.flatMap(book => book.genre))
  ).sort();

  return (
    <div className="categories-page min-h-screen flex flex-col">
      <Header />
      
      <main className="categories-page__main flex-grow py-8">
        <div className="categories-page__container max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="categories-page__title text-3xl font-serif font-bold mb-8">Categorías</h1>
          
          <div className="categories-page__grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allGenres.map((genre) => {
              const genreBooks = books.filter(book => book.genre.includes(genre));
              return (
                <Link 
                  key={genre}
                  to={`/categories/${genre.toLowerCase()}`}
                  className="categories-page__item block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <h2 className="categories-page__item-title text-xl font-serif font-bold mb-2">{genre}</h2>
                  <p className="categories-page__item-count text-gray-600">
                    {genreBooks.length} {genreBooks.length === 1 ? 'libro' : 'libros'}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      
      <Footer />
      <Cart />
    </div>
  );
};

export default CategoriesPage