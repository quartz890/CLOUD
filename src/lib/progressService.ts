import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { AchievementId, AchievementRecord, CourseCompletionRecord } from '../types';

export interface LessonCompletionRecord {
  id: string;
  userId: string;
  lessonId: string;
  courseId: string;
  completed: boolean;
  completedAt?: string;
}

const STORAGE_LESSONS_PREFIX = 'cloud_foundation_completed_lessons_';
const STORAGE_COURSES_PREFIX = 'cloud_foundation_completed_courses_';
const STORAGE_ACHIEVEMENTS_PREFIX = 'cloud_foundation_achievements_';
const STORAGE_ACTIVITY_PREFIX = 'cloud_foundation_activity_dates_';

/**
 * ============================================================================
 * LOCAL STORAGE HELPERS
 * ============================================================================
 */

export function getLocalCompletedLessons(userId: string): Record<string, boolean> {
  if (!userId) return {};
  try {
    const raw = localStorage.getItem(`${STORAGE_LESSONS_PREFIX}${userId}`);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn('Could not read local completion storage:', err);
  }
  return {};
}

export function setLocalCompletedLessons(userId: string, data: Record<string, boolean>): void {
  if (!userId) return;
  try {
    localStorage.setItem(`${STORAGE_LESSONS_PREFIX}${userId}`, JSON.stringify(data));
  } catch (err) {
    console.warn('Could not save to local completion storage:', err);
  }
}

export function getLocalCompletedCourses(userId: string): Record<string, boolean> {
  if (!userId) return {};
  try {
    const raw = localStorage.getItem(`${STORAGE_COURSES_PREFIX}${userId}`);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn('Could not read local course completions:', err);
  }
  return {};
}

export function setLocalCompletedCourses(userId: string, data: Record<string, boolean>): void {
  if (!userId) return;
  try {
    localStorage.setItem(`${STORAGE_COURSES_PREFIX}${userId}`, JSON.stringify(data));
  } catch (err) {
    console.warn('Could not save local course completions:', err);
  }
}

export function getLocalAchievements(userId: string): Record<string, { unlocked: boolean; unlockedAt: string }> {
  if (!userId) return {};
  try {
    const raw = localStorage.getItem(`${STORAGE_ACHIEVEMENTS_PREFIX}${userId}`);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn('Could not read local achievements:', err);
  }
  return {};
}

export function setLocalAchievements(
  userId: string,
  data: Record<string, { unlocked: boolean; unlockedAt: string }>
): void {
  if (!userId) return;
  try {
    localStorage.setItem(`${STORAGE_ACHIEVEMENTS_PREFIX}${userId}`, JSON.stringify(data));
  } catch (err) {
    console.warn('Could not save local achievements:', err);
  }
}

export function getLocalActivityDates(userId: string): string[] {
  if (!userId) return [];
  try {
    const raw = localStorage.getItem(`${STORAGE_ACTIVITY_PREFIX}${userId}`);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.warn('Could not read local activity dates:', err);
  }
  return [];
}

export function setLocalActivityDates(userId: string, dates: string[]): void {
  if (!userId) return;
  try {
    localStorage.setItem(`${STORAGE_ACTIVITY_PREFIX}${userId}`, JSON.stringify(dates));
  } catch (err) {
    console.warn('Could not save local activity dates:', err);
  }
}

/**
 * ============================================================================
 * STREAK CALCULATION
 * ============================================================================
 */

export function calculateStreak(activityDates: string[]): number {
  if (!activityDates || activityDates.length === 0) return 0;

  // Filter unique valid YYYY-MM-DD strings and sort ascending
  const uniqueDates = Array.from(new Set(activityDates.filter((d) => Boolean(d)))).sort();
  if (uniqueDates.length === 0) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Convert date strings to date objects normalized to midnight
  const dateObjs = uniqueDates.map((dStr) => {
    const [year, month, day] = dStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  });

  const uniqueTimestamps = Array.from(new Set(dateObjs)).sort((a, b) => a - b);
  const oneDayMs = 24 * 60 * 60 * 1000;

  // Check if the user was active today or yesterday to continue streak
  const lastActiveTimestamp = uniqueTimestamps[uniqueTimestamps.length - 1];
  const isRecent =
    lastActiveTimestamp === today.getTime() || lastActiveTimestamp === yesterday.getTime();

  if (!isRecent) {
    // If not active today or yesterday, streak is 0
    return 0;
  }

  // Count backwards consecutive days
  let currentStreak = 1;
  for (let i = uniqueTimestamps.length - 1; i > 0; i--) {
    const current = uniqueTimestamps[i];
    const prev = uniqueTimestamps[i - 1];
    const diffDays = Math.round((current - prev) / oneDayMs);

    if (diffDays === 1) {
      currentStreak += 1;
    } else if (diffDays === 0) {
      continue;
    } else {
      break;
    }
  }

  return currentStreak;
}

