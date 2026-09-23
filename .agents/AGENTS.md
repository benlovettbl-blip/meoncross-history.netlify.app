## Strict School Anonymity & Commercial Neutrality Policy
STRICT RULE: You are STRICTLY FORBIDDEN from using the name of the user's school ("Meoncross", "Meoncross School") in ANY user-facing text, page titles, document headers, footers, meta tags, printed booklets, worksheets, PDFs, PowerPoint presentations, mark schemes, teacher notes, audio scripts, or curriculum files (`data.js`, `index.html`, etc.).
1. **Commercial Independence:** The platform is an independent commercial educational product intended for wider sale and multi-school adoption. It must maintain 100% strict institutional neutrality.
2. **Approved Branding Terminology:** Always use the platform's public title ("The History Revision Hub" / "GCSE History Revision Hub") or generic departmental designations ("The History Department", "The History Portal", "Fieldwork Primary Record", "Fieldwork Archive").
3. **No Associated School Identifiers:** Never include school-specific email domains (`@meoncross.co.uk`), school telephone numbers, school archive seals, teacher surname nameplates (render pupil/teacher fields with blank lines `<span class="line"></span>`), or student family links that identify the school.
4. **Mandatory Sanitization Audit:** Before completing any work or deploying, run `node scripts/verify_sanitization.cjs` to guarantee 0 instances of the school name in the repository.
5. **Git Pre-Commit Sanitization Guardrail:** `node scripts/verify_sanitization.cjs` is strictly enforced in `npm run test:qa` and `.husky/pre-commit`. Any attempt to commit code or documents containing prohibited school or teacher identifiers will exit with code 1 and immediately abort the commit.
6. **Commercial School Cover Customizer Standard:** All printed booklets, pupil workbooks, and revision packs must follow the customizer pattern: `data-department-name="The History Department"` on the cover banner enclosing `<span class="school-brand-target">The History Department</span>`. Purchasing schools can seamlessly stamp their own school or department name on the cover via pure CSS (`[data-department-name]::after`), browser query parameter (`?school=School+Name`), or CLI/PDF environment variable (`SCHOOL_NAME="School Name" node scripts/export_pdfs.cjs`), keeping our source repository 100% institutional-neutral.

## Layout Checks & Universal Page Budget Standardization
Always proactively audit documents for page overflows, spilling text, and dead underflow space using `node scripts/check_overflows.cjs <unit_id>`.
1. **Container Architecture:** All discrete printable page containers (`.a5-page`, `.page`, `.page-container`) must enforce rigid page limits (`overflow: hidden; display: flex; flex-direction: column; justify-content: space-between;`).
2. **Universal Flex Distribution:** Standard utility classes:
   - `.page-flex-full`: Forces full container height flex column with space-between justification.
   - `.page-body-stretch`: Applied to central content sections (`flex: 1; display: flex; flex-direction: column; justify-content: space-between;`) to ensure even vertical distribution and eliminate dead bottom gaps.
   - `.content-stretch`: Flex child expanding to absorb available vertical room.
3. **Automated Audit Pipeline:** All PDF compilation pipelines (`scripts/export_pdfs.cjs`, `scripts/generate_all_standalone_cover_packs.cjs`) and unit sync workflows (`scripts/sync_unit.cjs`) automatically execute `scripts/audit_page_budget.cjs` to guarantee 0px overflow and optimal (>85%) space utilization.

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

## Automated Pedagogical Research Bank Protocol
Whenever you (the AI agent) and the user discuss or develop pedagogical strategies, cognitive science findings, SEND accommodations, disciplinary literacy techniques, or curriculum mechanisms:
1. **Automatic Synthesis Without Prompting:** Proactively capture and synthesize the pedagogical principle into `src/pedagogy_data.js` (`PEDAGOGY_RESEARCH_BANK`) so it immediately appears in the in-app Department Portal.
2. **Pragmatic Grounding for Teachers:** Each entry must contain:
   - The Classroom Dilemma / Problem (why traditional teaching fails).
   - What the Evidence Proves (academic or cognitive finding).
   - Revision Hub Implementation (exact tools, typography, or booklet features used).
   - Practical Classroom Protocol (actionable takeaway for busy teachers).
   - Direct Academic Citations & Verified External Web Links (with clear URLs so teachers can research further).
