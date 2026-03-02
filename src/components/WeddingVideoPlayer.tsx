import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipBack, SkipForward } from "lucide-react";

const WeddingVideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // YouTube video URL - using embed URL for direct playback
  // Since we can't get direct mp4 from YouTube, we'll use an iframe approach
  // but styled as a custom player
  const youtubeVideoId = "f7uotPYXaMI";

  const [useIframe, setUseIframe] = useState(false);

  const handlePlay = () => {
    setShowOverlay(false);
    setUseIframe(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (!showOverlay) setShowControls(false);
    }, 3000);
  }, [showOverlay]);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-3d transform-3d hover:shadow-3d-hover transition-all duration-500"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => !showOverlay && setShowControls(false)}
    >
      {/* 3D Frame */}
      <div className="absolute -inset-1 bg-gradient-to-r from-gold via-gold-light to-gold rounded-xl md:rounded-2xl opacity-75 blur-sm" />
      <div className="absolute inset-0 bg-gradient-to-br from-royal-red-dark via-background to-royal-red-dark rounded-xl md:rounded-2xl" />
      
      {/* Inner Container */}
      <div className="relative z-10 overflow-hidden rounded-xl md:rounded-2xl border-2 border-gold/60">
        {/* Corner Decorations */}
        <div className="absolute top-2 left-2 text-gold text-base md:text-xl z-40 pointer-events-none drop-shadow-gold animate-twinkle">✿</div>
        <div className="absolute top-2 right-2 text-gold text-base md:text-xl z-40 pointer-events-none drop-shadow-gold animate-twinkle" style={{ animationDelay: "0.5s" }}>✿</div>
        <div className="absolute bottom-2 left-2 text-gold text-base md:text-xl z-40 pointer-events-none drop-shadow-gold animate-twinkle" style={{ animationDelay: "1s" }}>✿</div>
        <div className="absolute bottom-2 right-2 text-gold text-base md:text-xl z-40 pointer-events-none drop-shadow-gold animate-twinkle" style={{ animationDelay: "1.5s" }}>✿</div>

        {/* Video Area */}
        <div className="relative aspect-video bg-black">
          {showOverlay && !useIframe ? (
            /* Custom Thumbnail Overlay */
            <div className="relative w-full h-full cursor-pointer group" onClick={handlePlay}>
              {/* YouTube Thumbnail */}
              <img 
                src={`https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`}
                alt="Wedding Video"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`;
                }}
              />
              
              {/* Cinematic dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
              <div className="absolute inset-0" style={{
                background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)'
              }} />
              
              {/* Custom Play Button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gold/25 rounded-full blur-2xl scale-[2] animate-pulse-soft" />
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gold/90 hover:bg-gold flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 border-2 border-white/20">
                    <Play className="w-7 h-7 md:w-9 md:h-9 text-royal-red-dark ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-script-hindi text-gold text-lg md:text-xl drop-shadow-lg">
                    विपिन & प्रिया
                  </p>
                  <p className="text-white/60 text-xs md:text-sm font-hindi mt-1">
                    ▶ वीडियो चलाएं
                  </p>
                </div>
              </div>

              {/* Bottom gradient bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold/30">
                <div className="h-full w-0 bg-gold rounded-full" />
              </div>
            </div>
          ) : (
            /* Custom Player with YouTube Embed */
            <div className="relative w-full h-full">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1&iv_load_policy=3&color=white`}
                title="Wedding Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                style={{ border: 'none' }}
              />
              
              {/* Custom top bar overlay */}
              <div className={`absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/50 to-transparent pointer-events-none transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex items-center justify-between px-4 py-2">
                  <p className="font-script-hindi text-gold text-sm drop-shadow-lg">विपिन & प्रिया — Wedding Film</p>
                </div>
              </div>

              {/* Fullscreen button overlay */}
              <button 
                onClick={toggleFullscreen}
                className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/60 transition-all duration-300 z-30 ${showControls ? 'opacity-100' : 'opacity-0'}`}
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeddingVideoPlayer;
