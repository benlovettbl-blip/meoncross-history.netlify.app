/**
 * Speech Synthesis & Read-Aloud Controller
 * Provides natural text-to-speech reading for narrative paragraphs and primary sources.
 */

let activeUtterance = null;
let activeButton = null;
let activeChunk = null;
let speechHeartbeat = null;

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
 * Reset all active reading UI elements across the DOM.
 */
export function resetActiveSpeech() {
  if (speechHeartbeat) {
    clearInterval(speechHeartbeat);
    speechHeartbeat = null;
  }

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

  // Clone node to safely sanitize text without affecting the rendered DOM
  const clone = textEl.cloneNode(true);

  // Strip non-spoken elements: hidden print markers, print duplicates, interactive buttons, styles, scripts
  clone
    .querySelectorAll(
      '.no-print, .print-only, button, style, script, [style*="display: none"], [style*="display:none"]',
    )
    .forEach((el) => el.remove());

  // Extract clean rendered text
  let rawText = clone.innerText || clone.textContent || '';
  rawText = rawText.replace(/\s+/g, ' ').trim();

  if (!rawText) return;

  // Set visual active state
  activeButton = btnElement;
  activeChunk = chunk;
  btnElement.classList.add('reading-active');
  btnElement.innerHTML = '<i class="fa-solid fa-stop"></i>';
  btnElement.title = 'Stop Reading';
  chunk.classList.add('reading-highlight');

  // Create and configure utterance
  const utterance = new SpeechSynthesisUtterance(rawText);
  activeUtterance = utterance;
  window._activeSpeechUtterance = utterance; // Keep global reference to avoid Chromium GC bug

  const voice = getBestVoice();
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang || 'en-GB';
  } else {
    utterance.lang = 'en-GB';
  }

  utterance.rate = 1.0;
  utterance.pitch = 1.0;

  utterance.onend = () => {
    resetActiveSpeech();
  };

  utterance.onerror = (e) => {
    // Interrupted errors happen when cancel() is deliberately called; ignore those
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
