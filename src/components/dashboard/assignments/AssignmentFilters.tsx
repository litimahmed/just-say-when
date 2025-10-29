import { AssignmentStatus, AssignmentType } from "./AssignmentsPage";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  CheckCircle, 
  Upload, 
  Star, 
  AlertTriangle,
  FileText,
  Presentation,
  Code,
  Microscope,
  BookOpen,
  HelpCircle
} from "lucide-react";

interface AssignmentFiltersProps {
  filterStatus: AssignmentStatus | "all";
  onFilterStatusChange: (status: AssignmentStatus | "all") => void;
  filterType: AssignmentType | "all";
  onFilterTypeChange: (type: AssignmentType | "all") => void;
}

export function AssignmentFilters({
  filterStatus,
  onFilterStatusChange,
  filterType,
  onFilterTypeChange
}: AssignmentFiltersProps) {
  
  const statusFilters = [
    { value: "all" as const, label: "All Status", count: 24, icon: null, color: "" },
    { value: "upcoming" as const, label: "Upcoming", count: 8, icon: Clock, color: "text-blue-600" },
    { value: "in-progress" as const, label: "In Progress", count: 5, icon: Upload, color: "text-yellow-600" },
    { value: "submitted" as const, label: "Submitted", count: 7, icon: CheckCircle, color: "text-green-600" },
    { value: "graded" as const, label: "Graded", count: 2, icon: Star, color: "text-purple-600" },
    { value: "overdue" as const, label: "Overdue", count: 2, icon: AlertTriangle, color: "text-red-600" },
  ];

  const typeFilters = [
    { value: "all" as const, label: "All Types", count: 24, icon: null },
    { value: "essay" as const, label: "Essays", count: 6, icon: FileText },
    { value: "quiz" as const, label: "Quizzes", count: 8, icon: HelpCircle },
    { value: "project" as const, label: "Projects", count: 4, icon: Code },
    { value: "presentation" as const, label: "Presentations", count: 3, icon: Presentation },
    { value: "lab" as const, label: "Lab Work", count: 2, icon: Microscope },
    { value: "homework" as const, label: "Homework", count: 1, icon: BookOpen },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-card border-border">
        <h3 className="font-semibold text-foreground mb-4">Filter by Status</h3>
        <div className="space-y-2">
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onFilterStatusChange(filter.value)}
              className={`w-full text-left p-3 rounded-lg transition-colors flex items-center justify-between hover:bg-accent/50 ${
                filterStatus === filter.value ? "bg-primary/10 text-primary" : "text-muted-foreground"
              }`}
            >
              <div className="flex items-center gap-3">
                {filter.icon && <filter.icon className={`w-4 h-4 ${filter.color}`} />}
                <span className="font-medium">{filter.label}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {filter.count}
              </Badge>
            </button>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-card border-border">
        <h3 className="font-semibold text-foreground mb-4">Filter by Type</h3>
        <div className="space-y-2">
          {typeFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onFilterTypeChange(filter.value)}
              className={`w-full text-left p-3 rounded-lg transition-colors flex items-center justify-between hover:bg-accent/50 ${
                filterType === filter.value ? "bg-primary/10 text-primary" : "text-muted-foreground"
              }`}
            >
              <div className="flex items-center gap-3">
                {filter.icon && <filter.icon className="w-4 h-4" />}
                <span className="font-medium">{filter.label}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {filter.count}
              </Badge>
            </button>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <h3 className="font-semibold text-foreground mb-2">Quick Tips</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>• Submit early to avoid technical issues</p>
          <p>• Check rubrics before starting</p>
          <p>• Use calendar view for deadlines</p>
        </div>
      </Card>
    </div>
  );
}