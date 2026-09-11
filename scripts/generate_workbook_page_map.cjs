const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const db = require('../public/database.json');
const pdfsDir = path.join(__dirname, '..', 'public', 'pdfs');

// Map of unit and booklet PDFs
const unitPdfConfigs = {
  australia: [{ booklet: 'Pupil Workbook', file: 'australia_pupil_workbook_FINAL_V17.pdf' }],
  cme_new: [
    {
      booklet: 'Key Topic 1 Booklet',
      file: 'cme_new_pupil_workbook_KT1_FINAL_V17.pdf',
      filter: (l, i) => i < 4,
    },
    {
      booklet: 'Key Topic 2 Booklet',
      file: 'cme_new_pupil_workbook_KT2_FINAL_V17.pdf',
      filter: (l, i) => i >= 4 && i < 7,
    },
    {
      booklet: 'Key Topic 3 Booklet',
      file: 'cme_new_pupil_workbook_KT3_FINAL_V17.pdf',
      filter: (l, i) => i >= 7,
    },
  ],
  cold_war: [{ booklet: 'Pupil Workbook', file: 'cold_war_pupil_workbook_FINAL_V17.pdf' }],
  early_modern_world: [
    { booklet: 'Pupil Workbook', file: 'early_modern_world_pupil_workbook_FINAL_V17.pdf' },
  ],
  edexcel_medicine: [
    {
      booklet: 'Medieval Booklet',
      file: 'edexcel_medicine_pupil_workbook_medieval_FINAL_V17.pdf',
      filter: (l) =>
        (l.id || '').includes('1_') ||
        (l.title || '').toLowerCase().includes('c1250') ||
        (l.title || '').toLowerCase().includes('medieval'),
    },
    {
      booklet: 'Renaissance Booklet',
      file: 'edexcel_medicine_pupil_workbook_renaissance_FINAL_V17.pdf',
      filter: (l) =>
        (l.id || '').includes('2_') || (l.title || '').toLowerCase().includes('renaissance'),
    },
    {
      booklet: '18th & 19th C Booklet',
      file: 'edexcel_medicine_pupil_workbook_18th_19th_FINAL_V17.pdf',
      filter: (l) =>
        (l.id || '').includes('3_') ||
        (l.title || '').toLowerCase().includes('18th') ||
        (l.title || '').toLowerCase().includes('19th'),
    },
    {
      booklet: 'Modern Booklet',
      file: 'edexcel_medicine_pupil_workbook_modern_FINAL_V17.pdf',
      filter: (l) =>
        (l.id || '').includes('4_') ||
        (l.title || '').toLowerCase().includes('modern') ||
        (l.title || '').toLowerCase().includes('c1900'),
    },
    {
      booklet: 'Western Front Booklet',
      file: 'edexcel_medicine_pupil_workbook_western_front_FINAL_V17.pdf',
      filter: (l) =>
        (l.id || '').includes('5_') || (l.title || '').toLowerCase().includes('western front'),
    },
  ],
  eee: [
    {
      booklet: 'Key Topic 1 Booklet',
      file: 'eee_pupil_workbook_KT1_FINAL_V17.pdf',
      filter: (l, i) => i < 4,
    },
    {
      booklet: 'Key Topic 2 Booklet',
      file: 'eee_pupil_workbook_KT2_FINAL_V17.pdf',
      filter: (l, i) => i >= 4 && i < 8,
    },
    {
      booklet: 'Key Topic 3 Booklet',
      file: 'eee_pupil_workbook_KT3_FINAL_V17.pdf',
      filter: (l, i) => i >= 8,
    },
  ],
  great_war: [{ booklet: 'Pupil Workbook', file: 'great_war_pupil_workbook_FINAL_V17.pdf' }],
  great_war_part2: [
    { booklet: 'Pupil Workbook', file: 'great_war_part2_pupil_workbook_FINAL_V17.pdf' },
  ],
  industrialisation_and_empire: [
    {
      booklet: 'Pupil Workbook',
      file: 'industrialisation_and_empire_pupil_workbook_FINAL_V17.pdf',
    },
  ],
  medieval_england: [
    { booklet: 'Pupil Workbook', file: 'medieval_england_pupil_workbook_FINAL_V17.pdf' },
  ],
  post_war_britain: [
    { booklet: 'Pupil Workbook', file: 'post_war_britain_pupil_workbook_FINAL_V17.pdf' },
  ],
  the_shoah: [{ booklet: 'Pupil Workbook', file: 'the_shoah_pupil_workbook_FINAL_V17.pdf' }],
  trip_ypres: [{ booklet: 'Pupil Workbook', file: 'trip_ypres_pupil_workbook_FINAL_V17.pdf' }],
  usa: [
    {
      booklet: 'Key Topic 1 Booklet',
      file: 'usa_pupil_workbook_KT1_FINAL_V17.pdf',
      filter: (l, i) => i < 4,
    },
    {
      booklet: 'Key Topic 2 Booklet',
      file: 'usa_pupil_workbook_KT2_FINAL_V17.pdf',
      filter: (l, i) => i >= 4 && i < 8,
    },
    {
      booklet: 'Key Topic 3 Booklet',
      file: 'usa_pupil_workbook_KT3_FINAL_V17.pdf',
      filter: (l, i) => i >= 8 && i < 11,
    },
    {
      booklet: 'Key Topic 4 Booklet',
      file: 'usa_pupil_workbook_KT4_FINAL_V17.pdf',
      filter: (l, i) => i >= 11,
    },
  ],
  water_and_sanitation: [
    { booklet: 'Pupil Workbook', file: 'water_and_sanitation_pupil_workbook_FINAL_V17.pdf' },
  ],
  weimar_nazi_germany: [
    {
      booklet: 'Key Topic 1 Booklet',
      file: 'weimar_nazi_germany_pupil_workbook_KT1_FINAL_V17.pdf',
      filter: (l, i) => i < 4,
    },
    {
      booklet: 'Key Topic 2 Booklet',
      file: 'weimar_nazi_germany_pupil_workbook_KT2_FINAL_V17.pdf',
      filter: (l, i) => i >= 4 && i < 8,
    },
    {
      booklet: 'Key Topic 3 Booklet',
      file: 'weimar_nazi_germany_pupil_workbook_KT3_FINAL_V17.pdf',
      filter: (l, i) => i >= 8 && i < 12,
    },
    {
      booklet: 'Key Topic 4 Booklet',
      file: 'weimar_nazi_germany_pupil_workbook_KT4_FINAL_V17.pdf',
      filter: (l, i) => i >= 12,
    },
  ],
};

