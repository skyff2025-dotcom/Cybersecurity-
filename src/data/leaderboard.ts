export interface LeaderboardUser {
  id: string;
  name: string;
  xp: number;
  coursesCompleted: number;
  bestQuizScore: number;
  isLocalUser?: boolean;
}

export const DEMO_LEADERBOARD: LeaderboardUser[] = [
  { id: 'demo1', name: 'Aarav Mehta', xp: 1200, coursesCompleted: 6, bestQuizScore: 100 },
  { id: 'demo2', name: 'Riya Patel', xp: 980, coursesCompleted: 5, bestQuizScore: 98 },
  { id: 'demo3', name: 'Dev Shah', xp: 850, coursesCompleted: 4, bestQuizScore: 90 },
  { id: 'demo4', name: 'Ananya Desai', xp: 700, coursesCompleted: 4, bestQuizScore: 85 },
  { id: 'demo5', name: 'Kabir Joshi', xp: 650, coursesCompleted: 3, bestQuizScore: 88 },
  { id: 'demo6', name: 'Meera Shah', xp: 600, coursesCompleted: 3, bestQuizScore: 82 },
  { id: 'demo7', name: 'Arjun Patel', xp: 550, coursesCompleted: 2, bestQuizScore: 80 },
  { id: 'demo8', name: 'Ishita Mehta', xp: 450, coursesCompleted: 2, bestQuizScore: 75 },
  { id: 'demo9', name: 'Rahul Desai', xp: 400, coursesCompleted: 1, bestQuizScore: 70 },
  { id: 'demo10', name: 'Neha Shah', xp: 300, coursesCompleted: 1, bestQuizScore: 65 },
];
