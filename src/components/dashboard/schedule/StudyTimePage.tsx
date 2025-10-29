import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { 
  Play,
  Pause,
  Square,
  Brain,
  Coffee,
  Timer,
  Flame,
  SkipForward,
  Clock,
  CheckCircle,
  Users,
  Target,
  Zap,
  Award,
  TrendingUp,
  Lightbulb,
  Focus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useStudyTimer } from "@/hooks/useStudyTimer";
import { SoundControls } from "./SoundControls";
import { useToast } from "@/hooks/use-toast";
import { useTimerContext } from "@/contexts/TimerContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const FOCUS_TECHNIQUES = [
  { 
    id: 'pomodoro', 
    name: 'Pomodoro Technique', 
    duration: 25, 
    description: 'Classic 25-minute focused sessions with 5-minute breaks',
    category: 'Traditional',
    icon: Timer,
    color: 'bg-red-50 border-red-200 hover:bg-red-100'
  },
  { 
    id: 'deep-work', 
    name: 'Deep Work', 
    duration: 90, 
    description: 'Extended 90-minute sessions for complex cognitive tasks',
    category: 'Intensive',
    icon: Focus,
    color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
  },
  { 
    id: 'ultradian', 
    name: 'Ultradian Rhythms', 
    duration: 90, 
    description: 'Natural 90-minute biological focus cycles',
    category: 'Scientific',
    icon: TrendingUp,
    color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
  },
  { 
    id: 'flowtime', 
    name: 'Flowtime Method', 
    duration: 25, 
    description: 'Flexible sessions that adapt to your natural flow state',
    category: 'Adaptive',
    icon: Lightbulb,
    color: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
  },
  { 
    id: 'timeboxing', 
    name: 'Timeboxing', 
    duration: 50, 
    description: 'Structured 50-minute blocks for specific learning objectives',
    category: 'Strategic',
    icon: Target,
    color: 'bg-green-50 border-green-200 hover:bg-green-100'
  },
  { 
    id: '52-17', 
    name: '52-17 Rule', 
    duration: 52, 
    description: 'High-performer method: 52 minutes focus, 17 minutes break',
    category: 'Performance',
    icon: Award,
    color: 'bg-orange-50 border-orange-200 hover:bg-orange-100'
  },
  { 
    id: '45-15', 
    name: '45-15 Method', 
    duration: 45, 
    description: 'Balanced approach with 45-minute sessions and 15-minute breaks',
    category: 'Balanced',
    icon: CheckCircle,
    color: 'bg-teal-50 border-teal-200 hover:bg-teal-100'
  },
  { 
    id: 'micro-learning', 
    name: 'Micro-Learning', 
    duration: 15, 
    description: 'Short 15-minute bursts for quick skill acquisition',
    category: 'Efficient',
    icon: Zap,
    color: 'bg-pink-50 border-pink-200 hover:bg-pink-100'
  }
];

