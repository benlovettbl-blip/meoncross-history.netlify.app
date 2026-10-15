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
5. **The Two-Pillar Master Textbook Standard (Eliminating Dead Chasms & Overflows):**
   To permanently eliminate floating dead chasms (40px–130px voids between narrative prose and primary sources) while strictly guaranteeing 0px page overflow and $\ge 95\%$ page budget efficiency, every master textbook must enforce:
   - **Pillar 1: Upstream Golden Word Budget:**
     * **Verso (Left Page) Acts (Act 1 & Act 2):** Target **180–205 words** per act across 3 paragraphs (`[1.1]`, `[1.2]`, `[1.3]` and `[2.1]`, `[2.2]`, `[2.3]`). Embed authentic primary statistics, troop movements, shell totals, casualties, and demographic figures directly in the prose.
     * **Recto (Right Page) Acts (Act 3 & Act 4):** Target **120–145 words** per act across 2 dense paragraphs (`[3.1]`, `[3.2]` and `[4.1]`, `[4.2]`). This accommodates the Key Figure Card, Concept Spotlight, Fullwidth Archival Dispatch, and Enquiry Writing Box without vertical clipping.
   - **Pillar 2: Layout Engine Architecture (Grounded Flexbox & Dynamic Sizing):**
     * **Verso Grid Flow:** Replace `justify-content: space-between` with `.col-side { display: flex; flex-direction: column; justify-content: flex-start; gap: 6px; height: 100%; overflow: hidden; }`.
     * **Dynamic Source Box Expansion:** Set `.col-side .archival-source-box { flex: 1; display: flex; flex-direction: column; justify-content: space-between; margin: 0; }`.
     * **Dynamic Primary Image Scaling:** Replace hardcoded `height: 110px` or `122px` with `max-height: 145px; min-height: 90px; height: 100%; flex: 1; object-fit: contain;`. The primary source image dynamically absorbs column slack, eliminating dead voids.
     * **Recto Natural Height & Compact Proportions:** In `.right-upper-grid .col-side`, use `justify-content: flex-start; gap: 5px;` and set `.key-figure-box, .concept-spotlight-box { margin: 0; }`. Biographical individual cards and concept spotlights MUST preserve their natural height with tight, compact typography. They MUST NEVER use `flex: 1` or `justify-content: space-between`, which stretches text apart and creates unnaturally tall cards with vertical white voids. Slack absorption on the Recto page is handled by `.col-narrative` and the Fullwidth Archival Dispatch.
6. **Master Revision Back Cover ($\ge 90\%$ Page Budget):**
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
5. **Spiral Curriculum Thematic Strands (Single Source of Truth):**
   - Centrally defined in `src/curriculum_strands.cjs` (`MASTER_DISCIPLINARY_STRANDS` & `UNIT_THEMATIC_STRANDS`).
   - Every KS3 workbook automatically queries `getThematicStrandsForUnit(unitId)` and renders the **"The 4 Big Storylines to Track"** panel on the Page 1 Front Cover:
     1. *Sovereignty, State & Power* (e.g. Divine Right → Civil War, Regicide & Parliamentary Settlement)
     2. *Trade, Technology & Empire* (e.g. Trade Enclaves → Maritime Mercantilism → Corporate Armies)
     3. *Ideology, Faith & Causation* (e.g. Religious Volatility → Reformation Zeal → Counter-Espionage)
     4. *Resistance, Agency & Rights* (e.g. Everyday Resistance → Armed Insurrection → Sovereign Treaties)

