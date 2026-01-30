import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Send, Zap } from 'lucide-react';
import { User } from '@/types/user';
import { useChats } from '@/contexts/ChatContext';
import { cn } from '@/lib/utils';

export default function DirectChatScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const user = location.state?.user as User | undefined;
  const { createOrGetStartNowChat, addMessage, getChat } = useChats();

  const [newMessage, setNewMessage] = useState('');
  const [chatId, setChatId] = useState<string | null>(null);

  // Initialize chat when user is available
  useEffect(() => {
    if (user) {
      const chat = createOrGetStartNowChat(user);
      setChatId(chat.id);
    }
  }, [user, createOrGetStartNowChat]);

  const currentChat = chatId ? getChat(chatId) : undefined;
  const messages = currentChat?.messages || [];

  const handleSend = () => {
    if (!newMessage.trim() || !chatId) return;

    addMessage(chatId, {
      text: newMessage,
      sender: 'user',
    });
    setNewMessage('');

    // Simulate response after delay
    setTimeout(() => {
      if (chatId) {
        addMessage(chatId, {
          text: "Hey! I'm down to play. Where should we meet?",
          sender: 'other',
        });
      }
    }, 1500);
  };

  const sendQuickInvite = () => {
    if (!chatId) return;
    addMessage(chatId, {
      text: "⚡ Quick Invite: Let's play right now! I'm ready to go.",
      sender: 'user',
    });
  };

  if (!user) {
    return (
      <MobileLayout className="flex items-center justify-center">
        <p className="text-muted-foreground">User not found</p>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout className="bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => navigate('/start-now-match')}
            className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>

          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {user.name[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h1 className="font-semibold text-foreground">{user.name}</h1>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-live" />
              <span>Available now • {user.distance}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex',
              message.sender === 'user' && 'justify-end',
              message.sender === 'system' && 'justify-center',
              message.sender === 'other' && 'justify-start'
            )}
          >
            {message.sender === 'system' ? (
              <div className="bg-muted/50 text-muted-foreground text-xs px-3 py-1.5 rounded-full">
                {message.text}
              </div>
            ) : (
              <div
                className={cn(
                  'max-w-[80%] px-4 py-2.5 rounded-2xl text-sm',
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-card text-foreground rounded-bl-md shadow-sm'
                )}
              >
                {message.text}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="px-4 py-2 border-t border-border bg-background">
        <Button
          variant="ghost"
          size="sm"
          className="text-primary text-xs"
          onClick={sendQuickInvite}
        >
          <Zap className="w-3 h-3 mr-1" />
          Send Quick Invite
        </Button>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border bg-background">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-muted border-0 rounded-full"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button
            size="icon"
            className="rounded-full gradient-action shrink-0"
            onClick={handleSend}
            disabled={!newMessage.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}
