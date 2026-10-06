import { getProgress, getLevel } from './progress';
import { DEMO_LEADERBOARD, LeaderboardUser } from '../data/leaderboard';

export type LeaderboardCategory = 'xp' | 'courses' | 'quiz';
export type LeaderboardPeriod = 'all-time' | 'month' | 'week';

export function getLocalUserLeaderboardData(): LeaderboardUser {
  const progress = getProgress();
  
  // Calculate best quiz score
  const quizScores = progress.quizRecords ? Object.values(progress.quizRecords).map((r: any) => r.bestScore || 0) : [];
  const bestQuizScore = quizScores.length > 0 ? Math.max(...quizScores) : 0;

  return {
    id: 'local-user',
    name: 'Cyber Learner',
    xp: progress.totalPoints,
    coursesCompleted: progress.completedCourses,
    bestQuizScore: bestQuizScore,
    isLocalUser: true
  };
}

export function getLeaderboard(category: LeaderboardCategory = 'xp'): LeaderboardUser[] {
  const localUser = getLocalUserLeaderboardData();
  const allUsers = [...DEMO_LEADERBOARD, localUser];

  return allUsers.sort((a, b) => {
    if (category === 'xp') return b.xp - a.xp;
    if (category === 'courses') {
      if (b.coursesCompleted === a.coursesCompleted) return b.xp - a.xp;
      return b.coursesCompleted - a.coursesCompleted;
    }
    if (category === 'quiz') {
      if (b.bestQuizScore === a.bestQuizScore) return b.xp - a.xp;
      return b.bestQuizScore - a.bestQuizScore;
    }
    return b.xp - a.xp;
  });
}

export function getUserRank(category: LeaderboardCategory = 'xp'): number {
  const leaderboard = getLeaderboard(category);
  const index = leaderboard.findIndex(u => u.isLocalUser);
  return index + 1;
}

export function getTopPerformers() {
  const byXp = getLeaderboard('xp');
  const byCourses = getLeaderboard('courses');
  const byQuiz = getLeaderboard('quiz');

  return {
    highestXp: byXp[0],
    mostCourses: byCourses[0],
    highestQuiz: byQuiz[0]
  };
}
