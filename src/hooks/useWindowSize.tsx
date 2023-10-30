'use client';
import { useState, useEffect } from 'react';

const getSize = () => {
  if (typeof window === 'undefined') {
    return { height: 0, width: 0 };
  }

  return {
    width: window.screen.width,
    height: window.screen.height,
  };
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getSize());

  const onResize = () => {
    setTimeout(() => {
      setWindowSize(getSize());
    }, 100);
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;
