"use client";
import { Product } from '../types/product';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';

interface DealOfTheDayProps {
  products: Product[];
}

export default function DealOfTheDay({ products }: DealOfTheDayProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleClick = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="bg-gradient-to-r from-[#3a5a40] to-[#588157] text-white py-6">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Deals of the Day</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {products.map((product) => {
            const discountedPrice = product.price * (1 - (product.discountPercentage || 0) / 100);
            
            return (
              <div 
                key={product.id}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-3 cursor-pointer hover:bg-white/20 transition duration-300"
                onClick={() => handleClick(product.id)}
              >
                <div className="relative h-32 mb-2">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {product.discountPercentage && (
                    <div className="deal-badge absolute top-1 right-1 bg-red-500 px-2 py-0.5 rounded-full text-xs font-bold">
                      -{Math.round(product.discountPercentage)}%
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-sm mb-1 truncate">{product.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs">
                    <div className="flex text-yellow-300">★</div>
                    <span className="ml-1">{product.rating}</span>
                  </div>
                  <span className="text-lg font-bold">${discountedPrice.toFixed(2)}</span>
                </div>
                <button 
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full bg-[#a3b18a] hover:bg-[#588157] text-white py-2 px-4 rounded-md text-xs mt-2 transition cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
