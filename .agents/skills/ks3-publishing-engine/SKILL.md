---
name: KS3 Publishing Engine
description: Comprehensive publishing standard and automated pipeline for authoring, updating, and compiling Key Stage 3 master textbooks and 2-page double-page pupil workbooks to publisher-grade quality.
---

# Key Stage 3 Publishing Engine

## Trigger
You MUST automatically execute and adhere to this skill whenever the user asks you to:
- Create, add, or build a new Key Stage 3 unit or lesson (Years 7, 8, or 9: `early_modern_world`, `industrialisation_and_empire`, `great_war`, `great_war_part2`, `water_and_sanitation`, `medieval_england`, `the_shoah`, `cold_war`, `post_war_britain`, `australia`).
- Modify, update, or expand the narrative content or pupil tasks of any KS3 unit.
- Compile, generate, or balance KS3 pupil workbooks or companion textbooks.
- Ensure workbooks and textbooks conform to our departmental publisher-grade gold standard.

---

## 1. Master Publisher Textbook Standard (The Gold Standard)
Reference Implementations: `scripts/render_standard_textbook_great_war.cjs`, `scripts/render_standard_textbook_early_modern_world.cjs`, and `scripts/render_standard_textbook_industrialisation.cjs`.

All KS3 companion textbooks must strictly enforce the following architecture:
1. **Approved Front Cover Branding:**
   - Series Masthead: `Key Stage 3 Master Curriculum Series`.
   - Publisher Imprint: `The History Revision Hub • Student Textbook Edition`.
   - Thematic Subtitle: Poetic, narrative subtitle establishing the period's drama.
   - Artwork Plate: Authentic, high-resolution primary source painting or photograph (strictly no AI images).
   - Pupil Portfolio & Syllabus Matrix: Enclosing the unit's core enquiries.
2. **Facing-Page Anti-Duplication Rule:**
   - NEVER show the same historical person or image on facing pages (verso and recto).
   - If a historical person is profiled on the right-hand page (e.g., Sultan Mehmed II, Drake, Catesby, Clarkson, Queen Nanny, Newton), the facing left-hand page MUST feature distinct primary artifacts, maps, or dispatches.
3. **Verso (Left-Hand Pages — Even Pages 2, 4, 6...): Curated Primary Source Archival Core:**
   - Exactly two primary historical sources (`Source A` & `Source B` / `Source C` & `Source D`).
   - Verbatim serif text (`Georgia` or `Playfair Display`) on warm archival tint.
   - Archival Header: Category tag (`.archival-meta-tag`) and official shelfmark stamp (`.archival-shelfmark-stamp`).
   - `.archival-context-box`: Structured context explaining historical provenance, circumstances, and purpose.
   - Targeted Italicized `.archival-hinge-q`: A sharp Hinge Question to spark immediate whole-class debate.
   - Bottom Vocabulary Strip: 3 fingertip definitions.
4. **Recto (Right-Hand Pages — Odd Pages 3, 5, 7...): Disciplinary Architecture & Core Narrative:**
   - Section A: Key Disciplinary Terminology definitions.
   - Section B: Key Individual Profile Card with an **authentic, non-AI primary portrait** (never an oil painting when a photo exists; never hardware/ships replacing a human face).
   - Section C: Core Historical Prose with **Pure PEEL Paragraph Referencing** (`<span class="para-ref">[1.1]</span>`, `<span class="para-ref">[1.2]</span>`, `<span class="para-ref">[2.1]</span>`). Only index paragraphs; never index individual sentences.
   - Section D: Historiographical Spotlight or Turning Point Mechanism.
5. **Master Revision Back Cover ($\ge 90\%$ Page Budget):**
   - 16–18 event visual chronological spine across the period.
   - Analytical framework matrix (e.g. M-A-I-N or Causal Progression).
   - Historiographical debate summary contrasting rival academic interpretations.
   - Disciplinary PEEL extended writing criteria scaffold.

---

