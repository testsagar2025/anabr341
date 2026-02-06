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
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#722424] animate-spin mx-auto mb-4" />
          <p className="font-hindi text-[#722424]/70 tracking-wider text-lg">
            निमंत्रण पत्र लोड हो रहा है...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (guestId && error) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white">
        <div className="text-center max-w-md mx-6">
          <p className="font-hindi-display text-[#722424] text-2xl mb-2">
            क्षमा करें
          </p>
          <p className="font-hindi text-[#722424]/60 text-lg">
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

        {/* Animated Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-cream via-background to-cream-dark opacity-80" />
          
          {/* Floating Floral Elements */}
          <div className="absolute top-[8%] left-[6%] text-gold/25 text-5xl animate-float">✿</div>
          <div className="absolute top-[15%] right-[10%] text-gold/20 text-4xl animate-float-slow" style={{ animationDelay: "1s" }}>❀</div>
          <div className="absolute bottom-[25%] left-[10%] text-gold/20 text-4xl animate-float" style={{ animationDelay: "2s" }}>✿</div>
          <div className="absolute bottom-[10%] right-[8%] text-gold/25 text-5xl animate-float-slow" style={{ animationDelay: "0.5s" }}>❀</div>
          <div className="absolute top-[45%] left-[4%] text-gold/15 text-3xl animate-float" style={{ animationDelay: "1.5s" }}>❧</div>
          <div className="absolute top-[35%] right-[5%] text-gold/15 text-3xl animate-float-slow" style={{ animationDelay: "2.5s" }}>❧</div>
          
          {/* Ambient Light Effects */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-radial from-gold/8 to-transparent rounded-full blur-3xl animate-glow" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-radial from-royal-red/5 to-transparent rounded-full blur-3xl animate-glow" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-radial from-gold/5 to-transparent rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative" style={{ zIndex: 10 }}>
          {/* Hero Section */}
          <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
            <div className="w-full max-w-5xl">
              {/* Ganesha & Shlok Section */}
              <Parallax3DWrapper intensity={8} className="mb-10">
                <div className="ganesha-section text-center">
                  {/* Outer Decorative Frame */}
                  <div className="relative inline-block p-6 md:p-10">
                    {/* Elegant Border Frame */}
                    <div className="absolute inset-0 border border-gold/30 rounded-2xl" />
                    <div className="absolute inset-2 border border-gold/20 rounded-xl" />
                    
                    {/* Corner Ornaments */}
                    <div className="absolute -top-1 -left-1 w-8 h-8 md:w-10 md:h-10">
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-gold to-transparent" />
                      <div className="absolute top-0 left-0 h-full w-0.5 bg-gradient-to-b from-gold to-transparent" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-8 h-8 md:w-10 md:h-10">
                      <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-gold to-transparent" />
                      <div className="absolute top-0 right-0 h-full w-0.5 bg-gradient-to-b from-gold to-transparent" />
                    </div>
                    <div className="absolute -bottom-1 -left-1 w-8 h-8 md:w-10 md:h-10">
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gold to-transparent" />
                      <div className="absolute bottom-0 left-0 h-full w-0.5 bg-gradient-to-t from-gold to-transparent" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 md:w-10 md:h-10">
                      <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-gold to-transparent" />
                      <div className="absolute bottom-0 right-0 h-full w-0.5 bg-gradient-to-t from-gold to-transparent" />
                    </div>

                    {/* Ganesha Container */}
                    <div className="relative mb-5 animate-divine-entrance">
                      {/* Soft Glow Effect */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-36 h-36 md:w-44 md:h-44 bg-gradient-radial from-gold/25 via-gold/10 to-transparent rounded-full blur-2xl animate-pulse-glow" />
                      </div>
                      
                      {/* Subtle Ring */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 md:w-40 md:h-40 border border-gold/15 rounded-full" />
                      </div>
                      
                      {/* Ganesha Image */}
                      <div className="relative z-10 py-2">
                        <img 
                          src={ganeshaImage} 
                          alt="श्री गणेश" 
                          className="relative w-24 h-24 md:w-32 md:h-32 object-contain mx-auto ganesha-image animate-float"
                        />
                      </div>
                    </div>

                    {/* Shlok Container */}
                    <div className="relative max-w-xs md:max-w-sm mx-auto animate-fade-in" style={{ animationDelay: "0.3s" }}>
                      <img 
                        src={shlokImage} 
                        alt="वक्रतुण्ड महाकाय श्लोक" 
                        className="w-full h-auto object-contain shlok-image mx-auto"
                        style={{ maxHeight: '60px' }}
                      />
                    </div>

                    {/* Simple Divider */}
                    <div className="flex items-center justify-center gap-3 mt-5 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                      <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-gold/50" />
                      <span className="text-gold text-sm">✦</span>
                      <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-gold/50" />
                    </div>
                  </div>
                </div>
              </Parallax3DWrapper>

              {/* Title Section with 3D effect */}
              <Parallax3DWrapper intensity={8} className="mb-8 md:mb-12">
                <div className="text-center px-2">
                  {/* Shubh Vivah Header */}
                  <div className="inline-block mb-4 md:mb-6 animate-fade-in-down">
                    <p className="text-gold font-script-hindi text-xl md:text-2xl lg:text-3xl mb-3">
                      शुभ विवाह आमंत्रण
                    </p>
                    <div className="flex items-center justify-center gap-2 md:gap-3">
                      <span className="text-gold text-sm md:text-base">✦</span>
                      <p className="text-gold font-hindi text-base md:text-lg">
                        ॥ श्री गणेशाय नमः ॥
                      </p>
                      <span className="text-gold text-sm md:text-base">✦</span>
                    </div>
                  </div>
                  
                  {/* Invitation Text */}
                  <div className="mb-4 md:mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                    <p className="font-hindi text-base md:text-lg text-royal-red/80 mb-2">
                      उत्सव परिणय बंधन का...
                    </p>
                  </div>
                  
                  {/* Couple Names - Main Title */}
                  <h1 className="font-script-hindi text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-royal-red mb-4 md:mb-6 drop-shadow-lg animate-fade-in-up text-shadow-elegant title-3d leading-tight" style={{ animationDelay: "0.2s" }}>
                    विपिन & प्रिया
                  </h1>
                  
                  <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                    <div className="h-px w-12 md:w-24 lg:w-28 bg-gradient-to-r from-transparent via-gold to-gold" />
                    <Heart className="w-5 h-5 md:w-6 md:h-6 text-gold animate-pulse-soft" fill="currentColor" />
                    <div className="h-px w-12 md:w-24 lg:w-28 bg-gradient-to-l from-transparent via-gold to-gold" />
                  </div>
                  
                  {/* Wedding Description */}
                  <p className="font-hindi text-sm md:text-base lg:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed animate-fade-in px-4" style={{ animationDelay: "0.4s" }}>
                    मान्यवर, हम सपरिवार सादर आमंत्रित करते हैं आपको हमारे यहाँ आयोजित शुभ विवाह समारोह में।
                  </p>
                </div>
              </Parallax3DWrapper>

              {/* Video Player with 3D pop-out effect */}
              <div className="mb-16 animate-slide-up" style={{ animationDelay: "0.6s" }}>
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
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/60 to-transparent" />
            <div className="relative z-10">
              <Parallax3DWrapper intensity={5}>
                <CountdownTimer targetDate={weddingDate} />
              </Parallax3DWrapper>
            </div>
          </section>

          {/* Events Section */}
          <section className="py-12 md:py-20 lg:py-28 px-3 md:px-4">
            <div className="max-w-5xl mx-auto">
              <Parallax3DWrapper intensity={6}>
                <div className="text-center mb-8 md:mb-14">
                  <p className="text-gold font-hindi text-base md:text-lg mb-2 md:mb-3 animate-fade-in">
                    ॥ मंगल उत्सव ॥
                  </p>
                  <h2 className="font-script-hindi text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground animate-fade-in-up title-3d" style={{ animationDelay: "0.1s" }}>
                    मांगलिक कार्यक्रमों का विवरण
                  </h2>
                  <div className="flex items-center justify-center gap-2 md:gap-3 mt-3 md:mt-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-gold/60" />
                    <span className="text-gold text-base md:text-lg">✦</span>
                    <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-gold/60" />
                  </div>
                </div>
              </Parallax3DWrapper>

              {/* Dynamic Events from API or Default */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-4xl mx-auto">
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
          <footer className="relative py-10 md:py-14 px-4 border-t border-gold/20 bg-gradient-to-t from-[#722424]/5 via-card/60 to-transparent overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-gradient-radial from-gold/5 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-gradient-radial from-royal-red/5 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-5xl mx-auto text-center">
              {/* Decorative Top Element */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent via-gold/40 to-gold/60" />
                <div className="flex items-center gap-2">
                  <span className="text-gold/60 text-sm animate-twinkle">✧</span>
                  <span className="text-gold text-lg animate-pulse-soft">❧</span>
                  <span className="text-gold/60 text-sm animate-twinkle" style={{ animationDelay: '0.5s' }}>✧</span>
                </div>
                <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent via-gold/40 to-gold/60" />
              </div>
              
              <p className="font-hindi text-muted-foreground text-sm md:text-base mb-4 leading-relaxed">
                कृपया इस पवित्र बंधन में शामिल होकर हमें अपने आशीर्वाद से कृतार्थ करें।
              </p>
              
              <p className="text-muted-foreground/60 text-xs md:text-sm font-hindi mb-6">
                © 2026 विपिन & प्रिया विवाह
              </p>
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
    <div className="absolute -inset-2 bg-gradient-to-br from-gold/25 via-gold-light/15 to-gold/25 rounded-2xl md:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
    
    {/* Card */}
    <div className="relative elegant-card rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 text-center group-hover:shadow-3d-hover transition-all duration-500 group-hover:-translate-y-2 overflow-hidden card-3d h-full">
      {/* Event Number Badge */}
      <div className="absolute -top-2 -left-2 md:-top-3 md:-left-3 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center shadow-lg z-20">
        <span className="text-royal-red-dark font-display text-sm md:text-base font-bold">{index}</span>
      </div>
      
      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-5 h-5 md:w-6 md:h-6 border-t-2 border-l-2 border-gold/40 group-hover:border-gold/70 rounded-tl-xl md:rounded-tl-2xl transition-colors duration-500" />
      <div className="absolute top-0 right-0 w-5 h-5 md:w-6 md:h-6 border-t-2 border-r-2 border-gold/40 group-hover:border-gold/70 rounded-tr-xl md:rounded-tr-2xl transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 w-5 h-5 md:w-6 md:h-6 border-b-2 border-l-2 border-gold/40 group-hover:border-gold/70 rounded-bl-xl md:rounded-bl-2xl transition-colors duration-500" />
      <div className="absolute bottom-0 right-0 w-5 h-5 md:w-6 md:h-6 border-b-2 border-r-2 border-gold/40 group-hover:border-gold/70 rounded-br-xl md:rounded-br-2xl transition-colors duration-500" />
      
        {/* Content */}
        <div className="relative z-10 pt-2">
          {/* Icon */}
          <div className="text-3xl md:text-4xl mb-2 md:mb-3 transform group-hover:scale-110 transition-transform duration-500">
            {icon}
          </div>
          
          {/* Title */}
          <h3 className="font-script-hindi text-xl sm:text-2xl md:text-3xl text-foreground mb-2 md:mb-3">
            {title} समारोह
          </h3>
          
          {/* Date with Calendar Icon */}
          <div className="flex items-center justify-center gap-1.5 md:gap-2 mb-2 bg-gold/10 rounded-lg py-1.5 md:py-2 px-3">
            <span className="text-sm md:text-base">📅</span>
            <p className="text-gold font-hindi text-sm md:text-base font-semibold">
              {date}
            </p>
          </div>
          
          <p className="font-hindi text-muted-foreground text-xs md:text-sm mb-3">
            {day}
          </p>

          {/* Click hint */}
          <div className="flex items-center justify-center gap-2 text-gold/70 group-hover:text-gold transition-colors">
            <span className="font-hindi text-xs md:text-sm">समय एवं स्थान देखें</span>
            <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      
      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/8 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
    </div>
  </div>
);

export default Index;
