const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'public', 'units', 'cme_new', 'data.js');
let code = fs.readFileSync(dataPath, 'utf8');

// We will use regex to find the lessons and inject a mock quiz array right before the end of the lesson object or before "enquiry": ...

function injectQuiz(lessonTitle, mockQuizArrayStr) {
    // Find the lesson object. We look for "title": "KT1.3:..."
    const titleRegex = new RegExp(`"title":\\s*"${lessonTitle.replace(/[.*+?^$\{()|[\\]\\\\]/g, '\\$&')}"`);
    const match = code.match(titleRegex);
    if (!match) {
        console.error("Could not find lesson:", lessonTitle);
        return;
    }

    // Now find the end of the "tasks" or "teacher_notes" array in that lesson. 
    // An easier way is just to replace the title line with title + quiz.
    code = code.replace(titleRegex, `$&,\n            "quiz": ${mockQuizArrayStr}`);
    console.log("Injected into", lessonTitle);
}

const mockQuiz13 = `[
                {
                    "question": "What was a major cause of increased tension between Israel and its neighbors from 1955 to 1963?",
                    "options": [
                        "The building of the Suez Canal",
                        "The Cold War arms race in the Middle East",
                        "The signing of a peace treaty",
                        "The withdrawal of UN peacekeepers"
                    ],
                    "answer": 1
                },
                {
                    "question": "Which country became a major supplier of arms to Egypt in 1955?",
                    "options": [
                        "United States",
                        "Great Britain",
                        "Czechoslovakia (Soviet bloc)",
                        "France"
                    ],
                    "answer": 2
                },
                {
                    "question": "Which Israeli Prime Minister warned against the buildup of Egyptian military forces?",
                    "options": [
                        "Golda Meir",
                        "David Ben-Gurion",
                        "Menachem Begin",
                        "Yitzhak Rabin"
                    ],
                    "answer": 1
                }
            ]`;

const mockQuiz31 = `[
                {
                    "question": "What was the primary focus of diplomatic negotiations between 1974 and 1979?",
                    "options": [
                        "Achieving peace between Israel and Egypt",
                        "Establishing a Palestinian state",
                        "Resolving the crisis in Lebanon",
                        "Dividing Jerusalem"
                    ],
                    "answer": 0
                },
                {
                    "question": "Which US President brokered the Camp David Accords?",
                    "options": [
                        "Richard Nixon",
                        "Gerald Ford",
                        "Jimmy Carter",
                        "Ronald Reagan"
                    ],
                    "answer": 2
                },
                {
                    "question": "What historic agreement was signed in 1979 as a result of these negotiations?",
                    "options": [
                        "The Oslo Accords",
                        "The Egypt-Israel Peace Treaty",
                        "The Treaty of Versailles",
                        "The Abraham Accords"
                    ],
                    "answer": 1
                }
            ]`;

const mockQuiz32 = `[
                {
                    "question": "What was the main goal of the PLO during the 1970s and 1980s?",
                    "options": [
                        "To establish an independent Palestinian state",
                        "To form an alliance with the US",
                        "To build an economy in Egypt",
                        "To take over Jordan"
                    ],
                    "answer": 0
                },
                {
                    "question": "Which event in 1987 marked a major uprising by Palestinians in the West Bank and Gaza?",
                    "options": [
                        "The Six Day War",
                        "The Yom Kippur War",
                        "The First Intifada",
                        "The Suez Crisis"
                    ],
                    "answer": 2
                },
                {
                    "question": "Who was the leader of the PLO during this period?",
                    "options": [
                        "Anwar Sadat",
                        "Yasser Arafat",
                        "King Hussein",
                        "Gamal Abdel Nasser"
                    ],
                    "answer": 1
                }
            ]`;

injectQuiz("KT1.3: Increased Tension, 1955–1963", mockQuiz13);
injectQuiz("KT3.1: Diplomatic negotiations, 1974–1979", mockQuiz31);
injectQuiz("KT3.2: The Palestinian Issue, 1974–1993", mockQuiz32);

fs.writeFileSync(dataPath, code);
console.log("Done updating cme_new/data.js");
