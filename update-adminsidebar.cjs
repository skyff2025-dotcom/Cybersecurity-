const fs = require('fs');

let content = fs.readFileSync('src/components/layout/AdminSidebar.tsx', 'utf-8');

if (!content.includes('href: \'/admin/alerts\'')) {
  content = content.replace(
    "{ name: 'Threat Center', href: '/admin/threats', icon: Shield },",
    "{ name: 'Threat Center', href: '/admin/threats', icon: Shield },\n  { name: 'Security Alerts', href: '/admin/alerts', icon: Bell },"
  );
  
  if (!content.includes('Bell')) {
    content = content.replace(
      "Shield, FileBadge, Settings, BarChart2, ShieldAlert",
      "Shield, FileBadge, Settings, BarChart2, ShieldAlert, Bell"
    );
  }

  fs.writeFileSync('src/components/layout/AdminSidebar.tsx', content);
}
