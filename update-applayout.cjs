const fs = require('fs');

let content = fs.readFileSync('src/components/layout/AppLayout.tsx', 'utf-8');

if (!content.includes('href: \'/alerts\'')) {
  // We need to inject Security Alerts into the navigation array
  // Assuming there's a navigation array
  content = content.replace(
    "{ name: 'Threat Center', href: '/threats', icon: Shield },",
    "{ name: 'Threat Center', href: '/threats', icon: Shield },\n  { name: 'Security Alerts', href: '/alerts', icon: Bell },"
  );
  
  if (!content.includes('Bell')) {
    content = content.replace(
      "Shield, Trophy, Menu, X, ChevronDown, User, LogOut, FileBadge",
      "Shield, Trophy, Menu, X, ChevronDown, User, LogOut, FileBadge, Bell"
    );
  }

  fs.writeFileSync('src/components/layout/AppLayout.tsx', content);
}
