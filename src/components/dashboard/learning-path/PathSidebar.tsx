import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  ChevronRight, 
  CheckCircle, 
  Circle, 
  Play,
  Lock,
  Star,
  Target
} from "lucide-react";
import { LearningPath } from "./types";

interface PathSidebarProps {
  selectedPath: LearningPath;
  onNodeSelect: (nodeId: string) => void;
}

// Mock data for sidebar
const sidebarData = {
  phases: [
    {
      id: 'foundations',
      title: 'Foundations',
      progress: 100,
      nodes: [
        { id: '1', title: 'HTML Fundamentals', status: 'completed' },
        { id: '2', title: 'CSS Essentials', status: 'completed' }
      ]
    },
    {
      id: 'core',
      title: 'Core Skills',
      progress: 33,
      nodes: [
        { id: '3', title: 'JavaScript Basics', status: 'current' },
        { id: '4', title: 'React Fundamentals', status: 'available' },
        { id: '5', title: 'Node.js Basics', status: 'available' }
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced Topics',
      progress: 0,
      nodes: [
        { id: '6', title: 'Database Design', status: 'locked' },
        { id: '7', title: 'Full Stack Project', status: 'locked' }
      ]
    }
  ],
  overallProgress: 68,
  nextMilestone: 'React Fundamentals'
};

export function PathSidebar({ selectedPath, onNodeSelect }: PathSidebarProps) {
  const [expandedPhases, setExpandedPhases] = useState<string[]>(['core']);

  const togglePhase = (phaseId: string) => {
    setExpandedPhases(prev => 
      prev.includes(phaseId) 
        ? prev.filter(id => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'current':
        return <Play className="w-4 h-4 text-primary" />;
      case 'available':
        return <Circle className="w-4 h-4 text-muted-foreground" />;
      case 'locked':
        return <Lock className="w-4 h-4 text-muted-foreground" />;
      default:
        return <Circle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-700 dark:text-green-400';
      case 'current':
        return 'text-primary font-medium';
      case 'available':
        return 'text-foreground hover:text-primary';
      case 'locked':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Overall Progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <Target className="w-5 h-5 mr-2 text-primary" />
            Progress Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Overall Completion</span>
              <span className="font-medium">{sidebarData.overallProgress}%</span>
            </div>
            <Progress value={sidebarData.overallProgress} className="h-2" />
          </div>
          
          <div className="p-3 bg-primary/10 rounded-lg">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-primary mr-2" />
              <div className="text-sm">
                <p className="font-medium text-foreground">Next Milestone</p>
                <p className="text-muted-foreground">{sidebarData.nextMilestone}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Path Navigation */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Path Navigation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {sidebarData.phases.map((phase) => {
            const isExpanded = expandedPhases.includes(phase.id);
            
            return (
              <div key={phase.id} className="space-y-2">
                {/* Phase Header */}
                <Button
                  variant="ghost"
                  className="w-full justify-start p-2 h-auto"
                  onClick={() => togglePhase(phase.id)}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 mr-2" />
                      ) : (
                        <ChevronRight className="w-4 h-4 mr-2" />
                      )}
                      <span className="font-medium">{phase.title}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {phase.progress}%
                      </Badge>
                    </div>
                  </div>
                </Button>

                {/* Phase Progress */}
                <div className="px-6">
                  <Progress value={phase.progress} className="h-1.5" />
                </div>

                {/* Phase Nodes */}
                {isExpanded && (
                  <div className="pl-6 space-y-1">
                    {phase.nodes.map((node) => (
                      <Button
                        key={node.id}
                        variant="ghost"
                        className="w-full justify-start p-2 h-auto text-sm"
                        onClick={() => onNodeSelect(node.id)}
                        disabled={node.status === 'locked'}
                      >
                        <div className="flex items-center">
                          {getStatusIcon(node.status)}
                          <span className={`ml-2 ${getStatusColor(node.status)}`}>
                            {node.title}
                          </span>
                        </div>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button size="sm" className="w-full">
            Continue Learning
          </Button>
          <Button size="sm" variant="outline" className="w-full">
            Take Assessment
          </Button>
          <Button size="sm" variant="ghost" className="w-full">
            View Resources
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}