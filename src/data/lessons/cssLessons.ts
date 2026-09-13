import { LessonDetail } from '../../types';

export const CSS_LESSONS: Record<string, LessonDetail> = {
  'css-l1': {
    id: 'css-l1',
    courseSlug: 'css',
    title: 'The Cascade, Specificity & Inheritance',
    duration: '15 min',
    introduction:
      'CSS stands for Cascading Style Sheets. To write predictable, maintainable CSS without wrestling with !important, you must master the core algorithm behind how browsers calculate which style rule wins: the Cascade, Specificity weighting, and property Inheritance.',
    learningObjectives: [
      'Understand the three pillars of CSS rule resolution: Source Order, Specificity, and Importance',
      'Learn how to calculate CSS specificity using the (Inline, ID, Class, Element) scoring system',
      'Discover which CSS properties inherit by default (like typography) vs those that do not (like borders and margins)',
      'Avoid specificity wars and understand why overriding styles with !important leads to technical debt',
    ],
    explanation: [
      {
        heading: 'The Three Factors of The Cascade',
        paragraphs: [
          'When multiple conflicting CSS rules target the same HTML element, the browser resolves the conflict using three primary criteria evaluated in this exact order:',
          '1. Importance & Origin: Rules with !important win, followed by developer styles, then user agent (browser default) styles.',
          '2. Specificity: More specific selectors override generic selectors, regardless of where they appear in the stylesheet.',
          '3. Source Order: When importance and specificity are equal, the rule declared latest in the stylesheet wins.',
        ],
      },
      {
        heading: 'Calculating Specificity Score',
        paragraphs: [
          'Specificity is calculated as a 4-part vector (Inline, ID, Class/Attribute/Pseudo-class, Element/Pseudo-element):',
          '• Inline styles (style="..."): (1, 0, 0, 0) — highest standard specificity.',
          '• ID selectors (#header): (0, 1, 0, 0) — 100x stronger than classes.',
          '• Class selectors (.card), attribute selectors ([type="text"]), pseudo-classes (:hover): (0, 0, 1, 0).',
          '• Element selectors (p, div, h1) and pseudo-elements (::before): (0, 0, 0, 1).',
        ],
        keyPoints: [
          'Universal selector (*) and combinators (+, >, ~) contribute (0, 0, 0, 0) specificity.',
          'A single class (.btn) beats 10 stacked element selectors (div p span em ...).',
          'An ID (#main) beats 1000 stacked class selectors.',
        ],
      },
      {
        heading: 'Property Inheritance',
        paragraphs: [
          'Some CSS properties automatically pass their computed values down from parent elements to child elements. Typography properties (color, font-family, font-size, line-height, text-align) inherit naturally.',
          'Box-model properties (margin, padding, border, width, height, background) DO NOT inherit by default, because you would never want a parent padding to duplicate inside every nested paragraph.',
        ],
      },
    ],
    codeExample: {
      language: 'css',
      filename: 'specificity-demo.css',
      code: `/* Specificity: (0, 0, 0, 1) - Element */
p {
  color: #334155;
  font-size: 16px;
}

/* Specificity: (0, 0, 1, 0) - Class */
.lead-text {
  color: #0284c7; /* This wins over element selector */
}

/* Specificity: (0, 1, 0, 0) - ID */
#hero-intro {
  color: #7c3aed; /* This wins over both element and class */
}

/* Specificity: (0, 0, 2, 0) - Two Classes */
.card .lead-text {
  color: #059669; /* Wins over single .lead-text because 2 classes > 1 class */
}`,
      explanation:
        'Notice how the browser compares specificity categories from left to right. An ID selector always triumphs over any number of class selectors.',
    },
    practicalExample: {
      title: 'Debugging an Overridden Button Style',
      scenario: 'You created a special red alert button class, but it is not applying because of an ID selector in the legacy stylesheet.',
      code: `/* Legacy CSS with high specificity */
#navigation button {
  background-color: #2563eb;
  color: #ffffff;
}

/* Your new utility class (Loses because (0,0,1,0) < (0,1,0,1)) */
.btn-danger {
  background-color: #dc2626;
}

/* Professional Refactor: Keep specificity low with BEM or utility classes */
.nav-btn {
  background-color: #2563eb;
}
.nav-btn-danger {
  background-color: #dc2626; /* Successfully applies! */
}`,
      explanation:
        'By avoiding ID selectors in CSS rules, all components remain easily customizable with single class utilities.',
      outputDescription: 'Shows how lowering selector specificity avoids styling deadlocks.',
    },
    commonMistakes: [
      {
        mistake: 'Using !important to brute-force a CSS override',
        whyItHappens: 'A style rule is not applying due to higher specificity elsewhere, so the developer adds !important.',
        howToFix: 'Identify the conflicting high-specificity selector and refactor it to a simple class instead.',
        incorrectSnippet: `.btn-primary {
  background-color: #2563eb !important;
}`,
        correctSnippet: `.btn-primary {
  background-color: #2563eb;
}`,
      },
    ],
    practice: {
      title: 'Calculate Specificity & Predict Winning Rule',
      instructions: [
        'Analyze the provided selectors and determine which color will be rendered on the paragraph.',
        'Refactor the CSS so that the accent class `.highlight` can reliably override default styles without using IDs.',
      ],
      starterCode: `div#container p.text {
  color: blue;
}

p.highlight {
  color: orange; /* Currently loses because ID wins */
}`,
      hint: 'Remove the #container ID and structure your classes with equal or targeted class specificity.',
      solutionCode: `.content-box .text {
  color: #1e293b;
}

.content-box .text.highlight {
  color: #f97316; /* Wins cleanly with (0,0,2,0) */
}`,
    },
    projectConnection: {
      title: 'Scalable CSS Architectures (BEM & Tailwind)',
      description:
        'Modern design systems and frameworks (like Tailwind CSS and BEM methodology) intentionally keep all CSS selectors at a flat single-class specificity (0, 0, 1, 0) to eliminate specificity conflicts entirely.',
      howItApplies:
        'In large enterprise teams with 50+ developers, flat specificity prevents new features from accidentally breaking existing component layouts.',
    },
    quiz: [
      {
        id: 'css-l1-q1',
        question: 'Which of the following selectors has the HIGHEST specificity?',
        options: [
          'div.container ul li.active a',
          '#header-nav',
          '.navigation-bar .menu-item.active',
          'body main section article p',
        ],
        correctOptionIndex: 1,
        explanation:
          '#header-nav has an ID selector, giving it a specificity of (0, 1, 0, 0), which beats any combination of classes and element tags.',
      },
      {
        id: 'css-l1-q2',
        question: 'Which of the following properties is inherited by child elements by default?',
        options: ['margin', 'padding', 'font-family', 'border'],
        correctOptionIndex: 2,
        explanation:
          'Typography properties like font-family, color, and line-height inherit from parents, whereas box-model properties do not.',
      },
      {
        id: 'css-l1-q3',
        question: 'When two conflicting CSS rules have the exact same specificity and importance, which one applies?',
        options: [
          'The rule declared latest in the stylesheet (Source Order)',
          'The rule declared first in the stylesheet',
          'The rule with the shortest class name',
          'The browser randomly selects one',
        ],
        correctOptionIndex: 0,
        explanation:
          'When specificity and importance are equal, the cascade resolves the conflict by taking the rule that appears latest in source order.',
      },
    ],
  },

  'css-l2': {
    id: 'css-l2',
    courseSlug: 'css',
    title: 'CSS Selectors Mastery & Pseudo-classes',
    duration: '16 min',
    introduction:
      'Writing surgical, performant CSS requires mastering modern selector combinators, pseudo-classes (:hover, :focus-visible, :nth-child), and relational selectors (:has, :is, :where). In this lesson, you will learn how to style UI states cleanly without writing messy JavaScript event handlers.',
    learningObjectives: [
      'Master combinators: Descendant (space), Child (>), Adjacent sibling (+), and General sibling (~)',
      'Style interactive UI states with :hover, :focus-visible, and :disabled',
      'Select elements by structural position using :nth-child(2n), :first-of-type, and :last-child',
      'Leverage modern pseudo-classes: :is(), :where(), and the parent selector :has()',
    ],
    explanation: [
      {
        heading: 'Combinators in CSS',
        paragraphs: [
          'Combinators define the relationship between two selectors:',
          '• Descendant (A B): Targets any B inside A, regardless of nesting depth.',
          '• Direct Child (A > B): Targets only B elements that are direct children of A.',
          '• Adjacent Sibling (A + B): Targets B if it immediately follows A at the same level.',
          '• General Sibling (A ~ B): Targets any B that follows A anywhere within the same parent.',
        ],
      },
      {
        heading: 'Interactive & Accessibility Pseudo-classes',
        paragraphs: [
          ':hover triggers on mouse cursor hover. For keyboard users, :focus-visible displays an outline only when navigating with the keyboard (Tab key) rather than clicking with a mouse.',
          'Using :focus-visible instead of removing outlines with outline: none ensures your web app remains 100% accessible to disabled users.',
        ],
      },
    ],
    codeExample: {
      language: 'css',
      filename: 'selectors-showcase.css',
      code: `/* Direct child only */
.menu > li {
  list-style: none;
}

/* Zebra-striping table rows */
tbody tr:nth-child(even) {
  background-color: #f8fafc;
}

/* Accessible focus ring for keyboard navigation */
button:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

/* The parent selector: Style card if it contains an image */
.card:has(img) {
  padding-top: 0;
}

/* Zero-specificity group styling with :where */
:where(h1, h2, h3) {
  margin-bottom: 0.5rem;
}`,
      explanation:
        'Notice how :focus-visible provides a clean focus ring for keyboard navigation without showing ugly outlines on mouse clicks.',
    },
    practicalExample: {
      title: 'Styling Form Field Validation States Purely in CSS',
      scenario: 'Displaying green borders on valid email inputs and showing an error message on invalid ones without JS.',
      code: `/* Input validity state */
input:required:valid {
  border-color: #10b981;
}

input:required:invalid:not(:placeholder-shown) {
  border-color: #ef4444;
}

/* Show error hint when input is invalid */
input:invalid:not(:placeholder-shown) + .error-msg {
  display: block;
  color: #dc2626;
}`,
      explanation:
        'Using adjacent sibling selector (+) and pseudo-classes (:invalid, :not), you create instant validation feedback.',
      outputDescription: 'Inputs highlight red on invalid formatting and display an inline error message automatically.',
    },
    commonMistakes: [
      {
        mistake: 'Using * { outline: none } to remove browser focus rings',
        whyItHappens: 'Developers dislike default blue browser focus rings on button clicks.',
        howToFix: 'Never remove outlines without providing a custom :focus-visible style. Otherwise keyboard navigation is impossible.',
        incorrectSnippet: `button:focus {
  outline: none;
}`,
        correctSnippet: `button:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}`,
      },
    ],
    practice: {
      title: 'Build a Zebra-Striped Data List',
      instructions: [
        'Write CSS selectors to style a list of user transactions.',
        'Give even list items a light grey background using :nth-child.',
        'Target only the first list item to have rounded top corners using :first-child.',
        'Add a smooth hover effect on list items using :hover.',
      ],
      starterCode: `ul.transactions li {
  padding: 12px;
  /* Add your rules below */
}`,
      hint: 'Use :nth-child(even), :first-child, and :hover pseudo-classes.',
      solutionCode: `ul.transactions li {
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
  transition: background-color 0.15s ease;
}

ul.transactions li:nth-child(even) {
  background-color: #f8fafc;
}

ul.transactions li:first-child {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

ul.transactions li:hover {
  background-color: #f1f5f9;
}`,
    },
    projectConnection: {
      title: 'Interactive Design Systems & Micro-Interactions',
      description:
        'Clean UI components in Stripe, Linear, and Apple rely on subtle pseudo-class states (:hover, :active, :focus-visible) to provide tactile visual feedback.',
      howItApplies:
        'Using CSS pseudo-classes instead of JavaScript mouse event handlers saves hundreds of CPU cycles during high-frequency scrolling and rendering.',
    },
    quiz: [
      {
        id: 'css-l2-q1',
        question: 'What is the difference between the descendant selector (div p) and child selector (div > p)?',
        options: [
          'div p targets any paragraph inside div regardless of depth; div > p targets only direct children.',
          'div > p targets siblings, while div p targets parents.',
          'There is no functional difference.',
          'div > p is only supported in Internet Explorer.',
        ],
        correctOptionIndex: 0,
        explanation:
          'The child combinator (>) strictly matches elements that are direct immediate children of the parent.',
      },
      {
        id: 'css-l2-q2',
        question: 'Why is :focus-visible preferred over :focus in modern web development?',
        options: [
          ':focus-visible only applies the focus ring when navigating via keyboard (or assistive tech), avoiding visual noise on mouse clicks.',
          ':focus-visible executes in a Web Worker.',
          ':focus is deprecated in CSS3.',
          ':focus-visible changes the cursor icon automatically.',
        ],
        correctOptionIndex: 0,
        explanation:
          ':focus-visible provides accessibility focus rings for keyboard users while keeping click interactions visually clean.',
      },
      {
        id: 'css-l2-q3',
        question: 'What does the modern selector .card:has(img) accomplish?',
        options: [
          'It styles the image inside the card.',
          'It styles the .card element ONLY IF it contains an <img> tag.',
          'It deletes the image from the DOM.',
          'It prevents images from loading.',
        ],
        correctOptionIndex: 1,
        explanation:
          ':has() is the relational parent selector in CSS, allowing you to style an element based on its descendant children.',
      },
    ],
  },

  'css-l3': {
    id: 'css-l3',
    courseSlug: 'css',
    title: 'The Box Model & Box-Sizing Reset',
    duration: '16 min',
    introduction:
      'Everything in CSS is a rectangular box. In this lesson, you will master the four layers of the Box Model (Content, Padding, Border, and Margin), margin collapsing rules, and why box-sizing: border-box is the single most critical CSS reset rule for predictable layouts.',
    learningObjectives: [
      'Understand the 4 concentric layers of the CSS Box Model',
      'Learn the difference between content-box (default) and border-box sizing',
      'Apply the universal box-sizing reset (*, *::before, *::after)',
      'Understand margin collapse behavior between adjacent vertical elements',
    ],
    explanation: [
      {
        heading: 'The Four Box Model Layers',
        paragraphs: [
          'Every HTML element is rendered as a box containing four layers:',
          '1. Content Box: Where text and images reside.',
          '2. Padding: Transparent interior breathing room between the content and the border.',
          '3. Border: The line wrapping around the padding and content.',
          '4. Margin: Transparent exterior spacing pushing neighboring elements away.',
        ],
      },
      {
        heading: 'content-box vs border-box',
        paragraphs: [
          'By default, browsers use box-sizing: content-box. If you set width: 300px, padding: 20px, and border: 5px, the actual rendered width on screen becomes 350px (300 + 40 + 10). This makes grid calculations frustrating.',
          'With box-sizing: border-box, the width you declare is the final rendered width. The padding and borders are absorbed inside the dimensions.',
        ],
        keyPoints: [
          'Universal reset: *, *::before, *::after { box-sizing: border-box; }',
          'Eliminates layout breakage when adding padding to inputs, buttons, and cards.',
        ],
      },
    ],
    codeExample: {
      language: 'css',
      filename: 'box-model.css',
      code: `/* Universal Box-Sizing Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Predictable card sizing */
.card {
  width: 320px; /* Actual rendered width is exactly 320px */
  padding: 24px; /* Sits INSIDE the 320px */
  border: 2px solid #e2e8f0; /* Sits INSIDE the 320px */
  margin: 16px; /* Exterior spacing */
  background-color: #ffffff;
  border-radius: 12px;
}`,
      explanation:
        'With border-box, adding or modifying padding will never cause your elements to overflow or break grid columns.',
    },
    practicalExample: {
      title: 'Preventing Form Inputs from Breaking Container Widths',
      scenario: 'You have a 100% width input inside a container. Without border-box, adding padding causes horizontal scrolling.',
      code: `/* Without reset: width: 100% + 16px padding = 100% + 32px (overflows!) */
/* With border-box: width: 100% includes the 16px padding */

input.text-field {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
}`,
      explanation:
        'The input fits flush within its parent container without causing horizontal scrollbars.',
      outputDescription: 'Full-width input field with comfortable interior typing space and no overflow.',
    },
    commonMistakes: [
      {
        mistake: 'Assuming top/bottom margins will add together between adjacent paragraphs',
        whyItHappens: 'Vertical margins collapse in standard block flow. If paragraph 1 has margin-bottom: 20px and paragraph 2 has margin-top: 15px, the gap between them is 20px (the larger value), not 35px.',
        howToFix: 'Rely on single-direction margin (e.g. margin-bottom only) or use CSS Flexbox/Grid gap properties.',
        incorrectSnippet: `p {
  margin-top: 20px;
  margin-bottom: 20px;
}`,
        correctSnippet: `/* Use single-direction margin or flex gap */
p + p {
  margin-top: 1.25rem;
}`,
      },
    ],
    practice: {
      title: 'Build a Symmetrical Profile Badge',
      instructions: [
        'Write CSS for a profile badge card with exact dimensions.',
        'Set width: 280px and height: 160px.',
        'Add box-sizing: border-box.',
        'Add 20px padding and a 2px solid border.',
        'Verify that the outer rendered width stays at 280px.',
      ],
      starterCode: `.badge {
  /* Add box-sizing, dimensions, padding, and border */
}`,
      hint: 'Include box-sizing: border-box, width, padding, and border properties.',
      solutionCode: `.badge {
  box-sizing: border-box;
  width: 280px;
  height: 160px;
  padding: 20px;
  border: 2px solid #6366f1;
  border-radius: 12px;
  background-color: #ffffff;
}`,
    },
    projectConnection: {
      title: 'Responsive Grid & Component Alignment',
      description:
        'Every CSS framework (Tailwind, Bootstrap) and modern design system applies box-sizing: border-box globally. Without it, fluid percentages (like width: 50%) fail whenever padding is added.',
      howItApplies:
        'In responsive dashboards, border-box allows sidebars and content panes to align with pixel-perfect accuracy across all viewport sizes.',
    },
    quiz: [
      {
        id: 'css-l3-q1',
        question: 'Under box-sizing: border-box, how is the total rendered width calculated?',
        options: [
          'Width = declared width (padding and border are included inside)',
          'Width = declared width + padding + border + margin',
          'Width = declared width + padding only',
          'Width is multiplied by the device pixel ratio',
        ],
        correctOptionIndex: 0,
        explanation:
          'In border-box sizing, the padding and border are subtracted from the declared width, keeping total dimensions fixed.',
      },
      {
        id: 'css-l3-q2',
        question: 'What is margin collapsing in CSS?',
        options: [
          'When adjacent vertical margins combine into a single margin equal to the largest of the two values',
          'When horizontal margins disappear on mobile screens',
          'When padding overrides margin completely',
          'When borders break into dashed lines',
        ],
        correctOptionIndex: 0,
        explanation:
          'In normal block flow, adjacent top and bottom margins collapse into the single largest margin value.',
      },
      {
        id: 'css-l3-q3',
        question: 'What is the recommended universal CSS reset for box sizing in modern web projects?',
        options: [
          '*, *::before, *::after { box-sizing: border-box; }',
          'body { box-sizing: content-box; }',
          'div { box-sizing: inherit; }',
          'No reset is needed in modern browsers.',
        ],
        correctOptionIndex: 0,
        explanation:
          'Applying border-box to all elements and pseudo-elements guarantees predictable layouts across the entire document.',
      },
    ],
  },
};
