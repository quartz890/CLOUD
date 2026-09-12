import React, { useState } from 'react';
import { Course } from '../types';
import { CourseIcon } from './CourseIcon';
import { Clock, BookOpen, ArrowRight, Sparkles, Check, ChevronRight } from 'lucide-react';

interface CourseSectionProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
}

export const CourseSection: React.FC<CourseSectionProps> = ({ courses, onSelectCourse }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredCourses = courses.filter((c) => {
    if (selectedDifficulty === 'all') return true;
    if (selectedDifficulty === 'beginner') return c.difficulty.includes('Beginner');
    if (selectedDifficulty === 'intermediate') return c.difficulty.includes('Intermediate');
    return true;
  });

  const getDifficultyBadge = (difficulty: Course['difficulty']) => {
    switch (difficulty) {
      case 'Beginner':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            {difficulty}
          </span>
        );
      case 'Beginner to Intermediate':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
            {difficulty}
          </span>
        );
      case 'Intermediate':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            {difficulty}
          </span>
        );
      case 'Intermediate to Advanced':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            {difficulty}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
            {difficulty}
          </span>
        );
    }
  };

  return (
    <section id="courses-section" className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>The 5 Pillars</span>
          </div>

          <h2
            id="courses-section-title"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Core Foundational Courses
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Five deliberate, carefully designed curriculums engineered to give you a complete mental foundation in modern software development.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button
              id="filter-all-courses"
              type="button"
              onClick={() => setSelectedDifficulty('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedDifficulty === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All 5 Courses
            </button>
            <button
              id="filter-beginner-courses"
              type="button"
              onClick={() => setSelectedDifficulty('beginner')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedDifficulty === 'beginner'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Beginner Friendly
            </button>
            <button
              id="filter-intermediate-courses"
              type="button"
              onClick={() => setSelectedDifficulty('intermediate')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedDifficulty === 'intermediate'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Intermediate
            </button>
          </div>
        </div>

        {/* Courses Cards Grid */}
        <div
          id="courses-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              id={`course-card-${course.slug}`}
              className="group relative bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden"
            >
              {/* Card Top / Header */}
              <div className="p-6 sm:p-7">
                {/* Tech Icon + Difficulty Badge */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${course.accentColor.bg} border ${course.accentColor.border}`}
                  >
                    <CourseIcon iconName={course.iconName} className="w-6 h-6" />
                  </div>
                  <div>{getDifficultyBadge(course.difficulty)}</div>
                </div>

                {/* Course Title */}
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight group-hover:text-sky-600 transition-colors">
                  {course.title}
                </h3>

                {/* Short Description */}
                <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {course.shortDescription}
                </p>

                {/* Metadata: Duration & Lessons count */}
                <div className="mt-6 flex items-center gap-4 text-xs font-medium text-slate-500 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span>{course.lessonsCount} lessons</span>
                  </div>
                </div>

                {/* Key Topics Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {course.topics.slice(0, 3).map((topic, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-50 text-slate-600 border border-slate-200/60"
                    >
                      {topic}
                    </span>
                  ))}
                  {course.topics.length > 3 && (
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-medium text-slate-400">
                      +{course.topics.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer / Action */}
              <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  {course.modules.length} Modules Included
                </span>
                <button
                  id={`course-view-btn-${course.slug}`}
                  type="button"
                  onClick={() => onSelectCourse(course)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-sky-600 transition-colors"
                >
                  <span>Explore Course</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Foundation Notice Box */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 max-w-4xl mx-auto text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Structured progressive path from HTML to Python
            </h4>
            <p className="mt-1 text-sm text-slate-600">
              Each course is designed to build directly upon the insights of the previous one. We start with web document semantics and culminate in high-level programming logic.
            </p>
          </div>
          <button
            id="foundation-start-first-course"
            type="button"
            onClick={() => onSelectCourse(courses[0])}
            className="whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-xs"
          >
            Start with HTML
          </button>
        </div>
      </div>
    </section>
  );
};
