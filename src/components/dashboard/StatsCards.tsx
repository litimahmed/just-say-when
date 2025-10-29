import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Clock,
  Trophy,
  TrendingUp,
  CheckCircle,
  Target
} from "lucide-react";

export function StatsCards() {
  const stats = [
    {
      title: "Active Courses",
      value: "8",
      change: "+2 this month",
      icon: BookOpen,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "Hours Studied",
      value: "124",
      change: "+18% from last week",
      icon: Clock,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      title: "Achievements",
      value: "23",
      change: "+5 this month",
      icon: Trophy,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    },
    {
      title: "Avg. Grade",
      value: "94%",
      change: "+3% improvement",
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      title: "Completed",
      value: "15",
      change: "courses finished",
      icon: CheckCircle,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10"
    },
    {
      title: "Goals Met",
      value: "7/10",
      change: "this month",
      icon: Target,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-all duration-200 border-border">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}