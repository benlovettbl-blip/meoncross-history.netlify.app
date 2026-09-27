module.exports = function renderPage16(assets) {
  return `
  <!-- ================= PAGE 16: TYNE COT (LITERATURE & REFLECTION) ================= -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="school-title">Day 2 &middot; Stop 7: The National Ode of Remembrance</div>
        <div class="school-sub">Laurence Binyon &middot; September 1914 &amp; The Eternal Liturgy of Remembrance</div>
      </div>
      <div class="partner-pill">
        <div class="brand">Stop 7</div>
        <div class="lead">Wartime Poetry</div>
      </div>
    </div>

    <div class="page-body">
      <!-- Poem Box -->
      <div class="poem-box">
        <div class="poem-header">
          <div>
            <span class="poem-title">For the Fallen</span>
            <span class="poem-meta">&middot; Laurence Binyon (Written September 1914)</span>
          </div>
          <img src="${assets.binyonImg}" alt="Laurence Binyon" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 1.5px solid #cbd5e1;">
        </div>

        <div style="display: grid; grid-template-columns: 1.25fr 1fr; gap: 14px; align-items: start;">
          <div class="poem-lines" style="font-size: 11pt; line-height: 1.44;">
With proud thanksgiving, a mother for her children,
England mourns for her dead across the sea.
Flesh of her flesh they were, spirit of her spirit,
Fallen in the cause of the free.

They went with songs to the battle, they were young,
Straight of limb, true of eye, steady and aglow.
They were staunch to the end against odds uncounted;
They fell with their faces to the foe.

They shall grow not old, as we that are left grow old:
Age shall not weary them, nor the years condemn.
At the going down of the sun and in the morning
We will remember them.

As the stars that shall be bright when we are dust,
Moving in marches upon the heavenly plain;
As the stars that are starry in the time of our darkness,
To the end, to the end, they remain.
          </div>

          <div style="font-size: 10pt; line-height: 1.42; color: #475569; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px 12px;">
            <strong style="color: #1e293b; display: block; font-size: 10.4pt; margin-bottom: 4px;">From the British Museum to Global Remembrance:</strong>
            Sitting on the cliffs of North Cornwall in the opening weeks of the war, Binyon—an assistant keeper of prints at the British Museum too old for military service—composed these verses in response to the retreat from Mons.<br><br>
            The fourth stanza, known as 'The Ode of Remembrance', has become the universal liturgy recited at Remembrance Day ceremonies, military funerals, and nightly at the Menin Gate. Standing among 12,000 graves at Tyne Cot, its solemn cadence transforms individual grief into eternal collective reverence.
          </div>
        </div>
      </div>

      <!-- Hinge Questions -->
      <div class="hinge-box">
        <div class="box-header">? Targeted Enquiry Hinge Questions for Group Discussion</div>
        <p>
          1. "Why did Sir Herbert Baker choose to incorporate a captured enemy pillbox directly into the foundation of the Cross of Sacrifice rather than bulldozing it away? What symbolic message does this convey?"
        </p>
        <p>
          2. "What does the overwhelming proportion of unknown dead (nearly 70%) at Tyne Cot reveal about the physical nature of high-explosive artillery warfare during the Third Battle of Ypres?"
        </p>
      </div>

      <!-- Transit Bar -->
      <div class="transit-bar">
        <span>&rarr; <strong>Transit Guidance:</strong> 20-minute coach transit south-west around Ypres to Lijssenthoek Military Cemetery near Poperinge.</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 16 of 24</span>
    </div>
  </div>
  `;
};
