import React, { useState, useEffect, useRef } from "react";
import { ViewState, Project, ExperienceItem, ProjectCategory } from "../types";
import {
  ArrowLeft,
  Video,
  Palette,
  Layers,
  MessageSquare,
  Check,
  Award,
} from "lucide-react";
import ProjectModal from "./ProjectModal";
import { creativeProjects, profileImage } from "../data/projects";

interface Props {
  onBack: () => void;
}

// Helper to determine aspect ratio based on category
const getAspectRatioClass = (
  category: ProjectCategory,
  mediaType?: "image" | "video",
) => {
  if (mediaType === "video") return "aspect-[9/16]";
  switch (category) {
    case "Business Cards":
      return "aspect-video"; // 16:9 Landscape for cards
    case "YouTube Thumbnails":
      return "aspect-video"; // 16:9
    case "Logos":
    case "Social Media Posts":
      return "aspect-square"; // 1:1
    default:
      return "aspect-[4/3]";
  }
};

const ProjectCardMedia = ({ project }: { project: Project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const aspectRatioClass = getAspectRatioClass(
    project.category,
    project.mediaType,
  );
  const isVideo = project.mediaType === "video";

  useEffect(() => {
    if (!isVideo) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Set visible only when significantly in view to prevent loading too early
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.4 }, // Increased threshold so placeholder is seen more often
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isVideo]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-gray-900 ${aspectRatioClass} group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Placeholder "Click to Play" - Default View for Videos (Layer 0) */}
      {isVideo && !isVisible && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-0 transition-opacity duration-300">
          <div className="w-16 h-16 rounded-full border-2 border-white/10 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-500">
            <Video
              className="text-white opacity-50 group-hover:text-accent-gold group-hover:opacity-100 transition-colors"
              size={24}
            />
          </div>
          <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.25em] border-b border-white/10 pb-1 group-hover:text-white transition-colors">
            Click to Play
          </span>
        </div>
      )}

      {/* 2. Thumbnail / Poster Image (Layer 1)
                 - For Images: Always visible.
                 - For Videos: Hidden by default (opacity-0), Visible on Hover (opacity-100).
             */}
      <img
        src={`https://drive.google.com/thumbnail?id=${project.driveId}&sz=w800`}
        alt={project.title}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 z-10
                    ${!isVideo ? "opacity-100 group-hover:scale-110" : ""}
                    ${isVideo ? (isHovered && !isVisible ? "opacity-40" : "opacity-0") : ""}
                `}
        loading="lazy"
      />

      {/* 3. Video Iframe Embed (Layer 2)
                - Loads when visible on scroll (IntersectionObserver).
                - Covers placeholder and thumbnail when active.
            */}
      {isVideo && isVisible && (
        <div className="absolute inset-0 z-20 bg-black animate-fade-in">
          <iframe
            src={`https://drive.google.com/file/d/${project.driveId}/preview`}
            className="w-full h-full"
            allow="autoplay"
            title={project.title}
            loading="lazy"
          />
          {/* Transparent Overlay to capture clicks for parent Modal */}
          <div className="absolute inset-0 z-30 bg-transparent cursor-pointer"></div>
        </div>
      )}

      {/* Dark overlay for images on hover */}
      {!isVideo && (
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors pointer-events-none z-20"></div>
      )}
    </div>
  );
};

