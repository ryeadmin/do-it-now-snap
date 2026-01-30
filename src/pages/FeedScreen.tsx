import { useState, useMemo, useEffect } from 'react';
import { MobileLayout } from '@/components/MobileLayout';
import { ActivityCard } from '@/components/ActivityCard';
import { LiveIndicator } from '@/components/LiveIndicator';
import { mockActivities } from '@/data/mockActivities';
import { Activity, SportType } from '@/types/activity';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/BottomNav';
import { FilterSheet, FilterOptions, ActiveFilters } from '@/components/FilterSheet';
import { cn } from '@/lib/utils';

const sportTabs: { label: string; value: SportType | 'all'; icon: string }[] = [
  { label: 'All Sports', value: 'all', icon: '' },
  { label: 'Basketball', value: 'basketball', icon: '🏀' },
  { label: 'Soccer', value: 'soccer', icon: '⚽' },
  { label: 'Tennis', value: 'tennis', icon: '🎾' },
  { label: 'Padel', value: 'padel', icon: '🎾' },
  { label: 'Running', value: 'running', icon: '🏃' },
];

export default function FeedScreen() {
  const navigate = useNavigate();
  const [selectedSport, setSelectedSport] = useState<SportType | 'all'>('all');
  const [allActivities, setAllActivities] = useState<Activity[]>(mockActivities);
  const [filters, setFilters] = useState<FilterOptions>({
    distance: null,
    time: null,
    sport: null,
    spotsAvailable: false,
  });

  // Check for newly posted games on mount/focus
  useEffect(() => {
    const checkNewGame = () => {
      const newGameData = sessionStorage.getItem('newGame');
      if (newGameData) {
        const newGame = JSON.parse(newGameData) as Activity;
        // Add to activities if not already present
        setAllActivities(prev => {
          if (prev.some(a => a.id === newGame.id)) {
            return prev;
          }
          // Add new game at the top
          return [newGame, ...prev];
        });
      }
    };
    
    checkNewGame();
    
    // Also check when window regains focus
    window.addEventListener('focus', checkNewGame);
    return () => window.removeEventListener('focus', checkNewGame);
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.distance) count++;
    if (filters.time) count++;
    if (filters.sport) count++;
    if (filters.spotsAvailable) count++;
    return count;
  }, [filters]);

  const filteredActivities = useMemo(() => {
    return allActivities.filter(activity => {
      // Filter by selected sport tab
      if (selectedSport !== 'all' && activity.sport !== selectedSport) {
        return false;
      }
      
      // Filter by filter sheet options
      if (filters.sport && activity.sport !== filters.sport) {
        return false;
      }
      
      if (filters.distance && activity.distance > filters.distance) {
        return false;
      }
      
      if (filters.time && activity.startsIn > filters.time) {
        return false;
      }
      
      if (filters.spotsAvailable && activity.spotsTaken >= activity.spotsTotal) {
        return false;
      }
      
      return true;
    });
  }, [selectedSport, filters, allActivities]);

  const handleRemoveFilter = (key: keyof FilterOptions) => {
    setFilters(f => ({ ...f, [key]: key === 'spotsAvailable' ? false : null }));
  };

  const handleTabClick = (value: SportType | 'all') => {
    setSelectedSport(value);
    // Clear sport filter from sheet when using tabs
    if (filters.sport) {
      setFilters(f => ({ ...f, sport: null }));
    }
  };

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
              <h1 className="font-bold text-lg">Happening Now</h1>
            </div>

            <FilterSheet 
              filters={filters}
              onApplyFilters={setFilters}
              activeFilterCount={activeFilterCount}
            />
          </div>
        </div>

        {/* Sport Tabs */}
        <div className="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {sportTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleTabClick(tab.value)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all",
                selectedSport === tab.value
                  ? "bg-primary text-primary-foreground scale-105"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {tab.icon && `${tab.icon} `}{tab.label}
            </button>
          ))}
        </div>

        {/* Active Filters */}
        <ActiveFilters filters={filters} onRemoveFilter={handleRemoveFilter} />
      </header>

      {/* Feed */}
      <main className="flex-1 p-4 pb-24 overflow-y-auto">
        {filteredActivities.length > 0 ? (
          <div className="space-y-3 stagger-children">
            {filteredActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onClick={() => navigate(`/activity/${activity.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
              <span className="text-3xl">⚡</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">No matches right now</h3>
            <p className="text-sm text-muted-foreground max-w-[250px]">
              Check back soon or tap Start Now
            </p>
          </div>
        )}
      </main>

      <BottomNav />
    </MobileLayout>
  );
}
