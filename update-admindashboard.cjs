const fs = require('fs');
let content = fs.readFileSync('src/pages/admin/AdminDashboard.tsx', 'utf-8');

// Imports
content = content.replace(
  "import { getCourses, getQuizzes, getThreats } from '../../lib/admin-content';",
  "import { getCourses, getQuizzes, getThreats, getAlerts } from '../../lib/admin-content';"
);

if (!content.includes('Bell')) {
  content = content.replace(
    "Award, Users, BarChart }",
    "Award, Users, BarChart, Bell }"
  );
}

// State
content = content.replace(
  "xpEarned: 0\n  });",
  "xpEarned: 0,\n    alerts: 0\n  });"
);

// useEffect
content = content.replace(
  "const threats = getThreats();",
  "const threats = getThreats();\n    const alerts = getAlerts();"
);

content = content.replace(
  "threats: threats.length,\n      certificates: 0,",
  "threats: threats.length,\n      alerts: alerts.length,\n      certificates: 0,"
);

// Stat cards array (wherever it's mapping, it might just be directly returning jsx)
const jsxCard = `        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Total Alerts</p>
                <h3 className="text-3xl font-bold text-slate-900">{stats.alerts}</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Bell className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>`;

content = content.replace(
  "          </CardContent>\n        </Card>\n      </div>",
  "          </CardContent>\n        </Card>\n" + jsxCard + "\n      </div>"
);

fs.writeFileSync('src/pages/admin/AdminDashboard.tsx', content);
