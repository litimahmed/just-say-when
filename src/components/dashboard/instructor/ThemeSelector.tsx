import { useState } from 'react';
import { Check, Eye, Palette, Play, FileText, Brain, Target, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useLessonContentStore, themes, LessonTheme } from '@/stores/lessonContentStore';

interface ThemeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTheme: (theme: LessonTheme) => void;
  currentTheme?: LessonTheme | null;
}

export function ThemeSelector({ isOpen, onClose, onSelectTheme, currentTheme }: ThemeSelectorProps) {
  const [selectedTheme, setSelectedTheme] = useState<LessonTheme | null>(currentTheme || null);

  const handleThemeSelect = (theme: LessonTheme) => {
    setSelectedTheme(theme);
    // Immediately apply the theme and close the modal
    onSelectTheme(theme);
    onClose();
  };

  const handleConfirm = () => {
    if (selectedTheme) {
      onSelectTheme(selectedTheme);
      onClose();
    }
  };

  const getThemeFeatures = (theme: LessonTheme) => {
    const features = [];
    if (theme.sections.video) features.push('Video');
    if (theme.sections.content) features.push('Content');
    if (theme.sections.quiz) features.push('Quiz');
    if (theme.sections.assignments) features.push('Assignments');
    if (theme.sections.resources) features.push('Resources');
    return features;
  };

  const getThemeMockup = (layout: string) => {
    const mockupComponents = {
      'video-first': (
        <div className="relative w-full h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-lg overflow-hidden">
          <div className="absolute inset-2">
            {/* Video Player Mockup */}
            <div className="bg-slate-900 dark:bg-slate-800 rounded-md h-16 mb-2 flex items-center justify-center">
              <Play className="w-6 h-6 text-white/60" />
            </div>
            {/* Content Lines */}
            <div className="space-y-1.5">
              <div className="h-2 bg-slate-300 dark:bg-slate-600 rounded w-full"></div>
              <div className="h-2 bg-slate-300 dark:bg-slate-600 rounded w-3/4"></div>
              <div className="h-2 bg-slate-300 dark:bg-slate-600 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ),
      'text-resources': (
        <div className="relative w-full h-full bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-lg overflow-hidden">
          <div className="absolute inset-2">
            {/* Article Header */}
            <div className="flex items-center space-x-1 mb-2">
              <FileText className="w-3 h-3 text-emerald-600" />
              <div className="h-1.5 bg-emerald-300 dark:bg-emerald-600 rounded w-16"></div>
            </div>
            {/* Content Lines */}
            <div className="space-y-1">
              <div className="h-1.5 bg-slate-300 dark:bg-slate-600 rounded w-full"></div>
              <div className="h-1.5 bg-slate-300 dark:bg-slate-600 rounded w-5/6"></div>
              <div className="h-1.5 bg-slate-300 dark:bg-slate-600 rounded w-4/5"></div>
              <div className="h-1.5 bg-slate-300 dark:bg-slate-600 rounded w-3/4"></div>
            </div>
            {/* Resource Links */}
            <div className="mt-2 space-y-1">
              <div className="h-1 bg-blue-300 dark:bg-blue-600 rounded w-12"></div>
              <div className="h-1 bg-blue-300 dark:bg-blue-600 rounded w-16"></div>
            </div>
          </div>
        </div>
      ),
      'quiz-centered': (
        <div className="relative w-full h-full bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg overflow-hidden">
          <div className="absolute inset-2">
            {/* Quiz Header */}
            <div className="flex items-center space-x-1 mb-2">
              <Brain className="w-3 h-3 text-purple-600" />
              <div className="h-1.5 bg-purple-300 dark:bg-purple-600 rounded w-12"></div>
            </div>
            {/* Question */}
            <div className="h-2 bg-slate-300 dark:bg-slate-600 rounded w-4/5 mb-2"></div>
            {/* Answer Options */}
            <div className="space-y-1">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                <div className="h-1 bg-slate-300 dark:bg-slate-600 rounded w-20"></div>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                <div className="h-1 bg-slate-300 dark:bg-slate-600 rounded w-16"></div>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 rounded-full bg-purple-400 dark:bg-purple-500"></div>
                <div className="h-1 bg-slate-300 dark:bg-slate-600 rounded w-18"></div>
              </div>
            </div>
          </div>
        </div>
      ),
      'mixed-content': (
        <div className="relative w-full h-full bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg overflow-hidden">
          <div className="absolute inset-2">
            {/* Mixed Layout */}
            <div className="grid grid-cols-2 gap-1 h-full">
              <div className="space-y-1">
                <div className="bg-slate-900 dark:bg-slate-800 rounded h-6 flex items-center justify-center">
                  <Play className="w-2 h-2 text-white/60" />
                </div>
                <div className="h-1 bg-slate-300 dark:bg-slate-600 rounded w-full"></div>
                <div className="h-1 bg-slate-300 dark:bg-slate-600 rounded w-3/4"></div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <Target className="w-2 h-2 text-orange-600" />
                  <div className="h-1 bg-orange-300 dark:bg-orange-600 rounded w-8"></div>
                </div>
                <div className="h-1 bg-slate-300 dark:bg-slate-600 rounded w-full"></div>
                <div className="h-1 bg-slate-300 dark:bg-slate-600 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      ),
      'interactive': (
        <div className="relative w-full h-full bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 rounded-lg overflow-hidden">
          <div className="absolute inset-2">
            {/* Interactive Elements */}
            <div className="flex items-center space-x-1 mb-2">
              <Zap className="w-3 h-3 text-cyan-600" />
              <div className="h-1.5 bg-cyan-300 dark:bg-cyan-600 rounded w-14"></div>
            </div>
            {/* Interactive Blocks */}
            <div className="grid grid-cols-3 gap-1 mb-2">
              <div className="bg-cyan-200 dark:bg-cyan-700 rounded h-4"></div>
              <div className="bg-cyan-300 dark:bg-cyan-600 rounded h-4"></div>
              <div className="bg-cyan-200 dark:bg-cyan-700 rounded h-4"></div>
            </div>
            {/* Content Lines */}
            <div className="space-y-1">
              <div className="h-1 bg-slate-300 dark:bg-slate-600 rounded w-full"></div>
              <div className="h-1 bg-slate-300 dark:bg-slate-600 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      )
    };
    return mockupComponents[layout as keyof typeof mockupComponents] || mockupComponents['mixed-content'];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden bg-gradient-to-br from-background/95 to-background border-border/50 backdrop-blur-xl shadow-2xl" aria-describedby={undefined}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-secondary/2 pointer-events-none"></div>
        
        <DialogHeader className="relative border-b border-border/30 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center shadow-lg shadow-primary/10">
                <Palette className="w-6 h-6 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Theme Gallery
                </DialogTitle>
                <DialogDescription className="text-base text-muted-foreground mt-1">
                  Choose a professional theme that enhances your lesson's learning experience
                </DialogDescription>
              </div>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
              {themes.length} Available
            </Badge>
          </div>
        </DialogHeader>

        {/* Custom Scrollable Area */}
        <div className="relative flex-1 overflow-hidden">
          <div className="h-[600px] overflow-y-auto pr-2 modern-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1">
              {themes.map((theme) => (
                <Card
                  key={theme.id}
                  className={`group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 ${
                    selectedTheme?.id === theme.id
                      ? 'border-primary/50 shadow-xl shadow-primary/20 ring-2 ring-primary/30 bg-gradient-to-br from-primary/5 to-transparent'
                      : 'border-border/50 hover:border-primary/30 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm'
                  }`}
                  onClick={() => handleThemeSelect(theme)}
                >
                  {/* Selection indicator */}
                  {selectedTheme?.id === theme.id && (
                    <div className="absolute top-3 right-3 z-10 w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/2 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <CardHeader className="relative p-5 pb-3">
                    {/* Professional Mockup */}
                    <div className="relative mb-4">
                      <div className="aspect-[16/10] bg-gradient-to-br from-muted/20 to-muted/40 rounded-xl border border-border/30 overflow-hidden shadow-inner">
                        {getThemeMockup(theme.layout)}
                      </div>
                      
                      {/* Mockup overlay effect */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                    </div>

                    <div className="space-y-2">
                      <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary/90 transition-colors">
                        {theme.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {theme.description}
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent className="relative px-5 pb-5">
                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {getThemeFeatures(theme).slice(0, 3).map((feature) => (
                        <Badge 
                          key={feature} 
                          variant="secondary" 
                          className="text-xs px-2 py-1 bg-muted/60 text-muted-foreground border-border/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-200"
                        >
                          {feature}
                        </Badge>
                      ))}
                      {getThemeFeatures(theme).length > 3 && (
                        <Badge variant="outline" className="text-xs px-2 py-1 text-muted-foreground border-border/50">
                          +{getThemeFeatures(theme).length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Meta info */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {theme.defaultContent.length} content items
                      </span>
                      <span className={`font-medium ${selectedTheme?.id === theme.id ? 'text-primary' : 'text-muted-foreground'}`}>
                        {theme.layout.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Scroll gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
        </div>

        {/* Footer */}
        <div className="relative flex items-center justify-between pt-6 border-t border-border/30">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse"></div>
            <span className="text-sm text-muted-foreground">
              Click any theme to apply instantly
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="text-xs bg-muted/30">
              Auto-save enabled
            </Badge>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="h-10 px-6 rounded-xl border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}