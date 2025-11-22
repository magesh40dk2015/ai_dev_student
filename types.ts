
export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN'
}

export enum Subject {
  MATH = 'Math',
  ENGLISH = 'English',
  TAMIL = 'Tamil',
  HINDI = 'Hindi'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  grade?: string; // For students
  xp?: number; // For students
  avatar?: string;
  email?: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
}

export interface LessonLevel {
  id: string;
  title: string;
  subject: Subject;
  grade: string;
  description: string;
  isLocked: boolean;
  isCompleted: boolean;
  stars: number; // 0-3
  topics?: string[];
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  audioUrl?: string; // For TTS playback simulation
  imageKeyword?: string; // For generating cartoon visuals
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
}

export interface StudentProgress {
  studentId: string;
  studentName: string;
  mathScore: number;
  englishScore: number;
  tamilScore: number;
  hindiScore: number;
  attendance: number;
  weakTopics: string[];
  recentActivity: number[]; // Last 7 days score trend
}
