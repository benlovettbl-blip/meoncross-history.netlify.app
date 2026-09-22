module.exports = function renderPage4(assets) {
  return `
  <!-- ================= PAGE 4: LOCAL HERITAGE & PARISH ROLL ================= -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="school-title">Local Heritage: The Lowry Brothers &amp; Parish Roll</div>
        <div class="school-sub">Staff Dossier: Lee-on-the-Solent &amp; Stubbington Fallen in Flanders</div>
      </div>
      <div class="partner-pill">
        <div class="brand">Parish Fallen</div>
        <div class="lead">Tyne Cot &amp; Menin Gate</div>
      </div>
    </div>

    <div class="page-body">
      <!-- Pitch -->
      <div class="pitch-box">
        <div class="box-header">60-Second Teacher Pitch: The Lowry Family Tragedy</div>
        <p>
          "Stand with pupils and share this extraordinary local story: William and Annie Lowry lived at Manor Way Grange in Lee-on-the-Solent. They had three sons—William, Cyril, and Eric. In 1914, all three volunteered and took officer commissions. Over the next four years, all three were killed in action across different theaters. William died in a charge at Gallipoli; Cyril was shot dead on the Somme right in front of his brother Eric's eyes; and Eric, a decorated Lieutenant Colonel with a DSO and MC, was killed inspecting frontline outposts near Arras in the final weeks of the war in 1918. Their grief-stricken father built the Lowry Memorial Hall in Lee-on-the-Solent so their names would never fade. On our Holy Rood memorial tablet, all three are reunited."
        </p>
      </div>

      <!-- 3 Lowry Brothers Photos -->
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
        <div class="photo-card" style="padding: 6px;">
          <img src="${assets.lowryWilliam}" alt="Lieut. William Lowry" style="height: 135px; object-fit: contain; background: #ffffff;">
          <div style="font-weight: 800; font-size: 8.5pt; color: #1e3a8a; margin-top: 3px;">Lieut. William Lowry</div>
          <div style="font-size: 7.6pt; color: #b45309; font-weight: 700;">8th Gurkha Rifles (Age 25)</div>
          <div style="font-size: 7.4pt; color: #475569; line-height: 1.25; margin-top: 2px;">
            Killed 4 June 1915, Gallipoli charge up Gully Ravine. Helles Memorial.
          </div>
        </div>

        <div class="photo-card" style="padding: 6px;">
          <img src="${assets.lowryCyril}" alt="Capt. Cyril Lowry" style="height: 135px; object-fit: contain; background: #ffffff;">
          <div style="font-weight: 800; font-size: 8.5pt; color: #1e3a8a; margin-top: 3px;">Capt. Cyril Lowry</div>
          <div style="font-size: 7.6pt; color: #b45309; font-weight: 700;">2nd West Yorks (Age 20)</div>
          <div style="font-size: 7.4pt; color: #475569; line-height: 1.25; margin-top: 2px;">
            Killed 25 Mar 1918, Somme counter-attack in front of Eric. Pozi&egrave;res Memorial.
          </div>
        </div>

        <div class="photo-card" style="padding: 6px;">
          <img src="${assets.lowryEric}" alt="Lt. Col. Eric Lowry" style="height: 135px; object-fit: contain; background: #ffffff;">
          <div style="font-weight: 800; font-size: 8.5pt; color: #1e3a8a; margin-top: 3px;">Lt. Col. Eric Lowry DSO MC</div>
          <div style="font-size: 7.6pt; color: #b45309; font-weight: 700;">2nd West Yorks (Age 25)</div>
          <div style="font-size: 7.4pt; color: #475569; line-height: 1.25; margin-top: 2px;">
            Killed 23 Sep 1918, Arras outpost inspection. La Targette Cemetery.
          </div>
        </div>
      </div>

      <!-- Parish Fallen Table -->
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 25%;">Local Soldier</th>
            <th style="width: 32%;">Regiment &amp; Age</th>
            <th>Salient Memorial Location &amp; Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Pte. Thomas Franklin</strong></td>
            <td>1st Bn, Hampshire Regt (Age 23)</td>
            <td><strong>Menin Gate &middot; Panel 35</strong> &mdash; Killed 29 April 1915, Second Ypres (Frezenberg Ridge).</td>
          </tr>
          <tr>
            <td><strong>Pte. William Ayling</strong></td>
            <td>1st Bn, Hampshire Regt (Age 20)</td>
            <td><strong>Menin Gate &middot; Panel 35</strong> &mdash; Killed 9 July 1915, trench mortar bombardment at Potijze.</td>
          </tr>
          <tr>
            <td><strong>Pte. Sydney Muckett</strong></td>
            <td>15th Bn, Hampshire Regt (Age 21)</td>
            <td><strong>Tyne Cot &middot; Panels 88&ndash;90</strong> &mdash; Killed 20 September 1917, Battle of the Menin Road Ridge.</td>
          </tr>
          <tr>
            <td><strong>Pte. Arthur Rye</strong></td>
            <td>14th Bn, Hampshire Regt (Age 21)</td>
            <td><strong>Tyne Cot &middot; Panels 88&ndash;90</strong> &mdash; Killed 26 September 1917, Battle of Polygon Wood.</td>
          </tr>
          <tr>
            <td><strong>L/Cpl. Archibald Ward</strong></td>
            <td>15th Bn, Hampshire Regt (Age 23)</td>
            <td><strong>Tyne Cot &middot; Panels 88&ndash;90</strong> &mdash; Killed 14 October 1918, Gheluwe advance in dawn mist.</td>
          </tr>
          <tr>
            <td><strong>Pte. Charles Warland</strong></td>
            <td>3rd/4th The Queen's (Age 20)</td>
            <td><strong>Tyne Cot &middot; Panels 14&ndash;17</strong> &mdash; Killed 4 October 1917, Battle of Broodseinde marsh advance.</td>
          </tr>
        </tbody>
      </table>

      <!-- Fieldwork Task -->
      <div class="context-box">
        <div class="box-header">On-Site Fieldwork Task: Tracing Our Local Parish Fallen</div>
        <p>
          At the Menin Gate, guide pupils to Panel 35 to locate Thomas Franklin and William Ayling. At Tyne Cot, take pupils along the rear memorial wall to Panels 88&ndash;90 to find Sydney Muckett, Arthur Rye, and Archibald Ward. Pupils must record the panel inscription, examine the surrounding names from the Hampshire Regiment, and write a one-sentence personal dedication in their fieldwork logbook.
        </p>
      </div>

      <!-- Hinge Question -->
      <div class="hinge-box">
        <div class="box-header">? Targeted Enquiry Hinge Question</div>
        <p>
          "How does discovering that three brothers from one coastal family in our local village were wiped out transform our understanding of the 'Lost Generation' from abstract textbook statistics into acute personal grief?"
        </p>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 4 of 16</span>
    </div>
  </div>
  `;
};
