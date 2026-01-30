import { User } from '@/types/user';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, MessageCircle, Zap } from 'lucide-react';
import { sportEmojis } from '@/data/mockUsers';

interface ProfilePreviewSheetProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onStartChat: (user: User) => void;
}

export function ProfilePreviewSheet({ user, isOpen, onClose, onStartChat }: ProfilePreviewSheetProps) {
  if (!user) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="rounded-t-3xl px-6 pb-8">
        <SheetHeader className="pb-4">
          <SheetTitle className="sr-only">Profile Preview</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          <Avatar className="w-20 h-20 mb-4">
            <AvatarFallback className="bg-primary/10 text-primary font-bold text-2xl">
              {user.name[0]}
            </AvatarFallback>
          </Avatar>

          {/* Name and status */}
          <h2 className="text-xl font-bold text-foreground mb-1">{user.name}</h2>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <MapPin className="w-4 h-4" />
            <span>{user.distance} away</span>
            <span className="mx-1">•</span>
            <span className="flex items-center gap-1 text-primary font-medium">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse-live" />
              Available now
            </span>
          </div>

          {/* Bio */}
          {user.bio && (
            <p className="text-muted-foreground text-sm mb-4 max-w-xs">{user.bio}</p>
          )}

          {/* Sports */}
          <div className="flex gap-2 flex-wrap justify-center mb-4">
            {user.sports.map((sport) => (
              <Badge key={sport} variant="secondary" className="px-3 py-1">
                {sportEmojis[sport] || '🎯'} {sport}
              </Badge>
            ))}
          </div>

          {/* Skill level */}
          <Badge variant="outline" className="mb-6">
            {user.skillLevel}
          </Badge>

          {/* Actions */}
          <div className="flex gap-3 w-full">
            <Button
              variant="outline"
              className="flex-1 h-12"
              onClick={onClose}
            >
              Maybe later
            </Button>
            <Button
              className="flex-1 h-12 gradient-action"
              onClick={() => onStartChat(user)}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Start Chat
            </Button>
          </div>

          {/* Quick invite */}
          <Button
            variant="ghost"
            className="mt-3 text-primary"
            onClick={() => onStartChat(user)}
          >
            <Zap className="w-4 h-4 mr-2" />
            Send Quick Invite
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
