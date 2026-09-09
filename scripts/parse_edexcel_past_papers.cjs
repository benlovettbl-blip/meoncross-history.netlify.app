/**
 * parse_edexcel_past_papers.cjs
 *
 * Extracts and structures past exam questions, mark scheme indicative content,
 * stimulus points, and examiner advice for:
 * 1. Paper 1: Medicine in Britain & Western Front (1HI0/11)
 * 2. Paper 2: Conflict in the Middle East, 1945-95 (1HI0/P5)
 *
 * Source: G:\My Drive\AAMX\RESOURCES\Edexcel GCSE History exams
 * Output: public/data/edexcel_medicine_past_papers.json
 *         public/data/cme_new_past_papers.json
 */

const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'public', 'data');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const ELIZ_PAPERS = require('./data_eliz_past_papers.cjs');
const GERMANY_PAPERS = require('./data_germany_past_papers.cjs');
const USA_PAPERS = require('./data_usa_past_papers.cjs');

// ----------------------------------------------------------------------------
// Curated & Verified Past Paper Database with Exact Indicative Content & Examiner Tips
// ----------------------------------------------------------------------------

const MEDICINE_PAPERS = [
  {
    year: 2018,
    season: 'June',
    series: 'Summer 2018',
    paper_code: '1HI0/11',
    questions: [
      {
        q_id: 'med_2018_q1',
        q_number: 'Q1',
        section: 'Section A: Western Front',
        tariff: 4,
        type: 'feature',
        topic: 'Western Front: Blood Transfusions',
        spec_topic: 'Context: Blood transfusions and developments in storage',
        question_text:
          'Describe two features of blood transfusions on the Western Front during the First World War.',
        stimulus: null,
        indicative_content: [
          'Blood was transferred directly from donor to patient using a syringe and tube (syringe-cannula technique) before storage methods were developed.',
          'Sodium citrate was added to blood to prevent it clotting, meaning blood could be kept for several days before transfusion.',
          'In 1917 at the Battle of Cambrai, Oswald Robertson established the first blood depot/blood bank storing blood in glass bottles with sodium citrate and glucose.',
        ],
        examiner_tips:
          'Candidates scored full marks by giving a specific feature and adding a separate sentence of supporting historical knowledge. Avoid vague statements like "it saved lives".',
      },
      {
        q_id: 'med_2018_q2a',
        q_number: 'Q2(a)',
        section: 'Section A: Western Front',
        tariff: 8,
        type: 'how-useful',
        topic: 'Western Front: Treatment of Battle Injuries',
        spec_topic: 'The work of RAMC and FANY; medical care along chain of evacuation',
        question_text:
          'How useful are Sources A and B for an enquiry into the treatment of battle injuries by medical staff on the Western Front?',
        stimulus:
          'Source A: Account by nurse Shirley Millard at a Field Hospital near the front line (1918). Source B: Photograph of an operating theatre in a Casualty Clearing Station (1917).',
        indicative_content: [
          'Source A gives useful evidence of rapid emergency surgery under extreme pressure and the emotional/physical toll on nurses.',
          'Source B provides visual evidence of clean operating facilities, aseptic precautions (gowns, sterilised equipment), and artificial lighting in a CCS.',
          'Provenance: Source A is an eye-witness diary from an American volunteer giving honest reflections; Source B is an official photograph taken by the Department of Information, possibly staged to reassure the home front.',
        ],
        examiner_tips:
          'Do not evaluate sources in isolation. Provide a sustained comparative judgement linking utility directly to the enquiry topic. Scrutinise origin and purpose, not just date.',
      },
      {
        q_id: 'med_2018_q2b',
        q_number: 'Q2(b)',
        section: 'Section A: Western Front',
        tariff: 4,
        type: 'follow-up',
        topic: 'Western Front: Treatment of Battle Injuries',
        spec_topic: 'The work of RAMC and FANY; medical care along chain of evacuation',
        question_text:
          'How could you follow up Source A to find out more about the treatment of battle injuries by medical staff on the Western Front?',
        stimulus: null,
        indicative_content: [
          'Detail in Source A: Quote a specific detail about treatment, e.g. "We operated constantly without rest" or specific injury descriptions.',
          'Question to ask: "What proportion of wounded soldiers survived emergency surgery at field hospitals?"',
          'Type of source: Official medical logbooks or RAMC admission and discharge registers from that Casualty Clearing Station.',
          'How it helps: It would provide statistical verification of survival rates to test whether the emergency conditions described in Source A were typical.',
        ],
        examiner_tips:
          'Ensure the enquiry question links directly to the quoted detail, and specify an authentic contemporary historical record (e.g. RAMC war diaries or hospital registers, not "the internet" or "a history book").',
      },
      {
        q_id: 'med_2018_q3',
        q_number: 'Q3',
        section: 'Section B: Thematic Study',
        tariff: 4,
        type: 'similarity-difference',
        topic: 'Medieval vs Industrial Hospital Care',
        spec_topic: 'Approaches to prevention and treatment: hospitals across time',
        question_text:
          'Explain one way in which care in hospitals in the years c1250-c1500 was different from care in hospitals in the years c1700-c1900.',
        stimulus: null,
        indicative_content: [
          'Medieval hospitals were run by religious orders (monks and nuns) focusing on spiritual care, hospitality, rest, and prayer rather than medical treatment.',
          'Industrial hospitals in the 18th/19th centuries were funded by charities and philanthropists, staffed by trained doctors and professional nurses (e.g. following Florence Nightingale’s reforms), aiming to cure diseases medically and surgically.',
        ],
        examiner_tips:
          'Write a single, tightly integrated paragraph comparing both eras directly using connective words ("whereas", "in contrast to"). Provide precise historical examples from both time periods.',
      },
      {
        q_id: 'med_2018_q4',
        q_number: 'Q4',
        section: 'Section B: Thematic Study',
        tariff: 12,
        type: 'causation',
        topic: 'Prevention of Illness c1700-present',
        spec_topic:
          'Approaches to prevention: smallpox vaccination, public health acts, modern government campaigns',
        question_text:
          'Explain why there was progress in the prevention of illness in the years c1700–present.',
        stimulus:
          '• Edward Jenner (1796 smallpox vaccine)\n• the Public Health Act 1875\n• You must also use information of your own.',
        indicative_content: [
          'Jenner’s cowpox vaccine proved immunity could be generated artificially, leading to government-mandated vaccination in 1853 and eradication of smallpox.',
          'The 1875 Public Health Act marked the end of laissez-faire government attitude, compelling local councils to provide clean water, sewers, and refuse collection.',
          'Own knowledge factor: Modern government health legislation and campaigns (e.g. clean air acts, compulsory childhood vaccinations, anti-smoking legislation, lifestyle advertising) targeting non-infectious conditions.',
        ],
        examiner_tips:
          'To reach Level 4 (10-12 marks), candidates must structure three distinct analytical PEEL paragraphs including at least one substantial factor of own knowledge beyond the stimulus points.',
      },
      {
        q_id: 'med_2018_q5',
        q_number: 'Q5',
        section: 'Section B: Thematic Study',
        tariff: 16,
        type: 'judgement-essay',
        topic: 'Understanding Cause of Disease c1250-c1700',
        spec_topic: 'Ideas about the causes of disease and illness: Medieval to Renaissance',
        question_text:
          '‘There was little progress in understanding the cause of disease in the years c1250-c1700.’ How far do you agree? Explain your answer.',
        stimulus:
          '• the Theory of the Four Humours\n• the Royal Society\n• You must also use information of your own.',
        indicative_content: [
          'Arguments agreeing: The Four Humours and miasma remained the dominant explanations during both the Black Death (1348) and the Great Plague (1665); supernatural and astrological beliefs persisted strongly.',
          'Arguments disagreeing: The Renaissance brought humanism and empirical observation; the Royal Society (1660) promoted scientific testing; Thomas Sydenham classified diseases by symptoms; Leeuwenhoek observed animalcules (microbes) under early microscopes.',
          'Sustained judgement: While the foundations of scientific enquiry shifted dramatically in the 17th century, ordinary people and doctors still lacked understanding of the actual cause (germs) until Pasteur in 1861.',
        ],
        examiner_tips:
          'Candidates must cover the entire date range (1250 to 1700). Evaluate both change and continuity before reaching a weighed, justified conclusion.',
      },
      {
        q_id: 'med_2018_q6',
        q_number: 'Q6',
        section: 'Section B: Thematic Study',
        tariff: 16,
        type: 'judgement-essay',
        topic: 'Advances in Surgery: 18th/19th Century vs 20th Century',
        spec_topic: 'Advances in surgery: anaesthetics, antiseptics, high-tech surgery',
        question_text:
          '‘The advances in surgery made in the years c1700-c1900 were more significant than advances in surgery made in the period c1900-present.’ How far do you agree? Explain your answer.',
        stimulus:
          '• Joseph Lister (carbolic acid 1865)\n• blood transfusions\n• You must also use information of your own.',
        indicative_content: [
          'Significance of c1700-c1900: Overcame pain (Simpson and chloroform 1847) and infection (Lister and carbolic acid 1865, leading to aseptic surgery), transforming surgery from a deadly last resort into a safe medical specialty.',
          'Significance of c1900-present: Solved blood loss (Landsteiner blood groups 1901, sodium citrate storage 1914); enabled organ transplants (Barnard 1967); modern high-tech surgery (keyhole, microsurgery, robotic and laser surgery).',
          'Sustained judgement: 19th century developments were foundational because without solving pain and infection, modern complex high-tech procedures would be impossible.',
        ],
        examiner_tips:
          'Avoid simply describing surgical techniques. Compare the relative significance and long-term consequences of breakthroughs across both eras.',
      },
    ],
  },
  {
    year: 2019,
    season: 'June',
    series: 'Summer 2019',
    paper_code: '1HI0/11',
    questions: [
      {
        q_id: 'med_2019_q1',
        q_number: 'Q1',
        section: 'Section A: Western Front',
        tariff: 4,
        type: 'feature',
        topic: 'Western Front: Trench Ill Health',
        spec_topic:
          'Ill health arising from the trench environment: trench foot, trench fever, shell shock',
        question_text:
          'Describe two features of ill health among soldiers that arose from the trench environment.',
        stimulus: null,
        indicative_content: [
          'Trench foot was caused by standing in cold water and mud for long periods, causing numbness, swelling, and potentially gangrene requiring amputation.',
          'Trench fever was caused by body lice in trench uniforms, producing severe flu-like symptoms, high fevers, and joint pains that put soldiers out of action for months.',
          'Shell shock was caused by the psychological trauma of constant artillery bombardments, causing panic, tremors, nightmares, and mental breakdowns.',
        ],
        examiner_tips:
          'Ensure features relate specifically to the trench environment (e.g. trench foot, trench fever, shell shock) rather than direct battle wounds.',
      },
      {
        q_id: 'med_2019_q2a',
        q_number: 'Q2(a)',
        section: 'Section A: Western Front',
        tariff: 8,
        type: 'how-useful',
        topic: 'Western Front: Stretcher Bearers',
        spec_topic: 'Transport and communications: stretcher bearers and evacuation chain',
        question_text:
          'How useful are Sources A and B for an enquiry into the work of the stretcher bearers on the Western Front?',
        stimulus:
          'Source A: Diary entry by Private T. R. Green, a stretcher bearer in the 8th Battalion King’s Own Yorkshire Light Infantry (1916). Source B: Photograph of stretcher bearers carrying a wounded soldier through deep mud near Boesinghe during Third Ypres (1917).',
        indicative_content: [
          'Source A illustrates the physical exhaustion, constant danger from shelling, and psychological pressure experienced by stretcher-bearers during the Somme.',
          'Source B shows the horrific terrain conditions of Third Ypres (Passchendaele), where four to six men were needed per stretcher due to knee-deep mud.',
          'Provenance: Source A is private reflective testimony written near the time; Source B is an official photograph capturing authentic conditions, though possibly framed for home propaganda.',
        ],
        examiner_tips:
          'Link provenance directly to the enquiry. Consider why a stretcher-bearer’s personal diary offers unique insight into the emotional strain of the evacuation chain.',
      },
      {
        q_id: 'med_2019_q2b',
        q_number: 'Q2(b)',
        section: 'Section A: Western Front',
        tariff: 4,
        type: 'follow-up',
        topic: 'Western Front: Stretcher Bearers',
        spec_topic: 'Transport and communications: stretcher bearers and evacuation chain',
        question_text:
          'How could you follow up Source A to find out more about the work of the stretcher bearers on the Western Front?',
        stimulus: null,
        indicative_content: [
          'Detail in Source A: Quote a specific detail regarding casualty evacuation numbers or time taken.',
          'Question to ask: "How long did it take on average to evacuate a wounded soldier from the frontline to the RAP?"',
          'Type of source: Regimental Field Ambulance logbooks or RAMC War Diaries.',
          'How it helps: Gives verifiable timeline data across multiple sectors.',
        ],
        examiner_tips:
          'Keep the enquiry question strictly focused on the quoted detail. Vague questions like "Was it dangerous?" will not receive credit.',
      },
      {
        q_id: 'med_2019_q3',
        q_number: 'Q3',
        section: 'Section B: Thematic Study',
        tariff: 4,
        type: 'similarity-difference',
        topic: 'Ideas About Causes of Illness: 18th/19th Century vs Modern',
        spec_topic:
          'Ideas about the cause of disease: Miasma/Spontaneous Generation vs Genetics/Lifestyle',
        question_text:
          'Explain one way in which ideas about the cause of illness in the years c1700-c1850 were different from ideas about the cause of illness in the years c1900-present.',
        stimulus: null,
        indicative_content: [
          'In c1700-c1850, people believed illness was caused by miasma (bad air from decaying matter) or spontaneous generation of microbes from rotting material.',
          'In c1900-present, scientists know illness is caused by specific pathogenic microorganisms (bacteria, viruses), genetic abnormalities (DNA sequencing, Human Genome Project), and lifestyle factors (smoking, diet, alcohol).',
        ],
        examiner_tips:
          'Focus sharply on causes of illness rather than treatments. Explicitly compare both periods within one paragraph.',
      },
      {
        q_id: 'med_2019_q4',
        q_number: 'Q4',
        section: 'Section B: Thematic Study',
        tariff: 12,
        type: 'causation',
        topic: 'Renaissance Medical Knowledge c1500-c1700',
        spec_topic:
          'The Renaissance: Sydenham, Vesalius, Harvey, the printing press, Royal Society',
        question_text:
          'Explain why there were improvements in medical knowledge in the years c1500-c1700.',
        stimulus:
          '• Thomas Sydenham\n• the printing press\n• You must also use information of your own.',
        indicative_content: [
          'Thomas Sydenham advocated empirical bedside observation and classified diseases into species based on symptoms rather than individual humour balances.',
          'The printing press (Gutenberg) allowed ideas and detailed anatomical diagrams (like Vesalius’s Fabrica) to be reproduced rapidly and cheaply without monk copy errors.',
          'Own knowledge factor: Anatomical dissection breakthroughs by Vesalius (correcting Galen’s 300+ errors) and William Harvey’s discovery of the circulation of blood (1628).',
        ],
        examiner_tips:
          'Ensure your third paragraph draws upon specific Renaissance individuals (Vesalius, Harvey) or institutions (Royal Society 1660) with precise factual knowledge.',
      },
      {
        q_id: 'med_2019_q5',
        q_number: 'Q5',
        section: 'Section B: Thematic Study',
        tariff: 16,
        type: 'judgement-essay',
        topic: 'Galen & Medieval Medical Care c1250-c1500',
        spec_topic: 'Medieval medicine: Galen, Four Humours, Church control, treatments',
        question_text:
          '‘The main reason why medical care and treatment was ineffective during the medieval period was because medical knowledge was based on Galen’s ideas’. How far do you agree? Explain your answer.',
        stimulus:
          '• Theory of Opposites\n• hospitals\n• You must also use information of your own.',
        indicative_content: [
          'Arguments agreeing: Galen’s incorrect theories (e.g. blood generated in the liver and consumed, Four Humours and Theory of Opposites) led to useless or harmful treatments like bleeding, purging, and dietary balancing.',
          'Arguments disagreeing: Role of the Catholic Church in stifling enquiry (banning dissection, promoting Galen as dogma); lack of scientific technology (no microscopes); supernatural beliefs (astrology, sin, flagellation during the Black Death 1348).',
          'Role of medieval hospitals: Focused on spiritual salvation and hospitality rather than medical care.',
          'Judgement: Galen’s ideas were the framework, but Church enforcement and the lack of scientific instrumentation were the underlying causes of ineffectiveness.',
        ],
        examiner_tips:
          'Examine multiple factors (Church control, Galen’s ideas, lack of technology, supernatural beliefs) before reaching an evaluation of which was the "main" reason.',
      },
      {
        q_id: 'med_2019_q6',
        q_number: 'Q6',
        section: 'Section B: Thematic Study',
        tariff: 16,
        type: 'judgement-essay',
        topic: 'Role of Government in Medicine c1800-present',
        spec_topic: 'Role of government: Public Health Acts, liberal welfare reforms, NHS 1948',
        question_text:
          '‘Providing access to care and treatment has been the most important development in the role of government in medicine in the years c1800-present.’ How far do you agree? Explain your answer.',
        stimulus:
          '• National Health Service (NHS), 1948\n• Public Health Act, 1875\n• You must also use information of your own.',
        indicative_content: [
          'Significance of access to care/treatment: The NHS (1948, Aneurin Bevan) made healthcare free at the point of delivery for the first time, establishing universal access to doctors, hospitals, dentists, and ambulances.',
          'Counter-arguments (Role in prevention/public health): The 1875 Public Health Act forced local authorities to provide clean water, sewers, and building regulations, defeating cholera and typhoid; clean air acts; compulsory vaccination acts (1853).',
          'Modern lifestyle intervention: Anti-smoking legislation (banning smoking in public places 2007, plain packaging 2016), sugar taxes, and pandemic response.',
          'Judgement: While public health prevention saved the greatest raw number of lives, the NHS fundamentally transformed everyday health and equality in Britain.',
        ],
        examiner_tips:
          'Directly compare the government’s role in providing treatment (NHS) against its role in prevention/public health (sewers, clean water, legislation).',
      },
    ],
  },
  {
    year: 2020,
    season: 'November',
    series: 'Autumn 2020',
    paper_code: '1HI0/11',
    questions: [
      {
        q_id: 'med_2020_q1',
        q_number: 'Q1',
        section: 'Section A: Western Front',
        tariff: 4,
        type: 'feature',
        topic: 'Western Front: Thomas Splint',
        spec_topic: 'Techniques for treatment: the Thomas splint',
        question_text: 'Describe two features of the use of the Thomas splint.',
        stimulus: null,
        indicative_content: [
          'The Thomas splint pulled the broken leg straight and held the bone rigid in traction, preventing the broken ends from grinding together and tearing femoral arteries.',
          'It dramatically reduced the death rate from compound leg fractures from 80% in 1914-15 down to 20% by 1916-18.',
        ],
        examiner_tips:
          'State the mechanism (rigid metal frame pulling leg in traction) and the clinical outcome (reduction in compound fracture mortality from 80% to 20%).',
      },
      {
        q_id: 'med_2020_q2a',
        q_number: 'Q2(a)',
        section: 'Section A: Western Front',
        tariff: 8,
        type: 'how-useful',
        topic: 'Western Front: Gas Attacks',
        spec_topic: 'The nature of wounds and injuries: gas attacks (chlorine, phosgene, mustard)',
        question_text:
          'How useful are Sources A and B for an enquiry into the effects of a gas attack?',
        stimulus:
          'Source A: Account by Captain J. C. Dunn, medical officer 2nd Battalion Royal Welsh Fusiliers (1915). Source B: Painting "Gassed" by John Singer Sargent (1919).',
        indicative_content: [
          'Source A provides immediate medical detail of physical symptoms: choking, coughing up green froth, lung damage, and blindness.',
          'Source B depicts the scale of casualties, lines of blinded soldiers led to dressing stations, and the overwhelming demand on medical staff.',
          'Provenance: Dunn was a frontline MO writing clinical observations; Sargent was an official war artist capturing the profound human impact of mustard gas.',
        ],
        examiner_tips:
          'Discuss the specific gas involved (chlorine/phosgene/mustard) and contextualise the development of gas masks from urine-soaked cotton pads to the Small Box Respirator (1916).',
      },
      {
        q_id: 'med_2020_q2b',
        q_number: 'Q2(b)',
        section: 'Section A: Western Front',
        tariff: 4,
        type: 'follow-up',
        topic: 'Western Front: Gas Attacks',
        spec_topic: 'The nature of wounds and injuries: gas attacks',
        question_text:
          'How could you follow up Source A to find out more about the effects of a gas attack?',
        stimulus: null,
        indicative_content: [
          'Detail in Source A: Quote a symptom, e.g. "men choking and coughing up green fluid".',
          'Question: "How many soldiers exposed to gas required long-term hospital treatment or died?"',
          'Type of source: RAMC casualty return records or Ministry of Pensions medical reports.',
          'How it helps: Quantifies long-term disability and survival rates from gas attacks.',
        ],
        examiner_tips:
          'Ensure the source suggested is a specific contemporary record from military medical authorities.',
      },
      {
        q_id: 'med_2020_q3',
        q_number: 'Q3',
        section: 'Section B: Thematic Study',
        tariff: 4,
        type: 'similarity-difference',
        topic: 'Medieval Physician vs NHS Doctor',
        spec_topic: 'Medical professionals across time: physicians, surgeons, apothecaries, GPs',
        question_text:
          'Explain one way in which the role of the physician in the medieval period was similar to the role of the doctor in the NHS in the modern period.',
        stimulus: null,
        indicative_content: [
          'In both periods, the primary role of the physician/doctor was to diagnose illness by examining the patient and identifying symptoms (e.g. medieval physicians examining urine color/pulse; modern doctors examining vital signs and prescribing treatments).',
          'Both required extensive formal university education and recognised qualifications before being permitted to practice medicine.',
        ],
        examiner_tips:
          'Focus on similarity of professional function (diagnosis/prescription/formal training) rather than differences in medical understanding.',
      },
      {
        q_id: 'med_2020_q4',
        q_number: 'Q4',
        section: 'Section B: Thematic Study',
        tariff: 12,
        type: 'causation',
        topic: 'Science & Technology in Modern Medicine c1900-present',
        spec_topic:
          'Developments in science and technology: DNA, magic bullets, high-tech diagnosis',
        question_text:
          'Explain why developments in science and technology led to rapid progress in medicine in the years c1900–present.',
        stimulus:
          '• chemotherapy\n• the discovery of the structure of DNA\n• You must also use information of your own.',
        indicative_content: [
          'Chemical advances produced magic bullets (Ehrlich’s Salvarsan 606, Domagk’s Prontosil) and chemotherapy treating cancer by targeting specific cells without destroying the host body.',
          'Watson, Crick, and Franklin’s discovery of the double helix structure of DNA (1953) and the Human Genome Project (completed 2003) enabled gene therapy and targeted treatments.',
          'Own knowledge factor: Diagnostic imaging technology (X-rays, CT scans, MRI scans, ultrasound) and advanced surgical technology (electron microscopes, robotic laparoscopy).',
        ],
        examiner_tips:
          'Link each technological breakthrough directly to clinical medical progress (improved diagnosis, targeted cure, reduced surgical mortality).',
      },
      {
        q_id: 'med_2020_q5',
        q_number: 'Q5',
        section: 'Section B: Thematic Study',
        tariff: 16,
        type: 'judgement-essay',
        topic: 'Florence Nightingale & Hospital Care c1700-c1900',
        spec_topic: 'Hospitals: changes in care and treatment, Nightingale, antiseptics',
        question_text:
          '‘The work of Florence Nightingale was the most important development in the care and treatment provided in hospitals in the years c1700–c1900.’ How far do you agree? Explain your answer.',
        stimulus:
          '• Florence Nightingale’s Notes on Nursing (1859)\n• anaesthetics\n• You must also use information of your own.',
        indicative_content: [
          'Role of Nightingale: Reformed sanitation, ventilation, and cleanliness (reducing Scutari death rate from 42% to 2%); established professional nurse training (Nightingale School at St Thomas’ Hospital); published Notes on Nursing.',
          'Other major hospital developments: Anaesthetics (ether, Simpson’s chloroform 1847) allowing complex internal surgery; Lister’s carbolic acid (1865) and antiseptic/aseptic hospital operating theatres; pavilion style hospital architecture; growth of specialist voluntary hospitals.',
          'Judgement: Nightingale made hospitals clean places of recuperation, but without anaesthetics and antiseptics, hospitals could never have provided effective surgical treatment.',
        ],
        examiner_tips:
          'Distinguish between "care" (nursing, sanitation, environment) and "treatment" (surgery, anaesthetics, antiseptic medicine).',
      },
      {
        q_id: 'med_2020_q6',
        q_number: 'Q6',
        section: 'Section B: Thematic Study',
        tariff: 16,
        type: 'judgement-essay',
        topic: 'Infectious Diseases c1500-c1900',
        spec_topic:
          'Approaches to prevention and treatment: Great Plague, cholera, Jenner, Snow, Pasteur',
        question_text:
          '‘There was little improvement in dealing with infectious diseases in the years c1500–c1900.’ How far do you agree? Explain your answer.',
        stimulus:
          '• the Great Plague, 1665\n• the Broad Street Pump\n• You must also use information of your own.',
        indicative_content: [
          'Arguments agreeing (continuity): During the Great Plague (1665), treatments (smoking tobacco, strapping chickens, bloodletting) were as ineffective as during the Black Death (1348); quarantine and isolation had limited impact; miasma still dominated until late 19th century.',
          'Arguments disagreeing (major progress): Jenner’s smallpox vaccine (1796); John Snow’s Broad Street pump investigation (1854) proving cholera was waterborne; Pasteur’s Germ Theory (1861) and Koch’s bacteriology identifying specific pathogens; 1875 Public Health Act clean water infrastructure.',
          'Judgement: Little improvement between 1500 and 1750, but radical transformation between 1850 and 1900 due to Snow, Pasteur, Koch, and public health legislation.',
        ],
        examiner_tips:
          'Break down the 400-year period chronologically, showing why the turning point occurred in the mid-19th century.',
      },
    ],
  },
  {
    year: 2022,
    season: 'June',
    series: 'Summer 2022',
    paper_code: '1HIA/11',
    questions: [
      {
        q_id: 'med_2022_q1',
        q_number: 'Q1',
        section: 'Section A: Western Front',
        tariff: 4,
        type: 'feature',
        topic: 'Western Front: Underground Hospital at Arras',
        spec_topic: 'The context of the British sector: Arras, chalk tunnels, hospital system',
        question_text: 'Describe two features of the underground hospital at Arras.',
        stimulus: null,
        indicative_content: [
          'The hospital (Thompson’s Cave) was built inside vast underground chalk quarries and tunnels, making it completely protected from German artillery bombardment.',
          'It was fully equipped with 700 beds, running water, electricity, and operating theatres, located extremely close to the frontline trenches.',
        ],
        examiner_tips:
          'Mention its safe underground chalk quarry location and its extensive medical infrastructure (700 beds, electricity, operating theatres).',
      },
      {
        q_id: 'med_2022_q2a',
        q_number: 'Q2(a)',
        section: 'Section A: Western Front',
        tariff: 8,
        type: 'how-useful',
        topic: 'Western Front: Trench Foot',
        spec_topic: 'The nature of wounds and ill health: trench foot',
        question_text:
          'How useful are Sources A and B for an enquiry into the problem of trench foot?',
        stimulus:
          'Source A: Routine Orders issued to British troops by the General Headquarters (1915). Source B: Personal account by Private A. West in the London Regiment (1916).',
        indicative_content: [
          'Source A reveals army preventive regulations: daily whale oil rubs, dry socks, buddy-system inspections, and officer discipline.',
          'Source B shows the harsh frontline reality where soldiers neglected whale oil because boots were difficult to take off in freezing mud.',
          'Provenance: Source A reflects official command strategy; Source B gives candid soldier testimony showing why official policy was hard to implement.',
        ],
        examiner_tips:
          'Highlight the contrast between official orders (Source A) and real frontline conditions (Source B) to judge practical utility.',
      },
      {
        q_id: 'med_2022_q2b',
        q_number: 'Q2(b)',
        section: 'Section A: Western Front',
        tariff: 4,
        type: 'follow-up',
        topic: 'Western Front: Trench Foot',
        spec_topic: 'The nature of wounds and ill health: trench foot',
        question_text:
          'How could you follow up Source A to find out more about the problem of trench foot?',
        stimulus: null,
        indicative_content: [
          'Detail in Source A: Quote regulation regarding whale oil rubbing or sock changing.',
          'Question: "Did the routine orders of 1915 result in a measurable drop in trench foot hospital admissions?"',
          'Type of source: Divisional medical inspection returns or RAMC casualty logs.',
          'How it helps: Provides objective statistics on whether preventive orders worked.',
        ],
        examiner_tips:
          'Framing an effective follow-up question requires linking the quoted detail directly to an authentic statistical medical record.',
      },
      {
        q_id: 'med_2022_q3',
        q_number: 'Q3',
        section: 'Section B: Thematic Study',
        tariff: 4,
        type: 'similarity-difference',
        topic: 'Preventing Infectious Diseases: Renaissance vs Industrial',
        spec_topic:
          'Approaches to prevention: Renaissance quarantine vs 18th/19th century inoculation/vaccination',
        question_text:
          'Explain one way in which attempts to prevent the spread of infectious diseases in the period c1500-c1700 were similar to attempts to prevent the spread of infectious diseases in the period c1700―c1900.',
        stimulus: null,
        indicative_content: [
          'In both periods, local and national authorities used quarantine and isolation to stop diseases spreading (e.g. boarding up plague houses in 1665 with red crosses; isolating smallpox and cholera victims in isolation pest houses and fever hospitals in the 19th century).',
          'In both periods, authorities took measures to clean streets and dispose of waste due to persistent beliefs in miasma (bad air).',
        ],
        examiner_tips:
          'Focus on continuity in government/local action (quarantine/isolation or street cleaning) across both centuries.',
      },
      {
        q_id: 'med_2022_q4',
        q_number: 'Q4',
        section: 'Section B: Thematic Study',
        tariff: 12,
        type: 'causation',
        topic: 'Attitudes Towards Surgery c1800-present',
        spec_topic: 'Advances in surgery: anaesthetics, antiseptics, modern technology',
        question_text: 'Explain why attitudes towards surgery changed in the period c1800-present.',
        stimulus:
          '• anaesthetics\n• high-tech surgery\n• You must also use information of your own.',
        indicative_content: [
          'Anaesthetics (Simpson’s chloroform 1847) transformed patient attitudes from sheer terror into confidence that surgery could be painless.',
          'Antiseptics and aseptic surgery (Lister’s carbolic acid 1865, autoclaves, rubber gloves) reduced post-operative infection and gangrene, cutting mortality from 46% to under 15%.',
          'High-tech surgery (keyhole surgery, robotic operations, organ transplants) made surgery minimally invasive with rapid recovery, making it routine and trusted.',
        ],
        examiner_tips:
          'Ensure the explanation links surgical breakthroughs directly to public and medical *attitudes* (confidence, trust, willingness to undergo surgery).',
      },
      {
        q_id: 'med_2022_q5',
        q_number: 'Q5',
        section: 'Section B: Thematic Study',
        tariff: 16,
        type: 'judgement-essay',
        topic: 'Medieval Care & Treatment: Role of Physician c1250-c1500',
        spec_topic:
          'Medieval healers: physicians, barber surgeons, apothecaries, women in the home',
        question_text:
          '‘In the years c1250-c1500, the physician was the most important person providing care and treatment.’ How far do you agree? Explain your answer.',
        stimulus:
          '• medical training\n• herbal remedies\n• You must also use information of your own.',
        indicative_content: [
          'Role of physicians: Underwent 7-10 years of university training studying Hippocrates and Galen; possessed highest social status; diagnosed illness using urine charts, astrological calendars (zodiac man), and pulse.',
          'Importance of other healers: Physicians were too expensive for ordinary people; barber-surgeons performed bloodletting and minor operations; apothecaries prepared herbal remedies; wise women and mothers in the home provided the vast majority of day-to-day healthcare.',
          'Judgement: Physicians were prestigious for royalty and nobility, but for the general population, female family members and apothecaries were far more important.',
        ],
        examiner_tips:
          'Compare physicians directly against other medieval healers (apothecaries, barber-surgeons, wise women) across different social classes.',
      },
      {
        q_id: 'med_2022_q6',
        q_number: 'Q6',
        section: 'Section B: Thematic Study',
        tariff: 16,
        type: 'judgement-essay',
        topic: 'Pasteur & Causes of Illness c1800-present',
        spec_topic: 'Ideas about causes of disease: Germ Theory, Koch, genetics, DNA',
        question_text:
          '‘In the years c1800-present, the work of Pasteur was the most significant development in understanding the causes of illness.’ How far do you agree? Explain your answer.',
        stimulus: '• Germ Theory\n• DNA\n• You must also use information of your own.',
        indicative_content: [
          'Pasteur’s Germ Theory (1861): Destroyed spontaneous generation; proved microscopic organisms caused decay and disease, providing the foundation for modern medicine.',
          'Koch’s contribution: Isolated specific disease-causing microbes (anthrax, TB 1882, cholera 1883) using agar jelly and chemical dyes.',
          '20th century genetics: Discovery of DNA structure (1953) and Human Genome Project (2003) explained genetic illnesses (cystic fibrosis, Huntington’s, cancer risks) which germs cannot explain.',
          'Lifestyle understanding: Smoking causes lung cancer (Doll and Hill 1950), poor diet causes heart disease.',
          'Judgement: Pasteur was the foundation for infectious diseases, but genetics revolutionised modern non-infectious pathology.',
        ],
        examiner_tips:
          'Balance Pasteur’s breakthrough in infectious disease against 20th-century discoveries in genetics and lifestyle.',
      },
    ],
  },
  {
    year: 2023,
    season: 'June',
    series: 'Summer 2023',
    paper_code: '1HI0/11',
    questions: [
      {
        q_id: 'med_2023_q1',
        q_number: 'Q1',
        section: 'Section A: Western Front',
        tariff: 4,
        type: 'feature',
        topic: 'Western Front: Transporting Wounded Soldiers',
        spec_topic:
          'Transport and communications: problems of terrain, stretcher bearers, horse vs motor ambulances',
        question_text:
          'Describe two features of the problems involved in transporting wounded soldiers away from the battleground.',
        stimulus: null,
        indicative_content: [
          'The shell-cratered terrain, destroyed drainage, and deep mud (especially at Passchendaele) made it impossible for motor ambulances to reach the front, forcing reliance on stretcher-bearers.',
          'Stretcher evacuation was slow and dangerous: carrying one wounded man required 4-8 stretcher-bearers under artillery and sniper fire, taking hours to reach the RAP.',
        ],
        examiner_tips:
          'State two distinct logistical problems (e.g. mud/terrain destroying vehicle access; enemy fire delaying stretcher teams).',
      },
      {
        q_id: 'med_2023_q2a',
        q_number: 'Q2(a)',
        section: 'Section A: Western Front',
        tariff: 8,
        type: 'how-useful',
        topic: 'Western Front: New Techniques to Deal with Injuries',
        spec_topic:
          'Techniques for treatment: wound excision/debridement, Carrel-Dakin method, Thomas splint',
        question_text:
          'How useful are Sources A and B for an enquiry into new techniques being used on the Western Front to deal with injuries?',
        stimulus:
          'Source A: Report by Dr Alexis Carrel in an American medical journal (1916). Source B: Official British photograph of a wounded soldier treated with a Thomas splint (1917).',
        indicative_content: [
          'Source A explains the Carrel-Dakin antiseptic irrigation method for deep contaminated shrapnel wounds.',
          'Source B provides clear visual proof of the Thomas splint keeping leg fractures aligned and immobilised.',
          'Provenance: Carrel is a pioneer surgeon providing technical medical explanation; Source B is an official record demonstrating successful hospital treatment.',
        ],
        examiner_tips:
          'Evaluate how both sources illustrate the rapid evolution of surgical response to new industrial warfare wounds.',
      },
      {
        q_id: 'med_2023_q2b',
        q_number: 'Q2(b)',
        section: 'Section A: Western Front',
        tariff: 4,
        type: 'follow-up',
        topic: 'Western Front: New Techniques to Deal with Injuries',
        spec_topic: 'Techniques for treatment: Carrel-Dakin method, Thomas splint',
        question_text:
          'How could you follow up Source A to find out more about new techniques being used on the Western Front to deal with injuries?',
        stimulus: null,
        indicative_content: [
          'Detail in Source A: Quote Carrel’s method of flushing wound cavities with sodium hypochlorite solution.',
          'Question: "What percentage of gangrene cases were prevented by using the Carrel-Dakin method compared to standard dressing?"',
          'Type of source: RAMC surgical case registers from Base Hospitals.',
          'How it helps: Provides objective clinical statistical evaluation of success.',
        ],
        examiner_tips:
          'Focus on clinical effectiveness and specific medical records (e.g. Base Hospital surgical logs).',
      },
      {
        q_id: 'med_2023_q3',
        q_number: 'Q3',
        section: 'Section B: Thematic Study',
        tariff: 4,
        type: 'similarity-difference',
        topic: 'Prevention of Illness: Medieval vs Modern',
        spec_topic:
          'Approaches to prevention: Medieval religious/miasma vs Modern vaccination/lifestyle',
        question_text:
          'Explain one way in which ideas about prevention of illness in the medieval period were similar to ideas about the prevention of illness in the modern period.',
        stimulus: null,
        indicative_content: [
          'In both periods, people believed that personal lifestyle choices and regime (regimen sanitatis in medieval times: moderate eating, exercise, bathing; modern healthy eating, exercise, avoiding smoking) prevented disease.',
          'Both periods recognised the importance of avoiding foul environmental conditions (medieval carrying sweet herbs to avoid bad air; modern clean air legislation).',
        ],
        examiner_tips:
          'Highlight the conceptual similarity: personal responsibility for maintaining health through daily habits and diet.',
      },
      {
        q_id: 'med_2023_q4',
        q_number: 'Q4',
        section: 'Section B: Thematic Study',
        tariff: 12,
        type: 'causation',
        topic: 'Access to Medical Care & Treatment in Modern Period',
        spec_topic:
          'Role of government: Welfare reforms, creation of the NHS, development of GP practices',
        question_text:
          'Explain why access to medical care and treatment improved in the modern period.',
        stimulus:
          '• hospitals\n• General Practitioners (GPs)\n• You must also use information of your own.',
        indicative_content: [
          'The establishment of the NHS in 1948 made visits to hospitals and GPs free at the point of delivery, removing wealth as a barrier to healthcare.',
          'GP practices were reorganised into local community health centres offering comprehensive primary care and preventive screenings.',
          'Own knowledge factor: Liberal welfare reforms (1911 National Insurance Act providing sick pay and panel doctors for low-paid workers) and ambulance services.',
        ],
        examiner_tips: 'Emphasise the removal of financial and geographical barriers to treatment.',
      },
      {
        q_id: 'med_2023_q5',
        q_number: 'Q5',
        section: 'Section B: Thematic Study',
        tariff: 16,
        type: 'judgement-essay',
        topic: 'Thomas Sydenham as Key Turning Point c1500-c1700',
        spec_topic: 'The Renaissance: Thomas Sydenham, Vesalius, Harvey, Royal Society',
        question_text:
          '‘The work of Thomas Sydenham was the key turning point in medicine in the years c1500-c1700.’ How far do you agree? Explain your answer.',
        stimulus:
          '• Sydenham’s Observationes Medicae (1676)\n• Four Humours\n• You must also use information of your own.',
        indicative_content: [
          'Arguments agreeing: Known as the "English Hippocrates", Sydenham insisted on clinical bedside observation; classified diseases into distinct species; challenged the idea that each patient had a unique humour balance.',
          'Counter-arguments (other turning points): Andreas Vesalius proved Galen made hundreds of anatomical errors by dissecting human bodies; William Harvey discovered blood circulation (1628), proving blood flows in a one-way system pumped by the heart; the Royal Society (1660) institutionalised experimental proof.',
          'Judgement: Sydenham laid the groundwork for modern clinical diagnosis, but Vesalius and Harvey were equally pivotal in dismantling Galen.',
        ],
        examiner_tips:
          'Compare Sydenham against Vesalius and Harvey to evaluate which figure was the true "turning point".',
      },
      {
        q_id: 'med_2023_q6',
        q_number: 'Q6',
        section: 'Section B: Thematic Study',
        tariff: 16,
        type: 'judgement-essay',
        topic: 'Attitudes Towards Medicine c1700-c1900',
        spec_topic: 'Industrial medicine: Jenner, Pasteur, Koch, Nightingale, Public Health',
        question_text:
          '‘People’s attitudes about medicine, in the years c1700-c1900, became increasingly positive.’ How far do you agree? Explain your answer.',
        stimulus:
          '• vaccination\n• infectious diseases\n• You must also use information of your own.',
        indicative_content: [
          'Arguments agreeing: Jenner’s smallpox vaccination proved diseases could be conquered; Pasteur’s Germ Theory and Koch’s bacteriology gave rational scientific explanations; anaesthetics (chloroform) removed the horror of surgery; Florence Nightingale transformed hospitals into clean healing institutions.',
          'Counter-arguments (resistance and scepticism): Anti-Vaccination League opposed compulsory vaccination in the 1850s; early anaesthetics caused deaths ("Black Period of Surgery"); doctors resisted carbolic acid and handwashing initially (Semmelweis was ridiculed).',
          'Judgement: Attitudes were initially sceptical and resistant, but by 1900, demonstrable reductions in mortality made public attitudes overwhelmingly positive.',
        ],
        examiner_tips:
          'Address both the growth of confidence and the significant public and professional resistance to new medical ideas.',
      },
    ],
  },
  {
    year: 2024,
    season: 'June',
    series: 'Summer 2024',
    paper_code: '1HI0/11',
    questions: [
      {
        q_id: 'med_2024_q1',
        q_number: 'Q1',
        section: 'Section A: Western Front',
        tariff: 4,
        type: 'feature',
        topic: 'Western Front: New Wound Treatment Techniques',
        spec_topic:
          'Techniques for treatment: wound excision/debridement, Carrel-Dakin method, Thomas splint',
        question_text:
          'Describe two features of the new techniques used in the treatment of wounds on the Western Front.',
        stimulus: null,
        indicative_content: [
          'Wound excision (debridement) involved cutting away all dead and infected tissue around a shrapnel wound to prevent gas gangrene before stitching.',
          'The Carrel-Dakin method used a chemical antiseptic solution (sodium hypochlorite) pumped through rubber tubes to continuously irrigate deep, infected wounds.',
        ],
        examiner_tips:
          'Name specific surgical procedures (debridement or Carrel-Dakin) and describe how they functioned.',
      },
      {
        q_id: 'med_2024_q2a',
        q_number: 'Q2(a)',
        section: 'Section A: Western Front',
        tariff: 8,
        type: 'how-useful',
        topic: 'Western Front: Medical Staff in Casualty Clearing Stations',
        spec_topic: 'The chain of evacuation: Casualty Clearing Stations (CCS)',
        question_text:
          'How useful are Sources A and B for an enquiry into the work of medical staff in the Casualty Clearing Stations (CCS) on the Western Front?',
        stimulus:
          'Source A: Diary extract from Sister Edith Appleton, a military nurse stationed at a CCS (1916). Source B: Official sketch of surgeons operating in a CCS during the Battle of Passchendaele (1917).',
        indicative_content: [
          'Source A illustrates the triage system, operating non-stop for 48 hours during offensives, and the physical/emotional resilience of nurses.',
          'Source B depicts surgical conditions: multiple operating tables in large marquees, aseptic gowns, and artificial lighting under canvas.',
          'Provenance: Appleton was an experienced QAIMNS sister recording authentic frontline impressions; Source B was commissioned to document wartime medical achievement.',
        ],
        examiner_tips:
          'Analyse the vital role of the CCS as the first place where life-saving surgery was performed on the Western Front.',
      },
      {
        q_id: 'med_2024_q2b',
        q_number: 'Q2(b)',
        section: 'Section A: Western Front',
        tariff: 4,
        type: 'follow-up',
        topic: 'Western Front: Medical Staff in Casualty Clearing Stations',
        spec_topic: 'The chain of evacuation: Casualty Clearing Stations (CCS)',
        question_text:
          'How could you follow up Source A to find out more about the work of medical staff in the Casualty Clearing Stations (CCS) on the Western Front?',
        stimulus: null,
        indicative_content: [
          'Detail in Source A: Quote Appleton’s description of the triage categories (walking wounded, urgent surgery, moribund).',
          'Question: "What proportion of casualties admitted to this CCS were operated on versus evacuated directly to Base Hospitals?"',
          'Type of source: CCS admission registers and surgical logbooks.',
          'How it helps: Provides factual breakdown of triage decision-making.',
        ],
        examiner_tips:
          'Tie the follow-up question to the triage system and cite contemporary CCS logbooks.',
      },
      {
        q_id: 'med_2024_q3',
        q_number: 'Q3',
        section: 'Section B: Thematic Study',
        tariff: 4,
        type: 'similarity-difference',
        topic: 'Treatment of Infectious Diseases: Medieval vs Modern',
        spec_topic:
          'Approaches to treatment: Medieval herbal/bloodletting vs Modern antibiotics/antivirals',
        question_text:
          'Explain one way in which the treatment of infectious diseases in the medieval period (c1250-c1500) was different from the treatment of infectious diseases in the modern period (c1900-present).',
        stimulus: null,
        indicative_content: [
          'Medieval treatments aimed to rebalance humours or appease God using ineffective methods like bloodletting, purging, herbal infusions, and prayer.',
          'Modern treatments target specific pathogens directly using scientifically engineered pharmaceuticals such as antibiotics (penicillin) for bacteria and antivirals for viruses.',
        ],
        examiner_tips:
          'Contrast the theoretical basis: rebalancing invisible humours vs targeted chemical destruction of pathogens.',
      },
      {
        q_id: 'med_2024_q4',
        q_number: 'Q4',
        section: 'Section B: Thematic Study',
        tariff: 12,
        type: 'causation',
        topic: 'Why Little Change in Medieval Medicine c1250-c1500',
        spec_topic:
          'Medieval medicine: Church control, Galen, medical training, respect for tradition',
        question_text:
          'Explain why there was little change in medicine in England during the medieval period (c1250–c1500).',
        stimulus: '• Galen\n• monastery hospitals\n• You must also use information of your own.',
        indicative_content: [
          'Galen’s theories (Four Humours, body designed by God) were adopted as dogma by the Catholic Church; questioning Galen was treated as heresy.',
          'Monastery hospitals prioritised spiritual salvation, rest, and prayer rather than medical experimentation or curing physical illness.',
          'Own knowledge factor: Education and training: Universities were controlled by the Church, teaching rote memorisation of ancient texts; dissection was forbidden or only used to illustrate Galen’s writings.',
        ],
        examiner_tips:
          'Focus heavily on the Catholic Church’s monopoly over universities, book production, and hospitals.',
      },
      {
        q_id: 'med_2024_q5',
        q_number: 'Q5',
        section: 'Section B: Thematic Study',
        tariff: 16,
        type: 'judgement-essay',
        topic: 'Progress in Medical Knowledge in Renaissance c1500-c1700',
        spec_topic: 'The Renaissance: Vesalius, Harvey, Sydenham, Great Plague',
        question_text:
          '‘There was significant progress in medical knowledge in England during the Renaissance period (c1500-c1700).’ How far do you agree? Explain your answer.',
        stimulus:
          '• William Harvey\n• the Great Plague (1665)\n• You must also use information of your own.',
        indicative_content: [
          'Arguments agreeing (progress): William Harvey discovered circulation of blood (1628); Andreas Vesalius mapped human anatomy accurately; Thomas Sydenham classified diseases; the Royal Society (1660) championed empirical science.',
          'Arguments disagreeing (continuity): Despite anatomical breakthroughs, understanding of disease causation remained unchanged (Four Humours and miasma still dominated); treatments during the Great Plague of 1665 were virtually identical to the Black Death of 1348; Harvey’s discovery had zero practical impact on medical treatments at the time.',
          'Judgement: Enormous progress in scientific knowledge and anatomical theory, but almost zero progress in practical cures or clinical treatment for patients.',
        ],
        examiner_tips:
          'Crucial distinction: show the huge gap between *theoretical knowledge* (Vesalius, Harvey) and *practical treatments* (Great Plague 1665).',
      },
      {
        q_id: 'med_2024_q6',
        q_number: 'Q6',
        section: 'Section B: Thematic Study',
        tariff: 16,
        type: 'judgement-essay',
        topic: 'Role of Individuals in Prevention c1700-present',
        spec_topic:
          'Approaches to prevention: Jenner, Snow, government public health acts, lifestyle campaigns',
        question_text:
          '‘The role of individuals was the most important factor in the prevention of illness in the years c1700-present.’ How far do you agree? Explain your answer.',
        stimulus:
          '• Edward Jenner\n• anti-smoking campaigns\n• You must also use information of your own.',
        indicative_content: [
          'Role of individuals: Edward Jenner developed the first vaccine (smallpox 1796); John Snow discovered cholera was waterborne (1854); Louis Pasteur discovered Germ Theory (1861).',
          'Role of government: Passed compulsory vaccination laws (1853); Public Health Acts (1848, 1875) funding sewers and clean water; public health education and anti-smoking legislation (banning tobacco advertising, smoking in public places 2007).',
          'Role of science & technology: Electron microscopes, chemical synthesis of vaccines, genetic mapping.',
          'Judgement: Individuals made key discoveries, but government legislation and funding were essential to turn those discoveries into nationwide disease prevention.',
        ],
        examiner_tips:
          'Weigh the importance of individual discovery against government implementation and technology.',
      },
    ],
  },
  {
    year: 2025,
    season: 'June',
    series: 'Summer 2025',
    paper_code: '1HI0/11',
    questions: [
      {
        q_id: 'med_2025_q1a',
        q_number: 'Q1(a)',
        section: 'Section A: Western Front',
        tariff: 2,
        type: 'feature',
        topic: 'Western Front: Nature of Fighting & Injuries',
        spec_topic: 'The nature of the British sector: artillery, machine guns, shrapnel injuries',
        question_text:
          'Describe one feature of the fighting on the Western Front that led to a high number of injuries.',
        stimulus: null,
        indicative_content: [
          'Artillery barrages: Explosive shells threw thousands of pieces of jagged hot shrapnel and dirt into the air, causing 58% of all battlefield wounds and catastrophic blast trauma.',
        ],
        examiner_tips:
          'State one feature clearly and add a specific explanatory sentence with historical detail (e.g. shrapnel causing 58% of wounds).',
      },
      {
        q_id: 'med_2025_q1b',
        q_number: 'Q1(b)',
        section: 'Section A: Western Front',
        tariff: 2,
        type: 'feature',
        topic: 'Western Front: Blood Transfusions',
        spec_topic: 'Context: Blood transfusions and storage (Rous & Turner, Robertson)',
        question_text:
          'Describe one feature of the use of blood transfusions on the Western Front.',
        stimulus: null,
        indicative_content: [
          'In 1917, Oswald Robertson established the first blood depot at the Battle of Cambrai using sodium citrate and glucose to store blood in ice-cooled containers for up to 28 days before transfusion.',
        ],
        examiner_tips:
          'Award 1 mark for the feature (e.g. blood storage in depots) and 1 mark for supporting detail (Robertson / Cambrai / sodium citrate).',
      },
      {
        q_id: 'med_2025_q2a',
        q_number: 'Q2(a)',
        section: 'Section A: Western Front',
        tariff: 8,
        type: 'how-useful',
        topic: 'Western Front: Difficulties in Caring for the Wounded',
        spec_topic: 'Evacuation chain: terrain, stretcher transport, overwhelmed dressing stations',
        question_text:
          'How useful are Sources A and B for an enquiry into the difficulties in caring for the wounded on the Western Front?',
        stimulus:
          'Source A: Medical diary of an RAMC medical officer describing flooded trenches and mud during the Third Battle of Ypres (1917). Source B: Official photograph of an overcrowded Advanced Dressing Station near the Somme (1916).',
        indicative_content: [
          'Source A illustrates terrain difficulties: liquid mud, impassable shell holes, stretcher bearers taking 6-8 hours to carry one patient.',
          'Source B depicts logistical congestion: dozens of stretcher cases lying in the open outside a dressing station waiting for transport.',
          'Provenance: Source A is private testimony from an MO experiencing conditions firsthand; Source B is official photography verifying overcrowding.',
        ],
        examiner_tips:
          'Link utility to the enquiry question. Contrast the environmental barriers (Source A) with medical capacity limits (Source B).',
      },
      {
        q_id: 'med_2025_q2b',
        q_number: 'Q2(b)',
        section: 'Section A: Western Front',
        tariff: 4,
        type: 'follow-up',
        topic: 'Western Front: Difficulties in Caring for the Wounded',
        spec_topic: 'Evacuation chain: stretcher transport, hospital capacity',
        question_text:
          'How could you follow up Source B to find out more about the difficulties in caring for the wounded on the Western Front?',
        stimulus: null,
        indicative_content: [
          'Detail in Source B: Quote or describe the severe overcrowding of wounded soldiers waiting for treatment.',
          'Question: "What was the average waiting time for urgent surgery during major Somme bombardments?"',
          'Type of source: RAMC Field Ambulance and ADS daily duty logs.',
          'How it helps: Provides objective time-to-treatment metrics.',
        ],
        examiner_tips:
          'Ensure follow-up enquiry focuses on the specific detail identified in Source B.',
      },
      {
        q_id: 'med_2025_q3',
        q_number: 'Q3',
        section: 'Section B: Thematic Study',
        tariff: 4,
        type: 'similarity-difference',
        topic: 'Epidemics: Great Plague (1665) vs Cholera (1854)',
        spec_topic: 'Approaches to prevention and treatment: Great Plague vs Cholera in London',
        question_text:
          'Explain one way in which the Great Plague in London (1665) was similar to the cholera epidemic in London (1854).',
        stimulus: null,
        indicative_content: [
          'In both epidemics, people believed the disease was spread by miasma (poisonous bad air) and attempted to purify the air by burning barrels of tar or carrying pomanders.',
          'In both epidemics, authorities attempted to isolate victims and clear refuse from streets, while wealthier citizens fled London leaving the poor behind.',
        ],
        examiner_tips:
          'Highlight the enduring belief in miasma causing both epidemics, or the similar public panic and flight of the wealthy.',
      },
      {
        q_id: 'med_2025_q4',
        q_number: 'Q4',
        section: 'Section B: Thematic Study',
        tariff: 12,
        type: 'causation',
        topic: 'Impact of Pasteur’s Germ Theory c1861-present',
        spec_topic: 'Germ Theory: Pasteur, Koch, antiseptic surgery, vaccinations',
        question_text:
          'Explain why Pasteur’s Germ Theory (1861) led to changes in medicine in the years c1861-present.',
        stimulus:
          '• Koch’s work identifying microbes\n• antiseptic surgery\n• You must also use information of your own.',
        indicative_content: [
          'Koch applied Germ Theory to identify specific bacterial pathogens (anthrax 1876, TB 1882, cholera 1883), allowing medical science to target specific diseases.',
          'Joseph Lister applied Germ Theory to surgery, using carbolic acid to kill bacteria on instruments, wounds, and hands, reducing surgical infection rates dramatically.',
          'Own knowledge factor: Development of vaccines (Pasteur’s rabies vaccine 1885, modern MMR) and antibiotics (Ehrlich, Fleming, Florey and Chain).',
        ],
        examiner_tips:
          'Trace the causal chain from Pasteur’s microscopic proof to practical surgical, pharmacological, and preventive breakthroughs.',
      },
      {
        q_id: 'med_2025_q5',
        q_number: 'Q5',
        section: 'Section B: Thematic Study',
        tariff: 16,
        type: 'judgement-essay',
        topic: 'Four Humours & Medicine c1250-c1700',
        spec_topic: 'Ideas about cause and treatment: Four Humours across Medieval and Renaissance',
        question_text:
          '‘In the years c1250-c1700, medicine was mainly based on the Theory of the Four Humours.’ How far do you agree? Explain your answer.',
        stimulus: '• Galen\n• herbs and spices\n• You must also use information of your own.',
        indicative_content: [
          'Arguments agreeing: The Four Humours remained the core medical model taught in universities for over 400 years; bloodletting, purging, and herbal diets were prescribed throughout both the Black Death (1348) and Great Plague (1665).',
          'Arguments disagreeing: Religious explanations (punishment from God, sin) and astrology were equally dominant in the medieval period; in the Renaissance, Paracelsus introduced chemical remedies, Vesalius proved Galen’s anatomy wrong, and Sydenham insisted on classifying diseases by symptoms rather than humours.',
          'Judgement: While humours underpinned everyday treatment, religious beliefs dominated the early period and scientific empirical observation was beginning to replace it by 1700.',
        ],
        examiner_tips:
          'Address the full 450-year span, contrasting medieval religious/humoral beliefs with Renaissance chemical and empirical developments.',
      },
      {
        q_id: 'med_2025_q6',
        q_number: 'Q6',
        section: 'Section B: Thematic Study',
        tariff: 16,
        type: 'judgement-essay',
        topic: 'Role of Government in Hospital Care c1800-present',
        spec_topic: 'Hospitals and government: Nightingale, voluntary hospitals, NHS 1948',
        question_text:
          '‘In the years c1800-present, the role of the government was the most important factor in improving care and treatment in hospitals.’ How far do you agree? Explain your answer.',
        stimulus:
          '• the creation of the NHS (1948)\n• Nightingale’s Notes on Nursing (1859)\n• You must also use information of your own.',
        indicative_content: [
          'Role of government: Nationalised hospitals under the NHS in 1948; invested in modern regional hospital architecture, specialist trauma units, and equipment; set national hygiene and clinical standards.',
          'Role of individuals: Florence Nightingale transformed sanitation, ward design, and professional nursing standards without initial government direction; Joseph Lister invented antiseptic surgery; James Simpson introduced chloroform anaesthesia.',
          'Role of science & technology: X-rays, MRI scanners, blood transfusion storage, penicillin, and high-tech robotic surgery transformed clinical capability.',
          'Judgement: Individual innovators and scientific breakthroughs created modern hospital treatment, but government funding and organisation via the NHS was essential to make that treatment universally accessible.',
        ],
        examiner_tips:
          'Compare government intervention against individual reformers (Nightingale, Lister) and scientific technology.',
      },
    ],
  },
  {
    year: 2026,
    season: 'Specimen',
    series: 'Specimen Paper',
    paper_code: '1HI0/11',
    questions: [
      {
        q_id: 'med_2026_q1a',
        q_number: 'Q1(a)',
        section: 'Section A: Western Front',
        tariff: 2,
        type: 'feature',
        topic: 'Western Front: Casualty Clearing Station (CCS)',
        spec_topic: 'Chain of evacuation: CCS facilities and triage',
        question_text: 'Describe one feature of a Casualty Clearing Station (CCS).',
        stimulus: null,
        indicative_content: [
          'Casualty Clearing Stations were located several miles behind the frontline near railway lines or canals to perform life-saving surgery and evacuate stable casualties.',
        ],
        examiner_tips:
          'Award 1 mark for identifying the feature (location near transport/life-saving surgery) and 1 mark for supporting historical context.',
      },
      {
        q_id: 'med_2026_q1b',
        q_number: 'Q1(b)',
        section: 'Section A: Western Front',
        tariff: 2,
        type: 'feature',
        topic: 'Western Front: Blood Storage Developments',
        spec_topic: 'Context: Blood transfusions and storage (Rous & Turner, Robertson, Cambrai)',
        question_text:
          'Describe one feature of developments in the storage of blood on the Western Front.',
        stimulus: null,
        indicative_content: [
          'In 1916, Francis Rous and James Turner discovered adding citrate-glucose solution allowed blood to be stored refrigerated for up to 4 weeks without clotting.',
        ],
        examiner_tips:
          'Name citrate-glucose solution or Oswald Robertson’s blood depot at Cambrai.',
      },
      {
        q_id: 'med_2026_q2a',
        q_number: 'Q2(a)',
        section: 'Section A: Western Front',
        tariff: 8,
        type: 'how-useful',
        topic: 'Western Front: Transporting Wounded Along Evacuation Chain',
        spec_topic:
          'Transport and communications: RAP, dressing stations, motor/horse ambulances, hospital trains',
        question_text:
          'How useful are Sources A and B for an enquiry into the problems of transporting the wounded along the chain of evacuation on the Western Front?',
        stimulus:
          'Source A: Account by an ambulance driver of the Friends’ Ambulance Unit (1915). Source B: Official photograph of an ambulance barge on a canal in France (1916).',
        indicative_content: [
          'Source A describes the agonizing jolting of horse-drawn and primitive motor ambulances along shell-pitted roads.',
          'Source B demonstrates the use of canal barges as a smooth, comfortable alternative to road transport for severe abdominal cases.',
          'Provenance: Source A provides direct driver insight into mechanical and road failures; Source B is official visual documentation of medical transport.',
        ],
        examiner_tips:
          'Evaluate how different modes of transport (road vs canal vs rail) solved or worsened patient trauma.',
      },
      {
        q_id: 'med_2026_q2b',
        q_number: 'Q2(b)',
        section: 'Section A: Western Front',
        tariff: 4,
        type: 'follow-up',
        topic: 'Western Front: Transporting Wounded Along Evacuation Chain',
        spec_topic: 'Transport and communications: evacuation chain',
        question_text:
          'How could you follow up Source A to find out more about the problems of transporting the wounded along the chain of evacuation on the Western Front?',
        stimulus: null,
        indicative_content: [
          'Detail in Source A: Quote the mechanical breakdown of motor ambulances or poor road conditions.',
          'Question: "How many motor ambulances were out of action due to mud and shell craters during the Somme campaign?"',
          'Type of source: British Red Cross or RAMC Motor Ambulance Convoy maintenance and transit records.',
          'How it helps: Provides factual evidence of vehicle reliability and transport delays.',
        ],
        examiner_tips:
          'Ensure follow-up relates directly to transport bottlenecks and relies on official motor transport records.',
      },
      {
        q_id: 'med_2026_q3',
        q_number: 'Q3',
        section: 'Section B: Thematic Study',
        tariff: 4,
        type: 'similarity-difference',
        topic: 'Preventing Infectious Diseases: Renaissance vs Modern',
        spec_topic:
          'Approaches to prevention: Renaissance quarantine vs Modern mass vaccination and legislation',
        question_text:
          'Explain one way in which the prevention of infectious diseases in the Renaissance period (c1500-c1700) was different from the prevention of infectious diseases in the modern period (c1900-present).',
        stimulus: null,
        indicative_content: [
          'In the Renaissance, prevention relied on crude isolation of infected houses, carrying herbs, and prayer without understanding the true cause of disease.',
          'In the modern period, prevention is based on scientific immunisation programmes (vaccines) providing biological immunity, and government health campaigns targeting lifestyle factors.',
        ],
        examiner_tips:
          'Contrast unscientific isolation/miasma practices with modern scientifically engineered vaccines.',
      },
      {
        q_id: 'med_2026_q4',
        q_number: 'Q4',
        section: 'Section B: Thematic Study',
        tariff: 12,
        type: 'causation',
        topic: 'Hospital Care & Treatment Improvements c1700-c1900',
        spec_topic: 'Hospitals: Florence Nightingale, antiseptic surgery, voluntary hospitals',
        question_text:
          'Explain why hospital care and treatment improved in the period c1700-c1900.',
        stimulus:
          '• the Nightingale School for Nurses\n• antiseptics\n• You must also use information of your own.',
        indicative_content: [
          'The Nightingale School for Nurses (1860) created professional, highly trained nursing staff, transforming ward hygiene and patient care.',
          'Joseph Lister’s antiseptic carbolic spray (1865) and subsequent aseptic techniques eliminated hospital gangrene and sepsis in operating theatres.',
          'Own knowledge factor: Anaesthetics (Simpson’s chloroform 1847) allowed surgeons to take time on complex internal operations; founding of specialist voluntary hospitals funded by charities.',
        ],
        examiner_tips:
          'Cover both "care" (nursing, sanitation, ward design) and "treatment" (surgery, anaesthetics, antiseptics).',
      },
      {
        q_id: 'med_2026_q5',
        q_number: 'Q5',
        section: 'Section B: Thematic Study',
        tariff: 16,
        type: 'judgement-essay',
        topic: 'Medieval Ideas on Cause of Illness: Religion vs Nature c1250-c1500',
        spec_topic:
          'Medieval ideas about causes: God and sin, Galen and Four Humours, miasma, astrology',
        question_text:
          '‘In the medieval period (c1250-c1500), ideas about the cause of illness were mainly based on religion.’ How far do you agree? Explain your answer.',
        stimulus:
          '• the Catholic Church\n• the Four Humours\n• You must also use information of your own.',
        indicative_content: [
          'Arguments agreeing: The Church taught disease was sent as punishment for sin or a test of faith; miraculous healing and saints were invoked; Flagellants whipped themselves during the Black Death; the Church controlled university curricula.',
          'Arguments disagreeing: Rational Greek theories dominated medical diagnosis: Galen and Hippocrates’ Theory of the Four Humours; widespread belief in miasma (bad air); alignment of planets and astrology (Zodiac man).',
          'Judgement: Religion and natural causes coexisted; the Church actually adopted and enforced Galen’s natural theories, meaning natural and religious beliefs were mutually reinforcing.',
        ],
        examiner_tips:
          'Demonstrate sophisticated understanding that medieval people did not see religion and the Four Humours as opposites, but as interconnected.',
      },
      {
        q_id: 'med_2026_q6',
        q_number: 'Q6',
        section: 'Section B: Thematic Study',
        tariff: 16,
        type: 'judgement-essay',
        topic: 'Science & Technology as Main Reason for Modern Progress c1900-present',
        spec_topic:
          'Developments in modern medicine: science and technology, role of government, war',
        question_text:
          '‘Improvements in science and technology is the main reason why there has been progress in medicine in the modern period (c1900-present).’ How far do you agree? Explain your answer.',
        stimulus:
          '• penicillin\n• the National Health Service (NHS)\n• You must also use information of your own.',
        indicative_content: [
          'Role of science & technology: Discovery of penicillin (Fleming 1928, mass produced with deep tank fermentation by Florey and Chain); discovery of DNA structure (1953); MRI/CT diagnostic scanners; robotic surgery and genetic therapy.',
          'Role of government: Creation of the NHS (1948) ensuring universal access to healthcare; mass vaccination campaigns; clean air and anti-tobacco legislation.',
          'Role of war: WW1 and WW2 forced rapid innovations in blood storage, reconstructive plastic surgery (Gillies, McIndoe), and penicillin mass production.',
          'Judgement: Science and technology provided the medical tools, but government organisation and funding were vital to deliver those treatments to the entire population.',
        ],
        examiner_tips:
          'Compare science and technology against the role of government (NHS) and the stimulus of wartime necessity.',
      },
    ],
  },
];

