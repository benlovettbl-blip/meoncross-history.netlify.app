const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Load base
const { CALIBRATED_ENQUIRIES } = require('./calibrated_enquiries_base.cjs');

// Sentences that can be appended or trimmed
const EXTRA_SENTENCES = {
  1.1: ' The decision reflected urgent practical necessity rather than dynastic continuity across the kingdom.',
  1.2: ' Monastic chroniclers across Normandy declared the expedition a sacred crusade against a perjured king.',
  1.3: ' The rapid march demonstrated Harold’s exceptional tactical leadership, catching the Norse invaders entirely unprepared.',
  1.4: ' The Saxon shield wall withstood repeated heavy cavalry assaults on the muddy incline.',
  1.5: ' Surviving Saxon housecarls died fighting to the last man around Harold’s royal dragon banner.',

  2.1: ' From the motte ramparts, sentries commanded unobstructed sightlines across the surrounding settlements.',
  2.2: ' Chroniclers recorded that starving survivors were reduced to begging across neighbouring shires.',
  2.3: ' Portchester’s monumental keep stood as an unshakeable statement of permanent Norman authority.',
  2.4: ' Royal commissioners questioned sworn juries to ensure no hide of land escaped valuation.',
  2.5: ' Anglo-Saxon customary liberties were extinguished under the harsh reality of feudal bondage.',

  3.1: ' Becket’s administrative genius recovered extensive royal revenues lost during the nineteen years of the Anarchy.',
  3.2: ' Henry insisted that a unified legal system was essential for public order and national peace.',
  3.3: ' From his French sanctuary, Becket rallied European churchmen against royal interference.',
  3.4: ' Believing they executed royal will, the four knights hastened toward Canterbury Cathedral.',
  3.5: ' Henry’s public flogging demonstrated the ultimate moral authority of the medieval Catholic Church.',

  4.1: ' The loss of Normandy shattered the cross-Channel wealth of the Anglo-Norman baronial families.',
  4.2: ' Royal extortion and arbitrary feudal fines drove the English barony toward armed revolt.',
  4.3: ' Bouvines destroyed John’s continental hopes and ignited rebellion among the northern barons.',
  4.4: ' Clause 39 established the enduring principle that sovereign royal authority was bounded by law.',
  4.5: ' Reissued by William Marshal, the Great Charter became the foundation of constitutional governance.',

  5.1: ' The catastrophic mortality destroyed village communities, leaving whole agricultural shires destitute.',
  5.2: ' Surviving labourers demanded cash wages, openly defying customary feudal manorial constraints.',
  5.3: ' The regency council’s flat-rate tax provoked widespread outrage and organized rural evasion.',
  5.4: ' The rebels targeted corrupt royal ministers while enforcing strict internal discipline.',
  5.5: ' Though the rebellion was suppressed, feudal serfdom gradually vanished over the next century.',
};

