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
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-radial from-gold/20 to-transparent rounded-full blur-2xl animate-pulse-soft" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-radial from-royal-red/10 to-transparent rounded-full blur-2xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        </div>

        {/* Photo Gallery Section */}
        {photos.length > 0 && (
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <img 
              src={photos[currentPhotoIndex]} 
              alt={`${event.title} समारोह`}
              className="w-full h-full object-cover"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            
            {/* Photo Navigation */}
            {photos.length > 1 && (
              <>
                <button 
                  onClick={handlePrevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleNextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                
                {/* Photo Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {photos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPhotoIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        idx === currentPhotoIndex 
                          ? 'bg-white w-6' 
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Event Icon & Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <div className="inline-block mb-3">
                <div className="text-4xl md:text-5xl filter drop-shadow-lg animate-float">{icon}</div>
              </div>
              <DialogHeader>
                <DialogTitle className="font-script-hindi text-2xl md:text-3xl text-white mb-1 drop-shadow-lg">
                  {event.title} समारोह
                </DialogTitle>
                <DialogDescription className="font-hindi text-gold text-sm md:text-base font-medium tracking-wide drop-shadow-md">
                  {event.date} • {event.day}
                </DialogDescription>
              </DialogHeader>
            </div>
          </div>
        )}

        {/* Fallback Header when no photos */}
        {photos.length === 0 && (
          <div className="relative bg-gradient-to-br from-[#722424] via-[#8a2c2c] to-[#5a1c1c] p-6 md:p-8 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-15" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L55 30L30 55L5 30z' fill='none' stroke='%23d4af37' stroke-width='0.5'/%3E%3Ccircle cx='30' cy='30' r='8' fill='none' stroke='%23d4af37' stroke-width='0.3'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }} />
            
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl animate-pulse-soft scale-150" />
              <div className="relative text-5xl md:text-6xl animate-float filter drop-shadow-lg">{icon}</div>
            </div>
            
            <DialogHeader>
              <DialogTitle className="font-script-hindi text-2xl md:text-3xl lg:text-4xl text-white mb-2 drop-shadow-lg">
                {event.title} समारोह
              </DialogTitle>
              <DialogDescription className="font-hindi text-gold text-sm md:text-base font-medium tracking-wide">
                {event.date} • {event.day}
              </DialogDescription>
            </DialogHeader>
          </div>
        )}

        {/* Content Section */}
        <div className="relative p-5 md:p-6 space-y-4">
          {/* Description */}
          <div className="relative p-4 bg-gradient-to-br from-gold/5 to-transparent rounded-2xl border border-gold/10">
            <Sparkles className="absolute top-3 right-3 w-4 h-4 text-gold/30" />
            <p className="font-hindi text-[#722424]/80 text-sm md:text-base leading-relaxed text-center italic">
              "{description}"
            </p>
          </div>

          {/* Elegant Divider */}
          <div className="flex items-center justify-center gap-3 py-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold/50 to-gold/30" />
            <span className="text-gold text-lg animate-pulse-soft">❧</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-gold/50 to-gold/30" />
          </div>

          {/* Info Cards Container */}
          <div className="grid grid-cols-2 gap-3">
            {/* Timing Card */}
            {details?.timing && (
              <div className="group flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-[#722424]/8 to-transparent rounded-2xl border border-[#722424]/15 hover:border-[#722424]/30 transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#722424] to-[#8a2c2c] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div className="text-center">
                  <p className="font-hindi text-[#722424]/50 text-[10px] uppercase tracking-wider mb-1">समय</p>
                  <p className="font-hindi text-[#722424] text-sm font-semibold">{details.timing}</p>
                </div>
              </div>
            )}

            {/* Location Card */}
            {details?.location && (
              <div className="group flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-[#722424]/8 to-transparent rounded-2xl border border-[#722424]/15 hover:border-[#722424]/30 transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#722424] to-[#8a2c2c] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="text-center">
                  <p className="font-hindi text-[#722424]/50 text-[10px] uppercase tracking-wider mb-1">स्थान</p>
                  <p className="font-hindi text-[#722424] text-sm font-semibold">{details.location}</p>
                </div>
              </div>
            )}
          </div>

          {/* Additional Info Cards (for Shadi) */}
          {details?.additionalInfo && details.additionalInfo.length > 0 && (
            <div className="space-y-3 pt-2">
              <p className="font-hindi text-gold text-xs uppercase tracking-wider text-center">विशेष जानकारी</p>
              <div className="grid gap-3">
                {details.additionalInfo.map((info, idx) => (
                  <div 
                    key={idx} 
                    className="group flex items-center gap-4 p-4 bg-gradient-to-r from-gold/10 via-gold/5 to-transparent rounded-2xl border border-gold/20 hover:border-gold/40 transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-lg text-royal-red-dark group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      {getIcon(info.icon)}
                    </div>
                    <div className="flex-1">
                      <p className="font-hindi text-[#722424]/50 text-[10px] uppercase tracking-wider mb-0.5">{info.label}</p>
                      <p className="font-hindi text-[#722424] text-sm md:text-base font-semibold">{info.value}</p>
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