module.exports = function renderPage10(assets) {
  return `
  <!-- ================= PAGE 10: SANCTUARY WOOD ================= -->
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
        <div class="box-header">60-Second Teacher Pitch: The Bitter Irony of "Sanctuary"</div>
        <p>
          "In late 1914, British soldiers retreating from First Ypres found shelter in this dense woodland and gratefully named it 'Sanctuary Wood'. The name became a bitter, cruel irony. By June 1916, during the Battle of Mount Sorrel, German artillery rained over 100,000 high-explosive shells onto Hill 62 in a matter of hours, splintering every tree into jagged stumps and churning the forest floor into a moonscape of craters. The farmer who owned this land, the Schier family, preserved this section of frontline trenches exactly as it lay in 1918, refusing to fill the craters or flatten the parapets. As pupils walk through these unpaved, mud-slicked trenches, point out the original rusted corrugated iron revetments, the flooded sump pits, and the deep shell holes that demonstrate why survival on the Western Front was largely a matter of chance."
        </p>
      </div>

      <!-- Preserved Trench Archaeology -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        <div class="context-box">
          <div class="box-header">Living Conditions in the Frontline</div>
          <p>
            Men spent 4&ndash;6 days in frontline firebays without sleep, washing, or warm food. Infested with body lice that transmitted trench fever, plagued by bold trench rats feeding on corpses, and standing in icy, fecal-contaminated water that induced painful <strong>trench foot</strong> (fungal rot that could lead to gangrene and amputation), soldiers endured physical misery as intense as artillery terror.
          </p>
        </div>

        <div class="context-box">
          <div class="box-header">Hill 62 Strategic Vantage</div>
          <p>
            Hill 62 rises barely 62 metres above sea level, yet in this low terrain, that modest elevation afforded total optical dominance over the approaches to Ypres. The Canadian counter-attack on 13 June 1916 recaptured the ridge in a torrential downpour, suffering 8,430 casualties to deny German artillery forward observation.
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

      <!-- Poem Box -->
      <div class="poem-box" style="padding: 5px 10px;">
        <div class="poem-header">
          <div>
            <span class="poem-title">Break of Day in the Trenches</span>
            <span class="poem-meta">&middot; Isaac Rosenberg (Killed in action 1 April 1918, Age 27)</span>
          </div>
          <img src="${assets.rosenbergImg}" alt="Isaac Rosenberg" style="width: 30px; height: 30px; border-radius: 50%; object-fit: cover; border: 1.2px solid #cbd5e1;">
        </div>
        <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 10px; align-items: start;">
          <div class="poem-lines" style="font-size: 8.2pt; line-height: 1.28;">
The darkness crumbles away.
It is the same old druid Time as ever,
Only a live thing leaps my hand,
A queer sardonic rat,
As I pull the parapet's poppy
To stick behind my ear.
Droll rat, they would shoot you if they knew
Your cosmopolitan sympathies,
Now you have touched this English hand
You will have the same chance to touch
A German one, though the thought
Would make you shudder, perhaps...
What do you see in our eyes
At the shrieking iron and flame
Hurled through still heavens?
          </div>
          <div style="font-size: 8.1pt; line-height: 1.28; color: #475569; background: #fff; border: 1px solid #e2e8f0; border-radius: 4px; padding: 6px 8px;">
            <strong style="color: #1e293b; display: block; margin-bottom: 2px;">The Sardonic Rat &amp; Absurdity:</strong>
            Rosenberg, an impoverished Jewish private and talented painter from Whitechapel, eschewed both martial glory and moralizing. By depicting the trench rat roaming freely between British and German lines, he exposes the supreme irony of the war: vermin enjoy total freedom and survival, while civilized men are condemned to slaughter one another in the mud.
          </div>
        </div>
      </div>

      <!-- Hinge Questions -->
      <div class="hinge-box">
        <div class="box-header">? Targeted Enquiry Hinge Questions</div>
        <p>
          1. "Why does Isaac Rosenberg select a 'queer sardonic rat' as the central observer of the battlefield rather than a heroic soldier or general? What does this say about the human condition in the trenches?"
        </p>
        <p>
          2. "How does walking through authentic, unpaved muddy trenches at Sanctuary Wood alter our historical perception compared to looking at clean diagrams in a revision textbook?"
        </p>
      </div>

      <div class="transit-bar">
        <span>&rarr; <strong>Transit Guidance:</strong> 15-minute coach transit into Ypres town centre for supervised supermarket lunch stop (Aldi) before afternoon cemeteries.</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 10 of 16</span>
    </div>
  </div>
  `;
};
