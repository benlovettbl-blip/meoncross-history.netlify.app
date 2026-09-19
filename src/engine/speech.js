/**
 * Speech Synthesis & Read-Aloud Controller (Modern Option A)
 * Provides ultra-natural browser voice text-to-speech with real-time word-by-word
 * karaoke highlighting, zero-restart speed adjustment, voice gender selection,
 * and SEND-friendly reading controls.
 */

let activeUtterance = null;
let activeButton = null;
let activeStopBtn = null;
let activeChunk = null;
let speechHeartbeat = null;
let softwareTickerTimer = null;
let activeHighlightContainer = null;
let activeWordSpans = [];
let activeHighlightedWord = null;
let activeHighlightedSentenceIdx = null;
let activeSpokenText = '';
let activeStartCharOffset = 0;
let isPaused = false;
let lastHardwareBoundaryTime = 0;

let currentSpeechRate = 1.0;
let currentVoiceGender = 'female'; // 'female' | 'male'

try {
  if (typeof window !== 'undefined' && window.localStorage) {
    const savedRate = localStorage.getItem('speech_rate');
    if (savedRate) currentSpeechRate = parseFloat(savedRate) || 1.0;

    const savedGender = localStorage.getItem('speech_voice_gender');
    if (savedGender === 'male' || savedGender === 'female') {
      currentVoiceGender = savedGender;
    }
  }
} catch (e) {}

/**
 * Voice Classification Helpers
 */
function isRoboticDesktopVoice(v) {
  const name = (v.name || '').toLowerCase();
  // Filter out legacy Windows SAPI5 robotic desktop voices and basic synthetics
  return (
    name.includes('desktop') ||
    name.includes('hazel') ||
    name.includes('david') ||
    name.includes('zira') ||
    name.includes('george') ||
    name.includes('susan') ||
    name.includes('mark') ||
    name.includes('espeak') ||
    name.includes('sample')
  );
}

function isNaturalVoice(v) {
  const name = (v.name || '').toLowerCase();
  return (
    name.includes('natural') ||
    name.includes('online') ||
    name.includes('neural') ||
    name.includes('google') ||
    name.includes('premium') ||
    name.includes('enhanced') ||
    name.includes('studio') ||
    name.includes('wavenet') ||
    name.includes('journey')
  );
}

function isUkLang(v) {
  const lang = (v.lang || '').replace('_', '-').toLowerCase();
  return lang === 'en-gb';
}

function isEnglishLang(v) {
  const lang = (v.lang || '').toLowerCase();
  return lang.startsWith('en');
}

function isVoiceFemale(v) {
  const name = (v.name || '').toLowerCase();
  return (
    name.includes('female') ||
    name.includes('sonia') ||
    name.includes('libby') ||
    name.includes('maisie') ||
    name.includes('serena') ||
    name.includes('kate') ||
    name.includes('fiona') ||
    name.includes('susan') ||
    name.includes('zira') ||
    name.includes('fis-network') ||
    name.includes('jenny') ||
    name.includes('aria')
  );
}

function isVoiceMale(v) {
  const name = (v.name || '').toLowerCase();
  return (
    name.includes('male') ||
    name.includes('ryan') ||
    name.includes('thomas') ||
    name.includes('daniel') ||
    name.includes('oliver') ||
    name.includes('arthur') ||
    name.includes('george') ||
    name.includes('david') ||
    name.includes('rjs-network') ||
    name.includes('guy')
  );
}

/**
 * Select the most natural English/British voice available on the device,
 * prioritizing online natural voices (Sonia, Ryan, Google UK, Serena, Daniel)
 * and avoiding robotic legacy desktop voices.
 * @param {'female'|'male'} [genderPreference]
 */
