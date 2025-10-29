import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Circle, 
  Lock, 
  Play, 
  Star, 
  Hexagon,
  Square,
  Triangle,
  Shield,
  Gift
} from 'lucide-react';

interface RoadmapNodeProps {
  data: {
    title: string;
    type: 'foundation' | 'core' | 'specialization' | 'project' | 'assessment' | 'bonus';
    status: 'completed' | 'current' | 'available' | 'locked' | 'bonus';
    skills: string[];
    estimatedHours: number;
    prerequisites: string[];
    resources: any[];
    onClick?: () => void;
  };
}

export const RoadmapNode = memo(({ data }: RoadmapNodeProps) => {
  const getNodeIcon = () => {
    switch (data.type) {
      case 'foundation':
        return Circle;
      case 'core':
        return Hexagon;
      case 'specialization':
        return Triangle;
      case 'project':
        return Star;
      case 'assessment':
        return Shield;
      case 'bonus':
        return Gift;
      default:
        return Circle;
    }
  };

  const getStatusIcon = () => {
    switch (data.status) {
      case 'completed':
        return CheckCircle;
      case 'current':
        return Play;
      case 'locked':
        return Lock;
      default:
        return Circle;
    }
  };

  const getNodeStyles = () => {
    const baseStyles = "relative rounded-lg border-2 p-4 min-w-[200px] cursor-pointer transition-all duration-200 hover:shadow-lg";
    
    switch (data.status) {
      case 'completed':
        return `${baseStyles} bg-green-50 border-green-500 text-green-900 dark:bg-green-900/20 dark:border-green-400 dark:text-green-100`;
      case 'current':
        return `${baseStyles} bg-primary/10 border-primary text-primary-foreground ring-2 ring-primary/20 animate-pulse`;
      case 'available':
        return `${baseStyles} bg-card border-border text-foreground hover:border-primary/50`;
      case 'locked':
        return `${baseStyles} bg-muted/30 border-muted text-muted-foreground opacity-60 cursor-not-allowed`;
      case 'bonus':
        return `${baseStyles} bg-purple-50 border-purple-400 text-purple-900 dark:bg-purple-900/20 dark:border-purple-400 dark:text-purple-100`;
      default:
        return `${baseStyles} bg-card border-border text-foreground`;
    }
  };

  const getIconStyles = () => {
    switch (data.status) {
      case 'completed':
        return "text-green-600 dark:text-green-400";
      case 'current':
        return "text-primary";
      case 'available':
        return "text-muted-foreground";
      case 'locked':
        return "text-muted-foreground";
      case 'bonus':
        return "text-purple-600 dark:text-purple-400";
      default:
        return "text-muted-foreground";
    }
  };

  const NodeIcon = getNodeIcon();
  const StatusIcon = getStatusIcon();

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-primary border-2 border-background"
      />
      
      <div 
        className={getNodeStyles()}
        onClick={data.onClick}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <NodeIcon className={`w-5 h-5 ${getIconStyles()}`} />
            <h3 className="font-semibold text-sm leading-tight">{data.title}</h3>
          </div>
          <StatusIcon className={`w-4 h-4 ${getIconStyles()}`} />
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 mb-3">
          {data.skills.slice(0, 3).map((skill, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-xs px-2 py-0.5"
            >
              {skill}
            </Badge>
          ))}
          {data.skills.length > 3 && (
            <Badge variant="outline" className="text-xs px-2 py-0.5">
              +{data.skills.length - 3}
            </Badge>
          )}
        </div>

        {/* Metadata */}
        <div className="text-xs text-muted-foreground">
          <p>{data.estimatedHours}h • {data.type}</p>
        </div>

        {/* Progress indicator for current node */}
        {data.status === 'current' && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-ping" />
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-primary border-2 border-background"
      />
    </>
  );
});

RoadmapNode.displayName = 'RoadmapNode';