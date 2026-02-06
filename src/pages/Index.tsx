import { Suspense, lazy, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import CountdownTimer from "@/components/CountdownTimer";
import WeddingVideoPlayer from "@/components/WeddingVideoPlayer";
import Parallax3DWrapper from "@/components/Parallax3DWrapper";
import InvitationEnvelope from "@/components/InvitationEnvelope";
import EventDetailDialog, { EventDetail, eventDetails } from "@/components/EventDetailDialog";
import { Calendar, Heart, Sparkles, Loader2 } from "lucide-react";
import ganeshaImage from "@/assets/ganesha.png";
import shlokImage from "@/assets/shlok.png";
import { useGuestData, eventNameHindi, eventIcons, eventDescriptions, eventDates } from "@/hooks/useGuestData";

// Lazy load the 3D scene for better performance
const Scene3D = lazy(() => import("@/components/Scene3D"));

// Floating Diya Component
const FloatingDiya = ({ position, delay }: { position: string; delay: number }) => (
  <div 
    className={`absolute ${position} pointer-events-none animate-float`}
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="relative">
      <div className="w-6 h-6 md:w-8 md:h-8 text-2xl md:text-3xl">🪔</div>
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-8 bg-gradient-radial from-gold/40 via-gold/20 to-transparent rounded-full blur-sm animate-flame" />
    </div>
  </div>
);

// Floating Petal Component
const FloatingPetal = ({ left, delay, duration }: { left: string; delay: number; duration: number }) => (
  <div 
    className="absolute top-0 text-xl md:text-2xl animate-petal-fall pointer-events-none"
    style={{ 
      left, 
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`
    }}
  >
    🌸
  </div>
);

const Index = () => {
  const [searchParams] = useSearchParams();
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<{
    event: EventDetail;
    icon: string;
    description: string;
  } | null>(null);
  
  // Get guest ID from URL parameters
  const guestId = searchParams.get('id') || '';
  
  // Fetch guest data from API
  const { guestData, loading, error } = useGuestData(guestId || null);

  const handleOpenInvitation = useCallback(() => {
    setShowEnvelope(false);
  }, []);

  const handleEventClick = useCallback((eventKey: string, title: string, date: string, day: string, icon: string, description: string) => {
    setSelectedEvent({
      event: {
        eventKey,
        title,
        date,
        day,
      },
      icon,
      description,
    });
  }, []);

  const handleCloseEventDialog = useCallback(() => {
    setSelectedEvent(null);
  }, []);
  
  // Wedding date: April 28, 2026
  const weddingDate = new Date("2026-04-28T18:00:00");

  // Loading state
  if (guestId && loading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
        <div className="absolute inset-0 bg-gradient-radial from-gold/10 via-transparent to-transparent" />
        <div className="text-center relative z-10">
          <Loader2 className="w-12 h-12 text-gold animate-spin mx-auto mb-4" />
          <p className="font-hindi text-gold/80 tracking-wider text-lg">
            निमंत्रण पत्र लोड हो रहा है...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (guestId && error) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-6">
          <p className="font-hindi-display text-gold text-2xl mb-2">
            क्षमा करें
          </p>
          <p className="font-hindi text-muted-foreground text-lg">
            {error}
          </p>
        </div>
      </div>
    );
  }

  const mainContent = (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* 3D Background Scene */}
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      {/* Mandap-style Background */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {/* Dark ambient gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-[#1a0f0a]" />
        
        {/* Warm ambient lighting from center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[800px] h-[800px] bg-gradient-radial from-gold/15 via-gold/5 to-transparent rounded-full blur-3xl animate-ambient" />
        </div>
        
        {/* Side ambient glow - left */}
        <div className="absolute top-1/2 -left-20 w-[400px] h-[600px] bg-gradient-radial from-gold/10 to-transparent rounded-full blur-3xl" />
        
        {/* Side ambient glow - right */}
        <div className="absolute top-1/2 -right-20 w-[400px] h-[600px] bg-gradient-radial from-gold/10 to-transparent rounded-full blur-3xl" />
        
        {/* Top floral glow */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#8B4513]/20 via-[#DAA520]/10 to-transparent" />
        
        {/* Floating Petals */}
        <FloatingPetal left="10%" delay={0} duration={10} />
        <FloatingPetal left="25%" delay={2} duration={12} />
        <FloatingPetal left="40%" delay={4} duration={9} />
        <FloatingPetal left="55%" delay={1} duration={11} />
        <FloatingPetal left="70%" delay={3} duration={10} />
        <FloatingPetal left="85%" delay={5} duration={13} />
        
        {/* Floating Sparkles */}
        <div className="absolute top-[15%] left-[8%] text-gold/40 text-lg animate-twinkle">✦</div>
        <div className="absolute top-[25%] right-[12%] text-gold/30 text-xl animate-twinkle" style={{ animationDelay: "0.5s" }}>✧</div>
        <div className="absolute top-[45%] left-[5%] text-gold/25 text-lg animate-twinkle" style={{ animationDelay: "1s" }}>✦</div>
        <div className="absolute top-[55%] right-[8%] text-gold/35 text-xl animate-twinkle" style={{ animationDelay: "1.5s" }}>✧</div>
        <div className="absolute top-[75%] left-[15%] text-gold/30 text-lg animate-twinkle" style={{ animationDelay: "2s" }}>✦</div>
        <div className="absolute top-[85%] right-[15%] text-gold/25 text-xl animate-twinkle" style={{ animationDelay: "2.5s" }}>✧</div>
      </div>

      {/* Curtain Effects - Left */}
      <div className="fixed top-0 left-0 bottom-0 w-16 md:w-24 lg:w-32 pointer-events-none z-40 animate-curtain-sway">
        <div className="absolute inset-0 bg-gradient-to-r from-[#B8860B]/80 via-[#DAA520]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#8B4513]/40 via-transparent to-[#8B4513]/40" />
        <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-black/20 to-transparent" />
      </div>

      {/* Curtain Effects - Right */}
      <div className="fixed top-0 right-0 bottom-0 w-16 md:w-24 lg:w-32 pointer-events-none z-40 animate-curtain-sway" style={{ animationDelay: '0.5s' }}>
        <div className="absolute inset-0 bg-gradient-to-l from-[#B8860B]/80 via-[#DAA520]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#8B4513]/40 via-transparent to-[#8B4513]/40" />
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative" style={{ zIndex: 10 }}>
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-8 py-16">
          <div className="w-full max-w-4xl">
            {/* Ganesha & Shlok Section */}
            <Parallax3DWrapper intensity={8} className="mb-8 md:mb-12">
              <div className="ganesha-section text-center">
                {/* Outer Decorative Frame */}
                <div className="relative inline-block p-6 md:p-10">
                  {/* Elegant Border Frame */}
                  <div className="absolute inset-0 border-2 border-gold/40 rounded-3xl animate-border-glow" />
                  <div className="absolute inset-3 border border-gold/25 rounded-2xl" />
                  
                  {/* Corner Ornaments */}
                  <div className="absolute -top-1 -left-1 w-10 h-10 md:w-14 md:h-14">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-transparent rounded-full" />
                    <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-gold to-transparent rounded-full" />
                    <div className="absolute top-2 left-2 text-gold/60 text-sm">❧</div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-10 h-10 md:w-14 md:h-14">
                    <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-gold to-transparent rounded-full" />
                    <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-gold to-transparent rounded-full" />
                    <div className="absolute top-2 right-2 text-gold/60 text-sm transform scale-x-[-1]">❧</div>
                  </div>
                  <div className="absolute -bottom-1 -left-1 w-10 h-10 md:w-14 md:h-14">
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-transparent rounded-full" />
                    <div className="absolute bottom-0 left-0 h-full w-1 bg-gradient-to-t from-gold to-transparent rounded-full" />
                    <div className="absolute bottom-2 left-2 text-gold/60 text-sm transform scale-y-[-1]">❧</div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-10 h-10 md:w-14 md:h-14">
                    <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-gold to-transparent rounded-full" />
                    <div className="absolute bottom-0 right-0 h-full w-1 bg-gradient-to-t from-gold to-transparent rounded-full" />
                    <div className="absolute bottom-2 right-2 text-gold/60 text-sm transform scale-[-1]">❧</div>
                  </div>

                  {/* Ganesha Container with Divine Aura */}
                  <div className="relative mb-6 animate-divine-entrance">
                    {/* Multiple layered glow effects */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-44 h-44 md:w-56 md:h-56 bg-gradient-radial from-gold/30 via-gold/15 to-transparent rounded-full blur-2xl animate-pulse-glow" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-36 h-36 md:w-48 md:h-48 bg-gradient-radial from-gold/20 via-transparent to-transparent rounded-full blur-xl animate-pulse-glow" style={{ animationDelay: '0.5s' }} />
                    </div>
                    
                    {/* Divine Rays */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="divine-rays" />
                    </div>
                    
                    {/* Decorative Ring */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-36 h-36 md:w-44 md:h-44 border-2 border-gold/25 rounded-full animate-spin-slow" />
                    </div>
                    
                    {/* Ganesha Image */}
                    <div className="relative z-10 py-3">
                      <img 
                        src={ganeshaImage} 
                        alt="श्री गणेश" 
                        className="relative w-28 h-28 md:w-36 md:h-36 object-contain mx-auto ganesha-image animate-float"
                      />
                    </div>
                  </div>

                  {/* Shlok Container */}
                  <div className="relative max-w-sm md:max-w-md mx-auto animate-fade-in" style={{ animationDelay: "0.3s" }}>
                    <img 
                      src={shlokImage} 
                      alt="वक्रतुण्ड महाकाय श्लोक" 
                      className="w-full h-auto object-contain shlok-image mx-auto"
                      style={{ maxHeight: '70px', filter: 'brightness(1.1)' }}
                    />
                  </div>

                  {/* Elegant Divider */}
                  <div className="flex items-center justify-center gap-4 mt-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                    <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-gold/60 to-gold" />
                    <span className="text-gold text-lg animate-shimmer-text">✦</span>
                    <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent via-gold/60 to-gold" />
                  </div>
                </div>
              </div>
            </Parallax3DWrapper>

            {/* Title Section with 3D effect */}
            <Parallax3DWrapper intensity={8} className="mb-10 md:mb-14">
              <div className="text-center px-4">
                {/* Shubh Vivah Header */}
                <div className="inline-block mb-5 md:mb-7 animate-fade-in-down">
                  <p className="text-gold font-script-hindi text-2xl md:text-3xl lg:text-4xl mb-3 text-shadow-gold">
                    शुभ विवाह आमंत्रण
                  </p>
                  <div className="flex items-center justify-center gap-3 md:gap-4">
                    <span className="text-gold/60 text-base md:text-lg animate-twinkle">✦</span>
                    <p className="text-gold-light font-hindi text-base md:text-lg lg:text-xl">
                      ॥ श्री गणेशाय नमः ॥
                    </p>
                    <span className="text-gold/60 text-base md:text-lg animate-twinkle" style={{ animationDelay: '0.3s' }}>✦</span>
                  </div>
                </div>
                
                {/* Invitation Text */}
                <div className="mb-5 md:mb-7 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                  <p className="font-hindi text-lg md:text-xl lg:text-2xl text-gold/80 mb-2">
                    उत्सव परिणय बंधन का...
                  </p>
                </div>
                
                {/* Couple Names - Main Title with 3D effect */}
                <h1 className="font-script-hindi text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-gold mb-6 md:mb-8 title-gold animate-fade-in-up leading-tight" style={{ animationDelay: "0.2s" }}>
                  विपिन & प्रिया
                </h1>
                
                <div className="flex items-center justify-center gap-4 md:gap-6 mb-5 md:mb-7 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                  <div className="h-px w-16 md:w-28 lg:w-36 bg-gradient-to-r from-transparent via-gold to-gold" />
                  <Heart className="w-6 h-6 md:w-8 md:h-8 text-gold animate-pulse-soft drop-shadow-gold" fill="currentColor" />
                  <div className="h-px w-16 md:w-28 lg:w-36 bg-gradient-to-l from-transparent via-gold to-gold" />
                </div>
                
                {/* Wedding Description */}
                <p className="font-hindi text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed animate-fade-in px-4" style={{ animationDelay: "0.4s" }}>
                  मान्यवर, हम सपरिवार सादर आमंत्रित करते हैं आपको हमारे यहाँ आयोजित शुभ विवाह समारोह में।
                </p>
              </div>
            </Parallax3DWrapper>

            {/* Video Player with 3D pop-out effect */}
            <div className="mb-16 md:mb-20 animate-slide-up" style={{ animationDelay: "0.6s" }}>
              <Parallax3DWrapper intensity={12} perspective={1500} popOut className="video-3d-container">
                <div className="video-3d-wrapper">
                  {/* 3D Shadow layers */}
                  <div className="video-shadow-layer video-shadow-1" />
                  <div className="video-shadow-layer video-shadow-2" />
                  <div className="video-shadow-layer video-shadow-3" />
                  
                  {/* Main video */}
                  <div className="video-main-layer">
                    <WeddingVideoPlayer />
                  </div>
                  
                  {/* 3D Frame overlay */}
                  <div className="video-frame-3d" />
                </div>
              </Parallax3DWrapper>
            </div>
          </div>
        </section>

        {/* Countdown Section */}
        <section className="py-20 md:py-28 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[300px] bg-gradient-radial from-gold/10 to-transparent rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <Parallax3DWrapper intensity={5}>
              <CountdownTimer targetDate={weddingDate} />
            </Parallax3DWrapper>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-16 md:py-24 lg:py-32 px-6 md:px-8 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-gold/5 to-background pointer-events-none" />
          
          <div className="max-w-5xl mx-auto relative z-10">
            <Parallax3DWrapper intensity={6}>
              <div className="text-center mb-10 md:mb-16">
                <p className="text-gold font-hindi text-lg md:text-xl mb-3 md:mb-4 animate-fade-in text-shadow-gold">
                  ॥ मंगल उत्सव ॥
                </p>
                <h2 className="font-script-hindi text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gold animate-fade-in-up title-gold" style={{ animationDelay: "0.1s" }}>
                  मांगलिक कार्यक्रमों का विवरण
                </h2>
                <div className="flex items-center justify-center gap-3 md:gap-4 mt-4 md:mt-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <div className="h-px w-12 md:w-16 bg-gradient-to-r from-transparent via-gold/50 to-gold" />
                  <span className="text-gold text-xl md:text-2xl animate-shimmer-text">✦</span>
                  <div className="h-px w-12 md:w-16 bg-gradient-to-l from-transparent via-gold/50 to-gold" />
                </div>
              </div>
            </Parallax3DWrapper>

            {/* Dynamic Events from API or Default */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-4xl mx-auto">
              {guestData && guestData.events && guestData.events.length > 0 ? (
                // Show events from API - sorted by date
                [...guestData.events]
                  .sort((a, b) => {
                    const order = ['rasum', 'tilak', 'haldi', 'mehndi', 'shadi'];
                    return order.indexOf(a) - order.indexOf(b);
                  })
                  .map((event, index) => (
                    <Parallax3DWrapper key={event} intensity={10} popOut>
                      <EventCard
                        eventKey={event}
                        title={eventNameHindi[event] || event}
                        date={eventDates[event]?.date || '28 अप्रैल 2026'}
                        day={eventDates[event]?.day || 'मंगलवार'}
                        time="शुभ मुहूर्त"
                        icon={eventIcons[event] || '✨'}
                        description={eventDescriptions[event] || 'आपकी उपस्थिति हमारे लिए सौभाग्य की बात होगी'}
                        delay={0.3 + index * 0.1}
                        index={index + 1}
                        onClick={handleEventClick}
                      />
                    </Parallax3DWrapper>
                  ))
              ) : (
                // Default events when no guest data
                <>
                  <Parallax3DWrapper intensity={10} popOut>
                    <EventCard
                      eventKey="rasum"
                      title="रसुम"
                      date="20 अप्रैल, 2026"
                      day="सोमवार"
                      time="शुभ मुहूर्त"
                      icon="🪷"
                      description="पवित्र रसुम समारोह में आपकी उपस्थिति से हमें अपार प्रसन्नता की अनुभूति होगी। इस शुभ अवसर पर दोनों परिवारों का मिलन होगा।"
                      delay={0.3}
                      index={1}
                      onClick={handleEventClick}
                    />
                  </Parallax3DWrapper>
                  <Parallax3DWrapper intensity={10} popOut>
                    <EventCard
                      eventKey="tilak"
                      title="तिलक"
                      date="22 अप्रैल, 2026"
                      day="बुधवार"
                      time="शुभ मुहूर्त"
                      icon="🔴"
                      description="तिलक की शुभ परंपरा का निर्वहन किया जाएगा। इस मंगलमय अवसर पर आपकी कृपा और आशीर्वाद की कामना है।"
                      delay={0.4}
                      index={2}
                      onClick={handleEventClick}
                    />
                  </Parallax3DWrapper>
                  <Parallax3DWrapper intensity={10} popOut>
                    <EventCard
                      eventKey="haldi"
                      title="हल्दी"
                      date="26 अप्रैल, 2026"
                      day="रविवार"
                      time="शुभ मुहूर्त"
                      icon="🌻"
                      description="हल्दी का पवित्र समारोह दुल्हन को सौंदर्य और कोमलता से सजाने के लिए किया जाता है। कृपया इस आनंद में शामिल हों।"
                      delay={0.5}
                      index={3}
                      onClick={handleEventClick}
                    />
                  </Parallax3DWrapper>
                  <Parallax3DWrapper intensity={10} popOut>
                    <EventCard
                      eventKey="mehndi"
                      title="मेहंदी"
                      date="27 अप्रैल, 2026"
                      day="सोमवार"
                      time="शुभ मुहूर्त"
                      icon="🌿"
                      description="मेहंदी की खुशियों में डूबी महिलाओं के गीत और हंसी से भरा एक मंगलमय पल। आप इस परंपरागत उत्सव का हिस्सा बनें।"
                      delay={0.6}
                      index={4}
                      onClick={handleEventClick}
                    />
                  </Parallax3DWrapper>
                  <Parallax3DWrapper intensity={10} popOut>
                    <EventCard
                      eventKey="shadi"
                      title="विवाह"
                      date="28 अप्रैल, 2026"
                      day="मंगलवार"
                      time="शुभ मुहूर्त"
                      icon="💒"
                      description="पवित्र अग्नि के साक्षी रहते दो आत्माओं का मिलन होगा। विवाह मंडप में आपकी उपस्थिति हमारे इस पवित्र बंधन को सार्थक करेगी।"
                      delay={0.7}
                      index={5}
                      onClick={handleEventClick}
                    />
                  </Parallax3DWrapper>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="relative py-12 md:py-16 px-6 border-t border-gold/25 bg-gradient-to-t from-[#0d0805] via-background to-transparent overflow-hidden">
          {/* Background Decorations */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-radial from-gold/8 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-radial from-gold/5 to-transparent rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-5xl mx-auto text-center">
            {/* Decorative Top Element */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-gold/50 to-gold" />
              <div className="flex items-center gap-3">
                <span className="text-gold/50 text-sm animate-twinkle">✧</span>
                <span className="text-gold text-xl animate-shimmer-text">❧</span>
                <span className="text-gold/50 text-sm animate-twinkle" style={{ animationDelay: '0.5s' }}>✧</span>
              </div>
              <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent via-gold/50 to-gold" />
            </div>
            
            <p className="font-hindi text-muted-foreground text-base md:text-lg mb-5 leading-relaxed">
              कृपया इस पवित्र बंधन में शामिल होकर हमें अपने आशीर्वाद से कृतार्थ करें।
            </p>
            
            <p className="text-gold/50 text-sm md:text-base font-hindi mb-8">
              © 2026 विपिन & प्रिया विवाह
            </p>

            {/* Credit Section */}
            <div className="pt-5 border-t border-gold/15">
              <p className="font-script-hindi text-gold/80 text-lg md:text-xl hover:text-gold transition-colors duration-300">
                आर्यन गुप्ता
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );

  return (
    <>
      <head>
        <title>{guestData ? `${guestData.name}${guestData.type === 'family' ? ' एवं परिवार' : ''} - ` : ''}विपिन & प्रिया विवाह निमंत्रण | अप्रैल 2026</title>
        <meta name="description" content={`${guestData ? `प्रिय ${guestData.name}${guestData.type === 'family' ? ' एवं परिवार' : ''}, आप` : 'आप'} विपिन और प्रिया के विवाह समारोह में सादर आमंत्रित हैं। 28 अप्रैल 2026`} />
      </head>
      
      {/* Personalized Invitation Envelope */}
      {guestData && showEnvelope && (
        <InvitationEnvelope 
          guestData={guestData}
          onOpen={handleOpenInvitation}
        />
      )}
      
      {/* Main Content - show when envelope is opened or no guest data */}
      {(!guestData || !showEnvelope) && mainContent}

      {/* Event Detail Dialog */}
      <EventDetailDialog
        isOpen={!!selectedEvent}
        onClose={handleCloseEventDialog}
        event={selectedEvent?.event || null}
        icon={selectedEvent?.icon || ''}
        description={selectedEvent?.description || ''}
      />
    </>
  );
};

interface EventCardProps {
  eventKey: string;
  title: string;
  date: string;
  day: string;
  time: string;
  icon: string;
  description: string;
  delay: number;
  index: number;
  onClick: (eventKey: string, title: string, date: string, day: string, icon: string, description: string) => void;
}

const EventCard = ({ eventKey, title, date, day, time, icon, description, delay, index, onClick }: EventCardProps) => (
  <div 
    className="group relative animate-fade-in-up w-full cursor-pointer"
    style={{ animationDelay: `${delay}s` }}
    onClick={() => onClick(eventKey, title, date, day, icon, description)}
  >
    {/* Background Glow */}
    <div className="absolute -inset-3 bg-gradient-to-br from-gold/30 via-gold/15 to-gold/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
    
    {/* Card with marble-like texture */}
    <div className="relative luxury-card rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-7 text-center group-hover:shadow-3d-hover transition-all duration-500 group-hover:-translate-y-3 overflow-hidden card-3d-premium h-full">
      {/* Event Number Badge */}
      <div className="absolute -top-2 -left-2 md:-top-3 md:-left-3 w-9 h-9 md:w-11 md:h-11 bg-gradient-to-br from-gold via-gold-light to-gold-dark rounded-full flex items-center justify-center shadow-lg z-20 border-2 border-white/30">
        <span className="text-[#2d1810] font-display text-sm md:text-base font-bold">{index}</span>
      </div>
      
      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 border-t-2 border-l-2 border-gold/50 group-hover:border-gold rounded-tl-2xl md:rounded-tl-3xl transition-colors duration-500" />
      <div className="absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-gold/50 group-hover:border-gold rounded-tr-2xl md:rounded-tr-3xl transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 w-6 h-6 md:w-8 md:h-8 border-b-2 border-l-2 border-gold/50 group-hover:border-gold rounded-bl-2xl md:rounded-bl-3xl transition-colors duration-500" />
      <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 border-b-2 border-r-2 border-gold/50 group-hover:border-gold rounded-br-2xl md:rounded-br-3xl transition-colors duration-500" />
      
      {/* Content */}
      <div className="relative z-10 pt-3">
        {/* Icon with glow */}
        <div className="relative inline-block mb-3 md:mb-4">
          <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl scale-150 group-hover:scale-175 transition-transform duration-500" />
          <div className="relative text-4xl md:text-5xl transform group-hover:scale-110 transition-transform duration-500">
            {icon}
          </div>
        </div>
        
        {/* Title */}
        <h3 className="font-script-hindi text-2xl sm:text-3xl md:text-4xl text-[#5a2d1a] mb-3 md:mb-4">
          {title} समारोह
        </h3>
        
        {/* Date with Calendar Icon */}
        <div className="flex items-center justify-center gap-2 mb-2 md:mb-3 bg-gradient-to-r from-gold/20 via-gold/30 to-gold/20 rounded-xl py-2 md:py-2.5 px-4 border border-gold/20">
          <span className="text-base md:text-lg">📅</span>
          <p className="text-[#5a2d1a] font-hindi text-sm md:text-base font-semibold">
            {date}
          </p>
        </div>
        
        <p className="font-hindi text-[#8B4513]/80 text-sm md:text-base mb-4">
          {day}
        </p>

        {/* Click hint */}
        <div className="flex items-center justify-center gap-2 text-gold group-hover:text-gold-dark transition-colors">
          <span className="font-hindi text-xs md:text-sm font-medium">समय एवं स्थान देखें</span>
          <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
      
      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
    </div>
  </div>
);

export default Index;
