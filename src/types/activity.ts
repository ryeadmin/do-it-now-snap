export type SportType = 
  | 'basketball'
  | 'soccer'
  | 'tennis'
  | 'volleyball'
  | 'running'
  | 'cycling'
  | 'padel'
  | 'badminton';

export interface Activity {
  id: string;
  sport: SportType;
  title: string;
  location: string;
  distance: number; // in km
  startsIn: number; // in minutes
  spotsTotal: number;
  spotsTaken: number;
  hostName: string;
  hostAvatar: string;
  level: 'any' | 'beginner' | 'intermediate' | 'advanced';
  isJustPosted?: boolean;
  isHost?: boolean;
  note?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: Date;
  isOwn: boolean;
}
