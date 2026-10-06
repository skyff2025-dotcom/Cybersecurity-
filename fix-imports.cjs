const fs = require('fs');

// Fix Sidebar.tsx
let sidebar = fs.readFileSync('src/components/layout/Sidebar.tsx', 'utf-8');
if (!sidebar.includes('import {') || !sidebar.includes('Bell')) {
  sidebar = sidebar.replace("import { \n  Shield,", "import { \n  Shield,\n  Bell,");
  sidebar = sidebar.replace("import {\n  Shield,", "import {\n  Shield,\n  Bell,");
  sidebar = sidebar.replace("import { Shield", "import { Shield, Bell");
}
// Actually, earlier I did:
// content = content.replace("Menu,", "Menu,\n  Bell,");
// So Bell should be in the import block. Let's make sure it's in lucide-react import
sidebar = sidebar.replace(/} from 'lucide-react';/g, ", Bell } from 'lucide-react';");
fs.writeFileSync('src/components/layout/Sidebar.tsx', sidebar);

// Fix AlertDetail.tsx
let alertDetail = fs.readFileSync('src/pages/app/AlertDetail.tsx', 'utf-8');
alertDetail = alertDetail.replace("ExternalLink } from 'lucide-react';", "ExternalLink, Shield } from 'lucide-react';");
fs.writeFileSync('src/pages/app/AlertDetail.tsx', alertDetail);

// Fix Dashboard.tsx
let dashboard = fs.readFileSync('src/pages/app/Dashboard.tsx', 'utf-8');
// If ShieldAlert missing
dashboard = dashboard.replace(/} from 'lucide-react';/g, ", ShieldAlert } from 'lucide-react';");

// Check where latestAlerts went
if (dashboard.includes('const latestAlerts = alerts.slice(0, 3);')) {
  // We need to move it out to the main component body if it's trapped in a block, OR it just needs to be accessible in the JSX.
  // Actually, Dashboard doesn't use `const courses = getCourses()` in its body, wait, the old dashboard did use it to count them. Let's extract it safely.
}
fs.writeFileSync('src/pages/app/Dashboard.tsx', dashboard);

