import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Cart from '../common/Cart';
import { books } from '../../data/books';
import BookGrid from '../home/BookGrid';

const CategoryBooksPage: React.FC = () => {
  const { genre } = useParams<{ genre: string }>();
  
  // Filter books by genre
  const categoryBooks = books.filter(book => 
    book.genre.some(g => g.toLowerCase() === genre?.toLowerCase())
  );

  return (
    <div className="category-books-page min-h-screen flex flex-col">
      <Header />
      
      <main className="category-books-page__main flex-grow py-8">
        <div className="category-books-page__container max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="category-books-page__title text-3xl font-serif font-bold mb-8 capitalize">
            {genre?.replace(/-/g, ' ')}
          </h1>
          
          {categoryBooks.length > 0 ? (
            <BookGrid books={categoryBooks} />
          ) : (
            <div className="category-books-page__empty text-center py-12">
              <p className="text-xl text-gray-500 mb-4">No se encontraron libros en esta categoría</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <Cart />
    </div>
  );
};

export default CategoryBooksPage;