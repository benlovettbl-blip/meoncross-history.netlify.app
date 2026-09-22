module.exports = function renderPage3(assets) {
  return `
  <!-- ================= PAGE 3: TOPOGRAPHY & CWGC ARCHITECTURE ================= -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="school-title">Field Geography &amp; CWGC Architecture</div>
        <div class="school-sub">Staff Primer: Topography, Forensic Archaeology &amp; Headstone Anatomy</div>
      </div>
      <div class="partner-pill">
        <div class="brand">CWGC Architecture</div>
        <div class="lead">Sir Fabian Ware</div>
      </div>
    </div>

    <div class="page-body">
      <!-- Pitch -->
      <div class="pitch-box">
        <div class="box-header">60-Second Teacher Pitch: The Flemish Clay Basin &amp; Ridge Topography</div>
        <p>
          "Look out over the landscape: Flanders appears dead flat, but the Salient is defined by a low, curved clay ridge rising barely 45 metres towards Passchendaele. In 1914, German forces seized that higher ground, wrapping around Ypres on three sides. This formed 'the Salient'—a murderous bulge where German artillery could fire inwards from north, east, and south. The soil beneath our feet is dense, water-impermeable Flemish blue clay. When millions of artillery shells shattered the medieval drainage dykes, the trapped groundwater had nowhere to go, turning the entire battleground into an ocean of liquid mud where men, mules, and guns literally drowned."
        </p>
      </div>

      <!-- 2-Col CWGC Anatomy -->
      <div style="display: grid; grid-template-columns: 1.15fr 1fr; gap: 10px; align-items: stretch;">
        <div class="photo-card" style="text-align: left; padding: 7px; display: flex; flex-direction: column; justify-content: space-between;">
          <img src="${assets.headstoneImg}" alt="CWGC Headstone" style="height: 195px; object-fit: cover; border-radius: 4px; margin-bottom: 5px;">
          <div style="font-size: 8.4pt; color: #334155; line-height: 1.38;">
            <strong style="color: #1e3a8a;">CWGC Portland Stone Dimensions:</strong> 81cm high &times; 38cm wide &times; 7.5cm thick.<br>
            <strong>1. Regimental Badge:</strong> Identical size for privates and generals (absolute equality in death).<br>
            <strong>2. Service Details:</strong> Number, rank, name, honours, battalion, regiment.<br>
            <strong>3. Religious Emblem:</strong> Latin Cross, Star of David, or left blank for secular/unaffiliated.<br>
            <strong>4. Date of Death &amp; Age:</strong> Average age across the Salient was just 24 years.<br>
            <strong>5. Personal Inscription:</strong> Family-chosen (max 66 characters; 3&frac12;d per letter).<br>
            <strong>6. Unknown Dead:</strong> Rudyard Kipling's universal words: <em>"A Soldier of the Great War &mdash; Known unto God."</em>
          </div>
        </div>

        <div class="context-box" style="display: flex; flex-direction: column; justify-content: space-between; padding: 9px 12px;">
          <div>
            <div class="box-header">Sir Fabian Ware's Founding Philosophy</div>
            <p style="font-size: 8.6pt; line-height: 1.40; color: #334155; margin-bottom: 6px;">
              In 1917, Red Cross commander Sir Fabian Ware established the Imperial War Graves Commission with three radical, non-negotiable principles:
            </p>
            <p style="font-size: 8.5pt; line-height: 1.38; color: #334155; margin-bottom: 6px;">
              <strong>1. Radical Equality:</strong> Every soldier, whether field marshal or teenage private, receives an identical Portland headstone. No family could purchase an elaborate marble mausoleum or private monument.
            </p>
            <p style="font-size: 8.5pt; line-height: 1.38; color: #334155; margin-bottom: 6px;">
              <strong>2. No Repatriation:</strong> The British government strictly forbade the repatriation of corpses to Britain. Wealthy families could not bring their sons home while working-class families grieved across the Channel.
            </p>
            <p style="font-size: 8.5pt; line-height: 1.38; color: #334155;">
              <strong>3. Permanence &amp; Identity:</strong> Each grave is maintained in perpetuity, set within perennial English cottage gardens symbolizing rebirth amidst destruction.
            </p>
          </div>
        </div>
      </div>

      <!-- Inscription Typologies -->
      <div class="context-box">
        <div class="box-header">Deciphering Family Inscription Typologies</div>
        <p style="font-size: 8.6pt; line-height: 1.40; color: #334155;">
          Have pupils inspect headstones and categorize family epitaphs into four distinct emotional registers:<br>
          &bull; <strong>Christian Resignation &amp; Faith:</strong> <em>"Thy Will Be Done"</em> &middot; <em>"Until The Day Break And The Shadows Flee Away"</em><br>
          &bull; <strong>Classical Duty &amp; Patriotism:</strong> <em>"For King And Country"</em> &middot; <em>"He Died That We Might Live In Peace"</em><br>
          &bull; <strong>Raw Personal Grief:</strong> <em>"A Day Of Memory Sad To Recall, Without Goodbye He Left Us All"</em> &middot; <em>"Our Only Son"</em><br>
          &bull; <strong>Stoic Pride &amp; Quiet Honour:</strong> <em>"Duty Nobly Done"</em> &middot; <em>"He Played The Game To The Very End"</em>
        </p>
      </div>

      <!-- Hinge Question -->
      <div class="hinge-box">
        <div class="box-header">? Targeted Enquiry Hinge Question</div>
        <p>
          "Why did Fabian Ware insist on uniform Portland stone and ban wealthy families from repatriating bodies, yet allow families to choose and pay for a private inscription? Does this preserve equality or reintroduce class differences?"
        </p>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 3 of 16</span>
    </div>
  </div>
  `;
};
