import { Button } from '@/components/ui/button';
import { MobileLayout } from '@/components/MobileLayout';
import { LiveIndicator } from '@/components/LiveIndicator';
import { MapPin, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HomeScreen() {
  const navigate = useNavigate();

  return (
    <MobileLayout className="flex flex-col">
      {/* Header */}
      <header className="px-6 pt-safe-top">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">Downtown</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-lg">👤</span>
          </div>
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

      {/* Bottom Navigation Hint */}
      <nav className="absolute bottom-0 left-0 right-0 px-6 pb-safe-bottom">
        <div className="flex items-center justify-around py-4 border-t border-border">
          <button className="flex flex-col items-center gap-1 text-primary">
            <span className="text-2xl">🏠</span>
            <span className="text-xs font-medium">Home</span>
          </button>
          <button 
            onClick={() => navigate('/feed')}
            className="flex flex-col items-center gap-1 text-muted-foreground"
          >
            <span className="text-2xl">🔍</span>
            <span className="text-xs font-medium">Browse</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground">
            <span className="text-2xl">💬</span>
            <span className="text-xs font-medium">Chats</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground">
            <span className="text-2xl">👤</span>
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </MobileLayout>
  );
}