export function StudyTimePage() {
  const { toast } = useToast();
  const timerContext = useTimerContext();
  const [technique, setTechnique] = useState<string>('pomodoro');
  const [showTechniques, setShowTechniques] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const selectedTechnique = FOCUS_TECHNIQUES.find(t => t.id === technique) || FOCUS_TECHNIQUES[0];

  const {
    timeLeft,
    isRunning,
    isPaused,
    currentSession,
    sessionCount,
    startSession,
    pauseTimer,
    stopTimer,
    skipSession,
    formatTime,
    getTodaysStats,
    requestNotificationPermission
  } = useStudyTimer({
    focusDuration: selectedTechnique.duration,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    longBreakInterval: 4,
    soundEnabled: true,
    notificationsEnabled: true,
  });

  const todayStats = getTodaysStats();
  const progressPercentage = timeLeft > 0 && currentSession 
    ? ((currentSession.duration * 60 - timeLeft) / (currentSession.duration * 60)) * 100 
    : 0;

  useEffect(() => {
    requestNotificationPermission();
  }, [requestNotificationPermission]);

  // Update timer context whenever timer state changes
  useEffect(() => {
    timerContext.setTimerData({
      timeLeft,
      isActive: isRunning && !isPaused,
      technique: currentSession?.technique || technique,
      onStart: pauseTimer,
      onPause: pauseTimer,
      onStop: stopTimer,
    });
  }, [timeLeft, isRunning, isPaused, currentSession?.technique, technique, pauseTimer, stopTimer, timerContext]);

  const handleQuickStart = (type: 'focus' | 'short-break' | 'long-break', duration: number) => {
    startSession({
      subject: type === 'focus' ? 'Study Session' : 'Break Time',
      duration,
      type,
      technique,
    });
    toast({
      title: "Session Started!",
      description: `Started ${duration}min ${type.replace('-', ' ')} session`,
    });
    setShowTechniques(false);
  };

  const handleTechniqueSelect = (techniqueId: string) => {
    setTechnique(techniqueId);
    setShowTechniques(false);
  };

  const categoryGroups = FOCUS_TECHNIQUES.reduce((acc, technique) => {
    if (!acc[technique.category]) {
      acc[technique.category] = [];
    }
    acc[technique.category].push(technique);
    return acc;
  }, {} as Record<string, typeof FOCUS_TECHNIQUES>);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Professional Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Timer className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold tracking-tight">Focus & Learning</h1>
            </div>
            <Badge variant="secondary" className="font-medium">
              {Math.round(todayStats.totalMinutes / 60 * 10) / 10}h today
            </Badge>
            {sessionCount > 0 && (
              <div className="flex items-center space-x-1 text-orange-500">
                <Flame className="w-4 h-4" />
                <span className="font-medium">{sessionCount} sessions</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant={showTechniques ? "default" : "outline"}
              onClick={() => setShowTechniques(!showTechniques)}
            >
              <Brain className="w-4 h-4 mr-2" />
              {selectedTechnique.name}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 min-h-0">
        {/* Timer Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Session or Technique Selection */}
          {currentSession ? (
            <Card className={cn(
              "transition-all duration-300",
              currentSession?.type === 'focus' && "border-primary/20 bg-primary/5",
              currentSession?.type === 'short-break' && "border-green-500/20 bg-green-50",
              currentSession?.type === 'long-break' && "border-blue-500/20 bg-blue-50"
            )}>
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {currentSession?.type === 'focus' && <Brain className="w-5 h-5 text-primary" />}
                    {currentSession?.type === 'short-break' && <Coffee className="w-5 h-5 text-green-600" />}
                    {currentSession?.type === 'long-break' && <Coffee className="w-5 h-5 text-blue-600" />}
                    <span className="font-medium">
                      {currentSession?.type === 'focus' && 'Focus Session'}
                      {currentSession?.type === 'short-break' && 'Short Break'}
                      {currentSession?.type === 'long-break' && 'Long Break'}
                    </span>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {selectedTechnique.name}
                  </Badge>
                </div>

                <div className="flex justify-center mb-6">
                  <div className="w-64 h-64">
                    <CircularProgressbar
                      value={progressPercentage}
                      text={formatTime(timeLeft)}
                      styles={buildStyles({
                        textColor: 'hsl(var(--foreground))',
                        pathColor: 'hsl(var(--primary))',
                        trailColor: 'hsl(var(--muted))',
                        textSize: '14px',
                      })}
                    />
                  </div>
                </div>
                
                <div className="flex justify-center space-x-3">
                  <Button 
                    variant={isRunning && !isPaused ? "secondary" : "default"} 
                    onClick={pauseTimer}
                  >
                    {isRunning && !isPaused ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                    {isRunning && !isPaused ? "Pause" : "Resume"}
                  </Button>
                  <Button variant="outline" onClick={skipSession}>
                    <SkipForward className="w-4 h-4 mr-2" />
                    Skip
                  </Button>
                  <Button variant="outline" onClick={stopTimer}>
                    <Square className="w-4 h-4 mr-2" />
                    Stop
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Technique Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5" />
                    <span>Choose Your Focus Method</span>
                  </CardTitle>
                </CardHeader>
          <CardContent className="space-y-6">
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="w-full justify-start overflow-x-auto">
                <TabsTrigger value="All">All</TabsTrigger>
                {Object.keys(categoryGroups).map((cat) => (
                  <TabsTrigger key={cat} value={cat}>
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value={activeCategory} className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {FOCUS_TECHNIQUES.filter((t) =>
                    activeCategory === 'All' ? true : t.category === activeCategory
                  ).map((t) => (
                    <Card
                      key={t.id}
                      className={cn(
                        "cursor-pointer transition-all duration-200 border-2 bg-card hover:bg-accent",
                        technique === t.id && "border-primary bg-primary/5"
                      )}
                      onClick={() => handleTechniqueSelect(t.id)}
                      aria-pressed={technique === t.id}
                      role="button"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1 min-w-0">
                            <h5 className="font-medium text-sm truncate">{t.name}</h5>
                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                              {t.description}
                            </p>
                          </div>
                          <Badge variant="secondary" className="text-xs shrink-0 whitespace-nowrap">
                            {t.duration} min
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
              </Card>

              {/* Quick Start */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Start Session</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg mb-4">
                    <div className="flex items-center space-x-3">
                      <selectedTechnique.icon className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium">{selectedTechnique.name}</div>
                        <div className="text-sm text-muted-foreground">{selectedTechnique.description}</div>
                      </div>
                    </div>
                    <Badge variant="outline">{selectedTechnique.duration} minutes</Badge>
                  </div>
                  <Button 
                    className="w-full h-12"
                    onClick={() => handleQuickStart('focus', selectedTechnique.duration)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start {selectedTechnique.name} Session
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <SoundControls />

          <Card>
            <CardHeader>
              <CardTitle>Today's Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {Math.round(todayStats.totalMinutes / 60 * 10) / 10}h
                  </div>
                  <div className="text-sm text-muted-foreground">Total study time</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold flex items-center justify-center space-x-1 text-orange-500">
                    <Flame className="w-4 h-4" />
                    <span>{sessionCount}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Completed sessions</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => handleQuickStart('short-break', 5)}
                disabled={isRunning}
              >
                <Coffee className="w-4 h-4 mr-2" />
                Short Break (5min)
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => handleQuickStart('long-break', 15)}
                disabled={isRunning}
              >
                <Coffee className="w-4 h-4 mr-2" />
                Long Break (15min)
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}