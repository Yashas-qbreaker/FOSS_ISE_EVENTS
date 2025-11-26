import { useState } from "react";
import { ExternalLink } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import EventButton from "@/components/EventButton";
import ScheduleModal from "@/components/ScheduleModal";
import PartnerStrip from "@/components/PartnerStrip";
import iseLogo from "@/assets/ISE_LOGO.png";
import fossLogo from "@/assets/FOSS_CLUB_LOGO.png";

const Index = () => {
  const [scheduleOpen, setScheduleOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <AnimatedBackground />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
      {/* Top Brand Lockup */}
      <header className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-5 relative z-10 animate-fade-in">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <img 
            src={iseLogo} 
            alt="ISE Logo" 
            className="h-14 w-14 md:h-20 md:w-20 object-contain transition-transform duration-500 hover:scale-110 hover:rotate-6" 
          />
          <div className="text-center flex-1 px-4">
            <p className="text-base md:text-lg lg:text-xl font-semibold text-foreground/90 tracking-wide transition-all duration-300 hover:text-foreground">
              PES College of Engineering, Mandya
            </p>
            <p className="text-xs md:text-sm lg:text-base text-muted-foreground uppercase tracking-wider transition-all duration-300 hover:text-accent">
              Department of ISE • FOSS Club
            </p>
          </div>
          <img 
            src={fossLogo} 
            alt="FOSS Club Logo" 
            className="h-14 w-14 md:h-20 md:w-20 object-contain transition-transform duration-500 hover:scale-110 hover:-rotate-6" 
          />
        </div>
      </header>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-6 md:py-0 relative z-10">
          <div className="max-w-4xl lg:max-w-6xl w-full mx-auto">
            <div className="grid lg:grid-cols-[2fr,1fr] gap-12 items-center">
              {/* Left Column: Main Hero */}
              <div className="space-y-8 text-center lg:text-left animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-base sm:text-lg uppercase tracking-widest text-accent font-medium animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    Inter-College Tech Fest
                  </p>
                  <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-tight md:leading-[0.95] tracking-tighter">
                    <span className="block gradient-text animate-fade-in transition-all duration-300 hover:scale-105" style={{ animationDelay: '0.4s' }}>PESCE Mandya</span>
                    <span className="block text-foreground mt-2 animate-fade-in transition-all duration-300 hover:scale-105" style={{ animationDelay: '0.5s' }}>FOSS Club Presents</span>
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                    Two events. One campus. Build, learn, and connect with peers.
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-stretch animate-fade-in" style={{ animationDelay: '0.7s' }}>
                  <EventButton to="/event-one">
                    PIXEL2PORTAL
                  </EventButton>
                  <EventButton to="/event-two">
                    BLIND CODE GOLF
                  </EventButton>
                </div>

                {/* Helper Link */}
                <button
                  onClick={() => setScheduleOpen(true)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 inline-flex items-center gap-2 group animate-fade-in hover:gap-3"
                  style={{ animationDelay: '0.8s' }}
                >
                  View schedule & rules
                  <ExternalLink className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </div>

              {/* Right Column: About */}
              <div className="relative glass-card p-8 xl:p-10 space-y-5 hidden lg:block overflow-hidden rounded-3xl border-2 border-primary/20 animate-fade-in transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.25)] max-w-md lg:max-w-lg lg:translate-x-4 xl:translate-x-8">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-full blur-3xl animate-pulse-glow" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/20 via-primary/10 to-transparent rounded-full blur-2xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
                <div className="relative z-10">
                  <h2 className="text-2xl font-heading font-semibold gradient-text transition-all duration-300 hover:scale-105">
                    About Us
                  </h2>
                  <p className="text-base text-foreground/75 leading-relaxed">
                    The Department of Information Science & Engineering at PES College of Engineering, 
                    Mandya, is committed to fostering innovation and technical excellence. Our FOSS Club 
                    champions open-source culture, bringing together passionate students to build, learn, 
                    and create meaningful technology solutions that drive real-world impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Partner Strip */}
        <PartnerStrip />
      </div>

      {/* Schedule Modal */}
      <ScheduleModal open={scheduleOpen} onOpenChange={setScheduleOpen} />
    </div>
  );
};

export default Index;
