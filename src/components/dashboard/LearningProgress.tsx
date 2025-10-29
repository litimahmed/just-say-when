import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ArrowRight, Clock, BookOpen } from "lucide-react";

export function LearningProgress() {
  const learningPaths = [
    {
      title: "Full Stack Web Development",
      description: "Master modern web development with React, Node.js, and databases",
      progress: 68,
      totalCourses: 12,
      completedCourses: 8,
      estimatedTime: "3 months",
      difficulty: "Intermediate",
      skills: ["React", "Node.js", "MongoDB", "JavaScript"]
    },
    {
      title: "Data Science Fundamentals",
      description: "Learn data analysis, visualization, and machine learning basics",
      progress: 32,
      totalCourses: 8,
      completedCourses: 3,
      estimatedTime: "4 months",
      difficulty: "Beginner",
      skills: ["Python", "Pandas", "Matplotlib", "Statistics"]
    }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-primary" />
              Learning Progress
            </CardTitle>
            <CardDescription>Track your learning journey and milestones</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <ArrowRight className="w-4 h-4 mr-2" />
            View All Paths
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {learningPaths.map((path, index) => (
          <div key={index} className="p-4 border border-border rounded-lg space-y-4 hover:bg-accent/30 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-semibold text-foreground">{path.title}</h4>
                  <Badge variant="outline">{path.difficulty}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{path.description}</p>
                
                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {path.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button size="sm" className="ml-4">
                Continue
              </Button>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">Progress: {path.progress}%</span>
                <span className="text-muted-foreground">
                  {path.completedCourses} of {path.totalCourses} courses
                </span>
              </div>
              <Progress value={path.progress} className="h-2" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Est. {path.estimatedTime}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <BookOpen className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{path.totalCourses} courses</span>
              </div>
            </div>
          </div>
        ))}
        
        <div className="text-center pt-4 border-t border-border">
          <Button variant="ghost" className="text-primary">
            <ArrowRight className="w-4 h-4 mr-2" />
            Explore More Learning Paths
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}