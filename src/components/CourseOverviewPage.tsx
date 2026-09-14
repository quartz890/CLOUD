import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Course, Lesson } from '../types';
import { CourseIcon } from './CourseIcon';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  Layers,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Play,
  Sparkles,
  Trophy,
} from 'lucide-react';

interface CourseOverviewPageProps {
  course: Course;
  courses: Course[];
  completedLessons?: Record<string, boolean>;
  onBackToLearn: () => void;
  onNavigateHome: () => void;
  onSelectCourse: (course: Course) => void;
  onStartLesson: (lesson: Lesson, moduleTitle: string, course: Course) => void;
}

export const CourseOverviewPage: React.FC<CourseOverviewPageProps> = ({
  course,
  courses,
  completedLessons = {},
  onBackToLearn,
  onNavigateHome,
  onSelectCourse,
  onStartLesson,
}) => {
  // State to track expanded modules - default all expanded so the user sees all lessons immediately
  const [expandedModuleIds, setExpandedModuleIds] = useState<string[]>(
    course.modules.map((m) => m.id)
  );

  const toggleModule = (moduleId: string) => {
    setExpandedModuleIds((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const expandAll = () => {
    setExpandedModuleIds(course.modules.map((m) => m.id));
  };

  const collapseAll = () => {
    setExpandedModuleIds([]);
  };

  const allExpanded = expandedModuleIds.length === course.modules.length;

  // Flatten all lessons in order to calculate progress and find the next incomplete lesson
  const allCourseLessons: {
    lesson: Lesson;
    moduleTitle: string;
    moduleIndex: number;
    lessonIndex: number;
  }[] = [];

  course.modules.forEach((mod, modIdx) => {
    mod.lessons.forEach((les, lesIdx) => {
      allCourseLessons.push({
        lesson: les,
        moduleTitle: mod.title,
        moduleIndex: modIdx,
        lessonIndex: lesIdx,
      });
    });
  });

  const totalLessonsCount = allCourseLessons.length;
  const completedLessonsCount = allCourseLessons.filter((item) =>
    Boolean(completedLessons[item.lesson.id])
  ).length;
  const progressPercent =
    totalLessonsCount > 0
      ? Math.round((completedLessonsCount / totalLessonsCount) * 100)
      : 0;

  // Find the next incomplete lesson:
  // - If no lessons completed -> first lesson
  // - If lessons have been completed -> next incomplete lesson
  // - If all completed -> first lesson
  const nextIncompleteItem = allCourseLessons.find(
    (item) => !completedLessons[item.lesson.id]
  );
  const targetLessonItem = nextIncompleteItem || allCourseLessons[0];

  const handleContinueLearning = () => {
    if (targetLessonItem) {
      onStartLesson(targetLessonItem.lesson, targetLessonItem.moduleTitle, course);
    }
  };

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

  // Find first lesson to highlight as a quick jump
  const firstLesson = course.modules[0]?.lessons[0];

  return (
    <div id="course-overview-container" className="py-5 sm:py-14">
      <Helmet>
        <title>{course.title} Course | CLOUD Coding Platform</title>
        <meta name="description" content={`Learn ${course.title} online. ${course.shortDescription} Start this ${course.difficulty.toLowerCase()} course featuring ${course.lessonsCount} lessons.`} />
        <meta name="keywords" content={`learn ${course.title}, ${course.title} course, online coding, programming tutorial`} />
        <link rel="canonical" href={`https://ais-dev-wxpc3j32im2tzkdtnkbetd-449991474091.europe-west2.run.app/courses/${course.slug}`} />
        <meta property="og:title" content={`${course.title} Course | CLOUD`} />
        <meta property="og:description" content={`Learn ${course.title} online. ${course.shortDescription}`} />
        <meta name="twitter:title" content={`${course.title} Course | CLOUD`} />
        <meta name="twitter:description" content={`Learn ${course.title} online. ${course.shortDescription}`} />
      </Helmet>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-8">
          <nav className="flex items-center gap-1.5 sm:gap-2 text-xs font-medium text-slate-500 overflow-x-auto no-scrollbar py-0.5" aria-label="Breadcrumb">
            <button
              id="course-overview-breadcrumb-home"
              type="button"
              onClick={onNavigateHome}
              className="hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <button
              id="course-overview-breadcrumb-learn"
              type="button"
              onClick={onBackToLearn}
              className="hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer"
            >
              Courses
            </button>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate max-w-[140px] sm:max-w-none">{course.title}</span>
          </nav>

          <button
            id="course-overview-back-button"
            type="button"
            onClick={onBackToLearn}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors self-start sm:self-auto px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>All Courses</span>
          </button>
        </div>

        {/* Course Header Banner Card */}
        <div
          id="course-overview-header-card"
          className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 sm:p-8 mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
            {/* Tech Icon Container */}
            <div
              className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 ${course.accentColor.bg} border ${course.accentColor.border}`}
            >
              <CourseIcon iconName={course.iconName} className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>

            {/* Course Details */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Course Track
                </span>
                <span className="text-slate-300">•</span>
                {getDifficultyBadge(course.difficulty)}
                {completedLessonsCount === totalLessonsCount && totalLessonsCount > 0 && (
                  <>
                    <span className="text-slate-300">•</span>
                    <span
                      id="course-overview-completed-badge"
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Completed</span>
                    </span>
                  </>
                )}
              </div>

              {/* Course Title */}
              <h1
                id="course-overview-title"
                className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
              >
                {course.title}
              </h1>

              {/* Course Description */}
              <p
                id="course-overview-description"
                className="mt-2 sm:mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal"
              >
                {course.fullDescription}
              </p>

              {/* Course Completed Celebration Banner */}
              {completedLessonsCount === totalLessonsCount && totalLessonsCount > 0 && (
                <div
                  id="course-completed-celebration-banner"
                  className="mt-4 sm:mt-6 p-3.5 sm:p-5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
                      <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm sm:text-base font-bold text-emerald-950">
                          Course Completed
                        </h2>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900">
                          100% Done
                        </span>
                      </div>
                      <p className="text-xs text-emerald-800 mt-0.5 leading-relaxed">
                        All {totalLessonsCount} lessons and knowledge checks completed.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleContinueLearning}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-900 bg-white hover:bg-emerald-100/80 border border-emerald-300 transition-colors shadow-2xs self-stretch sm:self-auto cursor-pointer shrink-0"
                  >
                    <span>Review Lessons</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Meta stats bar: Total Lessons, Duration, Modules */}
              <div
                id="course-overview-stats-bar"
                className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4 sm:gap-7 text-xs sm:text-sm text-slate-600"
              >
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-600" />
                  <span id="course-overview-total-lessons" className="font-semibold text-slate-900">
                    {course.lessonsCount} lessons
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-600" />
                  <span className="font-semibold text-slate-900">{course.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-600" />
                  <span className="font-semibold text-slate-900">{course.modules.length} modules</span>
                </div>
              </div>

              {/* Course Progress Section */}
              <div
                id="course-overview-progress-section"
                className={`mt-4 sm:mt-6 p-3.5 sm:p-6 rounded-xl border ${
                  completedLessonsCount === totalLessonsCount && totalLessonsCount > 0
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-slate-50/90 border-slate-200/80'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700">
                      Progress
                    </span>
                    <span
                      id="course-progress-badge"
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        completedLessonsCount === totalLessonsCount && totalLessonsCount > 0
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : completedLessonsCount > 0
                          ? 'bg-sky-100 text-sky-800 border border-sky-300'
                          : 'bg-slate-200/70 text-slate-700'
                      }`}
                    >
                      {progressPercent}%
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm font-semibold text-slate-600">
                    <span id="course-overview-completed-count" className="font-bold text-slate-900">
                      {completedLessonsCount}/{totalLessonsCount}
                    </span>
                    <span className="hidden sm:inline"> lessons</span>
                  </div>
                </div>

                {/* Progress bar based on completed lessons */}
                <div
                  id="course-overview-progress-bar-container"
                  className="w-full bg-slate-200/70 rounded-full h-2.5 sm:h-3 overflow-hidden p-0.5 border border-slate-200/60"
                  role="progressbar"
                  aria-valuenow={progressPercent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Course completion progress"
                >
                  <div
                    id="course-overview-progress-bar-fill"
                    className={`h-full rounded-full transition-all duration-500 ${
                      completedLessonsCount === totalLessonsCount && totalLessonsCount > 0
                        ? 'bg-emerald-500'
                        : 'bg-sky-600'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Continue / Review Learning CTA Row */}
                <div className="mt-3.5 sm:mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-200/60">
                  <button
                    id="course-overview-continue-learning-button"
                    type="button"
                    onClick={handleContinueLearning}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-2xs hover:shadow cursor-pointer ${
                      completedLessonsCount === totalLessonsCount && totalLessonsCount > 0
                        ? 'text-emerald-900 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300'
                        : 'text-white bg-slate-900 hover:bg-slate-800'
                    }`}
                  >
                    {completedLessonsCount === totalLessonsCount && totalLessonsCount > 0 ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>Review Course</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>{completedLessonsCount > 0 ? 'Continue Lesson' : 'Start Course'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  {targetLessonItem && (
                    <div className="text-[11px] sm:text-xs text-slate-600 flex items-center gap-1.5 truncate">
                      <span className="font-semibold text-slate-500 shrink-0">
                        {completedLessonsCount === 0
                          ? 'Starting:'
                          : completedLessonsCount === totalLessonsCount
                          ? 'Reviewing:'
                          : 'Next up:'}
                      </span>
                      <span className="font-medium text-slate-900 truncate">
                        {targetLessonItem.lesson.title}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Curriculum Syllabus on Left, Context on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">
          {/* Main Column: Modules & Lessons Syllabus */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            <div
              id="course-modules-syllabus-container"
              className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 sm:p-8"
            >
              {/* Syllabus Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    Modules & Lessons
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {course.modules.length} modules • {course.lessonsCount} lessons
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-2">
                  <button
                    type="button"
                    onClick={allExpanded ? collapseAll : expandAll}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    {allExpanded ? 'Collapse All' : 'Expand All'}
                  </button>
                  <span
                    id="course-overview-lessons-badge"
                    className={`text-xs font-semibold px-2.5 py-0.5 sm:py-1 rounded-full ${
                      completedLessonsCount > 0
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {completedLessonsCount > 0
                      ? `${completedLessonsCount}/${course.lessonsCount} Done`
                      : `${course.lessonsCount} Lessons`}
                  </span>
                </div>
              </div>

              {/* Modules List */}
              <div className="space-y-3 sm:space-y-4">
                {course.modules.map((mod, modIndex) => {
                  const isExpanded = expandedModuleIds.includes(mod.id);
                  const modCompletedCount = mod.lessons.filter((les) =>
                    Boolean(completedLessons[les.id])
                  ).length;
                  const isModComplete =
                    modCompletedCount === mod.lessons.length && mod.lessons.length > 0;

                  return (
                    <div
                      key={mod.id}
                      id={`course-module-${mod.id}`}
                      className={`rounded-xl border overflow-hidden bg-white transition-all duration-150 ${
                        isModComplete ? 'border-emerald-200 shadow-2xs' : 'border-slate-200'
                      }`}
                    >
                      {/* Module Header Bar (Clickable) */}
                      <button
                        type="button"
                        onClick={() => toggleModule(mod.id)}
                        className="w-full p-3.5 sm:p-5 flex items-start justify-between gap-2.5 text-left hover:bg-slate-50/70 transition-colors cursor-pointer"
                        aria-expanded={isExpanded}
                      >
                        <div className="flex items-start gap-2.5 sm:gap-3.5 flex-1 min-w-0">
                          {/* Module Number Index */}
                          <span
                            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg border text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                              isModComplete
                                ? 'bg-emerald-500 border-emerald-500 text-white'
                                : 'bg-slate-100 border-slate-200 text-slate-700'
                            }`}
                          >
                            {isModComplete ? (
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            ) : (
                              modIndex + 1
                            )}
                          </span>

                          <div className="flex-1 min-w-0 pr-1">
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-0.5">
                              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                Module {modIndex + 1}
                              </span>
                              <span className="text-slate-300">•</span>
                              <span
                                className={`text-[11px] sm:text-xs font-semibold ${
                                  modCompletedCount > 0
                                    ? 'text-emerald-700'
                                    : 'text-slate-500 font-medium'
                                }`}
                              >
                                {modCompletedCount > 0
                                  ? `${modCompletedCount}/${mod.lessons.length} done`
                                  : `${mod.lessons.length} ${
                                      mod.lessons.length === 1 ? 'lesson' : 'lessons'
                                    }`}
                              </span>
                            </div>

                            <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                              {mod.title}
                            </h3>

                            <p className="text-xs text-slate-600 mt-0.5 sm:mt-1 leading-relaxed line-clamp-2 sm:line-clamp-none">
                              {mod.summary}
                            </p>
                          </div>
                        </div>

                        {/* Right duration & collapse chevron */}
                        <div className="flex items-center gap-2 shrink-0 mt-0.5">
                          <span className="text-xs font-mono font-medium text-slate-500 hidden sm:inline-block">
                            {mod.duration}
                          </span>
                          <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-500">
                            {isExpanded ? (
                              <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            )}
                          </div>
                        </div>
                      </button>

                      {/* Lessons List within this Module */}
                      {isExpanded && (
                        <div
                          id={`module-lessons-list-${mod.id}`}
                          className="border-t border-slate-100 divide-y divide-slate-100 bg-slate-50/30"
                        >
                          {mod.lessons.map((lesson, lessonIndex) => {
                            const isCompleted = Boolean(completedLessons[lesson.id]);

                            return (
                              <div
                                key={lesson.id}
                                id={`lesson-item-${lesson.id}`}
                                className={`p-3 sm:p-4 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 group ${
                                  isCompleted
                                    ? 'bg-emerald-50/40 hover:bg-emerald-50/70 border-l-4 border-l-emerald-500'
                                    : 'hover:bg-white'
                                }`}
                              >
                                <div className="flex items-start gap-2.5 sm:gap-3 flex-1 min-w-0">
                                  {/* Lesson Index Badge / Completed Check */}
                                  {isCompleted ? (
                                    <span
                                      id={`lesson-completed-icon-${lesson.id}`}
                                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-600 text-white text-[10px] sm:text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs"
                                      title="Lesson completed"
                                    >
                                      <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
                                    </span>
                                  ) : (
                                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-100 text-slate-600 text-[10px] sm:text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5">
                                      {modIndex + 1}.{lessonIndex + 1}
                                    </span>
                                  )}

                                  <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                      <h4
                                        className={`text-xs sm:text-sm font-semibold transition-colors ${
                                          isCompleted
                                            ? 'text-emerald-950 font-bold'
                                            : 'text-slate-900 group-hover:text-sky-600'
                                        }`}
                                      >
                                        {lesson.title}
                                      </h4>
                                      {isCompleted && (
                                        <span
                                          id={`lesson-completed-badge-${lesson.id}`}
                                          className="inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-1.5 py-0.2 rounded-full"
                                        >
                                          <Check className="w-2.5 h-2.5 text-emerald-700 stroke-[2.5]" />
                                          <span>Done</span>
                                        </span>
                                      )}
                                    </div>

                                    {lesson.description && (
                                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed line-clamp-1 sm:line-clamp-2">
                                        {lesson.description}
                                      </p>
                                    )}

                                    <div className="mt-1 flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-400 font-medium">
                                      <span className="inline-flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {lesson.duration}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Start / Review Lesson Button */}
                                <div className="sm:shrink-0 self-stretch sm:self-center pl-7 sm:pl-0">
                                  <button
                                    id={`start-lesson-${lesson.id}`}
                                    type="button"
                                    onClick={() => onStartLesson(lesson, mod.title, course)}
                                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-2xs cursor-pointer ${
                                      isCompleted
                                        ? 'text-emerald-800 bg-white hover:bg-emerald-600 hover:text-white border border-emerald-300 hover:border-emerald-600'
                                        : 'text-slate-900 bg-white hover:bg-slate-900 hover:text-white border border-slate-200 hover:border-slate-900 group-hover:border-slate-300'
                                    }`}
                                  >
                                    {isCompleted ? (
                                      <>
                                        <Check className="w-3 h-3 stroke-[2.5]" />
                                        <span>Review</span>
                                      </>
                                    ) : (
                                      <>
                                        <Play className="w-3 h-3 fill-current" />
                                        <span>Start</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar Column: Topics & Details */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-6">
            {/* Key Topics Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 sm:p-6">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-sky-600" />
                <span>Key Topics Covered</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {course.topics.map((topic, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/60"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Target Audience Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 sm:p-6">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
                Who this course is for
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {course.targetAudience}
              </p>
            </div>

            {/* Guided Track Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-6 shadow-sm">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 mb-2 sm:mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Structured Progression</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 sm:mb-2">
                {course.title} Track
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4 sm:mb-5">
                Work through the lessons sequentially from Module 1 through Module {course.modules.length} to build deep architectural intuition.
              </p>
              <button
                id="course-overview-return-catalog-button"
                type="button"
                onClick={onBackToLearn}
                className="w-full py-2 sm:py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View All Courses</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Other Courses Switcher */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-10 border-t border-slate-200">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              Explore Other Tracks
            </h3>
            <button
              type="button"
              onClick={onBackToLearn}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 cursor-pointer"
            >
              See all 5 tracks →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            {courses
              .filter((c) => c.id !== course.id)
              .map((otherCourse) => (
                <button
                  key={otherCourse.id}
                  id={`switch-to-course-${otherCourse.slug}`}
                  type="button"
                  onClick={() => {
                    onSelectCourse(otherCourse);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-2.5 sm:p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 text-left transition-all hover:shadow-2xs group cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                    <CourseIcon iconName={otherCourse.iconName} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs font-bold text-slate-900 group-hover:text-sky-600 transition-colors truncate">
                      {otherCourse.title}
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-slate-500 block truncate">
                    {otherCourse.lessonsCount} lessons • {otherCourse.difficulty}
                  </span>
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
