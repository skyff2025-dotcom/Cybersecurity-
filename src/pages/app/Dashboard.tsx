import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trophy, BookOpen, Flame, Award, Shield, AlertTriangle, 
  CheckCircle2, Play, Lock, FileText, ArrowRight, Lightbulb
, ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Progress } from '../../components/ui/Progress';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { getProgress, CyberAwareProgress, getLevel } from '../../lib/progress';
import { getUserRank } from '../../lib/leaderboard';
import { getCourses } from '../../lib/admin-content';
import { getThreats, getAlerts } from '../../lib/admin-content';
import { isAlertRead } from '../../lib/alerts';

const DAILY_TIPS = [
  "Never reuse the same password across multiple accounts. A password manager can help you create and store unique passwords securely.",
  "Always keep your software and operating systems updated. These updates often contain critical security patches.",
  "Be skeptical of urgent requests for information or money, even if they appear to come from someone you know.",
  "Enable Two-Factor Authentication (2FA) wherever possible. It adds a crucial second layer of security to your accounts.",
  "Avoid using public Wi-Fi for sensitive transactions like banking or shopping unless you use a trusted VPN."
];

export function Dashboard() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<CyberAwareProgress | null>(null);
  const [dailyTip, setDailyTip] = useState(DAILY_TIPS[0]);

  useEffect(() => {
    setProgress(getProgress());
    
    // Select tip based on day of year
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    setDailyTip(DAILY_TIPS[dayOfYear % DAILY_TIPS.length]);
  }, []);

  if (!progress) return null;

  const alerts = getAlerts().filter((a: any) => a.status === 'Published').sort((a: any, b: any) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
  const latestAlerts = alerts.slice(0, 3);
  const totalCourses = getCourses().length;
  const totalLessons = getCourses().reduce((acc, cat) => acc + cat.lessons.length, 0);
  
  const overallProgressPercent = totalLessons > 0 ? Math.round((progress.completedLessons / totalLessons) * 100) : 0;
  const quizRecordsValues = progress.quizRecords ? Object.values(progress.quizRecords) as any[] : [];
  const avgQuizScore = quizRecordsValues.length > 0 
    ? Math.round(quizRecordsValues.reduce((a, b) => a + b.bestScore, 0) / quizRecordsValues.length) 
    : (progress.quizScores.length > 0 ? Math.round(progress.quizScores.reduce((a, b) => a + b, 0) / progress.quizScores.length) : 0);

  // Find a course to continue
  let continueCourse = getCourses()[0];
  let continueProgress = 0;
  
  for (const course of getCourses()) {
    const completedInCourse = progress.completedLessonIds.filter(id => id.startsWith(`${course.id}-`)).length;
    if (completedInCourse > 0 && completedInCourse < course.lessons.length) {
      continueCourse = course;
      continueProgress = Math.round((completedInCourse / course.lessons.length) * 100);
      break;
    }
  }

  const completedInContinueCourse = progress.completedLessonIds.filter(id => id.startsWith(`${continueCourse.id}-`)).length;

  const levelData = getLevel(progress.totalPoints);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* 2. WELCOME SECTION */}
      <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white border-0 shadow-lg shadow-blue-900/20">
        <CardContent className="p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="outline" className="bg-white/10 text-blue-100 border-white/20 hover:bg-white/20">
                {levelData.name} (Level {levelData.level})
              </Badge>
              <span className="text-blue-200 text-sm font-medium">{progress.totalPoints} XP</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome to CyberAware 👋</h1>
            <p className="text-blue-100 max-w-2xl text-lg">
              Learn how to recognize cyber threats, protect your digital identity, and build safer online habits.
            </p>
          </div>
          <Button 
            size="lg" 
            className="bg-white text-blue-700 hover:bg-slate-50 border-0 shadow-md whitespace-nowrap px-8 h-12 text-base font-semibold"
            onClick={() => navigate('/courses')}
          >
            Continue Learning
          </Button>
        </CardContent>
      </Card>

      {/* 3. LEARNING STATISTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Courses Completed', value: `${progress.completedCourses} / ${totalCourses}`, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
          { title: 'Certificates Earned', value: `${progress.certificates.length}`, icon: Award, color: 'text-purple-600', bg: 'bg-purple-50' },
          { title: 'Learning Progress', value: `${overallProgressPercent}%`, icon: Trophy, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { title: 'Learning Streak', value: `${progress.streak} Days`, icon: Flame, color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((stat, i) => (
          <Card key={i} className="border-slate-200 shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      
      {/* Security Alerts Widget */}
      <div className="grid grid-cols-1 mb-8">
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-[#0B1F3A] p-4 flex justify-between items-center text-white">
            <h2 className="text-lg font-bold flex items-center">
              <ShieldAlert className="w-5 h-5 mr-2 text-[#F97316]" />
              Security Alerts & News
            </h2>
            <Button variant="ghost" size="sm" className="text-blue-100 hover:text-white hover:bg-white/10" onClick={() => navigate('/alerts')}>
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {latestAlerts.map((alert: any) => {
                const read = isAlertRead(alert.id);
                return (
                  <div key={alert.id} className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-slate-50 ${read ? 'opacity-70' : ''}`}>
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${read ? 'bg-slate-300' : 'bg-[#F97316]'}`}></div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                            alert.severity === 'Critical' ? 'bg-red-50 text-red-700 border-red-200' :
                            alert.severity === 'High' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                            alert.severity === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                            'bg-blue-50 text-blue-700 border-blue-200'
                          }`}>
                            {alert.severity}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">{new Date(alert.publishedDate).toLocaleDateString()}</span>
                        </div>
                        <h3 className={`font-semibold ${read ? 'text-slate-600' : 'text-slate-900'}`}>{alert.title}</h3>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => navigate(`/alerts/${alert.id}`)} className="shrink-0 w-full sm:w-auto">
                      Read
                    </Button>
                  </div>
                );
              })}
              {latestAlerts.length === 0 && (
                 <div className="p-6 text-center text-slate-500">
                   No recent security alerts.
                 </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 4. CONTINUE LEARNING & 10. PROGRESS BAR */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Continue Learning</CardTitle>
                <CardDescription>{continueCourse.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-700">Progress</span>
                    <span className="text-slate-500">{continueProgress}% ({completedInContinueCourse} / {continueCourse.lessons.length} Lessons)</span>
                  </div>
                  <Progress value={continueProgress} className="h-2" />
                  <Button className="w-full mt-2" onClick={() => navigate(`/courses/${continueCourse.id}`)}>
                    {continueProgress > 0 ? 'Continue Course' : 'Start Course'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Your Cybersecurity Journey</CardTitle>
                <CardDescription>Overall track progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-slate-700">Overall Progress</span>
                    <span className="text-slate-500">{overallProgressPercent}%</span>
                  </div>
                  <Progress value={overallProgressPercent} className="h-2" />
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm">
                      <p className="text-slate-500">Lessons Completed</p>
                      <p className="font-semibold text-slate-900">{progress.completedLessons} / {totalLessons}</p>
                    </div>
                    <div className="text-sm text-right">
                      <p className="text-slate-500">Points</p>
                      <p className="font-semibold text-blue-600">{progress.totalPoints} XP</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 5. COURSE CATEGORIES */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">Explore Cybersecurity Topics</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {getCourses().slice(0, 6).map((cat) => (
                <Card key={cat.id} className="border-slate-200 shadow-sm hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group" onClick={() => navigate(`/courses/${cat.id}`)}>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-slate-50 text-slate-600 rounded-xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        <cat.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 truncate">{cat.title}</h3>
                        <p className="text-sm text-slate-500 line-clamp-1 mt-0.5">{cat.description}</p>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-xs font-medium text-slate-400">{cat.lessons.length} Lessons</span>
                          <span className="text-xs font-medium text-blue-600 flex items-center group-hover:translate-x-1 transition-transform">
                            Explore <ArrowRight className="w-3 h-3 ml-1" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-6">
          
          {/* LEADERBOARD CARD */}
          <Card className="border-slate-200 shadow-sm bg-gradient-to-br from-white to-slate-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <Trophy className="w-24 h-24 text-blue-900" />
            </div>
            <CardContent className="p-5 relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">Leaderboard</h3>
                  <p className="text-xs text-slate-500">Your current global ranking</p>
                </div>
              </div>
              
              <div className="flex items-end justify-between mb-4">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Rank</p>
                  <p className="text-3xl font-bold text-slate-900">#{getUserRank()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Total XP</p>
                  <p className="text-xl font-bold text-blue-600">{progress.totalPoints}</p>
                </div>
              </div>

              <Button className="w-full" onClick={() => navigate('/leaderboard')}>
                View Leaderboard
              </Button>
            </CardContent>
          </Card>

          {/* 6. LATEST CERTIFICATE */}
          {progress.certificates.length > 0 && (
            <Card className="border-slate-200 shadow-sm bg-gradient-to-br from-white to-slate-50">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">Latest Certificate</h3>
                    <p className="text-xs text-slate-500">Earned {new Date(progress.certificates[progress.certificates.length - 1].issueDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-800 mb-4 line-clamp-1">
                  {progress.certificates[progress.certificates.length - 1].courseTitle}
                </p>
                <Button variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50" onClick={() => navigate(`/certificate/${progress.certificates[progress.certificates.length - 1].id}`)}>
                  View Certificate
                </Button>
              </CardContent>
            </Card>
          )}

          {/* 7. QUICK ACTIONS */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <div className="space-y-1">
                {[
                  { name: 'Take a Quiz', icon: '📝', path: '/quiz' },
                  { name: 'Check Latest Threats', icon: '🛡️', path: '/threats' },
                  { name: 'Browse Courses', icon: '📚', path: '/courses' },
                  { name: 'View Leaderboard', icon: '🏆', path: '/leaderboard' },
                  { name: 'My Certificate', icon: '🎓', path: '/certificate' },
                ].map((action, idx) => (
                  <Link 
                    key={idx}
                    to={action.path}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 text-slate-700 transition-colors"
                  >
                    <span className="text-lg">{action.icon}</span>
                    <span className="text-sm font-medium">{action.name}</span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 7. DAILY SECURITY TIP */}
          <Card className="border-slate-200 shadow-sm bg-gradient-to-br from-slate-50 to-white">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 text-amber-600 mb-3">
                <Lightbulb className="w-5 h-5 fill-amber-100" />
                <h3 className="font-semibold text-slate-900 text-sm">Security Tip of the Day</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                "{dailyTip}"
              </p>
              <p className="text-xs text-slate-400 font-medium">New tip every day</p>
            </CardContent>
          </Card>

          {/* 8. RECENT ACTIVITY */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {progress.activities.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {progress.activities.slice(0, 4).map(activity => (
                    <div key={activity.id} className="p-4 flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Play className="w-3.5 h-3.5 ml-0.5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{activity.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{new Date(activity.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-900 mb-1">No learning activity yet.</p>
                  <p className="text-xs text-slate-500 px-4">Start your first course to begin your cybersecurity journey.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* LATEST SECURITY TOPICS */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-600" /> Latest Security Topics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {getThreats().slice(0, 3).map((threat) => (
                  <div key={threat.id} className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-semibold text-slate-900 text-sm line-clamp-1">{threat.title}</h4>
                      <Badge variant={
                        threat.severity === 'Critical' ? 'destructive' :
                        threat.severity === 'High' ? 'warning' :
                        threat.severity === 'Medium' ? 'info' : 'secondary'
                      } className="text-[10px] px-1.5 py-0 h-4">
                        {threat.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">{threat.category}</p>
                    <Link 
                      to={`/threats/${threat.id}`}
                      className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center"
                    >
                      Learn More <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 9. ACHIEVEMENT PREVIEW */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
              <CardTitle className="text-base">Achievements</CardTitle>
              <Badge variant="secondary" className="font-normal text-xs">{progress.achievementIds.length} Unlocked</Badge>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {[
                { id: 'first-step', title: 'First Step', desc: 'Complete your first lesson', icon: BookOpen },
                { id: 'quiz-master', title: 'Quiz Master', desc: 'Score 80% or higher', icon: Trophy },
                { id: 'consistent-learner', title: 'Consistent Learner', desc: 'Complete learning activities on 3 diff days', icon: Flame },
                { id: 'cyber-expert', title: 'Cyber Expert', desc: 'Complete all courses', icon: Shield },
                { id: 'security-aware', title: 'Security Aware', desc: 'View 5 threat topics', icon: Award },
              ].map((ach, idx) => {
                const isUnlocked = progress.achievementIds.includes(ach.id);
                return (
                  <div key={idx} className={`flex items-center gap-3 p-2 rounded-lg border transition-colors ${isUnlocked ? 'bg-white border-blue-100 shadow-sm' : 'bg-slate-50/50 border-slate-100 opacity-60'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isUnlocked ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                      {isUnlocked ? <ach.icon className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-sm font-medium ${isUnlocked ? 'text-slate-900' : 'text-slate-700'}`}>{ach.title}</h4>
                      <p className="text-xs text-slate-500">{ach.desc}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}

