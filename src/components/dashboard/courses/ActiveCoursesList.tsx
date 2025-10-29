import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Clock, ChevronRight } from "lucide-react";

export function ActiveCoursesList() {
  const activeCourses = [
    {
      id: "1",
      title: "Advanced React Patterns",
      instructor: "Sarah Johnson",
      progress: 67,
      nextLesson: "Higher Order Components",
      timeRemaining: "2h 30m",
      lastAccessed: "2 hours ago",
      urgency: "high"
    },
    {
      id: "2", 
      title: "TypeScript Masterclass",
      instructor: "Michael Chen",
      progress: 45,
      nextLesson: "Generics and Constraints",
      timeRemaining: "4h 15m",
      lastAccessed: "1 day ago",
      urgency: "medium"
    },
    {
      id: "3",
      title: "Node.js Backend Development",
      instructor: "Alex Rodriguez",
      progress: 23,
      nextLesson: "Express Middleware",
      timeRemaining: "8h 45m", 
      lastAccessed: "3 days ago",
      urgency: "low"
    }
  ];


  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Currently Learning</CardTitle>
          <Button variant="ghost" size="sm">
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-all border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{course.title}</h4>
                  <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                </div>
                <Button size="sm" className="ml-4">
                  <Play className="w-4 h-4 mr-2" />
                  Continue
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    {course.timeRemaining} remaining
                  </div>
                  <span className="text-muted-foreground">Last: {course.lastAccessed}</span>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Next Lesson</p>
                      <p className="text-sm text-muted-foreground">{course.nextLesson}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}