3. **Synchronized Guidance Manuals:** Keep `Guide_04_Disciplinary_Pedagogy_and_Research_Evidence.pdf` (and `scripts/generate_guidance_manuals.cjs`) in sync with new pedagogical bank entries, ensuring all web links are explicitly printed on the page for reprographics.

## Proactive Planning & Design Persona & Standing Recommendations #4 and #5 Rule
Act as an experienced app builder and an experienced history teacher. Whenever completing a task or planning work, always think ahead and provide 1 to 3 proactive recommendations at the end of your output. These recommendations should suggest where to go next in terms of architecture, design, structure, layout, pedagogy, content, historical knowledge, or pupil tasks.

### Mandatory Standing Recommendation #4 (Reprographics Reprint Window):
Until explicitly promoted and resolved with the user, recommendation #4 of EVERY response MUST ALWAYS be the following standing reminder:
`4. 🔔 Reprographics Reprint Window: Merge & promote 4-Act V2 curriculum (from data_v2_4act.js / branch feat/4act-v2-reprint) for Year 7 Sanitation, Year 8 Early Modern, and Year 9 Great War when physical classroom workbooks are reprinted.`

### Mandatory Standing Recommendation #5 (Vocabulary Bridge Integration):
Until explicitly promoted and resolved with the user, recommendation #5 of EVERY response MUST ALWAYS be the following standing reminder:
`5. 📚 Vocabulary Bridge Integration: When simplifying enquiry titles for KS3 accessibility, ensure rigorous disciplinary terms (e.g. Constitutional Monarchy, Tyranny, Recusancy, Mercantilism, Hegemony) remain firmly anchored in the Task 2 Core Disciplinary Vocabulary strip where they can be explicitly defined and practiced.`


## Printed Workbook Vocabulary Tasks
Whenever generating or modifying the `generate_worksheets.js` Node script for printed A4 workbooks, you MUST ensure that the vocabulary exercises dynamically rotate between three distinct pedagogical styles (e.g., based on the lesson index: `lessonIndex % 3`):
1. **Contextual Cloze:** A fill-in-the-blank summary using the words.
2. **Vocabulary Mapping:** A task asking the student to write a historically accurate sentence connecting two terms from a provided glossary box.
3. **Dual-Term Analytical Distinction:** A task asking the student to explain the crucial historical difference between two easily confused terms (e.g., *Wrought Iron vs. Pig Iron*, *Nationalism vs. Imperialism*). DO NOT use Frayer models.
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

## Strict Anti-Hallucination & Fact Grounding Protocol
When authoring, enriching, or refactoring historical content, biographies, archival citations, or exam resources across all units:
1. **The Primary Anchor Mandate:** You are STRICTLY FORBIDDEN from inventing, inferring, or generating biographical facts (such as medal classes, service numbers, spouse/relative names, professions, birth/death dates, or regimental battalions) from model memory or statistical likelihood. All asserted facts must be extracted verbatim or directly grounded in verified primary documents or the unit's `data/curriculum_facts_manifest.json`.
2. **The "Cite-or-Silence" Law:** If an exact historical detail (e.g. class of a medal, cause of death, maiden name) is missing from the provided sources, you MUST state that it is "unrecorded in surviving primary archives" or omit the attribute entirely. Never interpolate plausible or statistically common alternatives.
3. **No Hollywood Embellishment ("Dramatic Fluff"):** Maintain a strict archival, juridical register. Do NOT invent dramatic combat maneuvers, cellar-bombing dashes, or sentimental motives that do not exist in official citations, dispatches, or war diaries.
4. **Mandatory Step 0 Fact Audit:** Whenever compiling or modifying curriculum data, you must run `node scripts/verify_curriculum_facts.cjs <unit_id>` (enforced automatically in `scripts/sync_unit.cjs`). Any detected hallucination regression, placeholder, or specification violation must be resolved immediately before deploying or committing.

