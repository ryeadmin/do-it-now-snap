import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { UserCard } from '@/components/UserCard';
import { ProfilePreviewSheet } from '@/components/ProfilePreviewSheet';
import { FreeTrialModal } from '@/components/FreeTrialModal';
import { TrialEndedModal } from '@/components/TrialEndedModal';
import { TrialBanner } from '@/components/TrialBanner';
import { Button } from '@/components/ui/button';
import { useFreemium } from '@/hooks/useFreemium';
import { mockNearbyUsers } from '@/data/mockUsers';
import { User } from '@/types/user';
import { ArrowLeft, Users, Crown } from 'lucide-react';

export default function StartNowMatchScreen() {
  const navigate = useNavigate();
  const { 
    isPremium, 
    isLocked, 
    startFreeTrial, 
    upgradeToPremium, 
    trialStatus, 
    trialDaysLeft 
  } = useFreemium();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [showTrialEndedModal, setShowTrialEndedModal] = useState(false);

  // Show trial ended modal when trial expires
  useEffect(() => {
    if (trialStatus === 'ended') {
      setShowTrialEndedModal(true);
    }
  }, [trialStatus]);

  const handleUserClick = (user: User, index: number) => {
    if (isLocked(index, 'user')) {
      if (trialStatus === 'ended') {
        setShowTrialEndedModal(true);
      } else {
        setShowTrialModal(true);
      }
    } else {
      setSelectedUser(user);
    }
  };

  const handleStartChat = (user: User) => {
    setSelectedUser(null);
    navigate(`/direct-chat/${user.id}`, { state: { user } });
  };

  const handleUpgradeClick = () => {
    if (trialStatus === 'none') {
      setShowTrialModal(true);
    } else if (trialStatus === 'ended') {
      setShowTrialEndedModal(true);
    } else {
      // Already premium or ending soon - show upgrade option
      setShowTrialEndedModal(true);
    }
  };

  return (
    <MobileLayout className="bg-background">
      {/* Trial Banner */}
      <TrialBanner
        trialStatus={trialStatus}
        daysLeft={trialDaysLeft}
        onUpgrade={upgradeToPremium}
      />

      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate('/')}
            className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold text-foreground">Ready Now</h1>
          </div>

          {!isPremium && trialStatus !== 'active' && trialStatus !== 'ending-soon' && (
            <Button
              variant="ghost"
              size="sm"
              className="text-primary"
              onClick={handleUpgradeClick}
            >
              <Crown className="w-4 h-4 mr-1" />
              Try Free
            </Button>
          )}
          {(isPremium || trialStatus === 'active' || trialStatus === 'ending-soon') && <div className="w-20" />}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Status indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse-live" />
          <p className="text-sm text-muted-foreground">
            {mockNearbyUsers.length} players available nearby
          </p>
        </div>

        {/* User cards */}
        <div className="space-y-3 stagger-children">
          {mockNearbyUsers.map((user, index) => (
            <UserCard
              key={user.id}
              user={user}
              isLocked={isLocked(index, 'user')}
              onClick={() => handleUserClick(user, index)}
            />
          ))}
        </div>

        {/* Upgrade prompt for free users */}
        {!isPremium && trialStatus === 'none' && (
          <div className="mt-6 p-4 bg-primary/5 rounded-2xl border border-primary/20 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              You're just one step away from seeing everyone
            </p>
            <Button
              className="gradient-action"
              onClick={() => setShowTrialModal(true)}
            >
              <Crown className="w-4 h-4 mr-2" />
              Start Free Trial
            </Button>
          </div>
        )}

        {/* Trial ended prompt */}
        {trialStatus === 'ended' && (
          <div className="mt-6 p-4 bg-destructive/5 rounded-2xl border border-destructive/20 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Your trial has ended. Upgrade to see all players.
            </p>
            <Button
              className="gradient-action"
              onClick={() => setShowTrialEndedModal(true)}
            >
              <Crown className="w-4 h-4 mr-2" />
              Upgrade to Premium
            </Button>
          </div>
        )}
      </div>

      {/* Profile Preview Sheet */}
      <ProfilePreviewSheet
        user={selectedUser}
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        onStartChat={handleStartChat}
      />

      {/* Free Trial Modal */}
      <FreeTrialModal
        isOpen={showTrialModal}
        onClose={() => setShowTrialModal(false)}
        onStartTrial={startFreeTrial}
      />

      {/* Trial Ended Modal */}
      <TrialEndedModal
        isOpen={showTrialEndedModal}
        onClose={() => setShowTrialEndedModal(false)}
        onUpgrade={upgradeToPremium}
      />
    </MobileLayout>
  );
}
