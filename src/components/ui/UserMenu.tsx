import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from './Avatar';
import { LayoutDashboard, Target, Award, User as UserIcon, Settings } from 'lucide-react';

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const user = { name: "Cyber Learner", email: "Learning mode active" };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full hover:bg-slate-100 p-1 pr-3 transition-colors border border-transparent hover:border-slate-200"
      >
        <Avatar fallback={user.name.charAt(0).toUpperCase()} className="h-8 w-8" />
        <span className="text-sm font-medium text-slate-700">{user.name}</span>
        <svg 
          className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-xl border border-slate-100 overflow-hidden z-50 py-1">
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
            <p className="text-sm font-medium text-slate-900 truncate">{user.name}</p>
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
          </div>
          
          <div className="py-1">
            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>
            <Link to="/progress" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">
              <Target className="w-4 h-4" /> My Progress
            </Link>
            <Link to="/certificates" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">
              <Award className="w-4 h-4" /> Certificates
            </Link>
          </div>
          
          <div className="py-1 border-t border-slate-100">
            <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">
              <UserIcon className="w-4 h-4" /> Profile
            </Link>
            <Link to="/settings" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">
              <Settings className="w-4 h-4" /> Settings
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
