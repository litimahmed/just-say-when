import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Grid, List, Calendar, Plus, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SubmitWorkModal } from "./SubmitWorkModal";

interface AssignmentsHeaderProps {
  viewMode: "list" | "grid";
  onViewModeChange: (mode: "list" | "grid") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function AssignmentsHeader({ 
  viewMode, 
  onViewModeChange, 
  searchQuery, 
  onSearchChange 
}: AssignmentsHeaderProps) {
  const navigate = useNavigate();
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  
  const stats = {
    total: 24,
    upcoming: 8,
    inProgress: 5,
    submitted: 7,
    overdue: 2,
    graded: 2
  };

  return (
    <div className="space-y-6">
      {/* Header with Title and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Assignments</h1>
          <p className="text-muted-foreground mt-1">
            Manage your coursework and track submission progress
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/dashboard/schedule')}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Calendar View
          </Button>
          <Button 
            size="sm" 
            className="bg-primary hover:bg-primary/90"
            onClick={() => setIsSubmitModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Submit Work
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="p-4 text-center bg-card border-border hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-foreground">{stats.total}</div>
          <div className="text-sm text-muted-foreground">Total</div>
        </Card>
        
        <Card className="p-4 text-center bg-blue-500/10 border-blue-500/20 hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-blue-600">{stats.upcoming}</div>
          <div className="text-sm text-muted-foreground">Upcoming</div>
        </Card>
        
        <Card className="p-4 text-center bg-yellow-500/10 border-yellow-500/20 hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
          <div className="text-sm text-muted-foreground">In Progress</div>
        </Card>
        
        <Card className="p-4 text-center bg-green-500/10 border-green-500/20 hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-green-600">{stats.submitted}</div>
          <div className="text-sm text-muted-foreground">Submitted</div>
        </Card>
        
        <Card className="p-4 text-center bg-red-500/10 border-red-500/20 hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
          <div className="text-sm text-muted-foreground">Overdue</div>
        </Card>
        
        <Card className="p-4 text-center bg-purple-500/10 border-purple-500/20 hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-purple-600">{stats.graded}</div>
          <div className="text-sm text-muted-foreground">Graded</div>
        </Card>
      </div>

      {/* Search and View Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search assignments, courses, or instructors..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewModeChange("list")}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewModeChange("grid")}
          >
            <Grid className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <SubmitWorkModal 
        isOpen={isSubmitModalOpen} 
        onClose={() => setIsSubmitModalOpen(false)} 
      />
    </div>
  );
}