import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Grid, List } from "lucide-react";
import { useState } from "react";

export function CourseFilters() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-card rounded-lg border">
      {/* Search and Filters */}
      <div className="flex flex-1 items-center space-x-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search courses..." 
            className="pl-10"
          />
        </div>
        
        <Select defaultValue="all">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="recent">
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Recently Accessed</SelectItem>
            <SelectItem value="progress">By Progress</SelectItem>
            <SelectItem value="deadline">By Deadline</SelectItem>
            <SelectItem value="alphabetical">A-Z</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Active Filters */}
      <div className="flex items-center space-x-2">
        <Badge variant="secondary" className="text-xs">
          JavaScript
          <button className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5">×</button>
        </Badge>
        <Badge variant="secondary" className="text-xs">
          In Progress
          <button className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5">×</button>
        </Badge>
      </div>

      {/* View Toggle */}
      <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
        <Button
          variant={viewMode === "grid" ? "default" : "ghost"}
          size="sm"
          onClick={() => setViewMode("grid")}
        >
          <Grid className="w-4 h-4" />
        </Button>
        <Button
          variant={viewMode === "list" ? "default" : "ghost"}
          size="sm"
          onClick={() => setViewMode("list")}
        >
          <List className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}