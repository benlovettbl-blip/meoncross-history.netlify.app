export const unitData = {
    "id": "new_unit_id",
    "title": "New Unit Title",
    "lessons": [
        {
            "id": "lesson_1",
            "title": "Lesson 1 Inquiry Question Here?",
            "primary_source": {
                "src": "assets/placeholder.jpg",
                "title": "Source A: Title Here",
                "caption": "Caption describing the source.",
                "question": "Enquiry: What does this source tell us about X?"
            },
            "vocab": [
                {
                    "term": "Term 1",
                    "definition": "Definition 1"
                },
                {
                    "term": "Term 2",
                    "definition": "Definition 2"
                }
            ],
            "do_now": {
                "type": "retrieval",
                "items": [
                    { "question": "Previous lesson recall question 1?" },
                    { "question": "Previous lesson recall question 2?" },
                    { "question": "Previous lesson recall question 3?" },
                    { "question": "Previous lesson recall question 4?" },
                    { "question": "Previous lesson recall question 5?" }
                ]
            },
            "learning_objective": "To understand X.",
            "learning_objectives": [
                "Objective 1",
                "Objective 2",
                "Objective 3"
            ],
            "teacher_notes": {
                "primer": "A high-level paragraph explaining the pedagogical goal of the lesson.",
                "objectives": [
                    {
                        "objective": "Objective 1",
                        "primer": "How to achieve this objective.",
                        "question": "Hinge question to check understanding."
                    }
                ]
            },
            "vocab_cloze_text": "A short summary paragraph with [Term 1] and [Term 2] in brackets to create a fill-in-the-blank activity.",
            "pair_share": {
                "topic": "Discuss with your partner: [Insert topic]",
                "instructions": "Person A argues X. Person B argues Y."
            },
            "extended": {
                "question": "Write a PEEL paragraph explaining...",
                "hints": [
                    "Hint 1",
                    "Hint 2"
                ]
            },
            "historians_corner": {
                "title": "Historian's Corner",
                "quote": "Insert historian quote here...",
                "historian": "Historian Name",
                "question": "Question about the quote?"
            },
            "narrative_blocks": [
                {
                    "text": "Main text block for reading.",
                    "level_4": "Simplified reading text for differentiation.",
                    "tasks": [
                        {
                            "type": "written",
                            "text": "Comprehension question here?",
                            "model": "Model answer here."
                        }
                    ]
                }
            ]
        }
    ],
    "assessments": []
};
