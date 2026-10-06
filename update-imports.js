const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/**/*.{ts,tsx}');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let changed = false;

  if (content.includes('coursesData')) {
    content = content.replace(/import\s+\{.*coursesData.*\}\s+from\s+['"].*data\/courses['"];?/, 'import { getCourses } from "$1/lib/admin-content";');
    // We need to fix the path depth. Instead of doing smart regex for path, just use the same depth as the old import.
    // Let's do it simpler.
  }
});
