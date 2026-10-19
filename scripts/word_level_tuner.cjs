const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function fineTune() {
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

  // Read current converged enquiries
  let enquiries = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, 'converged_enquiries.json'), 'utf8'),
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

  // Targeted phrases for each block to achieve exact column balance and 12-22px footer clearance
  const CALIBRATION_WORDS = {
    // Page 2: Add to both Block 1 (~18w) and Block 2 (~35w)
    1.1: ' The crown was thus acquired through political negotiation rather than hereditary succession, creating an inherently fragile foundation for the new monarch.',
    1.2: ' Continental mercenary captains rallied eagerly to Normandy’s sanctified banners. Local thegns and churchmen accepted Harold’s swift coronation as an unavoidable wartime measure to protect England against simultaneous foreign invasions from Scandinavia and the continent.',

    // Page 3: Already optimal at 19px
    1.3: ' Hardrada’s sudden demise shattered Scandinavian martial ambitions in the British Isles forever.',
    1.4: ' The interlocking shield wall formed an unbroken wall of lime-wood and iron. The English infantry held their ground with grim determination throughout the long afternoon.',
    1.5: ' Harold’s personal bodyguard fought valiantly until all were cut down around his corpse.',

    // Page 4: Already optimal at 24px
    2.1: ' The rapid construction of motte-and-bailey fortifications secured immediate tactical control over surrounding shire communities.',
    2.2: ' The systematic destruction left entire northern parishes uncultivated for over a generation.',

    // Page 5: Already optimal at 13px
    2.3: ' The soaring limestone keep stood as an imposing coastal monument of royal majesty.',
    2.4: ' Royal valuation ledgers permanently fixed each tenant’s fiscal and military dues.',
    2.5: ' Norman feudal hegemony replaced Saxon customs with bonded manorial servitude.',

    // Page 6: Add ~30w to Block 1 (Column 1) so it comes down from gap 103px to gap 13px!
    3.1: ' Becket’s administrative efficiency expanded royal tax revenues across every English shire. Henry’s radical judicial reforms permanently reconstructed English royal governance, asserting crown jurisdiction over secular estates and curbing baronial defiance.',
    3.2: ' The Constitutions of Clarendon marked a dramatic attempt to subordinate church courts to royal law.',

    // Page 7: Add ~8w to Block 5 so it comes down from gap 27px to gap 14px!
    3.5: ' Becket’s brutal martyrdom cemented Canterbury’s status as Europe’s premier holy shrine, drawing thousands of devout pilgrims from across Christendom annually.',

    // Page 8: Add ~30w to Block 1 and ~8w to Block 2 so both reach gap 15px!
    4.1: ' John’s disastrous military failures completely discredited his monarchical standing among the barons. Alienated nobles began secret discussions to limit arbitrary royal power and protect their ancestral feudal inheritances.',
    4.2: ' Rebel barons pledged to resist royal extortion to the death, forming armed leagues across the northern and eastern counties.',

    // Page 9: Already optimal at 13px
    4.3: ' Disaffected barons assembled in arms, demanding immediate restoration of customary liberties.',
    4.4: ' The great seal attached at Runnymede bound the monarch to established legal principles.',

    // Page 10: Already optimal at 24px
    5.1: ' The terrifying contagion dismantled social structures and paralyzed parish church life across England.',
    5.2: ' Attempts to enforce feudal labour laws provoked deep resentment among surviving agricultural workers.',

    // Page 11: Already optimal at 15px
    5.4: ' The disciplined rebels targeted hated royal officials while strictly protecting the innocent.',
    5.5: ' The revolt left an indelible mark on English social history.',
  };

  // Apply calibration phrases carefully
  for (let enq of enquiries) {
    const vPage = enq.num * 2;
    const rPage = enq.num * 2 + 1;

    // Check verso
    let phrase1 = CALIBRATION_WORDS[`${enq.num}.1`];
    let phrase2 = CALIBRATION_WORDS[`${enq.num}.2`];

    if (phrase1) {
      enq.block1.paras[enq.block1.paras.length - 1] += phrase1;
      let s = await evaluateDOM(enquiries);
      let pageStat = s.find((p) => p.pageNum === vPage);
      if (pageStat.rightSpill > 0) {
        enq.block1.paras[enq.block1.paras.length - 1] = enq.block1.paras[
          enq.block1.paras.length - 1
        ].replace(phrase1, '');
      }
    }

    if (phrase2) {
      enq.block2.paras[enq.block2.paras.length - 1] += phrase2;
      let s = await evaluateDOM(enquiries);
      let pageStat = s.find((p) => p.pageNum === vPage);
      if (pageStat.rightSpill > 0) {
        enq.block2.paras[enq.block2.paras.length - 1] = enq.block2.paras[
          enq.block2.paras.length - 1
        ].replace(phrase2, '');
      }
    }

    // Check recto
    let phrase3 = CALIBRATION_WORDS[`${enq.num}.3`];
    let phrase4 = CALIBRATION_WORDS[`${enq.num}.4`];
    let phrase5 = CALIBRATION_WORDS[`${enq.num}.5`];

    if (phrase3) {
      enq.block3.paras[enq.block3.paras.length - 1] += phrase3;
      let s = await evaluateDOM(enquiries);
      let pageStat = s.find((p) => p.pageNum === rPage);
      if (pageStat.rightSpill > 0) {
        enq.block3.paras[enq.block3.paras.length - 1] = enq.block3.paras[
          enq.block3.paras.length - 1
        ].replace(phrase3, '');
      }
    }

    if (phrase4) {
      enq.block4.paras[enq.block4.paras.length - 1] += phrase4;
      let s = await evaluateDOM(enquiries);
      let pageStat = s.find((p) => p.pageNum === rPage);
      if (pageStat.rightSpill > 0) {
        enq.block4.paras[enq.block4.paras.length - 1] = enq.block4.paras[
          enq.block4.paras.length - 1
        ].replace(phrase4, '');
      }
    }

    if (phrase5) {
      enq.block5.paras[enq.block5.paras.length - 1] += phrase5;
      let s = await evaluateDOM(enquiries);
      let pageStat = s.find((p) => p.pageNum === rPage);
      if (pageStat.rightSpill > 0) {
        enq.block5.paras[enq.block5.paras.length - 1] = enq.block5.paras[
          enq.block5.paras.length - 1
        ].replace(phrase5, '');
      }
    }
  }

  const finalStats = await evaluateDOM(enquiries);
  console.log('\n================ CALIBRATION RESULTS AFTER TUNING ================');
  finalStats.forEach((m) => {
    console.log(
      `Page ${String(m.pageNum).padStart(2, ' ')}: ${m.status} | Words: ${m.words} | Gap: ${m.gap}px | Spill: ${m.rightSpill}px`,
    );
  });
  console.log('==================================================================\n');

  fs.writeFileSync(
    path.resolve(__dirname, 'perfect_calibrated_enquiries.json'),
    JSON.stringify(enquiries, null, 2),
  );
  await browser.close();
}

fineTune().catch(console.error);
