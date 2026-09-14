import { LessonDetail } from '../types';

export const PYTHON_LESSONS: Record<string, LessonDetail> = {
  "py-l1": {
    "id": "py-l1",
    "courseSlug": "python",
    "title": "Variables, Data Types, and I/O",
    "duration": "1h",
    "introduction": "Welcome to Python! Python is famous for its clean, readable syntax that looks almost like plain English. In this first lesson, we will learn how to store data, perform math, and interact with the user via the terminal.",
    "learningObjectives": [
      "Define variables without explicit type declarations.",
      "Understand Python data types (int, float, str, bool).",
      "Use the print() function to output data.",
      "Use the input() function to receive user data."
    ],
    "explanation": [
      {
        "heading": "WHAT are Variables in Python?",
        "paragraphs": [
          "In Python, a variable is created the moment you first assign a value to it. You don't need commands like `let` or `const`. Just type `name = \"Alice\"`."
        ]
      },
      {
        "heading": "WHY is Python \"Dynamically Typed\"?",
        "paragraphs": [
          "You do not have to tell Python that a variable is a number or a word. It figures it out automatically. `age = 25` is an Integer. `price = 9.99` is a Float. `name = \"Bob\"` is a String."
        ]
      },
      {
        "heading": "HOW to do I/O (Input/Output)?",
        "paragraphs": [
          "Outputting data to the screen is done using `print()`. Getting data from the user typing on their keyboard is done using `input()`."
        ]
      },
      {
        "heading": "WHEN to convert types?",
        "paragraphs": [
          "The `input()` function ALWAYS returns a String. If the user types \"25\", Python sees it as the word \"25\", not the math number 25. You must use `int()` to convert it if you want to do math."
        ]
      }
    ],
    "codeExample": {
      "language": "python",
      "filename": "basics.py",
      "explanation": "Basic variables and printing.",
      "code": "# This is a comment in Python\nuser_name = \"Charlie\"\nage = 30\nis_student = True\n\n# Printing multiple things (automatically separated by spaces)\nprint(\"Hello\", user_name)\nprint(\"You are\", age, \"years old.\")"
    },
    "practicalExample": {
      "title": "A Simple Calculator",
      "scenario": "You want a program that asks the user for two numbers and adds them.",
      "explanation": "Notice how we must wrap the input in `int()` to convert the text into numbers before adding them.",
      "code": "print(\"Welcome to the Adder!\")\n\n# Get input and convert to integers\nnum1 = int(input(\"Enter first number: \"))\nnum2 = int(input(\"Enter second number: \"))\n\ntotal = num1 + num2\nprint(\"The total is:\", total)"
    },
    "commonMistakes": [
      {
        "mistake": "Forgetting to convert input strings to integers.",
        "whyItHappens": "If you type 5 and 5, you expect 10. But if they are strings, Python glues them together to make \"55\".",
        "howToFix": "Wrap `input()` in `int()` or `float()` when expecting numbers.",
        "incorrectSnippet": "x = input(\"Num: \")\ny = input(\"Num: \")\nprint(x + y) # Outputs \"55\"",
        "correctSnippet": "x = int(input(\"Num: \"))\ny = int(input(\"Num: \"))\nprint(x + y) # Outputs 10"
      }
    ],
    "practice": {
      "title": "Create a Greeting Program",
      "instructions": [
        "Ask the user for their name using `input()`.",
        "Ask the user for their favorite color.",
        "Print a message like: \"Hi John, Blue is a great color!\""
      ],
      "starterCode": "# Write your code here\n",
      "hint": "Use variables to store the inputs, then pass them to print().",
      "solutionCode": "name = input(\"What is your name? \")\ncolor = input(\"Favorite color? \")\nprint(\"Hi\", name, \",\", color, \"is a great color!\")"
    },
    "projectConnection": {
      "title": "Data Analyzer Project",
      "description": "Taking user commands.",
      "howItApplies": "You will use `input()` to allow the user to type in commands (like \"load file\" or \"analyze data\") to control your final application."
    },
    "quiz": [
      {
        "id": "py-l1-q1",
        "question": "How do you create a variable named `score` with the value 10 in Python?",
        "options": [
          "let score = 10",
          "int score = 10",
          "score = 10",
          "var score = 10"
        ],
        "correctOptionIndex": 2,
        "explanation": "Python does not require declaration keywords. Just assign the value."
      },
      {
        "id": "py-l1-q2",
        "question": "What data type does the `input()` function always return?",
        "options": [
          "Integer",
          "String",
          "Float",
          "Boolean"
        ],
        "correctOptionIndex": 1,
        "explanation": "`input()` always returns a String, even if the user types numbers."
      },
      {
        "id": "py-l1-q3",
        "question": "How do you write a comment in Python?",
        "options": [
          "// This is a comment",
          "<!-- This is a comment -->",
          "/* This is a comment */",
          "# This is a comment"
        ],
        "correctOptionIndex": 3,
        "explanation": "The hash symbol (#) is used for single-line comments in Python."
      }
    ]
  },
  "py-l2": {
    "id": "py-l2",
    "courseSlug": "python",
    "title": "Conditions and Loops",
    "duration": "1h",
    "introduction": "To make our programs smart, they need to make decisions and automate repetitive tasks. In Python, we do this using if-statements, while-loops, and for-loops, relying heavily on indentation.",
    "learningObjectives": [
      "Understand Python's strict indentation rules.",
      "Write if, elif, and else statements.",
      "Use a while loop to repeat code until a condition is met.",
      "Use a for loop and the range() function."
    ],
    "explanation": [
      {
        "heading": "WHAT is Indentation?",
        "paragraphs": [
          "In most languages, curly braces `{}` group code together. In Python, indentation (spaces at the start of the line) is used to group code. If your indentation is wrong, your program will crash."
        ]
      },
      {
        "heading": "WHY use elif?",
        "paragraphs": [
          "`elif` stands for \"else if\". It allows you to check multiple conditions in a row without writing nested `if` statements."
        ]
      },
      {
        "heading": "HOW to use a for loop?",
        "paragraphs": [
          "In Python, `for` loops are mostly used to iterate over a sequence (like a list or a string). If you just want to repeat code 5 times, you use `for i in range(5):`."
        ]
      },
      {
        "heading": "WHEN to use while?",
        "paragraphs": [
          "Use a `while` loop when you don't know exactly how many times the loop needs to run in advance (e.g., waiting for the user to type the word \"quit\")."
        ]
      }
    ],
    "codeExample": {
      "language": "python",
      "filename": "logic.py",
      "explanation": "An if/elif/else block and a for loop.",
      "code": "score = 85\n\n# Conditionals (Notice the colons and indentation)\nif score >= 90:\n    print(\"Grade: A\")\nelif score >= 80:\n    print(\"Grade: B\")\nelse:\n    print(\"Grade: C\")\n    \n# For loop using range (prints 0, 1, 2, 3, 4)\nfor i in range(5):\n    print(\"Count:\", i)"
    },
    "practicalExample": {
      "title": "A Number Guessing Game",
      "scenario": "You want the user to keep guessing a number until they get it right.",
      "explanation": "A `while` loop is perfect here because we don't know how many guesses it will take.",
      "code": "secret = 7\nguess = 0\n\nwhile guess != secret:\n    guess = int(input(\"Guess a number between 1 and 10: \"))\n    if guess != secret:\n        print(\"Wrong, try again!\")\n\nprint(\"You got it! The number was 7.\")"
    },
    "commonMistakes": [
      {
        "mistake": "IndentationError.",
        "whyItHappens": "Mixing tabs and spaces, or forgetting to indent the code inside an `if` statement.",
        "howToFix": "Always use exactly 4 spaces (or 1 tab) for every level of indentation. Never mix them. Always put a colon `:` at the end of the `if` or `for` line.",
        "incorrectSnippet": "if True:\nprint(\"Hello\")",
        "correctSnippet": "if True:\n    print(\"Hello\")"
      }
    ],
    "practice": {
      "title": "Write an Even Number Loop",
      "instructions": [
        "Write a `for` loop that iterates from 1 to 10.",
        "Inside the loop, use an `if` statement and the modulo operator `%` to check if the number is even (`num % 2 == 0`).",
        "If it is even, print it."
      ],
      "starterCode": "# Write your loop here\n",
      "hint": "Use `for num in range(1, 11):`",
      "solutionCode": "for num in range(1, 11):\n    if num % 2 == 0:\n        print(num, \"is even\")"
    },
    "projectConnection": {
      "title": "Data Analyzer Project",
      "description": "Menu systems.",
      "howItApplies": "You will use a `while True:` loop to keep your application running indefinitely, asking the user for commands until they type \"exit\"."
    },
    "quiz": [
      {
        "id": "py-l2-q1",
        "question": "How does Python determine which code belongs inside an `if` block?",
        "options": [
          "By using curly braces {}",
          "By using the keyword END",
          "By indentation (spaces/tabs)",
          "By parentheses ()"
        ],
        "correctOptionIndex": 2,
        "explanation": "Python relies strictly on whitespace/indentation to define code blocks."
      },
      {
        "id": "py-l2-q2",
        "question": "What keyword is used to check an additional condition if the first `if` fails?",
        "options": [
          "else if",
          "elseif",
          "elif",
          "otherwise"
        ],
        "correctOptionIndex": 2,
        "explanation": "`elif` is Python's syntax for \"else if\"."
      },
      {
        "id": "py-l2-q3",
        "question": "What will `for x in range(3): print(x)` output?",
        "options": [
          "1 2 3",
          "0 1 2",
          "0 1 2 3",
          "3 3 3"
        ],
        "correctOptionIndex": 1,
        "explanation": "`range(3)` generates numbers from 0 up to, but not including, 3."
      }
    ]
  },
  "py-l3": {
    "id": "py-l3",
    "courseSlug": "python",
    "title": "Functions, Lists, and Dictionaries",
    "duration": "1h",
    "introduction": "To build complex software, we need to organize our code and our data. We organize code into Functions, and we organize data into Lists (arrays) and Dictionaries (key-value pairs).",
    "learningObjectives": [
      "Define reusable functions using the `def` keyword.",
      "Create and modify Lists (append, pop).",
      "Create and access Dictionaries using keys.",
      "Iterate through Lists and Dictionaries using for loops."
    ],
    "explanation": [
      {
        "heading": "WHAT are def, lists, and dicts?",
        "paragraphs": [
          "`def` is used to define a function. A List `[]` is an ordered collection of items. A Dictionary `{}` is an unordered collection of data stored as key:value pairs."
        ]
      },
      {
        "heading": "WHY use Dictionaries?",
        "paragraphs": [
          "Lists are great for sequences (like a list of high scores). Dictionaries are great for structured data representing a single entity (like a user with a name, age, and email)."
        ]
      },
      {
        "heading": "HOW to modify a List?",
        "paragraphs": [
          "Use `.append(item)` to add an item to the end of a list. Use `.pop()` or `.remove(item)` to remove items."
        ]
      },
      {
        "heading": "WHEN to use loop iteration?",
        "paragraphs": [
          "In Python, you rarely use index numbers to loop. Instead of `for i in range(len(my_list))`, you simply write `for item in my_list: print(item)`. It is much cleaner!"
        ]
      }
    ],
    "codeExample": {
      "language": "python",
      "filename": "collections.py",
      "explanation": "A function that processes a list and a dictionary.",
      "code": "# Defining a function\ndef greet_user(user_dict):\n    # Accessing dict via key\n    print(\"Hello\", user_dict[\"name\"])\n\n# A Dictionary\nperson = {\n    \"name\": \"Alice\",\n    \"age\": 25\n}\n\ngreet_user(person)\n\n# A List\ncolors = [\"Red\", \"Green\", \"Blue\"]\ncolors.append(\"Yellow\")\n\n# Iterating directly over the list\nfor color in colors:\n    print(\"-\", color)"
    },
    "practicalExample": {
      "title": "A Shopping Cart System",
      "scenario": "You want to keep track of items in a cart and their quantities.",
      "explanation": "A dictionary is perfect here. The key is the item name, and the value is the quantity.",
      "code": "cart = {\n    \"apple\": 2,\n    \"banana\": 5\n}\n\n# Adding a new item\ncart[\"orange\"] = 3\n\n# Iterating over dictionary keys and values\nfor item, quantity in cart.items():\n    print(f\"You have {quantity} {item}s.\")"
    },
    "commonMistakes": [
      {
        "mistake": "KeyError in Dictionaries.",
        "whyItHappens": "Trying to access a key in a dictionary that does not exist crashes the program.",
        "howToFix": "Either ensure the key exists, or use the `.get(key)` method, which returns `None` instead of crashing if the key is missing.",
        "incorrectSnippet": "val = my_dict[\"missing_key\"] # CRASH!",
        "correctSnippet": "val = my_dict.get(\"missing_key\") # Returns None safely"
      }
    ],
    "practice": {
      "title": "Find the Max",
      "instructions": [
        "Write a function `find_max(numbers)`.",
        "It should take a list of numbers as a parameter.",
        "Loop through the numbers and return the largest one.",
        "(Do not use the built-in max() function for this practice)."
      ],
      "starterCode": "def find_max(numbers):\n    # Write logic here\n    pass\n\nprint(find_max([4, 2, 9, 7]))",
      "hint": "Create a variable `highest = 0`, loop through `numbers`, and update `highest` if the current number is bigger.",
      "solutionCode": "def find_max(numbers):\n    highest = numbers[0]\n    for num in numbers:\n        if num > highest:\n            highest = num\n    return highest\n\nprint(find_max([4, 2, 9, 7]))"
    },
    "projectConnection": {
      "title": "Data Analyzer Project",
      "description": "Storing records.",
      "howItApplies": "When reading a CSV file, you will parse every row into a Dictionary, and store all those dictionaries inside one giant List."
    },
    "quiz": [
      {
        "id": "py-l3-q1",
        "question": "Which keyword is used to create a function in Python?",
        "options": [
          "function",
          "def",
          "create",
          "func"
        ],
        "correctOptionIndex": 1,
        "explanation": "`def` stands for define and is used to create functions."
      },
      {
        "id": "py-l3-q2",
        "question": "Which method adds an item to the end of a List?",
        "options": [
          ".add()",
          ".insert()",
          ".push()",
          ".append()"
        ],
        "correctOptionIndex": 3,
        "explanation": "`.append()` adds an element to the end of a Python list."
      },
      {
        "id": "py-l3-q3",
        "question": "How do you loop through both keys and values in a dictionary?",
        "options": [
          "for k, v in my_dict.items():",
          "for k, v in my_dict:",
          "for k, v in my_dict.keys():",
          "for k, v in my_dict.all():"
        ],
        "correctOptionIndex": 0,
        "explanation": "The `.items()` method returns key-value pairs that can be unpacked in the loop."
      }
    ]
  },
  "py-l4": {
    "id": "py-l4",
    "courseSlug": "python",
    "title": "File Handling and Exceptions",
    "duration": "1h",
    "introduction": "A program that loses its data when it closes isn't very useful. In this lesson, we learn how to read and write text files to save data permanently. We also learn how to handle errors so our program doesn't crash.",
    "learningObjectives": [
      "Open, read, and write files using `with open()`.",
      "Understand file modes (r, w, a).",
      "Anticipate and catch errors using `try` and `except`.",
      "Handle missing files gracefully."
    ],
    "explanation": [
      {
        "heading": "WHAT is File Handling?",
        "paragraphs": [
          "File handling is how Python talks to the operating system's hard drive to read existing files (like a .txt or .csv) or create new ones."
        ]
      },
      {
        "heading": "WHY use `with`?",
        "paragraphs": [
          "When you open a file, you MUST close it when you are done to free up system resources. Using the `with open(...) as file:` syntax automatically closes the file for you, even if the program crashes inside the block!"
        ]
      },
      {
        "heading": "HOW to use modes?",
        "paragraphs": [
          "`\"r\"` is for reading (default). `\"w\"` is for writing (will OVERWRITE the whole file). `\"a\"` is for appending (adds to the end of the file)."
        ]
      },
      {
        "heading": "WHEN to use try/except?",
        "paragraphs": [
          "Whenever your code interacts with the outside world (user input, files, network), it might fail. A file might be missing. Use `try/except` to \"catch\" the error and print a friendly message instead of crashing."
        ]
      }
    ],
    "codeExample": {
      "language": "python",
      "filename": "files.py",
      "explanation": "Writing to a file and reading from it safely.",
      "code": "# Writing to a file\nwith open(\"notes.txt\", \"w\") as file:\n    file.write(\"Hello World!\\n\")\n    file.write(\"This is saved to the hard drive.\")\n\n# Reading from a file safely\ntry:\n    with open(\"notes.txt\", \"r\") as file:\n        content = file.read()\n        print(content)\nexcept FileNotFoundError:\n    print(\"Error: The file does not exist!\")"
    },
    "practicalExample": {
      "title": "A Simple Log File",
      "scenario": "You want to record every time a user logs into your system.",
      "explanation": "We use the append mode `\"a\"` so we don't erase previous logs. We just add a new line at the bottom.",
      "code": "import datetime\n\ndef log_login(username):\n    now = datetime.datetime.now()\n    # \"a\" means append\n    with open(\"logins.log\", \"a\") as file:\n        file.write(f\"User {username} logged in at {now}\\n\")\n        \nlog_login(\"admin\")\nlog_login(\"guest\")"
    },
    "commonMistakes": [
      {
        "mistake": "Using \"w\" when you meant \"a\".",
        "whyItHappens": "Both allow you to write. But \"w\" wipes the file clean first.",
        "howToFix": "If you want to keep the existing data in a file and just add to it, you MUST use append mode `\"a\"`.",
        "incorrectSnippet": "open(\"data.txt\", \"w\") # Erases old data!",
        "correctSnippet": "open(\"data.txt\", \"a\") # Keeps old data, adds new data"
      }
    ],
    "practice": {
      "title": "Safe Math Input",
      "instructions": [
        "Write a `try` block that asks the user for a number and prints 100 divided by that number.",
        "Write an `except ValueError` to catch if they type a word instead of a number.",
        "Write an `except ZeroDivisionError` to catch if they type 0."
      ],
      "starterCode": "try:\n    # Get input, convert to int, divide 100 by it\n    pass\nexcept ValueError:\n    # Print \"That is not a number\"\n    pass\n",
      "hint": "Stack multiple except blocks below a single try block.",
      "solutionCode": "try:\n    num = int(input(\"Enter a number: \"))\n    print(100 / num)\nexcept ValueError:\n    print(\"That is not a number!\")\nexcept ZeroDivisionError:\n    print(\"You cannot divide by zero!\")"
    },
    "projectConnection": {
      "title": "Data Analyzer Project",
      "description": "Loading the dataset.",
      "howItApplies": "Your main project will start by using `with open(...)` to load a large dataset from a CSV file into Python memory."
    },
    "quiz": [
      {
        "id": "py-l4-q1",
        "question": "Which file mode is used to add data to the end of a file WITHOUT erasing the existing data?",
        "options": [
          "r",
          "w",
          "a",
          "x"
        ],
        "correctOptionIndex": 2,
        "explanation": "`a` stands for append mode."
      },
      {
        "id": "py-l4-q2",
        "question": "What is the main advantage of using the `with` statement when opening files?",
        "options": [
          "It runs faster",
          "It automatically closes the file when the block ends",
          "It encrypts the file",
          "It prevents all errors"
        ],
        "correctOptionIndex": 1,
        "explanation": "The `with` context manager guarantees the file is properly closed."
      },
      {
        "id": "py-l4-q3",
        "question": "Which keyword is used to define the block of code that should run if an error occurs?",
        "options": [
          "catch",
          "error",
          "except",
          "handle"
        ],
        "correctOptionIndex": 2,
        "explanation": "Python uses `try` and `except` (similar to try/catch in other languages)."
      }
    ]
  },
  "py-l5": {
    "id": "py-l5",
    "courseSlug": "python",
    "title": "OOP and APIs",
    "duration": "1h",
    "introduction": "In our final Python lesson, we transition from writing simple scripts to building professional software architecture. We will learn Object-Oriented Programming (OOP) and how to fetch data from the web using APIs.",
    "learningObjectives": [
      "Understand the concept of Classes and Objects in OOP.",
      "Create a custom Class with an `__init__` method and properties.",
      "Import the `requests` module.",
      "Fetch and parse JSON data from a web API."
    ],
    "explanation": [
      {
        "heading": "WHAT is OOP?",
        "paragraphs": [
          "Object-Oriented Programming (OOP) is a way of organizing code. A `Class` is a blueprint. An `Object` is a specific thing built from that blueprint. For example, `Car` is a class, but your specific red Toyota is an object."
        ]
      },
      {
        "heading": "WHY use Classes?",
        "paragraphs": [
          "Classes allow you to bundle Data (properties) and Actions (methods) together into a single, logical unit."
        ]
      },
      {
        "heading": "HOW to make a Class?",
        "paragraphs": [
          "Use the `class` keyword. Inside, define a special method called `__init__(self)` which sets up the initial data for the object when it is created."
        ]
      },
      {
        "heading": "WHEN to use APIs?",
        "paragraphs": [
          "APIs (Application Programming Interfaces) allow your Python script to talk to servers on the internet (like getting the weather from Weather.com) using the `requests` library."
        ]
      }
    ],
    "codeExample": {
      "language": "python",
      "filename": "oop.py",
      "explanation": "Defining a Dog class and creating two dog objects.",
      "code": "class Dog:\n    # The initialization method (constructor)\n    def __init__(self, name, breed):\n        # 'self' refers to the specific object being created\n        self.name = name\n        self.breed = breed\n        \n    # A method (action)\n    def bark(self):\n        print(f\"{self.name} says Woof!\")\n\n# Creating Objects (Instances)\ndog1 = Dog(\"Buddy\", \"Golden Retriever\")\ndog2 = Dog(\"Max\", \"Bulldog\")\n\ndog1.bark() # Prints: Buddy says Woof!"
    },
    "practicalExample": {
      "title": "Fetching from an API",
      "scenario": "You want your script to print a random joke from the internet.",
      "explanation": "We import the `requests` library, make a GET request to a public joke API, and parse the JSON response into a Python dictionary.",
      "code": "import requests\n\n# Note: To run this locally, you must first do 'pip install requests'\nurl = \"https://official-joke-api.appspot.com/random_joke\"\n\ntry:\n    response = requests.get(url)\n    data = response.json() # Converts JSON to a Dictionary\n    \n    print(\"Setup:\", data[\"setup\"])\n    print(\"Punchline:\", data[\"punchline\"])\nexcept Exception as e:\n    print(\"Could not fetch joke:\", e)"
    },
    "commonMistakes": [
      {
        "mistake": "Forgetting the `self` parameter in class methods.",
        "whyItHappens": "In normal functions, you only list the inputs you want to provide. In class methods, the first input must ALWAYS be `self`.",
        "howToFix": "Every function inside a class must have `self` as its first parameter. Python automatically passes the object reference into this parameter behind the scenes.",
        "incorrectSnippet": "def bark():\n    print(\"Woof!\")",
        "correctSnippet": "def bark(self):\n    print(\"Woof!\")"
      }
    ],
    "practice": {
      "title": "Create a Book Class",
      "instructions": [
        "Define a class named `Book`.",
        "Give it an `__init__` method that accepts `self`, `title`, and `author`.",
        "Save them to `self.title` and `self.author`.",
        "Create a book object and print its title."
      ],
      "starterCode": "class Book:\n    # Write init method here\n    pass\n\n# Create object here",
      "hint": "def __init__(self, title, author):",
      "solutionCode": "class Book:\n    def __init__(self, title, author):\n        self.title = title\n        self.author = author\n\nmy_book = Book(\"1984\", \"George Orwell\")\nprint(my_book.title)"
    },
    "projectConnection": {
      "title": "Data Analyzer Project",
      "description": "Structuring your code.",
      "howItApplies": "You will encapsulate all your data analysis logic inside a `Dataset` class, making your final project clean, professional, and easy to maintain."
    },
    "quiz": [
      {
        "id": "py-l5-q1",
        "question": "In Object-Oriented Programming, what is a Class?",
        "options": [
          "A specific instance of data",
          "A blueprint for creating objects",
          "A built-in Python library",
          "A type of loop"
        ],
        "correctOptionIndex": 1,
        "explanation": "A class is the blueprint/template, and objects are created from it."
      },
      {
        "id": "py-l5-q2",
        "question": "What is the name of the special method used to initialize a new object in Python?",
        "options": [
          "__start__",
          "__init__",
          "constructor",
          "init"
        ],
        "correctOptionIndex": 1,
        "explanation": "`__init__` is the initialization method automatically called when an object is created."
      },
      {
        "id": "py-l5-q3",
        "question": "Which external library is the industry standard for making HTTP API requests in Python?",
        "options": [
          "http",
          "fetch",
          "requests",
          "urllib"
        ],
        "correctOptionIndex": 2,
        "explanation": "The `requests` library is the standard, most popular way to make HTTP requests in Python."
      }
    ]
  }
};
