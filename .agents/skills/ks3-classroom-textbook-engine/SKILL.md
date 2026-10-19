---
name: KS3 Classroom Textbook Engine
description: Publishing standard and automated compiler engine for authoring, styling, and compiling Key Stage 3 companion classroom textbooks as pure, high-legibility narrative reading anthologies (8-Page and 12-Page A3 Saddle-Stitch formats).
---

# Key Stage 3 Classroom Textbook Engine

## Core Philosophy: The Textbook vs. The Workbook
A **Classroom Textbook** is a durable, multi-year classroom resource that stays in the school. It is NOT a consumable student workbook.
- **The Pupil Workbook (16 or 20 pages):** The student's personal examination workspace containing Do Now retrieval grids, vocabulary cloze exercises, primary source forensic analysis, 8m/12m/16m ruled writing lines, and teacher marking rubrics.
- **The Interactive Web Application:** The multimedia digital portal containing audio narrations, interactive flashcards, 10-question self-marking retrieval quizzes, and full primary source galleries.
- **The Classroom Companion Textbook:** The student's continuous reading text. Its sole purpose is **immersive, high-legibility, narrative reading** during teacher-led instruction and guided reading.

---

## 1. Zero-Clutter Pure Narrative Mandate
To ensure the reading experience is clear, immersive, and accessible for Key Stage 3 pupils (Years 7–9):
1. **NO Primary Source Plates:** All primary sources, document excerpts, and visual artifact plates belong strictly in the web application and pupil workbook. Do not embed source boxes in the textbook prose.
2. **NO Vocabulary Ribbons:** Vocabulary definitions belong in the web application and pupil workbook tasks. Do not crowd the textbook margins with glossary strips.
3. **NO Writing Tasks or Synthesis Prompts:** Essay stems, 12-mark questions, and exam rubrics belong in the pupil workbook.
4. **NO QR Codes or Student Tracking Ledgers on Back Covers:** Because textbooks stay in the classroom, student progress ledgers and mobile quiz QR codes are redundant and must NOT appear on the back cover.
5. **Exact 1:1 Verbatim Fidelity to App Data:** All prose must be read dynamically from `units/<unit_id>/data.js` (`narrative_blocks`). No words, dates, or historical arguments may be modified or fabricated. Paragraph tags (e.g. `<span class="para-ref">[1.1]</span>`) are cleaned only to prevent duplicate numbering against section headers (`[1.1] TITLE`).

---

## 2. High-Legibility Typography Standards
With sidebars and source boxes removed, page real estate is dedicated entirely to prose readability:
- **Body Font Size:** `10.15pt` to `11.5pt` depending on enquiry word budget (never reduce below `10.0pt`).
- **Line Height:** `1.45` to `1.55` for effortless eye tracking across 2 columns.
- **Font Families:** Classical, high-contrast serif for narrative (`Lora`, Georgia, or Charter); classical serif for display titles (`Cinzel`); italic serif for synopsis/enquiry questions (`Playfair Display`); modern sans-serif for running headers and metadata (`Inter`).
- **Paragraph Referencing:** Every paragraph begins with an explicit bold pill index in the section header: `[X.Y] TITLE`, matching pupil workbook citations 1-to-1.
- **Historical Actors & Concepts:** Key individuals, turning points, and core concepts are bolded directly in the prose for visual anchoring.
- **Column Clearance Guardrail:** Column typography must be calibrated so that every column ends with positive clearance ($\ge +25\text{px}$) above the running footer line, preventing trailing sentence spillovers or footer collisions.

---

## 3. Reprographic Architecture Models (Multiples of 4 Pages / A3 Saddle-Stitch)

