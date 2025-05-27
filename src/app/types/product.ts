export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  reviews?: {
    id: number;
    user: string;
    reviewerName: string;
    rating: number;
    comment: string;
    date?: string;
  }[];
}
