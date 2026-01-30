import { useState, useMemo, useEffect } from 'react';
import { MobileLayout } from '@/components/MobileLayout';
import { ActivityCard } from '@/components/ActivityCard';
import { LiveIndicator } from '@/components/LiveIndicator';
import { mockActivities } from '@/data/mockActivities';
import { Activity, SportType } from '@/types/activity';
import { ArrowLeft, Lock, Crown, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/BottomNav';
import { FilterSheet, FilterOptions, ActiveFilters } from '@/components/FilterSheet';
import { FreeTrialModal } from '@/components/FreeTrialModal';
import { UpgradeModal } from '@/components/UpgradeModal';
import { TrialBanner } from '@/components/TrialBanner';
import { useFreemium } from '@/hooks/useFreemium';
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
  const [showFreeTrialModal, setShowFreeTrialModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeContext, setUpgradeContext] = useState<'locked-activity' | 'full-activity' | 'scroll-limit'>('locked-activity');

  const { 
    isPremium, 
    trialStatus, 
    trialDaysLeft,
    maxVisibleActivities, 
    startFreeTrial,
    upgradeToPremium,
    isLocked 
  } = useFreemium();

  // Check for newly posted games on mount/focus
  useEffect(() => {
    const checkNewGame = () => {
      const newGameData = sessionStorage.getItem('newGame');
      if (newGameData) {
        const newGame = JSON.parse(newGameData) as Activity;
        setAllActivities(prev => {
          if (prev.some(a => a.id === newGame.id)) {
            return prev;
          }
          return [newGame, ...prev];
        });
      }
    };
    
    checkNewGame();
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

  // Smart filtering with fallback - NEVER show empty state in demo
  const { filteredActivities, isUsingFallback } = useMemo(() => {
    // First, try to apply all filters strictly
    let results = allActivities.filter(activity => {
      if (selectedSport !== 'all' && activity.sport !== selectedSport) {
        return false;
      }
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

    // Demo safeguard: if no results, use smart fallback
    if (results.length === 0) {
      // Fallback 1: Just match sport, relax other filters
      if (selectedSport !== 'all') {
        results = allActivities.filter(a => a.sport === selectedSport);
      }
      
      // Fallback 2: If still empty, show closest match (first activity that's closest to filters)
      if (results.length === 0) {
        // Sort by relevance: distance first, then time
        const sorted = [...allActivities].sort((a, b) => {
          // Prioritize by distance
          if (filters.distance) {
            const aDist = Math.abs(a.distance - filters.distance);
            const bDist = Math.abs(b.distance - filters.distance);
            if (aDist !== bDist) return aDist - bDist;
          }
          // Then by time
          if (filters.time) {
            const aTime = Math.abs(a.startsIn - filters.time);
            const bTime = Math.abs(b.startsIn - filters.time);
            if (aTime !== bTime) return aTime - bTime;
          }
          return a.distance - b.distance;
        });
        results = sorted.slice(0, 1); // Always show at least 1
      }
      
      return { filteredActivities: results, isUsingFallback: true };
    }

    return { filteredActivities: results, isUsingFallback: false };
  }, [selectedSport, filters, allActivities]);

  // Ensure at least 1 joinable activity for Free users (the first one is always unlocked)
  const getActivityDisplayInfo = (index: number) => {
    // First activity is ALWAYS joinable (not locked) for demo purposes
    if (index === 0) {
      return { locked: false, isFull: false, isDelayed: false };
    }
    
    const locked = !isPremium && isLocked(index, 'activity');
    const isFull = locked && index % 2 === 0;
    const isDelayed = locked && index % 2 === 1;
    
    return { locked, isFull, isDelayed };
  };

  const handleRemoveFilter = (key: keyof FilterOptions) => {
    setFilters(f => ({ ...f, [key]: key === 'spotsAvailable' ? false : null }));
  };

  const handleTabClick = (value: SportType | 'all') => {
    setSelectedSport(value);
    if (filters.sport) {
      setFilters(f => ({ ...f, sport: null }));
    }
  };

  const handleActivityClick = (activity: Activity, index: number) => {
    const { locked } = getActivityDisplayInfo(index);
    
    if (locked) {
      setUpgradeContext('locked-activity');
      if (trialStatus === 'none') {
        setShowFreeTrialModal(true);
      } else {
        setShowUpgradeModal(true);
      }
      return;
    }
    navigate(`/activity/${activity.id}`);
  };

  const handleUpgradeClick = () => {
    if (trialStatus === 'none') {
      setShowFreeTrialModal(true);
    } else {
      setShowUpgradeModal(true);
    }
  };

  const handleStartTrial = () => {
    startFreeTrial();
    setShowFreeTrialModal(false);
  };

  return (
    <MobileLayout className="flex flex-col">
      {/* Trial Banner */}
      {trialStatus !== 'none' && (
        <TrialBanner 
          trialStatus={trialStatus} 
          daysLeft={trialDaysLeft} 
          onUpgrade={handleUpgradeClick} 
        />
      )}

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

          {/* Premium Upgrade Link for Free Users */}
          {!isPremium && (
            <button
              onClick={handleUpgradeClick}
              className="mt-2 w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-600 text-sm font-medium hover:bg-amber-500/20 transition-colors"
            >
              <Crown className="w-4 h-4" />
              <span>Unlock full visibility & priority joins</span>
            </button>
          )}
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
        {/* Smart fallback notice */}
        {isUsingFallback && (
          <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-muted/50 text-sm text-muted-foreground">
            <Info className="w-4 h-4 shrink-0" />
            <span>Showing the closest match available</span>
          </div>
        )}

        <div className="space-y-3 stagger-children">
          {filteredActivities.map((activity, index) => {
            const { locked, isFull, isDelayed } = getActivityDisplayInfo(index);

            if (locked) {
              return (
                <button
                  key={activity.id}
                  onClick={() => handleActivityClick(activity, index)}
                  className="w-full relative"
                >
                  {/* Blurred card */}
                  <div className="blur-sm pointer-events-none opacity-60">
                    <ActivityCard
                      activity={activity}
                      onClick={() => {}}
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 rounded-2xl">
                    <div className="bg-card/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-border/50 text-center">
                      <Lock className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
                      {isFull ? (
                        <>
                          <p className="font-semibold text-foreground text-sm">Activity Full</p>
                          <p className="text-xs text-muted-foreground">Premium users get priority</p>
                        </>
                      ) : (
                        <>
                          <p className="font-semibold text-foreground text-sm">Updated 10 min ago</p>
                          <p className="text-xs text-muted-foreground">Upgrade for real-time updates</p>
                        </>
                      )}
                    </div>
                  </div>
                </button>
              );
            }

            return (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onClick={() => handleActivityClick(activity, index)}
              />
            );
          })}

          {/* Upgrade CTA after visible activities for free users */}
          {!isPremium && filteredActivities.length > maxVisibleActivities && (
            <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 text-center">
              <Crown className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-bold text-foreground mb-1">See more activities</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Be one step faster. Unlock full visibility and priority joins.
              </p>
              <Button
                onClick={handleUpgradeClick}
                className="gradient-action text-white font-semibold"
              >
                {trialStatus === 'none' ? 'Start Free Trial' : 'Upgrade to Premium'}
              </Button>
            </div>
          )}
        </div>
      </main>

      <BottomNav />

      {/* Free Trial Modal */}
      <FreeTrialModal
        isOpen={showFreeTrialModal}
        onClose={() => setShowFreeTrialModal(false)}
        onStartTrial={handleStartTrial}
      />

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onStartTrial={upgradeToPremium}
        trigger={upgradeContext}
      />
    </MobileLayout>
  );
}
