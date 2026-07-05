export interface ActiveFigure {
  key: string;
  quote?: string;
  question: string;
  answer: string;
}

export interface FigureBio {
  name: string;
  role: string;
  bio: string;
  image?: string;
  sourceUrl?: string;
}

export const ACTIVE_FIGURES: ActiveFigure[] = [
{
    key: 'david ben-gurion',
    quote: "In Israel, in order to be a realist you must believe in miracles.",
    question: "Which declaration of independence did Ben-Gurion read in Tel Aviv on 14 May 1948?",
    answer: "Declaration of the Establishment of the State of Israel"
  },
  {
    key: 'menachem begin',
    quote: "Peace is the beauty of life. It is sunshine. It is the smile of a child.",
    question: "Which right-wing political party did Menachem Begin found in 1973, which won power in 1977?",
    answer: "Likud"
  },
  {
    key: 'yitzhak rabin',
    quote: "We say to you, in a loud and clear voice: Enough of blood and tears. Enough!",
    question: "Which peace agreements did Yitzhak Rabin sign in 1993 with Yasser Arafat?",
    answer: "The Oslo I Accord"
  },
  {
    key: 'golda meir',
    quote: "Peace will come when the Arabs will love their children more than they hate us.",
    question: "Which war in October 1973 caught Israel by surprise during Golda Meir's premiership?",
    answer: "Yom Kippur War"
  },
  {
    key: 'moshe dayan',
    quote: "If you want to make peace, you don't talk to your friends. You talk to your enemies.",
    question: "Moshe Dayan served as Minister of Defence during which lightning June 1967 war?",
    answer: "The Six-Day War"
  },
  {
    key: 'ariel sharon',
    quote: "The security of Israel is the supreme goal.",
    question: "Which country did Ariel Sharon lead the invasion of in 1982 to drive out the PLO?",
    answer: "Lebanon"
  },
  {
    key: 'levi eshkol',
    quote: "The threat of war hangs over our heads.",
    question: "Which war broke out in June 1967 when Levi Eshkol was Prime Minister of Israel?",
    answer: "The Six-Day War"
  },
  {
    key: 'yitzhak shamir',
    quote: "No one can teach us about the pain of exile.",
    question: "Which international conference did Yitzhak Shamir attend in 1991 to negotiate with Arab states?",
    answer: "Madrid Peace Conference"
  },
  {
    key: 'yasser arafat',
    quote: "I come bearing an olive branch and a freedom fighter's gun. Do not let the olive branch fall from my hand.",
    question: "Which political group did Yasser Arafat lead, serving as Chairman of the PLO from 1969?",
    answer: "Fatah"
  },
  {
    key: 'george habash',
    quote: "Our goal is the liberation of all Palestine, by any means necessary.",
    question: "Which radical group did George Habash found, which carried out aircraft hijackings in 1970?",
    answer: "Popular Front for the Liberation of Palestine (PFLP)"
  },
  {
    key: 'mahmoud abbas',
    quote: "We want a peaceful resolution, a state of our own alongside Israel.",
    question: "Which agreements did Mahmoud Abbas negotiate in secret in Norway in 1993?",
    answer: "The Oslo Accords"
  },
  {
    key: 'haj amin al-husseini',
    quote: "We must defend our holy land from Zionist colonization.",
    question: "What religious title did Haj Amin al-Husseini hold as the leader of Palestinian Arabs under British Mandate?",
    answer: "Grand Mufti of Jerusalem"
  },
  {
    key: 'gamal abdel nasser',
    quote: "We will not accept any coexistence with Israel. Today the issue is not the frontier but the existence of Israel.",
    question: "Which major waterway did Nasser nationalise in July 1956, triggering the Suez Crisis?",
    answer: "The Suez Canal"
  },
  {
    key: 'anwar sadat',
    quote: "I have come to you today on solid ground, to shape a new life, to establish peace.",
    question: "Which peace accords did Anwar Sadat sign with Menachem Begin at the US presidential retreat in 1978?",
    answer: "The Camp David Accords"
  },
  {
    key: 'hosni mubarak',
    quote: "Stability is the foundation of economic progress and regional peace.",
    question: "Following whose assassination in October 1981 did Hosni Mubarak become President of Egypt?",
    answer: "Anwar Sadat"
  },
  {
    key: 'king hussein',
    quote: "Jordan has a boundary of over 600 kilometers with Israel. We are at the heart of this conflict.",
    question: "Which militant group's forces did King Hussein expel from Jordan during the 'Black September' of 1970?",
    answer: "The Palestine Liberation Organisation (PLO)"
  },
  {
    key: 'king abdullah',
    quote: "We must preserve the Arab character of Jerusalem and protect its holy sites.",
    question: "Which elite British-trained army did King Abdullah lead in the 1948 Arab-Israeli War?",
    answer: "The Arab Legion"
  },
  {
    key: 'hafez al-assad',
    quote: "Syria will never surrender its sovereign rights or its land.",
    question: "Which occupied mountain territory did Hafez al-Assad attempt to recapture from Israel in the 1973 Yom Kippur War?",
    answer: "The Golan Heights"
  },
  {
    key: 'saddam hussein',
    quote: "The road to Jerusalem lies through Kuwait.",
    question: "Which country did Saddam Hussein invade in August 1990, triggering the Gulf War?",
    answer: "Kuwait"
  },
  {
    key: 'henry kissinger',
    quote: "Shuttle diplomacy is about creating options.",
    question: "What term describes Kissinger's diplomatic method of flying back and forth between capitals in 1974?",
    answer: "Shuttle Diplomacy"
  },
  {
    key: 'jimmy carter',
    quote: "We must adapt to changing times with unchanging principles.",
    question: "Where did President Jimmy Carter host Anwar Sadat and Menachem Begin for peace talks in September 1978?",
    answer: "Camp David"
  },
  {
    key: 'bill clinton',
    quote: "The future is not a gift: it is an achievement.",
    question: "On the lawn of which building did President Bill Clinton host the Rabin-Arafat handshake in September 1993?",
    answer: "The White House"
  },
  {
    key: 'mikhail gorbachev',
    quote: "If not me, who? If not now, when?",
    question: "Which major Cold War superpower did Mikhail Gorbachev lead, which collapsed in 1991?",
    answer: "The Soviet Union (USSR)"
  },
  {
    key: 'george h.w. bush',
    quote: "A new world order is emerging.",
    question: "Which international peace conference in October 1991 did President George H.W. Bush co-sponsor with the USSR?",
    answer: "The Madrid Conference"
  },
  {
    key: 'ernest bevin',
    quote: "The Palestine problem is unworkable under the Mandate.",
    question: "Which international organization did Ernest Bevin hand the Palestine Mandate problem to in 1947?",
    answer: "The United Nations (UN)"
  },
  {
    key: 'count folke bernadotte',
    quote: "I am ready to take any risk to bring peace to this land.",
    question: "Which extremist Zionist paramilitary group assassinated Count Folke Bernadotte in Jerusalem in September 1948?",
    answer: "Lehi (also known as the Stern Gang)"
  }
];

