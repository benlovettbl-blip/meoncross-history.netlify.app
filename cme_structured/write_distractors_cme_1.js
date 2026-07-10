const fs = require('fs');
const path = require('path');

const distractorsCmePart1 = {
  "q_1_1_s1": [
    "The British Protectorate Accord",
    "The British Colonial Charter",
    "The British Trusteeship Treaty"
  ],
  "q_1_1_s2": [
    "Pan-Arabism",
    "Diaspora Nationalism",
    "Hebrew Integrationism"
  ],
  "q_1_1_s3": [
    "The Peel Declaration",
    "The Sykes-Picot Agreement",
    "The White Paper of 1939"
  ],
  "q_1_1_s4": [
    "The Dreyfus Affair",
    "The Pogroms of Tsarist Russia",
    "The Kishinev Riots"
  ],
  "q_1_1_s5": [
    "The Irgun Zvai Leumi",
    "The Stern Gang (Lohamei Herut Israel)",
    "The Palmach Special Forces"
  ],
  "q_1_1_s6": [
    "The Haganah",
    "The Stern Gang",
    "The Jewish Agency Guard"
  ],
  "q_1_1_s7": [
    "Tel Aviv",
    "Haifa",
    "Jaffa"
  ],
  "q_1_1_s8": [
    "50 people",
    "75 people",
    "120 people"
  ],
  "q_1_1_s9": [
    "SS Exodus 1947",
    "SS Patria",
    "SS Struma"
  ],
  "q_1_1_s10": [
    "The League of Nations",
    "The International Court of Justice",
    "The Allied Supreme Council"
  ],
  "q_1_1_d1": [
    "Chaim Weizmann",
    "David Ben-Gurion",
    "Ze'ev Jabotinsky"
  ],
  "q_1_1_d2": [
    "The Woodhead Commission",
    "The Anglo-American Committee",
    "The Morrison-Grady Plan"
  ],
  "q_1_1_d3": [
    "Anthony Eden",
    "Arthur Balfour",
    "Clement Attlee"
  ],
  "q_1_1_d4": [
    "45 percent",
    "50 percent",
    "60 percent"
  ],
  "q_1_1_d5": [
    "Moshav",
    "Moshava",
    "Ulpan"
  ],
  "q_1_1_d6": [
    "Fawzi al-Qawuqji",
    "Musa al-Husayni",
    "Raghib al-Nashashibi"
  ],
  "q_1_2_s1": [
    "Syria",
    "Egypt",
    "Lebanon"
  ],
  "q_1_2_s2": [
    "Jordan",
    "Syria",
    "Saudi Arabia"
  ],
  "q_1_2_s3": [
    "The Red Line",
    "The Blue Line",
    "The Purple Line"
  ],
  "q_1_2_s4": [
    "Al-Naksa",
    "Al-Intifada",
    "Al-Thawra"
  ],
  "q_1_2_s5": [
    "Over 500,000",
    "Over 900,000",
    "Over 1,000,000"
  ],
  "q_1_2_s6": [
    "UNHCR",
    "UNICEF",
    "UNDP"
  ],
  "q_1_2_s7": [
    "The Haganah Corps",
    "The Israeli National Army (INA)",
    "The Palmach Units"
  ],
  "q_1_2_s8": [
    "National volunteer service",
    "Civilian reserve training",
    "Border guard mobilization"
  ],
  "q_1_2_s9": [
    "The Law of Citizenship",
    "The Right of Return Act",
    "The Nationality Declaration"
  ],
  "q_1_2_s10": [
    "Mujahideen",
    "Fatah",
    "Intifadists"
  ],
  "q_1_2_d1": [
    "Operation Olive Leaves",
    "Operation Sinai Shield",
    "Operation Sinai Counter-Strike"
  ],
  "q_1_2_d2": [
    "Moshe Dayan",
    "Yitzhak Rabin",
    "Ezer Weizman"
  ],
  "q_1_2_d3": [
    "Haifa",
    "Ashdod",
    "Tel Aviv"
  ],
  "q_1_2_d4": [
    "King Fuad II",
    "King Hussein",
    "King Faisal II"
  ],
  "q_1_2_d5": [
    "The West German Compensation Pact",
    "The Geneva Restitution Treaty",
    "The Holocaust Reconciliation Accord"
  ],
  "q_1_2_d6": [
    "Lord Moyne",
    "Sir Harold MacMichael",
    "Ralph Bunche"
  ],
  "q_1_3_s1": [
    "Muhammad Naguib",
    "Anwar Sadat",
    "Hosni Mubarak"
  ],
  "q_1_3_s2": [
    "Arab Socialism",
    "Islamic Solidarity",
    "Levantine Coalitionism"
  ],
  "q_1_3_s3": [
    "The Sinai Peninsula",
    "The West Bank",
    "The Golan Heights"
  ],
  "q_1_3_s4": [
    "Poland",
    "Hungary",
    "East Germany"
  ],
  "q_1_3_s5": [
    "The Aswan Low Dam",
    "The Nile Delta Hydroelectric Plant",
    "The Lake Nasser Irrigation Project"
  ],
  "q_1_3_s6": [
    "Great Britain",
    "France",
    "The Soviet Union"
  ],
  "q_1_3_s7": [
    "The Straits of Tiran",
    "The Gulf of Aqaba",
    "The River Nile Outlet"
  ],
  "q_1_3_s8": [
    "Paris Collusion Agreement",
    "London Canal Accord",
    "Sinai Tripartite Pact"
  ],
  "q_1_3_s9": [
    "The Gaza Strip",
    "The West Bank",
    "The Golan Heights"
  ],
  "q_1_3_s10": [
    "UNIFIL (United Nations Interim Force in Lebanon)",
    "UNTSO (United Nations Truce Supervision Organization)",
    "UNRWA (United Nations Relief and Works Agency)"
  ],
  "q_1_3_d1": [
    "Operation Black Arrow",
    "Operation Galilee Storm",
    "Operation Sea of Galilee Patrol"
  ],
  "q_1_3_d2": [
    "David Ben-Gurion",
    "Pinhas Lavon",
    "Levi Eshkol"
  ],
  "q_1_3_d3": [
    "El Arish",
    "Taba",
    "Ras Sudr"
  ],
  "q_1_3_d4": [
    "Operation Focus",
    "Operation Sinai Storm",
    "Operation Sinai Shield"
  ],
  "q_1_3_d5": [
    "An appeal to the United Nations Security Council",
    "A formal declaration of war against Egypt",
    "A joint military mobilization in North Africa"
  ],
  "q_2_1_s1": [
    "Damascus",
    "Amman",
    "Beirut"
  ],
  "q_2_1_s2": [
    "The PNA (Palestinian National Authority)",
    "The PNC (Palestinian National Council)",
    "The PA (Palestinian Authority)"
  ],
  "q_2_1_s3": [
    "The PFLP (Popular Front for the Liberation of Palestine)",
    "The Black September Organization",
    "Hamas"
  ],
  "q_2_1_s4": [
    "The River Litani",
    "The Yarmouk River",
    "The Euphrates River"
  ],
  "q_2_1_s5": [
    "Qibya",
    "Karamah",
    "Jenin"
  ],
  "q_2_1_s6": [
    "Egyptian MiGs",
    "Jordanian Hunters",
    "Soviet Sukhois"
  ],
  "q_2_1_s7": [
    "Syria",
    "Jordan",
    "Great Britain"
  ],
  "q_2_1_s8": [
    "The Suez Canal",
    "The Straits of Gibraltar",
    "The Bab-el-Mandeb Strait"
  ],
  "q_2_1_s9": [
    "Numerical superiority",
    "Technological supremacy",
    "Heavy artillery firepower"
  ],
  "q_2_1_s10": [
    "A naval blockade",
    "A parachute drop behind enemy lines",
    "A massive border tank charge"
  ],
  "q_2_1_d1": [
    "David Ben-Gurion",
    "Moshe Dayan",
    "Yitzhak Rabin"
  ],
  "q_2_1_d2": [
    "The Arab League Joint Command Pact",
    "The Egypt-Jordan Defence Treaty",
    "The Cairo-Damascus Military Alliance"
  ],
  "q_2_1_d3": [
    "Operation Black Arrow",
    "Operation Peace for Galilee",
    "Operation Sinai Strike"
  ],
  "q_2_1_d4": [
    "50,000 troops",
    "75,000 troops",
    "150,000 troops"
  ],
  "q_2_1_d5": [
    "Dwight D. Eisenhower",
    "John F. Kennedy",
    "Richard Nixon"
  ],
  "q_2_2_s1": [
    "UN Resolution 181",
    "UN Resolution 338",
    "UN Resolution 194"
  ],
  "q_2_2_s2": [
    "Cairo",
    "Algiers",
    "Baghdad"
  ],
  "q_2_2_s3": [
    "The Suez Canal Conflict",
    "The Border Artillery War",
    "The War of Exhaustion"
  ],
  "q_2_2_s4": [
    "The West Bank",
    "The Gaza Strip",
    "The Golan Heights"
  ],
  "q_2_2_s5": [
    "The West Bank",
    "The Sinai Peninsula",
    "The Shebaa Farms"
  ],
  "q_2_2_s6": [
    "Citizens",
    "Evacuees",
    "Expatriates"
  ],
  "q_2_2_s7": [
    "Conventional border wars",
    "Diplomatic lobbying",
    "Trade embargos"
  ],
  "q_2_2_s8": [
    "Fatah",
    "The PLO",
    "The Black September Organization"
  ],
  "q_2_2_s9": [
    "Mafraq Air Base",
    "Amman International Airport",
    "Zarqa Desert Runway"
  ],
  "q_2_2_s10": [
    "Frankfurt",
    "Berlin",
    "Hamburg"
  ],
  "q_2_2_d1": [
    "Count Folke Bernadotte",
    "Ralph Bunche",
    "U Thant"
  ],
  "q_2_2_d2": [
    "Yasser Arafat",
    "Wadi Haddad",
    "Abu Nidal"
  ],
  "q_2_2_d3": [
    "Operation Spring of Youth",
    "Operation Solomon",
    "Operation Entebbe Rescue"
  ],
  "q_2_2_d4": [
    "Munich-Riem Airport",
    "Fürstenberg Airbase",
    "Bavarian Police Training School"
  ],
  "q_2_2_d5": [
    "Levi Eshkol",
    "Menachem Begin",
    "Yitzhak Rabin"
  ]
};

fs.writeFileSync(path.join(__dirname, 'scratch_distractors_cme_part1.json'), JSON.stringify(distractorsCmePart1, null, 2), 'utf8');
console.log("Successfully wrote scratch_distractors_cme_part1.json");
