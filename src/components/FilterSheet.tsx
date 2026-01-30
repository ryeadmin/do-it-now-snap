import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, X } from 'lucide-react';
import { SportType } from '@/types/activity';
import { SportIcon } from './SportIcon';

export interface FilterOptions {
  distance: number | null;
  time: number | null;
  sport: SportType | null;
  spotsAvailable: boolean;
}

interface FilterSheetProps {
  filters: FilterOptions;
  onApplyFilters: (filters: FilterOptions) => void;
  activeFilterCount: number;
}

const distanceOptions = [
  { label: '0.5 km', value: 0.5 },
  { label: '1 km', value: 1 },
  { label: '3 km', value: 3 },
  { label: '5 km', value: 5 },
];

const timeOptions = [
  { label: 'Now', value: 15 },
  { label: '30 min', value: 30 },
  { label: '1 hour', value: 60 },
  { label: '2 hours', value: 120 },
];

const sportOptions: { label: string; value: SportType }[] = [
  { label: '🏀 Basketball', value: 'basketball' },
  { label: '⚽ Soccer', value: 'soccer' },
  { label: '🎾 Tennis', value: 'tennis' },
  { label: '🏐 Volleyball', value: 'volleyball' },
  { label: '🏃 Running', value: 'running' },
  { label: '🎾 Padel', value: 'padel' },
];

export function FilterSheet({ filters, onApplyFilters, activeFilterCount }: FilterSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

  const handleApply = () => {
    onApplyFilters(localFilters);
    setIsOpen(false);
  };

  const handleClear = () => {
    const clearedFilters: FilterOptions = {
      distance: null,
      time: null,
      sport: null,
      spotsAvailable: false,
    };
    setLocalFilters(clearedFilters);
    onApplyFilters(clearedFilters);
    setIsOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setLocalFilters(filters);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="relative">
          <SlidersHorizontal className="w-5 h-5" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
        <SheetHeader className="pb-4 flex flex-row items-center justify-between">
          <SheetTitle>Filters</SheetTitle>
          <button
            onClick={handleClear}
            className="text-sm text-primary font-medium"
          >
            Clear all
          </button>
        </SheetHeader>

        <div className="space-y-6 pb-24 overflow-y-auto">
          {/* Distance */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Distance</h3>
            <div className="flex flex-wrap gap-2">
              {distanceOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setLocalFilters(f => ({ 
                    ...f, 
                    distance: f.distance === option.value ? null : option.value 
                  }))}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    localFilters.distance === option.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Time */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Starting in</h3>
            <div className="flex flex-wrap gap-2">
              {timeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setLocalFilters(f => ({ 
                    ...f, 
                    time: f.time === option.value ? null : option.value 
                  }))}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    localFilters.time === option.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sport Type */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Sport</h3>
            <div className="grid grid-cols-2 gap-2">
              {sportOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setLocalFilters(f => ({ 
                    ...f, 
                    sport: f.sport === option.value ? null : option.value 
                  }))}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
                    localFilters.sport === option.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Spots Available */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Availability</h3>
            <button
              onClick={() => setLocalFilters(f => ({ ...f, spotsAvailable: !f.spotsAvailable }))}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                localFilters.spotsAvailable
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              ✓ Has spots available
            </button>
          </div>
        </div>

        {/* Apply Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 pb-safe-bottom bg-background border-t border-border">
          <Button 
            variant="action" 
            size="xl" 
            className="w-full"
            onClick={handleApply}
          >
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function ActiveFilters({ 
  filters, 
  onRemoveFilter 
}: { 
  filters: FilterOptions; 
  onRemoveFilter: (key: keyof FilterOptions) => void;
}) {
  const tags: { key: keyof FilterOptions; label: string }[] = [];
  
  if (filters.distance) tags.push({ key: 'distance', label: `Within ${filters.distance} km` });
  if (filters.time) tags.push({ key: 'time', label: filters.time <= 15 ? 'Now' : `${filters.time} min` });
  if (filters.sport) tags.push({ key: 'sport', label: filters.sport });
  if (filters.spotsAvailable) tags.push({ key: 'spotsAvailable', label: 'Has spots' });
  
  if (tags.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-2 px-4 pb-3">
      {tags.map((tag) => (
        <button
          key={tag.key}
          onClick={() => onRemoveFilter(tag.key)}
          className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
        >
          <span className="capitalize">{tag.label}</span>
          <X className="w-3 h-3" />
        </button>
      ))}
    </div>
  );
}
