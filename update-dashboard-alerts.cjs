const fs = require('fs');
let content = fs.readFileSync('src/pages/app/Dashboard.tsx', 'utf-8');

// Add imports if they don't exist
if (!content.includes('getAlerts')) {
  content = content.replace(
    "import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';",
    `import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { getAlerts } from '../../lib/admin-content';
import { isAlertRead } from '../../lib/alerts';`
  );
  content = content.replace(
    "import { Shield, BookOpen, Award, Target, Trophy, Clock, Zap, ArrowRight, PlayCircle, BookCheck } from 'lucide-react';",
    "import { Shield, BookOpen, Award, Target, Trophy, Clock, Zap, ArrowRight, PlayCircle, BookCheck, ShieldAlert, AlertTriangle } from 'lucide-react';"
  );
}

// Prepare latest alerts logic
if (!content.includes('const latestAlerts')) {
  content = content.replace(
    "const courses = getCourses();",
    `const courses = getCourses();
  const alerts = getAlerts().filter((a: any) => a.status === 'Published').sort((a: any, b: any) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
  const latestAlerts = alerts.slice(0, 3);`
  );
}

// Add Security Alerts Widget
const widgetHtml = `
      {/* Security Alerts Widget */}
      <div className="grid grid-cols-1 mb-8">
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-[#0B1F3A] p-4 flex justify-between items-center text-white">
            <h2 className="text-lg font-bold flex items-center">
              <ShieldAlert className="w-5 h-5 mr-2 text-[#F97316]" />
              Security Alerts & News
            </h2>
            <Button variant="ghost" size="sm" className="text-blue-100 hover:text-white hover:bg-white/10" onClick={() => navigate('/alerts')}>
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {latestAlerts.map((alert: any) => {
                const read = isAlertRead(alert.id);
                return (
                  <div key={alert.id} className={\`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-slate-50 \${read ? 'opacity-70' : ''}\`}>
                    <div className="flex items-start gap-4">
                      <div className={\`mt-1 w-2 h-2 rounded-full shrink-0 \${read ? 'bg-slate-300' : 'bg-[#F97316]'}\`}></div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={\`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border \${
                            alert.severity === 'Critical' ? 'bg-red-50 text-red-700 border-red-200' :
                            alert.severity === 'High' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                            alert.severity === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                            'bg-blue-50 text-blue-700 border-blue-200'
                          }\`}>
                            {alert.severity}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">{new Date(alert.publishedDate).toLocaleDateString()}</span>
                        </div>
                        <h3 className={\`font-semibold \${read ? 'text-slate-600' : 'text-slate-900'}\`}>{alert.title}</h3>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => navigate(\`/alerts/\${alert.id}\`)} className="shrink-0 w-full sm:w-auto">
                      Read
                    </Button>
                  </div>
                );
              })}
              {latestAlerts.length === 0 && (
                 <div className="p-6 text-center text-slate-500">
                   No recent security alerts.
                 </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
`;

content = content.replace(
  '<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">',
  widgetHtml
);

fs.writeFileSync('src/pages/app/Dashboard.tsx', content);
