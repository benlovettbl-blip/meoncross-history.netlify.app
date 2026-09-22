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

    <div class="page-body">
      <!-- Map -->
      <div class="photo-card" style="padding: 4px;">
        <img src="${assets.salientMap}" alt="Salient Map" style="height: 175px; object-fit: contain; background: #ffffff;">
        <div class="caption">
          Strategic Overview of the Ypres Salient (1914–1918): Showing frontlines, allied defense arcs, and all 13 field expedition study stops.
        </div>
      </div>

      <!-- Timetable Table -->
      <table class="data-table" style="font-size: 7.9pt;">
        <thead>
          <tr>
            <th style="width: 15%; padding: 3px 6px;">Time</th>
            <th style="width: 32%; padding: 3px 6px;">Site / Location</th>
            <th style="padding: 3px 6px;">Tour Leader Guidance &amp; Pedagogical Objective</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>D1 · 06:15</strong></td>
            <td><strong>Depart School / Folkestone</strong></td>
            <td>Jet Connect coach; passports collected; 11:20 Eurotunnel; arrival in Flanders.</td>
          </tr>
          <tr>
            <td><strong>D1 · 14:30</strong></td>
            <td><strong>Stop 1:</strong> Essex Farm ADS</td>
            <td>Bunker 4 triage; Alexis Helmer burial; recite <em>In Flanders Fields</em>; Pte. Strudwick (15 yrs).</td>
          </tr>
          <tr>
            <td><strong>D1 · 15:15</strong></td>
            <td><strong>Stop 2:</strong> Yorkshire Trench</td>
            <td>Canal bank breastworks, A-frames, deep dugout entrance, phosgene gas attack.</td>
          </tr>
          <tr>
            <td><strong>D1 · 16:00</strong></td>
            <td><strong>Stop 3:</strong> Langemarck Cemetery</td>
            <td><em>Kindermord</em> myth; Kameradengrab (24,917); Emil Krieger mourners; Hitler 1940 visit.</td>
          </tr>
          <tr>
            <td><strong>D1 · 17:00</strong></td>
            <td><strong>Stop 4:</strong> Hooge Crater Museum</td>
            <td>19 July 1915 mine blast (120ft crater); 30 July flamethrower debut; museum weaponry.</td>
          </tr>
          <tr>
            <td><strong>D1 · 18:00</strong></td>
            <td><strong>Peace Village Base Camp</strong></td>
            <td>Room check-in, 18:30 dinner, 19:30 evening seminar room debrief and D.I.R.T. marking.</td>
          </tr>
          <tr>
            <td><strong>D2 · 09:15</strong></td>
            <td><strong>Stop 5:</strong> Vancouver Corner</td>
            <td>First lethal gas attack (22 April 1915); Canadian stand; urine cloth defense; Brooding Soldier.</td>
          </tr>
          <tr>
            <td><strong>D2 · 10:00</strong></td>
            <td><strong>Stop 6:</strong> Sanctuary Wood</td>
            <td>Preserved British frontline trenches, traverses, mud, duckboard sumps, trench rats.</td>
          </tr>
          <tr>
            <td><strong>D2 · 11:45</strong></td>
            <td><strong>Lunch Stop (Aldi, Ypres)</strong></td>
            <td>Supervised shopping for fresh picnic lunches, fruit, and snacks in town centre.</td>
          </tr>
          <tr>
            <td><strong>D2 · 13:00</strong></td>
            <td><strong>Stop 7:</strong> Tyne Cot Cemetery</td>
            <td>11,961 graves (70% unknown); Baker pillbox cross; missing wall (34,984 names); local boys.</td>
          </tr>
          <tr>
            <td><strong>D2 · 14:30</strong></td>
            <td><strong>Stop 8:</strong> Lijssenthoek Cemetery</td>
            <td>Casualty Clearing Station chain; 300,000 wounded; Staff Nurse Nellie Spindler (Plot XVI).</td>
          </tr>
          <tr>
            <td><strong>D2 · 16:00</strong></td>
            <td><strong>Stop 9:</strong> Passchendaele Museum</td>
            <td>Subterranean dugouts 20ft deep; living bunks; reconstructed British &amp; German trenches.</td>
          </tr>
          <tr>
            <td><strong>D2 · 19:20</strong></td>
            <td><strong>Stop 10:</strong> Menin Gate Last Post</td>
            <td>Wreath laying; Panel 35 (Franklin &amp; Ayling); volunteer Fire Brigade buglers at 20:00.</td>
          </tr>
          <tr>
            <td><strong>D3 · 09:30</strong></td>
            <td><strong>Stop 11:</strong> Ypres Cloth Hall</td>
            <td>Grote Markt; stone-by-stone reconstruction; civilian rebirth; Belgian artisan chocolate.</td>
          </tr>
          <tr>
            <td><strong>D3 · 10:45</strong></td>
            <td><strong>Stop 12:</strong> Talbot House, Poperinge</td>
            <td>Tubby Clayton; Everyman sanctuary; Upper Room hop-loft chapel; carpenter's altar; library.</td>
          </tr>
          <tr>
            <td><strong>D3 · 12:45</strong></td>
            <td><strong>Stop 13:</strong> Poperinge Death Cells</td>
            <td>Town Hall courtyard execution post; military justice; 306 shot at dawn; 2006 statutory pardon.</td>
          </tr>
          <tr>
            <td><strong>D3 · 14:30</strong></td>
            <td><strong>Calais Transit &amp; Return</strong></td>
            <td>Depart Poperinge for Calais; 17:50 Le Shuttle crossing; arrive at school approx 20:00.</td>
          </tr>
        </tbody>
      </table>

      <!-- Coach Protocol Box -->
      <div class="context-box">
        <div class="box-header">Coach Logistics, Driver Tachograph Hours &amp; Supervisory Protocol</div>
        <p>
          Our Jet Connect coach driver operates under strict EU tachograph driving hours (maximum 4.5 hours driving without a mandatory 45-minute rest period). Please ensure prompt group boarding 10 minutes prior to scheduled departure times. Designated parking at Ypres is at the Lille Gate coach bays; Poperinge drop-off is near the Grote Markt. Headcounts must be conducted by accompanying staff using the 1:10 buddy roster before every coach departure.
        </p>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 2 of 16</span>
    </div>
  </div>
  `;
};
