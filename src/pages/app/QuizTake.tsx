import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, Trophy, ArrowRight, Play, RefreshCw, ChevronLeft } from 'lucide-react';
import { QuizCategory, Question } from '../../data/quizzes';
import { getQuizzes } from '../../lib/admin-content';
import { getProgress, saveProgress, addActivity } from '../../lib/progress';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Progress } from '../../components/ui/Progress';
import { Badge } from '../../components/ui/Badge';

type QuizState = 'start' | 'playing' | 'results';

export function QuizTake() {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  
  const [quiz, setQuiz] = useState<QuizCategory | null>(null);
  const [gameState, setGameState] = useState<QuizState>('start');
  
  // Game progress state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Score state
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [earnedXp, setEarnedXp] = useState(0);
  const [finalXpAwarded, setFinalXpAwarded] = useState(0);

  useEffect(() => {
    const foundQuiz = getQuizzes().find(q => q.id === quizId);
    if (foundQuiz) {
      setQuiz(foundQuiz);
    } else {
      navigate('/quiz'); // invalid quiz ID
    }
  }, [quizId, navigate]);

  if (!quiz) return null;

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progressPercent = ((currentQuestionIndex) / quiz.questions.length) * 100;

  const handleStart = () => {
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setCorrectAnswers(0);
    setEarnedXp(0);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    
    if (selectedOption === currentQuestion.correctAnswer) {
      setCorrectAnswers(prev => prev + 1);
      setEarnedXp(prev => prev + currentQuestion.xp);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setGameState('results');
    
    const scorePercent = Math.round(((correctAnswers + (selectedOption === currentQuestion.correctAnswer ? 1 : 0)) / quiz.questions.length) * 100);
    const totalEarnedXp = earnedXp + (selectedOption === currentQuestion.correctAnswer ? currentQuestion.xp : 0);
    const passed = scorePercent >= 70;
    
    const progress = getProgress();
    const existingRecord = progress.quizRecords[quiz.id];
    
    let xpToAward = 0;
    
    if (!existingRecord) {
      xpToAward = totalEarnedXp;
    } else if (totalEarnedXp > existingRecord.xpEarned) {
      xpToAward = totalEarnedXp - existingRecord.xpEarned;
    }
    
    setFinalXpAwarded(xpToAward);
    
    const newRecord = {
      bestScore: existingRecord ? Math.max(existingRecord.bestScore, scorePercent) : scorePercent,
      attempts: existingRecord ? existingRecord.attempts + 1 : 1,
      xpEarned: existingRecord ? Math.max(existingRecord.xpEarned, totalEarnedXp) : totalEarnedXp
    };
    
    const historyEntry = {
      id: Date.now().toString(),
      quizId: quiz.id,
      quizName: quiz.title,
      score: scorePercent,
      xpEarned: xpToAward,
      passed,
      date: new Date().toISOString()
    };
    
    saveProgress({
      quizRecords: {
        ...progress.quizRecords,
        [quiz.id]: newRecord
      },
      quizHistory: [historyEntry, ...(progress.quizHistory || [])].slice(0, 50),
      totalPoints: progress.totalPoints + xpToAward,
    });
    
    addActivity('quiz', `Completed ${quiz.title} quiz (${scorePercent}%)`);
  };

  if (gameState === 'start') {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 py-12">
        <Button variant="ghost" onClick={() => navigate('/quiz')} className="mb-4">
          <ChevronLeft className="w-4 h-4 mr-2" /> Back to Quizzes
        </Button>
        <Card className="border-0 shadow-lg text-center overflow-hidden">
          <div className="bg-blue-600 h-2 w-full"></div>
          <CardContent className="pt-12 pb-12 px-6">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <quiz.icon className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">{quiz.title}</h1>
            <p className="text-slate-600 max-w-lg mx-auto mb-8 text-lg">{quiz.description}</p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              <div className="text-center">
                <div className="text-sm text-slate-500 font-medium mb-1">Questions</div>
                <div className="font-bold text-xl text-slate-900">{quiz.questions.length}</div>
              </div>
              <div className="w-px bg-slate-200"></div>
              <div className="text-center">
                <div className="text-sm text-slate-500 font-medium mb-1">Passing Score</div>
                <div className="font-bold text-xl text-slate-900">70%</div>
              </div>
              <div className="w-px bg-slate-200"></div>
              <div className="text-center">
                <div className="text-sm text-slate-500 font-medium mb-1">Available XP</div>
                <div className="font-bold text-xl text-blue-600">{quiz.questions.reduce((sum, q) => sum + q.xp, 0)} XP</div>
              </div>
            </div>
            
            <Button size="lg" onClick={handleStart} className="px-10 h-14 text-lg">
              <Play className="w-5 h-5 mr-2" /> Start Quiz
            </Button>
            <p className="text-sm text-slate-500 mt-4">You have one attempt per session. Take your time!</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameState === 'playing') {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300 py-6">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-semibold text-slate-500">Question {currentQuestionIndex + 1} of {quiz.questions.length}</div>
          <div className="text-sm font-semibold text-blue-600">{earnedXp} XP Earned</div>
        </div>
        <Progress value={progressPercent} className="h-2 mb-8" />
        
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <Badge className="w-fit mb-4">{quiz.title}</Badge>
            <h2 className="text-2xl font-bold text-slate-900 leading-snug">{currentQuestion.question}</h2>
          </CardHeader>
          <CardContent className="space-y-3 pb-8">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQuestion.correctAnswer;
              
              let optionClass = "w-full text-left justify-start h-auto p-4 border rounded-xl text-base transition-all ";
              
              if (!isSubmitted) {
                optionClass += isSelected 
                  ? "border-blue-600 bg-blue-50 text-blue-900 ring-1 ring-blue-600" 
                  : "border-slate-200 hover:border-blue-300 hover:bg-slate-50 text-slate-700 bg-white";
              } else {
                if (isCorrect) {
                  optionClass += "border-emerald-500 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500";
                } else if (isSelected && !isCorrect) {
                  optionClass += "border-red-500 bg-red-50 text-red-900";
                } else {
                  optionClass += "border-slate-200 bg-slate-50/50 text-slate-400 opacity-60";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isSubmitted}
                  onClick={() => setSelectedOption(idx)}
                  className={optionClass}
                >
                  <div className="flex items-start gap-3 w-full">
                    <div className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                      isSubmitted && isCorrect ? 'border-emerald-500 bg-emerald-500 text-white' :
                      isSubmitted && isSelected && !isCorrect ? 'border-red-500 bg-red-500 text-white' :
                      isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                    }`}>
                      {isSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4" />}
                      {isSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4" />}
                      {!isSubmitted && isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                    </div>
                    <span className="flex-1 font-medium">{option}</span>
                  </div>
                </button>
              );
            })}
            
            {isSubmitted && (
              <div className={`mt-6 p-4 rounded-xl border ${selectedOption === currentQuestion.correctAnswer ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'} animate-in fade-in slide-in-from-top-2`}>
                <div className="flex items-start gap-3">
                  {selectedOption === currentQuestion.correctAnswer ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className={`font-semibold mb-1 ${selectedOption === currentQuestion.correctAnswer ? 'text-emerald-900' : 'text-amber-900'}`}>
                      {selectedOption === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}
                    </h4>
                    <p className={`text-sm ${selectedOption === currentQuestion.correctAnswer ? 'text-emerald-800' : 'text-amber-800'}`}>
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="bg-slate-50 border-t border-slate-100 p-4 sm:px-6 flex justify-end">
            {!isSubmitted ? (
              <Button size="lg" onClick={handleSubmit} disabled={selectedOption === null} className="w-full sm:w-auto">
                Submit Answer
              </Button>
            ) : (
              <Button size="lg" onClick={handleNext} className="w-full sm:w-auto">
                {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'View Results'} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (gameState === 'results') {
    const finalScore = correctAnswers + (selectedOption === currentQuestion.correctAnswer ? 1 : 0);
    const scorePercent = Math.round((finalScore / quiz.questions.length) * 100);
    const passed = scorePercent >= 70;

    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-500 py-12">
        <Card className="border-0 shadow-xl overflow-hidden text-center">
          <div className={`h-3 w-full ${passed ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
          <CardContent className="pt-12 pb-8 px-6">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${passed ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
              {passed ? <Trophy className="w-12 h-12" /> : <RefreshCw className="w-12 h-12" />}
            </div>
            
            <Badge variant="outline" className="mb-4">{quiz.title}</Badge>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {passed ? '🎉 Quiz Passed!' : 'Keep Practicing!'}
            </h1>
            <p className="text-slate-500 mb-8">
              {passed ? 'Excellent work. You have demonstrated a strong understanding of this topic.' : 'Review the course material and try again to improve your score.'}
            </p>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8">
              <div className="text-5xl font-black text-slate-900 mb-2">{scorePercent}%</div>
              <div className="text-slate-500 font-medium mb-6">{finalScore} / {quiz.questions.length} Correct</div>
              
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-sm text-slate-500 mb-1">XP Earned</div>
                  <div className="text-2xl font-bold text-blue-600">+{finalXpAwarded}</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-sm text-slate-500 mb-1">Status</div>
                  <div className={`text-lg font-bold mt-1 ${passed ? 'text-emerald-600' : 'text-amber-600'}`}>{passed ? 'Passed' : 'Failed'}</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="outline" size="lg" onClick={handleStart} className="w-full sm:w-auto">
                <RefreshCw className="w-4 h-4 mr-2" /> Retake
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/quiz')} className="w-full sm:w-auto">
                Quiz Center
              </Button>
              <Button size="lg" onClick={() => navigate('/courses')} className="w-full sm:w-auto">
                Continue Learning
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