export function getBestVoice(genderPreference = currentVoiceGender) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const wantFemale = genderPreference === 'female';

  // 1. Personal / Custom / Cloned user voices
  const customVoice = voices.find((v) => {
    const name = (v.name || '').toLowerCase();
    return (
      name.includes('personal') ||
      name.includes('custom') ||
      name.includes('cloned') ||
      name.includes('self')
    );
  });
  if (customVoice) return customVoice;

  // 2. High-quality UK English Natural / Online / Neural / Premium voices matching gender
  const ukNaturalGender = voices.find((v) => {
    if (!isUkLang(v) || !isNaturalVoice(v)) return false;
    return wantFemale ? isVoiceFemale(v) : isVoiceMale(v);
  });
  if (ukNaturalGender) return ukNaturalGender;

  // 3. Any English Natural/Neural voice matching preferred gender (e.g. US Natural)
  const anyEnglishNaturalGender = voices.find((v) => {
    if (!isEnglishLang(v) || !isNaturalVoice(v)) return false;
    return wantFemale ? isVoiceFemale(v) : isVoiceMale(v);
  });
  if (anyEnglishNaturalGender) return anyEnglishNaturalGender;

  // 4. High quality non-robotic UK voice matching gender
  const ukNonRoboticGender = voices.find((v) => {
    if (!isUkLang(v) || isRoboticDesktopVoice(v)) return false;
    return wantFemale ? isVoiceFemale(v) : isVoiceMale(v);
  });
  if (ukNonRoboticGender) return ukNonRoboticGender;

  // 5. Any UK voice matching gender (even if desktop)
  const anyUkGender = voices.find((v) => {
    if (!isUkLang(v)) return false;
    return wantFemale ? isVoiceFemale(v) : isVoiceMale(v);
  });
  if (anyUkGender) return anyUkGender;

  // 6. Any English voice (non-robotic) matching gender
  const anyEnglishNonRoboticGender = voices.find((v) => {
    if (!isEnglishLang(v) || isRoboticDesktopVoice(v)) return false;
    return wantFemale ? isVoiceFemale(v) : isVoiceMale(v);
  });
  if (anyEnglishNonRoboticGender) return anyEnglishNonRoboticGender;

  // 7. Any English voice matching gender
  const anyEnglishGender = voices.find((v) => {
    if (!isEnglishLang(v)) return false;
    return wantFemale ? isVoiceFemale(v) : isVoiceMale(v);
  });
  if (anyEnglishGender) return anyEnglishGender;

  // --- Fallbacks if no voice of the requested gender is available on the device ---
  // 8. Any UK English Natural / Neural voice (regardless of gender)
  const anyUkNatural = voices.find((v) => isUkLang(v) && isNaturalVoice(v));
  if (anyUkNatural) return anyUkNatural;

  // 9. Any English Natural / Neural voice (regardless of gender)
  const anyEnglishNatural = voices.find((v) => isEnglishLang(v) && isNaturalVoice(v));
  if (anyEnglishNatural) return anyEnglishNatural;

  // 10. Any non-robotic UK voice
  const anyUkNonRobotic = voices.find((v) => isUkLang(v) && !isRoboticDesktopVoice(v));
  if (anyUkNonRobotic) return anyUkNonRobotic;

  // 11. Any UK voice
  const anyUk = voices.find((v) => isUkLang(v));
  if (anyUk) return anyUk;

  // 12. Fallback to any English or first voice
  const anyEnglish = voices.find((v) => isEnglishLang(v));
  return anyEnglish || voices[0] || null;
}

/**
 * Get current voice gender preference
 */
export function getVoiceGender() {
  return currentVoiceGender;
}

/**
 * Set voice gender preference ('female' | 'male') and update UI
 */
export function setVoiceGender(gender) {
  if (gender !== 'male' && gender !== 'female') return;
  currentVoiceGender = gender;
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('speech_voice_gender', currentVoiceGender);
    }
  } catch (e) {}

  updateVoiceUI();

  // If currently speaking, smoothly resume in the new voice from the current sentence
  if (
    activeButton &&
    typeof window !== 'undefined' &&
    window.speechSynthesis &&
    window.speechSynthesis.speaking &&
    !isPaused
  ) {
    resumeSpeechFromCurrentSentence();
  }
}

/**
 * Toggle voice gender between female and male
 */
export function toggleVoiceGender() {
  const next = currentVoiceGender === 'female' ? 'male' : 'female';
  setVoiceGender(next);
}

/**
 * Update voice buttons and labels across the DOM
 */
