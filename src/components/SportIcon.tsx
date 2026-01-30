import { SportType } from '@/types/activity';
import { cn } from '@/lib/utils';

interface SportIconProps {
  sport: SportType;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sportEmojis: Record<SportType, string> = {
  basketball: '🏀',
  soccer: '⚽',
  tennis: '🎾',
  volleyball: '🏐',
  running: '🏃',
  cycling: '🚴',
  padel: '🎾',
  badminton: '🏸',
};

const sportColors: Record<SportType, string> = {
  basketball: 'bg-orange-100 text-orange-600',
  soccer: 'bg-green-100 text-green-600',
  tennis: 'bg-yellow-100 text-yellow-600',
  volleyball: 'bg-blue-100 text-blue-600',
  running: 'bg-purple-100 text-purple-600',
  cycling: 'bg-red-100 text-red-600',
  padel: 'bg-teal-100 text-teal-600',
  badminton: 'bg-pink-100 text-pink-600',
};

export function SportIcon({ sport, className, size = 'md' }: SportIconProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-base',
    md: 'w-10 h-10 text-lg',
    lg: 'w-12 h-12 text-xl',
    xl: 'w-16 h-16 text-3xl',
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-xl',
        sportColors[sport],
        sizeClasses[size],
        className
      )}
    >
      {sportEmojis[sport]}
    </div>
  );
}
