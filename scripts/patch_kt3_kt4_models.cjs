const fs = require('fs');

const kt3_kt4_models = {
  lesson_3_1: [
    "One major reason for rapid progress was Louis Pasteur's publication of Germ Theory in 1861. Before Pasteur, most people still believed in spontaneous generation (the idea that rotting matter created microbes) and miasma (bad smells). Pasteur conducted experiments using swan-necked flasks, boiling broth to show that liquids only turned sour when microbes from the air contaminated them, disproving spontaneous generation. In 1861, he published Germ Theory, proving that microscopic organisms in the air caused decay and illness. This was a vital breakthrough because it provided the first scientific foundation showing that living germs caused disease rather than bad air. Therefore, Pasteur drove rapid progress because his Germ Theory gave doctors a scientific biological explanation for the causes of disease.",
    "Another crucial reason was Robert Koch's development of new laboratory methods to identify specific bacteria. Building on Pasteur’s work, German doctor Robert Koch developed groundbreaking laboratory techniques, including using solid agar jelly to culture pure bacteria and industrial methyl violet dyes to stain them under high-powered microscopes. In 1882, Koch discovered the specific bacterium that caused tuberculosis, and in 1883 he identified the cholera bacterium. This advanced medical understanding because doctors no longer just knew that germs existed; they could now identify the exact microscopic organism responsible for each killer disease. Therefore, Koch caused rapid progress because his scientific methods allowed doctors to pinpoint and prove the specific bacteria causing deadly epidemics.",
    "Finally, rapid progress occurred because intense scientific competition and government funding overcame initial medical resistance. In Britain, older conservative doctors initially rejected Germ Theory, but fierce national rivalry between France (Pasteur) and Germany (Koch) meant both governments gave their scientists state-of-the-art laboratories and research teams. Koch's discoveries were quickly translated and published across Europe, convincing young British doctors like Joseph Lister and British authorities to abandon miasma theory completely by the 1880s. This international competition and financial backing ensured that bacteriological discoveries spread quickly into medical practice. Therefore, government funding and scientific competition drove rapid progress because they ensured new discoveries were quickly accepted and adopted across modern medicine.",
  ].join('<br><br>'),

  lesson_3_2: [
    "On the one hand, Jenner’s development of the smallpox vaccine in 1796 was a major breakthrough because it provided the first safe and reliable method to prevent a deadly epidemic disease. Before Jenner, the only prevention was inoculation, which involved scratching live smallpox scabs into a healthy person. This was dangerous because it could cause full-blown smallpox and trigger new outbreaks. Jenner noticed that milkmaids who caught harmless cowpox never caught smallpox. In 1796, he tested this on James Phipps, proving that cowpox gave immunity against smallpox without risking the patient's life. Parliament recognised this breakthrough by awarding Jenner £30,000, banning dangerous inoculation in 1840, and making vaccination compulsory in 1852. Therefore, Jenner was a significant breakthrough because his vaccine proved that doctors could safely immunise patients against a deadly killer disease.",
    'However, Jenner’s vaccine had major limitations and did not immediately change prevention for other diseases. Jenner published his research in 1798, but he could not explain *why* cowpox protected against smallpox because germs had not yet been discovered. As a result, many doctors opposed vaccination, anti-vaccine cartoons showed people turning into cows, and the Royal Society refused to print his paper. More importantly, because Jenner did not understand bacteria or viruses, his vaccine was a one-off discovery that could not be used to prevent other major nineteenth-century killers like cholera, typhus, or tuberculosis. Therefore, Jenner’s breakthrough was limited because it was an isolated discovery that could not be used to prevent other widespread epidemic diseases.',
    "In comparison, the compulsory 1875 Public Health Act was a far more significant breakthrough because it tackled the environmental causes of disease for the whole population. Following Edwin Chadwick's sanitation reports, John Snow's 1854 discovery that cholera was water-borne, and Pasteur's 1861 Germ Theory, the British government abandoned its laissez-faire (leave alone) attitude. The 1875 Act made public health compulsory: all local town councils were legally forced to provide clean piped water, build underground sewers, collect household rubbish, and appoint full-time medical officers. This massive government action tackled the root environmental causes of deadly water-borne epidemics like cholera and typhoid, saving far more lives across the entire working-class population than a single vaccine could. Therefore, the 1875 Public Health Act was a more significant breakthrough because it used the legal power of the state to eliminate dirty water and sewage, saving millions from multiple epidemic diseases.",
    "In conclusion, I disagree that Jenner's smallpox vaccine was the most significant breakthrough in disease prevention. While Jenner founded the principle of vaccination, his work was an isolated success that could not be applied to other killers until Pasteur developed Germ Theory almost a century later. The most significant breakthrough was the compulsory 1875 Public Health Act, because it forced councils to clean up water and waste, protecting the entire nation from lethal water-borne epidemics. Therefore, government public health reform was more significant than Jenner's vaccine because compulsory sanitation permanently eliminated the filth and bad water that caused widespread killer diseases.",
  ].join('<br><br>'),

  lesson_3_3: [
    "One major reason hospital care and nursing improved was Florence Nightingale's work during the Crimean War (1854–1856). When Nightingale arrived at Scutari Barrack Hospital in 1854, she found wounded soldiers lying in filthy uniforms on beds above blocked sewers, with dirt, lice, and gangrene causing a 42% death rate. Nightingale introduced strict hygiene routines: scrubbing wards with boiling water, providing clean linen and bandages, improving ventilation, and serving nutritious food. When the government Sanitary Commission flushed the sewers, the death rate dropped to just 2%. Nightingale proved to the government and the public that high hospital death rates were caused by filth and poor nursing rather than being unavoidable. Therefore, Nightingale improved hospital care because her work in the Crimea proved that clean wards and strict hygiene directly saved patients' lives.",
    "Another reason for improvement was the redesign of hospital buildings using Nightingale's 'pavilion plan'. In her books *Notes on Nursing* (1859) and *Notes on Hospitals* (1863), Nightingale used statistics to show that dark, cramped hospital wards trapped foul air and spread disease. She advocated the pavilion plan, where hospitals were built with separate wings (pavilions) connected by airy corridors. Each ward had high ceilings, large windows on opposite sides for continuous cross-ventilation, wipeable tiled walls, and beds placed at least eight feet apart. Hospitals like St Thomas’ Hospital in London were rebuilt to this design in 1871, stopping infections from passing from bed to bed. Therefore, the pavilion plan improved hospital standards because modern hospital design physically prevented the build-up and spread of deadly infections between patients.",
    "Finally, nursing improved dramatically because it was transformed from low-status domestic work into a respected, trained profession. Before the 1860s, nurses were often untrained, illiterate, and stereotyped as drunken and uncaring like Charles Dickens' fictional character Mrs Gamp. In 1860, Nightingale set up the Nightingale School for Nurses at St Thomas' Hospital using £44,000 of public donations. Student nurses underwent rigorous training in hygiene, anatomy, and patient care, and were held to strict moral and professional standards. Matrons trained at the school were sent out to run hospitals across Britain and the Empire. Therefore, the standard of nursing improved because formal training turned nursing into a skilled, disciplined profession that ensured high standards of patient care.",
  ].join('<br><br>'),

  lesson_3_4: [
    'One major reason surgery became safer was the discovery of effective anaesthetics to conquer pain. Before the 1840s, patients were fully conscious during operations, held down by assistants while screaming in agony. Surgeons like Robert Liston had to operate in seconds, but many patients still died from cardiovascular shock. In 1847, James Young Simpson discovered that inhaling chloroform vapor quickly put patients into a deep, pain-free sleep. Although its use faced early opposition after the overdose death of Hannah Greener in 1848, Queen Victoria used chloroform during childbirth in 1853, making it widely accepted. This allowed surgeons to take their time to perform careful, precise surgery, greatly reducing fatal surgical shock. Therefore, anaesthetics made surgery safer because chloroform stopped patients from dying of shock and allowed surgeons to operate with precision.',
    "Another crucial reason surgery became safer was Joseph Lister’s development of antiseptic surgery to stop wound infection. Although anaesthetics stopped pain, they initially caused surgery's 'Black Period' because doctors attempted longer, deeper operations with dirty hands and unwashed coats, causing gangrene and sepsis to soar. In 1865, Lister applied Pasteur's Germ Theory to surgery, realising that germs in the air caused open wounds to rot. Lister used carbolic acid to soak bandages, wash surgical instruments, and spray the operating theatre. At Glasgow Royal Infirmary, Lister’s carbolic system reduced the death rate from amputations from 46% to 15%. This destroyed the invisible bacteria that caused fatal post-operative infections, removing the biggest killer of surgical patients. Therefore, Lister made surgery significantly safer because carbolic acid prevented fatal bacterial infections from entering surgical wounds.",
    "Finally, surgery became safer because surgeons moved from antiseptic methods to complete aseptic surgery in the late nineteenth century. Surgeons found that carbolic acid cracked their hands and irritated patients' lungs, so by the late 1880s they shifted from killing germs in the wound to preventing germs from entering the room at all. In 1881, Charles Chamberland invented the steam autoclave, which sterilised surgical instruments and dressings with high-pressure boiling steam. By the 1890s, surgical teams scrubbed their hands, wore clean boiled cotton gowns, rubber gloves, and face masks, and operated in scrubbed, tiled operating theatres. This eliminated hospital gangrene and surgical infection. Therefore, aseptic techniques made surgery safer because sterilising equipment and operating theatres prevented bacteria from ever touching the patient.",
  ].join('<br><br>'),

  lesson_3_5: [
    "On the one hand, I agree that John Snow was a major reason for improvements in public health because he proved that cholera was a water-borne disease rather than airborne miasma. During the terrifying 1854 cholera outbreak in Soho, London, Snow carried out a door-to-door investigation, marking every cholera death as a black bar on a street map. The deaths clustered heavily around the Broad Street water pump, while workers at the nearby Lion Brewery survived because they drank beer instead of pump water. Furthermore, in his 'Grand Experiment', Snow showed that households drinking sewage-polluted water from the Southwark and Vauxhall company died at fourteen times the rate of those drinking clean water from the Lambeth company. Snow persuaded the local council to remove the Broad Street pump handle, ending the local outbreak. Therefore, John Snow was a vital reason for public health improvement because his investigation proved that clean drinking water was essential to stop deadly cholera epidemics.",
    "However, John Snow was not the main reason because his discoveries were initially rejected and took decades to be put into practice. In 1855, the General Board of Health officially rejected Snow’s report, obstinately clinging to the old belief in miasma. Snow died in 1858 without his water-borne theory being officially accepted, which only happened after Pasteur’s 1861 Germ Theory and Robert Koch’s isolation of the cholera bacterium in 1883. Furthermore, London’s underground sewer network was built not because of Snow’s research, but because of the 'Great Stink' of July 1858. When a summer heatwave made the sewage-filled River Thames smell unbearable right outside Parliament, MPs panicked and immediately funded Joseph Bazalgette’s 1,100 miles of intercepting sewers to get rid of the smell. Therefore, Snow was not the main reason because the government ignored his scientific proof and only built modern sewers when the Great Stink threatened Parliament itself.",
    "In comparison, the main reason for nationwide public health improvements was the passage of the compulsory 1875 Public Health Act. Edwin Chadwick’s earlier 1848 Public Health Act had failed to improve health across Britain because it was voluntary, and tight-fisted local councils refused to spend taxpayers' money on drainage. However, following the 1867 Reform Act which gave working-class men the vote, politicians had to promise better living conditions. The 1875 Public Health Act made sanitation strictly compulsory: every town council was legally forced to provide clean drinking water, build underground sewers, collect domestic rubbish, inspect food in shops, and employ a full-time Medical Officer of Health. This permanently wiped out cholera and typhoid across the entire country. Therefore, the 1875 Public Health Act was the main reason for improvements because compulsory government legislation forced every town to build clean water and sewer systems.",
    'In conclusion, while John Snow was a brilliant pioneer who proved cholera was water-borne, he was not the main reason for public health improvements. Snow’s findings were rejected at the time and could not force councils to take action on their own. The main reason for nationwide progress was the compulsory 1875 Public Health Act, because it used the full legal power of the state to force local authorities to clean up dirty water and sewage. Therefore, the 1875 Public Health Act was the most important factor because compulsory government legislation physically transformed living conditions and stopped water-borne diseases nationwide.',
  ].join('<br><br>'),

  lesson_4_1: [
    "One major reason the discovery of DNA was a significant turning point was that it revealed the chemical code of life inside human cells. Before 1953, scientists knew that traits could be inherited from parents, but they had no idea how this happened or what caused genetic disorders. In 1952, Rosalind Franklin used X-ray crystallography to take 'Photograph 51', which clearly showed the double helix shape of DNA. Using her data, James Watson and Francis Crick built the first accurate double-helix model of DNA in 1953. This was a revolutionary turning point because for the first time, scientists understood that genes carry chemical instructions that determine human health, allowing doctors to identify genetic mutations that cause hereditary illnesses like cystic fibrosis and Down's syndrome. Therefore, the discovery of DNA was a major turning point because it revealed the biological code that explained the genetic causes of inherited diseases.",
    "Another reason the discovery of DNA was a turning point was that it led directly to the mapping of the entire human genome. Following Watson and Crick's breakthrough, international scientists launched the Human Genome Project in 1990, completing the full map of human DNA in 2003. This allowed scientists to identify every single human gene and locate the exact faulty genes responsible for diseases such as Huntington's disease, sickle-cell anaemia, and certain hereditary breast cancers (such as the BRCA1 gene). This transformed medical understanding because doctors could now screen healthy people to detect genetic risks before any symptoms appeared, shifting medicine from reacting to illness to predicting genetic disease. Therefore, DNA was a significant turning point because mapping the genome allowed doctors to pinpoint the exact faulty genes that cause specific inherited illnesses.",
    'Finally, discovering DNA transformed understanding because it enabled the development of targeted, personalised medical treatments. Before DNA was understood, treatments for disease were general and one-size-fits-all. Today, understanding DNA has led to gene therapies and pharmacogenomics, where doctors tailor treatments to an individual patient’s unique genetic profile. For example, doctors now use targeted cancer therapies that attack specific mutated cancer genes without harming healthy cells, and genetic screening helps families make informed choices before pregnancy. This marked a fundamental shift in medical history because doctors moved away from treating external symptoms to repairing or modifying the root genetic causes of disease inside human cells. Therefore, the discovery of DNA was a turning point because it enabled doctors to develop targeted treatments based on a patient’s specific genetic profile.',
  ].join('<br><br>'),

  lesson_4_2: [
    "One major reason for rapid progress in diagnosis was the invention of advanced medical imaging technology. In 1895, Wilhelm Röntgen discovered X-rays, which allowed doctors to see broken bones and dense objects inside the body without surgery. This technology developed rapidly during the First World War with mobile X-ray vans locating shrapnel in wounded soldiers. Progress accelerated further in 1971 when British engineer Godfrey Hounsfield invented the CT scanner, which combined X-ray beams with computers to produce 3D cross-section images of internal organs and brain tissue. This caused rapid progress because doctors no longer had to perform dangerous, invasive exploratory surgery or guess a patient's condition from external symptoms; they could look directly inside living patients safely and accurately. Therefore, medical imaging caused rapid progress in diagnosis because X-rays and CT scans allowed doctors to see internal damage without performing invasive surgery.",
    'Another reason for rapid progress was the development of scientific blood tests and biochemical analysis. In 1901, Karl Landsteiner discovered the main human blood groups (A, B, AB, and O), which made blood matching and blood testing possible. Throughout the twentieth century, laboratory techniques advanced to test blood samples for blood sugar levels (to diagnose diabetes), hormone imbalances, and cholesterol levels. Modern laboratory machines can now run dozens of automated blood tests in minutes, checking liver and kidney function and detecting microscopic cancer markers. This advanced diagnostic accuracy because doctors could identify serious chronic illnesses from chemical imbalances in the blood long before physical symptoms became dangerous. Therefore, blood testing drove rapid diagnostic progress because chemical analysis allowed doctors to accurately identify diseases before severe symptoms appeared.',
    'Finally, rapid progress was driven by digital technology and modern genetic testing. In the second half of the twentieth century, machines like the MRI scanner (using magnetic fields and radio waves) and ultrasound (using sound waves to check unborn babies) made internal diagnosis even safer by avoiding radiation. Furthermore, digital electronic monitors such as ECG machines allow continuous tracking of heart rhythms, and modern genetic screening can detect faulty genes in DNA that cause hereditary conditions. These technologies made diagnosis faster, safer, and far more comprehensive, allowing medical teams to monitor patient vital signs in real time and detect diseases at a microscopic genetic level. Therefore, digital monitors and genetic screening caused rapid progress because they provided safe, immediate, and microscopic diagnostic information for doctors.',
  ].join('<br><br>'),

  lesson_4_3: [
    'One major reason the NHS was established was the widespread inequality and failure of the pre-war healthcare system. Before 1948, healthcare in Britain was a patchwork that left millions without care. Lloyd George’s 1911 National Insurance Act only covered working men, leaving their wives and children without free medical treatment. If poor families fell ill, they had to rely on underfunded voluntary hospitals or pay private doctor fees they could not afford, forcing many people to delay treatment until it was too late or fall into terrible debt. This created huge public demand for reform because ordinary working-class families felt it was deeply unjust that good healthcare depended on personal wealth rather than medical need. Therefore, the NHS was established because pre-war healthcare was unequal and left millions of women and children without affordable medical treatment.',
    "Another crucial reason was the shared sacrifice of the Second World War and the publication of the 1942 Beveridge Report. During the war, the government set up the Emergency Medical Service (EMS) to treat civilian air-raid casualties, proving that a state-run, national healthcare system could work effectively. In 1942, William Beveridge published his famous report calling for a comprehensive welfare state to fight five 'Giant Evils', including 'Disease'. The report sold over 600,000 copies, and the shared trauma of the Blitz made people demand a better, fairer society in return for their wartime sacrifices, leading to Labour's landslide election victory in 1945. This was decisive because the war broke down traditional social barriers and created an overwhelming national consensus that every citizen deserved healthcare free at the point of delivery. Therefore, the Second World War led to the NHS because shared wartime sacrifices convinced both the public and politicians that a national health service was essential for a fair society.",
    "Finally, the NHS was established because Minister of Health Aneurin Bevan was determined to overcome fierce medical opposition. Although the public supported the NHS, the British Medical Association (BMA), led by Charles Hill, strongly opposed it. Doctors feared they would become low-paid civil servants and lose their private fees, with 90% of BMA doctors voting against joining the NHS in early 1948. Bevan skillfully compromised by allowing hospital consultants to continue treating private patients alongside NHS patients, famously saying he 'stuffed their mouths with gold'. Bevan's political skill and determination ensured that the legislation passed and doctors agreed to join, allowing the NHS to launch successfully on 5 July 1948. Therefore, the NHS was established because Aneurin Bevan successfully compromised with doctors to overcome medical opposition and launch the service.",
  ].join('<br><br>'),

  lesson_4_4: [
    'One major reason penicillin was successfully mass-produced was the scientific work of the Oxford research team. Alexander Fleming had discovered penicillin mould in 1928, but he could not extract enough pure penicillin to treat humans and abandoned his research in 1929. In 1938, Howard Florey and Ernst Chain read Fleming’s paper and assembled a team of scientists at Oxford University. Biologist Norman Heatley devised improvised equipment—such as hospital bedpans and milk churns—to grow the mould. In 1940, they proved penicillin cured eight infected mice, and in 1941 they successfully treated policeman Albert Alexander, proving penicillin killed deadly bacterial infections in humans. This scientific breakthrough was vital because the Oxford team proved penicillin was an effective, lifesaving antibiotic, providing the scientific justification needed for mass production. Therefore, penicillin was mass-produced because the Oxford team proved it could successfully cure fatal bacterial infections in living patients.',
    "Another critical reason was the urgent pressure of the Second World War. As the war intensified, thousands of wounded British and Allied soldiers were dying from infected bullet and shrapnel wounds (such as gas gangrene and sepsis). Both the British and American governments realised that finding an effective antibiotic would save hundreds of thousands of soldiers' lives and help win the war. Because British factories were busy manufacturing munitions and could not produce penicillin at scale, Florey and Heatley travelled to the United States in July 1941 to seek industrial help. The war acted as an enormous accelerator because military survival meant money was no object, prompting governments to treat penicillin production as a top wartime priority. Therefore, the Second World War drove mass production because military commanders urgently needed an antibiotic to save wounded soldiers from fatal wound infections.",
    'Finally, mass production succeeded because of the massive financial and industrial power of the United States. When the United States entered the war in December 1941, the US War Production Board gave pharmaceutical companies like Pfizer interest-free loans and tax breaks to manufacture penicillin. American scientists discovered a more productive strain of mould on a Peoria cantaloupe melon and found that growing it in corn-steep liquor increased yields a thousand-fold. American companies built giant 10,000-gallon deep-tank fermentation vats, producing 2.3 million doses in time for the D-Day landings in June 1944. This industrial investment transformed penicillin from a tiny laboratory experiment into a mass-manufactured medicine available in huge quantities. Therefore, penicillin was mass-produced because American industrial investment and deep-tank fermentation allowed millions of doses to be manufactured quickly.',
  ].join('<br><br>'),

  lesson_4_5: [
    "One major reason government action on public health changed was the emergence of conclusive scientific evidence linking lifestyle choices to killer diseases. Before 1950, governments focused on environmental sanitation like clean water and sewers, rather than personal health. However, in 1950, British researchers Richard Doll and Austin Bradford Hill published a landmark study in the British Medical Journal proving that smoking cigarettes was the direct cause of the massive rise in lung cancer cases. Further studies in the 1960s confirmed the link, and in the 1970s and 1980s, medical research proved the deadly dangers of passive smoking (breathing in other people's smoke). This scientific proof forced the government to abandon its traditional hands-off approach, because it could no longer ignore the medical evidence that smoking was killing hundreds of thousands of citizens. Therefore, government public health action changed because scientific evidence proved that smoking caused fatal diseases like lung cancer.",
    "Another crucial reason government action changed was the need to protect the National Health Service from soaring treatment costs. Following the creation of the NHS in 1948, the government became directly responsible for funding the nation's healthcare. By the late twentieth century, treating preventable lifestyle diseases—such as smoking-related cancers, heart disease, obesity, and alcohol abuse—was costing the NHS billions of pounds every year. Politicians realised that treating sick patients in hospitals was far more expensive than preventing illness through public health education and legal restrictions. This financial pressure prompted ministers to shift health policy from simply providing hospital beds to proactively stopping people from getting sick in the first place. Therefore, government action changed because preventing lifestyle diseases was essential to reduce the massive financial burden on the NHS.",
    "Finally, government action changed because ministers moved from voluntary health warnings to strict legal compulsion. Initially, the government relied on gentle advice, placing health warnings on cigarette packets in 1971 and banning cigarette adverts on television. However, because smoking rates remained high, Parliament passed the Health Act 2007, making smoking illegal in all enclosed public places and workplaces. This was followed by increasing taxes on tobacco, banning smoking in cars carrying children in 2015, and enforcing plain, unbranded packaging in 2016. Similar laws were passed to protect public health, such as making car seatbelts compulsory in 1983 and introducing a Soft Drinks Industry Levy (sugar tax) in 2018. This represented a complete change in government philosophy, as politicians accepted that the state had a duty to pass compulsory laws to protect citizens' health. Therefore, government action changed because ministers used legal bans and taxation to directly stop harmful lifestyle habits and protect the public.",
  ].join('<br><br>'),
};

