import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Crown, Lock } from 'lucide-react';

interface TrialEndedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export function TrialEndedModal({ isOpen, onClose, onUpgrade }: TrialEndedModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-4 rounded-3xl">
        <DialogHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-muted-foreground" />
          </div>
          <DialogTitle className="text-xl">Your Free Trial Has Ended</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Upgrade to continue seeing who's available now.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="p-4 bg-muted/50 rounded-2xl text-center">
            <p className="text-sm text-muted-foreground">
              You've experienced the power of Premium. Keep matching without limits.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            className="w-full h-12 gradient-action text-base font-semibold"
            onClick={() => {
              onUpgrade();
              onClose();
            }}
          >
            <Crown className="w-5 h-5 mr-2" />
            Upgrade to Premium
          </Button>
          <Button
            variant="ghost"
            className="w-full text-muted-foreground"
            onClick={onClose}
          >
            Continue with Free
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
