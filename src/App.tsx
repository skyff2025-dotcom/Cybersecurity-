import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { PublicLayout } from './components/layout/PublicLayout';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/public/LandingPage';
import { Dashboard } from './pages/app/Dashboard';
import { Learn } from './pages/app/Learn';
import { CourseDetail } from './pages/app/CourseDetail';
import { LessonPage } from './pages/app/LessonPage';
import { Articles } from './pages/app/Articles';
import { Threats } from './pages/app/Threats';
import { ThreatDetail } from './pages/app/ThreatDetail';
import { Videos } from './pages/app/Videos';
import { Quizzes } from './pages/app/Quizzes';
import { QuizTake } from './pages/app/QuizTake';
import { Leaderboard } from './pages/app/Leaderboard';
import { Certificates } from './pages/app/Certificates';
import { CertificateDetail } from './pages/app/CertificateDetail';
import { CertificateVerify } from './pages/app/CertificateVerify';
import { ProgressPage } from './pages/app/Progress';
import { Alerts } from './pages/app/Alerts';
import { AlertDetail } from './pages/app/AlertDetail';
import { AdminLayout } from './components/layout/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminCourses } from './pages/admin/AdminCourses';
import { AdminLessons } from './pages/admin/AdminLessons';
import { AdminQuizzes } from './pages/admin/AdminQuizzes';
import { AdminThreats } from './pages/admin/AdminThreats';
import { AdminCertificates } from './pages/admin/AdminCertificates';
import { AdminLeaderboard } from './pages/admin/AdminLeaderboard';
import { AdminAnalytics } from './pages/admin/AdminAnalytics';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminAlerts } from './pages/admin/AdminAlerts';
import { Profile } from './pages/app/Profile';
import { Settings } from './pages/app/Settings';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Learn />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
        <Route path="/courses/:courseId/lesson/:lessonId" element={<LessonPage />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/quiz" element={<Quizzes />} />
        <Route path="/quiz/:quizId" element={<QuizTake />} />
        <Route path="/threats" element={<Threats />} />
        <Route path="/threats/:threatId" element={<ThreatDetail />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/alerts/:alertId" element={<AlertDetail />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/certificate" element={<Certificates />} />
        <Route path="/certificate/verify" element={<CertificateVerify />} />
        <Route path="/certificate/:certificateId" element={<CertificateDetail />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="lessons" element={<AdminLessons />} />
        <Route path="quizzes" element={<AdminQuizzes />} />
        <Route path="threats" element={<AdminThreats />} />
        <Route path="alerts" element={<AdminAlerts />} />
        <Route path="certificates" element={<AdminCertificates />} />
        <Route path="leaderboard" element={<AdminLeaderboard />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}
