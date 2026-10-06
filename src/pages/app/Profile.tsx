import { Mail, Shield, User as UserIcon, Calendar, Camera } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Avatar } from '../../components/ui/Avatar';
import { mockUser } from '../../data/mockData';

export function Profile() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Profile</h1>
          <p className="text-slate-500 mt-1">Manage your account information and preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="relative inline-block mb-4">
                <Avatar fallback={mockUser.name.charAt(0)} className="w-24 h-24 text-3xl" />
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full border-2 border-white text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-slate-900">{mockUser.name}</h2>
              <p className="text-sm text-slate-500 mb-4">{mockUser.role === 'student' ? 'Student' : 'Administrator'}</p>
              
              <div className="flex items-center justify-center gap-2 text-sm text-slate-600 bg-slate-50 py-2 px-3 rounded-lg border border-slate-100">
                <Shield className="w-4 h-4 text-blue-600" />
                Level {mockUser.level} ({mockUser.xp} XP)
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-slate-900">Email</p>
                  <p className="text-slate-500 truncate">{mockUser.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-slate-900">Joined</p>
                  <p className="text-slate-500">{new Date(mockUser.joinedDate).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">First Name</label>
                  <Input defaultValue={mockUser.name.split(' ')[0]} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Last Name</label>
                  <Input defaultValue={mockUser.name.split(' ')[1] || ''} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Email Address</label>
                <Input defaultValue={mockUser.email} type="email" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t border-slate-100 pt-6">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your password and security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Current Password</label>
                <Input type="password" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">New Password</label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">Confirm Password</label>
                  <Input type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t border-slate-100 pt-6">
              <Button>Update Password</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
