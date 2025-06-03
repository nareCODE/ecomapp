"use client";
import { Product } from '../types/product';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import Image from 'next/image'; // Import Image

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleClick = () => {
    router.push(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300"
      onClick={handleClick}
    >
      <div className="relative w-full h-48"> {/* Ensure parent has dimensions for fill */}
        <Image // Changed from <img> to <Image>
          src={product.thumbnail}
          alt={product.title}
          fill // Use fill for responsive images
          style={{ objectFit: 'cover' }} // Apply object-fit via style
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optional: provide sizes for optimization
        />
        {product.discountPercentage && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1">{product.title}</h3>
        <div className="flex items-center mb-2">
          <span className="text-gray-600 text-xs ml-1">({product.rating})</span>
        </div>
        <div className="mb-3">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
        </div>
        <button 
          onClick={handleAddToCart}
          className="w-full bg-[#588157] hover:bg-[#3a5a40] text-white py-2 px-4 rounded-md text-sm transition cursor-pointer"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
