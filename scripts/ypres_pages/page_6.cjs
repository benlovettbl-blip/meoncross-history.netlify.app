module.exports = function renderPage6(assets) {
  return `
  <!-- ================= PAGE 6: ESSEX FARM (LITERATURE & REFLECTION) ================= -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="school-title">Day 1 &middot; Stop 1: Literature &amp; Historical Reflection</div>
        <div class="school-sub">John McCrae, Alexis Helmer's Burial &amp; The Sacred Poppy Symbol</div>
      </div>
      <div class="partner-pill">
        <div class="brand">Stop 1</div>
        <div class="lead">Wartime Poetry</div>
      </div>
    </div>

    <div class="page-body">
      <!-- Poem Box -->
      <div class="poem-box">
        <div class="poem-header">
          <div>
            <span class="poem-title">In Flanders Fields</span>
            <span class="poem-meta">&middot; Lt. Col. John McCrae (Canadian AMC) &middot; 3 May 1915</span>
          </div>
          <img src="${assets.mccraeImg}" alt="John McCrae" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 1.5px solid #cbd5e1;">
        </div>

        <div style="display: grid; grid-template-columns: 1.25fr 1fr; gap: 14px; align-items: start;">
          <div class="poem-lines" style="font-size: 11.5pt; line-height: 1.48;">
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

          <div style="font-size: 10pt; line-height: 1.42; color: #475569; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px 12px;">
            <strong style="color: #1e293b; display: block; font-size: 10.4pt; margin-bottom: 4px;">The Red Poppy &amp; Recruitment Symbolism:</strong>
            Written on the back step of a field ambulance after McCrae buried his young friend Alexis Helmer, the poem personifies the dead speaking directly to the living.<br><br>
            While the first two stanzas lament the loss of young life in the mud, the final stanza shifts sharply to military defiance. It was swiftly seized upon by Allied governments across Britain, Canada, and the Commonwealth to drive enlistment campaigns, demanding that fresh waves of young recruits take up the torch against the foe.
          </div>
        </div>
      </div>

      <!-- Hinge Questions -->
      <div class="hinge-box">
        <div class="box-header">? Targeted Enquiry Hinge Questions for Group Discussion</div>
        <p>
          1. "How did McCrae's poem transform a common weed growing in disturbed agricultural soil into a sacred global symbol of remembrance&mdash;and does the final stanza glorify continuous warfare?"
        </p>
        <p>
          2. "What does Valentine Strudwick's grave reveal about the effectiveness of British Army enlistment age checks during the recruiting rush of 1914&ndash;15?"
        </p>
      </div>

      <!-- Transit Bar -->
      <div class="transit-bar">
        <span>&rarr; <strong>Transit Guidance:</strong> Reboard coach for a 10-minute drive north-east along the Diksmuidseweg to Yorkshire Trench (Boezinge).</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 6 of 24</span>
    </div>
  </div>
  `;
};
