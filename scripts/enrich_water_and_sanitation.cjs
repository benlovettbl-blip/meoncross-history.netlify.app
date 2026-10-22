const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const rootDir = path.resolve(__dirname, '..');
const dataJsPath = path.join(rootDir, 'units', 'water_and_sanitation', 'data.js');
const pubJsonPath = path.join(rootDir, 'public', 'data', 'water_and_sanitation.json');
const dbPath = path.join(rootDir, 'public', 'database.json');

const WATER_PEDAGOGY = {
  // LESSON 1: How much progress did the Romans make in public health?
  lesson_1: [
    {
      match: /Fishbourne Roman Palace|Lead Water Pipes/i,
      hinge_question:
        'Does the luxury lead piping at Fishbourne Palace prove Romans understood the link between clean water and health, or that hydraulic technology was an imperial luxury reserved for the ruling elite?',
      discussion_ideas: [
        'Empirical Recognition of Clean Water and Military Sanitation: Roman military engineers and writers (such as Vitruvius and Frontinus) recognized through observation that troops and citizens drinking fresh, flowing spring water from high aqueducts suffered far fewer gastrointestinal fevers than those drinking stagnant swamp water, driving massive imperial investment in gravity-fed water mains and stone reservoirs across Roman Britain.',
        'An Exclusive Instrument of Imperial Prestige and Elite Luxury: Pressurized lead piping (fistulae) and heated private baths were astronomically expensive, installed almost exclusively in palatial villas (like Fishbourne) and urban aristocratic mansions; the vast majority of ordinary rural Britons and urban slaves continued to fetch untreated water from open ditches and rivers, showing hydraulic engineering was primarily a display of Roman imperial wealth and Romanization rather than a universal public health system.',
      ],
    },
    {
      match: /Thermae|Roman Public Bathhouse/i,
      hinge_question:
        'Does this sophisticated hypocaust heating system show that Roman bathhouses were built primarily for bodily hygiene and medical prevention, or to showcase imperial engineering wealth and luxurious social leisure?',
      discussion_ideas: [
        'Preventative Bodily Hygiene and Galenic Balance: The sequence of rooms (tepidarium, caldarium, frigidarium) was designed in accordance with classical humoral theory: heat opened skin pores to sweat out corrupt humors and dirt, followed by a cold plunge to close pores and reinvigorate circulation, providing affordable daily hygiene for ordinary citizens who lacked running water at home.',
        "Civic Social Leisure and Political Cohesion: Roman thermae served as bustling community cultural centers featuring exercise yards (palaestra), massage rooms, libraries, and food stalls; Roman emperors and local magistrates built and subsidized them for a nominal entry fee (a quadrans) as political propaganda ('bread and circuses') to showcase imperial benevolence and promote loyal Roman civic identity.",
      ],
    },
    {
      match: /Strigils|Aryballos/i,
      hinge_question:
        'How does scraping dirt with olive oil and a bronze blade compare in effectiveness to modern chemical soap?',
      discussion_ideas: [
        'The Roman strigil method represented an effective mechanical cleansing technique in an era before modern chemical surfactants. Bathers rubbed perfumed olive oil over their skin to dissolve surface sweat, dust, and sebum; the curved bronze strigil was then scraped firmly across the limbs, mechanically removing dead skin cells, caked dirt, and superficial bacteria. However, unlike modern soap—whose amphiphilic molecules chemically break apart the lipid membranes of dangerous bacterial pathogens and viruses so they wash away in water—oil scraping did not disinfect or kill microscopic organisms. Furthermore, because bathhouse plunge pools were rarely drained or disinfected, warm communal bathwater often acted as a breeding ground for parasites, eye infections, and water-borne pathogens.',
      ],
    },
  ],

  // LESSON 2: Why did public health decline during the Middle Ages?
  lesson_2: [
    {
      match: /Norwich and Winchester|Municipal Court Rolls/i,
      hinge_question:
        'Do town court fines prove that medieval councils were proactive protectors of health, or that municipal enforcement was completely overwhelmed by street filth?',
      discussion_ideas: [
        "Proactive Municipal Environmental Regulation: Court rolls prove that medieval town councils were not indifferent to sanitation: aldermen actively enacted local bylaws fining butchers for dumping entrails ('offal') in public streets, punishing tanners for fouling drinking streams, and employing municipal carters ('muck-rakers') to clear dung heaps to protect the town from foul air and miasma.",
        'Structural Inability to Enforce Compliance: The repetitive nature of the fines levied against the same repeat offenders year after year demonstrates that small town councils lacked permanent police forces, public sewers, or paved infrastructure to cope with expanding urban populations; fines functioned merely as a token tax on unavoidable commercial waste rather than an effective deterrent.',
      ],
    },
    {
      match: /Christ Church Priory|Waterworks Plan/i,
      hinge_question:
        'Why were monastic orders able to engineer advanced hydraulic filtration while neighbouring townspeople drank polluted river water?',
      discussion_ideas: [
        'The Canterbury waterworks plan illustrates that advanced medieval sanitation was made possible by wealth, literacy, and religious discipline. Monastic communities possessed substantial land endowments, centralized governance, and access to preserved Roman architectural manuscripts. Driven by the Rule of Saint Benedict—which mandated cleanliness, ritual washing before prayer, and total insulation from the sinful outside world—monks built gravity-fed lead and clay pipes that channeled fresh water from pure springs outside the city through a series of settling and filtration tanks. This pure supply was distributed sequentially: first to the infirmary and kitchen, then to the refectory lavatorium, and finally flushing the monastic reredorter (latrines) into the river below the town, achieving a hydraulic standard far superior to chaotic civilian boroughs.',
      ],
    },
    {
      match: /Titchfield Abbey/i,
      hinge_question:
        'How does the landscape evidence at Titchfield Abbey demonstrate monastic mastery over water supply?',
      discussion_ideas: [
        'Hydraulic Engineering for Sustainable Fish Cultivation: The Premonstratensian canons at Titchfield Abbey constructed an intricate network of artificial fish ponds and sluice gates along the River Meon; adhering to strict monastic dietary rules forbidding meat on Fridays and throughout Lent, the monks engineered controlled water flows to breed freshwater carp, pike, and eels, ensuring self-sufficient protein supplies.',
        'Centralized Sanitation and Drainage Infrastructure: Archaeological excavations reveal that Titchfield Abbey utilized an advanced water diversion system: clear water was piped from natural hillslope springs for cooking and the communal washing cloister, while waste channels were engineered with a steep hydraulic gradient to flush latrines and refuse pits into tidal marshes, keeping the living quarters sanitary.',
      ],
    },
  ],

  // LESSON 3: To what extent did towns become filthier during the Early Modern period?
  lesson_3: [
    {
      match: /Harington’s Water Closet|Harington/i,
      hinge_question:
        'Does Harington’s toilet diagram prove that early modern Britain was making technological progress in sanitation, or that inventions were useless without municipal infrastructure?',
      discussion_ideas: [
        "Pioneering Mechanical Innovation: Harington's 'Ajax' was an ingenious hydraulic breakthrough: featuring an elevated cistern, a pull-valve, and a water-trap wash-down mechanism, it successfully prevented sewer gases from rising into the room, creating the mechanical blueprint for the modern flush toilet nearly two centuries before industrial patenting.",
        "Uselessness Without Centralized Municipal Water and Sewers: In 1596, London possessed no high-pressure piped water supply and no underground sewer network; flushing Harington's toilet required manually carrying dozens of gallons of water up stairs, only to discharge human waste directly into the household's leaking cellar cesspool. Without citywide municipal infrastructure, the invention was an eccentric royal novelty (installed only at Richmond Palace and Harington's estate) that had zero impact on public health.",
      ],
    },
    {
      match: /Samuel Pepys/i,
      hinge_question:
        "How useful is Pepys' diary entry for revealing why wealthy London homes were still vulnerable to sewage contamination?",
      discussion_ideas: [
        "Pepys' diary entry—recounting with disgust how he stepped into a 'great heap of turds' in his own cellar because his neighbour Sir John Lawson's cesspool had overflowed through the cellar wall—is exceptionally valuable primary evidence. Pepys was a wealthy, high-ranking Admiralty official living in an affluent London neighborhood; his diary proves that urban sanitation failures did not affect only the poor. In 17th-century London, even elite homes relied on porous brick or timber cesspits dug beneath floorboards, which frequently leaked into adjoining cellars and contaminated nearby drinking water wells, exposing the wealthiest households to typhus and cholera.",
      ],
    },
    {
      match: /London Plague Broadsheet|Bill of Mortality/i,
      hinge_question:
        'Why did quarantine regulations in 1665 fail to stop the spread of bubonic plague?',
      discussion_ideas: [
        "Medical Ignorance of Flea and Rat Vectors: 17th-century authorities believed plague was caused by foul air ('miasma') or human-to-human contact; they locked infected families inside their homes, marking doors with red crosses and 'Lord have mercy upon us', and slaughtered thousands of street dogs and cats. Killing domestic carnivores allowed the true vectors—black rats and plague-carrying fleas (Xenopsylla cheopis)—to multiply uncontrollably across thatched roofs and rubbish piles.",
        'Social Despair, Bribery, and Evasion: Quarantine was perceived as a death sentence: healthy family members were imprisoned alongside dying relatives. Desperate citizens routinely bribed watchmen, escaped through rooftops, or concealed deaths from parish searchers, spreading the disease across overcrowded suburban parishes.',
      ],
    },
  ],

  // LESSON 4: How did the Industrial Revolution lead to a public health crisis?
  lesson_4: [
    {
      match: /A Court for King Cholera/i,
      hinge_question:
        'How does Source A use visual satire to blame greedy landlords and municipal inaction for cholera epidemics?',
      discussion_ideas: [
        "John Leech's cartoon savagely exposes the complicity of slum landlords and local vestries in cholera outbreaks. By illustrating a crumbling, unpaved courtyard crowded with destitute families, dilapidated tenements, and an enormous overflowing dung heap labeled 'Cesspool', Leech personifies Cholera as an ancient skeletal king holding court. The caption highlights that greedy landlords squeezed high rents from poor families while refusing to install pipes, clean privies, or pave yards, while local councils refused to spend tax revenues on drainage. Leech shows that cholera was not an act of God, but an entirely human-made epidemic caused by landlord greed and municipal neglect.",
      ],
    },
    {
      match: /Edwin Chadwick/i,
      hinge_question:
        'Was Chadwick motivated primarily by moral compassion for the poor, or by a desire to reduce poor-rate taxes for the wealthy middle class?',
      discussion_ideas: [
        "Economic Utilitarianism and Poor-Rate Tax Reduction: As a dedicated disciple of Jeremy Bentham and author of the 1834 Poor Law Amendment Act, Chadwick's primary calculation was financial: he sought to prove to tight-fisted ratepayers that preventable disease among working-class breadwinners forced thousands of widows and orphans onto parish poor relief, meaning civil sanitation infrastructure was an economic investment to lower local taxes.",
        "Genuine Moral and Physical Empathy for Living Degradation: Chadwick's report contains passionate, detailed documentation of human suffering: he expressed profound horror at workers forced to live beside open slaughterhouses and drink water tainted with human excrement, genuinely believing that environmental filth degraded moral character and destroyed the physical strength of the British nation.",
      ],
    },
  ],

  // LESSON 5: Why did it take the 'Great Stink' to finally clean up Britain's streets?
  lesson_5: [
    {
      match: /Father Thames Introducing His Offspring/i,
      hinge_question:
        'Does Source A show that Victorians understood the biological connection between sewage and cholera, or that they remained obsessed with foul air and miasma?',
      discussion_ideas: [
        "Punch's 1858 cartoon perfectly captures the Victorian obsession with miasma theory. The print depicts a slimy, skeletal Father Thames emerging from bubbling, toxic river sludge to introduce his monstrous offspring—'Diptheria', 'Scrofula', and 'Cholera'—to an aristocratic lady representing London. Rather than illustrating contaminated drinking water pipes, the artist emphasizes thick, putrid vapor and foul-smelling river gas rising from the water into human nostrils. Even though the cartoonist correctly blamed the dumping of raw sewage into the Thames for epidemics, Victorian medicine still believed the disease entered the body through inhaling foul odors ('all smell is disease'), demonstrating that fear of miasma was the driving catalyst that panicked Parliament into building underground sewers.",
      ],
    },
    {
      match: /Eastney Beam Engine House/i,
      hinge_question:
        'What does the massive brick architecture of Eastney prove about the Victorian belief in heavy engineering solutions to public health crises?',
      discussion_ideas: [
        'Monuments to Civic Pride and Industrial Engineering: Victorian municipal corporations treated public utilities not as utilitarian eyesores, but as civic palaces; the Eastney pumping station near Portsmouth was constructed with monumental Italianate brickwork, ornamental cast-iron columns, and decorative plaster ceilings, demonstrating supreme Victorian confidence that heavy steam machinery was a noble, civilizing triumph over epidemic disease.',
        "The Technological Power of Steam Pumping: Portsmouth's flat, low-lying coastal topography made natural gravity drainage impossible; Eastney's two colossal 150-horsepower James Watt beam engines lifted millions of gallons of sewage daily and pumped it into holding reservoirs to be discharged on the ebb tide into the Solent, proving that steam engineering could solve environmental crises that had plagued coastal cities for centuries.",
      ],
    },
    {
      match: /Pasteur’s Swan-Neck Flask Experiments/i,
      hinge_question:
        'How did Pasteur’s swan-neck flask experiment finally provide scientific justification for Bazalgette’s enclosed sewers?',
      discussion_ideas: [
        "In 1861, French chemist Louis Pasteur published his landmark experiments disproving spontaneous generation: boiled nutrient broth in a flask with an open S-shaped curved neck remained clear and sterile indefinitely, because airborne dust and microbes settled in the curve of the tube without reaching the broth. When the neck was broken, air rushed in directly and microbes multiplied immediately. This breakthrough provided the undeniable biological foundation for public health engineering: it proved that disease was caused by living microscopic pathogens multiplying in organic matter, confirming that Joseph Bazalgette's sealed, brick-lined underground interceptor sewers prevented water-borne germs from contaminating city populations.",
      ],
    },
  ],

  // LESSON 6: Why did it take the scientific revolution of Germ Theory to finally conquer water-borne disease?
  lesson_6: [
    {
      match: /1854 Cholera Spot Map of Soho/i,
      hinge_question:
        'Does Snow’s map prove that water was the cause of cholera, or did it merely show correlation that miasma believers could explain away?',
      discussion_ideas: [
        'Empirical Clustering and Epidemiological Proof: By meticulously plotting each cholera fatality as a black bar on a street map of Soho, Snow demonstrated an unmistakable geographic cluster centered precisely around the Broad Street communal water pump; households closest to the pump suffered catastrophic mortality, whereas adjacent streets using other wells remained virtually untouched.',
        "Miasma Counter-Arguments and Scientific Skepticism: Orthodox medical authorities (such as William Farr and the General Board of Health) initially dismissed Snow's map as mere correlation; miasma believers argued that the Broad Street pump was located at the lowest elevation in the district where heavy, corrupt gases settled, claiming victims inhaled toxic sewer vapors rather than drinking contaminated water.",
      ],
    },
    {
      match: /Lion Brewery and Susanna Eley/i,
      hinge_question:
        "Why was the death of Susanna Eley in healthy, elevated Hampstead the definitive piece of evidence confirming Snow's theory?",
      discussion_ideas: [
        "The Susanna Eley case study was Dr John Snow's epidemiological masterpiece that shattered the miasma theory. Widow Susanna Eley lived in affluent, leafy Hampstead—an elevated, clean rural district miles away from the foul smells of Soho. Yet she died of violent cholera on 2 September 1854. Snow investigated and discovered that Mrs Eley had previously lived in Broad Street and liked the taste of its pump water so much that her sons sent her a sealed bottle of Broad Street water by carrier every day; she drank it and died within hours. Crucially, this was matched by the negative control at the Lion Brewery on Broad Street, where seventy workers drank only fermented beer and not a single man contracted cholera. By isolating the water source across completely different environments, Snow eliminated all air and lifestyle variables, proving water was the sole transmission vector.",
      ],
    },
  ],

  // LESSON 7: November Assessment Masterclass
  lesson_7: [
    {
      match: /Soho Cholera Spot Map \(1854\)/i,
      hinge_question:
        'Why was a visual spot map showing death clusters more effective at convincing parish leaders than theoretical medical arguments?',
      discussion_ideas: [
        "Snow's spot map translated complex epidemiological data into an undeniable visual argument that local parish guardians could grasp immediately. Rather than presenting abstract statistical tables or theological theories about divine punishment, the map visually showed black death bars converging like iron filings around the Broad Street pump handle. Convinced by this visual evidence, the St James Parish Board of Guardians agreed to remove the pump handle the very next day, bringing an immediate halt to the epidemic and establishing cartographic data visualization as an indispensable tool of modern medical science.",
      ],
    },
    {
      match: /London’s Intercepting Sewers \(1861\)/i,
      hinge_question:
        'Why was Bazalgette’s choice of newly invented waterproof Portland cement critical for the longevity of London’s sewers?',
      discussion_ideas: [
        "In 1859, Portland cement was a newly invented, unproven building material; traditional Victorian builders relied on cheap Roman lime mortar, which dissolved and washed away when exposed to constant acidic water and moving effluent. Chief Engineer Sir Joseph Bazalgette subjected every single batch of Portland cement to rigorous laboratory tensile stress tests—requiring it to withstand over 500 pounds of load per square inch after seven days' immersion in water. By lining 318 million bricks with waterproof Portland cement, Bazalgette ensured that London's underground interceptor sewers were completely impermeable, preventing contaminated sewage from leaking into surrounding subsoil and drinking water tables, creating an engineering masterpiece that remains in daily use over 160 years later.",
      ],
    },
    {
      match: /Swan-Neck Flask Experiment \(1861\)/i,
      hinge_question:
        'How did Pasteur’s laboratory experiments in France help British sanitation reformers defeat the miasma theory?',
      discussion_ideas: [
        'Scientific Demolition of Spontaneous Generation: By demonstrating that heated broth spoiled only when exposed to airborne microbes and remained pristine in swan-neck flasks, Pasteur conclusively disproved the ancient dogma that disease generated spontaneously from decaying organic matter, destroying the theoretical underpinning of the miasma doctrine.',
        "Catalyst for British Compulsory Public Health Legislation: Armed with Pasteur's germ theory and Robert Koch's subsequent discovery of the Vibrio cholerae bacterium under the microscope, British medical reformers (including John Simon) successfully pressured Parliament into abandoning laissez-faire complacency, passing the landmark 1875 Public Health Act that made clean municipal water, sewer drainage, and medical officers compulsory across the United Kingdom.",
      ],
    },
  ],
};

