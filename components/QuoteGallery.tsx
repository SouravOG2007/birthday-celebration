import React, { useRef, useEffect, useState } from 'react';
import { Quote, Sparkles } from 'lucide-react';

type ThemeType = 
  | 'sunset-vibes' 
  | 'fresh-mint' 
  | 'golden-hour' 
  | 'dark-mode' 
  | 'electric-blue' 
  | 'mystic-purple' 
  | 'soft-rose' 
  | 'classic-glass';

interface QuoteItem {
  id: number;
  text: string;
  author: string;
  theme: ThemeType;
}

const QuoteGallery: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [visibleIds, setVisibleIds] = useState<Set<number>>(new Set());

  // Use IntersectionObserver to trigger animations when cards enter the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number(entry.target.getAttribute('data-id'));
          if (entry.isIntersecting) {
            setVisibleIds((prev) => {
              const newSet = new Set(prev);
              newSet.add(id);
              return newSet;
            });
            // Stop observing this element so it stays visible (removes fade-out effect)
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null, // Use viewport
        threshold: 0.1, // Trigger early to prevent blank spaces
        rootMargin: '0px'
      }
    );

    const cards = document.querySelectorAll('.quote-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const quotes: QuoteItem[] = [
    { id: 1, text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", theme: 'sunset-vibes' },
    { id: 2, text: "Adulthood is mostly just googling how to do stuff.", author: "Fact of Life", theme: 'fresh-mint' },
    { id: 3, text: "Remember that time we laughed so hard you snorted soda?", author: "Classic Us", theme: 'golden-hour' },
    { id: 4, text: "Don't grow up. It's a trap.", author: "Peter Pan (probably)", theme: 'dark-mode' },
    { id: 5, text: "You have brains in your head. You have feet in your shoes.", author: "Dr. Seuss", theme: 'electric-blue' },
    { id: 6, text: "18 is the age where you can legally do everything you've been doing since 15.", author: "Shhh...", theme: 'mystic-purple' },
    { id: 7, text: "Live for the moments you can't put into words.", author: "Anonymous", theme: 'soft-rose' },
    { id: 8, text: "We’ll always have that disastrous road trip.", author: "Inside Joke #2", theme: 'classic-glass' },
    { id: 9, text: "Go confidently in the direction of your dreams.", author: "Thoreau", theme: 'fresh-mint' },
    { id: 10, text: "Act as young as you feel. You're not getting older, you're leveling up.", author: "Gamer Wisdom", theme: 'dark-mode' },
    { id: 11, text: "I am not a girl, not yet a woman.", author: "Britney Spears", theme: 'sunset-vibes' },
    { id: 12, text: "Thirty is the new twenty, so eighteen is basically a toddler.", author: "Perspective", theme: 'electric-blue' },
    { id: 13, text: "That inside joke about the pineapple.", author: "You know the one", theme: 'golden-hour' },
    { id: 14, text: "With great power comes great electricity bills.", author: "Real Adulthood", theme: 'classic-glass' },
    { id: 15, text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs", theme: 'mystic-purple' },
    { id: 16, text: "She turned her cant's into cans and her dreams into plans.", author: "Kobi Yamada", theme: 'soft-rose' },
    { id: 17, text: "Friends don't let friends do silly things alone.", author: "My Promise", theme: 'sunset-vibes' },
    { id: 18, text: "The best is yet to come.", author: "Frank Sinatra", theme: 'dark-mode' },
  ];

  const getThemeStyles = (theme: ThemeType) => {
    switch (theme) {
      case 'sunset-vibes':
        return {
          wrapper: 'bg-gradient-to-br from-orange-400 via-rose-500 to-purple-600 text-white border-transparent',
          icon: 'text-orange-200',
          author: 'text-orange-100',
          pattern: <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-300 rounded-full blur-3xl -mr-10 -mt-10 opacity-30 mix-blend-overlay"></div>
        };
      case 'fresh-mint':
        return {
          wrapper: 'bg-gradient-to-bl from-emerald-400 to-teal-600 text-white border-transparent',
          icon: 'text-emerald-100',
          author: 'text-emerald-50',
          pattern: <div className="absolute bottom-0 left-0 w-56 h-56 bg-white rounded-full blur-3xl -ml-12 -mb-12 opacity-20"></div>
        };
      case 'golden-hour':
        return {
          wrapper: 'bg-gradient-to-tr from-amber-200 to-orange-400 text-amber-950 border-transparent',
          icon: 'text-amber-800',
          author: 'text-amber-900',
          pattern: <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-[80px] opacity-40"></div>
        };
      case 'dark-mode':
        return {
          wrapper: 'bg-stone-900 text-white border-stone-800',
          icon: 'text-rose-500',
          author: 'text-stone-400',
          pattern: <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-stone-800 to-transparent opacity-50"></div>
        };
      case 'electric-blue':
        return {
          wrapper: 'bg-gradient-to-br from-cyan-500 to-blue-700 text-white border-transparent',
          icon: 'text-cyan-200',
          author: 'text-cyan-100',
          pattern: <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-40 mix-blend-overlay"></div>
        };
      case 'mystic-purple':
        return {
          wrapper: 'bg-gradient-to-br from-purple-500 via-indigo-600 to-violet-800 text-white border-transparent',
          icon: 'text-purple-200',
          author: 'text-purple-100',
          pattern: <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/10 to-transparent"></div>
        };
      case 'soft-rose':
        return {
          wrapper: 'bg-rose-50 text-rose-900 border-rose-100',
          icon: 'text-rose-300',
          author: 'text-rose-800',
          pattern: <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-rose-200 rounded-full blur-2xl opacity-50"></div>
        };
      case 'classic-glass':
      default:
        return {
          wrapper: 'bg-white/40 backdrop-blur-xl border-white/50 text-stone-800 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]',
          icon: 'text-stone-400',
          author: 'text-stone-500',
          pattern: <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-50"></div>
        };
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto px-6 mb-20 text-center">
        <h2 className="font-serif text-5xl md:text-6xl font-bold text-stone-900 mb-4">
          Words of Wisdom
        </h2>
      </div>

      {/* Scrolling Container */}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory pb-16 px-6 md:px-[calc((100vw-1152px)/2)] gap-6 scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        {quotes.map((item, index) => {
          const styles = getThemeStyles(item.theme);
          const isVisible = visibleIds.has(item.id);
          
          return (
            <div 
              key={item.id}
              data-id={item.id}
              className={`
                quote-card
                relative flex-shrink-0 snap-center w-[320px] md:w-[380px] h-[460px] 
                rounded-[2.5rem] p-10 flex flex-col justify-between border
                overflow-hidden group
                ${styles.wrapper}
                transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] will-change-transform
                ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
              `}
              style={{
                scrollSnapStop: 'always'
              }}
            >
              {/* Theme Pattern */}
              {styles.pattern}

              {/* Content */}
              <div className="relative z-10">
                <Quote className={`w-10 h-10 mb-8 ${styles.icon}`} />
                <p className="font-serif text-3xl md:text-[2rem] leading-tight font-bold tracking-tight drop-shadow-sm">
                  {item.text}
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-2 border-t border-current/10 pt-6 mt-6">
                <Sparkles className="w-4 h-4 opacity-70" />
                <span className={`font-sans text-xs font-bold uppercase tracking-widest ${styles.author}`}>
                  {item.author}
                </span>
              </div>
            </div>
          );
        })}
        
        {/* Spacer for end of list */}
        <div className="w-6 shrink-0"></div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default QuoteGallery;