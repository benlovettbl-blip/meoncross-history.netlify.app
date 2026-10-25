import { cleanQuestionText } from '../data_parser.js';
import { generateKeyIndividualEmbedHTML } from '../key_individuals.js';
import { appStore } from './store.js';
import { getAssetUrl } from './assets.js';
import { getWorkbookPageAnchor } from './workbook_page_map.js';
import { renderAudioPlaybackBar } from './speech.js';
import {
  parseDurationToSeconds,
  formatShortDuration,
  formatProminentDuration,
  cleanVideoDisplayTitle,
  getSortedLessonVideos,
  formatInteractiveTimestamps,
} from './video_utils.js';
import './ks2_guidance.js';

// Module-level fallback to ensure isGCSE never throws ReferenceError
var isGCSE = false;

if (typeof window !== 'undefined') {
  window.toggleAllSpineDrawers = function (btn) {
    const spine = btn
      ? btn.closest('#lesson-chronology-spine')
      : document.getElementById('lesson-chronology-spine');
    if (!spine) return;
    const drawers = spine.querySelectorAll('.cme-spine-causal-drawer');
    const hasClosed = Array.from(drawers).some((d) => !d.open);
    drawers.forEach((d) => {
      d.open = hasClosed;
    });
    if (btn) {
      const textSpan = btn.querySelector('.toggle-spine-text');
      if (textSpan) {
        textSpan.textContent = hasClosed ? 'Collapse All' : 'Expand All';
      }
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = hasClosed ? 'fa-solid fa-compress' : 'fa-solid fa-arrows-up-down';
      }
    }
  };
}

window.formatBold = function (text) {
  if (!text) return '';
  if (typeof text !== 'string') {
    if (typeof text === 'object') {
      if (text.stem) {
        return (
          (text.tier ? '<strong>' + text.tier + ':</strong> ' : '') +
          window.formatBold(text.stem) +
          (text.pupil_focus
            ? ' <span style="display:block; font-size:0.85em; opacity:0.85; margin-top:2px;">(' +
              text.pupil_focus +
              ')</span>'
            : '')
        );
      }
      return '';
    }
    text = String(text);
  }
  let parsed = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Handle blockquotes
  parsed = parsed.replace(
    /(^|\n)> (.*?)(?=\n|$)/g,
    '$1<blockquote style="border-left: 4px solid #cbd5e1; padding-left: 15px; margin-left: 0; color: #475569; font-style: italic; background: rgba(248, 250, 252, 0.5); padding-top: 5px; padding-bottom: 5px; border-radius: 0 4px 4px 0;">$2</blockquote>',
  );
  // Handle headers
  parsed = parsed.replace(
    /(^|\n)### (.*?)(?=\n|$)/g,
    '$1<h4 style="color: #1e3a8a; margin-top: 15px; margin-bottom: 5px;">$2</h4>',
  );
  parsed = parsed.replace(
    /(^|\n)## (.*?)(?=\n|$)/g,
    '$1<h3 style="color: #1e3a8a; margin-top: 15px; margin-bottom: 5px;">$2</h3>',
  );

  parsed = parsed.replace(/\\n/g, '\n');

  // Handle lists
  if (parsed.match(/(^|\n)[\*\-]\s/)) {
    parsed = parsed.replace(/(^|\n)[\*\-]\s+(.*)/g, '$1<li>$2</li>');
    parsed = parsed.replace(
      /(<li>.*<\/li>(?:\n<li>.*<\/li>)*)/g,
      '<ul style="margin-top: 5px; margin-bottom: 5px; padding-left: 20px;">\n$1\n</ul>',
    );
  }

  // Handle italics (after lists so we don't conflict with bullet points)
  parsed = parsed.replace(/\*([^\*]+)\*/g, '<i>$1</i>');

  // Isolate table newline stripping to cme_new to prevent large whitespace before tables
  if (window.currentUnitId === 'cme_new') {
    parsed = parsed.replace(/<table[\s\S]*?<\/table>/gi, (tableHtml) =>
      tableHtml.replace(/\r?\n\s*/g, ' '),
    );
  }

  if (!parsed.trim().startsWith('<table') && !parsed.trim().startsWith('<div')) {
    parsed = parsed.replace(/\n/g, '<br>');
  }
  // Clean up <br> around elements
  if (window.currentUnitId === 'cme_new') {
    parsed = parsed
      .replace(/(?:<br\s*\/?>\s*)+(<table)/gi, '$1')
      .replace(/(<\/table>)(?:\s*<br\s*\/?>)+/gi, '$1');
  }
  parsed = parsed
    .replace(/<br><ul/g, '<ul')
    .replace(/<\/ul><br>/g, '</ul>')
    .replace(/<br><li>/g, '<li>')
    .replace(/<\/li><br>/g, '</li>');
  parsed = parsed
    .replace(/<br><blockquote/g, '<blockquote')
    .replace(/<\/blockquote><br>/g, '</blockquote>');
  parsed = parsed
    .replace(/<br><h/g, '<h')
    .replace(/<\/h4><br>/g, '</h4>')
    .replace(/<\/h3><br>/g, '</h3>');

  return parsed;
};

export function toggleThinkDiscuss(btn, targetId) {
  const panel = typeof targetId === 'string' ? document.getElementById(targetId) : targetId;
  if (!panel) return;
  const isHidden =
    window.getComputedStyle(panel).display === 'none' || panel.style.display === 'none';
  if (isHidden) {
    panel.style.display = 'block';
    panel.classList.add('revealed');
    if (btn) {
      const label = btn.querySelector('.toggle-label');
      if (label) label.textContent = label.dataset.hideText || 'Hide Examples';
      const icon = btn.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-eye-slash';
      btn.style.background = 'linear-gradient(135deg, #64748b 0%, #475569 100%)';
    }
  } else {
    panel.style.display = 'none';
    panel.classList.remove('revealed');
    if (btn) {
      const label = btn.querySelector('.toggle-label');
      if (label) label.textContent = label.dataset.showText || 'Example Answers';
      const icon = btn.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-lightbulb';
      btn.style.background = '';
    }
  }
}
if (typeof window !== 'undefined') {
  window.toggleThinkDiscuss = toggleThinkDiscuss;
}

export function getFallbackDiscussionIdeas(qText, sourceObj = {}) {
  // Quality gate: keyword guessing is disabled to prevent generic, mismatched answers.
  // All exemplar answers must be bespoke and explicitly authored on source.discussion_ideas.
  return null;
}

export function getArchivalSourceDiscussionComponents(
  questionText,
  sourceObj = {},
  isKs2 = false,
  marginTop = '10px',
) {
  let effectiveQ = questionText;
  if (!effectiveQ && sourceObj) {
    effectiveQ = sourceObj.hinge_question || sourceObj.question || sourceObj.source_question;
    if (
      !effectiveQ &&
      sourceObj.source_context &&
      sourceObj.source_context.includes('Hinge Question:')
    ) {
      const parts = sourceObj.source_context.split(/\*{0,2}Hinge Question:\*{0,2}/i);
      if (parts[1]) effectiveQ = parts[1].trim();
    }
  }
  if (!effectiveQ) return { promptHtml: '', panelHtml: '', discussId: '' };
  const cleanQ = cleanQuestionText(effectiveQ);
  const formattedQ =
    typeof window !== 'undefined' && window.formatBold ? window.formatBold(cleanQ) : cleanQ;

  let ideas = sourceObj
    ? sourceObj.discussion_ideas ||
      sourceObj.example_answers ||
      sourceObj.exemplar_answers ||
      (sourceObj.model_answer
        ? Array.isArray(sourceObj.model_answer)
          ? sourceObj.model_answer
          : [sourceObj.model_answer]
        : null)
    : null;
  if (!ideas || !Array.isArray(ideas) || ideas.length === 0) {
    ideas = getFallbackDiscussionIdeas(cleanQ, sourceObj);
  }

  const hasIdeas = Array.isArray(ideas) && ideas.length > 0;
  const isSingle = hasIdeas && ideas.length === 1;
  const discussId = 'think-discuss-' + Math.random().toString(36).substring(2, 9);

  const showBtnLabel = isSingle ? 'Example Answer' : 'Example Answers';
  const hideBtnLabel = isSingle ? 'Hide Example' : 'Hide Examples';
  const panelHeader = isSingle
    ? 'Exemplar Model Answer:'
    : 'Exemplar Discussion Points &amp; Angles:';

  const promptHtml = `
    <div class="archival-source-discussion-box" style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-left: 5px solid #1e40af; padding: 12px 16px; border-radius: 6px; margin-top: ${marginTop}; box-shadow: 0 2px 5px rgba(30, 58, 138, 0.06); width: 100%; box-sizing: border-box;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 14px;">
        <div style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.02rem; color: #1e3a8a; line-height: 1.5; font-weight: 600; display: flex; align-items: flex-start; gap: 9px; flex: 1;">
          <span style="font-size: 1.15rem; line-height: 1.25; flex-shrink: 0;" title="Discussion Prompt">💭</span>
          <span>${formattedQ}</span>
        </div>
        ${
          hasIdeas
            ? `
          <button type="button" class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-clue btn-think-discuss-toggle" data-action="toggle-think-discuss" data-target-id="${discussId}" onclick="if(window.toggleThinkDiscuss){window.toggleThinkDiscuss(this, '${discussId}');}event.stopPropagation();" title="Click to reveal exemplar discussion points for the class" style="padding: 5px 10px; font-size: 0.78rem; text-transform: none; border-radius: 5px; display: inline-flex; align-items: center; justify-content: center; width: 140px; min-width: 140px; gap: 6px; font-weight: 700; cursor: pointer; border: none; box-shadow: 0 1px 3px rgba(0,0,0,0.1); flex-shrink: 0; white-space: nowrap; margin-top: 1px; box-sizing: border-box;">
            <i class="fa-solid fa-lightbulb"></i> <span class="toggle-label" data-show-text="${showBtnLabel}" data-hide-text="${hideBtnLabel}">${showBtnLabel}</span>
          </button>
        `
            : ''
        }
      </div>
    </div>
  `;

  const panelHtml = hasIdeas
    ? `
    <div id="${discussId}" class="think-discuss-exemplar-panel" style="display: none; margin-top: 14px; padding: 14px 18px; background: #ffffff; border: 1.5px solid #bfdbfe; border-radius: 6px; box-shadow: 0 2px 8px rgba(30, 64, 175, 0.08); width: 100%; box-sizing: border-box;">
      <div style="font-size: 0.74rem; font-weight: 800; color: #1e40af; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 10px; display: flex; align-items: center; gap: 6px; border-bottom: 1px solid #e0f2fe; padding-bottom: 6px;">
        <i class="fa-solid fa-graduation-cap" style="color: #2563eb; font-size: 0.85rem;"></i> ${panelHeader}
      </div>
      <div style="display: ${isSingle ? 'block' : 'grid'}; ${isSingle ? '' : 'grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 12px;'}">
        ${ideas
          .map(
            (idea, idx) => `
          <div style="display: flex; gap: 9px; align-items: flex-start; font-size: 0.90rem; color: #1e293b; line-height: 1.45; background: #f8fafc; padding: 10px 13px; border-radius: 5px; border-left: 3.5px solid #3b82f6;">
            <span style="font-weight: 800; color: #1d4ed8; font-size: 0.72rem; background: #dbeafe; padding: 2px 6px; border-radius: 3px; flex-shrink: 0; margin-top: 2px; text-transform: uppercase; letter-spacing: 0.03em;">${isSingle ? 'Model Answer' : `Point ${idx + 1}`}</span>
            <span style="font-weight: 500;">${idea}</span>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>
  `
    : '';

  return { promptHtml, panelHtml, discussId };
}

export function renderArchivalSourceDiscussionBox(
  questionText,
  sourceObj = {},
  isKs2 = false,
  marginTop = '14px',
) {
  const { promptHtml, panelHtml } = getArchivalSourceDiscussionComponents(
    questionText,
    sourceObj,
    isKs2,
    marginTop,
  );
  if (!promptHtml) return '';
  return `
    <div style="width: 100%; box-sizing: border-box;">
      ${promptHtml}
      ${panelHtml}
    </div>
  `;
}

export function getGoldenSentenceExemplar(lesson, vocabTermsList = []) {
  if (lesson && lesson.vocab_golden_sentence) {
    return lesson.vocab_golden_sentence;
  }
  const terms =
    vocabTermsList && vocabTermsList.length > 0
      ? vocabTermsList
      : lesson && lesson.vocab
        ? lesson.vocab.map((v) => (v.term || '').trim()).filter(Boolean)
        : [];
  const t1 = terms[0] || 'the initial developments';
  const t2 = terms[1] || 'subsequent events';
  return `Although ${t1} significantly shaped the early trajectory of this era, ${t2} proved equally decisive because it fundamentally transformed the social and political balance of power.`;
}
window.getGoldenSentenceExemplar = getGoldenSentenceExemplar;

export function getOddOneOutExemplars(lesson, vocabTermsList = []) {
  if (
    lesson &&
    Array.isArray(lesson.vocab_odd_one_out_exemplars) &&
    lesson.vocab_odd_one_out_exemplars.length > 0
  ) {
    return lesson.vocab_odd_one_out_exemplars;
  }
  const terms =
    vocabTermsList && vocabTermsList.length > 0
      ? vocabTermsList
      : lesson && lesson.vocab
        ? lesson.vocab.map((v) => (v.term || '').trim()).filter(Boolean)
        : [];

  if (terms.length < 3) {
    return [
      {
        title: 'Categorical Distinction',
        trio: terms.slice(0, 3),
        odd: terms[0] || 'Term 1',
        reason:
          'Multiple valid historical criteria can distinguish these terms depending on whether you group by political authority, economic trade, or ideological perspective.',
      },
    ];
  }

  const t0 = terms[0];
  const t1 = terms[1];
  const t2 = terms[2];
  const t3 = terms[3] || terms[0];
  const last = terms[terms.length - 1];

  return [
    {
      title: 'Structural Entity vs Broader Concept / Event',
      trio: [t0, t1, last],
      odd: last,
      reason: `${t0} and ${t1} represent concrete institutions or organized polities of this era, whereas ${last} represents a broader concept, event, or overarching historical perspective.`,
    },
    {
      title: 'Regional / Operational Scope',
      trio: [t0, t1, t2],
      odd: t2,
      reason: `While ${t0} and ${t1} operated primarily within the central political power structures of this period, ${t2} played a distinct economic, religious, or external role.`,
    },
    {
      title: 'Cause vs Systemic Consequence',
      trio: [t1, t2, t3],
      odd: t1,
      reason: `${t1} acted as an initial catalyst, whereas ${t2} and ${t3} were sustained, institutional consequences that developed across multiple generations.`,
    },
  ];
}
window.getOddOneOutExemplars = getOddOneOutExemplars;

/**
 * Pedagogical Visual Source Classifier:
 * Determines whether a historical source is an authentic historical painting/fine artwork
 * eligible for Art Spotlight interactive presentation, or a non-painting (e.g. map, photograph,
 * official treaty, clinical photo, cartoon, newspaper headline, propaganda poster).
 */
export function isPaintingSource(source, extraTitle = '') {
  if (!source) return false;
  if (typeof source.is_artwork === 'boolean') return source.is_artwork;
  if (typeof source.is_painting === 'boolean') return source.is_painting;

  const rawTitle = (source.title || '') + ' ' + (extraTitle || '');
  const rawCaption = source.caption || '';
  const rawCitation = source.citation || '';
  const rawMedium = source.medium || '';
  const rawType = source.type || '';
  const combinedText = [
    rawTitle,
    rawCaption,
    rawCitation,
    rawMedium,
    rawType,
    source.provenance || '',
  ]
    .join(' ')
    .toLowerCase();

  // Strong negative indicators - definitely NOT a painting (maps, photos, text documents, coins, prints)
  const strongNonArt =
    /\b(map|cartographic|cartography|chart|diagram|aerial|reconnaissance|photograph|photo\b|snapshot|medical photograph|clinical photograph|film still|press photo|document|treaty|telegram|dispatch|statute|census|record|letter|diary|oral testimony|speech|proclamation|edict|newspaper|headline|front page|broadside|notice|poster|ration book|medal|plaque|coin|graffiti|artefact|artifact|trench network|engraving|woodcut|copperplate|lithograph|etching)\b/i;

  // Explicit mediums indicating a painting
  if (
    rawMedium &&
    /\b(oil|canvas|panel|fresco|watercolor|watercolour|tempera|gouache|mural)\b/i.test(rawMedium)
  ) {
    return true;
  }

  // Explicit source type
  if (rawType === 'painting' || rawType === 'artwork') {
    return true;
  }

  // Strong painting indicators in text
  const strongPainting =
    /\b(oil on canvas|oil on panel|oil on wood|oil on copper|oil on board|fresco|watercolor|watercolour|tempera|gouache|mural|oil painting|altarpiece|triptych|masterpiece|armada portrait|painted by|court painter)\b/i;

  if (strongPainting.test(combinedText)) {
    // If it says "oil on canvas" / "oil painting" / "fresco", it's a painting
    if (/\b(oil on (canvas|panel|wood|board)|oil painting|fresco|tempera)\b/i.test(combinedText)) {
      return true;
    }
    // If the title itself designates a map, chart, or photo, reject
    if (strongNonArt.test(rawTitle)) {
      return false;
    }
    return true;
  }

  // Check if title explicitly describes it as a painting (e.g. "Primary Oil Painting", "Contemporary Painting")
  if (/\b(painting|painted)\b/i.test(rawTitle) && !strongNonArt.test(rawTitle)) {
    return true;
  }

  // Check if caption explicitly describes it as a painting (e.g. "West's painting", "famous painting", "iconic oil painting")
  if (
    /\b([a-z]+['’]s\s+painting|famous\s+painting|contemporary\s+painting|historical\s+painting|iconic\s+painting)\b/i.test(
      rawCaption,
    ) &&
    !strongNonArt.test(rawTitle)
  ) {
    return true;
  }

  // Famous Old Masters / painters explicitly named in citation or title
  if (
    /\b(holbein|cranach|van dyck|vel[aá]zquez|rembrandt|goya|vermeer|rubens|titian|michelangelo|raphael|brueghel|delacroix|werner|bettannier|orpen|turner|constable)\b/i.test(
      combinedText,
    )
  ) {
    if (!strongNonArt.test(rawTitle)) {
      return true;
    }
  }

  return false;
}
window.isPaintingSource = isPaintingSource;

function getRetrievalStarterActions(lesson, currentUnitId) {
  if (currentUnitId === 'cme_new') {
    let kt = 'KT1';
    let pIdx = 0;
    const lTitle = lesson.title || '';
    const lId = lesson.id || '';
    if (
      lTitle.startsWith('KT1') ||
      ['lesson_1', 'lesson_2', 'lesson_3', 'lesson_4'].includes(lId)
    ) {
      kt = 'KT1';
      if (lTitle.includes('KT1.1') || lId === 'lesson_2') pIdx = 1;
      else if (lTitle.includes('KT1.2') || lId === 'lesson_3') pIdx = 2;
      else if (lTitle.includes('KT1.3') || lId === 'lesson_4') pIdx = 3;
      else pIdx = 0;
    } else if (lTitle.startsWith('KT2') || ['lesson_5', 'lesson_6', 'lesson_7'].includes(lId)) {
      kt = 'KT2';
      if (lTitle.includes('KT2.1') || lId === 'lesson_5') pIdx = 0;
      else if (lTitle.includes('KT2.2') || lId === 'lesson_6') pIdx = 1;
      else if (lTitle.includes('KT2.3') || lId === 'lesson_7') pIdx = 2;
    } else if (lTitle.startsWith('KT3') || ['lesson_8', 'lesson_9', 'lesson_10'].includes(lId)) {
      kt = 'KT3';
      if (lTitle.includes('KT3.1') || lId === 'lesson_8') pIdx = 0;
      else if (lTitle.includes('KT3.2') || lId === 'lesson_9') pIdx = 1;
      else if (lTitle.includes('KT3.3') || lId === 'lesson_10') pIdx = 2;
    }

    const shortCode = lTitle.split(':')[0].trim();
    return `
      <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
        <a href="/units/cme_new/mastery_pack_${kt}.html#practice-mode&part=${pIdx}" target="_blank" style="display: inline-flex; align-items: center; gap: 7px; font-size: 0.86rem; padding: 7px 14px; background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%); color: #ffffff; text-decoration: none; font-weight: 700; border-radius: 6px; box-shadow: 0 2px 6px rgba(79,70,229,0.3); transition: all 0.15s ease;" onmouseover="this.style.filter='brightness(1.1)';" onmouseout="this.style.filter='brightness(1)';">
          <i class="fa-solid fa-bolt" style="color: #fde047;"></i>
          Launch ${shortCode} Leitner Drill (20 Cards)
        </a>
        <a href="/units/cme_new/mastery_pack_${kt}.html#practice-mode&part=${pIdx}&teacher=true" target="_blank" style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.86rem; padding: 7px 12px; background: #ffffff; color: #4338ca; border: 1.5px solid #c7d2fe; text-decoration: none; font-weight: 600; border-radius: 6px; transition: all 0.15s ease;" title="Launch classroom whiteboard presentation with 15s timer" onmouseover="this.style.background='#eef2ff';" onmouseout="this.style.background='#ffffff';">
          <i class="fa-solid fa-chalkboard-user"></i>
          Whiteboard
        </a>
        <button class="btn btn-secondary" data-action="switch-view" data-view="interactive" data-unit="cme_new" style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.84rem; padding: 6px 12px; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; font-weight: 600; border-radius: 6px; cursor: pointer;">
          <i class="fa-solid fa-circle-question"></i>
          All Decks
        </button>
      </div>
    `;
  }

  return `
    <button class="btn btn-primary" data-action="switch-view" data-view="interactive" data-unit="${currentUnitId || ''}" style="display: inline-flex; align-items: center; gap: 8px; font-size: 0.88rem; padding: 8px 16px; background: #2563eb; color: #ffffff; border: none; font-weight: 600; border-radius: 6px; cursor: pointer; box-shadow: 0 2px 5px rgba(37,99,235,0.25); transition: all 0.2s ease;">
      <i class="fa-solid fa-circle-question" style="color: #fde047;"></i>
      Jump to Unit Quizzing
    </button>
  `;
}

function renderDoNowHeaderWithTimerHTML({
  timerId = 'donow-timer',
  title = 'Do Now Tasks',
  badgeText = 'Prior Knowledge',
  icon = 'fa-solid fa-list-check',
  showRevealAll = true,
}) {
  return `
    <div class="donow-streamlined-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #e2e8f0; flex-wrap: wrap; gap: 10px;">
      <!-- Title & Pedagogical Badge -->
      <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
        <span style="font-weight: 800; font-size: 0.94rem; color: #0f172a; display: flex; align-items: center; gap: 7px;">
          <i class="${icon}" style="color: #0284c7;"></i> ${title}
        </span>
        ${badgeText ? `<span style="font-size: 0.68rem; font-weight: 700; color: #475569; background: #f1f5f9; border: 1px solid #e2e8f0; padding: 1.5px 7px; border-radius: 10px; text-transform: uppercase; letter-spacing: 0.4px;">${badgeText}</span>` : ''}
      </div>

      <!-- Discreet Inline Stopwatch Timer -->
      <div class="donow-inline-timer-bar" id="${timerId}-bar" style="display: inline-flex; align-items: center; gap: 5px; background: #f8fafc; border: 1.2px solid #cbd5e1; border-radius: 20px; padding: 2.5px 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
        <i class="fa-solid fa-stopwatch" style="color: #0284c7; font-size: 0.85rem; margin-left: 2px;"></i>
        <span id="${timerId}-display" style="font-size: 0.95rem; font-weight: 800; font-family: 'Courier New', monospace; color: #0f172a; min-width: 44px; text-align: center;">05:00</span>
        <span id="${timerId}-summary-badge" style="display: none;">05:00</span>
        <span id="${timerId}-mode-pill" style="display: none;">5 Mins</span>
        
        <div id="${timerId}-presets" style="display: inline-flex; align-items: center; gap: 3px;">
          <button type="button" class="btn-timer-pill" data-sec="180" onclick="event.stopPropagation(); window.setDoNowTimerPreset('${timerId}', 180);" style="padding: 1px 6px; font-size: 0.7rem; font-weight: 700; border-radius: 10px; border: 1px solid #cbd5e1; background: #ffffff; color: #475569; cursor: pointer;" title="3 minutes">3m</button>
          <button type="button" class="btn-timer-pill active-preset" data-sec="300" onclick="event.stopPropagation(); window.setDoNowTimerPreset('${timerId}', 300);" style="padding: 1px 6px; font-size: 0.7rem; font-weight: 700; border-radius: 10px; border: 1.2px solid #0284c7; background: #e0f2fe; color: #0284c7; cursor: pointer;" title="5 minutes">5m</button>
        </div>

        <button type="button" class="btn-timer-ctl" id="${timerId}-start-btn" onclick="event.stopPropagation(); window.toggleDoNowTimer('${timerId}', 'start');" style="padding: 2px 8px; font-weight: 700; font-size: 0.73rem; border-radius: 12px; cursor: pointer; background: #0284c7; color: #ffffff; border: none; display: inline-flex; align-items: center; gap: 3px;" title="Start countdown">
          <i class="fa-solid fa-play" style="font-size: 0.6rem;"></i> Start
        </button>
        <button type="button" class="btn-timer-ctl" id="${timerId}-pause-btn" onclick="event.stopPropagation(); window.toggleDoNowTimer('${timerId}', 'pause');" style="padding: 2px 8px; font-weight: 700; font-size: 0.73rem; border-radius: 12px; cursor: pointer; background: #f59e0b; color: #ffffff; border: none; display: none; align-items: center; gap: 3px;" title="Pause countdown">
          <i class="fa-solid fa-pause" style="font-size: 0.6rem;"></i> Pause
        </button>
        <button type="button" id="${timerId}-reset-btn" onclick="event.stopPropagation(); window.toggleDoNowTimer('${timerId}', 'reset');" style="padding: 2px 5px; font-size: 0.72rem; color: #64748b; background: transparent; border: none; cursor: pointer;" title="Reset timer">
          <i class="fa-solid fa-rotate-right"></i>
        </button>
        <button type="button" id="${timerId}-sound-btn" onclick="event.stopPropagation(); window.toggleDoNowTimerSound('${timerId}');" style="padding: 2px 5px; font-size: 0.72rem; color: #64748b; background: transparent; border: none; cursor: pointer;" title="Toggle audio chime">
          <i class="fa-solid fa-bell-slash" id="${timerId}-sound-icon"></i>
        </button>
      </div>

      <!-- Action (Reveal All) -->
      ${
        showRevealAll
          ? `
        <div style="display: flex; align-items: center; gap: 6px;">
          <button class="btn btn-secondary btn-sm" data-action="toggle-all-answers" onclick="if(window.toggleAllAnswers){window.toggleAllAnswers(this);}event.stopPropagation();" style="font-size: 0.78rem; font-weight: 700; padding: 3px 10px; border-radius: 6px; border: 1px solid #cbd5e1; background: #ffffff; color: #334155; cursor: pointer; display: inline-flex; align-items: center; gap: 5px;">
            <i class="fa-solid fa-eye" style="color: #0284c7; font-size: 0.72rem;"></i>
            <span>Reveal All Answers</span>
          </button>
        </div>
      `
          : ''
      }
    </div>
  `;
}

function renderDoNowTimerBarHTML(timerId = 'donow-timer') {
  return `
    <div class="donow-timer-bar" id="${timerId}-bar" style="grid-column: 1 / -1; width: 100%; display: flex; flex-direction: column; gap: 8px; background: #ffffff; border: 1.5px solid #cbd5e1; border-left: 4px solid #0284c7; border-radius: 8px; padding: 10px 14px; margin-bottom: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.03); box-sizing: border-box;">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        <!-- Left: Stopwatch icon + display + mode -->
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 34px; height: 34px; border-radius: 6px; background: #e0f2fe; color: #0284c7; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0;">
            <i class="fa-solid fa-stopwatch"></i>
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em;">Retrieval Timer</span>
              <span id="${timerId}-mode-pill" style="font-size: 0.7rem; font-weight: 700; color: #0369a1; background: #f0f9ff; padding: 1px 6px; border-radius: 10px; border: 1px solid #bae6fd;">5 Mins</span>
            </div>
            <div style="font-size: 1.35rem; font-weight: 800; font-family: 'Courier New', monospace; color: #0f172a; line-height: 1.1;" id="${timerId}-display">05:00</div>
          </div>
        </div>

        <!-- Center: Quick Preset Pills (Flexi Timer for Teachers) -->
        <div class="timer-preset-pills" id="${timerId}-presets" style="display: flex; align-items: center; gap: 5px; flex-wrap: wrap;">
          <span style="font-size: 0.72rem; font-weight: 700; color: #64748b; margin-right: 2px;">Presets:</span>
          <button type="button" class="btn-timer-pill" data-sec="120" onclick="event.stopPropagation(); window.setDoNowTimerPreset('${timerId}', 120);" style="padding: 3px 8px; font-size: 0.75rem; font-weight: 700; border-radius: 4px; border: 1px solid #cbd5e1; background: #f8fafc; color: #334155; cursor: pointer;">2m</button>
          <button type="button" class="btn-timer-pill" data-sec="180" onclick="event.stopPropagation(); window.setDoNowTimerPreset('${timerId}', 180);" style="padding: 3px 8px; font-size: 0.75rem; font-weight: 700; border-radius: 4px; border: 1px solid #cbd5e1; background: #f8fafc; color: #334155; cursor: pointer;">3m</button>
          <button type="button" class="btn-timer-pill active-preset" data-sec="300" onclick="event.stopPropagation(); window.setDoNowTimerPreset('${timerId}', 300);" style="padding: 3px 8px; font-size: 0.75rem; font-weight: 700; border-radius: 4px; border: 1.5px solid #0284c7; background: #e0f2fe; color: #0369a1; cursor: pointer;">5m</button>
          <button type="button" class="btn-timer-pill" data-sec="480" onclick="event.stopPropagation(); window.setDoNowTimerPreset('${timerId}', 480);" style="padding: 3px 8px; font-size: 0.75rem; font-weight: 700; border-radius: 4px; border: 1px solid #cbd5e1; background: #f8fafc; color: #334155; cursor: pointer;">8m</button>
          <button type="button" class="btn-timer-pill" data-sec="600" onclick="event.stopPropagation(); window.setDoNowTimerPreset('${timerId}', 600);" style="padding: 3px 8px; font-size: 0.75rem; font-weight: 700; border-radius: 4px; border: 1px solid #cbd5e1; background: #f8fafc; color: #334155; cursor: pointer;">10m</button>
        </div>

        <!-- Right: Controls (Start / Pause / Reset / +/- 1m / Mute) -->
        <div style="display: flex; align-items: center; gap: 5px; flex-wrap: wrap;">
          <button type="button" class="btn btn-primary btn-sm" id="${timerId}-start-btn" onclick="event.stopPropagation(); window.toggleDoNowTimer('${timerId}', 'start');" style="padding: 5px 12px; font-weight: 700; font-size: 0.82rem; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; background: #0284c7; color: #fff; border: none;">
            <i class="fa-solid fa-play"></i> Start
          </button>
          <button type="button" class="btn btn-secondary btn-sm" id="${timerId}-pause-btn" onclick="event.stopPropagation(); window.toggleDoNowTimer('${timerId}', 'pause');" style="padding: 5px 12px; font-size: 0.82rem; font-weight: 600; border-radius: 6px; cursor: pointer; display: none; align-items: center; gap: 5px;">
            <i class="fa-solid fa-pause"></i> Pause
          </button>
          <button type="button" class="btn btn-secondary btn-sm" id="${timerId}-sub1-btn" onclick="event.stopPropagation(); window.toggleDoNowTimer('${timerId}', 'sub1');" style="padding: 5px 8px; font-size: 0.8rem; font-weight: 700; border-radius: 6px; cursor: pointer;" title="Subtract 1 minute">-1m</button>
          <button type="button" class="btn btn-secondary btn-sm" id="${timerId}-add1-btn" onclick="event.stopPropagation(); window.toggleDoNowTimer('${timerId}', 'add1');" style="padding: 5px 8px; font-size: 0.8rem; font-weight: 700; border-radius: 6px; cursor: pointer;" title="Add 1 minute">+1m</button>
          <button type="button" class="btn btn-secondary btn-sm" id="${timerId}-reset-btn" onclick="event.stopPropagation(); window.toggleDoNowTimer('${timerId}', 'reset');" style="padding: 5px 10px; font-size: 0.82rem; font-weight: 600; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 5px;" title="Reset timer to start of chosen duration">
            <i class="fa-solid fa-rotate-right"></i> Reset
          </button>
          <button type="button" class="btn btn-secondary btn-sm" id="${timerId}-sound-btn" onclick="event.stopPropagation(); window.toggleDoNowTimerSound('${timerId}');" style="padding: 5px 8px; font-size: 0.8rem; font-weight: 600; border-radius: 6px; cursor: pointer;" title="Toggle audio chime on/off">
            <i class="fa-solid fa-bell-slash" id="${timerId}-sound-icon" style="color: #64748b;"></i>
          </button>
        </div>
      </div>

      <!-- Slim Visual Progress Bar -->
      <div style="width: 100%; height: 4px; background: #e2e8f0; border-radius: 2px; overflow: hidden;">
        <div id="${timerId}-progress" style="width: 100%; height: 100%; background: #0284c7; transition: width 0.5s linear, background 0.3s ease;"></div>
      </div>
    </div>
  `;
}

window.doNowTimers = window.doNowTimers || {};

window.setDoNowTimerPreset = function (timerId, seconds) {
  let timer = window.doNowTimers[timerId];
  if (!timer) {
    timer = {
      totalSeconds: seconds,
      initialSeconds: seconds,
      interval: null,
      isRunning: false,
      isSilent: true,
    };
    window.doNowTimers[timerId] = timer;
  } else {
    if (timer.interval) clearInterval(timer.interval);
    timer.interval = null;
    timer.isRunning = false;
    timer.totalSeconds = seconds;
    timer.initialSeconds = seconds;
  }

  // Update pills UI
  const presetsContainer = document.getElementById(`${timerId}-presets`);
  if (presetsContainer) {
    presetsContainer.querySelectorAll('.btn-timer-pill').forEach((pill) => {
      const sec = parseInt(pill.getAttribute('data-sec'), 10);
      if (sec === seconds) {
        pill.classList.add('active-preset');
        pill.style.border = '1.5px solid #0284c7';
        pill.style.background = '#e0f2fe';
        pill.style.color = '#0369a1';
      } else {
        pill.classList.remove('active-preset');
        pill.style.border = '1px solid #cbd5e1';
        pill.style.background = '#f8fafc';
        pill.style.color = '#334155';
      }
    });
  }

  // Update mode pill
  const modePill = document.getElementById(`${timerId}-mode-pill`);
  if (modePill) {
    const mins = Math.round(seconds / 60);
    modePill.textContent = `${mins} Mins`;
  }

  // Reset button state
  const startBtn = document.getElementById(`${timerId}-start-btn`);
  const pauseBtn = document.getElementById(`${timerId}-pause-btn`);
  if (startBtn) {
    startBtn.style.display = 'inline-flex';
    startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start';
  }
  if (pauseBtn) pauseBtn.style.display = 'none';

  // Update display
  const display = document.getElementById(`${timerId}-display`);
  const summaryBadge = document.getElementById(`${timerId}-summary-badge`);
  const progressBar = document.getElementById(`${timerId}-progress`);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  if (display) {
    display.textContent = formatted;
    display.style.color = '#0f172a';
  }
  if (summaryBadge) {
    summaryBadge.textContent = formatted;
    summaryBadge.style.color = '#0369a1';
  }
  if (progressBar) {
    progressBar.style.width = '100%';
    progressBar.style.background = '#0284c7';
  }
};

window.toggleDoNowTimerSound = function (timerId) {
  let timer = window.doNowTimers[timerId];
  if (!timer) {
    timer = {
      totalSeconds: 300,
      initialSeconds: 300,
      interval: null,
      isRunning: false,
      isSilent: true,
    };
    window.doNowTimers[timerId] = timer;
  }
  timer.isSilent = !timer.isSilent;
  const icon = document.getElementById(`${timerId}-sound-icon`);
  const btn = document.getElementById(`${timerId}-sound-btn`);
  if (icon && btn) {
    if (timer.isSilent) {
      icon.className = 'fa-solid fa-bell-slash';
      icon.style.color = '#64748b';
      btn.title = 'Silent Mode Active (Click to unmute chime)';
    } else {
      icon.className = 'fa-solid fa-bell';
      icon.style.color = '#0284c7';
      btn.title = 'Audio Chime Active (Click to mute)';
    }
  }
};

window.toggleDoNowTimer = function (timerId, action) {
  let timer = window.doNowTimers[timerId];
  if (!timer) {
    timer = {
      totalSeconds: 300,
      initialSeconds: 300,
      interval: null,
      isRunning: false,
      isSilent: true,
    };
    window.doNowTimers[timerId] = timer;
  }

  const display = document.getElementById(`${timerId}-display`);
  const summaryBadge = document.getElementById(`${timerId}-summary-badge`);
  const startBtn = document.getElementById(`${timerId}-start-btn`);
  const pauseBtn = document.getElementById(`${timerId}-pause-btn`);
  const progressBar = document.getElementById(`${timerId}-progress`);

  const updateDisplay = () => {
    const mins = Math.floor(timer.totalSeconds / 60);
    const secs = timer.totalSeconds % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    if (display) {
      display.textContent = formatted;
      if (timer.totalSeconds === 0) {
        display.style.color = '#ef4444';
        display.textContent = "00:00 (Time's Up!)";
      } else if (timer.totalSeconds <= 30) {
        display.style.color = '#ef4444';
      } else {
        display.style.color = '#0f172a';
      }
    }
    if (summaryBadge) {
      summaryBadge.textContent = formatted;
      summaryBadge.style.color = timer.totalSeconds <= 30 ? '#ef4444' : '#0369a1';
    }
    if (progressBar) {
      const pct = Math.max(0, (timer.totalSeconds / (timer.initialSeconds || 300)) * 100);
      progressBar.style.width = pct + '%';
      if (timer.totalSeconds === 0) {
        progressBar.style.background = '#ef4444';
      } else if (timer.totalSeconds <= 30 || pct <= 20) {
        progressBar.style.background = '#f59e0b';
      } else {
        progressBar.style.background = '#0284c7';
      }
    }
  };

  const playChime = () => {
    if (timer.isSilent) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {}
  };

  if (action === 'start') {
    if (timer.isRunning) return;
    if (timer.totalSeconds === 0) timer.totalSeconds = timer.initialSeconds || 300;
    timer.isRunning = true;
    if (startBtn) startBtn.style.display = 'none';
    if (pauseBtn) pauseBtn.style.display = 'inline-flex';

    if (timer.interval) clearInterval(timer.interval);
    timer.interval = setInterval(() => {
      if (timer.totalSeconds > 0) {
        timer.totalSeconds--;
        updateDisplay();
        if (timer.totalSeconds === 0) {
          clearInterval(timer.interval);
          timer.interval = null;
          timer.isRunning = false;
          if (startBtn) {
            startBtn.style.display = 'inline-flex';
            startBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Restart';
          }
          if (pauseBtn) pauseBtn.style.display = 'none';
          playChime();
        }
      }
    }, 1000);
  } else if (action === 'pause') {
    if (!timer.isRunning) return;
    clearInterval(timer.interval);
    timer.interval = null;
    timer.isRunning = false;
    if (startBtn) {
      startBtn.style.display = 'inline-flex';
      startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Resume';
    }
    if (pauseBtn) pauseBtn.style.display = 'none';
  } else if (action === 'reset') {
    if (timer.interval) clearInterval(timer.interval);
    timer.interval = null;
    timer.isRunning = false;
    timer.totalSeconds = timer.initialSeconds || 300;
    updateDisplay();
    if (startBtn) {
      startBtn.style.display = 'inline-flex';
      startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start';
    }
    if (pauseBtn) pauseBtn.style.display = 'none';
  } else if (action === 'add1') {
    timer.totalSeconds += 60;
    if (timer.totalSeconds > timer.initialSeconds) timer.initialSeconds = timer.totalSeconds;
    updateDisplay();
  } else if (action === 'sub1') {
    if (timer.totalSeconds > 60) {
      timer.totalSeconds -= 60;
      updateDisplay();
    }
  } else if (action === 'add5') {
    timer.totalSeconds += 300;
    if (timer.totalSeconds > timer.initialSeconds) timer.initialSeconds = timer.totalSeconds;
    updateDisplay();
  }
};

window.toggleWhiteboardMode = function (forceState) {
  // If in chess view, delegate to chess projector/whiteboard mode
  if (
    document.getElementById('chess-hub-root') ||
    (window.state && window.state.currentView === 'chess') ||
    (typeof window.location !== 'undefined' && window.location.search.includes('view=chess'))
  ) {
    if (typeof window.toggleChessWhiteboardMode === 'function') {
      return window.toggleChessWhiteboardMode(forceState);
    }
  }

  const isCurrentlyActive = document.body.classList.contains('whiteboard-mode-active');
  const nextState = typeof forceState === 'boolean' ? forceState : !isCurrentlyActive;
  if (nextState) {
    document.body.classList.add('whiteboard-mode-active');
  } else {
    document.body.classList.remove('whiteboard-mode-active');
  }
  try {
    localStorage.setItem('whiteboardMode', nextState ? 'true' : 'false');
  } catch (e) {}
  window.syncWhiteboardButtons(nextState);
};

window.syncWhiteboardButtons = function (isActive) {
  const btns = document.querySelectorAll('.btn-whiteboard-toggle');
  btns.forEach((btn) => {
    if (isActive) {
      btn.classList.add('active');
      btn.innerHTML =
        '<i class="fa-solid fa-compress"></i> <span class="wb-btn-label">Standard View</span>';
      btn.title = 'Exit Whiteboard Presentation Mode (restore hero banner)';
    } else {
      btn.classList.remove('active');
      btn.innerHTML =
        '<i class="fa-solid fa-chalkboard"></i> <span class="wb-btn-label">Whiteboard View</span>';
      btn.title =
        'Toggle Whiteboard Presentation Mode (collapses hero banner for classroom projectors)';
    }
  });
  const wbTags = document.querySelectorAll('.wb-status-tag');
  wbTags.forEach((tag) => {
    tag.textContent = isActive ? 'ON' : 'OFF';
    tag.style.background = isActive ? '#dcfce7' : '#f1f5f9';
    tag.style.color = isActive ? '#15803d' : '#475569';
  });
  if (typeof window.updateClassroomToolsBadge === 'function') {
    window.updateClassroomToolsBadge();
  }
};

window.toggleTeacherMode = function (forceState) {
  const isCurrentlyActive = document.body.classList.contains('teacher-mode-active');
  const nextState = typeof forceState === 'boolean' ? forceState : !isCurrentlyActive;
  if (nextState) {
    document.body.classList.add('teacher-mode-active');
  } else {
    document.body.classList.remove('teacher-mode-active');
  }
  try {
    localStorage.setItem('teacherMode', nextState ? 'true' : 'false');
  } catch (e) {}
  window.syncTeacherButtons(nextState);
};

window.syncTeacherButtons = function (isActive) {
  const btns = document.querySelectorAll('.btn-teacher-mode-toggle');
  btns.forEach((btn) => {
    if (isActive) {
      btn.classList.add('active');
      btn.innerHTML =
        '<i class="fa-solid fa-user-tie"></i> <span class="teacher-btn-label">Teacher Mode: ON</span>';
      btn.title = 'Teacher Mode is ON (Click to hide teacher guidance)';
    } else {
      btn.classList.remove('active');
      btn.innerHTML =
        '<i class="fa-solid fa-user-tie"></i> <span class="teacher-btn-label">Teacher Mode</span>';
      btn.title = 'Click to show Teacher Guidance & Delivery Roadmap';
    }
  });
  const teacherTags = document.querySelectorAll('.teacher-status-tag');
  teacherTags.forEach((tag) => {
    tag.textContent = isActive ? 'ON' : 'OFF';
    tag.style.background = isActive ? '#dcfce7' : '#f1f5f9';
    tag.style.color = isActive ? '#15803d' : '#475569';
  });
  if (typeof window.updateClassroomToolsBadge === 'function') {
    window.updateClassroomToolsBadge();
  }
};

window.updateClassroomToolsBadge = function () {};
window.toggleLessonToolsMenu = function () {};
window.closeLessonToolsMenu = function () {};

if (typeof localStorage !== 'undefined' && localStorage.getItem('teacherMode') === 'true') {
  if (typeof document !== 'undefined' && document.body) {
    document.body.classList.add('teacher-mode-active');
  }
}

window.renderLessonByIndex = function (index, skipHistory = false) {
  if (typeof window !== 'undefined' && typeof window.cancelSpeech === 'function') {
    window.cancelSpeech();
  }

  if (
    appStore.state.activeUnitData &&
    appStore.state.activeUnitData.lessons &&
    appStore.state.activeUnitData.lessons[index]
  ) {
    const unitId = appStore.state.selectedUnitId || window.currentUnitId;
    const lesson = appStore.state.activeUnitData.lessons[index];

    if (!skipHistory && typeof window !== 'undefined' && window.history) {
      try {
        const currentScroll = window.scrollY || document.documentElement.scrollTop || 0;
        const currentState = window.history.state || {};
        window.history.replaceState(
          {
            ...currentState,
            scrollY: currentScroll,
          },
          '',
          window.location.href,
        );

        const url = new URL(window.location);
        url.searchParams.set('view', 'lessons');
        url.searchParams.set('lesson', index + 1);
        if (unitId) url.searchParams.set('unit', unitId);
        window.history.pushState(
          {
            view: 'lessons',
            unit: unitId,
            lessonIndex: index,
            scrollY: 0,
          },
          '',
          url,
        );
      } catch (e) {
        console.warn('History routing disabled (e.g. file:// protocol):', e);
      }
    }

    if (typeof window.updateBreadcrumbs === 'function') {
      const lessonTitle = lesson.title || `Lesson ${index + 1}`;
      const activeUnit = appStore.state.activeUnitData || window.currentUnitData || {};
      let unitTitle = activeUnit.title
        ? activeUnit.title.replace(/^(?:Paper \d+:?|KS3:?|GCSE[^:]*:?)\s*/i, '').trim()
        : 'Unit';
      window.updateBreadcrumbs([
        { label: 'Dashboard', view: 'dashboard' },
        { label: unitTitle, view: 'lessons', unit: unitId },
        { label: lessonTitle },
      ]);
    }

    document.querySelectorAll('.lesson-link').forEach((l) => l.classList.remove('active'));
    // Try to activate the corresponding sidebar link
    const matchLink = document.querySelector(`.lesson-link[data-index="${index}"]`);
    if (matchLink) {
      matchLink.classList.add('active');
    } else {
      const links = document.querySelectorAll('.lesson-link');
      const isKS3 =
        appStore.state.activeUnitData.title && appStore.state.activeUnitData.title.includes('KS3');
      if (!isKS3 && links.length > index + 1) {
        // +1 because the first link is Unit Homepage
        links[index + 1].classList.add('active');
      }
    }

    renderLesson(lesson);

    // Auto-save student draft inputs for this lesson
    if (typeof window.initDraftPreservation === 'function') {
      window.initDraftPreservation(
        document.getElementById('content-area') || document,
        `${unitId}_${lesson.id || index}`,
      );
    }

    if (window.scrollToTop) window.scrollToTop(true);
    else
      (document.getElementById('content-area') || window).scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// Register global switchVideoTab handler if in browser
if (typeof window !== 'undefined' && !window.switchVideoTab) {
  window.switchVideoTab = function (btn, sectionId, targetCardId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    // Hide all video cards in this section
    section.querySelectorAll('.archival-video-entry').forEach(function (card) {
      card.style.display = 'none';
    });
    // Show target card
    const targetCard = document.getElementById(targetCardId);
    if (targetCard) {
      targetCard.style.display = 'flex';
    }
    // Update button states
    const tabBtns = section.querySelectorAll('.video-pathway-tab-btn');
    tabBtns.forEach(function (b) {
      b.classList.remove('is-active');
      b.style.background = '#ffffff';
      b.style.color = '#334155';
      b.style.borderColor = '#cbd5e1';
      b.style.fontWeight = '600';
      b.style.boxShadow = '0 1px 2px rgba(0,0,0,0.03)';
      const liveBadge = b.querySelector('.tab-live-badge');
      if (liveBadge) liveBadge.style.display = 'none';
      const platformPill = b.querySelector('.tab-platform-pill');
      if (platformPill) {
        const isEra = platformPill.getAttribute('data-platform') === 'era';
        platformPill.style.background = isEra ? '#eff6ff' : '#fef2f2';
        platformPill.style.color = isEra ? '#1e40af' : '#dc2626';
      }
    });
    btn.classList.add('is-active');
    btn.style.background = '#0f172a';
    btn.style.color = '#ffffff';
    btn.style.borderColor = '#0f172a';
    btn.style.fontWeight = '700';
    btn.style.boxShadow = '0 3px 8px rgba(15,23,42,0.25)';
    const activeLiveBadge = btn.querySelector('.tab-live-badge');
    if (activeLiveBadge) activeLiveBadge.style.display = 'inline-flex';
    const activePill = btn.querySelector('.tab-platform-pill');
    if (activePill) {
      activePill.style.background = 'rgba(255,255,255,0.18)';
      activePill.style.color = '#ffffff';
    }
  };
}

// Register global toggleVideoTaskDrawer handler for 1-Horizontal-Line Video Shelf
if (typeof window !== 'undefined' && !window.toggleVideoTaskDrawer) {
  window.toggleVideoTaskDrawer = function (safeLessonId, idx, e) {
    if (e && e.stopPropagation) e.stopPropagation();
    const drawer = document.getElementById('video-task-drawer-' + safeLessonId);
    if (!drawer) return;
    const targetContent = document.getElementById('video-task-content-' + safeLessonId + '-' + idx);
    const isCurrentlyOpen =
      drawer.style.display !== 'none' && targetContent && targetContent.style.display !== 'none';

    if (isCurrentlyOpen) {
      drawer.style.display = 'none';
      if (targetContent) targetContent.style.display = 'none';
    } else {
      drawer.querySelectorAll('.video-task-item-content').forEach(function (el) {
        el.style.display = 'none';
      });
      if (targetContent) targetContent.style.display = 'block';
      drawer.style.display = 'block';
      drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };
}

// Register global whiteboard reveal handlers for Task 3 & Task 4
if (typeof window !== 'undefined' && !window.toggleSingleEvidence) {
  window.toggleSingleEvidence = function (el) {
    const prompt = el.querySelector('.t3-evidence-prompt');
    const revealed = el.querySelector('.t3-evidence-revealed');
    if (revealed && prompt) {
      const isHidden = revealed.style.display === 'none' || !revealed.style.display;
      revealed.style.display = isHidden ? 'block' : 'none';
      prompt.style.display = isHidden ? 'none' : 'flex';
      el.style.borderColor = isHidden ? '#10b981' : '#86efac';
    }
  };

  window.toggleSingleStarter = function (el) {
    const prompt = el.querySelector('.t3-starter-prompt');
    const revealed = el.querySelector('.t3-starter-revealed');
    if (revealed && prompt) {
      const isHidden = revealed.style.display === 'none' || !revealed.style.display;
      revealed.style.display = isHidden ? 'inline' : 'none';
      prompt.style.display = isHidden ? 'none' : 'flex';
    }
  };

  window.toggleTask3Mask = function (btn) {
    const taskBox = btn.closest('.two-sided-argument-interactive');
    if (!taskBox) return;
    const isRevealing = !btn.classList.contains('is-all-revealed');
    const evidenceItems = taskBox.querySelectorAll('.t3-evidence-item');
    const starters = taskBox.querySelectorAll('.t3-starter-box');

    evidenceItems.forEach(function (el) {
      const prompt = el.querySelector('.t3-evidence-prompt');
      const revealed = el.querySelector('.t3-evidence-revealed');
      if (revealed && prompt) {
        revealed.style.display = isRevealing ? 'block' : 'none';
        prompt.style.display = isRevealing ? 'none' : 'flex';
      }
    });

    starters.forEach(function (el) {
      const prompt = el.querySelector('.t3-starter-prompt');
      const revealed = el.querySelector('.t3-starter-revealed');
      if (revealed && prompt) {
        revealed.style.display = isRevealing ? 'inline' : 'none';
        prompt.style.display = isRevealing ? 'none' : 'flex';
      }
    });

    if (isRevealing) {
      btn.classList.add('is-all-revealed');
      btn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> <span>Mask Whiteboard Clues</span>';
      btn.style.background = '#fef2f2';
      btn.style.borderColor = '#fca5a5';
      btn.style.color = '#991b1b';
    } else {
      btn.classList.remove('is-all-revealed');
      btn.innerHTML =
        '<i class="fa-solid fa-chalkboard-user"></i> <span>Teacher Whiteboard Key</span>';
      btn.style.background = '#ecfdf5';
      btn.style.borderColor = '#6ee7b7';
      btn.style.color = '#065f46';
    }
  };

  window.toggleBbsMask = function (btn) {
    const taskBox = btn.closest('.because-but-so-interactive');
    if (!taskBox) return;
    const isRevealing = !btn.classList.contains('is-all-revealed');
    const models = taskBox.querySelectorAll('.bbs-model-box');

    models.forEach(function (el) {
      el.style.display = isRevealing ? 'block' : 'none';
    });

    const singleBtns = taskBox.querySelectorAll('.btn-single-bbs-model span');
    singleBtns.forEach(function (s) {
      s.textContent = isRevealing ? 'Hide Model' : 'Model Stem';
    });

    if (isRevealing) {
      btn.classList.add('is-all-revealed');
      btn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> <span>Mask Whiteboard Models</span>';
      btn.style.background = '#fef2f2';
      btn.style.borderColor = '#fca5a5';
      btn.style.color = '#991b1b';
    } else {
      btn.classList.remove('is-all-revealed');
      btn.innerHTML =
        '<i class="fa-solid fa-chalkboard-user"></i> <span>Teacher Whiteboard Key</span>';
      btn.style.background = '#eef2ff';
      btn.style.borderColor = '#c7d2fe';
      btn.style.color = '#4338ca';
    }
  };

  window.toggleSingleBbsModel = function (btn) {
    const card = btn.closest('.bbs-card');
    if (!card) return;
    const model = card.querySelector('.bbs-model-box');
    if (!model) return;
    const isHidden = model.style.display === 'none' || !model.style.display;
    model.style.display = isHidden ? 'block' : 'none';
    const span = btn.querySelector('span');
    if (span) {
      span.textContent = isHidden ? 'Hide Model' : 'Model Stem';
    }
  };
}

function parseDurationMinutes(durationStr) {
  if (!durationStr || typeof durationStr !== 'string') return 0;
  const colonMatch = durationStr.match(/(?:(\d+):)?(\d+):(\d+)/);
  if (colonMatch) {
    const hours = colonMatch[1] ? parseInt(colonMatch[1], 10) : 0;
    const minutes = parseInt(colonMatch[2], 10);
    return hours * 60 + minutes;
  }
  let mins = 0;
  const hrMatch = durationStr.match(/(\d+)\s*(?:h|hr|hour)/i);
  if (hrMatch) mins += parseInt(hrMatch[1], 10) * 60;
  const minMatch = durationStr.match(/(\d+)\s*(?:m|min|minute)/i);
  if (minMatch) mins += parseInt(minMatch[1], 10);
  return mins;
}

function resolveVideoPathway(vid) {
  const mins = parseDurationMinutes(vid.duration);
  let pathway = vid.pathway;
  let guidance = vid.teacher_guidance;
  let icon = 'fa-solid fa-route';

  if (!pathway) {
    if (mins > 0 && mins < 5) {
      pathway = 'Quick Summary';
    } else if (mins >= 15) {
      pathway = 'Documentary';
    } else {
      pathway = 'Core Overview';
    }
  }

  const pLower = pathway.toLowerCase();
  if (
    pLower.includes('quick') ||
    pLower.includes('starter') ||
    pLower.includes('summary') ||
    pLower.includes('recap')
  ) {
    icon = 'fa-solid fa-bolt';
  } else if (
    pLower.includes('cinema') ||
    pLower.includes('dramatisation') ||
    pLower.includes('trailer') ||
    pLower.includes('film')
  ) {
    icon = 'fa-solid fa-clapperboard';
  } else if (pLower.includes('israeli')) {
    icon = 'fa-solid fa-landmark';
  } else if (pLower.includes('palestinian') || pLower.includes('arab')) {
    icon = 'fa-solid fa-users';
  } else if (
    pLower.includes('deep') ||
    pLower.includes('documentary') ||
    pLower.includes('in-depth') ||
    pLower.includes('tactics') ||
    pLower.includes('mechanics') ||
    pLower.includes('masterclass')
  ) {
    icon = 'fa-solid fa-magnifying-glass-chart';
  } else if (
    pLower.includes('context') ||
    pLower.includes('causes') ||
    pLower.includes('strategic')
  ) {
    icon = 'fa-solid fa-globe';
  } else if (pLower.includes('alliance') || pLower.includes('camp')) {
    icon = 'fa-solid fa-handshake';
  } else if (
    pLower.includes('balkan') ||
    pLower.includes('flashpoint') ||
    pLower.includes('narrative')
  ) {
    icon = 'fa-solid fa-fire';
  }

  if (!guidance) {
    if (mins > 0 && mins < 5) {
      guidance = 'Ideal for starter recaps, rapid retrieval hooks, or SEN visual scaffolding.';
    } else if (mins >= 15) {
      guidance = 'Recommended for flipped homework, independent research, or high-attainer depth.';
    } else {
      guidance = 'Recommended for direct whole-class instruction or guided dual-coding notes.';
    }
  }

  return { pathway, guidance, icon };
}

function renderCausalDominoSpine(spine) {
  if (!spine || !Array.isArray(spine.stages) || spine.stages.length === 0) return '';
  const stages = spine.stages;

  const connectives = [
    'In direct reaction to this...',
    'Alarmed by Soviet arms, the West...',
    'Outraged by canal seizure, Eden colludes...',
    'Furious at unapproved war, Eisenhower ultimatums...',
  ];

  let stagesHtml = stages
    .map((s, idx) => {
      const isLast = idx === stages.length - 1;
      const connective = !isLast ? s.connective || connectives[idx] || 'Consequently...' : null;

      return `
      <div class="causal-domino-card" data-stage="${s.step}" style="background: #ffffff; border: 1.5px solid #cbd5e1; border-top: 4px solid ${idx === 4 ? '#10b981' : '#0284c7'}; border-radius: 8px; padding: 12px 10px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 2px 6px rgba(0,0,0,0.04); min-width: 0; box-sizing: border-box; position: relative;">
        <div>
          <!-- Header -->
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 4px; margin-bottom: 6px;">
            <span style="background: #0f172a; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: 800; padding: 2px 6px; border-radius: 3px; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap;">STAGE ${s.step}</span>
            <span style="font-family: 'Inter', sans-serif; font-size: 0.68rem; font-weight: 800; color: #0284c7; text-align: right; line-height: 1.25;" title="${s.date}">${s.date}</span>
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 0.63rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.3px; margin-bottom: 5px; line-height: 1.35;" title="${s.tag} • ${s.actor}">
            ${s.tag} &bull; <strong style="color: #334155;">${s.actor}</strong>
          </div>
          <h4 style="font-family: 'Playfair Display', Georgia, serif; font-size: 0.98rem; font-weight: 800; color: #0f172a; margin: 0 0 10px 0; line-height: 1.25; min-height: 2.4em;">
            ${s.title}
          </h4>

          <!-- Row 1: The Action / Trigger -->
          <div style="background: #f8fafc; border-left: 3px solid #0284c7; padding: 6px 8px; border-radius: 0 4px 4px 0; margin-bottom: 8px;">
            <div style="font-size: 0.62rem; font-weight: 800; color: #0369a1; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 2px;">
              Action / Trigger:
            </div>
            <div style="font-size: 0.78rem; color: #1e293b; line-height: 1.35;">
              ${s.trigger}
            </div>
          </div>

          <!-- Row 2: The 'Because' (Motive) -->
          <div class="domino-because-box" style="background: #fefce8; border-left: 3px solid #eab308; padding: 6px 8px; border-radius: 0 4px 4px 0; margin-bottom: 8px;">
            <div style="font-size: 0.62rem; font-weight: 800; color: #854d0e; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 2px;">
              Motive:
            </div>
            <div class="domino-content-model" style="font-size: 0.78rem; color: #713f12; line-height: 1.35;">
              ${s.because}
            </div>
            
          </div>

          <!-- Row 3: The 'Therefore' (Consequence) -->
          <div class="domino-therefore-box" style="background: #f0fdf4; border-left: 3px solid #22c55e; padding: 6px 8px; border-radius: 0 4px 4px 0; margin-bottom: 8px;">
            <div style="font-size: 0.62rem; font-weight: 800; color: #166534; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 2px;">
              Consequence:
            </div>
            <div class="domino-content-model" style="font-size: 0.78rem; color: #14532d; line-height: 1.35;">
              ${s.therefore}
            </div>
            
          </div>

          

          <!-- Connective Step Banner -->
          ${
            connective
              ? `
            <div style="margin: 4px 0 8px 0; padding: 4px 6px; background: #eff6ff; border: 1px dashed #bfdbfe; border-radius: 4px; font-size: 0.68rem; color: #1e40af; font-weight: 700; line-height: 1.25; text-align: center;">
              <i class="fa-solid fa-arrow-down" style="color: #2563eb; display: block; margin-bottom: 2px;"></i>
              ${connective}
            </div>
          `
              : ''
          }
        </div>

        <!-- Exam Link Footer -->
        <div style="border-top: 1px solid #e2e8f0; padding-top: 6px; margin-top: auto;">
          <div style="display: flex; align-items: flex-start; gap: 4px; font-size: 0.68rem; font-weight: 700; color: #475569; line-height: 1.25;">
            <i class="fa-solid fa-bullseye" style="color: #dc2626; margin-top: 2px; flex-shrink: 0;"></i>
            <span>${s.exam_link}</span>
          </div>
        </div>
      </div>
    `;
    })
    .join('');

  return `
    <section class="causal-domino-section" id="causal-domino-scaffold" style="margin: 30px 0 35px 0; background: #ffffff; border: 2px solid #0f172a; border-radius: 10px; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08); overflow: hidden;">
      <style>
        .causal-domino-grid-layout {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 10px;
          padding: 16px;
          background: #f8fafc;
          box-sizing: border-box;
          width: 100%;
          overflow-x: hidden;
        }
        @media (max-width: 1024px) {
          .causal-domino-grid-layout {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 12px;
          }
        }
        @media (max-width: 680px) {
          .causal-domino-grid-layout {
            grid-template-columns: 1fr;
          }
        }
        .btn-domino-mode {
          transition: all 0.15s ease;
        }
        .btn-domino-mode:hover {
          filter: brightness(1.1);
        }
      </style>

      <!-- Scaffold Header Bar -->
      <div style="background: #0f172a; color: #ffffff; padding: 12px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
          <span style="background: #eab308; color: #000000; font-family: 'Inter', sans-serif; font-size: 0.72rem; font-weight: 900; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
            BOARD MODE &bull; PRE-EXAM CAUSAL CONSOLIDATION
          </span>
          <div>
            <h3 style="margin: 0; font-family: 'Playfair Display', Georgia, serif; font-size: 1.25rem; font-weight: 800; color: #ffffff;">
              ${spine.title}
            </h3>
            <div style="font-family: 'Inter', sans-serif; font-size: 0.76rem; color: #cbd5e1; margin-top: 2px;">
              ${spine.subtitle}
            </div>
          </div>
        </div>

        <!-- Mode Toggle & Copy Actions -->
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <button type="button" onclick="window.copyDominoNotes()" id="btn-copy-domino" style="padding: 6px 12px; font-size: 0.74rem; font-weight: 700; background: #334155; color: #f8fafc; border: 1px solid #475569; border-radius: 5px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s ease;" title="Copy all 5 stages as text notes to paste into your book/OneNote">
            <i class="fa-solid fa-copy"></i> Copy Notes
          </button>
        </div>
      </div>

      <!-- Live Interactive Status Banner -->
      <div id="domino-status-banner" style="background: #ecfdf5; border-bottom: 1px solid #a7f3d0; padding: 7px 18px; font-size: 0.8rem; font-weight: 700; color: #065f46; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
        <span id="domino-status-text" style="display: flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-circle-check" style="color: #10b981;"></i> <strong>Teacher Answer Key Active:</strong> All 5 causal triggers, motives, and consequences are fully revealed for whole-class board instruction.
        </span>
        <span style="font-size: 0.72rem; font-weight: 800; color: #047857; text-transform: uppercase; letter-spacing: 0.5px;">
          <i class="fa-solid fa-graduation-cap"></i> Edexcel Paper 2 Synthesis Bridge
        </span>
      </div>

      <!-- Strategy Strip -->
      <div style="background: #f8fafc; border-bottom: 1px solid #e2e8f0; padding: 8px 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; font-size: 0.8rem; color: #475569;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-lightbulb" style="color: #eab308; font-size: 0.95rem;"></i>
          <span><strong>The 3-Step Disciplinary Rule:</strong> To write an 8-mark Paper 2 narrative account, record <strong>1. The Action</strong> &rarr; <strong>2. The 'Because' (Motive)</strong> &rarr; <strong>3. The 'Therefore' (Consequence)</strong>.</span>
        </div>
        <span style="font-size: 0.72rem; font-weight: 700; color: #0284c7; text-transform: uppercase; letter-spacing: 0.5px;">
          5-Stage Non-Scrollable Smartboard View
        </span>
      </div>

      <!-- 5-Stage Non-Scrollable Grid Container -->
      <div class="causal-domino-grid-layout">
        ${stagesHtml}
      </div>
    </section>
  `;
}

// Client helper bindings
if (typeof window !== 'undefined') {
  window.switchDominoMode = function (mode) {
    const btnModel = document.getElementById('domino-btn-model');
    const btnPractice = document.getElementById('domino-btn-practice');
    const statusBanner = document.getElementById('domino-status-banner');
    const statusText = document.getElementById('domino-status-text');
    const modelEls = document.querySelectorAll('.domino-content-model');
    const practiceEls = document.querySelectorAll('.domino-content-practice');
    const revealBtns = document.querySelectorAll('.domino-card-reveal-btn');

    if (mode === 'practice') {
      if (btnModel) {
        btnModel.style.background = 'transparent';
        btnModel.style.color = '#94a3b8';
        btnModel.classList.remove('active');
      }
      if (btnPractice) {
        btnPractice.style.background = '#0284c7';
        btnPractice.style.color = '#ffffff';
        btnPractice.classList.add('active');
      }
      if (statusBanner && statusText) {
        statusBanner.style.background = '#fffbeb';
        statusBanner.style.borderBottom = '1px solid #fde68a';
        statusBanner.style.color = '#92400e';
        statusText.innerHTML =
          '<i class="fa-solid fa-pen-to-square" style="color: #f59e0b;"></i> <strong>Student Practice Mode Active:</strong> Motives & results are blanked out. Tap "Reveal Stage" on any card below to reveal step-by-step.';
      }
      modelEls.forEach((el) => (el.style.display = 'none'));
      practiceEls.forEach((el) => (el.style.display = 'block'));
      revealBtns.forEach((el) => (el.style.display = 'block'));
    } else {
      if (btnModel) {
        btnModel.style.background = '#0284c7';
        btnModel.style.color = '#ffffff';
        btnModel.classList.add('active');
      }
      if (btnPractice) {
        btnPractice.style.background = 'transparent';
        btnPractice.style.color = '#94a3b8';
        btnPractice.classList.remove('active');
      }
      if (statusBanner && statusText) {
        statusBanner.style.background = '#ecfdf5';
        statusBanner.style.borderBottom = '1px solid #a7f3d0';
        statusBanner.style.color = '#065f46';
        statusText.innerHTML =
          '<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> <strong>Teacher Answer Key Active:</strong> All 5 causal triggers, motives, and consequences are fully revealed for whole-class board instruction.';
      }
      modelEls.forEach((el) => (el.style.display = 'block'));
      practiceEls.forEach((el) => (el.style.display = 'none'));
      revealBtns.forEach((el) => (el.style.display = 'none'));
    }
  };

  window.revealSingleStage = function (step) {
    const card = document.querySelector(`.causal-domino-card[data-stage="${step}"]`);
    if (!card) return;
    const modelEls = card.querySelectorAll('.domino-content-model');
    const practiceEls = card.querySelectorAll('.domino-content-practice');
    const btn = document.getElementById(`btn-reveal-stage-${step}`);

    const isCurrentlyHidden = modelEls[0] && modelEls[0].style.display === 'none';
    if (isCurrentlyHidden) {
      modelEls.forEach((el) => (el.style.display = 'block'));
      practiceEls.forEach((el) => (el.style.display = 'none'));
      if (btn) {
        btn.innerHTML = `<i class="fa-solid fa-check"></i> Stage ${step} Revealed (Hide)`;
        btn.style.background = '#16a34a';
      }
    } else {
      modelEls.forEach((el) => (el.style.display = 'none'));
      practiceEls.forEach((el) => (el.style.display = 'block'));
      if (btn) {
        btn.innerHTML = `<i class="fa-solid fa-eye"></i> Reveal Stage ${step} Model`;
        btn.style.background = '#0284c7';
      }
    }
  };

  window.copyDominoNotes = function () {
    const cards = document.querySelectorAll('.causal-domino-card, .cme-spine-card');
    if (!cards || cards.length === 0) return;
    const titleEl = document.querySelector(
      '#causal-domino-scaffold h3, #lesson-chronology-spine summary span',
    );
    const rawTitle = titleEl ? titleEl.textContent.trim() : '5-Stage Causal Domino Chain';
    const pageTitle = rawTitle.replace(/\s+/g, ' ');
    let out =
      `${pageTitle} (Edexcel Paper 2)\n` +
      '===================================================================\n\n';
    cards.forEach((c) => {
      const stage = c.dataset.stage || '';
      const title = c.querySelector('h4, h5')?.textContent?.trim() || '';
      const trigger =
        c.querySelector('.cme-spine-desc')?.textContent?.trim() ||
        c
          .querySelector('.causal-domino-card > div > div:nth-child(4) > div:last-child')
          ?.textContent?.trim() ||
        '';
      const because =
        c.querySelector('.cme-drawer-because .cme-quiz-content')?.textContent?.trim() ||
        c.querySelector('.cme-drawer-because span')?.textContent?.trim() ||
        c.querySelector('.domino-because-box .domino-content-model')?.textContent?.trim() ||
        '';
      const therefore =
        c.querySelector('.cme-drawer-therefore .cme-quiz-content')?.textContent?.trim() ||
        c.querySelector('.cme-drawer-therefore span')?.textContent?.trim() ||
        c.querySelector('.domino-therefore-box .domino-content-model')?.textContent?.trim() ||
        '';

      out += `STAGE ${stage}: ${title}\n`;
      if (trigger) out += `• 1. Action / Trigger: ${trigger}\n`;
      if (because) out += `• 2. Because (Motive): ${because}\n`;
      if (therefore) out += `• 3. Therefore (Consequence): ${therefore}\n`;
      out += '\n';
    });

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(out).then(() => {
        const btn =
          document.getElementById('btn-copy-domino') ||
          document.querySelector('.cme-chronology-spine button[onclick*="copyDominoNotes"]');
        if (btn) {
          const orig = btn.innerHTML;
          btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied Notes!';
          btn.style.background = '#16a34a';
          btn.style.color = '#ffffff';
          setTimeout(() => {
            btn.innerHTML = orig;
            btn.style.background = '';
            btn.style.color = '';
          }, 2000);
        }
      });
    }
  };

  window.toggleAllCausalSpineDrawers = function () {
    const drawers = document.querySelectorAll('.cme-causal-drawer');
    if (!drawers || drawers.length === 0) return;
    const labelEl = document.getElementById('toggle-causal-label');
    const anyClosed = Array.from(drawers).some((d) => !d.open);
    drawers.forEach((d) => {
      d.open = anyClosed;
    });
    if (labelEl) {
      labelEl.textContent = anyClosed ? 'Collapse Causal Analysis' : 'Expand Causal Analysis';
    }
  };

  window.toggleCmeSpineQuizMode = function () {
    const spine = document.getElementById('lesson-chronology-spine');
    if (!spine) return;
    const isQuiz = spine.classList.toggle('cme-quiz-active');
    const btn = document.getElementById('btn-cme-quiz-mode');
    const label = document.getElementById('cme-quiz-label');
    const subbar = document.getElementById('cme-quiz-subbar');
    const drawers = spine.querySelectorAll('.cme-causal-drawer');

    if (isQuiz) {
      // Auto-open all drawers so masked targets are visible for active recall
      drawers.forEach((d) => {
        d.open = true;
      });
      const toggleLabel = document.getElementById('toggle-causal-label');
      if (toggleLabel) toggleLabel.textContent = 'Collapse Causal Analysis';

      if (btn) {
        btn.style.background = '#fef08a';
        btn.style.color = '#713f12';
        btn.style.borderColor = '#eab308';
      }
      if (label) {
        label.innerHTML = '<i class="fa-solid fa-circle-check"></i> Quiz Mode Active';
      }
      if (subbar) {
        subbar.style.display = 'flex';
      }
    } else {
      if (btn) {
        btn.style.background = '#fefce8';
        btn.style.color = '#854d0e';
        btn.style.borderColor = '#fef08a';
      }
      if (label) {
        label.textContent = 'Self-Quiz Mode';
      }
      if (subbar) {
        subbar.style.display = 'none';
      }
      // Reset all revealed targets
      spine.querySelectorAll('.cme-quiz-target.revealed').forEach((el) => {
        el.classList.remove('revealed');
      });
      const revealBtn = document.getElementById('btn-reveal-all-quiz');
      if (revealBtn) {
        revealBtn.innerHTML = '<i class="fa-solid fa-eye"></i> Reveal All';
      }
    }
  };

  window.revealQuizTarget = function (el, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const target = el && el.closest ? el.closest('.cme-quiz-target') || el : el;
    if (target) {
      target.classList.toggle('revealed');
    }
  };

  window.revealAllCmeQuizBlanks = function () {
    const spine = document.getElementById('lesson-chronology-spine');
    if (!spine) return;
    const targets = spine.querySelectorAll('.cme-quiz-target');
    const anyUnrevealed = Array.from(targets).some((t) => !t.classList.contains('revealed'));
    targets.forEach((t) => {
      if (anyUnrevealed) t.classList.add('revealed');
      else t.classList.remove('revealed');
    });
    const btn = document.getElementById('btn-reveal-all-quiz');
    if (btn) {
      btn.innerHTML = anyUnrevealed
        ? '<i class="fa-solid fa-eye-slash"></i> Hide All'
        : '<i class="fa-solid fa-eye"></i> Reveal All';
    }
  };
}

// ============================================================================
// BESPOKE LESSON NOTE-TAKING SCAFFOLD (Digital Web App Active Reading Standard)
// ============================================================================
function renderLessonNoteScaffold(lesson, unitId) {
  if (!lesson || !lesson.note_scaffold || !Array.isArray(lesson.note_scaffold.blocks)) {
    return '';
  }

  const scaffold = lesson.note_scaffold;
  const blocks = scaffold.blocks;
  const lessonId = lesson.id || 'lesson';

  let blocksHtml = blocks
    .map((b, idx) => {
      const blockNum = b.num || idx + 1;
      const blockBadge = b.badge || 'ENQUIRY';
      const blockTitle = b.title || `Enquiry ${blockNum}`;
      const blockPrompt = b.prompt || '';
      const keyTerms = Array.isArray(b.key_terms) ? b.key_terms : [];
      const modelNotes = Array.isArray(b.model_notes) ? b.model_notes : [];

      const keyTermsHtml =
        keyTerms.length > 0
          ? `
          <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 8px;">
            <span style="font-size: 0.67rem; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.4px;">
              <i class="fa-solid fa-key" style="color: #64748b; margin-right: 3px;"></i> Must-Use Terms:
            </span>
            ${keyTerms
              .map(
                (t) =>
                  `<span style="background: #f1f5f9; color: #0f172a; border: 1px solid #cbd5e1; font-size: 0.72rem; font-weight: 700; padding: 2px 7px; border-radius: 4px; font-family: 'Inter', sans-serif;">${t}</span>`,
              )
              .join('')}
          </div>
        `
          : '';

      return `
      <div class="note-scaffold-card" data-block="${blockNum}" style="background: #ffffff; border: 1.5px solid #cbd5e1; border-top: 4px solid #0284c7; border-radius: 8px; padding: 14px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 1px 4px rgba(0,0,0,0.03); min-width: 0; box-sizing: border-box;">
        <div>
          <!-- Header -->
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 6px;">
            <span style="background: #0f172a; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: 800; padding: 2px 7px; border-radius: 3px; text-transform: uppercase; letter-spacing: 0.5px;">ENQUIRY ${blockNum}</span>
            <span style="font-family: 'Inter', sans-serif; font-size: 0.66rem; font-weight: 800; color: #0284c7; background: #e0f2fe; padding: 2px 7px; border-radius: 3px; text-transform: uppercase; letter-spacing: 0.4px;">${blockBadge}</span>
          </div>

          <h4 style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.02rem; font-weight: 800; color: #0f172a; margin: 0 0 8px 0; line-height: 1.3; min-height: 2.6em;">
            ${blockTitle}
          </h4>

          ${keyTermsHtml}

          <!-- Prompt Box (Cleaned - No AI Fluff) -->
          <div style="background: #f8fafc; border-left: 3px solid #0284c7; padding: 9px 12px; border-radius: 0 4px 4px 0; margin-bottom: 10px;">
            <div style="font-size: 0.84rem; color: #1e293b; line-height: 1.45; font-weight: 600;">
              ${blockPrompt}
            </div>
          </div>

          <!-- Pupil Interactive Textarea (Streamlined - Max Writing Room) -->
          <div style="margin-bottom: 10px; position: relative;">
            <textarea class="note-scaffold-textarea" id="note-text-${lessonId}-${idx}" rows="4" placeholder="" oninput="window.saveNoteScaffoldInput('${lessonId}', ${idx}, this.value);" style="width: 100%; box-sizing: border-box; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 9px 11px; font-family: 'Inter', sans-serif; font-size: 0.83rem; line-height: 1.45; color: #0f172a; resize: vertical; min-height: 85px; background: #ffffff; transition: border-color 0.2s ease;" onfocus="this.style.borderColor='#0284c7';" onblur="this.style.borderColor='#cbd5e1';"></textarea>
            <span id="note-card-saved-${lessonId}-${idx}" style="position: absolute; right: 8px; bottom: 8px; font-size: 0.65rem; font-weight: 700; color: #10b981; opacity: 0; transition: opacity 0.2s ease; background: rgba(255,255,255,0.92); padding: 1px 5px; border-radius: 3px; pointer-events: none; border: 1px solid #bbf7d0;">✓ Saved</span>
          </div>

          <!-- Model Exemplar Notes Box -->
          <div class="note-model-drawer" id="note-model-${lessonId}-${idx}" style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 6px; padding: 10px 12px; margin-top: 6px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
              <span style="font-size: 0.68rem; font-weight: 800; color: #166534; text-transform: uppercase; letter-spacing: 0.5px;">
                <i class="fa-solid fa-award" style="color: #16a34a; margin-right: 4px;"></i> Core Historical Evidence
              </span>
              <button type="button" class="btn-reveal-model" id="btn-toggle-model-${lessonId}-${idx}" onclick="window.toggleSingleNoteModel('${lessonId}', ${idx}, event);" style="font-size: 0.68rem; font-weight: 700; color: #15803d; background: #dcfce7; border: 1px solid #86efac; border-radius: 3px; padding: 1px 6px; cursor: pointer;">
                Hide Model
              </button>
            </div>
            <ul class="note-model-bullets" id="bullets-${lessonId}-${idx}" style="margin: 0; padding-left: 18px; font-size: 0.78rem; color: #14532d; line-height: 1.45;">
              ${modelNotes.map((m) => `<li style="margin-bottom: 4px;">${m}</li>`).join('')}
            </ul>
            <div class="note-quiz-mask" id="mask-${lessonId}-${idx}" style="display: none; padding: 8px 6px; text-align: center;">
              <button type="button" class="btn-quiz-mask" id="btn-quiz-mask-${lessonId}-${idx}" onclick="window.revealSingleNoteQuizMask('${lessonId}', ${idx}, event);" style="padding: 5px 12px; font-size: 0.74rem; font-weight: 700; background: #16a34a; color: #ffffff; border: 1px solid #15803d; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; transition: all 0.15s ease;">
                <i class="fa-solid fa-eye"></i> Click to Reveal Model Evidence
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join('');

  return `
    <details id="lesson-note-scaffold" class="lesson-note-scaffold-details" style="background: #ffffff; border: 1.5px solid #cbd5e1; border-top: 4px solid #0284c7; border-radius: 8px; margin-bottom: 20px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.04);" closed>
      <summary style="padding: 11px 16px; cursor: pointer; color: #0f172a; font-weight: bold; font-size: 1.05rem; background: #f8fafc; list-style: none; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; user-select: none;">
        <span style="display: flex; align-items: center; gap: 10px;">
          <span style="background: #0284c7; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 0.68rem; font-weight: 800; padding: 2.5px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Core Task</span>
          <span style="font-weight: 800; font-size: 0.98rem; color: #0f172a; font-family: 'Inter', sans-serif;">Active Reading Notes &bull; 3 Core Enquiries</span>
        </span>
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;" onclick="event.stopPropagation();">
          <button type="button" onclick="window.copyNoteScaffoldToClipboard('${lessonId}', event);" id="btn-copy-notes-${lessonId}" style="font-size: 0.82rem; padding: 3px 9px; background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; font-weight: 700;" title="Copy notes to clipboard">
            <i class="fa-solid fa-copy"></i> <span id="copy-notes-label-${lessonId}">Copy Notes</span>
          </button>
          <button type="button" onclick="window.printNoteScaffoldSheet('${lessonId}', event);" style="font-size: 0.82rem; padding: 3px 9px; background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; font-weight: 700;" title="Print clean 1-page A4 note-taking sheet">
            <i class="fa-solid fa-print"></i> Print A4 Sheet
          </button>
          <span id="note-scaffold-save-indicator-${lessonId}" style="font-size: 0.72rem; font-weight: 700; color: #10b981; opacity: 0; transition: opacity 0.3s ease;">✓ Auto-Saved</span>
          <i class="fa-solid fa-chevron-down" style="color: #64748b; margin-left: 6px;"></i>
        </div>
      </summary>

      <!-- Active Instructions Sub-Bar -->
      <div style="padding: 9px 16px; background: #f0f9ff; border-bottom: 1px solid #bae6fd; font-size: 0.83rem; color: #0369a1; line-height: 1.45;">
        <strong style="color: #0c4a6e;"><i class="fa-solid fa-pen-to-square" style="color: #0284c7; margin-right: 5px;"></i> Active Lesson Task:</strong> ${scaffold.instruction} <span style="color: #475569; margin-left: 6px;">(Complete these 3 enquiry notes from the chapter narrative below before completing your printed workbook).</span>
      </div>

      <!-- 3-Block Grid -->
      <div class="note-scaffold-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; padding: 16px; background: #f8fafc;">
        ${blocksHtml}
      </div>
    </details>
  `;
}

if (typeof window !== 'undefined') {
  window.saveNoteScaffoldInput = function (lessonId, blockIdx, val) {
    try {
      localStorage.setItem(`med_note_${lessonId}_${blockIdx}`, val);
      const cardSaved = document.getElementById(`note-card-saved-${lessonId}-${blockIdx}`);
      const overallSaved = document.getElementById(`note-scaffold-save-indicator-${lessonId}`);
      if (cardSaved) {
        cardSaved.style.opacity = '1';
        clearTimeout(window[`cardSaveTimer_${lessonId}_${blockIdx}`]);
        window[`cardSaveTimer_${lessonId}_${blockIdx}`] = setTimeout(() => {
          cardSaved.style.opacity = '0';
        }, 1200);
      }
      if (overallSaved) {
        overallSaved.style.opacity = '1';
        clearTimeout(window[`saveTimer_${lessonId}`]);
        window[`saveTimer_${lessonId}`] = setTimeout(() => {
          overallSaved.style.opacity = '0';
        }, 1500);
      }
    } catch (e) {
      console.error('Failed to save note to localStorage:', e);
    }
  };

  window.toggleSingleNoteModel = function (lessonId, blockIdx, event) {
    if (event && event.stopPropagation) event.stopPropagation();
    const bullets = document.getElementById(`bullets-${lessonId}-${blockIdx}`);
    const btn = document.getElementById(`btn-toggle-model-${lessonId}-${blockIdx}`);
    if (!bullets || !btn) return;
    const isHidden = bullets.style.display === 'none';
    if (isHidden) {
      bullets.style.display = 'block';
      btn.textContent = 'Hide Model';
    } else {
      bullets.style.display = 'none';
      btn.textContent = 'Show Model';
    }
  };

  window.toggleNoteScaffoldQuizMode = function (lessonId, event) {
    if (event && event.stopPropagation) event.stopPropagation();
    window.noteScaffoldQuizActive = !window.noteScaffoldQuizActive;
    const label = document.getElementById('note-scaffold-quiz-label');
    const btn = document.getElementById('btn-note-scaffold-quiz-mode');
    const cards = document.querySelectorAll('#lesson-note-scaffold .note-scaffold-card');

    if (window.noteScaffoldQuizActive) {
      if (label) label.textContent = 'Exit Quiz Mode';
      if (btn) {
        btn.style.background = '#fef08a';
        btn.style.borderColor = '#ca8a04';
        btn.style.color = '#713f12';
      }
      cards.forEach((card, idx) => {
        const bullets = document.getElementById(`bullets-${lessonId}-${idx}`);
        const mask = document.getElementById(`mask-${lessonId}-${idx}`);
        const toggleBtn = document.getElementById(`btn-toggle-model-${lessonId}-${idx}`);
        const maskBtn = document.getElementById(`btn-quiz-mask-${lessonId}-${idx}`);
        if (bullets) bullets.style.display = 'none';
        if (mask) mask.style.display = 'block';
        if (toggleBtn) toggleBtn.style.display = 'none';
        if (maskBtn) {
          maskBtn.innerHTML = '<i class="fa-solid fa-eye"></i> Click to Reveal Model Evidence';
          maskBtn.style.background = '#16a34a';
          maskBtn.style.color = '#ffffff';
          maskBtn.style.border = '1px solid #15803d';
        }
      });
    } else {
      if (label) label.textContent = 'Self-Quiz Mode';
      if (btn) {
        btn.style.background = '#fefce8';
        btn.style.borderColor = '#fde047';
        btn.style.color = '#854d0e';
      }
      cards.forEach((card, idx) => {
        const bullets = document.getElementById(`bullets-${lessonId}-${idx}`);
        const mask = document.getElementById(`mask-${lessonId}-${idx}`);
        const toggleBtn = document.getElementById(`btn-toggle-model-${lessonId}-${idx}`);
        const maskBtn = document.getElementById(`btn-quiz-mask-${lessonId}-${idx}`);
        if (bullets) bullets.style.display = 'block';
        if (mask) mask.style.display = 'none';
        if (toggleBtn) {
          toggleBtn.style.display = 'inline-block';
          toggleBtn.textContent = 'Hide Model';
        }
        if (maskBtn) {
          maskBtn.innerHTML = '<i class="fa-solid fa-eye"></i> Click to Reveal Model Evidence';
          maskBtn.style.background = '#16a34a';
          maskBtn.style.color = '#ffffff';
          maskBtn.style.border = '1px solid #15803d';
        }
      });
    }
  };

  window.revealSingleNoteQuizMask = function (lessonId, blockIdx, event) {
    if (event && event.stopPropagation) event.stopPropagation();
    const bullets = document.getElementById(`bullets-${lessonId}-${blockIdx}`);
    const maskBtn = document.getElementById(`btn-quiz-mask-${lessonId}-${blockIdx}`);
    if (!bullets || !maskBtn) return;

    const isCurrentlyVisible = bullets.style.display !== 'none';
    if (isCurrentlyVisible) {
      bullets.style.display = 'none';
      maskBtn.innerHTML = '<i class="fa-solid fa-eye"></i> Click to Reveal Model Evidence';
      maskBtn.style.background = '#16a34a';
      maskBtn.style.color = '#ffffff';
      maskBtn.style.border = '1px solid #15803d';
    } else {
      bullets.style.display = 'block';
      maskBtn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Collapse Model Evidence';
      maskBtn.style.background = '#f1f5f9';
      maskBtn.style.color = '#15803d';
      maskBtn.style.border = '1.5px solid #86efac';
    }
  };

  window.copyNoteScaffoldToClipboard = function (lessonId, event) {
    if (event && event.stopPropagation) event.stopPropagation();
    const lesson = window.currentActiveLesson;
    if (!lesson || !lesson.note_scaffold) return;
    const blocks = lesson.note_scaffold.blocks || [];
    let text = `=== ${lesson.title || 'Lesson Task Notes'} ===\n\n`;
    blocks.forEach((b, idx) => {
      const userNote = localStorage.getItem(`med_note_${lessonId}_${idx}`) || '(No notes entered)';
      const keyTerms =
        Array.isArray(b.key_terms) && b.key_terms.length > 0
          ? ` [Key Terms: ${b.key_terms.join(', ')}]`
          : '';
      text += `ENQUIRY ${b.num || idx + 1}: ${b.title} [${b.badge}]${keyTerms}\n`;
      text += `Prompt: ${b.prompt}\n`;
      text += `My Notes:\n${userNote}\n\n`;
      text += `Core Model Evidence:\n`;
      (b.model_notes || []).forEach((m) => {
        text += `• ${m}\n`;
      });
      text += `\n----------------------------------------\n\n`;
    });

    navigator.clipboard.writeText(text).then(() => {
      const btnLabel = document.getElementById(`copy-notes-label-${lessonId}`);
      if (btnLabel) {
        const original = btnLabel.textContent;
        btnLabel.textContent = '✓ Copied!';
        setTimeout(() => {
          btnLabel.textContent = original;
        }, 2000);
      }
    });
  };

  window.printNoteScaffoldSheet = function (lessonId, event) {
    if (event && event.stopPropagation) event.stopPropagation();
    const lesson = window.currentActiveLesson;
    if (!lesson || !lesson.note_scaffold) return;
    const scaffold = lesson.note_scaffold;
    const blocks = scaffold.blocks || [];

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    let printHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${lesson.title} - Lesson Task Sheet</title>
        <style>
          @page { size: A4 portrait; margin: 12mm 15mm; }
          body { font-family: 'Times New Roman', serif; color: #000; margin: 0; padding: 0; }
          h1 { font-size: 13.5pt; margin: 0 0 4pt 0; text-align: center; }
          .subhead { font-size: 8.5pt; text-align: center; margin-bottom: 10pt; text-transform: uppercase; letter-spacing: 0.5px; }
          .inst { font-size: 9pt; font-style: italic; margin-bottom: 10pt; border: 1px solid #000; padding: 6pt; }
          .block { border: 1.2px solid #000; margin-bottom: 10pt; padding: 8pt; page-break-inside: avoid; }
          .block-title { font-weight: bold; font-size: 10pt; margin-bottom: 3pt; display: flex; justify-content: space-between; }
          .key-terms { font-size: 8pt; font-weight: bold; margin-bottom: 4pt; color: #1e293b; }
          .prompt { font-size: 8.8pt; font-weight: bold; margin-bottom: 6pt; }
          .lines { display: flex; flex-direction: column; gap: 16pt; margin-top: 14pt; }
          .line { border-bottom: 1px solid #000; height: 1px; }
          .user-note { font-family: 'Courier New', monospace; font-size: 8.8pt; white-space: pre-wrap; margin-bottom: 4pt; }
        </style>
      </head>
      <body>
        <h1>${lesson.title}</h1>
        <div class="subhead">The History Department &bull; Lesson Task & Disciplinary Note-Taking Sheet</div>
        <div class="inst"><strong>Instructions:</strong> ${scaffold.instruction}</div>
    `;

    blocks.forEach((b, idx) => {
      const userNote = localStorage.getItem(`med_note_${lessonId}_${idx}`) || '';
      const keyTermsText =
        Array.isArray(b.key_terms) && b.key_terms.length > 0
          ? `<div class="key-terms">Must-Use Terms: ${b.key_terms.join(' &bull; ')}</div>`
          : '';
      printHtml += `
        <div class="block">
          <div class="block-title">
            <span>ENQUIRY ${b.num || idx + 1}: ${b.title}</span>
            <span>[${b.badge}]</span>
          </div>
          ${keyTermsText}
          <div class="prompt">Prompt: ${b.prompt}</div>
          ${
            userNote
              ? `<div class="user-note"><strong>Student Notes:</strong>\n${userNote}</div>`
              : `<div class="lines"><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div></div>`
          }
        </div>
      `;
    });

    printHtml += `
      </body>
      </html>
    `;

    printWindow.document.write(printHtml);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };
}

function renderLessonVideos(videos, lesson, unitId) {
  if (!videos || videos.length === 0) return '';
  const formatBold = window.formatBold || ((s) => s);

  // Always sort videos shortest to longest
  const sortedVideos = getSortedLessonVideos(videos);
  if (sortedVideos.length === 0) return '';

  const safeLessonId = (
    lesson && (lesson.id || lesson.title) ? String(lesson.id || lesson.title) : 'lesson'
  ).replace(/[^a-zA-Z0-9_-]/g, '_');
  const shelfContainerId = 'video-shelf-' + safeLessonId;
  const drawerId = 'video-task-drawer-' + safeLessonId;

  // Calculate duration summary for the header pill
  let countPillText = '';
  if (sortedVideos.length === 1) {
    const singleDur = formatProminentDuration(sortedVideos[0].duration);
    countPillText = singleDur ? `1 Video &bull; ⏱️ ${singleDur}` : `1 Video`;
  } else {
    const minDur = formatShortDuration(sortedVideos[0].duration);
    const maxDur = formatShortDuration(sortedVideos[sortedVideos.length - 1].duration);
    const validRange = minDur && maxDur && minDur !== maxDur;
    countPillText = validRange
      ? `${sortedVideos.length} Videos &bull; Shortest First (${minDur} &ndash; ${maxDur})`
      : minDur
        ? `${sortedVideos.length} Videos &bull; Shortest First (~${minDur})`
        : `${sortedVideos.length} Videos &bull; Shortest First`;
  }

  let videoCardsHtml = '';
  let taskPanelsHtml = '';
  let hasAnyTasks = false;

  sortedVideos.forEach((vid, idx) => {
    const isYt =
      vid.type === 'youtube' ||
      (vid.url && (vid.url.includes('youtube.com') || vid.url.includes('youtu.be')));
    const isEra = vid.type === 'era' || (vid.url && vid.url.includes('era.org.uk'));

    let ytId = null;
    if (isYt && vid.url) {
      const match = vid.url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/i,
      );
      ytId = match ? match[1] : null;
    }

    const shortDur = formatShortDuration(vid.duration);
    const prominentDur = formatProminentDuration(vid.duration);
    const providerName = isEra ? 'ERA' : isYt ? 'YouTube' : 'Video';
    const providerIcon = isEra ? 'fa-solid fa-graduation-cap' : 'fa-brands fa-youtube';
    const pathwayInfo = resolveVideoPathway(vid);
    const cleanTitle = (vid.title || 'Historical Documentary Resource').replace(/"/g, '&quot;');
    const rawCleanTitle = vid.title || 'Historical Documentary Resource';
    const displayTitle = cleanVideoDisplayTitle(rawCleanTitle);
    const videoKey = `${safeLessonId}_${idx}`;

    if (typeof window !== 'undefined') {
      window.__videoStore = window.__videoStore || {};
      window.__videoStore[videoKey] = {
        ...vid,
        pathwayInfo,
        cleanTitle,
        displayTitle,
        shortDur,
        prominentDur,
        providerName,
        providerIcon,
        ytId,
        safeLessonId,
        idx,
      };
    }

    // Left thumbnail element
    let thumbHtml = '';
    if (ytId) {
      thumbHtml = `
        <div class="video-shelf-thumb-wrap" data-action="open-video-modal" data-youtube="${ytId}" data-video-key="${videoKey}" title="Click to Launch Theater Mode: ${cleanTitle}">
          <img src="https://img.youtube.com/vi/${ytId}/mqdefault.jpg" alt="${cleanTitle}" class="video-shelf-thumb-img" loading="lazy" />
          <div class="video-shelf-play-overlay">
            <i class="fa-solid fa-play"></i>
          </div>
          ${prominentDur ? `<span class="video-shelf-dur-pill">${shortDur || prominentDur}</span>` : ''}
        </div>
      `;
    } else if (isEra) {
      thumbHtml = `
        <a href="${vid.url}" target="_blank" rel="noopener noreferrer" class="video-shelf-thumb-wrap era" title="Open Stream on ERA (School SSO): ${cleanTitle}">
          <div class="video-shelf-era-poster">
            <div class="video-shelf-poster-badge">
              <i class="fa-solid fa-graduation-cap"></i> ERA
            </div>
            <div class="video-shelf-poster-play">
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </div>
          </div>
          ${prominentDur ? `<span class="video-shelf-dur-pill era">${shortDur || prominentDur}</span>` : ''}
        </a>
      `;
    } else {
      thumbHtml = `
        <a href="${vid.url}" target="_blank" rel="noopener noreferrer" class="video-shelf-thumb-wrap generic" title="Open Video: ${cleanTitle}">
          <div class="video-shelf-generic-poster">
            <div class="video-shelf-poster-badge">
              <i class="fa-solid fa-video"></i> Video
            </div>
            <div class="video-shelf-poster-play">
              <i class="fa-solid fa-play"></i>
            </div>
          </div>
          ${prominentDur ? `<span class="video-shelf-dur-pill">${shortDur || prominentDur}</span>` : ''}
        </a>
      `;
    }

    // Task and Action buttons
    let actionButtonsHtml = '';
    const hasTask = Boolean(vid.viewing_task || pathwayInfo.guidance || vid.model_answer);
    if (hasTask) hasAnyTasks = true;

    if (ytId) {
      actionButtonsHtml += `
        <button type="button" class="btn-video-shelf-action watch" data-action="open-video-modal" data-youtube="${ytId}" data-video-key="${videoKey}" title="Watch in Dual-Pane Theater">
          <i class="fa-solid fa-play"></i> Watch
        </button>
      `;
    } else if (isEra) {
      actionButtonsHtml += `
        <a href="${vid.url}" target="_blank" rel="noopener noreferrer" class="btn-video-shelf-action era">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Stream
        </a>
      `;
    } else {
      actionButtonsHtml += `
        <a href="${vid.url}" target="_blank" rel="noopener noreferrer" class="btn-video-shelf-action generic">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Open
        </a>
      `;
    }

    if (hasTask) {
      actionButtonsHtml += `
        <button type="button" class="btn-video-shelf-action task" onclick="window.toggleVideoTaskDrawer('${safeLessonId}', ${idx}, event)" title="View Task &amp; Guidance">
          <i class="fa-solid fa-list-check"></i> Task
        </button>
      `;
    }

    // 1 Horizontal Line Card
    videoCardsHtml += `
      <div class="video-shelf-card ${isEra ? 'era-card' : 'yt-card'}" id="${shelfContainerId}-card-${idx}">
        ${thumbHtml}
        <div class="video-shelf-card-info">
          <div class="video-shelf-card-tags">
            ${
              prominentDur
                ? `
              <span class="video-shelf-duration-badge" title="Exact Runtime: ${vid.duration || prominentDur}">
                <i class="fa-solid fa-clock"></i> ${prominentDur}
              </span>
            `
                : ''
            }
            <span class="video-shelf-pathway-pill" title="${(pathwayInfo.guidance || '').replace(/"/g, '&quot;')}">
              <i class="${pathwayInfo.icon || 'fa-solid fa-route'}"></i> ${pathwayInfo.pathway}
            </span>
          </div>
          <div class="video-shelf-card-title" title="${cleanTitle}">
            ${displayTitle}
          </div>
          <div class="video-shelf-card-actions">
            ${actionButtonsHtml}
          </div>
        </div>
      </div>
    `;

    // Collapsible Task Content (if any)
    if (hasTask) {
      taskPanelsHtml += `
        <div id="video-task-content-${safeLessonId}-${idx}" class="video-task-item-content" style="display: none;">
          <div class="video-drawer-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <span class="video-shelf-pathway-pill" title="${(pathwayInfo.guidance || '').replace(/"/g, '&quot;')}">
                <i class="${pathwayInfo.icon || 'fa-solid fa-route'}"></i> ${pathwayInfo.pathway}
              </span>
              <span style="font-size: 0.92rem; font-weight: 800; color: #0f172a;">${cleanTitle}</span>
              ${vid.duration ? `<span class="video-shelf-duration-badge"><i class="fa-solid fa-clock"></i> ${vid.duration}</span>` : ''}
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              ${
                ytId
                  ? `
                <button type="button" class="btn-theater-launch-banner" data-action="open-video-modal" data-youtube="${ytId}" data-video-key="${videoKey}" style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: #ffffff; border: none; font-size: 0.76rem; font-weight: 700; padding: 5px 12px; border-radius: 5px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 1px 3px rgba(37,99,235,0.3);">
                  <i class="fa-solid fa-expand"></i> Launch Theater Mode
                </button>
              `
                  : ''
              }
              <button type="button" style="background: none; border: 1px solid #cbd5e1; font-size: 0.78rem; color: #64748b; cursor: pointer; padding: 4px 8px; border-radius: 5px;" onclick="window.toggleVideoTaskDrawer('${safeLessonId}', ${idx}, event)">
                <i class="fa-solid fa-xmark"></i> Close
              </button>
            </div>
          </div>

          <div class="video-drawer-body" style="display: flex; flex-direction: column; gap: 10px;">
            ${
              pathwayInfo.guidance
                ? `
              <div class="video-teacher-guidance-box" style="background: #f8faff; border-left: 4px solid #6366f1; padding: 10px 14px; border-radius: 0 8px 8px 0; border: 1px solid #e0e7ff; border-left-width: 4px;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; flex-wrap: wrap; gap: 6px;">
                  <div style="font-size: 0.72rem; font-weight: 800; color: #4338ca; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 5px;">
                    <i class="fa-solid fa-graduation-cap"></i> Teacher Pedagogical Briefing
                  </div>
                  <span style="font-size: 0.68rem; font-weight: 700; color: #4338ca; background: #e0e7ff; padding: 2px 7px; border-radius: 4px;">
                    ${pathwayInfo.pathway} Pathway
                  </span>
                </div>
                <div style="font-size: 0.86rem; color: #1e293b; line-height: 1.5;">
                  ${formatBold(formatInteractiveTimestamps(pathwayInfo.guidance, ytId, false, videoKey))}
                </div>
              </div>
            `
                : ''
            }

            ${
              vid.viewing_task
                ? `
              <div class="video-viewing-task-box" style="background: #ffffff; border-left: 4px solid #f59e0b; padding: 12px 14px; border-radius: 0 8px 8px 0; border: 1px solid #fed7aa; border-left-width: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                  <div style="font-size: 0.72rem; font-weight: 800; color: #b45309; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 5px;">
                    <i class="fa-solid fa-list-check"></i> Viewing Question Tasks
                  </div>
                  <span style="font-size: 0.68rem; font-weight: 700; color: #b45309; background: #fef3c7; padding: 2px 7px; border-radius: 4px;">
                    Mixed-Ability Scaffold
                  </span>
                </div>
                <div class="video-task-content-rendered" style="font-size: 0.88rem; color: #78350f; line-height: 1.55;">
                  ${formatBold(formatInteractiveTimestamps(vid.viewing_task, ytId, false, videoKey))}
                </div>
              </div>
            `
                : ''
            }

            ${
              vid.model_answer
                ? `
              <details class="video-model-details" style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; overflow: hidden; margin-top: 2px;">
                <summary style="cursor: pointer; padding: 8px 14px; font-size: 0.82rem; color: #166534; font-weight: 700; user-select: none; display: flex; align-items: center; justify-content: space-between;">
                  <span style="display: flex; align-items: center; gap: 6px;">
                    <i class="fa-solid fa-circle-check" style="color: #16a34a;"></i> Reveal Model Answer &amp; Teacher Mark Scheme
                  </span>
                  <span style="font-size: 0.70rem; color: #15803d; font-weight: 600; text-transform: uppercase;">Click to expand</span>
                </summary>
                <div style="padding: 12px 16px; font-size: 0.86rem; color: #14532d; line-height: 1.55; border-top: 1px solid #bbf7d0; background: #ffffff;">
                  ${formatBold(formatInteractiveTimestamps(vid.model_answer, ytId, false, videoKey))}
                </div>
              </details>
            `
                : ''
            }
          </div>
        </div>
      `;
    }
  });

  return `
    <div id="${shelfContainerId}" class="lesson-video-shelf-container no-print">
      <div class="lesson-video-shelf-header">
        <div class="video-shelf-title">
          <i class="fa-solid fa-film"></i>
          <span>Classroom Video Pathways</span>
          <span class="video-shelf-count-pill">${countPillText}</span>
        </div>
        <div class="video-shelf-hint">
          ${sortedVideos.length > 1 ? '<i class="fa-solid fa-arrow-left-long"></i> <span>Scroll horizontal</span> <i class="fa-solid fa-arrow-right-long"></i>' : '<span class="video-shelf-instant-badge"><i class="fa-solid fa-bolt"></i> One-Click Launch</span>'}
        </div>
      </div>

      <!-- 1 Single Horizontal Line Row of Video Cards -->
      <div class="lesson-video-shelf-row">
        ${videoCardsHtml}
      </div>

      <!-- Expandable Task Drawer if triggered -->
      ${
        hasAnyTasks
          ? `
        <div id="${drawerId}" class="video-task-drawer" style="display: none;">
          ${taskPanelsHtml}
        </div>
      `
          : ''
      }
    </div>
  `;
}

export function renderLessonLaunchpad({
  lesson,
  unitId,
  videos = [],
  htmlVideo = '',
  htmlDoNowInner = '',
  htmlVocabInner = '',
  htmlSpineInner = '',
  defaultTab = '',
}) {
  const tabs = [];

  // 1. Do Now Starter Tab
  const hasDoNow = Boolean(
    (lesson &&
      lesson.do_now &&
      ((lesson.do_now.items && lesson.do_now.items.length > 0) ||
        (lesson.do_now.questions && lesson.do_now.questions.length > 0) ||
        (lesson.do_now.tasks && lesson.do_now.tasks.length > 0) ||
        (lesson.do_now.events && lesson.do_now.events.length > 0))) ||
    (htmlDoNowInner && htmlDoNowInner.trim().length > 0),
  );

  if (hasDoNow) {
    tabs.push({
      key: 'donow',
      label: 'Do Now Starter',
      icon: 'fa-solid fa-stopwatch',
      badge: '05:00',
    });
  }

  // 2. Video Pathway Tab
  const hasVideo = Boolean(
    (videos && videos.length > 0) || (htmlVideo && htmlVideo.trim().length > 0),
  );
  if (hasVideo) {
    let videoDuration = '';
    if (videos && videos.length > 0 && videos[0].duration) {
      videoDuration = videos[0].duration
        .replace(/\bmins?\b/gi, 'm')
        .replace(/\bsecs?\b/gi, 's')
        .replace(/\s+/g, ' ')
        .trim();
    }
    tabs.push({
      key: 'video',
      label: 'Video Pathway',
      icon: 'fa-solid fa-play',
      badge: videoDuration || `${videos.length} Clip${videos.length > 1 ? 's' : ''}`,
    });
  }

  // 3. Key Vocabulary Tab
  const hasVocab = Boolean(
    (lesson && lesson.vocab && lesson.vocab.length > 0) ||
    (htmlVocabInner && htmlVocabInner.trim().length > 0),
  );
  if (hasVocab) {
    const vocabCount = lesson && lesson.vocab ? lesson.vocab.length : '';
    tabs.push({
      key: 'vocab',
      label: 'Key Vocabulary',
      icon: 'fa-solid fa-book-bookmark',
      badge: vocabCount ? `${vocabCount} Terms` : '',
    });
  }

  // 4. Chronology Spine Tab
  const hasSpine = Boolean(htmlSpineInner && htmlSpineInner.trim().length > 0);
  if (hasSpine) {
    let spineCount = 0;
    if (lesson.causal_domino_spine && Array.isArray(lesson.causal_domino_spine.stages)) {
      spineCount = lesson.causal_domino_spine.stages.length;
    } else if (lesson.timeline_anchor && Array.isArray(lesson.timeline_anchor)) {
      spineCount = lesson.timeline_anchor.length;
    } else if (lesson.workbook_stages && Array.isArray(lesson.workbook_stages)) {
      spineCount = lesson.workbook_stages.length;
    }
    tabs.push({
      key: 'spine',
      label: 'Chronology Spine',
      icon: 'fa-solid fa-timeline',
      badge: spineCount ? `${spineCount} Stages` : '',
    });
  }

  if (tabs.length === 0) return '';

  // Active tab selection: only set active if defaultTab is explicitly specified and exists
  const activeTabKey = defaultTab && tabs.some((t) => t.key === defaultTab) ? defaultTab : '';

  return `
    <div class="lesson-launchpad-container" id="lesson-launchpad-${lesson.id || 'current'}">
      <div class="launchpad-bar">
        <div class="launchpad-tabs-group" role="tablist">
          ${tabs
            .map((tab) => {
              const isActive = tab.key === activeTabKey;
              return `
              <button type="button"
                class="launchpad-tab-btn ${isActive ? 'active' : ''}"
                data-action="switch-launchpad-tab"
                data-tab="${tab.key}"
                role="tab"
                aria-selected="${isActive ? 'true' : 'false'}"
                title="${tab.label}">
                <i class="${tab.icon}"></i>
                <span>${tab.label}</span>
                ${tab.badge ? `<span class="launchpad-tab-badge">${tab.badge}</span>` : ''}
              </button>
            `;
            })
            .join('')}
        </div>
        <div class="launchpad-actions-group">
          <button type="button"
            class="launchpad-start-reading-btn"
            data-action="launchpad-start-reading"
            title="Jump directly to lesson narrative reading">
            <i class="fa-solid fa-book-open-reader"></i>
            <span>Start Reading &darr;</span>
          </button>
          <button type="button"
            class="launchpad-close-btn"
            data-action="close-launchpad"
            title="Collapse drawer"
            style="${activeTabKey ? 'display: inline-flex;' : 'display: none;'}">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
      <div class="lesson-launchpad-drawer" id="launchpad-drawer-${lesson.id || 'current'}" style="${activeTabKey ? 'display: block;' : 'display: none;'}">
        ${
          hasDoNow
            ? `
          <div class="launchpad-panel ${activeTabKey === 'donow' ? 'active' : ''}" data-panel="donow" style="${activeTabKey === 'donow' ? 'display: block;' : 'display: none;'}">
            ${htmlDoNowInner}
          </div>
        `
            : ''
        }
        ${
          hasVideo
            ? `
          <div class="launchpad-panel ${activeTabKey === 'video' ? 'active' : ''}" data-panel="video" style="${activeTabKey === 'video' ? 'display: block;' : 'display: none;'}">
            ${htmlVideo}
          </div>
        `
            : ''
        }
        ${
          hasVocab
            ? `
          <div class="launchpad-panel ${activeTabKey === 'vocab' ? 'active' : ''}" data-panel="vocab" style="${activeTabKey === 'vocab' ? 'display: block;' : 'display: none;'}">
            ${htmlVocabInner}
          </div>
        `
            : ''
        }
        ${
          hasSpine
            ? `
          <div class="launchpad-panel ${activeTabKey === 'spine' ? 'active' : ''}" data-panel="spine" style="${activeTabKey === 'spine' ? 'display: block;' : 'display: none;'}">
            ${htmlSpineInner}
          </div>
        `
            : ''
        }
      </div>
    </div>
  `;
}

export function renderSourceUtilityTaskHTML(task, lessonIndex, tIdx, unitId) {
  const taskId = task.id || `task-su-${lessonIndex}-${tIdx}`;
  const qNumPrefix = task.qNum ? `Q${task.qNum}. ` : 'Task 4. ';
  const title = task.title || 'Dual-Source Utility & Provenance Investigation';
  const prompt =
    task.question ||
    task.text ||
    task.enquiryQuestion ||
    'How useful are Sources A and B for this enquiry?';
  const sourceA = task.source_a || task.sourceA || {};
  const sourceB = task.source_b || task.sourceB || {};
  const matrix = task.matrix ||
    task.structureStrip || [
      {
        col: '1. CONTENT & DETAIL',
        text: 'Analyse what each source reveals about the enquiry topic.',
      },
      {
        col: '2. PROVENANCE & MOTIVE',
        text: 'Evaluate how origin and purpose affect historical reliability.',
      },
      {
        col: '3. HISTORICAL JUDGEMENT',
        text: 'Reach a reasoned conclusion on which source is more useful.',
      },
    ];
  let connectives = [];
  if (Array.isArray(task.connectives)) {
    connectives = task.connectives;
  } else if (typeof task.connectives === 'string') {
    connectives = task.connectives
      .split('•')
      .map((s) => s.trim())
      .filter(Boolean);
  } else {
    connectives = [
      'Source A is useful for showing...',
      'However, its utility is limited because...',
      'In contrast, Source B reveals...',
      'Cross-referencing both sources proves...',
      'On balance, Source A/B is more valuable because...',
    ];
  }
  const modelAnswer = task.model_answer || task.model || '';

  const renderSourceCard = (srcObj, letter, borderCol, bgCol, textCol) => {
    const sTitle = srcObj.title || `Source ${letter}`;
    const sShelf = srcObj.shelfmark || srcObj.provenance || 'HISTORICAL ARCHIVE';
    const sText = srcObj.text || srcObj.quote || '';
    const sClue = srcObj.clue || srcObj.provenance_clue || '';
    const rawImg = srcObj.src || srcObj.image || '';
    const imgSrc = rawImg ? getAssetUrl(rawImg) : '';

    return `
      <div class="archival-source-box" style="background: ${bgCol}; border: 1.5px solid ${borderCol}; border-radius: 8px; padding: 14px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1px solid ${borderCol}; padding-bottom: 6px; flex-wrap: wrap; gap: 6px;">
            <strong style="color: ${textCol}; font-size: 0.95rem; text-transform: uppercase; font-family: 'Inter', sans-serif;">
              <i class="fa-solid fa-file-lines" style="margin-right: 5px;"></i> ${sTitle}
            </strong>
            <span class="archival-shelfmark-stamp" style="font-family: monospace; font-size: 0.68rem; padding: 2px 6px; background: rgba(0,0,0,0.06); border-radius: 3px; color: #475569; border: 1px solid rgba(0,0,0,0.1);">
              ${sShelf}
            </span>
          </div>
          ${
            imgSrc
              ? `
            <div style="text-align: center; margin-bottom: 10px; background: #0f172a; border-radius: 6px; padding: 6px;">
              <img src="${imgSrc}" alt="${sTitle}" style="max-height: 200px; max-width: 100%; object-fit: contain; border-radius: 4px; cursor: zoom-in;" data-action="open-modal" data-src="${imgSrc}" title="Click to zoom">
            </div>
          `
              : ''
          }
          <div class="archival-source-body" style="font-family: 'Georgia', serif; font-size: 0.92rem; line-height: 1.55; color: #1e293b; margin-bottom: 10px; font-style: italic;">
            ${sText ? `&ldquo;${sText.replace(/^“|”$/g, '')}&rdquo;` : ''}
          </div>
        </div>
        ${
          sClue
            ? `
          <div style="padding: 8px 10px; background: #ffffff; border-left: 3px solid ${textCol}; border-radius: 4px; font-size: 0.82rem; color: #334155; line-height: 1.4; margin-top: 6px;">
            <strong style="color: ${textCol};"><i class="fa-solid fa-lightbulb"></i> Provenance Clue:</strong> ${sClue}
          </div>
        `
            : ''
        }
      </div>
    `;
  };

  return `
    <div class="task-box source-utility-interactive" id="${taskId}" data-task-id="${taskId}" style="margin-bottom: 25px; background: #ffffff; padding: 20px; border-radius: 10px; border: 2px solid #1e3a8a; box-shadow: 0 4px 14px rgba(30, 58, 138, 0.08);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1.5px solid #dbeafe; padding-bottom: 10px; flex-wrap: wrap; gap: 8px;">
        <h4 style="margin: 0; color: #1e3a8a; font-size: 1.15rem; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-scale-balanced" style="color: #2563eb;"></i> ${qNumPrefix}${title}
        </h4>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="background: #1e3a8a; color: #ffffff; font-size: 0.75rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Dual-Source Utility [8 Marks]</span>
          <button type="button" class="btn btn-pedagogy-primary btn-launch-task4" data-action="launch-task4-workspace" data-task-id="${taskId}" style="background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%); color: #ffffff; border: none; padding: 6px 14px; border-radius: 6px; font-weight: 700; font-size: 0.84rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 6px rgba(30, 58, 138, 0.25); transition: all 0.2s;" title="Open distraction-free fullscreen writing workspace with 15m timer">
            <i class="fa-solid fa-rocket"></i> Launch Task 4
          </button>
        </div>
      </div>

      <div style="font-size: 1.02rem; font-weight: 700; color: #0f172a; margin-bottom: 14px; line-height: 1.5; padding: 10px 14px; background: #eff6ff; border-left: 4px solid #1e3a8a; border-radius: 0 6px 6px 0;">
        <strong>Enquiry Question:</strong> ${prompt}
      </div>

      <!-- Side-by-Side Primary Sources -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; margin-bottom: 16px;">
        ${renderSourceCard(sourceA, 'A', '#93c5fd', '#f8fafc', '#1e40af')}
        ${renderSourceCard(sourceB, 'B', '#cbd5e1', '#ffffff', '#334155')}
      </div>

      <!-- 3-Step Utility Planning Matrix -->
      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 12px 14px; margin-bottom: 16px;">
        <div style="font-weight: 700; font-size: 0.85rem; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-table-columns"></i> 3-Step Utility Planning Matrix: Evidence &bull; Provenance &bull; Verdict
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px;">
          ${matrix
            .map(
              (m, mIdx) => `
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-top: 3px solid ${mIdx === 0 ? '#3b82f6' : mIdx === 1 ? '#8b5cf6' : '#10b981'}; border-radius: 6px; padding: 10px;">
              <strong style="display: block; font-size: 0.82rem; color: #1e293b; margin-bottom: 4px; text-transform: uppercase;">
                ${m.col || m.title || `Phase ${mIdx + 1}`}
              </strong>
              <div style="font-size: 0.82rem; color: #475569; line-height: 1.4;">
                ${m.text || m.prompt || ''}
              </div>
            </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- Analytical Connectives (Click-to-Insert) -->
      <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; align-items: center;">
        <span style="font-size: 0.78rem; font-weight: 700; color: #1e40af; text-transform: uppercase;">Analytical Connectives (Click to Insert):</span>
        ${connectives
          .map(
            (c) => `
          <button type="button" class="connective-chip" data-connective="${c.replace(/"/g, '&quot;')}" style="background: #ffffff; border: 1px solid #bfdbfe; color: #1e40af; padding: 3px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.15s ease;" title="Click to insert at cursor">${c}</button>
        `,
          )
          .join('')}
      </div>

      <!-- Pupil Writing Workspace Area -->
      <textarea class="interactive-textarea" style="width: 100%; box-sizing: border-box; min-height: 110px; padding: 12px; border: 1.5px solid #bfdbfe; border-radius: 6px; font-size: 0.92rem; font-family: inherit; resize: vertical; line-height: 1.5;" placeholder="Evaluate the utility of both sources: analyse specific content, evaluate author provenance and purpose, and reach a reasoned comparative judgement..."></textarea>

      ${
        modelAnswer
          ? `
        <details class="model-paragraph-reveal" style="margin-top: 12px; border: 1px dashed #2563eb; border-radius: 6px; padding: 8px 12px; background: #eff6ff;">
          <summary style="cursor: pointer; color: #1e40af; font-weight: 700; font-size: 0.88rem; outline: none; display: flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-award"></i> [ Show Level 4 Target Exemplar Model Answer ]
          </summary>
          <div class="scaffold-box model-box" style="margin-top: 10px; padding: 12px 15px; background: #ffffff; border-left: 3px solid #2563eb; border-radius: 4px; font-size: 0.92rem; color: #1e293b; line-height: 1.6; border: 1px solid #bfdbfe;">
            ${modelAnswer}
          </div>
        </details>
      `
          : ''
      }
    </div>
  `;
}

export function renderHistoricalInterpretationsTaskHTML(task, lessonIndex, tIdx, unitId) {
  const taskId = task.id || `task-hi-${lessonIndex}-${tIdx}`;
  const qNumPrefix = task.qNum ? `Q${task.qNum}. ` : 'Task 4. ';
  const title = task.title || 'Historiographical Debate & Academic Interpretations';
  const prompt =
    task.question ||
    task.text ||
    task.enquiryQuestion ||
    'How far do you agree with Interpretation 1?';
  const interp1 = task.interp1 || task.interpretation_1 || task.interp_1 || {};
  const interp2 = task.interp2 || task.interpretation_2 || task.interp_2 || {};
  const matrix = task.matrix || [
    {
      col: '1. INTERPRETATION 1 CLAIMS',
      text: 'Explain the core thesis, supporting arguments, and evidence cited.',
    },
    {
      col: '2. INTERPRETATION 2 CRITIQUE',
      text: 'Evaluate how Interpretation 2 challenges or reframes this debate.',
    },
    {
      col: '3. HISTORIOGRAPHICAL VERDICT',
      text: 'Weigh both interpretations against factual evidence to reach an independent verdict.',
    },
  ];
  let connectives = [];
  if (Array.isArray(task.connectives)) {
    connectives = task.connectives;
  } else if (typeof task.connectives === 'string') {
    connectives = task.connectives
      .split('•')
      .map((s) => s.trim())
      .filter(Boolean);
  } else {
    connectives = [
      'Interpretation 1 contends that...',
      'Evidence supporting this critique includes...',
      'In sharp contrast, Interpretation 2 argues that...',
      'This revisionist perspective is corroborated by...',
      'Weighing both interpretations against historical evidence, I conclude that...',
    ];
  }
  const modelAnswer = task.model_answer || task.model || '';

  const renderInterpCard = (intObj, num, borderCol, bgCol, textCol) => {
    const iTitle = intObj.title || `Interpretation ${num}`;
    const iBadge =
      intObj.badge || (num === 1 ? 'Orthodox Historiography' : 'Revisionist Historiography');
    const iAuthor = intObj.author || '';
    const iText = intObj.text || intObj.quote || '';

    return `
      <div style="background: ${bgCol}; border: 1.5px solid ${borderCol}; border-radius: 8px; padding: 14px; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1px solid ${borderCol}; padding-bottom: 6px; flex-wrap: wrap; gap: 6px;">
            <strong style="color: ${textCol}; font-size: 0.95rem; text-transform: uppercase; font-family: 'Inter', sans-serif;">
              <i class="fa-solid fa-graduation-cap" style="margin-right: 5px;"></i> ${iTitle}
            </strong>
            <span style="font-size: 0.72rem; font-weight: 700; padding: 2px 7px; background: rgba(0,0,0,0.06); border-radius: 3px; color: ${textCol}; border: 1px solid rgba(0,0,0,0.1);">
              ${iBadge}
            </span>
          </div>
          <div class="archival-source-body" style="font-family: 'Georgia', serif; font-size: 0.92rem; line-height: 1.55; color: #1e293b; margin-bottom: 10px; font-style: italic;">
            ${iText ? `&ldquo;${iText.replace(/^“|”$/g, '')}&rdquo;` : ''}
          </div>
        </div>
        ${
          iAuthor
            ? `
          <div style="padding: 6px 10px; background: #ffffff; border-left: 3px solid ${textCol}; border-radius: 4px; font-size: 0.8rem; color: #475569; font-weight: 600;">
            <i class="fa-solid fa-user-pen" style="color: ${textCol};"></i> ${iAuthor}
          </div>
        `
            : ''
        }
      </div>
    `;
  };

  return `
    <div class="task-box historical-interpretations-interactive" id="${taskId}" data-task-id="${taskId}" style="margin-bottom: 25px; background: #ffffff; padding: 20px; border-radius: 10px; border: 2px solid #7c3aed; box-shadow: 0 4px 14px rgba(124, 58, 237, 0.08);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1.5px solid #ede9fe; padding-bottom: 10px; flex-wrap: wrap; gap: 8px;">
        <h4 style="margin: 0; color: #7c3aed; font-size: 1.15rem; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-comments" style="color: #8b5cf6;"></i> ${qNumPrefix}${title}
        </h4>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="background: #7c3aed; color: #ffffff; font-size: 0.75rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Historiographical Debate [16+4 Marks]</span>
          <button type="button" class="btn btn-pedagogy-primary btn-launch-task4" data-action="launch-task4-workspace" data-task-id="${taskId}" style="background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%); color: #ffffff; border: none; padding: 6px 14px; border-radius: 6px; font-weight: 700; font-size: 0.84rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 6px rgba(124, 58, 237, 0.25); transition: all 0.2s;" title="Open distraction-free fullscreen writing workspace with 15m timer">
            <i class="fa-solid fa-rocket"></i> Launch Task 4
          </button>
        </div>
      </div>

      <div style="font-size: 1.02rem; font-weight: 700; color: #0f172a; margin-bottom: 14px; line-height: 1.5; padding: 10px 14px; background: #f5f3ff; border-left: 4px solid #7c3aed; border-radius: 0 6px 6px 0;">
        <strong>Debate Prompt:</strong> ${prompt}
      </div>

      <!-- Side-by-Side Historical Interpretations -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; margin-bottom: 16px;">
        ${renderInterpCard(interp1, 1, '#c4b5fd', '#faf5ff', '#6d28d9')}
        ${renderInterpCard(interp2, 2, '#cbd5e1', '#ffffff', '#334155')}
      </div>

      <!-- 3-Step Historiographical Planning Matrix -->
      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 12px 14px; margin-bottom: 16px;">
        <div style="font-weight: 700; font-size: 0.85rem; color: #6d28d9; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-table-columns"></i> 3-Step Historiographical Matrix: Thesis &bull; Counter-Thesis &bull; Independent Synthesis
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px;">
          ${matrix
            .map(
              (m, mIdx) => `
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-top: 3px solid ${mIdx === 0 ? '#8b5cf6' : mIdx === 1 ? '#ec4899' : '#059669'}; border-radius: 6px; padding: 10px;">
              <strong style="display: block; font-size: 0.82rem; color: #1e293b; margin-bottom: 4px; text-transform: uppercase;">
                ${m.col || m.title || `Step ${mIdx + 1}`}
              </strong>
              <div style="font-size: 0.82rem; color: #475569; line-height: 1.4;">
                ${m.text || m.prompt || ''}
              </div>
            </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- Analytical Connectives (Click-to-Insert) -->
      <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; align-items: center;">
        <span style="font-size: 0.78rem; font-weight: 700; color: #6d28d9; text-transform: uppercase;">Historiographical Connectives (Click to Insert):</span>
        ${connectives
          .map(
            (c) => `
          <button type="button" class="connective-chip" data-connective="${c.replace(/"/g, '&quot;')}" style="background: #ffffff; border: 1px solid #ddd6fe; color: #6d28d9; padding: 3px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.15s ease;" title="Click to insert at cursor">${c}</button>
        `,
          )
          .join('')}
      </div>

      <!-- Pupil Writing Workspace Area -->
      <textarea class="interactive-textarea" style="width: 100%; box-sizing: border-box; min-height: 110px; padding: 12px; border: 1.5px solid #ddd6fe; border-radius: 6px; font-size: 0.92rem; font-family: inherit; resize: vertical; line-height: 1.5;" placeholder="Evaluate both interpretations: analyse the arguments of Interpretation 1, contrast with Interpretation 2, and weigh against specific historical knowledge to reach your sustained verdict..."></textarea>

      ${
        modelAnswer
          ? `
        <details class="model-paragraph-reveal" style="margin-top: 12px; border: 1px dashed #7c3aed; border-radius: 6px; padding: 8px 12px; background: #faf5ff;">
          <summary style="cursor: pointer; color: #6d28d9; font-weight: 700; font-size: 0.88rem; outline: none; display: flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-award"></i> [ Show Level 4 Target Exemplar Model Answer ]
          </summary>
          <div class="scaffold-box model-box" style="margin-top: 10px; padding: 12px 15px; background: #ffffff; border-left: 3px solid #7c3aed; border-radius: 4px; font-size: 0.92rem; color: #1e293b; line-height: 1.6; border: 1px solid #ddd6fe;">
            ${modelAnswer}
          </div>
        </details>
      `
          : ''
      }
    </div>
  `;
}

export function renderBecauseButSoTaskHTML(task, lessonIndex, tIdx, unitId) {
  const taskId = task.id || `task-bbs-${lessonIndex}-${tIdx}`;
  const title = task.title || 'The "Because, But, So" Strategy • Sentence Expansion';
  const subtitle =
    task.subtitle ||
    'Hochman Analytical Framework • Rehearsing Causal, Complex & Consequential Syntax';
  const instruction =
    task.instruction ||
    'Complete each sentence using precise historical evidence to demonstrate causal reasoning, historical complexity, and long-term significance before tackling the exam questions.';
  const stem = task.stem || task.question || 'Historical Stem';

  const becauseObj = task.because || {};
  const becauseGuidance =
    becauseObj.guidance ||
    'Causal Explanation: Explain the precise historical cause, military necessity, or trigger mechanism.';
  const becausePlaceholder =
    becauseObj.placeholder ||
    '...BECAUSE... (Explain why this happened using precise historical evidence)';
  const becauseModel = becauseObj.model || becauseObj.model_answer || '';

  const butObj = task.but || {};
  const butGuidance =
    butObj.guidance ||
    'Nuance & Critical Limitation: Explain the severe battlefield flaws, combat failures, or untackled obstacles.';
  const butPlaceholder =
    butObj.placeholder || '...BUT... (Explain the limitations, complications, or contradictions)';
  const butModel = butObj.model || butObj.model_answer || '';

  const soObj = task.so || {};
  const soGuidance =
    soObj.guidance ||
    'Consequence & Lasting Significance: Explain the ripple effect on military medicine, surgical protocol, or survival rates.';
  const soPlaceholder =
    soObj.placeholder || '...SO... (Explain the lasting historical consequence or transformation)';
  const soModel = soObj.model || soObj.model_answer || '';

  return `
    <div class="task-box because-but-so-interactive" style="margin-bottom: 25px; background: #ffffff; padding: 22px; border-radius: 12px; border: 2px solid #4f46e5; box-shadow: 0 4px 16px rgba(79, 70, 229, 0.08);">
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 1.5px solid #e0e7ff; padding-bottom: 12px; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 38px; height: 38px; border-radius: 8px; background: #4f46e5; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 1.15rem; flex-shrink: 0; box-shadow: 0 2px 6px rgba(79, 70, 229, 0.3);">
            <i class="fa-solid fa-pen-ruler"></i>
          </div>
          <div>
            <h4 style="margin: 0; color: #312e81; font-size: 1.15rem; font-weight: 800; font-family: 'Playfair Display', Georgia, serif;">${title}</h4>
            <div style="font-size: 0.8rem; color: #4338ca; font-weight: 600; margin-top: 1px;">${subtitle}</div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <button type="button" class="btn-reveal-all-bbs no-print" onclick="window.toggleBbsMask && window.toggleBbsMask(this)" style="background: #eef2ff; border: 1.5px solid #c7d2fe; color: #4338ca; font-size: 0.78rem; font-weight: 700; padding: 5px 12px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s ease;">
            <i class="fa-solid fa-chalkboard-user"></i> <span>Teacher Whiteboard Key</span>
          </button>
          <span style="background: #4f46e5; color: #ffffff; font-size: 0.75rem; font-weight: 700; padding: 5px 10px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.5px; display: inline-flex; align-items: center; gap: 5px;">
            <i class="fa-solid fa-feather-pointed" style="color: #a5b4fc;"></i> The Writing Revolution
          </span>
        </div>
      </div>

      ${instruction ? `<p style="font-size: 0.95rem; color: #475569; font-style: italic; margin-top: 0; margin-bottom: 16px; line-height: 1.5;">${instruction}</p>` : ''}

      <!-- Historical Anchor Stem Callout -->
      <div style="background: linear-gradient(135deg, #eef2ff 0%, #f5f3ff 100%); border: 1.5px solid #c7d2fe; border-left: 5px solid #4f46e5; border-radius: 8px; padding: 14px 18px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
        <div style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: #4338ca; letter-spacing: 0.5px; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-anchor"></i> <span>Core Historical Stem:</span>
        </div>
        <div style="font-size: 1.05rem; font-weight: 700; color: #1e1b4b; line-height: 1.5; font-family: 'Playfair Display', Georgia, serif;">&ldquo;${stem}&rdquo;</div>
      </div>

      <!-- 3 Conjunction Expansion Cards -->
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <!-- Card 1: BECAUSE -->
        <div class="bbs-card" style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 8px; padding: 14px; transition: all 0.2s ease;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="background: #16a34a; color: #ffffff; font-weight: 900; font-size: 0.78rem; padding: 3px 8px; border-radius: 4px; letter-spacing: 0.5px;">BECAUSE</span>
              <strong style="color: #166534; font-size: 0.92rem;">${becauseGuidance}</strong>
            </div>
            ${
              becauseModel
                ? `
              <button type="button" class="btn-single-bbs-model no-print" onclick="window.toggleSingleBbsModel && window.toggleSingleBbsModel(this)" style="background: #ffffff; border: 1px solid #86efac; color: #166534; font-size: 0.76rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 5px;">
                <i class="fa-solid fa-eye"></i> <span>Model Stem</span>
              </button>
            `
                : ''
            }
          </div>
          <textarea class="student-answer-input bbs-input" style="width: 100%; box-sizing: border-box; min-height: 60px; padding: 10px; border: 1px solid #86efac; border-radius: 6px; font-size: 0.95rem; font-family: inherit; resize: vertical; line-height: 1.45; background: #ffffff;" placeholder="${becausePlaceholder}"></textarea>
          ${
            becauseModel
              ? `
            <div class="bbs-model-box" style="display: none; margin-top: 10px; padding: 12px 14px; background: #ffffff; border-left: 3.5px solid #16a34a; border-radius: 4px; font-size: 0.92rem; color: #14532d; line-height: 1.5; border: 1px solid #bbf7d0;">
              <strong>Exemplar Completion:</strong> ${becauseModel}
            </div>
          `
              : ''
          }
        </div>

        <!-- Card 2: BUT -->
        <div class="bbs-card" style="background: #fffbeb; border: 1.5px solid #fde68a; border-radius: 8px; padding: 14px; transition: all 0.2s ease;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="background: #d97706; color: #ffffff; font-weight: 900; font-size: 0.78rem; padding: 3px 8px; border-radius: 4px; letter-spacing: 0.5px;">BUT</span>
              <strong style="color: #92400e; font-size: 0.92rem;">${butGuidance}</strong>
            </div>
            ${
              butModel
                ? `
              <button type="button" class="btn-single-bbs-model no-print" onclick="window.toggleSingleBbsModel && window.toggleSingleBbsModel(this)" style="background: #ffffff; border: 1px solid #fde68a; color: #92400e; font-size: 0.76rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 5px;">
                <i class="fa-solid fa-eye"></i> <span>Model Stem</span>
              </button>
            `
                : ''
            }
          </div>
          <textarea class="student-answer-input bbs-input" style="width: 100%; box-sizing: border-box; min-height: 60px; padding: 10px; border: 1px solid #fde68a; border-radius: 6px; font-size: 0.95rem; font-family: inherit; resize: vertical; line-height: 1.45; background: #ffffff;" placeholder="${butPlaceholder}"></textarea>
          ${
            butModel
              ? `
            <div class="bbs-model-box" style="display: none; margin-top: 10px; padding: 12px 14px; background: #ffffff; border-left: 3.5px solid #d97706; border-radius: 4px; font-size: 0.92rem; color: #78350f; line-height: 1.5; border: 1px solid #fef3c7;">
              <strong>Exemplar Completion:</strong> ${butModel}
            </div>
          `
              : ''
          }
        </div>

        <!-- Card 3: SO -->
        <div class="bbs-card" style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 8px; padding: 14px; transition: all 0.2s ease;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="background: #2563eb; color: #ffffff; font-weight: 900; font-size: 0.78rem; padding: 3px 8px; border-radius: 4px; letter-spacing: 0.5px;">SO</span>
              <strong style="color: #1e40af; font-size: 0.92rem;">${soGuidance}</strong>
            </div>
            ${
              soModel
                ? `
              <button type="button" class="btn-single-bbs-model no-print" onclick="window.toggleSingleBbsModel && window.toggleSingleBbsModel(this)" style="background: #ffffff; border: 1px solid #bfdbfe; color: #1e40af; font-size: 0.76rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 5px;">
                <i class="fa-solid fa-eye"></i> <span>Model Stem</span>
              </button>
            `
                : ''
            }
          </div>
          <textarea class="student-answer-input bbs-input" style="width: 100%; box-sizing: border-box; min-height: 60px; padding: 10px; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 0.95rem; font-family: inherit; resize: vertical; line-height: 1.45; background: #ffffff;" placeholder="${soPlaceholder}"></textarea>
          ${
            soModel
              ? `
            <div class="bbs-model-box" style="display: none; margin-top: 10px; padding: 12px 14px; background: #ffffff; border-left: 3.5px solid #2563eb; border-radius: 4px; font-size: 0.92rem; color: #1e3a8a; line-height: 1.5; border: 1px solid #dbeafe;">
              <strong>Exemplar Completion:</strong> ${soModel}
            </div>
          `
              : ''
          }
        </div>
      </div>
    </div>
  `;
}

export function renderTextbookSpotlightDrawers(lesson) {
  if (!lesson || (!lesson.key_figure && !lesson.concept_spotlight && !lesson.archival_dispatch)) {
    return '';
  }

  const getMonogramInitials = (name) => {
    if (!name) return 'KF';
    const clean = name
      .replace(/^(Prince|Field Marshal|Kaiser|Archduke|Count|Lord|Sir|General|Colonel)\s+/i, '')
      .trim();
    const parts = clean.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return clean.slice(0, 2).toUpperCase();
  };

  let html = `
    <div class="textbook-spotlight-deck" style="margin: 32px 0 24px 0; display: flex; flex-direction: column; gap: 12px;">
      <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 4px;">
        <span style="font-size: 0.82rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #334155; display: inline-flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-book-bookmark" style="color: #2563eb;"></i> Textbook Spotlight &amp; Archival Dossiers
        </span>
        <span style="font-size: 0.76rem; color: #64748b; font-weight: 600;">
          Publisher Print Spread Alignment
        </span>
      </div>
  `;

  if (lesson.key_figure) {
    const kf = lesson.key_figure;
    const initials = getMonogramInitials(kf.name);
    html += `
      <details class="spotlight-drawer spotlight-drawer-figure archival-drawer" style="margin: 6px 0; border: 1px solid #cbd5e1; border-radius: 6px; background: #f8fafc; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.02); transition: all 0.25s ease;">
        <summary style="padding: 4px 10px; min-height: 26px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: space-between; background: #f8fafc; color: #0f172a; list-style: none; user-select: none; transition: background 0.15s ease;">
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: nowrap; min-width: 0; flex: 1; margin-right: 8px;">
            <span class="archival-meta-tag" style="background: #1d4ed8; color: #ffffff; padding: 2px 6px; border-radius: 3px; font-size: 0.62rem; font-weight: 800; letter-spacing: 0.4px; line-height: 1.2; white-space: nowrap; flex-shrink: 0;">
              <i class="fa-solid fa-user" style="margin-right: 3px;"></i>KEY FIGURE
            </span>
            <span class="archival-drawer-title" style="font-family: 'Playfair Display', Georgia, serif; font-size: 0.82rem; color: #1e293b; font-weight: 700; line-height: 1.2; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              ${kf.name} ${kf.lifespan ? `(${kf.lifespan})` : ''}${kf.epithet ? ` &bull; ${kf.epithet}` : ''}
            </span>
          </div>
          <span class="drawer-toggle-indicator" style="font-size: 0.68rem; color: #64748b; display: inline-flex; align-items: center; gap: 4px; font-weight: 600; flex-shrink: 0; white-space: nowrap;">
            Figure Spotlight &bull; Expand <span class="drawer-caret">&#9660;</span>
          </span>
        </summary>
        <div style="padding: 16px 20px 20px 20px; border-top: 1px solid #f1f5f9; background: #f8fafc;">
          <div style="display: flex; gap: 16px; align-items: flex-start; margin-bottom: 12px;">
            <div style="width: 48px; height: 48px; border-radius: 50%; background: #1e3a8a; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.05rem; flex-shrink: 0; box-shadow: 0 2px 6px rgba(30,58,138,0.25);">
              ${initials}
            </div>
            <div style="flex: 1;">
              ${kf.epithet ? `<div style="font-size: 0.88rem; font-weight: 700; color: #2563eb; margin-bottom: 4px;">${kf.epithet}</div>` : ''}
              <div style="font-size: 0.92rem; color: #334155; line-height: 1.5;">${kf.significance}</div>
            </div>
          </div>
          ${
            kf.quote
              ? `
            <blockquote style="margin: 0 0 12px 0; padding: 10px 14px; background: #ffffff; border-left: 3px solid #94a3b8; font-style: italic; color: #334155; font-size: 0.92rem; border-radius: 0 4px 4px 0; border-top: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0;">
              "${kf.quote.replace(/^["'“”]+|["'“”]+$/g, '')}"
            </blockquote>
          `
              : ''
          }
          ${
            kf.core_achievement
              ? `
            <div style="font-size: 0.9rem; line-height: 1.55; color: #1e293b; margin-bottom: 6px;">
              <strong style="color: #0f172a;">Core Historical Achievement:</strong> ${kf.core_achievement}
            </div>
          `
              : ''
          }
          ${
            kf.actions && Array.isArray(kf.actions) && kf.actions.length > 0
              ? `
            <div style="margin-top: 10px;">
              <strong style="font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.5px; color: #475569; display: block; margin-bottom: 4px;">Decisive Actions:</strong>
              <ul style="margin: 0; padding-left: 20px; font-size: 0.88rem; color: #334155; line-height: 1.5;">
                ${kf.actions.map((a) => `<li style="margin-bottom: 3px;">${a}</li>`).join('')}
              </ul>
            </div>
          `
              : ''
          }
        </div>
      </details>
    `;
  }

  if (lesson.concept_spotlight) {
    const cs = lesson.concept_spotlight;
    html += `
      <details class="spotlight-drawer spotlight-drawer-concept archival-drawer" style="margin: 6px 0; border: 1px solid #cbd5e1; border-radius: 6px; background: #f8fafc; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.02); transition: all 0.25s ease;">
        <summary style="padding: 4px 10px; min-height: 26px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: space-between; background: #f8fafc; color: #0f172a; list-style: none; user-select: none; transition: background 0.15s ease;">
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: nowrap; min-width: 0; flex: 1; margin-right: 8px;">
            <span class="archival-meta-tag" style="background: #b45309; color: #ffffff; padding: 2px 6px; border-radius: 3px; font-size: 0.62rem; font-weight: 800; letter-spacing: 0.4px; line-height: 1.2; white-space: nowrap; flex-shrink: 0;">
              <i class="fa-solid fa-lightbulb" style="margin-right: 3px;"></i>CONCEPT SPOTLIGHT
            </span>
            <span class="archival-drawer-title" style="font-family: 'Playfair Display', Georgia, serif; font-size: 0.82rem; color: #1e293b; font-weight: 700; line-height: 1.2; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              ${cs.title}${cs.category ? ` &bull; ${cs.category}` : ''}
            </span>
          </div>
          <span class="drawer-toggle-indicator" style="font-size: 0.68rem; color: #64748b; display: inline-flex; align-items: center; gap: 4px; font-weight: 600; flex-shrink: 0; white-space: nowrap;">
            Core Concept &bull; Expand <span class="drawer-caret">&#9660;</span>
          </span>
        </summary>
        <div style="padding: 16px 20px 20px 20px; border-top: 1px solid #f1f5f9; background: #fdfcf9;">
          ${cs.category ? `<div style="font-size: 0.76rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.6px; color: #92400e; margin-bottom: 8px;">${cs.category}</div>` : ''}
          <div style="margin-bottom: 12px; font-size: 0.92rem; line-height: 1.55; color: #1e293b;">
            <strong style="color: #0f172a;">Core Definition:</strong> ${cs.definition || cs.body || ''}
          </div>
          ${
            cs.historical_case_study
              ? `
            <div style="margin-bottom: 12px; padding: 12px 14px; background: #ffffff; border: 1px solid #fed7aa; border-radius: 6px; font-size: 0.9rem; line-height: 1.55; color: #451a03;">
              <strong style="color: #92400e; display: block; margin-bottom: 4px; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.5px;">Historical Case Study</strong>
              ${cs.historical_case_study}
            </div>
          `
              : ''
          }
          ${
            cs.analytical_takeaway || cs.takeaway
              ? `
            <div style="font-size: 0.9rem; line-height: 1.55; color: #1e293b;">
              <strong style="color: #0f172a;">Analytical Takeaway:</strong> ${cs.analytical_takeaway || cs.takeaway}
            </div>
          `
              : ''
          }
        </div>
      </details>
    `;
  }

  if (lesson.archival_dispatch) {
    const ad = lesson.archival_dispatch;
    html += `
      <details class="spotlight-drawer spotlight-drawer-dispatch archival-drawer" style="margin: 6px 0; border: 1px solid #cbd5e1; border-radius: 6px; background: #f8fafc; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.02); transition: all 0.25s ease;">
        <summary style="padding: 4px 10px; min-height: 26px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: space-between; background: #f8fafc; color: #0f172a; list-style: none; user-select: none; transition: background 0.15s ease;">
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: nowrap; min-width: 0; flex: 1; margin-right: 8px;">
            <span class="archival-meta-tag" style="background: #475569; color: #ffffff; padding: 2px 6px; border-radius: 3px; font-size: 0.62rem; font-weight: 800; letter-spacing: 0.4px; line-height: 1.2; white-space: nowrap; flex-shrink: 0;">
              <i class="fa-solid fa-scroll" style="margin-right: 3px;"></i>ARCHIVAL DISPATCH
            </span>
            <span class="archival-drawer-title" style="font-family: 'Playfair Display', Georgia, serif; font-size: 0.82rem; color: #1e293b; font-weight: 700; line-height: 1.2; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              ${ad.title}${ad.origin_and_date ? ` &bull; ${ad.origin_and_date}` : ''}
            </span>
          </div>
          <span class="drawer-toggle-indicator" style="font-size: 0.68rem; color: #64748b; display: inline-flex; align-items: center; gap: 4px; font-weight: 600; flex-shrink: 0; white-space: nowrap;">
            Primary Dispatch &bull; Expand <span class="drawer-caret">&#9660;</span>
          </span>
        </summary>
        <div style="padding: 16px 20px 20px 20px; border-top: 1px solid #f1f5f9; background: #fafaf9;">
          ${ad.origin_and_date ? `<div style="font-size: 0.78rem; font-weight: 700; color: #475569; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">${ad.origin_and_date}</div>` : ''}
          <div class="archival-source-box" style="margin: 8px 0 12px 0; background: #fffdfa; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px;">
            <div class="archival-source-body" style="font-family: 'Newsreader', Georgia, serif; font-size: 0.98rem; line-height: 1.65; color: #1e293b; font-style: italic;">
              "${(ad.excerpt || ad.body || '').replace(/^["'“”]+|["'“”]+$/g, '')}"
            </div>
          </div>
          ${
            ad.provenance_significance
              ? `
            <div style="margin-bottom: 8px; font-size: 0.88rem; line-height: 1.5; color: #334155;">
              <strong style="color: #0f172a;">Provenance &amp; Context:</strong> ${ad.provenance_significance}
            </div>
          `
              : ''
          }
          ${
            ad.enquiry_connection
              ? `
            <div style="font-size: 0.88rem; line-height: 1.5; color: #334155;">
              <strong style="color: #0f172a;">Enquiry Connection:</strong> ${ad.enquiry_connection}
            </div>
          `
              : ''
          }
        </div>
      </details>
    `;
  }

  html += `</div>`;
  return html;
}

export function renderLesson(lesson) {
  if (window.doNowTimers) {
    Object.values(window.doNowTimers).forEach((t) => {
      if (t && t.interval) clearInterval(t.interval);
    });
    window.doNowTimers = {};
  }
  window.postRenderHooks = [];
  const activeUnit =
    window.currentUnitData || (appStore && appStore.state && appStore.state.activeUnitData) || {};
  const unitId =
    activeUnit.id ||
    (typeof window !== 'undefined' && window.location && window.location.search
      ? new URLSearchParams(window.location.search).get('id') ||
        new URLSearchParams(window.location.search).get('unit')
      : null) ||
    window.currentUnitId;
  const isEarlyModern = unitId === 'early_modern_world';
  const isCme = unitId === 'cme_new';
  const isGCSE =
    unitId === 'weimar_nazi_germany' ||
    unitId === 'cme_new' ||
    unitId === 'usa' ||
    unitId === 'eee' ||
    unitId === 'edexcel_medicine' ||
    activeUnit.isGCSE ||
    false;
  const isKs2 =
    unitId === 'ks2_ww2' ||
    (typeof unitId === 'string' && unitId.startsWith('ks2_')) ||
    Boolean(window.currentUnitData && window.currentUnitData.is_ks2) ||
    Boolean(window.currentUnitId && window.currentUnitId.startsWith('ks2_')) ||
    Boolean(
      typeof appStore !== 'undefined' &&
      appStore.state &&
      appStore.state.activeUnitData &&
      appStore.state.activeUnitData.is_ks2,
    );
  const isKs3 =
    !isKs2 &&
    (unitId === 'early_modern_world' ||
      unitId === 'water_and_sanitation' ||
      unitId === 'great_war' ||
      unitId === 'great_war_part2' ||
      unitId === 'medieval_england' ||
      unitId === 'industrialisation_and_empire' ||
      unitId === 'first_british_empire' ||
      unitId === 'monarchy_religion_power' ||
      activeUnit.is_ks3 ||
      !isGCSE);
  const hasInlineNarrativeSources =
    Array.isArray(lesson.narrative_blocks) &&
    lesson.narrative_blocks.some(
      (b) => b && (b.source || b.sources || (unitId === 'edexcel_medicine' && b.image)),
    );
  let htmlDoNow = '',
    htmlDoNowInner = '',
    htmlVocabInner = '',
    htmlSpineInner = '',
    htmlLearningObjectives = '',
    htmlPrimary = '',
    htmlSources1 = '',
    htmlNarrative = '',
    htmlSpotlightDrawers = '',
    htmlVideo = '',
    htmlPairShare = '',
    htmlHistorian = '',
    htmlTasks = '',
    htmlExamPractice = '',
    htmlVocabDeck = '',
    htmlExtended = '';
  const formatBold = window.formatBold;
  let globalQuestionNum = 1;
  const formatQuestion = (qText, prependNumber = true) => {
    if (!qText) return '';
    let cleaned = cleanQuestionText(qText);
    if (prependNumber) return `Question ${globalQuestionNum++}: ${formatBold(cleaned)}`;
    return formatBold(cleaned);
  };
  lesson = JSON.parse(JSON.stringify(lesson));
  assignQuestionNumbers(lesson, unitId);

  // Normalize do_now format
  if (Array.isArray(lesson.do_now)) {
    lesson.do_now = {
      type: 'retrieval_starter',
      title: 'Recall & Retrieval',
      instructions: 'Answer these questions in full sentences.',
      items: lesson.do_now.map((t) => ({ question: t.q || t.question, answer: t.a || t.answer })),
    };
  } else if (
    lesson.do_now &&
    (lesson.do_now.type === 'questions' || lesson.do_now.type === 'retrieval_starter') &&
    lesson.do_now.tasks
  ) {
    lesson.do_now.items = lesson.do_now.tasks.map((t) => ({
      question: t.q || t.question,
      answer: t.a || t.answer,
    }));
  }

  // Extract exam tasks from tasks array so they are not rendered inline
  let extractedExamTasks = [];
  const isSpecialTaskType = (t) =>
    t &&
    (t.type === 'source_utility' ||
      t.taskType === 'source_utility' ||
      t.type === 'historical_interpretations' ||
      t.taskType === 'historical_interpretations' ||
      t.type === 'two_sided_argument' ||
      t.source_a ||
      t.sourceA ||
      t.interp1 ||
      t.interpretation_1);

  if (lesson.narrative_blocks) {
    lesson.narrative_blocks.forEach((block) => {
      if (block.tasks) {
        const eTasks = block.tasks.filter(
          (t) => !isSpecialTaskType(t) && (t.text || t.question || '').includes('marks)'),
        );
        extractedExamTasks.push(...eTasks);
        block.tasks = block.tasks.filter(
          (t) => isSpecialTaskType(t) || !(t.text || t.question || '').includes('marks)'),
        );
      }
    });
  }
  if (lesson.tasks) {
    const eTasks = lesson.tasks.filter(
      (t) => !isSpecialTaskType(t) && (t.text || t.question || '').includes('marks)'),
    );
    extractedExamTasks.push(...eTasks);
    lesson.tasks = lesson.tasks.filter(
      (t) => isSpecialTaskType(t) || !(t.text || t.question || '').includes('marks)'),
    );
  }

  if (lesson.exam_practice && Array.isArray(lesson.exam_practice)) {
    // Duplication removed: exam_practice is rendered directly below.
  }

  assignQuestionNumbers(lesson, unitId);
  lesson.unitId = unitId;
  window.currentActiveLesson = lesson;

  // Tabs container logic
  let heroImage = '';
  if (lesson.banner) {
    if (typeof lesson.banner === 'string') {
      heroImage = lesson.banner;
    } else if (typeof lesson.banner === 'object' && lesson.banner !== null) {
      heroImage = lesson.banner.image || lesson.banner.url || lesson.banner.src || '';
    }
  }
  if (!heroImage && lesson.hero_image) {
    heroImage =
      typeof lesson.hero_image === 'string'
        ? lesson.hero_image
        : lesson.hero_image.image || lesson.hero_image.url || '';
  }
  if (!heroImage && lesson.cover_image) {
    heroImage =
      typeof lesson.cover_image === 'string'
        ? lesson.cover_image
        : lesson.cover_image.image ||
          (Array.isArray(lesson.cover_image) ? lesson.cover_image[0] : '');
  }
  if (!heroImage && lesson.sources && lesson.sources.length > 0) {
    heroImage =
      lesson.sources[0].src || lesson.sources[0].image_url || lesson.sources[0].image || '';
  }
  if (!heroImage && lesson.narrative_blocks && lesson.narrative_blocks.length > 0) {
    for (const b of lesson.narrative_blocks) {
      if (b.source && (b.source.image || b.source.src || b.source.image_url)) {
        heroImage = b.source.image || b.source.src || b.source.image_url;
        break;
      }
    }
  }
  if (!heroImage && lesson.right_page_task && lesson.right_page_task.visual_source) {
    heroImage =
      lesson.right_page_task.visual_source.image || lesson.right_page_task.visual_source.src || '';
  }

  const isTrip =
    (window.currentUnitData && window.currentUnitData.type === 'trip') ||
    (appStore.state.activeUnitData && appStore.state.activeUnitData.type === 'trip') ||
    window.currentUnitId === 'trip_ypres' ||
    appStore.state.selectedUnitId === 'trip_ypres' ||
    lesson.cwgc_data !== undefined ||
    lesson.id === 'day_0' ||
    (lesson.id && (lesson.id.startsWith('day_') || lesson.id.startsWith('hero_')));
  let lessonPrefix = 'Lesson';
  let ktMatch = lesson.title ? lesson.title.match(/^(?:KT|Key Topic)\s*([\d\.]+)/i) : null;

  if (!heroImage) {
    if (window.currentUnitId === 'cme_new' && ktMatch) {
      if (ktMatch[1].startsWith('1')) heroImage = '/assets/cme_new_kt1_cover.png';
      else if (ktMatch[1].startsWith('2')) heroImage = '/assets/cme_new_kt2_cover.png';
      else if (ktMatch[1].startsWith('3')) heroImage = '/assets/cme_new_kt3_cover.png';
    } else if (window.currentUnitId === 'edexcel_medicine' && ktMatch) {
      if (ktMatch[1].startsWith('1')) heroImage = '/images/banner_medicine_medieval.jpg';
      else if (ktMatch[1].startsWith('2')) heroImage = '/images/banner_medicine_renaissance.jpg';
      else if (ktMatch[1].startsWith('3')) heroImage = '/images/banner_medicine_18th_19th.jpg';
      else if (ktMatch[1].startsWith('4')) heroImage = '/images/banner_medicine_modern.jpg';
      else if (ktMatch[1].startsWith('5')) heroImage = '/images/banner_medicine_western_front.jpg';
    } else if (window.currentUnitId === 'usa' && ktMatch) {
      if (ktMatch[1].startsWith('1'))
        heroImage = '/units/usa/assets/sources/airborne-little-rock-patrol.jpg';
      else if (ktMatch[1].startsWith('2'))
        heroImage = '/units/usa/assets/sources/birmingham-protests-dogs-1963.jpg';
      else if (ktMatch[1].startsWith('3'))
        heroImage = '/units/usa/assets/sources/us-soldier-patrolling-swamp.jpg';
      else if (ktMatch[1].startsWith('4'))
        heroImage = '/units/usa/assets/sources/antiwar-pentagon-protest-1967.jpg';
    } else {
      heroImage = window.currentUnitData?.homepage_background || '/images/default_hero.jpg';
    }
  }

  if (isTrip) {
    if (lesson.id === 'day_0') {
      lessonPrefix = 'Expedition Briefing';
    } else if (lesson.id && lesson.id.startsWith('day_')) {
      lessonPrefix = `Day ${lesson.id.split('_')[1]} · Field Guide`;
    } else if (lesson.id === 'hero_crummack') {
      lessonPrefix = 'Pupil Family Archive · Year 10 Family';
    } else if (lesson.id && lesson.id.startsWith('hero_lowry_')) {
      lessonPrefix = 'Home Front Memorial · Manor Way Grange';
    } else if (lesson.id && lesson.id.startsWith('hero_')) {
      lessonPrefix = 'Local Hero · Fallen of the Salient';
    }
  } else if (ktMatch) {
    lessonPrefix = `KT ${ktMatch[1]}`;
  } else if (lesson.id && lesson.id.startsWith('lesson_')) {
    const parts = lesson.id.split('_');
    const rawNum = parseInt(parts[1], 10);
    const lessonNum = isNaN(rawNum) || rawNum === 0 ? 1 : rawNum;
    if (parts.length > 2) {
      lessonPrefix = `Lesson ${lessonNum}.${parts.slice(2).join('.')}`;
    } else {
      lessonPrefix = `Lesson ${lessonNum}`;
    }
  }

  let contentArea = document.getElementById('content-area');
  if (!contentArea) {
    const mainContent =
      document.getElementById('main-content') ||
      document.querySelector('.content-container') ||
      document.body;
    contentArea = document.createElement('div');
    contentArea.id = 'content-area';
    contentArea.style.cssText =
      'animation: fadeInUp 0.3s ease-out; background-color: var(--bg-app); min-height: 100vh;';
    mainContent.innerHTML = '';
    mainContent.appendChild(contentArea);
  }
  if (contentArea) contentArea.style.paddingTop = '0'; // Fix gap

  let html = `<div class="lesson-content">`;

  let headerEnquiry = lesson.enquiry || lesson.enquiry_question || lesson.inquiry_question;
  let targetText = headerEnquiry || lesson.title || '';
  if (targetText && targetText.length > 90) {
    targetText = lesson.title || targetText;
  }
  // Sticky Header (Clean spatial curriculum anchor with streamlined Classroom Tools)
  const allUnitLessons =
    (appStore.state.activeUnitData && appStore.state.activeUnitData.lessons) ||
    (window.currentUnitData && window.currentUnitData.lessons) ||
    [];
  const currentIndex = allUnitLessons.findIndex(
    (l) => l.title === lesson.title || (lesson.id && l.id === lesson.id),
  );
  const grEntry =
    (activeUnit.guided_reading || []).find((gr) => gr.lesson_index === currentIndex) ||
    ((window.currentUnitData && window.currentUnitData.guided_reading) || []).find(
      (gr) => gr.lesson_index === currentIndex,
    );

  const isTeacherActive =
    typeof document !== 'undefined' && document.body.classList.contains('teacher-mode-active');
  const isWbActive =
    typeof document !== 'undefined' && document.body.classList.contains('whiteboard-mode-active');
  const hasActiveTool = isTeacherActive || isWbActive;

  const isGCSEUnit = ['cme_new', 'edexcel_medicine', 'eee', 'weimar_nazi_germany', 'usa'].includes(
    unitId || (typeof window !== 'undefined' && window.currentUnitId),
  );
  let stickyCountLabel = '';
  if (allUnitLessons.length > 0) {
    stickyCountLabel = isGCSEUnit
      ? `Lesson ${currentIndex + 1} of ${allUnitLessons.length}`
      : `Enquiry ${currentIndex + 1} of ${allUnitLessons.length}`;
  } else {
    stickyCountLabel = lesson.title || '';
  }

  const stickyAnchorText = isTrip
    ? `${lessonPrefix}: ${lesson.title.split('(')[0].trim()}`
    : `<span class="sticky-lesson-prefix" style="color: #1e3a8a; font-weight: 800; font-family: 'Inter', sans-serif; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.5px;">${lessonPrefix}</span> <span style="color: #94a3b8; margin: 0 4px;">&bull;</span> <span class="sticky-lesson-enquiry-count" style="color: #475569; font-weight: 600; font-family: 'Inter', sans-serif; font-size: 0.92rem;">${stickyCountLabel}</span>`;

  html += `
      <div class="sticky-lesson-header">
          <h4 class="sticky-lesson-title" title="${(lesson.title || '').replace(/"/g, '&quot;')}">
            ${stickyAnchorText}
            <span class="edition-badge" title="Curriculum Edition" style="display: inline-block; font-size: 0.72rem; font-weight: 600; vertical-align: middle; margin-left: 8px; padding: 2px 7px; border-radius: 10px; background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; letter-spacing: 0.5px; font-family: 'Inter', sans-serif;">Edition ${activeUnit.edition || '2026.1'}</span>
          </h4>
          <div class="sticky-lesson-actions">
          ${
            isTrip
              ? ''
              : `
              ${
                isKs2
                  ? `
                    <button type="button" class="btn btn-ks2-worksheet-launcher" onclick="window.openKs2WorksheetModal('${lesson.id}', ${currentIndex})" style="padding: 6px 12px; font-size: 0.88rem; background: #eff6ff; color: #1e3a8a; border: 1.5px solid #bfdbfe; font-weight: 700; border-radius: 6px; box-shadow: 0 1px 3px rgba(30, 58, 138, 0.1); display: inline-flex; align-items: center; gap: 6px; cursor: pointer;" title="Open A4 Companion Worksheet (PDF & Print)"><i class="fa-solid fa-file-pdf" style="color: #2563eb;"></i> <span>Enquiry Worksheet</span></button>
                    <button type="button" class="btn btn-ks2-teacher-launcher" onclick="window.openKs2TeacherGuidanceModal('${lesson.id}', ${currentIndex})" style="padding: 6px 12px; font-size: 0.88rem; background: #fdf2f8; color: #9d174d; border: 1.5px solid #fbcfe8; font-weight: 700; border-radius: 6px; box-shadow: 0 1px 3px rgba(157, 23, 77, 0.1); display: inline-flex; align-items: center; gap: 6px; cursor: pointer;" title="Junior School Non-Specialist Teacher Guidance & Answers"><i class="fa-solid fa-chalkboard-user" style="color: #be185d;"></i> <span>Teacher Guidance</span></button>
                    <a href="/pdfs/ks2_ww2/ks2_ww2_pupil_workbook.pdf" target="_blank" class="btn btn-ks2-workbook-launcher" style="padding: 6px 12px; font-size: 0.88rem; background: #f0fdf4; color: #166534; border: 1.5px solid #bbf7d0; font-weight: 700; text-decoration: none; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: inline-flex; align-items: center; gap: 6px;" title="Open complete 24-page pupil workbook (PDF)"><i class="fa-solid fa-book-bookmark" style="color: #16a34a;"></i> <span>Pupil Workbook (PDF)</span></a>
                  `
                  : ''
              }
              ${
                grEntry
                  ? `<button class="btn btn-guided-reading-launcher" style="padding: 6px 12px; font-size: 0.88rem; background: #fdf2f8; color: #9d174d; border: 1.5px solid #fbcfe8; font-weight: 700; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: inline-flex; align-items: center; gap: 6px; cursor: pointer;" data-action="open-guided-reading-modal" data-lesson-index="${currentIndex}" title="Open Guided Reading Extract: ${grEntry.book_title}"><i class="fa-solid fa-book-open-reader" style="color: #be185d;"></i> Guided Reading</button>`
                  : ''
              }
              ${
                unitId === 'edexcel_medicine' && currentIndex >= 0
                  ? `<a href="/units/edexcel_medicine/visual_revision_guide.html#spread-${currentIndex + 1}" target="_blank" class="btn" style="padding: 6px 12px; font-size: 0.88rem; background: #eff6ff; color: #1e3a8a; border: 1.5px solid #bfdbfe; font-weight: 700; text-decoration: none; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: inline-flex; align-items: center; gap: 6px;" title="Jump directly to this lesson's visual revision spread and exam model in the Masterclass Guide"><i class="fa-solid fa-book-open"></i> Revision Masterclass (Spread ${currentIndex + 1})</a>`
                  : ''
              }
              ${
                unitId === 'cme_new' && currentIndex >= 0
                  ? `<a href="/units/cme_new/visual_revision_guide.html#page_${6 + currentIndex}" target="_blank" class="btn" style="padding: 6px 12px; font-size: 0.88rem; background: #f0f9ff; color: #0369a1; border: 1.5px solid #bae6fd; font-weight: 700; text-decoration: none; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: inline-flex; align-items: center; gap: 6px;" title="Jump directly to this lesson's 1-page Specification Cheat Sheet in the Revision Guide"><i class="fa-solid fa-file-lines"></i> Specification Cheat Sheet (Page ${6 + currentIndex})</a>`
                  : ''
              }
              ${
                unitId === 'cme_new' || isCme
                  ? `<button type="button" class="btn btn-cme-theater-map" onclick="window.openCmeTheaterMapModal()" style="padding: 6px 12px; font-size: 0.88rem; background: #0284c7; color: #ffffff; border: 1.5px solid #0369a1; font-weight: 700; border-radius: 6px; box-shadow: 0 1px 3px rgba(2,132,199,0.3); display: inline-flex; align-items: center; gap: 6px; cursor: pointer;" title="Open High-Resolution Regional Map (Israel & Surrounding Neighbours) [Shortcut: M]"><i class="fa-solid fa-map" style="color: #ffffff;"></i> Regional Map</button>`
                  : ''
              }
              ${
                lesson.note_scaffold
                  ? `<button class="btn btn-note-scaffold-jump" onclick="const sc = document.getElementById('lesson-note-scaffold'); if(sc) { sc.open = true; sc.scrollIntoView({ behavior: 'smooth' }); }" style="padding: 6px 12px; font-size: 0.88rem; background: #f0fdf4; color: #166534; border: 1.5px solid #86efac; font-weight: 700; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: inline-flex; align-items: center; gap: 6px; cursor: pointer;" title="Jump directly to the Active Lesson Task"><i class="fa-solid fa-pen-to-square" style="color: #16a34a;"></i> Core Lesson Task</button>`
                  : ''
              }
            `
          }
        </div>
      </div>
    `;
  let bannerPosition =
    lesson.banner_position ||
    (typeof lesson.banner === 'object' && lesson.banner ? lesson.banner.position : null);

  if (
    (!bannerPosition || bannerPosition === 'center') &&
    (unitId === 'ks2_ww2' || window.currentUnitId === 'ks2_ww2' || isKs2)
  ) {
    const ks2BannerPositions = {
      lesson_1: 'center 82%',
      lesson_2: 'center 55%',
      lesson_3: 'center 45%',
      lesson_4: 'center 30%',
      lesson_5: 'center 18%',
      lesson_6: 'center 70%',
      lesson_7: 'center 30%',
      lesson_8: 'center 50%',
      lesson_9: 'center 20%',
      lesson_10: 'center 88%',
      lesson_11: 'center 42%',
    };
    if (ks2BannerPositions[lesson.id]) {
      bannerPosition = ks2BannerPositions[lesson.id];
    }
  }
  if (!bannerPosition) bannerPosition = 'center';
  const isFamilyHero =
    lesson.id &&
    (lesson.id.startsWith('hero_') ||
      lesson.title?.includes('Pupil Family Hero') ||
      lesson.title?.includes('Local Hero'));
  const heroExtraClass = isFamilyHero ? ' family-archive-hero' : '';

  const existingFloatingBtn = document.getElementById('floating-stop-navigator-btn');
  if (existingFloatingBtn) existingFloatingBtn.remove();

  const resolvedHeroImage = getAssetUrl(heroImage);

  // Contextual Gallery Launcher Button on Hero Banner (Only shown for authentic historical paintings / artworks)
  let bannerGalleryBtn = '';
  if (resolvedHeroImage) {
    const bannerCaption =
      typeof lesson.banner === 'object' && lesson.banner ? lesson.banner.caption || '' : '';
    const isBannerArtwork = isPaintingSource(
      typeof lesson.banner === 'object' && lesson.banner
        ? lesson.banner
        : { title: lesson.title, caption: bannerCaption, image: resolvedHeroImage },
      lesson.title,
    );

    if (isBannerArtwork) {
      bannerGalleryBtn = `
        <button class="btn-banner-gallery" data-action="open-masterpiece" data-banner-lesson="${lesson.id}" style="position: absolute; bottom: 16px; right: 4rem; z-index: 10;" title="Launch Art Spotlight">
          <i class="fa-solid fa-palette" style="color: #fbbf24; font-size: 0.9rem;"></i>
          <span>Art Spotlight</span>
        </button>
      `;
    }
  }

  // Full-Bleed Hero Image (Calibrated Height: 185px for KS2, 140px for Secondary/GCSE)
  const heroBannerHeight = isKs2 ? '185px' : '140px';
  const enquiryText =
    lesson.enquiryQuestion || lesson.enquiry_question || lesson.inquiry_question || '';
  const enquirySubtitle = enquiryText
    ? `<p class="lesson-hero-enquiry-sub" style="font-family: 'Lora', Georgia, serif; font-style: italic; color: #fef08a; font-size: 0.95rem; margin: 0.35rem 0 0 0; line-height: 1.35; text-shadow: 0 1px 3px rgba(0,0,0,0.8);"><i class="fa-solid fa-circle-question" style="color: #fde047; font-size: 0.82rem; margin-right: 6px;"></i>Key Enquiry: &ldquo;${enquiryText}&rdquo;</p>`
    : lesson.subtitle
      ? `<p class="lesson-hero-subtitle" style="font-family: 'Inter', sans-serif; color: #e2e8f0; font-size: 0.88rem; margin: 0.3rem 0 0 0; line-height: 1.3; text-shadow: 0 1px 3px rgba(0,0,0,0.8);">${lesson.subtitle}</p>`
      : '';

  const cleanLessonHeading = (lesson.title || '')
    .replace(/^(?:Enquiry|Lesson)\s*\d+:\s*/i, '')
    .trim();

  html += `
      <div class="lesson-hero${heroExtraClass}" style="position: relative; width: calc(100% + 8rem); margin-left: -4rem; margin-top: -1rem; height: ${heroBannerHeight}; background: url('${resolvedHeroImage}') ${bannerPosition}/cover no-repeat; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-glass); box-shadow: 0 8px 24px rgba(0,0,0,0.12);">
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(15,23,42,0.25), rgba(15,23,42,0.85));"></div>
        <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 1.25rem 4rem;">
          <span style="color: #cbd5e1; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; font-size: 0.82rem;">${lessonPrefix}</span>
          <h2 style="font-family: 'Playfair Display', serif; color: white; font-size: 1.6rem; margin: 0.2rem 0 0 0; line-height: 1.2; text-shadow: 0 2px 8px rgba(0,0,0,0.6);">${cleanLessonHeading}</h2>
          ${enquirySubtitle}
        </div>
        ${bannerGalleryBtn}
      </div>
    `;

  html += `
      <div id="progress-container" style="background: rgba(226,232,240,0.5); height: 6px; width: 100%; margin-bottom: 20px; border-radius: 3px; overflow: hidden; backdrop-filter: blur(5px);">
        <div id="progress-bar" style="background: #10b981; height: 100%; width: 0%; transition: width 0.3s;"></div>
      </div>
    `;

  // GCSE Specification Anchor Strip
  if (lesson.specification_anchor) {
    const specPaperBadge =
      unitId === 'edexcel_medicine'
        ? 'Edexcel Paper 1 &bull; Specification Anchor'
        : unitId === 'cme_new'
          ? 'Edexcel Paper 2 &bull; Specification Anchor'
          : unitId === 'eee'
            ? 'Edexcel Paper 2 &bull; Specification Anchor'
            : unitId === 'weimar_nazi_germany'
              ? 'Edexcel Paper 3 &bull; Specification Anchor'
              : 'Edexcel GCSE &bull; Specification Anchor';

    html += `
      <div class="gcse-spec-anchor-strip">
        <span style="background: #1e3a8a; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 0.76rem; font-weight: 800; padding: 3px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; display: inline-flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-bookmark" style="color: #60a5fa;"></i> ${specPaperBadge}
        </span>
        <span class="spec-text" style="font-family: 'Inter', sans-serif; font-size: 0.92rem; color: #1e293b; line-height: 1.4; flex: 1; min-width: 260px;">
          <strong style="color: #0f172a;">Syllabus Focus:</strong> &ldquo;${lesson.specification_anchor}&rdquo;
        </span>
      </div>
    `;
  }

  // -----------------------------------------------------
  // TABS NAVIGATION UI
  // -----------------------------------------------------
  html += `
      
    `;

  let vocabDict = {};
  const allVocabEntries = (lesson.vocab || lesson.vocabulary || []).concat(
    !lesson.vocab && !lesson.vocabulary && lesson.flashcards ? lesson.flashcards : [],
  );

  allVocabEntries.forEach((v) => {
    if (!v || !v.term) return;
    const baseTerm = v.term.trim();
    const termKey = baseTerm.toLowerCase();
    const termDef = v.definition || v.def || v.desc || '';
    if (termDef && !vocabDict[termKey]) {
      const vocabMeta = {
        term: baseTerm,
        definition: termDef,
        syllables: v.syllables || '',
        phonetic: v.phonetic || '',
        tier: v.tier
          ? String(v.tier)
          : [
                'gongfermer',
                'cesspit',
                'reredorter',
                'miasma',
                'latrine',
                'aqueduct',
                'conduit',
                'hypocaust',
                'lavatorium',
                'strigil',
              ].some((t) => termKey.includes(t))
            ? '3'
            : '2',
      };
      vocabDict[termKey] = vocabMeta;

      // Add common plural or stem variations if not already registered
      if (!termKey.endsWith('s') && !termKey.includes(' ')) {
        const pluralKey = termKey + 's';
        if (!vocabDict[pluralKey]) vocabDict[pluralKey] = vocabMeta;
      }
      if (termKey === 'miasma theory' && !vocabDict['miasma']) {
        vocabDict['miasma'] = vocabMeta;
      }
      if (termKey === 'filtration' && !vocabDict['filtered']) {
        vocabDict['filtered'] = vocabMeta;
      }
      if (termKey === 'intervention' && !vocabDict['intervene']) {
        vocabDict['intervene'] = vocabMeta;
      }
    }
  });

  let seenTerms = new Set();
  const highlightGlossary = (text, maxPerBlock = 3) => {
    if (!text || typeof text !== 'string') return text || '';
    if (Object.keys(vocabDict).length === 0) return text;
    let processedText = text;
    let blockCount = 0;
    const sortedTerms = Object.keys(vocabDict).sort((a, b) => b.length - a.length);

    for (const term of sortedTerms) {
      if (blockCount >= maxPerBlock) break;
      const vocabItem = vocabDict[term];
      if (!vocabItem || !vocabItem.definition) continue;

      // Check if root term or variant has been seen in this lesson
      const rootKey = vocabItem.term.toLowerCase();
      if (!seenTerms.has(rootKey)) {
        // Regex matches HTML tags OR the specific term word boundary
        const regex = new RegExp(`(<[^>]+>)|\\b(${term})\\b`, 'gi');
        let matchedTerm = false;

        processedText = processedText.replace(regex, (match, htmlTag, word) => {
          if (htmlTag) return htmlTag; // Skip and preserve anything already in an HTML tag
          if (word && blockCount < maxPerBlock) {
            matchedTerm = true;
            blockCount++;
            const safeDef = vocabItem.definition.replace(/"/g, '&quot;');
            const safeSyllables = (vocabItem.syllables || '').replace(/"/g, '&quot;');
            const safePhonetic = (vocabItem.phonetic || '').replace(/"/g, '&quot;');
            const safeTier = vocabItem.tier || '3';
            const safeTerm = vocabItem.term.replace(/"/g, '&quot;');
            return `<span class="vocab-word vocab-lens-term" data-term="${safeTerm}" data-definition="${safeDef}" data-syllables="${safeSyllables}" data-phonetic="${safePhonetic}" data-tier="${safeTier}">${word}</span>`;
          }
          return match;
        });

        if (matchedTerm) {
          seenTerms.add(rootKey);
        }
      }
    }
    return processedText;
  };

  // Note: Teacher Guidance, Pedagogical Primers, and Hinge Questions
  // are routed to the Departmental Portal (?view=department-portal) for staff lesson planning.

  if (
    lesson.sources &&
    lesson.sources.length > 0 &&
    unitId !== 'cme_new' &&
    !hasInlineNarrativeSources
  ) {
    htmlSources1 += `<div class="sources-grid" style="margin-top: 20px;">`;
    lesson.sources.forEach((source, sIdx) => {
      const sLetterMatch = (source.title || '').match(/(?:Source|Map|Diagram)\s+([A-Z0-9]+)/i);
      const sLetter = sLetterMatch ? sLetterMatch[1].toUpperCase() : '';
      const isInteractiveSourceUnit =
        window.currentUnitId === 'cme_new' ||
        window.currentUnitId === 'edexcel_medicine' ||
        unitId === 'edexcel_medicine' ||
        window.currentUnitId === 'eee' ||
        unitId === 'eee' ||
        window.currentUnitId === 'monarchy_religion_power' ||
        unitId === 'monarchy_religion_power' ||
        window.currentUnitId === 'first_british_empire' ||
        unitId === 'first_british_empire' ||
        window.currentUnitId === 'medieval_england' ||
        unitId === 'medieval_england' ||
        window.currentUnitId === 'industrialisation_and_empire' ||
        unitId === 'industrialisation_and_empire' ||
        window.currentUnitId === 'great_war' ||
        unitId === 'great_war' ||
        window.currentUnitId === 'great_war_part2' ||
        unitId === 'great_war_part2';
      const cardIdAttr =
        sLetter && isInteractiveSourceUnit
          ? `id="source-card-${sLetter}" data-source-letter="${sLetter}"`
          : '';
      const qClassAttr =
        sLetter && isInteractiveSourceUnit ? 'source-inquiry-box source-inquiry-interactive' : '';
      const qDataAttr =
        sLetter && isInteractiveSourceUnit
          ? `data-target-source="${sLetter}" title="Hover or click to highlight Source ${sLetter}"`
          : '';

      if (
        unitId === 'eee' ||
        window.currentUnitId === 'eee' ||
        unitId === 'monarchy_religion_power' ||
        window.currentUnitId === 'monarchy_religion_power' ||
        unitId === 'first_british_empire' ||
        window.currentUnitId === 'first_british_empire' ||
        unitId === 'medieval_england' ||
        window.currentUnitId === 'medieval_england' ||
        unitId === 'industrialisation_and_empire' ||
        window.currentUnitId === 'industrialisation_and_empire' ||
        unitId === 'great_war' ||
        window.currentUnitId === 'great_war' ||
        unitId === 'great_war_part2' ||
        window.currentUnitId === 'great_war_part2'
      ) {
        const displayTitle = source.title
          ? source.title.replace(/^(?:Source|Map|Diagram)\s+[A-Z0-9]+[:\s-]*/i, '').trim()
          : source.caption || 'Archival Evidence';
        const rawSrc = source.src || source.source || source.image;
        const sourceImgUrl = rawSrc ? getAssetUrl(rawSrc) : '';
        const sourceText = (source.text || source.content || '').trim();
        let contextText = source.source_context || source.context || '';
        let hingeText = source.hinge_question || source.question || '';
        if (contextText.includes('Hinge Question:')) {
          const parts = contextText.split(/\*{0,2}Hinge Question:\*{0,2}/i);
          contextText = parts[0].trim();
          if (!hingeText && parts[1]) {
            hingeText = parts[1].trim();
          }
        }
        const citationText = source.citation || source.provenance || '';

        const isSourceArtwork = isPaintingSource(source, displayTitle);
        const sourceSpotlightBtn = isSourceArtwork
          ? `
                    <button class="btn-source-spotlight-launch btn-art-spotlight-launch" data-action="open-masterpiece" data-lesson-id="${lesson.id}" data-source-index="${sIdx}" title="Launch Art Spotlight">
                      <i class="fa-solid fa-palette" style="color: #fbbf24;"></i>
                      <span>Art Spotlight</span>
                    </button>
          `
          : '';

        htmlSources1 += `
          <details class="cme-source-drawer eee-source-drawer archival-drawer gcse-source-container archival-source-box" ${cardIdAttr} style="margin: 6px 0; border: 1px solid #cbd5e1; border-radius: 6px; background: #f8fafc; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.02); transition: all 0.25s ease;">
            <summary style="padding: 4px 10px; min-height: 26px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: space-between; background: #f8fafc; color: #0f172a; list-style: none; user-select: none; transition: background 0.15s ease;">
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: nowrap; min-width: 0; flex: 1; margin-right: 8px;">
                <span class="archival-meta-tag" style="background: #1e40af; color: #ffffff; padding: 2px 6px; border-radius: 3px; font-size: 0.62rem; font-weight: 800; letter-spacing: 0.4px; line-height: 1.2; white-space: nowrap; flex-shrink: 0;">${sLetter ? `SOURCE ${sLetter}` : 'ARCHIVAL EVIDENCE'}</span>
                <span class="archival-drawer-title" style="font-family: 'Playfair Display', Georgia, serif; font-size: 0.82rem; color: #1e293b; font-weight: 700; line-height: 1.2; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${displayTitle}</span>
              </div>
              <span class="drawer-toggle-indicator" style="font-size: 0.68rem; color: #64748b; display: inline-flex; align-items: center; gap: 4px; font-weight: 600; flex-shrink: 0; white-space: nowrap;">
                Archival Evidence &bull; Expand <span class="drawer-caret">&#9660;</span>
              </span>
            </summary>
            <div class="eee-source-content" style="padding: 18px; background: #ffffff; border-top: 1px solid #e2e8f0;">
              ${
                sourceImgUrl
                  ? (() => {
                      const disc = getArchivalSourceDiscussionComponents(
                        hingeText,
                        source,
                        isKs2,
                        '10px',
                      );
                      return `
                <div class="archival-source-split-layout">
                  <div class="archival-source-media-col${isKs2 ? ' ks2-source-media-col' : ''}">
                    <div style="position: relative; width: 100%; display: flex; justify-content: center;">
                      <img src="${sourceImgUrl}" alt="${displayTitle}" data-action="open-modal" data-src="${sourceImgUrl}" style="cursor: zoom-in; width: auto; max-width: 100%; max-height: ${isKs2 ? '380px' : '280px'}; object-fit: contain; display: block; border-radius: 6px;">
                      <div class="archival-source-inspect-badge">
                        <i class="fa-solid fa-magnifying-glass-plus" style="font-size: 0.65rem; color: #93c5fd;"></i>
                        <span>Pan-Zoom</span>
                      </div>
                    </div>
                    ${sourceSpotlightBtn}
                    ${
                      !isKs2 && citationText
                        ? `<div class="archival-media-provenance" style="margin-top: 10px; border-top: 1px solid rgba(255,255,255,0.14); padding-top: 8px; font-size: 0.74rem; line-height: 1.35; color: #94a3b8; text-align: left;">
                            <strong style="color: #cbd5e1;">Provenance:</strong> ${citationText}
                          </div>`
                        : ''
                    }
                  </div>
                  <div class="archival-source-details-col">
                    <div>
                      ${
                        source.caption
                          ? `<div style="font-size: 0.95rem; color: #475569; margin-bottom: 12px; font-style: italic;">${source.caption}</div>`
                          : ''
                      }
                      ${
                        sourceText
                          ? `<div class="archival-source-body" style="width: 100%; max-height: 250px; overflow-y: auto; font-family: 'Georgia', serif; font-style: italic; font-size: 0.95rem; line-height: 1.6; color: #1e293b; background: #fffdfa; padding: 10px 14px; border-left: 3px solid #1e3a8a; border-radius: 4px; margin-bottom: 12px;">${sourceText}</div>`
                          : ''
                      }
                      ${
                        contextText
                          ? `
                        <div style="background: #f8fafc; border-left: 4px solid #64748b; padding: 12px 16px; border-radius: 0 4px 4px 0; margin-bottom: 12px; color: #334155; font-size: 0.98rem; line-height: 1.6;">
                          <strong>${isKs2 ? 'What this tells us:' : 'Historical Context:'}</strong> ${typeof window !== 'undefined' && window.formatBold ? window.formatBold(contextText) : contextText}
                        </div>
                      `
                          : ''
                      }
                      ${disc.promptHtml}
                    </div>
                  </div>
                </div>
                ${disc.panelHtml}
              `;
                    })()
                  : `
                <div>
                  ${
                    sourceText
                      ? `<div class="archival-source-body" style="width: 100%; max-height: 350px; overflow-y: auto; font-family: 'Georgia', serif; font-style: italic; font-size: 1.05rem; line-height: 1.75; color: #1e293b; background: #fffdfa; padding: 14px 18px; border-left: 4px solid #1e3a8a; border-radius: 4px; margin-bottom: 12px;">${sourceText}</div>`
                      : ''
                  }
                  ${
                    source.caption
                      ? `<div style="font-size: 0.95rem; color: #475569; margin-bottom: 12px; font-style: italic;">${source.caption}</div>`
                      : ''
                  }
                  ${
                    contextText
                      ? `
                    <div style="background: #f8fafc; border-left: 4px solid #64748b; padding: 12px 16px; border-radius: 0 4px 4px 0; margin-bottom: 12px; color: #334155; font-size: 0.98rem; line-height: 1.6;">
                      <strong>${isKs2 ? 'What this tells us:' : 'Historical Context:'}</strong> ${typeof window !== 'undefined' && window.formatBold ? window.formatBold(contextText) : contextText}
                    </div>
                  `
                      : ''
                  }
                  ${
                    !isKs2 && citationText
                      ? `<div class="archival-citation-footer" style="font-size: 0.8rem; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 8px;">
                          <strong>Provenance:</strong> ${citationText}
                        </div>`
                      : ''
                  }
                  ${renderArchivalSourceDiscussionBox(hingeText, source, isKs2, '12px')}
                </div>
              `
              }
              ${
                source.how_useful_question
                  ? `
                <details class="source-enquiry-reveal">
                  <summary>
                    <div style="display: flex; align-items: center; gap: 10px; flex-grow: 1; flex-wrap: wrap;">
                      <span style="font-size: 0.70rem; font-weight: 800; text-transform: uppercase; color: #166534; background: #dcfce7; border: 1px solid #bbf7d0; padding: 2px 8px; border-radius: 12px; letter-spacing: 0.5px; flex-shrink: 0;">Enquiry Question</span>
                      <span style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.02rem; color: #14532d; font-weight: 700; line-height: 1.4;">${typeof window !== 'undefined' && window.formatBold ? window.formatBold(source.how_useful_question) : source.how_useful_question}</span>
                    </div>
                    <span class="reveal-answer-pill">
                      <i class="fa-solid fa-lightbulb" style="color: #16a34a;"></i>
                      <span class="reveal-text-closed">Reveal Guidance</span>
                      <span class="reveal-text-open">Hide Guidance</span>
                      <span class="reveal-arrow">&#9660;</span>
                    </span>
                  </summary>
                  ${
                    source.provenance_clues
                      ? `
                    <div style="padding: 14px 18px 12px 18px; background: #ffffff;">
                      <strong style="color: #14532d; display: block; margin-bottom: 6px; font-size: 0.85rem;">Provenance Scaffolding (Author &bull; Audience &bull; Motive):</strong>
                      <ul style="margin: 0; padding-left: 18px; font-size: 0.88rem; color: #166534; line-height: 1.55;">
                        ${(Array.isArray(source.provenance_clues) ? source.provenance_clues : [source.provenance_clues]).map((c) => `<li>${c}</li>`).join('')}
                      </ul>
                    </div>
                  `
                      : ''
                  }
                </details>
              `
                  : ''
              }
            </div>
          </details>
        `;
        return;
      }

      if (unitId === 'edexcel_medicine') {
        const sLetterMatch = (source.title || '').match(/(?:Source|Map|Diagram)\s+([A-Z])/i);
        const sLetter = sLetterMatch ? sLetterMatch[1].toUpperCase() : '';
        const isMap = /map/i.test(source.title);
        const isDiagram = /diagram/i.test(source.title);
        const metaTag = isMap
          ? 'Cartographic Record'
          : isDiagram
            ? 'Historical Diagram'
            : 'Primary Source';
        const displayTitle = source.title
          ? source.title.includes(':')
            ? source.title.split(':').slice(1).join(':').trim()
            : source.title
          : 'Historical Document';
        const prefix = source.title
          ? source.title.split(':')[0].trim()
          : sLetter
            ? `Source ${sLetter}`
            : 'Document';

        htmlSources1 += `
          <div class="archival-source-box accent-amber" style="background: #fffdfa; border: 1px solid #cbd5e1; border-top: 3.5px solid ${isMap ? '#059669' : '#1e3a8a'}; border-radius: 8px; padding: 22px 26px; margin-bottom: 24px; text-align: left; box-shadow: 0 3px 10px rgba(0,0,0,0.04);">
            <div class="archival-source-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; padding-bottom: 12px; margin-bottom: 16px; border-bottom: 1px solid #e2e8f0;">
              <div>
                <h4 class="archival-source-title" style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.15rem; font-weight: 700; color: #0f172a; margin: 0; line-height: 1.35;">
                  ${source.title || displayTitle}
                </h4>
              </div>
            </div>
            ${
              source.src || source.source || source.image
                ? `
              <div class="archival-source-split-layout">
                <div class="archival-source-media-col${isKs2 ? ' ks2-source-media-col' : ''}">
                  <div style="position: relative; width: 100%; display: flex; justify-content: center;">
                    <img src="${getAssetUrl(source.src || source.source || source.image)}" alt="${source.title || 'Source Image'}" data-action="open-modal" data-src="${getAssetUrl(source.src || source.source || source.image)}" style="cursor: zoom-in; width: auto; max-width: 100%; max-height: ${isKs2 ? '380px' : '280px'}; object-fit: contain; display: block; border-radius: 6px;">
                    <div class="archival-source-inspect-badge">
                      <i class="fa-solid fa-magnifying-glass-plus" style="font-size: 0.65rem; color: #93c5fd;"></i>
                      <span>Pan-Zoom</span>
                    </div>
                  </div>
                </div>
                <div class="archival-source-details-col">
                  <div>
                    ${
                      source.text
                        ? `
                      <div class="archival-source-body" style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.02rem; line-height: 1.65; color: #1e293b; background: #fdfbf7; border-left: 4px solid #b45309; padding: 12px 16px; margin-bottom: 14px; border-radius: 0 4px 4px 0; font-style: italic; white-space: pre-line;">
                        ${source.text}
                      </div>
                    `
                        : ''
                    }
                    ${
                      source.caption
                        ? `
                      <div style="font-size: 0.95rem; color: #334155; margin-bottom: 12px; line-height: 1.6; font-style: italic; background: #f8fafc; padding: 12px 16px; border-left: 3px solid #64748b; border-radius: 0 4px 4px 0;">
                        ${source.caption}
                      </div>
                    `
                        : ''
                    }
                    ${
                      source.context
                        ? `
                      <div style="font-size: 0.95rem; color: #1e293b; margin-bottom: 12px; line-height: 1.65; background: rgba(2, 132, 199, 0.06); padding: 14px 18px; border-left: 4px solid #0284c7; border-radius: 0 6px 6px 0;">
                        <strong style="color: #0369a1; display: block; margin-bottom: 5px; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em;"><span class="archival-meta-tag" style="color: #0284c7; margin-right: 6px;">HISTORICAL CONTEXT</span></strong>
                        ${typeof window !== 'undefined' && window.formatBold ? window.formatBold(source.context) : source.context}
                      </div>
                    `
                        : ''
                    }
                  </div>
                  ${
                    source.citation || source.provenance
                      ? `
                    <div class="archival-citation-footer" style="font-size: 0.8rem; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 10px; margin-top: auto;">
                      <strong>Provenance:</strong> ${source.citation || source.provenance}
                    </div>
                  `
                      : ''
                  }
                </div>
              </div>
            `
                : `
              ${
                source.text
                  ? `
                <div class="archival-source-body" style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.05rem; line-height: 1.7; color: #1e293b; background: #fdfbf7; border-left: 4px solid #b45309; padding: 16px 20px; margin: 14px 0; border-radius: 0 6px 6px 0; font-style: italic; white-space: pre-line;">
                  ${source.text}
                </div>
              `
                  : ''
              }
              ${
                source.caption
                  ? `
                <div style="font-size: 0.95rem; color: #334155; margin: 12px 0; line-height: 1.6; font-style: italic; background: #f8fafc; padding: 12px 16px; border-left: 3px solid #64748b; border-radius: 0 4px 4px 0;">
                  ${source.caption}
                </div>
              `
                  : ''
              }
              ${
                source.context
                  ? `
                <div style="font-size: 0.95rem; color: #1e293b; margin: 14px 0; line-height: 1.65; background: rgba(2, 132, 199, 0.06); padding: 14px 18px; border-left: 4px solid #0284c7; border-radius: 0 6px 6px 0;">
                  <strong style="color: #0369a1; display: block; margin-bottom: 5px; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em;"><span class="archival-meta-tag" style="color: #0284c7; margin-right: 6px;">HISTORICAL CONTEXT</span></strong>
                  ${typeof window !== 'undefined' && window.formatBold ? window.formatBold(source.context) : source.context}
                </div>
              `
                  : ''
              }
              ${
                source.citation || source.provenance
                  ? `
                <div class="archival-citation-footer" style="font-size: 0.8rem; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 10px; margin-top: 12px;">
                  <strong>Provenance:</strong> ${source.citation || source.provenance}
                </div>
              `
                  : ''
              }
            `
            }
            ${
              source.question || source.hinge_question
                ? `
              <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-left: 5px solid #1e40af; padding: 14px 18px; border-radius: 4px; text-align: left; margin-top: 14px; box-shadow: 0 2px 5px rgba(30,58,138,0.06);">
                <p style="margin-bottom: 0; font-family: 'Playfair Display', Georgia, serif; font-size: 1.02rem; color: #1e3a8a; line-height: 1.5; font-weight: 600;">
                  <strong>${source.qNum ? `Q${source.qNum}. ` : ''}${formatQuestion(cleanQuestionText(source.question || source.hinge_question), !source.qNum)}</strong>
                </p>
              </div>
            `
                : ''
            }
          </div>
        `;
        return;
      }

      htmlSources1 += `
            <div class="source-card" ${cardIdAttr} style="background: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px; text-align: center; transition: all 0.3s ease;">
              ${source.title ? `<h4 style="color: var(--primary); margin-top: 0; text-align: left;">${source.title}</h4>` : ''}
              
              ${
                source.src || source.source || source.image
                  ? `
                <div style="display: inline-flex; flex-direction: column; position: relative; max-width: 100%; text-align: left; margin: 15px 0;">
                  <div style="position: relative;">
                    <img src="${getAssetUrl(source.src || source.source || source.image)}" alt="Source Image" style="max-width: 100%; max-height: 400px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #cbd5e1; cursor: zoom-in; display: block;" data-action="open-modal" data-src="${getAssetUrl(source.src || source.source || source.image)}">
                  </div>
                  ${
                    source.caption
                      ? `
                    <div class="source-info-panel" style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 15px; font-size: 0.95rem; color: #334155; margin-top: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); position: relative;">
                      <strong style="color: #0f172a; margin-bottom: 5px; display: block;">
                        <i class="fa-solid fa-circle-info" style="color: #10b981; margin-right: 5px;"></i>
                        About this source
                      </strong>
                      ${source.caption}
                    </div>
                  `
                      : ''
                  }
                </div>
              `
                  : source.caption
                    ? `
                <div style="text-align: left; margin-top: 15px; font-size: 1.05rem; color: #334155; line-height: 1.5; padding: 15px; background: #f8fafc; border-left: 4px solid #10b981; border-radius: 4px;">
                  ${source.caption}
                </div>
              `
                    : ''
              }
              
              ${source.content ? `<div style="text-align: left; margin-top: 10px; font-style: italic; color: #334155; font-size: 1.05rem; line-height: 1.5;">${source.content}</div>` : ''}
              ${
                source.question
                  ? `
                <div class="${qClassAttr}" ${qDataAttr} style="background: #ebf8ff; border-left: 4px solid #3182ce; padding: 15px; border-radius: 0 4px 4px 0; text-align: left; margin-top: 15px;">
                  <p style="margin-bottom: 0; font-size: 1.1rem; color: #1e3a8a;"><strong>${source.qNum ? `Q${source.qNum}. ` : ''}${formatQuestion(source.question, !source.qNum)}</strong></p>
                </div>
              `
                  : ''
              }
            </div>
          `;
    });
    htmlSources1 += `</div>`;
  }

  // ==========================================
  // TAB 1: PREPARATION
  // ==========================================
  htmlSources1 += ``;

  if (lesson.primary_source) {
    let rawSrcs = lesson.primary_source.src || lesson.primary_source.image;
    let srcs = rawSrcs ? (Array.isArray(rawSrcs) ? rawSrcs.filter(Boolean) : [rawSrcs]) : [];
    if (unitId === 'great_war') {
      const pTitle = lesson.primary_source.title || 'Primary Archival Source';
      const displayTitle = pTitle.includes(':')
        ? pTitle.split(':').slice(1).join(':').trim()
        : pTitle;
      const prefix = pTitle.includes(':') ? pTitle.split(':')[0].trim() : 'Source A';

      htmlPrimary += `
        <div class="phase-card">
          <div class="archival-source-box accent-amber" style="background: #fffdfa; border: 1px solid #cbd5e1; border-top: 3.5px solid #1e3a8a; border-radius: 8px; padding: 22px 26px; margin-bottom: 24px; text-align: left; box-shadow: 0 3px 10px rgba(0,0,0,0.04);">
            <div class="archival-source-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; padding-bottom: 12px; margin-bottom: 16px; border-bottom: 1px solid #e2e8f0;">
              <div>
                <span class="archival-meta-tag" style="display: block; margin-bottom: 4px; color: #1e3a8a; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase;">
                  Primary Archival Evidence · ${prefix}
                </span>
                <h4 class="archival-source-title" style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.2rem; font-weight: 700; color: #0f172a; margin: 0; line-height: 1.35;">
                  ${displayTitle}
                </h4>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="archival-shelfmark-stamp">${lesson.primary_source.shelfmark || 'IWM ARCHIVES / REF-GW-1914'}</span>
              </div>
            </div>
            ${
              srcs.length > 0
                ? `
              <div class="archival-source-split-layout">
                <div class="archival-source-media-col">
                  ${srcs.map((src) => `<img src="${getAssetUrl(src)}" alt="${lesson.primary_source.title}" data-action="open-modal" data-src="${getAssetUrl(src)}" style="cursor: zoom-in;">`).join('')}
                  <div class="archival-source-inspect-badge">
                    <i class="fa-solid fa-magnifying-glass-plus" style="font-size: 0.65rem; color: #93c5fd;"></i>
                    <span>Pan-Zoom</span>
                  </div>
                </div>
                <div class="archival-source-details-col">
                  <div>
                    ${
                      lesson.primary_source.caption
                        ? `
                      <div style="font-size: 0.95rem; color: #334155; margin-bottom: 12px; line-height: 1.6; font-style: italic; background: #f8fafc; padding: 12px 16px; border-left: 3px solid #64748b; border-radius: 0 4px 4px 0;">
                        ${lesson.primary_source.caption}
                      </div>
                    `
                        : ''
                    }
                    ${
                      lesson.primary_source.context
                        ? `
                      <div style="font-size: 0.95rem; color: #1e293b; margin-bottom: 12px; line-height: 1.65; background: rgba(2, 132, 199, 0.06); padding: 14px 18px; border-left: 4px solid #0284c7; border-radius: 0 6px 6px 0;">
                        <strong style="color: #0369a1; display: block; margin-bottom: 5px; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em;"><span class="archival-meta-tag" style="color: #0284c7; margin-right: 6px;">HISTORICAL CONTEXT</span></strong>
                        ${typeof window !== 'undefined' && window.formatBold ? window.formatBold(lesson.primary_source.context) : lesson.primary_source.context}
                      </div>
                    `
                        : ''
                    }
                  </div>
                  ${
                    lesson.primary_source.citation || lesson.primary_source.provenance
                      ? `
                    <div class="archival-citation-footer" style="font-size: 0.8rem; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 10px; margin-top: auto;">
                      <strong>Provenance:</strong> ${lesson.primary_source.citation || lesson.primary_source.provenance}
                    </div>
                  `
                      : ''
                  }
                </div>
              </div>
            `
                : ''
            }
            ${lesson.primary_source.quote ? `<blockquote style="border-left: 4px solid #3b82f6; background: #f8fafc; padding: 14px 18px; margin: 15px 0; border-radius: 0 8px 8px 0; font-style: italic; color: #1e293b; text-align: left; font-size: 1rem; line-height: 1.6;">&ldquo;${lesson.primary_source.quote}&rdquo;</blockquote>` : ''}
            ${
              lesson.primary_source.citation || lesson.primary_source.provenance
                ? `
              <div class="archival-citation-footer" style="font-size: 0.8rem; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 10px; margin-top: 14px;">
                <strong>Provenance:</strong> ${lesson.primary_source.citation || lesson.primary_source.provenance}
              </div>
            `
                : ''
            }
            ${
              lesson.primary_source.question
                ? `
              <div style="background: #eff6ff; border-left: 4px solid #1e40af; padding: 16px 20px; border-radius: 0 6px 6px 0; text-align: left; margin-top: 20px; box-shadow: 0 2px 5px rgba(30,58,138,0.05);">
                <p style="margin-bottom: 0; font-size: 1.05rem; color: #1e3a8a; line-height: 1.5;"><strong>${lesson.primary_source.qNum ? `Q${lesson.primary_source.qNum}. ` : ''}${formatQuestion(lesson.primary_source.question, !lesson.primary_source.qNum)}</strong></p>
              </div>
            `
                : ''
            }
          </div>
        </div>
      `;
    } else {
      htmlPrimary += `
        <div class="phase-card">
          <div class="source-card" style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px; text-align: center;">
            ${
              srcs.length > 0
                ? `
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin-bottom: 15px;">
              ${srcs.map((src) => `<img src="${getAssetUrl(src)}" alt="Source" style="max-height: 500px; max-width: ${srcs.length > 1 ? '45%' : '100%'}; object-fit: contain; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">`).join('')}
            </div>
            `
                : ''
            }
            <div style="font-weight: bold; margin-bottom: 10px; font-size: 1.1rem; color: var(--primary);">${lesson.primary_source.title}</div>
            ${lesson.primary_source.context ? `<div style="color: #64748b; margin-bottom: 12px; font-size: 0.9rem; text-align: left; font-style: italic;"><strong>Context:</strong> ${lesson.primary_source.context}</div>` : ''}
            ${lesson.primary_source.quote ? `<blockquote style="border-left: 4px solid #3b82f6; background: #f8fafc; padding: 14px 18px; margin: 15px 0; border-radius: 0 8px 8px 0; font-style: italic; color: #1e293b; text-align: left; font-size: 1rem; line-height: 1.6;">&ldquo;${lesson.primary_source.quote}&rdquo;</blockquote>` : ''}
            ${lesson.primary_source.caption ? `<div style="color: #475569; margin-bottom: 15px; font-size: 0.95rem; text-align: left;">${lesson.primary_source.caption}</div>` : ''}
            ${
              lesson.primary_source.question
                ? `
              <div style="background: #ebf8ff; border-left: 4px solid #3182ce; padding: 15px; border-radius: 0 4px 4px 0; text-align: left; margin-top: 20px;">
                <p style="margin-bottom: 0; font-size: 1.1rem; color: #1e3a8a;"><strong>${lesson.primary_source.qNum ? `Q${lesson.primary_source.qNum}. ` : ''}${formatQuestion(lesson.primary_source.question, !lesson.primary_source.qNum)}</strong></p>
              </div>
            `
                : ''
            }
          </div>
        </div>
      `;
    }
  }

  const isMedicineUnit =
    (typeof window !== 'undefined' && window.currentUnitId === 'edexcel_medicine') ||
    (lesson.id && /^lesson_[1-5]_\d+$/.test(lesson.id));
  if (
    !isMedicineUnit &&
    lesson.starters &&
    lesson.starters.length > 0 &&
    typeof lesson.starters[0] === 'object' &&
    lesson.starters[0].source
  ) {
    htmlPrimary += `
          <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; margin-bottom: 20px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <div style="padding: 15px 20px; background: linear-gradient(to right, #1e3a8a, #3b82f6); color: white; font-weight: bold; font-size: 1.2rem; display: flex; align-items: center;">
              <i class="fa-solid fa-image" style="margin-right: 10px;"></i> Historical Sources: Think & Wonder
            </div>
            <div style="padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start;">
        `;
    lesson.starters.forEach((starter, index) => {
      htmlPrimary += `
              <div style="display: flex; flex-direction: column; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 15px; height: 100%;">
                <h4 style="margin: 0 0 15px 0; color: #0f172a; font-size: 1.1rem; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">Source ${String.fromCharCode(65 + index)}: ${starter.title}</h4>
                <div style="width: 100%; height: 250px; background-color: #000; border-radius: 4px; overflow: hidden; margin-bottom: 15px; display: flex; justify-content: center; align-items: center;">
                  <img src="${getAssetUrl(starter.source || starter.src || starter.image)}" style="max-width: 100%; max-height: 100%; object-fit: contain; cursor: zoom-in;" data-action="open-modal" data-src="${getAssetUrl(starter.source || starter.src || starter.image)}">
                </div>
                <div style="font-size: 0.95rem; color: #475569; margin-bottom: 15px; font-style: italic;">
                  ${starter.caption}
                </div>
                <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 12px; border-radius: 0 4px 4px 0; margin-top: auto;">
                  <div style="font-weight: 700; color: #1e40af; margin-bottom: 5px; font-size: 0.95rem;"><i class="fa-solid fa-lightbulb" style="color: #fbbf24; margin-right: 5px;"></i> Think & Wonder</div>
                  <div style="font-size: 0.95rem; color: #1e40af;">${starter.think_wonder}</div>
                </div>
              </div>
          `;
    });
    htmlPrimary += `
            </div>
          </div>
        `;
  }

  if (lesson.utility_starters && lesson.utility_starters.sources) {
    htmlPrimary += `
          <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; margin-bottom: 20px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <div style="padding: 15px 20px; background: linear-gradient(to right, #475569, #334155); color: white; font-weight: bold; font-size: 1.2rem; display: flex; align-items: center;">
              <i class="fa-solid fa-scale-balanced" style="margin-right: 10px;"></i> Historical Sources: Utility
            </div>
            <div class="utility-sources-grid">
        `;
    lesson.utility_starters.sources.forEach((source, index) => {
      let sourceContentHtml = '';
      if (source.type === 'written') {
        sourceContentHtml = `
               <div class="utility-source-written">
                 <i class="fa-solid fa-quote-left" style="color: #facc15; font-size: 1.5rem; margin-bottom: 10px; display: block;"></i>
                 ${source.content}
               </div>
             `;
      } else {
        const utilSourceSrc = getAssetUrl(source.source || source.src || source.image);
        sourceContentHtml = `
                <div class="utility-source-visual">
                  <img class="utility-source-img" src="${utilSourceSrc}" alt="${source.title || 'Historical Source'}" data-action="open-modal" data-src="${utilSourceSrc}">
                </div>
                ${source.caption ? `<div style="font-size: 0.95rem; color: #475569; margin-bottom: 15px; font-style: italic;">${source.caption}</div>` : ''}
             `;
      }

      htmlPrimary += `
              <div class="utility-source-card">
                <h4 class="utility-source-title">${source.title}</h4>
                ${sourceContentHtml}
                
                <details style="background: #f1f5f9; border-left: 4px solid #64748b; border-radius: 0 4px 4px 0; margin-top: auto; overflow: hidden;">
                  <summary style="padding: 12px; cursor: pointer; font-weight: 700; color: #334155; font-size: 0.95rem; list-style: none; display: flex; align-items: center;">
                    <i class="fa-solid fa-key" style="color: #fbbf24; margin-right: 8px;"></i> Reveal Provenance Clue
                  </summary>
                  <div style="padding: 0 12px 12px 12px; font-size: 0.95rem; color: #475569; border-top: 1px dashed #cbd5e1; margin-top: 4px; padding-top: 8px;">
                    ${source.provenance_clue}
                  </div>
                </details>
              </div>
          `;
    });
    htmlPrimary += `
            </div>
            <div style="padding: 15px 20px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center;">
              <h3 style="margin: 0; color: #0f172a; font-size: 1.15rem; font-family: 'Playfair Display', serif;">
                How useful are Sources A and B for an enquiry into ${lesson.utility_starters.enquiry}? (8 marks)
              </h3>
            </div>
          </div>
        `;
  }

  if (lesson.do_now && lesson.do_now.type === 'timeline' && lesson.do_now.events) {
    if (isTrip) {
      htmlDoNowInner += `
          <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 6px; margin-bottom: 20px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
              <div style="padding: 18px;">
                <div style="margin-bottom: 16px; font-size: 1.15rem; color: #1e3a8a;"><strong>${lesson.do_now.prediction_question || ''}</strong></div>
                <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: space-between;">
        `;
      lesson.do_now.events.forEach((ev, idx) => {
        htmlDoNowInner += `
            <div style="width: 45%; border: 2px solid #cbd5e1; border-radius: 8px; padding: 15px; background: #fff; box-shadow: 2px 2px 0px #94a3b8; margin-bottom: 15px;">
              <div style="font-weight: 800; color: #1e40af; font-size: 1.2rem; margin-bottom: 5px;"><i class="fa-regular fa-clock" style="margin-right: 6px;"></i>${ev.year}</div>
              <div style="font-weight: 600; color: #0f172a; margin-bottom: 8px;">${ev.title}</div>
              <div style="font-size: 0.95rem; color: #475569;">${ev.detail}</div>
              ${ev.img ? `<div style="text-align: center; margin-top: 15px;"><img src="${getAssetUrl(ev.img)}" style="max-width: 40%; border-radius: 4px; border: 1px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"></div>` : ''}
            </div>
          `;
      });
      htmlDoNowInner += `</div></div></div>`;

      // Add Map Container
      const eventsWithLoc = lesson.do_now.events.filter((e) => e.lat && e.lng);
      if (eventsWithLoc.length > 0) {
        htmlDoNowInner += `
            <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 20px;">
              <div style="padding: 12px 18px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; font-weight: bold; font-size: 1.05rem; color: #1e293b;">
                <i class="fa-solid fa-map-location-dot" style="color: #ef4444; margin-right: 8px;"></i> Interactive Trip Map
              </div>
              <div id="trip-map-container" style="height: 500px; width: 100%;"></div>
            </div>
          `;
      }
    } else {
      htmlDoNowInner += `
          <div class="donow-panel-content">
            ${renderDoNowHeaderWithTimerHTML({
              timerId: 'donow-timeline-timer',
              title: 'Timeline Starter',
              badgeText: 'Chronological Sequence',
              icon: 'fa-solid fa-clock-rotate-left',
              showRevealAll: false,
            })}
            <div style="margin-bottom: 14px; font-size: 1rem; color: #1e3a8a;"><strong>${lesson.do_now.prediction_question || ''}</strong></div>
            <div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: space-between;">
      `;
      lesson.do_now.events.forEach((ev, idx) => {
        htmlDoNowInner += `
            <div style="width: 48%; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 12px; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.03); margin-bottom: 10px;">
              <div style="font-weight: 800; color: #0284c7; font-size: 1.05rem; margin-bottom: 4px;"><i class="fa-regular fa-clock" style="margin-right: 6px;"></i>${ev.year}</div>
              <div style="font-weight: 600; color: #0f172a; margin-bottom: 6px; font-size: 0.92rem;">${ev.title}</div>
              <div style="font-size: 0.88rem; color: #475569; line-height: 1.35;">${ev.detail}</div>
              ${ev.img ? `<div style="text-align: center; margin-top: 10px;"><img src="${getAssetUrl(ev.img)}" style="max-width: 40%; border-radius: 4px; border: 1px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.08);"></div>` : ''}
            </div>
          `;
      });
      htmlDoNowInner += `</div></div>`;
    }
  } else if (
    lesson.do_now &&
    (lesson.do_now.items || lesson.do_now.questions || lesson.do_now.tasks)
  ) {
    try {
      const taught = JSON.parse(localStorage.getItem('taughtUnits') || '[]');
      if (taught.length > 0 && window.KNOWLEDGE_BANK) {
        const rawItems =
          lesson.do_now.items || lesson.do_now.questions || lesson.do_now.tasks || [];
        rawItems.forEach((item) => {
          if (item && item.question && item.question.includes('PAST TOPIC:')) {
            const unit = taught[Math.floor(Math.random() * taught.length)];
            const bank = window.KNOWLEDGE_BANK[unit];
            if (bank && bank.length > 0) {
              const randQ = bank[Math.floor(Math.random() * bank.length)];
              item.question = 'PAST TOPIC: ' + randQ.question;
              item.answer = randQ.answer;
            }
          }
        });
      }
    } catch (e) {
      console.error(e);
    }

    htmlDoNowInner += `
        <div class="donow-panel-content">
          ${renderDoNowHeaderWithTimerHTML({
            timerId: 'donow-timer',
            title: 'Do Now Tasks',
            badgeText: '📖 Workbook Task 1 &bull; Prior Knowledge Retrieval',
            icon: 'fa-solid fa-list-check',
            showRevealAll: true,
          })}
          <div class="donow-rows-container" style="display: flex; flex-direction: column; gap: 0; margin-top: 6px; background: #ffffff; border: 1.2px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);">
    `;
    const doNowItems = lesson.do_now.items || lesson.do_now.questions || lesson.do_now.tasks || [];
    doNowItems.forEach((item, index) => {
      let qText = item.question || item.q || item.event || '';
      let aText = item.answer || item.a || item.year || '';
      if (typeof qText !== 'string') qText = String(qText);
      if (typeof aText !== 'string') aText = String(aText);
      if (window.currentUnitId) {
        qText = qText.replace(/src=['"]assets\//g, `src="/units/${window.currentUnitId}/assets/`);
        aText = aText.replace(/src=['"]assets\//g, `src="/units/${window.currentUnitId}/assets/`);
      }
      const cardId = `donow-card-${index}`;
      const isLast = index === doNowItems.length - 1;
      htmlDoNowInner += `
          <div class="donow-sentence-row do-now-card" id="do-now-card-${index}" data-action="toggle-element" data-target-id="${cardId}" style="display: flex; align-items: center; justify-content: space-between; gap: 12px; background: #ffffff; border: none; ${!isLast ? 'border-bottom: 1px solid #f1f5f9;' : ''} border-radius: 0; margin: 0; padding: 7px 14px; min-height: 36px; box-sizing: border-box; cursor: pointer; box-shadow: none;">
            <div style="display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0;">
              <span style="display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 4px; background: #f0f9ff; color: #0284c7; font-size: 0.74rem; font-weight: 800; flex-shrink: 0; border: 1px solid #bae6fd; line-height: 1;">${index + 1}</span>
              <span style="font-size: 0.88rem; line-height: 1.35; color: #1e293b; font-weight: 600; flex: 1;">${qText}</span>
            </div>
            <div class="donow-right-answer-box" style="display: flex; align-items: center; flex-shrink: 0; margin-left: 8px;">
              <span class="donow-reveal-pill" style="font-size: 0.72rem; font-weight: 700; color: #0284c7; background: #f0f9ff; border: 1px solid #bae6fd; padding: 3px 9px; border-radius: 12px; display: inline-flex; align-items: center; gap: 4px;">
                <i class="fa-solid fa-eye" style="font-size: 0.65rem;"></i> Reveal Answer
              </span>
              <div class="answer" id="${cardId}" style="display: none; margin: 0; padding: 0; background: transparent;">
                <span style="display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; font-size: 0.82rem; font-weight: 700; color: #1d4ed8; white-space: nowrap;">
                  <i class="fa-solid fa-circle-check" style="color: #2563eb; font-size: 0.75rem;"></i>
                  ${aText}
                </span>
              </div>
            </div>
          </div>
        `;
    });
    htmlDoNowInner += `</div></div>`;
  }
  htmlDoNow = htmlDoNowInner;

  const hasVocab = lesson.vocab && lesson.vocab.length > 0;
  if (hasVocab) {
    htmlVocabInner += `
        <div class="vocab-panel-content">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #e2e8f0; flex-wrap: wrap; gap: 8px;">
              <span style="font-weight: 800; font-size: 0.95rem; color: #b45309; display: flex; align-items: center; gap: 8px;">
                <i class="fa-solid fa-spell-check" style="color: #b45309;"></i> Key Vocabulary Mastery &bull; Match &amp; Cognitive Drill
              </span>
            </div>
            <div style="padding: 4px 0;">
              <p style="color: #475569; margin-bottom: 16px; font-size: 0.95rem;"><strong>Vocabulary Practice:</strong> Tap a term on the left, then tap its matching definition on the right to master the key vocabulary.</p>
              <div id="vocab-match-game" class="vocab-match-asymmetric">
                <div class="match-terms">
      `;

    lesson.vocab.forEach((v, idx) => {
      htmlVocabInner += `<button class="btn btn-secondary match-term-btn" data-idx="${idx}">${v.term}</button>`;
    });

    htmlVocabInner += `</div><div class="match-defs">`;

    let defs = lesson.vocab.map((v, idx) => ({ def: v.definition || v.def || '', idx: idx }));
    if (defs.length > 1) {
      // Guaranteed derangement shuffle: ensures NO definition starts on the same horizontal row as its matching term
      let attempts = 0;
      let hasFixedPoint = true;
      while (hasFixedPoint && attempts < 50) {
        attempts++;
        for (let i = defs.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [defs[i], defs[j]] = [defs[j], defs[i]];
        }
        hasFixedPoint = defs.some((d, i) => d.idx === i);
      }
      if (hasFixedPoint) {
        defs = defs.map((_, i) => defs[(i + 1) % defs.length]);
      }
    }

    defs.forEach((d) => {
      htmlVocabInner += `<button class="btn btn-secondary match-def-btn" data-idx="${d.idx}">${d.def}</button>`;
    });

    htmlVocabInner += `
                </div>
              </div>
              <div id="unlock-success" style="display: none; margin-top: 20px; padding: 15px; background: #ecfdf5; border: 2px solid #10b981; border-radius: 8px; color: #047857; font-weight: bold; text-align: center; font-size: 1.2rem;">
                <i class="fa-solid fa-star"></i> Vocabulary Mastered!
              </div>
    `;

    // Rotating cognitive vocabulary challenge widget
    let currentLessonIdx = 0;
    if (typeof unitData !== 'undefined' && unitData && Array.isArray(unitData.lessons)) {
      currentLessonIdx = unitData.lessons.findIndex((l) =>
        l.id && lesson.id ? l.id === lesson.id : l.title === lesson.title,
      );
      if (currentLessonIdx === -1) currentLessonIdx = 0;
    }
    const currentUnitId =
      (appStore && appStore.state && appStore.state.currentUnitId) || window.currentUnitId || '';
    const pageAnchor = getWorkbookPageAnchor(currentUnitId, lesson, currentLessonIdx);
    const vocabStyle = currentLessonIdx % 4;
    const vocabTermsList = lesson.vocab.map((v) => (v.term || '').trim()).filter(Boolean);

    const wbAnchorBadge = pageAnchor
      ? `<span class="wb-page-pill" style="font-size: 0.8rem; font-weight: 700; color: #0369a1; background: #e0f2fe; border: 1px solid #bae6fd; padding: 3px 8px; border-radius: 6px; display: inline-flex; align-items: center; gap: 5px;" title="Corresponding page in printed pupil workbook"><i class="fa-solid fa-book-open"></i> ${pageAnchor.booklet && pageAnchor.booklet !== 'Workbook' ? pageAnchor.label : 'Workbook ' + pageAnchor.label}</span>`
      : '';

    const wbDrillBtnHtml = `
      <div style="display: flex; align-items: center; gap: 8px;">
        ${wbAnchorBadge}
        <button type="button" class="btn btn-secondary" data-action="open-vocab-whiteboard" style="font-size: 0.82rem; padding: 4px 10px; background: #eff6ff; color: #1e40af; border: 1.5px solid #bfdbfe; border-radius: 6px; cursor: pointer; font-weight: 600; display: inline-flex; align-items: center; gap: 5px; transition: all 0.15s ease;" title="Project this vocabulary challenge on the classroom smartboard">
          <i class="fa-solid fa-chalkboard-user"></i> Starter Drill
        </button>
      </div>
    `;

    if (vocabStyle === 0) {
      // Style 0: The Odd One Out
      const oddExemplars = getOddOneOutExemplars(lesson, vocabTermsList);
      htmlVocabInner += `
        <div id="vocab-cognitive-challenge" style="margin-top: 25px; padding-top: 20px; border-top: 1px dashed #cbd5e1;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-weight: 700; color: #1e3a8a; font-size: 1.05rem;">
                <i class="fa-solid fa-shapes" style="color: #3b82f6; margin-right: 6px;"></i> Vocabulary Challenge: The Odd One Out
              </span>
              <span style="font-size: 0.8rem; background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 12px; font-weight: 600;">Conceptual Categorisation</span>
            </div>
            ${wbDrillBtnHtml}
          </div>
          <p style="color: #475569; font-size: 0.95rem; margin-bottom: 12px; line-height: 1.5;">
            Click <strong>ONE</strong> term that does not belong with the others.<br>
            <strong>Explain your reasoning:</strong> What historical connection links the other terms, and why is your chosen term different?
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 15px;">
            ${vocabTermsList
              .map(
                (t) =>
                  `<button type="button" class="btn btn-secondary odd-term-btn" onclick="document.querySelectorAll('.odd-term-btn').forEach(b=>{b.style.borderColor='#cbd5e1'; b.style.backgroundColor='#ffffff';}); this.style.borderColor='#2563eb'; this.style.backgroundColor='#eff6ff'; document.getElementById('odd-choice').value='${t.replace(/'/g, "\\'")}'; document.getElementById('odd-reasoning-box').style.display='block';" style="padding: 6px 14px; font-size: 0.9rem; border-radius: 20px; border: 2px solid #cbd5e1; font-weight: 600; cursor: pointer; transition: all 0.2s; background: #ffffff; color: #1e293b;">${t}</button>`,
              )
              .join('')}
          </div>
          <input type="hidden" id="odd-choice" value="">
          <div id="odd-reasoning-box" style="display: none; margin-top: 10px;">
            <textarea placeholder="Explain your historical reasoning: Why is your chosen word the 'Odd One Out' compared to the others?" style="width: 100%; min-height: 70px; padding: 10px; border-radius: 6px; border: 1.5px solid #94a3b8; font-family: inherit; font-size: 0.95rem; box-sizing: border-box;"></textarea>
            <div style="margin-top: 8px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
              <button type="button" class="btn btn-primary" onclick="this.parentElement.nextElementSibling.style.display='block'; this.style.display='none';" style="font-size: 0.9rem; padding: 6px 14px; background: #1e40af; color: white; border: none; border-radius: 6px; cursor: pointer;">
                <i class="fa-solid fa-check"></i> Submit Justification
              </button>
              <button type="button" class="btn btn-secondary" onclick="const box = document.getElementById('odd-model-box'); const isVis = box.style.display === 'block'; box.style.display = isVis ? 'none' : 'block'; this.innerHTML = isVis ? '<i class=\\'fa-solid fa-eye\\'></i> Show Model Debates' : '<i class=\\'fa-solid fa-eye-slash\\'></i> Hide Model Debates';" style="font-size: 0.9rem; padding: 6px 14px; background: #ffffff; color: #92400e; border: 1.5px solid #fde68a; border-radius: 6px; cursor: pointer; font-weight: 600; transition: all 0.2s;">
                <i class="fa-solid fa-eye"></i> Show Model Debates
              </button>
            </div>
            <div style="display: none; margin-top: 10px; padding: 12px; background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 6px; color: #166534; font-size: 0.95rem;">
              <strong>Historical Reflection:</strong> Compare your chosen word and reasoning with a partner! Can they challenge your historical link or offer an alternative Odd One Out?
            </div>
            <div id="odd-model-box" style="display: none; margin-top: 10px; padding: 14px 16px; background: #fefce8; border: 1.5px solid #facc15; border-radius: 8px; color: #713f12; font-size: 0.95rem; line-height: 1.6; box-shadow: 0 2px 8px rgba(234, 179, 8, 0.15);">
              <div style="font-weight: 700; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between; color: #854d0e;">
                <span><i class="fa-solid fa-star" style="color: #eab308;"></i> High-Tariff Discussion Exemplars:</span>
                <span style="font-size: 0.75rem; background: #fef08a; padding: 2px 8px; border-radius: 10px; text-transform: uppercase;">Teacher Debrief Guide</span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                ${oddExemplars
                  .map(
                    (ex, idx) => `
                  <div style="background: #ffffff; border: 1px solid #fde047; border-radius: 6px; padding: 10px 14px;">
                    <div style="font-size: 0.8rem; font-weight: 800; color: #b45309; text-transform: uppercase;">
                      Option ${String.fromCharCode(65 + idx)}: ${ex.title || 'Historical Link'}
                    </div>
                    <div style="font-size: 0.92rem; color: #1e293b; margin: 3px 0;">
                      <strong>Trio:</strong> ${Array.isArray(ex.trio) ? ex.trio.join(', ') : ex.trio} · <strong>Odd One Out:</strong> <span style="color: #b91c1c; font-weight: 700; background: #fee2e2; padding: 1px 6px; border-radius: 4px;">${ex.odd}</span>
                    </div>
                    <div style="font-size: 0.88rem; color: #334155;">
                      <strong>Why:</strong> ${ex.reason}
                    </div>
                  </div>
                `,
                  )
                  .join('')}
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (vocabStyle === 1) {
      // Style 1: The Golden Sentence (Connect Two)
      const goldenExemplar = getGoldenSentenceExemplar(lesson, vocabTermsList);
      htmlVocabInner += `
        <div id="vocab-cognitive-challenge" style="margin-top: 25px; padding-top: 20px; border-top: 1px dashed #cbd5e1;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-weight: 700; color: #1e3a8a; font-size: 1.05rem;">
                <i class="fa-solid fa-pen-fancy" style="color: #3b82f6; margin-right: 6px;"></i> Vocabulary Challenge: The Golden Sentence
              </span>
              <span style="font-size: 0.8rem; background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 12px; font-weight: 600;">Syntactic Precision</span>
            </div>
            ${wbDrillBtnHtml}
          </div>
          <p style="color: #475569; font-size: 0.95rem; margin-bottom: 12px;">
            Choose <strong>TWO</strong> terms from the word bank below. Write <strong>ONE</strong> single, grammatically sophisticated historical sentence connecting them using a causal conjunction (<strong>because</strong>, <strong>although</strong>, or <strong>consequently</strong>):
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; background: #f8fafc; padding: 10px; border-radius: 6px; border: 1px solid #e2e8f0;">
            ${vocabTermsList
              .map(
                (t) =>
                  `<span style="background: #ffffff; border: 1px solid #cbd5e1; padding: 4px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: 600; color: #1e293b;">${t}</span>`,
              )
              .join('')}
          </div>
          <textarea id="golden-sentence-input" placeholder="Write your Golden Sentence here using because, although, or consequently..." style="width: 100%; min-height: 70px; padding: 10px; border-radius: 6px; border: 1.5px solid #94a3b8; font-family: inherit; font-size: 0.95rem; box-sizing: border-box;"></textarea>
          <div style="margin-top: 8px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <button type="button" class="btn btn-primary" onclick="const val = (document.getElementById('golden-sentence-input').value || '').toLowerCase(); const feedback = document.getElementById('golden-feedback'); feedback.style.display='block'; if (val.includes('because') || val.includes('although') || val.includes('consequently')) { feedback.style.background='#f0fdf4'; feedback.style.borderColor='#86efac'; feedback.style.color='#166534'; feedback.innerHTML='<strong>Excellent Syntactic Construction!</strong> You successfully deployed a causal conjunction to establish a sophisticated historical link.'; } else { feedback.style.background='#fffbeb'; feedback.style.borderColor='#fde68a'; feedback.style.color='#92400e'; feedback.innerHTML='<strong>Tip:</strong> Ensure you include one of the target causal conjunctions: <em>because</em>, <em>although</em>, or <em>consequently</em> to elevate your sentence.'; }" style="font-size: 0.9rem; padding: 6px 14px; background: #1e40af; color: white; border: none; border-radius: 6px; cursor: pointer;">
              <i class="fa-solid fa-sparkles"></i> Check Sentence
            </button>
            <button type="button" class="btn btn-secondary" onclick="const box = document.getElementById('golden-model-box'); const isVis = box.style.display === 'block'; box.style.display = isVis ? 'none' : 'block'; this.innerHTML = isVis ? '<i class=\\'fa-solid fa-eye\\'></i> Show Model Sentence' : '<i class=\\'fa-solid fa-eye-slash\\'></i> Hide Model Sentence';" style="font-size: 0.9rem; padding: 6px 14px; background: #ffffff; color: #92400e; border: 1.5px solid #fde68a; border-radius: 6px; cursor: pointer; font-weight: 600; transition: all 0.2s;">
              <i class="fa-solid fa-eye"></i> Show Model Sentence
            </button>
          </div>
          <div id="golden-feedback" style="display: none; margin-top: 10px; padding: 12px; border: 1.5px solid #cbd5e1; border-radius: 6px; font-size: 0.95rem;"></div>
          <div id="golden-model-box" style="display: none; margin-top: 10px; padding: 14px 16px; background: #fefce8; border: 1.5px solid #facc15; border-radius: 6px; color: #713f12; font-size: 0.95rem; line-height: 1.6; box-shadow: 0 2px 6px rgba(234, 179, 8, 0.15);">
            <div style="font-weight: 700; margin-bottom: 4px; display: flex; align-items: gap: 6px; color: #854d0e;">
              <i class="fa-solid fa-star" style="color: #eab308;"></i> Model Golden Sentence:
            </div>
            <div style="font-style: italic; font-family: 'Playfair Display', Georgia, serif; font-size: 1.05rem; color: #1e293b;">
              "${goldenExemplar}"
            </div>
            <div style="margin-top: 6px; font-size: 0.82rem; color: #a16207;">
              <strong>Teacher Note:</strong> Demonstrates syntactic embedding of two curriculum terms connected by a causal conjunction.
            </div>
          </div>
        </div>
      `;
    } else if (vocabStyle === 2) {
      // Style 2: Conceptual Binary Sort
      htmlVocabInner += `
        <div id="vocab-cognitive-challenge" style="margin-top: 25px; padding-top: 20px; border-top: 1px dashed #cbd5e1;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-weight: 700; color: #1e3a8a; font-size: 1.05rem;">
                <i class="fa-solid fa-layer-group" style="color: #3b82f6; margin-right: 6px;"></i> Vocabulary Challenge: Conceptual Classification
              </span>
              <span style="font-size: 0.8rem; background: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 12px; font-weight: 600;">Conceptual Sorting</span>
            </div>
            ${wbDrillBtnHtml}
          </div>
          <p style="color: #475569; font-size: 0.95rem; margin-bottom: 12px;">
            Click on each term below to sort it into <strong>Power, Governance & Warfare</strong> or <strong>Economy, Trade & Society</strong>:
          </p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 10px;">
            <div id="sort-cat-power" style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 8px; padding: 12px; min-height: 120px;">
              <div style="font-weight: bold; color: #1e3a8a; font-size: 0.95rem; border-bottom: 1.5px solid #bfdbfe; padding-bottom: 6px; margin-bottom: 10px; text-align: center;">
                Power, Governance & Warfare
              </div>
              <div class="sort-bucket-items" style="display: flex; flex-direction: column; gap: 6px;"></div>
            </div>
            <div id="sort-cat-economy" style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 8px; padding: 12px; min-height: 120px;">
              <div style="font-weight: bold; color: #166534; font-size: 0.95rem; border-bottom: 1.5px solid #bbf7d0; padding-bottom: 6px; margin-bottom: 10px; text-align: center;">
                Economy, Trade & Society
              </div>
              <div class="sort-bucket-items" style="display: flex; flex-direction: column; gap: 6px;"></div>
            </div>
          </div>
          <div id="sort-token-container" style="margin-top: 12px; display: flex; flex-wrap: wrap; gap: 8px;">
            ${vocabTermsList
              .map(
                (t) =>
                  `<button type="button" class="btn btn-secondary sort-token-btn" onclick="const b1 = document.querySelector('#sort-cat-power .sort-bucket-items'); const b2 = document.querySelector('#sort-cat-economy .sort-bucket-items'); const root = document.getElementById('sort-token-container'); if(this.dataset.assigned === 'power'){ this.dataset.assigned='economy'; b2.appendChild(this); this.style.background='#dcfce7'; this.style.borderColor='#86efac'; } else if(this.dataset.assigned === 'economy'){ this.dataset.assigned='unassigned'; root.appendChild(this); this.style.background='#ffffff'; this.style.borderColor='#94a3b8'; } else { this.dataset.assigned='power'; b1.appendChild(this); this.style.background='#dbeafe'; this.style.borderColor='#93c5fd'; }" data-assigned="unassigned" style="padding: 5px 12px; font-size: 0.85rem; border-radius: 12px; border: 1.5px solid #94a3b8; background: #ffffff; color: #1e293b; cursor: pointer; font-weight: 600; transition: all 0.2s;">${t} &rarr;</button>`,
              )
              .join('')}
          </div>
          <p style="font-size: 0.8rem; color: #64748b; margin-top: 8px; font-style: italic;">Click a term button to cycle it between Power (blue), Economy (green), and unassigned.</p>
        </div>
      `;
    } else if (vocabStyle === 3) {
      // Style 3: Spot the Deliberate Historical Error!
      const errorStatement = lesson.vocab_deliberate_error
        ? lesson.vocab_deliberate_error
        : `A modern historical commentator claimed that ${vocabTermsList[0] || 'the main concept'} and ${vocabTermsList[1] || 'the event'} were completely trivial, playing no role in shaping the political outcome of this era.`;

      htmlVocabInner += `
        <div id="vocab-cognitive-challenge" style="margin-top: 25px; padding-top: 20px; border-top: 1px dashed #cbd5e1;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-weight: 700; color: #1e3a8a; font-size: 1.05rem;">
                <i class="fa-solid fa-triangle-exclamation" style="color: #ef4444; margin-right: 6px;"></i> Vocabulary Challenge: Spot the Deliberate Error!
              </span>
              <span style="font-size: 0.8rem; background: #fee2e2; color: #991b1b; padding: 2px 8px; border-radius: 12px; font-weight: 600;">Critical Reading</span>
            </div>
            ${wbDrillBtnHtml}
          </div>
          <p style="color: #475569; font-size: 0.95rem; margin-bottom: 12px;">
            The statement below contains a <strong>deliberate historical misconception</strong>. Identify the false claim and write the accurate historical correction below:
          </p>
          <div style="border-left: 4px solid #ef4444; background: #fef2f2; padding: 12px 16px; border-radius: 0 8px 8px 0; margin-bottom: 12px; font-size: 0.95rem; line-height: 1.6; color: #7f1d1d; font-style: italic;">
            "${errorStatement}"
          </div>
          <textarea id="deliberate-correction-input" placeholder="Explain the historical misconception and provide the accurate historical reality using evidence from the lesson..." style="width: 100%; min-height: 70px; padding: 10px; border-radius: 6px; border: 1.5px solid #94a3b8; font-family: inherit; font-size: 0.95rem; box-sizing: border-box;"></textarea>
          <div style="margin-top: 8px;">
            <button type="button" class="btn btn-primary" onclick="document.getElementById('error-correction-feedback').style.display='block'; this.style.display='none';" style="font-size: 0.9rem; padding: 6px 14px; background: #dc2626; color: white; border: none; border-radius: 6px; cursor: pointer;">
              <i class="fa-solid fa-eye"></i> Reveal Historical Truth & Reflection
            </button>
          </div>
          <div id="error-correction-feedback" style="display: none; margin-top: 10px; padding: 12px; background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 6px; color: #166534; font-size: 0.95rem; line-height: 1.5;">
            <strong>Historical Analysis:</strong> Historians must constantly interrogate statements for bias, oversimplification, and factual inaccuracies. Review your correction to ensure you contrasted the false claim with specific historical evidence from the lesson!
          </div>
        </div>
      `;
    }

    if (lesson.vocab_cloze_text && typeof lesson.vocab_cloze_text === 'string') {
      const vocabTerms = lesson.vocab.map((v) => (v.term || '').trim()).filter(Boolean);
      const shuffledOptions = [...vocabTerms].sort(() => Math.random() - 0.5);

      const clozeHtml = lesson.vocab_cloze_text.replace(/\[(.*?)\]/g, (match, term) => {
        const cleanTerm = term.trim();
        let options = `<option value="">-- select term --</option>`;
        shuffledOptions.forEach((opt) => {
          options += `<option value="${opt.replace(/"/g, '&quot;')}">${opt}</option>`;
        });
        return `<select class="cloze-blank-select" data-answer="${cleanTerm.replace(/"/g, '&quot;')}" style="display: inline-block; vertical-align: middle; padding: 4px 10px; margin: 2px 4px; font-family: inherit; font-size: 0.95rem; font-weight: 600; border: 2px solid #cbd5e1; border-radius: 6px; background-color: #ffffff; color: #1e293b; cursor: pointer; transition: all 0.2s; max-width: 100%;">${options}</select>`;
      });

      htmlVocabInner += `
              <div id="vocab-cloze-challenge" style="margin-top: 25px; padding-top: 20px; border-top: 1px dashed #cbd5e1;">
                <p style="color: #475569; margin-bottom: 12px; font-size: 1.05rem;">
                  <strong>Contextual Challenge:</strong> Complete the historical summary below by selecting the correct vocabulary term for each blank.
                </p>
                <div class="cloze-paragraph" style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 18px 20px; font-size: 1.05rem; line-height: 2.3; color: #1e293b;">
                  ${clozeHtml}
                </div>
                <div id="cloze-success" style="display: none; margin-top: 15px; padding: 12px; background: #ecfdf5; border: 2px solid #10b981; border-radius: 8px; color: #047857; font-weight: bold; text-align: center; font-size: 1.1rem;">
                  Cloze Challenge Mastered! All historical terms placed accurately in context.
                </div>
              </div>
      `;
    }

    htmlVocabInner += `
            </div>
          </div>
      `;
  }

  // ==========================================
  // TAB 2: THE HISTORY
  // ==========================================

  if (lesson.learning_objectives) {
    // Smart check: Only render overarching objective if it differs from the main lesson title
    let overarchingHtml = '';
    const cleanTitle = (lesson.title || '').replace(/^Lesson\\s*\\d+:\\s*/i, '').trim();
    const cleanObj =
      !Array.isArray(lesson.learning_objectives) && lesson.learning_objectives.overarching
        ? lesson.learning_objectives.overarching.trim()
        : '';
    if (cleanObj && cleanObj !== cleanTitle) {
      overarchingHtml = `
          <p style="font-size: 1.1rem; font-weight: 600; color: #1e3a8a; margin-bottom: 15px;">
            ${cleanObj}
          </p>
        `;
    }

    const scaffoldedObjs = Array.isArray(lesson.learning_objectives)
      ? lesson.learning_objectives
      : lesson.learning_objectives.scaffolded || [];

    htmlLearningObjectives += `
        <div class="learning-objectives-card" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 24px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border-top: 4px solid #10b981;">
          <h3 style="margin-top: 0; color: #0f172a; font-size: 1.2rem; display: flex; align-items: center; gap: 10px; margin-bottom: ${overarchingHtml ? '0' : '15px'};">
            <i class="fa-solid fa-bullseye" style="color: #10b981;"></i> Learning Objectives
          </h3>
          ${overarchingHtml}
          <ul style="margin: 0; padding-left: 20px; color: #334155; font-size: 1.05rem; line-height: 1.6;">
            ${scaffoldedObjs.map((obj) => `<li style="margin-bottom: 8px;">${obj}</li>`).join('')}
          </ul>
        </div>
      `;
  }

  let videos = [];
  if (lesson.video) {
    videos = videos.concat(Array.isArray(lesson.video) ? lesson.video : [lesson.video]);
  }
  if (lesson.extra_videos && Array.isArray(lesson.extra_videos)) {
    videos = videos.concat(lesson.extra_videos);
  }

  if (videos.length > 0) {
    htmlVideo = renderLessonVideos(videos, lesson, unitId);
  }

  if (lesson.narrative_blocks && lesson.narrative_blocks.length > 0) {
    htmlNarrative += `
        <div class="phase-card">
      `;

    const prologueText = lesson.prologue || lesson.hook_text || lesson.blurb;
    if (prologueText) {
      htmlNarrative += `
        <div class="historical-editorial-lede">
          <div class="lede-eyebrow">
            <i class="fa-solid fa-compass"></i>
            <span>The Historical Setting</span>
          </div>
          <p style="margin: 0;">
            "${prologueText}"
          </p>
        </div>
      `;
    }

    if (lesson.note_scaffold) {
      htmlNarrative += renderLessonNoteScaffold(lesson, unitId);
      window.postRenderHooks.push(() => {
        if (lesson.note_scaffold && Array.isArray(lesson.note_scaffold.blocks)) {
          lesson.note_scaffold.blocks.forEach((_, idx) => {
            const textarea = document.getElementById(`note-text-${lesson.id}-${idx}`);
            if (textarea) {
              const saved = localStorage.getItem(`med_note_${lesson.id}_${idx}`);
              if (saved) textarea.value = saved;
            }
          });
        }
      });
    }

    if (
      (isCme || unitId === 'great_war' || isKs3 || lesson.causal_domino_spine) &&
      (lesson.timeline_anchor || lesson.causal_domino_spine)
    ) {
      const stages =
        lesson.causal_domino_spine && Array.isArray(lesson.causal_domino_spine.stages)
          ? lesson.causal_domino_spine.stages
          : [];
      const anchors =
        lesson.timeline_anchor && Array.isArray(lesson.timeline_anchor)
          ? lesson.timeline_anchor
          : [];

      let spineItems = [];
      if (stages.length > 0) {
        spineItems = stages.map((s, i) => ({
          step: s.step || i + 1,
          date: s.date || '',
          title: s.title || '',
          desc: s.trigger || s.desc || '',
          actor: s.actor || '',
          tag: s.tag || '',
          because: s.because || '',
          therefore: s.therefore || '',
          connective: s.connective || '',
          question: s.question || s.workbook_question || '',
          exam_link: s.exam_link || '',
          para_ref: s.para_ref || s.paraRef || '',
        }));
      } else if (anchors.length > 0) {
        spineItems = anchors.map((a, i) => ({
          step: i + 1,
          date: a.date || '',
          title: a.title || '',
          desc: a.desc || '',
          actor: '',
          tag: '',
          because: '',
          therefore: '',
          connective: '',
          question: '',
          exam_link: '',
          para_ref: a.para_ref || a.paraRef || '',
        }));
      }

      if (spineItems.length > 0) {
        let lIdx = 0;
        if (typeof unitData !== 'undefined' && unitData && Array.isArray(unitData.lessons)) {
          lIdx = unitData.lessons.findIndex((l) =>
            l.id && lesson.id ? l.id === lesson.id : l.title === lesson.title,
          );
          if (lIdx === -1) lIdx = 0;
        }
        const pageAnchor = getWorkbookPageAnchor(unitId || window.currentUnitId, lesson, lIdx);

        htmlSpineInner += `
        <div id="lesson-chronology-spine" class="timeline-anchor-details cme-chronology-spine" style="background: #ffffff; border: 1.5px solid #cbd5e1; border-top: 4px solid #0284c7; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.04); overflow: hidden;">
          <div style="padding: 12px 18px; font-weight: 700; color: #0f172a; display: flex; align-items: center; justify-content: space-between; user-select: none; background: #f8fafc; border-bottom: 1px solid #e2e8f0; flex-wrap: wrap; gap: 8px;">
            <span style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
              <span style="background: #0284c7; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 0.68rem; font-weight: 800; padding: 2.5px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Chronology Spine</span>
              <span style="font-weight: 800; font-size: 0.98rem; color: #0f172a; font-family: 'Inter', sans-serif;">Key Turning Points &amp; Causal Dominoes</span>
            </span>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              ${pageAnchor ? `<span style="font-size: 0.74rem; font-weight: 700; color: #0369a1; background: #f0f9ff; border: 1px solid #bae6fd; padding: 2px 8px; border-radius: 12px;"><i class="fa-solid fa-book-open" style="color: #0284c7; margin-right: 4px;"></i> Workbook: ${pageAnchor.label}</span>` : ''}
              <button type="button" class="btn btn-toggle-all-spine-stages" onclick="event.stopPropagation(); window.toggleAllSpineDrawers(this);" style="font-family: 'Inter', sans-serif; font-size: 0.72rem; font-weight: 700; color: #0369a1; background: #ffffff; border: 1.2px solid #bae6fd; padding: 2px 10px; border-radius: 12px; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; box-shadow: 0 1px 2px rgba(0,0,0,0.04); transition: all 0.15s ease;" title="Expand or collapse all 5 stage drawers at once">
                <i class="fa-solid fa-arrows-up-down" style="font-size: 0.65rem;"></i> <span class="toggle-spine-text">Expand All</span>
              </button>
              <span style="font-size: 0.74rem; font-weight: 700; color: #475569; background: #e2e8f0; padding: 2px 8px; border-radius: 12px;">${spineItems.length} Milestones</span>
            </div>
          </div>
          <div class="cme-chronology-spine-grid" style="--spine-cols: ${spineItems.length};">
            ${spineItems
              .map((item, idx) => {
                const isLast = idx === spineItems.length - 1;
                return `
              <div class="cme-spine-card" data-stage="${item.step}">
                ${
                  !isLast
                    ? `
                <div class="cme-domino-pipeline-node" title="Stage ${item.step} triggers Stage ${item.step + 1}${item.connective ? ': ' + item.connective : ''}">
                  <i class="fa-solid fa-arrow-right"></i>
                </div>`
                    : ''
                }
                
                <!-- Baseline Narrative Zone (Row 1: Enquiry Focus) -->
                <div class="cme-spine-narrative-zone" style="display: flex; flex-direction: column; flex: 1; box-sizing: border-box;">
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px;">
                    <span style="font-family: 'Inter', sans-serif; font-size: 0.74rem; font-weight: 800; color: #0284c7; line-height: 1.25;" title="${item.date}">${item.date}</span>
                  </div>

                  ${
                    item.tag || item.actor
                      ? `
                  <div style="font-size: 0.63rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.3px; margin-bottom: 5px; line-height: 1.35;" title="${item.tag || ''} • ${item.actor || ''}">
                    ${item.tag ? `${item.tag} &bull; ` : ''}<strong style="color: #334155;">${item.actor || ''}</strong>
                  </div>`
                      : ''
                  }

                  <h5 style="font-family: 'Playfair Display', Georgia, serif; font-size: 0.88rem; font-weight: 800; color: #0f172a; margin: 0 0 6px 0; line-height: 1.25;">
                    ${item.title}
                  </h5>

                  ${
                    item.question || item.exam_link
                      ? `
                  <div class="cme-spine-question" style="font-size: 0.74rem; font-weight: 700; color: #0369a1; font-style: italic; line-height: 1.35; margin-bottom: 6px; background: #f0f9ff; padding: 6px 8px; border-radius: 4px; border-left: 2.5px solid #0284c7;">
                    ${item.question || item.exam_link}
                  </div>`
                      : ''
                  }
                </div>

                <!-- Collapsible Details: Narrative Evidence & Causal Consequence -->
                ${
                  item.desc || item.connective
                    ? `
                <details class="cme-spine-causal-drawer" style="margin-top: auto; padding-top: 6px;">
                  <summary style="cursor: pointer; user-select: none; display: flex; align-items: center; justify-content: space-between; font-size: 0.70rem; font-weight: 700; color: #1d4ed8; background: #eff6ff; padding: 4px 8px; border-radius: 4px; border: 1px solid #bfdbfe; transition: all 0.15s ease;">
                    <span style="display: inline-flex; align-items: center; gap: 6px;">
                      <i class="fa-solid fa-arrow-right"></i>
                      <span style="font-size: 0.68rem; letter-spacing: 0.2px;">Evidence &amp; Outcome</span>
                    </span>
                    <i class="fa-solid fa-chevron-down drawer-chevron" style="font-size: 0.62rem; color: #3b82f6;"></i>
                  </summary>
                  <div style="margin-top: 6px; display: flex; flex-direction: column; gap: 6px;">
                    ${
                      item.desc
                        ? `
                    <div class="cme-spine-desc" style="font-size: 0.73rem; color: #1e293b; line-height: 1.38; padding: 6px 8px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 4px;">
                      ${item.desc}
                    </div>`
                        : ''
                    }
                    ${
                      item.connective
                        ? `
                    <div class="cme-spine-consequence" style="font-size: 0.73rem; color: #1e3a8a; line-height: 1.38; padding: 6px 8px; background: #eff6ff; border: 1px solid #bfdbfe; border-left: 3px solid #2563eb; border-radius: 4px;">
                      <strong style="color: #1d4ed8; font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.4px; display: block; margin-bottom: 2px;">
                        <i class="fa-solid fa-arrow-right"></i> Consequence:
                      </strong>
                      ${item.connective}
                    </div>`
                        : ''
                    }
                  </div>
                </details>`
                    : ''
                }
                ${
                  item.para_ref
                    ? `
                <div style="margin-top: 6px; padding-top: 4px; border-top: 1px dashed #e2e8f0; display: flex; justify-content: flex-end;">
                  <button type="button" onclick="
                    const pNum = '${item.para_ref}'.match(/\\d+\\.\\d+/)?.[0] || '';
                    const chunk = Array.from(document.querySelectorAll('.para-ref')).find(el => el.textContent.includes(pNum))?.closest('.narrative-chunk') || Array.from(document.querySelectorAll('.para-ref')).find(el => el.textContent.includes(pNum));
                    if (chunk) {
                      chunk.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      chunk.style.transition = 'all 0.4s ease';
                      chunk.style.boxShadow = '0 0 0 4px #0284c7, 0 8px 24px rgba(2,132,199,0.25)';
                      setTimeout(() => { chunk.style.boxShadow = ''; }, 2500);
                    }
                  " style="font-size: 0.66rem; font-weight: 700; background: #f0f9ff; color: #0369a1; border: 1px solid #bae6fd; padding: 2px 6px; border-radius: 3px; cursor: pointer; display: inline-flex; align-items: center; gap: 3px;" title="Scroll directly to Paragraph ${item.para_ref}">
                    <i class="fa-solid fa-arrow-down" style="font-size: 0.58rem;"></i> Jump to Text
                  </button>
                </div>`
                    : ''
                }
              </div>
              ${
                !isLast
                  ? `
              <div class="cme-domino-vertical-connector" title="Stage ${item.step} triggers Stage ${item.step + 1}${item.connective ? ': ' + item.connective : ''}">
                <div class="cme-connector-line"></div>
                <div class="cme-connector-badge">
                  <i class="fa-solid fa-arrow-down"></i>
                  <span>${item.connective ? 'Causal Domino Trigger' : 'Next Stage'}</span>
                </div>
                <div class="cme-connector-line"></div>
              </div>`
                  : ''
              }
              `;
              })
              .join('')}
          </div>
        </div>
        `;
      }
    } else if (
      lesson.timeline_anchor &&
      Array.isArray(lesson.timeline_anchor) &&
      lesson.timeline_anchor.length > 0
    ) {
      htmlSpineInner += `
        <div class="timeline-anchor-details" style="background: #ffffff; border: 1px solid #cbd5e1; border-left: 4px solid #0284c7; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.04); overflow: hidden;">
          <div style="padding: 12px 18px; font-weight: 700; color: #0f172a; display: flex; align-items: center; justify-content: space-between; user-select: none; background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
            <span style="display: flex; align-items: center; gap: 10px; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.5px; color: #0369a1;">
              <i class="fa-solid fa-clock-rotate-left" style="color: #0284c7;"></i> Chronology Spine &bull; Key Milestones
            </span>
            <span style="font-size: 0.8rem; font-weight: 600; color: #64748b;">${lesson.timeline_anchor.length} Milestones</span>
          </div>
          <div style="padding: 16px 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; background: #fff;">
            ${lesson.timeline_anchor
              .map(
                (anchor) => `
              <div style="position: relative; border-left: 2px solid #e2e8f0; padding-left: 12px;">
                <div style="position: absolute; left: -6px; top: 2px; width: 10px; height: 10px; border-radius: 50%; background: #0284c7;"></div>
                <div style="font-size: 0.75rem; font-weight: 800; color: #0284c7; text-transform: uppercase; letter-spacing: 0.5px;">${anchor.date}</div>
                <div style="font-weight: 700; font-size: 0.95rem; color: #1e293b; margin: 2px 0 4px 0;">${anchor.title}</div>
                <div style="font-size: 0.82rem; color: #64748b; line-height: 1.4;">${anchor.desc}</div>
              </div>
            `,
              )
              .join('')}
            ${
              lesson.causal_domino_spine
                ? `
              <div style="grid-column: 1 / -1; margin-top: 6px; padding-top: 10px; border-top: 1px dashed #cbd5e1; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                <span style="font-size: 0.8rem; color: #64748b; font-style: italic;"><i class="fa-solid fa-circle-info" style="color: #0284c7;"></i> Master Chronology: Macro-framework covering key causal turning points.</span>
                <button type="button" onclick="document.getElementById('causal-domino-scaffold')?.scrollIntoView({ behavior: 'smooth' });" style="padding: 4px 10px; font-size: 0.76rem; font-weight: 700; background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 5px;">
                  <i class="fa-solid fa-diagram-project"></i> Jump to 5-Stage Causal Domino Note Scaffold (Pre-Exam Synthesis) &darr;
                </button>
              </div>
            `
                : ''
            }
          </div>
        </div>
      `;
    }

    if (
      lesson.workbook_stages &&
      Array.isArray(lesson.workbook_stages) &&
      lesson.workbook_stages.length > 0 &&
      !(
        lesson.causal_domino_spine &&
        Array.isArray(lesson.causal_domino_spine.stages) &&
        lesson.causal_domino_spine.stages.length > 0
      )
    ) {
      let lIdx = 0;
      if (typeof unitData !== 'undefined' && unitData && Array.isArray(unitData.lessons)) {
        lIdx = unitData.lessons.findIndex((l) =>
          l.id && lesson.id ? l.id === lesson.id : l.title === lesson.title,
        );
        if (lIdx === -1) lIdx = 0;
      }
      const pageAnchor = getWorkbookPageAnchor(unitId || window.currentUnitId, lesson, lIdx);
      htmlSpineInner += `
        <div id="lesson-workbook-stages-drawer" class="ks3-workbook-stages-drawer" style="background: #ffffff; border: 1.5px solid #0f284e; border-top: 4px solid #0f284e; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 3px 10px rgba(15, 40, 78, 0.08); overflow: hidden;">
          <div style="padding: 12px 18px; font-weight: 700; color: #0f284e; display: flex; align-items: center; justify-content: space-between; user-select: none; background: #f0f4f9; border-bottom: 1.2px solid #cbd5e1; flex-wrap: wrap; gap: 8px;">
            <span style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
              <span style="background: #0f284e; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 0.68rem; font-weight: 900; padding: 2.5px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Pupil Workbook Companion</span>
              <span style="font-weight: 800; font-size: 0.98rem; color: #0f284e; font-family: 'Inter', sans-serif;">5-Stage Chronological Enquiry Spine &bull; Paragraph Anchors</span>
            </span>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              ${pageAnchor ? `<span style="font-size: 0.76rem; font-weight: 700; color: #0f284e; background: #ffffff; border: 1px solid #93c5fd; padding: 2px 8px; border-radius: 12px;"><i class="fa-solid fa-book-open" style="color: #2563eb; margin-right: 4px;"></i> Workbook Spread: ${pageAnchor.label}</span>` : ''}
              <span style="font-size: 0.74rem; font-weight: 700; color: #475569; background: #e2e8f0; padding: 2px 8px; border-radius: 12px;">${lesson.workbook_stages.length} Inquiry Stages</span>
            </div>
          </div>
          <div class="ks3-stages-grid" style="padding: 14px; display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 12px; background: #ffffff;">
            ${lesson.workbook_stages
              .map((st) => {
                const targetFirstPara =
                  st.para_ref && st.para_ref.match(/\d+\.\d+/)
                    ? st.para_ref.match(/\d+\.\d+/)[0]
                    : '';
                return `
                <div class="ks3-stage-card" style="background: #f8fafc; border: 1.2px solid #cbd5e1; border-top: 3.5px solid #0f284e; border-radius: 6px; padding: 10px 11px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; gap: 6px; margin-bottom: 6px; flex-wrap: wrap;">
                      <div style="display: inline-flex; align-items: center; gap: 4px;">
                        <span style="background: #0f284e; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: 900; padding: 1px 6px; border-radius: 3px;">STAGE ${st.step}</span>
                        ${st.para_ref || st.paraRef ? `<span style="background: #1e3a8a; border: 0.8px solid #93c5fd; color: #ffffff; font-family: monospace; font-size: 0.65rem; font-weight: 800; padding: 1px 5px; border-radius: 3px;">Text ${st.para_ref || st.paraRef}</span>` : ''}
                      </div>
                      <span style="font-family: 'Inter', sans-serif; font-size: 0.72rem; font-weight: 800; color: #2563eb;">${st.date}</span>
                    </div>
                    <h5 style="font-family: 'Playfair Display', Georgia, serif; font-size: 0.88rem; font-weight: 800; color: #0f172a; margin: 0 0 6px 0; line-height: 1.3;">
                      ${st.heading || st.questionHeading || ''}
                    </h5>
                    ${
                      st.bullets && st.bullets.length > 0
                        ? `
                      <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 8px;">
                        ${st.bullets.map((b) => `<span style="font-size: 0.68rem; font-weight: 700; color: #0f284e; background: #e0f2fe; padding: 1px 6px; border-radius: 3px;">&bull; ${b}</span>`).join('')}
                      </div>
                    `
                        : ''
                    }
                    ${st.focus_clue || st.focusClue ? `<div style="font-size: 0.74rem; color: #475569; font-style: italic; line-height: 1.35; margin-bottom: 8px;">${st.focus_clue || st.focusClue}</div>` : ''}
                  </div>
                  <div style="margin-top: auto; padding-top: 6px; border-top: 1px dashed #cbd5e1; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.68rem; font-weight: 700; color: #64748b;">Workbook Left Page</span>
                    <button type="button" onclick="
                      const chunk = document.getElementById('para-${st.step}') || Array.from(document.querySelectorAll('.para-ref')).find(el => el.textContent.includes('${targetFirstPara}'))?.closest('.narrative-chunk') || Array.from(document.querySelectorAll('.para-ref')).find(el => el.textContent.includes('${targetFirstPara}'));
                      if (chunk) {
                        chunk.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        chunk.style.transition = 'all 0.4s ease';
                        chunk.style.boxShadow = '0 0 0 4px #2563eb, 0 8px 24px rgba(37,99,235,0.25)';
                        setTimeout(() => { chunk.style.boxShadow = ''; }, 2500);
                      }
                    " style="font-size: 0.68rem; font-weight: 700; background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; padding: 2px 7px; border-radius: 3px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
                      <i class="fa-solid fa-arrow-down"></i> Jump to Text
                    </button>
                  </div>
                </div>
              `;
              })
              .join('')}
          </div>
        </div>
      `;
    }

    let renderedKeyIndividual = false;
    lesson.narrative_blocks.forEach((block, index) => {
      if (block.type === 'interactive_hotspot_map') {
        const mapId = block.id || 'hotspot-map-' + index;
        const initialSpot = block.hotspots && block.hotspots[0] ? block.hotspots[0] : null;

        htmlNarrative += `
          <div class="interactive-hotspot-map-container" id="${mapId}-wrapper" style="margin: 32px 0; background: #0f172a; border: 1.5px solid #334155; border-radius: 12px; padding: 22px; color: #f8fafc; box-shadow: 0 8px 24px rgba(15, 23, 42, 0.35);">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.12); padding-bottom: 12px; margin-bottom: 16px; flex-wrap: wrap; gap: 8px;">
              <div>
                <span style="background: rgba(14, 165, 233, 0.2); border: 1px solid #0ea5e9; color: #38bdf8; padding: 2.5px 10px; border-radius: 4px; font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
                  <i class="fa-solid fa-map-location-dot" style="margin-right: 5px;"></i> Interactive Primary Map
                </span>
                <h3 style="margin: 6px 0 0 0; font-size: 1.35rem; font-family: 'Playfair Display', Georgia, serif; color: #ffffff;">${block.title}</h3>
                ${block.subtitle ? `<div style="font-size: 0.85rem; color: #94a3b8; margin-top: 4px;">${block.subtitle}</div>` : ''}
              </div>
              ${block.shelfmark ? `<span style="font-family: monospace; font-size: 0.70rem; color: #94a3b8; background: rgba(255,255,255,0.06); padding: 3px 8px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1);">${block.shelfmark}</span>` : ''}
            </div>

            <!-- Map Viewport with Hotspots -->
            <div class="hotspot-map-viewport" style="position: relative; width: 100%; min-height: 520px; background: #1e293b; border-radius: 8px; overflow: hidden; border: 1px solid #334155; margin-bottom: 16px; display: flex; justify-content: center; align-items: center; padding: 14px 10px;">
              <div class="hotspot-map-stage" style="position: relative; display: inline-block; max-height: 520px; line-height: 0;">
                <img src="${getAssetUrl(block.image)}" alt="${block.title}" style="max-height: 520px; max-width: 100%; width: auto; height: auto; display: block; border-radius: 6px; box-shadow: 0 4px 20px rgba(0,0,0,0.5); filter: contrast(1.05) brightness(0.95); pointer-events: none; user-select: none;" />
                
                <!-- Hotspot Pins -->
                ${(block.hotspots || [])
                  .map((spot, sIdx) => {
                    const isFirst = sIdx === 0;
                    const isLeftAligned = (spot.x || 0) > 75 || spot.align === 'left';
                    return `
                  <div class="map-hotspot-pin ${isFirst ? 'active-pin' : ''} ${isLeftAligned ? 'pin-align-left' : ''}" id="${mapId}-pin-${spot.id}" data-spot-id="${spot.id}" style="left: ${spot.x}%; top: ${spot.y}%;" title="${spot.title}">
                    <div class="pin-pulse" style="background: ${spot.color || '#b91c1c'};"></div>
                    <div class="pin-marker" style="background: ${spot.color || '#b91c1c'};"></div>
                    <div class="pin-label">
                      ${spot.label || spot.title.split(':')[0]}
                    </div>
                  </div>
                  `;
                  })
                  .join('')}
              </div>
            </div>

            <!-- Hotspot Dispatch Banner -->
            <div id="${mapId}-intel-card" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.12); border-left: 4px solid ${initialSpot ? initialSpot.color || '#38bdf8' : '#38bdf8'}; border-radius: 8px; padding: 16px 20px;">
              ${
                initialSpot
                  ? `
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;">
                  <div>
                    <span style="background: ${initialSpot.color || '#0284c7'}; color: #ffffff; font-size: 0.68rem; font-weight: 800; padding: 2px 7px; border-radius: 3px; text-transform: uppercase; letter-spacing: 0.5px;">${initialSpot.badge || 'Archival Incident'}</span>
                    <h4 style="margin: 4px 0 0 0; font-size: 1.15rem; color: #ffffff; font-family: 'Playfair Display', Georgia, serif;">${initialSpot.title}</h4>
                  </div>
                  <span style="font-size: 0.8rem; font-weight: 700; color: #f59e0b;">${initialSpot.date || ''}</span>
                </div>
                <p style="margin: 0 0 10px 0; font-size: 0.95rem; line-height: 1.6; color: #cbd5e1;">${initialSpot.details}</p>
                ${initialSpot.hinge ? `<div style="background: rgba(245, 158, 11, 0.12); border-left: 3px solid #f59e0b; padding: 8px 12px; border-radius: 4px; font-size: 0.88rem; color: #fde68a; font-style: italic;">${initialSpot.hinge}</div>` : ''}
              `
                  : ''
              }
            </div>

            <!-- Hotspot Buttons Row -->
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 14px; justify-content: center;">
              ${(block.hotspots || [])
                .map((spot, sIdx) => {
                  const isFirst = sIdx === 0;
                  return `
                <button type="button" class="btn btn-sm ${mapId}-nav-btn" data-spot-id="${spot.id}" style="background: ${isFirst ? spot.color || '#0284c7' : 'rgba(255,255,255,0.08)'}; color: #ffffff; border: 1px solid rgba(255,255,255,0.15); border-radius: 20px; padding: 4px 12px; font-size: 0.74rem; font-weight: 700; cursor: pointer; transition: all 0.2s ease;">
                  <span style="display: inline-block; width: 16px; height: 16px; border-radius: 50%; background: ${spot.color || '#0284c7'}; color: #fff; text-align: center; line-height: 16px; font-size: 0.62rem; margin-right: 5px;">${sIdx + 1}</span>
                  ${spot.label || spot.title.split(':')[0]}
                </button>
                `;
                })
                .join('')}
            </div>
          </div>
        `;

        window.postRenderHooks.push(() => {
          if (!document.getElementById('crummack-interactive-styles')) {
            initCrummackInteractiveFeatures();
          }
          const container = document.getElementById(`${mapId}-wrapper`);
          if (!container) return;
          const pins = container.querySelectorAll('.map-hotspot-pin');
          const navBtns = container.querySelectorAll(`.${mapId}-nav-btn`);
          const card = document.getElementById(`${mapId}-intel-card`);
          const spotMap = {};
          (block.hotspots || []).forEach((s) => {
            spotMap[s.id] = s;
          });

          function selectSpot(spotId) {
            const spot = spotMap[spotId];
            if (!spot || !card) return;

            pins.forEach((p) => p.classList.toggle('active-pin', p.dataset.spotId === spotId));
            navBtns.forEach((b) => {
              const active = b.dataset.spotId === spotId;
              b.style.background = active ? spot.color || '#0284c7' : 'rgba(255,255,255,0.08)';
              b.style.borderColor = active ? '#ffffff' : 'rgba(255,255,255,0.15)';
            });

            card.style.borderLeftColor = spot.color || '#38bdf8';
            card.innerHTML = `
              <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;">
                <div>
                  <span style="background: ${spot.color || '#0284c7'}; color: #ffffff; font-size: 0.68rem; font-weight: 800; padding: 2px 7px; border-radius: 3px; text-transform: uppercase; letter-spacing: 0.5px;">${spot.badge || 'Archival Incident'}</span>
                  <h4 style="margin: 4px 0 0 0; font-size: 1.15rem; color: #ffffff; font-family: 'Playfair Display', Georgia, serif;">${spot.title}</h4>
                </div>
                <span style="font-size: 0.8rem; font-weight: 700; color: #f59e0b;">${spot.date || ''}</span>
              </div>
              <p style="margin: 0 0 10px 0; font-size: 0.95rem; line-height: 1.6; color: #cbd5e1;">${spot.details}</p>
              ${spot.hinge ? `<div style="background: rgba(245, 158, 11, 0.12); border-left: 3px solid #f59e0b; padding: 8px 12px; border-radius: 4px; font-size: 0.88rem; color: #fde68a; font-style: italic;">${spot.hinge}</div>` : ''}
            `;
          }

          pins.forEach((p) => {
            p.addEventListener('click', () => selectSpot(p.dataset.spotId));
          });
          navBtns.forEach((b) => {
            b.addEventListener('click', () => selectSpot(b.dataset.spotId));
          });
        });

        return;
      }

      if (block.type === 'causal_diagram') {
        htmlNarrative += `
          <div class="causal-diagram-container" style="margin: 35px 0; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 12px; padding: 25px; color: #f8fafc; box-shadow: 0 8px 24px rgba(15, 23, 42, 0.25); border: 1px solid #334155;">
            <div style="text-align: center; margin-bottom: 25px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px;">
              <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(14, 165, 233, 0.2); border: 1px solid #0ea5e9; color: #38bdf8; padding: 4px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">
                <i class="fa-solid fa-code-fork"></i> Interactive Causal Convergence
              </div>
              <h3 style="margin: 0; font-size: 1.5rem; font-family: 'Playfair Display', serif; color: #ffffff;">${block.title}</h3>
              <p style="margin: 8px auto 0 auto; max-width: 650px; font-size: 0.95rem; color: #94a3b8; font-style: italic;">"${block.lead}"</p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 25px;">
              ${block.branches
                .map(
                  (b) => `
                <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-top: 4px solid ${b.color}; border-radius: 8px; padding: 14px; display: flex; flex-direction: column;">
                  <div style="font-weight: 700; font-size: 0.9rem; color: ${b.color}; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 6px;">${b.category}</div>
                  <ul style="margin: 0; padding-left: 18px; font-size: 0.84rem; line-height: 1.5; color: #cbd5e1; flex-grow: 1;">
                    ${b.steps.map((s) => `<li style="margin-bottom: 8px;">${s}</li>`).join('')}
                  </ul>
                  <div style="text-align: center; margin-top: 10px; color: ${b.color}; font-size: 1.1rem;">
                    <i class="fa-solid fa-arrow-down"></i>
                  </div>
                </div>
              `,
                )
                .join('')}
            </div>

            <div style="background: rgba(2, 132, 199, 0.15); border: 2px solid #0284c7; border-radius: 10px; padding: 18px 24px; text-align: center; max-width: 700px; margin: 0 auto; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.2);">
              <div style="font-size: 0.8rem; font-weight: 800; color: #38bdf8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Point of Causal Convergence &bull; ${block.convergence.date}</div>
              <div style="font-size: 1.25rem; font-weight: 800; color: #ffffff; margin-bottom: 6px; font-family: 'Playfair Display', serif;">${block.convergence.title}</div>
              <p style="margin: 0; font-size: 0.92rem; line-height: 1.5; color: #e2e8f0;">${block.convergence.desc}</p>
            </div>
          </div>
        `;
        return;
      }

      if (block.type === 'interactive_map') {
        htmlNarrative += `
            <div class="interactive-map-container" style="margin: 30px 0; background: #f8fafc; border: 2px solid #cbd5e1; border-radius: 12px; padding: 20px; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
              <h3 style="margin-top: 0; color: #1e293b; font-family: 'Playfair Display', serif;"><i class="fa-solid fa-compass" style="color: #1e3a8a; margin-right: 8px;"></i> ${block.title || 'Interactive Historical Map & Eyewitness Record'}</h3>
              <div class="map-img-wrapper" style="position: relative; height: 500px; width: 100%; display: flex; justify-content: center; align-items: center; overflow: hidden; margin-bottom: 20px; background: #fff; border-radius: 8px; border: 1px solid #e2e8f0;">
          `;

        block.maps.forEach((m, idx) => {
          htmlNarrative += `<img src="${getAssetUrl(m.src)}" id="map-img-${m.id}" data-action="open-modal" data-src="${getAssetUrl(m.src)}" alt="${m.label}" style="position: absolute; max-width: 100%; max-height: 100%; object-fit: contain; opacity: ${idx === 0 ? '1' : '0'}; pointer-events: ${idx === 0 ? 'auto' : 'none'}; transition: opacity 0.6s ease-in-out; border-radius: 6px; cursor: zoom-in;" title="Click to enlarge map">`;
        });

        htmlNarrative += `
              </div>
              <div id="map-caption-display" style="font-size: 1.1rem; font-style: italic; color: #334155; min-height: 3em; margin-bottom: 20px;">${block.maps[0].caption}</div>
              <div class="map-controls" style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
          `;

        block.maps.forEach((m, idx) => {
          const activeClass = idx === 0 ? 'active-map-btn' : '';
          const activeStyle =
            idx === 0
              ? 'background-color: #1e40af; color: #ffffff; border: 1px solid #1e40af;'
              : 'background-color: #f1f5f9; color: #334155; border: 1px solid #cbd5e1;';
          htmlNarrative += `
                <button class="btn btn-secondary map-toggle-btn ${activeClass}" data-map-id="${m.id}" data-caption="${m.caption.replace(/"/g, '&quot;')}" data-action="toggle-map" style="border-radius: 30px; padding: 8px 18px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; ${activeStyle}">
                  ${m.year} ${m.label}
                </button>
            `;
        });

        htmlNarrative += `
              </div>
            </div>
          `;
        return;
      }

      if (block.type === 'photo_slider') {
        const sliderId = 'slider-' + Math.random().toString(36).substr(2, 9);
        const hasSat = !!block.satellite_image;
        const isCollapsible = !!block.collapsible;

        let sliderHtml = `
            <div class="photo-slider-container" id="${sliderId}-container" style="margin: ${isCollapsible ? '16px 0 8px 0' : '32px 0'}; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 24px; text-align: center; box-shadow: 0 4px 16px rgba(0,0,0,0.06);">
              <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 6px;">
                <span class="archival-meta-tag" style="background: #e0e7ff; color: #3730a3; padding: 3px 10px; border-radius: 4px; font-weight: 700; font-size: 0.72rem; letter-spacing: 0.05em; text-transform: uppercase;">${block.tag || 'Cartographic Analysis'}</span>
              </div>
              <h3 style="margin: 6px 0 10px 0; color: #0f172a; font-family: 'Playfair Display', Georgia, serif; font-size: 1.45rem;">
                <i class="fa-solid fa-map-location-dot" style="margin-right: 8px; color: #1e3a8a;"></i> ${block.title || 'Then & Now: Map Slider'}
              </h3>
              ${block.description ? `<p style="font-size: 0.92rem; color: #475569; margin: 0 auto 16px auto; max-width: 760px; line-height: 1.5;">${block.description}</p>` : ''}
              
              ${
                hasSat
                  ? `
              <div style="display: flex; justify-content: center; gap: 10px; margin-bottom: 14px;">
                <button type="button" class="btn btn-sm" id="${sliderId}-btn-street" onclick="
                  const container = document.getElementById('${sliderId}-container');
                  const baseImg = container.querySelector('.slider-base-img');
                  baseImg.src = '${getAssetUrl(block.after_image)}';
                  container.querySelector('#${sliderId}-after-text').innerHTML = '${block.after_label || 'Modern Street Map'} <i class=\\'fa-solid fa-arrow-right\\' style=\\'margin-left: 4px;\\'></i>';
                  this.style.background = '#1e3a8a'; this.style.color = '#fff';
                  document.getElementById('${sliderId}-btn-sat').style.background = '#f1f5f9';
                  document.getElementById('${sliderId}-btn-sat').style.color = '#475569';
                " style="padding: 6px 14px; font-size: 0.82rem; font-weight: 700; border-radius: 6px; background: #1e3a8a; color: #ffffff; border: 1px solid #1e3a8a; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s;">
                  <i class="fa-solid fa-road"></i> Modern Street Map
                </button>
                <button type="button" class="btn btn-sm" id="${sliderId}-btn-sat" onclick="
                  const container = document.getElementById('${sliderId}-container');
                  const baseImg = container.querySelector('.slider-base-img');
                  baseImg.src = '${getAssetUrl(block.satellite_image)}';
                  container.querySelector('#${sliderId}-after-text').innerHTML = '${block.satellite_label || 'Modern Satellite Aerial'} <i class=\\'fa-solid fa-arrow-right\\' style=\\'margin-left: 4px;\\'></i>';
                  this.style.background = '#1e3a8a'; this.style.color = '#fff';
                  document.getElementById('${sliderId}-btn-street').style.background = '#f1f5f9';
                  document.getElementById('${sliderId}-btn-street').style.color = '#475569';
                " style="padding: 6px 14px; font-size: 0.82rem; font-weight: 700; border-radius: 6px; background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s;">
                  <i class="fa-solid fa-satellite"></i> Satellite Aerial Photo
                </button>
              </div>`
                  : ''
              }

              <!-- Viewport -->
              <div style="position: relative; width: 100%; max-width: 720px; aspect-ratio: ${block.aspect_ratio || '1 / 1'}; margin: 0 auto; overflow: hidden; border-radius: 10px; border: 2px solid #94a3b8; background: #0f172a; box-shadow: 0 4px 14px rgba(0,0,0,0.18); user-select: none;">
                <!-- After (Base) Image -->
                <img class="slider-base-img" src="${getAssetUrl(block.after_image)}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: ${block.object_fit || 'cover'}; pointer-events: none;" alt="${block.after_label || 'After'}">
                
                <!-- Before (Top) Image clipped -->
                <img class="slider-before-img" src="${getAssetUrl(block.before_image)}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: ${block.object_fit || 'cover'}; pointer-events: none; clip-path: inset(0 50% 0 0); -webkit-clip-path: inset(0 50% 0 0);" alt="${block.before_label || 'Before'}">
                
                <!-- Center Divider Line -->
                <div class="slider-divider" style="position: absolute; top: 0; bottom: 0; left: 50%; width: 3px; background: #2563eb; box-shadow: 0 0 10px rgba(0,0,0,0.6); pointer-events: none; z-index: 2;"></div>

                <!-- Slider Handle Visual -->
                <div class="slider-handle" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 44px; height: 44px; background: #ffffff; border: 2.5px solid #2563eb; border-radius: 50%; display: flex; justify-content: center; align-items: center; box-shadow: 0 3px 12px rgba(0,0,0,0.45); pointer-events: none; z-index: 3;">
                  <i class="fa-solid fa-arrows-left-right" style="color: #2563eb; font-size: 15px;"></i>
                </div>

                <!-- Invisible Range Input covering entire viewport -->
                <input type="range" min="0" max="100" value="50" class="photo-range-slider" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: ew-resize; z-index: 4; margin: 0; padding: 0;" oninput="
                  const p = this.parentElement;
                  const before = p.querySelector('.slider-before-img');
                  const div = p.querySelector('.slider-divider');
                  const h = p.querySelector('.slider-handle');
                  const v = this.value;
                  before.style.clipPath = 'inset(0 ' + (100 - v) + '% 0 0)';
                  before.style.webkitClipPath = 'inset(0 ' + (100 - v) + '% 0 0)';
                  div.style.left = v + '%';
                  h.style.left = v + '%';
                ">
              </div>

              <!-- Labels Bar -->
              <div style="display: flex; justify-content: space-between; max-width: 720px; margin: 12px auto 0 auto; color: #1e293b; font-size: 0.88rem; font-weight: 700;">
                <span style="color: #1e3a8a;"><i class="fa-solid fa-arrow-left" style="margin-right: 4px;"></i> ${block.before_label || 'Before'}</span>
                <span id="${sliderId}-after-text" style="color: #0f172a;">${block.after_label || 'After'} <i class="fa-solid fa-arrow-right" style="margin-left: 4px;"></i></span>
              </div>

              ${
                block.links && block.links.length
                  ? `
              <div style="margin-top: 16px; padding-top: 14px; border-top: 1px dashed #cbd5e1; display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
                ${block.links
                  .map(
                    (l) => `
                  <a href="${l.url}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.82rem; font-weight: 600; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 6px 12px; border-radius: 6px; text-decoration: none; transition: all 0.15s ease;" onmouseover="this.style.background='#dbeafe';" onmouseout="this.style.background='#eff6ff';">
                    <i class="${l.icon || 'fa-solid fa-arrow-up-right-from-square'}"></i> ${l.label}
                  </a>
                `,
                  )
                  .join('')}
              </div>`
                  : ''
              }
            </div>
        `;

        if (isCollapsible) {
          htmlNarrative += `
            <details class="local-study-accordion" style="margin: 24px 0; background: #ffffff; border: 1.5px solid #cbd5e1; border-left: 4px solid #16a34a; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); overflow: hidden;">
              <summary style="padding: 14px 20px; font-weight: 700; color: #166534; cursor: pointer; display: flex; align-items: center; justify-content: space-between; user-select: none; background: #f0fdf4;">
                <span style="display: flex; align-items: center; gap: 10px; font-size: 0.98rem; text-transform: uppercase; letter-spacing: 0.5px;">
                  <i class="fa-solid fa-location-dot" style="color: #16a34a;"></i> ${block.accordion_title || 'Local Fieldwork Study &bull; Interactive Cartography'}
                </span>
                <span style="font-size: 0.82rem; font-weight: 600; color: #15803d; display: inline-flex; align-items: center; gap: 6px;">
                  <i class="fa-solid fa-map"></i> View Map &amp; Links <i class="fa-solid fa-chevron-down"></i>
                </span>
              </summary>
              <div style="padding: 8px 16px 16px 16px;">
                ${sliderHtml}
              </div>
            </details>
          `;
        } else {
          htmlNarrative += sliderHtml;
        }
        return;
      }

      if (block.type === 'flip_card_gallery') {
        const searchId = 'search-cards-' + Math.random().toString(36).substr(2, 9);

        htmlNarrative += `
            <div class="flip-card-gallery-wrapper" style="margin: 40px 0; background: #1e293b; border: 2px solid #0f172a; border-radius: 12px; padding: 25px; box-shadow: inset 0 2px 10px rgba(0,0,0,0.5);">
              <h3 style="margin-top: 0; color: #f8fafc; font-family: 'Playfair Display', serif; text-align: center; border-bottom: 1px solid #475569; padding-bottom: 15px; margin-bottom: 20px;">
                <i class="fa-solid fa-users-viewfinder"></i> The Fallen
              </h3>
              ${
                block.cards && block.cards.length > 10
                  ? `
              <div style="text-align: center; margin-bottom: 30px;">
                <input type="text" id="${searchId}" placeholder="Search names..." onkeyup="
                  const filter = this.value.toUpperCase();
                  const gallery = this.parentElement.nextElementSibling;
                  const cards = gallery.getElementsByClassName('flip-card-wrapper');
                  for (let i = 0; i < cards.length; i++) {
                    const name = cards[i].getAttribute('data-name');
                    if (name.toUpperCase().indexOf(filter) > -1) {
                      cards[i].style.display = '';
                    } else {
                      cards[i].style.display = 'none';
                    }
                  }
                " style="padding: 12px 20px; width: 80%; max-width: 400px; border-radius: 25px; border: 1px solid #334155; background: #0f172a; color: white; outline: none; font-size: 1.1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
              </div>`
                  : ''
              }
              
              <div class="flip-card-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px;">
          `;

        if (block.cards && Array.isArray(block.cards)) {
          block.cards.forEach((card) => {
            htmlNarrative += `
                <div class="flip-card-wrapper" data-name="${card.name.replace(/"/g, '&quot;')}" style="background-color: transparent; height: 350px; perspective: 1000px; cursor: pointer;" data-action="flip-card">
                  <div class="flip-card-inner" style="position: relative; width: 100%; height: 100%; text-align: center; transition: transform 0.8s; transform-style: preserve-3d;">
                    
                    <!-- Front of card -->
                    <div class="flip-card-front" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; background-color: #334155; color: white; border-radius: 10px; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.4); border: 1px solid #475569;">
                      <h4 style="margin: 0 0 15px 0; font-size: 1.4rem; font-family: 'Playfair Display', serif; color: #f8fafc; border-bottom: 2px solid #1e293b; padding-bottom: 10px; width: 100%;">${card.name}</h4>
                      <p style="font-size: 1.05rem; font-style: italic; color: #cbd5e1; margin: 0;">${card.background}</p>
                      <div style="margin-top: auto; color: #94a3b8; font-size: 0.85rem;"><i class="fa-solid fa-hand-pointer"></i> Tap to flip</div>
                    </div>
                    
                    <!-- Back of card -->
                    <div class="flip-card-back" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; background-color: #0f172a; color: white; transform: rotateY(180deg); border-radius: 10px; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.5); border: 2px solid #065f46; overflow-y: auto;">
                      <i class="fa-solid fa-cross" style="color: #059669; font-size: 2rem; margin-bottom: 15px;"></i>
                      <p style="font-size: 1rem; line-height: 1.5; color: #e2e8f0; margin: 0;">${card.story}</p>
                    </div>
                    
                  </div>
                </div>
              `;
          });
        }

        htmlNarrative += `
              </div>
            </div>
          `;
        return;
      }

      const bg = index % 2 === 0 ? '#ffffff' : '#f0f9ff';

      if (typeof block.text === 'string' && block.text.match(/^\[Key Individual:\s*(.+)\]$/i)) {
        const kiMatch = block.text.match(/^\[Key Individual:\s*(.+)\]$/i);
        const personName = kiMatch[1].trim();
        let person = null;
        if (window.db && window.currentUnitId) {
          const unitDb = window.db[window.currentUnitId];
          person = unitDb.data?.key_individuals?.find((p) =>
            p.name.toLowerCase().includes(personName.toLowerCase()),
          );
          if (!person)
            person = unitDb.biographies?.find((p) =>
              p.name.toLowerCase().includes(personName.toLowerCase()),
            );
        }
        if (
          !person &&
          typeof appStore !== 'undefined' &&
          appStore?.state?.activeUnitData?.key_individuals
        ) {
          person = appStore.state.activeUnitData.key_individuals.find((p) =>
            p.name.toLowerCase().includes(personName.toLowerCase()),
          );
        }
        if (person) {
          const cardHtml = generateKeyIndividualEmbedHTML
            ? generateKeyIndividualEmbedHTML(person)
            : `<div>${person.name}</div>`;
          htmlNarrative += `
               <div class="key-individual-embed" style="margin: 6px 0;">
                 ${cardHtml}
               </div>
             `;
          if (block.tasks && block.tasks.length > 0) {
            htmlNarrative += `<div class="embedded-tasks-container" style="margin-bottom: 25px; padding: 15px; background: #fffbeb; border: 2px dashed #fcd34d; border-radius: 6px;">`;
            block.tasks.forEach((task, tIdx) => {
              if (task.type === 'source_utility' || task.taskType === 'source_utility') {
                htmlNarrative += renderSourceUtilityTaskHTML(
                  task,
                  index,
                  task.qNum || tIdx,
                  unitId,
                );
                return;
              }
              if (
                task.type === 'historical_interpretations' ||
                task.taskType === 'historical_interpretations'
              ) {
                htmlNarrative += renderHistoricalInterpretationsTaskHTML(
                  task,
                  index,
                  task.qNum || tIdx,
                  unitId,
                );
                return;
              }
              if (task.type === 'two_sided_argument') {
                const qNumPrefix = task.qNum ? `Q${task.qNum}. ` : '';
                const adv = task.advancement || {};
                const lim = task.limitations || {};
                const advTitle = adv.title || 'Advancement & Progress (Change)';
                const limTitle = lim.title || 'Critical Limitations & Stagnation (Continuity)';
                const advPoints = adv.points || [];
                const limPoints = lim.points || [];
                const advStarter = adv.starter || adv.sentence_starter || '';
                const limStarter = lim.starter || lim.sentence_starter || '';
                const synthesisPrompt =
                  task.synthesis_prompt ||
                  'Write a balanced GCSE exam paragraph evaluating both sides.';
                const connectives = task.synthesis_connectives || [
                  'Although...',
                  'However, in practical terms...',
                  'Consequently...',
                  'Overall...',
                ];
                const modelAnswer = task.model_answer || task.model || '';

                htmlNarrative += `
                  <div class="task-box two-sided-argument-interactive" style="margin-bottom: 16px; background: #ffffff; padding: 16px; border-radius: 8px; border: 2px solid #0f766e; box-shadow: 0 3px 10px rgba(15, 118, 110, 0.08);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #ccfbf1; padding-bottom: 8px;">
                      <h4 style="margin: 0; color: #0f766e; font-size: 1.1rem;"><i class="fa-solid fa-scale-balanced" style="margin-right: 8px;"></i> ${qNumPrefix}${task.topic || task.text || 'Two-Sided Argument Analysis'}</h4>
                      <span style="background: #0f766e; color: #ffffff; font-size: 0.75rem; font-weight: 700; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">GCSE Two-Sided Argument</span>
                    </div>
                    ${task.instruction ? `<p style="font-size: 0.95rem; color: #475569; font-style: italic; margin-top: 0; margin-bottom: 14px;">${task.instruction}</p>` : ''}
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; margin-bottom: 14px;">
                      <!-- Side 1: Advancement / Progress -->
                      <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 6px; padding: 12px;">
                        <h5 style="margin: 0 0 8px 0; color: #166534; font-size: 0.95rem; border-bottom: 1.5px solid #86efac; padding-bottom: 4px; display: flex; align-items: center; gap: 6px;">
                          <i class="fa-solid fa-arrow-trend-up"></i> ${advTitle}
                        </h5>
                        <ul style="margin: 0 0 10px 0; padding-left: 16px; color: #1e293b; font-size: 0.88rem; line-height: 1.45;">
                          ${advPoints.map((pt) => `<li style="margin-bottom: 5px;">${pt}</li>`).join('')}
                        </ul>
                        ${advStarter ? `<div style="padding: 6px 8px; background: #ffffff; border-left: 3px solid #22c55e; border-radius: 4px; font-size: 0.82rem; color: #15803d; font-style: italic;"><strong>Evidence Stem:</strong> &ldquo;${advStarter}&rdquo;</div>` : ''}
                      </div>

                      <!-- Side 2: Limitations / Continuity -->
                      <div style="background: #fff1f2; border: 1.5px solid #fecdd3; border-radius: 6px; padding: 12px;">
                        <h5 style="margin: 0 0 8px 0; color: #9f1239; font-size: 0.95rem; border-bottom: 1.5px solid #fecdd3; padding-bottom: 4px; display: flex; align-items: center; gap: 6px;">
                          <i class="fa-solid fa-hand"></i> ${limTitle}
                        </h5>
                        <ul style="margin: 0 0 10px 0; padding-left: 16px; color: #1e293b; font-size: 0.88rem; line-height: 1.45;">
                          ${limPoints.map((pt) => `<li style="margin-bottom: 5px;">${pt}</li>`).join('')}
                        </ul>
                        ${limStarter ? `<div style="padding: 6px 8px; background: #ffffff; border-left: 3px solid #f43f5e; border-radius: 4px; font-size: 0.82rem; color: #be123c; font-style: italic;"><strong>Counter-Stem:</strong> &ldquo;${limStarter}&rdquo;</div>` : ''}
                      </div>
                    </div>

                    <!-- Synthesis: GCSE Paragraph Builder -->
                    <div style="background: #fffbeb; border: 1.5px solid #fcd34d; border-radius: 6px; padding: 12px;">
                      <h5 style="margin: 0 0 6px 0; color: #92400e; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
                        <i class="fa-solid fa-pen-nib"></i> GCSE Paragraph Builder: Evaluative Synthesis
                      </h5>
                      <p style="font-size: 0.9rem; color: #78350f; font-weight: 600; margin: 0 0 8px 0;">${synthesisPrompt}</p>
                      
                      <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; align-items: center;">
                        <span style="font-size: 0.75rem; font-weight: 700; color: #92400e; text-transform: uppercase;">Connectives:</span>
                        ${connectives.map((c) => `<span style="background: #ffffff; border: 1px solid #fde68a; color: #b45309; padding: 2px 7px; border-radius: 10px; font-size: 0.78rem; font-weight: 600;">${c}</span>`).join('')}
                      </div>

                      <textarea class="interactive-textarea" style="width: 100%; box-sizing: border-box; min-height: 80px; padding: 8px; border: 1px solid #fde68a; border-radius: 5px; font-size: 0.9rem; font-family: inherit; resize: vertical;" placeholder="Combine the evidence and counter-evidence above to write your complex, balanced GCSE exam paragraph..."></textarea>

                      ${
                        modelAnswer
                          ? `
                        <details style="margin-top: 8px;">
                          <summary style="cursor: pointer; color: #b45309; font-weight: 600; font-size: 0.85rem;"><i class="fa-solid fa-eye"></i> View Level 4 Model Paragraph</summary>
                          <div class="scaffold-box model-box" style="margin-top: 6px; padding: 10px 12px; background: #ffffff; border-left: 3px solid #f59e0b; border-radius: 4px; font-size: 0.9rem; color: #78350f; line-height: 1.5;">
                            ${modelAnswer}
                          </div>
                        </details>
                      `
                          : ''
                      }
                    </div>
                  </div>
                `;
                return;
              }

              const qNumPrefix = task.qNum ? `Q${task.qNum}. ` : '';
              const taskPrompt =
                task.text || task.question || task.instructions || task.prompt || '';
              const cleanTaskText = taskPrompt.replace(/^Q\d+[\.\:]\s*/i, '');
              const taskTitle =
                task.title && task.title !== taskPrompt && !cleanTaskText.startsWith(task.title)
                  ? task.title
                  : '';
              const titleHtml = taskTitle
                ? `<div style="font-weight: 800; font-size: 0.88rem; color: #92400e; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">${taskTitle}</div>`
                : '';
              const taskStarter =
                task.starter ||
                task.sentence_starter ||
                (task.scaffolding &&
                  (task.scaffolding.starter || task.scaffolding.sentence_starter));
              const taskModel = task.model || task.model_answer || task.answer;
              htmlNarrative += `
                <div class="task-box" style="margin-bottom: 12px; background: white; padding: 12px 15px; border-radius: 6px; border: 1px solid #fde68a;">
                  ${titleHtml}
                  <strong style="color: #92400e; font-size: 1.05rem;">${qNumPrefix}${cleanTaskText}</strong>
                  ${taskStarter ? `<details style="margin-top: 8px;"><summary style="cursor: pointer; color: #0284c7; font-weight: 600; font-size: 0.9rem;"><i class="fa-solid fa-pen"></i> Sentence Starter</summary><div class="scaffold-box starter-box" style="margin-top: 8px; padding: 10px; background: #f0f9ff; border-left: 3px solid #0284c7; border-radius: 4px; font-size: 0.95rem; color: #0c4a6e; font-style: italic;">${taskStarter}</div></details>` : ''}
                  ${taskModel ? `<details style="margin-top: 8px;"><summary style="cursor: pointer; color: #b45309; font-weight: 600; font-size: 0.9rem;"><i class="fa-solid fa-eye"></i> View Model Answer</summary><div class="scaffold-box model-box" style="margin-top: 8px; padding: 10px; background: #fef3c7; border-left: 3px solid #b45309; border-radius: 4px; font-size: 0.95rem; color: #78350f;">${taskModel}</div></details>` : ''}
                </div>
              `;
            });
            htmlNarrative += `</div>`;
          }
          if (block.hinge_question) {
            const hingeId = `hinge-${index}`;
            const hingeQuestionText = block.hinge_question.text || block.hinge_question.question;
            const correctIndex =
              block.hinge_question.correct_index !== undefined
                ? block.hinge_question.correct_index
                : block.hinge_question.answer;
            htmlNarrative += `
                <div class="hinge-question-container no-print" style="margin-bottom: 25px; margin-top: -5px;">
                  <button class="btn btn-secondary" id="btn-${hingeId}" data-action="reveal-hinge" data-target="${hingeId}" style="background: #0ea5e9; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: background 0.2s;"><i class="fa-solid fa-person-circle-question" style="margin-right: 6px;"></i> Reveal Hinge Question</button>
                  <div id="${hingeId}" style="display: none; background: #f0f9ff; border: 2px solid #38bdf8; padding: 15px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    <div style="color: #0284c7; font-weight: bold; font-size: 0.9rem; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-circle-question"></i> Interactive Hinge Question</div>
                    <div style="color: #0f172a; font-size: 1.1rem; font-weight: bold; margin-bottom: 15px;">"${hingeQuestionText}"</div>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                      ${block.hinge_question.options
                        .map(
                          (opt, i) => `
                        <button data-action="hinge-mcq-select" data-correct="${correctIndex}" data-index="${i}" style="text-align: left; background: white; border: 1px solid #bae6fd; padding: 12px 15px; border-radius: 6px; cursor: pointer; transition: all 0.2s; font-size: 1rem; color: #334155;">
                          <strong>${String.fromCharCode(65 + i)}:</strong> ${opt}
                        </button>
                      `,
                        )
                        .join('')}
                    </div>
                    <div style="display: none; margin-top: 15px; padding: 12px; background: #dcfce7; border-left: 4px solid #22c55e; color: #166534; font-size: 1rem; border-radius: 0 6px 6px 0;">
                      <strong>Explanation:</strong> ${block.hinge_question.explanation}
                    </div>
                  </div>
                </div>
              `;
          }
          return;
        }
      }

      const isQuote = typeof block.text === 'string' && block.text.startsWith('"');
      let blockText = block.text || '';

      // 1. Add inline Key Individual links FIRST
      let contentStr = blockText.replace(/\[Key Individual:\s*([^\]]+)\]/gi, (match, name) => {
        const hasPerson =
          appStore.state.activeUnitData &&
          appStore.state.activeUnitData.key_individuals &&
          appStore.state.activeUnitData.key_individuals.some(
            (p) => p.name && p.name.toLowerCase() === name.toLowerCase(),
          );
        if (!hasPerson) {
          return name;
        }
        return `<a href="javascript:void(0)" class="key-individual-inline-link no-print" data-action="jump-to-key-individual" data-name="${name}" style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 4px; color: #2563eb; text-decoration: none; font-weight: 600; cursor: pointer; padding: 2px 6px; font-size: 0.95em; font-family: inherit; display: inline-flex; align-items: center; gap: 4px; vertical-align: baseline;"><i class="fa-solid fa-id-card-clip"></i> ${name}</a><span class="print-only" style="display:none; font-weight:bold;">${name}</span>`;
      });

      // 2. Add Glossary highlighting SECOND (it will skip the <a> tags we just made)
      contentStr = isQuote
        ? `<em style="font-size:1.1rem; color:#475569;">${contentStr}</em>`
        : highlightGlossary(contentStr);

      contentStr = formatBold(contentStr);
      contentStr = contentStr.replace(
        /src=["'](\.\/)?assets\//g,
        'src="/units/' + window.currentUnitId + '/assets/',
      );
      let styledContent = contentStr;
      if (contentStr.trim().startsWith('<strong>')) {
        styledContent = contentStr.replace(/^<strong>(.*?)<\/strong>\s*/i, (match, headingText) => {
          return `<div class="paragraph-signpost" style="font-weight: 700; color: #1e3a8a; font-size: 1.08rem; letter-spacing: 0.1px; margin-bottom: 6px; border-left: 3px solid #3b82f6; padding-left: 8px;">${headingText}</div><br/>`;
        });
      }

      let l4StyledContent = '';
      if (block.level_4) {
        // 1. Add inline Key Individual links FIRST
        let l4ContentStr = block.level_4.replace(
          /\[Key Individual:\s*([^\]]+)\]/gi,
          (match, name) => {
            const hasPerson =
              appStore.state.activeUnitData &&
              appStore.state.activeUnitData.key_individuals &&
              appStore.state.activeUnitData.key_individuals.some(
                (p) => p.name && p.name.toLowerCase() === name.toLowerCase(),
              );
            if (!hasPerson) {
              return name;
            }
            return `<a href="javascript:void(0)" class="key-individual-inline-link no-print" data-action="jump-to-key-individual" data-name="${name}" style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 4px; color: #2563eb; text-decoration: none; font-weight: 600; cursor: pointer; padding: 2px 6px; font-size: 0.95em; font-family: inherit; display: inline-flex; align-items: center; gap: 4px; vertical-align: baseline;"><i class="fa-solid fa-id-card-clip"></i> ${name}</a><span class="print-only" style="display:none; font-weight:bold;">${name}</span>`;
          },
        );

        // 2. Add Glossary highlighting SECOND
        l4ContentStr = isQuote
          ? `<em style="font-size:1.1rem; color:#475569;">${l4ContentStr}</em>`
          : highlightGlossary(l4ContentStr);

        l4ContentStr = formatBold(l4ContentStr);
        l4StyledContent = l4ContentStr;
        if (l4ContentStr.trim().startsWith('<strong>')) {
          l4StyledContent = l4ContentStr.replace(
            /^<strong>(.*?)<\/strong>\s*/i,
            (match, headingText) => {
              return `<div class="paragraph-signpost" style="font-weight: 700; color: #047857; font-size: 1.08rem; letter-spacing: 0.1px; margin-bottom: 6px; border-left: 3px solid #10b981; padding-left: 8px;">${headingText}</div><br/>`;
            },
          );
        }
      }

      let themeHeadingHtml = '';
      const rawHeading = block.theme_heading || block.title;
      if (rawHeading) {
        let displayHeading = rawHeading;
        if (/^Act\s*\d+/i.test(rawHeading)) {
          const bracketMatch = rawHeading.match(/\(([^)]+)\)/);
          if (bracketMatch) {
            displayHeading = bracketMatch[1].trim();
          } else {
            displayHeading = displayHeading
              .replace(/^Act\s*\d+\s*:\s*[^:\-–—]+[:\-–—]\s*/i, '')
              .replace(/^Act\s*\d+\s*:\s*/i, '')
              .trim();
          }
        }
        const headingId = displayHeading
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        themeHeadingHtml = `<h4 class="narrative-heading" id="${headingId}" style="margin: 0; color: #1e3a8a; font-size: 1.12rem; font-weight: 700; display: inline-flex; align-items: center; gap: 8px;"><i class="fa-solid fa-bookmark" style="color: #64748b; font-size: 0.95rem;"></i><span>${displayHeading}</span></h4>`;
      }

      let imageHtml = '';
      if (block.images && Array.isArray(block.images) && block.images.length > 0) {
        const galleryData = encodeURIComponent(
          JSON.stringify(
            block.images.map((img) => ({
              src: getAssetUrl(img.src || img.image),
              alt: img.alt || img.image_alt || '',
            })),
          ),
        ).replace(/'/g, '%27');
        imageHtml = `
             <style>
               .image-hint-caption {
                 font-size: 0.9rem; color: #64748b; margin-top: 8px; font-style: italic; cursor: pointer; user-select: none; transition: all 0.3s ease; padding: 4px; border-radius: 4px; display: inline-block;
               }
               .image-hint-caption:hover {
                 background: rgba(0,0,0,0.02);
               }
               .image-hint-caption.blurred {
                 color: transparent !important; text-shadow: 0 0 10px rgba(100,116,139,0.8) !important;
               }
             </style>
             <div class="narrative-images-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 20px 0;">
               ${block.images
                 .map((img, idx) => {
                   if (img.image_context) {
                     const isWeimar =
                       window.currentUnitId === 'weimar_nazi_germany' ||
                       unitId === 'weimar_nazi_germany';

                     let contextText = img.image_context || '';
                     let hingeText = '';
                     if (contextText.includes('**Hinge Question:**')) {
                       const parts = contextText.split('**Hinge Question:**');
                       contextText = parts[0].trim();
                       hingeText = parts[1].trim();
                     } else if (contextText.includes('Hinge Question:')) {
                       const parts = contextText.split('Hinge Question:');
                       contextText = parts[0].trim();
                       hingeText = parts[1].trim();
                     }

                     if (isWeimar) {
                       const displayCaption =
                         img.caption || img.image_caption || 'Archival Primary Record';
                       const imgSrc = getAssetUrl(img.src || img.image);
                       return `
                       <div style="width: 100%; grid-column: 1 / -1; margin: 6px 0;">
                         <details class="cme-source-drawer weimar-source-drawer archival-drawer gcse-source-container archival-source-box" id="source-card-A" data-source-letter="A" style="margin: 0; border: 1px solid #cbd5e1; border-radius: 6px; background: #f8fafc; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.02); transition: all 0.25s ease;">
                           <summary style="padding: 5px 12px; min-height: 40px; padding: 7px 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: space-between; background: #f1f5f9; color: #0f172a; list-style: none; user-select: none; transition: background 0.15s ease;">
                             <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                               <span class="archival-meta-tag" style="background: #1e40af; color: #ffffff; padding: 2px 6px; border-radius: 3px; font-size: 0.62rem; font-weight: 800; letter-spacing: 0.4px; line-height: 1.2;">PRIMARY VISUAL RECORD</span>
                               <span class="archival-drawer-title" style="font-family: 'Playfair Display', Georgia, serif; font-size: 0.84rem; color: #1e293b; font-weight: 700; line-height: 1.2;">${displayCaption}</span>
                             </div>
                             <span class="drawer-toggle-indicator" style="font-size: 0.68rem; color: #64748b; display: inline-flex; align-items: center; gap: 4px; font-weight: 600; flex-shrink: 0;">
                               Archival Evidence &bull; Expand <span class="drawer-caret">&#9660;</span>
                             </span>
                           </summary>
                           <div class="weimar-source-content" style="padding: 18px; background: #ffffff; border-top: 1px solid #e2e8f0;">
                             ${(() => {
                               const disc = getArchivalSourceDiscussionComponents(
                                 hingeText,
                                 img,
                                 isKs2,
                                 '10px',
                               );
                               return `
                             <div class="archival-source-split-layout">
                               <div class="archival-source-media-col">
                                 <img src="${imgSrc}" alt="${displayCaption}" style="width: 100%; max-height: 380px; object-fit: contain; background: #fff; border-radius: 6px; box-shadow: 0 2px 5px rgba(0,0,0,0.08); border: 1px solid #cbd5e1; cursor: zoom-in;" data-action="open-gallery" data-gallery="${galleryData}" data-index="${idx}">
                                 <div class="archival-source-inspect-badge">
                                   <i class="fa-solid fa-magnifying-glass-plus" style="font-size: 0.65rem; color: #93c5fd;"></i>
                                    <span>Pan-Zoom</span>
                                 </div>
                                 ${
                                   !isKs2
                                     ? `<div class="archival-media-provenance" style="margin-top: 10px; border-top: 1px solid rgba(255,255,255,0.14); padding-top: 8px; font-size: 0.74rem; line-height: 1.35; color: #94a3b8; text-align: left;">
                                   <strong style="color: #cbd5e1;">Accession:</strong> Edexcel GCSE Paper 3 Primary Visual Evidence
                                 </div>`
                                     : ''
                                 }
                               </div>
                               <div class="archival-source-details-col">
                                 ${displayCaption ? `<div style="font-size: 0.95rem; color: #475569; margin-bottom: 12px; font-style: italic;">${displayCaption}</div>` : ''}
                                 ${
                                   contextText
                                     ? `
                                   <div style="background: #f8fafc; border-left: 4px solid #64748b; padding: 12px 16px; border-radius: 0 4px 4px 0; margin-bottom: 12px; color: #334155; font-size: 0.98rem; line-height: 1.6;">
                                     <strong>${isKs2 ? 'What this tells us:' : 'Historical Context:'}</strong> ${typeof window !== 'undefined' && window.formatBold ? window.formatBold(contextText) : contextText}
                                   </div>
                                 `
                                     : ''
                                 }
                                 ${disc.promptHtml}
                               </div>
                             </div>
                             ${disc.panelHtml}
                             `;
                             })()}
                           </div>
                         </details>
                       </div>
                       `;
                     }

                     return `
                     <div style="display: flex; flex-wrap: wrap; gap: 20px; align-items: stretch; justify-content: center; margin: 20px 0; width: 100%; grid-column: 1 / -1;">
                       <div style="flex: 1 1 300px; text-align: center; display: flex; flex-direction: column; justify-content: center;">
                         <img src="${getAssetUrl(img.src || img.image)}" alt="${img.alt || img.image_alt || 'Narrative Image'}" style="width: 100%; max-height: 400px; object-fit: contain; background: #fff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #cbd5e1; cursor: zoom-in;" data-action="open-gallery" data-gallery="${galleryData}" data-index="${idx}">
                         ${img.caption || img.image_caption || img.alt || img.image_alt ? `<div class="narrative-plate-caption" style="font-size: 0.82rem; color: #64748b; margin-top: 8px; font-style: italic; line-height: 1.45;">${img.source_letter ? `<strong>Source ${img.source_letter}:</strong> ` : ''}${img.caption || img.image_caption || img.alt || img.image_alt}</div>` : ''}
                       </div>
                       <div style="flex: 1 1 300px; background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; box-shadow: 0 2px 4px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: center;">
                         <h4 style="margin-top: 0; margin-bottom: 12px; color: #b45309; display: flex; align-items: center; gap: 8px; font-size: 1.1rem;">
                           <i class="fa-solid fa-magnifying-glass-plus"></i> Historical Context
                         </h4>
                         <p style="margin: 0; font-size: 1rem; color: #334155; line-height: 1.6;">
                           ${img.image_context.replace(/\*\*Hinge Question:\*\*/g, '<br><br><strong style="color: #b45309;">Hinge Question:</strong>')}
                         </p>
                       </div>
                     </div>
                   `;
                   } else {
                     return `
                     <div class="narrative-image-container" style="text-align: center;">
                       <img src="${getAssetUrl(img.src || img.image)}" alt="${img.alt || img.image_alt || 'Narrative Image'}" style="width: 100%; max-height: 400px; object-fit: contain; background: #fff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #cbd5e1; cursor: zoom-in;" data-action="open-gallery" data-gallery="${galleryData}" data-index="${idx}">
                       ${img.caption || img.image_caption || img.alt || img.image_alt ? `<div class="narrative-plate-caption" style="font-size: 0.82rem; color: #64748b; margin-top: 8px; font-style: italic; line-height: 1.45;">${img.source_letter ? `<strong>Source ${img.source_letter}:</strong> ` : ''}${img.caption || img.image_caption || img.alt || img.image_alt}</div>` : ''}
                     </div>
                   `;
                   }
                 })
                 .join('')}
             </div>
           `;
      } else if (
        block.image &&
        !(window.currentUnitId === 'water_and_sanitation' && block.source_letter)
      ) {
        let containerStyle = block.image_context
          ? 'display: flex; flex-wrap: wrap; gap: 20px; align-items: stretch; justify-content: center; margin: 20px 0;'
          : 'text-align: center; margin: 20px 0;';
        let imgWrapperStyle = block.image_context
          ? 'flex: 1 1 300px; text-align: center; display: flex; flex-direction: column; justify-content: center;'
          : '';
        let contextHtml = block.image_context
          ? `
               <div style="flex: 1 1 300px; background: #f8fafc; padding: 18px 20px; border-radius: 8px; border-left: 4px solid #f59e0b; box-shadow: 0 2px 4px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: center;">
                 <p style="margin: 0; color: #334155; line-height: 1.65; font-size: 0.98rem;">${block.image_context.replace(/\*\*(?:Hinge Question|Question):\*\*/gi, '<br><br><strong style="color: #b45309;"><i class="fa-solid fa-circle-question" style="margin-right: 5px;"></i>Question:</strong> ')}</p>
               </div>
               `
          : '';

        imageHtml = `
             <div class="narrative-image-container" style="${containerStyle}">
               <div style="${imgWrapperStyle}">
                 <img src="${getAssetUrl(block.image)}" alt="${block.image_alt || 'Narrative Image'}" style="max-width: 100%; max-height: 240px; object-fit: contain; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #cbd5e1; cursor: zoom-in; display: block; margin: 0 auto;" data-action="open-modal" data-src="${getAssetUrl(block.image)}">
                 ${block.caption || block.image_caption || block.image_alt ? `<div class="narrative-plate-caption" style="font-size: 0.82rem; color: #64748b; margin-top: 8px; font-style: italic; line-height: 1.45;">${block.source_letter ? `<strong>Source ${block.source_letter}:</strong> ` : ''}${block.caption || block.image_caption || block.image_alt}</div>` : ''}
                  ${
                    window.currentUnitId === 'cme_new' ||
                    window.currentUnitId === 'gcse_middle_east_1945_1995'
                      ? `
                    <div style="margin-top: 6px; text-align: center;">
                      <button class="cme-timeline-jump-badge" onclick="if(typeof window.switchView==='function'){window.switchView('timeline', 'cme_new');}else if(typeof window.navigateTo==='function'){window.navigateTo('timeline');}" style="background: rgba(30, 58, 138, 0.08); border: 1px solid rgba(30, 58, 138, 0.25); color: #1e3a8a; font-size: 0.75rem; font-weight: 700; padding: 3px 10px; border-radius: 20px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s ease;" title="Jump to interactive chronological Living Timeline">
                        <i class="fa-solid fa-clock-rotate-left"></i> Living Timeline Milestone &bull; View Chronology &rarr;
                      </button>
                    </div>
                    `
                      : ''
                  }
               </div>
               ${contextHtml}
             </div>
           `;
      }

      const renderSingleArchivalSource = (rawSource) => {
        if (!rawSource) return '';
        const rawImgSrc =
          (typeof rawSource.src === 'string' &&
          rawSource.src.trim() &&
          rawSource.src !== 'undefined'
            ? rawSource.src.trim()
            : '') ||
          (typeof rawSource.image === 'string' &&
          rawSource.image.trim() &&
          rawSource.image !== 'undefined'
            ? rawSource.image.trim()
            : '') ||
          (typeof rawSource.source === 'string' &&
          rawSource.source.trim() &&
          rawSource.source !== 'undefined'
            ? rawSource.source.trim()
            : '') ||
          '';

        const sourceText = (rawSource.content || rawSource.text || '').trim();
        const hasImage = Boolean(rawImgSrc);

        const isWrittenSource =
          rawSource.type === 'written' || (!hasImage && Boolean(sourceText)) || !hasImage;

        const bLetterMatch = (rawSource.title || '').match(/Source\s+([A-Z0-9]+)/i);
        const bLetter = bLetterMatch ? bLetterMatch[1].toUpperCase() : rawSource.letter || '';
        const isInteractiveSourceUnit =
          window.currentUnitId === 'cme_new' ||
          window.currentUnitId === 'edexcel_medicine' ||
          unitId === 'edexcel_medicine' ||
          window.currentUnitId === 'eee' ||
          unitId === 'eee' ||
          window.currentUnitId === 'weimar_nazi_germany' ||
          unitId === 'weimar_nazi_germany';
        const bCardIdAttr =
          bLetter && isInteractiveSourceUnit
            ? `id="source-card-${bLetter}" data-source-letter="${bLetter}"`
            : '';
        const bQClassAttr =
          bLetter && isInteractiveSourceUnit ? 'source-inquiry-box source-inquiry-interactive' : '';
        const bQDataAttr =
          bLetter && isInteractiveSourceUnit
            ? `data-target-source="${bLetter}" title="Hover or click to highlight Source ${bLetter}"`
            : '';

        const sourceTitle =
          rawSource.title ||
          rawSource.caption ||
          (bLetter ? `Source ${bLetter}: Archival Record` : '');
        const sourceAudioBtnHtml =
          isWrittenSource && sourceText
            ? renderAudioPlaybackBar('Read Aloud Primary Source Excerpt', 'source-audio-bar')
            : '';

        const sourceHeaderHtml = sourceTitle
          ? `
            <div class="archival-source-header" style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 8px; margin-bottom: 12px; border-bottom: 1px solid #e2e8f0;">
              <h4 class="archival-source-title" style="margin: 0; font-family: 'Playfair Display', Georgia, serif; font-size: 1.12rem; font-weight: 700; color: #0f172a;">${sourceTitle}</h4>
              ${sourceAudioBtnHtml}
            </div>
          `
          : isWrittenSource && sourceAudioBtnHtml
            ? `
            <div class="archival-source-header" style="display: flex; justify-content: flex-end;">
              ${sourceAudioBtnHtml}
            </div>
          `
            : '';

        let rawContextVal = rawSource.source_context || rawSource.context || '';
        let cleanContextVal = rawContextVal;
        if (cleanContextVal.includes('Hinge Question:')) {
          const parts = cleanContextVal.split(/\*{0,2}Hinge Question:\*{0,2}/i);
          cleanContextVal = parts[0].trim();
          if (
            !rawSource.hinge_question &&
            !rawSource.question &&
            !rawSource.source_question &&
            parts[1]
          ) {
            rawSource.hinge_question = parts[1].trim();
          }
        }

        const hasUtilityCard = !!(rawSource.utility_enquiry || rawSource.utilityEnquiry);

        const orientingIntro = rawSource.intro || rawSource.caption || (cleanContextVal ? cleanContextVal.split('.')[0] + '.' : '');

        let sourceBodyHtml = '';
        if (isWrittenSource) {
          sourceBodyHtml = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; gap: 12px; flex-wrap: wrap;">
              ${orientingIntro ? `<div style="font-size: 0.95rem; color: #475569; font-style: italic; line-height: 1.5; flex: 1 1 300px;">${orientingIntro}</div>` : '<div style="flex: 1;"></div>'}
              ${sourceAudioBtnHtml ? `<div style="flex-shrink: 0;">${sourceAudioBtnHtml}</div>` : ''}
            </div>
            ${
              sourceText
                ? `<div class="archival-source-body" style="width: 100%; max-height: 350px; overflow-y: auto; font-family: 'Georgia', serif; font-style: italic; font-size: 1.05rem; line-height: 1.75; color: #1e293b; background: #fffdfa; padding: 14px 18px; border-left: 4px solid #1e3a8a; border-radius: 4px; margin-bottom: 8px;">
                    ${sourceText}
                  </div>`
                : ''
            }
            ${
              !isKs2 && (rawSource.citation || rawSource.provenance)
                ? `<div class="archival-citation-footer" style="font-size: 0.78rem; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 6px; margin-top: 6px; margin-bottom: 6px; display: block !important; text-align: left !important; line-height: 1.45;">
                    <strong>Provenance:</strong> ${rawSource.citation || rawSource.provenance}
                  </div>`
                : ''
            }
            ${
              !hasUtilityCard && cleanContextVal
                ? `
              <div style="background: #f8fafc; border-left: 4px solid #64748b; padding: 12px 16px; border-radius: 0 4px 4px 0; margin-top: 12px; color: #334155; font-size: 0.95rem; line-height: 1.5;">
                <strong>${isKs2 ? 'What this tells us:' : 'Historical Context:'}</strong> ${typeof window !== 'undefined' && window.formatBold ? window.formatBold(cleanContextVal) : cleanContextVal}
              </div>
            `
                : ''
            }
            ${!hasUtilityCard ? renderArchivalSourceDiscussionBox(rawSource.hinge_question || rawSource.question || rawSource.source_question, rawSource, isKs2, '12px') : ''}
          `;
        } else {
          const rawSourceImgUrl = getAssetUrl(rawImgSrc);
          const isExamSrcArtwork = isPaintingSource(rawSource, sourceTitle);
          const examSpotlightBtn = isExamSrcArtwork
            ? `
                <button class="btn-source-spotlight-launch btn-art-spotlight-launch" data-action="open-masterpiece" data-src="${rawSourceImgUrl}" data-title="${sourceTitle || 'Historical Artwork'}" data-caption="${rawSource.caption || ''}" title="Launch Art Spotlight">
                  <i class="fa-solid fa-palette" style="color: #fbbf24;"></i>
                  <span>Art Spotlight</span>
                </button>
            `
            : '';

          const primaryProvenanceHtml =
            !isKs2 && (rawSource.citation || rawSource.provenance)
              ? `<div class="archival-media-provenance" style="margin-top: 10px; border-top: 1px solid rgba(255,255,255,0.14); padding-top: 8px; font-size: 0.74rem; line-height: 1.35; color: #94a3b8; text-align: left;">
                  <strong style="color: #cbd5e1;">Provenance:</strong> ${rawSource.citation || rawSource.provenance}
                </div>`
              : '';

          let mediaColHtml = '';
          if (Array.isArray(rawSource.plates) && rawSource.plates.length > 0) {
            mediaColHtml = `
              <div class="archival-source-media-col dual-plates-col${isKs2 ? ' ks2-source-media-col' : ''}" style="flex: 0 0 380px; max-width: 440px; display: flex; flex-direction: column; gap: 14px;">
                ${rawSource.plates
                  .map((plate, pIdx) => {
                    const plateImgUrl = getAssetUrl(plate.image || plate.src);
                    return `
                    <div class="archival-plate-card" style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
                      <div style="font-size: 0.65rem; font-weight: 800; color: #1e40af; letter-spacing: 0.5px; margin-bottom: 6px; text-transform: uppercase;">
                        ${plate.label || `PLATE ${pIdx + 1}`}
                      </div>
                      <div style="position: relative; width: 100%; display: flex; justify-content: center; background: #f8fafc; border-radius: 4px; overflow: hidden;">
                        <img src="${plateImgUrl}" alt="${plate.title || `Plate ${pIdx + 1}`}" data-action="open-modal" data-src="${plateImgUrl}" style="cursor: zoom-in; width: auto; max-width: 100%; max-height: 200px; object-fit: contain; display: block; border-radius: 4px;">
                        <div class="archival-source-inspect-badge">
                          <i class="fa-solid fa-magnifying-glass-plus" style="font-size: 0.65rem; color: #93c5fd;"></i>
                          <span>Pan-Zoom</span>
                        </div>
                      </div>
                      ${plate.caption ? `<div style="font-size: 0.78rem; color: #475569; margin-top: 6px; line-height: 1.35; font-style: italic;">${plate.caption}</div>` : ''}
                    </div>
                  `;
                  })
                  .join('')}
                ${primaryProvenanceHtml}
              </div>
            `;
          } else {
            mediaColHtml = `
              <div class="archival-source-media-col${isKs2 ? ' ks2-source-media-col' : ''}">
                <div style="position: relative; width: 100%; display: flex; justify-content: center;">
                  <img src="${rawSourceImgUrl}" alt="${sourceTitle || 'Source'}" data-action="open-modal" data-src="${rawSourceImgUrl}" ${rawSource.default_zoom || rawSource.defaultZoom || (rawSourceImgUrl && rawSourceImgUrl.includes('vesalius_fabrica_frontispiece')) ? `data-default-zoom="${rawSource.default_zoom || rawSource.defaultZoom || '2x'}"` : ''} style="cursor: zoom-in; width: auto; max-width: 100%; max-height: ${isKs2 ? '380px' : '280px'}; object-fit: contain; display: block; border-radius: 6px;">
                  <div class="archival-source-inspect-badge">
                    <i class="fa-solid fa-magnifying-glass-plus" style="font-size: 0.65rem; color: #93c5fd;"></i>
                    <span>Pan-Zoom</span>
                  </div>
                </div>
                ${examSpotlightBtn}
                ${primaryProvenanceHtml}
                ${
                  window.currentUnitId === 'cme_new' ||
                  window.currentUnitId === 'gcse_middle_east_1945_1995'
                    ? `
                  <div style="margin-top: 6px; text-align: center;">
                    <button class="cme-timeline-jump-badge" onclick="if(typeof window.switchView==='function'){window.switchView('timeline', 'cme_new');}else if(typeof window.navigateTo==='function'){window.navigateTo('timeline');}" style="background: rgba(30, 58, 138, 0.08); border: 1px solid rgba(30, 58, 138, 0.25); color: #1e3a8a; font-size: 0.72rem; font-weight: 700; padding: 3px 9px; border-radius: 20px; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; transition: all 0.2s ease;" title="Jump to interactive chronological Living Timeline">
                      <i class="fa-solid fa-clock-rotate-left"></i> Living Timeline Milestone &bull; View Chronology &rarr;
                    </button>
                  </div>
                  `
                    : ''
                }
              </div>
            `;
          }

          const primaryDisc = getArchivalSourceDiscussionComponents(
            rawSource.hinge_question || rawSource.question || rawSource.source_question,
            rawSource,
            isKs2,
            '10px',
          );

          sourceBodyHtml = `
            <div class="archival-source-split-layout">
              ${mediaColHtml}
              <div class="archival-source-details-col">
                <div>
                  ${
                    rawSource.caption
                      ? `<div style="font-size: 0.95rem; color: #475569; margin-bottom: 12px; font-style: italic;">${rawSource.caption}</div>`
                      : ''
                  }
                  ${
                    sourceText
                      ? `<div class="archival-source-body" style="width: 100%; max-height: 250px; overflow-y: auto; font-family: 'Georgia', serif; font-style: italic; font-size: 0.95rem; line-height: 1.6; color: #1e293b; background: #fffdfa; padding: 10px 14px; border-left: 3px solid #1e3a8a; border-radius: 4px; margin-bottom: 12px;">
                          ${sourceText}
                        </div>`
                      : ''
                  }
                  ${
                    !hasUtilityCard && cleanContextVal
                      ? `
                    <div style="background: #f8fafc; border-left: 4px solid #64748b; padding: 12px 16px; border-radius: 0 4px 4px 0; margin-bottom: 12px; color: #334155; font-size: 0.98rem; line-height: 1.6;">
                      <strong>${isKs2 ? 'What this tells us:' : 'Historical Context:'}</strong> ${typeof window !== 'undefined' && window.formatBold ? window.formatBold(cleanContextVal) : cleanContextVal}
                    </div>
                  `
                      : ''
                  }
                  ${
                    rawSource.provenance_clue
                      ? `
                    <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 12px 15px; margin-bottom: 12px;">
                      <strong style="color: #166534; display: block; margin-bottom: 4px;"><span class="archival-meta-tag accent-emerald" style="margin-right: 6px;">PROVENANCE CLUE</span></strong>
                      <span style="color: #15803d; font-size: 0.92rem;">${typeof window !== 'undefined' && window.formatBold ? window.formatBold(rawSource.provenance_clue) : rawSource.provenance_clue}</span>
                    </div>
                  `
                      : ''
                  }
                  ${!hasUtilityCard ? primaryDisc.promptHtml : ''}
                </div>
              </div>
            </div>
            ${!hasUtilityCard ? primaryDisc.panelHtml : ''}
          `;
        }

        const isAccordionUnit =
          isKs2 ||
          window.currentUnitId === 'ks2_ww2' ||
          unitId === 'ks2_ww2' ||
          window.currentUnitId === 'cme_new' ||
          unitId === 'cme_new' ||
          window.currentUnitId === 'edexcel_medicine' ||
          unitId === 'edexcel_medicine' ||
          window.currentUnitId === 'eee' ||
          unitId === 'eee' ||
          window.currentUnitId === 'weimar_nazi_germany' ||
          unitId === 'weimar_nazi_germany' ||
          window.currentUnitId === 'monarchy_religion_power' ||
          unitId === 'monarchy_religion_power' ||
          window.currentUnitId === 'first_british_empire' ||
          unitId === 'first_british_empire' ||
          window.currentUnitId === 'medieval_england' ||
          unitId === 'medieval_england' ||
          window.currentUnitId === 'industrialisation_and_empire' ||
          unitId === 'industrialisation_and_empire' ||
          window.currentUnitId === 'great_war' ||
          unitId === 'great_war' ||
          window.currentUnitId === 'great_war_part2' ||
          unitId === 'great_war_part2' ||
          window.currentUnitId === 'early_modern_world' ||
          unitId === 'early_modern_world' ||
          window.currentUnitId === 'water_and_sanitation' ||
          unitId === 'water_and_sanitation' ||
          window.currentUnitId === 'cold_war' ||
          unitId === 'cold_war' ||
          window.currentUnitId === 'the_shoah' ||
          unitId === 'the_shoah' ||
          window.currentUnitId === 'post_war_britain' ||
          unitId === 'post_war_britain' ||
          window.currentUnitId === 'australia' ||
          unitId === 'australia' ||
          window.currentUnitId === 'usa' ||
          unitId === 'usa';

        if (isAccordionUnit) {
          const sLetterMatch = (rawSource.title || '').match(/Source\s+([A-Z0-9]+)/i);
          const sLetter = sLetterMatch ? sLetterMatch[1].toUpperCase() : '';
          const displayTitle = rawSource.title
            ? rawSource.title.replace(/^Source\s+[A-Z0-9]+[:\s-]*/i, '').trim()
            : rawSource.caption || 'Archival Primary Record';

          return `
            <details class="cme-source-drawer medicine-source-drawer eee-source-drawer weimar-source-drawer archival-drawer gcse-source-container archival-source-box" ${bCardIdAttr} style="margin: 6px 0; border: 1px solid #cbd5e1; border-radius: 6px; background: #f8fafc; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.02); transition: all 0.25s ease;">
              <summary style="padding: 7px 12px; min-height: 40px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: space-between; background: #f1f5f9; color: #0f172a; list-style: none; user-select: none; transition: background 0.15s ease;">
                <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                  <span class="archival-meta-tag" style="background: #1e40af; color: #ffffff; padding: 2px 6px; border-radius: 3px; font-size: 0.62rem; font-weight: 800; letter-spacing: 0.4px; line-height: 1.2;">${sLetter ? `SOURCE ${sLetter}` : 'ARCHIVAL EVIDENCE'}</span>
                  <span class="archival-drawer-title" style="font-family: 'Playfair Display', Georgia, serif; font-size: 0.84rem; color: #1e293b; font-weight: 700; line-height: 1.2;">${displayTitle}</span>
                </div>
                <span class="drawer-toggle-indicator" style="font-size: 0.68rem; color: #64748b; display: inline-flex; align-items: center; gap: 4px; font-weight: 600; flex-shrink: 0;">
                  Archival Evidence &bull; <span class="drawer-state-expand">Expand</span><span class="drawer-state-collapse" style="display: none;">Collapse</span> <span class="drawer-caret">&#9660;</span>
                </span>
              </summary>
              <div class="cme-source-content" style="padding: 18px; background: #ffffff; border-top: 1px solid #e2e8f0;">
                ${sourceBodyHtml}
                ${(() => {
                  const utilityObj = rawSource.utility_enquiry || rawSource.utilityEnquiry;
                  if (utilityObj) {
                    const uPrompt =
                      utilityObj.question || utilityObj.prompt || utilityObj.enquiry || rawSource.question || '';

                    // Check if explicit exam rubric is requested (e.g. designated mock exam units)
                    const isExamRubric = utilityObj.is_exam_rubric === true;

                    if (isExamRubric) {
                      const uInferences =
                        utilityObj.content_inferences || utilityObj.inferences || utilityObj.content || '';
                      const uProv = utilityObj.provenance_evaluation || utilityObj.provenance || '';
                      const uContext =
                        utilityObj.context_limitations || utilityObj.limitations || utilityObj.context || '';

                      const isMedicineWesternFront =
                        (unitId === 'edexcel_medicine' || window.currentUnitId === 'edexcel_medicine') &&
                        (lesson.historic_environment || (lesson.title && lesson.title.includes('KT5')));
                      const examBadgeTitle =
                        utilityObj.exam_label ||
                        (isMedicineWesternFront
                          ? 'Edexcel Paper 1 &bull; Q2(a) Source Utility Enquiry [8 Marks]'
                          : unitId === 'weimar_nazi_germany' || window.currentUnitId === 'weimar_nazi_germany'
                            ? 'Edexcel Paper 3 &bull; Q3(a) Source Utility Enquiry [8 Marks]'
                            : 'GCSE Source Utility Enquiry [8 Marks]');

                      return `
                        <details class="source-enquiry-reveal edexcel-paper3-utility-card">
                          <summary style="padding: 12px 16px; cursor: pointer; display: flex; align-items: flex-start; justify-content: space-between; list-style: none; user-select: none; background: #f0fdf4; gap: 14px; transition: background 0.15s ease;">
                            <div style="display: flex; align-items: baseline; gap: 10px; flex: 1 1 auto; min-width: 0; flex-wrap: wrap;">
                              <span style="font-size: 0.70rem; font-weight: 800; text-transform: uppercase; color: #166534; background: #dcfce7; border: 1px solid #bbf7d0; padding: 3px 8px; border-radius: 12px; letter-spacing: 0.5px; flex-shrink: 0; margin-top: 2px;">${examBadgeTitle}</span>
                              <span class="source-enquiry-prompt" style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.02rem; color: #14532d; font-weight: 700; line-height: 1.45; word-break: break-word; white-space: normal; overflow: visible; display: inline-block; flex: 1 1 auto;">${typeof window !== 'undefined' && window.formatBold ? window.formatBold(uPrompt) : uPrompt}</span>
                            </div>
                            <span class="reveal-answer-pill" style="flex-shrink: 0; align-self: flex-start; margin-top: 2px;">
                              <i class="fa-solid fa-lightbulb" style="color: #16a34a;"></i>
                              <span class="reveal-text-closed">Reveal Exam Guidance</span>
                              <span class="reveal-text-open">Hide Exam Guidance</span>
                              <span class="reveal-arrow">&#9660;</span>
                            </span>
                          </summary>
                          <div class="source-enquiry-answer-body" style="padding: 16px 20px 14px 20px; background: #ffffff; border-top: 1.5px solid #86efac;">
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; margin-top: 4px;">
                              ${uInferences ? `<div style="background: #f8fafc; border: 1px solid #bbf7d0; border-radius: 5px; padding: 10px 12px;"><div style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: #166534; margin-bottom: 5px;"><i class="fa-solid fa-magnifying-glass" style="color: #16a34a;"></i> 1. Content &amp; Inferences</div><div style="font-size: 0.86rem; color: #1e293b; line-height: 1.5;">${typeof window !== 'undefined' && window.formatBold ? window.formatBold(uInferences) : uInferences}</div></div>` : ''}
                              ${uProv ? `<div style="background: #f8fafc; border: 1px solid #bbf7d0; border-radius: 5px; padding: 10px 12px;"><div style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: #166534; margin-bottom: 5px;"><i class="fa-solid fa-stamp" style="color: #16a34a;"></i> 2. Provenance (NOP)</div><div style="font-size: 0.86rem; color: #1e293b; line-height: 1.5;">${typeof window !== 'undefined' && window.formatBold ? window.formatBold(uProv) : uProv}</div></div>` : ''}
                              ${uContext ? `<div style="background: #f8fafc; border: 1px solid #bbf7d0; border-radius: 5px; padding: 10px 12px;"><div style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: #166534; margin-bottom: 5px;"><i class="fa-solid fa-book-bookmark" style="color: #16a34a;"></i> 3. Context &amp; Limitations</div><div style="font-size: 0.86rem; color: #1e293b; line-height: 1.5;">${typeof window !== 'undefined' && window.formatBold ? window.formatBold(uContext) : uContext}</div></div>` : ''}
                            </div>
                          </div>
                        </details>
                      `;
                    }


                    // DEFAULT CHILD-FRIENDLY MODEL: 2 to 3 direct bullet points
                    let points = utilityObj.bullet_points || utilityObj.key_points || utilityObj.model_answers || utilityObj.answers;
                    if (!points || !Array.isArray(points) || points.length === 0) {
                      const uInferences = utilityObj.content_inferences || utilityObj.inferences || utilityObj.content || '';
                      const uProv = utilityObj.provenance_evaluation || utilityObj.provenance || '';
                      const uContext = utilityObj.context_limitations || utilityObj.limitations || utilityObj.context || '';
                      points = [];
                      if (uInferences) points.push({ label: 'What the Source Shows', text: uInferences });
                      if (uProv) points.push({ label: 'Historical Meaning', text: uProv });
                      if (uContext && !uContext.toLowerCase().includes('does not show')) points.push({ label: 'Deeper Context', text: uContext });
                    }


                    const renderedBullets = points.map(pt => {
                      let lbl = '';
                      let txt = '';
                      if (typeof pt === 'string') {
                        txt = pt;
                      } else if (pt && typeof pt === 'object') {
                        if (pt.label) {
                          const cleanLabel = (pt.label || '').toLowerCase();
                          if (!['what the source shows', 'historical context', 'key takeaway', 'takeaway', 'point 1', 'point 2', 'point 3'].includes(cleanLabel)) {
                            lbl = `<strong style="color: #166534;">${pt.label}:</strong> `;
                          }
                        }
                        txt = pt.text || pt.content || pt.answer || '';
                      }
                      const formattedTxt = typeof window !== 'undefined' && window.formatBold ? window.formatBold(txt) : txt;
                      return `<li style="margin-bottom: 8px; line-height: 1.55; color: #1e293b; font-size: 0.88rem;">${lbl}${formattedTxt}</li>`;
                    }).join('');

                    return `
                      <details class="source-enquiry-reveal">
                        <summary style="padding: 12px 16px; cursor: pointer; display: flex; align-items: flex-start; justify-content: space-between; list-style: none; user-select: none; background: #f0fdf4; gap: 14px; transition: background 0.15s ease;">
                          <div style="display: flex; align-items: baseline; gap: 10px; flex: 1 1 auto; min-width: 0; flex-wrap: wrap;">
                            <span style="font-size: 0.70rem; font-weight: 800; text-transform: uppercase; color: #166534; background: #dcfce7; border: 1px solid #bbf7d0; padding: 3px 8px; border-radius: 12px; letter-spacing: 0.5px; flex-shrink: 0; margin-top: 2px;">Enquiry Question</span>
                            <span class="source-enquiry-prompt" style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.02rem; color: #14532d; font-weight: 700; line-height: 1.45; word-break: break-word; white-space: normal; overflow: visible; display: inline-block; flex: 1 1 auto;">${typeof window !== 'undefined' && window.formatBold ? window.formatBold(uPrompt) : uPrompt}</span>
                          </div>
                          <span class="reveal-answer-pill" style="flex-shrink: 0; align-self: flex-start; margin-top: 2px;">
                            <i class="fa-solid fa-lightbulb" style="color: #16a34a;"></i>
                            <span class="reveal-text-closed">Reveal Model Answer</span>
                            <span class="reveal-text-open">Hide Model Answer</span>
                            <span class="reveal-arrow">&#9660;</span>
                          </span>
                        </summary>
                        <div class="source-enquiry-answer-body" style="padding: 16px 20px 14px 20px; background: #ffffff; border-top: 1.5px solid #86efac;">
                          <div style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: #166534; letter-spacing: 0.5px; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
                            <i class="fa-solid fa-circle-check" style="color: #16a34a;"></i> Key Takeaways &bull; Suggested Answers
                          </div>
                          <ul style="margin: 0; padding-left: 18px;">
                            ${renderedBullets}
                          </ul>
                        </div>
                      </details>
                    `;
                  } else if (rawSource.how_useful_question) {
                    return `
                      <details class="source-enquiry-reveal">
                        <summary style="padding: 12px 16px; cursor: pointer; display: flex; align-items: flex-start; justify-content: space-between; list-style: none; user-select: none; background: #f0fdf4; gap: 14px; transition: background 0.15s ease;">
                          <div style="display: flex; align-items: baseline; gap: 10px; flex: 1 1 auto; min-width: 0; flex-wrap: wrap;">
                            <span style="font-size: 0.70rem; font-weight: 800; text-transform: uppercase; color: #166534; background: #dcfce7; border: 1px solid #bbf7d0; padding: 3px 8px; border-radius: 12px; letter-spacing: 0.5px; flex-shrink: 0; margin-top: 2px;">Enquiry Question</span>
                            <span class="source-enquiry-prompt" style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.02rem; color: #14532d; font-weight: 700; line-height: 1.45; word-break: break-word; white-space: normal; overflow: visible; display: inline-block; flex: 1 1 auto;">${typeof window !== 'undefined' && window.formatBold ? window.formatBold(rawSource.how_useful_question) : rawSource.how_useful_question}</span>
                          </div>
                          <span class="reveal-answer-pill" style="flex-shrink: 0; align-self: flex-start; margin-top: 2px;">
                            <i class="fa-solid fa-lightbulb" style="color: #16a34a;"></i>
                            <span class="reveal-text-closed">Reveal Guidance</span>
                            <span class="reveal-text-open">Hide Guidance</span>
                            <span class="reveal-arrow">&#9660;</span>
                          </span>
                        </summary>
                        ${
                          rawSource.provenance_clues
                            ? `
                          <div class="source-enquiry-answer-body" style="padding: 16px 20px 14px 20px; background: #ffffff; border-top: 1.5px solid #86efac;">
                            <strong style="color: #14532d; display: block; margin-bottom: 6px; font-size: 0.85rem;">Provenance Scaffolding (Author &bull; Audience &bull; Motive):</strong>
                            <ul style="margin: 0; padding-left: 18px; font-size: 0.88rem; color: #166534; line-height: 1.55;">
                              ${(Array.isArray(rawSource.provenance_clues) ? rawSource.provenance_clues : [rawSource.provenance_clues]).map((c) => `<li>${c}</li>`).join('')}
                            </ul>
                          </div>
                        `
                            : ''
                        }
                      </details>
                    `;
                  }
                  return '';
                })()}
              </div>
            </details>
          `;
        } else {
          return `
            <div class="gcse-source-container archival-source-box" ${bCardIdAttr} style="text-align: left; transition: all 0.3s ease; margin: 20px 0;">
              ${sourceHeaderHtml}
              ${sourceBodyHtml}
            </div>
          `;
        }
      };

      const rawSourcesList = [];
      if (Array.isArray(block.sources)) {
        rawSourcesList.push(...block.sources);
      } else if (Array.isArray(block.source)) {
        rawSourcesList.push(...block.source);
      } else if (block.source) {
        rawSourcesList.push(block.source);
      } else if (block.archival_source) {
        rawSourcesList.push({
          type: 'written',
          title: block.archival_source.title,
          shelfmark: block.archival_source.shelfmark,
          content: block.archival_source.text || block.archival_source.content || '',
          citation: block.archival_source.citation || '',
          source_context:
            block.archival_source.source_context || block.archival_source.context || '',
          question: block.archival_source.question || '',
          qNum: block.archival_source.qNum || '',
        });
      } else if (
        window.currentUnitId === 'water_and_sanitation' &&
        block.source_letter &&
        block.image
      ) {
        rawSourcesList.push({
          type: 'visual',
          src: block.image,
          source: block.image,
          title: `Source ${block.source_letter}: ${block.image_alt || block.theme_heading || 'Primary Historical Evidence'}`,
          shelfmark: block.shelfmark || `SOURCE ${block.source_letter}`,
          caption: block.caption || block.image_caption || '',
          citation: block.citation || 'Archaeological / Primary Archive Evidence',
          source_context: block.image_context || '',
          question: block.source_question || '',
        });
      }

      let blockSourceHtml = rawSourcesList.map((s) => renderSingleArchivalSource(s)).join('');

      const showParaNumber = Boolean(
        block.text &&
        block.text.trim() &&
        !(typeof block.text === 'string' && block.text.includes('side-quest-box')) &&
        !(block.title && block.title.toLowerCase().includes('lesson reflection')),
      );

      const isSourceAfter =
        window.currentUnitId === 'monarchy_religion_power' ||
        unitId === 'monarchy_religion_power' ||
        window.currentUnitId === 'first_british_empire' ||
        unitId === 'first_british_empire';

      const hasPureVisual = Boolean(block.image && !block.image_context);
      const isReversed = index % 2 === 1;

      const narrativeChunkHtml = `
              <div id="para-${index + 1}" class="narrative-chunk" style="display: flex; flex-direction: column; margin-bottom: ${hasPureVisual ? '0' : '15px'}; padding: 16px 18px; background: ${bg}; border-radius: 6px; border-left: 4px solid #3b82f6; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.05); flex: 1 1 58%; min-width: 0;">
                <div class="narrative-chunk-header" style="display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: ${themeHeadingHtml || showParaNumber ? '10px' : '4px'}; flex-wrap: wrap;">
                  <div class="narrative-chunk-meta" style="display: inline-flex; align-items: center; gap: 10px; flex-wrap: wrap; min-width: 0;">
                    ${showParaNumber ? '<div class="para-number" style="margin-right: 0;">' + (index + 1) + '</div>' : ''}
                    ${themeHeadingHtml}
                  </div>
                  <div class="narrative-chunk-audio" style="margin-left: auto; flex-shrink: 0;">
                    ${renderAudioPlaybackBar('Read Aloud Paragraph')}
                  </div>
                </div>
                <div class="narrative-text" style="width: 100%; line-height: 1.65; color: #1e293b; font-size: 1.05rem;">${styledContent}</div>
              </div>
      `;

      let topNarrativeHtml = '';
      if (hasPureVisual) {
        const visualPlateHtml = `
          <div class="narrative-visual-plate" style="flex: 0 0 360px; max-width: 400px; display: flex; flex-direction: column; justify-content: center; align-items: center; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.04); text-align: center;">
            <img src="${getAssetUrl(block.image)}" alt="${block.image_alt || 'Archival Plate'}" style="max-width: 100%; max-height: 310px; object-fit: contain; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.12); border: 1px solid #cbd5e1; cursor: zoom-in; display: block; margin: 0 auto;" data-action="open-modal" data-src="${getAssetUrl(block.image)}">
            ${block.caption || block.image_caption || block.image_alt ? `<div class="narrative-plate-caption" style="font-size: 0.82rem; color: #64748b; margin-top: 10px; font-style: italic; line-height: 1.45; user-select: none;">${block.caption || block.image_caption || block.image_alt}</div>` : ''}
          </div>
        `;
        topNarrativeHtml = `
          <div class="narrative-visual-row ${isReversed ? 'row-reversed' : ''}" style="display: flex; gap: 20px; align-items: stretch; margin-bottom: 16px; ${isReversed ? 'flex-direction: row-reverse;' : ''}">
            ${narrativeChunkHtml}
            ${visualPlateHtml}
          </div>
        `;
      } else {
        topNarrativeHtml = `
          ${narrativeChunkHtml}
          ${imageHtml}
        `;
      }

      htmlNarrative += `
            <div class="standard-narrative-container" style="margin-bottom: 24px;">
              ${topNarrativeHtml}
              ${blockSourceHtml}
            </div>
          `;

      let extrasHtml = '';
      if (block.level_4) {
        extrasHtml += `
            <div class="level4-narrative-container" style="display: none;">
              <div id="para-l4-${index + 1}" class="narrative-chunk" style="display: flex; flex-direction: column; margin-bottom: 15px; padding: 16px 18px; background: ${bg}; border-radius: 6px; border-left: 4px solid #10b981; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <div class="narrative-chunk-header" style="display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 10px; flex-wrap: wrap;">
                  <div class="narrative-chunk-meta" style="display: inline-flex; align-items: center; gap: 10px; flex-wrap: wrap; min-width: 0;">
                    <div class="para-number" style="background:#ecfdf5; color:#047857; margin-right: 0;">${index + 1}</div>
                    ${themeHeadingHtml}
                  </div>
                  <div class="narrative-chunk-audio" style="margin-left: auto; flex-shrink: 0;">
                    ${renderAudioPlaybackBar('Read Aloud Paragraph (Level 4)')}
                  </div>
                </div>
                <div class="narrative-text" style="width: 100%; line-height: 1.65; font-size: 1.15rem; color:#1e293b;">${l4StyledContent}</div>
              </div>
            </div>
          `;
      }

      if (block.hinge_question) {
        const hingeId = `hinge-${index}`;
        const hingeQuestionText = block.hinge_question.text || block.hinge_question.question;
        const correctIndex =
          block.hinge_question.correct_index !== undefined
            ? block.hinge_question.correct_index
            : block.hinge_question.answer;
        extrasHtml += `
            <div class="hinge-question-container no-print" style="margin-left: 40px; margin-bottom: 25px; margin-top: -5px;">
              <button class="btn btn-secondary" id="btn-${hingeId}" data-action="reveal-hinge" data-target="${hingeId}" style="background: #0ea5e9; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: background 0.2s;"><i class="fa-solid fa-person-circle-question" style="margin-right: 6px;"></i> Reveal Hinge Question</button>
              <div id="${hingeId}" style="display: none; background: #f0f9ff; border: 2px solid #38bdf8; padding: 15px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <div style="color: #0284c7; font-weight: bold; font-size: 0.9rem; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-circle-question"></i> Interactive Hinge Question</div>
                <div style="color: #0f172a; font-size: 1.1rem; font-weight: bold; margin-bottom: 15px;">"${hingeQuestionText}"</div>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${block.hinge_question.options
                    .map(
                      (opt, i) => `
                    <button data-action="hinge-mcq-select" data-correct="${correctIndex}" data-index="${i}" style="text-align: left; background: white; border: 1px solid #bae6fd; padding: 12px 15px; border-radius: 6px; cursor: pointer; transition: all 0.2s; font-size: 1rem; color: #334155;">
                      <strong>${String.fromCharCode(65 + i)}:</strong> ${opt}
                    </button>
                  `,
                    )
                    .join('')}
                </div>
                <div style="display: none; margin-top: 15px; padding: 12px; background: #dcfce7; border-left: 4px solid #22c55e; color: #166534; font-size: 1rem; border-radius: 0 6px 6px 0;">
                  <strong>Explanation:</strong> ${block.hinge_question.explanation}
                </div>
              </div>
            </div>
          `;
      }

      if (block.tasks && block.tasks.length > 0) {
        extrasHtml += `<div class="embedded-tasks-container" style="margin-left: 40px; margin-bottom: 25px; margin-top: -5px; padding: 15px; background: #fffbeb; border: 2px dashed #fcd34d; border-radius: 6px;">`;
        block.tasks.forEach((task, tIdx) => {
          if (task.type === 'source_utility' || task.taskType === 'source_utility') {
            extrasHtml += renderSourceUtilityTaskHTML(task, index, tIdx, unitId);
            return;
          }
          if (
            task.type === 'historical_interpretations' ||
            task.taskType === 'historical_interpretations'
          ) {
            extrasHtml += renderHistoricalInterpretationsTaskHTML(task, index, tIdx, unitId);
            return;
          }
          if (task.type === 'convict_game') {
            const gameId = `convict-game-emb-${index}-${tIdx}`;
            extrasHtml += `<div id="${gameId}" style="margin-bottom: 20px;"></div>`;
            window.postRenderHooks.push(() => {
              import('../convict_game.js').then((mod) => {
                mod.initConvictGame(document.getElementById(gameId), task);
              });
            });
            return;
          }
          if (task.type === 'physician_game') {
            const gameId = `physician-game-emb-${index}-${tIdx}`;
            extrasHtml += `<div id="${gameId}" style="margin-bottom: 20px;"></div>`;
            window.postRenderHooks.push(() => {
              import('../physician_game.js').then((mod) => {
                mod.initPhysicianGame(document.getElementById(gameId), task);
              });
            });
            return;
          }
          if (task.type === 'drag_drop_timeline') {
            const timelineId = `dd-timeline-emb-${index}-${tIdx}`;
            extrasHtml += `<div id="${timelineId}" style="margin-bottom: 20px;"></div>`;
            window.postRenderHooks.push(() => {
              import('../drag_drop_timeline.js').then((mod) => {
                mod.initDragDropTimeline(document.getElementById(timelineId), task);
              });
            });
            return;
          }
          if (task.type === 'interactive_map') {
            const mapId = `interactive-map-emb-${index}-${tIdx}`;
            extrasHtml += `<div id="${mapId}" style="margin-bottom: 20px;"></div>`;
            window.postRenderHooks.push(() => {
              import('../interactive_map.js').then((mod) => {
                mod.initInteractiveMap(document.getElementById(mapId), task);
              });
            });
            return;
          }
          if (task.type === 'spectrum_mapper') {
            const spectrumId = `spectrum-emb-${index}-${tIdx}`;
            extrasHtml += `<div id="${spectrumId}" style="margin-bottom: 20px;"></div>`;
            window.postRenderHooks.push(() => {
              import('../spectrum_mapper.js').then((mod) => {
                mod.initSpectrumMapper(document.getElementById(spectrumId), task);
              });
            });
            return;
          }
          if (task.type === 'multiple_choice') {
            const mcPrefix = task.qNum ? `Q${task.qNum}. ` : '';
            extrasHtml += `<div style="margin-bottom: 20px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                 <h4 style="margin-top:0; color:#0f172a;"><i class="fa-solid fa-list-check"></i> ${mcPrefix}${task.text || task.question || ''}</h4>
                 ${task.questions
                   .map(
                     (q, qIdx) => `
                   <div style="margin-top: 15px;">
                     <strong>${q.q}</strong>
                     <div style="margin-top: 8px; display: flex; flex-direction: column; gap: 6px;">
                       ${q.options
                         .map(
                           (opt, oIdx) => `
                         <label style="cursor:pointer; display:flex; align-items:center; gap:8px;">
                           <input type="radio" name="mc-${index}-${tIdx}-${qIdx}" value="${oIdx}">
                           <span>${opt}</span>
                         </label>
                       `,
                         )
                         .join('')}
                     </div>
                   </div>
                 `,
                   )
                   .join('')}
               </div>`;
            return;
          }
          if (task.type === 'sorting') {
            extrasHtml += `<div style="margin-bottom: 20px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                 <h4 style="margin-top:0; color:#0f172a;"><i class="fa-solid fa-arrow-down-1-9"></i> ${task.text || task.question || ''}</h4>
                 <div style="display:flex; flex-direction:column; gap:10px; margin-top:10px;">
                   ${task.events
                     .map(
                       (ev, eIdx) => `
                     <div style="display:flex; align-items:center; gap:10px;">
                       <input type="number" min="1" max="${task.events.length}" style="width:50px; padding:5px; border:1px solid #ccc; border-radius:4px;">
                       <span>${ev}</span>
                     </div>
                   `,
                     )
                     .join('')}
                 </div>
               </div>`;
            return;
          }
          if (task.type === 'cloze') {
            let renderedCloze = task.cloze_text.replace(
              /\[([^\]]+)\]/g,
              '<input type="text" placeholder="..." style="border:none; border-bottom:2px solid #3b82f6; background:transparent; width:100px; text-align:center; margin:0 5px;" />',
            );
            extrasHtml += `<div style="margin-bottom: 20px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                 <h4 style="margin-top:0; color:#0f172a;"><i class="fa-solid fa-pen-clip"></i> ${task.text || task.question || ''}</h4>
                 <div style="margin-bottom: 15px; padding:10px; background:#e0f2fe; border-radius:6px; font-weight:bold; color:#0369a1;">Word Bank: ${task.words.join(' | ')}</div>
                 <p style="line-height:1.8; font-size:1.05rem;">${renderedCloze}</p>
               </div>`;
            return;
          }
          if (task.type === 'matching') {
            extrasHtml += `<div style="margin-bottom: 20px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                 <h4 style="margin-top:0; color:#0f172a;"><i class="fa-solid fa-link"></i> ${task.text}</h4>
                 <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-top:15px;">
                   <div style="display:flex; flex-direction:column; gap:10px;">
                     ${task.pairs.map((p) => `<div style="padding:10px; background:white; border:1px solid #cbd5e1; border-radius:6px; font-weight:bold;">${p.left}</div>`).join('')}
                   </div>
                   <div style="display:flex; flex-direction:column; gap:10px;">
                     ${[...task.pairs]
                       .sort(() => Math.random() - 0.5)
                       .map(
                         (p) =>
                           `<div style="padding:10px; background:white; border:1px solid #cbd5e1; border-radius:6px;">${p.right}</div>`,
                       )
                       .join('')}
                   </div></div></div>`;
            return;
          }
          if (task.type === 'table_planner') {
            extrasHtml += `<div style="margin-bottom: 20px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; overflow-x:auto;">
                  <h4 style="margin-top:0; color:#0f172a;"><i class="fa-solid fa-table"></i> ${task.text || task.question || 'Planner'}</h4>
                 <table style="width:100%; border-collapse:collapse; margin-top:10px; background:white;">
                   <thead><tr>${task.columns.map((c) => `<th style="border:1px solid #cbd5e1; padding:10px; background:#e2e8f0; color:#1e293b; text-align:left;">${c}</th>`).join('')}</tr></thead>
                   <tbody>
                     ${Array.from({ length: task.rows })
                       .map(
                         () =>
                           `<tr>${task.columns.map(() => `<td style="border:1px solid #cbd5e1; padding:10px;"><textarea style="width:100%; min-height:60px; border:none; resize:vertical; outline:none;" placeholder="Type here..."></textarea></td>`).join('')}</tr>`,
                       )
                       .join('')}
                   </tbody>
                 </table>
               </div>`;
            return;
          }
          if (task.type === 'think_pair_share') {
            return;
          }
          if (task.type === 'drawing') {
            const drawPrefix = task.qNum ? `Q${task.qNum}. ` : '';
            extrasHtml += `<div style="margin-bottom: 20px; background: #fffbeb; padding: 15px; border-radius: 8px; border: 2px dashed #f59e0b; text-align:center;">
                 <h4 style="margin-top:0; color:#b45309;"><i class="fa-solid fa-palette"></i> ${drawPrefix}Drawing Task</h4>
                 <p style="font-weight:bold; color:#0f172a; font-size:1.05rem;">${task.text || task.question}</p>
                 <div style="margin:20px auto; width:80%; height:200px; background:white; border:1px solid #d1d5db; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#9ca3af; font-style:italic;">
                   [Draw your response in your workbook]
                 </div>
               </div>`;
            return;
          }
          if (task.type === 'visual_annotation' || task.type === 'diagram_annotation') {
            const rawImg = task.image || task.src || (block && block.image ? block.image : null);
            const imgSrc = rawImg ? getAssetUrl(rawImg) : '';
            extrasHtml += `
              <div class="task-box visual-annotation-interactive" style="margin-bottom: 25px; background: #ffffff; padding: 20px; border-radius: 10px; border: 2px solid #0f172a; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">
                  <h4 style="margin: 0; color: #0f172a; font-size: 1.15rem;"><i class="fa-solid fa-microscope" style="color: #0284c7; margin-right: 8px;"></i> ${task.text || task.question || 'Visual Blueprint & Archival Anatomy'}</h4>
                  <span style="background: #0f172a; color: #ffffff; font-size: 0.75rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Visual Anatomy</span>
                </div>
                ${task.instruction ? `<p style="font-size: 0.95rem; color: #475569; font-style: italic; margin-top: 0; margin-bottom: 15px;">${task.instruction}</p>` : ''}
                ${
                  imgSrc
                    ? `
                  <div style="text-align: center; margin-bottom: 20px; background: #0f172a; border-radius: 8px; padding: 10px; position: relative;">
                    <img src="${imgSrc}" alt="Historical Diagram" style="max-height: 380px; max-width: 100%; object-fit: contain; border-radius: 4px; cursor: zoom-in;" data-action="open-modal" data-src="${imgSrc}" title="Click to zoom">
                    ${task.caption ? `<div style="color: #94a3b8; font-size: 0.85rem; font-style: italic; margin-top: 8px;">${task.caption}</div>` : ''}
                  </div>
                `
                    : ''
                }
                ${
                  task.annotations && task.annotations.length > 0
                    ? `
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
                    ${task.annotations
                      .map((ann, aIdx) => {
                        const num = ann.num || aIdx + 1;
                        return `
                        <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 14px;">
                          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                            <span style="background: #0f172a; color: #ffffff; font-weight: 800; font-size: 0.85rem; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;">${num}</span>
                            <strong style="color: #1e293b; font-size: 0.95rem;">${ann.label || ann.target || 'Feature ' + num}</strong>
                          </div>
                          <p style="font-size: 0.88rem; color: #475569; margin: 0 0 10px 0; line-height: 1.4;">${ann.prompt || ann.question || 'Identify and explain significance:'}</p>
                          <textarea style="width: 100%; box-sizing: border-box; min-height: 55px; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.9rem; font-family: inherit; resize: vertical;" placeholder="${ann.starter || 'Type your notes / label here...'}"></textarea>
                          ${
                            ann.model
                              ? `
                            <details style="margin-top: 8px;">
                              <summary style="cursor: pointer; color: #b45309; font-weight: 600; font-size: 0.82rem;"><i class="fa-solid fa-eye"></i> View Expert Historical Note</summary>
                              <div style="margin-top: 6px; padding: 8px 10px; background: #fef3c7; border-left: 3px solid #b45309; border-radius: 4px; font-size: 0.85rem; color: #78350f;">${ann.model}</div>
                            </details>
                          `
                              : ''
                          }
                        </div>
                      `;
                      })
                      .join('')}
                  </div>
                `
                    : ''
                }
              </div>
            `;
            return;
          }
          if (task.type === 'causal_domino') {
            extrasHtml += `
              <div class="task-box causal-domino-interactive" style="margin-bottom: 25px; background: #f0f9ff; padding: 20px; border-radius: 10px; border: 2px solid #0284c7; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #bae6fd; padding-bottom: 10px;">
                  <h4 style="margin: 0; color: #0369a1; font-size: 1.15rem;"><i class="fa-solid fa-cubes-stacked" style="color: #0284c7; margin-right: 8px;"></i> ${task.text || task.question || 'Causal Domino Chain'}</h4>
                  <span style="background: #0284c7; color: #ffffff; font-size: 0.75rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Causal Chain</span>
                </div>
                ${task.instruction ? `<p style="font-size: 0.95rem; color: #075985; font-style: italic; margin-top: 0; margin-bottom: 15px;">${task.instruction}</p>` : ''}
                ${
                  task.steps && task.steps.length > 0
                    ? `
                  <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${task.steps
                      .map(
                        (step, sIdx) => `
                      <div style="background: #ffffff; border: 1.5px solid ${step.blank ? '#0284c7' : '#cbd5e1'}; border-left: 5px solid ${sIdx === 0 ? '#0284c7' : sIdx === task.steps.length - 1 ? '#0369a1' : '#0ea5e9'}; border-radius: 8px; padding: 14px; display: flex; align-items: flex-start; gap: 14px;">
                        <div style="background: #e0f2fe; color: #0369a1; font-weight: 800; font-size: 0.9rem; padding: 4px 10px; border-radius: 6px; white-space: nowrap;">
                          ${step.stage || 'Step ' + (sIdx + 1)}
                        </div>
                        <div style="flex: 1;">
                          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                            <strong style="color: #0f172a; font-size: 1rem;">${step.title || ''}</strong>
                            ${step.year ? `<span style="font-size: 0.85rem; color: #64748b; font-weight: 600;">${step.year}</span>` : ''}
                          </div>
                          ${step.desc ? `<p style="margin: 0 0 8px 0; font-size: 0.92rem; color: #475569; line-height: 1.4;">${step.desc}</p>` : ''}
                          ${
                            step.blank
                              ? `
                            <textarea style="width: 100%; box-sizing: border-box; min-height: 50px; padding: 8px; border: 1.5px dashed #0284c7; border-radius: 6px; font-size: 0.9rem; font-family: inherit; resize: vertical; background: #f8fafc;" placeholder="${step.prompt || 'Explain the causal link connecting this step...'}"></textarea>
                          `
                              : ''
                          }
                        </div>
                      </div>
                    `,
                      )
                      .join('')}
                  </div>
                `
                    : ''
                }
              </div>
            `;
            return;
          }
          if (task.type === 'word_scalpel' || task.type === 'forensic_autopsy') {
            extrasHtml += `
              <div class="task-box word-scalpel-interactive" style="margin-bottom: 25px; background: #fffbeb; padding: 20px; border-radius: 10px; border: 2px solid #d97706; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #fed7aa; padding-bottom: 10px;">
                  <h4 style="margin: 0; color: #92400e; font-size: 1.15rem;"><i class="fa-solid fa-scissors" style="color: #d97706; margin-right: 8px;"></i> ${task.text || task.question || 'Forensic Scalpel: Micro-Quotation Extraction'}</h4>
                  <span style="background: #d97706; color: #ffffff; font-size: 0.75rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Forensic Scalpel</span>
                </div>
                ${task.instruction ? `<p style="font-size: 0.95rem; color: #78350f; font-style: italic; margin-top: 0; margin-bottom: 12px;">${task.instruction}</p>` : ''}
                ${
                  task.source_excerpt
                    ? `
                  <div style="font-family: Georgia, serif; font-size: 1rem; color: #1e293b; font-style: italic; background: #ffffff; border-left: 4px solid #d97706; padding: 12px 16px; margin-bottom: 15px; border-radius: 0 6px 6px 0; line-height: 1.6;">
                    &ldquo;${task.source_excerpt}&rdquo;
                  </div>
                `
                    : ''
                }
                <div style="background: #ffffff; border: 2px dashed #b45309; border-radius: 8px; padding: 14px; margin-bottom: 14px;">
                  <div style="font-size: 0.88rem; font-weight: 700; color: #92400e; margin-bottom: 6px;">Extract the Exact 3–6 Word "Smoking Gun" Quote:</div>
                  <input type="text" style="width: 100%; box-sizing: border-box; padding: 10px 14px; font-family: Georgia, serif; font-size: 1.05rem; border: 1px solid #fed7aa; border-radius: 6px; color: #1e293b;" placeholder='e.g. "[ . . . 3 to 6 words . . . ]"'>
                </div>
                ${
                  task.justification_prompt
                    ? `
                  <div style="margin-bottom: 10px;">
                    <label style="display: block; font-size: 0.9rem; font-weight: 700; color: #78350f; margin-bottom: 6px;">Why is this phrase decisive? ${task.justification_prompt}</label>
                    <textarea style="width: 100%; box-sizing: border-box; min-height: 60px; padding: 8px; border: 1px solid #fed7aa; border-radius: 6px; font-size: 0.9rem; font-family: inherit; resize: vertical;" placeholder="${task.starter || 'Type your justification here...'}"></textarea>
                  </div>
                `
                    : ''
                }
                ${
                  task.model_quote
                    ? `
                  <details style="margin-top: 10px;">
                    <summary style="cursor: pointer; color: #b45309; font-weight: 600; font-size: 0.85rem;"><i class="fa-solid fa-eye"></i> Reveal Historian's Scalpel Selection</summary>
                    <div style="margin-top: 6px; padding: 10px 14px; background: #fef3c7; border-left: 3px solid #b45309; border-radius: 4px; font-size: 0.92rem; color: #78350f;">
                      <strong>Smoking Gun:</strong> <em>&ldquo;${task.model_quote}&rdquo;</em><br>
                      ${task.model_answer ? `<span style="font-size: 0.88rem; display: block; margin-top: 4px;">${task.model_answer}</span>` : ''}
                    </div>
                  </details>
                `
                    : ''
                }
              </div>
            `;
            return;
          }
          if (task.type === 'ledger_audit' || task.type === 'balance_sheet') {
            const col1 = task.col1 || { title: 'Column A' };
            const col2 = task.col2 || { title: 'Column B' };
            const rowCount = task.rows || 3;
            extrasHtml += `
              <div class="task-box ledger-audit-interactive" style="margin-bottom: 25px; background: #f8fafc; padding: 20px; border-radius: 10px; border: 2px solid #475569; box-shadow: 0 4px 12px rgba(71, 85, 105, 0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #cbd5e1; padding-bottom: 10px;">
                  <h4 style="margin: 0; color: #1e293b; font-size: 1.15rem;"><i class="fa-solid fa-scale-balanced" style="color: #475569; margin-right: 8px;"></i> ${task.text || task.question || 'Forensic Ledger'}</h4>
                  <span style="background: #475569; color: #ffffff; font-size: 0.75rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Forensic Ledger</span>
                </div>
                ${task.instruction ? `<p style="font-size: 0.95rem; color: #475569; font-style: italic; margin-top: 0; margin-bottom: 15px;">${task.instruction}</p>` : ''}
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                  <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 14px;">
                    <h5 style="margin: 0 0 10px 0; color: #0f172a; font-size: 1rem; border-bottom: 2px solid #cbd5e1; padding-bottom: 6px;">${col1.title}</h5>
                    ${Array.from({ length: rowCount })
                      .map(
                        (_, r) => `
                      <input type="text" style="width: 100%; box-sizing: border-box; margin-bottom: 8px; padding: 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 0.88rem;" placeholder="${col1.hints && col1.hints[r] ? col1.hints[r] : 'Evidence point ' + (r + 1)}">
                    `,
                      )
                      .join('')}
                  </div>
                  <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 14px;">
                    <h5 style="margin: 0 0 10px 0; color: #0f172a; font-size: 1rem; border-bottom: 2px solid #cbd5e1; padding-bottom: 6px;">${col2.title}</h5>
                    ${Array.from({ length: rowCount })
                      .map(
                        (_, r) => `
                      <input type="text" style="width: 100%; box-sizing: border-box; margin-bottom: 8px; padding: 8px; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 0.88rem;" placeholder="${col2.hints && col2.hints[r] ? col2.hints[r] : 'Evidence point ' + (r + 1)}">
                    `,
                      )
                      .join('')}
                  </div>
                </div>
              </div>
            `;
            return;
          }
          if (task.type === 'two_sided_argument') {
            const qNumPrefix = task.qNum ? `Q${task.qNum}. ` : '';
            const adv = task.advancement || {};
            const lim = task.limitations || {};
            const advTitle = adv.title || 'Advancement & Progress (Change)';
            const limTitle = lim.title || 'Critical Limitations & Stagnation (Continuity)';
            const advPoints = adv.points || [];
            const limPoints = lim.points || [];
            const advStarter = adv.starter || adv.sentence_starter || '';
            const limStarter = lim.starter || lim.sentence_starter || '';
            const synthesisPrompt =
              task.synthesis_prompt ||
              'Write a balanced GCSE exam paragraph evaluating both sides.';
            const connectives = task.synthesis_connectives || [
              'Although...',
              'However, in practical terms...',
              'Consequently...',
              'Overall...',
            ];
            const modelAnswer = task.model_answer || task.model || '';

            extrasHtml += `
              <div class="task-box two-sided-argument-interactive" style="margin-bottom: 25px; background: #ffffff; padding: 20px; border-radius: 10px; border: 2px solid #0f766e; box-shadow: 0 4px 12px rgba(15, 118, 110, 0.08);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #ccfbf1; padding-bottom: 10px;">
                  <h4 style="margin: 0; color: #0f766e; font-size: 1.15rem;"><i class="fa-solid fa-scale-balanced" style="margin-right: 8px;"></i> ${qNumPrefix}${task.topic || task.text || 'Two-Sided Argument Analysis'}</h4>
                  <span style="background: #0f766e; color: #ffffff; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px; display: inline-flex; align-items: center; gap: 6px;"><i class="fa-solid fa-bullseye" style="color: #5eead4;"></i> Target: Paper 1 Q5/Q6 Evaluative Essay [16+4 Marks]</span>
                </div>
                ${task.instruction ? `<p style="font-size: 0.95rem; color: #475569; font-style: italic; margin-top: 0; margin-bottom: 15px;">${task.instruction}</p>` : ''}
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-bottom: 16px;">
                  <!-- Side 1: Advancement / Progress -->
                  <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 8px; padding: 14px;">
                    <h5 style="margin: 0 0 10px 0; color: #166534; font-size: 1rem; border-bottom: 2px solid #86efac; padding-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                      <i class="fa-solid fa-arrow-trend-up"></i> ${advTitle}
                    </h5>
                    <ul style="margin: 0 0 12px 0; padding-left: 18px; color: #1e293b; font-size: 0.9rem; line-height: 1.45;">
                      ${advPoints.map((pt) => `<li style="margin-bottom: 6px;">${pt}</li>`).join('')}
                    </ul>
                    ${advStarter ? `<div style="padding: 8px 10px; background: #ffffff; border-left: 3px solid #22c55e; border-radius: 4px; font-size: 0.85rem; color: #15803d; font-style: italic;"><strong>Evidence Stem:</strong> &ldquo;${advStarter}&rdquo;</div>` : ''}
                  </div>

                  <!-- Side 2: Limitations / Continuity -->
                  <div style="background: #fff1f2; border: 1.5px solid #fecdd3; border-radius: 8px; padding: 14px;">
                    <h5 style="margin: 0 0 10px 0; color: #9f1239; font-size: 1rem; border-bottom: 2px solid #fecdd3; padding-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                      <i class="fa-solid fa-hand"></i> ${limTitle}
                    </h5>
                    <ul style="margin: 0 0 12px 0; padding-left: 18px; color: #1e293b; font-size: 0.9rem; line-height: 1.45;">
                      ${limPoints.map((pt) => `<li style="margin-bottom: 6px;">${pt}</li>`).join('')}
                    </ul>
                    ${limStarter ? `<div style="padding: 8px 10px; background: #ffffff; border-left: 3px solid #f43f5e; border-radius: 4px; font-size: 0.85rem; color: #be123c; font-style: italic;"><strong>Counter-Stem:</strong> &ldquo;${limStarter}&rdquo;</div>` : ''}
                  </div>
                </div>

                <!-- Synthesis: GCSE Paragraph Builder -->
                <div style="background: #fffbeb; border: 1.5px solid #fcd34d; border-radius: 8px; padding: 14px;">
                  <h5 style="margin: 0 0 8px 0; color: #92400e; font-size: 1rem; display: flex; align-items: center; gap: 6px;">
                    <i class="fa-solid fa-pen-nib"></i> GCSE Paragraph Builder: Evaluative Synthesis
                  </h5>
                  <p style="font-size: 0.92rem; color: #78350f; font-weight: 600; margin: 0 0 10px 0;">${synthesisPrompt}</p>
                  
                  <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; align-items: center;">
                    <span style="font-size: 0.78rem; font-weight: 700; color: #92400e; text-transform: uppercase;">Analytical Connectives (Click to Insert):</span>
                    ${connectives.map((c) => `<button type="button" class="connective-chip" data-connective="${c.replace(/"/g, '&quot;')}" style="background: #ffffff; border: 1px solid #fde68a; color: #b45309; padding: 3px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.15s ease;" title="Click to insert at cursor">${c}</button>`).join('')}
                  </div>

                  <textarea class="interactive-textarea" style="width: 100%; box-sizing: border-box; min-height: 90px; padding: 10px; border: 1px solid #fde68a; border-radius: 6px; font-size: 0.92rem; font-family: inherit; resize: vertical;" placeholder="Combine the evidence and counter-evidence above to write your complex, balanced GCSE exam paragraph..."></textarea>

                  ${
                    modelAnswer
                      ? `
                    <details class="model-paragraph-reveal" style="margin-top: 12px; border: 1px dashed #d97706; border-radius: 6px; padding: 8px 12px; background: #fffbeb;">
                      <summary style="cursor: pointer; color: #b45309; font-weight: 700; font-size: 0.88rem; outline: none; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-eye"></i> [ Show Examiner-Grade Model Paragraph ]</summary>
                      <div class="scaffold-box model-box" style="margin-top: 10px; padding: 12px 15px; background: #ffffff; border-left: 3px solid #f59e0b; border-radius: 4px; font-size: 0.92rem; color: #78350f; line-height: 1.6; border: 1px solid #fde68a;">
                        ${modelAnswer}
                      </div>
                    </details>
                  `
                      : ''
                  }
                </div>
              </div>
            `;
            return;
          }
          if (task.type === 'historiographical_spectrum' || task.type === 'spectrum') {
            const leftPole = task.pole_left || 'Interpretation A';
            const rightPole = task.pole_right || 'Interpretation B';
            const specId = `spec-slider-${index}-${tIdx}`;
            extrasHtml += `
              <div class="task-box spectrum-interactive" style="margin-bottom: 25px; background: #faf5ff; padding: 20px; border-radius: 10px; border: 2px solid #7c3aed; box-shadow: 0 4px 12px rgba(124, 58, 237, 0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #ddd6fe; padding-bottom: 10px;">
                  <h4 style="margin: 0; color: #5b21b6; font-size: 1.15rem;"><i class="fa-solid fa-arrows-left-right" style="color: #7c3aed; margin-right: 8px;"></i> ${task.text || task.question || 'Historiographical Spectrum'}</h4>
                  <span style="background: #7c3aed; color: #ffffff; font-size: 0.75rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Interpretation Spectrum</span>
                </div>
                ${task.instruction ? `<p style="font-size: 0.95rem; color: #6b21a8; font-style: italic; margin-top: 0; margin-bottom: 15px;">${task.instruction}</p>` : ''}
                <div style="background: #ffffff; border: 1px solid #ddd6fe; border-radius: 8px; padding: 18px; margin-bottom: 15px;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.95rem; font-weight: 700; color: #4c1d95; margin-bottom: 12px;">
                    <span style="max-width: 45%;">${leftPole}</span>
                    <span style="max-width: 45%; text-align: right;">${rightPole}</span>
                  </div>
                  <input type="range" min="0" max="100" value="50" id="${specId}" style="width: 100%; cursor: pointer;" oninput="document.getElementById('${specId}-val').innerText = this.value + '%';">
                  <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #6b7280; margin-top: 6px;">
                    <span>0%</span><span>25%</span><span id="${specId}-val" style="font-weight: bold; color: #7c3aed;">50%</span><span>75%</span><span>100%</span>
                  </div>
                </div>
                <div style="margin-bottom: 10px;">
                  <label style="display: block; font-size: 0.9rem; font-weight: 700; color: #5b21b6; margin-bottom: 6px;">Justify your placement along this spectrum:</label>
                  <textarea style="width: 100%; box-sizing: border-box; min-height: 55px; padding: 8px; border: 1px solid #ddd6fe; border-radius: 6px; font-size: 0.9rem; font-family: inherit; resize: vertical;" placeholder="${task.starter || 'I have placed this at... because...'}"></textarea>
                </div>
              </div>
            `;
            return;
          }
          if (task.type === 'crucible_fork') {
            extrasHtml += `
              <div class="task-box crucible-fork-interactive" style="margin-bottom: 25px; background: #fff7ed; padding: 20px; border-radius: 10px; border: 2px solid #ea580c; box-shadow: 0 4px 12px rgba(234, 88, 12, 0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #fed7aa; padding-bottom: 10px;">
                  <h4 style="margin: 0; color: #9a3412; font-size: 1.15rem;"><i class="fa-solid fa-code-branch" style="color: #ea580c; margin-right: 8px;"></i> ${task.text || task.question || 'The Crucible Fork: Decision Dilemma'}</h4>
                  <span style="background: #ea580c; color: #ffffff; font-size: 0.75rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Decision Dilemma</span>
                </div>
                ${task.instruction ? `<p style="font-size: 0.95rem; color: #c2410c; font-style: italic; margin-top: 0; margin-bottom: 15px;">${task.instruction}</p>` : ''}
                ${
                  task.options && task.options.length > 0
                    ? `
                  <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 15px;">
                    ${task.options
                      .map(
                        (opt, oIdx) => `
                      <label style="background: #ffffff; border: 1.5px solid #fed7aa; border-radius: 8px; padding: 12px; display: flex; align-items: flex-start; gap: 10px; cursor: pointer; transition: all 0.2s ease;">
                        <input type="radio" name="fork-${index}-${tIdx}" value="${oIdx}" style="margin-top: 3px;">
                        <div>
                          <strong style="color: #9a3412; font-size: 0.95rem;">Option ${String.fromCharCode(65 + oIdx)}: ${opt.title}</strong>
                          <p style="margin: 4px 0 0 0; font-size: 0.88rem; color: #475569; line-height: 1.4;">${opt.desc}</p>
                        </div>
                      </label>
                    `,
                      )
                      .join('')}
                  </div>
                `
                    : ''
                }
                ${
                  task.risk_prompt
                    ? `
                  <div style="margin-bottom: 10px;">
                    <label style="display: block; font-size: 0.9rem; font-weight: 700; color: #9a3412; margin-bottom: 6px;">Calculated Risk: ${task.risk_prompt}</label>
                    <textarea style="width: 100%; box-sizing: border-box; min-height: 50px; padding: 8px; border: 1px solid #fed7aa; border-radius: 6px; font-size: 0.9rem; font-family: inherit; resize: vertical;" placeholder="${task.starter || 'The primary risk of this decision was...'}"></textarea>
                  </div>
                `
                    : ''
                }
                ${
                  task.historical_outcome
                    ? `
                  <details style="margin-top: 10px;">
                    <summary style="cursor: pointer; color: #ea580c; font-weight: 600; font-size: 0.85rem;"><i class="fa-solid fa-clock-rotate-left"></i> Reveal Historical Reality</summary>
                    <div style="margin-top: 6px; padding: 10px 14px; background: #ffedd5; border-left: 3px solid #ea580c; border-radius: 4px; font-size: 0.92rem; color: #9a3412;">
                      <strong>What Actually Happened:</strong> ${task.historical_outcome}
                    </div>
                  </details>
                `
                    : ''
                }
              </div>
            `;
            return;
          }
          if (
            task.type === 'significance_diamond' ||
            task.type === 'priority_matrix' ||
            task.type === 'factor_hierarchy'
          ) {
            extrasHtml += `
              <div class="task-box significance-diamond-interactive" style="margin-bottom: 25px; background: #ecfdf5; padding: 20px; border-radius: 10px; border: 2px solid #059669; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #a7f3d0; padding-bottom: 10px;">
                  <h4 style="margin: 0; color: #065f46; font-size: 1.15rem;"><i class="fa-solid fa-gem" style="color: #059669; margin-right: 8px;"></i> ${task.text || task.question || 'The Significance Diamond: Prioritising Catalysts'}</h4>
                  <span style="background: #059669; color: #ffffff; font-size: 0.75rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Priority Diamond</span>
                </div>
                ${task.instruction ? `<p style="font-size: 0.95rem; color: #047857; font-style: italic; margin-top: 0; margin-bottom: 15px;">${task.instruction}</p>` : ''}
                ${
                  task.factors && task.factors.length > 0
                    ? `
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div style="background: #ffffff; border: 1.5px solid #a7f3d0; border-radius: 8px; padding: 12px;">
                      <strong style="color: #065f46; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 8px;">Historical Factors Bank:</strong>
                      <div style="display: flex; flex-direction: column; gap: 6px;">
                        ${task.factors
                          .map(
                            (f, fIdx) => `
                          <div style="background: #f0fdf4; border: 1px solid #6ee7b7; border-radius: 6px; padding: 8px 10px; display: flex; align-items: center; gap: 8px; font-size: 0.9rem; color: #065f46;">
                            <span style="background: #059669; color: #ffffff; font-weight: bold; font-size: 0.75rem; width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;">${String.fromCharCode(65 + fIdx)}</span>
                            <span>${typeof f === 'string' ? f : f.title || f.name}</span>
                          </div>
                        `,
                          )
                          .join('')}
                      </div>
                    </div>
                    <div style="background: #ffffff; border: 1.5px solid #a7f3d0; border-radius: 8px; padding: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;">
                      <div style="text-align: center; width: 100%;">
                        <div style="font-size: 0.72rem; font-weight: 700; color: #047857; text-transform: uppercase;">Top Catalyst (#1 Decisive)</div>
                        <div style="max-width: 180px; margin: 4px auto 0 auto; height: 32px; border: 2px solid #059669; background: #d1fae5; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #065f46; font-size: 0.88rem;">#1 (Slot Factor)</div>
                      </div>
                      <div style="display: flex; gap: 10px; width: 100%; justify-content: center;">
                        <div style="text-align: center; flex: 1;">
                          <div style="font-size: 0.7rem; color: #047857;">Contributing Factor</div>
                          <div style="height: 30px; border: 1.5px dashed #059669; background: #f0fdf4; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 0.82rem; color: #047857;">#2</div>
                        </div>
                        <div style="text-align: center; flex: 1;">
                          <div style="font-size: 0.7rem; color: #047857;">Contributing Factor</div>
                          <div style="height: 30px; border: 1.5px dashed #059669; background: #f0fdf4; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 0.82rem; color: #047857;">#3</div>
                        </div>
                      </div>
                      <div style="text-align: center; width: 100%;">
                        <div style="font-size: 0.7rem; color: #64748b;">Marginal / Secondary Factor</div>
                        <div style="max-width: 180px; margin: 4px auto 0 auto; height: 30px; border: 1.5px dashed #94a3b8; background: #f8fafc; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 0.82rem; color: #64748b;">#4</div>
                      </div>
                    </div>
                  </div>
                `
                    : ''
                }
                <div style="margin-top: 10px;">
                  <label style="display: block; font-size: 0.9rem; font-weight: 700; color: #065f46; margin-bottom: 6px;">Evaluative Justification: ${task.justification_prompt || 'Explain why your #1 factor outweighs the others:'}</label>
                  <textarea style="width: 100%; box-sizing: border-box; min-height: 55px; padding: 8px; border: 1px solid #a7f3d0; border-radius: 6px; font-size: 0.9rem; font-family: inherit; resize: vertical;" placeholder="${task.starter || 'Factor A was the decisive catalyst because...'}"></textarea>
                </div>
              </div>
            `;
            return;
          }
          if (task.type === 'extended_writing' && task.scaffolding) {
            const ansId = `ans-emb-${index}-${tIdx}`;
            const scaf = task.scaffolding || {};
            const structureStrip =
              scaf.structure_strip && scaf.structure_strip.length > 0
                ? scaf.structure_strip
                : task.hints && task.hints.length > 0
                  ? task.hints.map((h) => ({
                      col: h.label || 'PEEL Step',
                      prompt: h.prompt || h.text || h,
                    }))
                  : (scaf.matrix || []).map((m) => ({ col: m.col, prompt: m.text || m.prompt }));
            const starters = scaf.sentence_starters || [];
            const rawConnectives = scaf.connective_bank || scaf.causal_connectives || [];
            const connectives = Array.isArray(rawConnectives)
              ? rawConnectives
              : typeof rawConnectives === 'string'
                ? rawConnectives
                    .split('•')
                    .map((s) => s.trim())
                    .filter(Boolean)
                : [];
            const words = scaf.word_bank || [];
            const criteria = scaf.evaluative_criteria || [];
            const isKs2 =
              window.currentUnitId === 'ks2_ww2' ||
              (typeof unit !== 'undefined' && unit && (unit.is_ks2 || unit.id === 'ks2_ww2'));
            const isKs3 =
              !isKs2 &&
              (window.currentUnitId === 'early_modern_world' ||
                window.currentUnitId === 'water_and_sanitation' ||
                window.currentUnitId === 'great_war' ||
                window.currentUnitId === 'great_war_part2' ||
                window.currentUnitId === 'medieval_england' ||
                window.currentUnitId === 'industrialisation_and_empire' ||
                (typeof unit !== 'undefined' && unit && unit.is_ks3));
            const badgeText = isKs2
              ? 'Key Stage 2 Historian Challenge'
              : isKs3
                ? 'KS3 Analytical Masterclass'
                : 'GCSE Analytical Masterclass';
            const vocabBadgeText = isKs2
              ? 'Historian Word Bank'
              : isKs3
                ? 'Core Disciplinary Vocabulary'
                : 'GCSE Key Vocabulary Bank';
            const questionTitle =
              task.title ||
              task.question ||
              task.text ||
              (isKs2 ? 'Historian Writing Challenge' : 'Extended Analytical Writing');
            const actualPrompt = task.prompt || task.question || task.text || '';

            extrasHtml += `
              <div class="task-box extended-writing-box" style="margin-bottom: 25px; background: #ffffff; padding: 22px; border-radius: 10px; border: 2px solid #0284c7; box-shadow: 0 4px 14px rgba(2, 132, 199, 0.12);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 2px solid #e0f2fe; padding-bottom: 12px;">
                  <h4 style="margin: 0; color: #0369a1; font-size: 1.15rem; font-weight: 800; display: flex; align-items: center; gap: 8px;">
                    <i class="fa-solid fa-feather-pointed" style="color: #0284c7;"></i>
                    <span>${window.formatBold ? window.formatBold(questionTitle) : questionTitle}</span>
                  </h4>
                  <span style="background: #0284c7; color: #ffffff; font-size: 0.72rem; font-weight: 800; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">${badgeText}</span>
                </div>

                ${
                  actualPrompt
                    ? `
                  <div class="extended-writing-prompt" style="font-size: 1.08rem; font-weight: 700; color: #0f172a; margin-bottom: 16px; line-height: 1.5; background: #f0f9ff; padding: 14px 18px; border-left: 4px solid #0284c7; border-radius: 6px;">
                    <span style="display: block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; color: #0284c7; margin-bottom: 4px; font-weight: 800;">Enquiry Question:</span>
                    <div>${window.formatBold ? window.formatBold(actualPrompt) : actualPrompt}</div>
                    ${
                      task.stimulus && task.stimulus.length > 0
                        ? `
                      <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 10px; font-size: 0.85rem; color: #334155;">
                        <strong style="color: #0369a1; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.5px;">Stimulus:</strong>
                        ${task.stimulus.map((st) => `<span style="background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; padding: 2px 8px; border-radius: 4px; font-weight: 700; font-size: 0.82rem;">${st}</span>`).join('')}
                        <span style="font-style: italic; font-size: 0.78rem; color: #64748b;">(You must also use information of your own)</span>
                      </div>
                    `
                        : ''
                    }
                  </div>
                `
                    : ''
                }

                ${scaf.guidance ? `<p style="font-size: 0.95rem; color: #334155; margin-top: 0; margin-bottom: 16px; line-height: 1.5;">${scaf.guidance}</p>` : ''}

                ${
                  structureStrip.length > 0
                    ? `
                  <div style="margin-bottom: 18px;">
                    <div style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; color: #0284c7; letter-spacing: 0.5px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                      <i class="fa-solid fa-layer-group"></i> Analytical Structure Strip
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 10px;">
                      ${structureStrip
                        .map((step, sIdx) => {
                          const isScholar =
                            step.col && (step.col.includes('Scholar') || step.col.includes('★'));
                          const borderCol = isScholar
                            ? '#8b5cf6'
                            : sIdx === 0
                              ? '#0284c7'
                              : sIdx === 1
                                ? '#059669'
                                : '#d97706';
                          const bgCol = isScholar ? '#fbf7ff' : '#f8fafc';
                          const badgeCol = isScholar ? '#7c3aed' : borderCol;
                          return `
                          <div style="background: ${bgCol}; border: 1.5px solid ${borderCol}; border-radius: 8px; padding: 10px 12px; display: flex; flex-direction: column; justify-content: space-between;">
                            <div>
                              <div style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: ${badgeCol}; margin-bottom: 4px;">
                                ${step.col}
                              </div>
                              <div style="font-size: 0.84rem; color: #1e293b; line-height: 1.4; margin-bottom: 8px;">
                                ${step.prompt || step.text}
                              </div>
                            </div>
                            ${
                              step.starter
                                ? `
                              <div style="font-size: 0.78rem; font-style: italic; color: #475569; border-left: 2px solid ${badgeCol}; padding-left: 6px; margin-top: 4px;">
                                "${step.starter}"
                              </div>
                            `
                                : ''
                            }
                          </div>
                        `;
                        })
                        .join('')}
                    </div>
                  </div>
                `
                    : ''
                }

                ${
                  criteria.length > 0
                    ? `
                  <div style="margin-bottom: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px;">
                    <strong style="display: block; font-size: 0.78rem; text-transform: uppercase; color: #475569; letter-spacing: 0.5px; margin-bottom: 6px;">
                      <i class="fa-solid fa-scale-balanced" style="color: #0284c7; margin-right: 6px;"></i> Evaluative Criteria &amp; Evidence Checklist
                    </strong>
                    <ul style="margin: 0; padding-left: 18px; font-size: 0.85rem; color: #334155; line-height: 1.5;">
                      ${criteria.map((c) => `<li style="margin-bottom: 4px;">${window.formatBold ? window.formatBold(c) : c}</li>`).join('')}
                    </ul>
                  </div>
                `
                    : ''
                }

                ${
                  starters.length > 0 || connectives.length > 0 || words.length > 0
                    ? `
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; margin-bottom: 16px;">
                    ${
                      words.length > 0
                        ? `
                      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px;">
                        <strong style="display: block; font-size: 0.75rem; text-transform: uppercase; color: #475569; letter-spacing: 0.5px; margin-bottom: 6px;">
                          ${vocabBadgeText}
                        </strong>
                        <div style="display: flex; flex-wrap: wrap; gap: 5px;">
                          ${words.map((w) => `<span style="background: #e2e8f0; color: #1e293b; font-size: 0.74rem; font-weight: 600; padding: 2px 7px; border-radius: 4px;">${w}</span>`).join('')}
                        </div>
                      </div>
                    `
                        : ''
                    }
                    ${
                      connectives.length > 0
                        ? `
                      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 10px 12px;">
                        <strong style="display: block; font-size: 0.75rem; text-transform: uppercase; color: #15803d; letter-spacing: 0.5px; margin-bottom: 6px;">
                          Causal Connectives Bank
                        </strong>
                        <div style="display: flex; flex-wrap: wrap; gap: 5px;">
                          ${connectives.map((c) => `<span style="background: #dcfce7; color: #166534; font-size: 0.74rem; font-weight: 600; padding: 2px 7px; border-radius: 4px;">${c}</span>`).join('')}
                        </div>
                      </div>
                    `
                        : ''
                    }
                  </div>
                `
                    : ''
                }

                ${
                  starters.length > 0
                    ? `
                  <details style="margin-bottom: 14px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 8px 12px;">
                    <summary style="cursor: pointer; font-size: 0.84rem; font-weight: 700; color: #1d4ed8;"><i class="fa-solid fa-pen-fancy"></i> Expand Master Sentence Starters Bank (${starters.length} prompts)</summary>
                    <ul style="margin: 8px 0 0 0; padding-left: 20px; font-size: 0.85rem; color: #1e40af; line-height: 1.5;">
                      ${starters.map((s) => `<li style="margin-bottom: 4px;">${s}</li>`).join('')}
                    </ul>
                  </details>
                `
                    : ''
                }

                <div style="margin-bottom: 14px;">
                  <label style="display: block; font-size: 0.88rem; font-weight: 700; color: #0f172a; margin-bottom: 6px;">Pupil Extended Writing Area:</label>
                  <textarea style="width: 100%; box-sizing: border-box; min-height: 130px; padding: 10px 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.95rem; line-height: 1.6; font-family: inherit; resize: vertical;" placeholder="Compose your 3-paragraph historical evaluation here using the structure strip and connectives..."></textarea>
                </div>

                <div>
                  <button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-reveal" data-action="toggle-element" data-target-id="${ansId}"><i class="fa-solid fa-eye"></i> Reveal Master Model Answer</button>
                  <div class="answer" id="${ansId}" style="display: none; margin-top: 12px; background: #fffbeb; padding: 14px 16px; border-left: 4px solid #b45309; border-radius: 4px; color: #451a03; line-height: 1.7; font-size: 0.95rem;">
                    <div style="font-weight: 800; font-size: 0.8rem; text-transform: uppercase; color: #92400e; margin-bottom: 6px; letter-spacing: 0.5px;">Master Model Answer:</div>
                    ${task.model_answer || task.model || task.answer || ''}
                  </div>
                </div>
              </div>
            `;
            return;
          }
          const qPrefix = task.qNum ? `Q${task.qNum}. ` : '';
          const taskPrompt = task.text || task.question || task.instructions || task.prompt || '';
          const cleanTaskText = taskPrompt.replace(/^Q\d+[\.\:]\s*/i, '');
          const taskTitle =
            task.title && task.title !== taskPrompt && !cleanTaskText.startsWith(task.title)
              ? task.title
              : '';
          const titleHtml = taskTitle
            ? `<div style="font-weight: 800; font-size: 0.92rem; color: #92400e; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">${window.formatBold(taskTitle)}</div>`
            : '';
          const ansId = `ans-emb-${index}-${tIdx}`;
          const starterText =
            task.starter ||
            task.sentence_starter ||
            (task.scaffolding && (task.scaffolding.starter || task.scaffolding.sentence_starter));
          const starterBtn = starterText
            ? `<button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-starter" data-action="toggle-element" data-target-id="starter-${ansId}"><i class="fa-solid fa-pen"></i> Starter</button>`
            : '';
          const starterDiv = starterText
            ? `<div class="starter-box" id="starter-${ansId}" style="display: none; margin-top: 8px; background: #f0f9ff; padding: 10px; border-left: 3px solid #0284c7; font-style: italic; color: #0c4a6e; transition: all 0.3s ease;">${starterText}</div>`
            : '';
          let flowchartHtml = '';
          if (task.flowchart) {
            const fc = task.flowchart;
            flowchartHtml = `
              <div class="dual-coding-flowchart" style="margin: 10px 0 16px 0; padding: 12px 14px; background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px;">
                <div style="font-weight: 800; font-size: 0.92rem; color: #0f172a; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                  <span>${fc.title}</span>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
                  ${fc.steps
                    .map(
                      (s, sIdx) => `
                    <div style="background: white; border: 1px solid #cbd5e1; border-top: 3.5px solid ${sIdx === 0 ? '#0284c7' : sIdx === 1 ? '#d97706' : '#dc2626'}; border-radius: 6px; padding: 10px;">
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                        <span style="font-weight: 800; font-size: 0.78rem; background: #f1f5f9; color: #334155; width: 22px; height: 22px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center;">${s.num}</span>
                        <span style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: ${sIdx === 0 ? '#0284c7' : sIdx === 1 ? '#d97706' : '#dc2626'}; background: #f8fafc; padding: 2px 6px; border-radius: 4px; border: 1px solid #e2e8f0;">${s.badge}</span>
                      </div>
                      <div style="font-weight: 700; font-size: 0.85rem; color: #0f172a; margin-bottom: 3px;">${s.title}</div>
                      <div style="font-size: 0.78rem; color: #475569; line-height: 1.35;">${s.desc}</div>
                    </div>
                  `,
                    )
                    .join('')}
                </div>
              </div>
            `;
          }
          extrasHtml += `
               <div style="margin-bottom: 14px;">
                 ${flowchartHtml}
                 ${titleHtml}
                 <div style="font-size: 1.05rem; line-height: 1.6; color: #1e293b; margin-bottom: 8px;">${window.formatBold(qPrefix + cleanTaskText)}</div>
                 <button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-reveal" data-action="toggle-element" data-target-id="${ansId}"><i class="fa-solid fa-eye"></i> Show</button>
                 ${starterBtn}
                 ${starterDiv}
                 <div class="answer" id="${ansId}" style="display: none; margin-top: 8px; background: white; padding: 10px; border-left: 3px solid #b45309; font-style: italic; color: #451a03; line-height: 1.6;">${window.formatBold(task.model || task.model_answer || task.answer || '')}</div>
               </div>
             `;
        });
        extrasHtml += `</div>`;

        if (block.flashcards && block.flashcards.length > 0) {
          extrasHtml += `<div style="margin-top: 20px; padding: 20px; background: rgba(59, 130, 246, 0.05); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 8px;"><div class="flashcard-deck">`;
          block.flashcards.forEach((fc) => {
            let t = fc.term || fc.word || fc.title || '';
            let d = fc.definition || fc.meaning || fc.desc || '';
            extrasHtml += `
                <div class="flashcard-wrapper" data-action="flip-card-wrapper">
                  <div class="flashcard-inner">
                    <div class="flashcard-face flashcard-front">
                      <h4>${t}</h4>
                      <p style="font-size: 0.9rem; margin-top: 10px;">Tap to reveal</p>
                    </div>
                    <div class="flashcard-face flashcard-back">
                      ${d}
                    </div>
                  </div>
                </div>
              `;
          });
          extrasHtml += `</div></div>`;
        }
      }

      let isSideQuest =
        styledContent.includes('</details>') && block.title && block.title.includes('Side Quest');
      if (isSideQuest) {
        styledContent = styledContent.replace('</details>', extrasHtml + '</details>');
        extrasHtml = '';
        // Rewrite the actual styledContent in the narrative chunk manually below
      }

      htmlNarrative += extrasHtml;

      // REC-002: Act-Level Anchoring of Key Figures
      if (lesson.key_individual && !renderedKeyIndividual) {
        const ki = lesson.key_individual;
        const totalBlocks = lesson.narrative_blocks.length;
        let isAnchor = false;
        if (
          ki.anchor_act &&
          (ki.anchor_act === index + 1 ||
            (index + 1 === totalBlocks && ki.anchor_act > totalBlocks))
        ) {
          isAnchor = true;
        } else if (ki.anchor_block && ki.anchor_block === index + 1) {
          isAnchor = true;
        } else if (
          ki.anchor_title &&
          block.title &&
          block.title.toLowerCase().includes(ki.anchor_title.toLowerCase())
        ) {
          isAnchor = true;
        } else if (index === totalBlocks - 1 && !ki.anchor_act && !ki.anchor_block) {
          isAnchor = true;
        }

        if (isAnchor) {
          const kiCardHtml = generateKeyIndividualEmbedHTML
            ? generateKeyIndividualEmbedHTML(ki, ki.anchor_title)
            : `<div>${ki.name}</div>`;
          htmlNarrative += `
            <div class="key-individual-lesson-section" data-anchor-act="${index + 1}" style="margin: 6px 0;">
              <div class="key-individual-embed" style="margin: 0;">
                ${kiCardHtml}
              </div>
            </div>
          `;
          renderedKeyIndividual = true;
        }
      }
    });
    htmlNarrative += '</div>';

    if (lesson.key_individual && !renderedKeyIndividual) {
      const ki = lesson.key_individual;
      const kiCardHtml = generateKeyIndividualEmbedHTML
        ? generateKeyIndividualEmbedHTML(ki, ki.anchor_title)
        : `<div>${ki.name}</div>`;
      htmlNarrative += `
        <div class="key-individual-lesson-section" style="margin: 6px 0;">
          <div class="key-individual-embed" style="margin: 0;">
            ${kiCardHtml}
          </div>
        </div>
      `;
    }

    if (!isTrip && !isKs2) {
      if (lesson.tasks && lesson.tasks.length > 0) {
        let hasModels = false;
        if (lesson.tasks) {
          hasModels = lesson.tasks.some((t) => !!t.model);
        }

        const revealBtn = hasModels
          ? `<button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-model" data-action="reveal-all-models"><i class="fa-solid fa-magnifying-glass"></i> Reveal All Models</button>`
          : '';

        const ks2WorksheetBanner = isKs2
          ? `
            <div class="ks2-inlesson-worksheet-banner" style="background: linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%); border: 1.5px solid #bfdbfe; border-left: 5px solid #2563eb; border-radius: 8px; padding: 14px 18px; margin-bottom: 22px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; box-shadow: 0 2px 8px rgba(37,99,235,0.06);">
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 38px; height: 38px; border-radius: 8px; background: #2563eb; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 1.15rem; flex-shrink: 0; box-shadow: 0 2px 6px rgba(37,99,235,0.3);">
                  <i class="fa-solid fa-file-lines"></i>
                </div>
                <div>
                  <div style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: #1e40af; letter-spacing: 0.5px;">Enquiry Companion Resources &bull; Key Stage 2</div>
                  <div style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.05rem; font-weight: 700; color: #0f172a;">A4 Companion Worksheet &amp; Pupil Workbook</div>
                  <div style="font-size: 0.82rem; color: #475569; margin-top: 1px;">Printable 2-page enquiry worksheet, source detective tasks, and 24-page pupil workbook.</div>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <button type="button" class="btn btn-ks2-inlesson-worksheet" onclick="window.openKs2WorksheetModal('${lesson.id}', ${currentIndex})" style="background: #2563eb; color: #ffffff; font-weight: 700; font-size: 0.82rem; padding: 7px 14px; border-radius: 6px; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 5px rgba(37,99,235,0.25);">
                  <i class="fa-solid fa-file-pdf"></i> Open Lesson Worksheet (2pp)
                </button>
                <button type="button" class="btn btn-ks2-inlesson-teacher" onclick="window.openKs2TeacherGuidanceModal('${lesson.id}', ${currentIndex})" style="background: #ffffff; color: #9d174d; border: 1.5px solid #fbcfe8; font-weight: 700; font-size: 0.82rem; padding: 6px 12px; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                  <i class="fa-solid fa-chalkboard-user"></i> Teacher Guidance
                </button>
                <a href="/pdfs/ks2_ww2/ks2_ww2_pupil_workbook.pdf" target="_blank" style="background: #ffffff; color: #166534; border: 1.5px solid #bbf7d0; font-weight: 700; font-size: 0.82rem; padding: 6px 12px; border-radius: 6px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                  <i class="fa-solid fa-book-bookmark"></i> Pupil Workbook (PDF)
                </a>
              </div>
            </div>
          `
          : '';

        htmlTasks += `
            <details class="lesson-tasks-accordion phase-card" open style="margin-top: 32px; border: 1.5px solid #cbd5e1; border-radius: 12px; background: #ffffff; overflow: hidden; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05); padding: 0;">
              <summary style="cursor: pointer; padding: 16px 22px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); display: flex; justify-content: space-between; align-items: center; user-select: none; border-bottom: 1px solid #e2e8f0; list-style: none; outline: none; transition: background 0.15s ease;">
                <div style="display: flex; align-items: center; gap: 14px;">
                  <div style="width: 38px; height: 38px; border-radius: 8px; background: #0284c7; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 1.15rem; flex-shrink: 0; box-shadow: 0 2px 6px rgba(2, 132, 199, 0.25);">
                    <i class="fa-solid fa-book-open"></i>
                  </div>
                  <div>
                    <div style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: #0369a1; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
                      <span style="background: #e0f2fe; color: #0369a1; padding: 1.5px 7px; border-radius: 4px; font-weight: 800;"><i class="fa-solid fa-book-open" style="margin-right: 4px;"></i> PUPIL WORKBOOK COMPANION</span>
                      <span style="color: #94a3b8;">&bull;</span>
                      <span>RIGHT-HAND SPREAD (RECTO)</span>
                    </div>
                    <div style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.15rem; font-weight: 700; color: #0f172a;">Pupil Workbook Activity &bull; Disciplinary Writing Tasks</div>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="font-size: 0.78rem; font-weight: 700; background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 14px; display: inline-flex; align-items: center; gap: 5px;">
                    <i class="fa-solid fa-layer-group"></i> ${lesson.tasks.length} Workbook Tasks
                  </span>
                  <span style="font-size: 0.85rem; font-weight: 700; color: #64748b; display: inline-flex; align-items: center; gap: 6px;">
                    <span>Click to Collapse/Expand</span>
                    <i class="fa-solid fa-chevron-down accordion-arrow" style="transition: transform 0.2s ease;"></i>
                  </span>
                </div>
              </summary>
              <div style="padding: 22px 24px;">
                ${ks2WorksheetBanner}
                <div style="display: flex; justify-content: flex-end; align-items: center; margin-bottom: 20px;">
                  ${revealBtn}
                </div>
          `;

        lesson.tasks.forEach((task, tIdx) => {
          if (task.type === 'because_but_so' || task.type === 'sentence_expansion') {
            htmlTasks += renderBecauseButSoTaskHTML(task, currentIndex, tIdx, unitId);
            return;
          }
          if (task.type === 'source_utility' || task.taskType === 'source_utility') {
            htmlTasks += renderSourceUtilityTaskHTML(task, currentIndex, tIdx, unitId);
            return;
          }
          if (
            task.type === 'historical_interpretations' ||
            task.taskType === 'historical_interpretations'
          ) {
            htmlTasks += renderHistoricalInterpretationsTaskHTML(task, currentIndex, tIdx, unitId);
            return;
          }
          if (task.type === 'drag_drop_timeline') {
            const timelineId = `dd-timeline-lesson-${tIdx}`;
            htmlTasks += `<div id="${timelineId}" style="margin-bottom: 20px;"></div>`;
            window.postRenderHooks.push(() => {
              import('../drag_drop_timeline.js').then((mod) => {
                mod.initDragDropTimeline(document.getElementById(timelineId), task);
              });
            });
            return;
          }
          if (task.type === 'interactive_map') {
            const mapId = `interactive-map-lesson-${tIdx}`;
            htmlTasks += `<div id="${mapId}" style="margin-bottom: 20px;"></div>`;
            window.postRenderHooks.push(() => {
              import('../interactive_map.js').then((mod) => {
                mod.initInteractiveMap(document.getElementById(mapId), task);
              });
            });
            return;
          }
          if (task.type === 'two_sided_argument') {
            const hasTaskPrefix = task.topic && /^Task\s*\d+/i.test(task.topic);
            const isKs2 =
              window.currentUnitId === 'ks2_ww2' ||
              (typeof unit !== 'undefined' && unit && (unit.is_ks2 || unit.id === 'ks2_ww2'));
            const isKs3 =
              !isKs2 &&
              (window.currentUnitId === 'early_modern_world' ||
                window.currentUnitId === 'water_and_sanitation' ||
                window.currentUnitId === 'great_war' ||
                window.currentUnitId === 'great_war_part2' ||
                window.currentUnitId === 'medieval_england' ||
                window.currentUnitId === 'industrialisation_and_empire' ||
                (typeof unit !== 'undefined' && unit && unit.is_ks3));
            const qNumPrefix =
              task.qNum && !hasTaskPrefix && !isKs3 && !isKs2 ? `Q${task.qNum}. ` : '';
            const adv = task.advancement || {};
            const lim = task.limitations || {};
            const advTitle =
              adv.title || (isKs2 ? 'Successes & Advances' : 'Advancement & Progress (Change)');
            const limTitle =
              lim.title ||
              (isKs2 ? 'Challenges & Obstacles' : 'Critical Limitations & Stagnation (Continuity)');
            const advPoints = adv.points || [];
            const limPoints = lim.points || [];
            const advStarter = adv.starter || adv.sentence_starter || '';
            const limStarter = lim.starter || lim.sentence_starter || '';
            const synthesisPrompt =
              task.synthesis_prompt ||
              task.question ||
              (isKs2
                ? 'Write your historian answer weighing up both sides.'
                : 'Write a balanced analytical paragraph evaluating both sides.');
            const connectives =
              task.synthesis_connectives ||
              (isKs2
                ? [
                    'On the one hand...',
                    'For example...',
                    'On the other hand...',
                    'This was important because...',
                    'Overall, I think that...',
                  ]
                : [
                    'On the one hand...',
                    'For example...',
                    'On the other hand...',
                    'Consequently...',
                    'Overall, while...',
                  ]);
            const modelAnswer = task.model_answer || task.model || '';
            const targetBadge = isKs2
              ? `<span style="background: #1e3a8a; color: #ffffff; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px; display: inline-flex; align-items: center; gap: 6px;"><i class="fa-solid fa-award" style="color: #93c5fd;"></i> Key Stage 2 Historian Investigation</span>`
              : isKs3
                ? `<span style="background: #0f766e; color: #ffffff; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px; display: inline-flex; align-items: center; gap: 6px;"><i class="fa-solid fa-bridge" style="color: #5eead4;"></i> Planning Bridge &bull; Evidence Extraction</span>`
                : `<span style="background: #0f766e; color: #ffffff; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px; display: inline-flex; align-items: center; gap: 6px;"><i class="fa-solid fa-bullseye" style="color: #5eead4;"></i> Target: Paper 1 Q5/Q6 Evaluative Essay [16+4 Marks]</span>`;
            const synthesisTitle = isKs2
              ? `<i class="fa-solid fa-pen-nib"></i> Paragraph Builder: Historian Writing`
              : isKs3
                ? `<i class="fa-solid fa-pen-nib"></i> Paragraph Builder &bull; Evaluative Synthesis`
                : `<i class="fa-solid fa-pen-nib"></i> GCSE Paragraph Builder: Evaluative Synthesis`;
            const placeholderText = isKs2
              ? 'Use the clues and evidence above to write your historian explanation...'
              : isKs3
                ? 'Combine the evidence and counter-evidence above to write your complex, balanced analytical paragraph...'
                : 'Combine the evidence and counter-evidence above to write your complex, balanced GCSE exam paragraph...';

            htmlTasks += `
              <div class="task-box two-sided-argument-interactive" style="margin-bottom: 25px; background: #ffffff; padding: 20px; border-radius: 10px; border: 2px solid #0f766e; box-shadow: 0 4px 12px rgba(15, 118, 110, 0.08);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #ccfbf1; padding-bottom: 10px; flex-wrap: wrap; gap: 8px;">
                  <h4 style="margin: 0; color: #0f766e; font-size: 1.15rem;"><i class="fa-solid fa-scale-balanced" style="margin-right: 8px;"></i> ${qNumPrefix}${task.topic || task.text || 'Two-Sided Argument Analysis'}</h4>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <button type="button" class="btn-reveal-all-t3 no-print" onclick="window.toggleTask3Mask && window.toggleTask3Mask(this)" style="background: #ecfdf5; border: 1.5px solid #6ee7b7; color: #065f46; font-size: 0.78rem; font-weight: 700; padding: 4px 10px; border-radius: 4px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s ease;">
                      <i class="fa-solid fa-chalkboard-user"></i> <span>Teacher Whiteboard Key</span>
                    </button>
                    ${targetBadge}
                  </div>
                </div>
                ${task.question ? `<div style="font-size: 1.05rem; font-weight: 700; color: #0f172a; margin-bottom: 10px; line-height: 1.5; padding: 10px 14px; background: #f0fdf4; border-left: 4px solid #0f766e; border-radius: 0 6px 6px 0;"><strong>Question:</strong> ${task.question}</div>` : ''}
                ${task.instruction ? `<p style="font-size: 0.95rem; color: #475569; font-style: italic; margin-top: 0; margin-bottom: 15px;">${task.instruction}</p>` : ''}
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-bottom: 16px;">
                  <!-- Side 1: Advancement / Progress -->
                  <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 8px; padding: 14px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #86efac; padding-bottom: 6px; margin-bottom: 10px;">
                      <h5 style="margin: 0; color: #166534; font-size: 1rem; display: flex; align-items: center; gap: 6px;">
                        <i class="fa-solid fa-arrow-trend-up"></i> ${advTitle}
                      </h5>
                      <span style="font-size: 0.72rem; color: #15803d; font-weight: 700; text-transform: uppercase;">Tap to Reveal</span>
                    </div>
                    <ul style="margin: 0 0 12px 0; padding: 0; list-style: none;">
                      ${advPoints
                        .map(
                          (pt, pIdx) => `
                        <li class="t3-evidence-item" onclick="window.toggleSingleEvidence && window.toggleSingleEvidence(this)" style="margin-bottom: 8px; cursor: pointer; transition: all 0.15s ease;">
                          <div style="background: #ffffff; border: 1.5px dashed #86efac; border-radius: 6px; padding: 8px 10px; display: flex; align-items: flex-start; gap: 8px;">
                            <span style="background: #dcfce7; color: #166534; font-size: 0.75rem; font-weight: 800; width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;">${pIdx + 1}</span>
                            <div style="flex: 1;">
                              <span class="t3-evidence-prompt" style="font-size: 0.85rem; font-weight: 700; color: #15803d; display: flex; align-items: center; justify-content: space-between;">
                                <span>Evidence Point ${pIdx + 1} &bull; Click to Reveal</span>
                                <i class="fa-solid fa-eye" style="font-size: 0.8rem; opacity: 0.7;"></i>
                              </span>
                              <div class="t3-evidence-revealed" style="display: none; font-size: 0.9rem; color: #1e293b; line-height: 1.45;">
                                ${pt}
                              </div>
                            </div>
                          </div>
                        </li>
                      `,
                        )
                        .join('')}
                    </ul>
                    ${
                      advStarter
                        ? `
                      <div class="t3-starter-box" onclick="window.toggleSingleStarter && window.toggleSingleStarter(this)" style="cursor: pointer; padding: 8px 10px; background: #ffffff; border-left: 3px solid #22c55e; border-radius: 4px; font-size: 0.85rem; color: #15803d; font-style: italic; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
                        <span class="t3-starter-prompt" style="font-weight: 700; display: flex; align-items: center; justify-content: space-between;">
                          <span><i class="fa-solid fa-pen"></i> Evidence Sentence Stem (Click to Reveal)</span>
                          <i class="fa-solid fa-eye" style="font-size: 0.8rem;"></i>
                        </span>
                        <span class="t3-starter-revealed" style="display: none;"><strong>Evidence Stem:</strong> &ldquo;${advStarter}&rdquo;</span>
                      </div>
                    `
                        : ''
                    }
                  </div>

                  <!-- Side 2: Limitations / Continuity -->
                  <div style="background: #fff1f2; border: 1.5px solid #fecdd3; border-radius: 8px; padding: 14px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #fecdd3; padding-bottom: 6px; margin-bottom: 10px;">
                      <h5 style="margin: 0; color: #9f1239; font-size: 1rem; display: flex; align-items: center; gap: 6px;">
                        <i class="fa-solid fa-hand"></i> ${limTitle}
                      </h5>
                      <span style="font-size: 0.72rem; color: #be123c; font-weight: 700; text-transform: uppercase;">Tap to Reveal</span>
                    </div>
                    <ul style="margin: 0 0 12px 0; padding: 0; list-style: none;">
                      ${limPoints
                        .map(
                          (pt, pIdx) => `
                        <li class="t3-evidence-item" onclick="window.toggleSingleEvidence && window.toggleSingleEvidence(this)" style="margin-bottom: 8px; cursor: pointer; transition: all 0.15s ease;">
                          <div style="background: #ffffff; border: 1.5px dashed #fecdd3; border-radius: 6px; padding: 8px 10px; display: flex; align-items: flex-start; gap: 8px;">
                            <span style="background: #ffe4e6; color: #9f1239; font-size: 0.75rem; font-weight: 800; width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;">${pIdx + 1}</span>
                            <div style="flex: 1;">
                              <span class="t3-evidence-prompt" style="font-size: 0.85rem; font-weight: 700; color: #be123c; display: flex; align-items: center; justify-content: space-between;">
                                <span>Counter-Evidence ${pIdx + 1} &bull; Click to Reveal</span>
                                <i class="fa-solid fa-eye" style="font-size: 0.8rem; opacity: 0.7;"></i>
                              </span>
                              <div class="t3-evidence-revealed" style="display: none; font-size: 0.9rem; color: #1e293b; line-height: 1.45;">
                                ${pt}
                              </div>
                            </div>
                          </div>
                        </li>
                      `,
                        )
                        .join('')}
                    </ul>
                    ${
                      limStarter
                        ? `
                      <div class="t3-starter-box" onclick="window.toggleSingleStarter && window.toggleSingleStarter(this)" style="cursor: pointer; padding: 8px 10px; background: #ffffff; border-left: 3px solid #f43f5e; border-radius: 4px; font-size: 0.85rem; color: #be123c; font-style: italic; box-shadow: 0 1px 2px rgba(0,0,0,0.03);">
                        <span class="t3-starter-prompt" style="font-weight: 700; display: flex; align-items: center; justify-content: space-between;">
                          <span><i class="fa-solid fa-pen"></i> Counter-Sentence Stem (Click to Reveal)</span>
                          <i class="fa-solid fa-eye" style="font-size: 0.8rem;"></i>
                        </span>
                        <span class="t3-starter-revealed" style="display: none;"><strong>Counter-Stem:</strong> &ldquo;${limStarter}&rdquo;</span>
                      </div>
                    `
                        : ''
                    }
                  </div>
                </div>

                <!-- Synthesis: Paragraph Builder -->
                <div style="background: #fffbeb; border: 1.5px solid #fcd34d; border-radius: 8px; padding: 14px;">
                  <h5 style="margin: 0 0 8px 0; color: #92400e; font-size: 1rem; display: flex; align-items: center; gap: 6px;">
                    ${synthesisTitle}
                  </h5>
                  <p style="font-size: 0.92rem; color: #78350f; font-weight: 600; margin: 0 0 10px 0;">${synthesisPrompt}</p>
                  
                  <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; align-items: center;">
                    <span style="font-size: 0.78rem; font-weight: 700; color: #92400e; text-transform: uppercase;">Analytical Connectives (Click to Insert):</span>
                    ${connectives.map((c) => `<button type="button" class="connective-chip" data-connective="${c.replace(/"/g, '&quot;')}" style="background: #ffffff; border: 1px solid #fde68a; color: #b45309; padding: 3px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.15s ease;" title="Click to insert at cursor">${c}</button>`).join('')}
                  </div>

                  <textarea class="interactive-textarea" style="width: 100%; box-sizing: border-box; min-height: 90px; padding: 10px; border: 1px solid #fde68a; border-radius: 6px; font-size: 0.92rem; font-family: inherit; resize: vertical;" placeholder="${placeholderText}"></textarea>

                  ${
                    modelAnswer
                      ? `
                    <details class="model-paragraph-reveal" style="margin-top: 12px; border: 1px dashed #d97706; border-radius: 6px; padding: 8px 12px; background: #fffbeb;">
                      <summary style="cursor: pointer; color: #b45309; font-weight: 700; font-size: 0.88rem; outline: none; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-eye"></i> [ Show Examiner-Grade Model Paragraph ]</summary>
                      <div class="scaffold-box model-box" style="margin-top: 10px; padding: 12px 15px; background: #ffffff; border-left: 3px solid #f59e0b; border-radius: 4px; font-size: 0.92rem; color: #78350f; line-height: 1.6; border: 1px solid #fde68a;">
                        ${modelAnswer}
                      </div>
                    </details>
                  `
                      : ''
                  }
                </div>
              </div>
            `;
            return;
          }
          if (task.type === 'two_features') {
            const taskTitle =
              task.tariff ||
              task.title ||
              task.topic ||
              'Question 1: Describe Two Features [4 marks • 5 mins]';
            const f1 = task.feature_1 || {
              prompt:
                'Feature 1: Identify one key feature and provide supporting historical detail.',
              starter: 'One key feature was... Specifically, this involved...',
              model: '',
            };
            const f2 = task.feature_2 || {
              prompt:
                'Feature 2: Identify a second key feature and provide supporting historical detail.',
              starter: 'A second key feature was... For example, this meant that...',
              model: '',
            };

            htmlTasks += `
              <div class="task-box two-features-task-card" style="margin-bottom: 25px; background: #ffffff; padding: 22px; border-radius: 10px; border: 2px solid #0284c7; box-shadow: 0 4px 14px rgba(2, 132, 199, 0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 2px solid #e0f2fe; padding-bottom: 12px; flex-wrap: wrap; gap: 8px;">
                  <h4 style="margin: 0; color: #0369a1; font-size: 1.15rem; font-weight: 800; display: flex; align-items: center; gap: 8px;">
                    <i class="fa-solid fa-list-check" style="color: #0284c7;"></i>
                    <span>${taskTitle}</span>
                  </h4>
                  <span style="background: #0284c7; color: #ffffff; font-size: 0.72rem; font-weight: 800; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px; display: inline-flex; align-items: center; gap: 6px;">
                    <i class="fa-solid fa-clipboard-question"></i> 4 MARKS &bull; FEATURE DRILL
                  </span>
                </div>

                <div class="two-features-prompt" style="font-size: 1.05rem; font-weight: 700; color: #0f172a; margin-bottom: 16px; line-height: 1.5; background: #f0f9ff; padding: 12px 16px; border-left: 4px solid #0284c7; border-radius: 0 6px 6px 0;">
                  ${formatBold ? formatBold(task.question || '') : task.question || ''}
                </div>

                <!-- Feature 1 -->
                <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 14px; margin-bottom: 14px;">
                  <div style="font-weight: 800; color: #0369a1; font-size: 0.92rem; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                    <span style="background: #0284c7; color: #fff; width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.75rem;">1</span>
                    ${f1.prompt || 'Feature 1: Identify one key feature and provide supporting historical detail.'}
                  </div>
                  ${f1.starter ? `<div style="font-size: 0.82rem; color: #64748b; font-style: italic; margin-bottom: 6px;"><strong>Starter:</strong> &ldquo;${f1.starter}&rdquo;</div>` : ''}
                  <textarea class="interactive-textarea student-answer-input" style="width: 100%; box-sizing: border-box; min-height: 75px; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.92rem; line-height: 1.5;" placeholder="${f1.starter || 'One key feature was... Specifically, this involved...'}"></textarea>
                  ${
                    f1.model
                      ? `
                    <details style="margin-top: 8px;">
                      <summary style="cursor: pointer; color: #0369a1; font-weight: 700; font-size: 0.82rem;"><i class="fa-solid fa-eye"></i> [ Reveal Feature 1 Model ]</summary>
                      <div style="margin-top: 6px; padding: 10px; background: #ffffff; border-left: 3px solid #0284c7; border-radius: 4px; font-size: 0.88rem; color: #1e293b; line-height: 1.5;">${formatBold ? formatBold(f1.model) : f1.model}</div>
                    </details>
                  `
                      : ''
                  }
                </div>

                <!-- Feature 2 -->
                <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 14px;">
                  <div style="font-weight: 800; color: #0369a1; font-size: 0.92rem; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                    <span style="background: #0284c7; color: #fff; width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.75rem;">2</span>
                    ${f2.prompt || 'Feature 2: Identify a second key feature and provide supporting historical detail.'}
                  </div>
                  ${f2.starter ? `<div style="font-size: 0.82rem; color: #64748b; font-style: italic; margin-bottom: 6px;"><strong>Starter:</strong> &ldquo;${f2.starter}&rdquo;</div>` : ''}
                  <textarea class="interactive-textarea student-answer-input" style="width: 100%; box-sizing: border-box; min-height: 75px; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.92rem; line-height: 1.5;" placeholder="${f2.starter || 'A second key feature was... For example, this meant that...'}"></textarea>
                  ${
                    f2.model
                      ? `
                    <details style="margin-top: 8px;">
                      <summary style="cursor: pointer; color: #0369a1; font-weight: 700; font-size: 0.82rem;"><i class="fa-solid fa-eye"></i> [ Reveal Feature 2 Model ]</summary>
                      <div style="margin-top: 6px; padding: 10px; background: #ffffff; border-left: 3px solid #0284c7; border-radius: 4px; font-size: 0.88rem; color: #1e293b; line-height: 1.5;">${formatBold ? formatBold(f2.model) : f2.model}</div>
                    </details>
                  `
                      : ''
                  }
                </div>
              </div>
            `;
            return;
          }
          if (task.type === 'extended_writing' || task.type === 'narrative_account') {
            const hasTaskPrefix = task.topic && /^Task\s*\d+/i.test(task.topic);
            const isKs2 =
              window.currentUnitId === 'ks2_ww2' ||
              (typeof unit !== 'undefined' && unit && (unit.is_ks2 || unit.id === 'ks2_ww2'));
            const isKs3 =
              !isKs2 &&
              (window.currentUnitId === 'early_modern_world' ||
                window.currentUnitId === 'water_and_sanitation' ||
                window.currentUnitId === 'great_war' ||
                window.currentUnitId === 'great_war_part2' ||
                window.currentUnitId === 'medieval_england' ||
                window.currentUnitId === 'industrialisation_and_empire' ||
                (typeof unit !== 'undefined' && unit && unit.is_ks3));
            const qNumPrefix =
              task.qNum && !hasTaskPrefix && !isKs3 && !isKs2 ? `Q${task.qNum}. ` : '';
            const taskTitle =
              task.tariff ||
              task.title ||
              task.topic ||
              (isKs2
                ? 'Historian Writing Challenge'
                : isKs3
                  ? 'Enquiry Writing Task'
                  : 'Task 4: Analytical Synthesis & Historical Essay');
            const badgeText =
              task.badge ||
              (isKs2
                ? 'Key Stage 2 Historian Challenge'
                : isKs3
                  ? task.type === 'narrative_account'
                    ? '8 MARKS &bull; NARRATIVE ACCOUNT'
                    : 'KS3 Enquiry Essay &bull; Structured Writing'
                  : 'GCSE Analytical Masterclass');
            const questionPrompt = task.question || task.text || task.prompt || '';
            const hints = Array.isArray(task.hints) ? task.hints : [];
            const modelAnswer = task.model_answer || task.model || '';
            const ks2Connectives = [
              'In the beginning, ...',
              'This was important because ...',
              'The evidence shows that ...',
              'Another reason was ...',
              'Overall, I think that ...',
            ];
            const essayConnectives =
              (task.scaffolding && task.scaffolding.connective_bank) ||
              (isKs2
                ? ks2Connectives
                : [
                    'To a large extent, it can be argued that...',
                    'In particular, a decisive factor was...',
                    'Furthermore, this created severe consequences because...',
                    'On the other hand, an alternative perspective is that...',
                    'In conclusion, the decisive reason why...',
                  ]);

            let peelHtml = '';
            if (hints.length > 0) {
              const isNarrative = task.type === 'narrative_account';
              const peelColors = [
                { letter: 'P', label: 'Point', bg: '#eff6ff', border: '#93c5fd', text: '#1e40af' },
                {
                  letter: 'E',
                  label: 'Evidence',
                  bg: '#f0fdf4',
                  border: '#86efac',
                  text: '#166534',
                },
                {
                  letter: 'E',
                  label: 'Explanation',
                  bg: '#fefce8',
                  border: '#fde047',
                  text: '#854d0e',
                },
                { letter: 'L', label: 'Link', bg: '#faf5ff', border: '#d8b4fe', text: '#6b21a8' },
              ];
              const narrativeColors = [
                {
                  letter: '1',
                  label: 'Beginning (1819)',
                  bg: '#eff6ff',
                  border: '#93c5fd',
                  text: '#1e40af',
                },
                {
                  letter: '2',
                  label: 'Middle (1830)',
                  bg: '#fffbeb',
                  border: '#fcd34d',
                  text: '#b45309',
                },
                {
                  letter: '3',
                  label: 'End (1834)',
                  bg: '#f0fdf4',
                  border: '#86efac',
                  text: '#166534',
                },
              ];
              const cfgList = isNarrative ? narrativeColors : peelColors;
              peelHtml = `
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 10px;">
                  ${hints
                    .map((hint, hIdx) => {
                      const cfg = cfgList[hIdx % cfgList.length];
                      let cleanHint =
                        typeof hint === 'string'
                          ? hint
                          : hint.prompt || hint.text || hint.desc || '';
                      let label = typeof hint === 'object' && hint.label ? hint.label : cfg.label;
                      if (typeof hint === 'string' && typeof hint.match === 'function') {
                        const splitMatch = hint.match(
                          /^(Point|Evidence|Explanation|Link|Beginning|Middle|End)(?:\s*\([^)]*\))?:\s*(.*)/i,
                        );
                        if (splitMatch) {
                          label = isNarrative ? cfg.label : splitMatch[1];
                          cleanHint = splitMatch[2];
                        }
                      }
                      return `
                      <div style="background: ${cfg.bg}; border: 1.5px solid ${cfg.border}; border-radius: 6px; padding: 10px 12px; display: flex; flex-direction: column; gap: 4px;">
                        <div style="display: flex; align-items: center; gap: 6px; font-weight: 800; font-size: 0.82rem; color: ${cfg.text}; text-transform: uppercase;">
                          <span style="background: ${cfg.text}; color: #ffffff; width: 18px; height: 18px; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.72rem;">${cfg.letter}</span>
                          ${label}
                        </div>
                        <div style="font-size: 0.88rem; color: #1e293b; line-height: 1.45;">
                          ${cleanHint}
                        </div>
                      </div>
                    `;
                    })
                    .join('')}
                </div>
              `;
            }

            htmlTasks += `
              <div class="task-box extended-writing-task-card" style="margin-bottom: 25px; background: #ffffff; padding: 22px; border-radius: 10px; border: 2px solid #0284c7; box-shadow: 0 4px 14px rgba(2, 132, 199, 0.1);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 2px solid #e0f2fe; padding-bottom: 12px;">
                  <h4 style="margin: 0; color: #0369a1; font-size: 1.15rem; font-weight: 800; display: flex; align-items: center; gap: 8px;">
                    <i class="fa-solid fa-feather-pointed" style="color: #0284c7;"></i>
                    <span>${qNumPrefix}${taskTitle}</span>
                  </h4>
                  <span style="background: #0284c7; color: #ffffff; font-size: 0.72rem; font-weight: 800; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px; display: inline-flex; align-items: center; gap: 6px;">
                    <i class="fa-solid fa-graduation-cap"></i> ${badgeText}
                  </span>
                </div>

                ${
                  questionPrompt
                    ? `
                  <div class="extended-writing-prompt" style="font-size: 1.08rem; font-weight: 700; color: #0f172a; margin-bottom: 16px; line-height: 1.5; background: #f0f9ff; padding: 14px 18px; border-left: 4px solid #0284c7; border-radius: 0 6px 6px 0;">
                    <span style="display: block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; color: #0284c7; margin-bottom: 4px; font-weight: 800;">Enquiry Question:</span>
                    ${questionPrompt}
                  </div>
                `
                    : ''
                }

                ${
                  peelHtml
                    ? `
                  <details class="peel-scaffolding-drawer no-print" style="margin-bottom: 16px; background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; overflow: hidden;" closed>
                    <summary style="padding: 10px 14px; cursor: pointer; font-size: 0.88rem; font-weight: 800; color: #0369a1; background: #f1f5f9; display: flex; align-items: center; justify-content: space-between; user-select: none;">
                      <span style="display: flex; align-items: center; gap: 8px;">
                        <i class="${task.type === 'narrative_account' ? 'fa-solid fa-arrow-down-wide-short' : 'fa-solid fa-chalkboard-user'}" style="color: #0284c7;"></i>
                        <span>${isKs2 ? 'Historian Writing Scaffolds &bull; Helpful Sentence Starters' : task.type === 'narrative_account' ? 'Chronological Narrative Scaffolding &bull; 3-Stage Sequence (Beginning, Middle, End)' : 'PEEL Analytical Writing Scaffolds &bull; Sentence Stems'}</span>
                      </span>
                      <span style="font-size: 0.75rem; font-weight: 700; background: #e0f2fe; color: #0369a1; padding: 3px 8px; border-radius: 4px; display: inline-flex; align-items: center; gap: 4px;">
                        <i class="fa-solid fa-eye"></i> Click to Reveal Scaffolding
                      </span>
                    </summary>
                    <div style="padding: 14px; background: #ffffff;">
                      ${peelHtml}
                    </div>
                  </details>
                `
                    : ''
                }

                <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-top: 12px;">
                  <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; align-items: center;">
                    <span style="font-size: 0.78rem; font-weight: 700; color: #0369a1; text-transform: uppercase;">${isKs2 ? 'Helpful Sentence Starters (Click to Insert):' : task.type === 'narrative_account' ? 'Chronological & Causal Connectives (Click to Insert):' : 'Analytical Connectives (Click to Insert):'}</span>
                    ${essayConnectives.map((c) => `<button type="button" class="connective-chip" data-connective="${c.replace(/"/g, '&quot;')}" style="background: #ffffff; border: 1px solid #bfdbfe; color: #1e40af; padding: 3px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.15s ease;" title="Click to insert at cursor">${c}</button>`).join('')}
                  </div>

                  <label style="display: block; font-size: 0.85rem; font-weight: 700; color: #1e293b; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;">${isKs2 ? 'Your Historian Response:' : task.type === 'narrative_account' ? 'Student Response &bull; Chronological 3-Paragraph Narrative Account (Beginning, Middle, End):' : 'Student Response &bull; Structured Historical Argument:'}</label>
                  <textarea class="interactive-textarea student-answer-input" style="width: 100%; box-sizing: border-box; min-height: 140px; padding: 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.95rem; line-height: 1.6; font-family: inherit; resize: vertical;" placeholder="${isKs2 ? 'Write your historian answer using the clues and key words above...' : task.type === 'narrative_account' ? 'Write your 3-paragraph narrative account following the chronological sequence (Beginning: Peterloo ➔ Middle: Swing Riots ➔ End: Tolpuddle)...' : 'Using the PEEL structure and historical evidence above, write your analytical essay paragraph...'}" oninput="window.updateProgress()"></textarea>

                  ${
                    modelAnswer
                      ? `
                    <details class="model-paragraph-reveal" style="margin-top: 14px; border: 1px dashed #0284c7; border-radius: 8px; padding: 10px 14px; background: #ffffff;">
                      <summary style="cursor: pointer; color: #0369a1; font-weight: 700; font-size: 0.9rem; outline: none; display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-eye"></i> ${isKs2 ? '[ Show Model Historian Answer ]' : '[ Show Examiner-Grade Model Response ]'}
                      </summary>
                      <div class="scaffold-box model-box" style="margin-top: 12px; padding: 14px 16px; background: #f8fafc; border-left: 4px solid #0284c7; border-radius: 4px; font-size: 0.95rem; color: #1e293b; line-height: 1.65; border: 1px solid #e2e8f0; font-family: 'Georgia', serif;">
                        ${
                          modelAnswer.includes('\n\n')
                            ? modelAnswer
                                .split(/\n\s*\n/)
                                .map(
                                  (p) =>
                                    `<p style="margin: 0 0 10px 0; line-height: 1.65;">${formatBold ? formatBold(p) : p}</p>`,
                                )
                                .join('')
                            : formatBold
                              ? formatBold(modelAnswer)
                              : modelAnswer
                        }
                      </div>
                    </details>
                  `
                      : ''
                  }
                </div>
              </div>
            `;
            return;
          }
          let rawQText = typeof task === 'string' ? task : task.question || task.text || '';
          let cleaned = rawQText.replace(/^(Enquiry:|Q\d+:|Task \d+:|Question \d+[a-z]?:)\s*/i, '');
          let qText = typeof formatBold !== 'undefined' ? formatBold(cleaned) : cleaned;
          let clueParaMatch = qText.match(/\((P|Para\s*)(\d+)\)$/i);
          let clueBtn = '';
          if (clueParaMatch) {
            qText = qText.replace(clueParaMatch[0], '').trim();
            clueBtn = `<button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-icon-only btn-pedagogy-clue" title="Find Evidence" data-action="scroll-to-para" data-target="para-${clueParaMatch[2]}"><i class="fa-solid fa-magnifying-glass"></i></button>`;
          }

          let match = qText.match(/^([A-Za-z0-9'\-\/ ]+):\s*([\s\S]*)/);
          let displayHeading = '';
          if (task.title) {
            displayHeading = `<div style="font-size: 1.15rem; color: #0284c7; margin-bottom: 6px; font-weight: 800;">${task.title}</div>`;
          } else if (task.topic) {
            displayHeading = `<div style="font-size: 1.15rem; color: #0284c7; margin-bottom: 6px; font-weight: 800;">${task.topic}</div>`;
          } else if (match && match[2] && match[2].length > 15) {
            displayHeading = `<div style="font-size: 1.15rem; color: #0284c7; margin-bottom: 6px; font-weight: 800;">${match[1]}</div>`;
            qText = match[2];
          }
          if (qText && qText.includes('\n')) {
            qText = qText.replace(/\n/g, '<br>');
          }

          htmlTasks += `
            <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
              ${displayHeading}
              <div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">
                ${task.qNum ? `Q${task.qNum}. ` : ''}${qText}
                <span style="display: inline-flex; vertical-align: middle;">
                  ${clueBtn}
                  ${task.starter ? `<button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-icon-only btn-pedagogy-starter" title="Sentence Starter" data-action="toggle-element" data-target-id="starter-${tIdx}"><i class="fa-solid fa-pen"></i></button>` : ''}
                  ${task.clue ? `<button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-icon-only btn-pedagogy-clue" title="Clue" data-action="toggle-element" data-target-id="clue-${tIdx}"><i class="fa-solid fa-lightbulb"></i></button>` : ''}
                  ${task.model || task.model_answer || task.answer ? `<button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-icon-only btn-pedagogy-model" title="Reveal Model Answer" data-action="toggle-element" data-target-id="model-${tIdx}"><i class="fa-solid fa-check-double"></i></button>` : ''}
                </span>
              </div>
              <textarea class="student-answer-input" placeholder="Write your response here..." oninput="window.updateProgress()"></textarea>

              ${task.starter ? `<div id="starter-${tIdx}" class="scaffold-box starter-box" style="display:none;"><strong>Sentence Starter:</strong> ${task.starter}</div>` : ''}
              ${task.clue ? `<div id="clue-${tIdx}" class="scaffold-box clue-box" style="display:none;"><strong>Clue Hint:</strong> ${task.clue}</div>` : ''}
              ${task.model || task.model_answer || task.answer ? `<div id="model-${tIdx}" class="scaffold-box model-box" style="display:none;">${formatBold(task.model || task.model_answer || task.answer)}</div>` : ''}
            </div>
          `;
        });
        htmlTasks += `</div></details>`;
      }
    }

    if (lesson.essay_planning) {
      const ep = lesson.essay_planning;
      htmlHistorian += `
        <div class="phase-card essay-planning-card" style="margin-top: 30px; border: 2px solid #2563eb; border-radius: 10px; background: #ffffff; overflow: hidden; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.08);">
          <div style="background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%); color: #ffffff; padding: 14px 20px; display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.25rem;">⚖️</span>
              <div>
                <h3 style="margin: 0; font-size: 1.15rem; font-family: 'Playfair Display', serif; color: #ffffff;">16-Mark Essay Planning Matrix (2&times;2)</h3>
                <span style="font-size: 0.75rem; color: #bfdbfe; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Edexcel Paper 1 &bull; Section B (Q5/Q6) &bull; ${ep.marks || '16 Marks + 4 SPaG'}</span>
              </div>
            </div>
            <span style="background: rgba(255, 255, 255, 0.2); color: #ffffff; font-size: 0.78rem; font-weight: 800; padding: 4px 10px; border-radius: 20px;">Target: Level 4 (13–16 Marks)</span>
          </div>
          
          <div style="padding: 20px;">
            <div style="background: #f8fafc; border-left: 4px solid #2563eb; border-radius: 0 6px 6px 0; padding: 12px 16px; margin-bottom: 18px;">
              <div style="font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Statement to Evaluate:</div>
              <div style="font-size: 1.05rem; font-weight: 700; color: #0f172a; line-height: 1.4;">${ep.statement}</div>
              ${ep.stimulus && ep.stimulus.length > 0 ? `<div style="font-size: 0.85rem; color: #475569; margin-top: 6px;"><strong>Stimulus points provided:</strong> ${ep.stimulus.join(' &bull; ')} <em>(You must also use information of your own)</em></div>` : ''}
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 18px;">
              <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 8px; padding: 16px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px; border-bottom: 1.5px solid #bbf7d0; padding-bottom: 8px;">
                  <span style="background: #16a34a; color: white; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 900;">✓</span>
                  <strong style="color: #166534; font-size: 0.92rem; text-transform: uppercase; letter-spacing: 0.5px;">Factors Supporting Statement (Agree)</strong>
                </div>
                <ul style="margin: 0; padding-left: 18px; color: #14532d; font-size: 0.9rem; line-height: 1.55;">
                  ${(ep.supporting_factors || []).map((f) => `<li style="margin-bottom: 8px;">${formatBold(f)}</li>`).join('')}
                </ul>
              </div>

              <div style="background: #eff6ff; border: 1.5px solid #93c5fd; border-radius: 8px; padding: 16px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px; border-bottom: 1.5px solid #bfdbfe; padding-bottom: 8px;">
                  <span style="background: #2563eb; color: white; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 900;">⇄</span>
                  <strong style="color: #1e40af; font-size: 0.92rem; text-transform: uppercase; letter-spacing: 0.5px;">Counter-Factors / Other Factors (Disagree)</strong>
                </div>
                <ul style="margin: 0; padding-left: 18px; color: #1e3a8a; font-size: 0.9rem; line-height: 1.55;">
                  ${(ep.counter_factors || []).map((f) => `<li style="margin-bottom: 8px;">${formatBold(f)}</li>`).join('')}
                </ul>
              </div>
            </div>

            ${
              ep.criteria_prompt
                ? `
            <div style="background: #fffbeb; border: 1.5px solid #fde68a; border-radius: 8px; padding: 12px 16px; margin-bottom: 16px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span style="color: #b45309; font-weight: bold;">⚖️</span>
                <strong style="color: #92400e; font-size: 0.88rem; text-transform: uppercase; letter-spacing: 0.5px;">Level 4 Evaluative Judgment Criteria:</strong>
              </div>
              <p style="margin: 0; font-size: 0.9rem; color: #78350f; line-height: 1.5; font-style: italic;">
                ${formatBold(ep.criteria_prompt)}
              </p>
            </div>`
                : ''
            }

            <div>
              <label style="display: block; font-size: 0.85rem; font-weight: 700; color: #475569; margin-bottom: 6px;">
                <i class="fa-solid fa-pen-to-square"></i> Student Planning Scratchpad (Prioritize your factor hierarchy &amp; concluding judgment):
              </label>
              <textarea class="student-answer-input" placeholder="Jot down your 3 paragraph themes (1 agree, 2 other factors) and your overall criteria-based verdict here..." style="min-height: 80px; width: 100%; box-sizing: border-box;"></textarea>
            </div>
          </div>
        </div>
      `;
    }
  }

  if (false && lesson.pair_share) {
    const ps = lesson.pair_share;
    const thinkText = ps.think || 'Consider the key historical factors discussed in this lesson.';
    const pairText =
      ps.pair ||
      'Discuss your ideas with your partner. Compare your reasons and evidence, and refine your explanation.';
    const shareText =
      ps.share ||
      'Be prepared to share your argument with the class using analytical sentence starters.';
    const startersHtml =
      ps.starters && ps.starters.length > 0
        ? `<div style="margin-top: 15px; background: white; padding: 12px 16px; border-radius: 6px; border-left: 4px solid #10b981; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
             <strong style="color: #065f46; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px;">Sentence Starters:</strong>
             ${ps.starters.map((s) => `<div style="font-size: 0.95rem; color: #166534; margin-top: 4px;">• <em>${s}</em></div>`).join('')}
           </div>`
        : '';
    htmlPairShare += `
        <details style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 6px; margin-bottom: 15px; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.05);" closed>
            <summary style="padding: 10px 15px; cursor: pointer; color: #059669; font-weight: bold; font-size: 1.05rem; background: #ecfdf5; list-style: none; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #a7f3d0;">
              <span><i class="fa-solid fa-users" style="color: #059669; margin-right: 10px;"></i> Think, Pair, Share</span>
            </summary>
            <div style="padding: 20px; background: #ecfdf5;">
              <p style="font-size: 1.15rem; font-weight: 700; color: #065f46; margin-top: 0;">${ps.qNum ? `Q${ps.qNum}. ` : ''}${ps.prompt}</p>
              ${
                ps.dilemma_scale
                  ? `
                <div class="dilemma-scale-box" style="margin: 15px 0 20px 0; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.04);">
                  <div style="text-align: center; font-weight: 800; color: #1e3a8a; font-size: 1rem; margin-bottom: 12px; display: flex; align-items: center; justify-content: center; gap: 8px;">
                    <i class="fa-solid fa-scale-balanced" style="color: #0284c7;"></i> ${ps.dilemma_scale.title}
                  </div>
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; align-items: stretch;">
                    <div style="background: #fef2f2; border: 1px solid #fecaca; border-top: 3px solid #ef4444; border-radius: 6px; padding: 12px;">
                      <div style="font-weight: 700; color: #b91c1c; font-size: 0.92rem; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: center;">
                        <span>${ps.dilemma_scale.side_a.actor}</span>
                        <span style="font-size: 0.75rem; background: #fee2e2; color: #991b1b; padding: 2px 6px; border-radius: 4px;">${ps.dilemma_scale.side_a.tag}</span>
                      </div>
                      <ul style="margin: 6px 0 0 0; padding-left: 16px; font-size: 0.85rem; color: #7f1d1d; line-height: 1.45;">
                        ${ps.dilemma_scale.side_a.points.map((p) => `<li style="margin-bottom: 4px;">${p}</li>`).join('')}
                      </ul>
                    </div>
                    <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-top: 3px solid #3b82f6; border-radius: 6px; padding: 12px;">
                      <div style="font-weight: 700; color: #1d4ed8; font-size: 0.92rem; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: center;">
                        <span>${ps.dilemma_scale.side_b.actor}</span>
                        <span style="font-size: 0.75rem; background: #dbeafe; color: #1e40af; padding: 2px 6px; border-radius: 4px;">${ps.dilemma_scale.side_b.tag}</span>
                      </div>
                      <ul style="margin: 6px 0 0 0; padding-left: 16px; font-size: 0.85rem; color: #1e3a8a; line-height: 1.45;">
                        ${ps.dilemma_scale.side_b.points.map((p) => `<li style="margin-bottom: 4px;">${p}</li>`).join('')}
                      </ul>
                    </div>
                  </div>
                  <div style="text-align: center; margin-top: 10px; font-size: 0.82rem; font-weight: 700; color: #64748b;">
                    <i class="fa-solid fa-arrows-split-up-and-left" style="color: #0f172a; margin-right: 4px;"></i> Pivot: ${ps.dilemma_scale.pivot}
                  </div>
                </div>
              `
                  : ''
              }
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">
                <div style="background: white; padding: 15px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                  <div style="font-weight: bold; color: #059669; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
                    <span><i class="fa-solid fa-brain"></i> 1. Think</span>
                    <button data-action="start-tps-timer" style="background: #10b981; color: white; border: none; border-radius: 4px; padding: 3px 8px; cursor: pointer; font-size: 0.85rem; font-weight: bold;"><i class="fa-regular fa-clock"></i> 60s</button>
                  </div>
                  <p style="margin: 0; font-size: 0.95rem; color: #475569;">${thinkText}</p>
                </div>
                <div style="background: white; padding: 15px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                  <div style="font-weight: bold; color: #059669; margin-bottom: 8px;"><i class="fa-solid fa-comments"></i> 2. Pair</div>
                  <p style="margin: 0; font-size: 0.95rem; color: #475569;">${pairText}</p>
                </div>
                <div style="background: white; padding: 15px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                  <div style="font-weight: bold; color: #059669; margin-bottom: 8px;"><i class="fa-solid fa-users"></i> 3. Share</div>
                  <p style="margin: 0; font-size: 0.95rem; color: #475569;">${shareText}</p>
                 </div>
              </div>
              ${startersHtml}
            </div>
          </details>
      `;
  }

  if (lesson.exam_practice) {
    let epQuestions = [];
    let epStimulus = [];
    if (Array.isArray(lesson.exam_practice)) {
      epQuestions = lesson.exam_practice;
    } else {
      epQuestions = lesson.exam_practice.questions || [];
      epStimulus = lesson.exam_practice.stimulus || [];
    }

    if (epQuestions.length > 0 || epStimulus.length > 0) {
      htmlExamPractice += `
          <div class="phase-card" style="margin-top: 30px; border: 2px solid #3b82f6; border-radius: 8px;">
            <div style="background: #eff6ff; padding: 16px 20px; border-bottom: 2px solid #bfdbfe; border-radius: 6px 6px 0 0; margin: -20px -20px 20px -20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
              <div>
                <div style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: #1e40af; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                  <span style="background: #dbeafe; color: #1e40af; padding: 1.5px 7px; border-radius: 4px; font-weight: 800;"><i class="fa-solid fa-book-open" style="margin-right: 4px;"></i> PUPIL WORKBOOK COMPANION</span>
                  <span style="color: #94a3b8;">&bull;</span>
                  <span>RIGHT-HAND SPREAD (RECTO)</span>
                </div>
                <h3 style="margin: 0; color: #1e3a8a; font-size: 1.25rem; font-family: 'Playfair Display', Georgia, serif; display: flex; align-items: center; gap: 8px;">
                  <i class="fa-solid fa-graduation-cap" style="color: #2563eb;"></i> Pupil Workbook Activity &bull; GCSE Examination Practice
                </h3>
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-model" data-action="reveal-all-models"><i class="fa-solid fa-magnifying-glass"></i> Reveal All Models</button>
              </div>
            </div>
        `;
      const formatExamQuestionTitle = (qText, fallbackIdx, qObj) => {
        if (!qText) return '';
        let str = qText.trim();
        // Remove redundant top line like "Describe two features of battlefield trauma and protective equipment on the Western Front:"
        str = str.replace(/^Describe two features of[^\n:]+:\s*\n?/i, '');

        const qType = (qObj?.type || '').toLowerCase();
        const qTariff = (qObj?.tariff || '').toLowerCase();

        // 1. Follow-up enquiry (Edexcel Paper 1 Q2b)
        if (qType.includes('follow_up') || /follow up source/i.test(str)) {
          let cleanStr = str.replace(/^(?:Q\d+[\.:\s]+|Question\s+\d+[\.:\s]+)*/i, '');
          cleanStr = cleanStr.replace(/\n/g, '<br>');
          return `Question 2(b) [4 marks]: ${typeof formatBold !== 'undefined' ? formatBold(cleanStr) : cleanStr}`;
        }

        // 2. Source Utility (Edexcel Paper 1 Q2a)
        if (
          qType.includes('utility_of_sources') ||
          (qType.includes('utility') && !qType.includes('follow_up')) ||
          /how useful is source/i.test(str)
        ) {
          let cleanStr = str.replace(/^(?:Q\d+[\.:\s]+|Question\s+\d+[\.:\s]+)*/i, '');
          cleanStr = cleanStr.replace(/\[4 marks\]/gi, '[8 marks]'); // Correct 8-mark utility tariff in stem
          cleanStr = cleanStr.replace(/\n/g, '<br>');
          return `Question 2(a) [8 marks]: ${typeof formatBold !== 'undefined' ? formatBold(cleanStr) : cleanStr}`;
        }

        // 3. Feature drills (Edexcel Paper 1 Q1)
        if (
          qType.includes('features') ||
          /feature_drills/i.test(qType) ||
          str.startsWith('(a) Describe one feature') ||
          /Describe one feature/i.test(str)
        ) {
          let cleanStr = str.replace(/^(?:Q\d+[\.:\s]+|Question\s+\d+[\.:\s]+)*/i, '');
          cleanStr = cleanStr.replace(/\n/g, '<br><br>');
          return `Question 1: Feature Drills [4 marks]<br><div style="font-size: 0.98rem; font-weight: 600; color: #1e293b; margin-top: 8px;">${typeof formatBold !== 'undefined' ? formatBold(cleanStr) : cleanStr}</div>`;
        }

        if (/^(?:Q?\d+[\.:\s]+)*3\s*\(([a-d])\)[\.:\s]*/i.test(str)) {
          str = str.replace(/^(?:Q?\d+[\.:\s]+)*3\s*\(([a-d])\)[\.:\s]*/i, 'Q3($1). ');
        } else if (/^(?:Q?\d+[\.:\s]+)*1\s*\(([a-b])\)[\.:\s]*/i.test(str)) {
          str = str.replace(/^(?:Q?\d+[\.:\s]+)*1\s*\(([a-b])\)[\.:\s]*/i, 'Q1($1). ');
        } else if (/^(?:Q?\s*(\d+)[\.:\s]+)+/i.test(str)) {
          str = str.replace(/^(?:Q?\s*(\d+)[\.:\s]+)+/i, (match, p1) => {
            return `Q${p1}. `;
          });
        } else if (!/^(Q\d|Question\s+\d)/i.test(str)) {
          str = `Q${fallbackIdx + 1}. ${str}`;
        }
        str = str.replace(/\n/g, '<br>');
        return typeof formatBold !== 'undefined' ? formatBold(str) : str;
      };

      const getWorkbookTaskMeta = (unitId, lessonId, qObj, qText, qIdx, lesson) => {
        const type = (qObj?.type || '').toLowerCase();
        const text = (qText || '').toLowerCase();
        const tariff = (qObj?.tariff || '').toLowerCase();

        // Parse lesson ID format: e.g. "lesson_1_3" -> kt=1, num=3
        const idMatch = (lessonId || '').match(/lesson_([0-9]+)_([0-9]+)/i);
        const ktNum = idMatch ? parseInt(idMatch[1], 10) : 1;
        const lNum = idMatch ? parseInt(idMatch[2], 10) : 1;

        // 1. EDEXCEL MEDICINE
        if (unitId === 'edexcel_medicine') {
          // Key Topic 5: Western Front (4-page spreads, 28-page saddle stitch booklet)
          if (ktNum === 5) {
            const startPg = 4 + (lNum - 1) * 4;
            const endPg = startPg + 3;

            if (type.includes('features') || text.includes('describe one feature')) {
              return { inWorkbook: true, label: `In Printed Workbook • Page ${endPg}` };
            }
            if (lNum % 2 === 1) {
              if (type.includes('utility') || text.includes('how useful is source')) {
                return {
                  inWorkbook: true,
                  label: `In Printed Workbook • Pages ${startPg}–${endPg}`,
                };
              }
              if (type.includes('follow_up') || text.includes('follow up source')) {
                const nextPractice =
                  lNum === 5 ? 'Lesson 4 (KT5.4)' : `Lesson ${lNum + 1} (KT5.${lNum + 1})`;
                return {
                  inWorkbook: false,
                  label: 'Digital Extension • Not in Printed Workbook',
                  note: `This follow-up enquiry is provided as an optional digital extension. In the printed workbook, Question 2(b) is practiced in ${nextPractice}.`,
                };
              }
            } else {
              if (type.includes('follow_up') || text.includes('follow up source')) {
                return {
                  inWorkbook: true,
                  label: `In Printed Workbook • Pages ${startPg}–${endPg}`,
                };
              }
              if (type.includes('utility') || text.includes('how useful is source')) {
                const prevPractice = `Lesson ${lNum - 1} (KT5.${lNum - 1})`;
                return {
                  inWorkbook: false,
                  label: 'Digital Extension • Not in Printed Workbook',
                  note: `This source utility enquiry is provided as an optional digital extension. In the printed workbook, Question 2(a) is practiced in ${prevPractice}.`,
                };
              }
            }
            return { inWorkbook: true, label: `In Printed Workbook • Pages ${startPg}–${endPg}` };
          }

          // Key Topics 1–4: Medieval, Renaissance, 18th/19th, Modern (20-page booklets, 3-page spreads)
          if (ktNum >= 1 && ktNum <= 4) {
            const part1Pg = 4 + (lNum - 1) * 3 + 1;
            const part2Pg = part1Pg + 1;

            if (
              type.includes('similarity') ||
              type.includes('difference') ||
              tariff.includes('4 mark') ||
              type.includes('4m')
            ) {
              return { inWorkbook: true, label: `In Printed Workbook • Page ${part2Pg}` };
            }
            if (
              type.includes('causal') ||
              type.includes('essay') ||
              tariff.includes('12 mark') ||
              tariff.includes('16 mark') ||
              type.includes('12m') ||
              type.includes('16m')
            ) {
              return {
                inWorkbook: true,
                label: `In Printed Workbook • Pages ${part1Pg}–${part2Pg}`,
              };
            }
            return { inWorkbook: true, label: `In Printed Workbook • Pages ${part1Pg}–${part2Pg}` };
          }
        }

        // 2. EARLY ELIZABETHAN ENGLAND (eee)
        if (unitId === 'eee') {
          const startPg = 2 + lNum * 2;
          const endPg = startPg + 1;

          if (
            type.includes('feature') ||
            text.includes('describe two features') ||
            tariff.includes('4 mark') ||
            type.includes('2m')
          ) {
            return { inWorkbook: true, label: `In Printed Workbook • Page ${endPg}` };
          }
          if (type.includes('explain_why') || tariff.includes('12 mark') || type.includes('12')) {
            return { inWorkbook: true, label: `In Printed Workbook • Pages ${startPg}–${endPg}` };
          }
          if (type.includes('essay') || tariff.includes('16 mark') || type.includes('16')) {
            if (lNum >= 5) {
              return { inWorkbook: true, label: `In Printed Workbook • Pages 14–15` };
            }
            return {
              inWorkbook: false,
              label: 'Digital Extension • Not in Printed Workbook',
              note: 'This 16-mark evaluative essay is provided as an optional digital extension. In the printed workbook, 16-mark essay mastery is practiced on the Key Topic Assessment spread (Pages 14–15).',
            };
          }
          return { inWorkbook: true, label: `In Printed Workbook • Pages ${startPg}–${endPg}` };
        }

        // 3. WEIMAR & NAZI GERMANY (weimar_nazi_germany)
        if (unitId === 'weimar_nazi_germany') {
          const startPg = 2 + lNum * 2;
          const endPg = startPg + 1;

          if (
            type.includes('inference') ||
            text.includes('two things you can infer') ||
            tariff.includes('4 mark')
          ) {
            return { inWorkbook: true, label: `In Printed Workbook • Page ${endPg}` };
          }
          if (
            type.includes('causation') ||
            type.includes('explain_why') ||
            tariff.includes('12 mark') ||
            type.includes('12m')
          ) {
            return { inWorkbook: true, label: `In Printed Workbook • Pages ${startPg}–${endPg}` };
          }
          if (
            type.includes('utility') ||
            type.includes('interpret') ||
            tariff.includes('8 mark') ||
            tariff.includes('16 mark')
          ) {
            if (ktNum >= 3 || lNum >= 3) {
              return { inWorkbook: true, label: `In Printed Workbook • Pages ${startPg}–${endPg}` };
            }
            return {
              inWorkbook: false,
              label: 'Digital Extension • Not in Printed Workbook',
              note: 'This Section B interpretation enquiry is provided as an optional digital extension for advanced exam practice.',
            };
          }
          return { inWorkbook: true, label: `In Printed Workbook • Pages ${startPg}–${endPg}` };
        }

        // 4. CONFLICT IN THE MIDDLE EAST (cme_new)
        if (unitId === 'cme_new') {
          const startPg = 2 + lNum * 2;
          const endPg = startPg + 1;
          if (
            tariff.includes('4 mark') ||
            type.includes('4-mark') ||
            type.includes('consequence_4')
          ) {
            return { inWorkbook: true, label: `In Printed Workbook • Page ${endPg}` };
          }
          if (
            tariff.includes('8 mark') ||
            tariff.includes('12 mark') ||
            type.includes('narrative_8') ||
            type.includes('importance_8')
          ) {
            return { inWorkbook: true, label: `In Printed Workbook • Pages ${startPg}–${endPg}` };
          }
          return { inWorkbook: true, label: `In Printed Workbook • Pages ${startPg}–${endPg}` };
        }

        // 5. USA: CONFLICT AT HOME AND ABROAD (usa)
        if (unitId === 'usa') {
          const startPg = 2 + lNum * 2;
          const endPg = startPg + 1;
          if (tariff.includes('4 mark') || type.includes('inference_4m')) {
            return { inWorkbook: true, label: `In Printed Workbook • Page ${endPg}` };
          }
          if (
            tariff.includes('8 mark') ||
            tariff.includes('12 mark') ||
            tariff.includes('16 mark')
          ) {
            return { inWorkbook: true, label: `In Printed Workbook • Pages ${startPg}–${endPg}` };
          }
          return { inWorkbook: true, label: `In Printed Workbook • Pages ${startPg}–${endPg}` };
        }

        // 6. COLD WAR & OTHER UNITS WITH COMPANION WORKBOOKS
        const unitsWithWorkbooks = [
          'cold_war',
          'medieval_england',
          'great_war',
          'great_war_part2',
          'industrialisation_and_empire',
          'the_shoah',
          'monarchy_religion_power',
          'first_british_empire',
          'second_british_empire',
          'early_modern_world',
          'water_and_sanitation',
          'australia',
          'ks2_ww2',
        ];

        if (unitsWithWorkbooks.includes(unitId)) {
          return { inWorkbook: true, label: 'In Printed Workbook • Companion Spread' };
        }

        return null;
      };

      const renderQuestion = (q, qIdx) => {
        let scaffoldHtml = '';
        if (q.scaffolding) {
          const sc = q.scaffolding;
          const stepsHtml = (sc.steps || [])
            .map(
              (step) => `
            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-left: 4px solid #2563eb; border-radius: 6px; padding: 10px 14px; margin-bottom: 8px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <span style="background: #1e40af; color: #ffffff; font-weight: 800; font-size: 0.8rem; padding: 2px 8px; border-radius: 4px; font-family: monospace;">${step.letter}</span>
                <strong style="color: #0f172a; font-size: 0.95rem;">${step.name}</strong>
              </div>
              <div style="font-size: 0.9rem; color: #334155; margin-bottom: 4px;">${step.prompt}</div>
              ${step.starter ? `<div style="font-size: 0.85rem; color: #1e40af; font-style: italic; background: #f0f9ff; padding: 4px 8px; border-radius: 4px;"><strong>Starter:</strong> "${step.starter}"</div>` : ''}
            </div>
          `,
            )
            .join('');

          const startersHtml =
            sc.sentence_starters && sc.sentence_starters.length > 0
              ? `
            <div style="margin-top: 10px;">
              <strong style="font-size: 0.85rem; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-pen-fancy" style="color: #3b82f6;"></i> Model Sentence Starters:</strong>
              <ul style="margin: 6px 0 0 0; padding-left: 20px; font-size: 0.9rem; color: #334155; line-height: 1.5;">
                ${sc.sentence_starters.map((st) => `<li><em>"${st}"</em></li>`).join('')}
              </ul>
            </div>
          `
              : '';

          const connectivesHtml =
            sc.connectives_bank && sc.connectives_bank.length > 0
              ? `
            <div style="margin-top: 12px; display: flex; flex-wrap: wrap; gap: 6px; align-items: center;">
              <span style="font-size: 0.8rem; font-weight: bold; color: #64748b; text-transform: uppercase;">Causal Connective Bank:</span>
              ${sc.connectives_bank.map((conn) => `<span style="background: #e2e8f0; color: #1e293b; font-size: 0.8rem; font-weight: 600; padding: 2px 8px; border-radius: 12px;">${conn}</span>`).join('')}
            </div>
          `
              : '';

          const redFlagsHtml =
            sc.red_flags && sc.red_flags.length > 0
              ? `
            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 10px 12px; margin-top: 12px;">
              <strong style="font-size: 0.85rem; color: #b91c1c; text-transform: uppercase; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-triangle-exclamation"></i> Examiner Red Flags:</strong>
              <ul style="margin: 6px 0 0 0; padding-left: 18px; font-size: 0.85rem; color: #991b1b; line-height: 1.4;">
                ${sc.red_flags.map((rf) => `<li>${rf}</li>`).join('')}
              </ul>
            </div>
          `
              : '';

          const checklistHtml =
            sc.checklist && sc.checklist.length > 0
              ? `
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 10px 12px; margin-top: 10px;">
              <strong style="font-size: 0.85rem; color: #15803d; text-transform: uppercase; display: flex; align-items: center; gap: 6px;"><i class="fa-solid fa-square-check"></i> Self-Audit Checklist:</strong>
              <ul style="margin: 6px 0 0 0; padding-left: 18px; font-size: 0.85rem; color: #166534; line-height: 1.4;">
                ${sc.checklist.map((cl) => `<li>${cl}</li>`).join('')}
              </ul>
            </div>
          `
              : '';

          const hasDetailedScaffold = !!(
            sc.guidance ||
            (sc.steps && sc.steps.length > 0) ||
            (sc.sentence_starters && sc.sentence_starters.length > 0) ||
            (sc.connectives_bank && sc.connectives_bank.length > 0) ||
            (sc.red_flags && sc.red_flags.length > 0) ||
            (sc.checklist && sc.checklist.length > 0)
          );

          scaffoldHtml = `
            <div style="margin: 12px 0 16px 0;">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;">
                <span style="background: #eff6ff; border: 1px solid #93c5fd; color: #1e40af; font-size: 0.85rem; font-weight: 700; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.5px;">
                  <i class="fa-solid fa-layer-group" style="margin-right: 6px;"></i> ${sc.acronym || 'PEE/PEEL Structure Strip'}
                </span>
                ${
                  hasDetailedScaffold
                    ? `
                <button class="btn btn-pedagogy btn-pedagogy-sm" data-action="toggle-element" data-target-id="ep-scaffold-${qIdx}" style="background: #f1f5f9; color: #1e3a8a; border: 1px solid #cbd5e1; font-weight: 600;">
                  <i class="fa-solid fa-wand-magic-sparkles" style="color: #2563eb;"></i> Structure Strip &amp; Tips
                </button>
                `
                    : ''
                }
              </div>
              ${
                hasDetailedScaffold
                  ? `
              <div id="ep-scaffold-${qIdx}" class="scaffold-box" style="display: none; background: #f8fafc; border: 1.5px solid #93c5fd; border-radius: 8px; padding: 16px; margin-top: 8px;">
                <div style="font-weight: 700; color: #1e3a8a; font-size: 1.05rem; margin-bottom: 4px; display: flex; align-items: center; gap: 8px;">
                  <i class="fa-solid fa-sitemap" style="color: #3b82f6;"></i> ${sc.acronym_title || 'Exam Technique Formula'}
                </div>
                ${sc.guidance ? `<p style="font-size: 0.9rem; color: #475569; margin: 0 0 12px 0; font-style: italic;">${sc.guidance}</p>` : ''}
                ${stepsHtml}
                ${startersHtml}
                ${connectivesHtml}
                ${redFlagsHtml}
                ${checklistHtml}
              </div>
              `
                  : ''
              }
            </div>
          `;
        }

        const qText = (q.question || '').toLowerCase();
        const qTariff = (q.tariff || '').toLowerCase();
        const qType = (q.type || '').toLowerCase();
        const isPaper3Weimar =
          typeof unitId !== 'undefined' &&
          (unitId === 'weimar_nazi_germany' ||
            unitId === 'germany' ||
            (typeof window !== 'undefined' && window.currentUnitId === 'weimar_nazi_germany'));

        const isConsequence =
          !isPaper3Weimar &&
          !qTariff.includes('8 mark') &&
          !qTariff.includes('12 mark') &&
          !qTariff.includes('16 mark') &&
          !qType.includes('utility') &&
          !qType.includes('causation') &&
          !qType.includes('verdict') &&
          !qText.includes('how useful') &&
          !qText.includes('infer') &&
          !qText.includes('3(a)') &&
          !qText.includes('3(b)') &&
          !qText.includes('3(c)') &&
          !qText.includes('3(d)') &&
          (qType.includes('consequence') ||
            qType === 'consequence_4m' ||
            /explain\s+(?:two\s+)?consequences/i.test(qText));

        const isInference =
          qText.includes('infer') ||
          qType.includes('inference') ||
          /give two things you can infer/i.test(q.question || '');

        const isInterpDiff =
          qText.includes('difference between these views') ||
          qText.includes('difference between the views') ||
          qType.includes('interp_diff') ||
          /3\(b\)/i.test(q.question || '');

        const isInterpWhy =
          qText.includes('reason why interpretations') ||
          qType.includes('interp_why') ||
          /3\(c\)/i.test(q.question || '');

        const isFollowUp = qText.includes('follow up source') || qType.includes('follow_up');

        const isFeatures = qText.includes('describe two features') || qType.includes('features');

        const isUtility =
          !isConsequence &&
          !isFeatures &&
          !isInference &&
          !isInterpDiff &&
          !isInterpWhy &&
          !isFollowUp &&
          (qTariff.includes('8 mark') ||
            qType.includes('utility') ||
            qText.includes('how useful') ||
            qText.includes('source utility'));

        let stampHtml = '';
        if (isConsequence) {
          stampHtml = `
            <div class="edexcel-peel-stamp" style="margin: 10px 0 16px 0; border: 2px solid #0284c7; border-radius: 8px; background: #f0f9ff; padding: 12px 16px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1.5px solid #bae6fd; padding-bottom: 6px;">
                <span style="font-weight: 800; font-size: 0.92rem; color: #0369a1; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-stamp" style="margin-right: 6px;"></i> Edexcel 4-Mark Consequence PEE Structure Strip</span>
                <span style="background: #0284c7; color: white; font-size: 0.78rem; font-weight: 700; padding: 2px 8px; border-radius: 12px;">[4 marks &bull; 5 mins]</span>
              </div>
              <div style="display: grid; grid-template-columns: auto 1fr; gap: 8px 12px; font-size: 0.88rem; line-height: 1.4; color: #0f172a;">
                <span style="background: #0284c7; color: white; font-weight: 800; padding: 2px 8px; border-radius: 4px; font-family: monospace; text-align: center; height: fit-content;">P</span>
                <div><strong>Point (Consequence):</strong> <em>"One significant consequence of [Event] was..."</em> (Directly state the resulting change)</div>
                <span style="background: #0284c7; color: white; font-weight: 800; padding: 2px 8px; border-radius: 4px; font-family: monospace; text-align: center; height: fit-content;">E</span>
                <div><strong>Evidence (Historical Detail):</strong> <em>"Specifically, [names, dates, treaties, or figures]..."</em> (Deploy precise factual proof)</div>
                <span style="background: #0284c7; color: white; font-weight: 800; padding: 2px 8px; border-radius: 4px; font-family: monospace; text-align: center; height: fit-content;">E</span>
                <div><strong>Explanation (Causal Impact):</strong> <em>"This resulted in... / Consequently, this led to..."</em> (Explain the ongoing historical effect)</div>
              </div>
            </div>
          `;
        } else if (isInterpDiff) {
          stampHtml = `
            <div class="edexcel-peel-stamp" style="margin: 10px 0 16px 0; border: 2px solid #8b5cf6; border-radius: 8px; background: #f5f3ff; padding: 12px 16px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1.5px solid #ddd6fe; padding-bottom: 6px;">
                <span style="font-weight: 800; font-size: 0.92rem; color: #6d28d9; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-code-compare" style="margin-right: 6px;"></i> Edexcel 4-Mark Interpretation Difference Structure Strip (Paper 3 Q3b)</span>
                <span style="background: #8b5cf6; color: white; font-size: 0.78rem; font-weight: 700; padding: 2px 8px; border-radius: 12px;">[4 marks &bull; 5 mins]</span>
              </div>
              <div style="display: grid; grid-template-columns: auto 1fr; gap: 8px 12px; font-size: 0.88rem; line-height: 1.4; color: #0f172a;">
                <span style="background: #8b5cf6; color: white; font-weight: 800; padding: 2px 8px; border-radius: 4px; font-family: monospace; text-align: center; height: fit-content;">D</span>
                <div><strong>Identify Main Difference [1–2m]:</strong> <em>"The main difference between Interpretation 1 and Interpretation 2 is that Interpretation 1 suggests [View X], whereas Interpretation 2 suggests [View Y]..."</em></div>
                <span style="background: #8b5cf6; color: white; font-weight: 800; padding: 2px 8px; border-radius: 4px; font-family: monospace; text-align: center; height: fit-content;">I1</span>
                <div><strong>Evidence from Interpretation 1 [1m]:</strong> <em>"Interpretation 1 supports this by stating that '[Quote or detail 1]'..."</em></div>
                <span style="background: #8b5cf6; color: white; font-weight: 800; padding: 2px 8px; border-radius: 4px; font-family: monospace; text-align: center; height: fit-content;">I2</span>
                <div><strong>Evidence from Interpretation 2 [1m]:</strong> <em>"In contrast, Interpretation 2 states that '[Quote or detail 2]'..."</em></div>
              </div>
            </div>
          `;
        } else if (isInterpWhy) {
          stampHtml = `
            <div class="edexcel-peel-stamp" style="margin: 10px 0 16px 0; border: 2px solid #8b5cf6; border-radius: 8px; background: #f5f3ff; padding: 12px 16px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1.5px solid #ddd6fe; padding-bottom: 6px;">
                <span style="font-weight: 800; font-size: 0.92rem; color: #6d28d9; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-scale-balanced" style="margin-right: 6px;"></i> Edexcel 4-Mark Why Interpretations Differ Structure Strip (Paper 3 Q3c)</span>
                <span style="background: #8b5cf6; color: white; font-size: 0.78rem; font-weight: 700; padding: 2px 8px; border-radius: 12px;">[4 marks &bull; 5 mins]</span>
              </div>
              <div style="display: grid; grid-template-columns: auto 1fr; gap: 8px 12px; font-size: 0.88rem; line-height: 1.4; color: #0f172a;">
                <span style="background: #8b5cf6; color: white; font-weight: 800; padding: 2px 8px; border-radius: 4px; font-family: monospace; text-align: center; height: fit-content;">R</span>
                <div><strong>Identify Valid Reason [1–2m]:</strong> <em>"One reason why Interpretations 1 and 2 give different views is that the historians have used different sources / focused on different aspects [such as X vs Y]..."</em></div>
                <span style="background: #8b5cf6; color: white; font-weight: 800; padding: 2px 8px; border-radius: 4px; font-family: monospace; text-align: center; height: fit-content;">E</span>
                <div><strong>Explain with Context &amp; Sources [3–4m]:</strong> <em>"Interpretation 1 draws upon [Source/Context] showing that..., whereas Interpretation 2 emphasizes [Source/Context] because..."</em></div>
              </div>
            </div>
          `;
        } else if (isInference) {
          stampHtml = `
            <div class="edexcel-peel-stamp" style="margin: 10px 0 16px 0; border: 2px solid #059669; border-radius: 8px; background: #ecfdf5; padding: 12px 16px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1.5px solid #a7f3d0; padding-bottom: 6px;">
                <span style="font-weight: 800; font-size: 0.92rem; color: #065f46; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-magnifying-glass" style="margin-right: 6px;"></i> Edexcel 4-Mark Source Inference Structure Strip (Paper 3 Q1)</span>
                <span style="background: #059669; color: white; font-size: 0.78rem; font-weight: 700; padding: 2px 8px; border-radius: 12px;">[4 marks &bull; 5 mins]</span>
              </div>
              <div style="display: grid; grid-template-columns: auto 1fr; gap: 8px 12px; font-size: 0.88rem; line-height: 1.4; color: #0f172a;">
                <span style="background: #059669; color: white; font-weight: 800; padding: 2px 8px; border-radius: 4px; font-family: monospace; text-align: center; height: fit-content;">I1</span>
                <div><strong>Inference 1 [2 Marks]:</strong> <em>"What I can infer from Source A is [clear deduction]..."</em> [1m] + <em>"Details in the source that tell me this are '[Quote or specific detail]'..."</em> [1m]</div>
                <span style="background: #059669; color: white; font-weight: 800; padding: 2px 8px; border-radius: 4px; font-family: monospace; text-align: center; height: fit-content;">I2</span>
                <div><strong>Inference 2 [2 Marks]:</strong> <em>"Another thing I can infer from Source A is [second deduction]..."</em> [1m] + <em>"Details in the source that tell me this are '[Different quote or detail]'..."</em> [1m]</div>
              </div>
            </div>
          `;
        } else if (isFollowUp) {
          stampHtml = `
            <div class="edexcel-peel-stamp" style="margin: 10px 0 16px 0; border: 2px solid #0d9488; border-radius: 8px; background: #f0fdfa; padding: 12px 16px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1.5px solid #99f6e4; padding-bottom: 6px;">
                <span style="font-weight: 800; font-size: 0.92rem; color: #115e59; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-compass" style="margin-right: 6px;"></i> Edexcel 4-Step Follow-Up Enquiry Structure Strip (Paper 1 Q2b)</span>
                <span style="background: #0d9488; color: white; font-size: 0.78rem; font-weight: 700; padding: 2px 8px; border-radius: 12px;">[4 marks &bull; 5 mins]</span>
              </div>
              <div style="display: grid; grid-template-columns: auto 1fr; gap: 8px 12px; font-size: 0.88rem; line-height: 1.4; color: #0f172a;">
                <span style="background: #0d9488; color: white; font-weight: 800; padding: 2px 8px; border-radius: 4px; font-family: monospace; text-align: center; height: fit-content;">1</span>
                <div><strong>Detail to Follow Up [1m]:</strong> Quote or select one specific historical detail from the source directly linked to the enquiry.</div>
                <span style="background: #0d9488; color: white; font-weight: 800; padding: 2px 8px; border-radius: 4px; font-family: monospace; text-align: center; height: fit-content;">2</span>
                <div><strong>Question to Ask [1m]:</strong> Pose a focused, precise historical question directly arising from that detail.</div>
                <span style="background: #0d9488; color: white; font-weight: 800; padding: 2px 8px; border-radius: 4px; font-family: monospace; text-align: center; height: fit-content;">3</span>
                <div><strong>Type of Source [1m]:</strong> Name a realistic, authentic contemporary primary record (e.g. medical register, war diary, dispatch log).</div>
                <span style="background: #0d9488; color: white; font-weight: 800; padding: 2px 8px; border-radius: 4px; font-family: monospace; text-align: center; height: fit-content;">4</span>
                <div><strong>How Source Helps [1m]:</strong> Explain specifically how this record answers the question and deepens understanding.</div>
              </div>
            </div>
          `;
        } else if (isFeatures) {
          stampHtml = `
            <div class="edexcel-peel-stamp" style="margin: 10px 0 16px 0; border: 2px solid #0284c7; border-radius: 8px; background: #f0f9ff; padding: 12px 16px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1.5px solid #bae6fd; padding-bottom: 6px;">
                <span style="font-weight: 800; font-size: 0.92rem; color: #0369a1; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-list-check" style="margin-right: 6px;"></i> Edexcel 4-Mark 'Describe Two Features' Structure Strip</span>
                <span style="background: #0284c7; color: white; font-size: 0.78rem; font-weight: 700; padding: 2px 8px; border-radius: 12px;">[4 marks &bull; 5 mins]</span>
              </div>
              <div style="display: grid; grid-template-columns: auto 1fr; gap: 8px 12px; font-size: 0.88rem; line-height: 1.4; color: #0f172a;">
                <span style="background: #0284c7; color: white; font-weight: 800; padding: 2px 8px; border-radius: 4px; font-family: monospace; text-align: center; height: fit-content;">F1</span>
                <div><strong>Feature 1 [2 Marks]:</strong> <em>"One key feature was [name feature]..."</em> [1m] + <em>"Specifically, [supporting historical factual detail]..."</em> [1m]</div>
                <span style="background: #0284c7; color: white; font-weight: 800; padding: 2px 8px; border-radius: 4px; font-family: monospace; text-align: center; height: fit-content;">F2</span>
                <div><strong>Feature 2 [2 Marks]:</strong> <em>"A second key feature was [name feature]..."</em> [1m] + <em>"Specifically, [supporting historical factual detail]..."</em> [1m]</div>
              </div>
            </div>
          `;
        } else if (isUtility) {
          stampHtml = `
            <div class="edexcel-peel-stamp" style="margin: 10px 0 16px 0; border: 2px solid #2563eb; border-radius: 8px; background: #eff6ff; padding: 12px 16px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1.5px solid #bfdbfe; padding-bottom: 6px;">
                <span style="font-weight: 800; font-size: 0.92rem; color: #1e40af; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-magnifying-glass-chart" style="margin-right: 6px;"></i> Edexcel 8-Mark Source Utility Structure Strip (Paper 1 Q2a)</span>
                <span style="background: #2563eb; color: white; font-size: 0.78rem; font-weight: 700; padding: 2px 8px; border-radius: 12px;">[8 marks &bull; 12 mins]</span>
              </div>
              <div style="display: grid; grid-template-columns: auto 1fr; gap: 8px 12px; font-size: 0.88rem; line-height: 1.4; color: #0f172a;">
                <span style="background: #2563eb; color: white; font-weight: 800; padding: 2px 8px; border-radius: 4px; font-family: monospace; text-align: center; height: fit-content;">U1</span>
                <div><strong>Content &amp; Utility:</strong> <em>"Source A is useful for investigating [topic] because it reveals that..."</em> (Quote specific details and corroborate with factual knowledge)</div>
                <span style="background: #2563eb; color: white; font-weight: 800; padding: 2px 8px; border-radius: 4px; font-family: monospace; text-align: center; height: fit-content;">U2</span>
                <div><strong>Provenance &amp; Motive:</strong> <em>"The utility of Source A is influenced by its provenance, as it was produced by..."</em> (Evaluate author, date, purpose, and contemporary audience)</div>
                <span style="background: #2563eb; color: white; font-weight: 800; padding: 2px 8px; border-radius: 4px; font-family: monospace; text-align: center; height: fit-content;">U3</span>
                <div><strong>Contextual Limitation:</strong> <em>"However, Source A is limited because it omits..."</em> (Deploy precise own knowledge to explain what key developments are missing)</div>
              </div>
            </div>
          `;
        }

        const promptHtml = q.prompt
          ? `
          <div style="font-size: 0.95rem; color: #334155; margin-bottom: 12px; line-height: 1.5; background: #f8fafc; padding: 10px 14px; border-left: 3px solid #64748b; border-radius: 4px;">
            <strong><i class="fa-solid fa-circle-info" style="color: #3b82f6; margin-right: 6px;"></i> Guidance:</strong> ${q.prompt}
          </div>
        `
          : '';

        const modelAns = q.model || q.model_answer || '';
        const wbMeta = getWorkbookTaskMeta(unitId, lesson?.id, q, q.question, qIdx, lesson);
        let wbBadgeHtml = '';
        let wbNoticeHtml = '';
        if (wbMeta) {
          if (wbMeta.inWorkbook) {
            wbBadgeHtml = `
              <div style="display: inline-flex; align-items: center; gap: 6px; background: #ecfdf5; border: 1.5px solid #10b981; color: #065f46; font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; padding: 4px 10px; border-radius: 9999px; margin-bottom: 12px;">
                <i class="fa-solid fa-book-open" style="font-size: 0.8rem; color: #059669;"></i>
                <span>${wbMeta.label}</span>
              </div>
            `;
          } else {
            wbBadgeHtml = `
              <div style="display: inline-flex; align-items: center; gap: 6px; background: #f8fafc; border: 1.5px solid #94a3b8; color: #334155; font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; padding: 4px 10px; border-radius: 9999px; margin-bottom: 12px;">
                <i class="fa-solid fa-laptop-code" style="font-size: 0.8rem; color: #64748b;"></i>
                <span>${wbMeta.label}</span>
              </div>
            `;
            if (wbMeta.note) {
              wbNoticeHtml = `
                <div style="font-size: 0.88rem; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; border-left: 4px solid #3b82f6; border-radius: 6px; padding: 10px 14px; margin-bottom: 14px; line-height: 1.5;">
                  <strong><i class="fa-solid fa-circle-info" style="color: #2563eb; margin-right: 6px;"></i> Workbook Navigation:</strong> ${wbMeta.note}
                </div>
              `;
            }
          }
        }

        return `
          <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
            ${wbBadgeHtml}
            <div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a; line-height: 1.5;">
              ${formatExamQuestionTitle(q.question, qIdx, q)}
              <span style="display: inline-flex; vertical-align: middle; margin-left: 8px;">
                ${modelAns ? `<button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-icon-only btn-pedagogy-model" title="Reveal Model Answer" data-action="toggle-element" data-target-id="ep-model-${qIdx}"><i class="fa-solid fa-check-double"></i></button>` : ''}
              </span>
            </div>
            ${wbNoticeHtml}
            ${stampHtml}
            ${promptHtml}
            ${scaffoldHtml}
            <textarea class="student-answer-input" placeholder="Write your response here..." oninput="window.updateProgress()"></textarea>
            ${modelAns ? `<div id="ep-model-${qIdx}" class="scaffold-box model-box" style="display:none; margin-top: 15px;">${typeof formatBold !== 'undefined' ? formatBold(modelAns) : modelAns}</div>` : ''}
          </div>
        `;
      };

      if (lesson.exam_practice.sources && lesson.exam_practice.sources.length > 0) {
        htmlExamPractice += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; margin-bottom: 20px;">`;
        lesson.exam_practice.sources.forEach((src, sIdx) => {
          htmlExamPractice += `
            <div class="archival-source-box" style="margin-bottom: 0; background: #fffcf8; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 14px 18px;">
              <div class="archival-source-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">
                <span class="archival-meta-tag" style="font-weight: 700; color: #1e3a8a; font-size: 0.85rem; letter-spacing: 0.5px; text-transform: uppercase;">${src.id || 'Source ' + String.fromCharCode(65 + sIdx)}</span>
                <span class="archival-shelfmark-stamp" style="font-family: monospace; font-size: 0.75rem; color: #64748b; background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">ARCHIVAL RECORD</span>
              </div>
              <div class="archival-source-body" style="font-family: Georgia, 'Playfair Display', serif; font-size: 0.95rem; line-height: 1.6; color: #1e293b; margin-bottom: 10px; font-style: italic;">
                "${src.text || src.content || ''}"
              </div>
              <div class="archival-citation-footer" style="font-size: 0.82rem; color: #475569; border-top: 1px solid #e2e8f0; padding-top: 8px; line-height: 1.4;">
                <div><strong>Provenance:</strong> ${src.provenance || ''}</div>
                ${src.provenance_clue ? `<div style="margin-top: 4px; color: #b45309; font-style: italic;"><strong>Provenance Clue:</strong> ${src.provenance_clue}</div>` : ''}
              </div>
            </div>
          `;
        });
        htmlExamPractice += `</div>`;
      }

      if (epStimulus.length > 0) {
        htmlExamPractice += `<div class="exam-stimulus-container" style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 22px;">`;
        epStimulus.forEach((stim, sIdx) => {
          let stimTitle = '';
          let stimContent = '';
          if (typeof stim === 'string') {
            const parts = stim.split('**:');
            if (parts.length > 1) {
              stimTitle = parts[0].replace(/\*\*/g, '').trim();
              stimContent = parts.slice(1).join('**:').trim();
            } else {
              stimTitle = `Interpretation ${sIdx + 1}`;
              stimContent = stim;
            }
          } else {
            stimTitle = stim.title || `Interpretation ${sIdx + 1}`;
            stimContent = stim.content || stim.text || '';
          }

          const isInterp = /Interpretation\s+([0-9]+)/i.test(stimTitle);
          const interpMatch = stimTitle.match(/Interpretation\s+([0-9]+)/i);
          const interpNum = interpMatch ? interpMatch[1] : `${sIdx + 1}`;

          const srcMatch = stimTitle.match(/Source\s+([A-Z0-9]+)/i);
          const srcLetter = srcMatch ? srcMatch[1].toUpperCase() : String.fromCharCode(65 + sIdx);

          if (isInterp) {
            const cleanInterpTitle = stimTitle
              .replace(/^Interpretation\s+[0-9]+[:\s-]*/i, '')
              .replace(/^\(([^)]+)\)[:\s-]*/i, '$1: ')
              .trim();
            const interpCardId = `interpretation-card-${interpNum}`;

            htmlExamPractice += `
              <details class="cme-source-drawer weimar-source-drawer weimar-interpretation-drawer archival-drawer gcse-source-container archival-source-box" id="${interpCardId}" data-interpretation-num="${interpNum}" style="margin: 6px 0; border: 1px solid #cbd5e1; border-radius: 6px; background: #f8fafc; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.02); transition: all 0.25s ease;">
                <summary style="padding: 5px 12px; min-height: 40px; padding: 7px 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: space-between; background: #f1f5f9; color: #0f172a; list-style: none; user-select: none; transition: background 0.15s ease;">
                  <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                    <span class="archival-meta-tag" style="background: #9a3412; color: #ffffff; padding: 2px 6px; border-radius: 3px; font-size: 0.62rem; font-weight: 800; letter-spacing: 0.4px; line-height: 1.2;">INTERPRETATION ${interpNum}</span>
                    <span class="archival-drawer-title" style="font-family: 'Playfair Display', Georgia, serif; font-size: 0.84rem; color: #1e293b; font-weight: 700; line-height: 1.2;">${cleanInterpTitle || 'Historical View'}</span>
                  </div>
                  <span class="drawer-toggle-indicator" style="font-size: 0.68rem; color: #64748b; display: inline-flex; align-items: center; gap: 4px; font-weight: 600; flex-shrink: 0;">
                    Historiographical View &bull; Expand <span class="drawer-caret">&#9660;</span>
                  </span>
                </summary>
                <div class="weimar-interpretation-content" style="padding: 18px; background: #ffffff; border-top: 1px solid #e2e8f0;">
                  <div class="archival-source-body" style="font-family: 'Georgia', serif; font-style: italic; font-size: 1.02rem; line-height: 1.75; color: #1e293b; background: #fffdfa; padding: 14px 18px; border-left: 4px solid #ea580c; border-radius: 4px;">
                    ${typeof formatBold !== 'undefined' ? formatBold(stimContent) : stimContent}
                  </div>
                  <div class="archival-citation-footer" style="font-size: 0.8rem; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 8px; margin-top: 12px; display: flex; justify-content: space-between; align-items: center;">
                    <span><strong>Historical Analysis:</strong> Pearson Edexcel GCSE Paper 3 Section B Historical Interpretation</span>
                    <span class="archival-shelfmark-stamp" style="font-family: monospace; font-size: 0.72rem; color: #64748b; background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">INTERP ${interpNum}</span>
                  </div>
                </div>
              </details>
            `;
          } else {
            const cleanSourceTitle = stimTitle.replace(/^Source\s+[A-Z0-9]+[:\s-]*/i, '').trim();
            const sourceCardId = `source-card-${srcLetter}`;

            htmlExamPractice += `
              <details class="cme-source-drawer weimar-source-drawer archival-drawer gcse-source-container archival-source-box" id="${sourceCardId}" data-source-letter="${srcLetter}" style="margin: 6px 0; border: 1px solid #cbd5e1; border-radius: 6px; background: #f8fafc; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.02); transition: all 0.25s ease;">
                <summary style="padding: 5px 12px; min-height: 40px; padding: 7px 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: space-between; background: #f1f5f9; color: #0f172a; list-style: none; user-select: none; transition: background 0.15s ease;">
                  <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                    <span class="archival-meta-tag" style="background: #1e40af; color: #ffffff; padding: 2px 6px; border-radius: 3px; font-size: 0.62rem; font-weight: 800; letter-spacing: 0.4px; line-height: 1.2;">SOURCE ${srcLetter}</span>
                    <span class="archival-drawer-title" style="font-family: 'Playfair Display', Georgia, serif; font-size: 0.84rem; color: #1e293b; font-weight: 700; line-height: 1.2;">${cleanSourceTitle || 'Archival Primary Record'}</span>
                  </div>
                  <span class="drawer-toggle-indicator" style="font-size: 0.68rem; color: #64748b; display: inline-flex; align-items: center; gap: 4px; font-weight: 600; flex-shrink: 0;">
                    Archival Evidence &bull; Expand <span class="drawer-caret">&#9660;</span>
                  </span>
                </summary>
                <div class="weimar-source-content" style="padding: 18px; background: #ffffff; border-top: 1px solid #e2e8f0;">
                  <div class="archival-source-body" style="font-family: 'Georgia', serif; font-style: italic; font-size: 1.05rem; line-height: 1.75; color: #1e293b; background: #fffdfa; padding: 14px 18px; border-left: 4px solid #1e40af; border-radius: 4px;">
                    ${typeof formatBold !== 'undefined' ? formatBold(stimContent) : stimContent}
                  </div>
                  <div class="archival-citation-footer" style="font-size: 0.8rem; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 8px; margin-top: 12px; display: flex; justify-content: space-between; align-items: center;">
                    <span><strong>Provenance:</strong> ${cleanSourceTitle || 'Contemporary Written Record'}</span>
                    <span class="archival-shelfmark-stamp" style="font-family: monospace; font-size: 0.72rem; color: #64748b; background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">SOURCE ${srcLetter}</span>
                  </div>
                </div>
              </details>
            `;
          }
        });
        htmlExamPractice += `</div>`;
      }

      if (epQuestions.length > 0) {
        epQuestions.forEach((q, qIdx) => {
          htmlExamPractice += renderQuestion(q, qIdx);
        });
      }
      htmlExamPractice += `</div>`;
    }
  }

  let deck = null;
  if (lesson.vocab && lesson.vocab.length > 0) {
    deck = lesson.vocab;
  } else if (lesson.key_vocabulary && lesson.key_vocabulary.length > 0) {
    deck = lesson.key_vocabulary;
  } else if (lesson.flashcards && lesson.flashcards.length > 0) {
    if (lesson.flashcards[0].term || lesson.flashcards[0].word) {
      deck = lesson.flashcards;
    }
  }

  if (deck) {
    htmlVocabDeck += `
        <div class="phase-card">
          <div class="phase-title">Consolidation & Recall</div>
          <p style="color: #666; margin-bottom: 20px;">Tap a card to flip it and reveal the definition.</p>
          <div class="flashcard-deck">
      `;
    deck.forEach((fc) => {
      let t = fc.term || fc.word || fc.title || '';
      let d = fc.definition || fc.meaning || fc.desc || '';
      htmlVocabDeck += `
          <div class="flashcard-wrapper" data-action="flip-card-wrapper">
            <div class="flashcard-inner">
              <div class="flashcard-face flashcard-front">
                <h4>${t}</h4>
                <p>Tap to reveal</p>
              </div>
              <div class="flashcard-face flashcard-back">
                ${d}
              </div>
            </div>
          </div>
        `;
    });
    htmlVocabDeck += `</div></div>`;
  }

  if (lesson.extended || lesson.debate_prep) {
    let extHtml = `
        <div class="phase-card">
          <div style="display: flex; justify-content: flex-end; align-items: center; margin-bottom: 20px;">
            <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">Extended Scholarship</div>
            ${lesson.extended && (lesson.extended.model || lesson.extended.model_answer || lesson.extended.answer) ? `<button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-model" data-action="toggle-element" data-target-id="extended-model-${lesson.id}"><i class="fa-solid fa-check-double"></i> Reveal Model Answer</button>` : ''}
          </div>
      `;

    if (lesson.debate_prep) {
      const dp = lesson.debate_prep;
      const allArgs = [
        ...dp.arguments_for.map((a) => ({ t: a, s: 'for' })),
        ...dp.arguments_against.map((a) => ({ t: a, s: 'against' })),
      ].sort(() => Math.random() - 0.5);
      const argsHtml = allArgs
        .map(
          (arg, idx) =>
            `<div class="debate-card" draggable="true" ondragstart="window.dragDebate(event)" id="debate-arg-${lesson.id}-${idx}" data-side="${arg.s}" style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 10px; margin-bottom: 8px; border-radius: 6px; cursor: grab;">${arg.t}</div>`,
        )
        .join('');

      extHtml += `
          <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
            <h3 style="margin-top: 0; color: #1e3a8a;"><i class="fa-solid fa-scale-balanced"></i> Debate Prep: ${dp.question}</h3>
            <p style="color: #475569; font-size: 0.95rem;">Drag and drop the evidence cards below into the correct columns to prepare your arguments before writing your essay.</p>
            
            <div id="debate-bank-${lesson.id}" class="debate-dropzone" ondragover="window.allowDrop(event)" ondrop="window.dropDebate(event)" style="background: white; border: 2px dashed #94a3b8; padding: 15px; border-radius: 8px; margin-bottom: 20px; min-height: 80px;">
              ${argsHtml}
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div>
                <h4 style="text-align: center; color: #16a34a; margin-top: 0;">Agree</h4>
                <div id="debate-for-${lesson.id}" class="debate-dropzone" data-target="for" ondragover="window.allowDrop(event)" ondrop="window.dropDebate(event)" style="background: white; border: 2px dashed #86efac; padding: 15px; border-radius: 8px; min-height: 150px;"></div>
              </div>
              <div>
                <h4 style="text-align: center; color: #dc2626; margin-top: 0;">Disagree</h4>
                <div id="debate-against-${lesson.id}" class="debate-dropzone" data-target="against" ondragover="window.allowDrop(event)" ondrop="window.dropDebate(event)" style="background: white; border: 2px dashed #fca5a5; padding: 15px; border-radius: 8px; min-height: 150px;"></div>
              </div>
            </div>
            <div style="text-align: center; margin-top: 15px;">
              <button class="btn-pedagogy-primary" data-action="check-debate" data-id="${lesson.id}">Check Answers</button>
              <div id="debate-feedback-${lesson.id}" style="margin-top: 10px; font-weight: bold;"></div>
            </div>
          </div>
        `;
    }

    if (lesson.extended && lesson.extended.paragraphs) {
      if (lesson.extended.title) {
        extHtml += `<h3 style="color: #0f172a;">${lesson.extended.title}</h3>`;
      }
      lesson.extended.paragraphs.forEach((p) => {
        extHtml += `<p style="color: #334155; font-size: 1.05rem; line-height: 1.6;">${formatBold(p)}</p>`;
      });
    }
    extHtml += `</div>`;

    if (lesson.debate_prep || (lesson.extended && lesson.extended.paragraphs)) {
      htmlExtended += extHtml;
    }
  }

  let htmlCwgc = '';
  if (isTrip && lesson.cwgc_data) {
    const cd = lesson.cwgc_data;
    htmlCwgc = `
      <div class="cwgc-plaque-container" style="margin-bottom: 25px; background: #fff; border: 2px solid #b45309; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(180, 83, 9, 0.12);">
        <div style="background: linear-gradient(135deg, #78350f, #92400e); color: white; padding: 14px 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <i class="fa-solid fa-monument" style="font-size: 1.4rem; color: #fde68a;"></i>
            <div>
              <div style="font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: #fde68a; font-weight: 700;">Commonwealth War Graves Commission</div>
              <div style="font-size: 1.15rem; font-weight: 700; font-family: 'Playfair Display', serif;">Official Record of the Fallen · Ypres Salient</div>
            </div>
          </div>
          <div style="background: rgba(254, 243, 199, 0.15); border: 1px solid rgba(253, 230, 138, 0.4); color: #fde68a; font-weight: 600; font-size: 0.82rem; padding: 6px 14px; border-radius: 20px; display: inline-flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-cross"></i> <span>CWGC Memorial Record</span>
          </div>
        </div>
        <div style="padding: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; background: #fff;">
          <div style="border-left: 3px solid #b45309; padding-left: 12px;">
            <div style="font-size: 0.75rem; text-transform: uppercase; color: #78350f; font-weight: 700;">Rank &amp; Service Number</div>
            <div style="font-size: 1rem; color: #1e293b; font-weight: 600; margin-top: 2px;">${cd.rank || 'Private'} · #${cd.service_number}</div>
          </div>
          <div style="border-left: 3px solid #b45309; padding-left: 12px;">
            <div style="font-size: 0.75rem; text-transform: uppercase; color: #78350f; font-weight: 700;">Regiment &amp; Battalion</div>
            <div style="font-size: 1rem; color: #1e293b; font-weight: 600; margin-top: 2px;">${cd.regiment}</div>
          </div>
          <div style="border-left: 3px solid #b45309; padding-left: 12px;">
            <div style="font-size: 0.75rem; text-transform: uppercase; color: #78350f; font-weight: 700;">Date of Death &amp; Age</div>
            <div style="font-size: 1rem; color: #1e293b; font-weight: 600; margin-top: 2px;">${cd.date_of_death} (Age ${cd.age})</div>
          </div>
          <div style="border-left: 3px solid #dc2626; padding-left: 12px; background: #fef2f2; border-radius: 0 6px 6px 0; padding-top: 6px; padding-bottom: 6px;">
            <div style="font-size: 0.75rem; text-transform: uppercase; color: #991b1b; font-weight: 700;">Official Memorial Location</div>
            <div style="font-size: 1.02rem; color: #7f1d1d; font-weight: 700; margin-top: 2px;">${cd.memorial} · <span style="background: #dc2626; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.85rem;">${cd.panel}</span></div>
          </div>
          ${
            cd.hometown
              ? `
          <div style="border-left: 3px solid #64748b; padding-left: 12px; grid-column: 1 / -1;">
            <div style="font-size: 0.75rem; text-transform: uppercase; color: #475569; font-weight: 700;">Home Connection</div>
            <div style="font-size: 0.95rem; color: #334155; margin-top: 2px;">${cd.hometown} ${cd.parents ? `(Son of ${cd.parents})` : ''}</div>
          </div>`
              : ''
          }
          ${
            cd.tablet_inscription
              ? `
          <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 6px; padding: 12px; grid-column: 1 / -1; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
            <div>
              <span style="font-size: 0.82rem; font-weight: 700; color: #1e3a8a;"><i class="fa-solid fa-church" style="margin-right: 6px;"></i>Holy Rood Church Crofton Parish Memorial Tablet:</span>
              <span style="font-family: 'Courier New', monospace; font-weight: 700; background: #e2e8f0; padding: 2px 8px; border-radius: 4px; margin-left: 8px; font-size: 1rem; color: #0f172a;">${cd.tablet_inscription}</span>
            </div>
            <span style="font-size: 0.8rem; color: #64748b;"><i class="fa-solid fa-location-dot" style="margin-right: 4px;"></i>Stubbington Village Center</span>
          </div>`
              : ''
          }
        </div>
      </div>
    `;
  }

  let htmlPoetry = '';
  if (isTrip && lesson.poetry_dossiers && lesson.poetry_dossiers.length > 0) {
    htmlPoetry = renderPoetryDossiersHTML(lesson.poetry_dossiers);
  }

  if (!htmlSpotlightDrawers) {
    htmlSpotlightDrawers = renderTextbookSpotlightDrawers(lesson);
  }

  const htmlLaunchpad = renderLessonLaunchpad({
    lesson,
    unitId,
    videos,
    htmlVideo,
    htmlDoNowInner,
    htmlVocabInner,
    htmlSpineInner,
    defaultTab: '',
  });

  if (isTrip) {
    html +=
      htmlCwgc +
      htmlNarrative +
      htmlSpotlightDrawers +
      htmlLaunchpad +
      htmlPoetry +
      htmlPrimary +
      htmlSources1 +
      htmlPairShare +
      htmlExamPractice +
      htmlVocabDeck +
      htmlExtended +
      htmlHistorian;
  } else if (
    unitId === 'great_war' ||
    unitId === 'great_war_part2' ||
    unitId === 'water_and_sanitation' ||
    unitId === 'early_modern_world' ||
    unitId === 'medieval_england' ||
    unitId === 'industrialisation_and_empire' ||
    Boolean(typeof unit !== 'undefined' && unit && unit.is_ks3)
  ) {
    // Universal KS3 Unified Engine Layout
    html +=
      htmlLaunchpad +
      htmlLearningObjectives +
      htmlNarrative +
      htmlSpotlightDrawers +
      (lesson.narrative_blocks && lesson.narrative_blocks.length > 0 ? '' : htmlPrimary) +
      (typeof isGCSE !== 'undefined' && isGCSE ? '' : htmlSources1) +
      htmlTasks +
      htmlVocabDeck +
      htmlExtended +
      htmlPairShare +
      htmlHistorian;
  } else {
    // Universal GCSE Unified Layout
    let htmlDominoSpine = '';

    html +=
      htmlLaunchpad +
      htmlLearningObjectives +
      htmlNarrative +
      htmlSpotlightDrawers +
      (lesson.narrative_blocks && lesson.narrative_blocks.length > 0 ? '' : htmlPrimary) +
      htmlSources1 +
      htmlTasks +
      htmlDominoSpine +
      htmlExamPractice +
      htmlVocabDeck +
      htmlExtended +
      htmlPairShare +
      htmlHistorian;
  }
  const hasExamPractice = !!(
    lesson.exam_practice &&
    (Array.isArray(lesson.exam_practice)
      ? lesson.exam_practice.length > 0
      : (lesson.exam_practice.questions && lesson.exam_practice.questions.length > 0) ||
        (lesson.exam_practice.stimulus && lesson.exam_practice.stimulus.length > 0))
  );
  const shouldRenderGcseTask = !!(lesson.gcse_task && !hasExamPractice);

  if (
    shouldRenderGcseTask ||
    (!isKs3 && lesson.extended && lesson.extended.question) ||
    extractedExamTasks.length > 0
  ) {
    let gcseHtml = `
        <div class="phase-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
            <div>
              <div style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: #b45309; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                <span style="background: #fef3c7; color: #92400e; padding: 1.5px 7px; border-radius: 4px; font-weight: 800;"><i class="fa-solid fa-book-open" style="margin-right: 4px;"></i> PUPIL WORKBOOK COMPANION</span>
                <span style="color: #94a3b8;">&bull;</span>
                <span>RIGHT-HAND SPREAD (RECTO)</span>
              </div>
              <div class="phase-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0; color: #b45309;">${lesson.extended && lesson.extended.title ? lesson.extended.title : 'Pupil Workbook Activity &bull; GCSE Assessment Practice'}</div>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-model" data-action="reveal-all-models"><i class="fa-solid fa-magnifying-glass"></i> Reveal Models</button>
            </div>
          </div>
      `;

    if (lesson.extended && lesson.extended.question) {
      let hintsHtml = '';
      if (lesson.extended.hints && lesson.extended.hints.length > 0) {
        hintsHtml = `<div style="margin-top: 15px; padding: 10px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px;"><strong style="color: #d97706;">Hints &amp; Structure Guide:</strong><ul style="margin: 5px 0 0 0; padding-left: 20px; color: #92400e;">${lesson.extended.hints.map((h) => `<li>${formatBold(h)}</li>`).join('')}</ul></div>`;
      }
      if (
        lesson.extended.teacher_guidance &&
        lesson.extended.teacher_guidance.tiered_stems &&
        lesson.extended.teacher_guidance.tiered_stems.length > 0
      ) {
        hintsHtml += `
          <div style="margin-top: 12px; padding: 12px 16px; background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 6px;">
            <strong style="color: #166534; display: flex; align-items: center; gap: 8px; font-size: 0.95rem;">
              <i class="fa-solid fa-pen-fancy"></i> Sentence Starters:
            </strong>
            <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #15803d; line-height: 1.6; font-size: 0.92rem;">
              ${lesson.extended.teacher_guidance.tiered_stems.map((s) => `<li>${formatBold(s)}</li>`).join('')}
            </ul>
          </div>`;
      }

      let wordBankHtml = '';
      if (lesson.extended.word_bank && lesson.extended.word_bank.length > 0) {
        wordBankHtml = `
          <div style="margin-top: 12px; padding: 10px 14px; background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 6px;">
            <strong style="color: #166534; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">
              Key Word Bank:
            </strong>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              ${lesson.extended.word_bank.map((w) => `<span style="background: white; border: 1px solid #bbf7d0; color: #14532d; font-size: 0.85rem; font-weight: 600; padding: 2px 8px; border-radius: 4px;">${w}</span>`).join('')}
            </div>
          </div>
        `;
      }

      let connectivesHtml = '';
      if (lesson.extended.connective_bank && lesson.extended.connective_bank.length > 0) {
        connectivesHtml = `
          <div style="margin-top: 10px; padding: 10px 14px; background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 6px;">
            <strong style="color: #1e40af; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">
              Causal Connective Bank:
            </strong>
            <div style="font-size: 0.85rem; color: #1e3a8a; font-style: italic; line-height: 1.5;">
              ${lesson.extended.connective_bank.map((c) => `&ldquo;${c}&rdquo;`).join(' &bull; ')}
            </div>
          </div>
        `;
      }

      let startersHtml = '';
      if (lesson.extended.sentence_starters && lesson.extended.sentence_starters.length > 0) {
        startersHtml = `
          <div style="margin-top: 10px; padding: 10px 14px; background: #faf5ff; border: 1.5px solid #d8b4fe; border-radius: 6px;">
            <strong style="color: #6b21a8; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">
              Model Sentence Starters:
            </strong>
            <ul style="margin: 0; padding-left: 20px; font-size: 0.88rem; color: #581c87; line-height: 1.5;">
              ${lesson.extended.sentence_starters.map((st) => `<li><em>"${st}"</em></li>`).join('')}
            </ul>
          </div>
        `;
      }

      let sourceHtml = '';
      if (lesson.extended.source_a || lesson.extended.source_b) {
        sourceHtml = `<div style="display: flex; flex-wrap: wrap; gap: 20px; margin: 15px 0;">`;
        if (lesson.extended.source_a) {
          const prov =
            typeof lesson.extended.source_a === 'string' ? '' : lesson.extended.source_a.provenance;
          const content =
            typeof lesson.extended.source_a === 'string'
              ? lesson.extended.source_a
              : lesson.extended.source_a.content;
          const isImageA =
            typeof content === 'string' &&
            (content.toLowerCase().endsWith('.png') ||
              content.toLowerCase().endsWith('.jpg') ||
              content.toLowerCase().endsWith('.jpeg') ||
              content.toLowerCase().endsWith('.webp'));
          const renderedA = isImageA
            ? `<div style="text-align: center;"><img src="${getAssetUrl(content)}" style="max-width: 100%; max-height: 480px; object-fit: contain; border-radius: 6px; border: 1.5px solid #cbd5e1;" alt="Source A"></div>`
            : content.replace(/\n/g, '<br>');
          sourceHtml += `
               <div style="flex: 1 1 250px; display: flex; flex-direction: column; font-size: 0.95rem; line-height: 1.5;">
                 <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source A</strong>
                 ${prov ? `<span style="color: #334155; display: block; margin-bottom: 15px; font-style: italic;">${prov}</span>` : ''}
                 <div style="border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; background: #ffffff; color: #0f172a; flex-grow: 1;">
                   ${renderedA}
                 </div>
               </div>`;
        }
        if (lesson.extended.source_b) {
          const prov =
            typeof lesson.extended.source_b === 'string' ? '' : lesson.extended.source_b.provenance;
          const content =
            typeof lesson.extended.source_b === 'string'
              ? lesson.extended.source_b
              : lesson.extended.source_b.content;
          const isImageB =
            typeof content === 'string' &&
            (content.toLowerCase().endsWith('.png') ||
              content.toLowerCase().endsWith('.jpg') ||
              content.toLowerCase().endsWith('.jpeg') ||
              content.toLowerCase().endsWith('.webp'));
          const renderedB = isImageB
            ? `<div style="text-align: center;"><img src="${getAssetUrl(content)}" style="max-width: 100%; max-height: 480px; object-fit: contain; border-radius: 6px; border: 1.5px solid #cbd5e1;" alt="Source B"></div>`
            : content.replace(/\n/g, '<br>');
          sourceHtml += `
               <div style="flex: 1 1 250px; display: flex; flex-direction: column; font-size: 0.95rem; line-height: 1.5;">
                 <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source B</strong>
                 ${prov ? `<span style="color: #334155; display: block; margin-bottom: 15px; font-style: italic;">${prov}</span>` : ''}
                 <div style="border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; background: #ffffff; color: #0f172a; flex-grow: 1;">
                   ${renderedB}
                 </div>
               </div>`;
        }
        sourceHtml += `</div>`;
        if (lesson.extended.provenance_clue) {
          sourceHtml += `<details style="margin-top: 15px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; overflow: hidden;">
              <summary style="padding: 12px; cursor: pointer; color: #166534; font-weight: bold; list-style: none;">
                <i class="fa-solid fa-magnifying-glass" style="margin-right: 5px;"></i> Click to Reveal Provenance Scaffolding Clues
              </summary>
              <div style="padding: 0 12px 12px 12px; color: #15803d; border-top: 1px solid #bbf7d0; margin-top: 5px; padding-top: 12px;">
                ${lesson.extended.provenance_clue}
              </div>
            </details>`;
        }
      }

      gcseHtml += `
          <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
            <div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">
              ${lesson.extended.qNum ? `Q${lesson.extended.qNum}. ` : ''}${formatQuestion(lesson.extended.question, !lesson.extended.qNum)}
              <span style="display: inline-flex; vertical-align: middle; gap: 6px;">
                ${lesson.extended.model || lesson.extended.model_answer || lesson.extended.answer ? `<button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-icon-only btn-pedagogy-model" title="Reveal Model Answer" data-action="toggle-element" data-target-id="extended-model-${lesson.id}"><i class="fa-solid fa-check-double"></i></button>` : ''}
                ${lesson.extended.answer_image ? `<button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-model" title="Reveal Reference Map" data-action="toggle-element" data-target-id="extended-map-answer-${lesson.id}"><i class="fa-solid fa-map-location-dot"></i> Reveal Reference Map</button>` : ''}
                ${lesson.extended.title && lesson.extended.title.toLowerCase().includes('map task') ? `<button class="btn btn-pedagogy btn-pedagogy-sm" style="background: #0284c7; color: #ffffff; border: 1px solid #0369a1;" title="Interactive Classroom Map" data-action="toggle-element" data-target-id="extended-map-interactive-${lesson.id}"><i class="fa-solid fa-earth-americas"></i> Interactive Classroom Map</button>` : ''}
              </span>
            </div>
            ${sourceHtml}
            ${wordBankHtml}
            ${connectivesHtml}
            ${startersHtml}
            ${hintsHtml}
            ${
              lesson.extended.answer_image
                ? `
              <div id="extended-map-answer-${lesson.id}" style="display:none; margin-top: 15px; border: 2px solid #16a34a; border-radius: 8px; padding: 15px; background: #f0fdf4;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <strong style="color: #166534; font-size: 1.05rem;"><i class="fa-solid fa-circle-check"></i> Authoritative Reference Map (CIA World Factbook):</strong>
                  <a href="https://www.google.com/maps/@31.2,35.2,6z" target="_blank" rel="noopener noreferrer" style="font-size: 0.85rem; color: #166534; font-weight: 600; text-decoration: none; background: #dcfce7; padding: 3px 8px; border-radius: 4px; border: 1px solid #86efac;">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Google Maps Satellite
                  </a>
                </div>
                <div style="text-align: center;"><img src="${getAssetUrl(lesson.extended.answer_image)}" style="max-width: 100%; max-height: 520px; object-fit: contain; border-radius: 6px; border: 1px solid #86efac;" /></div>
              </div>
            `
                : ''
            }
            ${
              lesson.extended.title && lesson.extended.title.toLowerCase().includes('map task')
                ? `
              <div id="extended-map-interactive-${lesson.id}" style="display:none; margin-top: 15px; border: 2px solid #0284c7; border-radius: 8px; padding: 15px; background: #f0f9ff;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                  <strong style="color: #0369a1; font-size: 1.05rem;"><i class="fa-solid fa-earth-americas"></i> Interactive Whiteboard Explorer (Middle East):</strong>
                  <div style="display: flex; gap: 8px;">
                    <a href="https://www.google.com/maps/@31.2,35.2,6z" target="_blank" rel="noopener noreferrer" style="font-size: 0.85rem; color: #0284c7; font-weight: 600; text-decoration: none; background: #e0f2fe; padding: 4px 10px; border-radius: 4px; border: 1px solid #7dd3fc;">
                      <i class="fa-brands fa-google"></i> Google Maps Fullscreen
                    </a>
                  </div>
                </div>
                <p style="font-size: 0.85rem; color: #475569; margin: 0 0 10px 0;">Use mouse wheel or touch to zoom in/out on national borders, the Suez Canal, Straits of Tiran, Jerusalem, and regional waterways during classroom discussion.</p>
                <div style="width: 100%; height: 420px; border-radius: 6px; overflow: hidden; border: 1.5px solid #0284c7; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                  <iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=25.0%2C20.0%2C55.0%2C38.0&amp;layer=mapnik&amp;marker=31.5%2C35.0" style="border: 0;"></iframe>
                </div>
              </div>
            `
                : ''
            }
            <textarea class="student-answer-input" style="min-height: 200px;" placeholder="Write your extended response here..." oninput="window.updateProgress()"></textarea>
            ${lesson.extended.model || lesson.extended.model_answer || lesson.extended.answer ? `<div id="extended-model-${lesson.id}" class="scaffold-box model-box" style="display:none; margin-top: 15px;">${formatBold(lesson.extended.model || lesson.extended.model_answer || lesson.extended.answer)}</div>` : ''}
          </div>
        `;
    }

    if (lesson.secondary_map) {
      const sm = lesson.secondary_map;
      let smContent = sm.source_a
        ? typeof sm.source_a === 'string'
          ? sm.source_a
          : sm.source_a.content
        : '';
      let smHints = '';
      if (sm.hints && sm.hints.length > 0) {
        smHints = `<div style="margin-top: 15px; padding: 10px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px;"><strong style="color: #d97706;">Hints:</strong><ul style="margin: 5px 0 0 0; padding-left: 20px; color: #92400e;">${sm.hints.map((h) => `<li>${formatBold(h)}</li>`).join('')}</ul></div>`;
      }
      gcseHtml += `
        <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px; margin-top: 25px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
            <div style="font-weight: 700; font-size: 1.15rem; color: #1e3a8a;">
              ${sm.title}
            </div>
            ${sm.answer_image ? `<button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-model" data-action="toggle-element" data-target-id="secondary-map-answer-${lesson.id}"><i class="fa-solid fa-map-location-dot"></i> Reveal Reference Map</button>` : ''}
          </div>
          <p style="font-size: 0.95rem; color: #334155; line-height: 1.5; margin-bottom: 15px;">${formatBold(sm.instructions || sm.question)}</p>
          ${
            smContent
              ? `
            <div style="text-align: center; margin: 15px 0; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 15px; background: #f8fafc;">
              <img src="${getAssetUrl(smContent)}" style="max-width: 100%; max-height: 500px; object-fit: contain; border-radius: 4px;" alt="${sm.title}">
            </div>
          `
              : ''
          }
          ${smHints}
          ${
            sm.answer_image
              ? `
            <div id="secondary-map-answer-${lesson.id}" style="display:none; margin-top: 15px; border: 2px solid #16a34a; border-radius: 8px; padding: 15px; background: #f0fdf4;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <strong style="color: #166534; font-size: 1rem;"><i class="fa-solid fa-circle-check"></i> Model Answer & Reference Maps</strong>
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; margin-top: 10px;">
                <div style="flex: 1 1 300px; text-align: center;">
                  <div style="font-size: 0.85rem; font-weight: 700; color: #166534; margin-bottom: 6px;">Israel & Occupied Territories Reference</div>
                  <img src="${getAssetUrl(sm.answer_image)}" style="max-width: 100%; max-height: 480px; object-fit: contain; border-radius: 6px; border: 1px solid #bbf7d0;" alt="Reference Map">
                </div>
                ${
                  sm.macro_map
                    ? `
                  <div style="flex: 1 1 300px; text-align: center;">
                    <div style="font-size: 0.85rem; font-weight: 700; color: #166534; margin-bottom: 6px;">1967 Six-Day War Territorial Shift</div>
                    <img src="${getAssetUrl(sm.macro_map)}" style="max-width: 100%; max-height: 480px; object-fit: contain; border-radius: 6px; border: 1px solid #bbf7d0;" alt="Six-Day War Macro Map">
                  </div>
                `
                    : ''
                }
              </div>
              ${
                sm.historical_notes
                  ? `
                <div style="margin-top: 12px; padding: 10px; background: #ffffff; border: 1px solid #86efac; border-radius: 6px; font-size: 0.9rem; color: #14532d; line-height: 1.45;">
                  <strong>Historical Context:</strong> ${sm.historical_notes}
                </div>
              `
                  : ''
              }
            </div>
          `
              : ''
          }
        </div>
      `;
    }

    if (shouldRenderGcseTask) {
      if (lesson.gcse_task.tasks) {
        lesson.gcse_task.tasks.forEach((task, tIdx) => {
          const taskPrompt = task.stem || task.text || task.question || '';
          const taskModel = task.model_answer || task.model || '';
          const isUtility =
            (task.tariff && task.tariff.includes('2(a)')) || /utility|how useful/i.test(taskPrompt);
          const isFollowUp =
            (task.tariff && task.tariff.includes('2(b)')) ||
            /follow up/i.test(taskPrompt) ||
            !!task.table;

          let matrixHtml = '';
          if (isUtility) {
            matrixHtml = `
              <!-- 3-Step Utility Planning Matrix: Content • Provenance • Limitations -->
              <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 12px 14px; margin: 12px 0 14px 0;">
                <div style="font-weight: 700; font-size: 0.85rem; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                  <i class="fa-solid fa-table-columns"></i> 3-Step Utility Planning Matrix: Content &bull; Provenance &bull; Limitations
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
                  <div style="background: #ffffff; border: 1px solid #94a3b8; border-top: 3px solid #1e3a8a; border-radius: 6px; padding: 10px;">
                    <strong style="color: #1e3a8a; font-size: 0.84rem; display: block; margin-bottom: 4px;">1. CONTENT &amp; UTILITY</strong>
                    <div style="font-size: 0.8rem; color: #475569; line-height: 1.4;">Analyse what specific historical details the source reveals about the enquiry topic and corroborate with facts.</div>
                  </div>
                  <div style="background: #ffffff; border: 1px solid #94a3b8; border-top: 3px solid #1e3a8a; border-radius: 6px; padding: 10px;">
                    <strong style="color: #1e3a8a; font-size: 0.84rem; display: block; margin-bottom: 4px;">2. PROVENANCE &amp; MOTIVE</strong>
                    <div style="font-size: 0.8rem; color: #475569; line-height: 1.4;">Evaluate the author, origin, date, and purpose of the source to judge its reliability and typicality.</div>
                  </div>
                  <div style="background: #ffffff; border: 1px solid #94a3b8; border-top: 3px solid #1e3a8a; border-radius: 6px; padding: 10px;">
                    <strong style="color: #1e3a8a; font-size: 0.84rem; display: block; margin-bottom: 4px;">3. CONTEXT &amp; LIMITATIONS</strong>
                    <div style="font-size: 0.8rem; color: #475569; line-height: 1.4;">Cross-reference with own contextual knowledge to identify what crucial aspects the source omits.</div>
                  </div>
                </div>
              </div>
            `;
          }

          let tableHtml = '';
          if (task.table && Array.isArray(task.table)) {
            tableHtml = `
              <div style="margin: 12px 0 14px 0; overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #0f172a; font-size: 0.88rem; background: #ffffff;">
                  <thead>
                    <tr style="background: #0f172a; color: #ffffff;">
                      <th style="padding: 8px 12px; text-align: left; width: 36%;">Official Prompt</th>
                      <th style="padding: 8px 12px; text-align: left;">Your Response / Target Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${task.table
                      .map(
                        (row, rIdx) => `
                      <tr style="border-bottom: 1px solid #cbd5e1;">
                        <td style="padding: 8px 12px; font-weight: 700; background: #f8fafc; border-right: 1.5px solid #0f172a;">${row.row}</td>
                        <td style="padding: 6px 10px;">
                          <input type="text" class="student-answer-input" style="width: 100%; margin: 0; padding: 6px 8px; font-size: 0.86rem;" placeholder="Complete prompt...">
                          ${row.model ? `<div id="row-model-${tIdx}-${rIdx}" class="scaffold-box model-box" style="display:none; margin-top: 6px; font-size: 0.82rem;"><strong>Model:</strong> ${row.model}</div>` : ''}
                        </td>
                      </tr>
                    `,
                      )
                      .join('')}
                  </tbody>
                </table>
              </div>
            `;
          }

          gcseHtml += `
              <div class="do-now-card" style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; margin-bottom: 20px; padding: 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
                  ${task.tariff ? `<span style="background: #1e3a8a; color: #ffffff; font-size: 0.76rem; font-weight: 800; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">${task.tariff}</span>` : ''}
                  <span style="display: inline-flex; vertical-align: middle;">
                    ${taskModel ? `<button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-icon-only btn-pedagogy-model" title="Reveal Model Answer" data-action="toggle-element" data-target-id="gcse-model-${tIdx}"><i class="fa-solid fa-check-double"></i></button>` : ''}
                  </span>
                </div>
                <div style="font-weight: 700; margin-bottom: 10px; font-size: 1.05rem; color: #0f172a; line-height: 1.45;">
                  ${lesson.gcse_task.qNum && tIdx === 0 ? `Q${lesson.gcse_task.qNum}. ` : ''}${formatQuestion(taskPrompt, !(lesson.gcse_task.qNum && tIdx === 0))}
                </div>
                ${
                  task.provenance_clue
                    ? `
                  <div style="padding: 10px 14px; background: #eff6ff; border-left: 4px solid #2563eb; border-radius: 4px; font-size: 0.88rem; color: #1e40af; margin: 10px 0 14px 0; line-height: 1.45;">
                    <strong style="color: #1e3a8a;"><i class="fa-solid fa-lightbulb"></i> Provenance Clue:</strong> ${task.provenance_clue}
                  </div>
                `
                    : ''
                }
                ${matrixHtml}
                ${tableHtml}
                ${!task.table ? `<textarea class="student-answer-input" style="min-height: ${taskPrompt.includes('12 marks') || taskPrompt.includes('16 marks') ? '200px' : '110px'};" placeholder="Write your examination response here..." oninput="window.updateProgress()"></textarea>` : ''}
                ${taskModel ? `<div id="gcse-model-${tIdx}" class="scaffold-box model-box" style="display:none; margin-top: 15px; padding: 12px 16px; background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 6px; color: #166534; font-size: 0.92rem; line-height: 1.5;">${formatBold(taskModel)}</div>` : ''}
              </div>
            `;
        });
      } else if (lesson.gcse_task.sources) {
        let topicText = lesson.gcse_task.topic || '';
        let isNarrative = topicText.toLowerCase().includes('write a narrative account');

        if (isNarrative) {
          gcseHtml += `<p style="font-weight: bold; font-size: 1.15rem; color: #1e3a8a;">${lesson.gcse_task.qNum ? `Q${lesson.gcse_task.qNum}. ` : ''}${topicText}</p>`;
          gcseHtml += `<p style="font-size: 1rem; color: #475569; margin-bottom: 10px;"><em>Read the historical sources below before writing your narrative account:</em></p>`;
        } else {
          gcseHtml += `<p style="font-weight: bold; font-size: 1.15rem; color: #1e3a8a;">${lesson.gcse_task.qNum ? `Q${lesson.gcse_task.qNum}. ` : ''}How useful are Sources A and B for an enquiry into ${topicText}?</p>`;
        }

        gcseHtml += `<div style="display: flex; gap: 20px; margin-bottom: 20px; flex-wrap: wrap;">`;
        lesson.gcse_task.sources.forEach((srcObj) => {
          gcseHtml += `<div style="flex: 1; min-width: 300px; background: white; border: 1px solid #cbd5e1; padding: 15px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">`;
          if (srcObj.type === 'visual') {
            gcseHtml += `<img src="${getAssetUrl(srcObj.src)}" style="max-width: 100%; max-height: 250px; border-radius: 4px; margin-bottom: 10px;">`;
          } else {
            gcseHtml += `<blockquote style="font-size: 1.05rem; font-style: italic; color: #475569; margin: 0 0 15px 0; border-left: 4px solid #94a3b8; padding-left: 10px;">${formatBold(srcObj.text)}</blockquote>`;
          }
          gcseHtml += `<p style="font-size: 0.95rem; font-weight: bold; color: #334155; margin: 0;">${srcObj.title}</p>`;
          gcseHtml += `</div>`;
        });
        gcseHtml += `</div>`;

        if (lesson.gcse_task.scaffolding) {
          const sc = lesson.gcse_task.scaffolding;
          gcseHtml += `
            <div class="provenance-scaffold-box" style="margin: 15px 0 20px 0; padding: 14px 18px; background: #fffbeb; border: 1.5px solid #fcd34d; border-left: 5px solid #d97706; border-radius: 6px;">
              <strong style="color: #92400e; display: flex; align-items: center; gap: 8px; font-size: 1rem; margin-bottom: 8px;">
                <i class="fa-solid fa-magnifying-glass"></i> Provenance Clues &amp; Utility Stems (Edexcel 8-Mark Focus)
              </strong>
              ${
                sc.provenance_clues && sc.provenance_clues.length > 0
                  ? `
                <div style="margin-bottom: 10px;">
                  <span style="font-weight: 700; color: #b45309; font-size: 0.88rem; text-transform: uppercase; letter-spacing: 0.5px;">Provenance Clues (Nature, Origin, Purpose):</span>
                  <ul style="margin: 4px 0 0 0; padding-left: 20px; color: #78350f; font-size: 0.92rem; line-height: 1.5;">
                    ${sc.provenance_clues.map((c) => `<li>${formatBold(c)}</li>`).join('')}
                  </ul>
                </div>
              `
                  : ''
              }
              ${
                sc.utility_stems && sc.utility_stems.length > 0
                  ? `
                <div>
                  <span style="font-weight: 700; color: #b45309; font-size: 0.88rem; text-transform: uppercase; letter-spacing: 0.5px;">Tiered Sentence Starters:</span>
                  <ul style="margin: 4px 0 0 0; padding-left: 20px; color: #92400e; font-size: 0.92rem; line-height: 1.5;">
                    ${sc.utility_stems.map((s) => `<li>${formatBold(s)}</li>`).join('')}
                  </ul>
                </div>
              `
                  : ''
              }
            </div>
          `;
        }

        let placeholder = isNarrative
          ? 'Write your 8-mark narrative account here...'
          : 'Type your 8-mark utility evaluation here...';
        gcseHtml += `<textarea class="student-answer-input" style="min-height: 200px;" placeholder="${placeholder}" oninput="window.updateProgress()"></textarea>`;

        const gcseModel = lesson.gcse_task.model || lesson.gcse_task.model_answer;
        if (gcseModel) {
          gcseHtml += `<div style="margin-top: 15px;"><button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-model" data-action="toggle-element" data-target-id="gcse-model-src"><i class="fa-solid fa-check-double"></i> Reveal Model Answer</button></div>`;
          gcseHtml += `<div id="gcse-model-src" class="scaffold-box model-box" style="display:none; margin-top: 15px;">${formatBold(gcseModel)}</div>`;
        }
      } else if (lesson.gcse_task.question || lesson.gcse_task.prompt) {
        const renderGcseExamCard = (gt, cardSuffix = '') => {
          const qText = gt.question || gt.prompt || '';
          const qNum = gt.qNum ? `Q${gt.qNum}. ` : '';
          const typeStr = (gt.type || '').toLowerCase();
          let tariffBadge = 'GCSE Exam Practice';
          if (gt.tariff) {
            tariffBadge = gt.tariff;
          } else if (typeStr.includes('12_mark') || qText.includes('12 marks')) {
            tariffBadge = 'Edexcel Paper 1: Explain Why [12 Marks]';
          } else if (
            typeStr.includes('16_mark') ||
            qText.includes('16 marks') ||
            qText.includes('16+4 marks')
          ) {
            tariffBadge = 'Edexcel Paper 1: Evaluative Essay [16+4 Marks]';
          } else if (typeStr.includes('difference') || qText.toLowerCase().includes('different')) {
            tariffBadge = 'Edexcel Paper 1: Explain One Difference [4 Marks]';
          } else if (typeStr.includes('similarity') || qText.toLowerCase().includes('similar')) {
            tariffBadge = 'Edexcel Paper 1: Explain One Similarity [4 Marks]';
          } else if (typeStr.includes('4_mark') || qText.includes('4 marks')) {
            tariffBadge = 'Edexcel GCSE: Explain One Feature [4 Marks]';
          }

          const stimulusList = Array.isArray(gt.stimulus) ? gt.stimulus : [];
          const structureStrip = Array.isArray(gt.structure_strip) ? gt.structure_strip : [];
          const rawConnectives =
            gt.causal_connectives || gt.connective_bank || gt.sentence_stems || gt.stems || [];
          const connectives = Array.isArray(rawConnectives) ? rawConnectives : [];
          const vocabList = Array.isArray(gt.word_bank)
            ? gt.word_bank
            : Array.isArray(gt.vocab_bank)
              ? gt.vocab_bank
              : Array.isArray(lesson.vocab)
                ? lesson.vocab.map((v) => (typeof v === 'object' ? v.term : v)).filter(Boolean)
                : [];
          const modelAns = gt.model_answer || gt.model || '';
          const minHeight =
            typeStr.includes('12_mark') ||
            typeStr.includes('16_mark') ||
            qText.includes('12 marks') ||
            qText.includes('16 marks')
              ? '240px'
              : '140px';
          const cardId = `gcse-model-task-${lesson.id}${cardSuffix ? '-' + cardSuffix : ''}`;

          return `
          <div class="gcse-exam-task-box" style="background: #ffffff; border: 2px solid #1e3a8a; border-radius: 10px; padding: 22px; margin-bottom: 25px; box-shadow: 0 4px 14px rgba(30, 58, 138, 0.08);">
            <!-- Card Header -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 2px solid #e0f2fe; padding-bottom: 12px; flex-wrap: wrap; gap: 8px;">
              <h4 style="margin: 0; color: #1e3a8a; font-size: 1.18rem; font-weight: 800; display: flex; align-items: center; gap: 8px;">
                <i class="fa-solid fa-book-open" style="color: #2563eb;"></i>
                <span>${qNum}Pupil Workbook &bull; Edexcel Exam Practice</span>
              </h4>
              <span style="background: #1e3a8a; color: #ffffff; font-size: 0.75rem; font-weight: 800; padding: 4px 12px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px; display: inline-flex; align-items: center; gap: 6px;">
                <i class="fa-solid fa-award" style="color: #93c5fd;"></i> ${tariffBadge}
              </span>
            </div>

            <!-- Question Stem -->
            <div style="background: #f8fafc; border-left: 4px solid #1e3a8a; padding: 14px 18px; border-radius: 6px; margin-bottom: 16px;">
              <div style="font-size: 1.1rem; font-weight: 700; color: #0f172a; line-height: 1.5; margin-bottom: ${stimulusList.length > 0 ? '12px' : '0'};">
                ${formatBold(qText)}
              </div>
              ${
                stimulusList.length > 0
                  ? `
                <div style="background: #ffffff; border: 1.2px solid #cbd5e1; border-radius: 6px; padding: 10px 14px;">
                  <div style="font-size: 0.8rem; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                    <i class="fa-solid fa-circle-info" style="color: #3b82f6;"></i> Edexcel Stimulus Points (You must also use information of your own):
                  </div>
                  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    ${stimulusList
                      .map(
                        (s) =>
                          `<span style="background: #eff6ff; border: 1px solid #bfdbfe; color: #1e40af; font-size: 0.88rem; font-weight: 600; padding: 4px 10px; border-radius: 4px;">• ${s}</span>`,
                      )
                      .join('')}
                  </div>
                </div>
              `
                  : ''
              }
            </div>

            <!-- Pedagogical Guidance / Clue Box (if present) -->
            ${
              gt.hint || gt.clue
                ? `
              <div style="margin-bottom: 16px; background: #fffbeb; border: 1.2px solid #fde68a; border-left: 4px solid #f59e0b; border-radius: 6px; padding: 12px 16px;">
                <div style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; color: #b45309; letter-spacing: 0.5px; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
                  <i class="fa-solid fa-lightbulb" style="color: #f59e0b;"></i> Pedagogical Examination Guidance &amp; Clue:
                </div>
                <div style="font-size: 0.92rem; color: #78350f; line-height: 1.5;">${formatBold(gt.hint || gt.clue)}</div>
              </div>
            `
                : ''
            }

            <!-- Key Disciplinary Word Bank -->
            ${
              vocabList.length > 0
                ? `
              <div style="margin-bottom: 16px; background: #faf5ff; border: 1.2px solid #e9d5ff; border-radius: 8px; padding: 12px 16px;">
                <div style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; color: #7e22ce; letter-spacing: 0.5px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                  <i class="fa-solid fa-spell-check"></i> GCSE Key Vocabulary Bank (Incorporate into your response):
                </div>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                  ${vocabList
                    .map(
                      (w) =>
                        `<span style="background: #ffffff; border: 1px solid #d8b4fe; color: #6b21a8; font-size: 0.85rem; font-weight: 700; padding: 4px 10px; border-radius: 4px; box-shadow: 0 1px 2px rgba(107,33,168,0.06);">${w}</span>`,
                    )
                    .join('')}
                </div>
              </div>
            `
                : ''
            }

            <!-- Analytical Structure Strip -->
            ${
              structureStrip.length > 0
                ? `
              <div style="margin-bottom: 16px;">
                <div style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; color: #0369a1; letter-spacing: 0.5px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                  <i class="fa-solid fa-layer-group"></i> Analytical Structure Strip (Paragraph Breakdown):
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px;">
                  ${structureStrip
                    .map(
                      (st, sIdx) => `
                    <div style="background: #f0f9ff; border: 1.2px solid #bae6fd; border-radius: 6px; padding: 10px 12px;">
                      <div style="font-size: 0.8rem; font-weight: 800; color: #0369a1; text-transform: uppercase; margin-bottom: 4px; border-bottom: 1px solid #e0f2fe; padding-bottom: 3px;">
                        ${st.para || `Paragraph ${sIdx + 1}`}
                      </div>
                      <div style="font-size: 0.85rem; color: #1e293b; line-height: 1.4;">
                        ${st.focus || st.detail || ''}
                      </div>
                    </div>
                  `,
                    )
                    .join('')}
                </div>
              </div>
            `
                : ''
            }

            <!-- Causal Connectives & Sentence Starters -->
            ${
              connectives.length > 0
                ? `
              <div style="margin-bottom: 16px; background: #f0fdf4; border: 1.2px solid #bbf7d0; border-radius: 8px; padding: 12px 16px;">
                <div style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; color: #15803d; letter-spacing: 0.5px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                  <i class="fa-solid fa-pen-fancy"></i> Causal Connective Bank &amp; Tiered Sentence Starters:
                </div>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                  ${connectives
                    .map(
                      (c) =>
                        `<span style="background: #ffffff; border: 1px solid #86efac; color: #166534; font-size: 0.82rem; font-style: italic; padding: 4px 10px; border-radius: 4px;">&ldquo;${c}&rdquo;</span>`,
                    )
                    .join('')}
                </div>
              </div>
            `
                : ''
            }

            <!-- Student Response Textarea -->
            <div style="margin-bottom: 14px;">
              <label style="display: block; font-size: 0.85rem; font-weight: 700; color: #334155; margin-bottom: 6px;">
                Your Examination Response:
              </label>
              <textarea class="student-answer-input" style="width: 100%; box-sizing: border-box; min-height: ${minHeight}; padding: 12px; border: 1.5px solid #cbd5e1; border-radius: 6px; font-size: 0.95rem; line-height: 1.6; font-family: inherit; resize: vertical;" placeholder="Write your full exam response here..." oninput="if(window.updateProgress) window.updateProgress()"></textarea>
            </div>

            <!-- Model Answer Reveal -->
            ${
              modelAns
                ? `
              <div style="margin-top: 14px;">
                <button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-model" data-action="toggle-element" data-target-id="${cardId}">
                  <i class="fa-solid fa-check-double"></i> Reveal Examiner Model Answer
                </button>
                <div id="${cardId}" class="scaffold-box model-box" style="display:none; margin-top: 14px; background: #f8fafc; border: 1.5px solid #94a3b8; border-radius: 8px; padding: 16px; font-size: 0.95rem; line-height: 1.6; color: #0f172a;">
                  <div style="font-weight: 800; color: #1e3a8a; margin-bottom: 8px; text-transform: uppercase; font-size: 0.82rem; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
                    <i class="fa-solid fa-award"></i> Examiner-Grade Model Answer:
                  </div>
                  <div>${formatBold(modelAns)}</div>
                </div>
              </div>
            `
                : ''
            }
          </div>
        `;
        };

        if (lesson.four_mark_task) {
          gcseHtml += renderGcseExamCard(lesson.four_mark_task, 'q3');
        }
        gcseHtml += renderGcseExamCard(lesson.gcse_task, 'q4');
      }
    }

    if (extractedExamTasks.length > 0) {
      extractedExamTasks.forEach((task, tIdx) => {
        gcseHtml += `
            <div class="do-now-card" style="background: #ffffff; border: 1px solid #e2e8f0; margin-bottom: 20px;">
              <div style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">
                ${formatQuestion(task.text || task.question)}
                <span style="display: inline-flex; vertical-align: middle;">
                  ${task.model ? `<button class="btn btn-pedagogy btn-pedagogy-sm btn-pedagogy-icon-only btn-pedagogy-model" title="Reveal Model Answer" data-action="toggle-element" data-target-id="extracted-model-${tIdx}"><i class="fa-solid fa-check-double"></i></button>` : ''}
                </span>
              </div>
              <textarea class="student-answer-input" style="min-height: 200px;" placeholder="Write your response here..." oninput="window.updateProgress()"></textarea>
              ${task.model ? `<div id="extracted-model-${tIdx}" class="scaffold-box model-box" style="display:none; margin-top: 15px;">${formatBold(task.model)}</div>` : ''}
            </div>
          `;
      });
    }
    gcseHtml += `</div>`;
    html += gcseHtml;
  }

  // Extension Task
  if (lesson.extension_task) {
    html += `
        <div class="phase-card extension-task-card no-print" style="padding: 25px; background: linear-gradient(to right, #f8fafc, #f1f5f9); border: 2px dashed #cbd5e1; border-radius: 8px; margin-bottom: 30px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02); position: relative; overflow: hidden;">
          <div style="position: absolute; top: -15px; right: -15px; opacity: 0.05; font-size: 10rem; color: #1e3a8a;"><i class="fa-solid fa-laptop-code"></i></div>
          <div style="position: relative; z-index: 2;">
            <h3 style="margin-top: 0; color: #1e3a8a; font-size: 1.3rem; display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
              <i class="fa-solid fa-magnifying-glass-plus" style="color: #facc15;"></i> ${lesson.extension_task.title}
            </h3>
            <p style="color: #334155; font-size: 1.05rem; line-height: 1.6; margin-bottom: 20px;">
              ${lesson.extension_task.instructions}
            </p>
            ${
              lesson.extension_task.search_terms && lesson.extension_task.search_terms.length > 0
                ? `
            <div style="background: white; border: 1px solid #cbd5e1; border-radius: 6px; padding: 15px; margin-bottom: 15px;">
              <strong style="color: #0f172a; display: block; margin-bottom: 8px;"><i class="fa-brands fa-google" style="color: #ea4335; margin-right: 5px;"></i> Suggested Search Terms:</strong>
              <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                ${lesson.extension_task.search_terms.map((t) => `<span style="background: #f1f5f9; padding: 4px 10px; border-radius: 4px; border: 1px solid #e2e8f0; font-family: monospace; font-size: 0.95rem; color: #475569; user-select: all;">"${t}"</span>`).join('')}
              </div>
            </div>
            `
                : ''
            }
            ${
              lesson.extension_task.hyperlinks && lesson.extension_task.hyperlinks.length > 0
                ? `
            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
              ${lesson.extension_task.hyperlinks.map((l) => `<a href="${l.url}" target="_blank" class="btn btn-secondary" style="text-decoration: none; display: inline-flex; align-items: center; gap: 8px; border: 1px solid #94a3b8;"><i class="fa-solid fa-arrow-up-right-from-square" style="color: #3b82f6;"></i> ${l.text}</a>`).join('')}
            </div>
            `
                : ''
            }
          </div>
        </div>
    `;
  }

  // --- PLENARY RETRIEVAL QUIZ LAUNCHER (Compact ~80px card immediately above Exit Ticket) ---
  const rawLessonQuiz = lesson.quiz || lesson.quick_quiz || lesson.quiz_questions;
  if (rawLessonQuiz && rawLessonQuiz.length > 0 && appStore.state.activeUnitData.type !== 'trip') {
    let savedScoreBadge = '';
    try {
      const savedRaw = localStorage.getItem('history_quiz_' + lesson.id);
      if (savedRaw) {
        const s = JSON.parse(savedRaw);
        savedScoreBadge = `
          <span class="quiz-score-pill" style="background: #f0fdf4; color: #166534; border: 1.5px solid #86efac; padding: 6px 14px; border-radius: 20px; font-weight: 700; font-size: 0.88rem; display: inline-flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-circle-check"></i> Score: ${s.score}/${s.total} (${s.pct}%)
          </span>
          <button class="btn btn-secondary" onclick="window.startQuiz('${lesson.id}')" style="padding: 7px 14px; font-size: 0.85rem; font-weight: 600; margin-left: 8px;">
            <i class="fa-solid fa-rotate-right"></i> Re-take
          </button>
        `;
      }
    } catch (e) {}

    html += `
        <div class="phase-card no-print plenary-launcher-card" id="plenary-launcher-${lesson.id}" style="padding: 18px 24px; margin-bottom: 25px; background: #ffffff; border: 1.5px solid #cbd5e1; border-left: 5px solid #2563eb; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.03); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px; min-height: 80px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="width: 44px; height: 44px; border-radius: 12px; background: #eff6ff; display: flex; align-items: center; justify-content: center; font-size: 1.35rem; color: #2563eb; border: 1.5px solid #bfdbfe; flex-shrink: 0;">
              🎯
            </div>
            <div>
              <h3 style="margin: 0; color: #0f172a; font-size: 1.15rem; font-family: 'Playfair Display', Georgia, serif;">Plenary Retrieval Quiz</h3>
              <p style="margin: 3px 0 0 0; color: #64748b; font-size: 0.88rem;">Rapid closed-book recall &bull; <strong>${rawLessonQuiz.length} Questions</strong></p>
            </div>
          </div>
          <div id="quiz-status-badge-${lesson.id}" style="display: flex; align-items: center;">
            ${
              savedScoreBadge
                ? savedScoreBadge
                : `
              <button class="btn-pedagogy-primary" onclick="window.startQuiz('${lesson.id}')" style="padding: 10px 22px; font-size: 0.95rem; font-weight: 700; border-radius: 8px; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 10px rgba(37, 99, 235, 0.22); cursor: pointer;">
                <i class="fa-solid fa-rocket"></i> Launch Plenary Quiz
              </button>
            `
            }
          </div>
        </div>
      `;
  }

  // --- EXIT TICKET / LESSON CLOSURE ---
  if (lesson.exit_ticket) {
    const et = lesson.exit_ticket;
    html += `
      <div class="phase-card exit-ticket-card no-print" style="padding: 25px; background: #f8fafc; border: 2px solid #3b82f6; border-radius: 12px; margin-bottom: 30px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 16px;">
          <h3 style="margin: 0; color: #1e3a8a; font-size: 1.35rem; display: flex; align-items: center; gap: 10px; font-family: 'Playfair Display', serif;">
            <i class="fa-solid fa-ticket" style="color: #2563eb;"></i> ${et.title || 'Exit Ticket · Lesson Closure'}
          </h3>
          <span style="background: #dbeafe; color: #1e40af; font-size: 0.85rem; font-weight: 700; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">${et.type_label || 'Exit Ticket'}</span>
        </div>
        <p style="color: #1e293b; font-size: 1.05rem; line-height: 1.6; margin-bottom: 15px;">
          ${window.formatBold(et.prompt)}
        </p>
        ${
          et.options && et.options.length > 0
            ? `
          <div style="background: white; border: 1px solid #cbd5e1; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
            ${et.options.map((opt) => `<div style="padding: 8px 12px; margin-bottom: 6px; background: #f8fafc; border-radius: 6px; font-size: 1rem; color: #334155; border-left: 3px solid #94a3b8;">${window.formatBold(opt)}</div>`).join('')}
          </div>
        `
            : ''
        }
        ${
          et.guidance
            ? `
          <div style="font-size: 0.95rem; color: #64748b; font-style: italic; margin-bottom: 12px;">
            <strong>Teacher Guidance:</strong> ${window.formatBold(et.guidance)}
          </div>
        `
            : ''
        }
        <div style="margin-top: 15px;">
          <textarea class="form-control" placeholder="Write your exit ticket response here before leaving class..." style="width: 100%; min-height: 90px; border-radius: 8px; border: 1px solid #cbd5e1; padding: 12px; font-size: 1rem; line-height: 1.5;"></textarea>
        </div>
      </div>
    `;
  }

  // --- LESSON REFLECTION / DIRT PROMPT ---
  // Renders a visual prompt at the end of the final lesson,
  // directing pupils to the DIRT page in their printed workbook.
  if (lesson.lesson_reflection) {
    const ref = lesson.lesson_reflection;
    let instructionsHtml = '';
    if (ref.instructions && ref.instructions.length > 0) {
      instructionsHtml = `<ul style="margin: 12px 0 0 0; padding-left: 20px; color: #1e40af; font-size: 1rem; line-height: 1.7;">
        ${ref.instructions.map((i) => `<li>${i}</li>`).join('')}
      </ul>`;
    }
    html += `
      <div class="phase-card no-print" style="padding: 30px; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 2px solid #3b82f6; border-radius: 12px; margin-bottom: 30px; position: relative; overflow: hidden;">
        <div style="position: absolute; top: -20px; right: -20px; opacity: 0.08; font-size: 12rem; color: #1e40af;"><i class="fa-solid fa-book-open-reader"></i></div>
        <div style="position: relative; z-index: 2;">
          <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
            <div style="background: #3b82f6; color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0;">
              <i class="fa-solid fa-pen-to-square"></i>
            </div>
            <div>
              <h3 style="margin: 0; color: #1e3a8a; font-size: 1.3rem;">End of Unit Reflection & Pupil Voice</h3>
              <p style="margin: 2px 0 0; color: #3b82f6; font-size: 0.9rem; font-weight: 600;">DIRT — Dedicated Improvement and Reflection Time</p>
            </div>
          </div>
          <p style="color: #1e40af; font-size: 1.05rem; line-height: 1.6; margin: 0;">${ref.prompt}</p>
          ${instructionsHtml}
        </div>
      </div>
    `;
  }

  // Previous / Next Lesson Navigation Buttons
  if (currentIndex !== -1) {
    html += `<div style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 2px solid #e2e8f0; margin-bottom: 40px;">`;

    if (currentIndex > 0) {
      const prevLesson = allUnitLessons[currentIndex - 1];
      let prevLabel = 'Previous Lesson';
      if (isTrip && prevLesson) {
        if (prevLesson.id === 'day_0') {
          prevLabel = 'Pre-Trip Briefing';
        } else if (prevLesson.id && prevLesson.id.startsWith('day_')) {
          prevLabel = `Previous Day (${prevLesson.title.split(':')[0]})`;
        } else if (prevLesson.id === 'hero_crummack') {
          prevLabel = 'Pupil Family Hero: 2nd Lt Crummack';
        } else if (prevLesson.id && prevLesson.id.startsWith('hero_lowry_')) {
          prevLabel = `Previous Study: ${prevLesson.title.split('(')[0].trim()}`;
        } else if (prevLesson.id && prevLesson.id.startsWith('hero_')) {
          prevLabel = `Previous Hero: ${prevLesson.title.split('(')[0].trim()}`;
        } else {
          prevLabel = 'Previous';
        }
      }
      html += `<button class="btn btn-secondary" data-action="render-lesson" data-index="${currentIndex - 1}"><i class="fa-solid fa-arrow-left"></i> ${prevLabel}</button>`;
    } else {
      html += `<div></div>`;
    }

    if (currentIndex < allUnitLessons.length - 1) {
      const nextLesson = allUnitLessons[currentIndex + 1];
      let nextLabel = 'Next Lesson';
      if (isTrip && nextLesson) {
        if (nextLesson.id === 'day_0') {
          nextLabel = 'Pre-Trip Briefing';
        } else if (nextLesson.id && nextLesson.id.startsWith('day_')) {
          nextLabel = `Next Day (${nextLesson.title.split(':')[0]})`;
        } else if (nextLesson.id === 'hero_crummack') {
          nextLabel = 'Family Hero: 2nd Lt Crummack';
        } else if (nextLesson.id && nextLesson.id.startsWith('hero_lowry_')) {
          nextLabel = `Home Front: ${nextLesson.title.split('(')[0].trim()}`;
        } else if (nextLesson.id && nextLesson.id.startsWith('hero_')) {
          nextLabel = `Local Hero: ${nextLesson.title.split('(')[0].trim()}`;
        } else {
          nextLabel = 'Next';
        }
      }
      html += `<button class="btn-pedagogy-primary" data-action="render-lesson" data-index="${currentIndex + 1}">${nextLabel} <i class="fa-solid fa-arrow-right"></i></button>`;
    } else {
      html += `<div></div>`;
    }

    html += `</div>`;
  }

  const activeUnitEdition = (activeUnit && activeUnit.edition) || '2026.1';
  const hubPrefix = isKs2
    ? 'The History Revision Hub &bull; Key Stage 2 History'
    : isKs3
      ? 'The History Revision Hub &bull; Key Stage 3'
      : 'GCSE History Hub';
  html += `
    <div class="lesson-footer-meta" style="text-align: center; margin-top: 50px; padding: 16px; font-size: 0.8rem; color: #94a3b8; border-top: 1px solid #e2e8f0; font-family: 'Inter', sans-serif;">
      ${hubPrefix} &bull; Unit: ${activeUnit?.shortTitle || activeUnit?.title || unitId} &bull; Edition ${activeUnitEdition}
    </div>
  `;

  html += `</div>`; // End lesson-content wrapper

  contentArea.innerHTML = html;

  window.vocabMatchesFound = 0;
  if (window.resetVocabSelection) window.resetVocabSelection();
  setTimeout(() => {
    if (window.mermaid) {
      try {
        mermaid.init(undefined, document.querySelectorAll('.mermaid'));
      } catch (e) {
        console.error('Mermaid render error:', e);
      }
    }
    if (window.postRenderHooks) {
      window.postRenderHooks.forEach((hook) => hook());
      window.postRenderHooks = [];
    }
    if (typeof window.renderFloatingCmeMapButton === 'function') {
      window.renderFloatingCmeMapButton();
    }

    // Initialize Trip Map
    const mapContainer = document.getElementById('trip-map-container');
    if (mapContainer && window.L && lesson.do_now && lesson.do_now.type === 'timeline') {
      const eventsWithLoc = lesson.do_now.events.filter((e) => e.lat && e.lng);
      if (eventsWithLoc.length > 0) {
        if (window.tripMapInstance) {
          window.tripMapInstance.remove();
        }
        const map = L.map('trip-map-container');
        window.tripMapInstance = map;
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap contributors',
        }).addTo(map);

        const markers = [];
        eventsWithLoc.forEach((ev) => {
          const marker = L.marker([ev.lat, ev.lng]).addTo(map);
          let popupContent = `<strong>${ev.year} - ${ev.title}</strong><br>${ev.detail}`;

          if (appStore.state.activeUnitData.local_heroes) {
            const heroes = appStore.state.activeUnitData.local_heroes.filter((h) => {
              const loc = (h.visiting_location || h.memorial || h.cemetery || '').toLowerCase();
              const titleLower = (ev.title || '').toLowerCase();
              const detailLower = (ev.detail || '').toLowerCase();
              if (!loc) return false;
              if (titleLower.includes(loc) || detailLower.includes(loc)) return true;
              if (
                loc.includes('menin gate') &&
                (titleLower.includes('menin gate') || detailLower.includes('menin gate'))
              )
                return true;
              if (
                loc.includes('tyne cot') &&
                (titleLower.includes('tyne cot') || detailLower.includes('tyne cot'))
              )
                return true;
              return false;
            });
            if (heroes.length > 0) {
              popupContent += `<div style="margin-top: 15px; border: 2px solid #ef4444; border-radius: 8px; padding: 10px; background: #fef2f2;">
                  <h4 style="margin: 0 0 5px 0; color: #991b1b;"><i class="fa-solid fa-ribbon"></i> Local Connection</h4>`;
              heroes.forEach((h) => {
                popupContent += `<p style="margin: 0 0 5px 0; font-size: 0.9em; color: #7f1d1d;"><strong>${h.name}</strong> (${h.age}) - ${h.regiment}<br><em>${h.connection}</em><br>${h.story}</p>`;
              });
              popupContent += `</div>`;
            }
          }

          if (ev.youtube_id) {
            popupContent += `<div style="margin-top: 10px;"><button class="btn btn-secondary" data-action="open-video-modal" data-youtube="${ev.youtube_id}" style="width:100%; padding: 8px;"><i class="fa-brands fa-youtube" style="color:#ef4444; margin-right:5px;"></i> Play Video</button></div>`;
          }
          marker.bindPopup(popupContent, { minWidth: 250 });
          markers.push(marker);
        });

        if (markers.length > 0) {
          const group = new L.featureGroup(markers);
          map.fitBounds(group.getBounds().pad(0.2));

          // Draw Polyline connecting pins if not a local hero lesson
          if (!lesson.id || !lesson.id.startsWith('hero_')) {
            const latlngs = eventsWithLoc.map((ev) => [ev.lat, ev.lng]);
            L.polyline(latlngs, {
              color: '#ef4444',
              weight: 4,
              opacity: 0.7,
              dashArray: '10, 10',
              lineJoin: 'round',
            }).addTo(map);
          }
        }

        setTimeout(() => {
          if (window.tripMapInstance) {
            window.tripMapInstance.invalidateSize();
          }
        }, 200);
      }
    }

    // Initialize Crummack Lesson 13 Interactive Map Pins & Paleography Features
    if (unitId === 'trip_ypres' && lesson.id === 'hero_crummack') {
      initCrummackInteractiveFeatures();
    }

    // Auto-inject read-aloud buttons into all primary source excerpt cards
    injectArchivalAudioButtons();
  }, 100);
}

/**
 * Automatically inject read-aloud audio buttons into all archival primary source boxes
 * containing readable excerpt text (.archival-source-body).
 */
export function injectArchivalAudioButtons(container = document) {
  if (!container || !container.querySelectorAll) return;
  const sourceBoxes = container.querySelectorAll('.archival-source-box');
  sourceBoxes.forEach((box) => {
    const body = box.querySelector('.archival-source-body');
    if (!body || !body.textContent.trim()) return;

    // Skip if button or playback bar is already present
    if (box.querySelector('[data-action="read-aloud"], .read-aloud-btn, .read-aloud-playback-bar'))
      return;

    const barWrap = document.createElement('div');
    barWrap.innerHTML = renderAudioPlaybackBar(
      'Read Aloud Primary Source Excerpt',
      'source-audio-bar',
    );
    const bar = barWrap.firstElementChild;

    const header = box.querySelector('.archival-source-header');
    if (header) {
      // If header has a right-aligned container or stamp, append next to it, or append to header
      let rightContainer = header.querySelector('.archival-shelfmark-stamp')?.parentElement;
      if (
        rightContainer &&
        rightContainer !== header &&
        rightContainer.style.display?.includes('flex')
      ) {
        rightContainer.appendChild(bar);
      } else {
        const wrap = document.createElement('div');
        wrap.style.cssText = 'display: inline-flex; align-items: center; margin-left: auto;';
        wrap.appendChild(bar);
        header.appendChild(wrap);
      }
    } else {
      const topBar = document.createElement('div');
      topBar.className = 'archival-audio-bar no-print';
      topBar.style.cssText = 'display: flex; justify-content: flex-end; margin-bottom: 8px;';
      topBar.appendChild(bar);
      box.insertBefore(topBar, box.firstChild);
    }
  });
}

export function initCrummackInteractiveFeatures() {
  if (!document.getElementById('crummack-interactive-styles')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'crummack-interactive-styles';
    styleEl.textContent = `
      @keyframes radar-pulse-crimson {
        0% { transform: scale(1); opacity: 0.9; }
        70% { transform: scale(3.5); opacity: 0; }
        100% { transform: scale(3.5); opacity: 0; }
      }
      @keyframes radar-pulse-blue {
        0% { transform: scale(1); opacity: 0.9; }
        70% { transform: scale(3.5); opacity: 0; }
        100% { transform: scale(3.5); opacity: 0; }
      }
      @keyframes radar-pulse-green {
        0% { transform: scale(1); opacity: 0.9; }
        70% { transform: scale(3.5); opacity: 0; }
        100% { transform: scale(3.5); opacity: 0; }
      }

      .map-hotspot-pin {
        position: absolute !important;
        cursor: pointer !important;
        z-index: 10 !important;
        pointer-events: auto !important;
        transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
      }
      .map-hotspot-pin:hover,
      .map-hotspot-pin.active-pin {
        z-index: 30 !important;
      }
      .pin-pulse {
        position: absolute !important;
        left: 0;
        top: 0;
        transform: translate(-50%, -50%);
        width: 16px !important;
        height: 16px !important;
        border-radius: 50% !important;
        pointer-events: none !important;
        opacity: 0.35 !important;
      }
      .pin-pulse-crimson {
        background: rgba(185, 28, 28, 0.45) !important;
        animation: radar-pulse-crimson 2.2s infinite ease-out !important;
      }
      .pin-pulse-blue {
        background: rgba(29, 78, 216, 0.45) !important;
        animation: radar-pulse-blue 2.2s infinite ease-out !important;
      }
      .pin-pulse-green {
        background: rgba(4, 120, 87, 0.45) !important;
        animation: radar-pulse-green 2.2s infinite ease-out !important;
      }
      .pin-marker {
        position: absolute !important;
        left: 0;
        top: 0;
        transform: translate(-50%, -50%);
        width: 9px !important;
        height: 9px !important;
        border-radius: 50% !important;
        display: block !important;
        box-shadow: 0 1px 4px rgba(0,0,0,0.6) !important;
        z-index: 2 !important;
        border: 1.5px solid #ffffff !important;
        transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
      }
      .pin-marker-crimson { background: #b91c1c !important; }
      .pin-marker-blue { background: #1d4ed8 !important; }
      .pin-marker-green { background: #047857 !important; }
      .pin-core {
        display: none !important;
      }
      .pin-label {
        display: none !important;
        position: absolute !important;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-family: 'Inter', sans-serif !important;
        font-size: 0.70rem !important;
        font-weight: 700 !important;
        color: #ffffff !important;
        background: rgba(15, 23, 42, 0.94) !important;
        padding: 2px 7px !important;
        border-radius: 4px !important;
        box-shadow: 0 3px 8px rgba(0,0,0,0.45) !important;
        border: 1px solid rgba(255,255,255,0.25) !important;
        white-space: nowrap !important;
        pointer-events: none !important;
        backdrop-filter: blur(4px) !important;
        letter-spacing: 0.02em !important;
        z-index: 30 !important;
      }
      .map-hotspot-pin.pin-align-left .pin-label {
        left: auto !important;
        right: 10px !important;
      }
      .map-hotspot-pin:hover .pin-label {
        display: block !important;
      }
      .map-hotspot-pin:hover .pin-marker,
      .map-hotspot-pin.active-pin .pin-marker {
        width: 13px !important;
        height: 13px !important;
        border-color: #f59e0b !important;
        box-shadow: 0 0 10px rgba(245, 158, 11, 0.9) !important;
      }
      .map-hotspot-pin.active-pin .pin-label {
        border-color: #f59e0b !important;
        box-shadow: 0 0 12px rgba(245, 158, 11, 0.6) !important;
      }

      .scribal-box {
        position: absolute !important;
        border: 1.5px dashed #d97706 !important;
        background: rgba(217, 119, 6, 0.14) !important;
        border-radius: 3px !important;
        cursor: pointer !important;
        transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        z-index: 5 !important;
      }
      .scribal-box:hover {
        border-color: #b91c1c !important;
        background: rgba(185, 28, 28, 0.22) !important;
        transform: scale(1.02) !important;
      }
      .scribal-token {
        cursor: pointer !important;
        border-bottom: 2px solid #d97706 !important;
        background: rgba(254, 243, 199, 0.6) !important;
        padding: 1px 4px !important;
        border-radius: 3px !important;
        font-weight: 600 !important;
        color: #92400e !important;
        transition: all 0.2s ease !important;
        display: inline-block !important;
      }
      .scribal-token:hover {
        background: #fee2e2 !important;
        border-bottom-color: #b91c1c !important;
        color: #991b1b !important;
      }
    `;
    document.head.appendChild(styleEl);
  }

  const mapData = {
    1: {
      name: 'Sains-lez-Marquion · 2nd Lt Crummack MC Action',
      badge: 'Pin 1 · Primary Attack Axis',
      badgeColor: '#b91c1c',
      badgeBg: '#fee2e2',
      date: '27–29 September 1918',
      formations: '2/4th Battalion, York & Lancaster Regiment · 62nd (West Riding) Division',
      coords: 'British Trench Map 51B.N.W. · Square E.14.c (Sains-lez-Marquion)',
      summary:
        'Advancing east of the dry canal bed towards Sains-lez-Marquion, the 2/4th York & Lancasters were pinned down by severe, interlocking Maxim machine-gun fire from reinforced cellar positions and sunken road embankments. 2nd Lieutenant Crummack personally led a bombing dash through heavy machine-gun sweeps, killed the enemy crew, captured the gun, and enabled the entire brigade to break into the Hindenburg support trenches.',
      quote:
        '"When his company was held up by heavy machine-gun fire, 2nd Lt Crummack led a small party forward with the greatest dash and determination, captured the enemy gun, killed the crew, and enabled the company to advance." — London Gazette Official Citation',
      cardId: 'tactical-card-1',
      pinId: 'pin-sains',
    },
    2: {
      name: 'Lock 3 / Dry Canal Crossing · The Funnel Chokepoint',
      badge: 'Pin 2 · Engineering Obstacle',
      badgeColor: '#1d4ed8',
      badgeBg: '#dbeafe',
      date: '27 September 1918 (Zero Hour: 05:20)',
      formations: '4th British Division & 1st Canadian Division (General Sir Arthur Currie)',
      coords: 'Canal du Nord Excavation · Lock 3 (South of Sains-lez-Marquion)',
      summary:
        'The Canal du Nord was an unfinished 100-foot-wide excavation. While northern and southern stretches were deeply flooded marshes, a narrow 400-yard dry sector between Lock 3 and Mœuvres presented the only viable crossing. Allied commanders boldly funneled four complete infantry divisions through this narrow gap under creeping barrage cover, spreading fanwise across the eastern bank once across.',
      quote:
        '"The crossing of the dry Canal du Nord was an audacious tactical gamble. Had the German artillery found our funnel at Lock 3, the carnage would have been unthinkable; yet the speed and coordination of our advance completely broke the enemy center." — 4th Division War Diary',
      cardId: 'tactical-card-2',
      pinId: 'pin-lock3',
    },
    3: {
      name: 'Bourlon Wood Crest · Commanding Observation Post',
      badge: 'Pin 3 · Strategic Objective',
      badgeColor: '#047857',
      badgeBg: '#d1fae5',
      date: '27 September – 1 October 1918',
      formations: '4th Canadian Division & 62nd (West Riding) Division',
      coords: 'High Ground 120m Spot Height · Dominating Cambrai Plains',
      summary:
        'Bourlon Wood occupies the highest topographical ridge between Bapaume and Cambrai, offering panoramic observation across the entire German defensive zone. German defenders had fortified the dense woodland with concrete machine-gun pillboxes and tangled wire. Allied combined arms—supported by heavy tank battalions and relentless rolling artillery—swept through the wood on 27 September, depriving the German army of its master observation post.',
      quote:
        '"From Bourlon Wood crest, the entire Cambrai basin lay exposed beneath our eyes. Once the wood was taken, the Hindenburg Line was irrevocably cracked." — General Sir Julian Byng, Third Army Commander',
      cardId: 'tactical-card-3',
      pinId: 'pin-bourlon',
    },
  };

  const scribalData = {
    1: {
      line: 'Line 6',
      title: 'Pastoral English Radiance vs Frontline Mud',
      original: "Orange and red and all the eye's delight",
      revised: "Yellow and red and all the eye's delight",
      paleoAnalysis:
        'In his pocket notebook in July 1916, Sassoon opened the elegy with a sensory memory of English summertime. Why reject "Orange" for "Yellow"? Yellow evokes the piercing, crystalline sunlight of early morning England ("glittering brass / Of rays low on brown roofs"). In contrast to the filthy, stagnant gray-brown Picardy mud where his friend Marcus Goodall lay bleeding to death along Mill Road, the flash of yellow creates an unbearable emotional dissonance between home and slaughter.',
      hingeQuestion:
        'How does Sassoon\'s substitution of "Yellow" for "Orange" intensify the psychological shock of hearing that Marcus Goodall had fallen in Thiepval Wood?',
    },
    2: {
      line: 'Line 10',
      title: 'Kinetic Dissipation: Somme Smoke & Failing Consciousness',
      original: 'Following & a whirling & subsiding, — where?',
      revised: 'Thinning & whirling & subsiding, — where?',
      paleoAnalysis:
        'The original line ("Following") was passive and inert. By altering it to "Thinning & whirling & subsiding", Sassoon creates a cinematic, triple-part kinetic description. The line operates on two simultaneous planes: literally describing the acrid smoke of German high-explosive shells dispersing across Mill Road, and metaphorically tracking the racing thoughts of Goodall\'s dying mind thinning into nothingness.',
      hingeQuestion:
        'Why is "Thinning" far more effective than "Following" in portraying a young soldier losing consciousness on the battlefield?',
    },
    3: {
      line: 'Line 11',
      title: 'Rejection of Pity: Dignity in Frontline Sorrow',
      original: 'Poor victim, could you see your body thrown',
      revised: 'Sad victim, could you see your body thrown',
      paleoAnalysis:
        'This is Sassoon\'s most profound ethical revision in the manuscript. "Poor victim" carried overtones of helpless, patronizing pity—the sentimental language of civilians back in England. Sassoon forcefully struck out "Poor" and substituted "Sad". "Sad victim" restores moral dignity to Marcus Goodall. It acknowledges his tragic sacrifice without reducing a brave subaltern into a pitiable weakling, reflecting the fierce frontline pride of combat subalterns.',
      hingeQuestion:
        'Why did frontline combatants like Sassoon detest being pitied as "poor" soldiers by civilians back home?',
    },
    4: {
      line: 'Line 21',
      title: 'The Mud as a Mortal Grave: "Dead Clay"',
      original: "You'll no more need to cling to the wet clay",
      revised: "You'll no more need to cling to the dead clay",
      paleoAnalysis:
        'In the final stanza, Sassoon imagines Goodall escaping earthly suffering into heaven. The first draft described "wet clay"—a familiar physical annoyance of trench life. But Sassoon altered it to "dead clay". This single word transforms the Picardy soil: it is no longer merely wet earth, but a necrotic, grasping substance infused with the rot of corpses that clings to the living and dead alike.',
      hingeQuestion:
        'How does altering "wet clay" to "dead clay" strip away any lingering romantic illusions about death on the Somme?',
    },
  };

  window.selectMapPin = function (pinId) {
    const data = mapData[pinId];
    if (!data) return;

    // Update pin elements
    document
      .querySelectorAll('.map-hotspot-pin')
      .forEach((el) => el.classList.remove('active-pin'));
    const targetPin = document.getElementById(data.pinId);
    if (targetPin) targetPin.classList.add('active-pin');

    // Update tactical intel banner
    const banner = document.getElementById('tactical-intel-banner');
    if (banner) {
      banner.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px; margin-bottom: 8px;">
          <div>
            <span style="font-family: 'Inter', sans-serif; font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; background: ${data.badgeBg}; color: ${data.badgeColor}; padding: 2px 8px; border-radius: 4px;">
              ${data.badge}
            </span>
            <h4 style="margin: 4px 0 0 0; color: #ffffff; font-size: 1.15rem; font-family: 'Playfair Display', serif;">
              ${data.name}
            </h4>
          </div>
          <div style="text-align: right; font-family: 'Inter', sans-serif; font-size: 0.75rem; color: #94a3b8;">
            <strong style="color: #f59e0b;">${data.date}</strong><br>
            <span>${data.coords}</span>
          </div>
        </div>
        <p style="margin: 0 0 10px 0; font-size: 0.92rem; color: #cbd5e1; line-height: 1.55;">
          ${data.summary}
        </p>
        <div style="background: rgba(255,255,255,0.06); border-left: 3px solid ${data.badgeColor}; padding: 8px 12px; border-radius: 4px; font-style: italic; font-size: 0.85rem; color: #f1f5f9; line-height: 1.45;">
          ${data.quote}
        </div>
      `;
    }

    // Update bottom analysis cards
    document.querySelectorAll('.tactical-analysis-card').forEach((c) => {
      c.style.borderColor = '#cbd5e1';
      c.style.boxShadow = 'none';
      c.style.background = '#ffffff';
    });
    const activeCard = document.getElementById(data.cardId);
    if (activeCard) {
      activeCard.style.borderColor = data.badgeColor;
      activeCard.style.boxShadow = `0 4px 12px ${data.badgeColor}33`;
      activeCard.style.background = '#f8fafc';
    }
  };

  window.selectScribalHotspot = function (id) {
    const data = scribalData[id];
    if (!data) return;

    // Highlight manuscript bounding box
    document.querySelectorAll('.scribal-box').forEach((b) => {
      b.style.border = '1.5px dashed #d97706';
      b.style.background = 'rgba(217, 119, 6, 0.14)';
      b.style.transform = 'scale(1)';
      b.style.boxShadow = 'none';
    });
    const targetBox = document.getElementById(`scribal-box-${id}`);
    if (targetBox) {
      targetBox.style.border = '2.5px solid #b91c1c';
      targetBox.style.background = 'rgba(185, 28, 28, 0.28)';
      targetBox.style.transform = 'scale(1.03)';
      targetBox.style.boxShadow = '0 0 14px rgba(185, 28, 28, 0.6)';
    }

    // Highlight transcript tokens
    document.querySelectorAll('.scribal-token').forEach((t) => {
      t.style.background = 'rgba(254, 243, 199, 0.6)';
      t.style.borderColor = '#d97706';
      t.style.color = '#78350f';
      t.style.fontWeight = '600';
    });
    const targetToken = document.querySelector(`.scribal-token-${id}`);
    if (targetToken) {
      targetToken.style.background = '#fee2e2';
      targetToken.style.borderColor = '#b91c1c';
      targetToken.style.color = '#991b1b';
      targetToken.style.fontWeight = '700';
    }

    // Update buttons
    document.querySelectorAll('.paleo-nav-btn').forEach((btn) => {
      btn.style.background = '#ffffff';
      btn.style.color = '#475569';
      btn.style.borderColor = '#cbd5e1';
    });
    const activeBtn = document.getElementById(`paleo-btn-${id}`);
    if (activeBtn) {
      activeBtn.style.background = '#7f1d1d';
      activeBtn.style.color = '#ffffff';
      activeBtn.style.borderColor = '#7f1d1d';
    }

    // Update Inspector content
    const panel = document.getElementById('scribal-inspector-content');
    if (panel) {
      panel.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 12px; flex-wrap: wrap; gap: 6px;">
          <div>
            <span style="font-family: 'Inter', sans-serif; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; background: #fee2e2; color: #991b1b; padding: 2px 7px; border-radius: 4px;">
              ${data.line} · Holograph Revision [${id}/4]
            </span>
            <h5 style="margin: 4px 0 0 0; color: #7f1d1d; font-size: 1.1rem; font-family: 'Playfair Display', serif;">
              ${data.title}
            </h5>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px; font-size: 0.82rem;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 12px;">
            <strong style="color: #64748b; font-size: 0.72rem; text-transform: uppercase; display: block; margin-bottom: 2px;">Original Holograph Draft:</strong>
            <span style="text-decoration: line-through; color: #64748b; font-family: 'Georgia', serif; font-size: 0.95rem;">&ldquo;${data.original}&rdquo;</span>
          </div>
          <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 8px 12px;">
            <strong style="color: #991b1b; font-size: 0.72rem; text-transform: uppercase; display: block; margin-bottom: 2px;">Revised Autograph Text:</strong>
            <span style="font-weight: 700; color: #991b1b; font-family: 'Georgia', serif; font-size: 0.95rem;">&ldquo;${data.revised}&rdquo;</span>
          </div>
        </div>

        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 3.5px solid #d97706; padding: 10px 14px; border-radius: 4px; margin-bottom: 10px; font-size: 0.88rem; line-height: 1.55; color: #334155;">
          <strong style="color: #78350f; display: block; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Forensic Paleographical Analysis:</strong>
          ${data.paleoAnalysis}
        </div>

        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 10px 14px; font-size: 0.85rem; line-height: 1.5; color: #1e3a8a;">
          <strong style="display: block; font-size: 0.76rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 3px; color: #1d4ed8;">Hinge Question for Class Discussion:</strong>
          ${data.hingeQuestion}
        </div>
      `;
    }
  };

  let allHotspotsVisible = true;
  window.toggleAllScribalHotspots = function () {
    allHotspotsVisible = !allHotspotsVisible;
    document.querySelectorAll('.scribal-box').forEach((b) => {
      b.style.opacity = allHotspotsVisible ? '1' : '0.15';
    });
    const toggleBtn = document.getElementById('toggle-hotspots-btn');
    if (toggleBtn) {
      toggleBtn.innerText = allHotspotsVisible ? 'Hide Overlays' : 'Show All Overlays';
    }
  };

  // Initial selection with a slight tick to allow DOM elements to paint
  setTimeout(() => {
    if (typeof window.selectMapPin === 'function') window.selectMapPin(1);
    if (typeof window.selectScribalHotspot === 'function') window.selectScribalHotspot(1);
  }, 50);
}

export function assignQuestionNumbers(lesson, targetUnitId) {
  const unit =
    targetUnitId ||
    (lesson && lesson.unitId) ||
    (typeof window !== 'undefined' && window.currentUnitId) ||
    (typeof appStore !== 'undefined' && appStore?.state?.selectedUnitId) ||
    (typeof appStore !== 'undefined' && appStore?.state?.activeUnitData?.id) ||
    (typeof window !== 'undefined' && window.location && window.location.search
      ? new URLSearchParams(window.location.search).get('id') ||
        new URLSearchParams(window.location.search).get('unit')
      : null);

  let globalQNum = 1;
  const isGCSE = ['cme_new', 'edexcel_medicine', 'eee', 'weimar_nazi_germany', 'usa'].includes(
    unit,
  );
  const isGreatWar = unit === 'great_war' || unit === 'great_war_part2';
  const hasNarrativeBlocks = Boolean(lesson.narrative_blocks && lesson.narrative_blocks.length > 0);

  // 1. Primary Source
  if (lesson.primary_source && lesson.primary_source.question) {
    lesson.primary_source.qNum = globalQNum++;
  }

  // 2. Sources (non-GCSE units)
  if (lesson.sources && lesson.sources.length > 0 && !isGCSE) {
    lesson.sources.forEach((source) => {
      if (source.question) source.qNum = globalQNum++;
    });
  }

  // 3. Narrative Blocks
  if (lesson.narrative_blocks) {
    lesson.narrative_blocks.forEach((block) => {
      if (block.source && block.source.question) block.source.qNum = globalQNum++;
      if (Array.isArray(block.sources)) {
        block.sources.forEach((s) => {
          if (s && s.question) s.qNum = globalQNum++;
        });
      }
      if (block.tasks) {
        block.tasks.forEach((task) => {
          if (
            typeof task === 'object' &&
            task !== null &&
            task.type !== 'vocab_match' &&
            task.type !== 'drag_drop_timeline'
          ) {
            task.qNum = globalQNum++;
          }
        });
      }
    });
  }

  // 4. Pair Share (for all units except Great War)
  if (lesson.pair_share && !isGreatWar) {
    lesson.pair_share.qNum = globalQNum++;
  }

  // 5. Standard Tasks
  if (lesson.tasks) {
    lesson.tasks.forEach((task) => {
      if (typeof task === 'object' && task !== null) {
        if (
          task.type !== 'gcse_exam_practice' &&
          task.type !== 'exam_practice' &&
          task.type !== 'drawing' &&
          task.type !== 'draw'
        ) {
          task.qNum = globalQNum++;
        }
      }
    });
  }

  // 6. Historian's Corner
  if (lesson.historians_corner && !lesson.historians_corner.textbook_only) {
    if (lesson.historians_corner.stretch_question) {
      lesson.historians_corner.qNum = globalQNum++;
    }
  }

  // 7. Exam Practice Tasks
  if (lesson.tasks) {
    lesson.tasks.forEach((task) => {
      if (typeof task === 'object' && task !== null) {
        if (task.type === 'gcse_exam_practice' || task.type === 'exam_practice') {
          task.qNum = globalQNum++;
        }
      }
    });
  }

  // 8. Pair Share (for Great War)
  if (lesson.pair_share && isGreatWar) {
    lesson.pair_share.qNum = globalQNum++;
  }

  // 9. Extended Writing
  if (lesson.extended && lesson.extended.question) {
    lesson.extended.qNum = globalQNum++;
  }

  // 10. GCSE Task
  if (lesson.gcse_task) {
    if (lesson.gcse_task.tasks && Array.isArray(lesson.gcse_task.tasks)) {
      lesson.gcse_task.tasks.forEach((task) => {
        if (typeof task === 'object' && task !== null) {
          task.qNum = globalQNum++;
        }
      });
    } else {
      lesson.gcse_task.qNum = globalQNum++;
    }
  }
}

if (typeof window !== 'undefined') {
  window.assignQuestionNumbers = assignQuestionNumbers;
}

export function renderPoetryDossiersHTML(poetryDossiers) {
  if (!poetryDossiers || !Array.isArray(poetryDossiers) || poetryDossiers.length === 0) {
    return '';
  }

  let html = `
    <div class="phase-card poetry-dossiers-section" style="margin-top: 35px; border: 1px solid #e2e8f0; border-top: 4px solid #7f1d1d; border-radius: 10px; padding: 25px; background: #ffffff; box-shadow: 0 4px 15px rgba(0,0,0,0.04);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #fecaca; padding-bottom: 12px; margin-bottom: 22px; flex-wrap: wrap; gap: 10px;">
        <div>
          <span style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; background: #fee2e2; color: #991b1b; padding: 3px 10px; border-radius: 12px; display: inline-block; margin-bottom: 6px;">
            Field Poetry &amp; Eyewitness Voices
          </span>
          <h3 style="margin: 0; color: #7f1d1d; font-size: 1.45rem; font-family: 'Playfair Display', serif;">
            Voices of the Salient · On-Site Readings
          </h3>
        </div>
        <button class="btn btn-secondary" data-action="open-anthology-modal" style="font-size: 0.85rem; padding: 7px 14px; background: #fafafa; border: 1px solid #cbd5e1; font-weight: 600; color: #7f1d1d; display: inline-flex; align-items: center; gap: 6px; border-radius: 6px; cursor: pointer;">
          <i class="fa-solid fa-book-open"></i> Full 16-Poem Anthology
        </button>
      </div>
      <p style="color: #475569; font-size: 0.95rem; margin-top: 0; margin-bottom: 25px; line-height: 1.5;">
        At each battlefield stop, recite these frontline eyewitness verses. Where two poems are provided, select either voice using the tab switcher. Expand the teacher commentary for on-site speaking cues and the historical rationale for deeper class discussion.
      </p>
      <div style="display: flex; flex-direction: column; gap: 28px;">
  `;

  poetryDossiers.forEach((stop, sIdx) => {
    const hasMultiple = stop.poems && stop.poems.length > 1;
    html += `
      <div class="poetry-dossier-card" id="poetry-${stop.site_id}" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 22px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; flex-wrap: wrap; gap: 8px;">
          <div>
            <span style="font-size: 0.72rem; font-weight: 700; color: #991b1b; text-transform: uppercase; letter-spacing: 0.05em; display: block;">Stop ${sIdx + 1} Field Reading</span>
            <h4 style="margin: 2px 0 0 0; color: #0f172a; font-size: 1.2rem; font-family: 'Playfair Display', serif;">
              ${stop.site_name}
            </h4>
          </div>
          <span style="font-size: 0.78rem; font-weight: 700; background: #f1f5f9; color: #475569; padding: 4px 10px; border-radius: 14px; border: 1px solid #e2e8f0;">
            ${stop.stop_time}
          </span>
        </div>
    `;

    if (hasMultiple) {
      html += `
        <div style="display: flex; gap: 8px; margin-bottom: 18px; flex-wrap: wrap; align-items: center; background: #f8fafc; padding: 8px 12px; border-radius: 6px; border: 1px solid #e2e8f0;">
          <span style="font-size: 0.78rem; font-weight: 700; color: #64748b; margin-right: 4px;">Choose Voice:</span>
          ${stop.poems
            .map(
              (p, pIdx) => `
            <button class="btn poet-tab-btn" data-action="switch-poet-tab" data-target-poet="pane-${stop.site_id}-${p.id}" style="padding: 5px 12px; font-size: 0.82rem; border-radius: 16px; border: 1px solid ${pIdx === 0 ? '#7f1d1d' : '#cbd5e1'}; background: ${pIdx === 0 ? '#7f1d1d' : '#ffffff'}; color: ${pIdx === 0 ? '#ffffff' : '#475569'}; font-weight: ${pIdx === 0 ? '700' : '600'}; cursor: pointer; transition: all 0.2s;">
              <i class="fa-solid fa-feather-pointed" style="margin-right: 4px;"></i> ${p.poet.name.split(',')[0]}: <em>"${p.title}"</em>
            </button>
          `,
            )
            .join('')}
        </div>
      `;
    }

    stop.poems.forEach((poem, pIdx) => {
      const isVisible = pIdx === 0;
      html += `
        <div class="poet-view-pane" id="pane-${stop.site_id}-${poem.id}" style="display: ${isVisible ? 'block' : 'none'};">
          <!-- Poet Profile Header -->
          <div class="poet-profile-header" style="display: flex; flex-wrap: wrap; gap: 18px; align-items: flex-start; background: #faf8f5; border: 1px solid #e7dfd5; border-radius: 8px; padding: 18px; margin-bottom: 18px;">
            <div class="poet-portrait-col" style="flex: 0 0 115px; text-align: center;">
              <img src="${poem.poet.portrait}" alt="${poem.poet.name}" style="width: 115px; height: 145px; object-fit: cover; border-radius: 6px; border: 1px solid #cbd5e1; box-shadow: 0 2px 6px rgba(0,0,0,0.12); cursor: zoom-in;" data-action="open-modal" data-src="${poem.poet.portrait}">
              <small style="display: block; margin-top: 5px; font-size: 0.75rem; color: #64748b; font-weight: 600;">${poem.poet.lifespan}</small>
            </div>
            <div class="poet-bio-col" style="flex: 1; min-width: 240px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; flex-wrap: wrap;">
                <div>
                  <h4 style="margin: 0; color: #1e293b; font-size: 1.25rem; font-family: 'Playfair Display', serif;">${poem.poet.name}</h4>
                  <div style="font-size: 0.85rem; color: #78350f; font-weight: 600; margin-top: 2px;">${poem.poet.role}</div>
                </div>
                <span style="font-size: 0.75rem; font-weight: 700; background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 10px; border: 1px solid #fde68a;">${poem.year}</span>
              </div>
              <p style="margin: 10px 0 0 0; color: #334155; font-size: 0.92rem; line-height: 1.6;">${poem.bio}</p>
            </div>
          </div>

          <!-- Unabridged Poem Box -->
          <div class="poem-blockquote-box" style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 4px solid #991b1b; border-radius: 6px; padding: 22px 26px; margin-bottom: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.03);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 1px dashed #e2e8f0; padding-bottom: 8px;">
              <h5 style="margin: 0; font-size: 1.2rem; color: #1e3a8a; font-family: 'Playfair Display', serif; font-style: italic;">
                "${poem.title}"
              </h5>
              <span style="font-size: 0.78rem; color: #64748b;"><i class="fa-regular fa-calendar" style="margin-right: 4px;"></i>${poem.year}</span>
            </div>
            <div class="poem-text-content" style="font-family: 'Georgia', serif; font-size: 1.02rem; line-height: 1.85; color: #1e293b; white-space: pre-line; margin: 0; overflow-wrap: break-word; word-break: normal;">
${poem.poem_text}
            </div>
            <div style="text-align: right; margin-top: 14px; font-size: 0.85rem; color: #64748b; font-style: italic;">
              — ${poem.poet.name} (${poem.poet.lifespan})
            </div>
          </div>

          <!-- Collapsible Teacher Guide Drawer -->
          <details style="background: #eff6ff; border: 1px solid #bfdbfe; border-left: 4px solid #2563eb; border-radius: 6px; margin-bottom: 12px; overflow: hidden;">
            <summary style="padding: 10px 14px; cursor: pointer; font-weight: 700; color: #1d4ed8; font-size: 0.92rem; display: flex; align-items: center; justify-content: space-between; user-select: none;">
              <span><i class="fa-solid fa-bullhorn" style="margin-right: 8px; color: #2563eb;"></i> On-Site Teacher Guidance: What to Say Here</span>
              <i class="fa-solid fa-chevron-down" style="font-size: 0.8rem; color: #60a5fa;"></i>
            </summary>
            <div style="padding: 14px 18px; border-top: 1px solid #bfdbfe; font-size: 0.93rem; line-height: 1.6; color: #1e3a8a; background: #ffffff;">
              ${poem.teacher_commentary}
            </div>
          </details>

          <!-- Collapsible In-Depth Historical & Pedagogical Rationale Drawer -->
          <details style="background: #fdfaf6; border: 1px solid #fed7aa; border-left: 4px solid #ea580c; border-radius: 6px; margin-bottom: 8px; overflow: hidden;">
            <summary style="padding: 10px 14px; cursor: pointer; font-weight: 700; color: #9a3412; font-size: 0.92rem; display: flex; align-items: center; justify-content: space-between; user-select: none;">
              <span><i class="fa-solid fa-brain" style="margin-right: 8px; color: #ea580c;"></i> In-Depth Historical &amp; Pedagogical Rationale</span>
              <i class="fa-solid fa-chevron-down" style="font-size: 0.8rem; color: #fb923c;"></i>
            </summary>
            <div style="padding: 14px 18px; border-top: 1px solid #fed7aa; font-size: 0.93rem; line-height: 1.6; color: #334155; background: #ffffff;">
              <p style="margin: 0 0 12px 0;">${poem.pedagogical_rationale.context}</p>
              <div style="background: #fff7ed; border-left: 3px solid #ea580c; padding: 12px 14px; border-radius: 4px;">
                <strong style="color: #9a3412; display: block; margin-bottom: 4px; font-size: 0.88rem;"><i class="fa-solid fa-circle-question" style="margin-right: 5px;"></i> Hinge Question for Class Discussion:</strong>
                <span style="color: #431407; font-weight: 600; font-size: 0.95rem;">"${poem.pedagogical_rationale.hinge_question}"</span>
              </div>
            </div>
          </details>
        </div>
      `;
    });

    html += `</div>`;
  });

  if (window.currentUnitId === 'cme_new') {
    html += `
      <style>
        @keyframes sourceHighlightGlow {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); outline: 3px solid #3b82f6; transform: translateY(-2px); }
          50% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0.25); outline: 3px solid #2563eb; transform: translateY(-3px); }
          100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); outline: 3px solid #3b82f6; transform: translateY(-2px); }
        }
        .source-card-highlighted {
          animation: sourceHighlightGlow 1.5s infinite ease-in-out !important;
          border-color: #3b82f6 !important;
          transition: all 0.25s ease-in-out !important;
        }
        .source-inquiry-interactive {
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .source-inquiry-interactive:hover {
          filter: brightness(0.97);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2) !important;
        }
      </style>
    `;
  }

  html += `
      </div>
    </div>
  `;
  return html;
}

if (typeof window !== 'undefined' && !window._cmeSourceHighlightBound) {
  window._cmeSourceHighlightBound = true;
  document.addEventListener('mouseover', (e) => {
    if (
      window.currentUnitId !== 'cme_new' &&
      window.currentUnitId !== 'edexcel_medicine' &&
      window.currentUnitId !== 'eee' &&
      window.currentUnitId !== 'weimar_nazi_germany'
    )
      return;
    const box = e.target.closest('[data-target-source]');
    if (box) {
      const letter = box.getAttribute('data-target-source');
      const card = document.getElementById(`source-card-${letter}`);
      if (card) card.classList.add('source-card-highlighted');
    }
    const interpBox = e.target.closest('[data-target-interpretation]');
    if (interpBox) {
      const num = interpBox.getAttribute('data-target-interpretation');
      const card = document.getElementById(`interpretation-card-${num}`);
      if (card) card.classList.add('source-card-highlighted');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (
      window.currentUnitId !== 'cme_new' &&
      window.currentUnitId !== 'edexcel_medicine' &&
      window.currentUnitId !== 'eee' &&
      window.currentUnitId !== 'weimar_nazi_germany'
    )
      return;
    const box = e.target.closest('[data-target-source]');
    if (box) {
      const letter = box.getAttribute('data-target-source');
      const card = document.getElementById(`source-card-${letter}`);
      if (card) card.classList.remove('source-card-highlighted');
    }
    const interpBox = e.target.closest('[data-target-interpretation]');
    if (interpBox) {
      const num = interpBox.getAttribute('data-target-interpretation');
      const card = document.getElementById(`interpretation-card-${num}`);
      if (card) card.classList.remove('source-card-highlighted');
    }
  });
  document.addEventListener('click', (e) => {
    if (
      window.currentUnitId !== 'cme_new' &&
      window.currentUnitId !== 'edexcel_medicine' &&
      window.currentUnitId !== 'eee' &&
      window.currentUnitId !== 'weimar_nazi_germany'
    )
      return;
    const box = e.target.closest('[data-target-source]');
    if (box) {
      const letter = box.getAttribute('data-target-source');
      const card = document.getElementById(`source-card-${letter}`);
      if (card) {
        if (card.tagName === 'DETAILS') card.open = true;
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('source-card-highlighted');
        setTimeout(() => card.classList.remove('source-card-highlighted'), 3000);
      }
    }
    const interpBox = e.target.closest('[data-target-interpretation]');
    if (interpBox) {
      const num = interpBox.getAttribute('data-target-interpretation');
      const card = document.getElementById(`interpretation-card-${num}`);
      if (card) {
        if (card.tagName === 'DETAILS') card.open = true;
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('source-card-highlighted');
        setTimeout(() => card.classList.remove('source-card-highlighted'), 3000);
      }
    }
  });
}

export function toggleAllAnswers(btnOrContainer) {
  let container;
  let btn;
  if (btnOrContainer instanceof HTMLElement) {
    if (
      btnOrContainer.tagName === 'BUTTON' ||
      btnOrContainer.dataset?.action === 'toggle-all-answers'
    ) {
      btn = btnOrContainer;
      container =
        btn.closest('details') ||
        btn.closest('.donow-panel-content') ||
        btn.closest('.launchpad-panel') ||
        btn.closest('.phase-card') ||
        btn.closest('.do-now-box') ||
        document;
    } else {
      container = btnOrContainer.closest?.('details') || btnOrContainer;
      btn = container?.querySelector?.('[data-action="toggle-all-answers"]');
    }
  } else {
    container = document.querySelector('details:has(.do-now-card)') || document;
    btn = container?.querySelector?.('[data-action="toggle-all-answers"]');
  }
  if (!container) return;
  if (container.tagName === 'DETAILS' && !container.open) container.open = true;
  const answers = container.querySelectorAll('.answer');
  if (!answers || answers.length === 0) return;
  const anyHidden = Array.from(answers).some((a) => {
    return window.getComputedStyle(a).display === 'none' || a.style.display === 'none';
  });
  answers.forEach((a) => {
    const parentCard = a.closest('.do-now-card');
    if (anyHidden) {
      a.style.display = 'block';
      a.classList.add('revealed');
      if (parentCard) parentCard.classList.add('revealed');
    } else {
      a.style.display = 'none';
      a.classList.remove('revealed');
      if (parentCard) parentCard.classList.remove('revealed');
    }
  });
  if (btn) {
    btn.innerHTML = anyHidden
      ? '<i class="fa-solid fa-eye-slash"></i> Hide All'
      : '<i class="fa-solid fa-eye"></i> Reveal All';
  }
}

if (typeof window !== 'undefined') {
  window.toggleAllAnswers = toggleAllAnswers;
}
