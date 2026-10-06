const fs = require('fs');

let content = fs.readFileSync('src/components/layout/AdminSidebar.tsx', 'utf-8');

content = content.replace(
  /const adminNavItems = \[.*?\];/s,
  `const adminNavItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Courses', path: '/admin/courses', icon: FileText },
  { name: 'Lessons', path: '/admin/lessons', icon: Video },
  { name: 'Quiz Questions', path: '/admin/quizzes', icon: HelpCircle },
  { name: 'Threat Center', path: '/admin/threats', icon: AlertTriangle },
  { name: 'Certificates', path: '/admin/certificates', icon: Award },
  { name: 'Leaderboard', path: '/admin/leaderboard', icon: Users },
  { name: 'Analytics', path: '/admin/analytics', icon: BarChart },
];`
);

content = content.replace(
  `        <div className="p-4 border-t border-slate-800">
          <nav className="space-y-1">`,
  `        <div className="p-4 border-t border-slate-800">
          <div className="mb-4 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-lg p-3 text-xs text-center font-medium">
            Demo Admin Mode<br/><span className="text-amber-500/70 font-normal">Not Production Secure</span>
          </div>
          <nav className="space-y-1">`
);

fs.writeFileSync('src/components/layout/AdminSidebar.tsx', content);
