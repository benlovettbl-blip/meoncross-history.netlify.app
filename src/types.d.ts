/**
 * TypeScript Schema Definitions for Mr Lovett's History Hub
 * 
 * These types validate the JSON structure of the units to prevent runtime errors.
 */

export interface Unit {
  data: UnitData;
}

export interface UnitData {
  title: string;
  theme?: string;
  lessons: Lesson[];
  guided_reading?: GuidedReadingSection[];
  biographies?: Biography[];
  timeline?: TimelineEvent[];
  quizData?: QuizQuestion[];
}

export interface Lesson {
  title: string;
  enquiry_question?: string;
  learning_objectives?: string[];
  teacher_notes?: TeacherNotes;
  do_now?: DoNowActivity;
  narrative_blocks?: NarrativeBlock[];
  sources?: Source[];
  task?: Task;
  plenary?: string;
}

export interface TeacherNotes {
  primer: string;
  objectives: TeacherObjective[];
}

export interface TeacherObjective {
  objective: string;
  primer: string;
  question: string;
}

export interface DoNowActivity {
  type: 'timeline' | 'recall' | 'image' | 'text';
  text?: string;
  questions?: string[];
  answers?: string[];
}

export interface NarrativeBlock {
  heading?: string;
  text: string;
  image?: string;
  image_caption?: string;
}

export interface Source {
  id: string;
  title: string;
  text?: string;
  image?: string;
  caption?: string;
  questions: string[];
  answers: string[];
}

export interface Task {
  title?: string;
  type: string;
  description: string;
  details?: string[];
}

export interface GuidedReadingSection {
  title: string;
  text: string;
  questions?: string[];
}

export interface Biography {
  name: string;
  role: string;
  description: string;
  image?: string;
}

export interface TimelineEvent {
  year: string;
  event: string;
  details?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
}
