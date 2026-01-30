import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Zap, Users, Bell, Crown, Check } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTrial: () => void;
  trigger?: 'blurred-user' | 'full-activity' | 'missed-match' | 'locked-activity' | 'scroll-limit';
}

const triggerMessages = {
  'blurred-user': {
    title: "See who's available now",
    description: 'Start your free trial to connect with players ready to go right now.',
  },
  'full-activity': {
    title: 'This spot could have been yours',
    description: 'Premium members get priority access to activities.',
  },
  'missed-match': {
    title: 'You just missed a match',
    description: 'Get real-time notifications when players are available.',
  },
  'locked-activity': {
    title: 'Be one step faster',
    description: 'Unlock full visibility and priority joins.',
  },
  'scroll-limit': {
    title: 'See more activities',
    description: 'Premium users see all nearby last-minute activities.',
  },
};

const benefits = [
  { icon: Users, text: 'See all nearby players' },
  { icon: Zap, text: 'Priority in matching' },
  { icon: Bell, text: 'Real-time availability alerts' },
];

export function UpgradeModal({ isOpen, onClose, onStartTrial, trigger = 'blurred-user' }: UpgradeModalProps) {
  const message = triggerMessages[trigger];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-4 rounded-3xl">
        <DialogHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 rounded-full gradient-action flex items-center justify-center mb-4 shadow-glow">
            <Crown className="w-8 h-8 text-primary-foreground" />
          </div>
          <DialogTitle className="text-xl">{message.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {message.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {benefits.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-foreground">{text}</span>
              <Check className="w-4 h-4 text-primary ml-auto" />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <Button
            className="w-full h-12 gradient-action text-base font-semibold"
            onClick={() => {
              onStartTrial();
              onClose();
            }}
          >
            Start Free Trial
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Try Premium free for 1 month
          </p>
          <Button
            variant="ghost"
            className="w-full text-muted-foreground"
            onClick={onClose}
          >
            Maybe later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}