module.exports = function renderPage13(assets) {
  return `
  <!-- ================= PAGE 13: SANCTUARY WOOD (SITE & TRENCH ARCHAEOLOGY) ================= -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="school-title">Day 2 &middot; Stop 6: Sanctuary Wood (Hill 62)</div>
        <div class="school-sub">10:00 &middot; Preserved British Frontline Trenches, Shell Holes &amp; Mud</div>
      </div>
      <div class="partner-pill">
        <div class="brand">Stop 6</div>
        <div class="lead">Original Frontline</div>
      </div>
    </div>

    <div class="page-body">
      <!-- Pitch -->
      <div class="pitch-box">
        <div class="box-header">The Bitter Irony of "Sanctuary"</div>
        <p>
          "In late 1914, British soldiers retreating from First Ypres found shelter in this dense woodland and gratefully named it 'Sanctuary Wood'. The name became a bitter, cruel irony. By June 1916, during the Battle of Mount Sorrel, German artillery rained over 100,000 high-explosive shells onto Hill 62 in a matter of hours, splintering every tree into jagged stumps and churning the forest floor into a moonscape of craters. The farmer who owned this land, the Schier family, preserved this section of frontline trenches exactly as it lay in 1918, refusing to fill the craters or flatten the parapets. As pupils walk through these unpaved, mud-slicked trenches, point out the original rusted corrugated iron revetments, the flooded sump pits, and the deep shell holes that demonstrate why survival on the Western Front was largely a matter of chance."
        </p>
      </div>

      <!-- Preserved Trench Conditions 2-Col Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div class="context-box">
          <div class="box-header">Living Conditions in the Frontline</div>
          <p>
            Men spent 4&ndash;6 days in frontline firebays without sleep, washing, or warm rations. Infested with body lice that transmitted trench fever, plagued by bold trench rats feeding on unburied corpses, and standing in icy water that induced crippling <strong>trench foot</strong>, soldiers endured relentless physical misery alongside artillery terror.
          </p>
        </div>

        <div class="context-box">
          <div class="box-header">Hill 62 Strategic Vantage</div>
          <p>
            Hill 62 rises barely 62 metres above sea level, yet in this low terrain, that modest elevation afforded optical dominance over the approaches to Ypres. The Canadian counter-attack on 13 June 1916 recaptured the ridge in a torrential downpour, suffering 8,430 casualties to deny German artillery forward observation.
          </p>
        </div>
      </div>

      <!-- Look-fors -->
      <div class="look-fors-box">
        <div class="box-header">4 Physical Forensic Look-Fors on Site</div>
        <ul class="look-fors-list">
          <li><strong>Original Corrugated Iron Sheet Revetments:</strong> Rusted British iron and timber retaining walls surviving in the soil since 1918.</li>
          <li><strong>Mud &amp; Sump Drainage Channels:</strong> Notice how water collects immediately in low firebays, demonstrating why duckboards were essential.</li>
          <li><strong>Preserved Splintered Tree Stumps:</strong> Fossilized oak and beech tree bases blasted apart by high-explosive shellfire.</li>
          <li><strong>Forward Sap Entrances:</strong> Shallow forward trenches leading out towards No Man's Land for listening posts and nighttime wiring parties.</li>
        </ul>
      </div>

      <!-- Field Directive -->
      <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 7px; padding: 8px 13px;">
        <div style="font-size: 9.6pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 2px;">
          Tour Leader Field Directive: Mud Terrain Experience
        </div>
        <p style="font-size: 10.2pt; color: #1e293b; line-height: 1.42; margin: 0;">
          Warn pupils regarding slick mud and uneven wooden steps. Have students feel the heavy clay underfoot before assembling for Isaac Rosenberg's poem on the facing page.
        </p>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 13 of 24</span>
    </div>
  </div>
  `;
};
