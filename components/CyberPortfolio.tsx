import React, { useState, useEffect, useRef } from "react";
import { ViewState, Project, ExperienceItem } from "../types";
import {
  ArrowLeft,
  Terminal,
  Shield,
  Lock,
  Monitor,
  Database,
  Cpu,
  Activity,
  Server,
  Code,
  FileText,
  Wifi,
  Hash,
  Eye,
  Globe,
  Key,
} from "lucide-react";
import ProjectModal from "./ProjectModal";
import { profileImage } from "../data/projects";

interface Props {
  onBack: () => void;
}

const allProjects: Project[] = [
  {
    id: "xss-1",
    title: "XSS Vulnerability Lab",
    category: "Offensive Security",
    description:
      "A dedicated environment for analyzing Cross-Site Scripting vectors.",
    longDescription:
      "A custom-built laboratory environment designed to simulate various Cross-Site Scripting (XSS) scenarios. Used for practicing payload injection, understanding reflected vs stored XSS, and developing mitigation strategies.",
    tags: ["JavaScript", "Penetration Testing", "Web Security", "OWASP"],
    link: "https://github.com/Tefera-12/XSS_Lab.git",
  },
  {
    id: "api-1",
    title: "Multi-Service Dashboard",
    category: "Development",
    description: "Real-time aggregator for Weather, Crypto, and News.",
    longDescription:
      "A comprehensive dashboard application that integrates multiple external APIs. Fetches and visualizes real-time data for weather forecasts, cryptocurrency market trends, and global news headlines in a unified interface.",
    tags: ["API Integration", "React/JS", "Async", "Frontend"],
    link: "https://github.com/Tefera-12/API-Based-App-Weather-Crypto-News-",
  },
  {
    id: "auth-1",
    title: "Secure Auth System",
    category: "Architecture",
    description: "Robust login and session management implementation.",
    longDescription:
      "A secure authentication framework handling user registration, login, and session management. Implements best practices for password hashing, token management, and protection against common auth-based attacks.",
    tags: ["Auth", "Cryptography", "Backend", "Security"],
    link: "https://github.com/Tefera-12/Authentication-System",
  },
  {
    id: "dev-1",
    title: "Content Idea Generator",
    category: "Development",
    description: "Automated tool for content brainstorming and organization.",
    longDescription:
      "A productivity tool designed to generate and organize creative content ideas. Streamlines the content creation workflow by providing structured prompts and categories.",
    tags: ["Automation", "Productivity", "Scripting"],
    link: "https://github.com/Tefera-12/Content-Idea-Generator",
  },
  {
    id: "fin-1",
    title: "Expense Tracker v1",
    category: "Development",
    description: "Personal finance and budget management utility.",
    longDescription:
      "An intuitive application for tracking daily expenses and managing personal budgets. Features transaction logging, category filtering, and summary views to monitor financial health.",
    tags: ["Finance", "CRUD", "State Management"],
    link: "https://github.com/Tefera-12/Expense_Tracker_v1",
  },
  {
    id: "task-1",
    title: "Daily Task Tracker",
    category: "Development",
    description: "Workflow optimization and task scheduling app.",
    longDescription:
      "A clean and efficient task management application. Allows users to create, update, and track daily tasks to improve productivity and maintain organized workflows.",
    tags: ["Productivity", "React", "UI/UX"],
    link: "https://github.com/Tefera-12/Daily_Task_Tracker_v1",
  },
];

const experience: ExperienceItem[] = [
  {
    id: "1",
    role: "Senior Security Architect",
    company: "Global Defense Systems",
    duration: "2023 - PRESENT",
    description:
      "Leading the offensive security division. Architecting zero-trust infrastructure for financial clients and conducting high-level red team engagements.",
    tools: ["Architecture", "Threat Modeling", "Leadership"],
  },
  {
    id: "2",
    role: "DevSecOps Engineer",
    company: "FinTech Corp",
    duration: "2021 - 2023",
    description:
      "Implemented automated security pipelines. Hardened cloud infrastructure (AWS/Azure) and managed incident response protocols.",
    tools: ["AWS", "Terraform", "CI/CD", "Docker"],
  },
];

