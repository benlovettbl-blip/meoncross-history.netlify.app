const path = require('path');
const { pathToFileURL } = require('url');

async function auditMedicine() {
  const mod = await import(pathToFileURL(path.resolve('units/edexcel_medicine/data.js')).href);
  const u = mod.default || mod.unitData;
  console.log('Total lessons:', u.lessons.length);

  u.lessons.forEach((l, idx) => {
    const blocks = l.narrative_blocks || [];
    const acts = blocks.filter(
      (b) =>
        (b.act && b.act >= 1 && b.act <= 4) ||
        (b.title && b.title.startsWith('Act')) ||
        b.act_title,
    ).length;
    const blocksCount = blocks.length;
    const sourcesInBlocks = blocks.filter((b) => b.source).length;
    const sourcesArray = (l.sources || []).length;
    const hasAudio = !!(l.audio || l.audio_url || l.narration);
    const hasTeacherNotes = !!l.teacher_notes;
    const hasParaRefs = blocks.some((b) => (b.text || '').includes('class="para-ref"'));
    const is4Act = acts >= 4;

    console.log(
      `L${(idx + 1).toString().padStart(2, '0')} [${l.id.padEnd(11, ' ')}] Acts: ${acts}/${blocksCount} | ParaRefs: ${hasParaRefs ? 'YES' : 'NO '} | BlkSrc: ${sourcesInBlocks} | TopSrc: ${sourcesArray} | TNotes: ${hasTeacherNotes ? 'YES' : 'NO '} | ${l.title}`,
    );
  });
}
auditMedicine();
