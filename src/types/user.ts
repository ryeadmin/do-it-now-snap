export interface User {
  id: string;
  name: string;
  avatar?: string;
  sports: string[];
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  distance: string;
  isAvailable: boolean;
  bio?: string;
}

export interface DirectChat {
  id: string;
  recipientId: string;
  recipientName: string;
  recipientAvatar?: string;
  lastMessage: string;
  timestamp: Date;
}
