import { LearningObjective, SchoolData } from './types';

export const SCHOOL_DATA: SchoolData = {
  name: "SMP NEGERI SATAP 3 BANAWA TENGAH",
  teacher: "FATMAWATI, S.Pd",
  headmaster: "FATMI, S.Pd., M.Pd",
  subject: "Bahasa Inggris",
  phase: "Kelas VII (Semester Ganjil)",
  year: "2025/2026"
};

export const LEARNING_OBJECTIVES: LearningObjective[] = [
  { id: 'tp1_1', code: '1.1', label: 'Identitas Diri', desc: 'Mengungkapkan identitas diri & orang lain' },
  { id: 'tp1_2', code: '1.2', label: 'Hobi', desc: 'Mengungkapkan hobi/kesukaan' },
  { id: 'tp1_3', code: '1.3', label: 'Ciri Fisik', desc: 'Mengungkapkan ciri/penampilan fisik' },
  { id: 'tp1_4', code: '1.4', label: 'Info Teks (Food)', desc: 'Identifikasi info teks (Food, frequency, tools)' },
  { id: 'tp1_5', code: '1.5', label: 'Info Tersurat', desc: 'Menyebutkan informasi tersurat (Food, tools)' },
  { id: 'tp1_6', code: '1.6', label: 'Teks Deskripsi', desc: 'Membuat teks deskripsi sederhana' },
  { id: 'tp2_3', code: '2.3.1', label: 'Teks Prosedur', desc: 'Langkah-langkah memasak (Recipe)' },
  { id: 'tp3_1', code: '3.1', label: 'Deskripsi Ruangan', desc: 'Mendeskripsikan ruangan & benda di rumah' },
  { id: 'tp3_1_2', code: '3.1.2', label: 'Pekerjaan Rumah', desc: 'Mengungkapkan kegiatan di rumah' },
  { id: 'tp3_2', code: '3.2', label: 'Instruksi', desc: 'Memberi instruksi kepada orang lain' },
  { id: 'tp3_2_1', code: '3.2.1', label: 'Simple Present', desc: 'Identifikasi info bacaan (Simple Present)' },
  { id: 'tp3_3', code: '3.3', label: 'Imperative', desc: 'Kalimat perintah terkait kebersihan' },
  { id: 'tp3_4', code: '3.4', label: 'Notice/Warning', desc: 'Membuat notice atau warning' }
];

export const INITIAL_STUDENTS = [
  { 
    id: 1, 
    name: 'Ahmad Fauzan', 
    scores: { tp1_1: 80, tp1_2: 82, tp1_3: 78, tp1_4: 75, tp1_5: 80, tp1_6: 70, tp2_3: 85, tp3_1: 88, tp3_1_2: 85, tp3_2: 80, tp3_2_1: 78, tp3_3: 82, tp3_4: 85 } 
  },
  { 
    id: 2, 
    name: 'Siti Aminah', 
    scores: { tp1_1: 60, tp1_2: 65, tp1_3: 60, tp1_4: 55, tp1_5: 60, tp1_6: 50, tp2_3: 65, tp3_1: 70, tp3_1_2: 68, tp3_2: 65, tp3_2_1: 60, tp3_3: 62, tp3_4: 65 } 
  },
];