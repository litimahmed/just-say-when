import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Filter, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  SidebarClose,
  SidebarOpen
} from "lucide-react";
import { NodeFilters } from "./types";

interface PathControlsProps {
  filters: NodeFilters;
  onFiltersChange: (filters: NodeFilters) => void;
  sidebarOpen: boolean;
  onSidebarToggle: (open: boolean) => void;
}

export function PathControls({ 
  filters, 
  onFiltersChange, 
  sidebarOpen, 
  onSidebarToggle 
}: PathControlsProps) {
  
  const handleFilterChange = (key: keyof NodeFilters, value: boolean) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search roadmap..."
          className="pl-10 w-64"
        />
      </div>

      {/* Filters */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Show/Hide Elements</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={filters.showCompleted}
            onCheckedChange={(checked) => 
              handleFilterChange('showCompleted', checked ?? false)
            }
          >
            Completed Topics
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filters.showOptional}
            onCheckedChange={(checked) => 
              handleFilterChange('showOptional', checked ?? false)
            }
          >
            Optional Content
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={filters.showAssessments}
            onCheckedChange={(checked) => 
              handleFilterChange('showAssessments', checked ?? false)
            }
          >
            Assessments
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* View Controls */}
      <div className="flex items-center space-x-1">
        <Button variant="outline" size="sm">
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm">
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="sm">
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Sidebar Toggle */}
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onSidebarToggle(!sidebarOpen)}
      >
        {sidebarOpen ? (
          <SidebarClose className="w-4 h-4" />
        ) : (
          <SidebarOpen className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
}