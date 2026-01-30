import { useState, useCallback } from 'react';

export interface FreemiumState {
  isPremium: boolean;
  maxVisibleUsers: number;
  maxVisibleActivities: number;
}

export function useFreemium() {
  // In a real app, this would come from auth/subscription state
  const [isPremium, setIsPremium] = useState(false);

  const limits: FreemiumState = {
    isPremium,
    maxVisibleUsers: isPremium ? Infinity : 2,
    maxVisibleActivities: isPremium ? Infinity : 3,
  };

  const upgradeToPremium = useCallback(() => {
    setIsPremium(true);
  }, []);

  const isLocked = useCallback((index: number, type: 'user' | 'activity') => {
    if (isPremium) return false;
    const limit = type === 'user' ? limits.maxVisibleUsers : limits.maxVisibleActivities;
    return index >= limit;
  }, [isPremium, limits]);

  return {
    ...limits,
    upgradeToPremium,
    isLocked,
  };
}
