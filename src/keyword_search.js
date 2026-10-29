/**
 * Keyword, Historical Figure & Curriculum Search Engine
 * Instant in-memory search across 1,800+ vocabulary terms, flashcards,
 * key historical figures, chronology milestones, and syllabus lessons.
 */

let searchIndex = [];
let isInitialized = false;
let activeFilter = 'all'; // 'all' | 'figure' | 'vocab' | 'source' | 'lesson' | 'timeline'
let activeStageFilter = 'all'; // 'all' | 'this_unit' | 'Year 7' | 'Year 8' | 'Year 9' | 'GCSE'
let currentResults = [];
let selectedResultIndex = -1;

const RECENT_SEARCHES_KEY = 'hh_recent_searches_v1';

const HISTORICAL_ALIASES = {
  ww1: ['great war', 'first world war', 'western front', '1914'],
  wwi: ['great war', 'first world war', 'western front', '1914'],
  'world war 1': ['great war', 'first world war'],
  'world war one': ['great war', 'first world war'],
  ww2: ['second world war', 'weimar', 'nazi germany', 'holocaust', '1939'],
  wwii: ['second world war', 'weimar', 'nazi germany', 'holocaust', '1939'],
  'world war 2': ['second world war'],
  'world war two': ['second world war'],
  'black death': ['plague', 'great pestilence', '1348', 'buboes', 'yersinia'],
  'bubonic plague': ['black death', 'great plague', '1665'],
  'great pestilence': ['black death'],
  'king cholera': ['cholera', 'john snow', 'broad street', 'soho', '1854'],
  'blue death': ['cholera', 'waterborne'],
  'broad street pump': ['john snow', 'soho', 'cholera', '1854'],
  'water pump': ['john snow', 'broad street'],
  'great stink': ['bazalgette', '1858', 'thames', 'sewers', 'parliament'],
  sewers: ['bazalgette', 'great stink', 'sanitation'],
  'germ theory': ['pasteur', 'koch', 'microbes', 'bacteria', '1861'],
  microbe: ['germ theory', 'pasteur', 'koch'],
  disraeli: ['1875 public health act', 'pure water', 'sanitation reform'],
  reparations: ['war guilt', 'article 231', 'treaty of versailles', 'diktat'],
  'treaty of versailles': ['diktat', 'reparations', 'clemenceau', 'lloyd george', 'wilson'],
  hitler: ['weimar', 'nazi germany', 'nsdap', 'reichstag', 'holocaust'],
  nazis: ['nsdap', 'third reich', 'weimar'],
  penicillin: ['alexander fleming', 'florey', 'chain', 'antibiotics'],
  antibiotics: ['penicillin', 'fleming', 'magic bullets'],
  dna: ['watson', 'crick', 'rosalind franklin', 'genetics'],
  smallpox: ['edward jenner', 'vaccination', 'cowpox', '1796'],
  vaccine: ['edward jenner', 'louis pasteur'],
  antiseptic: ['joseph lister', 'carbolic acid', 'surgery'],
  anaesthetic: ['james simpson', 'chloroform', 'ether', 'surgery'],
  'civil rights': ['martin luther king', 'rosa parks', 'malcolm x', 'selma', 'birmingham'],
  vietnam: ['gulf of tonkin', 'tet offensive', 'my lai', 'vietcong'],
};

function getActiveUnitId() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('unit') || (window.state && window.state.currentUnitId) || null;
  } catch (e) {
    return null;
  }
}

function getRecentSearches() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

function saveRecentSearch(term) {
  if (!term || typeof term !== 'string') return;
  const trimmed = term.trim();
  if (trimmed.length < 2) return;
  try {
    let list = getRecentSearches().filter((t) => t.toLowerCase() !== trimmed.toLowerCase());
    list.unshift(trimmed);
    if (list.length > 8) list = list.slice(0, 8);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(list));
  } catch (e) {}
}

function clearRecentSearches() {
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch (e) {}
}

/**
 * Calculates Damerau-Levenshtein edit distance for typo tolerance (handles insertions,
 * deletions, substitutions, and character transpositions like "maritn" -> "martin").
 */
function damerauLevenshtein(a, b) {
  if (a === b) return 0;
  const al = a.length;
  const bl = b.length;
  if (!al) return bl;
  if (!bl) return al;

  const d = [];
  for (let i = 0; i <= al; i++) d[i] = [i];
  for (let j = 0; j <= bl; j++) d[0][j] = j;

  for (let i = 1; i <= al; i++) {
    for (let j = 1; j <= bl; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1, // deletion
        d[i][j - 1] + 1, // insertion
        d[i - 1][j - 1] + cost, // substitution
      );
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1); // transposition
      }
    }
  }
  return d[al][bl];
}

/**
 * Normalizes and cleans unit titles for clear visual presentation.
 */
function getCleanUnitTitle(unitId, unitData) {
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
  };
  return titles[unitId] || unitId.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Computes year stage badge for each unit.
 */
function getYearStageBadge(unitId) {
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
  return 'Curriculum';
}

/**
 * Intelligently resolves the most relevant lesson index for a key historical figure
 * by scoring lesson titles, enquiries, key individuals, and text occurrences.
 */
