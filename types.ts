export interface LearningObjective {
  id: string;
  code: string;
  label: string;
  desc: string;
}

export interface Student {
  id: number;
  name: string;
  scores: Record<string, number | string>;
}

export interface IntervalStatus {
  label: string;
  color: string;
  text: string;
  action: string;
}

export interface SchoolData {
  name: string;
  teacher: string;
  headmaster: string;
  subject: string;
  phase: string;
  year: string;
}