import React, { useEffect, useState } from 'react';
import { X, Instagram, ExternalLink, Send } from 'lucide-react';
import { ViewState } from '../types';

// Custom TikTok Icon Component since it's not in the standard set
const TikTokIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentView: ViewState;
}

const SocialMediaPopup: React.FC<Props> = ({ isOpen, onClose, currentView }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  const isDesigner = currentView === ViewState.DESIGNER;
  
  // Theme Configurations
  const themeColors = isDesigner ? {
    border: 'border-accent-gold',
    text: 'text-accent-gold',
    bg: 'bg-charcoal',
    buttonHover: 'hover:bg-accent-gold hover:text-black',
    glow: 'shadow-[0_0_30px_rgba(197,160,89,0.15)]',
    font: 'font-serif'
  } : {
    border: 'border-neon-cyan',
    text: 'text-neon-cyan',
    bg: 'bg-[#0a0a0a]',
    buttonHover: 'hover:bg-neon-cyan hover:text-black',
    glow: 'shadow-[0_0_30px_rgba(0,243,255,0.15)]',
    font: 'font-mono'
  };

  return (
    <div className={`fixed inset-0 z-[200] flex items-center justify-center p-4 transition-all duration-500 ${isOpen ? 'opacity-100 backdrop-blur-sm bg-black/80' : 'opacity-0 pointer-events-none'}`}>
      
      <div className={`relative w-full max-w-lg border ${themeColors.border} ${themeColors.bg} ${themeColors.glow} p-8 md:p-12 transform transition-all duration-500 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'} shadow-2xl`}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className={`text-3xl md:text-4xl font-bold text-white mb-3 ${themeColors.font}`}>
            {isDesigner ? 'Join the Community' : 'ESTABLISH_CONNECTION'}
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            {isDesigner 
              ? 'Follow for daily design inspiration and behind-the-scenes content.' 
              : '// Access real-time updates and security protocols via social channels.'}
          </p>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          
          {/* TikTok */}
          <a 
            href="https://www.tiktok.com/@officialnayad" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`group flex items-center justify-between w-full p-4 border border-white/10 hover:border-transparent ${themeColors.buttonHover} transition-all duration-300 bg-white/5`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-full bg-black/20 group-hover:bg-black/10`}>
                 <TikTokIcon size={24} className="text-white group-hover:text-inherit" />
              </div>
              <div className="text-left">
                <span className={`block text-xs font-bold uppercase tracking-widest ${themeColors.text} group-hover:text-black`}>TikTok</span>
                <span className="text-white group-hover:text-black/80 text-sm">@officialnayad</span>
              </div>
            </div>
            <ExternalLink size={18} className="text-gray-500 group-hover:text-black" />
          </a>

          {/* Instagram */}
          <a 
            href="https://www.instagram.com/official__nayad/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`group flex items-center justify-between w-full p-4 border border-white/10 hover:border-transparent ${themeColors.buttonHover} transition-all duration-300 bg-white/5`}
          >
             <div className="flex items-center gap-4">
              <div className={`p-2 rounded-full bg-black/20 group-hover:bg-black/10`}>
                 <Instagram size={24} className="text-white group-hover:text-inherit" />
              </div>
              <div className="text-left">
                <span className={`block text-xs font-bold uppercase tracking-widest ${themeColors.text} group-hover:text-black`}>Instagram</span>
                <span className="text-white group-hover:text-black/80 text-sm">@official__nayad</span>
              </div>
            </div>
            <ExternalLink size={18} className="text-gray-500 group-hover:text-black" />
          </a>

          {/* Telegram */}
          <a 
            href="https://t.me/eah0011" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`group flex items-center justify-between w-full p-4 border border-white/10 hover:border-transparent ${themeColors.buttonHover} transition-all duration-300 bg-white/5`}
          >
             <div className="flex items-center gap-4">
              <div className={`p-2 rounded-full bg-black/20 group-hover:bg-black/10`}>
                 <Send size={24} className="text-white group-hover:text-inherit" />
              </div>
              <div className="text-left">
                <span className={`block text-xs font-bold uppercase tracking-widest ${themeColors.text} group-hover:text-black`}>Telegram</span>
                <span className="text-white group-hover:text-black/80 text-sm">@eah0011</span>
              </div>
            </div>
            <ExternalLink size={18} className="text-gray-500 group-hover:text-black" />
          </a>

        </div>

        {/* Footer / Skip */}
        <div className="mt-8 text-center">
          <button 
            onClick={onClose} 
            className="text-xs text-gray-600 hover:text-white transition-colors uppercase tracking-widest"
          >
            {isDesigner ? 'Maybe Later' : 'TERMINATE_POPUP'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default SocialMediaPopup;