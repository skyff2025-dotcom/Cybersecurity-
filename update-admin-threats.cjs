const fs = require('fs');
let content = fs.readFileSync('src/pages/admin/AdminThreats.tsx', 'utf-8');

content = content.replace(
  "import { Input } from '../../components/ui/Input';",
  `import { Input } from '../../components/ui/Input';
import { saveThreats } from '../../lib/admin-content';
import { toast } from 'sonner';`
);

content = content.replace(
  "const [search, setSearch] = useState('');",
  `const [search, setSearch] = useState('');
  const [editingThreat, setEditingThreat] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);`
);

content = content.replace(
  `        <Button className="shrink-0">
          <Plus className="w-4 h-4 mr-2" />
          Add Threat
        </Button>`,
  `        <Button className="shrink-0" onClick={() => setIsAdding(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Threat
        </Button>`
);

content = content.replace(
  `                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit2 className="w-4 h-4 text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>`,
  `                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setEditingThreat(threat)}>
                        <Edit2 className="w-4 h-4 text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-red-600 hover:bg-red-50" onClick={() => {
                        if (confirm('Delete this threat?')) {
                          const newThreats = threats.filter(t => t.id !== threat.id);
                          setThreats(newThreats);
                          saveThreats(newThreats);
                          toast.success('Threat deleted');
                        }
                      }}>
                        <Trash2 className="w-4 h-4" />
                      </Button>`
);

const editorCode = `
      {/* Editor Modal */}
      {(editingThreat || isAdding) && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">{isAdding ? 'Add Threat' : 'Edit Threat'}</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Threat Name</label>
                  <Input 
                    value={editingThreat?.title || ''} 
                    onChange={e => setEditingThreat({...editingThreat, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                    <select 
                      className="w-full h-10 px-3 rounded-lg border border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                      value={editingThreat?.category || 'Phishing'}
                      onChange={e => setEditingThreat({...editingThreat, category: e.target.value})}
                    >
                      <option>Phishing</option>
                      <option>Malware</option>
                      <option>Ransomware</option>
                      <option>Social Engineering</option>
                      <option>Data Breach</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Severity</label>
                    <select 
                      className="w-full h-10 px-3 rounded-lg border border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                      value={editingThreat?.severity || 'Medium'}
                      onChange={e => setEditingThreat({...editingThreat, severity: e.target.value})}
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Overview / Description</label>
                  <textarea 
                    className="w-full min-h-[100px] p-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-y text-slate-900"
                    value={editingThreat?.overview || ''}
                    onChange={e => setEditingThreat({...editingThreat, overview: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select 
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    value={editingThreat?.status || 'Published'}
                    onChange={e => setEditingThreat({...editingThreat, status: e.target.value})}
                  >
                    <option>Draft</option>
                    <option>Published</option>
                    <option>Archived</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => { setEditingThreat(null); setIsAdding(false); }}>Cancel</Button>
                <Button onClick={() => {
                  const newThreat = { ...editingThreat, id: editingThreat.id || Date.now().toString() };
                  const newThreats = isAdding 
                    ? [...threats, newThreat]
                    : threats.map(t => t.id === newThreat.id ? newThreat : t);
                  setThreats(newThreats);
                  saveThreats(newThreats);
                  toast.success('Threat saved successfully');
                  setEditingThreat(null);
                  setIsAdding(false);
                }}>Save Threat</Button>
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

fs.writeFileSync('src/pages/admin/AdminThreats.tsx', content);
