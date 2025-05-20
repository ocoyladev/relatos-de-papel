import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import BookPage from './components/book/BookPage';
import CheckoutPage from './components/checkout/CheckoutPage';
import CategoriesPage from './components/categories/CategoriesPage';
import NewsPage from './components/news/NewsPage';
import CategoryBooksPage from './components/categories/CategoryBooksPage';
import LandingPage from './components/landing/LandingPage';
import Header from './components/common/Header';
import Cart from './components/common/Cart';

function App() {
  return (
    <Router>
      {/* <Header/> 
      <Cart/> */}
      <Routes>         
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/book/:id" element={<BookPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:genre" element={<CategoryBooksPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;