import { AudioEngine } from './audio.js';
import { state } from './state.js';

export const BRAND_CONFIG = {
  units: {
    "conflict_middle_east": {
      brandHeader: "Meoncross History Department | GCSE Study Suite",
      quotes: [
        "Revision Focus: Master the key milestones of Conflict in the Middle East, 1945-1995.",
        "AO1 Recall Check: Can you describe the McMahon-Hussein Correspondence and the Balfour Declaration?",
        "AO2 Analysis: How did the UN Partition Resolution 181 alter boundaries and trigger the 1948 War?",
        "Key Concept: The Suez Crisis of 1956 was a turning point for British and French imperial influence.",
        "AO1 Detail: Remember the roles of Gamal Abdel Nasser and David Ben-Gurion in shaping regional power dynamics.",
        "Exam Tip: Explain the causes and geopolitical consequences of the Six-Day War of 1967.",
        "Chronology Check: Place the Yom Kippur War of 1973 and the Camp David Accords in their correct chronological sequence.",
        "Analytical Focus: Evaluate the success of the Oslo Peace Accords and why they ultimately stalled.",
        "Key Concept: Spaced repetition is the key to securing top marks. Review your Leitner box frequently!",
        "AO2 Detail: Focus on the transition from the British Mandate to the birth of Israel in 1948."
      ]
    }
  },
  
  apply(unitId, isSilent = false) {
    // Left as compatibility stub in case other parts of code query it
    updateBrandBanner();
  }
};

let bannerListenerInitialized = false;
let brandBannerTimeout = null;
let brandBannerHideTimeout = null;

export function updateBrandBanner() {
  const container = document.getElementById('header-brand-quote-container');
  const textEl = document.getElementById('header-brand-quote-text');
  if (!container || !textEl) return;

  // Clear any existing active timeouts
  if (brandBannerTimeout) clearTimeout(brandBannerTimeout);
  if (brandBannerHideTimeout) clearTimeout(brandBannerHideTimeout);

  const viewTitleEl = document.getElementById('current-view-title');

  // Only display on home screen (dashboard view)
  if (state.currentView !== 'dashboard') {
    container.style.display = 'none';
    if (viewTitleEl) viewTitleEl.style.display = 'block';
    return;
  } else {
    container.style.display = 'flex';
    if (viewTitleEl) viewTitleEl.style.display = 'none';
  }

  const startDismissTimer = () => {
    // Disabled auto-hide so the quote is always visible as requested by user
  };

  // Setup click listener once to cycle/refresh quotes on demand
  if (!bannerListenerInitialized) {
    const cycleQuote = () => {
      AudioEngine.play('click');
      const config = BRAND_CONFIG.units["conflict_middle_east"];
      if (config) {
        const randomIndex = Math.floor(Math.random() * config.quotes.length);
        const quoteText = config.quotes[randomIndex];
        textEl.textContent = `"${quoteText}"`;
        container.title = `Meoncross History: "${quoteText}" (Click to cycle)`;
        // Bring back opacity and reset the 5s timer
        container.style.display = 'flex';
        container.style.opacity = '1';
        startDismissTimer();
      }
    };
    
    container.addEventListener('click', cycleQuote);
    
    const logoEl = document.getElementById('header-brand-logo');
    if (logoEl) {
      logoEl.addEventListener('click', cycleQuote);
    }
    
    bannerListenerInitialized = true;
  }

  const config = BRAND_CONFIG.units["conflict_middle_east"];
  if (config) {
    const randomIndex = Math.floor(Math.random() * config.quotes.length);
    const quoteText = config.quotes[randomIndex];
    textEl.textContent = `"${quoteText}"`;
    container.title = `Meoncross History: "${quoteText}" (Click to cycle)`;
    
    // Show and reset opacity
    container.style.display = 'flex';
    container.style.opacity = '1';
    
    // Start the 5-second fade out countdown
    startDismissTimer();
  } else {
    container.style.display = 'none';
  }
}