## Permanent Departmental Reference Shelf & Specification Safeguard
The directory `G:\My Drive\TEXTBOOKS` is our permanent departmental reference library for subject content enrichment across all KS3 and GCSE units (e.g. Weimar Germany, Early Elizabethan England, Medicine, Middle East, USA, and Medieval England).
When referencing or extracting information from these textbooks, you MUST strictly adhere to the following guardrails:
1. **Content Knowledge Only:** Use textbooks strictly for historical narrative depth, chronological precision, primary source excerpts, key statistics, and historical figures.
2. **ZERO Exam Technique from Textbooks:** NEVER use textbooks to determine exam question formats, mark allocations, question stems, or exam technique. Many textbooks in the shelf are from different exam boards (AQA, Cambridge iGCSE, OCR, ISEB) or outdated legacy specifications.
3. **Specification Authority:** All exam question structures, mark schemes, and assessment scaffolds must strictly follow our verified Pearson Edexcel specification rules (e.g. 4-mark consequence questions for Middle East Paper 2, Section A 2-mark feature questions for Medicine / Elizabethan, the 4-4-4-4 matrix for Paper 3, and `data/curriculum_facts_manifest.json`).

## Exam Question Provenance & Past Paper Session Tagging
Whenever generating, editing, or evaluating GCSE exam practice questions (in revision guides, mastery exam packs, workbooks, or the interactive web app), you MUST include past-paper provenance metadata for every question:
1. **Official Past Exam Questions:** If a question (or a close variant) has appeared on an official Edexcel past exam, explicitly tag it with the exact series session (e.g. `Edexcel June 2018`, `Edexcel June 2019`, `Edexcel June 2022`, `Edexcel June 2023`, `Edexcel November 2020`, `Edexcel June 2024`, or `Sample Assessment Material`). Render this prominently as an `.exam-provenance-pill.past` badge.
2. **Forecast & Unexamined Targets:** If a question has not yet appeared on an official past paper, label it accurately using our standard taxonomy:
   - `★ High-Yield Forecast` (`.exam-provenance-pill.forecast`): for core specification bullet points with high statistical probability of appearing in upcoming series.
   - `Unexamined Spec Target` (`.exam-provenance-pill.unexamined`): for specification points that Edexcel has never yet examined.
3. **App & PDF Parity:** Ensure this provenance indicator is visible to students and teachers in both the printed booklets and the interactive online exam modules.

## GCSE Revision Material Typography & Readability Calibration Standard
All GCSE revision materials (Visual Revision Guides, Mastery Exam Practice Packs, and Knowledge Retrieval Quiz Packs) must adhere strictly to our unified departmental typography and readability calibration:
1. **Font Hierarchy**:
   - Primary Interface & Analytical Body: `Inter`, `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` for maximum legibility.
   - Document Titles & Primary Historical Excerpts: `Playfair Display`, `Georgia`, or authentic serif faces.
   - Metadata, Shelfmarks & Category Tags: Uppercase monospace (`Courier New`, letter-spacing 0.5–1px).
2. **Strict Font Size Thresholds (Zero Micro-Text)**:
   - Title 1 (Main Unit / Document Title): `16.5pt`–`21pt` bold.
   - Heading 2 (Major Sections / SOW Headings): `12.5pt`–`14pt` bold.
   - Subheading / Card Title / Factor Box: `10pt`–`10.5pt` bold.
   - Standard Analytical Body / Case Studies: `9.5pt` (line-height 1.36–1.38).
   - Captions, Word Bank Pills, Metadata & Footers: `8.5pt` (line-height 1.28–1.30).
   - **Absolute Minimum Floor:** Nothing under `8.5pt` (completely eliminate 5.5pt–7.5pt micro-text across all booklets).
