
import React, { useState } from 'react';
import { User, StudentProgress } from '../types';
import { generateTeacherInsight } from '../services/geminiService';
import { Button } from '../components/Button';
import { HeatmapGrid } from '../components/HeatmapGrid';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line
} from 'recharts';
import { Users, TrendingUp, AlertTriangle, FileText, Download, Home, LogOut } from 'lucide-react';

interface TeacherDashboardProps {
  user: User;
  studentData: StudentProgress[];
  onLogout: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user, studentData, onLogout }) => {
  const [aiInsight, setAiInsight] = useState<string>('');
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentProgress | null>(null);

  const handleGenerateReport = async () => {
    setIsLoadingInsight(true);
    const insight = await generateTeacherInsight(studentData);
    setAiInsight(insight);
    setIsLoadingInsight(false);
  };

  // Derived Data
  const lowPerformers = studentData.filter(s => s.mathScore < 60 || s.englishScore < 60);
  const heatmapData = studentData.map(s => ({ 
    id: s.studentId, 
    value: Math.round((s.mathScore + s.englishScore + s.tamilScore + s.hindiScore) / 4), 
    name: s.studentName 
  }));

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 gap-4">
          <div className="flex items-center gap-4">
             {/* Home Button for Teachers */}
             <button onClick={onLogout} className="p-3 bg-slate-100 rounded-xl hover:bg-slate-200 text-slate-600 transition-colors" title="Go to Frontpage">
                <Home size={24} />
             </button>
             <div>
                <h1 className="text-3xl font-display font-bold text-slate-900">Class Dashboard</h1>
                <p className="text-slate-500">Class 3-A • {studentData.length} Students</p>
             </div>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" size="sm"><Download size={16} className="mr-2" /> Export Report</Button>
             <Button variant="danger" size="sm" onClick={onLogout}>
                <LogOut size={16} className="mr-2" />
                Logout
             </Button>
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-brand-blue">
              <div className="text-slate-500 font-bold text-sm uppercase mb-1">Avg Class Score</div>
              <div className="text-3xl font-bold text-slate-800">78%</div>
           </div>
           <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-brand-green">
              <div className="text-slate-500 font-bold text-sm uppercase mb-1">Attendance</div>
              <div className="text-3xl font-bold text-slate-800">92%</div>
           </div>
           <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-brand-red">
              <div className="text-slate-500 font-bold text-sm uppercase mb-1">Need Attention</div>
              <div className="text-3xl font-bold text-slate-800">{lowPerformers.length}</div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Heatmap */}
          <div className="lg:col-span-1">
             <HeatmapGrid data={heatmapData} title="Class Mastery Heatmap" />
             
             {/* Needs Attention List */}
             <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <AlertTriangle size={20} className="text-brand-red" />
                    Intervention Needed
                </h3>
                <div className="space-y-3">
                    {lowPerformers.map(s => (
                        <div key={s.studentId} className="flex justify-between items-center p-3 bg-red-50 rounded-xl border border-red-100 cursor-pointer hover:bg-red-100" onClick={() => setSelectedStudent(s)}>
                            <span className="font-bold text-slate-700">{s.studentName}</span>
                            <span className="text-red-600 text-xs font-bold">{s.weakTopics[0] || 'General'}</span>
                        </div>
                    ))}
                </div>
             </div>
          </div>

          {/* Main Chart area or Student Detail */}
          <div className="lg:col-span-2 space-y-6">
             {selectedStudent ? (
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-fade-in">
                  <div className="flex justify-between mb-6">
                     <div>
                        <h3 className="text-2xl font-bold">{selectedStudent.studentName}</h3>
                        <p className="text-slate-500">Student Analysis</p>
                     </div>
                     <Button variant="outline" size="sm" onClick={() => setSelectedStudent(null)}>Close Detail</Button>
                  </div>
                  
                  <div className="h-64 w-full mb-6">
                    <p className="text-sm font-bold text-slate-500 mb-2">Recent Activity Trend</p>
                    <ResponsiveContainer width="100%" height="100%">
                       <LineChart data={selectedStudent.recentActivity.map((v, i) => ({ day: i+1, score: v }))}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="day" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Line type="monotone" dataKey="score" stroke="#4D96FF" strokeWidth={3} dot={{fill: '#4D96FF', r: 4}} />
                       </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-xl">
                          <div className="text-xs font-bold text-slate-500 uppercase">Weak Topics</div>
                          <div className="flex flex-wrap gap-2 mt-2">
                             {selectedStudent.weakTopics.map(t => (
                               <span key={t} className="px-2 py-1 bg-white border border-slate-200 rounded-md text-xs font-bold text-slate-700">{t}</span>
                             ))}
                          </div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl flex items-center justify-between">
                          <div>
                             <div className="text-xs font-bold text-slate-500 uppercase">Avg Score</div>
                             <div className="text-2xl font-bold text-brand-blue">
                               {Math.round((selectedStudent.mathScore + selectedStudent.englishScore + selectedStudent.tamilScore + selectedStudent.hindiScore) / 4)}%
                             </div>
                          </div>
                          <Button size="sm">Assign Remedial</Button>
                      </div>
                  </div>
               </div>
             ) : (
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h3 className="text-lg font-bold mb-4">Subject Performance</h3>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={studentData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis dataKey="studentName" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip 
                          cursor={{fill: '#F1F5F9'}}
                          contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                        />
                        <Legend wrapperStyle={{paddingTop: '20px'}} />
                        <Bar dataKey="mathScore" name="Math" fill="#4D96FF" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="englishScore" name="English" fill="#FFD93D" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="tamilScore" name="Tamil" fill="#FF6B6B" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="hindiScore" name="Hindi" fill="#FF9F43" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
               </div>
             )}

             {/* AI Insight */}
             <div className="bg-brand-purple/5 border border-brand-purple/10 rounded-2xl p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-brand-purple flex items-center gap-2">
                            <FileText size={24} />
                            AI Class Insight
                        </h3>
                        <p className="text-slate-600 mt-1">Generate an AI summary of learning progress.</p>
                    </div>
                    <Button 
                        onClick={handleGenerateReport} 
                        isLoading={isLoadingInsight}
                        className="bg-brand-purple hover:bg-purple-600 shadow-[0_4px_0_0_#7C3AED]"
                    >
                        Generate Report
                    </Button>
                </div>
                {aiInsight && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-purple/10 animate-fade-in">
                        <p className="text-lg text-slate-700 leading-relaxed italic">"{aiInsight}"</p>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