async function main() {
  console.log('🚀 Starting Water and Sanitation Enrichment...');

  // Load from data.js
  const fileUrl = pathToFileURL(dataJsPath).href;
  const dataModule = await import(fileUrl);
  const unitData = dataModule.default || dataModule.unitData || dataModule.water_and_sanitation;

  let totalSourcesUpdated = 0;
  let totalNarrativeUpdated = 0;

  unitData.lessons.forEach((l) => {
    const rules = WATER_PEDAGOGY[l.id];
    if (!rules) return;

    console.log(`\nWiring ${l.id} (${l.title})...`);

    function matchRule(s) {
      const textToMatch = [s.title, s.id, s.caption, s.source_context].filter(Boolean).join(' ');
      return rules.find((r) => r.match.test(textToMatch));
    }

    // 1. Update l.sources if present
    (l.sources || []).forEach((s, idx) => {
      const rule = matchRule(s);
      if (rule) {
        s.hinge_question = rule.hinge_question;
        s.discussion_ideas = rule.discussion_ideas;
        totalSourcesUpdated++;
        console.log(
          `  ✅ [l.sources ${idx}] "${s.title}" -> ${rule.discussion_ideas.length} idea(s)`,
        );
      }
    });

    // 2. Update narrative_blocks
    (l.narrative_blocks || []).forEach((b, idx) => {
      if (b.source) {
        const rule = matchRule(b.source);
        if (rule) {
          b.source.hinge_question = rule.hinge_question;
          b.source.discussion_ideas = rule.discussion_ideas;
          totalNarrativeUpdated++;
          console.log(
            `  ✅ [narrative ${idx}] "${b.source.title}" -> ${rule.discussion_ideas.length} idea(s)`,
          );
        } else {
          console.warn(
            `  ⚠️ [narrative ${idx}] No match for: "${b.source.title}" (id=${b.source.id})`,
          );
        }
      }
    });
  });

  console.log(
    `\n🎉 Total sources updated across Water and Sanitation: ${totalSourcesUpdated} in l.sources, ${totalNarrativeUpdated} in narrative_blocks`,
  );

  // 1. Write back to units/water_and_sanitation/data.js
  const serialized = JSON.stringify(unitData, null, 2);
  const jsContent = `const water_and_sanitation = ${serialized};\nexport const unitData = water_and_sanitation;\nexport { water_and_sanitation };\nexport default water_and_sanitation;\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = water_and_sanitation;\n}\n`;
  fs.writeFileSync(dataJsPath, jsContent, 'utf8');
  console.log('✅ Successfully wrote units/water_and_sanitation/data.js');

  // 2. Write to public/data/water_and_sanitation.json
  const pubData = { id: 'water_and_sanitation', data: unitData };
  fs.writeFileSync(pubJsonPath, JSON.stringify(pubData, null, 2), 'utf8');
  console.log('✅ Successfully created public/data/water_and_sanitation.json');

  // 3. Write to public/database.json
  if (fs.existsSync(dbPath)) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    if (db.water_and_sanitation) {
      db.water_and_sanitation.data = unitData;
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
      console.log('✅ Successfully updated water_and_sanitation in public/database.json');
    }
  }

  console.log('\n🏁 Completed Water and Sanitation enrichment!');
}

main().catch((err) => {
  console.error('❌ Error executing enrich script:', err);
  process.exit(1);
});