3. **High-Contrast Monochrome & Photocopier Safety**:
   - Strictly pure monochrome styling (`#000000` text, `1.5px` to `2px` solid black borders, `#ffffff` card backgrounds, subtle `#f8fafc` tinting).
   - Eliminate colored inks (no `#1e3a8a` navy headers, no green answer panels, no amber warnings) so documents photocopy and duplex-print with razor-sharp contrast.
4. **Strict Three Pillars Volume Consolidation (Zero Split PDFs)**:
   - Every GCSE unit must produce strictly **ONE canonical master PDF per pillar**:
     - **Pillar 1:** Visual Revision Guide (`<unit>_revision_guide.pdf`)
     - **Pillar 2:** Mastery Exam Practice Pack (`<unit>_mastery_pack_FULL.pdf`)
     - **Pillar 3:** Knowledge Retrieval Quiz Pack (`<unit>_recall_quiz_FULL.pdf` / `<unit>_recall_quiz_pack_FULL.pdf`)
   - Split PDFs (by Key Topic or section) are strictly forbidden in public distributions.

## Classroom Delivery Roadmap Standard (2-Lesson Enquiry Choreography)
Whenever authoring, enriching, or refactoring curriculum data (`data.js` or `data.json`) for any lesson across Key Stage 3 and GCSE:
1. **Mandatory `delivery_plan` in `teacher_notes`:** You MUST automatically include a structured `delivery_plan` object inside `teacher_notes`.
2. **Schema & Phasing:** The `delivery_plan` must follow this standard:
   - `format`: `"2-Lesson Sequence (50 mins each)"`
   - `lesson_1`: `{ title: "Lesson 1: Immersion, Context & Shared Reading (50 mins)", phases: [...] }`
     - Phase 1 (00:00–05:00): Hook & Prior Knowledge Retrieval
     - Phase 2 (05:00–22:00): Whole-Class Shared Reading & Prosody Modelling (Acts 1–3, with assistive speech tracking)
     - Phase 3 (22:00–35:00): Forensic Evidence & Primary Source Analysis
     - Phase 4 (35:00–47:00): Analytical Application & Task 1 (Vocabulary / Distinction)
     - Phase 5 (47:00–50:00): Hinge Question Plenary
   - `lesson_2`: `{ title: "Lesson 2: Historiographical Debate & Workbook Mastery (50 mins)", phases: [...] }`
     - Phase 1 (00:00–05:00): Prior-Lesson Recall Retrieval
     - Phase 2 (05:00–18:00): Act 4 Historiographical Debate & Forensic Dissection
     - Phase 3 (18:00–38:00): 2-Page Workbook Enquiry Essay Output (Verso evidence launch & Recto independent writing)
     - Phase 4 (38:00–46:00): Live Exemplar Critique & Peer Moderation
     - Phase 5 (46:00–50:00): Consolidation Exit Ticket
3. **Parity Across Media:** Ensure this delivery plan is rendered in the web app's Teacher Mode, printed in the departmental Scheme of Work (SOW), and documented in `DEPARTMENTAL_ROADMAP.md`.

## Departmental Roadmap Tracking & Perpetual Reminder Protocol
To ensure that large-scale curriculum improvements and delivery rollouts are never lost or forgotten across working sessions:
1. **Central Progress Ledger:** The project maintains an official status tracker in `DEPARTMENTAL_ROADMAP.md` documenting the audit and implementation status of all 16 units across our core pedagogical pillars (4-Act Structure, Reading Age Calibration, `delivery_plan`, 2-Page Workbook, and SOW Sync).
2. **Mandatory Per-Turn Proactive Roadmap Prompt:** At the conclusion of EVERY agent turn (in your proactive recommendations), you MUST:
   - Inspect `DEPARTMENTAL_ROADMAP.md`.
   - Identify the current active unit and the exact next incomplete lesson or milestone in the rollout.
   - Provide a clear, actionable reminder stating exactly where we are in the departmental rollout and what needs to be done next, so the user never has to remember or track project status manually.

