import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

const oldSvgRegex = /<svg width="32" height="36" viewBox="0 0 24 28" fill="none" xmlns="http:\/\/www\.w3\.org\/2000\/svg" style="filter: drop-shadow\(0 2px 4px rgba\(0,0,0,0\.3\)\);">[\s\S]*?<\/svg>/g;

const newSvg = `<svg width="32" height="40" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
              <!-- Brick Base -->
              <rect x="7" y="22" width="10" height="10" fill="#a03018" />
              <line x1="7" y1="25" x2="17" y2="25" stroke="#702010" stroke-width="0.5" />
              <line x1="7" y1="28" x2="17" y2="28" stroke="#702010" stroke-width="0.5" />
              
              <!-- Terracotta Fareham Pot (Tapered) -->
              <path d="M 8.5 22 Q 8 14 9 6 L 15 6 Q 16 14 15.5 22 Z" fill="#d95e38" />
              <rect x="8.5" y="5" width="7" height="1.5" fill="#c04020" /> <!-- Top Rim -->
              <rect x="8" y="21" width="8" height="1" fill="#b03015" /> <!-- Bottom Flange -->

              <!-- White Slip Decorations -->
              <path d="M 8.8 8 Q 12 9 15.2 8" stroke="#ffffff" stroke-width="1.2" fill="none" opacity="0.9" />
              <!-- Wavy slip line -->
              <path d="M 8.8 11 Q 9.5 10 10.5 11 T 12 11 T 13.5 11 T 15.1 11" stroke="#ffffff" stroke-width="0.8" fill="none" opacity="0.9" />
              <path d="M 8.7 13 Q 12 14 15.3 13" stroke="#ffffff" stroke-width="0.8" fill="none" opacity="0.9" />
              <path d="M 8.6 18 Q 12 17 15.4 18" stroke="#ffffff" stroke-width="0.8" fill="none" opacity="0.9" />

              <!-- Bouncy Smoke Bubbles -->
              <circle cx="10" cy="2" r="1.5" fill="#ffffff" class="smoke-1" opacity="0.8" />
              <circle cx="14" cy="1" r="2" fill="#ffffff" class="smoke-2" opacity="0.6" />
              <circle cx="11" cy="-1" r="2.5" fill="#ffffff" class="smoke-3" opacity="0.4" />
            </svg>`;

html = html.replace(oldSvgRegex, newSvg);

fs.writeFileSync('index.html', html);
console.log('Updated index.html SVGs');
