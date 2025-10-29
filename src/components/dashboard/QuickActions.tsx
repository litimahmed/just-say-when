import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  FileText,
  Calendar,
  MessageSquare,
  Download,
  Upload,
  Search,
  Users,
  Zap
} from "lucide-react";

export function QuickActions() {
  const quickActions = [
    {
      title: "Browse Courses",
      description: "Explore new courses",
      icon: BookOpen,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      action: () => console.log("Browse courses")
    },
    {
      title: "Submit Assignment",
      description: "Upload your work",
      icon: Upload,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      action: () => console.log("Submit assignment")
    },
    {
      title: "Schedule Study",
      description: "Plan your learning",
      icon: Calendar,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      action: () => console.log("Schedule study")
    },
    {
      title: "Join Discussion",
      description: "Connect with peers",
      icon: MessageSquare,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      action: () => console.log("Join discussion")
    },
    {
      title: "Download Materials",
      description: "Get course resources",
      icon: Download,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
      action: () => console.log("Download materials")
    },
    {
      title: "Find Study Group",
      description: "Study with others",
      icon: Users,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
      action: () => console.log("Find study group")
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Zap className="w-5 h-5 mr-2 text-primary" />
          Quick Actions
        </CardTitle>
        <CardDescription>Fast access to common tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className="h-auto p-3 flex flex-col items-center space-y-2 hover:bg-accent/50 transition-colors"
              onClick={action.action}
            >
              <div className={`w-8 h-8 rounded-lg ${action.bgColor} flex items-center justify-center`}>
                <action.icon className={`w-4 h-4 ${action.color}`} />
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-foreground">{action.title}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}