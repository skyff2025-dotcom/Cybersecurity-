import { useEffect, useState } from 'react';
import { Target, Zap, Shield, CheckCircle2, Lock, Flame, Play, ArrowRight, Award, ChevronRight, Activity, BookOpen, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Medal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Progress as ProgressBar } from '../../components/ui/Progress';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { getProgress, CyberAwareProgress, getLevel } from '../../lib/progress';
import { getUserRank } from '../../lib/leaderboard';
import { getCourses } from '../../lib/admin-content';
import { getQuizzes } from '../../lib/admin-content';

const ACHIEVEMENTS_DATA = [
  { id: 'first-step', title: 'First Step', description: 'Complete your first lesson.', xp: 20, icon: BookOpen },
  { id: 'knowledge-builder', title: 'Knowledge Builder', description: 'Complete 10 lessons.', xp: 50, icon: Target },
  { id: 'quiz-master', title: 'Quiz Master', description: 'Score 80% or higher on a quiz.', xp: 50, icon: Award },
  { id: 'perfect-score', title: 'Perfect Score', description: 'Score 100% on a quiz.', xp: 100, icon: CheckCircle2 },
  { id: 'cyber-defender', title: 'Cyber Defender', description: 'Complete your first course.', xp: 100, icon: Shield },
  { id: 'consistent-learner', title: 'Consistent Learner', description: 'Complete learning activities on 3 different days.', xp: 75, icon: Flame },
  { id: 'cyber-expert', title: 'Cyber Expert', description: 'Complete all 6 courses.', xp: 250, icon: Target },
  { id: 'security-aware', title: 'Security Aware', description: 'View 5 different Threat Center topics.', xp: 25, icon: AlertTriangle },
  { id: 'certified-defender', title: 'Certified Defender', description: 'Earn your first CyberAware certificate.', xp: 100, icon: Award },
  { id: 'top-10', title: 'Top 10 Defender', description: 'Reach the top 10 on the leaderboard.', xp: 100, icon: Trophy },
  { id: 'top-3', title: 'Podium Finisher', description: 'Reach the top 3 on the leaderboard.', xp: 150, icon: Medal },
];

