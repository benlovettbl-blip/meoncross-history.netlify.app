const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const puppeteer = require('puppeteer');
const { pathToFileURL } = require('url');

const ROOT_DIR = path.join(__dirname, '..');
const dataJsPath = path.join(ROOT_DIR, 'units', 'cme_new', 'data.js');
const printablesDir = path.join(ROOT_DIR, 'public', 'units', 'cme_new', 'printables');
const pdfsDir = path.join(ROOT_DIR, 'public', 'pdfs', 'cme_new');

if (!fs.existsSync(printablesDir)) {
  fs.mkdirSync(printablesDir, { recursive: true });
}
if (!fs.existsSync(pdfsDir)) {
  fs.mkdirSync(pdfsDir, { recursive: true });
}

const KT_METADATA = {
  KT1: {
    title: 'Key Topic 1: The birth of the state of Israel, 1945–63',
    lessons: [0, 1, 2, 3],
    dates: '1945–1963',
    trapDoor:
      "Don't confuse the 1947 UN Partition Plan (Res 181, which allocated 55% to a Jewish state) with the 1949 Armistice Green Line (which enclosed 79% of Mandatory Palestine). And remember: the decisive turning point of the 1948–49 War was the 4-week UN truce in June 1948 when Israel imported Avia S-199 fighters and rifles from Czechoslovakia!",
    dominoEvents: [
      { num: '1', year: '1946', text: 'Bombing of King David Hotel by Irgun' },
      { num: '2', year: '1947', text: 'UN Resolution 181 Partition Plan approved' },
      { num: '3', year: '1948', text: 'Ben-Gurion declares State of Israel; 5 Arab armies invade' },
      { num: '4', year: '1956', text: 'Protocol of Sèvres collusion & Suez Crisis' },
    ],
    vocab: [
      {
        term: 'Conflicting Demands',
        def: 'Zionist pressure for 250,000 Holocaust survivors vs. Arab demands for independence based on majority rule.',
      },
      {
        term: 'Plan Dalet (Plan D)',
        def: 'Haganah military plan of April 1948 to secure supply corridors and clear hostile villages before British departure.',
      },
      {
        term: 'Law of Return (1950)',
        def: 'Landmark Knesset law granting every Jewish person worldwide automatic citizenship in Israel.',
      },
      {
        term: 'Protocol of Sèvres (1956)',
        def: 'Secret collusion between Britain, France, and Israel to invade Sinai and seize the Suez Canal.',
      },
    ],
    consequenceQ: {
      q: 'Explain one consequence of the bombing of the King David Hotel in Jerusalem on 22 July 1946.',
      formula: 'P-F-C Formula (Point → 2–3 Facts → Consequence Link)',
      pointStarter:
        'One consequence was that it shattered British domestic and political resolve to maintain the Palestine Mandate.',
      facts:
        'Irgun militants disguised as milkmen detonated explosives in the basement, killing 91 British, Arab, and Jewish staff and destroying the British administrative headquarters.',
      link: 'This was significant because it forced Prime Minister Clement Attlee’s cabinet to abandon the Mandate and refer the Palestine problem to the United Nations in February 1947.',
    },
    narrativeQ: {
      q: 'Write a narrative account analysing the key events of the Arab-Israeli war (1948–49).',
      formula: 'T-P-C Storyboard (Trigger / Outbreak → Pivot / Turning Point → Climax / Outcome)',
      stages: [
        {
          label: 'Stage 1: Outbreak (15 May 1948)',
          facts:
            'Armies from Egypt, Transjordan, Syria, Lebanon, and Iraq invaded simultaneously following the Declaration of Independence; Arab advance threatened Tel Aviv and besieged 100,000 Jews in Jerusalem.',
        },
        {
          label: 'Stage 2: Turning Point (June 1948)',
          facts:
            'A 4-week UN truce gave Israel critical breathing space to secretly import Avia S-199 fighters and rifles from Czechoslovakia, while David Ben-Gurion unified all militias into the IDF.',
        },
        {
          label: 'Stage 3: Outcome & Green Line (1949)',
          facts:
            'IDF launched sweeping autumn counter-offensives, opened the Burma Road into Jerusalem, and secured 1949 armistices enclosing 79% of Palestine, creating 700,000 Palestinian refugees (the Nakba).',
        },
      ],
    },
    importanceQ: {
      q: 'Explain the importance of UN Resolution 181 for the creation of the State of Israel.',
      formula: 'F-I-L Formula (Factor → Information Facts → Link to Outcome)',
      facts:
        'Passed by a 2/3 UN majority on 29 November 1947, allocating 55% of Mandatory Palestine to a Jewish state, 45% to an Arab state, and designating Jerusalem an international corpus separatum.',
      significance:
        'It provided the essential international legal legitimacy for David Ben-Gurion to proclaim the sovereign State of Israel on 14 May 1948, ending two millennia of Jewish statelessness.',
    },
  },

  KT2: {
    title: 'Key Topic 2: The escalating conflict, 1964–73',
    lessons: [4, 5, 6],
    dates: '1964–1973',
    trapDoor:
      "Don't confuse the 1956 Suez Crisis with the 1967 Six Day War! Israel occupied the West Bank, Gaza, Golan Heights, Sinai, and East Jerusalem in June 1967, not 1956. In the 1973 Yom Kippur War, Egyptian assault troops breached the Bar-Lev Line with high-pressure water monitors, not conventional artillery!",
    dominoEvents: [
      { num: '1', year: '1964', text: 'Cairo Conference establishes the PLO' },
      { num: '2', year: '1967', text: 'Six Day War: Israel captures Sinai, West Bank, Golan' },
      { num: '3', year: '1970', text: 'Black September: Jordanian Army expels PLO to Lebanon' },
      { num: '4', year: '1973', text: 'Yom Kippur War: Egyptian-Syrian surprise attack' },
    ],
    vocab: [
      {
        term: 'UN Resolution 242 (1967)',
        def: '‘Land for peace’ formula calling for Israeli withdrawal from occupied territories in exchange for recognized boundaries.',
      },
      {
        term: 'The Conception',
        def: 'Israeli intelligence hubris assuming Egypt would never attack without long-range strike bombers to neutralize the IAF.',
      },
      {
        term: 'Bar-Lev Line',
        def: 'A $300m chain of sand ramparts and concrete bunkers along the Suez Canal breached by Egyptian forces in October 1973.',
      },
      {
        term: 'Operation Badr (1973)',
        def: 'Coordinated Egyptian canal crossing on Yom Kippur using high-pressure water monitors and mobile SAM missile umbrellas.',
      },
    ],
    consequenceQ: {
      q: 'Explain one consequence of President Nasser’s decision to close the Straits of Tiran to Israeli shipping on 22 May 1967.',
      formula: 'P-F-C Formula (Point → 2–3 Facts → Consequence Link)',
      pointStarter:
        'One consequence was that it blockaded Israel’s vital southern maritime lifeline through the port of Eilat.',
      facts:
        'Egypt deployed troops to Sharm el-Sheikh and closed the straits, cutting off 90% of Israel’s petroleum imports from Iran and crossing an explicit Israeli casus belli (act of war).',
      link: 'This was significant because it convinced the Israeli government under Levi Eshkol and Moshe Dayan that an immediate pre-emptive military strike was essential for national survival.',
    },
    narrativeQ: {
      q: 'Write a narrative account analysing the key events of the Six Day War (5–10 June 1967).',
      formula: 'T-P-C Storyboard (Trigger / Outbreak → Pivot / Turning Point → Climax / Outcome)',
      stages: [
        {
          label: 'Stage 1: Pre-emptive Airstrike (5 June)',
          facts:
            'Operation Focus wiped out 300 grounded Egyptian aircraft in 3 hours, granting Israel absolute aerial supremacy over all battlefields.',
        },
        {
          label: 'Stage 2: Fronts Encircled (5–7 June)',
          facts:
            'Jordanian artillery shelled West Jerusalem; Israeli paratroopers under Motta Gur captured East Jerusalem and the Western Wall on 7 June, securing the West Bank.',
        },
        {
          label: 'Stage 3: Golan Conquest & Ceasefire (9–10 June)',
          facts:
            'IDF armoured brigades scaled the Golan escarpment, seizing the plateau from Syria before accepting a UN ceasefire, quadrupling Israel’s size.',
        },
      ],
    },
    importanceQ: {
      q: 'Explain the importance of the 1973 Yom Kippur War for Egyptian diplomatic leverage.',
      formula: 'F-I-L Formula (Factor → Information Facts → Link to Outcome)',
      facts:
        'Egypt shattered the myth of Israeli invincibility by crossing the Suez Canal in Operation Badr, deploying Sagger missiles, and inflicting 2,600 Israeli casualties.',
      significance:
        'Restoring Egyptian national pride and Arab military honour enabled Anwar Sadat to negotiate peace with Israel from a position of equal dignity, leading directly to the 1978 Camp David Accords.',
    },
  },

  KT3: {
    title: 'Key Topic 3: Attempts at a solution, 1974–95',
    lessons: [7, 8, 9],
    dates: '1974–1995',
    trapDoor:
      "In 'Importance' questions, you MUST explain why an event was important for the specific outcome named in the prompt (e.g. importance of Camp David FOR Egyptian-Israeli relations), not just write general knowledge about Jimmy Carter! And remember: Arafat renounced terrorism in Geneva in Dec 1988, which directly unlocked official US-PLO dialogue!",
    dominoEvents: [
      { num: '1', year: '1977', text: 'Anwar Sadat historic address to the Israeli Knesset' },
      { num: '2', year: '1979', text: 'Treaty of Washington: Egypt-Israel Peace Treaty' },
      { num: '3', year: '1987', text: 'First Palestinian Intifada breaks out in Jabalia, Gaza' },
      { num: '4', year: '1993', text: 'Oslo Accords: Rabin and Arafat White House handshake' },
    ],
    vocab: [
      {
        term: 'Shuttle Diplomacy',
        def: 'Henry Kissinger flying between Middle Eastern capitals to broker disengagement agreements after the 1973 war.',
      },
      {
        term: 'Camp David Accords (1978)',
        def: '13-day summit hosted by Jimmy Carter producing frameworks for Sinai peace and Palestinian autonomy.',
      },
      {
        term: 'UNLU',
        def: 'Unified National Leadership of the Uprising: clandestine committees directing strikes and protests during the First Intifada.',
      },
      {
        term: 'Oslo II (1995)',
        def: 'Interim agreement dividing the West Bank into Area A (Palestinian), Area B (joint), and Area C (full Israeli control, 73%).',
      },
    ],
    consequenceQ: {
      q: 'Explain one consequence of the Treaty of Washington (1979) for Egypt’s standing within the Arab League.',
      formula: 'P-F-C Formula (Point → 2–3 Facts → Consequence Link)',
      pointStarter:
        'One consequence was that Egypt was politically isolated and ostracized by the rest of the Arab world.',
      facts:
        'Arab states condemned Anwar Sadat for signing a separate bilateral peace, expelled Egypt from the Arab League, moved League headquarters from Cairo to Tunis, and severed diplomatic ties.',
      link: 'This was significant because it broke Pan-Arab diplomatic unity and provoked violent extremist backlash inside Egypt, culminating in Sadat’s assassination in October 1981.',
    },
    narrativeQ: {
      q: 'Write a narrative account analysing the outbreak and development of the First Palestinian Intifada (1987–93).',
      formula: 'T-P-C Storyboard (Trigger / Outbreak → Pivot / Turning Point → Climax / Outcome)',
      stages: [
        {
          label: 'Stage 1: The Spark (Dec 1987)',
          facts:
            'An Israeli military vehicle killed 4 labourers at the Erez checkpoint; funerals in Jabalia erupted into spontaneous demonstrations, stone-throwing, and strikes.',
        },
        {
          label: 'Stage 2: Civil Disobedience & Iron Fist',
          facts:
            'The underground UNLU directed boycotts and tax strikes; Defense Minister Yitzhak Rabin ordered ‘force, might, and beatings’, drawing global media condemnation.',
        },
        {
          label: 'Stage 3: Political Realization & Oslo',
          facts:
            'King Hussein severed West Bank ties in 1988; Israeli leaders realized direct military rule was unsustainable, prompting secret backchannel talks in Norway leading to the 1993 Oslo Accords.',
        },
      ],
    },
    importanceQ: {
      q: 'Explain the importance of the Letters of Mutual Recognition (9 September 1993) for the Oslo peace process.',
      formula: 'F-I-L Formula (Factor → Information Facts → Link to Outcome)',
      facts:
        'Yasser Arafat officially recognized Israel’s right to exist in peace and renounced terrorism, while Yitzhak Rabin recognized the PLO as the legitimate representative of the Palestinian people.',
      significance:
        'It ended five decades of mutual existential denial, allowing former enemies to sign the Declaration of Principles on the White House lawn and establish the Palestinian National Authority.',
    },
  },
};

