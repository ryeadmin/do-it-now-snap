import { Activity } from '@/types/activity';
import { SportIcon } from './SportIcon';
import { LiveIndicator } from './LiveIndicator';
import { MapPin, Clock, Users, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityCardProps {
  activity: Activity;
  onClick: () => void;
}

export function ActivityCard({ activity, onClick }: ActivityCardProps) {
  const spotsLeft = activity.spotsTotal - activity.spotsTaken;
  const isUrgent = activity.startsIn <= 20;
  const isAlmostFull = spotsLeft <= 2;

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full p-4 bg-card rounded-2xl shadow-card border border-border/50',
        'transition-all duration-200 hover:shadow-elevated hover:scale-[1.02]',
        'active:scale-[0.98] text-left',
        activity.isJustPosted && 'ring-2 ring-primary/50'
      )}
    >
      {/* Just Posted / Need Players Badges */}
      {(activity.isJustPosted || activity.isHost) && (
        <div className="flex gap-2 mb-3">
          {activity.isJustPosted && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <Sparkles className="w-3 h-3" />
              Just Posted
            </span>
          )}
          {activity.isHost && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold">
              You're hosting
            </span>
          )}
        </div>
      )}

      <div className="flex gap-4">
        <SportIcon sport={activity.sport} size="lg" />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-foreground truncate">
              {activity.title}
            </h3>
            {isUrgent && <LiveIndicator size="sm" />}
          </div>
          
          <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">{activity.location}</span>
            <span className="text-muted-foreground/50">•</span>
            <span className="font-medium text-foreground">{activity.distance} km</span>
          </div>

          <div className="flex items-center gap-3 mt-3">
            <div
              className={cn(
                'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm font-semibold',
                isUrgent
                  ? 'bg-urgent/10 text-urgent'
                  : 'bg-primary/10 text-primary'
              )}
            >
              <Clock className="w-3.5 h-3.5" />
              {isUrgent ? 'NOW' : formatTime(activity.startsIn)}
            </div>

            <div
              className={cn(
                'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm font-semibold',
                isAlmostFull
                  ? 'bg-urgent/10 text-urgent'
                  : 'bg-secondary text-secondary-foreground'
              )}
            >
              <Users className="w-3.5 h-3.5" />
              {spotsLeft} {spotsLeft === 1 ? 'spot' : 'spots'}
            </div>

            {activity.isJustPosted && spotsLeft > 1 && (
              <span className="text-xs font-semibold text-urgent">
                Need players now
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
