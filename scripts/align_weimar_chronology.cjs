const fs = require('fs');
const path = require('path');

// Target block mapping (0-indexed) for [imageBlockIdx, quoteBlockIdx]
const LESSON_TARGET_MAP = {
  lesson_1_1: { imageBlock: 2, quoteBlock: 0 },
  lesson_1_2: { imageBlock: 2, quoteBlock: 4 }, // User's specific issue: Kapp Putsch to block 2, Pustau to block 4
  lesson_1_3: { imageBlock: 0, quoteBlock: 4 }, // Stresemann dancing on a volcano to block 4
  lesson_1_4: { imageBlock: 2, quoteBlock: 2 }, // Bauhaus & Isherwood to culture (block 2)
  lesson_2_1: { imageBlock: 1, quoteBlock: 1 }, // Hitler portrait & Ludecke to oratory (block 1)
  lesson_2_2: { imageBlock: 2, quoteBlock: 1 }, // Hanfstaengl to Bürgerbräukeller (block 1), trial image to trial (block 2)
  lesson_2_3: { imageBlock: 3, quoteBlock: 0 }, // Hauser in block 0, election poster to campaign (block 3)
  lesson_2_4: { imageBlock: 4, quoteBlock: 4 }, // Papen quote & Hindenburg image to appointment (block 4)
  lesson_3_1: { imageBlock: 0, quoteBlock: 0 }, // Reichstag fire image & Sternberger quote in block 0
  lesson_3_2: { imageBlock: 3, quoteBlock: 0 }, // Klemperer in block 0 (Gestapo), Dachau image to Dachau (block 3)
  lesson_3_3: { imageBlock: 2, quoteBlock: 2 }, // Shirer quote & rally image to Nuremberg Rally (block 2)
  lesson_3_4: { imageBlock: 3, quoteBlock: 3 }, // Sophie Scholl & Hans Scholl to youth resistance (block 3)
  lesson_4_1: { imageBlock: 1, quoteBlock: 1 }, // Mother's Cross & Gartner to birth rewards (block 1)
  lesson_4_2: { imageBlock: 3, quoteBlock: 3 }, // BDM pennant & Heck quote to youth movements (block 3)
  lesson_4_3: { imageBlock: 0, quoteBlock: 3 }, // Autobahn in block 0, worker DAF quote to DAF (block 3)
  lesson_4_4: { imageBlock: 4, quoteBlock: 4 }, // Kristallnacht image & Klüger quote to Kristallnacht (block 4)
};

function processDataFile(filePath) {
  console.log(`Processing ${filePath}...`);
  const content = fs.readFileSync(filePath, 'utf8');
  const cleanContent = content
    .replace(/export\s+const\s+unitData\s*=\s*[^;]+;/g, '')
    .replace(/export\s+default\s+[^;]+;/g, '')
    .replace(/if\s*\(typeof\s+module[^\}]+\}\s*\}/g, '');
  const getUnitData = new Function(
    cleanContent +
      '\nreturn typeof unitData !== "undefined" ? unitData : (typeof weimar_nazi_germany !== "undefined" ? weimar_nazi_germany : this.unitData);',
  );
  const unitData = getUnitData();

  unitData.lessons.forEach((l, idx) => {
    const targets = LESSON_TARGET_MAP[l.id];
    if (!targets) return;

    // 1. Extract image from wherever it is
    let extractedImage = null;
    l.narrative_blocks.forEach((b) => {
      if (b.images && b.images.length > 0) {
        extractedImage = b.images[0];
        delete b.images;
      }
    });

    // 2. Extract lived experience quote from wherever it is
    let extractedQuote = null;
    l.narrative_blocks.forEach((b) => {
      if (b.text && b.text.includes('Lived Experience:')) {
        const match = b.text.match(
          /(?:<br\s*\/?>\s*)*>\s*\*\*Lived Experience:[^\n<]+(?:\*\*|<br\s*\/?>)[^"]*"[^"]*"/i,
        );
        if (match) {
          extractedQuote = match[0].replace(/^(?:<br\s*\/?>\s*)+/, '');
          b.text = b.text.replace(match[0], '').trim();
        }
      }
    });

    // 3. Place image into target block
    if (extractedImage) {
      const targetBlockIdx = Math.min(targets.imageBlock, l.narrative_blocks.length - 1);
      l.narrative_blocks[targetBlockIdx].images = [extractedImage];
    }

    // 4. Place quote into target block text
    if (extractedQuote) {
      const targetBlockIdx = Math.min(targets.quoteBlock, l.narrative_blocks.length - 1);
      const b = l.narrative_blocks[targetBlockIdx];
      b.text = b.text.trim() + '<br><br>> ' + extractedQuote.replace(/^>\s*/, '');
    }

    console.log(
      `  ✓ Lesson ${idx + 1} (${l.id}): Image placed in Block ${targets.imageBlock + 1}, Quote placed in Block ${targets.quoteBlock + 1}`,
    );
  });

  const outputCode = `const unitData = ${JSON.stringify(unitData, null, 2)};\n\nexport default unitData;\n`;
  fs.writeFileSync(filePath, outputCode, 'utf8');
  console.log(`Saved ${filePath} successfully.\n`);
}

// Execute on both data files
processDataFile(path.join(__dirname, '../units/weimar_nazi_germany/data.js'));
processDataFile(path.join(__dirname, '../public/units/weimar_nazi_germany/data.js'));
