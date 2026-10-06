import { getCourses } from '../lib/admin-content';
import { getThreats } from '../lib/admin-content';
import { DEMO_LEADERBOARD } from '../data/leaderboard';

export interface QuizScoreRecord {
  bestScore: number;
  attempts: number;
  xpEarned: number;
}

export interface QuizHistoryRecord {
  id: string;
  quizId: string;
  quizName: string;
  score: number;
  xpEarned: number;
  passed: boolean;
  date: string;
}

export interface CertificateData {
  id: string;
  courseId: string;
  courseTitle: string;
  learnerName: string;
  issueDate: string;
  certificateNumber: string;
  completionPercentage: number;
  totalLessons: number;
  completedLessons: number;
  verificationCode: string;
}

export interface CyberAwareProgress {
  completedCourses: number;
  completedLessons: number;
  completedCourseIds: string[];
  completedLessonIds: string[];
  quizScores: number[]; // legacy
  quizRecords: Record<string, QuizScoreRecord>;
  quizHistory: QuizHistoryRecord[];
  totalPoints: number;
  streak: number;
  longestStreak: number;
  certificates: CertificateData[];
  lastActivity: { id: string; type: string; title: string; date: string } | null;
  activities: { id: string; type: string; title: string; date: string }[];
  achievementIds: string[];
  activityDates: string[]; // YYYY-MM-DD
  viewedThreatIds: string[];
}

const defaultProgress: CyberAwareProgress = {
  completedCourses: 0,
  completedLessons: 0,
  completedCourseIds: [],
  completedLessonIds: [],
  quizScores: [],
  quizRecords: {},
  quizHistory: [],
  totalPoints: 0,
  streak: 0,
  longestStreak: 0,
  certificates: [],
  lastActivity: null,
  activities: [],
  achievementIds: [],
  activityDates: [],
  viewedThreatIds: [],
};

export function getProgress(): CyberAwareProgress {
  const data = localStorage.getItem('cyberaware_progress');
  if (data) {
    try {
      const parsed = JSON.parse(data);
      // Ensure certificates are objects, not strings from legacy data
      if (parsed.certificates && Array.isArray(parsed.certificates)) {
        parsed.certificates = parsed.certificates.filter((c: any) => typeof c === 'object');
      }
      return { ...defaultProgress, ...parsed };
    } catch (e) {
      return defaultProgress;
    }
  }
  return defaultProgress;
}

export function saveProgress(progress: Partial<CyberAwareProgress>) {
  const current = getProgress();
  localStorage.setItem('cyberaware_progress', JSON.stringify({ ...current, ...progress }));
}

export function updateStreakAndActivityDate() {
  const current = getProgress();
  const today = new Date().toISOString().split('T')[0];
  
  let newActivityDates = [...current.activityDates];
  let newStreak = current.streak;
  
  if (!newActivityDates.includes(today)) {
    const yesterdayDate = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (newActivityDates.includes(yesterdayDate)) {
      newStreak += 1;
    } else {
      newStreak = 1; // Reset or start streak
    }
    newActivityDates.push(today);
  } else {
    // Already tracked today, streak remains the same
    // Wait, if it's the very first activity ever and we just added today, streak is 1.
    if (newStreak === 0) newStreak = 1;
  }
  
  const longestStreak = Math.max(current.longestStreak, newStreak);
  saveProgress({ activityDates: newActivityDates, streak: newStreak, longestStreak });
  return { newActivityDates, newStreak, longestStreak };
}

