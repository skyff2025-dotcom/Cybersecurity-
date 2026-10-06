import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { AlertTriangle, Download, Upload, RotateCcw, Save } from 'lucide-react';
import { getCourses, getQuizzes, getThreats, saveCourses, saveQuizzes, saveThreats } from '../../lib/admin-content';
import { INITIAL_COURSES } from '../../data/courses';
import { INITIAL_QUIZZES } from '../../data/quizzes';
import { INITIAL_THREATS } from '../../data/threats';
import { toast } from 'sonner';

export function AdminSettings() {
  const handleExport = () => {
    const data = {
      courses: getCourses(),
      quizzes: getQuizzes(),
      threats: getThreats()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cyberaware-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success('Content exported successfully');
  };

  const handleReset = (type: string) => {
    if (!confirm(`Are you sure you want to reset ${type}? This will restore the original demo content.`)) return;

    if (type === 'courses' || type === 'all') {
      saveCourses(INITIAL_COURSES);
    }
    if (type === 'quizzes' || type === 'all') {
      saveQuizzes(INITIAL_QUIZZES);
    }
    if (type === 'threats' || type === 'all') {
      saveThreats(INITIAL_THREATS);
    }
    
    toast.success(`${type === 'all' ? 'All content' : type} reset successfully`);
    window.location.reload();
  };

  const handleResetProgress = () => {
    if (!confirm('Are you sure you want to completely wipe all learner progress? This action cannot be undone.')) return;
    localStorage.removeItem('cyberaware_progress');
    toast.success('Learner progress reset successfully');
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 mt-1">Manage system settings and data.</p>
      </div>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Export your content or restore the original demo data.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="flex-1" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export Content JSON
            </Button>
            <Button variant="outline" className="flex-1">
              <Upload className="w-4 h-4 mr-2" />
              Import Content JSON
            </Button>
          </div>

          <div className="border-t border-slate-100 pt-6 space-y-4">
            <h3 className="font-semibold text-slate-900">Reset Demo Data</h3>
            <p className="text-sm text-slate-500">Restore the specific content areas to their original default states.</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" onClick={() => handleReset('courses')}>Reset Courses</Button>
              <Button variant="secondary" onClick={() => handleReset('quizzes')}>Reset Quizzes</Button>
              <Button variant="secondary" onClick={() => handleReset('threats')}>Reset Threats</Button>
            </div>
            <Button variant="destructive" className="w-full sm:w-auto" onClick={() => handleReset('all')}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset All Content
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200 bg-red-50/30">
        <CardHeader>
          <CardTitle className="text-red-700 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Danger Zone
          </CardTitle>
          <CardDescription className="text-red-600/80">These actions are destructive and cannot be undone.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={handleResetProgress}>
            Reset Learner Progress
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
