import { PlayCircle, Clock, Search, Filter, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { mockVideos } from '../../data/mockData';

export function Videos() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Video Library</h1>
          <p className="text-slate-500 mt-1">Watch expert breakdowns of cybersecurity topics.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input placeholder="Search videos..." className="pl-9" />
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" /> Category
          </Button>
          <Button variant="outline" className="gap-2">
            Status
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockVideos.map((video) => (
          <Card key={video.id} className="overflow-hidden flex flex-col hover:shadow-md transition-all group cursor-pointer">
            <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
              <img 
                src={video.thumbnailUrl} 
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity scale-90 group-hover:scale-100 duration-300">
                  <PlayCircle className="w-8 h-8 fill-white/80" />
                </div>
              </div>
              <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded">
                {video.duration}:00
              </div>
              {video.isCompleted && (
                <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-medium px-2 py-1 rounded flex items-center gap-1 shadow-sm">
                  <CheckCircle2 className="w-3 h-3" /> Completed
                </div>
              )}
            </div>
            <CardHeader className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary" className="text-xs">{video.categoryName}</Badge>
                <Badge variant={video.difficulty === 'Beginner' ? 'success' : video.difficulty === 'Intermediate' ? 'warning' : 'destructive'} className="text-xs">
                  {video.difficulty}
                </Badge>
              </div>
              <CardTitle className="line-clamp-2 text-lg group-hover:text-blue-600 transition-colors">
                {video.title}
              </CardTitle>
              <CardDescription className="line-clamp-2 mt-2">
                {video.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