export function checkAchievements() {
  const current = getProgress();
  const achievementsToUnlock: { id: string, xp: number, title: string }[] = [];
  const newlyUnlockedIds: string[] = [];
  
  // FIRST STEP (20 XP) - 1st lesson
  if (current.completedLessons >= 1 && !current.achievementIds.includes('first-step')) {
    achievementsToUnlock.push({ id: 'first-step', xp: 20, title: 'First Step' });
    newlyUnlockedIds.push('first-step');
  }
  // KNOWLEDGE BUILDER (50 XP) - 10 lessons
  if (current.completedLessons >= 10 && !current.achievementIds.includes('knowledge-builder')) {
    achievementsToUnlock.push({ id: 'knowledge-builder', xp: 50, title: 'Knowledge Builder' });
    newlyUnlockedIds.push('knowledge-builder');
  }
  // QUIZ MASTER (50 XP) - score >= 80%
  const bestQuizScore = Object.values(current.quizRecords).reduce((max, rec) => Math.max(max, rec.bestScore), 0);
  if (bestQuizScore >= 80 && !current.achievementIds.includes('quiz-master')) {
    achievementsToUnlock.push({ id: 'quiz-master', xp: 50, title: 'Quiz Master' });
    newlyUnlockedIds.push('quiz-master');
  }
  // PERFECT SCORE (100 XP) - score = 100%
  if (bestQuizScore === 100 && !current.achievementIds.includes('perfect-score')) {
    achievementsToUnlock.push({ id: 'perfect-score', xp: 100, title: 'Perfect Score' });
    newlyUnlockedIds.push('perfect-score');
  }
  // CYBER DEFENDER (100 XP) - 1st course
  if (current.completedCourses >= 1 && !current.achievementIds.includes('cyber-defender')) {
    achievementsToUnlock.push({ id: 'cyber-defender', xp: 100, title: 'Cyber Defender' });
    newlyUnlockedIds.push('cyber-defender');
  }
  // CONSISTENT LEARNER (75 XP) - 3 diff days
  if (current.activityDates.length >= 3 && !current.achievementIds.includes('consistent-learner')) {
    achievementsToUnlock.push({ id: 'consistent-learner', xp: 75, title: 'Consistent Learner' });
    newlyUnlockedIds.push('consistent-learner');
  }
  // CYBER EXPERT (250 XP) - 6 courses
  if (current.completedCourses >= 6 && !current.achievementIds.includes('cyber-expert')) {
    achievementsToUnlock.push({ id: 'cyber-expert', xp: 250, title: 'Cyber Expert' });
    newlyUnlockedIds.push('cyber-expert');
  }
  // SECURITY AWARE (25 XP) - 5 unique threats
  if (current.viewedThreatIds.length >= 5 && !current.achievementIds.includes('security-aware')) {
    achievementsToUnlock.push({ id: 'security-aware', xp: 25, title: 'Security Aware' });
    newlyUnlockedIds.push('security-aware');
  }
  // CERTIFIED DEFENDER (100 XP) - 1st certificate
  if (current.certificates && current.certificates.length >= 1 && !current.achievementIds.includes('certified-defender')) {
    achievementsToUnlock.push({ id: 'certified-defender', xp: 100, title: 'Certified Defender' });
    newlyUnlockedIds.push('certified-defender');
  }

  // LEADERBOARD RANK ACHIEVEMENTS
  const allUsersForRank = [...DEMO_LEADERBOARD, { id: 'local-user', xp: current.totalPoints, name: '', coursesCompleted: 0, bestQuizScore: 0 }];
  allUsersForRank.sort((a, b) => b.xp - a.xp);
  const currentRank = allUsersForRank.findIndex(u => u.id === 'local-user') + 1;

  if (currentRank <= 10 && !current.achievementIds.includes('top-10')) {
    achievementsToUnlock.push({ id: 'top-10', xp: 100, title: 'Top 10 Defender' });
    newlyUnlockedIds.push('top-10');
  }
  
  if (currentRank <= 3 && !current.achievementIds.includes('top-3')) {
    achievementsToUnlock.push({ id: 'top-3', xp: 150, title: 'Podium Finisher' });
    newlyUnlockedIds.push('top-3');
  }

  if (achievementsToUnlock.length > 0) {
    let xpToAdd = 0;
    const newIds = [...current.achievementIds];
    
    // We add individual activities for achievements inside addActivity or here. Let's just track the IDs and add the XP.
    achievementsToUnlock.forEach(ach => {
      xpToAdd += ach.xp;
      newIds.push(ach.id);
    });

    saveProgress({ 
      totalPoints: current.totalPoints + xpToAdd,
      achievementIds: newIds
    });
    
    // We will push activity notifications directly so we don't cause infinite loops.
    // However, it's safer to just return them and let the caller add activities if they want, OR add them here.
    return achievementsToUnlock; 
  }
  return [];
}

export function addActivity(type: string, title: string) {
  // Update streak whenever activity is added
  updateStreakAndActivityDate();
  
  const current = getProgress();
  const newActivity = {
    id: Date.now().toString() + Math.random().toString(36).substring(7),
    type,
    title,
    date: new Date().toISOString(),
  };
  const activities = [newActivity, ...current.activities].slice(0, 50);
  saveProgress({ activities, lastActivity: newActivity });
  
  const unlocked = checkAchievements();
  if (unlocked.length > 0) {
    const updated = getProgress();
    const achActivities = unlocked.map((ach, index) => ({
      id: Date.now().toString() + index + Math.random().toString(36).substring(7),
      type: 'achievement',
      title: `Unlocked ${ach.title}`,
      date: new Date().toISOString(),
    }));
    saveProgress({ activities: [...achActivities, ...updated.activities].slice(0, 50) });
  }
}

export function getLevel(xp: number) {
  if (xp >= 1000) return { level: 5, name: 'Cyber Expert', nextThreshold: null };
  if (xp >= 700) return { level: 4, name: 'Security Specialist', nextThreshold: 1000, nextName: 'Cyber Expert' };
  if (xp >= 400) return { level: 3, name: 'Cyber Defender', nextThreshold: 700, nextName: 'Security Specialist' };
  if (xp >= 200) return { level: 2, name: 'Security Learner', nextThreshold: 400, nextName: 'Cyber Defender' };
  return { level: 1, name: 'Cyber Beginner', nextThreshold: 200, nextName: 'Security Learner' };
}
