module.exports = function renderPage11(assets) {
  return `
  <!-- ================= PAGE 11: VANCOUVER CORNER (SITE & GAS WARFARE) ================= -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="school-title">Day 2 &middot; Stop 5: Vancouver Corner &amp; The Brooding Soldier</div>
        <div class="school-sub">09:15 &middot; St Julien Sector &middot; Second Ypres &amp; The First Lethal Gas Attack</div>
      </div>
      <div class="partner-pill">
        <div class="brand">Stop 5</div>
        <div class="lead">Chemical Warfare</div>
      </div>
    </div>

    <div class="page-body">
      <!-- Pitch -->
      <div class="pitch-box">
        <div class="box-header">60-Second Teacher Pitch: 22 April 1915 &mdash; The First Lethal Gas Cloud</div>
        <p>
          "Stand looking north-east across this flat, open farmland. On the afternoon of 22 April 1915, at exactly 17:00, German engineers opened the valves on 5,730 pressurized steel cylinders buried along a four-mile frontline, releasing 168 tons of liquified <strong>chlorine gas</strong>. Carried by a gentle north-easterly breeze, a sinister greenish-yellow cloud rolled across No Man's Land toward the French Algerian and territorial division on the Canadian left. Unprepared and without respirators, soldiers suffocated as chlorine dissolved their lung tissue. Thousands broke in absolute panic, opening a four-mile gap in the Allied line. The raw, untested 1st Canadian Division held the right flank. Canadian medical officer Captain Francis Scrimger VC recognized the gas as chlorine and ordered men to urinate on handkerchiefs and socks, pressing them to their faces&mdash;ammonia in urine neutralized the acid. For three desperate days, the Canadians held the line, preventing the collapse of Ypres."
        </p>
      </div>

      <!-- Photo Card -->
      <div class="photo-card" style="padding: 5px;">
        <img src="${assets.broodingSoldier}" alt="The Brooding Soldier" style="height: 165px; object-fit: cover;">
        <div class="caption">
          The Brooding Soldier Memorial (Frederick Clemesha): 33-foot granite monolith honoring 2,000 Canadians who fell holding the line against chlorine gas.
        </div>
      </div>

      <!-- Gas Mechanics & Evolution 2-Col Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div class="context-box">
          <div class="box-header">Physiology of Chlorine Poisoning</div>
          <p>
            Chlorine gas is 2.5 times denser than air; it hugged ground depressions and rolled down into firebays. Inhaled, it reacted with water in the lungs to produce hydrochloric acid, destroying lung alveoli and causing drowning in internal secretions within minutes.
          </p>
        </div>

        <div class="context-box">
          <div class="box-header">Evolution of British Gas Defense</div>
          <p>
            Improvised urine cloths quickly gave way to the 'Black Veil' pad (soaked in sodium thiosulfate), followed by the flannel 'Hypo Helmet' (1915), the Phenate Hexamine helmet, and finally the 1916 Small Box Respirator (SBR) using active coconut charcoal filters.
          </p>
        </div>
      </div>

      <!-- Look-fors -->
      <div class="look-fors-box">
        <div class="box-header">4 Physical Forensic Look-Fors on Site</div>
        <ul class="look-fors-list">
          <li><strong>Clemesha's 33-Foot Granite Monolith:</strong> Notice the Canadian soldier's head bowed over arms rested on his reversed rifle in mourning posture.</li>
          <li><strong>Canadian Red Cedar &amp; Maple Gardens:</strong> The formal geometric park planting brought over from Canada to surround their fallen sons.</li>
          <li><strong>Directional Battle Direction Arrows:</strong> Stone plaques indicating the direction of the German gas release and Canadian counter-attacks.</li>
          <li><strong>Flat Open Farmland Vista:</strong> Notice the absence of high ground&mdash;explaining why poison gas drifted unimpeded across the salient.</li>
        </ul>
      </div>

      <!-- Field Directive -->
      <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 7px; padding: 8px 13px;">
        <div style="font-size: 9.6pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
          Tour Leader Field Directive: The Canadian Line
        </div>
        <p style="font-size: 10.2pt; color: #1e293b; line-height: 1.42; margin: 0;">
          Gather pupils at the base of the monument. Point north-east toward Poelcappelle to trace the path of the gas cloud before opening the Owen reading on the facing page.
        </p>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 11 of 24</span>
    </div>
  </div>
  `;
};
