import { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { X, Minimize2, Maximize2, ZoomIn, ZoomOut, RotateCcw, Fullscreen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { useLessonContentStore } from '@/stores/lessonContentStore';
import { ContentPreviewRenderer } from './ContentPreviewRenderer';

export function FloatingPreview() {
  const {
    isPreviewOpen,
    previewData,
    previewScale,
    previewPosition,
    previewSize,
    selectedTheme,
    togglePreview,
    setPreviewScale,
    setPreviewPosition,
    setPreviewSize,
  } = useLessonContentStore();

  const [isMinimized, setIsMinimized] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Auto-close preview when edit dialogs open
    const handleStorageChange = () => {
      const editDialogOpen = sessionStorage.getItem('editDialogOpen') === 'true';
      if (editDialogOpen && isPreviewOpen) {
        togglePreview();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isPreviewOpen, togglePreview]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  if (!isPreviewOpen) return null;

  const handleScaleChange = (values: number[]) => {
    setPreviewScale(values[0] / 100);
  };

  const resetPosition = () => {
    setPreviewPosition({ x: window.innerWidth - 420, y: 100 });
    setPreviewSize({ width: 400, height: 600 });
    setPreviewScale(1);
    setIsMinimized(false);
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const scalePercentage = Math.round(previewScale * 100);

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-background via-background/95 to-muted/10 backdrop-blur-xl">
        <div className="h-full flex flex-col">
          {/* Fullscreen Header */}
          <div className="relative flex items-center justify-between p-6 border-b border-border/10 bg-gradient-to-r from-card/90 via-card/95 to-card/90 backdrop-blur-md shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-accent/3" />
            <div className="relative flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse shadow-lg" />
                <div className="h-8 w-[1px] bg-gradient-to-b from-border/0 via-border/50 to-border/0" />
                <div className="flex flex-col">
                  <h3 className="font-semibold text-lg bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    {previewData.title || 'Untitled Lesson'}
                  </h3>
                  <span className="text-xs text-muted-foreground font-medium tracking-wide">LIVE PREVIEW</span>
                </div>
              </div>
              {selectedTheme && (
                <Badge variant="secondary" className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 text-primary font-medium px-3 py-1.5 shadow-sm">
                  {selectedTheme.name} Theme
                </Badge>
              )}
            </div>
            <div className="relative flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-muted/30 border border-border/20">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-muted-foreground">PREVIEW MODE</span>
              </div>
              <div className="h-6 w-[1px] bg-border/30" />
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleFullscreen}
                className="h-9 w-9 rounded-lg bg-muted/20 hover:bg-muted/40 border border-border/20 transition-all duration-200"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={togglePreview}
                className="h-9 w-9 rounded-lg bg-muted/20 hover:bg-destructive/10 hover:text-destructive border border-border/20 transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Fullscreen Content */}
          <div className="flex-1 overflow-auto bg-gradient-to-br from-muted/5 via-transparent to-muted/10">
            <style dangerouslySetInnerHTML={{
              __html: `
                .floating-preview pre {
                  background: #1a1b26 !important;
                  border: 1px solid #313244 !important;
                  border-radius: 0.75rem !important;
                  padding: 1.5rem !important;
                  overflow-x: auto !important;
                  margin: 1.5rem 0 !important;
                  font-family: "JetBrains Mono", "Fira Code", Consolas, "Courier New", monospace !important;
                  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2) !important;
                }
                .floating-preview pre code {
                  color: #eef0f9 !important;
                  background: transparent !important;
                  padding: 0 !important;
                  line-height: 1.6 !important;
                }
                .floating-preview .hljs {
                  background: #1a1b26 !important;
                  color: #eef0f9 !important;
                  padding: 0 !important;
                }
                .floating-preview .hljs-keyword {
                  color: #54b9ff !important;
                  font-weight: 600 !important;
                }
                .floating-preview .hljs-string {
                  color: #4bf3c8 !important;
                }
                .floating-preview .hljs-number {
                  color: #ffd493 !important;
                }
                .floating-preview .hljs-built_in {
                  color: #00daef !important;
                }
                .floating-preview .hljs-function {
                  color: #00daef !important;
                  font-weight: 600 !important;
                }
                .floating-preview .hljs-comment {
                  color: #545864 !important;
                  font-style: italic !important;
                }
                .floating-preview .hljs-variable {
                  color: #eef0f9 !important;
                }
                .floating-preview .hljs-attr {
                  color: #4bf3c8 !important;
                }
                .floating-preview .hljs-property {
                  color: #4bf3c8 !important;
                }
                .floating-preview .hljs-name {
                  color: #acafff !important;
                }
                .floating-preview .hljs-title {
                  color: #acafff !important;
                  font-weight: 600 !important;
                }
                .floating-preview .hljs-literal {
                  color: #ffd493 !important;
                }
                .floating-preview .hljs-params {
                  color: #eef0f9 !important;
                }
                .floating-preview .hljs-operator {
                  color: #eef0f9 !important;
                }
                .floating-preview .hljs-punctuation {
                  color: #eef0f9 !important;
                }
                .floating-preview .hljs-tag {
                  color: #54b9ff !important;
                }
                .floating-preview .hljs-type {
                  color: #acafff !important;
                }
              `
            }} />
            <div className="max-w-5xl mx-auto p-8 floating-preview">
              <ContentPreviewRenderer
                title={previewData.title}
                description={previewData.description}
                content={previewData.content}
                theme={selectedTheme}
                scale={1}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isMinimized) {
    return (
      <Rnd
        size={{ width: 320, height: 70 }}
        position={previewPosition}
        onDragStop={(e, d) => {
          const maxX = window.innerWidth - 320;
          const maxY = window.innerHeight - 100;
          setPreviewPosition({ 
            x: Math.max(50, Math.min(maxX, d.x)), 
            y: Math.max(50, Math.min(maxY, d.y)) 
          });
        }}
        bounds="parent"
        dragHandleClassName="preview-drag-handle"
        className="z-[9998]"
        enableResizing={false}
      >
        <Card className="h-full flex flex-col border-0 bg-gradient-to-r from-card/95 via-card to-card/95 backdrop-blur-md shadow-2xl rounded-xl overflow-hidden">
          <div className="preview-drag-handle relative flex items-center justify-between p-4 cursor-move">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
            <div className="relative flex items-center space-x-3 min-w-0">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse shadow-lg" />
              <div className="h-6 w-[1px] bg-gradient-to-b from-border/0 via-border/50 to-border/0" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground truncate">Live Preview</span>
                <span className="text-xs text-muted-foreground font-medium">Click to expand</span>
              </div>
            </div>
            <div className="relative flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsMinimized(false)}
                className="h-8 w-8 rounded-lg bg-muted/20 hover:bg-primary/10 hover:text-primary transition-all duration-200"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={togglePreview}
                className="h-8 w-8 rounded-lg bg-muted/20 hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </Rnd>
    );
  }

  return (
    <div className="fixed inset-0 z-[9998] bg-gradient-to-br from-background via-background/95 to-muted/10 backdrop-blur-xl">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="relative flex items-center justify-between p-5 border-b border-border/10 bg-gradient-to-r from-card/90 via-card/95 to-card/90 backdrop-blur-md shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-accent/3" />
          <div className="relative flex items-center space-x-4 min-w-0">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse shadow-lg" />
              <div className="h-7 w-[1px] bg-gradient-to-b from-border/0 via-border/50 to-border/0" />
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-foreground truncate">
                  {previewData.title || 'Untitled Lesson'}
                </span>
                <span className="text-xs text-muted-foreground font-medium tracking-wide">LIVE PREVIEW</span>
              </div>
            </div>
            {selectedTheme && (
              <Badge variant="secondary" className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 text-primary font-medium px-3 py-1 shadow-sm">
                {selectedTheme.name}
              </Badge>
            )}
          </div>
          
          <div className="relative flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-muted/30 border border-border/20">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-muted-foreground">WINDOWED</span>
            </div>
            <div className="h-6 w-[1px] bg-border/30" />
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsMinimized(true)}
              className="h-9 w-9 rounded-lg bg-muted/20 hover:bg-muted/40 border border-border/20 transition-all duration-200"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleFullscreen}
              className="h-9 w-9 rounded-lg bg-muted/20 hover:bg-primary/10 hover:text-primary border border-border/20 transition-all duration-200"
            >
              <Fullscreen className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={togglePreview}
              className="h-9 w-9 rounded-lg bg-muted/20 hover:bg-destructive/10 hover:text-destructive border border-border/20 transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-gradient-to-br from-muted/5 via-transparent to-muted/10">
          <style dangerouslySetInnerHTML={{
            __html: `
              .floating-preview pre {
                background: #1a1b26 !important;
                border: 1px solid #313244 !important;
                border-radius: 0.75rem !important;
                padding: 1.5rem !important;
                overflow-x: auto !important;
                margin: 1.5rem 0 !important;
                font-family: "JetBrains Mono", "Fira Code", Consolas, "Courier New", monospace !important;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2) !important;
              }
              .floating-preview pre code {
                color: #eef0f9 !important;
                background: transparent !important;
                padding: 0 !important;
                line-height: 1.6 !important;
              }
              .floating-preview .hljs {
                background: #1a1b26 !important;
                color: #eef0f9 !important;
                padding: 0 !important;
              }
              .floating-preview .hljs-keyword {
                color: #54b9ff !important;
                font-weight: 600 !important;
              }
              .floating-preview .hljs-string {
                color: #4bf3c8 !important;
              }
              .floating-preview .hljs-number {
                color: #ffd493 !important;
              }
              .floating-preview .hljs-built_in {
                color: #00daef !important;
              }
              .floating-preview .hljs-function {
                color: #00daef !important;
                font-weight: 600 !important;
              }
              .floating-preview .hljs-comment {
                color: #545864 !important;
                font-style: italic !important;
              }
              .floating-preview .hljs-variable {
                color: #eef0f9 !important;
              }
              .floating-preview .hljs-attr {
                color: #4bf3c8 !important;
              }
              .floating-preview .hljs-property {
                color: #4bf3c8 !important;
              }
              .floating-preview .hljs-name {
                color: #acafff !important;
              }
              .floating-preview .hljs-title {
                color: #acafff !important;
                font-weight: 600 !important;
              }
              .floating-preview .hljs-literal {
                color: #ffd493 !important;
              }
              .floating-preview .hljs-params {
                color: #eef0f9 !important;
              }
              .floating-preview .hljs-operator {
                color: #eef0f9 !important;
              }
              .floating-preview .hljs-punctuation {
                color: #eef0f9 !important;
              }
              .floating-preview .hljs-tag {
                color: #54b9ff !important;
              }
              .floating-preview .hljs-type {
                color: #acafff !important;
              }
            `
          }} />
          <div className="max-w-5xl mx-auto p-8 floating-preview">
            <ContentPreviewRenderer
              title={previewData.title}
              description={previewData.description}
              content={previewData.content}
              theme={selectedTheme}
              scale={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}