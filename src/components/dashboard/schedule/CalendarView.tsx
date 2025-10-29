import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, isSameDay } from "date-fns";
import { MockEvent } from "./mockData";
import { cn } from "@/lib/utils";

interface CalendarViewProps {
  selectedDate: Date;
  events: MockEvent[];
  onDateSelect: (date: Date) => void;
  onMonthChange?: (date: Date) => void;
}

export function CalendarView({ selectedDate, events, onDateSelect, onMonthChange }: CalendarViewProps) {
  // Group events by date for easy lookup
  const eventsByDate = events.reduce((acc, event) => {
    const dateKey = format(event.startAt, "yyyy-MM-dd");
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, MockEvent[]>);

  const getEventTypePriority = (type: string): number => {
    const priorities = { exam: 1, deadline: 2, live: 3, workshop: 4, review: 5 };
    return priorities[type as keyof typeof priorities] || 6;
  };

  const renderDayContent = (date: Date) => {
    const dateKey = format(date, "yyyy-MM-dd");
    const dayEvents = eventsByDate[dateKey] || [];
    const isToday = isSameDay(date, new Date());
    const isSelected = isSameDay(date, selectedDate);
    
    if (dayEvents.length === 0) return null;

    // Get the most important event for styling
    const primaryEvent = dayEvents.sort((a, b) => 
      getEventTypePriority(a.type) - getEventTypePriority(b.type)
    )[0];

    const typeIndicators = {
      live: "bg-red-500",
      workshop: "bg-blue-500", 
      review: "bg-green-500",
      exam: "bg-purple-500",
      deadline: "bg-orange-500"
    };

    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn(
          "text-sm font-medium mb-1",
          isSelected && "text-primary-foreground",
          isToday && !isSelected && "font-bold"
        )}>
          {format(date, "d")}
        </span>
        
        {/* Event indicators */}
        <div className="flex flex-wrap justify-center gap-1 max-w-full">
          {dayEvents.slice(0, 3).map((event, index) => (
            <div
              key={event.id}
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                typeIndicators[event.type as keyof typeof typeIndicators]
              )}
              title={`${event.title} - ${format(event.startAt, "h:mm a")}`}
            />
          ))}
          {dayEvents.length > 3 && (
            <div 
              className="w-1.5 h-1.5 rounded-full bg-muted-foreground opacity-60"
              title={`+${dayEvents.length - 3} more events`}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && onDateSelect(date)}
          month={selectedDate}
          onMonthChange={onMonthChange}
          className="w-full"
          classNames={{
            months: "flex w-full",
            month: "space-y-4 w-full",
            caption: "flex justify-center pt-1 relative items-center mb-6",
            caption_label: "text-lg font-semibold",
            nav: "space-x-1 flex items-center",
            nav_button: "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 border rounded-md transition-opacity",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell: "text-muted-foreground rounded-md w-full font-medium text-sm p-3 text-center",
            row: "flex w-full mt-2",
            cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 flex-1",
            day: cn(
              "h-14 w-full p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground",
              "focus:bg-accent focus:text-accent-foreground cursor-pointer rounded-lg transition-colors relative"
            ),
            day_range_end: "day-range-end",
            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            day_today: "bg-accent text-accent-foreground font-bold",
            day_outside: "text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
            day_disabled: "text-muted-foreground opacity-50",
            day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
          }}
          components={{
            Day: ({ date, displayMonth, ...props }) => {
              const dayEvents = eventsByDate[format(date, "yyyy-MM-dd")] || [];
              
              return (
                <button
                  {...props}
                  className={cn(
                    "h-14 w-full p-0 font-normal cursor-pointer rounded-lg transition-all duration-200 relative",
                    "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    isSameDay(date, selectedDate) && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                    isSameDay(date, new Date()) && !isSameDay(date, selectedDate) && "bg-accent text-accent-foreground font-bold",
                    dayEvents.length > 0 && "hover:shadow-sm"
                  )}
                  onClick={() => onDateSelect(date)}
                >
                  {renderDayContent(date) || (
                    <span className={cn(
                      "text-sm font-medium",
                      isSameDay(date, selectedDate) && "text-primary-foreground",
                      isSameDay(date, new Date()) && !isSameDay(date, selectedDate) && "font-bold"
                    )}>
                      {format(date, "d")}
                    </span>
                  )}
                </button>
              );
            },
          }}
        />
        
        {/* Calendar Legend */}
        <div className="mt-6 pt-4 border-t border-border">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">Event Types</h4>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-xs text-muted-foreground">Live Session</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-xs text-muted-foreground">Workshop</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-muted-foreground">Review</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-xs text-muted-foreground">Exam</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-xs text-muted-foreground">Deadline</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}