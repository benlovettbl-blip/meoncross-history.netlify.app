/**
 * Video Utilities for GCSE History Revision Hub
 * - Duration parsing and formatting
 * - Duration-based sorting (shortest to longest)
 * - Sidebar video badge generation
 */

/**
 * Parses duration strings into total seconds.
 * Supports: "4 mins 20 secs", "45 mins", "6:31", "1 hour 25 mins", "58 mins", etc.
 * @param {string} durationStr
 * @returns {number} duration in seconds (defaults to 999999 if undefined)
 */
export function parseDurationToSeconds(durationStr) {
  if (!durationStr || typeof durationStr !== 'string') return 999999;
  let total = 0;
  const hoursMatch = durationStr.match(/(\d+)\s*(?:hours?|hrs?|h)/i);
  if (hoursMatch) total += parseInt(hoursMatch[1], 10) * 3600;
  const minsMatch = durationStr.match(/(\d+)\s*(?:minutes?|mins?|m)/i);
  if (minsMatch) total += parseInt(minsMatch[1], 10) * 60;
  const secsMatch = durationStr.match(/(\d+)\s*(?:seconds?|secs?|s)/i);
  if (secsMatch) total += parseInt(secsMatch[1], 10);

  if (total === 0) {
    const colonMatch = durationStr.match(/(?:(\d+):)?(\d+):(\d+)/);
    if (colonMatch) {
      if (colonMatch[1]) total += parseInt(colonMatch[1], 10) * 3600;
      total += parseInt(colonMatch[2], 10) * 60;
      total += parseInt(colonMatch[3], 10);
    }
  }
  return total || 999999;
}

/**
 * Formats duration into a concise classroom badge string (e.g., "4m 20s", "45m", "1h 25m").
 * @param {string} durationStr
 * @returns {string}
 */
export function formatShortDuration(durationStr) {
  if (!durationStr) return '';
  const secs = parseDurationToSeconds(durationStr);
  if (secs === 999999) {
    return durationStr
      .replace(/\s*secs?/i, 's')
      .replace(/\s*mins?/i, 'm')
      .replace(/\s+/g, ' ')
      .trim();
  }
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (h > 0) return `${h}h${m > 0 ? ` ${m}m` : ''}`;
  if (m > 0 && s > 0 && m < 10) return `${m}m ${s}s`;
  if (m > 0) return `${m}m`;
  return `${s}s`;
}

/**
 * Formats duration into a prominent, immediately readable duration badge (e.g. "58 mins", "4m 20s", "12 mins", "1h 25m").
 * @param {string} durationStr
 * @returns {string}
 */
export function formatProminentDuration(durationStr) {
  if (!durationStr) return '';
  const secs = parseDurationToSeconds(durationStr);
  if (secs === 999999) {
    return durationStr.trim();
  }
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (h > 0) return `${h}h${m > 0 ? ` ${m}m` : ''}`;
  if (m > 0 && s > 0 && m < 10) return `${m}m ${s}s`;
  if (m > 0) return `${m} mins`;
  return `${s}s`;
}

/**
 * Cleans video titles by removing machine-generated episode/index prefixes (e.g., "04: ", "01 - ", "Ep 2: ")
 * @param {string} title
 * @returns {string}
 */
export function cleanVideoDisplayTitle(title) {
  if (!title || typeof title !== 'string') return 'Historical Documentary Resource';
  const cleaned = title
    .replace(/^\s*(?:ep(?:isode)?\s*\d+[\s:\.\-]+|\d{1,2}[\s:\.\-]+\s*)/i, '')
    .trim();
  return cleaned || title;
}

/**
 * Extracts and sorts all videos for a given lesson from shortest to longest.
 * @param {object} lesson
 * @returns {Array} sorted array of video objects
 */
export function getSortedLessonVideos(lesson) {
  if (!lesson) return [];
  let rawVideos = [];
  if (Array.isArray(lesson)) {
    rawVideos = lesson;
  } else {
    rawVideos = (
      lesson.video ? (Array.isArray(lesson.video) ? lesson.video : [lesson.video]) : []
    ).concat(lesson.extra_videos || []);
  }

  return [...rawVideos].filter(Boolean).sort((a, b) => {
    return parseDurationToSeconds(a && a.duration) - parseDurationToSeconds(b && b.duration);
  });
}

/**
 * Generates the HTML for the sidebar video micro-badge.
 * @param {object} lesson
 * @returns {string} HTML string (or empty if no videos)
 */
export function renderSidebarVideoBadgeHTML(lesson) {
  if (!lesson) return '';
  const sorted = getSortedLessonVideos(lesson);
  if (sorted.length === 0) return '';

  const shortest = sorted[0];
  const shortDur = formatShortDuration(shortest.duration);
  const isEraOnly = sorted.every(
    (v) => v.type === 'era' || (v.url && v.url.includes('era.org.uk')),
  );

  const iconClass = isEraOnly ? 'fa-solid fa-tv' : 'fa-solid fa-play';
  const typeClass = isEraOnly ? 'era' : 'yt';
  const label = shortDur || (isEraOnly ? 'ERA' : 'Vid');
  const countBadge =
    sorted.length > 1 ? `<span class="sidebar-vbadge-count">${sorted.length}</span>` : '';

  // Tooltip with video list
  const tooltipLines = sorted.map((v, i) => {
    const durLabel = v.duration ? ` [${v.duration}]` : '';
    const cleanTitle = (v.title || 'Video Resource').replace(/"/g, '&quot;');
    return `${i + 1}. ${cleanTitle}${durLabel}`;
  });
  const tooltipAttr = tooltipLines.join('&#10;');

  return `<span class="sidebar-lesson-video-badge ${typeClass}" title="${tooltipAttr}"><i class="${iconClass}"></i><span>${label}</span>${countBadge}</span>`;
}
