const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../src/flashcard_upgrades.js');
let content = fs.readFileSync(targetFile, 'utf8');

const newSplits = {
  // Subtopic 1.1
  "q_1_1_n10": {
    "context": "President Truman granted de facto recognition to the State of Israel just 11 minutes after it was declared on 14 May 1948.",
    "significance": "This immediate recognition provided vital superpower legitimacy to the new state and set a precedent for rapid Western diplomatic endorsement."
  },
  "q_1_1_s8": {
    "context": "The King David Hotel bombing in 1946 resulted in 91 deaths among Arabs, Britons, and Jews.",
    "significance": "The sheer scale of the death toll and negative publicity permanently destroyed British public morale to maintain the Mandate."
  },
  "q_1_1_d1": {
    "context": "Theodor Herzl published 'The Jewish State' in 1896, outlining the vision for a modern political Zionist movement.",
    "significance": "His writings successfully shifted the Jewish focus from a purely religious connection to the Holy Land toward a highly organised, secular political campaign."
  },
  "q_1_1_d4": {
    "context": "Under the UN Resolution 181 partition plan, the proposed Jewish state was allocated 55 percent of mandatory Palestine.",
    "significance": "This majority allocation was designed to provide enough territory to absorb the anticipated massive influx of Holocaust survivors from Europe."
  },
  "q_1_1_d5": {
    "context": "Kibbutzim were collective agricultural farming communities run on socialist principles.",
    "significance": "These communities acted as strategic, fortified military outposts that delayed Arab advances during the 1948 war."
  },
  "q_1_1_n13": {
    "context": "Menachem Begin led the right-wing Zionist paramilitary group, the Irgun, from 1944 to 1948.",
    "significance": "Under his command, the group carried out militant attacks like the King David Hotel bombing, later transitioning to mainstream politics and serving as Prime Minister."
  },
  "q_1_1_n14": {
    "context": "Aliyah Bet was the code name given to illegal immigration into Mandatory Palestine between 1934 and 1948.",
    "significance": "This clandestine movement bypassed British blockade quotas, bringing hundreds of thousands of Holocaust survivors to Palestine."
  },

  // Subtopic 1.2
  "q_1_2_n4": {
    "context": "The Diaspora refers to the communities of Jewish people living outside the Land of Israel, scattered across the world.",
    "significance": "This global dispersion meant the 1950 Law of Return was essential to grant these scattered populations immediate citizenship and a safe haven."
  },
  "q_1_2_n5": {
    "context": "The Israeli Lira (or Pound) was introduced in 1952, replacing the Palestine Pound.",
    "significance": "This currency transition established economic sovereignty separate from British currency systems."
  },
  "q_1_2_n6": {
    "context": "UN mediator Ralph Bunche negotiated the 1949 armistice agreements after the assassination of Count Folke Bernadotte.",
    "significance": "He successfully brokered the armistices, winning the Nobel Peace Prize for his mediation efforts."
  },
  "q_1_2_n8": {
    "context": "Tzena was a strict economic austerity and food rationing policy introduced in Israel in 1949.",
    "significance": "This rationing was essential to ensure the survival of the state during a massive influx of double the existing population."
  },
  "q_1_2_n9": {
    "context": "West German Chancellor Konrad Adenauer signed the Reparations Agreement with Israel in September 1952.",
    "significance": "The agreement to pay reparations for the Holocaust provided vital financial aid that helped support Israel's early economy."
  },
  "q_1_2_n10": {
    "context": "The final armistice agreement of the 1948-49 war was signed with Syria on 20 July 1949.",
    "significance": "This concluded the formal fighting of the war, establishing de facto borders but leaving permanent political peace unresolved."
  },
  "q_1_2_d1": {
    "context": "Operation Black Arrow was a massive Israeli reprisal attack on the Egyptian army headquarters in Gaza on 28 February 1955.",
    "significance": "This attack convinced Egyptian President Nasser that his military was too weak, prompting him to sign the 1955 Czech arms deal."
  },
  "q_1_2_d2": {
    "context": "Ariel Sharon commanded the Paratroopers Brigade that led the 1955 attack on Gaza.",
    "significance": "His aggressive leadership established a reputation for ruthless reprisal tactics, foreshadowing his future political and military roles."
  },
  "q_1_2_d3": {
    "context": "Eilat was Israel's only southern port, located on the Gulf of Aqaba.",
    "significance": "The economic blockade of the Straits of Tiran by Egypt cut off this port, strangling vital trade routes to Asia and East Africa."
  },
  "q_1_2_d5": {
    "context": "The 1952 Reparations Agreement committed West Germany to pay compensation to Israel for the Holocaust.",
    "significance": "This agreement provided Israel with hundreds of millions of dollars in foreign currency and equipment, essential for absorbing massive immigration."
  },
  "q_1_2_n11": {
    "context": "The US government extended a vital $100 million Export-Import Bank credit loan to Israel in early 1949.",
    "significance": "This loan allowed Israel to purchase agricultural and industrial equipment to build its early infrastructure."
  },
  "q_1_2_n12": {
    "context": "King Abdullah I of Jordan was assassinated at the Al-Aqsa Mosque in Jerusalem in 1951.",
    "significance": "He was killed by a Palestinian nationalist who feared the King was negotiating a separate peace treaty with Israel."
  },
  "q_1_2_n13": {
    "context": "Under the 1949 armistice agreements, Egypt took administrative and military control of the Gaza Strip.",
    "significance": "Egypt kept the borders closed and did not annex the territory, leaving the large Palestinian refugee population stateless."
  },

  // Subtopic 1.3
  "q_1_3_n7": {
    "context": "Israeli Chief of Staff Moshe Dayan planned and led the swift armored campaign across the Sinai Peninsula in 1956.",
    "significance": "This campaign cemented his military reputation and demonstrated the effectiveness of Israel's mobile armored warfare."
  },
  "q_1_3_n8": {
    "context": "Soviet Premier Nikita Khrushchev threatened rocket strikes on London and Paris during the 1956 Suez Crisis.",
    "significance": "This threat boosted Soviet prestige in the Middle East and successfully diverted global attention from the Hungarian Uprising."
  },
  "q_1_3_n9": {
    "context": "Syria withdrew from the United Arab Republic in 1961 following a military coup.",
    "significance": "This withdrawal ended the political union with Egypt, driven by Syrian resentment over Egyptian dominance of their economy and military."
  },
  "q_1_3_d2": {
    "context": "Moshe Sharett served as Prime Minister of Israel from 1954 to 1955.",
    "significance": "His moderate tenure was marked by a constant struggle against the aggressive, retaliatory defence policies championed by Moshe Dayan and David Ben-Gurion."
  },
  "q_1_3_d4": {
    "context": "Operation Kadesh was the official Israeli military codename for the invasion of the Sinai Peninsula in October 1956.",
    "significance": "The operation relied heavily on rapid armored thrusts and paratroop drops to overwhelm Egyptian forces."
  },
  "q_1_3_d5": {
    "context": "Under the Protocol of Sèvres, Britain and France planned to issue an ultimatum demanding both sides withdraw from the Suez Canal.",
    "significance": "This ultimatum served as a false pretext to justify their pre-planned military intervention after Israel invaded Egypt."
  },
  "q_1_3_n11": {
    "context": "The secret Protocol of Sèvres planned for Britain and France to issue their ultimatum 36 hours after the Israeli attack.",
    "significance": "This tight timing was designed to give the appearance of an emergency intervention to separate the combatants."
  },
  "q_1_3_n12": {
    "context": "Egypt signed the Czech Arms Deal in September 1955, importing Soviet weapons into the Middle East.",
    "significance": "This deal bypassed Western arms restrictions and alarmed Israel with modern Soviet tanks and fighter jets."
  },
  "q_1_3_n13": {
    "context": "French Prime Minister Guy Mollet signed the secret Protocol of Sèvres in 1956.",
    "significance": "He strongly supported the alliance with Israel because he believed Egyptian President Nasser was actively funding Algerian rebels."
  },
  "q_1_3_n15": {
    "context": "Syrian President Shukri al-Quwatli signed the 1958 treaty of union with Egypt to form the United Arab Republic.",
    "significance": "This union was co-declared with Nasser, representing the height of Pan-Arab political integration."
  },

  // Subtopic 2.1
  "q_2_1_n6": {
    "context": "Israel captured the Golan Heights from Syria on 9-10 June 1967.",
    "significance": "This strategic plateau was captured to halt Syrian artillery shelling of northern Israeli agricultural settlements."
  },
  "q_2_1_n9": {
    "context": "The Six Day War occurred between 5 June and 10 June 1967.",
    "significance": "This brief conflict altered Middle Eastern politics forever, expanding Israeli-controlled territory three-fold."
  },
  "q_2_1_n10": {
    "context": "Egyptian Field Marshal Abdel Hakim Amer committed suicide in September 1967 while under house arrest.",
    "significance": "He was blame-shifted for the catastrophic military defeat of the Egyptian armed forces."
  },
  "q_2_1_n11": {
    "context": "The USS Liberty, an American intelligence ship, was attacked by Israeli aircraft and torpedo boats on 8 June 1967.",
    "significance": "The attack killed 34 crew members; Israel claimed it was a tragic case of mistaken identity."
  },
  "q_2_1_n14": {
    "context": "Yitzhak Rabin served as Chief of Staff of the IDF from 1964 to 1968.",
    "significance": "He planned and executed the rapid campaigns that secured Israel's victory in the 1967 Six Day War."
  },
  "q_2_1_n15": {
    "context": "Hafez al-Assad served as the Syrian Defence Minister during the buildup to the 1967 war.",
    "significance": "He adopted a highly aggressive stance against Israel, later utilizing the military's influence to seize the presidency in 1970."
  },

  // Subtopic 2.2
  "q_2_2_n4": {
    "context": "The United States backed Israel with economic and military aid during the War of Attrition.",
    "significance": "This support, including supplying Phantom fighter jets, was intended to prevent Soviet dominance in the region."
  },
  "q_2_2_n5": {
    "context": "The Soviet Union supplied Egypt with SAM missiles and thousands of military advisers during the War of Attrition.",
    "significance": "This advanced air defense assistance was deployed to counter deep-penetration Israeli air strikes."
  },
  "q_2_2_s7": {
    "context": "Realising conventional armies could not defeat Israel, Palestinian groups shifted to international terror attacks.",
    "significance": "This asymmetric strategy aimed to force the global community to address their statelessness and national cause."
  },
  "q_2_2_n10": {
    "context": "King Hussein of Jordan launched a military offensive to expel the PLO in September 1970 (Black September).",
    "significance": "This campaign restored Jordanian sovereignty against the PLO's growing 'state-within-a-state' influence."
  },
  "q_2_2_d5": {
    "context": "Prime Minister Golda Meir ordered Mossad's assassination campaign under Operation Wrath of God.",
    "significance": "Her unyielding stance defined Israel's response to global terrorism, establishing a policy of absolute refusal to negotiate with hijackers."
  },
  "q_2_2_n11": {
    "context": "Wrestling coach Moshe Weinberg was the first athlete killed during the 1972 Munich Olympics hostage crisis.",
    "significance": "He died trying to block the door and fight off the armed terrorists, giving other team members time to escape."
  },
  "q_2_2_n12": {
    "context": "The PFLP hijacked four international aircraft and flew them to Dawson's Field in Jordan on 6 September 1970.",
    "significance": "This spectacular hijacking precipitated the Black September civil war between the Jordanian army and PLO."
  },
  "q_2_2_n13": {
    "context": "Wael Zuaiter was shot in Rome in October 1972 as the first target of Mossad's Operation Wrath of God.",
    "significance": "Mossad accused the PLO representative of being a key Black September organizer behind the Munich massacre."
  },
  "q_2_2_n14": {
    "context": "Ain al-Hilweh near Sidon became the largest Palestinian refugee camp in South Lebanon.",
    "significance": "Following their expulsion from Jordan, Fatah established its primary military and administrative headquarters in this camp."
  },
  "q_2_2_n15": {
    "context": "Field Marshal Habis al-Majali commanded the Jordanian Army during Black September in 1970.",
    "significance": "He was appointed military governor by King Hussein to direct the campaign that successfully expelled the PLO."
  },

  // Subtopic 2.3
  "q_2_3_s4": {
    "context": "Israeli settlements were heavily subsidized towns built by Israel in the occupied West Bank, Gaza, and Golan.",
    "significance": "These fortified communities were intended to create permanent 'facts on the ground' to secure territorial control."
  },
  "q_2_3_n3": {
    "context": "Golda Meir served as Prime Minister of Israel during the 1973 Yom Kippur War.",
    "significance": "She led the country through the initial shock of the surprise attack, resigning in 1974 due to public anger over intelligence failures."
  },
  "q_2_3_n4": {
    "context": "Egyptian forces crossed the Suez Canal during the opening hours of the Yom Kippur War.",
    "significance": "This amphibious crossing successfully breached the Bar-Lev Line sand fortifications, restoring Egyptian national pride."
  },
  "q_2_3_n5": {
    "context": "OPEC cut oil exports and embargoed the West during the 1973 Yom Kippur War.",
    "significance": "This economic pressure forced Western nations to actively urge Israel to negotiate ceasefires and land pullbacks."
  },
  "q_2_3_s2": {
    "context": "Anwar Sadat expelled 15,000 Soviet military advisers from Egypt in July 1972.",
    "significance": "This expulsion was a major diplomatic gamble designed to court US favor and break the superpower stalemate."
  },
  "q_2_3_s7": {
    "context": "Soviet-built SAM surface-to-air missiles protected the Egyptian advance across the Suez Canal.",
    "significance": "These missiles created an anti-aircraft 'umbrella' that neutralized Israel's air superiority during the opening days."
  },
  "q_2_3_n6": {
    "context": "Operation Nickel Grass was the code name for the massive US military airlift to Israel in October 1973.",
    "significance": "President Nixon ordered this emergency airlift of 22,000 tons of supplies to counter Soviet resupply of Arab states."
  },
  "q_2_3_n7": {
    "context": "General Ariel Sharon commanded the IDF division that crossed the Suez Canal in October 1973.",
    "significance": "His daring counter-crossing encircled the Egyptian Third Army and turned the military tide of the war."
  },
  "q_2_3_n8": {
    "context": "The Purple Line was the de facto border line between Israel and Syria after 1967.",
    "significance": "Israel broke through this line during its counter-offensive, advancing to threaten Damascus."
  },
  "q_2_3_n9": {
    "context": "Richard Nixon served as President of the United States during the 1973 Yom Kippur War.",
    "significance": "He coordinated the emergency military airlift to Israel and worked with the Soviet Union to pass UN ceasefires."
  },
  "q_2_3_n10": {
    "context": "The Yom Kippur War began on 6 October and ended with ceasefires in late October 1973.",
    "significance": "This war shattered Israel's complacency and initiated a diplomatic process that led to the Camp David Accords."
  },
  "q_2_3_d2": {
    "context": "IDF Chief of Staff David 'Dado' Elazar was forced to resign following the findings of the Agranat Commission.",
    "significance": "He took the blame for the initial intelligence failures despite having successfully commanded the military counter-offensive."
  },
  "q_2_3_d5": {
    "context": "King Hussein of Jordan secretly flew to Tel Aviv to warn Prime Minister Golda Meir of the impending attack in September 1973.",
    "significance": "This secret meeting highlighted complex back-channel relations, though Meir chose not to launch a pre-emptive strike."
  },
  "q_2_3_n11": {
    "context": "Operation Badr was the code name for the Egyptian plan to cross the Suez Canal in October 1973.",
    "significance": "The plan succeeded in breaching the Bar-Lev Line, catching the Israeli military completely off guard."
  },
  "q_2_3_n12": {
    "context": "Major General Eli Zeira served as Director of Israeli Military Intelligence (Aman) during the Yom Kippur War.",
    "significance": "The Agranat Commission criticized him for failing to warn the cabinet due to dogmatic intelligence assumptions."
  },
  "q_2_3_n15": {
    "context": "Egyptian President Anwar Sadat expelled all 15,000 Soviet military advisers in July 1972.",
    "significance": "This move signaled Egypt's independence from Moscow in an effort to secure diplomatic support from Washington."
  },

  // Subtopic 3.1
  "q_3_1_s10": {
    "context": "The Treaty of Washington, signed in March 1979, legally codified the Camp David Accords.",
    "significance": "The treaty established formal peace between Egypt and Israel, cemented by billions of dollars in US economic and military aid."
  },
  "q_3_1_n1": {
    "context": "The Camp David Accords were signed on 17 September 1978.",
    "significance": "These accords laid the legal framework for a formal peace treaty between Egypt and Israel, returning the Sinai to Egypt."
  },
  "q_3_1_n2": {
    "context": "US President Jimmy Carter hosted and mediated the secret talks at Camp David in September 1978.",
    "significance": "His intense personal mediation over 13 days was the critical factor that broke the deadlock between Begin and Sadat."
  },
  "q_3_1_n3": {
    "context": "Menachem Begin was the Likud Prime Minister of Israel who signed the 1978 Camp David Accords.",
    "significance": "He made the strategic decision to exchange the Sinai Peninsula for a permanent peace treaty with Egypt, neutralizing Israel's largest military opponent."
  },
  "q_3_1_n5": {
    "context": "Camp David is the official mountain retreat for the President of the United States in Maryland.",
    "significance": "This secluded location was chosen by Carter to isolate the leaders from media and domestic political pressures."
  },
  "q_3_1_s4": {
    "context": "Shuttle Diplomacy refers to the process of a mediator flying back and forth between hostile capitals.",
    "significance": "Pioneered by Henry Kissinger, this was the only practical way to build trust, as Arab leaders initially refused to meet Israelis directly."
  },
  "q_3_1_s7": {
    "context": "Anwar Sadat traveled to Jerusalem in November 1977 to address the Knesset directly.",
    "significance": "This speech allowed him to bypass diplomatic channels and speak directly to the Israeli public, proposing a comprehensive peace."
  },
  "q_3_1_s9": {
    "context": "Jimmy Carter hosted Menachem Begin and Anwar Sadat at the secluded Camp David retreat in September 1978.",
    "significance": "The isolated setting forced the two leaders to negotiate directly, culminating in the first Arab-Israeli peace accords."
  },
  "q_3_1_n6": {
    "context": "Hosni Mubarak succeeded Anwar Sadat as President of Egypt in October 1981.",
    "significance": "He maintained the peace treaty with Israel and ruled Egypt for the next 30 years, stabilizing regional relations."
  },
  "q_3_1_n7": {
    "context": "Anwar Sadat delivered his Knesset Speech in Jerusalem in November 1977.",
    "significance": "This historic speech proposed a peaceful resolution while firmly defending Palestinian rights and Arab sovereignty."
  },
  "q_3_1_n9": {
    "context": "Anwar Sadat was assassinated by Islamist soldiers during a military parade in Cairo in October 1981.",
    "significance": "The assassins opposed the peace treaty with Israel, highlighting the dangerous domestic backlash to his diplomacy."
  },
  "q_3_1_n10": {
    "context": "The Arab League expelled Egypt in 1979 and moved its headquarters from Cairo to Tunis.",
    "significance": "This expulsion reflected the intense Arab anger at Sadat for signing a separate peace treaty that ignored wider Palestinian rights."
  },
  "q_3_1_d2": {
    "context": "Egyptian Foreign Minister Muhammad Ibrahim Kamel resigned on the final day of the Camp David summit.",
    "significance": "His resignation highlighted deep internal divisions, as he believed Sadat had compromised too much on Palestinian self-rule."
  },
  "q_3_1_d3": {
    "context": "The USA hosted secret preliminary talks between Israeli and Egyptian foreign ministers at Leeds Castle in July 1978.",
    "significance": "These talks broke a dangerous diplomatic freeze and convinced Carter to invite the leaders to Camp David."
  },
  "q_3_1_d4": {
    "context": "The Sinai II agreement was signed in September 1975, prompting Israeli withdrawal from strategic passes.",
    "significance": "This interim agreement was a key milestone, as it contained the first official statement that the conflict should not be resolved by military force."
  },
  "q_3_1_d5": {
    "context": "Aharon Barak served as the brilliant Israeli legal advisor during the Camp David talks.",
    "significance": "His legal drafting allowed both Begin and Sadat to claim political victories to their respective home audiences."
  },
  "q_3_1_n12": {
    "context": "Henry Kissinger flew constantly between Cairo, Tel Aviv, and Damascus to negotiate troop disengagements between 1974 and 1975.",
    "significance": "His shuttle diplomacy successfully sidelined Soviet influence and established the US as the primary peace-broker."
  },
  "q_3_1_n13": {
    "context": "Boutros Boutros-Ghali served as Egypt's Minister of State for Foreign Affairs during the Camp David talks.",
    "significance": "He accompanied Sadat to Camp David, playing a vital role in drafting the legal frameworks for peace."
  },
  "q_3_1_n14": {
    "context": "The formal Egypt-Israel Peace Treaty was signed on the White House lawn in March 1979.",
    "significance": "This treaty ended thirty years of war between the two nations, transforming the geopolitical balance of the Middle East."
  },

  // Subtopic 3.2
  "q_3_2_s6": {
    "context": "The attempted assassination of the Israeli ambassador in London in June 1982 was used as a pretext by Ariel Sharon.",
    "significance": "He used the outrage to launch a long-planned, full-scale military invasion to destroy the PLO in Lebanon."
  },
  "q_3_2_s10": {
    "context": "An IDF truck crashed into civilian cars in Gaza in December 1987, killing four Palestinians.",
    "significance": "This accident sparked a spontaneous, nationwide civilian uprising known as the First Intifada."
  },
  "q_3_2_n1": {
    "context": "The First Intifada erupted in December 1987 in Gaza and the West Bank.",
    "significance": "This grassroots rebellion combined strikes, civil disobedience, and stone-throwing, proving the military occupation was unsustainable."
  },
  "q_3_2_n2": {
    "context": "Yasser Arafat commanded PLO forces in Beirut during the 1982 Lebanon War.",
    "significance": "He eventually agreed to evacuate his forces to Tunisia under a US-brokered deal, ending the PLO's military presence in Lebanon."
  },
  "q_3_2_n3": {
    "context": "Beirut, the capital of Lebanon, was besieged and bombarded by Israeli forces in 1982.",
    "significance": "The siege caused massive civilian casualties and international outcry, forcing a negotiated PLO withdrawal."
  },
  "q_3_2_n5": {
    "context": "The First Palestinian Intifada began on 9 December 1987.",
    "significance": "This uprising shifted the center of gravity of the Palestinian national movement back to the occupied territories."
  },
  "q_3_2_s7": {
    "context": "Operation Peace for Galilee was the official Israeli military codename for the 1982 invasion of Lebanon.",
    "significance": "Originally presented as a limited 40km incursion, it rapidly expanded into a full-scale assault to capture Beirut."
  },
  "q_3_2_n6": {
    "context": "The Phalangists, a Lebanese Christian militia, carried out the Sabra and Shatila massacre in September 1982.",
    "significance": "They entered the refugee camps and slaughtered hundreds of Palestinian civilians to avenge the assassination of their leader."
  },
  "q_3_2_n7": {
    "context": "The 1983 Kahan Commission investigated the Sabra and Shatila massacre.",
    "significance": "The commission found Defence Minister Ariel Sharon personally responsible for failing to anticipate the danger of letting Phalangist militias into the camps."
  },
  "q_3_2_n8": {
    "context": "IDF Chief of Staff Rafael Eitan was reprimanded by the Kahan Commission in 1983.",
    "significance": "He was criticized for failing to coordinate and intervene to halt the massacres at Sabra and Shatila."
  },
  "q_3_2_n9": {
    "context": "The PLO headquarters was forced to relocate from Beirut to Tunis, Tunisia, in 1982.",
    "significance": "This expulsion distanced the PLO leadership from the borders of Israel, reducing their ability to launch cross-border attacks."
  },
  "q_3_2_n10": {
    "context": "Ariel Sharon served as Israeli Defence Minister during the 1982 invasion of Lebanon.",
    "significance": "He directed the war all the way to Beirut, but was forced to resign his post in early 1983 following the Kahan Commission findings."
  },
  "q_3_2_d1": {
    "context": "The Coastal Road Massacre was a 1978 Palestinian terror attack where a hijacked bus resulted in 38 Israeli deaths.",
    "significance": "This tragedy deeply traumatised the Israeli public and prompted the first major invasion of South Lebanon (Operation Litani)."
  },
  "q_3_2_d2": {
    "context": "Bashir Gemayel, the newly elected Lebanese President and close ally of Israel, was assassinated in September 1982.",
    "significance": "His death shattered Israel's plans for a formal peace treaty with Lebanon and triggered the Phalangist massacres."
  },
  "q_3_2_d3": {
    "context": "Israeli Prime Minister Menachem Begin authorized the 1982 invasion of Lebanon.",
    "significance": "Deeply depressed by the mounting military casualties and public protests, he resigned from office in late 1983."
  },
  "q_3_2_n11": {
    "context": "The First Palestinian Intifada broke out on 9 December 1987 in the Jabalia refugee camp.",
    "significance": "This spontaneous rebellion took both Israeli intelligence and the exiled PLO leadership completely by surprise."
  },
  "q_3_2_n13": {
    "context": "Israel sent 25,000 troops into South Lebanon during the limited Operation Litani in March 1978.",
    "significance": "The invasion cleared PLO bases south of the Litani River, withdrawing only after UNIFIL peacekeepers arrived."
  },

  // Subtopic 3.3
  "q_3_3_s7": {
    "context": "Israeli and PLO negotiators began secret, back-channel meetings in Oslo, Norway, in 1993.",
    "significance": "These private talks allowed negotiators to make painful compromises away from the media spotlight."
  },
  "q_3_3_s8": {
    "context": "Yitzhak Rabin and Yasser Arafat shared a historic handshake on the White House lawn in September 1993.",
    "significance": "This highly televised gesture symbolised the end of decades of mutual denial and the start of a peace process."
  },
  "q_3_3_n1": {
    "context": "Israeli Prime Minister Yitzhak Rabin signed the Oslo Accords alongside Yasser Arafat in 1993.",
    "significance": "He made the historic decision to recognize the PLO and grant limited self-rule, which won him the Nobel Peace Prize but cost him his life."
  },
  "q_3_3_n4": {
    "context": "US President Bill Clinton hosted the signing ceremony for the Oslo I Accords in September 1993.",
    "significance": "He facilitated the public signing and handshake on the White House lawn, positioning the US as the guarantor of the peace process."
  },
  "q_3_3_s4": {
    "context": "Iraqi dictator Saddam Hussein invaded Kuwait in August 1990, splitting the Arab world.",
    "significance": "Yasser Arafat's decision to support Saddam alienated wealthy Gulf states, who cut off funding to the PLO and forced them to negotiate."
  },
  "q_3_3_s6": {
    "context": "The USA and USSR co-sponsored the Madrid Peace Conference in November 1991.",
    "significance": "This landmark conference represented the first time Israelis, Palestinians, and Arab states sat down to negotiate directly."
  },
  "q_3_3_s9": {
    "context": "The Oslo Accords established the Palestinian National Authority (PNA) to administer parts of the West Bank and Gaza.",
    "significance": "This governing body provided limited self-rule, establishing Palestinian administrative and security control in designated zones."
  },
  "q_3_3_n5": {
    "context": "The Madrid Conference of November 1991 co-opened direct bilateral peace talks in Spain.",
    "significance": "It broke the diplomatic taboo of direct negotiation, opening the path to subsequent secret talks in Oslo."
  },
  "q_3_3_n6": {
    "context": "Israel and Jordan signed a formal bilateral peace treaty on 26 October 1994.",
    "significance": "This treaty resolved long-standing border and water disputes, establishing Jordan as the second Arab state to recognize Israel."
  },
  "q_3_3_n8": {
    "context": "Shimon Peres succeeded Yitzhak Rabin as Prime Minister of Israel in November 1995.",
    "significance": "He assumed office to continue the peace process, but faced rising right-wing opposition and a wave of Hamas suicide bombings."
  },
  "q_3_3_d2": {
    "context": "Norwegian Foreign Minister Johan Jørgen Holst hosted and mediated the secret talks in 1992-1993.",
    "significance": "He provided the secluded, pressure-free environment in Norway that was essential for building personal trust between the negotiators."
  },
  "q_3_3_d3": {
    "context": "Under the 1995 Oslo II agreement, only 3 percent of the West Bank was designated as 'Area A' under full Palestinian control.",
    "significance": "This tiny fraction demonstrated the limited nature of Israeli withdrawal, fueling deep Palestinian frustration."
  },
  "q_3_3_d5": {
    "context": "Yigal Amir, a religious Israeli extremist, assassinated Prime Minister Yitzhak Rabin in November 1995.",
    "significance": "His actions shattered the peace consensus in Israel and empowered hardline opponents to derail the Oslo Accords."
  },
  "q_3_3_d8": {
    "context": "Mahmoud Abbas (Abu Mazen) served as the key PLO diplomat coordinating the secret negotiations in Oslo.",
    "significance": "He directed the back-channel talks behind the scenes and signed the Declaration of Principles on the White House lawn."
  },
  "q_3_3_n9": {
    "context": "The UN General Assembly held a special session in Geneva in December 1988 so Yasser Arafat could speak.",
    "significance": "This session allowed him to deliver his historic speech renouncing terrorism and recognizing Israel's right to exist."
  },
  "q_3_3_n10": {
    "context": "Under the 1995 Oslo II Accord, Area C remained under full Israeli military and civil control.",
    "significance": "Area C covered about 60% of the West Bank, enclosing all Jewish settlements and strategic security zones under Israeli administration."
  },
  "q_3_3_n11": {
    "context": "Yitzhak Rabin was assassinated at a peace rally in Tel Aviv on 4 November 1995.",
    "significance": "His tragic death removed the key architect of the peace process, allowing hardline opposition on both sides to derail the Oslo Accords."
  }
};

// Now we parse targetFile and insert these splits
const splitsObjectStart = content.indexOf('export const EXPLANATION_SPLITS = {');
if (splitsObjectStart === -1) {
  console.error("Could not find EXPLANATION_SPLITS definition!");
  process.exit(1);
}

// Find the opening brace '{'
const openingBraceIndex = content.indexOf('{', splitsObjectStart);
if (openingBraceIndex === -1) {
  console.error("Could not find opening brace for EXPLANATION_SPLITS!");
  process.exit(1);
}

// Prepare the string of new splits
let newSplitsStr = "";
for (const [key, value] of Object.entries(newSplits)) {
  newSplitsStr += `\n  "${key}": {\n    "context": "${value.context}",\n    "significance": "${value.significance}"\n  },`;
}

// Inject right after '{'
const updatedContent = content.substring(0, openingBraceIndex + 1) + newSplitsStr + content.substring(openingBraceIndex + 1);

fs.writeFileSync(targetFile, updatedContent, 'utf8');
console.log("Successfully injected 115 new custom splits into src/flashcard_upgrades.js!");
