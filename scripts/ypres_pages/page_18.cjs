module.exports = function renderPage18(assets) {
  return `
  <!-- ================= PAGE 18: PASSCHENDAELE MUSEUM ================= -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="school-title">Day 2 &middot; Stop 9: Passchendaele 1917 Museum &amp; Dugouts</div>
        <div class="school-sub">16:00 &middot; Zonnebeke Chateau &middot; 20-Foot Subterranean Dugout Labyrinth &amp; Trench Network</div>
      </div>
      <div class="partner-pill">
        <div class="brand">Stop 9</div>
        <div class="lead">Underground Dugouts</div>
      </div>
    </div>

    <div class="page-body" style="display: flex; flex-direction: column; justify-content: space-between; gap: 5px;">
      <!-- Pitch -->
      <div class="pitch-box" style="padding: 7px 12px;">
        <div class="box-header">The Subterranean Labyrinth of Zonnebeke</div>
        <p style="font-size: 11pt; line-height: 1.42;">
          "Beneath the grounds of Zonnebeke Chateau, we descend into an authentic, full-scale reconstruction of a British underground dugout complex built 20 feet beneath the surface. As high-explosive artillery fire obliterated every tree, trench, and building above ground in 1917, armies burrowed into the damp clay to survive. In these cramped timber galleries, over 200 men lived like moles in cold, airless conditions for weeks on end. Notice the narrow bunk beds stacked three high, the pump sumps struggling against groundwater, and the candlebox air tests: if a candle flame flickered out from lack of oxygen, men knew carbon dioxide was rising and had to crank manual ventilation fans to survive. Outside, the museum's reconstructed British and German trench systems offer pupils a direct, side-by-side physical comparison of opposing defensive philosophies."
        </p>
      </div>

      <!-- Dual Photo Grid: Uncropped Sources -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        <div class="photo-card" style="padding: 4px; background: #f8fafc;">
          <img src="${assets.passchendaeleDugout}" alt="Passchendaele Dugout" style="max-height: 105px; width: auto; max-width: 100%; object-fit: contain; margin: 0 auto; display: block; border-radius: 4px;">
          <div class="caption" style="margin-top: 3px; font-size: 8.6pt; line-height: 1.25;">
            Passchendaele Dugout: 20-ft subterranean timber galleries.
          </div>
        </div>
        <div class="photo-card" style="padding: 4px; background: #f8fafc;">
          <img src="${assets.stretcherMud}" alt="Stretcher Bearers in Mud" style="max-height: 105px; width: auto; max-width: 100%; object-fit: contain; margin: 0 auto; display: block; border-radius: 4px;">
          <div class="caption" style="margin-top: 3px; font-size: 8.6pt; line-height: 1.25;">
            Passchendaele Mud (1917): Six bearers hauling a wounded soldier.
          </div>
        </div>
      </div>

      <!-- Tactical Deep-Dive 2-Col Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        <div class="context-box" style="padding: 5px 9px;">
          <div class="box-header" style="font-size: 9.8pt; margin-bottom: 2px;">Failure of Artillery at Third Ypres</div>
          <p style="font-size: 10.2pt; line-height: 1.36;">
            Haig's offensive opened with 4.5 million shells fired onto a narrow front. Rather than destroying pillboxes, the barrage shattered delicate drainage dykes just as heavy autumn rains broke, turning the battlefield into a lethal swamp.
          </p>
        </div>

        <div class="context-box" style="padding: 5px 9px;">
          <div class="box-header" style="font-size: 9.8pt; margin-bottom: 2px;">Stretcher Bearing in the Mud</div>
          <p style="font-size: 10.2pt; line-height: 1.36;">
            Moving a single casualty through Passchendaele mud required relays of <strong>six to eight bearers</strong> taking up to six hours per mile. Slipping off duckboards risked drowning beneath heavy wool kit.
          </p>
        </div>
      </div>

      <!-- Look-fors -->
      <div class="look-fors-box" style="padding: 5px 11px;">
        <div class="box-header" style="font-size: 10pt; margin-bottom: 2px;">4 Physical Forensic Look-Fors on Site</div>
        <ul class="look-fors-list" style="font-size: 10.6pt; line-height: 1.40;">
          <li><strong>Subterranean Timber Framing:</strong> Touch the heavy wooden baulks holding back tons of wet Flemish clay inside the dugout gallery.</li>
          <li><strong>Dugout Regimental Aid Post:</strong> Observe the underground triage station with stretchers, morphine bottles, and surgical instruments.</li>
          <li><strong>Comparative Trench Construction:</strong> Contrast the British deep sandbag trench with the German reinforced concrete pillbox network.</li>
          <li><strong>Original German A-Frames:</strong> View original preserved artifacts in the museum galleries showing captured field equipment.</li>
        </ul>
      </div>

      <!-- Hinge Questions -->
      <div class="hinge-box" style="padding: 5px 11px;">
        <p style="font-size: 10.6pt; line-height: 1.38;">
          1. "How did subterranean dugout systems alter the psychological endurance of troops subjected to relentless week-long artillery bombardments?"
        </p>
        <p style="font-size: 10.6pt; line-height: 1.38; margin-top: 3px;">
          2. "Was Field Marshal Haig justified in continuing the Passchendaele offensive into November 1917 after the weather and drainage dykes broke, or did it represent operational blindness?"
        </p>
      </div>

      <!-- Transit Bar -->
      <div class="transit-bar" style="padding: 5px 11px; font-size: 9.8pt;">
        <span>&rarr; <strong>Transit Guidance:</strong> 15-minute coach transit into central Ypres for evening meal and Menin Gate Last Post ceremony (arrive 19:20).</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 18 of 24</span>
    </div>
  </div>
  `;
};
