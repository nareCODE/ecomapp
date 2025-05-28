"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Product } from '@/app/types/product';
import { useCart } from '@/app/context/CartContext';
import Navbar from '@/app/components/Navbar';
import PremiumDelivery from '@/app/components/PremiumDelivery';
import ProductSidebar from '@/app/components/ProductSidebar'; // Changed from ProductSidebar to productsidebar
import Footer from '@/app/components/Footer';

export default function ProductPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${params.id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleNextImage = () => {
    if (product && currentImage < product.images.length - 1) {
      setCurrentImage(currentImage + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1);
    }
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

  if (error || !product) {
    return (
      <div style={{ backgroundColor: 'var(--brandcolor1)' }} className="min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-120px)]">
          <div className="text-center">
            <h1 style={{ color: 'var(--text-primary)' }} className="text-2xl font-bold mb-4">{error || 'Product not found'}</h1>
            <button 
              onClick={() => window.history.back()}
              style={{ backgroundColor: 'var(--brandcolor6)', color: 'var(--text-primary)' }}
              className="px-6 py-2 rounded-md hover:bg-[var(--brandcolor7)] transition"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--brandcolor1)' }} className="min-h-screen">
      <Navbar />
      {/* Added pt-20 class to create space after navbar */}
      <div className="container mx-auto px-4 py-8 pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Product Content */}
          <div style={{ backgroundColor: 'var(--brandcolor2)' }} className="lg:col-span-2 rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              {/* Image Gallery */}
              <div>
                <div className="relative mb-4">
                  <img
                    src={product.images[currentImage]}
                    alt={product.title}
                    className="w-full h-[400px] object-contain rounded-lg"
                  />
                  {/* Navigation Arrows */}
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        disabled={currentImage === 0}
                        style={{ backgroundColor: 'var(--brandcolor5)' }}
                        className={`absolute left-2 top-1/2 transform -translate-y-1/2 
                          hover:bg-[var(--brandcolor6)] text-white p-2 rounded-full
                          ${currentImage === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={handleNextImage}
                        disabled={currentImage === product.images.length - 1}
                        style={{ backgroundColor: 'var(--brandcolor5)' }}
                        className={`absolute right-2 top-1/2 transform -translate-y-1/2 
                          hover:bg-[var(--brandcolor6)] text-white p-2 rounded-full
                          ${currentImage === product.images.length - 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <div style={{ backgroundColor: 'var(--brandcolor5)' }} className="absolute bottom-4 right-4 text-white px-3 py-1 rounded-full text-sm">
                        {currentImage + 1} / {product.images.length}
                      </div>
                    </>
                  )}
                </div>
                <div className="flex space-x-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`flex-shrink-0 rounded-sm ${
                        currentImage === index 
                          ? 'border-2 border-[var(--brandcolor5)]' 
                          : 'border-2 border-transparent hover:border-[var(--brandcolor3)]'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div>
                <h1 style={{ color: 'var(--text-primary)' }} className="text-3xl font-bold mb-4">{product.title}</h1>
                <div className="flex items-center mb-4">
                  <div style={{ color: 'var(--brandcolor8)' }} className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating) ? "text-[var(--brandcolor8)]" : "text-[var(--brandcolor3)]"}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span style={{ color: 'var(--text-secondary)' }} className="ml-2">({product.rating})</span>
                </div>
                <p style={{ color: 'var(--text-secondary)' }} className="mb-6">{product.description}</p>
                <div className="mb-6">
                  <span style={{ color: 'var(--text-primary)' }} className="text-3xl font-bold">${product.price}</span>
                  {product.discountPercentage && (
                    <span style={{ color: 'var(--text-primary)', backgroundColor: 'var(--brandcolor3)' }} className="ml-2 text-sm px-2 py-1 rounded">
                      {Math.round(product.discountPercentage)}% OFF
                    </span>
                  )}
                </div>
                <button 
                  style={{ backgroundColor: 'var(--brandcolor5)', color: 'white' }}
                  className="w-full hover:bg-[var(--brandcolor6)] py-3 px-6 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={product.stock === 0}
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>

                {/* Reviews Section */}
                <div className="mt-8 border-t pt-8" style={{ borderColor: 'var(--brandcolor3)' }}>
                  <h3 style={{ color: 'var(--text-primary)' }} className="text-xl font-bold mb-4">Customer Reviews</h3>
                  {product.reviews && product.reviews.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {product.reviews.map((review) => (
                        <div key={review.date} style={{ backgroundColor: 'var(--brandcolor3)' }} className="rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <div style={{ backgroundColor: 'var(--brandcolor6)' }} className="w-10 h-10 rounded-full flex items-center justify-center">
                                <span style={{ color: 'var(--text-primary)' }} className="font-medium">
                                  {review.reviewerName.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <span style={{ color: 'var(--text-primary)' }} className="font-medium">{review.reviewerName}</span>
                            </div>
                            {review.date && (
                              <span style={{ color: 'var(--text-secondary)' }} className="text-sm">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center mb-2">
                            <div style={{ color: 'var(--brandcolor8)' }} className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < Math.floor(review.rating) ? "text-[var(--brandcolor8)]" : "text-[var(--brandcolor4)]"}>
                                  ★
                                </span>
                              ))}
                            </div>
                            <span style={{ color: 'var(--text-secondary)' }} className="ml-2 text-sm font-medium">
                              {review.rating.toFixed(1)}
                            </span>
                          </div>
                          <p style={{ color: 'var(--text-secondary)' }} className="mt-2">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: 'var(--text-secondary)' }} className="italic">No reviews yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Side Content */}
          <div className="lg:col-span-1 space-y-4">
            <PremiumDelivery />
            <ProductSidebar product={product} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