function findBestLessonIndexForFigure(ki, lessons) {
  if (typeof ki.lessonIndex === 'number') return ki.lessonIndex;
  if (!lessons || !lessons.length) return 0;

  const rawName = (ki.name || '').trim().toLowerCase();
  const cleanName = rawName
    .replace(/^(dr|sir|king|queen|professor|dame|lord|lady|reverend|rev|saint|st)\.?\s+/i, '')
    .trim();
  const parts = cleanName.split(/\s+/).filter(Boolean);
  const lastName = parts[parts.length - 1] || cleanName;

  let bestIdx = 0;
  let maxScore = 0;

  lessons.forEach((l, idx) => {
    let score = 0;
    const lTitle = (
      (l.title || '') +
      ' ' +
      (l.enquiry || '') +
      ' ' +
      (l.subtitle || '')
    ).toLowerCase();
    const lStr = JSON.stringify(l).toLowerCase();

    // Direct key_individual property match
    if (l.key_individual && l.key_individual.name) {
      const kiLName = l.key_individual.name.toLowerCase();
      if (kiLName.includes(lastName) || (cleanName && kiLName.includes(cleanName))) {
        score += 100;
      }
    }

    // Title / Enquiry match
    if (rawName && lTitle.includes(rawName)) score += 60;
    else if (cleanName && cleanName.length > 2 && lTitle.includes(cleanName)) score += 45;
    else if (lastName && lastName.length > 3 && lTitle.includes(lastName)) score += 30;

    // Body content match count
    if (cleanName && cleanName.length > 2) {
      let countClean = 0,
        pos = 0;
      while ((pos = lStr.indexOf(cleanName, pos)) !== -1) {
        countClean++;
        pos += cleanName.length;
      }
      score += countClean * 4;
    }
    if (lastName && lastName.length > 3 && lastName !== cleanName) {
      let countLast = 0,
        pos = 0;
      while ((pos = lStr.indexOf(lastName, pos)) !== -1) {
        countLast++;
        pos += lastName.length;
      }
      score += countLast * 1;
    }

    if (score > maxScore) {
      maxScore = score;
      bestIdx = idx;
    }
  });

  return maxScore > 0 ? bestIdx : 0;
}

/**
 * Resolves the best lesson index for a timeline event by matching year and title keywords.
 */
function findBestLessonIndexForTimeline(te, lessons) {
  if (typeof te.lessonIndex === 'number') return te.lessonIndex;
  if (!lessons || !lessons.length) return 0;

  const title = (te.title || '').toLowerCase();
  const year = (te.year || '').replace(/[^0-9]/g, '');

  let bestIdx = 0;
  let maxScore = 0;

  lessons.forEach((l, idx) => {
    let score = 0;
    const lStr = JSON.stringify(l).toLowerCase();
    if (year && year.length === 4 && lStr.includes(year)) score += 30;
    if (title && lStr.includes(title)) score += 40;
    if (score > maxScore) {
      maxScore = score;
      bestIdx = idx;
    }
  });

  return maxScore > 0 ? bestIdx : 0;
}

/**
 * Builds the searchable index from the database in client memory.
 * Indexes vocabulary, flashcards, key historical figures, timeline milestones, and enquiry lessons.
 */
