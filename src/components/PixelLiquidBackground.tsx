import { useEffect, useRef } from "react";

/*          *     .        *  .    *    *   . 
 .  *  move your mouse to over the stars   .
 *  .  .   change these values:   .  *
   .      * .        .          * .       */
const STAR_COLOR = "#fff";
const STAR_SIZE = 3;
const STAR_MIN_SCALE = 0.2;
const OVERFLOW_THRESHOLD = 50;

const PixelLiquidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const starsRef = useRef<Array<{ x: number; y: number; z: number }>>([]);
  const velocityRef = useRef({ x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 });
  const pointerRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const touchInputRef = useRef(false);
  const scaleRef = useRef(1);
  const widthRef = useRef(0);
  const heightRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const STAR_COUNT = Math.floor((window.innerWidth + window.innerHeight) / 8);

    // Generate stars
    const generate = () => {
      starsRef.current = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        starsRef.current.push({
          x: 0,
          y: 0,
          z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
        });
      }
    };

    const placeStar = (star: { x: number; y: number; z: number }) => {
      star.x = Math.random() * widthRef.current;
      star.y = Math.random() * heightRef.current;
    };

    const recycleStar = (star: { x: number; y: number; z: number }) => {
      const velocity = velocityRef.current;
      let direction = "z";

      const vx = Math.abs(velocity.x);
      const vy = Math.abs(velocity.y);

      if (vx > 1 || vy > 1) {
        let axis;
        if (vx > vy) {
          axis = Math.random() < vx / (vx + vy) ? "h" : "v";
        } else {
          axis = Math.random() < vy / (vx + vy) ? "v" : "h";
        }

        if (axis === "h") {
          direction = velocity.x > 0 ? "l" : "r";
        } else {
          direction = velocity.y > 0 ? "t" : "b";
        }
      }

      star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

      if (direction === "z") {
        star.z = 0.1;
        star.x = Math.random() * widthRef.current;
        star.y = Math.random() * heightRef.current;
      } else if (direction === "l") {
        star.x = -OVERFLOW_THRESHOLD;
        star.y = heightRef.current * Math.random();
      } else if (direction === "r") {
        star.x = widthRef.current + OVERFLOW_THRESHOLD;
        star.y = heightRef.current * Math.random();
      } else if (direction === "t") {
        star.x = widthRef.current * Math.random();
        star.y = -OVERFLOW_THRESHOLD;
      } else if (direction === "b") {
        star.x = widthRef.current * Math.random();
        star.y = heightRef.current + OVERFLOW_THRESHOLD;
      }
    };

    const resize = () => {
      scaleRef.current = window.devicePixelRatio || 1;
      widthRef.current = window.innerWidth * scaleRef.current;
      heightRef.current = window.innerHeight * scaleRef.current;

      canvas.width = widthRef.current;
      canvas.height = heightRef.current;

      starsRef.current.forEach(placeStar);
    };

    const update = () => {
      const velocity = velocityRef.current;
      velocity.tx *= 0.96;
      velocity.ty *= 0.96;

      velocity.x += (velocity.tx - velocity.x) * 0.8;
      velocity.y += (velocity.ty - velocity.y) * 0.8;

      starsRef.current.forEach((star) => {
        star.x += velocity.x * star.z;
        star.y += velocity.y * star.z;

        star.x += (star.x - widthRef.current / 2) * velocity.z * star.z;
        star.y += (star.y - heightRef.current / 2) * velocity.z * star.z;
        star.z += velocity.z;

        if (
          star.x < -OVERFLOW_THRESHOLD ||
          star.x > widthRef.current + OVERFLOW_THRESHOLD ||
          star.y < -OVERFLOW_THRESHOLD ||
          star.y > heightRef.current + OVERFLOW_THRESHOLD
        ) {
          recycleStar(star);
        }
      });
    };

    const render = () => {
      const velocity = velocityRef.current;
      starsRef.current.forEach((star) => {
        context.beginPath();
        context.lineCap = "round";
        context.lineWidth = STAR_SIZE * star.z * scaleRef.current;
        context.globalAlpha = 0.5 + 0.5 * Math.random();
        context.strokeStyle = STAR_COLOR;

        context.beginPath();
        context.moveTo(star.x, star.y);

        let tailX = velocity.x * 2;
        let tailY = velocity.y * 2;

        if (Math.abs(tailX) < 0.1) tailX = 0.5;
        if (Math.abs(tailY) < 0.1) tailY = 0.5;

        context.lineTo(star.x + tailX, star.y + tailY);
        context.stroke();
      });
    };

    const step = () => {
      context.clearRect(0, 0, widthRef.current, heightRef.current);
      update();
      render();
      animationFrameRef.current = requestAnimationFrame(step);
    };

    const movePointer = (x: number, y: number) => {
      const pointer = pointerRef.current;
      const velocity = velocityRef.current;

      if (typeof pointer.x === "number" && typeof pointer.y === "number") {
        const ox = x - pointer.x;
        const oy = y - pointer.y;

        velocity.tx =
          velocity.tx +
          (ox / (8 * scaleRef.current)) * (touchInputRef.current ? 1 : -1);
        velocity.ty =
          velocity.ty +
          (oy / (8 * scaleRef.current)) * (touchInputRef.current ? 1 : -1);
      }

      pointer.x = x;
      pointer.y = y;
    };

    const onMouseMove = (event: MouseEvent) => {
      touchInputRef.current = false;
      movePointer(event.clientX, event.clientY);
    };

    const onTouchMove = (event: TouchEvent) => {
      touchInputRef.current = true;
      movePointer(event.touches[0].clientX, event.touches[0].clientY);
      event.preventDefault();
    };

    const onMouseLeave = () => {
      pointerRef.current.x = null;
      pointerRef.current.y = null;
    };

    // Initialize
    generate();
    resize();
    step();

    // Event listeners
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", onMouseLeave);
    document.addEventListener("mouseleave", onMouseLeave);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onMouseLeave);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default PixelLiquidBackground;


