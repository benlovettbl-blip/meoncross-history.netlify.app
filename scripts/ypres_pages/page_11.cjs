module.exports = function renderPage11(assets) {
  return `
  <!-- ================= PAGE 11: TYNE COT CEMETERY ================= -->
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
      <div class="pitch-box" style="padding: 7px 11px;">
        <div class="box-header">60-Second Teacher Pitch: The Great City of the Silent</div>
        <p>
          "We are standing in Tyne Cot, the largest Commonwealth war cemetery in the world. Spread across this gentle slope lie <strong>11,961 soldiers</strong> of the British Empire. Look closely at the headstones: an astonishing <strong>8,369 of them&mdash;nearly 70%&mdash;are unidentified</strong>, marked only with Kipling's words: <em>'A Soldier of the Great War &mdash; Known unto God.'</em> This ground was captured by the Australian 3rd Division on 4 October 1917 during the Battle of Broodseinde. Notice the massive Cross of Sacrifice standing in the centre: architect Sir Herbert Baker deliberately encased a captured German reinforced concrete pillbox inside its stone base, cutting an aperture so the machine-gun firing slit remains visible beneath the cross. At the rear, the semi-circular Memorial to the Missing bears the carved names of <strong>34,984 soldiers</strong> who vanished in the mud of the Salient between August 1917 and the Armistice."
        </p>
      </div>

      <!-- Photo Card -->
      <div class="photo-card" style="padding: 4px;">
        <img src="${assets.tyneCot}" alt="Tyne Cot Cemetery" style="height: 125px; object-fit: cover;">
        <div class="caption">
          Tyne Cot Cemetery on the Passchendaele slope: The Great Cross of Sacrifice built over a German machine-gun pillbox, with 12,000 Portland headstones.
        </div>
      </div>

      <!-- Architecture & Local Parish -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div class="context-box" style="padding: 5px 10px;">
          <div class="box-header">Baker's Classical Landscape Design</div>
          <p style="font-size: 8.3pt; line-height: 1.32;">
            Architect Sir Herbert Baker designed Tyne Cot as a classical terraced city. Flint stones from English chalk downs were embedded in the walls to evoke English parish church masonry. Clustered around the central Cross are the original battlefield burials made by soldiers during the fighting; the outer concentric arcs were concentrated after 1918.
          </p>
        </div>

        <div class="context-box" style="padding: 5px 10px;">
          <div class="box-header">Local Parish Search: Panels 88&ndash;90</div>
          <p style="font-size: 8.3pt; line-height: 1.32;">
            Lead pupils along the rear memorial wall to <strong>Panels 88&ndash;90 (Hampshire Regiment)</strong>. Here are carved three of our parish boys: <strong>Pte. Sydney Muckett</strong> (killed at Menin Road, age 21), <strong>Pte. Arthur Rye</strong> (killed at Polygon Wood, age 21), and <strong>L/Cpl. Archibald Ward</strong> (killed advancing through morning mist at Gheluwe, age 23).
          </p>
        </div>
      </div>

      <!-- Look-fors -->
      <div class="look-fors-box" style="padding: 5px 10px;">
        <div class="box-header">4 Physical Forensic Look-Fors on Site</div>
        <ul class="look-fors-list" style="font-size: 8.3pt; line-height: 1.32;">
          <li><strong>The German Pillbox Aperture:</strong> Walk behind the Cross of Sacrifice to look through the concrete slit where German gunners fired.</li>
          <li><strong>Disordered Cluster of Field Graves:</strong> Compare the chaotic, non-linear headstones near the central pillbox with the neat postwar outer rows.</li>
          <li><strong>Panels 88&ndash;90 (Hampshire Regiment):</strong> Locate our local parish names on the rear memorial wall.</li>
          <li><strong>Victoria Cross Graves:</strong> Locate the graves of Capt. Clarence Smith Jeffries VC (40th Australian Bn) and Sgt. Lewis McGee VC.</li>
        </ul>
      </div>

      <!-- Poem Box -->
      <div class="poem-box" style="padding: 5px 10px;">
        <div class="poem-header">
          <div>
            <span class="poem-title">For the Fallen</span>
            <span class="poem-meta">&middot; Laurence Binyon (September 1914)</span>
          </div>
          <img src="${assets.binyonImg}" alt="Laurence Binyon" style="width: 30px; height: 30px; border-radius: 50%; object-fit: cover; border: 1.2px solid #cbd5e1;">
        </div>
        <div class="poem-lines" style="font-size: 8.2pt; line-height: 1.28;">
With proud thanksgiving, a mother for her children,
England mourns for her dead across the sea.
Flesh of her flesh they were, spirit of her spirit,
Fallen in the cause of the free.

They went with songs to the battle, they were young,
Straight of limb, true of eye, steady and aglow.
They were staunch to the end against odds uncounted;
They fell with their faces to the foe.

They shall grow not old, as we that are left grow old:
Age shall not weary them, nor the years condemn.
At the going down of the sun and in the morning
We will remember them.
        </div>
      </div>

      <!-- Hinge Questions -->
      <div class="hinge-box" style="padding: 5px 10px;">
        <div class="box-header">? Targeted Enquiry Hinge Questions</div>
        <p>
          1. "Why did Sir Herbert Baker choose to incorporate a captured enemy pillbox directly into the foundation of the Cross of Sacrifice rather than bulldozing it away? What symbolic message does this convey?"
        </p>
        <p>
          2. "What does the overwhelming proportion of unknown dead (nearly 70%) at Tyne Cot reveal about the physical nature of high-explosive artillery warfare during the Third Battle of Ypres?"
        </p>
      </div>

      <div class="transit-bar">
        <span>&rarr; <strong>Transit Guidance:</strong> 20-minute coach transit south-west around Ypres to Lijssenthoek Military Cemetery near Poperinge.</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 11 of 16</span>
    </div>
  </div>
  `;
};
