import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Star, Zap, Target, Gift, Medal, Crown, Coins } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";

export function GamificationTab() {
  const [achievementNotifications, setAchievementNotifications] = React.useState(true);
  const [leaderboards, setLeaderboards] = React.useState(true);
  const [pointsSystem, setPointsSystem] = React.useState(true);
  const [streakTracking, setStreakTracking] = React.useState(true);
  const [competitiveMode, setCompetitiveMode] = React.useState(false);
  const [badgeSharing, setBadgeSharing] = React.useState(true);
  const [motivationLevel, setMotivationLevel] = React.useState([7]);
  const [rewardFrequency, setRewardFrequency] = React.useState("balanced");
  const [challengeDifficulty, setChallengeDifficulty] = React.useState("adaptive");

  const gamificationStats = {
    totalPoints: 1245,
    currentLevel: 12,
    nextLevelPoints: 1500,
    badges: 18,
    streak: 7,
    rank: 156
  };

  const recentAchievements = [
    { name: "Course Crusher", icon: "🎯", description: "Complete 5 courses", unlocked: true, date: "2 days ago" },
    { name: "Study Streak Star", icon: "🔥", description: "7-day study streak", unlocked: true, date: "Today" },
    { name: "Knowledge Seeker", icon: "📚", description: "1000 learning points", unlocked: true, date: "1 week ago" },
    { name: "Quiz Master", icon: "🧠", description: "100% on 10 quizzes", unlocked: false, progress: 70 },
  ];

  const availableRewards = [
    { name: "Extra Study Time", cost: 100, icon: "⏰", available: true },
    { name: "Course Discount", cost: 250, icon: "💰", available: true },
    { name: "Priority Support", cost: 500, icon: "🎧", available: false },
    { name: "Custom Badge", cost: 750, icon: "🎨", available: false },
  ];

  return (
    <div className="space-y-6">
      {/* Gamification Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Your Learning Progress
          </CardTitle>
          <CardDescription>Track your achievements and level up your learning</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <Crown className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-primary">Level {gamificationStats.currentLevel}</div>
              <div className="text-sm text-muted-foreground">Learning Level</div>
            </div>
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <Coins className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-primary">{gamificationStats.totalPoints}</div>
              <div className="text-sm text-muted-foreground">Learning Points</div>
            </div>
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <Zap className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-primary">{gamificationStats.streak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Level {gamificationStats.currentLevel + 1}</span>
              <span>{gamificationStats.totalPoints}/{gamificationStats.nextLevelPoints} points</span>
            </div>
            <Progress value={(gamificationStats.totalPoints / gamificationStats.nextLevelPoints) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Gamification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            Gamification Preferences
          </CardTitle>
          <CardDescription>Customize your gamified learning experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Motivation Level</Label>
            <div className="px-2">
              <Slider
                value={motivationLevel}
                onValueChange={setMotivationLevel}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Subtle</span>
                <span className="font-medium">Level {motivationLevel[0]}</span>
                <span>Intense</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Reward Frequency</Label>
            <Select value={rewardFrequency} onValueChange={setRewardFrequency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="frequent">Frequent - Reward every small achievement</SelectItem>
                <SelectItem value="balanced">Balanced - Regular meaningful rewards</SelectItem>
                <SelectItem value="milestone">Milestone - Only major achievements</SelectItem>
                <SelectItem value="minimal">Minimal - Essential rewards only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Challenge Difficulty</Label>
            <Select value={challengeDifficulty} onValueChange={setChallengeDifficulty}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy - Achievable goals</SelectItem>
                <SelectItem value="adaptive">Adaptive - AI adjusts difficulty</SelectItem>
                <SelectItem value="challenging">Challenging - Push your limits</SelectItem>
                <SelectItem value="expert">Expert - Maximum difficulty</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label className="font-medium">Achievement Notifications</Label>
                  <p className="text-sm text-muted-foreground">Celebrate your wins</p>
                </div>
              </div>
              <Switch checked={achievementNotifications} onCheckedChange={setAchievementNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label className="font-medium">Leaderboards</Label>
                  <p className="text-sm text-muted-foreground">Compare with peers</p>
                </div>
              </div>
              <Switch checked={leaderboards} onCheckedChange={setLeaderboards} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Coins className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label className="font-medium">Points System</Label>
                  <p className="text-sm text-muted-foreground">Earn learning points</p>
                </div>
              </div>
              <Switch checked={pointsSystem} onCheckedChange={setPointsSystem} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label className="font-medium">Streak Tracking</Label>
                  <p className="text-sm text-muted-foreground">Daily study streaks</p>
                </div>
              </div>
              <Switch checked={streakTracking} onCheckedChange={setStreakTracking} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label className="font-medium">Competitive Mode</Label>
                  <p className="text-sm text-muted-foreground">Compete with others</p>
                </div>
              </div>
              <Switch checked={competitiveMode} onCheckedChange={setCompetitiveMode} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Medal className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label className="font-medium">Badge Sharing</Label>
                  <p className="text-sm text-muted-foreground">Share achievements</p>
                </div>
              </div>
              <Switch checked={badgeSharing} onCheckedChange={setBadgeSharing} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Medal className="w-5 h-5" />
            Recent Achievements
          </CardTitle>
          <CardDescription>Your latest learning milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAchievements.map((achievement, index) => (
              <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${achievement.unlocked ? 'bg-primary/5 border-primary/20' : 'bg-muted/50'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <p className={`font-medium ${!achievement.unlocked && 'text-muted-foreground'}`}>
                      {achievement.name}
                    </p>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    {!achievement.unlocked && achievement.progress && (
                      <div className="mt-1">
                        <Progress value={achievement.progress} className="h-1 w-24" />
                        <span className="text-xs text-muted-foreground">{achievement.progress}%</span>
                      </div>
                    )}
                  </div>
                </div>
                {achievement.unlocked ? (
                  <Badge variant="secondary">{achievement.date}</Badge>
                ) : (
                  <Badge variant="outline">In Progress</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rewards Store */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5" />
            Rewards Store
          </CardTitle>
          <CardDescription>Redeem your learning points for rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availableRewards.map((reward, index) => (
              <div key={index} className={`p-4 rounded-lg border ${reward.available ? 'border-primary/20 bg-primary/5' : 'border-muted bg-muted/50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{reward.icon}</span>
                    <span className={`font-medium ${!reward.available && 'text-muted-foreground'}`}>
                      {reward.name}
                    </span>
                  </div>
                  <Badge variant={reward.available ? "default" : "secondary"}>
                    {reward.cost} pts
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}