export function updateVoiceUI() {
  if (typeof document === 'undefined') return;

  const isMale = currentVoiceGender === 'male';
  const iconHtml = isMale
    ? '<i class="fa-solid fa-mars"></i>'
    : '<i class="fa-solid fa-venus"></i>';
  const titleText = isMale
    ? 'Voice: Natural UK Male (Click to switch to Female)'
    : 'Voice: Natural UK Female (Click to switch to Male)';

  document.querySelectorAll('.speech-voice-opt').forEach((btn) => {
    btn.innerHTML = iconHtml;
    btn.title = titleText;
    btn.setAttribute('aria-label', titleText);
    if (isMale) {
      btn.classList.add('voice-male');
      btn.classList.remove('voice-female');
    } else {
      btn.classList.add('voice-female');
      btn.classList.remove('voice-male');
    }
  });

  const headerLabel = document.getElementById('voice-toggle-label');
  if (headerLabel) {
    headerLabel.textContent = isMale ? 'Voice: UK ♂' : 'Voice: UK ♀';
  }
  const headerBtn = document.getElementById('btn-voice-toggle');
  if (headerBtn) {
    headerBtn.title = titleText;
  }
}

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

    // Update all speed pills across the DOM
    if (typeof document !== 'undefined') {
      document.querySelectorAll('.speech-speed-opt').forEach((opt) => {
        const optRate = parseFloat(opt.dataset.rate);
        if (!isNaN(optRate) && Math.abs(optRate - currentSpeechRate) < 0.05) {
          opt.classList.add('active');
        } else {
          opt.classList.remove('active');
        }
      });
    }

    // If currently speaking, smoothly resume at the new speed from current sentence
    if (
      activeButton &&
      typeof window !== 'undefined' &&
      window.speechSynthesis &&
      window.speechSynthesis.speaking &&
      !isPaused
    ) {
      resumeSpeechFromCurrentSentence();
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
 * Generates the compact HTML playback bar containing speed pills, voice toggle,
 * and read-aloud / stop buttons.
 */
export function renderAudioPlaybackBar(buttonTitle = 'Read Aloud', customClass = '') {
  const rate = getSpeechRate();
  const rates = [0.85, 1.0, 1.15];
  const pillHtml = rates
    .map((r) => {
      const isSelected = Math.abs(rate - r) < 0.05;
      return `<button type="button" class="speech-speed-opt ${isSelected ? 'active' : ''}" data-action="change-speech-rate" data-rate="${r}" title="Playback speed ${r}x">${r}x</button>`;
    })
    .join('');

  const gender = getVoiceGender();
  const voiceIcon =
    gender === 'male' ? '<i class="fa-solid fa-mars"></i>' : '<i class="fa-solid fa-venus"></i>';
  const voiceTitle =
    gender === 'male'
      ? 'Voice: Natural UK Male (Click to switch to Female)'
      : 'Voice: Natural UK Female (Click to switch to Male)';

  return `
    <div class="read-aloud-playback-bar no-print ${customClass}" role="region" aria-label="Audio Controls">
      <div class="speech-speed-pill" role="group" aria-label="Playback Speed">
        ${pillHtml}
      </div>
      <button type="button" class="speech-voice-opt ${gender === 'male' ? 'voice-male' : 'voice-female'}" data-action="toggle-speech-voice-gender" title="${voiceTitle}" aria-label="Toggle voice gender">
        ${voiceIcon}
      </button>
      <button type="button" class="btn btn-secondary read-aloud-btn" data-action="read-aloud" title="${buttonTitle}">
        <i class="fa-solid fa-volume-high"></i>
      </button>
      <button type="button" class="read-aloud-stop-btn" data-action="stop-speech" title="Stop Reading" style="display: none;">
        <i class="fa-solid fa-stop"></i>
      </button>
    </div>
  `;
}

/**
 * Tokenize a container's text nodes into synchronized word spans for real-time boundary highlighting.
 * Preserves original HTML in rootEl._originalHtml so it can be cleanly restored when reading ends.
 * Automatically skips paragraph reference brackets ([1.1], [2.1], .para-ref) so they are never spoken aloud.
 * @param {HTMLElement} rootEl - The text container to tokenize
 * @returns {{ spokenText: string, spans: Array<{ el: HTMLElement, start: number, end: number, sentenceIdx: number, word: string }> }}
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
      // Skip non-printable, scripts, buttons, and paragraph markers from speech text collection
      if (
        parent.closest(
          '.no-print, .print-only, button, style, script, .para-ref, [style*="display: none"], [style*="display:none"]',
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
        // Whitespace token
        fragment.appendChild(document.createTextNode(token));
        if (spokenText.length > 0 && !spokenText.endsWith(' ')) {
          spokenText += ' ';
          charOffset++;
        }
      } else if (/^\[\s*\d+(\.\d+)?\s*\]$/.test(token)) {
        // Raw paragraph bracket token like [1.1] or [2] - keep in DOM, but DO NOT speak aloud!
        const span = document.createElement('span');
        span.className = 'speech-nonspoken';
        span.textContent = token;
        fragment.appendChild(span);
      } else {
        // Spoken word token
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
        spans.push({ el: span, start, end, sentenceIdx, word: token });

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
  if (softwareTickerTimer) {
    clearInterval(softwareTickerTimer);
    softwareTickerTimer = null;
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
  activeSpokenText = '';
  activeStartCharOffset = 0;
  isPaused = false;

  if (activeButton) {
    activeButton.classList.remove('reading-active', 'reading-paused');
    activeButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    activeButton.title = 'Read Aloud';
    activeButton = null;
  }

  if (activeStopBtn) {
    activeStopBtn.style.display = 'none';
    activeStopBtn = null;
  }

  if (activeChunk) {
    activeChunk.classList.remove('reading-highlight');
    activeChunk = null;
  }

  activeUtterance = null;
  window._activeSpeechUtterance = null;

  // Cleanup any orphaned buttons or highlights in the DOM
  document.querySelectorAll('.reading-active, .reading-paused').forEach((b) => {
    b.classList.remove('reading-active', 'reading-paused');
    b.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    b.title = 'Read Aloud';
  });
  document.querySelectorAll('.read-aloud-stop-btn').forEach((sb) => {
    sb.style.display = 'none';
  });
  document.querySelectorAll('.reading-highlight').forEach((c) => {
    c.classList.remove('reading-highlight');
  });
}

/**
 * Stop any currently playing speech synthesis.
 */
export function cancelSpeech() {
  activeUtterance = null;
  window._activeSpeechUtterance = null;
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  resetActiveSpeech();
}

/**
 * Smoothly resumes speech from the currently active sentence without restarting from word 0.
 * Used when the user changes playback speed or voice gender while listening.
 */
function resumeSpeechFromCurrentSentence() {
  if (!activeHighlightContainer || !activeSpokenText || activeWordSpans.length === 0) return;

  const resumeSentenceIdx =
    activeHighlightedSentenceIdx !== null ? activeHighlightedSentenceIdx : 0;

  const remainingSpans = activeWordSpans.filter((s) => s.sentenceIdx >= resumeSentenceIdx);
  if (remainingSpans.length === 0) {
    resetActiveSpeech();
    return;
  }

  const firstSpan = remainingSpans[0];
  const charOffset = firstSpan.start;
  const remainingText = activeSpokenText.slice(charOffset).trim();

  if (!remainingText) {
    resetActiveSpeech();
    return;
  }

  // Clear active timers
  if (speechHeartbeat) clearInterval(speechHeartbeat);
  if (softwareTickerTimer) clearInterval(softwareTickerTimer);

  // Invalidate current utterance reference BEFORE cancel so its pending onend/onerror cannot reset new speech
  activeUtterance = null;
  window._activeSpeechUtterance = null;

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  // Small asynchronous buffer (60ms) to allow Chromium/WebKit OS audio stack to finish cancellation cleanly
  setTimeout(() => {
    if (!activeHighlightContainer) return;
    startUtterance(remainingText, charOffset, firstSpan);
  }, 60);
}

/**
 * Configures and speaks an utterance from a given character offset, with dual
 * hardware onboundary events and a software WPM ticker fallback for 100% reliable
 * word-by-word karaoke highlighting.
 */
function startUtterance(textToSpeak, charOffset, initialSpan) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  activeUtterance = utterance;
  window._activeSpeechUtterance = utterance; // Chromium GC guard
  activeStartCharOffset = charOffset;

  const voice = getBestVoice(currentVoiceGender);
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang || 'en-GB';
  } else {
    utterance.lang = 'en-GB';
  }

  utterance.rate = currentSpeechRate;
  utterance.pitch = 1.0;

  lastHardwareBoundaryTime = 0;
  isPaused = false;

  // Immediately focus the initial sentence/word if resuming
  if (initialSpan) {
    highlightSpanAndSentence(initialSpan);
  }

  // Real-time Hardware Boundary Event Handler
  utterance.onboundary = (event) => {
    // If this boundary event is from a superseded utterance, ignore
    if (activeUtterance !== utterance) return;

    lastHardwareBoundaryTime = Date.now();

    if (event.name === 'word' || !event.name) {
      const charIndex = event.charIndex;
      if (charIndex === undefined || charIndex === null) return;

      const absoluteIndex = charOffset + charIndex;

      // Find matching word span
      let match = activeWordSpans.find((s) => s.start <= absoluteIndex && absoluteIndex < s.end);
      if (!match) {
        match = activeWordSpans.find((s) => s.start >= absoluteIndex);
      }
      if (!match && activeWordSpans.length > 0) {
        match = activeWordSpans[activeWordSpans.length - 1];
      }
      if (match) {
        highlightSpanAndSentence(match);
      }
    }
  };

  utterance.onend = () => {
    // Discard end event if this is not the currently active utterance
    if (activeUtterance !== utterance) return;
    resetActiveSpeech();
  };

  utterance.onerror = (e) => {
    // Discard error event if this is not the currently active utterance
    if (activeUtterance !== utterance) return;
    if (e.error !== 'interrupted' && e.error !== 'canceled') {
      console.warn('Speech synthesis error:', e);
    }
    resetActiveSpeech();
  };

  // Chromium keep-alive heartbeat: prevents speech from cutting out after 15 seconds
  if (speechHeartbeat) clearInterval(speechHeartbeat);
  speechHeartbeat = setInterval(() => {
    if (!window.speechSynthesis || !window.speechSynthesis.speaking) {
      clearInterval(speechHeartbeat);
      speechHeartbeat = null;
    } else if (!isPaused) {
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }
  }, 10000);

  // Software WPM Ticker Fallback
  // If the browser/OS voice fails to fire hardware boundary events for > 1.2s,
  // the ticker smoothly advances word highlights based on syllables/WPM.
  if (softwareTickerTimer) clearInterval(softwareTickerTimer);
  const eligibleSpans = activeWordSpans.filter((s) => s.start >= charOffset);
  let tickerIndex = 0;
  const startTime = Date.now();

  softwareTickerTimer = setInterval(() => {
    if (isPaused || !window.speechSynthesis || !window.speechSynthesis.speaking) return;

    // Yield to hardware boundary events if they are actively firing
    if (lastHardwareBoundaryTime > 0 && Date.now() - lastHardwareBoundaryTime < 1200) {
      return;
    }

    // Hardware events are missing or stalled; advance via estimated timing
    const elapsedSec = (Date.now() - startTime) / 1000;
    const estWordsRead = Math.floor(elapsedSec * ((145 * currentSpeechRate) / 60));

    if (estWordsRead > tickerIndex && tickerIndex < eligibleSpans.length) {
      tickerIndex = Math.min(estWordsRead, eligibleSpans.length - 1);
      const span = eligibleSpans[tickerIndex];
      if (span) {
        highlightSpanAndSentence(span);
      }
    }
  }, 80);

  window.speechSynthesis.speak(utterance);
}

