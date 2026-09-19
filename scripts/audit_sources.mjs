import { unitData } from '../units/edexcel_medicine/data.js';

const lessons = unitData.lessons || [];

console.log('=== MEDICINE SECTION B (KT1 - KT4) AUDIT ===');
lessons.slice(0, 20).forEach((l, idx) => {
  const textSources = [];
  (l.narrative_blocks || []).forEach((b, bIdx) => {
    const matches = (b.text || '').match(/Source\s+[A-Z]/gi) || [];
    matches.forEach((m) => textSources.push({ act: bIdx + 1, source: m }));
  });

  const blockSources = (l.narrative_blocks || [])
    .map((b, bIdx) => (b.source ? { act: bIdx + 1, title: b.source.title } : null))
    .filter(Boolean);

  const topSources = (l.sources || []).map((s) => s.title || s.id);

  console.log(`\n[Lesson ${idx + 1}: ${l.id}] ${l.title}`);
  console.log(
    `  Text mentions: ${textSources.map((t) => `${t.source} (Act ${t.act})`).join(', ') || 'None'}`,
  );
  console.log(
    `  Block sources: ${blockSources.map((b) => `${b.title} (Act ${b.act})`).join(' | ') || 'NONE'}`,
  );
  console.log(`  Top sources: ${topSources.join(' | ') || 'NONE'}`);
});
