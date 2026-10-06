const fs = require('fs');
const content = fs.readFileSync('src/components/layout/AdminLayout.tsx', 'utf-8');

const banner = `
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-sm text-amber-800 font-medium z-50">
        Demo Admin Mode — This dashboard is intended for academic demonstration only. It is not production-secure because authentication and server-side authorization are not enabled.
      </div>
`;

// Insert after <div className="flex flex-1 flex-col overflow-hidden">
const newContent = content.replace(
  '<div className="flex flex-1 flex-col overflow-hidden">',
  '<div className="flex flex-1 flex-col overflow-hidden">\n' + banner
);

fs.writeFileSync('src/components/layout/AdminLayout.tsx', newContent);
