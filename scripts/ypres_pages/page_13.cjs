module.exports = function renderPage13(assets) {
  return `
  <!-- ================= PAGE 13: PASSCHENDAELE MUSEUM ================= -->
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

    <div class="page-body">
      <!-- Pitch -->
      <div class="pitch-box">
        <div class="box-header">60-Second Teacher Pitch: The Subterranean Labyrinth of Zonnebeke</div>
        <p>
          "Beneath the grounds of Zonnebeke Chateau, we descend into an authentic, full-scale reconstruction of a British underground dugout complex built 20 feet beneath the surface. As high-explosive artillery fire obliterated every tree, trench, and building above ground in 1917, armies burrowed into the damp clay to survive. In these cramped timber galleries, over 200 men lived like moles in cold, airless conditions for weeks on end. Notice the narrow bunk beds stacked three high, the pump sumps struggling against groundwater, and the candlebox air tests: if a candle flame flickered out from lack of oxygen, men knew carbon dioxide was rising and had to crank manual ventilation fans to survive. Outside, the museum's reconstructed British and German trench systems offer pupils a direct, side-by-side physical comparison of opposing defensive philosophies."
        </p>
      </div>

      <!-- Dual Photo Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div class="photo-card" style="padding: 4px;">
          <img src="${assets.passchendaeleDugout}" alt="Passchendaele Dugout" style="height: 135px; object-fit: cover;">
          <div class="caption">
            Passchendaele Dugout: 20-foot subterranean timber galleries and aid post.
          </div>
        </div>
        <div class="photo-card" style="padding: 4px;">
          <img src="${assets.stretcherMud}" alt="Stretcher Bearers in Mud" style="height: 135px; object-fit: cover;">
          <div class="caption">
            Passchendaele Liquid Mud (1917): Six bearers hauling a wounded soldier.
          </div>
        </div>
      </div>

      <!-- Tactical Deep-Dive -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div class="context-box" style="padding: 6px 11px;">
          <div class="box-header">The Failure of Artillery at Third Ypres</div>
          <p style="font-size: 8.3pt; line-height: 1.32;">
            Field Marshal Haig's offensive opened on 31 July 1917 preceded by a colossal 10-day preliminary bombardment: 3,000 guns fired 4.5 million shells onto a narrow front. Rather than destroying German pillboxes, the barrage shattered the intricate drainage system of Flanders just as unseasonal autumn rains broke. The battlefield became a liquid swamp that swallowed men, pack mules, and 18-pounder artillery guns whole.
          </p>
        </div>

        <div class="context-box" style="padding: 6px 11px;">
          <div class="box-header">Stretcher Bearing in the Passchendaele Mud</div>
          <p style="font-size: 8.3pt; line-height: 1.32;">
            In normal conditions, two men carried a stretcher. In the Passchendaele mud, it required relays of <strong>six to eight men</strong> per casualty. Bearers waded waist-deep through slime, taking four to six hours to move a single wounded soldier one mile back from the line. Slipping off the wooden duckboards often meant drowning in liquid mud beneath the weight of heavy wool overcoats and kit.
          </p>
        </div>
      </div>

      <!-- Look-fors -->
      <div class="look-fors-box" style="padding: 6px 11px;">
        <div class="box-header">4 Physical Forensic Look-Fors on Site</div>
        <ul class="look-fors-list" style="font-size: 8.3pt; line-height: 1.32;">
          <li><strong>Subterranean Timber Framing:</strong> Touch the heavy wooden baulks holding back tons of wet Flemish clay inside the dugout gallery.</li>
          <li><strong>Dugout Regimental Aid Post:</strong> Observe the underground triage station with stretchers, morphine bottles, and surgical instruments.</li>
          <li><strong>Comparative Trench Construction:</strong> Contrast the British deep sandbag trench with the German reinforced concrete pillbox network.</li>
          <li><strong>Original German A-Frames:</strong> View original preserved artifacts in the museum galleries showing captured field equipment.</li>
        </ul>
      </div>

      <!-- Hinge Questions -->
      <div class="hinge-box">
        <div class="box-header">? Targeted Enquiry Hinge Questions</div>
        <p>
          1. "How did subterranean dugout systems alter the psychological endurance of troops subjected to relentless week-long artillery bombardments?"
        </p>
        <p>
          2. "Was Field Marshal Haig justified in continuing the Passchendaele offensive into November 1917 after the weather and drainage dykes broke, or did it represent operational blindness?"
        </p>
      </div>

      <div class="transit-bar">
        <span>&rarr; <strong>Transit Guidance:</strong> 15-minute coach transit into central Ypres for evening meal and Menin Gate Last Post ceremony (arrive 19:20).</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 13 of 16</span>
    </div>
  </div>
  `;
};
