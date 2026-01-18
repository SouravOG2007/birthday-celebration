import React, { useRef, useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

const MessageSection: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible to prevent fade out
        }
      },
      { 
        threshold: 0.15,
        rootMargin: "-50px" 
      }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="message-section" className="py-32 md:py-48 px-6 relative overflow-hidden">
      {/* Background Image with Overlay - Reduced opacity to 0.15 to let bg colors show */}
      {/* Adjusted mask-image to keep texture visible behind the entire card, fading only at very edges */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-15 pointer-events-none"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1516709323136-1e63d33932a3?q=80&w=2000&auto=format&fit=crop')",
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)'
        }}
      ></div>
      
      {/* Decorative Blur Elements - Reduced opacity */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-rose-200 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/3 translate-y-1/3 opacity-40"></div>

      <div 
        ref={contentRef}
        className={`max-w-4xl mx-auto relative z-10 transition-all duration-700 ease-out transform will-change-transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      >
        <div className="border border-white/40 p-8 md:p-16 rounded-[2rem] bg-white/60 backdrop-blur-md shadow-lg">
          <div className="flex justify-center mb-10">
            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 animate-pulse ring-4 ring-rose-100">
              <Heart className="w-8 h-8 fill-current" />
            </div>
          </div>
          
          <h2 className="font-serif text-center text-4xl md:text-6xl text-stone-900 mb-12 tracking-tight">
            A Special Note
          </h2>
          
          <div className="prose prose-xl prose-stone mx-auto font-serif leading-loose text-stone-800 text-center">
            <p className="mb-8">
              <span className="text-rose-600 font-bold text-2xl uppercase tracking-widest block mb-4 text-center text-sm font-sans">Dearest Sukriti</span>
              Eighteen years ago, the world got a little brighter. Watching you grow into the incredible person 
              you are today has been the greatest privilege. You are kind, fierce, intelligent, and absolutely hilarious.
            </p>
            <p className="mb-8">
              As you step into this new chapter called "adulthood," remember that you don't have to have it all figured out right away. 
              Take your time, make mistakes, laugh at them, and keep moving forward. I'm so proud of you and I can't wait to see 
              everything you will achieve.
            </p>
            <div className="mt-16 pt-8 border-t border-rose-200/50">
              <p className="font-bold text-rose-600 italic text-2xl md:text-3xl">
                Happy Birthday! Let's make this year unforgettable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessageSection;
