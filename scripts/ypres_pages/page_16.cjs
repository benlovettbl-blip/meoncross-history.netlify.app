module.exports = function renderPage16(assets) {
  return `
  <!-- ================= PAGE 16: BACK COVER & DIRECTORY ================= -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="school-title">Field Reference Directory &amp; Master Glossary</div>
        <div class="school-sub">Staff Protocols, Critical Contacts &amp; Tactical Vocabulary</div>
      </div>
      <div class="partner-pill">
        <div class="brand">Field Reference</div>
        <div class="lead">Staff Protocols</div>
      </div>
    </div>

    <div class="page-body">
      <!-- 24/7 Contacts Box -->
      <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 10px 14px; box-shadow: 0 2px 5px rgba(0,0,0,0.03);">
        <div style="font-size: 8.8pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 5px; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 3px;">
          24/7 Fieldwork Emergency Contacts &amp; Incident Escalation Tree
        </div>
        <div style="font-size: 8.3pt; line-height: 1.44; color: #1e293b; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div>
            <strong>Base Camp:</strong> Peace Village Hostel (+32 57 226 040)<br>
            <strong>Universal European Emergency:</strong> 112<br>
            <strong>Local Belgian Police (Zone Arro Ieper):</strong> +32 57 230 500<br>
            <strong>British Embassy Brussels (Consular):</strong> +32 2 287 6211
          </div>
          <div>
            <strong>Regional Hospital:</strong> Jan Yperman Ziekenhuis, Briekestraat 12, Ypres (+32 57 353 535)<br>
            <strong>24/7 School Emergency Incident Base:</strong> +44 (0)1329 662182 / 07825 297749<br>
            <strong>Coach Dispatch (Jet Connect):</strong> Operational Operations Lead
          </div>
        </div>
      </div>

      <!-- Terminology Glossary -->
      <div class="context-box" style="padding: 8px 12px;">
        <div class="box-header">Master Tactical &amp; Battlefield Terminology Glossary</div>
        <div style="font-size: 8.2pt; line-height: 1.38; color: #334155; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div>
            <strong>RAP (Regimental Aid Post):</strong> First aid station 200m behind frontline manned by battalion medical officer.<br>
            <strong>ADS (Advanced Dressing Station):</strong> Triage facility 1&ndash;2 miles behind line (e.g. Essex Farm).<br>
            <strong>CCS (Casualty Clearing Station):</strong> Major surgical hospital hub outside artillery range (e.g. Lijssenthoek).<br>
            <strong>Enfilade Fire:</strong> Gunfire directed down the length of a trench, causing devastating casualties.<br>
            <strong>Sap:</strong> Narrow, shallow trench dug forward into No Man's Land for listening or wire maintenance.
          </div>
          <div>
            <strong>Salient:</strong> A battlefield bulge projecting into enemy territory, exposed to artillery fire from three sides.<br>
            <strong>Traverse:</strong> 90-degree earth baffle in a trench containing high-explosive shell fragments.<br>
            <strong>Duckboards:</strong> Wooden slats laid above water sumps to keep soldiers' feet dry.<br>
            <strong>Whizz-Bang:</strong> British slang for high-velocity German 77mm shell that arrived before its sound.<br>
            <strong>Trench Foot:</strong> Fungal rot caused by prolonged immersion in cold, unsanitary water.
          </div>
        </div>
      </div>

      <!-- Flemish Toponyms -->
      <div class="look-fors-box" style="padding: 7px 11px;">
        <div class="box-header">Flemish Toponym Pronunciation &amp; Historical Equivalents</div>
        <div style="font-size: 8.2pt; line-height: 1.38; color: #334155;">
          <strong>Ieper</strong> (Flemish) = <strong>Ypres</strong> (French / British 'Wipers') &middot; 
          <strong>Poperinge</strong> = British 'Pop' &middot; 
          <strong>Mesen</strong> = <strong>Messines</strong> &middot; 
          <strong>Zonnebeke</strong> = Pronounced 'Zon-neh-bay-kuh' &middot; 
          <strong>Diksmuide</strong> = <strong>Dixmude</strong> &middot; 
          <strong>Menen</strong> = <strong>Menin</strong> (destination of the Menin Road).
        </div>
      </div>

      <!-- CWGC Sacred Ground Protocol & Supervisory Roster Grid -->
      <div style="display: grid; grid-template-columns: 1.15fr 1fr; gap: 10px;">
        <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-left: 5px solid #059669; border-radius: 6px; padding: 7px 11px;">
          <div style="font-size: 8.4pt; font-weight: 800; color: #065f46; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 3px;">
            CWGC Sacred Ground Protocol &amp; Pupil Decorum
          </div>
          <p style="font-size: 8.0pt; line-height: 1.32; color: #334155; margin: 0;">
            All CWGC cemeteries and memorials are consecrated international war graves. Pupils must maintain solemn decorum, walking strictly along turf pathways without stepping across headstone borders. Absolute silence is observed during the Menin Gate Last Post ceremony. Fieldwork sketchbooks must be used respectfully at all stops.
          </p>
        </div>

        <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-left: 5px solid #d97706; border-radius: 6px; padding: 7px 11px;">
          <div style="font-size: 8.4pt; font-weight: 800; color: #92400e; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 3px;">
            Coach Logistics &amp; Buddy Supervision
          </div>
          <p style="font-size: 8.0pt; line-height: 1.32; color: #334155; margin: 0;">
            Staff maintain a 1:10 buddy supervision roster. Headcounts are conducted before every coach departure. EU driver tachograph limits are strictly enforced (maximum 4.5 hours continuous driving). Meeting point for separated pupils: Peace Village Hostel reception desk.
          </p>
        </div>
      </div>

      <!-- Dedication Banner -->
      <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 7px; padding: 9px 14px; text-align: center;">
        <div style="font-size: 8.8pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 3px;">
          The History Department &middot; Pilgrimage of Remembrance
        </div>
        <p style="font-size: 8.4pt; color: #1e293b; line-height: 1.38; margin: 0; font-style: italic;">
          "Dedicated to the memory of the fallen of our home parish of Holy Rood and the countless thousands who lie in the quiet earth of Flanders. We will remember them."
        </p>
      </div>

      <!-- Accreditations & Commercial Neutrality Banner -->
      <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 12px; display: flex; justify-content: space-between; align-items: center; font-size: 7.8pt; color: #475569;">
        <span><strong>Publisher:</strong> The History Revision Hub &middot; Complete Commercial Neutrality</span>
        <span><strong>Specification:</strong> Edexcel GCSE History Paper 1 &amp; Key Stage 3</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 16 of 16</span>
    </div>
  </div>
  `;
};