/**
 * Highlights a word span and shades its parent sentence
 */
function highlightSpanAndSentence(matchSpan) {
  if (!matchSpan || !matchSpan.el) return;

  if (activeHighlightedWord !== matchSpan.el) {
    if (activeHighlightedWord) {
      activeHighlightedWord.classList.remove('speaking-word-highlight');
    }
    matchSpan.el.classList.add('speaking-word-highlight');
    activeHighlightedWord = matchSpan.el;

    // Update sentence background shading
    if (activeHighlightedSentenceIdx !== matchSpan.sentenceIdx) {
      if (activeHighlightedSentenceIdx !== null) {
        activeWordSpans
          .filter((s) => s.sentenceIdx === activeHighlightedSentenceIdx)
          .forEach((s) => s.el.classList.remove('speaking-sentence-highlight'));
      }
      activeHighlightedSentenceIdx = matchSpan.sentenceIdx;
      activeWordSpans
        .filter((s) => s.sentenceIdx === activeHighlightedSentenceIdx)
        .forEach((s) => s.el.classList.add('speaking-sentence-highlight'));
    }

    // Smooth scroll word into view if near viewport boundary
    try {
      matchSpan.el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    } catch (e) {}
  }
}

/**
 * Read aloud the narrative paragraph or source container associated with the clicked button.
 * Supports Play / Pause / Resume and Stop.
 * @param {HTMLElement} btnElement - The clicked speaker/play button
 */
