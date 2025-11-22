
import React, { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom'; 
import { User, UserRole, LessonLevel, Message, QuizResult } from './types';
import { MOCK_STUDENT, MOCK_TEACHER, MOCK_ADMIN, LESSON_PATH, CLASS_ANALYTICS, BADGES } from './mockData';
import { StudentDashboard } from './pages/StudentDashboard';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { AdminConsole } from './pages/AdminConsole';
import { Login } from './pages/Login';
import { LandingPage } from './pages/LandingPage';
import { ChatInterface } from './components/ChatInterface';
import { QuizInterface } from './components/QuizInterface';
import { Button } from './components/Button';
import { generateLessonIntro, chatWithTutor, generateQuizForTopic } from './services/geminiService';
import { ArrowLeft, LogOut } from 'lucide-react';

export default function App() {
  // Global State
  const [user, setUser] = useState<User | null>(null);
  
  // Lesson State
  const [currentLesson, setCurrentLesson] = useState<LessonLevel | null>(null);
  const [lessonLanguage, setLessonLanguage] = useState<'en' | 'ta' | 'hi'>('en');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  // View Management
  const [view, setView] = useState<'landing' | 'login' | 'dashboard' | 'chat' | 'quiz' | 'result'>('landing');

  // Auth Handlers
  const handleLogin = (role: UserRole) => {
    if (role === UserRole.STUDENT) {
      setUser(MOCK_STUDENT);
      setView('dashboard');
    } else if (role === UserRole.TEACHER) {
      setUser(MOCK_TEACHER);
      setView('dashboard');
    } else {
      setUser(MOCK_ADMIN);
      setView('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
    setCurrentLesson(null);
  };

  // Lesson Logic
  const startLesson = async (lesson: LessonLevel, lang: 'en' | 'ta' | 'hi') => {
    setCurrentLesson(lesson);
    setLessonLanguage(lang);
    setView('chat');
    setMessages([]);
    setIsAiThinking(true);

    const intro = await generateLessonIntro(lesson.title, lesson.grade, lang);
    
    setMessages([{
      id: 'intro',
      role: 'model',
      text: intro,
      timestamp: Date.now()
    }]);
    setIsAiThinking(false);
  };

  const handleSendMessage = async (text: string) => {
    if (!currentLesson || !user) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setIsAiThinking(true);

    if (text.toLowerCase().includes('quiz')) {
       await startQuiz();
       return;
    }

    const aiResponse = await chatWithTutor(
        [...messages, userMsg], 
        text, 
        currentLesson.title, 
        currentLesson.grade, 
        lessonLanguage
    );
    
    const aiMsg: Message = { 
      id: (Date.now() + 1).toString(), 
      role: 'model', 
      text: aiResponse.text, 
      imageKeyword: aiResponse.visual_keyword,
      timestamp: Date.now() 
    };
    
    setMessages(prev => [...prev, aiMsg]);
    setIsAiThinking(false);
  };

  const startQuiz = async () => {
    if (!currentLesson) return;
    setIsAiThinking(true);
    const questions = await generateQuizForTopic(currentLesson.title, currentLesson.grade);
    setQuizQuestions(questions);
    setIsAiThinking(false);
    setView('quiz');
  };

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
    setView('result');
  };

  const handleReturnToDashboard = () => {
    setView('dashboard');
    setCurrentLesson(null);
  };

  // --- Routing / View Render Logic ---

  if (view === 'landing') {
    return <LandingPage onGetStarted={() => setView('login')} />;
  }

  if (view === 'login') {
    return <Login onLogin={handleLogin} onBack={() => setView('landing')} />;
  }

  // Admin View
  if (user?.role === UserRole.ADMIN) {
      return <AdminConsole user={user} onLogout={handleLogout} />;
  }

  // Teacher View
  if (user?.role === UserRole.TEACHER) {
      return <TeacherDashboard user={user} studentData={CLASS_ANALYTICS} onLogout={handleLogout} />;
  }

  // Student Views
  if (user?.role === UserRole.STUDENT) {
      if (view === 'dashboard') {
          return (
            <StudentDashboard 
                user={user} 
                lessons={LESSON_PATH} 
                badges={BADGES}
                onStartLesson={startLesson} 
                onHome={handleLogout}
            />
          );
      }

      if (view === 'chat' && currentLesson) {
        return (
            <div className="min-h-screen bg-[#F0F4F8] p-4 flex flex-col">
              <div className="flex items-center justify-between mb-4 max-w-2xl mx-auto w-full">
                <Button variant="outline" size="sm" onClick={() => setView('dashboard')}>
                  <ArrowLeft size={16} className="mr-2" /> Exit
                </Button>
                <div className="font-bold text-slate-700 hidden sm:block">{currentLesson.title}</div>
                <Button variant="primary" size="sm" onClick={startQuiz} disabled={isAiThinking}>
                   Start Quiz
                </Button>
              </div>
              <div className="flex-1 max-w-2xl w-full mx-auto h-[calc(100vh-100px)]">
                 <ChatInterface 
                   user={user} 
                   messages={messages} 
                   onSendMessage={handleSendMessage} 
                   isLoading={isAiThinking}
                   language={lessonLanguage}
                 />
              </div>
            </div>
          );
      }

      if (view === 'quiz') {
        return (
            <div className="min-h-screen bg-[#F0F4F8] p-6">
               <QuizInterface questions={quizQuestions} onComplete={handleQuizComplete} />
            </div>
        );
      }

      if (view === 'result' && quizResult) {
        return (
            <div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center border-4 border-slate-100">
                 <div className="w-24 h-24 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
                    <span className="text-4xl">🏆</span>
                 </div>
                 <h2 className="text-3xl font-display font-bold text-slate-800 mb-2">Lesson Complete!</h2>
                 <p className="text-slate-500 mb-6">You earned 50 XP!</p>
    
                 <div className="bg-slate-50 rounded-xl p-6 mb-8 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-slate-500 font-bold uppercase">Score</div>
                      <div className="text-3xl font-bold text-brand-blue">{quizResult.scorePercentage}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 font-bold uppercase">Correct</div>
                      <div className="text-3xl font-bold text-brand-green">{quizResult.correctAnswers}/{quizResult.totalQuestions}</div>
                    </div>
                 </div>
    
                 <Button onClick={handleReturnToDashboard} className="w-full shadow-[0_4px_0_0_#2563EB]">
                   Back to Path
                 </Button>
              </div>
            </div>
        );
      }
  }

  return <div>Unknown State</div>;
}
