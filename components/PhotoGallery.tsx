import React, { useRef, useEffect, useState } from 'react';
import { Camera, ChevronRight } from 'lucide-react';

const PhotoGallery: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [visiblePhotoIds, setVisiblePhotoIds] = useState<Set<number>>(new Set());

  // Photos with specific frame colors representing the timeline
  // NOTE: Ensure you have a folder named 'photos' in your public directory 
  // with images named photo-1.jpg through photo-10.jpg
  const photos = [
    { 
      id: 1, 
      url: '/photos/photo-1.jpg', 
      frameClass: 'bg-rose-100', // Pastel Rose
      rotation: '-rotate-2'
    },
    { 
      id: 2, 
      url: '/photos/photo-2.jpg', 
      frameClass: 'bg-indigo-100', // Pastel Indigo
      rotation: 'rotate-1'
    },
    { 
      id: 3, 
      url: '/photos/photo-3.jpg', 
      frameClass: 'bg-lime-100', // Pastel Lime
      rotation: '-rotate-1'
    },
    { 
      id: 4, 
      url: '/photos/photo-4.jpg', 
      frameClass: 'bg-orange-100', // Pastel Orange
      rotation: 'rotate-2'
    },
    { 
      id: 5, 
      url: '/photos/photo-5.jpg', 
      frameClass: 'bg-teal-100', // Pastel Teal
      rotation: '-rotate-2'
    },
    { 
      id: 6, 
      url: '/photos/photo-6.jpg', 
      frameClass: 'bg-fuchsia-100', // Pastel Fuchsia
      rotation: 'rotate-1'
    },
    { 
      id: 7, 
      url: '/photos/photo-7.jpg', 
      frameClass: 'bg-blue-100', // Pastel Blue
      rotation: '-rotate-3'
    },
    { 
      id: 8, 
      url: '/photos/photo-8.jpg', 
      frameClass: 'bg-amber-100', // Pastel Amber
      rotation: 'rotate-2'
    },
    { 
      id: 9, 
      url: '/photos/photo-9.jpg', 
      frameClass: 'bg-emerald-100', // Pastel Emerald
      rotation: '-rotate-1'
    },
    { 
      id: 10, 
      url: '/photos/photo-10.jpg', 
      frameClass: 'bg-violet-100', // Pastel Violet
      rotation: 'rotate-3'
    },
  ];

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Section visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
          observer.disconnect(); // Once visible, stay visible
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Individual photo visibility observer
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute('data-id'));
            setVisiblePhotoIds((prev) => {
              const newSet = new Set(prev);
              newSet.add(id);
              return newSet;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: container,
        threshold: 0.4, // Trigger when 40% of the item is visible
      }
    );

    const items = container.querySelectorAll('.gallery-item');
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`py-24 bg-transparent relative transition-all duration-1000 ease-out overflow-hidden ${
        isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-black mb-4 tracking-tight drop-shadow-sm">
            Photobooth
          </h2>
          <div className="flex items-center justify-center gap-2 text-stone-600">
             <Camera className="w-5 h-5" />
             <span className="font-sans uppercase tracking-widest text-sm font-medium">Capture the Moment</span>
          </div>
        </div>

        {/* The Machine / Viewfinder Container */}
        <div className="relative w-full max-w-5xl">
          
          {/* Viewfinder UI Overlays (The "Machine" Look) */}
          <div className="absolute inset-0 pointer-events-none z-20 hidden md:block border-[1px] border-stone-900/10 rounded-3xl">
            {/* Corner Brackets */}
            <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-stone-900/30 rounded-tl-lg"></div>
            <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-stone-900/30 rounded-tr-lg"></div>
            <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-stone-900/30 rounded-bl-lg"></div>
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-stone-900/30 rounded-br-lg"></div>
            
            {/* Center Crosshair */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 opacity-20">
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black"></div>
              <div className="absolute left-1/2 top-0 h-full w-[1px] bg-black"></div>
            </div>

            {/* Status Indicators */}
            <div className="absolute top-8 right-12 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.6)]"></div>
              <span className="text-xs font-mono text-red-600 tracking-widest font-bold">REC</span>
            </div>
            <div className="absolute bottom-8 left-12">
              <span className="text-xs font-mono text-stone-500 tracking-widest font-medium">ISO 800 • 1/60</span>
            </div>
          </div>

          {/* Horizontal Scroll Track */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-8 md:gap-16 overflow-x-auto snap-x snap-mandatory py-16 px-8 md:px-24 pb-24 scrollbar-hide items-center"
            style={{ scrollBehavior: 'smooth' }}
          >
            {photos.map((photo, index) => (
              <div 
                key={photo.id}
                data-id={photo.id}
                className={`gallery-item relative flex-shrink-0 snap-center w-[280px] md:w-[350px] transition-all duration-1000 ease-out ${
                  visiblePhotoIds.has(photo.id) 
                    ? `opacity-100 translate-x-0 blur-none ${photo.rotation} hover:rotate-0 hover:z-30` 
                    : 'opacity-0 translate-x-12 blur-sm rotate-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Photo Card */}
                <div className={`p-4 ${photo.frameClass} shadow-2xl transform transition-all duration-300 hover:scale-105`}>
                  <div className="aspect-[3/4] overflow-hidden bg-stone-200 relative mb-4">
                     <img 
                      src={photo.url} 
                      alt={`Memory ${photo.id}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback in case image is missing
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x800?text=Photo+Missing';
                      }}
                    />
                    {/* Gloss Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-50 pointer-events-none"></div>
                  </div>
                  
                  {/* Tape Effect on top */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/20 backdrop-blur-sm -rotate-2 border-l border-r border-white/30"></div>
                </div>
              </div>
            ))}

            {/* Spacer for right padding */}
            <div className="w-8 shrink-0"></div>
          </div>

          {/* Mobile Scroll Hint / Navigation */}
          <button 
            onClick={scrollRight}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md p-3 rounded-full text-stone-900 border border-stone-200 shadow-lg md:hidden animate-pulse z-30"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

      </div>
      
      {/* Hide Scrollbar CSS */}
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

export default PhotoGallery;