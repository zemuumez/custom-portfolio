import React, { useEffect, useState, useRef } from "react";

interface Props {
  onComplete: () => void;
}

const LoadingScreen: React.FC<Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const finalText = "WELCOME";

  // Matrix/Decoding Text Effect
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        finalText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return letter;
            }
            // Return random character
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      );

      if (iteration >= finalText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3; // Speed of decoding
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Progress & Exit Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsExiting(true);
          setTimeout(onComplete, 1500); // Extended wait for exit animation
          return 100;
        }
        return prev + 1; // Speed of progress bar
      });
    }, 25);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#020202] flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ease-in-out ${
        isExiting
          ? "opacity-0 scale-105 blur-sm"
          : "opacity-100 scale-100 blur-0"
      }`}
    >
      {/* --- CINEMATIC BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Warp Stars */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-[#050505] to-black"></div>
        <div className="absolute inset-0 bg-grid-white opacity-[0.04] animate-grid-diagonal"></div>

        {/* Horizontal Scanning Line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.2)] animate-scanline"></div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* DECODING TITLE */}
        <div className="relative mb-6">
          <h1 className="text-6xl md:text-9xl font-black tracking-widest relative z-10 mix-blend-screen select-none">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-white/50 animate-pulse">
              {displayText.substring(0, 3)}
            </span>
            <span className="text-white">{displayText.substring(3, 4)}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-neon-cyan to-white/50 animate-pulse">
              {displayText.substring(4, 7)}
            </span>
          </h1>

          {/* Glitch Shadow */}
          <h1 className="absolute top-0 left-0 text-6xl md:text-9xl font-black tracking-widest text-red-500/20 opacity-50 animate-glitch z-0 select-none">
            {displayText}
          </h1>
        </div>

        {/* FULL TITLE SUBTITLE */}
        <div
          className={`transition-opacity duration-1000 delay-500 ${progress > 50 ? "opacity-100" : "opacity-0"}`}
        >
          <h2 className="text-sm md:text-lg font-mono tracking-[0.2em] text-gray-400 uppercase mb-2">
            Robel Gebregziabher
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-xs md:text-sm font-light text-gray-500 tracking-wider">
            <span className="text-accent-gold">Graphic Designer</span>
            <span className="hidden md:inline text-gray-700">//</span>
            <span className="text-neon-cyan">Cybersecurity Programmer</span>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="w-64 md:w-96 h-[1px] bg-gray-900 mt-12 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-gold via-white to-neon-cyan transition-all ease-out duration-100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="mt-4 font-mono text-[10px] text-gray-600">
          LOADING ASSETS... {progress}%
        </div>
      </div>

      {/* --- CORNER DECORATIONS --- */}
      <div className="absolute top-10 left-10 text-xs font-mono text-gray-700 hidden md:block">
        ID: Gebregziabher_SESSION_01
      </div>
      <div className="absolute bottom-10 right-10 text-xs font-mono text-gray-700 hidden md:block">
        V.3.0.0
      </div>
    </div>
  );
};

export default LoadingScreen;
