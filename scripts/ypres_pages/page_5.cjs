module.exports = function renderPage5(assets) {
  return `
  <!-- ================= PAGE 5: ESSEX FARM ADS (SITE & LOOK-FORS) ================= -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="school-title">Day 1 &middot; Stop 1: Essex Farm ADS &amp; Canal Bank</div>
        <div class="school-sub">14:30 &middot; Yser Canal Embankment &middot; Medical Evacuation Chain &amp; Valentine Strudwick</div>
      </div>
      <div class="partner-pill">
        <div class="brand">Stop 1</div>
        <div class="lead">Medical ADS</div>
      </div>
    </div>

    <div class="page-body" style="display: flex; flex-direction: column; justify-content: space-between; gap: 10px;">
      <!-- Pitch (Prefix removed as per Audio 4) -->
      <div class="pitch-box">
        <div class="box-header">The Story to Tell at Essex Farm</div>
        <p style="font-size: 10.4pt; line-height: 1.48; color: #0f172a;">
          "We are standing outside the concrete medical bunkers carved directly into the Yser Canal bank. In May 1915, during the ferocious Second Battle of Ypres, Dr John McCrae of the Canadian Army Medical Corps worked inside these damp, dark, blood-soaked chambers triaging thousands of casualties blinded and choking from poison gas. On 2 May, an 8-inch high-explosive shell scored a direct hit on his 22-year-old friend and former student, Lieutenant Alexis Helmer, blowing him to pieces. With no chaplain available, McCrae gathered what remained of Helmer in a blanket and buried him at night by lantern light, reciting the prayers by memory. Early the next morning, sitting on the rear step of an ambulance looking out over this bank, McCrae saw wild red field poppies flourishing across the fresh, shell-churned graves&mdash;and penned the world's most famous war poem."
        </p>
      </div>

      <!-- Case Study & Medical Evacuation 2-Col Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <div class="context-box" style="border-left: 5px solid #dc2626; padding: 10px 14px;">
          <div class="box-header" style="color: #991b1b; font-size: 10.2pt;">Case Study: Private Valentine Strudwick (Plot I. U. 8)</div>
          <p style="font-size: 10pt; line-height: 1.44; color: #334155; margin: 0;">
            Enlisted at age 14 after lying about his age; sent to Flanders with the 8th Rifle Brigade. Killed in action on 14 January 1916 aged just <strong>15 years and 11 months</strong>&mdash;one of the youngest British casualties on the Western Front. Point out his mother's moving epitaph: <em>"Not gone from memory, not gone from love, but gone to our Father's home above."</em> Notice the continuous carpet of school poppy crosses left by visiting children.
          </p>
        </div>

        <div class="context-box" style="padding: 10px 14px;">
          <div class="box-header" style="font-size: 10.2pt;">Medical Evacuation Chain at Essex Farm</div>
          <p style="font-size: 10pt; line-height: 1.44; color: #334155; margin: 0;">
            An Advanced Dressing Station (ADS) was the second tier of the evacuation chain, positioned 1&ndash;2 miles behind the front line. Stretcher bearers brought wounded from battalion Regimental Aid Posts (RAPs). Doctors performed emergency triage: bandaging, morphine injections, anti-tetanus serum, and limb splinting before moving patients by motor ambulance to Casualty Clearing Stations (CCS).
          </p>
        </div>
      </div>

      <!-- Look-fors -->
      <div class="look-fors-box" style="padding: 12px 16px;">
        <div class="box-header" style="font-size: 10.2pt; margin-bottom: 6px;">4 Physical Forensic Look-Fors on Site</div>
        <ul class="look-fors-list" style="font-size: 10pt; line-height: 1.46;">
          <li><strong>Bunker 4 Triage Arch:</strong> Examine the low, damp concrete vaults built into the canal earthwork to shield surgeons and wounded from artillery enfilade.</li>
          <li><strong>Grave of Valentine Strudwick (Plot I. U. 8):</strong> Observe the headstone age ('15') and compare with surrounding comrades in their twenties and thirties.</li>
          <li><strong>Yser Canal Embankment Ridge:</strong> Look at the steep canal bank offering the only natural shielding from German artillery observation on the eastern ridges.</li>
          <li><strong>Memorial Obelisk to John McCrae:</strong> The bronze plaque quoting the poem overlooking the canal where Alexis Helmer was buried in the dark.</li>
        </ul>
      </div>

      <!-- On-Site Field Guidance (Journal task removed as per Audio 7 & 8) -->
      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-left: 5px solid #1e3a8a; border-radius: 7px; padding: 10px 14px;">
        <div style="font-size: 9.8pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 3px;">
          Tour Leader Field Note: Gathering at Bunker 4
        </div>
        <p style="font-size: 10pt; color: #334155; line-height: 1.44; margin: 0;">
          Gather the party outside Bunker 4 where John McCrae operated. Explain how wounded were carried down the canal bank under artillery fire before directing pupils to locate Valentine Strudwick's headstone. Proceed to the bronze McCrae memorial obelisk for the reading on the facing page.
        </p>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department &middot; Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 5 of 24</span>
    </div>
  </div>
  `;
};
