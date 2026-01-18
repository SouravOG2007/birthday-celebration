import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, Loader2 } from 'lucide-react';
import { getAdulthoodWisdom } from '../services/geminiService';
import { LoadingState } from '../types';

const AdulthoodOracle: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        // Calculate relative scroll position
        const scrollProgress = (window.innerHeight - rect.top) * 0.1;
        
        if (blob1Ref.current) {
          blob1Ref.current.style.transform = `translateY(${scrollProgress * -0.5}px)`;
        }
        if (blob2Ref.current) {
          blob2Ref.current.style.transform = `translateY(${scrollProgress * 0.3}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setStatus(LoadingState.LOADING);
    setResponse('');
    
    const wisdom = await getAdulthoodWisdom(query);
    
    setResponse(wisdom);
    setStatus(LoadingState.SUCCESS);
  };

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-transparent relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden md:flex border border-white/50">
          {/* Left Side - Visual */}
          <div className="bg-stone-900 p-12 md:w-1/3 flex flex-col justify-between text-white relative overflow-hidden">
            {/* Parallax Blobs */}
            <div 
              ref={blob1Ref} 
              className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-rose-500 rounded-full blur-3xl opacity-20 transition-transform duration-75 will-change-transform"
            ></div>
            <div 
              ref={blob2Ref} 
              className="absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 bg-blue-500 rounded-full blur-3xl opacity-20 transition-transform duration-75 will-change-transform"
            ></div>
            
            <div className="relative z-10">
              <Sparkles className="w-10 h-10 text-rose-400 mb-6" />
              <h3 className="font-serif text-3xl font-bold mb-4">The Adulthood Oracle</h3>
              <p className="text-stone-300 font-light text-sm leading-relaxed">
                Not sure what taxes are? Confused about dating? Or just want a laugh? 
                Ask the AI Oracle for some 18th birthday wisdom.
              </p>
            </div>
          </div>

          {/* Right Side - Interaction */}
          <div className="p-8 md:p-12 md:w-2/3 flex flex-col justify-center">
            {status === LoadingState.SUCCESS && response ? (
              <div className="mb-8 p-6 bg-rose-50 rounded-xl border border-rose-100 animate-fade-in">
                <p className="font-serif text-xl text-stone-800 italic">"{response}"</p>
                <button 
                  onClick={() => {
                    setStatus(LoadingState.IDLE);
                    setQuery('');
                  }}
                  className="mt-4 text-xs font-bold uppercase tracking-wider text-rose-500 hover:text-rose-700"
                >
                  Ask Another Question
                </button>
              </div>
            ) : (
              <form onSubmit={handleAsk} className="relative">
                <label className="block text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3">
                  What is your question about being 18?
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., How do I cook?"
                    disabled={status === LoadingState.LOADING}
                    className="w-full bg-white/50 border border-stone-200 text-stone-900 text-lg rounded-xl py-4 px-5 pr-14 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400 transition-all placeholder:text-stone-400"
                  />
                  <button 
                    type="submit"
                    disabled={status === LoadingState.LOADING || !query.trim()}
                    className="absolute right-2 p-2 bg-stone-900 text-white rounded-lg hover:bg-rose-600 disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {status === LoadingState.LOADING ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdulthoodOracle;