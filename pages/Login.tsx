
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { UserRole } from '../types';
import { QrCode, Smartphone, User, Lock, Shield, ArrowLeft } from 'lucide-react';

interface LoginProps {
  onLogin: (role: UserRole) => void;
  onBack: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onBack }) => {
  const [activeTab, setActiveTab] = useState<'student' | 'teacher' | 'admin'>('student');
  const [showQrScanner, setShowQrScanner] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (activeTab === 'student') onLogin(UserRole.STUDENT);
      if (activeTab === 'teacher') onLogin(UserRole.TEACHER);
      if (activeTab === 'admin') onLogin(UserRole.ADMIN);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex flex-col items-center justify-center p-4 font-sans relative">
      
      {/* Back Navigation */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 font-bold hover:text-brand-blue transition-colors bg-white px-4 py-2 rounded-xl shadow-sm"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>
      </div>

      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden mt-12 md:mt-0">
        {/* Header */}
        <div className="bg-brand-blue p-8 text-center relative">
          <h1 className="text-3xl font-display font-bold text-white mb-2">Smart Tutor</h1>
          <p className="text-blue-100">The fun way to learn & teach!</p>
        </div>

        {/* Tabs */}
        <div className="flex p-2 bg-slate-50 border-b border-slate-100">
          <button 
            onClick={() => setActiveTab('student')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'student' ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Student
          </button>
          <button 
            onClick={() => setActiveTab('teacher')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'teacher' ? 'bg-white text-brand-purple shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Teacher
          </button>
          <button 
            onClick={() => setActiveTab('admin')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'admin' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Admin
          </button>
        </div>

        {/* Form Area */}
        <div className="p-8">
          {activeTab === 'student' && (
            <div className="space-y-4">
              {!showQrScanner ? (
                <>
                   <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Student ID</label>
                        <div className="relative">
                           <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                           <input type="text" placeholder="Enter your ID" className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-blue focus:outline-none" />
                        </div>
                      </div>
                      <Button type="submit" className="w-full" isLoading={loading}>Enter Class</Button>
                   </form>
                   <div className="relative py-2">
                      <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200"></span></div>
                      <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-500 font-bold">Or</span></div>
                   </div>
                   <Button variant="outline" className="w-full" onClick={() => setShowQrScanner(true)}>
                      <QrCode className="mr-2" size={20} />
                      Scan QR Code
                   </Button>
                </>
              ) : (
                <div className="bg-black rounded-2xl aspect-square flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 border-4 border-brand-green/50 animate-pulse"></div>
                    <div className="text-white text-center p-4">
                       <QrCode size={48} className="mx-auto mb-4 text-brand-green" />
                       <p>Scanning...</p>
                       <button onClick={() => { setShowQrScanner(false); handleLogin({preventDefault:()=>{}} as any); }} className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-2 rounded-full text-sm font-bold">
                         Simulate Scan
                       </button>
                       <button onClick={() => setShowQrScanner(false)} className="absolute top-4 right-4 text-white">✕</button>
                    </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'teacher' && (
            <form onSubmit={handleLogin} className="space-y-4">
               <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
                  <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input type="email" placeholder="teacher@school.edu" className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-purple focus:outline-none" />
                  </div>
               </div>
               <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
                  <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-brand-purple focus:outline-none" />
                  </div>
               </div>
               <Button type="submit" variant="primary" className="w-full bg-brand-purple shadow-[0_4px_0_0_#7C3AED] hover:bg-purple-600" isLoading={loading}>Teacher Login</Button>
               
               <div className="text-center mt-4">
                 <button type="button" className="text-brand-purple text-sm font-bold flex items-center justify-center w-full gap-2">
                   <Smartphone size={16} />
                   Login with Phone OTP
                 </button>
               </div>
            </form>
          )}

          {activeTab === 'admin' && (
            <form onSubmit={handleLogin} className="space-y-4">
               <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-start gap-3">
                  <Shield className="text-red-500 shrink-0" size={20} />
                  <p className="text-xs text-red-600">Restricted access. All actions are logged.</p>
               </div>
               <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Admin ID</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-slate-800 focus:outline-none" />
               </div>
               <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Access Key</label>
                  <input type="password" className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-slate-800 focus:outline-none" />
               </div>
               <Button type="submit" variant="outline" className="w-full bg-slate-800 text-white border-slate-900 hover:bg-slate-700 shadow-[0_4px_0_0_#0F172A]" isLoading={loading}>Access Console</Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
