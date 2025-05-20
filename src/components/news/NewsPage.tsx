import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Cart from '../common/Cart';
import { books } from '../../data/books';
import BookCard from '../common/BookCard';

const NewsPage: React.FC = () => {
  // Get the latest books (for demo purposes, we'll just show all featured books)
  const latestBooks = books.filter(book => book.featured);

  return (
    <div className="news-page min-h-screen flex flex-col">
      <Header />
      
      <main className="news-page__main flex-grow py-8">
        <div className="news-page__container max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="news-page__title text-3xl font-serif font-bold mb-8">Novedades</h1>
          
          <div className="news-page__grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {latestBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
      <Cart />
    </div>
  );
};

export default NewsPage;