import { LessonDetail } from '../../types';

export const HTML_LESSONS: Record<string, LessonDetail> = {
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
        mistake: 'Using HTML tags for visual formatting instead of semantic meaning',
        whyItHappens: 'Beginners sometimes use <b> or <i> just to make words bold or italic, rather than using CSS or semantic tags like <strong> or <em>.',
        howToFix: 'Use HTML purely for structural meaning and accessibility, and use CSS for visual appearance.',
        incorrectSnippet: `<p><b>Warning:</b> Do not enter.</p>`,
        correctSnippet: `<p><strong>Warning:</strong> Do not enter.</p>`,
      },
    ],
    practice: {
      title: 'Create Your Personal Profile Markup',
      instructions: [
        'Open a text editor and structure an HTML snippet for a developer bio card.',
        'Include a main heading (<h1>) with your name or username.',
        'Add a short paragraph (<p>) describing what programming concepts you want to learn.',
        'Add a link (<a>) pointing to your favorite tech documentation site.',
      ],
      starterCode: `<!-- Write your profile card snippet here -->
<h1>Developer Name</h1>
<p>I am learning HTML to...</p>
<a href="https://example.com">My Favorite Resource</a>`,
      hint: 'Ensure every opening tag matches with an appropriate closing tag and use quotes around attribute values.',
      solutionCode: `<h1>Alex Johnson</h1>
<p>I am learning HTML and CSS to build accessible, lightning-fast web applications.</p>
<a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">
  Explore MDN Web Docs
</a>`,
    },
    projectConnection: {
      title: 'Foundation of Every Single Web Application',
      description:
        'Whether an application is built in Next.js, Vue, Angular, or raw vanilla scripts, the browser ultimately only understands HTML, CSS, and JavaScript. The DOM tree you establish here is what APIs query and what search engines index.',
      howItApplies:
        'When building a real product like a blog or an e-commerce checkout, search crawlers (like Googlebot) read the raw HTML before executing complex JavaScript. Clean markup directly determines your search engine visibility and accessibility score.',
    },
    quiz: [
      {
        id: 'html-l1-q1',
        question: 'What is the primary responsibility of HTML in a modern web stack?',
        options: [
          'Defining the structural content and semantic meaning of a webpage',
          'Controlling animations, colors, and responsive grid layouts',
          'Executing server-side database queries and managing user sessions',
          'Encrypting HTTPS network traffic between the client and server',
        ],
        correctOptionIndex: 0,
        explanation:
          'HTML is the markup language responsible for structural content and semantic hierarchy. CSS handles presentation/styling, and JavaScript handles dynamic behavior.',
      },
      {
        id: 'html-l1-q2',
        question: 'Which of the following is a self-closing (void) element in HTML5?',
        options: [
          '<p>',
          '<h1>',
          '<img>',
          '<section>',
        ],
        correctOptionIndex: 2,
        explanation:
          'The <img> element is a void element because it cannot contain child text or elements; its content is defined solely via attributes like src and alt.',
      },
      {
        id: 'html-l1-q3',
        question: 'What happens when a browser downloads an HTML file from a web server?',
        options: [
          'It compiles the code into binary machine bytecode.',
          'It parses the HTML markup from top to bottom and builds the Document Object Model (DOM).',
          'It converts all tags into relational database tables.',
          'It rejects any file that does not have an active JavaScript backend.',
        ],
        correctOptionIndex: 1,
        explanation:
          'The browser parsing engine reads the HTML text stream and builds a node tree in memory called the DOM, which is then rendered onto the screen.',
      },
    ],
  },

  'html-l2': {
    id: 'html-l2',
    courseSlug: 'html',
    title: 'The Modern HTML5 Boilerplate',
    duration: '12 min',
    introduction:
      'Every production webpage begins with a standardized document template. In this lesson, you will dissect the HTML5 boilerplate line by line, discovering why <!DOCTYPE html> is essential, what the <html>, <head>, and <body> elements do, and how they work in harmony.',
    learningObjectives: [
      'Understand the purpose of the <!DOCTYPE html> declaration and quirks mode prevention',
      'Learn the roles and differences between the <head> and <body> zones',
      'Configure the root <html lang="en"> element for screen readers and search engines',
      'Recognize where scripts, stylesheets, and visual elements belong in a document',
    ],
    explanation: [
      {
        heading: 'The Role of <!DOCTYPE html>',
        paragraphs: [
          'The very first line of any modern HTML document must be <!DOCTYPE html>. This is not an HTML tag; it is a document type declaration instruction to the web browser.',
          'Without this line, modern browsers revert into a legacy behavior known as "quirks mode", rendering CSS and layout rules using 1990s Netscape/Internet Explorer bugs rather than modern W3C standards.',
        ],
        keyPoints: [
          'Case-insensitive, but <!DOCTYPE html> in uppercase is the universal convention.',
          'Must be the absolute first character sequence in the file (no comments or empty spaces before it).',
        ],
      },
      {
        heading: 'The Two Halves: <head> vs <body>',
        paragraphs: [
          'An HTML document is divided into two distinct zones inside the root <html> element: the <head> and the <body>.',
          'The <head> element contains metadata: instructions for the browser and search engines that are NOT directly drawn on the main webpage canvas. This includes character encoding, viewport settings, title, icons, and links to external CSS.',
          'The <body> element contains everything the user actually sees and interacts with: text, buttons, navigation bars, images, tables, and footers.',
        ],
      },
    ],
    codeExample: {
      language: 'html',
      filename: 'index.html',
      code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SaaS Product - Fast, Clean Learning</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <header>
      <h1>Welcome to Cloud Learning</h1>
    </header>
    <main>
      <p>Start your learning journey today.</p>
    </main>
  </body>
</html>`,
      explanation:
        'This is the industry standard HTML5 boilerplate. The lang="en" attribute informs translation tools and screen readers that the document is written in English.',
    },
    practicalExample: {
      title: 'Setting Up a Production Project Entry File',
      scenario:
        'When you initialize any new frontend application (such as Vite, Create React App, or a static portfolio), the index.html file provides this exact foundation.',
      code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="description" content="Master coding concepts step by step.">
    <title>Portfolio - Jane Doe</title>
  </head>
  <body>
    <div id="root">
      <h2>Jane Doe — Software Engineer</h2>
      <p>Building accessible web applications.</p>
    </div>
  </body>
</html>`,
      explanation:
        'Even single-page JavaScript apps mount inside the <body> of this standard boilerplate document.',
      outputDescription: 'Renders a clean white webpage with the document title displayed in the browser tab and the heading in the viewport.',
    },
    commonMistakes: [
      {
        mistake: 'Placing visible UI elements (like <h1> or <p>) inside the <head>',
        whyItHappens: 'Misunderstanding the separation of metadata versus visible canvas elements.',
        howToFix: 'All visible content belongs exclusively inside <body>. The <head> is strictly for <meta>, <title>, <link>, and <style>.',
        incorrectSnippet: `<head>
  <title>My Page</title>
  <h1>Welcome to my website</h1>
</head>`,
        correctSnippet: `<head>
  <title>My Page</title>
</head>
<body>
  <h1>Welcome to my website</h1>
</body>`,
      },
    ],
    practice: {
      title: 'Build a Complete HTML5 Document',
      instructions: [
        'Write a complete HTML5 boilerplate from memory.',
        'Declare <!DOCTYPE html> on line 1.',
        'Wrap the document in an <html lang="en"> tag.',
        'Add a <head> containing a <meta charset="UTF-8"> and a descriptive <title>.',
        'In the <body>, create a level 1 heading and a welcome paragraph.',
      ],
      starterCode: `<!-- Write your HTML5 boilerplate from scratch below -->
`,
      hint: 'Remember the document structure: DOCTYPE -> html -> head + body -> closing html tag.',
      solutionCode: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Developer Portfolio</title>
  </head>
  <body>
    <h1>Alex Rivera</h1>
    <p>Frontend engineer passionate about accessible interfaces.</p>
  </body>
</html>`,
    },
    projectConnection: {
      title: 'Standard Entry Point for All Web Projects',
      description:
        'Every single modern web framework (React, Next.js, Angular, Svelte) generates or relies on a base HTML5 boilerplate. Setting up the correct meta tags and lang attributes prevents layout shifts on mobile devices.',
      howItApplies:
        'In production, forgetting meta viewport or lang attributes causes mobile browsers to zoom out to a 980px desktop view, instantly ruining the mobile user experience.',
    },
    quiz: [
      {
        id: 'html-l2-q1',
        question: 'What is the primary reason for including <!DOCTYPE html> on the first line?',
        options: [
          'It forces the browser to render the page in modern standards mode rather than quirks mode.',
          'It connects the document to a remote database server.',
          'It activates the JavaScript V8 execution engine.',
          'It imports the default Google fonts into the browser cache.',
        ],
        correctOptionIndex: 0,
        explanation:
          'The <!DOCTYPE html> declaration instructs modern browsers to interpret CSS and HTML according to modern W3C standards mode.',
      },
      {
        id: 'html-l2-q2',
        question: 'Which element is designed exclusively for metadata and cannot contain visible UI elements?',
        options: ['<body>', '<head>', '<main>', '<header>'],
        correctOptionIndex: 1,
        explanation:
          'The <head> section is dedicated strictly to document metadata like title, charset, meta tags, and stylesheet links.',
      },
      {
        id: 'html-l2-q3',
        question: 'Why is the attribute lang="en" placed on the <html> root element?',
        options: [
          'To force the operating system to install English fonts',
          'To assist screen readers with pronunciation and search engines with language indexing',
          'To validate that all CSS class names are written in English',
          'To enable English spellchecking on every input element automatically',
        ],
        correctOptionIndex: 1,
        explanation:
          'Declaring the language helps assistive technology (screen readers) pronounce words correctly and enables search engines to route users to the appropriate language version.',
      },
    ],
  },

  'html-l3': {
    id: 'html-l3',
    courseSlug: 'html',
    title: 'Document Head, Charset & Meta Tags',
    duration: '14 min',
    introduction:
      'Behind every fast, mobile-friendly, and search-optimized webpage is a carefully configured <head> section. In this lesson, you will master character encodings (UTF-8), the crucial viewport meta tag for mobile responsiveness, social sharing tags (Open Graph), and SEO descriptions.',
    learningObjectives: [
      'Learn why <meta charset="UTF-8"> prevents character corruption for emojis and global alphabets',
      'Master the meta viewport configuration for seamless mobile responsiveness',
      'Write effective SEO description meta tags for search engine results snippets',
      'Understand Open Graph and Twitter card meta tags for rich social media links',
    ],
    explanation: [
      {
        heading: 'Character Encoding: UTF-8',
        paragraphs: [
          'Computers only understand zeros and ones. Character encoding translates human characters (letters, numbers, punctuation, emojis, and global alphabets like Arabic, Chinese, or Cyrillic) into binary byte sequences.',
          'UTF-8 is the universal standard for the World Wide Web. By specifying <meta charset="UTF-8"> within the first 1024 bytes of your HTML document, you guarantee that text, accents, and symbols display correctly without visual corruption (called "mojibake").',
        ],
      },
      {
        heading: 'The Responsive Viewport Meta Tag',
        paragraphs: [
          'Before smartphones, mobile browsers assumed every site was designed for a 980-pixel wide desktop screen and zoomed out tiny text to fit the phone display.',
          'The tag <meta name="viewport" content="width=device-width, initial-scale=1.0"> instructs the mobile browser to match the viewport width to the device physical pixel width and set a 1:1 zoom ratio. Without this tag, responsive CSS media queries will not function as expected.',
        ],
        keyPoints: [
          'width=device-width: Tells the browser to set page width to match screen width.',
          'initial-scale=1.0: Sets the default initial zoom level when the page loads.',
        ],
      },
    ],
    codeExample: {
      language: 'html',
      filename: 'meta-tags.html',
      code: `<head>
  <!-- 1. Universal character encoding -->
  <meta charset="UTF-8">

  <!-- 2. Responsive viewport for mobile smartphones & tablets -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- 3. Primary Page Title and Search Meta Description -->
  <title>Learn Web Architecture | CLOUD Platform</title>
  <meta name="description" content="Interactive coding courses covering HTML, CSS, JavaScript, React, and Python with hands-on practice.">

  <!-- 4. Open Graph Social Media Sharing Preview -->
  <meta property="og:title" content="CLOUD - Modern Coding Platform">
  <meta property="og:description" content="Master web architecture with hands-on lessons and quizzes.">
  <meta property="og:image" content="https://example.com/banner.jpg">
</head>`,
      explanation:
        'These tags configure the document for global text safety, mobile phone responsiveness, search engine snippets, and rich social media link previews on Twitter, WhatsApp, and LinkedIn.',
    },
    practicalExample: {
      title: 'Preparing a Link for Social Media & Google Search',
      scenario:
        'When you share a link on Slack, Discord, or Twitter, the app scrapes your <head> to display a beautiful card with a title, image, and snippet.',
      code: `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fresh Coffee Roasters - Artisanal Beans</title>
  <meta name="description" content="Ethically sourced specialty single-origin coffee roasted fresh daily in small batches.">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Fresh Coffee Roasters">
  <meta property="og:description" content="Discover our seasonal coffee beans with free shipping on all orders over $30.">
</head>`,
      explanation:
        'Google uses the description meta tag to generate the two-line preview snippet beneath the link title in search results.',
      outputDescription: 'Configures search engine listing snippets and chat application preview cards.',
    },
    commonMistakes: [
      {
        mistake: 'Omitting the viewport meta tag when building a responsive website',
        whyItHappens: 'Developers assume CSS media queries alone will make a site responsive on mobile.',
        howToFix: 'Always include <meta name="viewport" content="width=device-width, initial-scale=1.0"> in every project <head>.',
        incorrectSnippet: `<head>
  <title>My Mobile Site</title>
</head>`,
        correctSnippet: `<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Mobile Site</title>
</head>`,
      },
    ],
    practice: {
      title: 'Configure SEO & Responsive Metadata',
      instructions: [
        'Create a complete <head> block for an online bookstore.',
        'Add the UTF-8 character encoding tag.',
        'Add the responsive viewport meta tag.',
        'Add a page title: "Chapter & Verse — Independent Bookstore".',
        'Add a concise search engine description under 155 characters.',
      ],
      starterCode: `<head>
  <!-- Add your metadata here -->
</head>`,
      hint: 'Use meta charset, meta name="viewport", title, and meta name="description".',
      solutionCode: `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chapter & Verse — Independent Bookstore</title>
  <meta name="description" content="Curated fiction, non-fiction, and poetry with same-day local delivery and community book club events.">
</head>`,
    },
    projectConnection: {
      title: 'Search Engine Optimization (SEO) & Marketing Growth',
      description:
        'High-ranking commercial websites optimize their <head> metadata meticulously. Without clear title and description meta tags, click-through rates from search results drop significantly.',
      howItApplies:
        'In e-commerce and SaaS products, every dynamic product page automatically generates unique meta titles and descriptions using database records to drive organic customer traffic.',
    },
    quiz: [
      {
        id: 'html-l3-q1',
        question: 'What is the consequence of omitting the viewport meta tag on mobile devices?',
        options: [
          'The mobile browser will fail to load the HTML file entirely.',
          'The mobile browser will simulate a 980px desktop window and zoom out, shrinking all text.',
          'All images will be permanently hidden by default.',
          'JavaScript execution will be halted by the browser engine.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Without the viewport meta tag, mobile browsers default to a desktop virtual viewport (typically 980px) and zoom out, making elements tiny.',
      },
      {
        id: 'html-l3-q2',
        question: 'Which character encoding is the universal standard for modern web documents?',
        options: ['ASCII', 'ISO-8859-1', 'UTF-8', 'Windows-1252'],
        correctOptionIndex: 2,
        explanation:
          'UTF-8 supports virtually all world languages, symbols, and emojis, making it the universal standard on the modern web.',
      },
      {
        id: 'html-l3-q3',
        question: 'Where do Open Graph (og:title, og:image) meta tags belong in the document?',
        options: [
          'Inside the <footer> tag at the bottom of the page',
          'Inside the <head> section of the document',
          'Inside the <main> landmark',
          'Directly inside external CSS files',
        ],
        correctOptionIndex: 1,
        explanation:
          'Open Graph metadata belongs exclusively in the <head> section so web scrapers and social preview bots can read it before rendering the page.',
      },
    ],
  },

  'html-l4': {
    id: 'html-l4',
    courseSlug: 'html',
    title: 'Headings Hierarchy (h1 - h6) & Paragraphs',
    duration: '14 min',
    introduction:
      'Visual layout is not just about aesthetics—it is about information hierarchy. In this lesson, you will learn how to structure documents using the six levels of HTML headings (<h1> through <h6>) and paragraphs (<p>), how search engines and screen readers parse your document outline, and why skipping heading levels is a critical accessibility defect.',
    learningObjectives: [
      'Master the semantic ranking of heading elements from <h1> (highest) to <h6> (lowest)',
      'Learn why there should typically be only one <h1> per page',
      'Understand how screen reader users navigate long documents via headings',
      'Format running copy and line breaks with <p> and <br>',
    ],
    explanation: [
      {
        heading: 'The Heading Hierarchy Rules',
        paragraphs: [
          'HTML provides six levels of section headings: <h1>, <h2>, <h3>, <h4>, <h5>, and <h6>. <h1> represents the main topic of the entire document, <h2> represents major chapters or sections, and <h3> represents subsections within an <h2>.',
          'Think of headings as creating an outline or table of contents for a book. Screen reader users often press a shortcut key (like "H") to jump from heading to heading to quickly skim a page.',
        ],
        keyPoints: [
          'Never choose a heading level based on how big or small you want the text to look. Use CSS font-size for styling.',
          'Do not skip heading levels (e.g., do not jump directly from <h1> to <h3> without an intervening <h2>).',
          'A page should virtually always have exactly one <h1> identifying the primary subject of that view.',
        ],
      },
      {
        heading: 'Paragraphs & Text Flow',
        paragraphs: [
          'The <p> element represents a paragraph of text. Browsers automatically add vertical margin before and after paragraphs to create readable separation between blocks of copy.',
          'If you need a simple line break within a single paragraph (such as in a physical postal address or a poem), use the void <br> element. Do not use <br> to create vertical spacing between separate thoughts—use distinct <p> tags or CSS margins instead.',
        ],
      },
    ],
    codeExample: {
      language: 'html',
      filename: 'headings-outline.html',
      code: `<!-- Main topic of the entire page (one h1) -->
<h1>Web Development Comprehensive Guide</h1>

<!-- Major Section 1 -->
<h2>Frontend Technologies</h2>
<p>Frontend development encompasses everything users interact with directly in the browser.</p>

<!-- Subsection 1.1 -->
<h3>Semantic HTML</h3>
<p>HTML provides the structural skeleton of web applications.</p>

<!-- Subsection 1.2 -->
<h3>Cascading Style Sheets (CSS)</h3>
<p>CSS controls visual aesthetics, typography, and responsive grid layouts.</p>

<!-- Major Section 2 -->
<h2>Backend Technologies</h2>
<p>Backend systems handle persistent storage, APIs, and business logic.</p>`,
      explanation:
        'Notice the strict logical nesting: <h2> headings divide the main topic, and <h3> headings subdivide the <h2>. There is no skipping of levels.',
    },
    practicalExample: {
      title: 'Structuring a Tech Blog Article',
      scenario:
        'When publishing an article or news post, a clean heading outline ensures optimal Google indexing and accessibility compliance.',
      code: `<article>
  <h1>Understanding Asynchronous JavaScript</h1>
  <p class="article-meta">Published on September 12 by Engineering Team</p>
  
  <h2>What is the Event Loop?</h2>
  <p>JavaScript executes code synchronously on a single main thread...</p>

  <h3>Microtasks vs Macrotasks</h3>
  <p>Promises are queued in the microtask queue, giving them priority...</p>

  <h2>Common Async Pitfalls</h2>
  <p>Forgetting to await a promise can lead to unresolved promise rejections.</p>
</article>`,
      explanation:
        'Search engine crawlers read this outline to understand the topics and subtopics discussed in the article.',
      outputDescription: 'Renders a structured article with prominent titles and distinct hierarchical section markers.',
    },
    commonMistakes: [
      {
        mistake: 'Using heading tags solely for visual font size (e.g. using <h4> just because you want small bold text)',
        whyItHappens: 'Beginners associate <h6> with "small text" and <h1> with "large text".',
        howToFix: 'Choose tags based on semantic document hierarchy. Change visual font sizes using CSS classes.',
        incorrectSnippet: `<p>Welcome!</p>
<h6>Click here to download our free guide</h6>`,
        correctSnippet: `<p>Welcome!</p>
<p class="text-sm font-bold">Click here to download our free guide</p>`,
      },
      {
        mistake: 'Using multiple consecutive <br><br> tags to create spacing between paragraphs',
        whyItHappens: 'Treating HTML like a word processor typewriter.',
        howToFix: 'Wrap distinct blocks of text in separate <p> tags, and use CSS margin/padding for visual spacing.',
        incorrectSnippet: `Hello World<br><br>This is the next thought<br><br>And another`,
        correctSnippet: `<p>Hello World</p>
<p>This is the next thought</p>
<p>And another</p>`,
      },
    ],
    practice: {
      title: 'Create a Recipe Page Document Outline',
      instructions: [
        'Structure a recipe page with a logical heading hierarchy.',
        'Use an <h1> for the recipe name: "Homemade Sourdough Bread".',
        'Add an introductory paragraph describing the loaf.',
        'Add an <h2> for "Ingredients" and an <h2> for "Step-by-Step Instructions".',
        'Under instructions, add <h3> headings for "Preparing the Starter" and "Baking".',
      ],
      starterCode: `<!-- Write your recipe outline below -->
`,
      hint: 'Ensure your hierarchy follows: h1 -> h2 -> h3 without skipping any levels.',
      solutionCode: `<h1>Homemade Sourdough Bread</h1>
<p>A crusty, golden loaf with a tender crumb and deep fermented flavor.</p>

<h2>Ingredients</h2>
<p>500g bread flour, 350g lukewarm water, 100g active sourdough starter, 10g fine sea salt.</p>

<h2>Step-by-Step Instructions</h2>

<h3>Preparing the Starter</h3>
<p>Feed your starter 4-6 hours before mixing until it doubles in volume and passes the float test.</p>

<h3>Baking</h3>
<p>Preheat a Dutch oven to 450°F (230°C) and bake covered for 20 minutes, then uncovered for 20 minutes.</p>`,
    },
    projectConnection: {
      title: 'Accessibility Compliance (WCAG 2.1) & Assistive Technology',
      description:
        'Screen readers used by visually impaired individuals rely heavily on heading navigation. In accessibility audits, skipped heading levels or pages lacking an <h1> represent immediate compliance violations.',
      howItApplies:
        'Enterprise products and government portals must pass accessibility audits (such as Section 508 / WCAG AA) to avoid legal liability and ensure inclusivity for all users.',
    },
    quiz: [
      {
        id: 'html-l4-q1',
        question: 'Why is it considered bad practice to jump directly from an <h1> to an <h3>?',
        options: [
          'Browsers will throw a syntax error and stop rendering the page.',
          'It breaks the logical document outline for screen readers and search crawlers.',
          'CSS stylesheets cannot apply fonts to skipped headings.',
          'It increases the downloaded page weight significantly.',
        ],
        correctOptionIndex: 1,
        explanation:
          'Skipping heading levels creates a broken document hierarchy for assistive technologies and search engine indexers.',
      },
      {
        id: 'html-l4-q2',
        question: 'How many <h1> elements should typically exist on a standard web page?',
        options: ['Exactly one per page to represent the primary document topic', 'As many as possible to boost SEO keywords', 'One for every paragraph', 'Zero, <h1> is deprecated in HTML5'],
        correctOptionIndex: 0,
        explanation:
          'Best practice dictates one <h1> per page representing the overall subject of that specific document or page view.',
      },
      {
        id: 'html-l4-q3',
        question: 'When is it appropriate to use the <br> tag?',
        options: [
          'To create large vertical spacing between layout cards',
          'For semantic line breaks where a new line is part of the content (like postal addresses or poems)',
          'To reset CSS float properties',
          'Between every single sentence on the page',
        ],
        correctOptionIndex: 1,
        explanation:
          'The <br> tag is meant for meaningful line breaks within a single thought (addresses, poetry), not for layout margin spacing.',
      },
    ],
  },

  'html-l5': {
    id: 'html-l5',
    courseSlug: 'html',
    title: 'Semantic vs Non-Semantic Elements',
    duration: '15 min',
    introduction:
      'In early web development, pages were built using thousands of generic <div> and <span> tags with custom class names. HTML5 revolutionized web architecture by introducing semantic elements—tags that clearly describe their meaning to both the browser and the developer.',
    learningObjectives: [
      'Differentiate between semantic elements (<article>, <nav>) and non-semantic containers (<div>, <span>)',
      'Learn how semantic markup improves screen reader accessibility and keyboard navigation',
      'Understand the SEO advantages of semantic HTML for search engine indexing',
      'Identify when it is still acceptable to use generic <div> and <span> containers',
    ],
    explanation: [
      {
        heading: 'What Makes an Element Semantic?',
        paragraphs: [
          'A semantic element carries inherent meaning about the content it holds. For example, when a browser or screen reader encounters a <nav> element, it immediately knows that the enclosed links are for website navigation.',
          'In contrast, a <div> or <span> carries zero semantic meaning. A <div> is simply a generic block container, and a <span> is a generic inline wrapper, both used strictly for styling or grouping when no semantic tag fits.',
        ],
        keyPoints: [
          'Semantic: <header>, <nav>, <main>, <article>, <section>, <aside>, <footer>, <time>, <figure>.',
          'Non-semantic: <div> (block-level styling wrapper), <span> (inline styling wrapper).',
        ],
      },
      {
        heading: 'The "Div Soup" Anti-Pattern',
        paragraphs: [
          'Before HTML5, websites were plagued by "div soup"—deeply nested <div> tags with endless classes like <div class="header"><div class="nav-container"><div class="menu">.',
          'Modern best practices replace these generic wrappers with clear structural landmarks, making the codebase significantly easier to read, maintain, and test.',
        ],
      },
    ],
    codeExample: {
      language: 'html',
      filename: 'semantic-vs-divs.html',
      code: `<!-- ❌ Legacy "Div Soup" (Non-Semantic) -->
<div class="header">
  <div class="logo">My App</div>
  <div class="nav-menu">
    <a href="/">Home</a>
    <a href="/pricing">Pricing</a>
  </div>
</div>

<!-- ✅ Modern Semantic HTML5 Structure -->
<header>
  <div class="logo">My App</div>
  <nav aria-label="Main Navigation">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/pricing">Pricing</a></li>
    </ul>
  </nav>
</header>`,
      explanation:
        'The semantic version communicates structural zones directly to assistive technologies without relying on CSS class names.',
    },
    practicalExample: {
      title: 'Structuring a Blog Post with Semantic Tags',
      scenario: 'A standalone blog post with publication date, author details, and related side notes.',
      code: `<article>
  <header>
    <h2>Building Accessible Web Applications</h2>
    <p>By Sarah Chen on <time datetime="2026-09-12">September 12, 2026</time></p>
  </header>
  
  <p>Semantic markup forms the foundation of digital accessibility...</p>
  
  <aside>
    <h4>Pro Tip</h4>
    <p>Always audit your HTML with automated accessibility checkers like Axe.</p>
  </aside>
</article>`,
      explanation:
        'The <time> tag with the datetime attribute allows machines (calendars, search engines) to parse the date format reliably.',
      outputDescription: 'Renders an article with clean metadata and a distinct side tip.',
    },
    commonMistakes: [
      {
        mistake: 'Using <div> tags for clickable interactive buttons instead of <button>',
        whyItHappens: 'Developers style a <div> to look like a button with CSS and attach a JavaScript click listener.',
        howToFix: 'Always use native <button> elements. Native buttons support keyboard focus (Tab) and activation (Enter/Space) automatically.',
        incorrectSnippet: `<div class="btn" onclick="submitForm()">Submit</div>`,
        correctSnippet: `<button type="button" class="btn" onclick="submitForm()">Submit</button>`,
      },
    ],
    practice: {
      title: 'Refactor Div Soup to Semantic HTML',
      instructions: [
        'Take a non-semantic news card layout and convert the wrappers into semantic elements.',
        'Replace the outer div with an <article>.',
        'Use <header> for the news headline and timestamp.',
        'Use <time> for the date string.',
      ],
      starterCode: `<div class="news-card">
  <div class="card-top">
    <h3>New Mars Rover Landing</h3>
    <span class="date">October 14, 2026</span>
  </div>
  <p>NASA confirms successful touchdown in the crater.</p>
</div>`,
      hint: 'Use <article>, <header>, <h3>, <time datetime="...">, and <p>.',
      solutionCode: `<article class="news-card">
  <header>
    <h3>New Mars Rover Landing</h3>
    <p><time datetime="2026-10-14">October 14, 2026</time></p>
  </header>
  <p>NASA confirms successful touchdown in the crater.</p>
</article>`,
    },
    projectConnection: {
      title: 'Search Engine Crawlers & Screen Reader Landmarks',
      description:
        'Google uses semantic elements to generate rich snippets and understand content relationships. Screen readers provide navigation hotkeys specifically to jump between landmarks (<header>, <nav>, <main>, <footer>).',
      howItApplies:
        'When creating production dashboards or e-commerce products, semantic markup ensures high accessibility ratings on Google Lighthouse (100% score).',
    },
    quiz: [
      {
        id: 'html-l5-q1',
        question: 'Which of the following elements is purely non-semantic?',
        options: ['<article>', '<nav>', '<div>', '<header>'],
        correctOptionIndex: 2,
        explanation:
          '<div> is a generic block-level container that provides no semantic information about its contents.',
      },
      {
        id: 'html-l5-q2',
        question: 'Why should you use <button> instead of <div onclick="..."> for clickable actions?',
        options: [
          '<button> elements are automatically keyboard-accessible (Tab and Enter) and communicate their role to screen readers.',
          '<div> elements cannot accept CSS styling.',
          '<button> elements execute faster in the JavaScript runtime.',
          'Browsers block all JavaScript on <div> tags.',
        ],
        correctOptionIndex: 0,
        explanation:
          'Native <button> elements come with built-in keyboard accessibility, focus management, and accessibility tree roles.',
      },
      {
        id: 'html-l5-q3',
        question: 'What is the purpose of the <time> element?',
        options: [
          'To start a live countdown timer in the browser',
          'To represent human-readable dates and machine-readable datetime attributes for machines and search engines',
          'To record the user current timezone via GPS',
          'To enforce a timeout on long HTTP requests',
        ],
        correctOptionIndex: 1,
        explanation:
          'The <time> element provides human-readable text along with an ISO 8601 formatted datetime attribute for automated tools.',
      },
    ],
  },

  'html-l6': {
    id: 'html-l6',
    courseSlug: 'html',
    title: 'Core Landmarks: Header, Nav, Main & Footer',
    duration: '18 min',
    introduction:
      'Every web page is composed of distinct functional zones. In this lesson, you will master the four primary structural landmarks of the web: <header>, <nav>, <main>, and <footer>. You will learn how these landmarks divide a document and why there can only be one visible <main> element per page.',
    learningObjectives: [
      'Master the four primary HTML page landmarks: <header>, <nav>, <main>, and <footer>',
      'Learn the strict rule: exactly one visible <main> landmark per document',
      'Understand how <header> and <footer> can exist at both the page level and inside <article> elements',
      'Construct a standard modern layout skeleton without generic wrapper divs',
    ],
    explanation: [
      {
        heading: 'The Four Page Landmarks',
        paragraphs: [
          'Landmarks allow assistive technologies to instantly navigate to specific regions of a page without forcing the user to listen to all preceding content.',
          '<header>: Represents introductory content, typically holding brand logos, search bars, and global navigation. It can be used at the page level or inside an <article>.',
          '<nav>: Encapsulates major navigational links. Not all links belong in a <nav>—only primary navigation blocks (menus, breadcrumbs, pagination).',
          '<main>: Contains the dominant, unique content of the document. Crucially, content that repeats across multiple pages (like headers, sidebars, search bars, and copyright notices) must NOT be inside <main>.',
          '<footer>: Contains footer notes, copyright notices, terms of service links, privacy policies, and author credits.',
        ],
      },
    ],
    codeExample: {
      language: 'html',
      filename: 'page-landmarks.html',
      code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>SaaS Dashboard</title>
  </head>
  <body>
    <!-- Top Global Header -->
    <header>
      <a href="/" class="brand-logo">CLOUD</a>
      <nav aria-label="Main Menu">
        <ul>
          <li><a href="/courses">Courses</a></li>
          <li><a href="/pricing">Pricing</a></li>
        </ul>
      </nav>
    </header>

    <!-- Unique Primary Content -->
    <main>
      <h1>Student Dashboard</h1>
      <p>Welcome back! You have completed 12 lessons this week.</p>
    </main>

    <!-- Global Footer -->
    <footer>
      <p>&copy; 2026 CLOUD Learning Platform. All rights reserved.</p>
      <nav aria-label="Footer Legal Links">
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </nav>
    </footer>
  </body>
</html>`,
      explanation:
        'Notice how <main> contains only the unique content for this specific page, while <header> and <footer> handle shared site-wide zones.',
    },
    practicalExample: {
      title: 'A Clean Portfolio Layout Skeleton',
      scenario: 'Setting up a professional developer portfolio with clear landmark regions.',
      code: `<body>
  <header>
    <h2>DevPortfolio</h2>
    <nav>
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main>
    <section id="about">
      <h2>About Me</h2>
      <p>Full-stack developer specializing in React and TypeScript.</p>
    </section>
    
    <section id="projects">
      <h2>Featured Work</h2>
      <p>Interactive web applications built for speed and reliability.</p>
    </section>
  </main>

  <footer>
    <p>Designed with care. Connect on GitHub and LinkedIn.</p>
  </footer>
</body>`,
      explanation:
        'Assistive technologies can press key commands to jump directly to <main> and bypass repeated header links.',
      outputDescription: 'A clean 3-part layout: top navigation bar, central content area, and bottom copyright footer.',
    },
    commonMistakes: [
      {
        mistake: 'Placing the site-wide global navigation bar inside the <main> element',
        whyItHappens: 'Wrapping the entire body contents inside <main> out of habit.',
        howToFix: '<main> must only contain content unique to that page. Global navigation belongs in <header> outside of <main>.',
        incorrectSnippet: `<main>
  <header><nav>...</nav></header>
  <h1>Page Title</h1>
</main>`,
        correctSnippet: `<header><nav>...</nav></header>
<main>
  <h1>Page Title</h1>
</main>`,
      },
    ],
    practice: {
      title: 'Assemble a Landmark Layout',
      instructions: [
        'Build a semantic HTML page body with all 4 major landmarks.',
        'Add a <header> with a website name and navigation link.',
        'Add a <main> with a page heading (<h1>) and a brief description.',
        'Add a <footer> with a copyright statement.',
      ],
      starterCode: `<body>
  <!-- Insert header, main, and footer landmarks here -->
</body>`,
      hint: 'Do not put the header or footer inside the main tag.',
      solutionCode: `<body>
  <header>
    <h1>TechDaily News</h1>
    <nav>
      <a href="/world">World</a>
      <a href="/tech">Tech</a>
    </nav>
  </header>

  <main>
    <h2>Today's Top Story</h2>
    <p>Breakthrough in renewable solar cell efficiency announced today.</p>
  </main>

  <footer>
    <p>&copy; 2026 TechDaily Inc.</p>
  </footer>
</body>`,
    },
    projectConnection: {
      title: 'Skip-to-Content Links & Assistive Technology',
      description:
        'Keyboard-only users frequently use "Skip to main content" links that point directly to <main id="main-content">. Having a proper <main> landmark is required by federal accessibility standards.',
      howItApplies:
        'Large applications (like GitHub or Wikipedia) have dozens of navigation links at the top; the <main> landmark saves users from tabbing through 50 links on every page change.',
    },
    quiz: [
      {
        id: 'html-l6-q1',
        question: 'What content belongs inside the <main> element?',
        options: [
          'The unique, primary content of the specific document, excluding repeated headers and footers',
          'The entire visible <body> including global navigation and site-wide copyright',
          'Only interactive JavaScript forms',
          'Metadata and external stylesheet links',
        ],
        correctOptionIndex: 0,
        explanation:
          '<main> is dedicated exclusively to the central, unique content of the page. Repeating global headers and footers belong outside.',
      },
      {
        id: 'html-l6-q2',
        question: 'Can a document contain multiple <header> elements?',
        options: [
          'No, HTML strictly allows only one <header> per document.',
          'Yes, you can have a page-level <header> as well as <header> elements inside <article> or <section> elements.',
          'Only if the document is rendered on a mobile device.',
          'Only if written in PHP.',
        ],
        correctOptionIndex: 1,
        explanation:
          'A page can have a top-level global <header> and also use <header> elements to introduce standalone <article> or <section> blocks.',
      },
      {
        id: 'html-l6-q3',
        question: 'Why is wrapping navigation links in a <nav> element beneficial?',
        options: [
          'It automatically styles the links with blue buttons.',
          'Screen readers identify the region as a navigation landmark so users can quickly find or skip navigation.',
          'It prevents the browser from caching link URLs.',
          'It activates encrypted HTTPS sockets.',
        ],
        correctOptionIndex: 1,
        explanation:
          '<nav> creates an accessible landmark that assistive technologies can immediately locate or bypass.',
      },
    ],
  },
};

