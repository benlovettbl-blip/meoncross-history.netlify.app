import { AudioEngine } from './audio.js';
import { state } from './state.js';

export const BRAND_CONFIG = {
  units: {
    "conflict_middle_east": {
      brandHeader: "Fareham Chimney Sweep Inc.",
      quotes: [
        "Because unblocking a chimney is tough, but untangling the origins of the Arab-Israeli conflict is a whole different level of messy.",
        "Clearing out soot since 2013, because a blocked flue is bad, but confusing the McMahon-Hussein Correspondence with the Balfour Declaration is catastrophic.",
        "Sweeping away the historical fog. Keeping your chimneys clear and your knowledge on the 1948 Arab-Israeli War crystal clear.",
        "Because a chimney fire causes smoke, but the Suez Crisis of 1956 caused an absolute international geopolitical meltdown.",
        "We handle the dust, you handle the drama. Sweeping through everything from the Camp David Accords to the Oslo Peace Process.",
        "Because a clogged chimney cuts off the draft, but the 1973 Oil Crisis cut off the entire Western world.",
        "From the streets of Fareham to the borders of the Levant: we sweep the flues so you can master the causes of the Six-Day War.",
        "Because cleaning a fireplace takes grit, but parsing the shifting borders of the Sykes-Picot Agreement takes a total miracle.",
        "Sweeping away the confusion. Because a blocked chimney ruins your living room, but forgetting the roles of Nasser and Ben-Gurion ruins your 12-mark exam answer.",
        "We scrape out the creosote so you can scrape together top marks on the causes and consequences of the Six-Day War.",
        "Because a chimney sweep faces major blockages, but nothing quite like the diplomatic stalemate of the UN Resolution 242.",
        "From Fareham flues to the Sinai Peninsula: making sure your chimneys draw perfectly and your timeline of the Yom Kippur War is absolutely flawless.",
        "Because a chimney sweep knows how to handle a breakdown, but the collapse of the 2000 Camp David Summit was an entirely different kind of disaster.",
        "Keeping the drafts flowing and the history glowing—because a chimney needs a clear exit, just like the British needed one from the Palestine Mandate in 1948.",
        "Because an unswept chimney accumulates soot, but the Gaza Strip and West Bank accumulated decades of complex geopolitical tension."
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
        container.title = `Fareham Chimney Sweep: "${quoteText}" (Click to cycle)`;
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
    container.title = `Fareham Chimney Sweep: "${quoteText}" (Click to cycle)`;
    
    // Show and reset opacity
    container.style.display = 'flex';
    container.style.opacity = '1';
    
    // Start the 5-second fade out countdown
    startDismissTimer();
  } else {
    container.style.display = 'none';
  }
}
