"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DealOfTheDay from './components/dealoftheday';
import { Product } from './types/product';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useCart } from './context/CartContext';
import ProductCard from './components/ProductCard';

export default function Home() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);  // Add categories state
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dealOfTheDay, setDealOfTheDay] = useState<Product[]>([]);
  const productsPerPage = 25;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        const fetchedProducts = data.products;
        
        setProducts(fetchedProducts);
        
        // Get unique categories
        const uniqueCategories = [...new Set(fetchedProducts.map((p: any) => p.category))];
        setCategories(uniqueCategories);
        
        // Select 6 most recent products as deals
        const dealsOfTheDay = [...fetchedProducts]
          .sort((a, b) => {
            const dateA = new Date(a.meta?.createdAt || 0);
            const dateB = new Date(b.meta?.createdAt || 0);
            return dateB.getTime() - dateA.getTime();
          })
          .slice(0, 6);
        setDealOfTheDay(dealsOfTheDay);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleProductClick = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); // Prevent triggering the product click
    addToCart(product);
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: 'var(--brandcolor1)' }} className="min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-120px)]">
          <div className="loader">
            <div className="loader-outter"></div>
            <div className="loader-inner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--brandcolor1)' }} className="pt-[120px] min-h-screen">
      <Navbar />

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 style={{ color: 'var(--text-primary)' }} className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="gap-4 flex flex-wrap">
          {categories.map((category, index) => (
            <a
              key={category}
              href={`/categories/${category}`}
              style={{ backgroundColor: 'var(--brandcolor2)', borderColor: 'transparent' }}
              className="category-card border-2 hover:border-[var(--brandcolor5)] rounded-lg shadow-md transition duration-300 hover:shadow-xl flex-1 min-w-[150px] sm:min-w-[180px] items-center justify-center"
            >
              <div className="flex flex-col items-center justify-center p-6 h-full w-full">
                <div style={{ backgroundColor: `var(--brandcolor${(index % 10) + 1})` }} className="p-4 rounded-full mb-4">
                  <i 
                    className={`fas fa-${['tv', 'couch', 'tshirt', 'utensils', 'gamepad', 'basketball-ball', 'book', 'camera', 'music', 'car'][index % 10]} text-[var(--text-primary)] text-2xl`}
                  ></i>
                </div>
                <span style={{ color: 'var(--text-primary)' }} className="font-medium capitalize text-center">{category}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Deal of the Day */}
      {dealOfTheDay && dealOfTheDay.length > 0 && <DealOfTheDay products={dealOfTheDay} />}

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-8">
        <h2 style={{ color: 'var(--text-primary)' }} className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-8 pb-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ 
            backgroundColor: currentPage === 1 ? 'var(--brandcolor3)' : 'var(--brandcolor6)', 
            color: 'var(--text-primary)'
          }}
          className={`px-4 py-2 rounded-md ${
            currentPage !== 1 && 'hover:bg-[var(--brandcolor7)]'
          } ${currentPage === 1 && 'cursor-not-allowed'}`}
        >
          Previous
        </button>
        
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            style={{ 
              backgroundColor: currentPage === index + 1 ? 'var(--brandcolor5)' : 'var(--brandcolor6)',
              color: currentPage === index + 1 ? 'white' : 'var(--text-primary)'
            }}
            className={`px-4 py-2 rounded-md hover:bg-[var(--brandcolor7)]`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ 
            backgroundColor: currentPage === totalPages ? 'var(--brandcolor3)' : 'var(--brandcolor6)', 
            color: 'var(--text-primary)'
          }}
          className={`px-4 py-2 rounded-md ${
            currentPage !== totalPages && 'hover:bg-[var(--brandcolor7)]'
          } ${currentPage === totalPages && 'cursor-not-allowed'}`}
        >
          Next
        </button>
      </div>

      {/* Customer Favorites */}
      <div style={{ backgroundColor: 'var(--brandcolor4)' }} className="py-8">
        <div className="container mx-auto px-4">
          <h2 style={{ color: 'var(--text-primary)' }} className="text-2xl font-bold mb-6">Customer Favorites</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Top Rated Headphones", icon: "headphones", colorVar: "--brandcolor6" },
              { title: "Best Kitchen Blender", icon: "blender", colorVar: "--brandcolor7" },
              { title: "Smart Home Devices", icon: "robot", colorVar: "--brandcolor8" },
              { title: "Home Fitness Gear", icon: "dumbbell", colorVar: "--brandcolor9" },
            ].map((fav, index) => (
              <div key={index} style={{ backgroundColor: 'var(--brandcolor2)' }} className="rounded-lg shadow-md p-6">
                <div className="flex justify-center mb-4">
                  <div style={{ backgroundColor: `var(${fav.colorVar})` }} className="p-4 rounded-full">
                    <i className={`fas fa-${fav.icon} text-[var(--text-primary)] text-3xl`}></i>
                  </div>
                </div>
                <h3 style={{ color: 'var(--text-primary)' }} className="text-lg font-bold text-center mb-2">
                  {fav.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)' }} className="text-center mb-4">
                  Our customers love these items!
                </p>
                <button 
                  style={{ backgroundColor: 'var(--brandcolor5)', color: 'white' }}
                  className="w-full hover:bg-[var(--brandcolor6)] py-2 px-4 rounded-md text-sm transition"
                >
                  Shop Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div style={{ backgroundColor: 'var(--brandcolor3)', color: 'var(--text-primary)' }} className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Stay Updated with Our Deals
          </h2>
          <p style={{ color: 'var(--text-secondary)' }} className="mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter and get 10% off your first order plus
            exclusive access to sales and new arrivals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              style={{ color: 'var(--text-primary)', backgroundColor: 'var(--brandcolor2)' }}
              className="px-4 py-3 rounded-l-md sm:rounded-r-none rounded-r-md sm:rounded-l-md w-full focus:outline-none focus:border-[var(--brandcolor5)] border-2 border-transparent"
            />
            <button 
              style={{ backgroundColor: 'var(--brandcolor5)', color: 'white' }}
              className="hover:bg-[var(--brandcolor6)] font-bold px-6 py-3 sm:rounded-l-none rounded-l-md rounded-r-md mt-2 sm:mt-0 transition"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
