const fs = require('fs');

const mocks = [
  {
    id: 'mock_a_2026_predict',
    title: 'Predicted Mock Paper A',
    paper_reference: '1HI0/11',
    total_marks: 52,
    time_minutes: 80,
    section_a: {
      title: 'SECTION A: The British sector of the Western Front, 1914–18: injuries, treatment and the trenches',
      questions: [
        { num: '1 (a)', text: 'Describe one feature of the clinical use and diagnostic limitations of mobile X-ray units near the frontline.', marks: 2, lines: 5 },
        { num: '1 (b)', text: 'Describe one feature of trench fever, including its symptoms, cause, or prevention.', marks: 2, lines: 5 },
        {
          num: '2 (a)',
          text: 'Study Sources A and B in the Sources Booklet.\n\nHow useful are Sources A and B for an enquiry into the physical trauma and preventative treatments associated with German poison gas attacks?\n\nExplain your answer, using Sources A and B and your knowledge of the historical context.',
          marks: 8, lines: 24,
          sources: [
            {
              id: 'Source A',
              provenance: 'A clinical extract from an RAMC medical officer logbook at an Advanced Dressing Station (ADS) near Ypres, May 1915.',
              content: 'The men were brought in stumbling, clutching their throats and gasping violently for air. Their eyes were severely inflamed and streaming with tears. We immediately began washing out the blinded eyes of the chlorine gas casualties using simple bicarbonate of soda solutions. It provides some relief, but the respiratory damage is profound. Many will not survive the night.'
            },
            {
              id: 'Source B',
              provenance: 'An official British Army training illustration published in late 1915.',
              content: '[The source is a diagram depicting a British soldier securing a protective hood over his head. The caption reads: \n\n"CORRECT METHOD OF ADJUSTING THE FLANNEL GAS MASK. Ensure the chemically impregnated pad is positioned securely over the mouth and nose before a gas discharge reaches the trench. The flannel must be tucked tightly into the tunic collar to prevent chlorine seepage."]'
            }
          ]
        },
        {
          num: '2 (b)',
          text: 'Study Source B.\n\nHow could you follow up Source B to find out more about the preventative treatments associated with German poison gas attacks?\n\nIn your answer, you must give the question you would ask and the type of source you could use.\n\nComplete the table below.',
          marks: 4, type: 'follow_up'
        }
      ]
    },
    section_b: {
      title: 'SECTION B: Medicine in Britain, c1250–present',
      questions: [
        { num: '3', text: 'Explain one way in which ideas about the cause of illness in the Medieval period (c1250–c1500) were similar to ideas about the cause of illness in the Renaissance period (c1500–c1700).', marks: 4, lines: 12 },
        { num: '4', text: 'Explain why there was rapid progress in the development and mass production of penicillin in the years c1938–c1945.', marks: 12, lines: 32, bullet_points: ['Howard Florey and Ernst Chain', 'US Government funding and the Second World War'] },
        {
          type: 'either_or',
          instruction: 'Answer EITHER Question 5 OR Question 6.\nSpelling, punctuation, grammar and use of specialist terminology will be assessed in this question.',
          spag_marks: 4, lines: 40,
          q5: { num: '5', text: '‘Edward Jenner’s discovery of the smallpox vaccination was the most significant turning point in the prevention of disease in the period c1700–c1900.’\nHow far do you agree? Explain your answer.', marks: 16, bullet_points: ['Inoculation', 'The 1875 Public Health Act'] },
          q6: { num: '6', text: '‘The discovery of the structure of DNA was the most significant breakthrough in understanding the causes of illness in the period c1900–present.’\nHow far do you agree? Explain your answer.', marks: 16, bullet_points: ['James Watson and Francis Crick', 'Lifestyle factors (e.g., smoking and lung cancer)'] }
        }
      ]
    }
  },
  {
    id: 'mock_b_2026_predict',
    title: 'Predicted Mock Paper B',
    paper_reference: '1HI0/11',
    total_marks: 52,
    time_minutes: 80,
    section_a: {
      title: 'SECTION A: The British sector of the Western Front, 1914–18: injuries, treatment and the trenches',
      questions: [
        { num: '1 (a)', text: 'Describe one feature of the mechanics or medical significance of the Thomas splint on the Western Front.', marks: 2, lines: 5 },
        { num: '1 (b)', text: 'Describe one feature of the design, structure, or defensive layout of a communication trench.', marks: 2, lines: 5 },
        {
          num: '2 (a)',
          text: 'Study Sources A and B in the Sources Booklet.\n\nHow useful are Sources A and B for an enquiry into the prevention and surgical management of deep wound infections on the Western Front?\n\nExplain your answer, using Sources A and B and your knowledge of the historical context.',
          marks: 8, lines: 24,
          sources: [
            {
              id: 'Source A',
              provenance: 'A private diary entry from an RAMC surgeon at a Casualty Clearing Station (CCS) near the Somme, August 1916.',
              content: 'Gas gangrene is claiming too many of our men with deep shrapnel wounds. Today we fully implemented the Carrel-Dakin method of chemical wound irrigation. By inserting rubber tubes directly into the deep tissue, we can flush the wound continuously with a sterilized salt solution. It is labor-intensive and requires the solution to be mixed fresh, but the reduction in severe infections and subsequent amputations is already noticeable.'
            },
            {
              id: 'Source B',
              provenance: 'An official British Army medical directive issued to RAMC units in late 1915.',
              content: 'URGENT: PREVENTATIVE MEASURES FOR TETANUS.\n\nIt is strictly ordered that all stretcher bearers and medical personnel at Regimental Aid Posts must ensure the immediate administration of anti-tetanus serum to any casualty presenting with shrapnel or gunshot wounds. The high concentration of manure in the French soil has led to unacceptable mortality rates from tetanus infection. Immediate injection is mandatory before evacuation down the line.'
            }
          ]
        },
        {
          num: '2 (b)',
          text: 'Study Source B.\n\nHow could you follow up Source B to find out more about the prevention of deep wound infections on the Western Front?\n\nIn your answer, you must give the question you would ask and the type of source you could use.\n\nComplete the table below.',
          marks: 4, type: 'follow_up'
        }
      ]
    },
    section_b: {
      title: 'SECTION B: Medicine in Britain, c1250–present',
      questions: [
        { num: '3', text: 'Explain one way in which care in hospitals in the Medieval period (c1250–c1500) was different from care in hospitals in the Industrial period (c1700–c1900).', marks: 4, lines: 12 },
        { num: '4', text: 'Explain why medical treatments and daily bedside care remained largely stagnant during the Renaissance period (c1500–c1700), despite new scientific and anatomical discoveries.', marks: 12, lines: 32, bullet_points: ["William Harvey's circulation of the blood", 'The continuing influence of the Theory of the Four Humours'] },
        {
          type: 'either_or',
          instruction: 'Answer EITHER Question 5 OR Question 6.\nSpelling, punctuation, grammar and use of specialist terminology will be assessed in this question.',
          spag_marks: 4, lines: 40,
          q5: { num: '5', text: '‘The main reason why medical care and treatment was ineffective during the Medieval period (c1250–c1500) was because medical knowledge was based on Galen’s ideas.’\nHow far do you agree? Explain your answer.', marks: 16, bullet_points: ['The Theory of Opposites', 'Charity hospitals'] },
          q6: { num: '6', text: '‘The creation of the National Health Service (NHS) in 1948 was the most significant development in care and treatment in the period c1900–present.’\nHow far do you agree? Explain your answer.', marks: 16, bullet_points: ['High-tech surgery in hospitals', 'Magic bullets and chemical cures'] }
        }
      ]
    }
  },
  {
    id: 'mock_c_2026_predict',
    title: 'Predicted Mock Paper C',
    paper_reference: '1HI0/11',
    total_marks: 52,
    time_minutes: 80,
    section_a: {
      title: 'SECTION A: The British sector of the Western Front, 1914–18: injuries, treatment and the trenches',
      questions: [
        { num: '1 (a)', text: 'Describe one feature of the work and medical duties of volunteer nurses like the First Aid Nursing Yeomanry (FANY) on the Western Front.', marks: 2, lines: 5 },
        { num: '1 (b)', text: 'Describe one feature of the medical facilities and rapid emergency treatment provided at a Regimental Aid Post (RAP).', marks: 2, lines: 5 },
        {
          num: '2 (a)',
          text: 'Study Sources A and B in the Sources Booklet.\n\nHow useful are Sources A and B for an enquiry into the development of techniques for blood transfusion and frontline storage?\n\nExplain your answer, using Sources A and B and your knowledge of the historical context.',
          marks: 8, lines: 24,
          sources: [
            {
              id: 'Source A',
              provenance: 'A clinical report from Captain Oswald Hope Robertson describing the establishment of the first "blood depot" during the Battle of Cambrai in 1917.',
              content: 'To prepare for the anticipated casualties, we successfully established a forward blood depot. I collected 22 units of type O blood in advance. By adding sodium citrate, we prevented the blood from clotting, allowing it to be stored in sterilized glass jars for up to four weeks. During the offensive, we successfully transfused 20 severely wounded Canadian soldiers who were suffering from extreme shock.'
            },
            {
              id: 'Source B',
              provenance: 'A photograph published in a British medical journal in 1918, showing supplies arriving at a Casualty Clearing Station.',
              content: '[The source is a photograph showing medical orderlies unloading a specialized, insulated ammunition box from an ambulance. Inside the box are several glass bottles packed with ice and sawdust, designed to keep stored citrated blood refrigerated near the front lines before it was needed for emergency transfusions.]'
            }
          ]
        },
        {
          num: '2 (b)',
          text: 'Study Source B.\n\nHow could you follow up Source B to find out more about the techniques for frontline blood storage?\n\nIn your answer, you must give the question you would ask and the type of source you could use.\n\nComplete the table below.',
          marks: 4, type: 'follow_up'
        }
      ]
    },
    section_b: {
      title: 'SECTION B: Medicine in Britain, c1250–present',
      questions: [
        { num: '3', text: 'Explain one way in which the methods used to prevent the spread of the Great Plague in London (1665) were similar to the methods used to prevent the spread of the Black Death (1348).', marks: 4, lines: 12 },
        { num: '4', text: 'Explain why there was rapid progress in public health and the prevention of disease in the modern era (c1900–present).', marks: 12, lines: 32, bullet_points: ['Government lifestyle campaigns', 'Mass vaccination programs'] },
        {
          type: 'either_or',
          instruction: 'Answer EITHER Question 5 OR Question 6.\nSpelling, punctuation, grammar and use of specialist terminology will be assessed in this question.',
          spag_marks: 4, lines: 40,
          q5: { num: '5', text: '‘In the years c1250–c1500, the university-trained physician was the most important person providing care and treatment.’\nHow far do you agree? Explain your answer.', marks: 16, bullet_points: ['Academic medical training', 'Traditional herbal remedies'] },
          q6: { num: '6', text: "‘The publication of Louis Pasteur's Germ Theory was the biggest turning point in understanding the causes of disease in the period c1800–present.’\nHow far do you agree? Explain your answer.", marks: 16, bullet_points: ['Germ Theory, 1861', 'James Watson and Francis Crick mapping DNA'] }
        }
      ]
    }
  }
];

let content = fs.readFileSync('edexcel_medicine/mock_exams.js', 'utf8');
content = content.trim().replace(/\];$/, '');
for (const m of mocks) {
  content += ',\n  ' + JSON.stringify(m, null, 2);
}
content += '\n];\n';
fs.writeFileSync('edexcel_medicine/mock_exams.js', content);
console.log('Appended A, B, C mocks.');
