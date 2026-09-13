import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../lib/AuthContext';
import { Course, Lesson } from '../types';
import {
  User as UserIcon,
  LogOut,
  Mail,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';

interface ProfilePageProps {
  courses: Course[];
  completedLessons: Record<string, boolean>;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onNavigateHome: () => void;
  onSelectLesson: (lesson: Lesson, moduleTitle: string, course: Course) => void;
  onStartCourse: (course: Course) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  courses,
  completedLessons,
  onOpenAuth,
  onNavigateHome,
  onSelectLesson,
  onStartCourse,
}) => {
  const { user, displayName, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Flatten all lessons across all courses
  const allCourseLessons: { course: Course; moduleTitle: string; lesson: Lesson }[] = [];
  courses.forEach((c) => {
    c.modules.forEach((m) => {
      m.lessons.forEach((l) => {
        allCourseLessons.push({
          course: c,
          moduleTitle: m.title,
          lesson: l,
        });
      });
    });
  });

  const totalLessonsCount = allCourseLessons.length;
  const completedLessonsList = allCourseLessons.filter(
    (item) => completedLessons[item.lesson.id]
  );
  const completedCount = completedLessonsList.length;
  const overallPercentage = totalLessonsCount > 0
    ? Math.round((completedCount / totalLessonsCount) * 100)
    : 0;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div id="profile-page-root" className="min-h-[85vh] py-4 sm:py-12 bg-slate-50/70">
      <Helmet>
        <title>Profile | CLOUD Coding Platform</title>
        <meta name="description" content="View your CLOUD user profile and completed learning." />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Breadcrumb navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-4 sm:mb-6">
          <button
            id="profile-breadcrumb-home"
            type="button"
            onClick={onNavigateHome}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-slate-900 font-semibold">User Profile</span>
        </nav>

        {user ? (
          /* Logged In View */
          <div className="space-y-4 sm:space-y-8 animate-in fade-in duration-300">
            {/* User Account Card */}
            <div
              id="profile-user-card"
              className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 pb-4 sm:pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-sky-500 to-sky-600 text-white flex items-center justify-center font-bold text-lg sm:text-2xl shadow-md shadow-sky-500/20 shrink-0">
                    {displayName ? displayName.charAt(0).toUpperCase() : <UserIcon className="w-6 h-6 sm:w-8 sm:h-8" />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <h1
                        id="profile-user-email-heading"
                        className="text-base sm:text-2xl font-extrabold text-slate-900 tracking-tight truncate max-w-[200px] sm:max-w-none"
                      >
                        {displayName}
                      </h1>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        Authenticated
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] sm:text-xs text-slate-500 mt-1">
                      <span className="inline-flex items-center gap-1 truncate max-w-[180px] sm:max-w-none">
                        <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                        {user.email}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="hidden sm:inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        Firebase UID: {user.uid.slice(0, 10)}...
                      </span>
                    </div>
                  </div>
                </div>

                {/* Logout Button */}
                <div className="pt-1 sm:pt-0">
                  <button
                    id="profile-logout-button"
                    type="button"
                    disabled={isLoggingOut}
                    onClick={handleLogout}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{isLoggingOut ? 'Logging out...' : 'Log Out'}</span>
                  </button>
                </div>
              </div>

              {/* Progress Summary Stats */}
              <div className="pt-4 sm:pt-6 grid grid-cols-3 gap-2.5 sm:gap-4">
                <div className="p-2.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider block truncate">
                    Lessons
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-lg sm:text-2xl font-bold text-slate-900">
                      {completedCount}
                    </span>
                    <span className="text-[10px] sm:text-xs text-slate-500">
                      /{totalLessonsCount}
                    </span>
                  </div>
                </div>

                <div className="p-2.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider block truncate">
                    Progress
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-lg sm:text-2xl font-bold text-sky-600">
                      {overallPercentage}%
                    </span>
                  </div>
                </div>

                <div className="p-2.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider block truncate">
                    Sync
                  </span>
                  <div className="flex items-center gap-1 mt-1.5 sm:mt-2">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <span className="text-[10px] sm:text-xs font-semibold text-emerald-700 truncate">
                      Cloud Sync
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Completed Lessons Section */}
            <div
              id="profile-completed-lessons-section"
              className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 sm:p-8"
            >
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    Your Completed Lessons
                  </h2>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    Saved to your private account
                  </p>
                </div>
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800">
                  {completedCount} Finished
                </span>
              </div>

              {completedCount === 0 ? (
                <div className="text-center py-8 sm:py-12 px-4 bg-slate-50/60 rounded-xl border border-dashed border-slate-200">
                  <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400 mx-auto mb-2 sm:mb-3" />
                  <h3 className="text-xs sm:text-sm font-bold text-slate-700">
                    No completed lessons yet
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                    Complete any lesson's knowledge check quiz to record progress here.
                  </p>
                  <button
                    id="profile-explore-courses-btn"
                    type="button"
                    onClick={() => {
                      if (courses.length > 0) onStartCourse(courses[0]);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
                  >
                    <span>Start First Course</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {completedLessonsList.map((item) => (
                    <div
                      key={item.lesson.id}
                      className="py-2.5 sm:py-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/60 px-1 sm:px-2 rounded-lg transition-colors"
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                            {item.lesson.title}
                          </h4>
                          <p className="text-[11px] sm:text-xs text-slate-500 truncate">
                            {item.course.title} • {item.moduleTitle}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectLesson(item.lesson, item.moduleTitle, item.course)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-white hover:border-slate-300 transition-all shrink-0 cursor-pointer shadow-2xs"
                      >
                        <span>Review</span>
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Not Logged In View */
          <div
            id="profile-logged-out-card"
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 sm:p-12 text-center max-w-xl mx-auto"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center mx-auto mb-4 sm:mb-5 shadow-2xs">
              <UserIcon className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
              Sign In to Your Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 sm:mb-6">
              Create a free account or log in with your email and password to securely save your completed lessons, track course progress, and sync across any device.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
              <button
                id="profile-login-button"
                type="button"
                onClick={() => onOpenAuth('login')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-2xs cursor-pointer"
              >
                Log In
              </button>
              <button
                id="profile-signup-button"
                type="button"
                onClick={() => onOpenAuth('signup')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-all cursor-pointer"
              >
                Create Free Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
