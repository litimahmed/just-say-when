import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { MockEvent } from "./mockData";
import { cn } from "@/lib/utils";

interface MonthViewProps {
  events: MockEvent[];
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onEventClick: (event: MockEvent) => void;
}

export function MonthView({ events, currentDate, onDateChange, onEventClick }: MonthViewProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Group events by date
  const eventsByDate = events.reduce((acc, event) => {
    const dateKey = format(event.startAt, "yyyy-MM-dd");
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, MockEvent[]>);

  // Custom day content with events
  const renderDay = (day: Date) => {
    const dateKey = format(day, "yyyy-MM-dd");
    const dayEvents = eventsByDate[dateKey] || [];
    const hasEvents = dayEvents.length > 0;
    const hasConflicts = dayEvents.some(e => e.hasConflict);

    return (
      <div className="relative w-full h-full min-h-[80px] p-1">
        <div className={cn(
          "text-sm font-medium mb-1",
          isSameDay(day, new Date()) ? "text-primary font-bold" : "text-foreground"
        )}>
          {format(day, "d")}
        </div>
        
        {hasEvents && (
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event, index) => (
              <div
                key={event.id}
                className={cn(
                  "text-xs p-1 rounded cursor-pointer truncate transition-colors",
                  event.type === "live" && "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
                  event.type === "workshop" && "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
                  event.type === "review" && "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
                  event.type === "exam" && "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
                  event.type === "deadline" && "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300",
                  hasConflicts && "ring-1 ring-orange-400"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onEventClick(event);
                }}
                title={`${event.title} - ${format(event.startAt, "h:mm a")}`}
              >
                {format(event.startAt, "h:mm a")} {event.title}
              </div>
            ))}
            
            {dayEvents.length > 2 && (
              <div className="text-xs text-muted-foreground px-1">
                +{dayEvents.length - 2} more
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      <Card>
        <CardContent className="p-6">
          <Calendar
            mode="single"
            selected={currentDate}
            onSelect={(date) => date && onDateChange(date)}
            month={currentDate}
            onMonthChange={onDateChange}
            className={cn("w-full pointer-events-auto")}
            classNames={{
              months: "flex w-full",
              month: "space-y-4 w-full",
              caption: "flex justify-center pt-1 relative items-center mb-4",
              caption_label: "text-lg font-semibold",
              nav: "space-x-1 flex items-center",
              nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border rounded-md",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse",
              head_row: "flex w-full",
              head_cell: "text-muted-foreground rounded-md font-medium text-sm flex-1 p-2 text-center",
              row: "flex w-full",
              cell: "flex-1 relative p-0 text-center focus-within:relative focus-within:z-20 border border-border",
              day: "h-20 w-full p-0 font-normal aria-selected:bg-accent hover:bg-accent/50 focus:bg-accent focus:text-accent-foreground cursor-pointer",
              day_range_end: "day-range-end",
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground font-bold",
              day_outside: "text-muted-foreground opacity-50",
              day_disabled: "text-muted-foreground opacity-50",
              day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
              day_hidden: "invisible",
            }}
            components={{
              Day: ({ date, displayMonth }) => (
                <div className="h-20">
                  {renderDay(date)}
                </div>
              ),
            }}
          />
          
          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-border">
            <h4 className="text-sm font-medium mb-3">Event Types</h4>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300">
                Live Session
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                Workshop
              </Badge>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                Review
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300">
                Exam
              </Badge>
              <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300">
                Deadline
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}