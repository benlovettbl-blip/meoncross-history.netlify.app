/**
 * Keyword & Curriculum Search Engine
 * Instant in-memory search across 800+ vocabulary terms, definitions,
 * enquiry questions, and syllabus lessons.
 */

let searchIndex = [];
let isInitialized = false;
let activeFilter = 'all'; // 'all' | 'vocab' | 'lesson'
let currentResults = [];
let selectedResultIndex = -1;

/**
 * Builds the searchable index from the database in client memory.
 */
export function buildKeywordSearchIndex(db) {
  const index = [];
  if (!db || typeof db !== 'object') return index;

  const getCleanUnitTitle = (unitId, unitData) => {
    if (unitData && unitData.title) {
      return unitData.title.replace(/^(?:Paper \d+:?|KS3:?|GCSE[^:]*:?)\s*/i, '').trim();
    }
    const titles = {
      water_and_sanitation: 'Water and Sanitation Through Time',
      medieval_england: 'Medieval England & The Norman Conquest',
      early_modern_world: 'The Early Modern World & Renaissance',
      monarchy_religion_power: 'Monarchy, Religion & Power (1509–1745)',
      first_british_empire: 'The First British Empire & Atlantic World',
      industrialisation_and_empire: 'The Industrial Revolution (1750–1900)',
      second_british_empire: 'The Second British Empire & Imperialism',
      australia: 'Claiming Australia & The Pacific',
      great_war: 'Causes of the Great War (1890–1914)',
      great_war_part2: 'The Great War (1914–1919)',
      the_shoah: 'The Holocaust & Nazi Persecution',
      cold_war: 'The Cold War & Global Flashpoints',
      post_war_britain: 'Post-War Britain (1945–Present)',
      edexcel_medicine: 'Medicine Through Time (c.1250–present)',
      eee: 'Early Elizabethan England (1558–1588)',
      weimar_nazi_germany: 'Weimar & Nazi Germany (1918–1939)',
      cme_new: 'Conflict in the Middle East (1945–1995)',
      usa: 'Conflict at Home & Abroad: USA (1954–1975)',
      trip_ypres: 'Ypres & Western Front Battlefields Tour',
    };
    return titles[unitId] || unitId.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const getYearStageBadge = (unitId) => {
    if (['water_and_sanitation', 'medieval_england'].includes(unitId)) return 'Year 7';
    if (
      [
        'early_modern_world',
        'monarchy_religion_power',
        'first_british_empire',
        'industrialisation_and_empire',
        'second_british_empire',
        'australia',
      ].includes(unitId)
    )
      return 'Year 8';
    if (
      ['great_war', 'great_war_part2', 'the_shoah', 'cold_war', 'post_war_britain'].includes(unitId)
    )
      return 'Year 9';
    if (['edexcel_medicine', 'eee', 'weimar_nazi_germany', 'cme_new', 'usa'].includes(unitId))
      return 'GCSE';
    if (unitId === 'trip_ypres') return 'Fieldwork';
    return 'Curriculum';
  };

  for (const [unitId, unitObj] of Object.entries(db)) {
    const unitData = unitObj?.data || {};
    const unitTitle = getCleanUnitTitle(unitId, unitData);
    const stageBadge = getYearStageBadge(unitId);
    const lessons = unitData.lessons || unitData.subtopics || [];

    lessons.forEach((l, idx) => {
      const lessonTitle = (l.title || `Lesson ${idx + 1}`).trim();
      const enquiry = (l.enquiry || '').trim();

      // 1. Index Vocabulary items
      const vocabList = l.vocab || l.vocabulary || [];
      vocabList.forEach((v) => {
        const term = (v.term || '').trim();
        const def = (v.definition || v.def || v.desc || '').trim();
        if (term) {
          index.push({
            type: 'vocab',
            term,
            definition: def,
            unitId,
            unitTitle,
            stageBadge,
            lessonIndex: idx,
            lessonTitle,
            enquiry,
          });
        }
      });

      // 2. Index Lesson title & enquiry
      index.push({
        type: 'lesson',
        title: lessonTitle,
        enquiry: enquiry,
        unitId,
        unitTitle,
        stageBadge,
        lessonIndex: idx,
        lessonTitle,
        definition: enquiry ? `Enquiry: ${enquiry}` : '',
      });
    });
  }

  return index;
}

/**
 * Searches the index and returns ranked, deduplicated results.
 */
export function searchCurriculum(query, index = searchIndex, filter = activeFilter) {
  if (!query || !query.trim()) return [];
  const q = query.toLowerCase().trim();
  const qTokens = q.split(/\s+/).filter(Boolean);

  const scored = [];

  for (const item of index) {
    if (filter === 'vocab' && item.type !== 'vocab') continue;
    if (filter === 'lesson' && item.type !== 'lesson') continue;

    let score = 0;
    const termOrTitle = (item.term || item.title || '').toLowerCase();
    const defOrEnquiry = (item.definition || item.enquiry || '').toLowerCase();

    // 1. Exact term or title match
    if (termOrTitle === q) {
      score += 150;
    } else if (termOrTitle.startsWith(q)) {
      score += 100;
    } else if (termOrTitle.includes(q)) {
      score += 70;
    } else if (qTokens.length > 1 && qTokens.every((tok) => termOrTitle.includes(tok))) {
      score += 55;
    }

    // 2. Definition or enquiry match
    if (defOrEnquiry.includes(q)) {
      score += item.type === 'vocab' ? 45 : 30;
    } else if (qTokens.length > 1 && qTokens.every((tok) => defOrEnquiry.includes(tok))) {
      score += 25;
    }

    // Only include items that actually matched the query!
    if (score > 0) {
      // Subtle boost for key vocabulary
      if (item.type === 'vocab') {
        score += 10;
      }
      scored.push({ item, score });
    }
  }

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  // Deduplicate identical items
  const seen = new Set();
  const results = [];
  for (const entry of scored) {
    const it = entry.item;
    const key = `${it.type}:${it.unitId}:${it.lessonIndex}:${it.term || it.title}`;
    if (!seen.has(key)) {
      seen.add(key);
      results.push(it);
    }
    if (results.length >= 35) break;
  }

  return results;
}

/**
 * Escapes regex special characters.
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Highlights matching tokens within text safely.
 */
function highlightMatch(text, query) {
  if (!text) return '';
  if (!query || !query.trim()) return escapeHtml(text);

  const tokens = query
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => escapeRegex(t));
  if (tokens.length === 0) return escapeHtml(text);

  const pattern = new RegExp(`(${tokens.join('|')})`, 'gi');
  const parts = text.split(pattern);

  return parts
    .map((part) => {
      if (tokens.some((t) => new RegExp(`^${t}$`, 'i').test(part))) {
        return `<mark class="search-match-highlight">${escapeHtml(part)}</mark>`;
      }
      return escapeHtml(part);
    })
    .join('');
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Injects the search modal HTML into the DOM if not already present.
 */
function ensureModalDOM() {
  if (document.getElementById('keyword-search-modal')) return;

  const modalHtml = `
    <div id="keyword-search-modal" class="search-modal-backdrop" style="display: none;" role="dialog" aria-modal="true" aria-labelledby="keyword-search-title">
      <div class="search-modal-window">
        <!-- Search Header -->
        <div class="search-modal-header">
          <i class="fa-solid fa-magnifying-glass search-modal-icon"></i>
          <input 
            type="text" 
            id="keyword-search-input" 
            class="search-modal-input" 
            placeholder="Search keywords, definitions, or lessons (e.g. 'miasma', 'reparations', 'cholera')..." 
            autocomplete="off" 
            spellcheck="false"
            aria-label="Search curriculum keywords and lessons"
          />
          <button type="button" id="keyword-search-clear-btn" class="search-modal-clear-btn" aria-label="Clear search query" style="display: none;">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <button type="button" id="keyword-search-close-btn" class="search-modal-close-btn" aria-label="Close search modal">
            <kbd>ESC</kbd>
          </button>
        </div>

        <!-- Filter Chips Bar -->
        <div class="search-modal-filters" role="tablist">
          <button type="button" class="search-filter-chip active" data-filter="all">
            <i class="fa-solid fa-layer-group"></i> All Results <span class="search-filter-count" id="count-all"></span>
          </button>
          <button type="button" class="search-filter-chip" data-filter="vocab">
            <i class="fa-solid fa-spell-check"></i> Key Terms &amp; Vocab <span class="search-filter-count" id="count-vocab"></span>
          </button>
          <button type="button" class="search-filter-chip" data-filter="lesson">
            <i class="fa-solid fa-book-open"></i> Enquiry Lessons <span class="search-filter-count" id="count-lesson"></span>
          </button>
        </div>

        <!-- Results / Suggestions Container -->
        <div id="keyword-search-results" class="search-modal-results">
          <!-- Rendered dynamically -->
        </div>

        <!-- Footer Shortcuts -->
        <div class="search-modal-footer">
          <div class="search-footer-shortcuts">
            <span class="search-shortcut-item"><kbd>↑</kbd><kbd>↓</kbd> to navigate</span>
            <span class="search-shortcut-item"><kbd>↵</kbd> to select</span>
            <span class="search-shortcut-item"><kbd>Esc</kbd> to close</span>
          </div>
          <span class="search-footer-brand">The History Revision Hub</span>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  // Bind modal-level events
  const modal = document.getElementById('keyword-search-modal');
  const input = document.getElementById('keyword-search-input');
  const clearBtn = document.getElementById('keyword-search-clear-btn');
  const closeBtn = document.getElementById('keyword-search-close-btn');
  const resultsContainer = document.getElementById('keyword-search-results');

  // Backdrop click to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeKeywordSearch();
    }
  });

  // Close button
  closeBtn.addEventListener('click', () => closeKeywordSearch());

  // Clear query button
  clearBtn.addEventListener('click', () => {
    input.value = '';
    input.focus();
    renderSearchResults('');
  });

  // Filter chips click
  modal.querySelectorAll('.search-filter-chip').forEach((chip) => {
    chip.addEventListener('click', (e) => {
      modal.querySelectorAll('.search-filter-chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.getAttribute('data-filter') || 'all';
      renderSearchResults(input.value);
    });
  });

  // Input event
  input.addEventListener('input', () => {
    renderSearchResults(input.value);
  });

  // Keyboard navigation within modal
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeKeywordSearch();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      moveSelection(1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      moveSelection(-1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedResultIndex >= 0 && selectedResultIndex < currentResults.length) {
        selectResult(currentResults[selectedResultIndex]);
      } else if (currentResults.length > 0) {
        selectResult(currentResults[0]);
      }
    }
  });

  // Delegate click on result item
  resultsContainer.addEventListener('click', (e) => {
    const itemEl = e.target.closest('.search-result-item');
    if (itemEl) {
      const idx = parseInt(itemEl.getAttribute('data-result-index'), 10);
      if (!isNaN(idx) && currentResults[idx]) {
        selectResult(currentResults[idx]);
      }
    }

    // Quick tag clicks from the default discovery state
    const quickTag = e.target.closest('.search-quick-tag');
    if (quickTag) {
      const term = quickTag.getAttribute('data-term');
      if (term) {
        input.value = term;
        input.focus();
        renderSearchResults(term);
      }
    }
  });
}

/**
 * Moves keyboard selection up or down in the results list.
 */
function moveSelection(direction) {
  const items = document.querySelectorAll('.search-result-item');
  if (items.length === 0) return;

  selectedResultIndex += direction;
  if (selectedResultIndex < 0) selectedResultIndex = items.length - 1;
  if (selectedResultIndex >= items.length) selectedResultIndex = 0;

  items.forEach((el, idx) => {
    if (idx === selectedResultIndex) {
      el.classList.add('selected');
      el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    } else {
      el.classList.remove('selected');
    }
  });
}

/**
 * Renders the results or discovery recommendations.
 */
function renderSearchResults(query = '') {
  const container = document.getElementById('keyword-search-results');
  const clearBtn = document.getElementById('keyword-search-clear-btn');
  if (!container) return;

  const trimmed = (query || '').trim();
  if (clearBtn) {
    clearBtn.style.display = trimmed ? 'flex' : 'none';
  }

  // If query is empty, show curated popular suggestions & topics
  if (!trimmed) {
    selectedResultIndex = -1;
    currentResults = [];
    container.innerHTML = getDiscoverySuggestionsHTML();
    return;
  }

  const results = searchCurriculum(trimmed, searchIndex, activeFilter);
  currentResults = results;
  selectedResultIndex = results.length > 0 ? 0 : -1;

  if (results.length === 0) {
    container.innerHTML = `
      <div class="search-empty-state">
        <div class="search-empty-icon">
          <i class="fa-solid fa-book-open-reader"></i>
        </div>
        <div class="search-empty-title">No matches found for "${escapeHtml(trimmed)}"</div>
        <div class="search-empty-hint">
          Try searching for key terms like <strong>miasma</strong>, <strong>reparations</strong>, <strong>diktat</strong>, <strong>cholera</strong>, or <strong>Versailles</strong>.
        </div>
      </div>
    `;
    return;
  }

  // Group into Vocab vs Lesson if viewing 'all'
  const vocabItems = results.filter((r) => r.type === 'vocab');
  const lessonItems = results.filter((r) => r.type === 'lesson');

  let html = '';

  if (activeFilter === 'all') {
    if (vocabItems.length > 0) {
      html += `
        <div class="search-results-group">
          <div class="search-group-header">
            <span><i class="fa-solid fa-spell-check"></i> Key Terms &amp; Definitions</span>
            <span class="search-group-count">${vocabItems.length} match${vocabItems.length > 1 ? 'es' : ''}</span>
          </div>
          <div class="search-group-list">
            ${vocabItems.map((item) => renderResultItemHTML(item, results.indexOf(item), trimmed)).join('')}
          </div>
        </div>
      `;
    }

    if (lessonItems.length > 0) {
      html += `
        <div class="search-results-group">
          <div class="search-group-header">
            <span><i class="fa-solid fa-book-open"></i> Enquiry Lessons</span>
            <span class="search-group-count">${lessonItems.length} match${lessonItems.length > 1 ? 'es' : ''}</span>
          </div>
          <div class="search-group-list">
            ${lessonItems.map((item) => renderResultItemHTML(item, results.indexOf(item), trimmed)).join('')}
          </div>
        </div>
      `;
    }
  } else {
    html = `
      <div class="search-results-group">
        <div class="search-group-list">
          ${results.map((item, idx) => renderResultItemHTML(item, idx, trimmed)).join('')}
        </div>
      </div>
    `;
  }

  container.innerHTML = html;

  // Highlight first item as selected by default
  const firstItem = container.querySelector('.search-result-item');
  if (firstItem) {
    firstItem.classList.add('selected');
  }
}

/**
 * Generates the HTML for an individual search result card.
 */
function renderResultItemHTML(item, globalIndex, query) {
  const isVocab = item.type === 'vocab';
  const displayTitle = isVocab ? item.term : item.title;
  const highlightedTitle = highlightMatch(displayTitle, query);
  const snippet = isVocab ? item.definition : item.enquiry || item.definition;
  const highlightedSnippet = snippet ? highlightMatch(snippet, query) : '';

  const stageClass = item.stageBadge
    ? item.stageBadge.toLowerCase().replace(/\s+/g, '')
    : 'curriculum';

  return `
    <div class="search-result-item ${isVocab ? 'is-vocab' : 'is-lesson'}" data-result-index="${globalIndex}" role="option" tabindex="0">
      <div class="search-result-icon">
        <i class="fa-solid ${isVocab ? 'fa-key' : 'fa-graduation-cap'}"></i>
      </div>
      <div class="search-result-body">
        <div class="search-result-header">
          <div class="search-result-title">${highlightedTitle}</div>
          <div class="search-result-badges">
            <span class="search-stage-pill ${stageClass}">${escapeHtml(item.stageBadge || 'Curriculum')}</span>
            <span class="search-unit-pill" title="${escapeHtml(item.unitTitle)}">${escapeHtml(item.unitTitle)}</span>
            <span class="search-lesson-pill">Lesson ${item.lessonIndex + 1}</span>
          </div>
        </div>
        ${
          highlightedSnippet
            ? `<div class="search-result-snippet">${isVocab ? '<strong>Definition:</strong> ' : ''}${highlightedSnippet}</div>`
            : ''
        }
      </div>
      <div class="search-result-action" title="Jump straight to this lesson">
        <span>Jump to Lesson</span>
        <i class="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  `;
}

/**
 * Default state: Helpful discovery suggestions across Key Stages.
 */
function getDiscoverySuggestionsHTML() {
  const popularTerms = [
    { term: 'Miasma Theory', stage: 'Year 7 / 8' },
    { term: 'Reparations', stage: 'Year 9 / GCSE' },
    { term: 'Diktat', stage: 'GCSE Germany' },
    { term: 'Botany Bay', stage: 'Year 8 Australia' },
    { term: 'Vesalius', stage: 'GCSE Medicine' },
    { term: 'Penicillin', stage: 'GCSE Medicine' },
    { term: 'Treaty of Versailles', stage: 'Year 9 Great War' },
    { term: 'Cholera', stage: 'Year 7 / GCSE' },
    { term: 'Black Death', stage: 'Year 7 Sanitation' },
    { term: 'Appeasement', stage: 'Year 9 Inter-War' },
    { term: 'Suffragettes', stage: 'Year 9 Democracy' },
    { term: 'Enclosure', stage: 'Year 8 Industrial' },
  ];

  return `
    <div class="search-discovery-box">
      <div class="search-discovery-title">
        <i class="fa-solid fa-compass"></i> Popular Keywords &amp; Quick Lookups
      </div>
      <p class="search-discovery-sub">
        Click any keyword below or start typing to search across 800+ glossary definitions and lesson enquiries.
      </p>
      <div class="search-quick-tags-grid">
        ${popularTerms
          .map(
            (pt) => `
          <button type="button" class="search-quick-tag" data-term="${escapeHtml(pt.term)}">
            <i class="fa-solid fa-magnifying-glass-arrow-right"></i>
            <span class="quick-tag-term">${escapeHtml(pt.term)}</span>
            <span class="quick-tag-stage">${escapeHtml(pt.stage)}</span>
          </button>
        `,
          )
          .join('')}
      </div>
      <div class="search-discovery-tip">
        <i class="fa-solid fa-lightbulb"></i>
        <span><strong>Pro-Tip:</strong> Press <kbd>Ctrl</kbd> + <kbd>K</kbd> anywhere in the app to open this search instantly.</span>
      </div>
    </div>
  `;
}

/**
 * Handles selecting a search result and navigating to it.
 */
export function selectResult(item) {
  if (!item) return;

  closeKeywordSearch();

  // If it's a vocabulary term, cache it for auto-scrolling & highlighting in the lesson
  if (item.type === 'vocab' && item.term) {
    try {
      sessionStorage.setItem('hh_highlight_keyword', item.term);
    } catch (e) {}
  }

  // Navigate to unit and specific lesson
  if (typeof window.switchView === 'function') {
    window.switchView('lessons', item.unitId, false, {
      lessonIndex: item.lessonIndex,
    });
  }

  // Trigger smooth scroll and highlighting in the lesson
  if (item.type === 'vocab' && item.term) {
    highlightTargetKeywordInLesson(item.term);
  }
}

/**
 * Scrolls to and highlights the target keyword in the lesson DOM.
 */
export function highlightTargetKeywordInLesson(term) {
  if (!term) return;
  const safeTerm = term.toLowerCase().trim();

  // Allow lesson renderer DOM mounting time
  setTimeout(() => {
    // 1. Check for matching term button in the Key Vocabulary practice widget
    const termBtns = Array.from(document.querySelectorAll('.match-term-btn'));
    const matchedBtn = termBtns.find((b) => b.textContent.toLowerCase().trim().includes(safeTerm));
    if (matchedBtn) {
      const details = matchedBtn.closest('details');
      if (details) details.open = true;
      matchedBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      matchedBtn.classList.add('keyword-pulse-glow');
      setTimeout(() => matchedBtn.classList.remove('keyword-pulse-glow'), 4000);
      return;
    }

    // 2. Check for highlighted .vocab-word or .vocab-lens-term in narrative text
    const vocabWords = Array.from(document.querySelectorAll('.vocab-word, .vocab-lens-term'));
    const matchedWord = vocabWords.find((w) =>
      w.textContent.toLowerCase().trim().includes(safeTerm),
    );
    if (matchedWord) {
      matchedWord.scrollIntoView({ behavior: 'smooth', block: 'center' });
      matchedWord.classList.add('keyword-pulse-glow');
      setTimeout(() => matchedWord.classList.remove('keyword-pulse-glow'), 4000);
      return;
    }

    // 3. Fallback: Search text nodes in #content-area
    const contentArea = document.getElementById('content-area');
    if (contentArea) {
      const walker = document.createTreeWalker(contentArea, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        if (node.nodeValue && node.nodeValue.toLowerCase().includes(safeTerm)) {
          const parent = node.parentElement;
          if (
            parent &&
            !['SCRIPT', 'STYLE', 'BUTTON'].includes(parent.tagName) &&
            parent.offsetHeight > 0
          ) {
            parent.scrollIntoView({ behavior: 'smooth', block: 'center' });
            parent.classList.add('keyword-pulse-glow');
            setTimeout(() => parent.classList.remove('keyword-pulse-glow'), 4000);
            return;
          }
        }
      }
    }
  }, 400);
}

/**
 * Opens the keyword search modal with an optional initial query.
 */
export function openKeywordSearch(initialQuery = '') {
  ensureModalDOM();
  const modal = document.getElementById('keyword-search-modal');
  const input = document.getElementById('keyword-search-input');
  if (!modal || !input) return;

  modal.style.display = 'flex';
  document.body.classList.add('search-modal-open');

  if (initialQuery) {
    input.value = initialQuery;
  }
  renderSearchResults(input.value);

  setTimeout(() => {
    input.focus();
    if (input.value) {
      input.select();
    }
  }, 50);
}

/**
 * Closes the keyword search modal.
 */
export function closeKeywordSearch() {
  const modal = document.getElementById('keyword-search-modal');
  if (modal) {
    modal.style.display = 'none';
  }
  document.body.classList.remove('search-modal-open');
}

/**
 * Initializes the keyword search system, builds index, and binds global shortcuts.
 */
export function initKeywordSearch(db = null) {
  const targetDb = db || window.db || (window.state && window.state.db);
  if (targetDb) {
    searchIndex = buildKeywordSearchIndex(targetDb);
  }

  ensureModalDOM();

  if (!isInitialized) {
    isInitialized = true;

    // Global keyboard shortcut: Ctrl+K / Cmd+K
    window.addEventListener('keydown', (e) => {
      // Don't override if typing in an editable field unless Ctrl+K is pressed
      const isInput =
        e.target &&
        ['INPUT', 'TEXTAREA'].includes(e.target.tagName) &&
        e.target.id !== 'keyword-search-input';

      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        const modal = document.getElementById('keyword-search-modal');
        if (modal && modal.style.display === 'flex') {
          closeKeywordSearch();
        } else {
          openKeywordSearch();
        }
      } else if (e.key === '/' && !isInput && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // Quick slash shortcut when reading
        e.preventDefault();
        openKeywordSearch();
      }
    });

    // Check on startup if there is a pending keyword highlight from previous navigation
    try {
      const pendingTerm = sessionStorage.getItem('hh_highlight_keyword');
      if (pendingTerm) {
        sessionStorage.removeItem('hh_highlight_keyword');
        highlightTargetKeywordInLesson(pendingTerm);
      }
    } catch (e) {}
  }

  // Expose helpers globally
  window.openKeywordSearch = openKeywordSearch;
  window.closeKeywordSearch = closeKeywordSearch;
  window.searchCurriculum = searchCurriculum;
}
