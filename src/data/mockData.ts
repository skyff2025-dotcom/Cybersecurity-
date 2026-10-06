import { User, Category, Article, Video, Quiz, Threat, Certificate, Achievement } from '../types';

export const mockUser: User = {
  id: 'u-1',
  name: 'Alex Carter',
  email: 'alex.carter@example.com',
  role: 'student',
  level: 12,
  xp: 4500,
  streak: 7,
  joinedDate: '2025-08-15T10:00:00Z',
};

export const mockCategories: Category[] = [
  { id: 'c-1', name: 'Password Security', description: 'Master the art of creating and managing strong passwords.', icon: 'KeyRound', progress: 100, resourceCount: 5, difficulty: 'Beginner' },
  { id: 'c-2', name: 'Phishing & Social Engineering', description: 'Learn to identify deceptive emails and social manipulation.', icon: 'Fish', progress: 60, resourceCount: 8, difficulty: 'Beginner' },
  { id: 'c-3', name: 'Malware', description: 'Understand viruses, ransomware, and how to stay safe.', icon: 'Bug', progress: 30, resourceCount: 6, difficulty: 'Intermediate' },
  { id: 'c-4', name: 'Network Security', description: 'Secure your Wi-Fi and understand safe browsing habits.', icon: 'Network', progress: 0, resourceCount: 7, difficulty: 'Advanced' },
  { id: 'c-5', name: 'Data Privacy', description: 'Protect your personal information online.', icon: 'EyeOff', progress: 10, resourceCount: 4, difficulty: 'Intermediate' },
  { id: 'c-6', name: 'Safe Browsing', description: 'Navigate the web securely and avoid malicious sites.', icon: 'GlobeLock', progress: 80, resourceCount: 5, difficulty: 'Beginner' },
  { id: 'c-7', name: 'Mobile Security', description: 'Keep your smartphone and mobile data protected.', icon: 'Smartphone', progress: 0, resourceCount: 5, difficulty: 'Intermediate' },
  { id: 'c-8', name: 'Social Media Security', description: 'Manage privacy settings and avoid social media scams.', icon: 'Share2', progress: 40, resourceCount: 6, difficulty: 'Beginner' },
];

export const mockArticles: Article[] = [
  { id: 'a-1', title: 'The Anatomy of a Phishing Email', description: 'Learn to spot the subtle clues that give away a phishing attempt.', content: 'Full content here...', categoryId: 'c-2', categoryName: 'Phishing & Social Engineering', readTime: 5, difficulty: 'Beginner', publishedAt: '2026-08-20T00:00:00Z', isBookmarked: true },
  { id: 'a-2', title: 'Why 2FA is Your Best Friend', description: 'Two-factor authentication adds an essential layer of security to your accounts.', content: 'Full content here...', categoryId: 'c-1', categoryName: 'Password Security', readTime: 4, difficulty: 'Beginner', publishedAt: '2026-08-15T00:00:00Z' },
  { id: 'a-3', title: 'Understanding Public Wi-Fi Risks', description: 'The dangers of open networks and how a VPN can keep you safe.', content: 'Full content here...', categoryId: 'c-4', categoryName: 'Network Security', readTime: 7, difficulty: 'Intermediate', publishedAt: '2026-08-25T00:00:00Z' },
  { id: 'a-4', title: 'Ransomware: What You Need to Know', description: 'How ransomware works and the crucial steps to prevent data loss.', content: 'Full content here...', categoryId: 'c-3', categoryName: 'Malware', readTime: 6, difficulty: 'Advanced', publishedAt: '2026-09-01T00:00:00Z' },
];

