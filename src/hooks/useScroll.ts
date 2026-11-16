import { useState, useEffect } from 'react';

export function useScroll() {
  const [scrollY, setScrollY] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? false : true;
      
      if (direction !== isScrollingUp && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setIsScrollingUp(direction);
      }
      
      setIsScrolled(scrollY > 50);
      setScrollY(scrollY);
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener('scroll', updateScrollDirection, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, [isScrollingUp]);

  return { scrollY, isScrollingUp, isScrolled };
}
