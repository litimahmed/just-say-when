import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight, Check, Plus, Trash2, Eye, Upload, Settings, BookOpen, Video, FileText, Clock, DollarSign, Users, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { CourseStructureFlow } from "./CourseStructureFlow";
import { ContentCreationStep } from "./ContentCreationStep";
import { LessonWithContent } from "./ContentTypes";

interface CourseData {
  basics: {
    title: string;
    subtitle: string;
    description: string;
    category: string;
    level: string;
    language: string;
    thumbnail: string;
  };
  structure: {
    sections: Section[];
  };
  content: {
    totalDuration: number;
    totalLessons: number;
  };
  pricing: {
    price: number;
    currency: string;
    promotionalPrice?: number;
    freePreview: boolean;
  };
  settings: {
    published: boolean;
    enrollmentLimit: number;
    certificateEnabled: boolean;
  };
}

interface Section {
  id: string;
  title: string;
  description: string;
  lessons: LessonWithContent[];
  isExpanded: boolean;
}

interface Lesson {
  id: string;
  title: string;
  type: "video" | "text" | "quiz" | "assignment";
  duration: number;
  isPreview: boolean;
}

const steps = [
  { id: 1, name: "Course Basics", description: "Title, description & category", icon: BookOpen },
  { id: 2, name: "Course Structure", description: "Organize sections & lessons", icon: Settings },
  { id: 3, name: "Content Creation", description: "Upload videos & materials", icon: Video },
  { id: 4, name: "Pricing & Access", description: "Set pricing & permissions", icon: DollarSign },
  { id: 5, name: "Review & Publish", description: "Final review & go live", icon: Eye },
];

