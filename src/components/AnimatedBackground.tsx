const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Dynamic Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-start/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-mid/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '5s' }} />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-end/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '10s' }} />
      <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '15s' }} />
      
      {/* Animated Particles */}
      <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-primary/40 rounded-full animate-pulse-glow" style={{ animationDelay: '0s' }} />
      <div className="absolute top-[60%] right-[15%] w-2 h-2 bg-accent/40 rounded-full animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-[30%] left-[20%] w-2 h-2 bg-gradient-mid/40 rounded-full animate-pulse-glow" style={{ animationDelay: '4s' }} />
      <div className="absolute top-[40%] right-[30%] w-1.5 h-1.5 bg-primary/30 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-[50%] left-[40%] w-1.5 h-1.5 bg-accent/30 rounded-full animate-pulse-glow" style={{ animationDelay: '3s' }} />
      
      {/* Subtle Grid with Animation - darker/softer */}
      <div 
        className="absolute inset-0 opacity-[0.006] animate-pulse" 
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)/0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)/0.4) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animationDuration: '12s'
        }}
      />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background" />
    </div>
  );
};

export default AnimatedBackground;
