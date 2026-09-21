/**
 * Pedagogical Research & Disciplinary Evidence Bank
 * The History Revision Hub — Department Portal
 *
 * Houses evidence-grounded research briefings, cognitive science principles,
 * and practical classroom protocols for history educators.
 *
 * Auto-expansion protocol: Whenever pedagogical strategies (e.g. SEND adaptations,
 * disciplinary literacy, cognitive load, narrative architecture) are discussed
 * or refined, they are automatically synthesized and appended to this bank.
 */

export const PEDAGOGY_RESEARCH_BANK = [
  {
    id: 'counsell_disciplinary_narrative',
    author: 'Christine Counsell',
    affiliation: 'University of Cambridge / The Historical Association',
    category: 'Disciplinary History',
    categoryBadge: 'badge-blue',
    title: 'The Disciplinary Narrative Arc & Substantive vs Disciplinary Schema',
    subtitle:
      'Structuring History as an Enquiry-Driven Narrative Rather Than Isolated Fact Pellets',
    problem:
      'Pupils often experience history as disjointed fragments of information or dry chronological bullet points. Without an overarching narrative arc and rigorous enquiry question, they struggle to retain knowledge and fail to grasp historical significance, causation, or consequence.',
    evidence:
      'Counsell demonstrates that substantive historical knowledge (names, dates, concepts) is held together and rendered meaningful by "narrative glue". Residual knowledge (the enduring mental schema retained years later) is constructed only when pupils encounter rich, dramatic narrative journeys anchored to a disciplinary enquiry question.',
    implementation: [
      '4-Act Dramatic Structure in Every Lesson: Act 1 (Context & Catalyst), Act 2 (Escalation & Conflict), Act 3 (Forensic Archival Evidence), and Act 4 (Historical Verdict & Historiographical Debate).',
      'Pure [Act.Paragraph] Notation: Paragraphs are indexed cleanly as [1.1], [2.1], [3.1]. Eliminates cognitive clutter from sentence-level micro-indices ([1.1], [1.2], [1.3]) and trains pupils to cite forensic text blocks.',
      'Fingertip vs. Residual Knowledge Separation: Immediate high-tariff recall is tested in "Do Nows" so working memory is liberated for causal analysis during extended writing.',
      'Overarching Enquiry Questions: Lessons are phrased as genuine historical problems (e.g. "Why did peace prove so elusive?"), not factual labels.',
    ],
    teacherProtocols: [
      'Always frame the lesson around the central enquiry question before reading Act 1.',
      'Direct pupils to specific paragraphs using the [Act.Paragraph] reference rather than general page numbers.',
      'Differentiate between fingertip knowledge (needed for today’s debate) and residual knowledge (the conceptual schema that must endure).',
    ],
    citations: [
      'Counsell, C. (2000). "Historical knowledge and the curriculum", Teaching History, 100, pp. 54–71.',
      'Counsell, C. (2011). "Disciplinary knowledge for all, the secondary history curriculum and why text matters", The Curriculum Journal, 22(2).',
    ],
    links: [
      {
        title: 'Historical Association: Teaching History Journal',
        url: 'https://www.history.org.uk/secondary/categories/436/module/8702/teaching-history',
        displayText: 'www.history.org.uk/secondary/categories/436/module/8702/teaching-history',
      },
      {
        title: 'Christine Counsell: The Dignity of the Thing (Curriculum Design)',
        url: 'https://thedignityofthethingblog.wordpress.com/',
        displayText: 'thedignityofthethingblog.wordpress.com',
      },
    ],
  },
  {
    id: 'quigley_vocabulary_gap',
    author: 'Alex Quigley',
    affiliation: 'Education Endowment Foundation (EEF) / Author',
    category: 'Vocabulary & Literacy',
    categoryBadge: 'badge-amber',
    title: 'Closing the Vocabulary Gap & Disciplinary Literacy in History',
    subtitle:
      'Explicit Tier-2/3 Vocabulary Instruction, Golden Sentences, and Morphological Precision',
    problem:
      'Pupils from disadvantaged backgrounds and low-reading-age cohorts enter GCSE history classrooms with a vocabulary deficit of up to 4,000 words. When confronted with dense academic texts containing words like "armistice", "sovereignty", or "concession", they suffer comprehension failure.',
    evidence:
      'Quigley’s research shows that vocabulary is the chief predictor of academic success. Explicit, contextualized instruction of Tier-2 general academic words (e.g. "consolidate", "inevitable", "precipitate") alongside Tier-3 domain nouns (e.g. "annexation", "blockade") closes the attainment gap significantly faster than incidental exposure.',
    implementation: [
      'The Golden Sentence Routine: Pupils write a single, rigorous sentence synthesizing two Tier-3 vocabulary terms connected by a high-level subordinating conjunction (e.g. "Although Nasser blockaded the Straits of Tiran, Israel viewed this as an act of war...").',
      'Odd-One-Out Vocabulary Trios: Pupils analyze sets of three related historical terms, justifying which one does not belong based on historical causality rather than dictionary definitions.',
      'Immediate Margin Glossaries: Key vocabulary definitions are positioned immediately adjacent to the reading text to prevent split-attention and cognitive exhaustion from page-flipping.',
      'Morphology & Etymology Breakdowns: Highlighting Greek/Latin roots (e.g. "anti-", "pan-", "theo-") to build transferable lexical decoding skills.',
    ],
    teacherProtocols: [
      'Pre-teach 2–3 unfamiliar Tier-3 terms before commencing classroom reading of the narrative.',
      'Insist on the Golden Sentence format during oral debriefs: never accept simple one-clause answers.',
      'Use yellow highlighter live in the classroom to celebrate students who deploy target Tier-2 analytical connectives.',
    ],
    citations: [
      'Quigley, A. (2018). Closing the Vocabulary Gap. London: Routledge.',
      'Education Endowment Foundation (EEF) (2019). Improving Literacy in Secondary Schools: Guidance Report.',
    ],
    links: [
      {
        title: 'The Confident Teacher: Academic Literacy Blog',
        url: 'https://www.theconfidentteacher.co.uk/',
        displayText: 'www.theconfidentteacher.co.uk',
      },
      {
        title: 'EEF Guidance Report: Improving Literacy in Secondary Schools',
        url: 'https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/literacy-ks3-ks4',
        displayText:
          'educationendowmentfoundation.org.uk/education-evidence/guidance-reports/literacy-ks3-ks4',
      },
    ],
  },
  {
    id: 'hochman_wexler_writing_revolution',
    author: 'Judith Hochman & Natalie Wexler',
    affiliation: 'The Writing Revolution (TWR) Institute',
    category: 'Syntactic Writing',
    categoryBadge: 'badge-emerald',
    title: 'The Writing Revolution (TWR): Explicit Sentence-Level Scaffolding',
    subtitle: 'Mastering Sentence Complexity Before Demanding Multi-Page Extended Essays',
    problem:
      'Traditional history teaching often asks pupils to "write an essay on the causes of the Six-Day War" before they have mastered sentence mechanics. Pupils produce rambling, chronological run-on sentences lacking analytical causality, topic discipline, or evaluative balance.',
    evidence:
      'Hochman & Wexler demonstrated that writing is not a natural developmental milestone like speech; it must be taught explicitly. Developing syntactic control at the sentence level (coordinating and subordinating conjunctions) dramatically boosts reading comprehension, cognitive clarity, and essay quality.',
    implementation: [
      'Because / But / So Scaffolding: Converts simple chronological statements into nuanced historical analysis (e.g. "Nasser closed the Straits of Tiran BECAUSE...", "...BUT...", "...SO...").',
      'Pre-Crafted Evidence Stems: Provides analytical starting clauses ("A crucial factor was...", "This directly precipitated...") that reduce working memory burdens for lower-attaining and SEND writers.',
      'Structure Strips for Exam Practice: Step-by-step physical margin guides for 4-mark consequence, 8-mark narrative, and 16-mark essay tasks.',
      'Strict High-Tariff Model Answers: Eliminates vague placeholders with authentic, historically grounded model responses displaying exemplar syntax.',
    ],
    teacherProtocols: [
      'Do not jump straight to 16-mark essay writing without warming up with Because/But/So sentence stems.',
      'Teach subordinating conjunctions as causal operators: "Although" introduces counter-arguments, "Because" establishes primary cause, "Consequently" marks historical effect.',
      'Model the structure strip live under the visualizer before independent student writing.',
    ],
    citations: [
      'Hochman, J. C., & Wexler, N. (2017). The Writing Revolution: A Guide to Advancing Thinking Through Writing in All Subjects and Grades. San Francisco: Jossey-Bass.',
      'Graham, S., & Perin, D. (2007). Writing Next: Effective Strategies to Improve Writing of Adolescents in Middle and High Schools. Carnegie Corporation of New York.',
    ],
    links: [
      {
        title: 'The Writing Revolution Official Research & Resources',
        url: 'https://www.thewritingrevolution.org/',
        displayText: 'www.thewritingrevolution.org',
      },
      {
        title: 'EEF Guidance: Effective Writing in Secondary Classrooms',
        url: 'https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/literacy-ks3-ks4',
        displayText:
          'educationendowmentfoundation.org.uk/education-evidence/guidance-reports/literacy-ks3-ks4',
      },
    ],
  },
  {
    id: 'sweller_cognitive_load',
    author: 'John Sweller',
    affiliation: 'University of New South Wales / Cognitive Science',
    category: 'Cognitive Science',
    categoryBadge: 'badge-purple',
    title: 'Cognitive Load Theory & The Dual-Column Smartboard Measure',
    subtitle: 'Minimizing Extraneous Load to Maximize Germane Schema Construction',
    problem:
      'When learning resources feature unconstrained line lengths (100–150 characters across widescreen interactive whiteboards), visually cluttered layouts, or split information requiring back-and-forth page flipping, working memory is rapidly exhausted by visual processing rather than historical analysis.',
    evidence:
      'Sweller’s Cognitive Load Theory identifies that working memory can hold only 4 to 7 items simultaneously. Extraneous cognitive load (caused by poor presentation and eye tracking fatigue) actively sabotages long-term memory encoding. Research in typographic ergonomics proves optimal reading comprehension occurs at 50–65 characters per line.',
    implementation: [
      'Two-Column Responsive Reading Measure (50–65 Characters): Eliminates "eye-sweep tracking fatigue" on both classroom smartboards (1080p/4K) and printed A4 textbooks.',
      'Left-Margin Line Numbering (Every 5 Lines): Enables instantaneous teacher signposting ("Look at line 15, class") eliminating disorientation.',
      'Split-Attention Elimination: Primary sources, historical maps, and glossary terms are co-located alongside the narrative text rather than buried in distant appendices.',
      'Rigid Page Budgeting: 16-page consumable workbooks with 0px overflow prevent cognitive panic caused by spilling text and erratic margins.',
    ],
    teacherProtocols: [
      'Utilize line numbers actively during whole-class reading to maintain focus for pupils with tracking difficulties.',
      'Ensure the smartboard display uses the 2-column view to prevent pupils losing their place during shared reading.',
      'Keep visual diagrams directly aligned with explanatory text; never refer to a source on a distant page without visual anchor.',
    ],
    citations: [
      'Sweller, J. (1988). "Cognitive load during problem solving: Effects on learning", Cognitive Science, 12(2), pp. 257–285.',
      'Sweller, J., van Merriënboer, J. J., & Paas, F. (2019). "Cognitive architecture and instructional design: 20 years later", Educational Psychology Review, 31(2), pp. 261–292.',
    ],
    links: [
      {
        title: 'EEF Guidance Report: Cognitive Science Approaches in the Classroom',
        url: 'https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/cognitive-science-approaches-in-the-classroom',
        displayText:
          'educationendowmentfoundation.org.uk/education-evidence/guidance-reports/cognitive-science-approaches-in-the-classroom',
      },
      {
        title: 'Centre for Independent Studies: Cognitive Load Theory in Practice',
        url: 'https://www.cis.org.au/research/cognitive-load-theory/',
        displayText: 'www.cis.org.au/research/cognitive-load-theory',
      },
    ],
  },
  {
    id: 'send_inclusive_accessibility',
    author: 'Special Educational Needs & Disabilities (SEND) Working Group',
    affiliation: 'Evidence-Based Classroom Practice & SEND Co-ordination',
    category: 'SEND & Inclusion',
    categoryBadge: 'badge-rose',
    title: 'SEND in the History Classroom: High-Yield Strategies for Neurodiverse Learners',
    subtitle:
      'What Actually Works (and What Fails) for Dyslexic, ADHD, and Low-Processing Students',
    problem:
      'History is a text-heavy, conceptually abstract discipline. Pupils with dyslexia, ADHD, processing speed delays, and working memory deficits are frequently overwhelmed by unstructured "walls of text", vague essay prompts, and rapid-fire questions, leading to cognitive fatigue, learned helplessness, and disengagement.',
    evidence:
      'Research synthesized by the EEF and the British Dyslexia Association indicates that effective SEND provision in mainstream classrooms does not require watering down curriculum rigor. Rather, it requires high structure: predictable typography, reduced visual noise, pre-chunked reading blocks, explicit sentence starters, and verbal modeling.',
    implementation: [
      'What DOES NOT Work (Strictly Prohibited in Our System):',
      '❌ Unchunked "walls of text" with full-width screen spans (triggers visual tracking errors and dyslexia line-skipping).',
      '❌ Sentence-by-sentence micro-indices [1.1], [1.2], [1.3] (creates cognitive clutter and visually fragments paragraphs).',
      '❌ Vague, open-ended extended writing prompts without structure strips or evidence stems.',
      '❌ Requiring pupils to read a text on page 3 while answering questions on page 9 (severe split-attention failure).',
      'What DOES Work (Enforced Across All Workbooks & Digital Hub):',
      '✅ 50–65 Character Line Length: Dual-column layout provides short, manageable eye-sweeps that prevent line-skipping.',
      '✅ Chunked 4-Act Narratives: Reading is broken into distinct acts, each under 200 words, punctuated by targeted visual sources.',
      '✅ Physical Handwriting Lines with 7.2mm Spacing: Accommodates dysgraphic handwriting and motor control needs.',
      '✅ Pre-Crafted Sentence Openers: Lowers the processing threshold to begin writing, allowing pupils to focus on historical thinking.',
      '✅ Instant Audio Read-Aloud: Digital app synthesizer allows dual sensory input (listening while following along with the text).',
    ],
    teacherProtocols: [
      'Read narrative sections aloud with the class using the 2-column measure before asking SEND pupils to engage independently.',
      'Direct dyslexic pupils to use physical bookmarks or rulers along the line-numbered margin to support visual tracking.',
      'Praise high-level historical reasoning in verbal discussion, then supply the exact sentence stem to help them encode it in writing.',
    ],
    citations: [
      'Education Endowment Foundation (EEF) (2020). Special Educational Needs in Mainstream Schools: Guidance Report.',
      'British Dyslexia Association (2021). Dyslexia Style Guide: Creating Dyslexia Friendly Content.',
    ],
    links: [
      {
        title: 'EEF Guidance Report: Special Educational Needs in Mainstream Schools',
        url: 'https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/send',
        displayText: 'educationendowmentfoundation.org.uk/education-evidence/guidance-reports/send',
      },
      {
        title: 'British Dyslexia Association: Classroom Style Guide & Strategies',
        url: 'https://www.bdadyslexia.org.uk/advice-and-resources/educators',
        displayText: 'www.bdadyslexia.org.uk/advice-and-resources/educators',
      },
    ],
  },
  {
    id: 'rosenshine_retrieval_practice',
    author: 'Barak Rosenshine',
    affiliation: 'University of Illinois / Principles of Instruction',
    category: 'Retrieval & Instruction',
    categoryBadge: 'badge-teal',
    title: 'Rosenshine’s Principles: Isolated Prior-Learning Retrieval & Hinge Questions',
    subtitle: 'Daily Spaced Practice Without Conflating Prior Memory with Unfamiliar Content',
    problem:
      'When bell-ringer or "Do Now" starter activities ask questions about content that has not yet been taught, pupils guess randomly, experience frustration, and encode historical misconceptions into working memory.',
    evidence:
      'Rosenshine’s Principles of Instruction prove that the most effective teachers begin lessons with a brief review of previously mastered knowledge. Daily retrieval practice strengthens synaptic memory traces, making recall automatic and freeing cognitive bandwidth for complex new material.',
    implementation: [
      'Strict Pedagogical Recall Isolation: "Do Now" activities strictly test recall from prior lessons or units. They NEVER ask about content from today\'s lesson.',
      'Hinge Questions in Teacher Notes: Every lesson objective includes an actionable "Hinge Question" to diagnose whole-class conceptual understanding before moving forward.',
      'Small-Step Guided Practice: Complex historical causation is taught in small, bite-sized steps followed by immediate pupil application.',
      'High Success Rate Design: Retrieval questions are calibrated so students achieve 80%+ success, cementing foundational confidence.',
    ],
    teacherProtocols: [
      'Enforce silent, independent completion of the Do-Now during the first 4 minutes of the lesson.',
      'Never allow pupils to open the textbook to look up Do-Now answers; it must be a genuine closed-book memory retrieval exercise.',
      'Use cold-calling on hinge questions to verify class-wide readiness before transitioning from reading to extended writing.',
    ],
    citations: [
      'Rosenshine, B. (2012). "Principles of instruction: Research-based strategies that all teachers should know", American Educator, 36(1), pp. 12–19.',
      'Dunlosky, J., et al. (2013). "Improving students’ learning with effective learning techniques", Psychological Science in the Public Interest, 14(1), pp. 4–58.',
    ],
    links: [
      {
        title: 'American Educator: Barak Rosenshine Principles of Instruction',
        url: 'https://www.aft.org/ae/spring2012/rosenshine',
        displayText: 'www.aft.org/ae/spring2012/rosenshine',
      },
      {
        title: 'Chartered College of Teaching: Principles of Instruction in the Classroom',
        url: 'https://chartered.college/',
        displayText: 'chartered.college',
      },
    ],
  },
  {
    id: 'wiliam_formative_assessment',
    author: 'Dylan Wiliam',
    affiliation: 'UCL Institute of Education / Formative Assessment',
    category: 'Formative Assessment',
    categoryBadge: 'badge-indigo',
    title: 'Dylan Wiliam: Embedded Formative Assessment & Whole-Class Feedback',
    subtitle: 'Eliminating Low-Impact Margin Scribbling in Favour of Progress Ledgers and DIRT',
    problem:
      'Teachers spend hundreds of uncompensated hours writing extensive prose comments in student exercise books—comments that pupils often glance at for 5 seconds before closing the book. This creates immense teacher burnout with negligible student attainment gains.',
    evidence:
      'Dylan Wiliam demonstrated that formative assessment is effective only when it causes more thinking for the student than for the teacher. Feedback should be formative, forward-looking, and immediately actionable during dedicated reflection time (DIRT).',
    implementation: [
      'Back-Cover Assessment Progress Ledger: Standardized enquiry mark tracking (/26 marks per topic) right on page 16 of the workbook.',
      'WWW (What Went Well) & EBI (Even Better If) Handwriting Lines: Pre-printed 7.2mm lines for targeted formative feedback and student response.',
      'Live Yellow Highlighter Marking: Teachers circulate during independent writing, highlighting exact vocabulary and syntax improvements on the fly.',
      'Whole-Class Feedback Summaries: Common misconceptions are debriefed collectively on the smartboard, followed by immediate pupil corrections in green pen.',
    ],
    teacherProtocols: [
      'Never write extensive narrative comments on student work during home marking; use coded shorthand and address patterns via whole-class debriefs.',
      'Dedicate 10 minutes at the start of the following lesson to DIRT (Dedicated Improvement and Reflection Time) using the back-cover feedback box.',
      'Ensure every EBI given requires the student to produce a concrete written output (e.g. rewriting a Golden Sentence).',
    ],
    citations: [
      'Wiliam, D. (2011). Embedded Formative Assessment. Bloomington, IN: Solution Tree Press.',
      'Black, P., & Wiliam, D. (1998). "Inside the black box: Raising standards through classroom assessment", Phi Delta Kappan, 80(2), pp. 139–148.',
    ],
    links: [
      {
        title: 'Dylan Wiliam Official Website & Assessment Research Papers',
        url: 'https://www.dylanwiliam.org/',
        displayText: 'www.dylanwiliam.org',
      },
      {
        title: 'EEF Guidance Report: Teacher Feedback to Improve Pupil Learning',
        url: 'https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/feedback',
        displayText:
          'educationendowmentfoundation.org.uk/education-evidence/guidance-reports/feedback',
      },
    ],
  },
];
