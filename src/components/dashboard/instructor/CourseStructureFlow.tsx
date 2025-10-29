import { useCallback } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface Section {
  id: string;
  title: string;
  description: string;
  lessons: any[];
  isExpanded: boolean;
}

interface CourseStructureFlowProps {
  sections: Section[];
}

const generateNodes = (sections: Section[]): Node[] => {
  const nodes: Node[] = [];
  
  // Start node - elegant design
  nodes.push({
    id: 'start',
    type: 'input',
    position: { x: 250, y: 0 },
    data: { label: 'Course Start' },
    style: { 
      background: 'hsl(var(--background))',
      color: 'hsl(var(--foreground))',
      border: '2px solid hsl(var(--primary))',
      borderRadius: '16px',
      padding: '12px 20px',
      fontSize: '14px',
      fontWeight: '500',
      minWidth: '140px',
      boxShadow: '0 4px 12px hsl(var(--primary) / 0.15)',
    }
  });

  // Section nodes - refined design
  sections.forEach((section, index) => {
    const sectionY = 140 + (index * 220);
    
    // Section header node
    nodes.push({
      id: section.id,
      position: { x: 50, y: sectionY },
      data: { 
        label: section.title || `Section ${index + 1}`,
      },
      style: {
        background: 'hsl(var(--card))',
        color: 'hsl(var(--card-foreground))',
        border: '1px solid hsl(var(--border))',
        borderRadius: '12px',
        padding: '16px 20px',
        fontSize: '13px',
        fontWeight: '600',
        minWidth: '180px',
        boxShadow: '0 2px 8px hsl(var(--muted) / 0.4)',
      }
    });

    // Lesson nodes - clean professional design
    section.lessons.forEach((lesson, lessonIndex) => {
      nodes.push({
        id: lesson.id,
        position: { x: 320 + (lessonIndex * 220), y: sectionY },
        data: { 
          label: lesson.title || `Lesson ${lessonIndex + 1}`,
        },
        style: {
          background: 'hsl(var(--background))',
          color: 'hsl(var(--muted-foreground))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '8px',
          padding: '10px 16px',
          fontSize: '12px',
          fontWeight: '500',
          minWidth: '120px',
          boxShadow: '0 1px 4px hsl(var(--muted) / 0.2)',
        }
      });
    });
  });

  // End node - completion design
  if (sections.length > 0) {
    nodes.push({
      id: 'end',
      type: 'output',
      position: { x: 250, y: 140 + (sections.length * 220) },
      data: { label: 'Course Complete' },
      style: { 
        background: 'hsl(var(--background))',
        color: 'hsl(var(--foreground))',
        border: '2px solid hsl(var(--success))',
        borderRadius: '16px',
        padding: '12px 20px',
        fontSize: '14px',
        fontWeight: '500',
        minWidth: '140px',
        boxShadow: '0 4px 12px hsl(var(--success) / 0.15)',
      }
    });
  }

  return nodes;
};

const generateEdges = (sections: Section[]): Edge[] => {
  const edges: Edge[] = [];
  
  if (sections.length === 0) return edges;

  // Connect start to first section
  edges.push({
    id: 'e-start-first',
    source: 'start',
    target: sections[0].id,
    animated: true,
    style: { stroke: 'hsl(var(--primary))', strokeWidth: 2, strokeDasharray: '8,4' }
  });

  sections.forEach((section, index) => {
    // Connect section to ONLY the first lesson (cleaner hierarchy)
    if (section.lessons.length > 0) {
      edges.push({
        id: `e-section-${section.id}-lesson-${section.lessons[0].id}`,
        source: section.id,
        target: section.lessons[0].id,
        style: { 
          stroke: 'hsl(var(--primary))', 
          strokeWidth: 2,
          strokeOpacity: 0.8
        }
      });
    }

    // Connect lessons within section in linear sequence (clear progression)
    section.lessons.forEach((lesson, lessonIndex) => {
      if (lessonIndex > 0) {
        edges.push({
          id: `e-lesson-${section.lessons[lessonIndex - 1].id}-${lesson.id}`,
          source: section.lessons[lessonIndex - 1].id,
          target: lesson.id,
          style: { 
            stroke: 'hsl(var(--accent-foreground))', 
            strokeWidth: 2,
            strokeOpacity: 0.7
          }
        });
      }
    });

    // Connect sections - from section to next section (cleaner hierarchy)
    if (index < sections.length - 1) {
      edges.push({
        id: `e-section-${section.id}-next`,
        source: section.id,
        target: sections[index + 1].id,
        animated: true,
        style: { 
          stroke: 'hsl(var(--primary))', 
          strokeWidth: 2,
          strokeDasharray: '8,4'
        }
      });
    }

    // Connect last section to end
    if (index === sections.length - 1) {
      edges.push({
        id: 'e-last-end',
        source: section.id,
        target: 'end',
        animated: true,
        style: { 
          stroke: 'hsl(var(--success))', 
          strokeWidth: 2,
          strokeDasharray: '8,4'
        }
      });
    }
  });

  return edges;
};

export function CourseStructureFlow({ sections }: CourseStructureFlowProps) {
  const initialNodes = generateNodes(sections);
  const initialEdges = generateEdges(sections);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Update nodes and edges when sections change
  const updatedNodes = generateNodes(sections);
  const updatedEdges = generateEdges(sections);
  
  if (JSON.stringify(nodes) !== JSON.stringify(updatedNodes)) {
    setNodes(updatedNodes);
    setEdges(updatedEdges);
  }

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        className="bg-background"
        proOptions={{ hideAttribution: true }}
      >
        <Controls className="!bg-card !border-border !shadow-lg [&_button]:!bg-background [&_button]:!border-border [&_button]:!text-foreground" />
        <Background 
          color="hsl(var(--muted-foreground) / 0.1)" 
          gap={20} 
          size={1}
        />
      </ReactFlow>
    </div>
  );
}