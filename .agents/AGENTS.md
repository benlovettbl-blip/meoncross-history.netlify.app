

## Layout Checks
Always proactively check for layout overflows, spilling text, and missing title pages after making any structural HTML changes.

## New Unit Creation
When the user asks to build, add, or create a new unit:
1. DO NOT ask the user to follow the manual steps. You must do it for them automatically.
2. Duplicate the "great_war" folder and rename it to the new unit's ID.
3. Help the user insert their new content into the new "index.html".
4. Automatically update the "tabMappings" in the new unit's "app.js" to match the new page structure.
5. Automatically run "node extract_units.js <new_unit_id>" to compile the new unit.
6. Automatically use "node check_overflows.js" (pointed to the new unit) to ensure there are zero layout bugs before finishing.

## Curriculum & Pedagogical Validation
When creating or modifying curriculum data (such as `data.js`), you must automatically perform the following consistency and pedagogical checks before finishing:
1. **Source Consistency:** Ensure that any visual source provided (the image file) perfectly matches its title, caption, and the specific tasks/questions asked about it. Proactively spot and fix mismatched descriptions.
2. **Pedagogical Recall (Do Nows):** Ensure that all "Do Now" or bell-ringer activities *strictly* ask recall questions from *previous* lessons. They must never ask about content from the current lesson.
3. **Model Answers:** Verify that all generic placeholder model answers are replaced with historically accurate, detailed models.

## Prevent Data Loss
Before running destructive commands (like `git reset --hard` or `git clean`) or running automated parsing scripts (like `extract_units.js`) that will completely overwrite major curriculum files (such as `app.js`, `index.html`, or `data.js`), you MUST:
1. Stop and ask the user for explicit permission to overwrite their files.
2. If approved, automatically create a timestamped backup copy of the target file in a `temp_backups` folder before executing the overwrite.


## Copyright Checks
Whenever generating new features or content (especially visual sources or text), you MUST always double-check for copyright issues. Ensure visual sources are copyright-free or explicitly note if they require licensing. Notify the user before adding potentially copyrighted material, as the software is intended for commercial sale.

## Teacher Notes & Pedagogical Priming
Whenever you are asked to generate or modify lesson content (e.g., adding a new lesson to `data.js`), you MUST automatically include a detailed, structured `teacher_notes` property at the root of the lesson object.
The `teacher_notes` property MUST be an object following this exact schema:
1. `primer`: A high-level paragraph explaining the overarching pedagogical goal of the lesson.
2. `objectives`: An array of objects, one for each learning objective. Each object must contain:
    - `objective`: The specific learning objective text.
    - `primer`: Actionable instructions for the teacher on how to achieve this objective, referencing specific paragraphs or tasks in the narrative.
    - `question`: A "Hinge Question" designed to check student understanding of this specific objective.

## Proactive Planning & Design Persona
Act as an experienced app builder and an experienced history teacher. Whenever completing a task or planning work, always think ahead and provide 1 to 3 proactive recommendations at the end of your output. These recommendations should suggest where to go next in terms of architecture, design, structure, layout, pedagogy, content, historical knowledge, or pupil tasks.

## Printed Workbook Vocabulary Tasks
Whenever generating or modifying the `generate_worksheets.js` Node script for printed A4 workbooks, you MUST ensure that the vocabulary exercises dynamically rotate between three distinct pedagogical styles (e.g., based on the lesson index: `lessonIndex % 3`):
1. **Contextual Cloze:** A fill-in-the-blank summary using the words.
2. **Vocabulary Mapping:** A task asking the student to write a historically accurate sentence connecting two terms from a provided glossary box.
3. **Mini-Frayer Model:** A grid for 1-2 words requiring a definition, historical example, and non-example/sketch.
This prevents pupil fatigue and ensures diverse cognitive engagement.

## Printed Workbook Timeline Tasks
Whenever generating or modifying the `generate_worksheets.js` Node script for printed A4 workbooks, if a lesson contains a `do_now.type === "timeline"`, you MUST render it as a 'Domino Flowchart'. The script must print the events inside randomly scattered/shuffled CSS boxes on the page. The instructions must tell the student to 'draw arrows connecting the events in the correct chronological and causal order'.