const DesignerPortfolio: React.FC<Props> = ({ onBack }) => {
  const [filter, setFilter] = useState<ProjectCategory>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Filter Logic
  const filteredProjects =
    filter === "All"
      ? creativeProjects
      : creativeProjects.filter((p) => p.category === filter);

  // Scroll Tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filteredProjects, filter]);

  return (
    <div className="relative min-h-screen bg-rich-black font-sans text-gray-200 animate-fade-in overflow-hidden selection:bg-accent-gold selection:text-black">
      {/* --- SCROLL PROGRESS LINE --- */}
      <div className="fixed left-12 top-0 bottom-0 w-[1px] bg-white/10 z-[60] hidden lg:flex flex-col justify-center">
        <div className="relative w-full h-full overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full bg-accent-gold transition-all duration-300 ease-out shadow-[0_0_20px_rgba(197,160,89,0.8)]"
            style={{ height: `${scrollProgress}%` }}
          ></div>
        </div>
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/30 rounded-full"></div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/30 rounded-full"></div>
      </div>

      {/* --- BACKGROUND EFFECTS --- */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        {/* Main White Grid */}
        <div className="absolute inset-0 bg-grid-white animate-grid-diagonal"></div>
      </div>
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-white rounded-full mix-blend-overlay blur-[120px] opacity-5 animate-pulse-slow"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-accent-gold rounded-full mix-blend-overlay blur-[120px] opacity-5 animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
      <div className="fixed inset-0 z-0 pointer-events-none mask-vignette bg-rich-black/30"></div>

      <ProjectModal
        project={selectedProject!}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        theme="designer"
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-rich-black/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12 py-6 flex justify-between items-center pl-24">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm uppercase tracking-widest text-gray-500 hover:text-white transition-colors clickable group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />{" "}
            Return
          </button>
          <div className="font-serif italic font-bold text-2xl text-white">
            Gebregziabher<span className="text-accent-gold">.</span>Creative
          </div>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-xs md:text-sm uppercase tracking-widest border border-white/20 hover:border-accent-gold hover:text-accent-gold px-8 py-3 transition-all clickable"
          >
            Inquire
          </button>
        </div>
      </nav>

      <div className="relative z-10 pl-16 lg:pl-24">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center pt-20 px-8 md:px-12">
          <div className="max-w-[1800px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 reveal">
              <div className="inline-block mb-8">
                <span className="text-accent-gold text-sm font-bold tracking-[0.2em] uppercase border-b border-accent-gold pb-2">
                  Visual Artist & Designer
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-medium leading-[0.9] mb-12 text-white tracking-tight">
                Crafting <br />
                <span className="italic text-gray-500">Digital Reality.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl leading-relaxed font-light">
                Specializing in high-end brand identity, social media
                acceleration, and immersive video edits. A portfolio driven by
                results and aesthetics.
              </p>
              <div className="flex gap-6">
                <button
                  onClick={() =>
                    document
                      .getElementById("works")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="bg-white text-black px-10 py-4 uppercase tracking-widest text-sm font-bold hover:bg-accent-gold transition-colors"
                >
                  View Recent Works
                </button>
              </div>
            </div>

            <div
              className="order-1 lg:order-2 flex justify-center lg:justify-end reveal"
              style={{ transitionDelay: "0.2s" }}
            >
              <div className="relative w-full max-w-lg aspect-[3/4]">
                <div className="absolute top-6 -right-6 w-full h-full border border-white/10 z-0"></div>
                <div className="relative w-full h-full overflow-hidden z-10 filter grayscale contrast-125 hover:grayscale-0 transition-all duration-1000 shadow-2xl">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-40 border-t border-white/5 bg-rich-black/40 backdrop-blur-sm">
          <div className="max-w-[1800px] mx-auto px-8 md:px-12">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-24 reveal text-center">
              My Quality Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <div className="reveal p-12 border border-white/10 bg-black/40 hover:border-accent-gold/50 transition-colors group">
                <Video
                  size={48}
                  className="text-accent-gold mb-8 group-hover:scale-110 transition-transform"
                  strokeWidth={1}
                />
                <h3 className="text-3xl font-serif text-white mb-6">
                  Video Editing
                </h3>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  Engaging short-form content for TikTok/Reels and cinematic
                  long-form productions.
                </p>
                <ul className="space-y-4 text-base text-gray-400 font-light">
                  <li className="flex gap-3">
                    <Check size={18} className="text-accent-gold" /> Vertical
                    Social Edits
                  </li>
                  <li className="flex gap-3">
                    <Check size={18} className="text-accent-gold" /> YouTube
                    Thumbnails & Flow
                  </li>
                  <li className="flex gap-3">
                    <Check size={18} className="text-accent-gold" /> Motion
                    Graphics
                  </li>
                </ul>
              </div>

              <div
                className="reveal p-12 border border-white/10 bg-black/40 hover:border-accent-gold/50 transition-colors group"
                style={{ transitionDelay: "0.15s" }}
              >
                <Palette
                  size={48}
                  className="text-accent-gold mb-8 group-hover:scale-110 transition-transform"
                  strokeWidth={1}
                />
                <h3 className="text-3xl font-serif text-white mb-6">
                  Brand Identity
                </h3>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  Complete visual systems from logo design to corporate
                  stationery and business cards.
                </p>
                <ul className="space-y-4 text-base text-gray-400 font-light">
                  <li className="flex gap-3">
                    <Check size={18} className="text-accent-gold" /> Logo Design
                  </li>
                  <li className="flex gap-3">
                    <Check size={18} className="text-accent-gold" /> Business
                    Cards
                  </li>
                  <li className="flex gap-3">
                    <Check size={18} className="text-accent-gold" /> Brand
                    Guidelines
                  </li>
                </ul>
              </div>

              <div
                className="reveal p-12 border border-white/10 bg-black/40 hover:border-accent-gold/50 transition-colors group"
                style={{ transitionDelay: "0.3s" }}
              >
                <Layers
                  size={48}
                  className="text-accent-gold mb-8 group-hover:scale-110 transition-transform"
                  strokeWidth={1}
                />
                <h3 className="text-3xl font-serif text-white mb-6">
                  Digital Design
                </h3>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  High-conversion social media assets and intuitive UI/UX design
                  for web and mobile.
                </p>
                <ul className="space-y-4 text-base text-gray-400 font-light">
                  <li className="flex gap-3">
                    <Check size={18} className="text-accent-gold" /> Social
                    Media Posts
                  </li>
                  <li className="flex gap-3">
                    <Check size={18} className="text-accent-gold" /> UI / UX
                    Prototyping
                  </li>
                  <li className="flex gap-3">
                    <Check size={18} className="text-accent-gold" /> Marketing
                    Carousels
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="works"
          className="py-40 px-8 md:px-12 bg-rich-black/80 border-t border-white/5"
        >
          <div className="max-w-[1800px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 reveal">
              <div>
                <h2 className="text-5xl md:text-7xl font-serif text-white mb-6">
                  My Recent Works
                </h2>
                <p className="text-xl text-gray-500 font-light">
                  Curated selection from the creative archives.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 mt-10 md:mt-0 text-base max-w-2xl justify-end">
                {(
                  [
                    "All",
                    "Videos",
                    "Logos",
                    "Business Cards",
                    "Social Media Posts",
                    "UI / UX",
                    "YouTube Thumbnails",
                  ] as ProjectCategory[]
                ).map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-5 py-2 border transition-all clickable uppercase text-[10px] tracking-[0.2em] ${
                      filter === category
                        ? "bg-white text-black border-white"
                        : "text-gray-500 border-white/10 hover:border-white hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid -> Masonry Layout */}
            <div className="columns-1 md:columns-2 xl:columns-3 gap-12 space-y-12">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`reveal group cursor-pointer bg-charcoal border border-white/5 hover:border-white/20 transition-all flex flex-col break-inside-avoid shadow-lg w-full inline-block`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <ProjectCardMedia project={project} />

                  <div className="p-8 bg-charcoal z-10 border-t border-white/5">
                    <h3 className="text-2xl font-medium text-white mb-2 group-hover:text-accent-gold transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500 uppercase tracking-wider">
                        {project.category}
                      </p>
                      <ArrowLeft
                        className="rotate-135 text-gray-600 group-hover:text-white transition-colors"
                        size={16}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Contact Section */}
        <footer
          id="contact"
          className="bg-rich-black pt-40 pb-16 border-t border-white/5"
        >
          <div className="max-w-[1800px] mx-auto px-8 md:px-12 grid lg:grid-cols-2 gap-24 items-start reveal">
            <div>
              <h2 className="text-6xl md:text-8xl font-serif text-white mb-12 leading-none">
                Ready to define <br />{" "}
                <span className="text-gray-600 italic">your legacy?</span>
              </h2>
              <p className="text-gray-500 mb-16 max-w-xl text-2xl font-light">
                Accepting new commissions for {new Date().getFullYear()}. Let's
                elevate your visual presence.
              </p>
              <div className="space-y-6">
                <a
                  href="mailto:officialGebregziabher@gmail.com"
                  className="text-3xl md:text-4xl text-white hover:text-accent-gold transition-colors block font-serif"
                >
                  officialGebregziabher@gmail.com
                </a>
              </div>
            </div>

            <div className="bg-charcoal p-12 md:p-16 border border-white/5">
              <form className="space-y-10">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-rich-black border-b border-gray-700 text-white p-4 text-lg focus:border-white focus:outline-none transition-colors"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-rich-black border-b border-gray-700 text-white p-4 text-lg focus:border-white focus:outline-none transition-colors"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-3">
                    Project Details
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-rich-black border-b border-gray-700 text-white p-4 text-lg focus:border-white focus:outline-none transition-colors"
                    placeholder="Tell me about your vision..."
                  ></textarea>
                </div>
                <button className="w-full bg-white text-black py-5 uppercase tracking-widest text-sm font-bold hover:bg-accent-gold transition-colors flex items-center justify-center gap-3">
                  Send Inquiry <MessageSquare size={16} />
                </button>
              </form>
            </div>
          </div>

          <div className="max-w-[1800px] mx-auto px-8 md:px-12 mt-40 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 uppercase tracking-widest">
            <div>© {new Date().getFullYear()} Robel Gebregziabher.</div>
            <div className="flex gap-12 mt-6 md:mt-0">
              <a
                href="https://t.me/eah0011"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Telegram
              </a>
              <a
                href="https://www.tiktok.com/@officialGebregziabher"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                TikTok
              </a>
              <a
                href="https://www.instagram.com/official__Gebregziabher/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a href="#" className="hover:text-white transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DesignerPortfolio;
