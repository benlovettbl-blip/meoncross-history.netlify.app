module.exports = function renderPage7(assets) {
  return `
  <!-- ================= PAGE 7: LANGEMARCK GERMAN CEMETERY ================= -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="school-title">Day 1 &middot; Stop 3: Langemarck German Military Cemetery</div>
        <div class="school-sub">16:00 &middot; The Student Cemetery, Kameradengrab &amp; Emil Krieger Statues</div>
      </div>
      <div class="partner-pill">
        <div class="brand">Stop 3</div>
        <div class="lead">German Cemetery</div>
      </div>
    </div>

    <div class="page-body">
      <!-- Pitch -->
      <div class="pitch-box">
        <div class="box-header">60-Second Teacher Pitch: The Myth of the Kindermord</div>
        <p>
          "Step through the heavy red granite blockhouse and notice the instant, somber change of atmosphere: dark oak trees, flat black basalt slabs lying flush with the lawn, and no white Portland crosses. This is Langemarck, known across Germany as the <em>Studentenfriedhof</em> ('Student Cemetery'). In October 1914, during the First Battle of Ypres, thousands of idealistic German schoolboy and university volunteers were thrown into battle here with barely six weeks of drill. German wartime propaganda claimed they linked arms and charged singing the <em>Deutschlandlied</em> ('Song of Germany') before being mown down by experienced British regular rifle fire in what became mythologized as the <em>Kindermord bei Ypern</em> ('Massacre of the Innocents'). In June 1940, Adolf Hitler&mdash;who fought here as a corporal in the 16th Bavarian Reserve Regiment&mdash;visited this site to exploit the dead for Nazi propaganda."
        </p>
      </div>

      <!-- Architectural Contrast -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div class="context-box">
          <div class="box-header">Architectural &amp; Theological Contrast</div>
          <p>
            Unlike the luminous, hopeful white Portland stone and manicured flower borders of British CWGC cemeteries, German memorial philosophy under the <em>Volksbund Deutsche Kriegsgr&auml;berf&uuml;rsorge</em> is austere, melancholic, and deeply rooted in Germanic forest romanticism. Over 44,000 soldiers lie buried in this small compound&mdash;nearly four times the density of Tyne Cot.
          </p>
        </div>

        <div class="context-box">
          <div class="box-header">The Kameradengrab (Comrades' Grave)</div>
          <p>
            Immediately past the entrance lies the <em>Kameradengrab</em>&mdash;a single mass grave containing the remains of <strong>24,917 German soldiers</strong> whose bodies could not be individually identified. Bronze panels surrounding the plot record thousands of names alphabetically, including flying ace Werner Voss and young university students from Munich, Heidelberg, and Berlin.
          </p>
        </div>
      </div>

      <!-- Look-fors -->
      <div class="look-fors-box">
        <div class="box-header">4 Physical Forensic Look-Fors on Site</div>
        <ul class="look-fors-list">
          <li><strong>The Kameradengrab Bronze Wall:</strong> Trace the perimeter panels surrounding the central mass grave of 24,917 unidentified soldiers.</li>
          <li><strong>Flat Basalt Group Slabs:</strong> Notice that each small basalt ground slab marks the resting place of up to 20 soldiers lying together beneath the lawn.</li>
          <li><strong>Emil Krieger Mourning Bronzes:</strong> The four life-sized silhouette bronze soldiers standing at the cemetery's rear, their heads bowed in eternal grief.</li>
          <li><strong>Preserved German Pillbox Concrete:</strong> Three reinforced concrete pillboxes from the 1917 Langemarck Gneisenau line integrated into the perimeter.</li>
        </ul>
      </div>

      <!-- Poem Box -->
      <div class="poem-box" style="padding: 5px 10px;">
        <div class="poem-header">
          <div>
            <span class="poem-title">When You See Millions of the Mouthless Dead</span>
            <span class="poem-meta">&middot; Charles Hamilton Sorley (Killed at Loos, Oct 1915, Age 20)</span>
          </div>
          <img src="${assets.sorleyImg}" alt="Charles Sorley" style="width: 30px; height: 30px; border-radius: 50%; object-fit: cover; border: 1.2px solid #cbd5e1;">
        </div>
        <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 10px; align-items: start;">
          <div class="poem-lines" style="font-size: 8.2pt; line-height: 1.30;">
When you see millions of the mouthless dead
Across your dreams in pale battalions go,
Say not soft things as other men have said,
That you'll remember. For you need not so.
Give them not praise. For, deaf, how should they know
It is not curses heaped on each gashed head?
Nor tears. Their blind eyes see not your tears flow.
Nor honour. It is easy to be dead.
Say only this, “They are dead.” Then add thereto,
“Yet many a better one has died than you.”
          </div>
          <div style="font-size: 8.1pt; line-height: 1.28; color: #475569; background: #fff; border: 1px solid #e2e8f0; border-radius: 4px; padding: 6px 8px;">
            <strong style="color: #1e293b; display: block; margin-bottom: 2px;">The Refusal of Sentimentalism:</strong>
            Discovered in Sorley's field kit after he was killed at Loos aged 20, this austere sonnet refuses to sanitize mass slaughter with euphemisms of glory or honour. Standing at Langemarck before the 25,000 dead in the single mass Kameradengrab, Sorley's words demand that we confront the absolute finality and senselessness of industrial annihilation.
          </div>
        </div>
      </div>

      <!-- Hinge Questions -->
      <div class="hinge-box">
        <div class="box-header">? Targeted Enquiry Hinge Questions</div>
        <p>
          1. "Why did the German state choose dark basalt, mass graves, and somber oak trees rather than individual white headstones? How does this reflect differing national psychologies of grief between victor and vanquished?"
        </p>
        <p>
          2. "How does Charles Sorley's poem dismantle patriotic war rhetoric when read standing before 25,000 unidentified German dead in the Kameradengrab?"
        </p>
      </div>

      <div class="transit-bar">
        <span>&rarr; <strong>Transit Guidance:</strong> 20-minute coach transit south-east around the Ypres ring road to Hooge Crater Museum on the Menin Road.</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 7 of 16</span>
    </div>
  </div>
  `;
};
