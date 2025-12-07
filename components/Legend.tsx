import React from 'react';
import { Info } from 'lucide-react';

export const Legend: React.FC = () => {
  return (
    <div className="p-4 bg-slate-50 border-b border-slate-200">
      <div className="flex items-center gap-2 text-slate-800 mb-3">
        <Info size={16} />
        <span className="font-bold text-sm">Interval Ketercapaian (KKTP):</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="bg-white p-2 rounded shadow-sm border-l-4 border-red-500 text-center">
          <span className="font-bold block text-red-700 text-lg">0 - 40%</span> 
          <span className="text-gray-600">Belum Mencapai</span>
        </div>
        <div className="bg-white p-2 rounded shadow-sm border-l-4 border-yellow-500 text-center">
          <span className="font-bold block text-yellow-700 text-lg">41 - 65%</span> 
          <span className="text-gray-600">Belum Tuntas</span>
        </div>
        <div className="bg-white p-2 rounded shadow-sm border-l-4 border-blue-500 text-center">
          <span className="font-bold block text-blue-700 text-lg">66 - 85%</span> 
          <span className="text-gray-600">Sudah Tuntas</span>
        </div>
        <div className="bg-white p-2 rounded shadow-sm border-l-4 border-green-500 text-center">
          <span className="font-bold block text-green-700 text-lg">86 - 100%</span> 
          <span className="text-gray-600">Pengayaan</span>
        </div>
      </div>
    </div>
  );
};