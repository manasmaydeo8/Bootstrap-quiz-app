/**
 * Bootstrap 5 Mock Interview Quiz - Master Question Bank
 * Total Questions: 65
 * Categories: 16
 */

export const CATEGORIES = {
  BS_FUNDAMENTALS: { id: 'BS_FUNDAMENTALS', name: 'Bootstrap Fundamentals' },
  BS4_VS_BS5: { id: 'BS4_VS_BS5', name: 'Bootstrap 4 vs 5' },
  SETUP_CDN: { id: 'SETUP_CDN', name: 'Setup & CDN' },
  RESPONSIVE_DESIGN: { id: 'RESPONSIVE_DESIGN', name: 'Responsive Web Design' },
  GRID_SYSTEM: { id: 'GRID_SYSTEM', name: 'Grid System & Columns' },
  BREAKPOINTS: { id: 'BREAKPOINTS', name: 'Breakpoints' },
  CONTAINERS: { id: 'CONTAINERS', name: 'Containers' },
  SPACING_UTILS: { id: 'SPACING_UTILS', name: 'Spacing Utilities' },
  FLEXBOX_UTILS: { id: 'FLEXBOX_UTILS', name: 'Flexbox Utilities' },
  UTILITY_CLASSES: { id: 'UTILITY_CLASSES', name: 'Utility Classes' },
  COMPONENTS_NAVBAR: { id: 'COMPONENTS_NAVBAR', name: 'Navbar & Navigation' },
  COMPONENTS_BUTTONS: { id: 'COMPONENTS_BUTTONS', name: 'Buttons' },
  COMPONENTS_CARDS: { id: 'COMPONENTS_CARDS', name: 'Cards & Layouts' },
  COMPONENTS_ALERTS_BADGES: { id: 'COMPONENTS_ALERTS_BADGES', name: 'Alerts & Badges' },
  COMPONENTS_MODALS: { id: 'COMPONENTS_MODALS', name: 'Modals' },
  COMPONENTS_OTHERS: { id: 'COMPONENTS_OTHERS', name: 'Carousel, Dropdown & Pagination' }
};

