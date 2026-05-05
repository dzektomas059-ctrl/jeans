import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { AppContext, type CartItem } from './appContextInstance';

export function AppProvider({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  const toggleWishlist = useCallback((id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id],
    );
  }, []);

  const addToCart = useCallback((item: Omit<CartItem, 'qty'>) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, qty: c.qty + 1 } : c,
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const updateQty = useCallback((id: number, qty: number) => {
    if (qty < 1) {
      setCart((prev) => prev.filter((c) => c.id !== id));
      return;
    }
    setCart((prev) => prev.map((c) => (c.id === id ? { ...c, qty } : c)));
  }, []);

  const cartTotal = useMemo(
    () => cart.reduce((sum, c) => sum + c.price * c.qty, 0),
    [cart],
  );
  const cartCount = useMemo(
    () => cart.reduce((sum, c) => sum + c.qty, 0),
    [cart],
  );

  const value = useMemo(
    () => ({
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen,
      wishlist,
      toggleWishlist,
      cart,
      addToCart,
      removeFromCart,
      updateQty,
      cartTotal,
      cartCount,
    }),
    [
      cartOpen,
      searchOpen,
      wishlist,
      toggleWishlist,
      cart,
      addToCart,
      removeFromCart,
      updateQty,
      cartTotal,
      cartCount,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
