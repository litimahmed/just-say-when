import { useState } from "react";
import { Card } from "@/components/ui/card";
import { PathSelector } from "./PathSelector";
import { StructuredRoadmap } from "./StructuredRoadmap";
import { PathControls } from "./PathControls";
import { PathSidebar } from "./PathSidebar";
import { NodeModal } from "./NodeModal";
import { SkillsRadar } from "./SkillsRadar";
import { LearningNode, LearningPath } from "./types";

// Sample learning paths data
const samplePaths: LearningPath[] = [
  {
    id: "fullstack",
    title: "Full Stack Web Development",
    description: "Master modern web development with React, Node.js, and databases",
    difficulty: "intermediate",
    estimatedDuration: "6 months",
    nodes: [],
    connections: []
  },
  {
    id: "datascience",
    title: "Data Science Fundamentals", 
    description: "Learn data analysis, visualization, and machine learning basics",
    difficulty: "beginner",
    estimatedDuration: "4 months", 
    nodes: [],
    connections: []
  }
];

export function LearningPathRoadmap() {
  const [selectedPath, setSelectedPath] = useState<LearningPath>(samplePaths[0]);
  const [selectedNode, setSelectedNode] = useState<LearningNode | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filters, setFilters] = useState({
    showCompleted: true,
    showOptional: true,
    showAssessments: true
  });

  const handleNodeClick = (node: LearningNode) => {
    setSelectedNode(node);
    setShowModal(true);
  };

  const handlePathChange = (pathId: string) => {
    const path = samplePaths.find(p => p.id === pathId);
    if (path) {
      setSelectedPath(path);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-foreground">Learning Path</h1>
              <p className="text-muted-foreground mt-2">Follow your personalized roadmap to mastery</p>
            </div>
            <PathControls
              filters={filters}
              onFiltersChange={setFilters}
              sidebarOpen={sidebarOpen}
              onSidebarToggle={setSidebarOpen}
            />
          </div>
          <PathSelector
            paths={samplePaths}
            selectedPath={selectedPath}
            onPathChange={handlePathChange}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-80 border-r border-border bg-card/30 backdrop-blur-sm">
            <PathSidebar 
              selectedPath={selectedPath}
              onNodeSelect={(nodeId) => {
                // Handle navigation to node
              }}
            />
          </div>
        )}

        {/* Structured Roadmap */}
        <div className="flex-1 relative overflow-y-auto max-h-screen">
          <StructuredRoadmap
            onNodeClick={handleNodeClick}
          />
        </div>

        {/* Right Panel */}
        <div className="w-80 border-l border-border bg-card/30 backdrop-blur-sm p-6 space-y-6">
          <SkillsRadar selectedPath={selectedPath} />
          
          {selectedNode && (
            <Card className="p-4">
              <h3 className="font-semibold text-foreground mb-2">{selectedNode.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">Click for detailed information</p>
              <div className="text-xs text-muted-foreground">
                <p>Estimated: {selectedNode.estimatedHours} hours</p>
                <p>Skills: {selectedNode.skills.join(", ")}</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedNode && (
        <NodeModal
          node={selectedNode}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}