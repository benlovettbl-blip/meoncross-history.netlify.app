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

const ignoredDirs = ['node_modules', 'public', '.git', '.agents', 'dist'];
const allDirs = fs.readdirSync(publicUnitsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && !ignoredDirs.includes(dirent.name))
  .map(dirent => dirent.name);

allDirs.forEach(unitId => {
  console.log(`Processing workbooks for unit: ${unitId}`);
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

  unitData.lessons.forEach(lesson => {
    if (typeof sanitizeLessonData === 'function') sanitizeLessonData(lesson);
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
  <title>${unitData.title} - Printable Workbook</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,500;1,600&display=swap" rel="stylesheet">
  <style>
    @page { size: A4 portrait; margin: 10mm; }
    body { font-family: 'Inter', sans-serif; font-size: 10pt; line-height: 1.3; color: #1e293b; background: #ffffff; }
    h1 { font-family: 'Playfair Display', serif; font-size: 30pt; text-align: center; margin-top: 60px; color: #0f172a; text-transform: uppercase; letter-spacing: 1px; }
    h2 { font-family: 'Playfair Display', serif; font-size: 18pt; color: #1e3a8a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-top: 15px; page-break-after: avoid; }
    h3 { font-size: 13pt; color: #334155; margin-top: 10px; font-weight: 600; page-break-after: avoid; }
    .narrative-block { margin-bottom: 15pt; text-align: justify; orphans: 3; widows: 3; color: #334155; }
    .task-box { border: 2px solid #cbd5e1; padding: 8px; margin-top: 8px; margin-bottom: 8px; background: #f8fafc; width: 95%; margin-left: auto; margin-right: auto; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); page-break-inside: avoid; }
    .task-lines { border-bottom: 1px solid #94a3b8; height: 16px; margin-top: 5px; }
    .task-lines-large { border-bottom: 1px solid #94a3b8; height: 16px; margin-top: 5px; }
    .do-now-box { border: 2px solid #94a3b8; padding: 8px; margin-bottom: 8px; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); page-break-inside: avoid; }
    .do-now-q { font-weight: 600; margin-bottom: 8px; color: #0f172a; }
    .source-container { background: #f1f5f9; padding: 10px; border-radius: 8px; border: 1px solid #cbd5e1; margin-bottom: 10px; text-align: center; page-break-inside: avoid; }
    .source-caption { font-size: 9.5pt; color: #64748b; font-style: italic; margin-top: 10px; text-align: center; }
    .cover-image { width: 100%; max-width: 600px; height: auto; margin: 40px auto; display: block; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; }
    .watermark { position: fixed; bottom: 10px; right: 10px; font-size: 8pt; color: #94a3b8; opacity: 0.6; font-family: 'Inter', sans-serif; }
    table { width: 100%; border-collapse: separate; border-spacing: 0; border-radius: 8px; overflow: hidden; border: 1px solid #cbd5e1; }
    th { background: #1e3a8a; color: white; padding: 12px; font-weight: 600; text-align: left; border-right: 1px solid #3b82f6; }
    td { border-bottom: 1px solid #cbd5e1; border-right: 1px solid #cbd5e1; padding: 10px; }
    tr:last-child td { border-bottom: none; }
    td:last-child, th:last-child { border-right: none; }
    tbody tr:nth-child(even) { background: #f8fafc; }
    .grading-footer { margin-top: 30px; padding-top: 15px; font-size: 9.5pt; color: #555; display: flex; flex-direction: column; gap: 8px; border-top: 1px solid #ccc;  }
    .grading-boxes { display: flex; justify-content: space-between; }
    .grade-box { display: flex; align-items: center; gap: 5px; }
    .grade-box input[type="checkbox"] { -webkit-appearance: none; appearance: none; width: 12px; height: 12px; border: 1px solid #777; border-radius: 2px; background: #fff; }
    .teacher-comment { border-bottom: 1px solid #777; width: 100%; height: 20px; display: inline-block; margin-top: 5px; }
    @media print { * { box-shadow: none !important; border-radius: 0 !important; }
      img { max-width: 100% !important; object-fit: contain !important;  }
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
    periodLessons.forEach(l => {
      let maxScore = 5;
      if (l.do_now && l.do_now.items) maxScore = l.do_now.items.length;
      
      const isGeography = l.title && l.title.includes('Geography of the Middle East');
      
      if (isGeography) {
        trackerRows += `<tr style="background-color: #f1f5f9;"><td style="border:1px solid #333; padding:6px; font-weight:bold;">${l.title}</td><td style="border:1px solid #333; padding:6px; text-align:center; font-size: 0.9em; background: #eee;">N/A</td><td style="border:1px solid #333; padding:6px; width:60px;"></td><td style="border:1px solid #333; padding:6px;"></td></tr>`;
      } else {
        trackerRows += `<tr style="background-color: #f1f5f9;"><td style="border:1px solid #333; padding:6px; font-weight:bold;">${l.title}</td><td style="border:1px solid #333; padding:6px; text-align:center; font-size: 0.9em;">Do Now: / ${maxScore}</td><td style="border:1px solid #333; padding:6px; width:60px;"></td><td style="border:1px solid #333; padding:6px;"></td></tr>`;
        
        if (unitData.yearGroup === 'KS3' || unitId === 'great_war' || unitId === 'great_war_part2') {
          trackerRows += `<tr><td style="border:1px solid #333; padding:6px; padding-left: 20px; font-style: italic; font-size: 0.9em;">&#x21b3; ..........................................................................</td><td style="border:1px solid #333; padding:6px; text-align:center; font-weight:bold;">&nbsp;&nbsp;&nbsp;&nbsp; / &nbsp;&nbsp;</td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td></tr>`;
        } else {
          trackerRows += `<tr><td style="border:1px solid #333; padding:6px; padding-left: 20px; font-style: italic; font-size: 0.9em;">&#x21b3; Assessment: ........................................................</td><td style="border:1px solid #333; padding:6px; text-align:center; font-weight:bold;">&nbsp;&nbsp;&nbsp;&nbsp; / &nbsp;&nbsp;</td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td></tr>`;
          trackerRows += `<tr><td style="border:1px solid #333; padding:6px; padding-left: 20px; font-style: italic; font-size: 0.9em;">&#x21b3; Assessment: ........................................................</td><td style="border:1px solid #333; padding:6px; text-align:center; font-weight:bold;">&nbsp;&nbsp;&nbsp;&nbsp; / &nbsp;&nbsp;</td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td></tr>`;
          trackerRows += `<tr><td style="border:1px solid #333; padding:6px; padding-left: 20px; font-style: italic; font-size: 0.9em;">&#x21b3; Assessment: ........................................................</td><td style="border:1px solid #333; padding:6px; text-align:center; font-weight:bold;">&nbsp;&nbsp;&nbsp;&nbsp; / &nbsp;&nbsp;</td><td style="border:1px solid #333; padding:6px;"></td><td style="border:1px solid #333; padding:6px;"></td></tr>`;
        }
      }
    });

    if (unitData.assessments) {
      unitData.assessments.forEach(a => {
        trackerRows += `<tr><td style="border:1px solid #333; padding:4px;">${a.title}</td><td style="border:1px solid #333; padding:4px; text-align:center; background:#eee;">N/A</td><td style="border:1px solid #333; padding:4px;"></td><td style="border:1px solid #333; padding:4px;"></td></tr>`;
      });
    }

    let bannerImageSrc = period.image || unitData.cover_image || '';
    if (bannerImageSrc) {
      bannerImageSrc = typeof resolveAssetPath === 'function' ? resolveAssetPath(bannerImageSrc, 2) : `../..${bannerImageSrc.startsWith('/') ? bannerImageSrc : '/' + bannerImageSrc}`;
    }

    html += `
    <h3 style="text-align: center; color: #555; margin-top: 0; margin-bottom: 10px; font-size: 13pt; text-transform: uppercase; letter-spacing: 0.5px;">${unitData.title}</h3>
    <div style="width: 100%; height: 160px; margin-top: 0px; border-radius: 8px; overflow: hidden; position: relative; box-shadow: 0 4px 10px rgba(0,0,0,0.15); border: 2px solid #1a237e;">
      ${bannerImageSrc ? `<img src="${bannerImageSrc}" style="width: 100%; height: 100%; object-fit: cover;">` : ''}
      <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; color: white;">
        <div style="background: rgba(15, 23, 42, 0.85); padding: 20px 40px; border-radius: 12px; text-align: center; border: 1px solid rgba(255,255,255,0.2);">
          <h1 style="margin: 0 !important; font-size: 36pt; color: white; padding: 0;">${periodTitle}</h1>
          <p style="font-size:16pt; margin: 10px 0 0 0; font-family: 'Outfit', sans-serif; color: #cbd5e1;">Student Workbook</p>
        </div>
      </div>
    </div>
    
    <div style="display: flex; flex-direction: column; align-items: center; margin: 40px auto 0 auto; width: 60%; gap: 20px;">
      <div style="width: 100%; border-bottom: 1px solid #000; padding-bottom: 5px; font-weight: 500; font-size: 14pt;">Name: </div>
      <div style="width: 100%; border-bottom: 1px solid #000; padding-bottom: 5px; font-weight: 500; font-size: 14pt;">Class: </div>
    </div>
    `;

    if (unitData.hero_image) {
      let heroImageSrc = typeof resolveAssetPath === 'function' ? resolveAssetPath(unitData.hero_image, 2) : `../..${unitData.hero_image.startsWith('/') ? unitData.hero_image : '/' + unitData.hero_image}`;
      html += `
      <div style="margin: 40px auto 20px auto; text-align: center; max-width: 85%;">
        <img src="${heroImageSrc}" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.15); border: 2px solid #cbd5e1;">
        ${unitData.hero_caption ? `<p style="font-size: 11pt; color: #475569; margin-top: 15px; font-style: italic;">${unitData.hero_caption}</p>` : ''}
      </div>
      `;
    }

    html += `
    <!-- Tracker Table on its own page -->
    <div style="page-break-before: always;"></div>
    <h2 style="margin-bottom: 25px; margin-top: 60px; font-size: 24pt; text-align: center; border-bottom: none;">Progress & Assessment Tracker</h2>
    <div style="margin: 0 5%; width: 90%;">
      <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 9.5pt;">
        <thead>
          <tr style="background: #1a237e; color: white;">
            <th style="border: 1px solid #333; padding: 6px; width: 35%;">Progress & Assessment Tracker</th>
            <th style="border: 1px solid #333; padding: 6px; width: 12%; text-align: center;">Do Now</th>
            <th style="border: 1px solid #333; padding: 6px; width: 13%; text-align: center;">Level</th>
            <th style="border: 1px solid #333; padding: 6px; width: 40%;">Teacher Comment</th>
          </tr>
        </thead>
        <tbody>
          ${trackerRows}
          <tr style="background: #e8eaf6; font-weight: bold;">
            <td style="border: 1px solid #333; padding: 8px; text-align: right;">Final Unit Grade:</td>
            <td style="border: 1px solid #333; padding: 8px; background:#eee;"></td>
            <td style="border: 1px solid #333; padding: 8px;"></td>
            <td style="border: 1px solid #333; padding: 8px;"></td>
          </tr>
        </tbody>
      </table>
    </div>

    ${(unitId === 'edexcel_medicine' || unitId === 'western_front') ? (periodName === 'western_front' || unitId === 'western_front' ? (global.sectionAGuide ? `<div style="page-break-before: always; page-break-after: always; padding: 20px;">${global.sectionAGuide}</div>` : '') : (global.sectionBGuide ? `<div style="page-break-before: always; page-break-after: always; padding: 20px;">${global.sectionBGuide}</div>` : '')) : ''}
    `;

  periodLessons.forEach((lesson, lessonIndex) => {
    let globalQNum = 1;
    if (lesson.primary_source && lesson.primary_source.question) lesson.primary_source.qNum = globalQNum++;
    if (lesson.sources) lesson.sources.forEach(source => { if (source.question) source.qNum = globalQNum++; });
    if (lesson.tasks) lesson.tasks.forEach(task => task.qNum = globalQNum++);
    if (lesson.historians_corner && lesson.historians_corner.stretch_question) lesson.historians_corner.qNum = globalQNum++;
    if (lesson.narrative_blocks) lesson.narrative_blocks.forEach(block => { if (block.tasks) block.tasks.forEach(task => task.qNum = globalQNum++); if (block.hinge_question) block.hinge_question.qNum = globalQNum++; });
    if (lesson.extended && lesson.extended.question) lesson.extended.qNum = globalQNum++;
    if (lesson.gcse_task) lesson.gcse_task.qNum = globalQNum++;
    if (lesson.pair_share) lesson.pair_share.qNum = globalQNum++;
    
    html += `<h2 style="margin-bottom: 10px; page-break-before: always;">${formatText(lesson.title)}</h2>`;
    
    if (lesson.a4_map) {
      if (Array.isArray(lesson.a4_map)) {
        html += `<div style="page-break-after: always; width: 100%; height: 85vh; display: flex; flex-direction: row; justify-content: center; align-items: center; gap: 20px;">`;
        lesson.a4_map.forEach(img => {
          let mapPath = typeof resolveAssetPath === 'function' ? resolveAssetPath(img, 2) : `../..${img.startsWith('/') ? img : '/' + img}`;
          html += `<img src="${mapPath}" style="max-width: 48%; max-height: 100%; object-fit: contain; border: 2px solid #333; padding: 5px; box-sizing: border-box;">`;
        });
        html += `</div>`;
      } else {
        let mapPath = typeof resolveAssetPath === 'function' ? resolveAssetPath(lesson.a4_map, 2) : `../..${lesson.a4_map.startsWith('/') ? lesson.a4_map : '/' + lesson.a4_map}`;
        html += `<div style="page-break-after: always; width: 100%; height: 85vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">`;
        html += `<img src="${mapPath}" style="max-width: 100%; max-height: 100%; object-fit: contain; border: 2px solid #333; padding: 5px; box-sizing: border-box;">`;
        html += `</div>`;
      }
    }

    if (lesson.teacher_notes && lesson.teacher_notes.objectives && lesson.teacher_notes.objectives.length > 0) {
      html += `<div style="margin-bottom: 15px; padding: 10px; border: 1px solid #cbd5e1; border-radius: 8px; background: #f8fafc; ">`;
      html += `<h4 style="margin: 0 0 8px 0; color: #1e3a8a; font-size: 10pt; text-transform: uppercase;">Learning Objectives</h4>`;
      lesson.teacher_notes.objectives.forEach(obj => {
        html += `<div style="display: flex; align-items: flex-start; margin-bottom: 4px;">`;
        html += `<div style="width: 12px; height: 12px; border: 1.5px solid #64748b; border-radius: 2px; margin-right: 8px; margin-top: 2px; flex-shrink: 0; background: #fff;"></div>`;
        html += `<div style="font-size: 9.5pt; color: #334155; line-height: 1.2;">${formatText(obj.objective)}</div>`;
        html += `</div>`;
      });
      html += `</div>`;
    }

    if (lesson.hook_text) {
      html += `<p style="font-size: 12pt; font-style: italic; background: #eef2ff; padding: 10px; border-left: 4px solid #3b82f6; margin-bottom: 10px;">${lesson.hook_text}</p>`;
    }

    if (lesson.fun_facts && lesson.fun_facts.length > 0) {
      html += `<div style="background: #fffbeb; border: 1px solid #fcd34d; padding: 10px; margin-bottom: 10px; border-radius: 4px;">`;
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
            let resolved = typeof resolveAssetPath === 'function' ? resolveAssetPath(src, 2) : src;
            const style = lesson.primary_source.custom_style || (srcs.length > 1 ? 'max-width: 48%; max-height: 250px; object-fit: contain; border: 2px solid #1a237e; border-radius: 4px; box-shadow: 2px 2px 5px rgba(0,0,0,0.1);' : 'max-width: 100%; max-height: 250px; object-fit: contain; border: 2px solid #1a237e; border-radius: 4px; box-shadow: 2px 2px 5px rgba(0,0,0,0.1);');
            return `<img src="${resolved}" alt="Primary Source" style="${style}">`;
          }).join(' ');
      }

      html += `
        <div class="source-container" style=" margin-bottom: 15px;">
          ${lesson.primary_source.title ? `<strong>${lesson.primary_source.title}</strong><br>` : ''}
          <div style="display: flex; justify-content: center; gap: 10px; margin: 10px 0;">${imgTags}</div>
          ${lesson.primary_source.caption ? `<div class="source-caption">${lesson.primary_source.caption}</div>` : ''}
          ${lesson.primary_source.question ? `<div style="margin-top: 15px; text-align: left;"><strong>Q${lesson.primary_source.qNum}. ${lesson.primary_source.question.replace('Enquiry: ', '')}</strong></div><div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>` : ''}
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
                     <div style="border: 2px solid #333; padding: 3px 10px; font-weight: bold; font-size: 10pt; border-radius: 4px; background: #fff;">Score: &nbsp;&nbsp;&nbsp;&nbsp; / 5</div>
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
          html += `<div style="width: 45%; border: 2px solid #333; padding: 5px; box-sizing: border-box; background: #fff; ${m} box-shadow: 2px 2px 0px #aaa;">
                      <strong style="font-size: 9.5pt;">${ev.year || ''}</strong><br>
                      <strong style="font-size: 9.5pt;">${ev.title || ''}</strong><br>
                      <span style="font-size: 9pt;">${ev.detail || ''}</span>
                   </div>`;
        });
        html += `</div><div style="clear: both; margin-bottom: 5px;"></div>`;

        if (lesson.do_now.prediction_question) {
          html += `<div class="do-now-q" style="margin-top: 5px; font-size: 9.5pt;"><strong>1. ${lesson.do_now.prediction_question}</strong></div>`;
          html += `<div class="task-lines" style="height: 12px; margin-top: 3px;"></div>`;
        }
        html += `</div>`;
      } else if (lesson.do_now.type === "questions" || lesson.do_now.type === "retrieval" || (!lesson.do_now.type && (lesson.do_now.items || lesson.do_now.questions))) {
        let items = lesson.do_now.items || lesson.do_now.questions;
        let maxScore = items ? items.length : 5;
        html += `<div class="do-now-box" style="padding: 5px; margin-bottom: 5px;">
                   <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 5px;">
                     <h3 style="margin: 0; font-size: 11pt;">Do Now Activity</h3>
                     <div style="border: 2px solid #333; padding: 3px 10px; font-weight: bold; font-size: 10pt; border-radius: 4px; background: #fff;">Score: &nbsp;&nbsp;&nbsp;&nbsp; / ${maxScore}</div>
                   </div>`;
        if (items) {
          items.forEach((item, index) => {
            html += `<div class="do-now-q" style="font-size: 9.5pt; margin-bottom: 4px;"><strong>${index + 1}.</strong> ${item.question}</div>`;
            let linesToDraw = 2;
            for(let i=0; i<linesToDraw; i++) {
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
      vocabTerms = Object.keys(lesson.glossary).map(k => ({ term: k, definition: lesson.glossary[k] }));
    }
    if (vocabTerms && vocabTerms.length > 0) {
      let vocabStyle = lessonIndex % 3;
      html += `<div class="task-box" style="margin-bottom: 0px; padding: 5px;">`;
      html += `<h3 style="margin-top: 0; margin-bottom: 5px; font-size: 11pt;">Vocabulary Check</h3>`;
      
      if (vocabStyle === 0) {
        if (lesson.vocab_cloze_text) {
           html += `<p style="font-weight: bold; font-size: 9.5pt; margin: 2px 0;">Style: Contextual Cloze</p>`;
           html += `<p style="font-style: italic; font-size: 9.5pt; margin: 2px 0 5px 0;">Fill in the blanks using the vocabulary words below.</p>`;
           let words = vocabTerms.map(v => v.term).join(' &nbsp;|&nbsp; ');
           html += `<div style="border: 1px solid #ccc; padding: 4px; margin-bottom: 5px; text-align: center; font-weight: bold; font-size: 9.5pt;">${words}</div>`;
           let cloze = lesson.vocab_cloze_text.replace(/\[.*?\]/g, '__________________');
           html += `<p style="line-height: 1.6; font-size: 9.5pt; margin: 5px 0;">${cloze}</p>`;
        } else {
           html += `<p style="font-weight: bold; font-size: 9.5pt; margin: 2px 0;">Style: Vocabulary in Context</p>`;
           html += `<p style="font-style: italic; font-size: 9.5pt; margin: 2px 0 5px 0;">Write a short paragraph using at least FOUR of the vocabulary words below correctly.</p>`;
           let words = vocabTerms.map(v => v.term).join(' &nbsp;|&nbsp; ');
           html += `<div style="border: 1px solid #ccc; padding: 4px; margin-bottom: 5px; text-align: center; font-weight: bold; font-size: 9.5pt;">${words}</div>`;
           for(let i=0; i<4; i++) { html += `<div class="task-lines" style="height: 12px; margin-top: 3px;"></div>`; }
        }
      } else if (vocabStyle === 1) {
        html += `<p style="font-weight: bold; font-size: 9.5pt; margin: 2px 0;">Style: Vocabulary Mapping</p>`;
        html += `<p style="font-style: italic; font-size: 9.5pt; margin: 2px 0 5px 0;">Write a historically accurate sentence connecting two terms from the glossary box below.</p>`;
        let words = vocabTerms.map(v => v.term).join(' &nbsp;|&nbsp; ');
        html += `<div style="border: 1px solid #ccc; padding: 4px; margin-bottom: 5px; text-align: center; font-weight: bold; font-size: 9.5pt;">${words}</div>`;
        html += `<strong style="font-size: 9.5pt;">Your Sentence:</strong><div class="task-lines" style="height: 12px; margin-top: 3px;"></div><div class="task-lines" style="height: 12px; margin-top: 3px;"></div><div class="task-lines" style="height: 12px; margin-top: 3px;"></div><div class="task-lines" style="height: 12px; margin-top: 3px;"></div>`;
      } else if (vocabStyle === 2) {
        html += `<p style="font-weight: bold; font-size: 9.5pt; margin: 2px 0;">Style: Mini-Frayer Model</p>`;
        let focusWord = vocabTerms[0].term;
        html += `<p style="font-style: italic; font-size: 9.5pt; margin: 2px 0 5px 0;">Complete the Frayer Model for the term: <strong>${focusWord}</strong></p>`;
        html += `
          <table style="width: 100%; border-collapse: collapse; text-align: center; font-size: 9.5pt;">
            <tr>
              <td style="border: 2px solid #333; width: 50%; height: 60px; vertical-align: top; padding: 3px;"><strong>Definition</strong></td>
              <td style="border: 2px solid #333; width: 50%; height: 60px; vertical-align: top; padding: 3px;"><strong>Historical Example</strong></td>
            </tr>
            <tr>
              <td style="border: 2px solid #333; width: 50%; height: 60px; vertical-align: top; padding: 3px;"><strong>Non-Example / Sketch</strong></td>
              <td style="border: 2px solid #333; width: 50%; height: 60px; vertical-align: top; padding: 3px;"><strong>Your own sentence</strong></td>
            </tr>
          </table>
        `;
      }
      html += `</div>`;
    }

    
    html += `</div>`;
    
    html += `</div>`;

    // Sources
    if (lesson.sources && lesson.sources.length > 0) {
      html += `<div style="page-break-before: always; margin-bottom: 15px;">`;
      lesson.sources.forEach(source => {
        let sourceContent = source.content || source.text;
        if(source.src || source.caption || sourceContent) {
          html += `
            <div class="source-container" style="">
              ${source.title ? `<strong>${source.title}</strong><br>` : ''}
              ${source.src ? `<img src="${typeof resolveAssetPath === 'function' ? resolveAssetPath(source.src, 2) : source.src}" alt="Source">` : ''}
              ${sourceContent ? `<blockquote style="text-align: left; font-size: 11pt; margin-top: 10px;">${formatText(sourceContent)}</blockquote>` : ''}
              ${source.caption ? `<div class="source-caption">${source.caption}</div>` : ''}
            </div>
          `;
        }
      });
      html += `</div>`;
    }

    
    
    // Narrative Blocks & Tasks
    if (lesson.narrative_blocks) {
      lesson.narrative_blocks.forEach((block, bIdx) => {
        if (block.image) {
          let src = typeof resolveAssetPath === 'function' ? resolveAssetPath(block.image, 2) : block.image;
          if (src.toLowerCase().endsWith('.svg')) {
              html += `<img src="${src}" style="width: 85%; max-width: 650px; height: auto; display:block; margin: 25px auto; border-radius: 8px; border: 1.5px solid #475569; padding: 10px; background: #f8fafc;">`;
          } else {
              html += `<img src="${src}" style="max-width:100%; max-height: 250px; display:block; margin: 15px auto; border-radius: 6px; border: 1px solid #ccc;">`;
          }
        }
        
        let textToRender = block.text || '';
        const kiRegex = /\[Key Individual:\s*([^\]]+)\]/ig;
        textToRender = textToRender.replace(kiRegex, (match, p1) => {
           return `<strong>${p1.trim()}</strong>`;
        });
        
        html += `<p class="narrative-block" id="para-${bIdx+1}">${formatText(textToRender)}</p>`;
        
        if (block.hinge_question) {
          html += `<div class="task-box" style="background: #f8fafc; border: 2px dashed #94a3b8;">`;
          html += `<p style="margin-top:0px; margin-bottom: 10px; color: #475569; font-size: 0.9em; text-transform: uppercase;"><strong>Knowledge Check (Q${block.hinge_question.qNum})</strong></p>`;
          html += `<p style="margin-bottom: 15px;"><strong>${block.hinge_question.text}</strong></p>`;
          html += `<ul style="list-style-type: none; padding-left: 0; margin-bottom: 0;">`;
          block.hinge_question.options.forEach((opt, idx) => {
            html += `<li style="margin-bottom: 8px;"><div style="display: inline-block; width: 16px; height: 16px; border: 1px solid #333; margin-right: 10px; border-radius: 3px; position: relative; top: 3px;"></div>${String.fromCharCode(65+idx)}. ${opt}</li>`;
          });
          html += `</ul></div>`;
        }
        
        if (block.tasks && block.tasks.length > 0) {
          html += `<div class="task-box">`;
          block.tasks.forEach(task => {
            if (task.type === 'draw') {
               html += `<div class="draw-task">Q${task.qNum}: ${task.text || task.question}</div>`;
            } else {
               html += `<p style="margin-top:10px;"><strong>Q${task.qNum}. ${task.text || task.question}</strong></p>`;
               html += `<div class="task-lines"></div><div class="task-lines"></div><div class="task-lines"></div>`;
            }
          });
          html += `</div>`;
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
    if (lesson.pair_share) {
      html += `<div class="task-box" style="background: #f0fdfa; border: 2px solid #0d9488; ">`;
      html += `<h3 style="margin-top: 0; color: #0f766e;">Pair & Share Activity</h3>`;
      
      if (lesson.pair_share.sources) {
         let sourceHTML = '<div style="display: flex; gap: 20px; margin-bottom: 10px;">';
         lesson.pair_share.sources.forEach(srcObj => {
            sourceHTML += '<div style="flex: 1; border: 1px solid #0d9488; padding: 10px; text-align: left; background: #fff;">';
            if (srcObj.type === 'visual') {
               let imgSrc = typeof resolveAssetPath === 'function' ? resolveAssetPath(srcObj.src, 2) : srcObj.src;
               sourceHTML += `<img src="${imgSrc}" style="max-width: 100%; max-height: 250px;">`;
            } else {
               sourceHTML += `<blockquote style="font-size: 11pt; font-style: italic; margin: 0 0 10px 0;">${srcObj.text}</blockquote>`;
            }
            if (srcObj.title) sourceHTML += `<p style="font-size: 10pt; font-weight: bold; margin-top: 5px;">${srcObj.title}</p>`;
            sourceHTML += '</div>';
         });
         sourceHTML += '</div>';
         html += sourceHTML;
      }

      html += `<p style="font-weight: bold; font-size: 12pt; margin-bottom: 5px;">Prompt: ${lesson.pair_share.prompt}</p>`;
      if (lesson.pair_share.think) html += `<p style="font-size: 12pt; font-style: italic; margin-top: 0;">Think: ${lesson.pair_share.think}</p>`;
      html += `<div style="margin-top: 15px;"><strong>Your Notes:</strong><div class="task-lines-large"></div><div class="task-lines-large"></div></div>`;
      html += `</div>`;
    }

    // Historians Corner
    if (lesson.historians_corner) {
      html += `<div class="task-box" style=" background: #fff; border: 2px dashed #666;">`;
      html += `<h3 style="margin-top: 0;">Historian's Corner: ${lesson.historians_corner.title}</h3>`;
      html += `<p style="font-size: 12pt; font-style: italic;">${lesson.historians_corner.text}</p>`;
      html += `</div>`;
    }

    if (lesson.tasks && lesson.tasks.length > 0) {
      html += `<h3 style="margin-top: 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Active Tasks</h3>`;
      lesson.tasks.forEach((task, tIdx) => {
        let qText = task.question || task.text || '';
        html += `<div class="task-box">`;
        
        let match = qText.match(/^([A-Za-z0-9'\-\/ ]+):\s*(.*)/);
        if (match) {
            let subhead = match[1];
            let rest = match[2];
            html += `<h4 style="margin-top: 0; color: #0284c7; margin-bottom: 8px; font-size: 1.1em;">${subhead}</h4>`;
            html += `<p style="font-weight: bold; margin-top: 0;">Q${tIdx + 1}. ${rest}</p>`;
        } else {
            html += `<p style="font-weight: bold; margin-top: 0;">Q${tIdx + 1}. ${qText}</p>`;
        }
        let hasExamTaskLater = lesson.gcse_task || lesson.exam_practice || (lesson.extended && lesson.extended.question);
        let numLines = (!hasExamTaskLater && tIdx === lesson.tasks.length - 1) ? 20 : 6;
        for(let i=0; i<numLines; i++) {
            html += `<div class="task-lines-large"></div>`;
        }
        html += `</div>`;
      });
    }

    let hasExamTask = lesson.gcse_task || lesson.exam_practice || (lesson.extended && lesson.extended.question);
    if (hasExamTask) {
      html += `<div style="page-break-before: always;">`;
      html += `<h2 style="margin-top: 0;">GCSE Exam Practice</h2>`;

      const renderLines = (text) => {
          if (text.includes("16 marks")) {
              for(let i=0; i<42; i++) { html += `<div class="task-lines-large"></div>`; }
          } else if (text.includes("12 marks") || text.includes("Explain why")) {
              for(let i=0; i<22; i++) { html += `<div class="task-lines-large"></div>`; }
          } else if (text.includes("8 marks")) {
              for(let i=0; i<19; i++) { html += `<div class="task-lines-large"></div>`; }
          } else if (text.includes("2 marks")) {
              for(let i=0; i<3; i++) { html += `<div class="task-lines-large"></div>`; }
          } else if (text.includes("4 marks") || text.includes("Explain one way") || text.includes("Explain one consequence")) {
              for(let i=0; i<4; i++) { html += `<div class="task-lines-large"></div>`; }
          } else {
              for(let i=0; i<8; i++) { html += `<div class="task-lines-large"></div>`; }
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
                  <div style="border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; background: #ffffff; color: #0f172a; flex-grow: 1;">
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
                  <div style="border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; background: #ffffff; color: #0f172a; flex-grow: 1;">
                    ${renderedB}
                  </div>
                </div>`;
              }
              html += `</div>`;
          }

          if (lesson.extended.provenance_clue) {
               html += `<div style="margin-top: 15px; margin-bottom: 15px; padding: 12px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; "><strong style="color: #1e3a8a;">Provenance Scaffolding:</strong><p style="margin: 5px 0 0 0; color: #1e40af; font-style: italic;">${formatText(lesson.extended.provenance_clue)}</p></div>`;
          }
          html += `<div style="margin-top: 15px;"><strong>Q${lesson.extended.qNum}. ${formatText(lesson.extended.question)}</strong></div>`;
          if (!lesson.extended.title || !lesson.extended.title.toLowerCase().includes('map task')) {
            renderLines(lesson.extended.question);
          }
          html += `<br>`;
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
          html += `<div style="page-break-before: always; page-break-after: always;">`;
          if (unitId === 'edexcel_medicine' || unitId === 'weimar_nazi_germany') {
            html += `<p style="font-weight: bold; font-size: 13pt;">How useful are Sources A and B for an enquiry into ${lesson.gcse_task.topic}?</p>`;
          } else {
            html += `<p style="font-weight: bold; font-size: 13pt;">${lesson.gcse_task.topic}</p>`;
          }
          
          let sourceHTML = '<div style="display: flex; gap: 20px; margin-bottom: 10px;">';
          lesson.gcse_task.sources.forEach(srcObj => {
            sourceHTML += '<div style="flex: 1; border: 1px solid #ccc; padding: 10px; text-align: center; background: #fff;">';
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
                <tr><th style="border: 2px solid #000; padding: 8px; width: 10%;">Source</th><th style="border: 2px solid #000; padding: 8px; width: 30%;">N.O.P.</th><th style="border: 2px solid #000; padding: 8px; width: 30%;">Content</th><th style="border: 2px solid #000; padding: 8px; width: 30%;">Context</th></tr>
                <tr><td style="border: 2px solid #000; padding: 8px; text-align: center; font-weight: bold; height: 120px;">A</td><td style="border: 2px solid #000; padding: 8px;"></td><td style="border: 2px solid #000; padding: 8px;"></td><td style="border: 2px solid #000; padding: 8px;"></td></tr>
                <tr><td style="border: 2px solid #000; padding: 8px; text-align: center; font-weight: bold; height: 120px;">B</td><td style="border: 2px solid #000; padding: 8px;"></td><td style="border: 2px solid #000; padding: 8px;"></td><td style="border: 2px solid #000; padding: 8px;"></td></tr>
              </table>`;
            html += `<h3 style="margin-top: 0;">Final Written Evaluation</h3>`;
            for(let i=0; i<10; i++) { html += `<div class="task-lines-large"></div>`; }
          } else {
            html += `<br>`;
            for(let i=0; i<20; i++) { html += `<div class="task-lines-large"></div>`; }
          }
        } else if (lesson.gcse_task.topic) {
          html += `<p style="font-weight: bold; font-size: 13pt;">${lesson.gcse_task.topic}</p>`;
          
          if (lesson.gcse_task.topic.toLowerCase().includes("narrative account")) {
             html += `<div style="margin: 15px 0; padding: 12px; border: 2px dashed #b71c1c; background: #fff5f5; border-radius: 6px; ">
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
          for(let i=0; i<numLines; i++) { html += `<div class="task-lines-large"></div>`; }
        }
        
        html += `</div>`;
      }

      
      let epArray = lesson.exam_practice;
      let epStimulus = [];
      if (lesson.exam_practice && !Array.isArray(lesson.exam_practice) && lesson.exam_practice.questions) {
          epArray = lesson.exam_practice.questions;
          epStimulus = lesson.exam_practice.stimulus || [];
      }
      if (epArray && epArray.length > 0) {
        html += `<div class="task-box" style="margin-bottom: 10px; border: 2px solid #1a237e; background: #eef2ff;">`;
        html += `<h2 style="margin-top: 0; color: #1a237e; font-size: 14pt; border-bottom: none;">Exam Practice</h2>`;
        
        let questionsBefore = [];
        let questionsAfter = [];
        epArray.forEach((ep, index) => {
             let qText = ep.question.toLowerCase();
             if (qText.includes('explain why') || qText.includes('explain one consequence') || qText.includes('describe two features') || qText.includes('describe one feature')) {
                 questionsBefore.push({ep, index});
             } else if (qText.includes('source') || qText.includes('interpretation')) {
                 questionsAfter.push({ep, index});
             } else {
                 if (index < 2) questionsBefore.push({ep, index});
                 else questionsAfter.push({ep, index});
             }
        });

        const renderQuestionLines = (qText) => {
            let lines = 8;
            if (qText.includes("16 marks")) lines = 42;
            else if (qText.includes("12 marks") || qText.includes("Explain why")) lines = 32;
            else if (qText.includes("8 marks")) lines = 20;
            else if (qText.includes("4 marks") || qText.includes("Explain one way") || qText.includes("Explain one consequence") || qText.includes("difference") || qText.includes("Suggest one reason")) lines = 8;
            else if (qText.includes("2 marks")) lines = 4;
            let lHtml = '';
            for(let i=0; i<lines; i++) { lHtml += `<div class="task-lines-large"></div>`; }
            return lHtml;
        };

        const renderQuestionItem = (item) => {
            let ep = item.ep;
            let index = item.index;
            let marksStr = ep.marks ? ` (${ep.marks} marks)` : '';
            if (ep.question.includes('marks)')) marksStr = '';
            let questionHtml = `<div style="margin-top: 15px; margin-bottom: 10px; padding-left: 15px; border-left: 4px solid #3b82f6;"><strong>${index + 1}. ${formatText(ep.question)}${marksStr}</strong></div>`;

            if (ep.stimulus && ep.stimulus.length > 0) {
                let isSources = ep.question.toLowerCase().includes('useful') || ep.question.toLowerCase().includes('follow up') || ep.stimulus.some(s => typeof s === 'string' && (s.includes('Source A') || s.includes('Source B')));
                if (isSources) {
                   questionHtml += `<div style="display: flex; gap: 20px; margin-top: 15px; margin-bottom: 10px;">`;
                   ep.stimulus.forEach((stimText, i) => {
                     questionHtml += `<div style="flex: 1; display: flex; flex-direction: column; font-size: 0.95rem; line-height: 1.5;">
                       <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1.1rem;">Source ${String.fromCharCode(65+i)}</strong>
                       <div style="border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; background: #ffffff; color: #0f172a; flex-grow: 1;">
                         ${formatText(stimText.replace(/<strong>Source [A-Z]:\s*<\/strong>/, '').replace(/\n/g, '<br>'))}
                       </div>
                     </div>`;
                   });
                   questionHtml += `</div>`;
                } else {
                   questionHtml += `<div style="margin-top: 5px; margin-bottom: 10px; padding: 10px; border: 1.5px solid #cbd5e1; border-radius: 8px; background: #f8fafc;  font-size: 0.95rem;">
                     <p style="margin-top: 0; margin-bottom: 8px; font-weight: bold;">You may use the following in your answer:</p>
                     <ul style="margin-top: 0; margin-bottom: 8px; padding-left: 25px;">`;
                   ep.stimulus.forEach(stimText => { questionHtml += `<li style="margin-bottom: 4px;">${formatText(stimText)}</li>`; });
                   questionHtml += `</ul><p style="margin-top: 0; margin-bottom: 0; font-weight: bold;">You must also use information of your own.</p></div>`;
                }
            }
            html += questionHtml + renderQuestionLines(ep.question);
        };

        questionsBefore.forEach(renderQuestionItem);

        if (epStimulus && epStimulus.length > 0) {
           html += `</div>`; // Close the initial task-box
           html += `<div style="page-break-before: always; page-break-after: always;">`; // Isolate sources on their own page
           html += `<h2 style="margin-top: 15px; margin-bottom: 15px; color: #1a237e; font-size: 14pt; border-bottom: none;">Exam Sources & Interpretations</h2>`;
           let sources = [];
           let interpretations = [];
           epStimulus.forEach((stim, i) => {
               let sTitle = stim.title || `Source ${String.fromCharCode(65+i)}`;
               if (sTitle.toLowerCase().includes('interpretation')) {
                   interpretations.push({stim, sTitle});
               } else {
                   sources.push({stim, sTitle});
               }
           });

           if (sources.length > 0) {
               html += `<div style="display: flex; gap: 15px; margin-top: 15px; margin-bottom: 15px;">`;
               sources.forEach((item) => {
                   let content = formatText(item.stim.content || item.stim).replace(/\n/g, '<br>');
                   html += `<div style="flex: 1; display: flex; flex-direction: column; font-size: 0.9rem; line-height: 1.3;">
                      <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1rem;">${item.sTitle}</strong>
                      <div style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px; background: #ffffff; color: #0f172a; flex-grow: 1;">
                        ${content}
                      </div>
                    </div>`;
               });
               html += `</div>`;
           }
           if (interpretations.length > 0) {
               html += `<div style="display: flex; gap: 15px; margin-top: 15px; margin-bottom: 15px;">`;
               interpretations.forEach((item) => {
                   let content = formatText(item.stim.content || item.stim).replace(/\n/g, '<br>');
                   html += `<div style="flex: 1; display: flex; flex-direction: column; font-size: 0.9rem; line-height: 1.3;">
                      <strong style="color: #1e3a8a; display: block; margin-bottom: 8px; font-size: 1rem;">${item.sTitle}</strong>
                      <div style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px; background: #ffffff; color: #0f172a; flex-grow: 1;">
                        ${content}
                      </div>
                    </div>`;
               });
               html += `</div>`;
           }
           html += `</div>`; // Close the isolated sources page
           html += `<div class="task-box" style="margin-bottom: 10px; border: 2px solid #1a237e; background: #eef2ff;">`; // Re-open task-box for the remaining questions
        }

        questionsAfter.forEach(renderQuestionItem);
        html += `</div>`;
      }
      html += `</div>`;
    }
    // Inject General Notes Box
    html += `<div style="">`;
    html += `
      <div class="task-box" style="margin-bottom: 15px;  border: 2px solid #64748b; background: #f8fafc;">
        <h3 style="margin-top: 0; color: #334155;">Documentary / General Notes</h3>
        <p style="font-weight: bold; margin-bottom: 10px;">Title / Topic: ______________________________________________________________</p>
        <div class="task-lines-large"></div>
        <div class="task-lines-large"></div>
        <div class="task-lines-large"></div>
        <div class="task-lines-large"></div>
        <div class="task-lines-large"></div>
        <div class="task-lines-large"></div>
      </div>
    `;

    // Inject Discreet Grading Footer for the Lesson
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

  if (unitId === 'edexcel_medicine' || unitId === 'western_front') {
    html += `
    <div style="page-break-before: always; padding: 20px;">
      <h2 style="text-align: center; font-size: 24pt; margin-bottom: 15px; font-family: 'Playfair Display', serif; color: #1a237e;">Factors Overview: ${periodTitle}</h2>
      <p style="text-align: center; font-size: 12pt; margin-bottom: 15px;">Edexcel focuses heavily on the factors that drove medical progress (or held it back). For each factor below, write one specific historical example from this period that either helped or hindered medical progress.</p>
      <table style="width: 100%; border-collapse: collapse; border: 2px solid #1a237e;">
        <thead>
          <tr style="background: #1a237e; color: white;">
            <th style="padding: 10px; border: 1px solid #ccc; width: 25%; font-size: 12pt;">Factor</th>
            <th style="padding: 10px; border: 1px solid #ccc; width: 75%; font-size: 12pt;">Specific Historical Example & Impact</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding: 10px; border: 1px solid #ccc; font-weight: bold; font-size: 12pt;">Individuals</td><td style="padding: 10px; border: 1px solid #ccc; height: 110px;"></td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ccc; font-weight: bold; font-size: 12pt;">The Church & Religion</td><td style="padding: 10px; border: 1px solid #ccc; height: 110px;"></td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ccc; font-weight: bold; font-size: 12pt;">Government & Wealth</td><td style="padding: 10px; border: 1px solid #ccc; height: 110px;"></td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ccc; font-weight: bold; font-size: 12pt;">Science & Technology</td><td style="padding: 10px; border: 1px solid #ccc; height: 110px;"></td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ccc; font-weight: bold; font-size: 12pt;">Attitudes in Society</td><td style="padding: 10px; border: 1px solid #ccc; height: 110px;"></td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ccc; font-weight: bold; font-size: 12pt;">War</td><td style="padding: 10px; border: 1px solid #ccc; height: 110px;"></td></tr>
        </tbody>
      </table>
    </div>
    `;
  }

  if (appendixData.length > 0) {
      html += `<div style="page-break-before: always; padding: 20px;">`;
      html += `<h2 style="text-align: center; font-size: 24pt; margin-bottom: 10px; font-family: 'Playfair Display', serif; color: #1a237e;">Appendix: Further Watching</h2>`;
      html += `<p style="text-align: center; font-size: 11pt; margin-bottom: 15px; color: #475569;">Scan the QR codes below to watch historical documentaries and videos related to each lesson. Use these for independent revision or homework.</p>`;
      
      appendixData.forEach(appx => {
          html += `<h3 style="margin-top: 30px; margin-bottom: 10px; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 5px;">${formatText(appx.title)}</h3>`;
          html += `<div style="display: block; text-align: center;">`;
          appx.videos.forEach(v => {
              let qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(v.url)}`;
              let vTitle = v.title || "Historical Video";
              let vDuration = v.duration || "Short clip";
              html += `<div style="width: 32%; box-sizing: border-box; border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px; background: #f8fafc;  display: inline-block; vertical-align: top; margin: 1%; text-align: center;">
                  <img src="${qrUrl}" style="width: 100px; height: 100px; margin-bottom: 15px; border: 1px solid #ccc; padding: 5px; background: white; ">
                  <div style="font-weight: 600; font-size: 10.5pt; color: #1e293b; margin-bottom: 8px; line-height: 1.3;">${vTitle}</div>
                  <div style="font-size: 9pt; color: #64748b; font-style: italic; margin-top: auto;">${vDuration}</div>
              </div>`;
          });
          html += `</div>`;
      });
      html += `</div>`;
  }

  const genDate = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
  html += `<div style="text-align: center; margin-top: 50px; font-size: 8pt; color: #94a3b8;  border-top: 1px solid #e2e8f0; padding-top: 10px; font-family: sans-serif;">Generated: ${genDate} | Unit: ${unitId}</div>`;
  html += `</body></html>`;
  
  // Fix any root-absolute paths in injected HTML so they work locally/in PDFs
  html = html.replace(/src="\/units\//g, 'src="../../units/');
  html = html.replace(/src="\/images\//g, 'src="../../images/');
  html = html.replace(/src="\/assets\//g, 'src="../../assets/');

  const filename = period.name === 'full' ? 'workbook.html' : `workbook_${period.name}.html`;
  const outPath = path.join(publicUnitsDir, unitId, filename);
  fs.writeFileSync(outPath, html);
  console.log(`Generated ${outPath}`);
  });
});
