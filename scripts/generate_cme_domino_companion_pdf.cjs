const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generateCmeDominoCompanionPdf() {
  console.log(
    '📄 Compiling 1-Page A4 Causal Domino Note-Taking Companion for Lesson 4 (Suez Crisis)...',
  );

  const outputPath = path.resolve('public/pdfs/CME_Lesson_4_Causal_Domino_Note_Companion.pdf');
  const previewImgPath = path.resolve(
    'public/pdfs/CME_Lesson_4_Causal_Domino_Note_Companion_preview.png',
  );

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CME Lesson 4: Causal Domino Note-Taking Companion</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page {
      size: A4 portrait;
      margin: 8mm 10mm 8mm 10mm;
    }
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      font-size: 8pt;
      line-height: 1.25;
      color: #0f172a;
      margin: 0;
      padding: 0;
      background: #ffffff;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .page-container {
      width: 100%;
      height: 281mm;
      max-height: 281mm;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #ffffff;
      box-sizing: border-box;
      padding: 2mm 0;
    }
    .serif {
      font-family: 'Playfair Display', Georgia, serif;
    }
    /* Ruled writing lines (7mm high for handwriting legibility) */
    .ruled-line {
      border-bottom: 1.3px solid #94a3b8;
      height: 7.0mm;
      width: 100%;
      margin: 0;
    }
    .domino-card {
      border: 1.5px solid #cbd5e1;
      border-radius: 5px;
      padding: 6px 9px;
      background: #ffffff;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    }
    /* Commercial School Brand Customizer */
    [data-department-name]:not([data-department-name=""]):not([data-department-name="The History Department"]):not([data-department-name="History Department"]) .school-brand-target {
      display: inline-block;
      font-size: 0 !important;
    }
    [data-department-name]:not([data-department-name=""]):not([data-department-name="The History Department"]):not([data-department-name="History Department"]) .school-brand-target::after {
      content: attr(data-department-name);
      font-size: 9.5pt !important;
      letter-spacing: 1.5px;
    }
  </style>
</head>
<body>
  <div class="page-container">
    <!-- Top Departmental Header -->
    <div style="border-bottom: 2px solid #0f172a; padding-bottom: 3px; margin-bottom: 4px;" data-department-name="The History Department">
      <div style="display: flex; justify-content: space-between; align-items: baseline;">
        <span class="school-brand-target" style="font-size: 10pt; font-weight: 900; letter-spacing: 1.5px; text-transform: uppercase; color: #0f172a;">The History Department</span>
        <span style="font-size: 7.5pt; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: #475569;">GCSE History Revision Hub &bull; Causal Domino Note Companion</span>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 1px; border-top: 1px solid #cbd5e1; padding-top: 2px;">
        <span style="font-size: 7pt; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase; color: #334155;">EDEXCEL GCSE (9–1) HISTORY &bull; PAPER 2: CONFLICT IN THE MIDDLE EAST, 1945–1995</span>
        <span style="font-size: 7pt; font-weight: 800; color: #0284c7;">SPECIFICATION 1HI0/2B &bull; SECTION B NARRATIVE BRIDGE</span>
      </div>
    </div>

    <!-- Lesson Title & Enquiry Header -->
    <div style="border: 1.5px solid #0f172a; border-radius: 4px; padding: 5px 9px; background: #f8fafc; margin-bottom: 5px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 6px;">
          <span style="background: #0f172a; color: #ffffff; font-size: 7pt; font-weight: 900; padding: 2px 7px; border-radius: 3px; text-transform: uppercase; letter-spacing: 0.5px;">LESSON 4</span>
          <span style="font-size: 7pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #475569;">KEY TOPIC 1.3 &bull; CAUSAL TURNING POINTS</span>
        </div>
        <div style="font-size: 7.2pt; font-weight: 800; color: #0369a1; text-transform: uppercase; letter-spacing: 0.5px;">
          Edexcel Q2 Narrative Account [8m] &bull; Q1 Consequence [4m]
        </div>
      </div>
      <h1 class="serif" style="font-size: 13.5pt; font-weight: 900; margin: 3px 0 2px 0; color: #0f172a; line-height: 1.15;">
        The 1956 Suez Crisis: 5-Stage Causal Domino Chain
      </h1>
      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 7.4pt; color: #334155;">
        <span><strong>The 3-Step Disciplinary Rule:</strong> 1. Record <strong>Action</strong> &rarr; 2. Record <strong>"Because" (Motive)</strong> &rarr; 3. Record <strong>"Therefore" (Consequence)</strong> that sparks the next stage.</span>
        <span style="font-weight: 700; color: #0f172a;">Pupil Name: <span style="display: inline-block; width: 42mm; border-bottom: 1.2px solid #000;"></span></span>
      </div>
    </div>

    <!-- The 5 Domino Stages (Vertical Chain with space-between distribution) -->
    <div style="display: flex; flex-direction: column; justify-content: space-between; flex: 1; min-height: 0;">

      <!-- ==================== STAGE 1 ==================== -->
      <div class="domino-card" style="border-left: 5px solid #0284c7;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="background: #0f172a; color: #fff; font-size: 6.5pt; font-weight: 900; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase;">STAGE 1</span>
              <span style="font-size: 7.5pt; font-weight: 800; color: #0284c7;">February 1955</span>
              <span style="font-size: 7pt; font-weight: 700; color: #64748b; text-transform: uppercase;">THE SPARK &bull; Israel & Egypt</span>
            </div>
            <span style="font-size: 7pt; font-weight: 800; color: #dc2626;">Paper 2 Target: Q1 Consequence [4m]</span>
          </div>
          <div class="serif" style="font-size: 10.5pt; font-weight: 800; color: #0f172a; margin-bottom: 3px;">1. The Gaza Raid</div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1.15fr 1.15fr; gap: 8px; align-items: stretch; flex: 1;">
          <!-- Action -->
          <div style="background: #f8fafc; border: 1.2px solid #e2e8f0; border-radius: 4px; padding: 4px 6px; font-size: 7.3pt; color: #1e293b; line-height: 1.35; display: flex; flex-direction: column; justify-content: center;">
            <strong style="color: #0369a1; text-transform: uppercase; font-size: 6.5pt; display: block; margin-bottom: 2px;">1. Trigger / Action:</strong>
            Israeli paratroopers launch surprise raid into Gaza, killing 37 Egyptian soldiers in retaliation for cross-border Fedayeen raids.
          </div>
          <!-- Because -->
          <div style="background: #fefce8; border: 1.2px solid #fef08a; border-radius: 4px; padding: 3px 6px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-size: 6.5pt; font-weight: 800; color: #854d0e; text-transform: uppercase;">2. "Because" (Why did Israel & Ben-Gurion act?):</div>
            <div class="ruled-line"></div>
            <div class="ruled-line"></div>
            <div class="ruled-line"></div>
          </div>
          <!-- Therefore -->
          <div style="background: #f0fdf4; border: 1.2px solid #bbf7d0; border-radius: 4px; padding: 3px 6px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-size: 6.5pt; font-weight: 800; color: #166534; text-transform: uppercase;">3. "Therefore" (How did Nasser respond?):</div>
            <div class="ruled-line"></div>
            <div class="ruled-line"></div>
            <div class="ruled-line"></div>
          </div>
        </div>
      </div>

      <!-- Connector 1 -> 2 -->
      <div style="text-align: center; font-size: 7.2pt; font-weight: 800; color: #1e40af; padding: 1px 0;">
        &darr; In direct reaction to this humiliation, Nasser looked elsewhere for modern arms...
      </div>

      <!-- ==================== STAGE 2 ==================== -->
      <div class="domino-card" style="border-left: 5px solid #0284c7;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="background: #0f172a; color: #fff; font-size: 6.5pt; font-weight: 900; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase;">STAGE 2</span>
              <span style="font-size: 7.5pt; font-weight: 800; color: #0284c7;">September 1955</span>
              <span style="font-size: 7pt; font-weight: 700; color: #64748b; text-transform: uppercase;">COLD WAR SHIFT &bull; Egypt & Soviet Bloc</span>
            </div>
            <span style="font-size: 7pt; font-weight: 800; color: #dc2626;">Paper 2 Target: Q2 Narrative Link 1 &rarr; 2</span>
          </div>
          <div class="serif" style="font-size: 10.5pt; font-weight: 800; color: #0f172a; margin-bottom: 3px;">2. The Czech Arms Deal</div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1.15fr 1.15fr; gap: 8px; align-items: stretch; flex: 1;">
          <!-- Action -->
          <div style="background: #f8fafc; border: 1.2px solid #e2e8f0; border-radius: 4px; padding: 4px 6px; font-size: 7.3pt; color: #1e293b; line-height: 1.35; display: flex; flex-direction: column; justify-content: center;">
            <strong style="color: #0369a1; text-transform: uppercase; font-size: 6.5pt; display: block; margin-bottom: 2px;">1. Trigger / Action:</strong>
            Nasser purchases 200 Soviet MiG-15 fighter jets, 300 tanks, and bombers via Czechoslovakia, shattering Western monopoly.
          </div>
          <!-- Because -->
          <div style="background: #fefce8; border: 1.2px solid #fef08a; border-radius: 4px; padding: 3px 6px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-size: 6.5pt; font-weight: 800; color: #854d0e; text-transform: uppercase;">2. "Because" (Why buy from Soviets instead of West?):</div>
            <div class="ruled-line"></div>
            <div class="ruled-line"></div>
            <div class="ruled-line"></div>
          </div>
          <!-- Therefore -->
          <div style="background: #f0fdf4; border: 1.2px solid #bbf7d0; border-radius: 4px; padding: 3px 6px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-size: 6.5pt; font-weight: 800; color: #166534; text-transform: uppercase;">3. "Therefore" (How did the US & Britain react?):</div>
            <div class="ruled-line"></div>
            <div class="ruled-line"></div>
            <div class="ruled-line"></div>
          </div>
        </div>
      </div>

      <!-- Connector 2 -> 3 -->
      <div style="text-align: center; font-size: 7.2pt; font-weight: 800; color: #1e40af; padding: 1px 0;">
        &darr; Alarmed by Soviet weapons and Communist ties, Washington retaliated economically...
      </div>

      <!-- ==================== STAGE 3 ==================== -->
      <div class="domino-card" style="border-left: 5px solid #0284c7;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="background: #0f172a; color: #fff; font-size: 6.5pt; font-weight: 900; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase;">STAGE 3</span>
              <span style="font-size: 7.5pt; font-weight: 800; color: #0284c7;">July 1956</span>
              <span style="font-size: 7pt; font-weight: 700; color: #64748b; text-transform: uppercase;">THE ECONOMIC TRIGGER &bull; USA, Britain & Egypt</span>
            </div>
            <span style="font-size: 7pt; font-weight: 800; color: #dc2626;">Paper 2 Target: Q2 Narrative Link 2 &rarr; 3 &bull; Q3 Importance</span>
          </div>
          <div class="serif" style="font-size: 10.5pt; font-weight: 800; color: #0f172a; margin-bottom: 3px;">3. Dam Loans Pulled & Suez Canal Seized</div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1.15fr 1.15fr; gap: 8px; align-items: stretch; flex: 1;">
          <!-- Action -->
          <div style="background: #f8fafc; border: 1.2px solid #e2e8f0; border-radius: 4px; padding: 4px 6px; font-size: 7.3pt; color: #1e293b; line-height: 1.35; display: flex; flex-direction: column; justify-content: center;">
            <strong style="color: #0369a1; text-transform: uppercase; font-size: 6.5pt; display: block; margin-bottom: 2px;">1. Trigger / Action:</strong>
            US pulls $70m Aswan Dam loan (19 July); Nasser nationalises Suez Canal in Alexandria (26 July) to fund the dam.
          </div>
          <!-- Because -->
          <div style="background: #fefce8; border: 1.2px solid #fef08a; border-radius: 4px; padding: 3px 6px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-size: 6.5pt; font-weight: 800; color: #854d0e; text-transform: uppercase;">2. "Because" (Why did Nasser seize the canal tolls?):</div>
            <div class="ruled-line"></div>
            <div class="ruled-line"></div>
            <div class="ruled-line"></div>
          </div>
          <!-- Therefore -->
          <div style="background: #f0fdf4; border: 1.2px solid #bbf7d0; border-radius: 4px; padding: 3px 6px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-size: 6.5pt; font-weight: 800; color: #166534; text-transform: uppercase;">3. "Therefore" (How did British PM Eden resolve to act?):</div>
            <div class="ruled-line"></div>
            <div class="ruled-line"></div>
            <div class="ruled-line"></div>
          </div>
        </div>
      </div>

      <!-- Connector 3 -> 4 -->
      <div style="text-align: center; font-size: 7.2pt; font-weight: 800; color: #1e40af; padding: 1px 0;">
        &darr; Outraged by the loss of imperial oil transit, Britain, France and Israel colluded secretly...
      </div>

      <!-- ==================== STAGE 4 ==================== -->
      <div class="domino-card" style="border-left: 5px solid #0284c7;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="background: #0f172a; color: #fff; font-size: 6.5pt; font-weight: 900; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase;">STAGE 4</span>
              <span style="font-size: 7.5pt; font-weight: 800; color: #0284c7;">October–November 1956</span>
              <span style="font-size: 7pt; font-weight: 700; color: #64748b; text-transform: uppercase;">THE TRIPARTITE CONSPIRACY &bull; Britain, France & Israel</span>
            </div>
            <span style="font-size: 7pt; font-weight: 800; color: #dc2626;">Paper 2 Target: Q2 Narrative Link 3 &rarr; 4</span>
          </div>
          <div class="serif" style="font-size: 10.5pt; font-weight: 800; color: #0f172a; margin-bottom: 3px;">4. The Secret Sèvres Agreement & Invasion</div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1.15fr 1.15fr; gap: 8px; align-items: stretch; flex: 1;">
          <!-- Action -->
          <div style="background: #f8fafc; border: 1.2px solid #e2e8f0; border-radius: 4px; padding: 4px 6px; font-size: 7.3pt; color: #1e293b; line-height: 1.35; display: flex; flex-direction: column; justify-content: center;">
            <strong style="color: #0369a1; text-transform: uppercase; font-size: 6.5pt; display: block; margin-bottom: 2px;">1. Trigger / Action:</strong>
            Secret collusion pact signed outside Paris; Israel attacks Sinai (29 Oct); Anglo-French invade Port Said (5 Nov).
          </div>
          <!-- Because -->
          <div style="background: #fefce8; border: 1.2px solid #fef08a; border-radius: 4px; padding: 3px 6px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-size: 6.5pt; font-weight: 800; color: #854d0e; text-transform: uppercase;">2. "Because" (What false pretext was fabricated?):</div>
            <div class="ruled-line"></div>
            <div class="ruled-line"></div>
            <div class="ruled-line"></div>
          </div>
          <!-- Therefore -->
          <div style="background: #f0fdf4; border: 1.2px solid #bbf7d0; border-radius: 4px; padding: 3px 6px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-size: 6.5pt; font-weight: 800; color: #166534; text-transform: uppercase;">3. "Therefore" (How did Egypt block the waterway?):</div>
            <div class="ruled-line"></div>
            <div class="ruled-line"></div>
            <div class="ruled-line"></div>
          </div>
        </div>
      </div>

      <!-- Connector 4 -> 5 -->
      <div style="text-align: center; font-size: 7.2pt; font-weight: 800; color: #1e40af; padding: 1px 0;">
        &darr; Furious that allies attacked without consultation during the Hungarian crisis, the US intervened...
      </div>

      <!-- ==================== STAGE 5 ==================== -->
      <div class="domino-card" style="border-left: 5px solid #10b981;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="background: #0f172a; color: #fff; font-size: 6.5pt; font-weight: 900; padding: 1.5px 6px; border-radius: 2px; text-transform: uppercase;">STAGE 5</span>
              <span style="font-size: 7.5pt; font-weight: 800; color: #10b981;">Nov 1956 – Mar 1957</span>
              <span style="font-size: 7pt; font-weight: 700; color: #64748b; text-transform: uppercase;">CLIMAX & AFTERMATH &bull; USA, UN & Global Order</span>
            </div>
            <span style="font-size: 7pt; font-weight: 800; color: #dc2626;">Paper 2 Target: Q1 Consequence &bull; Q3 Importance</span>
          </div>
          <div class="serif" style="font-size: 10.5pt; font-weight: 800; color: #0f172a; margin-bottom: 3px;">5. US Ultimatum & UNEF Peacekeeper Deployment</div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1.15fr 1.15fr; gap: 8px; align-items: stretch; flex: 1;">
          <!-- Action -->
          <div style="background: #f8fafc; border: 1.2px solid #e2e8f0; border-radius: 4px; padding: 4px 6px; font-size: 7.3pt; color: #1e293b; line-height: 1.35; display: flex; flex-direction: column; justify-content: center;">
            <strong style="color: #0369a1; text-transform: uppercase; font-size: 6.5pt; display: block; margin-bottom: 2px;">1. Trigger / Action:</strong>
            Eisenhower threatens to collapse the British pound unless troops withdraw; UN deploys UNEF buffer to Sinai.
          </div>
          <!-- Because -->
          <div style="background: #fefce8; border: 1.2px solid #fef08a; border-radius: 4px; padding: 3px 6px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-size: 6.5pt; font-weight: 800; color: #854d0e; text-transform: uppercase;">2. "Because" (Why was Eisenhower furious at his allies?):</div>
            <div class="ruled-line"></div>
            <div class="ruled-line"></div>
            <div class="ruled-line"></div>
          </div>
          <!-- Therefore -->
          <div style="background: #f0fdf4; border: 1.2px solid #bbf7d0; border-radius: 4px; padding: 3px 6px; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="font-size: 6.5pt; font-weight: 800; color: #166534; text-transform: uppercase;">3. "Therefore" (What was the impact on Britain & Nasser?):</div>
            <div class="ruled-line"></div>
            <div class="ruled-line"></div>
            <div class="ruled-line"></div>
          </div>
        </div>
      </div>

    </div>

    <!-- Bottom Verification & Self-Assessment Footer -->
    <div style="border-top: 1.5px solid #0f172a; padding-top: 3px; margin-top: 4px; display: flex; justify-content: space-between; align-items: center; font-size: 7pt; color: #475569;">
      <div style="display: flex; gap: 14px; font-weight: 700;">
        <span><input type="checkbox" style="vertical-align: middle; margin-right: 2px;"> All 5 Domino Stages Completed</span>
        <span><input type="checkbox" style="vertical-align: middle; margin-right: 2px;"> Motive ("Because") distinguished from Action</span>
        <span><input type="checkbox" style="vertical-align: middle; margin-right: 2px;"> Ready for 8-Mark Narrative Account</span>
      </div>
      <div>
        <span style="font-weight: 800; color: #0f172a;">GCSE History Revision Hub</span> &bull; <em>Independent Educational Publication</em>
      </div>
    </div>
  </div>
</body>
</html>`;

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  // Render high-res PDF
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
  });

  // Also capture preview image for instant visual verification
  await page.setViewport({ width: 1240, height: 1754, deviceScaleFactor: 2 });
  await page.screenshot({ path: previewImgPath, fullPage: true });

  await browser.close();

  console.log(`✅ Successfully generated: ${outputPath}`);
  console.log(`🖼️ Preview screenshot saved to: ${previewImgPath}`);
}

generateCmeDominoCompanionPdf().catch((err) => {
  console.error('❌ Error generating PDF:', err);
  process.exit(1);
});
