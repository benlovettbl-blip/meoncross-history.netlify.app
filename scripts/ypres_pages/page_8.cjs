module.exports = function renderPage8(assets) {
  return `
  <!-- ================= PAGE 8: HOOGE CRATER MUSEUM ================= -->
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
        <div class="box-header">60-Second Teacher Pitch: The Menin Road Bloodbath</div>
        <p>
          "We are standing on the infamous Menin Road, the single most dangerous highway in military history. Hooge Chateau, positioned on a low crest commanding the road into Ypres, changed hands dozens of times in savage hand-to-hand fighting. On 19 July 1915, British tunnelling companies detonated a massive subterranean mine packed with 1,700 pounds of ammonal directly beneath German positions, blowing a crater 120 feet wide and 20 feet deep. Eleven days later, on 30 July, the German army struck back with terrifying shock technology: the world debut of the <em>Flammenwerfer</em> (flamethrower). German shock-troops sprayed jets of burning oil over the British parapets, incinerating men alive and capturing the crater rim. The museum houses an unrivaled collection of authentic weapons, trench armor, and primary battlefield artifacts recovered from these fields."
        </p>
      </div>

      <!-- Photo Card -->
      <div class="photo-card" style="padding: 5px;">
        <img src="${assets.hoogeCrater}" alt="Hooge Crater" style="height: 180px; object-fit: cover;">
        <div class="caption">
          The Hooge Crater basin and reconstructed frontline trenches on the Menin Road: Scene of the 19 July 1915 mine blast and first German liquid flame attack.
        </div>
      </div>

      <!-- Subterranean & Flamethrower Analysis -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div class="context-box">
          <div class="box-header">Subterranean Mine Warfare</div>
          <p>
            When surface assaults stalled against machine guns, both armies burrowed deep underground. Specialist miners ('clay kickers') dug silent shafts through clay using hand tools to avoid detection by enemy geophones (listening devices). When a mine was blown, both sides raced to seize and fortify the lip of the crater, creating vicious 'crater fights' fought with grenades and trench clubs.
          </p>
        </div>

        <div class="context-box">
          <div class="box-header">Evening Routine at Peace Village Base Camp</div>
          <p>
            Following our visit to Hooge, the coach transfers directly to Peace Village Hostel in Mesen (18:00 check-in). After dinner at 18:30, tour leaders convene the party in the private seminar room at 19:30 for a structured 45-minute debrief: reviewing Day 1 fieldwork logbook notes, completing D.I.R.T. feedback, and setting historical focus points for Day 2.
          </p>
        </div>
      </div>

      <!-- Look-fors -->
      <div class="look-fors-box">
        <div class="box-header">4 Physical Forensic Look-Fors on Site</div>
        <ul class="look-fors-list">
          <li><strong>The Preserved Crater Depression:</strong> Walk the perimeter path of the water-filled mine crater behind the museum chapel.</li>
          <li><strong>Museum Trench Armor Collection:</strong> Examine the heavy steel <em>Grabenpanzer</em> breastplates worn by German sentries and machine gunners.</li>
          <li><strong>Reconstructed Frontline Firebays:</strong> Step through the preserved trench system behind the museum to inspect wooden revetments and wire entanglements.</li>
          <li><strong>Original Battlefield Periscopes:</strong> View the optical mirrors allowing soldiers to observe No Man's Land without exposing their heads to sniper fire.</li>
        </ul>
      </div>

      <!-- Hinge Questions -->
      <div class="hinge-box">
        <div class="box-header">? Targeted Enquiry Hinge Questions</div>
        <p>
          1. "Why did both British and German high commands invest vast manpower in subterranean mine warfare rather than surface infantry assaults? What does this reveal about the tactical supremacy of defensive weaponry?"
        </p>
        <p>
          2. "Did the introduction of the flamethrower at Hooge alter the moral boundary of civilized warfare, or was it simply an inevitable extension of industrial artillery terror?"
        </p>
      </div>

      <div class="transit-bar">
        <span>&rarr; <strong>Transit Guidance:</strong> 25-minute coach transit south along the N365 to Peace Village Base Camp, Nieuwkerkestraat 9, Mesen.</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 8 of 16</span>
    </div>
  </div>
  `;
};
