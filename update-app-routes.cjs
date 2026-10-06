const fs = require('fs');

let appContent = fs.readFileSync('src/App.tsx', 'utf-8');

appContent = appContent.replace(
  /<Route path="\/admin" element=\{<AdminLayout \/>\}>.*?<\/Route>/s,
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
