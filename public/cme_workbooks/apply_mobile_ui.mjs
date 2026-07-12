import fs from 'fs';

// 1. Update index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');
const bottomNavHtml = `
    <!-- Mobile Bottom Navigation -->
    <nav class="mobile-bottom-nav" id="mobile-bottom-nav">
      <a href="#" class="mobile-nav-item active" id="mobile-nav-dashboard">
        <i class="fa-solid fa-house"></i>
        <span>Home</span>
      </a>
      <a href="#" class="mobile-nav-item" id="mobile-nav-topics">
        <i class="fa-solid fa-book-open"></i>
        <span>Topics</span>
      </a>
      <a href="#" class="mobile-nav-item" id="mobile-nav-games">
        <i class="fa-solid fa-gamepad"></i>
        <span>Games</span>
      </a>
      <a href="#" class="mobile-nav-item" id="mobile-nav-more">
        <i class="fa-solid fa-bars"></i>
        <span>More</span>
      </a>
    </nav>
  </div> <!-- End app-container -->`;

indexHtml = indexHtml.replace('  </div>\n\n  <!-- Audio Elements -->', bottomNavHtml + '\n\n  <!-- Audio Elements -->');
fs.writeFileSync('index.html', indexHtml);
console.log("Updated index.html");

// 2. Update style.css
let styleCss = fs.readFileSync('style.css', 'utf8');
const mobileCss = `
/* ==========================================================================
   MOBILE UI OVERHAUL (BOTTOM NAV & TOUCH TARGETS)
   ========================================================================== */
.mobile-bottom-nav {
  display: none;
}

@media (max-width: 768px) {
  /* Show bottom nav */
  .mobile-bottom-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 65px;
    background: var(--bg-card);
    border-top: 1px solid var(--border-glass);
    z-index: 9999;
    padding-bottom: env(safe-area-inset-bottom);
    box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.3);
  }

  .mobile-nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    text-decoration: none;
    font-size: 0.65rem;
    font-weight: 600;
    flex: 1;
    height: 100%;
    gap: 4px;
    transition: color 0.2s;
  }

  .mobile-nav-item i {
    font-size: 1.2rem;
  }

  .mobile-nav-item.active {
    color: var(--primary);
  }

  /* Padding for main wrapper so content isn't obscured by bottom nav */
  .main-wrapper {
    padding-bottom: 80px;
  }

  /* Enlarge touch targets */
  .btn, .btn-primary, .btn-secondary, .btn-incorrect, .btn-correct, .select-input, .form-control {
    min-height: 44px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .flashcard-controls button {
    min-height: 50px;
  }
  
  .filter-btn {
    min-height: 40px;
  }

  /* Hide redundant overall progress badge on mobile header to save space */
  .overall-progress-badge {
    display: none !important;
  }
}
`;
if (!styleCss.includes('MOBILE UI OVERHAUL')) {
  fs.writeFileSync('style.css', styleCss + mobileCss);
  console.log("Updated style.css");
}

// 3. Update src/navigation.js
let navJs = fs.readFileSync('src/navigation.js', 'utf8');

// Insert event listeners at the end of initNavigation
const mobileListeners = `
  // Mobile Bottom Navigation bindings
  const mobDash = document.getElementById('mobile-nav-dashboard');
  if (mobDash) {
    mobDash.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('dashboard');
      updateMobileNavActive('mobile-nav-dashboard');
    });
  }

  const mobTopics = document.getElementById('mobile-nav-topics');
  if (mobTopics) {
    mobTopics.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('dashboard');
      updateMobileNavActive('mobile-nav-topics');
      // Scroll to topics list
      const topicsList = document.getElementById('dashboard-topics-list');
      if (topicsList) {
        setTimeout(() => topicsList.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    });
  }

  const mobGames = document.getElementById('mobile-nav-games');
  if (mobGames) {
    mobGames.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('games');
      updateMobileNavActive('mobile-nav-games');
    });
  }

  const mobMore = document.getElementById('mobile-nav-more');
  if (mobMore) {
    mobMore.addEventListener('click', (e) => {
      e.preventDefault();
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('sidebar-overlay');
      if (sidebar && overlay) {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent scrolling
      }
      // Keep "More" highlighted while sidebar is open
    });
  }
} // <--- Matching original initNavigation closing brace

function updateMobileNavActive(activeId) {
  document.querySelectorAll('.mobile-nav-item').forEach(item => {
    item.classList.remove('active');
  });
  const activeEl = document.getElementById(activeId);
  if (activeEl) activeEl.classList.add('active');
}
`;

// Replace the closing brace of initNavigation
// Let's find the closing brace of initNavigation. It's a large function.
// We can use a regex to find the end of initNavigation, or just append the listeners inside it.
// The easiest way is to find "export function switchView" and insert right before it.
const switchViewStr = "export function switchView(viewName) {";
navJs = navJs.replace(switchViewStr, mobileListeners + "\n\n" + switchViewStr);
// Wait, mobileListeners includes a closing brace '}'. We need to make sure we replace correctly.
// Let's just find "export function switchView" and insert the logic.
// Ah, `initNavigation` closes *before* `switchView`. 
// So the code before `switchView` is `}\n\nexport function switchView`.
// I will replace `}\n\nexport function switchView` with `  mobileListeners... }\n\nfunction updateMobileNavActive...\n\nexport function switchView`.

fs.writeFileSync('scratch/patch_nav.mjs', `
import fs from 'fs';
let navJs = fs.readFileSync('src/navigation.js', 'utf8');

const insertion = \`
  // Mobile Bottom Navigation bindings
  const mobDash = document.getElementById('mobile-nav-dashboard');
  if (mobDash) {
    mobDash.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('dashboard');
      updateMobileNavActive('mobile-nav-dashboard');
    });
  }

  const mobTopics = document.getElementById('mobile-nav-topics');
  if (mobTopics) {
    mobTopics.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('dashboard');
      updateMobileNavActive('mobile-nav-topics');
      // Scroll to topics list
      const topicsList = document.getElementById('dashboard-topics-list');
      if (topicsList) {
        setTimeout(() => topicsList.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    });
  }

  const mobGames = document.getElementById('mobile-nav-games');
  if (mobGames) {
    mobGames.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('games');
      updateMobileNavActive('mobile-nav-games');
    });
  }

  const mobMore = document.getElementById('mobile-nav-more');
  if (mobMore) {
    mobMore.addEventListener('click', (e) => {
      e.preventDefault();
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('sidebar-overlay');
      if (sidebar && overlay) {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }
\`

const helper = \`
export function updateMobileNavActive(activeId) {
  document.querySelectorAll('.mobile-nav-item').forEach(item => {
    item.classList.remove('active');
  });
  const activeEl = document.getElementById(activeId);
  if (activeEl) activeEl.classList.add('active');
}
\`

// We will find the end of initNavigation.
// Wait, we can just export updateMobileNavActive anywhere, and run the listeners in initNavigation.
navJs = navJs.replace(/export function switchView/, insertion + "\\n}\\n\\n" + helper + "\\n\\nexport function switchView");
// Wait, we need to remove the original '}' that closed initNavigation.
navJs = navJs.replace(/}\\s*export function switchView/, insertion + "\\n}\\n\\n" + helper + "\\n\\nexport function switchView");

fs.writeFileSync('src/navigation.js', navJs);
console.log("Updated navigation.js");
`);
