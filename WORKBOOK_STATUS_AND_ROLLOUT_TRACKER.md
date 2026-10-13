# The History Department: Workbook Perfection & Universal Rollout Tracker (2026–2027)
**Comprehensive Multi-Stage Ledger for 16-Page KS3 Gold Standard Workbooks & GCSE Master Booklets**  
*Single Source of Truth • Academic Year 2026–2027 • Maintained by Department AI Pair-Programmer*

---

## 🏛️ The Gold Standard Workbook Specification (The Benchmark)

Every perfected workbook strictly enforces the architecture established in **Year 7: Medieval England (`medieval_england`)**:

1. **Chromatic & Cover Discipline:**
   - **Pages 1 & 16 (Color Covers):** High-resolution primary artifact/plate (110–118mm height), museum accession metadata (e.g. UNESCO Memory of the World), 4 core features, 3-pillar decoding matrix, disciplinary significance statement, targeted hinge question, and calibrated enrollment/tracking grid.
   - **Pages 2–15 (Monochrome Interior):** Pure `#000000` text, borders, and ruled lines (eliminating all interior navy `#0f284e`, slate `#1e293b`, or gray backgrounds to guarantee crisp, zero-dithering reprographics).
2. **Handwriting Pitch & Page Budget Calibration:**
   - Ruled line pitch calibrated to **`~7.8mm–8.0mm`** across all response areas:
     * `single_12`: 21 lines
     * `split` (4m + 8m / 4m + 12m): 18 lines
     * `interpretations` (8m + 8m): 12 + 12 lines
     * `equal_split` (8m + 8m): 13 + 13 lines
   - **100% `✅ OPTIMAL` Page Budgets:** Zero page overflows (0px) and zero dead void gaps (<30px footer space) verified via automated Puppeteer audits.
3. **Disciplinary Architecture & Stage Paragraph Indexing:**
   - **Verso (Left Page):** 5-Stage Chronological Inquiry Spine with 3 high-yield specification trigger bullets per stage, and prominent paragraph anchor badges (`[1.1]`–`[5.5]`) directly matching the master textbook and projected smartboard reading text.
   - **Recto (Right Page):** Rigorous disciplinary writing tasks with structured analytical stems and connectives.
   - **Zero Knowledge Giveaways:** Purely structural, content-free sentence stems and connectives (no factual hints or dates embedded in stems).
4. **Centrefold & Notes Spreads:**
   - **Pages 8–9 (Centrefold):** Panoramic Dual-Coding Living Timeline (lays 100% flat down the saddle-stitch staple line).
   - **Pages 14–15 (Notes Pages):** Authentic British exercise book layout with a **26mm margin rule** and **32 full-width handwriting lines** per page.
   - **Page 16 (Outside Back Cover):** KS3 Level Assessment Pathways (Emerging to Greater Depth), formal Progress Tracking Ledger, and 5 interactive QR code badges linking to online retrieval quizzes.

---

## 🗺️ Master Curriculum Status Matrix (All 20 Units)

### Tier 1: 🌟 Gold Standard Perfected
*Units that satisfy 100% of the Gold Standard criteria (Monochrome interior, ~8.0mm handwriting pitch, paragraph badges, zero-knowledge stems, notes spread, 0px overflow).*

| Unit ID | Key Stage | Unit Title | Workbook Script & Artifact | Status & Notes |
| :--- | :---: | :--- | :--- | :--- |
| `medieval_england` | KS3 (Y7) | Medieval England, 1066–1485 | [`scripts/render_medieval_england_workbook.cjs`](./scripts/render_medieval_england_workbook.cjs)<br>• `public/pdfs/medieval_england_16p_workbook.pdf` | 🌟 **100% PERFECTED (GOLD STANDARD)**<br>Color covers, 118mm Bayeux plate, monochrome interior, 7.8–8.0mm line pitch, `[1.1]`–`[5.5]` para badges, zero giveaways, 32-line exercise notes pages, 100% `✅ OPTIMAL` audit. (Commit `d62781c2`). |

---

### Tier 2: 🟡 Staged 16-Page / Double-Page (Requires Upgrade to Latest Gold Standard)
*Units with active double-page workbook generators, but built on earlier iterations (e.g. navy interior `#0f284e`, missing paragraph badges, missing exercise notes spread, or older line pitch).*

