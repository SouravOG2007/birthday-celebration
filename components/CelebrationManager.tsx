import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const CelebrationManager: React.FC = () => {
  const firedRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger when the user scrolls past 10% of the viewport height.
      // This catches both manual scrolls leaving the top 
      // and the programmatic scroll from the "Start Celebration" button.
      const triggerThreshold = window.innerHeight * 0.1;
      
      if (window.scrollY > triggerThreshold && !firedRef.current) {
        firedRef.current = true;
        launchConfetti();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const launchConfetti = () => {
    const duration = 2500;
    const end = Date.now() + duration;
    
    // Theme colors: Rose, Gold, White
    const colors = ['#f43f5e', '#fb7185', '#fecdd3', '#fbbf24', '#ffffff'];

    (function frame() {
      // Launch from left edge
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: colors
      });
      
      // Launch from right edge
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return null;
};

export default CelebrationManager;