module.exports = function renderPage10(assets) {
  return `
  <!-- ================= PAGE 10: HOOGE CRATER MUSEUM ================= -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="school-title">Day 1 &middot; Stop 4: Hooge Crater Museum &amp; Menin Road</div>
        <div class="school-sub">17:00 &middot; Bellewaerde Ridge &middot; 1915 Mine Crater &amp; Flammenwerfer Debut</div>
      </div>
      <div class="partner-pill">
        <div class="brand">Stop 4</div>
        <div class="lead">Crater &amp; Flame Attack</div>
      </div>
    </div>

    <div class="page-body">
      <!-- Pitch -->
      <div class="pitch-box">
        <div class="box-header">The Menin Road Bloodbath</div>
        <p>
          "We are standing on the infamous Menin Road, the single most dangerous highway in military history. Hooge Chateau, positioned on a low crest commanding the road into Ypres, changed hands dozens of times in savage hand-to-hand fighting. On 19 July 1915, British tunnelling companies detonated a massive subterranean mine packed with 1,700 pounds of ammonal directly beneath German positions, blowing a crater 120 feet wide and 20 feet deep. Eleven days later, on 30 July, the German army struck back with terrifying shock technology: the world debut of the <em>Flammenwerfer</em> (flamethrower). German shock-troops sprayed jets of burning oil over the British parapets, incinerating men alive and capturing the crater rim. The museum houses an unrivaled collection of authentic weapons, trench armor, and primary battlefield artifacts recovered from these fields."
        </p>
      </div>

      <!-- Photo Card -->
      <div class="photo-card" style="padding: 4px;">
        <img src="${assets.hoogeCrater}" alt="Hooge Crater" style="height: 115px; object-fit: cover;">
        <div class="caption">
          The Hooge Crater basin and reconstructed trenches: Scene of the 19 July 1915 mine blast and first liquid flame attack.
        </div>
      </div>

      <!-- Subterranean Warfare & Evening Routine 2-Col Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        <div class="context-box" style="padding: 6px 10px;">
          <div class="box-header">Subterranean Mine Warfare</div>
          <p style="font-size: 9.8pt; line-height: 1.38;">
            When surface assaults stalled against machine guns, both armies burrowed deep underground. Specialist miners ('clay kickers') dug silent shafts through clay to detonate ammonal charges, sparking savage 'crater fights' to seize the lip.
          </p>
        </div>

        <div class="context-box" style="padding: 6px 10px;">
          <div class="box-header">Evening Routine at Peace Village</div>
          <p style="font-size: 9.8pt; line-height: 1.38;">
            Following Hooge, the coach transfers directly to Peace Village Hostel in Mesen (18:00 check-in). After dinner at 18:30, tour leaders convene in the seminar room at 19:30 for a 45-minute debrief and fieldwork review.
          </p>
        </div>
      </div>

      <!-- Look-fors -->
      <div class="look-fors-box" style="padding: 6px 11px;">
        <div class="box-header">4 Physical Forensic Look-Fors on Site</div>
        <ul class="look-fors-list" style="font-size: 9.8pt; line-height: 1.38;">
          <li><strong>The Preserved Crater Depression:</strong> Walk the perimeter path of the water-filled mine crater behind the museum.</li>
          <li><strong>Museum Trench Armor Collection:</strong> Examine the heavy steel <em>Grabenpanzer</em> breastplates worn by sentries.</li>
          <li><strong>Reconstructed Frontline Firebays:</strong> Step through preserved trenches behind the museum to inspect wooden revetments.</li>
          <li><strong>Original Battlefield Periscopes:</strong> View optical mirrors allowing sentries to observe No Man's Land safely.</li>
        </ul>
      </div>

      <!-- Hinge Questions -->
      <div class="hinge-box" style="padding: 6px 11px;">
        <p style="font-size: 10pt; line-height: 1.38;">
          1. "Why did both armies invest vast manpower in subterranean mine warfare rather than surface infantry assaults? What does this reveal about defensive technology?"
        </p>
        <p style="font-size: 10pt; line-height: 1.38;">
          2. "Did the introduction of the flamethrower at Hooge alter the moral boundary of civilized warfare, or was it an extension of industrial artillery terror?"
        </p>
      </div>

      <!-- Transit Bar -->
      <div class="transit-bar">
        <span>&rarr; <strong>Transit Guidance:</strong> 25-minute coach transit south along the N365 to Peace Village Base Camp, Nieuwkerkestraat 9, Mesen.</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 10 of 24</span>
    </div>
  </div>
  `;
};
