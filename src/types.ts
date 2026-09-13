export type DifficultyLevel = 'Beginner' | 'Beginner to Intermediate' | 'Intermediate' | 'Intermediate to Advanced';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  description?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface PracticeSection {
  title: string;
  instructions: string[];
  starterCode?: string;
  solutionCode?: string;
  hint?: string;
}

export interface ProjectConnection {
  title: string;
  description: string;
  howItApplies: string;
}

export interface LessonDetail {
  id: string;
  courseSlug: string;
  title: string;
  duration: string;
  introduction: string;
  learningObjectives: string[];
  explanation: {
    heading: string;
    paragraphs: string[];
    keyPoints?: string[];
  }[];
  codeExample: {
    language: string;
    filename?: string;
    code: string;
    explanation: string;
  };
  practicalExample: {
    title: string;
    scenario: string;
    code: string;
    explanation: string;
    outputDescription?: string;
  };
  commonMistakes: {
    mistake: string;
    whyItHappens: string;
    howToFix: string;
    incorrectSnippet?: string;
    correctSnippet?: string;
  }[];
  practice?: PracticeSection;
  projectConnection?: ProjectConnection;
  quiz: QuizQuestion[];
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  summary: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  difficulty: DifficultyLevel;
  duration: string;
  lessonsCount: number;
  iconName: 'html' | 'css' | 'javascript' | 'react' | 'python';
  accentColor: {
    bg: string;
    text: string;
    border: string;
    badge: string;
    ring: string;
    hoverBorder: string;
  };
  topics: string[];
  modules: CourseModule[];
  targetAudience: string;
}

export type AchievementId =
  | 'first-lesson'
  | 'first-quiz'
  | 'first-course'
  | 'ten-lessons'
  | 'seven-day-streak';

export interface AchievementDef {
  id: AchievementId;
  title: string;
  description: string;
  iconName: 'book-open' | 'target' | 'trophy' | 'award' | 'flame';
  category: 'Lessons' | 'Quizzes' | 'Courses' | 'Streaks';
  requirementText: string;
}

export interface AchievementRecord {
  id: string;
  userId: string;
  achievementId: AchievementId;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface CourseCompletionRecord {
  id: string;
  userId: string;
  courseId: string;
  completed: boolean;
  completedAt?: string;
}
