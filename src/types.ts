export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  streak: number;
  totalXp: number;
  currentLessonId: number;
  lastActiveAt: string;
}

export interface LessonProgress {
  userId: string;
  lessonId: number;
  status: 'locked' | 'available' | 'completed';
  bestScore: number;
  completedAt?: string;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  theory: string;
  type: 'vowel' | 'consonant' | 'nasal' | 'mixed';
  exercises: Exercise[];
}

export interface Exercise {
  word: string;
  transcription: string; // IPA
  hint?: string;
  audioUrl?: string;
}

export interface AppState {
  user: UserProfile | null;
  loading: boolean;
  lessons: Lesson[];
  progress: Record<number, LessonProgress>;
}
