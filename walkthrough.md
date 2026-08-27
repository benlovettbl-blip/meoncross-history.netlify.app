# Curriculum & UI Fixes

I have completed all the requested fixes:

## 1. Middle East Homepage Clean Up
- The broken cover image has been removed.
- The provenance caption ("Source A: A map showing...") has also been completely removed from the Middle East unit homepage.

## 2. Sticky Header Alignment
- The issue where the sticky header was floating too far down on the Middle East unit has been fixed.
- The `margin-bottom` on the unit enquiry blue banner was pushing it down. I've reduced this gap so the sticky header sits beautifully right underneath the blue banner when scrolling.

## 3. Curriculum Overview Revision Sheets
- I've successfully generated the condensed revision sheets for **Water & Sanitation** and **Causes of the Great War**.
- These one-page summaries automatically extract the key topics and overarching learning objectives from your existing data files, creating a perfect roadmap of the curriculum for the pupils.
- The "Curriculum Overview" tab will now dynamically render these revision sheets for both units!

## 4. KS3 Assessment Tab Updates
- I've updated the "Assessments & Exam Practice" tab naming logic. For all KS3 units, it will now simply display **"✍️ Assessments"**.
- Inside the tab for KS3 units, the complex "Exam Practice Zone" generator UI is now completely hidden.
- Instead, it will beautifully render a list of the actual assessments set inside the unit's lessons (as requested, matching what is built into the workbooks). Mock exam rendering functionality will still appear at the bottom if present.
- **Sanitation Update:** I've fixed the bug where the Water and Sanitation assessment page was rendering empty. The web app now correctly pulls and displays the end-of-unit assessments (like the Public Health Domino Flowchart) from your data files.

# Walkthrough: Early Modern World Fixes

## 1. Textbook Cover Cleanup
- Successfully removed the `Scholar / Class` HTML injection from the `generate_textbooks.js` file, ensuring it only appears in the pupil workbook and not on the textbook cover.

## 2. Fixed Orphaned Questions (Strict Numerical Sequence)
- **Issue**: Source-based questions (like Q11 in Lesson 5 and Q6 in Lesson 6) were floating before the main narrative questions (Q1) on the printed page, breaking the numerical sequence.
- **Root Cause**: The generator script assigned the Question Numbers (`qNum`) based on the sequence in the script, where `lesson.sources` came *after* `narrative_blocks`. However, the HTML renderer prints `lesson.sources` *before* `narrative_blocks`. This mismatch caused the source questions to be numbered last (e.g., Q11) but displayed first (e.g., above Q1).
- **Fix**: Re-ordered the `qNum` assignment loop in `generate_pupil_workbooks.js` to strictly match the actual HTML rendering sequence (`Primary Source -> Do Now -> Sources -> Narrative Blocks -> Pair Share`). This guarantees all questions render in strict numerical sequence.

## 3. Updated Lesson 6 Data (Direct JSON Edit)
- Modified `early_modern_world/data.js` to replace the cloned Lesson 5 'Do Now' questions.
- Added 5 brand new 'Do Now' questions for Lesson 6 focused entirely on recalling the ideological content learned in Lesson 5 (The English Civil War, King Charles I, Oliver Cromwell, The Commonwealth, and the merchants' funding of the New Model Army).

## 4. Stripped KS3 Exam Tariffs
- Successfully ran a regex cleanup across `early_modern_world/data.js` to strip out all instances of KS3 exam tariffs (e.g., `(8 Marks)`, `(4 Marks)`) that were appended to question text, ensuring no GCSE-style timing badges appear for this KS3 unit.

## 5. Rebuilt Database and PDF Export
- Ran `node extract_units.js early_modern_world`, `build_database.cjs`, and `generate_tracker_v2.mjs` to safely sync the updated curriculum logic.
- Updated `export_pdfs.js` to point to `_FINAL_V7.pdf` and successfully executed the export. The new `_FINAL_V7.pdf` files are now built and saved in the `public/pdfs/` directory.

> [!TIP]
> **Proactive Recommendations**:
> 1. **Pedagogical Recommendation**: For Lesson 6, consider integrating a visual source analysis of a tobacco or sugar plantation to emphasize the harsh reality behind the "Economic Shift" that generated the merchants' wealth.
> 2. **Structural Design**: If other KS3 units accidentally include `(X Marks)` badges, we can update the core parsing script (`data_parser.js`) to automatically strip any `(X Marks)` strings for all KS3 units globally during the extraction phase, preventing this bug unit-wide.
> 3. **Design Polish**: We can add subtle micro-animations or hover states to the interactive timeline components if we bring them into the main web app in the future.

## 5. Exam Masterclass Tab
- The "Exam Masterclass Guide" tab is now automatically hidden for all KS3 units. It will only display for KS4 units where exam skills are heavily assessed.

## 6. Printed Workbook Enhancements
- **Middle East Geography Cover:** I've customized the "Progress & Assessment Tracker" on the front cover of the Middle East workbooks. The "KT1: Geography of the Middle East" row now correctly omits the "Do Now" tracker and the blank Exam Question lines, keeping the cover much cleaner!
- **Map Task Formatting:** I've removed the redundant blank writing lines that were automatically generating underneath the "Map Task" in the Middle East workbook. This saves valuable space on the printed page, allowing the map itself to be printed significantly larger!

Everything has been synchronized automatically!

### Links
Local web link: http://localhost:3003
Netlify web link: https://meoncross-history.netlify.app
