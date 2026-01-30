import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { UserCard } from '@/components/UserCard';
import { ProfilePreviewSheet } from '@/components/ProfilePreviewSheet';
import { UpgradeModal } from '@/components/UpgradeModal';
import { Button } from '@/components/ui/button';
import { useFreemium } from '@/hooks/useFreemium';
import { mockNearbyUsers } from '@/data/mockUsers';
import { User } from '@/types/user';
import { ArrowLeft, Users, Crown } from 'lucide-react';

export default function StartNowMatchScreen() {
  const navigate = useNavigate();
  const { isPremium, isLocked, upgradeToPremium } = useFreemium();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeTrigger, setUpgradeTrigger] = useState<'blurred-user' | 'full-activity' | 'missed-match'>('blurred-user');

  const handleUserClick = (user: User, index: number) => {
    if (isLocked(index, 'user')) {
      setUpgradeTrigger('blurred-user');
      setShowUpgradeModal(true);
    } else {
      setSelectedUser(user);
    }
  };

  const handleStartChat = (user: User) => {
    setSelectedUser(null);
    // Navigate to direct chat with this user
    navigate(`/direct-chat/${user.id}`, { state: { user } });
  };

  return (
    <MobileLayout className="bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold text-foreground">Ready Now</h1>
          </div>

          {!isPremium && (
            <Button
              variant="ghost"
              size="sm"
              className="text-primary"
              onClick={() => {
                setUpgradeTrigger('blurred-user');
                setShowUpgradeModal(true);
              }}
            >
              <Crown className="w-4 h-4 mr-1" />
              Upgrade
            </Button>
          )}
          {isPremium && <div className="w-20" />}
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
        {!isPremium && (
          <div className="mt-6 p-4 bg-primary/5 rounded-2xl border border-primary/20 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              You're just one step away from seeing everyone
            </p>
            <Button
              className="gradient-action"
              onClick={() => setShowUpgradeModal(true)}
            >
              <Crown className="w-4 h-4 mr-2" />
              Unlock All Players
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

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={upgradeToPremium}
        trigger={upgradeTrigger}
      />
    </MobileLayout>
  );
}