function patchFile(filePath) {
  console.log('Patching:', filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  let lines = content.split('\n');

  for (const [lessonId, newModel] of Object.entries(kt3_kt4_models)) {
    let lessonLineIdx = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("id: '" + lessonId + "'")) {
        lessonLineIdx = i;
        break;
      }
    }
    if (lessonLineIdx === -1) {
      console.error('Could not find lesson:', lessonId);
      continue;
    }

    // Find gcse_task in this lesson
    let gcseTaskIdx = -1;
    for (let i = lessonLineIdx; i < Math.min(lines.length, lessonLineIdx + 500); i++) {
      if (lines[i].includes('gcse_task:')) {
        gcseTaskIdx = i;
        break;
      }
    }
    if (gcseTaskIdx === -1) {
      console.error('Could not find gcse_task in lesson:', lessonId);
      continue;
    }

    // For KT3 (lesson_3_1 to lesson_3_5), model_answer already exists
    if (lessonId.startsWith('lesson_3_')) {
      let modelLineIdx = -1;
      for (let i = gcseTaskIdx; i < Math.min(lines.length, gcseTaskIdx + 50); i++) {
        if (lines[i].includes('model_answer:')) {
          modelLineIdx = i;
          break;
        }
      }
      if (modelLineIdx === -1) {
        console.error('Could not find model_answer in KT3 lesson:', lessonId);
        continue;
      }
      // Replace the next line (which contains the string)
      lines[modelLineIdx + 1] = '          ' + JSON.stringify(newModel) + ',';
      console.log('Successfully updated model_answer for', lessonId, 'at line', modelLineIdx + 2);
    } else {
      // For KT4 (lesson_4_1 to lesson_4_5), insert model_answer before closing bracket of gcse_task
      // Find the closing bracket of gcse_task
      let closeIdx = -1;
      for (let i = gcseTaskIdx + 1; i < Math.min(lines.length, gcseTaskIdx + 50); i++) {
        if (lines[i].trim() === '},') {
          closeIdx = i;
          break;
        }
      }
      if (closeIdx === -1) {
        console.error('Could not find closing bracket of gcse_task in KT4 lesson:', lessonId);
        continue;
      }

      // Check if model_answer already exists
      let existingModelIdx = -1;
      for (let i = gcseTaskIdx; i < closeIdx; i++) {
        if (lines[i].includes('model_answer:')) {
          existingModelIdx = i;
          break;
        }
      }

      if (existingModelIdx !== -1) {
        lines[existingModelIdx + 1] = '          ' + JSON.stringify(newModel) + ',';
        console.log(
          'Successfully updated existing model_answer for',
          lessonId,
          'at line',
          existingModelIdx + 2,
        );
      } else {
        // Insert model_answer before closeIdx
        const indent = '        ';
        const newLines = [indent + 'model_answer:', indent + '  ' + JSON.stringify(newModel) + ','];
        lines.splice(closeIdx, 0, ...newLines);
        console.log(
          'Successfully inserted new model_answer for',
          lessonId,
          'at line',
          closeIdx + 1,
        );
      }
    }
  }

  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  console.log('Finished patching:', filePath);
}

patchFile('units/edexcel_medicine/data.js');
patchFile('public/units/edexcel_medicine/data.js');
