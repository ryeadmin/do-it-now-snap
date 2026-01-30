import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User } from '@/types/user';
import { Activity } from '@/types/activity';

export type ChatType = 'start-now' | 'activity';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other' | 'system';
  timestamp: Date;
}

export interface Chat {
  id: string;
  type: ChatType;
  // For start-now chats
  user?: User;
  // For activity chats
  activity?: Activity;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

interface ChatContextType {
  chats: Chat[];
  getChat: (id: string) => Chat | undefined;
  createOrGetStartNowChat: (user: User) => Chat;
  createOrGetActivityChat: (activity: Activity) => Chat;
  addMessage: (chatId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
  getLastMessage: (chat: Chat) => Message | undefined;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const SYSTEM_MESSAGE_START_NOW: Message = {
  id: 'system-welcome',
  text: "You both are available right now. Want to meet up?",
  sender: 'system',
  timestamp: new Date(),
};

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([]);

  const getChat = useCallback((id: string) => {
    return chats.find(chat => chat.id === id);
  }, [chats]);

  const createOrGetStartNowChat = useCallback((user: User): Chat => {
    const existingChat = chats.find(
      chat => chat.type === 'start-now' && chat.user?.id === user.id
    );

    if (existingChat) {
      return existingChat;
    }

    const newChat: Chat = {
      id: `start-now-${user.id}`,
      type: 'start-now',
      user,
      messages: [SYSTEM_MESSAGE_START_NOW],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setChats(prev => [newChat, ...prev]);
    return newChat;
  }, [chats]);

  const createOrGetActivityChat = useCallback((activity: Activity): Chat => {
    const existingChat = chats.find(
      chat => chat.type === 'activity' && chat.activity?.id === activity.id
    );

    if (existingChat) {
      return existingChat;
    }

    const newChat: Chat = {
      id: `activity-${activity.id}`,
      type: 'activity',
      activity,
      messages: [
        {
          id: 'system-activity',
          text: `Welcome to ${activity.title}!`,
          sender: 'system',
          timestamp: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setChats(prev => [newChat, ...prev]);
    return newChat;
  }, [chats]);

  const addMessage = useCallback((chatId: string, message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };

    setChats(prev =>
      prev.map(chat =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              updatedAt: new Date(),
            }
          : chat
      )
    );
  }, []);

  const getLastMessage = useCallback((chat: Chat): Message | undefined => {
    return chat.messages[chat.messages.length - 1];
  }, []);

  return (
    <ChatContext.Provider
      value={{
        chats,
        getChat,
        createOrGetStartNowChat,
        createOrGetActivityChat,
        addMessage,
        getLastMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChats() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChats must be used within a ChatProvider');
  }
  return context;
}
