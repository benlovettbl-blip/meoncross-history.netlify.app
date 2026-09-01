const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { PATHS } = require('./config.cjs');

const publicDir = PATHS.PUBLIC;
const pdfsDir = PATHS.PDFS;

if (!fs.existsSync(pdfsDir)) {
    fs.mkdirSync(pdfsDir, { recursive: true });
}

// Year Group Mappings
const curriculumMap = {
    "Year 7": ['water_and_sanitation', 'medieval_england', 'early_modern_world'],
    "Year 8": ['industrialisation_and_empire', 'australia', 'great_war'],
    "Year 9": ['great_war_part2', 'the_shoah', 'cold_war', 'second_world_war', 'post_war_britain'],
    "Year 10": ['cme_new', 'weimar_nazi_germany'],
    "Year 11": ['edexcel_medicine', 'eee']
};

const commonHead = `
    <head>
        <meta charset="UTF-8">
        <title>Meoncross History Hub</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700;800&display=swap');
            body { font-family: 'Outfit', sans-serif; color: #1e293b; background: #fff; margin: 0; padding: 0; font-size: 11pt; line-height: 1.5; }
            h1, h2, h3, h4 { font-family: 'Playfair Display', serif; color: #0c2340; margin-top: 0; }
            .cover-page { height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; background: #f8fafc; border: 10px solid #d4af37; padding: 40px; box-sizing: border-box; }
            .cover-title { font-size: 48pt; font-weight: 700; color: #0c2340; margin-bottom: 20px; }
            .cover-subtitle { font-size: 24pt; color: #d4af37; font-family: 'Outfit', sans-serif; font-weight: 300; text-transform: uppercase; letter-spacing: 2px; }
            .page-break { page-break-before: always; }
            .container { padding: 40px 60px; }
            .header-banner { background: #0c2340; color: #fff; padding: 20px; text-align: center; border-radius: 8px; margin-bottom: 30px; border-bottom: 4px solid #d4af37; }
            .header-banner h1 { color: #fff; margin: 0; font-size: 24pt; }
            .year-section { margin-bottom: 40px; }
            .year-title { background: #d4af37; color: #0c2340; padding: 10px 20px; border-radius: 4px; font-size: 18pt; margin-bottom: 20px; display: inline-block; font-family: 'Outfit', sans-serif; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
            .unit-card { border: 1px solid #cbd5e1; border-radius: 8px; padding: 20px; margin-bottom: 20px; background: #f1f5f9; border-left: 5px solid #0c2340; }
            .unit-card h3 { font-size: 16pt; margin-bottom: 10px; color: #0c2340; }
            .unit-card .enquiry { font-weight: 600; color: #b89c30; font-size: 12pt; margin-bottom: 10px; }
            .unit-card .desc { font-size: 11pt; color: #475569; }
            
            /* SOW Styles */
            .sow-unit-header { background: #0c2340; color: #fff; padding: 20px; border-radius: 8px 8px 0 0; border-bottom: 4px solid #d4af37; margin-bottom: 20px; }
            .sow-unit-header h2 { color: #fff; margin: 0 0 10px 0; font-size: 22pt; }
            .sow-unit-header p { margin: 0; color: #e2e8f0; font-family: 'Outfit', sans-serif; font-size: 12pt; }
            .primer-box { background: #fef3c7; border: 1px solid #fde68a; border-left: 4px solid #d97706; padding: 15px; border-radius: 4px; margin-bottom: 25px; }
            .primer-box h4 { margin: 0 0 10px 0; color: #92400e; font-family: 'Outfit', sans-serif; text-transform: uppercase; font-size: 10pt; letter-spacing: 1px; }
            
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; page-break-inside: auto; }
            tr { page-break-inside: avoid; page-break-after: auto; }
            th { background: #e2e8f0; color: #0f172a; text-align: left; padding: 12px; font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 11pt; border: 1px solid #cbd5e1; }
            td { padding: 12px; border: 1px solid #cbd5e1; vertical-align: top; font-size: 10.5pt; color: #334155; }
            
            .lesson-num { font-weight: 700; color: #0c2340; white-space: nowrap; }
            .lesson-title { font-weight: 700; margin-bottom: 5px; color: #1e40af; font-size: 11pt; }
            .do-now { background: #f8fafc; padding: 8px; border-radius: 4px; border: 1px solid #e2e8f0; font-size: 9pt; margin-top: 5px; }
            .do-now-title { font-weight: 700; color: #64748b; text-transform: uppercase; font-size: 8pt; margin-bottom: 4px; }
            
            .hinge-question { color: #b91c1c; font-style: italic; font-weight: 600; margin-top: 8px; display: block; border-left: 2px solid #ef4444; padding-left: 8px; }
            .key-obj { color: #047857; font-weight: 600; margin-bottom: 4px; display: block; }
            
            .vocab-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 30px; }
            .vocab-item { border: 1px solid #e2e8f0; padding: 10px; border-radius: 4px; background: #fff; }
            .vocab-term { font-weight: 700; color: #0c2340; margin-bottom: 4px; }
            .vocab-def { font-size: 9.5pt; color: #475569; }
        </style>
    </head>
`;

