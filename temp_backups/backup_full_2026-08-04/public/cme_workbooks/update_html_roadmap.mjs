import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// Replace Binder Grid with Roadmap Container
const oldBinderHtml = `          <div id="gpk-binder-container" style="margin-bottom: 40px;">
            <h3 style="font-family: var(--font-heading); color: var(--accent); margin-bottom: 8px; font-size: 1.4rem;">
              <i class="fa-solid fa-book-open"></i> Collector's Binder
            </h3>
            <div id="gpk-binder-grid" class="card-binder-grid">
              <!-- Dynamically populated locked/unlocked cards -->
            </div>
          </div>`;

const newRoadmapHtml = `          <!-- GAMIFICATION ROADMAP -->
          <div id="gpk-roadmap-container" style="margin-bottom: 40px;">
            <h3 style="font-family: var(--font-heading); color: var(--accent); margin-bottom: 8px; font-size: 1.4rem;">
              <i class="fa-solid fa-map"></i> Gamification Roadmap
            </h3>
            <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 24px;">Progress through the topics to unlock the 11 key historical figures. Click an unlocked card to reveal their historical bio!</p>
            <div id="roadmap-path-wrapper" style="position: relative; padding: 40px 0; overflow-x: auto;">
              <svg id="roadmap-svg-lines" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;"></svg>
              <div id="roadmap-nodes-container" style="position: relative; z-index: 2; display: flex; flex-wrap: wrap; gap: 30px; justify-content: center; min-width: 800px; padding: 20px;">
                <!-- Roadmap nodes injected here -->
              </div>
            </div>
          </div>`;

html = html.replace(oldBinderHtml, newRoadmapHtml);

// Add Card Detail Modal inside body (right after pack-opening-overlay)
const modalHtml = `
  <!-- CARD DETAIL MODAL -->
  <div id="card-detail-modal" class="card-detail-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 9999; justify-content: center; align-items: center; opacity: 0; transition: opacity 0.3s ease;">
    <div style="position: absolute; top: 20px; right: 20px; cursor: pointer; color: white; font-size: 2rem; z-index: 10000;" onclick="document.getElementById('card-detail-modal').style.opacity = '0'; setTimeout(() => document.getElementById('card-detail-modal').style.display = 'none', 300);"><i class="fa-solid fa-xmark"></i></div>
    
    <div class="individual-card-container" style="perspective: 1000px; width: 320px; height: 460px; max-width: 90vw; max-height: 80vh;">
      <div id="detail-modal-flipper" class="individual-card" style="position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer;" onclick="this.style.transform = this.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';">
        
        <!-- FRONT: GPK CARD -->
        <div class="individual-card-face front gpk-card-unlocked" id="detail-modal-front" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); background-size: cover; background-position: center;">
          <!-- holographic overlay generated via CSS pseudo-element -->
        </div>

        <!-- BACK: HISTORICAL BIO -->
        <div class="individual-card-face back" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 12px; border: 2px solid var(--accent); background: var(--bg-sidebar); display: flex; flex-direction: column; padding: 20px; box-sizing: border-box; justify-content: space-between; transform: rotateY(180deg); overflow-y: auto;">
          <div style="text-align: left; display: flex; flex-direction: column; gap: 10px; height: 100%;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid var(--border-glass); padding-bottom: 6px;">
              <h4 id="detail-modal-name" style="margin: 0; font-family: var(--font-heading); font-size: 1.3rem; font-weight: 700; color: var(--text-main);">Name</h4>
              <span style="font-size: 0.65rem; text-transform: uppercase; color: var(--accent); font-weight: 700; letter-spacing: 0.5px;">GCSE Bio</span>
            </div>
            <p id="detail-modal-bio" style="font-size: 0.85rem; line-height: 1.5; color: var(--text-muted); margin: 0; flex-grow: 1;">
              Bio text goes here...
            </p>
            <div style="background: rgba(37, 99, 235, 0.05); border: 1px dashed var(--primary); border-radius: 6px; padding: 12px; margin-top: auto; box-sizing: border-box;">
              <strong style="font-size: 0.75rem; color: var(--primary); text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">💡 Quick Recall Question:</strong>
              <p id="detail-modal-question" style="font-size: 0.85rem; line-height: 1.35; color: var(--text-main); font-weight: 600; margin: 0;">Question?</p>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div style="position: absolute; bottom: 30px; text-align: center; width: 100%; color: var(--text-muted); font-size: 0.9rem; pointer-events: none;">
      <i class="fa-solid fa-rotate"></i> Click to flip card
    </div>
  </div>
`;

if (!html.includes('card-detail-modal')) {
  html = html.replace('<!-- Confetti Canvas for Celebrating Mastered Topics -->', modalHtml + '\n  <!-- Confetti Canvas for Celebrating Mastered Topics -->');
}

// Change "Historical Biographies" to "Supporting Figures"
html = html.replace('Historical Biographies</h3>', 'Supporting Figures</h3>\n          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px;">Other key individuals from the specification. Flip to revise their roles.</p>');

fs.writeFileSync('index.html', html);
console.log("Updated index.html");
