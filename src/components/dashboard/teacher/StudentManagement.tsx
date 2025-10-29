import { useState } from "react";
import { Search, Filter, Download, Mail, MoreVertical, TrendingUp, Award, Clock, BookOpen, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  enrolledCourses: number;
  completedCourses: number;
  overallProgress: number;
  lastActive: string;
  status: "active" | "inactive" | "at-risk";
  totalSpent: number;
  avgGrade: number;
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    avatar: "",
    enrolledCourses: 3,
    completedCourses: 1,
    overallProgress: 67,
    lastActive: "2 hours ago",
    status: "active",
    totalSpent: 297,
    avgGrade: 92
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike.chen@example.com",
    avatar: "",
    enrolledCourses: 2,
    completedCourses: 2,
    overallProgress: 100,
    lastActive: "1 day ago",
    status: "active",
    totalSpent: 198,
    avgGrade: 88
  },
  {
    id: "3",
    name: "Emma Wilson",
    email: "emma.w@example.com",
    avatar: "",
    enrolledCourses: 4,
    completedCourses: 0,
    overallProgress: 23,
    lastActive: "3 weeks ago",
    status: "at-risk",
    totalSpent: 396,
    avgGrade: 65
  },
  {
    id: "4",
    name: "John Davis",
    email: "john.d@example.com",
    avatar: "",
    enrolledCourses: 5,
    completedCourses: 3,
    overallProgress: 85,
    lastActive: "5 hours ago",
    status: "active",
    totalSpent: 495,
    avgGrade: 95
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    avatar: "",
    enrolledCourses: 1,
    completedCourses: 0,
    overallProgress: 12,
    lastActive: "2 months ago",
    status: "inactive",
    totalSpent: 99,
    avgGrade: 70
  },
];

export function StudentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Student["status"]) => {
    switch (status) {
      case "active": return "bg-success/10 text-success border-success/20";
      case "at-risk": return "bg-warning/10 text-warning border-warning/20";
      case "inactive": return "bg-muted text-muted-foreground border-border";
      default: return "bg-muted";
    }
  };

  const totalStudents = mockStudents.length;
  const activeStudents = mockStudents.filter(s => s.status === "active").length;
  const atRiskStudents = mockStudents.filter(s => s.status === "at-risk").length;
  const avgCompletion = Math.round(mockStudents.reduce((sum, s) => sum + s.overallProgress, 0) / mockStudents.length);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 p-8">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-foreground mb-2">Student Management</h1>
          <p className="text-lg text-muted-foreground">Track student progress, engagement, and performance</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">Total Students</p>
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">{totalStudents}</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-success/5 to-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">Active Students</p>
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <p className="text-3xl font-bold text-foreground">{activeStudents}</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-warning/5 to-accent/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">At Risk</p>
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <p className="text-3xl font-bold text-foreground">{atRiskStudents}</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-accent/5 to-secondary/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">Avg Completion</p>
              <Award className="w-5 h-5 text-accent" />
            </div>
            <p className="text-3xl font-bold text-foreground">{avgCompletion}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search students by name or email..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="at-risk">At Risk</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="react">React Development</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Student List ({filteredStudents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="flex items-center gap-6 p-4 rounded-xl hover:bg-muted/30 transition-colors border border-border/50"
              >
                <Avatar className="w-14 h-14">
                  <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">{student.name}</h3>
                    <Badge variant="outline" className={getStatusColor(student.status)}>
                      {student.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{student.email}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Courses</p>
                      <p className="font-medium text-foreground">{student.enrolledCourses} enrolled</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Completed</p>
                      <p className="font-medium text-foreground">{student.completedCourses} courses</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg Grade</p>
                      <p className="font-medium text-foreground">{student.avgGrade}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Active</p>
                      <p className="font-medium text-foreground">{student.lastActive}</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Overall Progress</span>
                      <span className="font-medium text-foreground">{student.overallProgress}%</span>
                    </div>
                    <Progress value={student.overallProgress} className="h-2" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>View Progress</DropdownMenuItem>
                      <DropdownMenuItem>Reset Progress</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Remove Student</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
