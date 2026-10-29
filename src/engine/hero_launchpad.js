/**
 * Hero Curricular Launchpad Engine
 * Renders the high-status 3-Pillars Quick-Launch Bar (Master Textbook, Pupil Workbook,
 * and Knowledge Retrieval Companion) directly inside the unit Hero Banner.
 */

// Window-level launcher ensuring instant in-page preview or tab opening
if (typeof window !== 'undefined') {
  window.openCurricularPillar = function (htmlUrl, title, pdfUrl, badge) {
    if (typeof window.openTeacherPrintPreview === 'function') {
      window.openTeacherPrintPreview(htmlUrl, title, pdfUrl);
      return;
    }
    if (
      typeof window.openInPagePreview === 'function' &&
      document.getElementById('inpage-preview-console')
    ) {
      window.openInPagePreview(htmlUrl, title, pdfUrl, { badge: badge || 'DOCUMENT' });
      return;
    }
    window.open(htmlUrl, '_blank');
  };
}

export const CURRICULAR_PILLARS_CATALOG = {
  ks2_ww2: {
    textbook: {
      title: 'World War II & The Home Front (1939–1945) Master Classroom Textbook',
      label: 'Master Textbook (24 Pages)',
      htmlUrl: '/units/ks2_ww2/textbook.html',
      pdfUrl: '/pdfs/ks2_ww2_textbook.pdf',
    },
    workbook: {
      title: 'World War II & The Home Front (1939–1945) Pupil Workbook',
      label: 'Pupil Workbook (24 Pages)',
      htmlUrl: '/units/ks2_ww2/pupil_workbook.html',
      pdfUrl: '/pdfs/ks2_ww2_pupil_workbook.pdf',
    },
    retrieval: {
      title: 'World War II & The Home Front Knowledge Retrieval Companion',
      label: 'Retrieval Companion (40 Qs)',
      htmlUrl: '/units/ks2_ww2/quiz_pack.html',
      pdfUrl: '/pdfs/ks2_ww2_quiz_pack.pdf',
    },
  },
  great_war: {
    textbook: {
      title: 'Causes of the Great War (1871–1914) Master Classroom Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/great_war/textbook.html',
      pdfUrl: '/pdfs/great_war_textbook.pdf',
    },
    workbook: {
      title: 'Causes of the Great War Pupil Workbook',
      label: 'Pupil Workbook',
      htmlUrl: '/units/great_war/pupil_workbook.html',
      pdfUrl: '/pdfs/great_war_pupil_workbook.pdf',
    },
    retrieval: {
      title: 'Causes of the Great War Knowledge Retrieval Companion',
      label: 'Retrieval Companion (30 Qs)',
      htmlUrl: '/units/great_war/great_war_retrieval_companion.html',
      pdfUrl: '/pdfs/Causes_of_the_Great_War_Master_Knowledge_Retrieval_Companion.pdf',
    },
  },
  great_war_part2: {
    textbook: {
      title: 'The Course of the Great War (1914–1918) Master Classroom Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/great_war_part2/textbook.html',
      pdfUrl: '/pdfs/great_war_part2_textbook.pdf',
    },
    workbook: {
      title: 'Course of the Great War Pupil Workbook',
      label: 'Pupil Workbook',
      htmlUrl: '/units/great_war_part2/pupil_workbook.html',
      pdfUrl: '/pdfs/great_war_part2_pupil_workbook.pdf',
    },
    retrieval: {
      title: 'Course of the Great War Knowledge Retrieval Companion',
      label: 'Retrieval Companion (30 Qs)',
      htmlUrl: '/units/great_war_part2/great_war_part2_retrieval_companion.html',
      pdfUrl: '/pdfs/The_Course_of_the_Great_War_Master_Knowledge_Retrieval_Companion.pdf',
    },
  },
  medieval_england: {
    textbook: {
      title: 'Medieval England (1066–1381) Master Classroom Textbook',
      label: 'Master Textbook (12 Pages)',
      htmlUrl: '/units/medieval_england/textbook.html',
      pdfUrl: '/pdfs/medieval_england_textbook.pdf',
    },
    workbook: {
      title: 'Medieval England Pupil Workbook',
      label: 'Pupil Workbook',
      htmlUrl: '/units/medieval_england/pupil_workbook.html',
      pdfUrl: '/pdfs/medieval_england_pupil_workbook.pdf',
    },
    retrieval: {
      title: 'Medieval England Knowledge Retrieval Companion',
      label: 'Retrieval Companion (30 Qs)',
      htmlUrl: '/units/medieval_england/medieval_england_retrieval_companion.html',
      pdfUrl: '/pdfs/Medieval_England_Master_Knowledge_Retrieval_Companion.pdf',
    },
  },
  monarchy_religion_power: {
    textbook: {
      title: 'Crown, Church, or Parliament (1517–1689) Master Classroom Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/monarchy_religion_power/textbook.html',
      pdfUrl: '/pdfs/monarchy_religion_power_textbook.pdf',
    },
    workbook: {
      title: 'Crown, Church, or Parliament 16-Page Pupil Workbook',
      label: 'Pupil Workbook (16 Pages)',
      htmlUrl: '/units/monarchy_religion_power/pupil_workbook.html',
      pdfUrl: '/pdfs/monarchy_religion_power_pupil_workbook.pdf',
    },
    retrieval: {
      title: 'Crown, Church, or Parliament Knowledge Retrieval Companion',
      label: 'Retrieval Companion (30 Qs)',
      htmlUrl: '/units/monarchy_religion_power/monarchy_religion_power_retrieval_companion.html',
      pdfUrl: '/pdfs/Crown_Church_or_Parliament_Master_Knowledge_Retrieval_Companion.pdf',
    },
  },
  first_british_empire: {
    textbook: {
      title: 'The First British Empire (1600–1783) Master Classroom Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/first_british_empire/textbook.html',
      pdfUrl: '/pdfs/first_british_empire_textbook.pdf',
    },
    workbook: {
      title: 'The First British Empire 16-Page Pupil Workbook',
      label: 'Pupil Workbook (16 Pages)',
      htmlUrl: '/units/first_british_empire/pupil_workbook.html',
      pdfUrl: '/pdfs/first_british_empire_pupil_workbook.pdf',
    },
    retrieval: {
      title: 'The First British Empire Knowledge Retrieval Companion',
      label: 'Retrieval Companion (30 Qs)',
      htmlUrl: '/units/first_british_empire/first_british_empire_retrieval_companion.html',
      pdfUrl: '/pdfs/The_First_British_Empire_Master_Knowledge_Retrieval_Companion.pdf',
    },
  },
  industrialisation_and_empire: {
    textbook: {
      title: 'Industrialisation, Power & Protest (1750–1901) Master Classroom Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/industrialisation_and_empire/textbook.html',
      pdfUrl: '/pdfs/industrialisation_and_empire_textbook.pdf',
    },
    workbook: {
      title: 'Industrialisation & Empire Pupil Workbook',
      label: 'Pupil Workbook',
      htmlUrl: '/units/industrialisation_and_empire/pupil_workbook.html',
      pdfUrl: '/pdfs/industrialisation_and_empire_pupil_workbook.pdf',
    },
    retrieval: {
      title: 'The Industrial Revolution Knowledge Retrieval Companion',
      label: 'Retrieval Companion (30 Qs)',
      htmlUrl:
        '/units/industrialisation_and_empire/industrialisation_and_empire_retrieval_companion.html',
      pdfUrl: '/pdfs/Industrialisation_Power_and_Protest_Master_Knowledge_Retrieval_Companion.pdf',
    },
  },
  second_british_empire: {
    textbook: {
      title: 'The Second British Empire (1783–1914) Master Classroom Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/second_british_empire/textbook.html',
      pdfUrl: '/pdfs/second_british_empire_textbook.pdf',
    },
    workbook: {
      title: 'The Second British Empire 16-Page Pupil Workbook',
      label: 'Pupil Workbook (16 Pages)',
      htmlUrl: '/units/second_british_empire/pupil_workbook.html',
      pdfUrl: '/pdfs/second_british_empire_pupil_workbook.pdf',
    },
    retrieval: {
      title: 'The Second British Empire Knowledge Retrieval Companion',
      label: 'Retrieval Companion (30 Qs)',
      htmlUrl: '/units/second_british_empire/second_british_empire_retrieval_companion.html',
      pdfUrl: '/pdfs/The_Second_British_Empire_Master_Knowledge_Retrieval_Companion.pdf',
    },
  },
  water_and_sanitation: {
    textbook: {
      title: 'Water & Sanitation Through Time (1250–Present) Master Classroom Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/water_and_sanitation/textbook.html',
      pdfUrl: '/pdfs/water_and_sanitation_textbook.pdf',
    },
    workbook: {
      title: 'Water & Sanitation Pupil Workbook',
      label: 'Pupil Workbook',
      htmlUrl: '/units/water_and_sanitation/pupil_workbook.html',
      pdfUrl: '/pdfs/water_and_sanitation_pupil_workbook.pdf',
    },
    retrieval: {
      title: 'Water & Sanitation Knowledge Retrieval Companion',
      label: 'Retrieval Companion (30 Qs)',
      htmlUrl: '/units/water_and_sanitation/water_and_sanitation_retrieval_companion.html',
      pdfUrl: '/pdfs/Water_and_Sanitation_Master_Knowledge_Retrieval_Companion.pdf',
    },
  },
  the_shoah: {
    textbook: {
      title: 'The Shoah / The Holocaust Master Classroom Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/the_shoah/textbook.html',
      pdfUrl: '/pdfs/the_shoah_textbook.pdf',
    },
    workbook: {
      title: 'The Shoah 20-Page Pupil Workbook',
      label: 'Pupil Workbook (20 Pages)',
      htmlUrl: '/units/the_shoah/pupil_workbook.html',
      pdfUrl: '/pdfs/the_shoah_pupil_workbook.pdf',
    },
    retrieval: {
      title: 'The Shoah Knowledge Retrieval Companion',
      label: 'Retrieval Companion (30 Qs)',
      htmlUrl: '/units/the_shoah/the_shoah_retrieval_companion.html',
      pdfUrl: '/pdfs/The_Shoah_Master_Knowledge_Retrieval_Companion.pdf',
    },
  },
  post_war_britain: {
    textbook: {
      title: 'Post-War Britain (1945–1990) Master Classroom Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/post_war_britain/textbook.html',
      pdfUrl: '/pdfs/post_war_britain_textbook.pdf',
    },
    workbook: {
      title: 'Post-War Britain Pupil Workbook',
      label: 'Pupil Workbook',
      htmlUrl: '/units/post_war_britain/pupil_workbook.html',
      pdfUrl: '/pdfs/post_war_britain_pupil_workbook.pdf',
    },
    retrieval: {
      title: 'Post-War Britain Knowledge Retrieval Companion',
      label: 'Retrieval Companion (30 Qs)',
      htmlUrl: '/units/post_war_britain/post_war_britain_retrieval_companion.html',
      pdfUrl: '/pdfs/Post_War_Britain_Master_Knowledge_Retrieval_Companion.pdf',
    },
  },
  australia: {
    textbook: {
      title: 'History of Australia & The Pacific Master Classroom Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/australia/textbook.html',
      pdfUrl: '/pdfs/australia_textbook.pdf',
    },
    workbook: {
      title: 'Australia & The Pacific Pupil Workbook',
      label: 'Pupil Workbook',
      htmlUrl: '/units/australia/pupil_workbook.html',
      pdfUrl: '/pdfs/australia_pupil_workbook.pdf',
    },
    retrieval: {
      title: 'History of Australia Knowledge Retrieval Companion',
      label: 'Retrieval Companion (30 Qs)',
      htmlUrl: '/units/australia/australia_retrieval_companion.html',
      pdfUrl: '/pdfs/History_of_Australia_Master_Knowledge_Retrieval_Companion.pdf',
    },
  },
  cme_new: {
    textbook: {
      title: 'Conflict in the Middle East (1945–1995) 28-Page Master Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/cme_new/textbook_UNIFIED.html',
      pdfUrl: '/pdfs/cme_new_textbook_UNIFIED.pdf',
    },
    workbook: {
      title: 'Conflict in the Middle East Complete Mastery Exam Pack (36 Pages)',
      label: 'Mastery Exam Pack (36 Pages)',
      htmlUrl: '/units/cme_new/booklets/cme_mastery_FULL.html',
      pdfUrl: '/pdfs/cme_mastery_pack_FULL.pdf',
      icon: 'fa-solid fa-file-signature',
    },
    retrieval: {
      title: 'Conflict in the Middle East Master Knowledge Retrieval Companion',
      label: 'Retrieval Companion (128 Qs)',
      htmlUrl: '/units/cme_new/cme_master_retrieval_companion.html',
      pdfUrl: '/pdfs/Conflict_in_the_Middle_East_Master_Knowledge_Retrieval_Companion.pdf',
    },
  },
  usa: {
    textbook: {
      title: 'The USA, 1954–1975: Conflict at Home and Abroad 28-Page Master Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/usa/textbook_UNIFIED.html',
      pdfUrl: '/pdfs/usa_textbook_UNIFIED.pdf',
    },
    workbook: {
      title:
        'Conflict at Home and Abroad: the USA, 1954–75 Paper 3 Complete Exam Master Pack (48 Pages)',
      label: 'Mastery Exam Pack (48 Pages)',
      htmlUrl: '/units/usa/booklets/usa_mastery_FULL.html',
      pdfUrl: '/pdfs/usa_mastery_pack_FULL.pdf',
      icon: 'fa-solid fa-file-signature',
    },
    retrieval: {
      title: 'USA 1954–1975 Master Knowledge Retrieval Companion',
      label: 'Retrieval Companion (128 Qs)',
      htmlUrl: '/units/usa/usa_master_retrieval_companion.html',
      pdfUrl: '/pdfs/USA_1954_1975_Master_Knowledge_Retrieval_Companion.pdf',
    },
  },
  edexcel_medicine: {
    textbook: {
      title: 'Medicine Through Time (c1250–present) Master Textbooks',
      label: 'Master Textbook (5 Eras)',
      htmlUrl: '/units/edexcel_medicine/textbook_medieval_PUBLISHER.html',
      pdfUrl: '/pdfs/edexcel_medicine_textbook_medieval.pdf',
    },
    workbook: {
      title: 'Medicine in Britain Master Pupil Workbook',
      label: 'Pupil Workbook (20 Pages)',
      htmlUrl: '/units/edexcel_medicine/pupil_workbook_medieval.html',
      pdfUrl: '/pdfs/edexcel_medicine_pupil_workbook_medieval.pdf',
    },
    retrieval: {
      title: 'Medicine in Britain Master Knowledge Retrieval Companion',
      label: 'Retrieval Companion (140 Qs)',
      htmlUrl: '/units/edexcel_medicine/medicine_master_retrieval_companion.html',
      pdfUrl: '/pdfs/Medicine_Through_Time_Master_Knowledge_Retrieval_Companion.pdf',
    },
  },
  weimar_nazi_germany: {
    textbook: {
      title: 'Weimar and Nazi Germany (1918–1939) 28-Page Master Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/weimar_nazi_germany/textbook_UNIFIED.html',
      pdfUrl: '/pdfs/weimar_nazi_germany_textbook_UNIFIED.pdf',
    },
    workbook: {
      title: 'Weimar & Nazi Germany Pupil Workbook',
      label: 'Pupil Workbook (20 Pages)',
      htmlUrl: '/units/weimar_nazi_germany/pupil_workbook_KT1.html',
      pdfUrl: '/pdfs/weimar_nazi_germany_pupil_workbook_KT1.pdf',
    },
    retrieval: {
      title: 'Weimar and Nazi Germany Master Knowledge Retrieval Companion',
      label: 'Retrieval Companion (128 Qs)',
      htmlUrl: '/units/weimar_nazi_germany/weimar_master_retrieval_companion.html',
      pdfUrl: '/pdfs/Weimar_and_Nazi_Germany_Master_Knowledge_Retrieval_Companion.pdf',
    },
  },
  eee: {
    textbook: {
      title: 'Early Elizabethan England Master Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/eee/textbook_UNIFIED.html',
      pdfUrl: '/pdfs/eee_textbook_UNIFIED.pdf',
    },
    workbook: {
      title: 'Early Elizabethan England Pupil Workbook',
      label: 'Pupil Workbook (16 Pages)',
      htmlUrl: '/units/eee/pupil_workbook_KT1.html',
      pdfUrl: '/pdfs/eee_pupil_workbook_KT1.pdf',
    },
    retrieval: {
      title: 'Early Elizabethan England Master Knowledge Retrieval Companion',
      label: 'Retrieval Companion (120 Qs)',
      htmlUrl: '/units/eee/eee_master_retrieval_companion.html',
      pdfUrl: '/pdfs/Early_Elizabethan_England_Master_Knowledge_Retrieval_Companion.pdf',
    },
  },
  cold_war: {
    textbook: {
      title: 'The Cold War & Global Flashpoints Master Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/cold_war/textbook.html',
      pdfUrl: '/pdfs/cold_war_textbook.pdf',
    },
    workbook: {
      title: 'Superpower Relations & Cold War Pupil Workbook',
      label: 'Pupil Workbook (16 Pages)',
      htmlUrl: '/units/cold_war/pupil_workbook.html',
      pdfUrl: '/pdfs/cold_war_pupil_workbook.pdf',
    },
    retrieval: {
      title: 'Superpower Relations Knowledge Retrieval Companion',
      label: 'Retrieval Companion',
      htmlUrl: '/units/cold_war/cold_war_master_retrieval_companion.html',
      pdfUrl: '/pdfs/Superpower_Relations_and_Cold_War_Master_Knowledge_Retrieval_Companion.pdf',
    },
  },
};

