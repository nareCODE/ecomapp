"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { Cart, CartItem } from '../types/cart';
import { Product } from '../types/product';

interface CartContextType {
  cart: Cart;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });

  useEffect(() => {
    // Load cart from localStorage on component mount
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const calculateTotal = (items: CartItem[]) => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        const updatedItems = prevCart.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          items: updatedItems,
          total: calculateTotal(updatedItems)
        };
      }

      const newItems = [...prevCart.items, { product, quantity: 1 }];
      return {
        items: newItems,
        total: calculateTotal(newItems)
      };
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.product.id !== productId);
      return {
        items: newItems,
        total: calculateTotal(newItems)
      };
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0);

      return {
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
