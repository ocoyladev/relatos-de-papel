import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { books } from '../../data/books';
import { Book } from '../../types';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Cart from '../common/Cart';
import Rating from '../common/Rating';
import { ChevronLeft, BookOpen, Download, ShoppingCart } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

const BookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<'physical' | 'digital'>('physical');
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const foundBook = books.find(b => b.id === Number(id));
      setBook(foundBook || null);
      
      if (foundBook) {
        if (foundBook.format === 'digital') {
          setSelectedFormat('digital');
        } else {
          setSelectedFormat('physical');
        }
      }
      
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleAddToCart = () => {
    if (book) {
      addToCart(book, selectedFormat);
    }
  };

  if (isLoading) {
    return (
      <div className="book-page min-h-screen flex flex-col">
        <Header />
        <main className="book-page__main flex-grow flex items-center justify-center">
          <div className="loader animate-pulse w-16 h-16 bg-primary-light rounded-full opacity-70"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="book-page min-h-screen flex flex-col">
        <Header />
        <main className="book-page__main flex-grow py-8">
          <div className="book-page__container max-w-7xl mx-auto px-4 md:px-8">
            <div className="book-page__not-found text-center py-16">
              <h1 className="text-3xl font-serif font-bold mb-4">Libro no encontrado</h1>
              <p className="text-gray-600 mb-6">Lo sentimos, no hemos podido encontrar el libro que buscas.</p>
              <Link 
                to="/home" 
                className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-light transition-colors"
              >
                <ChevronLeft size={20} className="mr-2" />
                Volver a la tienda
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="book-page min-h-screen flex flex-col">
      <Header />
      
      <main className="book-page__main flex-grow py-8">
        <div className="book-page__container max-w-7xl mx-auto px-4 md:px-8">
          <div className="book-page__navigation mb-6">
            <Link 
              to="/home" 
              className="book-page__back-link inline-flex items-center text-primary hover:text-primary-dark transition-colors"
            >
              <ChevronLeft size={20} className="mr-1" />
              Volver a la tienda
            </Link>
          </div>
          
          <div className="book-page__content bg-white rounded-lg shadow-md overflow-hidden">
            <div className="book-page__grid md:grid md:grid-cols-12 gap-0">
              <div className="book-page__image-section md:col-span-5 lg:col-span-4 bg-gray-100">
                <div className="book-page__image-container h-96 md:h-full w-full relative overflow-hidden">
                  <img 
                    src={book.coverImage} 
                    alt={`Portada de ${book.title}`}
                    className="book-page__image w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="book-page__details-section md:col-span-7 lg:col-span-8 p-6 md:p-8">
                <div className="book-page__meta flex flex-wrap gap-2 mb-4">
                  {book.genre.map((genre, index) => (
                    <Link 
                      key={index}
                      to={`/categories/${genre.toLowerCase()}`}
                      className="book-page__genre inline-block bg-gray-100 text-text-light text-xs px-3 py-1 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {genre}
                    </Link>
                  ))}
                </div>
                
                <h1 className="book-page__title text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-2">
                  {book.title}
                </h1>
                
                <p className="book-page__author text-lg text-gray-600 mb-4">
                  por <span className="font-semibold">{book.author}</span>
                </p>
                
                <div className="book-page__rating mb-6 flex items-center">
                  <Rating rating={book.rating} />
                  <span className="book-page__rating-count ml-2 text-sm text-gray-500">
                    (128 reseñas)
                  </span>
                </div>
                
                <div className="book-page__price-container mb-6">
                  <p className="book-page__price text-2xl font-bold text-primary">
                    {book.price.toFixed(2)} €
                  </p>
                  <p className="book-page__stock text-sm text-gray-500">
                    {book.stockStatus === 'in stock' 
                      ? 'En stock' 
                      : book.stockStatus === 'low stock' 
                      ? 'Pocas unidades disponibles' 
                      : 'Agotado'}
                  </p>
                </div>
                
                <div className="book-page__description mb-8">
                  <h2 className="text-lg font-semibold mb-2">Descripción</h2>
                  <p className="text-text-light leading-relaxed">
                    {book.description}
                  </p>
                </div>
                
                <div className="book-page__details grid grid-cols-2 gap-x-4 gap-y-2 mb-8 text-sm">
                  <div className="book-page__detail">
                    <span className="text-gray-500">ISBN:</span> {book.isbn}
                  </div>
                  <div className="book-page__detail">
                    <span className="text-gray-500">Fecha de publicación:</span> {book.publicationDate}
                  </div>
                </div>
                
                {book.format !== 'physical' && book.format !== 'digital' && (
                  <div className="book-page__format-selection mb-6">
                    <h2 className="text-lg font-semibold mb-3">Formato</h2>
                    <div className="book-page__format-options flex space-x-4">
                      <button 
                        className={`book-page__format-option flex items-center px-4 py-2 border rounded-md transition-colors ${
                          selectedFormat === 'physical' 
                            ? 'border-primary text-primary bg-primary/5' 
                            : 'border-gray-300 text-gray-600 hover:border-gray-400'
                        }`}
                        onClick={() => setSelectedFormat('physical')}
                      >
                        <BookOpen size={18} className="mr-2" />
                        <span>Físico</span>
                      </button>
                      
                      <button 
                        className={`book-page__format-option flex items-center px-4 py-2 border rounded-md transition-colors ${
                          selectedFormat === 'digital' 
                            ? 'border-primary text-primary bg-primary/5' 
                            : 'border-gray-300 text-gray-600 hover:border-gray-400'
                        }`}
                        onClick={() => setSelectedFormat('digital')}
                      >
                        <Download size={18} className="mr-2" />
                        <span>Digital</span>
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="book-page__actions">
                  <button 
                    className="book-page__add-to-cart-button w-full sm:w-auto bg-primary hover:bg-primary-light text-white font-semibold px-8 py-3 rounded-md flex items-center justify-center transition-colors"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart size={20} className="mr-2" />
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <Cart />
    </div>
  );
};

export default BookPage;