export const DECISIONS_DATA = [
  {
    id: "game_1",
    title: "The Proclamation of Independence",
    series: "Diplomatic Hotline",
    topic: "Key Topic 1: The birth of the state of Israel, 1945–63",
    role: "Prime Minister David Ben-Gurion (May 1948)",
    icon: "fa-solid fa-flag",
    crisis: "The British Mandate expires tonight. You must decide whether to officially proclaim the independent State of Israel now, even though five Arab armies are massing on your borders, threatening an immediate full-scale invasion.",
    phase1: {
      choiceA: {
        text: "Delay the proclamation to seek a diplomatic truce mediated by the US.",
        fallout: "The US State Department is relieved, but the Zionist Executive is furious. British troops withdraw, leaving a power vacuum. Arab forces seize strategic border posts unopposed.",
        choice1: {
          text: "Declare independence later under military occupation.",
          verdict: "Total collapse of strategic positions. Israel starts the war from a position of severe weakness without global recognition or control of Jerusalem.",
          isHistorical: false
        },
        choice2: {
          text: "Agree to a temporary UN trusteeship over Palestine.",
          verdict: "The Zionist dream is suspended indefinitely. You lose the momentum of Holocaust sympathy, and the territory remains under international control.",
          isHistorical: false
        }
      },
      choiceB: {
        text: "Officially declare the State of Israel immediately.",
        fallout: "President Truman recognizes Israel instantly, but five Arab armies launch a coordinated invasion. The newly formed IDF must defend the borders with limited weapons.",
        choice1: {
          text: "Focus all forces on defending border settlements.",
          verdict: "The Arab armies cut off Jerusalem. The Old City falls, and the capital is lost, resulting in a fractured state.",
          isHistorical: false
        },
        choice2: {
          text: "Secure the Jerusalem corridor and launch counter-offensives.",
          verdict: "Historical Path: The IDF successfully holds off the initial assault, establishes the Jerusalem corridor, and subsequently expands its territory, resulting in the 1949 Armistice agreements.",
          isHistorical: true
        }
      }
    }
  },
  {
    id: "game_2",
    title: "The Suez Canal Stand",
    series: "Diplomatic Hotline",
    topic: "Key Topic 1: The birth of the state of Israel, 1945–63",
    role: "President Gamal Abdel Nasser (July 1956)",
    icon: "fa-solid fa-water",
    crisis: "The United States has abruptly withdrawn its funding for the Aswan High Dam. Your prestige is on the line, and you need to secure funding to modernise Egypt. You are considering nationalising the Suez Canal Company, which is owned by British and French shareholders.",
    phase1: {
      choiceA: {
        text: "Negotiate with the West and accept alternative loans with strict conditions.",
        fallout: "The USA and Britain offer a smaller loan, but demand oversight of Egypt's national budget and foreign policy.",
        choice1: {
          text: "Accept the conditions to ensure the dam is built safely.",
          verdict: "Your popularity collapses. The Egyptian military views you as a Western puppet, and you are overthrown in a coup.",
          isHistorical: false
        },
        choice2: {
          text: "Reject the loans and cancel the Aswan Dam project.",
          verdict: "Egypt's industrialization fails. Siltation and floods continue to ravage the Nile valley, damaging your economic legacy.",
          isHistorical: false
        }
      },
      choiceB: {
        text: "Nationalise the Suez Canal Company immediately.",
        fallout: "Britain, France, and Israel launch a secret joint military invasion, capturing Port Said and the Sinai Peninsula.",
        choice1: {
          text: "Wage a conventional military battle against the invaders.",
          verdict: "Egypt's army is completely destroyed. You are forced to surrender, the canal is returned to the West, and your presidency ends in defeat.",
          isHistorical: false
        },
        choice2: {
          text: "Block the canal by sinking ships and appeal to the US and UN.",
          verdict: "Historical Path: President Eisenhower is furious at the Anglo-French action and pressures them financially. The UN orders a ceasefire, and the invaders withdraw in humiliation, making you a hero of Pan-Arabism.",
          isHistorical: true
        }
      }
    }
  },
  {
    id: "game_3",
    title: "The Yom Kippur Surprise",
    series: "Diplomatic Hotline",
    topic: "Key Topic 2: The escalating conflict, 1964–73",
    role: "President Anwar Sadat (October 1973)",
    icon: "fa-solid fa-plane-up",
    crisis: "Geopolitical diplomacy is stalled, and Israel refuses to negotiate over the Sinai Peninsula. You must decide whether to launch a high-risk coordinated surprise attack across the Suez Canal on the Jewish holy day of Yom Kippur.",
    phase1: {
      choiceA: {
        text: "Wait for a diplomatic solution through UN and US mediation.",
        fallout: "No progress is made. Israel continues to build permanent settlements in Sinai, and your military commanders plot a coup to remove you for inaction.",
        choice1: {
          text: "Launch a desperate unilateral assault without Syria.",
          verdict: "The IDF easily repels the uncoordinated attack. Cairo is threatened, and Egypt faces total defeat.",
          isHistorical: false
        },
        choice2: {
          text: "Accept the status quo and focus on domestic affairs.",
          verdict: "Egypt remains economically stagnant and isolated in the Arab world, and the Sinai is permanently integrated into Israel.",
          isHistorical: false
        }
      },
      choiceB: {
        text: "Launch a coordinated surprise assault with Syria on Yom Kippur.",
        fallout: "Your forces successfully cross the canal and breach the Bar-Lev Line. However, the US launches a massive airlift to supply Israel, and the IDF launches a counter-attack.",
        choice1: {
          text: "Order your tanks to advance deep into the Sinai desert beyond your missile cover.",
          verdict: "Disaster. The Israeli Air Force destroys your armor in the open desert, and the IDF crosses the canal, threatening Cairo.",
          isHistorical: false
        },
        choice2: {
          text: "Dig in under your SAM-missile umbrella and demand ceasefire talks.",
          verdict: "Historical Path: You hold your positions, proving Egypt can fight. The superpower ceasefire (Resolution 338) is signed. Your military success forces the US to broker peace negotiations, leading to the Camp David Accords.",
          isHistorical: true
        }
      }
    }
  },
  {
    id: "game_4",
    title: "The Oslo Breakthrough",
    series: "Diplomatic Hotline",
    topic: "Key Topic 3: Attempts at a solution, 1974–95",
    role: "Prime Minister Yitzhak Rabin (September 1993)",
    icon: "fa-solid fa-handshake",
    crisis: "Months of secret back-channel negotiations in Norway have resulted in the Oslo I Accords. To achieve peace, you must agree to recognize the PLO (which many Israelis view as a terrorist group) and grant Palestinians self-rule in Gaza and Jericho.",
    phase1: {
      choiceA: {
        text: "Refuse the Oslo Accords to appease conservative Israeli politicians.",
        fallout: "The secret talks leak. The First Intifada continues to escalate, and international criticism of Israel's military response grows.",
        choice1: {
          text: "Escalate the military suppression of the Intifada.",
          verdict: "Israel becomes a global pariah. Economic boycotts severely damage your economy, and the cycle of violence worsens.",
          isHistorical: false
        },
        choice2: {
          text: "Negotiate only with moderate local Palestinian leaders, bypassing Arafat.",
          verdict: "Arafat and the PLO denounce the local leaders as collaborators. The talks collapse, and radical factions seize control of the streets.",
          isHistorical: false
        }
      },
      choiceB: {
        text: "Sign the Oslo Accords and shake hands with Yasser Arafat.",
        fallout: "You receive the Nobel Peace Prize, but face massive protests from right-wing Israelis and settler movements, while Hamas launches suicide bombings.",
        choice1: {
          text: "Halt the peace process and freeze all withdrawals.",
          verdict: "The PLO resumes armed struggle. The accords are declared dead, and you lose all international goodwill.",
          isHistorical: false
        },
        choice2: {
          text: "Continue implementation of the Accords despite the violence.",
          verdict: "Historical Path: You courageously push forward to Oslo II. However, the domestic hostility reaches a boiling point, and you are assassinated by a right-wing Jewish extremist in November 1995. The peace process stalls, but the PNA structure remains.",
          isHistorical: true
        }
      }
    }
  }
];
