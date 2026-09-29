module.exports = function renderPage21(assets) {
  return `
  <!-- ================= PAGE 21: DAY 3 (CLOTH HALL & TALBOT HOUSE) ================= -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="school-title">Day 3 &middot; Stops 11 &amp; 12: Civic Rebirth &amp; Spiritual Refuge</div>
        <div class="school-sub">Ypres Cloth Hall Reconstruction &amp; Talbot House ('Toc H'), Poperinge</div>
      </div>
      <div class="partner-pill">
        <div class="brand">Stops 11&ndash;12</div>
        <div class="lead">Civic Rebirth &amp; Toc H</div>
      </div>
    </div>

    <div class="page-body">
      <!-- Dual Photo Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <div class="photo-card" style="padding: 6px; text-align: center;">
          <img src="${assets.clothHallRestored}" alt="Ypres Cloth Hall Restored" style="max-height: 140px; width: auto; max-width: 100%; object-fit: contain; margin: 0 auto; display: block;">
          <div class="caption" style="font-size: 8.8pt; padding: 4px 2px 0 2px;">
            Ypres Cloth Hall: Rebuilt stone-by-stone from medieval blueprints (1928&ndash;1967).
          </div>
        </div>
        <div class="photo-card" style="padding: 6px; text-align: center;">
          <img src="${assets.talbotHouse}" alt="Talbot House Poperinge" style="max-height: 140px; width: auto; max-width: 100%; object-fit: contain; margin: 0 auto; display: block;">
          <div class="caption" style="font-size: 8.8pt; padding: 4px 2px 0 2px;">
            Talbot House ('Toc H'), Poperinge: The everyman rest sanctuary for all military ranks.
          </div>
        </div>
      </div>

      <!-- Stop 11: Cloth Hall Context -->
      <div class="context-box">
        <div class="box-header">Stop 11: Ypres Cloth Hall &amp; Grote Markt (Civic Rebirth)</div>
        <p>
          In 1914, Ypres' 13th-century Gothic Cloth Hall was reduced to charred ruins by German incendiary shells. Winston Churchill passionately argued that the entire ruined city should be preserved in perpetuity as a sacred British memorial. The Belgian citizens fiercely rejected this, choosing to rebuild their city stone by stone from original medieval architectural blueprints in an epic 50-year restoration. Notice the blend of original scorched stones and reconstructed limestone.
        </p>
      </div>

      <!-- Stop 12: Talbot House Pitch -->
      <div class="pitch-box">
        <div class="box-header">Stop 12: Talbot House ("Toc H"), Poperinge &mdash; The Everyman Sanctuary</div>
        <p>
          "In late 1915, Army Chaplain Rev. Philip 'Tubby' Clayton opened this four-story townhouse as a rest house for soldiers in Poperinge ('Pop'), the bustling railhead six miles behind the front. Clayton established an extraordinary, revolutionary rule: <em>'All rank abandon ye who enter here.'</em> Inside, generals and teenage privates drank tea together, played piano, read books in the peaceful garden, and checked their weapons at the door. Up in the attic hop-loft, Tubby built a chapel where a simple carpenter's workbench served as the altar. In an army strictly segregated by class and military discipline, Talbot House provided humanity, laughter, and spiritual refuge."
        </p>
      </div>

      <!-- Look-fors -->
      <div class="look-fors-box">
        <div class="box-header">4 Physical Forensic Look-Fors on Site</div>
        <ul class="look-fors-list">
          <li><strong>The Hop-Loft Chapel:</strong> Climb to the top attic to inspect the carpenter's workbench altar and illuminated prayer texts.</li>
          <li><strong>Tubby Clayton's Desk &amp; Library:</strong> View the handwritten sign-in ledger where soldiers checked in their caps and revolver holsters.</li>
          <li><strong>The Peaceful Walled Garden:</strong> The quiet oasis where men sat in deckchairs escaping the relentless sound of artillery.</li>
          <li><strong>Cloth Hall Scorched Masonry:</strong> In the Grote Markt, spot the dark, fire-blackened medieval stones embedded in the restored belfry tower.</li>
        </ul>
      </div>

      <!-- Transit Bar -->
      <div class="transit-bar">
        <span>&rarr; <strong>Transit Guidance:</strong> 10-minute walk through Poperinge town centre to the Town Hall Courtyard Execution Cells.</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 21 of 24</span>
    </div>
  </div>
  `;
};
