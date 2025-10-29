import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, Clock, TrendingUp } from "lucide-react";
import { LearningPath } from "./types";

interface PathSelectorProps {
  paths: LearningPath[];
  selectedPath: LearningPath;
  onPathChange: (pathId: string) => void;
}

export function PathSelector({ paths, selectedPath, onPathChange }: PathSelectorProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'advanced': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  // Mock progress data
  const getProgress = (pathId: string) => {
    const progressMap = {
      'fullstack': 68,
      'datascience': 32
    };
    return progressMap[pathId as keyof typeof progressMap] || 0;
  };

  return (
    <div className="space-y-4">
      {/* Active Path */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-foreground">Current Learning Path</h2>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Create Custom Path
          </Button>
        </div>
        
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-semibold text-foreground">{selectedPath.title}</h3>
                  <Badge className={getDifficultyColor(selectedPath.difficulty)}>
                    {selectedPath.difficulty}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{selectedPath.description}</p>
                
                <div className="flex items-center space-x-6 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    {selectedPath.estimatedDuration}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {getProgress(selectedPath.id)}% complete
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{getProgress(selectedPath.id)}%</span>
                  </div>
                  <Progress value={getProgress(selectedPath.id)} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alternative Paths */}
      <div className="space-y-3">
        <h3 className="text-md font-medium text-foreground">Available Learning Paths</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paths.filter(path => path.id !== selectedPath.id).map((path) => (
            <Card 
              key={path.id} 
              className="cursor-pointer hover:shadow-md transition-all hover:border-primary/30"
              onClick={() => onPathChange(path.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-foreground">{path.title}</h4>
                  <Badge className={getDifficultyColor(path.difficulty)} variant="secondary">
                    {path.difficulty}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{path.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    {path.estimatedDuration}
                  </div>
                  <Button size="sm" variant="ghost">
                    Switch Path
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}