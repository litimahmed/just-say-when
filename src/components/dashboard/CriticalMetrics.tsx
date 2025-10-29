import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  BookOpen,
  Target,
  Flame
} from "lucide-react";

export function CriticalMetrics() {
  const metrics = [
    {
      title: "Overall Progress",
      value: "67%",
      description: "closer to your goal",
      progress: 67,
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
      trend: "+12% this week"
    },
    {
      title: "Learning Hours",
      value: "24",
      description: "this month",
      progress: 75,
      icon: BookOpen,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      trend: "+8hrs vs last month"
    },
    {
      title: "Study Streak",
      value: "12",
      description: "days in a row",
      progress: 86,
      icon: Flame,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      trend: "2 days to record!"
    },
    {
      title: "Week Goal",
      value: "8/10",
      description: "hours completed",
      progress: 80,
      icon: Target,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      trend: "2 hours left"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${metric.bgColor} flex items-center justify-center`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <Badge variant="outline" className="text-xs">
                {metric.trend}
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                <p className="text-sm text-muted-foreground">{metric.description}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">{metric.title}</span>
                  <span className="text-muted-foreground">{metric.progress}%</span>
                </div>
                <Progress value={metric.progress} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}