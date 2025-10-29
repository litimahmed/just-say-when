import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Download, Upload, Wand2, Clock, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TimestampedText {
  time: number;
  text: string;
  id: string;
}

interface VideoTranscriptPlayerProps {
  videoUrl: string;
  title: string;
  transcript?: TimestampedText[];
  onTranscriptUpdate?: (transcript: TimestampedText[]) => void;
}

export function VideoTranscriptPlayer({ 
  videoUrl, 
  title, 
  transcript = [], 
  onTranscriptUpdate 
}: VideoTranscriptPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTranscriptIndex, setActiveTranscriptIndex] = useState(-1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [rawTranscript, setRawTranscript] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  useEffect(() => {
    // Find active transcript segment based on current time
    const currentIndex = transcript.findIndex((item, index) => {
      const nextItem = transcript[index + 1];
      return currentTime >= item.time && (!nextItem || currentTime < nextItem.time);
    });
    setActiveTranscriptIndex(currentIndex);
  }, [currentTime, transcript]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    const newVolume = value[0];
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const jumpToTime = (time: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const generateTranscript = async () => {
    setIsGenerating(true);
    
    // Simulate auto-generation (in real implementation, you'd call speech-to-text API)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock generated transcript with timestamps
    const mockTranscript: TimestampedText[] = [
      { id: '1', time: 0, text: "Welcome to this lesson on React components." },
      { id: '2', time: 15, text: "In this video, we'll explore the fundamentals of component architecture." },
      { id: '3', time: 30, text: "Components are the building blocks of React applications." },
      { id: '4', time: 45, text: "Let's start by creating our first functional component." },
      { id: '5', time: 60, text: "Here's how you define props and handle state." }
    ];
    
    onTranscriptUpdate?.(mockTranscript);
    setIsGenerating(false);
  };

  const parseRawTranscript = () => {
    // Simple parser for "00:00 - Text" format
    const lines = rawTranscript.split('\n').filter(line => line.trim());
    const parsed: TimestampedText[] = [];
    
    lines.forEach((line, index) => {
      const match = line.match(/^(\d{1,2}):(\d{2})\s*-\s*(.+)$/);
      if (match) {
        const minutes = parseInt(match[1]);
        const seconds = parseInt(match[2]);
        const time = minutes * 60 + seconds;
        const text = match[3].trim();
        
        parsed.push({
          id: `parsed-${index}`,
          time,
          text
        });
      }
    });
    
    if (parsed.length > 0) {
      onTranscriptUpdate?.(parsed);
      setRawTranscript("");
    }
  };

  const updateTranscriptText = (index: number, newText: string) => {
    const updatedTranscript = [...transcript];
    updatedTranscript[index] = { ...updatedTranscript[index], text: newText };
    onTranscriptUpdate?.(updatedTranscript);
    setEditingIndex(-1);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Video Player */}
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Type className="w-5 h-5" />
            <span>{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 space-y-4">
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full object-contain"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </div>
          
          {/* Video Controls */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={togglePlay}>
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              
              <div className="flex-1">
                <Slider
                  value={[currentTime]}
                  max={duration || 100}
                  step={1}
                  onValueChange={handleSeek}
                  className="w-full"
                />
              </div>
              
              <span className="text-sm text-muted-foreground min-w-[80px]">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={toggleMute}>
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
              
              <div className="w-24">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={1}
                  step={0.1}
                  onValueChange={handleVolumeChange}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transcript Panel */}
      <Card className="flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Interactive Transcript</span>
            </CardTitle>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={generateTranscript}
                disabled={isGenerating}
              >
                <Wand2 className="w-4 h-4 mr-2" />
                {isGenerating ? "Generating..." : "Auto-Generate"}
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 space-y-4">
          {transcript.length === 0 ? (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                No transcript available. Generate one automatically or import your own.
              </p>
              
              <Separator />
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Paste Raw Transcript</label>
                <Textarea
                  placeholder="Format: 00:00 - Text content for that timestamp&#10;00:30 - Next segment text&#10;01:15 - Another segment..."
                  value={rawTranscript}
                  onChange={(e) => setRawTranscript(e.target.value)}
                  rows={6}
                />
                <Button 
                  onClick={parseRawTranscript} 
                  disabled={!rawTranscript.trim()}
                  size="sm"
                >
                  Parse Transcript
                </Button>
              </div>
            </div>
          ) : (
            <ScrollArea className="h-96">
              <div className="space-y-2">
                {transcript.map((item, index) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      index === activeTranscriptIndex
                        ? 'bg-primary/10 border-primary'
                        : 'bg-muted/30 hover:bg-muted/50'
                    }`}
                    onClick={() => jumpToTime(item.time)}
                  >
                    <div className="flex items-start space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {formatTime(item.time)}
                      </Badge>
                      <div className="flex-1">
                        {editingIndex === index ? (
                          <Textarea
                            value={item.text}
                            onChange={(e) => updateTranscriptText(index, e.target.value)}
                            onBlur={() => setEditingIndex(-1)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                setEditingIndex(-1);
                              }
                            }}
                            className="text-sm"
                            autoFocus
                          />
                        ) : (
                          <p 
                            className="text-sm leading-relaxed"
                            onDoubleClick={() => setEditingIndex(index)}
                          >
                            {item.text}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}