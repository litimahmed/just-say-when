export interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: string;
  nodes: LearningNode[];
  connections: PathConnection[];
}

export interface LearningNode {
  id: string;
  title: string;
  type: 'foundation' | 'core' | 'specialization' | 'project' | 'assessment';
  status: 'completed' | 'current' | 'available' | 'locked' | 'bonus';
  position: { x: number; y: number };
  skills: string[];
  estimatedHours: number;
  prerequisites: string[];
  resources: Resource[];
  description?: string;
}

export interface PathConnection {
  id: string;
  source: string;
  target: string;
  type: 'required' | 'optional' | 'recommended';
}

export interface Resource {
  id: string;
  title: string;
  type: 'video' | 'article' | 'exercise' | 'project';
  url: string;
  duration?: string;
}

export interface NodeFilters {
  showCompleted: boolean;
  showOptional: boolean;
  showAssessments: boolean;
}