(async () => {
  try {
    const mod = await import(pathToFileURL(dataJsPath).href);
    const unitData = mod.default || mod.unitData || mod.cme_new;

    console.log('🚀 Generating CME 3-Format Printable Revision Suite...');

    for (const [ktKey, meta] of Object.entries(KT_METADATA)) {
      console.log(`\n📄 Building printables for ${ktKey} (${meta.title})...`);

      // Gather 20 rapid recall questions from matching lessons
      let rapidQs = [];
      meta.lessons.forEach((lIdx) => {
        const lesson = unitData.lessons[lIdx];
        if (lesson && lesson.quiz) {
          lesson.quiz.forEach((q) => {
            rapidQs.push({
              q: q.q || q.question,
              a: q.a || q.answer,
              source: lesson.title,
            });
          });
        }
      });
      // Pick top 20 representative questions
      const sample20Rapid = rapidQs.slice(0, 20);

      // Generate QR Code linking to online live Leitner deck
      const liveDeckUrl = `https://meoncross-history.netlify.app/units/cme_new/mastery_pack_${ktKey}.html#practice-mode`;
      const qrDataUrl = await QRCode.toDataURL(liveDeckUrl, { width: 140, margin: 1 });

      // -------------------------------------------------------------
      // 1. FORMAT 1: The 2-Page A4 Workout Spread
      // -------------------------------------------------------------
      const workoutHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Mastery Workout: ${meta.title}</title>
    <style>
        @page { size: A4 portrait; margin: 10mm 12mm; }
        * { box-sizing: border-box; }
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #0f172a; margin: 0; padding: 0; font-size: 10pt; line-height: 1.35; background: #fff; }
        .page { page-break-after: always; min-height: 275mm; display: flex; flex-direction: column; justify-content: space-between; }
        .page:last-child { page-break-after: avoid; }
        .header { border-bottom: 2px solid #1e3a8a; padding-bottom: 6px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: flex-end; }
        .header-left h1 { margin: 0; font-size: 14pt; color: #1e3a8a; font-weight: 800; text-transform: uppercase; }
        .header-left p { margin: 2px 0 0 0; font-size: 8.5pt; color: #475569; }
        .header-right { text-align: right; }
        .badge-pill { background: #1e3a8a; color: white; padding: 3px 8px; border-radius: 4px; font-weight: 800; font-size: 8pt; text-transform: uppercase; }
        
        /* Spaced Log */
        .retrieval-log { border: 1.5px dashed #1e3a8a; border-radius: 6px; padding: 6px 10px; background: #f8fafc; margin-bottom: 10px; }
        .log-title { font-size: 8pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 4px; display: flex; justify-content: space-between; }
        .log-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; font-size: 8pt; }
        .log-item { background: #fff; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; }
        
        /* Section styling */
        .section-box { border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px 10px; margin-bottom: 8px; }
        .section-header { font-size: 9pt; font-weight: 800; color: #1e3a8a; text-transform: uppercase; margin-bottom: 6px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #e2e8f0; padding-bottom: 3px; }
        
        /* 10-Min Fact Check */
        .fact-list { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 10px; font-size: 8pt; }
        .fact-item { display: flex; align-items: flex-start; gap: 4px; }
        .checkbox-box { width: 12px; height: 12px; border: 1px solid #94a3b8; border-radius: 2px; flex-shrink: 0; margin-top: 1px; }
        
        /* Domino flowchart */
        .domino-row { display: flex; gap: 6px; justify-content: space-between; margin: 4px 0; }
        .domino-card { flex: 1; border: 1.5px solid #3b82f6; border-radius: 4px; padding: 4px 6px; text-align: center; background: #eff6ff; font-size: 7.5pt; }
        .domino-year { font-weight: 800; color: #1d4ed8; font-size: 8.5pt; }
        
        /* Trap Door */
        .trap-door { border: 1.5px solid #dc2626; background: #fef2f2; border-radius: 6px; padding: 6px 10px; font-size: 8pt; color: #991b1b; line-height: 1.3; }
        .trap-door strong { color: #b91c1c; }
        
        /* Page 2: Exam Studio */
        .formula-tag { background: #e0e7ff; color: #3730a3; padding: 2px 6px; border-radius: 4px; font-size: 7.5pt; font-weight: 800; display: inline-block; margin-bottom: 4px; }
        .q-prompt { font-weight: 800; font-size: 9.5pt; color: #0f172a; margin-bottom: 4px; }
        .scaffold-lines { border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 8px; background: #fff; margin-bottom: 8px; }
        .writing-line { height: 16px; border-bottom: 1px solid #e2e8f0; margin-bottom: 2px; }
        .writing-line.starter { color: #64748b; font-style: italic; font-size: 8pt; display: flex; align-items: flex-end; }
        
        /* Storyboard grid */
        .storyboard-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; margin-bottom: 4px; }
        .storyboard-box { border: 1.5px solid #475569; border-radius: 4px; padding: 6px; background: #f8fafc; font-size: 7.5pt; }
        .storyboard-title { font-weight: 800; color: #1e293b; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 4px; }
        
        /* Importance grid */
        .importance-table { width: 100%; border-collapse: collapse; font-size: 8pt; margin-bottom: 4px; }
        .importance-table th, .importance-table td { border: 1px solid #cbd5e1; padding: 4px 6px; vertical-align: top; }
        .importance-table th { background: #f1f5f9; font-weight: 800; color: #1e293b; text-align: left; }

        .footer-note { font-size: 7pt; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 4px; margin-top: 6px; }
    </style>
</head>
<body>

    <!-- PAGE 1: KNOWLEDGE FOUNDATION -->
    <div class="page">
        <div>
            <div class="header">
                <div class="header-left">
                    <h1>${meta.title}</h1>
                    <p>Stage 1: Core Knowledge Foundation &amp; Spaced Retrieval Warm-Up · ${meta.dates}</p>
                </div>
                <div class="header-right">
                    <span class="badge-pill">Format 1: A4 Workout</span>
                </div>
            </div>

            <!-- Retrieval Log -->
            <div class="retrieval-log">
                <div class="log-title">
                    <span>🎯 Spaced Retrieval Practice Log (Complete 3 Distinct Attempts)</span>
                    <span>Classroom &amp; Homework Tracking</span>
                </div>
                <div class="log-grid">
                    <div class="log-item">
                        <strong>Attempt 1:</strong> Date: __________ Score: ___/20<br>
                        Status: [ ] Red &nbsp; [ ] Amber &nbsp; [ ] Green
                    </div>
                    <div class="log-item">
                        <strong>Attempt 2:</strong> Date: __________ Score: ___/20<br>
                        Status: [ ] Red &nbsp; [ ] Amber &nbsp; [ ] Green
                    </div>
                    <div class="log-item">
                        <strong>Attempt 3:</strong> Date: __________ Score: ___/20<br>
                        Status: [ ] Red &nbsp; [ ] Amber &nbsp; [ ] Green
                    </div>
                </div>
            </div>

            <!-- Section A: 10-Minute Rapid Recall -->
            <div class="section-box">
                <div class="section-header">
                    <span>🧠 Section A: Rapid-Fire Knowledge Check (10 Facts)</span>
                    <span style="font-weight: normal; font-size: 7.5pt; color: #64748b;">Cover, Recall, Self-Check</span>
                </div>
                <div class="fact-list">
                    ${sample20Rapid
                      .slice(0, 10)
                      .map(
                        (item, i) => `
                        <div class="fact-item">
                            <div class="checkbox-box"></div>
                            <div><strong>${i + 1}. ${item.q}</strong><br><span style="color: #64748b; font-size: 7.5pt;">Ans: ${item.a}</span></div>
                        </div>
                    `,
                      )
                      .join('')}
                </div>
            </div>

            <!-- Section B: Timeline Dominoes -->
            <div class="section-box">
                <div class="section-header">
                    <span>⏱️ Section B: Chronological Domino Flowchart</span>
                    <span style="font-weight: normal; font-size: 7.5pt; color: #64748b;">Draw connecting causal arrows</span>
                </div>
                <div class="domino-row">
                    ${meta.dominoEvents
                      .map(
                        (d) => `
                        <div class="domino-card">
                            <div class="domino-year">${d.year}</div>
                            <div>${d.text}</div>
                        </div>
                    `,
                      )
                      .join('')}
                </div>
            </div>

            <!-- Section C: Key Specification Vocabulary -->
            <div class="section-box">
                <div class="section-header">
                    <span>🔑 Section C: Key Specification Terms (Non-Negotiable)</span>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px 8px; font-size: 7.5pt;">
                    ${meta.vocab
                      .map(
                        (v) => `
                        <div><strong>• ${v.term}:</strong> ${v.def}</div>
                    `,
                      )
                      .join('')}
                </div>
            </div>

            <!-- Section D: Examiner Trap Door -->
            <div class="trap-door">
                <strong>⚠️ THE EXAMINER'S TRAP DOOR:</strong> ${meta.trapDoor}
            </div>
        </div>

        <div class="footer-note">
            Mr Lovett's History Hub · Pearson Edexcel GCSE (9–1) History · Option P5: Conflict in the Middle East · Page 1 of 2
        </div>
    </div>

    <!-- PAGE 2: THE 3-STEM EXAM STUDIO -->
    <div class="page">
        <div>
            <div class="header">
                <div class="header-left">
                    <h1>${meta.title}</h1>
                    <p>Stage 2: The GCSE Exam Studio · 3 Question Stems &amp; Fact Expansion Frames</p>
                </div>
                <div class="header-right">
                    <span class="badge-pill" style="background: #047857;">Exam Studio</span>
                </div>
            </div>

            <!-- Zone 1: 4-Mark Consequence -->
            <div class="section-box" style="border-left: 3px solid #f59e0b;">
                <div class="formula-tag">${meta.consequenceQ.formula}</div>
                <div class="q-prompt">1. ${meta.consequenceQ.q} <span style="font-size: 8pt; color: #64748b;">(4 Marks)</span></div>
                <div class="scaffold-lines">
                    <div class="writing-line starter">One consequence was that... ${meta.consequenceQ.pointStarter}</div>
                    <div class="writing-line starter">Specifically, (include 2–3 historical facts)...</div>
                    <div class="writing-line starter">This was significant because it led directly to...</div>
                    <div class="writing-line"></div>
                </div>
            </div>

            <!-- Zone 2: 8-Mark Narrative Account -->
            <div class="section-box" style="border-left: 3px solid #3b82f6;">
                <div class="formula-tag">${meta.narrativeQ.formula}</div>
                <div class="q-prompt">2. ${meta.narrativeQ.q} <span style="font-size: 8pt; color: #64748b;">(8 Marks)</span></div>
                <div class="storyboard-grid">
                    ${meta.narrativeQ.stages
                      .map(
                        (st) => `
                        <div class="storyboard-box">
                            <div class="storyboard-title">${st.label}</div>
                            <div>${st.facts}</div>
                        </div>
                    `,
                      )
                      .join('')}
                </div>
                <div class="scaffold-lines">
                    <div class="writing-line starter">First paragraph: The conflict began when...</div>
                    <div class="writing-line starter">Second paragraph: A decisive turning point occurred when...</div>
                    <div class="writing-line starter">Third paragraph: As a direct consequence of this...</div>
                    <div class="writing-line"></div>
                </div>
            </div>

            <!-- Zone 3: 8-Mark Importance -->
            <div class="section-box" style="border-left: 3px solid #8b5cf6;">
                <div class="formula-tag">${meta.importanceQ.formula}</div>
                <div class="q-prompt">3. ${meta.importanceQ.q} <span style="font-size: 8pt; color: #64748b;">(8 Marks)</span></div>
                <table class="importance-table">
                    <tr>
                        <th style="width: 50%;">Detailed Historical Facts (AO1)</th>
                        <th style="width: 50%;">Causal Link to Outcome (AO2)</th>
                    </tr>
                    <tr>
                        <td>${meta.importanceQ.facts}</td>
                        <td>${meta.importanceQ.significance}</td>
                    </tr>
                </table>
                <div class="scaffold-lines">
                    <div class="writing-line starter">This was critically important for the outcome because...</div>
                    <div class="writing-line starter">Without these events, the situation would have differed because...</div>
                    <div class="writing-line"></div>
                </div>
            </div>
        </div>

        <div class="footer-note">
            Mr Lovett's History Hub · Pearson Edexcel GCSE (9–1) History · Option P5: Conflict in the Middle East · Page 2 of 2
        </div>
    </div>

</body>
</html>`;

      const workoutPath = path.join(printablesDir, `cme_workout_${ktKey}.html`);
      fs.writeFileSync(workoutPath, workoutHtml, 'utf8');

      // -------------------------------------------------------------
      // 2. FORMAT 2: The A3 Desk Placemat (Landscape Command Centre)
      // -------------------------------------------------------------
      const placematHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>A3 Desk Placemat: ${meta.title}</title>
    <style>
        @page { size: A3 landscape; margin: 8mm; }
        * { box-sizing: border-box; }
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #0f172a; margin: 0; padding: 0; font-size: 9pt; line-height: 1.35; background: #fff; }
        .placemat-container { width: 100%; height: 280mm; display: flex; flex-direction: column; justify-content: space-between; }
        .top-banner { background: #1e3a8a; color: white; padding: 8px 16px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .top-banner h1 { margin: 0; font-size: 16pt; font-weight: 800; letter-spacing: 0.5px; }
        .top-banner p { margin: 2px 0 0 0; font-size: 9pt; color: #93c5fd; }
        
        .three-column-grid { display: grid; grid-template-columns: 28% 44% 28%; gap: 10px; flex: 1 1 auto; }
        
        /* Columns */
        .column { border: 1.5px solid #cbd5e1; border-radius: 6px; padding: 8px 10px; display: flex; flex-direction: column; justify-content: space-between; background: #f8fafc; }
        .column-header { font-weight: 800; font-size: 10pt; color: #1e3a8a; text-transform: uppercase; border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: center; }
        
        /* Left Column: Rapid Recall Vault */
        .vault-q-list { display: flex; flex-direction: column; gap: 4px; font-size: 7.5pt; overflow: hidden; }
        .vault-q-row { background: #fff; border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 6px; display: flex; justify-content: space-between; align-items: center; }
        .rag-pills { display: flex; gap: 2px; }
        .rag-circle { width: 10px; height: 10px; border-radius: 50%; border: 1px solid #94a3b8; }
        
        /* Middle Column: Blueprint */
        .blueprint-box { background: #fff; border: 1.5px solid #3b82f6; border-radius: 6px; padding: 8px; margin-bottom: 8px; }
        .blueprint-title { font-weight: 800; color: #1d4ed8; font-size: 9pt; margin-bottom: 4px; }
        
        /* Right Column: Model Answer Dissector */
        .model-card { background: #fff; border: 1.5px solid #8b5cf6; border-radius: 6px; padding: 8px; margin-bottom: 6px; font-size: 7.5pt; }
        .model-card h4 { margin: 0 0 4px 0; color: #5b21b6; font-size: 8.5pt; }
        .hl-fact { background: #dbeafe; color: #1e40af; font-weight: bold; padding: 0 2px; border-radius: 2px; } /* AO1 Blue */
        .hl-connect { background: #fef3c7; color: #92400e; font-weight: bold; padding: 0 2px; border-radius: 2px; } /* Connector Yellow */
        .hl-link { background: #d1fae5; color: #065f46; font-weight: bold; padding: 0 2px; border-radius: 2px; } /* AO2 Green */
        
        .footer-bar { border-top: 1px solid #cbd5e1; padding-top: 4px; display: flex; justify-content: space-between; font-size: 7.5pt; color: #64748b; margin-top: 6px; }
    </style>
</head>
<body>

<div class="placemat-container">
    <!-- Top Banner -->
    <div class="top-banner">
        <div>
            <h1>${meta.title} — DESK REVISION PLACEMAT</h1>
            <p>Visual Knowledge Command Centre &amp; Exam Model Dissector · Pearson Edexcel Option P5</p>
        </div>
        <div style="text-align: right; font-size: 8pt;">
            Attempt 1 [ ] &nbsp; Attempt 2 [ ] &nbsp; Attempt 3 [ ]<br>
            Student: ________________________
        </div>
    </div>

    <!-- 3-Column Studio Grid -->
    <div class="three-column-grid">
        
        <!-- LEFT COLUMN: The Knowledge Vault -->
        <div class="column">
            <div>
                <div class="column-header">
                    <span>🔒 The Knowledge Vault</span>
                    <span style="font-size: 7.5pt; color: #64748b;">R-A-G Self Check</span>
                </div>
                <div class="vault-q-list">
                    ${sample20Rapid
                      .slice(0, 16)
                      .map(
                        (q, i) => `
                        <div class="vault-q-row">
                            <span style="flex: 1; padding-right: 4px;"><strong>${i + 1}.</strong> ${q.q}</span>
                            <div class="rag-pills">
                                <div class="rag-circle" style="background: #fee2e2;"></div>
                                <div class="rag-circle" style="background: #fef3c7;"></div>
                                <div class="rag-circle" style="background: #dcfce7;"></div>
                            </div>
                        </div>
                    `,
                      )
                      .join('')}
                </div>
            </div>
            <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 4px; padding: 6px; font-size: 7.5pt; color: #1e40af; margin-top: 4px;">
                <strong>💡 Quick Tip:</strong> Cover the right column. Say each answer aloud, then verify.
            </div>
        </div>

        <!-- MIDDLE COLUMN: The Specification Blueprint & Timeline -->
        <div class="column" style="background: #fff;">
            <div>
                <div class="column-header">
                    <span>🗺️ Specification Blueprint &amp; Milestones</span>
                    <span style="font-size: 7.5pt; color: #047857;">Edexcel Option P5</span>
                </div>
                
                <!-- Milestones -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 8px;">
                    ${meta.dominoEvents
                      .map(
                        (d) => `
                        <div style="background: #f8fafc; border: 1.5px solid #3b82f6; border-radius: 4px; padding: 5px; text-align: center;">
                            <span style="font-weight: 800; color: #1d4ed8; font-size: 9.5pt;">${d.year}</span><br>
                            <span style="font-size: 7.5pt;">${d.text}</span>
                        </div>
                    `,
                      )
                      .join('')}
                </div>

                <!-- Core Spec Terms -->
                <div class="blueprint-box">
                    <div class="blueprint-title">🔑 Core Specification Terminology (Non-Negotiable Facts)</div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px 8px; font-size: 7.5pt;">
                        ${meta.vocab
                          .map(
                            (v) => `
                            <div><strong>• ${v.term}:</strong> ${v.def}</div>
                        `,
                          )
                          .join('')}
                    </div>
                </div>

                <!-- 3-Stage Storyboard Framework -->
                <div class="blueprint-box" style="border-color: #8b5cf6;">
                    <div class="blueprint-title" style="color: #6d28d9;">📖 The 3-Stage Narrative Framework</div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; font-size: 7pt;">
                        ${meta.narrativeQ.stages
                          .map(
                            (st) => `
                            <div style="background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 4px; padding: 4px;">
                                <strong>${st.label}</strong><br>${st.facts}
                            </div>
                        `,
                          )
                          .join('')}
                    </div>
                </div>
            </div>

            <!-- Trap Door Alert -->
            <div style="border: 1.5px solid #ef4444; background: #fef2f2; border-radius: 4px; padding: 6px 10px; font-size: 7.5pt; color: #991b1b;">
                <strong>⚠️ THE EXAMINER'S TRAP DOOR:</strong> ${meta.trapDoor}
            </div>
        </div>

        <!-- RIGHT COLUMN: Color-Coded Model Answer Dissector -->
        <div class="column">
            <div>
                <div class="column-header">
                    <span>🎯 Model Answer Dissector</span>
                    <span style="font-size: 7pt; color: #6d28d9;">Grade 9 Standard</span>
                </div>
                
                <div style="display: flex; gap: 4px; margin-bottom: 6px; font-size: 7pt;">
                    <span class="hl-fact">AO1 Facts</span>
                    <span class="hl-connect">Connectors</span>
                    <span class="hl-link">AO2 Link</span>
                </div>

                <!-- Model 1: Consequence -->
                <div class="model-card">
                    <h4>4-Mark Consequence (P-F-C)</h4>
                    <p style="margin: 0; line-height: 1.3;">
                        <span class="hl-connect">One consequence was that</span> it shattered British domestic and political resolve. 
                        <span class="hl-fact">Irgun militants disguised as milkmen detonated explosives in the basement, killing 91 people</span>. 
                        <span class="hl-link">This directly forced Attlee to refer Palestine to the UN in February 1947.</span>
                    </p>
                </div>

                <!-- Model 2: Narrative -->
                <div class="model-card">
                    <h4>8-Mark Narrative (T-P-C)</h4>
                    <p style="margin: 0; line-height: 1.3;">
                        <span class="hl-connect">The conflict began when</span> <span class="hl-fact">5 Arab armies invaded in May 1948</span>. 
                        <span class="hl-connect">A crucial turning point occurred when</span> <span class="hl-fact">the June truce allowed Israel to acquire Czech Avia fighters</span>. 
                        <span class="hl-link">Consequently, the IDF broke the siege of Jerusalem and secured 79% of Palestine.</span>
                    </p>
                </div>

                <!-- Model 3: Importance -->
                <div class="model-card">
                    <h4>8-Mark Importance (F-I-L)</h4>
                    <p style="margin: 0; line-height: 1.3;">
                        <span class="hl-connect">Resolution 181 was vital because</span> <span class="hl-fact">it allocated 55% of land to a Jewish state</span>. 
                        <span class="hl-link">Without this UN legal mandate, David Ben-Gurion could not have declared sovereign statehood on 14 May 1948.</span>
                    </p>
                </div>
            </div>

            <!-- Student Timed Practice Box -->
            <div style="background: #fff; border: 1.5px dashed #475569; border-radius: 4px; padding: 6px; font-size: 7.5pt;">
                <strong>✍️ 5-Minute Timed Challenge:</strong> Write 2 sentences for Question 1 using the P-F-C formula on the reverse!
            </div>
        </div>

    </div>

    <!-- Footer -->
    <div class="footer-bar">
        <span>Mr Lovett's History Hub · Option P5: Conflict in the Middle East</span>
        <span>Format 2: A3 Landscape Desk Revision Placemat</span>
        <span>Photocopiable for classroom &amp; independent pupil revision</span>
    </div>
</div>

</body>
</html>`;

      const placematPath = path.join(printablesDir, `cme_placemat_${ktKey}.html`);
      fs.writeFileSync(placematPath, placematHtml, 'utf8');

      // -------------------------------------------------------------
      // 3. FORMAT 3: The Foldable Pocket Trifold Zine (A4 Trifold)
      // -------------------------------------------------------------
      const trifoldHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Pocket Trifold Zine: ${meta.title}</title>
    <style>
        @page { size: A4 landscape; margin: 8mm 6mm; }
        * { box-sizing: border-box; }
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #0f172a; margin: 0; padding: 0; font-size: 8pt; line-height: 1.3; background: #fff; }
        .trifold-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; height: 194mm; }
        .trifold-panel { border-right: 1px dashed #cbd5e1; padding: 0 10px; display: flex; flex-direction: column; justify-content: space-between; }
        .trifold-panel:last-child { border-right: none; }
        .panel-header { border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-bottom: 6px; }
        .panel-header h2 { margin: 0; font-size: 11pt; color: #1e3a8a; font-weight: 800; text-transform: uppercase; }
        .panel-header p { margin: 1px 0 0 0; font-size: 7pt; color: #64748b; }
        
        .qr-card { border: 1.5px solid #1e3a8a; border-radius: 6px; padding: 6px; display: flex; align-items: center; gap: 8px; background: #eff6ff; margin-bottom: 6px; }
        .qr-img { width: 55px; height: 55px; flex-shrink: 0; }
        .qr-text { font-size: 7pt; color: #1e3a8a; line-height: 1.2; }
        
        .log-box { border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; background: #f8fafc; font-size: 7pt; margin-bottom: 6px; }
        
        .challenge-box { border: 1.5px solid #8b5cf6; border-radius: 4px; padding: 5px; background: #fdf4ff; margin-bottom: 6px; font-size: 7.5pt; }
        .challenge-title { font-weight: 800; color: #701a75; font-size: 8pt; margin-bottom: 2px; }
        
        .footer-tag { font-size: 6.5pt; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 3px; }
    </style>
</head>
<body>

<div class="trifold-grid">
    
    <!-- PANEL 1: RETRIEVAL TRACKER & QR CODE -->
    <div class="trifold-panel">
        <div>
            <div class="panel-header">
                <h2>${ktKey}: Pocket Recall</h2>
                <p>${meta.title} · ${meta.dates}</p>
            </div>

            <!-- Phone Launcher QR -->
            <div class="qr-card">
                <img src="${qrDataUrl}" alt="QR" class="qr-img">
                <div class="qr-text">
                    <strong>📱 Scan to Drill:</strong><br>
                    Launches the 20-card interactive Leitner Spaced Recall deck on your phone.
                </div>
            </div>

            <!-- 3-Attempt Spaced Log -->
            <div class="log-box">
                <strong>🎯 RETRIEVAL LOG:</strong><br>
                • Attempt 1: Date: ______ Score: __/20 [ ] R [ ] A [ ] G<br>
                • Attempt 2: Date: ______ Score: __/20 [ ] R [ ] A [ ] G<br>
                • Attempt 3: Date: ______ Score: __/20 [ ] R [ ] A [ ] G<br>
                Parent / Teacher Sig: _________________________
            </div>

            <!-- 5 Rapid Fire Checks -->
            <div style="font-size: 7.5pt;">
                <strong>⚡ 5 Quick-Fire Flash Checks:</strong>
                ${sample20Rapid
                  .slice(0, 5)
                  .map(
                    (q, i) => `
                    <div style="margin-top: 3px; border-bottom: 1px dotted #e2e8f0; padding-bottom: 2px;">
                        <strong>${i + 1}.</strong> ${q.q}<br>
                        <span style="color: #047857; font-weight: bold;">Ans: ${q.a}</span>
                    </div>
                `,
                  )
                  .join('')}
            </div>
        </div>

        <div class="footer-tag">Panel 1: Foldable Pocket Revision Zine (A4 Trifold)</div>
    </div>

    <!-- PANEL 2: THE 3 EXAM STEM FORMULAS -->
    <div class="trifold-panel">
        <div>
            <div class="panel-header">
                <h2>The 3 Exam Formulas</h2>
                <p>How to expand on spec points with 2–3 facts</p>
            </div>

            <!-- Formula 1: Consequence -->
            <div class="challenge-box" style="border-color: #f59e0b; background: #fffbeb;">
                <div class="challenge-title" style="color: #b45309;">1. 4-Mark Consequence (P-F-C)</div>
                <div><strong>Point:</strong> One consequence of [X] was...</div>
                <div><strong>Facts:</strong> Specifically, [Fact 1 &amp; Fact 2]...</div>
                <div><strong>Link:</strong> This led directly to...</div>
                <div style="font-size: 7pt; color: #64748b; margin-top: 2px;">Model: King David Hotel → 91 killed → Attlee referred to UN in Feb 1947.</div>
            </div>

            <!-- Formula 2: Narrative -->
            <div class="challenge-box" style="border-color: #3b82f6; background: #eff6ff;">
                <div class="challenge-title" style="color: #1d4ed8;">2. 8-Mark Narrative (T-P-C)</div>
                <div><strong>Trigger:</strong> The crisis began when...</div>
                <div><strong>Pivot:</strong> A decisive turning point occurred when...</div>
                <div><strong>Outcome:</strong> Consequently, the result was...</div>
                <div style="font-size: 7pt; color: #64748b; margin-top: 2px;">Model: 15 May invasion → June truce &amp; Czech arms → Siege broken &amp; 79% secured.</div>
            </div>

            <!-- Formula 3: Importance -->
            <div class="challenge-box" style="border-color: #8b5cf6; background: #f5f3ff;">
                <div class="challenge-title" style="color: #6d28d9;">3. 8-Mark Importance (F-I-L)</div>
                <div><strong>Factor:</strong> [X] was important because...</div>
                <div><strong>Information:</strong> For example, [2–3 detailed facts]...</div>
                <div><strong>Link:</strong> Without this, [Y] would not have occurred.</div>
            </div>
        </div>

        <div class="footer-tag">Panel 2: Pearson Edexcel GCSE Option P5</div>
    </div>

    <!-- PANEL 3: TRAP DOORS & EXAM CHALLENGE -->
    <div class="trifold-panel">
        <div>
            <div class="panel-header">
                <h2>Trap Doors &amp; Challenge</h2>
                <p>Avoid common errors and test your recall</p>
            </div>

            <!-- Trap Door Alert -->
            <div style="border: 1.5px solid #ef4444; background: #fef2f2; border-radius: 4px; padding: 6px; font-size: 7.5pt; color: #991b1b; margin-bottom: 6px;">
                <strong>⚠️ EXAMINER TRAP:</strong><br>${meta.trapDoor}
            </div>

            <!-- Key Spec Dominoes -->
            <div style="font-size: 7.5pt; margin-bottom: 6px;">
                <strong>⏱️ 4 Crucial Milestones:</strong>
                ${meta.dominoEvents
                  .map(
                    (d) => `
                    <div style="display: flex; gap: 4px; margin-top: 2px;">
                        <span style="font-weight: 800; color: #1e3a8a;">${d.year}:</span>
                        <span>${d.text}</span>
                    </div>
                `,
                  )
                  .join('')}
            </div>

            <!-- 5-Minute Timed Challenge -->
            <div style="border: 1px dashed #475569; border-radius: 4px; padding: 6px; font-size: 7pt; background: #f8fafc;">
                <strong>✍️ 5-Minute Exam Sprint:</strong><br>
                On a lined sheet, write a 4-mark answer to: <em>"${meta.consequenceQ.q}"</em> using the P-F-C formula.<br>
                Self-mark: Did you include 2 specific facts? [ ] Yes [ ] No
            </div>
        </div>

        <div class="footer-tag">Panel 3: Mr Lovett's History Hub</div>
    </div>

</div>

</body>
</html>`;

      const trifoldPath = path.join(printablesDir, `cme_trifold_${ktKey}.html`);
      fs.writeFileSync(trifoldPath, trifoldHtml, 'utf8');

      console.log(`   ✅ Generated HTML printables:`);
      console.log(`      - Format 1 (A4 Workout): ${path.basename(workoutPath)}`);
      console.log(`      - Format 2 (A3 Placemat): ${path.basename(placematPath)}`);
      console.log(`      - Format 3 (Pocket Zine): ${path.basename(trifoldPath)}`);
    }

    // -------------------------------------------------------------
    // 4. Puppeteer PDF Compilation
    // -------------------------------------------------------------
    console.log('\n🖨️ Launching Puppeteer to export print-perfect PDFs...');
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--allow-file-access-from-files', '--disable-web-security'],
    });
    const page = await browser.newPage();

    for (const ktKey of Object.keys(KT_METADATA)) {
      // 1. Export A4 Workout PDF
      const workoutHtmlPath = path.join(printablesDir, `cme_workout_${ktKey}.html`);
      const workoutPdfPath = path.join(pdfsDir, `cme_workout_${ktKey}.pdf`);
      await page.goto(pathToFileURL(workoutHtmlPath).href, { waitUntil: 'networkidle0' });
      await page.pdf({
        path: workoutPdfPath,
        format: 'A4',
        landscape: false,
        printBackground: true,
        margin: { top: '10mm', bottom: '10mm', left: '12mm', right: '12mm' },
      });
      console.log(`   📕 Exported PDF: cme_workout_${ktKey}.pdf`);

      // 2. Export A3 Placemat PDF
      const placematHtmlPath = path.join(printablesDir, `cme_placemat_${ktKey}.html`);
      const placematPdfPath = path.join(pdfsDir, `cme_placemat_${ktKey}.pdf`);
      await page.goto(pathToFileURL(placematHtmlPath).href, { waitUntil: 'networkidle0' });
      await page.pdf({
        path: placematPdfPath,
        format: 'A3',
        landscape: true,
        printBackground: true,
        margin: { top: '8mm', bottom: '8mm', left: '8mm', right: '8mm' },
      });
      console.log(`   📕 Exported PDF: cme_placemat_${ktKey}.pdf`);

      // 3. Export A4 Trifold PDF
      const trifoldHtmlPath = path.join(printablesDir, `cme_trifold_${ktKey}.html`);
      const trifoldPdfPath = path.join(pdfsDir, `cme_trifold_${ktKey}.pdf`);
      await page.goto(pathToFileURL(trifoldHtmlPath).href, { waitUntil: 'networkidle0' });
      await page.pdf({
        path: trifoldPdfPath,
        format: 'A4',
        landscape: true,
        printBackground: true,
        margin: { top: '8mm', bottom: '8mm', left: '6mm', right: '6mm' },
      });
      console.log(`   📕 Exported PDF: cme_trifold_${ktKey}.pdf`);
    }

    await browser.close();
    console.log('\n🎉 Successfully compiled all 9 printable HTML pages and 9 PDF documents!');
  } catch (err) {
    console.error('❌ Error generating CME printables:', err);
    process.exit(1);
  }
})();
