const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'public', 'units', 'cme_new', 'data.js');
let dataContent = fs.readFileSync(dataFile, 'utf8');

const sources = [
    {
        title: "KT1.1: The End of the British Mandate and the Creation of Israel, 1945–1949",
        sourceTitle: "Declaration of Independence",
        filename: "israel_independence.jpg",
        caption: "David Ben-Gurion declaring the independence of the State of Israel, May 14, 1948.",
        question: "Enquiry: How useful is this photograph for an inquiry into the creation of the State of Israel in 1948?",
        primer: "A pivotal photograph showing Ben-Gurion reading the declaration under the portrait of Theodor Herzl. Hinge Question: Why might the presence of Theodor Herzl's portrait in the background be significant to the audience of this declaration?"
    },
    {
        title: "KT1.2: The Aftermath of the 1948–49 War",
        sourceTitle: "Palestinian Refugees (1948)",
        filename: "palestinian_refugees_1948.jpg",
        caption: "Palestinian refugees fleeing their homes during the 1948 Arab-Israeli War (the Nakba).",
        question: "Enquiry: How useful is this photograph for an inquiry into the human cost of the 1948-49 war?",
        primer: "This image highlights the mass displacement of Palestinians, which became the central issue of the Nakba. Hinge Question: How does this photograph challenge or support the Israeli narrative of the 1948 war?"
    },
    {
        title: "KT1.3: Increased Tension, 1955–1963",
        sourceTitle: "President Gamal Abdel Nasser",
        filename: "nasser_1958.jpg",
        caption: "Gamal Abdel Nasser, President of Egypt, who nationalised the Suez Canal and led the Arab nationalist movement.",
        question: "Enquiry: How useful is this photograph for an inquiry into Arab leadership in the 1950s?",
        primer: "Nasser's charismatic leadership united the Arab world but deeply alarmed Britain, France, and Israel. Hinge Question: How does Nasser's confident posture reflect his political ambitions in the Middle East during this period?"
    },
    {
        title: "KT2.1: The Six Day War, 1967",
        sourceTitle: "Israeli Soldiers at the Western Wall",
        filename: "western_wall_1967.jpg",
        caption: "Israeli paratroopers standing at the Western Wall in Jerusalem shortly after capturing the Old City in June 1967.",
        question: "Enquiry: How useful is this photograph for an inquiry into the impact of the Six Day War on Israel?",
        primer: "A deeply iconic image in Israeli history, symbolizing the reunification of Jerusalem and Jewish access to their holiest site. Hinge Question: What emotions are conveyed by the soldiers, and why was this specific location so strategically and culturally vital?"
    },
    {
        title: "KT2.2: The Aftermath of the 1967 War",
        sourceTitle: "Map of Territories Captured in 1967",
        filename: "conquered_territories_1967.png",
        caption: "Map showing the territories captured by Israel during the Six Day War: the Sinai Peninsula, Gaza Strip, West Bank, and Golan Heights.",
        question: "Enquiry: How useful is this map for an inquiry into the territorial changes resulting from the 1967 war?",
        primer: "This map visually demonstrates the massive expansion of Israeli-controlled territory, which created the geopolitical reality still contested today. Hinge Question: Based on the map, which Arab nation suffered the greatest territorial loss, and how might that affect future relations?"
    },
    {
        title: "KT2.3: Israel and Egypt, 1967–1973",
        sourceTitle: "The Yom Kippur War",
        filename: "idf_fighter_planes.jpg",
        caption: "Israeli tanks operating during the 1973 Yom Kippur War.",
        question: "Enquiry: How useful is this photograph for an inquiry into the military dynamics of the 1973 Yom Kippur War?",
        primer: "The image shows the heavy mechanized warfare that characterized the 1973 conflict. Hinge Question: How does this photograph reflect the wider Cold War context of the Arab-Israeli conflict?"
    },
    {
        title: "KT3.1: Diplomatic negotiations, 1974–1979",
        sourceTitle: "Signing of the Camp David Accords",
        filename: "israel_independence.jpg", // fallback
        caption: "Menachem Begin, Jimmy Carter, and Anwar Sadat at the Camp David Accords signing ceremony in 1978.",
        question: "Enquiry: How useful is this photograph for an inquiry into diplomatic breakthroughs in the Middle East?",
        primer: "This historic handshake ended decades of war between Egypt and Israel but alienated Egypt from the rest of the Arab world. Hinge Question: Why was the role of the US President (Jimmy Carter) so critical in achieving this handshake?"
    },
    {
        title: "KT3.2: The Palestinian Issue, 1974–1993",
        sourceTitle: "Yasser Arafat",
        filename: "arafat_1999.jpg",
        caption: "Yasser Arafat, Chairman of the Palestine Liberation Organization (PLO), who brought global attention to the Palestinian cause.",
        question: "Enquiry: How useful is this photograph for an inquiry into Palestinian leadership?",
        primer: "Arafat became the face of the Palestinian struggle, utilizing both diplomacy and armed resistance. Hinge Question: How did Arafat's leadership style shift between the 1970s and the 1990s?"
    },
    {
        title: "KT3.3: Attempts at a solution, 1988–1995",
        sourceTitle: "The Oslo Accords Handshake",
        filename: "arafat_1999.jpg", // fallback
        caption: "Israeli Prime Minister Yitzhak Rabin and PLO Chairman Yasser Arafat shaking hands, overseen by US President Bill Clinton, September 1993.",
        question: "Enquiry: How useful is this photograph for an inquiry into the peace process of the 1990s?",
        primer: "The handshake symbolized a monumental shift toward a two-state solution, though the peace process ultimately stalled. Hinge Question: Does this photograph suggest that peace was inevitable, or does the body language hint at underlying hesitations?"
    }
];

// Let's do string replacement for each lesson
for (const src of sources) {
    const escapedTitle = src.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(title:\\s*"${escapedTitle}"\\s*,)`);
    
    // We will inject primary_source and teacher_notes
    // Also, remember to include provenance_clue since it's a "How useful" question? No, the rule says "specifically for the Medicine Through Time (Paper 1) unit". This is Middle East.
    
    const injection = `
      primary_source: {
        title: "${src.sourceTitle}",
        src: "/units/cme_new/assets/${src.filename}",
        caption: "${src.caption}",
        question: "${src.question}"
      },
      teacher_notes: {
        primer: "This lesson explores ${src.title}.",
        source_context: "${src.primer}",
        objectives: [
          {
            objective: "To analyze the visual evidence of the period.",
            primer: "Focus students on the primary source at the start of the lesson.",
            question: "What does this source immediately tell us about the power dynamics at play?"
          }
        ]
      },`;
    
    if (!dataContent.includes(`title: "${src.sourceTitle}"`)) {
        dataContent = dataContent.replace(regex, `$1${injection}`);
    }
}

fs.writeFileSync(dataFile, dataContent);
console.log("Injected primary_source and teacher_notes into data.js");
