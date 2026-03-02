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
      <DialogContent className="max-w-md w-[calc(100%-2rem)] mx-auto bg-gradient-to-br from-cream via-white to-cream-dark border-0 rounded-3xl p-0 overflow-hidden shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
        {/* Banner Photo - fully visible */}
        {photos.length > 0 && (
          <div className="relative w-full bg-black/5">
            <div className="relative w-full overflow-hidden">
              {/* Full photo - object-contain ensures nothing is cropped */}
              <img 
                src={photos[currentPhotoIndex]} 
                alt={`${event.title} समारोह`}
                className="w-full h-auto max-h-[50vh] object-contain mx-auto"
              />
              
              {/* Subtle dark gradient at edges only */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.12) 100%)'
              }} />
              
              {/* Photo Navigation */}
              {photos.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevPhoto}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 transition-all duration-300"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleNextPhoto}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 transition-all duration-300"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {photos.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentPhotoIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === currentPhotoIndex 
                            ? 'bg-gold w-5' 
                            : 'bg-black/30 w-1.5 hover:bg-black/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Text Content */}
        <div className="relative px-5 pt-4 pb-6 md:px-6 md:pb-7 space-y-3.5">
          {/* Event Icon & Title */}
          <div className="text-center">
            <div className="text-3xl md:text-4xl mb-2 animate-float">{icon}</div>
            <DialogHeader>
              <DialogTitle className="font-script-hindi text-xl md:text-2xl text-foreground mb-0.5">
                {event.title} समारोह
              </DialogTitle>
              <DialogDescription className="font-hindi text-gold text-sm font-medium tracking-wide">
                {event.date} • {event.day}
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold/40" />
            <span className="text-gold text-sm">❧</span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold/40" />
          </div>

          {/* Description */}
          <p className="font-hindi text-foreground/65 text-sm leading-relaxed text-center italic px-2">
            "{description}"
          </p>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-2.5">
            {details?.timing && (
              <div className="flex flex-col items-center gap-1.5 p-3 bg-royal-red/5 rounded-xl border border-royal-red/10">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-royal-red to-royal-red-dark flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <p className="font-hindi text-muted-foreground text-[9px] uppercase tracking-wider">समय</p>
                <p className="font-hindi text-foreground text-xs font-semibold text-center">{details.timing}</p>
              </div>
            )}
            {details?.location && (
              <div className="flex flex-col items-center gap-1.5 p-3 bg-royal-red/5 rounded-xl border border-royal-red/10">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-royal-red to-royal-red-dark flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <p className="font-hindi text-muted-foreground text-[9px] uppercase tracking-wider">स्थान</p>
                <p className="font-hindi text-foreground text-xs font-semibold text-center">{details.location}</p>
              </div>
            )}
          </div>

          {/* Additional Info (Shadi) */}
          {details?.additionalInfo && details.additionalInfo.length > 0 && (
            <div className="space-y-2 pt-1">
              <p className="font-hindi text-gold text-[10px] uppercase tracking-wider text-center">विशेष जानकारी</p>
              {details.additionalInfo.map((info, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-3 p-3 bg-gold/5 rounded-xl border border-gold/10"
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-royal-red-dark flex-shrink-0">
                    {getIcon(info.icon)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-hindi text-muted-foreground text-[9px] uppercase tracking-wider">{info.label}</p>
                    <p className="font-hindi text-foreground text-xs font-semibold">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailDialog;