export function buildKeywordSearchIndex(db) {
  const index = [];
  if (!db || typeof db !== 'object') return index;

  for (const [unitId, unitObj] of Object.entries(db)) {
    const unitData = unitObj?.data || {};
    const unitTitle = getCleanUnitTitle(unitId, unitData);
    const stageBadge = getYearStageBadge(unitId);
    const lessons = unitData.lessons || unitData.subtopics || [];

    // 1. Index Key Historical Figures (unitData.key_individuals & unitData.portraits)
    const individuals = unitData.key_individuals || unitData.portraits || [];
    individuals.forEach((ki) => {
      const name = (ki.name || '').trim();
      const role = (ki.role || ki.title || '').trim();
      const bio = (ki.bio || ki.description || '').trim();
      if (name) {
        const resolvedLessonIdx = findBestLessonIndexForFigure(ki, lessons);
        const resolvedLesson = lessons[resolvedLessonIdx];
        index.push({
          type: 'figure',
          term: name,
          subtitle: role,
          definition: bio || role,
          image: ki.image || '',
          unitId,
          unitTitle,
          stageBadge,
          lessonIndex: resolvedLessonIdx,
          lessonTitle:
            ki.lessonTitle ||
            (resolvedLesson?.title
              ? `Lesson ${resolvedLessonIdx + 1}: ${resolvedLesson.title}`
              : unitTitle),
          enquiry: resolvedLesson?.enquiry || '',
        });
      }
    });

    // 2. Index Chronology Milestones (unitData.timeline)
    const timelineEvents = unitData.timeline || [];
    timelineEvents.forEach((te) => {
      const title = (te.title || '').trim();
      const year = (te.year || '').trim();
      const detail = (te.detail || te.description || '').trim();
      if (title) {
        const resolvedLessonIdx = findBestLessonIndexForTimeline(te, lessons);
        const resolvedLesson = lessons[resolvedLessonIdx];
        index.push({
          type: 'timeline',
          term: year ? `${year}: ${title}` : title,
          title: title,
          year: year,
          definition: detail,
          unitId,
          unitTitle,
          stageBadge,
          lessonIndex: resolvedLessonIdx,
          lessonTitle: resolvedLesson?.title
            ? `Lesson ${resolvedLessonIdx + 1}: ${resolvedLesson.title}`
            : unitTitle,
          enquiry: resolvedLesson?.enquiry || '',
        });
      }
    });

    // 3. Index Lessons & Lesson-Level Vocab / Flashcards
    lessons.forEach((l, idx) => {
      const lessonTitle = (l.title || `Lesson ${idx + 1}`).trim();
      const enquiry = (l.enquiry || '').trim();

      // Lesson Key Individual if defined at lesson scope
      if (l.key_individual && l.key_individual.name) {
        const kiName = l.key_individual.name.trim();
        if (kiName) {
          index.push({
            type: 'figure',
            term: kiName,
            subtitle: l.key_individual.title || l.key_individual.role || '',
            definition: l.key_individual.description || l.key_individual.bio || '',
            image: l.key_individual.image || '',
            unitId,
            unitTitle,
            stageBadge,
            lessonIndex: idx,
            lessonTitle,
            enquiry,
          });
        }
      }

      // Index Vocabulary AND Flashcards (supports units using flashcards)
      const vocabList = [...(l.vocab || []), ...(l.vocabulary || []), ...(l.flashcards || [])];
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

      // Index Lesson Title, Subtitle, & Enquiry Question
      index.push({
        type: 'lesson',
        title: lessonTitle,
        subtitle: l.subtitle || '',
        enquiry: enquiry,
        unitId,
        unitTitle,
        stageBadge,
        lessonIndex: idx,
        lessonTitle,
        definition: enquiry ? `Enquiry: ${enquiry}` : '',
      });

      // Index Narrative Block Themes / Section Headings
      if (Array.isArray(l.narrative_blocks)) {
        l.narrative_blocks.forEach((nb) => {
          const nbTitle = (nb.title || nb.theme_heading || '').trim();
          if (nbTitle && nbTitle !== lessonTitle) {
            index.push({
              type: 'lesson',
              title: nbTitle,
              subtitle: `Section in ${lessonTitle}`,
              enquiry: enquiry,
              unitId,
              unitTitle,
              stageBadge,
              lessonIndex: idx,
              lessonTitle,
              actIndex: nb.act,
              definition: enquiry ? `Enquiry: ${enquiry}` : '',
            });
          }
        });
      }

      // Index Primary & Visual Historical Sources (sources, primary_source, source_tasks)
      const rawSources = [
        ...(Array.isArray(l.sources) ? l.sources : []),
        ...(Array.isArray(l.primary_source)
          ? l.primary_source
          : l.primary_source
            ? [l.primary_source]
            : []),
        ...(Array.isArray(l.source_tasks) ? l.source_tasks : []),
      ];

      rawSources.forEach((src) => {
        const title = (src.title || src.name || (src.letter ? `Source ${src.letter}` : '')).trim();
        const provenance = (
          src.provenance ||
          src.attribution ||
          src.source ||
          src.context ||
          src.author ||
          ''
        ).trim();
        const extract = (src.extract || src.text || src.description || src.content || '').trim();
        if (title || provenance) {
          index.push({
            type: 'source',
            term: title || `Source ${src.letter || ''}`,
            title: title || `Source ${src.letter || ''}`,
            subtitle: src.letter
              ? `Source ${src.letter} • ${lessonTitle}`
              : `Historical Source • ${lessonTitle}`,
            definition:
              provenance || (extract.length > 200 ? extract.slice(0, 197) + '...' : extract),
            fullText: extract,
            provenance: provenance,
            image: src.image || src.image_url || '',
            unitId,
            unitTitle,
            stageBadge,
            lessonIndex: idx,
            lessonTitle,
            enquiry,
          });
        }
      });

      // Index task-embedded sources
      if (Array.isArray(l.tasks)) {
        l.tasks.forEach((t) => {
          if (t.source && typeof t.source === 'object') {
            const title = (
              t.source.title || (t.source.letter ? `Source ${t.source.letter}` : '')
            ).trim();
            if (title) {
              index.push({
                type: 'source',
                term: title,
                title: title,
                subtitle: `Source in Task • ${lessonTitle}`,
                definition: t.source.provenance || t.source.caption || t.question || '',
                fullText: t.source.text || '',
                provenance: t.source.provenance || '',
                image: t.source.image || t.source.image_url || '',
                unitId,
                unitTitle,
                stageBadge,
                lessonIndex: idx,
                lessonTitle,
                enquiry,
              });
            }
          }
        });
      }
    });
  }

  return index;
}

/**
 * Escapes regex special characters safely.
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * High-precision scoring algorithm with word boundary prioritization, historical alias expansion,
 * active unit context boost, and fuzzy typo tolerance.
 */
