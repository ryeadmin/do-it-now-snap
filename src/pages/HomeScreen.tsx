import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MobileLayout } from '@/components/MobileLayout';
import { LiveIndicator } from '@/components/LiveIndicator';
import { LocationSelector } from '@/components/LocationSelector';
import { BottomNav } from '@/components/BottomNav';
import { Zap, Search, Plus } from 'lucide-react';
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
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-28">
        <div className="text-center w-full max-w-sm animate-slide-up">
          {/* Live Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-live/10 rounded-full mb-6">
            <LiveIndicator size="sm" />
            <span className="text-sm font-semibold text-live">
              12 players active now
            </span>
          </div>

          {/* Logo */}
          <h1 className="text-5xl font-black tracking-tight text-foreground mb-2">
            Do<span className="text-primary">It</span>Now
          </h1>
          <p className="text-base text-muted-foreground mb-8">
            Match. Play. Instantly.
          </p>

          {/* Primary CTA - Start Now */}
          <div className="mb-8">
            <Button
              variant="action"
              size="xl"
              onClick={() => navigate('/matching')}
              className="w-full h-20 text-xl shadow-glow hover:scale-105 transition-transform"
            >
              <Zap className="w-7 h-7" />
              Start Now
            </Button>
            <p className="text-sm text-muted-foreground mt-3">
              Match with players ready now
            </p>
          </div>

          {/* Secondary Actions */}
          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/feed')}
              className="flex-1 h-14"
            >
              <Search className="w-5 h-5 mr-2" />
              Find Game
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/create')}
              className="flex-1 h-14"
            >
              <Plus className="w-5 h-5 mr-2" />
              Host Game
            </Button>
          </div>

          {/* Sports */}
          <p className="text-sm text-muted-foreground mt-8">
            🏀 ⚽ 🎾 🏐 🏃
          </p>
        </div>
      </main>

      <BottomNav />
    </MobileLayout>
  );
}
