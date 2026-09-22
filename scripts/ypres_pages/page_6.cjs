module.exports = function renderPage6(assets) {
  return `
  <!-- ================= PAGE 6: YORKSHIRE TRENCH ================= -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="school-title">Day 1 &middot; Stop 2: Yorkshire Trench &amp; Canal Bank Line</div>
        <div class="school-sub">15:15 &middot; Boezinge Sector &middot; Preserved Frontline, A-Frames &amp; Deep Dugout</div>
      </div>
      <div class="partner-pill">
        <div class="brand">Stop 2</div>
        <div class="lead">Original Trenches</div>
      </div>
    </div>

    <div class="page-body">
      <!-- Pitch -->
      <div class="pitch-box">
        <div class="box-header">60-Second Teacher Pitch: The Discovery of Yorkshire Trench</div>
        <p>
          "This site was completely lost to history for 75 years until 1992, when an amateur Belgian archaeological team known as 'The Diggers' investigated land slated for industrial development. Beneath the undisturbed topsoil, they uncovered an intact British frontline system constructed in 1915 by the 49th (West Riding) Division. As you walk through, notice that trenches here were not dug deep into the earth, but built upwards as raised sandbag breastworks. In the low Yser valley, digging down just three feet hits groundwater. Men lived with stagnant water pooling around their boots 24 hours a day. Notice the steel-reinforced entrances leading down to deep subterranean dugouts 30 feet beneath us, where over 200 soldiers huddled in candlelit bunks waiting for the order to go over the top."
        </p>
      </div>

      <!-- Photo Card -->
      <div class="photo-card" style="padding: 5px;">
        <img src="${assets.cheshireTrench}" alt="Cheshire Regiment Frontline" style="height: 180px; object-fit: cover;">
        <div class="caption">
          British infantry manning frontline breastworks: Sandbag revetments, timber A-frames, and wooden duckboards laid above Flemish groundwater.
        </div>
      </div>

      <!-- Engineering & Tactical -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div class="context-box">
          <div class="box-header">Trench Architecture &amp; Traverses</div>
          <p>
            Trenches were never straight lines; they followed a rigid 90-degree zig-zag pattern. These earth baffles, called <strong>traverses</strong>, prevented enemy raiders from firing enfilade down the trench line and contained high-explosive shell blast fragments to a single fire bay. Sump drainage channels beneath the duckboards attempted to channel standing water away from men's feet to prevent trench foot.
          </p>
        </div>

        <div class="context-box">
          <div class="box-header">The Phosgene Gas Attack (19 Dec 1915)</div>
          <p>
            This sector saw the German military debut of <strong>phosgene gas</strong>, mixed with chlorine to create an invisible, suffocating cloud. Colorless and smelling faintly of moldy hay, phosgene was six times deadlier than chlorine. Its suffocating fluid buildup in the lungs took 24 to 48 hours to manifest, catching unwary troops who removed their helmets too soon.
          </p>
        </div>
      </div>

      <!-- Look-fors -->
      <div class="look-fors-box">
        <div class="box-header">4 Physical Forensic Look-Fors on Site</div>
        <ul class="look-fors-list">
          <li><strong>Preserved Timber A-Frames:</strong> Look beneath the duckboards to see the inverted V-shaped wooden posts holding up trench walls.</li>
          <li><strong>Subterranean Dugout Stairwells:</strong> The steep timber-lined shafts descending 30 feet into the earth, where 200 men sheltered from bombardments.</li>
          <li><strong>Sandbag Breastwork Elevation:</strong> Notice how the trench walls rise above ground level using revetments because digging deeper struck water.</li>
          <li><strong>Firestep Construction:</strong> The raised wooden ledge allowing riflemen to step up, fire over the parapet into No Man's Land, and step down to cover.</li>
        </ul>
      </div>

      <!-- Hinge Questions -->
      <div class="hinge-box">
        <div class="box-header">? Targeted Enquiry Hinge Questions</div>
        <p>
          1. "Looking at the high water table and cramped zig-zag walls, did soldiers in the Salient face a greater daily threat from enemy artillery or from the hostile Flemish environment itself?"
        </p>
        <p>
          2. "Why was the discovery of Yorkshire Trench by amateur archaeologists so vital in transforming our understanding of physical trench construction versus idealized textbook diagrams?"
        </p>
      </div>

      <div class="transit-bar">
        <span>&rarr; <strong>Transit Guidance:</strong> 15-minute coach transit north-east along the N313 to Langemarck German Military Cemetery.</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 6 of 16</span>
    </div>
  </div>
  `;
};
