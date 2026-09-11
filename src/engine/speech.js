/**
 * Speech Synthesis & Read-Aloud Controller
 * Provides natural text-to-speech reading for narrative paragraphs and primary sources.
 */

let activeUtterance = null;
let activeButton = null;
let activeChunk = null;
let speechHeartbeat = null;
let activeHighlightContainer = null;
let activeWordSpans = [];
let activeHighlightedWord = null;
let activeHighlightedSentenceIdx = null;

let currentSpeechRate = 1.0;
try {
  if (typeof window !== 'undefined' && window.localStorage) {
    const savedRate = localStorage.getItem('speech_rate');
    if (savedRate) currentSpeechRate = parseFloat(savedRate) || 1.0;
  }
} catch (e) {}

/**
 * Set current speech rate and persist preference (e.g. 0.85, 1.0, 1.15)
 */
export function setSpeechRate(rate) {
  const parsed = parseFloat(rate);
  if (!isNaN(parsed) && parsed > 0) {
    currentSpeechRate = parsed;
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('speech_rate', currentSpeechRate.toString());
      }
    } catch (e) {}
    if (activeUtterance) {
      activeUtterance.rate = currentSpeechRate;
    }
  }
}

/**
 * Get current playback speech rate
 */
export function getSpeechRate() {
  return currentSpeechRate;
}

/**
 * Select the most natural English/British voice available on the device.
 */
export function getBestVoice() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // 1. Personal / Custom / Cloned user voices
  const customVoice = voices.find((v) => {
    const name = (v.name || '').toLowerCase();
    return (
      name.includes('personal') ||
      name.includes('custom') ||
      name.includes('cloned') ||
      name.includes('user') ||
      name.includes('self')
    );
  });
  if (customVoice) return customVoice;

  // 2. High-quality UK English Natural / Online / Neural / Premium voices
  const ukNatural = voices.find((v) => {
    const lang = (v.lang || '').replace('_', '-').toLowerCase();
    const name = (v.name || '').toLowerCase();
    return (
      lang === 'en-gb' &&
      (name.includes('natural') ||
        name.includes('google') ||
        name.includes('online') ||
        name.includes('neural') ||
        name.includes('george') ||
        name.includes('hazel') ||
        name.includes('susan') ||
        name.includes('oliver') ||
        name.includes('ryan') ||
        name.includes('kate') ||
        name.includes('serena') ||
        name.includes('daniel'))
    );
  });
  if (ukNatural) return ukNatural;

  // 3. Any UK English voice
  const anyUk = voices.find((v) => {
    const lang = (v.lang || '').replace('_', '-').toLowerCase();
    return lang === 'en-gb';
  });
  if (anyUk) return anyUk;

  // 4. Any English Natural/Neural voice (US, Australian, etc.)
  const englishNatural = voices.find((v) => {
    const lang = (v.lang || '').toLowerCase();
    const name = (v.name || '').toLowerCase();
    return (
      lang.startsWith('en') &&
      (name.includes('natural') ||
        name.includes('google') ||
        name.includes('neural') ||
        name.includes('online') ||
        name.includes('microsoft'))
    );
  });
  if (englishNatural) return englishNatural;

  // 5. Fallback to any English voice
  const anyEnglish = voices.find((v) => (v.lang || '').toLowerCase().startsWith('en'));
  return anyEnglish || voices[0] || null;
}

/**
 * Tokenize a container's text nodes into synchronized word spans for real-time boundary highlighting.
 * Preserves the original HTML in rootEl._originalHtml so it can be cleanly restored when reading ends.
 * @param {HTMLElement} rootEl - The text container to tokenize
 * @returns {{ spokenText: string, spans: Array<{ el: HTMLElement, start: number, end: number, sentenceIdx: number }> }}
 */
