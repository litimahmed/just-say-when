import * as React from "react";

interface AnimatedTextProps {
  staticText: string;
  words: string[];
  interval?: number;
}

export default function AnimatedText({ staticText, words, interval = 3000 }: AnimatedTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [isSliding, setIsSliding] = React.useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIsSliding(true);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setTimeout(() => setIsSliding(false), 50);
      }, 400);
    }, interval);

    return () => clearInterval(timer);
  }, [words, interval]);
  
  return (
    <span className="text-white font-medium leading-relaxed">
      {staticText}{' '}
      <span className="relative inline-block">
        <span 
          className={`inline-block font-bold text-primary-soft transition-all duration-500 ease-out ${
            isSliding 
              ? 'opacity-0 translate-y-1 scale-95' 
              : 'opacity-100 translate-y-0 scale-100'
          }`}
          style={{ 
            minWidth: `${Math.max(...words.map(word => word.length * 0.6))}em`,
            textAlign: 'left',
            textShadow: '0 2px 8px rgba(0,0,0,0.4)',
            display: 'inline-block',
            verticalAlign: 'baseline'
          }}
        >
          {words[currentWordIndex]}
        </span>
      </span>
    </span>
  );
}