import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Clock, 
  BookOpen, 
  Users, 
  Star, 
  Award, 
  Globe, 
  PlayCircle,
  FileText,
  CheckCircle,
  ArrowLeft,
  DollarSign
} from "lucide-react";
import PageLoader from "@/components/ui/PageLoader";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

interface Course {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  category: string | null;
  level: string | null;
  language: string | null;
  thumbnail_url: string | null;
  price: number;
  promotional_price: number | null;
  currency: string;
  free_preview: boolean;
  published: boolean;
  enrollment_limit: number;
  certificate_enabled: boolean;
  total_lessons: number;
  total_duration: number;
  teacher_id: string;
  created_at: string;
}

interface Section {
  id: string;
  title: string;
  description: string | null;
  order_index: number;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  description: string | null;
  order_index: number;
  is_published: boolean;
  estimated_duration: number;
  content: ContentItem[];
}

interface ContentItem {
  id: string;
  content_type: string;
  title: string;
  order_index: number;
  data: any;
}

export default function CourseView() {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchCourseData();
    }
  }, [slug]);

  const fetchCourseData = async () => {
    try {
      setLoading(true);

      // Fetch course by slug
      const { data: courseData, error: courseError } = await supabase
        .from("courses")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (courseError) throw courseError;
      
      if (!courseData) {
        toast.error("Course not found");
        setCourse(null);
        setLoading(false);
        return;
      }

      setCourse(courseData);

      // Fetch sections
      const { data: sectionsData, error: sectionsError } = await supabase
        .from("course_sections")
        .select("*")
        .eq("course_id", courseData.id)
        .order("order_index");

      if (sectionsError) throw sectionsError;

      // Fetch lessons for each section
      const sectionsWithLessons = await Promise.all(
        (sectionsData || []).map(async (section) => {
          const { data: lessonsData, error: lessonsError } = await supabase
            .from("course_lessons")
            .select("*")
            .eq("section_id", section.id)
            .order("order_index");

          if (lessonsError) throw lessonsError;

          // Fetch content for each lesson
          const lessonsWithContent = await Promise.all(
            (lessonsData || []).map(async (lesson) => {
              const { data: contentData, error: contentError } = await supabase
                .from("lesson_content")
                .select("*")
                .eq("lesson_id", lesson.id)
                .order("order_index");

              if (contentError) throw contentError;

              return {
                ...lesson,
                content: contentData || [],
              };
            })
          );

          return {
            ...section,
            lessons: lessonsWithContent,
          };
        })
      );

      setSections(sectionsWithLessons);
    } catch (error: any) {
      console.error("Error fetching course:", error);
      toast.error("Failed to load course data");
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  if (loading) {
    return <PageLoader />;
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Course Not Found</CardTitle>
            <CardDescription>
              The course you're looking for doesn't exist or has been removed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link to="/courses">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Browse Courses
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{course.title} | FormAcad</title>
        <meta name="description" content={course.description || course.subtitle || course.title} />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/10 via-background to-background border-b">
          <div className="container mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Left Column - Course Info */}
              <div className="space-y-6">
                <Link to="/courses" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Courses
                </Link>

                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {course.category && (
                      <Badge variant="secondary">{course.category}</Badge>
                    )}
                    {course.level && (
                      <Badge variant="outline">{course.level}</Badge>
                    )}
                    {!course.published && (
                      <Badge variant="destructive">Draft</Badge>
                    )}
                  </div>

                  <h1 className="text-4xl font-bold tracking-tight">{course.title}</h1>
                  
                  {course.subtitle && (
                    <p className="text-xl text-muted-foreground">{course.subtitle}</p>
                  )}

                  <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{formatDuration(course.total_duration)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.total_lessons} lessons</span>
                    </div>
                    {course.language && (
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        <span>{course.language}</span>
                      </div>
                    )}
                    {course.certificate_enabled && (
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        <span>Certificate</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Thumbnail & CTA */}
              <div className="space-y-6">
                <Card className="overflow-hidden">
                  {course.thumbnail_url ? (
                    <img
                      src={course.thumbnail_url}
                      alt={course.title}
                      className="w-full aspect-video object-cover"
                    />
                  ) : (
                    <div className="w-full aspect-video bg-muted flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-muted-foreground" />
                    </div>
                  )}
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-baseline gap-2">
                      {course.promotional_price ? (
                        <>
                          <span className="text-3xl font-bold">
                            {formatPrice(course.promotional_price, course.currency)}
                          </span>
                          <span className="text-lg text-muted-foreground line-through">
                            {formatPrice(course.price, course.currency)}
                          </span>
                        </>
                      ) : (
                        <span className="text-3xl font-bold">
                          {course.price > 0 ? formatPrice(course.price, course.currency) : "Free"}
                        </span>
                      )}
                    </div>
                    <Button className="w-full" size="lg">
                      <Users className="w-4 h-4 mr-2" />
                      Enroll Now
                    </Button>
                    {course.free_preview && (
                      <p className="text-sm text-center text-muted-foreground">
                        Preview available
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>About This Course</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {course.description || "No description available."}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What You'll Learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {sections.slice(0, 6).map((section) => (
                      <div key={section.id} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{section.title}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="curriculum" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Curriculum</CardTitle>
                  <CardDescription>
                    {sections.length} sections • {course.total_lessons} lessons • {formatDuration(course.total_duration)} total
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {sections.map((section, index) => (
                      <AccordionItem key={section.id} value={section.id}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-3 text-left">
                            <span className="text-sm font-semibold text-muted-foreground">
                              Section {index + 1}
                            </span>
                            <span className="font-semibold">{section.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pl-4">
                            {section.description && (
                              <p className="text-sm text-muted-foreground mb-4">
                                {section.description}
                              </p>
                            )}
                            {section.lessons.map((lesson, lessonIndex) => (
                              <div
                                key={lesson.id}
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <PlayCircle className="w-4 h-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm font-medium">
                                      {lessonIndex + 1}. {lesson.title}
                                    </p>
                                    {lesson.description && (
                                      <p className="text-xs text-muted-foreground">
                                        {lesson.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <FileText className="w-3 h-3" />
                                    {lesson.content.length}
                                  </span>
                                  <span>{formatDuration(lesson.estimated_duration)}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}