import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const QUOTES: string[] = [
  "Keep going, you're doing great.",
  "Every day is a new chance to grow.",
  "Your smile can change someone's day.",
  "Progress, not perfection.",
  "You are capable of amazing things.",
  "Be kind to yourself today.",
  "Small steps every day add up to big results.",
  "Let your light shine.",
  "Stay curious, stay kind.",
  "Good things take time.",
  "Believe in your journey.",
  "Dream big, start small.",
  "One step at a time.",
  "Choose joy today.",
  "You’ve got this.",
  "Be the reason someone smiles.",
  "Keep your head up.",
  "Shine from within.",
  "Trust the process.",
  "Gratitude changes everything.",
  "Your potential is endless.",
  "Do it with love.",
  "Make yourself proud.",
  "Focus on what you can control.",
  "Show up for yourself.",
  "Kindness is strength.",
  "Breathe. Reset. Continue.",
  "Small wins matter.",
  "Forward is forward.",
  "Let today be a good day.",
  "Keep choosing hope.",
  "Be gentle with yourself.",
  "Create your sunshine.",
  "Your pace is perfect.",
  "Take the next right step.",
  "Let it be simple.",
  "You are more than enough.",
  "Begin again.",
  "Energy flows where focus goes.",
  "You make a difference.",
  "Celebrate your progress.",
  "Do your best with what you have.",
  "Peace begins with a deep breath.",
  "Good things are coming.",
  "Learn, grow, glow.",
  "Rise and shine.",
  "Keep moving with grace.",
  "Focus on the good.",
  "Your future is bright.",
  "Kindness always wins.",
  "Trust your timing.",
  "Smile at the little things.",
  "Joy is a choice.",
  "Let your heart lead.",
  "You can do hard things.",
  "Believe and act.",
  "Stay soft, stay strong.",
  "Let go and grow.",
  "Be proud of how far you've come.",
  "Strength grows in quiet moments.",
  "New day, new chances.",
  "Light follows patience.",
  "Find calm in the present.",
  "Gentle progress is still progress.",
  "Nourish your mind with hope.",
  "Your kindness matters.",
  "Give yourself permission to rest.",
  "Slow is not a stop.",
  "Bloom where you are planted.",
  "Let your courage speak.",
  "Trust yourself a little more.",
  "Collect moments of peace.",
  "Your effort matters.",
  "Elevate your thoughts.",
  "Find beauty in small things.",
  "Keep watering your dreams.",
  "Grace over pressure.",
  "Make room for joy.",
  "Hope looks good on you.",
  "You’re doing better than you think.",
  "Let your progress be quiet.",
  "Calm minds create bright paths.",
  "Be patient with becoming.",
  "Your light is needed.",
  "Choose kindness daily.",
  "You are growing in the right direction.",
  "Keep faith in the little steps.",
  "Let your work speak softly.",
  "Keep showing up.",
  "Soft hearts change the world.",
  "Gentle effort, strong results.",
  "Joy finds the open heart.",
  "Steady and sincere.",
  "Your path is unfolding.",
  "Let hope anchor you.",
  "Be a quiet force of good.",
  "Shine kindly.",
  "Move with purpose and peace.",
  "Build the life you imagine.",
  "Be where your feet are.",
  "Light the day with gratitude.",
  "Believe in small beginnings.",
  "Bright days ahead.",
  "Grow through what you go through.",
];

const BACKGROUNDS: string[] = [
  "from-rose-100 via-pink-50 to-amber-100",
  "from-sky-100 via-blue-50 to-indigo-100",
  "from-emerald-100 via-teal-50 to-lime-100",
  "from-violet-100 via-fuchsia-50 to-purple-100",
  "from-orange-100 via-amber-50 to-yellow-100",
  "from-slate-100 via-gray-50 to-zinc-100",
];

// Decorative blobs (blurred gradient shapes) and stickers
const BackgroundDecor = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {/* Blurry gradient blobs */}
    <div className="absolute -top-10 -left-10 w-56 h-56 rounded-full bg-amber-200 blur-3xl opacity-30 animate-pulse" />
    <div className="absolute bottom-10 -right-10 w-64 h-64 rounded-full bg-sky-200 blur-3xl opacity-25 animate-pulse" />
    <div className="absolute top-1/2 -translate-y-1/2 left-10 w-52 h-52 rounded-full bg-violet-200 blur-3xl opacity-20" />

    {/* Subtle vector stickers (inline SVG) */}
    <svg className="absolute -top-6 -left-6 w-24 h-24 opacity-20 blur-[1px] text-amber-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M9.5 3.5c-2.7 0-5 2.3-5 5 0 2.1 1.3 3.9 3.2 4.6.5-1.4 1.7-2.6 3.1-3.1-.7-1.9-2.5-3.2-4.6-3.2 0-1.7 1.3-3 3-3 0 0 .3-.3.3-.3zM14.5 20.5c2.7 0 5-2.3 5-5 0-2.1-1.3-3.9-3.2-4.6-.5 1.4-1.7 2.6-3.1 3.1.7 1.9 2.5 3.2 4.6 3.2 0 1.7-1.3 3-3 3 0 0-.3.3-.3.3zM8 16c-1.1 0-2-.9-2-2 0-.7.4-1.4 1-1.8.4 1.4 1.4 2.4 2.8 2.8-.4.6-1.1 1-1.8 1z" />
    </svg>
    <svg className="absolute -bottom-8 -right-8 w-28 h-28 opacity-15 blur-[1px] text-amber-700/40" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 8h12a3 3 0 0 1 0 6H14a5 5 0 0 1-10 0V8zm13 1h1a2 2 0 0 1 0 4h-1V9zM6 18h8v2H6v-2z" />
    </svg>
  </div>
);

const Quotes = () => {
  const [quoteIndex, setQuoteIndex] = useState<number>(0);
  const [bgIndex, setBgIndex] = useState<number>(0);
  const [fadeKey, setFadeKey] = useState<number>(0);

  useEffect(() => {
    setQuoteIndex(Math.floor(Math.random() * QUOTES.length));
    setBgIndex(Math.floor(Math.random() * BACKGROUNDS.length));
  }, []);

  const quote = useMemo(() => QUOTES[quoteIndex] ?? QUOTES[0], [quoteIndex]);
  const bg = useMemo(() => BACKGROUNDS[bgIndex] ?? BACKGROUNDS[0], [bgIndex]);

  const showNewQuote = () => {
    const nextQuote = Math.floor(Math.random() * QUOTES.length);
    const nextBg = Math.floor(Math.random() * BACKGROUNDS.length);
    setQuoteIndex(nextQuote);
    setBgIndex(nextBg);
    setFadeKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen">
      <section className={`relative min-h-[calc(100vh-6rem-6rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br ${bg} transition-all duration-700`}>
        <BackgroundDecor />
        <div className="container mx-auto max-w-4xl">
          <Card className="relative p-8 md:p-14 bg-white/70 backdrop-blur-sm border-secondary/20 card-shadow">
            <div key={fadeKey} className="text-center animate-fade-in">
              <blockquote className="text-3xl md:text-5xl leading-tight font-serif text-primary transition-transform duration-300 hover:scale-[1.01]">
                “{quote}”
              </blockquote>
              <p className="mt-5 md:mt-7 text-sm md:text-base text-muted-foreground">
                Have a nice day!
              </p>
              <div className="mt-8">
                <Button variant="outline" size="lg" onClick={showNewQuote} className="transition-transform duration-300 hover:scale-[1.02]">
                  New Quote
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Quotes;
