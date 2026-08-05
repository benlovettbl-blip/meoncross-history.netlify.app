---
name: Auto Vocab Generator
description: Automatically generates 5-8 high-quality vocabulary terms and definitions whenever a lesson is created or modified to populate the flashcard deck.
---

# Auto Vocab Generator

## Trigger
You MUST automatically execute this skill whenever the user asks you to:
- Create, add, or build a new lesson.
- Create, add, or build a new unit.
- Modify, update, or expand the narrative content of an existing lesson.
- "Flesh out" a unit's vocabulary or flashcards.

## Instructions
1. **Analyze Content:** Read the full narrative content of the lesson(s).
2. **Generate Vocab:** Extract and create 5-8 historically accurate, key vocabulary terms (`term`) and their definitions (`definition`) based on the lesson's content.
3. **Age-Appropriate Definitions:** Ensure the definitions are clear, concise, and accessible to a 14-year-old student.
4. **Injection:** Do NOT just give the vocabulary to the user in chat. You must automatically write a Node.js script to inject these terms directly into the `vocab` array for the relevant lesson inside `data.js`.
5. **Deduplication:** Ensure your injection script avoids duplicating existing terms in the `vocab` array.
6. **Compile:** Run the unit's extraction and sync commands (`node extract_units.js <unit_id>`, etc.) after modifying `data.js` to ensure the changes are safely synced to the frontend.
