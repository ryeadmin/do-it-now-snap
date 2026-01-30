import { useState, useCallback, useEffect } from 'react';

export type TrialStatus = 'none' | 'active' | 'ending-soon' | 'ended';

export interface FreemiumState {
  isPremium: boolean;
  maxVisibleUsers: number;
  maxVisibleActivities: number;
  trialStatus: TrialStatus;
  trialDaysLeft: number;
  trialEndDate: Date | null;
}

const TRIAL_STORAGE_KEY = 'doitnow_trial';
const TRIAL_DURATION_DAYS = 30;
const ENDING_SOON_THRESHOLD = 3;

interface TrialData {
  startDate: string;
  endDate: string;
}

export function useFreemium() {
  const [trialData, setTrialData] = useState<TrialData | null>(() => {
    const stored = localStorage.getItem(TRIAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const calculateTrialStatus = useCallback((): { status: TrialStatus; daysLeft: number } => {
    if (!trialData) {
      return { status: 'none', daysLeft: 0 };
    }

    const now = new Date();
    const endDate = new Date(trialData.endDate);
    const timeDiff = endDate.getTime() - now.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysLeft <= 0) {
      return { status: 'ended', daysLeft: 0 };
    } else if (daysLeft <= ENDING_SOON_THRESHOLD) {
      return { status: 'ending-soon', daysLeft };
    } else {
      return { status: 'active', daysLeft };
    }
  }, [trialData]);

  const { status: trialStatus, daysLeft: trialDaysLeft } = calculateTrialStatus();
  const isPremium = trialStatus === 'active' || trialStatus === 'ending-soon';

  const limits: FreemiumState = {
    isPremium,
    maxVisibleUsers: isPremium ? Infinity : 2,
    maxVisibleActivities: isPremium ? Infinity : 3,
    trialStatus,
    trialDaysLeft,
    trialEndDate: trialData ? new Date(trialData.endDate) : null,
  };

  const startFreeTrial = useCallback(() => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + TRIAL_DURATION_DAYS);

    const newTrialData: TrialData = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    localStorage.setItem(TRIAL_STORAGE_KEY, JSON.stringify(newTrialData));
    setTrialData(newTrialData);
  }, []);

  const upgradeToPremium = useCallback(() => {
    // Simulate permanent premium upgrade (extends trial indefinitely)
    const startDate = new Date();
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 100); // Permanent

    const newTrialData: TrialData = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    localStorage.setItem(TRIAL_STORAGE_KEY, JSON.stringify(newTrialData));
    setTrialData(newTrialData);
  }, []);

  const resetTrial = useCallback(() => {
    localStorage.removeItem(TRIAL_STORAGE_KEY);
    setTrialData(null);
  }, []);

  const isLocked = useCallback((index: number, type: 'user' | 'activity') => {
    if (isPremium) return false;
    const limit = type === 'user' ? limits.maxVisibleUsers : limits.maxVisibleActivities;
    return index >= limit;
  }, [isPremium, limits]);

  return {
    ...limits,
    startFreeTrial,
    upgradeToPremium,
    resetTrial,
    isLocked,
  };
}
