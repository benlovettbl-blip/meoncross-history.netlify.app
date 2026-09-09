/**
 * analyze_spec_coverage.cjs
 *
 * Cross-references all official Edexcel GCSE past exam questions (2018-2026)
 * against the official Edexcel Specification bullet points to compute:
 * 1. Topic exam frequency (appearance count)
 * 2. Years appeared & Last Examined year
 * 3. Overdue Priority Index (High / Medium / Recent)
 * 4. High-Tariff Gaps (Topics tested only as 4m that have never appeared as 12m/16m essays)
 * 5. Pedagogical Teacher Advice for mock exams and revision planning
 *
 * Output: public/data/edexcel_medicine_trend_analysis.json
 *         public/data/cme_new_trend_analysis.json
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const PUBLIC_DATA_DIR = path.join(__dirname, '..', 'public', 'data');

// ----------------------------------------------------------------------------
// Topic Matchers & Keyword Mappings
// ----------------------------------------------------------------------------

function matchQuestionToTopic(q, topicTitle, pointText) {
  const fullQ = (
    q.question_text +
    ' ' +
    (q.topic || '') +
    ' ' +
    (q.spec_topic || '') +
    ' ' +
    (q.stimulus || '')
  ).toLowerCase();
  const text = (topicTitle + ' ' + pointText).toLowerCase();

  // Keyword rules for Medicine
  if (
    fullQ.includes('blood transfusion') ||
    fullQ.includes('storage of blood') ||
    fullQ.includes('blood depot')
  ) {
    if (text.includes('blood transfusion') || text.includes('storage of blood')) return true;
  }
  if (fullQ.includes('thomas splint')) {
    if (text.includes('thomas splint')) return true;
  }
  if (fullQ.includes('gas attack') || (fullQ.includes('gas') && fullQ.includes('western front'))) {
    if (
      text.includes('gas') ||
      text.includes('chlorine') ||
      text.includes('phosgene') ||
      text.includes('mustard')
    )
      return true;
  }
  if (
    fullQ.includes('trench foot') ||
    fullQ.includes('trench fever') ||
    fullQ.includes('shell shock') ||
    fullQ.includes('trench environment')
  ) {
    if (
      text.includes('trench foot') ||
      text.includes('trench fever') ||
      text.includes('shell shock') ||
      text.includes('ill health')
    )
      return true;
  }
  if (
    fullQ.includes('stretcher') ||
    fullQ.includes('transporting wounded') ||
    fullQ.includes('ambulance') ||
    fullQ.includes('evacuation chain')
  ) {
    if (
      text.includes('transport') ||
      text.includes('stretcher') ||
      text.includes('ambulance') ||
      text.includes('evacuation')
    )
      return true;
  }
  if (
    fullQ.includes('casualty clearing station') ||
    fullQ.includes('ccs') ||
    fullQ.includes('dressing station')
  ) {
    if (
      text.includes('casualty clearing station') ||
      text.includes('dressing station') ||
      text.includes('chain of evacuation')
    )
      return true;
  }
  if (fullQ.includes('arras') || fullQ.includes('underground hospital')) {
    if (text.includes('arras') || text.includes('tunnels') || text.includes('quarries'))
      return true;
  }
  if (
    fullQ.includes('wound excision') ||
    fullQ.includes('carrel-dakin') ||
    fullQ.includes('debridement') ||
    fullQ.includes('treatment of wounds')
  ) {
    if (
      text.includes('wound excision') ||
      text.includes('carrel-dakin') ||
      text.includes('antiseptic') ||
      text.includes('infection')
    )
      return true;
  }
  if (fullQ.includes('x-ray') || fullQ.includes('roentgen')) {
    if (text.includes('x-ray') || text.includes('roentgen')) return true;
  }

  // Medicine Section B Thematic Study
  if (fullQ.includes('four humours') || fullQ.includes('theory of opposites')) {
    if (text.includes('four humours') || text.includes('opposites')) return true;
  }
  if (fullQ.includes('galen') || fullQ.includes('hippocrates')) {
    if (text.includes('galen') || text.includes('hippocrates')) return true;
  }
  if (fullQ.includes('medieval') && (fullQ.includes('physician') || fullQ.includes('doctor'))) {
    if (text.includes('physician') || text.includes('healers') || text.includes('apothecar'))
      return true;
  }
  if (fullQ.includes('hospital') || fullQ.includes('nightingale')) {
    if (text.includes('hospital') || text.includes('nightingale')) return true;
  }
  if (fullQ.includes('black death') || fullQ.includes('1348')) {
    if (text.includes('black death') || text.includes('1348')) return true;
  }
  if (fullQ.includes('great plague') || fullQ.includes('1665')) {
    if (text.includes('great plague') || text.includes('1665')) return true;
  }
  if (fullQ.includes('vesalius')) {
    if (text.includes('vesalius') || text.includes('anatomy')) return true;
  }
  if (fullQ.includes('william harvey') || fullQ.includes('circulation')) {
    if (text.includes('harvey') || text.includes('circulation')) return true;
  }
  if (fullQ.includes('sydenham')) {
    if (text.includes('sydenham')) return true;
  }
  if (fullQ.includes('printing press')) {
    if (text.includes('printing press')) return true;
  }
  if (fullQ.includes('royal society')) {
    if (text.includes('royal society')) return true;
  }
  if (fullQ.includes('jenner') || fullQ.includes('smallpox') || fullQ.includes('vaccin')) {
    if (text.includes('jenner') || text.includes('vaccination') || text.includes('smallpox'))
      return true;
  }
  if (fullQ.includes('snow') || fullQ.includes('cholera') || fullQ.includes('broad street')) {
    if (text.includes('snow') || text.includes('cholera')) return true;
  }
  if (fullQ.includes('pasteur') || fullQ.includes('germ theory') || fullQ.includes('koch')) {
    if (text.includes('pasteur') || text.includes('germ theory') || text.includes('koch'))
      return true;
  }
  if (fullQ.includes('anaesthetic') || fullQ.includes('chloroform') || fullQ.includes('simpson')) {
    if (text.includes('anaesthetic') || text.includes('chloroform') || text.includes('simpson'))
      return true;
  }
  if (fullQ.includes('antiseptic') || fullQ.includes('lister') || fullQ.includes('carbolic')) {
    if (text.includes('antiseptic') || text.includes('lister') || text.includes('aseptic'))
      return true;
  }
  if (fullQ.includes('public health act') || fullQ.includes('1875')) {
    if (text.includes('public health act') || text.includes('1875') || text.includes('sanitation'))
      return true;
  }
  if (fullQ.includes('dna') || fullQ.includes('genetics') || fullQ.includes('human genome')) {
    if (text.includes('dna') || text.includes('genetic')) return true;
  }
  if (
    fullQ.includes('penicillin') ||
    fullQ.includes('fleming') ||
    fullQ.includes('florey') ||
    fullQ.includes('chain')
  ) {
    if (text.includes('penicillin') || text.includes('antibiotic')) return true;
  }
  if (
    fullQ.includes('nhs') ||
    fullQ.includes('national health service') ||
    fullQ.includes('bevan')
  ) {
    if (
      text.includes('nhs') ||
      text.includes('national health service') ||
      text.includes('access to care')
    )
      return true;
  }
  if (fullQ.includes('lifestyle') || fullQ.includes('smoking') || fullQ.includes('anti-smoking')) {
    if (text.includes('lifestyle') || text.includes('smoking') || text.includes('lung cancer'))
      return true;
  }

  // CME Matching
  if (fullQ.includes('king david hotel')) {
    if (text.includes('king david hotel')) return true;
  }
  if (fullQ.includes('resolution 181') || fullQ.includes('partition')) {
    if (text.includes('resolution 181') || text.includes('partition')) return true;
  }
  if (
    fullQ.includes('1948-49') ||
    fullQ.includes('arab-israeli war (1948') ||
    fullQ.includes('arab- israeli war')
  ) {
    if (
      text.includes('1948–49') ||
      text.includes('1948-49') ||
      text.includes('aftermath of the 1948')
    )
      return true;
  }
  if (fullQ.includes('refugee') || fullQ.includes('palestinian arabs')) {
    if (text.includes('refugee') || text.includes('palestinian arabs')) return true;
  }
  if (fullQ.includes('law of return')) {
    if (text.includes('law of return')) return true;
  }
  if (fullQ.includes('israeli defence forces') || fullQ.includes('idf')) {
    if (text.includes('israeli defence forces') || text.includes('idf')) return true;
  }
  if (fullQ.includes('suez crisis') || fullQ.includes('1956')) {
    if (text.includes('suez crisis') || text.includes('1956')) return true;
  }
  if (fullQ.includes('nasser') && (fullQ.includes('leadership') || fullQ.includes('tension'))) {
    if (text.includes('nasser') || text.includes('leadership of the arab world')) return true;
  }
  if (fullQ.includes('six day war') || fullQ.includes('1967')) {
    if (text.includes('six day war') || text.includes('1967')) return true;
  }
  if (fullQ.includes('resolution 242')) {
    if (text.includes('resolution 242')) return true;
  }
  if (
    fullQ.includes('occupied territories') ||
    fullQ.includes('golan') ||
    fullQ.includes('west bank')
  ) {
    if (
      text.includes('occupied territories') ||
      text.includes('golan') ||
      text.includes('west bank')
    )
      return true;
  }
  if (
    fullQ.includes('munich') ||
    fullQ.includes('black september') ||
    fullQ.includes('terrorism')
  ) {
    if (text.includes('munich') || text.includes('black september') || text.includes('terrorism'))
      return true;
  }
  if (fullQ.includes('airplane hijack') || fullQ.includes('pflp')) {
    if (text.includes('airplane hijack') || text.includes('pflp')) return true;
  }
  if (fullQ.includes('yom kippur') || fullQ.includes('1973')) {
    if (text.includes('yom kippur') || text.includes('1973')) return true;
  }
  if (fullQ.includes('oil crisis') || fullQ.includes('opec')) {
    if (text.includes('oil crisis') || text.includes('opec')) return true;
  }
  if (
    fullQ.includes('sadat') ||
    fullQ.includes('camp david') ||
    fullQ.includes('peace treaty (1979)')
  ) {
    if (text.includes('sadat') || text.includes('camp david') || text.includes('peace treaty'))
      return true;
  }
  if (fullQ.includes('kissinger') || fullQ.includes('shuttle diplomacy')) {
    if (text.includes('kissinger') || text.includes('shuttle diplomacy')) return true;
  }
  if (fullQ.includes('lebanon') || fullQ.includes('1982') || fullQ.includes('beirut')) {
    if (text.includes('lebanon') || text.includes('1982')) return true;
  }
  if (fullQ.includes('intifada')) {
    if (text.includes('intifada')) return true;
  }
  if (fullQ.includes('oslo') || fullQ.includes('1993') || fullQ.includes('rabin')) {
    if (
      text.includes('oslo') ||
      text.includes('rabin') ||
      text.includes('declaration of principles')
    )
      return true;
  }
  if (fullQ.includes('israel-jordan') || fullQ.includes('1994')) {
    if (text.includes('israel-jordan') || text.includes('1994')) return true;
  }

  return false;
}

// ----------------------------------------------------------------------------
// Process Unit Specification Analysis
// ----------------------------------------------------------------------------

function analyzeUnit(specFile, pastPapersFile, unitId) {
  const spec = JSON.parse(fs.readFileSync(specFile, 'utf8'));
  const pastData = JSON.parse(fs.readFileSync(pastPapersFile, 'utf8'));

  // Flatten all questions
  const allQuestions = [];
  pastData.papers.forEach((p) => {
    p.questions.forEach((q) => {
      allQuestions.push({
        ...q,
        year: p.year,
        season: p.season,
        series: p.series,
      });
    });
  });

  const analysis = {
    unit_id: unitId,
    title: spec.title || 'GCSE History Specification',
    subtitle: spec.subtitle || '',
    generated_at: new Date().toISOString(),
    total_past_questions: allQuestions.length,
    total_series_analyzed: pastData.papers.length,
    sections: [],
  };

  let totalPoints = 0;
  let totalOverdue = 0;
  let totalHighTariffGaps = 0;

  spec.sections.forEach((sec) => {
    const secAnalysis = {
      id: sec.id,
      title: sec.title,
      topics: [],
    };

    sec.topics.forEach((top) => {
      const topAnalysis = {
        title: top.title,
        points: [],
      };

      top.points.forEach((pt, idx) => {
        totalPoints++;
        const matchedQuestions = allQuestions.filter((q) => matchQuestionToTopic(q, top.title, pt));

        const yearsAppeared = [...new Set(matchedQuestions.map((q) => q.year))].sort(
          (a, b) => a - b,
        );
        const tariffs = [...new Set(matchedQuestions.map((q) => q.tariff))].sort((a, b) => a - b);
        const has12m = matchedQuestions.some((q) => q.tariff === 12);
        const has16m = matchedQuestions.some((q) => q.tariff === 16);
        const lastYear = yearsAppeared.length > 0 ? Math.max(...yearsAppeared) : null;

        let overdueStatus = 'high'; // default
        let overdueScore = 100;

        if (lastYear === null) {
          overdueStatus = 'high';
          overdueScore = 100; // Never examined!
        } else if (lastYear <= 2020) {
          overdueStatus = 'high';
          overdueScore = 80 + (2020 - lastYear) * 5;
        } else if (lastYear <= 2023) {
          overdueStatus = 'medium';
          overdueScore = 50;
        } else {
          overdueStatus = 'recent';
          overdueScore = 15;
        }

        if (overdueStatus === 'high') totalOverdue++;

        // High tariff gap: tested as 4m or never tested, but no 12m or 16m
        const isThematicSection = sec.id !== 'section-a';
        const highTariffGap = isThematicSection && !has12m && !has16m;
        if (highTariffGap) totalHighTariffGaps++;

        // Generate tailored teacher pedagogical notes
        let teacherNote = '';
        if (lastYear === null) {
          teacherNote =
            '⚠️ UNEXAMINED TOPIC: This specification point has never appeared on an official Edexcel paper since 2018. It is prime territory for an upcoming series.';
        } else if (overdueStatus === 'high') {
          teacherNote = `🔥 HIGHLY OVERDUE: Last set in ${lastYear}. It has been ${2026 - lastYear} years since students were tested on this topic. Ideal candidate for mocks.`;
        } else if (highTariffGap && tariffs.length > 0) {
          teacherNote = `🎯 ESSAY GAP: Examined previously as a ${tariffs.join('m, ')}m question, but NEVER set as a 12m or 16m essay. Watch out for an extended evaluation question.`;
        } else if (overdueStatus === 'recent') {
          teacherNote = `✅ RECENTLY TESTED: Examined in ${lastYear}. Less likely to appear as a high-tariff essay in the immediate next series, but still vulnerable to short feature/source questions.`;
        } else {
          teacherNote = `⚖️ BALANCED ROTATION: Examined in ${lastYear}. Keep in regular retrieval rotation.`;
        }

        topAnalysis.points.push({
          point_index: idx + 1,
          point_text: pt,
          exam_count: matchedQuestions.length,
          years_appeared: yearsAppeared,
          last_examined: lastYear ? lastYear : 'Never',
          tariffs_examined: tariffs,
          has_12m: has12m,
          has_16m: has16m,
          high_tariff_gap: highTariffGap,
          overdue_status: overdueStatus,
          overdue_score: overdueScore,
          matched_questions: matchedQuestions.map((q) => ({
            q_id: q.q_id,
            q_number: q.q_number,
            year: q.year,
            tariff: q.tariff,
            type: q.type,
            question_text: q.question_text,
          })),
          teacher_note: teacherNote,
        });
      });

      secAnalysis.topics.push(topAnalysis);
    });

    analysis.sections.push(secAnalysis);
  });

  analysis.summary_stats = {
    total_specification_points: totalPoints,
    overdue_topics_count: totalOverdue,
    high_tariff_gaps_count: totalHighTariffGaps,
    overdue_percentage: Math.round((totalOverdue / totalPoints) * 100),
  };

  return analysis;
}

// ----------------------------------------------------------------------------
// Run & Save Analyses
// ----------------------------------------------------------------------------

function run() {
  const medSpec = path.join(DATA_DIR, 'edexcel_medicine_spec.json');
  const medPast = path.join(PUBLIC_DATA_DIR, 'edexcel_medicine_past_papers.json');
  const medAnalysis = analyzeUnit(medSpec, medPast, 'edexcel_medicine');
  const medOut = path.join(PUBLIC_DATA_DIR, 'edexcel_medicine_trend_analysis.json');
  fs.writeFileSync(medOut, JSON.stringify(medAnalysis, null, 2), 'utf8');
  console.log(`[OK] Medicine Trend Analysis saved to ${medOut}`);
  console.log(
    `     Total Spec Points: ${medAnalysis.summary_stats.total_specification_points}, Overdue: ${medAnalysis.summary_stats.overdue_topics_count} (${medAnalysis.summary_stats.overdue_percentage}%)`,
  );

  const cmeSpec = path.join(DATA_DIR, 'cme_new_spec.json');
  const cmePast = path.join(PUBLIC_DATA_DIR, 'cme_new_past_papers.json');
  const cmeAnalysis = analyzeUnit(cmeSpec, cmePast, 'cme_new');
  const cmeOut = path.join(PUBLIC_DATA_DIR, 'cme_new_trend_analysis.json');
  fs.writeFileSync(cmeOut, JSON.stringify(cmeAnalysis, null, 2), 'utf8');
  console.log(`[OK] CME Trend Analysis saved to ${cmeOut}`);
  console.log(
    `     Total Spec Points: ${cmeAnalysis.summary_stats.total_specification_points}, Overdue: ${cmeAnalysis.summary_stats.overdue_topics_count} (${cmeAnalysis.summary_stats.overdue_percentage}%)`,
  );
}

run();
