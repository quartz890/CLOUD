import { LessonDetail, Course, Lesson } from '../types';
import { HTML_LESSONS } from './lessons/htmlLessons';
import { CSS_LESSONS } from './lessons/cssLessons';
import { JAVASCRIPT_LESSONS } from './lessons/javascriptLessons';
import { REACT_LESSONS } from './lessons/reactLessons';
import { PYTHON_LESSONS } from './lessons/pythonLessons';

export const LESSON_DETAILS: Record<string, LessonDetail> = {
  ...HTML_LESSONS,
  ...CSS_LESSONS,
  ...JAVASCRIPT_LESSONS,
  ...REACT_LESSONS,
  ...PYTHON_LESSONS,
};

export function getLessonDetail(course: Course, lesson: Lesson): LessonDetail {
  const detail = LESSON_DETAILS[lesson.id];
  
  if (detail) {
    return detail;
  }
  
  // This fallback should theoretically never be hit now since all lessons are mapped,
  // but it's kept as a safety net to prevent crashes.
  return {
    id: lesson.id,
    courseSlug: course.slug,
    title: lesson.title,
    duration: lesson.duration,
    introduction: 'This lesson is currently under construction. Please check back later.',
    learningObjectives: ['Coming soon.'],
    explanation: [
      {
        heading: 'Content Pending',
        paragraphs: ['We are working hard to bring you this content.']
      }
    ],
    codeExample: {
      language: 'text',
      filename: 'example.txt',
      code: '...',
      explanation: '...'
    },
    practicalExample: {
      title: 'Pending',
      scenario: '...',
      code: '...',
      explanation: '...'
    },
    commonMistakes: [],
    practice: {
      title: 'Practice Pending',
      instructions: ['...'],
      starterCode: '...',
      hint: '...',
      solutionCode: '...'
    },
    projectConnection: {
      title: 'Project Connection',
      description: '...',
      howItApplies: '...'
    },
    quiz: []
  };
}
