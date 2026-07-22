const fs = require('fs');
const path = require('path');

async function injectData() {
  const dataPath = path.join(__dirname, '../edexcel_medicine/data.js');
  
  // Use dynamic import
  const { default: unitData } = await import('file:///' + dataPath.replace(/\\/g, '/'));
  
  // 1. Add Global Glossary
  unitData.glossary = [
    { term: "Miasma", definition: "Bad air that was believed to cause disease." },
    { term: "Phlebotomy", definition: "The medical practice of bloodletting." },
    { term: "Apothecary", definition: "A medieval pharmacist or chemist." },
    { term: "Four Humours", definition: "The theory that the body is made of blood, phlegm, yellow bile, and black bile." },
    { term: "Antiseptic", definition: "Chemicals used to kill germs on a wound (e.g. Carbolic Acid)." },
    { term: "Aseptic", definition: "A completely germ-free environment (e.g. modern operating theatres)." },
    { term: "Antibiotic", definition: "A medicine that destroys bacteria (e.g. Penicillin)." },
    { term: "Vaccination", definition: "Injecting a weakened or dead version of a disease to create immunity." },
    { term: "Spontaneous Generation", definition: "The false belief that rotting matter creates maggots and microbes." },
    { term: "Laissez-faire", definition: "A government policy of not interfering in people's lives." }
  ];
  
  // 2. Add Timeline Events
  unitData.lessons.forEach(l => {
    if (l.id === 'lesson_1_3') {
      l.timeline_events = [{ year: "1348", event: "The Black Death arrives in England." }];
    } else if (l.id === 'lesson_2_3') {
      l.timeline_events = [
        { year: "1628", event: "William Harvey discovers the circulation of blood." },
        { year: "1665", event: "The Great Plague hits London." }
      ];
    } else if (l.id === 'lesson_3_1') {
      l.timeline_events = [
        { year: "1861", event: "Pasteur publishes Germ Theory." },
        { year: "1882", event: "Koch identifies the TB bacteria." }
      ];
    } else if (l.id === 'lesson_4_3') {
      l.timeline_events = [
        { year: "1928", event: "Alexander Fleming discovers Penicillin." },
        { year: "1941", event: "Florey and Chain first test Penicillin on a human." }
      ];
    }
  });

  const newDataStr = `const unitData = ${JSON.stringify(unitData, null, 2)};\n\nexport default unitData;`;
  fs.writeFileSync(dataPath, newDataStr);
  console.log("Injected glossary and timeline_events.");
  
  // Append CSS
  const cssPath = path.join(__dirname, '../style.css');
  const cssStr = `
.vocab-word { position: relative; cursor: help; border-bottom: 2px dotted #3b82f6; color: #1e3a8a; font-weight: 600; transition: color 0.3s ease; }
.vocab-word:hover { color: #2563eb; }
.vocab-word::after { content: attr(data-definition); position: absolute; bottom: 120%; left: 50%; transform: translateX(-50%) translateY(10px); width: max-content; max-width: 250px; padding: 8px 12px; background: #1e293b; color: white; font-size: 0.85rem; font-weight: 400; border-radius: 6px; opacity: 0; visibility: hidden; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); z-index: 50; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); pointer-events: none; }
.vocab-word::before { content: ''; position: absolute; bottom: 120%; left: 50%; transform: translateX(-50%) translateY(10px); border: 6px solid transparent; border-top-color: #1e293b; opacity: 0; visibility: hidden; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); z-index: 50; pointer-events: none; }
.vocab-word:hover::after, .vocab-word:hover::before { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); }
  `;
  fs.appendFileSync(cssPath, cssStr);
  console.log("Appended CSS for .vocab-word");
}

injectData().catch(console.error);
