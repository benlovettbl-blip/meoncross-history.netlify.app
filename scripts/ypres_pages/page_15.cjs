module.exports = function renderPage15(assets) {
  return `
  <!-- ================= PAGE 15: DAY 3 STOPS ================= -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="school-title">Day 3 &middot; Stops 11, 12, 13: Rebirth, Haven &amp; Justice</div>
        <div class="school-sub">Ypres Cloth Hall, Talbot House (Poperinge) &amp; The Execution Cells</div>
      </div>
      <div class="partner-pill">
        <div class="brand">Stops 11&ndash;13</div>
        <div class="lead">Civic Rebirth &amp; Toc H</div>
      </div>
    </div>

    <div class="page-body">
      <!-- Dual Photo Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div class="photo-card" style="padding: 4px;">
          <img src="${assets.clothHallRestored}" alt="Ypres Cloth Hall Restored" style="height: 120px; object-fit: cover;">
          <div class="caption">
            Ypres Cloth Hall: Rebuilt stone-by-stone from medieval blueprints (1928&ndash;1967).
          </div>
        </div>
        <div class="photo-card" style="padding: 4px;">
          <img src="${assets.talbotHouse}" alt="Talbot House Poperinge" style="height: 120px; object-fit: cover;">
          <div class="caption">
            Talbot House ('Toc H'), Poperinge: The everyman rest sanctuary for all ranks.
          </div>
        </div>
      </div>

      <!-- Stop 11: Cloth Hall -->
      <div class="context-box" style="padding: 6px 11px;">
        <div class="box-header">Stop 11: Ypres Cloth Hall &amp; Grote Markt (Civic Rebirth)</div>
        <p style="font-size: 8.3pt; line-height: 1.32;">
          In 1914, Ypres' 13th-century Cloth Hall was reduced to a blackened stump by German incendiary shells. Winston Churchill argued the entire city should be preserved as a permanent ruin as a memorial to British sacrifice. The Belgian citizens fiercely rejected this, choosing to rebuild their city stone by stone from original medieval blueprints in an epic 50-year restoration. Notice the blend of original scorched stones and reconstructed limestone.
        </p>
      </div>

      <!-- Stop 12: Talbot House -->
      <div class="pitch-box" style="padding: 7px 11px;">
        <div class="box-header">Stop 12: Talbot House ("Toc H"), Poperinge &mdash; The Everyman Sanctuary</div>
        <p style="font-size: 8.3pt; line-height: 1.32;">
          "In late 1915, Army Chaplain Rev. Philip 'Tubby' Clayton opened this four-story townhouse as a rest house for soldiers in Poperinge ('Pop'), the bustling railhead six miles behind the front. Clayton established an extraordinary, revolutionary rule: <em>'All rank abandon ye who enter here.'</em> Inside, generals and teenage privates drank tea together, played piano, read books in the peaceful garden, and checked their weapons at the door. Up in the attic hop-loft, Tubby built a chapel where a simple carpenter's workbench served as the altar. In an army strictly segregated by class and military discipline, Talbot House provided humanity, laughter, and spiritual refuge."
        </p>
      </div>

      <!-- Stop 13: Poperinge Death Cells -->
      <div class="context-box" style="border-left: 5px solid #dc2626; padding: 6px 11px;">
        <div class="box-header" style="color: #991b1b;">Stop 13: Poperinge Town Hall Execution Cells &amp; Shot at Dawn</div>
        <p style="font-size: 8.3pt; line-height: 1.32;">
          In the courtyard of Poperinge Town Hall stand the preserved execution cells and wooden post where soldiers condemned by British Court Martial were executed by firing squad. Across the war, <strong>306 British and Commonwealth soldiers</strong> were executed for desertion or cowardice. Most were suffering from severe combat fatigue and shell shock (PTSD), then unrecognised as a medical illness. In 2006, the British government granted a statutory pardon to all 306 men, recognising their tragic plight.
        </p>
      </div>

      <!-- Poem & Analysis Grid -->
      <div class="poem-box" style="padding: 6px 11px;">
        <div class="poem-header">
          <div>
            <span class="poem-title">The Soldier</span>
            <span class="poem-meta">&middot; Rupert Brooke (Written 1914 &mdash; The Georgian Ideal)</span>
          </div>
          <img src="${assets.brookeImg}" alt="Rupert Brooke" style="width: 30px; height: 30px; border-radius: 50%; object-fit: cover; border: 1.2px solid #cbd5e1;">
        </div>
        <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 10px; align-items: start;">
          <div class="poem-lines" style="font-size: 8.1pt; line-height: 1.26;">
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
          <div style="font-size: 8.1pt; line-height: 1.28; color: #475569; background: #fff; border: 1px solid #e2e8f0; border-radius: 4px; padding: 6px 8px;">
            <strong style="color: #1e293b; display: block; margin-bottom: 2px;">The 1914 Romantic Arc vs 1917 Reality:</strong>
            Brooke captured the innocent, patriotic idealism of August 1914 before the mechanized slaughter of the Western Front shattered Victorian illusions. Contrast Brooke's gentle "English heaven" with Owen's choking "green sea" at Vancouver Corner or Sassoon's fury at the Menin Gate.
          </div>
        </div>
      </div>

      <!-- Hinge Questions -->
      <div class="hinge-box" style="padding: 5px 10px;">
        <div class="box-header">? Targeted Enquiry Hinge Questions</div>
        <p>
          1. "How did Talbot House's deliberate abolition of military hierarchy provide psychological survival for frontline soldiers, and why did high command tolerate it?"
        </p>
        <p>
          2. "Was the execution of soldiers suffering from acute shell shock a military necessity to maintain combat discipline, or a tragic failure of medical understanding?"
        </p>
      </div>

      <div class="transit-bar">
        <span>&rarr; <strong>Expedition Conclusion:</strong> Depart Poperinge at 14:30 for Calais Eurotunnel (17:50 crossing); return to school approx. 20:00.</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 15 of 16</span>
    </div>
  </div>
  `;
};