## Automated Database Sync (Safe Unit Mode)
Whenever you (the AI agent) make structural changes to any unit's curriculum files (such as `data.js`), modify lesson titles, add a new unit, OR when the user explicitly asks you to "sync", you MUST automatically run the unified safe unit sync command:
`node scripts/sync_unit.cjs <unit_id>` (or `npm run sync:unit <unit_id>`)
This single unified pipeline automatically executes in sequence:
1. Syntax validation of the modified `data.js`
2. Database refresh (`node scripts/build_database.cjs`) to update `public/database.json` for the web app
3. Fresh PDF compilation with Puppeteer (`node scripts/export_pdfs.cjs <unit_id>`, automatically skipped for digital-only `trip_ypres`)
4. Page map alignment (`node scripts/generate_workbook_page_map.cjs`) so app page links match printed booklets
5. Page layout overflow audit (`node scripts/check_overflows.cjs <unit_id>`) to guarantee 0 layout bugs
Do NOT run `npm run sync` globally unless explicitly requested, as this risks breaking other units. You must run this safe unit-targeted pipeline proactively so the user never has to remember or type the commands themselves.

## Video Injection Metadata
Whenever injecting a new ERA or YouTube video link into a lesson, you MUST automatically fetch the URL's metadata and accurately determine its exact duration (e.g., '5 mins 11 secs') rather than using placeholder text like 'Short clip'.
## "How Useful" Scaffolding (Provenance Clues)
Whenever you create or modify a "How useful" source assessment question **specifically for the Medicine Through Time (Paper 1) unit**, you MUST provide scaffolding clues for provenance. Students find provenance very difficult, so the scaffolding box must include specific hints (e.g., using a `provenance_clue` property) that prompt them to consider the author, audience, and motive of the source. Do not apply this rule to other units unless explicitly asked.


## Wikimedia Image Thumbnails
Whenever you need to add an image from Wikimedia Commons for a historical figure or source, ALWAYS use the Wikimedia API to fetch the embeddable 500px thumbnail URL (e.g. `https://en.wikipedia.org/w/api.php?action=query&titles=X&prop=pageimages&format=json&pithumbsize=500`) instead of guessing the raw `.jpg` file path, as raw paths often lead to 404 errors due to Wikimedia's hotlinking restrictions.


## Edexcel GCSE Exam Specification: Feature Questions
Whenever generating or evaluating Edexcel GCSE History exam questions specifically for Paper 1 (Medicine) or Early Elizabethan England, remember the question structure and format changes:
1. **Paper 1 (Medicine):** The 'feature' questions appear **ONLY in Section A (The British Sector of the Western Front, 1914–18)**, structured as two separate 2-mark questions: Q1(a) 'Describe one feature of...' [2 marks] and Q1(b) 'Describe one feature of...' [2 marks]. Section B (the thematic study: Medieval to Modern) does NOT have feature questions (it consists of Q3 similarity/difference [4 marks], Q4 explain why [12 marks], and Q5/Q6 essay [16 marks]).
2. **Early Elizabethan England (Paper 2):** 'Describe one feature of...' appears twice as two separate 2-mark questions (Q1(a) and Q1(b)).
Ensure all exam practice forms, UI templates, and generated assessments reflect this specification.

