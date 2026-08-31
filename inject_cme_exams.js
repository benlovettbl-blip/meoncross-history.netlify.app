const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'cme_new', 'data.js');

let dataFile = fs.readFileSync(file, 'utf8');

// The file exports unitData. We can eval it or modify it by string injection.
// Given it's large, eval-ing it and writing it back might destroy formatting.
// Instead we'll use a regex replacement or load it, modify it, and write it back with stringify.
// Let's use eval since stringify formatting is fine (it's generated).

let content = dataFile.replace('module.exports =', 'global.cmeData =');
eval(content);
const data = global.cmeData;

const findBlock = (id) => data.exam_blocks.find(b => b.id === id);

// KT1
const kt1 = findBlock('KT1');
if (kt1) {
  // KT1.2 4 marks: Consequence of Law of Return
  kt1.questions.push({
    type: 'consequence_4',
    marks: 4,
    text: 'Explain one consequence of Israel passing the Law of Return (1950). (4 marks)',
    wagoll: '**One consequence of Israel passing the Law of Return (1950) was a massive demographic surge in the Jewish population of Israel**. Prior to 1950, Jewish immigration was heavily restricted by the British. **As a direct result of the law granting every Jew in the world the automatic right to immigrate to Israel and become a citizen**, hundreds of thousands of Jews from post-Holocaust Europe and across the Arab world fled to Israel. Consequently, Israel’s Jewish population doubled within a few years, dramatically strengthening the young state’s military and economic capabilities but also increasing tensions regarding the displacement of Palestinian refugees.',
    structure_strip: { starters: ['One consequence of Israel passing the Law of Return was...'], fact_bank: ['Immigration', 'Population', 'Demographics'] }
  });

  // KT1.3 8 marks: Importance of Nasser
  kt1.questions.push({
    type: 'importance_8',
    marks: 8,
    text: 'Explain the importance of Nasser for tension in the Middle East in the years 1955-63. (8 marks)',
    wagoll: '**Nasser was of historic importance for increasing tension in the Middle East because he championed aggressive Pan-Arab nationalism that directly threatened Western and Israeli interests**. By actively supporting Palestinian Fedayeen raids into Israel from the Gaza Strip, he escalated border skirmishes into a state of continuous, low-level warfare. This constant guerrilla infiltration provoked massive Israeli retaliatory strikes, such as the 1955 Gaza Raid, which created a volatile cycle of violence that destabilised the region.\n\n**Furthermore, Nasser was highly important for tension because his arms deal with Czechoslovakia and nationalisation of the Suez Canal invited Cold War superpower confrontation into the Middle East**. By purchasing advanced Soviet-bloc weaponry in 1955, Nasser broke the Western arms embargo and radically shifted the balance of military power, terrifying Israel. When he subsequently nationalised the British- and French-owned Suez Canal Company in 1956, he directly triggered the Suez Crisis—a coordinated invasion by Britain, France, and Israel that brought the US and USSR to the brink of nuclear war and cemented Arab-Israeli hostility.',
    structure_strip: { starters: ['Nasser was of historic importance for increasing tension in the Middle East because...', 'Furthermore, Nasser was highly important for tension because...'], fact_bank: ['Pan-Arab', 'Suez Crisis', 'Fedayeen', 'Czechoslovakia'] }
  });
}