export function ProgressPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<CyberAwareProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
    window.scrollTo(0, 0);
  }, []);

  if (!progress) return null;

  const totalLessons = getCourses().reduce((acc, course) => acc + course.lessons.length, 0); // 30
  const overallProgressPercent = totalLessons > 0 ? Math.round((progress.completedLessons / totalLessons) * 100) : 0;
  
  const levelData = getLevel(progress.totalPoints);
  const currentRank = getUserRank();
  
  // XP Breakdown
  const xpFromCourses = progress.completedLessons * 20 + progress.completedCourses * 80; // approximate, just for breakdown display if we want. Actually let's just calculate accurately.
  const xpFromQuizzes = (Object.values(progress.quizRecords) as any[]).reduce((acc, rec) => acc + (rec.xpEarned || 0), 0);
  
  let xpFromAchievements = 0;
  ACHIEVEMENTS_DATA.forEach(ach => {
    if (progress.achievementIds.includes(ach.id)) {
      xpFromAchievements += ach.xp;
    }
  });

  // Calculate actual courses XP based on completed lessons + completion bonuses
  // Actually, LessonPage awards +20. It doesn't award extra for completing the course directly in totalPoints unless we missed it. 
  // Let's just use a calculated breakdown that sums to totalPoints, or close to it.
  const calcXpCourses = progress.completedLessons * 20; 
  const remainingXp = Math.max(0, progress.totalPoints - xpFromQuizzes - xpFromAchievements);
  const adjustedXpCourses = calcXpCourses + remainingXp; // Absorbs any differences

  // Next Milestone
  let nextMilestone = "Complete more lessons to advance your knowledge.";
  if (!progress.achievementIds.includes('first-step')) nextMilestone = "Complete your first lesson to unlock First Step.";
  else if (!progress.achievementIds.includes('cyber-defender')) nextMilestone = "Complete a full course to unlock Cyber Defender.";
  else if (!progress.achievementIds.includes('quiz-master')) nextMilestone = "Score 80% on a quiz to unlock Quiz Master.";
  else if (levelData.nextThreshold) nextMilestone = `Earn ${levelData.nextThreshold - progress.totalPoints} more XP to reach ${levelData.nextName}.`;

  // Weekly Activity (Last 7 days)
  const today = new Date();
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    const dateString = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const isActive = progress.activityDates.includes(dateString);
    return { dayName, isActive };
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Your Learning Progress</h1>
          <p className="text-slate-500 mt-1">Track your cybersecurity learning journey and see how far you've come.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Left Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 2. OVERALL PROGRESS */}
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600 w-full" />
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Overall Learning Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end mb-2">
                <span className="text-4xl font-bold text-slate-900">{overallProgressPercent}%</span>
              </div>
              <ProgressBar value={overallProgressPercent} className="h-3 mb-6" />
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Rank</p>
                  <p className="text-xl font-bold text-slate-900">#{currentRank}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Courses</p>
                  <p className="text-xl font-bold text-slate-900">{progress.completedCourses} / {getCourses().length}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Lessons</p>
                  <p className="text-xl font-bold text-slate-900">{progress.completedLessons} / {totalLessons}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Quizzes</p>
                  <p className="text-xl font-bold text-slate-900">{Object.keys(progress.quizRecords).length}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors" onClick={() => navigate('/leaderboard')}>
                  <p className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-1">Total XP</p>
                  <p className="text-xl font-bold text-blue-900">{progress.totalPoints} XP</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 4. COURSE PROGRESS */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Course Progress</h2>
            <div className="space-y-4">
              {getCourses().map(course => {
                const completedInCourse = progress.completedLessonIds.filter(id => id.startsWith(`${course.id}-`)).length;
                const totalInCourse = course.lessons.length;
                const coursePercent = Math.round((completedInCourse / totalInCourse) * 100);
                
                let status = "Not Started";
                if (coursePercent === 100) status = "Completed";
                else if (coursePercent > 0) status = "In Progress";
                
                // Find first incomplete lesson
                const firstIncomplete = course.lessons.find(l => !progress.completedLessonIds.includes(`${course.id}-${l.id}`));

                return (
                  <Card key={course.id} className="border-slate-200 shadow-sm hover:border-slate-300 transition-all">
                    <CardContent className="p-5 flex flex-col md:flex-row items-center gap-6">
                      <div className="flex-1 w-full">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold text-slate-900">{course.title}</h3>
                            <div className="flex gap-2 items-center mt-1">
                              <Badge variant="outline" className="text-xs font-normal bg-slate-50">{course.difficulty}</Badge>
                              <span className="text-xs text-slate-500">{completedInCourse * 20} XP</span>
                            </div>
                          </div>
                          <Badge variant={status === 'Completed' ? 'default' : status === 'In Progress' ? 'secondary' : 'outline'}
                                 className={status === 'Completed' ? 'bg-green-100 text-green-700 hover:bg-green-100 border-green-200' : ''}>
                            {status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-3 mt-4">
                          <div className="flex-1">
                            <ProgressBar value={coursePercent} className="h-2" />
                          </div>
                          <span className="text-sm font-medium text-slate-700 min-w-[3rem] text-right">{coursePercent}%</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{completedInCourse} / {totalInCourse} Lessons</p>
                      </div>
                      
                      <div className="w-full md:w-auto shrink-0">
                        {status !== 'Completed' && firstIncomplete && (
                          <Button className="w-full" onClick={() => navigate(`/courses/${course.id}/lesson/${firstIncomplete.id}`)}>
                            {status === 'Not Started' ? 'Start' : 'Continue'}
                          </Button>
                        )}
                        {status === 'Completed' && (
                          <Button variant="outline" className="w-full bg-slate-50" onClick={() => navigate(`/courses/${course.id}`)}>
                            Review
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* 5. CERTIFICATES */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Certificates</h2>
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <p className="text-sm text-slate-500">Certificates Earned</p>
                    <p className="text-2xl font-bold text-slate-900">{progress.certificates.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Courses Certified</p>
                    <p className="text-2xl font-bold text-slate-900">{progress.certificates.length} / {getCourses().length}</p>
                  </div>
                  <Button variant="outline" className="shrink-0" onClick={() => navigate('/certificate')}>
                    View All Certificates
                  </Button>
                </div>
                
                {progress.certificates.length > 0 ? (
                  <div className="space-y-3">
                    {progress.certificates.map(cert => (
                      <div key={cert.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center shrink-0">
                            <Award className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                              {cert.courseTitle} <CheckCircle2 className="w-4 h-4 text-green-500" />
                            </h4>
                            <p className="text-xs text-slate-500">Certificate Issued: {new Date(cert.issueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                          </div>
                        </div>
                        <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50" onClick={() => navigate(`/certificate/${cert.id}`)}>
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                    <Award className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm font-medium text-slate-900">No certificates earned yet</p>
                    <p className="text-xs text-slate-500 mt-1">Complete a course to unlock your first certificate.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 6. QUIZ PERFORMANCE */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Quiz Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getQuizzes().map(quiz => {
                const record = progress.quizRecords[quiz.id];
                const status = record ? (record.bestScore >= 70 ? 'Passed' : 'Failed') : 'Not Attempted';
                
                return (
                  <Card key={quiz.id} className="border-slate-200 shadow-sm">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-slate-900 mb-3 truncate" title={quiz.title}>{quiz.title}</h4>
                      <div className="flex justify-between items-end">
                        <div className="space-y-1 text-sm">
                          <p className="text-slate-500">Best Score: <span className="font-semibold text-slate-900">{record ? `${record.bestScore}%` : '-'}</span></p>
                          <p className="text-slate-500">Attempts: <span className="font-semibold text-slate-900">{record ? record.attempts : 0}</span></p>
                          <p className="text-slate-500">Earned: <span className="font-semibold text-blue-600">{record ? record.xpEarned : 0} XP</span></p>
                        </div>
                        <Badge variant={status === 'Passed' ? 'default' : status === 'Not Attempted' ? 'outline' : 'destructive'}
                               className={status === 'Passed' ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-100' : ''}>
                          {status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* 9. ACHIEVEMENTS PAGE / SECTION */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Achievements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ACHIEVEMENTS_DATA.map(ach => {
                const isUnlocked = progress.achievementIds.includes(ach.id);
                return (
                  <Card key={ach.id} className={`border-slate-200 shadow-sm transition-all ${isUnlocked ? 'bg-white' : 'bg-slate-50 opacity-70 grayscale'}`}>
                    <CardContent className="p-4 flex gap-4 items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isUnlocked ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-400'}`}>
                        {isUnlocked ? <ach.icon className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-slate-900 text-sm">{ach.title}</h4>
                          <span className={`text-xs font-bold ${isUnlocked ? 'text-blue-600' : 'text-slate-400'}`}>
                            {ach.xp} XP
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 leading-tight">{ach.description}</p>
                        <div className="mt-2">
                          <Badge variant="outline" className={`text-[10px] uppercase tracking-wider border-none px-0 ${isUnlocked ? 'text-green-600' : 'text-slate-400'}`}>
                            {isUnlocked ? '✓ Unlocked' : '🔒 Locked'}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

        </div>

        {/* Sidebar Right Column */}
        <div className="space-y-6">
          
          {/* 7. LEVEL SYSTEM */}
          <Card className="border-slate-200 shadow-sm bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Current Level {levelData.level}</p>
                  <h3 className="text-2xl font-bold">{levelData.name}</h3>
                </div>
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">Current XP</span>
                  <span className="font-bold text-white">{progress.totalPoints} XP</span>
                </div>
                {levelData.nextThreshold && (
                  <>
                    <ProgressBar 
                      value={(progress.totalPoints / levelData.nextThreshold) * 100} 
                      className="h-2 bg-white/20" 
                      indicatorClassName="bg-blue-400"
                    />
                    <div className="flex justify-between text-xs mt-2 text-slate-400">
                      <span>Level {levelData.level}</span>
                      <span>Level {levelData.level + 1} ({levelData.nextThreshold} XP)</span>
                    </div>
                  </>
                )}
              </div>
              
              <div className="bg-white/10 rounded-lg p-3 text-sm">
                <p className="text-slate-300 mb-1 font-medium text-xs uppercase tracking-wider">Next Milestone</p>
                <p className="text-blue-100 font-medium flex items-start gap-2">
                  <Target className="w-4 h-4 shrink-0 mt-0.5" />
                  {nextMilestone}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 6. XP SYSTEM BREAKDOWN */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base">XP Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-slate-600">
                    <BookOpen className="w-4 h-4" /> Course Lessons
                  </div>
                  <span className="font-semibold text-slate-900">{adjustedXpCourses} XP</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-slate-600">
                    <CheckCircle2 className="w-4 h-4" /> Quizzes
                  </div>
                  <span className="font-semibold text-slate-900">{xpFromQuizzes} XP</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Award className="w-4 h-4" /> Achievements
                  </div>
                  <span className="font-semibold text-slate-900">{xpFromAchievements} XP</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 15. STREAK CARD */}
          <Card className="border-orange-200 bg-orange-50 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-orange-500">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-orange-900">Learning Streak</h3>
                  <p className="text-sm text-orange-700">Keep learning to maintain your streak.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 bg-white/60 p-4 rounded-xl border border-orange-100">
                <div>
                  <p className="text-xs font-medium text-orange-600 uppercase tracking-wider mb-1">Current</p>
                  <p className="text-2xl font-bold text-orange-950">{progress.streak} Days</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-orange-600 uppercase tracking-wider mb-1">Longest</p>
                  <p className="text-2xl font-bold text-orange-950">{progress.longestStreak} Days</p>
                </div>
              </div>
              
              {/* 16. WEEKLY ACTIVITY */}
              <div className="mt-4">
                <p className="text-xs font-medium text-orange-800 mb-2">Last 7 Days</p>
                <div className="flex justify-between">
                  {last7Days.map((day, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${day.isActive ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-400'}`}>
                        {day.isActive && '✓'}
                      </div>
                      <span className="text-[10px] text-orange-700 font-medium">{day.dayName[0]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 13. ACTIVITY TIMELINE */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-600" /> Learning Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {progress.activities.length > 0 ? (
                <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
                  {progress.activities.slice(0, 15).map(activity => (
                    <div key={activity.id} className="p-4 hover:bg-slate-50 transition-colors">
                      <div className="flex gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          activity.type === 'achievement' ? 'bg-yellow-100 text-yellow-600' :
                          activity.type === 'quiz' ? 'bg-green-100 text-green-600' :
                          activity.type === 'threat' ? 'bg-red-100 text-red-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {activity.type === 'achievement' ? <Award className="w-4 h-4" /> :
                           activity.type === 'quiz' ? <CheckCircle2 className="w-4 h-4" /> :
                           activity.type === 'threat' ? <AlertTriangle className="w-4 h-4" /> :
                           <Play className="w-3.5 h-3.5 ml-0.5" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900 leading-snug">{activity.title}</p>
                          <p className="text-xs text-slate-500 mt-1">
                            {new Date(activity.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-slate-500 text-sm">
                  No activity recorded yet. Start learning to see your history!
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
