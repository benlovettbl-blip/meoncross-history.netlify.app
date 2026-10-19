const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

  // 14 Milestones explicitly covering every spec period
  const test14 = [
    {
      date: 'Nov 1917',
      title: 'The Balfour Declaration & Contradictory Pledges',
      desc: 'Foreign Secretary Balfour pledges British support for a Jewish national home, contradicting promises to Arab leaders and entrenching conflict.',
      ref: '1.2',
    },
    {
      date: 'July 1946',
      title: 'The Bombing of the King David Hotel & Mandate Collapse',
      desc: 'Zionist paramilitary group Irgun detonates 350kg of explosives at British military headquarters, forcing war-weary Britain to hand Palestine to the UN.',
      ref: '2.2',
    },
    {
      date: 'Nov 1947',
      title: 'UN Resolution 181: The Palestine Partition Plan',
      desc: 'The UN votes 33-13 to partition Palestine into Arab and Jewish states with an international Jerusalem; Arab rejection sparks immediate civil war.',
      ref: '2.3',
    },
    {
      date: 'May 1948',
      title: 'Declaration of Israel & The 1948–49 War',
      desc: 'Ben-Gurion proclaims statehood; five Arab armies invade. Israel wins military victory, expands borders, and 700,000 Palestinians become refugees (Al-Nakba).',
      ref: '2.4',
    },
    {
      date: 'July 1950',
      title: 'The Law of Return, IDF Creation & US Aid',
      desc: 'Knesset grants worldwide Jewish immigration right; population doubles within four years as transit camps house arrivals funded by US economic aid.',
      ref: '3.3',
    },
    {
      date: 'Oct 1956',
      title: 'The Suez Crisis, Operation Musketeer & UNEF Deployment',
      desc: 'Nasser nationalises the Suez Canal; Britain, France, and Israel secretly collude to invade Egypt. US financial pressure forces British withdrawal.',
      ref: '4.3',
    },
    {
      date: 'June 1967',
      title: 'The Six-Day War & Preemptive Air Strike (Operation Focus)',
      desc: 'Israel destroys 300+ Egyptian aircraft in 3 hours, conquering the Sinai Peninsula, Gaza Strip, West Bank, East Jerusalem, and Golan Heights.',
      ref: '6.2',
    },
    {
      date: 'Nov 1967',
      title: 'UN Resolution 242 & The "Land for Peace" Benchmark',
      desc: 'The UN Security Council calls for Israeli withdrawal in exchange for recognised, secure borders, establishing the benchmark for all future diplomacy.',
      ref: '7.3',
    },
    {
      date: 'Sept 1970–72',
      title: 'Black September & The Munich Olympics Hostage Crisis',
      desc: 'Jordanian army expels the PLO to Lebanon; Black September terrorists murder 11 Israeli Olympic athletes and coaches in Munich.',
      ref: '8.3',
    },
    {
      date: 'Oct 1973',
      title: 'The Yom Kippur War & The Arab OPEC Oil Embargo',
      desc: 'Surprise Egyptian and Syrian assault breaches Bar-Lev Line; Arab oil embargo quadruples world oil prices and triggers Western stagflation.',
      ref: '9.2',
    },
    {
      date: 'Sept 1978–79',
      title: 'The Camp David Accords & 1979 Peace Treaty',
      desc: 'President Carter brokers peace between Egyptian President Sadat and Israeli PM Begin; Israel returns Sinai to Egypt in exchange for formal recognition.',
      ref: '10.3',
    },
    {
      date: 'June 1982',
      title: 'Operation Peace for Galilee & The Sabra and Shatila Massacre',
      desc: "Sharon launches full-scale invasion of Lebanon to crush the PLO; ends in Phalangist camp massacre, international outrage, and Sharon's resignation.",
      ref: '11.2',
    },
    {
      date: 'Dec 1987–88',
      title: "The First Intifada & Arafat's Renunciation of Terrorism",
      desc: 'Grassroots uprising of stone-throwing youth in Gaza and West Bank; Arafat declares Palestinian statehood and renounces terrorism at the UN in Geneva.',
      ref: '11.3',
    },
    {
      date: '1989–1991',
      title: 'End of the Cold War, The First Gulf War & Madrid',
      desc: 'Soviet collapse eliminates Arab superpower patron; US Gulf War victory isolates PLO, compelling Israel and Arab states to convene in Madrid.',
      ref: '12.1',
    },
    {
      date: '1993–1995',
      title: "The Oslo Accords, Jordan Peace & Rabin's Assassination",
      desc: 'Rabin and Arafat sign Oslo Accords on the White House lawn; process deadlocks after Rabin is assassinated by a right-wing Israeli extremist in Tel Aviv.',
      ref: '12.4',
    },
  ];

  const keyTopicsPage3 = [
    {
      num: 'KEY TOPIC 1',
      date: '1945–1963',
      title: 'The Birth of the State of Israel',
      color: '#1e3a8a',
      badgeBg: '#1e3a8a',
      borderTop: '#2563eb',
      specUnits: [
        {
          code: 'KT 1.1',
          title: 'British Withdrawal & Creation of Israel',
          desc: 'Conflicting Jewish-Arab demands; Irgun bombing of King David Hotel (1946); UN Res 181 Partition Plan; 1948–49 War and military victory.',
        },
        {
          code: 'KT 1.2',
          title: 'Aftermath of 1948–49 War',
          desc: 'Territorial changes & 1949 Green Line; 700,000 Palestinian refugees (Al-Nakba) & UNRWA; Law of Return (1950); creation of IDF; US economic aid.',
        },
        {
          code: 'KT 1.3',
          title: 'Increased Tension & Suez (1955–63)',
          desc: 'Nasser & Pan-Arab leadership; Czech Arms Deal; 1955 Gaza raid; 1956 Suez Crisis, Sèvres collusion & Israeli Sinai invasion; 1958 UAR.',
        },
      ],
      territorialSummary:
        '1947 Partition Borders, 1949 Armistice Green Line, Divided Jerusalem, Gaza (Egypt) & West Bank (Jordan).',
    },
    {
      num: 'KEY TOPIC 2',
      date: '1964–1973',
      title: 'The Escalating Conflict',
      color: '#7f1d1d',
      badgeBg: '#7f1d1d',
      borderTop: '#dc2626',
      specUnits: [
        {
          code: 'KT 2.1',
          title: 'The Six-Day War (1967)',
          desc: '1964 Cairo Conference & PLO; River Jordan water disputes; Samu raid (1966) & 7 April 1967 air battle; superpower roles; Operation Focus blitzkrieg.',
        },
        {
          code: 'KT 2.2',
          title: 'Aftermath of the 1967 War',
          desc: 'UN Resolution 242 ("Land for Peace"); Conquered Territories (Golan, Gaza, West Bank, Sinai, East Jerusalem); PFLP 1970 hijacks; Black September; Munich 1972.',
        },
        {
          code: 'KT 2.3',
          title: 'Israel and Egypt (1967–73)',
          desc: 'War of Attrition along Suez; Bar-Lev Line fortification; Yom Kippur War (1973) surprise assault; OPEC oil embargo & superpower nuclear alert.',
        },
      ],
      territorialSummary:
        'The Conquered Territories (Sinai, Gaza, West Bank, Golan Heights, East Jerusalem) & the Bar-Lev Line.',
    },
    {
      num: 'KEY TOPIC 3',
      date: '1974–1995',
      title: 'Attempts at a Solution',
      color: '#064e3b',
      badgeBg: '#064e3b',
      borderTop: '#059669',
      specUnits: [
        {
          code: 'KT 3.1',
          title: 'Diplomatic Negotiations',
          desc: 'Kissinger "shuttle diplomacy"; reopening of Suez Canal (1975); Sadat in Jerusalem (1977); Camp David Accords (1978); 1979 Treaty of Washington.',
        },
        {
          code: 'KT 3.2',
          title: 'The Palestinian Issue',
          desc: 'Arafat UN speech (1974); PLO in Lebanon; 1982 invasion (Operation Peace for Galilee, Beirut siege, Sabra-Shatila); First Intifada (1987–93); Hamas.',
        },
        {
          code: 'KT 3.3',
          title: 'Attempts at Peace (1988–95)',
          desc: 'Arafat 1988 Geneva speech; changing superpower policies: 1991 Gulf War & collapse of USSR; Madrid (1991); Oslo Accords (1993); Jordan Treaty (1994); Oslo II & Rabin assassination (1995).',
        },
      ],
      territorialSummary:
        'Sinai Demilitarisation & Handover, Gaza-Jericho First, and Oslo II Partition (Areas A, B, and C).',
    },
  ];

  let html = fs.readFileSync('public/units/cme_new/textbook_UNIFIED.html', 'utf8');

  // Replace Page 2 spine items
  const spineItemsHtml = test14
    .map(
      (m) => `
      <div class="spine-item">
        <div class="spine-date-badge">${m.date}</div>
        <div class="spine-dot"></div>
        <div class="spine-content">
          <div class="spine-title-row">
            <span class="spine-title">${m.title}</span>
            <span class="spine-ref">Ref [${m.ref}]</span>
          </div>
          <p class="spine-desc">${m.desc}</p>
        </div>
      </div>`,
    )
    .join('');

  html = html.replace(
    /<div class="spine-container">[\s\S]*?<\/div>\s*<\/main>/,
    '<div class="spine-container">' + spineItemsHtml + '</div></main>',
  );

  // Replace Page 3 content
  const page3Html = `
    <div class="kt-overview-grid">
      ${keyTopicsPage3
        .map(
          (kt) => `
        <div class="kt-spec-card" style="border-top-color: ${kt.borderTop}">
          <div class="kt-spec-header">
            <span class="kt-spec-badge" style="background: ${kt.badgeBg}">${kt.num}</span>
            <span class="kt-spec-date">${kt.date}</span>
          </div>
          <div class="kt-spec-title" style="color: ${kt.color}">${kt.title}</div>
          <div class="kt-spec-units">
            ${kt.specUnits
              .map(
                (u) => `
              <div class="kt-spec-unit">
                <div class="kt-unit-code">${u.code}: ${u.title}</div>
                <div class="kt-unit-desc">${u.desc}</div>
              </div>
            `,
              )
              .join('')}
          </div>
          <div class="kt-spec-geo">
            <strong>Key Borders:</strong> ${kt.territorialSummary}
          </div>
        </div>
      `,
        )
        .join('')}
    </div>
  `;

  html = html.replace(
    /<div class="flashpoints-grid">[\s\S]*?<\/div>\s*<\/main>/,
    page3Html + '</main>',
  );
  html = html.replace(
    'THE GEOPOLITICAL THEATER MAP & FLASHPOINTS',
    'THE GEOPOLITICAL THEATER & SPECIFICATION BLUEPRINT',
  );
  html = html.replace(
    'PHYSICAL TOPOGRAPHY, MARITIME CHOKEPOINTS & TERRITORIAL ORIGINS OF WAR',
    'EDEXCEL OPTION P5 CURRICULUM ARCHITECTURE & TERRITORIAL BENCHMARKS (1945–1995)',
  );

  // Inject Page 3 CSS
  const newPage3Css = `
    .kt-overview-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 3mm;
      flex: 1;
    }
    .kt-spec-card {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-top: 3px solid #1e3a8a;
      border-radius: 4px;
      padding: 5px 8px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .kt-spec-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
      margin-bottom: 3px;
    }
    .kt-spec-badge {
      font-family: var(--font-sans);
      font-size: 6.2pt;
      font-weight: 800;
      color: #ffffff;
      padding: 1px 5px;
      border-radius: 2px;
      letter-spacing: 0.05em;
    }
    .kt-spec-date {
      font-family: var(--font-sans);
      font-size: 6.4pt;
      font-weight: 700;
      color: #64748b;
    }
    .kt-spec-title {
      font-family: var(--font-display);
      font-size: 8.8pt;
      font-weight: 800;
      line-height: 1.15;
      margin-bottom: 4px;
    }
    .kt-spec-units {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }
    .kt-spec-unit {
      background: #f8fafc;
      border-left: 2px solid #cbd5e1;
      padding: 2.5px 5px;
      border-radius: 2px;
    }
    .kt-unit-code {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 1px;
    }
    .kt-unit-desc {
      font-family: var(--font-body);
      font-size: 7.2pt;
      line-height: 1.25;
      color: #334155;
    }
    .kt-spec-geo {
      background: #f1f5f9;
      border: 1px dashed #cbd5e1;
      border-radius: 2px;
      padding: 3px 5px;
      font-family: var(--font-sans);
      font-size: 6.2pt;
      line-height: 1.25;
      color: #475569;
      margin-top: 4px;
    }
  `;
  html = html.replace(
    '/* =============================================================\n       NARRATIVE ENQUIRY SPREADS',
    newPage3Css +
      '\n    /* =============================================================\n       NARRATIVE ENQUIRY SPREADS',
  );

  // Tune Page 2 spine padding slightly for 15 items
  html = html.replace(
    '.spine-content {\n      flex: 1;\n      background: #f8fafc;\n      border: 1px solid #e2e8f0;\n      border-left: 2.5px solid var(--navy-deep);\n      border-radius: 3px;\n      padding: 3.5px 8px;',
    '.spine-content {\n      flex: 1;\n      background: #f8fafc;\n      border: 1px solid #e2e8f0;\n      border-left: 2.5px solid var(--navy-deep);\n      border-radius: 3px;\n      padding: 2.5px 7px;',
  );

  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  // wait 1 sec for fonts
  await new Promise((r) => setTimeout(r, 1200));

  const p2 = await page.$('#page-2');
  const p3 = await page.$('#page-3');

  const artifactDir =
    'C:/Users/fives/.gemini/antigravity-ide/brain/9c54f6a7-31a4-4f9a-a543-dfbdde13fbae';
  await p2.screenshot({ path: path.join(artifactDir, 'test_spec_p2_spine.png') });
  await p3.screenshot({ path: path.join(artifactDir, 'test_spec_p3_blueprint.png') });

  const auditRes = await page.evaluate(() => {
    const pages = document.querySelectorAll('.a4-page');
    return [1, 2].map((idx) => {
      const p = pages[idx];
      return {
        page: idx + 1,
        scrollH: p.scrollHeight,
        clientH: p.clientHeight,
        overflow: p.scrollHeight > p.clientHeight + 4 ? p.scrollHeight - p.clientHeight : 0,
      };
    });
  });

  console.log('Audit Results for Page 2 and Page 3:', auditRes);
  await browser.close();
})();