export function readAloudText(btnElement) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('SpeechSynthesis API is not supported in this browser.');
    return;
  }

  // 1. If user clicked the currently active button: toggle Play / Pause / Resume
  if (btnElement === activeButton && window.speechSynthesis.speaking) {
    if (!isPaused) {
      // Pause
      window.speechSynthesis.pause();
      isPaused = true;
      btnElement.classList.add('reading-paused');
      btnElement.innerHTML = '<i class="fa-solid fa-play"></i>';
      btnElement.title = 'Resume Reading';
      return;
    } else {
      // Resume
      window.speechSynthesis.resume();
      isPaused = false;
      btnElement.classList.remove('reading-paused');
      btnElement.innerHTML = '<i class="fa-solid fa-pause"></i>';
      btnElement.title = 'Pause Reading';
      // Safety guard: if resume stalled, restart cleanly from current sentence
      if (!window.speechSynthesis.speaking) {
        resumeSpeechFromCurrentSentence();
      }
      return;
    }
  }

  // 2. If another button was clicked, cancel previous speech and start fresh
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
  if (!spokenText || spans.length === 0) {
    if (textEl._originalHtml) {
      textEl.innerHTML = textEl._originalHtml;
      delete textEl._originalHtml;
    }
    return;
  }

  // Find playback bar and stop button
  const playbackBar = btnElement.closest('.read-aloud-playback-bar');
  const stopBtn = playbackBar ? playbackBar.querySelector('.read-aloud-stop-btn') : null;

  // Set visual active state
  activeHighlightContainer = textEl;
  activeWordSpans = spans;
  activeSpokenText = spokenText;
  activeButton = btnElement;
  activeStopBtn = stopBtn;
  activeChunk = chunk;

  btnElement.classList.add('reading-active');
  btnElement.classList.remove('reading-paused');
  btnElement.innerHTML = '<i class="fa-solid fa-pause"></i>';
  btnElement.title = 'Pause Reading';
  if (stopBtn) stopBtn.style.display = 'inline-flex';
  chunk.classList.add('reading-highlight');

  // Start reading from the very beginning
  startUtterance(spokenText, 0, spans[0]);
}