| Rollout Priority | Unit ID | Key Stage | Unit Title | Current Generator Script | Missing Gold Standard Elements (To-Do) |
| :---: | :--- | :---: | :--- | :--- | :--- |
| **#1** | `monarchy_religion_power` | KS3 (Y8) | Crown, Church, or Parliament (1517–1689) | [`scripts/render_monarchy_religion_power_workbook.cjs`](./scripts/render_monarchy_religion_power_workbook.cjs) | 1. Eliminate interior `#0f284e` (convert to pure `#000000`).<br>2. Replace P14–15 retrieval test with British exercise notes spread (26mm margin, 32 lines).<br>3. Calibrate ruled line pitch to `~7.8mm–8.0mm`.<br>4. Enlarge typography (Playfair 11.4–12pt, Inter 10.8–11.2pt).<br>5. Redesign Front Cover with enlarged plate & decoding matrix. |
| **#2** | `first_british_empire` | KS3 (Y8) | The First British Empire (1600–1783) | [`scripts/render_first_british_empire_workbook.cjs`](./scripts/render_first_british_empire_workbook.cjs) | 1. Convert interior to pure `#000000` monochrome.<br>2. Add paragraph badges `[1.1]`–`[5.5]`.<br>3. Add British exercise notes spread to P14–15.<br>4. Calibrate line pitch to `~7.8mm–8.0mm`.<br>5. Enlarge typography & front cover plate. |
| **#3** | `great_war_part2` | KS3 (Y9) | The Great War: Western Front & Aftermath (1914–1919) | [`scripts/render_great_war_part2_twopage_workbook.cjs`](./scripts/render_great_war_part2_twopage_workbook.cjs) | 1. Convert interior to pure `#000000` monochrome.<br>2. Add British exercise notes spread to P14–15.<br>3. Calibrate line pitch to `~7.8mm–8.0mm`.<br>4. Zero-knowledge connective audit. |
| **#4** | `second_british_empire` | KS3 (Y8) | The Second British Empire & Imperialism | [`scripts/render_second_british_empire_workbook.cjs`](./scripts/render_second_british_empire_workbook.cjs) | 1. Convert interior to pure `#000000` monochrome.<br>2. Add paragraph badges `[1.1]`–`[5.5]`.<br>3. Add British exercise notes spread to P14–15.<br>4. Calibrate line pitch to `~7.8mm–8.0mm`. |
| **#5** | `industrialisation_and_empire` | KS3 (Y8) | Industrialisation, Empire & Power (1750–1900) | [`scripts/render_industrialisation_twopage_workbook.cjs`](./scripts/render_industrialisation_twopage_workbook.cjs) | Currently a 20-page double-page workbook across 8 lessons. Needs refactoring to the new 16-page Gold Standard architecture (or curated 8-enquiry 20p standard with monochrome interior and ~8.0mm lines). |

---

### Tier 3: 🔴 Unconverted / Legacy (No Modern Double-Page Workbook)
*Units that have NO modern double-page workbook generator script. Only legacy raw drafted text or obsolete 4-page single-column formats exist.*

| Unit ID | Key Stage | Unit Title | Current Status | Required Action to Perfect |
| :--- | :---: | :--- | :--- | :--- |
| `the_shoah` | KS3 (Y9) | The Shoah (Holocaust Education) | Core text drafted; 0 double-page workbook. | Author bespoke `scripts/render_the_shoah_workbook.cjs` (16-page Gold Standard). |
| `cold_war` | KS3 (Y9) | The Cold War (1945–1991) | Prose drafted; 0 double-page workbook. | Author bespoke `scripts/render_cold_war_workbook.cjs` (16-page Gold Standard). |
| `post_war_britain` | KS3 (Y9) | Rights, Protest & Post-War Britain | Prose drafted; 0 double-page workbook. | Author bespoke `scripts/render_post_war_britain_workbook.cjs` (16-page Gold Standard). |
| `second_world_war` | KS3 (Y9) | Second World War | Curriculum draft only; 0 workbook. | Complete curriculum drafting and author 16-page Gold Standard workbook. |
| `australia` | KS3 (Y8/9) | History of Australia | Elective depth study; 0 modern workbook. | Author 16-page elective workbook. |

---

### Tier 4: 🔒 Classroom Frozen / Protected (In Pupils' Hands)
*Units strictly protected under the "Zero Mid-Term Disruption Rule". Active files must NOT be modified mid-term. Upgraded V2 versions are developed in parallel and staged for the scheduled vacation reprint window.*

