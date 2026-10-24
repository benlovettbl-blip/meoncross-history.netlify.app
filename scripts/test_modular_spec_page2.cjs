const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Define the 9 modular blurbs with 100% Pearson Edexcel specification parity
const modularTopics = [
  // KEY TOPIC 1
  {
    ktNum: 1,
    ktTitle: 'The Birth of the State of Israel, 1945–63',
    topics: [
      {
        code: 'KT 1.1',
        title: 'The British Withdrawal and the Creation of Israel',
        pages: 'Spreads 1–2 • pp. 4–7',
        blurb:
          'Escalating post-war violence exposed the **conflicting interests and demands of Jews and Arabs within the British Mandate**, as Zionist paramilitaries waged an armed insurgency against British imperial forces. High-casualty attacks—most decisively the **bombing of the King David Hotel** by the Irgun in July 1946—convinced an exhausted Britain to surrender its mandate to the United Nations. In November 1947, **UN Resolution 181** voted for the **partition and the creation of Israel**, triggering immediate civil war and leading inexorably to the **end of the British Mandate** on 14 May 1948. David Ben-Gurion’s unilateral declaration of Israeli statehood provoked an immediate invasion by five neighbouring Arab armies, igniting the **key events of the Arab-Israeli war (1948–49)**, in which newly mobilized Israeli forces repelled the Arab coalition through superior coordination, Western weaponry, and decisive counter-offensives.',
      },
      {
        code: 'KT 1.2',
        title: 'Aftermath of the 1948–49 War',
        pages: 'Spread 3 • pp. 8–9',
        blurb:
          'The 1949 armistices established the Green Line, bringing sweeping **territorial changes and their impact** as Israel expanded beyond the UN partition borders while Transjordan annexed the West Bank and Egypt occupied the Gaza Strip. Over 700,000 displaced Palestinians were stripped of their homes and ancestral lands, permanently cementing **the refugee status of Palestinian Arabs** across regional exile camps. Within the fledgling state, David Ben-Gurion spearheaded **the creation of the Israeli Defence Forces** to ensure national survival, while the 1950 **Law of Return** opened unrestricted immigration for global Jewish diaspora communities, bolstered by crucial **US aid to Israel** which provided financial and diplomatic underwriting. Meanwhile, simmering border friction, fedayeen cross-border incursions, and naval blockades in the Gulf of Aqaba severely poisoned **Israel’s relations with Egypt**.',
      },
      {
        code: 'KT 1.3',
        title: 'Increased Tension, 1955–63',
        pages: 'Spread 4 • pp. 10–11',
        blurb:
          'The rise of Gamal Abdel Nasser established **Nasser and Egypt’s leadership of the Arab world**, championing militant Pan-Arab nationalism, securing Soviet-bloc weaponry through Czechoslovakia, and blockading Israeli shipping through the Straits of Tiran. A devastating **Israeli attack on Gaza in 1955** humiliated the Egyptian army, prompting Nasser to sponsor fedayeen raids and nationalise the Suez Canal in July 1956 after Western powers cancelled financing for the Aswan High Dam. In response, Britain, France, and Israel forged the secret Protocol of Sèvres, orchestrating **the events and significance of the Suez Crisis (1956)** through a coordinated **Israeli attack on Sinai in 1956** followed by an Anglo-French invasion of Port Said. Although militarily defeated by US and Soviet diplomatic ultimatums, Nasser emerged as a triumphant anti-imperialist hero, culminating in the **formation of the UAR in 1958** (United Arab Republic) uniting Egypt and Syria.',
      },
    ],
  },
  // KEY TOPIC 2
  {
    ktNum: 2,
    ktTitle: 'The Escalating Conflict, 1964–73',
    topics: [
      {
        code: 'KT 2.1',
        title: 'The Six Day War, 1967',
        pages: 'Spread 5 • pp. 12–13',
        blurb:
          'Arab leaders gathered to confront Israeli water diversion projects, underlining **the significance of the Cairo Conference (1964)** which created the PLO. A dangerous spiral ensued through **escalating tension between Israel, Syria and Jordan**, fueled by **Syria’s support for Fatah** guerrilla raids, a punitive **Israeli raid on Samu** in the West Bank in November 1966, and dogfights over the Golan Heights during the explosive **events of 7 April 1967**. The descent into outright conflict was accelerated by **the actions of the USSR, Nasser and the USA in the period leading to war**, as Soviet false intelligence reports warned of Israeli troop buildups, prompting Nasser to eject UNEF peacekeepers from the Sinai, mobilize troops, and close the Straits of Tiran while Washington failed to broker a maritime compromise. Facing imminent strangulation, Israel launched Operation Focus on 5 June 1967, initiating the **key events of the war** (Six-Day War) that decimated the Egyptian, Syrian, and Jordanian air forces on the tarmac in hours and crushed Arab ground forces across three fronts in just six days.',
      },
      {
        code: 'KT 2.2',
        title: 'Aftermath of the 1967 War',
        pages: 'Spreads 6–7 • pp. 14–17',
        blurb:
          "Israel’s lightning conquest resulted in **Palestinian refugees and the significance of the occupied territories: Golan Heights, Gaza Strip, West Bank, Sinai and East Jerusalem**, generating over 300,000 newly displaced Palestinians and establishing a permanent military administration over more than a million Arab residents. The United Nations Security Council passed **UN Resolution 242**, articulating the foundational 'land for peace' doctrine, but mutual intransigence and the Arab League's Khartoum 'Three Noes' sparked a **continued dispute over the Suez Canal** and the static, bloody War of Attrition (1969–70). Disillusioned with conventional Arab militaries, guerrilla factions turned to **the use of terrorism, Israel’s response and international attitudes towards the Palestine issue**, exemplified by **the PFLP airplane hijacks of 1970** to Dawson’s Field. When armed militants challenged King Hussein’s royal authority, fierce fighting in September 1970 resulted in **the expulsion of the PLO from Jordan (1970)** to Lebanon. Operating from Beirut, the militant splinter group **Black September** stunned the globe by taking hostages and murdering 11 Israeli athletes at the **Munich Olympics** in 1972, provoking ruthless Israeli targeted assassinations across Europe and the Middle East under Operation Wrath of God.",
      },
      {
        code: 'KT 2.3',
        title: 'Israel and Egypt, 1967–73',
        pages: 'Spreads 8–9 • pp. 18–21',
        blurb:
          'Following Nasser’s sudden death in 1970, Anwar Sadat dramatically recalibrated **Egyptian relations with Israel, the USA, the USSR and other Arab states**, expelling 15,000 Soviet military advisors in 1972 and forging a secret offensive alliance with Hafez al-Assad of Syria to break the diplomatic logjam. Meanwhile, Israeli hubris and construction of the formidable Bar-Lev Line reinforced **Israel’s consolidation of control of the occupied territories**. On 6 October 1973, Egyptian and Syrian forces launched Operation Badr on the Jewish holy day of Yom Kippur, triggering the **key events of the Yom Kippur War (1973) and its aftermath**. Arab armies successfully breached the Bar-Lev Line with advanced Soviet SAM missiles and anti-tank wire-guided weaponry. Although Israeli counter-offensives encircled the Egyptian Third Army following massive US emergency airlift operations, the initial military shock, painful casualties, and the punitive Arab OPEC oil embargo destroyed Israel’s illusion of permanent military invulnerability and forced direct superpower diplomatic intervention.',
      },
    ],
  },
  // KEY TOPIC 3
  {
    ktNum: 3,
    ktTitle: 'Attempts at a Solution, 1974–95',
    topics: [
      {
        code: 'KT 3.1',
        title: 'Diplomatic Negotiations',
        pages: 'Spread 10 • pp. 22–23',
        blurb:
          'The post-1973 diplomatic landscape was transformed by **the significance of the oil crisis and the involvement of the USA and the USSR**, as OPEC production cuts and quadrupled crude oil prices forced Western economies into recession and propelled Washington to prioritise Middle Eastern stability. US Secretary of State Henry **Kissinger**, pioneering **‘shuttle diplomacy’** between Cairo, Damascus, and Jerusalem, secured disengagement agreements that led to **the reopening of the Suez Canal** in 1975. In November 1977, Egyptian President Anwar Sadat stunned the world with **Sadat’s visit to Israel (1977)**, addressing the Knesset in Jerusalem with an offer of peace, followed by **Begin’s visit to Egypt (1977)** for reciprocal talks. Mediated personally by **US President Carter**, grueling negotiations produced the historic framework at **Camp David (1978)**, culminating in the formal **Treaty of Washington (1979)**. Under this landmark bilateral treaty, Israel returned the Sinai Peninsula to Egypt in exchange for mutual diplomatic recognition, ending thirty years of interstate warfare but provoking furious condemnation from the Arab League.',
      },
      {
        code: 'KT 3.2',
        title: 'The Palestinian Issue',
        pages: 'Spread 11 • pp. 24–25',
        blurb:
          "The struggle for national self-determination reached the world stage with Yasser **Arafat’s speech to the UN (1974)**, declaring he carried 'an olive branch and a freedom-fighter’s gun'. Exiled in southern Lebanon, **the significance of PLO activities in Lebanon** transformed the border region into 'Fatahland', launching cross-border rocket barrages that triggered devastating **Israeli reprisals**. In June 1982, Defense Minister Ariel Sharon orchestrated Operation Peace for Galilee, launching **the invasion of Lebanon (1982) and the results**, which besieged Beirut, expelled Arafat and 14,000 fighters to Tunisia, and led to the horrific Christian Phalangist massacre of refugees in Sabra and Shatila, permanently damaging Israel’s international reputation. Frustration at decades of military subjugation within **the Israeli occupied territories** eventually exploded in December 1987 into **the First Palestinian Intifada (1987–93)**. Characterized by mass civil disobedience, commercial strikes, and youth hurling stones against Israeli armor, the uprising shattered the myth of benign occupation and demonstrated that military force could not extinguish the Palestinian quest for statehood.",
      },
      {
        code: 'KT 3.3',
        title: 'Attempts at a Solution',
        pages: 'Spread 12 • pp. 26–27',
        blurb:
          'A diplomatic breakthrough became possible following **the significance of Arafat’s renunciation of terrorism in a speech at the UN (1988)**, in which the PLO recognized Israel’s right to exist in peace and security, opening direct talks with Washington. The regional balance of power shifted dramatically amid **changing superpower policies in the Middle East: US involvement in the Gulf War (1991), and the end of the Cold War**, which deprived Syria and the PLO of Soviet patronage while American victory over Saddam Hussein spurred the 1991 Madrid Peace Conference. Secret negotiations in Norway culminated in the historic handshake on the White House lawn between **Arafat, Rabin and the Oslo Accords (1993)**. This Declaration of Principles mandated phased Israeli military redeployment and **the setting up of the Palestinian National Authority** to govern the Gaza Strip and Jericho. The diplomatic momentum enabled King Hussein and Rabin to sign the historic **Israel-Jordan peace treaty (1994)**, followed by the signing of **Oslo II (1995)** dividing the West Bank into Areas A, B, and C. However, continuing illegal settlement expansion, extremist suicide bombings by Hamas, and the tragic assassination of Yitzhak Rabin by a Jewish ultranationalist in November 1995 tragically derailed the promise of lasting peace.',
      },
    ],
  },
];

function buildPage2Html() {
  let groupsHtml = '';
  modularTopics.forEach((group) => {
    const rowsHtml = group.topics
      .map((t) => {
        const formattedBlurb = t.blurb.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        return `
        <div class="inside-spec-row">
          <div class="isr-header">
            <div class="isr-left">
              <span class="isr-code">${t.code}</span>
              <span class="isr-question">${t.title}</span>
            </div>
            <span class="isr-pages">${t.pages}</span>
          </div>
          <p class="isr-blurb">${formattedBlurb}</p>
        </div>
      `;
      })
      .join('');

    groupsHtml += `
      <div class="inside-kt-group">
        <div class="inside-kt-header">
          <span class="ikt-badge">KEY TOPIC ${group.ktNum}</span>
          <span class="ikt-title">${group.ktTitle.toUpperCase()}</span>
        </div>
        <div class="inside-kt-rows">
          ${rowsHtml}
        </div>
      </div>
    `;
  });

  return groupsHtml;
}

console.log('Generated Page 2 HTML length:', buildPage2Html().length);
module.exports = { modularTopics, buildPage2Html };
