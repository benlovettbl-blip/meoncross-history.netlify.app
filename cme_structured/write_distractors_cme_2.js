const fs = require('fs');
const path = require('path');

const distractorsCmePart2 = {
  "q_2_3_s1": [
    "Gamal Abdel Nasser",
    "Hosni Mubarak",
    "Muhammad Naguib"
  ],
  "q_2_3_s2": [
    "5,000 advisers",
    "10,000 advisers",
    "25,000 advisers"
  ],
  "q_2_3_s3": [
    "The Sharon Wall",
    "The Suez Shield",
    "The Maginot Line"
  ],
  "q_2_3_s4": [
    "Jewish outposts",
    "Communal farms (Kibbutzim)",
    "Zionist municipalities"
  ],
  "q_2_3_s5": [
    "Passover",
    "Rosh Hashanah",
    "Hanukkah"
  ],
  "q_2_3_s6": [
    "Bulldozers",
    "Explosive charges",
    "Pneumatic drills"
  ],
  "q_2_3_s7": [
    "Scud missiles",
    "Sagger missiles",
    "SAM-6 missiles"
  ],
  "q_2_3_s8": [
    "Great Britain",
    "France",
    "West Germany"
  ],
  "q_2_3_s9": [
    "The Shipping Boycott",
    "The Financial Embargo",
    "The Canal Blockade"
  ],
  "q_2_3_s10": [
    "Resolution 242",
    "Resolution 181",
    "Resolution 340"
  ],
  "q_2_3_d1": [
    "The Kahane Commission",
    "The Shamgar Commission",
    "The Kahan Commission"
  ],
  "q_2_3_d2": [
    "Eli Zeira",
    "Zvi Zamir",
    "Moshe Dayan"
  ],
  "q_2_3_d3": [
    "SAM-3 missiles",
    "SAM-6 missiles",
    "Scud missiles"
  ],
  "q_2_3_d4": [
    "The Israel Shield Assumption",
    "The Dayan Concept",
    "The Deterrence Doctrine"
  ],
  "q_2_3_d5": [
    "Crown Prince Hassan",
    "King Faisal",
    "Prime Minister Zaid al-Rifai"
  ],
  "q_3_1_s1": [
    "The Suez Canal Closure",
    "The Trade Boycott",
    "The Dollar Embargo"
  ],
  "q_3_1_s2": [
    "OAPEC",
    "GCC",
    "Arab League"
  ],
  "q_3_1_s3": [
    "William P. Rogers",
    "Cyrus Vance",
    "George Shultz"
  ],
  "q_3_1_s4": [
    "Backchannel Diplomacy",
    "Intermediary Mediation",
    "Step-by-Step Peacekeeping"
  ],
  "q_3_1_s5": [
    "The Straits of Tiran",
    "The Gulf of Suez",
    "The Straits of Aqaba"
  ],
  "q_3_1_s6": [
    "Tel Aviv",
    "Cairo",
    "Washington D.C."
  ],
  "q_3_1_s7": [
    "The Knesset Building",
    "The President's Residence",
    "The Israeli High Court"
  ],
  "q_3_1_s8": [
    "Richard Nixon",
    "Gerald Ford",
    "Ronald Reagan"
  ],
  "q_3_1_s9": [
    "Warm Springs",
    "Kennebunkport",
    "Key Largo"
  ],
  "q_3_1_s10": [
    "September 1978 (Camp David Frameworks)",
    "November 1977 (Jerusalem Declaration)",
    "June 1979 (Washington Accord)"
  ],
  "q_3_1_d1": [
    "Egypt (Anwar Sadat)",
    "Saudi Arabia (King Khalid)",
    "Jordan (King Hussein)"
  ],
  "q_3_1_d2": [
    "Ismail Fahmy",
    "Boutros Boutros-Ghali",
    "Amr Moussa"
  ],
  "q_3_1_d3": [
    "Windsor Castle",
    "Heidelberg Castle",
    "Château de Versailles"
  ],
  "q_3_1_d4": [
    "Sinai I",
    "Suez II",
    "Geneva I"
  ],
  "q_3_1_d5": [
    "Meir Shamgar",
    "Elyakim Rubinstein",
    "Menachem Begin"
  ],
  "q_3_1_d6": [
    "Anwar Sadat",
    "Saad el-Shazly",
    "Ahmad Ismail Ali"
  ],
  "q_3_2_s1": [
    "Yitzhak Rabin",
    "Anwar Sadat",
    "Jimmy Carter"
  ],
  "q_3_2_s2": [
    "Syria",
    "Egypt",
    "Jordan"
  ],
  "q_3_2_s3": [
    "The Lebanese Sectarian Conflict",
    "The Beirut Border Clashes",
    "The Mount Lebanon Insurgency"
  ],
  "q_3_2_s4": [
    "Operation Peace for Galilee",
    "Operation Grapes of Wrath",
    "Operation Accountability"
  ],
  "q_3_2_s5": [
    "UNEF",
    "UNTSO",
    "UNDP"
  ],
  "q_3_2_s6": [
    "A border skirmish in the Golan Heights",
    "The hijacking of an Israeli airliner to Beirut",
    "A cross-border artillery attack on Kiryat Shmona"
  ],
  "q_3_2_s7": [
    "Operation Litani",
    "Operation Peace for Lebanon",
    "Operation Beirut Shield"
  ],
  "q_3_2_s8": [
    "Tripoli",
    "Sidon",
    "Tyre"
  ],
  "q_3_2_s9": [
    "Chatila and Bourj el-Barajneh",
    "Sabra and Ein el-Hilweh",
    "Sabra and Shatila Camps"
  ],
  "q_3_2_s10": [
    "The First Resistance",
    "The Stones Uprising",
    "The Gaza Revolt"
  ],
  "q_3_2_d1": [
    "The Ma'alot Massacre",
    "The Kiryat Shmona Massacre",
    "The Avivim School Bus Bombing"
  ],
  "q_3_2_d2": [
    "Amin Gemayel",
    "Camille Chamoun",
    "Suleiman Frangieh"
  ],
  "q_3_2_d3": [
    "Yitzhak Shamir",
    "Yitzhak Rabin",
    "Ariel Sharon"
  ],
  "q_3_2_d4": [
    "PLO",
    "Hamas",
    "DFLP"
  ],
  "q_3_2_d5": [
    "Ariel Sharon",
    "Yitzhak Shamir",
    "Moshe Arens"
  ],
  "q_3_2_d6": [
    "Menachem Begin",
    "Yitzhak Rabin",
    "Shimon Peres"
  ],
  "q_3_3_s1": [
    "Zurich",
    "Bern",
    "Geneva Session"
  ],
  "q_3_3_s2": [
    "A single democratic state solution",
    "A confederation of Arab and Jewish cantons",
    "A mandate-style international trusteeship"
  ],
  "q_3_3_s3": [
    "The Soviet Collapse",
    "The Gulf War Conflict",
    "The Arab League Split"
  ],
  "q_3_3_s4": [
    "Saudi Arabia",
    "Iran",
    "Jordan"
  ],
  "q_3_3_s5": [
    "Operation Desert Storm",
    "The Iraq Conflict",
    "The Kuwait Liberation Campaign"
  ],
  "q_3_3_s6": [
    "Barcelona",
    "Seville",
    "Toledo"
  ],
  "q_3_3_s7": [
    "Stockholm",
    "Copenhagen",
    "Helsinki"
  ],
  "q_3_3_s8": [
    "A signed treaty scroll",
    "A joint press declaration",
    "A formal toast of peace"
  ],
  "q_3_3_s9": [
    "Palestinian National Council (PNC)",
    "Palestinian Authority (PA)",
    "PLO Executive Committee"
  ],
  "q_3_3_s10": [
    "Syria",
    "Lebanon",
    "Saudi Arabia"
  ],
  "q_3_3_d1": [
    "George Shultz",
    "Warren Christopher",
    "Brent Scowcroft"
  ],
  "q_3_3_d2": [
    "Gro Harlem Brundtland",
    "Thorvald Stoltenberg",
    "Kjell Magne Bondevik"
  ],
  "q_3_3_d3": [
    "10 percent",
    "18 percent",
    "22 percent"
  ],
  "q_3_3_d4": [
    "The Song of Brotherhood (Shir HaAchva)",
    "The Song of Hope (Hatikvah)",
    "The Song of the Land (Shir HaAdama)"
  ],
  "q_3_3_d5": [
    "Baruch Goldstein",
    "Yona Avrushmi",
    "Ami Popper"
  ],
  "q_3_3_d6": [
    "Boris Yeltsin",
    "Eduard Shevardnadze",
    "Andrei Gromyko"
  ],
  "q_3_3_d7": [
    "Ronald Reagan",
    "Bill Clinton",
    "George W. Bush"
  ],
  "q_3_3_d8": [
    "Ahmed Qurei (Abu Ala)",
    "Saeb Erekat",
    "Mahmoud Al-Zahar"
  ]
};

fs.writeFileSync(path.join(__dirname, 'scratch_distractors_cme_part2.json'), JSON.stringify(distractorsCmePart2, null, 2), 'utf8');
console.log("Successfully wrote scratch_distractors_cme_part2.json");
