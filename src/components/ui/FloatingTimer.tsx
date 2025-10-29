import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Square, 
  Volume2, 
  VolumeX, 
  ChevronUp, 
  ChevronDown,
  Clock
} from 'lucide-react';
import { useAmbientSounds } from '@/hooks/useAmbientSounds';

interface FloatingTimerProps {
  timeLeft: number;
  isActive: boolean;
  currentTechnique: string;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  onClose: () => void;
}

export const FloatingTimer = ({
  timeLeft,
  isActive,
  currentTechnique,
  onStart,
  onPause,
  onStop,
  onClose
}: FloatingTimerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { sounds, currentSound, volume, toggleSound, changeVolume, isPlaying } = useAmbientSounds();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2">
      <Card className="bg-card/95 backdrop-blur-sm border shadow-lg">
        {/* Compact Header */}
        <div className="flex items-center gap-3 p-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <div className="text-sm font-medium">{formatTime(timeLeft)}</div>
          </div>
          
          <Badge variant="secondary" className="text-xs">
            {currentTechnique}
          </Badge>

          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7"
              onClick={isActive ? onPause : onStart}
            >
              {isActive ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            </Button>
            
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7"
              onClick={onStop}
            >
              <Square className="h-3 w-3" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />}
            </Button>
          </div>
        </div>

        {/* Expanded Controls */}
        {isExpanded && (
          <div className="border-t p-3 space-y-3">
            {/* Sound Controls */}
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground">Focus Sounds</div>
              <div className="flex gap-1">
                {sounds.map((sound) => (
                  <Button
                    key={sound.id}
                    size="sm"
                    variant={currentSound?.id === sound.id ? "default" : "outline"}
                    className="h-7 px-2 text-xs"
                    onClick={() => toggleSound(sound)}
                  >
                    {sound.icon} {sound.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Volume Control */}
            {currentSound && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <VolumeX className="h-3 w-3 text-muted-foreground" />
                  <Slider
                    value={[volume * 100]}
                    onValueChange={(value) => changeVolume(value[0] / 100)}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <Volume2 className="h-3 w-3 text-muted-foreground" />
                </div>
              </div>
            )}

            {/* Close Button */}
            <Button
              size="sm"
              variant="ghost"
              className="w-full h-7 text-xs"
              onClick={onClose}
            >
              Hide Timer
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};