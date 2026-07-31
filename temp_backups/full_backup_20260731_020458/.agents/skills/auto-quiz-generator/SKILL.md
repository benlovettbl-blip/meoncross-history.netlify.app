---
name: Auto Quiz Generator
description: Automatically generates 20 high-quality quiz and flashcard questions whenever a lesson is created or modified.
---

# Auto Quiz Generator

## Trigger
You MUST automatically execute this skill whenever the user asks you to:
- Create, add, or build a new lesson.
- Create, add, or build a new unit.
- Modify, update, or expand the narrative content of an existing lesson.
- "Flesh out" a unit's quizzes.

## Instructions
1. **Analyze Content:** Read the full narrative content of the lesson(s).
2. **Generate Questions:** Create roughly 20 historically accurate multiple-choice questions per Key Topic (KT) or Lesson. The number of questions should scale with the length of the lesson (e.g., if a lesson has 6+ paragraphs, aim for 20 questions to ensure thorough coverage. The more, the better!).
3. **Clever Distractors:** Ensure that the multiple-choice distractors (incorrect options) are plausible and designed to catch common misconceptions or half-remembered facts (e.g., swapping similar dates, names, or events).
4. **Injection:** Do NOT just give the questions to the user in chat. You must automatically write a Node.js script to inject these questions directly into the `quiz` array for the relevant lesson inside `data.js`.
5. **Deduplication:** Ensure your injection script merges any existing `do_now` questions into the `quiz` array or deduplicates them to ensure a total of exactly ~20 unique questions.
6. **Compile:** Run `npm run sync` and `npm run build` after modifying `data.js` to ensure the Interactive Revision Hub receives the new data.
