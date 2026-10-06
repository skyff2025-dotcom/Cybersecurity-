const fs = require('fs');

let appContent = fs.readFileSync('src/App.tsx', 'utf-8');

appContent = appContent.replace(
  "import { AdminDashboard } from './pages/admin/AdminDashboard';",
  `import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminCourses } from './pages/admin/AdminCourses';
import { AdminLessons } from './pages/admin/AdminLessons';
import { AdminQuizzes } from './pages/admin/AdminQuizzes';
import { AdminThreats } from './pages/admin/AdminThreats';
import { AdminCertificates } from './pages/admin/AdminCertificates';
import { AdminLeaderboard } from './pages/admin/AdminLeaderboard';
import { AdminAnalytics } from './pages/admin/AdminAnalytics';
import { AdminSettings } from './pages/admin/AdminSettings';`
);

appContent = appContent.replace(
  /<Route path="admin" element=\{<AdminLayout \/>\}>.*?<\/Route>/s,
  `<Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="lessons" element={<AdminLessons />} />
        <Route path="quizzes" element={<AdminQuizzes />} />
        <Route path="threats" element={<AdminThreats />} />
        <Route path="certificates" element={<AdminCertificates />} />
        <Route path="leaderboard" element={<AdminLeaderboard />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>`
);

fs.writeFileSync('src/App.tsx', appContent);
