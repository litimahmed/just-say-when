import { format } from "date-fns";
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ScheduleHeaderProps {
  currentDate: Date;
  onNavigate: (direction: "prev" | "next") => void;
  onToday: () => void;
  eventCount: number;
}

export function ScheduleHeader({ currentDate, onNavigate, onToday, eventCount }: ScheduleHeaderProps) {
  return (
    <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-6">
          {/* Navigation Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate("prev")}
              className="h-9 w-9 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate("next")}
              className="h-9 w-9 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onToday}
              className="px-3"
            >
              Today
            </Button>
          </div>
          
          {/* Current Date */}
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold tracking-tight">
              {format(currentDate, "MMMM yyyy")}
            </h1>
            {eventCount > 0 && (
              <Badge variant="secondary" className="font-medium">
                {eventCount} events
              </Badge>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* Event Type Legend */}
          <div className="hidden md:flex items-center space-x-4 text-sm text-muted-foreground mr-6">
            <div className="flex items-center space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Live</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Workshop</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Review</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span>Exam</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span>Deadline</span>
            </div>
          </div>
          
          <Button size="sm" className="shadow-sm">
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Button>
        </div>
      </div>
    </div>
  );
}