module.exports = function renderPage1(assets) {
  return `
  <!-- ================= PAGE 1: COVER & EXPEDITION DIRECTORATE ================= -->
  <div class="page">
    <div class="header-bar">
      <div>
        <div class="school-title">The History Portal</div>
        <div class="school-sub">Department of History · Ypres Salient Fieldwork</div>
      </div>
      <div class="partner-pill">
        <div class="brand">The History Boys</div>
        <div class="lead">Specialist Battlefield Education</div>
      </div>
    </div>

    <div class="page-body">
      <div style="text-align: center; margin-bottom: 2px;">
        <div style="display: inline-block; background: #eff6ff; border: 1.5px solid #93c5fd; color: #1e3a8a; font-size: 8.8pt; font-weight: 800; padding: 3px 18px; border-radius: 16px; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 5px;">
          Tour Leader Field Companion · Staff Edition (A4)
        </div>
        <h1 style="font-size: 27pt; line-height: 1.1; color: #0f172a; margin-bottom: 3px; letter-spacing: 0.02em;">
          YPRES 1914–1918
        </h1>
        <div style="font-size: 11.5pt; font-weight: 600; color: #b45309; font-style: italic;">
          Master Tour Scripts, Site Storytelling, Look-Fors, Timings &amp; Primary Readings
        </div>
      </div>

      <!-- Tour Leadership Box -->
      <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 10px 14px; box-shadow: 0 2px 5px rgba(0,0,0,0.03);">
        <div style="font-size: 8.8pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 5px; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 3px;">
          Expedition Directorate &amp; 24/7 Field Operations Chain
        </div>
        <div style="font-size: 8.6pt; line-height: 1.48; color: #1e293b;">
          <strong>Tour Leaders:</strong> Department Lead (Head of History, The History Portal) &amp; Mr James Garrett (The History Boys Tour Company — expert battlefield historian)<br>
          <strong>Accompanying Fieldwork Staff:</strong> Fieldwork Staff (Pastoral Care &amp; First Aid Leads)<br>
          <strong>Expedition Dates:</strong> Thursday 1st – Saturday 3rd October 2026<br>
          <strong>Expedition Base Camp:</strong> Peace Village Hostel, Nieuwkerkestraat 9, 8957 Mesen (+32 57 226 040)<br>
          <strong>24/7 School Emergency Incident Base:</strong> +44 (0)1329 662182 / 07825 297749<br>
          <strong>European Universal Emergency Line:</strong> 112 (Ambulanz / Brandweer / Politie)
        </div>
      </div>

      <!-- Cover Photo -->
      <div class="photo-card" style="padding: 5px;">
        <img src="${assets.stubbingtonMem}" alt="Holy Rood Memorial" style="width: 100%; height: 235px; object-fit: cover; border-radius: 4px;">
        <div class="caption" style="margin-top: 4px; font-size: 8pt;">
          The War Memorial Lychgate at Holy Rood Church, Stubbington — Anchoring our school expedition to our local parish fallen who lie in the Salient.
        </div>
      </div>

      <!-- The Charge -->
      <div style="background: #fffbeb; border: 1.5px solid #fde68a; border-left: 5px solid #b45309; border-radius: 7px; padding: 10px 14px;">
        <div style="font-size: 9pt; font-weight: 800; color: #b45309; text-transform: uppercase; margin-bottom: 4px;">
          The Tour Leader's Charge: A Pilgrimage of Remembrance &amp; Field Protocol
        </div>
        <p style="font-size: 8.6pt; color: #334155; line-height: 1.44; margin: 0 0 6px 0;">
          This master companion equips the tour leader and accompanying staff with rich, immersive historical narratives at every cemetery, bunker, and crater. Each stop provides a 60-second spoken pitch, concrete forensic look-fors on the ground, high-level hinge questions, and authentic unabridged wartime poetry.
        </p>
        <p style="font-size: 8.6pt; color: #334155; line-height: 1.44; margin: 0 0 6px 0;">
          On these sacred grounds, our role is to bridge past and present: transforming cold stone into living memory. Pupils must maintain respectful decorum, observe absolute silence during memorial ceremonies, and record observations in their fieldwork journals.
        </p>
        <div style="font-family: 'Playfair Display', serif; font-style: italic; font-size: 8.8pt; color: #1e3a8a; border-top: 1px dashed #fde68a; padding-top: 5px;">
          "They shall grow not old, as we that are left grow old: Age shall not weary them, nor the years condemn. At the going down of the sun and in the morning, We will remember them."
        </div>
      </div>

      <!-- Booklet Format Badge -->
      <div style="background: #f8fafc; border: 1.2px solid #cbd5e1; border-radius: 6px; padding: 6px 12px; display: flex; justify-content: space-between; align-items: center; font-size: 8pt; color: #475569;">
        <span><strong>Format:</strong> 16-Page A4 Master Field Companion (Saddle-Stitch / Binder Ready)</span>
        <span><strong>Curriculum:</strong> Edexcel GCSE History Paper 1 (Western Front) &amp; Key Stage 3</span>
      </div>
    </div>

    <div class="footer-bar">
      <span>The History Department · Ypres 1914–1918 Tour Leader Companion (A4)</span>
      <span class="page-number">Page 1 of 16</span>
    </div>
  </div>
  `;
};
