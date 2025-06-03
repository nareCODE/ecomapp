"use client";
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import PremiumDelivery from '../components/PremiumDelivery';
import Footer from '../components/Footer';
import Link from 'next/link'; // Import Link
import Image from 'next/image'; // Import Image

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const shippingCost = cart.total * 0.1; // 10% of cart total
  const finalTotal = cart.total + shippingCost;

  return (
    <div style={{ backgroundColor: 'var(--brandcolor1)' }} className="min-h-screen">
      <Navbar />
      {/* Added pt-20 class to create space after navbar */}
      <div className="container mx-auto px-4 py-8 pt-30">
        <h1 style={{ color: 'var(--text-primary)' }} className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        {cart.items.length === 0 ? (
          <div style={{ backgroundColor: 'var(--brandcolor2)' }} className="rounded-lg p-8 text-center">
            <p style={{ color: 'var(--text-secondary)' }} className="mb-4">Your cart is empty</p>
            <Link href="/" style={{ color: 'var(--brandcolor5)' }} className="hover:text-[var(--brandcolor6)] font-medium">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {/* Cart Items */}
            <div style={{ backgroundColor: 'var(--brandcolor2)' }} className="rounded-lg shadow-md p-6">
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.product.id} style={{ borderColor: 'var(--brandcolor3)' }} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        width={80} // Specify width
                        height={80} // Specify height
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div>
                        <h3 style={{ color: 'var(--text-primary)' }} className="font-medium">{item.product.title}</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>${item.product.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <select
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
                        style={{ borderColor: 'var(--brandcolor4)' }} 
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
                        style={{ color: 'var(--brandcolor3)' }}
                        className="hover:text-[var(--brandcolor4)] p-2 rounded-full hover:bg-[var(--brandcolor3)] hover:bg-opacity-20 transition-colors"
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
            <div style={{ backgroundColor: 'var(--brandcolor2)' }} className="rounded-lg shadow-md p-6">
              <h2 style={{ color: 'var(--text-primary)' }} className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-primary)' }}>Subtotal</span>
                  <span style={{ color: 'var(--text-primary)' }}>${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-primary)' }}>Shipping (10%)</span>
                  <span style={{ color: 'var(--text-primary)' }}>${shippingCost.toFixed(2)}</span>
                </div>
                <div style={{ borderColor: 'var(--brandcolor3)' }} className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span style={{ color: 'var(--text-primary)' }}>Total</span>
                    <span style={{ color: 'var(--text-primary)' }}>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button 
                style={{ backgroundColor: 'var(--brandcolor5)', color: 'white' }}
                className="w-full hover:bg-[var(--brandcolor6)] py-3 rounded-md mt-6 transition duration-200"
              >
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
