import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
}

export const OtpInput = ({
  length = 6,
  value,
  onChange,
  onComplete,
  disabled = false,
  autoFocus = false,
  className
}: OtpInputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    if (value.length === length && onComplete) {
      onComplete(value);
    }
  }, [value, length, onComplete]);

  const handleChange = (index: number, newValue: string) => {
    // Only allow digits
    if (!/^\d?$/.test(newValue)) return;

    const newOtpValue = value.split('');
    newOtpValue[index] = newValue;
    const updatedValue = newOtpValue.join('');

    onChange(updatedValue);

    // Move to next input if digit was entered
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setActiveIndex(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      if (!value[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
        setActiveIndex(index - 1);
        
        // Clear the previous input
        const newOtpValue = value.split('');
        newOtpValue[index - 1] = '';
        onChange(newOtpValue.join(''));
      } else {
        // Clear current input
        const newOtpValue = value.split('');
        newOtpValue[index] = '';
        onChange(newOtpValue.join(''));
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setActiveIndex(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setActiveIndex(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain');
    const digits = pastedData.replace(/\D/g, '').slice(0, length);
    
    if (digits.length > 0) {
      onChange(digits.padEnd(length, '').slice(0, length));
      
      // Focus the appropriate input
      const nextIndex = Math.min(digits.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      setActiveIndex(nextIndex);
    }
  };

  const handleFocus = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className={cn("flex gap-2 justify-center", className)}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onFocus={() => handleFocus(index)}
          onPaste={handlePaste}
          disabled={disabled}
          className={cn(
            "w-12 h-12 text-center text-lg font-semibold rounded-lg border-2 transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary/20",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            activeIndex === index || value[index]
              ? "border-primary bg-primary/5 text-primary shadow-sm"
              : "border-muted-foreground/30 hover:border-muted-foreground/50 bg-background"
          )}
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  );
};