import {
  ArrowLeft,
  BookOpen,
  UserPlus,
  Calendar,
  MapPin,
  Users,
  Globe,
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  X,
  Brain,
  Smile,
  Clock,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BlindCodeGolfBackground from "@/components/BlindCodeGolfBackground";
import poster from "@/assets/poster_2.jpg";
import fossLogo from "@/assets/FOSS_CLUB_LOGO.png";

const EventTwo = () => {
  return (
    <div className="min-h-screen relative overflow-y-auto">
      <BlindCodeGolfBackground />
      
      <div className="relative z-10">
        {/* Back Button */}
        <div className="container mx-auto px-4 md:px-6 pt-6">
        <Link to="/">
            <Button variant="ghost" className="hover:bg-accent/50">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        </div>

        {/* Main Layout */}
        <div className="container mx-auto px-4 md:px-6 py-8">
          {/* Mobile Banner - Show on mobile, hide on desktop */}
          <div className="lg:hidden mb-6">
            <div className="rounded-2xl overflow-hidden border border-border/30 shadow-lg">
              <img 
                src={poster} 
                alt="Blind Code Golf Event Poster" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-[400px,1fr] gap-8 items-start">
            {/* Left Sidebar - Hidden on mobile */}
            <aside className="hidden lg:block space-y-6 sticky top-8">
              {/* Event Banner/Poster */}
              <div className="rounded-2xl overflow-hidden border border-border/30 shadow-lg">
                <img 
                  src={poster} 
                  alt="Blind Code Golf Event Poster" 
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Presented By */}
              <div className="glass-card p-5 rounded-2xl border border-border/50 backdrop-blur-xl bg-background/40">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  Presented by
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">FOSS Club</p>
                      <p className="text-xs text-muted-foreground">PESCE Mandya</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="h-8 text-xs">
                    Subscribe
                  </Button>
                </div>
              </div>

              {/* Icons */}
              <div className="flex items-center gap-4">
                <button className="w-8 h-8 rounded-full bg-background/40 border border-border/50 flex items-center justify-center hover:bg-background/60 transition-colors">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="w-8 h-8 rounded-full bg-background/40 border border-border/50 flex items-center justify-center hover:bg-background/60 transition-colors">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Hosted By */}
              <div className="glass-card p-5 rounded-2xl border border-border/50 backdrop-blur-xl bg-background/40">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  Hosted By
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                        FC
                      </div>
                      <p className="text-sm font-medium text-foreground">FOSS Club</p>
                    </div>
                    <button className="w-6 h-6 rounded-full hover:bg-background/60 flex items-center justify-center transition-colors">
                      <X className="w-3 h-3 text-muted-foreground" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white text-xs font-bold">
                        ISE
                      </div>
                      <p className="text-sm font-medium text-foreground">ISE Department</p>
                    </div>
                    <button className="w-6 h-6 rounded-full hover:bg-background/60 flex items-center justify-center transition-colors">
                      <X className="w-3 h-3 text-muted-foreground" />
                    </button>
                </div>
                </div>
              </div>

              {/* Links */}
              <div className="space-y-2">
                <a
                  href="mailto:fossclub@pesce.ac.in"
                  className="block text-sm text-accent hover:text-primary transition-colors"
                >
                  Contact the Host
                </a>
                <a
                  href="#"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Report Event
                </a>
              </div>

              {/* Tag */}
              <div className="pt-2">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  # Coding
                </span>
            </div>
            </aside>

            {/* Right Main Content */}
            <main className="space-y-6">
              {/* Featured Tag */}
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-muted/50 text-muted-foreground text-xs font-medium flex items-center gap-1.5">
                  <Brain className="w-3 h-3" />
                  Featured in PESCE Tech Fest
                </span>
          </div>

              {/* Event Title */}
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground">
                  Blind Code Golf
              </h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                Competitive Code Optimization Challenge
              </p>
            </div>

              {/* Event Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center justify-center px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
                    <span className="text-xs font-bold text-primary leading-none">DEC</span>
                    <span className="text-2xl font-bold text-primary leading-none">5</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Saturday, December 5, 2025</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      10:00 AM - Dec 5, 6:00 PM
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>PESCE Mandya Campus</span>
                  <ArrowRight className="w-3 h-3" />
                  <span className="text-foreground">Mandya, Karnataka</span>
                </div>
              </div>

              {/* Registration Status Card */}
              <div className="glass-card p-6 rounded-2xl border border-border/50 backdrop-blur-xl bg-background/40 relative">
                <div className="absolute top-4 right-4">
                  <span className="px-2 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Starting in 5d 10h
                  </span>
                </div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Smile className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      Registration Open
                    </h3>
                    <p className="text-sm text-foreground/70 mb-4">
                      Register now to secure your spot for this competitive coding challenge. 
                      We will confirm your registration shortly.
                    </p>
                    <div className="flex items-center gap-3 mb-4">
                      <Link to="/register-blind-code-golf">
                        <Button size="sm" variant="outline" className="gap-2">
                          <Calendar className="w-4 h-4" />
                          Register Now
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Send className="w-4 h-4" />
                        Invite a Friend
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      No longer able to attend?{" "}
                      <a href="#" className="text-accent hover:underline">
                        Notify the host by canceling your registration
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>

              {/* Location Section */}
              <div className="glass-card p-6 rounded-2xl border border-border/50 backdrop-blur-xl bg-background/40">
                <h2 className="text-xl font-heading font-semibold text-foreground mb-4">
                  Location
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      PESCE Mandya Campus
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PES College of Engineering, Mandya, Karnataka 571401, India
                    </p>
                  </div>
                  {/* Google Maps Embed */}
                  <div className="rounded-lg overflow-hidden border border-border/30">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.1234567890123!2d76.8954!3d12.5236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDMxJzI1LjAiTiA3NsKwNTMnNDMuNCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin&q=PES+College+of+Engineering+Mandya"
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full"
                      title="PESCE Mandya Campus Location"
                    />
                  </div>
                  <a
                    href="https://maps.app.goo.gl/csftRugL7AQRvoDaA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-accent hover:text-primary transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    View on Google Maps
                  </a>
                </div>
              </div>

              {/* Contact Section */}
              <div className="glass-card p-6 rounded-2xl border border-border/50 backdrop-blur-xl bg-background/40">
                <h2 className="text-xl font-heading font-semibold text-foreground mb-4">
                  For Queries
                </h2>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Yashas Gowda A</p>
                    <a
                      href="tel:+919071265960"
                      className="text-sm text-accent hover:text-primary transition-colors"
                    >
                      9071265960
                    </a>
                  </div>
                </div>
              </div>

              {/* Get Ready Section */}
              <div className="glass-card p-6 rounded-2xl border border-border/50 backdrop-blur-xl bg-background/40">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">
                      Get Ready for the Event
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Profile Complete • Reminder: SMS & Email
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              {/* About Event */}
              <div className="glass-card p-6 md:p-8 rounded-2xl border border-border/50 backdrop-blur-xl bg-background/40">
                <h2 className="text-2xl font-heading font-semibold text-foreground mb-4">
                  About Event
                </h2>
                <div className="space-y-4 text-foreground/80 leading-relaxed">
                  <p>
                  Blind Code Golf is a competitive and high-pressure coding event focused on writing 
                  the shortest and most efficient programs. The challenge intensifies in Round 1, where 
                  participants must code blindly — without a compiler, output, or error checking — 
                  relying only on logic and precision.
                </p>
                  
                  <div className="space-y-3 pt-4">
                    <h3 className="text-lg font-heading font-semibold text-foreground">
                      Competition Rounds
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-medium mt-0.5">
                          1
                        </span>
                        <div>
                          <p className="font-medium text-foreground">Round 1: Blind Coding</p>
                          <p className="text-sm text-foreground/70 mb-1">
                      No compiler, no output window, no syntax checking. Write code purely based on logic.
                    </p>
                    <p className="text-xs text-accent">Code evaluated only after submission</p>
                  </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-medium mt-0.5">
                          2
                        </span>
                        <div>
                          <p className="font-medium text-foreground">Round 2: Code Golf</p>
                          <p className="text-sm text-foreground/70 mb-1">
                      Compiler access allowed. Solve problems using the shortest possible working code.
                    </p>
                    <p className="text-xs text-accent">Line count is the major scoring factor</p>
                  </div>
                      </li>
                    </ul>
              </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                      Objectives
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Test logic, syntax mastery, and compact coding skills</li>
                  <li>Encourage writing clean, efficient, and minimal code</li>
                  <li>Develop problem-solving skills under pressure</li>
                  <li>Challenge participants to rely purely on reasoning</li>
                </ul>
              </div>

                  <div className="pt-4">
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                      Target Participants
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Students skilled in C, C++, Python, or Java</li>
                  <li>Teams of 2 members from technical backgrounds</li>
                  <li>Anyone interested in coding competitions and optimization</li>
                </ul>
              </div>

                  <div className="glass-card p-4 rounded-xl border border-destructive/30 bg-destructive/5 backdrop-blur-sm mt-4">
                <p className="text-sm font-medium text-foreground/90 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-destructive" />
                  No internet access allowed during the competition
                </p>
              </div>
            </div>
              </div>
            </main>
          </div>

          {/* Mobile Sidebar Content - Show on mobile, hide on desktop */}
          <div className="lg:hidden mt-8 space-y-6">
            {/* Presented By */}
            <div className="glass-card p-5 rounded-2xl border border-border/50 backdrop-blur-xl bg-background/40">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                Presented by
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">FOSS Club</p>
                    <p className="text-xs text-muted-foreground">PESCE Mandya</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="h-8 text-xs">
                  Subscribe
                </Button>
              </div>
            </div>

            {/* Hosted By */}
            <div className="glass-card p-5 rounded-2xl border border-border/50 backdrop-blur-xl bg-background/40">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                Hosted By
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                      FC
                    </div>
                    <p className="text-sm font-medium text-foreground">FOSS Club</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white text-xs font-bold">
                      ISE
                    </div>
                    <p className="text-sm font-medium text-foreground">ISE Department</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="space-y-2">
              <a
                href="mailto:fossclub@pesce.ac.in"
                className="block text-sm text-accent hover:text-primary transition-colors"
              >
                Contact the Host
              </a>
              <a
                href="#"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Report Event
              </a>
            </div>

            {/* Tag */}
            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                # Coding
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTwo;
