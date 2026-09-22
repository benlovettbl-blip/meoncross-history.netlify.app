module.exports = function renderPage5(assets) {
  return `
  <!-- ================= PAGE 5: ESSEX FARM ADS ================= -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="school-title">Day 1 &middot; Stop 1: Essex Farm ADS &amp; Canal Bank</div>
        <div class="school-sub">14:30 &middot; Yser Canal Embankment &middot; John McCrae &amp; Valentine Strudwick</div>
      </div>
      <div class="partner-pill">
        <div class="brand">Stop 1</div>
        <div class="lead">Medical ADS</div>
      </div>
    </div>

    <div class="page-body">
      <!-- Pitch -->
      <div class="pitch-box">
        <div class="box-header">60-Second Teacher Pitch: The Story to Tell at Essex Farm</div>
        <p>
          "We are standing outside the concrete medical bunkers carved directly into the Yser Canal bank. In May 1915, during the ferocious Second Battle of Ypres, Dr John McCrae of the Canadian Army Medical Corps worked inside these damp, dark, blood-soaked chambers triaging thousands of casualties blinded and choking from poison gas. On 2 May, an 8-inch high-explosive shell scored a direct hit on his 22-year-old friend and former student, Lieutenant Alexis Helmer, blowing him to pieces. With no chaplain available, McCrae gathered what remained of Helmer in a blanket and buried him at night by lantern light, reciting the prayers by memory. Early the next morning, sitting on the rear step of an ambulance looking out over this bank, McCrae saw wild red field poppies flourishing across the fresh, shell-churned graves&mdash;and penned the world's most famous war poem."
        </p>
      </div>

      <!-- Case Study & Medical Analysis -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div class="context-box" style="border-left: 5px solid #dc2626;">
          <div class="box-header" style="color: #991b1b;">Case Study: Private Valentine Strudwick (Plot I. U. 8)</div>
          <p>
            Enlisted at age 14 after lying about his age; sent to Flanders with the 8th Rifle Brigade. Killed in action on 14 January 1916 aged just <strong>15 years and 11 months</strong>&mdash;one of the youngest British casualties on the Western Front. Point out his mother's moving epitaph: <em>"Not gone from memory, not gone from love, but gone to our Father's home above."</em> Notice the continuous carpet of school poppy crosses left by visiting children.
          </p>
        </div>

        <div class="context-box">
          <div class="box-header">Medical Evacuation Chain at Essex Farm</div>
          <p>
            An Advanced Dressing Station (ADS) was the second tier of the evacuation chain, positioned 1&ndash;2 miles behind the front. Stretcher bearers brought wounded from battalion Regimental Aid Posts (RAPs). Doctors performed emergency triage: bandaging, morphine injections, anti-tetanus serum, and limb splinting before moving patients by motor ambulance to Casualty Clearing Stations (CCS).
          </p>
        </div>
      </div>

      <!-- Look-fors -->
      <div class="look-fors-box">
        <div class="box-header">4 Physical Forensic Look-Fors on Site</div>
        <ul class="look-fors-list">
          <li><strong>Bunker 4 Triage Arch:</strong> Examine the low, damp concrete vaults built into the canal earthwork to shield surgeons and wounded from artillery enfilade.</li>
          <li><strong>Grave of Valentine Strudwick (Plot I. U. 8):</strong> Observe the headstone age ('15') and compare with surrounding comrades in their twenties and thirties.</li>
          <li><strong>Yser Canal Embankment Ridge:</strong> Look at the steep canal bank offering the only natural shielding from German artillery observation on the eastern ridges.</li>
          <li><strong>Memorial Obelisk to John McCrae:</strong> The bronze plaque quoting the poem overlooking the canal where Alexis Helmer was buried in the dark.</li>
        </ul>
      </div>

      <!-- Poem Box -->
      <div class="poem-box" style="padding: 5px 10px;">
        <div class="poem-header">
          <div>
            <span class="poem-title">In Flanders Fields</span>
            <span class="poem-meta">&middot; Lt. Col. John McCrae (Canadian AMC) &middot; 3 May 1915</span>
          </div>
          <img src="${assets.mccraeImg}" alt="John McCrae" style="width: 30px; height: 30px; border-radius: 50%; object-fit: cover; border: 1.2px solid #cbd5e1;">
        </div>
        <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 10px; align-items: start;">
          <div class="poem-lines" style="font-size: 8.2pt; line-height: 1.30;">
In Flanders fields the poppies blow
Between the crosses, row on row,
That mark our place; and in the sky
The larks, still bravely singing, fly
Scarce heard amid the guns below.

We are the Dead. Short days ago
We lived, felt dawn, saw sunset glow,
Loved and were loved, and now we lie,
In Flanders fields.

Take up our quarrel with the foe:
To you from failing hands we throw
The torch; be yours to hold it high.
If ye break faith with us who die
We shall not sleep, though poppies grow
In Flanders fields.
          </div>
          <div style="font-size: 8.1pt; line-height: 1.28; color: #475569; background: #fff; border: 1px solid #e2e8f0; border-radius: 4px; padding: 6px 8px;">
            <strong style="color: #1e293b; display: block; margin-bottom: 2px;">The Red Poppy &amp; Recruitment Symbol:</strong>
            Written on the back step of an ambulance after McCrae buried his young friend Alexis Helmer, the poem personifies the dead speaking to the living. While the first two stanzas lament loss, the final stanza was swiftly adopted by Allied governments to drive enlistment campaigns, demanding that new recruits take up the torch against the foe.
          </div>
        </div>
      </div>

      <!-- Hinge Questions -->
      <div class="hinge-box">
        <div class="box-header">? Targeted Enquiry Hinge Questions</div>
        <p>
          1. "How did McCrae's poem transform a common weed growing in disturbed agricultural soil into a sacred global symbol of remembrance&mdash;and does the final stanza glorify continuous warfare?"
        </p>
        <p>
          2. "What does Valentine Strudwick's grave reveal about the effectiveness of British Army enlistment age checks during the recruiting rush of 1914&ndash;15?"
        </p>
      </div>

      <div class="transit-bar">
        <span>&rarr; <strong>Transit Guidance:</strong> Reboard coach for a 10-minute drive north-east along the Diksmuidseweg to Yorkshire Trench (Boezinge).</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 5 of 16</span>
    </div>
  </div>
  `;
};
