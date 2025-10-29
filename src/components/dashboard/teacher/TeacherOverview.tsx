import { useState } from "react";
import { TrendingUp, Users, BookOpen, DollarSign, Star, Clock, ArrowUpRight, ArrowDownRight, Target, Award, MessageSquare, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TeacherOverview() {
  const [timeRange, setTimeRange] = useState("7d");

  const stats = [
    {
      title: "Total Revenue",
      value: "$24,350",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Active Students",
      value: "4,892",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Course Rating",
      value: "4.8",
      change: "+0.3",
      trend: "up",
      icon: Star,
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      title: "Total Courses",
      value: "12",
      change: "+2",
      trend: "up",
      icon: BookOpen,
      color: "text-accent",
      bgColor: "bg-accent/10"
    }
  ];

  const recentActivity = [
    { id: 1, type: "enrollment", student: "Sarah Johnson", course: "React Development", time: "2 hours ago", avatar: "" },
    { id: 2, type: "review", student: "Mike Chen", course: "JavaScript Fundamentals", rating: 5, time: "4 hours ago", avatar: "" },
    { id: 3, type: "question", student: "Emma Wilson", course: "TypeScript Advanced", time: "6 hours ago", avatar: "" },
    { id: 4, type: "completion", student: "John Davis", course: "Node.js Mastery", time: "1 day ago", avatar: "" },
  ];

  const upcomingTasks = [
    { id: 1, title: "Review 12 pending assignments", priority: "high", dueDate: "Today" },
    { id: 2, title: "Update React course content", priority: "medium", dueDate: "Tomorrow" },
    { id: 3, title: "Schedule live Q&A session", priority: "medium", dueDate: "Dec 15" },
    { id: 4, title: "Respond to 8 student questions", priority: "high", dueDate: "Today" },
  ];

  const topCourses = [
    { id: 1, title: "Complete React Development", students: 2847, revenue: "$14,235", rating: 4.8, trend: "+15%" },
    { id: 2, title: "JavaScript Fundamentals", students: 1923, revenue: "$9,615", rating: 4.6, trend: "+8%" },
    { id: 3, title: "TypeScript Advanced Patterns", students: 1456, revenue: "$7,280", rating: 4.9, trend: "+22%" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-accent p-8 text-white shadow-xl">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">Welcome back, Professor! 👋</h1>
          <p className="text-lg text-white/90 mb-6">Here's what's happening with your courses today</p>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary" size="lg" className="bg-white/20 hover:bg-white/30 text-white border-0">
              <BookOpen className="w-5 h-5 mr-2" />
              Create New Course
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Live Session
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
      </div>

      {/* Time Range Selector */}
      <Tabs value={timeRange} onValueChange={setTimeRange} className="w-full">
        <TabsList className="grid w-fit grid-cols-4">
          <TabsTrigger value="7d">7 Days</TabsTrigger>
          <TabsTrigger value="30d">30 Days</TabsTrigger>
          <TabsTrigger value="90d">90 Days</TabsTrigger>
          <TabsTrigger value="1y">1 Year</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <Badge variant={stat.trend === "up" ? "default" : "secondary"} className="flex items-center gap-1">
                  {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Performing Courses */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Top Performing Courses
              </span>
              <Button variant="ghost" size="sm">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topCourses.map((course, index) => (
              <div key={course.id} className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary font-bold text-lg">
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">{course.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning fill-current" />
                      {course.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {course.revenue}
                    </span>
                  </div>
                </div>
                <Badge variant="default" className="bg-success/10 text-success">
                  {course.trend}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-accent" />
              Tasks & Reminders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-border" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground mb-1">{task.title}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant={task.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                      {task.priority}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full mt-2">
              View All Tasks
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-accent" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/30 transition-colors">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {activity.student.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    <span className="text-primary">{activity.student}</span>
                    {activity.type === "enrollment" && " enrolled in "}
                    {activity.type === "review" && " left a review on "}
                    {activity.type === "question" && " asked a question in "}
                    {activity.type === "completion" && " completed "}
                    <span className="font-semibold">{activity.course}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
                {activity.type === "review" && (
                  <div className="flex items-center gap-1">
                    {[...Array(activity.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-warning fill-current" />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 hover:shadow-md transition-shadow cursor-pointer group">
          <CardContent className="p-6 text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Student Messages</h3>
            <p className="text-sm text-muted-foreground">8 unread messages</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/5 to-primary/5 hover:shadow-md transition-shadow cursor-pointer group">
          <CardContent className="p-6 text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Award className="w-8 h-8 text-success" />
            </div>
            <h3 className="font-semibold text-lg">Pending Reviews</h3>
            <p className="text-sm text-muted-foreground">12 assignments to grade</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/5 to-accent/5 hover:shadow-md transition-shadow cursor-pointer group">
          <CardContent className="p-6 text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-warning/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <TrendingUp className="w-8 h-8 text-warning" />
            </div>
            <h3 className="font-semibold text-lg">Analytics</h3>
            <p className="text-sm text-muted-foreground">View detailed insights</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
