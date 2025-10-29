import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  MapPin,
  BarChart3,
  Calendar
} from "lucide-react";

export function ProgressVisualization() {
  const learningPath = [
    { phase: "Foundations", status: "completed", progress: 100 },
    { phase: "Intermediate", status: "current", progress: 67 },
    { phase: "Advanced", status: "upcoming", progress: 0 },
    { phase: "Specialization", status: "upcoming", progress: 0 }
  ];

  const skills = [
    { name: "React", level: 75, color: "bg-blue-500" },
    { name: "JavaScript", level: 85, color: "bg-yellow-500" },
    { name: "TypeScript", level: 60, color: "bg-blue-600" },
    { name: "Node.js", level: 45, color: "bg-green-500" },
    { name: "CSS", level: 90, color: "bg-pink-500" }
  ];

  const weeklyActivity = Array.from({ length: 7 }, (_, i) => ({
    day: ['S', 'M', 'T', 'W', 'T', 'F', 'S'][i],
    activity: Math.floor(Math.random() * 4) + 1
  }));

  return (
    <div className="space-y-6">
      {/* Learning Path Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-primary" />
            Learning Path Progress
          </CardTitle>
          <CardDescription>Your journey through Full Stack Development</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {learningPath.map((phase, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  phase.status === 'completed' ? 'bg-green-500 text-white' :
                  phase.status === 'current' ? 'bg-primary text-primary-foreground' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{phase.phase}</span>
                    <Badge variant={
                      phase.status === 'completed' ? 'default' :
                      phase.status === 'current' ? 'secondary' : 'outline'
                    }>
                      {phase.status}
                    </Badge>
                  </div>
                  <Progress value={phase.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skill Development */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-primary" />
            Skill Development
          </CardTitle>
          <CardDescription>Your proficiency across technologies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {skills.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{skill.name}</span>
                <span className="text-sm text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${skill.color} transition-all duration-300`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Weekly Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-primary" />
            This Week's Activity
          </CardTitle>
          <CardDescription>Your study consistency</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex justify-center space-x-2 mb-4">
            {weeklyActivity.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-muted-foreground mb-2">{day.day}</div>
                <div className={`w-8 h-8 rounded-lg ${
                  day.activity >= 3 ? 'bg-green-500' :
                  day.activity >= 2 ? 'bg-primary' :
                  day.activity >= 1 ? 'bg-yellow-500' :
                  'bg-muted'
                }`} />
              </div>
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-primary">12 hours</span> studied this week
          </div>
        </CardContent>
      </Card>
    </div>
  );
}