module.exports = function renderPage1(assets) {
  return `
  <!-- ================= PAGE 1: COVER & LOCAL PARISH FALLEN ================= -->
  <div class="page">
    <div class="header-bar" style="border-bottom: 2.5px solid #1e3a8a; padding-bottom: 5px; margin-bottom: 8px;">
      <div>
        <div class="school-title" style="font-size: 13pt; color: #1e3a8a; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;">
          The History Department
        </div>
        <div class="school-sub" style="font-size: 8.5pt; color: #64748b; font-weight: 600;">
          Fieldwork Pilgrimage &amp; Study Guide &middot; Ypres Salient Expedition
        </div>
      </div>
      <div style="font-size: 8.5pt; font-weight: 700; color: #b45309; text-transform: uppercase; letter-spacing: 0.06em; background: #fef3c7; border: 1px solid #fde68a; padding: 4px 10px; border-radius: 4px;">
        Staff &amp; Tour Leader Field Companion
      </div>
    </div>

    <div class="page-body" style="display: flex; flex-direction: column; justify-content: space-between; gap: 8px;">
      <!-- Title Block -->
      <div style="text-align: center; margin-bottom: 2px;">
        <h1 style="font-size: 26pt; line-height: 1.1; color: #0f172a; margin-bottom: 2px; letter-spacing: 0.02em;">
          YPRES 1914–1918
        </h1>
        <div style="font-size: 11pt; font-weight: 600; color: #b45309; font-style: italic;">
          Tour Leader Field Companion &middot; Site Scripts, Topography &amp; Parish Remembrance
        </div>
      </div>

      <!-- Cover Photo: Stubbington War Memorial -->
      <div class="photo-card" style="padding: 4px; margin-bottom: 0;">
        <img src="${assets.stubbingtonMem}" alt="Holy Rood Memorial" style="width: 100%; height: 125px; object-fit: cover; border-radius: 4px; display: block;">
        <div class="caption" style="margin-top: 3px; font-size: 7.8pt; padding: 0 4px;">
          The War Memorial Lychgate &amp; Shelter at Holy Rood Church, Stubbington &mdash; Anchoring our school expedition to our local parish fallen who lie in the Salient.
        </div>
      </div>

      <!-- Memorial Context Paragraph -->
      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-left: 5px solid #1e3a8a; border-radius: 6px; padding: 8px 12px;">
        <div style="font-size: 8.6pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 3px;">
          The Stubbington War Memorial &middot; Parish Bereavement &amp; Flanders Memory
        </div>
        <p style="font-size: 8.4pt; color: #334155; line-height: 1.40; margin: 0;">
          Erected in 1922 on the village green over the historic parish water pump, the Stubbington War Memorial Shelter stands as a unique community tribute to the sixty-seven local men and women who gave their lives in the Great War. Designed not as a cold, distant stone obelisk but as an active shelter for daily village life, it directly anchors our school fieldwork to the bereavement and sacrifice of our home community.
        </p>
      </div>

      <!-- Local Parish Fallen Roll & Memorial Locations Visited -->
      <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 8px 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
        <div style="font-size: 8.6pt; font-weight: 800; color: #b45309; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 5px; border-bottom: 1.2px solid #e2e8f0; padding-bottom: 3px; display: flex; justify-content: space-between; align-items: center;">
          <span>Local Parish Fallen Commemorated in the Salient &amp; Visited on Our Tour</span>
          <span style="font-size: 7.6pt; color: #64748b; font-weight: 600; text-transform: none;">Tracing Individual Graves &amp; Memorial Panels</span>
        </div>

        <table class="data-table" style="font-size: 8.2pt; line-height: 1.30; margin: 0; width: 100%;">
          <thead>
            <tr>
              <th style="width: 26%; padding: 3px 6px; font-size: 7.8pt;">Local Soldier</th>
              <th style="width: 32%; padding: 3px 6px; font-size: 7.8pt;">Regiment &amp; Local Connection</th>
              <th style="padding: 3px 6px; font-size: 7.8pt;">Salient Memorial Location &amp; Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 3px 6px;"><strong>Pte. Thomas J. Franklin</strong></td>
              <td style="padding: 3px 6px;">1st Bn, Hampshire Regt (Age 23)<br><span style="color: #64748b; font-size: 7.6pt;">Meadow Cottage, Chark</span></td>
              <td style="padding: 3px 6px;"><strong>Menin Gate &middot; Panel 35</strong><br>Killed 29 April 1915, Second Ypres (Frezenberg Ridge)</td>
            </tr>
            <tr>
              <td style="padding: 3px 6px;"><strong>Pte. William Ayling</strong></td>
              <td style="padding: 3px 6px;">1st Bn, Hampshire Regt (Age 20)<br><span style="color: #64748b; font-size: 7.6pt;">Stubbington Lane; Baker Boy</span></td>
              <td style="padding: 3px 6px;"><strong>Menin Gate &middot; Panel 35</strong><br>Killed 9 July 1915, trench mortar bombardment at Potijze</td>
            </tr>
            <tr>
              <td style="padding: 3px 6px;"><strong>Pte. Sydney Muckett</strong></td>
              <td style="padding: 3px 6px;">15th Bn, Hampshire Regt (Age 21)<br><span style="color: #64748b; font-size: 7.6pt;">Parish of Crofton / Holy Rood</span></td>
              <td style="padding: 3px 6px;"><strong>Tyne Cot &middot; Panels 88&ndash;90</strong><br>Killed 20 Sept 1917, Battle of Menin Road Ridge</td>
            </tr>
            <tr>
              <td style="padding: 3px 6px;"><strong>Pte. Arthur Rye</strong></td>
              <td style="padding: 3px 6px;">14th Bn, Hampshire Regt (Age 21)<br><span style="color: #64748b; font-size: 7.6pt;">Parish of Crofton / Holy Rood</span></td>
              <td style="padding: 3px 6px;"><strong>Tyne Cot &middot; Panels 88&ndash;90</strong><br>Killed 26 Sept 1917, Battle of Polygon Wood</td>
            </tr>
            <tr>
              <td style="padding: 3px 6px;"><strong>L/Cpl. Archibald Ward</strong></td>
              <td style="padding: 3px 6px;">15th Bn, Hampshire Regt (Age 23)<br><span style="color: #64748b; font-size: 7.6pt;">Parish of Crofton / Holy Rood</span></td>
              <td style="padding: 3px 6px;"><strong>Tyne Cot &middot; Panels 88&ndash;90</strong><br>Killed 14 Oct 1918, Gheluwe advance in dawn mist</td>
            </tr>
            <tr>
              <td style="padding: 3px 6px;"><strong>Pte. Charles Warland</strong></td>
              <td style="padding: 3px 6px;">3rd/4th The Queen's (Age 20)<br><span style="color: #64748b; font-size: 7.6pt;">Parish of Crofton / Holy Rood</span></td>
              <td style="padding: 3px 6px;"><strong>Tyne Cot &middot; Panels 14&ndash;17</strong><br>Killed 4 Oct 1917, Battle of Broodseinde</td>
            </tr>
            <tr>
              <td style="padding: 3px 6px;"><strong>The Lowry Brothers</strong></td>
              <td style="padding: 3px 6px;">William (25), Cyril (20), Eric (25)<br><span style="color: #64748b; font-size: 7.6pt;">Manor Way Grange, Lee-on-the-Solent</span></td>
              <td style="padding: 3px 6px;"><strong>Crofton Parish Memorial Tablet</strong><br>Three brothers killed across Gallipoli, the Somme &amp; Arras</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Remembrance Inscription Box -->
      <div style="background: #fffbeb; border: 1.5px solid #fde68a; border-left: 5px solid #b45309; border-radius: 6px; padding: 9px 14px; text-align: center;">
        <div style="font-family: 'Playfair Display', serif; font-style: italic; font-size: 9.8pt; color: #1e3a8a; line-height: 1.45;">
          &ldquo;They shall grow not old, as we that are left grow old:<br>
          Age shall not weary them, nor the years condemn.<br>
          At the going down of the sun and in the morning,<br>
          <strong>We will remember them.</strong>&rdquo;
        </div>
        <div style="font-size: 7.8pt; color: #b45309; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 4px;">
          &mdash; Laurence Binyon &middot; For the Fallen (1914) &mdash;
        </div>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department &middot; Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 1 of 24</span>
    </div>
  </div>
  `;
};
