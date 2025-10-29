import { useState, useEffect, useRef, useCallback } from 'react';

interface AmbientSound {
  id: string;
  name: string;
  icon: string;
  audioUrl: string;
  description: string;
  category: string;
}

interface LoadedSound extends AmbientSound {
  audio: HTMLAudioElement;
  isLoaded: boolean;
}

interface SoundCategory {
  id: string;
  name: string;
  icon: string;
}

const SOUND_CATEGORIES: SoundCategory[] = [
  { id: "nature", name: "Nature", icon: "🌿" },
  { id: "water", name: "Water", icon: "💧" },
  { id: "weather", name: "Weather", icon: "🌤️" },
];

const AMBIENT_SOUNDS: AmbientSound[] = [
  // Nature Sounds
  {
    id: "bird-sound-4",
    name: "Tropical Aviary",
    icon: "🐦",
    audioUrl: "/sounds/ambients/bird_sound4.mp3",
    description: "Exotic tropical bird calls",
    category: "nature",
  },
  {
    id: "bird-sound-exclusive",
    name: "Meadow Songbirds",
    icon: "🦜",
    audioUrl: "/sounds/ambients/bird_sound_exclusive.mp3",
    description: "Unique meadow bird recordings",
    category: "nature",
  },
  {
    id: "bird-sound-1",
    name: "Garden Birds",
    icon: "🐤",
    audioUrl: "/sounds/ambients/bird_sound.mp3",
    description: "Peaceful garden bird songs",
    category: "nature",
  },
  {
    id: "bird-sound-2",
    name: "Forest Symphony",
    icon: "🌲",
    audioUrl: "/sounds/ambients/bird_sound2.mp3",
    description: "Deep forest bird ambience",
    category: "nature",
  },
  {
    id: "bird-sound-3",
    name: "Dawn Chorus",
    icon: "🌅",
    audioUrl: "/sounds/ambients/bird_sound3.mp3",
    description: "Early morning bird chorus",
    category: "nature",
  },
  {
    id: "cricket-sounds",
    name: "Evening Crickets",
    icon: "🦗",
    audioUrl: "/sounds/ambients/crisket_sounds.mp3",
    description: "Peaceful cricket symphony",
    category: "nature",
  },
  
  // Water Sounds
  {
    id: "lake-water",
    name: "Calm Lake",
    icon: "💧",
    audioUrl: "/sounds/ambients/lake_water_sound.mp3",
    description: "Gentle lapping lake waters",
    category: "water",
  },
  {
    id: "lake-with-bird-ultra",
    name: "Mountain Lake",
    icon: "🪿",
    audioUrl: "/sounds/ambients/lake_with_bird_ultra_good.mp3",
    description: "Crystal clear mountain lake",
    category: "water",
  },
  {
    id: "lake-with-bird",
    name: "Lakeside Retreat",
    icon: "🦆",
    audioUrl: "/sounds/ambients/lake_with_bird.mp3",
    description: "Serene lake with distant birds",
    category: "water",
  },
  {
    id: "waterfall-droplet",
    name: "Cascade Drops",
    icon: "💦",
    audioUrl: "/sounds/ambients/waterfall_droplet.mp3",
    description: "Rhythmic water droplets",
    category: "water",
  },
  {
    id: "waterfall-sound",
    name: "Mountain Falls",
    icon: "🌊",
    audioUrl: "/sounds/ambients/waterfall_sound.mp3",
    description: "Majestic waterfall ambience",
    category: "water",
  },
  {
    id: "waterfall-with-birds",
    name: "Forest Cascade",
    icon: "🦜",
    audioUrl: "/sounds/ambients/waterfall_with_birds.mp3",
    description: "Waterfall with bird songs",
    category: "water",
  },
  {
    id: "waterfall",
    name: "Alpine Waterfall",
    icon: "🏞️",
    audioUrl: "/sounds/ambients/waterfall.mp3",
    description: "Powerful alpine waterfall",
    category: "water",
  },
  {
    id: "waterfall-2",
    name: "Tropical Falls",
    icon: "🏞️",
    audioUrl: "/sounds/ambients/waterfall2.mp3",
    description: "Lush tropical waterfall",
    category: "water",
  },
  
  // Weather Sounds
  {
    id: "rain",
    name: "Gentle Rain",
    icon: "🌧️",
    audioUrl: "/sounds/ambients/rain.mp3",
    description: "Soft rainfall for concentration",
    category: "weather",
  },
];


