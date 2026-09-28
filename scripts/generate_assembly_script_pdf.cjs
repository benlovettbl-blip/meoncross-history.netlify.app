/**
 * History Revision Hub — Printable Assembly Pupil Script & Delivery Prompts
 *
 * Perfect 2-Page Double-Sided A4 Prompt Script:
 * - Side 1 (Page 1): Pupil 1 (Roman York) & Pupil 2 (Tudor Courts)
 * - Side 2 (Page 2): Pupil 3 (Dr. Harold Moody), Pupil 4 (Windrush), and All 4 (Shared Conclusion)
 *
 * Outputs:
 * 1. public/pdfs/assembly_beyond_the_single_story_pupil_script.pdf
 * 2. Mirrors to Google Drive: G:\My Drive\AAMX\Dep File\00_Department_Admin_and_Policies\Beyond_the_Single_Story_Pupil_Script.pdf
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generateScriptPdf() {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Assembly Delivery Script: Beyond the Single Story</title>
<style>
  @page {
    size: A4 portrait;
    margin: 10mm 14mm 10mm 14mm;
  }
  * { box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #0f172a;
    background: #ffffff;
    margin: 0;
    padding: 0;
    font-size: 10pt;
    line-height: 1.48;
  }
  .page {
    height: 277mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    page-break-after: always;
  }
  .page:last-child {
    page-break-after: avoid;
  }
  .header {
    border-bottom: 2px solid #0f172a;
    padding-bottom: 6px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .title-group h1 {
    font-family: Georgia, serif;
    font-size: 16pt;
    color: #0f172a;
    margin: 0 0 2px 0;
    letter-spacing: 0.3px;
  }
  .title-group p {
    font-size: 9pt;
    color: #64748b;
    margin: 0;
    font-weight: 500;
  }
  .meta-badge {
    background: #0f172a;
    color: #f8fafc;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 8pt;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-align: right;
  }
  .content-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .section-card {
    border: 1.5px solid #cbd5e1;
    border-radius: 6px;
    background: #ffffff;
    overflow: hidden;
    margin-bottom: 8px;
  }
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f8fafc;
    padding: 6px 12px;
    border-bottom: 1.5px solid #cbd5e1;
  }
  .speaker-badge {
    font-weight: 800;
    font-size: 9pt;
    padding: 2px 8px;
    border-radius: 3px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .spk-1 { background: #fee2e2; color: #991b1b; border: 1px solid #f87171; }
  .spk-2 { background: #fef3c7; color: #92400e; border: 1px solid #fbbf24; }
  .spk-3 { background: #dcfce7; color: #166534; border: 1px solid #4ade80; }
  .spk-4 { background: #dbeafe; color: #1e40af; border: 1px solid #60a5fa; }
  .spk-all { background: #f3e8ff; color: #6b21a8; border: 1px solid #c084fc; }
  .slide-trigger {
    font-size: 8pt;
    font-weight: 700;
    color: #334155;
    background: #ffffff;
    padding: 2px 8px;
    border-radius: 3px;
    border: 1px solid #cbd5e1;
  }
  .section-body {
    padding: 10px 14px;
  }
  .section-body p {
    margin: 0 0 8px 0;
    color: #0f172a;
    text-align: justify;
  }
  .section-body p:last-child {
    margin-bottom: 0;
  }
  .cue-box {
    font-size: 8.5pt;
    font-style: italic;
    color: #475569;
    background: #f1f5f9;
    border-left: 3.5px solid #0f172a;
    padding: 4px 8px;
    margin-bottom: 8px;
    border-radius: 0 4px 4px 0;
  }
  .conclusion-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: 4px;
  }
  .conclusion-box {
    border: 1px solid #e2e8f0;
    border-radius: 5px;
    padding: 6px 10px;
    background: #f8fafc;
  }
  .conclusion-box strong {
    font-size: 8.5pt;
    display: block;
    margin-bottom: 2px;
  }
  .conclusion-box p {
    font-size: 9pt;
    margin: 0;
    line-height: 1.4;
    text-align: left;
  }
  .silence-banner {
    background: #0f172a;
    color: #fbbf24;
    text-align: center;
    padding: 6px;
    font-weight: 800;
    font-size: 9pt;
    letter-spacing: 0.8px;
    border-radius: 4px;
    margin-top: 8px;
  }
  .footer {
    border-top: 1px solid #e2e8f0;
    padding-top: 4px;
    font-size: 7.5pt;
    color: #94a3b8;
    display: flex;
    justify-content: space-between;
  }
</style>
</head>
<body>

<!-- PAGE 1: PUPILS 1 & 2 -->
<div class="page">
  <div class="header">
    <div class="title-group">
      <h1>Beyond the Single Story: Deep Roots of Black British History</h1>
      <p>Whole School Assembly Delivery Script • 4 Speakers • Total Delivery: ~8–10 Minutes</p>
    </div>
    <div class="meta-badge">
      SIDE 1: PUPILS 1 & 2
    </div>
  </div>

  <div class="content-area">
    <!-- SECTION 1 -->
    <div class="section-card">
      <div class="section-header">
        <span class="speaker-badge spk-1">PUPIL 1 • Roman Britain (c. 350 AD)</span>
        <span class="slide-trigger">Show: Slide 1 (Title) ➔ Then Slide 2 (Ivory Bangle Lady)</span>
      </div>
      <div class="section-body">
        <div class="cue-box">Wait for the assembly to quiet down completely before opening with clear, confident pacing.</div>
        <p>"Good morning, everyone.</p>
        <p>When people talk about Black British history, many assume it begins in 1948 with the arrival of the Empire Windrush. We often think of it as a relatively modern story. But history tells a very different tale. Black people have lived, worked, and shaped life on this island for nearly two thousand years."</p>
        <div class="cue-box">Click clicker to advance to <strong>Slide 2: Ivory Bangle Lady</strong>.</div>
        <p>"Our first story takes us all the way back to the 4th century, to Roman Britain—in the city of York.</p>
        <p>In 1901, archaeologists uncovered a stone sarcophagus containing the skeleton of a woman. Along with her remains were expensive bracelets made of jet and elephant ivory, glass perfume bottles, and fine jewellery.</p>
        <p>Forensic analysis revealed she was of North African descent, and she lived in York around the year 350 AD. She became known as the <strong>Ivory Bangle Lady</strong>. She wasn’t an enslaved person or an outsider; she was a wealthy, high-status member of Roman British society. Her presence proves that Britain was multicultural long before it was even called Great Britain."</p>
      </div>
    </div>

    <!-- SECTION 2 -->
    <div class="section-card">
      <div class="section-header">
        <span class="speaker-badge spk-2">PUPIL 2 • Tudor Royal Court (1511)</span>
        <span class="slide-trigger">Advance to: Slide 3 (Westminster Tournament Roll)</span>
      </div>
      <div class="section-body">
        <p>"Move forward a thousand years to Tudor England, and we find another remarkable figure: <strong>John Blanke</strong>.</p>
        <p>John Blanke was a gifted musician who served as a regular trumpeter in the royal courts of both King Henry VII and King Henry VIII.</p>
        <p>We don't just know about him from written records—we can actually see him. In 1511, Henry VIII held a massive tournament to celebrate the birth of a royal son. An illuminated 60-foot scroll called the <em>Westminster Tournament Roll</em> was created to document the occasion. Twice on that scroll, John Blanke is painted riding a horse, wearing royal Tudor livery and playing his trumpet alongside the other royal musicians.</p>
        <p>Court records also show something fascinating about his character: he wrote a petition directly to King Henry VIII asking for a pay rise—and the King approved it. John Blanke was a respected professional at the very centre of royal court ceremony."</p>
      </div>
    </div>
  </div>

  <div class="footer">
    <span>The History Revision Hub • Whole School Assembly Resource</span>
    <span>Turn over for Side 2 (Pupils 3, 4, and Shared Conclusion) • Page 1 of 2</span>
  </div>
</div>

<!-- PAGE 2: PUPILS 3 & 4 AND SHARED CONCLUSION -->
<div class="page">
  <div class="header">
    <div class="title-group">
      <h1>Beyond the Single Story: Deep Roots of Black British History</h1>
      <p>Whole School Assembly Delivery Script • 4 Speakers • Total Delivery: ~8–10 Minutes</p>
    </div>
    <div class="meta-badge">
      SIDE 2: PUPILS 3 & 4 + CONCLUSION
    </div>
  </div>

  <div class="content-area">
    <!-- SECTION 3 -->
    <div class="section-card">
      <div class="section-header">
        <span class="speaker-badge spk-3">PUPIL 3 • Civil Rights Pioneer (1904–1947)</span>
        <span class="slide-trigger">Advance to: Slide 4 (Dr. Harold Moody)</span>
      </div>
      <div class="section-body">
        <p>"Fast-forward to London in the early 20th century, and meet <strong>Dr. Harold Moody</strong>.</p>
        <p>Born in Jamaica, Harold arrived in Britain in 1904 to study medicine at King’s College London. He graduated top of his class and won numerous medical prizes. Yet, when he applied for doctor roles in London hospitals, he was repeatedly turned down simply because of the colour of his skin.</p>
        <p>Instead of giving up, Dr. Moody opened his own private GP surgery in Peckham, South London, in 1913. He became beloved by the local community because he treated poor families for free when they couldn't afford medicine.</p>
        <p>In 1931, seeing how Black people in Britain faced unfair barriers in finding jobs and renting homes, he founded the <strong>League of Coloured Peoples</strong>. Dr. Moody campaigned tirelessly for decades, successfully challenging discriminatory housing policies and racist employment bans. He laid the direct groundwork for Britain’s modern race relations laws."</p>
      </div>
    </div>

    <!-- SECTION 4 -->
    <div class="section-card">
      <div class="section-header">
        <span class="speaker-badge spk-4">PUPIL 4 • Rebuilding Modern Britain (1948)</span>
        <span class="slide-trigger">Advance to: Slide 5 (Empire Windrush & NHS)</span>
      </div>
      <div class="section-body">
        <p>"That brings us to 1948 and the <strong>Empire Windrush</strong>.</p>
        <p>After the Second World War, Britain was devastated by bombing and facing a massive shortage of workers to rebuild towns, run transport systems, and staff hospitals. The British government invited citizens from across the Commonwealth to come and help rebuild the country. Hundreds of Caribbean men, women, and families answered that call.</p>
        <p>They became the engine room of modern Britain. They drove the buses, laid the railway tracks, and became the backbone of our newly founded National Health Service. They also enriched British music, literature, food, and culture, turning events like the Notting Hill Carnival into celebrations known across the world. Their resilience and contribution shaped the public services we all depend on every single day."</p>
      </div>
    </div>

    <!-- SECTION 5: CONCLUSION -->
    <div class="section-card" style="margin-bottom: 0;">
      <div class="section-header">
        <span class="speaker-badge spk-all">ALL 4 PUPILS • Conclusion & Whole School Reflection</span>
        <span class="slide-trigger">Advance to: Slide 6 (Reflection: "How Deep Do Our Shared Roots Go?")</span>
      </div>
      <div class="section-body">
        <div class="conclusion-grid">
          <div class="conclusion-box">
            <strong style="color:#991b1b;">PUPIL 1:</strong>
            <p>"So why does this matter? Because history is not just about isolated dates; it is about belonging. From the Roman streets of York to the Tudor royal court, and from a community doctor’s surgery in South London to the arrival of the Windrush—Black history is not a separate topic tucked away for one month of the year. It is part of the deep, continuous story of Britain itself."</p>
          </div>
          <div class="conclusion-box">
            <strong style="color:#92400e;">PUPIL 2:</strong>
            <p>"As we head into our day, let's remember that Britain’s story has always been built by people from diverse backgrounds working, creating, and standing together."</p>
          </div>
        </div>

        <div class="conclusion-grid" style="margin-top: 6px;">
          <div class="conclusion-box">
            <strong style="color:#166534;">PUPIL 3:</strong>
            <p>"Take ten seconds of quiet now to reflect on how learning our full, shared history helps us build a stronger community today."</p>
          </div>
          <div class="conclusion-box">
            <strong style="color:#1e40af;">PUPIL 4:</strong>
            <p>"Thank you for your attention. Have a great day, everyone."</p>
          </div>
        </div>

        <div class="silence-banner">
          ⏱️ [ALL 4 PUPILS STAND STILL & QUIET FOR 10 SECONDS OF WHOLE-HALL SILENCE] ⏱️
        </div>
      </div>
    </div>
  </div>

  <div class="footer">
    <span>The History Revision Hub • Whole School Assembly Resource</span>
    <span>PowerPoint Companion: assembly_beyond_the_single_story.pptx • Page 2 of 2</span>
  </div>
</div>

</body>
</html>
  `;

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const pdfPath = path.join(
    __dirname,
    '..',
    'public',
    'pdfs',
    'assembly_beyond_the_single_story_pupil_script.pdf',
  );
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
  });

  await browser.close();
  console.log(`✅ Saved 2-page Pupil Prompt Script PDF to: ${pdfPath}`);

  // Mirror to Google Drive
  const driveDir = 'G:\\My Drive\\AAMX\\Dep File\\00_Department_Admin_and_Policies';
  const driveOut = path.join(driveDir, 'Beyond_the_Single_Story_Pupil_Script.pdf');
  if (fs.existsSync(driveDir)) {
    fs.copyFileSync(pdfPath, driveOut);
    console.log(`✅ Mirrored Pupil Prompt Script PDF to Google Drive: ${driveOut}`);
  }
}

generateScriptPdf().catch((err) => {
  console.error('Error generating script PDF:', err);
  process.exit(1);
});
