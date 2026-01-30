import { useState } from 'react';
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';

const slides = [
  {
    id: 'team',
    title: 'Team Intro',
  },
  {
    id: 'problem',
    title: 'Problem',
  },
  {
    id: 'solution',
    title: 'Solution Demo',
  },
  {
    id: 'business',
    title: 'Business Model',
  },
  {
    id: 'gtm',
    title: 'Go-To-Market',
  },
  {
    id: 'ask',
    title: 'Our Ask',
  },
];

const TeamSlide = () => (
  <div className="flex flex-col items-center justify-center h-full text-center px-8 bg-black text-white">
    <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8">
      DoItNow
    </h1>
    
    <div className="mb-12 space-y-2">
      <p className="text-xl md:text-2xl text-gray-400 font-medium">Team</p>
      <p className="text-2xl md:text-3xl font-bold">Your Team Name</p>
      <p className="text-lg md:text-xl text-gray-300">
        Member 1 · Member 2 · Member 3
      </p>
    </div>
    
    <div className="max-w-3xl">
      <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
        "Instantly match with nearby people who are ready to play sports —{' '}
        <span className="text-primary font-bold">right now.</span>"
      </p>
    </div>
  </div>
);

const ProblemSlide = () => (
  <div className="flex flex-col items-center justify-center h-full px-8 bg-black text-white">
    <h2 className="text-4xl md:text-6xl font-black mb-12 text-center">
      The Problem
    </h2>
    
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-start gap-4 text-xl md:text-2xl">
        <span className="text-red-500 text-3xl">✗</span>
        <p>"I want to play basketball... but who's free <span className="text-primary font-bold">right now?</span>"</p>
      </div>
      
      <div className="flex items-start gap-4 text-xl md:text-2xl">
        <span className="text-red-500 text-3xl">✗</span>
        <p>Group chats are <span className="text-gray-400">slow and noisy</span></p>
      </div>
      
      <div className="flex items-start gap-4 text-xl md:text-2xl">
        <span className="text-red-500 text-3xl">✗</span>
        <p>By the time someone replies, <span className="text-gray-400">motivation is gone</span></p>
      </div>
      
      <div className="flex items-start gap-4 text-xl md:text-2xl">
        <span className="text-red-500 text-3xl">✗</span>
        <p>Last-minute sports = <span className="text-red-400 font-bold">almost impossible</span></p>
      </div>
    </div>
  </div>
);

const SolutionSlide = () => (
  <div className="flex flex-col items-center justify-center h-full px-8 bg-black text-white">
    <h2 className="text-4xl md:text-6xl font-black mb-8 text-center">
      The Solution
    </h2>
    
    <p className="text-2xl md:text-3xl text-center text-gray-300 mb-12 max-w-2xl">
      DoItNow connects you with nearby players who are{' '}
      <span className="text-primary font-bold">available RIGHT NOW</span>
    </p>
    
    <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full">
      <div className="space-y-4 text-lg md:text-xl">
        <div className="flex items-center gap-3">
          <span className="text-2xl">1️⃣</span>
          <p>Tap <span className="text-primary font-bold">"Start Now"</span></p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl">2️⃣</span>
          <p>See who's available nearby</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl">3️⃣</span>
          <p>Match & chat instantly</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-2xl">4️⃣</span>
          <p>Meet up & play — <span className="text-green-400">in minutes!</span></p>
        </div>
      </div>
    </div>
    
    <p className="text-xl text-gray-400 mt-8 italic">
      → Now watch the live demo →
    </p>
  </div>
);

