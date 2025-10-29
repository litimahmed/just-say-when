import { format, isSameDay } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { EventCard } from "./EventCard";
import { MockEvent } from "./mockData";

interface EventListProps {
  selectedDate: Date;
  events: MockEvent[];
  onEventClick?: (event: MockEvent) => void;
}

export function EventList({ selectedDate, events, onEventClick }: EventListProps) {
  const dayEvents = events.filter(event => isSameDay(event.startAt, selectedDate));
  const isToday = isSameDay(selectedDate, new Date());

  const groupedEvents = dayEvents.reduce((acc, event) => {
    const hour = format(event.startAt, "h:mm a");
    if (!acc[hour]) acc[hour] = [];
    acc[hour].push(event);
    return acc;
  }, {} as Record<string, MockEvent[]>);

  const sortedTimeSlots = Object.keys(groupedEvents).sort((a, b) => {
    const timeA = new Date(`1970-01-01 ${a}`);
    const timeB = new Date(`1970-01-01 ${b}`);
    return timeA.getTime() - timeB.getTime();
  });

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5" />
            <span>
              {isToday ? "Today's Schedule" : format(selectedDate, "MMM d, yyyy")}
            </span>
          </div>
          {dayEvents.length > 0 && (
            <Badge variant="secondary" className="font-medium">
              {dayEvents.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 pt-0">
        {dayEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <CalendarIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-lg mb-2">No events scheduled</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
              {isToday 
                ? "You have a free day! Time to catch up or take a well-deserved break."
                : `No events planned for ${format(selectedDate, "MMMM d")}.`
              }
            </p>
            <Button size="sm" variant="outline">
              <Clock className="h-4 w-4 mr-2" />
              Schedule Event
            </Button>
          </div>
        ) : (
          <ScrollArea className="h-full">
            <div className="space-y-4">
              {sortedTimeSlots.map((timeSlot, index) => (
                <div key={timeSlot}>
                  {index > 0 && <Separator className="my-4" />}
                  
                  {/* Time Header */}
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-16 text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md text-center">
                      {timeSlot}
                    </div>
                    <div className="flex-1 h-px bg-border"></div>
                  </div>
                  
                  {/* Events for this time slot */}
                  <div className="space-y-2 ml-18">
                    {groupedEvents[timeSlot].map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        variant="compact"
                        onClick={() => onEventClick?.(event)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}