// KT2
const kt2 = findBlock('KT2');
if (kt2) {
  // KT2.2 8 marks: Importance of Six Day War for Israel's security
  kt2.questions.push({
    type: 'importance_8',
    marks: 8,
    text: 'Explain the importance of the Six Day War (1967) for Israel’s security. (8 marks)',
    wagoll: '**The Six Day War was of historic importance for Israel’s security because it fundamentally transformed Israel’s borders, providing massive strategic buffer zones against future Arab invasions**. Prior to 1967, Israel was extremely narrow and vulnerable, especially at its waist near Netanya. **As a direct result of the lightning victory**, Israel captured the Sinai Peninsula from Egypt, the Golan Heights from Syria, and the West Bank from Jordan. This meant that any future ground invasion would have to cross vast, easily defensible natural barriers, thereby ending the immediate existential threat to Israel’s core population centres and drastically reducing its vulnerability to surprise attacks.\n\n**However, the Six Day War was also highly important for Israel’s security because capturing these territories brought over one million hostile Palestinian Arabs under direct Israeli military occupation, creating a severe internal security threat**. Rather than securing permanent peace, the occupation of the West Bank and Gaza Strip fueled intense Palestinian nationalism and resistance. This directly led to the rise of the PLO and radical guerrilla factions like Fatah, which launched waves of terrorism and guerrilla warfare from neighbouring countries and from within the occupied territories themselves, thus shifting Israel’s primary security threat from conventional Arab armies to a prolonged, asymmetrical insurgency.',
    structure_strip: { starters: ['The Six Day War was of historic importance for Israel’s security because...', 'However, the Six Day War was also highly important for Israel’s security because...'], fact_bank: ['Buffer zones', 'Sinai Peninsula', 'Golan Heights', 'Palestinian nationalism', 'Occupation'] }
  });

  // KT2.2 8 marks: Importance of UN Resolution 242
  kt2.questions.push({
    type: 'importance_8',
    marks: 8,
    text: 'Explain the importance of UN Resolution 242 (1967) for relations between Israel and the Arab world after the Six Day War. (8 marks)',
    wagoll: '**UN Resolution 242 was of historic importance for relations between Israel and the Arab world because it established the fundamental "Land for Peace" formula that would define all future diplomatic negotiations**. Passed in the aftermath of the Six Day War, the resolution called for the withdrawal of Israeli armed forces from territories occupied in the conflict, in exchange for the Arab states terminating all claims of belligerency and acknowledging Israel’s right to live in peace within secure and recognized boundaries. **This mutual compromise was highly important because it laid the diplomatic foundation** for later historic breakthroughs, including the 1978 Camp David Accords and the 1994 Israel-Jordan Peace Treaty.\n\n**However, UN Resolution 242 was also highly important because its deliberate linguistic ambiguity led to decades of entrenched diplomatic deadlock and ongoing conflict**. The English version of the text called for Israeli withdrawal from "territories occupied", lacking the word "all", which Israel interpreted as meaning they could retain some captured land for defensive purposes. Conversely, Arab states insisted the French version demanded total withdrawal from all captured land. Furthermore, the resolution only referred to Palestinians as a "refugee problem" rather than acknowledging their right to national self-determination. This failure to address the core Palestinian grievance meant the PLO outright rejected the resolution, ensuring the continuation of guerrilla warfare and terrorism.',
    structure_strip: { starters: ['UN Resolution 242 was of historic importance for relations between Israel and the Arab world because...', 'However, UN Resolution 242 was also highly important because...'], fact_bank: ['Land for Peace', 'Withdrawal', 'Ambiguity', 'Refugee problem'] }
  });

  // KT2.2 4 marks: Consequence of Munich Olympics (first instance)
  kt2.questions.push({
    type: 'consequence_4',
    marks: 4,
    text: 'Explain one consequence of the terrorist attack at the Munich Olympics (1972). (4 marks)',
    wagoll: '**One consequence of the terrorist attack at the Munich Olympics was a massive and relentless covert retaliation campaign launched by Israeli intelligence (Mossad) known as Operation Wrath of God**. Following the massacre of 11 Israeli athletes by the Black September faction, Prime Minister Golda Meir authorized Mossad to track down and assassinate those responsible across Europe and the Middle East. **As a direct result of this directive**, numerous Palestinian operatives were killed over the next two decades. Consequently, this campaign severely damaged the operational leadership of radical Palestinian factions while demonstrating Israel’s absolute commitment to violently punishing terrorism globally.',
    structure_strip: { starters: ['One consequence of the terrorist attack at the Munich Olympics was...'], fact_bank: ['Mossad', 'Wrath of God', 'Golda Meir', 'Assassination'] }
  });
  
  // KT2.2 4 marks: Consequence of Munich Olympics (second instance for 8 marks total in real exam)
  kt2.questions.push({
    type: 'consequence_4',
    marks: 4,
    text: 'Explain one consequence of the terrorist attack at the Munich Olympics (1972). (4 marks)',
    wagoll: '**One consequence of the terrorist attack at the Munich Olympics was the dramatic elevation of the Palestinian cause onto the global stage through horrifying international media coverage**. Prior to 1972, the plight of Palestinian refugees was largely ignored by the Western public. **As a direct result of the Black September terrorists taking Israeli athletes hostage during the world’s most-watched television event**, a global audience of nearly 900 million people watched the crisis unfold live. Consequently, although universally condemned for its brutality, the spectacle forcibly forced the international community to acknowledge the Palestinian demand for self-determination, fundamentally changing how the conflict was perceived globally.',
    structure_strip: { starters: ['One consequence of the terrorist attack at the Munich Olympics was...'], fact_bank: ['Media coverage', 'Global stage', 'Black September', 'Television'] }
  });
}