export const mockVideos: Video[] = [
  { id: 'v-1', title: 'Social Engineering In Action', description: 'Watch a real-world demonstration of how attackers use psychology.', thumbnailUrl: 'https://images.unsplash.com/photo-1562813733-b31f71025d54?auto=format&fit=crop&q=80&w=600&h=400', videoUrl: '#', categoryId: 'c-2', categoryName: 'Phishing & Social Engineering', duration: 12, difficulty: 'Intermediate', isCompleted: true },
  { id: 'v-2', title: 'Creating Unbreakable Passwords', description: 'A guide to password managers and passphrases.', thumbnailUrl: 'https://images.unsplash.com/photo-1614064641936-79079a419eb5?auto=format&fit=crop&q=80&w=600&h=400', videoUrl: '#', categoryId: 'c-1', categoryName: 'Password Security', duration: 8, difficulty: 'Beginner' },
  { id: 'v-3', title: 'How Malware Hides', description: 'An inside look at how malicious software evades detection.', thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600&h=400', videoUrl: '#', categoryId: 'c-3', categoryName: 'Malware', duration: 15, difficulty: 'Advanced' },
];

export const mockQuizzes: Quiz[] = [
  { id: 'q-1', title: 'Password Best Practices', description: 'Test your knowledge on creating and storing passwords securely.', categoryId: 'c-1', categoryName: 'Password Security', difficulty: 'Beginner', questionCount: 10, estimatedTime: 5, bestScore: 90 },
  { id: 'q-2', title: 'Spot the Phish', description: 'Can you identify which of these emails are legitimate and which are scams?', categoryId: 'c-2', categoryName: 'Phishing & Social Engineering', difficulty: 'Intermediate', questionCount: 15, estimatedTime: 10, bestScore: 75 },
  { id: 'q-3', title: 'Malware Fundamentals', description: 'Assess your understanding of different malware types and vectors.', categoryId: 'c-3', categoryName: 'Malware', difficulty: 'Advanced', questionCount: 12, estimatedTime: 8 },
];

export const mockThreats: Threat[] = [
  { id: 't-1', title: 'New Netflix Phishing Campaign', category: 'Phishing', severity: 'High', description: 'Attackers are sending fake account suspension emails disguised as Netflix support.', dateDiscovered: '2026-09-08T10:00:00Z', status: 'Active' },
  { id: 't-2', title: 'Fake Browser Updates', category: 'Malware', severity: 'Critical', description: 'Compromised websites are prompting users to download urgent fake browser updates.', dateDiscovered: '2026-09-05T14:30:00Z', status: 'Active' },
  { id: 't-3', title: 'University Credential Stuffing', category: 'Identity', severity: 'Medium', description: 'Increased attempts to use leaked passwords on university portals.', dateDiscovered: '2026-09-01T08:00:00Z', status: 'Mitigated' },
  { id: 't-4', title: 'Malicious PDF Invoice', category: 'Social Engineering', severity: 'High', description: 'Fake invoices containing malicious macros are circulating in business emails.', dateDiscovered: '2026-08-28T09:15:00Z', status: 'Resolved' },
];

export const mockCertificates: Certificate[] = [
  { id: 'cert-1', title: 'CyberAware Fundamentals', description: 'Awarded for completing the core cybersecurity awareness modules.', earnedAt: '2026-08-30T00:00:00Z', isLocked: false, progress: 100 },
  { id: 'cert-2', title: 'Phishing Defense Expert', description: 'Awarded for passing the advanced phishing simulation and assessments.', isLocked: true, progress: 60 },
  { id: 'cert-3', title: 'Network Defender', description: 'Awarded for completing all network security and safe browsing modules.', isLocked: true, progress: 20 },
];

export const mockAchievements: Achievement[] = [
  { id: 'ach-1', title: 'First Steps', description: 'Completed your first lesson.', icon: 'Footprints', isUnlocked: true },
  { id: 'ach-2', title: 'Perfect Score', description: 'Scored 100% on a quiz.', icon: 'Target', isUnlocked: true },
  { id: 'ach-3', title: '7-Day Streak', description: 'Learned for 7 consecutive days.', icon: 'Flame', isUnlocked: true },
  { id: 'ach-4', title: 'Phishing Master', description: 'Completed all phishing modules.', icon: 'ShieldCheck', isUnlocked: false },
];
