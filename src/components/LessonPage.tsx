import React, { useState } from 'react';
import { Course, Lesson, CourseModule } from '../types';
import { getLessonDetail } from '../data/lessonContents';
import { CourseIcon } from './CourseIcon';
import { LessonQuiz, StoredQuizState } from './LessonQuiz';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Copy,
  Check,
  AlertTriangle,
  Code2,
  Lightbulb,
  BookOpen,
  Layers,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';

interface LessonPageProps {
  course: Course;
  currentLesson: Lesson;
  quizHistoryByLesson?: Record<string, StoredQuizState>;
  completedLessons?: Record<string, boolean>;
  onToggleCompleteLesson?: (lessonId: string) => void;
  onCompleteLesson?: (lessonId: string) => void;
  onSaveQuizState?: (lessonId: string, state: StoredQuizState) => void;
  onSelectLesson: (lesson: Lesson, moduleTitle: string) => void;
  onBackToCourse: () => void;
  onBackToLearn: () => void;
  onNavigateHome: () => void;
}

export const LessonPage: React.FC<LessonPageProps> = ({
  course,
  currentLesson,
  quizHistoryByLesson = {},
  completedLessons = {},
  onToggleCompleteLesson,
  onCompleteLesson,
  onSaveQuizState,
  onSelectLesson,
  onBackToCourse,
  onBackToLearn,
  onNavigateHome,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [mobileSyllabusOpen, setMobileSyllabusOpen] = useState<boolean>(false);

  // Get rich lesson content (using specific authored content or contextual generator)
  const detail = getLessonDetail(course, currentLesson);
  const isCompleted = Boolean(completedLessons[currentLesson.id]);

  // Find flat list of all lessons in course to calculate index and next/prev
  const allLessons: { lesson: Lesson; module: CourseModule; moduleIndex: number; lessonIndex: number }[] = [];
  course.modules.forEach((mod, modIdx) => {
    mod.lessons.forEach((les, lesIdx) => {
      allLessons.push({
        lesson: les,
        module: mod,
        moduleIndex: modIdx,
        lessonIndex: lesIdx,
      });
    });
  });

  const currentIndex = allLessons.findIndex((item) => item.lesson.id === currentLesson.id);
  const currentItem = allLessons[currentIndex] || allLessons[0];
  const prevItem = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextItem = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const currentModule = currentItem?.module || course.modules[0];
  const lessonNumberLabel = `${currentItem.moduleIndex + 1}.${currentItem.lessonIndex + 1}`;

  const handleCopyCode = (text: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNextLesson = () => {
    if (nextItem) {
      onSelectLesson(nextItem.lesson, nextItem.module.title);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevLesson = () => {
    if (prevItem) {
      onSelectLesson(prevItem.lesson, prevItem.module.title);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div id="lesson-page-container" className="min-h-screen pb-16 pt-4 sm:pt-8 bg-slate-50/50">
      {/* Top Header & Breadcrumbs Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-20 shadow-2xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 sm:gap-2 text-xs font-medium text-slate-500 overflow-x-auto whitespace-nowrap py-1">
            <button
              id="lesson-breadcrumb-home"
              type="button"
              onClick={onNavigateHome}
              className="hover:text-slate-900 transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <button
              id="lesson-breadcrumb-learn"
              type="button"
              onClick={onBackToLearn}
              className="hover:text-slate-900 transition-colors"
            >
              Learn
            </button>
            <span>/</span>
            <button
              id="lesson-breadcrumb-course"
              type="button"
              onClick={onBackToCourse}
              className="hover:text-slate-900 transition-colors font-medium"
            >
              {course.title}
            </button>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate max-w-[140px] sm:max-w-[240px]">
              Lesson {lessonNumberLabel}
            </span>
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Previous Lesson Button */}
            <button
              id="lesson-top-prev-button"
              type="button"
              disabled={!prevItem}
              onClick={handlePrevLesson}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                prevItem
                  ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 cursor-pointer shadow-2xs'
                  : 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed opacity-50'
              }`}
              title={prevItem ? `Previous: ${prevItem.lesson.title}` : 'First lesson (no previous lesson)'}
              aria-disabled={!prevItem}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Previous Lesson</span>
            </button>

            {/* Next Lesson Button */}
            <button
              id="lesson-top-next-button"
              type="button"
              disabled={!nextItem}
              onClick={handleNextLesson}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                nextItem
                  ? 'bg-slate-900 border-slate-900 text-white hover:bg-slate-800 cursor-pointer shadow-2xs'
                  : 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed opacity-50'
              }`}
              title={nextItem ? `Next: ${nextItem.lesson.title}` : 'Final lesson in course'}
              aria-disabled={!nextItem}
            >
              <span className="hidden sm:inline">Next Lesson</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              id="lesson-toggle-syllabus-mobile"
              type="button"
              onClick={() => setMobileSyllabusOpen(!mobileSyllabusOpen)}
              className="inline-flex lg:hidden items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              title="Toggle course outline"
            >
              {mobileSyllabusOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">Outline</span>
            </button>

            <button
              id="lesson-back-to-course-btn"
              type="button"
              onClick={onBackToCourse}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Course Syllabus</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Reading Column */}
          <article className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-8 md:p-10">
            {/* Lesson Metadata Header */}
            <header className="pb-6 border-b border-slate-100">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-100 text-slate-700">
                    <CourseIcon iconName={course.iconName} className="w-3.5 h-3.5" />
                    {course.title}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-semibold text-slate-500">
                    Module {currentItem.moduleIndex + 1}: {currentModule.title}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {detail.duration}
                  </span>
                </div>

                {/* Lesson Completion Status (Automatically completed when quiz is finished) */}
                <div
                  id="lesson-completion-status-indicator"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-2xs ${
                    isCompleted
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                  title={isCompleted ? 'Lesson completed via quiz' : 'Finish the quiz below to automatically complete this lesson'}
                >
                  <CheckCircle2
                    className={`w-4 h-4 ${isCompleted ? 'text-emerald-600 fill-emerald-100' : 'text-slate-400'}`}
                  />
                  <span>{isCompleted ? 'Completed via Quiz' : 'Complete Quiz to finish'}</span>
                </div>
              </div>

              {/* Lesson Title (H1) and Completed Badge */}
              <div className="flex flex-wrap items-center gap-3">
                <h1
                  id="lesson-title"
                  className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight"
                >
                  {detail.title}
                </h1>
                {isCompleted && (
                  <span
                    id="lesson-completed-badge"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    Completed
                  </span>
                )}
              </div>

              {/* Short Introduction */}
              <p
                id="lesson-introduction"
                className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
              >
                {detail.introduction}
              </p>
            </header>

            {/* Learning Objectives Box */}
            <section
              id="lesson-learning-objectives"
              className="mt-8 rounded-xl p-5 bg-sky-50/60 border border-sky-100"
              aria-labelledby="learning-objectives-heading"
            >
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-sky-600" />
                <h2
                  id="learning-objectives-heading"
                  className="text-sm font-bold uppercase tracking-wider text-sky-900"
                >
                  Learning Objectives
                </h2>
              </div>
              <ul className="space-y-2.5">
                {detail.learningObjectives.map((objective, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-sky-950">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Clear Explanation of Concept */}
            <section id="lesson-concept-explanation" className="mt-8 space-y-6">
              {detail.explanation.map((section, idx) => (
                <div key={idx} className="space-y-3">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {p}
                    </p>
                  ))}

                  {section.keyPoints && section.keyPoints.length > 0 && (
                    <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Key Points to Remember
                      </h3>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                        {section.keyPoints.map((point, ptIdx) => (
                          <li key={ptIdx} className="flex items-start gap-2">
                            <span className="text-sky-600 font-bold">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </section>

            {/* Code Example in a Readable Code Block */}
            <section id="lesson-code-example" className="mt-10" aria-labelledby="code-example-heading">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-slate-700" />
                  <h2 id="code-example-heading" className="text-base font-bold text-slate-900 tracking-tight">
                    Code Example
                  </h2>
                </div>
                {detail.codeExample.filename && (
                  <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                    {detail.codeExample.filename}
                  </span>
                )}
              </div>

              {/* Readable Code Block */}
              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-sm">
                <div className="flex items-center justify-between px-4 py-2 bg-slate-950/60 border-b border-slate-800 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-2 font-mono uppercase text-[10px] text-slate-400 tracking-wider font-semibold">
                      {detail.codeExample.language}
                    </span>
                  </div>

                  <button
                    id="copy-lesson-code-button"
                    type="button"
                    onClick={() => handleCopyCode(detail.codeExample.code)}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Copy code to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[11px] text-emerald-400 font-medium">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 sm:p-5 overflow-x-auto">
                  <pre className="font-mono text-xs sm:text-sm text-slate-100 leading-relaxed whitespace-pre selection:bg-sky-500 selection:text-white">
                    <code>{detail.codeExample.code}</code>
                  </pre>
                </div>
              </div>

              {/* Code Explanation */}
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {detail.codeExample.explanation}
              </p>
            </section>

            {/* Practical Example */}
            <section
              id="lesson-practical-example"
              className="mt-10 rounded-xl p-5 sm:p-6 bg-slate-50 border border-slate-200"
              aria-labelledby="practical-example-heading"
            >
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4 text-sky-600" />
                <h2 id="practical-example-heading" className="text-base font-bold text-slate-900 tracking-tight">
                  Practical Example: {detail.practicalExample.title}
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {detail.practicalExample.scenario}
              </p>

              {/* Practical snippet */}
              <div className="rounded-lg overflow-hidden border border-slate-300/80 bg-white p-3.5 sm:p-4 mb-3">
                <pre className="font-mono text-xs text-slate-800 overflow-x-auto leading-relaxed whitespace-pre">
                  <code>{detail.practicalExample.code}</code>
                </pre>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {detail.practicalExample.explanation}
              </p>

              {detail.practicalExample.outputDescription && (
                <div className="mt-3 pt-3 border-t border-slate-200 flex items-start gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700 shrink-0">Expected Result:</span>
                  <span>{detail.practicalExample.outputDescription}</span>
                </div>
              )}
            </section>

            {/* Common Mistakes */}
            <section
              id="lesson-common-mistakes"
              className="mt-10 space-y-4"
              aria-labelledby="common-mistakes-heading"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h2 id="common-mistakes-heading" className="text-base font-bold text-slate-900 tracking-tight">
                  Common Mistakes to Avoid
                </h2>
              </div>

              <div className="space-y-4">
                {detail.commonMistakes.map((mistakeItem, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-4 sm:p-5 rounded-xl border border-amber-200/80 bg-amber-50/40 space-y-2.5"
                  >
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {mIdx + 1}
                      </span>
                      <h3 className="text-sm font-bold text-amber-950">
                        {mistakeItem.mistake}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-7">
                      <strong className="text-slate-900 font-semibold">Why it happens: </strong>
                      {mistakeItem.whyItHappens}
                    </p>

                    <div className="pl-7 pt-1">
                      <div className="p-3 rounded-lg bg-white border border-amber-200 text-xs text-slate-800">
                        <strong className="text-emerald-700 font-semibold block mb-1">How to fix it:</strong>
                        <span>{mistakeItem.howToFix}</span>
                      </div>
                    </div>

                    {/* Comparison snippets if available */}
                    {mistakeItem.incorrectSnippet && mistakeItem.correctSnippet && (
                      <div className="pl-7 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="p-2.5 rounded-lg bg-red-50/70 border border-red-200 text-xs font-mono">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 block mb-1">
                            Incorrect ❌
                          </span>
                          <pre className="text-red-900 whitespace-pre overflow-x-auto">
                            <code>{mistakeItem.incorrectSnippet}</code>
                          </pre>
                        </div>

                        <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200 text-xs font-mono">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                            Correct ✅
                          </span>
                          <pre className="text-emerald-900 whitespace-pre overflow-x-auto">
                            <code>{mistakeItem.correctSnippet}</code>
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Interactive Lesson Quiz Section (3 Multiple-Choice Questions) */}
            <LessonQuiz
              key={currentLesson.id}
              lessonId={currentLesson.id}
              quiz={detail.quiz}
              lessonTitle={detail.title}
              nextItem={nextItem ? { lesson: nextItem.lesson, moduleTitle: nextItem.module.title } : null}
              onNextLesson={handleNextLesson}
              onCompleteCourse={onBackToCourse}
              savedState={quizHistoryByLesson[currentLesson.id]}
              onSaveState={(state) => onSaveQuizState?.(currentLesson.id, state)}
              onLessonComplete={() => onCompleteLesson?.(currentLesson.id)}
              isLessonCompleted={isCompleted}
            />

            {/* Bottom Navigation Controls */}
            <footer
              id="lesson-footer-navigation"
              className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              {/* Previous Lesson Button (disabled on first lesson) */}
              <button
                id="lesson-prev-button"
                type="button"
                disabled={!prevItem}
                onClick={handlePrevLesson}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all order-2 sm:order-1 ${
                  prevItem
                    ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 cursor-pointer shadow-2xs'
                    : 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed opacity-50'
                }`}
                aria-disabled={!prevItem}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Lesson</span>
              </button>

              {/* Next Lesson Button (disabled on final lesson) */}
              <button
                id="lesson-next-button"
                type="button"
                disabled={!nextItem}
                onClick={handleNextLesson}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all order-1 sm:order-2 ${
                  nextItem
                    ? 'bg-slate-900 text-white hover:bg-slate-800 cursor-pointer shadow-xs'
                    : 'border border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed opacity-50'
                }`}
                aria-disabled={!nextItem}
              >
                <span>Next Lesson</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </footer>
          </article>

          {/* Desktop Sidebar Course Outline (sticky) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-32 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-sky-600" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Course Syllabus
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-slate-400">
                  {currentIndex + 1} of {allLessons.length}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-1.5 mb-6">
                <div
                  className="bg-sky-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${Math.round(((currentIndex + 1) / allLessons.length) * 100)}%` }}
                />
              </div>

              {/* Modules and lesson list */}
              <div className="space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
                {course.modules.map((mod, mIdx) => (
                  <div key={mod.id} className="space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                      Module {mIdx + 1}: {mod.title}
                    </div>

                    <div className="space-y-1">
                      {mod.lessons.map((les, lIdx) => {
                        const isSelected = les.id === currentLesson.id;
                        const isLesCompleted = Boolean(completedLessons[les.id]);
                        return (
                          <button
                            key={les.id}
                            id={`sidebar-lesson-${les.id}`}
                            type="button"
                            onClick={() => {
                              onSelectLesson(les, mod.title);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between gap-2 transition-colors ${
                              isSelected
                                ? 'bg-sky-50 font-bold text-sky-900 border border-sky-200/80 shadow-2xs'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span
                                className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center shrink-0 ${
                                  isLesCompleted
                                    ? 'bg-emerald-600 text-white'
                                    : isSelected
                                      ? 'bg-sky-600 text-white'
                                      : 'bg-slate-100 text-slate-500'
                                }`}
                              >
                                {isLesCompleted ? (
                                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                                ) : (
                                  `${mIdx + 1}.${lIdx + 1}`
                                )}
                              </span>
                              <span className="truncate">{les.title}</span>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              {isLesCompleted && (
                                <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-1 py-0.2 rounded">
                                  Done
                                </span>
                              )}
                              <span className="text-[10px] text-slate-400 font-mono">
                                {les.duration}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onBackToCourse}
                  className="w-full py-2 px-3 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>View All Modules</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Syllabus Modal / Drawer */}
      {mobileSyllabusOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileSyllabusOpen(false)}
          />

          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-5 flex flex-col z-10 animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-600" />
                <h3 className="text-sm font-bold text-slate-900">{course.title} Syllabus</h3>
              </div>
              <button
                type="button"
                onClick={() => setMobileSyllabusOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {course.modules.map((mod, mIdx) => (
                <div key={mod.id} className="space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2">
                    Module {mIdx + 1}: {mod.title}
                  </div>
                  {mod.lessons.map((les, lIdx) => {
                    const isSelected = les.id === currentLesson.id;
                    const isLesCompleted = Boolean(completedLessons[les.id]);
                    return (
                      <button
                        key={les.id}
                        type="button"
                        onClick={() => {
                          onSelectLesson(les, mod.title);
                          setMobileSyllabusOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'bg-sky-50 font-bold text-sky-900 border border-sky-200'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span
                            className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center shrink-0 ${
                              isLesCompleted
                                ? 'bg-emerald-600 text-white'
                                : isSelected
                                  ? 'bg-sky-600 text-white'
                                  : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {isLesCompleted ? (
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            ) : (
                              `${mIdx + 1}.${lIdx + 1}`
                            )}
                          </span>
                          <span className="truncate">{les.title}</span>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {isLesCompleted && (
                            <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-1 py-0.2 rounded">
                              Done
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400 font-mono">
                            {les.duration}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setMobileSyllabusOpen(false);
                  onBackToCourse();
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold hover:bg-slate-200 transition-colors"
              >
                Return to Course Syllabus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
