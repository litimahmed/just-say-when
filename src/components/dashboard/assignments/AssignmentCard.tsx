import { formatDistanceToNow, format, isAfter } from "date-fns";
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
  HelpCircle,
  Calendar,
  User,
  ChevronRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Assignment } from "./AssignmentsPage";

interface AssignmentCardProps {
  assignment: Assignment;
  viewMode: "list" | "grid";
  onClick: () => void;
}

export function AssignmentCard({ assignment, viewMode, onClick }: AssignmentCardProps) {
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "upcoming": return <Clock className="w-4 h-4" />;
      case "in-progress": return <Upload className="w-4 h-4" />;
      case "submitted": return <CheckCircle className="w-4 h-4" />;
      case "graded": return <Star className="w-4 h-4" />;
      case "overdue": return <AlertTriangle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "text-blue-600 bg-blue-500/10 border-blue-500/20";
      case "in-progress": return "text-yellow-600 bg-yellow-500/10 border-yellow-500/20";
      case "submitted": return "text-green-600 bg-green-500/10 border-green-500/20";
      case "graded": return "text-purple-600 bg-purple-500/10 border-purple-500/20";
      case "overdue": return "text-red-600 bg-red-500/10 border-red-500/20";
      default: return "text-muted-foreground bg-muted border-border";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "essay": return <FileText className="w-4 h-4" />;
      case "quiz": return <HelpCircle className="w-4 h-4" />;
      case "project": return <Code className="w-4 h-4" />;
      case "presentation": return <Presentation className="w-4 h-4" />;
      case "lab": return <Microscope className="w-4 h-4" />;
      case "homework": return <BookOpen className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getCourseColor = (color: string) => {
    switch (color) {
      case "blue": return "bg-blue-500/10 text-blue-700 border-blue-500/20";
      case "green": return "bg-green-500/10 text-green-700 border-green-500/20";
      case "purple": return "bg-purple-500/10 text-purple-700 border-purple-500/20";
      case "pink": return "bg-pink-500/10 text-pink-700 border-pink-500/20";
      case "orange": return "bg-orange-500/10 text-orange-700 border-orange-500/20";
      case "red": return "bg-red-500/10 text-red-700 border-red-500/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const isOverdue = isAfter(new Date(), assignment.dueDate) && 
                   assignment.status !== "submitted" && 
                   assignment.status !== "graded";

  const timeUntilDue = formatDistanceToNow(assignment.dueDate, { addSuffix: true });
  const formattedDueDate = format(assignment.dueDate, "MMM d, yyyy 'at' h:mm a");

  if (viewMode === "list") {
    return (
      <Card 
        className="p-4 hover:shadow-md transition-all duration-200 cursor-pointer border-border bg-card"
        onClick={onClick}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            {/* Type Icon */}
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              {getTypeIcon(assignment.type)}
            </div>
            
            {/* Assignment Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-foreground truncate">{assignment.title}</h3>
                <Badge className={`text-xs ${getStatusColor(assignment.status)}`}>
                  {getStatusIcon(assignment.status)}
                  <span className="ml-1 capitalize">{assignment.status.replace("-", " ")}</span>
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Badge variant="outline" className={getCourseColor(assignment.courseColor)}>
                  {assignment.course}
                </Badge>
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {assignment.instructor}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span className={isOverdue ? "text-red-600 font-medium" : ""}>
                    Due {timeUntilDue}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Grade */}
            <div className="text-right">
              {assignment.grade !== undefined ? (
                <div className="text-lg font-bold text-foreground">
                  {assignment.grade}/{assignment.maxGrade}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  Max: {assignment.maxGrade} pts
                </div>
              )}
            </div>
            
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </Card>
    );
  }

  // Grid view
  return (
    <Card 
      className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer border-border bg-card"
      onClick={onClick}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
            {getTypeIcon(assignment.type)}
          </div>
          <Badge className={`text-xs ${getStatusColor(assignment.status)}`}>
            {getStatusIcon(assignment.status)}
            <span className="ml-1 capitalize">{assignment.status.replace("-", " ")}</span>
          </Badge>
        </div>
        
        {/* Title and Course */}
        <div>
          <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{assignment.title}</h3>
          <Badge variant="outline" className={`text-xs ${getCourseColor(assignment.courseColor)}`}>
            {assignment.course}
          </Badge>
        </div>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3">{assignment.description}</p>
        
        {/* Footer */}
        <div className="space-y-2 pt-2 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {assignment.instructor}
            </div>
            {assignment.grade !== undefined ? (
              <div className="font-bold text-foreground">
                {assignment.grade}/{assignment.maxGrade}
              </div>
            ) : (
              <div>{assignment.maxGrade} pts</div>
            )}
          </div>
          
          <div className="flex items-center gap-1 text-xs">
            <Calendar className="w-3 h-3" />
            <span className={isOverdue ? "text-red-600 font-medium" : "text-muted-foreground"}>
              Due {timeUntilDue}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}