import { cn } from '@/lib/utils';

interface LiveIndicatorProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LiveIndicator({ className, size = 'md' }: LiveIndicatorProps) {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  return (
    <span className={cn('relative inline-flex', className)}>
      <span
        className={cn(
          'absolute inline-flex rounded-full bg-live opacity-75 animate-pulse-ring',
          sizeClasses[size]
        )}
      />
      <span
        className={cn(
          'relative inline-flex rounded-full bg-live animate-pulse-live',
          sizeClasses[size]
        )}
      />
    </span>
  );
}