## Permanent Departmental Milestone Memory: Medicine & Middle East KT2 Completed
STRICT DEPARTMENTAL RECORD & ACTIVE MEMORY:
1. **Edexcel Paper 1 (Medicine in Britain & Western Front):**
   - **Status: COMPLETED (GREEN).** All lessons across the thematic eras (Medieval, Renaissance, 18th/19th Century, Modern) and Section A Western Front are fully authored, enriched with 4-Act Christine Counsell narrative arcs, and compiled.
2. **Edexcel Paper 2 (Conflict in the Middle East, 1945–1995 - `cme_new`):**
   - **Key Topic 2 (The Escalating Conflict, 1964–1973):** **COMPLETED (GREEN).** All 5 enquiry lessons (KT 2.1 to KT 2.5) are authored in 4-Act structure. The flagship **16-Page Double-Page Spread Pupil Workbook** (`pupil_workbook_KT2.html`) is 100% finalized, featuring the publisher-grade cover (108mm portrait photographic plate, docked 66mm editorial suite), 5 double-page enquiry spreads, living timeline, master knowledge organiser, Grade 9 masterclass, and assessment tracker.
   - **Key Topic 1 & Key Topic 3 (`cme_new`):** **PRIORITY #1 TO FINISH SOON (AMBER).** These units must be converted to this newly established 16-page double-page booklet template moving forward.

## Universal 16-Page Double-Page Pupil Workbook Standard
All future GCSE key topic workbooks and KS3 enquiry booklets moving forward MUST adopt the newly proven 16-page architecture established in `cme_new` KT2:
1. **Page 1: Publisher-Grade Front Cover:**
   - Left Column (108mm wide): Massive portrait photographic plate with base64 embedded historical source + Archival Primary Record caption plate citing repository accession shelfmarks (e.g. `GPO-D388-052`).
   - Right Column (66mm wide): Docked editorial panels with zero dead space: Pupil Portfolio card (Name, Class, Teacher, 5-enquiry tracking table), Section A Exam Architecture & Tariffs, Section B Specification Enquiry Sequence (with titles, dates, enquiry questions, specification bullets, concepts, and exam tariffs), Section C 10-Milestone Chronological Anchors, and Section D PFC Writing Technique with 4/4 benchmark model answer.
2. **Pages 2–3: Living Timeline & Panoramic Dual-Coding Spread:** 6 milestones across the period with 48mm sketch canvases for dual-coding.
3. **Pages 4–13: 5x Double-Page Enquiry Spreads (2 Pages per Enquiry):**
   - Verso (Left Page): 10-question retrieval Do Now, Vocab analytical distinction, 2x Q1 Consequence [4m+4m] with stems & 7.0mm ruled response lines.
   - Recto (Right Page): Full 8m / 16m extended writing practice with Mastery Structure Strip, analytical connectives, word bank, timeline mission, and full-page ruled lines.
4. **Page 14: Master Knowledge Organiser:** Bilingual Hebrew & Arabic / specialized terminology glossary, high-yield thematic tables, cause & consequence matrices.
5. **Page 15: Grade 9 Extended Writing Masterclass & Band 4 Rubric:** Point-Fact-Consequence model, analytical connectives, evaluative criteria prompts, sustained judgment.
6. **Page 16: Outside Back Cover:** Assessment Tracker, WWW/EBI Teacher Feedback Grid, and Mobile QR Quiz Matrix.

## Publisher-Standard Textbook Engineering & Disciplinary Architecture
Whenever authoring, compiling, or refactoring publisher-standard textbooks (such as `great_war_textbook_PUBLISHER.pdf` or `cme_new_textbook_KT1_PUBLISHER.pdf`):
1. **Front Cover Branding & Subtitles:**
   - Series Masthead: Always use the approved series title: `Key Stage 3 Master Curriculum Series` or `GCSE Visual Revision & Exam Guide`.
   - Publisher Imprint: At the bottom, render `The History Revision Hub • Student Textbook Edition`.
   - Never use obscure, awkward jargon like "Disciplinary Standard Edition".
   - Maintain poetic, dramatic thematic subtitles (e.g., *"From the Hall of Mirrors to the Guns of August: How Decades of Imperial Rivalry and Fear Culminated in Thirty Days of Madness"*).
