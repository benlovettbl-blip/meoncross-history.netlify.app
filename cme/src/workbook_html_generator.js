import { SPEC_CHECKLIST_DATA } from './spec_checklist_data.js';
import { LESSONS_DATA } from './lessons_data.js';
import { QUIZ_DATA } from '../questions.js';
import { HISTORIAN_QUOTES } from './historian_quotes.js';
import { WORKBOOK_DATA } from './workbook_data.js';

let workbookDataModule = { WORKBOOK_DATA };

const TIMELINE_WORKSHEET_PROMPTS = {
  "subtopic_1_1": [
    {
      "q": "What consequence did the King David Hotel bombing have for British political willpower?",
      "a": "It killed 91 people, shattered British morale, and made the Mandate politically and financially unsustainable."
    },
    {
      "q": "Why did the British government decide to refer the Palestine Mandate to the UN in February 1947?",
      "a": "Britain was exhausted by Zionist insurgency and the immense financial cost of maintaining 100,000 troops."
    },
    {
      "q": "What was the immediate consequence of UN Resolution 181?",
      "a": "It sparked immediate civil war in Palestine between Jewish and Arab militias as Arabs rejected the partition."
    },
    {
      "q": "What was the main consequence of the 1948-49 Arab-Israeli War for the state of Israel?",
      "a": "Israel survived and expanded its territory by 21% beyond the UN borders, securing its existence."
    }
  ],
  "subtopic_1_2": [
    {
      "q": "What was the main consequence of the 1948-49 Arab-Israeli War for the Palestinian Arab population?",
      "a": "The Nakba (Catastrophe), which resulted in the displacement and refugee crisis of 700,000 Palestinians into neighboring countries."
    },
    {
      "q": "Explain one territorial consequence of the 1949 Armistice Agreements for the city of Jerusalem.",
      "a": "Jerusalem was divided: West Jerusalem was controlled by Israel, while Jordan occupied East Jerusalem."
    },
    {
      "q": "Why was the creation of the IDF significant for Israel's early security?",
      "a": "It united various Jewish militias under one command, enforcing state control and establishing a powerful military deterrent."
    },
    {
      "q": "What consequence did the Law of Return have on Israel's demographics and economy?",
      "a": "It rapidly doubled Israel's population, providing military security but causing severe economic strain and food rationing."
    }
  ],
  "subtopic_1_3": [
    {
      "q": "What consequence did the 1955 Israeli raid on Gaza have for Egyptian policy?",
      "a": "It humiliated Egypt, pushing Nasser to support Fedayeen raids and seek advanced Soviet weapons."
    },
    {
      "q": "Why did Egypt sign a major arms deal with Czechoslovakia in September 1955?",
      "a": "To obtain modern Soviet-bloc weapons to defend against Israeli reprisal raids and end Western arms dominance."
    },
    {
      "q": "What triggered President Nasser to nationalise the Suez Canal Company in July 1956?",
      "a": "The USA and Britain abruptly withdrew their funding for the Aswan High Dam, prompting Nasser to use canal tolls to fund it."
    },
    {
      "q": "What consequence did superpower intervention have on Britain's status in November 1956?",
      "a": "Britain was forced into a humiliating withdrawal, marking the end of its status as a global superpower."
    }
  ],
  "subtopic_2_1": [
    {
      "q": "What consequence did the 1964 Arab plan to divert the River Jordan have on Israeli-Syrian relations?",
      "a": "It escalated tensions, leading Israel to launch airstrikes to destroy the Syrian diversion equipment."
    },
    {
      "q": "What consequence did the Samu Raid (November 1966) have on King Hussein of Jordan?",
      "a": "It sparked massive public protests in Jordan against the monarchy, pushing King Hussein to sign a defense pact with Egypt."
    },
    {
      "q": "What aggressive military actions did President Nasser take in Sinai in May 1967?",
      "a": "He expelled UN peacekeepers, mobilized the Egyptian army, and blockaded the Straits of Tiran to Israeli shipping."
    },
    {
      "q": "What territorial changes resulted from Israel's victories in the June 1967 Six-Day War?",
      "a": "Israel captured the Sinai Peninsula and Gaza Strip, the West Bank and East Jerusalem, and the Golan Heights."
    }
  ],
  "subtopic_2_2": [
    {
      "q": "Explain the central 'land for peace' formula proposed in UN Resolution 242.",
      "a": "It called for the withdrawal of Israeli forces from occupied territories in exchange for Arab recognition of Israel's right to exist."
    },
    {
      "q": "What was the strategic objective of Egypt's War of Attrition?",
      "a": "Nasser wanted to wear down the Israeli military with constant artillery shelling and force a withdrawal from Sinai."
    },
    {
      "q": "What consequence did the Battle of Karameh (1968) have for the PLO?",
      "a": "Despite military losses, the PLO's fierce resistance became a massive propaganda victory, boosting recruitment and Arafat's leadership."
    },
    {
      "q": "What consequence did the Dawson's Field hijackings (1970) have for the PLO in Jordan?",
      "a": "It triggered King Hussein's military crackdown (Black September), resulting in the PLO's violent expulsion from Jordan to Lebanon."
    }
  ],
  "subtopic_2_3": [
    {
      "q": "Why did Anwar Sadat expel 15,000 Soviet military advisors from Egypt in 1972?",
      "a": "To signal to the USA that Egypt was open to American diplomacy, and to gain sole control of Egypt's military strategy."
    },
    {
      "q": "What was the main military objective of the joint Egypt-Syria surprise attack on 6 October 1973?",
      "a": "To break the diplomatic stalemate, cross the Suez Canal and Golan Heights, and force Israel to negotiate the return of occupied lands."
    },
    {
      "q": "What consequence did the OPEC oil embargo have on Western countries?",
      "a": "It caused a severe global energy crisis, quadrupling oil prices, triggering inflation, and forcing the West to push for peace."
    },
    {
      "q": "What political consequence did the Yom Kippur War have for the Israeli government?",
      "a": "It shattered the myth of IDF invincibility, leading to public outrage, an inquiry into intelligence failures, and the resignation of Golda Meir."
    }
  ],
  "subtopic_3_1": [
    {
      "q": "What did Henry Kissinger's 'Shuttle Diplomacy' (1974-75) accomplish in the Middle East?",
      "a": "It negotiated military disengagement agreements in Sinai and Golan, establishing buffer zones and reducing Soviet influence."
    },
    {
      "q": "What was the significance of Anwar Sadat's visit to the Israeli Knesset in November 1977?",
      "a": "It was the first time an Arab leader officially visited Israel, breaking 30 years of hostility and opening direct peace talks."
    },
    {
      "q": "What was the main compromise agreed upon in the Camp David Accords (September 1978)?",
      "a": "Israel agreed to return the entire Sinai Peninsula to Egypt in exchange for full diplomatic recognition and peace."
    },
    {
      "q": "What consequence did the 1979 Washington Peace Treaty have for Egypt's relations with the Arab world?",
      "a": "Egypt was expelled from the Arab League and isolated, and President Sadat was later assassinated by Islamist extremists."
    }
  ],
  "subtopic_3_2": [
    {
      "q": "What triggered Israel's Litani Operation (invasion of southern Lebanon) in March 1978?",
      "a": "The Coastal Road Massacre, where PLO/Fatah militants hijacked buses in Israel and killed 38 civilians."
    },
    {
      "q": "What was the main objective of Israel's 1982 invasion of Lebanon?",
      "a": "To destroy the PLO's military infrastructure in Lebanon and expel Yasser Arafat's forces from the country."
    },
    {
      "q": "What consequence did the Sabra and Shatila massacres have on international opinion?",
      "a": "It sparked global outrage and massive anti-war protests within Israel, deeply damaging the credibility of Defence Minister Ariel Sharon."
    },
    {
      "q": "What was a major consequence of the PLO's expulsion to Tunis?",
      "a": "The PLO lost its direct border access to Israel, diminishing its military capability and eventually pushing Arafat toward diplomacy."
    }
  ],
  "subtopic_3_3": [
    {
      "q": "What event triggered the outbreak of the First Intifada in Gaza in December 1987?",
      "a": "An Israeli military transport vehicle crashed into civilian cars, killing four Palestinian workers."
    },
    {
      "q": "What consequence did Yitzhak Rabin's 'Iron Fist' policy have on international public opinion?",
      "a": "It drew global criticism of Israel for using excessive force against unarmed protestors, raising sympathy for the Palestinian cause."
    },
    {
      "q": "What key agreements were established in the Oslo I Accords in September 1993?",
      "a": "Mutual recognition between Israel and the PLO, and the creation of the Palestinian Authority to manage self-rule in Gaza and Jericho."
    },
    {
      "q": "What consequence did the assassination of Yitzhak Rabin (November 1995) have on the peace process?",
      "a": "It shattered Israeli political unity, derailed the momentum of the Oslo peace process, and led to the election of right-wing opposition."
    }
  ]
};
const TIMELINE_KEYWORDS = {
  "subtopic_1_1": [
    "Holocaust survivors", "diplomatic pressure", "Bevin", "1,500",
    "King David Hotel", "91 deaths", "Irgun", "British sergeants",
    "SS Exodus", "UN", "Resolution 181", "withdraw", "State of Israel",
    "Arab armies", "Nakba"
  ],
  "subtopic_1_2": [
    "Green Line", "700,000", "refugees", "Nakba", "UNRWA",
    "Law of Return", "doubles", "Tzena", "Fedayeen", "reprisal raids",
    "Suez", "Straits of Tiran", "300 million", "Count Bernadotte", "assassinated"
  ],
  "subtopic_1_3": [
    "Soviet arms deal", "balance shifts", "Nasser", "nationalizes",
    "Suez Canal", "Aswan Dam", "Sinai", "Sèvres pact", "economic pressure",
    "UNEF"
  ],
  "subtopic_2_1": [
    "Arab League", "PLO", "water diversion", "reprisal", "West Bank/Jordan tensions",
    "UNEF expelled", "Nasser", "Tiran", "false warning", "preemptive strikes",
    "Sinai", "Gaza", "West Bank", "Golan"
  ],
  "subtopic_2_2": [
    "Resolution 242", "Land for Peace", "Khartoum Conference", "Three Nos",
    "Suez", "settlements", "West Bank", "PFLP", "Black September",
    "PLO", "11 Israeli athletes", "Wrath of God"
  ],
  "subtopic_2_3": [
    "Sadat", "15,000", "Soviet advisors", "cross", "Suez/Golan",
    "Yom Kippur", "embargo", "energy crisis", "Resolution 338", "shuttle diplomacy",
    "Suez"
  ],
  "subtopic_3_1": [
    "Kissinger", "Suez Canal", "Sadat", "Jerusalem", "parliament",
    "Carter", "Begin", "autonomy", "peace treaty", "Sinai", "Egypt",
    "Arab League"
  ],
  "subtopic_3_2": [
    "IDF", "Lebanon", "PLO", "Beirut", "Sabra & Shatila", "Tunis",
    "Hezbollah", "uprising", "Gaza", "stones campaign", "Rabin",
    "physical force", "Hamas", "charter"
  ],
  "subtopic_3_3": [
    "summit", "direct talks", "Declaration of Principles", "Clinton",
    "handshake", "Jordan", "peace treaty", "46-year", "Right-wing",
    "Rabin", "peace process"
  ]
};

