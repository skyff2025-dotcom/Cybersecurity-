import { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Plus, Search, Edit2, Eye, Trash2 } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { saveThreats } from '../../lib/admin-content';
import { toast } from 'sonner';
import { getThreats } from '../../lib/admin-content';
import { useNavigate } from 'react-router-dom';

export function AdminThreats() {
  const navigate = useNavigate();
  const [threats, setThreats] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [editingThreat, setEditingThreat] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setThreats(getThreats());
  }, []);

  const filtered = threats.filter(t => t.title.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Threat Center</h1>
          <p className="text-slate-500 mt-1">Manage cybersecurity threat topics.</p>
        </div>
        <Button className="shrink-0" onClick={() => setIsAdding(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Threat
        </Button>
      </div>

      <Card className="border-slate-200">
        <div className="p-4 border-b border-slate-100">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search threats..." 
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
                <th className="px-6 py-4 font-medium">Threat Name</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Severity</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(threat => (
                <tr key={threat.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{threat.title}</td>
                  <td className="px-6 py-4 text-slate-500">{threat.category}</td>
                  <td className="px-6 py-4">
                    <Badge variant={threat.severity === 'Critical' ? 'destructive' : threat.severity === 'High' ? 'default' : 'outline'} className={threat.severity === 'Critical' ? '' : threat.severity === 'High' ? 'bg-orange-500 hover:bg-orange-600' : ''}>
                      {threat.severity}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-50">
                      Published
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => navigate(`/threats/${threat.id}`)}>
                        <Eye className="w-4 h-4 text-slate-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setEditingThreat(threat)}>
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
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No threats found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

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
    </div>
  );
}
