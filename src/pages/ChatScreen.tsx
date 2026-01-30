import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { mockActivities, mockChatMessages } from '@/data/mockActivities';
import { ArrowLeft, Send, MapPin, Clock, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatMessage } from '@/types/activity';

interface SystemMessage {
  id: string;
  type: 'system';
  text: string;
  icon: 'clock' | 'location' | 'info';
}

export default function ChatScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [systemMessages, setSystemMessages] = useState<SystemMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const activity = mockActivities.find(a => a.id === id);
  
  useEffect(() => {
    if (activity) {
      // Add system messages when chat opens
      setSystemMessages([
        {
          id: 'sys-1',
          type: 'system',
          text: `Game starts in ${activity.startsIn} minutes`,
          icon: 'clock',
        },
        {
          id: 'sys-2',
          type: 'system',
          text: `Location: ${activity.location}`,
          icon: 'location',
        },
        {
          id: 'sys-3',
          type: 'system',
          text: `${activity.spotsTaken} of ${activity.spotsTotal} players joined`,
          icon: 'info',
        },
      ]);
      
      // Load chat messages
      setMessages(mockChatMessages);
    }
  }, [activity]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  if (!activity) {
    return (
      <MobileLayout className="flex items-center justify-center">
        <p>Activity not found</p>
      </MobileLayout>
    );
  }

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    const message: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      senderName: 'You',
      senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Me',
      text: newMessage,
      timestamp: new Date(),
      isOwn: true,
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  const getSystemIcon = (icon: SystemMessage['icon']) => {
    switch (icon) {
      case 'clock': return <Clock className="w-4 h-4" />;
      case 'location': return <MapPin className="w-4 h-4" />;
      case 'info': return <Info className="w-4 h-4" />;
    }
  };

  return (
    <MobileLayout className="flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => navigate('/feed')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-foreground truncate">
              {activity.title}
            </h1>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>Starts in {activity.startsIn} min</span>
              <span>•</span>
              <MapPin className="w-3 h-3" />
              <span className="truncate">{activity.location}</span>
            </div>
          </div>
          
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <img
                key={i}
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Player${i}`}
                alt=""
                className="w-8 h-8 rounded-full border-2 border-background bg-secondary"
              />
            ))}
            {activity.spotsTaken > 3 && (
              <div className="w-8 h-8 rounded-full border-2 border-background bg-primary flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">
                  +{activity.spotsTaken - 3}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Joined Banner */}
        <div className="px-4 py-2 bg-primary/10 border-t border-primary/20">
          <p className="text-sm text-center text-primary font-semibold">
            ✓ You've joined! Meet at {activity.location}
          </p>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 p-4 overflow-y-auto space-y-4">
        {/* System Messages */}
        <div className="space-y-2 mb-4">
          {systemMessages.map((msg) => (
            <div
              key={msg.id}
              className="flex items-center justify-center gap-2 py-2 px-4 bg-secondary/50 rounded-lg text-sm text-muted-foreground"
            >
              {getSystemIcon(msg.icon)}
              <span>{msg.text}</span>
            </div>
          ))}
        </div>

        {/* Chat Messages */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex gap-3',
              message.isOwn && 'flex-row-reverse'
            )}
          >
            {!message.isOwn && (
              <img
                src={message.senderAvatar}
                alt={message.senderName}
                className="w-8 h-8 rounded-full bg-secondary flex-shrink-0"
              />
            )}
            
            <div className={cn(
              'max-w-[75%]',
              message.isOwn && 'text-right'
            )}>
              {!message.isOwn && (
                <p className="text-xs text-muted-foreground mb-1">
                  {message.senderName}
                </p>
              )}
              <div
                className={cn(
                  'inline-block px-4 py-2 rounded-2xl',
                  message.isOwn
                    ? 'bg-primary text-primary-foreground rounded-br-sm'
                    : 'bg-secondary text-secondary-foreground rounded-bl-sm'
                )}
              >
                <p className="text-sm">{message.text}</p>
              </div>
              <p className="text-2xs text-muted-foreground mt-1">
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      {/* Message Input */}
      <div className="sticky bottom-0 p-4 pb-safe-bottom bg-background border-t border-border">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Message the group..."
            className="flex-1 h-12 px-4 rounded-xl bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button
            variant="action"
            size="icon"
            onClick={handleSend}
            disabled={!newMessage.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}
