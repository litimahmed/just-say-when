import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CheckCircle,
  BookOpen,
  MessageSquare,
  Award,
  Calendar,
  FileText,
  Users,
  Play
} from "lucide-react";

export function RecentActivity() {
  const activities = [
    {
      type: "completion",
      icon: CheckCircle,
      title: "Completed: React Hooks Deep Dive",
      description: "Finished all 8 lessons and passed the final quiz",
      time: "2 hours ago",
      badge: "Course Complete",
      badgeVariant: "default" as const,
      color: "text-green-500"
    },
    {
      type: "submission",
      icon: FileText,
      title: "Submitted: JavaScript Project",
      description: "Uploaded final project for JavaScript Advanced course",
      time: "4 hours ago",
      badge: "Submitted",
      badgeVariant: "secondary" as const,
      color: "text-blue-500"
    },
    {
      type: "discussion",
      icon: MessageSquare,
      title: "Joined Discussion: Database Optimization",
      description: "Participated in forum discussion about SQL performance",
      time: "6 hours ago",
      badge: "Discussion",
      badgeVariant: "outline" as const,
      color: "text-purple-500"
    },
    {
      type: "achievement",
      icon: Award,
      title: "Earned Badge: Quick Learner",
      description: "Completed 3 courses in the past week",
      time: "1 day ago",
      badge: "Achievement",
      badgeVariant: "default" as const,
      color: "text-yellow-500"
    },
    {
      type: "study-group",
      icon: Users,
      title: "Joined Study Group: React Mastery",
      description: "Connected with 12 other students learning React",
      time: "2 days ago",
      badge: "Social",
      badgeVariant: "secondary" as const,
      color: "text-indigo-500"
    },
    {
      type: "lesson",
      icon: Play,
      title: "Started: Advanced CSS Animations",
      description: "Began new lesson series on modern CSS techniques",
      time: "2 days ago",
      badge: "In Progress",
      badgeVariant: "outline" as const,
      color: "text-orange-500"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your learning activity from the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
              <div className={`w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0`}>
                <activity.icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground text-sm">{activity.title}</p>
                  <Badge variant={activity.badgeVariant} className="text-xs">
                    {activity.badge}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border text-center">
          <button className="text-sm text-primary hover:underline">
            View All Activity
          </button>
        </div>
      </CardContent>
    </Card>
  );
}