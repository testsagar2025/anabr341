import { useState, useRef } from "react";
import { Play } from "lucide-react";

const WeddingVideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const youtubeVideoId = "f7uotPYXaMI";
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`;

  const handlePlay = () => {
    setIsPlaying(true);
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
        {/* Corner Decorations */}
        <div className="absolute top-2 left-2 md:top-3 md:left-3 text-gold text-base md:text-xl z-30 pointer-events-none drop-shadow-gold animate-twinkle">✿</div>
        <div className="absolute top-2 right-2 md:top-3 md:right-3 text-gold text-base md:text-xl z-30 pointer-events-none drop-shadow-gold animate-twinkle" style={{ animationDelay: "0.5s" }}>✿</div>
        <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 text-gold text-base md:text-xl z-30 pointer-events-none drop-shadow-gold animate-twinkle" style={{ animationDelay: "1s" }}>✿</div>
        <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 text-gold text-base md:text-xl z-30 pointer-events-none drop-shadow-gold animate-twinkle" style={{ animationDelay: "1.5s" }}>✿</div>

        {/* Video Area */}
        <div className="relative aspect-video bg-black">
          {!isPlaying ? (
            /* Thumbnail with play button */
            <div className="relative w-full h-full cursor-pointer group" onClick={handlePlay}>
              <img 
                src={thumbnailUrl} 
                alt="Wedding Video Thumbnail"
                className="w-full h-full object-cover"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gold/30 rounded-full blur-xl scale-150 animate-pulse-soft" />
                  <div className="relative w-16 h-16 md:w-20 md:h-20 bg-gold/90 hover:bg-gold rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110">
                    <Play className="w-7 h-7 md:w-9 md:h-9 text-royal-red-dark ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <p className="font-script-hindi text-gold text-lg md:text-xl text-center drop-shadow-lg">
                  विपिन & प्रिया — Wedding Film
                </p>
              </div>
            </div>
          ) : (
            /* YouTube iframe */
            <iframe
              src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`}
              title="Wedding Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WeddingVideoPlayer;
