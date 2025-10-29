import { useState } from "react";
import { AssignmentsHeader } from "./AssignmentsHeader";
import { AssignmentsList } from "./AssignmentsList";
import { AssignmentFilters } from "./AssignmentFilters";
import { AssignmentModal } from "./AssignmentModal";

export type AssignmentStatus = "upcoming" | "in-progress" | "submitted" | "graded" | "overdue";
export type AssignmentType = "essay" | "quiz" | "project" | "presentation" | "lab" | "homework";

export interface Assignment {
  id: string;
  title: string;
  description: string;
  course: string;
  courseColor: string;
  type: AssignmentType;
  status: AssignmentStatus;
  dueDate: Date;
  submittedDate?: Date;
  grade?: number;
  maxGrade: number;
  instructor: string;
  requirements: string[];
  attachments?: string[];
  feedback?: string;
  submissionType: "file" | "text" | "link" | "multiple";
  allowLateSubmission: boolean;
}

export function AssignmentsPage() {
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [filterStatus, setFilterStatus] = useState<AssignmentStatus | "all">("all");
  const [filterType, setFilterType] = useState<AssignmentType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <AssignmentsHeader 
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <AssignmentFilters
            filterStatus={filterStatus}
            onFilterStatusChange={setFilterStatus}
            filterType={filterType}
            onFilterTypeChange={setFilterType}
          />
        </div>
        
        <div className="lg:col-span-3">
          <AssignmentsList
            viewMode={viewMode}
            filterStatus={filterStatus}
            filterType={filterType}
            searchQuery={searchQuery}
            onAssignmentClick={setSelectedAssignment}
          />
        </div>
      </div>

      {selectedAssignment && (
        <AssignmentModal
          assignment={selectedAssignment}
          isOpen={!!selectedAssignment}
          onClose={() => setSelectedAssignment(null)}
        />
      )}
    </div>
  );
}