import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  CheckCircle2, 
  Lock, 
  Clock, 
  Target, 
  BookOpen, 
  Award, 
  ChevronRight,
  Star,
  Calendar,
  BarChart3,
  Filter,
  Search,
  Bookmark,
  Users,
  Trophy,
  Zap,
  ArrowRight,
  ExternalLink,
  FileText,
  Video,
  MessageSquare,
  Download,
  Share2,
  Heart,
  Eye,
  BookmarkPlus,
  Lightbulb,
  GitBranch,
  Globe
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ExternalResource {
  id: string;
  title: string;
  description: string;
  type: 'documentation' | 'tutorial' | 'practice' | 'article' | 'video' | 'tool';
  url: string;
  provider: string;
  rating: number;
  duration?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface StudyNote {
  id: string;
  content: string;
  timestamp: string;
  tags: string[];
}

interface LearningModule {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'locked' | 'available';
  progress: number;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'video' | 'reading' | 'project' | 'quiz' | 'assignment';
  skills: string[];
  instructor?: {
    name: string;
    avatar: string;
  };
  dueDate?: string;
  points: number;
  externalResources: ExternalResource[];
  studyNotes?: StudyNote[];
  bookmarked?: boolean;
  completedAt?: string;
  timeSpent?: string;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: string;
  totalModules: number;
  completedModules: number;
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  badge: string;
  skills: string[];
  modules: LearningModule[];
  overallProgress: number;
}

const sampleLearningPaths: LearningPath[] = [
  {
    id: "fullstack-web",
    title: "Full-Stack Web Development",
    description: "Master modern web development from frontend to backend",
    category: "Web Development",
    totalModules: 24,
    completedModules: 8,
    estimatedTime: "120 hours",
    difficulty: "intermediate",
    badge: "Professional Developer",
    overallProgress: 33,
    skills: ["React", "Node.js", "PostgreSQL", "TypeScript", "AWS"],
    modules: [
      {
        id: "mod-1",
        title: "HTML & CSS Fundamentals",
        description: "Learn the building blocks of web development",
        status: "completed",
        progress: 100,
        duration: "4 hours",
        difficulty: "beginner",
        type: "video",
        skills: ["HTML", "CSS"],
        instructor: { name: "Sarah Chen", avatar: "/api/placeholder/32/32" },
        points: 100,
        externalResources: [
          {
            id: "res-1",
            title: "MDN HTML Guide",
            description: "Complete HTML reference and tutorials",
            type: "documentation",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
            provider: "MDN",
            rating: 4.9,
            difficulty: "beginner"
          },
          {
            id: "res-2", 
            title: "CSS Tricks Complete Guide",
            description: "Learn CSS Grid and Flexbox",
            type: "tutorial",
            url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
            provider: "CSS Tricks",
            rating: 4.8,
            duration: "2 hours",
            difficulty: "intermediate"
          }
        ],
        bookmarked: true,
        completedAt: "2024-01-05",
        timeSpent: "4.5 hours"
      },
      {
        id: "mod-2", 
        title: "JavaScript ES6+ Mastery",
        description: "Deep dive into modern JavaScript features",
        status: "completed",
        progress: 100,
        duration: "8 hours",
        difficulty: "intermediate",
        type: "video",
        skills: ["JavaScript", "ES6"],
        instructor: { name: "Alex Rodriguez", avatar: "/api/placeholder/32/32" },
        points: 150,
        externalResources: [
          {
            id: "res-3",
            title: "JavaScript.info",
            description: "Modern JavaScript tutorial",
            type: "tutorial",
            url: "https://javascript.info/",
            provider: "JavaScript.info",
            rating: 4.9,
            difficulty: "intermediate"
          },
          {
            id: "res-4",
            title: "ES6 Interactive Exercises",
            description: "Practice ES6 features hands-on",
            type: "practice",
            url: "https://es6katas.org/",
            provider: "ES6 Katas",
            rating: 4.7,
            duration: "3 hours",
            difficulty: "intermediate"
          }
        ],
        completedAt: "2024-01-10",
        timeSpent: "8.2 hours"
      },
      {
        id: "mod-3",
        title: "React Fundamentals",
        description: "Build dynamic user interfaces with React",
        status: "current",
        progress: 65,
        duration: "12 hours", 
        difficulty: "intermediate",
        type: "project",
        skills: ["React", "JSX", "State Management"],
        instructor: { name: "Emma Wilson", avatar: "/api/placeholder/32/32" },
        dueDate: "2024-01-15",
        points: 200,
        externalResources: [
          {
            id: "res-5",
            title: "React Official Documentation",
            description: "Official React docs and guides",
            type: "documentation",
            url: "https://react.dev/",
            provider: "React Team",
            rating: 4.9,
            difficulty: "intermediate"
          },
          {
            id: "res-6",
            title: "React DevTools",
            description: "Browser extension for debugging React",
            type: "tool",
            url: "https://react.dev/learn/react-developer-tools",
            provider: "React Team",
            rating: 4.8,
            difficulty: "intermediate"
          },
          {
            id: "res-7",
            title: "Interactive React Tutorial",
            description: "Build a tic-tac-toe game",
            type: "practice",
            url: "https://react.dev/learn/tutorial-tic-tac-toe",
            provider: "React Team",
            rating: 4.7,
            duration: "2 hours",
            difficulty: "beginner"
          }
        ],
        bookmarked: true,
        studyNotes: [
          {
            id: "note-1",
            content: "Remember: useState returns an array with current state and setter function",
            timestamp: "2024-01-12",
            tags: ["hooks", "state"]
          }
        ]
      },
      {
        id: "mod-4",
        title: "Advanced React Patterns",
        description: "Learn advanced React concepts and patterns",
        status: "available",
        progress: 0,
        duration: "10 hours",
        difficulty: "advanced",
        type: "video",
        skills: ["React", "Context API", "Custom Hooks"],
        instructor: { name: "David Kim", avatar: "/api/placeholder/32/32" },
        points: 250,
        externalResources: [
          {
            id: "res-8",
            title: "Advanced React Patterns",
            description: "Learn advanced patterns and best practices",
            type: "article",
            url: "https://kentcdodds.com/blog/advanced-react-patterns",
            provider: "Kent C. Dodds",
            rating: 4.8,
            difficulty: "advanced"
          }
        ]
      },
      {
        id: "mod-5",
        title: "Node.js Backend Development",
        description: "Build scalable server-side applications",
        status: "locked",
        progress: 0,
        duration: "15 hours",
        difficulty: "intermediate",
        type: "project",
        skills: ["Node.js", "Express", "API Design"],
        instructor: { name: "Maria Garcia", avatar: "/api/placeholder/32/32" },
        points: 300,
        externalResources: [
          {
            id: "res-9",
            title: "Node.js Official Docs",
            description: "Complete Node.js documentation",
            type: "documentation", 
            url: "https://nodejs.org/en/docs/",
            provider: "Node.js",
            rating: 4.8,
            difficulty: "intermediate"
          }
        ]
      }
    ]
  }
];

const getResourceIcon = (type: string) => {
  switch (type) {
    case 'documentation':
      return <FileText className="h-4 w-4" />;
    case 'tutorial':
      return <Video className="h-4 w-4" />;
    case 'practice':
      return <Target className="h-4 w-4" />;
    case 'article':
      return <BookOpen className="h-4 w-4" />;
    case 'video':
      return <Play className="h-4 w-4" />;
    case 'tool':
      return <Zap className="h-4 w-4" />;
    default:
      return <Globe className="h-4 w-4" />;
  }
};

const getStatusIcon = (status: string, progress: number) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="h-5 w-5 text-success" />;
    case 'current':
      return <Play className="h-5 w-5 text-primary" />;
    case 'locked':
      return <Lock className="h-5 w-5 text-muted-foreground" />;
    default:
      return <BookOpen className="h-5 w-5 text-muted-foreground" />;
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'video':
      return <Play className="h-4 w-4" />;
    case 'reading':
      return <BookOpen className="h-4 w-4" />;
    case 'project':
      return <Target className="h-4 w-4" />;
    case 'quiz':
      return <Award className="h-4 w-4" />;
    default:
      return <BookOpen className="h-4 w-4" />;
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'advanced':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
  }
};

