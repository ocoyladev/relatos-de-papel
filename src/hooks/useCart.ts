import { useState, useEffect } from 'react';
import { Book, CartItem } from '../types';

const CART_STORAGE_KEY = 'relatos_de_papel_cart';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (book: Book, format: 'physical' | 'digital' = 'physical') => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.book.id === book.id && item.format === format
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        return [...prevItems, { book, quantity: 1, format }];
      }
    });
    
    setIsCartOpen(true);
  };

  const removeFromCart = (bookId: number, format: 'physical' | 'digital') => {
    setCartItems(prevItems => 
      prevItems.filter(item => !(item.book.id === bookId && item.format === format))
    );
  };

  const updateQuantity = (bookId: number, format: 'physical' | 'digital', quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId, format);
      return;
    }

    setCartItems(prevItems => 
      prevItems.map(item => 
        item.book.id === bookId && item.format === format
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.book.price * item.quantity, 
      0
    );
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  return {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    toggleCart,
    setIsCartOpen
  };
};