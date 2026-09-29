module.exports = function renderPage8(assets) {
  return `
  <!-- ================= PAGE 8: LANGEMARCK GERMAN CEMETERY (SITE & LOOK-FORS) ================= -->
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
        <div class="box-header">The Myth of the Kindermord</div>
        <p>
          "Step through the heavy red granite blockhouse and notice the instant, somber change of atmosphere: dark oak trees, flat black basalt slabs lying flush with the lawn, and no white Portland crosses. This is Langemarck, known across Germany as the <em>Studentenfriedhof</em> ('Student Cemetery'). In October 1914, during the First Battle of Ypres, thousands of idealistic German schoolboy and university volunteers were thrown into battle here with barely six weeks of drill. German wartime propaganda claimed they linked arms and charged singing the <em>Deutschlandlied</em> ('Song of Germany') before being mown down by experienced British regular rifle fire in what became mythologized as the <em>Kindermord bei Ypern</em> ('Massacre of the Innocents'). In June 1940, Adolf Hitler&mdash;who fought here as a corporal in the 16th Bavarian Reserve Regiment&mdash;visited this site to exploit the dead for Nazi propaganda."
        </p>
      </div>

      <!-- Architectural & Theological Contrast 2-Col Grid -->
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

      <!-- Field Directive -->
      <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 7px; padding: 9px 13px;">
        <div style="font-size: 9.6pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 3px;">
          Tour Leader Field Directive: Silence &amp; Contrast
        </div>
        <p style="font-size: 10.2pt; color: #334155; line-height: 1.42; margin: 0;">
          Lead pupils along the oak pathway to the bronze mourners. Emphasize that here lies the grief of the defeated nation. Have students reflect on how mass burials shaped postwar German psychology before proceeding to the poetry reading on the facing page.
        </p>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 8 of 24</span>
    </div>
  </div>
  `;
};
