import { Outlet, Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { Button } from '../ui/Button';
import { UserMenu } from '../ui/UserMenu';

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-slate-900 tracking-tight">CyberAware</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/courses" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Courses</Link>
            <Link to="/articles" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Resources</Link>
            <Link to="/threats" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Threat Center</Link>
          </nav>

          <div className="flex items-center gap-4">
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-slate-100 bg-slate-50 py-12 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
                <span className="text-lg font-bold text-slate-900">CyberAware</span>
              </div>
              <p className="text-sm text-slate-500 max-w-sm">
                Learn. Protect. Stay Secure. A premium cybersecurity awareness platform designed to build safer online habits.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Learn</h3>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link to="/courses" className="hover:text-blue-600">All Courses</Link></li>
                <li><Link to="/articles" className="hover:text-blue-600">Articles</Link></li>
                <li><Link to="/videos" className="hover:text-blue-600">Video Library</Link></li>
                <li><Link to="/quiz" className="hover:text-blue-600">Quizzes</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link to="/threats" className="hover:text-blue-600">Threat Center</Link></li>
                <li><Link to="/leaderboard" className="hover:text-blue-600">Leaderboard</Link></li>
                <li><Link to="/certificates" className="hover:text-blue-600">Certificates</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} CyberAware. TYIT Semester 5 Project.
          </div>
        </div>
      </footer>
    </div>
  );
}
