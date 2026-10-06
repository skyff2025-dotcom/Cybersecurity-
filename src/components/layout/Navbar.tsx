import { Bell, Menu, Search } from 'lucide-react';
import { UserMenu } from '../ui/UserMenu';

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
      <button
        onClick={onMenuClick}
        className="text-slate-500 hover:text-slate-700 lg:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      <div className="flex flex-1 items-center gap-4 lg:gap-8">
        <form className="relative hidden w-full max-w-md lg:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="search"
            placeholder="Search lessons, articles, threats..."
            className="h-9 w-full rounded-md border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm outline-none transition-colors focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500"
          />
        </form>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative text-slate-500 hover:text-slate-700">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
            2
          </span>
        </button>
        <UserMenu />
      </div>
    </header>
  );
}
