import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";

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
  "bg-gradient-to-br from-rose-100 via-pink-50 to-amber-100",
  "bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100",
  "bg-gradient-to-br from-emerald-100 via-teal-50 to-lime-100",
  "bg-gradient-to-br from-violet-100 via-fuchsia-50 to-purple-100",
  "bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-100",
  "bg-gradient-to-br from-slate-100 via-gray-50 to-zinc-100",
];

const Quotes = () => {
  const [quoteIndex, setQuoteIndex] = useState<number>(0);
  const [bgIndex, setBgIndex] = useState<number>(0);

  useEffect(() => {
    // Randomize on mount to ensure a fresh experience per visit/refresh
    setQuoteIndex(Math.floor(Math.random() * QUOTES.length));
    setBgIndex(Math.floor(Math.random() * BACKGROUNDS.length));
  }, []);

  const quote = useMemo(() => QUOTES[quoteIndex] ?? QUOTES[0], [quoteIndex]);
  const bg = useMemo(() => BACKGROUNDS[bgIndex] ?? BACKGROUNDS[0], [bgIndex]);

  return (
    <div className="min-h-screen">
      <section className={`py-20 px-4 ${bg}`}>
        <div className="container mx-auto max-w-4xl">
          <Card className="p-10 md:p-16 bg-white/70 backdrop-blur-sm border-secondary/20 card-shadow">
            <div className="text-center animate-fade-in">
              <blockquote className="text-2xl md:text-4xl font-semibold leading-snug text-primary">
                “{quote}”
              </blockquote>
              <p className="mt-6 md:mt-8 text-sm md:text-base text-muted-foreground">
                Have a nice day!
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Quotes;
