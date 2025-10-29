import { useState } from "react";
import { AssignmentCard } from "./AssignmentCard";
import { AssignmentStatus, AssignmentType, Assignment } from "./AssignmentsPage";

interface AssignmentsListProps {
  viewMode: "list" | "grid";
  filterStatus: AssignmentStatus | "all";
  filterType: AssignmentType | "all";
  searchQuery: string;
  onAssignmentClick: (assignment: Assignment) => void;
}

// Mock data for demonstration
const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "React Component Architecture Essay",
    description: "Write a comprehensive analysis of React component patterns and best practices",
    course: "Advanced Web Development",
    courseColor: "blue",
    type: "essay",
    status: "upcoming",
    dueDate: new Date("2024-09-15"),
    maxGrade: 100,
    instructor: "Dr. Sarah Johnson",
    requirements: ["Minimum 2000 words", "At least 5 references", "APA format"],
    submissionType: "file",
    allowLateSubmission: true
  },
  {
    id: "2",
    title: "JavaScript Fundamentals Quiz",
    description: "Test your knowledge of ES6+ features, async programming, and DOM manipulation",
    course: "JavaScript Essentials",
    courseColor: "green",
    type: "quiz",
    status: "in-progress",
    dueDate: new Date("2024-09-10"),
    maxGrade: 50,
    instructor: "Prof. Michael Chen",
    requirements: ["45 minutes time limit", "Multiple attempts allowed"],
    submissionType: "multiple",
    allowLateSubmission: false
  },
  {
    id: "3",
    title: "E-commerce Website Project",
    description: "Build a full-stack e-commerce application using React, Node.js, and MongoDB",
    course: "Full Stack Development",
    courseColor: "purple",
    type: "project",
    status: "submitted",
    dueDate: new Date("2024-09-05"),
    submittedDate: new Date("2024-09-04"),
    maxGrade: 150,
    instructor: "Dr. Emily Rodriguez",
    requirements: ["GitHub repository", "Live deployment", "Documentation"],
    submissionType: "link",
    allowLateSubmission: true
  },
  {
    id: "4",
    title: "UI/UX Design Principles Presentation",
    description: "Present modern design principles and demonstrate with real-world examples",
    course: "Design Systems",
    courseColor: "pink",
    type: "presentation",
    status: "graded",
    dueDate: new Date("2024-08-30"),
    submittedDate: new Date("2024-08-29"),
    grade: 92,
    maxGrade: 100,
    instructor: "Prof. Alex Kim",
    requirements: ["15-minute presentation", "Slide deck", "Interactive demo"],
    feedback: "Excellent presentation! Great use of examples and clear explanations.",
    submissionType: "file",
    allowLateSubmission: false
  },
  {
    id: "5",
    title: "Database Normalization Lab",
    description: "Practice database design and normalization techniques",
    course: "Database Systems",
    courseColor: "orange",
    type: "lab",
    status: "overdue",
    dueDate: new Date("2024-09-01"),
    maxGrade: 75,
    instructor: "Dr. Robert Singh",
    requirements: ["SQL scripts", "ER diagrams", "Report"],
    submissionType: "multiple",
    allowLateSubmission: true
  },
  {
    id: "6",
    title: "Algorithm Complexity Analysis",
    description: "Analyze time and space complexity of various sorting algorithms",
    course: "Data Structures & Algorithms",
    courseColor: "red",
    type: "homework",
    status: "upcoming",
    dueDate: new Date("2024-09-20"),
    maxGrade: 80,
    instructor: "Prof. Lisa Wang",
    requirements: ["Mathematical proofs", "Code examples", "Comparative analysis"],
    submissionType: "file",
    allowLateSubmission: false
  }
];

export function AssignmentsList({
  viewMode,
  filterStatus,
  filterType,
  searchQuery,
  onAssignmentClick
}: AssignmentsListProps) {
  
  const filteredAssignments = mockAssignments.filter(assignment => {
    const matchesStatus = filterStatus === "all" || assignment.status === filterStatus;
    const matchesType = filterType === "all" || assignment.type === filterType;
    const matchesSearch = searchQuery === "" || 
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesType && matchesSearch;
  });

  const sortedAssignments = [...filteredAssignments].sort((a, b) => {
    // Sort by due date, with overdue items first
    if (a.status === "overdue" && b.status !== "overdue") return -1;
    if (b.status === "overdue" && a.status !== "overdue") return 1;
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  if (sortedAssignments.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <span className="text-2xl text-muted-foreground">📝</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No assignments found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or search query to find assignments.
        </p>
      </div>
    );
  }

  return (
    <div className={`
      ${viewMode === "grid" 
        ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
        : "space-y-4"
      }
    `}>
      {sortedAssignments.map((assignment) => (
        <AssignmentCard
          key={assignment.id}
          assignment={assignment}
          viewMode={viewMode}
          onClick={() => onAssignmentClick(assignment)}
        />
      ))}
    </div>
  );
}