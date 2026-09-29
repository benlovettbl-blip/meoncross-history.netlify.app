module.exports = function renderPage17(assets) {
  return `
  <!-- ================= PAGE 17: LIJSSENTHOEK CEMETERY ================= -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="school-title">Day 2 &middot; Stop 8: Lijssenthoek Military Cemetery &amp; CCS</div>
        <div class="school-sub">14:30 &middot; The Evacuation Chain, 44th Casualty Clearing Station &amp; Nellie Spindler</div>
      </div>
      <div class="partner-pill">
        <div class="brand">Stop 8</div>
        <div class="lead">Hospital Base &amp; CCS</div>
      </div>
    </div>

    <div class="page-body">
      <!-- Pitch -->
      <div class="pitch-box">
        <div class="box-header">The Hospital City in the Hop Fields</div>
        <p>
          "We have moved behind the frontline into the peaceful hop fields of Lijssenthoek. During the war, this was the site of the largest Casualty Clearing Station (CCS) hospital complex in the Salient, housing British 44 CCS, 10 CCS, and later French field hospitals. Positioned directly alongside the Ypres-Poperinge-Hazebrouck railway line, over <strong>300,000 wounded men</strong> passed through this hospital hub. Motor ambulances rushed the severely wounded here from frontline dressing stations. Surgeons operated around the clock in canvas marquees and wooden huts, performing emergency amputations and abdominal surgery before loading stabilized patients onto 30-carriage hospital trains bound for base hospitals on the coast. The <strong>10,755 graves</strong> surrounding us are the men who could not be saved."
        </p>
      </div>

      <!-- Photo & Medical Advancements 2-Col Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1.25fr; gap: 8px; align-items: stretch;">
        <div class="photo-card" style="padding: 4px; display: flex; flex-direction: column; justify-content: space-between; background: #f8fafc;">
          <img src="${assets.xrayFieldHospital}" alt="Mobile X-Ray Field Hospital" style="max-height: 125px; width: auto; max-width: 100%; object-fit: contain; margin: 0 auto; display: block; border-radius: 4px;">
          <div class="caption" style="margin-top: 3px; font-size: 8.6pt; line-height: 1.25;">
            Mobile Field Radiology (1917): X-ray van triaging casualties outside hospital tent.
          </div>
        </div>

        <div class="context-box" style="display: flex; flex-direction: column; justify-content: space-between; padding: 6px 10px;">
          <div>
            <div class="box-header" style="font-size: 9.8pt; margin-bottom: 2px;">Modern Trauma Medicine</div>
            <p style="font-size: 10.2pt; line-height: 1.36; margin-bottom: 3px;">
              Surgeons pioneered the <strong>Carrel-Dakin technique</strong>, continuously irrigating deep shrapnel wounds with sodium hypochlorite antiseptic solution to prevent fatal gas gangrene.
            </p>
            <div class="box-header" style="font-size: 9.8pt; margin-top: 3px; margin-bottom: 2px;">Thomas Splint &amp; Transfusions</div>
            <p style="font-size: 10.2pt; line-height: 1.36;">
              The <strong>Thomas Splint</strong> (1916) pulled compound femur mortality down from 80% to under 20%. Mobile units enabled citrated whole blood transfusions at the operating table.
            </p>
          </div>
        </div>
      </div>

      <!-- Case Study & Triage Protocol Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
        <div class="context-box" style="border-left: 5px solid #0284c7; padding: 6px 10px;">
          <div class="box-header" style="color: #0369a1; font-size: 9.8pt; margin-bottom: 2px;">Case Study: Staff Nurse Nellie Spindler</div>
          <p style="font-size: 10.2pt; line-height: 1.36;">
            Locate <strong>Plot XVI. A. 3</strong> to find 26-year-old Staff Nurse Nellie Spindler (QAIMNS). Operating on casualties on 21 August 1917, a 210mm German shell struck her marquee. She is the <strong>only woman buried among over 10,000 men</strong> here.
          </p>
        </div>

        <div class="context-box" style="padding: 6px 10px;">
          <div class="box-header" style="font-size: 9.8pt; margin-bottom: 2px;">Tripartite Triage Protocol</div>
          <p style="font-size: 10.2pt; line-height: 1.36;">
            Arriving stretcher cases were sorted into three stark categories:
            <br>&bull; <strong>Walking Wounded:</strong> Patched and returned to unit.
            <br>&bull; <strong>Immediate Surgery:</strong> Abdominal &amp; chest cases with hope.
            <br>&bull; <strong>Moribund:</strong> Comfort tents with palliative morphine.
          </p>
        </div>
      </div>

      <!-- Look-fors -->
      <div class="look-fors-box" style="padding: 6px 11px;">
        <div class="box-header">4 Physical Forensic Look-Fors on Site</div>
        <ul class="look-fors-list" style="font-size: 9.8pt; line-height: 1.38;">
          <li><strong>Grave of Staff Nurse Nellie Spindler (Plot XVI. A. 3):</strong> Notice the QAIMNS badge and tributes at her headstone.</li>
          <li><strong>The Visitor Centre Casualty Timeline:</strong> Glass timeline wall correlating daily burials with major offensive peaks.</li>
          <li><strong>Old Railway Siding Alignment:</strong> Trace the wartime trackbed where hospital trains pulled up directly beside tents.</li>
          <li><strong>Allied &amp; Enemy Plots:</strong> Observe French, Belgian, Chinese Labour Corps, and German prisoners buried together.</li>
        </ul>
      </div>

      <!-- Hinge Questions -->
      <div class="hinge-box" style="padding: 6px 11px;">
        <p style="font-size: 10pt; line-height: 1.38;">
          1. "Why were Casualty Clearing Stations positioned along railway spurs just outside field artillery range rather than safe on the coast? What medical gamble did this represent?"
        </p>
        <p style="font-size: 10pt; line-height: 1.38;">
          2. "How does the burial of Staff Nurse Nellie Spindler challenge traditional school textbook narratives concerning gender roles on the Western Front?"
        </p>
      </div>

      <!-- Transit Bar -->
      <div class="transit-bar">
        <span>&rarr; <strong>Transit Guidance:</strong> 20-minute coach transit east to Passchendaele 1917 Memorial Museum in Zonnebeke Chateau.</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 17 of 24</span>
    </div>
  </div>
  `;
};
