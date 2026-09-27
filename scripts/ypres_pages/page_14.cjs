module.exports = function renderPage14(assets) {
  return `
  <!-- ================= PAGE 14: SANCTUARY WOOD (LITERATURE & REFLECTION) ================= -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="school-title">Day 2 &middot; Stop 6: Disciplinary Voice &amp; Trench Satire</div>
        <div class="school-sub">Isaac Rosenberg &middot; Whitechapel Modernism &amp; The Cosmopolitan Rat</div>
      </div>
      <div class="partner-pill">
        <div class="brand">Stop 6</div>
        <div class="lead">Wartime Poetry</div>
      </div>
    </div>

    <div class="page-body">
      <!-- Poem Box -->
      <div class="poem-box">
        <div class="poem-header">
          <div>
            <span class="poem-title">Break of Day in the Trenches</span>
            <span class="poem-meta">&middot; Isaac Rosenberg (Killed in action 1 April 1918, Age 27)</span>
          </div>
          <img src="${assets.rosenbergImg}" alt="Isaac Rosenberg" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 1.5px solid #cbd5e1;">
        </div>

        <div style="display: grid; grid-template-columns: 1.25fr 1fr; gap: 14px; align-items: start;">
          <div class="poem-lines" style="font-size: 11pt; line-height: 1.44;">
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
What quaver—what heart ague has stunned you,
Leaping on the sinister wire?
          </div>

          <div style="font-size: 10pt; line-height: 1.42; color: #475569; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px 12px;">
            <strong style="color: #1e293b; display: block; font-size: 10.4pt; margin-bottom: 4px;">The Sardonic Rat as Universal Observer:</strong>
            Rosenberg, an impoverished Jewish private and gifted Slade painter from London's East End, eschewed both patriotic posturing and self-pity.<br><br>
            By depicting a trench rat roaming freely between British and German barbed wire, Rosenberg exposes the grotesque absurdity of the war: vermin enjoy total freedom of movement and international brotherhood, while civilized European men crouch in mud condemned to slaughter each other.
          </div>
        </div>
      </div>

      <!-- Hinge Questions -->
      <div class="hinge-box">
        <div class="box-header">? Targeted Enquiry Hinge Questions for Group Discussion</div>
        <p>
          1. "Why does Isaac Rosenberg select a 'queer sardonic rat' as the central observer of the battlefield rather than a heroic comrade or general? What does this say about the human condition in the trenches?"
        </p>
        <p>
          2. "How does walking through authentic, unpaved muddy trenches at Sanctuary Wood alter our historical perception compared to looking at clean diagrams in a revision textbook?"
        </p>
      </div>

      <!-- Transit Bar -->
      <div class="transit-bar">
        <span>&rarr; <strong>Transit Guidance:</strong> 15-minute coach transit into central Ypres for supervised supermarket lunch stop (Aldi) before afternoon cemeteries.</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 14 of 24</span>
    </div>
  </div>
  `;
};