function getBlankedAndAnswers(desc, keywords) {
  const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);
  let template = desc;
  const replacedPhrases = [];
  const blankedWords = [];
  
  sortedKeywords.forEach((kw) => {
    const escaped = kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(escaped, 'i');
    
    let match;
    while ((match = template.match(regex)) !== null) {
      const actualKw = match[0];
      const placeholderIdx = replacedPhrases.length;
      replacedPhrases.push(actualKw);
      blankedWords.push(actualKw);
      template = template.replace(regex, `@@@${placeholderIdx}@@@`);
    }
  });
  
  let studentText = template;
  let teacherText = template;
  
  replacedPhrases.forEach((phrase, idx) => {
    const placeholder = `@@@${idx}@@@`;
    studentText = studentText.replaceAll(placeholder, `<strong>_______</strong>`);
    teacherText = teacherText.replaceAll(placeholder, `<span style="font-weight: bold; text-decoration: underline; color: #16a34a;">${phrase}</span>`);
  });
  
  return { studentText, teacherText, blankedWords };
}

async function generateWorkbookHtml(subtopicId, style, density, includeAnswers, selectedIndices = []) {
  if (!workbookDataModule) {
    workbookDataModule = await import('./workbook_data.js');
  }
  const data = workbookDataModule.WORKBOOK_DATA[subtopicId];
  if (!data) {
    return `<html><body><h3>Workbook pack not available for subtopic: ${subtopicId}</h3></body></html>`;
  }
  const topicName = subtopicId.replace('subtopic_', '').replace('_', '.');
  const cleanTitle = data.title.replace(/\s*\(\d{4}[–-—\d]*\)/, '');

  const specList = SPEC_CHECKLIST_DATA[subtopicId] || [];

  const specBoxHtml = specList.length > 0 ? `
    <div class="spec-box" style="border: 1px solid #d1d5db; padding: 6px 10px; margin-bottom: 10px; font-size: 9pt; background: #f9fafb; border-radius: 4px; line-height: 1.3; box-sizing: border-box; text-align: left;">
      <strong style="text-transform: uppercase; font-size: 9.5pt; color: #000000; display: block; margin-bottom: 3px;">📋 Curriculum Specification Checklist (Pearson Edexcel)</strong>
      <ul style="margin: 0; padding-left: 0; list-style: none;">
        ${specList.map(item => `<li style="margin: 0 0 2px 0; padding: 0; list-style: none;">☐ ${item.point}</li>`).join('')}
      </ul>
    </div>
  ` : '';

  const detailsHtml = '';

  const lessonData = LESSONS_DATA[subtopicId];
  let retrievalTitle = "✏️ Quick-Fire Retrieval Questions";
  let retrievalPrompts = [];
  
  if (lessonData && lessonData.do_now && lessonData.do_now.items && lessonData.do_now.items.length > 0) {
    retrievalTitle = "✏️ Do Now: Recall from Previous Lesson";
    retrievalPrompts = lessonData.do_now.items.map(q => ({ q: q.question || q, a: q.answer || '' }));
  } else {
    const quizSubtopicData = QUIZ_DATA.flatMap(t => t.subtopics).find(s => s.id === subtopicId) || { easy: [], medium: [], difficult: [] };
    const allQuizQs = [...(quizSubtopicData.easy || []), ...(quizSubtopicData.medium || [])];
    const shuffledQs = [...allQuizQs].sort(() => 0.5 - Math.random());
    retrievalPrompts = shuffledQs.slice(0, 5).map(q => ({ q: q.question, a: q.answer }));
  }

  let retrievalQuestionsHtml = '';
  if (retrievalPrompts.length > 0) {
    retrievalQuestionsHtml = `
      <div class="retrieval-questions-section" style="border: 1.5px solid #000000; padding: 8px 10px; margin-top: 15px; background: #ffffff; border-radius: 4px; box-sizing: border-box; text-align: left;">
        <strong style="text-transform: uppercase; font-size: 12.5pt; color: #000000; display: block; margin-bottom: 5px; border-bottom: 1.5px solid #000000; padding-bottom: 2px;">${retrievalTitle}</strong>
        <div style="display: flex; flex-direction: column; gap: 6px;">
          ${retrievalPrompts.map((p, idx) => {
            const answerArea = includeAnswers 
              ? `<span style="font-size: 11.5pt; line-height: 1.25; color: #000000; font-style: italic; font-weight: bold; padding-left: 5px;"><strong>Model Answer:</strong> ${p.a}</span>`
              : `<div class="dotted-writing-line" style="border-bottom: 1px dashed #9ca3af; height: 18px; margin-top: 2px;"></div>`;
            return `
              <div style="font-size: 11.5pt; line-height: 1.35; color: #000000;">
                <strong>Q${idx + 1}:</strong> ${p.q}
                ${answerArea}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  let html = `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="utf-8">
  <title>GCSE History Lesson Resource - Workbook</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,500&display=swap" rel="stylesheet">
  <style>
    @page {
      size: 21cm 29.7cm; /* A4 */
      margin: 1.0cm;
      mso-page-orientation: portrait;
    }
    body {
      font-family: 'Arial', sans-serif;
      font-size: 12pt;
      color: #000000;
      line-height: 1.4;
      background: #ffffff;
      margin: 0;
      padding: 0;
    }
    .print-page, .print-page-last {
      clear: both;
      box-sizing: border-box;
      position: relative;
      background: #ffffff;
    }
    .print-page {
      page-break-after: always;
    }
    .print-page-last {
      page-break-after: avoid;
    }
    @media screen {
      body {
        background-color: #f3f4f6;
        padding: 20px 0;
      }
      .print-page, .print-page-last {
        width: 21cm;
        min-height: 29.7cm;
        margin: 0 auto 20px auto;
        padding: 1.0cm;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        border: 1px solid #e5e7eb;
        border-radius: 4px;
      }
    }
    @media print {
      body {
        background: #ffffff !important;
        color: #000000 !important;
        font-size: 11pt !important;
        line-height: 1.4 !important;
      }
      .print-page, .print-page-last {
        width: 100% !important;
        min-height: 27.2cm !important;
        padding: 0 !important;
        margin: 0 !important;
        box-shadow: none !important;
        border: none !important;
        border-radius: 0 !important;
      }
    }
    .main-title {
      font-size: 15pt;
      font-weight: 800;
      border-bottom: 2px solid #000000;
      padding-bottom: 3px;
      margin-top: 0;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #000000;
    }
    .sub-title {
      font-size: 10pt;
      font-weight: bold;
      color: #000000;
      margin-top: 6px;
      margin-bottom: 2px;
    }
    .dotted-writing-line {
      border-bottom: 1px dashed #9ca3af;
      height: 28px;
      margin-bottom: 4px;
    }

    /* Cornell grid styles */
    .print-cornell-grid {
      display: table;
      width: 100%;
      border: 1.5px solid #000000;
      margin-top: 10px;
      box-sizing: border-box;
    }
    .print-cornell-row {
      display: table-row;
    }
    .print-cornell-cues {
      display: table-cell;
      width: 30%;
      border-right: 1.5px solid #000000;
      border-bottom: 1.5px solid #000000;
      padding: 10px;
      vertical-align: top;
      font-size: 9.5pt;
      font-weight: bold;
      background: #f9fafb;
    }
    .print-cornell-notes {
      display: table-cell;
      width: 70%;
      border-bottom: 1.5px solid #000000;
      padding: 10px;
      vertical-align: top;
      background: #ffffff;
    }
    .print-cornell-summary-row {
      display: table-row;
    }
    .print-cornell-summary-cell {
      display: table-cell;
      colspan: 2;
      padding: 10px;
      vertical-align: top;
      background: #f9fafb;
      font-size: 10pt;
    }
    /* Flowchart styles */
    .flowchart-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
      margin-bottom: 15px;
    }
    .flowchart-box {
      border: 1.5px solid #000000;
      padding: 8px;
      width: 22%;
      vertical-align: top;
      background: #ffffff;
      font-size: 9.5pt;
    }
    .flowchart-arrow {
      text-align: center;
      font-size: 15.5pt;
      font-weight: bold;
      width: 4%;
      vertical-align: middle;
      color: #000000;
    }
    /* Vocabulary Match-up styles */
    .vocab-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 8px;
      margin-bottom: 10px;
    }
    .vocab-th {
      font-weight: bold;
      font-size: 9pt;
      text-transform: uppercase;
      background-color: #f3f4f6;
      border: 1px solid #9ca3af;
      padding: 4px 6px;
      text-align: left;
    }
    .vocab-td {
      border: 1px solid #9ca3af;
      padding: 5px 6px;
      font-size: 9pt;
      vertical-align: middle;
    }
    /* Exam Rubric styles */
    .rubric-box {
      border: 1px solid #000000;
      background: #f9fafb;
      padding: 8px;
      margin-top: 15px;
      font-size: 9.5pt;
    }
    @media screen {
      body {
        background-color: #f3f4f6;
        padding: 20px 0;
      }
      .print-page, .print-page-last {
        background: #ffffff;
        width: 21cm;
        min-height: 29.7cm;
        margin: 0 auto 20px auto;
        padding: 1.0cm;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        border: 1px solid #e5e7eb;
        border-radius: 4px;
        box-sizing: border-box;
      }
    }
  </style>
</head>
<body>
`;

  let frontCoverHtml = '';
  if (style === 'booklet') {
    const ktNumberMatch = subtopicId.match(/subtopic_(\d+)/);
    const ktNumber = ktNumberMatch ? ktNumberMatch[1] : '1';
    
    frontCoverHtml = `
      <div class="print-page" style="text-align: center; font-family: 'Outfit', sans-serif;">
        <h1 style="font-family: 'Playfair Display', serif; font-size: 32pt; margin-top: 50px;">Conflict in the Middle East</h1>
        <p style="font-size:16pt; margin-top: 0; color: #555;">Topic ${topicName}: ${cleanTitle}</p>
        <p style="font-size:14pt; font-style: italic;">Lesson Workbook</p>
        
        <div style="margin: 20px 0;">
          <img src="/assets/sources/kt1_cover.png" alt="Middle East Cover" style="max-width: 65%; height: auto; border: 2px solid #1a237e; border-radius: 4px; box-shadow: 3px 3px 10px rgba(0,0,0,0.15);">
        </div>

        <div style="margin-top: 30px; border-bottom: 1px solid #000; padding-bottom: 5px; width: 80%; margin-left: 10%; font-weight: 500; font-size: 14pt; text-align: left;">Name: </div>
        <div style="margin-top: 25px; border-bottom: 1px solid #000; padding-bottom: 5px; width: 80%; margin-left: 10%; font-weight: 500; font-size: 14pt; margin-bottom: 40px; text-align: left;">Class: </div>
        
        <div style="margin: 30px 5%; padding: 0;">
          <h3 style="margin-top: 0; margin-bottom: 15px; color: #1a237e; text-align: center; font-family: 'Playfair Display', serif; font-size: 16pt;">Specification Checklist</h3>
          ${specBoxHtml}
        </div>
      </div>
    `;
  }

  html += frontCoverHtml;


  if (style === 'study') {
    // Narrative HTML: complete paragraphs
    const narrativeHtml = data.narrative.map(sec => `
      <div style="margin-bottom: 8px;">
        <h4 style="margin: 0 0 3px 0; font-size: 9.3pt; color: #000000; font-weight: bold; border-bottom: 1px solid #e5e7eb; padding-bottom: 1px;">${sec.title}</h4>
        ${sec.paragraphs.map(p => `<p style="margin: 0 0 4px 0; font-size: 8.7pt; line-height: 1.3; text-align: justify; color: #000000;">${p}</p>`).join('')}
      </div>
    `).join('');

    // Vocabulary Focus HTML
    const vocabHtml = data.vocabulary.map(v => `
      <div style="margin-bottom: 4px; font-size: 8.5pt; line-height: 1.2; color: #000000;">
        <strong style="color: #000000;">${v.term}</strong>: ${v.definition}
      </div>
    `).join('');

    // Timeline Reference HTML: complete events fully written out
    const timelineRefHtml = data.timeline.map(item => `
      <div style="margin-bottom: 5px; font-size: 8.5pt; line-height: 1.25; color: #000000;">
        <strong style="color: #000000;">${item.date}</strong><br>
        ${item.desc}
      </div>
    `).join('');

    const pageTitleStudy = includeAnswers ? 'Teacher Answer Key &bull; ' : '';

    // Page 2: Timeline Analysis (identical to Level 9 page 2 of 'timeline' style)
    const prompts = TIMELINE_WORKSHEET_PROMPTS[subtopicId] || [];
    let tableRowsL9 = "";
    data.timeline.forEach((event, idx) => {
      const prompt = prompts[idx] || { q: "Connection question not found", a: "" };
      
      const answerArea = includeAnswers 
        ? `<div style="font-size: 8.7pt; line-height: 1.25; color: #16a34a; font-style: italic; border-left: 2.5px solid #16a34a; padding-left: 5px; margin-top: 4px;"><strong>Model Answer:</strong> ${prompt.a}</div>`
        : `<div style="border-bottom: 1px dashed #9ca3af; height: 18px; margin-top: 2px;"></div>
           <div style="border-bottom: 1px dashed #9ca3af; height: 18px; margin-top: 2px;"></div>
           <div style="border-bottom: 1px dashed #9ca3af; height: 18px; margin-top: 2px;"></div>
           <div style="border-bottom: 1px dashed #9ca3af; height: 18px; margin-top: 2px;"></div>`;
           
      tableRowsL9 += `
        <div style="margin-bottom: 20px; page-break-inside: avoid; clear: both;">
          <div style="background: #111827; color: #ffffff; padding: 4px 10px; border-radius: 4px 4px 0 0; font-size: 8.5pt; font-weight: bold; display: inline-block;">
            ${event.date}
          </div>
          <div class="timeline-box" style="border: 2px solid #111827; border-top: none; border-radius: 0 4px 4px 4px; padding: 12px; background: #ffffff; box-sizing: border-box; width: 100%;">
            <span style="font-size: 9.5pt; line-height: 1.4; display: block; color: #111827; font-weight: bold; margin-bottom: 8px;">
              ${prompt.q}
            </span>
            ${answerArea}
          </div>
        </div>
      `;
    });

    html += `
      <!-- SIDE 1: STUDY REFERENCE -->
      <div class="print-page" style="position: relative; min-height: 27.2cm; box-sizing: border-box;">
        <h2 class="main-title">${pageTitleStudy}Topic ${topicName}: ${cleanTitle}</h2>
        ${specBoxHtml}
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 5px; table-layout: fixed;">
          <tr>
            <td style="width: 63%; vertical-align: top; padding-right: 12px; box-sizing: border-box;">
              <strong style="text-transform: uppercase; font-size: 9.3pt; color: #000000; display: block; margin-bottom: 5px; border-bottom: 1.5px solid #000000; padding-bottom: 2px;">📖 Lesson Narrative</strong>
              ${narrativeHtml}
            </td>
            <td style="width: 37%; vertical-align: top; border-left: 1px solid #d1d5db; padding-left: 12px; box-sizing: border-box;">
              <div class="vocab-section" style="margin-bottom: 10px;">
                <strong style="text-transform: uppercase; font-size: 9.3pt; color: #000000; display: block; margin-bottom: 5px; border-bottom: 1.5px solid #000000; padding-bottom: 2px;">📖 Key Vocabulary</strong>
                ${vocabHtml}
              </div>
              <div class="timeline-section">
                <strong style="text-transform: uppercase; font-size: 9.3pt; color: #000000; display: block; margin-bottom: 5px; border-bottom: 1.5px solid #000000; padding-bottom: 2px;">⏳ Chronology Reference</strong>
                ${timelineRefHtml}
              </div>
            </td>
          </tr>
        </table>
        ${retrievalQuestionsHtml}
      </div>

      <!-- SIDE 2: CHRONOLOGICAL ANALYSIS -->
      <div class="print-page-last" style="position: relative; min-height: 27.2cm; box-sizing: border-box; margin-top: 20px; page-break-before: always;">
        <h3 style="font-size: 11.5pt; font-weight: bold; border-bottom: 1.5px solid #000000; padding-bottom: 2px; margin-top: 0; margin-bottom: 8px; text-transform: uppercase; color: #000000; letter-spacing: 0.5px;">
          Topic ${topicName}: ${cleanTitle}${includeAnswers ? ' (Teacher Answer Key)' : ''}
        </h3>
        
        <div class="timeline-recall-container" style="margin-top: 15px; width: 100%;">
            ${tableRowsL9}
        </div>
      </div>
    `;

  } else if (style === 'exam') {
    const questionsData = LESSONS_DATA[subtopicId]?.questionVault || [];
    
    selectedIndices.forEach((idx, qNum) => {
      const qObj = questionsData[idx];
      if (!qObj) return;
      
      const qText = qObj.question;
      const qAnswer = qObj.answer;

      let marks = 8;
      if (qText.toLowerCase().includes('4 marks') || qText.toLowerCase().includes('(4)')) {
        marks = 4;
      }
      
      let linesCount = marks === 4 ? 6 : 12;
      if (density === 'compact') {
        linesCount = marks === 4 ? 4 : 8;
      }

      let rubricHtml = '';
      const qTextLower = qText.toLowerCase();
      if (qTextLower.includes('consequence')) {
        rubricHtml = `
          <strong style="text-transform: uppercase; display: block; margin-bottom: 4px; color: #000000; font-size: 10pt;">Consequence Rubric (4 Marks)</strong>
          <label style="display: block; margin-bottom: 4px;"><input type="checkbox"> [ ] <strong>Point:</strong> Clearly state one consequence of the event [1 Mark]</label>
          <label style="display: block; margin-bottom: 4px;"><input type="checkbox"> [ ] <strong>Detail:</strong> Support with specific historical details (dates/names/key terms) [1 Mark]</label>
          <label style="display: block; margin-bottom: 4px;"><input type="checkbox"> [ ] <strong>Explanation:</strong> Explain exactly how the consequence resulted from the event [2 Marks]</label>
        `;
      } else if (qTextLower.includes('narrative')) {
        rubricHtml = `
          <strong style="text-transform: uppercase; display: block; margin-bottom: 4px; color: #000000; font-size: 10pt;">Narrative Account Rubric (8 Marks)</strong>
          <label style="display: block; margin-bottom: 4px;"><input type="checkbox"> [ ] <strong>Sequence:</strong> Structure the account in clear chronological order (Beginning &rarr; Middle &rarr; End) [2 Marks]</label>
          <label style="display: block; margin-bottom: 4px;"><input type="checkbox"> [ ] <strong>Linkage:</strong> Use connection words (e.g. 'This led to', 'As a direct result') to link events [2 Marks]</label>
          <label style="display: block; margin-bottom: 4px;"><input type="checkbox"> [ ] <strong>Knowledge:</strong> Support with precise historical details (dates, names, key terms) [2 Marks]</label>
          <label style="display: block; margin-bottom: 4px;"><input type="checkbox"> [ ] <strong>Analysis:</strong> Explain how the chain of events led to the final outcome [2 Marks]</label>
        `;
      } else if (qTextLower.includes('importance')) {
        rubricHtml = `
          <strong style="text-transform: uppercase; display: block; margin-bottom: 4px; color: #000000; font-size: 10pt;">Importance Rubric (8 Marks)</strong>
          <label style="display: block; margin-bottom: 4px;"><input type="checkbox"> [ ] <strong>Significance:</strong> State why the event is important for the specified development [2 Marks]</label>
          <label style="display: block; margin-bottom: 4px;"><input type="checkbox"> [ ] <strong>Before/After:</strong> Explain the 'before' and 'after' state to show the change/significance [2 Marks]</label>
          <label style="display: block; margin-bottom: 4px;"><input type="checkbox"> [ ] <strong>Knowledge:</strong> Support with precise historical facts (dates, names, events) [2 Marks]</label>
          <label style="display: block; margin-bottom: 4px;"><input type="checkbox"> [ ] <strong>Explanation:</strong> Link the event directly to its impact on the specified outcome [2 Marks]</label>
        `;
      } else {
        rubricHtml = `
          <strong style="text-transform: uppercase; display: block; margin-bottom: 4px; color: #000000; font-size: 10pt;">Self-Evaluation Rubric</strong>
          <label style="display: block; margin-bottom: 4px;"><input type="checkbox"> [ ] Answered in full, grammatically correct sentences.</label>
          <label style="display: block; margin-bottom: 4px;"><input type="checkbox"> [ ] Included specific historical details (dates, names, events).</label>
          <label style="display: block; margin-bottom: 4px;"><input type="checkbox"> [ ] Explained the connection between cause and consequence or narrative progression.</label>
        `;
      }
      
      const isQuestionLast = qNum === selectedIndices.length - 1 && !includeAnswers;
      const firstPageSpecHtml = qNum === 0 ? specBoxHtml : '';
      html += `
        <div class="${isQuestionLast ? 'print-page-last' : 'print-page'}" style="display: flex; flex-direction: column; min-height: 27.2cm; box-sizing: border-box;">
          <div class="main-title">GCSE Exam Practice &bull; Topic ${topicName}: ${cleanTitle}</div>
          ${firstPageSpecHtml}
          <div style="font-size: 12.5pt; font-weight: bold; margin-bottom: 15px; border-bottom: 1.5px solid #000000; padding-bottom: 4px;">
            Question ${qNum + 1} [${marks} Marks]
          </div>
          
          <p style="font-size: 12.5pt; font-weight: bold; margin-bottom: 12px; line-height: 1.45;">
            ${qText}
          </p>

          <div style="flex-grow: 1; margin-top: 15px; background-image: linear-gradient(to bottom, transparent 95%, #9ca3af 95%); background-size: 100% 1.5em; width: 100%; border-bottom: 1px dashed #9ca3af;">
          </div>

          <div class="rubric-box" style="margin-top: 15px;">
            ${rubricHtml}
          </div>
        </div>
      `;
      
      if (includeAnswers) {
        const isAnswerLast = qNum === selectedIndices.length - 1;
        html += `
          <div class="${isAnswerLast ? 'print-page-last' : 'print-page'}">
            <div class="main-title">Teacher Answer Key &bull; Topic ${topicName}: Model Answer</div>
            <div style="font-size: 12.5pt; font-weight: bold; margin-bottom: 15px; border-bottom: 1.5px solid #000000; padding-bottom: 4px;">
              Model Answer for Question ${qNum + 1} [${marks} Marks]
            </div>
            
            <p style="font-size: 11.5pt; font-weight: bold; margin-bottom: 10px; font-style: italic; color: #000000;">
              Question: ${qText}
            </p>

            <div style="border-left: 3px solid #16a34a; background: #f0fdf4; padding: 12px; font-size: 11.5pt; line-height: 1.6; text-align: justify; margin-top: 15px;">
              ${qAnswer}
            </div>
          </div>
        `;
      }
    });
  } else if (style === 'timeline') {
    const prompts = TIMELINE_WORKSHEET_PROMPTS[subtopicId] || [];
    const keywords = TIMELINE_KEYWORDS[subtopicId] || [];
    
    const processedEvents = [];
    const allBlankedWords = [];
    
    data.timeline.forEach((event) => {
      const { studentText, teacherText, blankedWords } = getBlankedAndAnswers(event.desc, keywords);
      allBlankedWords.push(...blankedWords);
      processedEvents.push({
        date: event.date,
        studentText,
        teacherText,
        rawDesc: event.desc
      });
    });
    
    const uniqueBlanked = [...new Set(allBlankedWords)];
    const scrambledWordBank = uniqueBlanked.sort(() => Math.random() - 0.5);
    
    // --- PAGE 1: LEVEL 4 SUPPORT ---
    let tableRowsL4 = "";
    processedEvents.forEach((event, idx) => {
      const prompt = prompts[idx] || { q: "Connection question not found", a: "" };
      const descText = includeAnswers ? event.teacherText : event.studentText;
      
      const answerArea = includeAnswers 
        ? `<div style="font-size: 8.7pt; line-height: 1.25; color: #16a34a; font-style: italic; border-left: 2.5px solid #16a34a; padding-left: 5px; margin-top: 4px;"><strong>Model Answer:</strong> ${prompt.a}</div>`
        : `<div style="border-bottom: 1px dashed #9ca3af; height: 18px; margin-top: 2px;"></div>
           <div style="border-bottom: 1px dashed #9ca3af; height: 18px; margin-top: 2px;"></div>`;
           
      tableRowsL4 += `
        <div style="margin-bottom: 20px; page-break-inside: avoid; clear: both;">
          <div style="background: #111827; color: #ffffff; padding: 4px 10px; border-radius: 4px 4px 0 0; font-size: 8.5pt; font-weight: bold; display: inline-block;">
            ${event.date}
          </div>
          <div class="timeline-box" style="border: 2px solid #111827; border-top: none; border-radius: 0 4px 4px 4px; padding: 12px; background: #ffffff; box-sizing: border-box; width: 100%;">
            <div style="background: #f3f4f6; border-left: 4px solid #6b7280; padding: 8px; margin-bottom: 10px; border-radius: 2px;">
              <span style="font-size: 9pt; line-height: 1.35; display: block; color: #111827; margin-bottom: 2px;">
                ${descText}
              </span>
            </div>
            <div style="padding-top: 5px;">
              <span style="font-size: 9.5pt; line-height: 1.35; display: block; color: #111827; font-weight: bold; margin-bottom: 4px;">
                ${prompt.q}
              </span>
              ${answerArea}
            </div>
          </div>
        </div>
      `;
    });

    const vocabSpotlight = `
      <div class="vocab-spotlight" style="border: 1px solid #000000; padding: 6px 10px; margin-bottom: 10px; font-size: 9pt; background: #f9fafb; border-radius: 4px; line-height: 1.3; box-sizing: border-box; text-align: left;">
        <strong style="text-transform: uppercase; font-size: 9.5pt; color: #000000; display: block; margin-bottom: 3px;">📖 Vocabulary Spotlight</strong>
        <div style="display: flex; flex-wrap: wrap; gap: 4px 15px;">
          ${data.vocabulary.map(item => `
            <div style="flex: 1 1 45%; min-width: 200px; font-size: 8.7pt; line-height: 1.2;"><strong>${item.term}</strong>: ${item.definition}</div>
          `).join('')}
        </div>
      </div>
    `;

    const wordBankHtml = `
      <div style="border: 1.5px solid #000000; padding: 8px 10px; margin-top: 10px; background: #f9fafb; border-radius: 4px; box-sizing: border-box;">
        <strong style="display: block; margin-bottom: 3px; text-transform: uppercase; font-size: 9pt; color: #000000;">🔑 Scrambled Word Bank</strong>
        <div style="font-size: 8.7pt; line-height: 1.3; text-align: center; font-style: italic; color: #000000;">
          ${scrambledWordBank.join('  &bull;  ')}
        </div>
      </div>
    `;

    const pageTitleL4 = includeAnswers ? 'Teacher Answer Key &bull; ' : '';

    // --- PAGE 2: LEVEL 9 CHALLENGE ---
    let tableRowsL9 = "";
    processedEvents.forEach((event, idx) => {
      const prompt = prompts[idx] || { q: "Connection question not found", a: "" };
      
      const answerArea = includeAnswers 
        ? `<div style="font-size: 8.7pt; line-height: 1.25; color: #16a34a; font-style: italic; border-left: 2.5px solid #16a34a; padding-left: 5px; margin-top: 4px;"><strong>Model Answer:</strong> ${prompt.a}</div>`
        : `<div style="border-bottom: 1px dashed #9ca3af; height: 18px; margin-top: 2px;"></div>
           <div style="border-bottom: 1px dashed #9ca3af; height: 18px; margin-top: 2px;"></div>
           <div style="border-bottom: 1px dashed #9ca3af; height: 18px; margin-top: 2px;"></div>
           <div style="border-bottom: 1px dashed #9ca3af; height: 18px; margin-top: 2px;"></div>`;
           
      tableRowsL9 += `
        <div style="margin-bottom: 20px; page-break-inside: avoid; clear: both;">
          <div style="background: #111827; color: #ffffff; padding: 4px 10px; border-radius: 4px 4px 0 0; font-size: 8.5pt; font-weight: bold; display: inline-block;">
            ${event.date}
          </div>
          <div class="timeline-box" style="border: 2px solid #111827; border-top: none; border-radius: 0 4px 4px 4px; padding: 12px; background: #ffffff; box-sizing: border-box; width: 100%;">
            <span style="font-size: 9.5pt; line-height: 1.4; display: block; color: #111827; font-weight: bold; margin-bottom: 8px;">
              ${prompt.q}
            </span>
            ${answerArea}
          </div>
        </div>
      `;
    });


    html += `
      <!-- SIDE 1: LEVEL 4 ACTIVE RECALL -->
      <div class="print-page" style="position: relative; min-height: 27.2cm; box-sizing: border-box;">
        <h2 class="main-title">${pageTitleL4}Topic ${topicName}: ${cleanTitle}</h2>
        ${specBoxHtml}
        ${vocabSpotlight}
        
        <div class="timeline-recall-container" style="margin-top: 15px; width: 100%;">
            ${tableRowsL4}
        </div>
        
        ${wordBankHtml}
        ${retrievalQuestionsHtml}
      </div>

      <!-- SIDE 2: LEVEL 9 MASTER Chronological Analysis -->
      <div class="print-page-last" style="position: relative; min-height: 27.2cm; box-sizing: border-box; margin-top: 20px; page-break-before: always;">
        <h3 style="font-size: 11.5pt; font-weight: bold; border-bottom: 1.5px solid #000000; padding-bottom: 2px; margin-top: 0; margin-bottom: 8px; text-transform: uppercase; color: #000000; letter-spacing: 0.5px;">
          Topic ${topicName}: ${cleanTitle}${includeAnswers ? ' (Teacher Answer Key)' : ''}
        </h3>
        
        <div class="timeline-recall-container" style="margin-top: 15px; width: 100%;">
            ${tableRowsL9}
        </div>
      </div>
    `;
  } else if (style === 'cornell') {
    const linesCount = density === 'compact' ? 5 : 8;
    const makeDottedLines = (count) => Array(count).fill('<div class="dotted-writing-line"></div>').join('');
    
    const fillNote = (ans) => {
      if (includeAnswers) {
        return `<div style="font-size: 9.5pt; color: #16a34a; font-style: italic; padding: 5px 0;"><strong>Model Notes:</strong> ${ans}</div>`;
      } else {
        return makeDottedLines(linesCount);
      }
    };

    const cues = data.cornell ? data.cornell.cues : data.narrative.map(sec => ({
       title: sec.title,
       subCues: [],
       modelNotes: sec.paragraphs.join('<br><br>')
    }));

    const renderCueRow = (cue, idx) => {
      let subCuesHtml = '';
      if (cue.subCues && cue.subCues.length > 0) {
        subCuesHtml = `<div style="margin-top: 8px; font-size: 8.5pt; font-weight: normal; color: #374151;">
          ${cue.subCues.map(sc => `<div style="margin-bottom: 4px;">${sc}</div>`).join('')}
        </div>`;
      }
      
      let keywordsHtml = '';
      const branch = data.mindMap && data.mindMap.branches ? data.mindMap.branches[idx] : null;
      if (branch && branch.keywords && branch.keywords.length > 0) {
        keywordsHtml = `<div style="margin-top: 10px; font-size: 8pt; font-weight: normal; color: #1e3a8a;">
          <strong>Keywords:</strong><br>
          ${branch.keywords.join(', ')}
        </div>`;
      }

      return `
        <tr class="print-cornell-row">
          <td class="print-cornell-cues" style="width: 30%; border-right: 1.5px solid #111827; border-bottom: 1.5px solid #111827; padding: 10px; vertical-align: top; font-size: 9.5pt; font-weight: bold; background: #f9fafb; text-align: left;">
            ${cue.title}
            ${subCuesHtml}
            ${keywordsHtml}
          </td>
          <td class="print-cornell-notes" style="width: 70%; border-bottom: 1.5px solid #111827; padding: 10px; vertical-align: top; background: #ffffff;">
            ${fillNote(cue.modelNotes)}
          </td>
        </tr>
      `;
    };
    
    const midPoint = Math.ceil(cues.length / 2);
    const page1Cues = cues.slice(0, midPoint);
    const page2Cues = cues.slice(midPoint);

    // Primary Sources HTML
    let sourcesHtml = '';
    if (data.sources && data.sources.length > 0) {
      sourcesHtml = data.sources.map(src => `
        <div style="border: 2px solid #1a237e; padding: 15px; margin-bottom: 20px; background: #f8f9fa;">
          <strong style="color: #1a237e; font-size: 12pt;">${src.title || src.id}</strong>
          <p style="margin: 8px 0 0 0; font-size: 11pt; font-style: italic; color: #333;">${src.text}</p>
        </div>
      `).join('');
    }

    // Vocabulary Focus HTML
    const vocabHtml = data.vocabulary.map(v => `
      <div style="margin-bottom: 8px; font-size: 11pt; line-height: 1.35; color: #111827;">
        <strong style="color: #1a237e; display: inline-block; padding: 2px 6px; background: #eef2ff; border-radius: 4px; margin-right: 6px;">${v.term}</strong> ${v.definition}
      </div>
    `).join('');

    // Narrative HTML: complete paragraphs
    const narrativeHtml = data.narrative.map(sec => `
      <div style="margin-bottom: 20px;">
        <h4 style="margin: 0 0 10px 0; font-size: 13pt; color: #1a237e; font-weight: bold; border-bottom: 1.5px solid #e5e7eb; padding-bottom: 4px;">${sec.title}</h4>
        ${sec.paragraphs.map(p => `<p class="narrative-block" style="margin: 0 0 15pt 0; font-size: 12pt; line-height: 1.45; text-align: justify; color: #111827;">${p}</p>`).join('')}
      </div>
    `).join('');

    // Historian Interpretations HTML
    let interpretationsHtml = '';
    if (typeof HISTORIAN_QUOTES !== 'undefined' && HISTORIAN_QUOTES[subtopicId]) {
      const h = HISTORIAN_QUOTES[subtopicId];
      interpretationsHtml = `
        <div style="border: 2px solid #374151; padding: 15px; margin-top: 20px; margin-bottom: 20px; background: #fafafa; border-radius: 4px;">
          <h3 style="font-size: 12pt; margin: 0 0 10px 0; border-bottom: 1.5px solid #374151; padding-bottom: 5px; color: #111827;">Historical Interpretations: Contrasting Views</h3>
          <div style="margin-bottom: 12px;">
            <strong style="font-size: 11pt; color: #1d4ed8;">Interpretation 1: ${h.hist1Name} (${h.hist1Focus})</strong>
            <p style="margin: 4px 0 0 0; font-size: 11pt; font-style: italic; color: #374151;">"${h.hist1Quote}"</p>
          </div>
          <div style="margin-bottom: 12px;">
            <strong style="font-size: 11pt; color: #b91c1c;">Interpretation 2: ${h.hist2Name} (${h.hist2Focus})</strong>
            <p style="margin: 4px 0 0 0; font-size: 11pt; font-style: italic; color: #374151;">"${h.hist2Quote}"</p>
          </div>
          <div style="background: #eef2ff; padding: 10px; border-left: 4px solid #1d4ed8; font-size: 11pt; color: #1e3a8a;">
            <strong>Synthesis Tip:</strong> ${h.synthesisTip}
          </div>
        </div>
      `;
    }

    // Knowledge Check Tasks HTML
    let tasksHtml = '';
    let tasksList = [];
    if (data.comprehensionCheck && data.comprehensionCheck.length > 0) {
      tasksList = data.comprehensionCheck.map(t => t.title || t.q);
    } else if (data.peerQuiz && data.peerQuiz.length > 0) {
      tasksList = data.peerQuiz.slice(0, 5).map(q => q.q);
    }
    if (tasksList.length > 0) {
      tasksHtml = `
        <div style="border: 2px solid #374151; padding: 15px; margin-top: 20px; margin-bottom: 20px; background: #ffffff; border-radius: 4px;">
          <h3 style="font-size: 12pt; margin: 0 0 10px 0; border-bottom: 1.5px solid #374151; padding-bottom: 5px; color: #111827;">Knowledge Check Tasks</h3>
          <ul style="margin: 0; padding-left: 20px; font-size: 11pt; line-height: 1.5; color: #374151;">
            ${tasksList.map(t => `<li style="margin-bottom: 6px;">${t}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    html += `
      <div class="print-page" style="page-break-after: always; position: relative;">
        <h2 class="main-title">Topic ${topicName}: ${cleanTitle}</h2>
        ${specBoxHtml}
        
        <div style="margin-top: 15px;">
          ${sourcesHtml}
          ${vocabHtml}
        </div>

        <div style="margin-top: 25px;">
          ${narrativeHtml}
        </div>
        
        ${interpretationsHtml}
        ${tasksHtml}
      </div>

      <div class="print-page">
        <h2 class="main-title">Cornell Notes &bull; Topic ${topicName}: ${cleanTitle}</h2>
        ${retrievalQuestionsHtml}

        <table class="print-cornell-grid" style="width: 100%; border-collapse: collapse; border: 1.5px solid #111827; margin-top: 10px; box-sizing: border-box;">
          <tbody>
            ${page1Cues.map((cue, idx) => renderCueRow(cue, idx)).join('')}
          </tbody>
        </table>
      </div>
    `;
    
    if (page2Cues.length > 0) {
      html += `
        <div class="print-page-last">
          <table class="print-cornell-grid" style="width: 100%; border-collapse: collapse; border: 1.5px solid #111827; margin-top: 10px; box-sizing: border-box;">
            <tbody>
              ${page2Cues.map((cue, idx) => renderCueRow(cue, idx + midPoint)).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

  } else if (style === 'quiz') {
    const subtopicData = QUIZ_DATA.flatMap(t => t.subtopics).find(s => s.id === subtopicId) || { easy: [], medium: [], difficult: [] };
    const easyQs = subtopicData.easy || [];
    const mediumQs = subtopicData.medium || [];
    const difficultQs = subtopicData.difficult || [];

    const selectedQuestions = [];
    selectedQuestions.push(...easyQs.slice(0, Math.min(5, easyQs.length)));
    selectedQuestions.push(...mediumQs.slice(0, Math.min(5, mediumQs.length)));
    selectedQuestions.push(...difficultQs.slice(0, Math.min(5, difficultQs.length)));

    // Fallback if we need to reach 15 questions
    if (selectedQuestions.length < 15) {
      const allQs = [...easyQs, ...mediumQs, ...difficultQs];
      for (const q of allQs) {
        if (!selectedQuestions.some(sq => sq.id === q.id)) {
          selectedQuestions.push(q);
          if (selectedQuestions.length === 15) break;
        }
      }
    }

    // Split selected questions into two columns for Page 1 (Q1-8, Q9-15)
    const col1Questions = selectedQuestions.slice(0, 8);
    const col2Questions = selectedQuestions.slice(8, 15);

    const renderQuizQuestion = (q, qIdx) => {
      const answerArea = includeAnswers 
        ? `<div style="color: #000000; font-style: italic; font-weight: bold; margin-top: 2px; font-size: 12pt;">Ans: ${q.answer}</div>`
        : `<div class="dotted-writing-line" style="border-bottom: 1px dashed #9ca3af; height: 18px; margin-top: 2px; width: 95%;"></div>`;
      return `
        <div style="margin-bottom: 14px; min-height: 48px; box-sizing: border-box; padding-right: 10px;">
          <div style="font-size: 12.5pt; line-height: 1.3; color: #000000; font-weight: bold;">
            Q${qIdx + 1}: <span style="font-weight: bold; color: #000000;">${q.question}</span>
          </div>
          ${answerArea}
        </div>
      `;
    };

    const renderExplanationRow = (q, qIdx) => {
      return `
        <div style="margin-bottom: 14px; min-height: 55px; border-bottom: 1px solid #f3f4f6; padding-bottom: 6px; padding-right: 10px; box-sizing: border-box;">
          <div style="font-size: 12pt; line-height: 1.25; color: #000000; font-weight: bold;">
            Q${qIdx + 1}: <span style="font-weight: bold; color: #000000;">${q.question}</span>
          </div>
          <div style="font-size: 12pt; font-weight: bold; color: #000000; margin-top: 2px;">
            Correct Answer: <span style="font-weight: bold; color: #000000;">${q.answer}</span>
          </div>
          <div style="font-size: 11.5pt; color: #000000; line-height: 1.25; margin-top: 2px; font-weight: bold;">
            <em>${q.explanation}</em>
          </div>
        </div>
      `;
    };

    const col1Html = col1Questions.map((q, idx) => renderQuizQuestion(q, idx)).join('');
    const col2Html = col2Questions.map((q, idx) => renderQuizQuestion(q, idx + 8)).join('');

    const col1ExpHtml = col1Questions.map((q, idx) => renderExplanationRow(q, idx)).join('');
    const col2ExpHtml = col2Questions.map((q, idx) => renderExplanationRow(q, idx + 8)).join('');

    const pageTitleQuiz = includeAnswers ? 'Teacher Answer Key &bull; ' : '';

    html += `
      <!-- SIDE 1: STUDENT QUIZ -->
      <div class="print-page" style="position: relative; min-height: 27.2cm; box-sizing: border-box;">
        <h2 class="main-title">${pageTitleQuiz}Topic ${topicName}: Quick-Fire Quiz</h2>
        ${specBoxHtml}
        
        <div style="border: 1.5px solid #000000; padding: 10px; background: #f9fafb; border-radius: 4px; margin-bottom: 15px; box-sizing: border-box; text-align: left;">
          <strong style="text-transform: uppercase; font-size: 10pt; color: #000000; display: block; margin-bottom: 4px;">✏️ Instructions</strong>
          <span style="font-size: 9pt; line-height: 1.35; color: #000000; display: block;">
            Answer all 15 questions from memory. Write your answers clearly on the dotted lines. Keep your answers brief.
          </span>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; table-layout: fixed;">
          <colgroup>
            <col width="50%" style="width: 50%;">
            <col width="50%" style="width: 50%;">
          </colgroup>
          <tbody>
            <tr>
              <td style="width: 50%; vertical-align: top; border-right: 1px solid #d1d5db; padding-right: 10px;">
                ${col1Html}
              </td>
              <td style="width: 50%; vertical-align: top; padding-left: 15px;">
                ${col2Html}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- SIDE 2: ANSWER KEY & SELF-MARKING -->
      <div class="print-page-last" style="position: relative; min-height: 27.2cm; box-sizing: border-box; margin-top: 20px; page-break-before: always;">
        <h3 style="font-size: 11.5pt; font-weight: bold; border-bottom: 1.5px solid #000000; padding-bottom: 2px; margin-top: 0; margin-bottom: 12px; text-transform: uppercase; color: #000000; letter-spacing: 0.5px;">
          Topic ${topicName}: Quiz Answer Key & Explanations
        </h3>

        <table style="width: 100%; border-collapse: collapse; margin-top: 5px; table-layout: fixed;">
          <colgroup>
            <col width="50%" style="width: 50%;">
            <col width="50%" style="width: 50%;">
          </colgroup>
          <tbody>
            <tr>
              <td style="width: 50%; vertical-align: top; border-right: 1px solid #d1d5db; padding-right: 10px;">
                ${col1ExpHtml}
              </td>
              <td style="width: 50%; vertical-align: top; padding-left: 15px;">
                ${col2ExpHtml}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Scoreboard & Diagnostic Feedback -->
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px; border: 1.5px solid #000000; background: #f9fafb; table-layout: fixed; box-sizing: border-box;">
          <colgroup>
            <col width="30%" style="width: 30%;">
            <col width="40%" style="width: 40%;">
            <col width="30%" style="width: 30%;">
          </colgroup>
          <tbody>
            <tr>
              <td style="padding: 10px; border-right: 1.5px solid #000000; text-align: center; vertical-align: middle; width: 30%;">
                <div style="font-size: 10.5pt; font-weight: bold; color: #000000; text-transform: uppercase; margin-bottom: 4px;">Score Tracker</div>
                <div style="font-size: 16.5pt; font-weight: 800; color: #000000; border: 1.5px dashed #9ca3af; padding: 4px 10px; display: inline-block; background: #ffffff;">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / 15
                </div>
              </td>
              <td style="padding: 10px; border-right: 1.5px solid #000000; font-size: 8.7pt; line-height: 1.3; color: #000000; width: 40%;">
                <strong style="font-size: 9.3pt; color: #000000; text-transform: uppercase; display: block; margin-bottom: 3px;">📊 Performance Boundaries</strong>
                <div style="margin-bottom: 2px;"><strong>13–15 Marks:</strong> Mastery (Level 9 Focus) - Excellent recall.</div>
                <div style="margin-bottom: 2px;"><strong>10–12 Marks:</strong> Strong (Level 7 Focus) - Solid foundation.</div>
                <div><strong>Under 10 Marks:</strong> Focus Needed - Re-read narrative & vocabulary.</div>
              </td>
              <td style="padding: 10px; font-size: 8.7pt; line-height: 1.3; color: #000000; width: 30%;">
                <strong style="font-size: 9.3pt; color: #000000; text-transform: uppercase; display: block; margin-bottom: 3px;">🔍 Diagnostic study guide</strong>
                <div>If you struggled with any question:</div>
                <div style="margin-top: 3px;">1. Re-read the Lesson Study Narrative.</div>
                <div>2. Review the Vocab Spotlight terms.</div>
                <div>3. Re-test using active recall.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `;





  }

  html += `
</body>
</html>
  `;
  return html;
}

async function generateBulkWorkbookHtml(style, density, includeAnswers) {
  const subtopicIds = [
    'subtopic_1_1', 'subtopic_1_2', 'subtopic_1_3',
    'subtopic_2_1', 'subtopic_2_2', 'subtopic_2_3',
    'subtopic_3_1', 'subtopic_3_2', 'subtopic_3_3'
  ];

  let combinedBodyContent = '';
  let documentHeader = '';
  
  for (let index = 0; index < subtopicIds.length; index++) {
    const subId = subtopicIds[index];
    let selectedIndices = [];
    if (style === 'exam') {
      const questionsData = LESSONS_DATA[subId]?.questionVault || [];
      selectedIndices = questionsData.map((_, idx) => idx);
    }

    const html = await generateWorkbookHtml(subId, style, density, includeAnswers, selectedIndices);
    
    const bodyStartIdx = html.indexOf('<body>');
    const bodyEndIdx = html.lastIndexOf('</body>');
    if (bodyStartIdx !== -1 && bodyEndIdx !== -1) {
      let bodyContent = html.substring(bodyStartIdx + 6, bodyEndIdx).trim();
      
      // Convert all print-page-last to print-page to force page break, except for the last lesson
      if (index < subtopicIds.length - 1) {
        bodyContent = bodyContent.replace(/class="print-page-last"/g, 'class="print-page"');
      }
      
      combinedBodyContent += `\n<!-- LESSON ${subId} -->\n` + bodyContent;
    }
    
    if (index === 0) {
      documentHeader = html.substring(0, bodyStartIdx + 6);
    }
  }

  return documentHeader + combinedBodyContent + '\n</body>\n</html>';
}

export {
  TIMELINE_WORKSHEET_PROMPTS,
  TIMELINE_KEYWORDS,
  getBlankedAndAnswers,
  generateWorkbookHtml,
  generateBulkWorkbookHtml
};
