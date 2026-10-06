const fs = require('fs');

let content = fs.readFileSync('src/lib/admin-content.ts', 'utf-8');

if (!content.includes('INITIAL_ALERTS')) {
  content = "import { INITIAL_ALERTS } from '../data/alerts';\n" + content;
  content += `
export function getAlerts() {
  const stored = localStorage.getItem('cyberaware_alerts');
  return stored ? JSON.parse(stored) : INITIAL_ALERTS;
}

export function saveAlerts(alerts: any) {
  localStorage.setItem('cyberaware_alerts', JSON.stringify(alerts));
}
`;
  fs.writeFileSync('src/lib/admin-content.ts', content);
}
