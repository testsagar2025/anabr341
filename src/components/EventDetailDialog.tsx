import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { MapPin, Clock, Utensils, Users, Sparkles } from 'lucide-react';

export interface EventDetail {
  eventKey: string;
  title: string;
  date: string;
  day: string;
  timing?: string;
  location?: string;
  mapUrl?: string;
  photo?: string;
  additionalInfo?: {
    label: string;
    value: string;
    icon?: 'clock' | 'utensils' | 'users';
  }[];
}

// Event details configuration
export const eventDetails: Record<string, Omit<EventDetail, 'eventKey' | 'title' | 'date' | 'day'>> = {
  rasum: {
    timing: 'रात्रि ८:०० बजे से',
    location: 'माऊ',
    mapUrl: 'https://maps.app.goo.gl/nTmvYhVDpiBQB8548',
  },
  tilak: {
    timing: 'रात्रि ८:०० बजे से',
    location: 'माऊ',
    mapUrl: 'https://maps.app.goo.gl/nTmvYhVDpiBQB8548',
  },
  haldi: {
    timing: 'प्रातः १०:३० बजे से',
    location: 'माऊ',
    mapUrl: 'https://maps.app.goo.gl/nTmvYhVDpiBQB8548',
  },
  mehndi: {
    timing: 'सायं ७:०० बजे से',
    location: 'माऊ',
    mapUrl: 'https://maps.app.goo.gl/nTmvYhVDpiBQB8548',
  },
  shadi: {
    timing: 'शुभ मुहूर्त अनुसार',
    location: 'माऊ',
    mapUrl: 'https://maps.app.goo.gl/nTmvYhVDpiBQB8548',
    additionalInfo: [
      { label: 'बारात प्रस्थान', value: 'सायं ५:३० बजे', icon: 'users' },
      { label: 'पाणिग्रहण संस्कार', value: 'मध्यरात्रि १२:०० बजे (२९ अप्रैल)', icon: 'clock' },
    ],
  },
};

interface EventDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventDetail | null;
  icon: string;
  description: string;
}

