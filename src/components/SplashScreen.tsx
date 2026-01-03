import { useState, useEffect } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setFadeOut(true), 300);
          setTimeout(() => onComplete(), 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-royal-red-dark via-background to-royal-red-dark transition-opacity duration-700 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        
        {/* Floating Elements */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-gold/20 animate-float"
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${10 + Math.random() * 80}%`,
              fontSize: `${20 + Math.random() * 30}px`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            {i % 2 === 0 ? "✿" : "❀"}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Mandala/Logo Animation */}
        <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto mb-8">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-gold/30 rounded-full animate-spin-slow" />
          <div className="absolute inset-2 border-2 border-gold/50 rounded-full animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "15s" }} />
          <div className="absolute inset-4 border border-gold/40 rounded-full animate-spin-slow" style={{ animationDuration: "25s" }} />
          
          {/* Inner Design */}
          <div className="absolute inset-6 flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Center Om/Swastik Symbol */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center shadow-lg animate-gold-pulse">
                  <span className="text-3xl md:text-4xl text-royal-red-dark">॥</span>
                </div>
              </div>
              
              {/* Decorative Dots */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-gold rounded-full animate-glow"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${i * 45}deg) translateY(-40px)`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="mb-2">
          <p className="text-gold font-display text-xs md:text-sm tracking-[0.4em] uppercase mb-2 animate-fade-in">
            Wedding Invitation
          </p>
        </div>
        
        <h1 className="font-script text-5xl md:text-7xl text-cream mb-4 animate-fade-in drop-shadow-lg" style={{ animationDelay: "0.2s" }}>
          Pratibha & Saket
        </h1>
        
        <p className="text-gold/80 font-display text-sm tracking-widest mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          May 12, 2025
        </p>

        {/* Progress Bar */}
        <div className="w-64 md:w-80 mx-auto">
          <div className="h-1 bg-gold/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold via-gold-light to-gold rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-gold/60 font-display text-xs mt-3 tracking-wider">
            Loading {progress}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
