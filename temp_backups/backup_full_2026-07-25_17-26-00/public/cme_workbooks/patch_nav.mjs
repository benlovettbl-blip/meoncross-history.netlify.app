
import fs from 'fs';
let navJs = fs.readFileSync('src/navigation.js', 'utf8');

const insertion = `
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
`

const helper = `
export function updateMobileNavActive(activeId) {
  document.querySelectorAll('.mobile-nav-item').forEach(item => {
    item.classList.remove('active');
  });
  const activeEl = document.getElementById(activeId);
  if (activeEl) activeEl.classList.add('active');
}
`

// We will find the end of initNavigation.
// Wait, we can just export updateMobileNavActive anywhere, and run the listeners in initNavigation.
navJs = navJs.replace(/export function switchView/, insertion + "\n}\n\n" + helper + "\n\nexport function switchView");
// Wait, we need to remove the original '}' that closed initNavigation.
navJs = navJs.replace(/}\s*export function switchView/, insertion + "\n}\n\n" + helper + "\n\nexport function switchView");

fs.writeFileSync('src/navigation.js', navJs);
console.log("Updated navigation.js");
