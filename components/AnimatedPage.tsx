'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface AnimatedPageProps {
  children: React.ReactNode;
}

export default function AnimatedPage({ children }: AnimatedPageProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      delay: 0,
      anchorPlacement: 'top-bottom',
    });

    // Refresh AOS when component mounts
    AOS.refresh();

    // Counter animation function
    const animateCounters = () => {
      const counters = document.querySelectorAll('[data-counter]');
      
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-counter') || '0');
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current).toString();
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toString();
          }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              updateCounter();
              observer.unobserve(entry.target);
            }
          });
        });
        
        observer.observe(counter);
      });
    };

    // Initialize counter animations
    animateCounters();

    // Parallax effect for hero sections
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      
      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.getAttribute('data-parallax') || '0.5');
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function
    return () => {
      AOS.refresh();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <>{children}</>;
}