import { Bell, Shield, Lock, Eye, MonitorSmartphone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export function Settings() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
          <p className="text-slate-500 mt-1">Manage your app preferences and notifications.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium transition-colors">
            <Bell className="w-4 h-4 shrink-0" /> Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg text-sm font-medium transition-colors">
            <Shield className="w-4 h-4 shrink-0" /> Privacy
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg text-sm font-medium transition-colors">
            <MonitorSmartphone className="w-4 h-4 shrink-0" /> Appearance
          </button>
        </div>

        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Choose what updates you want to receive.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium text-slate-900">New Courses</label>
                  <p className="text-xs text-slate-500">Get notified when new learning content is added.</p>
                </div>
                <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-blue-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                  <span className="pointer-events-none block h-5 w-5 translate-x-5 rounded-full bg-white shadow-lg ring-0 transition-transform" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium text-slate-900">Threat Alerts</label>
                  <p className="text-xs text-slate-500">Receive alerts about critical new cybersecurity threats.</p>
                </div>
                <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-blue-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                  <span className="pointer-events-none block h-5 w-5 translate-x-5 rounded-full bg-white shadow-lg ring-0 transition-transform" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium text-slate-900">Weekly Progress</label>
                  <p className="text-xs text-slate-500">A weekly summary of your learning progress and XP.</p>
                </div>
                <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                  <span className="pointer-events-none block h-5 w-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition-transform" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>Irreversible actions related to your account.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100">
                <div>
                  <h4 className="text-sm font-medium text-red-900">Delete Account</h4>
                  <p className="text-xs text-red-700 mt-1">Permanently delete your account and all learning data.</p>
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
