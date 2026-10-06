const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Imports
if (!content.includes('Alerts')) {
  content = content.replace(
    "import { ProgressPage } from './pages/app/Progress';",
    `import { ProgressPage } from './pages/app/Progress';
import { Alerts } from './pages/app/Alerts';
import { AlertDetail } from './pages/app/AlertDetail';`
  );
}

if (!content.includes('AdminAlerts')) {
  content = content.replace(
    "import { AdminSettings } from './pages/admin/AdminSettings';",
    `import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminAlerts } from './pages/admin/AdminAlerts';`
  );
}

// Routes
if (!content.includes('<Route path="/alerts" element={<Alerts />} />')) {
  content = content.replace(
    '<Route path="/threats/:threatId" element={<ThreatDetail />} />',
    `<Route path="/threats/:threatId" element={<ThreatDetail />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/alerts/:alertId" element={<AlertDetail />} />`
  );
}

if (!content.includes('<Route path="alerts" element={<AdminAlerts />} />')) {
  content = content.replace(
    '<Route path="threats" element={<AdminThreats />} />',
    `<Route path="threats" element={<AdminThreats />} />
        <Route path="alerts" element={<AdminAlerts />} />`
  );
}

fs.writeFileSync('src/App.tsx', content);
