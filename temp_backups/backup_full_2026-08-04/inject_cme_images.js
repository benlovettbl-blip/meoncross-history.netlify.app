const fs = require('fs');
const path = require('path');
const https = require('https');

const dataPath = path.join(__dirname, 'public', 'units', 'cme_new', 'data.js');
let dataCode = fs.readFileSync(dataPath, 'utf8');

// I will parse the JSON from dataCode
let unitData;
try {
    const jsonStr = dataCode.replace('export const unitData = ', '').replace(/;\s*$/, '');
    unitData = JSON.parse(jsonStr);
} catch (e) {
    console.error("Failed to parse data.js", e);
    process.exit(1);
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'curl/7.68.0' } }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
            return downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
            console.error("Failed to download", url, "Status:", res.statusCode);
            resolve(false);
            return;
        }
        const fileStream = fs.createWriteStream(filepath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
            fileStream.close();
            resolve(true);
        });
    }).on('error', (err) => {
        console.error("Error downloading", url, err);
        resolve(false);
    });
  });
};

const ktSources = {
  "KT1.1: The End of the British Mandate and the Creation of Israel, 1945–1949": [
    {
      title: "UN Partition Plan for Palestine (1947)",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/UN_Palestine_Partition_Versions_1947.jpg/500px-UN_Palestine_Partition_Versions_1947.jpg",
      filename: "cme_un_partition_plan.jpg",
      caption: "The proposed UN Partition Plan dividing Palestine into independent Arab and Jewish states, which was rejected by Arab leadership.",
      teacher_notes: {
        primer: "Demonstrate the geographical challenges and fragmented nature of the proposed borders.",
        objectives: [
          {
            objective: "Analyze the UN Partition Plan",
            primer: "Highlight the international zone of Jerusalem and the intersecting borders.",
            question: "How useful is this map for understanding why Arab leaders rejected the UN Partition Plan?"
          }
        ]
      }
    },
    {
      title: "The SS Exodus (1947)",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/EXODUS.jpeg/500px-EXODUS.jpeg",
      filename: "cme_ss_exodus.jpg",
      caption: "Jewish Holocaust survivors aboard the SS Exodus, turned away from Palestine by the British, sparking global outrage.",
      teacher_notes: {
        primer: "Use this image to explore the impact of the Holocaust on international sympathy for Zionism.",
        objectives: [
          {
            objective: "Understand the plight of Jewish refugees",
            primer: "Discuss the political pressure this placed on the British Mandate.",
            question: "How useful is this photograph for understanding the failure of British policy in Palestine after WW2?"
          }
        ]
      }
    },
    {
      title: "David Ben-Gurion declaring Independence (1948)",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/David_Ben-Gurion_%28D597-087%29.jpg/500px-David_Ben-Gurion_%28D597-087%29.jpg",
      filename: "cme_ben_gurion.jpg",
      caption: "David Ben-Gurion declaring the establishment of the State of Israel on May 14, 1948.",
      teacher_notes: {
        primer: "Discuss the immediate political and military consequences of this declaration.",
        objectives: [
          {
            objective: "Identify the foundation of Israel",
            primer: "Note the portraits of Theodor Herzl in the background to connect to early Zionism.",
            question: "How useful is this source for understanding the Zionist fulfillment of a Jewish state?"
          }
        ]
      }
    }
  ],
  "KT1.2: The Aftermath of the 1948–49 War": [
    {
      title: "The 1948 Arab–Israeli War",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Tel_Aviv-Yafo_%28997008136796005171%29.jpg/500px-Tel_Aviv-Yafo_%28997008136796005171%29.jpg",
      filename: "cme_1948_war.jpg",
      caption: "Forces engaged in combat during the 1948 Arab-Israeli War, which Israel calls the War of Independence.",
      teacher_notes: {
        primer: "Highlight the desperate nature of the fighting and the surprising survival of the new state.",
        objectives: [
          {
            objective: "Analyze the 1948 War",
            primer: "Explain how Israel secured its existence against multiple invading Arab armies.",
            question: "How useful is this image for understanding the nature of combat in the 1948 War?"
          }
        ]
      }
    },
    {
      title: "Palestinian Refugees (The Nakba)",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Palestinian_refugees_leaving_Gaza_Gettyimages-1354487454.webp/500px-Palestinian_refugees_leaving_Gaza_Gettyimages-1354487454.webp.png",
      filename: "cme_palestinian_refugees.jpg",
      caption: "Palestinian refugees fleeing their homes during the 1948 war, an event known in Arabic as the Nakba (Catastrophe).",
      teacher_notes: {
        primer: "Focus on the human cost and the origin of the ongoing refugee crisis.",
        objectives: [
          {
            objective: "Understand the Nakba",
            primer: "Discuss the reasons for flight (fear, expulsion) and the long-term consequences.",
            question: "How useful is this photograph for understanding the human impact of the 1948 War on Palestinians?"
          }
        ]
      }
    },
    {
      title: "UNRWA Refugee Camps",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/United_Nations_Relief_and_Works_Agency_for_Palestine_Refugees_in_the_Near_East_Logo.svg/500px-United_Nations_Relief_and_Works_Agency_for_Palestine_Refugees_in_the_Near_East_Logo.svg.png",
      filename: "cme_unrwa_logo.png",
      caption: "The emblem of UNRWA, the UN agency established in 1949 to support displaced Palestinian refugees.",
      teacher_notes: {
        primer: "Explain the creation of permanent refugee camps in Gaza, the West Bank, and neighboring countries.",
        objectives: [
          {
            objective: "Identify international responses",
            primer: "Discuss how the refugee issue became a permanent feature of the conflict.",
            question: "How useful is this source for understanding international attempts to manage the Palestinian refugee crisis?"
          }
        ]
      }
    }
  ],
  "KT1.3: Increased Tension, 1955–1963": [
    {
      title: "Gamal Abdel Nasser",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Stevan_Kragujevic%2C_Gamal_Abdel_Naser_u_Beogradu%2C_1962.jpg/500px-Stevan_Kragujevic%2C_Gamal_Abdel_Naser_u_Beogradu%2C_1962.jpg",
      filename: "cme_nasser.jpg",
      caption: "Egyptian President Gamal Abdel Nasser, whose Pan-Arab nationalism deeply challenged Western and Israeli interests.",
      teacher_notes: {
        primer: "Focus on his charisma and his role in unifying the Arab world against Israel.",
        objectives: [
          {
            objective: "Analyze Nasser's leadership",
            primer: "Discuss his nationalization of the Suez Canal and arms deals with the USSR.",
            question: "How useful is this photograph for understanding Nasser's popularity in the Arab world?"
          }
        ]
      }
    },
    {
      title: "The Suez Crisis (1956)",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Port_Said_from_air.jpg/500px-Port_Said_from_air.jpg",
      filename: "cme_suez_crisis.jpg",
      caption: "Port Said during the Suez Crisis, when Britain, France, and Israel launched a coordinated attack on Egypt.",
      teacher_notes: {
        primer: "Highlight the military intervention and subsequent political humiliation of Britain and France.",
        objectives: [
          {
            objective: "Understand the Suez Crisis",
            primer: "Explain the secret Sèvres Protocol and the US/Soviet intervention that forced withdrawal.",
            question: "How useful is this image for understanding the military scale of the 1956 Suez Crisis?"
          }
        ]
      }
    },
    {
      title: "Anthony Eden",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Georges_Bidault%2C_Anthony_Eden_and_John_Foster_Dulles_%28cropped%29.jpg/500px-Georges_Bidault%2C_Anthony_Eden_and_John_Foster_Dulles_%28cropped%29.jpg",
      filename: "cme_anthony_eden.jpg",
      caption: "British Prime Minister Anthony Eden, whose career was ruined by the failure of the Suez intervention.",
      teacher_notes: {
        primer: "Discuss the decline of British imperial power in the Middle East.",
        objectives: [
          {
            objective: "Analyze British motives",
            primer: "Explain Eden's comparison of Nasser to Mussolini and his desperation to keep the canal.",
            question: "How useful is this source for understanding the British political miscalculations in 1956?"
          }
        ]
      }
    }
  ],
  "KT2.1: The Six Day War, 1967": [
    {
      title: "The Six-Day War Map",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/6DayWarEnglish.png/500px-6DayWarEnglish.png",
      filename: "cme_six_day_war_map.png",
      caption: "Map detailing the massive territorial gains made by Israel during the Six-Day War.",
      teacher_notes: {
        primer: "Focus on the capture of the Sinai, Gaza, West Bank, and Golan Heights.",
        objectives: [
          {
            objective: "Analyze territorial changes",
            primer: "Discuss how Israel tripled its size and gained defensible borders, but also occupied a million Palestinians.",
            question: "How useful is this map for understanding the strategic outcome of the Six-Day War?"
          }
        ]
      }
    },
    {
      title: "Israeli Paratroopers at the Western Wall",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/David_Rubinger_Paratroopers_at_the_Western_Wall.jpg/500px-David_Rubinger_Paratroopers_at_the_Western_Wall.jpg",
      filename: "cme_western_wall.jpg",
      caption: "Israeli paratroopers standing in awe at the Western Wall after capturing the Old City of Jerusalem.",
      teacher_notes: {
        primer: "Discuss the immense religious and emotional significance of this victory for Israelis.",
        objectives: [
          {
            objective: "Understand the cultural impact of 1967",
            primer: "Explain the reunification of Jerusalem under Israeli control.",
            question: "How useful is this photograph for understanding the emotional significance of the 1967 war for Israelis?"
          }
        ]
      }
    },
    {
      title: "Operation Focus",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Fighter_planes_in_the_Six-Day_War.jpg/500px-Fighter_planes_in_the_Six-Day_War.jpg",
      filename: "cme_operation_focus.jpg",
      caption: "Israeli aircraft dominating the skies after destroying the Egyptian Air Force on the ground.",
      teacher_notes: {
        primer: "Explain the preemptive strike that essentially won the war in its first few hours.",
        objectives: [
          {
            objective: "Analyze Israeli military strategy",
            primer: "Discuss the element of surprise and air superiority.",
            question: "How useful is this image for understanding why Israel won the Six-Day War so quickly?"
          }
        ]
      }
    }
  ],
  "KT2.2: The Aftermath of the 1967 War": [
    {
      title: "The Khartoum Resolution",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Khartoum_Resolution.jpg/500px-Khartoum_Resolution.jpg",
      filename: "cme_khartoum.jpg",
      caption: "Arab leaders meeting in Khartoum in 1967, where they issued the famous 'Three No's': No peace, no recognition, no negotiation with Israel.",
      teacher_notes: {
        primer: "Discuss Arab defiance despite total military defeat.",
        objectives: [
          {
            objective: "Analyze Arab responses to 1967",
            primer: "Explain how this resolution entrenched the conflict for the next decade.",
            question: "How useful is this source for understanding the Arab refusal to surrender after the 1967 war?"
          }
        ]
      }
    },
    {
      title: "UN Resolution 242",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/UN_Security_Council_meeting_on_the_Middle_East.jpg/500px-UN_Security_Council_meeting_on_the_Middle_East.jpg",
      filename: "cme_un_242.jpg",
      caption: "The UN Security Council passing Resolution 242, establishing the 'Land for Peace' formula.",
      teacher_notes: {
        primer: "Highlight the deliberate ambiguity of the resolution's wording (withdrawal from 'territories' vs 'the territories').",
        objectives: [
          {
            objective: "Understand 'Land for Peace'",
            primer: "Discuss how this resolution became the basis for all future peace negotiations.",
            question: "How useful is this image for understanding international attempts to mediate peace after 1967?"
          }
        ]
      }
    },
    {
      title: "Yasser Arafat and the PLO",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Yasser_Arafat_at_the_United_Nations.jpg/500px-Yasser_Arafat_at_the_United_Nations.jpg",
      filename: "cme_arafat_un.jpg",
      caption: "Yasser Arafat, leader of the PLO, addressing the UN General Assembly with an olive branch and a gun.",
      teacher_notes: {
        primer: "Discuss the PLO's shift towards seeking international legitimacy alongside armed struggle.",
        objectives: [
          {
            objective: "Analyze the rise of the PLO",
            primer: "Explain Arafat's dual strategy of diplomacy and terrorism.",
            question: "How useful is this photograph for understanding Yasser Arafat's leadership of the Palestinian cause?"
          }
        ]
      }
    }
  ],
  "KT2.3: Israel and Egypt, 1967–1973": [
    {
      title: "The Yom Kippur War (1973)",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Egyptian_forces_crossing_the_Suez_Canal.jpg/500px-Egyptian_forces_crossing_the_Suez_Canal.jpg",
      filename: "cme_yom_kippur.jpg",
      caption: "Egyptian forces successfully crossing the Suez Canal during the surprise attack on Yom Kippur in 1973.",
      teacher_notes: {
        primer: "Focus on the initial shock and the shattering of the myth of Israeli invincibility.",
        objectives: [
          {
            objective: "Understand the element of surprise",
            primer: "Discuss the intelligence failures in Israel and Sadat's strategic goals.",
            question: "How useful is this source for understanding the early Arab successes in the 1973 War?"
          }
        ]
      }
    },
    {
      title: "Israeli Counter-Offensive",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Israeli_tanks_in_the_Sinai_desert.jpg/500px-Israeli_tanks_in_the_Sinai_desert.jpg",
      filename: "cme_israeli_tanks.jpg",
      caption: "Israeli tanks pushing back across the Sinai desert towards Egypt in the later stages of the Yom Kippur War.",
      teacher_notes: {
        primer: "Explain how Israel recovered and eventually surrounded the Egyptian Third Army.",
        objectives: [
          {
            objective: "Analyze the military turnaround",
            primer: "Discuss the immense material losses and the need for US intervention via the airlift.",
            question: "How useful is this photograph for understanding the intensity of armored warfare in the Sinai?"
          }
        ]
      }
    },
    {
      title: "Golda Meir",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Golda_Meir_with_Richard_Nixon.jpg/500px-Golda_Meir_with_Richard_Nixon.jpg",
      filename: "cme_golda_meir.jpg",
      caption: "Israeli Prime Minister Golda Meir, whose government faced severe criticism for lack of preparedness in 1973.",
      teacher_notes: {
        primer: "Focus on the Agranat Commission and the subsequent political fallout in Israel.",
        objectives: [
          {
            objective: "Assess the political impact of 1973 on Israel",
            primer: "Discuss Meir's resignation despite technically winning the war.",
            question: "How useful is this photograph for understanding the US-Israeli relationship during the 1973 crisis?"
          }
        ]
      }
    }
  ],
  "KT3.1: Diplomatic negotiations, 1974–1979": [
    {
      title: "Sadat visits Jerusalem",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Anwar_Sadat_in_Jerusalem.jpg/500px-Anwar_Sadat_in_Jerusalem.jpg",
      filename: "cme_sadat_jerusalem.jpg",
      caption: "Egyptian President Anwar Sadat making his historic and unprecedented visit to Israel in 1977.",
      teacher_notes: {
        primer: "Emphasize the shock value and the breaking of the psychological barrier to peace.",
        objectives: [
          {
            objective: "Understand Sadat's diplomatic shift",
            primer: "Explain his motives: regaining the Sinai and aligning with the US.",
            question: "How useful is this image for understanding the dramatic shift in Egyptian-Israeli relations in 1977?"
          }
        ]
      }
    },
    {
      title: "The Camp David Accords (1978)",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Camp_David_Accords.jpg/500px-Camp_David_Accords.jpg",
      filename: "cme_camp_david.jpg",
      caption: "Begin, Carter, and Sadat shaking hands after successfully negotiating the Camp David Accords.",
      teacher_notes: {
        primer: "Highlight Jimmy Carter's relentless mediation over 13 days in isolation.",
        objectives: [
          {
            objective: "Analyze the Camp David framework",
            primer: "Discuss the two frameworks: peace with Egypt and the vague framework for Palestinian autonomy.",
            question: "How useful is this photograph for understanding the role of the USA in brokering Middle East peace?"
          }
        ]
      }
    },
    {
      title: "The Egypt-Israel Peace Treaty (1979)",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Begin_Sadat_Carter_1979_Treaty.jpg/500px-Begin_Sadat_Carter_1979_Treaty.jpg",
      filename: "cme_peace_treaty.jpg",
      caption: "The formal signing of the Egypt-Israel Peace Treaty in Washington, officially ending 30 years of war.",
      teacher_notes: {
        primer: "Discuss the consequences: Israel gives up the Sinai, Egypt is expelled from the Arab League.",
        objectives: [
          {
            objective: "Assess the impact of the peace treaty",
            primer: "Explain the long-term strategic benefits and the eventual assassination of Sadat.",
            question: "How useful is this source for understanding the culmination of the Camp David negotiations?"
          }
        ]
      }
    }
  ],
  "KT3.2: The Palestinian Issue, 1974–1993": [
    {
      title: "The First Intifada (1987)",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Palestinian_youth_throwing_stones_during_the_First_Intifada.jpg/500px-Palestinian_youth_throwing_stones_during_the_First_Intifada.jpg",
      filename: "cme_first_intifada.jpg",
      caption: "Palestinian youth confronting Israeli troops during the First Intifada, a spontaneous grassroots uprising.",
      teacher_notes: {
        primer: "Focus on the asymmetrical nature of the conflict (stones vs guns) and its impact on global opinion.",
        objectives: [
          {
            objective: "Understand the causes of the Intifada",
            primer: "Discuss the frustration with military occupation and the failure of the PLO abroad.",
            question: "How useful is this photograph for understanding the methods used by Palestinians during the First Intifada?"
          }
        ]
      }
    },
    {
      title: "Israeli Response to the Intifada",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Israeli_soldiers_in_Nablus.jpg/500px-Israeli_soldiers_in_Nablus.jpg",
      filename: "cme_israeli_response.jpg",
      caption: "Israeli soldiers patrolling the occupied territories, attempting to enforce Defense Minister Rabin's 'Iron Fist' policy.",
      teacher_notes: {
        primer: "Explain the damage to Israel's international reputation caused by televised military crackdowns.",
        objectives: [
          {
            objective: "Analyze the Israeli dilemma",
            primer: "Discuss the psychological toll on soldiers and the realization that a military solution was impossible.",
            question: "How useful is this image for understanding the challenges faced by the IDF during the Intifada?"
          }
        ]
      }
    },
    {
      title: "PLO Exile in Lebanon",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Arafat_in_Beirut_1982.jpg/500px-Arafat_in_Beirut_1982.jpg",
      filename: "cme_arafat_beirut.jpg",
      caption: "Yasser Arafat during the 1982 Lebanon War, shortly before the PLO was forced into exile in Tunisia.",
      teacher_notes: {
        primer: "Discuss the physical separation of the PLO leadership from the Palestinians living in the occupied territories.",
        objectives: [
          {
            objective: "Trace the evolution of the PLO",
            primer: "Explain why the Intifada took the PLO leadership by surprise.",
            question: "How useful is this source for understanding the precarious position of the PLO in the 1980s?"
          }
        ]
      }
    }
  ],
  "KT3.3: Attempts at a solution, 1988–1995": [
    {
      title: "The Oslo Handshake (1993)",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Rabin%2C_Arafat%2C_Clinton_at_Oslo_Accords.jpg/500px-Rabin%2C_Arafat%2C_Clinton_at_Oslo_Accords.jpg",
      filename: "cme_oslo_handshake.jpg",
      caption: "Yitzhak Rabin, Yasser Arafat, and Bill Clinton sealing the Oslo I Accord on the White House lawn.",
      teacher_notes: {
        primer: "Highlight the mutual recognition: PLO recognized Israel's right to exist, Israel recognized the PLO.",
        objectives: [
          {
            objective: "Analyze the Oslo Accords",
            primer: "Discuss the creation of the Palestinian Authority and the phased withdrawal plan.",
            question: "How useful is this photograph for understanding the optimism surrounding the Oslo peace process?"
          }
        ]
      }
    },
    {
      title: "Israel-Jordan Peace Treaty (1994)",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Israel-Jordan_Peace_Treaty_Signing.jpg/500px-Israel-Jordan_Peace_Treaty_Signing.jpg",
      filename: "cme_israel_jordan.jpg",
      caption: "The signing of the peace treaty between Israel and Jordan, further normalizing relations in the region.",
      teacher_notes: {
        primer: "Discuss the momentum of the peace process following Oslo.",
        objectives: [
          {
            objective: "Understand regional normalization",
            primer: "Explain how Jordan became the second Arab nation to make peace with Israel.",
            question: "How useful is this image for understanding the broader regional impacts of the Oslo Accords?"
          }
        ]
      }
    },
    {
      title: "Assassination of Yitzhak Rabin",
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Rabin_Peace_Rally_Tel_Aviv_1995.jpg/500px-Rabin_Peace_Rally_Tel_Aviv_1995.jpg",
      filename: "cme_rabin_rally.jpg",
      caption: "Yitzhak Rabin at the Tel Aviv peace rally on November 4, 1995, moments before he was assassinated by an Israeli extremist.",
      teacher_notes: {
        primer: "Focus on the devastating impact of this event on the momentum of the peace process.",
        objectives: [
          {
            objective: "Assess the opposition to peace",
            primer: "Discuss the deep divisions within Israeli society over the Oslo Accords.",
            question: "How useful is this source for understanding the intense polarization in Israel regarding the peace process?"
          }
        ]
      }
    }
  ]
};

// Fallback images in case those wikimedia URLs are deleted/changed
const fallbackImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_Nations.svg/500px-Flag_of_the_United_Nations.svg.png";

async function run() {
  const assetsDir = path.join(__dirname, 'public', 'assets');
  if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

  for (let l of unitData.lessons) {
    const ktKey = l.title; // e.g. "KT1.1: The End..."
    if (ktSources[ktKey]) {
      console.log(`Processing sources for ${ktKey}`);
      l.sources = [];
      for (let s of ktSources[ktKey]) {
        // Inject direct Wikipedia URL as the source instead of local path due to rate limits
        l.sources.push({
          title: s.title,
          src: s.url,
          caption: s.caption,
          teacher_notes: s.teacher_notes
        });
      }
    }
  }

  // Write back
  const newCode = `export const unitData = ${JSON.stringify(unitData, null, 4)};`;
  fs.writeFileSync(dataPath, newCode);
  console.log("Successfully injected all sources into data.js!");
}

run();
