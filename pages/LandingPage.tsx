
import React from 'react';
import { Button } from '../components/Button';
import { BookOpen, Sparkles, Users, Shield, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-brand-blue text-white p-2 rounded-xl">
            <Sparkles size={24} />
          </div>
          <span className="text-2xl font-display font-bold text-slate-800">Smart Tutor</span>
        </div>
        <div className="hidden md:flex gap-6 text-sm font-bold text-slate-500">
          <a href="#" className="hover:text-brand-blue">Features</a>
          <a href="#" className="hover:text-brand-blue">Schools</a>
          <a href="#" className="hover:text-brand-blue">About</a>
        </div>
        <Button onClick={onGetStarted} size="sm">Login</Button>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-brand-blue px-4 py-2 rounded-full text-sm font-bold">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-blue"></span>
            </span>
            AI-Powered Learning for Grades K-5
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-display font-bold text-slate-900 leading-tight">
            Learning made <span className="text-brand-blue">fun</span> and <span className="text-brand-purple">personalized</span>.
          </h1>
          
          <p className="text-xl text-slate-500 leading-relaxed max-w-lg">
            The intelligent tutor that adapts to your child's pace. Covers Math, English, and Tamil with interactive voice-based lessons.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={onGetStarted} className="shadow-[0_8px_0_0_#2563EB]">
              Get Started Now <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button size="lg" variant="outline" onClick={onGetStarted}>
              I'm a Teacher
            </Button>
          </div>

          <div className="flex items-center gap-4 text-sm font-bold text-slate-400 pt-4">
            <div className="flex -space-x-2">
               {[1,2,3,4].map(i => (
                 <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white"></div>
               ))}
            </div>
            Trusted by 50+ Schools
          </div>
        </div>

        {/* Hero Image / Illustration */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-brand-blue to-brand-purple opacity-20 blur-3xl rounded-full"></div>
          <div className="relative bg-[#F0F4F8] rounded-[3rem] p-8 border-4 border-white shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
             <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center text-2xl">🦁</div>
                   <div>
                      <div className="font-bold text-slate-800">AI Tutor</div>
                      <div className="text-xs text-slate-500">Teaching Math Basics</div>
                   </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl text-slate-700 font-medium border border-slate-100">
                   "Great job Arjun! 🌟 Now, if you have 5 apples and eat 2, how many are left?"
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="bg-brand-green text-white p-6 rounded-3xl text-center shadow-[0_4px_0_0_#15803d]">
                   <div className="text-3xl font-bold mb-1">A+</div>
                   <div className="text-xs font-bold opacity-80">Performance</div>
                </div>
                <div className="bg-brand-red text-white p-6 rounded-3xl text-center shadow-[0_4px_0_0_#b91c1c]">
                   <div className="text-3xl font-bold mb-1">15m</div>
                   <div className="text-xs font-bold opacity-80">Daily Goal</div>
                </div>
             </div>
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold text-slate-800 mb-4">Why Choose Smart Tutor?</h2>
              <p className="text-slate-500">Built for engagement, designed for results.</p>
           </div>

           <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: <BookOpen size={32} />, title: "Adaptive Curriculum", desc: "Lessons that get harder or easier based on how the student performs." },
                { icon: <Users size={32} />, title: "Teacher Analytics", desc: "Real-time heatmaps and insights for teachers to identify weak areas." },
                { icon: <Shield size={32} />, title: "Safe & Secure", desc: "Child-friendly interface with strict data privacy controls." }
              ].map((feat, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                   <div className="w-14 h-14 bg-blue-50 text-brand-blue rounded-2xl flex items-center justify-center mb-6">
                     {feat.icon}
                   </div>
                   <h3 className="text-xl font-bold text-slate-800 mb-3">{feat.title}</h3>
                   <p className="text-slate-500 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white py-12 border-t border-slate-100 text-center">
        <p className="text-slate-400 font-bold text-sm">© 2024 Foundational AI Tutor. Built for Education.</p>
      </footer>
    </div>
  );
};
