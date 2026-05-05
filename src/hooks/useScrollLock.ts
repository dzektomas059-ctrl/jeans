import { useEffect } from 'react';

/**
 * Locks page scrolling while `locked` is true. Restores prior overflow on cleanup.
 */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}
