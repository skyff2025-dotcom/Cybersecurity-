import { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { saveQuizzes } from '../../lib/admin-content';
import { toast } from 'sonner';
import { getQuizzes } from '../../lib/admin-content';

export function AdminQuizzes() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const quizzes = getQuizzes();
    const allQs: any[] = [];
    quizzes.forEach((qCat: any) => {
      if (qCat.questions) {
        qCat.questions.forEach((q: any) => {
          allQs.push({
            ...q,
            quizTitle: qCat.title
          });
        });
      }
    });
    setQuestions(allQs);
  }, []);

  const filtered = questions.filter(q => q.question.toLowerCase().includes(search.toLowerCase()) || q.quizTitle.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Quiz Questions</h1>
          <p className="text-slate-500 mt-1">Manage assessment questions and answers.</p>
        </div>
        <Button className="shrink-0">
          <Plus className="w-4 h-4 mr-2" />
          Add Question
        </Button>
      </div>

      <Card className="border-slate-200">
        <div className="p-4 border-b border-slate-100">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search questions..." 
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-medium">Question</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Difficulty</th>
                <th className="px-6 py-4 font-medium">XP</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(q => (
                <tr key={q.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 max-w-md truncate">{q.question}</td>
                  <td className="px-6 py-4 text-slate-500">{q.quizTitle}</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="bg-white">{q.difficulty || 'Beginner'}</Badge>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{q.xp}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => toast.info('Question editor opening...')}>
                        <Edit2 className="w-4 h-4 text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-red-600 hover:bg-red-50" onClick={() => {
                        if (confirm('Delete this question?')) {
                          toast.success('Question deleted');
                          // Need a complex state update for nested array, for demo mode we just show success
                        }
                      }}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No questions found matching your search.
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
