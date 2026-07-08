import { AudioEngine } from './audio.js';
import { state } from './state.js';

export const BRAND_CONFIG = {
  units: {
    "conflict_middle_east": {
      brandHeader: "Meoncross History Department | GCSE Study Suite",
      quotes: [
        "Revision Focus: Master the key developments in USA Civil Rights (1954-1975) and the Vietnam War.",
        "AO1 Recall Check: Can you detail the causes and outcome of the Montgomery Bus Boycott of 1955?",
        "AO2 Analysis: How did the Gulf of Tonkin Resolution in 1964 change US military involvement in Vietnam?",
        "Key Concept: The 1968 Tet Offensive was a turning point, causing a major shift in American public opinion.",
        "AO1 Detail: Contrast the methods and ideologies of Martin Luther King Jr. and Malcolm X.",
        "Exam Tip: Explain the significance of the Civil Rights Act of 1964 and the Voting Rights Act of 1965.",
        "Chronology Check: Place the Brown v. Topeka decision, Selma marches, and the fall of Saigon in sequence.",
        "Analytical Focus: Analyze the causes of the Watergate scandal and why it led to Nixon's resignation in 1974.",
        "Key Concept: Spaced repetition is the key to securing top marks. Review your Leitner box frequently!",
        "AO2 Detail: Evaluate the impact of media coverage on the public perception of the Vietnam War."
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

  // Only display on home screen (dashboard view)
  if (state.currentView !== 'dashboard') {
    container.style.display = 'none';
    return;
  }

  const startDismissTimer = () => {
    if (brandBannerTimeout) clearTimeout(brandBannerTimeout);
    if (brandBannerHideTimeout) clearTimeout(brandBannerHideTimeout);
    brandBannerTimeout = setTimeout(() => {
      container.style.opacity = '0';
      brandBannerHideTimeout = setTimeout(() => {
        container.style.display = 'none';
      }, 500);
    }, 5000);
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