export const useAmbientSounds = () => {
  const [loadedSounds, setLoadedSounds] = useState<Map<string, LoadedSound>>(new Map());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSound, setCurrentSound] = useState<AmbientSound | null>(null);
  const [isLoading, setIsLoading] = useState<Set<string>>(new Set());
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem('ambientSoundVolume');
    return savedVolume ? parseFloat(savedVolume) : 0.5;
  });
  
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);
  const preloadedRef = useRef<Map<string, LoadedSound>>(new Map());

  // Preload all sounds
  useEffect(() => {
    const preloadSounds = async () => {
      const loadPromises = AMBIENT_SOUNDS.map(async (sound) => {
        try {
          const audio = new Audio();
          audio.preload = 'auto';
          audio.loop = true;
          audio.volume = volume;
          
          // Wait for the audio to be loaded
          await new Promise<void>((resolve, reject) => {
            const onCanPlayThrough = () => {
              audio.removeEventListener('canplaythrough', onCanPlayThrough);
              audio.removeEventListener('error', onError);
              resolve();
            };
            
            const onError = (e: any) => {
              audio.removeEventListener('canplaythrough', onCanPlayThrough);
              audio.removeEventListener('error', onError);
              console.warn(`Failed to preload sound: ${sound.name}`, e);
              resolve(); // Don't reject, just continue
            };
            
            audio.addEventListener('canplaythrough', onCanPlayThrough);
            audio.addEventListener('error', onError);
            audio.src = sound.audioUrl;
            audio.load();
          });

          const loadedSound: LoadedSound = {
            ...sound,
            audio,
            isLoaded: true
          };
          
          preloadedRef.current.set(sound.id, loadedSound);
          return loadedSound;
        } catch (error) {
          console.warn(`Failed to preload sound: ${sound.name}`, error);
          return null;
        }
      });

      const results = await Promise.allSettled(loadPromises);
      const loadedMap = new Map<string, LoadedSound>();
      
      results.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value) {
          loadedMap.set(AMBIENT_SOUNDS[index].id, result.value);
        }
      });
      
      setLoadedSounds(loadedMap);
    };

    preloadSounds();

    // Cleanup function
    return () => {
      stopSound();
      preloadedRef.current.forEach(sound => {
        sound.audio.pause();
        sound.audio.src = '';
      });
      preloadedRef.current.clear();
    };
  }, []);

  // Update volume for all loaded sounds
  useEffect(() => {
    preloadedRef.current.forEach(sound => {
      sound.audio.volume = volume;
    });
  }, [volume]);

  const stopSound = useCallback(() => {
    try {
      if (activeAudioRef.current) {
        activeAudioRef.current.pause();
        activeAudioRef.current.currentTime = 0;
        activeAudioRef.current = null;
      }
      setIsPlaying(false);
      setCurrentSound(null);
    } catch (error) {
      console.error('Error stopping ambient sound:', error);
    }
  }, []);

  const playSound = useCallback(async (sound: AmbientSound) => {
    try {
      setIsLoading(prev => new Set([...prev, sound.id]));
      
      // Always stop current sound first
      stopSound();

      const loadedSound = preloadedRef.current.get(sound.id);
      if (!loadedSound) {
        console.warn(`Sound not loaded: ${sound.name}`);
        return;
      }

      const audio = loadedSound.audio;
      
      // Reset and prepare audio
      audio.currentTime = 0;
      audio.volume = volume;
      
      // Play the audio
      await audio.play();
      
      // Set as active
      activeAudioRef.current = audio;
      setCurrentSound(sound);
      setIsPlaying(true);

    } catch (error) {
      console.error('Error playing ambient sound:', error);
      setIsPlaying(false);
      setCurrentSound(null);
    } finally {
      setIsLoading(prev => {
        const newSet = new Set(prev);
        newSet.delete(sound.id);
        return newSet;
      });
    }
  }, [volume, stopSound]);

  const toggleSound = useCallback((sound: AmbientSound) => {
    if (isPlaying && currentSound?.id === sound.id) {
      stopSound();
    } else {
      playSound(sound);
    }
  }, [isPlaying, currentSound, playSound, stopSound]);

  const changeVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
    localStorage.setItem('ambientSoundVolume', newVolume.toString());
    
    // Update volume for all preloaded sounds
    preloadedRef.current.forEach(sound => {
      sound.audio.volume = newVolume;
    });
  }, []);

  const isSoundLoaded = useCallback((soundId: string) => {
    return preloadedRef.current.has(soundId);
  }, []);

  const isSoundLoading = useCallback((soundId: string) => {
    return isLoading.has(soundId);
  }, [isLoading]);

  return {
    sounds: AMBIENT_SOUNDS,
    categories: SOUND_CATEGORIES,
    isPlaying,
    currentSound,
    volume,
    playSound,
    stopSound,
    toggleSound,
    changeVolume,
    isSoundLoaded,
    isSoundLoading,
    allSoundsLoaded: loadedSounds.size === AMBIENT_SOUNDS.length,
  };
};