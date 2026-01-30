import { useState } from 'react';
import { MobileLayout } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SportIcon } from '@/components/SportIcon';
import { ArrowLeft, MapPin, Clock, Users, ChevronDown, ChevronUp, Check, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SportType } from '@/types/activity';
import { cn } from '@/lib/utils';

const sportOptions: { label: string; value: SportType; icon: string }[] = [
  { label: 'Basketball', value: 'basketball', icon: '🏀' },
  { label: 'Soccer', value: 'soccer', icon: '⚽' },
  { label: 'Tennis', value: 'tennis', icon: '🎾' },
  { label: 'Running', value: 'running', icon: '🏃' },
  { label: 'Padel', value: 'padel', icon: '🎾' },
];

const timeOptions = [
  { label: 'Now', value: 0 },
  { label: '30 min', value: 30 },
  { label: '1 hour', value: 60 },
];

const spotOptions = [1, 2, 3, 4, 5];

const levelOptions = [
  { label: 'Any Level', value: 'any' as const },
  { label: 'Beginner', value: 'beginner' as const },
  { label: 'Intermediate', value: 'intermediate' as const },
  { label: 'Advanced', value: 'advanced' as const },
];

type Step = 'create' | 'confirm';

export default function CreateGameScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('create');
  const [isPosting, setIsPosting] = useState(false);
  
  // Required fields
  const [selectedSport, setSelectedSport] = useState<SportType | null>(null);
  const [location, setLocation] = useState('Downtown Park');
  const [startTime, setStartTime] = useState<number>(0);
  const [spotsNeeded, setSpotsNeeded] = useState<number>(2);
  
  // Optional fields
  const [showOptional, setShowOptional] = useState(false);
  const [skillLevel, setSkillLevel] = useState<'any' | 'beginner' | 'intermediate' | 'advanced'>('any');
  const [note, setNote] = useState('');

  const isFormValid = selectedSport && location.trim().length > 0;

  const handleContinue = () => {
    if (isFormValid) {
      setStep('confirm');
    }
  };

  const handlePost = () => {
    setIsPosting(true);
    
    // Simulate posting delay
    setTimeout(() => {
      // Create a unique ID for the new game
      const newGameId = `new-${Date.now()}`;
      
      // Store the new game in sessionStorage so it appears in the feed
      const newGame = {
        id: newGameId,
        sport: selectedSport,
        title: getGameTitle(),
        location,
        distance: 0.1,
        startsIn: startTime,
        spotsTotal: spotsNeeded + 1,
        spotsTaken: 1,
        hostName: 'You',
        hostAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Me',
        level: skillLevel,
        isJustPosted: true,
        isHost: true,
        note: note || undefined,
      };
      
      sessionStorage.setItem('newGame', JSON.stringify(newGame));
      
      // Navigate to the game detail, then to chat
      navigate(`/activity/${newGameId}?justPosted=true`);
    }, 1000);
  };

  const getGameTitle = () => {
    const sportLabels: Record<SportType, string> = {
      basketball: 'Basketball game',
      soccer: 'Soccer match',
      tennis: 'Tennis match',
      volleyball: 'Volleyball game',
      running: 'Running group',
      cycling: 'Cycling group',
      padel: 'Padel match',
      badminton: 'Badminton game',
    };
    return selectedSport ? sportLabels[selectedSport] : 'Game';
  };

  const getTimeLabel = () => {
    if (startTime === 0) return 'Starting Now';
    if (startTime === 30) return 'In 30 minutes';
    return 'In 1 hour';
  };

  if (step === 'confirm') {
    return (
      <MobileLayout className="flex flex-col">
        <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50">
          <div className="px-4 py-3 flex items-center gap-3">
            <Button variant="ghost" size="icon-sm" onClick={() => setStep('create')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-bold text-lg">Confirm Game</h1>
          </div>
        </header>

        <main className="flex-1 p-6 flex flex-col">
          {/* Game Summary Card */}
          <div className="bg-card rounded-2xl border border-border/50 p-6 space-y-4">
            <div className="flex items-center gap-4">
              <SportIcon sport={selectedSport!} size="lg" />
              <div>
                <h2 className="text-xl font-bold text-foreground">{getGameTitle()}</h2>
                <p className="text-sm text-muted-foreground capitalize">{skillLevel} level</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-3 text-foreground">
                <Clock className="w-5 h-5 text-primary" />
                <span>{getTimeLabel()}</span>
              </div>
              <div className="flex items-center gap-3 text-foreground">
                <Users className="w-5 h-5 text-primary" />
                <span>Looking for {spotsNeeded} {spotsNeeded === 1 ? 'player' : 'players'}</span>
              </div>
            </div>

            {note && (
              <div className="pt-3 border-t border-border/50">
                <p className="text-sm text-muted-foreground italic">"{note}"</p>
              </div>
            )}
          </div>

          {/* Success indication */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Ready to go live!</p>
            </div>
          </div>

          {/* Post Button */}
          <div className="pt-4">
            <Button
              variant="action"
              size="xl"
              className="w-full shadow-glow"
              onClick={handlePost}
              disabled={isPosting}
            >
              {isPosting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Post Game Now
                </>
              )}
            </Button>
          </div>
        </main>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout className="flex flex-col">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon-sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-bold text-lg">Host a Game</h1>
        </div>
      </header>

      <main className="flex-1 p-6 pb-32 overflow-y-auto">
        <div className="space-y-8">
          {/* Sport Selection */}
          <section className="space-y-3">
            <label className="text-sm font-semibold text-foreground">What are you playing?</label>
            <div className="grid grid-cols-5 gap-2">
              {sportOptions.map((sport) => (
                <button
                  key={sport.value}
                  onClick={() => setSelectedSport(sport.value)}
                  className={cn(
                    'flex flex-col items-center gap-1 p-3 rounded-xl transition-all',
                    selectedSport === sport.value
                      ? 'bg-primary text-primary-foreground scale-105 shadow-lg'
                      : 'bg-secondary hover:bg-secondary/80'
                  )}
                >
                  <span className="text-2xl">{sport.icon}</span>
                  <span className="text-xs font-medium truncate w-full text-center">
                    {sport.label}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Location */}
          <section className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Where?</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 h-12 text-base"
                placeholder="Enter location"
              />
            </div>
          </section>

          {/* Start Time */}
          <section className="space-y-3">
            <label className="text-sm font-semibold text-foreground">When?</label>
            <div className="flex gap-2">
              {timeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setStartTime(option.value)}
                  className={cn(
                    'flex-1 py-3 px-4 rounded-xl font-semibold transition-all',
                    startTime === option.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </section>

          {/* Spots Needed */}
          <section className="space-y-3">
            <label className="text-sm font-semibold text-foreground">How many players needed?</label>
            <div className="flex gap-2">
              {spotOptions.map((num) => (
                <button
                  key={num}
                  onClick={() => setSpotsNeeded(num)}
                  className={cn(
                    'flex-1 py-3 rounded-xl font-bold text-lg transition-all',
                    spotsNeeded === num
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  )}
                >
                  {num}
                </button>
              ))}
            </div>
          </section>

          {/* Optional Details Toggle */}
          <button
            onClick={() => setShowOptional(!showOptional)}
            className="w-full flex items-center justify-between py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>Add optional details</span>
            {showOptional ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {/* Optional Fields */}
          {showOptional && (
            <div className="space-y-6 animate-slide-up">
              {/* Skill Level */}
              <section className="space-y-3">
                <label className="text-sm font-semibold text-foreground">Skill level</label>
                <div className="grid grid-cols-2 gap-2">
                  {levelOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSkillLevel(option.value)}
                      className={cn(
                        'py-3 px-4 rounded-xl font-medium transition-all text-sm',
                        skillLevel === option.value
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </section>

              {/* Note */}
              <section className="space-y-3">
                <label className="text-sm font-semibold text-foreground">Quick note (optional)</label>
                <Input
                  value={note}
                  onChange={(e) => setNote(e.target.value.slice(0, 80))}
                  className="h-12 text-base"
                  placeholder="e.g., Casual game, all welcome!"
                  maxLength={80}
                />
                <p className="text-xs text-muted-foreground text-right">{note.length}/80</p>
              </section>
            </div>
          )}
        </div>
      </main>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border/50">
        <div className="max-w-[430px] mx-auto">
          <Button
            variant="action"
            size="lg"
            className="w-full"
            onClick={handleContinue}
            disabled={!isFormValid}
          >
            Continue
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
}