// --- BACKGROUND CODE COMPONENT ---
const CodeBackground = () => {
  const [lines, setLines] = useState<string[]>([]);
  const codeSnippets = [
    "struct Payload { id: u64, data: Vec<u8> }",
    "impl Encrypt for Payload {",
    "  fn encrypt(&self, key: &Key) -> Result<Vec<u8>> {",
    "    let cipher = Aes256Gcm::new(key);",
    "    cipher.encrypt(&self.nonce, self.data.as_ref())",
    "  }",
    "}",
    "// Initializing handshake protocol...",
    "const CONNECTION_TIMEOUT = 5000;",
    "await database.connect({ ssl: true });",
    "export class SecurityContext {",
    "  private _token: string;",
    "  constructor(token: string) {",
    "    this.validate(token);",
    "  }",
    "}",
    "systemctl start firewalld",
    "iptables -A INPUT -p tcp --dport 443 -j ACCEPT",
    "// Scanning for open ports...",
    "nmap -sS -p- 192.168.1.1",
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setLines((prev) => {
        const newLines = [...prev, codeSnippets[index % codeSnippets.length]];
        if (newLines.length > 30) newLines.shift();
        return newLines;
      });
      index++;
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-0 right-0 w-full md:w-1/2 h-full overflow-hidden pointer-events-none opacity-5 font-mono text-xs text-neon-cyan z-0">
      <div className="p-8 md:p-12 flex flex-col justify-center h-full">
        {lines.map((line, i) => (
          <div
            key={i}
            className="whitespace-pre-wrap mb-1 font-light tracking-wide"
          >
            <span className="text-gray-700 mr-4 select-none">
              {(i + 1).toString().padStart(3, "0")}
            </span>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

const CyberPortfolio: React.FC<Props> = ({ onBack }) => {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const filteredProjects =
    filter === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === filter);

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
    <div className="relative min-h-screen bg-[#020202] font-mono text-gray-400 selection:bg-neon-cyan selection:text-black animate-fade-in overflow-x-hidden">
      {/* --- SCROLL PROGRESS RAIL (SEPARATED) --- */}
      <div className="fixed left-12 top-0 bottom-0 w-[2px] bg-gray-900 z-[60] hidden lg:flex flex-col items-center">
        {/* Hash Marks Background */}
        <div className="absolute top-0 bottom-0 left-0 w-full flex flex-col justify-between py-12">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-4 h-[1px] bg-gray-800 -ml-1"></div>
          ))}
        </div>

        {/* Glowing Progress Beam */}
        <div className="relative w-full h-full bg-gray-900 overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full bg-neon-cyan shadow-[0_0_15px_rgba(0,243,255,0.8)] transition-all duration-300 ease-linear"
            style={{ height: `${scrollProgress}%` }}
          >
            {/* Scanner Tip */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-white blur-[1px]"></div>
          </div>
        </div>
      </div>

      {/* --- PROFESSIONAL HUD BACKGROUND --- */}
      <div className="fixed inset-0 z-0 bg-grid-cyan opacity-[0.03] animate-grid-vertical pointer-events-none"></div>
      <div className="fixed inset-0 pointer-events-none z-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,transparent_0%,#000000_100%)]"></div>
      <CodeBackground />
      <div className="fixed inset-0 pointer-events-none z-0 w-full h-screen bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] opacity-10"></div>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="relative z-10 flex flex-col min-h-screen pl-16 lg:pl-24">
        <ProjectModal
          project={selectedProject!}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          theme="cyber"
        />

        {/* --- PROFESSIONAL HEADER --- */}
        <nav className="fixed top-0 w-full z-50 bg-[#020202]/95 backdrop-blur-sm border-b border-white/5 pl-24 transition-all duration-300">
          <div className="max-w-[1800px] mx-auto px-8 md:px-12 py-6 flex justify-between items-center">
            {/* Left: Branding */}
            <div className="flex items-center gap-6">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-neon-cyan transition-colors group"
              >
                <ArrowLeft
                  size={14}
                  className="group-hover:-translate-x-1 transition-transform text-neon-cyan"
                />
                // SYSTEM_EXIT
              </button>
              <div className="h-4 w-[1px] bg-gray-800"></div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-neon-cyan rounded-none animate-pulse"></div>
                <span className="font-bold text-gray-200 tracking-tight text-sm">
                  ALEX<span className="text-gray-600">_</span>DEV
                </span>
              </div>
            </div>

            {/* Right: Telemetry */}
            <div className="hidden md:flex items-center gap-8 text-[10px] font-mono tracking-widest text-gray-600">
              <span className="flex items-center gap-2">
                <Globe size={12} className="text-gray-500" /> US_EAST_1
              </span>
              <span className="flex items-center gap-2">
                <Activity size={12} className="text-neon-cyan" /> SYS_OPTIMAL
              </span>
              <span className="border border-gray-800 px-3 py-1 text-neon-cyan">
                V.2.4.0
              </span>
            </div>
          </div>
        </nav>

        {/* --- HERO SECTION: SPACIOUS SPLIT LAYOUT --- */}
        <section className="min-h-screen flex items-center pt-20 px-8 md:px-12">
          <div className="max-w-[1800px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            {/* Left Column: Typography */}
            <div className="order-2 lg:order-1 reveal">
              <div className="flex items-center gap-3 mb-8">
                <div className="px-3 py-1 bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan text-[10px] tracking-widest uppercase font-bold">
                  Available for Contract
                </div>
                <div className="h-[1px] w-12 bg-gray-800"></div>
              </div>

              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-12 tracking-tighter leading-[0.9]">
                FULL STACK
                <br />
                <span className="text-gray-600">ENGINEER</span> &<br />
                SECURITY <span className="text-neon-cyan">ARCHITECT</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-mono max-w-2xl mb-12 border-l-2 border-neon-cyan/50 pl-8">
                Building resilient digital infrastructure. Specializing in
                offensive security, cryptographic implementation, and
                high-performance backend systems.
              </p>

              <div className="flex flex-wrap gap-8">
                <button
                  onClick={() =>
                    document
                      .getElementById("works")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="group flex items-center gap-3 px-10 py-5 bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-neon-cyan transition-colors"
                >
                  View Operations{" "}
                  <ArrowLeft className="rotate-[135deg]" size={16} />
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-10 py-5 border border-gray-800 text-gray-400 text-sm font-bold uppercase tracking-widest hover:border-white hover:text-white transition-all"
                >
                  Secure Comms
                </button>
              </div>
            </div>

            {/* Right Column: Profile Image / Tech Visual */}
            <div
              className="order-1 lg:order-2 flex justify-center lg:justify-end reveal relative"
              style={{ transitionDelay: "0.2s" }}
            >
              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 text-gray-800 opacity-20 hidden lg:block">
                <Cpu size={400} strokeWidth={0.5} />
              </div>

              <div className="relative w-full max-w-lg aspect-square">
                {/* Image Container with Cyber Frame */}
                <div className="relative w-full h-full border border-gray-800 bg-gray-900/50 p-3 group">
                  {/* Corner Brackets */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-neon-cyan"></div>
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-neon-cyan"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-neon-cyan"></div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-neon-cyan"></div>

                  {/* Image */}
                  <div className="relative w-full h-full overflow-hidden bg-black">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover filter grayscale contrast-125 hover:contrast-100 hover:grayscale-0 transition-all duration-700 opacity-80 hover:opacity-100"
                    />
                    {/* Scanning Line */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-cyan/50 shadow-[0_0_15px_rgba(0,243,255,0.8)] animate-scanline opacity-50 pointer-events-none"></div>
                    {/* Glitch Overlay */}
                    <div className="absolute inset-0 bg-neon-cyan/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>

                  {/* Data Overlay Labels */}
                  <div className="absolute bottom-6 left-6 text-xs text-neon-cyan tracking-widest font-mono bg-black/80 px-3 py-1 border border-neon-cyan/30">
                    :: IDENTITY_VERIFIED
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- EXPERTISE METRICS --- */}
        <section className="border-y border-white/5 bg-[#030303]">
          <div className="max-w-[1800px] mx-auto px-8 md:px-12 py-20 grid grid-cols-2 lg:grid-cols-4 gap-16">
            {[
              {
                label: "Security Clearance",
                val: "L3_ARCHITECT",
                icon: Shield,
              },
              { label: "Uptime Reliability", val: "99.99%", icon: Server },
              { label: "Vulnerabilities Found", val: "CRITICAL_0", icon: Hash },
              { label: "Encryption Standard", val: "AES_256_GCM", icon: Key },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 border-l border-gray-800 pl-8 reveal group"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <stat.icon
                  size={24}
                  className="text-gray-600 group-hover:text-neon-cyan transition-colors"
                />
                <div>
                  <span className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
                    {stat.label}
                  </span>
                  <span className="block text-2xl font-bold text-white tracking-wider">
                    {stat.val}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- SERVICES / CAPABILITIES --- */}
        <section className="py-40 px-8 md:px-12 relative">
          <div className="max-w-[1800px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 reveal">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Technical Capabilities
                </h2>
                <div className="h-1 w-24 bg-neon-cyan"></div>
              </div>
              <p className="text-gray-500 text-lg max-w-xl mt-8 md:mt-0 font-mono text-right border-r border-neon-cyan pr-6">
                // Deploying secure, scalable solutions.
                <br />
                // Identifying critical infrastructure weaknesses.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 reveal-group">
              {/* Capability 1 */}
              <div className="reveal group bg-[#080808] border border-gray-800 hover:border-neon-cyan/50 p-16 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-16 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-700">
                  <Lock size={250} />
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
                    <span className="text-neon-cyan">01.</span> OFFENSIVE
                    SECURITY
                  </h3>
                  <p className="text-lg text-gray-400 mb-12 leading-relaxed max-w-md">
                    Advanced penetration testing simulating real-world
                    adversaries. I analyze network protocols, web applications,
                    and cloud configurations to find the breaking point before
                    others do.
                  </p>
                  <ul className="grid grid-cols-2 gap-6 text-sm text-gray-500 font-mono">
                    <li className="flex items-center gap-3 border-l border-gray-800 pl-4">
                      Red Teaming
                    </li>
                    <li className="flex items-center gap-3 border-l border-gray-800 pl-4">
                      Social Engineering
                    </li>
                    <li className="flex items-center gap-3 border-l border-gray-800 pl-4">
                      Binary Exploitation
                    </li>
                    <li className="flex items-center gap-3 border-l border-gray-800 pl-4">
                      Cloud Audits
                    </li>
                  </ul>
                </div>
              </div>

              {/* Capability 2 */}
              <div
                className="reveal group bg-[#080808] border border-gray-800 hover:border-neon-cyan/50 p-16 transition-all duration-500 relative overflow-hidden"
                style={{ transitionDelay: "0.2s" }}
              >
                <div className="absolute top-0 right-0 p-16 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-700">
                  <Database size={250} />
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
                    <span className="text-neon-cyan">02.</span> SECURE
                    ARCHITECTURE
                  </h3>
                  <p className="text-lg text-gray-400 mb-12 leading-relaxed max-w-md">
                    Building systems that are secure by design. From
                    Zero-Knowledge Proof authentication flows to hardened
                    microservices architecture.
                  </p>
                  <ul className="grid grid-cols-2 gap-6 text-sm text-gray-500 font-mono">
                    <li className="flex items-center gap-3 border-l border-gray-800 pl-4">
                      Cryptography
                    </li>
                    <li className="flex items-center gap-3 border-l border-gray-800 pl-4">
                      Microservices
                    </li>
                    <li className="flex items-center gap-3 border-l border-gray-800 pl-4">
                      API Design
                    </li>
                    <li className="flex items-center gap-3 border-l border-gray-800 pl-4">
                      DevSecOps
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- EXPERIENCE TIMELINE --- */}
        <section className="py-40 px-8 md:px-12 bg-[#050505] border-t border-white/5">
          <div className="max-w-[1800px] mx-auto grid lg:grid-cols-3 gap-24">
            <div className="lg:col-span-1 reveal">
              <h2 className="text-4xl font-bold text-white mb-8">
                Mission Log
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-12">
                A chronological record of professional engagements and
                high-impact roles in the security and engineering sector.
              </p>
              <button className="text-neon-cyan text-sm uppercase tracking-widest hover:text-white transition-colors flex items-center gap-3">
                Download Full Resume{" "}
                <ArrowLeft className="rotate-[-135deg]" size={16} />
              </button>
            </div>

            <div
              className="lg:col-span-2 space-y-16 reveal"
              style={{ transitionDelay: "0.2s" }}
            >
              {experience.map((job, index) => (
                <div
                  key={job.id}
                  className="relative pl-12 border-l border-gray-800 hover:border-neon-cyan transition-colors group"
                >
                  <div className="absolute -left-[7px] top-2 w-3.5 h-3.5 bg-black border border-gray-600 group-hover:border-neon-cyan group-hover:bg-neon-cyan transition-colors"></div>

                  <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-6">
                    <h3 className="text-3xl text-white font-bold">
                      {job.role}
                    </h3>
                    <span className="text-sm font-mono text-gray-500 mt-2 md:mt-0 border border-gray-800 px-3 py-1">
                      {job.duration}
                    </span>
                  </div>

                  <div className="text-lg text-neon-cyan uppercase tracking-wider mb-6 font-bold">
                    {job.company}
                  </div>
                  <p className="text-lg text-gray-400 leading-relaxed max-w-4xl mb-8">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {job.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-xs uppercase tracking-wider text-gray-500 border border-gray-800 px-4 py-2"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- PROJECTS GRID --- */}
        <section id="works" className="py-40 px-8 md:px-12">
          <div className="max-w-[1800px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 reveal">
              <div>
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
                  Selected Modules
                </h2>
                <div className="h-1 w-24 bg-neon-cyan"></div>
              </div>

              <div className="flex gap-4 mt-10 md:mt-0 overflow-x-auto pb-4 md:pb-0">
                {[
                  "All",
                  "Development",
                  "Offensive Security",
                  "Architecture",
                ].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`text-xs uppercase font-bold px-6 py-3 transition-all whitespace-nowrap border tracking-widest ${
                      filter === cat
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-gray-500 border-gray-800 hover:border-gray-500 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="reveal group cursor-pointer relative bg-[#080808] border border-gray-800 hover:border-neon-cyan/30 transition-all duration-300"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Technical Overlay Lines */}
                  <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-gray-600 group-hover:border-neon-cyan transition-colors z-20"></div>
                  <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-gray-600 group-hover:border-neon-cyan transition-colors z-20"></div>
                  <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-gray-600 group-hover:border-neon-cyan transition-colors z-20"></div>
                  <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-gray-600 group-hover:border-neon-cyan transition-colors z-20"></div>

                  {/* --- CUSTOM GRADIENT CARD WITH TYPOGRAPHY --- */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#0a0a0a] border-b border-gray-800 group-hover:border-neon-cyan/20 transition-colors">
                    {/* Dynamic Gradient Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-[#050505] opacity-100`}
                    ></div>

                    {/* Cyber Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

                    {/* Glowing Accent Orb */}
                    <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-neon-cyan/10 blur-[100px] group-hover:bg-neon-cyan/20 transition-all duration-700"></div>

                    {/* Central Typography */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10">
                      <h3 className="text-2xl md:text-3xl font-black text-gray-700 uppercase tracking-tighter text-center group-hover:text-gray-200 transition-colors duration-500 leading-none select-none">
                        {project.title}
                      </h3>
                      <div className="mt-4 flex items-center gap-2">
                        <div className="h-[2px] w-8 bg-neon-cyan/50 group-hover:w-16 transition-all duration-500"></div>
                        <div className="h-[2px] w-[2px] bg-neon-cyan"></div>
                      </div>
                    </div>

                    {/* Glitch Overlay on Hover */}
                    <div className="absolute inset-0 bg-neon-cyan/5 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-300"></div>
                  </div>

                  <div className="p-10">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-gray-200 group-hover:text-neon-cyan transition-colors font-sans tracking-tight">
                        {project.title}
                      </h3>
                      <Code
                        size={20}
                        className="text-gray-700 group-hover:text-neon-cyan"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mb-8 line-clamp-2 leading-relaxed font-mono">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-wider text-gray-400 bg-gray-900/50 px-3 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- PROFESSIONAL CONTACT PANEL --- */}
        <footer
          id="contact"
          className="pt-40 pb-16 px-8 md:px-12 border-t border-white/5 bg-[#020202] relative"
        >
          <div className="max-w-[1800px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-24 reveal items-start">
              {/* Contact Info */}
              <div>
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-12 leading-none">
                  Initiate <br />
                  <span className="text-neon-cyan">Encrypted</span> Channel
                </h2>
                <p className="text-gray-500 text-xl leading-relaxed mb-16 max-w-xl">
                  Available for high-stakes security consulting and full-stack
                  architecture projects. Communications are secured via PGP.
                </p>
                <div className="space-y-8">
                  <div className="flex items-center gap-6 group cursor-pointer">
                    <div className="w-16 h-16 bg-gray-900 flex items-center justify-center border border-gray-800 group-hover:border-neon-cyan transition-colors">
                      <Wifi
                        size={24}
                        className="text-gray-400 group-hover:text-neon-cyan"
                      />
                    </div>
                    <div>
                      <div className="text-xs uppercase text-gray-600 tracking-widest mb-1">
                        Email Uplink
                      </div>
                      <div className="text-white font-mono text-xl">
                        teferaleykun9@gmail.com
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 group cursor-pointer">
                    <div className="w-16 h-16 bg-gray-900 flex items-center justify-center border border-gray-800 group-hover:border-neon-cyan transition-colors">
                      <Key
                        size={24}
                        className="text-gray-400 group-hover:text-neon-cyan"
                      />
                    </div>
                    <div>
                      <div className="text-xs uppercase text-gray-600 tracking-widest mb-1">
                        Public Key
                      </div>
                      <div className="text-white font-mono text-xl">
                        0x4F...9A21
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clean Data Entry Form */}
              <div className="bg-[#050505] border border-gray-800 p-12 md:p-16">
                <div className="text-xs uppercase text-gray-600 tracking-widest mb-10 flex justify-between">
                  <span>// TRANSMISSION_FORM</span>
                  <span className="text-green-500">● ACTIVE</span>
                </div>
                <form className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Identity
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#0a0a0a] border-b border-gray-800 text-white p-4 text-lg focus:border-neon-cyan focus:outline-none transition-colors font-mono"
                      placeholder="NAME / ORG"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Coordinates
                    </label>
                    <input
                      type="email"
                      className="w-full bg-[#0a0a0a] border-b border-gray-800 text-white p-4 text-lg focus:border-neon-cyan focus:outline-none transition-colors font-mono"
                      placeholder="EMAIL_ADDRESS"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Payload
                    </label>
                    <textarea
                      rows={4}
                      className="w-full bg-[#0a0a0a] border-b border-gray-800 text-white p-4 text-lg focus:border-neon-cyan focus:outline-none transition-colors font-mono"
                      placeholder="MESSAGE_CONTENT"
                    ></textarea>
                  </div>
                  <button className="w-full py-6 bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-neon-cyan transition-colors mt-6">
                    Send Transmission
                  </button>
                </form>
              </div>
            </div>

            <div className="mt-40 border-t border-gray-900 pt-10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 uppercase tracking-widest font-mono">
              <p>© {new Date().getFullYear()} ALEX_DEV. SYSTEM_SECURE.</p>
              <div className="flex gap-12 mt-6 md:mt-0">
                <a
                  href="https://t.me/eah0011"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-neon-cyan transition-colors"
                >
                  Telegram
                </a>
                <a
                  href="https://www.tiktok.com/@leykunTeferaTefera"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-neon-cyan transition-colors"
                >
                  TikTok
                </a>
                <a
                  href="https://www.instagram.com/leykunTefera__Tefera/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-neon-cyan transition-colors"
                >
                  Instagram
                </a>
                <a href="#" className="hover:text-neon-cyan transition-colors">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CyberPortfolio;
