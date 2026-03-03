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

  // Load YouTube IFrame API
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setApiReady(true);
      return;
    }
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => setApiReady(true);
    return () => { window.onYouTubeIframeAPIReady = () => {}; };
  }, []);

  // Initialize player once API is ready and started
  useEffect(() => {
    if (!apiReady || !started || playerRef.current) return;
    playerRef.current = new window.YT.Player(playerDivRef.current, {
      videoId: youtubeVideoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        fs: 0,
        playsinline: 1,
        disablekb: 1,
      },
      events: {
        onReady: (e: any) => {
          setDuration(e.target.getDuration());
          setIsPlaying(true);
        },
        onStateChange: (e: any) => {
          setIsPlaying(e.data === window.YT.PlayerState.PLAYING);
          if (e.data === window.YT.PlayerState.ENDED) {
            setIsPlaying(false);
            setProgress(100);
          }
        },
      },
    });
  }, [apiReady, started]);

  // Progress tracker
  useEffect(() => {
    if (started && isPlaying) {
      progressIntervalRef.current = setInterval(() => {
        if (playerRef.current?.getCurrentTime && playerRef.current?.getDuration) {
          const ct = playerRef.current.getCurrentTime();
          const d = playerRef.current.getDuration();
          setCurrentTime(ct);
          setDuration(d);
          setProgress(d > 0 ? (ct / d) * 100 : 0);
        }
      }, 250);
    }
    return () => { if (progressIntervalRef.current) clearInterval(progressIntervalRef.current); };
  }, [started, isPlaying]);

  // Fullscreen change listener
  useEffect(() => {
    const handler = () => {
      const fs = !!document.fullscreenElement;
      setIsFullscreen(fs);
    };
    document.addEventListener("fullscreenchange", handler);
    document.addEventListener("webkitfullscreenchange", handler);
    return () => {
      document.removeEventListener("fullscreenchange", handler);
      document.removeEventListener("webkitfullscreenchange", handler);
    };
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const handlePlay = () => {
    if (!started) {
      setStarted(true);
      return;
    }
    if (playerRef.current?.playVideo && playerRef.current?.pauseVideo) {
      if (isPlaying) playerRef.current.pauseVideo();
      else playerRef.current.playVideo();
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) { playerRef.current.unMute(); setIsMuted(false); }
    else { playerRef.current.mute(); setIsMuted(true); }
  };

  const skip = (delta: number) => {
    if (!playerRef.current?.seekTo) return;
    const t = Math.max(0, Math.min(playerRef.current.getCurrentTime() + delta, duration));
    playerRef.current.seekTo(t, true);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current?.seekTo) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min((e.clientX - rect.left) / rect.width, 1));
    playerRef.current.seekTo(pct * duration, true);
  };

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    const el = containerRef.current as any;
    if (!document.fullscreenElement) {
      if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
      else if ((document as any).webkitExitFullscreen) (document as any).webkitExitFullscreen();
    }
  }, []);

  // Double-tap / double-click for fullscreen
  const handleVideoAreaClick = (e: React.MouseEvent) => {
    const now = Date.now();
    if (now - lastTapRef.current < 350) {
      toggleFullscreen();
      lastTapRef.current = 0;
      return;
    }
    lastTapRef.current = now;
    setTimeout(() => {
      if (lastTapRef.current !== 0) handlePlay();
    }, 360);
  };

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  }, [isPlaying]);

  return (
    <div
      ref={containerRef}
      className={`video-player-container relative overflow-hidden transition-all duration-300 ${
        isFullscreen 
          ? "fixed inset-0 z-[9999] rounded-none bg-black" 
          : "rounded-xl md:rounded-2xl shadow-3d"
      }`}
      onMouseMove={handleMouseMove}
      onTouchStart={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* 3D Frame - only when not fullscreen */}
      {!isFullscreen && (
        <>
          <div className="absolute -inset-1 bg-gradient-to-r from-gold via-gold-light to-gold rounded-xl md:rounded-2xl opacity-75 blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-br from-royal-red-dark via-background to-royal-red-dark rounded-xl md:rounded-2xl" />
        </>
      )}

      {/* Inner Container */}
      <div className={`relative z-10 overflow-hidden ${
        isFullscreen 
          ? "w-full h-full flex items-center justify-center bg-black" 
          : "rounded-xl md:rounded-2xl border-2 border-gold/60"
      }`}>
        {/* Video Area - shorter on mobile, proper aspect ratio on desktop */}
        <div className={`relative bg-black ${
          isFullscreen 
            ? "w-full h-full" 
            : "aspect-[16/9] md:aspect-video"
        }`}>
          {/* Pre-play overlay */}
          {!started && (
            <div
              className="absolute inset-0 z-30 flex flex-col items-center justify-center cursor-pointer group"
              onClick={handlePlay}
            >
              <div className="absolute inset-0 bg-[hsl(345,65%,15%)]" />
              <div className="absolute inset-0 opacity-[0.07]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4af37' fill-opacity='1'%3E%3Cpath d='M20 0L40 20L20 40L0 20z' fill='none' stroke='%23d4af37' stroke-width='0.5'/%3E%3C/g%3E%3C/svg%3E")`,
              }} />
              
              {/* Content */}
              <div className="relative text-center z-10">
                <p className="text-gold/70 text-[10px] md:text-xs tracking-[0.35em] uppercase font-display mb-2">
                  ✦ Wedding Film ✦
                </p>
                <h2 className="font-script-hindi text-2xl sm:text-3xl md:text-5xl text-gold mb-3 md:mb-5 drop-shadow-[0_2px_15px_hsla(45,85%,50%,0.3)]">
                  Vipin & Priya
                </h2>
                <div className="flex items-center justify-center gap-2 mb-4 md:mb-6">
                  <div className="h-px w-8 md:w-14 bg-gradient-to-r from-transparent to-gold/50" />
                  <span className="text-gold text-xs">✦</span>
                  <div className="h-px w-8 md:w-14 bg-gradient-to-l from-transparent to-gold/50" />
                </div>

                {/* Play button */}
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gold/20 rounded-full blur-2xl scale-[2] animate-pulse-soft" />
                  <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-[0_0_30px_hsla(45,85%,50%,0.3)] group-hover:scale-110 transition-transform duration-300 border-2 border-gold-light/50">
                    <Play className="w-5 h-5 md:w-7 md:h-7 text-royal-red-dark ml-0.5" fill="currentColor" />
                  </div>
                </div>
                <p className="text-gold/50 text-[9px] md:text-xs tracking-[0.25em] uppercase mt-2 md:mt-3 font-display">
                  Tap to Play
                </p>
              </div>
            </div>
          )}

          {/* YouTube Player */}
          <div
            className={`absolute inset-0 ${!started ? "invisible" : ""}`}
            onClick={handleVideoAreaClick}
          >
            <div ref={playerDivRef} className="w-full h-full" />
          </div>

          {/* Pause overlay */}
          {started && !isPlaying && showControls && (
            <div
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 backdrop-blur-[2px] cursor-pointer"
              onClick={handleVideoAreaClick}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl scale-[1.8] animate-pulse-soft" />
                <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-xl border-2 border-gold-light/40">
                  <Play className="w-5 h-5 md:w-6 md:h-6 text-royal-red-dark ml-0.5" fill="currentColor" />
                </div>
              </div>
              <p className="text-gold/50 text-[9px] md:text-xs tracking-[0.2em] uppercase mt-2 font-display">
                Tap to Resume
              </p>
            </div>
          )}

          {/* Click area for play/pause when playing */}
          {started && isPlaying && (
            <div
              className="absolute inset-0 z-15 cursor-pointer"
              onClick={handleVideoAreaClick}
            />
          )}

          {/* Custom Controls Bar */}
          {started && (
            <div className={`absolute bottom-0 left-0 right-0 z-30 transition-all duration-300 ${showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}`}>
              {/* Progress Bar */}
              <div
                className="relative w-full h-1 md:h-1.5 cursor-pointer group/progress"
                onClick={handleProgressClick}
              >
                <div className="absolute inset-0 bg-white/20" />
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold to-gold-light transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 md:w-3 md:h-3 bg-gold rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity -ml-1"
                  style={{ left: `${progress}%` }}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1 px-2 md:px-3 py-1 md:py-1.5 bg-gradient-to-t from-black/80 to-black/40">
                {/* Play/Pause */}
                <button
                  onClick={(e) => { e.stopPropagation(); handlePlay(); }}
                  className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-gold/90 flex items-center justify-center hover:bg-gold transition-colors flex-shrink-0"
                >
                  {isPlaying
                    ? <Pause className="w-3.5 h-3.5 md:w-4 md:h-4 text-royal-red-dark" fill="currentColor" />
                    : <Play className="w-3.5 h-3.5 md:w-4 md:h-4 text-royal-red-dark ml-0.5" fill="currentColor" />
                  }
                </button>

                {/* Skip Back */}
                <button
                  onClick={(e) => { e.stopPropagation(); skip(-10); }}
                  className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-white/70 hover:text-white transition-colors flex-shrink-0"
                >
                  <SkipBack className="w-3 h-3 md:w-4 md:h-4" />
                </button>

                {/* Skip Forward */}
                <button
                  onClick={(e) => { e.stopPropagation(); skip(10); }}
                  className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-white/70 hover:text-white transition-colors flex-shrink-0"
                >
                  <SkipForward className="w-3 h-3 md:w-4 md:h-4" />
                </button>

                {/* Volume */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                  className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-white/70 hover:text-white transition-colors flex-shrink-0"
                >
                  {isMuted ? <VolumeX className="w-3 h-3 md:w-4 md:h-4" /> : <Volume2 className="w-3 h-3 md:w-4 md:h-4" />}
                </button>

                {/* Time */}
                <span className="text-white/60 text-[9px] md:text-[11px] font-mono ml-0.5 whitespace-nowrap">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>

                <div className="flex-1" />

                {/* Fullscreen */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                  className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-white/70 hover:text-white transition-colors flex-shrink-0"
                >
                  {isFullscreen ? <Minimize className="w-3 h-3 md:w-4 md:h-4" /> : <Maximize className="w-3 h-3 md:w-4 md:h-4" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen landscape CSS for mobile */}
      <style>{`
        .video-player-container:fullscreen {
          width: 100vw !important;
          height: 100vh !important;
        }
        .video-player-container:-webkit-full-screen {
          width: 100vw !important;
          height: 100vh !important;
        }
        .video-player-container:fullscreen iframe,
        .video-player-container:-webkit-full-screen iframe {
          width: 100% !important;
          height: 100% !important;
          position: absolute;
          top: 0;
          left: 0;
        }
        @media screen and (max-width: 768px) and (orientation: portrait) {
          .video-player-container:fullscreen {
            transform: rotate(90deg);
            transform-origin: center center;
            width: 100vh !important;
            height: 100vw !important;
            position: fixed;
            top: 0;
            left: 0;
          }
          .video-player-container:-webkit-full-screen {
            transform: rotate(90deg);
            transform-origin: center center;
            width: 100vh !important;
            height: 100vw !important;
            position: fixed;
            top: 0;
            left: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default WeddingVideoPlayer;
