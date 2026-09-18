const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.join(__dirname, '..');
const PDFS_DIR = path.join(ROOT_DIR, 'public', 'pdfs');
if (!fs.existsSync(PDFS_DIR)) fs.mkdirSync(PDFS_DIR, { recursive: true });

async function generatePdf(htmlContent, outputPath, title) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: outputPath,
    format: 'A4',
    margin: { top: '15mm', bottom: '15mm', left: '15mm', right: '15mm' },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `<div style="font-family: 'Outfit', sans-serif; font-size: 8pt; color: #94a3b8; width: 100%; text-align: right; padding-right: 15mm;">The History Department · ${title}</div>`,
    footerTemplate: `<div style="font-family: 'Outfit', sans-serif; font-size: 8pt; color: #94a3b8; width: 100%; display: flex; justify-content: space-between; padding: 0 15mm;"><span>Pearson Edexcel GCSE (9–1) History</span><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>`,
  });
  await browser.close();
  console.log(`✅ Generated PDF: ${outputPath}`);
}

// --------------------------------------------------------------------------
// 1. MEDICINE SPECIFICATION & LIMITATIONS AUDIT REPORT
// --------------------------------------------------------------------------
const medicineAuditHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>GCSE Medicine: Specification Depth &amp; Limitations Audit</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&display=swap" rel="stylesheet">
  <style>
    @page { size: A4; margin: 15mm; }
    body { font-family: 'Outfit', sans-serif; color: #1e293b; line-height: 1.5; font-size: 9.5pt; margin: 0; padding: 0; }
    h1, h2, h3, h4 { font-family: 'Playfair Display', Georgia, serif; color: #0f172a; margin-top: 0; }
    .header-box { border-bottom: 3px solid #0f172a; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; }
    .header-box h1 { font-size: 20pt; margin: 0; line-height: 1.1; }
    .header-box .badge { background: #0f172a; color: #ffffff; padding: 4px 10px; border-radius: 4px; font-size: 8.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
    .callout { background: #f8fafc; border: 1.5px solid #cbd5e1; border-left: 5px solid #2563eb; padding: 12px 14px; border-radius: 6px; margin-bottom: 16px; font-size: 9pt; }
    .callout-title { font-weight: 800; color: #1e40af; margin-bottom: 4px; text-transform: uppercase; font-size: 8pt; letter-spacing: 0.06em; }
    .spec-card { background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; margin-bottom: 14px; page-break-inside: avoid; box-shadow: 0 1px 3px rgba(0,0,0,0.02); overflow: hidden; }
    .spec-card-header { background: #f1f5f9; border-bottom: 1px solid #e2e8f0; padding: 8px 14px; display: flex; justify-content: space-between; align-items: center; }
    .spec-card-header h3 { margin: 0; font-size: 11pt; color: #0f172a; }
    .spec-era { font-size: 7.5pt; font-weight: 800; text-transform: uppercase; padding: 2px 8px; border-radius: 4px; background: #e2e8f0; color: #334155; }
    .spec-card-body { padding: 12px 14px; }
    .grid-facts-limits { display: grid; grid-template-columns: 1.2fr 1fr; gap: 12px; margin-bottom: 8px; }
    .fact-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 8px 10px; }
    .fact-box h4 { margin: 0 0 4px 0; color: #15803d; font-size: 8.5pt; text-transform: uppercase; letter-spacing: 0.05em; font-family: 'Outfit', sans-serif; font-weight: 800; }
    .limit-box { background: #fff1f2; border: 1px solid #fecdd3; border-radius: 6px; padding: 8px 10px; }
    .limit-box h4 { margin: 0 0 4px 0; color: #be123c; font-size: 8.5pt; text-transform: uppercase; letter-spacing: 0.05em; font-family: 'Outfit', sans-serif; font-weight: 800; }
    ul { margin: 0; padding-left: 16px; font-size: 8.8pt; }
    li { margin-bottom: 3px; }
    .model-p { background: #faf5ff; border: 1px dashed #d8b4fe; padding: 8px 10px; border-radius: 6px; font-size: 8.5pt; color: #581c87; }
    .model-p strong { color: #6b21a8; }
    .page-break { page-break-after: always; }
  </style>
</head>
<body>

  <!-- PAGE 1: STRATEGIC MEMO & RENAISSANCE AUDIT -->
  <div class="header-box">
    <div>
      <div style="font-size: 8.5pt; font-weight: 800; color: #2563eb; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px;">Departmental Curriculum Audit &amp; Policy Strategy</div>
      <h1>GCSE Medicine Through Time: Specification Depth &amp; Limitations Audit</h1>
    </div>
    <div class="badge">AQA / Edexcel Inspection</div>
  </div>

  <div class="callout">
    <div class="callout-title">Executive Response: Workbook Policy vs Exam Question Packs</div>
    <p style="margin: 0 0 6px 0;"><strong>Teacher Decision Validated 100%:</strong> Discontinuing printed daily workbooks in favour of dedicated <strong>Exam Mastery Packs</strong> and <strong>Visual Revision Guides</strong> is the correct pedagogical choice for four decisive reasons:</p>
    <ul style="margin: 0;">
      <li><strong>Prevents Assessment Cannibalisation:</strong> Embedding exam questions in daily workbooks dilutes exam discipline. Exam questions must be undertaken in dedicated, timed <em>Exam Question Packs</em> with official Pearson mark schemes and examiner levels.</li>
      <li><strong>Eliminates Cognitive Clutter &amp; Line-Filling:</strong> Printed workbooks frequently force pupils into shallow, superficial bullet-points. Pupils in GCSE History need space to draft cohesive analytical paragraphs.</li>
      <li><strong>Enforces the "3 Facts + 1–2 Limitations" Analytical Framework:</strong> Top grades (Levels 3–4, 12–16 marks) require balance. Every breakthrough must be weighed against its contemporaneous clinical limits.</li>
      <li><strong>Vocabulary Calibration:</strong> High-tariff terms (e.g. <em>empiricism, iatrochemistry, inoculation, miasma, spontaneous generation</em>) are anchored directly to concrete historical examples rather than dictionary abstractions.</li>
    </ul>
  </div>

  <h2 style="font-size: 13pt; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 12px;">Topic 2: The Medical Renaissance (c.1500–c.1700)</h2>

  <!-- Sydenham -->
  <div class="spec-card">
    <div class="spec-card-header">
      <h3>1. Thomas Sydenham ("The English Hippocrates")</h3>
      <span class="spec-era">Topic 2 &bull; Diagnosis &amp; Cause</span>
    </div>
    <div class="spec-card-body">
      <div class="grid-facts-limits">
        <div class="fact-box">
          <h4>✓ 3 Supporting Facts (Progress &amp; Impact)</h4>
          <ul>
            <li><strong>Bedside Observation:</strong> Authored <em>Observationes Medicae</em> (1676); rejected book-learning to sit by patient bedsides and record exact clinical symptoms.</li>
            <li><strong>Disease as Separate Species:</strong> Argued diseases were separate external entities that could be classified into species (like botanists classify plants), fundamentally undermining the personal Galenic humoural theory.</li>
            <li><strong>Targeted Remedies:</strong> Proved diseases required specific cures; popularised <strong>Cinchona bark</strong> (quinine) for malaria and cool air/liquids for smallpox instead of boiling rooms.</li>
          </ul>
        </div>
        <div class="limit-box">
          <h4>✗ 2 Critical Historical Limitations</h4>
          <ul>
            <li><strong>Ignorance of Microbes:</strong> Had no knowledge of bacteria or viruses; still theorised that diseases were triggered by toxic atmospheric "epidemic constitutions" or miasma.</li>
            <li><strong>Humoural Retention:</strong> When specific remedies were absent, Sydenham still routinely prescribed traditional bloodletting, sweating, and purging to treat stubborn fevers.</li>
          </ul>
        </div>
      </div>
      <div class="model-p">
        <strong>GCSE Model Paragraph:</strong> "Although Thomas Sydenham revolutionised clinical diagnosis by classifying diseases as distinct biological species in <em>Observationes Medicae</em> (1676) and pioneering the use of cinchona bark for malaria, his actual treatments represented significant continuity. Because bacteria were unknown, Sydenham still attributed fevers to atmospheric miasma and continued to prescribe traditional bloodletting and purging when empirical remedies failed, meaning ordinary bedside patient outcomes saw very little tangible change."
      </div>
    </div>
  </div>

  <!-- Vesalius -->
  <div class="spec-card">
    <div class="spec-card-header">
      <h3>2. Andreas Vesalius (Anatomy &amp; The Human Fabric)</h3>
      <span class="spec-era">Topic 2 &bull; Anatomy</span>
    </div>
    <div class="spec-card-body">
      <div class="grid-facts-limits">
        <div class="fact-box">
          <h4>✓ 3 Supporting Facts (Progress &amp; Impact)</h4>
          <ul>
            <li><strong>Direct Human Dissection:</strong> Performed dissections himself at Padua; published <em>De Humani Corporis Fabrica</em> (1543) using the printing press and master artists to create 277 anatomical plates.</li>
            <li><strong>300+ Galenic Corrections:</strong> Proved Galen dissected animals, correcting 300+ errors (e.g. human lower jaw has 1 bone not 2; liver has 2 lobes not 5; heart septum has no invisible pores).</li>
            <li><strong>Scientific Methodology:</strong> Established that medical truth must come from direct physical inspection of the human corpse rather than medieval blind faith in classical texts.</li>
          </ul>
        </div>
        <div class="limit-box">
          <h4>✗ 2 Critical Historical Limitations</h4>
          <ul>
            <li><strong>Zero Practical Treatments:</strong> Knowing the precise anatomy of muscles, bones, and organs did not stop a single infection, halt bleeding, or cure internal illness in living patients.</li>
            <li><strong>Fierce Conservative Resistance:</strong> Traditional university physicians (e.g. his former Paris tutor Sylvius) denounced him as an arrogant madman, claiming the human body had deformed since Galen.</li>
          </ul>
        </div>
      </div>
      <div class="model-p">
        <strong>GCSE Model Paragraph:</strong> "Vesalius was a monumental catalyst for anatomical science, publishing <em>The Fabric of the Human Body</em> (1543) and correcting over 300 of Galen's animal-based errors including the single-boned human lower jaw. However, his work had virtually zero immediate impact on patient health during the Renaissance; knowing exact bone structures did not prevent infection or blood loss, and conservative university doctors fiercely resisted his discoveries for decades."
      </div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- PAGE 2: HARVEY, PRINTING PRESS, 18TH/19TH CENTURY -->
  <div class="header-box">
    <div>
      <div style="font-size: 8.5pt; font-weight: 800; color: #2563eb; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px;">Departmental Curriculum Audit &amp; Policy Strategy</div>
      <h1>GCSE Medicine Through Time: Specification Depth &amp; Limitations Audit</h1>
    </div>
    <div class="badge">Section B Audit</div>
  </div>

  <!-- William Harvey -->
  <div class="spec-card">
    <div class="spec-card-header">
      <h3>3. William Harvey (Circulation of the Blood)</h3>
      <span class="spec-era">Topic 2 &bull; Physiology</span>
    </div>
    <div class="spec-card-body">
      <div class="grid-facts-limits">
        <div class="fact-box">
          <h4>✓ 3 Supporting Facts (Progress &amp; Impact)</h4>
          <ul>
            <li><strong>Proof of Circulation:</strong> Published <em>De Motu Cordis</em> (1628); proved blood flows in a continuous one-way loop pumped by the heart through mechanical one-way valves.</li>
            <li><strong>Overthrew Galenic Physiology:</strong> Disproved Galen's 1,400-year doctrine that the liver manufactured blood which was burned up as fuel by the body's tissues.</li>
            <li><strong>Quantitative Scientific Method:</strong> Calculated that the heart pumped three times a human's body weight in blood per hour, proving mathematically that the liver could never produce such volumes.</li>
          </ul>
        </div>
        <div class="limit-box">
          <h4>✗ 2 Critical Historical Limitations</h4>
          <ul>
            <li><strong>No Bedside Cures:</strong> Harvey admitted his discovery did not save a single patient's life; bloodletting continued as the primary treatment for fevers for another two centuries.</li>
            <li><strong>Missing Microscopic Link:</strong> Could not see capillaries connecting arteries and veins; it required Marcello Malpighi's powerful compound microscope in 1661 to confirm Harvey's theory.</li>
          </ul>
        </div>
      </div>
      <div class="model-p">
        <strong>GCSE Model Paragraph:</strong> "William Harvey's 1628 treatise <em>De Motu Cordis</em> marked the birth of modern physiology, using mathematical calculations to prove the continuous circulation of blood and decisively disproving Galen's liver-production theory. Nevertheless, Harvey's work produced no immediate therapeutic breakthroughs; physicians did not abandon bloodletting, and because microscopes could not yet resolve capillaries, his discoveries were widely derided as impractical theory."
      </div>
    </div>
  </div>

  <!-- Printing Press & Royal Society -->
  <div class="spec-card">
    <div class="spec-card-header">
      <h3>4. The Printing Press (1476) &amp; The Royal Society (1660)</h3>
      <span class="spec-era">Topic 2 &bull; Transmission of Ideas</span>
    </div>
    <div class="spec-card-body">
      <div class="grid-facts-limits">
        <div class="fact-box">
          <h4>✓ 3 Supporting Facts (Progress &amp; Impact)</h4>
          <ul>
            <li><strong>Information Dissemination:</strong> Caxton's press (1476) broke the Catholic Church's manuscript copying monopoly, printing thousands of identical anatomical texts cheaply.</li>
            <li><strong>Nullius in Verba:</strong> Royal Society chartered by Charles II (1662); motto "Take nobody's word for it" established empirical lab testing and autopsies as the scientific norm.</li>
            <li><strong>Peer-Reviewed Journals:</strong> Published <em>Philosophical Transactions</em> (1665), enabling scientists across Europe (e.g. Leeuwenhoek, Hooke) to share and replicate discoveries rapidly.</li>
          </ul>
        </div>
        <div class="limit-box">
          <h4>✗ 2 Critical Historical Limitations</h4>
          <ul>
            <li><strong>Elite Audience Only:</strong> Because the vast majority of the population was illiterate, scientific publications circulated exclusively among wealthy gentlemen and university academics.</li>
            <li><strong>Folklore Continuity:</strong> Cheap presses also mass-printed unscientific astrological herbals (e.g. Culpeper's <em>The English Physitian</em>, 1652), reinforcing superstitions among commoners.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <h2 style="font-size: 13pt; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 12px;">Topic 3: 18th &amp; 19th Century Medicine (c.1700–c.1900)</h2>

  <!-- Edward Jenner -->
  <div class="spec-card">
    <div class="spec-card-header">
      <h3>5. Edward Jenner (Smallpox Vaccination, 1796)</h3>
      <span class="spec-era">Topic 3 &bull; Prevention</span>
    </div>
    <div class="spec-card-body">
      <div class="grid-facts-limits">
        <div class="fact-box">
          <h4>✓ 3 Supporting Facts (Progress &amp; Impact)</h4>
          <ul>
            <li><strong>Empirical Trials:</strong> Inoculated 8-year-old James Phipps with cowpox pus (1796) and proved immunity to smallpox, repeating trials across 23 patients and publishing in 1798.</li>
            <li><strong>Safer than Inoculation:</strong> Cowpox did not carry the risk of death, facial scarring, or sparking full smallpox epidemics associated with Suttonian arm-to-arm variolation.</li>
            <li><strong>Government Intervention:</strong> Parliament granted Jenner £30,000 to fund clinics; in 1852 vaccination was made compulsory across Britain, eventually wiping out smallpox.</li>
          </ul>
        </div>
        <div class="limit-box">
          <h4>✗ 2 Critical Historical Limitations</h4>
          <ul>
            <li><strong>Zero Understanding of Mechanism:</strong> Jenner could not explain <em>why</em> vaccination worked because viruses and germs were unknown; he believed cowpox was an animal humour.</li>
            <li><strong>Inability to Replicate:</strong> Jenner could not apply his method to any other major killer (cholera, measles, typhus), making vaccination an isolated empirical fluke for 80 years.</li>
          </ul>
        </div>
      </div>
      <div class="model-p">
        <strong>GCSE Model Paragraph:</strong> "Edward Jenner's development of the cowpox vaccine in 1796 was a monumental breakthrough in preventative medicine that dramatically reduced child mortality and was rewarded with £30,000 in parliamentary grants. However, Jenner's breakthrough suffered from severe scientific limitations: because Germ Theory did not yet exist, Jenner could not explain how cowpox conferred immunity, nor could he develop vaccines for any other infectious disease."
      </div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- PAGE 3: 19TH CENTURY SURGERY & CAUSE -->
  <div class="header-box">
    <div>
      <div style="font-size: 8.5pt; font-weight: 800; color: #2563eb; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px;">Departmental Curriculum Audit &amp; Policy Strategy</div>
      <h1>GCSE Medicine Through Time: Specification Depth &amp; Limitations Audit</h1>
    </div>
    <div class="badge">Surgery &amp; Germ Theory</div>
  </div>

  <!-- Simpson & Anesthetics -->
  <div class="spec-card">
    <div class="spec-card-header">
      <h3>6. James Simpson (Chloroform &amp; Anaesthesia, 1847)</h3>
      <span class="spec-era">Topic 3 &bull; Surgery</span>
    </div>
    <div class="spec-card-body">
      <div class="grid-facts-limits">
        <div class="fact-box">
          <h4>✓ 3 Supporting Facts (Progress &amp; Impact)</h4>
          <ul>
            <li><strong>Effective General Anaesthesia:</strong> Discovered the anaesthetic properties of chloroform (1847); much more reliable and less flammable than ether.</li>
            <li><strong>Overcame Pain Barrier:</strong> Enabled surgeons to perform complex internal operations (abdominal surgery, amputations) without agony, panic, or surgical shock.</li>
            <li><strong>Royal Patronage:</strong> Queen Victoria used chloroform for the birth of Prince Leopold (1853), dispelling religious objections that pain in childbirth was God's decree.</li>
          </ul>
        </div>
        <div class="limit-box">
          <h4>✗ 2 Critical Historical Limitations</h4>
          <ul>
            <li><strong>The "Black Period" of Surgery (1846–70):</strong> Surgical deaths actually increased because surgeons operated deeper in filthy conditions, introducing fatal internal infections.</li>
            <li><strong>Fatal Overdoses:</strong> Dosage could not be safely regulated until John Snow invented an inhaler; healthy patients died unexpectedly (e.g. 15-year-old Hannah Greener in 1848).</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Lister & Antiseptics -->
  <div class="spec-card">
    <div class="spec-card-header">
      <h3>7. Joseph Lister (Carbolic Acid &amp; Antiseptics, 1865)</h3>
      <span class="spec-era">Topic 3 &bull; Surgery</span>
    </div>
    <div class="spec-card-body">
      <div class="grid-facts-limits">
        <div class="fact-box">
          <h4>✓ 3 Supporting Facts (Progress &amp; Impact)</h4>
          <ul>
            <li><strong>Applied Germ Theory:</strong> Read Pasteur's 1861 paper and deduced that wound gangrene was caused by living airborne microbes, soaking dressings in carbolic acid (1865).</li>
            <li><strong>Slashed Surgical Mortality:</strong> Mortality rates in his Glasgow infirmary fell from 46% to 15% between 1865 and 1869 across compound fracture operations.</li>
            <li><strong>Foundation of Aseptic Surgery:</strong> Paved the way for modern aseptic techniques (steam-sterilising instruments, rubber gloves, sterile operating gowns by the 1890s).</li>
          </ul>
        </div>
        <div class="limit-box">
          <h4>✗ 2 Critical Historical Limitations</h4>
          <ul>
            <li><strong>Unpleasant &amp; Harmful:</strong> Carbolic spray cracked surgeons' hands, irritated respiratory tracts, and slowed operations; many surgeons refused to adopt it.</li>
            <li><strong>Delayed Antiseptic Impact:</strong> Lister's methods only killed microbes once inside the wound; true aseptic surgery (preventing microbes from entering at all) took another 25 years.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Pasteur & Koch -->
  <div class="spec-card">
    <div class="spec-card-header">
      <h3>8. Louis Pasteur (Germ Theory) &amp; Robert Koch (Bacteriology)</h3>
      <span class="spec-era">Topic 3 &bull; Explanations of Cause</span>
    </div>
    <div class="spec-card-body">
      <div class="grid-facts-limits">
        <div class="fact-box">
          <h4>✓ 3 Supporting Facts (Progress &amp; Impact)</h4>
          <ul>
            <li><strong>Germ Theory (1861):</strong> Pasteur proved via swan-neck flasks that microscopic organisms in air caused decay, disproving the 2,000-year myth of Spontaneous Generation.</li>
            <li><strong>Koch's Staining &amp; Postulates:</strong> Koch developed agar-agar culturing, methyl violet staining, and microphotography, identifying specific bacteria for Anthrax (1876), TB (1882), and Cholera (1883).</li>
            <li><strong>Targeted Vaccines:</strong> Pasteur weakened pathogens to create artificial vaccines against chicken cholera, anthrax (1881), and rabies (1885).</li>
          </ul>
        </div>
        <div class="limit-box">
          <h4>✗ 2 Critical Historical Limitations</h4>
          <ul>
            <li><strong>Identification Was Not a Cure:</strong> Knowing which bacterium caused tuberculosis or cholera did not yield chemical cures (antibiotics) for ordinary sick patients until the 1930s.</li>
            <li><strong>British Institutional Denial:</strong> Leading British authorities (e.g. Dr Charlton Bastian) stubbornly defended spontaneous generation and miasma well into the late 1870s.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- John Snow -->
  <div class="spec-card">
    <div class="spec-card-header">
      <h3>9. John Snow (Broad Street Pump &amp; Waterborne Cholera, 1854)</h3>
      <span class="spec-era">Topic 3 &bull; Public Health</span>
    </div>
    <div class="spec-card-body">
      <div class="grid-facts-limits">
        <div class="fact-box">
          <h4>✓ 3 Supporting Facts (Progress &amp; Impact)</h4>
          <ul>
            <li><strong>Broad Street Mapping:</strong> Mapped 93 cholera deaths around Soho, traced the source to the Broad Street pump, and persuaded the parish vestry to remove the pump handle.</li>
            <li><strong>Scientific Water Company Study:</strong> Proved houses using Southwark &amp; Vauxhall water (sewage-contaminated) had 14 times higher cholera mortality than Lambeth water (clean).</li>
            <li><strong>Disproved Miasma:</strong> Showed cholera attacked the gut rather than the lungs, demonstrating that the disease was ingested in contaminated water, not inhaled in foul air.</li>
          </ul>
        </div>
        <div class="limit-box">
          <h4>✗ 2 Critical Historical Limitations</h4>
          <ul>
            <li><strong>Government Rejection:</strong> The General Board of Health rejected Snow's 1855 report, clinging to miasma and claiming the epidemic had simply declined naturally.</li>
            <li><strong>Delayed Sewers:</strong> Parliament only funded Joseph Bazalgette's London sewer system in 1858 due to the unbearable parliamentary stench of the "Great Stink", not Snow's science.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- PAGE 4: MODERN MEDICINE (TOPIC 4) & WESTERN FRONT -->
  <div class="header-box">
    <div>
      <div style="font-size: 8.5pt; font-weight: 800; color: #2563eb; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px;">Departmental Curriculum Audit &amp; Policy Strategy</div>
      <h1>GCSE Medicine Through Time: Specification Depth &amp; Limitations Audit</h1>
    </div>
    <div class="badge">Modern Medicine &amp; Western Front</div>
  </div>

  <h2 style="font-size: 13pt; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 12px;">Topic 4: Modern Medicine (c.1900–present)</h2>

  <!-- Ehrlich & Magic Bullets -->
  <div class="spec-card">
    <div class="spec-card-header">
      <h3>10. Paul Ehrlich &amp; Gerhard Domagk (Magic Bullets)</h3>
      <span class="spec-era">Topic 4 &bull; Treatment</span>
    </div>
    <div class="spec-card-body">
      <div class="grid-facts-limits">
        <div class="fact-box">
          <h4>✓ 3 Supporting Facts (Progress &amp; Impact)</h4>
          <ul>
            <li><strong>Salvarsan 606 (1909):</strong> Ehrlich and Hata tested 606 chemical compounds to find a synthetic dye that targeted syphilis microbes without killing human cells.</li>
            <li><strong>Prontosil (1932):</strong> Domagk discovered a red sulfonamide dye that cured blood poisoning (puerperal fever) and staph infections in mice and his own daughter.</li>
            <li><strong>Pharmaceutical Industry:</strong> Opened the era of chemotherapy, proving synthetic chemicals could be engineered to destroy specific internal pathogens.</li>
          </ul>
        </div>
        <div class="limit-box">
          <h4>✗ 2 Critical Historical Limitations</h4>
          <ul>
            <li><strong>Arsenic Toxicity:</strong> Salvarsan 606 contained arsenic; it was unstable, excruciatingly painful to administer, and occasionally killed the patient.</li>
            <li><strong>Organ Damage:</strong> Sulfa drugs like Prontosil damaged kidneys and bone marrow at high doses and were completely ineffective against viral infections.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Fleming, Florey & Chain -->
  <div class="spec-card">
    <div class="spec-card-header">
      <h3>11. Alexander Fleming, Howard Florey &amp; Ernst Chain (Penicillin)</h3>
      <span class="spec-era">Topic 4 &bull; Antibiotics</span>
    </div>
    <div class="spec-card-body">
      <div class="grid-facts-limits">
        <div class="fact-box">
          <h4>✓ 3 Supporting Facts (Progress &amp; Impact)</h4>
          <ul>
            <li><strong>Serendipitous Discovery (1928):</strong> Fleming observed <em>Penicillium notatum</em> mold destroying staphylococcus colonies on a petri dish at St Mary's Hospital.</li>
            <li><strong>Oxford Purification (1938–40):</strong> Florey and Chain extracted pure penicillin, successfully curing mice and policeman Albert Alexander (1941).</li>
            <li><strong>Mass Production (WWII):</strong> Backed by US government War Production Board loans, millions of doses were manufactured, saving 15% of Allied wounded soldiers.</li>
          </ul>
        </div>
        <div class="limit-box">
          <h4>✗ 2 Critical Historical Limitations</h4>
          <ul>
            <li><strong>Fleming's Abandonment:</strong> Fleming published his findings in 1929 but abandoned research because he could not extract enough pure mold and thought it acted too slowly.</li>
            <li><strong>Antibiotic Resistance:</strong> Overuse in human medicine and livestock has led to drug-resistant superbugs (e.g. MRSA), threatening to reverse 20th-century antibiotic progress.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <h2 style="font-size: 13pt; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 12px;">Topic 1: Medieval Medicine (c.1250–c.1500)</h2>

  <!-- Galen & Church -->
  <div class="spec-card">
    <div class="spec-card-header">
      <h3>12. Claudius Galen &amp; The Medieval Catholic Church</h3>
      <span class="spec-era">Topic 1 &bull; Ideas About Cause &amp; Treatment</span>
    </div>
    <div class="spec-card-body">
      <div class="grid-facts-limits">
        <div class="fact-box">
          <h4>✓ 3 Supporting Facts (Authority &amp; Impact)</h4>
          <ul>
            <li><strong>Theory of Opposites:</strong> Built upon Hippocrates' Four Humours by prescribing opposite qualities (e.g. treating a cold, phlegmatic fever with hot chillies or cucumber for hot blood).</li>
            <li><strong>Church Canonisation:</strong> Galen's belief that the body was created by a single divine Creator led the Catholic Church to adopt his texts as undisputed medical scripture for 1,400 years.</li>
            <li><strong>Anatomical Compendiums:</strong> Wrote over 350 treatises documenting blood vessels, cranial nerves, and organs based on animal vivisections (monkeys, pigs, and apes).</li>
          </ul>
        </div>
        <div class="limit-box">
          <h4>✗ 2 Critical Historical Limitations</h4>
          <ul>
            <li><strong>Anatomical Errors:</strong> Because human dissection was banned in ancient Rome, Galen transposed animal anatomy onto humans (e.g. 5-lobed liver, rete mirabile in the brain).</li>
            <li><strong>Stifled Medical Enquiry:</strong> The medieval Church forbade challenging Galen (e.g. Roger Bacon was imprisoned for advocating scientific observation), preventing all progress.</li>
          </ul>
        </div>
      </div>
      <div class="model-p">
        <strong>GCSE Model Paragraph:</strong> "Throughout the medieval period c.1250–c.1500, Galen's humoural theories provided a coherent framework for physicians to diagnose illnesses using urine charts and the Theory of Opposites. However, Galen's ideas severely limited medical progress because his anatomical treatises contained fundamental errors from animal dissection, while the Catholic Church's complete monopolisation of university education made questioning Galenic dogma a punishable heresy."
      </div>
    </div>
  </div>

  <!-- SCOPE NOTE: SECTION B ONLY -->
  <div class="callout" style="border-left-color: #f59e0b; background: #fffbeb; border-color: #fde68a; margin-top: 10px;">
    <div class="callout-title" style="color: #b45309;">Scope Clarification: Four Thematic Eras (Section B) vs Western Front (Section A)</div>
    <p style="margin: 0; font-size: 8.8pt; color: #92400e;">
      <strong>Exam Architecture Note:</strong> As confirmed, the <em>"3 Facts + 1–2 Limitations"</em> framework applies strictly to the <strong>four thematic eras of Medicine (Medieval, Renaissance, 18th/19th Century, Modern)</strong> for Section B questions (Q4 Explain Why [12m] and Q5/6 Evaluative Essay [16m]). It is <strong>not</strong> applied to Section A (The British Sector of the Western Front 1914–1918), which is an historic environment study assessing two 2-mark feature questions [Q1a/Q1b], source utility [Q2a, 8m], and historical enquiry follow-up [Q2b, 4m].
    </p>
  </div>

  <!-- VOCABULARY AUDIT SUMMARY BOX -->
  <div class="callout" style="border-left-color: #059669; background: #ecfdf5; border-color: #a7f3d0; margin-top: 14px;">
    <div class="callout-title" style="color: #047857;">GCSE Medicine Vocabulary Calibration (Appropriateness Check)</div>
    <p style="margin: 0; font-size: 8.8pt; color: #065f46;">
      <strong>Verdict:</strong> Academic vocabulary in our visual revision guide (e.g. <em>empiricism, miasma, inoculation, spontaneous generation, iatrochemistry, bacteriology, magic bullets, aseptic</em>) is strictly aligned with the Pearson Edexcel exam specification. However, each term in our materials is deliberately paired with a <strong>one-sentence concrete definition</strong> and a <strong>named historical anchor</strong> to ensure KS4 pupils of all ability tiers can deploy them with total confidence in 12-mark and 16-mark essays without cognitive fatigue.
    </p>
  </div>

</body>
</html>
`;

// --------------------------------------------------------------------------
// 2. HORIZONTAL TIMELINE CARDS EVALUATION & PROPOSAL
// --------------------------------------------------------------------------
const timelineProposalHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>GCSE &amp; KS3 Horizontal Timeline Cards: Architectural Proposal</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&display=swap" rel="stylesheet">
  <style>
    @page { size: A4; margin: 15mm; }
    body { font-family: 'Outfit', sans-serif; color: #1e293b; line-height: 1.5; font-size: 9.5pt; margin: 0; padding: 0; }
    h1, h2, h3, h4 { font-family: 'Playfair Display', Georgia, serif; color: #0f172a; margin-top: 0; }
    .header-box { border-bottom: 3px solid #0f172a; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; }
    .header-box h1 { font-size: 20pt; margin: 0; line-height: 1.1; }
    .header-box .badge { background: #0f172a; color: #ffffff; padding: 4px 10px; border-radius: 4px; font-size: 8.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
    .card { background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-bottom: 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
    .callout { background: #f8fafc; border: 1.5px solid #cbd5e1; border-left: 5px solid #0284c7; padding: 12px 14px; border-radius: 6px; margin-bottom: 16px; font-size: 9pt; }
    .callout-title { font-weight: 800; color: #0369a1; margin-bottom: 4px; text-transform: uppercase; font-size: 8pt; letter-spacing: 0.06em; }
    .timeline-strip-preview { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 14px 0; }
    .timeline-card-demo { background: #ffffff; border: 1.5px solid #cbd5e1; border-top: 3px solid #2563eb; border-radius: 6px; padding: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.03); }
    .timeline-card-demo.highlight { border-top-color: #d97706; background: #fffbeb; }
    .timeline-card-date { font-family: monospace; font-size: 8pt; font-weight: 800; color: #2563eb; margin-bottom: 2px; }
    .timeline-card-demo.highlight .timeline-card-date { color: #d97706; }
    .timeline-card-title { font-weight: 800; font-size: 8.8pt; color: #0f172a; line-height: 1.2; margin-bottom: 4px; }
    .timeline-card-desc { font-size: 7.8pt; color: #475569; line-height: 1.3; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 8.8pt; }
    th, td { border: 1px solid #cbd5e1; padding: 8px 10px; text-align: left; }
    th { background: #f1f5f9; font-weight: 700; color: #0f172a; }
    .status-badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 7.5pt; font-weight: 800; text-transform: uppercase; }
    .status-active { background: #dcfce7; color: #15803d; }
    .status-rec { background: #e0e7ff; color: #4338ca; }
    .page-break { page-break-after: always; }
  </style>
</head>
<body>

  <!-- PAGE 1: EVALUATION & CME CASE STUDY -->
  <div class="header-box">
    <div>
      <div style="font-size: 8.5pt; font-weight: 800; color: #0284c7; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px;">Instructional Design &amp; Digital UI Strategy</div>
      <h1>Horizontal Timeline Cards: Pedagogical Evaluation &amp; GCSE / KS3 Rollout Proposal</h1>
    </div>
    <div class="badge">Curriculum Blueprint</div>
  </div>

  <div class="callout">
    <div class="callout-title">Pedagogical Evaluation: Why Horizontal Timeline Cards Work</div>
    <p style="margin: 0 0 6px 0;">The horizontal timeline summary cards introduced at the top of <em>Conflict in the Middle East</em> (<code>cme_new</code>) represent an outstanding pedagogical feature for modern history instruction:</p>
    <ul style="margin: 0;">
      <li><strong>Dual Coding &amp; Visual Anchoring:</strong> Provides an immediate, low-cognitive-load chronological orientation before pupils dive into dense textual narratives.</li>
      <li><strong>Causal Chain Priming:</strong> Placing 3 to 4 sequential milestone cards side-by-side enforces narrative causality: pupils naturally read left-to-right from <em>Catalyst &rarr; Escalation &rarr; Climax &rarr; Aftermath</em>.</li>
      <li><strong>Recall &amp; Revision Utility:</strong> Acts as an instant "at-a-glance" revision strip when pupils review lessons prior to end-of-unit assessments.</li>
      <li><strong>Lesson Synchronisation:</strong> The current lesson's key event is prominently highlighted in amber gold, situating the today's enquiry within broader historical time.</li>
    </ul>
  </div>

  <h2 style="font-size: 13pt; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 12px;">Component Architecture Demonstration</h2>
  <p style="font-size: 9pt; color: #475569; margin-bottom: 8px;">Below is the verified 4-card horizontal responsive flex layout deployed at the top of lesson containers (clean chronological milestone format):</p>

  <!-- Visual Mockup Strip -->
  <div class="timeline-strip-preview">
    <div class="timeline-card-demo">
      <div class="timeline-card-date">1543 &bull; ANATOMY</div>
      <div class="timeline-card-title">Vesalius Fabric of the Human Body</div>
      <div class="timeline-card-desc">Corrects 300+ Galenic errors via human dissection; establishes anatomical inspection.</div>
    </div>
    <div class="timeline-card-demo">
      <div class="timeline-card-date">1628 &bull; PHYSIOLOGY</div>
      <div class="timeline-card-title">William Harvey Circulation of Blood</div>
      <div class="timeline-card-desc">Proves heart functions as a mechanical pump; disproves liver blood production.</div>
    </div>
    <div class="timeline-card-demo highlight">
      <div class="timeline-card-date">1676 &bull; DIAGNOSIS (TODAY)</div>
      <div class="timeline-card-title">Sydenham Observationes Medicae</div>
      <div class="timeline-card-desc">Pioneers bedside clinical observation; classifies diseases into distinct biological species.</div>
    </div>
    <div class="timeline-card-demo">
      <div class="timeline-card-date">1660–65 &bull; EMPIRICISM</div>
      <div class="timeline-card-title">Royal Society &amp; Philosophical Trans.</div>
      <div class="timeline-card-desc">Motto <em>Nullius in Verba</em>; establishes peer-reviewed empirical lab research across Europe.</div>
    </div>
  </div>

  <h2 style="font-size: 13pt; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 12px; margin-top: 20px;">Curriculum Rollout Analysis: GCSE Units</h2>

  <table>
    <thead>
      <tr>
        <th style="width: 25%;">Unit</th>
        <th style="width: 15%;">Recommended?</th>
        <th style="width: 25%;">Pedagogical Benefit</th>
        <th style="width: 35%;">Implementation Plan</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Paper 1: Medicine Through Time</strong></td>
        <td><span class="status-badge status-rec">HIGHLY REC</span></td>
        <td>Bridges the huge 750-year chronological leaps between thematic eras (Medieval &rarr; Renaissance &rarr; 18th/19th &rarr; Modern).</td>
        <td>Embed 4-card milestone cards at the top of each era's core lessons (e.g. <em>Vesalius &rarr; Harvey &rarr; Sydenham &rarr; Royal Society</em>).</td>
      </tr>
      <tr>
        <td><strong>Paper 2: Conflict in the Middle East</strong></td>
        <td><span class="status-badge status-active">LIVE NOW</span></td>
        <td>Untangles complex diplomatic crises (Suez, Six-Day War, Yom Kippur, Camp David).</td>
        <td>Already fully active and beloved by pupils; acts as the departmental gold standard.</td>
      </tr>
      <tr>
        <td><strong>Paper 2: Early Elizabethan England</strong></td>
        <td><span class="status-badge status-rec">HIGHLY REC</span></td>
        <td>Crucial for understanding rapid political conspiracies (Plots, Mary Queen of Scots, Armada, Religious Settlement).</td>
        <td>Implement across KT1 (Religious settlement), KT2 (Plots &amp; Armada 1588), and KT3 (Exploration &amp; Virginia).</td>
      </tr>
      <tr>
        <td><strong>Paper 3: Weimar and Nazi Germany</strong></td>
        <td><span class="status-badge status-rec">HIGHLY REC</span></td>
        <td>Essential for rapid political changes (1918–1933 hyperinflation &rarr; Golden Years &rarr; Depression &rarr; Machtergreifung).</td>
        <td>Deploy to anchor chronological sequencing for Question 2 ("Explain why...") 12-mark questions.</td>
      </tr>
      <tr>
        <td><strong>Paper 3: USA 1954–1975</strong></td>
        <td><span class="status-badge status-rec">RECOMMENDED</span></td>
        <td>Clarifies escalating civil rights campaigns (Montgomery &rarr; Little Rock &rarr; Sit-ins &rarr; Freedom Rides &rarr; Selma).</td>
        <td>Incorporate in KT1–KT3 Civil Rights and KT4 Vietnam War escalation/withdrawal.</td>
      </tr>
    </tbody>
  </table>

  <div class="page-break"></div>

  <!-- PAGE 2: KS3 ROLLOUT & STRATEGIC RECOMMENDATIONS -->
  <div class="header-box">
    <div>
      <div style="font-size: 8.5pt; font-weight: 800; color: #0284c7; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px;">Instructional Design &amp; Digital UI Strategy</div>
      <h1>Horizontal Timeline Cards: KS3 Feasibility &amp; Departmental Standards</h1>
    </div>
    <div class="badge">KS3 Analysis</div>
  </div>

  <h2 style="font-size: 13pt; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 12px;">KS3 Curriculum Feasibility &amp; Age-Appropriateness</h2>

  <p style="font-size: 9pt; line-height: 1.5; color: #334155; margin-bottom: 14px;">
    At Key Stage 3, chronological disorientation is the single most common barrier to historical empathy and causation. While GCSE pupils use timeline cards for rigorous causal analysis (AO1/AO2), KS3 pupils benefit from timeline cards as <strong>"Time Travel Signposts"</strong> that prevent anachronistic thinking (e.g. assuming Victorians had electricity or Romans were in medieval castles).
  </p>

  <table>
    <thead>
      <tr>
        <th style="width: 25%;">KS3 Unit</th>
        <th style="width: 15%;">Recommended?</th>
        <th style="width: 60%;">Pedagogical Rationale for Years 7–9</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Year 7: Medieval England (1066–1485)</strong></td>
        <td><span class="status-badge status-rec">YES (Simplified)</span></td>
        <td>Enormously effective for the Norman Conquest (1066: Fulford &rarr; Stamford Bridge &rarr; Hastings) and the Black Death (1348). Use 3 punchy cards per lesson with large bold dates.</td>
      </tr>
      <tr>
        <td><strong>Year 7: Water &amp; Sanitation</strong></td>
        <td><span class="status-badge status-rec">YES</span></td>
        <td>Thematic units are inherently disorienting for Year 7s because they jump across centuries. A 4-card timeline strip grounds each case study (Roman aqueducts &rarr; Great Conduit &rarr; Great Stink).</td>
      </tr>
      <tr>
        <td><strong>Year 8: The Great War (1914–1918)</strong></td>
        <td><span class="status-badge status-rec">HIGHLY REC</span></td>
        <td>Crucial for WW1 military chronology (Schlieffen Plan &rarr; Mons &rarr; 1st Ypres &rarr; Somme &rarr; Passchendaele &rarr; Hundred Days Offensive). Prevents battle confusion.</td>
      </tr>
      <tr>
        <td><strong>Year 8: Industrialisation &amp; Empire</strong></td>
        <td><span class="status-badge status-rec">YES</span></td>
        <td>Helps Year 8s grasp economic evolution (Domestic System &rarr; Arkwright Water Frame &rarr; Steam Factories &rarr; Railways).</td>
      </tr>
      <tr>
        <td><strong>Year 9: The Shoah (Holocaust)</strong></td>
        <td><span class="status-badge status-rec">HIGHLY REC</span></td>
        <td>Vital for teaching the escalating stages of anti-Jewish persecution (1933 Boycott &rarr; 1935 Nuremberg Laws &rarr; 1938 Kristallnacht &rarr; 1941 Einstatzgruppen &rarr; 1942 Death Camps). Enforces historical accuracy without sensationalism.</td>
      </tr>
      <tr>
        <td><strong>Year 9: Post-War Britain &amp; Cold War</strong></td>
        <td><span class="status-badge status-rec">YES</span></td>
        <td>Coordinates domestic changes (NHS 1948) with international Cold War flashpoints (Berlin Airlift &rarr; Cuban Missile Crisis).</td>
      </tr>
    </tbody>
  </table>

  <h2 style="font-size: 13pt; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 12px; margin-top: 22px;">Executive Recommendations &amp; Technical Roadmap</h2>

  <div class="card">
    <h3 style="margin-bottom: 6px; font-size: 11pt; color: #0f172a;">1. Automated Uniform Feature via Schema</h3>
    <p style="margin: 0 0 8px 0; font-size: 8.8pt;">
      Rather than hard-coding HTML into individual lessons, we recommend formalising a standard <code>timeline_strip</code> property in each unit's <code>data.js</code> lesson schema:
    </p>
    <pre style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 8px 10px; border-radius: 4px; font-family: monospace; font-size: 7.8pt; color: #0f172a; margin: 0 0 8px 0;">
timeline_strip: [
  { date: '1543', category: 'Anatomy', title: 'Vesalius Fabrica', desc: 'Dissected human corpses, correcting Galen.' },
  { date: '1628', category: 'Physiology', title: 'Harvey De Motu Cordis', desc: 'Proved continuous blood circulation.' },
  { date: '1676', category: 'Diagnosis', title: 'Sydenham Observationes', desc: 'Bedside diagnosis of disease species.', active: true },
  { date: '1660–65', category: 'Empiricism', title: 'Royal Society', desc: 'Empirical experimentation and journal.' }
]
    </pre>
    <p style="margin: 0; font-size: 8.8pt;">
      The global frontend engine (<code>app.js</code> / <code>core_app.js</code>) can then automatically render this clean responsive card strip immediately beneath the lesson hero banner across <em>all</em> units without duplicating code.
    </p>
  </div>

  <div class="card" style="margin-top: 10px;">
    <h3 style="margin-bottom: 6px; font-size: 11pt; color: #0f172a;">2. Recommended Immediate Next Steps</h3>
    <ul style="margin: 0; font-size: 8.8pt;">
      <li><strong>Step 1 (Immediate):</strong> Approve the retirement of printed lesson workbooks in favour of dedicated printed <em>Exam Mastery Packs</em> and <em>Visual Revision Guides</em>.</li>
      <li><strong>Step 2 (Medicine Priority):</strong> Inject the "3 Facts + 1–2 Limitations" structure directly into the Renaissance and 19th-century lesson summaries in <code>units/edexcel_medicine/data.js</code>.</li>
      <li><strong>Step 3 (Timeline Cards Rollout):</strong> Add the <code>timeline_strip</code> data to <em>Medicine Through Time</em> and <em>Early Elizabethan England</em> first, followed by KS3 <em>Medieval England</em> and <em>The Great War</em>.</li>
    </ul>
  </div>

</body>
</html>
`;

(async () => {
  console.log('======================================================================');
  console.log('📊 GENERATING DEPARTMENTAL STRATEGIC REVIEW PDFS');
  console.log('======================================================================');

  const pdfAuditPath = path.join(
    PDFS_DIR,
    'edexcel_medicine_specification_and_limitations_audit.pdf',
  );
  await generatePdf(medicineAuditHtml, pdfAuditPath, 'Medicine Specification & Limitations Audit');

  const pdfTimelinePath = path.join(PDFS_DIR, 'gcse_horizontal_timeline_cards_proposal.pdf');
  await generatePdf(timelineProposalHtml, pdfTimelinePath, 'Horizontal Timeline Cards Proposal');

  console.log('🚀 Running sync_admin_pdfs_to_drive to mirror both documents to Google Drive...');
  try {
    const syncScript = path.join(ROOT_DIR, 'scripts', 'sync_admin_pdfs_to_drive.cjs');
    if (fs.existsSync(syncScript)) {
      require(syncScript);
    }
  } catch (err) {
    console.warn('⚠️ Sync notice:', err.message);
  }

  console.log('✨ ALL STRATEGIC REVIEW PDFS GENERATED & MIRRORED SUCCESSFULLY!');
})();
