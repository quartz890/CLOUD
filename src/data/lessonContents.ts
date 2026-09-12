import { LessonDetail, Course, Lesson } from '../types';

export const LESSON_DETAILS: Record<string, LessonDetail> = {
  // Lesson 1.1: What is HTML & How the Web Works
  'html-l1': {
    id: 'html-l1',
    courseSlug: 'html',
    title: 'What is HTML & How the Web Works',
    duration: '10 min',
    introduction:
      'Every webpage you visit on the internet—from Google and Wikipedia to YouTube—relies on HTML as its structural backbone. In this lesson, you will discover what HTML actually is, how web browsers translate raw text into interactive visual documents, and why writing clean markup is the first and most critical skill in web development.',
    learningObjectives: [
      'Understand what HTML stands for and its core role alongside CSS and JavaScript',
      'Learn the request-response cycle between your web browser (client) and a web server',
      'Discover how the browser parses HTML tags into the Document Object Model (DOM)',
      'Understand the anatomy of an HTML element: opening tag, content, and closing tag',
    ],
    explanation: [
      {
        heading: 'What Does HTML Actually Stand For?',
        paragraphs: [
          'HTML stands for HyperText Markup Language. It is not a programming language like Python or JavaScript; it is a markup language. A markup language uses a system of standardized annotations (called "tags") to tell a computer program how text, images, and other resources should be structured and displayed.',
          'HyperText refers to text that contains links to other texts or pages—allowing users to navigate interconnected documents with a simple click. Markup refers to the special tags wrapped in angle brackets (like <p> or <h1>) that describe the purpose and meaning of the content inside them.',
        ],
        keyPoints: [
          'HTML is about structure and meaning (semantics), not visual styling.',
          'CSS controls how the markup looks (colors, layouts, fonts).',
          'JavaScript controls how the page behaves (interactivity, state, fetching data).',
        ],
      },
      {
        heading: 'How the Web Works: The Client and The Server',
        paragraphs: [
          'When you type a website address like "https://example.com" into your browser address bar and press Enter, your computer acts as a client. Your browser sends an HTTP request over the internet to a remote computer called a web server.',
          'The web server locates the requested file (often named "index.html") and responds by transmitting the raw HTML text code back to your browser over network packets.',
          'Once the browser receives that text stream, the browser engine begins reading it from top to bottom. It translates the tags into an internal tree structure called the Document Object Model (DOM) and renders the visual pixels onto your screen.',
        ],
      },
      {
        heading: 'Anatomy of an HTML Element',
        paragraphs: [
          'Most elements in HTML consist of three basic parts: an opening tag, the inner content, and a closing tag. The closing tag looks identical to the opening tag, but includes a forward slash (/) right after the opening angle bracket.',
          'Elements can also carry attributes. Attributes provide extra information or configuration for an element (such as an image source, a link destination, or a unique identifier) and are always specified inside the opening tag.',
        ],
        keyPoints: [
          'Opening Tag: <p> indicates the start of a paragraph.',
          'Content: The text or nested elements sitting between the tags.',
          'Closing Tag: </p> indicates where the paragraph ends.',
          'Self-closing (Void) elements: Some elements have no content and do not require a closing tag, such as <img>, <br>, and <meta>.',
        ],
      },
    ],
    codeExample: {
      language: 'html',
      filename: 'element-anatomy.html',
      code: `<!-- Anatomy of a standard HTML element -->
<p class="intro-text">Welcome to the world of web development!</p>

<!-- Anatomy of an element with multiple attributes -->
<a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">
  Visit MDN Web Docs
</a>

<!-- Anatomy of a void (self-closing) element -->
<img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600" alt="Code on a laptop screen" />`,
      explanation:
        'Notice how the <p> tag surrounds the text content. The <a> tag uses the "href" attribute to define where the link leads, and the <img> tag specifies the image source using the "src" attribute and accessible fallback description using "alt".',
    },
    practicalExample: {
      title: 'A Minimal Working Webpage',
      scenario:
        'Imagine creating your very first independent HTML file on your computer named "index.html". Here is the simplest complete structure that any browser will happily parse and render.',
      code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My First Webpage</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>This is my first webpage structured with semantic HTML.</p>
    <p>Browsers read this document and draw the text on your screen.</p>
  </body>
</html>`,
      explanation:
        'When you double-click an HTML file on your desktop, your default browser opens it immediately. You do not need a compiler or special software to run HTML—the browser itself is the execution engine.',
      outputDescription:
        'Displays a large bold heading saying "Hello, World!" followed by two distinct paragraphs with default browser spacing.',
    },
    commonMistakes: [
      {
        mistake: 'Forgetting to close tags (e.g., writing <p>Hello without </p>)',
        whyItHappens:
          'When learning, it is easy to forget the closing tag with the forward slash. While modern browsers try to auto-correct errors ("quirks mode"), unclosed tags cause unpredictable layout bugs and broken layouts downstream.',
        howToFix: 'Always write the closing tag immediately when creating an element, or use code editor auto-close extensions.',
        incorrectSnippet: `<p>This is paragraph one.
<p>This is paragraph two.`,
        correctSnippet: `<p>This is paragraph one.</p>
<p>This is paragraph two.</p>`,
      },
      {
        mistake: 'Confusing the forward slash (/) with a backslash (\\) in closing tags',
        whyItHappens:
          'Keyboards have both keys, and beginners frequently type <\\p> instead of </p>. The browser will not recognize <\\p> as a valid closing tag.',
        howToFix: 'Remember that HTML closing tags always use the forward slash (/), which leans forward.',
        incorrectSnippet: `<h1>Welcome<\\h1>`,
        correctSnippet: `<h1>Welcome</h1>`,
      },
      {
        mistake: 'Using HTML to style text visually rather than describe its meaning',
        whyItHappens:
          'Beginners often reach for <h1> just because they want big text, or use repeated <br> tags to create spacing.',
        howToFix: 'Use HTML purely for semantic hierarchy (what the content IS) and leave visual sizing and spacing to CSS.',
        incorrectSnippet: `<!-- Don't use headings just for bigger font -->
<h1>Terms and conditions apply.</h1>`,
        correctSnippet: `<!-- Use semantic paragraph and style size with CSS -->
<p class="small-disclaimer">Terms and conditions apply.</p>`,
      },
    ],
    quiz: [
      {
        id: 'html-l1-q1',
        question: 'What does the acronym HTML stand for?',
        options: [
          'HyperText Markup Language',
          'High-level Text Management Language',
          'Hyperlink and Text Modular Language',
          'Home Tool Markup Language',
        ],
        correctOptionIndex: 0,
        explanation:
          'HTML stands for HyperText Markup Language. "HyperText" refers to clickable links that connect webpages, while "Markup" describes the tags used to define document structure.',
      },
      {
        id: 'html-l1-q2',
        question: 'What is the primary role of HTML compared to CSS and JavaScript?',
        options: [
          'HTML determines layout styling, animations, and typography colors.',
          'HTML defines the semantic structure and content of the webpage.',
          'HTML processes backend server requests and database queries.',
          'HTML compiles into machine code before running on mobile devices.',
        ],
        correctOptionIndex: 1,
        explanation:
          'HTML provides the semantic skeleton and raw content of the webpage. Visual styling is handled by CSS, and interactive behavior is handled by JavaScript.',
      },
      {
        id: 'html-l1-q3',
        question: 'How is a standard HTML closing tag properly written?',
        options: [
          '<\\p>',
          '<p/>',
          '</p>',
          '<?p>',
        ],
        correctOptionIndex: 2,
        explanation:
          'Standard closing tags always use a forward slash (/) immediately following the opening angle bracket, such as </p> or </h1>. Backslashes (\\) are invalid.',
      },
    ],
  },

  // Lesson 1.2: The Modern HTML5 Boilerplate
  'html-l2': {
    id: 'html-l2',
    courseSlug: 'html',
    title: 'The Modern HTML5 Boilerplate',
    duration: '12 min',
    introduction:
      'Every production webpage begins with an essential foundational skeleton known as the HTML5 boilerplate. In this lesson, you will dissect each line of this standard template and understand why every piece is mandatory for clean rendering, search engines, and cross-browser reliability.',
    learningObjectives: [
      'Understand the role of the <!DOCTYPE html> declaration',
      'Learn why the root <html lang="en"> attribute is essential for accessibility and translation',
      'Distinguish the hidden configuration in <head> from the visible content in <body>',
      'Inspect the anatomy of a production-ready boilerplate',
    ],
    explanation: [
      {
        heading: 'The <!DOCTYPE html> Declaration',
        paragraphs: [
          'The very first line of every modern HTML document is <!DOCTYPE html>. This is not an HTML element itself; it is a document type instruction to the web browser.',
          'In the early days of the web, multiple competing versions of HTML existed with complex document type definitions. Today, <!DOCTYPE html> simply tells the browser: "Render this page in modern HTML5 standards mode rather than old quirks mode."',
        ],
        keyPoints: [
          'Always placed at line 1, before any HTML tags.',
          'Case-insensitive, though uppercase <!DOCTYPE html> is the standard convention.',
        ],
      },
      {
        heading: 'The <head> vs the <body>',
        paragraphs: [
          'An HTML document has two main chambers inside the root <html> element: the <head> and the <body>.',
          'The <head> section contains metadata—information ABOUT the page that is not directly rendered in the main browser window. This includes character encodings, the page title shown on the browser tab, CSS stylesheets, and favicon links.',
          'The <body> section contains everything the user actually sees and interacts with: headings, paragraphs, images, videos, navigation menus, buttons, and forms.',
        ],
      },
    ],
    codeExample: {
      language: 'html',
      filename: 'index.html',
      code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Portfolio — Jane Developer</title>
  </head>
  <body>
    <header>
      <h1>Jane Developer</h1>
      <p>Frontend Engineer & Open Source Contributor</p>
    </header>
    <main>
      <p>Welcome to my professional portfolio built with standard HTML5.</p>
    </main>
  </body>
</html>`,
      explanation:
        'The boilerplate pairs metadata tags in the <head> with visible, semantic landmark tags in the <body>.',
    },
    practicalExample: {
      title: 'Testing Boilerplate in the Browser',
      scenario: 'Notice what happens to the browser tab when you modify the <title> tag.',
      code: `<head>
  <!-- This text appears directly on the browser tab and Google search results -->
  <title>Dashboard &bull; CLOUD Learning</title>
</head>`,
      explanation:
        'The <title> tag is one of the most important SEO tags on your entire site. It is what search engines index and what users see when bookmarking your URL.',
    },
    commonMistakes: [
      {
        mistake: 'Placing visible content (like headings or paragraphs) inside the <head> tag',
        whyItHappens: 'Misunderstanding the distinction between the head and body.',
        howToFix: 'Only place metadata, titles, and links in the <head>. All user-visible elements must go inside the <body>.',
        incorrectSnippet: `<head>
  <title>My Site</title>
  <h1>Welcome to my website!</h1> <!-- Wrong! -->
</head>`,
        correctSnippet: `<head>
  <title>My Site</title>
</head>
<body>
  <h1>Welcome to my website!</h1> <!-- Correct! -->
</body>`,
      },
      {
        mistake: 'Omitting the lang attribute on the <html> tag',
        whyItHappens: 'Assuming language is detected automatically.',
        howToFix: 'Always include <html lang="en"> (or your target language code) so screen readers pronounce words with the right linguistic accents.',
        incorrectSnippet: `<html>`,
        correctSnippet: `<html lang="en">`,
      },
    ],
    quiz: [
      {
        id: 'html-l2-q1',
        question: 'What is the purpose of the <!DOCTYPE html> declaration at the very top of a document?',
        options: [
          'It connects the webpage to an external server database.',
          'It tells the browser to render the page using modern HTML5 standards mode rather than quirks mode.',
          'It automatically imports default CSS styling resets.',
          'It acts as the root parent element for all visible text on the page.',
        ],
        correctOptionIndex: 1,
        explanation:
          '<!DOCTYPE html> is a document type instruction informing the browser to parse the document using standard HTML5 rules rather than legacy quirks mode.',
      },
      {
        id: 'html-l2-q2',
        question: 'Which of the following elements belongs inside the <head> rather than the <body>?',
        options: [
          'Primary page headings (<h1>) and main content paragraphs (<p>)',
          'Document metadata, character encoding declarations, and the <title> tag',
          'Interactive user input forms and submit buttons',
          'Hero banner photography and embedded YouTube videos',
        ],
        correctOptionIndex: 1,
        explanation:
          'The <head> section contains metadata ABOUT the document (like encoding, viewport, and title). All content visible to users belongs in the <body>.',
      },
      {
        id: 'html-l2-q3',
        question: 'Why is it recommended to always add lang="en" to the root <html> tag?',
        options: [
          'It makes the browser render fonts 2x faster.',
          'It allows screen readers and search engines to recognize the human language of the page for correct pronunciation and indexing.',
          'It is required by CSS to enable modern Flexbox and Grid layouts.',
          'It stops the browser from displaying an error dialog when loading.',
        ],
        correctOptionIndex: 1,
        explanation:
          'The lang attribute defines the natural language of the document, which screen readers rely on to pronounce words with proper linguistic phonetics.',
      },
    ],
  },

  // Lesson 1.3: Document Head, Charset & Meta Tags
  'html-l3': {
    id: 'html-l3',
    courseSlug: 'html',
    title: 'Document Head, Charset & Meta Tags',
    duration: '14 min',
    introduction:
      'The <head> section is your website’s control center. While invisible on the canvas, it dictates character encoding, mobile viewport scaling, search engine descriptions, and social media preview cards. In this lesson, you will master the essential meta tags that ensure your website displays accurately across all devices.',
    learningObjectives: [
      'Understand character encoding and why <meta charset="UTF-8"> prevents garbled text',
      'Master the responsive viewport meta tag: width=device-width, initial-scale=1.0',
      'Learn how search engine descriptions and social sharing cards (Open Graph) function',
      'Link external resources like stylesheets, Google Fonts, and favicons properly',
    ],
    explanation: [
      {
        heading: 'Why <meta charset="UTF-8"> Matters',
        paragraphs: [
          'Computers store all data as binary 1s and 0s. A character encoding provides a dictionary that translates those binary numbers into human letters, numbers, and symbols.',
          'UTF-8 is the universal standard for the World Wide Web. It covers virtually every letter in every language (including Arabic, Chinese, Greek, and Cyrillic) as well as modern emojis. Without UTF-8, special characters or emojis can render as broken squares or strange question marks (often called "mojibake").',
        ],
      },
      {
        heading: 'The Responsive Viewport Meta Tag',
        paragraphs: [
          'When smartphones were first introduced, they assumed websites were designed exclusively for wide 980px desktop screens. Mobile browsers would automatically zoom out, making the text tiny and unreadable.',
          'The tag <meta name="viewport" content="width=device-width, initial-scale=1.0"> tells mobile browsers: "Do not simulate a wide desktop. Set the viewport width to the actual physical device width and do not zoom out."',
        ],
      },
    ],
    codeExample: {
      language: 'html',
      filename: 'head-meta.html',
      code: `<head>
  <!-- Standard UTF-8 character encoding -->
  <meta charset="UTF-8" />

  <!-- Critical for mobile responsiveness -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Page Title (Browser Tab & Search Results) -->
  <title>Frontend Web Development Guide</title>

  <!-- SEO Search Snippet -->
  <meta name="description" content="A comprehensive, beginner-friendly guide to modern HTML, CSS, and web development fundamentals." />

  <!-- Favicon link -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</head>`,
      explanation:
        'These tags configure character sets, mobile rendering, search engine snippets, and branding icons before any page content is displayed.',
    },
    practicalExample: {
      title: 'Testing Emoji and International Characters',
      scenario: 'Verify that UTF-8 correctly renders international accents and emojis.',
      code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>UTF-8 Demo</title>
  </head>
  <body>
    <p>Café &bull; Naïve &bull; Zürich &bull; Tokyo (東京) &bull; 🚀 ✨</p>
  </body>
</html>`,
      explanation:
        'With UTF-8 configured, accents and emojis render flawlessly across every device and operating system.',
    },
    commonMistakes: [
      {
        mistake: 'Omitting the viewport meta tag and wondering why mobile layouts look tiny',
        whyItHappens: 'Forgetting that mobile devices default to 980px desktop simulation without the viewport tag.',
        howToFix: 'Include <meta name="viewport" content="width=device-width, initial-scale=1.0"> in every project template.',
        incorrectSnippet: `<head>
  <title>My Site</title>
</head>`,
        correctSnippet: `<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Site</title>
</head>`,
      },
    ],
    quiz: [
      {
        id: 'html-l3-q1',
        question: 'Why is <meta charset="UTF-8"> recommended in every modern HTML document?',
        options: [
          'It guarantees international characters, accented letters, and emojis render correctly without broken symbols.',
          'It automatically encrypts user login details before sending them to the server.',
          'It minifies HTML files to accelerate page downloads.',
          'It activates browser dark mode themes automatically.',
        ],
        correctOptionIndex: 0,
        explanation:
          'UTF-8 is the universal web character encoding. It covers virtually all characters and symbols across worldwide languages and emojis, preventing character corruption ("mojibake").',
      },
      {
        id: 'html-l3-q2',
        question: 'What is the primary role of <meta name="viewport" content="width=device-width, initial-scale=1.0">?',
        options: [
          'It locks the page in horizontal landscape mode on touch devices.',
          'It matches the viewport width to the device screen width, preventing mobile browsers from zooming out to desktop scale.',
          'It automatically resizes user photos before uploading them.',
          'It disables touch gestures and scrolling on tablet displays.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Without this viewport meta tag, mobile browsers assume a legacy desktop layout width (~980px) and render tiny, unreadable text. The tag sets scale to 1:1 with device width.',
      },
      {
        id: 'html-l3-q3',
        question: 'Where is the text inside the <title> tag shown to the end user?',
        options: [
          'As a large centered header on the webpage canvas.',
          'In the browser window tab, bookmarks list, and search engine results snippet.',
          'In an alert popup dialog right after the DOM finishes loading.',
          'In the browser developer console only.',
        ],
        correctOptionIndex: 1,
        explanation:
          'The <title> tag defines the document name displayed on the browser tab, bookmark listings, and search engine result link headers.',
      },
    ],
  },

  // Lesson 1.4: Headings Hierarchy & Paragraphs
  'html-l4': {
    id: 'html-l4',
    courseSlug: 'html',
    title: 'Headings Hierarchy (h1 - h6) & Paragraphs',
    duration: '14 min',
    introduction:
      'Headings are the structural scaffolding of written documents. Search engines, screen readers, and human readers rely on heading levels to scan, understand, and navigate page content. In this lesson, you will learn the mathematical rules of heading hierarchy and how to pair headings with clean paragraph blocks.',
    learningObjectives: [
      'Understand the 6 heading levels from <h1> (most important) down to <h6> (sub-sub-topic)',
      'Learn the strict rule of having exactly one <h1> per primary page document',
      'Avoid skipping heading levels (e.g., going directly from <h1> to <h3>)',
      'Format running copy with <p> tags and understand whitespace collapsing',
    ],
    explanation: [
      {
        heading: 'The 6 Heading Levels (h1 through h6)',
        paragraphs: [
          'HTML provides six heading tags: <h1>, <h2>, <h3>, <h4>, <h5>, and <h6>. They represent an outline of the document, much like a table of contents in a textbook.',
          'The <h1> tag represents the primary title of the page or document. You should generally have only one <h1> per page. It tells search engine spiders and screen readers the single most important topic of the document.',
          'Subsequent sections under the main title use <h2>. If an <h2> section is further broken down into sub-topics, those sub-topics use <h3>.',
        ],
        keyPoints: [
          '<h1>: Page title or main document subject (exactly one).',
          '<h2>: Major section headings.',
          '<h3>: Sub-headings within an <h2> section.',
          'Never skip levels: Going directly from <h1> to <h3> is an accessibility defect.',
        ],
      },
      {
        heading: 'Paragraphs & HTML Whitespace Collapsing',
        paragraphs: [
          'Body copy is wrapped in <p> tags. Browsers automatically insert top and bottom margin around paragraphs to separate thoughts clearly.',
          'An important quirk of HTML is whitespace collapsing: no matter how many spaces or line returns you press inside your code editor, the browser will collapse them into a single space. To create new paragraphs or separate lines, you must use HTML elements like <p> rather than pressing Enter multiple times.',
        ],
      },
    ],
    codeExample: {
      language: 'html',
      filename: 'headings.html',
      code: `<!-- Correct Heading Hierarchy -->
<h1>Understanding Cloud Computing</h1>

<h2>1. What is the Cloud?</h2>
<p>Cloud computing is the on-demand availability of computer system resources.</p>

<h2>2. Cloud Service Models</h2>
<p>Cloud platforms typically provide services categorized into three distinct tiers.</p>

<h3>Infrastructure as a Service (IaaS)</h3>
<p>Provides raw virtualized hardware, storage, and networking capacity.</p>

<h3>Platform as a Service (PaaS)</h3>
<p>Provides managed runtimes and deployment pipelines for developers.</p>`,
      explanation:
        'Notice how the <h3> subheadings naturally nest under the <h2> section. This creates a predictable tree outline.',
    },
    practicalExample: {
      title: 'Article Outline Structure',
      scenario: 'Building a clean blog post outline with semantic hierarchy.',
      code: `<article>
  <h1>The History of Web Browsers</h1>
  <p>Published on September 12, 2026 by CLOUD Editorial</p>

  <h2>Early Innovations</h2>
  <p>Tim Berners-Lee created WorldWideWeb at CERN in 1990.</p>

  <h2>The Modern Era</h2>
  <p>Modern standards have unified browsers around W3C and WHATWG specifications.</p>
</article>`,
      explanation:
        'Screen reader software allows visually impaired users to press the "H" key to jump quickly between <h2> sections.',
    },
    commonMistakes: [
      {
        mistake: 'Using multiple <h1> tags on a single standard page',
        whyItHappens: 'Wanting large text in multiple places.',
        howToFix: 'Keep one <h1> for the page title, and use <h2> for major sections.',
        incorrectSnippet: `<h1>Introduction</h1>
<p>Some text</p>
<h1>Our Team</h1> <!-- Wrong: should be h2 -->`,
        correctSnippet: `<h1>Company Overview</h1>
<h2>Introduction</h2>
<p>Some text</p>
<h2>Our Team</h2>`,
      },
      {
        mistake: 'Skipping heading levels (e.g., <h1> followed by <h3>)',
        whyItHappens: 'Liking the default font size of <h3> better than <h2>.',
        howToFix: 'Never pick heading tags based on visual size. Use CSS to adjust font size if needed.',
        incorrectSnippet: `<h1>Getting Started</h1>
<h3>Step 1: Install Node</h3> <!-- Skipped h2! -->`,
        correctSnippet: `<h1>Getting Started</h1>
<h2>Step 1: Install Node</h2>`,
      },
    ],
    quiz: [
      {
        id: 'html-l4-q1',
        question: 'How many <h1> headings should a standard webpage document typically contain?',
        options: [
          'One for each paragraph or subsection.',
          'Exactly one primary <h1> per page representing the overall document subject.',
          'As many as desired to make text visually prominent.',
          'Headings must always appear in pairs of two.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Accessibility standards and search engine algorithms expect exactly one <h1> per page to define the overarching title and document theme.',
      },
      {
        id: 'html-l4-q2',
        question: 'Why is skipping heading levels (such as jumping from <h1> directly into <h3>) considered an accessibility error?',
        options: [
          'It triggers a runtime browser JavaScript exception.',
          'Screen readers rely on sequential heading outlines; skipping levels confuses users navigating by section structure.',
          'Browsers will stop loading external stylesheets if levels are skipped.',
          'HTML5 specifications do not allow <h3> tags under any circumstance.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Screen reader users frequently press keys to cycle through headings level by level. Skipping numbers creates an inconsistent, broken document outline.',
      },
      {
        id: 'html-l4-q3',
        question: 'What does a web browser do when you type multiple consecutive spaces or line breaks in HTML source text?',
        options: [
          'It preserves every single space and line break exactly as written in the editor.',
          'It collapses all consecutive spaces and line breaks into a single space.',
          'It throws a syntax error on screen.',
          'It converts the text into an italic bulleted list.',
        ],
        correctOptionIndex: 1,
        explanation:
          'HTML whitespace collapsing combines multiple spaces, tabs, and carriage returns into one space. To create new paragraphs or lines, you use tags like <p> or <br>.',
      },
    ],
  },
};

/**
 * Fallback generator function that creates realistic, contextual, beginner-friendly
 * lesson content for any lesson in any course if it doesn't already have a dedicated entry.
 */
export function getLessonDetail(course: Course, lesson: Lesson): LessonDetail {
  // Check if we have an explicit detailed lesson authored
  if (LESSON_DETAILS[lesson.id]) {
    return LESSON_DETAILS[lesson.id];
  }

  // Find module for this lesson
  const parentModule = course.modules.find((m) =>
    m.lessons.some((l) => l.id === lesson.id)
  );
  const moduleTitle = parentModule?.title || 'Core Fundamentals';

  // Build contextual language and code example based on course technology
  let language = 'html';
  let sampleSnippet = `<!-- Sample code for ${lesson.title} -->\n<div class="container">\n  <p>Learn ${lesson.title}</p>\n</div>`;
  let commonMistakeExample = {
    mistake: `Syntax or formatting misconfiguration in ${lesson.title}`,
    whyItHappens: 'Commonly happens when learning new conceptual keywords and scoping rules.',
    howToFix: 'Review the official specification and verify syntax with a linter.',
  };

  if (course.slug === 'css') {
    language = 'css';
    sampleSnippet = `/* Modern CSS for ${lesson.title} */\n.card {\n  display: flex;\n  flex-direction: column;\n  padding: 1.5rem;\n  border-radius: 12px;\n  background-color: var(--surface-bg, #ffffff);\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n}`;
    commonMistakeExample = {
      mistake: 'Confusing display flex with display grid or improper property inheritance',
      whyItHappens: 'CSS properties behave differently depending on whether they apply to containers or child items.',
      howToFix: 'Identify whether the property belongs on the parent container or on child items.',
    };
  } else if (course.slug === 'javascript') {
    language = 'javascript';
    sampleSnippet = `// Clean ES6+ implementation for ${lesson.title}\nfunction handleAction(data) {\n  if (!data) {\n    throw new Error('Data payload required');\n  }\n  const processed = data.map((item) => item.trim());\n  return processed;\n}\n\nconsole.log(handleAction(['  learning  ', '  code  ']));`;
    commonMistakeExample = {
      mistake: 'Directly mutating variables or array data instead of creating clean copies',
      whyItHappens: 'Arrays and objects are reference types in JavaScript, so modifying them in place affects all references.',
      howToFix: 'Use functional methods like .map(), .filter(), or spread syntax [...array].',
    };
  } else if (course.slug === 'react') {
    language = 'tsx';
    sampleSnippet = `import React, { useState } from 'react';\n\n// Demonstrating ${lesson.title}\nexport function CounterCard() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div className="p-4 border rounded-xl bg-white">\n      <h3 className="font-bold text-slate-900">Count: {count}</h3>\n      <button\n        type="button"\n        onClick={() => setCount((prev) => prev + 1)}\n        className="mt-3 px-3 py-1.5 bg-sky-600 text-white rounded-lg text-sm"\n      >\n        Increment\n      </button>\n    </div>\n  );\n}`;
    commonMistakeExample = {
      mistake: 'Mutating React state directly without calling the setter function',
      whyItHappens: 'Forgetting that React needs state setter functions to detect changes and trigger UI re-renders.',
      howToFix: 'Always call setState() or use the updater callback form: setState((prev) => prev + 1).',
    };
  } else if (course.slug === 'python') {
    language = 'python';
    sampleSnippet = `# Python standard implementation for ${lesson.title}\ndef process_records(items: list[str]) -> dict[str, int]:\n    """Process and count occurrences cleanly."""\n    counts = {}\n    for item in items:\n        cleaned = item.strip().lower()\n        counts[cleaned] = counts.get(cleaned, 0) + 1\n    return counts\n\nresults = process_records(["Python", "python", "Code"])\nprint(f"Results: {results}")`;
    commonMistakeExample = {
      mistake: 'Indentation mismatch or confusing mutable default function arguments',
      whyItHappens: 'Python relies strictly on whitespace indentation to define code block scope.',
      howToFix: 'Use consistent 4-space indentation and never use mutable collections as default arguments.',
    };
  }

  return {
    id: lesson.id,
    courseSlug: course.slug,
    title: lesson.title,
    duration: lesson.duration,
    introduction:
      lesson.description ||
      `In this lesson, you will master the foundational principles of ${lesson.title} as part of the ${moduleTitle} module. We break down the core mechanics into clear, bite-sized concepts so you can apply them immediately.`,
    learningObjectives: [
      `Understand the core terminology and syntax for ${lesson.title}`,
      `Learn how ${lesson.title} integrates into the broader ${course.title} architecture`,
      `Inspect real-world code snippets and identify standard conventions`,
      `Recognize and prevent the most common errors encountered by beginners`,
    ],
    explanation: [
      {
        heading: `Core Concept: ${lesson.title}`,
        paragraphs: [
          `${lesson.title} is a critical milestone within ${moduleTitle}. In modern development, understanding how this concept operates under the hood allows you to write resilient, maintainable code.`,
          `When working with ${course.title}, mastering this pattern ensures that your implementations adhere to industry best practices, performance standards, and accessibility requirements.`,
        ],
        keyPoints: [
          `Clear mental models prevent debugging frustration later.`,
          `Always prioritize readability and semantic clarity over clever shortcuts.`,
          `Verify that code runs predictably across all modern browser and runtime environments.`,
        ],
      },
      {
        heading: 'How to Think About This in Practice',
        paragraphs: [
          'Professional engineers approach this by breaking problems into discrete, verifiable steps. Before writing code, outline what inputs are received, how data or layout is transformed, and what result is produced.',
        ],
      },
    ],
    codeExample: {
      language,
      filename: `example.${language === 'javascript' ? 'js' : language === 'python' ? 'py' : language === 'css' ? 'css' : 'html'}`,
      code: sampleSnippet,
      explanation: `This code block illustrates the clean implementation of ${lesson.title}. Notice the structured formatting, descriptive identifiers, and clear separation of concerns.`,
    },
    practicalExample: {
      title: `Real-World Application: ${lesson.title}`,
      scenario: `Here is a concrete scenario showing how ${lesson.title} is applied in production applications.`,
      code: sampleSnippet,
      explanation: `By keeping the implementation focused and modular, you ensure that other team members can easily read and extend your work.`,
    },
    commonMistakes: [
      {
        mistake: commonMistakeExample.mistake,
        whyItHappens: commonMistakeExample.whyItHappens,
        howToFix: commonMistakeExample.howToFix,
      },
      {
        mistake: 'Rushing to copy-paste code without understanding the underlying mechanics',
        whyItHappens: 'It is tempting to grab quick solutions online without understanding why they work.',
        howToFix: 'Type out code examples manually and test different variations to build muscle memory.',
      },
    ],
    quiz: [
      {
        id: `${lesson.id}-q1`,
        question: `What is the primary role of ${lesson.title} in modern development?`,
        options: [
          `It provides standardized, maintainable patterns for building ${course.title} applications.`,
          `It eliminates all necessity for testing and debugging.`,
          `It automatically compiles code into database queries.`,
          `It is a deprecated technique no longer used in production.`,
        ],
        correctOptionIndex: 0,
        explanation: `Mastering ${lesson.title} establishes clean architecture, consistency, and best practices within ${course.title}.`,
      },
      {
        id: `${lesson.id}-q2`,
        question: `When implementing ${lesson.title}, which approach reflects best engineering practices?`,
        options: [
          `Bypassing standards and using copy-pasted code without testing.`,
          `Writing readable, modular code with clear separation of concerns and semantic intent.`,
          `Hardcoding variables and avoiding documentation.`,
          `Putting all application logic into a single monolithic function.`,
        ],
        correctOptionIndex: 1,
        explanation: `Industry standards emphasize clarity, modularity, accessibility, and separation of concerns when working with ${course.title}.`,
      },
      {
        id: `${lesson.id}-q3`,
        question: `What is a common mistake developers should avoid with ${lesson.title}?`,
        options: [
          `Reading the official documentation before implementing.`,
          commonMistakeExample.mistake,
          `Writing clear, readable function and variable names.`,
          `Testing the implementation across multiple devices.`,
        ],
        correctOptionIndex: 1,
        explanation: `A common pitfall is: ${commonMistakeExample.mistake}. Always check syntax, scoping, and data flow carefully.`,
      },
    ],
  };
}
