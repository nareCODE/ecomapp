"use client";
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import PremiumDelivery from '../components/PremiumDelivery';
import Footer from '../components/Footer';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const shippingCost = cart.total * 0.1; // 10% of cart total
  const finalTotal = cart.total + shippingCost;

  return (
    <div className="bg-[#dad7cd] min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        {cart.items.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <a href="/" className="text-[#588157] hover:text-[#3a5a40] font-medium">
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-medium">{item.product.title}</h3>
                        <p className="text-gray-600">${item.product.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <select
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
                        className="border rounded-md px-2 py-1"
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors"
                        title="Remove from cart"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* PrimeShipping */}
            <PremiumDelivery />

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping (10%)</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-[#588157] hover:bg-[#3a5a40] text-white py-3 rounded-md mt-6 transition duration-200">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
