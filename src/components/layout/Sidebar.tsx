import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Video, 
  HelpCircle, 
  AlertTriangle, 
  Trophy, 
  Award, 
  LineChart,
  User,
  Settings,
  LogOut,
  Menu,
  X
, Bell } from 'lucide-react';
import { cn } from '../../lib/utils';
import { mockUser } from '../../data/mockData';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Courses', path: '/courses', icon: BookOpen },
  { name: 'Quiz', path: '/quiz', icon: HelpCircle },
  { name: 'Threat Center', path: '/threats', icon: AlertTriangle },
  { name: 'Security Alerts', path: '/alerts', icon: Bell },
  { name: 'Progress', path: '/progress', icon: LineChart },
  { name: 'Certificate', path: '/certificate', icon: Award },
  { name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
];

const secondaryItems: { name: string; path: string; icon: any }[] = [];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-slate-100">
          <NavLink to="/dashboard" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-slate-900">CyberAware</span>
          </NavLink>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-500 hover:text-slate-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-blue-50 text-blue-700" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {secondaryItems.length > 0 && (
          <div className="p-4 border-t border-slate-100">
            <nav className="space-y-1">
              {secondaryItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-blue-50 text-blue-700" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>
    </>
  );
}
