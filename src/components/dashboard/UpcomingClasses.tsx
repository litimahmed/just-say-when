import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Clock,
  Video,
  Users,
  MapPin,
  AlertCircle
} from "lucide-react";

export function UpcomingClasses() {
  const upcomingClasses = [
    {
      title: "React Advanced Patterns",
      instructor: "Dr. Sarah Wilson",
      instructorAvatar: "/api/placeholder/32/32",
      time: "Today, 2:00 PM",
      duration: "90 minutes",
      type: "Live Session",
      location: "Online",
      participants: 24,
      isLive: false,
      isUrgent: true
    },
    {
      title: "Database Performance Workshop",
      instructor: "Prof. Michael Chen",
      instructorAvatar: "/api/placeholder/32/32",
      time: "Tomorrow, 10:00 AM",
      duration: "2 hours",
      type: "Workshop",
      location: "Lab 301",
      participants: 16,
      isLive: false,
      isUrgent: false
    },
    {
      title: "Code Review Session",
      instructor: "Dr. Emma Rodriguez",
      instructorAvatar: "/api/placeholder/32/32",
      time: "Friday, 3:30 PM",
      duration: "60 minutes",
      type: "Review",
      location: "Online",
      participants: 12,
      isLive: false,
      isUrgent: false
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-primary" />
          Upcoming Classes
        </CardTitle>
        <CardDescription>Don't miss your scheduled sessions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingClasses.map((session, index) => (
          <div key={index} className={`p-4 border rounded-lg space-y-3 transition-all duration-200 hover:shadow-sm ${
            session.isUrgent ? 'border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-900/10' : 'border-border hover:bg-accent/30'
          }`}>
            {/* Header with urgency indicator */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-foreground text-sm">{session.title}</h4>
                  {session.isUrgent && (
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                  )}
                </div>
                <Badge variant="outline" className="text-xs">
                  {session.type}
                </Badge>
              </div>
            </div>

            {/* Instructor */}
            <div className="flex items-center space-x-3">
              <Avatar className="w-6 h-6">
                <AvatarImage src={session.instructorAvatar} alt={session.instructor} />
                <AvatarFallback className="text-xs">
                  {session.instructor.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">{session.instructor}</span>
            </div>

            {/* Session Details */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{session.time}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{session.duration}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  {session.location === "Online" ? (
                    <Video className="w-4 h-4" />
                  ) : (
                    <MapPin className="w-4 h-4" />
                  )}
                  <span>{session.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{session.participants} students</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <Button 
                size="sm" 
                variant={session.isUrgent ? "default" : "outline"} 
                className="w-full"
              >
                {session.location === "Online" ? (
                  <>
                    <Video className="w-4 h-4 mr-2" />
                    Join Online
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4 mr-2" />
                    View Details
                  </>
                )}
              </Button>
            </div>
          </div>
        ))}
        
        <div className="pt-2 border-t border-border">
          <Button variant="ghost" className="w-full text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            View Full Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}