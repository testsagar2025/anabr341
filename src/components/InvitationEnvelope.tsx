import { useState } from 'react';
import { GuestData, eventNameHindi, eventDates } from '@/hooks/useGuestData';
import { useHindiName } from '@/hooks/useHindiName';
import { Loader2 } from 'lucide-react';

interface InvitationEnvelopeProps {
  guestData: GuestData;
  onOpen: () => void;
}

const InvitationEnvelope = ({ guestData, onOpen }: InvitationEnvelopeProps) => {
  const [isOpening, setIsOpening] = useState(false);
  
  // Translate guest name to Hindi using AI
  const { hindiName, loading: nameLoading } = useHindiName(guestData.name);
  
  const displayName = guestData.type === 'family' 
    ? `${hindiName || guestData.name} एवं परिवार` 
    : (hindiName || guestData.name);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 800);
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-700 ${isOpening ? 'opacity-0' : 'opacity-100'}`}
      style={{ 
        background: 'linear-gradient(135deg, #1a0f0a 0%, #2d1810 50%, #1a0f0a 100%)'
      }}
    >
      {/* Ambient lighting effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-gold/20 via-gold/5 to-transparent rounded-full blur-3xl animate-ambient" />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#8B4513]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#8B4513]/20 to-transparent" />
      </div>

      {/* Floating sparkles */}
      <div className="absolute top-[15%] left-[10%] text-gold/30 text-xl animate-twinkle">✦</div>
      <div className="absolute top-[25%] right-[15%] text-gold/25 text-2xl animate-twinkle" style={{ animationDelay: '0.5s' }}>✧</div>
      <div className="absolute bottom-[30%] left-[12%] text-gold/20 text-xl animate-twinkle" style={{ animationDelay: '1s' }}>✦</div>
      <div className="absolute bottom-[20%] right-[10%] text-gold/30 text-2xl animate-twinkle" style={{ animationDelay: '1.5s' }}>✧</div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L55 30L30 55L5 30z' fill='none' stroke='%23d4af37' stroke-width='0.5'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }} />

      {/* Main Card */}
      <div 
        className={`relative max-w-lg w-full mx-6 transition-all duration-700 ${isOpening ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}`}
      >
        {/* Glow effect behind card */}
        <div className="absolute -inset-8 bg-gradient-radial from-gold/20 via-gold/5 to-transparent rounded-3xl blur-2xl" />

        {/* Decorative corners */}
        <div className="absolute -top-4 -left-4 w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-transparent rounded-full" />
          <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-gold to-transparent rounded-full" />
          <div className="absolute top-3 left-3 text-gold/60 text-lg">❧</div>
        </div>
        <div className="absolute -top-4 -right-4 w-16 h-16">
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-gold to-transparent rounded-full" />
          <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-gold to-transparent rounded-full" />
          <div className="absolute top-3 right-3 text-gold/60 text-lg transform scale-x-[-1]">❧</div>
        </div>
        <div className="absolute -bottom-4 -left-4 w-16 h-16">
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-transparent rounded-full" />
          <div className="absolute bottom-0 left-0 h-full w-1 bg-gradient-to-t from-gold to-transparent rounded-full" />
          <div className="absolute bottom-3 left-3 text-gold/60 text-lg transform scale-y-[-1]">❧</div>
        </div>
        <div className="absolute -bottom-4 -right-4 w-16 h-16">
          <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-gold to-transparent rounded-full" />
          <div className="absolute bottom-0 right-0 h-full w-1 bg-gradient-to-t from-gold to-transparent rounded-full" />
          <div className="absolute bottom-3 right-3 text-gold/60 text-lg transform scale-[-1]">❧</div>
        </div>

        {/* Card Content - Marble/Parchment style */}
        <div className="relative scroll-bg rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(212,175,55,0.3)] p-6 sm:p-8 md:p-10 text-center border-2 border-gold/30">
          {/* Inner border */}
          <div className="absolute inset-3 border border-gold/20 rounded-xl pointer-events-none" />
          
          {/* Shubh Vivah Header */}
          <p className="font-script-hindi text-xl sm:text-2xl md:text-3xl text-[#8B4513] mb-3 md:mb-4 animate-fade-in text-shadow-gold">
            शुभ विवाह आमंत्रण
          </p>
          
          <p className="font-hindi text-sm md:text-base text-gold mb-3 md:mb-4 animate-fade-in" style={{ animationDelay: '0.05s' }}>
            ॥ श्री गणेशाय नमः ॥
          </p>

          {/* Decorative Stars */}
          <div className="flex items-center justify-center gap-4 md:gap-5 mb-4 md:mb-5 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="text-gold/70 text-sm md:text-base animate-twinkle">✦</span>
            <span className="text-gold/60 text-xs md:text-sm">✧</span>
            <span className="text-gold/70 text-sm md:text-base animate-twinkle" style={{ animationDelay: '0.3s' }}>✦</span>
          </div>

          {/* Manyavar Text */}
          <p className="font-hindi text-sm sm:text-base text-[#8B4513]/80 mb-3 md:mb-4 animate-fade-in" style={{ animationDelay: '0.15s' }}>
            मान्यवर,
          </p>

          {/* Invitation Text */}
          <div className="mb-3 md:mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="font-hindi text-sm sm:text-base md:text-lg text-[#5a2d1a] leading-relaxed">
              हम सपरिवार सादर आमंत्रित करते हैं
            </p>
          </div>

          {/* Guest Name */}
          {nameLoading ? (
            <div className="flex items-center justify-center gap-2 mb-4 md:mb-5 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Loader2 className="w-5 h-5 md:w-6 md:h-6 text-gold animate-spin" />
              <span className="font-hindi text-sm sm:text-base text-gold/70">नाम अनुवाद हो रहा है...</span>
            </div>
          ) : (
            <h1 
              className="font-script-hindi text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#8B4513] mb-4 md:mb-5 animate-fade-in-up leading-tight px-2"
              style={{ 
                animationDelay: '0.3s',
                textShadow: '0 2px 10px rgba(139, 69, 19, 0.2)'
              }}
            >
              श्री {displayName}
            </h1>
          )}

          {/* Wedding Invitation Text */}
          <div className="mb-4 md:mb-5 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="font-hindi text-sm sm:text-base md:text-lg text-[#5a2d1a] leading-relaxed">
              को हमारे यहाँ आयोजित शुभ विवाह समारोह में।
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-5 md:mb-6 animate-fade-in" style={{ animationDelay: '0.45s' }}>
            <div className="h-px w-10 md:w-16 bg-gradient-to-r from-transparent via-gold/60 to-gold" />
            <span className="text-gold text-lg md:text-xl animate-shimmer-text">❧</span>
            <div className="h-px w-10 md:w-16 bg-gradient-to-l from-transparent via-gold/60 to-gold" />
          </div>

          {/* Events Header */}
          <p className="font-hindi text-sm md:text-base text-[#8B4513]/80 mb-2 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            आप स्नेहपूर्वक निम्नलिखित वैवाहिक
          </p>
          <p className="font-hindi text-sm md:text-base text-[#8B4513]/80 mb-4 md:mb-5 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            कार्यक्रमों में आमंत्रित हैं
          </p>

          {/* Events invited to */}
          {guestData.events && guestData.events.length > 0 && (
            <div className="mb-5 md:mb-6 animate-fade-in" style={{ animationDelay: '0.55s' }}>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
                {[...guestData.events]
                  .sort((a, b) => {
                    const order = ['rasum', 'tilak', 'haldi', 'mehndi', 'shadi'];
                    return order.indexOf(a) - order.indexOf(b);
                  })
                  .map((event) => (
                    <span 
                      key={event}
                      className="inline-flex flex-col items-center px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-br from-gold/15 via-gold/10 to-transparent border border-gold/30 rounded-xl hover:border-gold/50 transition-colors"
                    >
                      <span className="font-hindi text-[#5a2d1a] text-[11px] sm:text-xs font-medium">{eventNameHindi[event] || event} समारोह</span>
                      <span className="font-hindi text-[#8B4513]/60 text-[9px] sm:text-[10px]">{eventDates[event]?.date || ''}</span>
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-5 md:mb-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent via-gold/50 to-gold/40" />
            <span className="text-gold/60 text-base md:text-lg">✦</span>
            <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent via-gold/50 to-gold/40" />
          </div>

          {/* Blessing Text */}
          <p className="font-hindi text-xs sm:text-sm text-[#8B4513]/60 mb-5 md:mb-6 animate-fade-in leading-relaxed" style={{ animationDelay: '0.7s' }}>
            आपका प्रेम, आशीर्वाद एवं समर्थन हमारे परिवार के लिए अत्यंत महत्वपूर्ण है।
          </p>

          {/* Open Card Button */}
          <button
            onClick={handleOpen}
            className="group relative inline-flex items-center gap-2 md:gap-3 px-8 sm:px-10 py-3 sm:py-3.5 bg-gradient-to-r from-[#8B4513] via-[#A0522D] to-[#8B4513] text-white font-hindi text-sm sm:text-base rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_10px_40px_rgba(139,69,19,0.4)] animate-fade-in border border-gold/30 hover:border-gold/50"
            style={{ animationDelay: '0.8s' }}
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            <span className="relative">निमंत्रण पत्र खोलें</span>
            
            {/* Arrow icon */}
            <svg 
              className="relative w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Bottom Ornament */}
          <div className="flex items-center justify-center gap-3 md:gap-4 mt-6 md:mt-8 animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <div className="h-px w-10 md:w-14 bg-gradient-to-r from-transparent via-gold/50 to-gold" />
            <span className="text-gold text-lg md:text-xl animate-shimmer-text">✦</span>
            <div className="h-px w-10 md:w-14 bg-gradient-to-l from-transparent via-gold/50 to-gold" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationEnvelope;
