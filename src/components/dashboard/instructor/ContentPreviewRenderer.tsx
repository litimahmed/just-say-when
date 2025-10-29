import { Play, FileText, HelpCircle, BookCheck, Clock, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ContentItem, VideoContentData, TextContentData, QuizContentData, AssignmentContentData } from './ContentTypes';
import { LessonTheme } from '@/stores/lessonContentStore';

interface ContentPreviewRendererProps {
  title: string;
  description: string;
  content: ContentItem[];
  theme: LessonTheme | null;
  scale: number;
}

export function ContentPreviewRenderer({ title, description, content, theme, scale }: ContentPreviewRendererProps) {
  const renderVideoContent = (item: ContentItem, data: VideoContentData) => (
    <div className="mb-8">
      <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden">
        <div className="aspect-video bg-muted/20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
              <Play className="w-8 h-8 text-primary" />
            </div>
            {data.duration > 0 && (
              <p className="text-sm text-muted-foreground">{data.duration} minutes</p>
            )}
          </div>
        </div>
        {data.hasTranscript && (
          <div className="p-4 border-t border-border/50 bg-muted/20">
            <p className="text-sm text-muted-foreground flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Transcript available
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderTextContent = (item: ContentItem, data: TextContentData) => (
    <div className="mb-8">
      <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6">
        {data.content ? (
          <div 
            className="preview-content"
            dangerouslySetInnerHTML={{ __html: data.content }} 
            style={{
              '--preview-foreground': 'hsl(var(--foreground))',
              '--preview-muted-foreground': 'hsl(var(--muted-foreground))',
              '--preview-primary': 'hsl(var(--primary))',
              '--preview-muted': 'hsl(var(--muted))',
              '--preview-border': 'hsl(var(--border))'
            } as React.CSSProperties}
          />
        ) : (
          <p className="text-muted-foreground italic">Content will appear here...</p>
        )}
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
          .preview-content h1 {
            font-size: 2.25rem !important;
            font-weight: 700 !important;
            font-family: "Poppins", sans-serif !important;
            color: hsl(var(--foreground)) !important;
            margin-bottom: 1.5rem !important;
            margin-top: 2rem !important;
            line-height: 1.2 !important;
          }
          .preview-content h2 {
            font-size: 1.875rem !important;
            font-weight: 700 !important;
            font-family: "Poppins", sans-serif !important;
            color: hsl(var(--foreground)) !important;
            margin-bottom: 1.25rem !important;
            margin-top: 1.75rem !important;
            line-height: 1.3 !important;
          }
          .preview-content h3 {
            font-size: 1.5rem !important;
            font-weight: 600 !important;
            font-family: "Poppins", sans-serif !important;
            color: hsl(var(--foreground)) !important;
            margin-bottom: 1rem !important;
            margin-top: 1.5rem !important;
            line-height: 1.4 !important;
          }
          .preview-content p {
            font-size: 1.125rem !important;
            font-family: "Source Sans 3", sans-serif !important;
            color: hsl(var(--foreground)) !important;
            line-height: 1.75 !important;
            margin-bottom: 1rem !important;
            font-weight: 400 !important;
          }
          .preview-content ul {
            list-style-type: disc !important;
            margin-left: 1.5rem !important;
            margin-bottom: 1rem !important;
          }
          .preview-content ol {
            list-style-type: decimal !important;
            margin-left: 1.5rem !important;
            margin-bottom: 1rem !important;
          }
          .preview-content li {
            font-size: 1.125rem !important;
            font-family: "Source Sans 3", sans-serif !important;
            color: hsl(var(--foreground)) !important;
            line-height: 1.75 !important;
            margin-bottom: 0.5rem !important;
          }
          .preview-content blockquote {
            border-left: 4px solid hsl(var(--primary)) !important;
            padding-left: 1rem !important;
            margin: 1rem 0 !important;
            font-style: italic !important;
            background: hsl(var(--muted)) !important;
            border-radius: 0.375rem !important;
            padding: 1rem !important;
          }
          .preview-content blockquote p {
            margin-bottom: 0 !important;
            color: hsl(var(--muted-foreground)) !important;
          }
          .preview-content pre {
            background: #1a1b26 !important;
            border: 1px solid #313244 !important;
            border-radius: 0.75rem !important;
            padding: 1.5rem !important;
            overflow-x: auto !important;
            margin: 1.5rem 0 !important;
            font-family: "JetBrains Mono", "Fira Code", Consolas, "Courier New", monospace !important;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2) !important;
          }
          .preview-content code {
            font-family: "JetBrains Mono", "Fira Code", Consolas, "Courier New", monospace !important;
            font-size: 0.9rem !important;
          }
          .preview-content pre code {
            color: #eef0f9 !important;
            background: transparent !important;
            padding: 0 !important;
            line-height: 1.6 !important;
          }
          .preview-content .hljs {
            background: #1a1b26 !important;
            color: #eef0f9 !important;
            padding: 0 !important;
          }
          .preview-content .hljs-keyword {
            color: #54b9ff !important;
            font-weight: 600 !important;
          }
          .preview-content .hljs-string {
            color: #4bf3c8 !important;
          }
          .preview-content .hljs-number {
            color: #ffd493 !important;
          }
          .preview-content .hljs-built_in {
            color: #00daef !important;
          }
          .preview-content .hljs-function {
            color: #00daef !important;
            font-weight: 600 !important;
          }
          .preview-content .hljs-comment {
            color: #545864 !important;
            font-style: italic !important;
          }
          .preview-content .hljs-variable {
            color: #eef0f9 !important;
          }
          .preview-content .hljs-attr {
            color: #4bf3c8 !important;
          }
          .preview-content .hljs-property {
            color: #4bf3c8 !important;
          }
          .preview-content .hljs-name {
            color: #acafff !important;
          }
          .preview-content .hljs-title {
            color: #acafff !important;
            font-weight: 600 !important;
          }
          .preview-content .hljs-literal {
            color: #ffd493 !important;
          }
          .preview-content .hljs-params {
            color: #eef0f9 !important;
          }
          .preview-content .hljs-operator {
            color: #eef0f9 !important;
          }
          .preview-content .hljs-punctuation {
            color: #eef0f9 !important;
          }
          .preview-content .hljs-tag {
            color: #54b9ff !important;
          }
          .preview-content .hljs-type {
            color: #acafff !important;
          }
          .preview-content code:not(pre code) {
            background: hsl(var(--muted)) !important;
            padding: 0.125rem 0.25rem !important;
            border-radius: 0.25rem !important;
            color: hsl(var(--foreground)) !important;
            font-size: 0.875rem !important;
          }
          .preview-content a {
            color: hsl(var(--primary)) !important;
            text-decoration: underline !important;
          }
          .preview-content a:hover {
            color: hsl(var(--primary)) !important;
            opacity: 0.8 !important;
          }
          .preview-content img {
            max-width: 100% !important;
            height: auto !important;
            border-radius: 0.5rem !important;
            margin: 1rem 0 !important;
          }
          .preview-content h1:first-child {
            margin-top: 0 !important;
          }
        `
      }} />
    </div>
  );

  const renderQuizContent = (item: ContentItem, data: QuizContentData) => (
    <div className="mb-8">
      <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">{data.questions.length} Questions</Badge>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">Passing: {data.passingScore}%</Badge>
              {data.allowRetakes && <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">Retakes Allowed</Badge>}
            </div>
          </div>
          
          {data.questions.length === 0 ? (
            <p className="text-muted-foreground italic">Quiz questions will appear here...</p>
          ) : (
            <div className="space-y-3">
              {data.questions.slice(0, 2).map((question, index) => (
                <div key={question.id} className="p-4 bg-background/50 border border-border/30 rounded-lg">
                  <p className="font-medium text-foreground mb-3">{index + 1}. {question.question}</p>
                  {question.type === 'multiple-choice' && question.options && (
                    <div className="space-y-2">
                      {question.options.slice(0, 2).map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-3">
                          <div className="w-4 h-4 border-2 border-border/50 rounded-sm bg-background/30" />
                          <span className="text-sm text-foreground/80">{option}</span>
                        </div>
                      ))}
                      {question.options.length > 2 && (
                        <p className="text-xs text-muted-foreground mt-2">... and {question.options.length - 2} more options</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {data.questions.length > 2 && (
                <p className="text-sm text-muted-foreground text-center">... and {data.questions.length - 2} more questions</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderAssignmentContent = (item: ContentItem, data: AssignmentContentData) => (
    <div className="mb-8">
      <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6">
        <div className="space-y-4">
          {data.description ? (
            <p className="text-foreground/90">{data.description}</p>
          ) : (
            <p className="text-muted-foreground italic">Assignment description will appear here...</p>
          )}
          
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              {data.submissionType === 'file' ? 'File Upload' : 
               data.submissionType === 'text' ? 'Text Submission' : 'File + Text'}
            </Badge>
            {data.dueDate && (
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Clock className="w-3 h-3 mr-1" />
                Due: {new Date(data.dueDate).toLocaleDateString()}
              </Badge>
            )}
          </div>
          
          {data.allowedFileTypes && data.allowedFileTypes.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2 text-foreground">Allowed file types:</p>
              <div className="flex flex-wrap gap-1">
                {data.allowedFileTypes.map((type) => (
                  <Badge key={type} variant="secondary" className="text-xs bg-background/50 text-foreground/80 border-border/30">
                    .{type}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );


  const renderContentItem = (item: ContentItem) => {
    switch (item.type) {
      case 'video':
        return renderVideoContent(item, item.data as VideoContentData);
      case 'text':
        return renderTextContent(item, item.data as TextContentData);
      case 'quiz':
        return renderQuizContent(item, item.data as QuizContentData);
      case 'assignment':
        return renderAssignmentContent(item, item.data as AssignmentContentData);
      default:
        return (
          <div className="mb-8">
            <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-xl p-6 text-center">
              <p className="text-muted-foreground">Unknown content type: {item.type}</p>
            </div>
          </div>
        );
    }
  };

  const getThemeStyles = () => {
    if (!theme) return 'bg-background';
    
    switch (theme.layout) {
      case 'video-first':
        return 'bg-gradient-to-b from-primary/5 to-background';
      case 'text-resources':
        return 'bg-gradient-to-b from-secondary/5 to-background';
      case 'quiz-centered':
        return 'bg-gradient-to-b from-accent/5 to-background';
      case 'mixed-content':
        return 'bg-gradient-to-b from-muted/30 to-background';
      case 'interactive':
        return 'bg-gradient-to-b from-primary/3 to-background';
      default:
        return 'bg-background';
    }
  };

  return (
    <div className={`min-h-full ${getThemeStyles()} relative`}>
      {/* Simple Header with Just Title */}
      <div className="relative border-b border-border/20">
        <div className="p-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground">
              {title || 'Untitled Lesson'}
            </h1>
            {description && (
              <p className="text-muted-foreground mt-2 text-lg">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Content Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent" />
        <div className="relative p-10">
          <div className="max-w-5xl mx-auto">
            {content.length === 0 ? (
              <div className="text-center py-20">
                <div className="relative mb-8">
                  <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-muted/40 to-muted/60 flex items-center justify-center backdrop-blur-sm border border-border/20 shadow-lg">
                    <FileText className="w-12 h-12 text-muted-foreground/60" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-full opacity-60 animate-pulse" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">No Content Added Yet</h3>
                <p className="text-muted-foreground text-lg font-light max-w-md mx-auto leading-relaxed">
                  Start building your lesson by adding content items. Your preview will appear here in real-time.
                </p>
                <div className="mt-8 flex justify-center">
                  <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                    <span className="text-sm font-medium text-primary">Waiting for content...</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-10">
                {content.map((item, index) => (
                  <div key={item.id}>
                    {renderContentItem(item)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}