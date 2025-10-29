import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Star, Target, Zap, Calendar } from "lucide-react";

export function AchievementStats() {
  const stats = [
    {
      icon: Trophy,
      title: "Total Achievements",
      value: "42",
      subtitle: "+5 this month",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    },
    {
      icon: Award,
      title: "Badges Earned",
      value: "28",
      subtitle: "+3 this week",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Star,
      title: "Current Streak",
      value: "12 days",
      subtitle: "Personal best!",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    },
    {
      icon: Target,
      title: "Completion Rate",
      value: "94%",
      subtitle: "Above average",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    }
  ];

  const recentAchievements = [
    { name: "Course Master", description: "Completed 10 courses", earned: "2 days ago", type: "milestone" },
    { name: "Speed Learner", description: "Finished course in under 2 weeks", earned: "1 week ago", type: "performance" },
    { name: "Discussion Champion", description: "Posted 50 helpful responses", earned: "2 weeks ago", type: "community" }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-sm bg-card/50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-muted-foreground truncate">
                    {stat.title}
                  </p>
                  <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-primary" />
            <span>Recent Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAchievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-accent/30 hover:bg-accent/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-foreground">{achievement.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {achievement.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">{achievement.earned}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}