function scoreSearchItem(item, q, qTokens, activeUnit = null) {
  let score = 0;
  const termOrTitle = (item.term || item.title || '').toLowerCase();
  const defOrEnquiry = (item.definition || item.enquiry || item.subtitle || '').toLowerCase();
  const termWords = termOrTitle.split(/[^a-z0-9]+/).filter(Boolean);

  // 1. Exact full phrase match in term or title
  if (termOrTitle === q) {
    score += 360;
  } else if (termOrTitle.startsWith(q + ' ') || termOrTitle.endsWith(' ' + q)) {
    score += 230;
  }

  let allTokensMatched = true;

  for (const tok of qTokens) {
    const wordBoundaryRegex = new RegExp('\\b' + escapeRegex(tok) + '\\b', 'i');
    const isWordMatch = wordBoundaryRegex.test(termOrTitle);
    const isSubMatch = termOrTitle.includes(tok);

    if (isWordMatch) {
      score += 160;
    } else if (isSubMatch) {
      score += 75;
    } else {
      // Check typo / fuzzy match on term words only if no exact match
      let foundFuzzy = false;
      if (tok.length >= 4) {
        for (const w of termWords) {
          if (w.length >= 4) {
            const maxDist = tok.length <= 6 ? 1 : 2;
            const dist = damerauLevenshtein(tok, w);
            if (dist <= maxDist) {
              score += dist === 1 ? 110 : 70;
              foundFuzzy = true;
              break;
            }
          }
        }
      }
      if (!foundFuzzy) {
        // Fall back to definition match
        const defWordMatch = wordBoundaryRegex.test(defOrEnquiry);
        if (defWordMatch) {
          score += 45;
        } else if (defOrEnquiry.includes(tok)) {
          score += 25;
        } else {
          allTokensMatched = false;
        }
      }
    }
  }

  // Multi-token full coverage bonus
  if (allTokensMatched && qTokens.length > 1) {
    score += 60;
  }

  // Historical Synonyms / Alias expansion bonus
  for (const [aliasKey, synonyms] of Object.entries(HISTORICAL_ALIASES)) {
    if (q.includes(aliasKey) || qTokens.includes(aliasKey)) {
      for (const syn of synonyms) {
        if (termOrTitle.includes(syn) || defOrEnquiry.includes(syn)) {
          score += 75;
          break;
        }
      }
    }
  }

  // Priority boosts for primary historical entities over generic mentions
  if (score > 0) {
    if (item.type === 'figure') score += 30;
    if (item.type === 'source') score += 25;
    if (item.type === 'vocab') score += 20;
    if (item.type === 'timeline') score += 15;
    if (item.type === 'lesson') score += 10;

    // Active Unit priority boost
    if (activeUnit && item.unitId === activeUnit) {
      score += 65;
    }
  }

  return score;
}

/**
 * Searches the index and returns ranked, deduplicated results.
 */
