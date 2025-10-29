import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Clock, MessageSquare, BookOpen, Brain, Award, Zap, PlayCircle, Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function CourseTab() {
  const [completionGoal, setCompletionGoal] = React.useState("1-week");
  const [feedbackPrompts, setFeedbackPrompts] = React.useState(true);
  const [reminderFrequency, setReminderFrequency] = React.useState("daily");
  const [recommendations, setRecommendations] = React.useState(true);
  const [autoProgress, setAutoProgress] = React.useState(true);
  const [skipQuizzes, setSkipQuizzes] = React.useState(false);
  const [downloadMaterials, setDownloadMaterials] = React.useState(true);
  const [studyTimeGoal, setStudyTimeGoal] = React.useState([30]);
  const [playbackSpeed, setPlaybackSpeed] = React.useState("1.0");
  const [subtitles, setSubtitles] = React.useState(true);
  const [darkModeVideo, setDarkModeVideo] = React.useState(false);
  const [difficulty, setDifficulty] = React.useState("intermediate");
  const [learningStyle, setLearningStyle] = React.useState("visual");
  const [certificateEmails, setCertificateEmails] = React.useState(true);
  const [studyReminders, setStudyReminders] = React.useState("smart");
  const [weeklyGoal, setWeeklyGoal] = React.useState([5]);

  return (
    <div className="space-y-6">
      {/* Learning Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Learning Goals
          </CardTitle>
          <CardDescription>Set your learning objectives and targets</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Course Completion Goal</Label>
            <Select value={completionGoal} onValueChange={setCompletionGoal}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-week">1 course per week</SelectItem>
                <SelectItem value="2-week">2 courses per week</SelectItem>
                <SelectItem value="1-month">1 course per month</SelectItem>
                <SelectItem value="3-month">1 course per 3 months</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Daily Study Time Goal (minutes)</Label>
            <div className="px-2">
              <Slider
                value={studyTimeGoal}
                onValueChange={setStudyTimeGoal}
                max={180}
                min={15}
                step={15}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>15 min</span>
                <span className="font-medium">{studyTimeGoal[0]} minutes</span>
                <span>3 hours</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Weekly Learning Hours</Label>
            <div className="px-2">
              <Slider
                value={weeklyGoal}
                onValueChange={setWeeklyGoal}
                max={20}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1 hour</span>
                <span className="font-medium">{weeklyGoal[0]} hours</span>
                <span>20 hours</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Preferred Difficulty Level</Label>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Learning Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Learning Preferences
          </CardTitle>
          <CardDescription>Customize your learning experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Learning Style</Label>
            <Select value={learningStyle} onValueChange={setLearningStyle}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visual">Visual (videos, diagrams)</SelectItem>
                <SelectItem value="auditory">Auditory (audio, discussions)</SelectItem>
                <SelectItem value="kinesthetic">Kinesthetic (hands-on, practice)</SelectItem>
                <SelectItem value="reading">Reading/Writing (text, notes)</SelectItem>
                <SelectItem value="mixed">Mixed approach</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Auto-progress Lessons</Label>
                <p className="text-sm text-muted-foreground">Automatically mark lessons as complete</p>
              </div>
            </div>
            <Switch checked={autoProgress} onCheckedChange={setAutoProgress} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Skip Completed Quizzes</Label>
                <p className="text-sm text-muted-foreground">Skip quizzes you've already passed</p>
              </div>
            </div>
            <Switch checked={skipQuizzes} onCheckedChange={setSkipQuizzes} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Download Course Materials</Label>
                <p className="text-sm text-muted-foreground">Allow offline access to materials</p>
              </div>
            </div>
            <Switch checked={downloadMaterials} onCheckedChange={setDownloadMaterials} />
          </div>
        </CardContent>
      </Card>

      {/* Video Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlayCircle className="w-5 h-5" />
            Video & Media Settings
          </CardTitle>
          <CardDescription>Configure your video viewing experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Default Playback Speed</Label>
            <Select value={playbackSpeed} onValueChange={setPlaybackSpeed}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.5">0.5x</SelectItem>
                <SelectItem value="0.75">0.75x</SelectItem>
                <SelectItem value="1.0">1.0x (Normal)</SelectItem>
                <SelectItem value="1.25">1.25x</SelectItem>
                <SelectItem value="1.5">1.5x</SelectItem>
                <SelectItem value="2.0">2.0x</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Show Subtitles</Label>
                <p className="text-sm text-muted-foreground">Display captions for videos</p>
              </div>
            </div>
            <Switch checked={subtitles} onCheckedChange={setSubtitles} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PlayCircle className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Dark Mode Video Player</Label>
                <p className="text-sm text-muted-foreground">Use dark theme for video player</p>
              </div>
            </div>
            <Switch checked={darkModeVideo} onCheckedChange={setDarkModeVideo} />
          </div>
        </CardContent>
      </Card>

      {/* Notifications & Reminders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Study Reminders
          </CardTitle>
          <CardDescription>Manage your learning reminders and notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Reminder Type</Label>
            <Select value={studyReminders} onValueChange={setStudyReminders}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="smart">Smart reminders (AI-optimized)</SelectItem>
                <SelectItem value="daily">Daily at set time</SelectItem>
                <SelectItem value="weekly">Weekly summary</SelectItem>
                <SelectItem value="deadline">Only assignment deadlines</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Course Feedback Prompts</Label>
                <p className="text-sm text-muted-foreground">Ask for feedback after course completion</p>
              </div>
            </div>
            <Switch checked={feedbackPrompts} onCheckedChange={setFeedbackPrompts} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Personalized Recommendations</Label>
                <p className="text-sm text-muted-foreground">Get AI-powered course suggestions</p>
              </div>
            </div>
            <Switch checked={recommendations} onCheckedChange={setRecommendations} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Certificate Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Email me when certificates are earned</p>
              </div>
            </div>
            <Switch checked={certificateEmails} onCheckedChange={setCertificateEmails} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}