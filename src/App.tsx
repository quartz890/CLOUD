import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Home as HomeIcon, BookOpen, LayoutDashboard, User as UserIcon, Layers } from 'lucide-react';
import { COURSES } from './data/courses';
import { Course, Lesson } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CourseSection } from './components/CourseSection';
import { CourseModal } from './components/CourseModal';
import { LearnPage } from './components/LearnPage';
import { CourseOverviewPage } from './components/CourseOverviewPage';
import { LessonPage } from './components/LessonPage';
import { DashboardPage } from './components/DashboardPage';
import { AuthModal } from './components/AuthModal';
import { StoredQuizState } from './components/LessonQuiz';
import { NoticeModal } from './components/NoticeModal';
import { Footer } from './components/Footer';
import { AuthProvider, useAuth } from './lib/AuthContext';
import {
  saveLessonCompletion,
  saveCourseCompletion,
  unlockAchievement,
  recordDailyActivity,
  calculateStreak,
  subscribeToCompletedLessons,
  subscribeToCompletedCourses,
  subscribeToAchievements,
  getLocalCompletedLessons,
  getLocalCompletedCourses,
  getLocalAchievements,
  getLocalActivityDates,
} from './lib/progressService';

function AppContent() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<'home' | 'learn' | 'course-overview' | 'lesson' | 'profile'>('home');
  const [activeNav, setActiveNav] = useState<string>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [modalCourse, setModalCourse] = useState<Course | null>(null);
  const [quizHistoryByLesson, setQuizHistoryByLesson] = useState<Record<string, StoredQuizState>>({});
  
  // Progress & Achievement states
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});
  const [completedCourses, setCompletedCourses] = useState<Record<string, boolean>>({});
  const [achievements, setAchievements] = useState<Record<string, { unlocked: boolean; unlockedAt: string }>>({});
  const [activityDates, setActivityDates] = useState<string[]>([]);

  // Loading & Sync states
  const [isSyncingData, setIsSyncingData] = useState<boolean>(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [retryTrigger, setRetryTrigger] = useState<number>(0);

  // Auth modal state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  const [notice, setNotice] = useState<{ isOpen: boolean; title: string; message: string }>({
    isOpen: false,
    title: '',
    message: '',
  });

  // Evaluate Course Completion and Achievements
  const evaluateProgressAndAchievements = useCallback(
    async (
      uid: string,
      lessonsMap: Record<string, boolean>,
      coursesMap: Record<string, boolean>,
      dates: string[]
    ) => {
      const completedLessonCount = Object.keys(lessonsMap).filter((k) => lessonsMap[k]).length;

      // 1. Check Course Completions
      const newlyCompletedCourseIds: string[] = [];
      COURSES.forEach((course) => {
        let allLessonsInCourseDone = true;
        let lessonCountInCourse = 0;
        course.modules.forEach((mod) => {
          mod.lessons.forEach((l) => {
            lessonCountInCourse++;
            if (!lessonsMap[l.id]) {
              allLessonsInCourseDone = false;
            }
          });
        });

        if (lessonCountInCourse > 0 && allLessonsInCourseDone) {
          if (!coursesMap[course.id]) {
            newlyCompletedCourseIds.push(course.id);
          }
        }
      });

      // Save any newly completed courses
      if (newlyCompletedCourseIds.length > 0) {
        for (const courseId of newlyCompletedCourseIds) {
          await saveCourseCompletion(uid, courseId);
        }
      }

      // 2. Check and unlock achievements
      // First Lesson (1 lesson completed)
      if (completedLessonCount >= 1) {
        await unlockAchievement(uid, 'first-lesson');
      }

      // First Quiz (in this app, passing a lesson quiz completes the lesson)
      if (completedLessonCount >= 1) {
        await unlockAchievement(uid, 'first-quiz');
      }

      // First Course (at least 1 course completed)
      const totalCoursesDone = Object.keys(coursesMap).filter((k) => coursesMap[k]).length + newlyCompletedCourseIds.length;
      if (totalCoursesDone >= 1) {
        await unlockAchievement(uid, 'first-course');
      }

      // 10 Lessons (at least 10 lessons completed)
      if (completedLessonCount >= 10) {
        await unlockAchievement(uid, 'ten-lessons');
      }

      // 7 Day Streak (7 consecutive active days)
      const streak = calculateStreak(dates);
      if (streak >= 7) {
        await unlockAchievement(uid, 'seven-day-streak');
      }
    },
    []
  );

  // Subscribe to user's saved data in Firebase Firestore
  useEffect(() => {
    let isMounted = true;

    if (user) {
      setIsSyncingData(true);
      setSyncError(null);

      // Populate immediately with cached local data
      const localLessons = getLocalCompletedLessons(user.uid);
      const localCourses = getLocalCompletedCourses(user.uid);
      const localAch = getLocalAchievements(user.uid);
      const localDates = getLocalActivityDates(user.uid);

      setCompletedLessons(localLessons);
      setCompletedCourses(localCourses);
      setAchievements(localAch);
      setActivityDates(localDates);

      // Record daily activity for streak
      recordDailyActivity(user.uid)
        .then((dates) => {
          if (isMounted) {
            setActivityDates(dates);
          }
        })
        .catch((err) => {
          console.warn('Daily activity record warning:', err);
        });

      // Safety timeout: ensure loading state turns off within 2 seconds so the UI never hangs
      const timeoutId = setTimeout(() => {
        if (isMounted) {
          setIsSyncingData(false);
        }
      }, 2000);

      const unsubLessons = subscribeToCompletedLessons(user.uid, (data) => {
        if (isMounted) {
          setCompletedLessons(data);
          setIsSyncingData(false);
        }
      });

      const unsubCourses = subscribeToCompletedCourses(user.uid, (data) => {
        if (isMounted) {
          setCompletedCourses(data);
        }
      });

      const unsubAchievements = subscribeToAchievements(user.uid, (data) => {
        if (isMounted) {
          setAchievements(data);
        }
      });

      return () => {
        isMounted = false;
        clearTimeout(timeoutId);
        unsubLessons();
        unsubCourses();
        unsubAchievements();
      };
    } else {
      setIsSyncingData(false);
      setSyncError(null);
      // Load guest/local state if available or clear on clean state
      const localLessons = getLocalCompletedLessons('guest');
      const localCourses = getLocalCompletedCourses('guest');
      const localAch = getLocalAchievements('guest');
      const localDates = getLocalActivityDates('guest');
      setCompletedLessons(localLessons);
      setCompletedCourses(localCourses);
      setAchievements(localAch);
      setActivityDates(localDates);
    }
  }, [user, retryTrigger]);

  const handleRetrySync = () => {
    setSyncError(null);
    setIsSyncingData(true);
    setRetryTrigger((prev) => prev + 1);
  };

  // Run progress & achievement check whenever completedLessons, completedCourses, or activityDates change
  useEffect(() => {
    const targetUid = user?.uid || 'guest';
    evaluateProgressAndAchievements(targetUid, completedLessons, completedCourses, activityDates);
  }, [user, completedLessons, completedCourses, activityDates, evaluateProgressAndAchievements]);

  const handleNavigateHome = () => {
    setCurrentView('home');
    setActiveNav('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLearn = () => {
    setCurrentView('learn');
    setActiveNav('learn');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProfile = () => {
    setCurrentView('profile');
    setActiveNav('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleStartCourse = (course: Course) => {
    setSelectedCourse(course);
    setModalCourse(null);
    setCurrentView('course-overview');
    setActiveNav('learn');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartLearning = () => {
    handleOpenLearn();
  };

  const handleStartLesson = (lesson: Lesson, moduleTitle: string, course: Course) => {
    setSelectedCourse(course);
    setSelectedLesson(lesson);
    setCurrentView('lesson');
    setActiveNav('learn');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreCourses = () => {
    handleOpenLearn();
  };

  const handleShowNotice = (title: string, message: string) => {
    setNotice({
      isOpen: true,
      title,
      message,
    });
  };

  const handleCloseNotice = () => {
    setNotice({
      isOpen: false,
      title: '',
      message: '',
    });
  };

  const handleSelectCourseBySlug = (slug: string) => {
    const course = COURSES.find((c) => c.slug === slug);
    if (course) {
      handleStartCourse(course);
    }
  };

  // Automatically complete lesson when quiz finishes
  const handleCompleteLesson = async (lessonId: string) => {
    const targetUid = user?.uid || 'guest';

    // Immediate optimistic local update
    const updatedLessons = {
      ...completedLessons,
      [lessonId]: true,
    };
    setCompletedLessons(updatedLessons);

    try {
      await saveLessonCompletion(targetUid, lessonId, selectedCourse?.id || '');
      // Evaluate course completion & achievement unlocks immediately
      await evaluateProgressAndAchievements(targetUid, updatedLessons, completedCourses, activityDates);
    } catch (err) {
      console.error('Failed to save completed lesson:', err);
    }
  };

  return (
    <div id="cloud-app-root" className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-sky-100 selection:text-sky-900">
      {currentView === 'home' && (
        <Helmet>
          <title>CLOUD Coding Platform - Master Web Development</title>
          <meta name="description" content="Master web development with CLOUD. We offer courses in HTML, CSS, JavaScript, React, and Python. Join today and start building." />
          <meta name="keywords" content="learn to code, web development, HTML course, CSS course, JavaScript course, React tutorial, learn Python" />
          <meta property="og:title" content="CLOUD Coding Platform - Master Web Development" />
          <meta property="og:description" content="Master web development with CLOUD. We offer courses in HTML, CSS, JavaScript, React, and Python." />
          <meta name="twitter:title" content="CLOUD Coding Platform - Master Web Development" />
          <meta name="twitter:description" content="Master web development with CLOUD. We offer courses in HTML, CSS, JavaScript, React, and Python." />
          <link rel="canonical" href="https://ais-dev-wxpc3j32im2tzkdtnkbetd-449991474091.europe-west2.run.app/" />
        </Helmet>
      )}

      {/* Navigation */}
      <Navbar
        onStartLearning={handleStartLearning}
        onOpenLearn={handleOpenLearn}
        onOpenProfile={handleOpenProfile}
        onOpenAuth={handleOpenAuth}
        onNavigateHome={handleNavigateHome}
        onNotice={handleShowNotice}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />

      {/* Main Content Area */}
      <main id="cloud-main-content" className="flex-1 pb-16 md:pb-0">
        {currentView === 'home' && (
          <>
            {/* Hero Section */}
            <Hero
              onStartLearning={handleStartLearning}
              onExploreCourses={handleExploreCourses}
            />

            {/* Courses Section with 5 Core Courses */}
            <CourseSection
              courses={COURSES}
              onSelectCourse={(course) => setModalCourse(course)}
            />
          </>
        )}

        {currentView === 'learn' && (
          <LearnPage
            courses={COURSES}
            completedLessons={completedLessons}
            onStartCourse={handleStartCourse}
            onNavigateHome={handleNavigateHome}
          />
        )}

        {currentView === 'profile' && (
          <DashboardPage
            courses={COURSES}
            completedLessons={completedLessons}
            completedCourses={completedCourses}
            achievements={achievements}
            activityDates={activityDates}
            isSyncingData={isSyncingData}
            syncError={syncError}
            onRetrySync={handleRetrySync}
            onOpenAuth={handleOpenAuth}
            onNavigateHome={handleNavigateHome}
            onNavigateLearn={handleOpenLearn}
            onSelectLesson={handleStartLesson}
            onStartCourse={handleStartCourse}
          />
        )}

        {currentView === 'course-overview' && selectedCourse && (
          <CourseOverviewPage
            course={selectedCourse}
            courses={COURSES}
            completedLessons={completedLessons}
            onBackToLearn={handleOpenLearn}
            onNavigateHome={handleNavigateHome}
            onSelectCourse={handleStartCourse}
            onStartLesson={handleStartLesson}
          />
        )}

        {currentView === 'lesson' && selectedCourse && selectedLesson && (
          <LessonPage
            course={selectedCourse}
            currentLesson={selectedLesson}
            quizHistoryByLesson={quizHistoryByLesson}
            completedLessons={completedLessons}
            onCompleteLesson={handleCompleteLesson}
            onToggleCompleteLesson={handleCompleteLesson}
            onSaveQuizState={(lessonId, state) => {
              setQuizHistoryByLesson((prev) => ({
                ...prev,
                [lessonId]: state,
              }));
            }}
            onSelectLesson={(lesson) => {
              setSelectedLesson(lesson);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackToCourse={() => {
              setCurrentView('course-overview');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackToLearn={handleOpenLearn}
            onNavigateHome={handleNavigateHome}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectNav={(section) => {
          if (section === 'home') {
            handleNavigateHome();
          } else if (section === 'learn') {
            handleOpenLearn();
          } else if (section === 'progress' || section === 'profile') {
            handleOpenProfile();
          }
        }}
        onSelectCourseBySlug={handleSelectCourseBySlug}
      />

      {/* Mobile Fixed Bottom Navigation Bar for one-handed reachability */}
      <nav
        id="mobile-bottom-navigation-bar"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] pb-safe transition-all"
        aria-label="Mobile Navigation"
      >
        <div className="grid grid-cols-4 h-14 max-w-md mx-auto items-center px-1">
          {/* Home Tab */}
          <button
            id="mobile-bottom-tab-home"
            type="button"
            onClick={handleNavigateHome}
            className={`flex flex-col items-center justify-center h-full w-full py-1 text-center transition-colors cursor-pointer ${
              currentView === 'home'
                ? 'text-sky-600 font-bold'
                : 'text-slate-500 hover:text-slate-900 font-medium'
            }`}
          >
            <HomeIcon className={`w-4 h-4 ${currentView === 'home' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] mt-1 tracking-tight">Home</span>
          </button>

          {/* Learn Tab */}
          <button
            id="mobile-bottom-tab-learn"
            type="button"
            onClick={handleOpenLearn}
            className={`flex flex-col items-center justify-center h-full w-full py-1 text-center transition-colors cursor-pointer ${
              currentView === 'learn' || currentView === 'course-overview'
                ? 'text-sky-600 font-bold'
                : 'text-slate-500 hover:text-slate-900 font-medium'
            }`}
          >
            <BookOpen className={`w-4 h-4 ${currentView === 'learn' || currentView === 'course-overview' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] mt-1 tracking-tight">Courses</span>
          </button>

          {/* Current Lesson / Quick Learning Context (or active course) */}
          <button
            id="mobile-bottom-tab-lesson"
            type="button"
            onClick={() => {
              if (selectedCourse && selectedLesson) {
                setCurrentView('lesson');
                setActiveNav('learn');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else if (selectedCourse) {
                setCurrentView('course-overview');
                setActiveNav('learn');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                handleOpenLearn();
              }
            }}
            className={`flex flex-col items-center justify-center h-full w-full py-1 text-center transition-colors cursor-pointer ${
              currentView === 'lesson'
                ? 'text-sky-600 font-bold'
                : 'text-slate-500 hover:text-slate-900 font-medium'
            }`}
          >
            <Layers className={`w-4 h-4 ${currentView === 'lesson' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] mt-1 tracking-tight">
              {currentView === 'lesson' ? 'Lesson' : 'Syllabus'}
            </span>
          </button>

          {/* Dashboard / Profile Tab */}
          <button
            id="mobile-bottom-tab-profile"
            type="button"
            onClick={handleOpenProfile}
            className={`flex flex-col items-center justify-center h-full w-full py-1 text-center transition-colors cursor-pointer ${
              currentView === 'profile'
                ? 'text-sky-600 font-bold'
                : 'text-slate-500 hover:text-slate-900 font-medium'
            }`}
          >
            <LayoutDashboard className={`w-4 h-4 ${currentView === 'profile' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] mt-1 tracking-tight">Dashboard</span>
          </button>
        </div>
      </nav>

      {/* Interactive Course Detail Modal for Home view */}
      <CourseModal
        course={modalCourse}
        onClose={() => setModalCourse(null)}
        onStartCourse={handleStartCourse}
      />

      {/* Firebase Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />

      {/* Friendly Notice Modal */}
      <NoticeModal
        isOpen={notice.isOpen}
        title={notice.title}
        message={notice.message}
        onClose={handleCloseNotice}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
