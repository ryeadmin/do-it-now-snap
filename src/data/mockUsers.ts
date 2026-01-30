import { User } from '@/types/user';

export const mockNearbyUsers: User[] = [
  {
    id: 'user-1',
    name: 'Alex',
    avatar: undefined,
    sports: ['Basketball', 'Tennis'],
    skillLevel: 'Intermediate',
    distance: '0.3 km',
    isAvailable: true,
    bio: 'Always down for a quick game',
  },
  {
    id: 'user-2',
    name: 'Jordan',
    avatar: undefined,
    sports: ['Soccer', 'Running'],
    skillLevel: 'Advanced',
    distance: '0.5 km',
    isAvailable: true,
    bio: 'Competitive player looking for challenges',
  },
  {
    id: 'user-3',
    name: 'Sam',
    avatar: undefined,
    sports: ['Tennis'],
    skillLevel: 'Beginner',
    distance: '0.8 km',
    isAvailable: true,
    bio: 'New to tennis, learning fast!',
  },
  {
    id: 'user-4',
    name: 'Morgan',
    avatar: undefined,
    sports: ['Basketball', 'Gym'],
    skillLevel: 'Advanced',
    distance: '1.2 km',
    isAvailable: true,
    bio: 'Morning workout enthusiast',
  },
  {
    id: 'user-5',
    name: 'Taylor',
    avatar: undefined,
    sports: ['Running', 'Soccer'],
    skillLevel: 'Intermediate',
    distance: '1.5 km',
    isAvailable: true,
    bio: 'Weekend warrior',
  },
];

export const sportEmojis: Record<string, string> = {
  Basketball: '🏀',
  Soccer: '⚽',
  Tennis: '🎾',
  Running: '🏃',
  Gym: '💪',
};
