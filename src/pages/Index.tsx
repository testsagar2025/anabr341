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

const Scene3D = lazy(() => import("@/components/Scene3D"));

const Index = () => {
  const [searchParams] = useSearchParams();
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<{
    event: EventDetail;
    icon: string;
    description: string;
  } | null>(null);
  
  const guestId = searchParams.get('id') || '';
  const { guestData, loading, error } = useGuestData(guestId || null);

  const handleOpenInvitation = useCallback(() => {
    setShowEnvelope(false);
  }, []);

  const handleEventClick = useCallback((eventKey: string, title: string, date: string, day: string, icon: string, description: string) => {
    setSelectedEvent({
      event: { eventKey, title, date, day },
      icon,
      description,
    });
  }, []);

  const handleCloseEventDialog = useCallback(() => {
    setSelectedEvent(null);
  }, []);
  
  const weddingDate = new Date("2026-04-28T18:00:00");

  if (guestId && loading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-[#722424] animate-spin mx-auto mb-3" />
          <p className="font-hindi text-[#722424]/70 tracking-wider text-base">
            निमंत्रण पत्र लोड हो रहा है...
          </p>
        </div>
      </div>
    );
  }

  if (guestId && error) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white">
        <div className="text-center max-w-md mx-6">
          <p className="font-hindi-display text-[#722424] text-xl mb-2">क्षमा करें</p>
          <p className="font-hindi text-[#722424]/60 text-base">{error}</p>
        </div>
      </div>
    );
  }

  const mainContent = (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-background to-cream-dark opacity-80" />
        <div className="absolute top-[8%] left-[6%] text-gold/25 text-4xl md:text-5xl animate-float">✿</div>
        <div className="absolute top-[15%] right-[10%] text-gold/20 text-3xl md:text-4xl animate-float-slow" style={{ animationDelay: "1s" }}>❀</div>
        <div className="absolute bottom-[25%] left-[10%] text-gold/20 text-3xl md:text-4xl animate-float" style={{ animationDelay: "2s" }}>✿</div>
        <div className="absolute bottom-[10%] right-[8%] text-gold/25 text-4xl md:text-5xl animate-float-slow" style={{ animationDelay: "0.5s" }}>❀</div>
        <div className="absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-radial from-gold/8 to-transparent rounded-full blur-3xl animate-glow" />
        <div className="absolute bottom-0 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-gradient-radial from-royal-red/5 to-transparent rounded-full blur-3xl animate-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* Content */}
      <div className="relative" style={{ zIndex: 10 }}>
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-3 md:px-4 py-8 md:py-14">
          <div className="w-full max-w-3xl">
            {/* Ganesha & Shlok */}
            <Parallax3DWrapper intensity={8} className="mb-6 md:mb-10">
              <div className="text-center">
                <div className="relative inline-block p-4 md:p-8">
                  <div className="absolute inset-0 border border-gold/30 rounded-xl md:rounded-2xl" />
                  <div className="absolute inset-1.5 md:inset-2 border border-gold/20 rounded-lg md:rounded-xl" />
                  
                  {/* Corner Ornaments */}
                  {['-top-1 -left-1', '-top-1 -right-1', '-bottom-1 -left-1', '-bottom-1 -right-1'].map((pos, i) => (
                    <div key={i} className={`absolute ${pos} w-6 h-6 md:w-10 md:h-10`}>
                      <div className={`absolute ${pos.includes('top') ? 'top-0' : 'bottom-0'} ${pos.includes('left') ? 'left-0' : 'right-0'} w-full h-0.5 bg-gradient-to-${pos.includes('left') ? 'r' : 'l'} from-gold to-transparent`} />
                      <div className={`absolute ${pos.includes('top') ? 'top-0' : 'bottom-0'} ${pos.includes('left') ? 'left-0' : 'right-0'} h-full w-0.5 bg-gradient-to-${pos.includes('top') ? 'b' : 't'} from-gold to-transparent`} />
                    </div>
                  ))}

                  {/* Ganesha */}
                  <div className="relative mb-4 animate-divine-entrance">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-28 h-28 md:w-44 md:h-44 bg-gradient-radial from-gold/25 via-gold/10 to-transparent rounded-full blur-2xl animate-pulse-glow" />
                    </div>
                    <div className="relative z-10 py-1">
                      <img src={ganeshaImage} alt="श्री गणेश" className="relative w-20 h-20 md:w-32 md:h-32 object-contain mx-auto ganesha-image animate-float" />
                    </div>
                  </div>

                  {/* Shlok Image */}
                  <div className="relative max-w-[200px] md:max-w-sm mx-auto animate-fade-in" style={{ animationDelay: "0.3s" }}>
                    <img src={shlokImage} alt="श्लोक" className="w-full h-auto object-contain mx-auto" style={{ maxHeight: '50px' }} />
                  </div>

                  {/* Full Shlok Text */}
                  <div className="mt-3 md:mt-5 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                    <p className="font-hindi text-[10px] sm:text-xs md:text-sm text-royal-red/60 leading-relaxed">
                      वक्रतुण्ड महाकाय, सूर्यकोटि समप्रभः।
                    </p>
                    <p className="font-hindi text-[10px] sm:text-xs md:text-sm text-royal-red/60 leading-relaxed">
                      निर्विघ्नं कुरू मे देव, सर्व कार्येषु सर्वदा॥
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-3 mt-4 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                    <div className="h-px w-10 md:w-20 bg-gradient-to-r from-transparent to-gold/50" />
                    <span className="text-gold text-sm">✦</span>
                    <div className="h-px w-10 md:w-20 bg-gradient-to-l from-transparent to-gold/50" />
                  </div>
                </div>
              </div>
            </Parallax3DWrapper>

            {/* Title & Invitation */}
            <Parallax3DWrapper intensity={8} className="mb-6 md:mb-10">
              <div className="text-center px-2">
                <div className="inline-block mb-3 md:mb-5 animate-fade-in-down">
                  <p className="text-gold font-script-hindi text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2">
                    शुभ विवाह आमंत्रण
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-gold text-xs md:text-sm">✦</span>
                    <p className="text-gold font-hindi text-sm md:text-base">॥ श्री गणेशाय नमः ॥</p>
                    <span className="text-gold text-xs md:text-sm">✦</span>
                  </div>
                </div>
                
                <div className="mb-3 md:mb-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                  <p className="font-hindi text-sm md:text-base text-royal-red/70">परिण्योत्सव के मांगलिक पल....</p>
                </div>

                {/* Mahadev Blessing */}
                <div className="mb-3 md:mb-5 animate-fade-in" style={{ animationDelay: "0.15s" }}>
                  <p className="font-hindi text-xs sm:text-sm text-gold/80 leading-relaxed">
                    ब्रम्हाण्ड गुरू, देवों के देव महादेव भगवान शिव जी की असीम कृपा से
                  </p>
                </div>
                
                {/* Couple Names */}
                <h1 className="font-script-hindi text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-royal-red mb-3 md:mb-5 drop-shadow-lg animate-fade-in-up text-shadow-elegant title-3d leading-tight" style={{ animationDelay: "0.2s" }}>
                  विपिन & प्रिया
                </h1>
                
                <div className="flex items-center justify-center gap-3 mb-3 md:mb-5 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                  <div className="h-px w-10 md:w-24 bg-gradient-to-r from-transparent via-gold to-gold" />
                  <Heart className="w-4 h-4 md:w-6 md:h-6 text-gold animate-pulse-soft" fill="currentColor" />
                  <div className="h-px w-10 md:w-24 bg-gradient-to-l from-transparent via-gold to-gold" />
                </div>
                
                <p className="font-hindi text-xs sm:text-sm md:text-base text-muted-foreground max-w-md mx-auto leading-relaxed animate-fade-in px-3" style={{ animationDelay: "0.4s" }}>
                  मान्यवर, हम सपरिवार सादर आमंत्रित करते हैं आपको हमारे यहाँ आयोजित शुभ विवाह समारोह में।
                </p>
              </div>
            </Parallax3DWrapper>

            {/* Family Details Section */}
            <Parallax3DWrapper intensity={5} className="mb-6 md:mb-10">
              <div className="max-w-2xl mx-auto px-2">
                <div className="elegant-card rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-8 text-center relative overflow-hidden">
                  {/* Decorative corners */}
                  <div className="absolute top-0 left-0 w-5 h-5 md:w-8 md:h-8 border-t-2 border-l-2 border-gold/40 rounded-tl-xl" />
                  <div className="absolute top-0 right-0 w-5 h-5 md:w-8 md:h-8 border-t-2 border-r-2 border-gold/40 rounded-tr-xl" />
                  <div className="absolute bottom-0 left-0 w-5 h-5 md:w-8 md:h-8 border-b-2 border-l-2 border-gold/40 rounded-bl-xl" />
                  <div className="absolute bottom-0 right-0 w-5 h-5 md:w-8 md:h-8 border-b-2 border-r-2 border-gold/40 rounded-br-xl" />

                  {/* Groom Details */}
                  <div className="mb-4 md:mb-6 animate-fade-in">
                    <p className="text-gold text-xs tracking-[0.2em] uppercase mb-1 font-display">वर पक्ष</p>
                    <h3 className="font-script-hindi text-xl sm:text-2xl md:text-3xl text-royal-red mb-2">
                      हृदयांश बिपिन गुप्ता
                    </h3>
                    <div className="font-hindi text-[10px] sm:text-xs md:text-sm text-muted-foreground leading-relaxed space-y-0.5">
                      <p>सुपौत्र — स्व० परम ज्योति देवी एवं स्व० वंशीधर गुप्ता</p>
                      <p>सुपुत्र — स्व० कमलावती देवी एवं स्व० रामकिशुन गुप्ता</p>
                      <p className="text-gold/70 mt-1">ग्राम: भरथिया कादीपुर, पोस्ट-लीलारी भरौली</p>
                      <p className="text-gold/70">जनपद: मऊ (उ.प्र.)</p>
                    </div>
                  </div>

                  {/* Divider with "संग" */}
                  <div className="flex items-center justify-center gap-2 md:gap-3 my-3 md:my-5">
                    <div className="h-px w-10 md:w-16 bg-gradient-to-r from-transparent to-gold/50" />
                    <span className="font-script-hindi text-gold text-base md:text-lg">संग</span>
                    <div className="h-px w-10 md:w-16 bg-gradient-to-l from-transparent to-gold/50" />
                  </div>

                  {/* Bride Details */}
                  <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                    <p className="text-gold text-xs tracking-[0.2em] uppercase mb-1 font-display">वधू पक्ष</p>
                    <h3 className="font-script-hindi text-xl sm:text-2xl md:text-3xl text-royal-red mb-2">
                      हृदयकणिका प्रिया गुप्ता
                    </h3>
                    <div className="font-hindi text-[10px] sm:text-xs md:text-sm text-muted-foreground leading-relaxed space-y-0.5">
                      <p>सुपौत्री — श्रीमती अतवारी देवी एवं स्व० शिवनाथ गुप्ता</p>
                      <p>सुपुत्री — श्रीमती अनिता देवी एवं श्री राजकुमार गुप्ता</p>
                      <p className="text-gold/70 mt-1">ग्राम: बेला कसैला, पोस्ट-बेला कसैला</p>
                      <p className="text-gold/70">जनपद: मऊ (उ.प्र.)</p>
                    </div>
                  </div>

                  {/* Final blessing */}
                  <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-gold/20 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    <p className="font-hindi text-xs sm:text-sm text-royal-red/70 leading-relaxed">
                      विपिन व प्रिया के पावन परिणय में आपकी स्नेहिल उपस्थिति सादर प्रार्थनीय है
                    </p>
                  </div>
                </div>
              </div>
            </Parallax3DWrapper>

            {/* Video Player */}
            <div className="mb-8 md:mb-14 animate-slide-up px-1 md:px-0" style={{ animationDelay: "0.6s" }}>
              <WeddingVideoPlayer />
            </div>
          </div>
        </section>

        {/* Countdown Section */}
        <section className="py-8 md:py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/60 to-transparent" />
          <div className="relative z-10">
            <Parallax3DWrapper intensity={5}>
              <CountdownTimer targetDate={weddingDate} />
            </Parallax3DWrapper>
          </div>
        </section>

        {/* Key Highlights Section */}
        <section className="py-8 md:py-14 px-3 md:px-4">
          <div className="max-w-3xl mx-auto">
            <div className="elegant-card rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-5 h-5 md:w-8 md:h-8 border-t-2 border-l-2 border-gold/40 rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-5 h-5 md:w-8 md:h-8 border-t-2 border-r-2 border-gold/40 rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-5 h-5 md:w-8 md:h-8 border-b-2 border-l-2 border-gold/40 rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-5 h-5 md:w-8 md:h-8 border-b-2 border-r-2 border-gold/40 rounded-br-xl" />

              {/* Quick highlights grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5 mb-4 md:mb-6">
                <div className="p-3 md:p-4 bg-gold/5 rounded-xl border border-gold/10">
                  <p className="text-2xl md:text-3xl mb-1">🌻</p>
                  <p className="font-script-hindi text-base md:text-lg text-foreground">शुभ हल्दी</p>
                  <p className="font-hindi text-[10px] sm:text-xs text-gold">रविवार 26 अप्रैल 2026</p>
                </div>
                <div className="p-3 md:p-4 bg-royal-red/5 rounded-xl border border-royal-red/10">
                  <p className="text-2xl md:text-3xl mb-1">💒</p>
                  <p className="font-script-hindi text-base md:text-lg text-foreground">शुभ विवाह</p>
                  <p className="font-hindi text-[10px] sm:text-xs text-gold">मंगलवार 28 अप्रैल 2026</p>
                </div>
                <div className="p-3 md:p-4 bg-gold/5 rounded-xl border border-gold/10">
                  <p className="text-2xl md:text-3xl mb-1">👋</p>
                  <p className="font-script-hindi text-base md:text-lg text-foreground">विदाई</p>
                  <p className="font-hindi text-[10px] sm:text-xs text-gold">बुधवार 29 अप्रैल 2026, प्रातः</p>
                </div>
              </div>

              {/* Barat Info */}
              <div className="bg-gradient-to-r from-royal-red/5 via-royal-red/10 to-royal-red/5 rounded-xl p-3 md:p-4 border border-royal-red/10 mb-4 md:mb-6">
                <p className="text-gold text-xs tracking-[0.15em] uppercase mb-1 font-display">बारात प्रस्थान</p>
                <p className="font-hindi text-xs sm:text-sm text-foreground/80 leading-relaxed">
                  बारात हमारे निवास स्थान से आरक्षित वाहन द्वारा सायं ४ बजे से प्रस्थान करेगी।
                </p>
              </div>

              {/* Haldi Poem */}
              <div className="bg-gradient-to-br from-gold/5 to-gold/10 rounded-xl p-3 md:p-5 border border-gold/15">
                <p className="font-hindi text-xs sm:text-sm text-foreground/75 leading-relaxed italic mb-2">
                  "हल्दी है, चन्दन है, दो रिश्तों का बन्धन है<br />
                  मेरे चाचू की शादी में आपका अभिनन्दन है..."
                </p>
                <p className="font-hindi text-[10px] sm:text-xs text-gold/70">
                  — नन्ही परी मानवी गुप्ता
                </p>
              </div>

              {/* Another verse */}
              <div className="mt-3 md:mt-5 pt-3 md:pt-4 border-t border-gold/15">
                <p className="font-hindi text-xs sm:text-sm text-foreground/65 leading-relaxed italic">
                  "अर्पित है अति प्रेम सहित, श्रीमान निमंत्रण यह लीजिए,<br />
                  आनन्द भरे शुभ अवसर पर अवश्य ही दर्शन दीजिए।"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-8 md:py-16 lg:py-24 px-3 md:px-4">
          <div className="max-w-5xl mx-auto">
            <Parallax3DWrapper intensity={6}>
              <div className="text-center mb-6 md:mb-12">
                <p className="text-gold font-hindi text-sm md:text-base mb-2 animate-fade-in">
                  ॥ मंगल उत्सव ॥
                </p>
                <h2 className="font-script-hindi text-xl sm:text-2xl md:text-4xl lg:text-5xl text-foreground animate-fade-in-up title-3d" style={{ animationDelay: "0.1s" }}>
                  मांगलिक कार्यक्रमों का विवरण
                </h2>
                <div className="flex items-center justify-center gap-2 mt-2 md:mt-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-gold/60" />
                  <span className="text-gold text-sm md:text-base">✦</span>
                  <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-gold/60" />
                </div>
              </div>
            </Parallax3DWrapper>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 max-w-4xl mx-auto">
              {guestData && guestData.events && guestData.events.length > 0 ? (
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
                <>
                  <Parallax3DWrapper intensity={10} popOut>
                    <EventCard eventKey="rasum" title="रसुम" date="20 अप्रैल, 2026" day="सोमवार" time="शुभ मुहूर्त" icon="🪷" description="पवित्र रसुम समारोह में आपकी उपस्थिति से हमें अपार प्रसन्नता की अनुभूति होगी।" delay={0.3} index={1} onClick={handleEventClick} />
                  </Parallax3DWrapper>
                  <Parallax3DWrapper intensity={10} popOut>
                    <EventCard eventKey="tilak" title="तिलक" date="22 अप्रैल, 2026" day="बुधवार" time="शुभ मुहूर्त" icon="🔴" description="तिलक की शुभ परंपरा का निर्वहन किया जाएगा।" delay={0.4} index={2} onClick={handleEventClick} />
                  </Parallax3DWrapper>
                  <Parallax3DWrapper intensity={10} popOut>
                    <EventCard eventKey="haldi" title="हल्दी" date="26 अप्रैल, 2026" day="रविवार" time="शुभ मुहूर्त" icon="🌻" description="हल्दी का पवित्र समारोह।" delay={0.5} index={3} onClick={handleEventClick} />
                  </Parallax3DWrapper>
                  <Parallax3DWrapper intensity={10} popOut>
                    <EventCard eventKey="mehndi" title="मेहंदी" date="27 अप्रैल, 2026" day="सोमवार" time="शुभ मुहूर्त" icon="🌿" description="मेहंदी की खुशियों में भरा एक मंगलमय पल।" delay={0.6} index={4} onClick={handleEventClick} />
                  </Parallax3DWrapper>
                  <Parallax3DWrapper intensity={10} popOut>
                    <EventCard eventKey="shadi" title="विवाह" date="28 अप्रैल, 2026" day="मंगलवार" time="शुभ मुहूर्त" icon="💒" description="पवित्र अग्नि के साक्षी रहते दो आत्माओं का मिलन होगा।" delay={0.7} index={5} onClick={handleEventClick} />
                  </Parallax3DWrapper>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-8 md:py-12 px-4 border-t border-gold/20 bg-gradient-to-t from-[#722424]/5 via-card/60 to-transparent overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 left-1/4 w-48 md:w-64 h-48 md:h-64 bg-gradient-radial from-gold/5 to-transparent rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10 md:w-20 bg-gradient-to-r from-transparent via-gold/40 to-gold/60" />
              <span className="text-gold text-lg animate-pulse-soft">❧</span>
              <div className="h-px w-10 md:w-20 bg-gradient-to-l from-transparent via-gold/40 to-gold/60" />
            </div>
            <p className="font-hindi text-muted-foreground text-xs sm:text-sm md:text-base mb-3 leading-relaxed">
              कृपया इस पवित्र बंधन में शामिल होकर हमें अपने आशीर्वाद से कृतार्थ करें।
            </p>
            <p className="text-muted-foreground/60 text-[10px] sm:text-xs font-hindi">
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
      
      {guestData && showEnvelope && (
        <InvitationEnvelope guestData={guestData} onOpen={handleOpenInvitation} />
      )}
      
      {(!guestData || !showEnvelope) && mainContent}

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
    <div className="absolute -inset-2 bg-gradient-to-br from-gold/25 via-gold-light/15 to-gold/25 rounded-xl md:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
    
    <div className="relative elegant-card rounded-lg md:rounded-xl p-3 sm:p-4 md:p-5 text-center group-hover:shadow-3d-hover transition-all duration-500 group-hover:-translate-y-2 overflow-hidden card-3d h-full">
      <div className="absolute -top-1.5 -left-1.5 md:-top-2 md:-left-2 w-7 h-7 md:w-9 md:h-9 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center shadow-lg z-20">
        <span className="text-royal-red-dark font-display text-xs md:text-sm font-bold">{index}</span>
      </div>
      
      <div className="absolute top-0 left-0 w-4 h-4 md:w-6 md:h-6 border-t-2 border-l-2 border-gold/40 group-hover:border-gold/70 rounded-tl-lg md:rounded-tl-xl transition-colors duration-500" />
      <div className="absolute top-0 right-0 w-4 h-4 md:w-6 md:h-6 border-t-2 border-r-2 border-gold/40 group-hover:border-gold/70 rounded-tr-lg md:rounded-tr-xl transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 w-4 h-4 md:w-6 md:h-6 border-b-2 border-l-2 border-gold/40 group-hover:border-gold/70 rounded-bl-lg md:rounded-bl-xl transition-colors duration-500" />
      <div className="absolute bottom-0 right-0 w-4 h-4 md:w-6 md:h-6 border-b-2 border-r-2 border-gold/40 group-hover:border-gold/70 rounded-br-lg md:rounded-br-xl transition-colors duration-500" />
      
      <div className="relative z-10 pt-1.5">
        <div className="text-2xl md:text-3xl mb-1.5 md:mb-2 transform group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        <h3 className="font-script-hindi text-lg sm:text-xl md:text-2xl text-foreground mb-1.5 md:mb-2">
          {title} समारोह
        </h3>
        <div className="flex items-center justify-center gap-1.5 mb-1.5 bg-gold/10 rounded-lg py-1 md:py-1.5 px-2">
          <span className="text-xs md:text-sm">📅</span>
          <p className="text-gold font-hindi text-xs md:text-sm font-semibold">{date}</p>
        </div>
        <p className="font-hindi text-muted-foreground text-[10px] md:text-xs mb-2">{day}</p>
        <div className="flex items-center justify-center gap-1.5 text-gold/70 group-hover:text-gold transition-colors">
          <span className="font-hindi text-[10px] md:text-xs">समय एवं स्थान देखें</span>
          <span className="text-[10px] group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/8 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
    </div>
  </div>
);

export default Index;
