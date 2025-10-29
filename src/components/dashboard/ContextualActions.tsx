import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Lightbulb,
  Users,
  BookOpen,
  Trophy,
  MessageCircle,
  ExternalLink,
  ArrowRight
} from "lucide-react";

export function ContextualActions() {
  const smartSuggestions = [
    {
      title: "Review React Hooks",
      reason: "Based on upcoming quiz",
      action: "Study Now",
      priority: "high"
    },
    {
      title: "Complete JavaScript Project",
      reason: "Due in 2 days",
      action: "Continue",
      priority: "medium"
    }
  ];

  const peerActivity = [
    {
      name: "Sarah Chen",
      avatar: "/src/assets/avatar-fatima.jpg",
      activity: "completed React Router",
      time: "2h ago"
    },
    {
      name: "Mike Johnson",
      avatar: "/src/assets/avatar-hassan.jpg",
      activity: "started Node.js course",
      time: "4h ago"
    },
    {
      name: "Emma Wilson",
      avatar: "/src/assets/avatar-fatima.jpg",
      activity: "earned JavaScript badge",
      time: "6h ago"
    }
  ];

  const resources = [
    {
      title: "React Documentation",
      type: "docs",
      usage: "Frequently accessed"
    },
    {
      title: "JavaScript Cheat Sheet",
      type: "reference",
      usage: "Last used today"
    },
    {
      title: "Code Playground",
      type: "tool",
      usage: "Practice coding"
    }
  ];

  const achievements = [
    {
      icon: Trophy,
      title: "Week Warrior",
      description: "7 days streak completed",
      date: "Today",
      color: "text-yellow-500"
    },
    {
      icon: Users,
      title: "Helper",
      description: "Answered 3 questions",
      date: "Yesterday",
      color: "text-blue-500"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Smart Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="w-5 h-5 mr-2 text-primary" />
            Smart Suggestions
          </CardTitle>
          <CardDescription>AI-powered next steps</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {smartSuggestions.map((suggestion, index) => (
            <div key={index} className="p-3 border border-border rounded-lg hover:bg-accent/30 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-sm font-medium text-foreground">{suggestion.title}</p>
                    <Badge variant={suggestion.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                      {suggestion.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{suggestion.reason}</p>
                </div>
                <Button size="sm" variant="ghost">
                  {suggestion.action}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Peer Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-primary" />
            Peer Activity
          </CardTitle>
          <CardDescription>What your classmates are doing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {peerActivity.map((peer, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/30 transition-colors">
              <Avatar className="w-8 h-8">
                <AvatarImage src={peer.avatar} alt={peer.name} />
                <AvatarFallback>{peer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{peer.name}</span> {peer.activity}
                </p>
                <p className="text-xs text-muted-foreground">{peer.time}</p>
              </div>
            </div>
          ))}
          <Button variant="ghost" className="w-full" size="sm">
            <MessageCircle className="w-4 h-4 mr-2" />
            Join Study Group
          </Button>
        </CardContent>
      </Card>

      {/* Resource Library */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-primary" />
            Quick Resources
          </CardTitle>
          <CardDescription>Frequently used materials</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {resources.map((resource, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/30 transition-colors group cursor-pointer">
              <div>
                <p className="text-sm font-medium text-foreground">{resource.title}</p>
                <p className="text-xs text-muted-foreground">{resource.type} • {resource.usage}</p>
              </div>
              <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-primary" />
            Recent Wins
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
              <div className={`w-8 h-8 rounded-full bg-accent flex items-center justify-center`}>
                <achievement.icon className={`w-4 h-4 ${achievement.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm">{achievement.title}</p>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full" size="sm">
            <ArrowRight className="w-4 h-4 mr-2" />
            View All Achievements
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}