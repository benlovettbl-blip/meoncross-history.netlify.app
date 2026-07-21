

## Layout Checks
Always proactively check for layout overflows, spilling text, and missing title pages after making any structural HTML changes.

## New Unit Creation
When the user asks to build, add, or create a new unit:
1. DO NOT ask the user to follow the manual steps. You must do it for them automatically.
2. Duplicate the "great_war" folder and rename it to the new unit's ID.
3. Help the user insert their new content into the new "index.html".
4. Automatically update the "tabMappings" in the new unit's "app.js" to match the new page structure.
5. Automatically run "node extract_units.js" to compile the app.
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

## Output Formatting (Links)
Always append the local host web link (e.g., http://localhost:3003 if running Vite, or other relevant local port) and the Netlify web link (https://meoncross-history.netlify.app) at the very end of every output.

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


## Automated Database Sync
Whenever you (the AI agent) make structural changes to any unit's curriculum files (such as `data.js`), modify lesson titles, or add a new unit, you MUST automatically run `npm run sync` before finishing your task. You must do this proactively so the user never has to remember to run the database build setup themselves.

## "How Useful" Scaffolding (Provenance Clues)
Whenever you create or modify a "How useful" source assessment question, you MUST provide scaffolding clues for provenance. Students find provenance very difficult, so the scaffolding box must include specific hints (e.g., using a `provenance_clue` property) that prompt them to consider the author, audience, and motive of the source.

## Key Individuals Tracking
Whenever ANY historical individual (including historians, historical figures, or authors mentioned by name in sources) is added to or mentioned in a unit's curriculum data (`data.js` or elsewhere), they MUST also be added to the unit's `key_individuals` page/array. Proactively add their name, role, a brief bio, and an image reference to ensure the individuals page remains comprehensive.

## Wikimedia Image Thumbnails
Whenever you need to add an image from Wikimedia Commons for a historical figure or source, ALWAYS use the Wikimedia API to fetch the embeddable 500px thumbnail URL (e.g. `https://en.wikipedia.org/w/api.php?action=query&titles=X&prop=pageimages&format=json&pithumbsize=500`) instead of guessing the raw `.jpg` file path, as raw paths often lead to 404 errors due to Wikimedia's hotlinking restrictions.


## Edexcel GCSE Exam Specification: Feature Questions
Whenever generating or evaluating Edexcel GCSE History exam questions, remember that the 'features' question format has changed. Instead of a single 4-mark question asking to 'Describe two features of...', it is now structured as two separate 2-mark questions: 'Describe one feature of...' which appears twice. Ensure all exam practice forms, UI templates, and generated assessments reflect this.
