import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { RoadmapNode } from './RoadmapNode';
import { LearningPath, NodeFilters } from './types';

// Sample roadmap data for Full Stack Development
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'roadmapNode',
    position: { x: 400, y: 50 },
    data: {
      title: 'HTML Fundamentals',
      type: 'foundation',
      status: 'completed',
      skills: ['HTML', 'Semantic Markup'],
      estimatedHours: 15,
      prerequisites: [],
      resources: []
    }
  },
  {
    id: '2',
    type: 'roadmapNode',
    position: { x: 400, y: 150 },
    data: {
      title: 'CSS Essentials',
      type: 'foundation',
      status: 'completed',
      skills: ['CSS', 'Flexbox', 'Grid'],
      estimatedHours: 25,
      prerequisites: ['1'],
      resources: []
    }
  },
  {
    id: '3',
    type: 'roadmapNode',
    position: { x: 400, y: 250 },
    data: {
      title: 'JavaScript Basics',
      type: 'foundation',
      status: 'current',
      skills: ['JavaScript', 'ES6+', 'DOM'],
      estimatedHours: 40,
      prerequisites: ['1', '2'],
      resources: []
    }
  },
  {
    id: '4',
    type: 'roadmapNode',
    position: { x: 200, y: 350 },
    data: {
      title: 'React Fundamentals',
      type: 'core',
      status: 'available',
      skills: ['React', 'Components', 'State'],
      estimatedHours: 35,
      prerequisites: ['3'],
      resources: []
    }
  },
  {
    id: '5',
    type: 'roadmapNode',
    position: { x: 600, y: 350 },
    data: {
      title: 'Node.js Basics',
      type: 'core',
      status: 'available',
      skills: ['Node.js', 'Express', 'APIs'],
      estimatedHours: 30,
      prerequisites: ['3'],
      resources: []
    }
  },
  {
    id: '6',
    type: 'roadmapNode',
    position: { x: 400, y: 450 },
    data: {
      title: 'Database Design',
      type: 'core',
      status: 'locked',
      skills: ['SQL', 'MongoDB', 'Database Design'],
      estimatedHours: 25,
      prerequisites: ['5'],
      resources: []
    }
  },
  {
    id: '7',
    type: 'roadmapNode',
    position: { x: 400, y: 550 },
    data: {
      title: 'Full Stack Project',
      type: 'project',
      status: 'locked',
      skills: ['Full Stack', 'Deployment', 'Testing'],
      estimatedHours: 60,
      prerequisites: ['4', '5', '6'],
      resources: []
    }
  },
  {
    id: '8',
    type: 'roadmapNode',
    position: { x: 100, y: 350 },
    data: {
      title: 'TypeScript',
      type: 'bonus',
      status: 'available',
      skills: ['TypeScript', 'Static Typing'],
      estimatedHours: 20,
      prerequisites: ['3'],
      resources: []
    }
  }
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
    animated: false,
    style: { stroke: 'hsl(var(--primary))' }
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    type: 'smoothstep',
    animated: true,
    style: { stroke: 'hsl(var(--primary))' }
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    type: 'smoothstep',
    style: { stroke: 'hsl(var(--muted-foreground))' }
  },
  {
    id: 'e3-5',
    source: '3',
    target: '5',
    type: 'smoothstep',
    style: { stroke: 'hsl(var(--muted-foreground))' }
  },
  {
    id: 'e3-8',
    source: '3',
    target: '8',
    type: 'smoothstep',
    style: { stroke: 'hsl(var(--muted-foreground))', strokeDasharray: '5,5' }
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    type: 'smoothstep',
    style: { stroke: 'hsl(var(--muted-foreground))' }
  },
  {
    id: 'e4-7',
    source: '4',
    target: '7',
    type: 'smoothstep',
    style: { stroke: 'hsl(var(--muted-foreground))' }
  },
  {
    id: 'e6-7',
    source: '6',
    target: '7',
    type: 'smoothstep',
    style: { stroke: 'hsl(var(--muted-foreground))' }
  }
];

const nodeTypes = {
  roadmapNode: RoadmapNode
};

interface RoadmapCanvasProps {
  learningPath: LearningPath;
  filters: NodeFilters;
  onNodeClick: (node: any) => void;
}

export function RoadmapCanvas({ learningPath, filters, onNodeClick }: RoadmapCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => {
      // Handle new connections if needed
    },
    []
  );

  // Filter nodes based on filters
  const filteredNodes = useMemo(() => {
    return nodes.filter(node => {
      const nodeData = node.data;
      
      if (!filters.showCompleted && nodeData.status === 'completed') {
        return false;
      }
      if (!filters.showOptional && nodeData.type === 'bonus') {
        return false;
      }
      if (!filters.showAssessments && nodeData.type === 'assessment') {
        return false;
      }
      
      return true;
    });
  }, [nodes, filters]);

  // Update node data to include click handler
  const nodesWithHandlers = useMemo(() => {
    return filteredNodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        onClick: () => onNodeClick(node.data)
      }
    }));
  }, [filteredNodes, onNodeClick]);

  return (
    <div className="h-screen bg-background">
      <ReactFlow
        nodes={nodesWithHandlers}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        className="bg-background"
        minZoom={0.2}
        maxZoom={2}
      >
        <Background 
          color="hsl(var(--muted-foreground))" 
          size={1}
          style={{ opacity: 0.1 }}
        />
        <Controls 
          className="bg-card border border-border shadow-lg"
          showZoom={true}
          showFitView={true}
          showInteractive={false}
        />
        <MiniMap
          nodeStrokeColor="hsl(var(--border))"
          nodeColor="hsl(var(--muted))"
          nodeBorderRadius={8}
          className="bg-card/80 backdrop-blur-sm border border-border"
          style={{ backgroundColor: 'hsl(var(--card))' }}
        />
      </ReactFlow>
    </div>
  );
}