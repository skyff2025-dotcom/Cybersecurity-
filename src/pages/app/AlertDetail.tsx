import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShieldAlert, AlertTriangle, ChevronLeft, Info, Eye, ShieldCheck, HelpCircle, FileText, Clock, ExternalLink, Shield } from 'lucide-react';
import { getAlerts } from '../../lib/admin-content';
import { markAlertAsRead } from '../../lib/alerts';
import { SecurityAlert } from '../../data/alerts';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export function AlertDetail() {
  const { alertId } = useParams();
  const navigate = useNavigate();
  const [alert, setAlert] = useState<SecurityAlert | null>(null);

  useEffect(() => {
    const alerts = getAlerts();
    const found = alerts.find((a: any) => a.id === alertId);
    if (found) {
      setAlert(found);
      markAlertAsRead(found.id);
    }
  }, [alertId]);

  if (!alert) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <ShieldAlert className="h-16 w-16 text-slate-300 mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Alert Not Found</h2>
        <p className="text-slate-500 mb-6 max-w-md">The security alert you're looking for doesn't exist or has been archived.</p>
        <Button onClick={() => navigate('/alerts')}>Return to Alerts</Button>
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/alerts')}
        className="mb-2 -ml-2 text-slate-500 hover:text-slate-900"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Alerts
      </Button>

      <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200 relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-1.5 h-full ${
          alert.severity === 'Critical' ? 'bg-red-500' : 
          alert.severity === 'High' ? 'bg-[#F97316]' : 
          alert.severity === 'Medium' ? 'bg-yellow-500' : 'bg-blue-500'
        }`} />
        
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Badge variant="outline" className={`border font-medium ${getSeverityColor(alert.severity)}`}>
            {alert.severity} Severity
          </Badge>
          <Badge variant="secondary" className="bg-slate-100 text-slate-700 font-medium border border-slate-200">
            {alert.category}
          </Badge>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] mb-4 tracking-tight">
          {alert.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-medium pb-6 border-b border-slate-100 mb-8">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {new Date(alert.publishedDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            {alert.readTime} min read
          </span>
          <span className="flex items-center gap-1.5 text-[#F97316]">
            <ShieldAlert className="w-4 h-4" />
            {alert.sourceType}
          </span>
        </div>

        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4">Overview</h2>
          <p className="text-slate-700 text-lg leading-relaxed mb-8">{alert.content}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <Card className="border-[#F97316]/20 bg-[#FFF1E6]/50 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center text-[#0B1F3A]">
                  <AlertTriangle className="w-5 h-5 mr-2 text-[#F97316]" />
                  Warning Signs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {alert.warningSigns.map((sign, i) => (
                    <li key={i} className="flex items-start text-slate-700">
                      <span className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-[#F97316] shrink-0" />
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center text-green-800">
                  <ShieldCheck className="w-5 h-5 mr-2 text-green-600" />
                  How to Protect Yourself
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {alert.protectionSteps.map((step, i) => (
                    <li key={i} className="flex items-start text-green-900">
                      <span className="mr-2 mt-1 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4">Response Steps (If Affected)</h2>
          <ul className="space-y-3 mb-10">
            {alert.responseSteps.map((step, i) => (
              <li key={i} className="flex items-start p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0B1F3A] text-white text-xs font-bold mr-3 shrink-0">
                  {i + 1}
                </span>
                <span className="text-slate-700 pt-0.5">{step}</span>
              </li>
            ))}
          </ul>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-10">
            <h3 className="text-lg font-bold text-[#0B1F3A] flex items-center mb-4">
              <Info className="w-5 h-5 mr-2 text-blue-600" />
              Key Takeaways
            </h3>
            <ul className="space-y-2">
              {alert.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start text-blue-900 font-medium">
                  <span className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100">
          <h3 className="text-lg font-bold text-[#0B1F3A] mb-4">Further Actions</h3>
          <div className="flex flex-wrap gap-3">
            {alert.relatedThreatId && (
              <Button asChild variant="outline" className="border-slate-200 hover:bg-slate-50 hover:text-slate-900">
                <Link to={`/threats/${alert.relatedThreatId}`}>
                  <FileText className="w-4 h-4 mr-2 text-slate-500" />
                  View Related Threat
                </Link>
              </Button>
            )}
            {alert.relatedCourseId && (
              <Button asChild variant="outline" className="border-slate-200 hover:bg-slate-50 hover:text-slate-900">
                <Link to={`/courses/${alert.relatedCourseId}`}>
                  <Shield className="w-4 h-4 mr-2 text-blue-500" />
                  Continue Learning
                </Link>
              </Button>
            )}
            {alert.relatedQuizCategory && (
              <Button asChild className="bg-[#0B1F3A] hover:bg-[#163A63] text-white">
                <Link to={`/quiz/${alert.relatedQuizCategory}`}>
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Test Your Knowledge
                </Link>
              </Button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
