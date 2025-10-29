import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Mail, MessageSquare, Calendar, Trophy, BookOpen } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function NotificationTab() {
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [pushNotifications, setPushNotifications] = React.useState(true);
  const [courseReminders, setCourseReminders] = React.useState(true);
  const [assignmentDeadlines, setAssignmentDeadlines] = React.useState(true);
  const [achievementAlerts, setAchievementAlerts] = React.useState(true);
  const [communityMessages, setCommunityMessages] = React.useState(false);
  const [weeklyDigest, setWeeklyDigest] = React.useState(true);
  const [marketingEmails, setMarketingEmails] = React.useState(false);
  const [notificationFrequency, setNotificationFrequency] = React.useState("immediate");
  const [quietHoursStart, setQuietHoursStart] = React.useState("22:00");
  const [quietHoursEnd, setQuietHoursEnd] = React.useState("08:00");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Control how and when you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email Notifications */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label className="font-medium">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label className="font-medium">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                </div>
              </div>
              <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
            </div>
          </div>

          {/* Learning Notifications */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Learning & Progress</h4>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label className="font-medium">Course Reminders</Label>
                  <p className="text-sm text-muted-foreground">Daily study reminders and progress updates</p>
                </div>
              </div>
              <Switch checked={courseReminders} onCheckedChange={setCourseReminders} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label className="font-medium">Assignment Deadlines</Label>
                  <p className="text-sm text-muted-foreground">Alerts for upcoming assignment due dates</p>
                </div>
              </div>
              <Switch checked={assignmentDeadlines} onCheckedChange={setAssignmentDeadlines} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label className="font-medium">Achievement Alerts</Label>
                  <p className="text-sm text-muted-foreground">Celebrate your learning milestones</p>
                </div>
              </div>
              <Switch checked={achievementAlerts} onCheckedChange={setAchievementAlerts} />
            </div>
          </div>

          {/* Communication */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Communication</h4>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label className="font-medium">Community Messages</Label>
                  <p className="text-sm text-muted-foreground">Messages from instructors and peers</p>
                </div>
              </div>
              <Switch checked={communityMessages} onCheckedChange={setCommunityMessages} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label className="font-medium">Weekly Digest</Label>
                  <p className="text-sm text-muted-foreground">Summary of your learning progress</p>
                </div>
              </div>
              <Switch checked={weeklyDigest} onCheckedChange={setWeeklyDigest} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label className="font-medium">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">Updates about new courses and features</p>
                </div>
              </div>
              <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
            </div>
          </div>

          {/* Timing Preferences */}
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Timing & Frequency</h4>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Notification Frequency</Label>
              <Select value={notificationFrequency} onValueChange={setNotificationFrequency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="hourly">Hourly Digest</SelectItem>
                  <SelectItem value="daily">Daily Digest</SelectItem>
                  <SelectItem value="weekly">Weekly Digest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Quiet Hours Start</Label>
                <Select value={quietHoursStart} onValueChange={setQuietHoursStart}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = String(i).padStart(2, '0');
                      return (
                        <SelectItem key={hour} value={`${hour}:00`}>
                          {hour}:00
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Quiet Hours End</Label>
                <Select value={quietHoursEnd} onValueChange={setQuietHoursEnd}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = String(i).padStart(2, '0');
                      return (
                        <SelectItem key={hour} value={`${hour}:00`}>
                          {hour}:00
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}