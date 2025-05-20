import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { useCart } from '../../hooks/useCart';
import { Check, CreditCard, Truck, MapPin } from 'lucide-react';

const CheckoutPage: React.FC = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [processingPayment, setProcessingPayment] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'España',
    email: '',
    phone: ''
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardHolder: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmitOrder = () => {
    setProcessingPayment(true);
    
    setTimeout(() => {
      setProcessingPayment(false);
      alert('¡Pedido realizado con éxito! Gracias por tu compra.');
      clearCart();
      navigate('/home');
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page min-h-screen flex flex-col">
        <Header />
        <main className="checkout-page__main flex-grow flex flex-col items-center justify-center p-4">
          <div className="checkout-page__empty-cart text-center max-w-lg">
            <div className="checkout-page__empty-icon mb-6 text-gray-300">
              <CreditCard size={80} className="mx-auto" />
            </div>
            <h1 className="checkout-page__title text-2xl font-serif font-bold mb-4">Tu carrito está vacío</h1>
            <p className="checkout-page__message text-gray-600 mb-6">
              No hay productos en tu carrito. Añade algunos libros antes de proceder al pago.
            </p>
            <button 
              onClick={() => navigate('/home')}
              className="checkout-page__shop-button bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-md transition-colors"
            >
              Ir a la tienda
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="checkout-page min-h-screen flex flex-col">
      <Header />
      
      <main className="checkout-page__main flex-grow py-8">
        <div className="checkout-page__container max-w-6xl mx-auto px-4 md:px-8">
          <h1 className="checkout-page__title text-3xl font-serif font-bold mb-8 text-center">Finalizar compra</h1>
          
          <div className="checkout-page__progress-bar mb-10">
            <div className="checkout-page__steps flex justify-between items-center relative">
              <div className="checkout-page__progress-line absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
              <div 
                className="checkout-page__progress-fill absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-300"
                style={{ width: `${(currentStep - 1) * 50}%` }}
              ></div>
              
              <div className="checkout-page__step relative z-10 flex flex-col items-center">
                <div className={`checkout-page__step-circle w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > 1 ? <Check size={18} /> : 1}
                </div>
                <span className="checkout-page__step-label mt-2 text-sm font-medium">Revisión</span>
              </div>
              
              <div className="checkout-page__step relative z-10 flex flex-col items-center">
                <div className={`checkout-page__step-circle w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > 2 ? <Check size={18} /> : 2}
                </div>
                <span className="checkout-page__step-label mt-2 text-sm font-medium">Envío</span>
              </div>
              
              <div className="checkout-page__step relative z-10 flex flex-col items-center">
                <div className={`checkout-page__step-circle w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  3
                </div>
                <span className="checkout-page__step-label mt-2 text-sm font-medium">Pago</span>
              </div>
            </div>
          </div>
          
          <div className="checkout-page__content">
            {/* Step 1: Review Cart */}
            {currentStep === 1 && (
              <div className="checkout-page__review animate-fade-in">
                <h2 className="checkout-page__section-title text-xl font-serif font-bold mb-6 flex items-center">
                  <span className="inline-block bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">1</span>
                  Revisión de productos
                </h2>
                
                <div className="checkout-page__cart bg-white rounded-lg shadow-md overflow-hidden mb-8">
                  <table className="checkout-page__cart-table w-full">
                    <thead className="checkout-page__cart-header bg-gray-50 text-left">
                      <tr>
                        <th className="px-6 py-3 text-sm font-semibold text-gray-600">Producto</th>
                        <th className="px-6 py-3 text-sm font-semibold text-gray-600">Formato</th>
                        <th className="px-6 py-3 text-sm font-semibold text-gray-600 text-center">Cantidad</th>
                        <th className="px-6 py-3 text-sm font-semibold text-gray-600 text-right">Precio</th>
                      </tr>
                    </thead>
                    <tbody className="checkout-page__cart-body divide-y divide-gray-200">
                      {cartItems.map((item) => (
                        <tr key={`${item.book.id}-${item.format}`} className="checkout-page__cart-item">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="checkout-page__item-image h-16 w-12 flex-shrink-0 mr-4 overflow-hidden rounded">
                                <img 
                                  src={item.book.coverImage} 
                                  alt={item.book.title} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="checkout-page__item-details">
                                <h3 className="checkout-page__item-title font-medium line-clamp-1">{item.book.title}</h3>
                                <p className="checkout-page__item-author text-sm text-gray-500">{item.book.author}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {item.format === 'physical' ? 'Físico' : 'Digital'}
                          </td>
                          <td className="px-6 py-4 text-center">{item.quantity}</td>
                          <td className="px-6 py-4 text-right font-medium">
                            {(item.book.price * item.quantity).toFixed(2)} €
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="checkout-page__summary bg-white rounded-lg shadow-md p-6 mb-8">
                  <h3 className="checkout-page__summary-title text-lg font-semibold mb-4">Resumen del pedido</h3>
                  
                  <div className="checkout-page__summary-details space-y-3 text-sm">
                    <div className="checkout-page__summary-row flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span>{getTotalPrice().toFixed(2)} €</span>
                    </div>
                    <div className="checkout-page__summary-row flex justify-between">
                      <span className="text-gray-600">Gastos de envío:</span>
                      <span>
                        {cartItems.some(item => item.format === 'physical') 
                          ? '4.99 €' 
                          : 'Gratis'
                        }
                      </span>
                    </div>
                    <div className="checkout-page__summary-row flex justify-between">
                      <span className="text-gray-600">IVA (21%):</span>
                      <span>{(getTotalPrice() * 0.21).toFixed(2)} €</span>
                    </div>
                  </div>
                  
                  <div className="checkout-page__summary-total mt-4 pt-4 border-t border-gray-200 flex justify-between font-bold">
                    <span>Total:</span>
                    <span className="text-primary text-xl">
                      {(
                        getTotalPrice() + 
                        (cartItems.some(item => item.format === 'physical') ? 4.99 : 0) + 
                        (getTotalPrice() * 0.21)
                      ).toFixed(2)} €
                    </span>
                  </div>
                </div>
                
                <div className="checkout-page__actions flex justify-end">
                  <button 
                    onClick={handleNextStep}
                    className="checkout-page__next-button bg-primary hover:bg-primary-light text-white font-semibold px-8 py-3 rounded-md transition-colors"
                  >
                    Continuar al envío
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 2: Shipping Information */}
            {currentStep === 2 && (
              <div className="checkout-page__shipping animate-fade-in">
                <h2 className="checkout-page__section-title text-xl font-serif font-bold mb-6 flex items-center">
                  <span className="inline-block bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">2</span>
                  Información de envío
                </h2>
                
                <div className="checkout-page__shipping-form bg-white rounded-lg shadow-md p-6 mb-8">
                  <div className="checkout-page__shipping-icon mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Truck className="text-primary" size={28} />
                    </div>
                  </div>
                  
                  <form className="checkout-page__form grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="checkout-page__form-group md:col-span-2">
                      <label htmlFor="fullName" className="checkout-page__label block text-sm font-medium text-gray-700 mb-1">
                        Nombre completo *
                      </label>
                      <input 
                        type="text" 
                        id="fullName" 
                        name="fullName" 
                        value={shippingInfo.fullName}
                        onChange={handleShippingInfoChange}
                        required
                        className="checkout-page__input w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-light focus:border-primary-light transition-colors"
                      />
                    </div>
                    
                    <div className="checkout-page__form-group md:col-span-2">
                      <label htmlFor="address" className="checkout-page__label block text-sm font-medium text-gray-700 mb-1">
                        Dirección *
                      </label>
                      <input 
                        type="text" 
                        id="address" 
                        name="address" 
                        value={shippingInfo.address}
                        onChange={handleShippingInfoChange}
                        required
                        className="checkout-page__input w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-light focus:border-primary-light transition-colors"
                      />
                    </div>
                    
                    <div className="checkout-page__form-group">
                      <label htmlFor="city" className="checkout-page__label block text-sm font-medium text-gray-700 mb-1">
                        Ciudad *
                      </label>
                      <input 
                        type="text" 
                        id="city" 
                        name="city" 
                        value={shippingInfo.city}
                        onChange={handleShippingInfoChange}
                        required
                        className="checkout-page__input w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-light focus:border-primary-light transition-colors"
                      />
                    </div>
                    
                    <div className="checkout-page__form-group">
                      <label htmlFor="postalCode" className="checkout-page__label block text-sm font-medium text-gray-700 mb-1">
                        Código Postal *
                      </label>
                      <input 
                        type="text" 
                        id="postalCode" 
                        name="postalCode" 
                        value={shippingInfo.postalCode}
                        onChange={handleShippingInfoChange}
                        required
                        className="checkout-page__input w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-light focus:border-primary-light transition-colors"
                      />
                    </div>
                    
                    <div className="checkout-page__form-group">
                      <label htmlFor="country" className="checkout-page__label block text-sm font-medium text-gray-700 mb-1">
                        País *
                      </label>
                      <select 
                        id="country" 
                        name="country" 
                        value={shippingInfo.country}
                        onChange={handleShippingInfoChange}
                        required
                        className="checkout-page__select w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-light focus:border-primary-light transition-colors"
                      >
                        <option value="España">España</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Francia">Francia</option>
                        <option value="Alemania">Alemania</option>
                        <option value="Italia">Italia</option>
                      </select>
                    </div>
                    
                    <div className="checkout-page__form-group">
                      <label htmlFor="email" className="checkout-page__label block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={shippingInfo.email}
                        onChange={handleShippingInfoChange}
                        required
                        className="checkout-page__input w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-light focus:border-primary-light transition-colors"
                      />
                    </div>
                    
                    <div className="checkout-page__form-group">
                      <label htmlFor="phone" className="checkout-page__label block text-sm font-medium text-gray-700 mb-1">
                        Teléfono *
                      </label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        value={shippingInfo.phone}
                        onChange={handleShippingInfoChange}
                        required
                        className="checkout-page__input w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-light focus:border-primary-light transition-colors"
                      />
                    </div>
                  </form>
                </div>
                
                <div className="checkout-page__shipping-method bg-white rounded-lg shadow-md p-6 mb-8">
                  <h3 className="checkout-page__subsection-title text-lg font-semibold mb-4">Método de envío</h3>
                  
                  <div className="checkout-page__shipping-options space-y-4">
                    <div className="checkout-page__shipping-option">
                      <label className="checkout-page__shipping-label flex items-center cursor-pointer">
                        <input 
                          type="radio" 
                          name="shippingMethod" 
                          className="mr-3"
                          defaultChecked 
                        />
                        <div className="checkout-page__shipping-label-content flex-grow">
                          <div className="checkout-page__shipping-label-title font-medium">Envío estándar</div>
                          <div className="checkout-page__shipping-label-description text-sm text-gray-500">
                            Entrega en 3-5 días laborables
                          </div>
                        </div>
                        <div className="checkout-page__shipping-price font-medium">
                          {cartItems.some(item => item.format === 'physical') 
                            ? '4.99 €' 
                            : 'Gratis'
                          }
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="checkout-page__actions flex justify-between">
                  <button 
                    onClick={handlePrevStep}
                    className="checkout-page__back-button bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-8 py-3 rounded-md transition-colors"
                  >
                    Volver
                  </button>
                  
                  <button 
                    onClick={handleNextStep}
                    disabled={!shippingInfo.fullName || !shippingInfo.address || !shippingInfo.city || !shippingInfo.postalCode || !shippingInfo.email || !shippingInfo.phone}
                    className={`checkout-page__next-button bg-primary text-white font-semibold px-8 py-3 rounded-md transition-colors ${
                      !shippingInfo.fullName || !shippingInfo.address || !shippingInfo.city || !shippingInfo.postalCode || !shippingInfo.email || !shippingInfo.phone
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-primary-light'
                    }`}
                  >
                    Continuar al pago
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <div className="checkout-page__payment animate-fade-in">
                <h2 className="checkout-page__section-title text-xl font-serif font-bold mb-6 flex items-center">
                  <span className="inline-block bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">3</span>
                  Método de pago
                </h2>
                
                <div className="checkout-page__payment-form bg-white rounded-lg shadow-md p-6 mb-8">
                  <div className="checkout-page__payment-icon mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <CreditCard className="text-primary" size={28} />
                    </div>
                  </div>
                  
                  <form className="checkout-page__form space-y-6">
                    <div className="checkout-page__form-group">
                      <label htmlFor="cardHolder" className="checkout-page__label block text-sm font-medium text-gray-700 mb-1">
                        Nombre del titular *
                      </label>
                      <input 
                        type="text" 
                        id="cardHolder" 
                        name="cardHolder" 
                        value={paymentInfo.cardHolder}
                        onChange={handlePaymentInfoChange}
                        required
                        className="checkout-page__input w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-light focus:border-primary-light transition-colors"
                      />
                    </div>
                    
                    <div className="checkout-page__form-group">
                      <label htmlFor="cardNumber" className="checkout-page__label block text-sm font-medium text-gray-700 mb-1">
                        Número de tarjeta *
                      </label>
                      <input 
                        type="text" 
                        id="cardNumber" 
                        name="cardNumber" 
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentInfoChange}
                        placeholder="1234 5678 9012 3456"
                        required
                        className="checkout-page__input w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-light focus:border-primary-light transition-colors"
                      />
                    </div>
                    
                    <div className="checkout-page__card-details grid grid-cols-2 gap-6">
                      <div className="checkout-page__form-group">
                        <label htmlFor="expiryDate" className="checkout-page__label block text-sm font-medium text-gray-700 mb-1">
                          Fecha de expiración *
                        </label>
                        <input 
                          type="text" 
                          id="expiryDate" 
                          name="expiryDate" 
                          value={paymentInfo.expiryDate}
                          onChange={handlePaymentInfoChange}
                          placeholder="MM/AA"
                          required
                          className="checkout-page__input w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-light focus:border-primary-light transition-colors"
                        />
                      </div>
                      
                      <div className="checkout-page__form-group">
                        <label htmlFor="cvv" className="checkout-page__label block text-sm font-medium text-gray-700 mb-1">
                          CVV *
                        </label>
                        <input 
                          type="text" 
                          id="cvv" 
                          name="cvv" 
                          value={paymentInfo.cvv}
                          onChange={handlePaymentInfoChange}
                          placeholder="123"
                          required
                          className="checkout-page__input w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-light focus:border-primary-light transition-colors"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                
                <div className="checkout-page__shipping-address bg-white rounded-lg shadow-md p-6 mb-8">
                  <div className="checkout-page__address-header flex items-center justify-between mb-4">
                    <h3 className="checkout-page__subsection-title text-lg font-semibold flex items-center">
                      <MapPin size={18} className="mr-2 text-primary" />
                      Dirección de envío
                    </h3>
                  </div>
                  
                  <div className="checkout-page__address-details text-gray-600">
                    <p className="checkout-page__address-line font-medium">{shippingInfo.fullName}</p>
                    <p className="checkout-page__address-line">{shippingInfo.address}</p>
                    <p className="checkout-page__address-line">{shippingInfo.postalCode}, {shippingInfo.city}</p>
                    <p className="checkout-page__address-line">{shippingInfo.country}</p>
                    <p className="checkout-page__address-line mt-2">Email: {shippingInfo.email}</p>
                    <p className="checkout-page__address-line">Teléfono: {shippingInfo.phone}</p>
                  </div>
                </div>
                
                <div className="checkout-page__order-summary bg-white rounded-lg shadow-md p-6 mb-8">
                  <h3 className="checkout-page__summary-title text-lg font-semibold mb-4">Resumen del pedido</h3>
                  
                  <div className="checkout-page__summary-details space-y-3 text-sm">
                    <div className="checkout-page__summary-row flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span>{getTotalPrice().toFixed(2)} €</span>
                    </div>
                    <div className="checkout-page__summary-row flex justify-between">
                      <span className="text-gray-600">Gastos de envío:</span>
                      <span>
                        {cartItems.some(item => item.format === 'physical') 
                          ? '4.99 €' 
                          : 'Gratis'
                        }
                      </span>
                    </div>
                    <div className="checkout-page__summary-row flex justify-between">
                      <span className="text-gray-600">IVA (21%):</span>
                      <span>{(getTotalPrice() * 0.21).toFixed(2)} €</span>
                    </div>
                  </div>
                  
                  <div className="checkout-page__summary-total mt-4 pt-4 border-t border-gray-200 flex justify-between font-bold">
                    <span>Total:</span>
                    <span className="text-primary text-xl">
                      {(
                        getTotalPrice() + 
                        (cartItems.some(item => item.format === 'physical') ? 4.99 : 0) + 
                        (getTotalPrice() * 0.21)
                      ).toFixed(2)} €
                    </span>
                  </div>
                </div>
                
                <div className="checkout-page__actions flex justify-between">
                  <button 
                    onClick={handlePrevStep}
                    className="checkout-page__back-button bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-8 py-3 rounded-md transition-colors"
                  >
                    Volver
                  </button>
                  
                  <button 
                    onClick={handleSubmitOrder}
                    disabled={processingPayment || !paymentInfo.cardHolder || !paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv}
                    className={`checkout-page__submit-button bg-primary text-white font-semibold px-8 py-3 rounded-md transition-colors ${
                      processingPayment || !paymentInfo.cardHolder || !paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-primary-light'
                    }`}
                  >
                    {processingPayment ? 'Procesando...' : 'Completar pedido'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CheckoutPage;