function generateOverviewHTML(db) {
    let html = `<!DOCTYPE html><html lang="en">${commonHead}<body>`;
    
    html += `
        <div class="cover-page">
            <div class="cover-title">Meoncross History Hub</div>
            <div class="cover-subtitle">5-Year Curriculum Overview</div>
            <div style="margin-top: 40px; font-size: 14pt; color: #475569;">Key Stage 3 & 4 (Years 7 - 11)</div>
        </div>
        <div class="page-break"></div>
        <div class="container">
            <div class="header-banner">
                <h1>History Curriculum Map</h1>
            </div>
    `;

    for (const [yearGroup, unitIds] of Object.entries(curriculumMap)) {
        html += `<div class="year-section"><div class="year-title">${yearGroup}</div>`;
        for (const uid of unitIds) {
            const unitData = db[uid]?.data;
            if (!unitData) continue;
            
            const title = unitData.title || uid;
            const enquiry = unitData.enquiry || unitData.enquiry_question || '';
            const desc = unitData.desc || (unitData.lessons && unitData.lessons.length ? 'An in-depth study featuring ' + unitData.lessons.length + ' lessons.' : '');

            html += `
                <div class="unit-card">
                    <h3>${title}</h3>
                    ${enquiry ? `<div class="enquiry"><strong style="color:#0c2340">Enquiry:</strong> ${enquiry}</div>` : ''}
                    <div class="desc">${desc}</div>
                </div>
            `;
        }
        html += `</div>`;
    }
    html += `</div></body></html>`;
    
    const outPath = path.join(publicDir, 'curriculum_overview.html');
    fs.writeFileSync(outPath, html);
    return outPath;
}

