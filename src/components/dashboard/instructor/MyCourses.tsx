import { useState } from "react";
import { Plus, Eye, Edit, BarChart3, Users, Star, Calendar, DollarSign, Settings, Search, Filter, Grid, List, TrendingUp, Clock, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Course {
  id: string;
  title: string;
  thumbnail: string;
  status: "published" | "draft" | "under-review" | "archived";
  students: number;
  rating: number;
  totalRatings: number;
  revenue: number;
  lastUpdated: string;
  createdDate: string;
  category: string;
  duration: string;
  lessons: number;
  completion: number;
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Complete React Development Course 2024",
    thumbnail: "/course-react.jpg",
    status: "published",
    students: 2847,
    rating: 4.8,
    totalRatings: 342,
    revenue: 14235,
    lastUpdated: "2024-01-10",
    createdDate: "2023-08-15",
    category: "Programming",
    duration: "24h 30m",
    lessons: 156,
    completion: 100
  },
  {
    id: "2", 
    title: "Modern JavaScript Fundamentals",
    thumbnail: "/course-javascript.jpg",
    status: "published",
    students: 1923,
    rating: 4.6,
    totalRatings: 198,
    revenue: 9615,
    lastUpdated: "2024-01-08",
    createdDate: "2023-10-22",
    category: "Programming",
    duration: "18h 45m",
    lessons: 98,
    completion: 100
  },
  {
    id: "3",
    title: "Advanced TypeScript Patterns",
    thumbnail: "/course-typescript.jpg", 
    status: "draft",
    students: 0,
    rating: 0,
    totalRatings: 0,
    revenue: 0,
    lastUpdated: "2024-01-12",
    createdDate: "2024-01-05",
    category: "Programming",
    duration: "12h 20m",
    lessons: 64,
    completion: 75
  }
];

export function MyCourses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || course.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalStudents = mockCourses.reduce((sum, course) => sum + course.students, 0);
  const totalRevenue = mockCourses.reduce((sum, course) => sum + course.revenue, 0);
  const avgRating = mockCourses.filter(c => c.rating > 0).reduce((sum, course) => sum + course.rating, 0) / mockCourses.filter(c => c.rating > 0).length;
  const publishedCourses = mockCourses.filter(c => c.status === "published").length;

  const getStatusColor = (status: Course["status"]) => {
    switch (status) {
      case "published": return "bg-success/10 text-success-foreground border-success/20";
      case "draft": return "bg-warning/10 text-warning-foreground border-warning/20";
      case "under-review": return "bg-info/10 text-info-foreground border-info/20";
      case "archived": return "bg-muted text-muted-foreground border-border";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Section with Gradient */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 rounded-2xl" />
        <div className="relative p-8 space-y-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight text-foreground">My Courses</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Manage your course portfolio, track performance, and grow your teaching business
              </p>
            </div>
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group">
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Create New Course
            </Button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 bg-background/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                    <p className="text-2xl font-bold text-foreground">{mockCourses.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-background/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-success/10">
                    <Users className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                    <p className="text-2xl font-bold text-foreground">{totalStudents.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-background/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-warning/10">
                    <DollarSign className="w-6 h-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold text-foreground">${totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-background/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-accent/10">
                    <Star className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                    <p className="text-2xl font-bold text-foreground">{avgRating.toFixed(1)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-1 items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="under-review">Under Review</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Courses Content */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getStatusColor(course.status)} variant="outline">
                    {course.status.replace("-", " ").toUpperCase()}
                  </Badge>
                </div>
                {course.status === "draft" && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-background/80 backdrop-blur-sm rounded-full p-2">
                      <Progress value={course.completion} className="w-16 h-2" />
                    </div>
                  </div>
                )}
              </div>

              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{course.category}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.lessons} lessons</span>
                  </div>
                </div>

                {course.status === "published" && (
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-lg font-semibold text-foreground">{course.students}</p>
                      <p className="text-xs text-muted-foreground">Students</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-lg font-semibold text-foreground">{course.rating}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">({course.totalRatings})</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-foreground">${course.revenue}</p>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors cursor-pointer">
                          {course.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{course.category} • {course.duration} • {course.lessons} lessons</p>
                      </div>
                      <Badge className={getStatusColor(course.status)} variant="outline">
                        {course.status.replace("-", " ").toUpperCase()}
                      </Badge>
                    </div>

                    {course.status === "published" && (
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{course.students} students</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>{course.rating} ({course.totalRatings} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4" />
                          <span>${course.revenue} revenue</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>Updated {new Date(course.lastUpdated).toLocaleDateString()}</span>
                        </div>
                      </div>
                    )}

                    {course.status === "draft" && (
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Course Progress</span>
                            <span className="text-foreground font-medium">{course.completion}%</span>
                          </div>
                          <Progress value={course.completion} className="h-2" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analytics
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredCourses.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No courses found</h3>
          <p className="text-muted-foreground mb-6">Create your first course to start teaching</p>
          <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white">
            <Plus className="w-5 h-5 mr-2" />
            Create Your First Course
          </Button>
        </div>
      )}
    </div>
  );
}