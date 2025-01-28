import { CartProduct } from "./cart";
import { Product } from "./product";

export interface CartContextProps {
  cart: CartProduct[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void; 
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void; 
  getRecentPurchases: () => CartProduct[]; 
}