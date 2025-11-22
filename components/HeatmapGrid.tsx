import React from 'react';

interface HeatmapGridProps {
  data: { id: string; value: number; name: string }[];
  title: string;
}

export const HeatmapGrid: React.FC<HeatmapGridProps> = ({ data, title }) => {
  const getColor = (value: number) => {
    if (value >= 80) return 'bg-brand-green';
    if (value >= 50) return 'bg-brand-yellow';
    return 'bg-brand-red';
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h3 className="text-lg font-bold mb-4 text-slate-800 font-display">{title}</h3>
      <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
        {data.map((item) => (
          <div 
            key={item.id} 
            className="group relative flex flex-col items-center"
          >
            <div 
              className={`w-full aspect-square rounded-lg ${getColor(item.value)} transition-all hover:opacity-80 cursor-pointer`}
            />
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 hidden group-hover:block z-10">
               <div className="bg-slate-800 text-white text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap">
                 {item.name}: {item.value}%
               </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-4 text-xs text-slate-500">
         <div className="flex items-center gap-1"><div className="w-3 h-3 bg-brand-red rounded"></div> Needs Help</div>
         <div className="flex items-center gap-1"><div className="w-3 h-3 bg-brand-yellow rounded"></div> Average</div>
         <div className="flex items-center gap-1"><div className="w-3 h-3 bg-brand-green rounded"></div> Good</div>
      </div>
    </div>
  );
};