import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Trophy, Award, Star, CheckCircle, Calendar } from "lucide-react";

export function AchievementTimeline() {
  const timelineEvents = [
    {
      id: 1,
      type: "certificate",
      title: "React.js Fundamentals Certificate",
      description: "Successfully completed comprehensive React course with 98% score",
      date: "2024-03-15",
      icon: Trophy,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    },
    {
      id: 2,
      type: "badge",
      title: "Speed Learner Badge",
      description: "Completed JavaScript Advanced course in record time",
      date: "2024-03-10",
      icon: Award,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      id: 3,
      type: "milestone",
      title: "Course Completionist",
      description: "Reached milestone of 10 completed courses",
      date: "2024-03-05",
      icon: Star,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      id: 4,
      type: "certificate",
      title: "JavaScript Advanced Certificate",
      description: "Mastered advanced JavaScript concepts and ES6+ features",
      date: "2024-02-28",
      icon: Trophy,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    },
    {
      id: 5,
      type: "badge",
      title: "Night Owl Badge",
      description: "Completed 3-hour study session after 10 PM",
      date: "2024-02-25",
      icon: Award,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10"
    },
    {
      id: 6,
      type: "badge",
      title: "Community Helper Badge",
      description: "Helped 25 fellow students in discussion forums",
      date: "2024-02-20",
      icon: Award,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "certificate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "badge": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "milestone": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-primary" />
          <span>Achievement Timeline</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
          
          {/* Timeline Events */}
          <div className="space-y-6">
            {timelineEvents.map((event, index) => (
              <div key={event.id} className="relative flex items-start space-x-4">
                {/* Timeline Dot */}
                <div className={`relative z-10 w-12 h-12 rounded-full ${event.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <event.icon className={`w-6 h-6 ${event.color}`} />
                </div>

                {/* Event Content */}
                <div className="flex-1 min-w-0 pb-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-foreground">{event.title}</h4>
                        <Badge variant="secondary" className={getTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="mt-6 text-center">
          <button className="text-sm text-primary hover:underline">
            View Complete Timeline
          </button>
        </div>
      </CardContent>
    </Card>
  );
}