export function ModernLearningPath() {
  const [selectedPath] = useState<LearningPath>(sampleLearningPaths[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [activeTab, setActiveTab] = useState("path");
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [showModuleDetails, setShowModuleDetails] = useState(false);

  const filteredModules = selectedPath.modules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || module.status === filterStatus;
    const matchesDifficulty = filterDifficulty === "all" || module.difficulty === filterDifficulty;
    
    return matchesSearch && matchesStatus && matchesDifficulty;
  });

  const totalPoints = selectedPath.modules.reduce((sum, module) => sum + module.points, 0);
  const earnedPoints = selectedPath.modules
    .filter(module => module.status === 'completed')
    .reduce((sum, module) => sum + module.points, 0);

  const handleModuleAction = (module: LearningModule, action: 'start' | 'continue' | 'review') => {
    if (action === 'review') {
      setSelectedModule(module);
      setShowModuleDetails(true);
    } else {
      // Handle start/continue logic
      console.log(`${action} module:`, module.id);
    }
  };

  const toggleBookmark = (moduleId: string) => {
    // Handle bookmark toggle
    console.log('Toggle bookmark for module:', moduleId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      {/* Header Section */}
      <div className="bg-card/50 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {selectedPath.title}
                  </h1>
                  <p className="text-muted-foreground text-lg mt-1">{selectedPath.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span className="capitalize">{selectedPath.difficulty}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{selectedPath.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{selectedPath.totalModules} modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4" />
                  <span>{earnedPoints}/{totalPoints} points</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                <Award className="h-4 w-4 mr-2" />
                {selectedPath.badge}
              </Badge>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary mb-1">
                  {selectedPath.overallProgress}%
                </div>
                <Progress value={selectedPath.overallProgress} className="w-32 h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedPath.completedModules} of {selectedPath.totalModules} completed
                </p>
              </div>
            </div>
          </div>

          {/* Skills Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedPath.skills.map((skill) => (
              <Badge key={skill} variant="outline" className="px-3 py-1">
                <Zap className="h-3 w-3 mr-1" />
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="path" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Learning Path
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Community
            </TabsTrigger>
          </TabsList>

          <TabsContent value="path" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search modules..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="current">Current</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="locked">Locked</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Learning Modules */}
            <div className="grid gap-4">
              <AnimatePresence>
                {filteredModules.map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`group hover:shadow-lg transition-all duration-300 border-l-4 ${
                      module.status === 'completed' ? 'border-l-success' :
                      module.status === 'current' ? 'border-l-primary' :
                      module.status === 'locked' ? 'border-l-muted' : 'border-l-warning'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            {getStatusIcon(module.status, module.progress)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                                  {module.title}
                                </h3>
                                <p className="text-muted-foreground text-sm mb-3">
                                  {module.description}
                                </p>
                                
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    {getTypeIcon(module.type)}
                                    <span className="capitalize">{module.type}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{module.duration}</span>
                                  </div>
                                  <Badge variant="outline" className={`text-xs ${getDifficultyColor(module.difficulty)}`}>
                                    {module.difficulty}
                                  </Badge>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3" />
                                    <span>{module.points} pts</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex flex-col items-end gap-3">
                                {module.instructor && (
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Avatar className="h-6 w-6">
                                      <AvatarImage src={module.instructor.avatar} />
                                      <AvatarFallback className="text-xs">
                                        {module.instructor.name.split(' ').map(n => n[0]).join('')}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span>{module.instructor.name}</span>
                                  </div>
                                )}
                                
                                <div className="flex items-center gap-2">
                                  {module.bookmarked && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => toggleBookmark(module.id)}
                                      className="p-2 h-8 w-8"
                                    >
                                      <Heart className="h-3 w-3 text-red-500 fill-current" />
                                    </Button>
                                  )}
                                  
                                  <Button 
                                    variant={module.status === 'current' ? 'default' : 'outline'}
                                    size="sm"
                                    disabled={module.status === 'locked'}
                                    onClick={() => handleModuleAction(module, 
                                      module.status === 'completed' ? 'review' :
                                      module.status === 'current' ? 'continue' : 'start'
                                    )}
                                    className="group-hover:shadow-md transition-all"
                                  >
                                    {module.status === 'completed' ? 'Review' :
                                     module.status === 'current' ? 'Continue' :
                                     module.status === 'locked' ? 'Locked' : 'Start'}
                                    <ArrowRight className="h-3 w-3 ml-1" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                            
                            {/* Progress Bar for Current Module */}
                            {module.status === 'current' && (
                              <div className="space-y-2">
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>Progress</span>
                                  <span>{module.progress}%</span>
                                </div>
                                <Progress value={module.progress} className="h-2" />
                              </div>
                            )}
                            
                            {/* Due Date for Current Module */}
                            {module.dueDate && module.status === 'current' && (
                              <div className="flex items-center gap-2 mt-3 text-xs text-warning">
                                <Calendar className="h-3 w-3" />
                                <span>Due: {module.dueDate}</span>
                              </div>
                            )}
                            
                            {/* Skills Tags */}
                            <div className="flex flex-wrap gap-1 mt-3">
                              {module.skills.slice(0, 3).map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs px-2 py-0">
                                  {skill}
                                </Badge>
                              ))}
                              {module.skills.length > 3 && (
                                <Badge variant="secondary" className="text-xs px-2 py-0">
                                  +{module.skills.length - 3} more
                                </Badge>
                              )}
                            </div>

                            {/* External Resources Preview */}
                            {module.externalResources.length > 0 && (
                              <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="text-sm font-medium text-foreground">External Resources</h4>
                                  <Badge variant="outline" className="text-xs">
                                    {module.externalResources.length} resources
                                  </Badge>
                                </div>
                                <div className="space-y-2">
                                  {module.externalResources.slice(0, 2).map((resource) => (
                                    <div key={resource.id} className="flex items-center gap-2 text-xs">
                                      {getResourceIcon(resource.type)}
                                      <span className="flex-1 truncate">{resource.title}</span>
                                      <div className="flex items-center gap-1">
                                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                        <span>{resource.rating}</span>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        asChild
                                        className="h-6 w-6 p-0"
                                      >
                                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                          <ExternalLink className="h-3 w-3" />
                                        </a>
                                      </Button>
                                    </div>
                                  ))}
                                  {module.externalResources.length > 2 && (
                                    <p className="text-xs text-muted-foreground">
                                      +{module.externalResources.length - 2} more resources
                                    </p>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-2">
                    {selectedPath.overallProgress}%
                  </div>
                  <Progress value={selectedPath.overallProgress} className="mb-2" />
                  <p className="text-xs text-muted-foreground">
                    {selectedPath.completedModules} of {selectedPath.totalModules} modules completed
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Points Earned</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success mb-2">
                    {earnedPoints}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {totalPoints - earnedPoints} points remaining
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Estimated Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-warning mb-2">
                    {selectedPath.estimatedTime}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Total learning time
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect with fellow learners, share progress, and get help from the community.
                </p>
                <Button className="mt-4">
                  Join Discussion
                  <Users className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Module Details Modal */}
      <Dialog open={showModuleDetails} onOpenChange={setShowModuleDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh]" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedModule && getStatusIcon(selectedModule.status, selectedModule.progress)}
              {selectedModule?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedModule && (
            <ScrollArea className="max-h-[70vh]">
              <div className="space-y-6 pr-4">
                {/* Module Overview */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Badge className={getDifficultyColor(selectedModule.difficulty)}>
                        {selectedModule.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        {getTypeIcon(selectedModule.type)}
                        <span className="capitalize">{selectedModule.type}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{selectedModule.duration}</span>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleBookmark(selectedModule.id)}
                    >
                      {selectedModule.bookmarked ? (
                        <Heart className="h-4 w-4 text-red-500 fill-current mr-2" />
                      ) : (
                        <BookmarkPlus className="h-4 w-4 mr-2" />
                      )}
                      {selectedModule.bookmarked ? 'Bookmarked' : 'Bookmark'}
                    </Button>
                  </div>
                  
                  <p className="text-muted-foreground">{selectedModule.description}</p>
                  
                  {selectedModule.status === 'completed' && selectedModule.completedAt && (
                    <div className="flex items-center gap-4 p-3 bg-success/10 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                      <div>
                        <p className="text-sm font-medium">Completed on {selectedModule.completedAt}</p>
                        {selectedModule.timeSpent && (
                          <p className="text-xs text-muted-foreground">Time spent: {selectedModule.timeSpent}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Skills You'll Learn</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedModule.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="px-3 py-1">
                        <Zap className="h-3 w-3 mr-1" />
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* External Resources */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">External Resources</h3>
                  <div className="grid gap-3">
                    {selectedModule.externalResources.map((resource) => (
                      <Card key={resource.id} className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            {getResourceIcon(resource.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium">{resource.title}</h4>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 text-sm">
                                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                  <span>{resource.rating}</span>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    Visit
                                  </a>
                                </Button>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="capitalize">{resource.type}</span>
                              <span>by {resource.provider}</span>
                              {resource.duration && (
                                <>
                                  <span>•</span>
                                  <span>{resource.duration}</span>
                                </>
                              )}
                              <Badge variant="outline" className={`text-xs ${getDifficultyColor(resource.difficulty)}`}>
                                {resource.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Study Notes */}
                {selectedModule.studyNotes && selectedModule.studyNotes.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Study Notes</h3>
                    <div className="space-y-3">
                      {selectedModule.studyNotes.map((note) => (
                        <Card key={note.id} className="p-4">
                          <div className="flex items-start gap-3">
                            <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm mb-2">{note.content}</p>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">{note.timestamp}</span>
                                <div className="flex gap-1">
                                  {note.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button className="flex-1">
                    {selectedModule.status === 'completed' ? 'Study Again' : 'Continue Learning'}
                    <Play className="h-4 w-4 ml-2" />
                  </Button>
                  <Button variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}