import { MobileLayout } from '@/components/MobileLayout';
import { ActivityCard } from '@/components/ActivityCard';
import { LiveIndicator } from '@/components/LiveIndicator';
import { mockActivities } from '@/data/mockActivities';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function FeedScreen() {
  const navigate = useNavigate();

  return (
    <MobileLayout className="flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center gap-2">
              <LiveIndicator size="sm" />
              <h1 className="font-bold text-lg">Last-Minute</h1>
            </div>

            <Button variant="ghost" size="icon-sm">
              <SlidersHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
          <button className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold whitespace-nowrap">
            All Sports
          </button>
          <button className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium whitespace-nowrap">
            🏀 Basketball
          </button>
          <button className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium whitespace-nowrap">
            ⚽ Soccer
          </button>
          <button className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium whitespace-nowrap">
            🎾 Tennis
          </button>
        </div>
      </header>

      {/* Feed */}
      <main className="flex-1 p-4 pb-24 overflow-y-auto">
        <div className="space-y-3 stagger-children">
          {mockActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onClick={() => navigate(`/activity/${activity.id}`)}
            />
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-background/95 backdrop-blur-sm border-t border-border">
        <div className="flex items-center justify-around py-4 pb-safe-bottom">
          <button 
            onClick={() => navigate('/')}
            className="flex flex-col items-center gap-1 text-muted-foreground"
          >
            <span className="text-2xl">🏠</span>
            <span className="text-xs font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-primary">
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
