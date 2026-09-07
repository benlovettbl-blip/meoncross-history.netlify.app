const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const targetFiles = [
  path.join(__dirname, '..', 'units', 'cme_new', 'data.js'),
  path.join(__dirname, '..', 'public', 'units', 'cme_new', 'data.js'),
];

(async () => {
  try {
    for (const filePath of targetFiles) {
      if (!fs.existsSync(filePath)) continue;

      const fileUrl = pathToFileURL(filePath).href;
      const mod = await import(fileUrl);
      const unitData = mod.default || mod.unitData || mod.cme_new;

      let cleanedCount = 0;

      unitData.lessons.forEach((lesson, lIdx) => {
        if (!lesson.narrative_blocks) return;

        lesson.narrative_blocks.forEach((nb, nbIdx) => {
          if (!nb.tasks) return;

          nb.tasks.forEach((t) => {
            // Check for any misplaced exam questions
            const txt = t.text || '';

            if (txt.includes('Explain one consequence of the cross-border Fedayeen raids')) {
              t.type = 'written';
              t.text =
                'Explain how cross-border Fedayeen raids and Israeli reprisal strikes increased border tensions between 1950 and 1955. (P10)';
              t.model =
                'Fedayeen guerrilla raids from Gaza and the West Bank attacked Israeli civilian settlements, killing dozens. In response, Israel adopted a harsh reprisal policy led by Unit 101, conducting cross-border retaliatory raids (such as the 1955 Gaza Raid) that inflicted heavy casualties on Egyptian troops, convincing President Nasser to urgently seek Soviet weaponry and preparing the ground for the 1956 Suez Crisis.';
              cleanedCount++;
            } else if (
              txt.includes('Explain one consequence of the nationalisation of the Suez Canal')
            ) {
              t.type = 'written';
              t.text =
                "Explain why Nasser's nationalisation of the Suez Canal led Britain, France, and Israel to collude against Egypt. (P16)";
              t.model =
                'Britain and France were the primary shareholders in the canal and feared losing control of the vital imperial shipping route and oil supply. Israel wanted to break the Egyptian blockade of the Straits of Tiran and end Fedayeen raids. Consequently, they held secret talks at Sèvres to launch a coordinated military campaign to depose Nasser and reclaim the canal.';
              cleanedCount++;
            } else if (
              txt.includes('May 1967 crisis that led to the outbreak of the Six Day War')
            ) {
              t.type = 'written';
              t.text =
                'Summarise the key steps taken by Egypt in May 1967 that convinced Israel that war was imminent. (P19)';
              t.model =
                "Egypt mobilised over 100,000 troops and 1,000 tanks in the Sinai, demanded the immediate withdrawal of the UN Emergency Force (UNEF), and closed the Straits of Tiran to Israeli shipping at Sharm el-Sheikh. These provocative moves cut off Israel's southern port of Eilat and convinced Israeli leaders to launch a preemptive strike.";
              cleanedCount++;
            } else if (txt.includes('Palestinian issue in the years 1970–72')) {
              t.type = 'written';
              t.text =
                'Explain how the expulsion of the PLO from Jordan in 1970 led to the emergence of international terrorism like the 1972 Munich Olympics attack. (P17)';
              t.model =
                "After King Hussein crushed Palestinian guerrilla bases in Jordan during Black September and expelled fighters to Lebanon, radical militants formed the clandestine 'Black September' group to avenge their defeat. Believing conventional warfare had failed, they turned to sensational international terror attacks, culminating in the kidnapping and murder of eleven Israeli athletes at the 1972 Munich Olympics to force the Palestinian struggle onto the world stage.";
              cleanedCount++;
            } else if (txt.includes('Yom Kippur War (1973) and its aftermath')) {
              t.type = 'written';
              t.text =
                'Explain why both Israel and Egypt viewed the outcome of the 1973 Yom Kippur War with mixed feelings. (P20)';
              t.model =
                "Egypt restored its national pride and shattered the myth of Israeli invincibility by successfully crossing the Suez Canal, but ultimately suffered heavy military losses and encirclement of its Third Army. Israel successfully repelled the invaders and encircled Egyptian forces with US resupply, but suffered 2,600 dead, devastating intelligence failures, and severe domestic political crisis leading to Golda Meir's resignation.";
              cleanedCount++;
            } else if (txt.includes('1973 Oil Crisis for diplomatic negotiations')) {
              t.type = 'written';
              t.text =
                'Explain how the 1973 OPEC oil embargo pressured Western powers to pursue peace negotiations in the Middle East. (P12)';
              t.model =
                'Arab oil-producing nations reduced oil production and cut off supplies to Western allies of Israel, causing global crude prices to quadruple and sparking fuel shortages and economic crisis in the US and Europe. This demonstrated Western dependence on Arab oil, forcing US Secretary of State Henry Kissinger to prioritize Middle Eastern diplomacy through disengagement agreements and shuttle diplomacy.';
              cleanedCount++;
            } else if (txt.includes('PLO in Lebanon in the years 1970–82')) {
              t.type = 'written';
              t.text =
                'Explain the consequences of the 1982 Israeli siege of Beirut for the PLO leadership. (P18)';
              t.model =
                "The three-month Israeli siege and bombardment of West Beirut destroyed the PLO's military infrastructure in Lebanon and forced Yasser Arafat and over 14,000 fighters to evacuate by sea under international supervision. The PLO established its new headquarters in distant Tunis, isolating the leadership 1,500 miles away from Israel's borders and leaving Palestinians in the West Bank and Gaza to organize their own resistance.";
              cleanedCount++;
            } else if (
              txt.includes('peace process between Israel and the Palestinians in the years 1988–95')
            ) {
              t.type = 'written';
              t.text =
                "Explain how Yasser Arafat's 1988 Geneva speech helped open the path towards the 1993 Oslo Accords. (P16)";
              t.model =
                "In his December 1988 speech in Geneva, Arafat officially renounced terrorism, accepted UN Security Council Resolutions 242 and 338, and recognized Israel's right to exist. This met the longstanding conditions of the United States, breaking the PLO's diplomatic isolation and creating the political legitimacy necessary for secret back-channel negotiations in Norway that produced the 1993 Oslo Accords.";
              cleanedCount++;
            } else if (txt.includes("Oslo Accords were considered 'fundamentally ambiguous'")) {
              t.type = 'written';
              t.text =
                "Explain why the Oslo Accords deferred the most difficult 'permanent status' issues, and what problems this caused. (P17)";
              t.model =
                'Negotiators deliberately deferred the most controversial issues—the status of Jerusalem, the right of return for refugees, borders, and Jewish settlements—to future talks to secure an immediate interim agreement. However, this postponement allowed Israeli settlements to expand rapidly, while Palestinian living conditions failed to improve, breeding deep disillusionment that extremist groups like Hamas exploited through suicide bombings to derail the peace process.';
              cleanedCount++;
            }
          });
        });
      });

      const updatedCode = `const cme_new = ${JSON.stringify(unitData, null, 2)};\n\nexport const unitData = cme_new;\nexport default cme_new;\n`;
      fs.writeFileSync(filePath, updatedCode, 'utf8');
      console.log(`✅ Cleaned ${cleanedCount} narrative tasks in ${filePath}`);
    }
  } catch (err) {
    console.error('❌ Error cleaning narrative tasks:', err);
    process.exit(1);
  }
})();
