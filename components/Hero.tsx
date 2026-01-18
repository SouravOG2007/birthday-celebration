import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          
          if (bgRef.current) {
            // Use translate3d for hardware acceleration
            bgRef.current.style.transform = `translate3d(0, ${scrollY * 0.5}px, 0)`;
          }
          
          if (contentRef.current) {
            // Use translate3d for hardware acceleration
            contentRef.current.style.transform = `translate3d(0, ${scrollY * 0.2}px, 0)`;
            contentRef.current.style.opacity = `${Math.max(0, 1 - scrollY / 600)}`;
          }
          
          ticking.current = false;
        });
        
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToMessage = () => {
    const element = document.getElementById('message-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="relative h-screen w-full overflow-hidden flex items-center justify-center text-center text-white">
      {/* Parallax Background Container */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform bg-slate-900"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
          style={{ 
            // Celebration/Sparkler image
            backgroundImage: "url('/photos/photo-0.jpg')",
            transform: 'scale(1.1)' // Scale up to prevent edges showing during parallax
          }}
        ></div>
        
        {/* Dark Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div 
        ref={contentRef}
        className="relative z-10 px-4 max-w-4xl mx-auto flex flex-col items-center will-change-transform"
      >
        <span 
          className="font-serif italic text-xl md:text-2xl mb-4 text-rose-200 tracking-wider opacity-0 animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          Est. 2008
        </span>
        <h1 
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight drop-shadow-lg opacity-0 animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          Happy 18th Birthday Sukriti
        </h1>
        <p 
          className="font-sans text-lg md:text-xl text-stone-200 mb-10 max-w-2xl leading-relaxed opacity-0 animate-fade-in"
          style={{ animationDelay: '0.6s' }}
        >
          Here's to the memories we've made, the laughs we've shared, and the incredible journey ahead. Welcome to adulthood!
        </p>
        
        <button 
          onClick={scrollToMessage}
          className="group flex flex-col items-center gap-2 text-rose-200 hover:text-white transition-colors opacity-0 animate-fade-in"
          style={{ animationDelay: '0.9s' }}
        >
          <span className="uppercase text-xs font-bold tracking-[0.2em]">Start the Celebration</span>
          <div className="p-3 border border-current rounded-full group-hover:bg-white/10 transition-all">
            <ArrowDown className="w-6 h-6 animate-bounce" />
          </div>
        </button>
      </div>
    </header>
  );
};

export default Hero;