2. **PEEL Paragraph Referencing Standard (`[Act.Paragraph]` / `[Section.Paragraph]`):**
   - Every paragraph in the core prose must feature explicit bracketed PEEL tags: `<span class="para-ref">[1.1]</span>`, `<span class="para-ref">[1.2]</span>`, `<span class="para-ref">[2.1]</span>`, etc.
   - Never index individual sentences; only index discrete paragraphs.
3. **Historical Portrait Authenticity vs Hardware/Artworks:**
   - When presenting a historical person (e.g., Otto von Bismarck, Helmuth von Moltke, Admiral Sir John Fisher, Kaiser Wilhelm II), you MUST use an authentic, historical photograph of that specific person.
   - Never substitute an oil painting when an authentic photograph exists.
   - Never substitute a warship, artillery piece, or technical blueprint for a person's biographical card (e.g., Jackie Fisher's portrait card must show Admiral Fisher, never a ship photo).
4. **Pupil-Centric Disciplinary Headings:**
   - Avoid abstract, intimidating academic jargon for component tags (e.g., do NOT use `GEOPOLITICAL MECHANISM`).
   - Use clear, pupil-friendly disciplinary banners: `HISTORICAL DEEP DIVE: CRITICAL MECHANISM` or `HISTORICAL SPOTLIGHT: KEY TURNING POINT`.
5. **Facing-Page Anti-Duplication Rule:**
   - Never display the same historical person or image on facing pages (verso and recto).
   - If a historical figure is featured on the right-hand page (e.g., Gavrilo Princip on Page 13), the facing left-hand page (Page 12) MUST use a different primary source (such as an archival crime scene map, a satirical cartoon, or a written constitutional oath), never a duplicate portrait photo.
6. **Primary Source Archival Context & Hinge Question Standard:**
   - Every primary source card on left-hand pages must feature:
     - Verified archival metadata: accession shelfmark, category badge, and repository footer.
     - A structured `archival-context-box` explaining the historical background of the document/image.
     - A targeted, italicized **Hinge Question** (`archival-hinge-q`) to ignite critical historical debate.
7. **SVG Print Rendering Integrity (`opacity: 1 !important`):**
   - Animated or interactive SVGs (such as causal domino flowcharts or alliance matrices) must have explicit CSS print overrides: `.domino-group, .arrow-group, svg g { opacity: 1 !important; }`.
   - When compiled with headless Puppeteer, animations do not trigger at $t=0$; without static print overrides, the diagram will render 100% blank.
8. **Master Revision Back Cover ($\ge 90\%$ Page Budget):**
   - The outside back cover must never suffer from dead underflow space or half-empty layouts.
   - Back covers must be engineered as comprehensive master revision summaries:
     - Visual period chronology (16–18 event milestone badges).
     - Analytical framework matrix (e.g., M-A-I-N Causes: Militarism, Alliances, Imperialism, Nationalism).
     - Historiographical debate box highlighting conflicting academic interpretations (e.g., Fritz Fischer vs Christopher Clark vs Margaret MacMillan).
     - Disciplinary PEEL writing scaffold with model criteria stems.
9. **Automated Verification Pipeline:**
   - All textbooks must be audited using `node scripts/auto_balance_textbook.cjs <topicId>` to enforce 0px overflow and pass the automated Disciplinary Quality & Anti-Duplication Gate.