/**
 * ============================================================================
 * RECORD DAILY ACTIVITY (For Streak & User Profile)
 * ============================================================================
 */

export async function recordDailyActivity(userId: string): Promise<string[]> {
  if (!userId) return [];

  const todayStr = new Date().toISOString().split('T')[0];
  const localDates = getLocalActivityDates(userId);

  if (!localDates.includes(todayStr)) {
    localDates.push(todayStr);
    setLocalActivityDates(userId, localDates);
  }

  const docPath = `users/${userId}`;
  try {
    const userRef = doc(db, 'users', userId);
    const snap = await getDoc(userRef);
    let remoteDates: string[] = [];
    if (snap.exists()) {
      const data = snap.data();
      if (Array.isArray(data.activityDates)) {
        remoteDates = data.activityDates;
      }
    }

    const combinedDates = Array.from(new Set([...remoteDates, ...localDates, todayStr])).slice(-365);
    setLocalActivityDates(userId, combinedDates);

    await setDoc(
      userRef,
      {
        id: userId,
        lastActiveAt: new Date().toISOString(),
        activityDates: combinedDates,
      },
      { merge: true }
    );

    return combinedDates;
  } catch (error) {
    console.warn('Could not sync daily activity to Firestore (using local):', error);
    handleFirestoreError(error, OperationType.WRITE, docPath, false);
    return localDates;
  }
}

/**
 * ============================================================================
 * LESSON COMPLETIONS
 * ============================================================================
 */

export async function saveLessonCompletion(
  userId: string,
  lessonId: string,
  courseId: string
): Promise<void> {
  if (!userId || !lessonId) return;

  // Optimistic local update
  const localMap = getLocalCompletedLessons(userId);
  localMap[lessonId] = true;
  setLocalCompletedLessons(userId, localMap);

  const docPath = `users/${userId}/completedLessons/${lessonId}`;
  try {
    const docRef = doc(db, 'users', userId, 'completedLessons', lessonId);
    const data: LessonCompletionRecord = {
      id: lessonId,
      userId,
      lessonId,
      courseId: courseId || 'general',
      completed: true,
      completedAt: new Date().toISOString(),
    };
    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    console.warn('Firestore offline/write failed, saved locally:', error);
    handleFirestoreError(error, OperationType.WRITE, docPath, false);
  }
}

export function subscribeToCompletedLessons(
  userId: string,
  onUpdate: (completedMap: Record<string, boolean>) => void
): Unsubscribe {
  if (!userId) {
    onUpdate({});
    return () => {};
  }

  // Load local state first immediately
  const localMap = getLocalCompletedLessons(userId);
  onUpdate(localMap);

  const collectionPath = `users/${userId}/completedLessons`;

  try {
    const q = collection(db, 'users', userId, 'completedLessons');
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const map: Record<string, boolean> = { ...getLocalCompletedLessons(userId) };
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.completed) {
            map[docSnap.id] = true;
          }
        });
        setLocalCompletedLessons(userId, map);
        onUpdate(map);
      },
      (error) => {
        console.warn('Firestore subscription fallback to local cache:', error);
        handleFirestoreError(error, OperationType.GET, collectionPath, false);
      }
    );

    return unsubscribe;
  } catch (err) {
    console.warn('Could not initialize snapshot listener, using local storage:', err);
    return () => {};
  }
}

/**
 * ============================================================================
 * COURSE COMPLETIONS
 * ============================================================================
 */

