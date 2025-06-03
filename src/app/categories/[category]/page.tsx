"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Product } from '@/app/types/product';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ProductCard from '@/app/components/ProductCard';

export default function CategoryPage() {
  const params = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        const categoryProducts = data.products.filter(
          (p: Product) => p.category === params.category
        );
        setProducts(categoryProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    if (params.category) {
      fetchProducts();
    }
  }, [params.category]);

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
    <div className="bg-[#dad7cd] min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-[120px]">
        <div className="flex items-center mb-8">
          <h1 className="text-3xl font-bold capitalize">{typeof params.category === 'string' ? params.category.replace(/-/g, ' ') : ''}</h1>
          <span className="ml-4 text-gray-600">({products.length} products)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
