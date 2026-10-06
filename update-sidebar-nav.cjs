const fs = require('fs');

let content = fs.readFileSync('src/components/layout/Sidebar.tsx', 'utf-8');

if (!content.includes('path: \'/alerts\'')) {
  content = content.replace(
    "{ name: 'Threat Center', path: '/threats', icon: AlertTriangle },",
    "{ name: 'Threat Center', path: '/threats', icon: AlertTriangle },\n  { name: 'Security Alerts', path: '/alerts', icon: Bell },"
  );
  
  if (!content.includes('Bell')) {
    content = content.replace(
      "Menu,",
      "Menu,\n  Bell,"
    );
  }
  
  fs.writeFileSync('src/components/layout/Sidebar.tsx', content);
}
