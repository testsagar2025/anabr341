import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Sparkles } from "lucide-react";
import VideoBanner from "./VideoBanner";

const WeddingVideoPlayer = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleBannerPlay = () => {
    setShowBanner(false);
    setShowComingSoon(true);
  };

  return (
    <div
      ref={containerRef}
      className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-3d transform-3d hover:shadow-3d-hover transition-all duration-500"
    >
      {/* 3D Frame Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-gold via-gold-light to-gold rounded-xl md:rounded-2xl opacity-75 blur-sm group-hover:opacity-100 transition-opacity" />
      <div className="absolute inset-0 bg-gradient-to-br from-royal-red-dark via-background to-royal-red-dark rounded-xl md:rounded-2xl" />
      
      {/* Inner Container */}
      <div className="relative z-10 overflow-hidden rounded-xl md:rounded-2xl border-2 border-gold/60">
        {/* Corner 3D Decorations */}
        <div className="absolute top-2 left-2 md:top-3 md:left-3 text-gold text-base md:text-xl z-30 pointer-events-none drop-shadow-gold animate-twinkle">✿</div>
        <div className="absolute top-2 right-2 md:top-3 md:right-3 text-gold text-base md:text-xl z-30 pointer-events-none drop-shadow-gold animate-twinkle" style={{ animationDelay: "0.5s" }}>✿</div>
        <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 text-gold text-base md:text-xl z-30 pointer-events-none drop-shadow-gold animate-twinkle" style={{ animationDelay: "1s" }}>✿</div>
        <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 text-gold text-base md:text-xl z-30 pointer-events-none drop-shadow-gold animate-twinkle" style={{ animationDelay: "1.5s" }}>✿</div>

        {/* Video Player Area */}
        <div className="relative bg-gradient-to-br from-royal-red-dark to-background aspect-video">
          
          {/* Banner Overlay */}
          {showBanner && (
            <VideoBanner 
              onPlay={handleBannerPlay}
              coupleName="Vipin & Priya"
              tagline="Wedding Invitation"
            />
          )}

          {/* Coming Soon Overlay */}
          {showComingSoon && (
            <div className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden">
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-royal-red-dark/95 via-royal-red-dark/80 to-royal-red-dark/90" />
              
              {/* Cinematic Vignette */}
              <div className="absolute inset-0" style={{
                background: 'radial-gradient(ellipse at center, transparent 20%, hsl(345 65% 12% / 0.8) 100%)'
              }} />

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.5'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm40 0c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
              </div>

              {/* Floating Floral Elements */}
              <div className="absolute top-6 left-6 text-gold text-4xl animate-float opacity-60" style={{ animationDuration: '4s' }}>✿</div>
              <div className="absolute top-10 right-10 text-gold text-3xl animate-float-slow opacity-50" style={{ animationDelay: '0.5s' }}>❀</div>
              <div className="absolute bottom-24 left-10 text-gold text-3xl animate-float opacity-50" style={{ animationDelay: '1s' }}>✿</div>
              <div className="absolute bottom-28 right-6 text-gold text-4xl animate-float-slow opacity-60" style={{ animationDelay: '1.5s' }}>❀</div>
              <div className="absolute top-1/4 left-1/4 text-gold text-2xl animate-twinkle opacity-40" style={{ animationDelay: '0.8s' }}>✦</div>
              <div className="absolute bottom-1/3 right-1/4 text-gold text-2xl animate-twinkle opacity-40" style={{ animationDelay: '1.2s' }}>✦</div>

              {/* Shimmer Lines */}
              <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent animate-shimmer" />
              <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent animate-shimmer" style={{ animationDelay: '1s' }} />

              {/* Content Container */}
              <div className="relative text-center px-8 py-10">
                {/* Ornate Frame */}
                <div className="absolute -inset-6 border border-gold/30 rounded-lg" />
                <div className="absolute -inset-8 border border-gold/15 rounded-xl" />
                
                {/* Corner Ornaments */}
                <div className="absolute -top-10 -left-10 text-gold text-2xl animate-twinkle" style={{ animationDelay: '0s' }}>❧</div>
                <div className="absolute -top-10 -right-10 text-gold text-2xl transform scale-x-[-1] animate-twinkle" style={{ animationDelay: '0.3s' }}>❧</div>
                <div className="absolute -bottom-10 -left-10 text-gold text-2xl transform scale-y-[-1] animate-twinkle" style={{ animationDelay: '0.6s' }}>❧</div>
                <div className="absolute -bottom-10 -right-10 text-gold text-2xl transform scale-[-1] animate-twinkle" style={{ animationDelay: '0.9s' }}>❧</div>

                {/* Sparkle Icon */}
                <div className="flex items-center justify-center mb-6 animate-fade-in-down">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl animate-pulse" />
                    <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-gold relative z-10 animate-pulse-soft" />
                  </div>
                </div>

                {/* Coming Soon Text */}
                <div className="mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <p className="text-gold/80 font-display text-xs md:text-sm tracking-[0.3em] uppercase mb-3">
                    Wedding Video
                  </p>
                </div>

                {/* Main Title */}
                <h2 className="font-script-hindi text-4xl md:text-5xl lg:text-6xl mb-4 animate-fade-in-scale" style={{ animationDelay: '0.2s' }}>
                  <span className="text-gradient-gold drop-shadow-[0_4px_20px_hsla(45,85%,50%,0.5)]">
                    जल्द आ रहा है
                  </span>
                </h2>

                {/* English Subtitle */}
                <p className="text-cream/70 font-display text-sm md:text-base tracking-widest mb-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  Coming Soon
                </p>

                {/* Decorative Divider */}
                <div className="flex items-center justify-center gap-3 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60" />
                  <span className="text-gold text-lg">✦</span>
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60" />
                </div>

                {/* Subtitle */}
                <p className="text-cream/50 font-hindi text-xs md:text-sm mt-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  हमारी विवाह की खूबसूरत यादें
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeddingVideoPlayer;