export async function saveCourseCompletion(userId: string, courseId: string): Promise<void> {
  if (!userId || !courseId) return;

  const localMap = getLocalCompletedCourses(userId);
  localMap[courseId] = true;
  setLocalCompletedCourses(userId, localMap);

  const docPath = `users/${userId}/completedCourses/${courseId}`;
  try {
    const docRef = doc(db, 'users', userId, 'completedCourses', courseId);
    const data: CourseCompletionRecord = {
      id: courseId,
      userId,
      courseId,
      completed: true,
      completedAt: new Date().toISOString(),
    };
    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    console.warn('Could not save course completion to Firestore, saved locally:', error);
    handleFirestoreError(error, OperationType.WRITE, docPath, false);
  }
}

export function subscribeToCompletedCourses(
  userId: string,
  onUpdate: (completedCoursesMap: Record<string, boolean>) => void
): Unsubscribe {
  if (!userId) {
    onUpdate({});
    return () => {};
  }

  const localMap = getLocalCompletedCourses(userId);
  onUpdate(localMap);

  const collectionPath = `users/${userId}/completedCourses`;

  try {
    const q = collection(db, 'users', userId, 'completedCourses');
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const map: Record<string, boolean> = { ...getLocalCompletedCourses(userId) };
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.completed) {
            map[docSnap.id] = true;
          }
        });
        setLocalCompletedCourses(userId, map);
        onUpdate(map);
      },
      (error) => {
        console.warn('Firestore course completions subscription error:', error);
        handleFirestoreError(error, OperationType.GET, collectionPath, false);
      }
    );

    return unsubscribe;
  } catch (err) {
    console.warn('Could not initialize completed courses listener:', err);
    return () => {};
  }
}

/**
 * ============================================================================
 * ACHIEVEMENTS
 * ============================================================================
 */

export async function unlockAchievement(
  userId: string,
  achievementId: AchievementId
): Promise<void> {
  if (!userId || !achievementId) return;

  const localMap = getLocalAchievements(userId);
  // Do not unlock more than once if already unlocked
  if (localMap[achievementId]?.unlocked) {
    return;
  }

  const now = new Date().toISOString();
  localMap[achievementId] = {
    unlocked: true,
    unlockedAt: now,
  };
  setLocalAchievements(userId, localMap);

  const docPath = `users/${userId}/achievements/${achievementId}`;
  try {
    const docRef = doc(db, 'users', userId, 'achievements', achievementId);
    const data: AchievementRecord = {
      id: achievementId,
      userId,
      achievementId,
      unlocked: true,
      unlockedAt: now,
    };
    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    console.warn('Could not save achievement to Firestore, saved locally:', error);
    handleFirestoreError(error, OperationType.WRITE, docPath, false);
  }
}

export function subscribeToAchievements(
  userId: string,
  onUpdate: (achievementsMap: Record<string, { unlocked: boolean; unlockedAt: string }>) => void
): Unsubscribe {
  if (!userId) {
    onUpdate({});
    return () => {};
  }

  const localMap = getLocalAchievements(userId);
  onUpdate(localMap);

  const collectionPath = `users/${userId}/achievements`;

  try {
    const q = collection(db, 'users', userId, 'achievements');
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const map: Record<string, { unlocked: boolean; unlockedAt: string }> = {
          ...getLocalAchievements(userId),
        };
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.unlocked) {
            map[docSnap.id] = {
              unlocked: true,
              unlockedAt: data.unlockedAt || new Date().toISOString(),
            };
          }
        });
        setLocalAchievements(userId, map);
        onUpdate(map);
      },
      (error) => {
        console.warn('Firestore achievements subscription fallback:', error);
        handleFirestoreError(error, OperationType.GET, collectionPath, false);
      }
    );

    return unsubscribe;
  } catch (err) {
    console.warn('Could not initialize achievements listener:', err);
    return () => {};
  }
}

/**
 * ============================================================================
 * ENSURE USER PROFILE
 * ============================================================================
 */

export async function ensureUserProfile(userId: string, email: string): Promise<void> {
  if (!userId) return;
  const docPath = `users/${userId}`;
  const todayStr = new Date().toISOString().split('T')[0];
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(
      userRef,
      {
        id: userId,
        email: email || '',
        lastActiveAt: new Date().toISOString(),
        activityDates: [todayStr],
      },
      { merge: true }
    );
  } catch (error) {
    console.warn('Could not sync user profile to Firestore (using offline mode):', error);
    handleFirestoreError(error, OperationType.WRITE, docPath, false);
  }
}
