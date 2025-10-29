import { CourseCard } from "./CourseCard";
import { useSidebar } from "@/components/ui/sidebar";

export function CourseGrid() {
  const { open: sidebarOpen } = useSidebar();
  const courses = [
    {
      id: "1",
      title: "Advanced React Patterns",
      instructor: "Sarah Johnson", 
      image: "/course-react.jpg",
      progress: 67,
      status: "active" as const,
      totalLessons: 24,
      completedLessons: 16,
      timeSpent: "12h 30m",
      nextLesson: "Higher Order Components",
      lastAccessed: "2 hours ago"
    },
    {
      id: "2",
      title: "TypeScript Masterclass",
      instructor: "Michael Chen",
      image: "/course-typescript.jpg", 
      progress: 45,
      status: "active" as const,
      totalLessons: 18,
      completedLessons: 8,
      timeSpent: "8h 15m",
      nextLesson: "Generics and Constraints",
      lastAccessed: "1 day ago"
    },
    {
      id: "3",
      title: "JavaScript Fundamentals",
      instructor: "Emma Wilson",
      image: "/course-javascript.jpg",
      progress: 100,
      status: "completed" as const,
      totalLessons: 32,
      completedLessons: 32,
      timeSpent: "24h 45m",
      grade: 95,
      lastAccessed: "2 weeks ago"
    },
    {
      id: "4", 
      title: "Node.js Backend Development",
      instructor: "Alex Rodriguez",
      image: "/course-nodejs.jpg",
      progress: 23,
      status: "active" as const,
      totalLessons: 28,
      completedLessons: 6,
      timeSpent: "5h 20m",
      nextLesson: "Express Middleware",
      lastAccessed: "3 days ago"
    },
    {
      id: "5",
      title: "Python for Data Science", 
      instructor: "Dr. Lisa Park",
      image: "/course-python.jpg",
      progress: 78,
      status: "paused" as const,
      totalLessons: 22,
      completedLessons: 17,
      timeSpent: "18h 10m",
      nextLesson: "Machine Learning Basics",
      lastAccessed: "1 week ago"  
    },
    {
      id: "6",
      title: "UX Design Principles",
      instructor: "James Martinez",
      image: "/course-ux.jpg", 
      progress: 100,
      status: "completed" as const,
      totalLessons: 16,
      completedLessons: 16,
      timeSpent: "14h 30m",
      grade: 88,
      lastAccessed: "1 month ago"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">All Courses</h2>
        <span className="text-sm text-muted-foreground">{courses.length} courses enrolled</span>
      </div>
      
      <div className={`grid grid-cols-1 gap-6 ${sidebarOpen ? 'md:grid-cols-2 md:max-w-3xl' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}