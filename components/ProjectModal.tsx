import React, { useEffect, useState } from 'react';
import { X, ExternalLink, FolderOpen } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  theme: 'designer' | 'cyber';
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose, theme }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Update activeProject when the modal opens or project changes
  useEffect(() => {
    if (project && isOpen) {
      setActiveProject(project);
    }
  }, [project, isOpen]);

  // Handle open/close animation lifecycle
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const timer = setTimeout(() => setAnimateIn(true), 10);
      document.body.style.overflow = 'hidden';
      return () => clearTimeout(timer);
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
        document.body.style.overflow = 'unset';
        setActiveProject(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender || !activeProject) return null;

  const displayProject = activeProject;
  const isDesigner = theme === 'designer';
  const isVideo = displayProject.mediaType === 'video';
  
  const baseClasses = isDesigner
    ? 'bg-charcoal text-gray-200 border-white/10 font-sans' 
    : 'bg-[#0a0a0a] text-gray-400 border-gray-800 font-mono';
  
  const accentText = isDesigner ? 'text-accent-gold' : 'text-accent-steel';
  const accentBorder = isDesigner ? 'border-accent-gold' : 'border-accent-steel';
  
  const buttonClasses = isDesigner
    ? 'bg-white text-black hover:bg-accent-gold transition-colors uppercase tracking-widest text-xs'
    : 'bg-transparent border border-gray-700 text-accent-steel hover:bg-accent-steel hover:text-black hover:border-accent-steel transition-colors font-mono text-xs';

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-sm" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className={`relative w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row border ${baseClasses} shadow-2xl transform transition-all duration-300 ${animateIn ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-white/20 transition-colors z-20 clickable rounded-full"
        >
          <X size={20} className="text-white" />
        </button>

        {/* Media Section - Adapts for Vertical Video vs Standard */}
        <div className={`relative w-full md:w-1/2 lg:w-3/5 bg-black flex items-center justify-center overflow-hidden ${isVideo ? 'aspect-[9/16] md:aspect-auto' : 'h-64 md:h-auto'}`}>
           
           {isVideo && displayProject.driveId ? (
             <iframe 
                src={`https://drive.google.com/file/d/${displayProject.driveId}/preview`}
                className="w-full h-full"
                allow="autoplay"
                frameBorder="0"
                title={displayProject.title}
             ></iframe>
           ) : (
             <img 
                src={displayProject.imageUrl || `https://drive.google.com/thumbnail?id=${displayProject.driveId || ''}&sz=w1600`}
                alt={displayProject.title} 
                className={`w-full h-full object-contain transition-transform duration-1000 ${!isDesigner ? 'grayscale' : ''}`}
             />
           )}

           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 md:opacity-50 pointer-events-none"></div>
           
           {/* Mobile Title Overlay */}
           <div className="absolute bottom-6 left-6 md:hidden animate-slide-up z-10 pointer-events-none">
              <span className={`inline-block px-3 py-1 mb-2 text-[10px] font-bold uppercase tracking-widest border ${accentBorder} ${accentText} bg-black/50 backdrop-blur-md`}>
                {displayProject.category}
              </span>
              <h2 className={`text-2xl font-bold text-white ${isDesigner ? 'font-serif' : 'font-mono'}`}>{displayProject.title}</h2>
           </div>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 lg:w-2/5 p-8 md:p-12 overflow-y-auto bg-[#080808]">
            <div className="space-y-8 h-full flex flex-col">
                <div className="hidden md:block">
                    <span className={`inline-block px-3 py-1 mb-4 text-[10px] font-bold uppercase tracking-widest border ${accentBorder} ${accentText}`}>
                        {displayProject.category}
                    </span>
                    <h2 className={`text-3xl lg:text-4xl font-bold text-white mb-2 ${isDesigner ? 'font-serif' : 'font-mono'}`}>{displayProject.title}</h2>
                </div>

                <div>
                    <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 opacity-60 ${isDesigner ? 'text-white' : 'text-gray-400'}`}>About This Project</h3>
                    <p className="leading-relaxed text-sm opacity-90 text-gray-300">
                        {displayProject.longDescription || displayProject.description}
                    </p>
                </div>
                
                <div className="space-y-4">
                   <h4 className="text-xs font-bold uppercase tracking-widest opacity-60 text-gray-400">Project Type</h4>
                   <ul className="list-none space-y-2 opacity-80 text-sm text-gray-300">
                      <li className="flex items-center gap-2">
                        <span className={`w-1 h-1 ${isDesigner ? 'bg-accent-gold' : 'bg-accent-steel'}`}></span> 
                        {displayProject.mediaType === 'video' ? 'Vertical Video (9:16)' : 'Static Visual / Print'}
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={`w-1 h-1 ${isDesigner ? 'bg-accent-gold' : 'bg-accent-steel'}`}></span> 
                        Creative Portfolio
                      </li>
                   </ul>
                </div>

                <div className="mt-auto pt-8 border-t border-white/5">
                    <div className="mb-8">
                        <h3 className="text-xs font-bold uppercase tracking-widest mb-4 opacity-60 text-gray-400">Tools & Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {displayProject.tags.map(tag => (
                                <span key={tag} className={`flex items-center gap-1 text-[10px] bg-white/5 text-gray-300 px-2 py-1 border border-white/5 ${isDesigner ? '' : 'font-mono'}`}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {displayProject.link && (
                        <a 
                            href={displayProject.link} 
                            target="_blank" 
                            rel="noreferrer"
                            className={`flex items-center justify-center gap-2 w-full py-4 font-bold transition-all clickable shadow-lg ${buttonClasses}`}
                        >
                            View Full Folder <FolderOpen size={14} />
                        </a>
                    )}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectModal;