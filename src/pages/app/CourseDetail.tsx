import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, PlayCircle, BookOpen, Clock, Shield, Award } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Progress } from '../../components/ui/Progress';
import { getCourses } from '../../lib/admin-content';
import { getProgress, CyberAwareProgress } from '../../lib/progress';

export function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState<CyberAwareProgress | null>(null);

  const course = getCourses().find((c) => c.id === courseId);

  useEffect(() => {
    setProgress(getProgress());
    window.scrollTo(0, 0);
  }, []);

  if (!course) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Course not found</h2>
        <p className="text-slate-500 mb-6">The course you are looking for does not exist.</p>
        <Button onClick={() => navigate('/courses')}>Browse Courses</Button>
      </div>
    );
  }

  const completedLessonsInCourse = progress?.completedLessonIds.filter((id) => id.startsWith(`${course.id}-`)) || [];
  const progressPercent = Math.round((completedLessonsInCourse.length / course.lessons.length) * 100);
  
  // Find first incomplete lesson to continue
  const firstIncompleteLesson = course.lessons.find(
    (lesson) => !completedLessonsInCourse.includes(`${course.id}-${lesson.id}`)
  );
  
  const handleStartContinue = () => {
    if (firstIncompleteLesson) {
      navigate(`/courses/${course.id}/lesson/${firstIncompleteLesson.id}`);
    } else {
      // If completed, just go to the first lesson to review
      navigate(`/courses/${course.id}/lesson/${course.lessons[0].id}`);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <Link 
        to="/courses" 
        className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Courses
      </Link>

      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 text-slate-50 opacity-50 pointer-events-none hidden md:block">
          <course.icon className="w-96 h-96" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant={course.difficulty === 'Beginner' ? 'success' : course.difficulty === 'Intermediate' ? 'warning' : 'destructive'}>
                {course.difficulty}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{course.title}</h1>
            <p className="text-lg text-slate-600 mb-8 max-w-3xl">{course.description}</p>
            
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-slate-700">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <span className="font-medium">{course.lessons.length} Lessons</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Award className="w-5 h-5 text-yellow-500" />
                <span className="font-medium">{course.xp} XP</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Clock className="w-5 h-5 text-slate-400" />
                <span className="font-medium">~{course.lessons.length * 10} mins</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 max-w-md">
              <Button size="lg" onClick={handleStartContinue} className="w-full sm:w-auto">
                {progressPercent === 100 ? 'Review Course' : progressPercent > 0 ? 'Continue Course' : 'Start Course'}
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-72 bg-slate-50 rounded-xl p-6 border border-slate-100 flex-shrink-0">
            <h3 className="font-semibold text-slate-900 mb-4">Your Progress</h3>
            <div className="text-3xl font-bold text-blue-600 mb-2">{progressPercent}%</div>
            <Progress value={progressPercent} className="h-2 mb-4" />
            <p className="text-sm text-slate-500">
              {completedLessonsInCourse.length} of {course.lessons.length} lessons completed
            </p>
          </div>
        </div>
      </div>

      {progressPercent === 100 && (
        <Card className="border-green-200 bg-green-50 shadow-sm animate-in fade-in slide-in-from-bottom-2">
          <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-green-900">🎓 Course Completed</h3>
                <p className="text-sm text-green-700">Your certificate is ready!</p>
              </div>
            </div>
            <Button onClick={() => navigate('/certificate')} className="bg-green-600 hover:bg-green-700 text-white w-full md:w-auto">
              Get Certificate
            </Button>
          </CardContent>
        </Card>
      )}

      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Course Content</h2>
        <div className="space-y-4">
          {course.lessons.map((lesson, index) => {
            const isCompleted = progress?.completedLessonIds.includes(`${course.id}-${lesson.id}`);
            const isNext = firstIncompleteLesson?.id === lesson.id;
            
            return (
              <Card 
                key={lesson.id} 
                className={`transition-all hover:border-blue-200 cursor-pointer ${
                  isNext ? 'border-blue-300 shadow-sm ring-1 ring-blue-100' : ''
                }`}
                onClick={() => navigate(`/courses/${course.id}/lesson/${lesson.id}`)}
              >
                <CardContent className="p-5 sm:p-6 flex items-center gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                    isCompleted 
                      ? 'bg-green-100 text-green-600' 
                      : isNext
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-base sm:text-lg mb-1 truncate ${
                      isCompleted ? 'text-slate-900' : 'text-slate-700'
                    }`}>
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-1">
                      {lesson.content.intro}
                    </p>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={isCompleted ? "text-green-600 hover:text-green-700" : "text-blue-600"}
                    >
                      {isCompleted ? 'Review' : isNext ? 'Start' : 'View'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
