import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from "lucide-react";

// Declare YouTube IFrame API types
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
      // Auto landscape hint via CSS is handled below
    };
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
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
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  // Double-tap / double-click for fullscreen
  const handleDoubleTap = useCallback(() => {
    toggleFullscreen();
  }, [toggleFullscreen]);

  const handleVideoAreaClick = (e: React.MouseEvent) => {
    const now = Date.now();
    if (now - lastTapRef.current < 350) {
      handleDoubleTap();
      lastTapRef.current = 0;
      return;
    }
    lastTapRef.current = now;
    // Single tap: toggle play/pause
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
      className={`relative rounded-xl md:rounded-2xl overflow-hidden shadow-3d transform-3d hover:shadow-3d-hover transition-all duration-500 ${isFullscreen ? "!rounded-none" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      style={isFullscreen ? { width: "100vw", height: "100vh" } : {}}
    >
      {/* 3D Frame */}
      {!isFullscreen && (
        <>
          <div className="absolute -inset-1 bg-gradient-to-r from-gold via-gold-light to-gold rounded-xl md:rounded-2xl opacity-75 blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-br from-royal-red-dark via-background to-royal-red-dark rounded-xl md:rounded-2xl" />
        </>
      )}

      {/* Inner Container */}
      <div className={`relative z-10 overflow-hidden ${isFullscreen ? "w-full h-full" : "rounded-xl md:rounded-2xl border-2 border-gold/60"}`}>
        {/* Corner Decorations */}
        <div className="absolute top-2 left-2 text-gold text-sm md:text-base z-40 pointer-events-none drop-shadow-gold animate-twinkle">✿</div>
        <div className="absolute top-2 right-2 text-gold text-sm md:text-base z-40 pointer-events-none drop-shadow-gold animate-twinkle" style={{ animationDelay: "0.5s" }}>✿</div>
        <div className="absolute bottom-12 left-2 text-gold text-sm md:text-base z-40 pointer-events-none drop-shadow-gold animate-twinkle" style={{ animationDelay: "1s" }}>✿</div>
        <div className="absolute bottom-12 right-2 text-gold text-sm md:text-base z-40 pointer-events-none drop-shadow-gold animate-twinkle" style={{ animationDelay: "1.5s" }}>✿</div>

        {/* Video Area */}
        <div className={`relative bg-[hsl(345,65%,15%)] ${isFullscreen ? "w-full h-full" : "aspect-video"}`}>

          {/* Pre-play overlay */}
          {!started && (
            <div
              className="absolute inset-0 z-30 flex flex-col items-center justify-center cursor-pointer group"
              onClick={handlePlay}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 bg-[hsl(345,65%,15%)]" />
              <div className="absolute inset-0 opacity-[0.07]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4af37' fill-opacity='1'%3E%3Cpath d='M20 0L40 20L20 40L0 20z' fill='none' stroke='%23d4af37' stroke-width='0.5'/%3E%3C/g%3E%3C/svg%3E")`,
              }} />
              {/* Subtle corner ornaments */}
              <div className="absolute top-4 left-4 md:top-6 md:left-6 text-gold/40 text-lg md:text-xl">❧</div>
              <div className="absolute top-4 right-4 md:top-6 md:right-6 text-gold/40 text-lg md:text-xl scale-x-[-1]">❧</div>
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-gold/40 text-lg md:text-xl scale-y-[-1]">❧</div>
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 text-gold/40 text-lg md:text-xl scale-[-1]">❧</div>

              {/* Inner frame lines */}
              <div className="absolute top-8 left-8 right-8 bottom-8 md:top-12 md:left-12 md:right-12 md:bottom-12 border border-gold/15 rounded-lg pointer-events-none" />

              {/* Content */}
              <div className="relative text-center z-10">
                <p className="text-gold/70 text-[10px] md:text-xs tracking-[0.35em] uppercase font-display mb-2 md:mb-3">
                  ✦ Wedding Invitation ✦
                </p>
                <h2 className="font-script-hindi text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gold mb-4 md:mb-6 drop-shadow-[0_2px_15px_hsla(45,85%,50%,0.3)]">
                  Vipin & Priya
                </h2>
                <div className="flex items-center justify-center gap-2 md:gap-3 mb-6 md:mb-8">
                  <div className="h-px w-8 md:w-14 bg-gradient-to-r from-transparent to-gold/50" />
                  <span className="text-gold text-xs md:text-sm">✦</span>
                  <div className="h-px w-8 md:w-14 bg-gradient-to-l from-transparent to-gold/50" />
                </div>

                {/* Play button */}
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gold/20 rounded-full blur-2xl scale-[2] animate-pulse-soft" />
                  <div className="relative w-14 h-14 md:w-[72px] md:h-[72px] rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-[0_0_30px_hsla(45,85%,50%,0.3)] group-hover:scale-110 transition-transform duration-300 border-2 border-gold-light/50">
                    <Play className="w-6 h-6 md:w-8 md:h-8 text-royal-red-dark ml-0.5" fill="currentColor" />
                  </div>
                </div>
                <p className="text-gold/50 text-[10px] md:text-xs tracking-[0.25em] uppercase mt-3 md:mt-4 font-display">
                  Click to Play
                </p>
              </div>
            </div>
          )}

          {/* YouTube Player (hidden until started) */}
          <div
            className={`w-full h-full ${!started ? "invisible absolute" : ""}`}
            onClick={handleVideoAreaClick}
          >
            <div ref={playerDivRef} className="w-full h-full" />
          </div>

          {/* Pause overlay */}
          {started && !isPlaying && showControls && (
            <div
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer"
              onClick={handleVideoAreaClick}
            >
              <div className="text-gold/60 text-[10px] md:text-xs tracking-[0.3em] uppercase font-display mb-2 bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                ॥ Paused ॥
              </div>
              <p className="text-gold/50 text-[10px] md:text-xs tracking-[0.2em] uppercase font-display mb-3">
                Wedding Invitation
              </p>
              <h3 className="font-script-hindi text-2xl md:text-4xl text-gold mb-4 drop-shadow-lg">
                Vipin & Priya
              </h3>
              <div className="relative">
                <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl scale-[1.8] animate-pulse-soft" />
                <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-xl border-2 border-gold-light/40">
                  <Play className="w-6 h-6 md:w-7 md:h-7 text-royal-red-dark ml-0.5" fill="currentColor" />
                </div>
              </div>
              <p className="text-gold/40 text-[10px] md:text-xs tracking-[0.2em] uppercase mt-3 font-display">
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
            <div className={`absolute bottom-0 left-0 right-0 z-30 transition-all duration-300 ${showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
              {/* Progress Bar */}
              <div
                className="relative w-full h-1.5 md:h-2 cursor-pointer group/progress px-0"
                onClick={handleProgressClick}
              >
                <div className="absolute inset-0 bg-white/15" />
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold to-gold-light rounded-r-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
                {/* Scrubber dot */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 md:w-3.5 md:h-3.5 bg-gold rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity duration-200 -ml-1.5"
                  style={{ left: `${progress}%` }}
                />
              </div>

              {/* Time labels above bar */}
              <div className="absolute -top-5 left-2 right-2 flex justify-between pointer-events-none">
                <span className="text-white/50 text-[9px] md:text-[10px] font-mono">{formatTime(currentTime)}</span>
                <span className="text-white/50 text-[9px] md:text-[10px] font-mono">{formatTime(duration)}</span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 bg-gradient-to-t from-black/70 via-black/50 to-transparent">
                {/* Play/Pause */}
                <button
                  onClick={(e) => { e.stopPropagation(); handlePlay(); }}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gold flex items-center justify-center hover:bg-gold-light transition-colors shadow-lg flex-shrink-0"
                >
                  {isPlaying
                    ? <Pause className="w-4 h-4 md:w-5 md:h-5 text-royal-red-dark" fill="currentColor" />
                    : <Play className="w-4 h-4 md:w-5 md:h-5 text-royal-red-dark ml-0.5" fill="currentColor" />
                  }
                </button>

                {/* Skip Back */}
                <button
                  onClick={(e) => { e.stopPropagation(); skip(-10); }}
                  className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors flex-shrink-0"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                {/* Skip Forward */}
                <button
                  onClick={(e) => { e.stopPropagation(); skip(10); }}
                  className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors flex-shrink-0"
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                {/* Volume */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                  className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors flex-shrink-0"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                {/* Time display */}
                <span className="text-white/60 text-[10px] md:text-xs font-mono ml-1 whitespace-nowrap">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Fullscreen */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                  className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors flex-shrink-0"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CSS for fullscreen landscape on mobile */}
      <style>{`
        @media (max-width: 768px) {
          div:fullscreen {
            width: 100vw !important;
            height: 100vh !important;
          }
          div:-webkit-full-screen {
            width: 100vw !important;
            height: 100vh !important;
          }
        }
        div:fullscreen iframe,
        div:-webkit-full-screen iframe {
          width: 100% !important;
          height: 100% !important;
        }
        @media screen and (orientation: portrait) {
          div:fullscreen {
            transform: rotate(90deg);
            transform-origin: center center;
            width: 100vh !important;
            height: 100vw !important;
          }
        }
      `}</style>
    </div>
  );
};

export default WeddingVideoPlayer;
