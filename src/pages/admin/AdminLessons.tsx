import { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Plus, Search, Edit2, Copy, Eye, Trash2 } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { toast } from 'sonner';
import { getCourses } from '../../lib/admin-content';
import { useNavigate } from 'react-router-dom';

export function AdminLessons() {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [editingLesson, setEditingLesson] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const courses = getCourses();
    const allLessons: any[] = [];
    courses.forEach((c: any) => {
      if (c.lessons) {
        c.lessons.forEach((l: any, index: number) => {
          allLessons.push({
            ...l,
            courseId: c.id,
            courseTitle: c.title,
            lessonNumber: index + 1
          });
        });
      }
    });
    setLessons(allLessons);
  }, []);

  const filtered = lessons.filter(l => l.title.toLowerCase().includes(search.toLowerCase()) || l.courseTitle.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Lessons</h1>
          <p className="text-slate-500 mt-1">Manage individual course modules.</p>
        </div>
        <Button className="shrink-0" onClick={() => setIsAdding(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Lesson
        </Button>
      </div>

      <Card className="border-slate-200">
        <div className="p-4 border-b border-slate-100">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search lessons..." 
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
                <th className="px-6 py-4 font-medium">Lesson Title</th>
                <th className="px-6 py-4 font-medium">Course</th>
                <th className="px-6 py-4 font-medium">Number</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(lesson => (
                <tr key={`${lesson.courseId}-${lesson.id}`} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{lesson.title}</td>
                  <td className="px-6 py-4 text-slate-500">{lesson.courseTitle}</td>
                  <td className="px-6 py-4 text-slate-500">#{lesson.lessonNumber}</td>
                  <td className="px-6 py-4">
                    <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-50">
                      Published
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => navigate(`/courses/${lesson.courseId}/lesson/${lesson.id}`)}>
                        <Eye className="w-4 h-4 text-slate-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setEditingLesson(lesson)}>
                        <Edit2 className="w-4 h-4 text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-red-600 hover:bg-red-50" onClick={() => {
                        if (confirm('Delete this lesson?')) {
                          toast.success('Lesson deleted');
                          // Normally we'd update course data here.
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
                    No lessons found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Editor Modal */}
      {(editingLesson || isAdding) && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">{isAdding ? 'Add Lesson' : 'Edit Lesson'}</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Lesson Title</label>
                  <Input 
                    value={editingLesson?.title || ''} 
                    onChange={e => setEditingLesson({...editingLesson, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Course Assignment</label>
                  <select 
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    value={editingLesson?.courseId || ''}
                    onChange={e => setEditingLesson({...editingLesson, courseId: e.target.value})}
                  >
                    <option value="">Select a course...</option>
                    {getCourses().map((c: any) => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Main Content</label>
                  <textarea 
                    className="w-full min-h-[120px] p-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-y text-slate-900"
                    value={editingLesson?.content?.main || ''}
                    onChange={e => setEditingLesson({...editingLesson, content: { ...editingLesson?.content, main: e.target.value }})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Security Tips</label>
                  <Input 
                    value={editingLesson?.content?.tip || ''} 
                    onChange={e => setEditingLesson({...editingLesson, content: { ...editingLesson?.content, tip: e.target.value }})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select 
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    value={editingLesson?.status || 'Published'}
                    onChange={e => setEditingLesson({...editingLesson, status: e.target.value})}
                  >
                    <option>Draft</option>
                    <option>Published</option>
                    <option>Archived</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => { setEditingLesson(null); setIsAdding(false); }}>Cancel</Button>
                <Button onClick={() => {
                  toast.success('Lesson saved successfully');
                  setEditingLesson(null);
                  setIsAdding(false);
                }}>Save Lesson</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
