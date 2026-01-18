import React, { useEffect, useRef } from 'react';
import Hero from './components/Hero';
import MessageSection from './components/MessageSection';
import QuoteGallery from './components/QuoteGallery';

const App: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      // Safe progress calculation to avoid NaN when page hasn't loaded fully or is short
      let progress = 0;
      if (maxScroll > 0) {
        progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      }
      
      // Define color stops to cycle through as you scroll
      // Rose-50 -> Purple-100 -> Orange-100 -> Indigo-100
      const colors = [
        [255, 241, 242], 
        [243, 232, 255], 
        [255, 237, 213], 
        [224, 231, 255]  
      ];

      // Interpolate color based on scroll progress
      const position = progress * (colors.length - 1);
      const index = Math.floor(position);
      const factor = position - index;
      
      // Ensure indices are within bounds
      const safeIndex = Math.min(index, colors.length - 1);
      const nextIndex = Math.min(index + 1, colors.length - 1);

      const startColor = colors[safeIndex];
      const endColor = colors[nextIndex];
      
      // Guard against undefined colors
      if (startColor && endColor) {
        const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * factor);
        const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * factor);
        const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * factor);
        
        bgRef.current.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Call once to set initial state, wrapped in requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative">
      
      {/* Fixed Background Layer */}
      <div 
        ref={bgRef}
        className="fixed inset-0 -z-50"
        style={{ backgroundColor: '#fff1f2' }}
      ></div>

      <Hero />
      <MessageSection />
      <QuoteGallery />

      <footer className="py-12 text-center">
        <p className="font-sans text-stone-400 text-sm tracking-wide">
          Made with ❤️ from Sourav
        </p>
      </footer>
    </div>
  );
};

export default App;