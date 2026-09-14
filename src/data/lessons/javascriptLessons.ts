import { LessonDetail } from '../types';

export const JAVASCRIPT_LESSONS: Record<string, LessonDetail> = {
  "js-l1": {
    "id": "js-l1",
    "courseSlug": "javascript",
    "title": "Variables, Data Types, and Output",
    "duration": "1h",
    "introduction": "Welcome to JavaScript, the programming language of the web! While HTML provides structure and CSS provides style, JavaScript provides logic and interactivity. We begin by learning how to store information and print it out.",
    "learningObjectives": [
      "Understand what variables are and how to declare them.",
      "Learn the difference between let and const.",
      "Identify basic data types (strings, numbers, booleans).",
      "Use console.log to output data."
    ],
    "explanation": [
      {
        "heading": "WHAT is a Variable?",
        "paragraphs": [
          "A variable is like a named box in your computer's memory where you can store data. You give the box a name, put something inside it, and can look inside the box later."
        ]
      },
      {
        "heading": "WHY use let vs const?",
        "paragraphs": [
          "In modern JS, we use `const` for values that will NEVER change (constant). We use `let` for values that might change later. We no longer use `var`."
        ]
      },
      {
        "heading": "HOW to check output?",
        "paragraphs": [
          "Since JavaScript runs in the browser, we use `console.log()` to print messages to the Developer Tools Console. This is how programmers check if their code is working."
        ]
      },
      {
        "heading": "WHEN to use different data types?",
        "paragraphs": [
          "Use Strings (text wrapped in quotes) for names and messages. Use Numbers (no quotes) for math. Use Booleans (`true` or `false`) for yes/no states."
        ]
      }
    ],
    "codeExample": {
      "language": "javascript",
      "filename": "variables.js",
      "explanation": "Declaring variables and printing them to the console.",
      "code": "// A constant variable (cannot be reassigned)\nconst playerName = \"Alice\";\n\n// A variable that can change\nlet score = 0;\n\n// A boolean (true or false)\nlet isGameOver = false;\n\nconsole.log(playerName); // Prints: Alice\nconsole.log(score);      // Prints: 0\n\n// Changing the score later\nscore = 10;"
    },
    "practicalExample": {
      "title": "A Simple Shopping Cart Total",
      "scenario": "You need to calculate the total price of items with tax.",
      "explanation": "We store the price and tax rate in variables, perform math using the `*` and `+` operators, and log the result.",
      "code": "const itemPrice = 50;\nconst taxRate = 0.10; // 10%\n\nlet taxAmount = itemPrice * taxRate;\nlet finalTotal = itemPrice + taxAmount;\n\nconsole.log(\"Your total is: \" + finalTotal);"
    },
    "commonMistakes": [
      {
        "mistake": "Trying to change a const variable.",
        "whyItHappens": "Beginners use const for everything, then try to update it.",
        "howToFix": "If you expect the value to change (like a score or a counter), you must declare it with `let`.",
        "incorrectSnippet": "const score = 10;\nscore = 20; // Error!",
        "correctSnippet": "let score = 10;\nscore = 20; // Works!"
      }
    ],
    "practice": {
      "title": "Declare Your Details",
      "instructions": [
        "Declare a const variable for your name.",
        "Declare a let variable for your age.",
        "Log both to the console."
      ],
      "starterCode": "// Write your code below\n\n",
      "hint": "Use const for name, let for age, and console.log().",
      "solutionCode": "const myName = \"Sarah\";\nlet myAge = 25;\nconsole.log(myName);\nconsole.log(myAge);"
    },
    "projectConnection": {
      "title": "Interactive Quiz Project",
      "description": "Keeping track of user data.",
      "howItApplies": "You will use variables to keep track of the user's current score and their name as they play your game."
    },
    "quiz": [
      {
        "id": "js-l1-q1",
        "question": "Which keyword should you use for a variable that will NOT change?",
        "options": [
          "let",
          "var",
          "const",
          "static"
        ],
        "correctOptionIndex": 2,
        "explanation": "`const` stands for constant, meaning it cannot be reassigned."
      },
      {
        "id": "js-l1-q2",
        "question": "What is the correct way to print \"Hello\" to the developer console?",
        "options": [
          "print(\"Hello\");",
          "console.log(\"Hello\");",
          "document.write(\"Hello\");",
          "echo \"Hello\";"
        ],
        "correctOptionIndex": 1,
        "explanation": "`console.log()` is the standard way to print output in JS."
      },
      {
        "id": "js-l1-q3",
        "question": "Which of the following is a Boolean data type?",
        "options": [
          "\"true\"",
          "1",
          "true",
          "\"yes\""
        ],
        "correctOptionIndex": 2,
        "explanation": "`true` (without quotes) is a boolean. `\"true\"` (with quotes) is a string."
      }
    ]
  },
  "js-l2": {
    "id": "js-l2",
    "courseSlug": "javascript",
    "title": "Conditionals and Loops",
    "duration": "1h",
    "introduction": "Programs need to make decisions and repeat tasks. In this lesson, we learn how to control the flow of our JavaScript using if/else statements and loops.",
    "learningObjectives": [
      "Write if/else statements to execute code conditionally.",
      "Use comparison operators (===, >, <, !==).",
      "Write a for loop to repeat an action a specific number of times.",
      "Write a while loop to repeat an action until a condition is false."
    ],
    "explanation": [
      {
        "heading": "WHAT are Conditionals?",
        "paragraphs": [
          "Conditionals (`if`, `else if`, `else`) allow your code to ask questions. \"If the user is logged in, show the dashboard. Else, show the login screen.\""
        ]
      },
      {
        "heading": "WHY use Loops?",
        "paragraphs": [
          "Computers are great at doing boring things very fast. If you need to print 100 numbers, you do not write `console.log()` 100 times; you write a loop that runs 100 times."
        ]
      },
      {
        "heading": "HOW to compare values?",
        "paragraphs": [
          "Use `===` to check if two things are exactly equal. (Never use `==`, it causes weird bugs). Use `>` for greater than, and `<` for less than."
        ]
      },
      {
        "heading": "WHEN to use for vs while?",
        "paragraphs": [
          "Use a `for` loop when you know exactly how many times you want to repeat (e.g., \"count to 10\"). Use a `while` loop when you want to repeat until something happens (e.g., \"keep asking until the user types the correct password\")."
        ]
      }
    ],
    "codeExample": {
      "language": "javascript",
      "filename": "logic.js",
      "explanation": "An if/else statement and a simple for loop.",
      "code": "const userAge = 18;\n\n// Conditional\nif (userAge >= 18) {\n  console.log(\"You can vote!\");\n} else {\n  console.log(\"You are too young to vote.\");\n}\n\n// For Loop: Count from 1 to 5\n// (start; condition; step)\nfor (let i = 1; i <= 5; i++) {\n  console.log(\"Number: \" + i);\n}"
    },
    "practicalExample": {
      "title": "Checking a Password",
      "scenario": "You want to check if a provided password is correct and long enough.",
      "explanation": "We combine conditions using `&&` (AND). Both sides must be true for the code block to run.",
      "code": "const password = \"secret123\";\n\nif (password === \"secret123\" && password.length >= 8) {\n  console.log(\"Access Granted!\");\n} else {\n  console.log(\"Access Denied!\");\n}"
    },
    "commonMistakes": [
      {
        "mistake": "Using = instead of === in an if statement.",
        "whyItHappens": "In math, `=` means equals. In JS, `=` means assignment (give this variable a value).",
        "howToFix": "Always use `===` (triple equals) when comparing two values in an `if` statement.",
        "incorrectSnippet": "if (age = 18) { ... }",
        "correctSnippet": "if (age === 18) { ... }"
      }
    ],
    "practice": {
      "title": "Write a Countdown Loop",
      "instructions": [
        "Write a for loop that starts at 5 and counts down to 1.",
        "Inside the loop, console.log the number.",
        "After the loop, console.log \"Blastoff!\"."
      ],
      "starterCode": "// Write your loop here\n\n",
      "hint": "Your loop should start with `let i = 5`, condition `i >= 1`, and step `i--`.",
      "solutionCode": "for (let i = 5; i >= 1; i--) {\n  console.log(i);\n}\nconsole.log(\"Blastoff!\");"
    },
    "projectConnection": {
      "title": "Interactive Quiz Project",
      "description": "Checking answers.",
      "howItApplies": "You will use an `if` statement to check if the user clicked the correct answer, and increase their score if they did."
    },
    "quiz": [
      {
        "id": "js-l2-q1",
        "question": "Which operator means \"strictly equal to\"?",
        "options": [
          "=",
          "==",
          "===",
          "!=="
        ],
        "correctOptionIndex": 2,
        "explanation": "`===` checks if both the value and the type are exactly equal."
      },
      {
        "id": "js-l2-q2",
        "question": "How do you check if BOTH condition A and condition B are true?",
        "options": [
          "A || B",
          "A && B",
          "A + B",
          "A == B"
        ],
        "correctOptionIndex": 1,
        "explanation": "`&&` is the logical AND operator."
      },
      {
        "id": "js-l2-q3",
        "question": "In `for (let i = 0; i < 5; i++)`, what does `i++` do?",
        "options": [
          "Multiplies i by 2",
          "Adds 1 to i",
          "Subtracts 1 from i",
          "Stops the loop"
        ],
        "correctOptionIndex": 1,
        "explanation": "`i++` is shorthand for `i = i + 1`."
      }
    ]
  },
  "js-l3": {
    "id": "js-l3",
    "courseSlug": "javascript",
    "title": "Functions, Arrays, and Objects",
    "duration": "1h",
    "introduction": "As programs grow, writing everything in one big list gets messy. We need to group code into Functions, and group data into Arrays and Objects.",
    "learningObjectives": [
      "Define and call functions with parameters and return values.",
      "Store lists of data in Arrays and access them by index.",
      "Store complex data in Objects using key-value pairs.",
      "Combine arrays and objects."
    ],
    "explanation": [
      {
        "heading": "WHAT are Functions, Arrays, and Objects?",
        "paragraphs": [
          "Functions are reusable blocks of code. Arrays are ordered lists of data. Objects are collections of related data labeled with keys."
        ]
      },
      {
        "heading": "WHY group data?",
        "paragraphs": [
          "If you have 100 users, you don't want 100 variables. You want ONE array containing 100 objects. If you need to calculate tax in 5 different places, you write ONE function and reuse it."
        ]
      },
      {
        "heading": "HOW to use Arrays?",
        "paragraphs": [
          "Arrays use square brackets `[]`. You access items using their index, which starts at `0`. So `myArray[0]` gets the first item."
        ]
      },
      {
        "heading": "WHEN to use Objects?",
        "paragraphs": [
          "Use Objects (curly braces `{}`) when data has specific properties. Instead of an array `[\"Alice\", 25, true]`, use an object `{ name: \"Alice\", age: 25, isAdmin: true }` so the data is labeled."
        ]
      }
    ],
    "codeExample": {
      "language": "javascript",
      "filename": "data.js",
      "explanation": "A function that takes an object and an array.",
      "code": "// An Array\nconst colors = [\"red\", \"green\", \"blue\"];\nconsole.log(colors[0]); // Prints: red\n\n// An Object\nconst user = {\n  name: \"Alice\",\n  age: 25\n};\nconsole.log(user.name); // Prints: Alice\n\n// A Function\nfunction greet(personName) {\n  return \"Hello, \" + personName;\n}\n\n// Calling the function\nlet message = greet(user.name);\nconsole.log(message); // Prints: Hello, Alice"
    },
    "practicalExample": {
      "title": "An Array of Objects",
      "scenario": "You are building an e-commerce site and need a list of products.",
      "explanation": "Combining arrays and objects is the most common data structure in all of programming.",
      "code": "const cart = [\n  { id: 1, name: \"Apple\", price: 1.50 },\n  { id: 2, name: \"Banana\", price: 0.50 }\n];\n\n// Get the price of the first item\nconsole.log(cart[0].price); // Prints: 1.5"
    },
    "commonMistakes": [
      {
        "mistake": "Forgetting that arrays are zero-indexed.",
        "whyItHappens": "Humans count starting from 1. Computers count starting from 0.",
        "howToFix": "Always remember that the first item in `list` is `list[0]`, the second is `list[1]`, etc.",
        "incorrectSnippet": "let firstColor = colors[1]; // Gets the SECOND color!",
        "correctSnippet": "let firstColor = colors[0]; // Gets the FIRST color."
      }
    ],
    "practice": {
      "title": "Write a Function",
      "instructions": [
        "Write a function named `multiply` that takes two parameters: `a` and `b`.",
        "Make the function `return` the result of `a * b`.",
        "Call the function with 5 and 4, and log the result."
      ],
      "starterCode": "// Write your function here\n",
      "hint": "function multiply(a, b) { ... }",
      "solutionCode": "function multiply(a, b) {\n  return a * b;\n}\n\nlet result = multiply(5, 4);\nconsole.log(result);"
    },
    "projectConnection": {
      "title": "Interactive Quiz Project",
      "description": "Structuring the questions.",
      "howItApplies": "Your entire quiz will be an Array of Objects, where each object holds a question, the options, and the correct answer."
    },
    "quiz": [
      {
        "id": "js-l3-q1",
        "question": "How do you access the first item in an array called `fruits`?",
        "options": [
          "fruits[1]",
          "fruits.first",
          "fruits[0]",
          "fruits(0)"
        ],
        "correctOptionIndex": 2,
        "explanation": "Arrays are zero-indexed, so `[0]` gets the first item."
      },
      {
        "id": "js-l3-q2",
        "question": "What keyword sends a value back out of a function?",
        "options": [
          "output",
          "return",
          "export",
          "send"
        ],
        "correctOptionIndex": 1,
        "explanation": "The `return` keyword stops the function and outputs the specified value."
      },
      {
        "id": "js-l3-q3",
        "question": "Which syntax creates an Object?",
        "options": [
          "{ name: \"John\" }",
          "[\"John\"]",
          "( name: \"John\" )",
          "< name=\"John\" >"
        ],
        "correctOptionIndex": 0,
        "explanation": "Objects are created using curly braces `{}` and key-value pairs."
      }
    ]
  },
  "js-l4": {
    "id": "js-l4",
    "courseSlug": "javascript",
    "title": "DOM Manipulation and Events",
    "duration": "1h",
    "introduction": "So far, our JavaScript has only lived in the hidden console. Now it is time to interact with the actual webpage. We will learn how to read HTML, change it, and respond to user clicks.",
    "learningObjectives": [
      "Understand the DOM (Document Object Model).",
      "Select HTML elements using document.querySelector.",
      "Change text, styles, and classes using JS.",
      "Attach Event Listeners to respond to clicks and typing."
    ],
    "explanation": [
      {
        "heading": "WHAT is the DOM?",
        "paragraphs": [
          "When the browser loads your HTML, it creates a JavaScript representation of it called the Document Object Model (DOM). You can use JS to change this model, which instantly updates the screen."
        ]
      },
      {
        "heading": "WHY use Event Listeners?",
        "paragraphs": [
          "JavaScript is event-driven. You don't want a script to run immediately and then stop. You want it to wait patiently for the user to do something—like clicking a button—and THEN run code."
        ]
      },
      {
        "heading": "HOW to select elements?",
        "paragraphs": [
          "Use `document.querySelector(\".my-class\")` to find an element using CSS selector syntax. Then you can change its `textContent` or `style`."
        ]
      },
      {
        "heading": "WHEN to use addEventListener?",
        "paragraphs": [
          "Always use `addEventListener` instead of adding `onclick` attributes directly into your HTML. It keeps your JS separate from your HTML, which is cleaner and safer."
        ]
      }
    ],
    "codeExample": {
      "language": "javascript",
      "filename": "dom.js",
      "explanation": "Selecting a button and a paragraph, and changing the paragraph when the button is clicked.",
      "code": "// 1. Select the elements\nconst myButton = document.querySelector(\"#btn\");\nconst myText = document.querySelector(\".message\");\n\n// 2. Define the action (Function)\nfunction handleClick() {\n  myText.textContent = \"You clicked the button!\";\n  myText.style.color = \"red\";\n}\n\n// 3. Attach the event listener\nmyButton.addEventListener(\"click\", handleClick);"
    },
    "practicalExample": {
      "title": "A Dark Mode Toggle",
      "scenario": "You want a button that switches the whole page to dark mode.",
      "explanation": "Instead of changing inline styles, it is much better to use JS to add a `.dark-mode` class to the body, and let CSS do the actual styling work.",
      "code": "const themeBtn = document.querySelector(\"#theme-btn\");\n\nthemeBtn.addEventListener(\"click\", function() {\n  // toggle() adds the class if it's missing, or removes it if it's there\n  document.body.classList.toggle(\"dark-mode\");\n});"
    },
    "commonMistakes": [
      {
        "mistake": "Executing the function in the event listener.",
        "whyItHappens": "Beginners write `addEventListener(\"click\", handleClick())` with parentheses.",
        "howToFix": "Pass the function name WITHOUT parentheses. If you use `()`, the function runs immediately when the page loads, not when the click happens!",
        "incorrectSnippet": "btn.addEventListener(\"click\", doThing());",
        "correctSnippet": "btn.addEventListener(\"click\", doThing);"
      }
    ],
    "practice": {
      "title": "Update a Heading",
      "instructions": [
        "Use `document.querySelector` to select the `h1` element.",
        "Change its `textContent` to \"JavaScript is Awesome!\"."
      ],
      "starterCode": "// Select and update the h1\n",
      "hint": "Select \"h1\", then access the .textContent property.",
      "solutionCode": "const heading = document.querySelector(\"h1\");\nheading.textContent = \"JavaScript is Awesome!\";"
    },
    "projectConnection": {
      "title": "Interactive Quiz Project",
      "description": "Making the buttons work.",
      "howItApplies": "You will attach event listeners to the multiple-choice buttons so that clicking them triggers the answer-checking function."
    },
    "quiz": [
      {
        "id": "js-l4-q1",
        "question": "Which method selects the FIRST element that matches a CSS selector?",
        "options": [
          "document.getSelector()",
          "document.querySelector()",
          "document.find()",
          "document.getAll()"
        ],
        "correctOptionIndex": 1,
        "explanation": "`querySelector` uses standard CSS selectors to find the first matching element."
      },
      {
        "id": "js-l4-q2",
        "question": "How should you pass a function named `sayHello` to an event listener?",
        "options": [
          "btn.addEventListener(\"click\", sayHello());",
          "btn.addEventListener(\"click\", \"sayHello\");",
          "btn.addEventListener(\"click\", sayHello);",
          "btn.onClick(sayHello);"
        ],
        "correctOptionIndex": 2,
        "explanation": "Pass the function reference without parentheses so it executes LATER, on click."
      },
      {
        "id": "js-l4-q3",
        "question": "Which property safely changes the text inside an HTML element?",
        "options": [
          "innerHTML",
          "textContent",
          "value",
          "text"
        ],
        "correctOptionIndex": 1,
        "explanation": "`textContent` is the safest and standard way to change text (avoiding XSS vulnerabilities associated with innerHTML)."
      }
    ]
  },
  "js-l5": {
    "id": "js-l5",
    "courseSlug": "javascript",
    "title": "Array Methods, Async/Await, and APIs",
    "duration": "1h",
    "introduction": "In the modern web, JavaScript rarely works alone. It talks to external servers to fetch live data (like weather or stock prices). In this advanced lesson, we master asynchronous JS and modern array manipulation.",
    "learningObjectives": [
      "Use array methods like .map() and .filter().",
      "Understand the concept of Asynchronous code.",
      "Use async and await to handle Promises.",
      "Fetch data from an external API."
    ],
    "explanation": [
      {
        "heading": "WHAT is Asynchronous Code?",
        "paragraphs": [
          "Normally, JS executes line by line (synchronous). But fetching data from a server takes time. Asynchronous code allows JS to pause and wait for the data to arrive without freezing the whole website."
        ]
      },
      {
        "heading": "WHY use map and filter?",
        "paragraphs": [
          "Instead of writing clunky `for` loops, modern JS uses `.map()` to transform an array into a new array, and `.filter()` to keep only items that match a condition."
        ]
      },
      {
        "heading": "HOW to use fetch()?",
        "paragraphs": [
          "The `fetch()` function requests data from a URL. Because it takes time, it returns a \"Promise\". We use the `await` keyword to pause our function until the Promise resolves with the data."
        ]
      },
      {
        "heading": "WHEN to use async?",
        "paragraphs": [
          "Any function that uses the `await` keyword MUST be labeled with the `async` keyword at the very beginning of the function declaration."
        ]
      }
    ],
    "codeExample": {
      "language": "javascript",
      "filename": "async.js",
      "explanation": "Fetching a random user from a public API and printing their name.",
      "code": "// The function must be labeled 'async'\nasync function getRandomUser() {\n  try {\n    // Await the server response\n    const response = await fetch(\"https://randomuser.me/api/\");\n    // Await the parsing of the JSON data\n    const data = await response.json();\n    \n    // Access the data\n    const user = data.results[0];\n    console.log(\"Name: \" + user.name.first);\n  } catch (error) {\n    console.log(\"Something went wrong!\", error);\n  }\n}\n\ngetRandomUser();"
    },
    "practicalExample": {
      "title": "Filtering High Scores",
      "scenario": "You have an array of scores and only want to keep the ones above 50.",
      "explanation": "Using `.filter()` makes this a one-liner. It returns a brand new array.",
      "code": "const scores = [20, 85, 40, 95, 10];\n\n// Keep only scores greater than 50\nconst highScores = scores.filter(score => score > 50);\n\nconsole.log(highScores); // Prints: [85, 95]"
    },
    "commonMistakes": [
      {
        "mistake": "Forgetting to await the .json() parsing.",
        "whyItHappens": "Beginners remember to `await fetch()`, but forget that parsing the data into JSON is ALSO an asynchronous operation.",
        "howToFix": "Always write `const data = await response.json();` with the await keyword.",
        "incorrectSnippet": "const data = response.json();",
        "correctSnippet": "const data = await response.json();"
      }
    ],
    "practice": {
      "title": "Map Array to Names",
      "instructions": [
        "You have an array of user objects.",
        "Use `.map()` to create a new array containing ONLY their names."
      ],
      "starterCode": "const users = [{name: \"Ali\"}, {name: \"Ben\"}];\n// Create an array called 'names' using .map()\n",
      "hint": "users.map(user => user.name)",
      "solutionCode": "const users = [{name: \"Ali\"}, {name: \"Ben\"}];\nconst names = users.map(user => user.name);\nconsole.log(names); // [\"Ali\", \"Ben\"]"
    },
    "projectConnection": {
      "title": "Interactive Quiz Project",
      "description": "Fetching trivia questions.",
      "howItApplies": "Instead of hardcoding questions, you will use `fetch()` to pull live questions from a public Trivia API!"
    },
    "quiz": [
      {
        "id": "js-l5-q1",
        "question": "Which keyword must be placed before a function declaration if you want to use `await` inside it?",
        "options": [
          "promise",
          "defer",
          "async",
          "wait"
        ],
        "correctOptionIndex": 2,
        "explanation": "You can only use `await` inside an `async` function."
      },
      {
        "id": "js-l5-q2",
        "question": "Which array method creates a NEW array by transforming every item in the original array?",
        "options": [
          ".forEach()",
          ".map()",
          ".filter()",
          ".reduce()"
        ],
        "correctOptionIndex": 1,
        "explanation": "`.map()` applies a function to every item and returns a new array of the results."
      },
      {
        "id": "js-l5-q3",
        "question": "What does the `fetch()` function return?",
        "options": [
          "A string",
          "An array",
          "A Promise",
          "HTML"
        ],
        "correctOptionIndex": 2,
        "explanation": "`fetch()` returns a Promise that resolves to the Response object."
      }
    ]
  }
};
