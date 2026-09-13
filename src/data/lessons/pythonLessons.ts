import { LessonDetail } from '../../types';

export const PYTHON_LESSONS: Record<string, LessonDetail> = {
  'py-l1': {
    id: 'py-l1',
    courseSlug: 'python',
    title: 'Introduction to Python, Interpreters & PEP 8',
    duration: '15 min',
    introduction:
      'Python is celebrated worldwide for its elegant, readable syntax and immense versatility—powering backend web services, data science, artificial intelligence, and automation scripts. In this lesson, you will discover the Python execution pipeline (Bytecode and CPython interpreter), whitespace significance, and the PEP 8 official style guide.',
    learningObjectives: [
      'Understand how the Python interpreter translates human-readable source code into bytecode (.pyc) and executes it',
      'Master the significance of whitespace indentation in Python (no curly braces for code blocks)',
      'Learn the core tenets of the Zen of Python (PEP 20): readability counts, explicit is better than implicit',
      'Follow PEP 8 style standards for snake_case variable naming, imports, and clean formatting',
    ],
    explanation: [
      {
        heading: 'How Python Executes Code',
        paragraphs: [
          'Unlike compiled languages (like C++ or Rust) that generate machine-native binaries before execution, Python is an interpreted language. When you run a script with `python main.py`, the CPython interpreter reads your source code, compiles it into intermediate bytecode (.pyc files), and executes that bytecode on the Python Virtual Machine (PVM).',
          'This provides cross-platform portability: your Python code runs on Windows, macOS, Linux, and cloud containers without recompilation.',
        ],
      },
      {
        heading: 'Significant Whitespace & Indentation',
        paragraphs: [
          'Most programming languages use curly braces { } or keywords to define blocks of code. Python is unique: it uses whitespace indentation to define scope and code hierarchy.',
          'Standard convention (PEP 8) dictates exactly 4 spaces per indentation level. Mixing tabs and spaces results in an IndentationError.',
        ],
        keyPoints: [
          'Always use 4 spaces per indentation level (never raw tab characters).',
          'PEP 8 convention: Use snake_case for functions and variables (user_first_name), and PascalCase for classes (UserProfile).',
          'Lines should ideally stay under 79–100 characters for optimal readability.',
        ],
      },
    ],
    codeExample: {
      language: 'python',
      filename: 'python_fundamentals.py',
      code: `"""A clean, PEP 8 compliant Python script demonstrating fundamentals."""

def calculate_student_grade(score: float) -> str:
    """Evaluate a numeric score and return the letter grade."""
    if score >= 90:
        return 'A'
    elif score >= 80:
        return 'B'
    elif score >= 70:
        return 'C'
    else:
        return 'F'

# Global execution block
student_name = "Alex"
final_score = 92.5
grade = calculate_student_grade(final_score)

print(f"Student: {student_name} | Score: {final_score} | Grade: {grade}")`,
      explanation:
        'Notice how the function body and conditional branches are indented by exactly 4 spaces. The docstring (""") documents the function purpose and return value.',
    },
    practicalExample: {
      title: 'Writing an Automation Script to Calculate Storage Quotas',
      scenario: 'Calculating user cloud storage utilization and alerting when exceeding capacity.',
      code: `def check_storage_quota(used_gigabytes: float, total_quota: float = 15.0) -> None:
    percentage_used = (used_gigabytes / total_quota) * 100
    print(f"Storage: {used_gigabytes:.1f}GB / {total_quota:.1f}GB ({percentage_used:.1f}%)")
    
    if percentage_used >= 90.0:
        print("⚠️ Warning: Storage critically full. Upgrade your tier.")
    elif percentage_used >= 75.0:
        print("ℹ️ Notice: You have used over 75% of your quota.")
    else:
        print("✅ Storage within normal operating limits.")

check_storage_quota(13.8)`,
      explanation:
        'f-strings (f"{used_gigabytes:.1f}GB") allow precise numeric formatting with 1 decimal place.',
      outputDescription: 'Prints storage stats and displays a critical warning message because 13.8/15 is 92%.',
    },
    commonMistakes: [
      {
        mistake: 'Mixing tabs and spaces for indentation',
        whyItHappens: 'Different text editors configuring the Tab key differently, causing invisible indentation mismatches.',
        howToFix: 'Configure your code editor (like VS Code) to insert 4 spaces when pressing the Tab key.',
        incorrectSnippet: `def greet():
\tprint("Hello") # Tab
    print("World") # 4 spaces -> IndentationError!`,
        correctSnippet: `def greet():
    print("Hello") # 4 spaces
    print("World") # 4 spaces`,
      },
    ],
    practice: {
      title: 'Write a Currency Converter Function',
      instructions: [
        'Define a function `convert_usd_to_eur` that accepts `usd_amount` and an optional `exchange_rate` defaulting to 0.92.',
        'Calculate and return the converted amount.',
        'Follow PEP 8 naming conventions and include a docstring.',
      ],
      starterCode: `def convert_usd_to_eur(usd_amount, exchange_rate=0.92):
    # Add docstring and calculation
    pass`,
      hint: 'Multiply usd_amount by exchange_rate and return the numeric float.',
      solutionCode: `def convert_usd_to_eur(usd_amount: float, exchange_rate: float = 0.92) -> float:
    """Convert an amount in USD to EUR using the specified exchange rate."""
    return round(usd_amount * exchange_rate, 2)

total_eur = convert_usd_to_eur(100.0)
print(f"$100 USD = €{total_eur} EUR")`,
    },
    projectConnection: {
      title: 'Backend Services, APIs & Artificial Intelligence',
      description:
        'Python is the dominant language for modern AI models (PyTorch, TensorFlow, Gemini API SDKs) and high-performance backend frameworks (FastAPI, Django, Flask).',
      howItApplies:
        'In production cloud microservices, clean Python scripts automate database migrations, run machine learning inference pipelines, and process streaming data.',
    },
    quiz: [
      {
        id: 'py-l1-q1',
        question: 'How does Python define blocks of code (like function bodies and if-statements)?',
        options: [
          'Using whitespace indentation (typically 4 spaces)',
          'Using curly braces { }',
          'Using begin and end keywords',
          'Using semicolons at the start of every line',
        ],
        correctOptionIndex: 0,
        explanation:
          'Python uses significant whitespace indentation rather than braces to delimit code blocks.',
      },
      {
        id: 'py-l1-q2',
        question: 'What is PEP 8 in the Python ecosystem?',
        options: [
          'The official Python Enhancement Proposal specifying code style and formatting standards',
          'A Python package manager that replaces pip',
          'The security firewall built into the Linux kernel',
          'A database driver for PostgreSQL',
        ],
        correctOptionIndex: 0,
        explanation:
          'PEP 8 is the official Style Guide for Python Code, outlining naming conventions, spacing, and layout rules.',
      },
      {
        id: 'py-l1-q3',
        question: 'What is the intermediate format Python source code is compiled into before execution on the virtual machine?',
        options: ['Bytecode (.pyc)', 'x86 Assembly', 'Pure JavaScript', 'Machine Binary'],
        correctOptionIndex: 0,
        explanation:
          'CPython translates source code into bytecode instructions (.pyc), which are then executed by the Python Virtual Machine.',
      },
    ],
  },
};
