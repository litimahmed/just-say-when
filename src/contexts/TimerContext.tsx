import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface TimerContextType {
  // Active timer state
  isTimerActive: boolean;
  timeLeft: number;
  currentTechnique: string;
  
  // Controls
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  
  // Floating timer visibility
  showFloating: boolean;
  hideFloating: () => void;
  
  // Set timer data from study page
  setTimerData: (data: {
    timeLeft: number;
    isActive: boolean;
    technique: string;
    onStart: () => void;
    onPause: () => void;
    onStop: () => void;
  }) => void;
}

const TimerContext = createContext<TimerContextType | null>(null);

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimerContext must be used within a TimerProvider');
  }
  return context;
};

interface TimerProviderProps {
  children: ReactNode;
}

export const TimerProvider = ({ children }: TimerProviderProps) => {
  const location = useLocation();
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentTechnique, setCurrentTechnique] = useState('');
  const [showFloating, setShowFloating] = useState(false);
  
  // Controls from study page
  const [controls, setControls] = useState<{
    onStart: () => void;
    onPause: () => void;
    onStop: () => void;
  }>({
    onStart: () => {},
    onPause: () => {},
    onStop: () => {},
  });

  const setTimerData = useCallback((data: {
    timeLeft: number;
    isActive: boolean;
    technique: string;
    onStart: () => void;
    onPause: () => void;
    onStop: () => void;
  }) => {
    setTimeLeft(data.timeLeft);
    setIsTimerActive(data.isActive);
    setCurrentTechnique(data.technique);
    setControls({
      onStart: data.onStart,
      onPause: data.onPause,
      onStop: data.onStop,
    });
    
    // Show floating timer if active and not on study time page
    const isOnStudyPage = location.pathname.includes('study-time');
    setShowFloating(data.isActive && !isOnStudyPage);
  }, [location.pathname]);

  const hideFloating = useCallback(() => {
    setShowFloating(false);
  }, []);

  // Update floating timer visibility based on route
  const shouldShowFloating = isTimerActive && !location.pathname.includes('study-time') && showFloating;

  return (
    <TimerContext.Provider value={{
      isTimerActive,
      timeLeft,
      currentTechnique,
      onStart: controls.onStart,
      onPause: controls.onPause,
      onStop: controls.onStop,
      showFloating: shouldShowFloating,
      hideFloating,
      setTimerData,
    }}>
      {children}
    </TimerContext.Provider>
  );
};