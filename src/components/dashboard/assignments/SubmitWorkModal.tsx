import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SubmissionUpload } from "./SubmissionUpload";
import { Calendar, Clock, BookOpen } from "lucide-react";

interface SubmitWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubmitWorkModal({ isOpen, onClose }: SubmitWorkModalProps) {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState("");
  const [submissionType, setSubmissionType] = useState("file");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const courses = [
    "Advanced Web Development",
    "JavaScript Essentials", 
    "Full Stack Development",
    "Design Systems",
    "Database Systems",
    "Data Structures & Algorithms"
  ];

  const assignments = [
    "React Component Architecture Essay",
    "JavaScript Fundamentals Quiz",
    "E-commerce Website Project",
    "UI/UX Design Principles Presentation",
    "Database Normalization Lab",
    "Algorithm Complexity Analysis"
  ];

  const handleSubmit = () => {
    // Handle submission logic here
    console.log("Submitting work...");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Submit Work</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Course and Assignment Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course} value={course}>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        {course}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignment">Assignment</Label>
              <Select value={selectedAssignment} onValueChange={setSelectedAssignment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select assignment" />
                </SelectTrigger>
                <SelectContent>
                  {assignments.map((assignment) => (
                    <SelectItem key={assignment} value={assignment}>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {assignment}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submission Type */}
          <div className="space-y-2">
            <Label htmlFor="submission-type">Submission Type</Label>
            <Select value={submissionType} onValueChange={setSubmissionType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="file">File Upload</SelectItem>
                <SelectItem value="text">Text Submission</SelectItem>
                <SelectItem value="link">Link/URL</SelectItem>
                <SelectItem value="multiple">Multiple Types</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Submission Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for your submission"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add any additional notes or comments about your submission"
              rows={3}
            />
          </div>

          {/* Submission Content Based on Type */}
          <div className="space-y-4">
            {submissionType === "file" && (
              <div>
                <Label>Upload Files</Label>
                <div className="mt-2">
                  <SubmissionUpload />
                </div>
              </div>
            )}

            {submissionType === "text" && (
              <div className="space-y-2">
                <Label htmlFor="text-content">Text Content</Label>
                <Textarea
                  id="text-content"
                  placeholder="Enter your submission content here..."
                  className="min-h-[200px]"
                />
              </div>
            )}

            {submissionType === "link" && (
              <div className="space-y-2">
                <Label htmlFor="link-url">Submission URL</Label>
                <Input
                  id="link-url"
                  type="url"
                  placeholder="https://example.com"
                />
              </div>
            )}

            {submissionType === "multiple" && (
              <div className="space-y-4">
                <div>
                  <Label>Upload Files</Label>
                  <div className="mt-2">
                    <SubmissionUpload />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="additional-link">Additional Link (Optional)</Label>
                  <Input
                    id="additional-link"
                    type="url"
                    placeholder="https://example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="additional-text">Additional Notes</Label>
                  <Textarea
                    id="additional-text"
                    placeholder="Any additional information..."
                    rows={3}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Due Date Warning */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 text-yellow-700 mb-2">
              <Clock className="w-4 h-4" />
              <span className="font-medium">Due Date Reminder</span>
            </div>
            <p className="text-sm text-yellow-600">
              Make sure to submit before the deadline. Late submissions may incur penalties depending on the assignment policy.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              onClick={handleSubmit}
              className="bg-primary hover:bg-primary/90 flex-1"
              disabled={!selectedCourse || !selectedAssignment}
            >
              Submit Work
            </Button>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Save as Draft
            </Button>
            <Button 
              variant="ghost" 
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}