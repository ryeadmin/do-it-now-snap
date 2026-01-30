import { useParams, useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { SportIcon } from '@/components/SportIcon';
import { LiveIndicator } from '@/components/LiveIndicator';
import { Button } from '@/components/ui/button';
import { mockActivities } from '@/data/mockActivities';
import { ArrowLeft, MapPin, Clock, Users, Share2, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ActivityDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const activity = mockActivities.find(a => a.id === id);
  
  if (!activity) {
    return (
      <MobileLayout className="flex items-center justify-center">
        <p>Activity not found</p>
      </MobileLayout>
    );
  }

  const spotsLeft = activity.spotsTotal - activity.spotsTaken;
  const isUrgent = activity.startsIn <= 20;
  const progressPercent = (activity.spotsTaken / activity.spotsTotal) * 100;

  return (
    <MobileLayout className="flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
        <div className="px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => navigate('/feed')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon-sm">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-6 pb-32 overflow-y-auto">
        {/* Sport & Title */}
        <div className="flex items-start gap-4 mb-6">
          <SportIcon sport={activity.sport} size="xl" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {isUrgent && (
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-urgent/10">
                  <LiveIndicator size="sm" />
                  <span className="text-xs font-bold text-urgent">LIVE</span>
                </div>
              )}
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              {activity.title}
            </h1>
            <div className="flex items-center gap-2 mt-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{activity.location}</span>
            </div>
          </div>
        </div>

        {/* Key Info Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-4 bg-card rounded-xl border border-border/50 text-center">
            <Clock className={cn(
              "w-6 h-6 mx-auto mb-2",
              isUrgent ? "text-urgent" : "text-primary"
            )} />
            <p className="text-lg font-bold text-foreground">
              {activity.startsIn} min
            </p>
            <p className="text-xs text-muted-foreground">starts in</p>
          </div>
          
          <div className="p-4 bg-card rounded-xl border border-border/50 text-center">
            <MapPin className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-lg font-bold text-foreground">
              {activity.distance} km
            </p>
            <p className="text-xs text-muted-foreground">away</p>
          </div>
          
          <div className="p-4 bg-card rounded-xl border border-border/50 text-center">
            <Star className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-lg font-bold text-foreground capitalize">
              {activity.level}
            </p>
            <p className="text-xs text-muted-foreground">level</p>
          </div>
        </div>

        {/* Spots Progress */}
        <div className="p-4 bg-card rounded-xl border border-border/50 mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-muted-foreground" />
              <span className="font-semibold">Players</span>
            </div>
            <span className={cn(
              "font-bold",
              spotsLeft <= 2 ? "text-urgent" : "text-foreground"
            )}>
              {activity.spotsTaken}/{activity.spotsTotal}
            </span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all",
                spotsLeft <= 2 ? "bg-urgent" : "bg-primary"
              )}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {spotsLeft} {spotsLeft === 1 ? 'spot' : 'spots'} remaining
          </p>
        </div>

        {/* Host */}
        <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50">
          <img 
            src={activity.hostAvatar} 
            alt={activity.hostName}
            className="w-12 h-12 rounded-full bg-secondary"
          />
          <div className="flex-1">
            <p className="font-semibold text-foreground">{activity.hostName}</p>
            <p className="text-sm text-muted-foreground">Host • 4.9 ⭐</p>
          </div>
        </div>
      </main>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-4 pb-safe-bottom bg-background/95 backdrop-blur-sm border-t border-border">
        <Button 
          variant="action" 
          size="xl" 
          className="w-full shadow-glow"
          onClick={() => navigate(`/chat/${activity.id}`)}
        >
          Join Now
        </Button>
      </div>
    </MobileLayout>
  );
}