6. **Rotating Historical Skills Spiral System (Second-Order Disciplinary Rotation):**
   - The 8 enquiries across each KS3 unit dynamically rotate through discrete historical skills, preventing pupil fatigue and building balanced disciplinary mastery:
     * **Enquiry 1:** *Change & Continuity* (Macro geopolitical balance, periodisation, baseline reality)
     * **Enquiry 2:** *Dual-Source Utility* (Provenance, perspective, author motive, corroboration)
     * **Enquiry 3:** *Causation & Transformation* (Structural causes vs triggers, balance sheets)
     * **Enquiry 4:** *Historical Significance* (Immediate crisis vs long-term institutional legacy)
     * **Enquiry 5:** *Historiographical Debate* (Contrasting academic interpretations, e.g. Macaulay vs Russell)
     * **Enquiry 6:** *Turning Point Analysis* (Decisive shifts, constitutional/financial revolutions)
     * **Enquiry 7:** *Historical Evidence & Forensic Extraction* (Material records, dispatches, human cost)
     * **Enquiry 8:** *Agency & Historical Significance* (Subjugated voices, resistance, long-term impact)
   - **Enquiry Verso Header:** Automatically stamps `<span class="badge">${l.skill}</span>`.
   - **Task 3 Evidence Workspace:** Tailored specifically to the skill (e.g. Interpretation Matrix for historiography, Source Analysis for utility, Balance Sheet for causation).
   - **Page 20 Assessment Progress Ledger:** Automatically tracks and grades the exact assigned historical skill per enquiry.

7. **Page 20: Universal KS3 Outside Back Cover:**
   - Assessment Progress Ledger tracking marks across all enquiries.
   - Mobile QR Matrix linking directly to the online Interactive Revision Hub lessons.

---

## 3. Mandatory Workbook-to-Narrative Stage Synchronization Standard (Zero Classroom Blindness)
To permanently eliminate classroom projection blindness—where teachers and pupils cannot immediately match the 5 workbook enquiry stages on the left page with the reading paragraphs projected on the whiteboard—every KS3 unit must enforce:

1. **Workbook Stage Paragraph Indexing (`paraRef`):**
   - Every stage in `stages: [...]` of the workbook generator MUST define `paraRef: '[Act.Para]'` or `paraRef: '[Act.Para–Act.Para]'` (e.g. `paraRef: '[1.1–1.2]'`).
   - The `.stage-banner` must render the high-visibility paragraph badge:
     ```html
     <span class="badge-pararef" style="background: #1e3a8a; border: 0.8px solid #93c5fd; color: #ffffff; font-family: 'Inter', monospace; font-size: 6.8pt; font-weight: 800; padding: 0.5px 4.5px; border-radius: 2px; white-space: nowrap;">Text ${st.paraRef}</span>
     ```
2. **Curriculum Data Contract (`data.js`):**
   - Every KS3 lesson in `units/<unitId>/data.js` must define a `workbook_stages` array:
     ```javascript
     workbook_stages: [
       {
         step: 1,
         date: 'Aug 1914',
         para_ref: '[1.1–1.2]',
         heading: 'What forced Britain to launch Kitchener’s urgent call for 500,000 volunteers?',
         bullets: ['No Conscription', 'BEF Just 120,000 Men', 'Kitchener’s Dire Call'],
         focus_clue: 'How did Britain’s lack of peacetime conscription force the government into a massive voluntary advertising campaign?'
       },
       ...
     ]
     ```
3. **Interactive Classroom Whiteboard Companion (`src/engine/lesson_renderer.js`):**
   - When `lesson.workbook_stages` is present, the app automatically renders the **5-Stage Chronological Enquiry Spine & Paragraph Anchors** companion drawer at the top of the narrative.
   - Each stage card features an interactive **"Jump to Text ↓"** button that smoothly scrolls the smartboard to the target paragraph and temporarily highlights it with a 2-second gold focus ring.
4. **Mandatory Audit Gate (`scripts/audit_ks3_stage_sync.cjs`):**
   - Enforced automatically as Step 1d in `scripts/sync_unit.cjs`.
   - Validates that 100% of workbook stages have valid `paraRef` badges and that all referenced paragraph numbers physically exist in the lesson's narrative text. Sync aborts immediately if any stage is unlinked.

