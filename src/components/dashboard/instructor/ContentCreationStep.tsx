import { useState, useEffect } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Plus, GripVertical, Edit, Trash2, Eye, Video, FileText, HelpCircle, BookCheck, Link, Upload, MoreVertical, Palette, Play, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ContentItem, LessonWithContent, ContentType } from "./ContentTypes";
import { ContentItemEditor } from "./ContentItemEditor";
import { ThemeSelector } from "./ThemeSelector";
import { FloatingPreview } from "./FloatingPreview";
import { useLessonContentStore, themes, LessonTheme } from "@/stores/lessonContentStore";

interface Section {
  id: string;
  title: string;
  description: string;
  lessons: LessonWithContent[];
  isExpanded: boolean;
}

interface ContentCreationStepProps {
  sections: Section[];
  onUpdateSections: (sections: Section[]) => void;
}

function SortableContentItem({ item, onEdit, onDelete }: { item: ContentItem; onEdit: () => void; onDelete: () => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getIcon = (type: ContentType) => {
    switch (type) {
      case "video": return Video;
      case "text": return FileText;
      case "quiz": return HelpCircle;
      case "assignment": return BookCheck;
      case "transcript": return MessageSquare;
      default: return FileText;
    }
  };

  const getTypeGradient = (type: ContentType) => {
    switch (type) {
      case "video": return "bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-400/30 shadow-lg shadow-blue-500/10";
      case "text": return "bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border border-emerald-400/30 shadow-lg shadow-emerald-500/10";
      case "quiz": return "bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-400/30 shadow-lg shadow-purple-500/10";
      case "assignment": return "bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-400/30 shadow-lg shadow-orange-500/10";
      case "transcript": return "bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/30 shadow-lg shadow-cyan-500/10";
      default: return "bg-gradient-to-br from-gray-500/20 to-slate-600/20 border border-gray-400/30 shadow-lg shadow-gray-500/10";
    }
  };

  const Icon = getIcon(item.type);

  return (
    <div ref={setNodeRef} style={style} className="group">
      <Card className="relative overflow-hidden bg-gradient-to-br from-card/80 to-card border border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <CardContent className="relative p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div
                className="cursor-grab active:cursor-grabbing p-2 rounded-lg hover:bg-primary/10 transition-colors duration-200"
                {...attributes}
                {...listeners}
              >
                <GripVertical className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
              </div>
              
              <div className={`relative p-4 rounded-2xl ${getTypeGradient(item.type)} backdrop-blur-sm transform hover:scale-105 transition-transform duration-200`}>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent"></div>
                <Icon className="relative w-6 h-6 text-foreground drop-shadow-lg" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-base text-foreground mb-1 truncate">{item.title || "Untitled Content"}</p>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant="secondary" 
                    className="text-xs px-2 py-1 bg-primary/10 text-primary border-primary/20 font-medium"
                  >
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </Badge>
                  <div className="h-1 w-1 rounded-full bg-muted-foreground/30"></div>
                  <span className="text-xs text-muted-foreground">Content Item</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onEdit}
                className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onDelete} 
                className="h-9 w-9 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ContentTemplateSelector({ onSelectTemplate, onClose }: { onSelectTemplate: (items: Partial<ContentItem>[]) => void; onClose: () => void }) {
  const templates = [
    {
      name: "Video + Transcript",
      description: "Video lesson with accompanying transcript",
      items: [
        { type: "video" as ContentType, title: "Main Video" },
        { type: "transcript" as ContentType, title: "Video Transcript" },
      ],
    },
    {
      name: "Text + External Links",
      description: "Article with supporting external resources",
      items: [
        { type: "text" as ContentType, title: "Main Article" },
      ],
    },
    {
      name: "Quiz + Reading Material",
      description: "Text content followed by assessment",
      items: [
        { type: "text" as ContentType, title: "Study Material" },
        { type: "quiz" as ContentType, title: "Knowledge Check" },
      ],
    },
    {
      name: "Complete Lesson",
      description: "Video, text, and quiz combination",
      items: [
        { type: "video" as ContentType, title: "Video Lesson" },
        { type: "text" as ContentType, title: "Lesson Notes" },
        { type: "quiz" as ContentType, title: "Lesson Quiz" },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template, index) => (
          <Card key={index} className="cursor-pointer hover:border-primary/20 transition-colors" onClick={() => onSelectTemplate(template.items)}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{template.name}</CardTitle>
              <p className="text-xs text-muted-foreground">{template.description}</p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1">
                {template.items.map((item, itemIndex) => (
                  <Badge key={itemIndex} variant="outline" className="text-xs">
                    {item.type}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center pt-4 border-t">
        <Button variant="ghost" onClick={onClose}>
          Or create custom content
        </Button>
      </div>
    </div>
  );
}

export function ContentCreationStep({ sections, onUpdateSections }: ContentCreationStepProps) {
  const [editingContent, setEditingContent] = useState<{ lessonId: string; item?: ContentItem } | null>(null);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState<string>("");
  
  const {
    currentLesson,
    selectedTheme,
    isPreviewOpen,
    setCurrentLesson,
    setSelectedTheme,
    updatePreviewData,
    togglePreview,
  } = useLessonContentStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any, sectionId: string, lessonId: string) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const updatedSections = sections.map(section => {
        if (section.id === sectionId) {
          const lesson = section.lessons.find(l => l.id === lessonId);
          if (lesson) {
            const oldIndex = lesson.contentItems.findIndex(item => item.id === active.id);
            const newIndex = lesson.contentItems.findIndex(item => item.id === over.id);
            
            const newContentItems = arrayMove(lesson.contentItems, oldIndex, newIndex);
            
            return {
              ...section,
              lessons: section.lessons.map(l => 
                l.id === lessonId 
                  ? { ...l, contentItems: newContentItems }
                  : l
              )
            };
          }
        }
        return section;
      });
      
      onUpdateSections(updatedSections);
    }
  };

  const addContentToLesson = (lessonId: string, contentItems: ContentItem[]) => {
    const updatedSections = sections.map(section => ({
      ...section,
      lessons: section.lessons.map(lesson => 
        lesson.id === lessonId
          ? { ...lesson, contentItems: [...lesson.contentItems, ...contentItems] }
          : lesson
      )
    }));
    
    onUpdateSections(updatedSections);
  };

  const updateContentItem = (lessonId: string, updatedItem: ContentItem) => {
    const updatedSections = sections.map(section => ({
      ...section,
      lessons: section.lessons.map(lesson => 
        lesson.id === lessonId
          ? {
              ...lesson,
              contentItems: lesson.contentItems.map(item => 
                item.id === updatedItem.id ? updatedItem : item
              )
            }
          : lesson
      )
    }));
    
    onUpdateSections(updatedSections);
  };

  const deleteContentItem = (lessonId: string, itemId: string) => {
    const updatedSections = sections.map(section => ({
      ...section,
      lessons: section.lessons.map(lesson => 
        lesson.id === lessonId
          ? {
              ...lesson,
              contentItems: lesson.contentItems.filter(item => item.id !== itemId)
            }
          : lesson
      )
    }));
    
    onUpdateSections(updatedSections);
  };

  const handleThemeSelect = (theme: LessonTheme) => {
    setSelectedTheme(theme);
    
    // Create content items from theme defaults
    const contentItems: ContentItem[] = theme.defaultContent.map((item, index) => ({
      id: `content-${Date.now()}-${index}`,
      type: item.type!,
      title: item.title || "",
      order: index,
      data: item.type === "video" ? { duration: 0, hasTranscript: false } : 
            item.type === "text" ? { content: "", formatting: "html" as const } :
            item.type === "quiz" ? { questions: [], passingScore: 70, allowRetakes: true } :
            item.type === "assignment" ? { description: "", submissionType: "both" as const, allowedFileTypes: [] } :
            { videoId: "", content: "", timestamps: [] },
    }));
    
    // Add content to the lesson
    addContentToLesson(selectedLessonId, contentItems);
    
    // Open the preview automatically
    if (!isPreviewOpen) {
      togglePreview();
    }
    
    // Update preview data with the new content
    const currentLessonData = sections
      .flatMap(s => s.lessons)
      .find(l => l.id === selectedLessonId);
    
    if (currentLessonData) {
      updatePreviewData({
        title: currentLessonData.title,
        description: currentLessonData.description,
        content: [...currentLessonData.contentItems, ...contentItems],
      });
    }
    
    setShowThemeSelector(false);
  };

  const handleLessonSelect = (lesson: LessonWithContent) => {
    setCurrentLesson(lesson);
    updatePreviewData({
      title: lesson.title,
      description: lesson.description,
      content: lesson.contentItems,
    });
  };

  // Sync content changes to preview
  useEffect(() => {
    if (currentLesson) {
      const updatedLesson = sections
        .flatMap(s => s.lessons)
        .find(l => l.id === currentLesson.id);
      
      if (updatedLesson) {
        updatePreviewData({
          title: updatedLesson.title,
          description: updatedLesson.description,
          content: updatedLesson.contentItems,
        });
      }
    }
  }, [sections, currentLesson, updatePreviewData]);

  const bulkUpload = () => {
    // TODO: Implement bulk upload functionality
    console.log("Bulk upload feature");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 border border-border/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/2 to-transparent"></div>
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center shadow-lg shadow-primary/10">
                  <Palette className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Content Studio
                  </h2>
                  <p className="text-muted-foreground text-lg">Create immersive learning experiences with AI-powered themes</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                onClick={bulkUpload}
                className="h-12 px-6 rounded-xl border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
              >
                <Upload className="w-5 h-5 mr-2" />
                Bulk Upload
              </Button>
              <Button 
                variant={isPreviewOpen ? "default" : "outline"} 
                onClick={togglePreview}
                className={`h-12 px-6 rounded-xl transition-all duration-300 ${
                  isPreviewOpen 
                    ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/20" 
                    : "border-border/50 hover:border-primary/30 hover:bg-primary/5"
                }`}
              >
                <Play className="w-5 h-5 mr-2" />
                {isPreviewOpen ? "Preview Active" : "Launch Preview"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {sections.map((section) => (
          <Card key={section.id} className="relative overflow-hidden bg-gradient-to-br from-card/60 to-card border border-border/30 shadow-lg shadow-black/5 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-secondary/2"></div>
            <CardHeader className="relative border-b border-border/30 bg-gradient-to-r from-muted/30 to-transparent">
              <CardTitle className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xl font-semibold">{section.title || "Untitled Section"}</span>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  {section.lessons.length} lessons
                </Badge>
              </CardTitle>
              {section.description && (
                <p className="text-muted-foreground ml-11">{section.description}</p>
              )}
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {section.lessons.map((lesson) => (
                <Card key={lesson.id} className="relative overflow-hidden bg-card border-l-4 border-l-primary/50 rounded-l-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/1 to-transparent"></div>
                  <CardHeader className="relative">
                    <div className="flex items-center justify-between">
                      <div 
                        className="flex-1 cursor-pointer group" 
                        onClick={() => handleLessonSelect(lesson)}
                      >
                        <CardTitle className="text-xl flex items-center space-x-3 group-hover:text-primary/80 transition-colors">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center shadow-lg shadow-primary/10">
                            <BookCheck className="w-5 h-5 text-primary" />
                          </div>
                          <span>{lesson.title || "Untitled Lesson"}</span>
                          {currentLesson?.id === lesson.id && (
                            <Badge variant="default" className="bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/20">
                              Active
                            </Badge>
                          )}
                        </CardTitle>
                        <div className="flex items-center space-x-4 mt-3 ml-13">
                          <Badge variant="outline" className="bg-muted/50 border-border/50">
                            {lesson.contentItems.length} content items
                          </Badge>
                          <Badge variant={lesson.isPublished ? "default" : "secondary"} className={lesson.isPublished ? "bg-emerald-500/20 text-emerald-700 border-emerald-400/30" : ""}>
                            {lesson.isPublished ? "Published" : "Draft"}
                          </Badge>
                          {selectedTheme && currentLesson?.id === lesson.id && (
                            <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">
                              <Palette className="w-3 h-3 mr-1" />
                              {selectedTheme.name}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200">
                            <MoreVertical className="w-5 h-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuItem onClick={() => {
                            setSelectedLessonId(lesson.id);
                            handleLessonSelect(lesson);
                            setShowThemeSelector(true);
                          }} className="cursor-pointer">
                            <Palette className="w-4 h-4 mr-2" />
                            Choose Theme
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            handleLessonSelect(lesson);
                            if (!isPreviewOpen) togglePreview();
                          }} className="cursor-pointer">
                            <Eye className="w-4 h-4 mr-2" />
                            Preview Lesson
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative">
                    {lesson.contentItems.length === 0 ? (
                      <div className="text-center py-12 border-2 border-dashed border-border/40 rounded-2xl bg-gradient-to-br from-muted/20 to-transparent backdrop-blur-sm">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center shadow-lg shadow-primary/10">
                          <FileText className="w-8 h-8 text-primary" />
                        </div>
                        <p className="text-lg font-semibold text-foreground mb-2">No content added yet</p>
                        <p className="text-muted-foreground mb-6">Add videos, articles, quizzes, and more to build your lesson</p>
                        <div className="flex justify-center space-x-3">
                          <Button size="lg" onClick={() => {
                            setSelectedLessonId(lesson.id);
                            handleLessonSelect(lesson);
                            setShowThemeSelector(true);
                          }} className="h-12 px-6 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-all duration-300">
                            <Palette className="w-5 h-5 mr-2" />
                            Choose Theme
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={(event) => handleDragEnd(event, section.id, lesson.id)}
                      >
                        <SortableContext items={lesson.contentItems} strategy={verticalListSortingStrategy}>
                          <div className="space-y-4">
                            {lesson.contentItems.map((item) => (
                              <SortableContentItem
                                key={item.id}
                                item={item}
                                onEdit={() => setEditingContent({ lessonId: lesson.id, item })}
                                onDelete={() => deleteContentItem(lesson.id, item.id)}
                              />
                            ))}
                          </div>
                        </SortableContext>
                      </DndContext>
                    )}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Item Editor */}
      {editingContent && (
        <ContentItemEditor
          isOpen={!!editingContent}
          onClose={() => setEditingContent(null)}
          contentItem={editingContent.item}
          lessonId={editingContent.lessonId}
          onSave={(item) => {
            updateContentItem(editingContent.lessonId, item);
            setEditingContent(null);
          }}
        />
      )}

      {/* Theme Selector */}
      <ThemeSelector
        isOpen={showThemeSelector}
        onClose={() => setShowThemeSelector(false)}
        onSelectTheme={handleThemeSelect}
        currentTheme={selectedTheme}
      />

      {/* Floating Preview */}
      <FloatingPreview />
    </div>
  );
}