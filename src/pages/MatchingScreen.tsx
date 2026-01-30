import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { Zap, Users, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const matchingMessages = [
  "Finding players nearby...",
  "Checking availability...",
  "Almost there...",
  "Match found!"
];

const matchedProfiles = [
  { name: 'Alex', sport: '🏀', distance: '0.3 km' },
  { name: 'Jordan', sport: '⚽', distance: '0.5 km' },
  { name: 'Sam', sport: '🎾', distance: '0.8 km' },
];

export default function MatchingScreen() {
  const navigate = useNavigate();
  const [messageIndex, setMessageIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const [pulseScale, setPulseScale] = useState(1);

  useEffect(() => {
    // Cycle through messages
    const messageTimer = setInterval(() => {
      setMessageIndex(prev => {
        if (prev < matchingMessages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1200);

    // Pulse animation
    const pulseTimer = setInterval(() => {
      setPulseScale(prev => prev === 1 ? 1.1 : 1);
    }, 800);

    // Show match after delay
    const matchTimer = setTimeout(() => {
      setShowMatch(true);
    }, 3500);

    // Navigate to user matching screen (not activity)
    const navigateTimer = setTimeout(() => {
      navigate('/start-now-match');
    }, 5000);

    return () => {
      clearInterval(messageTimer);
      clearInterval(pulseTimer);
      clearTimeout(matchTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);

  return (
    <MobileLayout className="flex flex-col items-center justify-center bg-gradient-to-b from-primary/10 to-background">
      <div className="flex-1 flex flex-col items-center justify-center px-6 w-full">
        {!showMatch ? (
          // Matching Animation
          <div className="flex flex-col items-center gap-8 animate-slide-up">
            {/* Pulsing Icon */}
            <div className="relative">
              <div 
                className="w-32 h-32 rounded-full gradient-action flex items-center justify-center shadow-glow transition-transform duration-300"
                style={{ transform: `scale(${pulseScale})` }}
              >
                <Zap className="w-16 h-16 text-primary-foreground" />
              </div>
              {/* Ripple rings */}
              <div className="absolute inset-0 w-32 h-32 rounded-full border-2 border-primary/40 animate-pulse-ring" />
              <div className="absolute inset-0 w-32 h-32 rounded-full border-2 border-primary/20 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
            </div>

            {/* Status Message */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                {matchingMessages[messageIndex]}
              </h2>
              <p className="text-muted-foreground">
                Looking for players ready now
              </p>
            </div>

            {/* Progress dots */}
            <div className="flex gap-2">
              {matchingMessages.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    i <= messageIndex ? "bg-primary w-4" : "bg-muted"
                  )}
                />
              ))}
            </div>
          </div>
        ) : (
          // Match Found
          <div className="flex flex-col items-center gap-6 animate-slide-up w-full max-w-sm">
            {/* Success Icon */}
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-glow">
              <Users className="w-10 h-10 text-primary-foreground" />
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-1">
                Match Found!
              </h2>
              <p className="text-muted-foreground">
                Connecting you now...
              </p>
            </div>

            {/* Matched Profiles */}
            <div className="w-full space-y-3">
              {matchedProfiles.slice(0, 2).map((profile, i) => (
                <div 
                  key={profile.name}
                  className="flex items-center gap-4 p-4 bg-card rounded-2xl shadow-card animate-slide-up"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl">
                    {profile.sport}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{profile.name}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{profile.distance}</span>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    Ready Now
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
