import { useState, useEffect } from 'react';
import { HelpCircle, Clock, Search, Filter, Play, Trophy, History } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { getQuizzes } from '../../lib/admin-content';
import { getProgress, CyberAwareProgress } from '../../lib/progress';

export function Quizzes() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [progress, setProgress] = useState<CyberAwareProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const filteredQuizzes = getQuizzes().filter((quiz) => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          quiz.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'All' || quiz.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Cybersecurity Quiz Center</h1>
          <p className="text-slate-500 mt-1">Test your knowledge, improve your awareness, and earn XP.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search quizzes..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 shrink-0">
          <select 
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz) => {
          const Icon = quiz.icon;
          const quizRecord = progress?.quizRecords?.[quiz.id];
          const bestScore = quizRecord?.bestScore;

          return (
            <Card key={quiz.id} className="flex flex-col hover:shadow-md hover:border-blue-200 transition-all">
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant={quiz.difficulty === 'Beginner' ? 'success' : quiz.difficulty === 'Intermediate' ? 'warning' : 'destructive'}>
                    {quiz.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl mb-1">{quiz.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {quiz.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-3 text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-1.5 w-full sm:w-auto">
                    <HelpCircle className="w-4 h-4 text-slate-400" />
                    {quiz.questions.length} Questions
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-slate-300" />
                  <div className="flex items-center gap-1.5 w-full sm:w-auto">
                    <Trophy className="w-4 h-4 text-slate-400" />
                    {quiz.questions.length * 10} XP Max
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-900 w-full sm:w-auto mr-auto">
                  <Trophy className={`w-4 h-4 ${bestScore !== undefined ? 'text-yellow-500' : 'text-slate-300'}`} />
                  Best: {bestScore !== undefined ? `${bestScore}%` : 'Not attempted'}
                </div>
                
                <Button 
                  className={bestScore === undefined ? "w-full" : "w-full sm:w-auto"}
                  onClick={() => navigate(`/quiz/${quiz.id}`)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {bestScore !== undefined ? 'Retake' : 'Start Quiz'}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {filteredQuizzes.length === 0 && (
        <div className="text-center py-12">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900">No quizzes found</h3>
          <p className="text-slate-500">Try adjusting your search or filters.</p>
        </div>
      )}

      {progress?.quizHistory && progress.quizHistory.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-2">
            <History className="w-5 h-5 text-slate-500" />
            <h2 className="text-xl font-bold text-slate-900">Recent Quiz Attempts</h2>
          </div>
          <div className="grid gap-4">
            {progress.quizHistory.slice(0, 5).map((history) => (
              <Card key={history.id} className="border-slate-200 shadow-sm">
                <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-slate-900">{history.quizName}</h4>
                    <p className="text-sm text-slate-500">{new Date(history.date).toLocaleDateString()} at {new Date(history.date).toLocaleTimeString()}</p>
                  </div>
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="text-center">
                      <div className="text-xs text-slate-500 font-medium">Score</div>
                      <div className="font-bold text-slate-900">{history.score}%</div>
                    </div>
                    <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
                    <div className="text-center">
                      <div className="text-xs text-slate-500 font-medium">XP Earned</div>
                      <div className="font-bold text-blue-600">+{history.xpEarned}</div>
                    </div>
                    <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
                    <Badge variant={history.passed ? 'success' : 'destructive'} className="shrink-0">
                      {history.passed ? 'Passed' : 'Keep Practicing'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
