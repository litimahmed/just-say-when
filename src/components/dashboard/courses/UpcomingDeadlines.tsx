import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, AlertTriangle, BookOpen, Video } from "lucide-react";

export function UpcomingDeadlines() {
  const deadlines = [
    {
      id: "1",
      type: "assignment",
      title: "React Portfolio Project",
      course: "Advanced React Patterns",
      dueDate: "Tomorrow",
      priority: "high",
      icon: BookOpen
    },
    {
      id: "2", 
      type: "live_session",
      title: "Q&A with TypeScript Expert",
      course: "TypeScript Masterclass",
      dueDate: "Jan 25, 2:00 PM",
      priority: "medium",
      icon: Video
    },
    {
      id: "3",
      type: "assignment", 
      title: "API Integration Exercise",
      course: "Node.js Backend Development",
      dueDate: "Jan 28",
      priority: "medium",
      icon: BookOpen
    },
    {
      id: "4",
      type: "exam",
      title: "Python Fundamentals Quiz",
      course: "Python for Data Science", 
      dueDate: "Feb 2",
      priority: "low",
      icon: AlertTriangle
    }
  ];

  const recommendations = [
    {
      title: "Advanced JavaScript",
      reason: "Complete React prerequisites", 
      match: "95%"
    },
    {
      title: "Database Design",
      reason: "Enhance backend skills",
      match: "87%"
    },
    {
      title: "DevOps Fundamentals", 
      reason: "Career path alignment",
      match: "78%"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-700 border-red-200";
      case "medium":
        return "bg-orange-500/10 text-orange-700 border-orange-200"; 
      default:
        return "bg-blue-500/10 text-blue-700 border-blue-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <CalendarDays className="w-5 h-5 mr-2" />
            Upcoming Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {deadlines.map((deadline) => (
            <div key={deadline.id} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <deadline.icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-sm line-clamp-1">{deadline.title}</h4>
                  <Badge className={getPriorityColor(deadline.priority)}>
                    {deadline.priority}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{deadline.course}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  {deadline.dueDate}
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full" size="sm">
            View All Deadlines
          </Button>
        </CardContent>
      </Card>

      {/* Course Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recommended for You</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="p-3 rounded-lg border hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{rec.title}</h4>
                <Badge variant="secondary" className="text-xs">
                  {rec.match} match
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{rec.reason}</p>
              <Button variant="outline" size="sm" className="w-full">
                View Course
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Achievement Highlights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3 p-2 rounded-lg bg-green-500/5">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              🏆
            </div>
            <div>
              <p className="font-medium text-sm">JavaScript Master</p>
              <p className="text-xs text-muted-foreground">Completed all JS fundamentals</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-2 rounded-lg bg-blue-500/5">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
              🔥
            </div>
            <div>
              <p className="font-medium text-sm">7-Day Streak</p>
              <p className="text-xs text-muted-foreground">Keep the momentum going!</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}