import { useState } from "react";
import { format, formatDistanceToNow, isAfter } from "date-fns";
import { 
  X, 
  Calendar, 
  User, 
  FileText, 
  Upload, 
  Link, 
  Download,
  CheckCircle,
  Clock,
  AlertTriangle,
  Star,
  MessageSquare
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Assignment } from "./AssignmentsPage";
import { SubmissionUpload } from "./SubmissionUpload";

interface AssignmentModalProps {
  assignment: Assignment;
  isOpen: boolean;
  onClose: () => void;
}

export function AssignmentModal({ assignment, isOpen, onClose }: AssignmentModalProps) {
  const [activeTab, setActiveTab] = useState<"details" | "submit" | "feedback">("details");
  const [submissionText, setSubmissionText] = useState("");
  const [submissionLink, setSubmissionLink] = useState("");

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

  const isOverdue = isAfter(new Date(), assignment.dueDate) && 
                   assignment.status !== "submitted" && 
                   assignment.status !== "graded";

  const canSubmit = assignment.status === "upcoming" || 
                   assignment.status === "in-progress" || 
                   (assignment.status === "overdue" && assignment.allowLateSubmission);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-2xl font-bold">{assignment.title}</DialogTitle>
              <div className="flex items-center gap-3">
                <Badge className={`text-sm ${getStatusColor(assignment.status)}`}>
                  {getStatusIcon(assignment.status)}
                  <span className="ml-2 capitalize">{assignment.status.replace("-", " ")}</span>
                </Badge>
                <Badge variant="outline">{assignment.course}</Badge>
                <Badge variant="outline" className="capitalize">{assignment.type}</Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab("details")}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "details" 
                ? "border-primary text-primary" 
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Assignment Details
          </button>
          {canSubmit && (
            <button
              onClick={() => setActiveTab("submit")}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "submit" 
                  ? "border-primary text-primary" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Submit Work
            </button>
          )}
          {(assignment.feedback || assignment.grade !== undefined) && (
            <button
              onClick={() => setActiveTab("feedback")}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "feedback" 
                  ? "border-primary text-primary" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Grade & Feedback
            </button>
          )}
        </div>

        <div className="space-y-6">
          {activeTab === "details" && (
            <div className="space-y-6">
              {/* Assignment Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Due Date:</span>
                    <span className={`font-medium ${isOverdue ? "text-red-600" : "text-foreground"}`}>
                      {format(assignment.dueDate, "EEEE, MMMM d, yyyy 'at' h:mm a")}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Time Remaining:</span>
                    <span className={`font-medium ${isOverdue ? "text-red-600" : "text-foreground"}`}>
                      {formatDistanceToNow(assignment.dueDate, { addSuffix: true })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Instructor:</span>
                    <span className="font-medium text-foreground">{assignment.instructor}</span>
                  </div>
                  
                  {assignment.submittedDate && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-muted-foreground">Submitted:</span>
                      <span className="font-medium text-foreground">
                        {format(assignment.submittedDate, "MMM d, yyyy 'at' h:mm a")}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-foreground">
                        {assignment.grade ?? "—"}/{assignment.maxGrade}
                      </div>
                      <div className="text-sm text-muted-foreground">Points</div>
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <div className="text-muted-foreground mb-1">Late Submission:</div>
                    <div className="font-medium">
                      {assignment.allowLateSubmission ? "Allowed" : "Not Allowed"}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Description</h3>
                <p className="text-muted-foreground leading-relaxed">{assignment.description}</p>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {assignment.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Attachments */}
              {assignment.attachments && assignment.attachments.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Attachments</h3>
                  <div className="space-y-2">
                    {assignment.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="flex-1 text-foreground">{attachment}</span>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "submit" && canSubmit && (
            <div className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
                <h3 className="font-semibold text-foreground mb-2">Submit Your Work</h3>
                <p className="text-sm text-muted-foreground">
                  Make sure to review all requirements before submitting. 
                  {assignment.allowLateSubmission ? " Late submissions are accepted." : " Late submissions are not accepted."}
                </p>
              </div>

              {assignment.submissionType === "file" && <SubmissionUpload />}
              
              {assignment.submissionType === "text" && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Text Submission
                  </label>
                  <Textarea
                    value={submissionText}
                    onChange={(e) => setSubmissionText(e.target.value)}
                    placeholder="Enter your submission text here..."
                    className="min-h-[200px]"
                  />
                </div>
              )}
              
              {assignment.submissionType === "link" && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Link Submission
                  </label>
                  <Input
                    value={submissionLink}
                    onChange={(e) => setSubmissionLink(e.target.value)}
                    placeholder="https://..."
                    type="url"
                  />
                </div>
              )}

              {assignment.submissionType === "multiple" && (
                <div className="space-y-4">
                  <SubmissionUpload />
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Additional Comments
                    </label>
                    <Textarea
                      value={submissionText}
                      onChange={(e) => setSubmissionText(e.target.value)}
                      placeholder="Any additional comments or notes..."
                      rows={3}
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button className="bg-primary hover:bg-primary/90">
                  Submit Assignment
                </Button>
                <Button variant="outline">Save as Draft</Button>
              </div>
            </div>
          )}

          {activeTab === "feedback" && (assignment.feedback || assignment.grade !== undefined) && (
            <div className="space-y-6">
              {/* Grade */}
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-6 border border-green-500/20">
                <div className="text-center">
                  <div className="text-4xl font-bold text-foreground mb-2">
                    {assignment.grade}/{assignment.maxGrade}
                  </div>
                  <div className="text-lg text-muted-foreground">
                    {assignment.grade ? `${Math.round((assignment.grade / assignment.maxGrade) * 100)}%` : "Not graded"}
                  </div>
                </div>
              </div>

              {/* Feedback */}
              {assignment.feedback && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Instructor Feedback</h3>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-muted-foreground leading-relaxed">{assignment.feedback}</p>
                  </div>
                </div>
              )}

              {/* Submission Details */}
              {assignment.submittedDate && (
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Submission Details</h3>
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Submitted:</span>
                      <span className="text-foreground font-medium">
                        {format(assignment.submittedDate, "MMM d, yyyy 'at' h:mm a")}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="text-green-600 font-medium">
                        {assignment.submittedDate <= assignment.dueDate ? "On Time" : "Late"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}