## 2. Universal KS3 Declarative Workbook Engine (The Gold Standard)
Reference Implementations: `scripts/ks3_workbook_engine.cjs` and `scripts/generate_ks3_workbook.cjs`.

All KS3 pupil workbooks must strictly enforce the 2-page double-page spread architecture:
1. **Page 1: Publisher-Grade Front Cover:**
   - Institutional Neutrality Customizer: `data-department-name="The History Department"` enclosing `<span class="school-brand-target">The History Department</span>`.
   - Pupil Information Strip: `Name`, `Class`, and `Teacher` (never include target grades on KS3 covers).
   - Full-bleed 52mm primary image plate with archival accession shelfmark.
   - 8-Enquiry Roadmap Grid: Listing all 8 enquiries with specification bullet points.
   - Disciplinary Anchor Box: "How to Write Like a Historian" with 4 golden rules and connectives.
2. **Pages 2–3: Living Timeline & Panoramic Dual-Coding Spread:**
   - Chronological spine of 8 milestones with 48mm sketch canvases for dual-coding.
   - Retrieval timeline check questions at the bottom of both pages.
3. **Verso (Left Page) — Curated Evidence Launchpad & Retrieval:**
   - **Do Now Retrieval Grid:** Exactly 5 questions strictly testing recall from *prior* lessons (never current content).
   - **Task 1: Disciplinary Vocabulary Practice:** Dynamically rotating between Contextual Cloze, Vocabulary Mapping, and Dual-Term Analytical Distinction (or Domino Flowchart for timeline tasks).
   - **Task 2: Archival Forensic Interrogation:** Primary source excerpt with 2-3 scaffolded analysis questions and ruled response lines.
4. **Recto (Right Page) — Extended Disciplinary Writing:**
   - **Enquiry Callout Box:** Prominent blue banner displaying the Enquiry Question verbatim.
   - **3-Column Disciplinary Structure Strip:** Providing analytical guidance for each stage of the response.
   - **PEEL Mastery Writing Strip:** Point, Evidence, Explanation, Link stems.
   - **Dynamic Auto-Lines Flex Target (`data-auto-lines="true"`):** Measured client-side in Puppeteer before printing to fill available height with 7.8mm ruled lines (capped at 17 lines), eliminating underflow gaps while guaranteeing 0px overflow.
   - **Teacher Assessment Rubric & Timeline Mission Signpost:** Quick marking checklist and page reference back to the Pages 2–3 sketchpad.
5. **Page 20: Universal KS3 Outside Back Cover:**
   - Assessment Progress Ledger tracking marks across all enquiries.
   - Mobile QR Matrix linking directly to the online Interactive Revision Hub lessons.

---

## 3. Automated Verification & Sync Pipeline
Whenever modifying or compiling a KS3 unit, you MUST run the automated quality pipeline:

1. **Textbook Balance & Disciplinary Audit:**
   ```bash
   node scripts/auto_balance_textbook.cjs <unit_id>
   ```
   Enforces:
   - 0 duplicate facing-page images.
   - 100% primary source context blurbs & hinge questions.
   - 100% PEEL paragraph indexing.
   - 0px overflow across all pages.

2. **Universal KS3 Workbook Compilation:**
   ```bash
   node scripts/generate_ks3_workbook.cjs <unit_id>
   ```
   Compiles the 20-page A4 workbook, calculates ruled lines dynamically, and mirrors to `public/pdfs/`, `dist/pdfs/`, and `G:\My Drive\AAMX\Dep File\Year <N>\<Unit Name>\`.

3. **Safe Unit Sync:**
   ```bash
   node scripts/sync_unit.cjs <unit_id>
   ```
   Validates JavaScript syntax, updates `database.json`, compiles both companion PDFs, aligns the workbook page map, and ensures complete Google Drive synchronization.

4. **Sanitization & Image Verification:**
   ```bash
   node scripts/verify_sanitization.cjs
   node verify_images.cjs
   ```
   Ensures 0 institutional branding violations and 0 broken/AI images.
