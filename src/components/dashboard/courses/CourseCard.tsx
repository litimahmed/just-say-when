import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Clock, User, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    instructor: string;
    image: string;
    progress: number;
    status: "active" | "completed" | "paused";
    totalLessons: number;
    completedLessons: number;
    timeSpent: string;
    nextLesson?: string;
    grade?: number;
    lastAccessed: string;
  };
}

export function CourseCard({ course }: CourseCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-700 border-green-200";
      case "completed":
        return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "paused":
        return "bg-orange-500/10 text-orange-700 border-orange-200";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/20">
      <CardContent className="p-0">
        {/* Course Image/Thumbnail */}
        <div className="relative h-40 rounded-t-lg overflow-hidden">
          <img 
            src={course.image} 
            alt={`${course.title} course thumbnail`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute top-3 left-3">
            <Badge className={getStatusColor(course.status)}>
              {course.status}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 bg-black/20 hover:bg-black/40">
                  <MoreVertical className="w-4 h-4 text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Syllabus</DropdownMenuItem>
                <DropdownMenuItem>Course Settings</DropdownMenuItem>
                <DropdownMenuItem>Download Materials</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" className="bg-white/90 text-primary hover:bg-white">
              <Play className="w-4 h-4 mr-2" />
              Continue
            </Button>
          </div>
        </div>

        {/* Course Content */}
        <div className="p-4 space-y-4">
          {/* Title and Instructor */}
          <div>
            <h3 className="font-semibold text-foreground line-clamp-2 mb-1">
              {course.title}
            </h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <User className="w-3 h-3 mr-1" />
              {course.instructor}
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{course.completedLessons}/{course.totalLessons} lessons</span>
              <span>{course.timeSpent} spent</span>
            </div>
          </div>

          {/* Next Lesson or Completion Status */}
          {course.status === "completed" ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-green-600">
                <span>Grade: {course.grade}%</span>
              </div>
              <Button variant="outline" size="sm">
                Certificate
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {course.nextLesson && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Next: </span>
                  <span className="font-medium">{course.nextLesson}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  {course.lastAccessed}
                </div>
                <Button size="sm">
                  Continue Learning
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}