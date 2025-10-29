export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  order: number;
  data: VideoContentData | TextContentData | TranscriptContentData | QuizContentData | AssignmentContentData;
}

export type ContentType = "video" | "text" | "transcript" | "quiz" | "assignment";

export interface VideoContentData {
  url?: string;
  file?: File;
  duration: number;
  thumbnailUrl?: string;
  hasTranscript: boolean;
  transcriptId?: string;
}

export interface TextContentData {
  content: string;
  formatting: "html" | "markdown";
}

export interface TranscriptContentData {
  videoId: string;
  content: string;
  timestamps?: Array<{ time: number; text: string }>;
}

export interface QuizContentData {
  questions: QuizQuestion[];
  passingScore: number;
  allowRetakes: boolean;
  timeLimit?: number;
}

export interface QuizQuestion {
  id: string;
  type: "multiple-choice" | "true-false" | "short-answer";
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
}

export interface AssignmentContentData {
  description: string;
  submissionType: "file" | "text" | "both";
  allowedFileTypes?: string[];
  maxFileSize?: number;
  dueDate?: Date;
  gradingCriteria?: string;
}

export interface ExternalResourceData {
  url: string;
  title: string;
  description: string;
  resourceType: "website" | "document" | "video" | "article";
}

export interface LessonWithContent {
  id: string;
  title: string;
  description?: string;
  contentItems: ContentItem[];
  isPublished: boolean;
  estimatedDuration: number;
}