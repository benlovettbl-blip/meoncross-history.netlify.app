// Master Video Scaffolding Dictionary for GCSE Paper 1: Medicine Through Time
// Key Topic 3: 18th and 19th Century Medicine (c1700–c1900) • Lessons 3.1 to 3.5
// Upgraded with Cinematic Operating Amphitheatre Clip, Proportional Scaffolding & Multi-Lens Pathways

const kt3 = {
  lesson_3_1: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=34wK9H9kU9Y',
      title: 'Simple History: Edward Jenner & The Smallpox Vaccine (1796) – Inoculation to Vaccination',
      duration: '3 mins 12 secs',
      pathway: 'Starter Hook',
      teacher_guidance:
        'Illustrated case study of Jenner noticing milkmaids\' immunity to smallpox due to cowpox; inoculating James Phipps in May 1796. Recommended Watch Window: 00:00–03:12 (Full Clip) • Lesson Phase: Starter Hook (0–5m). Tone Alert: Fast, accessible animation explaining the transition from inoculation (variolation) to vaccination.',
      viewing_task:
        '<ol><li><strong>[00:50] Quick Check:</strong> What folktale or observation among dairy milkmaids led Edward Jenner to test his cowpox hypothesis on eight-year-old James Phipps in 1796?</li><li><strong>[02:10] Hinge Question:</strong> Why did the Royal Society and the anti-vaccine movement fiercely oppose Jenner\'s smallpox vaccine in the early 1800s?</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> Milkmaids who contracted mild cowpox from cow udders never contracted the lethal, disfiguring smallpox.</li><li><strong>Hinge Question:</strong> Doctors charged huge fees for traditional variolation and saw vaccination as a commercial threat. The Royal Society dismissed Jenner because he could not explain *why* cowpox worked (viruses were undiscovered), and cartoonists like Gillray stoked religious fears that injecting animal matter would turn humans into bovine monsters.</li></ol>',
    },
    {
      type: 'era',
      url: 'https://era.org.uk/streaming-service-resource/3-medicine-and-health-history-file/',
      title: 'BBC / ERA: History File – Edward Jenner & The Eradication of Smallpox',
      duration: '23 mins 45 secs',
      pathway: 'Enquiry Evidence',
      teacher_guidance:
        'Analyzes the shift from dangerous Lady Mary Wortley Montagu variolation to Jenner\'s vaccination, government compulsory acts (1852/1853), and WHO global eradication (1980). Recommended Watch Window: 03:00–09:30 • Lesson Phase: Guided Instruction & Historical Significance. Tone Alert: Comprehensive documentary tracking public health policy.',
      viewing_task:
        '<ol><li><strong>[03:45] Recall:</strong> In what year did the British Parliament award Jenner a £10,000 national grant to open the Jennerian Society, and in what year did vaccination become compulsory?</li><li><strong>[06:15] Explain:</strong> Explain the key clinical differences between traditional variolation (inoculation) and Jenner\'s cowpox vaccination in terms of patient safety and transmission.</li><li><strong>[08:45] Challenge:</strong> Assess why Jenner\'s vaccine, despite saving millions of lives, did not immediately lead to vaccines for other deadly infectious diseases like cholera or tuberculosis.</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> Grant awarded in 1802; vaccination made legally compulsory in Britain in 1853.</li><li><strong>Explain:</strong> Variolation involved inserting live smallpox scabs or pus under the skin, which carried a 2–3% mortality rate and risked sparking new smallpox epidemics among contacts. Jenner\'s vaccine used mild bovine cowpox (*Vaccinia*), which caused only a harmless local pustule, was non-lethal, and could not trigger a smallpox outbreak.</li><li><strong>Challenge:</strong> Jenner\'s discovery was an empirical, observational breakthrough based on accidental natural immunity. Because Jenner had no microscope capable of viewing viruses and had no concept of germs or the human immune system, nobody understood the biological mechanism. Until Pasteur developed Germ Theory nearly 70 years later, scientists had no method to isolate pathogens or artificially create vaccines for other illnesses.</li></ol>',
    },
  ],

  lesson_3_2: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=0Z4tE6-z8W4',
      title: 'Simple History: Louis Pasteur vs Robert Koch – The Dawn of Modern Germ Theory',
      duration: '5 mins 40 secs',
      pathway: 'Starter Hook',
      teacher_guidance:
        'Compares Pasteur’s swan-neck flask experiments (1861) with Robert Koch’s bacteriological staining, petri dish agar, and discovery of specific microbes (TB 1882, Cholera 1883). Recommended Watch Window: 00:00–04:45 • Lesson Phase: Starter Hook (0–5m). Tone Alert: Highlights the Franco-Prussian national rivalry driving scientific competition.',
      viewing_task:
        '<ol><li><strong>[01:15] Quick Check:</strong> What ancient biological theory claiming that living organisms magically appeared from rotting matter did Louis Pasteur disprove with his 1861 swan-neck flask experiment?</li><li><strong>[03:10] Hinge Question:</strong> How did Robert Koch build upon Pasteur\'s ideas by inventing solid agar plates and chemical methylene blue dye to identify specific disease microbes?</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> Spontaneous Generation.</li><li><strong>Hinge Question:</strong> While Pasteur proved germs caused decay and anthrax, he worked with liquid broths where bacteria swam together. Koch used solid agar jelly (allowing single bacterial colonies to grow in isolation) and developed aniline synthetic dyes to stain previously transparent bacteria under the microscope, allowing him to photograph and identify the specific microbes causing anthrax, tuberculosis (1882), and cholera (1883).</li></ol>',
    },
    {
      type: 'era',
      url: 'https://era.org.uk/streaming-service-resource/6-medicine-and-infection-history-file/',
      title: 'BBC / ERA: History File – Pasteur, Koch & The Microbe Hunters',
      duration: '24 mins 10 secs',
      pathway: 'Scientific Breakthrough',
      teacher_guidance:
        'In-depth study of the laboratory race between France and Germany. Recommended Watch Window: 02:30–09:15 • Lesson Phase: Guided Instruction & Scientific Methodology. Tone Alert: Excellent archival lab recreations and microscope micro-photography.',
      viewing_task:
        '<ol><li><strong>[03:15] Recall:</strong> Name the specific disease for which Louis Pasteur successfully developed an attenuated vaccine in 1885, tested on nine-year-old Joseph Meister.</li><li><strong>[05:40] Explain:</strong> Explain "Koch\'s Postulates"—the four scientific rules Robert Koch established to definitively prove that a specific microbe is the causal agent of a disease.</li><li><strong>[08:20] Challenge:</strong> How did the Franco-Prussian War (1870–71) and intense national prestige accelerate financial backing and government laboratory sponsorship for Pasteur and Koch?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> Rabies.</li><li><strong>Explain:</strong> 1) The microbe must be present in every case of the disease; 2) It must be isolated from the host and grown in pure culture; 3) The cultured microbe must cause the specific disease when inoculated into a healthy test animal; 4) The same microbe must be re-isolated from the experimentally diseased host.</li><li><strong>Challenge:</strong> Defeat in 1870 humiliated France, while the new German Empire sought to prove its scientific and military superiority. The French government poured national funds into the Institut Pasteur to rebuild French honor, while the German imperial government built Koch a state-of-the-art laboratory in Berlin and made him an imperial civil servant. This intense geopolitical rivalry transformed medical microbiology from an amateur hobby into a lavishly funded national priority.</li></ol>',
    },
    {
      type: 'era',
      url: 'https://era.org.uk/streaming-service-resource/catch-the-plague-makers-catch-the-fever-producers-measuring-and-mapping-health-and-disease-in-the-19th-century-open-university/',
      title: 'Open University: Mapping Health & Disease in the 19th Century',
      duration: '28 mins 0 secs',
      pathway: 'Enquiry Evidence',
      teacher_guidance:
        'Scholarly exploration of how mid-19th-century epidemiological mapping connected microscopic pathology with urban sanitary infrastructure. Recommended Watch Window: 04:00–10:30 • Lesson Phase: Disciplinary Synthesis & High-Attainer Extension. Tone Alert: Academic Open University production with archival maps.',
      viewing_task:
        '<ol><li><strong>[05:10] Recall:</strong> What two environmental theories of disease causation dominated British medical debate prior to the universal acceptance of Germ Theory in the 1880s?</li><li><strong>[07:30] Explain:</strong> Explain why British medical officers of health initially rejected Pasteur\'s Germ Theory, arguing that filth and poverty were the direct chemical causes of fever.</li><li><strong>[09:45] Challenge:</strong> Evaluate why it took over 20 years for Pasteur\'s 1861 Germ Theory to be fully accepted and implemented by the British medical establishment.</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> Miasma theory (poisonous airborne effluvia) and Anti-contagionist sanitation theory (disease generated spontaneously by filth).</li><li><strong>Explain:</strong> Medical officers observed that outbreaks were concentrated in dirty, unpaved slums with open privies. They concluded that decomposing vegetable and animal refuse chemically poisoned the air, producing fever directly. Without seeing bacteria, they viewed microbes as harmless consequences of decay rather than its primary cause.</li><li><strong>Challenge:</strong> British medicine was dominated by practical sanitary reformers who believed cleaning the streets was sufficient. Influential figures like William Farr and Florence Nightingale distrusted laboratory microscopes, believing illness could be conquered simply by fresh air, clean water, and soap. It was not until Koch identified the precise bacteria for wound infections and cholera in the 1880s that the British establishment finally abandoned miasma.</li></ol>',
    },
  ],

  lesson_3_3: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=F3Gq22q5u-w',
      title: 'Simple History: Florence Nightingale & Mary Seacole – The Crimean War & Modern Nursing',
      duration: '4 mins 20 secs',
      pathway: 'Starter Hook',
      teacher_guidance:
        'Contrasts Florence Nightingale’s sanitary revolution at Scutari hospital with Mary Seacole’s independent front-line British Hotel at Spring Hill. Recommended Watch Window: 00:00–04:10 • Lesson Phase: Starter Hook (0–5m). Tone Alert: Sensitive, balanced comparison highlighting racial and institutional hurdles.',
      viewing_task:
        '<ol><li><strong>[00:50] Quick Check:</strong> What drastic reduction in mortality did Florence Nightingale achieve at Scutari Hospital after the British Sanitary Commission unblocked sewers and flushed latrines?</li><li><strong>[02:30] Hinge Question:</strong> Why was Jamaican nurse Mary Seacole rejected by the War Office and Nightingale\'s delegation, and how did she independently establish the "British Hotel" at Spring Hill?</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> From approximately 42% down to roughly 2%.</li><li><strong>Hinge Question:</strong> Seacole was rejected due to racial prejudice and social class snobbery. Undeterred, she funded her own voyage to Crimea, established the British Hotel to provide hot food, medicine, and warm clothing, and attended to wounded men directly under fire on the battlefield.</li></ol>',
    },
    {
      type: 'era',
      url: 'https://era.org.uk/streaming-service-resource/scutari-hospital-cleaning-up-florence-nightingale-and-the-crimean-war-bbc-two/',
      title: 'BBC Two: Florence Nightingale – Cleaning Up Scutari & The Sanitary Revolution',
      duration: '5 mins 2 secs',
      pathway: 'Primary Evidence',
      teacher_guidance:
        'Examines the physical horrors of the barracks hospital at Scutari built on a cesspool, and Nightingale’s pioneering statistical data visualization (Coxcomb chart). Recommended Watch Window: 00:00–05:02 (Full Clip) • Lesson Phase: Guided Instruction & Data Literacy. Tone Alert: Realistic recreation of Crimean military field hospital conditions.',
      viewing_task:
        '<ol><li><strong>[01:05] Recall:</strong> What famous circular statistical infographic did Florence Nightingale invent to convince Queen Victoria and Parliament that hospital filth killed more soldiers than enemy bullets?</li><li><strong>[02:40] Explain:</strong> Describe how the design of the "Nightingale Ward" (high ceilings, large opposing windows, isolated beds) aimed to eliminate foul air and prevent hospital infection.</li><li><strong>[04:15] Challenge:</strong> How did Nightingale transform nursing from a disreputable, drunken working-class trade into a disciplined, respected profession for educated women?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> The Polar Area Diagram (commonly known as the Coxcomb or Rose Diagram).</li><li><strong>Explain:</strong> The large outer blue wedges illustrated that the vast majority of soldiers died from preventable, contagious zymotic diseases contracted inside filthy military hospitals, while the tiny red slices represented men killed by Russian gunfire on the battlefield, proving poor hospital sanitation was the primary killer.</li><li><strong>Challenge:</strong> Before Nightingale, nurses were stereotyped like Dickens\'s \'Mrs Gamp\'—drunken, uneducated, and working-class. Nightingale established strict moral codes, rigorous anatomical and hygiene examinations, and university-affiliated clinical hospital training at St Thomas\' Hospital. This gave nurses professional status, discipline, and medical authority worldwide.</li></ol>',
    },
  ],

  lesson_3_4: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=1D_sE5m6qF8',
      title: 'Cinematic: The Knick (HBO) – The Pre-Antiseptic Surgical Amphitheatre',
      duration: '2 mins 10 secs',
      pathway: 'Cinematic',
      teacher_guidance:
        'Visceral cinematic reconstruction of an operating theater at the turn of the century: packed audiences in street clothes, surgeons operating with bare hands in blood-stiffened coats, and lightning-fast procedures. Recommended Watch Window: 00:00–02:10 (Full Trailer) • Lesson Phase: Cinematic Starter Hook. Discussion Prompt: Challenges modern students\' preconceptions of clinical operating theatres.',
      viewing_task:
        '<p><strong>Cinematic Discussion Focus:</strong> Notice the packed tiers of onlookers in everyday dusty street coats, the surgeon operating with bare hands, and the rapid speed of the procedure. How does this cinematic reconstruction highlight the "Black Period" of surgery before antiseptic hygiene?</p>',
      model_answer:
        '<p><strong>Teacher Discussion Pointers:</strong> The clip vividly dramatizes surgery before modern sterility: surgeons wore unwashed frock coats stiff with dried blood as a badge of honor, operated without gloves or masks, and audience members in street coats tracked bacteria directly over open wounds, leading to catastrophic post-operative sepsis and gangrene.</p>',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=7pjAH84f-c0',
      title: 'Simple History: The Surgical Revolution – Overcoming Pain, Infection & Blood Loss',
      duration: '5 mins 40 secs',
      pathway: 'Starter Hook',
      teacher_guidance:
        'Overview of the three hurdles of surgery: pain, infection, and blood loss; James Simpson’s chloroform discovery (1847) and the "Black Period" of surgery. Recommended Watch Window: 00:00–04:30 • Lesson Phase: Starter Hook (0–5m). Tone Alert: Illustrates the gruesome speed of pre-anesthetic amputation.',
      viewing_task:
        '<ol><li><strong>[01:05] Quick Check:</strong> In what year did James Young Simpson discover chloroform, and what was the "Black Period" of surgery that followed?</li><li><strong>[02:30] Hinge Question:</strong> Why did royal approval from Queen Victoria in 1853 finally silence religious objections to chloroform during childbirth?</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> 1847. With patients unconscious, surgeons attempted longer, deeper operations, but without antiseptic hygiene, hospital gangrene and death rates actually increased.</li><li><strong>Hinge Question:</strong> Conservative churchmen claimed pain was God\'s curse on women for Eve\'s sin in Eden. When Queen Victoria used chloroform for the birth of Prince Leopold in 1853 and publicly blessed it, royal sanction destroyed religious opposition overnight.</li></ol>',
    },
    {
      type: 'era',
      url: 'https://era.org.uk/streaming-service-resource/5-medicine-and-surgery-history-file/',
      title: 'BBC / ERA: History File – Joseph Lister & The Antiseptic Revolution (1865)',
      duration: '24 mins 0 secs',
      pathway: 'Scientific Breakthrough',
      teacher_guidance:
        'Reconstructs Lister’s use of carbolic acid spray in the Glasgow Royal Infirmary operating theatre after reading Pasteur\'s 1861 Germ Theory. Recommended Watch Window: 08:30–14:45 • Lesson Phase: Direct Instruction & Antiseptic Methodology. Tone Alert: Recreates 19th-century surgical theaters with realistic surgical hygiene.',
      viewing_task:
        '<ol><li><strong>[09:15] Recall:</strong> What chemical substance did Joseph Lister spray over surgical wounds and operating tables to eliminate airborne microbes?</li><li><strong>[11:30] Explain:</strong> How did reading Louis Pasteur\'s 1861 Germ Theory inspire Lister to apply carbolic acid to compound fractures in Glasgow?</li><li><strong>[13:45] Challenge:</strong> Why did many British surgeons fiercely resist Lister\'s antiseptic carbolic spray, and how did this lead to the development of aseptic surgery by the 1890s?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> Carbolic acid (creosote).</li><li><strong>Explain:</strong> Lister read Pasteur\'s work showing that microscopic airborne organisms caused fermentation and gangrenous decay. Knowing that carbolic acid safely treated foul-smelling municipal sewage in Carlisle, Lister soaked surgical dressings in carbolic acid to treat a boy\'s compound leg fracture in 1865. The bone and flesh healed without infection, proving that chemical antiseptics killed wound bacteria.</li><li><strong>Challenge:</strong> Surgeons disliked carbolic spray because it cracked their hands, irritated lungs, slowed operations down, and smelled foul. Furthermore, many doctors still did not believe in Pasteur\'s invisible germs. By the 1890s, Lister\'s messy *antiseptic* method (killing germs inside wounds) was superseded by *aseptic* surgery (preventing germs from entering in the first place by autoclaving instruments with steam, wearing sterile rubber gloves, masks, and boiled gowns).</li></ol>',
    },
  ],

  lesson_3_5: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=TT4Z1Ikf36w',
      title: 'Simple History: Edwin Chadwick & John Snow – The 19th Century Public Health Crisis',
      duration: '4 mins 52 secs',
      pathway: 'Starter Hook',
      teacher_guidance:
        'Focuses on Chadwick’s 1842 Sanitary Report, the 1848 Public Health Act, and John Snow’s 1854 Broad Street water pump investigation during Soho cholera. Recommended Watch Window: 00:00–04:30 • Lesson Phase: Starter Hook (0–5m). Tone Alert: Fast, accessible animated narrative connecting cholera with water contamination.',
      viewing_task:
        '<ol><li><strong>[01:10] Quick Check:</strong> What revolutionary action did Dr John Snow take in September 1854 to immediately halt the cholera outbreak in Soho, London?</li><li><strong>[02:45] Hinge Question:</strong> Explain why the British government abandoned its traditional "laissez-faire" attitude and passed the compulsory Public Health Act in 1875.</li></ol>',
      model_answer:
        '<ol><li><strong>Quick Check:</strong> He removed the handle from the Broad Street water pump, preventing residents from drinking sewage-contaminated water.</li><li><strong>Hinge Question:</strong> The 1867 Reform Act gave working-class men the vote, forcing politicians to address sanitation. Combined with the Great Stink (1858), recurring cholera epidemics, and scientific proof from Pasteur and Snow, the state abandoned laissez-faire and mandated clean piped water, sewers, and refuse collection.</li></ol>',
    },
    {
      type: 'era',
      url: 'https://era.org.uk/streaming-service-resource/the-sewer-king-seven-wonders-of-the-industrial-world-bbc-two/',
      title: 'BBC Two: Seven Wonders – Joseph Bazalgette & The Great Stink (1858)',
      duration: '49 mins 0 secs',
      pathway: 'Strategic Overview',
      teacher_guidance:
        'Epic drama documentary reconstructing the parliamentary crisis of the Great Stink (June 1858) and Bazalgette’s construction of 1,100 miles of underground sewers. Recommended Watch Window: 04:15–12:30 • Lesson Phase: Guided Instruction & Municipal Engineering. Tone Alert: High-budget BBC dramatization of Victorian parliamentary panic.',
      viewing_task:
        '<ol><li><strong>[05:20] Recall:</strong> What crisis in the summer of 1858 forced Parliament to suspend sessions and immediately allocate £3 million to rebuild London\'s sewage system?</li><li><strong>[08:40] Explain:</strong> Describe Joseph Bazalgette\'s revolutionary engineering design using gravity, portland cement, and high-level interceptor sewers to divert sewage east of London.</li><li><strong>[11:15] Challenge:</strong> Although Bazalgette built the sewers believing that miasma caused cholera, why did his project unintentionally eliminate cholera from London forever?</li></ol>',
      model_answer:
        '<ol><li><strong>Recall:</strong> "The Great Stink" (when summer heat caused millions of gallons of raw sewage in the River Thames to ferment, producing an unbearable stench).</li><li><strong>Explain:</strong> Bazalgette constructed 82 miles of massive underground brick interceptor sewers running parallel to the Thames, backed by 1,100 miles of street sewers. These used natural gravitational downhill flow and enormous steam pumping engines (like Abbey Mills) to divert 420 million gallons of sewage daily far downstream to Barking and Crossness, preventing human waste from ever entering London\'s drinking water intake.</li><li><strong>Challenge:</strong> Bazalgette, like most Victorians, believed foul-smelling miasma caused disease and designed the sewers solely to flush smelly waste away from inhabited boroughs. However, because cholera is a waterborne bacterium (*Vibrio cholerae*) spread through feces-contaminated drinking water, removing raw sewage from the Thames directly eliminated the contamination source, ending waterborne epidemics entirely by accident.</li></ol>',
    },
  ],
};

module.exports = { kt3 };
