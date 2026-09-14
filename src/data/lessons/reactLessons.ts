import { LessonDetail } from '../types';

export const REACT_LESSONS: Record<string, LessonDetail> = {
  "react-l1": {
    "id": "react-l1",
    "courseSlug": "react",
    "title": "Components and JSX",
    "duration": "1h",
    "introduction": "Welcome to React! React is a UI library built by Meta that changed how we build web applications. Instead of building one massive HTML page, React lets you build small, reusable pieces of UI called Components using a syntax called JSX.",
    "learningObjectives": [
      "Understand the difference between Vanilla JS and React.",
      "Learn what a Component is.",
      "Write JSX to combine HTML and JavaScript.",
      "Export and Import components."
    ],
    "explanation": [
      {
        "heading": "WHAT is a Component?",
        "paragraphs": [
          "A Component is simply a JavaScript function that returns UI (HTML). Think of them as custom, reusable HTML tags. You can build a `<Navbar />` component and use it on 10 different pages."
        ]
      },
      {
        "heading": "WHY use JSX?",
        "paragraphs": [
          "JSX (JavaScript XML) is a syntax extension for React. It allows you to write HTML directly inside your JavaScript files, making it incredibly easy to visualize what your component will render."
        ]
      },
      {
        "heading": "HOW to write JSX?",
        "paragraphs": [
          "JSX looks like HTML, but it has strict rules: it must return a SINGLE parent element, and all tags must be closed (even `<img />` and `<input />`). Use `className` instead of `class`."
        ]
      },
      {
        "heading": "WHEN to use curly braces?",
        "paragraphs": [
          "In JSX, anytime you want to use a JavaScript variable or expression, you wrap it in `{curly braces}`. This tells React \"execute the JS inside here and render the result.\""
        ]
      }
    ],
    "codeExample": {
      "language": "tsx",
      "filename": "App.tsx",
      "explanation": "A basic React functional component using JSX.",
      "code": "export default function App() {\n  const userName = \"Alice\";\n  \n  return (\n    <div className=\"container\">\n      <h1>Welcome to React!</h1>\n      {/* Using JS inside HTML via curly braces */}\n      <p>Hello, {userName}.</p>\n    </div>\n  );\n}"
    },
    "practicalExample": {
      "title": "A Profile Card Component",
      "scenario": "You are building a social media dashboard and need a reusable profile card.",
      "explanation": "The component is just a function returning a `div`. We can use it multiple times by rendering `<ProfileCard />`.",
      "code": "export function ProfileCard() {\n  return (\n    <div className=\"card\">\n      <img src=\"avatar.jpg\" alt=\"Avatar\" />\n      <h2>John Doe</h2>\n      <button>Follow</button>\n    </div>\n  );\n}"
    },
    "commonMistakes": [
      {
        "mistake": "Returning multiple parent elements.",
        "whyItHappens": "In HTML, you can have sibling elements at the root level. JSX forbids this.",
        "howToFix": "Wrap your sibling elements in a single `<div>` or an empty fragment `<></>`.",
        "incorrectSnippet": "return (\n  <h1>Hi</h1>\n  <p>There</p>\n);",
        "correctSnippet": "return (\n  <>\n    <h1>Hi</h1>\n    <p>There</p>\n  </>\n);"
      }
    ],
    "practice": {
      "title": "Create a Greeting Component",
      "instructions": [
        "Create a function called `Greeting`.",
        "Return an `h1` saying \"Hello World\".",
        "Ensure you export it as default."
      ],
      "starterCode": "// Write your component here\n",
      "hint": "export default function Greeting() { return ... }",
      "solutionCode": "export default function Greeting() {\n  return <h1>Hello World</h1>;\n}"
    },
    "projectConnection": {
      "title": "Task Manager App",
      "description": "Component Architecture.",
      "howItApplies": "You will break down your entire Task Manager into components: `<Header />`, `<TaskList />`, and `<TaskItem />`."
    },
    "quiz": [
      {
        "id": "react-l1-q1",
        "question": "What is a React Component fundamentally?",
        "options": [
          "A CSS file",
          "A database schema",
          "A JavaScript function that returns UI",
          "A special HTML tag"
        ],
        "correctOptionIndex": 2,
        "explanation": "In modern React, a component is just a JS function returning JSX."
      },
      {
        "id": "react-l1-q2",
        "question": "Which attribute replaces HTML`s `class` attribute in JSX?",
        "options": [
          "className",
          "class-name",
          "cssClass",
          "style"
        ],
        "correctOptionIndex": 0,
        "explanation": "Because `class` is a reserved keyword in JS, React uses `className`."
      },
      {
        "id": "react-l1-q3",
        "question": "How do you insert a JavaScript variable inside JSX HTML?",
        "options": [
          "${variable}",
          "{{variable}}",
          "[variable]",
          "{variable}"
        ],
        "correctOptionIndex": 3,
        "explanation": "A single set of curly braces `{}` is used to evaluate JS inside JSX."
      }
    ]
  },
  "react-l2": {
    "id": "react-l2",
    "courseSlug": "react",
    "title": "Props and State (useState)",
    "duration": "1h",
    "introduction": "Components are great, but they are static. To make them dynamic and reusable, we need to pass data into them (Props) and allow them to remember data that changes over time (State).",
    "learningObjectives": [
      "Pass data to child components using Props.",
      "Understand the difference between Props and State.",
      "Import and use the useState hook.",
      "Update state to trigger a UI re-render."
    ],
    "explanation": [
      {
        "heading": "WHAT are Props and State?",
        "paragraphs": [
          "Props (Properties) are arguments passed INTO a component (like parameters in a function). State is local memory MANAGED BY the component itself (like variables inside a function)."
        ]
      },
      {
        "heading": "WHY use State?",
        "paragraphs": [
          "If you change a normal JS variable, React doesn't care. The screen won't update. But if you change a State variable, React instantly re-renders the component to show the new data!"
        ]
      },
      {
        "heading": "HOW to use useState?",
        "paragraphs": [
          "Call `useState(initialValue)`. It returns an array with two things: the current value, and a setter function to update it. We use array destructuring: `const [count, setCount] = useState(0);`."
        ]
      },
      {
        "heading": "WHEN to use Props vs State?",
        "paragraphs": [
          "Use Props to configure a component from the outside (e.g., `<Button text=\"Click Me\" />`). Use State for data that changes due to user interaction (e.g., whether a dropdown is open or closed)."
        ]
      }
    ],
    "codeExample": {
      "language": "tsx",
      "filename": "Counter.tsx",
      "explanation": "A classic counter showing state in action.",
      "code": "import { useState } from 'react';\n\nexport default function Counter() {\n  // count is the value, setCount is the updater function\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      {/* When clicked, we call setCount with the new value */}\n      <button onClick={() => setCount(count + 1)}>\n        Increment\n      </button>\n    </div>\n  );\n}"
    },
    "practicalExample": {
      "title": "Using Props",
      "scenario": "You want to use the same Card component for three different users.",
      "explanation": "By passing `name` and `role` as props, the component becomes highly reusable.",
      "code": "function UserCard({ name, role }) {\n  return (\n    <div className=\"card\">\n      <h3>{name}</h3>\n      <p>{role}</p>\n    </div>\n  );\n}\n\n// Usage in Parent:\n// <UserCard name=\"Alice\" role=\"Admin\" />\n// <UserCard name=\"Bob\" role=\"User\" />"
    },
    "commonMistakes": [
      {
        "mistake": "Mutating state directly.",
        "whyItHappens": "In normal JS, you update a variable by writing `count = count + 1`.",
        "howToFix": "In React, NEVER mutate state directly. ALWAYS use the setter function (`setCount(count + 1)`). Direct mutation will NOT re-render the screen!",
        "incorrectSnippet": "count = 5;",
        "correctSnippet": "setCount(5);"
      }
    ],
    "practice": {
      "title": "Create a Toggle Button",
      "instructions": [
        "Use `useState` to create an `isOn` boolean state, initially `false`.",
        "Return a button that displays \"ON\" if true, or \"OFF\" if false.",
        "Make the button toggle the state when clicked."
      ],
      "starterCode": "import { useState } from 'react';\n\nexport default function Toggle() {\n  // Add state here\n  return (\n    <button>\n      Toggle\n    </button>\n  );\n}",
      "hint": "Use `onClick={() => setIsOn(!isOn)}`.",
      "solutionCode": "import { useState } from 'react';\n\nexport default function Toggle() {\n  const [isOn, setIsOn] = useState(false);\n  return (\n    <button onClick={() => setIsOn(!isOn)}>\n      {isOn ? \"ON\" : \"OFF\"}\n    </button>\n  );\n}"
    },
    "projectConnection": {
      "title": "Task Manager App",
      "description": "Managing the list of tasks.",
      "howItApplies": "Your entire list of tasks will be stored in a `tasks` state variable. When you add a new task, you update the state, and React draws the new task on screen automatically!"
    },
    "quiz": [
      {
        "id": "react-l2-q1",
        "question": "What is the main difference between Props and State?",
        "options": [
          "Props are for CSS, State is for HTML",
          "Props are passed from parent, State is managed internally",
          "State is passed from parent, Props are managed internally",
          "There is no difference"
        ],
        "correctOptionIndex": 1,
        "explanation": "Props are external configuration; State is internal memory."
      },
      {
        "id": "react-l2-q2",
        "question": "What does the `useState` hook return?",
        "options": [
          "A string",
          "An object with data",
          "An array with the value and an updater function",
          "A boolean"
        ],
        "correctOptionIndex": 2,
        "explanation": "`useState` returns `[currentValue, updaterFunction]`."
      },
      {
        "id": "react-l2-q3",
        "question": "Why must you use the setter function (like `setCount`) instead of changing the variable directly?",
        "options": [
          "Because `count` is a const",
          "To trigger a UI re-render",
          "For security reasons",
          "Both A and B"
        ],
        "correctOptionIndex": 3,
        "explanation": "The state variable is a `const`, AND calling the setter is how React knows it needs to update the screen."
      }
    ]
  },
  "react-l3": {
    "id": "react-l3",
    "courseSlug": "react",
    "title": "Events, Conditional Rendering, and Lists",
    "duration": "1h",
    "introduction": "Real applications have interactive elements, show or hide features based on conditions, and display lists of data from databases. We will learn how to handle all three seamlessly in React.",
    "learningObjectives": [
      "Handle events using camelCase syntax (onClick, onChange).",
      "Render elements conditionally using the ternary operator and &&.",
      "Use the .map() array method to render lists of components.",
      "Understand why React requires a `key` prop on list items."
    ],
    "explanation": [
      {
        "heading": "WHAT is Conditional Rendering?",
        "paragraphs": [
          "Conditional rendering means showing different UI depending on the state. \"If isLoading is true, show a spinner. Otherwise, show the data.\""
        ]
      },
      {
        "heading": "WHY use .map() for lists?",
        "paragraphs": [
          "React doesn't have a special `<ForLoop>` tag. Because JSX is just JavaScript, we use the standard JS `.map()` method to transform an array of data into an array of JSX elements!"
        ]
      },
      {
        "heading": "HOW to write React Events?",
        "paragraphs": [
          "Unlike HTML where it is `onclick=\"doThing()\"`, React uses camelCase `onClick={doThing}`. Notice we pass the function itself, not a string."
        ]
      },
      {
        "heading": "WHEN to use the `key` prop?",
        "paragraphs": [
          "Whenever you use `.map()` to render a list, you MUST give the top-level element inside the map a unique `key` string/number. React uses this to efficiently update the list if items are added or removed."
        ]
      }
    ],
    "codeExample": {
      "language": "tsx",
      "filename": "List.tsx",
      "explanation": "Rendering an array of strings into an unordered list.",
      "code": "export default function FruitList() {\n  const fruits = [\"Apple\", \"Banana\", \"Cherry\"];\n  \n  return (\n    <ul>\n      {fruits.map((fruit, index) => (\n        // The key prop is required here!\n        <li key={index}>{fruit}</li>\n      ))}\n    </ul>\n  );\n}"
    },
    "practicalExample": {
      "title": "A Login Message (Conditional)",
      "scenario": "You want to show a \"Logout\" button if logged in, or \"Login\" if not.",
      "explanation": "We use the JavaScript ternary operator `condition ? trueCase : falseCase` directly inside the JSX.",
      "code": "function UserBar({ isLoggedIn }) {\n  return (\n    <div>\n      {isLoggedIn ? (\n        <button>Logout</button>\n      ) : (\n        <button>Login</button>\n      )}\n    </div>\n  );\n}"
    },
    "commonMistakes": [
      {
        "mistake": "Forgetting the key prop on lists.",
        "whyItHappens": "The list will still render visually on the screen!",
        "howToFix": "Check your browser console! React will throw a big red warning. Always add a unique `key` (like a database ID) to mapped elements to prevent weird rendering bugs later.",
        "incorrectSnippet": "items.map(item => <li>{item}</li>)",
        "correctSnippet": "items.map(item => <li key={item.id}>{item}</li>)"
      }
    ],
    "practice": {
      "title": "Conditional && Rendering",
      "instructions": [
        "You have a boolean prop `hasUnreadMessages`.",
        "Use the `&&` operator to render a `<span className=\"badge\">New!</span>` ONLY if `hasUnreadMessages` is true."
      ],
      "starterCode": "export function Inbox({ hasUnreadMessages }) {\n  return (\n    <div>\n      Inbox\n      {/* Add condition here */}\n    </div>\n  );\n}",
      "hint": "{hasUnreadMessages && <span>New!</span>}",
      "solutionCode": "export function Inbox({ hasUnreadMessages }) {\n  return (\n    <div>\n      Inbox\n      {hasUnreadMessages && <span className=\"badge\">New!</span>}\n    </div>\n  );\n}"
    },
    "projectConnection": {
      "title": "Task Manager App",
      "description": "Rendering the Tasks.",
      "howItApplies": "You will use `.map()` to render your array of tasks into a list of `<TaskItem />` components, passing each task's ID as the `key`."
    },
    "quiz": [
      {
        "id": "react-l3-q1",
        "question": "How do you write a click event listener in React?",
        "options": [
          "onclick=\"myFunc()\"",
          "onClick={myFunc}",
          "on-click={myFunc}",
          "click={myFunc}"
        ],
        "correctOptionIndex": 1,
        "explanation": "React events use camelCase (onClick) and accept a function reference in curly braces."
      },
      {
        "id": "react-l3-q2",
        "question": "Which array method is primarily used to render lists in React?",
        "options": [
          ".forEach()",
          ".reduce()",
          ".map()",
          ".filter()"
        ],
        "correctOptionIndex": 2,
        "explanation": "`.map()` is used because it returns a new array of JSX elements that React can render."
      },
      {
        "id": "react-l3-q3",
        "question": "Why is the `key` prop required in lists?",
        "options": [
          "To apply CSS styles",
          "To give the element an ID in the DOM",
          "To help React identify which items changed, were added, or were removed",
          "To make the list accessible"
        ],
        "correctOptionIndex": 2,
        "explanation": "Keys are crucial for React's reconciliation algorithm to efficiently update the UI."
      }
    ]
  },
  "react-l4": {
    "id": "react-l4",
    "courseSlug": "react",
    "title": "Controlled Forms and useEffect",
    "duration": "1h",
    "introduction": "Interacting with the outside world—whether receiving typed input from a user, or fetching data from a backend database—requires specific patterns in React. We will learn Controlled Components and the useEffect hook.",
    "learningObjectives": [
      "Create a controlled form input using state and onChange.",
      "Prevent default form submission behavior.",
      "Understand what Side Effects are.",
      "Use the useEffect hook to fetch data when a component mounts."
    ],
    "explanation": [
      {
        "heading": "WHAT is a Controlled Component?",
        "paragraphs": [
          "In standard HTML, an `<input>` manages its own state (what you type). In React, we want React to be the \"single source of truth\". We bind the input's `value` to a state variable, and update that state on every keystroke."
        ]
      },
      {
        "heading": "WHY use useEffect?",
        "paragraphs": [
          "A React component is a function that runs to calculate the UI. It should be \"pure\" (no side effects). Fetching data from a server is a side effect. `useEffect` lets you step outside the render cycle to do these things safely."
        ]
      },
      {
        "heading": "HOW to use useEffect?",
        "paragraphs": [
          "`useEffect(setupFunction, dependenciesArray)`. The setup function contains your fetch logic. The dependency array `[]` tells React when to re-run it. An empty array `[]` means \"run only once when the component first mounts.\""
        ]
      },
      {
        "heading": "WHEN to preventDefault?",
        "paragraphs": [
          "When a user submits a `<form>`, the browser tries to refresh the entire page by default. In React (a Single Page App), we must call `e.preventDefault()` inside our submit handler to stop the refresh."
        ]
      }
    ],
    "codeExample": {
      "language": "tsx",
      "filename": "Form.tsx",
      "explanation": "A fully controlled text input and form submission.",
      "code": "import { useState } from 'react';\n\nexport default function NameForm() {\n  // 1. Create state for the input\n  const [name, setName] = useState(\"\");\n\n  // 2. Handle submission\n  function handleSubmit(e) {\n    e.preventDefault(); // Stop page refresh!\n    console.log(\"Submitting Name:\", name);\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      {/* 3. Bind value and onChange to state */}\n      <input \n        type=\"text\" \n        value={name} \n        onChange={(e) => setName(e.target.value)} \n      />\n      <button type=\"submit\">Save</button>\n    </form>\n  );\n}"
    },
    "practicalExample": {
      "title": "Fetching Data on Mount",
      "scenario": "You want to load a list of users from an API when the page opens.",
      "explanation": "We use `useEffect` with an empty dependency array to trigger the fetch exactly once.",
      "code": "import { useState, useEffect } from 'react';\n\nexport function UserList() {\n  const [users, setUsers] = useState([]);\n\n  useEffect(() => {\n    // Fetch data inside the effect\n    fetch(\"https://api.example.com/users\")\n      .then(res => res.json())\n      .then(data => setUsers(data));\n  }, []); // <-- Empty array = run once!\n\n  return (\n    <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>\n  );\n}"
    },
    "commonMistakes": [
      {
        "mistake": "Omitting the dependency array in useEffect.",
        "whyItHappens": "Beginners write `useEffect(() => { ... })` without the `[]` at the end.",
        "howToFix": "If you omit the array, the effect runs after EVERY render! If your effect updates state (like setting fetched data), it triggers a re-render, which triggers the effect, creating an INFINITE LOOP that crashes the browser. Always include `[]`.",
        "incorrectSnippet": "useEffect(() => { setX(1) }); // INFINITE LOOP",
        "correctSnippet": "useEffect(() => { setX(1) }, []); // Runs once"
      }
    ],
    "practice": {
      "title": "Controlled Checkbox",
      "instructions": [
        "Create a state boolean called `isChecked`.",
        "Render an `<input type=\"checkbox\">`.",
        "Bind its `checked` prop to the state, and update state in `onChange`."
      ],
      "starterCode": "// Write your checkbox component\n",
      "hint": "Use `e.target.checked` instead of `e.target.value`.",
      "solutionCode": "function Checkbox() {\n  const [isChecked, setIsChecked] = useState(false);\n  return (\n    <input \n      type=\"checkbox\" \n      checked={isChecked}\n      onChange={(e) => setIsChecked(e.target.checked)}\n    />\n  );\n}"
    },
    "projectConnection": {
      "title": "Task Manager App",
      "description": "Adding new tasks.",
      "howItApplies": "You will use a controlled text input to capture the name of a new task, and `e.preventDefault()` to add it to your list without refreshing the page."
    },
    "quiz": [
      {
        "id": "react-l4-q1",
        "question": "In a controlled component, the input`s `value` is bound to what?",
        "options": [
          "The DOM",
          "A React state variable",
          "A CSS class",
          "The URL"
        ],
        "correctOptionIndex": 1,
        "explanation": "React state acts as the \"single source of truth\" for the input`s value."
      },
      {
        "id": "react-l4-q2",
        "question": "What does `e.preventDefault()` do in a form submission handler?",
        "options": [
          "Validates the input",
          "Sends data to the server",
          "Prevents the default browser behavior of refreshing the page",
          "Clears the form fields"
        ],
        "correctOptionIndex": 2,
        "explanation": "It stops the browser from doing a hard refresh, allowing React to handle the submission."
      },
      {
        "id": "react-l4-q3",
        "question": "What happens if you leave out the dependency array `[]` in `useEffect`?",
        "options": [
          "It never runs",
          "It runs exactly once",
          "It causes a syntax error",
          "It runs after EVERY render, potentially causing an infinite loop"
        ],
        "correctOptionIndex": 3,
        "explanation": "Without the array, React doesn`t know when to skip the effect, so it runs every time."
      }
    ]
  },
  "react-l5": {
    "id": "react-l5",
    "courseSlug": "react",
    "title": "Routing and Custom Hooks",
    "duration": "1h",
    "introduction": "To build a full web application, you need multiple pages (Home, About, Settings) and clean, maintainable architecture. In this final lesson, we explore client-side routing and how to extract logic into Custom Hooks.",
    "learningObjectives": [
      "Understand the concept of a Single Page Application (SPA).",
      "Use React Router to navigate between components without refreshing.",
      "Understand what Custom Hooks are.",
      "Extract complex component logic into reusable hooks."
    ],
    "explanation": [
      {
        "heading": "WHAT is React Router?",
        "paragraphs": [
          "React apps are SPAs (Single Page Applications). The browser only ever loads one HTML file. \"Routing\" means using a library like React Router to swap out which React Components are visible based on the URL bar, faking a multi-page site."
        ]
      },
      {
        "heading": "WHY use Custom Hooks?",
        "paragraphs": [
          "If you have identical complex logic in three different components (e.g., fetching user data, managing a form, or tracking window size), copying and pasting that logic is bad. Custom hooks let you reuse stateful logic."
        ]
      },
      {
        "heading": "HOW to route?",
        "paragraphs": [
          "Instead of `<a href=\"/about\">`, you use `<Link to=\"/about\">`. Instead of the browser making a new request, React Router intercepts the click, updates the URL, and instantly renders the `<About />` component."
        ]
      },
      {
        "heading": "WHEN to write a Custom Hook?",
        "paragraphs": [
          "Whenever you find yourself writing the exact same `useState` and `useEffect` combination in multiple files, extract it into a function that starts with \"use\" (e.g., `useFetch`, `useWindowSize`)."
        ]
      }
    ],
    "codeExample": {
      "language": "tsx",
      "filename": "App.tsx",
      "explanation": "Basic setup for React Router.",
      "code": "import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';\nimport Home from './Home';\nimport About from './About';\n\nexport default function App() {\n  return (\n    <BrowserRouter>\n      <nav>\n        {/* Use Link instead of <a> tags! */}\n        <Link to=\"/\">Home</Link>\n        <Link to=\"/about\">About</Link>\n      </nav>\n      \n      <Routes>\n        {/* Map URLs to Components */}\n        <Route path=\"/\" element={<Home />} />\n        <Route path=\"/about\" element={<About />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}"
    },
    "practicalExample": {
      "title": "A Custom Hook (useToggle)",
      "scenario": "You have modals, dropdowns, and sidebars that all need open/close logic.",
      "explanation": "We create a custom hook that manages the boolean state and provides a simple toggle function.",
      "code": "// useToggle.js\nimport { useState } from 'react';\n\nexport function useToggle(initialValue = false) {\n  const [value, setValue] = useState(initialValue);\n  \n  const toggle = () => setValue(!value);\n  \n  // Return the state and the toggle function\n  return [value, toggle];\n}\n\n// Usage in a component:\n// const [isModalOpen, toggleModal] = useToggle(false);"
    },
    "commonMistakes": [
      {
        "mistake": "Using <a> tags instead of <Link>.",
        "whyItHappens": "Muscle memory from writing standard HTML.",
        "howToFix": "If you use `<a href=\"...\">`, the browser will do a full page refresh, losing all your React state! Always import and use `<Link to=\"...\">` from `react-router-dom` for internal navigation.",
        "incorrectSnippet": "<a href=\"/dashboard\">Go</a>",
        "correctSnippet": "<Link to=\"/dashboard\">Go</Link>"
      }
    ],
    "practice": {
      "title": "Write a Custom Hook",
      "instructions": [
        "Write a custom hook called `useCounter`.",
        "It should manage a `count` state.",
        "It should return an object `{ count, increment }`."
      ],
      "starterCode": "// Write your custom hook\n",
      "hint": "Use useState inside your custom hook function.",
      "solutionCode": "import { useState } from 'react';\n\nexport function useCounter(initial = 0) {\n  const [count, setCount] = useState(initial);\n  const increment = () => setCount(count + 1);\n  return { count, increment };\n}"
    },
    "projectConnection": {
      "title": "Task Manager App",
      "description": "Polishing the architecture.",
      "howItApplies": "You will create a `useTasks` custom hook to handle all the adding, deleting, and editing logic, keeping your UI components perfectly clean and readable."
    },
    "quiz": [
      {
        "id": "react-l5-q1",
        "question": "In a React Single Page Application (SPA), how many HTML files are typically loaded by the browser?",
        "options": [
          "One for every route",
          "One",
          "Zero",
          "Depends on the backend"
        ],
        "correctOptionIndex": 1,
        "explanation": "An SPA loads a single index.html file; React swaps the UI components dynamically."
      },
      {
        "id": "react-l5-q2",
        "question": "What component should you use for internal navigation in React Router?",
        "options": [
          "<a>",
          "<Navigate>",
          "<Link>",
          "<Route>"
        ],
        "correctOptionIndex": 2,
        "explanation": "`<Link>` navigates without triggering a full browser page refresh."
      },
      {
        "id": "react-l5-q3",
        "question": "What is a Custom Hook fundamentally?",
        "options": [
          "A special React class",
          "A new HTML element",
          "A built-in method",
          "A standard JavaScript function that calls other hooks"
        ],
        "correctOptionIndex": 3,
        "explanation": "It is just a normal JS function whose name starts with \"use\" and calls other hooks (like useState)."
      }
    ]
  }
};