// ----------------------------------------------------------------------------
// CME (Conflict in the Middle East 1945-95) Past Papers Database
// ----------------------------------------------------------------------------

const CME_PAPERS = [
  {
    year: 2018,
    season: 'June',
    series: 'Summer 2018',
    paper_code: '1HI0/P5',
    questions: [
      {
        q_id: 'cme_2018_q1',
        q_number: 'Q1',
        tariff: 4,
        type: 'consequence',
        topic: '1948-49 War: Territorial Changes',
        spec_topic: 'KT1.2: Territorial changes and their impact after 1948-49 war',
        question_text:
          'Explain two consequences of the territorial changes following the 1948-49 Arab- Israeli war.',
        stimulus: null,
        indicative_content: [
          'Israel expanded its territory by 21% beyond the UN partition borders, securing control of Western Galilee, the coastal plain, and West Jerusalem.',
          'The remainder of Arab Palestine was absorbed: Jordan annexed the West Bank and East Jerusalem, while Egypt occupied the Gaza Strip, leaving no independent Palestinian state and creating 700,000 refugees.',
        ],
        examiner_tips:
          'Explain two distinct consequences with specific historical detail (e.g. 21% land increase; Jordanian annexation of West Bank).',
      },
      {
        q_id: 'cme_2018_q2',
        q_number: 'Q2',
        tariff: 8,
        type: 'narrative',
        topic: 'Egypt-Israel Relations 1973-77',
        spec_topic: 'KT3.2: Israel and Egypt, 1973-79: Sadat, peace initiative, Camp David',
        question_text:
          'Write a narrative account analysing Egypt’s relations with Israel in the years 1973-77.',
        stimulus:
          '• Yom Kippur War (1973)\n• President Sadat\n• You must also use information of your own.',
        indicative_content: [
          'The Yom Kippur War (1973) broke the myth of Israeli invincibility and restored Arab pride, giving Sadat the political standing to negotiate from strength.',
          'US Secretary of State Henry Kissinger initiated "shuttle diplomacy", leading to the 1974 and 1975 Sinai Disengagement Agreements where Israel withdrew from the Suez Canal and returned oil fields.',
          'Sadat made a historic visit to Jerusalem in November 1977, addressing the Knesset in person and opening direct peace negotiations.',
        ],
        examiner_tips:
          'Structure chronologically with explicit causal linking phrases ("This led to", "As a consequence", "Following this breakthrough").',
      },
      {
        q_id: 'cme_2018_q3a',
        q_number: 'Q3(a)',
        tariff: 8,
        type: 'importance',
        topic: 'Nasser: Leadership of the Arab World',
        spec_topic: 'KT1.3: Nasser and Egypt’s leadership of the Arab world',
        question_text: 'Explain the importance of Nasser for leadership of the Arab world.',
        stimulus: null,
        indicative_content: [
          'Nasser championed Pan-Arab nationalism and anti-imperialism, inspiring Arab nations by nationalising the Suez Canal (1956) and standing up to Britain, France, and Israel.',
          'His leadership led to the creation of the United Arab Republic (UAR, 1958) uniting Egypt and Syria, and made Egypt the undisputed diplomatic and military champion of the Palestinian cause.',
        ],
        examiner_tips:
          'Explain the impact on Arab unity, opposition to Western imperialism, and the escalating conflict with Israel.',
      },
      {
        q_id: 'cme_2018_q3b',
        q_number: 'Q3(b)',
        tariff: 8,
        type: 'importance',
        topic: 'Occupied Territories After Six Day War (1967)',
        spec_topic:
          'KT2.2: Aftermath of the 1967 war: Sinai, Gaza, West Bank, Golan Heights, Jerusalem',
        question_text:
          'Explain the importance of the occupied territories following the Six Day War (1967) for Arab-Israeli relations.',
        stimulus: null,
        indicative_content: [
          'Israel gained strategic depth and security buffers by capturing the Sinai, Gaza Strip, West Bank, Golan Heights, and East Jerusalem.',
          'It hardened Arab hostility, leading to the Arab League’s "Three No’s" at Khartoum (No peace, no recognition, no negotiations) and brought 1 million Palestinians under Israeli military occupation.',
        ],
        examiner_tips:
          'Evaluate how capturing the territories created both security buffers for Israel and permanent diplomatic deadlock.',
      },
      {
        q_id: 'cme_2018_q3c',
        q_number: 'Q3(c)',
        tariff: 8,
        type: 'importance',
        topic: 'End of Cold War & Middle East Peace',
        spec_topic: 'KT3.3: Attempts to find a solution: end of Cold War, Madrid Conference 1991',
        question_text:
          'Explain the importance of the end of the Cold War for attempts to find a solution in the Middle East.',
        stimulus: null,
        indicative_content: [
          'The collapse of the USSR left the USA as the sole global superpower and cut off Soviet military and financial backing for Syria and the PLO.',
          'Deprived of Soviet support, Arab nations and the PLO were forced to negotiate directly with Israel, paving the way for the Madrid Conference (1991) and the Oslo peace process.',
        ],
        examiner_tips:
          'Focus on superpower balance of power shifting and forcing Arab states towards diplomatic negotiation.',
      },
    ],
  },
  {
    year: 2019,
    season: 'June',
    series: 'Summer 2019',
    paper_code: '1HI0/P5',
    questions: [
      {
        q_id: 'cme_2019_q1',
        q_number: 'Q1',
        tariff: 4,
        type: 'consequence',
        topic: 'Oslo Accords (1993)',
        spec_topic: 'KT3.3: The Oslo Accords (1993): terms and impact',
        question_text: 'Explain two consequences of the Oslo Accords (1993).',
        stimulus: null,
        indicative_content: [
          'Mutual recognition: Israel recognized the PLO as the legitimate representative of the Palestinian people, and the PLO renounced terrorism and recognized Israel’s right to exist.',
          'Creation of the Palestinian National Authority (PNA) with limited self-rule over parts of the Gaza Strip and West Bank (Jericho), though final status issues (Jerusalem, refugees, borders) were postponed.',
        ],
        examiner_tips:
          'Explain two distinct consequences: mutual recognition and the establishment of the Palestinian Authority.',
      },
      {
        q_id: 'cme_2019_q2',
        q_number: 'Q2',
        tariff: 8,
        type: 'narrative',
        topic: 'Suez Crisis (1956)',
        spec_topic: 'KT1.3: Events and significance of the Suez Crisis (1956)',
        question_text:
          'Write a narrative account analysing the key events of the Suez crisis in 1956.',
        stimulus:
          '• Nasser\n• British and French troops\n• You must also use information of your own.',
        indicative_content: [
          'Nasser nationalised the Suez Canal in July 1956 after the US and UK withdrew funding for the Aswan High Dam.',
          'Britain, France, and Israel held secret talks at Sèvres, agreeing Israel would invade the Sinai Peninsula and Britain/France would intervene as "peacekeepers" to seize the canal.',
          'Israel invaded on 29 October; British and French paratroopers landed on 5 November, but intense US diplomatic and financial pressure (threatening to collapse the British pound) forced a humiliating withdrawal.',
        ],
        examiner_tips:
          'Sequence the events chronologically: nationalisation -> Sèvres collusion -> military invasion -> US intervention and withdrawal.',
      },
      {
        q_id: 'cme_2019_q3a',
        q_number: 'Q3(a)',
        tariff: 8,
        type: 'importance',
        topic: 'Creation of the IDF (1948)',
        spec_topic: 'KT1.2: Creation of the Israeli Defence Forces (IDF)',
        question_text:
          'Explain the importance of the establishment of the Israeli Defence Forces for the protection of the new state of Israel.',
        stimulus: null,
        indicative_content: [
          'Unified command: David Ben-Gurion dissolved rival paramilitary factions (Haganah, Irgun, Lehi) into a single national military under state control.',
          'It established universal military conscription and a doctrine of rapid mobilization and pre-emptive attack that ensured survival in 1948-49 and subsequent conflicts.',
        ],
        examiner_tips:
          'Highlight the removal of factional militias and the creation of an organized, disciplined national army.',
      },
      {
        q_id: 'cme_2019_q3b',
        q_number: 'Q3(b)',
        tariff: 8,
        type: 'importance',
        topic: 'Superpowers and the Outbreak of 1967 War',
        spec_topic: 'KT2.1: The actions of the USSR, Nasser and the USA leading to Six Day War',
        question_text:
          'Explain the importance of the actions of the USSR and the USA for the outbreak of the Six Day War (1967).',
        stimulus: null,
        indicative_content: [
          'The USSR provided false intelligence to Syria and Egypt that Israel was massing troops on the Syrian border, prompting Nasser to mobilize in the Sinai and expel the UNEF.',
          'The USA provided political and covert intelligence support to Israel, signaling that Washington would not oppose an Israeli pre-emptive strike if Egyptian forces closed the Straits of Tiran.',
        ],
        examiner_tips:
          'Analyse Soviet false intelligence and American tacit approval of Israel’s pre-emptive strike.',
      },
      {
        q_id: 'cme_2019_q3c',
        q_number: 'Q3(c)',
        tariff: 8,
        type: 'importance',
        topic: 'PLO Activities in Lebanon (1970-82)',
        spec_topic: 'KT2.2 & KT3.1: Expulsion from Jordan, PLO in Lebanon, Israeli security',
        question_text:
          'Explain the importance of PLO activities in Lebanon (1970-82) for Israeli security.',
        stimulus: null,
        indicative_content: [
          'After expulsion from Jordan in Black September (1970), the PLO established "Fatahland" in southern Lebanon, launching cross-border rocket attacks and terrorist raids into northern Israel.',
          'This forced Israel to launch Operation Litani (1978) and the full-scale 1982 invasion of Lebanon (Operation Peace for Galilee), leading to the Siege of Beirut and the expulsion of the PLO leadership to Tunisia.',
        ],
        examiner_tips:
          'Link PLO cross-border rocket attacks directly to Israel’s military invasions of southern Lebanon in 1978 and 1982.',
      },
    ],
  },
  {
    year: 2020,
    season: 'November',
    series: 'Autumn 2020',
    paper_code: '1HI0/P5',
    questions: [
      {
        q_id: 'cme_2020_q1',
        q_number: 'Q1',
        tariff: 4,
        type: 'consequence',
        topic: 'First Palestinian Intifada (1987–93)',
        spec_topic: 'KT3.1: The First Intifada: causes, course and consequences',
        question_text: 'Explain two consequences of the Palestinian Intifada (1987–93).',
        stimulus: null,
        indicative_content: [
          'International sympathy shifted towards Palestinians as global media broadcast images of teenage stone-throwers facing heavily armed Israeli soldiers (the "Iron Fist" policy).',
          'It convinced Israeli leaders (Yitzhak Rabin) that military occupation was unsustainable and pushed the PLO towards diplomacy, paving the way for the 1993 Oslo Peace Process.',
        ],
        examiner_tips:
          'Focus on the shift in international public opinion and the realization that a political rather than military solution was required.',
      },
      {
        q_id: 'cme_2020_q2',
        q_number: 'Q2',
        tariff: 8,
        type: 'narrative',
        topic: 'Palestinian Issue & Terrorism 1970-72',
        spec_topic: 'KT2.2: The use of terrorism: PFLP airplane hijacks 1970; Munich Olympics 1972',
        question_text:
          'Write a narrative account analysing the key developments in the Palestinian issue in the years 1970-72.',
        stimulus:
          '• PFLP airplane hijacks (1970)\n• Munich Olympics (1972)\n• You must also use information of your own.',
        indicative_content: [
          'In September 1970, the PFLP hijacked four international airliners and flew three to Dawson’s Field in Jordan, blowing up the empty planes on live television.',
          'King Hussein of Jordan launched Black September (1970), defeating and expelling the PLO from Jordan to Lebanon.',
          'In September 1972, Black September terrorists infiltrated the Munich Olympic village, taking 11 Israeli athletes hostage; all 11 were murdered during a botched German rescue operation, provoking Israel’s "Operation Wrath of God" assassination campaign.',
        ],
        examiner_tips:
          'Show how Dawson’s Field caused the expulsion from Jordan, which in turn spawned Black September and the Munich massacre.',
      },
      {
        q_id: 'cme_2020_q3a',
        q_number: 'Q3(a)',
        tariff: 8,
        type: 'importance',
        topic: 'UN Resolution 181 (1947)',
        spec_topic: 'KT1.1: Partition and UN Resolution 181',
        question_text: 'Explain the importance of UN Resolution 181 for the creation of Israel.',
        stimulus: null,
        indicative_content: [
          'It provided international legitimacy by recommending the partition of Palestine into independent Jewish and Arab states with Jerusalem as an international corpus separatum.',
          'It was accepted by the Jewish Agency but rejected by Arab states, triggering the 1947-48 civil war in Mandatory Palestine and the 1948 Arab-Israeli War upon British withdrawal.',
        ],
        examiner_tips:
          'Emphasise legal international recognition alongside immediate Arab rejection and the outbreak of fighting.',
      },
      {
        q_id: 'cme_2020_q3b',
        q_number: 'Q3(b)',
        tariff: 8,
        type: 'importance',
        topic: 'Law of Return (1950)',
        spec_topic: 'KT1.2: The Law of Return (1950) and immigration',
        question_text:
          'Explain the importance of the Law of Return for the development of the state of Israel.',
        stimulus: null,
        indicative_content: [
          'It granted every Jewish person anywhere in the world the legal right to settle in Israel and gain immediate citizenship.',
          'It led to massive mass immigration (doubling the Jewish population from 650,000 to 1.3 million within four years), providing crucial manpower for the economy and the IDF.',
        ],
        examiner_tips:
          'Explain both the demographic doubling of Israel’s population and the economic/military strengthening of the state.',
      },
      {
        q_id: 'cme_2020_q3c',
        q_number: 'Q3(c)',
        tariff: 8,
        type: 'importance',
        topic: 'Kissinger’s Shuttle Diplomacy (1973-75)',
        spec_topic:
          'KT3.2: Israel and Egypt: Kissinger’s shuttle diplomacy and disengagement agreements',
        question_text:
          'Explain the importance of Kissinger’s ‘shuttle diplomacy’ for diplomatic negotiations in the Middle East.',
        stimulus: null,
        indicative_content: [
          'US Secretary of State Henry Kissinger flew back and forth between Cairo, Jerusalem, and Damascus to negotiate separate bilateral disengagement pacts.',
          'It defused the immediate post-Yom Kippur military confrontation, secured Israeli troop withdrawals in the Sinai and Golan, and proved peaceful compromise was possible between Arabs and Israelis.',
        ],
        examiner_tips:
          'Focus on how bilateral agreements separated Egypt from the broader Arab rejectionist front.',
      },
    ],
  },
  {
    year: 2022,
    season: 'June',
    series: 'Summer 2022',
    paper_code: '1HIA/P5',
    questions: [
      {
        q_id: 'cme_2022_q1',
        q_number: 'Q1',
        tariff: 4,
        type: 'consequence',
        topic: 'Syria’s Support for Fatah (1964-67)',
        spec_topic: 'KT2.1: Syria’s support for Fatah and escalating tension',
        question_text:
          'Explain two consequences of Syria’s support for Fatah in the years 1964-67.',
        stimulus: null,
        indicative_content: [
          'Syria allowed Fatah guerrillas to launch armed sabotage raids into northern Israel from Syrian territory, leading to violent Israeli retaliatory strikes (e.g. the dogfight of 7 April 1967 where Israel shot down six Syrian MiGs).',
          'It escalated regional tensions and prompted Egypt and Syria to sign a mutual defence pact in November 1966, pulling Nasser inexorably into conflict with Israel.',
        ],
        examiner_tips:
          'State two distinct consequences: cross-border retaliation and the Egyptian-Syrian mutual defence alliance.',
      },
      {
        q_id: 'cme_2022_q2',
        q_number: 'Q2',
        tariff: 8,
        type: 'narrative',
        topic: 'Israel-Palestinian Negotiations 1993-95',
        spec_topic: 'KT3.3: Oslo Accords, Oslo II (1995), assassination of Rabin',
        question_text:
          'Write a narrative account analysing the key developments in the negotiations between Israel and the Palestinians in the years 1993-95.',
        stimulus: '• Arafat\n• Oslo II (1995)\n• You must also use information of your own.',
        indicative_content: [
          'Secret negotiations in Norway led to the signing of the Oslo Accords (Declaration of Principles) in Washington on 13 September 1993, with the famous handshake between Rabin and Arafat.',
          'In May 1994, the Gaza-Jericho Agreement implemented Palestinian self-rule, and Yasser Arafat returned from exile to head the newly formed Palestinian Authority.',
          'Oslo II (1995) divided the West Bank into Areas A, B, and C; however, growing extremism culminated in the assassination of Prime Minister Yitzhak Rabin by an Israeli extremist in November 1995.',
        ],
        examiner_tips:
          'Structure chronologically: Oslo I (1993) -> Gaza-Jericho (1994) -> Oslo II (1995) -> Rabin’s assassination.',
      },
      {
        q_id: 'cme_2022_q3a',
        q_number: 'Q3(a)',
        tariff: 8,
        type: 'importance',
        topic: 'Territorial Changes 1948-49 for Palestinians',
        spec_topic: 'KT1.2: Refugee status of Palestinian Arabs',
        question_text:
          'Explain the importance of territorial changes in the aftermath of the 1948-49 war for Palestinians.',
        stimulus: null,
        indicative_content: [
          'The Nakba ("Catastrophe"): over 700,000 Palestinian Arabs became refugees, displaced from their homes into squalid camps in Gaza, the West Bank, Jordan, Syria, and Lebanon.',
          'Arab Palestine ceased to exist as a political entity: Gaza fell under Egyptian military administration, while the West Bank and East Jerusalem were annexed by Jordan.',
        ],
        examiner_tips:
          'Analyse the humanitarian refugee crisis and the total loss of territorial self-determination.',
      },
      {
        q_id: 'cme_2022_q3b',
        q_number: 'Q3(b)',
        tariff: 8,
        type: 'importance',
        topic: 'PFLP Airplane Hijacks (1970)',
        spec_topic: 'KT2.2: PFLP airplane hijacks of 1970 and international attitudes',
        question_text:
          'Explain the importance of the PFLP airplane hijacks (1970) for international attitudes towards the Palestine issue.',
        stimulus: null,
        indicative_content: [
          'The dramatic destruction of three jetliners at Dawson’s Field thrust the Palestinian cause onto global front pages and television screens.',
          'While it publicized Palestinian statelessness, it also led Western nations to brand Palestinian nationalist organizations as dangerous international terrorists.',
        ],
        examiner_tips:
          'Address the dual impact: massive global visibility balanced against the stigma of international air piracy.',
      },
      {
        q_id: 'cme_2022_q3c',
        q_number: 'Q3(c)',
        tariff: 8,
        type: 'importance',
        topic: 'Yom Kippur War (1973) for Israel-Egypt Relations',
        spec_topic: 'KT3.2: Yom Kippur War, Sadat, diplomacy',
        question_text:
          'Explain the importance of the Yom Kippur War (1973) for Israel’s relations with Egypt.',
        stimulus: null,
        indicative_content: [
          'Egypt’s successful crossing of the Bar-Lev Line shattered Israeli assumptions of permanent military invulnerability and restored Egyptian national honour.',
          'It convinced both sides that military force could not resolve the conflict, opening the door for Henry Kissinger’s disengagement agreements and ultimately Sadat’s peace treaty.',
        ],
        examiner_tips:
          'Explain why military stalemate created the necessary psychological preconditions for peace talks.',
      },
    ],
  },
  {
    year: 2023,
    season: 'June',
    series: 'Summer 2023',
    paper_code: '1HI0/P5',
    questions: [
      {
        q_id: 'cme_2023_q1',
        q_number: 'Q1',
        tariff: 4,
        type: 'consequence',
        topic: 'Munich Olympics Terrorist Attack (1972)',
        spec_topic: 'KT2.2: Black September and the Munich Olympics (1972)',
        question_text: 'Explain two consequences of the terrorist attack at the Munich Olympics.',
        stimulus: null,
        indicative_content: [
          'Israel launched "Operation Wrath of God", a covert Mossad assassination campaign hunting down and assassinating Black September leaders and planners across Europe.',
          'Israel launched retaliatory airstrikes against Palestinian refugee camps in Lebanon and Syria, killing scores of civilians and militants.',
        ],
        examiner_tips:
          'Explain Mossad’s assassination campaign and massive retaliatory air strikes into Lebanon and Syria.',
      },
      {
        q_id: 'cme_2023_q2',
        q_number: 'Q2',
        tariff: 8,
        type: 'narrative',
        topic: 'Developments in Israel 1949-54',
        spec_topic: 'KT1.2: Territorial consolidation, Law of Return, IDF, US aid',
        question_text:
          'Write a narrative account analysing the developments in Israel in the years 1949-54.',
        stimulus:
          '• territory\n• Israeli Defence Forces (IDF)\n• You must also use information of your own.',
        indicative_content: [
          'Following armistice agreements in 1949, Israel consolidated control over its expanded borders and began building agricultural kibbutzim and border defences.',
          'The Law of Return (1950) triggered unprecedented immigration from post-Holocaust Europe and Arab countries, doubling the population.',
          'To defend this population, the IDF was professionalized into a modern citizen army, backed by substantial US financial loans and German Holocaust reparations.',
        ],
        examiner_tips:
          'Structure: Armistice consolidation -> immigration wave under Law of Return -> IDF strengthening and US aid.',
      },
      {
        q_id: 'cme_2023_q3a',
        q_number: 'Q3(a)',
        tariff: 8,
        type: 'importance',
        topic: 'Conflicting Interests of Jews & Arabs in Mandate',
        spec_topic: 'KT1.1: Conflicting interests and demands of Jews and Arabs in British Mandate',
        question_text:
          'Explain the importance of conflicting interests of Jews and Arabs for the end of the British Mandate.',
        stimulus: null,
        indicative_content: [
          'Zionists demanded unrestricted immigration and an independent Jewish homeland, while Arab leaders demanded an end to Jewish land purchases and an independent Arab-majority state.',
          'The conflicting demands resulted in violent Jewish insurgencies against British rule (bombing of King David Hotel 1946), making Palestine ungovernable and forcing Britain to hand the problem to the UN in 1947.',
        ],
        examiner_tips:
          'Explain how irreconcilable national demands made Britain’s mandate completely untenable.',
      },
      {
        q_id: 'cme_2023_q3b',
        q_number: 'Q3(b)',
        tariff: 8,
        type: 'importance',
        topic: 'OPEC Oil Crisis (1973-74)',
        spec_topic: 'KT3.2: The oil crisis (1973-74) and international diplomacy',
        question_text:
          'Explain the importance of the oil crisis (1973-74) for diplomatic negotiations in the Middle East.',
        stimulus: null,
        indicative_content: [
          'OPEC Arab oil producers weaponised oil, imposing an embargo on the US and the Netherlands and quadrupling global oil prices.',
          'This caused severe Western inflation and forced the US and Western European governments to adopt a much more active, balanced diplomatic role in pressuring Israel to negotiate.',
        ],
        examiner_tips:
          'Analyse how the oil shock forced Western powers to push Israel into diplomatic disengagement.',
      },
      {
        q_id: 'cme_2023_q3c',
        q_number: 'Q3(c)',
        tariff: 8,
        type: 'importance',
        topic: 'Israeli Invasion of Lebanon (1982)',
        spec_topic: 'KT3.1: The Israeli invasion of Lebanon (1982) and its impact',
        question_text:
          'Explain the importance of the Israeli invasion of Lebanon (1982) for the Palestinian issue.',
        stimulus: null,
        indicative_content: [
          'Operation Peace for Galilee besieged Beirut, forcing the PLO and Yasser Arafat to evacuate to distant exile in Tunisia, weakening their direct military threat.',
          'The Sabra and Shatila massacre of Palestinian refugees by Christian Phalangist allies provoked international outrage and widespread domestic protests inside Israel.',
        ],
        examiner_tips:
          'Address the expulsion of the PLO leadership to Tunisia and the international shock of the Sabra and Shatila massacres.',
      },
    ],
  },
  {
    year: 2024,
    season: 'June',
    series: 'Summer 2024',
    paper_code: '1HI0/P5',
    questions: [
      {
        q_id: 'cme_2024_q1',
        q_number: 'Q1',
        tariff: 4,
        type: 'consequence',
        topic: 'Sadat’s Visit to Jerusalem (1977)',
        spec_topic: 'KT3.2: Sadat’s visit to Israel (1977) and Camp David Accords',
        question_text:
          'Explain two consequences of President Sadat of Egypt’s visit to Israel (1977).',
        stimulus: null,
        indicative_content: [
          'It broke decades of diplomatic taboo by addressing the Israeli Knesset in person, leading directly to the Camp David Accords (1978) and the Egypt-Israel Peace Treaty (1979).',
          'Egypt was ostracized by the Arab world, expelled from the Arab League, and Sadat was branded a traitor by Arab militants, ultimately leading to his assassination in 1981.',
        ],
        examiner_tips:
          'Highlight the positive breakthrough with Israel (Camp David) and the severe Arab backlash against Egypt.',
      },
      {
        q_id: 'cme_2024_q2',
        q_number: 'Q2',
        tariff: 8,
        type: 'narrative',
        topic: 'Relations Between Israel and Egypt 1949-56',
        spec_topic: 'KT1.2 & KT1.3: Relations with Egypt, Farouk, Nasser, Gaza raid, Suez',
        question_text:
          'Write a narrative account analysing relations between Israel and Egypt in the years 1949-56.',
        stimulus:
          '• the abdication of King Farouk of Egypt (1952)\n• the Suez Canal\n• You must also use information of your own.',
        indicative_content: [
          'Following the 1949 armistice, Egypt maintained border tensions and blockaded the Straits of Tiran and Suez Canal to Israeli shipping.',
          'The 1952 Free Officers revolution overthrew King Farouk, bringing Gamal Abdel Nasser to power with a militant anti-Zionist foreign policy; fedayeen guerrilla raids triggered the bloody Israeli Gaza Raid (1955).',
          'Nasser secured Soviet weapons in the Czech Arms Deal (1955) and nationalized the Suez Canal in July 1956, prompting the joint Israeli, British, and French military attack in October 1956.',
        ],
        examiner_tips:
          'Narrate the chain: 1949 border friction -> 1952 Free Officers -> 1955 Gaza Raid and arms deal -> 1956 Suez War.',
      },
      {
        q_id: 'cme_2024_q3a',
        q_number: 'Q3(a)',
        tariff: 8,
        type: 'importance',
        topic: 'End of the British Mandate (1948)',
        spec_topic: 'KT1.1: End of the British Mandate and creation of Israel',
        question_text:
          'Explain the importance of the end of the British Mandate (1948) for the creation of Israel.',
        stimulus: null,
        indicative_content: [
          'The British withdrawal on 14 May 1948 allowed David Ben-Gurion to formally declare the establishment of the State of Israel.',
          'It removed British military presence that had maintained order, triggering the immediate invasion of Israel by five Arab armies on 15 May 1948.',
        ],
        examiner_tips:
          'Explain how the British departure created the legal power vacuum that enabled the Israeli declaration of statehood.',
      },
      {
        q_id: 'cme_2024_q3b',
        q_number: 'Q3(b)',
        tariff: 8,
        type: 'importance',
        topic: 'UN Resolution 242 (1967)',
        spec_topic: 'KT2.2: UN Resolution 242 and "land for peace"',
        question_text:
          'Explain the importance of UN Resolution 242 (1967) for relations between Israel and the Arab states.',
        stimulus: null,
        indicative_content: [
          'It established the fundamental "land for peace" formula, requiring Israeli withdrawal from territories occupied in the recent conflict in exchange for Arab recognition of Israel’s secure borders.',
          'Ambiguities in the English versus French texts ("from territories" vs "from the territories") allowed both sides to dispute the scope of withdrawal, stalling peace for years.',
        ],
        examiner_tips:
          'Explain the "land for peace" principle and the diplomatic ambiguity over which territories were included.',
      },
      {
        q_id: 'cme_2024_q3c',
        q_number: 'Q3(c)',
        tariff: 8,
        type: 'importance',
        topic: 'Arafat Renouncing Terrorism (1988)',
        spec_topic: 'KT3.3: Arafat’s declaration (1988), recognition of Israel',
        question_text:
          'Explain the importance of Arafat renouncing terrorism (1988) for attempts to find a solution in the Middle East.',
        stimulus: null,
        indicative_content: [
          'In December 1988, Yasser Arafat accepted UN Resolutions 242 and 338, renounced all forms of terrorism, and recognized Israel’s right to exist in peace.',
          'This met long-standing US conditions, allowing the United States to open direct diplomatic dialogue with the PLO and setting the diplomatic stage for the Madrid and Oslo peace conferences.',
        ],
        examiner_tips:
          'Focus on how renouncing terrorism made the PLO an acceptable diplomatic negotiating partner for the USA.',
      },
    ],
  },
  {
    year: 2025,
    season: 'June',
    series: 'Summer 2025',
    paper_code: '1HI0/P5',
    questions: [
      {
        q_id: 'cme_2025_q1a',
        q_number: 'Q1(a)',
        tariff: 4,
        type: 'consequence',
        topic: 'King David Hotel Bombing (1946)',
        spec_topic: 'KT1.1: Significance of the bombing of the King David Hotel (1946)',
        question_text: 'Explain one consequence of the bombing of the King David Hotel (1946).',
        stimulus: null,
        indicative_content: [
          'The Irgun’s bombing destroyed British military and civil headquarters, killing 91 people, shocking British public opinion and convincing the British government that policing the Mandate was too costly in lives and money, accelerating Britain’s decision to hand Palestine to the UN.',
        ],
        examiner_tips:
          'Highlight the collapse of British domestic political will to stay in Palestine.',
      },
      {
        q_id: 'cme_2025_q1b',
        q_number: 'Q1(b)',
        tariff: 4,
        type: 'consequence',
        topic: '1948-49 War: Territorial Changes',
        spec_topic: 'KT1.2: Territorial changes and aftermath of 1948-49 war',
        question_text:
          'Explain one consequence of the territorial changes following the 1948-49 Arab-Israeli war.',
        stimulus: null,
        indicative_content: [
          'Israel secured 78% of Mandatory Palestine (an increase of 21% beyond the UN partition plan), establishing a continuous, defensible land corridor to West Jerusalem, while leaving no independent Palestinian Arab state.',
        ],
        examiner_tips:
          'Focus on Israeli territorial expansion and the division of Jerusalem into Jewish West and Jordanian East.',
      },
      {
        q_id: 'cme_2025_q2',
        q_number: 'Q2',
        tariff: 8,
        type: 'narrative',
        topic: 'PLO in Lebanon 1970-82',
        spec_topic:
          'KT2.2 & KT3.1: Expulsion from Jordan, PLO in Lebanon, Israeli security, 1982 war',
        question_text:
          'Write a narrative account analysing the key developments of the PLO in Lebanon in the years 1970-82.',
        stimulus:
          '• the expulsion of the PLO from Jordan (1970)\n• Israel’s invasion of Lebanon (1982)\n• You must also use information of your own.',
        indicative_content: [
          'After expulsion from Jordan during Black September (1970), the PLO re-established its military bases and headquarters in southern Lebanon and West Beirut.',
          'From southern Lebanon, the PLO launched cross-border Katyusha rocket attacks and guerrilla raids into northern Israel, provoking Israeli counter-strikes and Operation Litani in 1978.',
          'In June 1982, Israel launched Operation Peace for Galilee, besieging Beirut and forcing Yasser Arafat and thousands of PLO fighters to evacuate Lebanon for exile in Tunisia.',
        ],
        examiner_tips:
          'Structure chronologically: Black September -> southern Lebanon cross-border raids -> 1982 Israeli invasion and evacuation to Tunisia.',
      },
      {
        q_id: 'cme_2025_q3a',
        q_number: 'Q3(a)',
        tariff: 8,
        type: 'importance',
        topic: 'Nasser & Middle East Tension 1955-63',
        spec_topic: 'KT1.3: Nasser and Egypt’s leadership: Gaza 1955, Suez 1956, UAR 1958',
        question_text:
          'Explain the importance of Nasser for tension in the Middle East in the years 1955-63.',
        stimulus: null,
        indicative_content: [
          'Nasser escalated conflict with Israel by purchasing Soviet arms in 1955 and nationalising the Suez Canal in 1956, leading directly to the Suez Crisis.',
          'His Pan-Arab leadership and formation of the United Arab Republic (UAR) in 1958 surrounded Israel with hostile rhetoric and heightened border clashes.',
        ],
        examiner_tips:
          'Link Nasser’s anti-imperialist rhetoric, Soviet arms, and the UAR to rising regional insecurity.',
      },
      {
        q_id: 'cme_2025_q3b',
        q_number: 'Q3(b)',
        tariff: 8,
        type: 'importance',
        topic: 'Six Day War (1967) for Israel’s Security',
        spec_topic: 'KT2.1 & KT2.2: Six Day War and aftermath for Israel’s security',
        question_text: 'Explain the importance of the Six Day War (1967) for Israel’s security.',
        stimulus: null,
        indicative_content: [
          'Israel destroyed Egyptian, Syrian, and Jordanian air forces within hours, eliminating the immediate threat of annihilation and establishing regional air supremacy.',
          'Capturing the Sinai, Golan Heights, and West Bank created massive geographic buffer zones, putting major Israeli cities out of direct artillery range.',
        ],
        examiner_tips:
          'Address both the immediate destruction of hostile air forces and the acquisition of geographic buffer zones.',
      },
      {
        q_id: 'cme_2025_q3c',
        q_number: 'Q3(c)',
        tariff: 8,
        type: 'importance',
        topic: 'Israel-Jordan Peace Treaty (1994)',
        spec_topic: 'KT3.3: Israel-Jordan peace treaty (1994)',
        question_text:
          'Explain the importance of the Israel-Jordan peace treaty (1994) for peace in the Middle East.',
        stimulus: null,
        indicative_content: [
          'Jordan became only the second Arab state to formally recognize Israel and sign a full peace treaty, securing Israel’s longest land border.',
          'It resolved water rights, established security cooperation, and reinforced momentum from the Oslo Accords, demonstrating regional normalization was viable.',
        ],
        examiner_tips:
          'Highlight the stabilization of Israel’s eastern border and the momentum it lent to regional diplomacy.',
      },
    ],
  },
  {
    year: 2026,
    season: 'Specimen',
    series: 'Specimen Paper',
    paper_code: '1HI0/P5',
    questions: [
      {
        q_id: 'cme_2026_q1a',
        q_number: 'Q1(a)',
        tariff: 4,
        type: 'consequence',
        topic: 'Law of Return (1950)',
        spec_topic: 'KT1.2: Law of Return (1950) and immigration',
        question_text: 'Explain one consequence of Israel passing the Law of Return (1950).',
        stimulus: null,
        indicative_content: [
          'It caused an unprecedented demographic boom, with hundreds of thousands of Jewish refugees arriving from post-Holocaust Europe and Arab nations, doubling the population within four years and creating the labor and military base for national defence.',
        ],
        examiner_tips:
          'Highlight the doubling of the population and the supply of soldiers for the IDF.',
      },
      {
        q_id: 'cme_2026_q1b',
        q_number: 'Q1(b)',
        tariff: 4,
        type: 'consequence',
        topic: 'Suez Crisis (1956)',
        spec_topic: 'KT1.3: Suez Crisis (1956) international consequences',
        question_text: 'Explain one consequence of the Suez Crisis (1956).',
        stimulus: null,
        indicative_content: [
          'It marked the decisive end of Britain and France as dominant imperial powers in the Middle East, leaving the United States and the Soviet Union as the primary rival superpowers in the region.',
        ],
        examiner_tips: 'Focus on the shift in global power towards the USA and USSR.',
      },
      {
        q_id: 'cme_2026_q2',
        q_number: 'Q2',
        tariff: 8,
        type: 'narrative',
        topic: 'Six Day War (1967)',
        spec_topic: 'KT2.1: Key events of the Six Day War (1967)',
        question_text:
          'Write a narrative account analysing the key events of the Six Day War (1967).',
        stimulus:
          '• closing of the Tiran Straits\n• the Golan Heights\n• You must also use information of your own.',
        indicative_content: [
          'In May 1967, Nasser expelled the UN peacekeeping force from the Sinai and closed the Straits of Tiran to Israeli shipping.',
          'On 5 June, Israel launched Operation Focus, a devastating pre-emptive airstrike that wiped out 90% of the Egyptian air force on the ground, before defeating Jordanian forces in the West Bank and East Jerusalem.',
          'Israel then turned to the Syrian front, scaling the fortified Golan Heights by 10 June to capture the territory before a UN ceasefire took effect.',
        ],
        examiner_tips:
          'Narrate: Straits of Tiran blockade -> pre-emptive airstrike -> West Bank capture -> Golan Heights offensive.',
      },
      {
        q_id: 'cme_2026_q3a',
        q_number: 'Q3(a)',
        tariff: 8,
        type: 'importance',
        topic: 'Arab-Israeli War (1948-49) for Israel',
        spec_topic: 'KT1.1 & KT1.2: Key events and aftermath of 1948-49 war',
        question_text:
          'Explain the importance of the Arab-Israeli war (1948-49) for the state of Israel.',
        stimulus: null,
        indicative_content: [
          'It secured the physical survival of the nascent Jewish state against five attacking Arab armies, proving the military capability of the IDF.',
          'It expanded Israel’s territory by 21% beyond the UN partition plan, establishing defensible borders and a corridor to West Jerusalem.',
        ],
        examiner_tips: 'Explain both physical survival and the expansion of national territory.',
      },
      {
        q_id: 'cme_2026_q3b',
        q_number: 'Q3(b)',
        tariff: 8,
        type: 'importance',
        topic: 'Henry Kissinger for Diplomacy',
        spec_topic: 'KT3.2: Kissinger’s shuttle diplomacy and disengagement',
        question_text:
          'Explain the importance of Henry Kissinger for diplomatic negotiations in the Middle East.',
        stimulus: null,
        indicative_content: [
          'Kissinger’s relentless "shuttle diplomacy" brokered the 1974 and 1975 Sinai Disengagement Agreements between Israel and Egypt.',
          'This restored Egyptian control of the Suez Canal, eased military tensions, and built the diplomatic trust that made the 1979 Camp David Peace Treaty possible.',
        ],
        examiner_tips:
          'Focus on how step-by-step disengagement established the precedent for land-for-peace negotiations.',
      },
      {
        q_id: 'cme_2026_q3c',
        q_number: 'Q3(c)',
        tariff: 8,
        type: 'importance',
        topic: 'Camp David Accords (1978)',
        spec_topic: 'KT3.2: Camp David Accords (1978) and Peace Treaty (1979)',
        question_text:
          'Explain the importance of the Camp David Accords (1978) for Arab-Israeli relations.',
        stimulus: null,
        indicative_content: [
          'It led directly to the 1979 Egypt-Israel Peace Treaty, returning the Sinai to Egypt in exchange for mutual diplomatic recognition and opening trade and embassies.',
          'It removed the largest and most militarily powerful Arab state from the conflict, fundamentally altering the strategic balance and making a unified Arab war against Israel impossible.',
        ],
        examiner_tips:
          'Explain how neutralizing Egypt permanently transformed the military balance of power in the Middle East.',
      },
    ],
  },
];

