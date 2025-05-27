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
      <div className="bg-[#dad7cd] min-h-screen">
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
    <div className="bg-[#dad7cd] pt-[120px]">
      <Navbar />

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="gap-4 flex flex-1">
          {categories.map((category, index) => (
            <a
              key={category}
              href={`/categories/${category}`}
              className="category-card bg-white border-3 border-transparent hover:border-[var(--brandcolor1)] rounded-lg shadow-md transition duration-300 hover:shadow-xl w-full items-center justify-center"
            >
              <div className="flex flex-col items-center justify-center p-6 h-full w-full">
                <div className={`bg-${['blue', 'green', 'red', 'yellow', 'purple', 'pink'][index % 6]}-100 p-4 rounded-full mb-4`}>
                  <i className={`fas fa-${['tv', 'couch', 'tshirt', 'utensils', 'gamepad', 'basketball-ball'][index % 6]} text-${['blue', 'green', 'red', 'yellow', 'purple', 'pink'][index % 6]}-600 text-2xl`}></i>
                </div>
                <span className="font-medium capitalize text-center">{category}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Deal of the Day */}
      {dealOfTheDay && dealOfTheDay.length > 0 && <DealOfTheDay products={dealOfTheDay} />}

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-[#a3b18a] hover:bg-[#588157] text-white'
          }`}
        >
          Previous
        </button>
        
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === index + 1
                ? 'bg-[#588157] text-white'
                : 'bg-[#a3b18a] hover:bg-[#588157] text-white'
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-[#a3b18a] hover:bg-[#588157] text-white'
          }`}
        >
          Next
        </button>
      </div>

      {/* Customer Favorites */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Customer Favorites</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Favorite 1 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <i className="fas fa-headphones text-blue-600 text-3xl"></i>
                </div>
              </div>
              <h3 className="text-lg font-bold text-center mb-2">
                Top Rated Headphones
              </h3>
              <p className="text-gray-600 text-center mb-4">
                Our customers love these premium sound quality headphones
              </p>
              <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-md text-sm transition">
                Shop Now
              </button>
            </div>

            {/* Favorite 2 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <i className="fas fa-blender text-green-600 text-3xl"></i>
                </div>
              </div>
              <h3 className="text-lg font-bold text-center mb-2">
                Best Kitchen Blender
              </h3>
              <p className="text-gray-600 text-center mb-4">
                Professional-grade blender with 5-star reviews
              </p>
              <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-md text-sm transition">
                Shop Now
              </button>
            </div>

            {/* Favorite 3 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-purple-100 p-4 rounded-full">
                  <i className="fas fa-robot text-purple-600 text-3xl"></i>
                </div>
              </div>
              <h3 className="text-lg font-bold text-center mb-2">
                Smart Home Devices
              </h3>
              <p className="text-gray-600 text-center mb-4">
                Automate your home with these popular smart devices
              </p>
              <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-md text-sm transition">
                Shop Now
              </button>
            </div>

            {/* Favorite 4 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-yellow-100 p-4 rounded-full">
                  <i className="fas fa-dumbbell text-yellow-600 text-3xl"></i>
                </div>
              </div>
              <h3 className="text-lg font-bold text-center mb-2">
                Home Fitness
              </h3>
              <p className="text-gray-600 text-center mb-4">
                Top-rated equipment for your home gym
              </p>
              <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 px-4 rounded-md text-sm transition">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Stay Updated with Our Deals
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter and get 10% off your first order plus
            exclusive access to sales and new arrivals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-l-md sm:rounded-r-none rounded-r-md sm:rounded-l-md w-full text-gray-900 focus:outline-none"
            />
            <button className="bg-[#a3b18a] hover:bg-[#588157] text-gray-900 font-bold px-6 py-3 sm:rounded-l-none rounded-l-md rounded-r-md mt-2 sm:mt-0 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
