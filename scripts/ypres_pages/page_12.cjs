module.exports = function renderPage12(assets) {
  return `
  <!-- ================= PAGE 12: LIJSSENTHOEK CEMETERY ================= -->
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
      <div class="pitch-box" style="padding: 7px 11px;">
        <div class="box-header">60-Second Teacher Pitch: The Hospital City in the Hop Fields</div>
        <p>
          "We have moved behind the frontline into the peaceful hop fields of Lijssenthoek. During the war, this was the site of the largest Casualty Clearing Station (CCS) hospital complex in the Salient, housing British 44 CCS, 10 CCS, and later French field hospitals. Positioned directly alongside the Ypres-Poperinge-Hazebrouck railway line, over <strong>300,000 wounded men</strong> passed through this hospital hub. Motor ambulances rushed the severely wounded here from frontline dressing stations. Surgeons operated around the clock in canvas marquees and wooden huts, performing emergency amputations and abdominal surgery before loading stabilized patients onto 30-carriage hospital trains bound for base hospitals in Boulogne and Le Havre. The <strong>10,755 graves</strong> surrounding us are the men who could not be saved."
        </p>
      </div>

      <!-- Photo & Medical Advancements 2-Col Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1.25fr; gap: 10px; align-items: stretch;">
        <div class="photo-card" style="padding: 4px; display: flex; flex-direction: column; justify-content: space-between;">
          <img src="${assets.xrayFieldHospital}" alt="Mobile X-Ray Field Hospital" style="height: 125px; object-fit: cover; border-radius: 3px;">
          <div class="caption">
            Mobile Field Radiology (1917): X-ray van and operating table triaging wounded outside a hospital tent.
          </div>
        </div>

        <div class="context-box" style="display: flex; flex-direction: column; justify-content: space-between; padding: 6px 11px;">
          <div>
            <div class="box-header">Crucible of Modern Trauma Medicine</div>
            <p style="font-size: 8.3pt; line-height: 1.32; margin-bottom: 4px;">
              Surgeons at Lijssenthoek pioneered the <strong>Carrel-Dakin technique</strong>, continuously irrigating deep, ragged shrapnel wounds with sodium hypochlorite antiseptic solution to prevent fatal gas gangrene.
            </p>
            <div class="box-header" style="margin-top: 4px;">The Thomas Splint &amp; Transfusion Revolution</div>
            <p style="font-size: 8.3pt; line-height: 1.32;">
              The introduction of the <strong>Thomas Splint</strong> in 1916 pulled compound fracture femur mortality down from 80% to under 20%. Mobile refrigeration units enabled citrated whole blood transfusions directly at the operating table.
            </p>
          </div>
        </div>
      </div>

      <!-- Case Study & Triage Protocol Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div class="context-box" style="border-left: 5px solid #0284c7; padding: 6px 11px;">
          <div class="box-header" style="color: #0369a1;">Case Study: Staff Nurse Nellie Spindler (Plot XVI. A. 3)</div>
          <p style="font-size: 8.3pt; line-height: 1.32;">
            Locate <strong>Plot XVI. A. 3</strong> to find 26-year-old Staff Nurse Nellie Spindler (QAIMNS). A specialist in abdominal wounds from Wakefield, Spindler was operating on casualties on 21 August 1917 when a German long-range 210mm high-explosive shell struck the hospital marquee, mortally wounding her. She died in the matron's arms and was buried with full military honours&mdash;the <strong>only woman buried among over 10,000 men</strong> here.
          </p>
        </div>

        <div class="context-box" style="padding: 6px 11px;">
          <div class="box-header">The Ruthless Tripartite Triage Protocol</div>
          <p style="font-size: 8.3pt; line-height: 1.32;">
            Arriving stretcher bearers were sorted instantly by experienced Medical Officers into three stark categories:
            <br>&bull; <strong>Walking Wounded:</strong> Minor flesh injuries; patched and sent back to duty.
            <br>&bull; <strong>Immediate Surgery:</strong> Abdominal trauma, head injuries, chest wounds with hope.
            <br>&bull; <strong>Moribund:</strong> Hopeless cases; placed in comfort tents with palliative morphine.
          </p>
        </div>
      </div>

      <!-- Look-fors -->
      <div class="look-fors-box" style="padding: 6px 11px;">
        <div class="box-header">4 Physical Forensic Look-Fors on Site</div>
        <ul class="look-fors-list" style="font-size: 8.3pt; line-height: 1.32;">
          <li><strong>Grave of Staff Nurse Nellie Spindler (Plot XVI. A. 3):</strong> Notice the QAIMNS badge and floral tributes left at her headstone.</li>
          <li><strong>The Visitor Centre Casualty Timeline:</strong> Examine the glass timeline wall correlating daily burials with specific offensive battles (Third Ypres peaks).</li>
          <li><strong>Old Railway Siding Alignment:</strong> Trace the path of the wartime trackbed where hospital trains pulled up directly beside the hospital tents.</li>
          <li><strong>Allied &amp; Enemy Plots:</strong> Observe the French, Belgian, Chinese Labour Corps, and German prisoners buried alongside Commonwealth troops.</li>
        </ul>
      </div>

      <!-- Hinge Questions -->
      <div class="hinge-box" style="padding: 6px 11px;">
        <div class="box-header">? Targeted Enquiry Hinge Questions</div>
        <p>
          1. "Why were Casualty Clearing Stations positioned along railway spurs just outside field artillery range rather than safe on the French coast? What medical gamble did this represent?"
        </p>
        <p>
          2. "How does the burial of Staff Nurse Nellie Spindler challenge traditional school textbook narratives concerning gender roles and the physical dangers of the Western Front?"
        </p>
      </div>

      <div class="transit-bar">
        <span>&rarr; <strong>Transit Guidance:</strong> 20-minute coach transit east to Passchendaele 1917 Memorial Museum in Zonnebeke Chateau.</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 12 of 16</span>
    </div>
  </div>
  `;
};
