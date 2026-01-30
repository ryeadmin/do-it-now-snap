import { MobileLayout } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit2, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SportIcon } from '@/components/SportIcon';
import { SportType } from '@/types/activity';

const userProfile = {
  name: 'Alex Johnson',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexJ',
  bio: 'Love staying active and meeting new people through sports!',
  preferredSports: ['basketball', 'tennis', 'running'] as SportType[],
  skillLevel: 'Intermediate' as 'Beginner' | 'Intermediate' | 'Advanced',
  isAvailable: true,
  gamesPlayed: 24,
  rating: 4.8,
};

export default function ProfileScreen() {
  const navigate = useNavigate();

  return (
    <MobileLayout className="flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <h1 className="font-bold text-lg">Profile</h1>
          
          <Button variant="ghost" size="icon-sm">
            <Edit2 className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Profile Content */}
      <main className="flex-1 px-6 py-6 pb-24 overflow-y-auto">
        {/* Avatar & Name */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-24 h-24 rounded-full bg-secondary border-4 border-background shadow-lg"
            />
            {userProfile.isAvailable && (
              <div className="absolute bottom-1 right-1 w-6 h-6 bg-live rounded-full border-2 border-background flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-foreground">{userProfile.name}</h2>
          
          {/* Availability Badge */}
          <div className={`mt-2 px-4 py-1.5 rounded-full text-sm font-semibold ${
            userProfile.isAvailable 
              ? 'bg-live/10 text-live' 
              : 'bg-muted text-muted-foreground'
          }`}>
            {userProfile.isAvailable ? '🟢 Available now' : '⚫ Not available'}
          </div>
        </div>

        {/* Bio */}
        {userProfile.bio && (
          <p className="text-center text-muted-foreground mb-6 px-4">
            {userProfile.bio}
          </p>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-card rounded-xl border border-border/50 text-center">
            <p className="text-2xl font-bold text-foreground">{userProfile.gamesPlayed}</p>
            <p className="text-sm text-muted-foreground">Games Played</p>
          </div>
          <div className="p-4 bg-card rounded-xl border border-border/50 text-center">
            <p className="text-2xl font-bold text-foreground">⭐ {userProfile.rating}</p>
            <p className="text-sm text-muted-foreground">Rating</p>
          </div>
        </div>

        {/* Skill Level */}
        <div className="p-4 bg-card rounded-xl border border-border/50 mb-4">
          <h3 className="font-semibold text-foreground mb-3">Skill Level</h3>
          <div className="flex gap-2">
            {(['Beginner', 'Intermediate', 'Advanced'] as const).map((level) => (
              <div
                key={level}
                className={`flex-1 py-2 px-3 rounded-lg text-center text-sm font-medium transition-colors ${
                  userProfile.skillLevel === level
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground'
                }`}
              >
                {level}
              </div>
            ))}
          </div>
        </div>

        {/* Preferred Sports */}
        <div className="p-4 bg-card rounded-xl border border-border/50">
          <h3 className="font-semibold text-foreground mb-3">Preferred Sports</h3>
          <div className="flex flex-wrap gap-3">
            {userProfile.preferredSports.map((sport) => (
              <div
                key={sport}
                className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg"
              >
                <SportIcon sport={sport} size="sm" />
                <span className="text-sm font-medium capitalize text-foreground">{sport}</span>
              </div>
            ))}
          </div>
        </div>
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
          <button 
            onClick={() => navigate('/chats')}
            className="flex flex-col items-center gap-1 text-muted-foreground"
          >
            <span className="text-2xl">💬</span>
            <span className="text-xs font-medium">Chats</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-primary">
            <span className="text-2xl">👤</span>
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </MobileLayout>
  );
}