async function solveAllPages() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  const htmlPath =
    'file:///' +
    path.resolve(__dirname, '../public/units/medieval_england/textbook.html').replace(/\\/g, '/');
  await page.goto(htmlPath, { waitUntil: 'networkidle0' });

  let enquiries = JSON.parse(JSON.stringify(CALIBRATED_ENQUIRIES));

  async function evaluateDOM(currentEnquiries) {
    return await page.evaluate((enqs) => {
      function formatMarkdown(text) {
        if (!text) return '';
        return text
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>');
      }

      enqs.forEach((enq) => {
        const vPage = enq.num * 2;
        const rPage = enq.num * 2 + 1;

        const pV = document.querySelector('#page-' + vPage);
        const pR = document.querySelector('#page-' + rPage);

        if (pV) {
          const blocks = pV.querySelectorAll('.narrative-block');
          if (blocks.length >= 2) {
            const h1 = blocks[0].querySelector('.block-header');
            blocks[0].innerHTML = '';
            blocks[0].appendChild(h1);
            enq.block1.paras.forEach((p) => {
              const pEl = document.createElement('p');
              pEl.className = 'prose-p';
              pEl.innerHTML = `<span class="para-pill">[${enq.block1.ref}]</span> ${formatMarkdown(p)}`;
              blocks[0].appendChild(pEl);
            });

            const h2 = blocks[1].querySelector('.block-header');
            blocks[1].innerHTML = '';
            blocks[1].appendChild(h2);
            enq.block2.paras.forEach((p) => {
              const pEl = document.createElement('p');
              pEl.className = 'prose-p';
              pEl.innerHTML = `<span class="para-pill">[${enq.block2.ref}]</span> ${formatMarkdown(p)}`;
              blocks[1].appendChild(pEl);
            });
          }
        }

        if (pR) {
          const blocks = pR.querySelectorAll('.narrative-block');
          if (blocks.length >= 3) {
            const h3 = blocks[0].querySelector('.block-header');
            blocks[0].innerHTML = '';
            blocks[0].appendChild(h3);
            enq.block3.paras.forEach((p) => {
              const pEl = document.createElement('p');
              pEl.className = 'prose-p';
              pEl.innerHTML = `<span class="para-pill">[${enq.block3.ref}]</span> ${formatMarkdown(p)}`;
              blocks[0].appendChild(pEl);
            });

            const h4 = blocks[1].querySelector('.block-header');
            blocks[1].innerHTML = '';
            blocks[1].appendChild(h4);
            enq.block4.paras.forEach((p) => {
              const pEl = document.createElement('p');
              pEl.className = 'prose-p';
              pEl.innerHTML = `<span class="para-pill">[${enq.block4.ref}]</span> ${formatMarkdown(p)}`;
              blocks[1].appendChild(pEl);
            });

            const h5 = blocks[2].querySelector('.block-header');
            blocks[2].innerHTML = '';
            blocks[2].appendChild(h5);
            enq.block5.paras.forEach((p) => {
              const pEl = document.createElement('p');
              pEl.className = 'prose-p';
              pEl.innerHTML = `<span class="para-pill">[${enq.block5.ref}]</span> ${formatMarkdown(p)}`;
              blocks[2].appendChild(pEl);
            });
          }
        }
      });

      return [2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => {
        const p = document.querySelector('#page-' + num);
        const prose = p.querySelector('.prose-two-column');
        const footer = p.querySelector('.page-running-footer');
        const footerTop = footer ? footer.getBoundingClientRect().top : 0;
        const pRect = p.getBoundingClientRect();

        const leaves = Array.from(prose.querySelectorAll('.prose-p, .block-header'));
        const bottoms = leaves.map((el) => el.getBoundingClientRect().bottom);
        const rights = leaves.map((el) => el.getBoundingClientRect().right);

        const maxRight = Math.max(...rights);
        const rightSpill = maxRight > pRect.right ? Math.round(maxRight - pRect.right) : 0;
        const maxBottom = Math.max(...bottoms);
        const gap = Math.round(footerTop - maxBottom);

        const paras = Array.from(prose.querySelectorAll('.prose-p'));
        const words = paras
          .map((el) => el.textContent)
          .join(' ')
          .split(/\s+/)
          .filter(Boolean).length;

        const isOptimal = gap >= 10 && gap <= 24 && rightSpill === 0;

        return {
          pageNum: num,
          words,
          gap,
          rightSpill,
          isOptimal,
          status: isOptimal
            ? '✅ OPTIMAL'
            : rightSpill > 0
              ? `❌ SPILL (+${rightSpill}px)`
              : `❌ VOID (${gap}px)`,
        };
      });
    }, currentEnquiries);
  }

  // Optimize page by page
  for (let enq of enquiries) {
    const vPage = enq.num * 2;
    const rPage = enq.num * 2 + 1;

    // Verso tuning
    let stats = await evaluateDOM(enquiries);
    let vStat = stats.find((s) => s.pageNum === vPage);

    // Try adding sentences to Block 1 and Block 2
    if (!vStat.isOptimal) {
      const s1 = EXTRA_SENTENCES[`${enq.num}.1`];
      const s2 = EXTRA_SENTENCES[`${enq.num}.2`];

      // Test adding to block 1
      enq.block1.paras[enq.block1.paras.length - 1] += s1;
      stats = await evaluateDOM(enquiries);
      vStat = stats.find((s) => s.pageNum === vPage);

      if (vStat.rightSpill > 0) {
        // revert
        enq.block1.paras[enq.block1.paras.length - 1] = enq.block1.paras[
          enq.block1.paras.length - 1
        ].replace(s1, '');
      }

      // Test adding to block 2
      enq.block2.paras[enq.block2.paras.length - 1] += s2;
      stats = await evaluateDOM(enquiries);
      vStat = stats.find((s) => s.pageNum === vPage);

      if (vStat.rightSpill > 0) {
        // revert
        enq.block2.paras[enq.block2.paras.length - 1] = enq.block2.paras[
          enq.block2.paras.length - 1
        ].replace(s2, '');
      }
    }

    // Recto tuning
    stats = await evaluateDOM(enquiries);
    let rStat = stats.find((s) => s.pageNum === rPage);

    if (!rStat.isOptimal) {
      const s3 = EXTRA_SENTENCES[`${enq.num}.3`];
      const s4 = EXTRA_SENTENCES[`${enq.num}.4`];
      const s5 = EXTRA_SENTENCES[`${enq.num}.5`];

      // Test adding to block 3
      enq.block3.paras[enq.block3.paras.length - 1] += s3;
      stats = await evaluateDOM(enquiries);
      rStat = stats.find((s) => s.pageNum === rPage);
      if (rStat.rightSpill > 0) {
        enq.block3.paras[enq.block3.paras.length - 1] = enq.block3.paras[
          enq.block3.paras.length - 1
        ].replace(s3, '');
      }

      // Test adding to block 4
      enq.block4.paras[enq.block4.paras.length - 1] += s4;
      stats = await evaluateDOM(enquiries);
      rStat = stats.find((s) => s.pageNum === rPage);
      if (rStat.rightSpill > 0) {
        enq.block4.paras[enq.block4.paras.length - 1] = enq.block4.paras[
          enq.block4.paras.length - 1
        ].replace(s4, '');
      }

      // Test adding to block 5
      enq.block5.paras[enq.block5.paras.length - 1] += s5;
      stats = await evaluateDOM(enquiries);
      rStat = stats.find((s) => s.pageNum === rPage);
      if (rStat.rightSpill > 0) {
        enq.block5.paras[enq.block5.paras.length - 1] = enq.block5.paras[
          enq.block5.paras.length - 1
        ].replace(s5, '');
      }
    }
  }

  const finalStats = await evaluateDOM(enquiries);
  console.log('\n================ FINAL TUNING METRICS ================');
  finalStats.forEach((m) => {
    console.log(
      `Page ${String(m.pageNum).padStart(2, ' ')}: ${m.status} | Words: ${m.words} | Gap: ${m.gap}px | Spill: ${m.rightSpill}px`,
    );
  });
  console.log('======================================================\n');

  fs.writeFileSync(
    path.resolve(__dirname, 'converged_enquiries.json'),
    JSON.stringify(enquiries, null, 2),
  );
  await browser.close();
}

solveAllPages().catch(console.error);
