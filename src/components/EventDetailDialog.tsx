import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { MapPin, Clock, Users, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

// Import event images
import rasumImage from '@/assets/events/rasum.png';
import tilakImage from '@/assets/events/tilak.png';
import haldi1Image from '@/assets/events/haldi-1.png';
import haldi2Image from '@/assets/events/haldi-2.png';
import mehndiImage from '@/assets/events/mehndi.png';
import vivah1Image from '@/assets/events/vivah-1.png';
import vivah2Image from '@/assets/events/vivah-2.png';

export interface EventDetail {
  eventKey: string;
  title: string;
  date: string;
  day: string;
  timing?: string;
  location?: string;
  mapUrl?: string;
  photos?: string[];
  additionalInfo?: {
    label: string;
    value: string;
    icon?: 'clock' | 'utensils' | 'users';
  }[];
}

// Event details configuration with photos
export const eventDetails: Record<string, Omit<EventDetail, 'eventKey' | 'title' | 'date' | 'day'>> = {
  rasum: {
    timing: 'रात्रि ८:०० बजे से',
    location: 'माऊ',
    mapUrl: 'https://maps.app.goo.gl/nTmvYhVDpiBQB8548',
    photos: [rasumImage],
  },
  tilak: {
    timing: 'रात्रि ८:०० बजे से',
    location: 'माऊ',
    mapUrl: 'https://maps.app.goo.gl/nTmvYhVDpiBQB8548',
    photos: [tilakImage],
  },
  haldi: {
    timing: 'प्रातः १०:३० बजे से',
    location: 'माऊ',
    mapUrl: 'https://maps.app.goo.gl/nTmvYhVDpiBQB8548',
    photos: [haldi1Image, haldi2Image],
  },
  mehndi: {
    timing: 'सायं ७:०० बजे से',
    location: 'माऊ',
    mapUrl: 'https://maps.app.goo.gl/nTmvYhVDpiBQB8548',
    photos: [mehndiImage],
  },
  shadi: {
    timing: 'शुभ मुहूर्त अनुसार',
    location: 'माऊ',
    mapUrl: 'https://maps.app.goo.gl/nTmvYhVDpiBQB8548',
    photos: [vivah1Image, vivah2Image],
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
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  if (!event) return null;

  const details = eventDetails[event.eventKey];
  const photos = details?.photos || [];

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const getIcon = (iconType?: 'clock' | 'utensils' | 'users') => {
    switch (iconType) {
      case 'users': return <Users className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-[calc(100%-2rem)] mx-auto bg-gradient-to-br from-cream via-white to-cream-dark border-0 rounded-3xl p-0 overflow-hidden shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
        {/* Banner Photo Section */}
        {photos.length > 0 && (
          <div className="relative w-full">
            {/* Banner Image - wide cinematic ratio */}
            <div className="relative w-full aspect-[16/9] overflow-hidden">
              <img 
                src={photos[currentPhotoIndex]} 
                alt={`${event.title} समारोह`}
                className="w-full h-full object-cover object-center"
              />
              
              {/* Dark cinematic overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
              
              {/* Vignette effect */}
              <div className="absolute inset-0" style={{
                background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)'
              }} />

              {/* Subtle gold light streaks */}
              <div className="absolute inset-0 opacity-20" style={{
                background: 'linear-gradient(135deg, transparent 30%, hsla(45, 85%, 50%, 0.15) 50%, transparent 70%)'
              }} />
              
              {/* Photo Navigation */}
              {photos.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevPhoto}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white/90 hover:bg-black/50 transition-all duration-300 border border-white/10"
                  >
                    <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button 
                    onClick={handleNextPhoto}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white/90 hover:bg-black/50 transition-all duration-300 border border-white/10"
                  >
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  
                  {/* Photo Indicators */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {photos.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentPhotoIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === currentPhotoIndex 
                            ? 'bg-gold w-6' 
                            : 'bg-white/40 w-1.5 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* All Text Content Below Photo */}
        <div className="relative px-5 pt-5 pb-6 md:px-6 md:pt-6 md:pb-8 space-y-4">
          {/* Decorative glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-gradient-radial from-gold/15 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Event Icon & Title */}
          <div className="text-center relative">
            <div className="text-4xl md:text-5xl mb-3 animate-float filter drop-shadow-lg">{icon}</div>
            <DialogHeader>
              <DialogTitle className="font-script-hindi text-2xl md:text-3xl text-foreground mb-1">
                {event.title} समारोह
              </DialogTitle>
              <DialogDescription className="font-hindi text-gold text-sm md:text-base font-medium tracking-wide">
                {event.date} • {event.day}
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Elegant Divider */}
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-gold/50 to-gold/30" />
            <span className="text-gold text-lg animate-pulse-soft">❧</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent via-gold/50 to-gold/30" />
          </div>

          {/* Description */}
          <div className="relative p-4 bg-gradient-to-br from-gold/5 to-transparent rounded-2xl border border-gold/10">
            <Sparkles className="absolute top-3 right-3 w-4 h-4 text-gold/30" />
            <p className="font-hindi text-foreground/70 text-sm md:text-base leading-relaxed text-center italic">
              "{description}"
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-3">
            {details?.timing && (
              <div className="group flex flex-col items-center gap-2 p-3 md:p-4 bg-gradient-to-br from-royal-red/5 to-transparent rounded-2xl border border-royal-red/10 hover:border-royal-red/25 transition-all duration-300">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-royal-red to-royal-red-dark flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div className="text-center">
                  <p className="font-hindi text-muted-foreground text-[10px] uppercase tracking-wider mb-0.5">समय</p>
                  <p className="font-hindi text-foreground text-xs md:text-sm font-semibold">{details.timing}</p>
                </div>
              </div>
            )}

            {details?.location && (
              <div className="group flex flex-col items-center gap-2 p-3 md:p-4 bg-gradient-to-br from-royal-red/5 to-transparent rounded-2xl border border-royal-red/10 hover:border-royal-red/25 transition-all duration-300">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-royal-red to-royal-red-dark flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div className="text-center">
                  <p className="font-hindi text-muted-foreground text-[10px] uppercase tracking-wider mb-0.5">स्थान</p>
                  <p className="font-hindi text-foreground text-xs md:text-sm font-semibold">{details.location}</p>
                </div>
              </div>
            )}
          </div>

          {/* Additional Info (Shadi) */}
          {details?.additionalInfo && details.additionalInfo.length > 0 && (
            <div className="space-y-3 pt-1">
              <p className="font-hindi text-gold text-xs uppercase tracking-wider text-center">विशेष जानकारी</p>
              <div className="grid gap-2.5">
                {details.additionalInfo.map((info, idx) => (
                  <div 
                    key={idx} 
                    className="group flex items-center gap-3 p-3 md:p-4 bg-gradient-to-r from-gold/8 via-gold/4 to-transparent rounded-2xl border border-gold/15 hover:border-gold/30 transition-all duration-300"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-lg text-royal-red-dark group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      {getIcon(info.icon)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-hindi text-muted-foreground text-[10px] uppercase tracking-wider mb-0.5">{info.label}</p>
                      <p className="font-hindi text-foreground text-xs md:text-sm font-semibold">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailDialog;
