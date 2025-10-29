import { addDays, subDays, addHours, setHours, setMinutes } from "date-fns";

export interface MockEvent {
  id: string;
  title: string;
  description?: string;
  startAt: Date;
  endAt: Date;
  type: "live" | "workshop" | "review" | "exam" | "deadline";
  locationType: "online" | "room" | "other";
  locationLabel: string;
  meetingUrl?: string;
  courseId: string;
  courseName: string;
  instructorId: string;
  instructor: string;
  instructorAvatar?: string;
  status: "scheduled" | "live" | "completed" | "canceled";
  hasConflict?: boolean;
  participants?: number;
}

const today = new Date();
const now = new Date();

export const mockEvents: MockEvent[] = [
  // Today's events
  {
    id: "1",
    title: "React Advanced Patterns",
    description: "Deep dive into advanced React patterns including render props, HOCs, and compound components.",
    startAt: setMinutes(setHours(today, 14), 0),
    endAt: setMinutes(setHours(today, 15), 30),
    type: "live",
    locationType: "online",
    locationLabel: "Online",
    meetingUrl: "https://meet.google.com/abc-def-ghi",
    courseId: "react-advanced",
    courseName: "Advanced React Development",
    instructorId: "sarah-wilson",
    instructor: "Dr. Sarah Wilson",
    instructorAvatar: "/api/placeholder/32/32",
    status: "scheduled",
    participants: 24
  },
  {
    id: "2",
    title: "Database Performance Workshop",
    description: "Hands-on workshop covering database optimization, indexing strategies, and query performance.",
    startAt: addDays(setMinutes(setHours(today, 10), 0), 1),
    endAt: addDays(setMinutes(setHours(today, 12), 0), 1),
    type: "workshop",
    locationType: "room",
    locationLabel: "Lab 301",
    courseId: "database-systems",
    courseName: "Database Systems",
    instructorId: "michael-chen",
    instructor: "Prof. Michael Chen",
    instructorAvatar: "/api/placeholder/32/32",
    status: "scheduled",
    participants: 16
  },
  {
    id: "3",
    title: "Code Review Session",
    description: "Collaborative code review session for recent project submissions.",
    startAt: addDays(setMinutes(setHours(today, 15), 30), 2),
    endAt: addDays(setMinutes(setHours(today, 16), 30), 2),
    type: "review",
    locationType: "online",
    locationLabel: "Online",
    meetingUrl: "https://zoom.us/j/123456789",
    courseId: "software-engineering",
    courseName: "Software Engineering Principles",
    instructorId: "emma-rodriguez",
    instructor: "Dr. Emma Rodriguez",
    instructorAvatar: "/api/placeholder/32/32",
    status: "scheduled",
    participants: 12
  },

  // This week's events
  {
    id: "4",
    title: "JavaScript Fundamentals Quiz",
    description: "Assessment covering ES6+ features, async programming, and DOM manipulation.",
    startAt: addDays(setMinutes(setHours(today, 9), 0), 3),
    endAt: addDays(setMinutes(setHours(today, 10), 30), 3),
    type: "exam",
    locationType: "online",
    locationLabel: "LMS Platform",
    courseId: "javascript-fundamentals",
    courseName: "JavaScript Fundamentals",
    instructorId: "james-parker",
    instructor: "James Parker",
    instructorAvatar: "/api/placeholder/32/32",
    status: "scheduled",
    participants: 35
  },
  {
    id: "5",
    title: "UX Design Principles",
    description: "Introduction to user experience design principles and methodologies.",
    startAt: addDays(setMinutes(setHours(today, 13), 0), 4),
    endAt: addDays(setMinutes(setHours(today, 14), 30), 4),
    type: "live",
    locationType: "online",
    locationLabel: "Online",
    meetingUrl: "https://teams.microsoft.com/l/meetup-join/abc123",
    courseId: "ux-design",
    courseName: "UX/UI Design Fundamentals",
    instructorId: "lisa-chen",
    instructor: "Lisa Chen",
    instructorAvatar: "/api/placeholder/32/32",
    status: "scheduled",
    participants: 28
  },

  // Next week's events
  {
    id: "6",
    title: "Node.js Backend Development",
    description: "Building scalable backend applications with Node.js and Express.",
    startAt: addDays(setMinutes(setHours(today, 11), 0), 7),
    endAt: addDays(setMinutes(setHours(today, 12), 30), 7),
    type: "live",
    locationType: "online",
    locationLabel: "Online",
    meetingUrl: "https://meet.google.com/node-backend-101",
    courseId: "nodejs-backend",
    courseName: "Node.js Backend Development",
    instructorId: "alex-thompson",
    instructor: "Alex Thompson",
    instructorAvatar: "/api/placeholder/32/32",
    status: "scheduled",
    participants: 22
  },
  {
    id: "7",
    title: "Project Submission Deadline",
    description: "Final project submissions due for React Advanced course.",
    startAt: addDays(setMinutes(setHours(today, 23), 59), 8),
    endAt: addDays(setMinutes(setHours(today, 23), 59), 8),
    type: "deadline",
    locationType: "other",
    locationLabel: "Online Submission",
    courseId: "react-advanced",
    courseName: "Advanced React Development",
    instructorId: "sarah-wilson",
    instructor: "Dr. Sarah Wilson",
    status: "scheduled"
  },

  // Past events
  {
    id: "8",
    title: "HTML & CSS Basics Review",
    description: "Review session covering HTML semantics and CSS layouts.",
    startAt: subDays(setMinutes(setHours(today, 14), 0), 1),
    endAt: subDays(setMinutes(setHours(today, 15), 0), 1),
    type: "review",
    locationType: "online",
    locationLabel: "Online",
    courseId: "web-fundamentals",
    courseName: "Web Development Fundamentals",
    instructorId: "john-doe",
    instructor: "John Doe",
    instructorAvatar: "/api/placeholder/32/32",
    status: "completed",
    participants: 18
  },

  // Conflicting events
  {
    id: "9",
    title: "TypeScript Workshop",
    description: "Introduction to TypeScript for JavaScript developers.",
    startAt: setMinutes(setHours(today, 14), 15), // Overlaps with event 1
    endAt: setMinutes(setHours(today, 16), 0),
    type: "workshop",
    locationType: "online",
    locationLabel: "Online",
    meetingUrl: "https://meet.google.com/typescript-workshop",
    courseId: "typescript-fundamentals",
    courseName: "TypeScript Fundamentals",
    instructorId: "maria-garcia",
    instructor: "Maria Garcia",
    instructorAvatar: "/api/placeholder/32/32",
    status: "scheduled",
    hasConflict: true,
    participants: 20
  },

  // More events for variety
  {
    id: "10",
    title: "API Design Best Practices",
    description: "Learn to design RESTful APIs following industry best practices.",
    startAt: addDays(setMinutes(setHours(today, 16), 0), 1),
    endAt: addDays(setMinutes(setHours(today, 17), 30), 1),
    type: "live",
    locationType: "online",
    locationLabel: "Online",
    meetingUrl: "https://zoom.us/j/api-design-101",
    courseId: "api-development",
    courseName: "API Development",
    instructorId: "david-kim",
    instructor: "David Kim",
    instructorAvatar: "/api/placeholder/32/32",
    status: "scheduled",
    participants: 15
  },

  // Events spread across the month
  {
    id: "11",
    title: "Git & Version Control",
    description: "Master Git workflows and collaboration techniques.",
    startAt: addDays(setMinutes(setHours(today, 10), 0), 10),
    endAt: addDays(setMinutes(setHours(today, 11), 30), 10),
    type: "workshop",
    locationType: "room",
    locationLabel: "Computer Lab A",
    courseId: "dev-tools",
    courseName: "Developer Tools & Workflow",
    instructorId: "rachel-smith",
    instructor: "Rachel Smith",
    instructorAvatar: "/api/placeholder/32/32",
    status: "scheduled",
    participants: 25
  },
  {
    id: "12",
    title: "Mid-term Examination",
    description: "Comprehensive examination covering all course materials.",
    startAt: addDays(setMinutes(setHours(today, 9), 0), 14),
    endAt: addDays(setMinutes(setHours(today, 11), 0), 14),
    type: "exam",
    locationType: "room",
    locationLabel: "Exam Hall B",
    courseId: "software-engineering",
    courseName: "Software Engineering Principles",
    instructorId: "emma-rodriguez",
    instructor: "Dr. Emma Rodriguez",
    status: "scheduled",
    participants: 45
  }
];

export const mockCourses = [
  { id: "react-advanced", name: "Advanced React Development", color: "#3B82F6" },
  { id: "database-systems", name: "Database Systems", color: "#10B981" },
  { id: "software-engineering", name: "Software Engineering Principles", color: "#8B5CF6" },
  { id: "javascript-fundamentals", name: "JavaScript Fundamentals", color: "#F59E0B" },
  { id: "ux-design", name: "UX/UI Design Fundamentals", color: "#EF4444" },
  { id: "nodejs-backend", name: "Node.js Backend Development", color: "#06B6D4" },
  { id: "web-fundamentals", name: "Web Development Fundamentals", color: "#84CC16" },
  { id: "typescript-fundamentals", name: "TypeScript Fundamentals", color: "#6366F1" },
  { id: "api-development", name: "API Development", color: "#EC4899" },
  { id: "dev-tools", name: "Developer Tools & Workflow", color: "#F97316" }
];