function prepareHighlightableText(rootEl) {
  if (!rootEl) return { spokenText: '', spans: [] };

  // Restore previous if still dirty
  if (rootEl._originalHtml) {
    rootEl.innerHTML = rootEl._originalHtml;
  }
  rootEl._originalHtml = rootEl.innerHTML;

  const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (
        parent.closest(
          '.no-print, .print-only, button, style, script, [style*="display: none"], [style*="display:none"]',
        )
      ) {
        return NodeFilter.FILTER_REJECT;
      }
      if (!node.nodeValue || !node.nodeValue.trim()) {
        return NodeFilter.FILTER_SKIP;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const textNodes = [];
  let currentNode;
  while ((currentNode = walker.nextNode())) {
    textNodes.push(currentNode);
  }

  let spokenText = '';
  let charOffset = 0;
  let sentenceIdx = 0;
  const spans = [];

  textNodes.forEach((node) => {
    const textVal = node.nodeValue;
    const tokens = textVal.match(/\S+|\s+/g) || [];
    const fragment = document.createDocumentFragment();

    tokens.forEach((token) => {
      if (/^\s+$/.test(token)) {
        // Space / whitespace token
        fragment.appendChild(document.createTextNode(token));
        if (spokenText.length > 0 && !spokenText.endsWith(' ')) {
          spokenText += ' ';
          charOffset++;
        }
      } else {
        // Word token
        if (spokenText.length > 0 && !spokenText.endsWith(' ')) {
          spokenText += ' ';
          charOffset++;
        }

        const start = charOffset;
        const end = start + token.length;
        spokenText += token;
        charOffset = end;

        const span = document.createElement('span');
        span.className = 'speech-word';
        span.dataset.start = start;
        span.dataset.end = end;
        span.dataset.sentence = sentenceIdx;
        span.textContent = token;

        fragment.appendChild(span);
        spans.push({ el: span, start, end, sentenceIdx });

        // Advance sentence index on sentence-ending punctuation
        if (/[.!?]["']?$/.test(token)) {
          sentenceIdx++;
        }
      }
    });

    if (node.parentNode) {
      node.parentNode.replaceChild(fragment, node);
    }
  });

  return { spokenText: spokenText.trim(), spans };
}

/**
 * Reset all active reading UI elements across the DOM and restore pristine text HTML.
 */
export function resetActiveSpeech() {
  if (speechHeartbeat) {
    clearInterval(speechHeartbeat);
    speechHeartbeat = null;
  }

  // Restore original pristine DOM without leftover spans
  if (activeHighlightContainer && activeHighlightContainer._originalHtml) {
    activeHighlightContainer.innerHTML = activeHighlightContainer._originalHtml;
    delete activeHighlightContainer._originalHtml;
  }
  activeHighlightContainer = null;
  activeWordSpans = [];
  activeHighlightedWord = null;
  activeHighlightedSentenceIdx = null;

  if (activeButton) {
    activeButton.classList.remove('reading-active');
    activeButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    activeButton.title = 'Read Aloud';
    activeButton = null;
  }

  if (activeChunk) {
    activeChunk.classList.remove('reading-highlight');
    activeChunk = null;
  }

  activeUtterance = null;
  window._activeSpeechUtterance = null;

  // Cleanup any orphaned buttons or highlights in the DOM
  document.querySelectorAll('.reading-active').forEach((b) => {
    b.classList.remove('reading-active');
    b.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    b.title = 'Read Aloud';
  });
  document.querySelectorAll('.reading-highlight').forEach((c) => {
    c.classList.remove('reading-highlight');
  });
}

/**
 * Stop any currently playing speech synthesis.
 */
export function cancelSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  resetActiveSpeech();
}

/**
 * Read aloud the narrative paragraph or source container associated with the clicked button.
 * @param {HTMLElement} btnElement - The clicked speaker button
 */
export function readAloudText(btnElement) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('SpeechSynthesis API is not supported in this browser.');
    return;
  }

  // If user clicks the currently active speaker button, toggle off (stop)
  if (btnElement.classList.contains('reading-active')) {
    cancelSpeech();
    return;
  }

  // Cancel any existing speech from another paragraph or chatbot
  cancelSpeech();

  // Find parent container (narrative chunk, source box, or card)
  const chunk =
    btnElement.closest(
      '.narrative-chunk, .archival-source-box, .gcse-source-container, .card, .content-section',
    ) || btnElement.parentElement;
  if (!chunk) return;

  const textEl =
    chunk.querySelector('.narrative-text') || chunk.querySelector('.archival-source-body') || chunk;

  // Tokenize container text for boundary highlighting
  const { spokenText, spans } = prepareHighlightableText(textEl);
  if (!spokenText) {
    // If tokenization found nothing, revert and exit
    if (textEl._originalHtml) {
      textEl.innerHTML = textEl._originalHtml;
      delete textEl._originalHtml;
    }
    return;
  }

  // Set visual active state
  activeHighlightContainer = textEl;
  activeWordSpans = spans;
  activeButton = btnElement;
  activeChunk = chunk;
  btnElement.classList.add('reading-active');
  btnElement.innerHTML = '<i class="fa-solid fa-stop"></i>';
  btnElement.title = 'Stop Reading';
  chunk.classList.add('reading-highlight');

  // Create and configure utterance
  const utterance = new SpeechSynthesisUtterance(spokenText);
  activeUtterance = utterance;
  window._activeSpeechUtterance = utterance; // Keep global reference to avoid Chromium GC bug

  const voice = getBestVoice();
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang || 'en-GB';
  } else {
    utterance.lang = 'en-GB';
  }

  utterance.rate = currentSpeechRate;
  utterance.pitch = 1.0;

  // Real-time boundary event for word-by-word & sentence highlighting
  utterance.onboundary = (event) => {
    if (event.name === 'word' || !event.name) {
      const charIndex = event.charIndex;
      if (charIndex === undefined || charIndex === null) return;

      // Find word span containing charIndex or nearest matching
      let match = spans.find((s) => s.start <= charIndex && charIndex < s.end);
      if (!match) {
        match = spans.find((s) => s.start >= charIndex);
      }
      if (!match && spans.length > 0) {
        match = spans[spans.length - 1];
      }
      if (!match) return;

      if (activeHighlightedWord !== match.el) {
        if (activeHighlightedWord) {
          activeHighlightedWord.classList.remove('speaking-word-highlight');
        }
        match.el.classList.add('speaking-word-highlight');
        activeHighlightedWord = match.el;

        // Update sentence background shading
        if (activeHighlightedSentenceIdx !== match.sentenceIdx) {
          if (activeHighlightedSentenceIdx !== null) {
            spans
              .filter((s) => s.sentenceIdx === activeHighlightedSentenceIdx)
              .forEach((s) => s.el.classList.remove('speaking-sentence-highlight'));
          }
          activeHighlightedSentenceIdx = match.sentenceIdx;
          spans
            .filter((s) => s.sentenceIdx === activeHighlightedSentenceIdx)
            .forEach((s) => s.el.classList.add('speaking-sentence-highlight'));
        }

        // Smooth scroll word into view if near boundary of scroll container
        try {
          match.el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        } catch (e) {}
      }
    }
  };

  utterance.onend = () => {
    resetActiveSpeech();
  };

  utterance.onerror = (e) => {
    if (e.error !== 'interrupted' && e.error !== 'canceled') {
      console.warn('Speech synthesis error:', e);
    }
    resetActiveSpeech();
  };

  // Chromium keep-alive heartbeat: prevents speech from freezing after 15 seconds
  if (speechHeartbeat) clearInterval(speechHeartbeat);
  speechHeartbeat = setInterval(() => {
    if (!window.speechSynthesis || !window.speechSynthesis.speaking) {
      clearInterval(speechHeartbeat);
      speechHeartbeat = null;
    } else {
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }
  }, 10000);

  window.speechSynthesis.speak(utterance);
}

/**
 * Initialize Speech Synthesis system and bind global helpers.
 */
export function initSpeech() {
  if (typeof window === 'undefined') return;

  window.readAloudText = readAloudText;
  window.cancelSpeech = cancelSpeech;
  window.setSpeechRate = setSpeechRate;
  window.getSpeechRate = getSpeechRate;

  if ('speechSynthesis' in window) {
    // Prime voices immediately and when changed asynchronously
    window.speechSynthesis.getVoices();
    if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }
}