/**
 * Returns HTML string for the 3-Pillars Quick-Launch Bar in the Hero Banner.
 * @param {string} unitId
 * @param {object} unitData
 * @returns {string} HTML markup
 */
export function renderHeroCurricularLaunchpad(unitId, unitData) {
  if (!unitId) return '';
  const isTrip = unitId === 'trip_ypres' || (unitData && unitData.type === 'trip');
  if (isTrip) return '';

  const config = CURRICULAR_PILLARS_CATALOG[unitId] || {
    workbook: {
      title: `${unitData?.title || 'Unit'} Pupil Workbook`,
      label: 'Pupil Workbook',
      htmlUrl: `/units/${unitId}/pupil_workbook.html`,
      pdfUrl: `/pdfs/${unitId}_pupil_workbook.pdf`,
    },
    retrieval: {
      title: `${unitData?.title || 'Unit'} Knowledge Retrieval Companion`,
      label: 'Retrieval Companion',
      htmlUrl: `/units/${unitId}/quiz_pack.html`,
      pdfUrl: `/pdfs/${unitId}_quiz_pack.pdf`,
    },
  };

  const tb = config.textbook;
  const wb = config.workbook;
  const rc = config.retrieval;

  const hasDistinctTextbook = tb && wb && tb.htmlUrl !== wb.htmlUrl && tb.pdfUrl !== wb.pdfUrl;

  const cleanTbTitle = (tb?.title || '').replace(/'/g, "\\'");
  const cleanWbTitle = (wb?.title || '').replace(/'/g, "\\'");
  const cleanRcTitle = (rc?.title || '').replace(/'/g, "\\'");

  const textbookPill = hasDistinctTextbook
    ? `
        <!-- Pillar 1: Master Textbook -->
        <div class="launchpad-pill-group pill-textbook">
          <button type="button" class="launchpad-pill-btn" onclick="window.openCurricularPillar('${tb.htmlUrl}', '${cleanTbTitle}', '${tb.pdfUrl}', 'TEXTBOOK')" title="Open Master Textbook in classroom reader">
            <i class="fa-solid fa-book-open"></i>
            <span>${tb.label}</span>
          </button>
          <a href="${tb.pdfUrl}" target="_blank" download title="Download Master Textbook PDF" class="launchpad-pill-pdf">
            <i class="fa-solid fa-file-pdf"></i>
          </a>
        </div>`
    : '';

  const isExamPack = wb?.label?.includes('Exam') || wb?.icon?.includes('signature');
  const wbIcon =
    wb?.icon || (isExamPack ? 'fa-solid fa-file-signature' : 'fa-solid fa-pen-to-square');
  const wbPillClass = isExamPack
    ? 'launchpad-pill-group pill-workbook pill-exam-pack'
    : 'launchpad-pill-group pill-workbook';
  const wbAction = isExamPack ? 'EXAM_PACK' : 'WORKBOOK';
  const wbTooltip = isExamPack
    ? `Open ${wb.label} in classroom reader`
    : 'Open Pupil Workbook in classroom reader';
  const wbDownloadTooltip = isExamPack ? `Download ${wb.label} PDF` : 'Download Pupil Workbook PDF';

  const workbookPill = wb
    ? `
        <!-- Pillar 2: Pupil Workbook / Mastery Exam Pack -->
        <div class="${wbPillClass}">
          <button type="button" class="launchpad-pill-btn" onclick="window.openCurricularPillar('${wb.htmlUrl}', '${cleanWbTitle}', '${wb.pdfUrl}', '${wbAction}')" title="${wbTooltip}">
            <i class="${wbIcon}"></i>
            <span>${wb.label}</span>
          </button>
          <a href="${wb.pdfUrl}" target="_blank" download title="${wbDownloadTooltip}" class="launchpad-pill-pdf">
            <i class="fa-solid fa-file-pdf"></i>
          </a>
        </div>`
    : '';

  const retrievalPill = rc
    ? `
        <!-- Pillar 3: Knowledge Retrieval Companion -->
        <div class="launchpad-pill-group pill-retrieval">
          <button type="button" class="launchpad-pill-btn" onclick="window.openCurricularPillar('${rc.htmlUrl}', '${cleanRcTitle}', '${rc.pdfUrl}', 'RETRIEVAL')" title="Open Knowledge Retrieval Companion in classroom reader">
            <i class="fa-solid fa-brain"></i>
            <span>${rc.label}</span>
          </button>
          <a href="${rc.pdfUrl}" target="_blank" download title="Download Knowledge Retrieval Companion PDF" class="launchpad-pill-pdf">
            <i class="fa-solid fa-file-pdf"></i>
          </a>
        </div>`
    : '';

  return `
    <div class="hero-curricular-launchpad">
      <div class="hero-launchpad-capsule">
        ${textbookPill}
        ${workbookPill}
        ${retrievalPill}
      </div>
    </div>
  `;
}
