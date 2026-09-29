module.exports = function renderPage15(assets) {
  return `
  <!-- ================= PAGE 15: TYNE COT CEMETERY (SITE & LOOK-FORS) ================= -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="school-title">Day 2 &middot; Stop 7: Tyne Cot British Military Cemetery</div>
        <div class="school-sub">13:00 &middot; Passchendaele Ridge &middot; Largest CWGC Cemetery on Earth &amp; 34,984 Missing</div>
      </div>
      <div class="partner-pill">
        <div class="brand">Stop 7</div>
        <div class="lead">Tyne Cot &amp; Missing</div>
      </div>
    </div>

    <div class="page-body">
      <!-- Pitch -->
      <div class="pitch-box">
        <div class="box-header">The Great City of the Silent</div>
        <p>
          "We are standing in Tyne Cot, the largest Commonwealth war cemetery in the world. Spread across this gentle slope lie <strong>11,961 soldiers</strong> of the British Empire. Look closely at the headstones: an astonishing <strong>8,369 of them&mdash;nearly 70%&mdash;are unidentified</strong>, marked only with Kipling's words: <em>'A Soldier of the Great War &mdash; Known unto God.'</em> This ground was captured by the Australian 3rd Division on 4 October 1917 during the Battle of Broodseinde. Notice the massive Cross of Sacrifice standing in the centre: architect Sir Herbert Baker deliberately encased a captured German reinforced concrete pillbox inside its stone base, cutting an aperture so the machine-gun firing slit remains visible beneath the cross. At the rear, the semi-circular Memorial to the Missing bears the carved names of <strong>34,984 soldiers</strong> who vanished in the mud of the Salient between August 1917 and the Armistice."
        </p>
      </div>

      <!-- Photo Card -->
      <div class="photo-card" style="padding: 5px;">
        <img src="${assets.tyneCot}" alt="Tyne Cot Cemetery" style="height: 165px; object-fit: cover;">
        <div class="caption">
          Tyne Cot Cemetery on the Passchendaele slope: The Great Cross of Sacrifice built over a German machine-gun pillbox, with 12,000 Portland headstones.
        </div>
      </div>

      <!-- Architecture & Local Parish 2-Col Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div class="context-box">
          <div class="box-header">Baker's Classical Landscape Design</div>
          <p>
            Architect Sir Herbert Baker designed Tyne Cot as a classical terraced city. Flint stones from English chalk downs were embedded in the boundary walls to evoke English church masonry. The inner cluster preserves original wartime battlefield burials; outer arcs were concentrated postwar.
          </p>
        </div>

        <div class="context-box">
          <div class="box-header">Local Parish Search: Panels 88&ndash;90</div>
          <p>
            Lead pupils along the rear memorial wall to <strong>Panels 88&ndash;90 (Hampshire Regiment)</strong> to locate our three parish boys: <strong>Pte. Sydney Muckett</strong> (Menin Road, age 21), <strong>Pte. Arthur Rye</strong> (Polygon Wood, age 21), and <strong>L/Cpl. Archibald Ward</strong> (Gheluwe, age 23).
          </p>
        </div>
      </div>

      <!-- Look-fors -->
      <div class="look-fors-box">
        <div class="box-header">4 Physical Forensic Look-Fors on Site</div>
        <ul class="look-fors-list">
          <li><strong>The German Pillbox Aperture:</strong> Walk behind the Cross of Sacrifice to look through the concrete slit where German gunners fired.</li>
          <li><strong>Disordered Cluster of Field Graves:</strong> Compare the chaotic, non-linear headstones near the central pillbox with the neat postwar outer rows.</li>
          <li><strong>Panels 88&ndash;90 (Hampshire Regiment):</strong> Locate our local parish names on the rear memorial wall.</li>
          <li><strong>Victoria Cross Graves:</strong> Locate the graves of Capt. Clarence Smith Jeffries VC (40th Australian Bn) and Sgt. Lewis McGee VC.</li>
        </ul>
      </div>

      <!-- Field Directive -->
      <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 7px; padding: 8px 13px;">
        <div style="font-size: 9.6pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
          Tour Leader Field Directive: Memorial Wall Search
        </div>
        <p style="font-size: 10.2pt; color: #1e293b; line-height: 1.42; margin: 0;">
          Guide students along the curving apse to Panels 88&ndash;90. Have them record the names before assembling at the central Cross for Laurence Binyon's ode on the facing page.
        </p>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 15 of 24</span>
    </div>
  </div>
  `;
};
