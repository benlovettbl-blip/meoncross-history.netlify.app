const fs = require('fs');
const path = require('path');

async function updateIndividuals() {
  const dataPath = path.resolve(__dirname, '../edexcel_medicine/data.js');
  let fileContent = fs.readFileSync(dataPath, 'utf8');

  const startIndex = fileContent.indexOf('{');
  const endIndex = fileContent.lastIndexOf('}');
  const jsonStr = fileContent.substring(startIndex, endIndex + 1);

  const data = eval('(' + jsonStr + ')');

  const notebookData = {
    "hippocrates": {
      actions: "Created the Theory of the Four Humours (blood, phlegm, yellow bile, and black bile) and authored the Hippocratic Oath. Championed clinical observation, recording symptoms, and treating illnesses using natural therapies like the Theory of Opposites.",
      achievements: "Shifted medicine away from supernatural or religious superstition toward a natural, rational explanation for disease. Established the foundational importance of patient observation and diagnostic note-taking.",
      limitations: "His theories were biologically incorrect. He lacked the technology to prove his ideas or observe microscopic pathogens. Once his writings were dogmatized by the Catholic Church, any attempt to question humoural theory was viewed as heresy, trapping medical progress in a static framework for over a thousand years."
    },
    "bacon": {
      actions: "An English scientist and Franciscan monk who argued that physicians should stop blindly memorizing classical texts (such as Galen's) and instead perform their own direct research, carry out experiments, and observe nature.",
      achievements: "Promoted an early precursor to the empirical scientific method, challenging the scholastic, book-based complacency of medieval medical universities.",
      limitations: "His work was completely suppressed by institutional authority. In 1277, the Church imprisoned him for heresy and challenging traditional authority. Because book production was entirely controlled by monasteries, his experimental ideas were kept from circulating, resulting in zero short-term impact on daily medical care."
    },
    "chadwick": {
      actions: "Researched urban slums and published the landmark 1842 Report on the Sanitary Conditions of the Labouring Population, proving that filthy living conditions caused disease, which trapped the working class in poverty.",
      achievements: "His report served as the direct political catalyst for the passing of the 1848 Public Health Act, which established the first General Board of Health and proved that state-led environmental sanitation could prevent epidemics.",
      limitations: "He was a firm believer in the incorrect miasma theory (foul smells causing disease), meaning he focused on flushing sewage into rivers (contaminating drinking water). His autocratic style and \"nanny state\" bureaucracy generated fierce political and public opposition, leading the government to dissolve the Board of Health in 1854. Crucially, the 1848 Act was permissive (optional), meaning most cities refused to implement it."
    },
    "roentgen": {
      actions: "Discovered X-rays in 1895 by covering a cathode-ray tube with black cardboard, noticing that invisible rays could pass through solid objects and expose photographic plates to show bone structures.",
      achievements: "Created the medical science of radiology. For the first time, doctors could diagnose internal fractures, bone diseases, and embedded foreign objects non-invasively, eliminating the need for exploratory surgery.",
      limitations: "Early X-ray technology was highly primitive and dangerous: exposure times were incredibly long (requiring patients to sit still for up to 90 minutes), the machines were massive and fragile (difficult to move), and they released toxic doses of radiation that caused severe skin burns and hair loss."
    },
    "curie": {
      actions: "Polish-French physicist who realized the urgent military need for radiology on the Western Front; equipped 20 mobile X-ray vans (\"petites Curies\") and trained 150 women to operate them.",
      achievements: "Revolutionized battlefield triage by bringing diagnostic X-ray technology directly to forward Casualty Clearing Stations (CCS), allowing frontline surgeons to rapidly locate shrapnel and bullets before gas gangrene set in.",
      limitations: "Her mobile units were exceptionally fragile, required constant engine power from the vans to run, and struggled to navigate the destroyed, mud-choked terrain of the Ypres Salient or the Somme. Furthermore, a lack of protective shielding meant she and her operators suffered chronic, lethal exposure to radiation."
    },
    "landsteiner": {
      actions: "Discovered blood groups (A, B, and O) in 1901 (with colleagues discovering AB in 1902), proving that donor and recipient blood must be matched to prevent fatal immune reactions.",
      achievements: "Transformed blood transfusions from a highly lethal, outlawed gamble into a safe, scientifically controlled, and routine clinical procedure.",
      limitations: "He did not solve the critical problem of clotting and storage. Because blood clotted immediately outside the body, transfusions still had to be performed directly on a person-to-person basis with both donor and patient present, which was logistically impossible on a chaotic battlefield."
    },
    "hata": {
      actions: "Japanese bacteriologist who joined Paul Ehrlich’s research team in Germany; systematically re-tested hundreds of rejected chemical compounds until finding that compound 606 successfully killed the syphilis spirochete.",
      achievements: "Co-discovered Salvarsan 606 in 1909, the world's very first synthetic chemical \"magic bullet\" designed to target and destroy a specific microorganism inside the living human body.",
      limitations: "Salvarsan 606 was highly toxic because it was arsenic-based; if administered incorrectly, it could easily kill the patient rather than cure them. Additionally, it was extremely difficult to dissolve and inject, and it only cured syphilis, offering no protection against other common bacterial infections."
    },
    "domagk": {
      actions: "Discovered Prontosil in 1932, a sulfonamide compound that successfully killed streptococcal bacteria inside the blood of living mice.",
      achievements: "Developed the second magic bullet and the first commercially available sulfonamide drug, providing a highly effective cure for deadly systemic infections like puerperal fever, pneumonia, and scarlet fever.",
      limitations: "Prontosil was a bacteriostatic sulfonamide, meaning it stopped bacteria from multiplying but did not actively destroy them, relying instead on the patient's own immune system to clear the infection. It was entirely ineffective against deep, necrotic tissue wounds (which were common on the Western Front) and could cause severe kidney damage."
    },
    "watson_crick": {
      actions: "Published the first accurate molecular model of the double-helix structure of DNA in 1953, utilizing X-ray diffraction data and physical cardboard models to solve the genetic puzzle.",
      achievements: "Unlocked the genetic paradigm of modern medicine, explaining how hereditary characteristics are passed down and directly enabling the launch of the Human Genome Project (1990–2003).",
      limitations: "Their discovery was purely theoretical. Understanding the physical structure of DNA did not translate into immediate cures; it took decades of research to link genes to specific diseases like lung cancer, and medical science still lacks the technology to safely and universally edit genetic mutations today."
    },
    "franklin": {
      actions: "Captured Photo 51 (1952), a highly precise X-ray crystallography photograph of crystallized DNA fibers, and calculated the physical dimensions of the helix.",
      achievements: "Provided the essential, mathematical proof of DNA's double-helix structure, which Watson and Crick relied upon to build their successful molecular model.",
      limitations: "Her impact was severely limited by systemic sexism in the 1950s academic community; her data was shared without her permission, and she was denied co-authorship on the initial discovery paper. Because her expertise was strictly in chemical physics, she played no role in translating the discovery of DNA into clinical medical therapies."
    },
    "thomas": {
      actions: "Designed the Thomas splint—a rigid metal leg frame featuring a leather ring at the hip to pull the leg under traction and keep the femur fully immobilized.",
      achievements: "When adopted on the Western Front in 1916, his splint revolutionized the treatment of femur fractures, dropping the mortality rate from compound leg wounds from 80% to under 20% by stopping internal bleeding, bone movement, and shock.",
      limitations: "He designed and used the splint in his civilian practice decades before the First World War, but his work was entirely ignored by the British military and medical establishment during his lifetime due to professional conservatism. It was only the desperate, high-mortality crisis of trench warfare that forced its retrospective, widespread adoption in 1916."
    }
  };

  data.key_individuals.forEach(ind => {
    if (notebookData[ind.id]) {
      ind.actions = notebookData[ind.id].actions;
      ind.achievements = notebookData[ind.id].achievements;
      ind.limitations = notebookData[ind.id].limitations;
    }
  });

  const newJsonStr = JSON.stringify(data, null, 2);
  const newContent = fileContent.substring(0, startIndex) + newJsonStr + fileContent.substring(endIndex + 1);
  
  fs.writeFileSync(dataPath, newContent, 'utf8');
  console.log('Successfully updated the remaining 11 key_individuals!');
}

updateIndividuals();
