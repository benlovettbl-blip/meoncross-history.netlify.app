module.exports = function renderPage7(assets) {
  return `
  <!-- ================= PAGE 7: YORKSHIRE TRENCH ================= -->
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

    <div class="page-body" style="display: flex; flex-direction: column; justify-content: space-between; gap: 5px;">
      <!-- Pitch -->
      <div class="pitch-box" style="padding: 7px 12px;">
        <div class="box-header">The Discovery of Yorkshire Trench</div>
        <p style="font-size: 11.2pt; line-height: 1.44;">
          "This site was completely lost to history for 75 years until 1992, when an amateur Belgian archaeological team known as 'The Diggers' investigated land slated for industrial development. Beneath the undisturbed topsoil, they uncovered an intact British frontline system constructed in 1915 by the 49th (West Riding) Division. As you walk through, notice that trenches here were not dug deep into the earth, but built upwards as raised sandbag breastworks. In the low Yser valley, digging down just three feet hits groundwater. Men lived with stagnant water pooling around their boots 24 hours a day. Notice the steel-reinforced entrances leading down to deep subterranean dugouts 30 feet beneath us, where over 200 soldiers huddled in candlelit bunks waiting for the order to go over the top."
        </p>
      </div>

      <!-- Engineering, Photo & Tactical Grid: Uncropped Source + Side-by-Side Context -->
      <div style="display: grid; grid-template-columns: 1fr 1.25fr; gap: 10px; align-items: stretch;">
        <div class="photo-card" style="padding: 5px; background: #f8fafc; display: flex; flex-direction: column; justify-content: space-between;">
          <img src="${assets.cheshireTrench}" alt="Cheshire Regiment Frontline" style="max-height: 145px; width: auto; max-width: 100%; object-fit: contain; margin: 0 auto; display: block; border-radius: 4px;">
          <div class="caption" style="margin-top: 3px; font-size: 8.6pt; line-height: 1.25;">
            <strong>British Frontline Breastworks:</strong> Sandbag revetments, timber A-frames, and wooden duckboards laid above Flemish groundwater.
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 5px; justify-content: space-between;">
          <div class="context-box" style="padding: 5px 9px;">
            <div class="box-header" style="font-size: 9.8pt; margin-bottom: 2px;">Trench Architecture &amp; Traverses</div>
            <p style="font-size: 10.2pt; line-height: 1.35;">
              Trenches were never straight lines; they followed a rigid 90-degree zig-zag pattern. These earth baffles, called <strong>traverses</strong>, prevented enemy raiders from firing enfilade down the trench line and contained shell blast fragments. Sump drainage channels beneath duckboards channeled standing water away.
            </p>
          </div>

          <div class="context-box" style="padding: 5px 9px;">
            <div class="box-header" style="font-size: 9.8pt; margin-bottom: 2px;">The Phosgene Gas Attack (19 Dec 1915)</div>
            <p style="font-size: 10.2pt; line-height: 1.35;">
              This sector saw the German military debut of <strong>phosgene gas</strong>, mixed with chlorine to create an invisible cloud. Colorless and smelling faintly of moldy hay, phosgene was six times deadlier than chlorine. Its suffocating fluid buildup in the lungs took 24 to 48 hours to manifest.
            </p>
          </div>
        </div>
      </div>

      <!-- Look-fors -->
      <div class="look-fors-box" style="padding: 6px 11px;">
        <div class="box-header" style="font-size: 10pt; margin-bottom: 2px;">4 Physical Forensic Look-Fors on Site</div>
        <ul class="look-fors-list" style="font-size: 10.6pt; line-height: 1.40;">
          <li><strong>Preserved Timber A-Frames:</strong> Look beneath the duckboards to see the inverted V-shaped wooden posts holding up trench walls.</li>
          <li><strong>Subterranean Dugout Stairwells:</strong> The steep timber-lined shafts descending 30 feet into the earth, where 200 men sheltered from bombardments.</li>
          <li><strong>Sandbag Breastwork Elevation:</strong> Notice how the trench walls rise above ground level using revetments because digging deeper struck water.</li>
          <li><strong>Firestep Construction:</strong> The raised wooden ledge allowing riflemen to step up, fire over the parapet into No Man's Land, and step down to cover.</li>
        </ul>
      </div>

      <!-- Hinge Questions -->
      <div class="hinge-box" style="padding: 6px 11px;">
        <p style="font-size: 10.6pt; line-height: 1.38;">
          1. "Looking at the high water table and cramped zig-zag walls, did soldiers in the Salient face a greater daily threat from enemy artillery or from the hostile Flemish environment itself?"
        </p>
        <p style="font-size: 10.6pt; line-height: 1.38; margin-top: 3px;">
          2. "Why was the discovery of Yorkshire Trench by amateur archaeologists so vital in transforming our understanding of physical trench construction versus idealized textbook diagrams?"
        </p>
      </div>

      <!-- Transit Bar -->
      <div class="transit-bar" style="padding: 5px 11px; font-size: 9.8pt;">
        <span>&rarr; <strong>Transit Guidance:</strong> 15-minute coach transit north-east along the N313 to Langemarck German Military Cemetery.</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 7 of 24</span>
    </div>
  </div>
  `;
};
