import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ChevronLeft, ChevronRight, PlayCircle, ShieldAlert, Target, Lightbulb, Zap } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Progress } from '../../components/ui/Progress';
import { getCourses } from '../../lib/admin-content';
import { getProgress, saveProgress, addActivity, CyberAwareProgress } from '../../lib/progress';
import { generateCertificate } from '../../lib/certificates';

export function LessonPage() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState<CyberAwareProgress | null>(null);

  const course = getCourses().find((c) => c.id === courseId);
  const lessonIndex = course?.lessons.findIndex((l) => l.id === lessonId) ?? -1;
  const lesson = course?.lessons[lessonIndex];

  useEffect(() => {
    setProgress(getProgress());
    window.scrollTo(0, 0);
  }, [lessonId]);

  if (!course || !lesson) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Lesson not found</h2>
        <p className="text-slate-500 mb-6">The lesson you are looking for does not exist.</p>
        <Button onClick={() => navigate('/courses')}>Browse Courses</Button>
      </div>
    );
  }

  const completedLessonsInCourse = progress?.completedLessonIds.filter((id) => id.startsWith(`${course.id}-`)) || [];
  const courseProgressPercent = Math.round((completedLessonsInCourse.length / course.lessons.length) * 100);
  const isCompleted = progress?.completedLessonIds.includes(`${course.id}-${lesson.id}`);

  const handleComplete = () => {
    if (!progress || isCompleted) return;

    const newCompletedLessonIds = [...progress.completedLessonIds, `${course.id}-${lesson.id}`];
    const newCompletedLessonsCount = progress.completedLessons + 1;
    const newTotalPoints = progress.totalPoints + 20; // 20 XP per lesson

    let newCompletedCoursesCount = progress.completedCourses;
    const newCompletedInCourse = newCompletedLessonIds.filter((id) => id.startsWith(`${course.id}-`)).length;
    
    let activityTitle = `Completed lesson: ${lesson.title}`;
    let isCourseCompleted = false;

    if (newCompletedInCourse === course.lessons.length && !progress.completedCourseIds.includes(course.id)) {
      newCompletedCoursesCount += 1;
      activityTitle = `Completed course: ${course.title}`;
      isCourseCompleted = true;
    }

    const newCompletedCourseIds = isCourseCompleted 
      ? [...progress.completedCourseIds, course.id]
      : progress.completedCourseIds;

    const newProgress: Partial<CyberAwareProgress> = {
      completedLessonIds: newCompletedLessonIds,
      completedLessons: newCompletedLessonsCount,
      totalPoints: newTotalPoints,
      completedCourses: newCompletedCoursesCount,
      completedCourseIds: newCompletedCourseIds,
    };

    saveProgress(newProgress);
    addActivity(isCourseCompleted ? 'course' : 'lesson', activityTitle);
    
    setProgress(getProgress());

    if (isCourseCompleted && courseId) {
      // Generate certificate for the newly completed course
      generateCertificate(courseId);
    }
  };

  const handleNext = () => {
    if (lessonIndex < course.lessons.length - 1) {
      navigate(`/courses/${course.id}/lesson/${course.lessons[lessonIndex + 1].id}`);
    } else {
      navigate(`/courses/${course.id}`);
    }
  };

  const handlePrev = () => {
    if (lessonIndex > 0) {
      navigate(`/courses/${course.id}/lesson/${course.lessons[lessonIndex - 1].id}`);
    } else {
      navigate(`/courses/${course.id}`);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <Link 
          to={`/courses/${course.id}`}
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Course
        </Link>
        <div className="text-sm font-medium text-slate-500 hidden sm:block">
          Lesson {lessonIndex + 1} of {course.lessons.length}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
            <div className="p-8 md:p-10 border-b border-slate-100">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{lesson.title}</h1>
              <p className="text-xl text-slate-600 leading-relaxed">{lesson.content.intro}</p>
            </div>
            
            <div className="p-8 md:p-10 space-y-12">
              
              {/* Learning Objectives */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900 mb-4">
                  <Target className="w-5 h-5 text-blue-600" /> Learning Objectives
                </h3>
                <ul className="space-y-3">
                  {lesson.content.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Main Explanation */}
              <div className="prose prose-slate max-w-none prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-lg">
                <p className="whitespace-pre-line">{lesson.content.main}</p>
              </div>

              {/* Important Concepts */}
              <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-amber-900 mb-3">
                  <ShieldAlert className="w-5 h-5 text-amber-600" /> Important Concept
                </h3>
                <p className="text-amber-800 leading-relaxed">{lesson.content.important}</p>
              </div>

              {/* Real World Example */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Real-World Example</h3>
                <p className="text-slate-700 leading-relaxed text-lg bg-slate-50 p-6 rounded-xl border border-slate-100 border-l-4 border-l-blue-500 italic">
                  "{lesson.content.example}"
                </p>
              </div>

              {/* Security Tip */}
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-emerald-900 mb-3">
                  <Lightbulb className="w-5 h-5 text-emerald-600" /> Security Tip
                </h3>
                <p className="text-emerald-800 leading-relaxed font-medium">{lesson.content.tip}</p>
              </div>

              {/* Key Takeaways */}
              <div>
                <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">
                  <Zap className="w-5 h-5 text-purple-600" /> Key Takeaways
                </h3>
                <ul className="space-y-4">
                  {lesson.content.takeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-slate-800 font-medium">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* Completion & Navigation Area */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <Button 
              variant="outline" 
              onClick={handlePrev}
              className="w-full sm:w-auto"
            >
              <ChevronLeft className="w-4 h-4 mr-2" /> Previous
            </Button>

            <div className="flex-1 w-full flex justify-center">
              {!isCompleted ? (
                <Button 
                  size="lg" 
                  onClick={handleComplete}
                  className="w-full sm:w-64 bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
                >
                  Mark as Complete
                </Button>
              ) : (
                <div className="flex items-center gap-2 text-green-600 font-semibold px-6 py-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle2 className="w-5 h-5" />
                  Lesson Completed (+20 XP)
                </div>
              )}
            </div>

            <Button 
              onClick={handleNext}
              className="w-full sm:w-auto"
            >
              {lessonIndex === course.lessons.length - 1 ? 'Finish Course' : 'Next Lesson'} <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          {isCompleted && courseProgressPercent === 100 && lessonIndex === course.lessons.length - 1 && (
            <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white shadow-xl animate-in zoom-in-95 duration-500">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold mb-2">🎉 Course Completed!</h2>
              <p className="text-blue-100 text-lg mb-6">Congratulations! You completed {course.title}.</p>
              <div className="inline-block bg-white/20 rounded-lg px-6 py-3 font-semibold text-xl mb-8">
                {course.xp} XP Earned
              </div>
              <div>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  onClick={() => navigate('/courses')}
                  className="font-semibold"
                >
                  Continue Learning
                </Button>
              </div>
            </div>
          )}

        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 shrink-0 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm sticky top-6">
            <h3 className="font-semibold text-slate-900 mb-4">{course.title}</h3>
            
            <div className="mb-6">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span className="text-slate-500">Progress</span>
                <span className="text-slate-900">{courseProgressPercent}%</span>
              </div>
              <Progress value={courseProgressPercent} className="h-2" />
            </div>

            <div className="space-y-1">
              {course.lessons.map((l, i) => {
                const isItemCompleted = progress?.completedLessonIds.includes(`${course.id}-${l.id}`);
                const isCurrent = l.id === lessonId;
                
                return (
                  <button
                    key={l.id}
                    onClick={() => navigate(`/courses/${course.id}/lesson/${l.id}`)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-colors ${
                      isCurrent 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    {isItemCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    ) : (
                      <div className={`w-4 h-4 rounded-full border shrink-0 ${isCurrent ? 'border-blue-500 bg-blue-100' : 'border-slate-300'}`} />
                    )}
                    <span className="truncate">{i + 1}. {l.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
