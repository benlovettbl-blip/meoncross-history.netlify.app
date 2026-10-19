const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function testHarmonized() {
  const enquiries = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, 'perfect_calibrated_enquiries.json'), 'utf8'),
  );

  // Page 4 (Enquiry 2 Verso)
  enquiries[1].block1.paras[2] =
    'The earthworks transformed the landscape into a theatre of occupation. Concentric ditches and timber palisades protected Norman cavalry inside the bailey, enabling garrisons to strike swiftly at the first whisper of revolt and retreat safely before rebels could organize effective counter-attacks. From the motte ramparts, sentries commanded unobstructed sightlines across surrounding settlements, ensuring no hostile force could assemble undetected.';
  enquiries[1].block2.paras[2] =
    'The destruction of the northern shires was deliberate state terror designed to break the Saxon spirit forever. Starving survivors sold themselves into perpetual slavery merely for bread, ensuring that the north remained an economic wasteland pacified through merciless royal violence. Chroniclers recorded that starving survivors were reduced to begging across neighbouring shires for sustenance. By depopulating Yorkshire, William eliminated northern rebellion and secured the frontier for an entire generation.';

  // Page 6 (Enquiry 3 Verso)
  enquiries[2].block1.paras[2] =
    'The bond between them was founded on shared political ambition. Becket wielded royal authority with uncompromising zeal, dismantling adulterine unlicensed castles and reclaiming royal demesne lands. Henry saw Becket as an exceptionally gifted executive completely committed to the centralisation of royal monarchical power. Becket’s administrative genius recovered extensive royal revenues lost during the nineteen years of the Anarchy, expanding royal justice across every shire and curbing baronial defiance with uncompromising vigour. The King recognized that Becket’s relentless drive was indispensable for royal authority.';
  enquiries[2].block2.paras[2] =
    'In the **Constitutions of Clarendon (1164)**, Henry demanded that guilty clergy be handed over to royal judges for execution. Becket furiously refused, insisting that clerics answered only to God and the Pope. The clash exposed an irreconcilable division between secular royal authority and universal papal supremacy. Henry insisted that a unified legal system was essential for public order, while Becket declared that holy scripture forbade double punishment for any anointed servant of God. Secular and canon law remained locked in conflict.';

  // Page 10 (Enquiry 5 Verso)
  enquiries[4].block1.paras[2] =
    'The sheer speed and ferocity of the contagion dismantled social order. Priests fled parish churches rather than administer last rites, while terrified families abandoned sick relatives to die in agony. In bustling market towns like Bristol and London, communal burial pits were dug sixty feet long to receive hundreds of corpses stacked each night, shattering the demographic fabric of the kingdom. The sudden evaporation of millions of lives tore through medieval society like an apocalyptic shockwave. Monasteries lost entire communities of clergy, while ripe crops rotted unharvested across abandoned countrysides.';
  enquiries[4].block2.paras[2] =
    'Landlords who were desperate to secure harvests were forced into widespread hypocrisy: they paid illegal cash bonuses under the table while publicly demanding that the Crown enforce the statute. For ordinary villeins, the law exposed the oppressive machinery of the feudal state, fostering a culture of active defiance that smouldered across rural England. Surviving labourers demanded cash wages, openly defying customary feudal manorial constraints and laying the foundations for future peasant resistance.';

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

  await page.addStyleTag({
    content: `
      .prose-p {
        line-height: 1.57 !important;
        margin-bottom: 5.8px !important;
      }
      .prose-two-column .narrative-block:last-child,
      .prose-two-column .narrative-block:last-child .prose-p:last-child {
        margin-bottom: 0 !important;
      }
      .page-running-footer {
        margin-top: 2.2mm !important;
      }
    `,
  });

  const stats = await page.evaluate((enqs) => {
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

    return [2, 4, 6, 8, 10].map((num) => {
      const p = document.querySelector('#page-' + num);
      const prose = p.querySelector('.prose-two-column');
      const footer = p.querySelector('.page-running-footer');
      const footerTop = footer ? footer.getBoundingClientRect().top : 0;
      const pRect = p.getBoundingClientRect();

      const b1 = prose.querySelectorAll('.narrative-block')[0];
      const b2 = prose.querySelectorAll('.narrative-block')[1];
      const b1Rect = b1.getBoundingClientRect();
      const b2Rect = b2.getBoundingClientRect();

      const b1Header = b1.querySelector('.block-header').getBoundingClientRect();
      const b2Header = b2.querySelector('.block-header').getBoundingClientRect();

      const leaves = Array.from(prose.querySelectorAll('.prose-p, .block-header'));
      const bottoms = leaves.map((el) => el.getBoundingClientRect().bottom);
      const rights = leaves.map((el) => el.getBoundingClientRect().right);

      const maxRight = Math.max(...rights);
      const rightSpill = maxRight > pRect.right ? Math.round(maxRight - pRect.right) : 0;
      const maxBottom = Math.max(...bottoms);
      const gap = Math.round(footerTop - maxBottom);

      const isBlock2AtCol2Top = b2Header.top < b1Header.bottom + 10;
      const b1EndDiff = Math.round(footerTop - b1Rect.bottom);
      const b2EndDiff = Math.round(footerTop - b2Rect.bottom);

      return {
        pageNum: num,
        gap,
        rightSpill,
        b1EndDiff,
        b2EndDiff,
        isBlock2AtCol2Top,
        b2HeaderTop: Math.round(b2Header.top),
        b1HeaderTop: Math.round(b1Header.top),
      };
    });
  }, enquiries);

  console.log('Verso Spread Separation Analysis:');
  stats.forEach((s) => {
    console.log(
      `Page ${s.pageNum}: Gap ${s.gap}px | Spill ${s.rightSpill}px | Col 1 diff: ${s.b1EndDiff}px | Col 2 diff: ${s.b2EndDiff}px | B2 at Top: ${s.isBlock2AtCol2Top} (B1 top: ${s.b1HeaderTop}, B2 top: ${s.b2HeaderTop})`,
    );
  });

  const allPerfect = stats.every(
    (s) => s.gap >= 8 && s.gap <= 25 && s.rightSpill === 0 && s.isBlock2AtCol2Top,
  );
  console.log('All Verso Spreads Perfectly Separated & Filled:', allPerfect);

  if (allPerfect) {
    fs.writeFileSync(
      path.resolve(__dirname, 'perfect_calibrated_enquiries.json'),
      JSON.stringify(enquiries, null, 2),
    );
    console.log('Saved harmonized enquiries to perfect_calibrated_enquiries.json');
  }

  await browser.close();
}

testHarmonized().catch(console.error);
