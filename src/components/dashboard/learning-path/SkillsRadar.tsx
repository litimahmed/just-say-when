import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Code, Database, Palette, Server, Globe } from "lucide-react";
import { LearningPath } from "./types";

interface SkillsRadarProps {
  selectedPath: LearningPath;
}

export function SkillsRadar({ selectedPath }: SkillsRadarProps) {
  // Mock skill data based on selected path
  const getSkillsData = (pathId: string) => {
    const skillsMap = {
      fullstack: [
        { name: "Frontend", level: 75, icon: Code, color: "bg-blue-500" },
        { name: "Backend", level: 45, icon: Server, color: "bg-green-500" },
        { name: "Database", level: 60, icon: Database, color: "bg-purple-500" },
        { name: "UI/UX", level: 85, icon: Palette, color: "bg-pink-500" },
        { name: "DevOps", level: 30, icon: Globe, color: "bg-orange-500" }
      ],
      datascience: [
        { name: "Python", level: 65, icon: Code, color: "bg-blue-500" },
        { name: "Statistics", level: 55, icon: TrendingUp, color: "bg-green-500" },
        { name: "ML", level: 40, icon: Database, color: "bg-purple-500" },
        { name: "Visualization", level: 70, icon: Palette, color: "bg-pink-500" }
      ]
    };
    return skillsMap[pathId as keyof typeof skillsMap] || skillsMap.fullstack;
  };

  const skills = getSkillsData(selectedPath.id);

  const getSkillLevel = (level: number) => {
    if (level >= 80) return { text: "Expert", color: "text-green-600 dark:text-green-400" };
    if (level >= 60) return { text: "Advanced", color: "text-blue-600 dark:text-blue-400" };
    if (level >= 40) return { text: "Intermediate", color: "text-yellow-600 dark:text-yellow-400" };
    return { text: "Beginner", color: "text-red-600 dark:text-red-400" };
  };

  const averageSkill = Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-primary" />
          Skill Development
        </CardTitle>
        <CardDescription>
          Your proficiency across key areas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Skill Level */}
        <div className="text-center p-4 bg-primary/10 rounded-lg">
          <div className="text-2xl font-bold text-primary">{averageSkill}%</div>
          <div className="text-sm text-muted-foreground">Overall Progress</div>
          <Badge className="mt-2" variant="secondary">
            {getSkillLevel(averageSkill).text}
          </Badge>
        </div>

        {/* Individual Skills */}
        <div className="space-y-4">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            const skillInfo = getSkillLevel(skill.level);
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={`text-xs ${skillInfo.color}`}>
                      {skillInfo.text}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                </div>
                <div className="relative">
                  <Progress value={skill.level} className="h-2" />
                  <div 
                    className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-300 ${skill.color}`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Skill Insights */}
        <div className="space-y-2 pt-4 border-t border-border">
          <h4 className="font-medium text-sm">Quick Insights</h4>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>• Strongest area: {skills.reduce((max, skill) => skill.level > max.level ? skill : max).name}</p>
            <p>• Focus area: {skills.reduce((min, skill) => skill.level < min.level ? skill : min).name}</p>
            <p>• {skills.filter(s => s.level >= 60).length} skills at advanced level</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}