module.exports = function renderPage9(assets) {
  return `
  <!-- ================= PAGE 9: LANGEMARCK (LITERATURE & REFLECTION) ================= -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="school-title">Day 1 &middot; Stop 3: Literature &amp; The Refusal of Sentimentalism</div>
        <div class="school-sub">Charles Hamilton Sorley &middot; The Voice of the Dead at the Kameradengrab</div>
      </div>
      <div class="partner-pill">
        <div class="brand">Stop 3</div>
        <div class="lead">Wartime Poetry</div>
      </div>
    </div>

    <div class="page-body">
      <!-- Poem Box -->
      <div class="poem-box">
        <div class="poem-header">
          <div>
            <span class="poem-title">When You See Millions of the Mouthless Dead</span>
            <span class="poem-meta">&middot; Charles Hamilton Sorley (Killed at Loos, Oct 1915, Age 20)</span>
          </div>
          <img src="${assets.sorleyImg}" alt="Charles Sorley" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 1.5px solid #cbd5e1;">
        </div>

        <div style="display: grid; grid-template-columns: 1.25fr 1fr; gap: 14px; align-items: start;">
          <div class="poem-lines" style="font-size: 11.5pt; line-height: 1.46;">
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

          <div style="font-size: 10pt; line-height: 1.42; color: #475569; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px 12px;">
            <strong style="color: #1e293b; display: block; font-size: 10.4pt; margin-bottom: 4px;">The Refusal of Sentimentalism:</strong>
            Discovered in Sorley's field kit after he was killed in action at Loos aged just 20, this austere, unflinching sonnet refuses to sanitize industrial slaughter with conventional platitudes of glory, sacrifice, or posthumous honour.<br><br>
            Standing at Langemarck before the 25,000 unidentified dead in the single mass <em>Kameradengrab</em>, Sorley's words demand that we confront the absolute finality and senselessness of modern technological warfare.
          </div>
        </div>
      </div>

      <!-- Hinge Questions -->
      <div class="hinge-box">
        <div class="box-header">? Targeted Enquiry Hinge Questions for Group Discussion</div>
        <p>
          1. "Why did the German state choose dark basalt, mass graves, and somber oak trees rather than individual white headstones? How does this reflect differing national psychologies of grief between victor and vanquished?"
        </p>
        <p>
          2. "How does Charles Sorley's poem dismantle patriotic war rhetoric when read standing before 25,000 unidentified German dead in the Kameradengrab?"
        </p>
      </div>

      <!-- Transit Bar -->
      <div class="transit-bar">
        <span>&rarr; <strong>Transit Guidance:</strong> 20-minute coach transit south-east around the Ypres ring road to Hooge Crater Museum on the Menin Road.</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 9 of 24</span>
    </div>
  </div>
  `;
};
