import { useState } from "react";
import { addDays, subDays } from "date-fns";
import { ScheduleHeader } from "./ScheduleHeader";
import { CalendarView } from "./CalendarView";
import { EventList } from "./EventList";
import { mockEvents } from "./mockData";

export function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = direction === "next" ? addDays(currentDate, 1) : subDays(currentDate, 1);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    // Add event details modal logic here
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <ScheduleHeader
        currentDate={currentDate}
        onNavigate={navigateDate}
        onToday={goToToday}
        eventCount={mockEvents.length}
      />

      {/* Main Content */}
      <div className="flex-1 flex gap-6 p-6 min-h-0">
        {/* Calendar */}
        <div className="flex-1 min-w-0">
          <CalendarView
            selectedDate={currentDate}
            events={mockEvents}
            onDateSelect={setCurrentDate}
            onMonthChange={setCurrentDate}
          />
        </div>

        {/* Events Sidebar */}
        <div className="w-80 flex-shrink-0">
          <EventList
            selectedDate={currentDate}
            events={mockEvents}
            onEventClick={handleEventClick}
          />
        </div>
      </div>
    </div>
  );
}