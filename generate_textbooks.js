const fs = require('fs');
const path = require('path');

const publicUnitsDir = path.join(__dirname, 'public', 'units');
const dataParserSrc = fs.readFileSync(path.join(__dirname, 'src', 'data_parser.js'), 'utf8');
const dataParserCode = dataParserSrc.replace(/export /g, '');
eval(dataParserCode);

let examGuideSrc = '';
if (fs.existsSync(path.join(__dirname, 'src', 'exam_guide_content.js'))) {
  examGuideSrc = fs.readFileSync(path.join(__dirname, 'src', 'exam_guide_content.js'), 'utf8');
  const examGuideCode = examGuideSrc.replace(/export const /g, 'global.');
  eval(examGuideCode);
} else {
  global.sectionAGuide = '';
  global.sectionBGuide = '';
}


const formatText = (text) => {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
};

const badgeSource = (title) => {
  if (!title) return '';
  return title.replace(/(Source [A-Z])/i, '<span style="background-color: #1e40af; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 0.9em; letter-spacing: 0.5px; display: inline-block; margin-bottom: 4px;">$1</span>');
};

const ignoredDirs = ['node_modules', 'public', '.git', '.agents', 'dist'];
let allDirs = fs.readdirSync(publicUnitsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && !ignoredDirs.includes(dirent.name))
  .map(dirent => dirent.name);

const targetUnit = process.argv[2];
if (targetUnit && allDirs.includes(targetUnit)) {
  allDirs = [targetUnit];
}

