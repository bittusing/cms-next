'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface AnimatedHomepageProps {
  children: React.ReactNode;
}

export default function AnimatedHomepage({ children }: AnimatedHomepageProps) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
    });
  }, []);

  return <>{children}</>;
}