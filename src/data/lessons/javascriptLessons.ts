import { LessonDetail } from '../../types';

export const JAVASCRIPT_LESSONS: Record<string, LessonDetail> = {
  'js-l1': {
    id: 'js-l1',
    courseSlug: 'javascript',
    title: 'Introduction to JavaScript, Engines & Runtime',
    duration: '15 min',
    introduction:
      'JavaScript is the world most widely deployed programming language, powering the interactive web, server backends (Node.js), and mobile applications. In this lesson, you will discover how JavaScript engines (like Google Chrome V8) execute code using the Call Stack, Memory Heap, and Just-In-Time (JIT) compilation.',
    learningObjectives: [
      'Understand the role of JavaScript alongside HTML and CSS in modern web applications',
      'Learn how the V8 engine parses, compiles, and executes JavaScript code',
      'Understand the Single-Threaded nature of JavaScript and the Call Stack execution model',
      'Differentiate between ECMAScript language specifications and Web Browser APIs',
    ],
    explanation: [
      {
        heading: 'What is JavaScript?',
        paragraphs: [
          'While HTML provides structural skeleton and CSS provides visual presentation, JavaScript provides behavior, logic, and state. JavaScript allows web pages to react to user clicks, validate form inputs, animate elements, and load data asynchronously from servers without page reloads.',
          'JavaScript is an interpreted, high-level, single-threaded, garbage-collected language with first-class functions and prototype-based object orientation.',
        ],
      },
      {
        heading: 'The JavaScript Engine: Call Stack & Heap',
        paragraphs: [
          'Modern browsers run JavaScript inside specialized execution engines (such as Chrome V8, Safari JavaScriptCore, or Firefox SpiderMonkey).',
          '• Memory Heap: An unstructured memory pool where objects, arrays, and variables are allocated in RAM.',
          '• Call Stack: A Last-In, First-Out (LIFO) stack of execution frames tracking which function is currently executing.',
          'Because JavaScript has only one Call Stack, it executes one line of code at a time synchronously on the main thread.',
        ],
        keyPoints: [
          'ECMAScript (ES6, ES2024) is the official language standard.',
          'Browser APIs (like window, document, fetch, setTimeout) are provided by the browser environment, not the core JS language itself.',
        ],
      },
    ],
    codeExample: {
      language: 'javascript',
      filename: 'runtime-basics.js',
      code: `// Synchronous execution on the single-threaded Call Stack
function greetUser(name) {
  const message = \`Hello, \${name}!\`;
  return message;
}

function processOrder(orderId, customerName) {
  console.log(\`Processing order #\${orderId}...\`);
  const greeting = greetUser(customerName); // Pushes greetUser onto stack
  console.log(greeting);
  return { orderId, status: 'confirmed' };
}

const order = processOrder(1042, 'Alex');
console.log('Order status:', order.status);`,
      explanation:
        'When processOrder is called, its frame is pushed to the Call Stack. Inside it, greetUser is pushed on top, executes, returns, pops off the stack, and then processOrder finishes.',
    },
    practicalExample: {
      title: 'Inspecting the JavaScript Console & Stack Trace',
      scenario: 'Debugging an error to see how the engine displays the call stack trace.',
      code: `function validateEmail(email) {
  if (!email.includes('@')) {
    throw new Error('Invalid email format: missing @ symbol');
  }
  return true;
}

function handleFormSubmit(userData) {
  validateEmail(userData.email); // Stack shows handleFormSubmit -> validateEmail
}

try {
  handleFormSubmit({ email: 'invalid-email.com' });
} catch (error) {
  console.error('Caught error:', error.message);
  console.error('Stack trace:', error.stack);
}`,
      explanation:
        'The stack trace displays the chain of function calls leading to the error, making debugging intuitive.',
      outputDescription: 'Logs the error message and the exact file and line number of each call frame.',
    },
    commonMistakes: [
      {
        mistake: 'Blocking the single main thread with heavy synchronous loops',
        whyItHappens: 'Running a synchronous loop of 10,000,000 iterations freezes the browser UI because the single call stack is locked.',
        howToFix: 'Offload heavy computations to Web Workers or chunk tasks asynchronously using requestAnimationFrame or setTimeout.',
        incorrectSnippet: `// Freezes browser tab completely
while (true) {
  // Infinite loop
}`,
        correctSnippet: `// Use asynchronous intervals or workers
setInterval(() => {
  // Executes periodically without locking UI
}, 1000);`,
      },
    ],
    practice: {
      title: 'Track Call Stack Execution Order',
      instructions: [
        'Write three chained functions: `stepOne`, `stepTwo`, and `runPipeline`.',
        'Have `runPipeline` call `stepOne()`, pass the result to `stepTwo()`, and log the final transformed string.',
        'Verify how the call stack executes sequentially.',
      ],
      starterCode: `function stepOne(text) {
  // Return text trimmed and in lowercase
}

function stepTwo(text) {
  // Prepend "Sanitized: " to text
}

function runPipeline(input) {
  // Chain stepOne and stepTwo
}`,
      hint: 'Use .trim().toLowerCase() in stepOne, and template literals in stepTwo.',
      solutionCode: `function stepOne(text) {
  return text.trim().toLowerCase();
}

function stepTwo(text) {
  return \`Sanitized: \${text}\`;
}

function runPipeline(input) {
  const cleaned = stepOne(input);
  const result = stepTwo(cleaned);
  console.log(result);
  return result;
}

runPipeline('   HELLO CLOUD WORLD!   ');`,
    },
    projectConnection: {
      title: 'Performance Profiling in Production Apps',
      description:
        'In high-traffic web applications, long tasks on the main thread cause dropped frames (jank) and poor Google Core Web Vitals (Interaction to Next Paint - INP).',
      howItApplies:
        'Understanding the single-threaded nature of JavaScript helps you write non-blocking async code, keeping apps running at a smooth 60–120 FPS.',
    },
    quiz: [
      {
        id: 'js-l1-q1',
        question: 'Why is JavaScript described as a "single-threaded" language?',
        options: [
          'It has a single Call Stack and can execute only one piece of code at a time on the main thread.',
          'It can only run on computers with a single CPU core.',
          'It can only handle one user request per hour.',
          'It only supports one variable at a time.',
        ],
        correctOptionIndex: 0,
        explanation:
          'JavaScript single-threaded model means it possesses a single call stack, executing one statement at a time in sequence.',
      },
      {
        id: 'js-l1-q2',
        question: 'Where are objects and non-primitive variables stored in JavaScript engine memory?',
        options: ['Call Stack', 'Memory Heap', 'DOM Tree', 'Local Storage'],
        correctOptionIndex: 1,
        explanation:
          'The Memory Heap is the unstructured memory allocation zone where objects and complex data structures reside in RAM.',
      },
      {
        id: 'js-l1-q3',
        question: 'Which entity provides APIs like setTimeout, document, and fetch to JavaScript in the browser?',
        options: [
          'The ECMAScript core language specification',
          'Web Browser Runtime APIs (Host Environment)',
          'The Linux kernel directly',
          'The CSS parsing engine',
        ],
        correctOptionIndex: 1,
        explanation:
          'Features like fetch, DOM manipulation, and timers are Web APIs provided by the host browser environment.',
      },
    ],
  },

  'js-l2': {
    id: 'js-l2',
    courseSlug: 'javascript',
    title: 'Variables: var, let, and const & Temporal Dead Zone',
    duration: '16 min',
    introduction:
      'Modern JavaScript development requires understanding the fundamental differences between var, let, and const. In this lesson, you will master block scoping, variable hoisting, the Temporal Dead Zone (TDZ), and the best-practice rule: default to const, use let when reassigning, and avoid var entirely.',
    learningObjectives: [
      'Understand the differences between block scope (let/const) and function scope (var)',
      'Learn what variable hoisting is and how it behaves across var vs let/const',
      'Master the Temporal Dead Zone (TDZ) and why accessing let/const before declaration throws a ReferenceError',
      'Understand that const prevents reassignment of the variable identifier, not mutation of object properties',
    ],
    explanation: [
      {
        heading: 'Block Scope vs Function Scope',
        paragraphs: [
          '• var is function-scoped (or globally scoped). It ignores curly-bracket blocks like if statements or for loops, leaking variables outside.',
          '• let and const are block-scoped. They are strictly confined inside the nearest enclosing pair of curly brackets { } (such as inside an if, while, or for block).',
        ],
      },
      {
        heading: 'Hoisting & The Temporal Dead Zone (TDZ)',
        paragraphs: [
          'When JavaScript executes, it hoists declarations to the top of their scope during the compilation phase.',
          'var is hoisted and initialized with the value undefined. If you read a var before its declaration line, you get undefined without an error.',
          'let and const are hoisted but NOT initialized. The time between the start of the block and the actual declaration line is called the Temporal Dead Zone (TDZ). Accessing a let or const in the TDZ immediately throws a fatal ReferenceError.',
        ],
        keyPoints: [
          'Always declare variables at the top of their scope or before usage.',
          'Default to const for 90% of variables. Use let only when a value must be reassigned (like loop counters or toggle flags).',
          'Never use var in modern ES6+ codebases.',
        ],
      },
    ],
    codeExample: {
      language: 'javascript',
      filename: 'scoping-rules.js',
      code: `// 1. Block Scoping
if (true) {
  var leakedVar = 'I leak outside!';
  let blockLet = 'I stay inside!';
  const blockConst = 'I also stay inside!';
}

console.log(leakedVar); // 'I leak outside!' (var ignores if-blocks)
// console.log(blockLet); // ReferenceError: blockLet is not defined

// 2. const prevents reassignment, but allows object mutation
const user = { name: 'Alex', role: 'admin' };
// user = { name: 'Jordan' }; // TypeError: Assignment to constant variable
user.role = 'superadmin'; // Allowed! Object properties can still mutate

// 3. Temporal Dead Zone (TDZ)
function demoTDZ() {
  // console.log(age); // ReferenceError: Cannot access 'age' before initialization
  let age = 28;
  console.log(age); // 28
}`,
      explanation:
        'Notice how const prevents variable rebinding, but the contents of arrays and objects assigned to const can still be modified.',
    },
    practicalExample: {
      title: 'The Classic For Loop Variable Leak Bug',
      scenario: 'Fixing the classic asynchronous for loop closure bug caused by var.',
      code: `// ❌ Broken with var (var is shared across all iterations)
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log('var count:', i), 100);
}
// Outputs: 4, 4, 4 (because var i is 4 when timeouts fire)

// ✅ Fixed with let (each loop iteration receives a fresh block-scoped binding)
for (let j = 1; j <= 3; j++) {
  setTimeout(() => console.log('let count:', j), 100);
}
// Outputs: 1, 2, 3`,
      explanation:
        'Because let is block-scoped, a new distinct binding of j is created for each loop cycle.',
      outputDescription: 'Demonstrates why let fixes asynchronous loop binding issues.',
    },
    commonMistakes: [
      {
        mistake: 'Assuming const makes arrays or objects completely immutable',
        whyItHappens: 'Confusing variable identifier rebinding with deep value immutability.',
        howToFix: 'Use Object.freeze() if you need shallow property immutability, or immutable update patterns (spread operator).',
        incorrectSnippet: `const config = { theme: 'dark' };
// Developer assumes config cannot be changed anywhere`,
        correctSnippet: `const config = Object.freeze({ theme: 'dark' });
// config.theme = 'light'; // Fails silently or throws in strict mode`,
      },
    ],
    practice: {
      title: 'Refactor Legacy Code to Modern ES6 Scope',
      instructions: [
        'Replace all var keywords with appropriate const or let declarations.',
        'Ensure loop counters use let and static configurations use const.',
      ],
      starterCode: `var MAX_RETRIES = 3;
var currentAttempt = 0;

for (var i = 0; i < MAX_RETRIES; i++) {
  var attemptStatus = 'attempt_' + i;
  console.log(attemptStatus);
}`,
      hint: 'MAX_RETRIES is constant. i and currentAttempt change value.',
      solutionCode: `const MAX_RETRIES = 3;
let currentAttempt = 0;

for (let i = 0; i < MAX_RETRIES; i++) {
  const attemptStatus = \`attempt_\${i}\`;
  console.log(attemptStatus);
}`,
    },
    projectConnection: {
      title: 'Clean Code Standards in Modern Engineering Teams',
      description:
        'Enterprise code linters (ESLint) enforce no-var and prefer-const rules. Writing modern let/const code prevents accidental global variable pollution and subtle state mutations.',
      howItApplies:
        'In React applications, component state and props are treated as constants to ensure predictable reconciliation cycles.',
    },
    quiz: [
      {
        id: 'js-l2-q1',
        question: 'What happens when you try to access a let or const variable before its declaration line in code?',
        options: [
          'It returns undefined.',
          'The engine throws a ReferenceError due to the Temporal Dead Zone (TDZ).',
          'It creates a global window variable.',
          'It restarts the script.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Variables declared with let and const reside in the Temporal Dead Zone until execution reaches their declaration line; accessing them throws a ReferenceError.',
      },
      {
        id: 'js-l2-q2',
        question: 'What does the const keyword guarantee in JavaScript?',
        options: [
          'The variable identifier cannot be reassigned to a new memory address.',
          'The properties of the object assigned to const are completely frozen and cannot be changed.',
          'The variable is automatically uploaded to the cloud database.',
          'The variable is accessible from all browser tabs.',
        ],
        correctOptionIndex: 0,
        explanation:
          'const prevents reassigning the variable name to another value; however, the internal properties of objects and arrays can still be mutated.',
      },
      {
        id: 'js-l2-q3',
        question: 'What is the scope of a variable declared with var inside an if block?',
        options: [
          'It is scoped strictly to that if block.',
          'It is scoped to the enclosing function (or global scope if outside a function).',
          'It is destroyed immediately after the if block ends.',
          'It can only be used by numbers.',
        ],
        correctOptionIndex: 1,
        explanation:
          'var is function-scoped and completely ignores block boundaries like if statements or while loops.',
      },
    ],
  },
};
