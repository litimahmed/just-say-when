import { useState } from "react";
import { Calendar, Clock, Users, MapPin, BookOpen, Filter, Search, Star, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Workshop {
  id: string;
  title: string;
  course: string;
  instructor: {
    name: string;
    avatar: string;
    rating: number;
  };
  date: string;
  time: string;
  duration: string;
  participants: number;
  maxParticipants: number;
  location: "online" | "hybrid" | "in-person";
  difficulty: "beginner" | "intermediate" | "advanced";
  topics: string[];
  description: string;
  status: "upcoming" | "live" | "completed";
  week: number;
}

const mockWorkshops: Workshop[] = [
  {
    id: "1",
    title: "Advanced React Hooks & Performance Optimization",
    course: "React Development Mastery",
    instructor: {
      name: "Sarah Chen",
      avatar: "/src/assets/avatar-fatima.jpg",
      rating: 4.9
    },
    date: "2024-01-15",
    time: "14:00",
    duration: "2h 30m",
    participants: 24,
    maxParticipants: 30,
    location: "online",
    difficulty: "advanced",
    topics: ["useCallback", "useMemo", "React.memo", "Performance Profiling"],
    description: "Deep dive into React performance optimization techniques with hands-on exercises.",
    status: "upcoming",
    week: 6
  },
  {
    id: "2",
    title: "UX Research Methods Workshop",
    course: "UX Design Fundamentals",
    instructor: {
      name: "Michael Rodriguez",
      avatar: "/src/assets/avatar-jorge.jpg",
      rating: 4.8
    },
    date: "2024-01-16",
    time: "10:00",
    duration: "3h",
    participants: 18,
    maxParticipants: 25,
    location: "hybrid",
    difficulty: "intermediate",
    topics: ["User Interviews", "Usability Testing", "A/B Testing", "Analytics"],
    description: "Learn practical UX research methods through real-world case studies.",
    status: "upcoming",
    week: 4
  },
  {
    id: "3",
    title: "JavaScript ES6+ Features Deep Dive",
    course: "Modern JavaScript",
    instructor: {
      name: "Alex Thompson",
      avatar: "/src/assets/avatar-nicolas.jpg",
      rating: 4.7
    },
    date: "2024-01-14",
    time: "16:00",
    duration: "2h",
    participants: 32,
    maxParticipants: 35,
    location: "online",
    difficulty: "intermediate",
    topics: ["Async/Await", "Destructuring", "Modules", "Proxy"],
    description: "Master modern JavaScript features with interactive coding sessions.",
    status: "live",
    week: 3
  }
];

export function WorkshopsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredWorkshops = mockWorkshops.filter(workshop => {
    const matchesSearch = workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === "all" || workshop.course === selectedCourse;
    const matchesDifficulty = selectedDifficulty === "all" || workshop.difficulty === selectedDifficulty;
    const matchesStatus = selectedStatus === "all" || workshop.status === selectedStatus;
    
    return matchesSearch && matchesCourse && matchesDifficulty && matchesStatus;
  });

  const getStatusColor = (status: Workshop["status"]) => {
    switch (status) {
      case "live": return "bg-red-500/10 text-red-600 border-red-200";
      case "upcoming": return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "completed": return "bg-green-500/10 text-green-600 border-green-200";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getDifficultyColor = (difficulty: Workshop["difficulty"]) => {
    switch (difficulty) {
      case "beginner": return "bg-green-500/10 text-green-600";
      case "intermediate": return "bg-yellow-500/10 text-yellow-600";
      case "advanced": return "bg-red-500/10 text-red-600";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getLocationIcon = (location: Workshop["location"]) => {
    switch (location) {
      case "online": return "🌐";
      case "hybrid": return "🔄";
      case "in-person": return "🏢";
      default: return "📍";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Workshops</h1>
          <p className="text-muted-foreground mt-2">
            Interactive workshops based on your enrolled courses. Dive deeper into specific topics with expert guidance.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search workshops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Courses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="React Development Mastery">React Development</SelectItem>
                <SelectItem value="UX Design Fundamentals">UX Design</SelectItem>
                <SelectItem value="Modern JavaScript">JavaScript</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="live">Live</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkshops.map((workshop) => (
              <Card key={workshop.id} className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/20">
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between">
                    <Badge className={getStatusColor(workshop.status)} variant="outline">
                      {workshop.status === "live" && "🔴 "}
                      {workshop.status.charAt(0).toUpperCase() + workshop.status.slice(1)}
                    </Badge>
                    <span className="text-sm text-muted-foreground">Week {workshop.week}</span>
                  </div>
                  
                  <div>
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                      {workshop.title}
                    </CardTitle>
                    <CardDescription className="mt-2 text-primary/80">
                      {workshop.course}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Instructor */}
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={workshop.instructor.avatar} alt={workshop.instructor.name} />
                      <AvatarFallback>{workshop.instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{workshop.instructor.name}</p>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-muted-foreground ml-1">{workshop.instructor.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Workshop Details */}
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(workshop.date).toLocaleDateString()}</span>
                      <Clock className="w-4 h-4 ml-4" />
                      <span>{workshop.time} ({workshop.duration})</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span>{getLocationIcon(workshop.location)}</span>
                      <span className="capitalize">{workshop.location}</span>
                      <Users className="w-4 h-4 ml-4" />
                      <span>{workshop.participants}/{workshop.maxParticipants}</span>
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-1">
                    {workshop.topics.slice(0, 3).map((topic) => (
                      <Badge key={topic} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                    {workshop.topics.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{workshop.topics.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Difficulty */}
                  <Badge className={getDifficultyColor(workshop.difficulty)} variant="outline">
                    {workshop.difficulty.charAt(0).toUpperCase() + workshop.difficulty.slice(1)}
                  </Badge>

                  {/* Action Button */}
                  <Button 
                    className="w-full" 
                    variant={workshop.status === "live" ? "default" : "outline"}
                  >
                    {workshop.status === "live" ? "Join Now" : 
                     workshop.status === "upcoming" ? "Register" : "View Recording"}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          <div className="space-y-4">
            {filteredWorkshops.map((workshop) => (
              <Card key={workshop.id} className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between space-x-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(workshop.status)} variant="outline">
                          {workshop.status === "live" && "🔴 "}
                          {workshop.status.charAt(0).toUpperCase() + workshop.status.slice(1)}
                        </Badge>
                        <Badge className={getDifficultyColor(workshop.difficulty)} variant="outline">
                          {workshop.difficulty.charAt(0).toUpperCase() + workshop.difficulty.slice(1)}
                        </Badge>
                        <span className="text-sm text-muted-foreground">Week {workshop.week}</span>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors cursor-pointer">
                          {workshop.title}
                        </h3>
                        <p className="text-primary/80 font-medium">{workshop.course}</p>
                        <p className="text-muted-foreground text-sm mt-1">{workshop.description}</p>
                      </div>

                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={workshop.instructor.avatar} alt={workshop.instructor.name} />
                            <AvatarFallback className="text-xs">{workshop.instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span>{workshop.instructor.name}</span>
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span>{workshop.instructor.rating}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(workshop.date).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{workshop.time} ({workshop.duration})</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span>{getLocationIcon(workshop.location)}</span>
                          <span className="capitalize">{workshop.location}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{workshop.participants}/{workshop.maxParticipants}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {workshop.topics.map((topic) => (
                          <Badge key={topic} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <Button 
                        variant={workshop.status === "live" ? "default" : "outline"}
                        size="sm"
                      >
                        {workshop.status === "live" ? "Join Now" : 
                         workshop.status === "upcoming" ? "Register" : "View Recording"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredWorkshops.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No workshops found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}