allDirs.forEach(unitId => {
  console.log(`Processing textbooks for unit: ${unitId}`);
  const dataPath = path.join(publicUnitsDir, unitId, 'data.js');
  if (!fs.existsSync(dataPath)) return;

  const dataContent = fs.readFileSync(dataPath, 'utf8');
  let startIndex = dataContent.indexOf('export default {') !== -1 ? dataContent.indexOf('export default {') + 15 : -1;
  if (startIndex === -1) {
    startIndex = dataContent.indexOf('export const unitData = {') !== -1 ? dataContent.indexOf('export const unitData = {') + 24 : -1;
  }
  if (startIndex === -1) {
    startIndex = dataContent.indexOf('const unitData = {') !== -1 ? dataContent.indexOf('const unitData = {') + 17 : -1;
  }
  if (startIndex === -1) {
    startIndex = dataContent.indexOf('export const gwData = {') !== -1 ? dataContent.indexOf('export const gwData = {') + 22 : -1;
  }
  
  if (startIndex === -1) {
    console.log(`Skipping workbook generation for ${unitId} (unsupported data format).`);
    return;
  }
  const endIndex = dataContent.lastIndexOf('}');
  if (endIndex === -1) return;
  
  const jsonStr = dataContent.substring(startIndex, endIndex + 1);
  let unitData;
  try {
    unitData = eval('(function(){ const mock_exams=[]; return ' + jsonStr + ';})()');
  } catch (e) {
    console.error(`Error parsing data.js for ${unitId}:`, e.message);
    return;
  }

  if (!unitData.lessons) return;

  const markersPath = path.join(__dirname, 'scratch', `pdf_markers_${unitId}.json`);
  let pdfMarkers = [];
  if (fs.existsSync(markersPath)) {
    try {
      pdfMarkers = JSON.parse(fs.readFileSync(markersPath, 'utf8'));
    } catch (e) {
      console.error(`Error reading pdf markers for ${unitId}:`, e.message);
    }
  }

  unitData.lessons.forEach((lesson, lIdx) => {
    lesson.globalIndex = lIdx;
    if (typeof sanitizeLessonData === 'function') sanitizeLessonData(lesson);
    
    const startMarker = pdfMarkers.find(m => m.marker === `L${lIdx}_Start`);
    if (startMarker) {
      lesson.startPage = startMarker.page;
    }

    if (lesson.sources) {
      lesson.sources.forEach((source, sIdx) => {
        const markerKey = `L${lIdx}_Source_${sIdx}`;
        const markerObj = pdfMarkers.find(m => m.marker === markerKey);
        if (markerObj) {
          source.page = markerObj.page;
        }
      });
    }
  });

  let workbooksToGenerate = [];
  if (unitData.workbooks && unitData.workbooks.length > 0) {
    workbooksToGenerate = unitData.workbooks.map(wb => ({
      name: wb.id,
      title: wb.title,
      image: wb.image,
      filter: (l) => {
        const prefix = wb.prefix || '';
        return l.title.startsWith(prefix) || (l.id && l.id.startsWith(prefix));
      }
    }));
  } else {
    // Generate one comprehensive workbook for the unit
    workbooksToGenerate = [{
      name: 'full',
      title: unitData.title,
      filter: () => true
    }];
  }

  const htmlHead = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${unitData.title} - Textbook</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,500;1,600&display=swap" rel="stylesheet">
  <style>
      @page { @bottom-center { content: "Page " counter(page); font-family: sans-serif; font-size: 10pt; color: #666; } }
    @page { size: A4 portrait; margin: 15mm 15mm 25mm 15mm; }
    body { font-family: 'Inter', sans-serif; font-size: 10pt; line-height: 1.3; color: #1e293b;  }
    h1 { font-family: 'Playfair Display', serif; font-size: 30pt; text-align: center; margin-top: 60px; color: #0f172a; text-transform: uppercase; letter-spacing: 1px; }
    h2 { font-family: 'Playfair Display', serif; font-size: 18pt; color: #1e3a8a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-top: 15px; page-break-after: auto; }
    h4 { font-size: 11pt; color: #334155; margin-top: 10px; font-weight: 600; page-break-after: avoid; }
    h3 { font-size: 13pt; color: #334155; margin-top: 10px; font-weight: 600; page-break-after: auto; }
    .narrative-block { margin-bottom: 10pt; text-align: justify; orphans: 3; widows: 3; color: #334155; }
    .task-box { background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 10px; border-radius: 8px; margin-top: 10px; margin-bottom: 10px; width: 100%; page-break-inside: auto; box-sizing: border-box; }
    .task-lines { border-bottom: 1px solid #94a3b8; height: 16px; margin-top: 5px; }
    .task-lines-large { border-bottom: 1px solid #94a3b8; height: 16px; margin-top: 5px; }
    .do-now-box { border-top: 2px solid #e2e8f0; padding-top: 10px; margin-top: 10px; margin-bottom: 10px; width: 100%; page-break-inside: auto; }
    .do-now-q { font-weight: 600; margin-bottom: 8px; color: #0f172a; }
    .source-container { border-top: 2px solid #e2e8f0; padding-top: 10px; margin-top: 10px; margin-bottom: 10px; text-align: center; page-break-inside: auto; }
    .source-container img { max-height: 250px !important; object-fit: contain !important; display: block; margin: 0 auto; }
    .source-caption { font-size: 9.5pt; color: #64748b; font-style: italic; margin-top: 10px; text-align: center; }
    .cover-image { width: 100%; max-width: 600px; height: auto; margin: 40px auto; display: block; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; }
    .watermark { position: fixed; bottom: 10px; right: 10px; font-size: 8pt; color: #94a3b8; opacity: 0.6; font-family: 'Inter', sans-serif; }
    table { width: 100%; border-collapse: separate; border-spacing: 0; border-radius: 8px; overflow: hidden; border: 1px solid #cbd5e1; }
    th {  color: white; padding-top: 12px; padding-bottom: 12px; font-weight: 600; text-align: left; border-right: 1px solid #3b82f6; }
    td { border-bottom: 1px solid #cbd5e1; border-right: 1px solid #cbd5e1; padding-top: 10px; padding-bottom: 10px; }
    tr:last-child td { border-bottom: none; }
    td:last-child, th:last-child { border-right: none; }
    tbody tr:nth-child(even) {  }
    .grading-footer { margin-top: 30px; padding-top: 15px; font-size: 9.5pt; color: #555; display: flex; flex-direction: column; gap: 8px; border-top: 1px solid #ccc; page-break-inside: auto; }
    .grading-boxes { display: flex; justify-content: space-between; }
    .grade-box { display: flex; align-items: center; gap: 5px; }
    .grade-box input[type="checkbox"] { -webkit-appearance: none; appearance: none; width: 12px; height: 12px; border: 1px solid #777; border-radius: 2px;  }
    .teacher-comment { border-bottom: 1px solid #777; width: 100%; height: 20px; display: inline-block; margin-top: 5px; }
    @media print { body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } * { box-shadow: none !important; border-radius: 0 !important; }
        img:not([src$=".svg"]) { max-width: 100% !important; object-fit: contain !important;  }
        .source-container { page-break-inside: auto; }
        .narrative-block { page-break-inside: auto; }
        .task-box { page-break-inside: auto; }
        h1, h2, h3, h4, h5, h6 { page-break-after: auto; }
        div[style*="display: none"] { display: block !important; }
        button[onclick*="display='none'"] { display: none !important; }
      }
      img:not([src$=".svg"]) { max-width: 100% !important; object-fit: contain !important;  }
      .source-container {  }
    }
</style>
</head>
<body>
`;

  workbooksToGenerate.forEach(period => {
    let html = htmlHead;
    const periodLessons = unitData.lessons.filter(period.filter);
    if (periodLessons.length === 0) return;
    const periodTitle = period.title;
    const periodName = period.name;

    let appendixData = [];

    let trackerRows = '';
    periodLessons.forEach((l, i) => {
      let maxScore = 5;
      if (l.do_now && l.do_now.items) maxScore = l.do_now.items.length;
      
      const isGeography = l.title && l.title.includes('Geography of the Middle East');
      
      if (isGeography) {
        trackerRows += `<tr style="background-color: #f1f5f9;"><td style="border:1px solid #333; padding:6px; font-weight:bold;">L${i+1}: ${l.title}</td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td></tr>`;
      } else {
        trackerRows += `<tr style="background-color: #f1f5f9;"><td style="border:1px solid #333; padding:6px; font-weight:bold;">L${i+1}: ${l.title}</td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td></tr>`;
      }
    });

    if (unitData.assessments) {
      unitData.assessments.forEach(a => {
        trackerRows += `<tr style="height: 50px;"><td style="border:1px solid #333; padding:12px 6px; font-weight:bold; background:#e2e8f0;">Assessment: ${a.title}</td><td style="border:1px solid #333; padding:12px 6px;"></td><td style="border:1px solid #333; padding:12px 6px;"></td><td style="border:1px solid #333; padding:12px 6px;"></td></tr>`;
      });
    }

    let bannerImageSrc = period.image || unitData.cover_image || '/assets/water_and_sanitation_was_roman_bathhouse.png';
    if (bannerImageSrc) {
      bannerImageSrc = typeof resolveAssetPath === 'function' ? resolveAssetPath(bannerImageSrc, 2) : `../..${bannerImageSrc.startsWith('/') ? bannerImageSrc : '/' + bannerImageSrc}`;
    }

    html += `
    <div class="cover-page" style="page-break-after: always; text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 40px; height: 95vh; box-sizing: border-box; overflow: hidden; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border: 8px solid #1e3a8a; border-radius: 20px;">
      <h1 style="font-size: 42pt; margin-bottom: 20px; color: #1e3a8a; font-weight: 800; letter-spacing: -1px; text-transform: uppercase;">${periodTitle}</h1>
      ${(periodTitle || '').trim().toLowerCase() !== (unitData.title || '').trim().toLowerCase() ? `<h2 style="font-size: 20pt; margin-bottom: 40px; color: #334155; font-weight: 600; border: none;">${unitData.title}</h2>` : '<div style="margin-bottom: 40px;"></div>'}
      
      <div style="margin-top: 15px; width: 100%; max-width: 700px; text-align: center; padding: 30px; border: 1px solid #cbd5e1; border-radius: 16px; background-color: #ffffff; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
        <h3 style="margin-top: 0; color: #1e3a8a; margin-bottom: 15px; font-size: 22pt; text-transform: uppercase; letter-spacing: 1px;"><i class="fa-solid fa-book-open"></i> Course Textbook & Textbook</h3>
        ${unitData.enquiry ? `<p style="font-size: 14pt; color: #475569; font-style: italic; line-height: 1.5; margin-bottom: 0;"><strong>Enquiry:</strong> ${unitData.enquiry}</p>` : ''}
      </div>
    </div>
    
    <div style="margin-top: 25px; padding: 25px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
      <h2 style="margin-top: 0; font-family: 'Playfair Display', serif; color: #1e3a8a; font-size: 22pt; border-bottom: 2px solid #93c5fd; padding-bottom: 10px; text-align: center;">Contents</h2>
      <table style="width: 100%; border: none; margin-top: 15px;">
        <tbody>
          ${periodLessons.map((l, i) => `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px dashed #cbd5e1; font-size: 13pt; color: #334155; font-weight: 500; width: 85%;">
                Lesson ${i + 1}: ${l.title.replace(/Lesson \d+:\s*/i, '')}
              </td>
              <td style="padding: 10px 0; border-bottom: 1px dashed #cbd5e1; font-size: 13pt; color: #1e3a8a; font-weight: bold; text-align: right; width: 15%;">
                ${l.startPage ? `Page ${l.startPage}` : ''}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    <div style="page-break-after: always;"></div>
    `;

  periodLessons.forEach((lesson, lessonIndex) => {
    let globalQNum = 1;
    if (lesson.primary_source && lesson.primary_source.question) lesson.primary_source.qNum = globalQNum++;
    if (lesson.sources) lesson.sources.forEach(source => { if (source.question) source.qNum = globalQNum++; });
    if (lesson.narrative_blocks) lesson.narrative_blocks.forEach(block => { if (block.tasks) block.tasks.forEach(task => {
              if (unitId === 'great_war' || unitId === 'great_war_part2') {
                if (typeof task.text === 'string') task.text = task.text.replace(/^Task\s*\d*:\s*/i, '');
                if (typeof task.question === 'string') task.question = task.question.replace(/^Task\s*\d*:\s*/i, '');
              } if (task.type !== 'vocab_match') task.qNum = globalQNum++; }); if (block.hinge_question) block.hinge_question.qNum = globalQNum++; });
    if (lesson.historians_corner && lesson.historians_corner.stretch_question) lesson.historians_corner.qNum = globalQNum++;
    if (lesson.pair_share) lesson.pair_share.qNum = globalQNum++;
    if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = globalQNum++);
    if (lesson.extended && lesson.extended.question) lesson.extended.qNum = globalQNum++;
    if (lesson.gcse_task) lesson.gcse_task.qNum = globalQNum++;
    
    html += `<h2 style="margin-top: 40px; border-top: 3px solid #1e3a8a; padding-top: 20px; margin-bottom: 5px; page-break-before: auto; page-break-after: auto;">L${lessonIndex + 1}: ${formatText(lesson.title)}<span style="color: #ffffff; font-size: 4px;">[[SRC_MARKER:L${lesson.globalIndex}_Start]]</span></h2>`;
    html += `<div style="margin-bottom: 10px;"></div>`;
    
    if (lesson.a4_map) {
      if (Array.isArray(lesson.a4_map)) {
        lesson.a4_map.forEach(img => {
          let mapPath = typeof resolveAssetPath === 'function' ? resolveAssetPath(img, 2) : `../..${img.startsWith('/') ? img : '/' + img}`;
          html += `<div style="page-break-after: always; width: 100%; height: 85vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">`;
          html += `<img src="${mapPath}" style="max-width: 100%; max-height: 100%; object-fit: contain;  padding: 5px; box-sizing: border-box;">`;
          html += `</div>`;
        });
      } else {
        let mapPath = typeof resolveAssetPath === 'function' ? resolveAssetPath(lesson.a4_map, 2) : `../..${lesson.a4_map.startsWith('/') ? lesson.a4_map : '/' + lesson.a4_map}`;
        html += `<div style="page-break-after: always; width: 100%; height: 85vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">`;
        html += `<img src="${mapPath}" style="max-width: 100%; max-height: 100%; object-fit: contain;  padding: 5px; box-sizing: border-box;">`;
        html += `</div>`;
      }
    }

    if (lesson.teacher_notes && lesson.teacher_notes.objectives && lesson.teacher_notes.objectives.length > 0) {
      html += `<div style="margin-bottom: 15px; padding-top: 10px; padding-bottom: 10px; border: 1px solid #cbd5e1; border-radius: 8px;  ">`;
      html += `<h4 style="margin: 0 0 8px 0; color: #1e3a8a; font-size: 10pt; text-transform: uppercase;">Learning Objectives</h4>`;
      lesson.teacher_notes.objectives.forEach(obj => {
        html += `<div style="display: flex; align-items: flex-start; margin-bottom: 4px;">`;
        html += `<div style="width: 12px; height: 12px; border: 1.5px solid #64748b; border-radius: 2px; margin-right: 8px; margin-top: 2px; flex-shrink: 0; "></div>`;
        html += `<div style="font-size: 9.5pt; color: #334155; line-height: 1.2;">${formatText(obj.objective)}</div>`;
        html += `</div>`;
      });
      html += `</div>`;
    }

    if (lesson.hook_text) {
      html += `<p style="font-size: 12pt; font-style: italic;  padding-top: 10px; padding-bottom: 10px; border-left: 4px solid #3b82f6; margin-bottom: 10px;">${lesson.hook_text}</p>`;
    }

    if (lesson.fun_facts && lesson.fun_facts.length > 0) {
      html += `<div style=" border: 1px solid #fcd34d; padding-top: 10px; padding-bottom: 10px; margin-bottom: 10px; border-radius: 4px;">`;
      html += `<h4 style="margin: 0 0 5px 0; color: #b45309; font-size: 12pt;">Did you know?</h4>`;
      html += `<ul style="margin: 0; padding-left: 20px; font-size: 12pt; color: #92400e;">`;
      lesson.fun_facts.forEach(fact => {
        html += `<li style="margin-bottom: 5px;">${fact}</li>`;
      });
      html += `</ul></div>`;
    }

    // Primary Source
    if (lesson.primary_source) {
      let srcs = Array.isArray(lesson.primary_source.src) ? lesson.primary_source.src : [lesson.primary_source.src];
      let renderImages = true;
      if (lesson.a4_map && lesson.primary_source.src) {
        let a4Str = JSON.stringify(lesson.a4_map);
        let srcStr = JSON.stringify(lesson.primary_source.src);
        if (a4Str === srcStr || lesson.a4_map === lesson.primary_source.src) renderImages = false;
      }

      let imgTags = '';
      if (renderImages) {
          imgTags = srcs.map(src => {
            let resolved = typeof resolveAssetPath === 'function' ? resolveAssetPath(src, 2) : `../..${src.startsWith('/') ? src : '/' + src}`;
            const style = lesson.primary_source.custom_style || (srcs.length > 1 ? 'max-width: 48%; max-height: 250px; object-fit: contain;  border-radius: 4px; box-shadow: 2px 2px 5px rgba(0,0,0,0.1);' : 'max-width: 100%; max-height: 250px; object-fit: contain;  border-radius: 4px; box-shadow: 2px 2px 5px rgba(0,0,0,0.1);');
            return `<img src="${resolved}" alt="Primary Source" style="${style}">`;
          }).join(' ');
      }

      html += `
        <div class="source-container" style=" margin-bottom: 0px; padding-top: 0px; border-top: none;">
          ${lesson.primary_source.title ? `<strong>${badgeSource(lesson.primary_source.title)}</strong><br>` : ''}
          <div style="display: flex; justify-content: center; gap: 10px; margin: 10px 0;">${imgTags}</div>
          ${lesson.primary_source.caption ? `<div class="source-caption">${lesson.primary_source.caption}</div>` : ''}
          ${lesson.primary_source.question ? `<div style="margin-top: 15px; text-align: left;"><strong>Q${lesson.primary_source.qNum}. ${lesson.primary_source.question.replace('Enquiry: ', '')}${lesson.primary_source.page ? ` (See Textbook Page ${lesson.primary_source.page})` : ''}</strong></div>` : ''}
          
        </div>
      `;
    }

    
    
    // Do Now
    html += `<div>`;
    if (lesson.do_now) {
      if (lesson.do_now.type === "timeline") {
        html += `<div class="do-now-box" style="padding: 5px; margin-bottom: 5px;">
                   <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 5px;">
                     <h3 style="margin: 0; font-size: 11pt;">Chronological Domino Flowchart</h3>
                   </div>
                   <p style="font-style: italic; color: #555; margin-top: 0; font-size: 9.5pt; margin-bottom: 5px;"><strong>Task:</strong> The historical events below are out of order. Read them carefully, then use your pen to <strong>draw arrows connecting the boxes</strong> in the correct chronological and causal order (Event A ➔ Event B ➔ Event C...).</p>
                   <div style="display: flex; flex-wrap: wrap; justify-content: space-between; margin-top: 5px;">`;
                   
        let shuffledEvents = [...(lesson.do_now.events || [])];
        for (let i = shuffledEvents.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledEvents[i], shuffledEvents[j]] = [shuffledEvents[j], shuffledEvents[i]];
        }
        
        shuffledEvents.forEach((ev, idx) => {
          const margins = ["margin-top: 5px;", "margin-top: 20px;", "margin-bottom: 5px;", "margin-top: 0px;"];
          const m = margins[idx % margins.length];
          html += `<div style="width: 45%;  padding: 5px; box-sizing: border-box;  ${m} box-shadow: 2px 2px 0px #aaa;">
                      <strong style="font-size: 9.5pt;">${ev.year || ''}</strong><br>
                      <strong style="font-size: 9.5pt;">${ev.title || ''}</strong><br>
                      <span style="font-size: 9pt;">${ev.detail || ''}</span>
                   </div>`;
        });
        html += `</div><div style="clear: both; margin-bottom: 5px;"></div>`;

        if (lesson.do_now.prediction_question) {
          html += `<div class="do-now-q" style="margin-top: 5px; font-size: 9.5pt;"><strong>1. ${lesson.do_now.prediction_question}</strong></div>`;
        }
        html += `</div>`;
      } else if (lesson.do_now.type === "text") {
        html += `<div class="do-now-box" style="padding: 5px; margin-bottom: 5px;">
                   <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 5px;">
                     <h3 style="margin: 0; font-size: 11pt;">${lesson.do_now.title || "Do Now Activity"}</h3>
                   </div>`;
        html += `<div class="do-now-q" style="font-size: 9.5pt; margin-bottom: 4px;"><strong>${lesson.do_now.text}</strong></div>`;
        html += `</div>`;
      } else if (lesson.do_now.type === "questions" || lesson.do_now.type === "retrieval" || (!lesson.do_now.type && (lesson.do_now.items || lesson.do_now.questions))) {
        let items = lesson.do_now.items || lesson.do_now.questions;
        html += `<div class="do-now-box" style="padding: 5px; margin-bottom: 5px;">
                   <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 5px;">
                     <h3 style="margin: 0; font-size: 11pt;">Do Now Activity</h3>
                   </div>`;
        if (items) {
          items.forEach((item, index) => {
            html += `<div class="do-now-q" style="font-size: 9.5pt; margin-bottom: 4px;"><strong>${index + 1}.</strong> ${item.question}</div>`;
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
      vocabTerms = Object.keys(lesson.glossary).map(k => ({ term: k, definition: lesson.glossary[k] }));
    }
    if (vocabTerms && vocabTerms.length > 0) {
      let vocabStyle = lessonIndex % 3;
      html += `<div class="task-box" style="margin-bottom: 0px; padding: 5px;">`;
      html += `<h3 style="margin-top: 0; margin-bottom: 5px; font-size: 11pt;">Vocabulary Check</h3>`;
      
      if (vocabStyle === 0) {
        if (lesson.vocab_cloze_text) {

           html += `<p style="font-style: italic; font-size: 9.5pt; margin: 2px 0 5px 0;">Fill in the blanks using the vocabulary words below.</p>`;
           let words = vocabTerms.map(v => v.term).join(' &nbsp;|&nbsp; ');
           html += `<div style="border: 1px solid #ccc; padding: 4px; margin-bottom: 5px; text-align: center; font-weight: bold; font-size: 9.5pt;">${words}</div>`;
           let cloze = lesson.vocab_cloze_text.replace(/\[.*?\]/g, '__________________');
           html += `<p style="line-height: 1.6; font-size: 9.5pt; margin: 5px 0;">${cloze}</p>`;
        } else {

           html += `<p style="font-style: italic; font-size: 9.5pt; margin: 2px 0 5px 0;">Write a short paragraph using at least FOUR of the vocabulary words below correctly.</p>`;
           let words = vocabTerms.map(v => v.term).join(' &nbsp;|&nbsp; ');
           html += `<div style="border: 1px solid #ccc; padding: 4px; margin-bottom: 5px; text-align: center; font-weight: bold; font-size: 9.5pt;">${words}</div>`;
           for(let i=0; i<4; i++) { html += ``; }
        }
      } else if (vocabStyle === 1) {

        html += `<p style="font-style: italic; font-size: 9.5pt; margin: 2px 0 5px 0;">Write a historically accurate sentence connecting two terms from the glossary box below.</p>`;
        let words = vocabTerms.map(v => v.term).join(' &nbsp;|&nbsp; ');
        html += `<div style="border: 1px solid #ccc; padding: 4px; margin-bottom: 5px; text-align: center; font-weight: bold; font-size: 9.5pt;">${words}</div>`;
        html += `<strong style="font-size: 9.5pt;">Your Sentence:</strong>`;
      } else if (vocabStyle === 2) {

        let focusWord = vocabTerms[0].term;
        html += `<p style="font-style: italic; font-size: 9.5pt; margin: 2px 0 5px 0;">Write a clear definition and a historically accurate sentence for the term: <strong>${focusWord}</strong></p>`;
        html += `
          
        `;
      }
      html += `</div>`;
    }

    
    html += `</div>`;
    
    html += `</div>`;

    // Sources
    let isGCSE = (unitId === 'weimar_nazi_germany' || unitId === 'cme_new');
    if (lesson.sources && lesson.sources.length > 0 && !isGCSE) {
      html += `<div style="page-break-inside: auto; margin-bottom: 15px;">`;
      lesson.sources.forEach((source, sIdx) => {
        let sourceContent = source.content || source.text;
        if(source.src || source.caption || sourceContent) {
          html += `
            <div class="source-container" style="">
              <span style="color: #ffffff; font-size: 4px;">[[SRC_MARKER:L${lesson.globalIndex}_Source_${sIdx}]]</span>
              ${source.title ? `<strong>${badgeSource(source.title)}</strong><br>` : ''}
              ${source.src ? `<img src="${typeof resolveAssetPath === 'function' ? resolveAssetPath(source.src, 2) : source.src}" alt="Source">` : ''}
              ${sourceContent ? `<blockquote style="text-align: left; font-size: 11pt; margin-top: 10px;">${formatText(sourceContent)}</blockquote>` : ''}
              ${source.caption ? `<div class="source-caption">${source.caption}</div>` : ''}
              ${source.question ? `<div style="margin-top: 15px; text-align: left;"><strong>Q${source.qNum ? source.qNum + '.' : ''} ${source.question}${source.page ? ` (See Textbook Page ${source.page})` : ''}</strong></div>` : ''}
            </div>
          `;
        }
      });
      html += `</div>`;
    }

    
    
    // Narrative Blocks & Tasks
    if (lesson.narrative_blocks) {
      lesson.narrative_blocks.forEach((block, bIdx) => {
        // Support for new 'images' array schema
        if (block.images && Array.isArray(block.images)) {
          block.images.forEach(imgObj => {
            let rawSrc = imgObj.src || imgObj.image;
            if (rawSrc) {
              let src = typeof resolveAssetPath === 'function' ? resolveAssetPath(rawSrc, 2) : rawSrc;
              if (src.toLowerCase().endsWith('.svg')) {
                  html += `<img src="${src}" style="width: 85%; max-width: 650px; height: auto; display:block; margin: 25px auto 5px auto; border-radius: 8px; border: 1.5px solid #475569; padding-top: 10px; padding-bottom: 10px; ">`;
              } else {
                  html += `<img src="${src}" style="max-width:100%; max-height: 250px; display:block; margin: 15px auto 5px auto; border-radius: 6px; border: 1px solid #ccc;">`;
              }
              if (imgObj.image_caption || imgObj.image_alt) {
                  let caption = imgObj.image_caption || imgObj.image_alt;
                  html += `<div style="text-align: center; font-size: 10pt; font-style: italic; color: #555; margin-bottom: 15px;">${imgObj.source_letter ? `<strong>Source ${imgObj.source_letter}:</strong> ` : ''}${caption}</div>`;
              }
            }
          });
        }
        
        if (block.source) {
          let sIdx = lesson.sources ? lesson.sources.length + bIdx : bIdx;
          html += `
            <div class="source-container" style="page-break-inside: avoid; margin-bottom: 15px; margin-top: 15px; border-left: 3px solid #ccc; padding-left: 15px;">
              <span style="color: #ffffff; font-size: 4px;">[[SRC_MARKER:L${lesson.globalIndex}_Source_${sIdx}]]</span>
              ${block.source.title ? `<strong>${badgeSource ? badgeSource(block.source.title) : block.source.title}</strong><br>` : ''}
              ${block.source.src ? `<img src="${typeof resolveAssetPath === 'function' ? resolveAssetPath(block.source.src, 2) : block.source.src}" alt="Source" style="max-width: 100%; max-height: 250px;">` : ''}
              ${block.source.content ? `<blockquote style="text-align: left; font-size: 11pt; margin-top: 10px; font-style: italic;">${typeof formatText === 'function' ? formatText(block.source.content) : block.source.content}</blockquote>` : ''}
              ${block.source.caption ? `<div class="source-caption">${block.source.caption}</div>` : ''}
              ${block.source.question ? `<div style="margin-top: 15px; text-align: left;"><strong>Q${block.source.qNum ? block.source.qNum + '.' : ''} ${block.source.question}${block.source.page ? ` (See Textbook Page ${block.source.page})` : ''}</strong></div>` : ''}
            </div>
          `;
        }

        // Legacy support for single 'image' string
        if (block.image && (!block.images || block.images.length === 0)) {
          let src = typeof resolveAssetPath === 'function' ? resolveAssetPath(block.image, 2) : block.image;
          if (src.toLowerCase().endsWith('.svg')) {
              html += `<img src="${src}" style="width: 85%; max-width: 650px; height: auto; display:block; margin: 25px auto 5px auto; border-radius: 8px; border: 1.5px solid #475569; padding-top: 10px; padding-bottom: 10px; ">`;
          } else {
              html += `<img src="${src}" style="max-width:100%; max-height: 250px; display:block; margin: 15px auto 5px auto; border-radius: 6px; border: 1px solid #ccc;">`;
          }
          if (block.image_alt) {
              html += `<div style="text-align: center; font-size: 10pt; font-style: italic; color: #555; margin-bottom: 15px;">${block.source_letter ? `<strong>Source ${block.source_letter}:</strong> ` : ''}${block.image_alt}</div>`;
          }
        }
        
        let textToRender = block.text || '';
        const kiRegex = /\[Key Individual:\s*([^\]]+)\]/ig;
        textToRender = textToRender.replace(kiRegex, (match, p1) => {
           return `<strong>${p1.trim()}</strong>`;
        });
        
        let finalRenderedText = formatText(textToRender);
        finalRenderedText = finalRenderedText.replace(/<details[^>]*>/gi, '<div class="side-quest-box" style="border-top: 2px solid #e2e8f0; padding-top: 15px; margin: 15px 0; page-break-inside: auto;">');
        let isSideQuest = finalRenderedText.includes('<details class="side-quest-box"');
        finalRenderedText = finalRenderedText.replace(/<\/details>/gi, '</div>'); // Close side-quest-box properly
        finalRenderedText = finalRenderedText.replace(/<summary[^>]*>(.*?)<\/summary>/gi, '<h3 style="color: #334155; margin-top: 0; font-size: 14pt; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px dashed #94a3b8; padding-bottom: 8px; display: flex; align-items: center; gap: 10px; page-break-after: avoid; break-after: avoid;">$1</h3>');
        
        let hasContent = finalRenderedText.trim() !== '' || block.hinge_question || (block.tasks && block.tasks.length > 0) || block.extended;
        if (hasContent) {
          html += `<div class="narrative-block" id="para-${bIdx+1}">`;
          if (finalRenderedText.trim() !== '') {
            html += finalRenderedText;
          }
          
          if (block.hinge_question) {
            html += `<div class="task-box" style=" ">`;
            html += `<p style="margin-top:0px; margin-bottom: 10px; color: #475569; font-size: 0.9em; text-transform: uppercase;"><strong>Knowledge Check (Q${block.hinge_question.qNum})</strong></p>`;
            html += `<p style="margin-bottom: 15px;"><strong>${block.hinge_question.text || block.hinge_question.question}</strong></p>`;
            html += `<ul style="list-style-type: none; padding-left: 0; margin-bottom: 0;">`;
            block.hinge_question.options.forEach((opt, idx) => {
              html += `<li style="margin-bottom: 8px;"><div style="display: inline-block; width: 16px; height: 16px; border: 1px solid #333; margin-right: 10px; border-radius: 3px; position: relative; top: 3px;"></div>${String.fromCharCode(65+idx)}. ${opt}</li>`;
            });
            html += `</ul></div>`;
          }
          
          if (block.extended && block.extended.question) {
            html += `<div class="task-box" style="margin-bottom: 20px;">`;
            html += `<p style="font-weight: 700; margin-bottom: 12px; font-size: 1.1rem; color: #0f172a;">${block.extended.question}</p>`;
            if (block.extended.scaffolding && block.extended.scaffolding.length > 0) {
              html += `<div style="margin-top: 15px; padding: 10px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 6px;"><strong style="color: #d97706;">Hints:</strong><ul style="margin: 5px 0 0 0; color: #92400e;">`;
              block.extended.scaffolding.forEach(hint => {
                html += `<li>${formatText(hint)}</li>`;
              });
              html += `</ul></div>`;
            }
            html += `<div style="min-height: 200px;">`;
            const lineCount = block.extended.lines || 8;
            for(let i=0; i<lineCount; i++) {
              html += ``;
            }
            html += `</div></div>`;
          }
          
          if (block.tasks) {
            html += `<div class="task-box">`;
            block.tasks.forEach((task, tIdx) => {
              if (task.type === 'draw') {
                 html += `<div class="draw-task" style="display:none;"><span style="color: #ffffff; font-size: 4px;">[[SRC_MARKER:L${lesson.globalIndex}_Task_${bIdx}_${tIdx}]]</span>Q${task.qNum}: ${task.text || task.question}</div>`;
              } else {
                 if (task.type === 'vocab_match' || ((unitId === 'great_war' || unitId === 'great_war_part2') && task.type === 'drag_drop_timeline')) {
                    // Do nothing
                  } else {
                    html += `<p style="margin-top:10px;"><span style="color: #ffffff; font-size: 4px;">[[SRC_MARKER:L${lesson.globalIndex}_Task_${bIdx}_${tIdx}]]</span><strong>Q${task.qNum}. ${task.text || task.question}</strong></p>`;
                  }
                 let linesToDraw = 3;
                 let tText = (task.text || task.question || '').toLowerCase();
                 if (task.type === 'analysis' || task.type === 'debate' || tText.includes('explain') || tText.includes('describe') || tText.includes('two ') || tText.length > 60) {
                    linesToDraw = 6;
                 }
                 for(let i=0; i<linesToDraw; i++) {
                    html += ``;
                 }
              }
            });
            html += `</div>`;
          }
          html += `</div>`; // Close narrative-block div
        }
      });
    }

    // Extended Scholarship
    if (lesson.extended && lesson.extended.paragraphs) {
      html += `<h3 style="margin-top: 40px; page-break-before: auto;">${lesson.extended.title}</h3>`;
      lesson.extended.paragraphs.forEach(para => {
        html += `<p class="narrative-block" style="font-size: 12pt; color: #444;">${formatText(para)}</p>`;
      });
    }

    // Narrative
    if (lesson.narrative) {
      lesson.narrative.forEach((block, idx) => {
        html += `<p class="narrative-block"><strong style="color:#000;">${idx + 1}.</strong> ${formatText(block.text)}</p>`;
      });
    }

    // Pair Share
    if (lesson.historians_corner) {
      html += `<div class="task-box" style=" ">`;
      html += `<h3 style="margin-top: 0;">Historian's Corner: ${lesson.historians_corner.title}</h3>`;
      html += `<p style="font-size: 12pt; font-style: italic;">${formatText(lesson.historians_corner.text)}</p>`;
      if (lesson.historians_corner.stretch_question) {
        html += `<div style="margin-top: 15px; font-weight: bold;">Q${lesson.historians_corner.qNum}. ${lesson.historians_corner.stretch_question}</div>`;
      }
      html += `</div>`;
    }

    if (lesson.pair_share) {
      html += `<div class="task-box" style="page-break-inside: avoid; margin-bottom: 15px;">`;
      html += `<h3 style="margin-top: 0; color: #1e3a8a;">Pair & Share Activity</h3>`;
      html += `<p style="font-weight: bold; margin-bottom: 10px;">Q${lesson.pair_share.qNum}. ${lesson.pair_share.prompt}</p>`;
      html += `</div>`;
    }

    if (lesson.tasks) {
      html += `<h3 style="margin-top: 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px; page-break-after: avoid; break-after: avoid;">Active Tasks</h3>`;
      lesson.tasks.forEach((task, tIdx) => {
        if (task.type === 'spectrum_mapper') {
             // html += `<div style="page-break-before: always;"></div>`;
             html += `<h2 style="text-align: center; margin-bottom: 30px;">${task.text || 'Spectrum Planner'}</h2>`;
             
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
             task.items.forEach(item => {
                 html += `<div style=" padding: 15px; width: 45%; border-radius: 8px;">`;
                 html += `<strong>${item.title}</strong><br>`;
                 if (item.desc) html += `<span style="font-size: 0.9em; color: #555;">${item.desc}</span>`;
                 html += `</div>`;
             });
             html += `</div>`;

             html += `<h3>Notes & Paragraph Plan</h3>`;
             for(let i=0; i<15; i++) {
                html += ``;
             }
             return;
        }

        let qText = task.question || task.text || '';
        html += `<div class="task-box" style="page-break-inside: auto;">`;
        
        let match = qText.match(/^([A-Za-z0-9'\-\/ ]+):\s*(.*)/);
        if (match) {
            let subhead = match[1];
            let rest = match[2];
            html += `<h4 style="margin-top: 0; color: #0284c7; margin-bottom: 8px; font-size: 1.1em;">${subhead}</h4>`;
            html += `<p style="font-weight: bold; margin-top: 0;">Q${task.qNum || (tIdx + 1)}. ${rest}</p>`;
        } else {
            html += `<p style="font-weight: bold; margin-top: 0;">Q${task.qNum || (tIdx + 1)}. ${qText}</p>`;
        }
        let hasExamTaskLater = lesson.gcse_task || lesson.exam_practice || (lesson.extended && lesson.extended.question);
        let numLines = (!hasExamTaskLater && tIdx === lesson.tasks.length - 1) ? 20 : 6;
        for(let i=0; i<numLines; i++) {
            html += ``;
        }
        html += `</div>`;
      });
    }

    let hasExamTask = lesson.gcse_task || lesson.exam_practice || (lesson.extended && lesson.extended.question);
    if (hasExamTask) {
      html += `<div style="page-break-inside: auto; margin-top: 20px;">`;
      // let examTitle = (lesson.extended && lesson.extended.title) ? lesson.extended.title : 'GCSE Exam Practice';
      // html += `<h2 style="margin-top: 0; color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 5px;">${examTitle}</h2>`;

      const renderLines = (text) => {
          if (text.includes("16 marks")) {
              for(let i=0; i<42; i++) { html += ``; }
          } else if (text.includes("12 marks") || text.includes("Explain why")) {
              for(let i=0; i<22; i++) { html += ``; }
          } else if (text.includes("8 marks")) {
              for(let i=0; i<19; i++) { html += ``; }
          } else if (text.includes("2 marks")) {
              for(let i=0; i<3; i++) { html += ``; }
          } else if (text.includes("4 marks") || text.includes("Explain one way") || text.includes("Explain one consequence")) {
              for(let i=0; i<4; i++) { html += ``; }
          } else {
              for(let i=0; i<8; i++) { html += ``; }
          }
      };

      if (lesson.extended && lesson.extended.question) {
          if (lesson.extended.source_a || lesson.extended.source_b) {
              html += `<div style="display: flex; gap: 20px; margin-top: 15px; margin-bottom: 10px; ">`;
              if (lesson.extended.source_a) {
                const prov = typeof lesson.extended.source_a === 'string' ? '' : lesson.extended.source_a.provenance;
                const content = typeof lesson.extended.source_a === 'string' ? lesson.extended.source_a : lesson.extended.source_a.content;
                const isImageA = content.toLowerCase().endsWith('.png') || content.toLowerCase().endsWith('.jpg');
                const renderedA = isImageA ? `<img src="${typeof resolveAssetPath === 'function' ? resolveAssetPath(content, 2) : `../..${content.startsWith('/') ? content : '/' + content}`}" style="max-width: 100%; max-height: 400px; object-fit: contain; margin: 0 auto; display: block;">` : content.replace(/\n/g, '<br>');
                html += `<div style="flex: 1; display: flex; flex-direction: column; font-size: 0.95rem; line-height: 1.5;">
                  <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source A</strong>
                  ${prov ? `<span style="color: #334155; display: block; margin-bottom: 15px; font-style: italic;">${prov}</span>` : ''}
                  <div style="border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px;  color: #0f172a; flex-grow: 1;">
                    ${renderedA}
                  </div>
                </div>`;
              }
              if (lesson.extended.source_b) {
                const prov = typeof lesson.extended.source_b === 'string' ? '' : lesson.extended.source_b.provenance;
                const content = typeof lesson.extended.source_b === 'string' ? lesson.extended.source_b : lesson.extended.source_b.content;
                const isImageB = content.toLowerCase().endsWith('.png') || content.toLowerCase().endsWith('.jpg');
                const renderedB = isImageB ? `<img src="${typeof resolveAssetPath === 'function' ? resolveAssetPath(content, 2) : `../..${content.startsWith('/') ? content : '/' + content}`}" style="max-width: 100%; max-height: 400px; object-fit: contain; margin: 0 auto; display: block;">` : content.replace(/\n/g, '<br>');
                html += `<div style="flex: 1; display: flex; flex-direction: column; font-size: 0.95rem; line-height: 1.5;">
                  <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source B</strong>
                  ${prov ? `<span style="color: #334155; display: block; margin-bottom: 15px; font-style: italic;">${prov}</span>` : ''}
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
          html += `<div style="margin-top: 15px;"><strong>Q${lesson.extended.qNum}. ${formatText(lesson.extended.question)}</strong></div>`;
          if (!lesson.extended.title || !lesson.extended.title.toLowerCase().includes('map task')) {
            renderLines(lesson.extended.question);
          }
          html += `<br>`;
      }

      
      if (lesson.sources && lesson.sources.length > 0 && isGCSE) {
        html += `<div style="page-break-inside: auto; margin-bottom: 15px; margin-top: 20px;">`;
        if (unitId === 'cme_new') {
          html += `<div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: space-evenly;">`;
        }
        lesson.sources.forEach((source, sIdx) => {
          let sourceContent = source.content || source.text;
          if(source.src || source.caption || sourceContent) {
            let containerStyle = (unitId === 'cme_new') ? `style="flex: 1 1 45%; max-width: 48%; box-sizing: border-box; page-break-inside: avoid; border: 1px solid #ccc; padding: 10px; border-radius: 6px; box-shadow: 1px 1px 4px rgba(0,0,0,0.05); margin-bottom: 0;"` : `style=""`;
            html += `
              <div class="source-container" ${containerStyle}>
                <span style="color: #ffffff; font-size: 4px;">[[SRC_MARKER:L${lesson.globalIndex}_Source_${sIdx}]]</span>
                ${source.title ? `<strong>${badgeSource(source.title)}</strong><br>` : ''}
                ${source.src ? `<img src="${typeof resolveAssetPath === 'function' ? resolveAssetPath(source.src, 2) : source.src}" alt="Source">` : ''}
                ${sourceContent ? `<blockquote style="text-align: left; font-size: 11pt; margin-top: 10px;">${formatText(sourceContent)}</blockquote>` : ''}
                ${source.caption ? `<div class="source-caption">${source.caption}</div>` : ''}
                ${source.question ? `<div style="margin-top: 15px; text-align: left;"><strong>Q${source.qNum ? source.qNum + '.' : ''} ${source.question}${source.page ? ` (See Textbook Page ${source.page})` : ''}</strong></div>` : ''}
              </div>
            `;
          }
        });
        if (unitId === 'cme_new') {
          html += `</div>`;
        }
        html += `</div>`;
      }

      if (lesson.gcse_task) {
        html += `<div class="task-box" style="margin-bottom: 15px; page-break-inside: auto;">`;
        html += `<h2 style="margin-top: 0; color: #b71c1c; font-size: 14pt; border-bottom: none;">GCSE Exam Practice</h2>`;
        
        if (lesson.gcse_task.tasks) {
          lesson.gcse_task.tasks.forEach(task => {
             html += `<div style="margin-top: 15px;"><strong>Q${task.qNum ? task.qNum + '.' : ''} ${task.text}</strong></div>`;
             renderLines(task.text);
             html += `<br>`;
          });
        } else if (lesson.gcse_task.sources) {
          html += `<div style="page-break-inside: auto; margin-top: 20px;">`;
          let topicText = lesson.gcse_task.topic || '';
          let isNarrative = topicText.toLowerCase().includes("write a narrative account");
          if (isNarrative) {
            html += `<p style="font-weight: bold; font-size: 13pt;">${lesson.gcse_task.qNum ? `Q${lesson.gcse_task.qNum}. ` : ''}${topicText}</p>`;
            html += `<p style="font-size: 11pt; color: #475569; font-style: italic;">Read the historical sources below before writing your narrative account:</p>`;
          } else {
            html += `<p style="font-weight: bold; font-size: 13pt;">${lesson.gcse_task.qNum ? `Q${lesson.gcse_task.qNum}. ` : ''}How useful are Sources A and B for an enquiry into ${topicText}?</p>`;
          }
          
          let sourceHTML = '<div style="display: flex; gap: 20px; margin-bottom: 10px;">';
          lesson.gcse_task.sources.forEach(srcObj => {
            sourceHTML += '<div style="flex: 1; border: 1px solid #ccc; padding-top: 10px; padding-bottom: 10px; text-align: center; ">';
            if (srcObj.type === 'visual') {
              let imgSrc = typeof resolveAssetPath === 'function' ? resolveAssetPath(srcObj.src, 2) : srcObj.src;
              sourceHTML += `<img src="${imgSrc}" style="max-width: 100%; max-height: 250px;">`;
            } else {
              sourceHTML += `<blockquote style="font-size: 12pt; font-style: italic; margin: 0 0 10px 0; text-align: left;">${srcObj.text}</blockquote>`;
            }
            sourceHTML += `<p style="font-size: 10pt; font-weight: bold; margin-top: 5px;">${srcObj.title}</p>`;
            sourceHTML += '</div>';
          });
          sourceHTML += '</div>';
          html += sourceHTML;
          html += `</div>`;

          if (unitId === 'edexcel_medicine' || unitId === 'weimar_nazi_germany') {
            html += `<h3 style="margin-top: 0;">Source Evaluation Notes</h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px; ">
                <tr><th style=" padding-top: 8px; padding-bottom: 8px; width: 10%;">Source</th><th style=" padding-top: 8px; padding-bottom: 8px; width: 30%;">N.O.P.</th><th style=" padding-top: 8px; padding-bottom: 8px; width: 30%;">Content</th><th style=" padding-top: 8px; padding-bottom: 8px; width: 30%;">Context</th></tr>
                <tr><td style=" padding-top: 8px; padding-bottom: 8px; text-align: center; font-weight: bold; height: 120px;">A</td><td style=" padding-top: 8px; padding-bottom: 8px;"></td><td style=" padding-top: 8px; padding-bottom: 8px;"></td><td style=" padding-top: 8px; padding-bottom: 8px;"></td></tr>
                <tr><td style=" padding-top: 8px; padding-bottom: 8px; text-align: center; font-weight: bold; height: 120px;">B</td><td style=" padding-top: 8px; padding-bottom: 8px;"></td><td style=" padding-top: 8px; padding-bottom: 8px;"></td><td style=" padding-top: 8px; padding-bottom: 8px;"></td></tr>
              </table>`;
            html += `<h3 style="margin-top: 0;">Final Written Evaluation</h3>`;
            for(let i=0; i<10; i++) { html += ``; }
          } else {
            html += `<br>`;
            for(let i=0; i<20; i++) { html += ``; }
          }
        } else if (lesson.gcse_task.topic) {
          html += `<p style="font-weight: bold; font-size: 13pt;">${lesson.gcse_task.topic}</p>`;
          
          if (lesson.gcse_task.topic.toLowerCase().includes("narrative account")) {
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
          for(let i=0; i<numLines; i++) { html += ``; }
        }
        
        html += `</div>`;
      }

      // Removed Exam Practice
      html += `</div>`;
    }

    // Removed Lesson Assessment
    // Removed General Notes Box


    

    if (lesson.full_page_map) {
      let mapSrc = typeof resolveAssetPath === 'function' ? resolveAssetPath(lesson.full_page_map, 2) : `../..${lesson.full_page_map}`;
      html += `<div style="page-break-before: always; height: 95vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;">`;
      html += `<img src="${mapSrc}" style="max-width: 100%; max-height: 95vh; object-fit: contain; margin: auto; display: block;">`;
      html += `</div>`;
    }

    let allVideos = [];
    if (lesson.video) {
      if (Array.isArray(lesson.video)) allVideos = allVideos.concat(lesson.video);
      else allVideos.push(lesson.video);
    }
    if (lesson.extra_videos && lesson.extra_videos.length > 0) {
      allVideos = allVideos.concat(lesson.extra_videos);
    }
    if (allVideos.length > 0) {
        appendixData.push({ title: lesson.title, videos: allVideos });
    }
  });

  

  // QR Code Appendix removed per user request

  const genDate = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
  html += `<div style="text-align: center; margin-top: 50px; font-size: 8pt; color: #94a3b8;  border-top: 1px solid #e2e8f0; padding-top: 10px; font-family: sans-serif;">Generated: ${genDate} | Unit: ${unitId}</div>`;
  html += `</body></html>`;
  
  html = html.replace(/src="\/units\//g, 'src="../../units/');
  html = html.replace(/src="\/images\//g, 'src="../../images/');
  html = html.replace(/src="\/assets\//g, 'src="../../assets/');
  
  // Clean up any remaining Key Individual tags globally across the entire HTML string
  html = html.replace(/\[Key Individual:\s*([^\]]+)\]/ig, '<strong>$1</strong>');

  // Print-specific UX fixes for interactive elements
  html = html.replace(/<button[^>]*>[\s\S]*?<\/button>/gi, ''); // Remove interactive buttons
  html = html.replace(/display:\s*none;?/gi, 'display: block; margin-top: 15px;'); // Stack toggle tabs
  html = html.replace(/(?:using the toggle tabs,?\s*)/ig, ''); // Remove app-only phrasing

  const filename = period.name === 'full' ? 'textbook.html' : `textbook_${period.name}.html`;
  const outPath = path.join(publicUnitsDir, unitId, filename);
  fs.writeFileSync(outPath, html);
  console.log(`Generated ${outPath}`);
  });
});
