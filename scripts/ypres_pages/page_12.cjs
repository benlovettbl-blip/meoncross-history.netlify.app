module.exports = function renderPage12(assets) {
  return `
  <!-- ================= PAGE 12: VANCOUVER CORNER (LITERATURE & REFLECTION) ================= -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="school-title">Day 2 &middot; Stop 5: Literature &amp; Medical Reality</div>
        <div class="school-sub">Wilfred Owen &middot; The Trauma of Gas Warfare &amp; The Old Lie</div>
      </div>
      <div class="partner-pill">
        <div class="brand">Stop 5</div>
        <div class="lead">Wartime Poetry</div>
      </div>
    </div>

    <div class="page-body">
      <!-- Poem Box -->
      <div class="poem-box">
        <div class="poem-header">
          <div>
            <span class="poem-title">Dulce et Decorum Est</span>
            <span class="poem-meta">&middot; Wilfred Owen (Written at Craiglockhart, 1917)</span>
          </div>
          <img src="${assets.owenImg}" alt="Wilfred Owen" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 1.5px solid #cbd5e1;">
        </div>

        <div style="display: grid; grid-template-columns: 1.25fr 1fr; gap: 14px; align-items: start;">
          <div class="poem-lines" style="font-size: 11pt; line-height: 1.44;">
Gas! GAS! Quick, boys!&mdash;An ecstasy of fumbling,
Fitting the clumsy helmets just in time;
But someone still was yelling out and stumbling,
And flound'ring like a man in fire or lime...
Dim, through the misty panes and thick green light,
As under a green sea, I saw him drowning.

In all my dreams, before my helpless sight,
He plunges at me, guttering, choking, drowning.

If in some smothering dreams you too could pace
Behind the wagon that we flung him in,
And watch the white eyes writhing in his face,
His hanging face, like a devil's sick of sin;
If you could hear, at every jolt, the blood
Come gargling from the froth-corrupted lungs...
My friend, you would not tell with such high zest
To children ardent for some desperate glory,
The old Lie: <em>Dulce et decorum est / Pro patria mori.</em>
          </div>

          <div style="font-size: 10pt; line-height: 1.42; color: #475569; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px 12px;">
            <strong style="color: #1e293b; display: block; font-size: 10.4pt; margin-bottom: 4px;">The Dismantling of Martial Glory:</strong>
            Composed while recovering from shell shock at Craiglockhart War Hospital under Siegfried Sassoon's mentorship, Owen directly addresses civilian propagandists (such as Jessie Pope) who urged young boys to enlist.<br><br>
            By describing the grotesque physical agony of a soldier dying of fluid-choked lungs, Owen strips away all classical romance from warfare. The Latin quote from the Roman poet Horace&mdash;<em>"It is sweet and fitting to die for one's fatherland"</em>&mdash;is exposed as an unforgivable lie.
          </div>
        </div>
      </div>

      <!-- Hinge Questions -->
      <div class="hinge-box">
        <div class="box-header">? Targeted Enquiry Hinge Questions for Group Discussion</div>
        <p>
          1. "Why did the German high command fail to exploit the four-mile gap opened by the chlorine gas cloud on 22 April 1915? What does this reveal about military skepticism toward technological weapons?"
        </p>
        <p>
          2. "How does Owen's visceral medical imagery of gas suffocation dismantle centuries of classical and Victorian heroic tradition?"
        </p>
      </div>

      <!-- Transit Bar -->
      <div class="transit-bar">
        <span>&rarr; <strong>Transit Guidance:</strong> 15-minute coach transit south-west to Sanctuary Wood (Hill 62) along the Meenseweg.</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 12 of 24</span>
    </div>
  </div>
  `;
};
