import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MobileLayout } from '@/components/MobileLayout';
import { LiveIndicator } from '@/components/LiveIndicator';
import { LocationSelector } from '@/components/LocationSelector';
import { BottomNav } from '@/components/BottomNav';
import { Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HomeScreen() {
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = useState('Downtown');

  return (
    <MobileLayout className="flex flex-col">
      {/* Header */}
      <header className="px-6 pt-safe-top">
        <div className="flex items-center justify-between py-4">
          <LocationSelector 
            currentLocation={currentLocation}
            onLocationChange={setCurrentLocation}
          />
          <button 
            onClick={() => navigate('/profile')}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
          >
            <span className="text-lg">👤</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-32">
        <div className="text-center space-y-6 animate-slide-up">
          {/* Live Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-live/10 rounded-full">
            <LiveIndicator size="sm" />
            <span className="text-sm font-semibold text-live">
              12 games happening now
            </span>
          </div>

          {/* Logo / Title */}
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tight text-foreground">
              Play<span className="text-primary">Now</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Find players nearby. Join instantly.
            </p>
          </div>

          {/* Location Context */}
          <p className="text-sm text-muted-foreground">
            Showing games near <span className="text-primary font-semibold">{currentLocation}</span>
          </p>

          {/* Main CTA */}
          <div className="pt-4">
            <Button
              variant="action"
              size="xl"
              onClick={() => navigate('/feed')}
              className="shadow-glow"
            >
              <Zap className="w-6 h-6" />
              Find a Game
            </Button>
          </div>

          {/* Secondary info */}
          <p className="text-sm text-muted-foreground pt-2">
            🏀 ⚽ 🎾 🏐 🏃 and more
          </p>
        </div>
      </main>

      <BottomNav />
    </MobileLayout>
  );
}
