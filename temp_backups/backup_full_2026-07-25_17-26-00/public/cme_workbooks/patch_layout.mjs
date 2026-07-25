import fs from 'fs';

let layoutJs = fs.readFileSync('src/layout.js', 'utf8');

const insertion = `
  // Mobile Bottom Navigation bindings
  const mobDash = document.getElementById('mobile-nav-dashboard');
  if (mobDash) {
    mobDash.addEventListener('click', (e) => {
      e.preventDefault();
      AudioEngine.play('click');
      switchView('dashboard');
      updateMobileNavActive('mobile-nav-dashboard');
    });
  }

  const mobTopics = document.getElementById('mobile-nav-topics');
  if (mobTopics) {
    mobTopics.addEventListener('click', (e) => {
      e.preventDefault();
      AudioEngine.play('click');
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
      AudioEngine.play('click');
      switchView('games');
      updateMobileNavActive('mobile-nav-games');
    });
  }

  const mobMore = document.getElementById('mobile-nav-more');
  if (mobMore) {
    mobMore.addEventListener('click', (e) => {
      e.preventDefault();
      AudioEngine.play('click');
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('sidebar-overlay');
      if (sidebar && overlay) {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }
} // Closes bindEvents

function updateMobileNavActive(activeId) {
  document.querySelectorAll('.mobile-nav-item').forEach(item => {
    item.classList.remove('active');
  });
  const activeEl = document.getElementById(activeId);
  if (activeEl) activeEl.classList.add('active');
}
`;

// Replace `} // Closes bindEvents` or whatever ends `bindEvents`
// We will look for the end of `bindEvents()`. The easiest way is to find `export function updateBrandBanner` and insert before it? No, `bindEvents` might close long before. Let's find `document.getElementById('header-brand-quote-container')` which is at the end of `bindEvents` in layout.js maybe?
// Let's just use regex to replace the last brace of bindEvents or append it inside.
// Let's check what's after `bindEvents`.
