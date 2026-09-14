import { LessonDetail } from '../types';

export const HTML_LESSONS: Record<string, LessonDetail> = {
  "html-l1": {
    "id": "html-l1",
    "courseSlug": "html",
    "title": "Document Structure & Basic Elements",
    "duration": "1h",
    "introduction": "Welcome to HTML! HTML (HyperText Markup Language) is the standard language for creating webpages. In this lesson, we will learn the essential building blocks that make up every webpage on the internet, starting from the basic document structure.",
    "learningObjectives": [
      "Understand what HTML is and how it structures web content.",
      "Learn the basic boilerplate of an HTML document.",
      "Use basic elements like headings and paragraphs to format text.",
      "Understand the difference between opening and closing tags."
    ],
    "explanation": [
      {
        "heading": "WHAT is HTML?",
        "paragraphs": [
          "HTML stands for HyperText Markup Language. It is not a programming language, but a markup language that defines the structure of your content. Think of it as the skeleton of a webpage."
        ]
      },
      {
        "heading": "WHY do we need it?",
        "paragraphs": [
          "Without HTML, a web browser would not know how to display text, images, or links. HTML tells the browser \"this is a heading,\" \"this is a paragraph,\" or \"this is a link.\""
        ]
      },
      {
        "heading": "HOW does it work?",
        "paragraphs": [
          "HTML uses \"tags\" to wrap around content. Most tags come in pairs: an opening tag (like `<p>`) and a closing tag (like `</p>`). Everything inside the tags is affected by them."
        ]
      },
      {
        "heading": "WHEN to use specific tags?",
        "paragraphs": [
          "Use `<h1>` for the main title of your page, and `<p>` for regular text. A standard HTML document always starts with a `<!DOCTYPE html>` declaration, followed by an `<html>` element containing a `<head>` and a `<body>`."
        ]
      }
    ],
    "codeExample": {
      "language": "html",
      "filename": "index.html",
      "explanation": "This is the standard boilerplate for every HTML page.",
      "code": "<!DOCTYPE html>\n<html>\n  <head>\n    <title>My First Webpage</title>\n  </head>\n  <body>\n    <h1>Welcome to My Website</h1>\n    <p>This is my very first paragraph of text.</p>\n  </body>\n</html>"
    },
    "practicalExample": {
      "title": "A Personal Bio Page",
      "scenario": "Imagine you are creating a simple page to introduce yourself.",
      "explanation": "Notice how the h1 is the main title, h2 is a subtitle, and paragraphs separate the thoughts.",
      "code": "<h1>About John Doe</h1>\n<h2>Web Developer in Training</h2>\n<p>Hello! I am learning how to code.</p>\n<p>My goal is to build amazing websites.</p>"
    },
    "commonMistakes": [
      {
        "mistake": "Forgetting the closing tag.",
        "whyItHappens": "It is easy to type `<p>Hello` and forget the `</p>`.",
        "howToFix": "Always double-check that every opening tag has a matching closing tag with a forward slash.",
        "incorrectSnippet": "<p>This is a paragraph.",
        "correctSnippet": "<p>This is a paragraph.</p>"
      }
    ],
    "practice": {
      "title": "Create Your First Page",
      "instructions": [
        "Create an HTML document structure.",
        "Add an h1 heading saying \"My Favorite Hobby\".",
        "Add a paragraph describing your hobby."
      ],
      "starterCode": "<!DOCTYPE html>\n<html>\n  <body>\n    <!-- Add your code here -->\n  </body>\n</html>",
      "hint": "Remember the <h1> and <p> tags.",
      "solutionCode": "<!DOCTYPE html>\n<html>\n  <body>\n    <h1>My Favorite Hobby</h1>\n    <p>I love playing chess in my free time.</p>\n  </body>\n</html>"
    },
    "projectConnection": {
      "title": "Portfolio Project",
      "description": "Your final project will be a personal portfolio.",
      "howItApplies": "The document structure and basic text elements you learned here will form the foundation of your entire portfolio webpage."
    },
    "quiz": [
      {
        "id": "html-l1-q1",
        "question": "What does HTML stand for?",
        "options": [
          "HyperText Markup Language",
          "HyperText Machine Language",
          "Hyper Transfer Markup Language",
          "High Text Markup Language"
        ],
        "correctOptionIndex": 0,
        "explanation": "HTML stands for HyperText Markup Language."
      },
      {
        "id": "html-l1-q2",
        "question": "Which tag is used for the largest heading?",
        "options": [
          "<heading>",
          "<h6>",
          "<h1>",
          "<head>"
        ],
        "correctOptionIndex": 2,
        "explanation": "<h1> is the most important (and largest by default) heading."
      },
      {
        "id": "html-l1-q3",
        "question": "Where does the visible content of a webpage go?",
        "options": [
          "Inside the <head>",
          "Inside the <body>",
          "Outside the <html> tag",
          "Inside the <title>"
        ],
        "correctOptionIndex": 1,
        "explanation": "All visible content must be placed inside the <body> tag."
      }
    ]
  },
  "html-l2": {
    "id": "html-l2",
    "courseSlug": "html",
    "title": "Links, Images, and Lists",
    "duration": "1h",
    "introduction": "Text is great, but the web is built on connections and media. In this lesson, we will learn how to link pages together, embed images, and organize content using bulleted and numbered lists.",
    "learningObjectives": [
      "Create clickable hyperlinks to other websites.",
      "Embed images using the img tag and understand the alt attribute.",
      "Create unordered (bulleted) and ordered (numbered) lists.",
      "Understand self-closing tags."
    ],
    "explanation": [
      {
        "heading": "WHAT are Links and Images?",
        "paragraphs": [
          "Links (anchors) connect webpages together, forming the \"web\". Images add visual content. Lists organize related items into readable formats."
        ]
      },
      {
        "heading": "WHY are they important?",
        "paragraphs": [
          "Without links, every webpage would be an isolated island. Without images, the web would be boring text. Lists make content scannable and easy to read."
        ]
      },
      {
        "heading": "HOW do we use them?",
        "paragraphs": [
          "We use the `<a>` tag for links, requiring an `href` attribute to specify the destination. We use the `<img>` tag for images, requiring a `src` attribute for the image file and an `alt` attribute for screen readers. Lists use `<ul>` (unordered) or `<ol>` (ordered), containing `<li>` (list item) tags."
        ]
      },
      {
        "heading": "WHEN to use alt text?",
        "paragraphs": [
          "Always! The `alt` attribute on an image is crucial for visually impaired users who use screen readers, and it displays if the image fails to load."
        ]
      }
    ],
    "codeExample": {
      "language": "html",
      "filename": "media.html",
      "explanation": "Here is how to create a link, an image, and an unordered list.",
      "code": "<a href=\"https://google.com\">Go to Google</a>\n\n<img src=\"logo.png\" alt=\"Company Logo\">\n\n<ul>\n  <li>Apples</li>\n  <li>Bananas</li>\n</ul>"
    },
    "practicalExample": {
      "title": "A Recipe Page",
      "scenario": "You are building a recipe page that needs an image of the dish and a list of ingredients.",
      "explanation": "The image provides visual appeal, and the unordered list makes the ingredients easy to read.",
      "code": "<h2>Pancakes</h2>\n<img src=\"pancakes.jpg\" alt=\"A stack of fluffy pancakes with syrup\">\n<h3>Ingredients</h3>\n<ul>\n  <li>1 cup flour</li>\n  <li>1 cup milk</li>\n  <li>1 egg</li>\n</ul>"
    },
    "commonMistakes": [
      {
        "mistake": "Forgetting the alt attribute on images.",
        "whyItHappens": "The image still displays visually without it, so developers forget it.",
        "howToFix": "Always include `alt=\"description\"` inside your `<img>` tag.",
        "incorrectSnippet": "<img src=\"cat.jpg\">",
        "correctSnippet": "<img src=\"cat.jpg\" alt=\"A cute orange cat sleeping\">"
      }
    ],
    "practice": {
      "title": "Build a Navigation Menu",
      "instructions": [
        "Create an unordered list.",
        "Add two list items.",
        "Inside each list item, add a link (one to Home, one to About)."
      ],
      "starterCode": "<!-- Add your list here -->",
      "hint": "Wrap <a> tags inside <li> tags, inside a <ul>.",
      "solutionCode": "<ul>\n  <li><a href=\"index.html\">Home</a></li>\n  <li><a href=\"about.html\">About</a></li>\n</ul>"
    },
    "projectConnection": {
      "title": "Portfolio Project",
      "description": "Adding navigation and project images.",
      "howItApplies": "You will use lists to create the navigation bar of your portfolio, and images to show off screenshots of your past work."
    },
    "quiz": [
      {
        "id": "html-l2-q1",
        "question": "Which tag is used to create a hyperlink?",
        "options": [
          "<link>",
          "<a>",
          "<href>",
          "<hyperlink>"
        ],
        "correctOptionIndex": 1,
        "explanation": "The <a> (anchor) tag is used to create hyperlinks."
      },
      {
        "id": "html-l2-q2",
        "question": "Which attribute specifies the image URL?",
        "options": [
          "href",
          "src",
          "link",
          "url"
        ],
        "correctOptionIndex": 1,
        "explanation": "The `src` (source) attribute specifies the path to the image."
      },
      {
        "id": "html-l2-q3",
        "question": "What tag creates a numbered list?",
        "options": [
          "<ul>",
          "<nl>",
          "<ol>",
          "<li>"
        ],
        "correctOptionIndex": 2,
        "explanation": "<ol> stands for Ordered List, which creates numbered items."
      }
    ]
  },
  "html-l3": {
    "id": "html-l3",
    "courseSlug": "html",
    "title": "Forms, Inputs, and Buttons",
    "duration": "1h",
    "introduction": "Forms are how websites collect data from users. Whether it is a login page, a search bar, or a contact form, understanding HTML forms is essential for building interactive websites.",
    "learningObjectives": [
      "Create a basic form structure.",
      "Use different types of input fields (text, email, password, radio, checkbox).",
      "Connect labels to inputs for accessibility.",
      "Create submit buttons."
    ],
    "explanation": [
      {
        "heading": "WHAT is an HTML Form?",
        "paragraphs": [
          "A form is an area of a webpage containing interactive controls (like text fields and checkboxes) for submitting information to a server."
        ]
      },
      {
        "heading": "WHY use labels?",
        "paragraphs": [
          "Labels (`<label>`) describe what an input is for. They are critical for accessibility, allowing screen readers to announce the input purpose. Clicking a label also focuses the associated input!"
        ]
      },
      {
        "heading": "HOW to connect labels?",
        "paragraphs": [
          "You connect a `<label>` to an `<input>` by giving the input an `id` attribute, and giving the label a `for` attribute with the exact same value."
        ]
      },
      {
        "heading": "WHEN to use different inputs?",
        "paragraphs": [
          "Use `type=\"text\"` for names, `type=\"password\"` to hide characters, `type=\"radio\"` for selecting ONE option from many, and `type=\"checkbox\"` for selecting MULTIPLE options."
        ]
      }
    ],
    "codeExample": {
      "language": "html",
      "filename": "form.html",
      "explanation": "A basic login form with labels, inputs, and a submit button.",
      "code": "<form action=\"/submit\">\n  <label for=\"username\">Username:</label>\n  <input type=\"text\" id=\"username\" name=\"username\" required>\n  \n  <label for=\"pwd\">Password:</label>\n  <input type=\"password\" id=\"pwd\" name=\"pwd\" required>\n  \n  <button type=\"submit\">Login</button>\n</form>"
    },
    "practicalExample": {
      "title": "A Newsletter Signup",
      "scenario": "You want users to subscribe to your weekly newsletter.",
      "explanation": "We use type=\"email\" to ensure the browser validates that the user typed a real email address.",
      "code": "<form>\n  <label for=\"email\">Subscribe to our Newsletter:</label>\n  <input type=\"email\" id=\"email\" name=\"email\" placeholder=\"you@example.com\">\n  <button type=\"submit\">Subscribe</button>\n</form>"
    },
    "commonMistakes": [
      {
        "mistake": "Not associating labels with inputs.",
        "whyItHappens": "The form still looks fine visually without the `for` and `id` connection.",
        "howToFix": "Always match the `for` attribute of the label to the `id` attribute of the input.",
        "incorrectSnippet": "<label>Name:</label> <input type=\"text\">",
        "correctSnippet": "<label for=\"name\">Name:</label> <input type=\"text\" id=\"name\">"
      }
    ],
    "practice": {
      "title": "Create a Contact Form",
      "instructions": [
        "Create a form element.",
        "Add a text input for \"Name\" with a connected label.",
        "Add a textarea for \"Message\" with a connected label.",
        "Add a submit button."
      ],
      "starterCode": "<!-- Build your form here -->",
      "hint": "Use <label for=\"xyz\"> and <input id=\"xyz\">",
      "solutionCode": "<form>\n  <label for=\"name\">Name:</label>\n  <input type=\"text\" id=\"name\">\n  \n  <label for=\"msg\">Message:</label>\n  <textarea id=\"msg\"></textarea>\n  \n  <button type=\"submit\">Send</button>\n</form>"
    },
    "projectConnection": {
      "title": "Portfolio Project",
      "description": "Adding a Contact Me section.",
      "howItApplies": "You will build a fully functional contact form at the bottom of your portfolio so clients can reach out to you."
    },
    "quiz": [
      {
        "id": "html-l3-q1",
        "question": "Which input type hides the characters being typed?",
        "options": [
          "text",
          "hidden",
          "password",
          "secret"
        ],
        "correctOptionIndex": 2,
        "explanation": "type=\"password\" obscures the text (usually with dots or asterisks)."
      },
      {
        "id": "html-l3-q2",
        "question": "How do you correctly link a <label> to an <input>?",
        "options": [
          "Place them next to each other",
          "Using the label \"to\" and input \"name\" attributes",
          "Using the label \"for\" and input \"id\" attributes",
          "Using the label \"id\" and input \"for\" attributes"
        ],
        "correctOptionIndex": 2,
        "explanation": "The `for` attribute on the label must match the `id` attribute on the input."
      },
      {
        "id": "html-l3-q3",
        "question": "Which input type allows selecting MULTIPLE options?",
        "options": [
          "radio",
          "checkbox",
          "select",
          "button"
        ],
        "correctOptionIndex": 1,
        "explanation": "Checkboxes allow multiple selections, whereas radio buttons restrict to a single selection."
      }
    ]
  },
  "html-l4": {
    "id": "html-l4",
    "courseSlug": "html",
    "title": "Semantic HTML & Accessibility",
    "duration": "1h",
    "introduction": "In the early days of the web, developers used <div> tags for everything. Today, we use Semantic HTML. Semantic tags clearly describe their meaning to both the browser and the developer, which is crucial for SEO and accessibility.",
    "learningObjectives": [
      "Understand what Semantic HTML is and why it matters.",
      "Learn structural tags like header, nav, main, article, section, and footer.",
      "Understand basic web accessibility (a11y) principles.",
      "Replace meaningless divs with meaningful tags."
    ],
    "explanation": [
      {
        "heading": "WHAT is Semantic HTML?",
        "paragraphs": [
          "Semantic HTML introduces meaning to the web page rather than just presentation. A `<div>` tells you nothing about its content. A `<nav>` tells you exactly what it is: navigation."
        ]
      },
      {
        "heading": "WHY does it matter?",
        "paragraphs": [
          "1. Accessibility: Screen readers use semantic tags to help visually impaired users navigate the page easily. 2. SEO: Search engines prioritize content inside semantic tags (like `<article>`) when ranking pages."
        ]
      },
      {
        "heading": "HOW to use them?",
        "paragraphs": [
          "Think about the layout of a newspaper. The top logo is the `<header>`. The menu is `<nav>`. The primary story is `<main>`, containing an `<article>`. The bottom copyright is the `<footer>`."
        ]
      },
      {
        "heading": "WHEN to use div?",
        "paragraphs": [
          "Use `<div>` or `<span>` only when there is no appropriate semantic element, typically just for grouping elements together to apply CSS styling."
        ]
      }
    ],
    "codeExample": {
      "language": "html",
      "filename": "semantic.html",
      "explanation": "A properly structured semantic webpage layout.",
      "code": "<header>\n  <h1>My Blog</h1>\n  <nav>\n    <a href=\"/\">Home</a>\n    <a href=\"/about\">About</a>\n  </nav>\n</header>\n\n<main>\n  <article>\n    <h2>Why Semantic HTML is Great</h2>\n    <p>It makes the web better for everyone.</p>\n  </article>\n</main>\n\n<footer>\n  <p>&copy; 2023 My Blog</p>\n</footer>"
    },
    "practicalExample": {
      "title": "Structuring a News Article",
      "scenario": "You are writing the markup for a news website.",
      "explanation": "The article itself is wrapped in `<article>`, its subsections in `<section>`, and the author bio in an `<aside>`.",
      "code": "<article>\n  <h2>Local Sports Team Wins Championship</h2>\n  <section>\n    <h3>First Half</h3>\n    <p>The game started slow...</p>\n  </section>\n  <aside>\n    <p>Written by Jane Doe, Sports Reporter</p>\n  </aside>\n</article>"
    },
    "commonMistakes": [
      {
        "mistake": "Using <div> for buttons or links.",
        "whyItHappens": "Developers sometimes use a div and style it to look like a button.",
        "howToFix": "Always use `<button>` for actions and `<a>` for navigation. Divs cannot be focused by the keyboard by default!",
        "incorrectSnippet": "<div class=\"btn\">Submit</div>",
        "correctSnippet": "<button type=\"submit\" class=\"btn\">Submit</button>"
      }
    ],
    "practice": {
      "title": "Refactor to Semantic HTML",
      "instructions": [
        "Change the top div to a header.",
        "Change the middle div to main.",
        "Change the bottom div to footer."
      ],
      "starterCode": "<div class=\"top\">\n  <h1>Welcome</h1>\n</div>\n<div class=\"content\">\n  <p>Main content here.</p>\n</div>\n<div class=\"bottom\">\n  <p>Copyright</p>\n</div>",
      "hint": "Replace the words \"div\" with the correct semantic tag names.",
      "solutionCode": "<header class=\"top\">\n  <h1>Welcome</h1>\n</header>\n<main class=\"content\">\n  <p>Main content here.</p>\n</main>\n<footer class=\"bottom\">\n  <p>Copyright</p>\n</footer>"
    },
    "projectConnection": {
      "title": "Portfolio Project",
      "description": "Building the core layout.",
      "howItApplies": "Your entire portfolio will be wrapped in semantic tags, ensuring it ranks well on Google and is accessible to all users."
    },
    "quiz": [
      {
        "id": "html-l4-q1",
        "question": "Which tag should wrap the primary content of the document?",
        "options": [
          "<section>",
          "<content>",
          "<main>",
          "<body>"
        ],
        "correctOptionIndex": 2,
        "explanation": "<main> represents the dominant content of the <body>."
      },
      {
        "id": "html-l4-q2",
        "question": "Why is Semantic HTML important?",
        "options": [
          "It makes the website load faster",
          "It is required for CSS to work",
          "It improves Accessibility and SEO",
          "It encrypts the data"
        ],
        "correctOptionIndex": 2,
        "explanation": "Semantic tags provide meaning that helps screen readers and search engine crawlers."
      },
      {
        "id": "html-l4-q3",
        "question": "When should you use a <div>?",
        "options": [
          "For the main navigation",
          "For the page footer",
          "For independent articles",
          "When no semantic tag is appropriate, usually for CSS grouping"
        ],
        "correctOptionIndex": 3,
        "explanation": "Divs have no semantic meaning and should be used as a last resort for styling."
      }
    ]
  },
  "html-l5": {
    "id": "html-l5",
    "courseSlug": "html",
    "title": "Multimedia, Meta Tags & SEO",
    "duration": "1h",
    "introduction": "In our final HTML lesson, we will explore advanced features: embedding audio and video directly into your pages, and using meta tags to communicate directly with search engines and social media platforms.",
    "learningObjectives": [
      "Embed audio and video files using HTML5 tags.",
      "Embed external content like YouTube videos using iframes.",
      "Understand the <head> section and Meta tags.",
      "Configure basic SEO and viewport settings."
    ],
    "explanation": [
      {
        "heading": "WHAT are Multimedia and Meta Tags?",
        "paragraphs": [
          "Multimedia tags (`<audio>`, `<video>`) allow playing media natively in the browser without plugins. Meta tags provide metadata (data about data) to the browser and search engines."
        ]
      },
      {
        "heading": "WHY use Meta tags?",
        "paragraphs": [
          "When you share a link on iMessage or Twitter, the image, title, and description that pop up are generated by Meta tags! They also tell Google what your page is about."
        ]
      },
      {
        "heading": "HOW to embed media?",
        "paragraphs": [
          "The `<video>` tag works similarly to `<img>`, but you should include the `controls` attribute so the user can play, pause, and adjust volume."
        ]
      },
      {
        "heading": "WHEN to use an iframe?",
        "paragraphs": [
          "Use an `<iframe>` when you want to embed an entire other webpage or service inside yours, such as a YouTube video player or a Google Map."
        ]
      }
    ],
    "codeExample": {
      "language": "html",
      "filename": "advanced.html",
      "explanation": "Embedding a video and setting up meta tags.",
      "code": "<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <meta name=\"description\" content=\"Learn HTML advanced features.\">\n    <title>Advanced HTML</title>\n  </head>\n  <body>\n    <h2>Watch this tutorial</h2>\n    <video src=\"tutorial.mp4\" controls width=\"500\"></video>\n  </body>\n</html>"
    },
    "practicalExample": {
      "title": "Embedding a YouTube Video",
      "scenario": "You want to feature a YouTube video on your blog.",
      "explanation": "Instead of hosting the heavy video yourself, you use the iframe code provided by YouTube.",
      "code": "<iframe width=\"560\" height=\"315\" \n  src=\"https://www.youtube.com/embed/dQw4w9WgXcQ\" \n  title=\"YouTube video player\" \n  frameborder=\"0\" \n  allow=\"accelerometer; autoplay; encrypted-media\" \n  allowfullscreen>\n</iframe>"
    },
    "commonMistakes": [
      {
        "mistake": "Forgetting the viewport meta tag.",
        "whyItHappens": "The page looks fine on a laptop, but tiny and broken on a mobile phone.",
        "howToFix": "ALWAYS include `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">` in the `<head>` of every project.",
        "incorrectSnippet": "<head><title>My Site</title></head>",
        "correctSnippet": "<head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><title>My Site</title></head>"
      }
    ],
    "practice": {
      "title": "Add an Audio Player",
      "instructions": [
        "Add an audio element.",
        "Set the source to \"song.mp3\".",
        "Ensure the user has play/pause controls."
      ],
      "starterCode": "<!-- Add audio player here -->",
      "hint": "Use the <audio> tag with the \"controls\" attribute.",
      "solutionCode": "<audio src=\"song.mp3\" controls></audio>"
    },
    "projectConnection": {
      "title": "Portfolio Project",
      "description": "Final Polish.",
      "howItApplies": "You will add meta descriptions so your portfolio looks professional when you share the link with recruiters on LinkedIn."
    },
    "quiz": [
      {
        "id": "html-l5-q1",
        "question": "Which attribute is required to show play/pause buttons on a <video>?",
        "options": [
          "autoplay",
          "buttons",
          "controls",
          "src"
        ],
        "correctOptionIndex": 2,
        "explanation": "The `controls` attribute tells the browser to display the media controls."
      },
      {
        "id": "html-l5-q2",
        "question": "Where must <meta> tags be placed in an HTML document?",
        "options": [
          "Inside the <body>",
          "Inside the <head>",
          "Outside the <html> tag",
          "Inside the <footer>"
        ],
        "correctOptionIndex": 1,
        "explanation": "Meta tags are metadata and must go inside the <head> element."
      },
      {
        "id": "html-l5-q3",
        "question": "Which tag is used to embed another webpage, like a YouTube player?",
        "options": [
          "<embed>",
          "<object>",
          "<video>",
          "<iframe>"
        ],
        "correctOptionIndex": 3,
        "explanation": "An <iframe> (Inline Frame) is used to embed another document within the current HTML document."
      }
    ]
  }
};
