import React, { useState } from 'react';
import { Palette, Terminal } from 'lucide-react';
import { ViewState } from '../types';

interface LandingSelectionProps {
  onSelect: (view: ViewState) => void;
}

const LandingSelection: React.FC<LandingSelectionProps> = ({ onSelect }) => {
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);

  return (
    <div className="relative w-full h-screen flex flex-col md:flex-row overflow-hidden font-sans bg-rich-black">
      
      {/* GLOBAL WHITE GRID BACKGROUND */}
      <div className="absolute inset-0 bg-grid-white z-0 pointer-events-none opacity-5 animate-grid-diagonal mask-vignette"></div>
      
      {/* --- CENTER "OR" SEPARATOR --- */}
      {/* Now hides (opacity-0 and scale-0) when hoveredSide is not null */}
      <div 
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-700 ease-in-out ${
            hoveredSide ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100 animate-pop-in'
        }`}
      >
         <div className="relative group">
            {/* Pulsing Rings */}
            <div className="absolute inset-0 rounded-full border border-white/10 animate-ping opacity-20"></div>
            <div className="absolute -inset-4 rounded-full border border-white/5 animate-pulse-slow"></div>
            
            {/* Main Badge */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-rich-black/80 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-2xl relative z-10">
                <span className="text-gray-400 font-serif italic text-sm md:text-lg">or</span>
            </div>
         </div>
      </div>

      {/* --- LEFT SIDE: DESIGNER --- */}
      <div 
        onClick={() => onSelect(ViewState.DESIGNER)}
        onMouseEnter={() => setHoveredSide('left')}
        onMouseLeave={() => setHoveredSide(null)}
        className={`group relative h-1/2 md:h-full cursor-pointer overflow-hidden border-b md:border-b-0 md:border-r border-white/5 z-10 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] animate-slide-in-left opacity-0 ${
            hoveredSide === 'left' ? 'md:flex-[1.5]' : hoveredSide === 'right' ? 'md:flex-[0.5]' : 'md:flex-1'
        }`}
      >
        {/* Hover Background Image (Subtle) */}
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/art/1920/1080')] bg-cover bg-center opacity-0 group-hover:opacity-20 transition-opacity duration-1000 scale-110 group-hover:scale-100"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-rich-black/90 to-transparent"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-20 text-center">
            <div className="p-6 md:p-8 rounded-full border border-white/10 mb-8 md:mb-12 group-hover:border-accent-gold transition-all duration-700 bg-rich-black/50 backdrop-blur-md transform group-hover:scale-110 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <Palette className="w-10 h-10 md:w-16 md:h-16 text-gray-400 transition-all duration-700 group-hover:text-accent-gold" strokeWidth={1} />
            </div>
            
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-serif text-white mb-4 md:mb-6 tracking-tight group-hover:translate-y-[-10px] transition-transform duration-700">
                Creative<span className="text-gray-600 group-hover:text-accent-gold transition-colors">.</span>
            </h2>
            
            <p className="text-gray-500 font-light tracking-[0.3em] text-xs md:text-lg uppercase max-w-md group-hover:text-white transition-colors duration-700">
                Design & Direction
            </p>

            <div className="mt-8 md:mt-12 opacity-0 transform translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100">
                <span className="text-[10px] md:text-sm uppercase tracking-widest border border-white/30 text-white px-6 py-3 md:px-8 md:py-4 hover:bg-white hover:text-black hover:border-white transition-colors">
                    View Portfolio
                </span>
            </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: CYBER --- */}
      <div 
        onClick={() => onSelect(ViewState.CYBER)}
        onMouseEnter={() => setHoveredSide('right')}
        onMouseLeave={() => setHoveredSide(null)}
        className={`group relative h-1/2 md:h-full cursor-pointer overflow-hidden z-10 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] animate-slide-in-right opacity-0 ${
             hoveredSide === 'right' ? 'md:flex-[1.5]' : hoveredSide === 'left' ? 'md:flex-[0.5]' : 'md:flex-1'
        }`}
      >
        {/* Hover Background Effect (Matrix-like) */}
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/tech/1920/1080')] bg-cover bg-center opacity-0 group-hover:opacity-20 transition-opacity duration-1000 scale-110 group-hover:scale-100 grayscale contrast-125"></div>
        <div className="absolute inset-0 bg-rich-black/80 group-hover:bg-rich-black/70 transition-colors"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-20 text-center">
             <div className="p-6 md:p-8 rounded-full border border-white/10 mb-8 md:mb-12 group-hover:border-neon-cyan transition-all duration-700 bg-rich-black/50 backdrop-blur-md transform group-hover:scale-110 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <Terminal className="w-10 h-10 md:w-16 md:h-16 text-gray-400 transition-all duration-700 group-hover:text-neon-cyan" strokeWidth={1} />
            </div>
            
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-mono text-white mb-4 md:mb-6 tracking-tighter group-hover:translate-y-[-10px] transition-transform duration-700">
                Technical<span className="text-gray-600 group-hover:text-neon-cyan transition-colors glitch-text">_</span>
            </h2>
            
            <p className="text-gray-500 font-mono text-xs md:text-lg max-w-md tracking-wider group-hover:text-neon-cyan transition-colors duration-700">
                // Security & Development
            </p>

            <div className="mt-8 md:mt-12 opacity-0 transform translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100">
                 <span className="text-[10px] md:text-sm font-mono border border-white/30 text-white px-6 py-3 md:px-8 md:py-4 hover:bg-neon-cyan hover:text-black hover:border-neon-cyan transition-colors">
                    $ ACCESS_SYSTEM
                </span>
            </div>
        </div>
      </div>
      
    </div>
  );
};

export default LandingSelection;