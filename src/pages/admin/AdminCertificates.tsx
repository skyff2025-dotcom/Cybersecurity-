import { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Search, Eye, Download, Printer } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { getProgress } from '../../lib/progress';
import { getCourses } from '../../lib/admin-content';
import { useNavigate } from 'react-router-dom';

export function AdminCertificates() {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const progress = getProgress();
    const courses = getCourses();
    
    const enrichedCerts = progress.certificates.map((cert: any) => {
      const course = courses.find((c: any) => c.id === cert.courseId);
      return {
        ...cert,
        courseTitle: course ? course.title : 'Unknown Course'
      };
    });
    
    setCertificates(enrichedCerts);
  }, []);

  const filtered = certificates.filter(c => 
    c.id.toLowerCase().includes(search.toLowerCase()) || 
    c.courseTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Certificates</h1>
          <p className="text-slate-500 mt-1">Manage issued learner certificates.</p>
        </div>
      </div>

      <Card className="border-slate-200">
        <div className="p-4 border-b border-slate-100">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search by ID or course..." 
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
                <th className="px-6 py-4 font-medium">Certificate ID</th>
                <th className="px-6 py-4 font-medium">Course</th>
                <th className="px-6 py-4 font-medium">Issue Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(cert => (
                <tr key={cert.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 font-mono text-xs">{cert.id}</td>
                  <td className="px-6 py-4 text-slate-500">{cert.courseTitle}</td>
                  <td className="px-6 py-4 text-slate-500">{new Date(cert.issueDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                      Valid
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => navigate(`/certificate/${cert.id}`)}>
                        <Eye className="w-4 h-4 text-slate-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="w-4 h-4 text-slate-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Printer className="w-4 h-4 text-slate-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No certificates have been issued yet.
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
