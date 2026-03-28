import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipBack, SkipForward } from "lucide-react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const WeddingVideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [apiReady, setApiReady] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const playerDivRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastTapRef = useRef<number>(0);

  const youtubeVideoId = "f7uotPYXaMI";

  useEffect(() => {
    if (window.YT && window.YT.Player) { setApiReady(true); return; }
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => setApiReady(true);
    return () => { window.onYouTubeIframeAPIReady = () => {}; };
  }, []);

  useEffect(() => {
    if (!apiReady || !started || playerRef.current) return;
    playerRef.current = new window.YT.Player(playerDivRef.current, {
      videoId: youtubeVideoId,
      playerVars: { autoplay: 1, controls: 0, modestbranding: 1, rel: 0, showinfo: 0, iv_load_policy: 3, fs: 0, playsinline: 1, disablekb: 1 },
      events: {
        onReady: (e: any) => { setDuration(e.target.getDuration()); setIsPlaying(true); },
        onStateChange: (e: any) => {
          setIsPlaying(e.data === window.YT.PlayerState.PLAYING);
          if (e.data === window.YT.PlayerState.ENDED) { setIsPlaying(false); setProgress(100); }
        },
      },
    });
  }, [apiReady, started]);

  useEffect(() => {
    if (started && isPlaying) {
      progressIntervalRef.current = setInterval(() => {
        if (playerRef.current?.getCurrentTime && playerRef.current?.getDuration) {
          const ct = playerRef.current.getCurrentTime();
          const d = playerRef.current.getDuration();
          setCurrentTime(ct); setDuration(d);
          setProgress(d > 0 ? (ct / d) * 100 : 0);
        }
      }, 250);
    }
    return () => { if (progressIntervalRef.current) clearInterval(progressIntervalRef.current); };
  }, [started, isPlaying]);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    document.addEventListener("webkitfullscreenchange", handler);
    return () => { document.removeEventListener("fullscreenchange", handler); document.removeEventListener("webkitfullscreenchange", handler); };
  }, []);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`;

  const handlePlay = () => {
    if (!started) { setStarted(true); return; }
    if (playerRef.current?.playVideo && playerRef.current?.pauseVideo) {
      isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo();
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) { playerRef.current.unMute(); setIsMuted(false); }
    else { playerRef.current.mute(); setIsMuted(true); }
  };

  const skip = (delta: number) => {
    if (!playerRef.current?.seekTo) return;
    playerRef.current.seekTo(Math.max(0, Math.min(playerRef.current.getCurrentTime() + delta, duration)), true);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current?.seekTo) return;
    const rect = e.currentTarget.getBoundingClientRect();
    playerRef.current.seekTo(Math.max(0, Math.min((e.clientX - rect.left) / rect.width, 1)) * duration, true);
  };

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    const el = containerRef.current as any;
    if (!document.fullscreenElement) {
      (el.requestFullscreen || el.webkitRequestFullscreen)?.call(el)?.catch?.(() => {});
    } else {
      (document.exitFullscreen || (document as any).webkitExitFullscreen)?.call(document)?.catch?.(() => {});
    }
  }, []);

  const handleVideoAreaClick = (e: React.MouseEvent) => {
    const now = Date.now();
    if (now - lastTapRef.current < 350) { toggleFullscreen(); lastTapRef.current = 0; return; }
    lastTapRef.current = now;
    setTimeout(() => { if (lastTapRef.current !== 0) handlePlay(); }, 360);
  };

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => { if (isPlaying) setShowControls(false); }, 3000);
  }, [isPlaying]);

  return (
    <div
      ref={containerRef}
      className={`wedding-video-player relative overflow-hidden transition-all duration-300 ${
        isFullscreen ? "fixed inset-0 z-[9999] rounded-none bg-black" : "rounded-xl md:rounded-2xl shadow-3d"
      }`}
      onMouseMove={handleMouseMove}
      onTouchStart={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Cinematic frame glow */}
      {!isFullscreen && (
        <>
          <div className="absolute -inset-0.5 md:-inset-1 bg-gradient-to-r from-gold via-gold-light to-gold rounded-xl md:rounded-2xl opacity-60 blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-br from-royal-red-dark via-background to-royal-red-dark rounded-xl md:rounded-2xl" />
        </>
      )}

      <div className={`relative z-10 overflow-hidden ${
        isFullscreen ? "w-full h-full flex items-center justify-center bg-black" : "rounded-xl md:rounded-2xl border border-gold/50"
      }`}>
        {/* Video area - compact on mobile */}
        <div className={`relative bg-black ${isFullscreen ? "w-full h-full" : "aspect-[16/10] sm:aspect-[16/9]"}`}>
          
          {/* Pre-play cinematic overlay */}
          {!started && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center cursor-pointer group" onClick={handlePlay}>
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(345,65%,12%)] via-[hsl(345,65%,15%)] to-[hsl(345,65%,10%)]" />
              
              {/* Animated film grain texture */}
              <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='28' fill='none' stroke='%23d4af37' stroke-width='0.3'/%3E%3Ccircle cx='30' cy='30' r='20' fill='none' stroke='%23d4af37' stroke-width='0.2'/%3E%3C/svg%3E")`,
              }} />

              {/* Decorative side lines */}
              <div className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 h-16 md:h-24 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
              <div className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 h-16 md:h-24 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

              <div className="relative text-center z-10 px-4">
                <p className="text-gold/50 text-[8px] sm:text-[10px] md:text-xs tracking-[0.4em] uppercase font-display mb-1.5 md:mb-2">
                  ✦ Wedding Film ✦
                </p>
                <h2 className="font-script-hindi text-xl sm:text-2xl md:text-4xl lg:text-5xl text-gold mb-2 md:mb-4 drop-shadow-[0_2px_15px_hsla(45,85%,50%,0.25)]">
                  विपिन & प्रिया
                </h2>
                <div className="flex items-center justify-center gap-2 mb-3 md:mb-5">
                  <div className="h-px w-6 md:w-12 bg-gradient-to-r from-transparent to-gold/40" />
                  <span className="text-gold/60 text-[8px] md:text-xs">✦</span>
                  <div className="h-px w-6 md:w-12 bg-gradient-to-l from-transparent to-gold/40" />
                </div>

                {/* Play button with ripple */}
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gold/15 rounded-full blur-2xl scale-[2.5] animate-pulse-soft" />
                  <div className="absolute inset-0 rounded-full border border-gold/20 scale-[1.8] animate-ping opacity-30" style={{ animationDuration: '2s' }} />
                  <div className="relative w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-[0_0_25px_hsla(45,85%,50%,0.25)] group-hover:scale-110 transition-transform duration-300 border border-gold-light/40">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-royal-red-dark ml-0.5" fill="currentColor" />
                  </div>
                </div>
                <p className="text-gold/40 text-[8px] sm:text-[9px] md:text-xs tracking-[0.2em] uppercase mt-2 font-display">
                  Play Film
                </p>
              </div>
            </div>
          )}

          {/* YouTube Player */}
          <div className={`absolute inset-0 ${!started ? "invisible" : ""}`} onClick={handleVideoAreaClick}>
            <div ref={playerDivRef} className="w-full h-full" />
          </div>

          {/* Pause overlay */}
          {started && !isPlaying && showControls && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer" onClick={handleVideoAreaClick}>
              <div className="relative">
                <div className="absolute inset-0 bg-gold/15 rounded-full blur-xl scale-[1.6] animate-pulse-soft" />
                <div className="relative w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-xl border border-gold-light/30">
                  <Play className="w-4 h-4 md:w-5 md:h-5 text-royal-red-dark ml-0.5" fill="currentColor" />
                </div>
              </div>
              <p className="text-gold/40 text-[8px] md:text-xs tracking-[0.15em] uppercase mt-1.5 font-display">Resume</p>
            </div>
          )}

          {/* Click area when playing */}
          {started && isPlaying && (
            <div className="absolute inset-0 z-15 cursor-pointer" onClick={handleVideoAreaClick} />
          )}

          {/* Custom Controls */}
          {started && (
            <div className={`absolute bottom-0 left-0 right-0 z-30 transition-all duration-300 ${showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}>
              {/* Progress bar */}
              <div className="relative w-full h-1 cursor-pointer group/progress" onClick={handleProgressClick}>
                <div className="absolute inset-0 bg-white/15" />
                <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold to-gold-light transition-all duration-100" style={{ width: `${progress}%` }} />
                <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 md:w-3 md:h-3 bg-gold rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity -ml-1" style={{ left: `${progress}%` }} />
              </div>

              {/* Control buttons */}
              <div className="flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 md:px-3 py-1 bg-gradient-to-t from-black/80 to-black/30">
                <button onClick={(e) => { e.stopPropagation(); handlePlay(); }} className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gold/90 flex items-center justify-center hover:bg-gold transition-colors flex-shrink-0">
                  {isPlaying ? <Pause className="w-3 h-3 md:w-3.5 md:h-3.5 text-royal-red-dark" fill="currentColor" /> : <Play className="w-3 h-3 md:w-3.5 md:h-3.5 text-royal-red-dark ml-0.5" fill="currentColor" />}
                </button>
                <button onClick={(e) => { e.stopPropagation(); skip(-10); }} className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex items-center justify-center text-white/60 hover:text-white transition-colors flex-shrink-0">
                  <SkipBack className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); skip(10); }} className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex items-center justify-center text-white/60 hover:text-white transition-colors flex-shrink-0">
                  <SkipForward className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); toggleMute(); }} className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex items-center justify-center text-white/60 hover:text-white transition-colors flex-shrink-0">
                  {isMuted ? <VolumeX className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" /> : <Volume2 className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" />}
                </button>
                <span className="text-white/50 text-[8px] sm:text-[9px] md:text-[11px] font-mono ml-0.5 whitespace-nowrap">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
                <div className="flex-1" />
                <button onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }} className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex items-center justify-center text-white/60 hover:text-white transition-colors flex-shrink-0">
                  {isFullscreen ? <Minimize className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" /> : <Maximize className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .wedding-video-player:fullscreen { width: 100vw !important; height: 100vh !important; }
        .wedding-video-player:-webkit-full-screen { width: 100vw !important; height: 100vh !important; }
        .wedding-video-player:fullscreen iframe,
        .wedding-video-player:-webkit-full-screen iframe { width: 100% !important; height: 100% !important; position: absolute; top: 0; left: 0; }
        @media screen and (max-width: 768px) and (orientation: portrait) {
          .wedding-video-player:fullscreen,
          .wedding-video-player:-webkit-full-screen {
            transform: rotate(90deg); transform-origin: center center;
            width: 100vh !important; height: 100vw !important; position: fixed; top: 0; left: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default WeddingVideoPlayer;
