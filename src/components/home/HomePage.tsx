import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Cart from '../common/Cart';
import SearchBar from '../common/SearchBar';
import BookGrid from './BookGrid';
import FeaturedBooks from './FeaturedBooks';
import { books } from '../../data/books';
import { Book } from '../../types';

const HomePage: React.FC = () => {
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter books whenever search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBooks(books);
    } else {
      const query = searchQuery.toLowerCase();
      const results = books.filter(book => 
        book.title.toLowerCase().includes(query)
      );
      setFilteredBooks(results);
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Get featured books
  const featuredBooks = books.filter(book => book.featured);

  return (
    <div className="home-page min-h-screen flex flex-col">
      <Header />
      
      <main className="home-page__main flex-grow">
        <section className="home-page__hero bg-primary-dark text-white py-12 md:py-20 mb-8">
          <div className="home-page__hero-content max-w-7xl mx-auto px-4 md:px-8 text-center">
            <h1 className="home-page__title text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 md:mb-6">
              Descubre tu próxima aventura literaria
            </h1>
            <p className="home-page__subtitle text-lg md:text-xl max-w-3xl mx-auto mb-6 md:mb-10 text-white/80">
              Explora nuestra cuidada selección de libros y encuentra historias que te acompañarán para siempre
            </p>
            
            <SearchBar onSearch={handleSearch} />
          </div>
        </section>
        
        {searchQuery.trim() === '' && (
          <FeaturedBooks books={featuredBooks} />
        )}
        
        <section className="home-page__books py-8 md:py-12">
          <div className="home-page__books-content max-w-7xl mx-auto px-4 md:px-8">
            <header className="home-page__books-header mb-8">
              <h2 className="home-page__books-title text-2xl md:text-3xl font-serif font-bold">
                {searchQuery.trim() !== '' 
                  ? `Resultados para "${searchQuery}" (${filteredBooks.length})` 
                  : 'Nuestro catálogo'}
              </h2>
            </header>
            
            {filteredBooks.length > 0 ? (
              <BookGrid books={filteredBooks} />
            ) : (
              <div className="home-page__no-results text-center py-12">
                <p className="text-xl text-gray-500 mb-4">No se encontraron libros con ese título</p>
                <p className="text-gray-400">Intenta con otra búsqueda</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
      <Cart />
    </div>
  );
};

export default HomePage;