// KT3
const kt3 = findBlock('KT3');
if (kt3) {
  // KT3.1 8 Marks: Importance of oil crisis
  kt3.questions.push({
    type: 'importance_8',
    marks: 8,
    text: 'Explain the importance of the oil crisis (1973-74) for diplomatic negotiations in the Middle East. (8 marks)',
    wagoll: '**The oil crisis (1973–74) was of historic importance for diplomatic negotiations because it forced the United States to urgently intervene in the Arab-Israeli conflict as a primary mediator**. During the Yom Kippur War, OAPEC launched an oil embargo against nations supporting Israel, quadrupling global oil prices and crippling the US economy. **As a direct result of this devastating economic weapon**, US Secretary of State Henry Kissinger engaged in intensive "shuttle diplomacy" between Israel, Egypt, and Syria. This direct US intervention was highly important because it shattered the diplomatic stalemate of the Cold War, compelling Israel to withdraw from parts of the Sinai and Golan Heights in exchange for Arab concessions, thereby paving the way for future peace treaties.\n\n**Furthermore, the oil crisis was highly important for negotiations because it demonstrated the immense leverage of Arab states, fundamentally altering the diplomatic balance of power**. By successfully using oil as a political weapon, Arab states proved they were no longer weak clients of the superpowers but formidable global economic players. This newfound leverage meant that Western powers, desperate to ensure a stable supply of oil, could no longer unilaterally support Israel without suffering severe domestic economic consequences. Consequently, the crisis forced the West to adopt a more balanced diplomatic approach to the Middle East, legitimising Arab demands and pressuring Israel into acknowledging the necessity of territorial compromise.',
    structure_strip: { starters: ['The oil crisis was of historic importance for diplomatic negotiations because...', 'Furthermore, the oil crisis was highly important for negotiations because...'], fact_bank: ['OAPEC', 'Embargo', 'Henry Kissinger', 'Shuttle diplomacy'] }
  });

  // KT3.2 8 Marks: Importance of Israeli invasion of Lebanon
  kt3.questions.push({
    type: 'importance_8',
    marks: 8,
    text: 'Explain the importance of the Israeli invasion of Lebanon (1982) for the Palestinian Liberation Organisation (PLO). (8 marks)',
    wagoll: '**The Israeli invasion of Lebanon (1982) was of historic importance for the PLO because it resulted in the complete destruction of their military infrastructure and their forced expulsion from Lebanon**. Prior to 1982, the PLO operated a virtually independent "state-within-a-state" in southern Lebanon, using it as a secure base to launch artillery and guerrilla attacks against northern Israel. **As a direct result of the massive IDF invasion led by Ariel Sharon**, Israeli forces besieged Beirut and forced the PLO into a humiliating surrender. Consequently, Yasser Arafat and thousands of PLO fighters were exiled to Tunisia, thousands of miles away, completely severing their direct territorial border with Israel and severely castrating their ability to launch cross-border military operations.\n\n**However, the invasion of Lebanon was also highly important for the PLO because it generated massive international sympathy for the Palestinian cause following the Sabra and Shatila massacres**. In September 1982, Lebanese Christian Phalangist militias, allied with Israel and operating in areas controlled by the IDF, massacred up to 3,000 Palestinian civilians in the Sabra and Shatila refugee camps. The horrifying images of slaughtered civilians provoked global outrage. Consequently, the PLO shifted its strategy away from armed guerrilla warfare and successfully capitalised on this international sympathy, rebranding Yasser Arafat from a militant terrorist into a legitimate diplomatic statesman demanding justice, which ultimately facilitated their engagement in the Oslo Peace Process.',
    structure_strip: { starters: ['The Israeli invasion of Lebanon (1982) was of historic importance for the PLO because...', 'However, the invasion of Lebanon was also highly important for the PLO because...'], fact_bank: ['State-within-a-state', 'Ariel Sharon', 'Tunisia', 'Sabra and Shatila'] }
  });

  // KT3.3 8 Marks: Importance of Israel-Jordan peace treaty
  kt3.questions.push({
    type: 'importance_8',
    marks: 8,
    text: 'Explain the importance of the Israel-Jordan peace treaty (1994) for peace in the Middle East. (8 marks)',
    wagoll: '**The Israel-Jordan peace treaty (1994) was of historic importance for peace in the Middle East because it formally normalized relations and secured Israel’s longest and most vulnerable land border**. Following the momentum of the 1993 Oslo Accords, King Hussein of Jordan and Israeli Prime Minister Yitzhak Rabin signed a comprehensive peace agreement in the Arava valley. **As a direct result of this treaty**, Jordan became only the second Arab nation (after Egypt) to officially recognize Israel’s right to exist. This mutual recognition was highly important because it resolved decades-old disputes over territory and water rights, opened full diplomatic, economic, and tourism ties, and eliminated the threat of a conventional military invasion from Israel’s eastern flank.\n\n**However, the Israel-Jordan peace treaty was also highly important for peace in the Middle East because it deeply fractured the Arab world’s united front and isolated radical Palestinian rejectionists**. By signing a separate bilateral peace treaty with Israel, Jordan broke rank with hardline Arab states like Syria and Iraq, proving that the Arab League’s historic policy of absolute refusal to negotiate with the "Zionist entity" was collapsing. While this angered radical factions like Hamas and Hezbollah, who condemned King Hussein as a traitor to the Palestinian cause, it demonstrated that pragmatic, "Land for Peace" diplomacy could successfully yield tangible security and economic benefits, fundamentally altering the diplomatic landscape of the region.',
    structure_strip: { starters: ['The Israel-Jordan peace treaty (1994) was of historic importance for peace in the Middle East because...', 'However, the Israel-Jordan peace treaty was also highly important for peace in the Middle East because...'], fact_bank: ['King Hussein', 'Yitzhak Rabin', 'Normalized relations', 'Arab League'] }
  });
}

// Write the modified data back to the file
const fileContent = 'module.exports = ' + JSON.stringify(data, null, 2) + ';\n';
fs.writeFileSync(file, fileContent, 'utf8');

console.log('Successfully injected exam questions with WAGOLLs into cme_new/data.js');
