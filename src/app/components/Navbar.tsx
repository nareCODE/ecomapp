"use client";
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';


interface ApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
  
}

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const cartQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data: ApiResponse = await response.json();
        setProducts(data.products);
        
        
        const uniqueCategories = [...new Set(data.products.map((p: Product) => p.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = products
      .filter(product =>
        product.title.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 6);

    setSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (productId: number) => {
    setShowSuggestions(false);
    setSearchTerm('');
    router.push(`/product/${productId}`);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top Navigation Bar */}
      <nav className="bg-[#3a5a40] text-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold text-white">
              <span className="text-[var(--brandcolor1)]">e-</span>
              <span>COM</span>
            </Link>
          </div>

          {/* Search Bar with Suggestions */}
          <div className="hidden lg:flex flex-1 mx-8 relative">
            <div className="flex w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search for products..."
                className="w-full py-2 px-4 rounded-l-md text-gray-800 focus:outline-none border border-white"
              />
              <button className="bg-[#a3b18a] hover:bg-[#588157] text-gray-900 py-2 px-6 rounded-r-md transition">
                <i className="fas fa-search"></i>
              </button>
            </div>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <>
                <div 
                  className="fixed inset-0" 
                  onClick={() => setShowSuggestions(false)}
                />
                <div className="absolute top-full left-0 right-0 bg-white mt-1 rounded-md shadow-lg z-50">
                  {suggestions.map(product => (
                    <div
                      key={product.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={() => handleSuggestionClick(product.id)}
                    >
                      <Image 
                        src={product.thumbnail} 
                        alt={product.title}
                        width={40} 
                        height={40}
                        className="w-10 h-10 object-cover rounded mr-3"
                      />
                      <div>
                        <div className="text-gray-900">{product.title}</div>
                        <div className="text-gray-600 text-sm">${product.price}</div>
                        <div className="text-green-800 text-xs mt-1">{product.stock} in stock</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
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
              <Link href="/login" className="hover:text-blue-300 transition">
                <div className="text-xs">Hello, Sign in</div>
                <div className="font-medium">Account & Favorites</div>
              </Link>
            )}
            <a href="#" className="hover:text-blue-300 transition">
              <div className="text-xs">Returns</div>
              <div className="font-medium">& Orders</div>
            </a>
            <Link href="/cart" className="flex items-center hover:text-blue-300 transition">
              <div className="relative">
                <i className="fas fa-shopping-cart text-md"></i>
                <span className="absolute -right-12 top-4 bg-[#a3b18a] text-gray-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartQuantity}
                </span>
              </div>
              <span className="ml-1 font-medium">Cart</span>
            </Link>
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
                    <Link href="/cart" className="flex items-center justify-between hover:text-[#a3b18a]">
                      <span>Cart</span>
                      <span className="bg-[#a3b18a] text-gray-900 px-2 py-1 rounded-full text-xs">
                        {cartQuantity}
                      </span>
                    </Link>
                  </div>

                  {/* Categories */}
                  <div className="px-4 py-2">
                    <div className="text-sm font-bold text-[#a3b18a] mb-2">Categories</div>
                    {/* Static categories */}
                    <Link href="/categories" className="block py-2 px-2 text-sm hover:bg-[#588157] hover:text-white rounded transition-colors">
                      All Categories
                    </Link>
                    <Link href="/deals" className="block py-2 px-2 text-sm hover:bg-[#588157] hover:text-white rounded transition-colors">
                      Today&apos;s Deals
                    </Link>
                    
                    {/* Dynamic categories */}
                    {categories.map((category, index) => (
                      <Link
                        key={index}
                        href={`/categories/${category}`}
                        className="block py-2 px-2 text-sm hover:bg-[#588157] hover:text-white rounded transition-colors capitalize"
                      >
                        {category}
                      </Link>
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
            <Link href="/categories" className="whitespace-nowrap hover:text-yellow-300 transition">
              <i className="fas fa-bars mr-2"></i> All Categories
            </Link>
            <Link href="/deals" className="whitespace-nowrap hover:text-yellow-300 transition">
              Today&apos;s Deals
            </Link>
            {/* Dynamically generated category links */}
            {categories.map((category, index) => (
              <Link 
                key={index} 
                href={`/categories/${category}`} 
                className="whitespace-nowrap hover:text-yellow-300 transition capitalize"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
