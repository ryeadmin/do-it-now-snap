import { MobileLayout } from '@/components/MobileLayout';
import { mockActivities } from '@/data/mockActivities';
import { SportIcon } from '@/components/SportIcon';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Zap, Users } from 'lucide-react';
import { useChats, Chat } from '@/contexts/ChatContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { BottomNav } from '@/components/BottomNav';
import { cn } from '@/lib/utils';

// Simulated joined activities (user has joined activity 1)
const joinedActivityIds = ['1'];

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export default function ChatsListScreen() {
  const navigate = useNavigate();
  const { chats, getLastMessage } = useChats();
  
  // Get joined activities for activity chats
  const joinedActivities = mockActivities.filter(a => joinedActivityIds.includes(a.id));
  
  // Combine Start Now chats with activity chats
  const allChats: { type: 'start-now' | 'activity'; data: Chat | typeof joinedActivities[0]; lastMessage: string; timestamp: Date }[] = [];
  
  // Add Start Now chats
  chats.forEach(chat => {
    if (chat.type === 'start-now') {
      const lastMsg = getLastMessage(chat);
      allChats.push({
        type: 'start-now',
        data: chat,
        lastMessage: lastMsg?.text || '',
        timestamp: chat.updatedAt,
      });
    }
  });
  
  // Add activity chats (simulated)
  joinedActivities.forEach(activity => {
    allChats.push({
      type: 'activity',
      data: activity,
      lastMessage: '"On my way! 🏃"',
      timestamp: new Date(),
    });
  });
  
  // Sort by timestamp (most recent first)
  allChats.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  
  const hasChats = allChats.length > 0;

  const handleChatClick = (item: typeof allChats[0]) => {
    if (item.type === 'start-now') {
      const chat = item.data as Chat;
      navigate(`/direct-chat/${chat.user?.id}`, { state: { user: chat.user } });
    } else {
      const activity = item.data as typeof joinedActivities[0];
      navigate(`/chat/${activity.id}`);
    }
  };

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
          <div className="space-y-2">
            {allChats.map((item, index) => {
              if (item.type === 'start-now') {
                const chat = item.data as Chat;
                return (
                  <button
                    key={chat.id}
                    onClick={() => handleChatClick(item)}
                    className="w-full flex items-center gap-3 p-3 bg-card rounded-xl border border-border/50 hover:bg-card/80 transition-colors text-left"
                  >
                    <Avatar className="w-12 h-12 shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {chat.user?.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground truncate">
                          {chat.user?.name}
                        </h3>
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-semibold shrink-0">
                          <Zap className="w-2.5 h-2.5" />
                          Start Now
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-0.5">
                        {item.lastMessage}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(item.timestamp)}
                      </span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </button>
                );
              } else {
                const activity = item.data as typeof joinedActivities[0];
                return (
                  <button
                    key={activity.id}
                    onClick={() => handleChatClick(item)}
                    className="w-full flex items-center gap-3 p-3 bg-card rounded-xl border border-border/50 hover:bg-card/80 transition-colors text-left"
                  >
                    <SportIcon sport={activity.sport} size="md" />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground truncate">
                          {activity.title}
                        </h3>
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground text-[10px] font-semibold shrink-0">
                          <Users className="w-2.5 h-2.5" />
                          Activity
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-0.5">
                        {item.lastMessage}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(item.timestamp)}
                      </span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </button>
                );
              }
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
              <span className="text-3xl">💬</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">No chats yet</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-[250px]">
              Join a game or tap Start Now to chat with players
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

      <BottomNav />
    </MobileLayout>
  );
}
