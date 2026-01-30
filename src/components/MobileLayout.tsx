import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: ReactNode;
  className?: string;
}

export function MobileLayout({ children, className }: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div
        className={cn(
          'w-full max-w-[430px] min-h-screen relative',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
