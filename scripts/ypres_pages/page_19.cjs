module.exports = function renderPage19(assets) {
  return `
  <!-- ================= PAGE 19: MENIN GATE (SITE & CEREMONY PROTOCOL) ================= -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="school-title">Day 2 &middot; Stop 10: Menin Gate Memorial to the Missing</div>
        <div class="school-sub">19:20 &middot; The Ramparts of Ypres &middot; The Last Post Ceremony &amp; 54,000 Unreturned Dead</div>
      </div>
      <div class="partner-pill">
        <div class="brand">Stop 10</div>
        <div class="lead">The Last Post</div>
      </div>
    </div>

    <div class="page-body">
      <!-- Pitch -->
      <div class="pitch-box">
        <div class="box-header">The Great Hall of Memory</div>
        <p>
          "We are standing beneath the triumphal barrel-vaulted arch of the Menin Gate, designed by Sir Reginald Blomfield and unveiled in 1927. Through this very portal in the ancient ramparts, hundreds of thousands of British and Commonwealth soldiers marched out along the Menin Road towards the frontline trenches—many never to return. Carved into the Portland stone walls are the names of <strong>54,395 Commonwealth soldiers</strong> who died in the Ypres Salient before 16 August 1917 and have no known grave. When Blomfield designed the memorial, he believed the vast arch could accommodate every missing man; to the horror of the Imperial War Graves Commission, space ran out, forcing the remaining 34,984 names of later casualties to be carved at Tyne Cot. Every evening at exactly 20:00, the local volunteer Fire Brigade buglers sound the Last Post in solemn gratitude. Tonight, our school laying party lays our official wreath."
        </p>
      </div>

      <!-- Photo Card -->
      <div class="photo-card" style="padding: 5px;">
        <img src="${assets.meninGate}" alt="Menin Gate Memorial" style="height: 165px; object-fit: cover;">
        <div class="caption">
          The Menin Gate Memorial on the eastern ramparts of Ypres: Blomfield's classical triumphal arch inscribed with 54,000 names of the missing.
        </div>
      </div>

      <!-- Local Parish Search & Ceremony Protocol 2-Col Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div class="context-box">
          <div class="box-header">Local Parish Search: Panel 35</div>
          <p>
            Lead pupils along the south interior staircase to <strong>Panel 35 (Hampshire Regiment)</strong>. Here are carved the names of two young men from our home parish: <strong>Pte. Thomas Franklin</strong> (age 23, killed during Second Ypres) and <strong>Pte. William Ayling</strong> (age 20, killed by a trench mortar at Potijze). Have designated pupils hold our wreath reverently until 19:55.
          </p>
        </div>

        <div class="context-box">
          <div class="box-header">Ceremony Conduct &amp; Silence Protocol</div>
          <p>
            The Last Post ceremony attracts thousands of international pilgrims. Pupils assemble on the north pavement by 19:20. Instruct pupils that absolute silence must be observed from 19:55 until bugles conclude. All heads uncovered, phones silent, and eyes directed towards the central vault.
          </p>
        </div>
      </div>

      <!-- Look-fors -->
      <div class="look-fors-box">
        <div class="box-header">4 Physical Forensic Look-Fors on Site</div>
        <ul class="look-fors-list">
          <li><strong>Panel 35 (Hampshire Regiment):</strong> Trace the carved names of our parish boys Thomas Franklin and William Ayling.</li>
          <li><strong>The Couchant Lion Statues:</strong> The sculpted British lions guarding the eastern and western facades looking toward the battlefields.</li>
          <li><strong>1940 Shrapnel &amp; Bullet Scars:</strong> Examine the stone pillars for bullet damage sustained during the May 1940 British rearguard stand.</li>
          <li><strong>Acoustic Vault Resonance:</strong> Listen to the extraordinary reverberation of the bugle notes beneath the 130-foot stone arch.</li>
        </ul>
      </div>

      <!-- Field Directive -->
      <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 7px; padding: 8px 13px;">
        <div style="font-size: 9.6pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
          Tour Leader Field Directive: Wreath Laying Assembly
        </div>
        <p style="font-size: 10.2pt; color: #1e293b; line-height: 1.42; margin: 0;">
          At 19:45, escort the two student wreath bearers to the inner police barrier. Accompanying staff supervise pupil lines on the pavement. Review Sassoon's anti-monument critique on the facing page during transit.
        </p>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 19 of 24</span>
    </div>
  </div>
  `;
};
