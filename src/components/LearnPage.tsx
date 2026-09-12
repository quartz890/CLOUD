import React, { useState } from 'react';
import { Course } from '../types';
import { CourseIcon } from './CourseIcon';
import { BookOpen, Clock, ArrowRight, Search, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

interface LearnPageProps {
  courses: Course[];
  completedLessons?: Record<string, boolean>;
  onStartCourse: (course: Course) => void;
  onNavigateHome: () => void;
}

export const LearnPage: React.FC<LearnPageProps> = ({
  courses,
  completedLessons = {},
  onStartCourse,
  onNavigateHome,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDifficulty =
      filterDifficulty === 'all' ||
      (filterDifficulty === 'beginner' && course.difficulty.toLowerCase().includes('beginner')) ||
      (filterDifficulty === 'intermediate' && course.difficulty.toLowerCase().includes('intermediate'));

    return matchesSearch && matchesDifficulty;
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

  const getCourseProgress = (course: Course) => {
    let total = 0;
    let completed = 0;
    course.modules.forEach((mod) => {
      mod.lessons.forEach((les) => {
        total += 1;
        if (completedLessons[les.id]) {
          completed += 1;
        }
      });
    });
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    const isFullyCompleted = total > 0 && completed === total;
    return { total, completed, percentage, isFullyCompleted };
  };

  return (
    <div id="learn-page-container" className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-8" aria-label="Breadcrumb">
          <button
            type="button"
            onClick={onNavigateHome}
            className="hover:text-slate-900 transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Course Catalog</span>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-xs font-semibold text-sky-700 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>CLOUD Course Catalog</span>
          </div>

          <h1
            id="learn-page-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight"
          >
            Explore Courses
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Choose a foundation course below. Each track is engineered to build conceptual clarity from the ground up, starting from foundational HTML through modern Python logic.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div
          id="learn-filter-bar"
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4"
        >
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="course-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses (e.g., HTML, React, Flexbox, Python)..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Difficulty Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-medium text-slate-400 mr-1 hidden lg:inline-flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            <button
              type="button"
              onClick={() => setFilterDifficulty('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                filterDifficulty === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Courses ({courses.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterDifficulty('beginner')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                filterDifficulty === 'beginner'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Beginner
            </button>
            <button
              type="button"
              onClick={() => setFilterDifficulty('intermediate')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                filterDifficulty === 'intermediate'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Intermediate
            </button>
          </div>
        </div>

        {/* Courses Cards Grid */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
            <p className="text-slate-500 text-sm">No courses found matching your query.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setFilterDifficulty('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            id="learn-courses-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredCourses.map((course) => {
              const { total, completed, percentage, isFullyCompleted } = getCourseProgress(course);

              return (
                <div
                  key={course.id}
                  id={`learn-course-card-${course.slug}`}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
                >
                  {/* Card Body */}
                  <div className="p-6 sm:p-7">
                    {/* Top Bar: Icon + Difficulty + Completion status */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${course.accentColor.bg} border ${course.accentColor.border}`}
                      >
                        <CourseIcon iconName={course.iconName} className="w-6 h-6" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        {isFullyCompleted && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Completed
                          </span>
                        )}
                        {getDifficultyBadge(course.difficulty)}
                      </div>
                    </div>

                    {/* Course Name */}
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight group-hover:text-sky-600 transition-colors">
                      {course.title}
                    </h2>

                    {/* Short Description */}
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                      {course.shortDescription}
                    </p>

                    {/* Progress Bar (if user has started the course) */}
                    {completed > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                          <span className="text-slate-600">
                            {completed} of {total} lessons completed
                          </span>
                          <span className={isFullyCompleted ? 'text-emerald-600 font-bold' : 'text-sky-600 font-bold'}>
                            {percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                              isFullyCompleted ? 'bg-emerald-500' : 'bg-sky-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Course Metadata: Lessons Count + Duration */}
                    <div className="mt-5 flex items-center gap-4 text-xs font-medium text-slate-500 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 font-medium text-slate-700">
                        <BookOpen className="w-4 h-4 text-sky-600" />
                        <span>{course.lessonsCount} lessons</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    {/* Topics Tags */}
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

                  {/* Card Action / Start Course Button */}
                  <div className="p-6 pt-0">
                    <button
                      id={`learn-start-course-btn-${course.slug}`}
                      type="button"
                      onClick={() => onStartCourse(course)}
                      className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all shadow-xs hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-[0.99] cursor-pointer ${
                        isFullyCompleted
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                          : completed > 0
                          ? 'bg-sky-600 hover:bg-sky-500 text-white'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <span>
                        {isFullyCompleted ? 'Review Syllabus' : completed > 0 ? 'Continue Course' : 'Start Course'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Guided Roadmap Footer Callout */}
        <div className="mt-16 p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-bold text-slate-900">
              Not sure which track to begin with?
            </h3>
            <p className="text-sm text-slate-600">
              We recommend starting with <strong>HTML</strong> to understand the web document tree, followed by <strong>CSS</strong> and <strong>JavaScript</strong>.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              const htmlCourse = courses.find((c) => c.slug === 'html') || courses[0];
              onStartCourse(htmlCourse);
            }}
            className="whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Start with HTML
          </button>
        </div>
      </div>
    </div>
  );
};
