export const PLANNER_PROMPTS = {
  prompt_hotel: {
    title: "1.1: Explain why the British decided to withdraw from Palestine (1947)",
    sentences: [
      { type: "P", text: "A primary reason for the British withdrawal was the escalating Jewish insurgency, particularly the King David Hotel bombing, which made the mandate politically and militarily unsustainable." },
      { type: "E", text: "In July 1946, the Zionist militant group Irgun bombed the British military and administrative headquarters in the hotel, killing 91 people and triggering massive public outrage in Britain." },
      { type: "EL", text: "This demonstrated that maintaining the mandate would require a costly, long-term military occupation that the bankrupt post-war British government could not afford." },
      { type: "L", text: "Consequently, the Jewish insurgency and the destruction of British resolve directly led to the decision to hand Palestine over to the United Nations." }
    ],
    vocab: [
      { word: "King David Hotel", synonyms: ["king david hotel", "king david hotel bombing", "king david"] },
      { word: "Irgun", synonyms: ["irgun", "begin"] },
      { word: "91 people", synonyms: ["91", "91 people", "91 killed"] },
      { word: "United Nations", synonyms: ["united nations", "un", "resolution 181"] }
    ]
  },
  prompt_sixday: {
    title: "2.2: Explain why the Six-Day War broke out in 1967",
    sentences: [
      { type: "P", text: "A major cause of the outbreak of the Six-Day War was the rapid escalation of border tensions, coupled with Nasser's decision to close the Straits of Tiran." },
      { type: "E", text: "Following false Soviet intelligence in May 1967, President Nasser mobilized Egyptian troops in Sinai, ordered the UNEF peacekeepers to leave, and closed the Straits of Tiran to Israeli shipping." },
      { type: "EL", text: "Israel viewed the blockade of its southern port as a casus belli (act of war) and launched a pre-emptive airstrike (Operation Focus) on 5 June 1967, destroying the Egyptian air force on the ground." },
      { type: "L", text: "Ultimately, the combination of border friction, mobilization, and the shipping blockade precipitated Israel's pre-emptive strike, starting the war." }
    ],
    vocab: [
      { word: "Straits of Tiran", synonyms: ["straits of tiran", "tiran", "blockade"] },
      { word: "Operation Focus", synonyms: ["operation focus", "airstrike", "pre-emptive"] },
      { word: "Sinai Peninsula", synonyms: ["sinai", "sinai peninsula", "mobilized"] },
      { word: "Soviet intelligence", synonyms: ["soviet", "soviet intelligence", "false intelligence"] }
    ]
  },
  prompt_campdavid: {
    title: "3.1: Explain why Egypt and Israel signed the Camp David Accords in 1978",
    sentences: [
      { type: "P", text: "A key reason for the signing of the Camp David Accords was President Anwar Sadat's desire to reclaim the Sinai Peninsula and relieve Egypt's struggling economy." },
      { type: "E", text: "In 1977, Sadat made a historic visit to Jerusalem, which paved the way for negotiations hosted by US President Jimmy Carter at Camp David in 1978, resulting in mutual recognition and the return of Sinai." },
      { type: "EL", text: "This peace treaty secured Israel's southern border and allowed Egypt to redirect its budget from military spending to domestic economic development, backed by US aid." },
      { type: "L", text: "Therefore, the mutual benefits of border security, territorial return, and US diplomatic mediation enabled the historic peace agreement." }
    ],
    vocab: [
      { word: "Anwar Sadat", synonyms: ["anwar sadat", "sadat"] },
      { word: "Menachem Begin", synonyms: ["menachem begin", "begin"] },
      { word: "Sinai Peninsula", synonyms: ["sinai", "sinai peninsula", "return of sinai"] },
      { word: "Jimmy Carter", synonyms: ["jimmy carter", "carter"] }
    ]
  }
};
