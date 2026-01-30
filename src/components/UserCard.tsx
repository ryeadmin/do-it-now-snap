import { User } from '@/types/user';
import { MapPin, Lock } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { sportEmojis } from '@/data/mockUsers';
import { cn } from '@/lib/utils';

interface UserCardProps {
  user: User;
  isLocked?: boolean;
  isPremium?: boolean;
  onClick: () => void;
}

export function UserCard({ user, isLocked = false, isPremium = false, onClick }: UserCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-4 bg-card rounded-2xl shadow-card transition-all duration-200 text-left",
        "hover:shadow-elevated hover:scale-[1.02] active:scale-[0.98]",
        isLocked && "relative overflow-hidden"
      )}
    >
      {isLocked && (
        <div className="absolute inset-0 bg-card/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <Lock className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground font-medium">Upgrade to see</p>
        </div>
      )}

      <div className="flex items-center gap-4">
        <Avatar className="w-14 h-14">
          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
            {user.name[0]}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">{user.name}</h3>
            <span className="flex items-center gap-0.5 text-xs text-primary font-medium bg-primary/10 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-live" />
              {isPremium ? 'Online now' : 'Ready now'}
            </span>
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
            <MapPin className="w-3 h-3" />
            <span>{user.distance}</span>
            <span className="mx-1">•</span>
            <span>{user.skillLevel}</span>
          </div>

          <div className="flex gap-1.5 flex-wrap">
            {user.sports.map((sport) => (
              <Badge key={sport} variant="secondary" className="text-xs px-2 py-0.5">
                {sportEmojis[sport] || '🎯'} {sport}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
