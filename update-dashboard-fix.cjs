const fs = require('fs');

let dashboard = fs.readFileSync('src/pages/app/Dashboard.tsx', 'utf-8');
if (!dashboard.includes('const latestAlerts')) {
  dashboard = dashboard.replace(
    "const totalCourses = getCourses().length;",
    `const alerts = getAlerts().filter((a: any) => a.status === 'Published').sort((a: any, b: any) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
  const latestAlerts = alerts.slice(0, 3);
  const totalCourses = getCourses().length;`
  );
  
  if (!dashboard.includes('getAlerts')) {
    dashboard = dashboard.replace(
      "import { getThreats } from '../../lib/admin-content';",
      "import { getThreats, getAlerts } from '../../lib/admin-content';\nimport { isAlertRead } from '../../lib/alerts';"
    );
  }
}
fs.writeFileSync('src/pages/app/Dashboard.tsx', dashboard);
