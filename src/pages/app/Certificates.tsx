import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Shield, ArrowRight, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { getProgress, CyberAwareProgress } from '../../lib/progress';
import { getCourses } from '../../lib/admin-content';
import { generateCertificate } from '../../lib/certificates';

export function Certificates() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<CyberAwareProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
    window.scrollTo(0, 0);
  }, []);

  if (!progress) return null;

  const completedCourses = getCourses().filter(course => {
    const completedLessons = progress.completedLessonIds.filter(id => id.startsWith(`${course.id}-`)).length;
    return completedLessons === course.lessons.length;
  });

  const handleGenerateCertificate = (courseId: string) => {
    const cert = generateCertificate(courseId);
    if (cert) {
      // Re-fetch progress to update the list
      setProgress(getProgress());
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Your Certificates</h1>
        <p className="text-slate-500 mt-1">Celebrate your cybersecurity learning achievements.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Button variant="outline" onClick={() => navigate('/certificate/verify')} className="bg-white">
          <Shield className="w-4 h-4 mr-2" /> Verify a Certificate
        </Button>
      </div>

      {completedCourses.length === 0 ? (
        <Card className="border-slate-200 shadow-sm border-dashed">
          <CardContent className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mb-4">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">No certificates yet</h2>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              Complete a CyberAware course to earn your first certificate. Certificates prove your knowledge in cybersecurity fundamentals.
            </p>
            <Button onClick={() => navigate('/courses')}>
              Explore Courses <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {completedCourses.map(course => {
            const existingCert = progress.certificates.find(c => c.courseId === course.id);
            
            return (
              <Card key={course.id} className="border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="h-32 bg-slate-100 flex items-center justify-center relative overflow-hidden border-b border-slate-200">
                  <div className="absolute inset-0 bg-blue-600/5 mix-blend-multiply pointer-events-none" />
                  <course.icon className="w-16 h-16 text-slate-300 opacity-50 absolute right-4 -bottom-4" />
                  <Award className="w-12 h-12 text-purple-600 relative z-10" />
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200 mb-2">
                      100% Completed
                    </Badge>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{course.title}</h3>
                  
                  {existingCert ? (
                    <div className="mt-auto pt-6 space-y-3">
                      <p className="text-xs text-slate-500 font-medium">Issued: {new Date(existingCert.issueDate).toLocaleDateString()}</p>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={() => navigate(`/certificate/${existingCert.id}`)}>
                        View Certificate <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  ) : (
                    <div className="mt-auto pt-6 space-y-3">
                      <p className="text-sm text-green-600 font-medium flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Certificate Available
                      </p>
                      <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white" onClick={() => handleGenerateCertificate(course.id)}>
                        Generate Certificate
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
