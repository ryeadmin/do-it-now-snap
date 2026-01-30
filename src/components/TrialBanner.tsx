import { Crown, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TrialStatus } from '@/hooks/useFreemium';
import { cn } from '@/lib/utils';

interface TrialBannerProps {
  trialStatus: TrialStatus;
  daysLeft: number;
  onUpgrade: () => void;
  className?: string;
}

export function TrialBanner({ trialStatus, daysLeft, onUpgrade, className }: TrialBannerProps) {
  if (trialStatus === 'none') return null;

  if (trialStatus === 'active') {
    return (
      <div className={cn(
        "flex items-center justify-between px-4 py-2 bg-primary/10 border-b border-primary/20",
        className
      )}>
        <div className="flex items-center gap-2">
          <Crown className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Premium Trial Active</span>
          <span className="text-xs text-muted-foreground">• {daysLeft} days left</span>
        </div>
      </div>
    );
  }

  if (trialStatus === 'ending-soon') {
    return (
      <div className={cn(
        "flex items-center justify-between px-4 py-2 bg-amber-500/10 border-b border-amber-500/20",
        className
      )}>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-medium text-amber-600">Trial ends in {daysLeft} day{daysLeft !== 1 ? 's' : ''}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-amber-600 hover:text-amber-700 text-xs h-7 px-2"
          onClick={onUpgrade}
        >
          Upgrade Now
        </Button>
      </div>
    );
  }

  if (trialStatus === 'ended') {
    return (
      <div className={cn(
        "flex items-center justify-between px-4 py-2.5 bg-destructive/10 border-b border-destructive/20",
        className
      )}>
        <div className="flex items-center gap-2">
          <Crown className="w-4 h-4 text-destructive" />
          <span className="text-sm font-medium text-destructive">Trial Ended</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive text-xs h-7 px-2"
          onClick={onUpgrade}
        >
          Upgrade to Continue
        </Button>
      </div>
    );
  }

  return null;
}
