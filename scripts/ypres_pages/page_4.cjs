module.exports = function renderPage4(assets) {
  return `
  <!-- ================= PAGE 4: LOCAL HERITAGE & THE LOWRY BROTHERS ================= -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="school-title">Local Heritage: The Lowry Family Tragedy</div>
        <div class="school-sub">Staff Dossier: Manor Way Grange, Lee-on-the-Solent &amp; Three Fallen Brothers</div>
      </div>
      <div class="partner-pill">
        <div class="brand">Parish Fallen</div>
        <div class="lead">The Lowry Brothers</div>
      </div>
    </div>

    <div class="page-body" style="display: flex; flex-direction: column; justify-content: space-between; gap: 8px;">
      <!-- Pitch (Prefix removed as per Audio 4) -->
      <div class="pitch-box">
        <div class="box-header">The Lowry Family Tragedy: Manor Way Grange &amp; Three Fallen Sons</div>
        <p>
          "Stand with pupils and share this extraordinary local story: William and Annie Lowry lived at Manor Way Grange in Lee-on-the-Solent. They had three sons&mdash;William, Cyril, and Eric. In 1914, all three volunteered and took officer commissions. Over the next four years, all three were killed in action across different theaters. William died in a charge at Gallipoli; Cyril was shot dead on the Somme right in front of his brother Eric's eyes; and Eric, a decorated Lieutenant Colonel with a DSO and MC, was killed inspecting frontline outposts near Arras in the final weeks of the war in 1918. Their grief-stricken father built the Lowry Memorial Hall in Lee-on-the-Solent so their names would never fade. On our Holy Rood memorial tablet, all three are reunited."
        </p>
      </div>

      <!-- 3 Lowry Brothers Photos -->
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;">
        <div class="photo-card" style="padding: 7px; text-align: center;">
          <img src="${assets.lowryWilliam}" alt="Lieut. William Lowry" style="height: 135px; width: 100%; object-fit: contain; background: #ffffff; display: block; margin: 0 auto;">
          <div style="font-weight: 800; font-size: 9.8pt; color: #1e3a8a; margin-top: 4px;">Lieut. William Lowry</div>
          <div style="font-size: 8.8pt; color: #b45309; font-weight: 700;">8th Gurkha Rifles (Age 25)</div>
          <div style="font-size: 8.6pt; color: #475569; line-height: 1.34; margin-top: 2px; text-align: left;">
            Killed 4 June 1915 during the third battle of Krithia, Gallipoli; commemorated on Helles Memorial.
          </div>
        </div>

        <div class="photo-card" style="padding: 7px; text-align: center;">
          <img src="${assets.lowryCyril}" alt="Capt. Cyril Lowry" style="height: 135px; width: 100%; object-fit: contain; background: #ffffff; display: block; margin: 0 auto;">
          <div style="font-weight: 800; font-size: 9.8pt; color: #1e3a8a; margin-top: 4px;">Capt. Cyril Lowry</div>
          <div style="font-size: 8.8pt; color: #b45309; font-weight: 700;">2nd West Yorks (Age 20)</div>
          <div style="font-size: 8.6pt; color: #475569; line-height: 1.34; margin-top: 2px; text-align: left;">
            Killed 25 Mar 1918, German Spring Offensive on the Somme in front of Eric. Pozi&egrave;res Memorial.
          </div>
        </div>

        <div class="photo-card" style="padding: 7px; text-align: center;">
          <img src="${assets.lowryEric}" alt="Lt. Col. Eric Lowry" style="height: 135px; width: 100%; object-fit: contain; background: #ffffff; display: block; margin: 0 auto;">
          <div style="font-weight: 800; font-size: 9.8pt; color: #1e3a8a; margin-top: 4px;">Lt. Col. Eric Lowry DSO MC</div>
          <div style="font-size: 8.8pt; color: #b45309; font-weight: 700;">2nd West Yorks (Age 25)</div>
          <div style="font-size: 8.6pt; color: #475569; line-height: 1.34; margin-top: 2px; text-align: left;">
            Killed 23 Sep 1918, Arras outpost trench inspection just weeks before the Armistice. La Targette Cemetery.
          </div>
        </div>
      </div>

      <!-- In-Depth Historical Analysis: The Bereavement of a Coastal Parish -->
      <div class="context-box" style="padding: 10px 14px;">
        <div class="box-header">The Lowry Memorial Hall &amp; The Anatomy of Parish Mourning</div>
        <p style="font-size: 10.4pt; line-height: 1.46; color: #334155; margin: 0 0 6px 0;">
          The loss of all three sons destroyed the Lowry household. In response to his unbearable grief, their father William Lowry purchased land on Marine Parade in Lee-on-the-Solent and funded the construction of the <strong>Lowry Memorial Hall</strong> as a permanent civic and social gift to the village, ensuring their sacrifice served future generations of local children.
        </p>
        <p style="font-size: 10.4pt; line-height: 1.46; color: #334155; margin: 0;">
          Inside Holy Rood Church in Crofton parish, a dedicated brass tablet reunites William, Cyril, and Eric. When pupils study the Western Front, the Lowry tragedy serves as an essential bridge: proving that the catastrophic British casualty statistics (over 700,000 dead) were experienced as acute, devastating trauma in individual homes and coastal lanes right on our doorstep.
        </p>
      </div>

      <!-- Fieldwork Task (No journal mentions) -->
      <div class="look-fors-box" style="padding: 9px 13px;">
        <div class="box-header">Fieldwork Enquiry: Connecting Local Parish Memorials to the Flanders Salient</div>
        <p style="font-size: 10.2pt; line-height: 1.44; color: #334155; margin: 0;">
          Discuss with pupils the vital contrast between a village war memorial (like the wooden shelter in Stubbington or the hall in Lee-on-the-Solent) and the massive imperial memorials they will witness in Flanders (such as the Menin Gate with 54,000 names or Tyne Cot with 35,000 missing). Have students consider how individual family memory survived amidst industrialized mass slaughter.
        </p>
      </div>

      <!-- Hinge Question (Header removed as per Audio 5) -->
      <div class="hinge-box">
        <p style="font-size: 10.6pt; line-height: 1.46; color: #1e3a8a; margin: 0; font-weight: 500;">
          "How does discovering that three brothers from one coastal family in our local village were wiped out transform our understanding of the 'Lost Generation' from abstract textbook statistics into acute personal grief?"
        </p>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department &middot; Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 4 of 24</span>
    </div>
  </div>
  `;
};
