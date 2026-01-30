import { useState } from 'react';
import { MapPin, Search, X, ChevronRight } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const mockLocations = [
  { id: '1', name: 'Downtown', type: 'neighborhood' },
  { id: '2', name: 'Central Park', type: 'venue' },
  { id: '3', name: 'Midtown', type: 'neighborhood' },
  { id: '4', name: 'Brooklyn Heights', type: 'neighborhood' },
  { id: '5', name: 'West Village', type: 'neighborhood' },
  { id: '6', name: 'Chelsea Piers', type: 'venue' },
  { id: '7', name: 'Upper East Side', type: 'neighborhood' },
  { id: '8', name: 'SoHo', type: 'neighborhood' },
];

interface LocationSelectorProps {
  currentLocation: string;
  onLocationChange: (location: string) => void;
}

export function LocationSelector({ currentLocation, onLocationChange }: LocationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLocations = mockLocations.filter(loc =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectLocation = (locationName: string) => {
    onLocationChange(locationName);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-medium">{currentLocation}</span>
        </button>
      </SheetTrigger>
      
      <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl">
        <SheetHeader className="pb-4">
          <SheetTitle>Select Location</SheetTitle>
        </SheetHeader>
        
        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search neighborhood, city, or venue..."
            className="w-full h-12 pl-12 pr-10 rounded-xl bg-secondary border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Current Location */}
        <button
          onClick={() => handleSelectLocation(currentLocation)}
          className="w-full flex items-center gap-3 p-4 mb-2 bg-primary/10 rounded-xl text-left"
        >
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground">Use current location</p>
            <p className="text-sm text-muted-foreground">{currentLocation}</p>
          </div>
        </button>

        {/* Location List */}
        <div className="space-y-1 mt-4 max-h-[40vh] overflow-y-auto">
          <p className="text-xs font-semibold text-muted-foreground uppercase px-1 mb-2">
            Nearby locations
          </p>
          {filteredLocations.map((location) => (
            <button
              key={location.id}
              onClick={() => handleSelectLocation(location.name)}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-secondary transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  {location.type === 'venue' ? '🏟️' : '📍'}
                </div>
                <div>
                  <p className="font-medium text-foreground">{location.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{location.type}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
          
          {filteredLocations.length === 0 && searchQuery && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No locations found for "{searchQuery}"</p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
