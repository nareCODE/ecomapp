"use client";
import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { Product } from '../types/product';

interface ProductSidebarProps {
  product: Product;
  subtotal?: number;
}

export default function ProductSidebar({ product, subtotal = 0 }: ProductSidebarProps) {
  const { user } = useUser();
  const [userCountry, setUserCountry] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [showReturnsInfo, setShowReturnsInfo] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  // Calculate delivery date (current date + 3 days)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  
  // Calculate time until 22:00
  const now = new Date();
  const orderDeadline = new Date();
  orderDeadline.setHours(22, 0, 0, 0);
  const timeUntilDeadline = orderDeadline.getTime() - now.getTime();
  const hoursUntilDeadline = Math.floor(timeUntilDeadline / (1000 * 60 * 60));
  const minutesUntilDeadline = Math.floor((timeUntilDeadline % (1000 * 60 * 60)) / (1000 * 60));

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user?.id) {
        try {
          const response = await fetch(`https://dummyjson.com/users/${user.id}`);
          const data = await response.json();
          setUserAddress(data.address?.city || 'Address not available');
          setUserCountry(data.address?.country || 'Country not available');
        } catch (error) {
          console.error('Error fetching user details:', error);
          setUserAddress('Address not available');
        }
      } else {
        setUserAddress('Please sign in');
      }
    };

    fetchUserDetails();
  }, [user]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      {/* Subtotal */}
      <div className="text-2xl font-bold text-gray-900">
        Subtotal: ${(subtotal || product.price * quantity).toFixed(2)}
      </div>

      {/* Returns Info */}
      <div className="border-b pb-4">
        <button
          onClick={() => setShowReturnsInfo(!showReturnsInfo)}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-[#588157]">FREE Returns</span>
          <svg
            className={`w-4 h-4 transform transition-transform ${showReturnsInfo ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {showReturnsInfo && (
          <div className="mt-2 text-sm text-gray-600">
            You can return this item for free within 15 days of delivery. You don't need to pay any fees for returns. You also don't need to explain why. If you click returning a command you will be give a SKU Code for a Post Return.
          </div>
        )}
      </div>

      {/* Delivery Info */}
      <div className="space-y-2">
        <div className="text-sm">
          <span className="text-[#588157] font-bold">FREE Shipping </span>
          to {userAddress}, {userCountry}.
        </div>
        <div className="text-sm">
          Delivery: {deliveryDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
        {subtotal >= 40 && (
          <div className="text-sm text-gray-600">
            Order within {hoursUntilDeadline}h {minutesUntilDeadline}m
          </div>
        )}
      </div>

      {/* Stock Status */}
      <div className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center space-x-2">
        <label htmlFor="quantity" className="text-sm text-gray-600">Qty:</label>
        <select
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border rounded-md px-2 py-1"
          disabled={product.stock === 0}
        >
          {[...Array(Math.min(10, product.stock))].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
      </div>

      {/* Add to Cart Button */}
      <button
        className="w-full bg-[#588157] hover:bg-[#3a5a40] text-white py-3 px-6 rounded-md transition duration-200 disabled:bg-gray-400"
        disabled={product.stock === 0}
      >
        Add to Cart
      </button>

      {/* Product Info */}
      <div className="space-y-2 text-sm text-gray-600 border-t pt-4">
        <div>SENT BY <span className="font-bold">e-COM</span></div>
        <div>SOLD BY <span className="font-bold">{product.brand}</span></div>
        <div>Returns <span className="font-bold">Returns before 15 days for no fees</span></div>
      </div>

      {/* Add to Favorite */}
      <button className="w-full border border-[#588157] text-[#588157] hover:bg-[#588157] hover:text-white py-2 px-4 rounded-md transition duration-200">
        Add to Favorite
      </button>
    </div>
  );
}
