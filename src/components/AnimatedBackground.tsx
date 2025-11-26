import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Predefined pattern - create a structured grid-like web
    const createPattern = (width: number, height: number) => {
      const particles: Array<{
        baseX: number;
        baseY: number;
        x: number;
        y: number;
        radius: number;
        phaseX: number;
        phaseY: number;
        speedX: number;
        speedY: number;
      }> = [];

      const cols = 8;
      const rows = 6;
      const spacingX = width / (cols + 1);
      const spacingY = height / (rows + 1);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const baseX = spacingX * (col + 1);
          const baseY = spacingY * (row + 1);
          
          particles.push({
            baseX,
            baseY,
            x: baseX,
            y: baseY,
            radius: Math.random() * 1.5 + 0.8,
            phaseX: Math.random() * Math.PI * 2,
            phaseY: Math.random() * Math.PI * 2,
            speedX: (Math.random() - 0.5) * 0.02 + 0.01,
            speedY: (Math.random() - 0.5) * 0.02 + 0.01,
          });
        }
      }

      return particles;
    };

    let particles = createPattern(canvas.width, canvas.height);

    // Helper function to snap angle to geometric angles (multiples of 45 degrees)
    const snapToAngle = (angle: number, snapDegrees: number = 45) => {
      const snapRadians = (Math.PI / 180) * snapDegrees;
      return Math.round(angle / snapRadians) * snapRadians;
    };

    let animationFrame: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      timeRef.current += 0.01;

      // Update particles with slow, smooth movement
      particles.forEach((particle) => {
        // Slow circular motion around base position
        const offsetX = Math.sin(timeRef.current * particle.speedX + particle.phaseX) * 15;
        const offsetY = Math.cos(timeRef.current * particle.speedY + particle.phaseY) * 15;
        
        particle.x = particle.baseX + offsetX;
        particle.y = particle.baseY + offsetY;
      });

      // Draw angular connections
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((other) => {
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 180) {
            const angle = Math.atan2(dy, dx);
            const snappedAngle = snapToAngle(angle, 45);
            
            // Create angular path with intermediate point
            const midX = (particle.x + other.x) / 2;
            const midY = (particle.y + other.y) / 2;
            
            // Calculate perpendicular offset for angular effect
            const perpAngle = snappedAngle + Math.PI / 2;
            const offsetDistance = Math.min(distance * 0.2, 25);
            const controlX = midX + Math.cos(perpAngle) * offsetDistance;
            const controlY = midY + Math.sin(perpAngle) * offsetDistance;

            // Draw angular connection
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(controlX, controlY);
            ctx.lineTo(other.x, other.y);
            
            const opacity = (1 - distance / 180) * 0.2;
            ctx.strokeStyle = `rgba(138, 43, 226, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      // Draw particles
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(138, 43, 226, 0.3)`;
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="tech-background">
      <div className="circuit-overlay"></div>
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: "screen" }}
      />
    </div>
  );
};

export default AnimatedBackground;
