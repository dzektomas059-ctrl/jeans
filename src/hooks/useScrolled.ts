import { useEffect, useState } from 'react';

/**
 * Returns true once the document has been scrolled past `offset` pixels.
 */
export function useScrolled(offset: number = 60): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);

  return scrolled;
}
