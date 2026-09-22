module.exports = function renderPage9(assets) {
  return `
  <!-- ================= PAGE 9: VANCOUVER CORNER ================= -->
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
      <div class="pitch-box" style="padding: 7px 11px;">
        <div class="box-header">60-Second Teacher Pitch: 22 April 1915 &mdash; The First Lethal Gas Cloud</div>
        <p>
          "Stand looking north-east across this flat, open farmland. On the afternoon of 22 April 1915, at exactly 17:00, German engineers opened the valves on 5,730 pressurized steel cylinders buried along a four-mile frontline, releasing 168 tons of liquified <strong>chlorine gas</strong>. Carried by a gentle north-easterly breeze, a sinister greenish-yellow cloud rolled across No Man's Land toward the French Algerian and territorial division on the Canadian left. Unprepared and without respirators, soldiers suffocated as chlorine dissolved their lung tissue. Thousands broke in absolute panic, opening a four-mile gap in the Allied line. The raw, untested 1st Canadian Division held the right flank. Canadian medical officer Captain Francis Scrimger VC recognized the gas as chlorine and ordered men to urinate on handkerchiefs and socks, pressing them to their faces&mdash;ammonia in urine neutralized the acid. For three desperate days, the Canadians held the line, preventing the collapse of Ypres."
        </p>
      </div>

      <!-- Photo & Gas Mechanics 2-Col Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1.25fr; gap: 10px; align-items: stretch;">
        <div class="photo-card" style="padding: 4px; display: flex; flex-direction: column; justify-content: space-between;">
          <img src="${assets.broodingSoldier}" alt="The Brooding Soldier" style="height: 125px; object-fit: cover; border-radius: 3px;">
          <div class="caption">
            The Brooding Soldier (Clemesha): Honoring 2,000 Canadians who held against poison gas.
          </div>
        </div>

        <div class="context-box" style="display: flex; flex-direction: column; justify-content: space-between; padding: 6px 11px;">
          <div>
            <div class="box-header">Physiology of Chlorine Poisoning</div>
            <p style="font-size: 8.3pt; line-height: 1.32; margin-bottom: 4px;">
              Chlorine gas is 2.5 times denser than air; it hugged ground depressions and rolled down into firebays. Inhaled, it reacted with moisture in the respiratory tract to produce hydrochloric acid, causing fatal fluid asphyxiation.
            </p>
            <div class="box-header" style="margin-top: 4px;">Evolution of British Gas Defense</div>
            <p style="font-size: 8.3pt; line-height: 1.32;">
              Improvised urine pads led to the 'Black Veil' respirator (sodium thiosulfate), then the 1915 Phenate helmet, and finally the 1916 Small Box Respirator (SBR) using active charcoal filters.
            </p>
          </div>
        </div>
      </div>

      <!-- Look-fors -->
      <div class="look-fors-box" style="padding: 6px 11px;">
        <div class="box-header">4 Physical Forensic Look-Fors on Site</div>
        <ul class="look-fors-list" style="font-size: 8.4pt; line-height: 1.32;">
          <li><strong>Clemesha's 33-Foot Granite Monolith:</strong> Notice the Canadian soldier's head bowed over arms rested on his reversed rifle in traditional mourning posture.</li>
          <li><strong>Canadian Red Cedar &amp; Maple Gardens:</strong> The formal geometric park planting brought over from Canada to surround their fallen sons.</li>
          <li><strong>Directional Battle Direction Arrows:</strong> Stone plaques indicating the direction of the German gas release and Canadian counter-attacks.</li>
          <li><strong>Flat Open Farmland Vista:</strong> Notice the absence of high ground&mdash;explaining why poison gas drifted unimpeded across the entire salient.</li>
        </ul>
      </div>

      <!-- Poem Box -->
      <div class="poem-box" style="padding: 6px 11px;">
        <div class="poem-header">
          <div>
            <span class="poem-title">Dulce et Decorum Est</span>
            <span class="poem-meta">&middot; Wilfred Owen (Written 1917)</span>
          </div>
          <img src="${assets.owenImg}" alt="Wilfred Owen" style="width: 30px; height: 30px; border-radius: 50%; object-fit: cover; border: 1.2px solid #cbd5e1;">
        </div>
        <div class="poem-lines" style="font-size: 8.2pt; line-height: 1.28;">
Gas! GAS! Quick, boys!&mdash;An ecstasy of fumbling,
Fitting the clumsy helmets just in time;
But someone still was yelling out and stumbling,
And flound'ring like a man in fire or lime...
Dim, through the misty panes and thick green light,
As under a green sea, I saw him drowning.

In all my dreams, before my helpless sight,
He plunges at me, guttering, choking, drowning.
If in some smothering dreams you too could pace
Behind the wagon that we flung him in,
And watch the white eyes writhing in his face...
My friend, you would not tell with such high zest
To children ardent for some desperate glory,
The old Lie: <em>Dulce et decorum est / Pro patria mori.</em>
        </div>
      </div>

      <!-- Hinge Questions -->
      <div class="hinge-box" style="padding: 6px 11px;">
        <div class="box-header">? Targeted Enquiry Hinge Questions</div>
        <p>
          1. "Why did the German army fail to exploit the four-mile gap created by the chlorine gas cloud on 22 April 1915? What does this reveal about high-command skepticism toward technological weapons?"
        </p>
        <p>
          2. "How does Wilfred Owen's physiological description of gas poisoning refute Horace's ancient Roman motto that it is 'sweet and fitting to die for one's country'?"
        </p>
      </div>

      <div class="transit-bar">
        <span>&rarr; <strong>Transit Guidance:</strong> 15-minute coach transit south-west to Sanctuary Wood (Hill 62) along the Meenseweg.</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 9 of 16</span>
    </div>
  </div>
  `;
};
