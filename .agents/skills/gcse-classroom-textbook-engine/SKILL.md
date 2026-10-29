---
name: GCSE 28-Page Master Classroom Textbook Engine
description: Publishing standard and automated compiler engine for authoring, styling, and compiling 28-page pure narrative GCSE (Key Stage 4) classroom textbooks as saddle-stitch A3 print publications.
---

# GCSE 28-Page Master Classroom Textbook Publishing Standard

## Core Philosophy: The Pure Narrative Textbook
A **GCSE Classroom Textbook** is a durable, multi-year classroom resource. It is NOT a consumable pupil workbook, revision guide, or exam practice pad.
- **The Pupil Workbook:** Consumable workspace for the 5-Stage Chronological Inquiry Spine, lecture/reading note-taking, disciplinary writing practice, and living timelines.
- **The Interactive Web Application:** Multimedia digital portal with audio narrations, interactive flashcards, primary source galleries, and quizzes.
- **The Classroom Textbook (Exactly 28 Pages):** The student's continuous, immersive reading text. Its sole purpose is **rich, unbroken disciplinary historical narrative reading** during teacher-led instruction, guided reading, and independent study.

---

## 1. Zero-Clutter Pure Narrative Mandate
To ensure high-immersion reading and deep schema construction:
1. **NO Primary Source Plates:** All cartoons, source extracts, and forensic question stems belong in workbooks and web apps.
2. **NO Vocabulary Margin Strips or Glossaries:** Do not interrupt the reading flow with sidebars.
3. **NO Exam Stems or Rubrics:** Keep the textbook timeless and decoupled from shifting exam mark schemes.
4. **NO In-Prose Paragraph Numbering Pills:** Never insert repetitive bracketed pills (`<span class="para-pill">[1.3]</span>`) into the body text. Numbering belongs strictly in the block section header (`[1.3] 1920–1936 Zionist Pioneers...`).
5. **NO Archaic Symbols:** Do NOT use `§`, `Δ`, or esoteric glyphs. Use clean, professional typographic badges (`KEY ENQUIRY QUESTION` and `DECISIVE HISTORICAL MECHANISM`).

---

## 2. High-Legibility Typography & Ergonomics
- **Body Font:** High-legibility classical serif (`Lora`, Georgia, or Charter), strictly **$11.5\text{pt}$ to $12.0\text{pt}$** (never reduce below $11.0\text{pt}$).
- **Line Height:** $1.58$ to $1.62$ for comfortable reading.
- **Display Headings:** Dignified classical serif (`Cinzel`, 700/800/900 weight).
- **Metadata & Badges:** Clean modern sans-serif (`Inter`, 600/700/800 weight).
- **Prose Color:** Deep slate ink (`#1e293b`), never washed-out gray or harsh pitch black.
- **2-Column Layout:** $18\text{mm}$ side margins, $13\text{mm}$ top/bottom margins, $8\text{mm}$ column gap.

---

## 3. Strict 28-Page Master Booklet Architecture (7 Folded A3 Sheets)
Physical saddle-stitched booklets require multiples of 4 pages. An in-depth GCSE unit consists of exactly 28 pages:

### Page 1: Master Front Cover
- **Top Masthead:** `THE HISTORY REVISION HUB • MASTER CURRICULUM SERIES | KEY STAGE 4 • PEARSON EDEXCEL GCSE [OPTION]`
- **Title Block:** Prominent title in Cinzel 900 ($23\text{pt}$), subtitle in Lora italic, and date range badge (`1945 – 1995`).
- **Hero Artwork Plate:** Authentic primary photograph or artwork ($82\text{mm}$ width, $76\text{mm}$ height) with archival caption underneath.
- **Atmospheric Story Blurb:** Titled `HISTORICAL OVERVIEW • [DATES]` (strictly NO corporate headings like "Volume Scope" or "Crossroads of Fire"). Two narrative paragraphs setting the human drama.
- **12-Enquiry Table of Contents Directory:** White card grid ($2 \times 6$) displaying all 12 Enquiries with code badges (`KT 1.0` to `KT 3.3`), titles ($8.2\text{pt}$ bold), page locators (`pp. 4–5`), and enquiry focus questions ($7.5\text{pt}$ italic).
- **Dynamic Font Scaler:** Must execute `autoFitCoverEnquiries()` in browser to dynamically scale font size to maximize page space while maintaining an $8\text{px}–20\text{px}$ footer gap.
- **Zero Clutter:** Strictly NO "Core Concepts" strip and NO duplicate specification headers on the cover.

