import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Circle, 
  Lock, 
  Play, 
  Star,
  Clock,
  ArrowDown,
  BookOpen
} from "lucide-react";
import { LearningNode } from "./types";

interface StructuredRoadmapProps {
  onNodeClick: (node: LearningNode) => void;
}

// Structured roadmap data with phases
const roadmapData = {
  phases: [
    {
      id: 'foundations',
      title: 'Foundations',
      description: 'Build your fundamental skills',
      progress: 100,
      nodes: [
        {
          id: '1',
          title: 'HTML Fundamentals',
          type: 'foundation' as const,
          status: 'completed' as const,
          skills: ['HTML', 'Semantic Markup', 'Accessibility'],
          estimatedHours: 15,
          prerequisites: [],
          resources: [],
          description: 'Learn the building blocks of the web'
        },
        {
          id: '2',
          title: 'CSS Essentials',
          type: 'foundation' as const,
          status: 'completed' as const,
          skills: ['CSS', 'Flexbox', 'Grid', 'Responsive Design'],
          estimatedHours: 25,
          prerequisites: ['1'],
          resources: [],
          description: 'Master styling and layout techniques'
        }
      ]
    },
    {
      id: 'core',
      title: 'Core Development',
      description: 'Learn essential programming concepts',
      progress: 45,
      nodes: [
        {
          id: '3',
          title: 'JavaScript Fundamentals',
          type: 'core' as const,
          status: 'current' as const,
          skills: ['JavaScript', 'ES6+', 'DOM Manipulation', 'Async Programming'],
          estimatedHours: 40,
          prerequisites: ['1', '2'],
          resources: [],
          description: 'Master modern JavaScript programming'
        },
        {
          id: '4',
          title: 'Version Control (Git)',
          type: 'core' as const,
          status: 'available' as const,
          skills: ['Git', 'GitHub', 'Version Control', 'Collaboration'],
          estimatedHours: 12,
          prerequisites: ['3'],
          resources: [],
          description: 'Learn professional development workflow'
        }
      ]
    },
    {
      id: 'frameworks',
      title: 'Modern Frameworks',
      description: 'Build with popular libraries and frameworks',
      progress: 0,
      nodes: [
        {
          id: '5',
          title: 'React Fundamentals',
          type: 'specialization' as const,
          status: 'available' as const,
          skills: ['React', 'JSX', 'Components', 'State Management'],
          estimatedHours: 35,
          prerequisites: ['3', '4'],
          resources: [],
          description: 'Build interactive user interfaces'
        },
        {
          id: '6',
          title: 'Node.js & Express',
          type: 'specialization' as const,
          status: 'locked' as const,
          skills: ['Node.js', 'Express', 'REST APIs', 'Server Development'],
          estimatedHours: 30,
          prerequisites: ['3', '4'],
          resources: [],
          description: 'Create backend applications'
        }
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced Topics',
      description: 'Specialize in advanced concepts',
      progress: 0,
      nodes: [
        {
          id: '7',
          title: 'Database Integration',
          type: 'specialization' as const,
          status: 'locked' as const,
          skills: ['MongoDB', 'PostgreSQL', 'Database Design', 'ORMs'],
          estimatedHours: 25,
          prerequisites: ['6'],
          resources: [],
          description: 'Work with databases effectively'
        },
        {
          id: '8',
          title: 'Testing & Deployment',
          type: 'specialization' as const,
          status: 'locked' as const,
          skills: ['Jest', 'Testing', 'CI/CD', 'Docker', 'AWS'],
          estimatedHours: 20,
          prerequisites: ['5', '6'],
          resources: [],
          description: 'Ensure quality and deploy applications'
        }
      ]
    },
    {
      id: 'capstone',
      title: 'Capstone Project',
      description: 'Apply everything you\'ve learned',
      progress: 0,
      nodes: [
        {
          id: '9',
          title: 'Full Stack Portfolio Project',
          type: 'project' as const,
          status: 'locked' as const,
          skills: ['Full Stack Development', 'Project Management', 'Deployment'],
          estimatedHours: 60,
          prerequisites: ['5', '6', '7', '8'],
          resources: [],
          description: 'Build a complete application from scratch'
        }
      ]
    }
  ]
};

export function StructuredRoadmap({ onNodeClick }: StructuredRoadmapProps) {
  const [expandedPhase, setExpandedPhase] = useState<string>('core');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'current':
        return <Play className="w-5 h-5 text-primary animate-pulse" />;
      case 'available':
        return <Circle className="w-5 h-5 text-blue-400" />;
      case 'locked':
        return <Lock className="w-5 h-5 text-muted-foreground" />;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getNodeStyles = (status: string, type: string) => {
    const baseStyles = "relative p-6 border-2 rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer";
    
    switch (status) {
      case 'completed':
        return `${baseStyles} bg-green-50 border-green-300 hover:border-green-400 dark:bg-green-900/10 dark:border-green-800`;
      case 'current':
        return `${baseStyles} bg-primary/10 border-primary ring-2 ring-primary/20 shadow-md`;
      case 'available':
        return `${baseStyles} bg-card border-blue-200 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/10`;
      case 'locked':
        return `${baseStyles} bg-muted/20 border-muted text-muted-foreground opacity-60 cursor-not-allowed`;
      default:
        return `${baseStyles} bg-card border-border`;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'project':
        return <Star className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Full Stack Development Roadmap</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Follow this structured path to become a full stack developer. Each phase builds upon the previous one.
        </p>
        <div className="flex justify-center">
          <Badge variant="secondary" className="px-4 py-2">
            5 Phases • 9 Topics • ~227 Hours
          </Badge>
        </div>
      </div>

      {/* Roadmap Timeline */}
      <div className="space-y-6">
        {roadmapData.phases.map((phase, phaseIndex) => (
          <div key={phase.id} className="relative">
            {/* Phase Header */}
            <div className="sticky top-4 z-10 mb-6">
              <Card className="bg-card/95 backdrop-blur-sm border-2">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                          {phaseIndex + 1}
                        </div>
                        <h2 className="text-xl font-semibold text-foreground">{phase.title}</h2>
                        <Badge variant="outline">{phase.nodes.length} topics</Badge>
                      </div>
                      <p className="text-muted-foreground">{phase.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground mb-2">Phase Progress</div>
                      <div className="w-32">
                        <Progress value={phase.progress} className="h-2" />
                      </div>
                      <div className="text-sm font-medium mt-1">{phase.progress}%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Phase Nodes */}
            <div className="space-y-4 ml-6 border-l-2 border-border/50 pl-8 relative">
              {/* Phase connector line */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />
              
              {phase.nodes.map((node, nodeIndex) => (
                <div key={node.id} className="relative">
                  {/* Node connector */}
                  <div className="absolute -left-[41px] top-6 w-2 h-2 rounded-full bg-border" />
                  
                  <Card 
                    className={getNodeStyles(node.status, node.type)}
                    onClick={() => node.status !== 'locked' && onNodeClick(node)}
                  >
                    <CardContent className="p-0">
                      <div className="flex items-start space-x-4">
                        {/* Status Icon */}
                        <div className="flex-shrink-0 mt-1">
                          {getStatusIcon(node.status)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                {getTypeIcon(node.type)}
                                <h3 className="font-semibold text-lg text-foreground">{node.title}</h3>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{node.description}</p>
                            </div>
                            <div className="text-right text-sm text-muted-foreground ml-4">
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {node.estimatedHours}h
                              </div>
                            </div>
                          </div>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {node.skills.slice(0, 4).map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {node.skills.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{node.skills.length - 4} more
                              </Badge>
                            )}
                          </div>

                          {/* Action Button */}
                          <div className="flex justify-between items-center">
                            <div className="text-xs text-muted-foreground">
                              {node.prerequisites.length > 0 && (
                                <span>Requires: {node.prerequisites.length} prerequisite{node.prerequisites.length > 1 ? 's' : ''}</span>
                              )}
                            </div>
                            {node.status !== 'locked' && (
                              <Button 
                                size="sm" 
                                variant={node.status === 'current' ? 'default' : 'outline'}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onNodeClick(node);
                                }}
                              >
                                {node.status === 'completed' ? 'Review' : 
                                 node.status === 'current' ? 'Continue' : 'Start'}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Connection to next node */}
                  {nodeIndex < phase.nodes.length - 1 && (
                    <div className="flex justify-center my-3">
                      <ArrowDown className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}

              {/* Connection to next phase */}
              {phaseIndex < roadmapData.phases.length - 1 && (
                <div className="flex justify-center py-6">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <div className="w-8 border-t border-border" />
                    <ArrowDown className="w-5 h-5" />
                    <div className="w-8 border-t border-border" />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Completion Badge */}
      <div className="text-center py-8">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full border">
          <Star className="w-5 h-5 text-primary" />
          <span className="font-medium">Complete the roadmap to become a Full Stack Developer!</span>
          <Star className="w-5 h-5 text-primary" />
        </div>
      </div>
    </div>
  );
}