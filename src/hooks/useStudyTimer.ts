import { useState, useEffect, useCallback, useRef } from 'react';

export interface StudySession {
  id: string;
  subject: string;
  duration: number; // in minutes
  startTime: Date;
  endTime?: Date;
  type: 'focus' | 'short-break' | 'long-break' | 'custom';
  completed: boolean;
  quality?: number; // 1-5 rating
  technique: 'pomodoro' | 'timeboxing' | 'flowtime' | 'custom' | string;
  notes?: string;
}

interface TimerState {
  timeLeft: number; // in seconds
  isRunning: boolean;
  isPaused: boolean;
  currentSession: StudySession | null;
  sessionCount: number;
  totalStudyTime: number; // in minutes
}

interface StudyTimerOptions {
  focusDuration: number; // minutes
  shortBreakDuration: number; // minutes
  longBreakDuration: number; // minutes
  longBreakInterval: number; // after how many focus sessions
  autoStartBreaks: boolean;
  autoStartFocus: boolean;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
}

const DEFAULT_OPTIONS: StudyTimerOptions = {
  focusDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
  autoStartBreaks: false,
  autoStartFocus: false,
  soundEnabled: true,
  notificationsEnabled: true,
};

export const useStudyTimer = (options: Partial<StudyTimerOptions> = {}) => {
  const finalOptions = { ...DEFAULT_OPTIONS, ...options };
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const [timerState, setTimerState] = useState<TimerState>({
    timeLeft: finalOptions.focusDuration * 60,
    isRunning: false,
    isPaused: false,
    currentSession: null,
    sessionCount: 0,
    totalStudyTime: 0,
  });

  const [sessions, setSessions] = useState<StudySession[]>([]);

  // Initialize audio context for sound generation
  useEffect(() => {
    if (finalOptions.soundEnabled && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }, [finalOptions.soundEnabled]);

  // Load saved data from localStorage
  useEffect(() => {
    const savedSessions = localStorage.getItem('study-sessions');
    const savedStats = localStorage.getItem('study-stats');
    
    if (savedSessions) {
      try {
        const parsedSessions = JSON.parse(savedSessions).map((session: any) => ({
          ...session,
          startTime: new Date(session.startTime),
          endTime: session.endTime ? new Date(session.endTime) : undefined,
        }));
        setSessions(parsedSessions);
      } catch (error) {
        console.error('Error loading saved sessions:', error);
      }
    }

    if (savedStats) {
      try {
        const stats = JSON.parse(savedStats);
        setTimerState(prev => ({
          ...prev,
          sessionCount: stats.sessionCount || 0,
          totalStudyTime: stats.totalStudyTime || 0,
        }));
      } catch (error) {
        console.error('Error loading saved stats:', error);
      }
    }
  }, []);

  // Save sessions to localStorage
  const saveSessions = useCallback((newSessions: StudySession[]) => {
    localStorage.setItem('study-sessions', JSON.stringify(newSessions));
  }, []);

  // Save stats to localStorage
  const saveStats = useCallback((sessionCount: number, totalStudyTime: number) => {
    localStorage.setItem('study-stats', JSON.stringify({ sessionCount, totalStudyTime }));
  }, []);

  // Generate notification sound
  const playNotificationSound = useCallback(async (frequency: number = 800, duration: number = 200) => {
    if (!finalOptions.soundEnabled || !audioContextRef.current) return;

    try {
      const context = audioContextRef.current;
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      oscillator.frequency.setValueAtTime(frequency, context.currentTime);
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration / 1000);

      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + duration / 1000);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }, [finalOptions.soundEnabled]);

  // Show browser notification
  const showNotification = useCallback((title: string, body: string) => {
    if (!finalOptions.notificationsEnabled) return;

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
        tag: 'study-timer',
      });
    }
  }, [finalOptions.notificationsEnabled]);

  // Timer tick effect
  useEffect(() => {
    if (timerState.isRunning && !timerState.isPaused) {
      intervalRef.current = setInterval(() => {
        setTimerState(prev => {
          if (prev.timeLeft <= 1) {
            // Timer finished
            return {
              ...prev,
              timeLeft: 0,
              isRunning: false,
            };
          }
          return {
            ...prev,
            timeLeft: prev.timeLeft - 1,
          };
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState.isRunning, timerState.isPaused]);

  // Handle timer completion
  useEffect(() => {
    if (timerState.timeLeft === 0 && timerState.currentSession) {
      handleSessionComplete();
    }
  }, [timerState.timeLeft]);

  const handleSessionComplete = useCallback(() => {
    const session = timerState.currentSession;
    if (!session) return;

    const completedSession: StudySession = {
      ...session,
      endTime: new Date(),
      completed: true,
    };

    const newSessions = [...sessions, completedSession];
    setSessions(newSessions);
    saveSessions(newSessions);

    // Update stats
    const newSessionCount = timerState.sessionCount + 1;
    const newTotalTime = timerState.totalStudyTime + (session.type === 'focus' ? session.duration : 0);
    
    setTimerState(prev => ({
      ...prev,
      sessionCount: newSessionCount,
      totalStudyTime: newTotalTime,
      currentSession: null,
    }));
    
    saveStats(newSessionCount, newTotalTime);

    // Play completion sound and show notification
    if (session.type === 'focus') {
      playNotificationSound(600, 300);
      showNotification('Focus Session Complete!', `Great job! You completed ${session.duration} minutes of focused study.`);
    } else {
      playNotificationSound(400, 200);
      showNotification('Break Time Over!', 'Time to get back to studying!');
    }
  }, [timerState.currentSession, timerState.sessionCount, timerState.totalStudyTime, sessions, saveSessions, saveStats, playNotificationSound, showNotification]);

  const startSession = useCallback((sessionData: Partial<StudySession>) => {
    const session: StudySession = {
      id: Date.now().toString(),
      subject: sessionData.subject || 'General Study',
      duration: sessionData.duration || finalOptions.focusDuration,
      startTime: new Date(),
      type: sessionData.type || 'focus',
      completed: false,
      technique: sessionData.technique || 'pomodoro',
      notes: sessionData.notes,
    };

    setTimerState(prev => ({
      ...prev,
      currentSession: session,
      timeLeft: session.duration * 60,
      isRunning: true,
      isPaused: false,
    }));

    playNotificationSound(800, 100);
  }, [finalOptions.focusDuration, playNotificationSound]);

  const pauseTimer = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
  }, []);

  const stopTimer = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      isRunning: false,
      isPaused: false,
      currentSession: null,
      timeLeft: finalOptions.focusDuration * 60,
    }));
  }, [finalOptions.focusDuration]);

  const skipSession = useCallback(() => {
    if (timerState.currentSession) {
      handleSessionComplete();
    }
  }, [timerState.currentSession, handleSessionComplete]);

  const startBreak = useCallback((type: 'short-break' | 'long-break' = 'short-break') => {
    const duration = type === 'short-break' ? finalOptions.shortBreakDuration : finalOptions.longBreakDuration;
    startSession({
      subject: 'Break Time',
      duration,
      type,
      technique: 'pomodoro',
    });
  }, [finalOptions.shortBreakDuration, finalOptions.longBreakDuration, startSession]);

  const requestNotificationPermission = useCallback(async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return Notification.permission === 'granted';
  }, []);

  const getSessionHistory = useCallback((days: number = 7) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return sessions.filter(session => 
      session.startTime >= cutoffDate && session.completed
    );
  }, [sessions]);

  const getTodaysStats = useCallback(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todaysSessions = sessions.filter(session => {
      const sessionDate = new Date(session.startTime);
      sessionDate.setHours(0, 0, 0, 0);
      return sessionDate.getTime() === today.getTime() && session.completed && session.type === 'focus';
    });

    const totalMinutes = todaysSessions.reduce((total, session) => total + session.duration, 0);
    const sessionCount = todaysSessions.length;
    const averageQuality = todaysSessions.length > 0 
      ? todaysSessions.reduce((sum, session) => sum + (session.quality || 0), 0) / todaysSessions.length 
      : 0;

    return {
      totalMinutes,
      sessionCount,
      averageQuality,
      sessions: todaysSessions,
    };
  }, [sessions]);

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  return {
    // State
    ...timerState,
    sessions,
    
    // Actions
    startSession,
    pauseTimer,
    stopTimer,
    skipSession,
    startBreak,
    requestNotificationPermission,
    
    // Utilities
    formatTime,
    getSessionHistory,
    getTodaysStats,
    
    // Settings
    options: finalOptions,
  };
};