### Page 2: Master Chronological Milestone Spine
- **Chronology Highway:** 15 defining causal turning points / milestones arranged vertically with connecting spine line, circular node dots, date badges (`width: 17mm`), titles, and paragraph cross-references (`Ref [X.Y]`).
- **Purpose:** Advance organizer providing students with an unbroken chronological anchor before thematic inquiry.

### Page 3: Geopolitical Theater Atlas & 4 Strategic Flashpoints
- **Dual Cartographic Perspectives (Side-by-Side):**
  - *Map 1 (Regional Theater):* Macro map showing surrounding states, alliances, maritime chokepoints, and oil corridors.
  - *Map 2 (Conflict Corridor / Territorial Core):* Micro map showing disputed borders, occupied territories, armistice lines, and strategic topography.
  - Images housed in calibrated containers (`height: 94mm; object-fit: contain;`) with descriptive analytical captions.
- **4 Strategic Flashpoints Section ($2 \times 2$ Grid):**
  - Four distinct cards analyzing topography, water resources, maritime chokepoints, and strategic depth buffers.
  - Sized and auto-scaled via `autoFitPage3Flashpoints()` to guarantee $0\text{px}$ overflow and an optimal footer gap ($8\text{px}–20\text{px}$).
  - Strictly zero syllabus duplication with Page 1.

### Pages 4–27: 12 Canonical Disciplinary Enquiry Spreads (2 Pages Each)
Each enquiry is strictly contained within ONE flat double-page spread ($2\text{ pages} = \text{Verso} + \text{Recto}$):
- **Verso (Left Page / Part I):**
  - Running header: Series name & enquiry number.
  - Title banner: Enquiry title + prominent `KEY ENQUIRY QUESTION` badge and question text.
  - 2-Column body prose: **Block 1 (`[X.1]`)** and **Block 2 (`[X.2]`)**. Target word count: $390–420$ words.
  - Running footer with page number.
- **Recto (Right Page / Part II: Climax, Turning Points & Consequences):**
  - Running header: Series name & Part II designation.
  - Recto banner: Part II subtitle + prominent `DECISIVE HISTORICAL MECHANISM` badge and causal thesis.
  - 2-Column body prose: **Block 3 (`[X.3]`)** and **Block 4 (`[X.4]`)**. Target word count: $390–420$ words.
  - Running footer with page number.

### Page 28: Master 60-Question Knowledge Retrieval Quiz (Back Cover)
- **Classroom Retrieval Header:** Title `Master Knowledge Retrieval Quiz`, subtitle `60 Essential Recall Questions • [Unit Title]`, badge `Partner Quiz or Solo Practice`.
- **Instruction Banner:** Actionable instructions for paired oral quizzing and independent notebook practice.
- **6 Topic Cards ($2 \times 3$ Grid):** Exactly 6 cards covering 2 enquiries each. Each card contains 10 rigorous recall questions (total 60 questions) numbered 1 to 60.
- **Narrative Cross-References:** Every card header cites the exact paragraph range (e.g., `pp. 4–7 • Ref [1.1]–[2.4]`).
- **Zero Answers Printed:** Keeps the back cover strictly active for oral or written retrieval practice.

---

## 4. Reprographics & Page Budget Audit Standard
Every textbook MUST pass the automated headless browser audit before release:
1. **0px Overflow Gate:** Every single page must satisfy `scrollHeight <= clientHeight + 4px`. Any overflow is a fatal build error.
2. **Page Budget Gate:** Footer voids strictly $\le 25\text{px}$; page space utilization $\ge 95\%$ (`✅ OPTIMAL`).
3. **No Blank Pages:** Exactly 28 pages from front cover to back quiz.
4. **Strict School Anonymity:** Zero mentions of any school-specific identifiers. Publisher branding is strictly *"The History Revision Hub"*.

---

## 5. Turnkey CLI Execution
```bash
# Compile and audit a unit textbook:
node scripts/render_standard_textbook_cme_unified.cjs

# Or using the generalized master engine:
node scripts/render_master_textbook_engine.cjs --unit=<unit_id>
```
Outputs:
- Interactive HTML: `public/units/<unit_id>/textbook_UNIFIED.html`
- Print-ready PDF: `public/pdfs/<unit_id>_textbook_UNIFIED_FINAL.pdf`
