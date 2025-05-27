"use client";
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useState } from 'react';

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cartQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top Navigation Bar */}
      <nav className="bg-[#3a5a40] text-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <a href="/" className="text-2xl font-bold text-white">
              <span className="text-[var(--brandcolor1)]">e-</span>
              <span>COM</span>
            </a>
          </div>

          {/* Search Bar - hidden on smaller screens */}
          <div className="hidden lg:flex flex-1 mx-8">
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full py-2 px-4 rounded-l-md text-gray-800 focus:outline-none border border-white"
              />
              <button className="bg-[#a3b18a] hover:bg-[#588157] text-gray-900 py-2 px-6 rounded-r-md transition">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>

          {/* Navigation Links - hidden on smaller screens */}
          <div className="hidden lg:flex items-center space-x-6">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="hover:text-blue-300 transition text-left"
                >
                  <div className="text-xs">Hello, {user.username}</div>
                  <div className="font-medium">Account & Favorites</div>
                </button>
                {isDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0" 
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                      <button 
                        onClick={() => {
                          logout();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <a href="/login" className="hover:text-blue-300 transition">
                <div className="text-xs">Hello, Sign in</div>
                <div className="font-medium">Account & Favorites</div>
              </a>
            )}
            <a href="#" className="hover:text-blue-300 transition">
              <div className="text-xs">Returns</div>
              <div className="font-medium">& Orders</div>
            </a>
            <a href="/cart" className="flex items-center hover:text-blue-300 transition">
              <div className="relative">
                <i className="fas fa-shopping-cart text-md"></i>
                <span className="absolute -right-12 top-4 bg-[#a3b18a] text-gray-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartQuantity}
                </span>
              </div>
              <span className="ml-1 font-medium">Cart</span>
            </a>
          </div>

          {/* Menu Button for smaller screens */}
          <div className="lg:hidden relative">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none p-2"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>

            {/* Dropdown Menu */}
            {isMobileMenuOpen && (
              <div className="absolute top-full right-0 w-64 bg-[#3a5a40] shadow-lg rounded-b-lg mt-2 transform origin-top-right transition-transform duration-200 ease-out">
                {/* Search in dropdown */}
                <div className="p-4 border-b border-[#588157]">
                  <div className="flex w-full">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full py-2 px-3 text-sm rounded-l-md text-gray-800 focus:outline-none"
                    />
                    <button className="bg-[#a3b18a] px-4 rounded-r-md">
                      <i className="fas fa-search text-gray-900"></i>
                    </button>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  {/* Account Section */}
                  <div className="px-4 py-3 border-b border-[#588157]">
                    <a href="#" className="block hover:text-[#a3b18a]">
                      <div className="text-xs">Hello, Sign in</div>
                      <div className="font-medium">Account & Favorites</div>
                    </a>
                  </div>

                  {/* Cart Section */}
                  <div className="px-4 py-3 border-b border-[#588157]">
                    <a href="/cart" className="flex items-center justify-between hover:text-[#a3b18a]">
                      <span>Cart</span>
                      <span className="bg-[#a3b18a] text-gray-900 px-2 py-1 rounded-full text-xs">
                        {cartQuantity}
                      </span>
                    </a>
                  </div>

                  {/* Categories */}
                  <div className="px-4 py-2">
                    <div className="text-sm font-bold text-[#a3b18a] mb-2">Categories</div>
                    {/*
                      List of categories can be mapped here if dynamic
                    */}
                    {['All Categories', 'Today\'s Deals', 'Electronics', 'Home & Kitchen', 'Furniture', 'Fashion', 'Toys & Games', 'Grocery'].map((category, index) => (
                      <a
                        key={index}
                        href="#"
                        className="block py-2 px-2 text-sm hover:bg-[#588157] hover:text-white rounded transition-colors"
                      >
                        {category}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Secondary Navigation - hidden on smaller screens */}
      <div className="bg-[#344e41] text-white hidden lg:block shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center overflow-x-auto scroll-hidden">
          <div className="flex space-x-8">
            <a href="/categories" className="whitespace-nowrap hover:text-yellow-300 transition">
              <i className="fas fa-bars mr-2"></i> All Categories
            </a>
            <a href="#" className="whitespace-nowrap hover:text-yellow-300 transition">
              Today's Deals
            </a>
            <a href="#" className="whitespace-nowrap hover:text-yellow-300 transition">
              Electronics
            </a>
            <a href="#" className="whitespace-nowrap hover:text-yellow-300 transition">
              Home & Kitchen
            </a>
            <a href="#" className="whitespace-nowrap hover:text-yellow-300 transition">
              Furniture
            </a>
            <a href="#" className="whitespace-nowrap hover:text-yellow-300 transition">
              Fashion
            </a>
            <a href="#" className="whitespace-nowrap hover:text-yellow-300 transition">
              Toys & Games
            </a>
            <a href="#" className="whitespace-nowrap hover:text-yellow-300 transition">
              Grocery
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
