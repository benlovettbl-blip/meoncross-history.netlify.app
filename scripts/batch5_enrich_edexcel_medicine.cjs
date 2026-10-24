const fs = require('fs');
const path = require('path');

function parseDurationSecs(dur) {
  if (!dur) return 999999;
  let secs = 0;
  const hrMatch = dur.match(/(\d+)\s*hr/i);
  const minMatch = dur.match(/(\d+)\s*min/i);
  const secMatch = dur.match(/(\d+)\s*sec/i);
  if (hrMatch) secs += parseInt(hrMatch[1], 10) * 3600;
  if (minMatch) secs += parseInt(minMatch[1], 10) * 60;
  if (secMatch) secs += parseInt(secMatch[1], 10);
  return secs > 0 ? secs : 999999;
}

const medicinePedagogyByLesson = {
  // Lesson 1: Supernatural & Religious Explanations
  1: [
    {
      task: 'Why did the medieval Catholic Church support the medical writings of Galen, and how did this discourage new medical discoveries?',
      answer:
        "The medieval Catholic Church firmly endorsed the ancient Greek physician Galen because he taught that the human body had been designed by a single purposeful Creator (God). Church scriptoria copied and preserved Galen's texts while condemning anyone who questioned him as a heretic. Because the Church controlled university medical training, books, and hospitals, physician training was based on memorizing ancient texts rather than practical dissection or scientific experimentation, freezing medical progress for centuries.",
    },
    {
      task: 'Why did medieval people believe that illness was sent directly by God, and what religious treatments did they use?',
      answer:
        "Medieval society possessed a deeply religious worldview where illness was interpreted as divine punishment for personal sins or a testing of faith by the Devil. Consequently, the primary responses were spiritual: patients undertook pilgrimages to holy shrines (such as Thomas Becket at Canterbury), prayed to patron saints, fasted, bought indulgences, and confessed their sins to priests. Monasteries and hospitals focused on saving the patient's immortal soul through daily prayer rather than attempting medical cures.",
    },
  ],

  // Lesson 2: Rational Explanations: Humours & Galen
  2: [
    {
      task: "How did the ancient Theory of the Four Humours explain the causes of disease, and how did Galen's 'Theory of Opposites' build upon it?",
      answer:
        "Hippocrates originated the Theory of the Four Humours, stating the body contained four vital liquids: Blood (spring/air), Phlegm (winter/water), Yellow Bile (summer/fire), and Black Bile (autumn/earth). Good health required these humours to remain in perfect equilibrium; illness resulted from an excess or deficiency of one humour. In the 2nd century AD, Galen developed the 'Theory of Opposites', arguing that an excess humour should be counterbalanced by an opposing treatment—such as treating a cold phlegmatic fever with hot, dry pepper or chili.",
    },
    {
      task: "Why did Galen's anatomical theories remain unchallenged throughout the medieval period despite containing major anatomical errors?",
      answer:
        'Roman religious law prohibited human dissection, forcing Galen to dissect apes, pigs, and dogs and assume human internal anatomy was identical. This led to serious errors: Galen claimed the human jaw was made of two bones (like a dog), the liver produced blood that burned up like fuel, and blood passed through invisible pores in the septum of the heart. These errors persisted throughout the Middle Ages because the Church forbade human dissection and physicians were taught to trust ancient authority over physical observation.',
    },
  ],

  // Lesson 3: Treatments & Bleeding
  3: [
    {
      task: 'How were phlebotomy (bloodletting), purging, and astrological zodiac charts used by medieval medical practitioners to rebalance the humours?',
      answer:
        "To restore humeral balance, medieval barber-surgeons and physicians used three main techniques: phlebotomy (vein cutting), leeching (applying medicinal leeches to draw localized bad blood), and purging (using emetics and herbal laxatives like scammony to evacuate the digestive tract). Practitioners consulted astrological 'Zodiac Man' diagrams (vein man) before performing bloodletting, believing that different zodiac constellations governed specific body parts and that operating when the moon was in the wrong sign would cause fatal hemorrhage.",
    },
  ],

  // Lesson 4: Medical Care Providers & Monastic Hospitals
  4: [
    {
      task: "Why did medieval monastic hospitals like St Leonard's in York prioritize 'care not cure', and who was deliberately excluded from admission?",
      answer:
        "Medieval hospitals were religious foundations run by monks and nuns where the priority was spiritual salvation and comfort rather than medical treatment ('care not cure'). Patients were provided with clean beds, warmth, nutritious food, and quiet rest while attending daily Latin mass from their beds. However, medieval hospitals strictly barred infectious patients (such as lepers, plague victims, and smallpox sufferers), pregnant women, and the mentally insane, directing them to outside lazar houses to preserve monastic purity.",
    },
  ],

  // Lesson 5: The Black Death 1348
  5: [
    {
      task: 'What supernatural and rational causes did medieval people blame for the arrival of the Black Death in 1348?',
      answer:
        "Medieval society explained the Black Death through both supernatural and environmental theories: religiously, it was seen as God's wrath against human wickedness and moral corruption; astrologically, the Paris Medical Faculty blamed an unusual alignment of Saturn, Jupiter, and Mars in 1345. Rationally, people blamed 'miasma'—corrupt, foul air released by earthquakes, stagnant swamps, and unburied waste. In reality, the epidemic was caused by the Yersinia pestis bacterium carried by fleas living on black rats (Rattus rattus) transported on Genoese merchant galleys.",
    },
    {
      task: 'What clinical symptoms distinguished bubonic plague from pneumonic plague during the Black Death epidemic?',
      answer:
        "Bubonic plague, spread by flea bites, caused sudden high fever, excruciating headaches, vomiting, and agonizing, swollen lymph nodes in the armpits, groin, and neck called 'buboes', which turned black before bursting; victims died within 3 to 5 days with a 70% mortality rate. The deadlier pneumonic plague occurred when the bacteria infected the lungs, becoming airborne through coughing and sneezing; victims coughed up bloody phlegm and suffocated to death within 24 to 48 hours with a near-100% fatality rate.",
    },
    {
      task: 'How did medieval communities attempt to prevent the spread of plague in 1348–1349, and why were these measures completely ineffective?',
      answer:
        "Communities deployed desperate preventative measures: the religious flagellants marched from town to town whipping themselves to appease God's wrath; people carried sweet-smelling posies and pomanders or burned tar and aromatic herbs to purify miasmatic air; local authorities ordered streets swept of dung and quarantined incoming ships. However, these measures failed entirely because medieval people had no knowledge of bacteria or flea vectors: rat populations lived unchecked in thatched roofs, dirt floors, and crowded streets.",
    },
  ],

  // Lesson 6: Renaissance Scientific Revolution
  6: [
    {
      task: "How did Johannes Gutenberg's printing press (1440) and the Royal Society's motto 'Nullius in Verba' (1660) revolutionize medical knowledge?",
      answer:
        "Gutenberg's movable-type printing press democratized scientific communication: anatomical texts and clinical case studies could be mass-produced accurately and cheaply with precise woodcut illustrations, eliminating hand-copying errors and breaking the Catholic Church's censorship monopoly. In 1660, the Royal Society was founded in London under royal charter, adopting the motto 'Nullius in Verba' ('Take nobody's word for it'). This institutionalized empirical scientific methodology, requiring medical theories to be demonstrated through physical experimentation, dissection, and open peer review.",
    },
  ],

  // Lesson 7: Thomas Sydenham
  7: [
    {
      task: "Why was Dr Thomas Sydenham nicknamed 'The English Hippocrates', and how did his book 'Observationes Medicae' transform disease diagnosis?",
      answer:
        "Dr Thomas Sydenham revolutionized clinical diagnosis by moving away from ancient classical dogma and focusing on direct, empirical bedside observation. In his 1676 masterpiece 'Observationes Medicae', Sydenham argued that diseases were distinct biological species with specific symptom patterns that could be categorized like plants in botany, rather than unique personal humeral imbalances. He pioneered the clinical use of cinchona bark (quinine) to treat malarial ague and introduced iron tonics for anemia and cooling regimens for smallpox.",
    },
  ],

  // Lesson 8: Andreas Vesalius
  8: [
    {
      task: "How did Andreas Vesalius's 1543 masterpiece 'De Humani Corporis Fabrica' challenge and correct Galen's ancient anatomical errors?",
      answer:
        "Andreas Vesalius, professor of surgery at Padua, revolutionized anatomy by performing human dissections himself rather than delegating the task to barbers. In 'De Humani Corporis Fabrica' (1543), featuring magnificent woodcuts printed in Basel, Vesalius corrected over 200 of Galen's anatomical errors, proving conclusively that the human lower jaw consists of a single bone (not two), the human breastbone has three segments (not seven), and blood does not flow through invisible pores in the heart's septum.",
    },
    {
      task: 'What resistance did Vesalius face from traditional Renaissance medical authorities, and what was his long-term impact on surgical training?',
      answer:
        "Traditional physicians and university professors fiercely attacked Vesalius for daring to challenge ancient Galenic authority; his former teacher Jacobus Sylvius dismissed him as a madman and claimed that human bodies must have changed shape since Galen's day. Vesalius was forced to resign his professorship at Padua. However, his long-term impact was immense: he established that direct human dissection and empirical observation were the mandatory foundation of modern medicine, inspiring future anatomists and surgeons across Europe.",
    },
  ],

  // Lesson 9: William Harvey
  9: [
    {
      task: 'How did William Harvey use mechanical experiments with arm ligatures and one-way valves to prove the continuous circulation of blood?',
      answer:
        "In his 1628 publication 'De Motu Cordis', William Harvey proved that blood circulates continuously in a closed, one-way system. Harvey tied tight ligatures around human arms: a tight band cut off arterial pulse, while a looser band allowed arterial blood into the arm but stopped venous blood exiting, swelling the veins. By attempting to push blood backwards past the internal valves in the veins with his finger, Harvey proved that blood could only flow toward the heart, proving the veins carried blood back to the central pump.",
    },
    {
      task: "How did Harvey calculate the mathematical volume of blood pumped by the heart to disprove Galen's liver-production theory?",
      answer:
        "Harvey used rigorous mathematical calculation to refute Galen's claim that the liver constantly manufactured new blood from digested food. Harvey measured the heart's capacity (roughly two ounces) and calculated that at 72 beats per minute, the heart pumped over 540 pounds of blood per hour—three times the total weight of an average adult human. Because the human digestive system could not physically produce that volume of liquid, Harvey proved logically that the same blood must circulate repeatedly through the body.",
    },
  ],

  // Lesson 10: The Great Plague 1665
  10: [
    {
      task: 'How did responses to the Great Plague of London in 1665 demonstrate both continuity with 1348 beliefs and emerging government public health action?',
      answer:
        "The 1665 Great Plague demonstrated continuity because causes were still attributed to divine punishment, astrological alignments, and miasma, prompting people to carry pomanders, smoke tobacco, and kill over 200,000 cats and dogs (which inadvertently worsened the rat infestation). However, government action showed significant development: the Lord Mayor of London issued strict Plague Orders, appointing wardens, locking infected families inside their boarded-up houses marked with red crosses ('Lord Have Mercy Upon Us'), enforcing 28-day quarantines, digging mass plague pits outside the city walls, and banning mass gatherings.",
    },
  ],

  // Lesson 11: Germ Theory & Robert Koch
  11: [
    {
      task: "How did Louis Pasteur's 1861 swan-neck flask experiments disprove 'spontaneous generation' and establish the Germ Theory of disease?",
      answer:
        "Before 1861, doctors believed in 'spontaneous generation'—the theory that rotting matter spontaneously generated microbes. French chemist Louis Pasteur disproved this by boiling nutrient broth in S-shaped 'swan-neck' glass flasks: air could enter, but airborne dust and microbes were trapped in the downward curve of the neck, keeping the broth sterile indefinitely. When the curved neck was snapped off, airborne microbes fell into the liquid, causing rapid decay. Pasteur proved that microorganisms existed in the environment and caused decay and human disease.",
    },
    {
      task: 'What laboratory breakthroughs enabled Robert Koch to identify the specific bacterial pathogens for anthrax (1876), tuberculosis (1882), and cholera (1883)?',
      answer:
        "German physician Robert Koch transformed bacteriology by developing pioneering laboratory methods: instead of studying liquid cultures where bacteria moved chaotically, Koch grew pure bacterial cultures on solid agar jelly in petri dishes invented by Julius Petri. He introduced chemical aniline dyes (methylene blue) to stain specific bacteria under microscopes and perfected microphotography to record photographic evidence. Through these methods, Koch isolated the specific rod-shaped bacillus for anthrax (1876), tuberculosis (1882), and cholera (1883), establishing Koch's Postulates.",
    },
  ],

  // Lesson 12: Edward Jenner & Smallpox Vaccine
  12: [
    {
      task: "What were the dangerous risks of 18th-century smallpox 'inoculation' (variolation), and how did Edward Jenner discover the safer cowpox vaccine?",
      answer:
        "18th-century inoculation (variolation), introduced from the Ottoman Empire by Lady Mary Wortley Montagu, involved scratching live smallpox scabs into a healthy person's skin. This carried extreme risks: patients could develop a fatal full-blown case of smallpox or trigger deadly community epidemics. Country doctor Edward Jenner observed Gloucestershire folklore that dairy milkmaids never contracted smallpox after catching mild cowpox. In May 1796, Jenner took pus from milkmaid Sarah Nelmes's cowpox lesion and inoculated eight-year-old James Phipps, subsequently inoculating him with live smallpox to prove complete immunity.",
    },
    {
      task: 'How did Edward Jenner demonstrate the scientific validity of vaccination through the case of James Phipps in 1796?',
      answer:
        'Jenner conducted a controlled medical experiment on 14 May 1796 by inoculating eight-year-old James Phipps with cowpox matter taken from milkmaid Sarah Nelmes. After Phipps developed a mild fever and recovered, Jenner performed the crucial challenge test in July: he inoculated Phipps with virulent smallpox matter multiple times over several months. Phipps developed no disease whatsoever, proving empirically that cowpox (vaccinia) conferred safe, cross-reactive immunological protection against deadly smallpox.',
    },
    {
      task: 'Why did Edward Jenner face fierce opposition from doctors, the Church, and the public before vaccination was made compulsory in 1853?',
      answer:
        'Jenner faced virulent opposition from multiple groups: inoculators (like the Sutton family) feared losing lucrative inoculation businesses; religious leaders condemned injecting animal matter from cows into humans as ungodly; satirical cartoonists (like James Gillray) depicted vaccinated patients sprouting cow horns and udders; and the Royal Society initially rejected his paper for lack of explanation. However, Parliament granted Jenner £30,000 for research, and after epidemics killed thousands, the government passed the 1853 Vaccination Act making infant smallpox vaccination compulsory.',
    },
  ],

  // Lesson 13: Florence Nightingale & Hospital Care
  13: [
    {
      task: 'How did Florence Nightingale transform nursing practices and hospital architecture following her experiences at Scutari Hospital during the Crimean War?',
      answer:
        "Arriving at the British military hospital in Scutari in 1854, Florence Nightingale found horrific conditions: wounded men lay on filthy floors over open sewer cesspools, infested with lice and gangrene. Nightingale instituted strict sanitary regimes: scrubbing wards with soap, opening windows for cross-ventilation, boiling bedsheets, and serving nutritious food, reducing the hospital mortality rate from 42% to 2%. In her 1859 book 'Notes on Hospitals', Nightingale championed the 'pavilion plan'—separate, well-ventilated brick wards with large windows to prevent foul air accumulation.",
    },
    {
      task: "How did Florence Nightingale's 'Polar Area Rose Diagram' revolutionize the use of statistical data to persuade the British government to reform military healthcare?",
      answer:
        'Nightingale was a brilliant pioneering statistician who invented the polar area diagram (coxcomb/rose diagram) to present complex mortality data visually to politicians. Her colored wedges demonstrated vividly that the vast blue area representing preventable infectious hospital diseases (typhus, cholera, dysentery) dwarfed the tiny red slivers representing battle wounds. This undeniable graphical proof persuaded Parliament and Queen Victoria to establish the 1857 Royal Commission on the Health of the Army, leading to sweeping sanitary reforms across military and civilian hospitals.',
    },
  ],

  // Lesson 14: Surgical Revolution: Simpson & Lister
  14: [
    {
      task: "How did James Young Simpson discover the anesthetic properties of chloroform in 1847, and why did Queen Victoria's endorsement silence religious critics?",
      answer:
        "In November 1847, Scottish obstetrician James Young Simpson and his assistants inhaled chloroform vapors at home, collapsing unconscious under the dining room table. Simpson immediately adopted chloroform for surgical operations and painless childbirth. However, conservative doctors and churchmen opposed it, arguing that pain was God's natural punishment for women ('in sorrow thou shalt bring forth children'). Opposition collapsed in April 1853 when Queen Victoria used chloroform during the birth of Prince Leopold, declaring it 'blessed chloroform' and making anesthesia socially acceptable.",
    },
    {
      task: "How did Joseph Lister apply Louis Pasteur's Germ Theory to invent antiseptic surgery using carbolic acid spray in the 1860s?",
      answer:
        "Glasgow surgeon Joseph Lister realized that wound sepsis was caused by invisible airborne microbes described in Pasteur's 1861 Germ Theory. In 1865, observing that carbolic acid (creosote) safely treated sewage in Carlisle, Lister soaked surgical dressings in carbolic acid to treat a boy's compound leg fracture, healing the wound without infection. He developed a machine to pump carbolic spray over operating tables, soaked surgical instruments and catgut ligatures in carbolic solution, and required surgeons to wash their hands, reducing post-operative mortality from 46% to 15%.",
    },
  ],

  // Lesson 15: Public Health, John Snow & 1875 Act
  15: [
    {
      task: "How did Edwin Chadwick's 1842 Report on the Sanitary Condition of the Labouring Population challenge Victorian laissez-faire attitudes?",
      answer:
        'Edwin Chadwick compiled extensive statistical evidence proving that appalling urban living conditions—filthy tenements, unpaved streets, open cesspools, and contaminated water—caused widespread epidemic disease and premature death among industrial workers. Chadwick presented an economic argument to wealthy taxpayers: preventable disease created hundreds of thousands of widows and orphans reliant on parish Poor Law relief, meaning that investing taxpayer money in clean piped water and subterranean sewers would actually reduce local tax burdens, leading to the permissive 1848 Public Health Act.',
    },
    {
      task: "How did Dr John Snow's 1854 Broad Street spot map prove that cholera was a water-borne disease and disprove the dominant miasma theory?",
      answer:
        'During the August 1854 cholera outbreak in Soho, London, Dr John Snow investigated over 500 fatal cases. Rejecting the dominant miasma (bad air) theory, Snow plotted every cholera death as a black bar on a street map, showing that deaths clustered tightly around the Broad Street communal water pump. He discovered that workers at the local brewery who drank only beer were unaffected, while a woman living miles away in Hampstead who had water fetched from Broad Street died. Snow persuaded the parish vestry to remove the pump handle, causing cholera deaths to halt immediately.',
    },
    {
      task: 'Why was the 1875 Public Health Act fundamentally different from the 1848 Act, and what compulsory duties did it place on local town councils?',
      answer:
        "The 1848 Public Health Act was merely 'permissive' (optional), allowing local councils to ignore sanitation if ratepayers objected to high taxes. In contrast, the landmark 1875 Public Health Act marked the definitive end of Victorian laissez-faire: it made sanitary reform strictly 'compulsory' (mandatory) across England and Wales. Every local council was legally required to supply clean piped water, build underground sewers, appoint qualified Medical Officers of Health and Sanitary Inspectors, collect street refuse, ensure food safety in butcher shops, and enforce building regulations.",
    },
    {
      task: "What engineering innovations did Sir Joseph Bazalgette deploy to construct London's 82-mile underground intercepting sewer system after the Great Stink of 1858?",
      answer:
        "Following the unbearable June 1858 'Great Stink' when Thames sewage stench halted parliamentary business, MPs funded chief engineer Joseph Bazalgette to build London's sewer network. Bazalgette constructed 82 miles of massive underground intercepting sewers and 1,100 miles of street sewers using 318 million bricks and newly invented waterproof Portland cement. Bazalgette designed oval egg-shaped brick conduits so gravity kept sewage flowing eastwards away from the city toward Crossness and Abbey Mills pumping stations, famously doubling calculated pipe diameters to ensure London's growth never overwhelmed the network.",
    },
  ],

  // Lesson 16: Genetics & DNA
  16: [
    {
      task: 'How did the 1953 discovery of the DNA double helix and the Human Genome Project (2003) transform modern understanding of disease causes?',
      answer:
        "In 1953 at Cambridge University, James Watson, Francis Crick, Maurice Wilkins, and Rosalind Franklin discovered the double-helix chemical structure of DNA, unlocking the genetic code governing human development. This breakthrough shifted medicine from treating generic symptoms to identifying root biological causes. Completed in 2003, the international Human Genome Project mapped all 3 billion chemical base pairs in human DNA, enabling modern clinicians to pinpoint faulty genes causing hereditary disorders (like cystic fibrosis and Huntington's disease) and synthesize targeted gene therapies.",
    },
    {
      task: 'What ethical and medical dilemmas have emerged from modern genetic screening, preventative gene therapies, and genome sequencing?',
      answer:
        "While genomic sequencing allows early detection of inherited cancer genes (such as BRCA1 and BRCA2) allowing life-saving preventative surgery, it creates profound ethical dilemmas: concerns regarding genetic discrimination by private health insurance and employers, psychological anxiety for individuals informed of incurable hereditary conditions, and controversial moral debates surrounding 'designer babies', embryonic gene editing (CRISPR technology), and the commercial ownership of human genetic patents.",
    },
  ],

  // Lesson 17: High-Tech Diagnosis
  17: [
    {
      task: "How did non-invasive imaging technologies—from Wilhelm Röntgen's X-rays (1895) to CT scans and MRI—revolutionize medical diagnosis?",
      answer:
        "Before 1895, doctors relied on external physical examination and exploratory surgery. Wilhelm Röntgen's 1895 discovery of X-rays allowed doctors to look inside the living human body without surgery, diagnosing bone fractures, bullet wounds, and tuberculosis chest lesions immediately. In the late 20th century, diagnostic precision advanced with computerized tomography (CT scans, 1972) assembling cross-sectional 3D images of soft tissues, magnetic resonance imaging (MRI, 1977) detecting brain tumors using radio waves, and flexible fiber-optic endoscopes allowing internal camera inspection.",
    },
    {
      task: 'How has micro-surgery, stereotactic imaging, and endoscopic surgery enabled delicate neurological operations inside the human brain?',
      answer:
        'Modern high-tech surgery combines stereotactic GPS-guided computer imaging, high-magnification surgical operating microscopes, and ultra-miniaturized surgical instruments. Instead of performing high-risk craniotomies that expose large areas of brain tissue, neurosurgeons insert flexible endoscopes and fiber-optic lights through tiny keyhole incisions, guided in real-time by 3D MRI scans, allowing precise excision of deep-seated brain tumors and cauterization of aneurysms with minimal trauma to surrounding neurological structures.',
    },
  ],

  // Lesson 18: Magic Bullets & NHS
  18: [
    {
      task: "What was a 'magic bullet', and how did Paul Ehrlich's Salvarsan 606 (1909) and Gerhard Domagk's Prontosil (1932) conquer bacterial infections?",
      answer:
        "A 'magic bullet' was a synthesized chemical compound designed to seek out and destroy specific disease-causing bacterial microbes inside the human body without harming healthy human cells. In 1909, German scientist Paul Ehrlich and his Japanese assistant Sahachiro Hata tested hundreds of arsenic compounds, discovering that compound 606 (Salvarsan 606) cured deadly syphilis. In 1932, Gerhard Domagk discovered that a red industrial dye, Prontosil, stopped fatal streptococcal infections (puerperal fever), proving chemical synthesis could eradicate internal bacteria.",
    },
    {
      task: 'How did Health Minister Aneurin Bevan overcome fierce opposition from the British Medical Association to establish the National Health Service on 5 July 1948?',
      answer:
        "Following the landmark 1942 Beveridge Report promising to slay the giant of 'Disease', Labour Health Minister Aneurin Bevan launched the National Health Service on 5 July 1948, establishing free medical, dental, and hospital care for all citizens funded through general taxation. Bevan faced ferocious resistance from the British Medical Association (BMA), who feared doctors would become salaried state civil servants. Bevan overcame doctor opposition through calculated compromise, allowing consultants to retain lucrative private patients in NHS hospitals, famously stating he 'stuffed their mouths with gold'.",
    },
  ],

  // Lesson 19: Penicillin
  19: [
    {
      task: "How did Alexander Fleming's chance 1928 discovery of penicillin mold transition into mass production under Howard Florey and Ernst Chain by 1944?",
      answer:
        'In September 1928, Alexander Fleming returned from holiday to find a contaminated petri dish where penicillium notatum mold had blown in from a downstairs lab, killing surrounding staphylococcus bacteria. Fleming published his findings in 1929 but could not purify the unstable substance. In 1938, Oxford University researchers Howard Florey and Ernst Chain extracted and concentrated pure penicillin crystals. In 1941, facing wartime shortages in Britain, Florey traveled to the US, persuading American pharmaceutical companies to use deep-tank industrial fermentation, producing 2.3 million doses in time for the D-Day landings in June 1944.',
    },
    {
      task: 'What clinical triumph and tragic limitation was demonstrated by the first human trial of penicillin on police constable Albert Alexander in February 1941?',
      answer:
        "In February 1941, Oxford researchers tested unrefined penicillin on 43-year-old policeman Albert Alexander, who was dying from a severe staphylococcus and streptococcus blood infection contracted from a scratched rose thorn. Within twenty-four hours of intravenous penicillin injection, Alexander's temperature normalized, his severe facial abscesses cleared, and he began recovering miraculously. However, because Florey and Chain's laboratory apparatus could only produce minuscule quantities—forcing them to recycle penicillin from Alexander's urine—their supply ran out after five days; Alexander relapsed and died, demonstrating both penicillin's immense therapeutic power and the desperate need for industrial mass production.",
    },
  ],

  // Lesson 20: Lung Cancer & Lifestyle
  20: [
    {
      task: "How did Richard Doll and Austin Bradford Hill's 1950 epidemiological study shift public health focus toward combating smoking and lung cancer?",
      answer:
        'In 1950, British epidemiologists Richard Doll and Austin Bradford Hill published a landmark medical study surveying thousands of hospital patients, establishing a definitive statistical causal link between cigarette smoking and lung cancer. In response, government public health policy shifted from sanitary engineering toward legislative lifestyle intervention: banning television tobacco advertising (1965), imposing heavy cigarette excise duties, requiring explicit health warnings on packets (1971), banning smoking in all enclosed public places and workplaces (2007), and standardizing plain packaging (2016).',
    },
  ],

  // Lesson 21: Western Front Geography
  21: [
    {
      task: 'What geographic and terrain challenges characterized the British sector of the Western Front, particularly around the Ypres Salient and the Somme?',
      answer:
        'The British sector in northern France and Flanders presented severe terrain challenges: the Ypres Salient in Belgium was surrounded on three sides by German-held ridges (Messines, Passchendaele) providing enemy artillery with direct observation into British trenches. The Flanders soil was low-lying reclaimed marshland with a high water table; constant shellfire destroyed drainage dykes, turning the battlefield into a quagmire of liquid mud where wounded soldiers drowned. Further south, the Somme featured rolling chalk hills and deep German limestone dugouts capable of surviving week-long artillery barrages.',
    },
    {
      task: 'How did the architectural layout of frontline, support, and reserve trenches provide tactical defence against enemy artillery and gas attacks?',
      answer:
        "Trenches were never built in straight lines; they were dug in a zigzag pattern with 90-degree 'traverses' so that if an enemy artillery shell or raiding party breached the trench, blast shrapnel and gunfire were confined to a small bay. Trenches featured wooden duckboards over drainage sumps, elevated fire steps for shooting over the parapet, barbed wire entanglements in No Man's Land, and communication saps connecting frontline bays to support and reserve trenches 400 yards back, allowing troop rotations and casualty evacuations.",
    },
  ],

  // Lesson 22: Trench Environment & Illnesses
  22: [
    {
      task: "What was the daily routine of a British soldier in the frontline trenches, and what dangers accompanied the dawn 'stand-to'?",
      answer:
        "Each day began an hour before dawn with 'stand-to' (stand-to-arms), where soldiers climbed onto the fire step with fixed bayonets to repel expected dawn infantry assaults. After inspecting rifles and drinking hot tea or rum rations, men spent daylight hours performing trench maintenance: filling sandbags, clearing collapsed traverses, and staying beneath the parapet to avoid snipers. True activity occurred at night: working parties repaired barbed wire, carried heavy ration boxes up communication saps, and mounted scouting patrols across No Man's Land.",
    },
    {
      task: 'How did the RAMC diagnose and treat environmental conditions such as trench foot, lice-borne trench fever, and shell shock (NYD.N)?',
      answer:
        "The RAMC tackled non-combat afflictions through systemic prevention: trench foot, caused by prolonged immersion in cold mud, was combated by ordering men to change socks twice daily and rub whale oil into feet. Trench fever, causing severe joint pain, was traced in 1918 to lice living in clothing seams, prompting mobile steam delousing baths. Shell shock, marked by tremors, blindness, and paralysis caused by relentless shellfire, was initially labeled 'Not Yet Diagnosed (Nervous)' [NYD.N]; while some unsympathetic officers accused victims of cowardice, doctors like W.H.R. Rivers pioneered psychoanalysis and rest cures at Craiglockhart Hospital.",
    },
  ],

  // Lesson 23: Battlefield Trauma
  23: [
    {
      task: 'Why were high-explosive artillery shrapnel shells and heavily manured Flanders soil particularly deadly in causing gas gangrene and tetanus?',
      answer:
        'High-explosive artillery shells accounted for 58% of all battlefield wounds: jagged, irregular shrapnel fragments ripped through flesh, smashing bones and driving muddy uniform cloth deep into wounds. Flanders agricultural soil had been heavily manured for centuries, containing lethal anaerobic soil bacteria including Clostridium tetani (tetanus) and Clostridium perfringens (gas gangrene). In closed, oxygen-deprived wounds, these bacteria multiplied rapidly, releasing lethal toxins that destroyed muscle tissue and produced foul-smelling gas gangrene that killed wounded soldiers within 48 hours.',
    },
  ],

  // Lesson 24: Chain of Evacuation
  24: [
    {
      task: 'What roles did volunteer women in the First Aid Nursing Yeomanry (FANY) and Voluntary Aid Detachments (VAD) perform in the Chain of Evacuation?',
      answer:
        'Volunteer women played vital operational roles on the Western Front: the First Aid Nursing Yeomanry (FANY), founded in 1907, operated motor ambulance convoys under heavy shellfire, drove mobile field kitchens, and transported wounded men from Casualty Clearing Stations to Base Hospitals and hospital ships. Voluntary Aid Detachment (VAD) nurses, recruited by the British Red Cross, worked alongside professional military nurses in frontline dressing stations and base hospitals, cleaning wounds, administering medicine, and providing essential palliative and psychological care.',
    },
    {
      task: 'Trace the sequential medical stages of the British Chain of Evacuation from the frontline trench to Base Hospitals in France.',
      answer:
        'The RAMC Chain of Evacuation moved casualties through five synchronized stages: (1) Regimental Aid Post (RAP), located 200 yards behind the frontline in a dugout, where the Battalion Medical Officer applied emergency bandages and tourniquets; (2) Advanced Dressing Station (ADS), roughly 1,000 yards back, sorting casualties into walking wounded and stretcher cases; (3) Casualty Clearing Station (CCS), situated near railway junctions beyond artillery range (10–12 miles back), equipped with surgical operating theatres for urgent life-saving operations; (4) Ambulance Trains transporting stabilized men to (5) Base Hospitals near coastal ports (like Étaples and Boulogne) for long-term recovery or hospital ship evacuation to Britain.',
    },
    {
      task: 'How did surgeons at Casualty Clearing Stations (CCS) use triage systems to maximize survival rates during major offensives like the Somme and Passchendaele?',
      answer:
        'During mass-casualty offensives, Casualty Clearing Stations operated a strict three-tier triage system to optimize limited surgical resources: (1) The Walking Wounded, who received basic dressing and were returned to duty or sent by train; (2) Severe, Operable Casualties, who required immediate, life-saving surgery (abdominal wounds, severe compound fractures, limb amputations to prevent gangrene); and (3) The Moribund, patients whose injuries were deemed fatal, who were placed in quiet tents with medical orderlies and administered palliative morphine to die with dignity.',
    },
    {
      task: 'What historical insights does authentic 1916 archival footage provide regarding the conditions and walking wounded at Advanced Dressing Stations during the Somme?',
      answer:
        'Authentic imperial archival film from the Somme reveals the grim physical reality of frontline medicine: hundreds of shell-shocked, bandaged soldiers crowding around muddy earthen dugouts at Minden Post. The footage shows stretcher bearers caked in mud, blood-soaked uniforms, improvised splints fashioned from wood, and the calm professionalism of RAMC medical officers working under continuous artillery noise and smoke without modern antiseptic facilities.',
    },
  ],

  // Lesson 25: Surgical Breakthroughs
  25: [
    {
      task: 'How did wound debridement and the Carrel-Dakin antiseptic irrigation method defeat lethal anaerobic bacterial infections on the Western Front?',
      answer:
        'Because traditional antiseptic sprays like carbolic acid burned healthy tissue and failed against deeply embedded anaerobic bacteria, surgeons developed two surgical breakthroughs: first, wound debridement—the surgical excision of all dead, contaminated tissue and foreign uniform cloth from around the wound margins. Second, French surgeon Alexis Carrel and British chemist Henry Dakin developed the Carrel-Dakin method: sterilizing open wounds through continuous irrigation with a buffered sodium hypochlorite solution flushed through rubber tubes, preventing gas gangrene and allowing wounds to heal cleanly.',
    },
    {
      task: 'Why was the introduction of the Thomas Splint by Sir Robert Jones in 1915 a revolutionary life-saving development for compound femur fractures?',
      answer:
        'Before December 1915, a compound fracture of the femur (thigh bone) had an 80% mortality rate: during rough transit in horse-drawn ambulances over shell-cratered roads, broken bone ends grated against each other, tearing major femoral blood vessels and causing fatal internal hemorrhage or shock. Surgeon Robert Jones introduced the Thomas Splint (invented by his uncle Hugh Owen Thomas)—a rigid steel rod frame with a leather-padded ring that fitted against the groin, pulling the leg in continuous traction. By stabilizing the bone fragments during transit, the Thomas Splint reduced compound femur mortality from 80% to under 20%.',
    },
  ],

  // Lesson 26: Lifesaving Innovations
  26: [
    {
      task: "How did Harold Gillies pioneer modern plastic surgery and pedicle tube skin grafts at Queen's Hospital in Sidcup during the First World War?",
      answer:
        "Confronted by horrific facial mutilations caused by explosive shrapnel, New Zealand surgeon Harold Gillies established a specialized facial reconstruction centre at Queen's Hospital in Sidcup, Kent in 1917, treating over 11,000 soldiers. Gillies invented the 'tubed pedicle' skin graft: he dissected a flap of living skin and flesh from the patient's chest or arm, rolled it into a hollow tube to protect the blood supply from infection, and sutured one end to the damaged jaw or nose, gradually moving the living tissue to reconstruct realistic noses, lips, and eyelids.",
    },
    {
      task: "What breakthroughs in anticoagulants and refrigeration enabled Oswald Robertson to establish the world's first blood depot at the Battle of Cambrai in 1917?",
      answer:
        "Before 1914, blood transfusions were direct donor-to-patient procedures because blood clotted within minutes. Three breakthroughs revolutionized blood storage: (1) Karl Landsteiner's discovery of ABO blood groups (1901) preventing fatal agglutination; (2) Richard Lewisohn's discovery (1915) that adding 0.2% sodium citrate prevented clotting without toxicity; and (3) Francis Rous and J.R. Turner's discovery (1916) that adding dextrose allowed blood to be stored for up to four weeks on ice. In October 1917 at the Battle of Cambrai, US Army doctor Oswald Hope Robertson established the first operational blood depot, transfusing stored blood into 22 severely wounded men in shock, saving 20 lives.",
    },
  ],
};