export function CourseBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPublishing, setIsPublishing] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState<CourseData>({
    basics: {
      title: "",
      subtitle: "",
      description: "",
      category: "",
      level: "",
      language: "",
      thumbnail: "",
    },
    structure: {
      sections: []
    },
    content: {
      totalDuration: 0,
      totalLessons: 0,
    },
    pricing: {
      price: 0,
      currency: "USD",
      freePreview: false,
    },
    settings: {
      published: false,
      enrollmentLimit: 0,
      certificateEnabled: false,
    }
  });

  const updateCourseData = (section: keyof CourseData, data: any) => {
    setCourseData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepProgress = () => {
    return ((currentStep - 1) / (steps.length - 1)) * 100;
  };

  const addSection = () => {
    const newSection: Section = {
      id: `section-${Date.now()}`,
      title: "",
      description: "",
      lessons: [],
      isExpanded: true,
    };
    setCourseData(prev => ({
      ...prev,
      structure: {
        sections: [...prev.structure.sections, newSection]
      }
    }));
    
    // Scroll to new section after a brief delay to ensure it's rendered
    setTimeout(() => {
      const newSectionElement = document.getElementById(newSection.id);
      if (newSectionElement) {
        newSectionElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }, 100);
  };

  const addLesson = (sectionId: string) => {
    const newLesson: LessonWithContent = {
      id: `lesson-${Date.now()}`,
      title: "",
      description: "",
      contentItems: [],
      isPublished: false,
      estimatedDuration: 0,
    };
    setCourseData(prev => ({
      ...prev,
      structure: {
        sections: prev.structure.sections.map(section =>
          section.id === sectionId
            ? { ...section, lessons: [...section.lessons, newLesson] }
            : section
        )
      }
    }));
  };

  const updateSection = (sectionId: string, field: string, value: string) => {
    setCourseData(prev => ({
      ...prev,
      structure: {
        sections: prev.structure.sections.map(section =>
          section.id === sectionId
            ? { ...section, [field]: value }
            : section
        )
      }
    }));
  };

  const updateLesson = (sectionId: string, lessonId: string, field: string, value: string) => {
    setCourseData(prev => ({
      ...prev,
      structure: {
        sections: prev.structure.sections.map(section =>
          section.id === sectionId
            ? {
                ...section,
                lessons: section.lessons.map(lesson =>
                  lesson.id === lessonId
                    ? { ...lesson, [field]: value }
                    : lesson
                )
              }
            : section
        )
      }
    }));
  };

  const deleteSection = (sectionId: string) => {
    setCourseData(prev => ({
      ...prev,
      structure: {
        sections: prev.structure.sections.filter(section => section.id !== sectionId)
      }
    }));
  };

  const deleteLesson = (sectionId: string, lessonId: string) => {
    setCourseData(prev => ({
      ...prev,
      structure: {
        sections: prev.structure.sections.map(section =>
          section.id === sectionId
            ? {
                ...section,
                lessons: section.lessons.filter(lesson => lesson.id !== lessonId)
              }
            : section
        )
      }
    }));
  };

  const handleThumbnailSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setThumbnailFile(file);
      updateCourseData("basics", { thumbnail: URL.createObjectURL(file) });
      toast.success("Thumbnail selected");
    }
  };

  const uploadThumbnail = async (): Promise<string | null> => {
    if (!thumbnailFile) return courseData.basics.thumbnail || null;

    try {
      const fileExt = thumbnailFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `course-thumbnails/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('course-assets')
        .upload(filePath, thumbnailFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('course-assets')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading thumbnail:", error);
      toast.error("Failed to upload thumbnail");
      return null;
    }
  };

  // Ensure the current user has the 'teacher' role (via Edge Function)
  const ensureTeacherRole = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('ensure-teacher-role', {
        body: {}
      });
      if (error) {
        console.error('ensure-teacher-role error:', error);
        return false;
      }
      return true;
    } catch (e) {
      console.error('ensure-teacher-role invoke failed:', e);
      return false;
    }
  };

  const publishCourse = async (makePublished: boolean) => {
    setIsPublishing(true);
    try {
      // Validate required fields
      if (!courseData.basics.title) {
        toast.error("Please enter a course title");
        setCurrentStep(1);
        setIsPublishing(false);
        return;
      }
      
      if (!courseData.basics.category) {
        toast.error("Please select a category");
        setCurrentStep(1);
        setIsPublishing(false);
        return;
      }
      
      if (!courseData.basics.level) {
        toast.error("Please select a difficulty level");
        setCurrentStep(1);
        setIsPublishing(false);
        return;
      }
      
      if (!courseData.basics.language) {
        toast.error("Please select a language");
        setCurrentStep(1);
        setIsPublishing(false);
        return;
      }
      
      if (courseData.structure.sections.length === 0) {
        toast.error("Please add at least one section to your course");
        setCurrentStep(2);
        setIsPublishing(false);
        return;
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in to publish a course");
        setIsPublishing(false);
        return;
      }

      // Ensure the user has the 'teacher' role before inserting (RLS requirement)
      await ensureTeacherRole();

      toast.loading("Publishing your course...");

      // Upload thumbnail if exists
      const thumbnailUrl = await uploadThumbnail();

      // Calculate total lessons and duration
      const totalLessons = courseData.structure.sections.reduce(
        (sum, section) => sum + section.lessons.length, 0
      );
      const totalDuration = courseData.structure.sections.reduce(
        (sum, section) => sum + section.lessons.reduce(
          (lessonSum, lesson) => lessonSum + (lesson.estimatedDuration || 0), 0
        ), 0
      );

      // Insert course
      // Generate slug from title
      const generateSlug = (title: string) => {
        return title
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .replace(/\s+/g, '_')
          .trim();
      };

      const slug = generateSlug(courseData.basics.title);

      const { data: course, error: courseError } = await supabase
        .from('courses')
        .insert({
          teacher_id: user.id,
          title: courseData.basics.title,
          subtitle: courseData.basics.subtitle,
          description: courseData.basics.description,
          category: courseData.basics.category,
          level: courseData.basics.level,
          language: courseData.basics.language,
          thumbnail_url: thumbnailUrl,
          price: courseData.pricing.price,
          promotional_price: courseData.pricing.promotionalPrice,
          currency: courseData.pricing.currency,
          free_preview: courseData.pricing.freePreview,
          published: makePublished,
          enrollment_limit: courseData.settings.enrollmentLimit,
          certificate_enabled: courseData.settings.certificateEnabled,
          total_lessons: totalLessons,
          total_duration: totalDuration,
          slug: slug,
        })
        .select()
        .single();

      if (courseError) throw courseError;

      // Insert sections and lessons
      for (let sectionIndex = 0; sectionIndex < courseData.structure.sections.length; sectionIndex++) {
        const section = courseData.structure.sections[sectionIndex];
        
        const { data: sectionData, error: sectionError } = await supabase
          .from('course_sections')
          .insert({
            course_id: course.id,
            title: section.title,
            description: section.description,
            order_index: sectionIndex,
          })
          .select()
          .single();

        if (sectionError) throw sectionError;

        // Insert lessons for this section
        for (let lessonIndex = 0; lessonIndex < section.lessons.length; lessonIndex++) {
          const lesson = section.lessons[lessonIndex];
          
          const { data: lessonData, error: lessonError } = await supabase
            .from('course_lessons')
            .insert({
              section_id: sectionData.id,
              title: lesson.title,
              description: lesson.description || '',
              order_index: lessonIndex,
              is_published: lesson.isPublished || false,
              estimated_duration: lesson.estimatedDuration || 0,
            })
            .select()
            .single();

          if (lessonError) throw lessonError;

          // Insert content items for this lesson
          if (lesson.contentItems && lesson.contentItems.length > 0) {
            for (let contentIndex = 0; contentIndex < lesson.contentItems.length; contentIndex++) {
              const content = lesson.contentItems[contentIndex];
              
              const { error: contentError } = await supabase
                .from('lesson_content')
                .insert({
                  lesson_id: lessonData.id,
                  content_type: content.type,
                  title: content.title,
                  order_index: contentIndex,
                  data: content.data || {},
                });

              if (contentError) throw contentError;
            }
          }
        }
      }

      toast.dismiss();
      toast.success(makePublished ? "Course published successfully!" : "Course saved as draft!");
      
      // Navigate to the course view page using slug
      console.log("Course object:", course);
      console.log("Course slug:", course?.slug);
      
      if (course?.slug) {
        console.log("Navigating to course with slug:", course.slug);
        // Use replace to avoid navigation issues and ensure immediate redirect
        navigate(`/course/${course.slug}`, { replace: true });
      } else {
        console.error("Course slug is missing! Full course object:", course);
        toast.error("Course created but slug is missing. Please refresh and try again.");
      }
    } catch (error: any) {
      console.error("Error publishing course:", error);
      toast.dismiss();
      
      // Show more detailed error message
      const errorMessage = error?.message || "Failed to publish course. Please try again.";
      toast.error(errorMessage);
      
      // If it's an RLS error, provide helpful guidance
      if (errorMessage.includes("row-level security") || errorMessage.includes("permission denied")) {
        toast.error("You don't have permission to create courses. Please ensure you have the teacher role assigned.");
      }
    } finally {
      setIsPublishing(false);
    }
  };

  const saveDraft = async () => {
    await publishCourse(false);
  };

  const renderBasicsStep = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-xl bg-card/70 backdrop-blur-xl overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <span>Course Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 p-8">
              <div className="space-y-3">
                <Label htmlFor="title" className="text-base font-semibold flex items-center gap-2">
                  Course Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Complete React Development Course 2024"
                  value={courseData.basics.title}
                  onChange={(e) => updateCourseData("basics", { title: e.target.value })}
                  className="text-lg h-14 border-2 focus:border-primary transition-all duration-300 bg-background/50"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="subtitle" className="text-base font-semibold">Course Subtitle</Label>
                <Input
                  id="subtitle"
                  placeholder="A brief, compelling subtitle that explains what students will learn"
                  value={courseData.basics.subtitle}
                  onChange={(e) => updateCourseData("basics", { subtitle: e.target.value })}
                  className="h-12 border-2 focus:border-primary transition-all duration-300 bg-background/50"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="description" className="text-base font-semibold flex items-center gap-2">
                  Course Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe what students will learn, prerequisites, and outcomes..."
                  value={courseData.basics.description}
                  onChange={(e) => updateCourseData("basics", { description: e.target.value })}
                  rows={7}
                  className="border-2 focus:border-primary transition-all duration-300 resize-none bg-background/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="category" className="text-base font-semibold flex items-center gap-2">
                    Category <span className="text-destructive">*</span>
                  </Label>
                  <Select value={courseData.basics.category} onValueChange={(value) => updateCourseData("basics", { category: value })}>
                    <SelectTrigger className="h-12 border-2 focus:border-primary transition-all bg-background/50">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="programming">Programming</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="data-science">Data Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="level" className="text-base font-semibold flex items-center gap-2">
                    Level <span className="text-destructive">*</span>
                  </Label>
                  <Select value={courseData.basics.level} onValueChange={(value) => updateCourseData("basics", { level: value })}>
                    <SelectTrigger className="h-12 border-2 focus:border-primary transition-all bg-background/50">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="language" className="text-base font-semibold flex items-center gap-2">
                    Language <span className="text-destructive">*</span>
                  </Label>
                  <Select value={courseData.basics.language} onValueChange={(value) => updateCourseData("basics", { language: value })}>
                    <SelectTrigger className="h-12 border-2 focus:border-primary transition-all bg-background/50">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Thumbnail Upload */}
          <Card className="border-0 shadow-xl bg-card/70 backdrop-blur-xl overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Course Thumbnail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleThumbnailSelect}
                className="hidden"
              />
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative border-2 border-dashed border-primary/30 rounded-2xl p-8 text-center space-y-4 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group"
              >
                
                {courseData.basics.thumbnail ? (
                  <div className="relative space-y-4 z-10">
                    <img 
                      src={courseData.basics.thumbnail} 
                      alt="Thumbnail preview" 
                      className="w-full h-48 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-500"
                    />
                    <p className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
                      Click to change image
                    </p>
                  </div>
                ) : (
                  <div className="relative z-10 space-y-4">
                    <Upload className="w-16 h-16 text-muted-foreground mx-auto group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                    <div>
                      <p className="text-base font-semibold text-foreground mb-2">Upload course thumbnail</p>
                      <p className="text-xs text-muted-foreground">Recommended: 1280x720px (Max 5MB)</p>
                    </div>
                    <Button variant="outline" size="lg" type="button" className="border-primary/30 hover:bg-primary hover:text-primary-foreground">
                      Choose File
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );

  const renderStructureStep = () => (
    <div className="space-y-10">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        <div className="space-y-8">
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="sticky top-24 md:top-20 z-30 border-b border-border/50 bg-card/95 backdrop-blur-sm shadow-sm">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Settings className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-lg font-medium">Course Structure</span>
                </CardTitle>
                <Button onClick={addSection} size="sm" variant="outline" className="border-primary/20 hover:bg-primary hover:text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Section
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              {courseData.structure.sections.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-border/40 rounded-2xl bg-muted/20">
                  <div className="w-16 h-16 rounded-2xl bg-muted/40 flex items-center justify-center mx-auto mb-6">
                    <Settings className="w-8 h-8 text-muted-foreground/60" />
                  </div>
                  <h3 className="text-xl font-medium text-foreground mb-3">Start Building Your Course</h3>
                  <p className="text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
                    Organize your content into logical sections that guide students through their learning journey
                  </p>
                  <Button onClick={addSection} className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Section
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {courseData.structure.sections.map((section, index) => (
                    <Card key={section.id} id={section.id} className="border-l-4 border-l-primary/40 bg-background shadow-sm">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <Badge variant="secondary" className="bg-primary/10 text-primary font-medium">
                            Section {index + 1}
                          </Badge>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => deleteSection(section.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="space-y-3 mt-4">
                          <Input
                            placeholder="Enter section title..."
                            value={section.title}
                            onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                            className="text-lg font-medium border-0 px-0 bg-transparent focus-visible:ring-0 placeholder:text-muted-foreground/60"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <Textarea
                          placeholder="Describe what students will learn in this section..."
                          value={section.description}
                          onChange={(e) => updateSection(section.id, 'description', e.target.value)}
                          rows={2}
                          className="resize-none border-border/50 focus-visible:ring-1 focus-visible:ring-primary/20"
                        />
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium text-muted-foreground">Lessons</Label>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => addLesson(section.id)}
                              className="text-primary hover:bg-primary/10 h-8 px-3 text-sm"
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              Add Lesson
                            </Button>
                          </div>
                          
                          {section.lessons.length === 0 ? (
                            <div className="text-center py-8 border border-dashed border-border/40 rounded-xl bg-muted/10">
                              <p className="text-sm text-muted-foreground mb-3">No lessons yet</p>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addLesson(section.id)}
                                className="border-dashed border-primary/40 text-primary hover:bg-primary/10"
                              >
                                <Plus className="w-3 h-3 mr-1" />
                                Add First Lesson
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {section.lessons.map((lesson, lessonIndex) => (
                                <div key={lesson.id} className="group flex items-center space-x-3 p-4 bg-muted/20 hover:bg-muted/30 rounded-xl border border-transparent hover:border-border/40 transition-all">
                                  <div className="flex items-center space-x-3 flex-1">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                      <span className="text-xs font-medium text-primary">{lessonIndex + 1}</span>
                                    </div>
                                    <Input
                                      placeholder="Enter lesson title..."
                                      value={lesson.title}
                                      onChange={(e) => updateLesson(section.id, lesson.id, 'title', e.target.value)}
                                      className="border-0 bg-transparent focus-visible:ring-0 font-medium placeholder:text-muted-foreground/60"
                                    />
                                  </div>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => deleteLesson(section.id, lesson.id)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="border-b border-border/50 bg-card/50">
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-accent" />
                </div>
                <span className="text-lg font-medium">Visual Course Flow</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[28rem] border border-border/40 rounded-xl overflow-hidden bg-muted/10">
                <CourseStructureFlow sections={courseData.structure.sections} />
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );

  const renderContentStep = () => {
    // Convert lesson structure to content structure for the new system
    const sectionsWithContent = courseData.structure.sections.map(section => ({
      ...section,
      lessons: section.lessons.map(lesson => ({
        id: lesson.id,
        title: lesson.title,
        description: lesson.description || "",
        contentItems: lesson.contentItems || [],
        isPublished: lesson.isPublished || false,
        estimatedDuration: lesson.estimatedDuration || 0,
      }))
    }));

    return (
      <ContentCreationStep 
        sections={sectionsWithContent}
        onUpdateSections={(updatedSections) => {
          setCourseData(prev => ({
            ...prev,
            structure: { sections: updatedSections }
          }));
        }}
      />
    );
  };

  const renderPricingStep = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <span>Pricing Strategy</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Course Price *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="price"
                    type="number"
                    placeholder="99"
                    value={courseData.pricing.price}
                    onChange={(e) => updateCourseData("pricing", { price: Number(e.target.value) })}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={courseData.pricing.currency} onValueChange={(value) => updateCourseData("pricing", { currency: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="freePreview">Free Preview</Label>
                  <p className="text-sm text-muted-foreground">Allow students to preview some lessons</p>
                </div>
                <Switch
                  id="freePreview"
                  checked={courseData.pricing.freePreview}
                  onCheckedChange={(checked) => updateCourseData("pricing", { freePreview: checked })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <span>Access Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="enrollmentLimit">Enrollment Limit</Label>
              <Input
                id="enrollmentLimit"
                type="number"
                placeholder="0 for unlimited"
                value={courseData.settings.enrollmentLimit}
                onChange={(e) => updateCourseData("settings", { enrollmentLimit: Number(e.target.value) })}
              />
              <p className="text-xs text-muted-foreground">Leave 0 for unlimited enrollment</p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="certificate">Certificate of Completion</Label>
                <p className="text-sm text-muted-foreground">Students receive a certificate when they complete the course</p>
              </div>
              <Switch
                id="certificate"
                checked={courseData.settings.certificateEnabled}
                onCheckedChange={(checked) => updateCourseData("settings", { certificateEnabled: checked })}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Course Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{courseData.basics.title || "Untitled Course"}</h3>
              <p className="text-muted-foreground">{courseData.basics.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Category:</span>
                <p className="font-medium">{courseData.basics.category || "Not selected"}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Level:</span>
                <p className="font-medium">{courseData.basics.level || "Not selected"}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Sections:</span>
                <p className="font-medium">{courseData.structure.sections.length}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Price:</span>
                <p className="font-medium">${courseData.pricing.price}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Publishing Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
            <Button 
                size="lg" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => publishCourse(true)}
                disabled={isPublishing}
              >
                <Globe className="w-5 h-5 mr-2" />
                {isPublishing ? "Publishing..." : "Publish Course"}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
                onClick={saveDraft}
                disabled={isPublishing}
              >
                <Eye className="w-5 h-5 mr-2" />
                Save as Draft
              </Button>
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>By publishing, you agree to our course quality guidelines and content policy.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return renderBasicsStep();
      case 2: return renderStructureStep();
      case 3: return renderContentStep();
      case 4: return renderPricingStep();
      case 5: return renderReviewStep();
      default: return renderBasicsStep();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/[0.02] to-accent/[0.03] relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative container-custom py-8 max-w-[1400px]">
        {/* Modern Floating Header with Glassmorphism */}
        <div className="mb-8 animate-fade-in">
          <Button
            variant="ghost"
            onClick={() => navigate("/instructor/courses")}
            className="mb-6 hover:bg-primary/5 group transition-all"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to My Courses
          </Button>
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-xl">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold text-foreground">
                Create Your Course
              </h1>
              <p className="text-lg text-muted-foreground flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Build something amazing that students will love
              </p>
            </div>
            
            {/* Stats Pills */}
            <div className="flex gap-3">
              <div className="bg-primary/10 border border-primary/20 rounded-2xl px-6 py-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-2xl font-bold text-primary">{currentStep}/{steps.length}</div>
                    <div className="text-xs text-muted-foreground">Steps</div>
                  </div>
                </div>
              </div>
              <div className="bg-primary/10 border border-primary/20 rounded-2xl px-6 py-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-2xl font-bold text-primary">{Math.round(getStepProgress())}%</div>
                    <div className="text-xs text-muted-foreground">Complete</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ultra-Modern Interactive Progress Steps */}
        <Card className="mb-10 overflow-hidden border-0 shadow-2xl bg-card/70 backdrop-blur-2xl animate-fade-in">
          <CardContent className="p-10">
            <div className="relative">
              {/* Progress Background */}
              <div className="absolute top-12 left-12 right-12 h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${getStepProgress()}%` }}
                />
              </div>

              {/* Interactive Step Indicators */}
              <div className="relative flex justify-between">
                {steps.map((step) => {
                  const StepIcon = step.icon;
                  const isCompleted = currentStep > step.id;
                  const isCurrent = currentStep === step.id;
                  const isHovered = hoveredStep === step.id;
                  
                  return (
                    <div 
                      key={step.id} 
                      className="flex flex-col items-center cursor-pointer group relative z-10"
                      onClick={() => setCurrentStep(step.id)}
                      onMouseEnter={() => setHoveredStep(step.id)}
                      onMouseLeave={() => setHoveredStep(null)}
                    >
                      
                      {/* Step Icon Container */}
                      <div 
                        className={`
                          relative w-24 h-24 rounded-3xl flex items-center justify-center mb-5 transition-all duration-500 transform
                          ${isCompleted ? 'bg-primary text-primary-foreground shadow-xl scale-100' : ''}
                          ${isCurrent ? 'bg-primary text-primary-foreground shadow-xl scale-110' : ''}
                          ${!isCompleted && !isCurrent ? 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:scale-105' : ''}
                          ${isHovered && !isCurrent && !isCompleted ? 'scale-105' : ''}
                        `}
                      >
                        
                        {/* Icon */}
                        {isCompleted ? (
                          <Check className="w-9 h-9" strokeWidth={3} />
                        ) : (
                          <StepIcon className="w-9 h-9" strokeWidth={2} />
                        )}
                        
                        {/* Step Number Badge */}
                        <div className={`
                          absolute -top-2 -right-2 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shadow-lg transition-all duration-300
                          ${isCurrent ? 'bg-primary text-primary-foreground scale-110' : 'bg-background text-muted-foreground border-2 border-border'}
                        `}>
                          {step.id}
                        </div>

                        {/* Completion Checkmark Badge */}
                        {isCompleted && (
                          <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      
                      {/* Step Info */}
                      <div className="text-center max-w-[160px]">
                        <p className={`
                          text-sm font-bold mb-1 transition-all duration-300
                          ${isCurrent ? 'text-primary scale-105' : 'text-foreground'}
                          ${isHovered && !isCurrent ? 'text-primary scale-105' : ''}
                        `}>
                          {step.name}
                        </p>
                        <p className={`
                          text-xs transition-colors hidden md:block leading-relaxed
                          ${isCurrent ? 'text-primary/80 font-medium' : 'text-muted-foreground'}
                        `}>
                          {step.description}
                        </p>
                      </div>

                      {/* Interactive Hover Tooltip */}
                      {isHovered && !isCurrent && (
                        <div className="absolute -bottom-10 bg-popover text-popover-foreground px-4 py-2 rounded-xl text-xs font-medium shadow-xl border border-border z-50">
                          <div className="flex items-center gap-2">
                            <ArrowRight className="w-3 h-3 text-primary" />
                            Jump to this step
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step Content with Smooth Animation */}
        <div className="mb-32 animate-fade-in">
          {renderStepContent()}
        </div>

        {/* Floating Action Bar */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4">
          <Card className="border-0 shadow-xl bg-card/95 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                {/* Previous Button */}
                {currentStep > 1 && (
                  <Button 
                    variant="outline"
                    onClick={prevStep}
                    disabled={isPublishing}
                    className="group hover:bg-primary/5 hover:border-primary/30 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden sm:inline">Back</span>
                  </Button>
                )}

                {/* Save Draft Button */}
                <Button 
                  variant="ghost"
                  onClick={() => saveDraft()}
                  disabled={isPublishing}
                  className="hover:bg-primary/5 flex items-center gap-2 transition-all"
                >
                  <Clock className="w-4 h-4" />
                  <span className="hidden sm:inline">Save Draft</span>
                </Button>

                {/* Main CTA Button */}
                <Button
                  onClick={() => {
                    if (currentStep === steps.length) {
                      publishCourse(true);
                    } else {
                      nextStep();
                    }
                  }}
                  disabled={isPublishing}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 transition-all h-14"
                  size="lg"
                >
                  <div className="flex items-center justify-center gap-2">
                    {currentStep === steps.length ? (
                      <>
                        {isPublishing ? (
                          <>
                            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            <span className="font-semibold">Publishing Your Course...</span>
                          </>
                        ) : (
                          <>
                            <Globe className="w-5 h-5" />
                            <span className="font-bold text-lg">Publish Course</span>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <span className="font-semibold">Continue to {steps[currentStep]?.name}</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}