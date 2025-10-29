import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Clock, Bell, BookOpen, Target, Brain, Calendar, Mail } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export function AutomationTab() {
  const [smartReminders, setSmartReminders] = React.useState(true);
  const [autoEnrollment, setAutoEnrollment] = React.useState(false);
  const [progressTracking, setProgressTracking] = React.useState(true);
  const [adaptiveLearning, setAdaptiveLearning] = React.useState(true);
  const [smartScheduling, setSmartScheduling] = React.useState(false);
  const [autoNotifications, setAutoNotifications] = React.useState(true);
  const [weeklyReports, setWeeklyReports] = React.useState(true);
  const [goalAdjustment, setGoalAdjustment] = React.useState(false);
  const [studyStreaks, setStudyStreaks] = React.useState(true);
  const [reminderFrequency, setReminderFrequency] = React.useState("smart");
  const [learningPath, setLearningPath] = React.useState("adaptive");
  const [automationLevel, setAutomationLevel] = React.useState([7]);

  const automationRules = [
    { name: "Daily Study Reminder", active: true, trigger: "Time-based", description: "Remind me to study at my preferred time" },
    { name: "Course Completion Celebration", active: true, trigger: "Achievement", description: "Celebrate when I complete a course" },
    { name: "Weekly Progress Report", active: false, trigger: "Schedule", description: "Send me a weekly learning summary" },
    { name: "Assignment Due Reminder", active: true, trigger: "Deadline", description: "Remind me 24 hours before assignment due" },
  ];

  return (
    <div className="space-y-6">
      {/* Automation Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Smart Learning Automation
          </CardTitle>
          <CardDescription>Let AI optimize your learning experience automatically</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Automation Level</Label>
            <div className="px-2">
              <Slider
                value={automationLevel}
                onValueChange={setAutomationLevel}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Manual</span>
                <span className="font-medium">Level {automationLevel[0]}</span>
                <span>Full Auto</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {automationLevel[0] <= 3 && "Minimal automation with manual control"}
              {automationLevel[0] > 3 && automationLevel[0] <= 7 && "Balanced automation with user oversight"}
              {automationLevel[0] > 7 && "Maximum automation for hands-off learning"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Brain className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label className="font-medium">Adaptive Learning Path</Label>
                  <p className="text-sm text-muted-foreground">AI adjusts difficulty based on performance</p>
                </div>
              </div>
              <Switch checked={adaptiveLearning} onCheckedChange={setAdaptiveLearning} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label className="font-medium">Smart Reminders</Label>
                  <p className="text-sm text-muted-foreground">Optimal timing for study notifications</p>
                </div>
              </div>
              <Switch checked={smartReminders} onCheckedChange={setSmartReminders} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Automation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Learning Automation
          </CardTitle>
          <CardDescription>Automate your learning journey and progress tracking</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Learning Path Strategy</Label>
            <Select value={learningPath} onValueChange={setLearningPath}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linear">Linear - Follow course order</SelectItem>
                <SelectItem value="adaptive">Adaptive - AI optimizes sequence</SelectItem>
                <SelectItem value="interest">Interest-based - Follow your preferences</SelectItem>
                <SelectItem value="goal">Goal-oriented - Focus on objectives</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Auto-enrollment</Label>
                <p className="text-sm text-muted-foreground">Automatically enroll in recommended courses</p>
              </div>
            </div>
            <Switch checked={autoEnrollment} onCheckedChange={setAutoEnrollment} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Progress Tracking</Label>
                <p className="text-sm text-muted-foreground">Automatically track and log learning progress</p>
              </div>
            </div>
            <Switch checked={progressTracking} onCheckedChange={setProgressTracking} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Goal Adjustment</Label>
                <p className="text-sm text-muted-foreground">Automatically adjust goals based on progress</p>
              </div>
            </div>
            <Switch checked={goalAdjustment} onCheckedChange={setGoalAdjustment} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Study Streak Tracking</Label>
                <p className="text-sm text-muted-foreground">Automatically track daily study streaks</p>
              </div>
            </div>
            <Switch checked={studyStreaks} onCheckedChange={setStudyStreaks} />
          </div>
        </CardContent>
      </Card>

      {/* Schedule Automation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Schedule Automation
          </CardTitle>
          <CardDescription>Automate your study schedule and time management</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Reminder Strategy</Label>
            <Select value={reminderFrequency} onValueChange={setReminderFrequency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="smart">Smart - AI optimizes timing</SelectItem>
                <SelectItem value="fixed">Fixed - Same time daily</SelectItem>
                <SelectItem value="adaptive">Adaptive - Based on your patterns</SelectItem>
                <SelectItem value="deadline">Deadline-driven - Before due dates</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Smart Scheduling</Label>
                <p className="text-sm text-muted-foreground">AI finds optimal study times in your calendar</p>
              </div>
            </div>
            <Switch checked={smartScheduling} onCheckedChange={setSmartScheduling} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Auto Notifications</Label>
                <p className="text-sm text-muted-foreground">Smart notifications for deadlines and goals</p>
              </div>
            </div>
            <Switch checked={autoNotifications} onCheckedChange={setAutoNotifications} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label className="font-medium">Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">Automatic weekly progress summaries</p>
              </div>
            </div>
            <Switch checked={weeklyReports} onCheckedChange={setWeeklyReports} />
          </div>
        </CardContent>
      </Card>

      {/* Automation Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Active Automation Rules
          </CardTitle>
          <CardDescription>Manage your automated learning workflows</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {automationRules.map((rule, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="flex items-center gap-2 pt-1">
                    <div className={`w-2 h-2 rounded-full ${rule.active ? 'bg-green-500' : 'bg-gray-300'}`} />
                  </div>
                  <div>
                    <p className="font-medium">{rule.name}</p>
                    <p className="text-sm text-muted-foreground">{rule.description}</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {rule.trigger}
                    </Badge>
                  </div>
                </div>
                <Switch checked={rule.active} onCheckedChange={() => {}} />
              </div>
            ))}
          </div>
          
          <div className="pt-4 border-t mt-4">
            <Button variant="outline" className="w-full">
              <Zap className="w-4 h-4 mr-2" />
              Create Custom Rule
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}