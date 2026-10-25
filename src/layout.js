/**
 * Layout and Event Binding Controller for GCSE History Study & Revision Portal
 */

import { getUnits } from './views.js';
import { state } from './state.js';
import { switchView } from './navigation.js';
import { renderSidebarVideoBadgeHTML } from './engine/video_utils.js';

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

  // Header search bar trigger
  const headerSearchBar = document.getElementById('header-search-bar');
  if (headerSearchBar) {
    headerSearchBar.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof window.openKeywordSearch === 'function') {
        window.openKeywordSearch();
      }
    });
    headerSearchBar.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (typeof window.openKeywordSearch === 'function') {
          window.openKeywordSearch();
        }
      }
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

  // SEN / Dyslexia Mode Toggle Button in Header
  const btnDyslexia = document.getElementById('btn-dyslexia');
  if (btnDyslexia) {
    // Restore initial state from localStorage
    const savedSen = localStorage.getItem('sen_mode') === 'true';
    if (savedSen) {
      document.body.classList.add('sen-mode');
      btnDyslexia.classList.add('active');
      btnDyslexia.title = 'SEN / Dyslexia Mode: ACTIVE (Click to return to Standard Mode)';
    }

    btnDyslexia.addEventListener('click', () => {
      document.body.classList.toggle('sen-mode');
      const isSen = document.body.classList.contains('sen-mode');
      localStorage.setItem('sen_mode', isSen ? 'true' : 'false');
      btnDyslexia.classList.toggle('active', isSen);
      btnDyslexia.title = isSen
        ? 'SEN / Dyslexia Mode: ACTIVE (Click to return to Standard Mode)'
        : 'Toggle SEN / Dyslexia Mode (Warm cream background & high-legibility font)';
    });
  }

  // Reading Overlay Controller (Visual Stress, Irlen Syndrome & Dyslexia)
  const overlayBtn = document.getElementById('btn-overlay-toggle');
  const overlayPopover = document.getElementById('overlay-popover');
  const overlayLabel = document.getElementById('overlay-toggle-label');

  const OVERLAYS = {
    none: { id: 'none', label: 'Overlay: Off', class: '' },
    blue: { id: 'blue', label: 'Blue Overlay 🟦', class: 'overlay-blue' },
    yellow: { id: 'yellow', label: 'Yellow Overlay 🟨', class: 'overlay-yellow' },
    green: { id: 'green', label: 'Mint Overlay 🟩', class: 'overlay-green' },
    rose: { id: 'rose', label: 'Peach Overlay 🟧', class: 'overlay-rose' },
  };

  function applyReadingOverlay(overlayId, persist = true) {
    const config = OVERLAYS[overlayId] || OVERLAYS.none;

    // Clear all previous overlay classes on body and documentElement
    Object.values(OVERLAYS).forEach((o) => {
      if (o.class) {
        document.body.classList.remove(o.class);
        document.documentElement.classList.remove(o.class);
      }
    });

    if (config.class) {
      document.body.classList.add(config.class);
      document.documentElement.classList.add(config.class);
    }

    if (overlayBtn) {
      overlayBtn.classList.toggle('active', overlayId !== 'none');
      if (overlayId === 'blue') {
        overlayBtn.style.borderColor = '#0284c7';
        overlayBtn.style.color = '#0369a1';
        overlayBtn.style.background = '#e0f2fe';
      } else if (overlayId === 'yellow') {
        overlayBtn.style.borderColor = '#ca8a04';
        overlayBtn.style.color = '#854d0e';
        overlayBtn.style.background = '#fef9c3';
      } else if (overlayId === 'green') {
        overlayBtn.style.borderColor = '#16a34a';
        overlayBtn.style.color = '#166534';
        overlayBtn.style.background = '#dcfce7';
      } else if (overlayId === 'rose') {
        overlayBtn.style.borderColor = '#e11d48';
        overlayBtn.style.color = '#9f1239';
        overlayBtn.style.background = '#ffe4e6';
      } else {
        overlayBtn.style.borderColor = '';
        overlayBtn.style.color = '';
        overlayBtn.style.background = '';
      }
    }

    if (overlayLabel) {
      overlayLabel.textContent = config.label;
    }

    // Highlight active option in popover
    document.querySelectorAll('.overlay-option-btn').forEach((btn) => {
      const isSelected = btn.getAttribute('data-overlay') === overlayId;
      btn.classList.toggle('selected', isSelected);
    });

    if (persist) {
      localStorage.setItem('reading_overlay', overlayId);
    }
  }

  window.setReadingOverlay = applyReadingOverlay;

  // Restore saved overlay on boot
  const savedOverlay = localStorage.getItem('reading_overlay') || 'none';
  applyReadingOverlay(savedOverlay, false);

  if (overlayBtn && overlayPopover) {
    // Open/close popover
    overlayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = overlayPopover.style.display === 'block';
      overlayPopover.style.display = isVisible ? 'none' : 'block';
      const themePopover = document.getElementById('theme-popover');
      if (themePopover) themePopover.style.display = 'none';
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!overlayBtn.contains(e.target) && !overlayPopover.contains(e.target)) {
        overlayPopover.style.display = 'none';
      }
    });

    // Option buttons inside popover
    document.querySelectorAll('.overlay-option-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const overlayId = e.currentTarget.getAttribute('data-overlay');
        applyReadingOverlay(overlayId, true);
        overlayPopover.style.display = 'none';
      });
    });
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

    const closeBtn = document.getElementById('sidebar-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('active');
      });
    }

    // Auto-close on mobile when a navigation item or close button is clicked
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
  const sidebarUnitsHeader = document.getElementById('sidebar-units-header');

  if (sidebarUnitsContainer) {
    sidebarUnitsContainer.innerHTML = '';

    const urlParams =
      typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const isLocked =
      urlParams &&
      (urlParams.get('locked') === 'true' ||
        urlParams.get('mode') === 'pupil' ||
        urlParams.get('safeguard') === 'true');
    const isKs2Active =
      (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('hh_portal') === 'ks2') ||
      (urlParams && urlParams.get('portal') === 'ks2') ||
      (urlParams && urlParams.get('unit') && urlParams.get('unit').startsWith('ks2_'));

    // In Safeguard Lockdown Mode (e.g. KS2 primary pupils or teacher-locked sessions):
    // Completely hide cross-unit links and accordions so pupils cannot escape their designated unit.
    if (isLocked) {
      sidebarUnitsContainer.style.display = 'none';
      if (sidebarUnitsHeader) sidebarUnitsHeader.style.display = 'none';
      if (navProfile) navProfile.style.display = 'none';
      return;
    }

    if (sidebarUnitsHeader) {
      sidebarUnitsHeader.style.display = 'block';
    }
    sidebarUnitsContainer.style.display = 'flex';
    if (navProfile) navProfile.style.display = 'flex';

    const units = getUnits();
    const getOrderedUnits = (orderArray) => {
      return units
        .filter((u) => u && u.id && orderArray.includes(u.id))
        .sort((a, b) => orderArray.indexOf(a.id) - orderArray.indexOf(b.id));
    };

    const renderAccordionGroup = (title, unitList, defaultOpen = false) => {
      if (unitList.length === 0) return;

      const header = document.createElement('div');
      header.innerHTML = `<span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.5); font-weight: 600; display: flex; align-items: center; justify-content: space-between;"><span style="flex-grow: 1;">${title}</span><i class="fa-solid fa-chevron-${defaultOpen ? 'up' : 'down'}" style="transition: transform 0.2s; font-size: 0.7rem;"></i></span>`;
      header.style.margin = '10px 16px 8px';
      header.style.cursor = 'pointer';

      const content = document.createElement('div');
      content.className = 'accordion-content';
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
        link.setAttribute('data-unit-id', unit.id);
        link.style.cursor = 'pointer';
        link.style.display = 'flex';
        link.style.alignItems = 'center';
        link.style.gap = '8px';
        link.style.padding = '8px 16px';
        link.style.borderRadius = '6px';
        link.style.margin = '0 8px 4px 8px';
        link.style.color = 'rgba(255,255,255,0.85)';

        link.addEventListener('mouseenter', () => {
          if (!link.classList.contains('active-unit-tree-item')) {
            link.style.background = 'rgba(255,255,255,0.1)';
            link.style.color = '#fff';
          }
        });
        link.addEventListener('mouseleave', () => {
          if (!link.classList.contains('active-unit-tree-item')) {
            link.style.background = 'transparent';
            link.style.color = 'rgba(255,255,255,0.85)';
          }
        });

        link.innerHTML = `<i class="fa-solid ${unit.id === 'great_war' || unit.id === 'great_war_part2' ? 'fa-helmet-safety' : 'fa-book'}" style="opacity: 0.7; width: 20px; text-align: center;"></i> <span style="font-size: 0.85rem; line-height: 1.2;">${unit.title || 'Untitled Unit'}</span>`;
        link.addEventListener('click', () => {
          if (window.launchSubApp) window.launchSubApp(unit.id);
        });
        content.appendChild(link);
      });
    };

    // If user is in KS2 Junior Portal mode, ONLY show Key Stage 2 units
    if (isKs2Active) {
      if (sidebarUnitsHeader) {
        const titleSpan = sidebarUnitsHeader.querySelector('span');
        if (titleSpan) titleSpan.textContent = 'Key Stage 2 Units';
      }
      const ks2Units = getOrderedUnits(['ks2_ww2']);
      renderAccordionGroup('Key Stage 2 (Primary)', ks2Units, true);
      return;
    }

    if (sidebarUnitsHeader) {
      const titleSpan = sidebarUnitsHeader.querySelector('span');
      if (titleSpan) titleSpan.textContent = 'Units of Study';
    }

    const underConstructionIds = [];
    const year7Units = getOrderedUnits(['water_and_sanitation', 'medieval_england']);
    const year8Units = getOrderedUnits([
      'monarchy_religion_power',
      'first_british_empire',
      'industrialisation_and_empire',
      'second_british_empire',
      'australia',
    ]);
    const year9Units = getOrderedUnits([
      'great_war',
      'great_war_part2',
      'the_shoah',
      'cold_war',
      'post_war_britain',
    ]);
    const year10Units = getOrderedUnits(['cme_new', 'weimar_nazi_germany']);
    const year11Units = getOrderedUnits(['edexcel_medicine', 'eee', 'usa']);
    const tripUnits = getOrderedUnits(['trip_ypres']);

    renderAccordionGroup('GCSE Battlefield Tour (Y10–11)', tripUnits, false);
    renderAccordionGroup('Year 7', year7Units, false);
    renderAccordionGroup('Year 8', year8Units, false);

    // Year 9: show accordion even when only coming-soon units exist
    const header9 = document.createElement('div');
    header9.innerHTML = `<span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.5); font-weight: 600; display: flex; align-items: center; justify-content: space-between;"><span style="flex-grow: 1;">Year 9</span><i class="fa-solid fa-chevron-down" style="transition: transform 0.2s; font-size: 0.7rem;"></i></span>`;
    header9.style.margin = '10px 16px 8px';
    header9.style.cursor = 'pointer';
    const content9 = document.createElement('div');
    content9.className = 'accordion-content';
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
        link.setAttribute('data-unit-id', unit.id);
        link.style.cssText =
          'cursor:pointer;display:flex;align-items:center;gap:8px;padding:8px 16px;border-radius:6px;margin:0 8px 4px 8px;color:rgba(255,255,255,0.85);';
        link.addEventListener('mouseenter', () => {
          if (!link.classList.contains('active-unit-tree-item')) {
            link.style.background = 'rgba(255,255,255,0.1)';
            link.style.color = '#fff';
          }
        });
        link.addEventListener('mouseleave', () => {
          if (!link.classList.contains('active-unit-tree-item')) {
            link.style.background = 'transparent';
            link.style.color = 'rgba(255,255,255,0.85)';
          }
        });
        link.innerHTML = `<i class="fa-solid fa-book" style="opacity: 0.7; width: 20px; text-align: center;"></i> <span style="font-size: 0.85rem; line-height: 1.2;">${unit.title || 'Untitled Unit'}</span>`;
        link.addEventListener('click', () => {
          if (window.launchSubApp) window.launchSubApp(unit.id);
        });
        content9.appendChild(link);
      });
    }

    sidebarUnitsContainer.appendChild(header9);
    sidebarUnitsContainer.appendChild(content9);

    renderAccordionGroup('Year 10 (GCSE)', year10Units, false);
    renderAccordionGroup('Year 11 (GCSE)', year11Units, false);
  }
}

