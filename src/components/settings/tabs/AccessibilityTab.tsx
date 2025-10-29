import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Eye, Volume2, MousePointer, Keyboard, Monitor, Zap } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export function AccessibilityTab() {
  const [theme, setTheme] = React.useState("light");
  const [fontSize, setFontSize] = React.useState("medium");
  const [highContrast, setHighContrast] = React.useState(false);
  const [colorBlindSupport, setColorBlindSupport] = React.useState("none");
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [screenReader, setScreenReader] = React.useState(false);
  const [keyboardNav, setKeyboardNav] = React.useState(true);
  const [focusIndicators, setFocusIndicators] = React.useState(true);
  const [autoPlay, setAutoPlay] = React.useState(true);
  const [audioDescriptions, setAudioDescriptions] = React.useState(false);
  const [closedCaptions, setClosedCaptions] = React.useState(true);
  const [volumeBoost, setVolumeBoost] = React.useState([100]);
  const [lineHeight, setLineHeight] = React.useState([1.5]);
  const [letterSpacing, setLetterSpacing] = React.useState([0]);
  const [cursorSize, setCursorSize] = React.useState("normal");

  return (
    <div className="space-y-6">
      {/* Visual Accessibility */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Visual Accessibility
          </CardTitle>
          <CardDescription>Customize visual elements for better visibility</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Theme Preference</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="high-contrast">High Contrast</SelectItem>
                <SelectItem value="auto">Auto (System)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Font Size</Label>
            <Select value={fontSize} onValueChange={setFontSize}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small (14px)</SelectItem>
                <SelectItem value="medium">Medium (16px)</SelectItem>
                <SelectItem value="large">Large (18px)</SelectItem>
                <SelectItem value="extra-large">Extra Large (20px)</SelectItem>
                <SelectItem value="huge">Huge (24px)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Line Height</Label>
            <div className="px-2">
              <Slider
                value={lineHeight}
                onValueChange={setLineHeight}
                max={2.5}
                min={1}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Tight</span>
                <span className="font-medium">{lineHeight[0]}x</span>
                <span>Loose</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Letter Spacing</Label>
            <div className="px-2">
              <Slider
                value={letterSpacing}
                onValueChange={setLetterSpacing}
                max={3}
                min={-1}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Tight</span>
                <span className="font-medium">{letterSpacing[0]}px</span>
                <span>Wide</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Color Blind Support</Label>
            <Select value={colorBlindSupport} onValueChange={setColorBlindSupport}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="protanopia">Protanopia (Red-blind)</SelectItem>
                <SelectItem value="deuteranopia">Deuteranopia (Green-blind)</SelectItem>
                <SelectItem value="tritanopia">Tritanopia (Blue-blind)</SelectItem>
                <SelectItem value="monochromacy">Monochromacy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Palette className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">High Contrast Mode</Label>
                <p className="text-sm text-muted-foreground">Enhanced color contrast for better visibility</p>
              </div>
            </div>
            <Switch checked={highContrast} onCheckedChange={setHighContrast} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Reduce Motion</Label>
                <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
              </div>
            </div>
            <Switch checked={reducedMotion} onCheckedChange={setReducedMotion} />
          </div>
        </CardContent>
      </Card>

      {/* Audio Accessibility */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            Audio Accessibility
          </CardTitle>
          <CardDescription>Configure audio settings and assistance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Volume Boost (%)</Label>
            <div className="px-2">
              <Slider
                value={volumeBoost}
                onValueChange={setVolumeBoost}
                max={200}
                min={50}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>50%</span>
                <span className="font-medium">{volumeBoost[0]}%</span>
                <span>200%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Audio Descriptions</Label>
                <p className="text-sm text-muted-foreground">Descriptive audio for visual content</p>
              </div>
            </div>
            <Switch checked={audioDescriptions} onCheckedChange={setAudioDescriptions} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Closed Captions</Label>
                <p className="text-sm text-muted-foreground">Show captions for all video content</p>
              </div>
            </div>
            <Switch checked={closedCaptions} onCheckedChange={setClosedCaptions} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Disable Auto-play</Label>
                <p className="text-sm text-muted-foreground">Prevent videos from playing automatically</p>
              </div>
            </div>
            <Switch checked={!autoPlay} onCheckedChange={(checked) => setAutoPlay(!checked)} />
          </div>
        </CardContent>
      </Card>

      {/* Navigation Accessibility */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Keyboard className="w-5 h-5" />
            Navigation & Input
          </CardTitle>
          <CardDescription>Configure keyboard and mouse accessibility</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Cursor Size</Label>
            <Select value={cursorSize} onValueChange={setCursorSize}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="large">Large</SelectItem>
                <SelectItem value="extra-large">Extra Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Keyboard className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Enhanced Keyboard Navigation</Label>
                <p className="text-sm text-muted-foreground">Improve keyboard-only navigation</p>
              </div>
            </div>
            <Switch checked={keyboardNav} onCheckedChange={setKeyboardNav} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MousePointer className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Enhanced Focus Indicators</Label>
                <p className="text-sm text-muted-foreground">Stronger visual focus indicators</p>
              </div>
            </div>
            <Switch checked={focusIndicators} onCheckedChange={setFocusIndicators} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Monitor className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Screen Reader Optimization</Label>
                <p className="text-sm text-muted-foreground">Optimize interface for screen readers</p>
              </div>
            </div>
            <Switch checked={screenReader} onCheckedChange={setScreenReader} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}