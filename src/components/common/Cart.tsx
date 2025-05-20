import React from 'react';
import { X, ShoppingBag, Trash } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { Link, useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { 
    cartItems, 
    isCartOpen, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice, 
    setIsCartOpen 
  } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (
    bookId: number, 
    format: 'physical' | 'digital', 
    newQuantity: number
  ) => {
    updateQuantity(bookId, format, newQuantity);
  };

  const proceedToCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      {isCartOpen && (
        <div 
          className="cart__overlay fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsCartOpen(false)}
        ></div>
      )}
      <div className={`cart fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="cart__header flex items-center justify-between p-4 border-b">
          <h2 className="cart__title font-serif text-xl font-bold flex items-center">
            <ShoppingBag className="mr-2" size={20} />
            Mi Carrito
          </h2>
          <button 
            className="cart__close-button text-gray-500 hover:text-primary transition-colors"
            onClick={() => setIsCartOpen(false)}
            aria-label="Cerrar carrito"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="cart__content flex-grow overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="cart__empty flex flex-col items-center justify-center h-full text-center p-4">
              <ShoppingBag size={48} className="text-gray-300 mb-4" />
              <p className="cart__empty-text text-gray-500 mb-4">Tu carrito está vacío</p>
              <Link 
                to="/home" 
                className="cart__shop-link bg-primary text-white px-4 py-2 rounded hover:bg-primary-light transition-colors"
                onClick={() => setIsCartOpen(false)}
              >
                Empezar a comprar
              </Link>
            </div>
          ) : (
            <ul className="cart__items space-y-4">
              {cartItems.map((item) => (
                <li key={`${item.book.id}-${item.format}`} className="cart__item flex border-b pb-4">
                  <div className="cart__item-image h-20 w-16 flex-shrink-0 mr-3">
                    <img 
                      src={item.book.coverImage} 
                      alt={item.book.title} 
                      className="h-full w-full object-cover rounded"
                    />
                  </div>
                  
                  <div className="cart__item-details flex-grow">
                    <h3 className="cart__item-title text-base font-semibold line-clamp-1">{item.book.title}</h3>
                    <p className="cart__item-format text-xs text-gray-500 mb-1">
                      Formato: {item.format === 'physical' ? 'Físico' : 'Digital'}
                    </p>
                    <div className="cart__item-price-qty flex justify-between items-center">
                      <span className="cart__item-price text-primary font-semibold">
                        {(item.book.price * item.quantity).toFixed(2)} €
                      </span>
                      
                      <div className="cart__item-quantity flex items-center">
                        <button 
                          className="cart__quantity-btn w-6 h-6 flex items-center justify-center border rounded-l bg-gray-100"
                          onClick={() => handleQuantityChange(item.book.id, item.format, item.quantity - 1)}
                          aria-label="Disminuir cantidad"
                        >
                          -
                        </button>
                        <span className="cart__quantity-value w-8 text-center border-t border-b">
                          {item.quantity}
                        </span>
                        <button 
                          className="cart__quantity-btn w-6 h-6 flex items-center justify-center border rounded-r bg-gray-100"
                          onClick={() => handleQuantityChange(item.book.id, item.format, item.quantity + 1)}
                          aria-label="Aumentar cantidad"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    className="cart__remove-button ml-2 text-gray-400 hover:text-error transition-colors"
                    onClick={() => removeFromCart(item.book.id, item.format)}
                    aria-label={`Eliminar ${item.book.title} del carrito`}
                  >
                    <Trash size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="cart__footer border-t p-4">
            <div className="cart__total flex justify-between items-center mb-4">
              <span className="cart__total-label font-semibold">Total:</span>
              <span className="cart__total-amount text-xl font-bold text-primary">
                {getTotalPrice().toFixed(2)} €
              </span>
            </div>
            
            <button 
              className="cart__checkout-button w-full bg-primary hover:bg-primary-light text-white py-3 rounded font-semibold transition-colors"
              onClick={proceedToCheckout}
            >
              Proceder al pago
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;