export function searchCurriculum(
  query,
  index = searchIndex,
  filter = activeFilter,
  stageFilter = activeStageFilter,
) {
  if (!query || !query.trim()) return [];
  const q = query.toLowerCase().trim();
  const qTokens = q.split(/\s+/).filter(Boolean);
  const activeUnit = getActiveUnitId();

  const scored = [];

  for (const item of index) {
    // Entity type filter
    if (filter === 'figure' && item.type !== 'figure') continue;
    if (filter === 'vocab' && item.type !== 'vocab') continue;
    if (filter === 'source' && item.type !== 'source') continue;
    if (filter === 'lesson' && item.type !== 'lesson') continue;
    if (filter === 'timeline' && item.type !== 'timeline') continue;

    // Safety check for KS2 Junior Portal mode (safeguarding younger pupils)
    const isKs2PortalActive =
      (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('hh_portal') === 'ks2') ||
      (typeof window !== 'undefined' &&
        new URLSearchParams(window.location.search).get('portal') === 'ks2');
    if (isKs2PortalActive && item.stageBadge !== 'Key Stage 2') {
      continue;
    }

    // Safety check for locked classroom safeguard sessions
    const urlParams =
      typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const isLocked =
      urlParams &&
      (urlParams.get('locked') === 'true' ||
        urlParams.get('mode') === 'pupil' ||
        urlParams.get('safeguard') === 'true');
    if (isLocked && activeUnit && item.unitId !== activeUnit) {
      continue;
    }

    // Key Stage / Unit scope filter
    if (stageFilter === 'this_unit') {
      if (activeUnit && item.unitId !== activeUnit) continue;
    } else if (stageFilter && stageFilter !== 'all') {
      if (item.stageBadge !== stageFilter) continue;
    }

    const score = scoreSearchItem(item, q, qTokens, activeUnit);
    if (score > 0) {
      scored.push({ item, score });
    }
  }

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  // Intelligent deduplication (e.g. figure vs vocab in same unit, or repeated terms)
  const seen = new Set();
  const results = [];
  for (const entry of scored) {
    const it = entry.item;
    const nameKey = (it.term || it.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const dedupeKey = `${it.unitId}:${it.type}:${nameKey}`;

    if (!seen.has(dedupeKey)) {
      seen.add(dedupeKey);
      results.push(it);
    }
    if (results.length >= 40) break;
  }

  return results;
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
            placeholder="Search figures, terms, or lessons (e.g. 'Martin Luther', 'miasma', 'reparations', 'cholera')..." 
            autocomplete="off" 
            spellcheck="false"
            aria-label="Search curriculum keywords, historical figures and lessons"
          />
          <button type="button" id="keyword-search-clear-btn" class="search-modal-clear-btn" aria-label="Clear search query" style="display: none;">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <button type="button" id="keyword-search-close-btn" class="search-modal-close-btn" aria-label="Close search modal">
            <kbd>ESC</kbd>
          </button>
        </div>

        <!-- Filter Chips Bar (Entity Type) -->
        <div class="search-modal-filters" role="tablist">
          <button type="button" class="search-filter-chip active" data-filter="all">
            <i class="fa-solid fa-layer-group"></i> All Results <span class="search-filter-count" id="count-all"></span>
          </button>
          <button type="button" class="search-filter-chip" data-filter="figure">
            <i class="fa-solid fa-user-tie"></i> Key Figures <span class="search-filter-count" id="count-figure"></span>
          </button>
          <button type="button" class="search-filter-chip" data-filter="vocab">
            <i class="fa-solid fa-key"></i> Terms &amp; Vocab <span class="search-filter-count" id="count-vocab"></span>
          </button>
          <button type="button" class="search-filter-chip" data-filter="source">
            <i class="fa-solid fa-scroll"></i> Sources <span class="search-filter-count" id="count-source"></span>
          </button>
          <button type="button" class="search-filter-chip" data-filter="lesson">
            <i class="fa-solid fa-book-open"></i> Enquiry Lessons <span class="search-filter-count" id="count-lesson"></span>
          </button>
          <button type="button" class="search-filter-chip" data-filter="timeline">
            <i class="fa-solid fa-timeline"></i> Timeline <span class="search-filter-count" id="count-timeline"></span>
          </button>
        </div>

        <!-- Key Stage & Current Unit Filters Bar -->
        <div class="search-modal-stage-filters" role="tablist">
          <span class="search-stage-filter-label">Key Stage:</span>
          <button type="button" class="search-stage-chip active" data-stage="all">All</button>
          <button type="button" class="search-stage-chip" data-stage="this_unit"><i class="fa-solid fa-location-dot"></i> This Unit</button>
          <button type="button" class="search-stage-chip" data-stage="Year 7">Year 7</button>
          <button type="button" class="search-stage-chip" data-stage="Year 8">Year 8</button>
          <button type="button" class="search-stage-chip" data-stage="Year 9">Year 9</button>
          <button type="button" class="search-stage-chip" data-stage="GCSE">GCSE</button>
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

  // Filter chips click (Entity Type)
  modal.querySelectorAll('.search-filter-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      modal.querySelectorAll('.search-filter-chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.getAttribute('data-filter') || 'all';
      renderSearchResults(input.value);
    });
  });

  // Stage & Unit filters click
  modal.querySelectorAll('.search-stage-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      modal.querySelectorAll('.search-stage-chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      activeStageFilter = chip.getAttribute('data-stage') || 'all';
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

  // Delegate click on result item, preview toggle, recent searches, and discovery tags
  resultsContainer.addEventListener('click', (e) => {
    // 1. Quick Preview Toggle Button
    const previewBtn = e.target.closest('.search-preview-btn');
    if (previewBtn) {
      e.stopPropagation();
      const idx = previewBtn.getAttribute('data-preview-idx');
      const drawer = document.getElementById(`preview-drawer-${idx}`);
      if (drawer) {
        drawer.classList.toggle('open');
        const isOpen = drawer.classList.contains('open');
        previewBtn.innerHTML = isOpen
          ? '<i class="fa-solid fa-chevron-up"></i> Hide'
          : '<i class="fa-solid fa-eye"></i> Quick Fact';
      }
      return;
    }

    // 2. Clear Recent Searches Button
    const clearRecentBtn = e.target.closest('#btn-clear-recent');
    if (clearRecentBtn) {
      e.stopPropagation();
      clearRecentSearches();
      renderSearchResults('');
      return;
    }

    // 3. Click on Recent Search Chip
    const recentChip = e.target.closest('.search-recent-chip');
    if (recentChip) {
      const term = recentChip.getAttribute('data-term');
      if (term) {
        input.value = term;
        input.focus();
        renderSearchResults(term);
      }
      return;
    }

    // 4. Result Item Card Navigation
    const itemEl = e.target.closest('.search-result-item');
    if (itemEl) {
      const idx = parseInt(itemEl.getAttribute('data-result-index'), 10);
      if (!isNaN(idx) && currentResults[idx]) {
        selectResult(currentResults[idx]);
      }
      return;
    }

    // 5. Quick tag clicks from default discovery state
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

  // Always reset scroll to top on every search query to keep best matches in view
  container.scrollTop = 0;

  const trimmed = (query || '').trim();
  if (clearBtn) {
    clearBtn.style.display = trimmed ? 'flex' : 'none';
  }

  // Update dynamic counts on tabs
  updateFilterCounts(trimmed);

  // If query is empty, show curated popular suggestions & recent history
  if (!trimmed) {
    selectedResultIndex = -1;
    currentResults = [];
    container.innerHTML = getDiscoverySuggestionsHTML();
    return;
  }

  const results = searchCurriculum(trimmed, searchIndex, activeFilter, activeStageFilter);

  if (results.length === 0) {
    currentResults = [];
    selectedResultIndex = -1;
    container.innerHTML = `
      <div class="search-empty-state">
        <div class="search-empty-icon">
          <i class="fa-solid fa-book-open-reader"></i>
        </div>
        <div class="search-empty-title">No matches found for "${escapeHtml(trimmed)}"</div>
        <div class="search-empty-hint">
          Try searching for historical figures like <strong>John Snow</strong>, <strong>Bazalgette</strong>, <strong>Martin Luther</strong>, or terms like <strong>miasma</strong>, <strong>reparations</strong>, or <strong>Broad Street</strong>.
        </div>
      </div>
    `;
    return;
  }

  let html = '';

  if (activeFilter === 'all') {
    // Group items by category if viewing 'all'
    const figureItems = results.filter((r) => r.type === 'figure');
    const vocabItems = results.filter((r) => r.type === 'vocab');
    const sourceItems = results.filter((r) => r.type === 'source');
    const lessonItems = results.filter((r) => r.type === 'lesson');
    const timelineItems = results.filter((r) => r.type === 'timeline');

    // Align currentResults strictly with the rendered DOM order so keyboard selection is 100% faithful
    const orderedDisplay = [
      ...figureItems,
      ...vocabItems,
      ...sourceItems,
      ...lessonItems,
      ...timelineItems,
    ];
    currentResults = orderedDisplay;
    selectedResultIndex = orderedDisplay.length > 0 ? 0 : -1;

    // 1. Key Historical Figures
    if (figureItems.length > 0) {
      html += `
        <div class="search-results-group">
          <div class="search-group-header">
            <span><i class="fa-solid fa-user-tie"></i> Key Historical Figures</span>
            <span class="search-group-count">${figureItems.length} match${figureItems.length > 1 ? 'es' : ''}</span>
          </div>
          <div class="search-group-list">
            ${figureItems.map((item) => renderResultItemHTML(item, orderedDisplay.indexOf(item), trimmed)).join('')}
          </div>
        </div>
      `;
    }

    // 2. Key Terms & Definitions
    if (vocabItems.length > 0) {
      html += `
        <div class="search-results-group">
          <div class="search-group-header">
            <span><i class="fa-solid fa-key"></i> Key Terms &amp; Definitions</span>
            <span class="search-group-count">${vocabItems.length} match${vocabItems.length > 1 ? 'es' : ''}</span>
          </div>
          <div class="search-group-list">
            ${vocabItems.map((item) => renderResultItemHTML(item, orderedDisplay.indexOf(item), trimmed)).join('')}
          </div>
        </div>
      `;
    }

    // 3. Primary & Historical Sources
    if (sourceItems.length > 0) {
      html += `
        <div class="search-results-group">
          <div class="search-group-header">
            <span><i class="fa-solid fa-scroll"></i> Primary &amp; Historical Sources</span>
            <span class="search-group-count">${sourceItems.length} match${sourceItems.length > 1 ? 'es' : ''}</span>
          </div>
          <div class="search-group-list">
            ${sourceItems.map((item) => renderResultItemHTML(item, orderedDisplay.indexOf(item), trimmed)).join('')}
          </div>
        </div>
      `;
    }

    // 4. Enquiry Lessons
    if (lessonItems.length > 0) {
      html += `
        <div class="search-results-group">
          <div class="search-group-header">
            <span><i class="fa-solid fa-book-open"></i> Enquiry Lessons</span>
            <span class="search-group-count">${lessonItems.length} match${lessonItems.length > 1 ? 'es' : ''}</span>
          </div>
          <div class="search-group-list">
            ${lessonItems.map((item) => renderResultItemHTML(item, orderedDisplay.indexOf(item), trimmed)).join('')}
          </div>
        </div>
      `;
    }

    // 5. Timeline Milestones
    if (timelineItems.length > 0) {
      html += `
        <div class="search-results-group">
          <div class="search-group-header">
            <span><i class="fa-solid fa-timeline"></i> Timeline Milestones</span>
            <span class="search-group-count">${timelineItems.length} match${timelineItems.length > 1 ? 'es' : ''}</span>
          </div>
          <div class="search-group-list">
            ${timelineItems.map((item) => renderResultItemHTML(item, orderedDisplay.indexOf(item), trimmed)).join('')}
          </div>
        </div>
      `;
    }
  } else {
    currentResults = results;
    selectedResultIndex = results.length > 0 ? 0 : -1;
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
 * Updates result counts for each filter chip dynamically.
 */
function updateFilterCounts(query) {
  if (!query) {
    ['all', 'figure', 'vocab', 'source', 'lesson', 'timeline'].forEach((f) => {
      const el = document.getElementById(`count-${f}`);
      if (el) el.textContent = '';
    });
    return;
  }

  const all = searchCurriculum(query, searchIndex, 'all', activeStageFilter);
  const setEl = (id, count) => {
    const el = document.getElementById(id);
    if (el) el.textContent = count > 0 ? `(${count})` : '';
  };

  setEl('count-all', all.length);
  setEl('count-figure', all.filter((r) => r.type === 'figure').length);
  setEl('count-vocab', all.filter((r) => r.type === 'vocab').length);
  setEl('count-source', all.filter((r) => r.type === 'source').length);
  setEl('count-lesson', all.filter((r) => r.type === 'lesson').length);
  setEl('count-timeline', all.filter((r) => r.type === 'timeline').length);
}

/**
 * Generates the HTML for an individual search result card.
 */
function renderResultItemHTML(item, globalIndex, query) {
  const isFigure = item.type === 'figure';
  const isVocab = item.type === 'vocab';
  const isSource = item.type === 'source';
  const isTimeline = item.type === 'timeline';
  const isLesson = item.type === 'lesson';

  const isCurrentUnit = item.unitId && item.unitId === getActiveUnitId();

  const displayTitle = item.term || item.title;
  const highlightedTitle = highlightMatch(displayTitle, query);
  const snippet = item.definition || item.enquiry || '';
  const highlightedSnippet = snippet ? highlightMatch(snippet, query) : '';

  const stageClass = item.stageBadge
    ? item.stageBadge.toLowerCase().replace(/\s+/g, '')
    : 'curriculum';

  let typeClass = 'is-lesson';
  let iconHtml = '<i class="fa-solid fa-graduation-cap"></i>';

  if (isFigure) {
    typeClass = 'is-figure';
    if (item.image) {
      iconHtml = `<img src="${escapeHtml(item.image)}" class="search-result-avatar" alt="${escapeHtml(item.term)}" onerror="this.outerHTML='<i class=\\'fa-solid fa-user-tie\\'></i>'" />`;
    } else {
      iconHtml = '<i class="fa-solid fa-user-tie"></i>';
    }
  } else if (isVocab) {
    typeClass = 'is-vocab';
    iconHtml = '<i class="fa-solid fa-key"></i>';
  } else if (isSource) {
    typeClass = 'is-source';
    if (item.image) {
      iconHtml = `<img src="${escapeHtml(item.image)}" class="search-result-avatar" alt="${escapeHtml(item.term)}" onerror="this.outerHTML='<i class=\\'fa-solid fa-scroll\\'></i>'" />`;
    } else {
      iconHtml = '<i class="fa-solid fa-scroll"></i>';
    }
  } else if (isTimeline) {
    typeClass = 'is-timeline';
    iconHtml = '<i class="fa-solid fa-timeline"></i>';
  }

  const actionText = isFigure
    ? 'View Historical Figure'
    : isSource
      ? 'View Historical Source'
      : isTimeline
        ? 'View Milestone'
        : isVocab
          ? 'Jump to Definition'
          : 'Open Enquiry Lesson';

  // Quick Fact content for in-modal preview
  const previewText = isSource
    ? `<div><strong>${escapeHtml(item.term)}</strong></div>${item.provenance ? `<div style="font-size:0.75rem; color:#64748b; margin-top:3px;"><strong>Provenance:</strong> ${escapeHtml(item.provenance)}</div>` : ''}${item.fullText ? `<div style="margin-top:6px; font-style:italic; border-left:2px solid #fdba74; padding-left:8px;">"${escapeHtml(item.fullText.length > 280 ? item.fullText.slice(0, 277) + '...' : item.fullText)}"</div>` : ''}`
    : isFigure
      ? `<div><strong>${escapeHtml(item.term)}:</strong> ${escapeHtml(item.definition)}</div>`
      : isVocab
        ? `<div><strong>Definition:</strong> ${escapeHtml(item.definition)}</div>`
        : `<div><strong>Enquiry:</strong> ${escapeHtml(item.enquiry || item.definition || item.subtitle)}</div>`;

  return `
    <div class="search-result-item ${typeClass}" data-result-index="${globalIndex}" role="option" tabindex="0">
      <div class="search-result-icon">
        ${iconHtml}
      </div>
      <div class="search-result-body">
        <div class="search-result-header">
          <div class="search-result-title">${highlightedTitle}</div>
          <div class="search-result-badges">
            ${isCurrentUnit ? `<span class="search-current-unit-pill"><i class="fa-solid fa-location-dot"></i> This Unit</span>` : ''}
            <span class="search-stage-pill ${stageClass}">${escapeHtml(item.stageBadge || 'Curriculum')}</span>
            <span class="search-unit-pill" title="${escapeHtml(item.unitTitle)}">${escapeHtml(item.unitTitle)}</span>
            ${item.lessonIndex !== undefined && !isTimeline ? `<span class="search-lesson-pill">Lesson ${item.lessonIndex + 1}</span>` : ''}
          </div>
        </div>
        ${item.subtitle ? `<div class="search-result-subtitle">${escapeHtml(item.subtitle)}</div>` : ''}
        ${
          highlightedSnippet
            ? `<div class="search-result-snippet">${isVocab ? '<strong>Definition:</strong> ' : isFigure ? '<strong>Bio:</strong> ' : isSource ? '<strong>Context:</strong> ' : ''}${highlightedSnippet}</div>`
            : ''
        }
        <div class="search-result-preview-drawer" id="preview-drawer-${globalIndex}">
          ${previewText}
        </div>
      </div>
      <div class="search-result-actions" style="display:flex; align-items:center; gap:6px;">
        <button type="button" class="search-preview-btn" data-preview-idx="${globalIndex}" title="Quick Fact Preview">
          <i class="fa-solid fa-eye"></i> Quick Fact
        </button>
        <div class="search-result-action" title="${actionText}">
          <span>${actionText}</span>
          <i class="fa-solid fa-arrow-right"></i>
        </div>
      </div>
    </div>
  `;
}

/**
 * Default state: Helpful discovery suggestions across Key Stages + Recent Searches.
 */
function getDiscoverySuggestionsHTML() {
  const recentSearches = getRecentSearches();

  const popularTerms = [
    { term: 'John Snow', stage: 'Year 7 / GCSE' },
    { term: 'Broad Street Pump', stage: 'Year 7 Sanitation' },
    { term: 'Great Stink', stage: 'Year 7 / 8' },
    { term: 'Miasma Theory', stage: 'Year 7 / 8' },
    { term: 'Andreas Vesalius', stage: 'GCSE Medicine' },
    { term: 'Germ Theory', stage: 'Year 7 / GCSE' },
    { term: 'Martin Luther', stage: 'Year 8 Reformation' },
    { term: 'Reparations', stage: 'Year 9 / GCSE' },
    { term: 'Treaty of Versailles', stage: 'Year 9 Great War' },
    { term: 'Rosa Parks', stage: 'GCSE USA' },
    { term: 'Alexander Fleming', stage: 'GCSE Medicine' },
    { term: 'Oliver Cromwell', stage: 'Year 8 Crown & Church' },
  ];

  let recentHtml = '';
  if (recentSearches.length > 0) {
    recentHtml = `
      <div class="search-recent-box">
        <div class="search-recent-header">
          <span><i class="fa-solid fa-clock-rotate-left"></i> Recent Searches</span>
          <button type="button" class="search-clear-recent-btn" id="btn-clear-recent">Clear History</button>
        </div>
        <div class="search-recent-chips">
          ${recentSearches
            .map(
              (t) => `
            <button type="button" class="search-recent-chip" data-term="${escapeHtml(t)}">
              <i class="fa-solid fa-clock-rotate-left"></i>
              <span>${escapeHtml(t)}</span>
            </button>
          `,
            )
            .join('')}
        </div>
      </div>
    `;
  }

  return `
    <div class="search-discovery-box">
      ${recentHtml}
      <div class="search-discovery-title">
        <i class="fa-solid fa-compass"></i> Popular Figures, Keywords &amp; Quick Lookups
      </div>
      <p class="search-discovery-sub">
        Click any keyword below or start typing to search across 2,400+ historical figures, definitions, primary sources, timelines, and lesson enquiries.
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

  // Save query / term to recent searches
  const input = document.getElementById('keyword-search-input');
  const termToSave = (input?.value || item.term || item.title || '').trim();
  if (termToSave) {
    saveRecentSearch(termToSave);
  }

  const highlightTerm = item.term || item.title || '';

  // If it's a vocabulary term, figure, or source, cache it for auto-scrolling & highlighting
  if (highlightTerm) {
    try {
      sessionStorage.setItem('hh_highlight_keyword', highlightTerm);
      if (item.actIndex) {
        sessionStorage.setItem('hh_highlight_act', String(item.actIndex));
      }
    } catch (e) {}
  }

  // Navigate to unit and specific lesson
  if (typeof window.switchView === 'function') {
    window.switchView('lessons', item.unitId, false, {
      lessonIndex: item.lessonIndex || 0,
      actIndex: item.actIndex,
    });
  }

  // Trigger smooth scroll and highlighting in the lesson
  if (highlightTerm) {
    highlightTargetKeywordInLesson(highlightTerm, item.actIndex);
  }
}

/**
 * Scrolls to and highlights the target keyword, source, or historical figure in the lesson DOM.
 * Employs a resilient retry loop (up to 2.5s) to guarantee accurate landing in dynamic SPAs.
 */
export function highlightTargetKeywordInLesson(term, actIndex = null) {
  if (!term) return;
  const safeTerm = term.toLowerCase().trim();

  let attempts = 0;
  const maxAttempts = 20;

  const interval = setInterval(() => {
    attempts++;

    // 1. If actIndex is specified, switch to that Act tab if needed
    if (actIndex) {
      const actBtn = document.querySelector(
        `.act-nav-btn[data-act="${actIndex}"], button[data-act="${actIndex}"]`,
      );
      if (actBtn && !actBtn.classList.contains('active')) {
        actBtn.click();
      }
    }

    // 2. Check for matching source card or source image
    const sourceCards = Array.from(
      document.querySelectorAll(
        '.source-card, .source-box, .primary-source-container, .archival-source-card',
      ),
    );
    const matchedSource = sourceCards.find((c) => c.textContent.toLowerCase().includes(safeTerm));
    if (matchedSource) {
      clearInterval(interval);
      const details = matchedSource.closest('details');
      if (details) details.open = true;
      matchedSource.scrollIntoView({ behavior: 'smooth', block: 'center' });
      matchedSource.classList.add('keyword-pulse-glow');
      setTimeout(() => matchedSource.classList.remove('keyword-pulse-glow'), 4000);
      return;
    }

    // 3. Check for matching term button in Key Vocabulary practice widget
    const termBtns = Array.from(document.querySelectorAll('.match-term-btn'));
    const matchedBtn = termBtns.find((b) => b.textContent.toLowerCase().trim().includes(safeTerm));
    if (matchedBtn) {
      clearInterval(interval);
      const details = matchedBtn.closest('details');
      if (details) details.open = true;
      matchedBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      matchedBtn.classList.add('keyword-pulse-glow');
      setTimeout(() => matchedBtn.classList.remove('keyword-pulse-glow'), 4000);
      return;
    }

    // 4. Check for highlighted .vocab-word, .vocab-lens-term, or .individual-card
    const vocabWords = Array.from(
      document.querySelectorAll(
        '.vocab-word, .vocab-lens-term, .individual-card, .character-card, .portrait-card, .key-individual-badge',
      ),
    );
    const matchedWord = vocabWords.find((w) =>
      w.textContent.toLowerCase().trim().includes(safeTerm),
    );
    if (matchedWord) {
      clearInterval(interval);
      const details = matchedWord.closest('details');
      if (details) details.open = true;
      matchedWord.scrollIntoView({ behavior: 'smooth', block: 'center' });
      matchedWord.classList.add('keyword-pulse-glow');
      setTimeout(() => matchedWord.classList.remove('keyword-pulse-glow'), 4000);
      return;
    }

    // 5. Fallback: Search text nodes in #content-area
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
            clearInterval(interval);
            const details = parent.closest('details');
            if (details) details.open = true;
            parent.scrollIntoView({ behavior: 'smooth', block: 'center' });
            parent.classList.add('keyword-pulse-glow');
            setTimeout(() => parent.classList.remove('keyword-pulse-glow'), 4000);
            return;
          }
        }
      }
    }

    if (attempts >= maxAttempts) {
      clearInterval(interval);
    }
  }, 120);
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
