import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Zap, Users, Bell, Crown, Check } from 'lucide-react';

interface FreeTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTrial: () => void;
}

const benefits = [
  { icon: Users, text: 'See all nearby available users' },
  { icon: Zap, text: 'Priority in matching' },
  { icon: Bell, text: 'Full access to last-minute games' },
];

export function FreeTrialModal({ isOpen, onClose, onStartTrial }: FreeTrialModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-4 rounded-3xl">
        <DialogHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 rounded-full gradient-action flex items-center justify-center mb-4 shadow-glow">
            <Crown className="w-8 h-8 text-primary-foreground" />
          </div>
          <DialogTitle className="text-xl">Try Premium for 1 Month</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            See who's available now. Match faster. Never miss a game.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {benefits.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
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
            No payment required now
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
