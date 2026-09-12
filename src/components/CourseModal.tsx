import React from 'react';
import { Course } from '../types';
import { CourseIcon } from './CourseIcon';
import { X, Clock, BookOpen, CheckCircle, ArrowRight, UserCheck } from 'lucide-react';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
  onStartCourse: (course: Course) => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({ course, onClose, onStartCourse }) => {
  if (!course) return null;

  return (
    <div
      id="course-detail-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="course-detail-modal-card"
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
          <div className="flex items-start gap-4">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${course.accentColor.bg} border ${course.accentColor.border}`}
            >
              <CourseIcon iconName={course.iconName} className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Course Curriculum
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {course.difficulty}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {course.title}
              </h3>
            </div>
          </div>

          <button
            id="course-modal-close-button"
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Course Overview
            </h4>
            <p className="text-base text-slate-700 leading-relaxed">
              {course.fullDescription}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div>
              <div className="text-xs text-slate-500 font-medium">Estimated Time</div>
              <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                <Clock className="w-4 h-4 text-sky-600" />
                <span>{course.duration}</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Structured Lessons</div>
              <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                <BookOpen className="w-4 h-4 text-sky-600" />
                <span>{course.lessonsCount} lessons</span>
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-xs text-slate-500 font-medium">Prerequisites</div>
              <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                <UserCheck className="w-4 h-4 text-sky-600" />
                <span>{course.difficulty.includes('Beginner') ? 'None required' : 'Prior basics'}</span>
              </div>
            </div>
          </div>

          {/* Target Audience */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Target Audience
            </h4>
            <p className="text-sm text-slate-600">{course.targetAudience}</p>
          </div>

          {/* Modules Syllabus */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Included Modules ({course.modules.length})
            </h4>
            <div className="space-y-2.5">
              {course.modules.map((mod, index) => (
                <div
                  key={mod.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/50 transition-colors flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-bold mt-0.5 shrink-0">
                      {index + 1}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{mod.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{mod.summary}</div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-slate-400 shrink-0 mt-0.5">
                    {mod.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-6 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            id="course-modal-dismiss-button"
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
          >
            Close
          </button>
          <button
            id="course-modal-start-course-button"
            type="button"
            onClick={() => onStartCourse(course)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm"
          >
            <span>Start {course.title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
