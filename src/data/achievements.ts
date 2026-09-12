import { AchievementDef } from '../types';

export const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: 'first-lesson',
    title: 'First Lesson',
    description: 'Complete your first lesson.',
    iconName: 'book-open',
    category: 'Lessons',
    requirementText: 'Complete 1 lesson',
  },
  {
    id: 'first-quiz',
    title: 'First Quiz',
    description: 'Successfully complete your first quiz.',
    iconName: 'target',
    category: 'Quizzes',
    requirementText: 'Complete 1 lesson quiz',
  },
  {
    id: 'first-course',
    title: 'First Course',
    description: 'Complete your first course.',
    iconName: 'trophy',
    category: 'Courses',
    requirementText: 'Complete all lessons in any course',
  },
  {
    id: 'ten-lessons',
    title: '10 Lessons',
    description: 'Complete 10 lessons.',
    iconName: 'award',
    category: 'Lessons',
    requirementText: 'Complete 10 total lessons',
  },
  {
    id: 'seven-day-streak',
    title: '7 Day Streak',
    description: 'Use the platform for 7 consecutive days.',
    iconName: 'flame',
    category: 'Streaks',
    requirementText: 'Active on 7 consecutive days',
  },
];