// Update edexcel_medicine
const jsPath = path.resolve(__dirname, '../units/edexcel_medicine/data.js');
const pubJsonPath = path.resolve(__dirname, '../public/data/edexcel_medicine.json');
const dataJsonPath = path.resolve(__dirname, '../data/edexcel_medicine.json');

delete require.cache[require.resolve(jsPath)];
const mod = require(jsPath);
const data = mod.default || mod.unitData || mod;

let enrichedCount = 0;
data.lessons.forEach((l, li) => {
  const pedList = medicinePedagogyByLesson[li + 1];
  if (pedList && l.video) {
    l.video.forEach((v, vi) => {
      const ped = pedList[vi] || pedList[0];
      if (ped) {
        v.viewing_task = ped.task;
        v.model_answer = ped.answer;
        enrichedCount++;
      }
    });

    // Sort shortest-to-longest
    l.video.sort((a, b) => parseDurationSecs(a.duration) - parseDurationSecs(b.duration));
  }
});

console.log(`Enriched ${enrichedCount} clips in edexcel_medicine`);

// Write files
const jsContent = `const unitData = ${JSON.stringify(data, null, 2)};\n\nexport default unitData;\nexport { unitData };\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
fs.writeFileSync(jsPath, jsContent, 'utf8');
fs.writeFileSync(pubJsonPath, JSON.stringify(data, null, 2), 'utf8');
if (fs.existsSync(dataJsonPath)) {
  fs.writeFileSync(dataJsonPath, JSON.stringify(data, null, 2), 'utf8');
}
console.log('✅ Successfully updated edexcel_medicine!');