export const KEY_FIGURES_BIO: Record<string, FigureBio> = {
"david ben-gurion": {
    name: "David Ben-Gurion",
    role: "First Prime Minister of Israel & Zionist Leader",
    bio: "The indispensable leader of the Zionist movement who officially declared the creation of the State of Israel in May 1948 and served as its first Prime Minister.",
    image: "assets/sources/portraits/david_ben_gurion.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/David_Ben-Gurion"
  },
  "ben-gurion": {
    name: "David Ben-Gurion",
    role: "First Prime Minister of Israel & Zionist Leader",
    bio: "The indispensable leader of the Zionist movement who officially declared the creation of the State of Israel in May 1948 and served as its first Prime Minister.",
    image: "assets/sources/portraits/david_ben_gurion.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/David_Ben-Gurion"
  },
  "menachem begin": {
    name: "Menachem Begin",
    role: "Prime Minister of Israel (1977–1983)",
    bio: "Originally the leader of the militant Irgun group (which carried out the King David Hotel bombing and the Deir Yassin massacre), he later founded the right-wing Likud party, became Prime Minister, and signed the historic Camp David Accords and the 1979 peace treaty with Egypt.",
    image: "assets/sources/portraits/menachem_begin.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Menachem_Begin"
  },
  "begin": {
    name: "Menachem Begin",
    role: "Prime Minister of Israel (1977–1983)",
    bio: "Originally the leader of the militant Irgun group (which carried out the King David Hotel bombing and the Deir Yassin massacre), he later founded the right-wing Likud party, became Prime Minister, and signed the historic Camp David Accords and the 1979 peace treaty with Egypt.",
    image: "assets/sources/portraits/menachem_begin.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Menachem_Begin"
  },
  "yitzhak rabin": {
    name: "Yitzhak Rabin",
    role: "Prime Minister of Israel (1974–77, 1992–95)",
    bio: "A prominent IDF commander during the 1948 and 1967 wars who later served as Prime Minister. He implemented the harsh 'Iron Fist' policy during the First Intifada, but later famously shook hands with Yasser Arafat to sign the Oslo Accords in 1993, for which he won the Nobel Peace Prize. He was assassinated in 1995 by an Israeli right-wing extremist, Yigal Amir.",
    image: "assets/sources/portraits/yitzhak_rabin.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Yitzhak_Rabin"
  },
  "rabin": {
    name: "Yitzhak Rabin",
    role: "Prime Minister of Israel (1974–77, 1992–95)",
    bio: "A prominent IDF commander during the 1948 and 1967 wars who later served as Prime Minister. He implemented the harsh 'Iron Fist' policy during the First Intifada, but later famously shook hands with Yasser Arafat to sign the Oslo Accords in 1993, for which he won the Nobel Peace Prize. He was assassinated in 1995 by an Israeli right-wing extremist, Yigal Amir.",
    image: "assets/sources/portraits/yitzhak_rabin.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Yitzhak_Rabin"
  },
  "golda meir": {
    name: "Golda Meir",
    role: "Prime Minister of Israel (1969–1974)",
    bio: "Israel's first and only female Prime Minister (1969–1974), who led the country during the shock of the 1973 Yom Kippur War and subsequently ordered 'Operation Wrath of God' to hunt down the Munich Olympics terrorists.",
    image: "assets/sources/portraits/golda_meir.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Golda_Meir"
  },
  "meir": {
    name: "Golda Meir",
    role: "Prime Minister of Israel (1969–1974)",
    bio: "Israel's first and only female Prime Minister (1969–1974), who led the country during the shock of the 1973 Yom Kippur War and subsequently ordered 'Operation Wrath of God' to hunt down the Munich Olympics terrorists.",
    image: "assets/sources/portraits/golda_meir.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Golda_Meir"
  },
  "moshe dayan": {
    name: "Moshe Dayan",
    role: "Israeli Defense Minister & General",
    bio: "A highly recognizable Israeli military commander and Defense Minister (known for his eye patch) who played a pivotal role in the Suez Crisis, the Six Day War, and the Yom Kippur War.",
    image: "assets/sources/portraits/moshe_dayan.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Moshe_Dayan"
  },
  "dayan": {
    name: "Moshe Dayan",
    role: "Israeli Defense Minister & General",
    bio: "A highly recognizable Israeli military commander and Defense Minister (known for his eye patch) who played a pivotal role in the Suez Crisis, the Six Day War, and the Yom Kippur War.",
    image: "assets/sources/portraits/moshe_dayan.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Moshe_Dayan"
  },
  "ariel sharon": {
    name: "Ariel Sharon",
    role: "Israeli General & Defense Minister",
    bio: "A ruthless and controversial Israeli general and Defense Minister who spearheaded the 1982 invasion of Lebanon (Operation Peace for Galilee), driving the IDF all the way to Beirut to expel the PLO.",
    image: "assets/sources/portraits/ariel_sharon.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Ariel_Sharon"
  },
  "sharon": {
    name: "Ariel Sharon",
    role: "Israeli General & Defense Minister",
    bio: "A ruthless and controversial Israeli general and Defense Minister who spearheaded the 1982 invasion of Lebanon (Operation Peace for Galilee), driving the IDF all the way to Beirut to expel the PLO.",
    image: "assets/sources/portraits/ariel_sharon.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Ariel_Sharon"
  },
  "levi eshkol": {
    name: "Levi Eshkol",
    role: "Prime Minister of Israel (1963–1969)",
    bio: "The Israeli Prime Minister who led the country through the escalating tensions and outbreak of the 1967 Six Day War.",
    image: "assets/sources/portraits/levi_eshkol.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Levi_Eshkol"
  },
  "eshkol": {
    name: "Levi Eshkol",
    role: "Prime Minister of Israel (1963–1969)",
    bio: "The Israeli Prime Minister who led the country through the escalating tensions and outbreak of the 1967 Six Day War.",
    image: "assets/sources/portraits/levi_eshkol.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Levi_Eshkol"
  },
  "yitzhak shamir": {
    name: "Yitzhak Shamir",
    role: "Prime Minister of Israel (1983–84, 1986–92)",
    bio: "A former leader of the militant Stern Gang who later became a hardline Israeli Prime Minister during the First Intifada and the 1991 Madrid Conference.",
    image: "assets/sources/portraits/yitzhak_shamir.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Yitzhak_Shamir"
  },
  "shamir": {
    name: "Yitzhak Shamir",
    role: "Prime Minister of Israel (1983–84, 1986–92)",
    bio: "A former leader of the militant Stern Gang who later became a hardline Israeli Prime Minister during the First Intifada and the 1991 Madrid Conference.",
    image: "assets/sources/portraits/yitzhak_shamir.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Yitzhak_Shamir"
  },
  "yasser arafat": {
    name: "Yasser Arafat",
    role: "Chairman of the PLO & Fatah Founder",
    bio: "The Chairman of the Palestine Liberation Organisation (PLO) and founder of Fatah. He spoke at the UN in 1974 bearing a 'gun and an olive branch', formally renounced terrorism in 1988, and signed the 1993 Oslo Accords, becoming the head of the newly formed Palestinian National Authority.",
    image: "assets/sources/portraits/yasser_arafat.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Yasser_Arafat"
  },
  "arafat": {
    name: "Yasser Arafat",
    role: "Chairman of the PLO & Fatah Founder",
    bio: "The Chairman of the Palestine Liberation Organisation (PLO) and founder of Fatah. He spoke at the UN in 1974 bearing a 'gun and an olive branch', formally renounced terrorism in 1988, and signed the 1993 Oslo Accords, becoming the head of the newly formed Palestinian National Authority.",
    image: "assets/sources/portraits/yasser_arafat.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Yasser_Arafat"
  },
  "george habash": {
    name: "George Habash",
    role: "Founder of the PFLP",
    bio: "The founder of the Popular Front for the Liberation of Palestine (PFLP), a radical Marxist group that pioneered international terrorism, including the 1970 Dawson's Field airplane hijackings.",
    image: "assets/sources/portraits/george_habash.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/George_Habash"
  },
  "habash": {
    name: "George Habash",
    role: "Founder of the PFLP",
    bio: "The founder of the Popular Front for the Liberation of Palestine (PFLP), a radical Marxist group that pioneered international terrorism, including the 1970 Dawson's Field airplane hijackings.",
    image: "assets/sources/portraits/george_habash.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/George_Habash"
  },
  "mahmoud abbas": {
    name: "Mahmoud Abbas (Abu Mazen)",
    role: "Founding Member of Fatah & negotiator",
    bio: "A founding member of Fatah who managed the PLO's secret negotiations with Israel that led to the Oslo Accords, later becoming Prime Minister and President of the Palestinian Authority.",
    image: "assets/sources/portraits/mahmoud_abbas.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Mahmoud_Abbas"
  },
  "abu mazen": {
    name: "Mahmoud Abbas (Abu Mazen)",
    role: "Founding Member of Fatah & negotiator",
    bio: "A founding member of Fatah who managed the PLO's secret negotiations with Israel that led to the Oslo Accords, later becoming Prime Minister and President of the Palestinian Authority.",
    image: "assets/sources/portraits/mahmoud_abbas.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Mahmoud_Abbas"
  },
  "abbas": {
    name: "Mahmoud Abbas (Abu Mazen)",
    role: "Founding Member of Fatah & negotiator",
    bio: "A founding member of Fatah who managed the PLO's secret negotiations with Israel that led to the Oslo Accords, later becoming Prime Minister and President of the Palestinian Authority.",
    image: "assets/sources/portraits/mahmoud_abbas.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Mahmoud_Abbas"
  },
  "haj amin al-husseini": {
    name: "Haj Amin al-Husseini",
    role: "Grand Mufti of Jerusalem",
    bio: "The Grand Mufti of Jerusalem and leader of the Arab Higher Committee, who fiercely opposed Jewish immigration during the British Mandate.",
    image: "assets/sources/portraits/grand_mufti.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Amin_al-Husseini"
  },
  "al-husseini": {
    name: "Haj Amin al-Husseini",
    role: "Grand Mufti of Jerusalem",
    bio: "The Grand Mufti of Jerusalem and leader of the Arab Higher Committee, who fiercely opposed Jewish immigration during the British Mandate.",
    image: "assets/sources/portraits/grand_mufti.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Amin_al-Husseini"
  },
  "gamal abdel nasser": {
    name: "Gamal Abdel Nasser",
    role: "President of Egypt & Pan-Arab Champion",
    bio: "The charismatic President of Egypt and champion of Pan-Arabism. He nationalised the Suez Canal in 1956, formed the United Arab Republic, and his aggressive posturing (such as closing the Straits of Tiran) directly triggered the Six Day War.",
    image: "assets/sources/portraits/gamal_abdel_nasser.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Gamal_Abdel_Nasser"
  },
  "nasser": {
    name: "Gamal Abdel Nasser",
    role: "President of Egypt & Pan-Arab Champion",
    bio: "The charismatic President of Egypt and champion of Pan-Arabism. He nationalised the Suez Canal in 1956, formed the United Arab Republic, and his aggressive posturing (such as closing the Straits of Tiran) directly triggered the Six Day War.",
    image: "assets/sources/portraits/gamal_abdel_nasser.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Gamal_Abdel_Nasser"
  },
  "anwar sadat": {
    name: "Anwar Sadat",
    role: "President of Egypt (1970–1981)",
    bio: "Nasser's successor who launched the surprise attack on Israel in the 1973 Yom Kippur War to force diplomatic negotiations. He stunned the world by visiting the Israeli Knesset in 1977, leading to the Camp David Accords and the 1979 peace treaty, for which he won the Nobel Peace Prize.",
    image: "assets/sources/portraits/anwar_sadat.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Anwar_Sadat"
  },
  "sadat": {
    name: "Anwar Sadat",
    role: "President of Egypt (1970–1981)",
    bio: "Nasser's successor who launched the surprise attack on Israel in the 1973 Yom Kippur War to force diplomatic negotiations. He stunned the world by visiting the Israeli Knesset in 1977, leading to the Camp David Accords and the 1979 peace treaty, for which he won the Nobel Peace Prize.",
    image: "assets/sources/portraits/anwar_sadat.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Anwar_Sadat"
  },
  "hosni mubarak": {
    name: "Hosni Mubarak",
    role: "President of Egypt (1981–2011)",
    bio: "Commander of the Egyptian Air Force during the Yom Kippur War who became President of Egypt following Sadat's assassination in 1981.",
    image: "assets/sources/portraits/hosni_mubarak.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Hosni_Mubarak"
  },
  "mubarak": {
    name: "Hosni Mubarak",
    role: "President of Egypt (1981–2011)",
    bio: "Commander of the Egyptian Air Force during the Yom Kippur War who became President of Egypt following Sadat's assassination in 1981.",
    image: "assets/sources/portraits/hosni_mubarak.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Hosni_Mubarak"
  },
  "king hussein": {
    name: "King Hussein of Jordan",
    role: "King of Jordan (1952–1999)",
    bio: "Ruled Jordan for decades, fighting Israel in 1967 but later expelling the PLO from his country during the brutal 'Black September' conflict in 1970. He signed a formal peace treaty with Israel in 1994.",
    image: "assets/sources/portraits/king_hussein.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Hussein_of_Jordan"
  },
  "king abdullah": {
    name: "King Abdullah I of Transjordan",
    role: "King of Transjordan (1946–1951)",
    bio: "King Hussein's grandfather, who held secret talks with the Jewish Agency before 1948 but ultimately joined the Arab invasion, successfully capturing the West Bank and East Jerusalem with his Arab Legion forces.",
    image: "assets/sources/portraits/abdullah_i.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Abdullah_I_of_Jordan"
  },
  "abdullah i": {
    name: "King Abdullah I of Transjordan",
    role: "King of Transjordan (1946–1951)",
    bio: "King Hussein's grandfather, who held secret talks with the Jewish Agency before 1948 but ultimately joined the Arab invasion, successfully capturing the West Bank and East Jerusalem with his Arab Legion forces.",
    image: "assets/sources/portraits/abdullah_i.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Abdullah_I_of_Jordan"
  },
  "transjordan": {
    name: "King Abdullah I of Transjordan",
    role: "King of Transjordan (1946–1951)",
    bio: "King Hussein's grandfather, who held secret talks with the Jewish Agency before 1948 but ultimately joined the Arab invasion, successfully capturing the West Bank and East Jerusalem with his Arab Legion forces.",
    image: "assets/sources/portraits/abdullah_i.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Abdullah_I_of_Jordan"
  },
  "hafez al-assad": {
    name: "Hafez al-Assad",
    role: "President of Syria (1971–2000)",
    bio: "The President of Syria who coordinated the surprise two-front attack with Egypt against Israel in the 1973 Yom Kippur War.",
    image: "assets/sources/portraits/hafez_al_assad.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Hafez_al-Assad"
  },
  "assad": {
    name: "Hafez al-Assad",
    role: "President of Syria (1971–2000)",
    bio: "The President of Syria who coordinated the surprise two-front attack with Egypt against Israel in the 1973 Yom Kippur War.",
    image: "assets/sources/portraits/hafez_al_assad.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Hafez_al-Assad"
  },
  "saddam hussein": {
    name: "Saddam Hussein",
    role: "President of Iraq (1979–2003)",
    bio: "The President of Iraq. While not a direct party to the Arab-Israeli wars, his 1990 invasion of Kuwait (the Gulf War) had massive repercussions, as Yasser Arafat's decision to support him caused wealthy Arab states to cut off all funding to the PLO, forcing them to the negotiating table.",
    image: "assets/sources/portraits/saddam_hussein.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Saddam_Hussein"
  },
  "saddam": {
    name: "Saddam Hussein",
    role: "President of Iraq (1979–2003)",
    bio: "The President of Iraq. While not a direct party to the Arab-Israeli wars, his 1990 invasion of Kuwait (the Gulf War) had massive repercussions, as Yasser Arafat's decision to support him caused wealthy Arab states to cut off all funding to the PLO, forcing them to the negotiating table.",
    image: "assets/sources/portraits/saddam_hussein.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Saddam_Hussein"
  },
  "henry kissinger": {
    name: "Henry Kissinger",
    role: "US Secretary of State & Diplomat",
    bio: "The US Secretary of State famous for his exhaustive 'shuttle diplomacy' (flying back and forth between Middle Eastern capitals) to secure disengagement agreements after the 1973 Yom Kippur War.",
    image: "assets/sources/portraits/henry_kissinger.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Henry_Kissinger"
  },
  "kissinger": {
    name: "Henry Kissinger",
    role: "US Secretary of State & Diplomat",
    bio: "The US Secretary of State famous for his exhaustive 'shuttle diplomacy' (flying back and forth between Middle Eastern capitals) to secure disengagement agreements after the 1973 Yom Kippur War.",
    image: "assets/sources/portraits/henry_kissinger.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Henry_Kissinger"
  },
  "jimmy carter": {
    name: "Jimmy Carter",
    role: "39th President of the United States (1977–1981)",
    bio: "The US President who personally mediated the 13 days of secret talks between Begin and Sadat at the Camp David presidential retreat in 1978.",
    image: "assets/sources/portraits/jimmy_carter.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Jimmy_Carter"
  },
  "carter": {
    name: "Jimmy Carter",
    role: "39th President of the United States (1977–1981)",
    bio: "The US President who personally mediated the 13 days of secret talks between Begin and Sadat at the Camp David presidential retreat in 1978.",
    image: "assets/sources/portraits/jimmy_carter.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Jimmy_Carter"
  },
  "bill clinton": {
    name: "Bill Clinton",
    role: "42nd President of the United States (1993–2001)",
    bio: "The US President who hosted the historic handshake between Yitzhak Rabin and Yasser Arafat on the White House lawn during the signing of the Oslo Accords in 1993.",
    image: "assets/sources/portraits/bill_clinton.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Bill_Clinton"
  },
  "clinton": {
    name: "Bill Clinton",
    role: "42nd President of the United States (1993–2001)",
    bio: "The US President who hosted the historic handshake between Yitzhak Rabin and Yasser Arafat on the White House lawn during the signing of the Oslo Accords in 1993.",
    image: "assets/sources/portraits/bill_clinton.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Bill_Clinton"
  },
  "mikhail gorbachev": {
    name: "Mikhail Gorbachev",
    role: "Leader of the Soviet Union (1985–1991)",
    bio: "The leader of the Soviet Union whose reforms ended the Cold War, cutting off Soviet military aid to Arab states and paving the way for the 1991 Madrid Peace Conference.",
    image: "assets/sources/portraits/mikhail_gorbachev.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Mikhail_Gorbachev"
  },
  "gorbachev": {
    name: "Mikhail Gorbachev",
    role: "Leader of the Soviet Union (1985–1991)",
    bio: "The leader of the Soviet Union whose reforms ended the Cold War, cutting off Soviet military aid to Arab states and paving the way for the 1991 Madrid Peace Conference.",
    image: "assets/sources/portraits/mikhail_gorbachev.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Mikhail_Gorbachev"
  },
  "george h.w. bush": {
    name: "George H.W. Bush",
    role: "41st President of the United States (1989–1993)",
    bio: "The US President who emerged from the 1991 Gulf War as the leader of the sole remaining superpower, using this leverage to force Israel and Arab nations to negotiate at the Madrid Conference.",
    image: "assets/sources/portraits/george_h_w_bush.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/George_H._W._Bush"
  },
  "george bush": {
    name: "George H.W. Bush",
    role: "41st President of the United States (1989–1993)",
    bio: "The US President who emerged from the 1991 Gulf War as the leader of the sole remaining superpower, using this leverage to force Israel and Arab nations to negotiate at the Madrid Conference.",
    image: "assets/sources/portraits/george_h_w_bush.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/George_H._W._Bush"
  },
  "bush": {
    name: "George H.W. Bush",
    role: "41st President of the United States (1989–1993)",
    bio: "The US President who emerged from the 1991 Gulf War as the leader of the sole remaining superpower, using this leverage to force Israel and Arab nations to negotiate at the Madrid Conference.",
    image: "assets/sources/portraits/george_h_w_bush.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/George_H._W._Bush"
  },
  "ernest bevin": {
    name: "Ernest Bevin",
    role: "British Foreign Secretary (1945–1951)",
    bio: "The British Foreign Secretary who ultimately decided to hand the 'unworkable' Palestine Mandate over to the United Nations in 1947.",
    image: "assets/sources/portraits/ernest_bevin.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Ernest_Bevin"
  },
  "bevin": {
    name: "Ernest Bevin",
    role: "British Foreign Secretary (1945–1951)",
    bio: "The British Foreign Secretary who ultimately decided to hand the 'unworkable' Palestine Mandate over to the United Nations in 1947.",
    image: "assets/sources/portraits/ernest_bevin.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Ernest_Bevin"
  },
  "count folke bernadotte": {
    name: "Count Folke Bernadotte",
    role: "UN Mediator in Palestine",
    bio: "The UN mediator dispatched to negotiate a truce during the 1948 war, who was assassinated by the Jewish extremist Stern Gang.",
    image: "assets/sources/portraits/folke_bernadotte.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Folke_Bernadotte"
  },
  "bernadotte": {
    name: "Count Folke Bernadotte",
    role: "UN Mediator in Palestine",
    bio: "The UN mediator dispatched to negotiate a truce during the 1948 war, who was assassinated by the Jewish extremist Stern Gang.",
    image: "assets/sources/portraits/folke_bernadotte.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Folke_Bernadotte"
  },
  "folke bernadotte": {
    name: "Count Folke Bernadotte",
    role: "UN Mediator in Palestine",
    bio: "The UN mediator dispatched to negotiate a truce during the 1948 war, who was assassinated by the Jewish extremist Stern Gang.",
    image: "assets/sources/portraits/folke_bernadotte.jpg",
    sourceUrl: "https://en.wikipedia.org/wiki/Folke_Bernadotte"
  }
};
