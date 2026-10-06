import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldAlert, AlertTriangle, ChevronLeft, Info, Eye, ShieldCheck, HelpCircle, FileText } from 'lucide-react';
import { Threat } from '../../data/threats';
import { getThreats } from '../../lib/admin-content';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { getProgress, saveProgress, addActivity } from '../../lib/progress';

export function ThreatDetail() {
  const { threatId } = useParams<{ threatId: string }>();
  const navigate = useNavigate();
  const [threat, setThreat] = useState<Threat | null>(null);

  useEffect(() => {
    const found = getThreats().find(t => t.id === threatId);
    if (found) {
      setThreat(found);
      
      const currentProgress = getProgress();
      if (!currentProgress.viewedThreatIds.includes(found.id)) {
        const newViewed = [...currentProgress.viewedThreatIds, found.id];
        saveProgress({ viewedThreatIds: newViewed });
        addActivity('threat', `Viewed threat: ${found.title}`);
      }
    } else {
      navigate('/threats');
    }
  }, [threatId, navigate]);

  if (!threat) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto pb-12">
      <Button variant="ghost" onClick={() => navigate('/threats')} className="mb-2">
        <ChevronLeft className="w-4 h-4 mr-2" /> Back to Threat Center
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-700">
                {threat.category}
              </Badge>
              <Badge variant={
                threat.severity === 'Critical' ? 'destructive' :
                threat.severity === 'High' ? 'warning' :
                threat.severity === 'Medium' ? 'info' : 'secondary'
              } className="flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> {threat.severity} Severity
              </Badge>
              <Badge variant="outline" className="bg-slate-100 text-slate-500 border-none">
                {threat.status}
              </Badge>
            </div>
            
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4 flex items-center gap-3">
              <ShieldAlert className={`w-8 h-8 ${
                threat.severity === 'Critical' ? 'text-red-500' :
                threat.severity === 'High' ? 'text-orange-500' :
                'text-amber-500'
              }`} /> 
              {threat.title}
            </h1>
          </div>

          <Card className="border-0 shadow-md">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" /> Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-slate-700 leading-relaxed text-lg">
              {threat.overview}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600" /> How It Works
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ol className="list-decimal list-outside ml-5 space-y-3 text-slate-700">
                {threat.howItWorks.map((step, idx) => (
                  <li key={idx} className="pl-2">{step}</li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
              <CardTitle className="text-xl flex items-center gap-2">
                <Eye className="w-5 h-5 text-amber-600" /> Common Warning Signs
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-3">
                {threat.warningSigns.map((sign, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700">{sign}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-6">
          <Card className="border-emerald-200 bg-emerald-50 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheck className="w-24 h-24 text-emerald-600" />
            </div>
            <CardHeader className="pb-3 relative z-10">
              <CardTitle className="text-lg flex items-center gap-2 text-emerald-900">
                <ShieldCheck className="w-5 h-5 text-emerald-600" /> How to Protect Yourself
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <ul className="space-y-3">
                {threat.protection.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-emerald-800">
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-blue-900">
                <Info className="w-5 h-5 text-blue-600" /> What to Do If Affected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-outside ml-4 space-y-2 text-sm text-blue-800">
                {threat.response.map((step, idx) => (
                  <li key={idx} className="pl-1">{step}</li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Related Keywords</p>
              <div className="flex flex-wrap gap-2">
                {threat.keywords.map(kw => (
                  <span key={kw}>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-normal">
                      {kw}
                    </Badge>
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
