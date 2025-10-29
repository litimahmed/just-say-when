import { create } from 'zustand';
import { ContentItem, LessonWithContent } from '@/components/dashboard/instructor/ContentTypes';

export interface LessonTheme {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  layout: 'video-first' | 'text-resources' | 'quiz-centered' | 'mixed-content' | 'interactive';
  sections: {
    header: boolean;
    video: boolean;
    content: boolean;
    resources: boolean;
    quiz: boolean;
    assignments: boolean;
  };
  defaultContent: Partial<ContentItem>[];
}

interface LessonContentState {
  currentLesson: LessonWithContent | null;
  selectedTheme: LessonTheme | null;
  previewData: {
    title: string;
    description: string;
    content: ContentItem[];
  };
  isPreviewOpen: boolean;
  previewScale: number;
  previewPosition: { x: number; y: number };
  previewSize: { width: number; height: number };
  
  // Actions
  setCurrentLesson: (lesson: LessonWithContent | null) => void;
  setSelectedTheme: (theme: LessonTheme | null) => void;
  updatePreviewData: (data: Partial<{ title: string; description: string; content: ContentItem[] }>) => void;
  togglePreview: () => void;
  setPreviewScale: (scale: number) => void;
  setPreviewPosition: (position: { x: number; y: number }) => void;
  setPreviewSize: (size: { width: number; height: number }) => void;
  addContentItem: (item: ContentItem) => void;
  updateContentItem: (id: string, updates: Partial<ContentItem>) => void;
  removeContentItem: (id: string) => void;
  reorderContentItems: (startIndex: number, endIndex: number) => void;
}

export const themes: LessonTheme[] = [
  {
    id: 'video-centric',
    name: 'Video-Centric',
    description: 'Focus on visual learning with large video player and transcript',
    thumbnail: '/lovable-uploads/theme-video-centric.png',
    layout: 'video-first',
    sections: {
      header: true,
      video: true,
      content: false,
      resources: false,
      quiz: false,
      assignments: false,
    },
    defaultContent: [
      { type: 'video', title: 'Main Video Lesson' },
    ],
  },
  {
    id: 'reading-centric',
    name: 'Reading-Centric',
    description: 'Text-heavy lessons with rich content and optional resources',
    thumbnail: '/lovable-uploads/theme-reading-centric.png',
    layout: 'text-resources',
    sections: {
      header: true,
      video: false,
      content: true,
      resources: true,
      quiz: false,
      assignments: false,
    },
    defaultContent: [
      { type: 'text', title: 'Rich Text Article' },
    ],
  },
  {
    id: 'quiz-centric',
    name: 'Quiz-Centric',
    description: 'Assessment-focused with knowledge checks and evaluations',
    thumbnail: '/lovable-uploads/theme-quiz-centric.png',
    layout: 'quiz-centered',
    sections: {
      header: true,
      video: false,
      content: true,
      resources: false,
      quiz: true,
      assignments: false,
    },
    defaultContent: [
      { type: 'text', title: 'Instructions' },
      { type: 'quiz', title: 'Knowledge Assessment' },
    ],
  },
  {
    id: 'assignment-project',
    name: 'Assignment / Project',
    description: 'Practical exercises with instructions and submission areas',
    thumbnail: '/lovable-uploads/theme-assignment-project.png',
    layout: 'interactive',
    sections: {
      header: true,
      video: false,
      content: true,
      resources: true,
      quiz: false,
      assignments: true,
    },
    defaultContent: [
      { type: 'text', title: 'Project Instructions' },
      { type: 'assignment', title: 'Project Submission' },
    ],
  },
  {
    id: 'mixed-media',
    name: 'Mixed Media',
    description: 'Balanced lessons combining video, text, and assessments',
    thumbnail: '/lovable-uploads/theme-mixed-media.png',
    layout: 'mixed-content',
    sections: {
      header: true,
      video: true,
      content: true,
      resources: false,
      quiz: true,
      assignments: false,
    },
    defaultContent: [
      { type: 'video', title: 'Introduction Video' },
      { type: 'text', title: 'Article Content' },
      { type: 'quiz', title: 'Knowledge Checkpoint' },
    ],
  },
  {
    id: 'minimalist-micro',
    name: 'Minimalist / Micro-Lesson',
    description: 'Quick lessons with single content focus for microlearning',
    thumbnail: '/lovable-uploads/theme-minimalist-micro.png',
    layout: 'video-first',
    sections: {
      header: true,
      video: false,
      content: true,
      resources: false,
      quiz: false,
      assignments: false,
    },
    defaultContent: [
      { type: 'text', title: 'Quick Lesson Content' },
    ],
  },
  {
    id: 'case-study-scenario',
    name: 'Case Study / Scenario',
    description: 'Scenario-based learning with supporting media and discussions',
    thumbnail: '/lovable-uploads/theme-case-study.png',
    layout: 'mixed-content',
    sections: {
      header: true,
      video: true,
      content: true,
      resources: true,
      quiz: true,
      assignments: true,
    },
    defaultContent: [
      { type: 'text', title: 'Scenario Description' },
      { type: 'video', title: 'Supporting Media' },
      { type: 'text', title: 'Discussion Prompt' },
      { type: 'quiz', title: 'Reflection Questions' },
      { type: 'assignment', title: 'Applied Exercise' },
    ],
  },
];

export const useLessonContentStore = create<LessonContentState>((set, get) => ({
  currentLesson: null,
  selectedTheme: null,
  previewData: {
    title: '',
    description: '',
    content: [],
  },
  isPreviewOpen: false,
  previewScale: 1,
  previewPosition: { x: (window.innerWidth - 300) / 2, y: (window.innerHeight - 100) / 2 },
  previewSize: { width: 400, height: 600 },

  setCurrentLesson: (lesson) => {
    set({ currentLesson: lesson });
    if (lesson) {
      set({
        previewData: {
          title: lesson.title,
          description: lesson.description || '',
          content: lesson.contentItems,
        },
      });
    }
  },

  setSelectedTheme: (theme) => set({ selectedTheme: theme }),

  updatePreviewData: (data) =>
    set((state) => ({
      previewData: { ...state.previewData, ...data },
    })),

  togglePreview: () => set((state) => ({ isPreviewOpen: !state.isPreviewOpen })),

  setPreviewScale: (scale) => set({ previewScale: scale }),

  setPreviewPosition: (position) => set({ previewPosition: position }),

  setPreviewSize: (size) => set({ previewSize: size }),

  addContentItem: (item) =>
    set((state) => ({
      previewData: {
        ...state.previewData,
        content: [...state.previewData.content, item],
      },
    })),

  updateContentItem: (id, updates) =>
    set((state) => ({
      previewData: {
        ...state.previewData,
        content: state.previewData.content.map((item) =>
          item.id === id ? { ...item, ...updates } : item
        ),
      },
    })),

  removeContentItem: (id) =>
    set((state) => ({
      previewData: {
        ...state.previewData,
        content: state.previewData.content.filter((item) => item.id !== id),
      },
    })),

  reorderContentItems: (startIndex, endIndex) =>
    set((state) => {
      const newContent = [...state.previewData.content];
      const [removed] = newContent.splice(startIndex, 1);
      newContent.splice(endIndex, 0, removed);
      return {
        previewData: {
          ...state.previewData,
          content: newContent,
        },
      };
    }),
}));