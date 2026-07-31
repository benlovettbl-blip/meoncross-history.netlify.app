const fs = require('fs');

const biosFile = './public/units/cme_new/biographies.json';
const bios = JSON.parse(fs.readFileSync(biosFile, 'utf8'));

const existingNames = bios.map(b => b.name);

const newBios = [
  {
    name: "Gamal Abdel Nasser",
    role: "President of Egypt",
    lifespan: "1918 – 1970",
    achievements: [
      "Nationalized the Suez Canal in 1956.",
      "Championed Pan-Arab nationalism and formed the United Arab Republic.",
      "Led Egypt during the Suez Crisis and the Six-Day War."
    ],
    significance: "He became a symbol of Arab dignity and resistance against Western imperialism, fundamentally reshaping the political landscape of the Middle East.",
    image: "/units/cme_new/assets/card_nasser.png"
  },
  {
    name: "David Ben-Gurion",
    role: "Founding Father and 1st Prime Minister of Israel",
    lifespan: "1886 – 1973",
    achievements: [
      "Proclaimed the establishment of the State of Israel in 1948.",
      "Led Israel during the 1948 Arab-Israeli War.",
      "Oversaw the absorption of millions of Jewish immigrants."
    ],
    significance: "As the primary founder of the State of Israel, he established its core national institutions and military, shaping the nation's early identity and survival.",
    image: "/units/cme_new/assets/cme_david_ben_gurion__d597_087_.jpg"
  },
  {
    name: "Golda Meir",
    role: "4th Prime Minister of Israel",
    lifespan: "1898 – 1978",
    achievements: [
      "Served as Prime Minister during the 1973 Yom Kippur War.",
      "Helped secure crucial military resupply from the United States during the war.",
      "Was one of the signers of the Israeli Declaration of Independence."
    ],
    significance: "Often described as the 'Iron Lady' of Israeli politics, she navigated Israel through one of its most perilous conflicts, though she faced heavy criticism for the lack of preparedness in 1973.",
    image: "/units/cme_new/assets/card_golda.png"
  },
  {
    name: "King Hussein",
    role: "King of Jordan",
    lifespan: "1935 – 1999",
    achievements: [
      "Ruled Jordan through numerous regional wars and internal crises.",
      "Expelled the PLO from Jordan during 'Black September' in 1970.",
      "Signed the historic Israel-Jordan Peace Treaty in 1994."
    ],
    significance: "He successfully balanced complex regional dynamics to ensure the survival of the Hashemite Kingdom, eventually becoming a moderate voice for peace in the region.",
    image: "/units/cme_new/assets/card_hussein.png"
  },
  {
    name: "Moshe Dayan",
    role: "Israeli Military Leader and Politician",
    lifespan: "1915 – 1981",
    achievements: [
      "Chief of Staff of the IDF during the 1956 Sinai Campaign.",
      "Defense Minister during the decisive 1967 Six-Day War.",
      "Helped negotiate the Camp David Accords."
    ],
    significance: "With his iconic eye patch, he became the global symbol of Israeli military prowess, playing a decisive role in Israel's most defining wars and later peace efforts.",
    image: "/units/cme_new/assets/card_dayan.png"
  },
  {
    name: "Henry Kissinger",
    role: "US Secretary of State",
    lifespan: "1923 – 2023",
    achievements: [
      "Orchestrated 'Shuttle Diplomacy' following the 1973 Yom Kippur War.",
      "Negotiated the disengagement agreements between Israel, Egypt, and Syria.",
      "Paved the way for the eventual Camp David Accords."
    ],
    significance: "His intense diplomatic efforts established the United States as the primary mediator in the Arab-Israeli conflict, marginalizing Soviet influence in the region.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Henry_Kissinger_official_portrait.jpg/500px-Henry_Kissinger_official_portrait.jpg"
  },
  {
    name: "Yitzhak Shamir",
    role: "7th Prime Minister of Israel",
    lifespan: "1915 – 2012",
    achievements: [
      "Served as Prime Minister during the First Intifada.",
      "Implemented a harsh 'Iron Fist' policy against Palestinian protests.",
      "Participated in the 1991 Madrid Peace Conference."
    ],
    significance: "A staunch hardliner, his uncompromising stance on territorial concessions and harsh response to the Intifada polarized Israeli politics but eventually led to US pressure for negotiations.",
    image: "/units/cme_new/assets/card_shamir.png"
  }
];

newBios.forEach(bio => {
  if (!existingNames.includes(bio.name)) {
    bios.push(bio);
  }
});

fs.writeFileSync(biosFile, JSON.stringify(bios, null, 2), 'utf8');
console.log('Added ' + newBios.length + ' missing biographies.');
