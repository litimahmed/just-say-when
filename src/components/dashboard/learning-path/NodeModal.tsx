import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  BookOpen, 
  Play, 
  ExternalLink,
  CheckCircle,
  Users,
  Star
} from "lucide-react";
import { LearningNode } from "./types";

interface NodeModalProps {
  node: LearningNode;
  isOpen: boolean;
  onClose: () => void;
}

export function NodeModal({ node, isOpen, onClose }: NodeModalProps) {
  // Mock additional data
  const mockData = {
    description: "Master the fundamentals of JavaScript including variables, functions, objects, and modern ES6+ features. This comprehensive course covers everything you need to build interactive web applications.",
    progress: node.status === 'completed' ? 100 : node.status === 'current' ? 67 : 0,
    rating: 4.8,
    students: 12453,
    resources: [
      { id: '1', title: 'Introduction to JavaScript', type: 'video', duration: '15 min' },
      { id: '2', title: 'Variables and Data Types', type: 'video', duration: '22 min' },
      { id: '3', title: 'Functions Deep Dive', type: 'article', duration: '10 min read' },
      { id: '4', title: 'Practice: Build a Calculator', type: 'exercise', duration: '45 min' }
    ],
    prerequisites: ['HTML Fundamentals', 'CSS Essentials'],
    nextTopics: ['React Fundamentals', 'Node.js Basics']
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'current':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'available':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'foundation':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'core':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400';
      case 'project':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">{node.title}</DialogTitle>
              <div className="flex items-center space-x-2 mb-3">
                <Badge className={getStatusColor(node.status)}>
                  {node.status}
                </Badge>
                <Badge className={getTypeColor(node.type)}>
                  {node.type}
                </Badge>
              </div>
            </div>
          </div>
          <DialogDescription className="text-base leading-relaxed">
            {mockData.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Section */}
          {node.status === 'current' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Your Progress</h3>
                <span className="text-sm font-medium">{mockData.progress}%</span>
              </div>
              <Progress value={mockData.progress} className="h-2" />
              <p className="text-sm text-muted-foreground">
                Keep going! You're {mockData.progress}% through this topic.
              </p>
            </div>
          )}

          {/* Course Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-card rounded-lg border">
              <Clock className="w-5 h-5 mx-auto mb-1 text-primary" />
              <p className="text-sm font-medium">{node.estimatedHours}h</p>
              <p className="text-xs text-muted-foreground">Duration</p>
            </div>
            <div className="text-center p-3 bg-card rounded-lg border">
              <Users className="w-5 h-5 mx-auto mb-1 text-primary" />
              <p className="text-sm font-medium">{mockData.students.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Students</p>
            </div>
            <div className="text-center p-3 bg-card rounded-lg border">
              <Star className="w-5 h-5 mx-auto mb-1 text-primary" />
              <p className="text-sm font-medium">{mockData.rating}</p>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
            <div className="text-center p-3 bg-card rounded-lg border">
              <BookOpen className="w-5 h-5 mx-auto mb-1 text-primary" />
              <p className="text-sm font-medium">{mockData.resources.length}</p>
              <p className="text-xs text-muted-foreground">Resources</p>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="font-semibold mb-3">Skills You'll Learn</h3>
            <div className="flex flex-wrap gap-2">
              {node.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Prerequisites */}
          {mockData.prerequisites.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Prerequisites</h3>
              <div className="space-y-2">
                {mockData.prerequisites.map((prereq, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    {prereq}
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Learning Resources */}
          <div>
            <h3 className="font-semibold mb-3">Learning Resources</h3>
            <div className="space-y-2">
              {mockData.resources.map((resource) => (
                <div 
                  key={resource.id} 
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 text-primary mr-3" />
                    <div>
                      <p className="font-medium text-sm">{resource.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {resource.type} • {resource.duration}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* What's Next */}
          <div>
            <h3 className="font-semibold mb-3">What's Next</h3>
            <div className="space-y-2">
              {mockData.nextTopics.map((topic, index) => (
                <div key={index} className="flex items-center text-sm">
                  <Play className="w-4 h-4 text-blue-500 mr-2" />
                  {topic}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            {node.status === 'available' && (
              <Button className="flex-1">
                <Play className="w-4 h-4 mr-2" />
                Start Learning
              </Button>
            )}
            {node.status === 'current' && (
              <Button className="flex-1">
                <Play className="w-4 h-4 mr-2" />
                Continue Learning
              </Button>
            )}
            {node.status === 'completed' && (
              <Button variant="outline" className="flex-1">
                <BookOpen className="w-4 h-4 mr-2" />
                Review Content
              </Button>
            )}
            <Button variant="outline">
              <BookOpen className="w-4 h-4 mr-2" />
              View Resources
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}