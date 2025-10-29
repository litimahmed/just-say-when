import * as React from "react";
import { ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ar", name: "العربية", flag: "🇩🇿" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const [selectedLanguage, setSelectedLanguage] = React.useState(languages[0]);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "h-8 px-3 bg-primary-foreground/5 border border-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/20 transition-all duration-200 rounded-lg",
            className
          )}
        >
          <div className="flex items-center gap-2">
            <span className="text-base leading-none">{selectedLanguage.flag}</span>
            <span className="text-sm font-medium hidden sm:inline">
              {selectedLanguage.name}
            </span>
            <span className="text-sm font-medium sm:hidden">
              {selectedLanguage.code.toUpperCase()}
            </span>
            <ChevronDown 
              className={cn(
                "h-3 w-3 transition-transform duration-200",
                isOpen && "rotate-180"
              )} 
            />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-48 p-1 bg-background/95 backdrop-blur-sm border border-border/50 shadow-lg" 
        align="end"
      >
        <div className="space-y-1">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                setSelectedLanguage(language);
                setIsOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-all duration-150",
                selectedLanguage.code === language.code
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <span className="text-base leading-none">{language.flag}</span>
              <span className="flex-1 text-left">{language.name}</span>
              {selectedLanguage.code === language.code && (
                <div className="w-2 h-2 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}