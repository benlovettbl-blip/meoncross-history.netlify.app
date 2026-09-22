module.exports = function renderPage14(assets) {
  return `
  <!-- ================= PAGE 14: MENIN GATE MEMORIAL ================= -->
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
        <div class="box-header">60-Second Teacher Pitch: The Great Hall of Memory</div>
        <p>
          "We are standing beneath the triumphal barrel-vaulted arch of the Menin Gate, designed by Sir Reginald Blomfield and unveiled in 1927. Through this very portal in the ancient ramparts, hundreds of thousands of British and Commonwealth soldiers marched out along the Menin Road towards the frontline trenches—many never to return. Carved into the Portland stone walls are the names of <strong>54,395 Commonwealth soldiers</strong> who died in the Ypres Salient before 16 August 1917 and have no known grave. When Blomfield designed the memorial, he believed the vast arch could accommodate every missing man; to the horror of the Imperial War Graves Commission, space ran out, forcing the remaining 34,984 names of later casualties to be carved at Tyne Cot. Every evening at exactly 20:00, the local volunteer Fire Brigade buglers sound the Last Post in solemn gratitude. Tonight, our school laying party lays our official wreath."
        </p>
      </div>

      <!-- Photo Card -->
      <div class="photo-card" style="padding: 4px;">
        <img src="${assets.meninGate}" alt="Menin Gate Memorial" style="height: 140px; object-fit: cover;">
        <div class="caption">
          The Menin Gate Memorial on the eastern ramparts of Ypres: Blomfield's classical triumphal arch inscribed with 54,000 names of the missing.
        </div>
      </div>

      <!-- Local Parish Search & Protocol -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div class="context-box" style="padding: 6px 11px;">
          <div class="box-header">Local Parish Search: Panel 35</div>
          <p style="font-size: 8.4pt; line-height: 1.34;">
            Lead pupils along the south interior staircase to <strong>Panel 35 (Hampshire Regiment)</strong>. Here are carved the names of two young men from our home parish: <strong>Pte. Thomas Franklin</strong> (age 23, killed during Second Ypres) and <strong>Pte. William Ayling</strong> (age 20, killed by a trench mortar at Potijze). Have designated pupils hold our wreath reverently until 19:55.
          </p>
        </div>

        <div class="context-box" style="padding: 6px 11px;">
          <div class="box-header">Ceremony Conduct &amp; Silence Protocol</div>
          <p style="font-size: 8.4pt; line-height: 1.34;">
            The Last Post ceremony attracts thousands of international pilgrims. Pupils assemble on the north pavement by 19:20. Instruct pupils that absolute silence must be observed from 19:55 until bugles conclude. All heads uncovered, phones silent, and eyes directed towards the central vault.
          </p>
        </div>
      </div>

      <!-- Look-fors -->
      <div class="look-fors-box" style="padding: 6px 11px;">
        <div class="box-header">4 Physical Forensic Look-Fors on Site</div>
        <ul class="look-fors-list" style="font-size: 8.4pt; line-height: 1.34;">
          <li><strong>Panel 35 (Hampshire Regiment):</strong> Trace the carved names of our parish boys Thomas Franklin and William Ayling.</li>
          <li><strong>The Couchant Lion Statues:</strong> The sculpted British lions guarding the eastern and western facades looking toward the battlefields.</li>
          <li><strong>1940 Shrapnel &amp; Bullet Scars:</strong> Examine the stone pillars for bullet damage sustained during the May 1940 stand.</li>
          <li><strong>Acoustic Vault Resonance:</strong> Listen to the extraordinary reverberation of the bugle notes beneath the 130-foot stone arch.</li>
        </ul>
      </div>

      <!-- Poem Box -->
      <div class="poem-box" style="padding: 6px 11px;">
        <div class="poem-header">
          <div>
            <span class="poem-title">On Passing the New Menin Gate</span>
            <span class="poem-meta">&middot; Siegfried Sassoon (1927)</span>
          </div>
          <img src="${assets.sassoonImg}" alt="Siegfried Sassoon" style="width: 30px; height: 30px; border-radius: 50%; object-fit: cover; border: 1.2px solid #cbd5e1;">
        </div>
        <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 10px; align-items: start;">
          <div class="poem-lines" style="font-size: 8.2pt; line-height: 1.28;">
Who will remember, passing through this Gate,
The unheroic Dead who fed the guns?
Who shall absolve the foulness of their fate,&mdash;
Those doomed, conscripted, unvictorious ones?
Crudely renewed, the Salient holds its own.
Paid are its dim defenders by this pomp;

Here was the world’s worst wound. And here with pride
‘Their name liveth for evermore’ the Gateway claims.
Was ever an immolation so belied
As these intolerably nameless names?
Well might the Dead who struggled in the slime
Rise and deride this sepulchre of crime.
          </div>
          <div style="font-size: 8.1pt; line-height: 1.28; color: #475569; background: #fff; border: 1px solid #e2e8f0; border-radius: 4px; padding: 6px 8px;">
            <strong style="color: #1e293b; display: block; margin-bottom: 2px;">The Anti-Monument Critique:</strong>
            Attending the opening of the Menin Gate in July 1927, Sassoon was horrified by the imperial pomp and triumphalism. He condemned the Portland arch as an attempt by the British political establishment to whitewash the industrial slaughter of conscripts, urging students to contrast official architectural commemoration with frontline reality.
          </div>
        </div>
      </div>

      <!-- Hinge Questions -->
      <div class="hinge-box">
        <div class="box-header">? Targeted Enquiry Hinge Questions</div>
        <p>
          1. "Why was Siegfried Sassoon so bitterly enraged by Blomfield's grand classical arch, dismissing it as a 'sepulchre of crime'? Is his critique justified?"
        </p>
        <p>
          2. "What is the cultural and moral significance of the town of Ypres maintaining the Last Post ceremony every single evening for nearly a century?"
        </p>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 14 of 16</span>
    </div>
  </div>
  `;
};