async function parsePdf(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const dataBuffer = fs.readFileSync(filePath);
  const pageMap = {};
  function render_page(pageData) {
    return pageData.getTextContent({ normalizeWhitespace: true }).then(function (textContent) {
      let text = '';
      for (let item of textContent.items) {
        text += item.str + ' ';
      }
      pageMap[pageData.pageIndex + 1] = text.replace(/\s+/g, '');
      return text;
    });
  }
  const data = await pdf(dataBuffer, { pagerender: render_page });
  return { numpages: data.numpages, pageMap };
}

async function run() {
  console.log('Generating Workbook Page Map from PDF files in public/pdfs...');
  const masterMap = {};

  for (const [unitId, configs] of Object.entries(unitPdfConfigs)) {
    const unitData = db[unitId] && (db[unitId].data || db[unitId]);
    if (!unitData || !unitData.lessons) continue;

    masterMap[unitId] = {};
    const lessons = unitData.lessons;

    for (const config of configs) {
      const pdfPath = path.join(pdfsDir, config.file);
      const pdfRes = await parsePdf(pdfPath);
      if (!pdfRes) {
        console.warn(`⚠️ Warning: PDF not found ${pdfPath}`);
        continue;
      }

      const relevantLessons = config.filter ? lessons.filter(config.filter) : lessons;

      relevantLessons.forEach((lesson, relIdx) => {
        const fullIdx = lessons.findIndex((l) =>
          l.id && lesson.id ? l.id === lesson.id : l.title === lesson.title,
        );
        const lNum = fullIdx + 1;
        const relNum = relIdx + 1;

        // Candidate search needles
        const cleanTitle = (lesson.title || '')
          .replace(/^L\d+:\s*/i, '')
          .replace(/^Lesson\s*\d+:\s*/i, '')
          .replace(/^Assessment:\s*/i, '')
          .replace(/\s+/g, '')
          .slice(0, 20);

        let foundPage = null;

        // Lessons start on page 3 or later (page 1 is cover, page 2 is progress tracker/spec)
        for (let p = 3; p <= pdfRes.numpages; p++) {
          const pText = pdfRes.pageMap[p] || '';

          // Match L{lNum}: or L{relNum}: or Title snippet
          const matchLFull = pText.includes(`L${lNum}:`);
          const matchLRel = pText.includes(`L${relNum}:`);
          const matchTitle = cleanTitle.length > 5 && pText.includes(cleanTitle);

          if ((matchLFull || matchLRel) && matchTitle) {
            foundPage = p;
            break;
          }
        }

        // Fallback: search just L{relNum}: or cleanTitle
        if (!foundPage) {
          for (let p = 3; p <= pdfRes.numpages; p++) {
            const pText = pdfRes.pageMap[p] || '';
            if (pText.includes(`L${relNum}:`) || pText.includes(`L${lNum}:`)) {
              foundPage = p;
              break;
            }
          }
        }

        if (!foundPage && cleanTitle.length > 8) {
          for (let p = 3; p <= pdfRes.numpages; p++) {
            const pText = pdfRes.pageMap[p] || '';
            if (pText.includes(cleanTitle)) {
              foundPage = p;
              break;
            }
          }
        }

        const lessonKey = lesson.id || `lesson_${fullIdx + 1}`;
        masterMap[unitId][lessonKey] = {
          page: foundPage || 3 + relIdx * 6,
          booklet: config.booklet,
          unitId: unitId,
          lessonIndex: fullIdx,
        };
      });
    }
  }

  // Write out as JS module and JSON
  const outJsonPath = path.join(__dirname, '..', 'src', 'engine', 'workbook_page_map.json');
  fs.writeFileSync(outJsonPath, JSON.stringify(masterMap, null, 2));

  const outJsPath = path.join(__dirname, '..', 'src', 'engine', 'workbook_page_map.js');
  const jsContent = `// Auto-generated mapping of curriculum units and lessons to physical printed workbook page numbers\nexport const WORKBOOK_PAGE_MAP = ${JSON.stringify(masterMap, null, 2)};\n\nexport function getWorkbookPageAnchor(unitId, lessonOrId, fallbackIdx = 0) {\n  if (!unitId) return null;\n  const unitMap = WORKBOOK_PAGE_MAP[unitId];\n  if (!unitMap) return null;\n\n  let lessonKey = '';\n  if (typeof lessonOrId === 'string') {\n    lessonKey = lessonOrId;\n  } else if (lessonOrId && lessonOrId.id) {\n    lessonKey = lessonOrId.id;\n  } else {\n    lessonKey = 'lesson_' + (fallbackIdx + 1);\n  }\n\n  let entry = unitMap[lessonKey];\n  if (!entry) {\n    // Try finding by lessonIndex\n    entry = Object.values(unitMap).find((e) => e.lessonIndex === fallbackIdx);\n  }\n\n  if (!entry) return null;\n\n  const isMultiBooklet = ['cme_new', 'edexcel_medicine', 'eee', 'usa', 'weimar_nazi_germany'].includes(unitId);\n  if (isMultiBooklet && entry.booklet) {\n    return { page: entry.page, booklet: entry.booklet, label: \`Page \${entry.page} (\${entry.booklet})\`, shortLabel: \`Page \${entry.page}\` };\n  }\n  return { page: entry.page, booklet: 'Workbook', label: \`Workbook Page \${entry.page}\`, shortLabel: \`Page \${entry.page}\` };\n}\n`;

  fs.writeFileSync(outJsPath, jsContent);
  console.log(`✅ Successfully generated workbook page map: ${outJsPath} and ${outJsonPath}`);
}

run().catch((err) => {
  console.error('❌ Error generating page map:', err);
  process.exit(1);
});
