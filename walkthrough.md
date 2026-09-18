# Departmental Migration & Visual Quality Walkthrough: Medieval England & The Great War (Part 2)

## Executive Summary
Following your instructions:
1. **Year 9 The Great War, Part 2** (`great_war_part2`, 1914–1919, 7 lessons) has been completely migrated to the departmental **4-Act Dramatic Lesson Architecture** (web app) and the **20-Page Double-Page Spread Pupil Workbook Standard** (physical print), joining `industrialisation_and_empire` and `medieval_england`.
2. A comprehensive audit across both **Year 7 Medieval England** and **Year 9 The Great War (Part 2)** was conducted to verify that all workbooks, textbooks, cheat sheets, quiz packs, and databases are complete, correct, and contain **zero occurrences of `'undefined'`**.
3. Thorough browser visual inspections were conducted across all workbooks and textbooks for both units, verifying that primary source images (including the Stubbington War Memorial Shelter and Bayeux Tapestry) and facing double-page spreads display with zero layout overflows and pristine typography.

---

## 1. Year 9 The Great War (Part 2): 4-Act Architecture & Curriculum Refactor

### A. 4-Act Dramatic Lesson Structure
All 7 lessons in [`units/great_war_part2/data.js`](file:///c:/Projects/the-history-revision-hub.netlify.app/units/great_war_part2/data.js) are now structured into the departmental 4-Act model:
- **Act 1: Context & Catalyst** — Baseline reality and military/civilian mobilization (`Source A`).
- **Act 2: Escalation & Conflict** — Core tactical deadlock, technological innovation, or home front clash (`Source B`).
- **Act 3: Primary Sources & Forensic Evidence** — Immersive primary dispatches, trench diaries, intercepted letters, or gazettes (`Source C` & `Source D`).
- **Act 4: Historical Verdict & Historiographical Debate** — Competing academic interpretations (e.g. Pennell vs Traditional View, Travers vs Prior & Wilson, Ferguson vs Stevenson) and 3-Tier scaffolded extended writing.

### B. Departmental Specification Standards Enforced:
- **Paragraph Indexing:** Strictly indexed using `<span class="para-ref">[1.1]</span>`, `<span class="para-ref">[2.1]</span>`, `<span class="para-ref">[3.1]</span>`, `<span class="para-ref">[4.1]</span>`.
- **Sequential Source Lettering:** Flat sequence per lesson (`Source A`, `Source B`, `Source C`, `Source D`) with zero duplicate letters and zero sub-indices (e.g., no `Source A1`).
- **Pedagogical Recall Isolation:** All 7 Do Now bell-ringers strictly test prior knowledge (Causes of the Great War, Schlieffen Plan, Trench Stalemate, Medieval and Empire themes) without testing current-lesson content.
- **Teacher Notes & Hinge Questions:** Structured teacher notes with lesson primers, objective-specific primers with hinge questions, and primary source context blurbs concluding with targeted discussion hinges.
- **Local Hampshire Historical Connections:**
  - **The Pompey Pals** (14th & 15th Battalions, Hampshire Regiment) at the Somme and Thiepval.
  - **Private Arthur Tribbeck** (Fareham soldier of the Hampshire Regiment) buried at Sucrerie Military Cemetery, Colincamps.
  - **The Lowry Brothers** of Manor Way Grange, Lee-on-the-Solent.
  - **The Stubbington War Memorial Shelter** on the Village Green (commemorating the 67 local fallen).

---

## 2. Bespoke 20-Page Double-Page Spread Pupil Workbook (`great_war_part2`)

Authored [`scripts/render_great_war_part2_twopage_workbook.cjs`](file:///c:/Projects/the-history-revision-hub.netlify.app/scripts/render_great_war_part2_twopage_workbook.cjs), producing an exact **20-page double-page spread workbook** (5 A3 sheets saddle-stitched):

| Page | Content | Spread Position |
| :--- | :--- | :--- |
| **Page 1** | Front Cover (Stubbington War Memorial Shelter image, title, pupil metadata box) | Recto |
| **Page 2** | Learning Tracker (Self-assessment RAG ratings for all 7 lessons) | Verso |
| **Page 3** | Enquiry Roadmap (Chronological spine: 1914–1919 & Western Front sector map) | Recto |
| **Pages 4–17** | **7 Double-Page Spreads (Lessons 1 to 7)**<br>• **Left (Verso):** Learning Objectives, Do Now Retrieval Grid, Disciplinary Vocab, Act 1 & 2 Tasks, Act 3 Archival Evidence Box (Sources A–D)<br>• **Right (Recto):** Act 4 Structure Strip, Causal Connectives, Milestones, and Extended Writing Space | Verso / Recto Spreads |
| **Page 18** | Unit Disciplinary Glossary Vault (30 core historical terms) | Verso |
| **Page 19** | Pupil Voice & Learning Reflection (Key turning point judgment & target setting) | Recto |
| **Page 20** | Departmental Marking Policy & Formula | Verso |

---

## 3. Comprehensive Audit: Zero "Undefined" Verified

Ran the automated audit script ([`scripts/audit_undefined.cjs`](file:///c:/Projects/the-history-revision-hub.netlify.app/scripts/audit_undefined.cjs)) across all curriculum data, HTML books, workbooks, cheat sheets, quiz packs, and databases for both units:

```
====================================================
🔍 AUDITING FOR UNDEFINED STRINGS & PAGE COUNTS
====================================================

▶ Unit: [medieval_england]
  - units/medieval_england/data.js: 0 undefined occurrence(s)
  - units/medieval_england/cheat_sheet.html: 0 undefined occurrence(s)
  - units/medieval_england/pupil_workbook.html: 0 undefined occurrence(s) (24 pages)
  - units/medieval_england/textbook.html: 0 undefined occurrence(s)
  - public/units/medieval_england/cheat_sheet.html: 0 undefined occurrence(s)
  - public/units/medieval_england/content.html: 0 undefined occurrence(s)
  - public/units/medieval_england/mastery_pack_full.html: 0 undefined occurrence(s)
  - public/units/medieval_england/pupil_workbook.html: 0 undefined occurrence(s) (24 pages)
  - public/units/medieval_england/quiz_pack.html: 0 undefined occurrence(s)
  - public/units/medieval_england/textbook.html: 0 undefined occurrence(s)

▶ Unit: [great_war_part2]
  - units/great_war_part2/data.js: 0 undefined occurrence(s)
  - units/great_war_part2/cheat_sheet.html: 0 undefined occurrence(s)
  - units/great_war_part2/pupil_workbook.html: 0 undefined occurrence(s) (20 pages)
  - units/great_war_part2/textbook.html: 0 undefined occurrence(s)
  - public/units/great_war_part2/cheat_sheet.html: 0 undefined occurrence(s)
  - public/units/great_war_part2/content.html: 0 undefined occurrence(s)
  - public/units/great_war_part2/mastery_pack_full.html: 0 undefined occurrence(s)
  - public/units/great_war_part2/pupil_workbook.html: 0 undefined occurrence(s) (20 pages)
  - public/units/great_war_part2/quiz_pack.html: 0 undefined occurrence(s)
  - public/units/great_war_part2/textbook.html: 0 undefined occurrence(s)

  - public/database.json [medieval_england]: 0 undefined occurrence(s)
  - public/database.json [great_war_part2]: 0 undefined occurrence(s)

====================================================
🎉 100% CLEAN: Zero occurrences of "undefined" found!
====================================================
```

---

## 4. Visual Browser Inspection Results

The browser subagent visually rendered and inspected both workbooks and textbooks:
1. **`great_war_part2/pupil_workbook.html`**:
   - **Page 1 Cover:** The Stubbington War Memorial Shelter photograph renders crisp and centered.
   - **Pages 2 & 3:** Learning Tracker and Enquiry Roadmap are balanced and legible.
   - **Pages 4 & 5 (Lesson 1 Facing Spread):** Sources A, B, C, D render cleanly with archival styling; writing lines align with structure strip and connectives; zero text clipping or page overflows.
2. **`great_war_part2/textbook.html`**:
   - Header, table of contents, recruitment poster sources, trench diagrams, Odd One Out vocabulary tasks, and numbered paragraph references load with high visual polish.
3. **`medieval_england/pupil_workbook.html`**:
   - Page 1 cover displays the Bayeux Tapestry Battle of Hastings illustration cleanly; 24 pages fit with zero overflow warnings.
4. **`medieval_england/textbook.html`**:
   - Portchester Castle hero banner, Chapter 1 claimant comparison table, and primary source medallions load cleanly.

---

## 5. Pipeline Sync & Git Verification
- Executed `node scripts/sync_unit.cjs great_war_part2`:
  - Syntax check: Passed cleanly.
  - Task uniformity linter: Passed 100% clean.
  - `database.json` refreshed with 16 units.
  - Exported `great_war_part2_pupil_workbook_FINAL_V17.pdf` and `great_war_part2_textbook_FINAL_V17.pdf`.
  - Re-aligned `workbook_page_map.js` and `workbook_page_map.json`.
  - Layout overflow audit: Passed with 0 overflows.
- Executed `node verify_images.cjs`: All images verified (no corrupt HTML files).
- Git pre-commit hooks passed: Clean commit `4dca8708` pushed to `origin main`.
