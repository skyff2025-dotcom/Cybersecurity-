import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Plus, Search, Edit2, Trash2, Eye, EyeOff, Archive, AlertTriangle } from 'lucide-react';
import { getAlerts, saveAlerts } from '../../lib/admin-content';
import { SecurityAlert } from '../../data/alerts';
import { toast } from 'sonner';

export function AdminAlerts() {
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [search, setSearch] = useState('');
  const [editingAlert, setEditingAlert] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setAlerts(getAlerts());
  }, []);

  const filteredAlerts = alerts.filter(a => 
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'Critical': return 'bg-red-100 text-red-700';
      case 'High': return 'bg-orange-100 text-orange-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Published': return 'bg-green-100 text-green-700';
      case 'Draft': return 'bg-slate-100 text-slate-700';
      case 'Archived': return 'bg-orange-100 text-orange-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const handleSave = () => {
    if (!editingAlert.title || !editingAlert.summary) {
      toast.error('Title and Summary are required');
      return;
    }

    const newAlert = {
      ...editingAlert,
      id: editingAlert.id || `alert-${Date.now()}`,
      publishedDate: editingAlert.publishedDate || new Date().toISOString(),
      warningSigns: Array.isArray(editingAlert.warningSigns) 
        ? editingAlert.warningSigns 
        : (editingAlert.warningSigns || '').split('\\n').filter(Boolean),
      protectionSteps: Array.isArray(editingAlert.protectionSteps) 
        ? editingAlert.protectionSteps 
        : (editingAlert.protectionSteps || '').split('\\n').filter(Boolean),
      responseSteps: Array.isArray(editingAlert.responseSteps) 
        ? editingAlert.responseSteps 
        : (editingAlert.responseSteps || '').split('\\n').filter(Boolean),
      keyTakeaways: Array.isArray(editingAlert.keyTakeaways) 
        ? editingAlert.keyTakeaways 
        : (editingAlert.keyTakeaways || '').split('\\n').filter(Boolean)
    };

    let newAlerts;
    if (isAdding) {
      newAlerts = [newAlert, ...alerts];
    } else {
      newAlerts = alerts.map(a => a.id === newAlert.id ? newAlert : a);
    }
    
    setAlerts(newAlerts);
    saveAlerts(newAlerts);
    toast.success(`Alert ${isAdding ? 'created' : 'updated'} successfully`);
    setIsAdding(false);
    setEditingAlert(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this alert?')) {
      const newAlerts = alerts.filter(a => a.id !== id);
      setAlerts(newAlerts);
      saveAlerts(newAlerts);
      toast.success('Alert deleted');
    }
  };

  const toggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Published' ? 'Draft' : 'Published';
    const newAlerts = alerts.map(a => a.id === id ? { ...a, status: newStatus as any } : a);
    setAlerts(newAlerts);
    saveAlerts(newAlerts);
    toast.success(`Alert ${newStatus.toLowerCase()}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Security Alerts</h1>
          <p className="text-slate-500">Manage cybersecurity news and awareness alerts.</p>
        </div>
        <Button onClick={() => {
          setIsAdding(true);
          setEditingAlert({
            title: '', summary: '', category: 'Phishing', severity: 'Medium', 
            readTime: 3, sourceType: 'CyberAware Awareness Update', content: '',
            warningSigns: [], protectionSteps: [], responseSteps: [], keyTakeaways: [],
            status: 'Draft'
          });
        }}>
          <Plus className="w-4 h-4 mr-2" />
          Create Alert
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search alerts..." 
                className="pl-9 bg-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="p-4">Alert</th>
                  <th className="p-4">Category & Severity</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredAlerts.map(alert => (
                  <tr key={alert.id} className="hover:bg-slate-50">
                    <td className="p-4">
                      <div className="font-medium text-slate-900">{alert.title}</div>
                      <div className="text-sm text-slate-500 truncate max-w-md">{alert.summary}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-slate-100">{alert.category}</Badge>
                        <Badge variant="secondary" className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="secondary" className={getStatusColor(alert.status)}>
                        {alert.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          title={alert.status === 'Published' ? "Unpublish" : "Publish"}
                          onClick={() => toggleStatus(alert.id, alert.status)}
                        >
                          {alert.status === 'Published' ? <EyeOff className="w-4 h-4 text-orange-500" /> : <Eye className="w-4 h-4 text-green-500" />}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => {
                          setEditingAlert({...alert, 
                            warningSigns: alert.warningSigns.join('\\n'),
                            protectionSteps: alert.protectionSteps.join('\\n'),
                            responseSteps: alert.responseSteps.join('\\n'),
                            keyTakeaways: alert.keyTakeaways.join('\\n')
                          });
                        }}>
                          <Edit2 className="w-4 h-4 text-blue-500" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(alert.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredAlerts.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500">
                      No alerts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Editor Modal */}
      {(editingAlert || isAdding) && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">{isAdding ? 'Create Security Alert' : 'Edit Security Alert'}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                    <Input 
                      value={editingAlert.title || ''} 
                      onChange={e => setEditingAlert({...editingAlert, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Short Summary</label>
                    <textarea 
                      className="w-full h-20 p-3 rounded-lg border border-slate-200 text-sm focus:border-blue-500 outline-none resize-y"
                      value={editingAlert.summary || ''}
                      onChange={e => setEditingAlert({...editingAlert, summary: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                      <select 
                        className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-blue-500 outline-none"
                        value={editingAlert.category || 'Phishing'}
                        onChange={e => setEditingAlert({...editingAlert, category: e.target.value})}
                      >
                        <option>Phishing</option>
                        <option>Malware</option>
                        <option>Ransomware</option>
                        <option>Data Breach</option>
                        <option>Password Security</option>
                        <option>Mobile Security</option>
                        <option>Web Security</option>
                        <option>Privacy</option>
                        <option>Social Engineering</option>
                        <option>AI Security</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Severity</label>
                      <select 
                        className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-blue-500 outline-none"
                        value={editingAlert.severity || 'Medium'}
                        onChange={e => setEditingAlert({...editingAlert, severity: e.target.value})}
                      >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Critical</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Source Type</label>
                      <Input 
                        value={editingAlert.sourceType || ''} 
                        onChange={e => setEditingAlert({...editingAlert, sourceType: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Read Time (mins)</label>
                      <Input 
                        type="number"
                        value={editingAlert.readTime || 3} 
                        onChange={e => setEditingAlert({...editingAlert, readTime: parseInt(e.target.value) || 3})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Main Content / Overview</label>
                    <textarea 
                      className="w-full min-h-[150px] p-3 rounded-lg border border-slate-200 text-sm focus:border-blue-500 outline-none resize-y"
                      value={editingAlert.content || ''}
                      onChange={e => setEditingAlert({...editingAlert, content: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Warning Signs (1 per line)</label>
                    <textarea 
                      className="w-full h-24 p-3 rounded-lg border border-slate-200 text-sm focus:border-blue-500 outline-none resize-y"
                      value={editingAlert.warningSigns || ''}
                      onChange={e => setEditingAlert({...editingAlert, warningSigns: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Protection Steps (1 per line)</label>
                    <textarea 
                      className="w-full h-24 p-3 rounded-lg border border-slate-200 text-sm focus:border-blue-500 outline-none resize-y"
                      value={editingAlert.protectionSteps || ''}
                      onChange={e => setEditingAlert({...editingAlert, protectionSteps: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Response Steps (1 per line)</label>
                    <textarea 
                      className="w-full h-24 p-3 rounded-lg border border-slate-200 text-sm focus:border-blue-500 outline-none resize-y"
                      value={editingAlert.responseSteps || ''}
                      onChange={e => setEditingAlert({...editingAlert, responseSteps: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Key Takeaways (1 per line)</label>
                    <textarea 
                      className="w-full h-24 p-3 rounded-lg border border-slate-200 text-sm focus:border-blue-500 outline-none resize-y"
                      value={editingAlert.keyTakeaways || ''}
                      onChange={e => setEditingAlert({...editingAlert, keyTakeaways: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                      <select 
                        className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm focus:border-blue-500 outline-none"
                        value={editingAlert.status || 'Draft'}
                        onChange={e => setEditingAlert({...editingAlert, status: e.target.value})}
                      >
                        <option>Draft</option>
                        <option>Published</option>
                        <option>Archived</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-200">
                <Button variant="outline" onClick={() => { setEditingAlert(null); setIsAdding(false); }}>Cancel</Button>
                <Button onClick={handleSave} className="bg-[#0B1F3A] hover:bg-[#163A63] text-white">Save Alert</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
