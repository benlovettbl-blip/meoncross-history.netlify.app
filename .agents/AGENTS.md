

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

