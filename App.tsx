import React, { useState } from 'react';
import { Download, Plus, Trash2, BookOpen } from 'lucide-react';
import { Student, IntervalStatus } from './types';
import { SCHOOL_DATA, LEARNING_OBJECTIVES, INITIAL_STUDENTS } from './constants';
import { Legend } from './components/Legend';

const App = () => {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);

  // Logic: Calculate Average Score
  const calculateAverage = (scores: Record<string, number | string>): number | string => {
    let total = 0;
    let count = 0;
    LEARNING_OBJECTIVES.forEach(tp => {
      const val = parseFloat(String(scores[tp.id]));
      if (!isNaN(val)) {
        total += val;
        count++;
      }
    });
    return count === 0 ? 0 : (total / count).toFixed(1);
  };

  // Logic: Determine Status based on Interval
  const getIntervalStatus = (score: number | string): IntervalStatus => {
    if (score === '' || score === null || score === undefined || isNaN(Number(score))) {
      return { label: '-', color: 'bg-gray-100', text: 'text-gray-500', action: '' };
    }
    
    const val = parseFloat(String(score));
    if (val >= 86) return { label: 'Sudah Tuntas (Pengayaan)', color: 'bg-green-100', text: 'text-green-800', action: 'Perlu Pengayaan' };
    if (val >= 66) return { label: 'Sudah Tuntas', color: 'bg-blue-100', text: 'text-blue-800', action: 'Tidak Perlu Remedial' };
    if (val >= 41) return { label: 'Belum Tuntas (Remedial Sebagian)', color: 'bg-yellow-100', text: 'text-yellow-800', action: 'Remedial Bagian Tertentu' };
    return { label: 'Belum Tuntas (Remedial Total)', color: 'bg-red-100', text: 'text-red-800', action: 'Remedial Seluruh Bagian' };
  };

  // Handlers
  const handleScoreChange = (id: number, tpId: string, value: string) => {
    if (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= 100)) {
      setStudents(prev => prev.map(s => 
        s.id === id ? { ...s, scores: { ...s.scores, [tpId]: value } } : s
      ));
    }
  };

  const handleNameChange = (id: number, value: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, name: value } : s));
  };

  const addStudent = () => {
    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    setStudents(prev => [...prev, { id: newId, name: '', scores: {} }]);
  };

  const removeStudent = (id: number) => {
    if (window.confirm('Hapus baris siswa ini?')) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  const downloadCSV = () => {
    const headers = ['No', 'Nama Siswa', ...LEARNING_OBJECTIVES.map(t => `"${t.code} ${t.label}"`), 'Rata-rata', 'Keterangan', 'Tindak Lanjut'];
    
    const rows = students.map((s, idx) => {
      const avg = calculateAverage(s.scores);
      const status = getIntervalStatus(avg);
      return [
        idx + 1,
        `"${s.name}"`,
        ...LEARNING_OBJECTIVES.map(t => s.scores[t.id] || 0),
        avg,
        `"${status.label}"`,
        `"${status.action || ''}"`
      ];
    });

    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `KKTP_B_Inggris_Smt1_${SCHOOL_DATA.year.replace('/','-')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-6 font-sans text-xs md:text-sm text-slate-900">
      <div className="mx-auto bg-white shadow-xl rounded-xl overflow-hidden w-full max-w-[1600px] border border-gray-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 border-b-4 border-yellow-500 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10">
            <div>
              <h1 className="text-xl md:text-3xl font-bold uppercase tracking-wide flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-yellow-500" /> 
                <span>Lembar Kerja KKTP</span>
              </h1>
              <h2 className="text-lg font-medium text-slate-300 mt-1">{SCHOOL_DATA.name}</h2>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 text-sm text-slate-400">
                <div className="flex gap-2">
                  <span className="w-24 font-semibold text-slate-500">Mata Pelajaran</span>
                  <span className="text-white">: {SCHOOL_DATA.subject}</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-24 font-semibold text-slate-500">Tahun Ajar</span>
                  <span className="text-white">: {SCHOOL_DATA.year}</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-24 font-semibold text-slate-500">Kelas</span>
                  <span className="text-white">: {SCHOOL_DATA.phase}</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-24 font-semibold text-slate-500">Guru</span>
                  <span className="text-white">: {SCHOOL_DATA.teacher}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 md:mt-0">
              <button 
                onClick={downloadCSV}
                className="group flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold px-5 py-3 rounded-lg shadow-lg hover:shadow-yellow-500/20 transition-all transform hover:-translate-y-0.5"
              >
                <Download size={20} className="group-hover:scale-110 transition-transform" /> 
                Download CSV
              </button>
            </div>
          </div>
        </div>

        <Legend />

        {/* Table Container */}
        <div className="overflow-x-auto pb-24 relative">
          <table className="w-full border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-slate-100 text-slate-700 uppercase tracking-wider text-center font-bold text-[11px] leading-tight">
                <th className="border-y border-r border-slate-300 p-2 w-12 sticky left-0 bg-slate-100 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                  No
                </th>
                <th className="border-y border-r border-slate-300 p-2 w-64 text-left sticky left-12 bg-slate-100 z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                  Nama Siswa
                </th>
                {LEARNING_OBJECTIVES.map(tp => (
                  <th key={tp.id} className="border-y border-r border-slate-300 p-2 w-20 min-w-[90px] group relative hover:bg-slate-200 transition-colors">
                    <div className="flex flex-col items-center cursor-help">
                      <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded text-[10px] mb-1 font-mono">{tp.code}</span>
                      <span className="text-[10px] text-slate-600 line-clamp-2 h-8">{tp.label}</span>
                    </div>
                    {/* Tooltip */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block bg-slate-800 text-white text-xs p-3 rounded-lg w-56 z-50 shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="font-bold mb-1 border-b border-slate-600 pb-1">{tp.code}: {tp.label}</div>
                      <p className="font-light">{tp.desc}</p>
                      {/* Arrow */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-b-slate-800"></div>
                    </div>
                  </th>
                ))}
                <th className="border-y border-r border-slate-300 p-2 w-20 bg-blue-50 text-blue-900">Rata2</th>
                <th className="border-y border-r border-slate-300 p-2 w-48 bg-blue-50 text-blue-900">Keterangan</th>
                <th className="border-y border-slate-300 p-2 w-12">Act</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {students.map((student, index) => {
                const avg = calculateAverage(student.scores);
                const status = getIntervalStatus(avg);
                return (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="p-2 text-center sticky left-0 bg-white group-hover:bg-slate-50 z-10 border-r border-slate-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] text-slate-500 font-mono">
                      {index + 1}
                    </td>
                    <td className="p-2 sticky left-12 bg-white group-hover:bg-slate-50 z-10 border-r border-slate-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                      <input 
                        type="text" 
                        value={student.name}
                        onChange={(e) => handleNameChange(student.id, e.target.value)}
                        placeholder="Nama Siswa..."
                        className="w-full bg-transparent outline-none font-medium text-slate-900 placeholder:text-slate-300 focus:placeholder:text-slate-400"
                      />
                    </td>
                    {LEARNING_OBJECTIVES.map(tp => {
                       const scoreVal = student.scores[tp.id] || 0;
                       const isLow = scoreVal !== 0 && scoreVal !== '' && scoreVal < 66;
                       return (
                        <td key={tp.id} className={`p-1 text-center border-r border-slate-200 ${isLow ? 'bg-red-50' : ''}`}>
                          <input
                            type="number"
                            value={student.scores[tp.id] || ''}
                            onChange={(e) => handleScoreChange(student.id, tp.id, e.target.value)}
                            className={`w-full text-center outline-none rounded-md py-1.5 text-sm transition-all focus:ring-2 focus:ring-blue-500 focus:bg-white ${
                              isLow 
                                ? 'text-red-600 font-bold bg-red-50' 
                                : 'text-slate-700 bg-transparent'
                            }`}
                            placeholder="-"
                          />
                        </td>
                      );
                    })}
                    <td className="p-2 text-center font-bold bg-blue-50/50 text-blue-900 border-r border-slate-200 font-mono">
                      {avg}
                    </td>
                    <td className={`p-2 text-center font-semibold text-[11px] leading-tight border-r border-slate-200`}>
                      <span className={`px-2 py-1 rounded-full ${status.color} ${status.text} inline-block w-full`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="p-2 text-center">
                      <button 
                        onClick={() => removeStudent(student.id)}
                        className="text-slate-300 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50"
                        title="Hapus Siswa"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              
              {/* Add Student Row Button at the bottom of the table for easy access */}
              <tr>
                 <td colSpan={LEARNING_OBJECTIVES.length + 5} className="p-2">
                    <button
                        onClick={addStudent}
                        className="w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 font-medium"
                    >
                        <Plus size={18} /> Tambah Baris Siswa
                    </button>
                 </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Actions & Signatures */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-5px_15px_rgba(0,0,0,0.1)] z-40">
           <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              
              <div className="flex gap-3">
                 <button 
                  onClick={addStudent}
                  className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all shadow-md font-medium"
                >
                  <Plus size={18} /> <span className="hidden md:inline">Tambah Siswa</span>
                </button>
                <div className="text-xs text-slate-500 flex items-center px-4 bg-slate-100 rounded-lg border border-slate-200">
                    Total Siswa: {students.length}
                </div>
              </div>

              <div className="text-right text-xs text-slate-600 hidden md:block">
                <div className="flex items-start gap-12">
                  <div className="text-center group cursor-pointer">
                    <p className="text-slate-400 mb-6 group-hover:text-slate-600 transition">Mengetahui Kepala Sekolah</p>
                    <p className="font-bold border-b border-slate-300 pb-0.5 group-hover:border-slate-800 transition">{SCHOOL_DATA.headmaster}</p>
                  </div>
                  <div className="text-center group cursor-pointer">
                    <p className="text-slate-400 mb-6 group-hover:text-slate-600 transition">Guru Mata Pelajaran</p>
                    <p className="font-bold border-b border-slate-300 pb-0.5 group-hover:border-slate-800 transition">{SCHOOL_DATA.teacher}</p>
                  </div>
                </div>
              </div>

           </div>
        </div>

      </div>
    </div>
  );
};

export default App;