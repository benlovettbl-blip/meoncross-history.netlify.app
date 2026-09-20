const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The History Department: Master Roadmap & 16-Page Booklet Blueprint (2026)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page {
      size: A4 portrait;
      margin: 8mm 8mm 8mm 8mm;
    }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 8.5pt;
      line-height: 1.32;
      color: #000000;
      background: #ffffff;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .page {
      width: 100%;
      height: 280mm;
      max-height: 280mm;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 4mm 6mm;
      position: relative;
      overflow: hidden;
      background: #ffffff;
    }
    .page:last-child {
      page-break-after: avoid;
    }
    .serif {
      font-family: 'Playfair Display', Georgia, serif;
    }
    .body-serif {
      font-family: 'Georgia', serif;
    }
    .badge {
      display: inline-block;
      padding: 1.5px 6px;
      border-radius: 3px;
      font-size: 6.5pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .badge-green {
      background: #15803d;
      color: #ffffff;
    }
    .badge-amber {
      background: #b45309;
      color: #ffffff;
    }
    .badge-red {
      background: #b91c1c;
      color: #ffffff;
    }
    .badge-blue {
      background: #1d4ed8;
      color: #ffffff;
    }
    .badge-gray {
      background: #374151;
      color: #ffffff;
    }
    .badge-black {
      background: #000000;
      color: #ffffff;
    }
    .footer-strip {
      border-top: 1.5px solid #000000;
      padding-top: 2.5px;
      margin-top: 3px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 6.8pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    table.audit-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 6.8pt;
      line-height: 1.22;
      border: 1.5px solid #000000;
    }
    table.audit-table th {
      background: #000000;
      color: #ffffff;
      padding: 4px 5px;
      text-align: left;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-size: 6.5pt;
      border: 1px solid #000000;
    }
    table.audit-table td {
      padding: 3.5px 5px;
      border: 1px solid #d1d5db;
      vertical-align: top;
    }
    table.audit-table tr:nth-child(even) {
      background: #f9fafb;
    }
    .spec-card {
      border: 1.4px solid #000000;
      border-radius: 4px;
      padding: 5px 7px;
      background: #ffffff;
    }
    .spec-card-title {
      font-size: 7.5pt;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1.2px solid #000000;
      padding-bottom: 2px;
      margin-bottom: 3px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  </style>
</head>
<body>

  <!-- ========================================================================== -->
  <!-- PAGE 1: EXECUTIVE COVER & MANDATE -->
  <!-- ========================================================================== -->
  <div class="page" id="page-1">
    <div>
      <!-- Top Department Brand Banner -->
      <div style="border-bottom: 2px solid #000000; padding-bottom: 3px; margin-bottom: 5px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span style="font-size: 13pt; font-weight: 900; letter-spacing: 2.5px; text-transform: uppercase;">The History Department</span>
          <span style="font-size: 7.5pt; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">Official Departmental Documentation &bull; Policy Dossier</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 2px; border-top: 1px solid #000000; padding-top: 2px; font-size: 7pt; font-weight: 800; letter-spacing: 0.8px; text-transform: uppercase; color: #333333;">
          <span>Curriculum Architecture &bull; 16-Page Booklet Blueprint &bull; Phased Rollout Ledger</span>
          <span>Academic Year 2026–2027</span>
        </div>
      </div>

      <!-- Grand Title Box -->
      <div style="border: 2px solid #000000; border-radius: 4px; padding: 10px 14px; margin-bottom: 8px; background: #ffffff;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 3px;">
          <span class="badge badge-black">Department Strategy</span>
          <span style="font-size: 7.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #444444;">
            High-Challenge Literacy &bull; 2-Lesson Choreography &bull; 16-Page Double-Page Booklets
          </span>
        </div>
        <h1 class="serif" style="font-size: 20pt; line-height: 1.08; margin: 2px 0 4px 0; font-weight: 900; letter-spacing: -0.3px;">
          Curriculum Roadmap &amp; Universal 16-Page Booklet Blueprint
        </h1>
        <div class="body-serif" style="font-size: 9.5pt; color: #1f2937; font-style: italic; line-height: 1.25;">
          A comprehensive operational guide for the transition to Christine Counsell 4-Act Lessons, Double-Page Spread Workbooks, and the Phased Rollout Protection Protocol across all 16 KS3 &amp; GCSE Units.
        </div>
      </div>

      <!-- Executive Milestone Confirmations (Permanent Memory) -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 7px 10px; margin-bottom: 8px; background: #fafafa;">
        <div style="font-size: 8pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.8px; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 5px; display: flex; justify-content: space-between;">
          <span>Permanent Departmental Milestones &amp; Active Memory</span>
          <span style="color: #15803d; font-weight: 900;">Verified 20 September 2026</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 7.2pt; line-height: 1.28;">
          <div style="border-left: 3px solid #15803d; padding-left: 6px;">
            <strong>🟩 Edexcel Paper 1: Medicine Through Time:</strong><br>
            <span style="color: #374151;">All lessons across Medieval, Renaissance, 18th/19th Century, Modern, and Section A Western Front are <strong>100% COMPLETE</strong>. Authored with 4-Act narrative arcs and consolidated into the canonical Three Pillars master packs.</span>
          </div>
          <div style="border-left: 3px solid #15803d; padding-left: 6px;">
            <strong>🟩 Middle East Key Topic 2 (1964–1973):</strong><br>
            <span style="color: #374151;">All 5 enquiry lessons are <strong>100% COMPLETE</strong>. The flagship <strong>16-Page Double-Page Pupil Workbook</strong> (<code style="font-size: 6.8pt;">pupil_workbook_KT2.html</code>) is fully compiled with publisher-grade cover, living timeline, knowledge organiser, and assessment tracker.</span>
          </div>
          <div style="border-left: 3px solid #b45309; padding-left: 6px;">
            <strong>🟨 Middle East Key Topics 1 &amp; 3 (Priority #1):</strong><br>
            <span style="color: #374151;">Core narratives authored. Scheduled to adopt the newly established 16-page double-page spread workbook template immediately to complete the Middle East unit.</span>
          </div>
          <div style="border-left: 3px solid #b91c1c; padding-left: 6px;">
            <strong>🔒 Classroom Reprographics Protection Rule:</strong><br>
            <span style="color: #374151;">Physical workbooks are currently in pupils' hands for <strong>Year 7 Sanitation, Year 8 Early Modern, and Year 9 Causes of the Great War</strong>. These active files are <strong>STRICTLY FROZEN</strong> to prevent mid-term classroom disruption.</span>
          </div>
        </div>
      </div>

      <!-- Core Pedagogical Pillars Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 6px;">
        <div class="spec-card">
          <div class="spec-card-title">
            <span>1. Four-Act Dramatic Narrative Architecture</span>
            <span class="badge badge-black">Pedagogy</span>
          </div>
          <div style="font-size: 7pt; color: #374151; line-height: 1.25;">
            Every lesson is framed around Christine Counsell's four-act inquiry:
            <strong>Act 1: Context &amp; Catalyst</strong> (Setting the stage / Source A);
            <strong>Act 2: Escalation &amp; Conflict</strong> (Boiling point / Source B);
            <strong>Act 3: Forensic Primary Evidence</strong> (Archival core / Sources C &amp; D);
            <strong>Act 4: Historiographical Debate &amp; Verdict</strong> (Competing arguments &amp; extended writing).
          </div>
        </div>

        <div class="spec-card">
          <div class="spec-card-title">
            <span>2. The 2-Lesson Enquiry Choreography</span>
            <span class="badge badge-black">Classroom Delivery</span>
          </div>
          <div style="font-size: 7pt; color: #374151; line-height: 1.25;">
            <strong>Lesson 1 (50m):</strong> Immersion, lexical pre-teaching, prosody-modelled shared reading (Acts 1–3), and forensic primary source analysis.<br>
            <strong>Lesson 2 (50m):</strong> Spaced recall retrieval Do Now, Act 4 historiographical debate, and 2-page workbook extended writing with live exemplar peer critique.
          </div>
        </div>

        <div class="spec-card">
          <div class="spec-card-title">
            <span>3. The Double-Page Spread Law</span>
            <span class="badge badge-black">Cognitive Load</span>
          </div>
          <div style="font-size: 7pt; color: #374151; line-height: 1.25;">
            Abolished 4-page booklets to eliminate split-attention cognitive friction. Every inquiry lies flat on the desk: <strong>Verso (Left Page)</strong> provides the curated evidence launchpad, Do Now recall, and vocabulary distinction; <strong>Recto (Right Page)</strong> provides the structure strip, connectives, and extended writing.
          </div>
        </div>

        <div class="spec-card">
          <div class="spec-card-title">
            <span>4. Universal Publisher-Grade 16-Page Format</span>
            <span class="badge badge-black">Production Quality</span>
          </div>
          <div style="font-size: 7pt; color: #374151; line-height: 1.25;">
            Key Topic workbooks are consolidated into a 16-page saddle-stitch booklet (4 folded sheets) featuring a massive 108mm portrait photo, docked editorial suite, living timeline, 5 double-page spreads, master knowledge organiser, Grade 9 masterclass, and digital QR quiz hub.
          </div>
        </div>
      </div>

    </div>

    <!-- Running Footer -->
    <div class="footer-strip">
      <span>The History Department &bull; Curriculum Master Plan &bull; Official Departmental File</span>
      <span>Page 1 of 4</span>
    </div>
  </div>

  <!-- ========================================================================== -->
  <!-- PAGE 2: DEPARTMENTAL RAG STATUS AUDIT TABLE (ALL 16 UNITS) -->
  <!-- ========================================================================== -->
  <div class="page" id="page-2">
    <div>
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline;">
        <span style="font-size: 10pt; font-weight: 900; text-transform: uppercase; letter-spacing: 1.5px;">Section 1: Departmental RAG Status Matrix (All 16 Units)</span>
        <span style="font-size: 7pt; font-weight: 800; text-transform: uppercase; color: #444444;">Audit Date: September 2026</span>
      </div>

      <div style="margin-bottom: 4px; font-size: 7.2pt; color: #374151; line-height: 1.22;">
        This register tracks the transition from legacy formats to the <strong>Christine Counsell 4-Act Narrative Structure</strong> and the <strong>Universal 16-Page / Double-Page Spread Architecture</strong> across all Key Stage 3 and GCSE units.
      </div>

      <table class="audit-table">
        <thead>
          <tr>
            <th style="width: 14%;">Unit ID &amp; Level</th>
            <th style="width: 22%;">Official Specification Title</th>
            <th style="width: 18%;">4-Act Counsell Narrative</th>
            <th style="width: 18%;">Double-Page Booklet Architecture</th>
            <th style="width: 14%;">Reprographics State</th>
            <th style="width: 14%;">Priority &amp; Next Action</th>
          </tr>
        </thead>
        <tbody>
          <!-- Medicine -->
          <tr>
            <td><strong>edexcel_medicine</strong><br><span class="badge badge-black">GCSE Paper 1</span></td>
            <td><strong>Medicine in Britain, c1250–Present &amp; Western Front</strong></td>
            <td><span class="badge badge-green">Green &bull; Complete</span><br>211 lessons across all 4 eras + Sec A</td>
            <td><span class="badge badge-green">Green &bull; Complete</span><br>Three Pillars Master Packs compiled</td>
            <td><span class="badge badge-green">Active</span><br>Production Ready</td>
            <td><strong>COMPLETE</strong><br>Maintenance &amp; testing</td>
          </tr>

          <!-- CME KT2 -->
          <tr>
            <td><strong>cme_new (KT2)</strong><br><span class="badge badge-black">GCSE Paper 2</span></td>
            <td><strong>Conflict in the Middle East: Key Topic 2 (1964–1973)</strong></td>
            <td><span class="badge badge-green">Green &bull; Complete</span><br>All 5 enquiry lessons 4-Act complete</td>
            <td><span class="badge badge-green">Green &bull; Complete</span><br>Flagship 16-Page Publisher Standard</td>
            <td><span class="badge badge-green">Active</span><br>Production Ready</td>
            <td><strong>BENCHMARK</strong><br>Master model for GCSE</td>
          </tr>

          <!-- CME KT1 & KT3 -->
          <tr>
            <td><strong>cme_new (KT1/3)</strong><br><span class="badge badge-black">GCSE Paper 2</span></td>
            <td><strong>Conflict in the Middle East: Key Topics 1 &amp; 3</strong></td>
            <td><span class="badge badge-amber">Amber &bull; Authored</span><br>Core narratives written</td>
            <td><span class="badge badge-amber">Amber &bull; Staging</span><br>Scheduled for 16-page template</td>
            <td><span class="badge badge-blue">Staging</span><br>Pre-print pipeline</td>
            <td><span class="badge badge-amber" style="background:#dc2626;">🚨 Priority #1</span><br>Convert to 16-page spreads</td>
          </tr>

          <!-- Industrialisation -->
          <tr>
            <td><strong>industrialisation</strong><br><span class="badge badge-black">KS3 (Year 8)</span></td>
            <td><strong>Industrialisation, Empire, and Power (1750–1900)</strong></td>
            <td><span class="badge badge-green">Green &bull; Complete</span><br>8 lessons + delivery plans</td>
            <td><span class="badge badge-green">Green &bull; Ready</span><br>20-Page Double-Page Spread Ready</td>
            <td><span class="badge badge-blue">Staged</span><br>Term 2 Delivery</td>
            <td><span class="badge badge-amber">Priority #2</span><br>Finalize L2–8 delivery plans</td>
          </tr>

          <!-- Water and Sanitation -->
          <tr style="background: #fef2f2;">
            <td><strong>water_sanitation</strong><br><span class="badge badge-black">KS3 (Year 7)</span></td>
            <td><strong>Water and Sanitation Through Time</strong></td>
            <td><span class="badge badge-amber">Amber &bull; Partial</span><br>20 lessons drafted</td>
            <td><span class="badge badge-red">Red &bull; Legacy</span><br>Legacy 4-page format</td>
            <td><span class="badge badge-red">🔒 FROZEN</span><br>Printed &amp; in pupils' hands</td>
            <td><span class="badge badge-gray">Protected Mid-Term</span><br>Staged for Term 2 reprint</td>
          </tr>

          <!-- Early Modern World -->
          <tr style="background: #fef2f2;">
            <td><strong>early_modern</strong><br><span class="badge badge-black">KS3 (Year 8)</span></td>
            <td><strong>Early Modern World &amp; Global Encounters (1450–1750)</strong></td>
            <td><span class="badge badge-amber">Amber &bull; Authored</span><br>16 lessons written</td>
            <td><span class="badge badge-red">Red &bull; Legacy</span><br>Legacy 4-page format</td>
            <td><span class="badge badge-red">🔒 FROZEN</span><br>Printed &amp; in pupils' hands</td>
            <td><span class="badge badge-gray">Protected Mid-Term</span><br>Staged for Term 2 reprint</td>
          </tr>

          <!-- Causes of the Great War -->
          <tr style="background: #fef2f2;">
            <td><strong>great_war (Pt 1)</strong><br><span class="badge badge-black">KS3 (Year 9)</span></td>
            <td><strong>Causes of the Great War (1870–1914)</strong></td>
            <td><span class="badge badge-amber">Amber &bull; Authored</span><br>71 lessons narrative</td>
            <td><span class="badge badge-amber">Amber &bull; Legacy</span><br>Legacy mastery standard</td>
            <td><span class="badge badge-red">🔒 FROZEN</span><br>Printed &amp; in pupils' hands</td>
            <td><span class="badge badge-gray">Protected Mid-Term</span><br>Staged for Term 2 reprint</td>
          </tr>

          <!-- Great War Part 2 -->
          <tr>
            <td><strong>great_war_part2</strong><br><span class="badge badge-black">KS3 (Year 9)</span></td>
            <td><strong>The Great War: Western Front &amp; Aftermath (1914–1919)</strong></td>
            <td><span class="badge badge-green">Green &bull; Complete</span><br>9 lessons 4-Act complete</td>
            <td><span class="badge badge-amber">Amber &bull; Pending</span><br>Awaiting 2-page spread migration</td>
            <td><span class="badge badge-blue">Upcoming</span><br>Not yet printed</td>
            <td><span class="badge badge-amber">Priority #4</span><br>Convert before print date</td>
          </tr>

          <!-- Medieval England -->
          <tr>
            <td><strong>medieval_england</strong><br><span class="badge badge-black">KS3 (Year 7)</span></td>
            <td><strong>Medieval England &amp; Struggle for Power (1066–1485)</strong></td>
            <td><span class="badge badge-green">Green &bull; Complete</span><br>38 lessons 4-Act complete</td>
            <td><span class="badge badge-amber">Amber &bull; Pending</span><br>Legacy comprehension style</td>
            <td><span class="badge badge-blue">Upcoming</span><br>Not yet printed</td>
            <td><strong>Queued</strong><br>Migrate to 2-page spreads</td>
          </tr>

          <!-- Early Elizabethan England -->
          <tr>
            <td><strong>eee</strong><br><span class="badge badge-black">GCSE Paper 2</span></td>
            <td><strong>Early Elizabethan England, 1558–1588</strong></td>
            <td><span class="badge badge-amber">Amber &bull; Authored</span><br>22 lessons authored</td>
            <td><span class="badge badge-amber">Amber &bull; Split</span><br>Split in 3 booklets; needs 16p</td>
            <td><span class="badge badge-blue">GCSE Term 2</span><br>Staging</td>
            <td><span class="badge badge-amber">Priority #3</span><br>Three Pillars unification</td>
          </tr>

          <!-- USA -->
          <tr>
            <td><strong>usa</strong><br><span class="badge badge-black">GCSE Paper 3</span></td>
            <td><strong>The USA, 1954–75: Conflict at Home &amp; Abroad</strong></td>
            <td><span class="badge badge-amber">Amber &bull; Authored</span><br>Core spec coverage complete</td>
            <td><span class="badge badge-green">Green &bull; Complete</span><br>16 Spreads, 4-4-4-4 Matrix</td>
            <td><span class="badge badge-green">Active</span><br>Master PDFs compiled</td>
            <td><strong>COMPLETE</strong><br>Revision &amp; coaching</td>
          </tr>

          <!-- Weimar Germany -->
          <tr>
            <td><strong>weimar_germany</strong><br><span class="badge badge-black">GCSE Paper 3</span></td>
            <td><strong>Weimar and Nazi Germany, 1918–1939</strong></td>
            <td><span class="badge badge-amber">Amber &bull; Authored</span><br>24 lessons authored</td>
            <td><span class="badge badge-red">Red &bull; Split</span><br>Split in 4 separate booklets</td>
            <td><span class="badge badge-blue">GCSE Y11 T2</span><br>Scheduled</td>
            <td><strong>Scheduled</strong><br>4-4-4-4 Guide &amp; 16p format</td>
          </tr>

          <!-- Shoah -->
          <tr>
            <td><strong>the_shoah</strong><br><span class="badge badge-black">KS3 (Year 9)</span></td>
            <td><strong>The Shoah (Holocaust Education)</strong></td>
            <td><span class="badge badge-red">Red &bull; Draft</span><br>Core text drafted</td>
            <td><span class="badge badge-red">Red &bull; Legacy</span><br>Legacy standalone format</td>
            <td><span class="badge badge-gray">Queued</span><br>Year 9 Term 2/3</td>
            <td><strong>Queued</strong><br>4-Act restructure</td>
          </tr>

          <!-- Cold War -->
          <tr>
            <td><strong>cold_war</strong><br><span class="badge badge-black">KS3 (Year 9)</span></td>
            <td><strong>The Cold War (1945–1991)</strong></td>
            <td><span class="badge badge-red">Red &bull; Draft</span><br>Prose drafted</td>
            <td><span class="badge badge-red">Red &bull; Legacy</span><br>Legacy standalone format</td>
            <td><span class="badge badge-gray">Queued</span><br>Year 9 Term 3</td>
            <td><strong>Queued</strong><br>4-Act restructure</td>
          </tr>

          <!-- Post-War Britain -->
          <tr>
            <td><strong>post_war_britain</strong><br><span class="badge badge-black">KS3 (Year 9)</span></td>
            <td><strong>Rights, Protest, and Post-War Britain</strong></td>
            <td><span class="badge badge-red">Red &bull; Draft</span><br>Prose drafted</td>
            <td><span class="badge badge-red">Red &bull; Legacy</span><br>Legacy standalone format</td>
            <td><span class="badge badge-gray">Queued</span><br>Year 9 Term 3</td>
            <td><strong>Queued</strong><br>4-Act restructure</td>
          </tr>

          <!-- Australia -->
          <tr>
            <td><strong>australia</strong><br><span class="badge badge-black">KS3 (Year 8/9)</span></td>
            <td><strong>History of Australia (Depth Study)</strong></td>
            <td><span class="badge badge-red">Red &bull; Draft</span><br>Draft modules</td>
            <td><span class="badge badge-red">Red &bull; Legacy</span><br>Legacy standalone format</td>
            <td><span class="badge badge-gray">Queued</span><br>Elective Depth Study</td>
            <td><strong>Queued</strong><br>4-Act restructure</td>
          </tr>

          <!-- Battlefield Tour -->
          <tr>
            <td><strong>trip_ypres</strong><br><span class="badge badge-black">GCSE Tour</span></td>
            <td><strong>Battlefield Tour: Ypres &amp; The Somme</strong></td>
            <td><span class="badge badge-green">Green &bull; Complete</span><br>14 field stops complete</td>
            <td><span class="badge badge-green">Green &bull; Digital</span><br>Digital Companion Web App</td>
            <td><span class="badge badge-green">Active</span><br>Live Web Guide</td>
            <td><strong>COMPLETE</strong><br>Digital-only by design</td>
          </tr>
        </tbody>
      </table>

    </div>

    <!-- Running Footer -->
    <div class="footer-strip">
      <span>The History Department &bull; Section 1: Departmental RAG Status Matrix</span>
      <span>Page 2 of 4</span>
    </div>
  </div>

  <!-- ========================================================================== -->
  <!-- PAGE 3: UNIVERSAL 16-PAGE BOOKLET TECHNICAL SPECIFICATION CATALOG -->
  <!-- ========================================================================== -->
  <div class="page" id="page-3">
    <div>
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline;">
        <span style="font-size: 10pt; font-weight: 900; text-transform: uppercase; letter-spacing: 1.5px;">Section 2: Universal 16-Page Booklet Technical Specification</span>
        <span style="font-size: 7pt; font-weight: 800; text-transform: uppercase; color: #444444;">Publisher Standard</span>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 5px;">
        
        <!-- Page Geometry & Imposition -->
        <div class="spec-card">
          <div class="spec-card-title">
            <span>A. Page Geometry &amp; Imposition</span>
            <span class="badge badge-black">Dimensions</span>
          </div>
          <div style="font-size: 6.8pt; line-height: 1.25; color: #1f2937;">
            &bull; <strong>Page Dimensions:</strong> A4 portrait container (272mm height, 100% width).<br>
            &bull; <strong>Booklet Binding:</strong> 16-page saddle-stitched 4-sheet signature (folded A3 or duplexed A4 into A5 booklet).<br>
            &bull; <strong>Print Margins:</strong> Uniform 10mm (<code style="font-size: 6.2pt;">margin: 10mm 10mm 10mm 10mm;</code>) across all pages.<br>
            &bull; <strong>Screen Pixel Budget:</strong> Strictly calibrated at <strong>794px × 1123px</strong> (0px overflow threshold).<br>
            &bull; <strong>Photocopier Safety:</strong> Pure high-contrast monochrome (#000000 on #ffffff / #fafafa).
          </div>
        </div>

        <!-- Departmental Typography Hierarchy -->
        <div class="spec-card">
          <div class="spec-card-title">
            <span>B. Typography &amp; Exact Font Sizes</span>
            <span class="badge badge-black">Fonts</span>
          </div>
          <div style="font-size: 6.8pt; line-height: 1.25; color: #1f2937;">
            &bull; <strong>Cover Unit Title:</strong> <code style="font-size: 6.2pt;">Playfair Display</code> serif bold 900 &bull; <strong>17.5pt</strong> (line-height 1.10).<br>
            &bull; <strong>Department Banner:</strong> <code style="font-size: 6.2pt;">Inter</code> sans-serif bold 900 uppercase &bull; <strong>12.0pt</strong> (spacing 2.5px).<br>
            &bull; <strong>Subheadings &amp; Badges:</strong> <code style="font-size: 6.2pt;">Inter</code> bold 800–900 uppercase &bull; <strong>7.0pt–7.5pt</strong>.<br>
            &bull; <strong>Body &amp; Analytical Text:</strong> <code style="font-size: 6.2pt;">Georgia</code> serif &bull; <strong>8.8pt</strong> (line-height 1.30).<br>
            &bull; <strong>Docked Editorial Panels:</strong> <code style="font-size: 6.2pt;">Inter</code> sans-serif &bull; <strong>5.8pt–6.8pt</strong> bold.<br>
            &bull; <strong>Pearson Ruled Writing Lines:</strong> Solid black <strong>1.5px</strong> &bull; height <strong>7.0mm</strong>.
          </div>
        </div>

      </div>

      <!-- Page-by-Page 16-Page Blueprint Breakdown -->
      <div class="spec-card" style="margin-bottom: 5px;">
        <div class="spec-card-title">
          <span>C. Complete 16-Page Functional Architecture Breakdown</span>
          <span class="badge badge-black">16-Page Signature</span>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; font-size: 6.6pt; line-height: 1.22; color: #111827;">
          <div style="border-left: 2px solid #000; padding-left: 5px;">
            <strong>Page 1: Publisher-Grade Front Cover</strong><br>
            &bull; <strong>Left Column (108mm):</strong> Massive portrait photograph (base64 embed) + Archival Primary Record accession plate (<code style="font-size: 6pt;">GPO-D388-052</code>).<br>
            &bull; <strong>Right Column (66mm):</strong> Pupil Portfolio, Paper 2 exam tariffs, 5-Enquiry Sequence roadmap, 10-milestone chronology, and PFC technique model answer.
          </div>

          <div style="border-left: 2px solid #000; padding-left: 5px;">
            <strong>Pages 2–3: Living Timeline &amp; Panoramic Dual-Coding</strong><br>
            &bull; 6 Chronological Milestones across 1964–1973 with generous <strong>48mm blank sketch canvases</strong>.<br>
            &bull; Student dual-coding missions linked directly to lesson content.<br>
            &bull; Zero clutter: eliminated all unnecessary synthesis questions.
          </div>

          <div style="border-left: 2px solid #000; padding-left: 5px;">
            <strong>Pages 4–5: Enquiry 1 (KT 2.1 — Road to War: Water Wars)</strong><br>
            &bull; <strong>Verso:</strong> 10-Q recall Do Now, Vocab distinction, 2x Q1 Consequence [4m+4m].<br>
            &bull; <strong>Recto:</strong> Q2 Analytical Narrative [8m] with 3-phase structure strip, causal connectives, word bank, and full-page 7.0mm ruled response lines.
          </div>

          <div style="border-left: 2px solid #000; padding-left: 5px;">
            <strong>Pages 6–7: Enquiry 2 (KT 2.2 — Course of Six-Day War)</strong><br>
            &bull; <strong>Verso:</strong> 10-Q recall Do Now, Vocab distinction, 2x Q1 Consequence [4m+4m].<br>
            &bull; <strong>Recto:</strong> Q3 Explain Importance [8m] with 2 focus aspects, evaluative structure strip, and full-page ruled lines.
          </div>

          <div style="border-left: 2px solid #000; padding-left: 5px;">
            <strong>Pages 8–9: Enquiry 3 (KT 2.3 — Occupied Lands &amp; Res 242)</strong><br>
            &bull; <strong>Verso:</strong> 10-Q recall Do Now, Vocab distinction, 2x Q1 Consequence [4m+4m].<br>
            &bull; <strong>Recto:</strong> Q2 Analytical Narrative [8m] with 3-phase structure strip and full-page ruled lines.
          </div>

          <div style="border-left: 2px solid #000; padding-left: 5px;">
            <strong>Pages 10–11: Enquiry 4 (KT 2.4 — PLO, Black Sept &amp; Munich)</strong><br>
            &bull; <strong>Verso:</strong> 10-Q recall Do Now, Vocab distinction, 2x Q1 Consequence [4m+4m].<br>
            &bull; <strong>Recto:</strong> Q3 Explain Importance [8m] with structure strip and full-page ruled lines.
          </div>

          <div style="border-left: 2px solid #000; padding-left: 5px;">
            <strong>Pages 12–13: Enquiry 5 (KT 2.5 — Yom Kippur &amp; Oil Crisis)</strong><br>
            &bull; <strong>Verso:</strong> 10-Q recall Do Now, Vocab distinction, 2x Q1 Consequence [4m+4m].<br>
            &bull; <strong>Recto:</strong> Q2 Analytical Narrative [8m] with 3-phase structure strip and full-page ruled lines.
          </div>

          <div style="border-left: 2px solid #000; padding-left: 5px;">
            <strong>Pages 14–16: Departmental Back-Matter Masterclass</strong><br>
            &bull; <strong>Page 14 (Knowledge Organiser):</strong> Bilingual Hebrew &amp; Arabic glossary, key territories, operational data, and causal matrices.<br>
            &bull; <strong>Page 15 (Grade 9 Masterclass):</strong> PFC model, connectives, Band 4 criteria prompts, and full benchmark exemplar.<br>
            &bull; <strong>Page 16 (Assessment &amp; Digital Hub):</strong> Portfolio Tracker, WWW/EBI grid, and vector QR mobile quiz hub.
          </div>
        </div>
      </div>

      <!-- Pedagogical Design Innovations -->
      <div style="border: 1.4px solid #000000; border-radius: 4px; padding: 5px 8px; background: #fafafa;">
        <div style="font-size: 7.2pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; border-bottom: 1px solid #000; padding-bottom: 2px;">
          Key Pedagogical Innovations of the 16-Page Architecture
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; font-size: 6.5pt; line-height: 1.22; color: #374151;">
          <div>
            <strong>1. Zero Page-Flipping Friction:</strong><br>
            Booklet lies flat on the student's desk. Raw evidence, Do Now, and vocabulary are on the left; structured analytical writing is on the right.
          </div>
          <div>
            <strong>2. High-Yield Retrieval Pacing:</strong><br>
            10-question bell-ringer Do Now isolates prior-lesson and prior-unit knowledge, eliminating same-lesson recall errors.
          </div>
          <div>
            <strong>3. SEND &amp; Accessibility Calibration:</strong><br>
            1.5px thick black lines (7.0mm height) prevent handwriting drift. Zero sub-8pt micro-text in student reading passages.
          </div>
        </div>
      </div>

    </div>

    <!-- Running Footer -->
    <div class="footer-strip">
      <span>The History Department &bull; Section 2: Universal 16-Page Booklet Technical Specification</span>
      <span>Page 3 of 4</span>
    </div>
  </div>

  <!-- ========================================================================== -->
  <!-- PAGE 4: CLASSROOM REPROGRAPHICS PROTECTION & PHASED ROLLOUT PROTOCOL -->
  <!-- ========================================================================== -->
  <div class="page" id="page-4">
    <div>
      <div style="border-bottom: 2px solid #000000; padding-bottom: 2px; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline;">
        <span style="font-size: 10pt; font-weight: 900; text-transform: uppercase; letter-spacing: 1.5px;">Section 3: Classroom Reprographics Protection &amp; Phased Rollout Protocol</span>
        <span style="font-size: 7pt; font-weight: 800; text-transform: uppercase; color: #444444;">Operational Policy</span>
      </div>

      <!-- The Core Directive -->
      <div style="border: 2px solid #b91c1c; border-radius: 4px; padding: 8px 12px; margin-bottom: 6px; background: #fef2f2;">
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
          <span class="badge badge-red">Strict Reprographics Guardrail</span>
          <span style="font-size: 7.5pt; font-weight: 900; text-transform: uppercase; color: #991b1b; letter-spacing: 0.5px;">
            The "Zero Classroom Disruption" Rule
          </span>
        </div>
        <div style="font-size: 7.2pt; color: #7f1d1d; line-height: 1.28;">
          Physical workbooks are currently printed, bound, and in daily classroom use for:
          <strong>Year 7 Water and Sanitation Through Time</strong>, 
          <strong>Year 8 Early Modern World &amp; Global Encounters</strong>, and 
          <strong>Year 9 Causes of the Great War</strong>.
          Under NO circumstances may automated extraction scripts, database builds, or PDF compilation commands overwrite or alter the active HTML and PDF files of these three units while pupils are using them in class.
        </div>
      </div>

      <!-- Why We Cannot Modify Mid-Term -->
      <div class="spec-card" style="margin-bottom: 6px;">
        <div class="spec-card-title">
          <span>Why Active Units Must Remain Frozen Mid-Term</span>
          <span class="badge badge-black">Operational Rationale</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; font-size: 6.8pt; line-height: 1.24; color: #1f2937;">
          <div style="border-left: 2px solid #000; padding-left: 5px;">
            <strong>1. Teacher Slide Parity:</strong><br>
            Teacher lesson slide decks, Do Now answers, and task instructions cite exact page numbers and question boxes in the physical booklets. Modifying the files breaks lesson alignment.
          </div>
          <div style="border-left: 2px solid #000; padding-left: 5px;">
            <strong>2. Pupil Work Continuity:</strong><br>
            Pupils have completed written work in their physical copies. Generating new layouts online creates split-version confusion for homework, catch-up, and cover teachers.
          </div>
          <div style="border-left: 2px solid #000; padding-left: 5px;">
            <strong>3. School Reprographics Budget:</strong><br>
            Schools operate on rigid reprographics budgets and cannot re-print hundreds of bound booklets mid-term. Updates must synchronize with scheduled termly reprint windows.
          </div>
        </div>
      </div>

      <!-- Phased Rollout Sequence -->
      <div class="spec-card" style="margin-bottom: 6px;">
        <div class="spec-card-title">
          <span>Two-Phase Rollout Architecture</span>
          <span class="badge badge-black">Deployment Schedule</span>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 7pt; line-height: 1.25; color: #111827;">
          <div style="background: #f0fdf4; border: 1.2px solid #16a34a; border-radius: 3px; padding: 6px 8px;">
            <div style="font-weight: 900; text-transform: uppercase; color: #15803d; font-size: 7.2pt; margin-bottom: 2px;">
              Phase 1: Immediate Rollout (Unprinted &amp; Upcoming Units)
            </div>
            <div style="color: #166534; font-size: 6.6pt; line-height: 1.22;">
              All active development is focused on units whose booklets are <strong>not yet printed</strong> for the upcoming term:<br>
              &bull; <strong>GCSE Conflict in the Middle East:</strong> Finish Key Topics 1 and 3 using the newly proven 16-page template.<br>
              &bull; <strong>Year 8 Industrialisation, Empire &amp; Power:</strong> Complete Lessons 2–8 delivery plans and compile the 20-page double-page booklet.<br>
              &bull; <strong>Year 9 Great War Part 2:</strong> Migrate 9 lessons to 2-page double-page spreads.<br>
              &bull; <strong>GCSE Early Elizabethan England:</strong> Consolidate to 36-page master pack and 16-page key topic booklets.<br>
              &bull; <strong>GCSE Weimar and Nazi Germany:</strong> Author 4-4-4-4 Visual Guide and 16-page booklets.
            </div>
          </div>

          <div style="background: #eff6ff; border: 1.2px solid #2563eb; border-radius: 3px; padding: 6px 8px;">
            <div style="font-weight: 900; text-transform: uppercase; color: #1d4ed8; font-size: 7.2pt; margin-bottom: 2px;">
              Phase 2: Vacation Reprint Window (Frozen Units Upgrade)
            </div>
            <div style="color: #1e40af; font-size: 6.6pt; line-height: 1.22;">
              Modernizations for Year 7 Sanitation, Year 8 Early Modern, and Year 9 Causes of the Great War are developed in <strong>parallel staging files</strong> (<code style="font-size: 6pt;">twopage_v2.html</code>):<br>
              &bull; Active files remain 100% frozen during teaching weeks.<br>
              &bull; Staged 4-Act narratives and double-page booklets are thoroughly validated and audited during term time.<br>
              &bull; At the end of the term (vacation reprint window), the staged files are promoted to canonical status, ready for the reprographics room to print before the next academic cycle starts.
            </div>
          </div>
        </div>
      </div>

      <!-- Departmental Sign-Off & Approvals -->
      <div style="border: 1.5px solid #000000; border-radius: 4px; padding: 6px 10px; background: #ffffff;">
        <div style="font-size: 7.5pt; font-weight: 900; text-transform: uppercase; letter-spacing: 0.8px; border-bottom: 1.2px solid #000000; padding-bottom: 2px; margin-bottom: 5px; display: flex; justify-content: space-between;">
          <span>Official Departmental Sign-Off &amp; Approvals</span>
          <span>The History Department &bull; GCSE History Revision Hub</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; font-size: 6.8pt; line-height: 1.22;">
          <div>
            <strong>Curriculum Architecture:</strong><br>
            <span>Christine Counsell 4-Act Framework</span><br>
            <span style="color: #15803d; font-weight: 800;">✓ Approved &amp; Standardized</span>
          </div>
          <div>
            <strong>Booklet Standard:</strong><br>
            <span>16-Page Double-Page Spread (KT2 Master)</span><br>
            <span style="color: #15803d; font-weight: 800;">✓ Approved &amp; Standardized</span>
          </div>
          <div>
            <strong>Reprographics Policy:</strong><br>
            <span>Zero Mid-Term Disruption Protocol</span><br>
            <span style="color: #15803d; font-weight: 800;">✓ Enforced &amp; Active</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Running Footer -->
    <div class="footer-strip">
      <span>The History Department &bull; Section 3: Classroom Reprographics Protection Protocol</span>
      <span>Page 4 of 4</span>
    </div>
  </div>

</body>
</html>
`;

async function exportDepartmentRoadmapPdf() {
  console.log(
    'Launching Puppeteer to generate Departmental Master Roadmap & 16-Page Blueprint PDF...',
  );
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--allow-file-access-from-files', '--disable-web-security'],
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const tempPdfPath = path.resolve(
    'public/pdfs/Departmental_Master_Roadmap_and_16Page_Booklet_Blueprint_2026.pdf',
  );

  await page.pdf({
    path: tempPdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '8mm', bottom: '8mm', left: '8mm', right: '8mm' },
  });

  await browser.close();
  console.log('Successfully generated PDF at:', tempPdfPath);

  // Define distribution targets
  const targetDirs = [
    path.resolve('G:/My Drive/AAMX/Dep File/00_Department_Admin_and_Policies'),
    path.resolve('G:/My Drive/AAMX/Dep File'),
    path.resolve('admin_internal/department_files'),
    path.resolve('public/pdfs'),
  ];

  const fileNames = [
    'Departmental_Master_Roadmap_and_16Page_Booklet_Blueprint_2026.pdf',
    'History Department Master Plan & Curriculum Tracker (2026).pdf',
  ];

  for (const dir of targetDirs) {
    if (fs.existsSync(dir)) {
      for (const fname of fileNames) {
        const dest = path.join(dir, fname);
        fs.copyFileSync(tempPdfPath, dest);
        console.log(`Copied to: ${dest}`);
      }
    } else {
      console.log(`Directory does not exist: ${dir}`);
    }
  }

  // Also copy the markdown file
  const mdSource = path.resolve('DEPARTMENT_MASTER_PLAN_AND_TRACKER.md');
  if (fs.existsSync(mdSource)) {
    const mdTargets = [
      path.resolve(
        'admin_internal/department_files/History Department Master Plan & Curriculum Tracker (2026).md',
      ),
      path.resolve(
        'G:/My Drive/AAMX/Dep File/00_Department_Admin_and_Policies/History Department Master Plan & Curriculum Tracker (2026).md',
      ),
      path.resolve(
        'G:/My Drive/AAMX/Dep File/History Department Master Plan & Curriculum Tracker (2026).md',
      ),
    ];
    for (const mdt of mdTargets) {
      const parentDir = path.dirname(mdt);
      if (fs.existsSync(parentDir)) {
        fs.copyFileSync(mdSource, mdt);
        console.log(`Copied markdown to: ${mdt}`);
      }
    }
  }

  console.log('All department files successfully synchronized!');
}

exportDepartmentRoadmapPdf().catch((err) => {
  console.error('Error generating department roadmap PDF:', err);
  process.exit(1);
});