// Active Unit Highlighting & Auto-Expansion in Lower Sidebar
window.highlightActiveSidebarUnit = function (unitId, activeLessonIndex = null) {
  // Remove any legacy lesson trees in unit catalog to prevent duplication with top workspace
  document
    .querySelectorAll('#sidebar-unit-links .sidebar-lessons-tree')
    .forEach((el) => el.remove());

  if (!unitId) {
    document.querySelectorAll('#sidebar-unit-links .nav-item').forEach((el) => {
      el.classList.remove('active-unit-tree-item');
    });
    return;
  }

  let targetId = unitId;
  if (targetId === 'gcse_middle_east_1945_1995_new') targetId = 'cme_new';
  if (targetId === 'gcse_usa_1954_1975') targetId = 'usa';
  if (targetId === 'gcse_elizabethan_england') targetId = 'eee';
  if (targetId === 'great_war_v2') targetId = 'great_war';

  document.querySelectorAll('#sidebar-unit-links .nav-item').forEach((el) => {
    const elId = el.getAttribute('data-unit-id');
    if (elId === targetId) {
      el.classList.add('active-unit-tree-item');
      const parentAccordion = el.closest('.accordion-content');
      if (parentAccordion && parentAccordion.style.display !== 'block') {
        parentAccordion.style.display = 'block';
        const parentHeader = parentAccordion.previousElementSibling;
        if (parentHeader) {
          const icon = parentHeader.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
          }
        }
      }
    } else {
      el.classList.remove('active-unit-tree-item');
    }
  });

  if (typeof window.highlightActiveSidebarLesson === 'function' && activeLessonIndex !== null) {
    window.highlightActiveSidebarLesson(activeLessonIndex);
  }
};

window.highlightActiveSidebarLesson = function (lessonIndex) {
  document.querySelectorAll('.sidebar-lesson-item').forEach((el) => {
    const idx = parseInt(el.getAttribute('data-lesson-index'), 10);
    if (idx === lessonIndex) {
      el.classList.add('active');
      try {
        el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      } catch (e) {}
    } else {
      el.classList.remove('active');
    }
  });
};
