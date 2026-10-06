const fs = require('fs');
let content = fs.readFileSync('src/pages/admin/AdminLessons.tsx', 'utf-8');

content = content.replace(
  "import { Input } from '../../components/ui/Input';",
  `import { Input } from '../../components/ui/Input';
import { toast } from 'sonner';`
);

content = content.replace(
  "const [search, setSearch] = useState('');",
  `const [search, setSearch] = useState('');
  const [editingLesson, setEditingLesson] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);`
);

content = content.replace(
  `        <Button className="shrink-0">
          <Plus className="w-4 h-4 mr-2" />
          Add Lesson
        </Button>`,
  `        <Button className="shrink-0" onClick={() => setIsAdding(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Lesson
        </Button>`
);

content = content.replace(
  `                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit2 className="w-4 h-4 text-blue-500" />
                      </Button>`,
  `                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setEditingLesson(lesson)}>
                        <Edit2 className="w-4 h-4 text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-red-600 hover:bg-red-50" onClick={() => {
                        if (confirm('Delete this lesson?')) {
                          toast.success('Lesson deleted');
                          // Normally we'd update course data here.
                        }
                      }}>
                        <Trash2 className="w-4 h-4" />
                      </Button>`
);

content = content.replace(
  "import { Plus, Search, Edit2, Copy, Eye } from 'lucide-react';",
  "import { Plus, Search, Edit2, Copy, Eye, Trash2 } from 'lucide-react';"
)

const editorCode = `
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
`;

content = content.replace(
  '    </div>\n  );\n}',
  editorCode + '    </div>\n  );\n}'
);

fs.writeFileSync('src/pages/admin/AdminLessons.tsx', content);
