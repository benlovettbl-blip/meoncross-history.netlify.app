/**
 * Layout and Event Binding Controller for Mr Lovett's History Hub Mega App
 */

import { getUnits } from './views.js';
import { state } from './state.js';
import { switchView } from './navigation.js';

export function bindEvents() {
  // Back button click handler
  const backBtn = document.getElementById('header-back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('dashboard');
    });
  }

  // Logo click handler
  const logoBtn = document.getElementById('sidebar-logo');
  if (logoBtn) {
    logoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('dashboard');
    });
  }

  // Bind Sidebar navigation items
  const navDashboard = document.getElementById('nav-dashboard');
  if (navDashboard) {
    navDashboard.addEventListener('click', () => switchView('dashboard'));
  }

  const navProfile = document.getElementById('nav-profile');
  if (navProfile) {
    navProfile.addEventListener('click', () => switchView('profile'));
  }

  // Bind Compact 4-Icon Mobile Bottom Navigation Bar (Home, Units, Quizzing, Profile)
  const mobNavHome = document.getElementById('mob-nav-home');
  if (mobNavHome) {
    mobNavHome.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('dashboard');
    });
  }

  const mobNavUnits = document.getElementById('mob-nav-units');
  if (mobNavUnits) {
    mobNavUnits.addEventListener('click', (e) => {
      e.preventDefault();
      const currentView =
        state.currentView ||
        (window.appStore && window.appStore.state && window.appStore.state.currentView);
      if (currentView === 'lessons') {
        // If already in lessons view, toggle sidebar drawer so pupil can easily select another unit/lesson
        const menuToggle = document.getElementById('sidebar-toggle-btn');
        if (menuToggle) menuToggle.click();
      } else if (state.selectedUnitId) {
        switchView('lessons', state.selectedUnitId);
      } else {
        switchView('dashboard');
        setTimeout(() => {
          const modulesGrid = document.querySelector('.modules-grid');
          if (modulesGrid) modulesGrid.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    });
  }

  const mobNavQuizzing = document.getElementById('mob-nav-quizzing');
  if (mobNavQuizzing) {
    mobNavQuizzing.addEventListener('click', (e) => {
      e.preventDefault();
      const unitId = state.selectedUnitId || 'great_war';
      switchView('interactive', unitId);
    });
  }

  const mobNavProfile = document.getElementById('mob-nav-profile');
  if (mobNavProfile) {
    mobNavProfile.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('profile');
    });
  }

  // Bind theme selector clicks (both sidebar dots and header popover)
  document.querySelectorAll('.theme-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const themeName = e.currentTarget.getAttribute('data-theme');
      state.theme = themeName;
      document.documentElement.setAttribute('data-theme', themeName);
      localStorage.setItem('history_theme', themeName);

      // Update active class
      document.querySelectorAll('.theme-btn').forEach((b) => b.classList.remove('active'));
      document
        .querySelectorAll(`.theme-btn[data-theme="${themeName}"]`)
        .forEach((b) => b.classList.add('active'));

      // Close the popover after selection and update label
      const popover = document.getElementById('theme-popover');
      if (popover) popover.style.display = 'none';
      const label = document.getElementById('theme-toggle-label');
      const names = { primary: 'History Hub', desert: 'Sand', space: 'Deep Space', coral: 'Coral' };
      if (label) label.textContent = names[themeName] || 'Theme';
    });
  });

  // Wire up the header palette toggle button
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themePopover = document.getElementById('theme-popover');
  if (themeToggleBtn && themePopover) {
    themeToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      themePopover.style.display = themePopover.style.display === 'none' ? 'block' : 'none';
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!themeToggleBtn.contains(e.target) && !themePopover.contains(e.target)) {
        themePopover.style.display = 'none';
      }
    });
    // Set initial label based on saved theme
    const savedTheme = localStorage.getItem('history_theme') || 'primary';
    const names = { primary: 'History Hub', desert: 'Sand', space: 'Deep Space', coral: 'Coral' };
    const label = document.getElementById('theme-toggle-label');
    if (label) label.textContent = names[savedTheme] || 'Theme';
  }

  // Mobile navigation drawer toggle
  const menuToggle = document.getElementById('sidebar-toggle-btn');
  const sidebar = document.getElementById('app-sidebar');
  if (menuToggle && sidebar) {
    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'sidebar-overlay';
      document.body.appendChild(overlay);
    }

    const toggleSidebar = () => {
      sidebar.classList.toggle('mobile-open');
      overlay.classList.toggle('active');
    };

    menuToggle.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    // Auto-close on mobile when a navigation item is clicked
    document
      .querySelectorAll('.nav-item, #mob-nav-home, #mob-nav-quizzing, #mob-nav-profile')
      .forEach((item) => {
        item.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            sidebar.classList.remove('mobile-open');
            overlay.classList.remove('active');
          }
        });
      });
  }

  // Render Sidebar Units
  const sidebarUnitsContainer = document.getElementById('sidebar-unit-links');
  if (sidebarUnitsContainer) {
    sidebarUnitsContainer.innerHTML = '';

    const units = getUnits();
    const getOrderedUnits = (orderArray) => {
      return units
        .filter((u) => u && u.id && orderArray.includes(u.id))
        .sort((a, b) => orderArray.indexOf(a.id) - orderArray.indexOf(b.id));
    };

    const underConstructionIds = ['second_world_war', 'the_shoah', 'cold_war', 'post_war_britain'];
    const year7Units = getOrderedUnits(['water_and_sanitation', 'medieval_england']);
    const year8Units = getOrderedUnits([
      'early_modern_world',
      'industrialisation_and_empire',
      'australia',
    ]);
    const year9Units = getOrderedUnits([
      'great_war',
      'great_war_part2',
      'the_shoah',
      'cold_war',
      'second_world_war',
      'post_war_britain',
    ]).filter((u) => !underConstructionIds.includes(u.id));
    const year10Units = getOrderedUnits(['cme_new', 'weimar_nazi_germany']);
    const year11Units = getOrderedUnits(['edexcel_medicine', 'eee']);
    const tripUnits = getOrderedUnits(['trip_ypres']);

    const renderAccordionGroup = (title, unitList, defaultOpen = false) => {
      if (unitList.length === 0) return;

      const header = document.createElement('div');
      header.innerHTML = `<span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.5); font-weight: 600; display: flex; align-items: center; justify-content: space-between;"><span style="flex-grow: 1;">${title}</span><i class="fa-solid fa-chevron-${defaultOpen ? 'up' : 'down'}" style="transition: transform 0.2s; font-size: 0.7rem;"></i></span>`;
      header.style.margin = '10px 16px 8px';
      header.style.cursor = 'pointer';

      const content = document.createElement('div');
      content.style.display = defaultOpen ? 'block' : 'none';
      content.style.transition = 'all 0.3s ease';

      header.addEventListener('click', () => {
        const isOpen = content.style.display === 'block';
        content.style.display = isOpen ? 'none' : 'block';
        const icon = header.querySelector('i');
        if (isOpen) {
          icon.classList.remove('fa-chevron-up');
          icon.classList.add('fa-chevron-down');
        } else {
          icon.classList.remove('fa-chevron-down');
          icon.classList.add('fa-chevron-up');
        }
      });

      sidebarUnitsContainer.appendChild(header);
      sidebarUnitsContainer.appendChild(content);

      unitList.forEach((unit) => {
        const link = document.createElement('div');
        link.className = 'nav-item';
        link.style.cursor = 'pointer';
        link.style.display = 'flex';
        link.style.alignItems = 'center';
        link.style.gap = '8px';
        link.style.padding = '8px 16px';
        link.style.borderRadius = '6px';
        link.style.margin = '0 8px 4px 8px';
        link.style.color = 'rgba(255,255,255,0.85)';

        link.addEventListener('mouseenter', () => {
          link.style.background = 'rgba(255,255,255,0.1)';
          link.style.color = '#fff';
        });
        link.addEventListener('mouseleave', () => {
          link.style.background = 'transparent';
          link.style.color = 'rgba(255,255,255,0.85)';
        });

        link.innerHTML = `<i class="fa-solid ${unit.id === 'great_war' || unit.id === 'great_war_part2' ? 'fa-helmet-safety' : 'fa-book'}" style="opacity: 0.7; width: 20px; text-align: center;"></i> <span style="font-size: 0.85rem; line-height: 1.2;">${unit.title || 'Untitled Unit'}</span>`;
        link.addEventListener('click', () => {
          if (window.launchSubApp) window.launchSubApp(unit.id);
        });
        content.appendChild(link);
      });
    };

    renderAccordionGroup('GCSE Battlefield Tour (Y10–11)', tripUnits, true);
    renderAccordionGroup('Year 7', year7Units, true);
    renderAccordionGroup('Year 8', year8Units, true);

    // Year 9: show accordion even when only coming-soon units exist
    const header9 = document.createElement('div');
    header9.innerHTML = `<span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.5); font-weight: 600; display: flex; align-items: center; justify-content: space-between;"><span style="flex-grow: 1;">Year 9</span><i class="fa-solid fa-chevron-down" style="transition: transform 0.2s; font-size: 0.7rem;"></i></span>`;
    header9.style.margin = '10px 16px 8px';
    header9.style.cursor = 'pointer';
    const content9 = document.createElement('div');
    content9.style.display = 'none';
    header9.addEventListener('click', () => {
      const isOpen = content9.style.display === 'block';
      content9.style.display = isOpen ? 'none' : 'block';
      const icon = header9.querySelector('i');
      icon.classList.toggle('fa-chevron-up', !isOpen);
      icon.classList.toggle('fa-chevron-down', isOpen);
    });
    if (year9Units.length > 0) {
      year9Units.forEach((unit) => {
        const link = document.createElement('div');
        link.className = 'nav-item';
        link.style.cssText =
          'cursor:pointer;display:flex;align-items:center;gap:8px;padding:8px 16px;border-radius:6px;margin:0 8px 4px 8px;color:rgba(255,255,255,0.85);';
        link.addEventListener('mouseenter', () => {
          link.style.background = 'rgba(255,255,255,0.1)';
          link.style.color = '#fff';
        });
        link.addEventListener('mouseleave', () => {
          link.style.background = 'transparent';
          link.style.color = 'rgba(255,255,255,0.85)';
        });
        link.innerHTML = `<i class="fa-solid fa-book" style="opacity: 0.7; width: 20px; text-align: center;"></i> <span style="font-size: 0.85rem; line-height: 1.2;">${unit.title || 'Untitled Unit'}</span>`;
        link.addEventListener('click', () => {
          if (window.launchSubApp) window.launchSubApp(unit.id);
        });
        content9.appendChild(link);
      });
    }
    // Coming-soon dimmed entries
    const comingSoon9 = [
      'KS3: The Shoah',
      'KS3: The Cold War',
      'KS3: The Second World War',
      'KS3: Rights, Protest & Post-War Britain',
    ];
    comingSoon9.forEach((name) => {
      const item = document.createElement('div');
      item.style.cssText =
        'display:flex;align-items:center;gap:8px;padding:6px 16px;border-radius:6px;margin:0 8px 2px 8px;color:rgba(255,255,255,0.3);font-size:0.8rem;cursor:default;';
      item.innerHTML = `<i class="fa-solid fa-hammer" style="width:20px;text-align:center;"></i> <span>${name} <em style="font-size:0.75em;">(coming soon)</em></span>`;
      content9.appendChild(item);
    });
    sidebarUnitsContainer.appendChild(header9);
    sidebarUnitsContainer.appendChild(content9);

    renderAccordionGroup('Year 10', year10Units, false);
    renderAccordionGroup('Year 11', year11Units, false);
  }
}
