import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Zap, Clock, BookOpen, Users } from "lucide-react";

interface ProgressTrackerProps {
  detailed?: boolean;
}

export function ProgressTracker({ detailed = false }: ProgressTrackerProps) {
  const currentGoals = [
    {
      id: 1,
      title: "Master JavaScript",
      description: "Complete all JavaScript courses",
      progress: 75,
      target: 100,
      deadline: "2024-04-30",
      category: "Technical Skills",
      icon: BookOpen,
      color: "text-blue-500"
    },
    {
      id: 2,
      title: "Community Contributor",
      description: "Help 50 students in discussions",
      progress: 32,
      target: 50,
      deadline: "2024-05-15",
      category: "Community",
      icon: Users,
      color: "text-green-500"
    },
    {
      id: 3,
      title: "Learning Streak",
      description: "Maintain 30-day study streak",
      progress: 18,
      target: 30,
      deadline: "2024-04-20",
      category: "Consistency",
      icon: Zap,
      color: "text-orange-500"
    }
  ];

  const weeklyStats = [
    { label: "Study Hours", value: 12, target: 15, icon: Clock },
    { label: "Courses Completed", value: 2, target: 3, icon: BookOpen },
    { label: "Forum Posts", value: 8, target: 10, icon: Users },
    { label: "Quiz Scores", value: 92, target: 95, icon: Target }
  ];

  const monthlyProgress = [
    { month: "Jan", achievements: 8 },
    { month: "Feb", achievements: 12 },
    { month: "Mar", achievements: 15 },
    { month: "Apr", achievements: 10 }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Progress Tracker</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Goals */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Current Goals</h4>
            {currentGoals.map((goal) => (
              <div key={goal.id} className="space-y-3 p-4 rounded-lg bg-accent/30">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                      <goal.icon className={`w-4 h-4 ${goal.color}`} />
                    </div>
                    <div>
                      <h5 className="font-medium text-foreground">{goal.title}</h5>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {goal.category}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {goal.progress} / {goal.target}
                    </span>
                    <span className="text-muted-foreground">
                      {Math.round((goal.progress / goal.target) * 100)}%
                    </span>
                  </div>
                  <Progress value={(goal.progress / goal.target) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Deadline: {new Date(goal.deadline).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {detailed && (
            <>
              {/* Weekly Stats */}
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">This Week</h4>
                <div className="grid grid-cols-2 gap-3">
                  {weeklyStats.map((stat, index) => (
                    <div key={index} className="p-3 rounded-lg border bg-card/50">
                      <div className="flex items-center space-x-2 mb-2">
                        <stat.icon className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{stat.label}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold">{stat.value}</span>
                          <span className="text-muted-foreground">/ {stat.target}</span>
                        </div>
                        <Progress value={(stat.value / stat.target) * 100} className="h-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly Trend */}
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Monthly Achievement Trend</h4>
                <div className="space-y-2">
                  {monthlyProgress.map((month, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <span className="text-sm font-medium w-8">{month.month}</span>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="h-2 bg-primary rounded-full transition-all duration-300"
                            style={{ width: `${(month.achievements / 20) * 100}%` }}
                          />
                          <span className="text-sm text-muted-foreground">
                            {month.achievements}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}