### Fallback for Hotlink-Protected Images
If a Wikimedia Commons URL works via the API (or curl) but returns a 403 Forbidden broken image icon in the browser (due to Wikimedia's hotlinking protection on high-traffic images), you MUST completely bypass hotlinking. Download the 500px thumbnail image directly into the `public/images/` directory using a Node script or curl, and update the JSON curriculum data to reference the local file path (e.g., `/images/vesalius.jpg`). This guarantees the image will always load flawlessly in the web app.

## Edexcel GCSE Exam Specification: Consequence Questions
Whenever generating or evaluating Edexcel GCSE History exam questions specifically for Paper 2 (Middle East), remember that the 'consequences' question format has changed. There is no longer an 8-mark question asking to 'Explain two consequences of...'. It is now a single 4-mark question asking to 'Explain one consequence of...'. Ensure all exam practice forms, UI templates, and generated assessments reflect this updated 4-mark format.

## Auto-Git Checkpoint
Before running any automated extraction scripts, rebuilding the database, or making large structural refactors to curriculum files, you MUST automatically run `git add .` and `git commit -m "Auto-backup checkpoint before <task>"` if the workspace is clean and has untracked or modified files. This ensures a robust version history that can be instantly restored if anything breaks.

## Data Syntax Validator
Before running `node extract_units.js` or `node build_database.cjs`, you MUST quickly validate the syntax of any `data.js` or `data.json` files you just modified to ensure they do not contain trailing commas, missing brackets, or JavaScript syntax errors that could crash the extraction process.

## Strict Containment
Unless the user explicitly asks you to work globally or sync all units, you are STRICTLY FORBIDDEN from viewing, opening, or modifying files in any unit folders other than the specific unit the user is currently focused on.
Furthermore, when fixing a bug or adding a feature that requires modifying a **global script** (e.g., PDF generators like `generate_workbooks.js` or `core_app.js` that apply to all units), you MUST wrap your code changes in an explicit unit check (e.g., `if (unitId === 'great_war')`) to isolate the new behavior to the current unit ONLY. You must never change the default behavior for other units without explicit permission, as this risks breaking older units (especially due to the heavy structural variation between KS3 and GCSE formats).
This completely isolates your workflow and guarantees you cannot accidentally alter other units.

## Automated Image Verification (Anti-Corruption)
Before pushing any code to GitHub or triggering a Netlify deployment, you MUST automatically run `node verify_images.cjs`. This script physically checks the `public/images/` directory to ensure no Wikipedia downloads have silently failed (e.g. 403 HTML error pages masquerading as `.jpg` files). If the script flags any broken files, you must halt the deployment, fix the broken files using the updated `fetch_wikimedia_images.js` script or manual fallback, and re-run the verification until it passes cleanly.


## Automatic Visual Source Inspection
Whenever you fetch, download, or add a new visual source (image) to a lesson, you MUST automatically use your iew_file tool to visually inspect the downloaded image. You must verify that the image content perfectly matches the intended historical subject, caption, and alt text. If the image is incorrect, you must re-fetch a correct image or update the descriptive text to accurately reflect the source (e.g., specifying if it is a painting rather than a photograph). This must be done proactively before completing the task.


## No AI Images
STRICT RULE: Do NOT generate or use AI images (e.g., via generate_image tool) for any historical content, curriculum data, or cover images. You MUST ONLY use authentic, historical photographs or primary source illustrations. This app is for educational purposes and strictly forbids AI-generated historical imagery.

## Global Iconography Policy for Educational Content
Restrict FontAwesome / decorative icon usage strictly to high-level UI controls (such as the main sidebar navigation, view switchers, modal triggers, print buttons, and audio read-aloud controls). Keep all historical source presentations, reading boxes, and teacher commentary strictly typography-driven (using small-caps `.archival-meta-tag`, classical serif headings `.archival-source-title`, `.archival-shelfmark-stamp`, and structured tabular/footnote data). Never inject colored, playful, or decorative icons (e.g. quote-left, magnifying-glass, bullseye, image icons) inside historical excerpts or academic commentary to preserve an authentic, museum-archive feel throughout all units.

## Archival Watermark & Seal Styling
In place of colored icons, use a faint, subtle monochrome archival shelfmark stamp (`.archival-shelfmark-stamp`) or simple hairline dividers (`.archival-hairline`) for official school documentation boxes, family archives, and provenance containers to give them an understated, authentic institutional look. For official institutional provenance, use the `.archival-seal` micro-stamp badge.

## Primary Source Citation Box Standard
Formalize all primary historical excerpts across all units (including Medicine Through Time, Weimar Germany, and the Great War) into the reusable `.archival-source-box` pattern. Each citation box must feature:
1. An `.archival-source-header` with an `.archival-meta-tag` category label on the left and a boxed `.archival-shelfmark-stamp` (repository and accession shelfmark/gazette issue) on the right.
2. An `.archival-source-title` with serif styling.
3. An `.archival-source-body` rendering verbatim primary text in an authentic historical serif face (`Georgia` or `Playfair Display`) with subtle warm archival parchment background.
4. An `.archival-citation-footer` separated by a 1px hairline divider detailing historical provenance, combat action, date, and publication volume.

## Family Archive Hero Banners: Aspect Ratio & Artifact Standard
Whenever generating, selecting, or updating hero banners for pupil family heroes (such as local soldiers researched by pupils, the Crummack archive, or the Lowry brothers at Manor Way Grange):
1. **16:4 / 4:1 Panoramic Aspect Ratio**: Standardize on a wide 16:4 / 4:1 panoramic hero aspect ratio (e.g., 1600x400px or 1600x360px).
2. **Physical Primary Artifacts Over Portrait Headshots**: Hero banners MUST feature physical primary artifacts (such as mounted combat medals, original trench caps, medals displays, field letters, wartime journals, or trench maps laid horizontally) aligned cleanly to the right (`banner_position: 'center right'`), rather than portrait headshots. Portrait headshots inevitably suffer from extreme zoom distortion, pixelation, and vertical clipping when stretched across wide full-bleed CSS banners (`.lesson-hero`).
3. **Headshot Placement**: Portrait headshots of soldiers must strictly be placed within dedicated biographical profile cards, narrative sidebar figures, or archival citation boxes in the lesson body, never as the full-bleed hero background.

## Master Pedagogical Blueprint & Lesson Architecture
Whenever authoring or refactoring lesson content across KS3 and GCSE units, you MUST adhere to the following standards:
1. **Four-Act Dramatic Structure**:
   - **Act 1: Context & Catalyst (The Outpost / Setting the Stage):** Establishes baseline reality and geopolitical mindset before the crisis (`Source A`).
   - **Act 2: Escalation & Conflict (The Boiling Point):** Core historical mechanism, geopolitical maneuver, or military clash (`Source B`).
   - **Act 3: Primary Sources & Forensic Evidence (The Archival Core):** Immersive primary dispatches, intercepted letters, or courtroom confessions (`Source C` & `Source D`).
   - **Act 4: The Historical Verdict & Historiographical Debate:** Competing academic interpretations (e.g., Fraser vs Edwards, Seeley vs Tharoor) and 3-Tier scaffolded extended writing.
2. **Pure Paragraph Indexing Standard (`[Act.Paragraph]` Notation)**:
   - Index **paragraphs only** using `<span class="para-ref">[1.1]</span>`, `<span class="para-ref">[2.1]</span>`, `<span class="para-ref">[3.1]</span>`.
   - NEVER index individual sentences (`[1.1]`, `[1.2]`, `[1.3]`), as this causes cognitive clutter.
   - All tasks must explicitly signpost pupils to exact paragraphs (e.g., *"Using paragraphs [3.1]–[3.3], explain how..."* or `(P4)`).
3. **Universal Source Lettering & Zero Sub-Indices**:
   - Sources within every lesson must follow a strictly sequential single-letter sequence: `Source A`, `Source B`, `Source C`...
   - Sub-indices (`Source A1`, `Source A2`, `Source B2`) are STRICTLY FORBIDDEN.
   - Zero duplicate letters and zero skips per lesson.
   - Geographical reference maps must be labeled `Reference Map: ...` or `Map A: ...` to avoid colliding with primary sources.
4. **Structured Writing Scaffolding**:
   - Model sentence starters and evidence stems to support initial access and recall.
   - Analytical causal connectives (`Consequently`, `Furthermore`, `This directly resulted in...`) to develop historical explanation.
   - Evaluative criteria prompts to structure high-level judgements and historiographical balance.
   - Every task must include a rigorous, detailed model answer (zero placeholders).
5. **Pedagogical Recall Isolation ("Do Now" Bell-Ringers)**:
   - "Do Now" activities must strictly test recall from *prior* lessons or units. They must NEVER test content from the current lesson.

## Edexcel GCSE Paper 3 Visual Revision Guides: The 4-4-4-4 Question Matrix
Whenever generating, updating, or refactoring a 16-spread (36-page) Edexcel GCSE Paper 3 Visual Revision & Exam Guide (such as for USA 1954–75, and crucially when authoring the future **Weimar and Nazi Germany** guide):
1. **The 4-4-4-4 Matrix Standard**: The 16 double-page spreads across the 4 Key Topics MUST strictly follow an even 4-4-4-4 question distribution:
   - **4x `inference_causation`**: Section A: Q1 Inference [4m] + Q2 Explain Why [12m] (1 per Key Topic)
   - **4x `source_utility`**: Section B: Q3(a) Utility of Sources B and C [8m] (1 per Key Topic)
   - **4x `interpretation_diff_why`**: Section B: Q3(b) Differences in Views [4m] + Q3(c) Suggest Reasons for Difference [4m] (1 per Key Topic)
   - **4x `interpretation_eval`**: Section B: Q3(d) Evaluative Essay with Criteria Judgement [16+4m] (1 per Key Topic)
2. Every single Key Topic (KT1, KT2, KT3, KT4) must contain exactly one spread dedicated to each of the four exam question formats, guaranteeing completely balanced, high-yield exam mastery across Section A and Section B.
3. **Weimar & Nazi Germany Note**: Do NOT build the Weimar and Nazi Germany guide until the user explicitly requests it. When built, it must enforce this exact 4-4-4-4 architecture.

## GCSE Depth of Knowledge (DoK) Calibration & Specification Guardrails
Whenever authoring, enriching, or refactoring curriculum data, revision guides, timelines, or flashcards for Edexcel GCSE units (such as Paper 2 Conflict in the Middle East, Paper 1 Medicine, Paper 2 Early Elizabethan England, Paper 3 USA, or Weimar & Nazi Germany):
1. **Strict Specification Anchoring:** Content must strictly adhere to the official Pearson Edexcel GCSE History specification bullet points and standard GCSE textbooks (e.g. Pearson / Hodder).
2. **Eliminate University-Level / Peripheral Over-Detail:** NEVER inject obscure historical trivia, secondary political figures (e.g. Hosni Mubarak), specific extremist cell factions (e.g. Egyptian Islamic Jihad), or niche diplomatic terminology (e.g. "cold peace") that are not in the GCSE specification or textbooks.
3. **The 2-to-3 High-Yield Points Rule:** For any historical event, cause, or consequence, provide strictly 2 or 3 high-yield, punchy points that directly support the specification bullet points. This prevents pupil cognitive overload, avoids confusing teachers, and ensures revision materials directly maximize exam marks.
