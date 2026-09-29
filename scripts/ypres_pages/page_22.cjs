module.exports = function renderPage22(assets) {
  return `
  <!-- ================= PAGE 22: DAY 3 (DEATH CELLS & RUPERT BROOKE) ================= -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="school-title">Day 3 &middot; Stop 13: Military Justice &amp; Final Reflection</div>
        <div class="school-sub">Poperinge Death Cells, Shot at Dawn &amp; Rupert Brooke's 1914 Ideal</div>
      </div>
      <div class="partner-pill">
        <div class="brand">Stop 13</div>
        <div class="lead">Justice &amp; Reflection</div>
      </div>
    </div>

    <div class="page-body">
      <!-- Stop 13: Death Cells Context -->
      <div class="context-box" style="border-left: 5.5px solid #dc2626;">
        <div class="box-header" style="color: #991b1b;">Stop 13: Poperinge Town Hall Execution Cells &amp; Shot at Dawn</div>
        <p>
          In the quiet courtyard of Poperinge Town Hall stand the preserved execution cells and wooden post where soldiers condemned by British Court Martial were executed by firing squad at dawn. Across the war, <strong>306 British and Commonwealth soldiers</strong> were shot for desertion or cowardice. Most were young men suffering from severe combat fatigue and shell shock (PTSD), then unrecognised by military authorities as a legitimate psychiatric illness. In 2006, the British government passed a historic statutory pardon for all 306 men, formally acknowledging their tragic plight.
        </p>
      </div>

      <!-- Poem Box -->
      <div class="poem-box">
        <div class="poem-header">
          <div>
            <span class="poem-title">The Soldier</span>
            <span class="poem-meta">&middot; Rupert Brooke (Written 1914 &mdash; The Georgian Ideal)</span>
          </div>
          <img src="${assets.brookeImg}" alt="Rupert Brooke" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 1.5px solid #cbd5e1;">
        </div>

        <div style="display: grid; grid-template-columns: 1.25fr 1fr; gap: 14px; align-items: start;">
          <div class="poem-lines" style="font-size: 11pt; line-height: 1.44;">
If I should die, think only this of me:
  That there's some corner of a foreign field
  That is for ever England. There shall be
In that rich earth a richer dust concealed;
A dust whom England bore, shaped, made aware,
  Gave, once, her flowers to love, her ways to roam;
A body of England's, breathing English air,
  Washed by the rivers, blest by suns of home.

And think, this heart, all evil shed away,
  A pulse in the eternal mind, no less
    Gives somewhere back the thoughts by England given;
Her sights and sounds; dreams happy as her day;
  And laughter, learnt of friends; and gentleness,
    In hearts at peace, under an English heaven.
          </div>

          <div style="font-size: 10pt; line-height: 1.42; color: #475569; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px 12px;">
            <strong style="color: #1e293b; display: block; font-size: 10.4pt; margin-bottom: 4px;">The 1914 Romantic Arc vs 1917 Reality:</strong>
            Rupert Brooke captured the innocent, patriotic idealism of August 1914 before the mechanized slaughter of the Western Front shattered Victorian illusions.<br><br>
            Have pupils contrast Brooke's gentle, pastoral "English heaven" with Wilfred Owen's choking "green sea" at Vancouver Corner, Isaac Rosenberg's sardonic rat, and Siegfried Sassoon's fury at the Menin Gate.
          </div>
        </div>
      </div>

      <!-- Hinge Questions -->
      <div class="hinge-box">
        <p>
          1. "Was the execution of soldiers suffering from acute shell shock a military necessity to maintain combat discipline, or a tragic failure of medical compassion?"
        </p>
        <p>
          2. "How did the collective memory of the Great War shift from Rupert Brooke's romantic sacrifice (1914) to Wilfred Owen and Siegfried Sassoon's bitter disillusionment (1917–1927)?"
        </p>
      </div>

      <!-- Transit Bar -->
      <div class="transit-bar">
        <span>&rarr; <strong>Expedition Conclusion:</strong> Depart Poperinge at 14:30 for Calais Eurotunnel (17:50 crossing); return to school base approx. 20:00.</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 22 of 24</span>
    </div>
  </div>
  `;
};
