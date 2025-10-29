import { format } from "date-fns";
import { Clock, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MockEvent } from "./mockData";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: MockEvent;
  onClick?: () => void;
  variant?: "default" | "compact";
}

export function EventCard({ event, onClick, variant = "default" }: EventCardProps) {
  const typeColors = {
    live: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-300 dark:border-red-800",
    workshop: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-300 dark:border-blue-800",
    review: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-300 dark:border-green-800",
    exam: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/20 dark:text-purple-300 dark:border-purple-800",
    deadline: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/20 dark:text-orange-300 dark:border-orange-800"
  };

  const typeIcons = {
    live: "🔴",
    workshop: "🔧",
    review: "📋",
    exam: "📝",
    deadline: "⏰"
  };

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm",
          typeColors[event.type],
          onClick && "hover:scale-[1.01]"
        )}
        onClick={onClick}
      >
        <div className="flex items-center space-x-3">
          <div className="text-lg">{typeIcons[event.type]}</div>
          <div>
            <h4 className="font-medium text-sm">{event.title}</h4>
            <p className="text-xs opacity-75">{format(event.startAt, "h:mm a")}</p>
          </div>
        </div>
        {event.hasConflict && (
          <AlertCircle className="h-4 w-4 text-orange-500" />
        )}
      </div>
    );
  }

  return (
    <Card 
      className={cn(
        "transition-all hover:shadow-md cursor-pointer border-l-4",
        event.type === "live" && "border-l-red-500",
        event.type === "workshop" && "border-l-blue-500",
        event.type === "review" && "border-l-green-500",
        event.type === "exam" && "border-l-purple-500",
        event.type === "deadline" && "border-l-orange-500",
        onClick && "hover:scale-[1.01]"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{typeIcons[event.type]}</span>
            <Badge 
              variant="secondary"
              className={cn("text-xs font-medium", typeColors[event.type])}
            >
              {event.type}
            </Badge>
          </div>
          {event.hasConflict && (
            <div className="flex items-center space-x-1 text-orange-500">
              <AlertCircle className="h-4 w-4" />
              <span className="text-xs font-medium">Conflict</span>
            </div>
          )}
        </div>
        
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
          {event.title}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {event.description}
        </p>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          <span>{format(event.startAt, "h:mm a")}</span>
        </div>
      </CardContent>
    </Card>
  );
}