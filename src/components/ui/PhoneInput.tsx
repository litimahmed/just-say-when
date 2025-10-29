import React, { forwardRef } from 'react';
import { Input } from './input';
import { cn } from '@/lib/utils';

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, onChange, value, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value;
      
      // Remove any non-digit characters except +
      inputValue = inputValue.replace(/[^\d+]/g, '');
      
      // Ensure it starts with +213
      if (!inputValue.startsWith('+213')) {
        if (inputValue.startsWith('213')) {
          inputValue = '+' + inputValue;
        } else if (inputValue.startsWith('0')) {
          inputValue = '+213' + inputValue.slice(1);
        } else if (inputValue.length > 0 && !inputValue.startsWith('+')) {
          inputValue = '+213' + inputValue;
        } else if (inputValue === '+') {
          inputValue = '+213';
        } else if (inputValue === '') {
          inputValue = '';
        } else {
          inputValue = '+213' + inputValue.replace(/^\+/, '');
        }
      }
      
      // Limit total length to +213 + 9 digits = 13 characters
      if (inputValue.length > 13) {
        inputValue = inputValue.slice(0, 13);
      }
      
      // Update the input value
      e.target.value = inputValue;
      
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 pointer-events-none z-10">
          <div className="flex items-center space-x-1">
            <svg 
              width="20" 
              height="15" 
              viewBox="0 0 20 15" 
              className="border border-border/20 rounded-sm overflow-hidden"
            >
              {/* Algerian Flag */}
              <rect width="10" height="15" fill="#006233" />
              <rect x="10" width="10" height="15" fill="#FFFFFF" />
              <g transform="translate(10, 7.5)">
                {/* Crescent and Star */}
                <circle cx="0" cy="0" r="2.5" fill="#D21034" />
                <circle cx="0.5" cy="0" r="2" fill="#FFFFFF" />
                <polygon 
                  points="1.5,-0.5 1.8,0.3 2.5,0 1.9,0.8 2.2,1.5 1.5,1 0.8,1.5 1.1,0.8 0.5,0 1.2,0.3" 
                  fill="#D21034" 
                />
              </g>
            </svg>
            <span className="text-sm font-medium text-foreground">+213</span>
          </div>
        </div>
        <Input
          {...props}
          ref={ref}
          type="tel"
          value={value}
          onChange={handleChange}
          placeholder="5xxxxxxxx"
          className={cn("pl-20", className)}
          onFocus={(e) => {
            if (!e.target.value || e.target.value === '') {
              e.target.value = '+213';
            }
            if (props.onFocus) {
              props.onFocus(e);
            }
          }}
        />
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };