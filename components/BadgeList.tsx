import React from 'react';
import { Badge } from '../types';

interface BadgeListProps {
  badges: Badge[];
}

export const BadgeList: React.FC<BadgeListProps> = ({ badges }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {badges.map((badge) => (
        <div 
          key={badge.id}
          className={`
            flex flex-col items-center p-3 rounded-xl border-2 text-center transition-all
            ${badge.unlocked 
              ? 'bg-white border-brand-yellow shadow-[0_4px_0_0_#EAB308]' 
              : 'bg-slate-50 border-slate-200 opacity-60 grayscale'}
          `}
        >
          <div className="text-3xl mb-1">{badge.icon}</div>
          <div className="text-xs font-bold text-slate-700 leading-tight">{badge.name}</div>
          <div className="text-[10px] text-slate-500 mt-1 hidden sm:block">{badge.description}</div>
        </div>
      ))}
    </div>
  );
};