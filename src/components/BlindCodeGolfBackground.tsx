import { useEffect, useRef } from "react";

const langs = [
  "Hello World",
  "مرحبا بالعالم",
  "Salam Dünya",
  "Прывітанне Сусвет",
  "Здравей свят",
  "ওহে বিশ্ব",
  "Zdravo svijete",
  "Hola món",
  "Kumusta Kalibutan",
  "Ahoj světe",
  "Helo Byd",
  "Hej Verden",
  "Hallo Welt",
  "Γειά σου Κόσμε",
  "Hello World",
  "Hello World",
  "Hola Mundo",
  "Tere, Maailm",
  "Kaixo Mundua",
  "سلام دنیا",
  "Hei maailma",
  "Bonjour le monde",
  "Dia duit an Domhan",
  "Ola mundo",
  "હેલો વર્લ્ડ",
  "Sannu Duniya",
  "नमस्ते दुनिया",
  "Hello World",
  "Pozdrav svijete",
  "Bonjou Mondyal la",
  "Helló Világ",
  "Բարեւ աշխարհ",
  "Halo Dunia",
  "Ndewo Ụwa",
  "Halló heimur",
  "Ciao mondo",
  "שלום עולם",
  "こんにちは世界",
  "Hello World",
  "Გამარჯობა მსოფლიო",
  "Сәлем Әлем",
  "សួស្តី​ពិភពលោក",
  "ಹಲೋ ವರ್ಲ್ಡ್",
  "안녕하세요 월드",
  "Ciao mondo",
  "ສະ​ບາຍ​ດີ​ຊາວ​ໂລກ",
  "Labas pasauli",
  "Sveika pasaule",
  "Hello World",
  "Kia Ora",
  "Здраво свету",
  "ഹലോ വേൾഡ്",
  "Сайн уу",
  "हॅलो वर्ल्ड",
  "Hai dunia",
  "Hello dinja",
  "မင်္ဂလာပါကမ္ဘာလောက",
  "नमस्कार संसार",
  "Hallo Wereld",
  "Hei Verden",
  "Moni Dziko Lapansi",
  "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਦੁਨਿਆ",
  "Witaj świecie",
  "Olá Mundo",
  "Salut Lume",
  "Привет, мир",
  "හෙලෝ වර්ල්ඩ්",
  "Ahoj svet",
  "Pozdravljen, svet",
  "Waad salaaman tihiin",
  "Përshendetje Botë",
  "Здраво Свете",
  "Lefatše Lumela",
  "Halo Dunya",
  "Hej världen",
  "Salamu, Dunia",
  "ஹலோ வேர்ல்ட்",
  "హలో వరల్డ్",
  "Салом Ҷаҳон",
  "สวัสดีชาวโลก",
  "Kamusta Mundo",
  "Selam Dünya",
  "Привіт Світ",
  "ہیلو ورلڈ",
  "Salom Dunyo",
  "Chào thế giới",
  "העלא וועלט",
  "Mo ki O Ile Aiye",
  "你好，世界",
  "你好，世界",
  "你好，世界",
  "Sawubona Mhlaba",
];

const CHAR_SIZE = 18;

class Char {
  value: string;
  x: number;
  y: number;
  speed: number;

  constructor(value: string, x: number, y: number, speed: number) {
    this.value = value;
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  draw(ctx: CanvasRenderingContext2D, height: number) {
    const flick = Math.random() * 100;

    // 10% chance of flickering a number instead
    if (flick < 10) {
      ctx.fillStyle = "hsl(120, 30%, 70%)";
      ctx.fillText(String(Math.round(Math.random() * 9)), this.x, this.y);
    } else {
      ctx.fillStyle = "hsl(160, 100%, 70%)";
      ctx.fillText(this.value, this.x, this.y);
    }

    // fall down
    this.y = this.y > height ? 0 : this.y + this.speed;
  }
}

class Stream {
  chars: Char[];

  constructor(text: string, x: number, canvasHeight: number) {
    const y = Math.random() * (text.length * 4);
    const speed = 2 + Math.random() * 8;
    this.chars = [];

    for (let i = text.length; i >= 0; i--) {
      const ch = text[i] ?? "";
      this.chars.push(
        new Char(ch, x, (y + text.length - i) * CHAR_SIZE, speed)
      );
    }

    // ensure chars fill the vertical space
    this.chars = this.chars.filter((c) => c.y < canvasHeight + CHAR_SIZE * 2);
  }

  draw(ctx: CanvasRenderingContext2D, height: number) {
    this.chars.forEach((c, i) => {
      // 30% chance of lit tail
      const lit = Math.random() * 100;
      if (lit < 30) {
        if (i === this.chars.length - 1) {
          ctx.fillStyle = "hsl(120, 50%, 80%)";
        } else {
          ctx.fillStyle = "hsl(120, 100%, 75%)";
        }
      }

      c.draw(ctx, height);
    });
  }
}

const BlindCodeGolfBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let streams: Stream[] = [];
    let animationFrameId: number;

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      streams = [];
      for (let x = 0; x < width; x += CHAR_SIZE) {
        const text = langs[Math.floor(Math.random() * langs.length)];
        streams.push(new Stream(text, x, height));
      }

      ctx.font = `${CHAR_SIZE}px monospace`;
    };

    const render = () => {
      const { width, height } = canvas;
      // slight translucent black to create trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.fillRect(0, 0, width, height);

      streams.forEach((s) => s.draw(ctx, height));
      animationFrameId = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    animationFrameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default BlindCodeGolfBackground;


