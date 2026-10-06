import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Medal, Star, Flame, BookOpen, Award, CheckCircle2, ChevronDown, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { getLeaderboard, getUserRank, getTopPerformers, LeaderboardCategory, LeaderboardPeriod, getLocalUserLeaderboardData } from '../../lib/leaderboard';
import { getLevel } from '../../lib/progress';

export function Leaderboard() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<LeaderboardCategory>('xp');
  const [period, setPeriod] = useState<LeaderboardPeriod>('all-time');
  const [leaderboard, setLeaderboard] = useState(getLeaderboard('xp'));

  useEffect(() => {
    setLeaderboard(getLeaderboard(category));
  }, [category, period]);

  const topPerformers = getTopPerformers();
  const localUser = getLocalUserLeaderboardData();
  const localUserRank = getUserRank(category);
  const localLevel = getLevel(localUser.xp);

  // Split top 3 and rest
  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3, 10);
  const isUserInTop10 = localUserRank <= 10;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto pb-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 mb-2">
          <Trophy className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">CyberAware Leaderboard</h1>
        <p className="text-slate-500 max-w-lg mx-auto text-lg">See how you rank among cybersecurity learners.</p>
        
        <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full text-xs font-medium text-slate-500 mt-4">
          <Info className="w-4 h-4 text-blue-500" />
          Demo Leaderboard — Global rankings will be available when online learner accounts are introduced.
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          <Button variant={category === 'xp' ? 'default' : 'outline'} onClick={() => setCategory('xp')} size="sm" className="whitespace-nowrap">
            Overall XP
          </Button>
          <Button variant={category === 'courses' ? 'default' : 'outline'} onClick={() => setCategory('courses')} size="sm" className="whitespace-nowrap">
            Courses Completed
          </Button>
          <Button variant={category === 'quiz' ? 'default' : 'outline'} onClick={() => setCategory('quiz')} size="sm" className="whitespace-nowrap">
            Quiz Score
          </Button>
        </div>

        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto">
          <Button variant={period === 'all-time' ? 'secondary' : 'ghost'} onClick={() => setPeriod('all-time')} size="sm" className="whitespace-nowrap text-xs">
            All Time
          </Button>
          <Button variant={period === 'month' ? 'secondary' : 'ghost'} onClick={() => setPeriod('month')} size="sm" className="whitespace-nowrap text-xs">
            This Month
          </Button>
          <Button variant={period === 'week' ? 'secondary' : 'ghost'} onClick={() => setPeriod('week')} size="sm" className="whitespace-nowrap text-xs">
            This Week
          </Button>
        </div>
      </div>

      {period !== 'all-time' && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm text-center">
          Time-based global rankings will be available when the leaderboard is connected to the online database. Showing All Time data.
        </div>
      )}

      {/* TOP PERFORMERS WIDGETS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Highest XP</p>
              <p className="font-bold text-slate-900 line-clamp-1">{topPerformers.highestXp.name} — {topPerformers.highestXp.xp} XP</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Highest Quiz Score</p>
              <p className="font-bold text-slate-900 line-clamp-1">{topPerformers.highestQuiz.name} — {topPerformers.highestQuiz.bestQuizScore}%</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Most Courses</p>
              <p className="font-bold text-slate-900 line-clamp-1">{topPerformers.mostCourses.name} — {topPerformers.mostCourses.coursesCompleted} Courses</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* PODIUM FOR TOP 3 */}
          <div className="flex items-end justify-center gap-2 sm:gap-6 pt-12 pb-8 px-4 bg-white rounded-xl border border-slate-200 shadow-sm">
            {/* 2nd Place */}
            {top3[1] && (
              <div className="flex flex-col items-center w-24 sm:w-32">
                <Avatar fallback={top3[1].name.substring(0, 2).toUpperCase()} className="w-14 h-14 sm:w-16 sm:h-16 border-4 border-slate-200 shadow-md mb-3 bg-slate-100 text-slate-600 font-bold" />
                <div className="text-center mb-3">
                  <p className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1">{top3[1].name}</p>
                  <p className="text-xs font-medium text-slate-500">{top3[1].xp} XP</p>
                </div>
                <div className="w-full h-32 bg-gradient-to-t from-slate-200 to-slate-50 rounded-t-lg border-t-4 border-slate-300 flex justify-center pt-3 relative overflow-hidden shadow-inner">
                  <span className="text-2xl font-black text-slate-400">2</span>
                </div>
              </div>
            )}

            {/* 1st Place */}
            {top3[0] && (
              <div className="flex flex-col items-center w-28 sm:w-36 -mt-10">
                <div className="relative">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-500 z-10">
                    <Star className="w-6 h-6 fill-current drop-shadow-sm" />
                  </div>
                  <Avatar fallback={top3[0].name.substring(0, 2).toUpperCase()} className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-yellow-400 shadow-lg mb-3 bg-yellow-50 text-yellow-700 font-bold relative z-0" />
                </div>
                <div className="text-center mb-3">
                  <p className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1">{top3[0].name}</p>
                  <p className="text-xs text-yellow-600 font-bold">{top3[0].xp} XP</p>
                </div>
                <div className="w-full h-40 bg-gradient-to-t from-yellow-200 to-yellow-50 rounded-t-lg border-t-4 border-yellow-400 flex justify-center pt-3 shadow-inner relative overflow-hidden">
                  <span className="text-3xl font-black text-yellow-600">1</span>
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {top3[2] && (
              <div className="flex flex-col items-center w-24 sm:w-32">
                <Avatar fallback={top3[2].name.substring(0, 2).toUpperCase()} className="w-14 h-14 sm:w-16 sm:h-16 border-4 border-amber-600/40 shadow-md mb-3 bg-amber-50 text-amber-700 font-bold" />
                <div className="text-center mb-3">
                  <p className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1">{top3[2].name}</p>
                  <p className="text-xs font-medium text-slate-500">{top3[2].xp} XP</p>
                </div>
                <div className="w-full h-24 bg-gradient-to-t from-amber-200/50 to-amber-50 rounded-t-lg border-t-4 border-amber-600/40 flex justify-center pt-3 relative overflow-hidden shadow-inner">
                  <span className="text-2xl font-black text-amber-700/60">3</span>
                </div>
              </div>
            )}
          </div>

          {/* TABLE */}
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
              <CardTitle className="text-lg">Top Cyber Defenders</CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold tracking-wider">Rank</th>
                    <th className="px-6 py-4 font-semibold tracking-wider">Learner</th>
                    <th className="px-6 py-4 font-semibold tracking-wider text-right">Level</th>
                    <th className="px-6 py-4 font-semibold tracking-wider text-right hidden sm:table-cell">Courses</th>
                    <th className="px-6 py-4 font-semibold tracking-wider text-right hidden sm:table-cell">Best Quiz</th>
                    <th className="px-6 py-4 font-semibold tracking-wider text-right">XP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {rest.map((user, index) => {
                    const rLevel = getLevel(user.xp);
                    const isCurrentUser = user.isLocalUser;
                    return (
                      <tr key={user.id} className={`transition-colors ${isCurrentUser ? 'bg-blue-50/60 hover:bg-blue-50/80' : 'hover:bg-slate-50'}`}>
                        <td className="px-6 py-4">
                          <div className={`text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center ${isCurrentUser ? 'bg-blue-200 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                            {index + 4}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar fallback={user.name.substring(0, 2).toUpperCase()} className={`w-8 h-8 font-bold text-xs ${isCurrentUser ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`} />
                            <div className="font-semibold text-slate-900 flex flex-col">
                              <span className="flex items-center gap-2">
                                {user.name}
                                {isCurrentUser && <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4 bg-blue-600">You</Badge>}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Badge variant="outline" className="font-medium bg-slate-50 border-slate-200 text-slate-600">
                            {rLevel.name}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right hidden sm:table-cell font-medium text-slate-600">
                          {user.coursesCompleted}
                        </td>
                        <td className="px-6 py-4 text-right hidden sm:table-cell font-medium text-slate-600">
                          {user.bestQuizScore}%
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-slate-900">{user.xp}</td>
                      </tr>
                    );
                  })}

                  {/* USER HIGHLIGHT IF NOT IN TOP 10 */}
                  {!isUserInTop10 && (
                    <>
                      <tr>
                        <td colSpan={6} className="px-6 py-2 text-center text-slate-400 bg-slate-50/50">
                          <ChevronDown className="w-4 h-4 mx-auto opacity-50" />
                        </td>
                      </tr>
                      <tr className="bg-blue-50/60 hover:bg-blue-50/80 transition-colors border-t border-blue-100">
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold w-auto px-2 min-w-[1.75rem] h-7 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center">
                            {localUserRank}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar fallback="CL" className="w-8 h-8 font-bold text-xs bg-blue-100 text-blue-700" />
                            <div className="font-semibold text-slate-900 flex items-center gap-2">
                              {localUser.name}
                              <Badge variant="default" className="text-[10px] px-1.5 py-0 h-4 bg-blue-600">You</Badge>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Badge variant="outline" className="font-medium bg-slate-50 border-slate-200 text-slate-600">
                            {localLevel.name}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right hidden sm:table-cell font-medium text-slate-600">
                          {localUser.coursesCompleted}
                        </td>
                        <td className="px-6 py-4 text-right hidden sm:table-cell font-medium text-slate-600">
                          {localUser.bestQuizScore}%
                        </td>
                        <td className="px-6 py-4 text-right font-bold text-slate-900">{localUser.xp}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">
          <Card className="border-slate-200 shadow-sm bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-white">Your Leaderboard Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/10">
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Current Rank</p>
                  <p className="text-3xl font-bold text-white">#{localUserRank}</p>
                </div>
                <Trophy className="w-8 h-8 text-yellow-400 opacity-80" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                  <p className="text-xs font-medium text-slate-400 uppercase mb-1">Total XP</p>
                  <p className="text-lg font-bold">{localUser.xp}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                  <p className="text-xs font-medium text-slate-400 uppercase mb-1">Current Level</p>
                  <p className="text-lg font-bold">{localLevel.level}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                  <p className="text-xs font-medium text-slate-400 uppercase mb-1">Courses</p>
                  <p className="text-lg font-bold">{localUser.coursesCompleted}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                  <p className="text-xs font-medium text-slate-400 uppercase mb-1">Best Quiz</p>
                  <p className="text-lg font-bold">{localUser.bestQuizScore}%</p>
                </div>
              </div>

              <Button className="w-full bg-white text-slate-900 hover:bg-slate-100" onClick={() => navigate('/courses')}>
                Earn More XP
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