## Key Stage 3 Universal Publishing Standard: Master Textbook & Declarative Workbook Pipeline
All Key Stage 3 units (Years 7, 8, and 9: `early_modern_world`, `industrialisation_and_empire`, `great_war`, `great_war_part2`, `water_and_sanitation`, `medieval_england`, `the_shoah`, `cold_war`, `post_war_britain`, `australia`) must strictly adhere to the unified publisher-grade standard established in *Causes of the Great War* and *The Early Modern World*:
1. **Retirement of Legacy Multi-Page Scripts:** The legacy 4-page workbook generator (`generate_pupil_workbooks.cjs`) is permanently retired for all KS3 units. All KS3 workbooks must be generated strictly via the Universal KS3 Declarative Workbook Engine (`scripts/ks3_workbook_engine.cjs` / `scripts/generate_ks3_workbook.cjs <unit_id>`).
2. **20-Page A4 Double-Page Spread Architecture (Exact 5 A3 Folded Spreads):**
   - **Page 1: Master Front Cover:** Customizer `data-department-name="The History Department"` enclosing `<span class="school-brand-target">The History Department</span>`, pupil info strip (`Name`, `Class`, `Teacher` — strictly NO target grade fields on KS3 covers), 52mm primary image plate with archival shelfmark, 8-enquiry roadmap grid, and "How to Write Like a Historian" anchor box.
   - **Pages 2–3: Living Timeline & Panoramic Dual-Coding Spread:** 8 milestone anchors with 48mm sketch canvases and retrieval check questions.
   - **Pages 4–19: 8x Double-Page Enquiry Spreads:**
     - **Verso (Left Page):** 5-question Do Now retrieval grid (strictly prior knowledge, never current lesson), Task 1 rotating disciplinary vocabulary (Contextual Cloze, Vocabulary Mapping, Dual-Term Analytical Distinction) or Domino Flowchart, and Task 2 Archival Forensic Interrogation with ruled response lines.
     - **Recto (Right Page):** Act 4 Extended Analytical Writing. Prominent blue banner displaying the Enquiry Question verbatim, 3-column disciplinary structure strip, PEEL writing framework, dynamic flexbox auto-filling ruled lines (`data-auto-lines="true"`, capped at 17 lines, zero underflow, zero overflow), teacher assessment rubric, and timeline mission signpost.
   - **Page 20: Universal KS3 Outside Back Cover:** Comprehensive pupil assessment record and mobile QR quizzing matrix linking directly to app lessons.
3. **Master Publisher Companion Textbook Standard:**
   - **Front Cover:** Series masthead `Key Stage 3 Master Curriculum Series`, poetic subtitle, authentic historical artwork, and publisher imprint `The History Revision Hub • Student Textbook Edition`.
   - **Verso (Left Pages):** Curated Archival Core with 2x primary sources, repository shelfmark stamps, category meta-tags, `.archival-context-box`, and targeted italicized `.archival-hinge-q` (Hinge Question).
   - **Recto (Right Pages):** Section A: Key Disciplinary Terminology; Section B: Key Individual Profile with **authentic, non-AI primary portrait**; Section C: Core Historical Prose with Pure PEEL paragraph numbering (`<span class="para-ref">[1.1]</span>`, `<span class="para-ref">[1.2]</span>`, `<span class="para-ref">[2.1]</span>`); Section D: Historiographical Spotlight / Disciplinary Mechanism.
   - **Zero Facing-Page Duplications:** Never display duplicate portraits or images on facing verso/recto pages.
   - **Back Cover ($\ge 90\%$ Page Budget):** 16–18 event visual chronology, analytical framework matrix, historiographical debate summary, and PEEL criteria writing scaffold.
4. **Mandatory Automated Verification Pipeline:**
   Whenever modifying, developing, or syncing any KS3 unit, you MUST automatically run:
   - `node scripts/auto_balance_textbook.cjs <unit_id>` (guarantees 0 duplicate images, 100% context blurbs & hinge questions, 100% PEEL indexing, 0px overflow).
   - `node scripts/generate_ks3_workbook.cjs <unit_id>` (compiles declarative workbook and synchronizes to `public/pdfs/`, `dist/pdfs/`, and `G:\My Drive\AAMX\Dep File\Year <N>\<Unit Name>\`).
   - `node scripts/sync_unit.cjs <unit_id>` (executes full safe sync pipeline).


