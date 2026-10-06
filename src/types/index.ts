export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type ThreatSeverity = 'Low' | 'Medium' | 'High' | 'Critical';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  level: number;
  xp: number;
  streak: number;
  avatarUrl?: string;
  joinedDate: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  resourceCount: number;
  difficulty: Difficulty;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  categoryId: string;
  categoryName: string;
  readTime: number; // in minutes
  difficulty: Difficulty;
  publishedAt: string;
  isBookmarked?: boolean;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  categoryId: string;
  categoryName: string;
  duration: number; // in minutes
  difficulty: Difficulty;
  isCompleted?: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  categoryName: string;
  difficulty: Difficulty;
  questionCount: number;
  estimatedTime: number; // in minutes
  bestScore?: number;
}

export interface Threat {
  id: string;
  title: string;
  category: string;
  severity: ThreatSeverity;
  description: string;
  dateDiscovered: string;
  status: 'Active' | 'Mitigated' | 'Resolved';
}

export interface Certificate {
  id: string;
  title: string;
  description: string;
  earnedAt?: string;
  isLocked: boolean;
  progress: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
}
