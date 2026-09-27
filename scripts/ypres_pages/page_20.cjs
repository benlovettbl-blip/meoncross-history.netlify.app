module.exports = function renderPage20(assets) {
  return `
  <!-- ================= PAGE 20: MENIN GATE (LITERATURE & CONTROVERSY) ================= -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="school-title">Day 2 &middot; Stop 10: Literature &amp; Commemorative Controversy</div>
        <div class="school-sub">Siegfried Sassoon &middot; The Anti-Monument Fury &amp; Frontline Reality</div>
      </div>
      <div class="partner-pill">
        <div class="brand">Stop 10</div>
        <div class="lead">Wartime Poetry</div>
      </div>
    </div>

    <div class="page-body">
      <!-- Poem Box -->
      <div class="poem-box">
        <div class="poem-header">
          <div>
            <span class="poem-title">On Passing the New Menin Gate</span>
            <span class="poem-meta">&middot; Siegfried Sassoon (Written 1927)</span>
          </div>
          <img src="${assets.sassoonImg}" alt="Siegfried Sassoon" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 1.5px solid #cbd5e1;">
        </div>

        <div style="display: grid; grid-template-columns: 1.25fr 1fr; gap: 14px; align-items: start;">
          <div class="poem-lines" style="font-size: 11pt; line-height: 1.44;">
Who will remember, passing through this Gate,
The unheroic Dead who fed the guns?
Who shall absolve the foulness of their fate,&mdash;
Those doomed, conscripted, unvictorious ones?
Crudely renewed, the Salient holds its own.
Paid are its dim defenders by this pomp;
Paid, with a pile of peace-complacent stone
To gym-cote hundreds and the dead who romp
In shallow waters.

Here was the world’s worst wound. And here with pride
‘Their name liveth for evermore’ the Gateway claims.
Was ever an immolation so belied
As these intolerably nameless names?
Well might the Dead who struggled in the slime
Rise and deride this sepulchre of crime.
          </div>

          <div style="font-size: 10pt; line-height: 1.42; color: #475569; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px 12px;">
            <strong style="color: #1e293b; display: block; font-size: 10.4pt; margin-bottom: 4px;">The Anti-Monument Critique:</strong>
            Attending the grand opening of the Menin Gate in July 1927, decorated frontline veteran Siegfried Sassoon MC was appalled by what he saw as imperial hypocrisy and smug complacency.<br><br>
            He fiercely condemned Sir Reginald Blomfield's triumphal Portland arch as a "sepulchre of crime", arguing that grandiose neoclassical architecture served only to sanitize the horrifying physical reality of conscripted youths ground to pieces in the Flanders mud.
          </div>
        </div>
      </div>

      <!-- Hinge Questions -->
      <div class="hinge-box">
        <div class="box-header">? Targeted Enquiry Hinge Questions for Group Discussion</div>
        <p>
          1. "Why was Siegfried Sassoon so bitterly enraged by Blomfield's grand classical arch, dismissing it as a 'sepulchre of crime'? Is his critique justified?"
        </p>
        <p>
          2. "What is the cultural and moral significance of the town of Ypres maintaining the Last Post ceremony every single evening for nearly a century?"
        </p>
      </div>

      <!-- Transit Bar -->
      <div class="transit-bar">
        <span>&rarr; <strong>Transit Guidance:</strong> Dismiss party to coach at Lille Gate coach bays; 15-minute coach transit to Peace Village Base Camp for night rest.</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 20 of 24</span>
    </div>
  </div>
  `;
};
