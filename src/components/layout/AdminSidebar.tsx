import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  LayoutDashboard, 
  Users, 
  FileText, 
  Video, 
  HelpCircle, 
  Database,
  AlertTriangle, 
  Award, 
  BarChart,
  Settings,
  LogOut,
  X
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { mockUser } from '../../data/mockData';

const adminNavItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Courses', path: '/admin/courses', icon: FileText },
  { name: 'Lessons', path: '/admin/lessons', icon: Video },
  { name: 'Quiz Questions', path: '/admin/quizzes', icon: HelpCircle },
  { name: 'Threat Center', path: '/admin/threats', icon: AlertTriangle },
  { name: 'Certificates', path: '/admin/certificates', icon: Award },
  { name: 'Leaderboard', path: '/admin/leaderboard', icon: Users },
  { name: 'Analytics', path: '/admin/analytics', icon: BarChart },
];

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
  const navigate = useNavigate();

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-slate-900 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-slate-800">
          <NavLink to="/admin" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <div className="bg-blue-600 text-white p-1 rounded-md">
              <Shield className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">CyberAware <span className="text-blue-500 font-medium">Admin</span></span>
          </NavLink>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-6 mb-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Management</p>
            <nav className="space-y-1">
              {adminNavItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === '/admin'}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-blue-600 text-white" 
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="mb-4 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-lg p-3 text-xs text-center font-medium">
            Demo Admin Mode<br/><span className="text-amber-500/70 font-normal">Not Production Secure</span>
          </div>
          <nav className="space-y-1">
            <NavLink
              to="/admin/settings"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive 
                  ? "bg-blue-600 text-white" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <Settings className="h-4 w-4 shrink-0" />
              Settings
            </NavLink>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Exit Admin
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}
