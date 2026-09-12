import React, { useState } from 'react';
import { QuizQuestion, Lesson } from '../types';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Lightbulb,
  Award,
  Layers,
  Check,
} from 'lucide-react';

export interface QuestionState {
  selectedOptionIndex: number | null;
  isSubmitted: boolean;
  isCorrect: boolean;
}

export interface StoredQuizState {
  questionStates: Record<number, QuestionState>;
  activeQuestionIndex: number;
  showResultsView: boolean;
  viewMode: 'step' | 'all';
}

interface LessonQuizProps {
  lessonId: string;
  quiz: QuizQuestion[];
  lessonTitle: string;
  nextItem: { lesson: Lesson; moduleTitle: string } | null;
  onNextLesson: () => void;
  onCompleteCourse: () => void;
  savedState?: StoredQuizState;
  onSaveState?: (state: StoredQuizState) => void;
  onLessonComplete?: () => void;
  isLessonCompleted?: boolean;
}

export const LessonQuiz: React.FC<LessonQuizProps> = ({
  lessonId,
  quiz,
  lessonTitle,
  nextItem,
  onNextLesson,
  onCompleteCourse,
  savedState,
  onSaveState,
  onLessonComplete,
  isLessonCompleted = false,
}) => {
  // Guard against empty quiz
  if (!quiz || quiz.length === 0) {
    return null;
  }

  // State for all questions in the quiz, restoring previous state for THIS lesson if present
  const [questionStates, setQuestionStates] = useState<Record<number, QuestionState>>(() => {
    if (savedState?.questionStates && Object.keys(savedState.questionStates).length === quiz.length) {
      return savedState.questionStates;
    }
    const initial: Record<number, QuestionState> = {};
    quiz.forEach((_, idx) => {
      initial[idx] = {
        selectedOptionIndex: null,
        isSubmitted: false,
        isCorrect: false,
      };
    });
    return initial;
  });

  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(() => {
    if (savedState?.activeQuestionIndex !== undefined && savedState.activeQuestionIndex < quiz.length) {
      return savedState.activeQuestionIndex;
    }
    return 0;
  });

  const [showResultsView, setShowResultsView] = useState<boolean>(() => {
    return savedState?.showResultsView ?? false;
  });

  const [viewMode, setViewMode] = useState<'step' | 'all'>(() => {
    return savedState?.viewMode ?? 'step';
  });

  // Helper to persist state for this specific lesson
  const persistState = (
    nextQuestionStates: Record<number, QuestionState>,
    nextActiveIdx: number,
    nextShowResults: boolean,
    nextViewMode: 'step' | 'all'
  ) => {
    if (onSaveState) {
      onSaveState({
        questionStates: nextQuestionStates,
        activeQuestionIndex: nextActiveIdx,
        showResultsView: nextShowResults,
        viewMode: nextViewMode,
      });
    }
  };

  const totalQuestions = quiz.length;
  const questionStatesList: QuestionState[] = Object.values(questionStates);
  const answeredCount = questionStatesList.filter((s) => s.isSubmitted).length;
  const correctCount = questionStatesList.filter((s) => s.isSubmitted && s.isCorrect).length;
  const allSubmitted = answeredCount === totalQuestions;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  const currentQ = quiz[activeQuestionIndex];
  const currentState = questionStates[activeQuestionIndex];

  // Handle selecting an option before submission
  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    // If already submitted, ignore clicks to lock answer
    if (questionStates[questionIndex]?.isSubmitted) return;

    const nextStates = {
      ...questionStates,
      [questionIndex]: {
        ...questionStates[questionIndex],
        selectedOptionIndex: optionIndex,
      },
    };
    setQuestionStates(nextStates);
    persistState(nextStates, activeQuestionIndex, showResultsView, viewMode);
  };

  // Handle submitting the current question answer
  const handleSubmitAnswer = (questionIndex: number) => {
    const state = questionStates[questionIndex];
    if (state.selectedOptionIndex === null || state.isSubmitted) return;

    const question = quiz[questionIndex];
    const isCorrect = state.selectedOptionIndex === question.correctOptionIndex;

    const nextStates: Record<number, QuestionState> = {
      ...questionStates,
      [questionIndex]: {
        ...questionStates[questionIndex],
        isSubmitted: true,
        isCorrect,
      },
    };

    setQuestionStates(nextStates);

    // Check if all questions are completed after this submission
    const allDone =
      Object.values(nextStates).length === totalQuestions &&
      Object.values(nextStates).every((s) => s.isSubmitted);

    persistState(nextStates, activeQuestionIndex, showResultsView, viewMode);

    if (allDone && onLessonComplete) {
      onLessonComplete();
    }
  };

  // Reset/Retake quiz for this lesson (does NOT uncomplete the lesson)
  const handleRetakeQuiz = () => {
    const reset: Record<number, QuestionState> = {};
    quiz.forEach((_, idx) => {
      reset[idx] = {
        selectedOptionIndex: null,
        isSubmitted: false,
        isCorrect: false,
      };
    });
    setQuestionStates(reset);
    setActiveQuestionIndex(0);
    setShowResultsView(false);
    persistState(reset, 0, false, viewMode);
  };

  // Move to next question in step mode
  const handleStepNext = () => {
    if (activeQuestionIndex < totalQuestions - 1) {
      const nextIdx = activeQuestionIndex + 1;
      setActiveQuestionIndex(nextIdx);
      persistState(questionStates, nextIdx, showResultsView, viewMode);
    } else if (allSubmitted) {
      setShowResultsView(true);
      persistState(questionStates, activeQuestionIndex, true, viewMode);
      if (onLessonComplete) {
        onLessonComplete();
      }
    }
  };

  // Move to previous question in step mode
  const handleStepPrev = () => {
    if (activeQuestionIndex > 0) {
      const prevIdx = activeQuestionIndex - 1;
      setActiveQuestionIndex(prevIdx);
      persistState(questionStates, prevIdx, showResultsView, viewMode);
    }
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <section
      id="lesson-quiz-section"
      className="mt-14 pt-10 border-t border-slate-200"
      aria-labelledby="quiz-section-heading"
    >
      {/* Quiz Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase bg-sky-100 text-sky-800">
              <HelpCircle className="w-3.5 h-3.5" />
              Lesson Knowledge Check
            </span>
            <span className="text-xs text-slate-500 font-medium">
              3 Questions
            </span>
          </div>
          <h2
            id="quiz-section-heading"
            className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight"
          >
            Test Your Understanding
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Reinforce key takeaways from <span className="font-semibold text-slate-800">"{lessonTitle}"</span> before advancing to the next lesson.
          </p>
        </div>

        {/* View Mode Switcher (Step-by-Step vs All Questions) */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl shrink-0 self-start sm:self-center border border-slate-200/80">
          <button
            id="quiz-mode-step-btn"
            type="button"
            onClick={() => {
              setViewMode('step');
              setShowResultsView(false);
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              viewMode === 'step' && !showResultsView
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Step-by-Step
          </button>
          <button
            id="quiz-mode-all-btn"
            type="button"
            onClick={() => {
              setViewMode('all');
              setShowResultsView(false);
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              viewMode === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Questions
          </button>
        </div>
      </div>

      {/* Progress & Question Navigation Pills */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Quiz Progress
            </span>
            <span className="text-xs font-semibold text-slate-700">
              {answeredCount} of {totalQuestions} answered
            </span>
          </div>

          {answeredCount > 0 && (
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-slate-600">Current Score:</span>
              <span className="font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                {correctCount} / {answeredCount} correct
              </span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 mb-4 overflow-hidden">
          <div
            className="bg-sky-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Question Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {quiz.map((q, idx) => {
            const state = questionStates[idx];
            const isActive = viewMode === 'step' && activeQuestionIndex === idx && !showResultsView;
            return (
              <button
                key={q.id}
                id={`quiz-question-tab-${idx + 1}`}
                type="button"
                onClick={() => {
                  setViewMode('step');
                  setActiveQuestionIndex(idx);
                  setShowResultsView(false);
                }}
                className={`flex-1 min-w-[90px] py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : state.isSubmitted
                    ? state.isCorrect
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
                    : state.selectedOptionIndex !== null
                    ? 'bg-sky-50 text-sky-800 border-sky-300'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>Q{idx + 1}</span>
                {state.isSubmitted ? (
                  state.isCorrect ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  )
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-300" />
                )}
              </button>
            );
          })}

          {allSubmitted && (
            <button
              id="quiz-view-score-summary-tab"
              type="button"
              onClick={() => setShowResultsView(true)}
              className={`py-2 px-3.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all shrink-0 ${
                showResultsView
                  ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                  : 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Score Summary</span>
            </button>
          )}
        </div>
      </div>

      {/* MAIN QUIZ CONTENT CONTAINER */}

      {/* Case 1: Results Summary Screen (when user finishes or clicks Score Summary) */}
      {showResultsView ? (
        <div
          id="quiz-results-summary-card"
          className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs animate-in fade-in duration-200"
        >
          <div className="text-center max-w-lg mx-auto mb-8">
            <div
              className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 ${
                percentage >= 67
                  ? 'bg-emerald-100 text-emerald-600 border border-emerald-200'
                  : 'bg-amber-100 text-amber-600 border border-amber-200'
              }`}
            >
              {percentage >= 67 ? (
                <Sparkles className="w-8 h-8" />
              ) : (
                <Award className="w-8 h-8" />
              )}
            </div>

            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 mb-2">
              Quiz Completed
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {percentage === 100
                ? 'Perfect Score! 100%'
                : percentage >= 67
                ? 'Great Job! You Passed!'
                : 'Good Attempt! Keep Practicing'}
            </h3>

            <p className="text-slate-600 text-sm mt-2">
              {percentage === 100
                ? `Outstanding work! You correctly answered all 3 questions on "${lessonTitle}". You are ready for the next challenge!`
                : percentage >= 67
                ? `You answered ${correctCount} out of ${totalQuestions} questions correctly (${percentage}%). Take a look at the answers below to reinforce the concepts.`
                : `You scored ${correctCount} out of ${totalQuestions} (${percentage}%). Review the lesson notes and explanations to solidify your understanding.`}
            </p>

            {/* Score pill */}
            <div className="mt-5 inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Final Result
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-lg font-extrabold text-slate-900">
                {correctCount} / {totalQuestions} Correct
              </span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  percentage >= 67
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {percentage}%
              </span>
            </div>

            {/* Automatic Completion Banner */}
            <div
              id="quiz-auto-completed-banner"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Lesson automatically marked as <strong>Completed</strong>! Progress is saved.</span>
            </div>
          </div>

          {/* Detailed Question Review List */}
          <div className="space-y-4 mb-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Question Review
            </h4>

            {quiz.map((q, idx) => {
              const state = questionStates[idx];
              const isCorrect = state.isCorrect;
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isCorrect
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : 'bg-rose-50/40 border-rose-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        isCorrect
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-600 text-white'
                      }`}
                    >
                      {isCorrect ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-500 uppercase">
                          Question {idx + 1}
                        </span>
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                            isCorrect
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {isCorrect ? 'Correct (+1)' : 'Incorrect (0)'}
                        </span>
                      </div>

                      <p className="text-sm font-semibold text-slate-900 mb-2">
                        {q.question}
                      </p>

                      <div className="text-xs space-y-1 mb-2.5">
                        <div className="flex items-baseline gap-1.5 text-slate-700">
                          <span className="font-semibold text-slate-500">Your answer:</span>
                          <span className={isCorrect ? 'font-semibold text-emerald-800' : 'text-rose-800'}>
                            {state.selectedOptionIndex !== null
                              ? q.options[state.selectedOptionIndex]
                              : 'No answer selected'}
                          </span>
                        </div>

                        {!isCorrect && (
                          <div className="flex items-baseline gap-1.5 text-emerald-800 font-semibold">
                            <span>Correct answer:</span>
                            <span>{q.options[q.correctOptionIndex]}</span>
                          </div>
                        )}
                      </div>

                      {/* Explanation box */}
                      <div className="p-3 rounded-lg bg-white/90 border border-slate-200/80 text-xs text-slate-700 flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900 font-semibold">Explanation: </strong>
                          <span>{q.explanation}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Footer with Retake and Next Lesson Buttons */}
          <div
            id="quiz-results-action-buttons"
            className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <button
              id="quiz-retake-button"
              type="button"
              onClick={handleRetakeQuiz}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors order-2 sm:order-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>

            {nextItem ? (
              <button
                id="quiz-results-next-lesson-button"
                type="button"
                onClick={onNextLesson}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-sm order-1 sm:order-2 cursor-pointer"
              >
                <span>Advance to Next Lesson</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                id="quiz-results-complete-course-button"
                type="button"
                onClick={onCompleteCourse}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-sm order-1 sm:order-2 cursor-pointer"
              >
                <span>Finish Course & View Syllabus</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : viewMode === 'step' ? (
        /* Case 2: Step-by-Step Single Question Card */
        <div
          id={`quiz-step-card-${activeQuestionIndex + 1}`}
          className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-7 transition-all"
        >
          {/* Question Header */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
              Question {activeQuestionIndex + 1} of {totalQuestions}
            </span>

            {currentState.isSubmitted && (
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold ${
                  currentState.isCorrect
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-100 text-rose-800 border border-rose-200'
                }`}
              >
                {currentState.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Correct!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Incorrect</span>
                  </>
                )}
              </span>
            )}
          </div>

          {/* Question Prompt */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-5">
            {currentQ.question}
          </h3>

          {/* Multiple Choice Options */}
          <div className="space-y-3 mb-6" role="radiogroup" aria-label={currentQ.question}>
            {currentQ.options.map((optionText, optIdx) => {
              const isSelected = currentState.selectedOptionIndex === optIdx;
              const isSubmitted = currentState.isSubmitted;
              const isCorrectOption = optIdx === currentQ.correctOptionIndex;

              // Determine styling based on submission state
              let optionStyle = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70 text-slate-800';
              let badgeStyle = 'bg-slate-100 text-slate-600 border-slate-200';

              if (isSubmitted) {
                if (isCorrectOption) {
                  // Always highlight correct answer in green
                  optionStyle = 'border-emerald-300 bg-emerald-50/80 text-emerald-950 font-medium ring-1 ring-emerald-300';
                  badgeStyle = 'bg-emerald-600 text-white border-emerald-600';
                } else if (isSelected && !currentState.isCorrect) {
                  // User chose this wrong option
                  optionStyle = 'border-rose-300 bg-rose-50/80 text-rose-950 ring-1 ring-rose-300';
                  badgeStyle = 'bg-rose-600 text-white border-rose-600';
                } else {
                  // Unselected neutral option
                  optionStyle = 'border-slate-200 bg-slate-50/40 text-slate-400 opacity-60';
                  badgeStyle = 'bg-slate-100 text-slate-400 border-slate-200';
                }
              } else if (isSelected) {
                // Selected prior to submit
                optionStyle = 'border-sky-500 bg-sky-50/80 text-sky-950 ring-2 ring-sky-500/20 shadow-2xs font-medium';
                badgeStyle = 'bg-sky-600 text-white border-sky-600';
              }

              return (
                <button
                  key={optIdx}
                  id={`quiz-q${activeQuestionIndex + 1}-option-${optIdx}`}
                  type="button"
                  disabled={isSubmitted}
                  onClick={() => handleSelectOption(activeQuestionIndex, optIdx)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl border flex items-start gap-3 transition-all min-h-[50px] ${optionStyle} ${
                    isSubmitted ? 'cursor-default' : 'cursor-pointer active:scale-[0.99]'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border ${badgeStyle} transition-colors`}
                  >
                    {optionLetters[optIdx]}
                  </span>

                  <span className="text-sm flex-1 leading-relaxed">
                    {optionText}
                  </span>

                  {/* Icon indicators after submit */}
                  {isSubmitted && isCorrectOption && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {isSubmitted && isSelected && !currentState.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Callout (Appears immediately after submitting) */}
          {currentState.isSubmitted && (
            <div
              id={`quiz-explanation-${activeQuestionIndex + 1}`}
              className={`p-4 rounded-xl border mb-6 flex items-start gap-3 animate-in fade-in duration-200 ${
                currentState.isCorrect
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                  : 'bg-amber-50/70 border-amber-200 text-amber-900'
              }`}
            >
              <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm leading-relaxed">
                <strong className="block font-bold mb-1">
                  {currentState.isCorrect ? 'Great insight!' : 'Key Takeaway:'}
                </strong>
                <p className="text-slate-700">{currentQ.explanation}</p>
              </div>
            </div>
          )}

          {/* Step Navigation & Submit Buttons */}
          <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto order-2 sm:order-1">
              <button
                type="button"
                disabled={activeQuestionIndex === 0}
                onClick={handleStepPrev}
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Previous Question
              </button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto order-1 sm:order-2">
              {!currentState.isSubmitted ? (
                <button
                  id={`quiz-submit-btn-q${activeQuestionIndex + 1}`}
                  type="button"
                  disabled={currentState.selectedOptionIndex === null}
                  onClick={() => handleSubmitAnswer(activeQuestionIndex)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
                >
                  Submit Answer
                </button>
              ) : activeQuestionIndex < totalQuestions - 1 ? (
                <button
                  id="quiz-next-question-btn"
                  type="button"
                  onClick={handleStepNext}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-xs cursor-pointer"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  id="quiz-view-results-btn"
                  type="button"
                  onClick={() => setShowResultsView(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-xs cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>View Final Score & Results</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Case 3: All Questions Stacked View */
        <div className="space-y-6">
          {quiz.map((q, qIdx) => {
            const state = questionStates[qIdx];
            return (
              <div
                key={q.id}
                id={`quiz-card-stacked-${qIdx + 1}`}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-7"
              >
                {/* Question Header */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
                    Question {qIdx + 1} of {totalQuestions}
                  </span>

                  {state.isSubmitted && (
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold ${
                        state.isCorrect
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-100 text-rose-800 border border-rose-200'
                      }`}
                    >
                      {state.isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Correct</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          <span>Incorrect</span>
                        </>
                      )}
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-4">
                  {q.question}
                </h3>

                {/* Options */}
                <div className="space-y-2.5 mb-5">
                  {q.options.map((optText, optIdx) => {
                    const isSelected = state.selectedOptionIndex === optIdx;
                    const isSubmitted = state.isSubmitted;
                    const isCorrectOption = optIdx === q.correctOptionIndex;

                    let optionStyle = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70 text-slate-800';
                    let badgeStyle = 'bg-slate-100 text-slate-600 border-slate-200';

                    if (isSubmitted) {
                      if (isCorrectOption) {
                        optionStyle = 'border-emerald-300 bg-emerald-50/80 text-emerald-950 font-medium ring-1 ring-emerald-300';
                        badgeStyle = 'bg-emerald-600 text-white border-emerald-600';
                      } else if (isSelected && !state.isCorrect) {
                        optionStyle = 'border-rose-300 bg-rose-50/80 text-rose-950 ring-1 ring-rose-300';
                        badgeStyle = 'bg-rose-600 text-white border-rose-600';
                      } else {
                        optionStyle = 'border-slate-200 bg-slate-50/40 text-slate-400 opacity-60';
                        badgeStyle = 'bg-slate-100 text-slate-400 border-slate-200';
                      }
                    } else if (isSelected) {
                      optionStyle = 'border-sky-500 bg-sky-50/80 text-sky-950 ring-2 ring-sky-500/20 font-medium';
                      badgeStyle = 'bg-sky-600 text-white border-sky-600';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        disabled={isSubmitted}
                        onClick={() => handleSelectOption(qIdx, optIdx)}
                        className={`w-full text-left p-3.5 rounded-xl border flex items-start gap-3 transition-all min-h-[48px] ${optionStyle} ${
                          isSubmitted ? 'cursor-default' : 'cursor-pointer active:scale-[0.99]'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border ${badgeStyle}`}
                        >
                          {optionLetters[optIdx]}
                        </span>
                        <span className="text-sm flex-1 leading-relaxed">
                          {optText}
                        </span>
                        {isSubmitted && isCorrectOption && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        )}
                        {isSubmitted && isSelected && !state.isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {state.isSubmitted && (
                  <div
                    className={`p-4 rounded-xl border mb-5 flex items-start gap-3 animate-in fade-in duration-200 ${
                      state.isCorrect
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                        : 'bg-amber-50/70 border-amber-200 text-amber-900'
                    }`}
                  >
                    <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm leading-relaxed">
                      <strong className="block font-bold mb-1">
                        {state.isCorrect ? 'Correct!' : 'Key Takeaway:'}
                      </strong>
                      <p className="text-slate-700">{q.explanation}</p>
                    </div>
                  </div>
                )}

                {/* Submit button for this question */}
                {!state.isSubmitted && (
                  <div className="pt-3 border-t border-slate-100 flex justify-end">
                    <button
                      type="button"
                      disabled={state.selectedOptionIndex === null}
                      onClick={() => handleSubmitAnswer(qIdx)}
                      className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
                    >
                      Submit Answer
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {/* If all questions submitted in all view, show Score Banner */}
          {allSubmitted && (
            <div
              id="quiz-all-completed-banner"
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs animate-in fade-in duration-200"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      Quiz Complete
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">
                      Score: {correctCount} of {totalQuestions} ({percentage}%)
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">
                    {percentage >= 67 ? 'Well done!' : 'Keep practicing!'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {percentage === 100
                      ? `You got a perfect 3 out of 3 score on "${lessonTitle}". Ready to advance!`
                      : `You scored ${correctCount} out of 3. You can review the explanations above or retake anytime.`}
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleRetakeQuiz}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Retake
                  </button>

                  {nextItem ? (
                    <button
                      type="button"
                      onClick={onNextLesson}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-xs cursor-pointer"
                    >
                      <span>Next Lesson</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={onCompleteCourse}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-xs cursor-pointer"
                    >
                      <span>Complete Course</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Persistent Quiz-Driven Next Lesson Section */}
      {/* If the learner finishes the quiz or has scrolled past it, provide the prominent Next Lesson button */}
      {!showResultsView && (
        <div
          id="quiz-bottom-next-lesson-panel"
          className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="text-xs text-slate-500 text-center sm:text-left">
            {allSubmitted ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                All 3 quiz questions completed! Score: {correctCount}/{totalQuestions}
              </span>
            ) : (
              <span>
                Answer the 3 questions above to test your understanding before moving forward.
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {allSubmitted && (
              <button
                type="button"
                onClick={() => setShowResultsView(true)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                View Score Breakdown
              </button>
            )}

            {nextItem ? (
              <button
                id="quiz-persistent-next-lesson-button"
                type="button"
                onClick={onNextLesson}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-xs cursor-pointer"
              >
                <span>Next Lesson</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                id="quiz-persistent-complete-course-button"
                type="button"
                onClick={onCompleteCourse}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-xs cursor-pointer"
              >
                <span>Complete Track</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
