module.exports = function renderPage20(assets) {
  return `
  <!-- ================= PAGE 20: MENIN GATE (LITERATURE, CONTROVERSY & FAMILY HERITAGE) ================= -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="school-title">Day 2 &middot; Stop 10: Literature, Controversy &amp; Living Memory</div>
        <div class="school-sub">Siegfried Sassoon, The Menin Gate &amp; Archival Family Discovery</div>
      </div>
      <div class="partner-pill">
        <div class="brand">Stop 10</div>
        <div class="lead">Wartime Poetry &amp; Archive</div>
      </div>
    </div>

    <div class="page-body" style="display: flex; flex-direction: column; justify-content: space-between; gap: 8px;">
      <!-- Poem & Critique Box -->
      <div class="poem-box" style="padding: 10px 14px; margin-bottom: 0;">
        <div class="poem-header" style="margin-bottom: 6px; padding-bottom: 4px;">
          <div>
            <span class="poem-title" style="font-size: 11pt;">On Passing the New Menin Gate</span>
            <span class="poem-meta" style="font-size: 8.8pt;">&middot; Siegfried Sassoon (Written 1927)</span>
          </div>
          <img src="${assets.sassoonImg}" alt="Siegfried Sassoon" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover; border: 1.5px solid #cbd5e1;">
        </div>

        <div style="display: grid; grid-template-columns: 1.25fr 1fr; gap: 12px; align-items: start;">
          <div class="poem-lines" style="font-size: 9.6pt; line-height: 1.38;">
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

          <div style="font-size: 8.8pt; line-height: 1.36; color: #475569; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 10px;">
            <strong style="color: #1e293b; display: block; font-size: 9.2pt; margin-bottom: 3px;">The Anti-Monument Critique:</strong>
            Attending the opening of the Menin Gate in July 1927, decorated frontline veteran Siegfried Sassoon MC was appalled by what he saw as imperial hypocrisy and smug complacency.<br><br>
            He fiercely condemned Blomfield's triumphal arch as a "sepulchre of crime", arguing that grandiose classical stone sanitized the horrifying physical reality of conscripted youths ground to pieces in the Flanders mud.
          </div>
        </div>
      </div>

      <!-- Archival Family Case Study: 2nd Lt Ernest Crummack MC DCM -->
      <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-left: 5px solid #b45309; border-radius: 6px; padding: 8px 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; border-bottom: 1.2px solid #e2e8f0; padding-bottom: 3px;">
          <div>
            <span style="font-size: 9pt; font-weight: 800; color: #b45309; text-transform: uppercase; letter-spacing: 0.04em;">Archival Fieldwork Discovery: 2nd Lt. Ernest Edward Crummack MC, DCM</span>
            <span style="font-size: 8pt; color: #64748b; font-weight: 600; display: block;">1/5th &amp; 6th Bn York &amp; Lancaster Regt &middot; Direct Ancestry of our School Fieldwork Community</span>
          </div>
          <span style="font-size: 7.4pt; font-weight: 700; color: #1e3a8a; background: #eff6ff; border: 1px solid #bfdbfe; padding: 2px 7px; border-radius: 4px; text-transform: uppercase;">Primary Archive Link</span>
        </div>

        <div style="display: grid; grid-template-columns: 85px 1fr; gap: 10px; align-items: center;">
          <div style="text-align: center;">
            <img src="${assets.crummackPortrait}" alt="2nd Lt Ernest Crummack MC DCM" style="width: 82px; height: 110px; object-fit: cover; border-radius: 4px; border: 1.2px solid #cbd5e1; display: block;">
            <div style="font-size: 6.8pt; color: #64748b; font-weight: 600; margin-top: 2px; line-height: 1.1;">2nd Lt. E. E. Crummack<br>MC, DCM (1885–1958)</div>
          </div>
          <div>
            <p style="font-size: 8.5pt; line-height: 1.38; color: #334155; margin: 0 0 4px 0;">
              During our department's archival research ahead of this expedition, pupils reconstructed the remarkable frontline service of <strong>2nd Lieutenant Ernest Edward Crummack MC, DCM</strong>&mdash;direct Great War ancestor of a pupil in our school group. Enlisting as a Private in 1914, Ernest earned the Distinguished Conduct Medal on the Somme in 1916 for crawling through machine-gun fire to rescue wounded comrades under fire, before receiving an officer's commission and winning the Military Cross in 1918 leading troops across the Canal du Nord.
            </p>
            <p style="font-size: 8.5pt; line-height: 1.38; color: #334155; margin: 0;">
              Surviving interwar family postcards confirm that Ernest made a personal pilgrimage in the 1930s back to France and Flanders, visiting this very <strong>Menin Gate</strong> and staying at the adjacent H&ocirc;tel Ypriana. Standing beneath these vaulted arches today, our pupils trace not merely abstract national commemoration, but authentic, living family heritage.
            </p>
          </div>
        </div>
      </div>

      <!-- Hinge Questions (Header removed as per Audio 5) -->
      <div class="hinge-box" style="padding: 7px 12px; margin-bottom: 0;">
        <p style="font-size: 9.6pt; line-height: 1.38; color: #1e3a8a; margin: 0 0 3px 0; font-weight: 500;">
          1. "Why was Siegfried Sassoon so bitterly enraged by Blomfield's classical arch, dismissing it as a 'sepulchre of crime'? Does discovering that veterans like 2nd Lt. Crummack returned here on personal pilgrimage in the 1930s complicate Sassoon's critique?"
        </p>
        <p style="font-size: 9.6pt; line-height: 1.38; color: #1e3a8a; margin: 0; font-weight: 500;">
          2. "What is the cultural and moral significance of the town of Ypres maintaining the Last Post ceremony every single evening for nearly a century?"
        </p>
      </div>

      <!-- Transit Bar -->
      <div class="transit-bar" style="margin-top: 0; padding: 4px 10px; font-size: 8.2pt;">
        <span>&rarr; <strong>Transit Guidance:</strong> Dismiss party to coach at Lille Gate coach bays; 15-minute coach transit to Peace Village Base Camp for night rest.</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department &middot; Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 20 of 24</span>
    </div>
  </div>
  `;
};
