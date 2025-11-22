import React, { useState } from 'react';
import { User } from '../types';
import { Button } from '../components/Button';
import { generateCurriculum } from '../services/geminiService';
import { Users, BookOpen, Upload, Plus, Settings, LogOut } from 'lucide-react';

interface AdminConsoleProps {
  user: User;
  onLogout: () => void;
}

export const AdminConsole: React.FC<AdminConsoleProps> = ({ user, onLogout }) => {
  const [view, setView] = useState<'users' | 'curriculum'>('users');
  const [curriculumJson, setCurriculumJson] = useState('[]');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateCurriculum = async () => {
    setIsGenerating(true);
    const json = await generateCurriculum('Grade 3', 'Math');
    setCurriculumJson(JSON.stringify(JSON.parse(json), null, 2));
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-4 flex flex-col">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center font-bold">A</div>
          <span className="font-display font-bold text-lg">Admin Portal</span>
        </div>
        
        <nav className="space-y-2 flex-1">
          <button 
            onClick={() => setView('users')}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${view === 'users' ? 'bg-slate-800 text-brand-blue' : 'hover:bg-slate-800/50'}`}
          >
            <Users size={20} /> Users
          </button>
          <button 
            onClick={() => setView('curriculum')}
            className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${view === 'curriculum' ? 'bg-slate-800 text-brand-blue' : 'hover:bg-slate-800/50'}`}
          >
            <BookOpen size={20} /> Curriculum
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 hover:bg-slate-800/50 text-slate-400">
            <Settings size={20} /> Settings
          </button>
        </nav>

        <button onClick={onLogout} className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-xl transition-all">
          <LogOut size={20} /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {view === 'users' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-800">User Management</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm"><Upload size={16} className="mr-2" /> Import CSV</Button>
                <Button size="sm"><Plus size={16} className="mr-2" /> Add User</Button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="p-4 font-bold text-slate-600">Name</th>
                    <th className="p-4 font-bold text-slate-600">Role</th>
                    <th className="p-4 font-bold text-slate-600">Status</th>
                    <th className="p-4 font-bold text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                   <tr>
                      <td className="p-4 font-medium">Mrs. Lakshmi</td>
                      <td className="p-4"><span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">Teacher</span></td>
                      <td className="p-4"><span className="text-green-600 font-bold">Active</span></td>
                      <td className="p-4 text-blue-600 cursor-pointer">Edit</td>
                   </tr>
                   <tr>
                      <td className="p-4 font-medium">Arjun K</td>
                      <td className="p-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">Student</span></td>
                      <td className="p-4"><span className="text-green-600 font-bold">Active</span></td>
                      <td className="p-4 text-blue-600 cursor-pointer">Edit</td>
                   </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {view === 'curriculum' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-800">Curriculum Manager</h2>
              <Button onClick={handleGenerateCurriculum} isLoading={isGenerating}>
                ✨ AI Generate Topics
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <label className="block text-sm font-bold text-slate-700 mb-2">JSON Editor</label>
                <textarea 
                  value={curriculumJson}
                  onChange={(e) => setCurriculumJson(e.target.value)}
                  className="w-full h-96 font-mono text-xs bg-slate-50 border border-slate-200 rounded-lg p-4 focus:outline-none focus:border-brand-blue"
                />
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-bold mb-4">Preview</h3>
                <div className="bg-slate-50 rounded-lg p-4 h-96 overflow-y-auto">
                   {curriculumJson === '[]' ? (
                     <p className="text-slate-400 text-center mt-20">No content yet. Generate or write JSON.</p>
                   ) : (
                     <ul className="space-y-2">
                        {JSON.parse(curriculumJson).map((item: any, i: number) => (
                          <li key={i} className="bg-white p-3 rounded border border-slate-200 shadow-sm">
                             <div className="font-bold text-brand-blue">{item.title}</div>
                             <div className="text-xs text-slate-500">{item.description}</div>
                          </li>
                        ))}
                     </ul>
                   )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};