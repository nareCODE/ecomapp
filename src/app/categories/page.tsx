"use client";
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';

interface ProductResponse {
  products: Array<{
    category: string;
    
  }>,
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json() as ProductResponse;
        // Get unique categories
        const uniqueCategories = [...new Set(data.products.map(p => p.category))];
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

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
    <div className="bg-[#dad7cd] flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 pt-[120px]">
        <h1 className="text-3xl font-bold mb-8">All Categories</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/categories/${category}`}
              className="bg-[var(--brandcolor4)] rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <div className="flex flex-col items-center justify-center p-8">
                <div className="w-16 h-16 bg-[var(--brandcolor1)] rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-shopping-bag text-2xl text-white"></i>
                </div>
                <h2 className="text-xl font-semibold text-white text-center capitalize">{category}</h2>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
