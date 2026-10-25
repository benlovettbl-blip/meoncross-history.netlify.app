const fs = require('fs');
const path = require('path');

async function runAudit() {
  const dataMod = await import('../units/cme_new/data.js');
  const unitData = dataMod.unitData;

  console.log('================================================================');
  console.log('AUDIT REPORT: Conflict in the Middle East, 1945-1995 (cme_new)');
  console.log('================================================================\n');

  // 1. School Anonymity / Neutrality Audit
  const rawDataStr = fs.readFileSync(path.resolve(__dirname, '../units/cme_new/data.js'), 'utf8');
  const forbidden = ['m' + 'eon' + 'cross', 'fives' + 'master1', 'ben ', 'mr '];
  const anonymityMatches = [];
  forbidden.forEach(term => {
    const regex = new RegExp(term, 'gi');
    let m;
    while ((m = regex.exec(rawDataStr)) !== null) {
      anonymityMatches.push({ term, index: m.index, snippet: rawDataStr.slice(Math.max(0, m.index - 30), m.index + 30) });
    }
  });
  console.log(`1. ANONYMITY & BRANDING CHECK:`);
  if (anonymityMatches.length === 0) {
    console.log('   ✅ 100% Institutional Neutrality verified. No forbidden terms found.');
  } else {
    console.log(`   ❌ FOUND ${anonymityMatches.length} FORBIDDEN MATCHES:`);
    anonymityMatches.forEach(m => console.log(`      Term: "${m.term}" at snippet: ...${m.snippet.replace(/\n/g, ' ')}...`));
  }
  console.log('');

  // 2. Lesson Structure & Do Now Audit
  console.log(`2. LESSON STRUCTURE & DO NOW STARTERS AUDIT:`);
  const lessons = unitData.lessons || [];
  console.log(`   Total Lessons: ${lessons.length}`);
  
  lessons.forEach((l, idx) => {
    const doNow = l.do_now ? (Array.isArray(l.do_now) ? l.do_now : l.do_now.items || []) : (l.starter_retrieval || []);
    const sources = l.sources || [];
    const videos = l.video || [];
    console.log(`\n   --- Lesson ${idx + 1}: ${l.title || l.id} ---`);
    console.log(`       Do Now items: ${doNow.length}`);
    if (doNow.length > 0) {
      doNow.slice(0, 3).forEach((q, qIdx) => {
        const qText = typeof q === 'string' ? q : q.question || q.prompt || JSON.stringify(q);
        const qCategory = q.tier || q.category || 'recall';
        console.log(`         Q${qIdx + 1} [${qCategory}]: ${qText.slice(0, 85)}...`);
      });
      if (doNow.length > 3) console.log(`         ... and ${doNow.length - 3} more questions.`);
    } else {
      console.log(`       ⚠️ NO DO NOW STARTER QUESTIONS FOUND!`);
    }

    // 3. Source Context & Hinge Questions
    console.log(`       Sources: ${sources.length}`);
    sources.forEach((s, sIdx) => {
      const teacherNotes = s.teacher_notes || {};
      const context = teacherNotes.source_context || s.source_context || '';
      const hasHinge = context.toLowerCase().includes('hinge question') || context.toLowerCase().includes('hinge:');
      const hasModel = Boolean(s.model_answer || s.discussion_ideas);
      console.log(`         Source ${sIdx + 1} (${s.id || s.label || 'unnamed'}): Image="${s.image || s.src || 'none'}"`);
      console.log(`           - Has Context: ${Boolean(context)} | Has Hinge Question: ${hasHinge ? '✅' : '❌'} | Has Model Answer: ${hasModel ? '✅' : '❌'}`);
    });

    // 4. Videos Summary
    console.log(`       Videos: ${videos.length} (Pathways: ${videos.map(v => v.pathway).join(', ')})`);
  });

  // 5. Rights Database Check
  console.log('\n================================================================');
  console.log('3. MASTER RIGHTS DATABASE & PROVENANCE CHECK:');
  const rightsDbPath = path.resolve(__dirname, 'master_rights_database.json');
  if (fs.existsSync(rightsDbPath)) {
    const rightsDb = JSON.parse(fs.readFileSync(rightsDbPath, 'utf8'));
    console.log(`   Master Rights Database found.`);
    
    // Check which CME images are in the database
    let allCmeImages = [];
    lessons.forEach(l => {
      (l.sources || []).forEach(s => {
        if (s.image || s.src) allCmeImages.push({ lesson: l.id, image: s.image || s.src, title: s.title || s.caption, id: s.id });
      });
    });
    console.log(`   Total CME Lesson Source Images: ${allCmeImages.length}`);
    const cmeDbSources = (rightsDb.units && rightsDb.units.cme_new && rightsDb.units.cme_new.sources) || [];
    console.log(`   CME sources recorded in master_rights_database: ${cmeDbSources.length}`);

    let missingFromDb = 0;
    allCmeImages.forEach(img => {
      const cleanImgName = path.basename(img.image);
      const isRegistered = cmeDbSources.some(s => 
        (s.asset_path && s.asset_path.includes(cleanImgName)) ||
        (s.source_url && s.source_url.includes(cleanImgName)) ||
        (s.artifact_title && img.title && s.artifact_title.toLowerCase().includes(img.title.toLowerCase().slice(0, 15))) ||
        (s.source_id && img.id && s.source_id.toLowerCase() === img.id.toLowerCase())
      );
      if (!isRegistered) {
        console.log(`     ⚠️ Unregistered Image in DB: ${cleanImgName} (${img.lesson}: ${img.title || 'no title'})`);
        missingFromDb++;
      }
    });
    if (missingFromDb === 0) {
      console.log(`   ✅ 100% of CME Lesson Source Images are catalogued in Master Rights Database.`);
    } else {
      console.log(`   ⚠️ ${missingFromDb} CME source images missing from Master Rights Database.`);
    }
  } else {
    console.log('   ⚠️ master_rights_database.json not found!');
  }

  // 6. Textbook & Other Unit Materials Check
  console.log('\n================================================================');
  console.log('4. UNIT ANCILLARIES & TEXTBOOK / WORKBOOK CHECK:');
  const textbookPath = path.resolve(__dirname, '../public/textbooks/cme_new_textbook.html');
  const bookletPath = path.resolve(__dirname, '../public/workbooks/cme_new_workbook.html');
  console.log(`   28-Page Master Textbook file exists: ${fs.existsSync(textbookPath) ? '✅' : '❌'}`);
  console.log(`   Workbook file exists: ${fs.existsSync(bookletPath) ? '✅' : '❌'}`);

  // Check interactive tools in CME unitData
  console.log(`   Interactive Timeline entries: ${(unitData.timeline || []).length}`);
  console.log(`   Glossary terms: ${Object.keys(unitData.glossary || {}).length}`);
  console.log(`   Key Individuals: ${(unitData.key_individuals || []).length}`);
  console.log(`   Debate Prompts: ${(unitData.debatePrompts || []).length}`);
  console.log(`   Mock Exams: ${(unitData.mock_exams || []).length}`);
}

runAudit().catch(err => console.error(err));
