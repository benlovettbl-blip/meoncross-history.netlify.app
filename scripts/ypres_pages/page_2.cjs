module.exports = function renderPage2(assets) {
  return `
  <!-- ================= PAGE 2: SALIENT MAP & ITINERARY ================= -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="school-title">Expedition Itinerary &amp; Salient Map</div>
        <div class="school-sub">Tour Leader Route Pacing &amp; 13 Historic Field Stops</div>
      </div>
      <div class="partner-pill">
        <div class="brand">Master Timetable</div>
        <div class="lead">13 Historic Stops</div>
      </div>
    </div>

    <div class="page-body" style="display: flex; flex-direction: column; justify-content: space-between; gap: 6px;">
      <!-- Map: Doubled in size for clear tactical navigation -->
      <div class="photo-card" style="padding: 4px; margin-bottom: 0;">
        <img src="${assets.salientMap}" alt="Salient Map" style="height: 315px; width: 100%; object-fit: contain; background: #ffffff; display: block;">
        <div class="caption" style="font-size: 8pt; padding: 2px 4px;">
          Strategic Overview of the Ypres Salient (1914–1918): Showing frontlines, allied defense arcs, and all 13 field expedition study stops.
        </div>
      </div>

      <!-- Timetable Table: Compact and streamlined -->
      <table class="data-table" style="font-size: 7.9pt; line-height: 1.25; margin: 0; width: 100%;">
        <thead>
          <tr>
            <th style="width: 14%; padding: 3px 6px; font-size: 7.6pt;">Time</th>
            <th style="width: 29%; padding: 3px 6px; font-size: 7.6pt;">Site / Location</th>
            <th style="padding: 3px 6px; font-size: 7.6pt;">Tour Leader Guidance &amp; Pedagogical Objective</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 2.2px 6px;"><strong>D1 &middot; 06:15</strong></td>
            <td style="padding: 2.2px 6px;"><strong>Depart / Folkestone</strong></td>
            <td style="padding: 2.2px 6px;">Coach departure; passports checked; 11:20 Eurotunnel; arrival in Flanders.</td>
          </tr>
          <tr>
            <td style="padding: 2.2px 6px;"><strong>D1 &middot; 14:30</strong></td>
            <td style="padding: 2.2px 6px;"><strong>Stop 1:</strong> Essex Farm ADS</td>
            <td style="padding: 2.2px 6px;">Bunker 4 triage; Alexis Helmer burial; recite <em>In Flanders Fields</em>; Pte. Strudwick (15 yrs).</td>
          </tr>
          <tr>
            <td style="padding: 2.2px 6px;"><strong>D1 &middot; 15:15</strong></td>
            <td style="padding: 2.2px 6px;"><strong>Stop 2:</strong> Yorkshire Trench</td>
            <td style="padding: 2.2px 6px;">Canal bank breastworks, A-frames, deep dugout entrance, phosgene gas attack.</td>
          </tr>
          <tr>
            <td style="padding: 2.2px 6px;"><strong>D1 &middot; 16:00</strong></td>
            <td style="padding: 2.2px 6px;"><strong>Stop 3:</strong> Langemarck Cemetery</td>
            <td style="padding: 2.2px 6px;"><em>Kindermord</em> myth; Kameradengrab (24,917); Emil Krieger mourners; German contrast.</td>
          </tr>
          <tr>
            <td style="padding: 2.2px 6px;"><strong>D1 &middot; 17:00</strong></td>
            <td style="padding: 2.2px 6px;"><strong>Stop 4:</strong> Hooge Crater Museum</td>
            <td style="padding: 2.2px 6px;">19 July 1915 mine blast (120ft crater); 30 July flamethrower debut; authentic weaponry.</td>
          </tr>
          <tr>
            <td style="padding: 2.2px 6px;"><strong>D1 &middot; 18:00</strong></td>
            <td style="padding: 2.2px 6px;"><strong>Peace Village Base Camp</strong></td>
            <td style="padding: 2.2px 6px;">Room check-in, 18:30 evening dinner, 19:30 seminar room debrief and day synthesis.</td>
          </tr>
          <tr>
            <td style="padding: 2.2px 6px;"><strong>D2 &middot; 09:15</strong></td>
            <td style="padding: 2.2px 6px;"><strong>Stop 5:</strong> Vancouver Corner</td>
            <td style="padding: 2.2px 6px;">First lethal gas attack (22 April 1915); Canadian stand; urine cloth defense; Brooding Soldier.</td>
          </tr>
          <tr>
            <td style="padding: 2.2px 6px;"><strong>D2 &middot; 10:00</strong></td>
            <td style="padding: 2.2px 6px;"><strong>Stop 6:</strong> Sanctuary Wood</td>
            <td style="padding: 2.2px 6px;">Preserved British frontline trenches, traverses, mud, duckboard sumps, trench rats.</td>
          </tr>
          <tr>
            <td style="padding: 2.2px 6px;"><strong>D2 &middot; 11:45</strong></td>
            <td style="padding: 2.2px 6px;"><strong>Lunch Stop (Aldi, Ypres)</strong></td>
            <td style="padding: 2.2px 6px;">Supervised shopping for fresh picnic lunches, fruit, and snacks in town centre.</td>
          </tr>
          <tr>
            <td style="padding: 2.2px 6px;"><strong>D2 &middot; 13:00</strong></td>
            <td style="padding: 2.2px 6px;"><strong>Stop 7:</strong> Tyne Cot Cemetery</td>
            <td style="padding: 2.2px 6px;">11,961 graves (70% unknown); Baker pillbox cross; missing wall (34,984 names); local boys.</td>
          </tr>
          <tr>
            <td style="padding: 2.2px 6px;"><strong>D2 &middot; 14:30</strong></td>
            <td style="padding: 2.2px 6px;"><strong>Stop 8:</strong> Lijssenthoek Cemetery</td>
            <td style="padding: 2.2px 6px;">Casualty Clearing Station chain; 300,000 wounded; Staff Nurse Nellie Spindler (Plot XVI).</td>
          </tr>
          <tr>
            <td style="padding: 2.2px 6px;"><strong>D2 &middot; 16:00</strong></td>
            <td style="padding: 2.2px 6px;"><strong>Stop 9:</strong> Passchendaele Museum</td>
            <td style="padding: 2.2px 6px;">Subterranean dugouts 20ft deep; living bunks; reconstructed British &amp; German trenches.</td>
          </tr>
          <tr>
            <td style="padding: 2.2px 6px;"><strong>D2 &middot; 19:20</strong></td>
            <td style="padding: 2.2px 6px;"><strong>Stop 10:</strong> Menin Gate Last Post</td>
            <td style="padding: 2.2px 6px;">Wreath laying; Panel 35 (Franklin &amp; Ayling); volunteer Fire Brigade buglers at 20:00.</td>
          </tr>
          <tr>
            <td style="padding: 2.2px 6px;"><strong>D3 &middot; 09:30</strong></td>
            <td style="padding: 2.2px 6px;"><strong>Stop 11:</strong> Ypres Cloth Hall</td>
            <td style="padding: 2.2px 6px;">Grote Markt; stone-by-stone reconstruction; civilian rebirth; Belgian artisan chocolate.</td>
          </tr>
          <tr>
            <td style="padding: 2.2px 6px;"><strong>D3 &middot; 10:45</strong></td>
            <td style="padding: 2.2px 6px;"><strong>Stop 12:</strong> Talbot House</td>
            <td style="padding: 2.2px 6px;">Tubby Clayton; Everyman sanctuary; Upper Room hop-loft chapel; carpenter's altar; library.</td>
          </tr>
          <tr>
            <td style="padding: 2.2px 6px;"><strong>D3 &middot; 12:45</strong></td>
            <td style="padding: 2.2px 6px;"><strong>Stop 13:</strong> Poperinge Death Cells</td>
            <td style="padding: 2.2px 6px;">Town Hall courtyard execution post; military justice; 306 shot at dawn; 2006 statutory pardon.</td>
          </tr>
          <tr>
            <td style="padding: 2.2px 6px;"><strong>D3 &middot; 14:30</strong></td>
            <td style="padding: 2.2px 6px;"><strong>Calais Transit &amp; Return</strong></td>
            <td style="padding: 2.2px 6px;">Depart Poperinge for Calais; 17:50 Le Shuttle crossing; arrive at school approx 20:00.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="footer-bar">
      <span>The History Department &middot; Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 2 of 24</span>
    </div>
  </div>
  `;
};
