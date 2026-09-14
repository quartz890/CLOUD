import { Course } from '../types';

export const COURSES: Course[] = [
  {
    "id": "course-html",
    "title": "HTML",
    "slug": "html",
    "shortDescription": "Master the building blocks of the web, from basic text structure to advanced semantic landmarks.",
    "fullDescription": "HTML is the foundational language of the web. This course takes you from absolute beginner to confident developer. You will learn how to structure documents, embed media, create interactive forms, and write semantic, accessible markup that search engines and screen readers love.",
    "difficulty": "Beginner",
    "duration": "5 hours",
    "lessonsCount": 5,
    "iconName": "html",
    "accentColor": {
      "bg": "bg-orange-50",
      "text": "text-orange-600",
      "border": "border-orange-200",
      "badge": "bg-orange-100 text-orange-800",
      "ring": "focus:ring-orange-400",
      "hoverBorder": "hover:border-orange-300"
    },
    "topics": [
      "Document Structure",
      "Links & Images",
      "Forms & Inputs",
      "Semantic HTML",
      "Accessibility"
    ],
    "modules": [
      {
        "id": "html-m1",
        "title": "Very Beginner: Fundamentals",
        "duration": "1h",
        "summary": "Start from scratch.",
        "lessons": [
          {
            "id": "html-l1",
            "title": "Document Structure & Basic Elements",
            "duration": "1h",
            "description": "Understand how the web works and build your first HTML boilerplate."
          }
        ]
      },
      {
        "id": "html-m2",
        "title": "Beginner: Linking and Media",
        "duration": "1h",
        "summary": "Connect pages.",
        "lessons": [
          {
            "id": "html-l2",
            "title": "Links, Images, and Lists",
            "duration": "1h",
            "description": "Create hyperlinks, embed images, and organize content."
          }
        ]
      },
      {
        "id": "html-m3",
        "title": "Easy Intermediate: User Input",
        "duration": "1h",
        "summary": "Collect data.",
        "lessons": [
          {
            "id": "html-l3",
            "title": "Forms, Inputs, and Buttons",
            "duration": "1h",
            "description": "Master various input types and create standard forms."
          }
        ]
      },
      {
        "id": "html-m4",
        "title": "Intermediate: Structure and Meaning",
        "duration": "1h",
        "summary": "Professional HTML.",
        "lessons": [
          {
            "id": "html-l4",
            "title": "Semantic HTML & Accessibility",
            "duration": "1h",
            "description": "Use header, nav, main, article to define page zones and ensure a11y."
          }
        ]
      },
      {
        "id": "html-m5",
        "title": "Advanced Concepts: Beyond the Body",
        "duration": "1h",
        "summary": "The unseen parts.",
        "lessons": [
          {
            "id": "html-l5",
            "title": "Multimedia, Meta Tags & SEO",
            "duration": "1h",
            "description": "Embed audio/video and optimize for search engines."
          }
        ]
      }
    ],
    "targetAudience": "Absolute beginners wanting to build their first webpage."
  },
  {
    "id": "course-css",
    "title": "CSS",
    "slug": "css",
    "shortDescription": "Style your web pages with beautiful colors, typography, and responsive layouts.",
    "fullDescription": "CSS transforms plain HTML into stunning, interactive websites. Starting with basic colors and fonts, you will progress to mastering the box model, Flexbox, CSS Grid, and responsive design, allowing you to build layouts that look great on any device.",
    "difficulty": "Beginner to Intermediate",
    "duration": "5 hours",
    "lessonsCount": 5,
    "iconName": "css",
    "accentColor": {
      "bg": "bg-sky-50",
      "text": "text-sky-600",
      "border": "border-sky-200",
      "badge": "bg-sky-100 text-sky-800",
      "ring": "focus:ring-sky-400",
      "hoverBorder": "hover:border-sky-300"
    },
    "topics": [
      "Selectors & Colors",
      "Typography",
      "The Box Model",
      "Flexbox & Grid",
      "Responsive Design"
    ],
    "modules": [
      {
        "id": "css-m1",
        "title": "Very Beginner: Style Basics",
        "duration": "1h",
        "summary": "Apply styles.",
        "lessons": [
          {
            "id": "css-l1",
            "title": "Selectors, Properties, and Colors",
            "duration": "1h",
            "description": "Target HTML elements and bring them to life with color."
          }
        ]
      },
      {
        "id": "css-m2",
        "title": "Beginner: Spacing and Text",
        "duration": "1h",
        "summary": "Control typography.",
        "lessons": [
          {
            "id": "css-l2",
            "title": "Typography and The Box Model",
            "duration": "1h",
            "description": "Style fonts and master margins, padding, and borders."
          }
        ]
      },
      {
        "id": "css-m3",
        "title": "Easy Intermediate: Layout Fundamentals",
        "duration": "1h",
        "summary": "Move elements.",
        "lessons": [
          {
            "id": "css-l3",
            "title": "Positioning and Display",
            "duration": "1h",
            "description": "Understand block, inline, relative, and absolute positioning."
          }
        ]
      },
      {
        "id": "css-m4",
        "title": "Intermediate: Modern Layouts",
        "duration": "1h",
        "summary": "Complex alignments.",
        "lessons": [
          {
            "id": "css-l4",
            "title": "Flexbox and Grid",
            "duration": "1h",
            "description": "Build one-dimensional and two-dimensional layouts effortlessly."
          }
        ]
      },
      {
        "id": "css-m5",
        "title": "Advanced Concepts: Responsive & Dynamic",
        "duration": "1h",
        "summary": "Adapt to screens.",
        "lessons": [
          {
            "id": "css-l5",
            "title": "Responsive Design & Animations",
            "duration": "1h",
            "description": "Use media queries for mobile and add smooth transitions."
          }
        ]
      }
    ],
    "targetAudience": "Learners who want to make their plain HTML pages look professional."
  },
  {
    "id": "course-javascript",
    "title": "JavaScript",
    "slug": "javascript",
    "shortDescription": "Add logic and interactivity to your websites with the programming language of the web.",
    "fullDescription": "JavaScript turns static pages into dynamic applications. You will start from the absolute basics of variables and data types, progress through logic and functions, and eventually master interacting with the page (DOM) and fetching data from the internet.",
    "difficulty": "Intermediate",
    "duration": "5 hours",
    "lessonsCount": 5,
    "iconName": "javascript",
    "accentColor": {
      "bg": "bg-amber-50",
      "text": "text-amber-600",
      "border": "border-amber-200",
      "badge": "bg-amber-100 text-amber-900",
      "ring": "focus:ring-amber-400",
      "hoverBorder": "hover:border-amber-300"
    },
    "topics": [
      "Variables & Types",
      "Logic & Loops",
      "Functions & Objects",
      "DOM Manipulation",
      "Async & APIs"
    ],
    "modules": [
      {
        "id": "js-m1",
        "title": "Very Beginner: The Core Basics",
        "duration": "1h",
        "summary": "Store data.",
        "lessons": [
          {
            "id": "js-l1",
            "title": "Variables, Data Types, and Output",
            "duration": "1h",
            "description": "Store information in memory and output it to the console."
          }
        ]
      },
      {
        "id": "js-m2",
        "title": "Beginner: Logic and Control Flow",
        "duration": "1h",
        "summary": "Make decisions.",
        "lessons": [
          {
            "id": "js-l2",
            "title": "Conditionals and Loops",
            "duration": "1h",
            "description": "Run different code based on conditions and repeat actions."
          }
        ]
      },
      {
        "id": "js-m3",
        "title": "Easy Intermediate: Structuring Data",
        "duration": "1h",
        "summary": "Group logic.",
        "lessons": [
          {
            "id": "js-l3",
            "title": "Functions, Arrays, and Objects",
            "duration": "1h",
            "description": "Write reusable blocks of code and store collections of data."
          }
        ]
      },
      {
        "id": "js-m4",
        "title": "Intermediate: Interacting with the Web",
        "duration": "1h",
        "summary": "Interactive HTML.",
        "lessons": [
          {
            "id": "js-l4",
            "title": "DOM Manipulation and Events",
            "duration": "1h",
            "description": "Select elements and respond to user clicks and typing."
          }
        ]
      },
      {
        "id": "js-m5",
        "title": "Advanced Concepts: Modern JavaScript",
        "duration": "1h",
        "summary": "External data.",
        "lessons": [
          {
            "id": "js-l5",
            "title": "Array Methods, Async/Await, and APIs",
            "duration": "1h",
            "description": "Transform data elegantly and fetch live data from servers."
          }
        ]
      }
    ],
    "targetAudience": "Anyone who wants to learn programming logic and make interactive websites."
  },
  {
    "id": "course-react",
    "title": "React",
    "slug": "react",
    "shortDescription": "Build fast, scalable user interfaces using the industry-standard component library.",
    "fullDescription": "React changes how you think about building UIs. Instead of manipulating the DOM directly, you will build encapsulated components that manage their own state. You will progress from basic JSX to state management, side effects, and routing.",
    "difficulty": "Intermediate to Advanced",
    "duration": "5 hours",
    "lessonsCount": 5,
    "iconName": "react",
    "accentColor": {
      "bg": "bg-cyan-50",
      "text": "text-cyan-600",
      "border": "border-cyan-200",
      "badge": "bg-cyan-100 text-cyan-800",
      "ring": "focus:ring-cyan-400",
      "hoverBorder": "hover:border-cyan-300"
    },
    "topics": [
      "Components & JSX",
      "Props & State",
      "Events & Forms",
      "Hooks (useEffect)",
      "Routing"
    ],
    "modules": [
      {
        "id": "react-m1",
        "title": "Very Beginner: React Foundations",
        "duration": "1h",
        "summary": "Core philosophy.",
        "lessons": [
          {
            "id": "react-l1",
            "title": "Components and JSX",
            "duration": "1h",
            "description": "Understand the virtual DOM and write HTML inside JavaScript."
          }
        ]
      },
      {
        "id": "react-m2",
        "title": "Beginner: Data Flow",
        "duration": "1h",
        "summary": "Interactive components.",
        "lessons": [
          {
            "id": "react-l2",
            "title": "Props and State (useState)",
            "duration": "1h",
            "description": "Pass data between components and manage local memory."
          }
        ]
      },
      {
        "id": "react-m3",
        "title": "Easy Intermediate: Dynamic UI",
        "duration": "1h",
        "summary": "Handle interactions.",
        "lessons": [
          {
            "id": "react-l3",
            "title": "Events, Conditional Rendering, and Lists",
            "duration": "1h",
            "description": "Respond to events, show/hide elements, and render arrays."
          }
        ]
      },
      {
        "id": "react-m4",
        "title": "Intermediate: Forms and Side Effects",
        "duration": "1h",
        "summary": "Outside world.",
        "lessons": [
          {
            "id": "react-l4",
            "title": "Controlled Forms and useEffect",
            "duration": "1h",
            "description": "Manage inputs and run code after rendering (e.g. fetching)."
          }
        ]
      },
      {
        "id": "react-m5",
        "title": "Advanced Concepts: App Architecture",
        "duration": "1h",
        "summary": "Scale applications.",
        "lessons": [
          {
            "id": "react-l5",
            "title": "Routing and Custom Hooks",
            "duration": "1h",
            "description": "Navigate between pages and extract complex reusable logic."
          }
        ]
      }
    ],
    "targetAudience": "Developers who know JS and want to build scalable frontend applications."
  },
  {
    "id": "course-python",
    "title": "Python",
    "slug": "python",
    "shortDescription": "Learn the most versatile programming language for web backend, automation, and data.",
    "fullDescription": "Python is famous for its clean, readable syntax. Starting from zero, you will learn data types, control flow, functions, and data structures. By the end, you will understand file handling, modules, and Object-Oriented Programming (OOP).",
    "difficulty": "Beginner",
    "duration": "5 hours",
    "lessonsCount": 5,
    "iconName": "python",
    "accentColor": {
      "bg": "bg-emerald-50",
      "text": "text-emerald-600",
      "border": "border-emerald-200",
      "badge": "bg-emerald-100 text-emerald-800",
      "ring": "focus:ring-emerald-400",
      "hoverBorder": "hover:border-emerald-300"
    },
    "topics": [
      "Syntax Basics",
      "Logic & Loops",
      "Data Structures",
      "File Handling",
      "Object-Oriented Programming"
    ],
    "modules": [
      {
        "id": "py-m1",
        "title": "Very Beginner: Python Basics",
        "duration": "1h",
        "summary": "First scripts.",
        "lessons": [
          {
            "id": "py-l1",
            "title": "Variables, Data Types, and I/O",
            "duration": "1h",
            "description": "Store values, perform math, and accept user input."
          }
        ]
      },
      {
        "id": "py-m2",
        "title": "Beginner: Control Flow",
        "duration": "1h",
        "summary": "Execution path.",
        "lessons": [
          {
            "id": "py-l2",
            "title": "Conditions and Loops",
            "duration": "1h",
            "description": "Make decisions with if/else and automate tasks with for/while."
          }
        ]
      },
      {
        "id": "py-m3",
        "title": "Easy Intermediate: Functions & Collections",
        "duration": "1h",
        "summary": "Organize data.",
        "lessons": [
          {
            "id": "py-l3",
            "title": "Functions, Lists, and Dictionaries",
            "duration": "1h",
            "description": "Group code into blocks and store ordered/keyed collections."
          }
        ]
      },
      {
        "id": "py-m4",
        "title": "Intermediate: Working with Files & Errors",
        "duration": "1h",
        "summary": "Operating system.",
        "lessons": [
          {
            "id": "py-l4",
            "title": "File Handling and Exceptions",
            "duration": "1h",
            "description": "Read/write text files and prevent crashes with try/except."
          }
        ]
      },
      {
        "id": "py-m5",
        "title": "Advanced Concepts: Architecture",
        "duration": "1h",
        "summary": "Complex apps.",
        "lessons": [
          {
            "id": "py-l5",
            "title": "OOP and APIs",
            "duration": "1h",
            "description": "Create custom classes and fetch data from web servers."
          }
        ]
      }
    ],
    "targetAudience": "Beginners looking for an intuitive and powerful first language."
  }
];
