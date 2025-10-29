import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, GraduationCap, Clock, AlertCircle } from "lucide-react";

export function CourseStats() {
  const stats = [
    {
      title: "Total Enrolled",
      value: "12",
      subtitle: "courses",
      icon: BookOpen,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "In Progress", 
      value: "8",
      subtitle: "active learning",
      icon: Clock,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    },
    {
      title: "Completed",
      value: "4",
      subtitle: "certificates earned", 
      icon: GraduationCap,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      title: "Average Grade",
      value: "92%",
      subtitle: "across all courses",
      icon: GraduationCap,
      color: "text-green-500", 
      bgColor: "bg-green-500/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}