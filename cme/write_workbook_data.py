import json
import os

workbook_data = {}

# LESSON 1.1 (already created, let's reproduce it exactly)
workbook_data["subtopic_1_1"] = {
    "title": "British Withdrawal & Creation of Israel (1945–1948)",
    "activeReadingFocus": "Prior to answering tasks in your exercise book, review the text to locate (1) essential dates, (2) active paramilitary organizations, and (3) the strategic oil/diplomatic factors guiding British immigration parameters.",
    "narrative": [
        {
            "title": "1. Post-War Pressures & Zionist Demand (1945)",
            "paragraphs": [
                "Following the Allied victory in 1945, Britain faced a mounting crisis in Palestine. The Holocaust galvanized global support for <strong>Zionism</strong>—the movement advocating for a sovereign Jewish homeland. In the US, President Harry Truman pressured British PM Clement Attlee to immediately grant entry <strong>certificates</strong> for 100,000 Jewish refugees. Meanwhile, Palestinian Arabs, led by the Grand Mufti <strong>Haj Amin al-Husseini</strong>, vehemently opposed this, demanding immediate independence and warning of rebellion. Caught in the middle, British Foreign Secretary Ernest Bevin restricted immigration to a quota of <strong>1,500</strong> per month to protect relations with Arab oil-producing nations, fueling deep anger among Jewish communities."
            ]
        },
        {
            "title": "2. Zionist Insurgency & The Sergeants Affair (1946–1947)",
            "paragraphs": [
                "Furious at British restrictions, Jewish paramilitary organizations (Haganah, Irgun, and Lehi) launched a coordinated armed <strong>insurgency</strong>. On 22 July 1946, the Irgun bombed the British military administrative headquarters at the King David Hotel in Jerusalem, killing 91 people. The crisis escalated in July 1947 with the <strong>Sergeants Affair</strong>: the Irgun kidnapped and hanged two British sergeants (Clifford Martin and Mervyn Paice) in retaliation for British executions. This caused immense public outrage in Britain, sparked anti-Semitic riots, and destroyed domestic willingness to maintain the Mandate."
            ]
        },
        {
            "title": "3. The SS Exodus, UN Partition & Outbreak of War (1947–1948)",
            "paragraphs": [
                "In July 1947, British authorities intercepted the <strong>SS Exodus</strong> carrying 4,500 Holocaust survivors and returned them to Europe, causing global media outrage. Near bankruptcy and unable to maintain order, Britain referred Palestine's future to the United Nations. On 29 November 1947, the UN passed <strong>Resolution 181 (the Partition Plan)</strong>, proposing to divide Palestine into separate Jewish and Arab states, with Jerusalem under international control. Jewish leaders accepted the plan for <strong>sovereignty</strong>, but Arab leaders rejected it as unjust, since the Jewish state got 55% of the land despite Jews representing only 33% of the population. Palestinian Arabs felt their right to self-determination was completely ignored by western powers, triggering civil war. During this escalating civil war, Zionist paramilitaries (Irgun and Lehi) attacked the Arab village of <strong>Deir Yassin</strong> on 9 April 1948, killing over 100 residents, which spread widespread panic and accelerated the flight of Palestinian civilians.",
                "When the Mandate expired on 14 May 1948, David Ben-Gurion declared the State of Israel. British forces withdrew, and five neighboring Arab armies (Egypt, Transjordan, Syria, Lebanon, Iraq) invaded. Israel won due to <strong>Arab disunity</strong> (lack of coordinated command); <strong>military consolidation</strong> (paramilitaries merged into the IDF); and a crucial ceasefire that allowed Israel to negotiate a secret arms deal with <strong>Czechoslovakia</strong>, doubling active troops from 35,000 to 108,000. By 1949, Israel captured 50% more land than originally allocated, creating a refugee crisis for 700,000 Palestinians, known as the <strong>Nakba</strong>."
            ]
        }
    ],
    "vocabulary": [
        { "term": "Zionism", "definition": "Movement advocating for an independent Jewish homeland in Palestine." },
        { "term": "Certificates", "definition": "Official entry permits issued by mandate authorities." },
        { "term": "Insurgency", "definition": "Coordinated armed rebellion against a ruling state power." },
        { "term": "Mandate", "definition": "League of Nations authorization for Britain to govern the territory." },
        { "term": "King David Hotel", "definition": "British military administrative headquarters bombed in July 1946 (91 deaths)." },
        { "term": "Sergeants Affair", "definition": "Retaliatory hanging of two British sergeants by Irgun, breaking UK domestic resolve." },
        { "term": "SS Exodus", "definition": "Refugee ship turned away by Britain in 1947, provoking global outcry." },
        { "term": "Resolution 181", "definition": "The 1947 United Nations partition framework." },
        { "term": "Deir Yassin", "definition": "Palestinian village attacked by Zionist paramilitaries in April 1948, triggering widespread panic." },
        { "term": "Sovereignty", "definition": "Independent authority and supreme self-governing power." },
        { "term": "Bevin Quota", "definition": "The strict monthly limit of 1,500 Jewish immigrants to protect relations with Arab oil nations." },
        { "term": "Nakba", "definition": "'Catastrophe'; the displacement of 700,000 Palestinians." }
    ],
    "timeline": [
        { "date": "⚡ 1945: Pressures", "desc": "Holocaust survivors seek entry; US exerts diplomatic pressure; Bevin sets 1,500 quota." },
        { "date": "💥 1946-47: Insurgency", "desc": "King David Hotel bombed (91 deaths); Irgun hangs two British sergeants, breaking UK domestic resolve." },
        { "date": "⚖️ 1947: UN Referral", "desc": "SS Exodus turned away; Britain hands dilemma to UN; Resolution 181 partition plan passes." },
        { "date": "🏁 1948-49: Outbreak", "desc": "British forces withdraw; State of Israel declared; Arab armies invade; IDF victory results in Nakba." }
    ],
    "comprehensionCheck": [
        {
            "title": "1. Insurgency Case Study: Map out the causal chain of the Zionist rebellion.",
            "scaffold": "In your book, draw a flow chart showing: <em>Insurgent Action (e.g. King David Hotel, Sergeants Affair) &rarr; Casualty/Date details &rarr; Specific impact on British domestic public opinion.</em>"
        },
        {
            "title": "2. Partition Conflict: Contrast the Jewish and Arab reactions to UN Resolution 181.",
            "scaffold": "In two bulleted lists, record: (a) Why Jewish leaders accepted the plan (sovereignty), and (b) The specific land/population statistics (55% vs. 33%) that led Arab leaders to reject it as unjust."
        },
        {
            "title": "3. Civil War Catalysts: Note the role of psychological warfare and the Deir Yassin attack.",
            "scaffold": "Summarize how the civil war escalated between November 1947 and May 1948. Focus on the date (9 April 1948), the paramilitary groups involved, and the psychological impact of the attack on the flight of Palestinian civilians.",
            "stretch": "🏆 Stretch & Challenge: Explain how the US government's position conflicted with British strategic interests."
        },
        {
            "title": "4. War & Victory Analysis: Identify the three pillars of the Israeli military victory.",
            "scaffold": "List the five invading Arab nations. Underneath, explain the three factors (Arab disunity, IDF consolidation, Czech arms deal) that enabled the IDF to overcome them and expand their territory by 50%."
        }
    ],
    "causationMatrix": {
        "factBank": [
            "Post-war recovery debt",
            "Maintenance costs of 100,000 troops",
            "King David Hotel attack",
            "Imminent threat of widespread Arab rebellion",
            "Truman's certificate demands",
            "SS Exodus media scandal"
        ],
        "columns": [
            "Insurgency & Military Costs",
            "Economic & Financial Pressures",
            "International & Diplomatic Factors"
        ]
    },
    "sources": [
        {
            "id": "Source A",
            "title": "Bevin Cabinet Memo (Jan 1947)",
            "text": "\"We are bearing the entire military and financial burden of keeping the peace in Palestine, while being subjected to constant abuse... Our forces are targeted daily, and the cost of maintaining 100,000 troops is crippling our post-war economic recovery... We must refer this matter to the UN.\""
        },
        {
            "id": "Source B",
            "title": "Irgun Communiqué (July 1946)",
            "text": "\"We targeted the British military headquarters to make it clear that the occupier cannot reside in peace. The King David Hotel was warned, but the authorities refused to evacuate, leading to this tragic, necessary cost of liberation.\""
        },
        {
            "id": "Source C",
            "title": "Ben-Gurion's Diary (July 1948)",
            "text": "\"The ceasefire was a godsend. It gave us the precious weeks we needed to coordinate our defense under a single flag, consolidate our forces into the IDF, and bring in the modern equipment from Czechoslovakia needed to secure our borders.\""
        },
        {
            "id": "Source D",
            "title": "Arab Higher Committee Statement (1947)",
            "text": "\"Palestine is an Arab country. The United Nations has no right to partition our land against the will of its majority, giving 55% of the territory to a minority that represents only 33% of the population.\""
        }
    ],
    "sourceTasks": [
        {
            "title": "Question A (Cross-Reference)",
            "scaffold": "How does the Jewish insurgent view in Source B support or challenge Ernest Bevin's concerns about British forces in Source A?"
        },
        {
            "title": "Question B (Synthesis)",
            "scaffold": "Compare the conflicting reactions to partition and war in Source C and Source D. How does this explain the escalation of civil conflict in 1948?"
        }
    ],
    "examPractice": {
        "questions": [
            {
                "title": "Question 1 (Consequence - 4 Marks)",
                "text": "Explain one consequence of the Zionist insurgency for British mandate control."
            },
            {
                "title": "Question 2 (Narrative - 8 Marks)",
                "text": "Write a narrative account of the events of 1947–48 leading to the outbreak of the first Arab-Israeli War.",
                "stimulus": ["The SS Exodus (1947)", "UN Resolution 181"]
            }
        ],
        "wordBank": [
            "Truman", "Attlee", "Bevin", "1,500 quota", "Insurgency", "Irgun", "King David Hotel", "91 deaths", "Sergeants Affair", "Clifford Martin", "Mervyn Paice", "SS Exodus", "UN Resolution 181", "55% land", "33% population", "14 May 1948", "Ben-Gurion", "5 Arab armies", "Arab disunity", "IDF", "Czechoslovakia arms", "35k to 108k troops", "Nakba", "700k refugees"
        ],
        "synthesisModel": "\"Although [long-term factor] made the Mandate structurally unsustainable, it was the escalating catalyst of [short-term factor] that ultimately precipitated...\""
    },
    "peerQuiz": [
        { "q": "What term describes the movement for a sovereign Jewish homeland?" },
        { "q": "What strict monthly immigration quota did Ernest Bevin set in 1945?" },
        { "q": "Which group bombed the King David Hotel, and how many died?" },
        { "q": "What July 1947 execution affair completely broke British domestic resolve?" },
        { "q": "Which ship carrying 4,500 survivors was turned back in July 1947?" },
        { "q": "What resolution number was the 1947 United Nations Partition Plan?" },
        { "q": "On what exact date did David Ben-Gurion declare the State of Israel?" },
        { "q": "With which country did Israel make a secret arms deal during ceasefire?" },
        { "q": "Which US President pressured Britain to allow 100,000 refugees?" },
        { "q": "Who led the Palestinian Arab opposition as the Grand Mufti of Jerusalem?" },
        { "q": "Which Arab village was attacked by Zionist paramilitaries in April 1948, triggering panic?" },
        { "q": "What is the Arabic term ('Catastrophe') for the 1948 Palestinian displacement?" }
    ],
    "mindMap": {
        "centralNode": "British Withdrawal & War",
        "branches": [
            { "title": "Branch 1: Post-War Mandate Pressures", "keywords": ["Bevin quota", "1,500/month", "Truman pressure", "Arab oil security", "Haj Amin al-Husseini"] },
            { "title": "Branch 2: Paramilitary Insurgency", "keywords": ["Irgun strategy", "King David Hotel", "91 fatalities", "Sergeants Affair", "Loss of domestic resolve"] },
            { "title": "Branch 3: Partition & Operational Triggers", "keywords": ["SS Exodus", "UN Resolution 181", "55% allocation", "IDF consolidation", "Czechoslovakia arms", "Nakba"] }
        ]
    },
    "cloze": {
        "wordBank": [
            "Clement Attlee", "Ernest Bevin", "100,000", "1,500", "King David Hotel", "91", "sergeants", "SS Exodus", "United Nations", "Resolution 181", "55%", "33%", "14 May 1948", "Arab disunity", "Czechoslovakia", "35,000", "108,000", "Nakba"
        ],
        "sections": [
            {
                "title": "1. Post-War Tensions (1945)",
                "text": "Following WWII, Britain struggled to govern Palestine. Jewish refugees sought entry, and US President Harry Truman pressured Prime Minister [[Clement Attlee]] to admit [[100,000]] Holocaust survivors. British Foreign Secretary [[Ernest Bevin]] resisted, fearing Arab rebellion and wishing to protect oil interests. He set a strict quota of just [[1,500]] immigrants per month, causing outrage."
            },
            {
                "title": "2. Zionist Insurgency (1946-47)",
                "text": "Furious at the limits, paramilitaries launched attacks. On 22 July 1946, the Irgun bombed the British military headquarters at the [[King David Hotel]], killing [[91]] people. In July 1947, the Irgun hanged two British [[sergeants]] in retaliation for British executions of Irgun members, destroying British domestic support for the Mandate."
            },
            {
                "title": "3. UN Referral & Partition (1947)",
                "text": "In July 1947, Britain turned away the [[SS Exodus]] carrying Holocaust survivors. Facing international outcry, Britain referred Palestine to the [[United Nations]]. The UN passed [[Resolution 181]], proposing partition. The Jewish state got [[55%]] of the land despite Jews representing [[33%]] of the population. Arab leaders rejected it. On [[14 May 1948]], David Ben-Gurion declared Israel's independence."
            },
            {
                "title": "4. Outbreak of War (1948-49)",
                "text": "The next day, British forces withdrew and five Arab armies invaded. Israel won due to [[Arab disunity]], the consolidation of paramilitaries into the IDF, and a secret arms deal with [[Czechoslovakia]] which allowed them to double troop numbers from [[35,000]] to [[108,000]]. Israel captured 50% more land, creating a refugee crisis for 700,000 Palestinians, known as the [[Nakba]] (Catastrophe)."
            }
        ]
    },
    "cornell": {
        "cues": [
            {
                "title": "1. Conflicting Demands & Quotas (1945)",
                "subCues": ["- What did Jews demand?", "- What did Arabs demand?", "- Why did Bevin limit migration to 1,500/mo?"],
                "modelNotes": "Jews demanded a sovereign homeland (Zionism) and immediate entry for Holocaust survivors (Truman asked for 100k certificates). Arabs demanded independence and an end to Jewish immigration, warning of revolt. Bevin restricted immigration to 1,500/month to secure relations with oil-producing Arab states."
            },
            {
                "title": "2. Zionist Insurgency (1946-47)",
                "subCues": ["- King David Hotel bombing (91 deaths)", "- Kidnapping of Clifford Martin & Mervyn Paice (Sergeants Affair)"],
                "modelNotes": "Paramilitary groups (Haganah, Irgun, Lehi) launched insurgency. On 22 July 1946, the Irgun bombed the King David Hotel, killing 91. In July 1947, the Sergeants Affair (hanging of two British sergeants) caused UK anti-Semitic riots and destroyed public willingness to keep soldiers in Palestine."
            },
            {
                "title": "3. UN Referral & Resolution 181 (1947)",
                "subCues": ["- SS Exodus incident", "- UN land split (55% to 33% population)", "- Conflicting Jewish/Arab reactions"],
                "modelNotes": "The SS Exodus refugee ship turned back by Britain caused global outrage. Britain referred Palestine to the UN. UN Resolution 181 proposed partition (Jewish state got 55% land despite 33% population). Jewish leaders accepted sovereignty, but Arab leaders rejected it as unjust, leading to civil war."
            },
            {
                "title": "4. 1948 Arab-Israeli War",
                "subCues": ["- IDF formation (Ben-Gurion)", "- Arab disunity factors", "- Czechoslovakia arms deal", "- Palestinian refugee crisis (Nakba)"],
                "modelNotes": "Israel declared on 14 May 1948; Arab armies invaded. Israel won due to Arab disunity (lack of unified commander), IDF consolidation, and Czech arms deal that doubled troops (35k to 108k). Resulted in 50% more land captured by Israel, and the Nakba (displacement of 700,000 Palestinians)."
            }
        ],
        "synthesis": {
            "prompt": "Synthesize the main long-term and short-term factors that forced Britain to withdraw from Palestine in 1948.",
            "modelAnswer": "Although long-term post-war economic strain made maintaining 100,000 troops structurally unsustainable, it was the immediate catalyst of the Zionist insurgency (such as the King David Hotel bombing and the Sergeants Affair) and the international embarrassment of the SS Exodus and UN partition rejection that ultimately precipitated the British decision to surrender the Mandate."
        }
    },
    "organizer": {
        "boxes": [
            { "title": "1. Post-War Pressures (1945)", "modelNotes": "Holocaust survivors demand entry; US pressures Britain for 100k entry certificates. Bevin resists to protect relations with Arab oil nations and sets a quota of 1,500/month, fueling Jewish anger." },
            { "title": "2. Insurgency & Backlash", "modelNotes": "Paramilitaries launch insurgency. Irgun bombs King David Hotel in July 1946 (91 dead). In July 1947, the Sergeants Affair destroys domestic British support for keeping troops in Palestine." },
            { "title": "3. UN Partition Referral", "modelNotes": "SS Exodus turned away, causing global outrage. Britain refers mandate to the UN. UN Res 181 proposes partition (Jewish 55% land, Arab 45%). Arabs reject it, triggering civil war." },
            { "title": "4. 1948 War & Nakba", "modelNotes": "Israel declared on 14 May 1948. Five Arab armies invade. Israel wins due to Arab disunity, IDF consolidation, and Czech arms deal. 50% more land captured; Nakba displaces 700k." }
        ],
        "vocabMatch": [
            { "term": "1. Zionism", "match": "B", "definition": "Movement advocating for a sovereign Jewish homeland in Palestine." },
            { "term": "2. Ernest Bevin", "match": "A", "definition": "British Foreign Secretary who restricted Jewish quota to 1,500/month." },
            { "term": "3. King David Hotel", "match": "C", "definition": "British administrative headquarters bombed in 1946 by the Irgun, killing 91 people." },
            { "term": "4. SS Exodus", "match": "D", "definition": "Jewish refugee ship intercepted and forcibly turned away by Britain in 1947." },
            { "term": "5. Resolution 181", "match": "E", "definition": "The 1947 UN Partition Plan proposing separate Jewish and Arab states." },
            { "term": "6. Czechoslovakia", "match": "F", "definition": "Supplied weapons to Israel, helping IDF double effective troops from 35k to 108k." },
            { "term": "7. Nakba", "match": "G", "definition": "Arab word for 'Catastrophe', referring to the displacement of 700,000 Palestinian Arabs." }
        ]
    }
}

# Now we will define Lesson 1.2 to 3.3 in helper structures and add them dynamically to workbook_data.
print("Drafting workbook data for remaining lessons...")
