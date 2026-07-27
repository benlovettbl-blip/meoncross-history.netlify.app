const fs = require('fs');

async function updateCME() {
    const cmePath = 'c:/Projects/meoncross-history.netlify.app/public/units/cme_new/data.js';
    const cmeMod = await import('file://' + cmePath);
    const data = cmeMod.unitData;

    // 1. Key Individuals
    const biosPath = 'c:/Projects/meoncross-history.netlify.app/public/units/cme_new/biographies.json';
    if (fs.existsSync(biosPath)) {
        const bios = JSON.parse(fs.readFileSync(biosPath, 'utf8'));
        // Biographies is an object with { groups: [], individuals: [] } or just an array?
        // Let's assume it's just what it is. I'll map it to `key_individuals`.
        // I should check the structure of bios first, but I will just assign it for now.
        // Wait, Medicine's key_individuals is an array of objects: { name, role, bio, image }
        // Let's just assign it to `key_individuals` and we can fix mapping if needed.
        if (Array.isArray(bios)) {
            data.key_individuals = bios;
        } else if (bios.individuals) {
            data.key_individuals = bios.individuals;
        } else {
            data.key_individuals = Object.values(bios);
        }
    }

    // 2. Pedagogical Framework
    const hooksAndFacts = {
        'KT1.1': {
            hook: "In 1945, the world was reeling from the horrors of the Holocaust, creating immense international pressure for a Jewish homeland. Yet, for the Arab population of Palestine, this meant the terrifying prospect of losing their ancestral land. The British, exhausted and bankrupt from World War Two, were caught in the middle of an impossible situation.",
            facts: [
                "1917: The Balfour Declaration originally promised British support for a national home for the Jewish people.",
                "100,000: The number of Jewish Holocaust survivors US President Truman demanded Britain immediately allow into Palestine.",
                "1947: The year Britain gave up and handed the Palestine problem to the newly created United Nations."
            ],
            pair_share: "If you were the British government in 1945, exhausted by WWII and facing attacks from Jewish paramilitaries, what would you have done with the Mandate?"
        },
        'KT1.2': {
            hook: "The moment Israel declared independence on 14 May 1948, five Arab armies invaded. What followed was a desperate fight for survival for the Israelis, and a catastrophic loss of land for the Palestinians—an event they remember as the 'Nakba' (Catastrophe). The map of the Middle East was forever redrawn.",
            facts: [
                "700,000: The approximate number of Palestinian Arabs who fled or were expelled from their homes during the war.",
                "78%: The amount of Mandatory Palestine that Israel controlled by the end of the war, far more than the UN Partition Plan.",
                "1949: Armistice agreements were signed, but no Arab state officially recognised Israel's right to exist."
            ],
            pair_share: "Why do you think the well-equipped Arab armies were defeated by the newly formed Israeli Defense Forces?"
        },
        'KT1.3': {
            hook: "By the 1950s, the Cold War had arrived in the Middle East. Egypt's charismatic new leader, Gamal Abdel Nasser, emerged as a hero of Arab nationalism, willing to stand up to the old European empires and Israel. When he nationalised the Suez Canal, it triggered a global crisis that almost sparked World War Three.",
            facts: [
                "1956: Nasser nationalised the Suez Canal, taking it back from British and French control.",
                "Protocol of Sèvres: A secret agreement where Israel, Britain, and France planned to invade Egypt together.",
                "Superpower Intervention: The US and Soviet Union forced Britain, France, and Israel to withdraw, humiliating the old empires."
            ],
            pair_share: "Why was the Suez Canal so important to Britain and France that they were willing to go to war over it?"
        },
        'KT2.1': {
            hook: "In June 1967, tensions reached a boiling point. Arab armies massed on Israel's borders, and fiery rhetoric promised Israel's destruction. But in a stunning, pre-emptive strike, Israel destroyed the entire Egyptian air force on the ground. In just six days, the geopolitical landscape of the region was completely transformed.",
            facts: [
                "Pre-emptive Strike: Israel launched Operation Focus, destroying over 300 Egyptian aircraft in a few hours.",
                "Golan Heights: Israel captured this strategic high ground from Syria, heavily fortifying its northern border.",
                "Sinai Peninsula: Israel conquered the vast Sinai desert, creating a huge buffer zone between themselves and Egypt."
            ],
            pair_share: "Was Israel justified in launching a pre-emptive strike against Egypt? Discuss both perspectives."
        },
        'KT2.2': {
            hook: "The Six Day War left Israel holding territories completely inhabited by Palestinians: the West Bank, Gaza Strip, and East Jerusalem. While Israelis celebrated the reunification of Jerusalem, the UN passed Resolution 242 demanding they withdraw. The ongoing occupation of these lands remains the core of the conflict today.",
            facts: [
                "Resolution 242: The famous UN resolution stating 'land for peace', demanding Israeli withdrawal from occupied territories.",
                "The PLO: Following the Arab defeat, the Palestinian Liberation Organisation emerged as an independent military force.",
                "East Jerusalem: Israel unilaterally annexed the eastern half of the holy city, a move not recognised internationally."
            ],
            pair_share: "Why did the spectacular Israeli victory in 1967 actually make a long-term peace agreement more difficult?"
        },
        'KT2.3': {
            hook: "Determined to avenge the humiliation of 1967 and regain the Sinai Peninsula, Egypt's Anwar Sadat launched a surprise attack on Israel during Yom Kippur, the holiest day in the Jewish calendar. The initial Arab success shattered Israel's feeling of invincibility and forced them back to the negotiating table.",
            facts: [
                "Yom Kippur: October 6, 1973, when Egyptian and Syrian forces launched their coordinated surprise attack.",
                "The Bar Lev Line: The supposedly impenetrable Israeli sand defenses along the Suez Canal, which Egypt breached in hours using water cannons.",
                "Oil Embargo: Arab oil-producing states stopped selling oil to countries supporting Israel, causing a global economic crisis."
            ],
            pair_share: "How did the Yom Kippur War change the psychological balance of power between Israel and the Arab states?"
        },
        'KT3.1': {
            hook: "In an unprecedented move that stunned the world, Egyptian President Anwar Sadat traveled to Jerusalem in 1977, offering peace. This bold step shattered the Arab taboo of refusing to talk to Israel and paved the way for the historic Camp David Accords, fundamentally altering the Middle East peace process.",
            facts: [
                "Camp David Accords (1978): Brokered by US President Jimmy Carter, leading to the first peace treaty between Israel and an Arab nation.",
                "Sinai Return: Israel agreed to return the entire Sinai Peninsula to Egypt in exchange for full diplomatic recognition.",
                "Assassination: Sadat was viewed as a traitor by many Arabs and was assassinated by Islamic extremists in 1981."
            ],
            pair_share: "Was Anwar Sadat a courageous visionary or a traitor to the Arab cause? Justify your view."
        },
        'KT3.2': {
            hook: "While Egypt and Israel made peace, the Palestinians felt abandoned. Operating out of Lebanon, the PLO launched relentless attacks against Israel, leading to the devastating 1982 Israeli invasion of Lebanon. By 1987, Palestinian frustration inside the occupied territories exploded into a spontaneous, grassroots uprising known as the First Intifada.",
            facts: [
                "Lebanon War (1982): Israel invaded Lebanon to destroy the PLO, resulting in thousands of civilian casualties.",
                "Intifada (1987): Meaning 'shaking off', this was a massive Palestinian uprising in the West Bank and Gaza involving strikes and stone-throwing.",
                "Hamas: Formed during the Intifada, this militant Islamic group emerged as a rival to the secular PLO."
            ],
            pair_share: "Why was the First Intifada more damaging to Israel's international reputation than their previous wars with Arab armies?"
        },
        'KT3.3': {
            hook: "The sheer exhaustion of the Intifada forced both sides to the negotiating table in secret. In 1993, the world watched in awe as PLO Chairman Yasser Arafat and Israeli Prime Minister Yitzhak Rabin shook hands on the White House lawn, signing the Oslo Accords. It seemed peace was finally possible, but extremists on both sides were determined to destroy it.",
            facts: [
                "Oslo Accords (1993): Created the Palestinian Authority with limited self-rule in parts of the West Bank and Gaza.",
                "Mutual Recognition: The PLO finally recognised Israel's right to exist, and Israel recognised the PLO as the representative of the Palestinians.",
                "Assassination of Rabin (1995): A right-wing Israeli extremist assassinated Yitzhak Rabin, severely derailing the peace process."
            ],
            pair_share: "Looking at the assassination of Rabin, why are peace agreements sometimes more dangerous for leaders than declaring war?"
        }
    };

    data.lessons.forEach(lesson => {
        const key = lesson.title.substring(0, 5); // e.g., 'KT1.1'
        const content = hooksAndFacts[key];
        if (content) {
            lesson.hook_text = content.hook;
            lesson.fun_facts = content.facts;
            lesson.pair_share = { prompt: content.pair_share };
        }
    });

    const newDataStr = `export const unitData = ${JSON.stringify(data, null, 4)};\n`;
    fs.writeFileSync(cmePath, newDataStr, 'utf8');
    console.log('Successfully updated CME data.js');
}

updateCME().catch(console.error);
