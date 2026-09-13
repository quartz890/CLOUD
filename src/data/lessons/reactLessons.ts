import { LessonDetail } from '../../types';

export const REACT_LESSONS: Record<string, LessonDetail> = {
  'react-l1': {
    id: 'react-l1',
    courseSlug: 'react',
    title: 'Why React? Imperative vs Declarative UI',
    duration: '15 min',
    introduction:
      'React fundamentally changed frontend software engineering by shifting paradigms from imperative DOM manipulation to declarative, state-driven component architectures. In this lesson, you will learn why direct DOM mutation fails at scale and how React Virtual DOM diffing delivers lightning-fast, predictable user interfaces.',
    learningObjectives: [
      'Contrast Imperative UI programming (vanilla JavaScript DOM methods) with Declarative UI (React state description)',
      'Understand how React builds an in-memory Virtual DOM and performs reconciliation diffing',
      'Discover the component-based architecture model and why it enables modular code reuse',
      'Learn how state changes trigger automatic, surgical UI updates without manual querySelectors',
    ],
    explanation: [
      {
        heading: 'Imperative vs Declarative UI Thinking',
        paragraphs: [
          'Imperative programming means giving the computer step-by-step instructions on HOW to do something. In vanilla JavaScript, you manually find a DOM node (document.querySelector), create elements (createElement), attach text, and append child nodes.',
          'Declarative programming means describing WHAT the UI should look like for any given state. You declare: "When loggedIn is true, display the user profile; otherwise, display the login button." React handles the complex DOM mutations under the hood.',
        ],
      },
      {
        heading: 'The Virtual DOM & Reconciliation',
        paragraphs: [
          'Directly mutating the browser real DOM is computationally expensive because it causes style recalibrations, layout reflows, and pixel repaints.',
          'React maintains a lightweight JavaScript object representation of the UI called the Virtual DOM. When component state changes, React creates a new Virtual DOM snapshot, compares it with the previous snapshot (a process called "diffing"), and surgically updates only the specific browser DOM nodes that actually changed.',
        ],
        keyPoints: [
          'Unidirectional Data Flow: Data flows cleanly down from parent to child components via props.',
          'Component Encapsulation: Each component manages its own structure, styling, and local state.',
        ],
      },
    ],
    codeExample: {
      language: 'tsx',
      filename: 'ImperativeVsDeclarative.tsx',
      code: `// ❌ IMPERATIVE APPROACH (Vanilla JS - Hard to maintain as state grows)
// const btn = document.getElementById('count-btn');
// let count = 0;
// btn.addEventListener('click', () => {
//   count++;
//   document.getElementById('count-display').innerText = \`Clicked: \${count}\`;
// });

// ✅ DECLARATIVE REACT APPROACH (State drives the UI)
import React, { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm">
      <p className="text-slate-700 font-medium">Clicked: {count} times</p>
      <button
        type="button"
        onClick={() => setCount((prev) => prev + 1)}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
      >
        Increment
      </button>
    </div>
  );
}`,
      explanation:
        'In React, you never manually touch the DOM node. When you update the `count` state, React automatically determines that only the number text inside the paragraph needs to change.',
    },
    practicalExample: {
      title: 'Building a Dynamic Toggle Switch in React',
      scenario: 'Creating an interactive light/dark theme switch that changes status text and colors.',
      code: `import React, { useState } from 'react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={\`p-6 rounded-2xl transition-colors \${isDark ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-900'}\`}>
      <h3 className="font-bold">Current Theme: {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}</h3>
      <button
        type="button"
        onClick={() => setIsDark(!isDark)}
        className="mt-3 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
      >
        Toggle Appearance
      </button>
    </div>
  );
}`,
      explanation:
        'The UI automatically synchronizes with the `isDark` boolean state without writing separate event listeners or classList.add calls.',
      outputDescription: 'Renders a card that toggles between dark slate and light backgrounds on button click.',
    },
    commonMistakes: [
      {
        mistake: 'Using document.getElementById or querySelector inside React components',
        whyItHappens: 'Carrying habits from vanilla JavaScript into React.',
        howToFix: 'Rely on React state (useState) or React refs (useRef) instead of querying the DOM manually.',
        incorrectSnippet: `function BadComponent() {
  const handleClick = () => {
    document.getElementById('my-title').textContent = 'Updated!';
  };
  return <h1 id="my-title">Original</h1>;
}`,
        correctSnippet: `function GoodComponent() {
  const [title, setTitle] = useState('Original');
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={() => setTitle('Updated!')}>Update</button>
    </div>
  );
}`,
      },
    ],
    practice: {
      title: 'Build a Declarative Notification Banner',
      instructions: [
        'Write a functional React component called `NotificationBanner`.',
        'Use `useState` with a boolean flag `isVisible` initialized to true.',
        'If `isVisible` is true, render a banner with a dismiss button.',
        'Clicking the dismiss button sets `isVisible` to false.',
      ],
      starterCode: `import React, { useState } from 'react';

export function NotificationBanner() {
  // Declare isVisible state
  // Return declarative JSX
}`,
      hint: 'Use conditional rendering: {isVisible && <div ...>}',
      solutionCode: `import React, { useState } from 'react';

export function NotificationBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between">
      <span className="text-xs text-amber-900 font-medium">🚀 New course modules available!</span>
      <button
        type="button"
        onClick={() => setIsVisible(false)}
        className="text-xs font-bold text-amber-700 hover:text-amber-900 cursor-pointer"
      >
        Dismiss
      </button>
    </div>
  );
}`,
    },
    projectConnection: {
      title: 'Building Enterprise Single-Page Applications',
      description:
        'Companies like Airbnb, Netflix, and Uber built their entire web applications using React component hierarchies. Declarative components make massive codebases predictable, testable, and maintainable.',
      howItApplies:
        'In large frontend projects, declarative state management guarantees that the UI is always a pure reflection of application state, eliminating synchronization bugs.',
    },
    quiz: [
      {
        id: 'react-l1-q1',
        question: 'What is the primary benefit of declarative UI programming in React?',
        options: [
          'You describe what the UI should look like for a given state, and React handles DOM updates automatically.',
          'You write SQL queries directly inside HTML tags.',
          'It eliminates the need for CSS entirely.',
          'It makes your website run without an internet connection.',
        ],
        correctOptionIndex: 0,
        explanation:
          'Declarative programming allows developers to focus on describing the desired UI state rather than writing fragile imperative DOM manipulation commands.',
      },
      {
        id: 'react-l1-q2',
        question: 'What is the React Virtual DOM?',
        options: [
          'A lightweight in-memory JavaScript representation of the real DOM used for efficient diffing',
          'A cloud server running in Google Chrome',
          'A 3D virtual reality headset plugin',
          'A local database that replaces indexedDB',
        ],
        correctOptionIndex: 0,
        explanation:
          'The Virtual DOM is an in-memory tree of JavaScript objects representing the UI that React diffs against previous renders to calculate minimal real DOM updates.',
      },
      {
        id: 'react-l1-q3',
        question: 'Why should you avoid using document.querySelector inside React components?',
        options: [
          'React manages DOM lifecycle and updates; manual DOM mutations bypass React state reconciliation and cause bugs.',
          'The browser throws a security error when calling querySelector.',
          'querySelector only works on Linux.',
          'It slows down internet speeds.',
        ],
        correctOptionIndex: 0,
        explanation:
          'Manual DOM updates bypass React reconciliation tree and state flow, leading to out-of-sync UI bugs.',
      },
    ],
  },
};