/**
 * Initialize Speech Synthesis system, bind global helpers, and inject header controls.
 */
export function initSpeech() {
  if (typeof window === 'undefined') return;

  window.readAloudText = readAloudText;
  window.cancelSpeech = cancelSpeech;
  window.setSpeechRate = setSpeechRate;
  window.getSpeechRate = getSpeechRate;
  window.getBestVoice = getBestVoice;
  window.getVoiceGender = getVoiceGender;
  window.setVoiceGender = setVoiceGender;
  window.toggleVoiceGender = toggleVoiceGender;
  window.updateVoiceUI = updateVoiceUI;
  window.renderAudioPlaybackBar = renderAudioPlaybackBar;

  if ('speechSynthesis' in window) {
    // Prime voices immediately and when changed asynchronously
    window.speechSynthesis.getVoices();
    if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
        updateVoiceUI();
      };
    }
  }

  // Proactively ensure Voice Toggle button exists in #header-accessibility-bar
  if (typeof document !== 'undefined') {
    const attachHeaderVoiceBtn = () => {
      const headerBar = document.getElementById('header-accessibility-bar');
      if (headerBar && !document.getElementById('btn-voice-toggle')) {
        const dyslexiaBtn = document.getElementById('btn-dyslexia');
        const voiceBtn = document.createElement('button');
        voiceBtn.id = 'btn-voice-toggle';
        voiceBtn.className = 'header-tool-btn';
        voiceBtn.dataset.action = 'toggle-speech-voice-gender';
        const isMale = currentVoiceGender === 'male';
        voiceBtn.title = isMale
          ? 'Voice: Natural UK Male (Click to switch to Female)'
          : 'Voice: Natural UK Female (Click to switch to Male)';
        voiceBtn.setAttribute('aria-label', 'Toggle Natural Read Aloud Voice');
        voiceBtn.innerHTML = `
          <i class="fa-solid fa-volume-high"></i>
          <span class="btn-text" id="voice-toggle-label">${isMale ? 'Voice: UK ♂' : 'Voice: UK ♀'}</span>
        `;

        if (dyslexiaBtn && dyslexiaBtn.nextSibling) {
          headerBar.insertBefore(voiceBtn, dyslexiaBtn.nextSibling);
        } else {
          headerBar.appendChild(voiceBtn);
        }
      }
      updateVoiceUI();
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', attachHeaderVoiceBtn);
    } else {
      attachHeaderVoiceBtn();
    }
  }
}
