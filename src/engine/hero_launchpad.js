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
  great_war: {
    textbook: {
      title: 'Causes of the Great War Master Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/great_war/textbook.html',
      pdfUrl: '/pdfs/great_war_textbook_FINAL_V17.pdf',
    },
    workbook: {
      title: 'Causes of the Great War Pupil Workbook',
      label: 'Pupil Workbook',
      htmlUrl: '/units/great_war/pupil_workbook.html',
      pdfUrl: '/pdfs/great_war_pupil_workbook_FINAL_V17.pdf',
    },
    retrieval: {
      title: 'Causes of the Great War Knowledge Retrieval Companion',
      label: 'Retrieval Companion (48 Qs)',
      htmlUrl: '/units/great_war/quiz_pack.html',
      pdfUrl: '/pdfs/great_war_recall_quiz_FULL.pdf',
    },
  },
  great_war_part2: {
    textbook: {
      title: 'Course of the Great War Master Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/great_war_part2/textbook.html',
      pdfUrl: '/pdfs/great_war_part2_textbook_FINAL_V17.pdf',
    },
    workbook: {
      title: 'Course of the Great War Pupil Workbook',
      label: 'Pupil Workbook',
      htmlUrl: '/units/great_war_part2/pupil_workbook.html',
      pdfUrl: '/pdfs/great_war_part2_pupil_workbook_FINAL_V17.pdf',
    },
    retrieval: {
      title: 'Course of the Great War Knowledge Retrieval Companion',
      label: 'Retrieval Companion',
      htmlUrl: '/units/great_war_part2/quiz_pack.html',
      pdfUrl: '/pdfs/great_war_part2_quiz_pack_FINAL_V17.pdf',
    },
  },
  medieval_england: {
    textbook: {
      title: 'Medieval England Master Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/medieval_england/textbook.html',
      pdfUrl: '/pdfs/medieval_england_textbook_PUBLISHER.pdf',
    },
    workbook: {
      title: 'Medieval England Pupil Workbook',
      label: 'Pupil Workbook',
      htmlUrl: '/units/medieval_england/pupil_workbook.html',
      pdfUrl: '/pdfs/medieval_england_pupil_workbook_FINAL_V17.pdf',
    },
    retrieval: {
      title: 'Medieval England Mastery & Retrieval Pack',
      label: 'Retrieval Companion',
      htmlUrl: '/units/medieval_england/quiz_pack.html',
      pdfUrl: '/pdfs/medieval_england_mastery_pack_full_FINAL_V17.pdf',
    },
  },
  early_modern_world: {
    textbook: {
      title: 'Early Modern World Master Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/early_modern_world/textbook.html',
      pdfUrl: '/pdfs/early_modern_world_textbook_PUBLISHER.pdf',
    },
    workbook: {
      title: 'Early Modern World Pupil Workbook',
      label: 'Pupil Workbook',
      htmlUrl: '/units/early_modern_world/pupil_workbook.html',
      pdfUrl: '/pdfs/early_modern_world_pupil_workbook_FINAL_V17.pdf',
    },
    retrieval: {
      title: 'Early Modern World Knowledge Retrieval Companion',
      label: 'Retrieval Companion',
      htmlUrl: '/units/early_modern_world/quiz_pack.html',
      pdfUrl: '/pdfs/early_modern_world_quiz_pack_FINAL_V1.pdf',
    },
  },
  industrialisation_and_empire: {
    textbook: {
      title: 'Industrialisation & Empire Master Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/industrialisation_and_empire/textbook.html',
      pdfUrl: '/pdfs/industrialisation_and_empire_textbook_PUBLISHER.pdf',
    },
    workbook: {
      title: 'Industrialisation & Empire Pupil Workbook',
      label: 'Pupil Workbook',
      htmlUrl: '/units/industrialisation_and_empire/pupil_workbook.html',
      pdfUrl: '/pdfs/industrialisation_and_empire_pupil_workbook_FINAL_V17.pdf',
    },
    retrieval: {
      title: 'Industrialisation & Empire Mastery & Retrieval Pack',
      label: 'Retrieval Companion',
      htmlUrl: '/units/industrialisation_and_empire/quiz_pack.html',
      pdfUrl: '/pdfs/industrialisation_and_empire_mastery_pack_full_FINAL_V17.pdf',
    },
  },
  water_and_sanitation: {
    textbook: {
      title: 'Water & Sanitation Master Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/water_and_sanitation/textbook.html',
      pdfUrl: '/pdfs/water_and_sanitation_textbook_FINAL_V17.pdf',
    },
    workbook: {
      title: 'Water & Sanitation Pupil Workbook',
      label: 'Pupil Workbook',
      htmlUrl: '/units/water_and_sanitation/pupil_workbook.html',
      pdfUrl: '/pdfs/water_and_sanitation_pupil_workbook_FINAL_V17.pdf',
    },
    retrieval: {
      title: 'Water & Sanitation Knowledge Retrieval Companion',
      label: 'Retrieval Companion',
      htmlUrl: '/units/water_and_sanitation/quiz_pack.html',
      pdfUrl: '/pdfs/water_sanitation_quiz_pack_FINAL_V1.pdf',
    },
  },
  the_shoah: {
    textbook: {
      title: 'The Shoah Master Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/the_shoah/textbook.html',
      pdfUrl: '/pdfs/the_shoah_textbook_FINAL_V17.pdf',
    },
    workbook: {
      title: 'The Shoah Pupil Workbook',
      label: 'Pupil Workbook',
      htmlUrl: '/units/the_shoah/pupil_workbook.html',
      pdfUrl: '/pdfs/the_shoah_pupil_workbook_FINAL_V17.pdf',
    },
    retrieval: {
      title: 'The Shoah Knowledge Retrieval Companion',
      label: 'Retrieval Companion',
      htmlUrl: '/units/the_shoah/quiz_pack.html',
      pdfUrl: '/pdfs/the_shoah_pupil_workbook_FINAL_V17.pdf',
    },
  },
  post_war_britain: {
    textbook: {
      title: 'Post-War Britain Master Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/post_war_britain/textbook.html',
      pdfUrl: '/pdfs/post_war_britain_textbook_FINAL_V17.pdf',
    },
    workbook: {
      title: 'Post-War Britain Pupil Workbook',
      label: 'Pupil Workbook',
      htmlUrl: '/units/post_war_britain/pupil_workbook.html',
      pdfUrl: '/pdfs/post_war_britain_pupil_workbook_FINAL_V17.pdf',
    },
    retrieval: {
      title: 'Post-War Britain Knowledge Retrieval Companion',
      label: 'Retrieval Companion',
      htmlUrl: '/units/post_war_britain/quiz_pack.html',
      pdfUrl: '/pdfs/post_war_britain_pupil_workbook_FINAL_V17.pdf',
    },
  },
  australia: {
    textbook: {
      title: 'Australia & The Pacific Master Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/australia/textbook.html',
      pdfUrl: '/pdfs/australia_textbook_FINAL_V17.pdf',
    },
    workbook: {
      title: 'Australia & The Pacific Pupil Workbook',
      label: 'Pupil Workbook',
      htmlUrl: '/units/australia/pupil_workbook.html',
      pdfUrl: '/pdfs/australia_pupil_workbook_FINAL_V17.pdf',
    },
    retrieval: {
      title: 'Australia Knowledge Retrieval Companion',
      label: 'Retrieval Companion',
      htmlUrl: '/units/australia/quiz_pack.html',
      pdfUrl: '/pdfs/australia_pupil_workbook_FINAL_V17.pdf',
    },
  },
  cme_new: {
    textbook: {
      title: 'Conflict in the Middle East Master Publisher Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/cme_new/textbook_KT1_PUBLISHER.html',
      pdfUrl: '/pdfs/cme_new_textbook_KT1_PUBLISHER.pdf',
    },
    workbook: {
      title: 'Conflict in the Middle East Pupil Workbook',
      label: 'Pupil Workbook',
      htmlUrl: '/units/cme_new/pupil_workbook_KT1.html',
      pdfUrl: '/pdfs/cme_new_pupil_workbook_KT1_FINAL_V17.pdf',
    },
    retrieval: {
      title: 'Conflict in the Middle East Master Knowledge Retrieval Companion',
      label: 'Retrieval Companion (128 Qs)',
      htmlUrl: '/units/cme_new/quiz_pack.html',
      pdfUrl: '/pdfs/Conflict_in_the_Middle_East_Master_Knowledge_Retrieval_Companion.pdf',
    },
  },
  usa: {
    textbook: {
      title: 'USA 1954–1975 Master Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/usa/textbook_KT1.html',
      pdfUrl: '/pdfs/usa_textbook_KT1_FINAL_V17.pdf',
    },
    workbook: {
      title: 'USA 1954–1975 Pupil Workbook',
      label: 'Pupil Workbook',
      htmlUrl: '/units/usa/pupil_workbook_KT1.html',
      pdfUrl: '/pdfs/usa_pupil_workbook_KT1_FINAL_V17.pdf',
    },
    retrieval: {
      title: 'USA 1954–1975 Master Knowledge Retrieval Companion',
      label: 'Retrieval Companion (128 Qs)',
      htmlUrl: '/units/usa/quiz_pack.html',
      pdfUrl: '/pdfs/USA_1954_1975_Master_Knowledge_Retrieval_Companion.pdf',
    },
  },
  edexcel_medicine: {
    textbook: {
      title: 'Medicine in Britain Master Publisher Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/edexcel_medicine/textbook_medieval_PUBLISHER.html',
      pdfUrl: '/pdfs/edexcel_medicine_textbook_medieval_PUBLISHER_FINAL_V17.pdf',
    },
    workbook: {
      title: 'Medicine in Britain Master Pupil Workbook',
      label: 'Pupil Workbook',
      htmlUrl: '/units/edexcel_medicine/pupil_workbook_medieval.html',
      pdfUrl: '/pdfs/edexcel_medicine_pupil_workbook_master_FINAL_V17.pdf',
    },
    retrieval: {
      title: 'Medicine in Britain Master Knowledge Retrieval Companion',
      label: 'Retrieval Companion',
      htmlUrl: '/units/edexcel_medicine/quiz_pack.html',
      pdfUrl: '/pdfs/Medicine_Thematic_Study_Master_Knowledge_Retrieval_Companion.pdf',
    },
  },
  weimar_nazi_germany: {
    textbook: {
      title: 'Weimar & Nazi Germany Master Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/weimar_nazi_germany/textbook_KT1.html',
      pdfUrl: '/pdfs/weimar_nazi_germany_textbook_KT1_FINAL_V17.pdf',
    },
    workbook: {
      title: 'Weimar & Nazi Germany Pupil Workbook',
      label: 'Pupil Workbook',
      htmlUrl: '/units/weimar_nazi_germany/pupil_workbook_KT1.html',
      pdfUrl: '/pdfs/weimar_nazi_germany_pupil_workbook_KT1_FINAL_V17.pdf',
    },
    retrieval: {
      title: 'Weimar & Nazi Germany Knowledge Retrieval Companion',
      label: 'Retrieval Companion',
      htmlUrl: '/units/weimar_nazi_germany/quiz_pack.html',
      pdfUrl: '/pdfs/weimar_nazi_germany_pupil_workbook_KT1_FINAL_V17.pdf',
    },
  },
  eee: {
    textbook: {
      title: 'Early Elizabethan England Master Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/eee/textbook_KT1.html',
      pdfUrl: '/pdfs/eee_textbook_KT1_FINAL_V17.pdf',
    },
    workbook: {
      title: 'Early Elizabethan England Pupil Workbook',
      label: 'Pupil Workbook',
      htmlUrl: '/units/eee/pupil_workbook_KT1.html',
      pdfUrl: '/pdfs/eee_pupil_workbook_KT1_FINAL_V17.pdf',
    },
    retrieval: {
      title: 'Early Elizabethan England Knowledge Retrieval Companion',
      label: 'Retrieval Companion',
      htmlUrl: '/units/eee/quiz_pack.html',
      pdfUrl: '/pdfs/eee_pupil_workbook_KT1_FINAL_V17.pdf',
    },
  },
  cold_war: {
    textbook: {
      title: 'Superpower Relations & Cold War Master Textbook',
      label: 'Master Textbook',
      htmlUrl: '/units/cold_war/textbook.html',
      pdfUrl: '/pdfs/cold_war_textbook_FINAL_V17.pdf',
    },
    workbook: {
      title: 'Superpower Relations & Cold War Pupil Workbook',
      label: 'Pupil Workbook',
      htmlUrl: '/units/cold_war/pupil_workbook.html',
      pdfUrl: '/pdfs/cold_war_pupil_workbook_FINAL_V17.pdf',
    },
    retrieval: {
      title: 'Superpower Relations Knowledge Retrieval Companion',
      label: 'Retrieval Companion',
      htmlUrl: '/units/cold_war/quiz_pack.html',
      pdfUrl: '/pdfs/cold_war_pupil_workbook_FINAL_V17.pdf',
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
    textbook: {
      title: `${unitData?.title || 'Unit'} Master Textbook`,
      label: 'Master Textbook',
      htmlUrl: `/units/${unitId}/textbook.html`,
      pdfUrl: `/pdfs/${unitId}_textbook_FINAL_V17.pdf`,
    },
    workbook: {
      title: `${unitData?.title || 'Unit'} Pupil Workbook`,
      label: 'Pupil Workbook',
      htmlUrl: `/units/${unitId}/pupil_workbook.html`,
      pdfUrl: `/pdfs/${unitId}_pupil_workbook_FINAL_V17.pdf`,
    },
    retrieval: {
      title: `${unitData?.title || 'Unit'} Knowledge Retrieval Companion`,
      label: 'Retrieval Companion',
      htmlUrl: `/units/${unitId}/quiz_pack.html`,
      pdfUrl: `/pdfs/${unitId}_quiz_pack_FINAL_V17.pdf`,
    },
  };

  const tb = config.textbook;
  const wb = config.workbook;
  const rc = config.retrieval;

  const cleanTbTitle = (tb.title || '').replace(/'/g, "\\'");
  const cleanWbTitle = (wb.title || '').replace(/'/g, "\\'");
  const cleanRcTitle = (rc.title || '').replace(/'/g, "\\'");

  return `
    <div class="hero-curricular-launchpad">
      <div class="hero-launchpad-capsule">
        <!-- Pillar 1: Master Textbook -->
        <div class="launchpad-pill-group pill-textbook">
          <button type="button" class="launchpad-pill-btn" onclick="window.openCurricularPillar('${tb.htmlUrl}', '${cleanTbTitle}', '${tb.pdfUrl}', 'TEXTBOOK')" title="Open Master Textbook in classroom reader">
            <i class="fa-solid fa-book-open"></i>
            <span>${tb.label}</span>
          </button>
          <a href="${tb.pdfUrl}" target="_blank" download title="Download Master Textbook PDF" class="launchpad-pill-pdf">
            <i class="fa-solid fa-file-pdf"></i>
          </a>
        </div>

        <!-- Pillar 2: Pupil Workbook -->
        <div class="launchpad-pill-group pill-workbook">
          <button type="button" class="launchpad-pill-btn" onclick="window.openCurricularPillar('${wb.htmlUrl}', '${cleanWbTitle}', '${wb.pdfUrl}', 'WORKBOOK')" title="Open Pupil Workbook in classroom reader">
            <i class="fa-solid fa-pen-to-square"></i>
            <span>${wb.label}</span>
          </button>
          <a href="${wb.pdfUrl}" target="_blank" download title="Download Pupil Workbook PDF" class="launchpad-pill-pdf">
            <i class="fa-solid fa-file-pdf"></i>
          </a>
        </div>

        <!-- Pillar 3: Knowledge Retrieval Companion -->
        <div class="launchpad-pill-group pill-retrieval">
          <button type="button" class="launchpad-pill-btn" onclick="window.openCurricularPillar('${rc.htmlUrl}', '${cleanRcTitle}', '${rc.pdfUrl}', 'RETRIEVAL')" title="Open Knowledge Retrieval Companion in classroom reader">
            <i class="fa-solid fa-brain"></i>
            <span>${rc.label}</span>
          </button>
          <a href="${rc.pdfUrl}" target="_blank" download title="Download Knowledge Retrieval Companion PDF" class="launchpad-pill-pdf">
            <i class="fa-solid fa-file-pdf"></i>
          </a>
        </div>
      </div>
    </div>
  `;
}
