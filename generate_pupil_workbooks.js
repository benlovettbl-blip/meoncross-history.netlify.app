const fs = require("fs");
const path = require("path");

const publicUnitsDir = path.join(__dirname, "public", "units");
const dataParserSrc = fs.readFileSync(
  path.join(__dirname, "src", "data_parser.js"),
  "utf8",
);
const dataParserCode = dataParserSrc.replace(/export /g, "");
eval(dataParserCode);

let examGuideSrc = "";
if (fs.existsSync(path.join(__dirname, "src", "exam_guide_content.js"))) {
  examGuideSrc = fs.readFileSync(
    path.join(__dirname, "src", "exam_guide_content.js"),
    "utf8",
  );
  const examGuideCode = examGuideSrc.replace(/export const /g, "global.");
  eval(examGuideCode);
} else {
  global.sectionAGuide = "";
  global.sectionBGuide = "";
}

const formatText = (text) => {
  if (!text) return "";
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>");
};

const badgeSource = (title, overrideLetter = null) => {
    if (!title) return '';
    if (overrideLetter) {
        if (/(Source )\s*[A-Z]/i.test(title)) {
            title = title.replace(/(Source )\s*[A-Z]/i, '$1' + overrideLetter);
        } else if (/(Source)(?!s)/i.test(title)) {
            title = title.replace(/(Source)/i, '$1 ' + overrideLetter + ':');
        } else {
            title = 'Source ' + overrideLetter + ': ' + title;
        }
    }
    return title.replace(/(Source [A-Z])/i, '<span style="background-color: #1e40af; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 0.9em; letter-spacing: 0.5px; display: inline-block; margin-bottom: 4px;">$1</span>');
};

const ignoredDirs = ["node_modules", "public", ".git", ".agents", "dist"];
let allDirs = fs
  .readdirSync(publicUnitsDir, { withFileTypes: true })
  .filter(
    (dirent) => dirent.isDirectory() && !ignoredDirs.includes(dirent.name),
  )
  .map((dirent) => dirent.name);

const targetUnit = process.argv[2];
if (targetUnit && allDirs.includes(targetUnit)) {
  allDirs = [targetUnit];
}

