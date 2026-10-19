const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function tuneAll12Pages() {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  page.on('console', (msg) => console.log(msg.text()));
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  const htmlPath =
    'file:///' +
    path.resolve(__dirname, '../public/units/medieval_england/textbook.html').replace(/\\/g, '/');
  await page.goto(htmlPath, { waitUntil: 'networkidle0' });

  // Fine-tune line-height and margin slightly
  await page.addStyleTag({
    content: `
      .prose-p {
        line-height: 1.57 !important;
        margin-bottom: 5.8px !important;
      }
      .prose-two-column .narrative-block:last-child .prose-p:last-child {
        margin-bottom: 0 !important;
      }
      .prose-two-column .narrative-block:last-child {
        margin-bottom: 0 !important;
      }
      .page-running-footer {
        margin-top: 2.2mm !important;
      }
    `,
  });

  // Read current perfect_calibrated_enquiries.json
  let enquiries = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, 'perfect_calibrated_enquiries.json'), 'utf8'),
  );

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

      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => {
        const p = document.querySelector('#page-' + num);
        const prose = p.querySelector('.prose-two-column');
        if (!prose) {
          return { pageNum: num, words: 0, gap: 18, rightSpill: 0, isOptimal: true };
        }

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

        const isOptimal = gap >= 8 && gap <= 25 && rightSpill === 0;

        if (num === 7) {
          console.log(
            `P7 maxBottom: ${maxBottom}, footerTop: ${footerTop}, gap: ${gap}, rightSpill: ${rightSpill}`,
          );
        }

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

  // Exact step additions calibrated to 15px–24px zero-spill sweet spot:
  // Page 2:
  enquiries[0].block1.paras[2] +=
    ' English nobles across Mercia accepted Harold’s leadership as the realm’s rightful guardian.';
  enquiries[0].block2.paras[2] +=
    ' Continental mercenaries rallied to Normandy’s banners, eager for English land.';

  // Page 4: add ~3w instead of 6w to land at ~20px without spilling
  enquiries[1].block1.paras[2] += ' Norman garrisons secured the surrounding countryside.';

  // Page 6: add ~3w instead of 6w to land at ~20px without spilling
  enquiries[2].block1.paras[2] += ' Royal justices enforced royal law firmly.';

  // Page 7 search:
  const baseP5 = enquiries[2].block5.paras[1];
  const candidates = [
    ' The martyr’s shrine attracted thousands of European pilgrims.',
    ' Both crown and church established an uneasy truce.',
    ' Royal authority was forced to acknowledge canonical limits.',
    ' King Henry never fully recovered his earlier unbridled authority.',
    ' The dramatic penance preserved the Angevin monarchy from excommunication.',
    ' Monarchy and papacy reached an uneasy equilibrium.',
    ' European rulers acknowledged that spiritual power could humble monarchs.',
    ' Becket’s sacrifice defined the moral boundaries of medieval monarchy.',
  ];

  let bestCandidate = '';
  for (const c of candidates) {
    enquiries[2].block5.paras[1] = baseP5 + c;
    const stats = await evaluateDOM(enquiries);
    const p7 = stats.find((s) => s.pageNum === 7);
    console.log(
      `[P7 CANDIDATE] "${c.trim()}" => gap: ${p7.gap}px, spill: ${p7.rightSpill}px, optimal: ${p7.isOptimal}`,
    );
    if (p7.isOptimal) {
      bestCandidate = c;
      break;
    }
  }
  enquiries[2].block5.paras[1] = baseP5 + bestCandidate;

  // Page 8: gap 39px -> add 6w to b1 and 5w to b2
  enquiries[3].block1.paras[2] += ' Opposition united the barony against the Angevin crown.';
  enquiries[3].block2.paras[2] += ' Resistance spread across northern England.';

  // Page 10: gap 29px -> add 6w
  enquiries[4].block1.paras[2] +=
    ' The social impact remained profound and permanent across England.';

  const finalStats = await evaluateDOM(enquiries);
  console.log('\n================ FINAL 12-PAGE PERFECTION AUDIT ================');
  finalStats.forEach((m) => {
    if (m.words === 0) {
      console.log(`Page ${String(m.pageNum).padStart(2, ' ')}: ✅ OPTIMAL (Cover)`);
    } else {
      console.log(
        `Page ${String(m.pageNum).padStart(2, ' ')}: ${m.status} | Words: ${m.words} | Gap: ${m.gap}px | Spill: ${m.rightSpill}px`,
      );
    }
  });
  console.log('=================================================================\n');

  const allOptimal = finalStats.every((m) => m.isOptimal);
  if (allOptimal) {
    console.log('🎉 100% PERFECT: ALL 12 PAGES ARE OPTIMAL!');
    fs.writeFileSync(
      path.resolve(__dirname, 'perfect_calibrated_enquiries.json'),
      JSON.stringify(enquiries, null, 2),
    );
  } else {
    console.log('Some pages still need tuning.');
  }

  await browser.close();
}

tuneAll12Pages().catch(console.error);
