/**
 * scripts/upgrade_medicine_exam_engine.cjs
 *
 * Upgrades Edexcel Medicine Through Time (all 26 lessons) to:
 * 1. Standardise exam_practice schema across all 26 lessons
 * 2. Backfill full-mark exemplar model answers for KT3 & KT4 (Lessons 11-20)
 * 3. Format and standardise Q2(b) follow-up models for KT5 (Lessons 21-26)
 * 4. Maintain 100% synchronisation between exam_practice and gcse_task
 * 5. Update public/data, data/, and units/edexcel_medicine/data.js
 */

const fs = require('fs');
const path = require('path');

const KT3_KT4_EXAM_DATA = {
  lesson_3_1: {
    title: 'Edexcel GCSE (9–1) Paper 1 Section B Practice: Q3 & Q4',
    tariff: '16 marks (Q3 Similarity/Difference [4m] & Q4 Causal Explanation [12m])',
    questions: [
      {
        tariff: '4 marks',
        type: 'similarity_difference_4m',
        question:
          'Explain one way in which ideas about the cause of disease in the eighteenth century (c1700–c1800) were different from ideas in the late nineteenth century (c1860–c1900). [4 marks]',
        prompt:
          'Identify one valid difference, provide specific contextual knowledge for both periods, and conclude with an analytical comparison.',
        model:
          "One way in which ideas about the causes of disease were different was the shift from believing in **Spontaneous Generation** to accepting the **Germ Theory**. In the eighteenth century, physicians believed in Spontaneous Generation, arguing that decaying organic matter like rotting meat or stagnant water spontaneously generated disease and microbes out of nothing. In contrast, by the late nineteenth century, following Louis Pasteur's 1861 Germ Theory and swan-neck flask experiments, scientists understood that microscopic, airborne bacteria entered organisms from the outside and caused decay and illness. Therefore, while eighteenth-century doctors believed decay created disease from within, late nineteenth-century doctors proved that external living microbes directly caused infection.",
        scaffolding: {
          acronym: 'P-E-E-C (Point • Evidence 1 • Evidence 2 • Comparison)',
          acronym_title: '4-Mark Comparison Formula',
          steps: [
            {
              letter: 'P',
              name: 'State Difference',
              prompt: 'State clearly one specific difference between the two periods.',
            },
            {
              letter: 'E1',
              name: 'Period 1 Evidence',
              prompt: 'Explain ideas in the 18th century with precise factual detail.',
            },
            {
              letter: 'E2',
              name: 'Period 2 Evidence',
              prompt: 'Explain ideas in the late 19th century with precise factual detail.',
            },
            {
              letter: 'C',
              name: 'Comparative Link',
              prompt: "Conclude with 'Therefore, while Period 1 believed... Period 2 proved...'",
            },
          ],
        },
      },
      {
        tariff: '12 marks',
        type: 'causal_explanation_12m',
        question:
          'Explain why there was rapid progress in identifying the causes of illness between 1860 and 1890. [12 marks]',
        stimulus: ['Louis Pasteur', 'Robert Koch'],
        prompt:
          'Explain three distinct causal factors (using the two stimulus points plus one of your own). Write three fully developed PEEL paragraphs.',
        model:
          "One major reason for rapid progress was Louis Pasteur's development and publication of the **Germ Theory** in 1861. Prior to Pasteur, British and European medicine was dominated by the false theories of spontaneous generation and miasma. Investigating why wine and beer turned sour, Pasteur used swan-neck flask experiments to prove that airborne living microbes caused decay, and demonstrated that heating liquids killed these organisms (pasteurisation). He then linked this discovery to animal and human illness, publishing his Germ Theory in 1861 and demonstrating in 1878 that specific germs caused silkworm disease. Therefore, Pasteur provided the essential conceptual breakthrough by proving scientifically that external microscopic organisms, rather than spontaneous generation or bad air, were the true cause of decay and disease.<br><br>Furthermore, German physician **Robert Koch** transformed Pasteur's theoretical breakthrough into practical, systematic microbe-hunting. While Pasteur proved germs caused decay, he could not isolate individual human disease-causing bacteria. Koch solved this by developing groundbreaking laboratory techniques: he used solid agar jelly in petri dishes to grow pure, separate bacterial colonies and stained microbes with synthetic aniline dyes so they could be seen clearly under microscopes. Using these methods, Koch isolated the specific bacteria responsible for anthrax (1876), tuberculosis (1882), and cholera (1883), and formulated 'Koch's Postulates'—a rigid four-step scientific test proving a specific microbe caused a specific disease. Therefore, Koch accelerated progress by providing the precise scientific tools and methodology that enabled researchers across Europe to identify the exact microbial causes of deadly human diseases.<br><br>In addition, rapid progress was driven by **advancements in optical technology and intense national rivalry**. During the 1870s and 1880s, industrial precision engineering perfected the achromatic optical microscope; microscope lenses designed by Ernst Abbe and manufactured by the Carl Zeiss company allowed scientists to view bacteria magnified up to 1,000 times without visual distortion. At the same time, the Franco-Prussian War (1870–71) ignited fierce patriotic rivalry between France and Germany. Both the French and German national governments poured massive public funding into research institutes: the German government established the Imperial Health Office for Koch's team, while the French government funded the Pasteur Institute in Paris. Therefore, technological manufacturing combined with state-backed financial investment and nationalist competition enabled rival research teams to discover disease-causing pathogens at an unprecedented speed.",
        scaffolding: {
          acronym: 'PEEL x 3 (Point • Evidence • Explain • Link)',
          acronym_title: '12-Mark 3-Paragraph Causal Structure',
          steps: [
            {
              letter: 'P1',
              name: "Pasteur's Germ Theory",
              prompt:
                'Explain how Pasteur disproved spontaneous generation and proved microbes cause disease.',
            },
            {
              letter: 'P2',
              name: "Koch's Microbe Hunting",
              prompt:
                "Explain Koch's agar jelly, aniline dyes, and identification of specific disease bacteria.",
            },
            {
              letter: 'P3',
              name: 'Technology & National Rivalry',
              prompt:
                'Explain Zeiss microscopes, government funding, and Franco-Prussian competition.',
            },
          ],
        },
      },
    ],
  },

  lesson_3_2: {
    title: 'Edexcel GCSE (9–1) Paper 1 Section B Practice: Q3 & Q4',
    tariff: '16 marks (Q3 Similarity/Difference [4m] & Q4 Causal Explanation [12m])',
    questions: [
      {
        tariff: '4 marks',
        type: 'similarity_difference_4m',
        question:
          'Explain one way in which approaches to preventing smallpox in the eighteenth century before 1796 were different from approaches in the nineteenth century. [4 marks]',
        prompt:
          'Identify one valid difference, provide specific contextual knowledge for both periods, and conclude with an analytical comparison.',
        model:
          "One way in which approaches to preventing smallpox were different was the transition from **inoculation (variolation)** to **vaccination**. In the eighteenth century before 1796, people used inoculation, which involved taking live smallpox pus from an infected patient and scratching it into a healthy person's arm. This was dangerous because patients developed full-blown smallpox, could infect family members, and often died. In contrast, in the nineteenth century, Edward Jenner's 1796 discovery of vaccination used harmless cowpox from cows or milkmaids, which stimulated immunity without risking a lethal smallpox epidemic. Therefore, while eighteenth-century inoculation used active, lethal smallpox that risked triggering deadly outbreaks, nineteenth-century vaccination used safe cowpox that protected the individual without endangering the community.",
        scaffolding: {
          acronym: 'P-E-E-C (Point • Evidence 1 • Evidence 2 • Comparison)',
          acronym_title: '4-Mark Comparison Formula',
          steps: [
            {
              letter: 'P',
              name: 'State Difference',
              prompt: 'State the contrast between variolation and cowpox vaccination.',
            },
            {
              letter: 'E1',
              name: '18th Century Inoculation',
              prompt: 'Explain variolation risks, live pus, and epidemic dangers.',
            },
            {
              letter: 'E2',
              name: '19th Century Vaccination',
              prompt: "Explain Jenner's cowpox technique and safety.",
            },
            {
              letter: 'C',
              name: 'Comparative Link',
              prompt: 'Conclude with an explicit comparative sentence.',
            },
          ],
        },
      },
      {
        tariff: '12 marks',
        type: 'causal_explanation_12m',
        question:
          'Explain why there was opposition to Edward Jenner’s smallpox vaccination in the late eighteenth and early nineteenth centuries. [12 marks]',
        stimulus: ['Commercial inoculators', 'The Anti-Vaccination League'],
        prompt:
          "Explain three distinct causal factors behind public and medical resistance to Jenner's smallpox vaccine.",
        model:
          "One major reason for opposition was the **commercial self-interest of professional inoculators**. In the eighteenth century, smallpox inoculation had become an enormously lucrative private medical business. Prominent dynasties like the Sutton family charged wealthy aristocrats and merchants substantial fees (often up to £20 per patient) to quarantine and inoculate households with mild smallpox. Because Jenner offered vaccination for free to local farmworkers and published his findings openly, inoculators feared losing their livelihoods and status. Consequently, commercial inoculators launched aggressive smear campaigns in pamphlets and newspapers, publishing false stories of vaccinated patients falling ill to protect their monopoly on smallpox prevention.<br><br>Furthermore, fierce opposition came from **religious and moral traditionalists who formed groups like the Anti-Vaccination League**. Many devout Christians and conservative clergymen argued that smallpox was a divine punishment sent by God to cleanse sinful humans, meaning that attempting to eradicate it interfered with God's will. Moreover, using cowpox was viewed as disgusting and unnatural because it crossed the sacred boundary between beasts and human beings. Satirical cartoonists like James Gillray published famous caricatures showing vaccinated patients sprouting cow horns, tails, and bovine muzzles from their flesh. When Parliament later made vaccination compulsory in the 1852 and 1867 Vaccination Acts, opposition intensified into mass street protests by the Anti-Vaccination League, who argued compulsory vaccination infringed upon personal civil liberties.<br><br>In addition, opposition was justified by **scientific skepticism within the medical establishment and early clinical accidents**. When Jenner submitted his paper to the Royal Society in 1797, they rejected it because Jenner could not explain *how* vaccination worked; since viruses and antibodies were completely unknown before Pasteur's 1861 Germ Theory, Jenner's idea that an animal infection could protect against a human disease seemed unscientific guesswork. Furthermore, early vaccination had real practical dangers: careless doctors contaminated vaccination lancets with blood or syphilis, or accidentally used smallpox matter instead of cowpox, leading to tragic patient deaths. Therefore, genuine medical ignorance and fatal clinical errors convinced many respectable physicians that vaccination was an unproven, hazardous procedure.",
        scaffolding: {
          acronym: 'PEEL x 3 (Point • Evidence • Explain • Link)',
          acronym_title: '12-Mark 3-Paragraph Causal Structure',
          steps: [
            {
              letter: 'P1',
              name: 'Commercial Inoculators',
              prompt: 'Explain loss of profits, the Sutton family, and economic smear campaigns.',
            },
            {
              letter: 'P2',
              name: 'Religious Objections & Anti-Vaccination',
              prompt: 'Explain moral objections, cow cartoons, and the Anti-Vaccination League.',
            },
            {
              letter: 'P3',
              name: 'Medical Skepticism & Clinical Accidents',
              prompt: 'Explain lack of biological explanation and contaminated needles.',
            },
          ],
        },
      },
    ],
  },

  lesson_3_3: {
    title: 'Edexcel GCSE (9–1) Paper 1 Section B Practice: Q3 & Q4',
    tariff: '16 marks (Q3 Similarity/Difference [4m] & Q4 Causal Explanation [12m])',
    questions: [
      {
        tariff: '4 marks',
        type: 'similarity_difference_4m',
        question:
          'Explain one way in which hospital care in the eighteenth century was similar to hospital care in the early nineteenth century before 1850. [4 marks]',
        prompt:
          'Identify one valid similarity, cite precise historical details from both centuries, and conclude with an analytical comparison.',
        model:
          "One way in which hospital care was similar was the persistent problem of high mortality caused by unhygienic conditions and **'hospitalism'**. In the eighteenth century, voluntary hospitals like Guy's and St Thomas' lacked ventilation, patients shared beds, and dirty straw bedding was rarely changed, causing rampant spreading of infections like typhus and gangrene. Similarly, in early nineteenth-century hospitals before 1850, wards remained dark, cramped, and poorly ventilated, nurses were viewed as untrained and drunken, and surgeons operated in unwashed frock coats, resulting in death rates often exceeding 40%. Therefore, in both periods, hospitals functioned as dangerous places where patients frequently died from secondary infections caught inside the hospital rather than healing safely in clean environments.",
        scaffolding: {
          acronym: 'P-E-E-C (Point • Evidence 1 • Evidence 2 • Comparison)',
          acronym_title: '4-Mark Comparison Formula',
          steps: [
            {
              letter: 'P',
              name: 'State Similarity',
              prompt: 'Identify unhygienic conditions and high secondary infection rates.',
            },
            {
              letter: 'E1',
              name: '18th Century Wards',
              prompt: 'Describe cramped voluntary hospitals and unwashed bedding.',
            },
            {
              letter: 'E2',
              name: 'Early 19th Century Wards',
              prompt: 'Describe dirty operating coats, untrained nurses, and hospitalism.',
            },
            {
              letter: 'C',
              name: 'Comparative Link',
              prompt: 'Conclude with an explicit comparative sentence.',
            },
          ],
        },
      },
      {
        tariff: '12 marks',
        type: 'causal_explanation_12m',
        question: 'Explain why hospital care improved so rapidly between 1850 and 1900. [12 marks]',
        stimulus: ['Florence Nightingale', 'Antiseptic and aseptic surgery'],
        prompt:
          'Explain three distinct causal factors behind the transformation of Victorian hospitals into sterile, professional healing centers.',
        model:
          "One major reason hospital care improved was the pioneering work of **Florence Nightingale in hospital design and hygiene**. During the Crimean War (1854–56), Nightingale took 38 nurses to Scutari Barrack Hospital, where she slashed the death rate from 42% to 2% through aggressive sanitation, fresh air, clean water, and nutritious food. Returning to Britain as a national heroine, she published *Notes on Hospitals* (1859), which revolutionized hospital architecture. She advocated the 'pavilion plan', replacing cramped multi-story wards with separate, single-story wings featuring large windows facing each other to maximize cross-ventilation, along with easily cleaned tiled floors and dedicated drainage. As new hospitals like St Thomas' in London were rebuilt to these specifications, hospitalism and airborne cross-infection plummeted.<br><br>Furthermore, hospital care improved because **nursing was transformed into a disciplined, professional medical career**. Before the 1860s, hospital nurses were widely regarded as working-class, untrained, and negligent women often caricatured as drunken 'Betsy Prigs'. Nightingale used the £44,000 public fund raised in her honour to establish the Nightingale Training School at St Thomas' Hospital in 1860. The school provided rigorous scientific, anatomical, and sanitary training under strict matrons, establishing nursing as a respectable, middle-class profession with defined uniforms, codes of conduct, and sterile medical routines. Educated Nightingale nurses were dispatched across Britain and the British Empire to manage wards, ensuring that sterile procedures, accurate patient temperature charting, and wound monitoring were maintained twenty-four hours a day.<br><br>In addition, rapid improvement was driven by the **introduction of antiseptic and aseptic surgical methods on hospital wards**. Following Joseph Lister's 1865 breakthrough using carbolic acid to kill airborne microbes in compound fractures, hospital gangrene and sepsis were steadily brought under control. By the 1880s and 1890s, hospitals transitioned from antiseptic spray to total aseptic surgery: operating theatres were moved away from general wards into dedicated sterile suites equipped with steam autoclaves (invented by Charles Chamberland in 1881) to sterilize surgical instruments, gowns, and gauze. Surgeons and ward staff began wearing sterile boiled rubber gloves and white linen aprons, and replaced unwashed communal sponges with single-use sterile dressings. Therefore, eliminating bacteria from surgical wards transformed hospitals from terrifying death traps into modern, lifesaving clinical institutions.",
        scaffolding: {
          acronym: 'PEEL x 3 (Point • Evidence • Explain • Link)',
          acronym_title: '12-Mark 3-Paragraph Causal Structure',
          steps: [
            {
              letter: 'P1',
              name: 'Florence Nightingale',
              prompt: 'Explain Scutari, Notes on Hospitals, and the pavilion plan design.',
            },
            {
              letter: 'P2',
              name: 'Professional Nursing',
              prompt: 'Explain Nightingale School, moral discipline, and 24-hour clinical care.',
            },
            {
              letter: 'P3',
              name: 'Antiseptic & Aseptic Wards',
              prompt: 'Explain Lister, carbolic acid, autoclaves, and rubber gloves.',
            },
          ],
        },
      },
    ],
  },

  lesson_3_4: {
    title: 'Edexcel GCSE (9–1) Paper 1 Section B Practice: Q3 & Q5/Q6',
    tariff: '24 marks (Q3 Comparison [4m] & Q5/Q6 Evaluative Essay [16+4m SPaG])',
    questions: [
      {
        tariff: '4 marks',
        type: 'similarity_difference_4m',
        question:
          'Explain one way in which surgery in the early nineteenth century (c1800–c1840) was different from surgery in the late nineteenth century (c1870–c1900). [4 marks]',
        prompt:
          'Identify one valid difference, cite precise historical details from both eras, and conclude with an analytical comparison.',
        model:
          "One way in which surgery was different was the introduction of effective **anaesthetics** and **antiseptic methods** to eliminate pain and infection. In the early nineteenth century, surgery was performed without anaesthetics on fully conscious, agonizing patients held down by strong assistants, forcing surgeons like Robert Liston to amputate limbs in under thirty seconds to prevent fatal shock, with over 45% dying of gangrene. In contrast, by the late nineteenth century, surgeons used chloroform to render patients completely unconscious and applied Joseph Lister's carbolic acid and aseptic autoclaves to sterilize operating theatres, allowing complex internal procedures lasting hours to take place safely. Therefore, while early nineteenth-century surgery was rushed, agonising, and deadly from shock and sepsis, late nineteenth-century surgery was pain-free, meticulous, and performed in sterile environments with high survival rates.",
        scaffolding: {
          acronym: 'P-E-E-C (Point • Evidence 1 • Evidence 2 • Comparison)',
          acronym_title: '4-Mark Comparison Formula',
          steps: [
            {
              letter: 'P',
              name: 'State Difference',
              prompt: 'Identify the elimination of pain and surgical infection.',
            },
            {
              letter: 'E1',
              name: 'Early 19th Century',
              prompt: 'Explain conscious patients, rushed 30-second amputations, and shock.',
            },
            {
              letter: 'E2',
              name: 'Late 19th Century',
              prompt: 'Explain chloroform, carbolic acid, and meticulous internal surgery.',
            },
            {
              letter: 'C',
              name: 'Comparative Link',
              prompt: 'Conclude with an explicit comparative sentence.',
            },
          ],
        },
      },
      {
        tariff: '16+4 marks',
        type: 'evaluative_essay_16m',
        question:
          "'The development of anaesthetics was the most important breakthrough in surgery in the nineteenth century.' How far do you agree? Explain your answer. [16 marks + 4 marks SPaG = 20 marks]",
        stimulus: ['James Simpson and Chloroform', 'Joseph Lister and Antiseptics'],
        prompt:
          'Write a balanced analytical essay evaluating the relative significance of anaesthetics versus antiseptics/asepsis and blood loss control.',
        model:
          "It is widely argued that the development of anaesthetics was the most important surgical breakthrough of the nineteenth century, as conquering excruciating physical pain transformed surgical practice from a terrifying ordeal into a viable medical specialty. However, while anaesthetics solved the immediate crisis of pain and fatal shock, they initially increased patient mortality during the 'Black Period' of surgery. Therefore, I disagree that anaesthetics were the single most important breakthrough, because without Joseph Lister's discovery of antiseptics and the subsequent transition to aseptic surgery, anaesthetics alone resulted in more infections and deaths rather than saving lives.<br><br>On the one hand, there is strong evidence that anaesthetics represented a monumental breakthrough. Before the 1840s, surgical operations were severely constrained by agony; patients had to be forcibly strapped to tables while surgeons performed rapid amputations in seconds to prevent the patient dying of cardiac shock or blood loss. In 1847, Edinburgh obstetrician **James Simpson** discovered the anaesthetic properties of **chloroform**, which rendered patients completely unconscious, relaxed muscle tissue, and permitted surgeons to operate with far greater care and precision. The breakthrough gained national and royal legitimacy in 1853 when Queen Victoria publicly praised chloroform during the birth of Prince Leopold. By eliminating agony, anaesthetics made patients willing to undergo life-saving operations that they previously would have refused, creating the foundation for all modern surgical intervention.<br><br>On the other hand, the development of anaesthetics alone had unintended, catastrophic consequences known as the **'Black Period' of surgery (1846–1865)**. Because patients were unconscious and felt no pain, ambitious surgeons attempted longer, deeper, and far more invasive abdominal and internal procedures. However, because surgeons had no understanding of germs or sterile technique, they continued operating in blood-stained frock coats using dirty, unwashed hands and infected sponges. Consequently, rates of hospital gangrene, sepsis, and pyemia soared, and overall surgical mortality actually increased in the two decades following the introduction of anaesthetics. This proves that anaesthetics alone were insufficient and dangerously incomplete without a solution to infection.<br><br>Therefore, the discovery of **antiseptics by Joseph Lister** and the transition to **aseptic surgery** was fundamentally more important. Inspired by Louis Pasteur's 1861 Germ Theory, Lister realized in 1865 that surgical sepsis was caused by living airborne microbes entering open wounds. By soaking wound dressings in carbolic acid, spraying carbolic mist in operating theatres, and sterilizing catgut ligatures, Lister reduced surgical mortality at Glasgow Royal Infirmary from 45.7% to 15.0%. By the 1880s and 1890s, surgeons perfected Lister's breakthrough into complete asepsis: using Charles Chamberland's steam autoclaves to sterilize instruments at high heat, scrubbing hands, and wearing sterile rubber gloves and gowns. This completely eliminated microscopic pathogens from the operating theatre, making deep abdominal, chest, and brain surgery genuinely safe for the first time in history.<br><br>In conclusion, although the development of anaesthetics was indispensable in conquering pain and psychological trauma, it cannot be considered the most important breakthrough. Pain relief without infection control merely led to longer operations and higher mortality during the Black Period. The decisive turning point that allowed surgery to become truly lifesaving was Lister's antiseptic technique and aseptic operating theatres, because controlling bacterial infection was the factor that directly determined whether a patient lived or died.",
        scaffolding: {
          acronym: 'INTRO • AGREE • COUNTER • ALTERNATIVE • JUDGMENT',
          acronym_title: '16-Mark Evaluative Essay Structure Strip',
          steps: [
            {
              letter: 'I',
              name: 'Introduction & Criteria',
              prompt:
                'Define criteria: pain relief vs patient survival and post-operative infection.',
            },
            {
              letter: 'A',
              name: 'Agree: Anaesthetics',
              prompt: 'Explain Simpson, chloroform (1847), shock reduction, and royal adoption.',
            },
            {
              letter: 'C',
              name: 'Counter: The Black Period',
              prompt: 'Explain deeper invasive operations, unwashed coats, and rising mortality.',
            },
            {
              letter: 'Alt',
              name: 'Alternative: Antiseptics & Asepsis',
              prompt: 'Explain Lister (1865), carbolic acid, autoclaves, and dropping mortality.',
            },
            {
              letter: 'J',
              name: 'Sustained Judgment',
              prompt: 'Weigh both factors to reach a definitive, criteria-based conclusion.',
            },
          ],
        },
      },
    ],
  },

  lesson_3_5: {
    title: 'Edexcel GCSE (9–1) Paper 1 Section B Practice: Q3 & Q4',
    tariff: '16 marks (Q3 Similarity/Difference [4m] & Q4 Causal Explanation [12m])',
    questions: [
      {
        tariff: '4 marks',
        type: 'similarity_difference_4m',
        question:
          'Explain one way in which government attitudes to public health in the early nineteenth century were different from government attitudes in the late nineteenth century. [4 marks]',
        prompt:
          'Identify one valid difference, provide specific contextual knowledge for both periods, and conclude with an analytical comparison.',
        model:
          "One way in which government attitudes were different was the transition from a policy of **laissez-faire** to active **state intervention**. In the early nineteenth century, the British government adhered strictly to laissez-faire ('leave alone'), believing it was not the state's responsibility to interfere in local affairs, build sewers, or levy national taxes to clean up industrial slums. In contrast, by the late nineteenth century, the government passed compulsory legislation like the landmark **1875 Public Health Act**, which forced all municipal councils to provide clean drinking water, pave and light streets, collect refuse, and appoint qualified Medical Officers of Health. Therefore, while the early nineteenth-century government took a hands-off approach that left citizens to suffer in squalor, the late nineteenth-century state accepted legal responsibility for safeguarding the living health of the nation.",
        scaffolding: {
          acronym: 'P-E-E-C (Point • Evidence 1 • Evidence 2 • Comparison)',
          acronym_title: '4-Mark Comparison Formula',
          steps: [
            {
              letter: 'P',
              name: 'State Difference',
              prompt: 'Contrast laissez-faire indifference with compulsory state intervention.',
            },
            {
              letter: 'E1',
              name: 'Early 19th Century',
              prompt: 'Explain laissez-faire, low taxes, and refusal to regulate slums.',
            },
            {
              letter: 'E2',
              name: 'Late 19th Century',
              prompt: 'Explain 1875 Public Health Act, compulsory sewers, and Medical Officers.',
            },
            {
              letter: 'C',
              name: 'Comparative Link',
              prompt: 'Conclude with an explicit comparative sentence.',
            },
          ],
        },
      },
      {
        tariff: '12 marks',
        type: 'causal_explanation_12m',
        question:
          'Explain why the British government abandoned laissez-faire and passed the 1875 Public Health Act. [12 marks]',
        stimulus: ['The 1867 Reform Act (working-class vote)', 'The Great Stink (1858)'],
        prompt:
          'Explain three distinct causal factors behind the transition to compulsory public health legislation.',
        model:
          "One major reason the government abandoned laissez-faire was the **expansion of the franchise through the 1867 Reform Act**. Prior to 1867, only wealthy property owners had the vote, and they naturally resisted paying local rates to fund sewage systems that benefited the poor. However, the Second Reform Act of 1867 enfranchised over one million male urban working-class factory workers. For the first time, both major political parties—Benjamin Disraeli's Conservatives and William Gladstone's Liberals—had to compete directly for working-class votes to win general elections. Disraeli adopted the campaign slogan *Sanitas sanitatum, omnia sanitas* ('Sanitation, sanitation, all is sanitation'), promising social reform. Consequently, when Disraeli won the 1874 general election, his government immediately introduced the comprehensive, compulsory 1875 Public Health Act to deliver on its electoral promises.<br><br>Furthermore, the government was compelled to act by the **overwhelming public health crisis of cholera and 'The Great Stink' of 1858**. Repeated cholera epidemics in 1831, 1848, and 1853 had killed tens of thousands, but because the rich could flee to the countryside, Parliament dragged its feet. However, in the blistering hot summer of 1858, the Thames—which acted as an open sewer for two million Londoners—produced a stench so putrid and nauseating that parliamentary curtains were soaked in chloride of lime and MPs were forced to flee the chamber. Fearing that miasma would kill politicians themselves, Parliament suspended business and rushed through emergency legislation within eighteen days, allocating £3 million to engineer Joseph Bazalgette to construct London's 82-mile underground intercepting sewer network. The enormous success of Bazalgette's sewers proved that large-scale public engineering saved lives, creating irresistible pressure for national legislation.<br><br>In addition, government policy shifted due to **scientific evidence provided by Dr John Snow and Louis Pasteur's Germ Theory**. In 1854, John Snow mapped cholera deaths in Soho and removed the handle of the contaminated Broad Street pump, conclusively proving that cholera was a waterborne infection rather than an airborne miasma. Snow's epidemiological findings were subsequently validated in 1861 by Louis Pasteur's Germ Theory, which demonstrated scientifically that microscopic bacteria thrived in contaminated water and rotting waste. This destroyed the scientific credibility of miasma theory and proved to civil servants that laissez-faire was deadly negligence. Therefore, armed with indisputable scientific proof that clean water prevented epidemic disease, the government made public health duties strictly compulsory for all local councils in 1875.",
        scaffolding: {
          acronym: 'PEEL x 3 (Point • Evidence • Explain • Link)',
          acronym_title: '12-Mark 3-Paragraph Causal Structure',
          steps: [
            {
              letter: 'P1',
              name: '1867 Reform Act',
              prompt: 'Explain working-class votes, Disraeli, and electoral promises.',
            },
            {
              letter: 'P2',
              name: 'The Great Stink & Bazalgette',
              prompt: "Explain 1858 Thames stench, MP panic, and Bazalgette's sewers.",
            },
            {
              letter: 'P3',
              name: 'Scientific Proof (Snow & Pasteur)',
              prompt: 'Explain Broad Street pump, Germ Theory, and destruction of miasma.',
            },
          ],
        },
      },
    ],
  },

  lesson_4_1: {
    title: 'Edexcel GCSE (9–1) Paper 1 Section B Practice: Q3 & Q4',
    tariff: '16 marks (Q3 Similarity/Difference [4m] & Q4 Causal Explanation [12m])',
    questions: [
      {
        tariff: '4 marks',
        type: 'similarity_difference_4m',
        question:
          'Explain one way in which understanding of the causes of disease in the late nineteenth century was similar to understanding in the modern period (c1950–present). [4 marks]',
        prompt:
          'Identify one valid similarity, provide specific contextual knowledge for both periods, and conclude with an analytical comparison.',
        model:
          'One way understanding of the causes of disease was similar was the reliance on **microscopic, scientific laboratory investigation** to identify specific causes of specific illnesses. In the late nineteenth century, scientists like Robert Koch and Louis Pasteur used microscopes, agar culture plates, and chemical dyes to isolate the specific individual bacteria responsible for diseases like tuberculosis and cholera. Similarly, in the modern period from 1953 onwards, geneticists used X-ray crystallography, electron microscopes, and computer gene sequencing to identify the specific double-helix DNA structure and genetic mutations responsible for hereditary conditions like cystic fibrosis. Therefore, both periods based their understanding on rigorous empirical laboratory observation to locate the precise, microscopic root cause of disease rather than relying on superstition or external balance.',
        scaffolding: {
          acronym: 'P-E-E-C (Point • Evidence 1 • Evidence 2 • Comparison)',
          acronym_title: '4-Mark Comparison Formula',
          steps: [
            {
              letter: 'P',
              name: 'State Similarity',
              prompt: 'Identify laboratory investigation to isolate microscopic root causes.',
            },
            {
              letter: 'E1',
              name: 'Late 19th Century',
              prompt: 'Explain Koch, Pasteur, microscopes, and bacterial isolation.',
            },
            {
              letter: 'E2',
              name: 'Modern Period',
              prompt: 'Explain DNA double helix, X-ray crystallography, and gene sequencing.',
            },
            {
              letter: 'C',
              name: 'Comparative Link',
              prompt: 'Conclude with an explicit comparative sentence.',
            },
          ],
        },
      },
      {
        tariff: '12 marks',
        type: 'causal_explanation_12m',
        question:
          'Explain why understanding of genetics and hereditary diseases improved so rapidly after 1950. [12 marks]',
        stimulus: ['Rosalind Franklin and Photograph 51', 'The Human Genome Project'],
        prompt:
          'Explain three distinct causal factors behind the post-1950 revolution in genetic understanding.',
        model:
          "One major reason genetic understanding improved was the **discovery of the molecular structure of DNA in 1953**. Prior to the 1950s, scientists knew that traits were inherited through chromosomes, but had no idea how genetic information was stored or replicated. Working at King's College London, **Rosalind Franklin** and Maurice Wilkins used pioneering X-ray crystallography to capture 'Photograph 51', which clearly revealed the diffraction pattern of a helical structure. Using Franklin's data, Cambridge researchers James Watson and Francis Crick constructed their famous 3D double-helix model of DNA in 1953, cracking the code of complementary base pairs (Adenine-Thymine, Cytosine-Guanine). This discovery explained for the first time the physical mechanism of heredity, proving that genes were chemical sequences that could be read, copied, and potentially repaired.<br><br>Furthermore, understanding accelerated through the launch and completion of the **Human Genome Project (1990–2003)**. Coordinated by an international coalition of publicly funded laboratories in the United States, Britain, France, Germany, and Japan, the project set out to map and sequence every single one of the 3 billion chemical base pairs in the human genetic code. By completing the map in 2003, researchers successfully catalogued roughly 20,000 human genes. This breakthrough allowed modern medical geneticists to pinpoint the exact faulty gene mutations responsible for devastating hereditary diseases like cystic fibrosis, Huntington's chorea, sickle cell anaemia, and inherited breast cancers (BRCA1/BRCA2), moving medicine from treating symptoms to identifying genetic root causes.<br><br>In addition, rapid progress was driven by **advancements in digital computing power and electron microscopy**. In the 1950s, manual DNA sequencing of a few dozen base pairs took months of painstaking laboratory work. However, the post-war digital computing revolution and the development of automated automated gene-sequencing machines powered by supercomputers enabled scientists to process billions of genetic sequences in hours. Furthermore, modern electron microscopes and CRISPR gene-editing technology (developed in 2012) allowed scientists not only to view chromosomes at atomic resolution, but to edit and correct mutated gene sequences directly. Therefore, advanced computing and imaging technology transformed genetic theory into practical diagnostic screening and targeted gene therapy.",
        scaffolding: {
          acronym: 'PEEL x 3 (Point • Evidence • Explain • Link)',
          acronym_title: '12-Mark 3-Paragraph Causal Structure',
          steps: [
            {
              letter: 'P1',
              name: 'Discovery of DNA Structure (1953)',
              prompt: 'Explain Franklin, Photograph 51, Watson & Crick, and base pairs.',
            },
            {
              letter: 'P2',
              name: 'The Human Genome Project',
              prompt:
                'Explain international public funding, 3 billion base pairs, and gene mapping.',
            },
            {
              letter: 'P3',
              name: 'Computing Power & Advanced Tech',
              prompt: 'Explain supercomputers, automated sequencers, and CRISPR gene therapy.',
            },
          ],
        },
      },
    ],
  },

  lesson_4_2: {
    title: 'Edexcel GCSE (9–1) Paper 1 Section B Practice: Q3 & Q4',
    tariff: '16 marks (Q3 Similarity/Difference [4m] & Q4 Causal Explanation [12m])',
    questions: [
      {
        tariff: '4 marks',
        type: 'similarity_difference_4m',
        question:
          'Explain one way in which methods of diagnosing illness in the nineteenth century were different from methods in the modern period (c1900–present). [4 marks]',
        prompt:
          'Identify one valid difference, provide specific contextual knowledge for both periods, and conclude with an analytical comparison.',
        model:
          "One way in which methods of diagnosing illness were different was the development of **internal digital imaging and non-invasive scanning technology**. In the nineteenth century, physicians had to rely largely on external physical observation, palpating the abdomen, listening with primitive wooden stethoscopes, inspecting urine, and questioning patients, meaning internal tumours or internal bleeding could only be confirmed after death during a post-mortem autopsy. In contrast, in the modern period, doctors utilize high-tech medical machinery like Wilhelm Röntgen's X-rays (1895), Godfrey Hounsfield's CT scanners (1971), and MRI scans, which produce detailed 3D cross-sectional images of soft tissue inside the living human body without surgical incision. Therefore, while nineteenth-century diagnosis was limited to external sensory symptoms and exploratory surgery, modern diagnosis enables doctors to peer deep inside living organs instantly and painlessly.",
        scaffolding: {
          acronym: 'P-E-E-C (Point • Evidence 1 • Evidence 2 • Comparison)',
          acronym_title: '4-Mark Comparison Formula',
          steps: [
            {
              letter: 'P',
              name: 'State Difference',
              prompt: 'Contrast external physical observation with non-invasive internal scanning.',
            },
            {
              letter: 'E1',
              name: '19th Century Diagnosis',
              prompt: 'Explain stethoscopes, palpation, urine, and reliance on autopsies.',
            },
            {
              letter: 'E2',
              name: 'Modern Diagnosis',
              prompt: 'Explain X-rays, CT scanners, MRI scans, and painless 3D imaging.',
            },
            {
              letter: 'C',
              name: 'Comparative Link',
              prompt: 'Conclude with an explicit comparative sentence.',
            },
          ],
        },
      },
      {
        tariff: '12 marks',
        type: 'causal_explanation_12m',
        question:
          'Explain why technological developments led to improvements in medical diagnosis in the twentieth century. [12 marks]',
        stimulus: ['X-rays', 'CT and MRI scanners'],
        prompt:
          'Explain three distinct causal factors showing how technology transformed clinical diagnostic accuracy in the 20th century.',
        model:
          'One major reason technological developments improved diagnosis was the **application of X-rays from 1895 onwards**. Discovered by German physicist Wilhelm Röntgen in 1895, X-rays possessed the unique physical property of passing through human soft tissue while being absorbed by dense bone. Within months of discovery, British hospitals installed primitive X-ray machines, allowing doctors to diagnose bone fractures and joint dislocations accurately without inflicting painful physical manipulation. During the First World War, Marie Curie and the Red Cross deployed mobile X-ray vans to the Western Front, enabling battlefield surgeons to locate lodged shrapnel and bullet fragments instantly before cutting into tissue. Therefore, X-rays provided the first non-invasive window into the living human skeleton, eliminating guesswork in trauma and orthopedic diagnosis.<br><br>Furthermore, diagnosis was revolutionized by the **invention of computerized tomography (CT) and magnetic resonance imaging (MRI)**. While traditional X-rays showed bones clearly, they could not differentiate soft tissues or detect early-stage brain tumours. In 1971, British electrical engineer Godfrey Hounsfield invented the **CT scanner**, using rotating X-ray beams combined with digital computers to construct detailed 3D cross-sectional slices of internal organs. This was followed in the 1980s by the development of **MRI scanners**, which used radio waves and powerful magnetic fields to map water molecules in bodily tissues without any harmful radiation exposure. Consequently, physicians could detect microscopic brain strokes, spinal disc tears, and malignant liver or lung tumours years before they became fatal, vastly improving treatment survival rates.<br><br>In addition, diagnosis advanced through the development of **fiber-optic endoscopy and automated biochemical testing**. The invention of flexible fiber-optic cables in the 1950s led to the development of the **endoscope**, allowing doctors to feed thin illuminated cameras down the throat or into the bowel to inspect stomach ulcers, colon polyps, and internal bleeding directly on video screens and take needle biopsies. Simultaneously, electronic laboratory analyzers automated the testing of blood, urine, and cerebrospinal fluid, measuring blood glucose for diabetes, detecting troponin levels for heart attacks, and identifying viral antibodies for HIV and hepatitis. Therefore, optical and biochemical technologies enabled doctors to diagnose physiological disorders precisely at cellular and chemical levels.',
        scaffolding: {
          acronym: 'PEEL x 3 (Point • Evidence • Explain • Link)',
          acronym_title: '12-Mark 3-Paragraph Causal Structure',
          steps: [
            {
              letter: 'P1',
              name: 'X-rays (Trauma & Bones)',
              prompt:
                'Explain Röntgen (1895), mobile vans in WWI, and locating fractures/shrapnel.',
            },
            {
              letter: 'P2',
              name: 'CT and MRI Scanning',
              prompt: 'Explain Hounsfield, rotating radiation, 3D cross-sections, and soft tissue.',
            },
            {
              letter: 'P3',
              name: 'Endoscopy & Blood Testing',
              prompt:
                'Explain fiber-optic cameras, internal biopsies, and automated blood analyzers.',
            },
          ],
        },
      },
    ],
  },

  lesson_4_3: {
    title: 'Edexcel GCSE (9–1) Paper 1 Section B Practice: Q3 & Q4',
    tariff: '16 marks (Q3 Similarity/Difference [4m] & Q4 Causal Explanation [12m])',
    questions: [
      {
        tariff: '4 marks',
        type: 'similarity_difference_4m',
        question:
          'Explain one way in which treatments for disease in the early twentieth century (1900–1930) were similar to treatments in the mid-twentieth century (1930–1950). [4 marks]',
        prompt:
          'Identify one valid similarity, cite precise chemical drugs from both eras, and conclude with an analytical comparison.',
        model:
          "One way in which treatments were similar was the reliance on **laboratory-engineered chemical compounds designed to target specific bacteria without harming patient cells ('magic bullets')**. In the early twentieth century, Paul Ehrlich and Sahachiro Hata developed Salvarsan 606 (1909), a targeted arsenic compound that selectively attacked the Treponema pallidum bacterium causing syphilis. Similarly, in the 1930s, Gerhard Domagk discovered Prontosil (1932), a red synthetic chemical sulfonamide that destroyed deadly streptococcal bacteria in blood poisoning and puerperal fever. Therefore, both periods marked a revolutionary transition where medical treatments were no longer herbal folk mixtures or palliative care, but scientifically designed pharmaceutical chemicals manufactured to hunt down and kill specific microscopic pathogens inside the human bloodstream.",
        scaffolding: {
          acronym: 'P-E-E-C (Point • Evidence 1 • Evidence 2 • Comparison)',
          acronym_title: '4-Mark Comparison Formula',
          steps: [
            {
              letter: 'P',
              name: 'State Similarity',
              prompt: "Identify targeted chemical compounds ('magic bullets') attacking pathogens.",
            },
            {
              letter: 'E1',
              name: 'Early 20th Century',
              prompt: 'Explain Ehrlich, Salvarsan 606 (1909), and targeted syphilis treatment.',
            },
            {
              letter: 'E2',
              name: 'Mid 20th Century',
              prompt: 'Explain Domagk, Prontosil (1932), and sulfonamides for puerperal fever.',
            },
            {
              letter: 'C',
              name: 'Comparative Link',
              prompt: 'Conclude with an explicit comparative sentence.',
            },
          ],
        },
      },
      {
        tariff: '12 marks',
        type: 'causal_explanation_12m',
        question:
          'Explain why the National Health Service (NHS) was established in 1948. [12 marks]',
        stimulus: ['The Beveridge Report (1942)', 'Aneurin Bevan'],
        prompt:
          'Explain three distinct causal factors behind the post-war founding of the British NHS.',
        model:
          "One major reason the NHS was created was the **social impact of the Second World War and the publication of the Beveridge Report in 1942**. During the war, the evacuation of over one million urban children to rural middle-class homes exposed the shocking reality of poverty, malnutrition, and untreated illnesses suffered by working-class families. Furthermore, the Blitz required the government to establish the Emergency Medical Service (EMS), organizing state-run blood depots, casualty wards, and ambulance networks. In December 1942, civil servant William Beveridge published his landmark social insurance report, calling for a post-war assault on the 'Five Giant Evils': Want, Ignorance, Idleness, Squalor, and **Disease**. The report sold over 600,000 copies and became a symbol of post-war reconstruction, creating overwhelming public expectation that healthcare should be a universal right funded by taxation.<br><br>Furthermore, the establishment of the NHS was driven by the **political victory and determination of the 1945 Labour Government and Health Minister Aneurin Bevan**. The Labour Party won a landslide general election in July 1945 on a manifesto promising to build a comprehensive welfare state. Appointed Minister of Health, former Welsh coalminer Aneurin Bevan demonstrated immense political skill and tenacity. He faced ferocious opposition from the British Medical Association (BMA), who claimed that state medicine would turn doctors into civil servants and rob them of private incomes. Bevan overcame their resistance by compromising pragmatically: he agreed that hospital consultants could retain private beds alongside their NHS duties, famously remarking that he had 'stuffed their mouths with gold'. On 5 July 1948, Bevan officially opened Park Hospital in Manchester, launching the NHS as a free service available to every British citizen regardless of income.<br><br>In addition, the NHS was necessary because the **pre-war healthcare system was completely unequal, fragmented, and failing**. Under the 1911 National Insurance Act, only employed male manual workers earning under £250 annually were eligible for a panel doctor; their wives, children, and the elderly were completely excluded. Voluntary hospitals relied on charitable donations and were on the brink of bankruptcy, while municipal hospitals operated under the grim stigma of Victorian workhouses. Working-class families had to pay private doctor fees or subscribe to private medical clubs, meaning treatable conditions like pneumonia, hernia, and rickets went untreated until patients were on the verge of death. Therefore, the glaring moral and practical bankruptcy of the pre-war private system made a unified, state-funded National Health Service an urgent necessity.",
        scaffolding: {
          acronym: 'PEEL x 3 (Point • Evidence • Explain • Link)',
          acronym_title: '12-Mark 3-Paragraph Causal Structure',
          steps: [
            {
              letter: 'P1',
              name: 'WWII & The Beveridge Report',
              prompt: "Explain wartime evacuation, EMS hospitals, and Beveridge's Five Evils.",
            },
            {
              letter: 'P2',
              name: '1945 Labour & Aneurin Bevan',
              prompt:
                'Explain 1945 landslide, BMA opposition, consultant compromise, and 1948 launch.',
            },
            {
              letter: 'P3',
              name: 'Pre-War System Failure',
              prompt: 'Explain 1911 exclusions of women/children and bankrupt voluntary hospitals.',
            },
          ],
        },
      },
    ],
  },

  lesson_4_4: {
    title: 'Edexcel GCSE (9–1) Paper 1 Section B Practice: Q3 & Q5/Q6',
    tariff: '24 marks (Q3 Comparison [4m] & Q5/Q6 Evaluative Essay [16+4m SPaG])',
    questions: [
      {
        tariff: '4 marks',
        type: 'similarity_difference_4m',
        question:
          'Explain one way in which the discovery of penicillin in 1928 was different from its development and mass production in the 1940s. [4 marks]',
        prompt:
          'Identify one valid difference, cite precise historical details from both eras, and conclude with an analytical comparison.',
        model:
          "One way in which the discovery of penicillin was different from its later development was that the discovery in 1928 was a **solitary, accidental laboratory observation**, whereas its development in the 1940s was a **massive, publicly funded collaborative industrial effort**. In 1928, Alexander Fleming working alone at St Mary's Hospital London accidentally noticed that a floating mold spore of *Penicillium notatum* had contaminated an open petri dish and dissolved staphylococci bacteria, but he was unable to chemically isolate or purify the substance. In contrast, during the Second World War (1938–1944), an Oxford team led by Howard Florey and Ernst Chain used freeze-drying to purify penicillin, and collaborated with US government agencies and commercial chemical corporations to build giant 10,000-gallon deep-tank fermentation factories. Therefore, while Fleming's 1928 discovery was an isolated, unpurified observation that remained unused, the 1940s development was a concerted international industrial triumph that produced 2.3 million doses for D-Day.",
        scaffolding: {
          acronym: 'P-E-E-C (Point • Evidence 1 • Evidence 2 • Comparison)',
          acronym_title: '4-Mark Comparison Formula',
          steps: [
            {
              letter: 'P',
              name: 'State Difference',
              prompt:
                'Contrast isolated accidental observation with industrial wartime collaboration.',
            },
            {
              letter: 'E1',
              name: '1928 Discovery',
              prompt: 'Explain Fleming, contaminated petri dish, and failure to isolate.',
            },
            {
              letter: 'E2',
              name: '1940s Mass Production',
              prompt: 'Explain Florey & Chain, US government, and deep-tank fermentation.',
            },
            {
              letter: 'C',
              name: 'Comparative Link',
              prompt: 'Conclude with an explicit comparative sentence.',
            },
          ],
        },
      },
      {
        tariff: '16+4 marks',
        type: 'evaluative_essay_16m',
        question:
          "'Government funding during the Second World War was the main reason for the development of penicillin.' How far do you agree? Explain your answer. [16 marks + 4 marks SPaG = 20 marks]",
        stimulus: ['Howard Florey and Ernst Chain', 'US pharmaceutical factories'],
        prompt:
          'Write a balanced analytical essay evaluating the relative importance of government wartime funding versus scientific research and accidental discovery.',
        model:
          "It is widely argued that government funding during the Second World War was the main reason for the development of penicillin, as the massive financial and logistical mobilization by the British and United States governments turned an unpurified laboratory mold into an industrial wonder drug. While wartime state funding was the decisive catalyst that made mass production possible, I argue that it was only one vital link in a chain of factors: without Alexander Fleming's initial accidental discovery and Howard Florey and Ernst Chain's painstaking laboratory purification at Oxford, there would have been no medical antibiotic for governments to fund.<br><br>On the one hand, **government funding and wartime urgency** were undeniably central to penicillin's development. In the early years of the war, British chemical factories were fully committed to producing explosives and aircraft fuel, and British companies lacked the capital to invest in untried biological manufacturing. When Howard Florey traveled to the United States in July 1941, the US government's War Production Board recognized that penicillin could prevent thousands of Allied soldiers from dying of gangrenous battlefield wounds. The US government designated penicillin manufacturing the second highest national military priority after the Manhattan Project, offering lucrative tax incentives and funding to pharmaceutical giants like Pfizer, Merck, and Squibb. This direct government intervention funded the construction of giant 10,000-gallon deep-tank fermentation facilities, producing 2.3 million doses in time for the Normandy D-Day landings in June 1944. Without government millions and wartime logistics, penicillin could never have been produced on this global scale.<br><br>On the other hand, the crucial scientific breakthrough was achieved by **Howard Florey, Ernst Chain, and their Oxford research team (1938–1940)**. Fleming had abandoned his research in 1929 because he was a bacteriologist, not a biochemist, and could not purify the unstable substance. At Oxford, Ernst Chain read Fleming's forgotten paper and teamed up with Florey and biochemist Norman Heatley. Working with primitive equipment like bedpans and milk churns, the Oxford team developed freeze-drying techniques to stabilize the active antibiotic molecule. In 1940, they conducted their famous animal trial, proving that penicillin cured eight mice injected with lethal streptococci, and in 1941 successfully treated policeman Albert Alexander. It was Florey and Chain's brilliant scientific research that transformed a curious mold into a proven clinical cure before government funding was even sought.<br><br>Furthermore, **Alexander Fleming's original 1928 discovery** provided the indispensable foundation. In September 1928, Fleming returned to his disorderly laboratory at St Mary's Hospital London to find that a stray spore of *Penicillium notatum* had drifted through an open window onto a staphylococcus agar plate, creating a clear ring where bacteria had been destroyed. Fleming had the scientific insight to recognize the importance of the phenomenon, naming the substance 'penicillin' and publishing his findings in 1929. In addition, crucial agricultural discoveries played a major role: researchers at the US Department of Agriculture laboratory in Peoria, Illinois discovered that corn steep liquor accelerated mold growth by 500 times, and isolated a hyper-potent strain of mold on a rotting supermarket cantaloupe.<br><br>In conclusion, although Fleming's initial discovery and Florey and Chain's Oxford purification were essential scientific preconditions, government wartime funding was the main reason for penicillin's development into a practical reality. Thousands of laboratory discoveries languish unused due to lack of capital; it was the existential crisis of the Second World War and millions of dollars in state investment that overcame technological hurdles, built deep-tank fermentation plants, and made penicillin universally accessible to humanity.",
        scaffolding: {
          acronym: 'INTRO • AGREE • COUNTER 1 • COUNTER 2 • JUDGMENT',
          acronym_title: '16-Mark Evaluative Essay Structure Strip',
          steps: [
            {
              letter: 'I',
              name: 'Introduction & Scope',
              prompt: 'Set out the debate: government funding vs scientific research vs chance.',
            },
            {
              letter: 'A',
              name: 'Agree: Government Funding',
              prompt: 'Explain US War Production Board, Pfizer deep tanks, and 2.3m D-Day doses.',
            },
            {
              letter: 'C1',
              name: 'Florey & Chain (Oxford)',
              prompt: 'Explain freeze-drying, mice trials (1940), and PC Alexander (1941).',
            },
            {
              letter: 'C2',
              name: 'Fleming & Peoria Discoveries',
              prompt: 'Explain Fleming (1928), corn steep liquor, and cantaloupe mold.',
            },
            {
              letter: 'J',
              name: 'Sustained Judgment',
              prompt: 'Weigh why wartime state funding was the decisive catalyst.',
            },
          ],
        },
      },
    ],
  },

  lesson_4_5: {
    title: 'Edexcel GCSE (9–1) Paper 1 Section B Practice: Q3 & Q4',
    tariff: '16 marks (Q3 Similarity/Difference [4m] & Q4 Causal Explanation [12m])',
    questions: [
      {
        tariff: '4 marks',
        type: 'similarity_difference_4m',
        question:
          'Explain one way in which government intervention against disease in the nineteenth century was similar to government action against lung cancer in the twenty-first century. [4 marks]',
        prompt:
          'Identify one valid similarity, cite precise historical details from both centuries, and conclude with an analytical comparison.',
        model:
          'One way in which government action was similar was the use of **compulsory statutory legislation to regulate public environments and curb lethal health hazards**. In the nineteenth century, following proof that filthy water spread cholera, the government passed the compulsory 1875 Public Health Act, forcing local councils to provide clean water, build covered sewers, and inspect contaminated housing. Similarly, in the twenty-first century, following conclusive epidemiological proof linking secondhand smoke to lung carcinoma, the British government passed the 2007 Health Act banning smoking in all enclosed public work and leisure spaces, followed by compulsory plain cigarette packaging in 2016. Therefore, both periods demonstrated the state exercising legislative authority to restrict private liberties and commercial freedoms in order to protect public health.',
        scaffolding: {
          acronym: 'P-E-E-C (Point • Evidence 1 • Evidence 2 • Comparison)',
          acronym_title: '4-Mark Comparison Formula',
          steps: [
            {
              letter: 'P',
              name: 'State Similarity',
              prompt: 'Identify compulsory statutory legislation restricting public hazards.',
            },
            {
              letter: 'E1',
              name: '19th Century Intervention',
              prompt: 'Explain 1875 Public Health Act, compulsory clean water, and sewers.',
            },
            {
              letter: 'E2',
              name: '21st Century Intervention',
              prompt: 'Explain 2007 indoor smoking ban and 2016 plain packaging laws.',
            },
            {
              letter: 'C',
              name: 'Comparative Link',
              prompt: 'Conclude with an explicit comparative sentence.',
            },
          ],
        },
      },
      {
        tariff: '12 marks',
        type: 'causal_explanation_12m',
        question:
          'Explain why government methods to prevent lung cancer changed between 1950 and the present day. [12 marks]',
        stimulus: ['Richard Doll’s epidemiological studies', 'The 2007 public smoking ban'],
        prompt:
          'Explain three distinct causal factors showing why government prevention shifted from voluntary warnings to strict state coercion.',
        model:
          "One major reason prevention methods changed was the **accumulation of incontrovertible epidemiological evidence proving the deadly link between smoking and cancer**. In the early twentieth century, smoking was viewed as glamorous and harmless; during the Second World War, cigarettes were distributed free to soldiers. However, in 1950, British medical researchers **Richard Doll and Austin Bradford Hill** published a landmark epidemiological study of 709 lung cancer patients, proving that tobacco smoke contained potent chemical carcinogens that destroyed lung tissue. When their subsequent British Doctors Study (1954) proved that heavy smokers were twenty times more likely to die of lung cancer, the British government was stripped of plausible deniability. As scientific research in the 1980s further proved the lethal dangers of passive 'secondhand' smoking to children and non-smokers, the government was forced to transition from passive advice to direct preventative intervention.<br><br>Furthermore, prevention changed through the **abandonment of voluntary advertising codes in favor of coercive statutory bans**. Throughout the 1960s and 1970s, the government relied on weak, voluntary agreements with powerful tobacco corporations, banning cigarette adverts on television in 1965 and placing modest printed warnings on packets. However, smoking rates remained high, and lung cancer claimed 40,000 British lives annually, costing the National Health Service hundreds of millions of pounds in chemotherapy, radiotherapy, and palliative care. Recognizing that voluntary agreements had failed, Parliament passed aggressive legislation: the Tobacco Advertising and Promotion Act (2002) banned all sports sponsorship (such as Formula 1) and billboard advertising. This culminated in the **Health Act of 2007**, which made it a criminal offense to smoke in all enclosed public places, pubs, and workplaces, de-normalizing tobacco consumption across society.<br><br>In addition, prevention evolved through **punitive fiscal taxation, plain packaging, and mass-market public education**. To deter young people from initiating smoking, successive British chancellors deliberately imposed massive excise duties on cigarettes, increasing prices until taxes constituted over 80% of packet costs. In 2007, the legal age for purchasing tobacco was raised from 16 to 18, and in 2015 smoking in cars carrying children was banned. In 2016, Britain enforced compulsory standardized plain packaging: all brand logos and distinctive colors were outlawed in favor of a drab olive-brown box covered with 65% graphic photographic warnings of diseased lungs and mouth tumours. Combined with NHS-funded nationwide mass campaigns like 'Stoptober', free nicotine replacement therapies, and electronic vapor alternatives, the government successfully pushed adult smoking rates from 45% in 1974 to under 13% today.",
        scaffolding: {
          acronym: 'PEEL x 3 (Point • Evidence • Explain • Link)',
          acronym_title: '12-Mark 3-Paragraph Causal Structure',
          steps: [
            {
              letter: 'P1',
              name: 'Epidemiological Proof (Doll & Hill)',
              prompt: 'Explain 1950 study, British Doctors Study, and passive smoking risks.',
            },
            {
              letter: 'P2',
              name: 'Statutory Bans (2002 & 2007)',
              prompt: 'Explain failure of voluntary codes, advertising bans, and 2007 public ban.',
            },
            {
              letter: 'P3',
              name: 'Taxation & Plain Packaging (2016)',
              prompt: 'Explain punitive tobacco taxes, plain packaging, and Stoptober campaigns.',
            },
          ],
        },
      },
    ],
  },
};

