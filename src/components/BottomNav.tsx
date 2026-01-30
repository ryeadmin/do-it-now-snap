import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavItem {
  path: string;
  icon: string;
  label: string;
}

const navItems: NavItem[] = [
  { path: '/', icon: '🏠', label: 'Home' },
  { path: '/feed', icon: '⚡', label: 'Match' },
  { path: '/chats', icon: '💬', label: 'Chats' },
  { path: '/profile', icon: '👤', label: 'Profile' },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-background/95 backdrop-blur-sm border-t border-border">
      <div className="flex items-center justify-around py-4 pb-safe-bottom">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path === '/feed' && location.pathname.startsWith('/activity'));
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