| Unit ID | Key Stage | Unit Title | Active Classroom State | Staged V2 State (Vacation Reprint Ready) |
| :--- | :---: | :--- | :--- | :--- |
| `water_and_sanitation` | KS3 (Y7) | Water and Sanitation Through Time | 🔒 Bound & on pupils' desks | Staged in `render_water_and_sanitation_twopage_workbook.cjs` / `pupil_workbook_v2.html` on branch `feat/4act-v2-reprint`. |
| `early_modern_world` | KS3 (Y8) | Early Modern World & Global Encounters (1450–1750) | 🔒 Bound & on pupils' desks | Staged in `render_early_modern_world_twopage_workbook.cjs` on branch `feat/4act-v2-reprint`. |
| `great_war` | KS3 (Y9) | Causes of the Great War (1870–1914) | 🔒 Bound & on pupils' desks | Staged in `render_great_war_twopage_workbook.cjs` on branch `feat/4act-v2-reprint`. |

---

### Tier 5: 🟢 GCSE Master Revision Packs & Workbooks (Edexcel 9–1)
*GCSE units featuring complete multi-topic double-page workbooks, publisher textbooks, and Master Knowledge Retrieval Companions.*

| Unit ID | Specification Tier | Topic / Coverage | State of Workbooks & Companions |
| :--- | :--- | :--- | :--- |
| `cme_new` | Paper 2 (Conflict in Middle East) | KT1, KT2, KT3 (1945–1995) | 🟢 **COMPLETE:** 3x 16-page double-page workbooks + 20-page Master Companion (`Conflict_in_the_Middle_East_Master_Knowledge_Retrieval_Companion.pdf`). |
| `edexcel_medicine` | Paper 1 (Medicine & Western Front) | Medieval, Renaissance, 18th-19th, Modern, Western Front | 🟢 **COMPLETE:** 5x 16-page period workbooks + 28-page Thematic Master Companion + 12-page Western Front Master Companion. |
| `eee` | Paper 2 (Early Elizabethan England) | Key Topics 1, 2, 3 (1558–1588) | 🟢 **COMPLETE:** 3x 16-page workbooks + 72-page Master Workbook. |
| `weimar_nazi_germany` | Paper 3 (Weimar & Nazi Germany) | Key Topics 1, 2, 3, 4 (1918–1939) | 🟢 **COMPLETE:** 4x 16-page workbooks + 96-page Master Workbook. |
| `usa` | Paper 3 (The USA, 1954–1975) | Key Topics 1, 2, 3, 4 | 🟢 **COMPLETE:** 4x Key Topic workbooks + 24-page Master Knowledge Retrieval Companion. |
| `trip_ypres` | GCSE Fieldwork | Ypres & Somme Battlefield Tour | ⚪ **DIGITAL COMPANION ONLY:** 14 interactive field stops; intentionally non-printed. |

---

## 🪜 The KS3 Workbook Perfection Rollout Ladder (Sequence of Execution)

To systematically perfect the entire KS3 curriculum without omitting any unit:

```text
[STEP 1] ─── Year 7: Medieval England (medieval_england) ─────── 🌟 100% PERFECTED (DONE)
   │
   ▼
[STEP 2] ─── Year 8: Crown, Church or Parliament (monarchy_religion_power) ── 🟡 NEXT UP (READY)
   │
   ▼
[STEP 3] ─── Year 8: The First British Empire (first_british_empire) ───────── 🟡 QUEUED
   │
   ▼
[STEP 4] ─── Year 9: The Great War: Western Front & Aftermath (great_war_part2) 🟡 QUEUED
   │
   ▼
[STEP 5] ─── Year 8: The Second British Empire (second_british_empire) ─────── 🟡 QUEUED
   │
   ▼
[STEP 6] ─── Year 8: Industrialisation, Empire & Power (industrialisation) ──── 🟡 QUEUED
   │
   ▼
[STEP 7] ─── Year 9: Unconverted Units (The Shoah ➔ Cold War ➔ Post-War Britain) 🔴 QUEUED
   │
   ▼
[STEP 8] ─── Vacation Reprint Cycle (Year 7 Sanitation, Year 8 Early Modern, Year 9 Great War) 🔒 FROZEN
```

---

## 🔔 Permanent AI Assistant Rollout Compass Protocol

**Built-In Requirement:**  
In **every turn and recommendation**, regardless of the specific topic being worked on, the agent must include the **Workbook Rollout Compass**:
> 🧭 **Workbook Rollout Compass:**  
> **Last Perfected:** Year 7 *Medieval England* (`medieval_england`) 🌟  
> **Next in Queue:** Year 8 *Crown, Church, or Parliament* (`monarchy_religion_power`) 🟡  
> **Remaining Ladder:** *First British Empire* ➔ *Great War Part 2* ➔ *Second British Empire* ➔ *Industrialisation* ➔ *The Shoah / Cold War / Post-War Britain*