### Model A: 8-Page Master Classroom Textbook (2 Folded A3 Sheets)
*Recommended for compact units (e.g., Medieval England 1066–1485).*
- **Page 1: Master Front Cover**
  - **Top Masthead:** `THE HISTORY REVISION HUB • KEY STAGE 3 DISCIPLINARY CLASSROOM TEXTBOOK • YEAR 7 MASTER EDITION`
  - **Date Pill:** `[START_YEAR] – [END_YEAR]`
  - **Main Title & Subtitle:** In `Cinzel` 900 and `Playfair Display` italic.
  - **Hero Artwork Plate:** Authentic primary artwork plate ($80\text{mm}$ height, `object-fit: cover; object-position: center 30%;`) with archival caption.
  - **Canonical Unit Narrative Synopsis:** Exact synopsis text from `src/unit_synopses.js`, set in **Playfair Display italic** (`11pt`, line-height `1.54`), inside a parchment card with navy accent border (`border-left: 4.5px solid #1e3a8a; background: #fdfbf7;`).
  - **The Canonical Enquiries • Scheme of Learning Directory:** Clean directory table listing all enquiries with topic number, bold title, enquiry question in Playfair Display italic (matching app tabs), and page number (`Page 3` to `Page 8`). Zero technical jargon (`Curriculum Enquiry Directory A3 Saddle-Stitch Reader` is strictly forbidden).
- **Page 2: Master Chronological Milestone Spine**
  - Twelve decisive milestones & causal dominoes arranged along a vertical chronology spine with circular nodes, date boxes, titles, and narrative paragraph cross-references (`Ref [X.Y]`).
- **Pages 3–7: Five Canonical Enquiries (1 Full Page per Enquiry)**
  - Running header: `THE HISTORY REVISION HUB • KS3 HISTORY | Enquiry 0X • Page Y`.
  - Enquiry banner: `ENQUIRY 0X` pill, `Pillar 1 • Core Narrative` tag, title in `Cinzel`, and `Key Enquiry Question` badge.
  - 2-Column justified narrative prose with section headers `[X.1]` to `[X.5]`.
  - Calibrated font size (`10.15pt`–`11.15pt`) ensuring zero spillover and positive clearance above footer.
- **Page 8: Master Knowledge Retrieval Quiz Back Cover (25 Questions)**
  - Top masthead: `BACK COVER • RETRIEVAL ENGINE | MASTER KNOWLEDGE RETRIEVAL QUIZ`.
  - Instructions banner: `Standard Recall Protocol: 25 core retrieval questions testing factual mastery across all five enquiries. Use for low-stakes weekly partner testing, silent memory flash-checks, or end-of-unit homework retrieval. (Answers verified in textbook narrative; zero answers printed.)`
  - 5 Enquiry Quiz Cards (5 questions each, Qs 1–25), set in `9.5pt` Lora with `line-height: 1.48`, filling the vertical space evenly with $8\text{px}$ clearance and zero loose voids.

---

### Model B: 12-Page Double-Page Spread Textbook (3 Folded A3 Sheets)
*Used when each enquiry requires a full 2-page spread ($2 \text{ pages} = \text{Verso} + \text{Recto}$).*
- **Page 1:** Master Front Cover.
- **Page 2:** Master Chronological Milestone Spine.
- **Pages 3–11:** Five Double-Page Spreads (Verso Part I + Recto Part II).
- **Page 12:** Master 60-Question Knowledge Retrieval Quiz Back Cover ($2 \times 2$ grid + full-width bottom card).

---

## 4. Automated Reprographics & Page Budget Audit Gates
Every compiled textbook MUST pass automated Puppeteer auditing before release:
1. **0px Overflow Gate:** Every single page must satisfy `scrollHeight <= clientHeight + 2px`.
2. **Column Spillover Clearance Gate:** Every column must maintain a positive clearance ($\ge +25\text{px}$) above the running footer line. Trailing sentences must not collide with or overhang the footer.
3. **Space Utilization Gate:** Run `audit_page_budget.cjs`. Space utilization must be $\ge 95\%$ across all pages (`✅ OPTIMAL`).
4. **Institutional Neutrality Gate:** Strictly neutral branding under *"The History Revision Hub"*. Never include school names, school domains, or personal identifiers.
5. **Dual Output Sync:** Synchronizes HTML to both `public/units/<unit_id>/textbook.html` and `units/<unit_id>/textbook.html`, and compiles print-ready A4 PDF to `public/pdfs/<unit_id>_textbook_FINAL.pdf`.