allDirs.forEach((unitId) => {
  console.log(`Processing workbooks for unit: ${unitId}`);
  const dataPath = path.join(publicUnitsDir, unitId, "data.js");
  if (!fs.existsSync(dataPath)) return;

  const dataContent = fs.readFileSync(dataPath, "utf8");
  let startIndex = dataContent.indexOf('{');
  if (startIndex === -1) {
    console.log(`Skipping workbook generation for ${unitId} (no opening brace found).`);
    return;
  }
  const endIndex = dataContent.lastIndexOf('}');
  if (endIndex === -1) return;

  const jsonStr = dataContent.substring(startIndex, endIndex + 1);
  let unitData;
  try {
    unitData = eval(
      "(function(){ const mock_exams=[]; return " + jsonStr + ";})()",
    );
  } catch (e) {
    console.error(`Error parsing data.js for ${unitId}:`, e.message);
    return;
  }

  if (!unitData.lessons) return;

  const markersPath = path.join(
    __dirname,
    "scratch",
    `pdf_markers_${unitId}.json`,
  );
  let pdfMarkers = [];
  if (fs.existsSync(markersPath)) {
    try {
      pdfMarkers = JSON.parse(fs.readFileSync(markersPath, "utf8"));
    } catch (e) {
      console.error(`Error reading pdf markers for ${unitId}:`, e.message);
    }
  }
  let globalExamQNum = 1;
  unitData.lessons.forEach((l) => {
    function checkAndAdd(obj, force = false) {
      if (!obj) return;
      let qText = obj.question || obj.text || obj.topic || obj.stretch_question;
      if (force || obj.marks || (qText && /\(\d+\s*marks?\)/i.test(qText))) {
        obj.examQNum = globalExamQNum++;
      }
    }
    if (l.primary_source) checkAndAdd(l.primary_source);
    if (l.sources) l.sources.forEach((s) => checkAndAdd(s));
    if (l.tasks) l.tasks.forEach((t) => checkAndAdd(t));
    if (l.historians_corner) checkAndAdd(l.historians_corner);
    if (l.narrative_blocks)
      l.narrative_blocks.forEach((b) => {
        if (b.tasks) b.tasks.forEach((t) => checkAndAdd(t));
        if (b.hinge_question) checkAndAdd(b.hinge_question);
        if (b.extended) checkAndAdd(b.extended);
      });
    if (l.extended) checkAndAdd(l.extended);
    if (l.gcse_task) {
      checkAndAdd(l.gcse_task);
      if (l.gcse_task.tasks) l.gcse_task.tasks.forEach((t) => checkAndAdd(t));
    }
    if (l.pair_share) checkAndAdd(l.pair_share);
    let epArray = l.exam_practice;
    if (
      l.exam_practice &&
      !Array.isArray(l.exam_practice) &&
      l.exam_practice.questions
    ) {
      epArray = l.exam_practice.questions;
    }
    if (epArray && Array.isArray(epArray)) {
      epArray.forEach((ep) => checkAndAdd(ep, true));
    }
  });

  unitData.lessons.forEach((lesson, lIdx) => {
      let allVideos = [];
      let imgTags = "";
      let sources = [];
      let interpretations = [];
      let sourceCharCode = 65;
    if (typeof sanitizeLessonData === "function") sanitizeLessonData(lesson);

    const startMarker = pdfMarkers.find((m) => m.marker === `L${lIdx}_Start`);
    if (startMarker) {
      lesson.startPage = startMarker.page;
    }

    if (lesson.sources) {
      lesson.sources.forEach((source, sIdx) => {
        const markerKey = `L${lIdx}_Source_${sIdx}`;
        const markerObj = pdfMarkers.find((m) => m.marker === markerKey);
        if (markerObj) {
          source.page = markerObj.page;
        }
      });
    }

    if (lesson.narrative_blocks) {
      lesson.narrative_blocks.forEach((block, bIdx) => {
        if (block.tasks) {
          block.tasks.forEach((task, tIdx) => {
            const markerKey = `L${lIdx}_Task_${bIdx}_${tIdx}`;
            const markerObj = pdfMarkers.find((m) => m.marker === markerKey);
            if (markerObj) {
              task.page = markerObj.page;
            }
          });
        }
        if (block.extended) {
          const markerKey = `L${lIdx}_Extended_${bIdx}`;
          const markerObj = pdfMarkers.find((m) => m.marker === markerKey);
          if (markerObj) {
            block.extended.page = markerObj.page;
          }
        }
      });
    }
  });

  let workbooksToGenerate = [];
  if (unitData.workbooks && unitData.workbooks.length > 0) {
    workbooksToGenerate = unitData.workbooks.map((wb) => ({
      name: wb.id,
      title: wb.title,
      image: wb.image,
      filter: (l) => {
        const prefix = wb.prefix || "";
        return l.title.startsWith(prefix) || (l.id && l.id.startsWith(prefix));
      },
    }));
  } else {
    // Generate one comprehensive workbook for the unit
    workbooksToGenerate = [
      {
        name: "full",
        title: unitData.title,
        filter: () => true,
      },
    ];
  }

  const htmlHead = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pupil Workbook - ${unitId}</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,500;1,600&display=swap" rel="stylesheet">
  <style>
      
    @page { size: A4 portrait; margin: 15mm 15mm 25mm 15mm; }
    body { font-family: 'Georgia', 'Garamond', serif; font-size: 11pt; line-height: 1.4; color: #1e293b;  }
    h1, h2, h3, h4, h5, h6, strong, .do-now-q, th { font-family: 'Inter', 'Helvetica Neue', 'Arial', sans-serif; }
    h1 { font-family: 'Playfair Display', serif; font-size: 30pt; text-align: center; margin-top: 60px; color: #0f172a; text-transform: uppercase; letter-spacing: 1px; }
    h2 { font-size: 18pt; color: #1e3a8a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-top: 15px; page-break-after: auto; }
    h4 { font-size: 11pt; color: #334155; margin-top: 10px; font-weight: 600; page-break-after: avoid; }
    h3 { font-size: 13pt; color: #334155; margin-top: 10px; font-weight: 600; page-break-after: auto; }
    .narrative-block { margin-bottom: 10pt; text-align: justify; orphans: 3; widows: 3; color: #334155; }
    .task-box { border-top: 2px solid #e2e8f0; padding-top: 10px; margin-top: 10px; margin-bottom: 10px; width: 100%; page-break-inside: auto !important; }
    .task-lines { border-bottom: 1px solid #94a3b8; height: 16px; margin-top: 5px; }
    .task-lines-large { border-bottom: 1px solid #94a3b8; height: 7mm; margin-top: 0px; box-sizing: border-box; }
    .dirt-box { margin-top: 20px; margin-bottom: 10px; border: 2px dashed #94a3b8; border-radius: 8px; padding: 15px; background-color: #f8fafc; page-break-inside: avoid; }
    .do-now-box { border-top: 2px solid #e2e8f0; padding-top: 10px; margin-top: 10px; margin-bottom: 10px; width: 100%; page-break-inside: auto; }
    .do-now-q { font-weight: 600; margin-bottom: 8px; color: #0f172a; }
    .source-container { border-top: 2px solid #e2e8f0; padding-top: 10px; margin-top: 10px; margin-bottom: 10px; text-align: center; page-break-inside: auto; }
    .source-container img { max-height: 250px !important; object-fit: contain !important; display: block; margin: 0 auto; }
    .source-caption { font-size: 9.5pt; color: #64748b; font-style: italic; margin-top: 10px; text-align: center; font-family: 'Inter', sans-serif; }
    .cover-image { width: 100%; max-width: 600px; height: auto; margin: 40px auto; display: block; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; }
    table { page-break-inside: avoid; width: 100%; border-collapse: separate; border-spacing: 0; border-radius: 8px; overflow: hidden; border: 1px solid #cbd5e1; }
    th {  color: white; padding-top: 12px; padding-bottom: 12px; font-weight: 600; text-align: left; border-right: 1px solid #3b82f6; }
    td { border-bottom: 1px solid #cbd5e1; border-right: 1px solid #cbd5e1; padding-top: 5px; padding-bottom: 5px; }
    tr:last-child td { border-bottom: none; }
    td:last-child, th:last-child { border-right: none; }
    tbody tr:nth-child(even) {  }
    .grading-footer { margin-top: 30px; padding-top: 15px; font-size: 9.5pt; color: #555; display: flex; flex-direction: column; gap: 8px; border-top: 1px solid #ccc; page-break-inside: auto; }
    .grading-boxes { display: flex; justify-content: space-between; }
    .grade-box { display: flex; align-items: center; gap: 5px; }
    .grade-box input[type="checkbox"] { -webkit-appearance: none; appearance: none; width: 12px; height: 12px; border: 1px solid #777; border-radius: 2px;  }
    .teacher-comment { border-bottom: 1px solid #777; width: 100%; height: 20px; display: inline-block; margin-top: 5px; }
    @media print { body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } * { box-shadow: none !important; border-radius: 0 !important; }
        img { max-width: 100% !important; object-fit: contain !important;  }
        .source-container { page-break-inside: auto; }
        .narrative-block { page-break-inside: auto; }
        .task-box { page-break-inside: auto !important; }
        h1, h2, h3, h4, h5, h6 { page-break-after: auto; }
        div[style*="display: none"] { display: block !important; }
        button[onclick*="display='none'"] { display: none !important; }
      }
      img { max-width: 100% !important; object-fit: contain !important;  }
      .source-container {  }
    }
</style>
</head>
<body>
`;

  workbooksToGenerate.forEach((period) => {
    let html = htmlHead;
    const periodLessons = unitData.lessons.filter(period.filter);
    if (periodLessons.length === 0) return;
    const periodTitle = period.title;
    const periodName = period.name;

    let bannerQuestion = unitData.enquiry || "Student Workbook";
    if (periodName === "medieval")
      bannerQuestion =
        "How much did medicine really change in Medieval England?";
    else if (periodName === "renaissance")
      bannerQuestion =
        "How much did medicine really change during the Medical Renaissance?";
    else if (periodName === "18th_19th")
      bannerQuestion =
        "How much did medicine really change in 18th and 19th Century Britain?";
    else if (periodName === "modern")
      bannerQuestion = "How much did medicine really change in Modern Britain?";
    else if (periodName === "western_front")
      bannerQuestion =
        "How did treatments and the trenches develop on the Western Front?";

    let appendixData = [];

    let progressTrackerRows = "";
    periodLessons.forEach((l, i) => {
      progressTrackerRows += `<tr style="background-color: #f1f5f9; height: 35px;"><td style="border: 1px solid #333; padding: 5px 6px; font-weight:bold;">L${i + 1}: ${l.title}</td><td style="border: 1px solid #333; padding: 5px 6px;"></td><td style="border: 1px solid #333; padding: 5px 6px;"></td><td style="border: 1px solid #333; padding: 5px 6px;"></td></tr>\n`;
    });
    if (unitData.assessments) {
      unitData.assessments.forEach((a) => {
        progressTrackerRows += `<tr style="height: 35px;"><td style="border: 1px solid #333; padding: 5px 6px; font-weight:bold;">Assessment: ${a.title}</td><td style="border: 1px solid #333; padding: 5px 6px;"></td><td style="border: 1px solid #333; padding: 5px 6px;"></td><td style="border: 1px solid #333; padding: 5px 6px;"></td></tr>\n`;
      });
    }

    html += `
    <div class="cover-page" style="page-break-after: always; text-align: center; display: flex; flex-direction: column; justify-content: flex-start; align-items: center; padding: 15px; min-height: auto; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border: 8px solid #1e3a8a; border-radius: 20px;">
      <h1 style="font-size: 28pt; margin-bottom: 5px; color: #1e3a8a; font-weight: 800; letter-spacing: -1px; text-transform: uppercase;">${periodTitle}</h1>
      ${(periodTitle || "").trim().toLowerCase() !== (unitData.title || "").trim().toLowerCase() ? `<h2 style="font-size: 16pt; margin-bottom: 5px; color: #334155; font-weight: 600; border: none; padding-bottom: 0;">${unitData.title}</h2>` : '<div style="margin-bottom: 5px;"></div>'}
      
      <div style="display: flex; flex-direction: row; justify-content: center; margin: 10px auto 10px auto; width: 80%; gap: 40px;">
        <div style="flex: 2; border-bottom: 1px solid #000; padding-bottom: 5px; font-weight: 500; font-size: 14pt; text-align: left;">Name: </div>
        <div style="flex: 1; border-bottom: 1px solid #000; padding-bottom: 5px; font-weight: 500; font-size: 14pt; text-align: left;">Class: </div>
      </div>
    `;

    if (unitData.cover_sources) {
      html += `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 85%; margin: 10px auto;">
        ${unitData.cover_sources
          .map((src) => {
            let imgSrc =
              typeof resolveAssetPath === "function"
                ? resolveAssetPath(src.image, 2)
                : `../..${src.image.startsWith("/") ? src.image : "/" + src.image}`;
            return `
          <div style="display: flex; gap: 10px; align-items: center;  padding-top: 5px; padding-bottom: 5px; border-radius: 8px; border: 1px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <img src="${imgSrc}" style="width: 80px; height: 80px; object-fit: cover; border: 2px solid white; border-radius: 4px; box-shadow: 1px 1px 3px rgba(0,0,0,0.2);" alt="${src.title}">
            <div style="text-align: left; flex: 1;">
              <strong style="display: block; font-size: 9pt; color: #1a237e; margin-bottom: 3px;">${src.title}</strong>
              <span style="font-size: 8pt; color: #475569; line-height: 1.2; display: block;">${src.description}</span>
            </div>
          </div>
          `;
          })
          .join("")}
      </div>
      `;
    } else if (unitData.hero_image) {
      let heroImageSrc =
        typeof resolveAssetPath === "function"
          ? resolveAssetPath(unitData.hero_image, 2)
          : `../..${unitData.hero_image.startsWith("/") ? unitData.hero_image : "/" + unitData.hero_image}`;
      html += `
      <div style="margin: 15px auto 10px auto; text-align: center; max-width: 85%;">
        <img src="${heroImageSrc}" style="width: 100%; max-height: 200px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.15); ">
        ${unitData.hero_caption ? `<p style="font-size: 10pt; color: #475569; margin-top: 10px; font-style: italic;">${unitData.hero_caption}</p>` : ""}
      </div>
      `;
    }

    html += `
    </div>
    
    <div class="tracker-page" style="page-break-after: always; padding: 20px;">
      <h3 style="margin-top: 0; color: #1e3a8a; text-align: center; margin-bottom: 25px; font-size: 16pt; text-transform: uppercase; letter-spacing: 1px;">Progress & Assessment Tracker</h3>
      <div style="width: 100%; display: flex; justify-content: center;">
        <table style="page-break-inside: avoid; width: 100%; border-collapse: collapse; text-align: left; font-size: 11pt; background-color: #ffffff; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
          <thead>
            <tr style="background-color: #1a237e; color: white;">
              <th style="border: 1px solid #333; padding: 10px; width: 35%;">Lesson / Assessment Title</th>
              <th style="border: 1px solid #333; padding: 10px; width: 10%; text-align: center;">Effort</th>
              <th style="border: 1px solid #333; padding: 10px; width: 10%; text-align: center;">Level</th>
              <th style="border: 1px solid #333; padding: 10px; width: 45%;">Teacher Comments</th>
            </tr>
          </thead>
          <tbody>
            ${progressTrackerRows}
            <tr style=" font-weight: bold; height: 45px;">
              <td style="border: 1px solid #333; padding: 10px; text-align: right;">Final Unit Grade:</td>
              <td style="border: 1px solid #333; padding: 10px; background:#eee;"></td>
              <td style="border: 1px solid #333; padding: 10px; background:#eee;"></td>
              <td style="border: 1px solid #333; padding: 10px;"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    `;

    periodLessons.forEach((lesson, lessonIndex) => {
      let allVideos = [];
      let imgTags = "";
      let sources = [];
      let interpretations = [];
      let sourceCharCode = 65;
      let globalQNum = 1;
    let currentUnitId = typeof unitId !== 'undefined' ? unitId : 'great_war';
    if (lesson.do_now && (lesson.do_now.prediction_question || lesson.do_now.question)) lesson.do_now.qNum = globalQNum++;
    if (lesson.primary_source && lesson.primary_source.question) lesson.primary_source.qNum = globalQNum++;
    
    if (lesson.narrative_blocks) {
      lesson.narrative_blocks.forEach(block => { 
        if (block.tasks) {
          block.tasks.forEach(task => { 
            if (currentUnitId === 'great_war' || currentUnitId === 'great_war_part2') { 
              if (typeof task.text === 'string') task.text = task.text.replace(/^Task\s*\d*:\s*/i, ''); 
              if (typeof task.question === 'string') task.question = task.question.replace(/^Task\s*\d*:\s*/i, ''); 
            } 
            if (task.type !== 'vocab_match' && task.type !== 'drag_drop_timeline') task.qNum = globalQNum++; 
          }); 
        }
        if (block.hinge_question) block.hinge_question.qNum = globalQNum++; 
      });
    }

    if (lesson.pair_share) lesson.pair_share.qNum = globalQNum++;
    if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = globalQNum++);
    if (lesson.extended && lesson.extended.question) lesson.extended.qNum = globalQNum++;
    if (lesson.sources) {
      lesson.sources.forEach(source => { 
        if (source.question) source.qNum = globalQNum++; 
      });
    }
    if (lesson.historians_corner && lesson.historians_corner.stretch_question) lesson.historians_corner.qNum = globalQNum++;
    if (lesson.gcse_task) {
      if (lesson.gcse_task.tasks) {
          lesson.gcse_task.tasks.forEach(t => t.qNum = globalQNum++);
      } else {
          lesson.gcse_task.qNum = globalQNum++;
      }
    }
    
    html += `<h2 style="margin-top: 40px; border-top: 3px solid #1e3a8a; padding-top: 20px; margin-bottom: 5px; page-break-before: always; page-break-after: auto;">L${lessonIndex + 1}: ${formatText(lesson.title)}</h2>`;
      if (lesson.startPage) {
        html += `<div style="font-size: 11pt; color: #555; margin-bottom: 15px; font-style: italic;">(See Textbook Page ${lesson.startPage})</div>`;
      } else {
        html += `<div style="margin-bottom: 10px;"></div>`;
      }

      if (lesson.a4_map) {
        if (Array.isArray(lesson.a4_map)) {
          html += `<div style="page-break-after: always; width: 100%; height: 85vh; display: flex; flex-direction: row; justify-content: center; align-items: center; gap: 20px;">`;
          lesson.a4_map.forEach((img) => {
            let mapPath =
              typeof resolveAssetPath === "function"
                ? resolveAssetPath(img, 2)
                : `../..${img.startsWith("/") ? img : "/" + img}`;
            html += `<img src="${mapPath}" style="max-width: 48%; max-height: 100%; object-fit: contain;  padding: 5px; box-sizing: border-box;">`;
          });
          html += `</div>`;
        } else {
          let mapPath =
            typeof resolveAssetPath === "function"
              ? resolveAssetPath(lesson.a4_map, 2)
              : `../..${lesson.a4_map.startsWith("/") ? lesson.a4_map : "/" + lesson.a4_map}`;
          html += `<div style="page-break-after: always; width: 100%; height: 85vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">`;
          html += `<img src="${mapPath}" style="max-width: 100%; max-height: 100%; object-fit: contain;  padding: 5px; box-sizing: border-box;">`;
          html += `</div>`;
        }
      }

      if (
        lesson.teacher_notes &&
        lesson.teacher_notes.objectives &&
        lesson.teacher_notes.objectives.length > 0
      ) {
        html += `<div style="margin-bottom: 15px; padding-top: 5px; padding-bottom: 5px; border: 1px solid #cbd5e1; border-radius: 8px;  ">`;
        html += `<h4 style="margin: 0 0 8px 0; color: #1e3a8a; font-size: 10pt; text-transform: uppercase;">Learning Objectives</h4>`;
        lesson.teacher_notes.objectives.forEach((obj) => {
          html += `<div style="display: flex; align-items: flex-start; margin-bottom: 4px;">`;
          html += `<div style="width: 12px; height: 12px; border: 1.5px solid #64748b; border-radius: 2px; margin-right: 8px; margin-top: 2px; flex-shrink: 0; "></div>`;
          html += `<div style="font-size: 9.5pt; color: #334155; line-height: 1.2;">${formatText(obj.objective)}</div>`;
          html += `</div>`;
        });
        html += `</div>`;
      }
      // Hook text and fun facts removed for Pupil Workbook

      // Primary Source
      if (lesson.primary_source) {
        let srcs = Array.isArray((lesson.primary_source.src || lesson.primary_source.source))
          ? (lesson.primary_source.src || lesson.primary_source.source)
          : [(lesson.primary_source.src || lesson.primary_source.source)];
        let renderImages = false; // globally disabled for pupil workbooks to save space
        if (lesson.a4_map && (lesson.primary_source.src || lesson.primary_source.source)) {
          let a4Str = JSON.stringify(lesson.a4_map);
          let srcStr = JSON.stringify((lesson.primary_source.src || lesson.primary_source.source));
          if (a4Str === srcStr || lesson.a4_map === (lesson.primary_source.src || lesson.primary_source.source))
            renderImages = false;
        }

        imgTags = "";
        if (renderImages) {
          imgTags = srcs
            .map((src) => {
              let resolved =
                typeof resolveAssetPath === "function"
                  ? resolveAssetPath(src, 2)
                  : `../..${src.startsWith("/") ? src : "/" + src}`;
              const style =
                lesson.primary_source.custom_style ||
                (srcs.length > 1
                  ? "max-width: 100%; max-height: 450px; object-fit: contain; display: block; margin: 0 auto; border-radius: 4px; box-shadow: 2px 2px 5px rgba(0,0,0,0.1);"
                  : "max-width: 100%; max-height: 350px; object-fit: contain;  border-radius: 4px; box-shadow: 2px 2px 5px rgba(0,0,0,0.1);");
              return `<img src="${resolved}" alt="Primary Source" style="${style}">`;
            })
            .join(" ");
        }

        html += `
        <div class="source-container" style=" margin-bottom: 0px; padding-top: 0px; border-top: none;">
          ${(renderImages && lesson.primary_source.title) ? `<strong>${badgeSource(lesson.primary_source.title, String.fromCharCode(sourceCharCode++))}</strong><br>` : ""}
          <div style="${srcs.length > 1 ? "display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 20px;" : "display: flex; justify-content: center; gap: 10px;"} margin: 15px 0;">${imgTags}</div>
          ${(renderImages && lesson.primary_source.caption) ? `<div class="source-caption">${lesson.primary_source.caption}</div>` : ""}
          ${lesson.primary_source.question ? `<div style="margin-top: 15px; text-align: left;"><strong>Q${lesson.primary_source.qNum}. ${lesson.primary_source.question.replace("Enquiry: ", "")}${lesson.primary_source.page ? ` [p. ${lesson.primary_source.page}]` : ""}</strong></div><div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>` : ""}
        </div>
      `;
      }

      // Starter Activities (Do Now & Vocab stacked)
      html += `<div style="width: 100%; margin-bottom: 10px;">`;

      // Do Now
      html += `<div>`;
      if (lesson.do_now) {
        if (lesson.do_now.type === "timeline") {
          html += `<div class="do-now-box" style="padding: 5px; margin-bottom: 5px;">
                   <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 5px;">
                     <h3 style="margin: 0; font-size: 11pt;">Chronological Domino Flowchart</h3>
                     <div style=" padding: 3px 10px; font-weight: bold; font-size: 10pt; border-radius: 4px; ">Score: &nbsp;&nbsp;&nbsp;&nbsp; / 5</div>
                   </div>
                   <p style="font-style: italic; color: #555; margin-top: 0; font-size: 9.5pt; margin-bottom: 5px;"><strong>Task:</strong> The historical events below are out of order. Read them carefully, then use your pen to <strong>draw arrows connecting the boxes</strong> in the correct chronological and causal order (Event A ➔ Event B ➔ Event C...).</p>
                   <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 5px;">`;

          let shuffledEvents = [...(lesson.do_now.events || [])];
          for (let i = shuffledEvents.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledEvents[i], shuffledEvents[j]] = [
              shuffledEvents[j],
              shuffledEvents[i],
            ];
          }

          shuffledEvents.forEach((ev, idx) => {
            if (unitId === "cme_new") {
              html += `<div style="flex: 1 1 30%; max-width: 31%; border: 1px solid #94a3b8; padding: 5px; box-sizing: border-box; box-shadow: 2px 2px 0px #cbd5e1; border-radius: 4px; background: #fff;">
                        <strong style="font-size: 8pt; color: #1e3a8a;">${ev.year || ""}</strong><br>
                        <strong style="font-size: 8pt;">${ev.title || ""}</strong><br>
                        <span style="font-size: 7.5pt; color: #475569;">${ev.detail || ""}</span>
                     </div>`;
            } else {
              html += `<div style="flex: 1 1 30%; max-width: 31%; border: 2px solid #334155; padding: 15px; box-sizing: border-box; box-shadow: 2px 2px 0px #cbd5e1; border-radius: 8px; background: #f8fafc;">
                        <strong style="font-size: 9.5pt; color: #1e3a8a;">${ev.year || ""}</strong><br>
                        <strong style="font-size: 9.5pt;">${ev.title || ""}</strong><br>
                        <span style="font-size: 9pt; color: #475569;">${ev.detail || ""}</span>
                     </div>`;
            }
          });
          html += `</div><div style="clear: both; margin-bottom: 5px;"></div>`;

          if (lesson.do_now.prediction_question) {
            html += `<div class="do-now-q" style="margin-top: 5px; font-size: 9.5pt;"><strong>${lesson.do_now.qNum ? "Q" + lesson.do_now.qNum + ". " : "1. "}${lesson.do_now.prediction_question}</strong></div>`;
            html += `<div class="task-lines" style="height: 12px; margin-top: 3px;"></div>`;
          }
          html += `</div>`;
        } else if (lesson.do_now.type === "text") {
          html += `<div class="do-now-box" style="padding: 5px; margin-bottom: 5px;">
                   <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 5px;">
                     <h3 style="margin: 0; font-size: 11pt;">${lesson.do_now.title || "Do Now Activity"}</h3>
                     <div style=" padding: 3px 10px; font-weight: bold; font-size: 10pt; border-radius: 4px; ">Score: &nbsp;&nbsp;&nbsp;&nbsp; / 5</div>
                   </div>`;
          html += `<div class="do-now-q" style="font-size: 9.5pt; margin-bottom: 4px;"><strong>${lesson.do_now.text}${lesson.startPage ? ` [p. ${lesson.startPage}]` : ""}</strong></div>`;
          for (let i = 0; i < 5; i++) {
            html += `<div class="task-lines" style="height: 12px; margin-top: 3px;"></div>`;
          }
          html += `</div>`;
        } else if (lesson.do_now.type === "timeline") {
          html += `<div class="do-now-box" style="padding: 5px; margin-bottom: 5px; page-break-inside: avoid;">
                   <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 10px;">
                     <h3 style="margin: 0; font-size: 11pt;">${lesson.do_now.title || "Domino Flowchart"}</h3>
                   </div>
                   <p style="font-size: 9.5pt; font-style: italic; margin-bottom: 15px;">${lesson.do_now.text || "Draw arrows connecting the events in the correct chronological and causal order."}</p>
                   <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; padding: 10px;">`;

          let shuffledEvents = [...lesson.do_now.events].sort(
            () => Math.random() - 0.5,
          );
          shuffledEvents.forEach((ev) => {
            let rot = Math.random() * 6 - 3;
            html += `<div style="border: 2px solid #334155; padding: 10px; border-radius: 6px; background-color: #f8fafc; font-weight: bold; font-size: 9pt; width: 40%; text-align: center; transform: rotate(${rot}deg); box-shadow: 2px 2px 5px rgba(0,0,0,0.1);">${ev}</div>`;
          });

          html += `</div>
                 <div style="height: 40px;"></div>
                 </div>`;
        } else if (
          lesson.do_now.type === "questions" ||
          lesson.do_now.type === "retrieval" ||
          (!lesson.do_now.type &&
            (lesson.do_now.items || lesson.do_now.questions))
        ) {
          let items = lesson.do_now.items || lesson.do_now.questions;
          let maxScore = items ? items.length : 5;
          html += `<div class="do-now-box" style="padding: 5px; margin-bottom: 5px;">
                   <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 5px;">
                     <h3 style="margin: 0; font-size: 11pt;">Do Now Activity</h3>
                     <div style=" padding: 3px 10px; font-weight: bold; font-size: 10pt; border-radius: 4px; ">Score: &nbsp;&nbsp;&nbsp;&nbsp; / ${maxScore}</div>
                   </div>`;
          if (items) {
            items.forEach((item, index) => {
              html += `<div class="do-now-q" style="font-size: 9.5pt; margin-bottom: 4px;"><strong>${index + 1}.</strong> ${item.question}</div>`;
              let linesToDraw = 2;
              for (let i = 0; i < linesToDraw; i++) {
                html += `<div class="task-lines" style="height: 12px; margin-top: 3px;"></div>`;
              }
              html += `<div style="height: 6px;"></div>`;
            });
          }
          html += `</div>`;
        }
      }

      html += `</div>`;

      // Vocab
      html += `<div>`;
      let vocabTerms = lesson.vocab;
      if (!vocabTerms && lesson.glossary) {
        vocabTerms = Object.keys(lesson.glossary).map((k) => ({
          term: k,
          definition: lesson.glossary[k],
        }));
      }
      if (vocabTerms && vocabTerms.length > 0) {
        let vocabStyle = lessonIndex % 3;
        html += `<div class="task-box" style="margin-bottom: 0px; padding: 5px; page-break-inside: avoid;">`;
        html += `<h3 style="margin-top: 0; margin-bottom: 5px; font-size: 11pt;">Vocabulary Check</h3>`;

        if (vocabStyle === 0) {
          if (lesson.vocab_cloze_text) {
            html += `<p style="font-style: italic; font-size: 9.5pt; margin: 2px 0 5px 0;">Fill in the blanks using the vocabulary words below.</p>`;
            let words = vocabTerms.map((v) => v.term).join(" &nbsp;|&nbsp; ");
            html += `<div style="border: 1px solid #ccc; padding: 4px; margin-bottom: 5px; text-align: center; font-weight: bold; font-size: 9.5pt;">${words}</div>`;
            let cloze = lesson.vocab_cloze_text.replace(/\[.*?\]/g, ' _______________________ ');
            html += `<p style="line-height: 1.6; font-size: 9.5pt; margin: 5px 0;">${cloze}</p>`;
          } else {
            html += `<p style="font-style: italic; font-size: 9.5pt; margin: 2px 0 5px 0;">Write a short paragraph using at least ${vocabTerms.length >= 4 ? "FOUR" : vocabTerms.length === 3 ? "THREE" : vocabTerms.length === 2 ? "TWO" : "ONE"} of the vocabulary words below correctly.</p>`;
            let words = vocabTerms.map((v) => v.term).join(" &nbsp;|&nbsp; ");
            html += `<div style="border: 1px solid #ccc; padding: 4px; margin-bottom: 5px; text-align: center; font-weight: bold; font-size: 9.5pt;">${words}</div>`;
            for (let i = 0; i < 4; i++) {
              html += `<div class="task-lines" style="height: 12px; margin-top: 3px;"></div>`;
            }
          }
        } else if (vocabStyle === 1) {
          html += `<p style="font-style: italic; font-size: 9.5pt; margin: 2px 0 5px 0;">Write a historically accurate sentence connecting two terms from the glossary box below.</p>`;
          let words = vocabTerms.map((v) => v.term).join(" &nbsp;|&nbsp; ");
          html += `<div style="border: 1px solid #ccc; padding: 4px; margin-bottom: 5px; text-align: center; font-weight: bold; font-size: 9.5pt;">${words}</div>`;
          html += `<strong style="font-size: 9.5pt;">Your Sentence:</strong><div class="task-lines" style="height: 12px; margin-top: 3px;"></div><div class="task-lines" style="height: 12px; margin-top: 3px;"></div><div class="task-lines" style="height: 12px; margin-top: 3px;"></div><div class="task-lines" style="height: 12px; margin-top: 3px;"></div>`;
        } else if (vocabStyle === 2) {
          let focusWord = vocabTerms[0].term;
          html += `<p style="font-style: italic; font-size: 9.5pt; margin: 2px 0 5px 0;">Write a clear definition and a historically accurate sentence for the term: <strong>${focusWord}</strong></p>`;
          html += `
          <div class="task-lines" style="height: 12px; margin-top: 15px;"></div><div class="task-lines" style="height: 12px; margin-top: 15px;"></div><div class="task-lines" style="height: 12px; margin-top: 15px;"></div><div class="task-lines" style="height: 12px; margin-top: 15px;"></div>
        `;
        }
        html += `</div>`;
      }

      html += `</div>`;

      html += `</div>`;

      // Sources
      let isGCSE = unitId === "weimar_nazi_germany" || unitId === "cme_new";
      if (lesson.sources && lesson.sources.length > 0 && !isGCSE) {
        const hasQuestions = lesson.sources.some((s) => s.question);
        if (hasQuestions) {
          html += `<div style="page-break-inside: auto; margin-bottom: 15px;">`;
          lesson.sources.forEach((source) => {
            if (source.question) {
              html += `
              <div class="source-container" style="border: none; padding-top: 0; margin-top: 0; margin-bottom: 10px; text-align: left;">
                <div style="margin-top: 10px; text-align: left;"><strong>Q${source.qNum ? source.qNum + "." : ""} ${source.question}${source.page ? ` [p. ${source.page}]` : ""}</strong></div><div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>
              </div>
            `;
            }
          });
          html += `</div>`;
        }
      }

      // Narrative Blocks & Tasks
      if (lesson.narrative_blocks) {
        lesson.narrative_blocks.forEach((block, bIdx) => {
          let textToRender = block.text || "";
          const kiRegex = /\[Key Individual:\s*([^\]]+)\]/gi;
          textToRender = textToRender.replace(kiRegex, (match, p1) => {
            return `<strong>${p1.trim()}</strong>`;
          });

          let finalRenderedText = formatText(textToRender);
          finalRenderedText = finalRenderedText.replace(
            /<details[^>]*>/gi,
            '<div class="side-quest-box" style="border-top: 2px solid #e2e8f0; padding-top: 15px; margin: 15px 0; page-break-inside: auto;">',
          );
          let isSideQuest = finalRenderedText.includes(
            '<details class="side-quest-box"',
          );
          finalRenderedText = finalRenderedText.replace(
            /<\/details>/gi,
            "</div>",
          ); // Close side-quest-box properly
          finalRenderedText = finalRenderedText.replace(
            /<summary[^>]*>(.*?)<\/summary>/gi,
            '<h3 style="color: #334155; margin-top: 0; font-size: 14pt; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px dashed #94a3b8; padding-bottom: 8px; display: flex; align-items: center; gap: 10px; page-break-after: avoid; break-after: avoid;">$1</h3>',
          );

          let hasContent =
            finalRenderedText.trim() !== "" ||
            block.hinge_question ||
            (block.tasks && block.tasks.length > 0) ||
            (block.source && block.source.question) ||
            block.extended;
          if (hasContent) {
            html += `<div class="narrative-block" id="para-${bIdx + 1}">`;
            if (finalRenderedText.trim() !== "") {
              // Narrative text removed for Pupil Workbook
            }

            if (block.extended && block.extended.question) {
              html += `<div class="task-box" style="margin-bottom: 20px;">`;
              html += `<p style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">${block.extended.question}</p>`;
              if (
                block.extended.scaffolding &&
                block.extended.scaffolding.length > 0
              ) {
                html += `<div style="margin-top: 15px; padding: 10px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px;"><strong style="color: #d97706;">Hints:</strong><ul style="margin: 5px 0 0 0; color: #92400e;">`;
                block.extended.scaffolding.forEach((hint) => {
                  html += `<li>${formatText(hint)}</li>`;
                });
                html += `</ul></div>`;
              }
              html += `<div style="min-height: 200px;">`;
              const lineCount = block.extended.lines || 8;
              for (let i = 0; i < lineCount; i++) {
                html += `<div class="task-lines-large"></div>`;
              }
              html += `</div></div>`;
            }

            if (block.tasks && block.tasks.length > 0) {
              html += `<div class="task-box">`;
              block.tasks.forEach((task) => {
                if (task.type === "drawing" || task.type === "draw") {
                  html += `<div class="task-box" style="box-sizing: border-box; margin-bottom: 20px; border: 2px dashed #f59e0b; padding: 15px; border-radius: 8px; page-break-inside: avoid;">`;
                  html += `<h4 style="margin-top: 0; color: #b45309;">Drawing Task: Q${task.qNum || ""} ${task.text || task.question}</h4>`;
                  html += `<div style="height: 250px;"></div>`;
                  html += `</div>`;
                  return;
                }
                if (task.type === "multiple_choice") {
                  html += `<div class="task-box">`;
                  html += `<h4 style="margin-top: 0;">Q${task.qNum || ""} ${task.text || task.question || task.instruction || task.title || ''}</h4>`;
                  task.questions.forEach((q, qIdx) => {
                    html += `<p style="font-weight:bold; margin-bottom:5px;">${qIdx + 1}. ${q.q}</p><ul style="list-style-type:none; padding-left:10px; margin-top:0;">`;
                    q.options.forEach((opt) => {
                      html += `<li style="margin-bottom: 5px;"><input type="checkbox" style="margin-right:8px; position:relative; top:2px;">${opt}</li>`;
                    });
                    html += `</ul>`;
                  });
                  html += `</div>`;
                  return;
                }
                if (task.type === "sorting") {
                  html += `<div class="task-box">`;
                  html += `<h4 style="margin-top: 0;">Q${task.qNum || ""} ${task.text || task.question || task.instruction || task.title || ''}</h4>`;
                  html += `<ul style="list-style-type:none; padding-left:0;">`;
                  task.events.forEach((ev) => {
                    html += `<li style="margin-bottom: 10px; display:flex; gap:10px;"><div style="width:30px; height:30px; border:1px solid #333; display:flex; align-items:center; justify-content:center;"></div><span>${ev}</span></li>`;
                  });
                  html += `</ul></div>`;
                  return;
                }
                if (task.type === "cloze") {
                  let cloze = task.cloze_text.replace(
                    /\[([^\]]+)\]/g,
                    "______________",
                  );
                  html += `<div class="task-box">`;
                  html += `<h4 style="margin-top: 0;">Q${task.qNum || ""} ${task.text || task.question || task.instruction || task.title || ''}</h4>`;
                  html += `<p style="border: 1px solid #ccc; padding: 5px; font-weight: bold; font-size: 0.9em; text-align:center;">Word Bank: ${task.words.join(" | ")}</p>`;
                  html += `<p style="line-height: 2;">${cloze}</p>`;
                  html += `</div>`;
                  return;
                }

                if (task.type === "physician_game") {
                  html += `<div class="task-box">`;
                  html += `<h4 style="margin-top: 0;">Q${task.qNum || ""} ${task.text || task.question || task.instruction || task.title || ''}</h4>`;
                  html += `<p style="font-style: italic;">Read the patient symptoms below. Write down your recommended medieval cure in the empty box. Your teacher will reveal the outcome!</p>`;
                  html += `<table   style="page-break-inside: avoid; page-break-inside: avoid; width:100%; border-collapse:collapse; margin-top:10px; border: 1px solid #333;">`;
                  html += `<thead><tr><th style="border:1px solid #333; padding:8px; width:20%; background:#f1f5f9;">Patient</th><th style="border:1px solid #333; padding:8px; width:40%; background:#f1f5f9;">Symptoms</th><th style="border:1px solid #333; padding:8px; width:40%; background:#f1f5f9;">Your Recommended Cure</th></tr></thead>`;
                  html += `<tbody>`;
                  const patients = [
                    {
                      name: "William",
                      symptoms:
                        "High fever, shivering, and large, painful black swellings (buboes) in his armpits.",
                    },
                    {
                      name: "Agnes",
                      symptoms:
                        "Coughing up blood, severe chest pain, and struggling to breathe.",
                    },
                    {
                      name: "John",
                      symptoms:
                        "Fingers and toes have turned completely black. High fever and vomiting.",
                    },
                    {
                      name: "Thomas",
                      symptoms:
                        "A runny nose, a mild cough, and feeling a bit tired.",
                    },
                  ];
                  patients.forEach((p) => {
                    html += `<tr>
                      <td style="border:1px solid #333; padding:8px; font-weight:bold;">${p.name}</td>
                      <td style="border:1px solid #333; padding:8px;">${p.symptoms}</td>
                      <td style="border:1px solid #333; padding:8px; height: 60px;"></td>
                    </tr>`;
                  });
                  html += `</tbody></table></div>`;
                  return;
                }
                if (task.type === "matching") {
                  html += `<div class="task-box">`;
                  html += `<h4 style="margin-top: 0;">Q${task.qNum || ""} ${task.text || task.question || task.instruction || task.title || ''}</h4>`;
                  html += `<table   style="page-break-inside: avoid; page-break-inside: avoid;" style="width:100%; border:none;"><tbody>`;
                  const rightMixed = [...task.pairs].sort(
                    () => Math.random() - 0.5,
                  );
                  task.pairs.forEach((p, i) => {
                    html += `<tr>
                     <td style="border:1px solid #333; padding:10px; width:40%;">${(p.left || '').replace(/\n/g, '<br>')}</td>
                     <td style="width:20%; text-align:center;">&bull; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &bull;</td>
                     <td style="border:1px solid #333; padding:10px; width:40%;">${(rightMixed[i].right || '').replace(/\n/g, '<br>')}</td>
                   </tr>`;
                  });
                  html += `</tbody></table></div>`;
                  return;
                }
                if (task.type === "table_planner") {
                  html += `<div class="task-box">`;
                  html += `<h4 style="margin-top: 0;">Q${task.qNum || ""} ${task.text || task.question || task.instruction || task.title || ''}</h4>`;
                  html += `<table   style="page-break-inside: avoid; page-break-inside: avoid; width:100%; border-collapse:collapse; margin-top:10px; border: 1px solid #333;"><thead><tr>`;
                  task.columns.forEach((c) => {
                    html += `<th style="border: 1px solid #333; padding: 8px; background:#f1f5f9; color:#000;">${c}</th>`;
                  });
                  html += `</tr></thead><tbody>`;
                  for (let i = 0; i < task.rows; i++) {
                    html += `<tr>`;
                    task.columns.forEach(() => {
                      html += `<td style="border: 1px solid #333; padding: 8px; height: 60px;"></td>`;
                    });
                    html += `</tr>`;
                  }
                  html += `</tbody></table></div>`;
                  return;
                }
                if (task.type === "think_pair_share") {
                  html += `<div class="task-box" style="page-break-inside: avoid; box-sizing: border-box; border: 2px solid #10b981; padding: 15px; border-radius: 8px;">`;
                  html += `<h4 style="margin-top: 0; color: #065f46;">Think-Pair-Share: Q${task.qNum || ""} ${task.text || task.question}</h4>`;
                  html += `<table   style="page-break-inside: avoid; page-break-inside: avoid;" style="width:100%; border-collapse:collapse; margin-top:10px;">
                   <thead><tr>
                     <th style="border:1px solid #333; padding:8px; text-align:left; color:#000;">1. My Thoughts (Think)</th>
                     <th style="border:1px solid #333; padding:8px; text-align:left; color:#000;">2. Partner's Thoughts (Pair)</th>
                   </tr></thead>
                   <tbody><tr>
                     <td style="border:1px solid #333; padding:8px; height:120px;"></td>
                     <td style="border:1px solid #333; padding:8px; height:120px;"></td>
                   </tr></tbody>
                 </table></div>`;
                  return;
                }
                if (true) {
                  if (
                    task.type === "vocab_match" ||
                    task.type === "drag_drop_timeline"
                  ) {
                    // Do nothing
                  } else {
                    html += `<p style="margin-top:10px;"><strong>Q${task.qNum}. ${task.text || task.question}</strong></p>`;
                    if (task.type === 'extended_writing' && task.instructions) {
                        html += `<p style="font-style: italic; color: #334155; margin-bottom: 5px; margin-top: 5px; font-size: 10pt;">${task.instructions}</p>`;
                    }
                  }
                  let linesToDraw = 3;
                  let tText = (task.text || task.question || "").toLowerCase();
                  if (task.type === "extended_writing") {
                    linesToDraw = 18;
                  } else if (
                    task.type === "analysis" ||
                    task.type === "debate" ||
                    tText.includes("explain") ||
                    tText.includes("describe") ||
                    tText.includes("two ") ||
                    tText.length > 60
                  ) {
                    linesToDraw = 6;
                  }
                  for (let i = 0; i < linesToDraw; i++) {
                    html += `<div class="task-lines"></div>`;
                  }
                }
              });
              html += `</div>`;
            }

            if (block.hinge_question) {
              html += `<div class="task-box" style=" ">`;
              html += `<p style="margin-top:0px; margin-bottom: 10px; color: #475569; font-size: 0.9em; text-transform: uppercase;"><strong>Knowledge Check (Q${block.hinge_question.qNum})</strong></p>`;
              html += `<p style="margin-bottom: 15px;"><strong>${block.hinge_question.text || block.hinge_question.question}</strong></p>`;
              html += `<ul style="list-style-type: none; padding-left: 0; margin-bottom: 0;">`;
              block.hinge_question.options.forEach((opt, idx) => {
                html += `<li style="margin-bottom: 8px;"><div style="display: inline-block; width: 16px; height: 16px; border: 1px solid #333; margin-right: 10px; border-radius: 3px; position: relative; top: 3px;"></div>${String.fromCharCode(65 + idx)}. ${opt}</li>`;
              });
              html += `</ul></div>`;
            }
            if (block.source && block.source.question) {
              html += `<div class="task-box">`;
              html += `<h4 style="margin-top: 10px; margin-bottom: 15px;">Q${block.source.qNum ? block.source.qNum + ". " : ""}${block.source.question}${block.source.page ? ` [p. ${block.source.page}]` : ""}</h4>`;
              for (let i = 0; i < 4; i++) {
                html += `<div class="task-lines" style="height: 12px; margin-top: 15px;"></div>`;
              }
              html += `</div>`;
            }
            html += `</div>`; // Close narrative-block div
          }
        });
      }

      // Extended Scholarship
      if (lesson.extended && lesson.extended.paragraphs) {
        html += `<h3 style="margin-top: 40px; page-break-before: auto;">${lesson.extended.title}</h3>`;
        lesson.extended.paragraphs.forEach((para) => {
          html += `<p class="narrative-block" style="font-size: 12pt; color: #444;">${formatText(para)}</p>`;
        });
      }

      // Narrative
      if (lesson.narrative) {
        lesson.narrative.forEach((block, idx) => {
          html += `<p class="narrative-block"><strong style="color:#000;">${idx + 1}.</strong> ${formatText(block.text)}</p>`;
        });
      }

      if (lesson.tasks && lesson.tasks.length > 0) {
        html += `<h3 style="margin-top: 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px; page-break-after: avoid; break-after: avoid;">Active Tasks</h3>`;
        lesson.tasks.forEach((task, tIdx) => {
          if (task.type === "spectrum_mapper") {
            // html += `<div style="page-break-before: always;"></div>`;
            html += `<h2 style="text-align: center; margin-bottom: 30px;">${task.text || "Spectrum Planner"}</h2>`;

            // Draw the spectrum line
            html += `<div style="margin-top: 50px; margin-bottom: 50px; position: relative;">`;
            html += `<div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 14pt; margin-bottom: 10px;">`;
            html += `<div>${task.labels[0]}</div><div>${task.labels[1]}</div>`;
            html += `</div>`;
            html += `<div style="height: 4px;  width: 100%; position: relative;">`;
            html += `<div style="position: absolute; left: 0%; top: -10px; width: 2px; height: 24px; "></div>`;
            html += `<div style="position: absolute; left: 25%; top: -10px; width: 2px; height: 24px; "></div>`;
            html += `<div style="position: absolute; left: 50%; top: -10px; width: 2px; height: 24px; "></div>`;
            html += `<div style="position: absolute; left: 75%; top: -10px; width: 2px; height: 24px; "></div>`;
            html += `<div style="position: absolute; left: 100%; top: -10px; width: 2px; height: 24px; "></div>`;
            html += `</div></div>`;

            html += `<h3 style="margin-top: 40px;">Factors to map:</h3>`;
            html += `<div style="display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 40px;">`;
            task.items.forEach((item) => {
              html += `<div style=" padding: 15px; width: 45%; border-radius: 8px;">`;
              html += `<strong>${item.title}</strong><br>`;
              if (item.desc)
                html += `<span style="font-size: 0.9em; color: #555;">${item.desc}</span>`;
              html += `</div>`;
            });
            html += `</div>`;

            html += `<h3>Notes & Paragraph Plan</h3>`;
            for (let i = 0; i < 10; i++) {
              html += `<div class="task-lines-large"></div>`;
            }

            // Add two pages for the final essay
            html += `<div style="page-break-before: always; margin-top: 20px;">`;
            html += `<h2 style="color: #0284c7; font-size: 18pt;">Final Assessment Essay</h2>`;
            html += `<p style="font-weight: bold; font-size: 12pt;">How 'modern' was Britain by 1750?</p>`;
            for (let i = 0; i < 30; i++) {
              html += `<div class="task-lines-large"></div>`;
            }
            html += `</div>`;
            html += `<div style="page-break-before: always; margin-top: 20px;">`;
            for (let i = 0; i < 35; i++) {
              html += `<div class="task-lines-large"></div>`;
            }
            html += `</div>`;

            return;
          }

          if (task.type === "drawing" || task.type === "draw") {
            html += `<div class="task-box" style="box-sizing: border-box; margin-bottom: 20px; border: 2px dashed #f59e0b; padding: 15px; border-radius: 8px; page-break-inside: avoid;">`;
            html += `<h4 style="margin-top: 0; color: #b45309;">Drawing Task: Q${task.qNum || tIdx + 1} ${task.text || task.question}</h4>`;
            html += `<div style="height: 250px;"></div>`;
            html += `</div>`;
            return;
          }
          if (task.type === "multiple_choice") {
            html += `<div class="task-box">`;
            html += `<h4 style="margin-top: 0;">Q${task.qNum || tIdx + 1} ${task.text || task.question || task.instruction || task.title || ''}</h4>`;
            task.questions.forEach((q, qIdx) => {
              html += `<p style="font-weight:bold; margin-bottom:5px;">${qIdx + 1}. ${q.q}</p><ul style="list-style-type:none; padding-left:10px; margin-top:0;">`;
              q.options.forEach((opt) => {
                html += `<li style="margin-bottom: 5px;"><input type="checkbox" style="margin-right:8px; position:relative; top:2px;">${opt}</li>`;
              });
              html += `</ul>`;
            });
            html += `</div>`;
            return;
          }
          if (task.type === "sorting") {
            html += `<div class="task-box">`;
            html += `<h4 style="margin-top: 0;">Q${task.qNum || tIdx + 1} ${task.text || task.question || task.instruction || task.title || ''}</h4>`;
            html += `<ul style="list-style-type:none; padding-left:0;">`;
            task.events.forEach((ev) => {
              html += `<li style="margin-bottom: 10px; display:flex; gap:10px;"><div style="width:30px; height:30px; border:1px solid #333; display:flex; align-items:center; justify-content:center;"></div><span>${ev}</span></li>`;
            });
            html += `</ul></div>`;
            return;
          }
          if (task.type === "cloze") {
            let cloze = task.cloze_text.replace(
              /\[([^\]]+)\]/g,
              "______________",
            );
            html += `<div class="task-box">`;
            html += `<h4 style="margin-top: 0;">Q${task.qNum || tIdx + 1} ${task.text || task.question || task.instruction || task.title || ''}</h4>`;
            html += `<p style="border: 1px solid #ccc; padding: 5px; font-weight: bold; font-size: 0.9em; text-align:center;">Word Bank: ${task.words.join(" | ")}</p>`;
            html += `<p style="line-height: 2;">${cloze}</p>`;
            html += `</div>`;
            return;
          }

          if (task.type === "physician_game") {
            html += `<div class="task-box">`;
            html += `<h4 style="margin-top: 0;">Q${task.qNum || ""} ${task.text || task.question || task.instruction || task.title || ''}</h4>`;
            html += `<p style="font-style: italic;">Read the patient symptoms below. Write down your recommended medieval cure in the empty box. Your teacher will reveal the outcome!</p>`;
            html += `<table   style="page-break-inside: avoid; page-break-inside: avoid; width:100%; border-collapse:collapse; margin-top:10px; border: 1px solid #333;">`;
            html += `<thead><tr><th style="border:1px solid #333; padding:8px; width:20%; background:#f1f5f9;">Patient</th><th style="border:1px solid #333; padding:8px; width:40%; background:#f1f5f9;">Symptoms</th><th style="border:1px solid #333; padding:8px; width:40%; background:#f1f5f9;">Your Recommended Cure</th></tr></thead>`;
            html += `<tbody>`;
            const patients = [
              {
                name: "William",
                symptoms:
                  "High fever, shivering, and large, painful black swellings (buboes) in his armpits.",
              },
              {
                name: "Agnes",
                symptoms:
                  "Coughing up blood, severe chest pain, and struggling to breathe.",
              },
              {
                name: "John",
                symptoms:
                  "Fingers and toes have turned completely black. High fever and vomiting.",
              },
              {
                name: "Thomas",
                symptoms:
                  "A runny nose, a mild cough, and feeling a bit tired.",
              },
            ];
            patients.forEach((p) => {
              html += `<tr>
                      <td style="border:1px solid #333; padding:8px; font-weight:bold;">${p.name}</td>
                      <td style="border:1px solid #333; padding:8px;">${p.symptoms}</td>
                      <td style="border:1px solid #333; padding:8px; height: 60px;"></td>
                    </tr>`;
            });
            html += `</tbody></table></div>`;
            return;
          }
          if (task.type === "matching") {
            html += `<div class="task-box">`;
            html += `<h4 style="margin-top: 0;">Q${task.qNum || tIdx + 1} ${task.text || task.question || task.instruction || task.title || ''}</h4>`;
            html += `<table   style="page-break-inside: avoid; page-break-inside: avoid;" style="width:100%; border:none;"><tbody>`;
            const rightMixed = [...task.pairs].sort(() => Math.random() - 0.5);
            task.pairs.forEach((p, i) => {
              html += `<tr>
                 <td style="border:1px solid #333; padding:10px; width:40%;">${(p.left || '').replace(/\n/g, '<br>')}</td>
                 <td style="width:20%; text-align:center;">&bull; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &bull;</td>
                 <td style="border:1px solid #333; padding:10px; width:40%;">${(rightMixed[i].right || '').replace(/\n/g, '<br>')}</td>
               </tr>`;
            });
            html += `</tbody></table></div>`;
            return;
          }
          if (task.type === "table_planner") {
            html += `<div class="task-box">`;
            html += `<h4 style="margin-top: 0;">Q${task.qNum || tIdx + 1} ${task.text || task.question || task.instruction || task.title || ''}</h4>`;
            html += `<table   style="page-break-inside: avoid; page-break-inside: avoid; width:100%; border-collapse:collapse; margin-top:10px; border: 1px solid #333;"><thead><tr>`;
            task.columns.forEach((c) => {
              html += `<th style="border: 1px solid #333; padding: 8px; background:#f1f5f9; color:#000;">${c}</th>`;
            });
            html += `</tr></thead><tbody>`;
            for (let i = 0; i < task.rows; i++) {
              html += `<tr>`;
              task.columns.forEach(() => {
                html += `<td style="border: 1px solid #333; padding: 8px; height: 60px;"></td>`;
              });
              html += `</tr>`;
            }
            html += `</tbody></table></div>`;
            return;
          }
          if (task.type === "think_pair_share") {
            html += `<div class="task-box" style="page-break-inside: avoid; box-sizing: border-box; border: 2px solid #10b981; padding: 15px; border-radius: 8px;">`;
            html += `<h4 style="margin-top: 0; color: #065f46;">Think-Pair-Share: Q${task.qNum || tIdx + 1} ${task.text || task.question}</h4>`;
            html += `<table   style="page-break-inside: avoid; page-break-inside: avoid;" style="width:100%; border-collapse:collapse; margin-top:10px;">
               <thead><tr>
                 <th style="border:1px solid #333; padding:8px; text-align:left; color:#000;">1. My Thoughts (Think)</th>
                 <th style="border:1px solid #333; padding:8px; text-align:left; color:#000;">2. Partner's Thoughts (Pair)</th>
               </tr></thead>
               <tbody><tr>
                 <td style="border:1px solid #333; padding:8px; height:120px;"></td>
                 <td style="border:1px solid #333; padding:8px; height:120px;"></td>
               </tr></tbody>
             </table></div>`;
            return;
          }

          let qText = task.question || task.text || "";
          qText = qText.replace(/\(Weighing the Evidence toggle tabs\)/ig, '');
          html += `<div class="task-box" style="page-break-inside: auto;">`;

          let match = qText.match(/^([A-Za-z0-9'\-\/ ]+):\s*(.*)/);
          if (match) {
            let subhead = match[1];
            let rest = match[2];
            html += `<h4 style="margin-top: 0; color: #0284c7; margin-bottom: 8px; font-size: 1.1em;">${subhead}</h4>`;
            html += `<p style="font-weight: bold; margin-top: 0;">Q${task.qNum || tIdx + 1}. ${rest}</p>`;
          } else {
            html += `<p style="font-weight: bold; margin-top: 0;">Q${task.qNum || tIdx + 1}. ${qText}</p>`;
          }
          let hasExamTaskLater =
            lesson.gcse_task ||
            lesson.exam_practice ||
            (lesson.extended && lesson.extended.question);
          let numLines =
            !hasExamTaskLater && tIdx === lesson.tasks.length - 1 ? 20 : 6;
          for (let i = 0; i < numLines; i++) {
            html += `<div class="task-lines-large"></div>`;
          }
          html += `</div>`;
        });
      }

       else {
        html += `<div style="page-break-inside: auto; margin-top: 30px; border-top: 2px solid #e2e8f0; padding-top: 20px;">`;
        html += `<h2 style="margin-top: 0; color: #1e3a8a;"><i class="fa-solid fa-pen-nib"></i> Lesson Consolidation</h2>`;

        if (lesson.lesson_assessment) {
          html += `<div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 15px; border-radius: 8px; margin-bottom: 15px;">`;
          html += `<p style="font-weight: bold; color: #166534; margin-top: 0;">${lesson.lesson_assessment.question}</p>`;
          if (lesson.lesson_assessment.hints) {
            html += `<p style="font-size: 0.95rem; margin-bottom: 5px;"><strong>Hints:</strong> ${lesson.lesson_assessment.hints}</p>`;
          }
          if (lesson.lesson_assessment.sentence_starters) {
            html += `<p style="font-size: 0.95rem; margin-top: 5px; margin-bottom: 0;"><strong>Sentence Starters:</strong></p>`;
            html += `<ul style="font-size: 0.95rem; margin-top: 5px; margin-bottom: 0; padding-left: 20px;">`;
            lesson.lesson_assessment.sentence_starters.forEach((starter) => {
              html += `<li><em>${starter}</em></li>`;
            });
            html += `</ul>`;
          }
          html += `</div>`;
        } else {
          const consolText = lesson.consolidation || "Reflect on today's learning and answer your teacher's final challenge.";
          html += `<p style="font-weight: bold; margin-bottom: 15px;">${consolText}</p>`;
        }

        for (let i = 0; i < 15; i++) {
          html += `<div class="task-lines-large"></div>`;
        }
        html += `</div>`;
      }
      // Inject General Notes Box
      html += `<div style="">`;
      html += `
      <div style="page-break-before: always; margin-top: 20px;">
        <h3 style="margin-top: 0; color: #334155;">General Notes</h3>
    `;
      for (let i = 0; i < 12; i++) {
        html += `<div class="task-lines-large"></div>`;
      }
      html += `</div>`;

      // Inject Discreet Grading Footer for the Lesson (KS3 ONLY)
      const isGCSEUnit = [
        "weimar_nazi_germany",
        "cme_new",
        "edexcel_medicine",
        "eee",
      ].includes(unitId);
      if (!isGCSEUnit) {
        html += `
        <div style="margin-top: 10px;"></div>
        <div class="grading-footer">
          <div class="grading-boxes">
            <label class="grade-box"><input type="checkbox"> Emerging (1-2)</label>
            <label class="grade-box"><input type="checkbox"> Emerging+ (3)</label>
            <label class="grade-box"><input type="checkbox"> Expected (4-5)</label>
            <label class="grade-box"><input type="checkbox"> Expected+ (6-7)</label>
            <label class="grade-box"><input type="checkbox"> Greater Depth (8-9)</label>
          </div>
          <div>Teacher Comment: <span class="teacher-comment"></span></div>
        </div>
      `;
      }

      
    // Pair Share
    if (lesson.pair_share) {
        html += `<div class="task-box" style="  ">`;
        html += `<h3 style="margin-top: 0; color: #0f766e;">Pair & Share Activity</h3>`;

        if (lesson.pair_share.sources) {
          let sourceHTML =
            '<div style="display: flex; gap: 20px; margin-bottom: 10px;">';
          lesson.pair_share.sources.forEach((srcObj) => {
            sourceHTML +=
              '<div style="flex: 1; border: 1px solid #0d9488; padding-top: 5px; padding-bottom: 5px; text-align: left; ">';
            if (srcObj.type === 'visual' || srcObj.src || srcObj.source || srcObj.image) {
              let imgSrc =
                typeof resolveAssetPath === "function"
                  ? resolveAssetPath((srcObj.src || srcObj.source || srcObj.image), 2)
                  : (srcObj.src || srcObj.source || srcObj.image);
              sourceHTML += `<img src="${imgSrc}" style="max-width: 100%; max-height: 250px;">`;
            } 
        if (srcObj.text || srcObj.content) { 
              sourceHTML += `<blockquote style="font-size: 11pt; font-style: italic; margin: 0 0 10px 0;">${srcObj.text}</blockquote>`;
            }
            if (srcObj.title)
              sourceHTML += `<p style="font-size: 10pt; font-weight: bold; margin-top: 5px;">\</p>`;
            sourceHTML += "</div>";
          });
          sourceHTML += "</div>";
          html += sourceHTML;
        }

        html += `<p style="font-weight: bold; font-size: 12pt; margin-bottom: 5px;">Q${lesson.pair_share.qNum}. Prompt: ${lesson.pair_share.prompt}</p>`;
        if (lesson.pair_share.think)
          html += `<p style="font-size: 12pt; font-style: italic; margin-top: 0;">Think: ${lesson.pair_share.think}</p>`;
        html += `<div style="margin-top: 15px; border-left: 4px solid #0f766e; padding-left: 15px;"><strong>Your Notes:</strong>`;
        for (let i = 0; i < 6; i++) {
          html += `<div class="task-lines-large"></div>`;
        }
        html += `</div>`;
        html += `</div>`;
      }

    // GCSE Task
    let hasExamTask =
        lesson.gcse_task ||
        lesson.exam_practice ||
        (lesson.extended && lesson.extended.question);
      if (hasExamTask) {
        html += `<div style="page-break-before: always; margin-top: 20px;">`;
        let fallbackExamTitle = [
          "water_and_sanitation",
          "early_modern_world",
          "change_1450_1750",
          "industrialisation_and_empire",
          "great_war",
          "great_war_part2",
        ].includes(unitId)
          ? "Writing Practice"
          : "GCSE Exam Practice";
        let examTitle =
          lesson.extended && lesson.extended.title
            ? lesson.extended.title
            : fallbackExamTitle;
        html += `<h2 style="margin-top: 0; color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 5px;">${examTitle}</h2>`;

        const renderLines = (text, customLines) => {
          if (customLines) {
            for (let i = 0; i < customLines; i++) {
              html += `<div class="task-lines-large"></div>`;
            }
          } else if (text.includes("16 marks")) {
            for (let i = 0; i < 96; i++) {
              html += `<div class="task-lines-large"></div>`;
            }
          } else if (
            text.includes("12 marks") ||
            text.includes("Explain why")
          ) {
            for (let i = 0; i < 64; i++) {
              html += `<div class="task-lines-large"></div>`;
            }
          } else if (text.includes("8 marks")) {
            for (let i = 0; i < 32; i++) {
              html += `<div class="task-lines-large"></div>`;
            }
          } else if (text.includes("2 marks")) {
            for (let i = 0; i < 3; i++) {
              html += `<div class="task-lines-large"></div>`;
            }
          } else if (
            text.includes("4 marks") ||
            text.includes("Explain one way") ||
            text.includes("Explain one consequence")
          ) {
            for (let i = 0; i < 5; i++) {
              html += `<div class="task-lines-large"></div>`;
            }
          } else {
            for (let i = 0; i < 6; i++) {
              html += `<div class="task-lines-large"></div>`;
            }
          }
        };

        if (lesson.extended && lesson.extended.question) {
          
          let letterA = 'A';
          let letterB = 'B';
          if (lesson.extended.source_a || lesson.extended.source_b) {
              letterA = String.fromCharCode(sourceCharCode++);
              if (lesson.extended.source_b) letterB = String.fromCharCode(sourceCharCode++);
              
              if (lesson.extended.question) {
                  lesson.extended.question = lesson.extended.question.replace(/Sources\s+A\s+and\s+B/g, 'Sources ' + letterA + ' and ' + letterB);
                  lesson.extended.question = lesson.extended.question.replace(/Source\s+A/g, 'Source ' + letterA);
                  lesson.extended.question = lesson.extended.question.replace(/Source\s+B/g, 'Source ' + letterB);
              }

            html += `<div style="display: flex; gap: 20px; margin-top: 15px; margin-bottom: 10px; ">`;
            if (lesson.extended.source_a) {
              const prov =
                typeof lesson.extended.source_a === "string"
                  ? ""
                  : lesson.extended.source_a.provenance;
              const content =
                typeof lesson.extended.source_a === "string"
                  ? lesson.extended.source_a
                  : lesson.extended.source_a.content;
              const isImageA =
                content.toLowerCase().endsWith(".png") ||
                content.toLowerCase().endsWith(".jpg");
              const renderedA = isImageA
                ? `<img src="${typeof resolveAssetPath === "function" ? resolveAssetPath(content, 2) : `../..${content.startsWith("/") ? content : "/" + content}`}" style="max-width: 100%; max-height: 400px; object-fit: contain; margin: 0 auto; display: block;">`
                : content.replace(/\n/g, "<br>");
              html += `<div style="flex: 1; display: flex; flex-direction: column; font-size: 0.95rem; line-height: 1.5;">
                  <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source ${letterA}</strong>
                  ${prov ? `<span style="color: #334155; display: block; margin-bottom: 15px; font-style: italic;">${prov}</span>` : ""}
                  <div style="border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px;  color: #0f172a; flex-grow: 1;">
                    ${renderedA}
                  </div>
                </div>`;
            }
            if (lesson.extended.source_b) {
              const prov =
                typeof lesson.extended.source_b === "string"
                  ? ""
                  : lesson.extended.source_b.provenance;
              const content =
                typeof lesson.extended.source_b === "string"
                  ? lesson.extended.source_b
                  : lesson.extended.source_b.content;
              const isImageB =
                content.toLowerCase().endsWith(".png") ||
                content.toLowerCase().endsWith(".jpg");
              const renderedB = isImageB
                ? `<img src="${typeof resolveAssetPath === "function" ? resolveAssetPath(content, 2) : `../..${content.startsWith("/") ? content : "/" + content}`}" style="max-width: 100%; max-height: 400px; object-fit: contain; margin: 0 auto; display: block;">`
                : content.replace(/\n/g, "<br>");
              html += `<div style="flex: 1; display: flex; flex-direction: column; font-size: 0.95rem; line-height: 1.5;">
                  <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source ${letterB}</strong>
                  ${prov ? `<span style="color: #334155; display: block; margin-bottom: 15px; font-style: italic;">${prov}</span>` : ""}
                  <div style="border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px;  color: #0f172a; flex-grow: 1;">
                    ${renderedB}
                  </div>
                </div>`;
            }
            html += `</div>`;
          }

          if (lesson.extended.provenance_clue) {
            html += `<div style="margin-top: 15px; margin-bottom: 15px; padding-top: 12px; padding-bottom: 12px;  border: 1px solid #bfdbfe; border-radius: 6px; "><strong style="color: #1e3a8a;">Provenance Scaffolding:</strong><p style="margin: 5px 0 0 0; color: #1e40af; font-style: italic;">${formatText(lesson.extended.provenance_clue)}</p></div>`;
          }
          if (lesson.extended.hints && lesson.extended.hints.length > 0) {
            html += `<div style="margin-top: 15px; margin-bottom: 15px; padding: 15px; background: #f0fdf4; border: 2px solid #22c55e; border-radius: 8px;">`;
            html += `<strong style="color: #166534; font-size: 11pt;">Scaffolding & Hints:</strong>`;
            html += `<ul style="margin: 8px 0 0 0; padding-left: 20px; color: #15803d; font-size: 10pt;">`;
            lesson.extended.hints.forEach((hint) => {
              html += `<li style="margin-bottom: 4px;">${formatText(hint)}</li>`;
            });
            html += `</ul></div>`;
          }
          html += `<div style="margin-top: 15px;"><strong>${lesson.extended.examQNum ? "Exam Q" + lesson.extended.examQNum + ". " : lesson.extended.qNum ? "Q" + lesson.extended.qNum + ". " : ""}${formatText(lesson.extended.question)}</strong></div>`;
          if (
            !lesson.extended.title ||
            !lesson.extended.title.toLowerCase().includes("map task")
          ) {
            renderLines(lesson.extended.question, lesson.extended.lines);
          }
          html += `<br>`;
        }

        if (lesson.gcse_task) {
          html += `<div class="task-box" style="margin-bottom: 15px; page-break-inside: auto; border-top: none; padding-top: 0; margin-top: 0;">`;

          if (lesson.gcse_task.tasks) {
            lesson.gcse_task.tasks.forEach((task) => {
              let isLong =
                task.text.includes("12 marks") ||
                task.text.includes("16 marks") ||
                task.marks === 12 ||
                task.marks === 16;
              if (isLong) {
                html += `<div class="dirt-box">
                    <h4 style="margin: 0 0 10px 0; color: #64748b; text-transform: uppercase; font-size: 0.85em; font-family: 'Inter', sans-serif;">Teacher Feedback / D.I.R.T.</h4>
                    <div style="height: 60px;"></div>
                 </div>`;
              }
              let pbBefore = isLong
                ? "page-break-before: always; margin-top: 30px;"
                : "margin-top: 15px;";
              html += `<div style="${pbBefore}"><strong>${task.examQNum ? "Exam Q" + task.examQNum + ". " : task.qNum ? "Q" + task.qNum + ". " : ""}${task.text || task.question || task.instruction || task.title || ''}</strong></div>`;
              renderLines(task.text);
              html += `<br>`;
            });
          } else if (lesson.gcse_task.sources) {
          let letterA = String.fromCharCode(sourceCharCode++);
          let letterB = lesson.gcse_task.sources.length > 1 ? String.fromCharCode(sourceCharCode++) : '';
          
          if (lesson.gcse_task.topic) {
              lesson.gcse_task.topic = lesson.gcse_task.topic.replace(/Sources\s+A\s+and\s+B/g, 'Sources ' + letterA + ' and ' + letterB);
              lesson.gcse_task.topic = lesson.gcse_task.topic.replace(/Source\s+A/g, 'Source ' + letterA);
              lesson.gcse_task.topic = lesson.gcse_task.topic.replace(/Source\s+B/g, 'Source ' + letterB);
          }

            html += `<div style="page-break-inside: auto; margin-top: 20px;">`;
            let topicText = lesson.gcse_task.topic || "";
            let tLower = topicText.toLowerCase();
            let isFullQuestion =
              tLower.includes("write a narrative account") ||
              tLower.includes("explain one consequence") ||
              tLower.includes("explain the importance") ||
              tLower.includes("how useful") ||
              tLower.includes("explain why") ||
              tLower.includes("describe");
            if (isFullQuestion) {
              html += `<p style="font-weight: bold; font-size: 13pt;">${lesson.gcse_task.qNum ? `Q${lesson.gcse_task.qNum}. ` : ""}${topicText}</p>`;
              if (tLower.includes("write a narrative account")) {
                html += `<p style="font-size: 11pt; color: #475569; font-style: italic;">Read the historical sources below before writing your narrative account:</p>`;
              }
            } else {
              html += `<p style="font-weight: bold; font-size: 13pt;">${lesson.gcse_task.qNum ? `Q${lesson.gcse_task.qNum}. ` : ""}How useful are Sources A and B for an enquiry into ${topicText}?</p>`;
            }

            let sourceHTML =
              '<div style="display: flex; gap: 20px; margin-bottom: 10px;">';
            lesson.gcse_task.sources.forEach((srcObj, i) => {
              sourceHTML +=
                '<div style="flex: 1; display: flex; flex-direction: column; justify-content: center; border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; background: #ffffff; color: #0f172a; flex-grow: 1;">' +
                '<strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem; text-align: left;">Source ' + String.fromCharCode(65 + i) + '</strong>' +
                (srcObj.title ? '<span style="color: #334155; display: block; margin-bottom: 15px; font-style: italic; text-align: left;">' + srcObj.title.replace(/Source [A-Z]:\s*/g, '') + '</span>' : '');
              if (srcObj.type === 'visual' || srcObj.src || srcObj.source || srcObj.image) {
                let imgSrc =
                  typeof resolveAssetPath === "function"
                    ? resolveAssetPath((srcObj.src || srcObj.source || srcObj.image), 2)
                    : (srcObj.src || srcObj.source || srcObj.image);
                sourceHTML += `<img src="${imgSrc}" style="max-width: 100%; max-height: 250px;">`;
              } 
        if (srcObj.text || srcObj.content) { 
                sourceHTML += `<blockquote style="font-size: 12pt; font-style: italic; margin: 0 0 10px 0; text-align: left;">${srcObj.text}</blockquote>`;
              }
              sourceHTML += `<p style="font-size: 10pt; font-weight: bold; margin-top: 5px;">\</p>`;
              sourceHTML += "</div>";
            });
            sourceHTML += "</div>";
            html += sourceHTML;
            html += `</div>`;

            if (
              unitId === "edexcel_medicine" ||
              unitId === "weimar_nazi_germany"
            ) {
              html += `<h3 style="margin-top: 0;">Source Evaluation Notes</h3>
              <table   style="page-break-inside: avoid; page-break-inside: avoid;" style="width: 100%; border-collapse: collapse; margin-bottom: 10px; ">
                <tr><th style=" padding-top: 8px; padding-bottom: 8px; width: 10%;">Source</th><th style=" padding-top: 8px; padding-bottom: 8px; width: 30%;">N.O.P.</th><th style=" padding-top: 8px; padding-bottom: 8px; width: 30%;">Content</th><th style=" padding-top: 8px; padding-bottom: 8px; width: 30%;">Context</th></tr>
                <tr><td style=" padding-top: 8px; padding-bottom: 8px; text-align: center; font-weight: bold; height: 120px;">${letterA}</td><td style=" padding-top: 8px; padding-bottom: 8px;"></td><td style=" padding-top: 8px; padding-bottom: 8px;"></td><td style=" padding-top: 8px; padding-bottom: 8px;"></td></tr>
                <tr><td style=" padding-top: 8px; padding-bottom: 8px; text-align: center; font-weight: bold; height: 120px;">${letterB}</td><td style=" padding-top: 8px; padding-bottom: 8px;"></td><td style=" padding-top: 8px; padding-bottom: 8px;"></td><td style=" padding-top: 8px; padding-bottom: 8px;"></td></tr>
              </table>`;
              html += `<h3 style="margin-top: 0;">Final Written Evaluation</h3>`;
              for (let i = 0; i < 10; i++) {
                html += `<div class="task-lines-large"></div>`;
              }
            } else {
              html += `<br>`;
              for (let i = 0; i < 20; i++) {
                html += `<div class="task-lines-large"></div>`;
              }
            }
          } else if (lesson.gcse_task.topic) {
            html += `<p style="font-weight: bold; font-size: 13pt;">${lesson.gcse_task.topic}</p>`;

            if (
              lesson.gcse_task.topic.toLowerCase().includes("narrative account")
            ) {
              html += `<div style="margin: 15px 0; padding-top: 12px; padding-bottom: 12px;   border-radius: 6px; ">
                <strong style="color: #b71c1c; font-size: 11pt;">Planning your narrative account:</strong>
                <p style="font-size: 10pt; margin-top: 5px; margin-bottom: 5px;">Remember to link your paragraphs chronologically. You could use these sentence starters:</p>
                <ul style="font-size: 10pt; margin-top: 0; margin-bottom: 0; padding-left: 20px;">
                  <li><em>The first key event was...</em></li>
                  <li><em>This directly led to...</em></li>
                  <li><em>Consequently, this triggered...</em></li>
                  <li><em>This situation culminated in...</em></li>
                </ul>
             </div>`;
            }

            html += `<br>`;
            let match = lesson.gcse_task.topic.match(/\((\d+)\s*marks?\)/i);
            let marks = match ? parseInt(match[1]) : 8;
            let numLines = marks === 4 ? 4 : marks * 3;
            for (let i = 0; i < numLines; i++) {
              html += `<div class="task-lines-large"></div>`;
            }
          }

          html += `</div>`;
        }

        if (lesson.sources && lesson.sources.length > 0 && isGCSE) {
          html += `<div style="page-break-inside: auto; margin-bottom: 15px; margin-top: 20px;">`;
          lesson.sources.forEach((source, sIdx) => {
            let sourceContent = source.content || source.text;
            if ((source.src || source.source || source.image) || source.caption || sourceContent) {
              html += `
              <div class="source-container" style="border: 1px solid #ccc; padding: 15px; margin-bottom: 15px; border-radius: 6px;">
                ${source.title ? `<strong style="font-size: 11pt;">${source.title}</strong><br>` : ""}
                ${(source.src || source.source || source.image) ? `<img src="${typeof resolveAssetPath === "function" ? resolveAssetPath((source.src || source.source || source.image), 2) : (source.src || source.source || source.image)}" alt="Source" style="max-width: 100%; max-height: 250px; margin-top: 10px;">` : ""}
                ${sourceContent ? `<blockquote style="text-align: left; font-size: 11pt; margin-top: 10px; font-style: italic;">${formatText(sourceContent)}</blockquote>` : ""}
                ${source.caption ? `<div class="source-caption" style="margin-top: 5px; font-size: 10pt;">${source.caption}</div>` : ""}
              </div>
            `;
            }
          });
          html += `</div>`;
        }

        let epArray = lesson.exam_practice;
        let epStimulus = [];
        if (
          lesson.exam_practice &&
          !Array.isArray(lesson.exam_practice) &&
          lesson.exam_practice.questions
        ) {
          epArray = lesson.exam_practice.questions;
          epStimulus = lesson.exam_practice.stimulus || [];
        }
        if (epArray && epArray.length > 0) {
          html += `<div class="task-box" style="margin-bottom: 10px; page-break-inside: auto; border-top: none; padding-top: 0; margin-top: 0;">`;

          let questionsBefore = [];
          let questionsAfter = [];
          epArray.forEach((ep, index) => {
            let qText = ep.question.toLowerCase();
            if (
              qText.includes("explain why") ||
              qText.includes("explain one consequence") ||
              qText.includes("describe two features") ||
              qText.includes("describe one feature")
            ) {
              questionsBefore.push({ ep, index });
            } else if (
              qText.includes("source") ||
              qText.includes("interpretation")
            ) {
              questionsAfter.push({ ep, index });
            } else {
              if (index < 2) questionsBefore.push({ ep, index });
              else questionsAfter.push({ ep, index });
            }
          });

          const renderQuestionLines = (qText) => {
            let lines = 8;
            if (qText.includes("16 marks")) lines = 96;
            else if (
              qText.includes("12 marks") ||
              qText.includes("Explain why")
            )
              lines = 64;
            else if (qText.includes("8 marks")) lines = 32;
            else if (
              qText.includes("4 marks") ||
              qText.includes("Explain one way") ||
              qText.includes("Explain one consequence") ||
              qText.includes("difference") ||
              qText.includes("Suggest one reason")
            )
              lines = 5;
            else if (qText.includes("2 marks")) lines = 3;
            let lHtml = "";
            for (let i = 0; i < lines; i++) {
              lHtml += `<div class="task-lines-large"></div>`;
            }
            return lHtml;
          };

          const renderQuestionItem = (item) => {
            let ep = item.ep;
            let index = item.index;
            let rawQText = ep.question || ep.text || "";
            let marksStr = ep.marks ? ` (${ep.marks} marks)` : "";
            if (rawQText.includes("marks)")) marksStr = "";
            let isLong =
              rawQText.includes("12 marks") ||
              rawQText.includes("16 marks") ||
              ep.marks === 12 ||
              ep.marks === 16;
            let pbBefore = isLong
              ? "page-break-before: always; margin-top: 30px;"
              : "margin-top: 15px;";
            let questionHtml = `<div style="${pbBefore} margin-bottom: 10px; padding-left: 15px; border-left: 4px solid #3b82f6;"><strong>${ep.examQNum ? "Exam Q" + ep.examQNum : "Q" + (index + 1)}. ${formatText(rawQText)}${marksStr}</strong></div>`;
            if (isLong) {
              questionHtml =
                `<div class="dirt-box">
                    <h4 style="margin: 0 0 10px 0; color: #64748b; text-transform: uppercase; font-size: 0.85em; font-family: 'Inter', sans-serif;">Teacher Feedback / D.I.R.T.</h4>
                    <div style="height: 60px;"></div>
                 </div>` + questionHtml;
            }

            if (ep.stimulus && ep.stimulus.length > 0) {
              let isSources =
                ep.question.toLowerCase().includes("useful") ||
                ep.question.toLowerCase().includes("follow up") ||
                ep.stimulus.some(
                  (s) =>
                    typeof s === "string" &&
                    (s.includes("Source A") || s.includes("Source B")),
                );
              if (isSources) {
                questionHtml += `<div style="display: flex; gap: 20px; margin-top: 15px; margin-bottom: 10px;">`;
                ep.stimulus.forEach((stimText, i) => {
                  questionHtml += `<div style="flex: 1; display: flex; flex-direction: column; font-size: 0.95rem; line-height: 1.5;">
                       <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source ${String.fromCharCode(65 + i)}</strong>
                       <div style="border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px;  color: #0f172a; flex-grow: 1;">
                         ${formatText(stimText.replace(/<strong>Source [A-Z]:\s*<\/strong>/, "").replace(/\n/g, "<br>"))}
                       </div>
                     </div>`;
                });
                questionHtml += `</div>`;
              } else {
                questionHtml += `<div style="margin-top: 5px; margin-bottom: 10px; padding-top: 5px; padding-bottom: 5px; border: 1.5px solid #cbd5e1; border-radius: 8px;   font-size: 0.95rem;">
                     <p style="margin-top: 0; margin-bottom: 8px; font-weight: bold;">You may use the following in your answer:</p>
                     <ul style="margin-top: 0; margin-bottom: 8px; padding-left: 25px;">`;
                ep.stimulus.forEach((stimText) => {
                  questionHtml += `<li style="margin-bottom: 4px;">${formatText(stimText)}</li>`;
                });
                questionHtml += `</ul><p style="margin-top: 0; margin-bottom: 0; font-weight: bold;">You must also use information of your own.</p></div>`;
              }
            }
            html += questionHtml + renderQuestionLines(ep.question);
          };

          questionsBefore.forEach(renderQuestionItem);

          if (epStimulus && epStimulus.length > 0) {
            html += `</div>`; // Close the initial task-box
            html += `<div style="page-break-before: always; page-break-inside: auto; margin-top: 20px;">`; // Force new page for sources
            html += `<h2 style="margin-top: 15px; margin-bottom: 15px; color: #1a237e; font-size: 14pt; border-bottom: none;">Exam Sources & Interpretations</h2>`;
            sources = [];
            interpretations = [];
            epStimulus.forEach((stim, i) => {
              let sTitle =
                stim.title || `Source ${String.fromCharCode(65 + i)}`;
              if (sTitle.toLowerCase().includes("interpretation")) {
                interpretations.push({ stim, sTitle });
              } else {
                sources.push({ stim, sTitle });
              }
            });

            if (sources.length > 0) {
              html += `<div style="display: flex; gap: 15px; margin-top: 15px; margin-bottom: 15px;">`;
              sources.forEach((item) => {
                let content = formatText(
                  item.stim.content || item.stim,
                ).replace(/\n/g, "<br>");
                html += `<div style="flex: 1; display: flex; flex-direction: column; font-size: 0.9rem; line-height: 1.3;">
                      <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1rem;">${item.sTitle}</strong>
                      <div style="border: 1px solid #cbd5e1; border-radius: 6px; padding-top: 5px; padding-bottom: 5px;  color: #0f172a; flex-grow: 1;">
                        ${content}
                      </div>
                    </div>`;
              });
              html += `</div>`;
            }
            if (interpretations.length > 0) {
              html += `<div style="display: flex; gap: 15px; margin-top: 15px; margin-bottom: 15px;">`;
              interpretations.forEach((item) => {
                let content = formatText(
                  item.stim.content || item.stim,
                ).replace(/\n/g, "<br>");
                html += `<div style="flex: 1; display: flex; flex-direction: column; font-size: 0.9rem; line-height: 1.3;">
                      <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1rem;">${item.sTitle}</strong>
                      <div style="border: 1px solid #cbd5e1; border-radius: 6px; padding-top: 5px; padding-bottom: 5px;  color: #0f172a; flex-grow: 1;">
                        ${content}
                      </div>
                    </div>`;
              });
              html += `</div>`;
            }
            html += `</div>`; // Close the isolated sources page
            html += `<div class="task-box" style="margin-bottom: 10px;   page-break-inside: auto;">`; // Re-open task-box for the remaining questions
          }

          questionsAfter.forEach(renderQuestionItem);
          html += `</div>`;
        }
        html += `</div>`;
      }

    // Full Page Map
    if (lesson.full_page_map) {
        let mapSrc =
          typeof resolveAssetPath === "function"
            ? resolveAssetPath(lesson.full_page_map, 2)
            : `../..${lesson.full_page_map}`;
        html += `<div style="page-break-before: always; height: 95vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;">`;
        html += `<img src="${mapSrc}" style="max-width: 100%; max-height: 95vh; object-fit: contain; margin: auto; display: block;">`;
        html += `</div>`;
      }
allVideos = [];
      if (lesson.video) {
        if (Array.isArray(lesson.video))
          allVideos = allVideos.concat(lesson.video);
        else allVideos.push(lesson.video);
      }
      if (lesson.extra_videos && lesson.extra_videos.length > 0) {
        allVideos = allVideos.concat(lesson.extra_videos);
      }
      if (allVideos.length > 0) {
        appendixData.push({ title: lesson.title, videos: allVideos });
      }
    });

    if (unitId === "cme_new") {
      let allExamTasksHtml = "";
      periodLessons.forEach((lesson) => {
        let hasExamTask =
          lesson.gcse_task ||
          lesson.exam_practice ||
          (lesson.extended && lesson.extended.question);
        if (hasExamTask) {
          allExamTasksHtml += `<div style="margin-bottom: 25px; padding: 15px; border: 1px solid #cbd5e1; border-radius: 8px; background-color: #f8fafc; page-break-inside: avoid;">`;
          allExamTasksHtml += `<h4 style="margin: 0 0 10px 0; color: #1e3a8a; font-size: 13pt;">From ${lesson.title}</h4>`;

          if (lesson.extended && lesson.extended.question) {
            allExamTasksHtml += `<div style="margin-bottom: 10px;"><strong>Q. ${formatText(lesson.extended.question)}</strong></div>`;
          }

          if (lesson.gcse_task) {
            if (lesson.gcse_task.tasks) {
              lesson.gcse_task.tasks.forEach((task) => {
                allExamTasksHtml += `<div style="margin-top: 10px;"><strong>Q${task.qNum ? task.qNum + "." : ""} ${task.text || task.question || task.instruction || task.title || ''}</strong></div>`;
              });
            } else if (lesson.gcse_task.topic) {
              let topicText = lesson.gcse_task.topic || "";
              let tLower = topicText.toLowerCase();
              let isFullQuestion =
                tLower.includes("write a narrative account") ||
                tLower.includes("explain one consequence") ||
                tLower.includes("explain the importance") ||
                tLower.includes("how useful") ||
                tLower.includes("explain why") ||
                tLower.includes("describe");
              if (isFullQuestion) {
                allExamTasksHtml += `<p style="font-weight: bold; margin-bottom: 5px;">${lesson.gcse_task.qNum ? `Q${lesson.gcse_task.qNum}. ` : ""}${topicText}</p>`;
              } else {
                allExamTasksHtml += `<p style="font-weight: bold; margin-bottom: 5px;">${lesson.gcse_task.qNum ? `Q${lesson.gcse_task.qNum}. ` : ""}How useful are Sources A and B for an enquiry into ${topicText}?</p>`;
              }

              if (lesson.gcse_task.sources) {
                lesson.gcse_task.sources.forEach((srcObj, i) => {
                  if (srcObj.type !== "visual") {
                    allExamTasksHtml += `<div style="margin-top: 10px; padding: 10px; border-left: 3px solid #ccc; font-style: italic; font-size: 11pt;"><strong>${srcObj.title}:</strong> ${srcObj.text}</div>`;
                  }
                });
              }
            }
          }

          if (lesson.exam_practice) {
            let epArray = lesson.exam_practice;
            if (
              !Array.isArray(lesson.exam_practice) &&
              lesson.exam_practice.questions
            ) {
              epArray = lesson.exam_practice.questions;
            }
            if (epArray && epArray.length > 0) {
              epArray.forEach((ep, index) => {
                let marksStr = ep.marks ? ` (${ep.marks} marks)` : "";
                if (ep.question.includes("marks)")) marksStr = "";
                if (ep.question.toLowerCase().includes("explain why"))
                  marksStr = "";
                allExamTasksHtml += `<div style="margin-top: 10px;"><strong>${index + 1}. ${formatText(ep.question)}${marksStr}</strong></div>`;
              });
            }
          }

          allExamTasksHtml += `</div>`;
        }
      });

      if (allExamTasksHtml) {
        html += `<div style="page-break-before: always;">
            <h2 style="font-size: 24pt; color: #1e3a8a; text-align: center; border-bottom: 3px solid #1e3a8a; padding-bottom: 10px; margin-bottom: 30px;">GCSE Exam Practice: Question Bank</h2>
            <p style="font-size: 12pt; text-align: center; margin-bottom: 30px; font-style: italic;">Choose an exam question from the bank below and answer it on the blank lined pages that follow.</p>
            ${allExamTasksHtml}
          </div>`;

        for (let p = 0; p < 4; p++) {
          html += `<div style="page-break-before: always; padding-top: 20px;">`;
          html += `<h3 style="margin-top: 0; color: #64748b; margin-bottom: 20px;">Exam Practice Space (Page ${p + 1})</h3>`;
          for (let i = 0; i < 32; i++) {
            html += `<div class="task-lines-large"></div>`;
          }
          html += `</div>`;
        }
      }
    }

    if (unitId === "edexcel_medicine" || unitId === "western_front") {
      html += `
    <div style="page-break-before: always; padding: 20px;">
      <h2 style="text-align: center; font-size: 18pt; margin-bottom: 15px; font-family: 'Playfair Display', serif; color: #1a237e;">Factors Overview: ${periodTitle}</h2>
      <p style="text-align: center; font-size: 12pt; margin-bottom: 15px;">Edexcel focuses heavily on the factors that drove medical progress (or held it back). For each factor below, write one specific historical example from this period that either helped or hindered medical progress.</p>
      <table   style="page-break-inside: avoid; width: 100%; border-collapse: collapse; border: 2px solid #1a237e;">
        <thead>
          <tr style="background-color: #1a237e; color: white;">
            <th style="padding-top: 5px; padding-bottom: 5px; border: 1px solid #ccc; width: 25%; font-size: 12pt;">Factor</th>
            <th style="padding-top: 5px; padding-bottom: 5px; border: 1px solid #ccc; width: 75%; font-size: 12pt;">Specific Historical Example & Impact</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding-top: 5px; padding-bottom: 5px; border: 1px solid #ccc; font-weight: bold; font-size: 12pt;">Individuals</td><td style="padding-top: 5px; padding-bottom: 5px; border: 1px solid #ccc; height: 110px;"></td></tr>
          <tr><td style="padding-top: 5px; padding-bottom: 5px; border: 1px solid #ccc; font-weight: bold; font-size: 12pt;">The Church & Religion</td><td style="padding-top: 5px; padding-bottom: 5px; border: 1px solid #ccc; height: 110px;"></td></tr>
          <tr><td style="padding-top: 5px; padding-bottom: 5px; border: 1px solid #ccc; font-weight: bold; font-size: 12pt;">Government & Wealth</td><td style="padding-top: 5px; padding-bottom: 5px; border: 1px solid #ccc; height: 110px;"></td></tr>
          <tr><td style="padding-top: 5px; padding-bottom: 5px; border: 1px solid #ccc; font-weight: bold; font-size: 12pt;">Science & Technology</td><td style="padding-top: 5px; padding-bottom: 5px; border: 1px solid #ccc; height: 110px;"></td></tr>
          <tr><td style="padding-top: 5px; padding-bottom: 5px; border: 1px solid #ccc; font-weight: bold; font-size: 12pt;">Attitudes in Society</td><td style="padding-top: 5px; padding-bottom: 5px; border: 1px solid #ccc; height: 110px;"></td></tr>
          <tr><td style="padding-top: 5px; padding-bottom: 5px; border: 1px solid #ccc; font-weight: bold; font-size: 12pt;">War</td><td style="padding-top: 5px; padding-bottom: 5px; border: 1px solid #ccc; height: 110px;"></td></tr>
        </tbody>
      </table>
    </div>
    `;
    }

    // QR Code Appendix removed per user request

    const genDate =
      new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC";
    html += `<div style="text-align: center; margin-top: 50px; font-size: 8pt; color: #94a3b8;  border-top: 1px solid #e2e8f0; padding-top: 10px; font-family: sans-serif;">Generated: ${genDate} | Unit: ${unitId}</div>`;
    html += `<script>
  document.addEventListener("DOMContentLoaded", function() {
    if (navigator.userAgent.includes("HeadlessChrome") || navigator.userAgent.includes("Puppeteer")) return;
    function replaceLines(className) {
      const lines = document.querySelectorAll('.' + className);
      if (lines.length === 0) return;
      let group = [];
      lines.forEach((line, i) => {
        group.push(line);
        const next = lines[i + 1];
        if (!next || line.nextElementSibling !== next) {
          const wrapper = document.createElement('textarea');
          wrapper.className = 'interactive-textarea';
          wrapper.style.width = '100%';
          wrapper.style.height = (group.length * line.offsetHeight) + 'px';
          wrapper.style.border = '2px dashed #94a3b8';
          wrapper.style.borderRadius = '6px';
          wrapper.style.padding = '12px';
          wrapper.style.boxSizing = 'border-box';
          wrapper.style.fontFamily = 'Outfit, sans-serif';
          wrapper.style.fontSize = '1.1rem';
          wrapper.style.resize = 'vertical';
          wrapper.style.marginTop = group[0].style.marginTop || '10px';
          wrapper.style.marginBottom = '10px';
          wrapper.style.background = '#f8fafc';
          wrapper.placeholder = 'Type your answer here...';
          group[0].parentNode.insertBefore(wrapper, group[0]);
          group.forEach(l => l.remove());
          group = [];
        }
      });
    }
    // replaceLines('task-lines');
    // replaceLines('task-lines-large');
    document.querySelectorAll('.dirt-box, .hint-box').forEach(b => b.contentEditable = true);
  });
</script></body></html>`;

    html = html.replace(/src="\/units\//g, 'src="../../units/');
    html = html.replace(/src="\/images\//g, 'src="../../images/');
    html = html.replace(/src="\/assets\//g, 'src="../../assets/');

    // Clean up any remaining Key Individual tags globally across the entire HTML string
    html = html.replace(
      /\[Key Individual:\s*([^\]]+)\]/gi,
      "<strong>$1</strong>",
    );

    // Print-specific UX fixes for interactive elements
    html = html.replace(/<button[^>]*>[\s\S]*?<\/button>/gi, ""); // Remove interactive buttons
    html = html.replace(
      /display:\s*none;?/gi,
      "display: block; margin-top: 15px;",
    ); // Stack toggle tabs
    html = html.replace(/(?:using the toggle tabs,?\s*)/gi, ""); // Remove app-only phrasing

    
  // Dynamically inject correct page numbers for ANY manual placeholder references 
  // Syntax: [[PAGE_REF:Marker_Name]] e.g. [[PAGE_REF:L3_Start]]
  html = html.replace(/\[\[PAGE_REF:([a-zA-Z0-9_]+)\]\]/g, (match, marker) => {
    const markerObj = pdfMarkers.find(m => m.marker === marker);
    return markerObj ? markerObj.page : 'XX';
  });

  const filename =
      period.name === "full"
        ? "pupil_workbook.html"
        : `pupil_workbook_${period.name}.html`;
    const outPath = path.join(publicUnitsDir, unitId, filename);
    fs.writeFileSync(outPath, html);
    console.log(`Generated ${outPath}`);
  });
});
