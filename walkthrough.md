# Year 7 Medieval England: 4-Act Architecture & 24-Page Double-Page Spread Migration

## Executive Summary
Year 7 Medieval England (`medieval_england`, 1066–1485) has been completely migrated to the departmental **4-Act Dramatic Lesson Architecture** (web app) and the **24-Page Saddle-Stitch Double-Page Spread Pupil Workbook Standard** (physical print), integrating primary Hampshire & Meon Valley local history connections.

All pre-commit linters, anti-duplication auditors, layout overflow detectors, and image integrity checks passed with **100% clean marks**.

---

## Key Achievements

### 1. 4-Act Dramatic Lesson Architecture (Web App)
All 9 lessons in [`units/medieval_england/data.js`](file:///c:/Projects/meoncross-history.netlify.app/units/medieval_england/data.js) have been restructured into the departmental 4-Act format:
- **Act 1: Context & Catalyst** — Baseline reality and geopolitical mindset (`Source A`).
- **Act 2: Escalation & Conflict** — Core historical mechanism, legal clash, or military turning point (`Source B`).
- **Act 3: Primary Sources & Forensic Evidence** — Immersive primary dispatches, trial minutes, or chronicle testimonies (`Source C` & `Source D`).
- **Act 4: Historical Verdict & Historiographical Debate** — Competing academic interpretations and 3-Tier scaffolded extended writing with sentence connectives and milestones.

#### Strict Pedagogical Blueprint Compliance:
- **Pure Paragraph Indexing:** Paragraphs strictly indexed with `<span class="para-ref">[1.1]</span>`, `<span class="para-ref">[2.1]</span>`, `<span class="para-ref">[3.1]</span>`, `<span class="para-ref">[4.1]</span>`.
- **Universal Source Lettering:** Sources strictly follow a single sequential sequence per lesson (`Source A`, `Source B`, `Source C`, `Source D`) with zero sub-indices (e.g. no `Source A1`).
- **Pedagogical Recall Isolation:** "Do Now" retrieval grids strictly recall prior lessons and units (zero current-lesson questions).
- **Teacher Notes & Hinge Questions:** Every lesson includes a high-level `primer`, learning `objectives` with specific hinge questions, and `source_context` concluding with a targeted hinge question.

---

### 2. Local Hampshire & Meon Valley Historical Resonance
In accordance with your request, authentic local primary connections were woven into the core curriculum:

#### Lesson 2: Castles, Terror & The Domesday Book
- **Portchester Castle:** Integrated into Act 1 paragraph `[1.2]` and the lesson banner ([`public/images/portchester_seawards.jpg`](file:///c:/Projects/meoncross-history.netlify.app/public/images/portchester_seawards.jpg)). Explains how William I and Henry I constructed a formidable Norman stone keep directly within the existing 3rd-century Roman Saxon Shore fort walls to command Portsmouth Harbour and secure maritime communications with Normandy.
- **Local Domesday Records:** Source D audits the manors of **Portchester**, **Fareham** (*Ferneham*), and **Titchfield** (*Ticefelle*), showing the exact numbers of villagers, ploughlands, and woodland pigs recorded by the King's commissioners.

#### Lesson 5: Doom Paintings and Tithes (Village Life)
- **Bishop’s Waltham Palace (Meon Valley):** Integrated into Act 2 paragraph `[2.2]` and the pupil workbook. Details how Bishop Henry of Blois (Bishop of Winchester and grandson of William the Conqueror) built a palatial estate in the Meon Valley.
- **Local Tithe Extraction:** Explains how Meon Valley serfs surrendered one-tenth of their grain, fleece, and livestock directly to the Bishop's bailiff at the great Waltham tithe barn, and were tried in the episcopal manorial court for withholding dues.
- **Visual Source:** Authentic photograph ([`public/images/bishops_waltham_palace.jpg`](file:///c:/Projects/meoncross-history.netlify.app/public/images/bishops_waltham_palace.jpg)) downloaded, verified, and integrated.

---

### 3. 24-Page Double-Page Spread Pupil Workbook
Authored [`scripts/render_medieval_twopage_workbook.cjs`](file:///c:/Projects/meoncross-history.netlify.app/scripts/render_medieval_twopage_workbook.cjs), perfectly mapping to a standard 6-sheet A3 saddle-stitch booklet (24 pages total):

| Page Range | Content | Page Side |
| :--- | :--- | :--- |
| **Page 1** | Front Cover (Unit title, classical typography, pupil metadata box) | Recto |
| **Page 2** | Assessment Progress Tracker (Lessons 1–9 RAG ratings, dates, scores) | Verso |
| **Page 3** | Chronological Spine (1066–1485) & Hampshire Local Heritage Map | Recto |
| **Pages 4–21** | **9 Double-Page Spreads (Lessons 1 to 9)**<br>• **Left (Verso):** Learning Objectives, Do Now Grid, Disciplinary Vocab, Archival Sources, Task 4 Preparation Bridge<br>• **Right (Recto):** Act 4 Structure Strip, Connectives, Milestones, and Extended Writing Space | Verso / Recto Spreads |
| **Page 22** | Vocabulary Mastery Vault (Unit definitions across 1066–1485) | Verso |
| **Page 23** | Pupil Voice, Reflection & Target Setting | Recto |
| **Page 24** | Outside Back Cover: Departmental Marking Policy & Formula | Verso |

#### Dynamic Task 4 Preparation Bridges (Verso):
- **Lesson 1:** Tactical Battlefield Blueprint & Terrain Analysis (Senlac Hill & Feigned Retreat)
- **Lesson 2:** Norman Motte & Bailey Blueprint (Keep, Motte, Bailey, Portchester Castle Scholar's Edge)
- **Lesson 3:** Crown vs. Church Conflict Ledger (Henry II Common Law vs. Becket Canon Law)
- **Lesson 4:** Archival Forensic Dissection (Magna Carta Clauses 12 & 39)
- **Lesson 5:** Deconstructing the Parish Church Doom Fresco (Hellmouth & Bishop's Waltham Palace Scholar's Edge)
- **Lesson 6:** Socio-Economic Impact Diagram (The Black Death & The Statute of Labourers)
- **Lesson 7:** Revolutionary Balance Sheet of 1381 (Wat Tyler's Demands vs. Richard II's Retribution)
- **Lesson 8:** The Dynastic Crucible: Red Rose vs. White Rose (Bastard Feudalism & Private Armies)
- **Lesson 9:** Capstone Synthesis Matrix (Monarchical Power: Absolute Authority vs. Constitutional Checks)

---

### 4. Quality Assurance & Verification Results
- **Page Layout Overflows:** `node scripts/check_overflows.cjs medieval_england`  
  👉 **Passed with 0 layout overflows across all 24 pages.**
- **Curriculum Source Lettering:** `node scripts/verify_source_lettering.cjs medieval_england`  
  👉 **100% Clean: Strictly sequential single-letter sequence across all lessons.**
- **Task Uniformity & Anti-Duplication:** `node scripts/lint_task_uniformity.cjs medieval_england`  
  👉 **100% Clean.**
- **Image Integrity:** `node verify_images.cjs`  
  👉 **100% Clean: Zero broken HTML or corrupt images.**
- **Curriculum Data Vault:** All 180 original quiz questions (20/lesson) and 39 glossary terms preserved intact.
- **Safe Unit Sync Pipeline:** Executed `node scripts/sync_unit.cjs medieval_england` in 28.8s; compiled fresh PDFs in `public/pdfs/` and refreshed `public/database.json`.
- **Git Checkpoint:** Cleanly committed with commit `9dfe39fb` and pushed to `main`.

---

## Proactive Recommendations

1. **Digital Audio Excerpts for Guided Reading:** While the guided reading extracts for all 9 lessons are fully populated, lessons 1–5 have recorded MP3 narrations while lessons 6–9 currently reference audio filenames. We recommend adding corresponding spoken primary source audio clips for Jean Froissart (John Ball's sermon) and the Crowland Chronicle (Bosworth Field) to maintain immersion for lower-attaining readers.
2. **Interactive Local Map Overlay:** For Lesson 2 and Lesson 5 in the digital web app, consider adding an interactive leaflet/SVG map component linking Portchester Castle, Titchfield Abbey, and Bishop's Waltham Palace so Year 7 pupils can visually trace Norman and medieval episcopal power across the Meon Valley landscape.
3. **Year 8 Early Modern World Migration:** Following the success of both `industrialisation_and_empire` and now `medieval_england` in the 24-page double-page spread format, the next logical curriculum priority is migrating Year 8 **Early Modern World** (1450–1750) to this identical 4-Act and double-page spread standard.
