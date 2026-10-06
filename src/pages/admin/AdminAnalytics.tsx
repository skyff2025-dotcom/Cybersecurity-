import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { BarChart, Activity, Users, Trophy } from 'lucide-react';

export function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Analytics</h1>
        <p className="text-slate-500 mt-1">Platform engagement and learner metrics.</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-lg text-sm text-center font-medium">
        Data not available in Demo Mode. Connect to Firestore to collect historical analytics.
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 opacity-60 pointer-events-none grayscale">
        <Card className="h-80 border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-400">
          <Activity className="w-12 h-12 mb-4 opacity-20" />
          <p className="font-medium">Learning Activity (Demo)</p>
        </Card>
        
        <Card className="h-80 border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-400">
          <Trophy className="w-12 h-12 mb-4 opacity-20" />
          <p className="font-medium">Quiz Performance (Demo)</p>
        </Card>
        
        <Card className="h-80 border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-400">
          <BookOpen className="w-12 h-12 mb-4 opacity-20" />
          <p className="font-medium">Course Completion (Demo)</p>
        </Card>
        
        <Card className="h-80 border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-400">
          <Users className="w-12 h-12 mb-4 opacity-20" />
          <p className="font-medium">Active Learners (Demo)</p>
        </Card>
      </div>
    </div>
  );
}

// Just adding a dummy BookOpen since we used it
import { BookOpen } from 'lucide-react';
