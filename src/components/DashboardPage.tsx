import React, { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { Course, Lesson } from '../types';
import { CourseIcon } from './CourseIcon';
import { ACHIEVEMENTS } from '../data/achievements';
import { calculateStreak } from '../lib/progressService';
import {
  User as UserIcon,
  LogOut,
  Mail,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  PlayCircle,
  Clock,
  Pencil,
  Check,
  X,
  Loader2,
  Award,
  Trophy,
  Target,
  Flame,
  Lock,
  Sparkles,
  RefreshCw,
  AlertCircle,
  Compass,
  CheckCircle,
} from 'lucide-react';

interface DashboardPageProps {
  courses: Course[];
  completedLessons: Record<string, boolean>;
  completedCourses?: Record<string, boolean>;
  achievements?: Record<string, { unlocked: boolean; unlockedAt: string }>;
  activityDates?: string[];
  isSyncingData?: boolean;
  syncError?: string | null;
  onRetrySync?: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onNavigateHome: () => void;
  onNavigateLearn: () => void;
  onSelectLesson: (lesson: Lesson, moduleTitle: string, course: Course) => void;
  onStartCourse: (course: Course) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  courses,
  completedLessons,
  completedCourses = {},
  achievements = {},
  activityDates = [],
  isSyncingData = false,
  syncError = null,
  onRetrySync,
  onOpenAuth,
  onNavigateHome,
  onNavigateLearn,
  onSelectLesson,
  onStartCourse,
}) => {
  const { user, displayName, updateUserDisplayName, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  // Profile editing state
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [isSavingName, setIsSavingName] = useState(false);
  const [nameSaveError, setNameSaveError] = useState<string | null>(null);
  const [nameSaveSuccess, setNameSaveSuccess] = useState(false);

  const startEditingName = () => {
    setNameInput(displayName || '');
    setNameSaveError(null);
    setNameSaveSuccess(false);
    setIsEditingName(true);
  };

  const cancelEditingName = () => {
    setIsEditingName(false);
    setNameSaveError(null);
  };

  const handleSaveName = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (!trimmed) {
      setNameSaveError('Please enter a valid display name.');
      return;
    }
    if (trimmed.length > 50) {
      setNameSaveError('Display name cannot exceed 50 characters.');
      return;
    }

    setIsSavingName(true);
    setNameSaveError(null);
    try {
      await updateUserDisplayName(trimmed);
      setIsSavingName(false);
      setIsEditingName(false);
      setNameSaveSuccess(true);
      setTimeout(() => {
        setNameSaveSuccess(false);
      }, 3500);
    } catch (err: unknown) {
      setIsSavingName(false);
      const errMsg = err instanceof Error ? err.message : 'Failed to update display name. Please try again.';
      setNameSaveError(errMsg);
    }
  };

  const handleManualRetry = () => {
    if (onRetrySync) {
      setIsRetrying(true);
      onRetrySync();
      setTimeout(() => setIsRetrying(false), 1200);
    }
  };

  // Flatten all lessons across all courses with metadata
  interface LessonMeta {
    course: Course;
    moduleTitle: string;
    lesson: Lesson;
    isCompleted: boolean;
  }

  const allCourseLessons: LessonMeta[] = [];
  courses.forEach((c) => {
    c.modules.forEach((m) => {
      m.lessons.forEach((l) => {
        allCourseLessons.push({
          course: c,
          moduleTitle: m.title,
          lesson: l,
          isCompleted: Boolean(completedLessons[l.id]),
        });
      });
    });
  });

  const totalLessonsCount = allCourseLessons.length;
  const completedLessonsList = allCourseLessons.filter((item) => item.isCompleted);
  const totalCompletedLessons = completedLessonsList.length;
  const overallPercentage = totalLessonsCount > 0
    ? Math.round((totalCompletedLessons / totalLessonsCount) * 100)
    : 0;

  // Calculate course-level progress
  interface CourseProgressInfo {
    course: Course;
    totalLessons: number;
    completedLessons: number;
    percentage: number;
    firstIncompleteLesson: { lesson: Lesson; moduleTitle: string } | null;
    isFullyCompleted: boolean;
  }

  const courseProgressList: CourseProgressInfo[] = courses.map((course) => {
    let courseTotal = 0;
    let courseCompleted = 0;
    let firstIncomplete: { lesson: Lesson; moduleTitle: string } | null = null;

    course.modules.forEach((module) => {
      module.lessons.forEach((lesson) => {
        courseTotal += 1;
        if (completedLessons[lesson.id]) {
          courseCompleted += 1;
        } else if (!firstIncomplete) {
          firstIncomplete = { lesson, moduleTitle: module.title };
        }
      });
    });

    const isDone = courseTotal > 0 && courseCompleted === courseTotal;
    const isCompletedFromDb = Boolean(completedCourses[course.id]);
    const isFullyCompleted = isDone || isCompletedFromDb;
    const percentage = courseTotal > 0 ? Math.round((courseCompleted / courseTotal) * 100) : 0;

    return {
      course,
      totalLessons: courseTotal,
      completedLessons: courseCompleted,
      percentage,
      firstIncompleteLesson: firstIncomplete,
      isFullyCompleted,
    };
  });

  const fullyCompletedCourses = courseProgressList.filter((cp) => cp.isFullyCompleted);
  const totalCompletedCoursesCount = fullyCompletedCourses.length;
  const currentStreak = calculateStreak(activityDates);

  // Determine current course & next incomplete lesson for "Continue Learning"
  let activeCourseProgress = courseProgressList.find(
    (cp) => cp.completedLessons > 0 && !cp.isFullyCompleted
  );

  if (!activeCourseProgress) {
    activeCourseProgress = courseProgressList.find((cp) => !cp.isFullyCompleted) || courseProgressList[0];
  }

  const currentCourse = activeCourseProgress?.course || courses[0];
  const nextIncomplete = activeCourseProgress?.firstIncompleteLesson || {
    lesson: currentCourse?.modules[0]?.lessons[0],
    moduleTitle: currentCourse?.modules[0]?.title || 'Introduction',
  };

  // Handler for prominent "Continue Learning" action
  const handleContinueLearning = () => {
    if (nextIncomplete && nextIncomplete.lesson && currentCourse) {
      onSelectLesson(nextIncomplete.lesson, nextIncomplete.moduleTitle, currentCourse);
    } else if (courses.length > 0 && courses[0].modules[0]?.lessons[0]) {
      // Fallback: first lesson of first course
      onSelectLesson(courses[0].modules[0].lessons[0], courses[0].modules[0].title, courses[0]);
    }
  };

  // Handler for starting first course (HTML) directly from empty state
  const handleStartFirstCourse = () => {
    const htmlCourse = courses.find((c) => c.slug === 'html') || courses[0];
    if (htmlCourse && htmlCourse.modules[0]?.lessons[0]) {
      onSelectLesson(htmlCourse.modules[0].lessons[0], htmlCourse.modules[0].title, htmlCourse);
    } else if (htmlCourse) {
      onStartCourse(htmlCourse);
    }
  };

  // Handler for continuing a specific course
  const handleCourseAction = (cp: CourseProgressInfo) => {
    if (cp.firstIncompleteLesson) {
      onSelectLesson(
        cp.firstIncompleteLesson.lesson,
        cp.firstIncompleteLesson.moduleTitle,
        cp.course
      );
    } else if (cp.course.modules[0]?.lessons[0]) {
      onSelectLesson(
        cp.course.modules[0].lessons[0],
        cp.course.modules[0].title,
        cp.course
      );
    }
  };

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

  const renderAchievementIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'book-open':
        return <BookOpen className={className} />;
      case 'target':
        return <Target className={className} />;
      case 'trophy':
        return <Trophy className={className} />;
      case 'award':
        return <Award className={className} />;
      case 'flame':
        return <Flame className={className} />;
      default:
        return <Award className={className} />;
    }
  };

  const formatUnlockDate = (dateStr?: string) => {
    if (!dateStr) return 'Unlocked';
    try {
      const d = new Date(dateStr);
      return `Unlocked ${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } catch {
      return 'Unlocked';
    }
  };

  return (
    <div id="dashboard-page-root" className="min-h-[85vh] py-8 sm:py-12 bg-slate-50/70">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Breadcrumb Navigation */}
        <nav className="flex items-center justify-between gap-2 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-2">
            <button
              id="dashboard-breadcrumb-home"
              type="button"
              onClick={onNavigateHome}
              className="hover:text-slate-900 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded px-1"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-slate-900 font-semibold">User Dashboard & Profile</span>
          </div>

          <button
            type="button"
            onClick={onNavigateLearn}
            className="text-sky-600 hover:text-sky-700 font-semibold inline-flex items-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded px-1.5 py-0.5 transition-colors"
          >
            <span>Browse All Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </nav>

        {/* Sync Error Banner with Retry Button */}
        {syncError && (
          <div
            id="dashboard-sync-error-banner"
            className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900 shadow-xs animate-in fade-in duration-200"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-amber-950">
                  Cloud Connection Warning
                </h4>
                <p className="text-xs text-amber-800 mt-0.5">
                  {syncError || 'Unable to connect to Firebase Firestore. Working in local cached mode.'}
                </p>
              </div>
            </div>

            {onRetrySync && (
              <button
                type="button"
                onClick={handleManualRetry}
                disabled={isRetrying}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 transition-all cursor-pointer shrink-0 disabled:opacity-50 active:scale-[0.98]"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRetrying ? 'animate-spin' : ''}`} />
                <span>{isRetrying ? 'Retrying...' : 'Retry Sync'}</span>
              </button>
            )}
          </div>
        )}

        {user ? (
          /* ========================================================================= */
          /* LOGGED IN USER DASHBOARD                                                  */
          /* ========================================================================= */
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Header / Welcome Banner Card */}
            <div
              id="dashboard-welcome-banner"
              className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-sky-600 text-white flex items-center justify-center font-bold text-2xl shadow-md shadow-sky-500/20 shrink-0">
                    {displayName ? displayName.charAt(0).toUpperCase() : <UserIcon className="w-8 h-8" />}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h1
                        id="dashboard-welcome-heading"
                        className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
                      >
                        Welcome back, {displayName}!
                      </h1>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Authenticated
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        {user.email}
                      </span>
                      <span>•</span>
                      {isSyncingData ? (
                        <span className="inline-flex items-center gap-1 text-sky-600 font-medium">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>Syncing with Firestore...</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          <span>Cloud Firestore Synced</span>
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Header Actions */}
                <div className="flex items-center gap-2.5 self-start sm:self-auto">
                  {!isEditingName && (
                    <button
                      id="dashboard-edit-profile-btn"
                      type="button"
                      onClick={startEditingName}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-[0.98]"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Edit Name</span>
                    </button>
                  )}

                  <button
                    id="dashboard-logout-button"
                    type="button"
                    disabled={isLoggingOut}
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 disabled:opacity-50 active:scale-[0.98]"
                  >
                    {isLoggingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
                    <span>{isLoggingOut ? 'Logging out...' : 'Log Out'}</span>
                  </button>
                </div>
              </div>

              {/* Edit Display Name Inline Form */}
              {isEditingName && (
                <div className="mt-6 pt-6 border-t border-slate-100 animate-in fade-in duration-200">
                  <form onSubmit={handleSaveName} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1 max-w-md">
                        <label htmlFor="dashboard-display-name-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Display Name
                        </label>
                        <input
                          id="dashboard-display-name-input"
                          type="text"
                          value={nameInput}
                          onChange={(e) => setNameInput(e.target.value)}
                          placeholder="Enter your name (e.g. Alex Chen)"
                          maxLength={50}
                          autoFocus
                          disabled={isSavingName}
                          className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                        />
                        {nameSaveError && (
                          <p className="text-xs text-rose-600 mt-1.5 font-medium">{nameSaveError}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-end">
                        <button
                          type="button"
                          disabled={isSavingName}
                          onClick={cancelEditingName}
                          className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/80 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                        >
                          <X className="w-3.5 h-3.5 inline mr-1" />
                          Cancel
                        </button>
                        <button
                          id="dashboard-save-name-btn"
                          type="submit"
                          disabled={isSavingName}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 transition-colors cursor-pointer shadow-xs disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-[0.98]"
                        >
                          {isSavingName ? (
                            <>
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Saving...</span>
                            </>
                          ) : (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Save Name</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Name save success badge */}
              {nameSaveSuccess && (
                <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Display name saved to Firebase and updated everywhere!</span>
                </div>
              )}

              {/* Learning Progress Summary Counters */}
              <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Completed Lessons
                  </span>
                  <div className="flex items-baseline gap-2 mt-1.5">
                    <span id="dashboard-total-completed-count" className="text-3xl font-extrabold text-slate-900">
                      {totalCompletedLessons}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      / {totalLessonsCount} lessons
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Overall Progress
                  </span>
                  <div className="flex items-baseline gap-2 mt-1.5">
                    <span id="dashboard-overall-percentage" className="text-3xl font-extrabold text-sky-600">
                      {overallPercentage}%
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      curriculum
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                    <div
                      className="bg-sky-500 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${overallPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Completed Tracks
                  </span>
                  <div className="flex items-baseline gap-2 mt-1.5">
                    <span id="dashboard-completed-courses-count" className="text-3xl font-extrabold text-emerald-600">
                      {totalCompletedCoursesCount}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      / {courses.length} courses
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    {totalCompletedCoursesCount > 0
                      ? `${totalCompletedCoursesCount} finished`
                      : 'Complete all lessons to finish'}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                    <span>Active Streak</span>
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                  </span>
                  <div className="flex items-baseline gap-2 mt-1.5">
                    <span id="dashboard-streak-count" className="text-3xl font-extrabold text-amber-500">
                      {currentStreak}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      {currentStreak === 1 ? 'day active' : 'days streak'}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    {currentStreak >= 7 ? '7-Day Streak Achieved!' : `${7 - currentStreak} days to 7-Day Streak`}
                  </span>
                </div>
              </div>
            </div>

            {/* "Continue Learning" Prominent Card */}
            <div
              id="dashboard-continue-learning-card"
              className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl shadow-md p-6 sm:p-8 relative overflow-hidden"
            >
              {/* Background Accent glow */}
              <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-semibold">
                    <PlayCircle className="w-3.5 h-3.5" />
                    <span>{totalCompletedLessons === 0 ? 'Ready to Start' : 'Continue Learning'}</span>
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                      {currentCourse.title} • {nextIncomplete?.moduleTitle}
                    </span>
                    <h2
                      id="dashboard-continue-lesson-title"
                      className="text-xl sm:text-2xl font-bold text-white tracking-tight"
                    >
                      {nextIncomplete?.lesson?.title || 'Start Lesson 1'}
                    </h2>
                    {nextIncomplete?.lesson?.description && (
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-2">
                        {nextIncomplete.lesson.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {nextIncomplete?.lesson?.duration || '15 mins'}
                    </span>
                    <span>•</span>
                    <span>
                      Course progress: {activeCourseProgress?.percentage || 0}% ({activeCourseProgress?.completedLessons || 0}/{activeCourseProgress?.totalLessons || 12} lessons)
                    </span>
                  </div>
                </div>

                {/* Primary Continue Learning Action Button */}
                <div className="shrink-0">
                  <button
                    id="dashboard-continue-learning-btn"
                    type="button"
                    onClick={handleContinueLearning}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                  >
                    <span>{totalCompletedLessons === 0 ? 'Start First Lesson' : 'Continue Learning'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* BASIC ACHIEVEMENTS SHOWCASE */}
            <div
              id="dashboard-achievements-section"
              className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      Achievements
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Unlock badges by completing lessons, passing quizzes, mastering courses, and maintaining streaks.
                  </p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span
                    id="dashboard-achievements-count"
                    className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200"
                  >
                    {Object.values(achievements).filter((a: { unlocked: boolean; unlockedAt: string }) => a?.unlocked).length} / {ACHIEVEMENTS.length} Unlocked
                  </span>
                </div>
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ACHIEVEMENTS.map((ach) => {
                  const record = achievements[ach.id];
                  const isUnlocked = Boolean(record?.unlocked);

                  // Calculate progress for locked achievements
                  let progressLabel = '';
                  let progressFraction = 0;

                  if (ach.id === 'first-lesson') {
                    progressFraction = Math.min(totalCompletedLessons, 1) / 1;
                    progressLabel = `${Math.min(totalCompletedLessons, 1)} / 1 lesson`;
                  } else if (ach.id === 'first-quiz') {
                    progressFraction = Math.min(totalCompletedLessons, 1) / 1;
                    progressLabel = `${Math.min(totalCompletedLessons, 1)} / 1 quiz`;
                  } else if (ach.id === 'first-course') {
                    progressFraction = Math.min(totalCompletedCoursesCount, 1) / 1;
                    progressLabel = `${Math.min(totalCompletedCoursesCount, 1)} / 1 course`;
                  } else if (ach.id === 'ten-lessons') {
                    progressFraction = Math.min(totalCompletedLessons, 10) / 10;
                    progressLabel = `${Math.min(totalCompletedLessons, 10)} / 10 lessons`;
                  } else if (ach.id === 'seven-day-streak') {
                    progressFraction = Math.min(currentStreak, 7) / 7;
                    progressLabel = `${Math.min(currentStreak, 7)} / 7 consecutive days`;
                  }

                  return (
                    <div
                      key={ach.id}
                      id={`achievement-card-${ach.id}`}
                      className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                        isUnlocked
                          ? 'bg-gradient-to-br from-amber-50/50 via-white to-sky-50/30 border-amber-200 shadow-2xs'
                          : 'bg-slate-50/60 border-slate-200/80 opacity-85'
                      }`}
                    >
                      <div>
                        {/* Header: Icon & Category/Status Badge */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                              isUnlocked
                                ? 'bg-amber-100 text-amber-700 border border-amber-300'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            {renderAchievementIcon(ach.iconName, 'w-5 h-5')}
                          </div>

                          {isUnlocked ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span>Unlocked</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-600">
                              <Lock className="w-3 h-3 text-slate-400" />
                              <span>Locked</span>
                            </span>
                          )}
                        </div>

                        {/* Title & Description */}
                        <h3 className={`text-sm font-bold ${isUnlocked ? 'text-slate-900' : 'text-slate-700'}`}>
                          {ach.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          {ach.description}
                        </p>
                      </div>

                      {/* Footer: Date or Progress Bar */}
                      <div className="mt-4 pt-3 border-t border-slate-100 text-[11px]">
                        {isUnlocked ? (
                          <div className="flex items-center justify-between text-emerald-700 font-medium">
                            <span className="flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-amber-500" />
                              <span>{formatUnlockDate(record?.unlockedAt)}</span>
                            </span>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-slate-500">
                              <span>Progress:</span>
                              <span className="font-semibold text-slate-700">{progressLabel}</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-amber-500 h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${Math.round(progressFraction * 100)}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* COMPLETED COURSES SHOWCASE (If user completed any course) */}
            {fullyCompletedCourses.length > 0 && (
              <div
                id="dashboard-completed-courses-showcase"
                className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-2xl border border-emerald-200 p-6 sm:p-8 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-emerald-950">
                      Completed Courses Showcase
                    </h2>
                    <p className="text-xs text-emerald-800">
                      Congratulations! You have completed all lessons and knowledge checks in the following tracks:
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {fullyCompletedCourses.map((cp) => (
                    <div
                      key={cp.course.id}
                      className="p-4 rounded-xl bg-white/90 border border-emerald-200 flex items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <CourseIcon iconName={cp.course.iconName} className="w-6 h-6 shrink-0" />
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-slate-900 truncate">
                            {cp.course.title}
                          </h4>
                          <span className="text-[11px] text-emerald-700 font-medium">
                            All {cp.totalLessons} lessons finished • 100%
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onStartCourse(cp.course)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 transition-colors shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-[0.98]"
                      >
                        Review
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* List of User's Courses with Progress */}
            <div
              id="dashboard-courses-list-section"
              className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    Your Courses & Curriculum Progress
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Track your completion across all 5 core tracks in the CLOUD Foundation.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200 self-start sm:self-auto">
                  5 Courses Enrolled
                </span>
              </div>

              {/* Courses Grid / List */}
              <div className="grid grid-cols-1 gap-4">
                {courseProgressList.map((cp) => {
                  const { course, totalLessons, completedLessons: cCompleted, percentage, isFullyCompleted } = cp;
                  return (
                    <div
                      key={course.id}
                      id={`dashboard-course-card-${course.slug}`}
                      className="p-5 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all bg-white flex flex-col md:flex-row md:items-center justify-between gap-5"
                    >
                      {/* Left: Icon & Course Info */}
                      <div className="flex items-start gap-4 min-w-0 flex-1">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0">
                          <CourseIcon iconName={course.iconName} className="w-6 h-6" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="text-base font-bold text-slate-900 truncate">
                              {course.title}
                            </h3>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                              {course.difficulty}
                            </span>
                            {isFullyCompleted && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                Course Completed
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-1 mb-3">
                            {course.shortDescription}
                          </p>

                          {/* Linear Progress Bar & Lesson Count */}
                          <div className="space-y-1.5 max-w-md">
                            <div className="flex items-center justify-between text-xs font-semibold">
                              <span className="text-slate-600">
                                {cCompleted} of {totalLessons} lessons completed
                              </span>
                              <span className={isFullyCompleted ? 'text-emerald-600 font-bold' : 'text-sky-600'}>
                                {percentage}%
                              </span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                              <div
                                className={`h-2 rounded-full transition-all duration-500 ${
                                  isFullyCompleted ? 'bg-emerald-500' : 'bg-sky-500'
                                }`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
                        <button
                          type="button"
                          onClick={() => onStartCourse(course)}
                          className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 active:scale-[0.98]"
                        >
                          Syllabus
                        </button>

                        <button
                          id={`dashboard-course-action-btn-${course.slug}`}
                          type="button"
                          onClick={() => handleCourseAction(cp)}
                          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-[0.98] ${
                            isFullyCompleted
                              ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : cCompleted > 0
                              ? 'bg-sky-500 hover:bg-sky-600 text-white shadow-sky-500/20'
                              : 'bg-slate-900 hover:bg-slate-800 text-white'
                          }`}
                        >
                          <span>
                            {isFullyCompleted ? 'Review Track' : cCompleted > 0 ? 'Continue' : 'Start Course'}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Completed Lessons Review Section / Rich Empty State */}
            <div
              id="dashboard-completed-lessons-section"
              className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8"
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Completed Lessons Log
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Finished knowledge check quizzes are recorded here for quick review.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800">
                  {totalCompletedLessons} Finished
                </span>
              </div>

              {totalCompletedLessons === 0 ? (
                <div
                  id="dashboard-empty-progress-state"
                  className="py-10 px-6 bg-gradient-to-b from-slate-50/80 to-sky-50/30 rounded-2xl border border-slate-200 text-center space-y-6 animate-in fade-in duration-200"
                >
                  <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-600 border border-sky-200 flex items-center justify-center mx-auto shadow-2xs">
                    <Compass className="w-8 h-8" />
                  </div>

                  <div className="max-w-md mx-auto space-y-2">
                    <h3 className="text-lg font-bold text-slate-900">
                      Your Learning Journey Starts Now
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      You haven't completed any lessons yet. Complete your first lesson and pass its quick quiz to start earning badges and track your progress here!
                    </p>
                  </div>

                  {/* 3 Helpful Steps */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-2xl mx-auto pt-2">
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                      <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider block mb-1">
                        Step 1
                      </span>
                      <h4 className="text-xs font-bold text-slate-900">
                        Read Foundation Lessons
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Clear concepts, code examples, and practical mental models.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                        Step 2
                      </span>
                      <h4 className="text-xs font-bold text-slate-900">
                        Pass Lesson Quizzes
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Immediate feedback and clear explanations on every option.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                      <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block mb-1">
                        Step 3
                      </span>
                      <h4 className="text-xs font-bold text-slate-900">
                        Unlock Badges & Sync
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Earn 5 achievements and sync your streaks with Firestore.
                      </p>
                    </div>
                  </div>

                  {/* Quick Action CTA */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      id="dashboard-empty-start-btn"
                      type="button"
                      onClick={handleStartFirstCourse}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 transition-all shadow-md shadow-sky-500/20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-[0.98]"
                    >
                      <span>Start HTML & Web Fundamentals</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={onNavigateLearn}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 active:scale-[0.98]"
                    >
                      Browse All 5 Courses
                    </button>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto pr-1">
                  {completedLessonsList.map((item) => (
                    <div
                      key={item.lesson.id}
                      className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50/60 px-2 rounded-lg transition-colors"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-slate-900 truncate">
                            {item.lesson.title}
                          </h4>
                          <p className="text-xs text-slate-500 truncate">
                            {item.course.title} • {item.moduleTitle}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectLesson(item.lesson, item.moduleTitle, item.course)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-white hover:border-slate-300 transition-all shrink-0 cursor-pointer shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-[0.98]"
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
          /* ========================================================================= */
          /* NOT LOGGED IN / GUEST DASHBOARD STATE                                     */
          /* ========================================================================= */
          <div
            id="dashboard-guest-card"
            className="bg-white rounded-2xl border border-slate-200 shadow-xs p-8 sm:p-12 text-center max-w-xl mx-auto space-y-5"
          >
            <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center mx-auto shadow-2xs">
              <UserIcon className="w-8 h-8" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
                Access Your Learning Dashboard
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Log in or create a free account to track your progress across all 5 courses, unlock achievements, resume where you left off with one click, and sync your completions to Cloud Firestore.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                id="dashboard-guest-login-button"
                type="button"
                onClick={() => onOpenAuth('login')}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 active:scale-[0.98]"
              >
                Log In
              </button>
              <button
                id="dashboard-guest-signup-button"
                type="button"
                onClick={() => onOpenAuth('signup')}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 active:scale-[0.98]"
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

