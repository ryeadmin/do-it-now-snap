import { Activity } from '@/types/activity';
import { SportIcon } from './SportIcon';
import { LiveIndicator } from './LiveIndicator';
import { MapPin, Clock, Users } from 'lucide-react';
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
        'active:scale-[0.98] text-left'
      )}
    >
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
          </div>
        </div>
      </div>
    </button>
  );
}
