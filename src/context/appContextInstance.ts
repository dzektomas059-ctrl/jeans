import { createContext } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size?: string;
  qty: number;
}

export interface AppContextType {
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'qty'>) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  cartTotal: number;
  cartCount: number;
}

export const AppContext = createContext<AppContextType | null>(null);