const BusinessSlide = () => (
  <div className="flex flex-col items-center justify-center h-full px-8 bg-black text-white">
    <h2 className="text-4xl md:text-6xl font-black mb-12 text-center">
      💰 Business Model
    </h2>
    
    <div className="space-y-8 max-w-2xl w-full">
      <div className="bg-gray-900 rounded-xl p-6">
        <p className="text-gray-400 text-lg mb-2">WHO PAYS?</p>
        <p className="text-2xl md:text-3xl font-bold">
          Urban consumers who want <span className="text-primary">spontaneous sports</span>
        </p>
      </div>
      
      <div className="bg-gray-900 rounded-xl p-6">
        <p className="text-gray-400 text-lg mb-2">HOW MUCH?</p>
        <p className="text-2xl md:text-3xl font-bold">
          <span className="text-green-400">€9.99</span> / month Premium
        </p>
      </div>
      
      <div className="bg-gray-900 rounded-xl p-6">
        <p className="text-gray-400 text-lg mb-2">WHY NOW?</p>
        <ul className="space-y-2 text-xl md:text-2xl">
          <li>→ Last-minute motivation is <span className="text-primary">time-sensitive</span></li>
          <li>→ Speed matters — Premium users <span className="font-bold">match first</span></li>
          <li>→ 1-month <span className="text-green-400">free trial</span> to start</li>
        </ul>
      </div>
    </div>
  </div>
);

const GTMSlide = () => (
  <div className="flex flex-col items-center justify-center h-full px-8 bg-black text-white">
    <h2 className="text-4xl md:text-6xl font-black mb-12 text-center">
      🚀 Go-To-Market
    </h2>
    
    <div className="space-y-6 max-w-2xl w-full">
      <div className="flex items-start gap-4">
        <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shrink-0">
          1
        </div>
        <div>
          <p className="text-2xl md:text-3xl font-bold">Students & Young Professionals</p>
          <p className="text-gray-400 text-lg">Most likely to want spontaneous activity</p>
        </div>
      </div>
      
      <div className="flex items-start gap-4">
        <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shrink-0">
          2
        </div>
        <div>
          <p className="text-2xl md:text-3xl font-bold">Universities, Gyms, Sports Venues</p>
          <p className="text-gray-400 text-lg">Launch where players already gather</p>
        </div>
      </div>
      
      <div className="flex items-start gap-4">
        <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shrink-0">
          3
        </div>
        <div>
          <p className="text-2xl md:text-3xl font-bold">Dense Urban Areas</p>
          <p className="text-gray-400 text-lg">Where last-minute plans happen daily</p>
        </div>
      </div>
    </div>
  </div>
);

const AskSlide = () => (
  <div className="flex flex-col items-center justify-center h-full px-8 bg-black text-white">
    <h2 className="text-4xl md:text-6xl font-black mb-12 text-center">
      🙏 Our Ask
    </h2>
    
    <div className="space-y-4 max-w-2xl text-xl md:text-2xl mb-16">
      <p className="flex items-center gap-3">
        <span className="text-primary">→</span>
        Feedback from founders and investors
      </p>
      <p className="flex items-center gap-3">
        <span className="text-primary">→</span>
        Support to test and refine DoItNow
      </p>
      <p className="flex items-center gap-3">
        <span className="text-primary">→</span>
        Help us bring this to market
      </p>
    </div>
    
    <div className="text-center">
      <h1 className="text-5xl md:text-7xl font-black mb-4">DoItNow</h1>
      <p className="text-2xl md:text-3xl text-primary font-medium italic">
        "Action, not planning."
      </p>
    </div>
  </div>
);

const slideComponents: Record<string, React.FC> = {
  team: TeamSlide,
  problem: ProblemSlide,
  solution: SolutionSlide,
  business: BusinessSlide,
  gtm: GTMSlide,
  ask: AskSlide,
};

const PitchDeckScreen = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const goPrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const CurrentSlideComponent = slideComponents[slides[currentSlide].id];

  return (
    <div className="h-screen w-screen bg-black relative overflow-hidden">
      {/* Slide Content */}
      <div className="h-full w-full">
        <CurrentSlideComponent />
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-4">
        {/* Prev Button */}
        <button
          onClick={goPrev}
          disabled={currentSlide === 0}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className="p-1"
            >
              <Circle
                className={`w-3 h-3 transition-colors ${
                  index === currentSlide
                    ? 'text-primary fill-primary'
                    : 'text-white/40'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={goNext}
          disabled={currentSlide === slides.length - 1}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Slide Counter */}
      <div className="absolute top-6 right-6 text-white/60 font-mono text-sm">
        {currentSlide + 1} / {slides.length}
      </div>

      {/* Skip to Demo Link */}
      {slides[currentSlide].id === 'solution' && (
        <a
          href="/"
          className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity"
        >
          Open App Demo →
        </a>
      )}
    </div>
  );
};

export default PitchDeckScreen;