function generateSOWHTML(db) {
    let html = `<!DOCTYPE html><html lang="en">${commonHead}<body>`;

    html += `
        <div class="cover-page">
            <div class="cover-title">Meoncross History Hub</div>
            <div class="cover-subtitle">Detailed Scheme of Work</div>
            <div style="margin-top: 40px; font-size: 14pt; color: #475569;">Teacher Companion Guide</div>
        </div>
        <div class="page-break"></div>
    `;

    for (const [yearGroup, unitIds] of Object.entries(curriculumMap)) {
        for (const uid of unitIds) {
            const unitData = db[uid]?.data;
            if (!unitData) continue;
            
            const title = unitData.title || uid;
            const enquiry = unitData.enquiry || unitData.enquiry_question || '';
            
            html += `<div class="container">`;
            html += `
                <div class="sow-unit-header">
                    <h2>${title}</h2>
                    <p><strong>${yearGroup}</strong> ${enquiry ? '| ' + enquiry : ''}</p>
                </div>
            `;

            if (unitData.teacher_notes && unitData.teacher_notes.primer) {
                html += `
                    <div class="primer-box">
                        <h4>Pedagogical Goals & Primer</h4>
                        <div>${unitData.teacher_notes.primer}</div>
                    </div>
                `;
            }

            if (unitData.lessons && unitData.lessons.length > 0) {
                html += `
                    <table>
                        <thead>
                            <tr>
                                <th style="width: 8%">Lsn</th>
                                <th style="width: 27%">Title & Objectives</th>
                                <th style="width: 25%">Retrieval (Do Now)</th>
                                <th style="width: 40%">Core Narrative & Assessment</th>
                            </tr>
                        </thead>
                        <tbody>
                `;
                
                unitData.lessons.forEach((lesson, idx) => {
                    let doNowHTML = '-';
                    if (lesson.do_now) {
                        if (Array.isArray(lesson.do_now)) {
                            doNowHTML = `<div class="do-now"><div class="do-now-title">Q&A Recall</div>` + 
                                lesson.do_now.map(dn => `• ${dn.question}`).join('<br>') + `</div>`;
                        } else if (lesson.do_now.type === 'timeline') {
                            doNowHTML = `<div class="do-now"><div class="do-now-title">Timeline Sequencing</div>Sort events into chronological order.</div>`;
                        } else if (lesson.do_now.type === 'vocab') {
                            doNowHTML = `<div class="do-now"><div class="do-now-title">Vocabulary Match</div>Match key terms to definitions.</div>`;
                        }
                    }

                    let hinge = '';
                    if (unitData.teacher_notes && unitData.teacher_notes.objectives) {
                        const objMatch = unitData.teacher_notes.objectives.find(o => lesson.learning_objective && o.objective === lesson.learning_objective);
                        if (objMatch && objMatch.question) {
                            hinge = objMatch.question;
                        }
                    }

                    let narrativeSummary = 'Focuses on the core historical narrative and primary sources.';
                    if (lesson.content_blocks && lesson.content_blocks.length > 0) {
                        const headings = lesson.content_blocks.map(b => b.heading).filter(Boolean);
                        if (headings.length > 0) {
                            narrativeSummary = headings.join(' • ');
                        }
                    }

                    html += `
                        <tr>
                            <td class="lesson-num">${idx + 1}</td>
                            <td>
                                <div class="lesson-title">${lesson.title}</div>
                                ${lesson.learning_objective ? `<span class="key-obj">Objective: ${lesson.learning_objective}</span>` : ''}
                            </td>
                            <td>${doNowHTML}</td>
                            <td>
                                <div>${narrativeSummary}</div>
                                ${hinge ? `<span class="hinge-question">Hinge Q: ${hinge}</span>` : ''}
                            </td>
                        </tr>
                    `;
                });
                
                html += `</tbody></table>`;
            }

            if (unitData.glossary && unitData.glossary.length > 0) {
                html += `
                    <h3 style="color: #0c2340; border-bottom: 2px solid #cbd5e1; padding-bottom: 5px; margin-top: 40px;">Required Vocabulary</h3>
                    <div class="vocab-grid">
                `;
                unitData.glossary.forEach(v => {
                    html += `
                        <div class="vocab-item">
                            <div class="vocab-term">${v.term}</div>
                            <div class="vocab-def">${v.definition}</div>
                        </div>
                    `;
                });
                html += `</div>`;
            }

            if (unitData.key_individuals && unitData.key_individuals.length > 0) {
                html += `
                    <h3 style="color: #0c2340; border-bottom: 2px solid #cbd5e1; padding-bottom: 5px; margin-top: 40px;">Key Historical Figures</h3>
                    <div class="vocab-grid">
                `;
                unitData.key_individuals.forEach(ind => {
                    html += `
                        <div class="vocab-item">
                            <div class="vocab-term">${ind.name}</div>
                            <div class="vocab-def">${ind.role}</div>
                        </div>
                    `;
                });
                html += `</div>`;
            }

            html += `</div><div class="page-break"></div>`;
        }
    }

    html += `</body></html>`;
    const outPath = path.join(publicDir, 'scheme_of_work.html');
    fs.writeFileSync(outPath, html);
    return outPath;
}

(async () => {
    const dbPath = path.join(publicDir, 'database.json');
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    console.log('Generating HTML templates...');
    const overviewHtmlPath = generateOverviewHTML(db);
    const sowHtmlPath = generateSOWHTML(db);
    
    console.log('Launching Puppeteer to create PDFs...');
    const browser = await puppeteer.launch({ headless: 'new' });
    
    // 1. Generate Overview PDF
    console.log('Rendering Curriculum Overview PDF...');
    const page1 = await browser.newPage();
    await page1.goto(require('url').pathToFileURL(overviewHtmlPath).href, { waitUntil: 'networkidle0' });
    const overviewPdfPath = path.join(pdfsDir, 'whole_school_curriculum_overview.pdf');
    await page1.pdf({
        path: overviewPdfPath,
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: '<div></div>',
        footerTemplate: '<div style="font-size:10px; width:100%; text-align:center; font-family: sans-serif; color: #94a3b8;">Meoncross History Hub - Curriculum Overview | Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
        margin: { top: '15mm', right: '15mm', bottom: '25mm', left: '15mm' }
    });
    console.log('✅ Success! Overview PDF saved to: ' + overviewPdfPath);
    
    // 2. Generate SOW PDF
    console.log('Rendering Scheme of Work PDF...');
    const page2 = await browser.newPage();
    await page2.goto(require('url').pathToFileURL(sowHtmlPath).href, { waitUntil: 'networkidle0' });
    const sowPdfPath = path.join(pdfsDir, 'whole_school_scheme_of_work.pdf');
    await page2.pdf({
        path: sowPdfPath,
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: '<div></div>',
        footerTemplate: '<div style="font-size:10px; width:100%; text-align:center; font-family: sans-serif; color: #94a3b8;">Meoncross History Hub - Detailed Scheme of Work | Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
        margin: { top: '15mm', right: '15mm', bottom: '25mm', left: '15mm' }
    });
    console.log('✅ Success! Scheme of Work PDF saved to: ' + sowPdfPath);
    
    await browser.close();
})();
