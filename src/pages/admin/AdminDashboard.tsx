import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { BookOpen, HelpCircle, AlertTriangle, Award, Users, BarChart, Bell } from 'lucide-react';
import { getCourses, getQuizzes, getThreats, getAlerts } from '../../lib/admin-content';
import { getProgress } from '../../lib/progress';

export function AdminDashboard() {
  const [stats, setStats] = useState({
    courses: 0,
    lessons: 0,
    quizQuestions: 0,
    threats: 0,
    certificates: 0,
    xpEarned: 0,
    alerts: 0
  });

  useEffect(() => {
    const courses = getCourses();
    const quizzes = getQuizzes();
    const threats = getThreats();
    const alerts = getAlerts();
    const progress = getProgress();

    const lessonCount = courses.reduce((acc: number, c: any) => acc + (c.lessons?.length || 0), 0);
    const questionCount = quizzes.reduce((acc: number, q: any) => acc + (q.questions?.length || 0), 0);

    setStats({
      courses: courses.length,
      lessons: lessonCount,
      quizQuestions: questionCount,
      threats: threats.length,
      certificates: progress.certificates.length,
      xpEarned: progress.totalPoints
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">High-level metrics for your CyberAware instance.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Courses</p>
              <p className="text-2xl font-bold text-slate-900">{stats.courses}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Lessons</p>
              <p className="text-2xl font-bold text-slate-900">{stats.lessons}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Quiz Questions</p>
              <p className="text-2xl font-bold text-slate-900">{stats.quizQuestions}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Threat Topics</p>
              <p className="text-2xl font-bold text-slate-900">{stats.threats}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Certificates Issued</p>
              <p className="text-2xl font-bold text-slate-900">{stats.certificates}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
              <BarChart className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total XP Earned</p>
              <p className="text-2xl font-bold text-slate-900">{stats.xpEarned}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Total Alerts</p>
                <h3 className="text-3xl font-bold text-slate-900">{stats.alerts}</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Bell className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