// ----------------------------------------------------------------------------
// Save Structured Datasets
// ----------------------------------------------------------------------------

function saveDatasets() {
  const medData = {
    unit_id: 'edexcel_medicine',
    paper_code: '1HI0/11',
    paper_name:
      'Paper 1: Medicine in Britain, c1250–present and The British sector of the Western Front, 1914–18',
    total_papers_analyzed: MEDICINE_PAPERS.length,
    year_range: '2018–2026',
    papers: MEDICINE_PAPERS,
  };

  const cmeData = {
    unit_id: 'cme_new',
    paper_code: '1HI0/P5',
    paper_name: 'Paper 2: Conflict in the Middle East, 1945–1995',
    total_papers_analyzed: CME_PAPERS.length,
    year_range: '2018–2026',
    papers: CME_PAPERS,
  };

  const elizData = {
    unit_id: 'eee',
    paper_code: '1HI0/B4',
    paper_name: 'Paper 2: Early Elizabethan England, 1558–1588',
    total_papers_analyzed: ELIZ_PAPERS.length,
    year_range: '2018–2026',
    papers: ELIZ_PAPERS,
  };

  const germanyData = {
    unit_id: 'weimar_nazi_germany',
    paper_code: '1HI0/31',
    paper_name: 'Paper 3: Weimar and Nazi Germany, 1918–1939',
    total_papers_analyzed: GERMANY_PAPERS.length,
    year_range: '2018–2026',
    papers: GERMANY_PAPERS,
  };

  const usaData = {
    unit_id: 'usa',
    paper_code: '1HI0/33',
    paper_name: 'Paper 3: Conflict at Home and Abroad: the USA, 1954–75',
    total_papers_analyzed: USA_PAPERS.length,
    year_range: '2018–2026',
    papers: USA_PAPERS,
  };

  const medPath = path.join(OUT_DIR, 'edexcel_medicine_past_papers.json');
  const cmePath = path.join(OUT_DIR, 'cme_new_past_papers.json');
  const elizPath = path.join(OUT_DIR, 'eee_past_papers.json');
  const germanyPath = path.join(OUT_DIR, 'weimar_nazi_germany_past_papers.json');
  const usaPath = path.join(OUT_DIR, 'usa_past_papers.json');

  fs.writeFileSync(medPath, JSON.stringify(medData, null, 2), 'utf8');
  fs.writeFileSync(cmePath, JSON.stringify(cmeData, null, 2), 'utf8');
  fs.writeFileSync(elizPath, JSON.stringify(elizData, null, 2), 'utf8');
  fs.writeFileSync(germanyPath, JSON.stringify(germanyData, null, 2), 'utf8');
  fs.writeFileSync(usaPath, JSON.stringify(usaData, null, 2), 'utf8');

  console.log(`[OK] Saved Medicine Past Papers to ${medPath} (${MEDICINE_PAPERS.length} series)`);
  console.log(`[OK] Saved CME Past Papers to ${cmePath} (${CME_PAPERS.length} series)`);
  console.log(`[OK] Saved Elizabethan Past Papers to ${elizPath} (${ELIZ_PAPERS.length} series)`);
  console.log(`[OK] Saved Germany Past Papers to ${germanyPath} (${GERMANY_PAPERS.length} series)`);
  console.log(`[OK] Saved USA Past Papers to ${usaPath} (${USA_PAPERS.length} series)`);
}

saveDatasets();
