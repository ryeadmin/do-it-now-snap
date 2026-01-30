import { MobileLayout } from '@/components/MobileLayout';
import { mockActivities } from '@/data/mockActivities';
import { SportIcon } from '@/components/SportIcon';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';

// Simulated joined activities (user has joined activity 1)
const joinedActivityIds = ['1'];

export default function ChatsListScreen() {
  const navigate = useNavigate();
  
  const joinedActivities = mockActivities.filter(a => joinedActivityIds.includes(a.id));
  const hasChats = joinedActivities.length > 0;

  return (
    <MobileLayout className="flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="px-4 py-3">
          <h1 className="font-bold text-lg text-center">Chats</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-4 pb-24 overflow-y-auto">
        {hasChats ? (
          <div className="space-y-3">
            {joinedActivities.map((activity) => (
              <button
                key={activity.id}
                onClick={() => navigate(`/chat/${activity.id}`)}
                className="w-full flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50 hover:bg-card/80 transition-colors text-left"
              >
                <SportIcon sport={activity.sport} size="md" />
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">
                    {activity.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>Starts in {activity.startsIn} min</span>
                  </div>
                  <p className="text-sm text-primary mt-1">
                    "On my way! 🏃" • Just now
                  </p>
                </div>
                
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
              <span className="text-3xl">💬</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">No chats yet</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-[250px]">
              Join a game to start chatting with other players
            </p>
            <button
              onClick={() => navigate('/feed')}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold"
            >
              Find a Game
            </button>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-background/95 backdrop-blur-sm border-t border-border">
        <div className="flex items-center justify-around py-4 pb-safe-bottom">
          <button 
            onClick={() => navigate('/')}
            className="flex flex-col items-center gap-1 text-muted-foreground"
          >
            <span className="text-2xl">🏠</span>
            <span className="text-xs font-medium">Home</span>
          </button>
          <button 
            onClick={() => navigate('/feed')}
            className="flex flex-col items-center gap-1 text-muted-foreground"
          >
            <span className="text-2xl">🔍</span>
            <span className="text-xs font-medium">Browse</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-primary">
            <span className="text-2xl">💬</span>
            <span className="text-xs font-medium">Chats</span>
          </button>
          <button 
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center gap-1 text-muted-foreground"
          >
            <span className="text-2xl">👤</span>
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </MobileLayout>
  );
}
