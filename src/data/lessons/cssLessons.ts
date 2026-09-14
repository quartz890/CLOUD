import { LessonDetail } from '../types';

export const CSS_LESSONS: Record<string, LessonDetail> = {
  "css-l1": {
    "id": "css-l1",
    "courseSlug": "css",
    "title": "Selectors, Properties, and Colors",
    "duration": "1h",
    "introduction": "Welcome to CSS! If HTML is the skeleton of a webpage, CSS (Cascading Style Sheets) is the skin and clothing. In this lesson, we will learn how to target HTML elements and change their appearance, starting with colors.",
    "learningObjectives": [
      "Understand the anatomy of a CSS rule.",
      "Learn how to link a CSS file to an HTML document.",
      "Use Element, Class, and ID selectors.",
      "Apply text and background colors."
    ],
    "explanation": [
      {
        "heading": "WHAT is CSS?",
        "paragraphs": [
          "CSS stands for Cascading Style Sheets. It describes how HTML elements should be displayed on screen, paper, or in other media."
        ]
      },
      {
        "heading": "WHY use CSS?",
        "paragraphs": [
          "HTML was NEVER intended to contain tags for formatting a document. CSS separates the content (HTML) from the presentation (styling), making maintenance much easier."
        ]
      },
      {
        "heading": "HOW does a CSS rule work?",
        "paragraphs": [
          "A CSS rule consists of a selector and a declaration block. The selector points to the HTML element you want to style. The declaration block contains one or more declarations separated by semicolons (e.g., `color: red;`)."
        ]
      },
      {
        "heading": "WHEN to use Classes vs IDs?",
        "paragraphs": [
          "Use an Element selector (e.g., `p`) to target ALL elements of that type. Use a Class (e.g., `.highlight`) to target MULTIPLE specific elements. Use an ID (e.g., `#header`) to target a SINGLE unique element."
        ]
      }
    ],
    "codeExample": {
      "language": "css",
      "filename": "styles.css",
      "explanation": "Examples of element, class, and ID selectors.",
      "code": "/* Element Selector: Targets all <h1> tags */\nh1 {\n  color: blue;\n}\n\n/* Class Selector: Targets elements with class=\"error\" */\n.error {\n  color: red;\n  background-color: yellow;\n}\n\n/* ID Selector: Targets the one element with id=\"main-nav\" */\n#main-nav {\n  background-color: black;\n}"
    },
    "practicalExample": {
      "title": "Styling a Warning Message",
      "scenario": "You want to style a specific paragraph to look like a warning alert.",
      "explanation": "By creating a `.warning` class, you can apply these styles to any paragraph you want just by adding `class=\"warning\"` in the HTML.",
      "code": ".warning {\n  color: darkorange;\n  background-color: #fff3cd;\n  border: 1px solid orange;\n}"
    },
    "commonMistakes": [
      {
        "mistake": "Forgetting the dot (.) or hash (#).",
        "whyItHappens": "In HTML you write `class=\"box\"`, so beginners write `box { ... }` in CSS.",
        "howToFix": "In CSS, you MUST prepend a dot for classes (`.box`) and a hash for IDs (`#box`).",
        "incorrectSnippet": "box {\n  color: red;\n}",
        "correctSnippet": ".box {\n  color: red;\n}"
      }
    ],
    "practice": {
      "title": "Style a Button",
      "instructions": [
        "Target the class `.btn`.",
        "Set the text color to white.",
        "Set the background color to green."
      ],
      "starterCode": ".btn {\n  /* Your code here */\n}",
      "hint": "Use the `color` and `background-color` properties.",
      "solutionCode": ".btn {\n  color: white;\n  background-color: green;\n}"
    },
    "projectConnection": {
      "title": "Portfolio Project",
      "description": "Setting your brand colors.",
      "howItApplies": "You will use these concepts to define the primary and secondary colors of your entire portfolio."
    },
    "quiz": [
      {
        "id": "css-l1-q1",
        "question": "Which selector targets an element with id=\"hero\"?",
        "options": [
          ".hero",
          "#hero",
          "hero",
          "*hero"
        ],
        "correctOptionIndex": 1,
        "explanation": "The hash symbol (#) is used to target IDs."
      },
      {
        "id": "css-l1-q2",
        "question": "What does CSS stand for?",
        "options": [
          "Creative Style Sheets",
          "Computer Style Sheets",
          "Cascading Style Sheets",
          "Colorful Style Sheets"
        ],
        "correctOptionIndex": 2,
        "explanation": "CSS stands for Cascading Style Sheets."
      },
      {
        "id": "css-l1-q3",
        "question": "Which property changes the color of text?",
        "options": [
          "text-color",
          "font-color",
          "color",
          "background-color"
        ],
        "correctOptionIndex": 2,
        "explanation": "The `color` property dictates the text color."
      }
    ]
  },
  "css-l2": {
    "id": "css-l2",
    "courseSlug": "css",
    "title": "Typography and The Box Model",
    "duration": "1h",
    "introduction": "Every single element on a webpage is a rectangular box. Understanding this \"Box Model\" is the single most important concept in CSS. In this lesson, we will master the box model and learn how to format typography.",
    "learningObjectives": [
      "Understand Margin, Border, Padding, and Content.",
      "Control text size, weight, and alignment.",
      "Change fonts using font-family.",
      "Calculate the true size of an element."
    ],
    "explanation": [
      {
        "heading": "WHAT is the Box Model?",
        "paragraphs": [
          "The CSS box model is a box that wraps around every HTML element. It consists of: Margins, Borders, Padding, and the actual Content."
        ]
      },
      {
        "heading": "WHY is it important?",
        "paragraphs": [
          "Without understanding the box model, you cannot accurately control the layout, size, and spacing of elements. Elements will overlap or push each other in unpredictable ways."
        ]
      },
      {
        "heading": "HOW do Margin and Padding differ?",
        "paragraphs": [
          "Padding is the space INSIDE the border, between the content and the border. Margin is the space OUTSIDE the border, pushing other elements away."
        ]
      },
      {
        "heading": "WHEN to use font properties?",
        "paragraphs": [
          "Use `font-size` for size, `font-weight` for boldness (e.g., bold, 400, 700), `text-align` to center text, and `font-family` to change the typeface (e.g., Arial, Helvetica)."
        ]
      }
    ],
    "codeExample": {
      "language": "css",
      "filename": "box.css",
      "explanation": "A visual demonstration of padding vs margin.",
      "code": ".box {\n  /* Content size */\n  width: 200px;\n  height: 100px;\n  \n  /* Space INSIDE the box */\n  padding: 20px;\n  \n  /* The edge of the box */\n  border: 2px solid black;\n  \n  /* Space OUTSIDE the box */\n  margin: 30px;\n}"
    },
    "practicalExample": {
      "title": "Styling a Quote Card",
      "scenario": "You want to style a blockquote to look like a clean, modern card.",
      "explanation": "We add padding so the text does not touch the edges, a border for definition, and margin to separate it from surrounding text.",
      "code": ".quote-card {\n  font-family: Georgia, serif;\n  font-size: 18px;\n  font-style: italic;\n  padding: 24px;\n  border-left: 4px solid blue;\n  background-color: #f9f9f9;\n  margin-bottom: 20px;\n}"
    },
    "commonMistakes": [
      {
        "mistake": "Confusing padding and margin.",
        "whyItHappens": "If an element has no background color or border, increasing padding or margin looks identical visually.",
        "howToFix": "Temporarily add a `border: 1px solid red;` to your element to clearly see where the inside (padding) ends and the outside (margin) begins.",
        "incorrectSnippet": "/* Trying to push text away from the border using margin */\n.btn { margin: 10px; border: 1px solid black; }",
        "correctSnippet": "/* Correct: using padding to push text away from the border */\n.btn { padding: 10px; border: 1px solid black; }"
      }
    ],
    "practice": {
      "title": "Create a Spaced Container",
      "instructions": [
        "Target the class `.container`.",
        "Add 20px of padding on all sides.",
        "Add 40px of margin on all sides."
      ],
      "starterCode": ".container {\n  border: 1px solid gray;\n}",
      "hint": "Use the shorthand `padding` and `margin` properties.",
      "solutionCode": ".container {\n  border: 1px solid gray;\n  padding: 20px;\n  margin: 40px;\n}"
    },
    "projectConnection": {
      "title": "Portfolio Project",
      "description": "Spacing out your content.",
      "howItApplies": "You will use the box model heavily to ensure your portfolio sections have breathing room and do not look cluttered."
    },
    "quiz": [
      {
        "id": "css-l2-q1",
        "question": "Which property creates space OUTSIDE the border of an element?",
        "options": [
          "padding",
          "spacing",
          "margin",
          "gap"
        ],
        "correctOptionIndex": 2,
        "explanation": "Margin creates space outside the border."
      },
      {
        "id": "css-l2-q2",
        "question": "If a box has width:100px, padding:10px, and border:5px (left and right), what is its total visual width?",
        "options": [
          "100px",
          "110px",
          "115px",
          "130px"
        ],
        "correctOptionIndex": 3,
        "explanation": "Total width = 100(width) + 10(pad-left) + 10(pad-right) + 5(border-left) + 5(border-right) = 130px."
      },
      {
        "id": "css-l2-q3",
        "question": "Which property changes the typeface (e.g., to Arial)?",
        "options": [
          "text-style",
          "font-family",
          "font-type",
          "typeface"
        ],
        "correctOptionIndex": 1,
        "explanation": "`font-family` specifies the font for an element."
      }
    ]
  },
  "css-l3": {
    "id": "css-l3",
    "courseSlug": "css",
    "title": "Positioning and Display",
    "duration": "1h",
    "introduction": "Now that we can style individual boxes, we need to understand how they stack and flow together on the page. The `display` and `position` properties are the keys to page layout.",
    "learningObjectives": [
      "Understand block vs. inline elements.",
      "Hide elements using display: none.",
      "Master position: static, relative, absolute, and fixed.",
      "Use z-index to control stacking order."
    ],
    "explanation": [
      {
        "heading": "WHAT is the Display property?",
        "paragraphs": [
          "`display` determines how an element behaves in the document flow. `block` elements (like `<div>`, `<p>`) take up the full width available and start on a new line. `inline` elements (like `<a>`, `<span>`) only take up as much width as necessary and do not force a new line."
        ]
      },
      {
        "heading": "WHY use Positioning?",
        "paragraphs": [
          "Sometimes normal flow is not enough. You might want a navigation bar to stick to the top of the screen as you scroll, or a badge to float in the corner of an image."
        ]
      },
      {
        "heading": "HOW do position values work?",
        "paragraphs": [
          "`static` is default. `relative` moves an element relative to its normal position. `absolute` removes the element from the flow and positions it relative to its closest positioned ancestor. `fixed` positions it relative to the browser window."
        ]
      },
      {
        "heading": "WHEN to use z-index?",
        "paragraphs": [
          "When positioned elements overlap, the `z-index` property determines which one is in front. Higher numbers are closer to the user."
        ]
      }
    ],
    "codeExample": {
      "language": "css",
      "filename": "layout.css",
      "explanation": "Making a sticky header and an absolutely positioned badge.",
      "code": "/* Sticks to the top of the viewport */\nheader {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  z-index: 100;\n}\n\n/* The parent must be relative for the child to be absolute to it */\n.card {\n  position: relative;\n}\n\n/* Positioned in the top right of the .card */\n.badge {\n  position: absolute;\n  top: -10px;\n  right: -10px;\n}"
    },
    "practicalExample": {
      "title": "A Floating Action Button",
      "scenario": "You want a \"Help\" button to always remain in the bottom-right corner of the screen.",
      "explanation": "We use `position: fixed` to attach it to the viewport, regardless of scrolling.",
      "code": ".help-btn {\n  position: fixed;\n  bottom: 20px;\n  right: 20px;\n  background-color: blue;\n  color: white;\n  border-radius: 50%;\n  padding: 15px 20px;\n}"
    },
    "commonMistakes": [
      {
        "mistake": "Using absolute positioning without a relative parent.",
        "whyItHappens": "If you set a child to `absolute`, it looks up the tree for a parent with `position: relative`. If it finds none, it aligns to the entire page!",
        "howToFix": "Always set `position: relative;` on the parent container when absolutely positioning a child inside it.",
        "incorrectSnippet": ".parent { }\n.child { position: absolute; top: 0; }",
        "correctSnippet": ".parent { position: relative; }\n.child { position: absolute; top: 0; }"
      }
    ],
    "practice": {
      "title": "Hide an Element",
      "instructions": [
        "Target the class `.secret`.",
        "Make it completely disappear from the page layout."
      ],
      "starterCode": ".secret {\n  /* Hide it here */\n}",
      "hint": "Use the display property.",
      "solutionCode": ".secret {\n  display: none;\n}"
    },
    "projectConnection": {
      "title": "Portfolio Project",
      "description": "Sticky Navigation.",
      "howItApplies": "You will use `position: fixed` to create a navigation bar that follows the user as they scroll down your portfolio."
    },
    "quiz": [
      {
        "id": "css-l3-q1",
        "question": "Which display value takes up the full width and starts on a new line?",
        "options": [
          "inline",
          "block",
          "inline-block",
          "hidden"
        ],
        "correctOptionIndex": 1,
        "explanation": "Block-level elements take up the entire width of their parent container."
      },
      {
        "id": "css-l3-q2",
        "question": "Which position value positions an element relative to the browser window, even when scrolled?",
        "options": [
          "absolute",
          "relative",
          "fixed",
          "static"
        ],
        "correctOptionIndex": 2,
        "explanation": "`position: fixed` locks the element to the viewport."
      },
      {
        "id": "css-l3-q3",
        "question": "What property controls the stacking order of overlapping elements?",
        "options": [
          "stack-order",
          "z-index",
          "layer",
          "depth"
        ],
        "correctOptionIndex": 1,
        "explanation": "`z-index` specifies the z-order of a positioned element and its descendants."
      }
    ]
  },
  "css-l4": {
    "id": "css-l4",
    "courseSlug": "css",
    "title": "Flexbox and Grid",
    "duration": "1h",
    "introduction": "For years, CSS layout was difficult, relying on hacks like floats and tables. Today, we have Flexbox and CSS Grid. These two powerful systems make aligning elements and building complex layouts incredibly easy.",
    "learningObjectives": [
      "Understand the difference between one-dimensional (Flexbox) and two-dimensional (Grid) layouts.",
      "Use Flexbox to center elements and space them evenly.",
      "Use CSS Grid to create a multi-column layout.",
      "Master justify-content and align-items."
    ],
    "explanation": [
      {
        "heading": "WHAT are Flexbox and Grid?",
        "paragraphs": [
          "Flexbox (Flexible Box) is designed for laying out items in a single dimension—either a row OR a column. CSS Grid is designed for two-dimensional layouts—rows AND columns simultaneously."
        ]
      },
      {
        "heading": "WHY do we need both?",
        "paragraphs": [
          "Use Flexbox for aligning components within a section (like items in a navigation bar). Use Grid for the overall page layout (like a sidebar next to a main content area)."
        ]
      },
      {
        "heading": "HOW to use Flexbox?",
        "paragraphs": [
          "Set `display: flex;` on the PARENT container. Then use `justify-content` to align items along the main axis (horizontal by default), and `align-items` to align them along the cross axis (vertical)."
        ]
      },
      {
        "heading": "WHEN to use Grid?",
        "paragraphs": [
          "Set `display: grid;` on the parent. Use `grid-template-columns: 1fr 1fr;` to easily create two columns of equal width."
        ]
      }
    ],
    "codeExample": {
      "language": "css",
      "filename": "flex.css",
      "explanation": "Centering an item perfectly in the middle of a screen, which used to be notoriously difficult in CSS.",
      "code": ".parent {\n  display: flex;\n  /* Center horizontally */\n  justify-content: center;\n  /* Center vertically */\n  align-items: center;\n  height: 100vh; /* Full viewport height */\n}"
    },
    "practicalExample": {
      "title": "A Navigation Bar",
      "scenario": "You want a logo on the far left, and navigation links on the far right.",
      "explanation": "Flexbox makes this trivial using `justify-content: space-between`.",
      "code": ".navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 20px;\n  background: #333;\n  color: white;\n}"
    },
    "commonMistakes": [
      {
        "mistake": "Applying flex properties to the children.",
        "whyItHappens": "Beginners try to set `justify-content: center` on the item they want to move.",
        "howToFix": "Flexbox properties like `justify-content` and `align-items` MUST be applied to the PARENT container (`display: flex`), not the children.",
        "incorrectSnippet": ".child { display: flex; justify-content: center; }",
        "correctSnippet": ".parent { display: flex; justify-content: center; }"
      }
    ],
    "practice": {
      "title": "Create a 3-Column Grid",
      "instructions": [
        "Target the class `.grid-container`.",
        "Enable CSS Grid.",
        "Create three equal columns using the `1fr` unit."
      ],
      "starterCode": ".grid-container {\n  /* Your code here */\n  gap: 20px;\n}",
      "hint": "Use `display: grid` and `grid-template-columns`.",
      "solutionCode": ".grid-container {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 20px;\n}"
    },
    "projectConnection": {
      "title": "Portfolio Project",
      "description": "Project Gallery.",
      "howItApplies": "You will use CSS Grid to create a responsive photo gallery of your past projects."
    },
    "quiz": [
      {
        "id": "css-l4-q1",
        "question": "Which layout system is best for 1-dimensional layouts (rows OR columns)?",
        "options": [
          "CSS Grid",
          "Floats",
          "Flexbox",
          "Tables"
        ],
        "correctOptionIndex": 2,
        "explanation": "Flexbox is designed for one-dimensional layouts."
      },
      {
        "id": "css-l4-q2",
        "question": "In a default Flexbox row, which property centers items horizontally?",
        "options": [
          "align-items: center",
          "text-align: center",
          "vertical-align: middle",
          "justify-content: center"
        ],
        "correctOptionIndex": 3,
        "explanation": "`justify-content` aligns items along the main axis, which is horizontal by default in flex rows."
      },
      {
        "id": "css-l4-q3",
        "question": "What does `1fr` mean in CSS Grid?",
        "options": [
          "1 frame rate",
          "1 fraction of the available space",
          "1 free row",
          "1 font rem"
        ],
        "correctOptionIndex": 1,
        "explanation": "`fr` stands for fraction, taking up a portion of the available free space in the grid container."
      }
    ]
  },
  "css-l5": {
    "id": "css-l5",
    "courseSlug": "css",
    "title": "Responsive Design & Animations",
    "duration": "1h",
    "introduction": "A website must look good on a giant 4K monitor and a tiny mobile phone. In this final CSS lesson, we will learn how to make designs responsive using Media Queries, and add polish with CSS transitions.",
    "learningObjectives": [
      "Understand the mobile-first design approach.",
      "Write media queries to change CSS based on screen size.",
      "Add smooth CSS transitions to hover states.",
      "Use CSS variables to manage colors."
    ],
    "explanation": [
      {
        "heading": "WHAT are Media Queries?",
        "paragraphs": [
          "Media queries are CSS rules that only apply when certain conditions are met, such as the screen being smaller or wider than a specific width."
        ]
      },
      {
        "heading": "WHY use Mobile-First?",
        "paragraphs": [
          "It is usually easier to write the CSS for a mobile layout first (stacked columns), and then use media queries with `min-width` to add complexity (like side-by-side grids) for larger screens."
        ]
      },
      {
        "heading": "HOW to add Transitions?",
        "paragraphs": [
          "Instead of a button instantly turning blue on hover, a `transition` tells the browser to animate the change smoothly over a set duration."
        ]
      },
      {
        "heading": "WHEN to use CSS Variables?",
        "paragraphs": [
          "If your brand color is `#FF5733`, do not type it 50 times. Define it once as `--primary-color: #FF5733;` and use `var(--primary-color)` everywhere."
        ]
      }
    ],
    "codeExample": {
      "language": "css",
      "filename": "responsive.css",
      "explanation": "A mobile-first approach. The layout is 1 column by default, but changes to 2 columns on screens wider than 768px.",
      "code": "/* Mobile first: 1 column */\n.layout {\n  display: grid;\n  grid-template-columns: 1fr;\n}\n\n/* Desktop: 2 columns */\n@media (min-width: 768px) {\n  .layout {\n    grid-template-columns: 1fr 1fr;\n  }\n}"
    },
    "practicalExample": {
      "title": "A Smooth Hover Button",
      "scenario": "You want a button to smoothly change color when the user hovers over it.",
      "explanation": "The `transition` property on the base element dictates how the `:hover` state animates.",
      "code": ".btn {\n  background-color: blue;\n  color: white;\n  /* Animate background-color over 0.3 seconds */\n  transition: background-color 0.3s ease;\n}\n\n.btn:hover {\n  background-color: darkblue;\n}"
    },
    "commonMistakes": [
      {
        "mistake": "Putting the transition on the :hover state.",
        "whyItHappens": "It seems logical to put the animation code on the hover rule.",
        "howToFix": "The transition must go on the BASE class. If you put it on `:hover`, it will animate on hover, but snap back instantly when the mouse leaves.",
        "incorrectSnippet": ".btn { }\n.btn:hover { transition: all 0.3s; color: red; }",
        "correctSnippet": ".btn { transition: all 0.3s; }\n.btn:hover { color: red; }"
      }
    ],
    "practice": {
      "title": "Write a Media Query",
      "instructions": [
        "Write a media query that triggers when the screen is at least `1024px` wide.",
        "Inside it, change the `.container` class background to green."
      ],
      "starterCode": "/* Write your media query below */\n",
      "hint": "Use `@media (min-width: ...)`",
      "solutionCode": "@media (min-width: 1024px) {\n  .container {\n    background-color: green;\n  }\n}"
    },
    "projectConnection": {
      "title": "Portfolio Project",
      "description": "Mobile Optimization.",
      "howItApplies": "You will use media queries to ensure your portfolio looks perfect on iPhones and tablets, not just laptops."
    },
    "quiz": [
      {
        "id": "css-l5-q1",
        "question": "What at-rule is used to apply CSS only at specific screen widths?",
        "options": [
          "@screen",
          "@responsive",
          "@media",
          "@viewport"
        ],
        "correctOptionIndex": 2,
        "explanation": "`@media` is used to create media queries."
      },
      {
        "id": "css-l5-q2",
        "question": "In the mobile-first approach, which media feature is most commonly used?",
        "options": [
          "max-width",
          "min-width",
          "device-width",
          "orientation"
        ],
        "correctOptionIndex": 1,
        "explanation": "`min-width` is used to add styles as the screen gets larger (desktop)."
      },
      {
        "id": "css-l5-q3",
        "question": "Where should the `transition` property be placed for a hover effect?",
        "options": [
          "On the :hover selector",
          "On the base selector",
          "On the parent container",
          "In the HTML inline styles"
        ],
        "correctOptionIndex": 1,
        "explanation": "It should be on the base selector so it animates both when hovering AND when un-hovering."
      }
    ]
  }
};
