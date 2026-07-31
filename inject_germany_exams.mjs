import fs from 'fs';

const filePath = './weimar_nazi_germany/data.js';
let raw = fs.readFileSync(filePath, 'utf-8');

// Strip the export statement
const prefix = 'export const unitData = ';
if (!raw.startsWith(prefix)) {
    console.error("Format mismatch");
    process.exit(1);
}

// Remove prefix and the trailing semicolon if it exists
let jsonString = raw.substring(prefix.length).trim();
if (jsonString.endsWith(';')) {
    jsonString = jsonString.slice(0, -1);
}

const data = JSON.parse(jsonString);

const injections = {
    'lesson_1_1': { heading: "📝 Exam Practice", text: "<p><strong>Explain Why (12 marks):</strong> Explain why the Weimar Republic faced challenges in the years 1919–23.</p>" },
    'lesson_1_2': { heading: "📝 Exam Practice", text: "<p><strong>Inference (4 marks):</strong> Give two things you can infer from Source A about the Spartacist Uprising.</p>" },
    'lesson_1_3': { heading: "📝 Exam Practice", text: "<p><strong>Source Utility (8 marks):</strong> How useful are Sources B and C for an enquiry into the impact of hyperinflation on German society?</p>" },
    'lesson_1_4': { heading: "📝 Exam Practice", text: "<p><strong>Explain Why (12 marks):</strong> Explain why the German economy recovered in the years 1924–29.</p>" },
    
    'lesson_2_1': { heading: "📝 Exam Practice", text: "<p><strong>Inference (4 marks):</strong> Give two things you can infer from Source A about the failure of the Munich Putsch.</p>" },
    'lesson_2_2': { heading: "📝 Exam Practice", text: "<p><strong>Interpretation Difference (4 marks):</strong> What is the main difference between the views of Interpretation 1 and Interpretation 2 regarding the Nazi Party's survival in the 1920s?</p>" },
    'lesson_2_3': { heading: "📝 Exam Practice", text: "<p><strong>Explain Why (12 marks):</strong> Explain why support for the Nazi Party grew in the years 1929–32.</p>" },
    'lesson_2_4': { heading: "📝 Exam Practice", text: "<p><strong>Interpretation Evaluation (20 marks):</strong> How far do you agree with Interpretation 2 about the reasons Hitler became Chancellor in 1933?</p>" },

    'lesson_3_1': { heading: "📝 Exam Practice", text: "<p><strong>Explain Why (12 marks):</strong> Explain why Hitler was able to become dictator by August 1934.</p>" },
    'lesson_3_2': { heading: "📝 Exam Practice", text: "<p><strong>Interpretation Reason (4 marks):</strong> Suggest one reason why Interpretation 1 and Interpretation 2 give different views about the extent of Gestapo control.</p>" },
    'lesson_3_3': { heading: "📝 Exam Practice", text: "<p><strong>Source Utility (8 marks):</strong> How useful are Sources B and C for an enquiry into the effectiveness of Nazi propaganda?</p>" },
    'lesson_3_4': { heading: "📝 Exam Practice", text: "<p><strong>Interpretation Evaluation (20 marks):</strong> How far do you agree with Interpretation 2 about the level of opposition to the Nazi regime?</p>" },

    'lesson_4_1': { heading: "📝 Exam Practice", text: "<p><strong>Explain Why (12 marks):</strong> Explain why Nazi policies towards women changed in the years 1933–39.</p>" },
    'lesson_4_2': { heading: "📝 Full Section B Mock Exam", text: "<p><strong>Q3a (8 marks):</strong> How useful are Sources B and C for an enquiry into the success of Nazi youth policies in the years 1933–39?</p><p><strong>Q3b (4 marks):</strong> What is the main difference between the views?</p><p><strong>Q3c (4 marks):</strong> Suggest one reason why they differ.</p><p><strong>Q3d (20 marks):</strong> How far do you agree with Interpretation 2 about the success of Nazi youth policies?</p>" },
    'lesson_4_3': { heading: "📝 Exam Practice", text: "<p><strong>Inference (4 marks):</strong> Give two things you can infer from Source A about the invisible unemployment figures.</p>" },
    'lesson_4_4': { heading: "📝 Exam Practice", text: "<p><strong>Explain Why (12 marks):</strong> Explain why the Nazis persecuted minority groups in the years 1933–39.</p>" },
};

let updatedCount = 0;
for (const lesson of data.lessons) {
    if (injections[lesson.id]) {
        // Prevent double injection
        const hasExam = lesson.narrative_blocks && lesson.narrative_blocks.some(b => b.theme_heading && (b.theme_heading.includes("📝 Exam Practice") || b.theme_heading.includes("📝 Full Section B Mock Exam")));
        if (!hasExam) {
            if (!lesson.narrative_blocks) lesson.narrative_blocks = [];
            lesson.narrative_blocks.push({
                type: "narrative",
                theme_heading: injections[lesson.id].heading,
                text: injections[lesson.id].text
            });
            updatedCount++;
        }
    }
}

const outString = prefix + JSON.stringify(data, null, 4) + ';\n';
fs.writeFileSync(filePath, outString, 'utf-8');
console.log(`Successfully updated ${updatedCount} lessons with exam practice.`);
