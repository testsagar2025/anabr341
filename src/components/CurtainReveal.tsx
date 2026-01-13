import { useState, useEffect, ReactNode } from 'react';

interface CurtainRevealProps {
  guestName: string;
  withFamily: boolean;
  children: ReactNode;
  onRevealComplete: () => void;
}

const CurtainReveal = ({ guestName, withFamily, children, onRevealComplete }: CurtainRevealProps) => {
  const [isRevealing, setIsRevealing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Start reveal animation after 10 seconds of showing invitation
    const timer = setTimeout(() => {
      setIsRevealing(true);
    }, 10000);

    // Complete after curtain animation finishes (10s wait + 2.5s animation)
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      onRevealComplete();
    }, 12500);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onRevealComplete]);

  const displayName = withFamily ? `${guestName} & Family` : guestName;

  if (isComplete) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Beautiful Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center">
        {/* Ambient glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-gold/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-amber-300/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Floating decorative elements */}
        <div className="absolute top-[10%] left-[15%] text-gold/30 text-4xl animate-float">✿</div>
        <div className="absolute top-[20%] right-[20%] text-gold/25 text-3xl animate-float-slow" style={{ animationDelay: '1s' }}>❀</div>
        <div className="absolute bottom-[20%] left-[20%] text-gold/25 text-3xl animate-float" style={{ animationDelay: '2s' }}>✿</div>
        <div className="absolute bottom-[15%] right-[15%] text-gold/30 text-4xl animate-float-slow" style={{ animationDelay: '0.5s' }}>❀</div>
        
        <div className="text-center px-6 max-w-3xl relative z-10">
          {/* Top Decorative Border */}
          <div className="flex items-center justify-center gap-4 mb-10 animate-fade-in">
            <div className="h-px w-20 md:w-32 bg-gradient-to-r from-transparent via-gold to-gold" />
            <div className="flex gap-2">
              <span className="text-gold text-xl animate-twinkle">✦</span>
              <span className="text-gold text-2xl">❧</span>
              <span className="text-gold text-xl animate-twinkle" style={{ animationDelay: '0.5s' }}>✦</span>
            </div>
            <div className="h-px w-20 md:w-32 bg-gradient-to-l from-transparent via-gold to-gold" />
          </div>

          {/* Cordially Invite Text */}
          <p className="font-display text-base md:text-lg text-gold tracking-[0.4em] uppercase mb-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            We Cordially Invite
          </p>

          {/* Guest Name with elegant styling */}
          <div className="relative mb-8 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            {/* Glow behind name */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-32 bg-gradient-radial from-gold/20 to-transparent blur-2xl" />
            </div>
            <h1 className="font-script text-6xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-br from-amber-700 via-amber-600 to-amber-800 drop-shadow-lg relative z-10">
              {displayName}
            </h1>
          </div>

          {/* To Our Wedding */}
          <p className="font-display text-xl md:text-2xl text-amber-800/80 tracking-[0.3em] uppercase mb-10 animate-fade-in" style={{ animationDelay: '1.5s' }}>
            To Our Wedding
          </p>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4 mb-10 animate-fade-in" style={{ animationDelay: '2s' }}>
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
            <span className="text-gold text-2xl">♥</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
          </div>

          {/* Couple Names */}
          <div className="animate-fade-in" style={{ animationDelay: '2.5s' }}>
            <p className="font-script text-4xl md:text-5xl text-gold">
              Vipin & Priya
            </p>
          </div>

          {/* Bottom Decorative */}
          <div className="flex items-center justify-center gap-4 mt-12 animate-fade-in" style={{ animationDelay: '3s' }}>
            <div className="h-px w-20 md:w-32 bg-gradient-to-r from-transparent via-gold to-gold" />
            <div className="flex gap-2">
              <span className="text-gold text-xl animate-twinkle" style={{ animationDelay: '0.3s' }}>✦</span>
              <span className="text-gold text-2xl">❧</span>
              <span className="text-gold text-xl animate-twinkle" style={{ animationDelay: '0.8s' }}>✦</span>
            </div>
            <div className="h-px w-20 md:w-32 bg-gradient-to-l from-transparent via-gold to-gold" />
          </div>

          {/* Date Preview */}
          <p className="font-display text-sm text-amber-700/60 tracking-widest mt-8 animate-fade-in" style={{ animationDelay: '3.5s' }}>
            April 28, 2026
          </p>
        </div>
      </div>

      {/* Left Curtain */}
      <div 
        className={`absolute top-0 left-0 w-1/2 h-full curtain-panel ${isRevealing ? 'curtain-open-left' : ''}`}
        style={{
          transform: isRevealing ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 2.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Main Curtain Fabric - Deep Maroon/Burgundy */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#5c1a1a] via-[#722424] to-[#5c1a1a]" />
        
        {/* Velvet Texture Overlay */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent 3px,
            rgba(0,0,0,0.15) 3px,
            rgba(0,0,0,0.15) 6px
          )`
        }} />
        
        {/* Curtain Folds - Natural draping effect */}
        <div className="absolute inset-y-0 left-[10%] w-8 bg-gradient-to-r from-black/25 via-transparent to-black/15" />
        <div className="absolute inset-y-0 left-[25%] w-6 bg-gradient-to-r from-black/20 via-transparent to-black/10" />
        <div className="absolute inset-y-0 left-[40%] w-8 bg-gradient-to-r from-black/25 via-transparent to-black/15" />
        <div className="absolute inset-y-0 left-[55%] w-6 bg-gradient-to-r from-black/20 via-transparent to-black/10" />
        <div className="absolute inset-y-0 left-[70%] w-8 bg-gradient-to-r from-black/25 via-transparent to-black/15" />
        <div className="absolute inset-y-0 left-[85%] w-6 bg-gradient-to-r from-black/20 via-transparent to-black/10" />
        
        {/* Light reflection on folds */}
        <div className="absolute inset-y-0 left-[12%] w-2 bg-gradient-to-r from-white/5 to-transparent" />
        <div className="absolute inset-y-0 left-[42%] w-2 bg-gradient-to-r from-white/5 to-transparent" />
        <div className="absolute inset-y-0 left-[72%] w-2 bg-gradient-to-r from-white/5 to-transparent" />
        
        {/* Inner edge shadow */}
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black/40 to-transparent" />
        
        {/* Gold Trim at top - Valance */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#4a3520] via-[#8b6914] to-[#4a3520]">
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-gold/60 to-transparent" />
          {/* Tassel effect */}
          <div className="absolute bottom-0 left-1/4 w-1 h-8 bg-gradient-to-b from-gold to-gold/40" />
          <div className="absolute bottom-0 left-1/2 w-1 h-8 bg-gradient-to-b from-gold to-gold/40" />
          <div className="absolute bottom-0 left-3/4 w-1 h-8 bg-gradient-to-b from-gold to-gold/40" />
        </div>
        
        {/* Gold Inner Edge Trim */}
        <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-gold/70 via-gold/50 to-transparent" />
        
        {/* Decorative Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L55 30L30 55L5 30z' fill='none' stroke='%23d4a853' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='8' fill='none' stroke='%23d4a853' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Right Curtain */}
      <div 
        className={`absolute top-0 right-0 w-1/2 h-full curtain-panel ${isRevealing ? 'curtain-open-right' : ''}`}
        style={{
          transform: isRevealing ? 'translateX(100%)' : 'translateX(0)',
          transition: 'transform 2.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Main Curtain Fabric - Deep Maroon/Burgundy */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#5c1a1a] via-[#722424] to-[#5c1a1a]" />
        
        {/* Velvet Texture Overlay */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent 3px,
            rgba(0,0,0,0.15) 3px,
            rgba(0,0,0,0.15) 6px
          )`
        }} />
        
        {/* Curtain Folds - Natural draping effect */}
        <div className="absolute inset-y-0 right-[10%] w-8 bg-gradient-to-l from-black/25 via-transparent to-black/15" />
        <div className="absolute inset-y-0 right-[25%] w-6 bg-gradient-to-l from-black/20 via-transparent to-black/10" />
        <div className="absolute inset-y-0 right-[40%] w-8 bg-gradient-to-l from-black/25 via-transparent to-black/15" />
        <div className="absolute inset-y-0 right-[55%] w-6 bg-gradient-to-l from-black/20 via-transparent to-black/10" />
        <div className="absolute inset-y-0 right-[70%] w-8 bg-gradient-to-l from-black/25 via-transparent to-black/15" />
        <div className="absolute inset-y-0 right-[85%] w-6 bg-gradient-to-l from-black/20 via-transparent to-black/10" />
        
        {/* Light reflection on folds */}
        <div className="absolute inset-y-0 right-[12%] w-2 bg-gradient-to-l from-white/5 to-transparent" />
        <div className="absolute inset-y-0 right-[42%] w-2 bg-gradient-to-l from-white/5 to-transparent" />
        <div className="absolute inset-y-0 right-[72%] w-2 bg-gradient-to-l from-white/5 to-transparent" />
        
        {/* Inner edge shadow */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black/40 to-transparent" />
        
        {/* Gold Trim at top - Valance */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#4a3520] via-[#8b6914] to-[#4a3520]">
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-gold/60 to-transparent" />
          {/* Tassel effect */}
          <div className="absolute bottom-0 right-1/4 w-1 h-8 bg-gradient-to-b from-gold to-gold/40" />
          <div className="absolute bottom-0 right-1/2 w-1 h-8 bg-gradient-to-b from-gold to-gold/40" />
          <div className="absolute bottom-0 right-3/4 w-1 h-8 bg-gradient-to-b from-gold to-gold/40" />
        </div>
        
        {/* Gold Inner Edge Trim */}
        <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-gold/70 via-gold/50 to-transparent" />
        
        {/* Decorative Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L55 30L30 55L5 30z' fill='none' stroke='%23d4a853' stroke-width='1'/%3E%3Ccircle cx='30' cy='30' r='8' fill='none' stroke='%23d4a853' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Center Seam where curtains meet */}
      {!isRevealing && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-full z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-gold/40 to-black/30" />
        </div>
      )}
    </div>
  );
};

export default CurtainReveal;
