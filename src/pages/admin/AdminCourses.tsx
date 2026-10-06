import { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Plus, Search, Edit2, Copy, Trash2, Eye } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { saveCourses } from '../../lib/admin-content';
import { toast } from 'sonner';
import { getCourses } from '../../lib/admin-content';
import { useNavigate } from 'react-router-dom';

export function AdminCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setCourses(getCourses());
  }, []);

  const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Courses</h1>
          <p className="text-slate-500 mt-1">Manage educational modules.</p>
        </div>
        <Button className="shrink-0" onClick={() => setIsAdding(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </Button>
      </div>

      <Card className="border-slate-200">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search courses..." 
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
                <th className="px-6 py-4 font-medium">Course</th>
                <th className="px-6 py-4 font-medium">Level</th>
                <th className="px-6 py-4 font-medium">Lessons</th>
                <th className="px-6 py-4 font-medium">XP</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(course => (
                <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{course.title}</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="bg-white">{course.difficulty || 'Beginner'}</Badge>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{course.lessons?.length || 0}</td>
                  <td className="px-6 py-4 text-slate-500">{course.xp || 0}</td>
                  <td className="px-6 py-4">
                    <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-50">
                      {course.status || 'Published'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => navigate(`/courses/${course.id}`)}>
                        <Eye className="w-4 h-4 text-slate-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setEditingCourse(course)}>
                        <Edit2 className="w-4 h-4 text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => {
                          const newCourse = { ...course, id: course.id + '-copy', title: course.title + ' (Copy)' };
                          const newCourses = [...courses, newCourse];
                          setCourses(newCourses);
                          saveCourses(newCourses);
                          toast.success('Course duplicated');
                        }}>
                        <Copy className="w-4 h-4 text-slate-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-red-600" onClick={() => {
                        if (confirm('Delete this course?')) {
                          const newCourses = courses.filter(c => c.id !== course.id);
                          setCourses(newCourses);
                          saveCourses(newCourses);
                          toast.success('Course deleted');
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
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    No courses found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Editor Modal */}
      {(editingCourse || isAdding) && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">{isAdding ? 'Add Course' : 'Edit Course'}</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Course Title</label>
                  <Input 
                    value={editingCourse?.title || ''} 
                    onChange={e => setEditingCourse({...editingCourse, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea 
                    className="w-full min-h-[100px] p-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-y text-slate-900"
                    value={editingCourse?.description || ''}
                    onChange={e => setEditingCourse({...editingCourse, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Difficulty</label>
                    <select 
                      className="w-full h-10 px-3 rounded-lg border border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                      value={editingCourse?.difficulty || 'Beginner'}
                      onChange={e => setEditingCourse({...editingCourse, difficulty: e.target.value})}
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">XP Reward</label>
                    <Input 
                      type="number"
                      value={editingCourse?.xp || 0} 
                      onChange={e => setEditingCourse({...editingCourse, xp: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select 
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    value={editingCourse?.status || 'Published'}
                    onChange={e => setEditingCourse({...editingCourse, status: e.target.value})}
                  >
                    <option>Draft</option>
                    <option>Published</option>
                    <option>Archived</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => { setEditingCourse(null); setIsAdding(false); }}>Cancel</Button>
                <Button onClick={() => {
                  const newCourse = { ...editingCourse, id: editingCourse.id || Date.now().toString() };
                  const newCourses = isAdding 
                    ? [...courses, newCourse]
                    : courses.map(c => c.id === newCourse.id ? newCourse : c);
                  setCourses(newCourses);
                  saveCourses(newCourses);
                  toast.success('Course saved successfully');
                  setEditingCourse(null);
                  setIsAdding(false);
                }}>Save Course</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
