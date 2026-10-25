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
  if (!durationStr || typeof durationStr !== 'string' || /not found/i.test(durationStr)) return 999999;
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
  if (!durationStr || /not found/i.test(durationStr)) return '';
  const secs = parseDurationToSeconds(durationStr);
  if (secs === 999999) {
    if (/not found/i.test(durationStr)) return '';
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
  if (!durationStr || /not found/i.test(durationStr)) return '';
  const secs = parseDurationToSeconds(durationStr);
  if (secs === 999999) {
    if (/not found/i.test(durationStr)) return '';
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

/**
 * Formats bracketed timestamps ([01:10]) and watch window ranges (00:15–03:45)
 * into high-contrast clickable scrubbing pill buttons.
 * @param {string} htmlText
 * @param {string} youtubeId
 * @param {boolean} inModal
 * @param {string} videoKey
 * @returns {string}
 */
export function formatInteractiveTimestamps(htmlText, youtubeId, inModal = true, videoKey = '') {
  if (!htmlText || typeof htmlText !== 'string') return htmlText;

  // 1. Bracketed timestamps: [01:10], [1:10], [00:45], [1:15:30]
  let result = htmlText.replace(/\[(?:(\d{1,2}):)?(\d{1,2}):(\d{2})\]/g, (match, h, m, s) => {
    const hours = h ? parseInt(h, 10) : 0;
    const mins = parseInt(m, 10);
    const secs = parseInt(s, 10);
    const totalSecs = hours * 3600 + mins * 60 + secs;
    const label = (h ? `${h}:` : '') + `${m.padStart(2, '0')}:${s}`;

    if (inModal) {
      return `<button type="button" class="theater-timestamp-pill" onclick="window.seekTheaterVideo(${totalSecs}, '${youtubeId}')" title="Click to scrub video to ${label}"><i class="fa-solid fa-play"></i> ${label}</button>`;
    } else {
      return `<button type="button" class="theater-timestamp-pill" data-action="open-video-modal" data-youtube="${youtubeId}" ${videoKey ? `data-video-key="${videoKey}"` : ''} data-start="${totalSecs}" title="Watch from ${label} in Theater"><i class="fa-solid fa-play"></i> ${label}</button>`;
    }
  });

  // 2. Watch window range: 00:15–03:45 or 01:10-04:20
  result = result.replace(
    /(?:Recommended\s+(?:Class\s+|Starter\s+)?Watch\s+Window|Recommended\s+Clip):\s*(\d{1,2}:\d{2})\s*[–\-]\s*(\d{1,2}:\d{2})/gi,
    (match, startStr, endStr) => {
      const parts = startStr.split(':').map(Number);
      const totalSecs = parts.length === 2 ? parts[0] * 60 + parts[1] : 0;
      const btnHtml = inModal
        ? `<button type="button" class="theater-timestamp-pill briefing-pill" onclick="window.seekTheaterVideo(${totalSecs}, '${youtubeId}')" title="Click to jump to start of watch window (${startStr})"><i class="fa-solid fa-play"></i> ${startStr}&ndash;${endStr}</button>`
        : `<button type="button" class="theater-timestamp-pill briefing-pill" data-action="open-video-modal" data-youtube="${youtubeId}" ${videoKey ? `data-video-key="${videoKey}"` : ''} data-start="${totalSecs}" title="Watch window in Theater (${startStr}&ndash;${endStr})"><i class="fa-solid fa-play"></i> ${startStr}&ndash;${endStr}</button>`;
      return `Recommended Watch Window: ${btnHtml}`;
    },
  );

  return result;
}

