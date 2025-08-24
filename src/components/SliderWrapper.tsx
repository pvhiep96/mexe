'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import react-slick to avoid SSR issues
const Slider = dynamic(() => import('react-slick'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

// Import CSS only on client side
const SliderWrapper = ({ children, ...props }: any) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Import CSS dynamically
    import('slick-carousel/slick/slick.css');
    import('slick-carousel/slick/slick-theme.css');
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return <Slider {...props}>{children}</Slider>;
};

export default SliderWrapper;
