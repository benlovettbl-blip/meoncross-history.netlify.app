const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const db = require('../public/database.json');
const pdfsDir = path.join(__dirname, '..', 'public', 'pdfs');

function resolvePdfFile(...candidates) {
  for (const c of candidates) {
    if (c && fs.existsSync(path.join(pdfsDir, c))) {
      return c;
    }
  }
  return candidates[0];
}

// Map of unit and booklet PDFs
const unitPdfConfigs = {
  australia: [
    {
      booklet: 'Pupil Workbook',
      file: resolvePdfFile(
        'australia_pupil_workbook.pdf',
        'australia_pupil_workbook_FINAL_V17.pdf',
      ),
    },
  ],
  cme_new: [
    {
      booklet: 'Key Topic 1 Booklet',
      file: resolvePdfFile(
        'cme_new_pupil_workbook_KT1.pdf',
        'cme_new_pupil_workbook_KT1_FINAL_V17.pdf',
      ),
      filter: (l, i) => (l.title || '').includes('KT 1') || (l.title || '').includes('KT1'),
    },
    {
      booklet: 'Key Topic 2 Booklet',
      file: resolvePdfFile(
        'cme_new_pupil_workbook_KT2.pdf',
        'cme_new_pupil_workbook_KT2_FINAL_V17.pdf',
      ),
      filter: (l, i) => (l.title || '').includes('KT 2') || (l.title || '').includes('KT2'),
    },
    {
      booklet: 'Key Topic 3 Booklet',
      file: resolvePdfFile(
        'cme_new_pupil_workbook_KT3.pdf',
        'cme_new_pupil_workbook_KT3_FINAL_V17.pdf',
      ),
      filter: (l, i) => (l.title || '').includes('KT 3') || (l.title || '').includes('KT3'),
    },
  ],
  cold_war: [
    {
      booklet: 'Pupil Workbook',
      file: resolvePdfFile('cold_war_pupil_workbook.pdf', 'cold_war_pupil_workbook_FINAL_V17.pdf'),
    },
  ],
  early_modern_world: [
    {
      booklet: 'Pupil Workbook',
      file: resolvePdfFile(
        'early_modern_world_pupil_workbook.pdf',
        'early_modern_world_pupil_workbook_FINAL_V17.pdf',
      ),
    },
  ],
  edexcel_medicine: [
    {
      booklet: 'Medieval Booklet',
      file: resolvePdfFile(
        'edexcel_medicine_pupil_workbook_medieval.pdf',
        'edexcel_medicine_pupil_workbook_medieval_FINAL_V17.pdf',
      ),
      filter: (l) =>
        (l.id || '').includes('1_') ||
        (l.title || '').toLowerCase().includes('c1250') ||
        (l.title || '').toLowerCase().includes('medieval'),
    },
    {
      booklet: 'Renaissance Booklet',
      file: resolvePdfFile(
        'edexcel_medicine_pupil_workbook_renaissance.pdf',
        'edexcel_medicine_pupil_workbook_renaissance_FINAL_V17.pdf',
      ),
      filter: (l) =>
        (l.id || '').includes('2_') || (l.title || '').toLowerCase().includes('renaissance'),
    },
    {
      booklet: '18th & 19th C Booklet',
      file: resolvePdfFile(
        'edexcel_medicine_pupil_workbook_18th_19th.pdf',
        'edexcel_medicine_pupil_workbook_18th_19th_FINAL_V17.pdf',
      ),
      filter: (l) =>
        (l.id || '').includes('3_') ||
        (l.title || '').toLowerCase().includes('18th') ||
        (l.title || '').toLowerCase().includes('19th'),
    },
    {
      booklet: 'Modern Booklet',
      file: resolvePdfFile(
        'edexcel_medicine_pupil_workbook_modern.pdf',
        'edexcel_medicine_pupil_workbook_modern_FINAL_V17.pdf',
      ),
      filter: (l) =>
        (l.id || '').includes('4_') ||
        (l.title || '').toLowerCase().includes('modern') ||
        (l.title || '').toLowerCase().includes('c1900'),
    },
    {
      booklet: 'Western Front Booklet',
      file: resolvePdfFile(
        'edexcel_medicine_pupil_workbook_western_front.pdf',
        'edexcel_medicine_pupil_workbook_western_front_FINAL_V17.pdf',
      ),
      filter: (l) =>
        (l.id || '').includes('5_') || (l.title || '').toLowerCase().includes('western front'),
    },
  ],
  eee: [
    {
      booklet: 'Key Topic 1 Booklet',
      file: resolvePdfFile('eee_pupil_workbook_KT1.pdf', 'eee_pupil_workbook_KT1_FINAL_V17.pdf'),
      filter: (l, i) => i < 4,
    },
    {
      booklet: 'Key Topic 2 Booklet',
      file: resolvePdfFile('eee_pupil_workbook_KT2.pdf', 'eee_pupil_workbook_KT2_FINAL_V17.pdf'),
      filter: (l, i) => i >= 4 && i < 8,
    },
    {
      booklet: 'Key Topic 3 Booklet',
      file: resolvePdfFile('eee_pupil_workbook_KT3.pdf', 'eee_pupil_workbook_KT3_FINAL_V17.pdf'),
      filter: (l, i) => i >= 8,
    },
  ],
  great_war: [
    {
      booklet: 'Pupil Workbook',
      file: resolvePdfFile(
        'great_war_pupil_workbook_V2.pdf',
        'great_war_pupil_workbook.pdf',
        'great_war_pupil_workbook_FINAL_V17.pdf',
      ),
    },
  ],
  great_war_part2: [
    {
      booklet: 'Pupil Workbook',
      file: resolvePdfFile(
        'great_war_part2_pupil_workbook.pdf',
        'great_war_part2_pupil_workbook_FINAL_V17.pdf',
      ),
    },
  ],
  industrialisation_and_empire: [
    {
      booklet: 'Pupil Workbook',
      file: resolvePdfFile(
        'industrialisation_and_empire_pupil_workbook.pdf',
        'industrialisation_and_empire_pupil_workbook_FINAL_V17.pdf',
      ),
    },
  ],
  first_british_empire: [
    {
      booklet: 'Pupil Workbook',
      file: resolvePdfFile(
        'first_british_empire_pupil_workbook.pdf',
        'first_british_empire_pupil_workbook_FINAL_V17.pdf',
      ),
    },
  ],
  second_british_empire: [
    {
      booklet: 'Pupil Workbook',
      file: resolvePdfFile(
        'second_british_empire_pupil_workbook.pdf',
        'second_british_empire_pupil_workbook_FINAL_V17.pdf',
      ),
    },
  ],
  medieval_england: [
    {
      booklet: 'Pupil Workbook',
      file: resolvePdfFile(
        'medieval_england_pupil_workbook.pdf',
        'medieval_england_pupil_workbook_FINAL_V17.pdf',
        'medieval_england_16p_workbook.pdf',
      ),
    },
  ],
  monarchy_religion_power: [
    {
      booklet: 'Pupil Workbook',
      file: resolvePdfFile(
        'monarchy_religion_power_pupil_workbook.pdf',
        'monarchy_religion_power_pupil_workbook_FINAL_V17.pdf',
      ),
    },
  ],
  post_war_britain: [
    {
      booklet: 'Pupil Workbook',
      file: resolvePdfFile(
        'post_war_britain_pupil_workbook.pdf',
        'post_war_britain_pupil_workbook_FINAL_V17.pdf',
      ),
    },
  ],
  the_shoah: [
    {
      booklet: 'Pupil Workbook',
      file: resolvePdfFile(
        'the_shoah_pupil_workbook.pdf',
        'the_shoah_pupil_workbook_FINAL_V17.pdf',
      ),
    },
  ],
  trip_ypres: [],
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
  const outJsonPath = path.join(__dirname, '..', 'src', 'engine', 'workbook_page_map.json');
  let masterMap = {};
  if (fs.existsSync(outJsonPath)) {
    try {
      masterMap = JSON.parse(fs.readFileSync(outJsonPath, 'utf8'));
    } catch (e) {}
  }

  for (const [unitId, configs] of Object.entries(unitPdfConfigs)) {
    const unitData = db[unitId] && (db[unitId].data || db[unitId]);
    if (!unitData || !unitData.lessons) continue;

    const unitMap = {};
    let foundAnyPdf = false;
    const lessons = unitData.lessons;

    for (const config of configs) {
      const pdfPath = path.join(pdfsDir, config.file);
      const pdfRes = await parsePdf(pdfPath);
      if (!pdfRes) {
        console.warn(`⚠️ Warning: PDF not found ${pdfPath}`);
        continue;
      }
      foundAnyPdf = true;

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

        const KS3_16P_UNITS = [
          'monarchy_religion_power',
          'medieval_england',
          'great_war',
          'great_war_part2',
          'industrialisation_and_empire',
          'first_british_empire',
          'second_british_empire',
          'australia',
        ];
        const KS3_16P_PAGE_MAP = [
          { page: 2, endPage: 3, spread: 'pp. 2–3' },
          { page: 4, endPage: 5, spread: 'pp. 4–5' },
          { page: 6, endPage: 7, spread: 'pp. 6–7' },
          { page: 10, endPage: 11, spread: 'pp. 10–11' },
          { page: 12, endPage: 13, spread: 'pp. 12–13' },
        ];

        let foundPage = null;
        let endPage = null;
        let spread = null;

        if (KS3_16P_UNITS.includes(unitId) && (pdfRes.numpages === 16 || lessons.length === 5)) {
          const slot = KS3_16P_PAGE_MAP[relIdx] || KS3_16P_PAGE_MAP[fullIdx];
          if (slot) {
            foundPage = slot.page;
            endPage = slot.endPage;
            spread = slot.spread;
          }
        }

        if (!foundPage) {
          // Lessons start on page 2 or later (page 1 is cover).
          // Stop at pdfRes.numpages - 1 to NEVER match the back cover (which contains summary progress/quiz grids with all enquiry numbers).
          const maxSearchPage = Math.max(2, pdfRes.numpages - 1);
          for (let p = 2; p <= maxSearchPage; p++) {
            const pText = pdfRes.pageMap[p] || '';

            // Match L{lNum}: or L{relNum}: or ENQUIRY {relNum} or Title snippet
            const matchLFull = pText.includes(`L${lNum}:`);
            const matchLRel = pText.includes(`L${relNum}:`);
            const matchEnquiry =
              pText.includes(`ENQUIRY${relNum}•`) ||
              pText.includes(`ENQUIRY${lNum}•`) ||
              pText.includes(`ENQUIRY:${relNum}`) ||
              pText.includes(`ENQUIRY:${lNum}`) ||
              pText.includes(`ENQUIRY${relNum}`) ||
              pText.includes(`ENQUIRY${lNum}`);
            const matchKeyTopic =
              pText.includes(`KEYTOPIC${relNum}`) ||
              pText.includes(`KEYTOPIC1.${relNum}`) ||
              pText.includes(`KEYTOPIC2.${relNum}`) ||
              pText.includes(`KEYTOPIC3.${relNum}`) ||
              pText.includes(`KEYTOPIC4.${relNum}`);
            const matchTitle = cleanTitle.length > 5 && pText.includes(cleanTitle);

            if (
              (matchKeyTopic || matchLFull || matchLRel || matchEnquiry) &&
              (matchTitle || pText.includes(`ENQUIRY`) || pText.includes(`KEYTOPIC`))
            ) {
              foundPage = p;
              break;
            }
          }

          // Fallback: search just L{relNum}: or KEYTOPIC or ENQUIRY
          if (!foundPage) {
            for (let p = 2; p <= maxSearchPage; p++) {
              const pText = pdfRes.pageMap[p] || '';
              if (
                pText.includes(`KEYTOPIC${relNum}`) ||
                pText.includes(`L${relNum}:`) ||
                pText.includes(`L${lNum}:`) ||
                pText.includes(`ENQUIRY${relNum}`) ||
                pText.includes(`ENQUIRY${lNum}`)
              ) {
                foundPage = p;
                break;
              }
            }
          }

          if (!foundPage && cleanTitle.length > 8) {
            for (let p = 2; p <= maxSearchPage; p++) {
              const pText = pdfRes.pageMap[p] || '';
              if (pText.includes(cleanTitle)) {
                foundPage = p;
                break;
              }
            }
          }

          const isDoublePageKS3 =
            pdfRes.numpages <= 24 &&
            (unitId === 'industrialisation_and_empire' ||
              unitId === 'great_war' ||
              unitId === 'great_war_part2' ||
              unitId === 'medieval_england' ||
              unitId === 'early_modern_world' ||
              unitId === 'water_and_sanitation' ||
              unitId === 'post_war_britain' ||
              unitId === 'the_shoah' ||
              unitId === 'australia' ||
              unitId === 'first_british_empire' ||
              unitId === 'second_british_empire' ||
              unitId === 'monarchy_religion_power');
          const fallbackPage = isDoublePageKS3 ? 2 + relIdx * 2 : 3 + relIdx * 6;
          const finalPage = foundPage || fallbackPage;
          endPage = isDoublePageKS3 ? finalPage + 1 : finalPage;
          spread = isDoublePageKS3 ? `pp. ${finalPage}–${endPage}` : `Page ${finalPage}`;
          foundPage = finalPage;
        }

        const lessonKey = lesson.id || `lesson_${fullIdx + 1}`;
        unitMap[lessonKey] = {
          page: foundPage,
          endPage: endPage || foundPage,
          spread: spread || `Page ${foundPage}`,
          booklet: config.booklet,
          unitId: unitId,
          lessonIndex: fullIdx,
        };
      });
    }

    if (foundAnyPdf && Object.keys(unitMap).length > 0) {
      masterMap[unitId] = unitMap;
    } else if (!masterMap[unitId]) {
      masterMap[unitId] = {};
    }
  }

  // Write out as JS module and JSON
  fs.writeFileSync(outJsonPath, JSON.stringify(masterMap, null, 2));

  const outJsPath = path.join(__dirname, '..', 'src', 'engine', 'workbook_page_map.js');
  const jsContent = `// Auto-generated mapping of curriculum units and lessons to physical printed workbook page numbers
export const WORKBOOK_PAGE_MAP = ${JSON.stringify(masterMap, null, 2)};

export function getWorkbookPageAnchor(unitId, lessonOrId, fallbackIdx = 0) {
  if (!unitId) return null;
  const unitMap = WORKBOOK_PAGE_MAP[unitId];
  if (!unitMap) return null;

  let lessonKey = '';
  if (typeof lessonOrId === 'string') {
    lessonKey = lessonOrId;
  } else if (lessonOrId && lessonOrId.id) {
    lessonKey = lessonOrId.id;
  } else {
    lessonKey = 'lesson_' + (fallbackIdx + 1);
  }

  let entry = unitMap[lessonKey];
  if (!entry) {
    // Try finding by lessonIndex
    entry = Object.values(unitMap).find((e) => e.lessonIndex === fallbackIdx);
  }

  if (!entry) return null;

  const isMultiBooklet = ['cme_new', 'edexcel_medicine', 'eee', 'usa', 'weimar_nazi_germany'].includes(unitId);
  const spreadLabel = entry.spread || (entry.endPage && entry.endPage !== entry.page ? \`pp. \${entry.page}–\${entry.endPage}\` : \`Page \${entry.page}\`);

  if (isMultiBooklet && entry.booklet) {
    return {
      page: entry.page,
      endPage: entry.endPage || entry.page,
      spread: spreadLabel,
      booklet: entry.booklet,
      label: \`\${spreadLabel} (\${entry.booklet})\`,
      shortLabel: spreadLabel
    };
  }
  return {
    page: entry.page,
    endPage: entry.endPage || entry.page,
    spread: spreadLabel,
    booklet: 'Workbook',
    label: spreadLabel,
    shortLabel: spreadLabel
  };
}
`;

  fs.writeFileSync(outJsPath, jsContent);
  console.log(`✅ Successfully generated workbook page map: ${outJsPath} and ${outJsonPath}`);
}

run().catch((err) => {
  console.error('❌ Error generating page map:', err);
  process.exit(1);
});
