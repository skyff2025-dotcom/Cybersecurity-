import { useState, useEffect } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Progress } from '../../components/ui/Progress';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { getCourses } from '../../lib/admin-content';
import { getProgress, CyberAwareProgress } from '../../lib/progress';

export function Learn() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Recommended');
  const [progress, setProgress] = useState<CyberAwareProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const filteredCourses = getCourses().filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'All' || course.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  }).sort((a, b) => {
    if (sortBy === 'Difficulty') {
      const diffMap = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
      return diffMap[a.difficulty] - diffMap[b.difficulty];
    }
    // Simple recommended sorting
    return 0;
  });

  const getCourseProgress = (courseId: string, totalLessons: number) => {
    if (!progress) return 0;
    const completedInCourse = progress.completedLessonIds.filter(id => id.startsWith(`${courseId}-`)).length;
    return Math.round((completedInCourse / totalLessons) * 100);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Cybersecurity Courses</h1>
          <p className="text-slate-500 mt-1">Build practical cybersecurity knowledge through short, focused learning modules.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search courses..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 shrink-0">
          <select 
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <select 
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 hidden sm:block"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="Recommended">Recommended</option>
            <option value="Difficulty">Difficulty</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const Icon = course.icon;
          const courseProgress = getCourseProgress(course.id, course.lessons.length);
          
          return (
            <Card key={course.id} className="flex flex-col hover:border-blue-200 hover:shadow-md transition-all group">
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-slate-50 text-slate-700 rounded-xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge 
                    variant={course.difficulty === 'Beginner' ? 'success' : course.difficulty === 'Intermediate' ? 'warning' : 'destructive'}
                  >
                    {course.difficulty}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{course.title}</h3>
                <p className="text-sm text-slate-500 mb-6 flex-1 line-clamp-3">{course.description}</p>
                
                <div className="space-y-4 mt-auto">
                  <div>
                    <div className="flex justify-between text-xs font-medium mb-1.5">
                      <span className="text-slate-500">{course.lessons.length} Lessons • {course.xp} XP</span>
                      <span className="text-slate-900">{courseProgress}%</span>
                    </div>
                    <Progress value={courseProgress} className="h-1.5" />
                  </div>
                  <Button 
                    className="w-full" 
                    variant={courseProgress === 100 ? "outline" : "default"}
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    {courseProgress === 100 ? 'Completed' : courseProgress > 0 ? 'Continue Course' : 'Start Course'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900">No courses found</h3>
          <p className="text-slate-500">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