const EventDetailDialog = ({ isOpen, onClose, event, icon, description }: EventDetailDialogProps) => {
  if (!event) return null;

  const details = eventDetails[event.eventKey];

  const getIcon = (iconType?: 'clock' | 'utensils' | 'users') => {
    switch (iconType) {
      case 'utensils': return <Utensils className="w-4 h-4 md:w-5 md:h-5" />;
      case 'users': return <Users className="w-4 h-4 md:w-5 md:h-5" />;
      default: return <Clock className="w-4 h-4 md:w-5 md:h-5" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-4 bg-gradient-to-br from-[#f5ebe0] via-[#faf6f0] to-[#ede4d8] border-0 rounded-3xl p-0 overflow-hidden shadow-[0_25px_80px_-15px_rgba(0,0,0,0.5)] animate-scale-in">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-gradient-radial from-gold/25 to-transparent rounded-full blur-2xl animate-pulse-soft" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-gradient-radial from-gold/15 to-transparent rounded-full blur-2xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
          {/* Marble veins */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q 25 30, 50 50 T 100 50' fill='none' stroke='%23B8860B' stroke-width='0.5'/%3E%3Cpath d='M0 70 Q 35 50, 70 70 T 100 60' fill='none' stroke='%23B8860B' stroke-width='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }} />
        </div>

        {/* Header with enhanced decorative background */}
        <div className="relative bg-gradient-to-br from-[#8B4513] via-[#A0522D] to-[#6B3810] p-6 md:p-8 text-center overflow-hidden">
          {/* Animated Decorative Pattern */}
          <div className="absolute inset-0 opacity-15" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L55 30L30 55L5 30z' fill='none' stroke='%23d4af37' stroke-width='0.5'/%3E%3Ccircle cx='30' cy='30' r='8' fill='none' stroke='%23d4af37' stroke-width='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
            animation: 'shimmer 3s ease-in-out infinite'
          }} />
          
          {/* Sparkle Effects */}
          <div className="absolute top-4 left-6 text-gold/50 animate-twinkle text-lg">✦</div>
          <div className="absolute top-8 right-8 text-gold/40 animate-twinkle text-xl" style={{ animationDelay: '0.5s' }}>✧</div>
          <div className="absolute bottom-4 left-10 text-gold/35 animate-twinkle text-lg" style={{ animationDelay: '1s' }}>✦</div>
          <div className="absolute bottom-6 right-6 text-gold/45 animate-twinkle text-xl" style={{ animationDelay: '1.5s' }}>✧</div>
          
          {/* Event Icon with Enhanced Glow */}
          <div className="relative inline-block mb-4 md:mb-5">
            <div className="absolute inset-0 bg-gold/30 rounded-full blur-2xl animate-pulse-soft scale-[2]" />
            <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl animate-pulse-soft scale-150" style={{ animationDelay: '0.5s' }} />
            <div className="relative text-5xl md:text-6xl lg:text-7xl animate-float filter drop-shadow-lg">{icon}</div>
          </div>
          
          <DialogHeader>
            <DialogTitle className="font-script-hindi text-3xl md:text-4xl lg:text-5xl text-white mb-2 md:mb-3 drop-shadow-lg">
              {event.title} समारोह
            </DialogTitle>
            <DialogDescription className="font-hindi text-gold text-base md:text-lg font-medium tracking-wide">
              {event.date} • {event.day}
            </DialogDescription>
          </DialogHeader>

          {/* Bottom Decorative Wave */}
          <div className="absolute -bottom-1 left-0 right-0 h-6 bg-gradient-to-t from-[#f5ebe0]/30 to-transparent" />
        </div>

        {/* Content with enhanced styling */}
        <div className="relative p-5 md:p-7 space-y-4 md:space-y-5">
          {/* Description with elegant styling */}
          <div className="relative p-4 md:p-5 bg-gradient-to-br from-gold/10 via-gold/5 to-transparent rounded-2xl border border-gold/20">
            <Sparkles className="absolute top-3 right-3 w-4 h-4 md:w-5 md:h-5 text-gold/40" />
            <p className="font-hindi text-[#5a2d1a]/90 text-sm md:text-base leading-relaxed text-center italic">
              "{description}"
            </p>
          </div>

          {/* Elegant Divider */}
          <div className="flex items-center justify-center gap-3 py-2">
            <div className="h-px w-16 md:w-20 bg-gradient-to-r from-transparent via-gold/60 to-gold/40" />
            <span className="text-gold text-xl animate-shimmer-text">❧</span>
            <div className="h-px w-16 md:w-20 bg-gradient-to-l from-transparent via-gold/60 to-gold/40" />
          </div>

          {/* Timing Card */}
          {details?.timing && (
            <div className="group flex items-center gap-3 md:gap-4 p-3.5 md:p-4 bg-gradient-to-r from-[#8B4513]/15 via-[#A0522D]/10 to-transparent rounded-2xl border border-[#8B4513]/25 hover:border-gold/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#8B4513] via-[#A0522D] to-[#6B3810] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-hindi text-[#8B4513]/60 text-[10px] md:text-xs uppercase tracking-wider mb-0.5">समय</p>
                <p className="font-hindi text-[#5a2d1a] text-base md:text-lg font-semibold">{details.timing}</p>
              </div>
            </div>
          )}

          {/* Location Card */}
          {details?.location && (
            <div className="group flex items-center gap-3 md:gap-4 p-3.5 md:p-4 bg-gradient-to-r from-[#8B4513]/15 via-[#A0522D]/10 to-transparent rounded-2xl border border-[#8B4513]/25 hover:border-gold/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#8B4513] via-[#A0522D] to-[#6B3810] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 text-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-hindi text-[#8B4513]/60 text-[10px] md:text-xs uppercase tracking-wider mb-0.5">स्थान</p>
                <p className="font-hindi text-[#5a2d1a] text-base md:text-lg font-semibold">{details.location}</p>
              </div>
            </div>
          )}

          {/* Additional Info Cards (for Shadi) */}
          {details?.additionalInfo && details.additionalInfo.length > 0 && (
            <div className="space-y-3 md:space-y-4 pt-2">
              <div className="flex items-center justify-center gap-2">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold/40" />
                <p className="font-hindi text-gold text-[10px] md:text-xs uppercase tracking-wider text-center">विशेष जानकारी</p>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-gold/40" />
              </div>
              {details.additionalInfo.map((info, idx) => (
                <div 
                  key={idx} 
                  className="group flex items-center gap-3 md:gap-4 p-3.5 md:p-4 bg-gradient-to-r from-gold/15 via-gold/10 to-transparent rounded-2xl border border-gold/30 hover:border-gold/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-gold via-gold-light to-gold-dark flex items-center justify-center shadow-lg text-[#2d1810] group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                    {getIcon(info.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-hindi text-[#8B4513]/60 text-[10px] md:text-xs uppercase tracking-wider mb-0.5">{info.label}</p>
                    <p className="font-hindi text-[#5a2d1a] text-base md:text-lg font-semibold">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom decorative element */}
          <div className="flex items-center justify-center gap-3 pt-3">
            <span className="text-gold/40 text-sm animate-twinkle">✧</span>
            <span className="text-gold/60 text-lg">✦</span>
            <span className="text-gold/40 text-sm animate-twinkle" style={{ animationDelay: '0.5s' }}>✧</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailDialog;
