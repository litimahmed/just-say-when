import { useState } from "react";
import { TrendingUp, Users, Eye, DollarSign, Clock, Star, ArrowUpRight, ArrowDownRight, BookOpen, Target, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedCourse, setSelectedCourse] = useState("all");

  const performanceMetrics = [
    { label: "Course Views", value: "24,567", change: "+12.5%", trend: "up", icon: Eye },
    { label: "Enrollments", value: "1,234", change: "+8.2%", trend: "up", icon: Users },
    { label: "Completion Rate", value: "78%", change: "+5.3%", trend: "up", icon: Target },
    { label: "Avg Watch Time", value: "42 min", change: "-2.1%", trend: "down", icon: Clock },
    { label: "Revenue", value: "$24,350", change: "+15.7%", trend: "up", icon: DollarSign },
    { label: "Avg Rating", value: "4.8", change: "+0.2", trend: "up", icon: Star },
  ];

  const coursePerformance = [
    { name: "Complete React Development", students: 2847, completion: 82, revenue: 14235, rating: 4.8, engagement: 89 },
    { name: "JavaScript Fundamentals", students: 1923, completion: 75, revenue: 9615, rating: 4.6, engagement: 85 },
    { name: "TypeScript Advanced", students: 1456, completion: 68, revenue: 7280, rating: 4.9, engagement: 92 },
  ];

  const engagementData = [
    { day: "Mon", views: 450, completions: 120, enrollments: 45 },
    { day: "Tue", views: 520, completions: 135, enrollments: 52 },
    { day: "Wed", views: 480, completions: 128, enrollments: 48 },
    { day: "Thu", views: 580, completions: 145, enrollments: 58 },
    { day: "Fri", views: 620, completions: 156, enrollments: 62 },
    { day: "Sat", views: 390, completions: 98, enrollments: 38 },
    { day: "Sun", views: 340, completions: 85, enrollments: 32 },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/5 p-8">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
          <p className="text-lg text-muted-foreground">Track your course performance and student engagement</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <Tabs value={timeRange} onValueChange={setTimeRange}>
          <TabsList>
            <TabsTrigger value="7d">7 Days</TabsTrigger>
            <TabsTrigger value="30d">30 Days</TabsTrigger>
            <TabsTrigger value="90d">90 Days</TabsTrigger>
            <TabsTrigger value="1y">1 Year</TabsTrigger>
          </TabsList>
        </Tabs>

        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            <SelectItem value="react">Complete React Development</SelectItem>
            <SelectItem value="javascript">JavaScript Fundamentals</SelectItem>
            <SelectItem value="typescript">TypeScript Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {performanceMetrics.map((metric) => (
          <Card key={metric.label} className="hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <metric.icon className="w-6 h-6 text-primary" />
                </div>
                <Badge variant={metric.trend === "up" ? "default" : "secondary"} className="flex items-center gap-1">
                  {metric.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {metric.change}
                </Badge>
              </div>
              <p className="text-sm font-medium text-muted-foreground mb-1">{metric.label}</p>
              <p className="text-3xl font-bold text-foreground">{metric.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Engagement Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Weekly Engagement Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-end justify-between gap-4">
            {engagementData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-3">
                <div className="w-full flex flex-col gap-2">
                  <div className="relative h-48 flex items-end">
                    <div
                      className="w-full bg-primary/20 rounded-t-lg relative overflow-hidden group cursor-pointer hover:bg-primary/30 transition-colors"
                      style={{ height: `${(data.views / 700) * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs font-medium text-foreground bg-background/90 px-2 py-1 rounded">{data.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="text-sm font-medium text-muted-foreground">{data.day}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary/40" />
              <span className="text-muted-foreground">Views</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-muted-foreground">Completions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="text-muted-foreground">Enrollments</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Course Performance Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {coursePerformance.map((course) => (
              <div key={course.name} className="p-6 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-1">{course.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {course.students} students
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-warning fill-current" />
                        {course.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        ${course.revenue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-success/10 text-success">
                    {course.engagement}% Engagement
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Completion Rate</span>
                      <span className="font-medium text-foreground">{course.completion}%</span>
                    </div>
                    <Progress value={course.completion} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Student Engagement</span>
                      <span className="font-medium text-foreground">{course.engagement}%</span>
                    </div>
                    <Progress value={course.engagement} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-success/5 to-primary/5">
          <CardContent className="p-6">
            <Award className="w-10 h-10 text-success mb-4" />
            <h3 className="font-semibold text-lg mb-2">Top Performer</h3>
            <p className="text-sm text-muted-foreground mb-2">TypeScript Advanced has the highest rating</p>
            <p className="text-2xl font-bold text-success">4.9 ⭐</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="p-6">
            <TrendingUp className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Fastest Growing</h3>
            <p className="text-sm text-muted-foreground mb-2">React Development enrollment surge</p>
            <p className="text-2xl font-bold text-primary">+22%</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/5 to-accent/5">
          <CardContent className="p-6">
            <Target className="w-10 h-10 text-warning mb-4" />
            <h3 className="font-semibold text-lg mb-2">Needs Attention</h3>
            <p className="text-sm text-muted-foreground mb-2">Improve completion rate</p>
            <p className="text-2xl font-bold text-warning">JavaScript</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