---

## 4. Automated Verification & Sync Pipeline
Whenever modifying or compiling a KS3 unit, you MUST run the automated quality pipeline:

1. **Stage Synchronization & Paragraph Anchor Audit:**
   ```bash
   node scripts/audit_ks3_stage_sync.cjs <unit_id>
   ```
   Enforces 100% stage-to-paragraph alignment across both the printed workbook and the web application.

2. **Textbook Balance & Disciplinary Audit:**
   ```bash
   node scripts/auto_balance_textbook.cjs <unit_id>
   ```
   Enforces:
   - 0 duplicate facing-page images.
   - 100% primary source context blurbs & hinge questions.
   - 100% PEEL paragraph indexing.
   - 0px overflow across all pages.

3. **Universal KS3 Workbook Compilation:**
   ```bash
   node scripts/generate_ks3_workbook.cjs <unit_id>
   ```
   Compiles the 20-page A4 workbook, calculates ruled lines dynamically, and mirrors to `public/pdfs/`, `dist/pdfs/`, and `G:\My Drive\AAMX\Dep File\Year <N>\<Unit Name>\`.

4. **Safe Unit Sync:**
   ```bash
   node scripts/sync_unit.cjs <unit_id>
   ```
   Validates JavaScript syntax, audits stage synchronization (Step 1d), updates `database.json`, compiles companion PDFs, aligns the workbook page map, and ensures complete Google Drive synchronization.

5. **Sanitization & Image Verification:**
   ```bash
   node scripts/verify_sanitization.cjs
   node verify_images.cjs
   ```
   Ensures 0 institutional branding violations and 0 broken/AI images.

---

## 5. Master 16-Page Saddle-Stitch Pupil Workbook Standard (Gold Architecture)
All 16-page saddle-stitch pupil workbooks (e.g. `render_great_war_twopage_workbook.cjs`) must strictly enforce:
1. **General Notes Pages (Pages 14 & 15):**
   - Page 14 must have a simple, clean header titled "General Notes". Never include "Protocol" instructional boxes or flashcard/cues sidebars.
   - Page 15 must have NO heading at all—a pure, full-page blank ruled lines canvas with red margin for flexible teacher and student use.
   - Ruled lines (27–29 rows) must fill the full printable page down to the footer strip with zero dead underflow space.
2. **Outside Back Cover (Page 16) Marking Grid:**
   - The marking grid contains exactly 6 rows: 5 Enquiries + 1 "Teacher-Designated Assessment Task" (Row 6).
   - NEVER include an "Independent Study & Notes Portfolio" row in the marking grid.
   - Grid rows must be evenly distributed with balanced cell padding (e.g. 20.5px–21px) to absorb vertical space without overflow.
3. **Scaffolding Separation (Workbook vs Web App):**
   - Printed workbook right pages must remain clean, authentic examination workspaces: exam stem, stimulus boxes, key terms bank, generic bare-bones connectives, and ruled writing lines.
   - Extensive scaffolding (sentence starters, 3-column planning boxes, step-by-step hints, model answers) belongs strictly in the interactive web application, NOT in the printed workbook.
4. **Bare-Bones Generic Analytical Connectives:**
   - Connectives printed in workbook question boxes must be generic, purely structural transitions (e.g., `A decisive factor was...`, `This led directly to...`, `Furthermore...`, `As a direct result...`, `Ultimately, this meant that...`).
   - NEVER embed factual clues, dates, or specific historical answers into the connectives list.
5. **GCSE Statement Essay Question Format (Enquiry 5 / Synoptic Task):**
   - Must follow authentic GCSE history statement format:
     `"[Statement]." How far do you agree? Explain your answer. [12 marks]`
   - Stimulus bullets must strictly provide:
     - Bullet 1: A factor agreeing with/supporting the statement.
     - Bullet 2: An alternative/counter-factor disagreeing with the statement.
     - Followed by: `(You must also use information of your own)`.
6. **Chronological Spine Stage Question Variety:**
   - Left-page chronological spine stages (5 stages per enquiry) must strictly rotate question stems across the unit. Avoid repeating "Why did..." or "How did..." on consecutive stages; use varied high-cognitive stems (`What factors led to...`, `In what ways did...`, `Explain why...`, `What forced [X] to...`, `To what extent did...`, `Evaluate why...`).

---

## 6. Cover Visual Architecture Automation Standard (Responsive Artwork Dual-Layout)
All KS3 pupil workbooks and PDF export pipelines must enforce the responsive artwork architecture:

1. **Aspect Ratio Decision Gate:**
   Primary artworks on Page 1 front covers must dynamically adapt to the aspect ratio of the historical artifact:
   - **Landscape / Panoramic Showcase (`top-showcase`):** Aspect Ratio $\ge 1.15$
     * Examples: John Singer Sargent’s *Gassed (1919)* (2.65:1), Loutherbourg’s *Coalbrookdale by Night (1801)* (1.56:1), Walter Crane’s *Imperial Federation Map (1886)* (1.34:1), Francis Fowkes’ *Sydney Cove (1788)* (1.27:1).
     * Structure: 89–90mm full-width cinematic top banner (`object-fit: contain;`) + clean dual-column analytical decomposition deck directly underneath.
     * Left Column: Visual Decoding header, historical context, and 4 Core Features in a balanced 2×2 grid (`border-left: 2px solid #0f284e`).
     * Right Column: 3-Pillar Visual Matrix (`grid-template-columns: 1fr 1fr 1fr;`), Disciplinary Significance Anchor (`border-left: 2.5px solid #0f284e`), and Targeted Disciplinary Hinge Question.
     * Bottom Strip: Museum provenance and collection shelfmark banner.
   - **Portrait Split-Column Plate (`split-column`):** Aspect Ratio $< 1.15$
     * Examples: Nathaniel Dance’s *Robert Clive (c. 1773)* (0.79:1), Hans Holbein’s *Henry VIII (c. 1537)* (0.57:1), Sir William Orpen’s *Signing of Peace (1919)* (0.75:1).
     * Structure: Side-by-side 70mm split grid (`grid-template-columns: 70mm 1fr`).
     * Left Column: 118–122mm framed portrait plate (`object-fit: contain;`).
     * Right Column: Stacked vertical analytical deck (Visual Decoding header, historical context, 4 Core Features vertical stack, 3-Pillar Visual Matrix, Disciplinary Significance Anchor, Targeted Disciplinary Hinge Question, and Museum Provenance banner).

2. **Automated Shared Components (`scripts/components/render_standard_cover.cjs`):**
   - `renderWorkbookCoverCenterpiece({ layout: 'auto', ... })`: Automatically detects aspect ratio via `detectArtworkAspectRatioSync(filePath)` (supporting JPEG, PNG, and WebP) and renders the appropriate layout.
   - `renderMasterKs3FrontCover({ ... })`: Generates the entire publisher-grade Page 1 (Departmental Branding with customizer hook, Pupil Details Strip, Main Title Block, Centerpiece, Course Specification Table, and Academic Footer).

3. **Page Budget & Table Padding Gate:**
   - Never include the redundant 3-column "Disciplinary Strategy Overview & Workbook Blueprint" on Page 1; removing it provides clean vertical space for the Course Specification Checklist table.
   - Course Specification Table cell padding must calibrate dynamically based on enquiry count:
     * 4 Enquiries: `9.0px 8px`
     * 5 Enquiries: `7.4px–7.8px 8px`
     * 6 Enquiries: `6.0px–6.4px 8px`
   - Enforce Page 1 space budget: $\ge 98\%$ utilization, $0\text{px}$ overflow, and $< 25\text{px}$ footer void.


