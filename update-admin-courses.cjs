const fs = require('fs');

let content = fs.readFileSync('src/pages/admin/AdminCourses.tsx', 'utf-8');

content = content.replace(
  "import { Input } from '../../components/ui/Input';",
  `import { Input } from '../../components/ui/Input';
import { saveCourses } from '../../lib/admin-content';
import { toast } from 'sonner';`
);

content = content.replace(
  "const [search, setSearch] = useState('');",
  `const [search, setSearch] = useState('');
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);`
);

content = content.replace(
  `        <Button className="shrink-0">
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </Button>`,
  `        <Button className="shrink-0" onClick={() => setIsAdding(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </Button>`
);

content = content.replace(
  `                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit2 className="w-4 h-4 text-blue-500" />
                      </Button>`,
  `                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setEditingCourse(course)}>
                        <Edit2 className="w-4 h-4 text-blue-500" />
                      </Button>`
);

content = content.replace(
  `                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Copy className="w-4 h-4 text-slate-500" />
                      </Button>`,
  `                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => {
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
                      </Button>`
);

const editorCode = `
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
`;

content = content.replace(
  '    </div>\n  );\n}',
  editorCode + '    </div>\n  );\n}'
);

fs.writeFileSync('src/pages/admin/AdminCourses.tsx', content);
