import { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Search, Trophy } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { getLeaderboard } from '../../lib/leaderboard';
import { getLevel } from '../../lib/progress';

export function AdminLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLeaderboard(getLeaderboard('xp'));
  }, []);

  const filtered = leaderboard.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Leaderboard Management</h1>
          <p className="text-slate-500 mt-1">View the current ranking data (Demo & Local).</p>
        </div>
      </div>

      <Card className="border-slate-200">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-blue-50/50">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search learners..." 
              className="pl-9 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Badge variant="outline" className="bg-white border-blue-200 text-blue-700">
            <Trophy className="w-3 h-3 mr-1" />
            {leaderboard.length} Total Ranked
          </Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-medium">Rank</th>
                <th className="px-6 py-4 font-medium">Learner</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Level</th>
                <th className="px-6 py-4 font-medium">Courses</th>
                <th className="px-6 py-4 font-medium">Best Quiz</th>
                <th className="px-6 py-4 font-medium text-right">XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((user, idx) => (
                <tr key={user.id} className={`hover:bg-slate-50 transition-colors ${user.isLocalUser ? 'bg-blue-50/20' : ''}`}>
                  <td className="px-6 py-4 font-bold text-slate-400">#{idx + 1}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{user.name}</td>
                  <td className="px-6 py-4">
                    {user.isLocalUser ? (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">Local Learner</Badge>
                    ) : (
                      <Badge variant="outline" className="text-slate-500">Demo User</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{getLevel(user.xp).name}</td>
                  <td className="px-6 py-4 text-slate-500">{user.coursesCompleted}</td>
                  <td className="px-6 py-4 text-slate-500">{user.bestQuizScore}%</td>
                  <td className="px-6 py-4 font-bold text-slate-900 text-right">{user.xp}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                    No learners found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