export const QUESTIONS_DATA = [
  // ==========================================
  // 1. BOOTSTRAP FUNDAMENTALS
  // ==========================================
  {
    id: 'Q01',
    category: 'BS_FUNDAMENTALS',
    difficulty: 'Easy',
    question: 'What is Bootstrap?',
    options: [
      'A server-side Node.js framework for relational databases',
      'A popular open-source front-end CSS and JS framework for building responsive, mobile-first websites',
      'A JavaScript compiler used to transform modern ES6+ to ES5',
      'A Python library for data manipulation and visualization'
    ],
    correctAnswer: 1,
    explanation: 'Bootstrap is an open-source front-end development framework featuring HTML, CSS, and JavaScript components for rapid, mobile-first responsive web design.'
  },
  {
    id: 'Q02',
    category: 'BS_FUNDAMENTALS',
    difficulty: 'Easy',
    question: 'Why do we use Bootstrap?',
    options: [
      'To replace backend API servers and manage database queries',
      'To build responsive, mobile-first UI quickly with consistent cross-browser styling and pre-built components',
      'To compile WebAssembly modules directly in the browser',
      'To eliminate the need for writing HTML markup entirely'
    ],
    correctAnswer: 1,
    explanation: 'Bootstrap is used to accelerate UI development, ensure responsive layouts across all device viewports, and provide tested, consistent cross-browser styling.'
  },
  {
    id: 'Q03',
    category: 'BS_FUNDAMENTALS',
    difficulty: 'Easy',
    question: 'What are the advantages of Bootstrap?',
    options: [
      'Requires paid commercial licensing and custom backend servers',
      'Mobile-first responsiveness, extensive component library, 12-column flexbox grid, active community, and easy customization',
      'Generates backend SQL database migrations automatically',
      'Enforces server-side Python runtime execution'
    ],
    correctAnswer: 1,
    explanation: 'Bootstrap provides mobile-first responsiveness, an extensive UI component library, an intuitive 12-column grid, easy Sass/CSS variable theming, and consistent cross-browser compatibility.'
  },
  {
    id: 'Q04',
    category: 'BS_FUNDAMENTALS',
    difficulty: 'Easy',
    question: 'What is the latest version of Bootstrap?',
    options: [
      'Bootstrap 3',
      'Bootstrap 4',
      'Bootstrap 5 (5.3.x)',
      'Bootstrap 8'
    ],
    correctAnswer: 2,
    explanation: 'Bootstrap 5 (specifically 5.3.x releases) is the latest major generation of Bootstrap, featuring native dark mode color modes, CSS custom properties, and zero jQuery dependency.'
  },
  {
    id: 'Q05',
    category: 'BS4_VS_BS5',
    difficulty: 'Medium',
    hint: 'Consider the removal of legacy third-party dependencies and the shift toward modern Vanilla JavaScript and native CSS features.',
    question: 'What is the difference between Bootstrap 4 and Bootstrap 5?',
    options: [
      'Bootstrap 5 dropped jQuery for vanilla JS, dropped IE11, added CSS variables, RTL support, and XXL breakpoint',
      'Bootstrap 5 reintroduced CSS float layouts and removed Flexbox',
      'Bootstrap 5 requires jQuery 3.6 and AngularJS to function',
      'Bootstrap 5 removed the 12-column grid system entirely'
    ],
    correctAnswer: 0,
    explanation: 'Bootstrap 5 removed jQuery in favor of pure Vanilla JS, dropped Internet Explorer support, added CSS custom properties, native dark mode/RTL support, and added the xxl breakpoint (≥1400px).'
  },
  {
    id: 'Q06',
    category: 'SETUP_CDN',
    difficulty: 'Easy',
    question: 'How do you include Bootstrap in an HTML file?',
    options: [
      'Link the Bootstrap CSS in <head> and the JS bundle before </body>, or install via npm/yarn build tools',
      'Import Bootstrap as an SQL schema file in MySQL',
      'Place @include bootstrap directly inside a plain text file',
      'Bootstrap can only be loaded through a native operating system installer'
    ],
    correctAnswer: 0,
    explanation: 'Bootstrap can be included by linking its compiled CSS inside the <head> and its JS bundle before the closing </body> tag via CDN, or via npm/yarn package managers.'
  },
  {
    id: 'Q07',
    category: 'SETUP_CDN',
    difficulty: 'Easy',
    question: 'What is Bootstrap CDN?',
    options: [
      'A Content Delivery Network hosting pre-compiled Bootstrap CSS and JS files globally for fast, cached delivery',
      'A Central Database Node for storing user accounts',
      'A Command Developer Network for running CLI scripts',
      'A Cascading Device Notation for screen rendering'
    ],
    correctAnswer: 0,
    explanation: 'A CDN (Content Delivery Network like jsDelivr or cdnjs) delivers pre-compiled, minified Bootstrap assets from globally distributed edge servers to reduce latency and improve load times.'
  },
  {
    id: 'Q08',
    category: 'BS_FUNDAMENTALS',
    difficulty: 'Easy',
    question: 'Does Bootstrap require JavaScript?',
    options: [
      'Yes, all Bootstrap CSS styles require JavaScript execution to render',
      'No, CSS layout and styling work without JS; JS is only required for interactive components (modals, dropdowns, tooltips, collapse)',
      'Yes, Bootstrap cannot run without Node.js installed in the browser',
      'No, Bootstrap has no JavaScript functionality whatsoever'
    ],
    correctAnswer: 1,
    explanation: 'Bootstrap CSS (grid, typography, cards, buttons, utilities) works purely with CSS. JavaScript is only required for interactive behavior such as Modals, Dropdowns, Offcanvas, Tooltips, and Collapse.'
  },

  // ==========================================
  // 2. RESPONSIVE WEB DESIGN & GRID SYSTEM
  // ==========================================
  {
    id: 'Q09',
    category: 'RESPONSIVE_DESIGN',
    difficulty: 'Easy',
    question: 'What is responsive web design?',
    options: [
      'Designing web pages that dynamically adapt layout, content, and elements to fit varying screen sizes and devices',
      'Creating pages that reload every second to respond to user gestures',
      'Building websites that only respond to touch input',
      'Writing backend server scripts that respond to HTTP GET requests'
    ],
    correctAnswer: 0,
    explanation: 'Responsive web design (RWD) ensures web pages render effectively across a wide range of devices, screen sizes, and orientations using flexible grids, fluid images, and CSS media queries.'
  },
  {
    id: 'Q10',
    category: 'RESPONSIVE_DESIGN',
    difficulty: 'Medium',
    hint: 'Think about mobile-first media queries and 12-column flexible subdivisions.',
    question: 'How does Bootstrap help in responsive web design?',
    options: [
      'By providing a mobile-first 12-column grid, responsive breakpoint tiers, fluid containers, and responsive utility classes',
      'By taking screenshots of devices and resizing images server-side',
      'By disabling browser zooming for all mobile devices',
      'By forcing all screens to render at 1920x1080 resolution'
    ],
    correctAnswer: 0,
    explanation: 'Bootstrap enables responsive design through its mobile-first media query breakpoints, 12-column flexbox grid system, container classes, and breakpoint-aware utility classes (e.g., d-none d-md-block).'
  },
  {
    id: 'Q11',
    category: 'GRID_SYSTEM',
    difficulty: 'Easy',
    question: 'What is the Bootstrap grid system?',
    options: [
      'A CSS Flexbox/Grid-based layout system that arranges content using containers, rows, and up to 12 columns per row across 6 breakpoints',
      'A table-based layout system using HTML <table> and <td> tags',
      'A backend database schema for indexing records',
      'A canvas drawing API for vector graphics'
    ],
    correctAnswer: 0,
    explanation: 'The Bootstrap grid system uses containers, rows, and columns to layout and align content using modern CSS flexbox across 6 responsive breakpoint tiers.'
  },
  {
    id: 'Q12',
    category: 'GRID_SYSTEM',
    difficulty: 'Medium',
    hint: 'Think about mathematical divisibility by 2, 3, 4, and 6.',
    question: 'Why does Bootstrap use 12 columns?',
    options: [
      '12 is highly divisible (by 1, 2, 3, 4, 6, 12), offering maximum layout flexibility for halves, thirds, quarters, and sixths',
      '12 is the maximum number of DOM elements allowed in HTML5',
      '12 represents the 12 months in a calendar year',
      '12 is required by standard W3C CSS specifications'
    ],
    correctAnswer: 0,
    explanation: '12 is chosen because it is evenly divisible by 1, 2, 3, 4, 6, and 12, allowing developers to create layouts with 1, 2, 3, 4, 6, or 12 equal-width columns effortlessly.'
  },
  {
    id: 'Q13',
    category: 'GRID_SYSTEM',
    difficulty: 'Easy',
    question: 'How many columns are there in the Bootstrap grid system?',
    options: [
      '8 columns',
      '10 columns',
      '12 columns',
      '16 columns'
    ],
    correctAnswer: 2,
    explanation: 'The Bootstrap grid system consists of 12 columns across each row.'
  },
  {
    id: 'Q14',
    category: 'CONTAINERS',
    difficulty: 'Easy',
    question: 'What is the purpose of .container?',
    options: [
      'It provides a responsive, centered layout wrapper with fixed max-widths at each breakpoint and horizontal padding',
      'It forces the entire website background to be transparent',
      'It creates a CSS flexbox row for nesting columns',
      'It prevents users from scrolling the page'
    ],
    correctAnswer: 0,
    explanation: '.container is the basic layout wrapper in Bootstrap that centers content with horizontal padding (gutters) and applies responsive max-width bounds at each breakpoint tier.'
  },
  {
    id: 'Q15',
    category: 'CONTAINERS',
    difficulty: 'Medium',
    hint: 'One has fixed responsive steps at breakpoints, whereas fluid is consistently full viewport width.',
    question: 'What is the difference between .container and .container-fluid?',
    options: [
      '.container has responsive breakpoint max-widths and centers; .container-fluid always spans 100% viewport width across all breakpoints',
      '.container is for text only, while .container-fluid is for images only',
      '.container-fluid is deprecated in Bootstrap 5',
      '.container is full-width (100%), whereas .container-fluid has a fixed 960px width'
    ],
    correctAnswer: 0,
    explanation: '.container applies a responsive max-width that jumps at breakpoints (e.g., 540px, 720px, 960px, etc.), while .container-fluid maintains width: 100% across all viewports.'
  },
  {
    id: 'Q16',
    category: 'GRID_SYSTEM',
    difficulty: 'Easy',
    question: 'What is .row in Bootstrap?',
    options: [
      'A wrapper for columns that sets display: flex, flex-wrap: wrap, and negative horizontal margins to counteract column padding',
      'A table row tag replacement for <tr> elements',
      'A utility class that converts all child elements into inline spans',
      'An element that forces 100vh full page height'
    ],
    correctAnswer: 0,
    explanation: '.row acts as a flexbox wrapper for columns (.col), providing flex-wrap: wrap and negative margins (--bs-gutter-x) to align column content with container boundaries.'
  },
  {
    id: 'Q17',
    category: 'GRID_SYSTEM',
    difficulty: 'Easy',
    question: 'What is .col in Bootstrap?',
    options: [
      'An auto-layout column class that automatically divides available row space equally among sibling columns using flex-grow: 1',
      'A class that colors the background of an element',
      'A command that prints text into the terminal console',
      'A tag used exclusively for HTML <colgroup> tables'
    ],
    correctAnswer: 0,
    explanation: '.col creates an auto-layout flex column (flex: 1 0 0%), allowing sibling .col elements in the same .row to share the available horizontal space equally without explicit width numbers.'
  },
  {
    id: 'Q18',
    category: 'GRID_SYSTEM',
    difficulty: 'Easy',
    question: 'What does .col-6 mean?',
    options: [
      'The column spans 6 out of 12 grid tracks (50% width) across all viewport widths, including extra small (xs)',
      'The column only appears on screens larger than 600px',
      'The column contains exactly 6 child elements',
      'The column adds 6rem of margin on all sides'
    ],
    correctAnswer: 0,
    explanation: '.col-6 applies a width of 50% (6/12 columns) starting from the smallest viewport (0px and up), creating a two-column layout on all screen sizes.'
  },
  {
    id: 'Q19',
    category: 'GRID_SYSTEM',
    difficulty: 'Medium',
    hint: 'Look for the "md" breakpoint indicator (medium screens ≥768px).',
    question: 'What does .col-md-6 mean?',
    options: [
      'The column spans 6 columns (50% width) on medium screens (≥768px) and above, while stacking to 100% width on smaller screens',
      'The column creates 6 medium-sized buttons inside a modal',
      'The column is fixed at 600px width on desktop devices',
      'The column applies 6px of margin-down on mobile devices'
    ],
    correctAnswer: 0,
    explanation: '.col-md-6 applies a 50% column width on medium screens (≥768px) and above, but defaults to full-width 100% stacking on extra small and small devices (<768px).'
  },
  {
    id: 'Q20',
    category: 'GRID_SYSTEM',
    difficulty: 'Medium',
    hint: 'One is unqualified (applies to xs and all larger screens), while the other specifies a minimum screen threshold.',
    question: 'What is the difference between .col-6 and .col-md-6?',
    options: [
      '.col-6 applies 50% width on all screen sizes; .col-md-6 applies 50% width only at ≥768px and stacks 100% on smaller screens',
      '.col-6 is 60px wide, whereas .col-md-6 is 600px wide',
      '.col-md-6 is deprecated in Bootstrap 5 in favor of .col-6',
      '.col-6 requires JavaScript, while .col-md-6 is pure CSS'
    ],
    correctAnswer: 0,
    explanation: '.col-6 is active from 0px (mobile) upwards, giving 50% width on all viewports. .col-md-6 only triggers at ≥768px, so on mobile it stacks vertically as full-width (100%).'
  },
  {
    id: 'Q21',
    category: 'BREAKPOINTS',
    difficulty: 'Medium',
    hint: 'Remember the 6 breakpoint tiers from xs up to xxl.',
    question: 'What are Bootstrap breakpoints?',
    options: [
      'Customizable min-width media query triggers (xs: <576px, sm: ≥576px, md: ≥768px, lg: ≥992px, xl: ≥1200px, xxl: ≥1400px) that control responsive layout shifts',
      'Points in JavaScript where script execution pauses for debugging',
      'Line breaks created by <br> tags in HTML',
      'Maximum file size limits for uploading CSS files'
    ],
    correctAnswer: 0,
    explanation: 'Bootstrap 5 defines 6 core breakpoints based on min-width media queries: xs (<576px), sm (≥576px), md (≥768px), lg (≥992px), xl (≥1200px), and xxl (≥1400px).'
  },
  {
    id: 'Q22',
    category: 'GRID_SYSTEM',
    difficulty: 'Easy',
    question: 'What does col-sm-6 mean?',
    options: [
      'Column spans 6 of 12 tracks (50% width) on small viewports (≥576px) and wider, stacking at 100% on extra small screens (<576px)',
      'Column has 6 small borders around it',
      'Column only renders on smartphones in portrait mode',
      'Column adds 6px of smooth padding on all devices'
    ],
    correctAnswer: 0,
    explanation: 'col-sm-6 applies 50% width (6/12 columns) when the screen is ≥576px (Small tier) and up, while stacking full-width on screens below 576px.'
  },
  {
    id: 'Q23',
    category: 'GRID_SYSTEM',
    difficulty: 'Easy',
    question: 'What does col-lg-4 mean?',
    options: [
      'Column spans 4 of 12 tracks (33.333% width / 1/3 row) on large viewports (≥992px) and wider',
      'Column has 4 large icons inside',
      'Column has 4em of line-height on laptops',
      'Column creates 4 individual nested sub-grids'
    ],
    correctAnswer: 0,
    explanation: 'col-lg-4 sets the column to span 4 of 12 columns (33.333% width, one-third of the row) on screens ≥992px (Large breakpoint).'
  },
  {
    id: 'Q24',
    category: 'GRID_SYSTEM',
    difficulty: 'Easy',
    question: 'How do you create three equal columns using Bootstrap?',
    options: [
      'Place three <div class="col"> elements inside a <div class="row">, or use .col-4 on all three',
      'Place three <div class="grid-3"> elements inside a <table>',
      'Use <div class="equal-3"> inside a <section>',
      'Use three <span class="third"> tags without any row container'
    ],
    correctAnswer: 0,
    explanation: 'Placing three .col (or .col-4 / .col-md-4) elements inside a .row distributes the 12 available grid columns equally (4 columns / 33.33% each).'
  },
  {
    id: 'Q25',
    category: 'RESPONSIVE_DESIGN',
    difficulty: 'Medium',
    hint: 'Bootstrap uses a tiered combination of containers, column widths, and responsive utilities.',
    question: 'How do you make a layout responsive in Bootstrap?',
    options: [
      'Combine container wrappers, responsive grid breakpoint classes (e.g., col-12 col-md-6 col-lg-4), and responsive utility classes',
      'Write inline JavaScript listeners for window resize events on every element',
      'Set fixed pixel widths on all container <div> tags',
      'Disable the browser viewport meta tag in the HTML head'
    ],
    correctAnswer: 0,
    explanation: 'Responsive layouts in Bootstrap are built using .container wrappers, breakpoint-specific grid column classes (col-*, col-sm-*, col-md-*, col-lg-*), and responsive utility classes.'
  },

  // ==========================================
  // 3. UTILITY CLASSES & SPACING
  // ==========================================
  {
    id: 'Q26',
    category: 'UTILITY_CLASSES',
    difficulty: 'Easy',
    question: 'What are Bootstrap utility classes?',
    options: [
      'Single-purpose, reusable CSS helper classes for quickly applying spacing, colors, typography, display, flexbox, borders, and shadows',
      'Internal JavaScript helper functions used only in Node.js build steps',
      'Third-party npm dependencies for database management',
      'Built-in browser developer tools for inspecting CSS styles'
    ],
    correctAnswer: 0,
    explanation: 'Utility classes (such as text-center, p-3, d-flex, bg-primary, shadow-sm) provide single-purpose styling rules that can be applied directly to HTML elements without writing custom CSS.'
  },
  {
    id: 'Q27',
    category: 'SPACING_UTILS',
    difficulty: 'Easy',
    question: 'What are spacing utilities in Bootstrap?',
    options: [
      'Classes for controlling margin (m*) and padding (p*) with scale values from 0 to 5 and auto across responsive breakpoints',
      'Astronomical calculation utilities for satellite positioning',
      'CSS Grid line spacing rules for 3D transforms',
      'Character spacing classes that only affect typography font-weight'
    ],
    correctAnswer: 0,
    explanation: 'Spacing utilities control margin (m) and padding (p) across sides (t, b, s, e, x, y) using a 0 to 5 scale (where 3 = $spacer = 1rem = 16px) with optional breakpoint modifiers.'
  },
  {
    id: 'Q28',
    category: 'SPACING_UTILS',
    difficulty: 'Easy',
    question: 'What does m-3 mean?',
    options: [
      'Applies margin of size 3 (default 1rem / 16px) on all 4 sides (top, bottom, start, end)',
      'Applies negative margin of 3px on the left side',
      'Applies padding of 3rem to the middle of the element',
      'Sets the element height to 3 meters'
    ],
    correctAnswer: 0,
    explanation: 'm-3 sets margin: 1rem (the default $spacer value, 16px) on all four sides of the element.'
  },
  {
    id: 'Q29',
    category: 'SPACING_UTILS',
    difficulty: 'Easy',
    question: 'What does p-3 mean?',
    options: [
      'Applies padding of size 3 (default 1rem / 16px) on all 4 sides (top, bottom, start, end)',
      'Creates 3 paragraph tags inside the element',
      'Applies margin of 30px to the bottom',
      'Sets font-size to 3pt'
    ],
    correctAnswer: 0,
    explanation: 'p-3 sets padding: 1rem (16px) on all four sides of the target element.'
  },
  {
    id: 'Q30',
    category: 'SPACING_UTILS',
    difficulty: 'Easy',
    question: 'What does mt-3 mean?',
    options: [
      'Sets margin-top: 1rem (size 3)',
      'Sets margin-total of 3%',
      'Sets minimum top height to 300px',
      'Sets margin-left and margin-right to 3em'
    ],
    correctAnswer: 0,
    explanation: 'mt-3 applies margin-top: 1rem (size 3) to the element.'
  },
  {
    id: 'Q31',
    category: 'SPACING_UTILS',
    difficulty: 'Easy',
    question: 'What does mb-3 mean?',
    options: [
      'Sets margin-bottom: 1rem (size 3)',
      'Sets maximum byte buffer to 3 megabytes',
      'Sets margin-both to 30px',
      'Sets background opacity to 30%'
    ],
    correctAnswer: 0,
    explanation: 'mb-3 applies margin-bottom: 1rem (size 3), commonly used for spacing form elements and cards.'
  },
  {
    id: 'Q32',
    category: 'SPACING_UTILS',
    difficulty: 'Easy',
    question: 'What does my-3 mean?',
    options: [
      'Applies vertical margins (margin-top and margin-bottom) of size 3 (1rem / 16px)',
      'Applies horizontal margins of size 3',
      'Sets yearly animation duration to 3 seconds',
      'Sets margin for the current user profile view'
    ],
    correctAnswer: 0,
    explanation: 'The y axis in Bootstrap spacing utilities represents vertical sides (top + bottom), so my-3 sets both margin-top and margin-bottom to 1rem.'
  },
  {
    id: 'Q33',
    category: 'SPACING_UTILS',
    difficulty: 'Easy',
    question: 'What is the difference between margin and padding in Bootstrap?',
    options: [
      'Margin creates space outside an element border; padding creates space inside an element border around its content',
      'Margin is inside the border, while padding is outside the border',
      'Margin only works on text, while padding only works on images',
      'Margin is measured in pixels, while padding is measured in percentages'
    ],
    correctAnswer: 0,
    explanation: 'Margin creates external clearance around an element border (separating it from other elements), while padding creates internal space between the border and the inner content.'
  },
  {
    id: 'Q34',
    category: 'SPACING_UTILS',
    difficulty: 'Medium',
    hint: 'In RTL-friendly naming, "s" stands for start (left in LTR). Setting it to auto consumes all available space on that side.',
    question: 'What does ms-auto mean?',
    options: [
      'Sets margin-inline-start: auto (margin-left in LTR), pushing the element to the far right in a flex container',
      'Sets Microsoft auto-detection mode',
      'Sets milliseconds timer to auto-start',
      'Sets minimum scale factor automatically'
    ],
    correctAnswer: 0,
    explanation: 'ms-auto sets margin-start: auto (margin-left in LTR languages), commonly used to push navigation links or items to the far right of a flex container or navbar.'
  },
  {
    id: 'Q35',
    category: 'SPACING_UTILS',
    difficulty: 'Medium',
    hint: 'In RTL-friendly naming, "e" stands for end (right in LTR).',
    question: 'What does me-auto mean?',
    options: [
      'Sets margin-inline-end: auto (margin-right in LTR), pushing sibling elements away to the right in a flex container',
      'Applies media encryption automatically',
      'Sets margin to the current author email',
      'Sets mobile emulation mode in CSS'
    ],
    correctAnswer: 0,
    explanation: 'me-auto sets margin-end: auto (margin-right in LTR languages), pushing following sibling elements toward the far end of the flex container.'
  },
  {
    id: 'Q36',
    category: 'SPACING_UTILS',
    difficulty: 'Medium',
    hint: 'The x-axis represents horizontal margins (left + right). Setting both to auto centers block elements.',
    question: 'What does mx-auto mean?',
    options: [
      'Sets horizontal margins (margin-left and margin-right) to auto, centering a block-level element with a specified width',
      'Sets maximum X-axis scrollbar to automatic',
      'Multiplies the X coordinate by auto scaling',
      'Centers text inside an inline span element'
    ],
    correctAnswer: 0,
    explanation: 'mx-auto applies margin-left: auto and margin-right: auto, which centers a fixed-width block element horizontally.'
  },
  {
    id: 'Q37',
    category: 'SPACING_UTILS',
    difficulty: 'Medium',
    hint: 'Look at the combination: ms (margin-start), lg (Large screen tier ≥992px), and 3 (1rem size).',
    question: 'What does ms-lg-3 mean?',
    options: [
      'Applies margin-start (margin-left in LTR) of size 3 (1rem) starting at the large breakpoint (≥992px) and above',
      'Applies 3 large margins on small screens',
      'Applies a 3-second mouse hover delay on laptops',
      'Sets multi-screen layout grid to 3 columns'
    ],
    correctAnswer: 0,
    explanation: 'ms-lg-3 applies margin-start: 1rem only when the viewport width is at or above the large breakpoint (≥992px).'
  },

  // ==========================================
  // 4. FLEXBOX UTILITIES
  // ==========================================
  {
    id: 'Q38',
    category: 'FLEXBOX_UTILS',
    difficulty: 'Easy',
    question: 'What does d-flex do?',
    options: [
      'Applies display: flex !important, converting the element into a CSS Flexbox container and turning direct children into flex items',
      'Downloads flex assets asynchronously',
      'Applies a flexible 3D rotation animation',
      'Makes font weights dynamic based on screen DPI'
    ],
    correctAnswer: 0,
    explanation: 'd-flex sets display: flex !important on an element, converting it into a flex container and activating flexbox layout rules for its direct child elements.'
  },
  {
    id: 'Q39',
    category: 'FLEXBOX_UTILS',
    difficulty: 'Medium',
    hint: 'Flexbox handles direction, main-axis distribution, cross-axis alignment, and ordering via atomic classes.',
    question: 'How does Bootstrap Flexbox work?',
    options: [
      'Uses CSS Flexbox with utility classes for direction (flex-row/column), alignment (justify-content-*, align-items-*), wrapping (flex-wrap), and ordering',
      'Uses Flash player plugins to reposition HTML elements',
      'Floats every block element to the left and injects clearfix pseudo-elements',
      'Uses absolute CSS positioning calculated via JavaScript timers'
    ],
    correctAnswer: 0,
    explanation: 'Bootstrap Flexbox provides responsive utility classes to control flex direction, justification along the main axis, alignment along the cross axis, flex wrapping, auto-margins, and item ordering.'
  },
  {
    id: 'Q40',
    category: 'FLEXBOX_UTILS',
    difficulty: 'Easy',
    question: 'What does justify-content-center do?',
    options: [
      'Aligns flex items along the center of the main axis (justify-content: center !important) in a flex container',
      'Centers text inside a paragraph element vertically',
      'Justifies paragraphs with left and right equal margins like a book',
      'Centers the entire HTML document on the display monitor'
    ],
    correctAnswer: 0,
    explanation: 'justify-content-center applies justify-content: center, which aligns flex items in the center of the container along the primary layout axis (horizontal in row mode).'
  },
  {
    id: 'Q41',
    category: 'FLEXBOX_UTILS',
    difficulty: 'Easy',
    question: 'What does align-items-center do?',
    options: [
      'Aligns flex items along the center of the cross axis (align-items: center !important) in a flex container',
      'Horizontally aligns text inside an input box',
      'Centers the browser window on the user desktop screen',
      'Centers list bullets inside an ordered list'
    ],
    correctAnswer: 0,
    explanation: 'align-items-center applies align-items: center, aligning flex items in the middle of the perpendicular/cross axis (vertical in row mode).'
  },
  {
    id: 'Q42',
    category: 'FLEXBOX_UTILS',
    difficulty: 'Medium',
    hint: 'Main axis vs. Cross axis is the fundamental distinction.',
    question: 'What is the difference between justify-content and align-items?',
    options: [
      'justify-content aligns items along the MAIN axis (horizontal in row); align-items aligns items along the CROSS axis (vertical in row)',
      'justify-content is for CSS Grid only, while align-items is for Flexbox only',
      'justify-content modifies font colors; align-items modifies font sizes',
      'justify-content works only on desktop; align-items works only on mobile'
    ],
    correctAnswer: 0,
    explanation: 'In CSS flexbox, justify-content aligns items along the main axis (x-axis in flex-direction: row), whereas align-items aligns items along the cross axis (y-axis in flex-direction: row).'
  },

  // ==========================================
  // 5. BOOTSTRAP COMPONENTS
  // ==========================================
  {
    id: 'Q43',
    category: 'COMPONENTS_NAVBAR',
    difficulty: 'Easy',
    question: 'What is a Bootstrap navbar?',
    options: [
      'A responsive navigation header component that supports branding, navigation links, forms, dropdowns, and collapse toggling on mobile viewports',
      'A native desktop status bar plugin',
      'An HTML5 canvas audio visualization bar',
      'A browser address bar customization tool'
    ],
    correctAnswer: 0,
    explanation: 'The Bootstrap navbar (.navbar) is a responsive header wrapper that houses brand logos (.navbar-brand), navigation links (.navbar-nav), forms, and responsive collapse togglers.'
  },
  {
    id: 'Q44',
    category: 'COMPONENTS_NAVBAR',
    difficulty: 'Medium',
    hint: 'Combine navbar-expand, navbar-toggler, and collapse classes.',
    question: 'How do you create a responsive navbar?',
    options: [
      'Use <nav class="navbar navbar-expand-lg">, wrap links in <div class="collapse navbar-collapse">, and add a <button class="navbar-toggler">',
      'Write custom CSS media queries for every link and attach JavaScript click listeners manually',
      'Wrap all links inside an HTML <table> tag with width="100%"',
      'Use <div class="nav-responsive"> without any collapse plugin'
    ],
    correctAnswer: 0,
    explanation: 'A responsive navbar uses navbar-expand-{breakpoint} to specify when it switches to desktop layout, combined with .navbar-toggler and a collapsible container (.collapse.navbar-collapse) linked by data-bs-target.'
  },
  {
    id: 'Q45',
    category: 'COMPONENTS_NAVBAR',
    difficulty: 'Medium',
    hint: 'The lg prefix sets the threshold where the hamburger toggler turns into a full menu.',
    question: 'What is the purpose of navbar-expand-lg?',
    options: [
      'Specifies that the navbar expands into a horizontal desktop menu at the lg breakpoint (≥992px) and collapses into a hamburger toggler on smaller screens (<992px)',
      'Makes the navbar permanently full-screen height',
      'Increases navbar font size to 32px',
      'Expands navbar width to 200% of viewport width'
    ],
    correctAnswer: 0,
    explanation: 'navbar-expand-lg causes the navbar to display horizontally on large screens (≥992px) and collapse into a vertical hamburger toggle menu on screens below 992px.'
  },
  {
    id: 'Q46',
    category: 'COMPONENTS_NAVBAR',
    difficulty: 'Medium',
    hint: 'Think about contrast styling in older versions versus color mode attributes in Bootstrap 5.3+.',
    question: 'What is the difference between navbar-dark and navbar-light?',
    options: [
      'In Bootstrap 4, they styled text and toggler contrast for dark or light backgrounds; in Bootstrap 5.3+, color modes (data-bs-theme="dark"/"light") handle navbar theming',
      'navbar-dark is for nocturnal web browsing only',
      'navbar-light disables all CSS transitions in the navbar',
      'navbar-dark requires a paid commercial license'
    ],
    correctAnswer: 0,
    explanation: 'Historically, navbar-dark styled links and togglers with light text for dark backgrounds, and navbar-light used dark text for light backgrounds. In Bootstrap 5.3+, color mode theming (data-bs-theme="dark") is the modern approach.'
  },
  {
    id: 'Q47',
    category: 'COMPONENTS_BUTTONS',
    difficulty: 'Easy',
    question: 'How do you create a Bootstrap button?',
    options: [
      'Add the base class .btn and a contextual style class like .btn-primary to a <button> or <a> element',
      'Use the custom HTML tag <bs-button color="blue">',
      'Add style="bootstrap: button" to any <div>',
      'Write a custom JavaScript constructor new BootstrapButton()'
    ],
    correctAnswer: 0,
    explanation: 'Bootstrap buttons require the base class .btn along with a contextual modifier like .btn-primary, .btn-secondary, .btn-outline-danger, etc.'
  },
  {
    id: 'Q48',
    category: 'COMPONENTS_BUTTONS',
    difficulty: 'Easy',
    question: 'What are Bootstrap button variants?',
    options: [
      'Solid and outline contextual color classes like btn-primary, btn-secondary, btn-success, btn-danger, btn-warning, btn-info, btn-light, btn-dark, btn-link',
      'Keyboard shortcuts for triggering browser events',
      'Font size modifiers from h1 to h6',
      'Browser-specific compiler flags for WebAssembly'
    ],
    correctAnswer: 0,
    explanation: 'Bootstrap button variants include solid contextual styles (btn-primary, btn-danger, etc.), outline styles (btn-outline-primary), size variants (btn-lg, btn-sm), and text link buttons (btn-link).'
  },
  {
    id: 'Q49',
    category: 'COMPONENTS_CARDS',
    difficulty: 'Easy',
    question: 'What is a Bootstrap card?',
    options: [
      'A flexible and extensible content container with optional headers, footers, body content, titles, images, and border styling',
      'A payment gateway integration widget',
      'A physical RFID scanner interface plugin',
      'A playing card gaming module for HTML canvas'
    ],
    correctAnswer: 0,
    explanation: '.card provides a flexible container with structured sub-components like .card-header, .card-body, .card-title, .card-text, and .card-footer.'
  },
  {
    id: 'Q50',
    category: 'COMPONENTS_ALERTS_BADGES',
    difficulty: 'Easy',
    question: 'How do you create a Bootstrap alert?',
    options: [
      'Add the base class .alert and a contextual modifier like .alert-success or .alert-warning to a <div>',
      'Call the browser native window.alert() JavaScript method',
      'Use <notification type="popup"> in HTML',
      'Place <div class="toast-popup-box"> inside <head>'
    ],
    correctAnswer: 0,
    explanation: 'Bootstrap alerts use the .alert base class paired with a contextual color class (e.g. .alert-success, .alert-danger), and can optionally include .alert-dismissible with a .btn-close button.'
  },
  {
    id: 'Q51',
    category: 'COMPONENTS_ALERTS_BADGES',
    difficulty: 'Easy',
    question: 'What is a Bootstrap badge?',
    options: [
      'A small labeling component (.badge) used to display counts, status tags, or highlighted labels next to text or buttons',
      'An encrypted digital signature certificate icon',
      'A browser favicon rendered inside the URL bar',
      'A watermark placed over background images'
    ],
    correctAnswer: 0,
    explanation: '.badge provides small inline label styling, often paired with background color utilities (bg-primary, bg-danger) and .rounded-pill.'
  },
  {
    id: 'Q52',
    category: 'COMPONENTS_MODALS',
    difficulty: 'Medium',
    hint: 'Managed using data attributes like data-bs-toggle="modal" and data-bs-target="#id" or the JavaScript Modal API.',
    question: 'What is a Bootstrap modal?',
    options: [
      'A dialog box / popup window displayed on top of the current page with a backdrop overlay, triggered via data-bs-toggle="modal"',
      'A mathematical function calculating remainder values',
      'A CSS transition that morphs 2D elements into 3D models',
      'A sound effect played when clicking buttons'
    ],
    correctAnswer: 0,
    explanation: 'A Bootstrap modal is a customizable overlay dialog component containing header, body, footer, and backdrop, managed via data-bs-toggle="modal" or the JavaScript bootstrap.Modal API.'
  },
  {
    id: 'Q53',
    category: 'COMPONENTS_OTHERS',
    difficulty: 'Medium',
    hint: 'Cycles through carousel-item containers and uses data-bs-ride="carousel" for auto-play.',
    question: 'What is a Bootstrap carousel?',
    options: [
      'A slideshow component for cycling through a series of content, images, or text slides with controls and indicators',
      'A circular 3D rotating menu built with Canvas API',
      'An audio player playlist controller',
      'A round loading spinner icon'
    ],
    correctAnswer: 0,
    explanation: '.carousel is a slideshow component that cycles through .carousel-item elements with previous/next controls, slide indicators, and auto-play (data-bs-ride="carousel").'
  },
  {
    id: 'Q54',
    category: 'COMPONENTS_OTHERS',
    difficulty: 'Easy',
    question: 'What is a Bootstrap dropdown?',
    options: [
      'A toggleable contextual overlay menu for displaying lists of links or actions, triggered via data-bs-toggle="dropdown"',
      'An HTML <select> tag replacement that only works in forms',
      'A CSS drop-shadow effect applied to cards',
      'A drag-and-drop file upload zone'
    ],
    correctAnswer: 0,
    explanation: 'Bootstrap dropdowns (.dropdown) position contextual overlay menus (.dropdown-menu) next to a trigger element using Popper.js for precise positioning and collision management.'
  },
  {
    id: 'Q55',
    category: 'COMPONENTS_OTHERS',
    difficulty: 'Easy',
    question: 'What is a Bootstrap pagination?',
    options: [
      'A component (.pagination with .page-item and .page-link) that provides structured multi-page navigation links',
      'A backend memory paging algorithm for database cache',
      'A CSS property that splits long text paragraphs into book pages',
      'An infinite scroll event listener plugin'
    ],
    correctAnswer: 0,
    explanation: '.pagination creates a series of horizontal pagination links using .page-item and .page-link, supporting .active, .disabled, and sizing modifiers (.pagination-lg, .pagination-sm).'
  },

  // ==========================================
  // 6. DIFFICULT / ADVANCED TECHNICAL QUESTIONS
  // ==========================================
  {
    id: 'Q56',
    category: 'BS_FUNDAMENTALS',
    difficulty: 'Hard',
    hint: 'Focus on how the data-bs-theme attribute re-defines CSS variables without downloading new stylesheets.',
    question: 'How does Bootstrap 5 handle CSS Custom Properties scoping between Light and Dark color modes?',
    options: [
      'By defining global variables in :root and overriding specific semantic color variables under [data-bs-theme="dark"] selector',
      'By downloading a separate stylesheet file via JavaScript fetch whenever dark mode is activated',
      'By recompiling Sass stylesheets on the client GPU in real-time',
      'By toggling CSS filter: invert(1) on the <body> element'
    ],
    correctAnswer: 0,
    explanation: 'Bootstrap 5 uses CSS variables in :root for default properties, and reassigns theme tokens like --bs-body-bg and --bs-body-color under the [data-bs-theme="dark"] attribute selector without reloading CSS.'
  },
  {
    id: 'Q57',
    category: 'GRID_SYSTEM',
    difficulty: 'Hard',
    hint: 'Check the difference between flexbox rows and the CSS Grid classes enabled with $enable-cssgrid: true.',
    question: 'What is the difference between Bootstrap 5 default Flexbox grid and its opt-in CSS Grid layout system?',
    options: [
      'Default grid uses flexbox (.row > .col-*), while opt-in CSS Grid uses .grid container with .g-col-* classes and requires $enable-cssgrid: true in Sass',
      'CSS Grid only works in Firefox and requires jQuery',
      'Default grid is two-dimensional, whereas CSS Grid is strictly one-dimensional',
      'Opt-in CSS Grid eliminates the need for HTML container wrappers entirely'
    ],
    correctAnswer: 0,
    explanation: 'Bootstrap 5 includes an opt-in CSS Grid system enabled via $enable-cssgrid: true in Sass. It replaces .row with .grid and .col-* with .g-col-*, utilizing native CSS grid-template-columns.'
  },
  {
    id: 'Q58',
    category: 'UTILITY_CLASSES',
    difficulty: 'Hard',
    hint: 'Sass provides a map function to merge two key-value dictionaries together.',
    question: 'When customizing Bootstrap 5 theme colors in Sass, how should custom colors be merged into $theme-colors without overriding default color tokens?',
    options: [
      'Use the Sass map-merge() function to combine a custom color map with the existing $theme-colors map before importing Bootstrap components',
      'Assign custom hex values directly to the $theme-colors variable using the CSS var() function',
      'Overwrite the entire Bootstrap node_modules stylesheet manually',
      'Add !important declarations to every HTML class attribute in JavaScript'
    ],
    correctAnswer: 0,
    explanation: 'Using $theme-colors: map-merge($theme-colors, $custom-colors); merges custom semantic colors into the default Sass map, generating all corresponding contextual utility and component classes.'
  },
  {
    id: 'Q59',
    category: 'UTILITY_CLASSES',
    difficulty: 'Hard',
    hint: 'Look for the centralized Sass map variable named $utilities that defines properties, values, and responsive flags.',
    question: 'How does the Bootstrap 5 Utility API in Sass allow developers to generate custom utility classes or modify existing ones?',
    options: [
      'Through the $utilities Sass map, which defines property, class prefix, values, responsive tiers, and state pseudo-classes',
      'By writing custom WebAssembly modules compiled to CSS at runtime',
      'Through JavaScript polyfills injected into the HTML DOM head',
      'By defining custom XML tags recognized by the Bootstrap parser'
    ],
    correctAnswer: 0,
    explanation: 'The Utilities API processes the $utilities Sass map containing definitions for CSS properties, responsive breakpoints, state variants (hover, focus), and class name prefixes to generate atomic utility classes.'
  },
  {
    id: 'Q60',
    category: 'COMPONENTS_MODALS',
    difficulty: 'Hard',
    hint: 'Present-tense events fire before transitions begin and can be cancelled with preventDefault().',
    question: 'In Bootstrap 5 JavaScript Modal lifecycle, what is the exact event fired immediately when the show instance method is called before the transition begins?',
    options: [
      'show.bs.modal (which can be cancelled via event.preventDefault())',
      'shown.bs.modal',
      'modal.open.start',
      'init.bs.modal'
    ],
    correctAnswer: 0,
    explanation: 'show.bs.modal fires immediately upon calling the show instance method before CSS transitions start. Calling event.preventDefault() on this event cancels modal opening.'
  },
  {
    id: 'Q61',
    category: 'BS_FUNDAMENTALS',
    difficulty: 'Hard',
    hint: 'Bootstrap 5 components feature a static method combining retrieval and instantiation.',
    question: 'How do you programmatically retrieve or create an Offcanvas component instance using Bootstrap 5 Vanilla JavaScript without creating duplicate instances?',
    options: [
      'bootstrap.Offcanvas.getOrCreateInstance(element)',
      'document.querySelector(element).bootstrapOffcanvas()',
      'new bootstrap.Offcanvas(element, { duplicate: false })',
      'bootstrap.Offcanvas.findOrThrow(element)'
    ],
    correctAnswer: 0,
    explanation: 'Bootstrap 5 provides static getOrCreateInstance(element) on all JavaScript components to safely retrieve an existing instance or initialize a new one without memory leaks or duplicate listeners.'
  },
  {
    id: 'Q62',
    category: 'BS_FUNDAMENTALS',
    difficulty: 'Hard',
    hint: 'A class applied to the form activates pseudo-classes :valid and :invalid.',
    question: 'How does Bootstrap 5 client-side form validation display feedback icons and messages without relying on browser default tooltip popups?',
    options: [
      'By adding the .was-validated class to the <form> (or .is-invalid/.is-valid to inputs) combined with HTML5 novalidate attribute',
      'By disabling all CSS styling and showing JavaScript alert prompts',
      'By submitting the form to an asynchronous server endpoint on every keystroke',
      'By replacing all input elements with SVG image graphics'
    ],
    correctAnswer: 0,
    explanation: 'Applying the novalidate attribute to <form> disables native tooltips, and adding .was-validated activates Bootstrap :valid and :invalid CSS pseudo-class styles and .invalid-feedback elements.'
  },
  {
    id: 'Q63',
    category: 'BS_FUNDAMENTALS',
    difficulty: 'Hard',
    hint: 'Look for the built-in HTML sanitizer allowList dictionary on Tooltips and Popovers.',
    question: 'What security mechanism does Bootstrap 5 use by default to prevent Cross-Site Scripting (XSS) when rendering HTML content in Tooltips and Popovers?',
    options: [
      'An internal HTML Sanitizer that validates tags and attributes against an explicit allowList (bootstrap.Tooltip.Default.allowList)',
      'Sandboxed iframe rendering for all tooltip text',
      'Cryptographic hashing of all HTML strings using SHA-256',
      'Base64 encoding that strips all vowels from the content'
    ],
    correctAnswer: 0,
    explanation: 'Bootstrap uses a built-in JS sanitizer that strips disallowed HTML tags and attributes based on a configurable allowList dictionary (bootstrap.Tooltip.Default.allowList) to guard against XSS.'
  },
  {
    id: 'Q64',
    category: 'BREAKPOINTS',
    difficulty: 'Hard',
    hint: 'The Sass map variable starts with $grid- and ends with breakpoints.',
    question: 'Which Sass variable in Bootstrap 5 defines the mapping of breakpoint names to their minimum viewport widths?',
    options: [
      '$grid-breakpoints',
      '$screen-sizes-map',
      '$media-queries-list',
      '$responsive-tiers'
    ],
    correctAnswer: 0,
    explanation: 'The $grid-breakpoints Sass map defines all breakpoint keys (xs, sm, md, lg, xl, xxl) and their min-width pixel boundaries (0, 576px, 768px, 992px, 1200px, 1400px).'
  },
  {
    id: 'Q65',
    category: 'COMPONENTS_OTHERS',
    difficulty: 'Hard',
    hint: 'A wrapper container with positioning classes handles fixed stacking.',
    question: 'How does Bootstrap 5 position multiple Toast notifications in a fixed screen corner (e.g., top-right) without overlapping?',
    options: [
      'By wrapping .toast elements inside a .toast-container with position utility classes (e.g., position-fixed top-0 end-0 p-3)',
      'By writing custom JavaScript floating coordinate recalculation loops',
      'By setting z-index: -1 on each individual toast',
      'Toasts cannot be stacked and must only be rendered one at a time'
    ],
    correctAnswer: 0,
    explanation: '.toast-container wraps multiple toasts and uses positioning utilities like position-fixed top-0 end-0 p-3 to stack toasts cleanly in any screen corner.'
  }
];
