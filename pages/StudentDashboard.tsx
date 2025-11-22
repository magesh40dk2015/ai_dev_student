
import React, { useState } from 'react';
import { LessonLevel, Subject, User, Badge } from '../types';
import { Star, Lock, Play, Check, Map, Award, Globe, Home, LogOut, ArrowLeft } from 'lucide-react';
import { BadgeList } from '../components/BadgeList';

interface StudentDashboardProps {
  user: User;
  lessons: LessonLevel[];
  badges: Badge[];
  onStartLesson: (lesson: LessonLevel, lang: 'en' | 'ta' | 'hi') => void;
  onHome: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, lessons, badges, onStartLesson, onHome }) => {
  const [activeTab, setActiveTab] = useState<'path' | 'badges'>('path');
  const [language, setLanguage] = useState<'en' | 'ta' | 'hi'>('en');

  return (
    <div className="min-h-screen bg-[#F0F4F8] pb-24">
      {/* Header */}
      <div className="bg-white p-4 sticky top-0 z-20 shadow-sm border-b border-slate-100">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Back/Home Button for Mobile Header */}
            <button 
              onClick={onHome}
              className="p-2 -ml-2 text-slate-400 hover:text-brand-red hover:bg-red-50 rounded-xl transition-colors"
              title="Exit to Frontpage"
            >
              <ArrowLeft size={24} />
            </button>

            <img src={user.avatar} alt="Avatar" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-yellow p-1" />
            <div>
              <h2 className="font-display font-bold text-slate-800 text-base sm:text-lg">{user.name}</h2>
              <div className="flex items-center gap-2">
                 <span className="text-xs font-bold text-brand-purple bg-brand-purple/10 px-2 py-0.5 rounded-full">
                  {user.grade}
                 </span>
                 <div className="flex items-center gap-1 bg-brand-yellow/20 px-2 py-0.5 rounded-full">
                   <Star className="fill-brand-yellow text-brand-yellow" size={12} />
                   <span className="font-bold text-brand-yellow-600 text-xs">{user.xp} XP</span>
                 </div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setLanguage(l => l === 'en' ? 'ta' : l === 'ta' ? 'hi' : 'en')}
            className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-colors text-sm"
          >
            <Globe size={16} />
            {language === 'en' ? 'ENG' : language === 'ta' ? 'தமிழ்' : 'हिंदी'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto pt-6 px-4">
        
        {activeTab === 'path' && (
          <div className="flex flex-col items-center space-y-8 relative py-4">
            {/* Vertical Connecting Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-4 bg-slate-200 -translate-x-1/2 rounded-full -z-0"></div>

            {lessons.map((lesson, index) => {
              const isLeft = index % 2 === 0;
              let color = 'bg-brand-purple';
              let shadow = '#9333EA';
              
              if (lesson.subject === Subject.MATH) {
                color = 'bg-brand-blue';
                shadow = '#2563EB';
              } else if (lesson.subject === Subject.TAMIL) {
                color = 'bg-brand-red';
                shadow = '#DC2626';
              } else if (lesson.subject === Subject.HINDI) {
                color = 'bg-orange-500';
                shadow = '#D97706';
              }

              return (
                <div key={lesson.id} className={`relative z-10 w-full flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
                  <button
                    onClick={() => !lesson.isLocked && onStartLesson(lesson, language)}
                    disabled={lesson.isLocked}
                    className={`
                      group relative w-28 h-28 rounded-[2rem] flex flex-col items-center justify-center transition-all duration-300 transform
                      ${lesson.isLocked 
                        ? 'bg-slate-300 cursor-not-allowed grayscale' 
                        : `bg-white shadow-[0_8px_0_0_${shadow}] hover:scale-105 active:scale-95 active:shadow-none`}
                      ${lesson.isCompleted ? 'ring-4 ring-brand-green' : ''}
                    `}
                  >
                    {/* Inner Circle */}
                    <div className={`
                        w-16 h-16 rounded-full flex items-center justify-center mb-1 text-white shadow-inner
                        ${lesson.isLocked ? 'bg-slate-400' : color}
                    `}>
                        {lesson.isLocked ? <Lock size={24} /> : lesson.isCompleted ? <Check size={30} strokeWidth={3} /> : <Play fill="white" size={24} />}
                    </div>

                    {/* Stars */}
                    {!lesson.isLocked && (
                       <div className="flex gap-0.5 mt-1">
                          {[1,2,3].map((s) => (
                              <Star key={s} size={12} className={`${s <= lesson.stars ? 'fill-brand-yellow text-brand-yellow' : 'text-slate-300 fill-slate-300'}`} />
                          ))}
                       </div>
                    )}

                    {/* Label Bubble */}
                    <div className={`
                      absolute ${isLeft ? 'left-full ml-4' : 'right-full mr-4'} top-1/2 -translate-y-1/2 
                      bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 
                      whitespace-nowrap z-20 hidden group-hover:block animate-fade-in
                    `}>
                        <div className="text-xs font-bold text-slate-500 uppercase">{lesson.subject}</div>
                        <div className="text-sm font-bold text-slate-800">{lesson.title}</div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'badges' && (
          <div className="space-y-6">
            <h3 className="text-xl font-display font-bold text-slate-800">Your Achievements</h3>
            <BadgeList badges={badges} />
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-2 z-30 safe-area-bottom shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
         <div className="max-w-md mx-auto flex justify-around">
            <button 
              onClick={() => setActiveTab('path')}
              className={`p-2 rounded-xl flex flex-col items-center w-20 transition-all ${activeTab === 'path' ? 'text-brand-blue bg-blue-50 scale-105' : 'text-slate-400'}`}
            >
               <Map size={24} />
               <span className="text-[10px] font-bold mt-1">Path</span>
            </button>
            
            <button 
              onClick={onHome}
              className="p-2 rounded-xl flex flex-col items-center w-20 text-slate-400 hover:text-brand-red hover:bg-red-50 transition-all"
            >
               <Home size={24} />
               <span className="text-[10px] font-bold mt-1">Frontpage</span>
            </button>

            <button 
              onClick={() => setActiveTab('badges')}
              className={`p-2 rounded-xl flex flex-col items-center w-20 transition-all ${activeTab === 'badges' ? 'text-brand-yellow-600 bg-yellow-50 scale-105' : 'text-slate-400'}`}
            >
               <Award size={24} />
               <span className="text-[10px] font-bold mt-1">Badges</span>
            </button>
         </div>
      </div>
    </div>
  );
};