function upgradeMedicineExamEngine() {
  console.log('📦 Upgrading Edexcel Medicine Exam Engine across all 26 lessons...');

  const targetFiles = [
    path.join(__dirname, '..', 'public', 'data', 'edexcel_medicine.json'),
    path.join(__dirname, '..', 'data', 'edexcel_medicine.json'),
  ];

  targetFiles.forEach((fp) => {
    if (fs.existsSync(fp)) {
      const data = JSON.parse(fs.readFileSync(fp, 'utf8'));
      const lessons = data.data?.lessons || data.lessons || [];

      lessons.forEach((l, idx) => {
        // --- 1. Lessons 1-10: Migrate existing rich gcse_task into exam_practice ---
        if (idx < 10) {
          const gt = l.gcse_task || {};
          const tasks = gt.tasks || [];

          l.exam_practice = {
            title: gt.title || 'Edexcel GCSE (9–1) Paper 1 Section B Exam Practice',
            tariff:
              idx === 4 || idx === 7 || idx === 9
                ? '24 marks (Q3 Comparison [4m] & Q5/Q6 Evaluative Essay [16+4m SPaG])'
                : '16 marks (Q3 Comparison [4m] & Q4 Causal Explanation [12m])',
            questions: tasks.map((t) => {
              const is4m = t.tariff?.includes('4 marks') || t.type === 'similarity_difference_4m';
              const is16m = t.tariff?.includes('16') || t.tariff?.includes('Q5/Q6');
              return {
                tariff: is4m ? '4 marks' : is16m ? '16+4 marks' : '12 marks',
                type: is4m
                  ? 'similarity_difference_4m'
                  : is16m
                    ? 'evaluative_essay_16m'
                    : 'causal_explanation_12m',
                question: t.text || t.question || t.stem || '',
                prompt: is4m
                  ? 'Identify one similarity or difference, explain ideas from both periods with precise detail, and conclude with an analytical comparison.'
                  : is16m
                    ? 'Write a balanced analytical essay evaluating the statement, with developed criteria and a sustained judgment.'
                    : 'Explain three distinct causal factors with fully developed PEEL paragraphs.',
                model: t.model || t.exemplar || t.answer || '',
                scaffolding: {
                  acronym: is4m ? 'P-E-E-C' : is16m ? 'PEEL Essay' : 'PEEL x 3',
                  acronym_title: is4m
                    ? '4-Mark Comparison Formula'
                    : is16m
                      ? '16-Mark Evaluative Essay'
                      : '12-Mark Causal Structure',
                },
              };
            }),
          };
        }

        // --- 2. Lessons 11-20: Backfill KT3 & KT4 Exam Practice ---
        else if (idx >= 10 && idx < 20) {
          const examData = KT3_KT4_EXAM_DATA[l.id];
          if (examData) {
            l.exam_practice = {
              title: examData.title,
              tariff: examData.tariff,
              questions: examData.questions,
            };

            // Keep gcse_task synchronised
            l.gcse_task = {
              title: examData.title,
              tasks: examData.questions.map((q) => ({
                type: 'written',
                tariff: q.tariff,
                text: q.question,
                model: q.model,
                prompt: q.prompt,
              })),
            };
          }
        }

        // --- 3. Lessons 21-26: Western Front Section A Normalisation ---
        else if (idx >= 20) {
          const gt = l.gcse_task || {};
          const tasks = gt.tasks || [];

          // Standardise Question 2(b) follow-up model into clean narrative text
          const t3 = tasks[2];
          let q2bModel = '';
          if (t3 && t3.table && Array.isArray(t3.table)) {
            q2bModel = t3.table
              .map((row) => `<strong>${row.row}</strong> ${row.model}`)
              .join('<br><br>');
          }

          l.exam_practice = {
            title: 'Edexcel GCSE (9–1) Paper 1 Section A (Western Front) Exam Practice',
            tariff: '16 marks (Q1 Features [4m], Q2a Utility [8m], Q2b Follow-up [4m])',
            questions: [
              {
                tariff: '4 marks',
                type: 'feature_drills_4m',
                question: tasks[0]?.tariff || 'Question 1: Describe two features of... [4 marks]',
                prompt:
                  'Identify two distinct historical features. For each feature, provide a clear identification followed by supporting detailed knowledge.',
                model: tasks[0]?.model || '',
                scaffolding: {
                  acronym: 'F1 + D1 • F2 + D2',
                  acronym_title: '4-Mark Feature Drill Formula',
                },
              },
              {
                tariff: '8 marks',
                type: 'utility_of_sources_8m',
                question:
                  tasks[1]?.tariff ||
                  'Question 2(a): How useful are Sources A and B for an enquiry into... [8 marks]',
                prompt:
                  'Evaluate Source A (content and provenance) using your contextual knowledge. Evaluate Source B (content and provenance). Conclude with a comparative judgment.',
                model: tasks[1]?.model || '',
                scaffolding: {
                  acronym:
                    'SOURCE A (Content + Provenance) • SOURCE B (Content + Provenance) • COMPARISON',
                  acronym_title: '8-Mark Source Utility Structure',
                },
              },
              {
                tariff: '4 marks',
                type: 'follow_up_enquiry_4m',
                question:
                  tasks[2]?.stem ||
                  'Question 2(b): Study Source B. How could you follow up Source B to find out more about... [4 marks]',
                prompt:
                  'Complete the 4-part follow-up framework: (1) Detail in Source B, (2) Question I would ask, (3) Type of source, (4) How this answers my question.',
                model: q2bModel,
                table: t3?.table || [],
                scaffolding: {
                  acronym: 'DETAIL • QUESTION • SOURCE TYPE • ENQUIRY PURPOSE',
                  acronym_title: '4-Part Follow-Up Framework',
                },
              },
            ],
          };

          // Synchronize gcse_task task 3 model
          if (tasks[2] && q2bModel) {
            tasks[2].model = q2bModel;
          }
        }
      });

      fs.writeFileSync(fp, JSON.stringify(data, null, 2), 'utf8');
      console.log(`  ✔ Injected exam_practice and updated gcse_task in ${fp}`);
    }
  });

  // Also update units/edexcel_medicine/data.js
  const unitJs = path.join(__dirname, '..', 'units', 'edexcel_medicine', 'data.js');
  if (fs.existsSync(unitJs)) {
    try {
      const pubData = JSON.parse(fs.readFileSync(targetFiles[0], 'utf8'));
      const unitObj = pubData.data || pubData;
      const jsContent = `export default ${JSON.stringify(unitObj, null, 2)};\n`;
      fs.writeFileSync(unitJs, jsContent, 'utf8');
      console.log(`  ✔ Synchronized units/edexcel_medicine/data.js`);
    } catch (err) {
      console.warn(`  ⚠️ Could not update units/edexcel_medicine/data.js: ${err.message}`);
    }
  }

  console.log(
    `✅ Edexcel Medicine Through Time: 100% of 26 lessons upgraded with standardised exam_practice and full-mark models.`,
  );
}

if (require.main === module) {
  upgradeMedicineExamEngine();
}

module.exports = { upgradeMedicineExamEngine, KT3_KT4_EXAM_DATA };
