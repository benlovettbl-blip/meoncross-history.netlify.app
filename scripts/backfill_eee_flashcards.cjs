/**
 * scripts/backfill_eee_flashcards.cjs
 *
 * Authors and injects high-yield flashcards (6-7 per lesson) for the 7 missing lessons
 * in Early Elizabethan England (lesson_2_1, lesson_2_3, lesson_2_4, lesson_3_1, lesson_3_2, lesson_3_3, lesson_3_4),
 * and ensures all flashcards across all 12 lessons have { term, definition, q, a } properties.
 */

const fs = require('fs');
const path = require('path');

const EEE_NEW_FLASHCARDS = {
  lesson_2_1: [
    {
      term: 'Revolt of the Northern Earls (1569)',
      definition:
        'The 1569 Catholic rebellion led by the Earls of Northumberland and Westmorland seeking to depose Elizabeth, restore Catholicism, and marry Mary Queen of Scots to the Duke of Norfolk.',
      q: 'What was the Revolt of the Northern Earls (1569)?',
      a: 'A Catholic rebellion led by northern earls aiming to depose Elizabeth, restore Catholicism, and marry Mary Stuart to the Duke of Norfolk.',
    },
    {
      term: 'Ridolfi Plot (1571)',
      definition:
        'The 1571 conspiracy orchestrated by Italian banker Roberto Ridolfi, involving the Pope, Philip II, and Norfolk, aiming to assassinate Elizabeth and land 10,000 Spanish troops in England.',
      q: 'What was the Ridolfi Plot of 1571?',
      a: 'A conspiracy involving Roberto Ridolfi, Philip II, and the Duke of Norfolk to assassinate Elizabeth and launch a Spanish invasion.',
    },
    {
      term: 'Throckmorton Plot (1583)',
      definition:
        'The 1583 conspiracy planned by French Catholic forces under the Duke of Guise with Spanish financing to liberate Mary Stuart and overthrow Elizabeth.',
      q: 'What was the Throckmorton Plot (1583)?',
      a: "A French and Spanish Catholic plot to invade England, free Mary Stuart, and depose Elizabeth, uncovered by Walsingham's agents.",
    },
    {
      term: 'Babington Plot (1586)',
      definition:
        "The 1586 conspiracy involving Anthony Babington and intercepted coded letters that directly implicated Mary Stuart in sanctioning Elizabeth's assassination.",
      q: 'Why was the Babington Plot (1586) decisive for Mary Queen of Scots?',
      a: 'Intercepted coded correspondence proved Mary had given explicit consent to assassinate Elizabeth, providing the legal evidence needed to execute her.',
    },
    {
      term: "Walsingham's Spy Network",
      definition:
        'The sophisticated intelligence operation directed by Sir Francis Walsingham using codebreakers, double agents, ciphers, and foreign informers to protect Elizabeth from assassination.',
      q: "What was Walsingham's Spy Network?",
      a: 'A sophisticated state intelligence and counter-espionage network using codebreakers, ciphers, and double agents to thwart Catholic plots.',
    },
    {
      term: 'Bond of Association (1584)',
      definition:
        'A legal pledge signed by English nobility stipulating that if any plot against Elizabeth succeeded, anyone on whose behalf the plot was undertaken would be executed without trial.',
      q: 'What was the Bond of Association (1584)?',
      a: 'A legal document signed by English elites pledging to hunt down and execute anyone who attempted or would benefit from the assassination of Elizabeth.',
    },
    {
      term: 'Execution of Mary Queen of Scots (1587)',
      definition:
        "The beheading of Mary Stuart at Fotheringhay Castle on 8 February 1587 following her conviction under the Act for the Queen's Safety.",
      q: 'When and why was Mary, Queen of Scots executed?',
      a: "Executed on 8 February 1587 after her direct complicity in the Babington Plot was proven by Walsingham's intercepted ciphered letters.",
    },
  ],

  lesson_2_3: [
    {
      term: 'Treaty of Nonsuch (1585)',
      definition:
        'The landmark military alliance in which Elizabeth officially pledged 7,400 English soldiers under the Earl of Leicester and £126,000 annually to aid Dutch Protestant rebels against Spain.',
      q: 'What was the Treaty of Nonsuch (1585)?',
      a: 'The treaty where Elizabeth formally allied with the Dutch Protestant rebels, sending 7,400 soldiers and financial subsidies against Spanish rule.',
    },
    {
      term: 'Robert Dudley (Earl of Leicester)',
      definition:
        "The royal favourite appointed by Elizabeth to command the English expeditionary army in the Low Countries, who provoked her fury by accepting the title 'Governor-General'.",
      q: 'What role did Robert Dudley play in the Netherlands expedition?',
      a: 'He commanded the English army in the Netherlands from 1585, but angered Elizabeth by accepting the post of Governor-General of the Low Countries.',
    },
    {
      term: 'Spanish Netherlands',
      definition:
        'The seventeen wealthy Dutch provinces ruled by Philip II, whose deep-water ports directly threatened southern English shipping and maritime security.',
      q: 'Why were the Spanish Netherlands strategically vital to Elizabethan England?',
      a: 'They controlled vital English cloth-export markets and their channel ports could provide an immediate launchpad for a Spanish invasion of England.',
    },
    {
      term: 'Pacification of Ghent (1576)',
      definition:
        'The 1576 treaty uniting all seventeen Dutch provinces in demanding the withdrawal of Spanish troops, religious tolerance, and the restoration of Dutch autonomy.',
      q: 'What was the Pacification of Ghent (1576)?',
      a: 'An agreement uniting Dutch Catholics and Protestants to demand the expulsion of Spanish forces and religious toleration.',
    },
    {
      term: 'Raid on Cadiz (1587)',
      definition:
        "Francis Drake's preemptive naval strike on the Spanish harbour of Cadiz in April 1587, destroying over 30 warships and vital seasoned barrel staves ('Singeing the King of Spain's Beard').",
      q: "What was the Raid on Cadiz ('Singeing the King of Spain's Beard')?",
      a: "Drake's 1587 naval raid destroying over 30 Spanish ships and supplies, which delayed the launch of the Spanish Armada by over a year.",
    },
    {
      term: 'Duke of Parma (Alessandro Farnese)',
      definition:
        "Philip II's brilliant military commander in the Netherlands, whose 30,000 veteran infantry were intended to be transported across the Channel by the Armada.",
      q: 'Who was the Duke of Parma?',
      a: "Philip II's supreme military commander in the Netherlands whose elite army was intended to link up with the Armada to invade England.",
    },
  ],

  lesson_2_4: [
    {
      term: 'Spanish Armada (1588)',
      definition:
        'The invasion fleet of 130 warships and transport vessels carrying 30,000 men dispatched by Philip II in May 1588 to conquer Protestant England and depose Elizabeth.',
      q: 'What was the Spanish Armada of 1588?',
      a: "A fleet of 130 warships dispatched by Philip II to escort the Duke of Parma's invasion army across the English Channel to depose Elizabeth.",
    },
    {
      term: 'Duke of Medina Sidonia',
      definition:
        'The Spanish aristocrat appointed supreme commander of the Armada by Philip II despite having no naval combat experience and suffering from chronic seasickness.',
      q: 'Who commanded the Spanish Armada?',
      a: 'The Duke of Medina Sidonia, a court nobleman who lacked naval experience but was chosen for his high rank and loyalty to Philip II.',
    },
    {
      term: 'English Race-Built Galleon',
      definition:
        'A sleek, low-profile warship designed by John Hawkins, faster and more manoeuvrable than Spanish galleons and equipped with rapid-reloading long-range culverin cannons.',
      q: 'What technological advantages did English race-built galleons have?',
      a: 'They were lower, faster, more manoeuvrable, and carried long-range culverins on four-wheeled carriages that could be quickly reloaded.',
    },
    {
      term: 'Fireships at Calais (Hellburners)',
      definition:
        'Eight sacrificial English vessels packed with tar, pitch, and gunpowder set ablaze and drifted into the Spanish anchorage at Calais on 7 August 1588, scattering the fleet.',
      q: 'How did the English fireships at Calais disrupt the Armada?',
      a: 'They forced Spanish captains to cut their anchor cables in panic, breaking their impenetrable crescent formation and driving them into the open sea.',
    },
    {
      term: 'Battle of Gravelines (8 August 1588)',
      definition:
        'The decisive close-range naval battle off the Flemish coast where English warships pounded the scattered Spanish fleet with over 500 cannon rounds per ship.',
      q: 'What was the significance of the Battle of Gravelines?',
      a: "The decisive engagement where the English fleet battered disordered Spanish ships, ending any possibility of the Armada linking with Parma's army.",
    },
    {
      term: "The 'Protestant Wind'",
      definition:
        'The fierce south-westerly gale that prevented the surviving Spanish ships from re-entering the Channel, forcing them on a disastrous voyage around Scotland and Ireland.',
      q: "What was the 'Protestant Wind'?",
      a: 'A prevailing gale that forced the retreating Armada north around Scotland and Ireland, where dozens of ships were wrecked on rocky shores.',
    },
  ],

  lesson_3_1: [
    {
      term: 'Grammar School',
      definition:
        'Selective, fee-paying secondary schools for middle-class boys, providing an intensive classical curriculum centered on Latin grammar, rhetoric, and classical authors.',
      q: 'What were Elizabethan grammar schools?',
      a: 'Fee-paying secondary schools for sons of gentry, lawyers, and merchants, teaching Latin grammar, classical literature, and rhetoric.',
    },
    {
      term: 'Petty School & Dame School',
      definition:
        'Informal, elementary schools run in homes, teaching young children rudimentary reading, writing, and basic arithmetic before grammar school or apprenticeships.',
      q: 'What were petty schools in Elizabethan England?',
      a: 'Small, local schools run in private homes teaching basic literacy and numeracy to young boys from prosperous families.',
    },
    {
      term: 'Humanism',
      definition:
        'The Renaissance philosophical and educational movement that emphasized rational human inquiry, classical literature, critical reasoning, and moral citizenship.',
      q: 'How did Humanism influence Elizabethan education?',
      a: 'It promoted the study of classical texts, rational inquiry, and secular rhetoric to train articulate, moral leaders and administrators.',
    },
    {
      term: 'Expansion of Literacy',
      definition:
        "The substantial increase in reading and writing abilities across Elizabethan society, rising to roughly 30% for men and 10% for women by the end of Elizabeth's reign.",
      q: "How did literacy rates change during Elizabeth's reign?",
      a: 'Literacy rose significantly, especially among urban merchants and craftsmen, driven by printing, trade requirements, and educational expansion.',
    },
    {
      term: 'Elizabethan Theatre',
      definition:
        'Permanent, commercial public playhouses built outside the City of London (e.g. The Theatre, The Rose, The Globe) drawing diverse audiences from all social strata.',
      q: 'Why was the Elizabethan theatre culturally revolutionary?',
      a: 'It provided the first purpose-built, mass secular entertainment in England, bringing together royalty, nobles, merchants, and groundlings.',
    },
    {
      term: 'Social Differentiation in Leisure',
      definition:
        'The strict division of pastimes by social class: the nobility engaged in hunting, hawking, and tennis, while the lower classes participated in football, bear-baiting, and tavern sports.',
      q: 'How did leisure reflect Elizabethan social structure?',
      a: 'Nobles enjoyed elite pastimes like hunting and tennis, while ordinary working people engaged in rough public sports like bear-baiting and football.',
    },
  ],

  lesson_3_2: [
    {
      term: 'Enclosure',
      definition:
        'The practice of fencing off common arable fields into individual private pastures for sheep grazing, displacing agricultural labourers and driving rural depopulation.',
      q: 'What was enclosure, and why did it increase poverty?',
      a: 'Fencing off open common arable land for sheep farming, which required fewer workers and evicted tenant farmers into homelessness.',
    },
    {
      term: 'Impotent Poor',
      definition:
        'Impoverished individuals physically incapable of working due to age, illness, or disability, viewed by Elizabethans as deserving of Christian charity and relief.',
      q: "Who were classified as the 'impotent poor'?",
      a: 'Those unable to work through no fault of their own, such as orphans, the elderly, sick, and physically disabled.',
    },
    {
      term: 'Able-Bodied Poor',
      definition:
        'Impoverished people who were physically capable of working but could not find employment due to harvest failures, trade slumps, or demographic growth.',
      q: "Who were the 'able-bodied poor'?",
      a: 'Destitute citizens capable of labour who were unemployed due to economic conditions and were expected to work in exchange for assistance.',
    },
    {
      term: 'Vagabond / Sturdy Beggar',
      definition:
        'An itinerant, unemployed person who wandered seeking work or charity, viewed by authorities as a dangerous threat to social order and subject to whipping and imprisonment.',
      q: "How did Elizabethan authorities view 'vagabonds'?",
      a: 'As idle, dishonest criminals and a threat to public order, subjecting them to public whipping, ear-boring, and execution for repeat offenses.',
    },
    {
      term: 'Poor Rate',
      definition:
        'A compulsory local property tax levied on parish householders by the Justice of the Peace to fund financial relief and work materials for the destitute.',
      q: 'What was the Elizabethan Poor Rate?',
      a: 'A compulsory tax collected in each parish to pay for relief and work materials for the local poor.',
    },
    {
      term: '1601 Act for the Relief of the Poor',
      definition:
        'The culminating Poor Law legislation creating a unified national statutory framework administered by parish Overseers of the Poor, lasting until 1834.',
      q: 'What was the significance of the 1601 Elizabethan Poor Law?',
      a: 'It established a permanent, nationwide legal system dividing the poor into three classes and requiring parishes to provide work or relief.',
    },
  ],

  lesson_3_3: [
    {
      term: 'Circumnavigation (1577–1580)',
      definition:
        'The historic voyage by Francis Drake sailing completely around the globe in the Golden Hind, raiding Spanish ports in the Pacific and returning with enormous treasure.',
      q: "What was the historical significance of Drake's circumnavigation?",
      a: "Drake became the first Englishman to circumnavigate the globe (1577-80), returning with £400,000 in plunder and breaking Spain's Pacific monopoly.",
    },
    {
      term: 'Astrolabe & Quadrant',
      definition:
        "Precision maritime navigational instruments used by ocean mariners to calculate a ship's latitude by measuring the angle of the sun or Polaris above the horizon.",
      q: 'How did the astrolabe and quadrant aid Elizabethan exploration?',
      a: 'They allowed navigators to measure the angle of celestial bodies, enabling them to calculate their precise latitude on open ocean voyages.',
    },
    {
      term: 'Log and Line',
      definition:
        "A navigational method using a knotted rope weighted with a wooden board thrown overboard to measure a ship's speed through the water in knots.",
      q: 'What was the purpose of the log and line?',
      a: "To measure a vessel's speed through the water, helping navigators estimate distance travelled using dead reckoning.",
    },
    {
      term: 'Mercator Projection (1569)',
      definition:
        "Gerardus Mercator's revolutionary map projection that represented lines of constant compass direction as straight lines, greatly simplifying ocean navigation.",
      q: 'Why was the Mercator Projection vital for ocean exploration?',
      a: 'It allowed navigators to plot true straight compass bearings on navigational charts without distorting direction over long voyages.',
    },
    {
      term: 'Joint-Stock Companies',
      definition:
        'Commercial business ventures (e.g. the Muscovy Company and Levant Company) funded by private investors who shared risks and profits from long-distance overseas voyages.',
      q: 'What were Elizabethan joint-stock trading companies?',
      a: 'Commercial companies where multiple investors pooled capital to finance risky overseas trading voyages, sharing profits and limiting individual risk.',
    },
    {
      term: 'Golden Hind',
      definition:
        "Francis Drake's 100-ton flagship, originally named the Pelican, in which he successfully circumnavigated the globe and was knighted aboard by Elizabeth in 1581.",
      q: 'What was the Golden Hind?',
      a: "Francis Drake's flagship on his three-year voyage around the world, on which Elizabeth publicly knighted him in 1581.",
    },
  ],

  lesson_3_4: [
    {
      term: 'Royal Charter',
      definition:
        'A formal crown document granted by Queen Elizabeth authorising Sir Walter Raleigh to explore, colonize, and govern overseas territories not already ruled by Christian princes.',
      q: 'What was the Royal Charter granted to Walter Raleigh?',
      a: "A royal grant authorizing Raleigh to discover, conquer, and colonize North American lands in the Queen's name with exclusive trade rights.",
    },
    {
      term: 'Sir Walter Raleigh',
      definition:
        "Elizabethan courtier, soldier, and explorer who organized and financed the expeditions to establish England's first overseas colony on Roanoke Island.",
      q: "What was Walter Raleigh's role in the colonisation of Virginia?",
      a: "He secured the royal charter, organized funding, and dispatched expeditions to colonize Roanoke, naming the territory 'Virginia' for Elizabeth.",
    },
    {
      term: 'Virginia',
      definition:
        "The vast eastern North American coastal territory claimed for the English crown by Raleigh's expedition in 1584, named in honor of Elizabeth, the 'Virgin Queen'.",
      q: 'Why was the colony of Virginia named?',
      a: "Named by Raleigh in honor of Queen Elizabeth I, who was celebrated as the 'Virgin Queen'.",
    },
    {
      term: 'Roanoke Island Settlement (1585)',
      definition:
        "England's first attempted colony in North America, settled by 107 men under Ralph Lane; it failed within a year due to food shortages, conflict with indigenous people, and hostile weather.",
      q: 'Why did the 1585 Roanoke colony fail?',
      a: 'The settlers lacked agricultural skills, arrived too late to plant crops, alienated the local Algonquians, and faced severe starvation before abandoning the site.',
    },
    {
      term: 'Manteo and Wanchese',
      definition:
        'Two Algonquian Native Americans brought to England in 1584 to help colonists learn the language, create navigation charts, and prepare for future settlement.',
      q: 'Who were Manteo and Wanchese?',
      a: "Two Native Americans brought to London in 1584 who assisted Raleigh's team with language, cultural intelligence, and navigation.",
    },
    {
      term: "The 'Lost Colony' of 1587",
      definition:
        "The second Roanoke colony of 115 men, women, and children led by John White; when supply ships returned in 1590, the entire population had vanished, leaving only 'CROATOAN' carved on a post.",
      q: "What happened to the 'Lost Colony' of 1587?",
      a: "Governor John White returned in 1590 to find the entire settlement deserted with no sign of battle, leaving only the word 'CROATOAN' carved into a wooden post.",
    },
  ],
};

function backfillEeeFlashcards() {
  console.log('📦 Backfilling Early Elizabethan England Flashcards...');

  const targetFiles = [
    path.join(__dirname, '..', 'public', 'data', 'eee.json'),
    path.join(__dirname, '..', 'data', 'eee.json'),
  ];

  let totalInjected = 0;

  targetFiles.forEach((fp) => {
    if (fs.existsSync(fp)) {
      const data = JSON.parse(fs.readFileSync(fp, 'utf8'));
      const lessons = data.data?.lessons || data.lessons || [];

      lessons.forEach((l) => {
        // If missing flashcards or in new set, inject
        if (EEE_NEW_FLASHCARDS[l.id]) {
          l.flashcards = EEE_NEW_FLASHCARDS[l.id];
          totalInjected += l.flashcards.length;
        } else if (l.flashcards && l.flashcards.length > 0) {
          // Normalize existing flashcards to ensure both term/definition and q/a
          l.flashcards.forEach((fc) => {
            if (!fc.q && fc.term) fc.q = `What was the significance of ${fc.term}?`;
            if (!fc.a && fc.definition) fc.a = fc.definition;
            if (!fc.term && fc.q) fc.term = fc.q;
            if (!fc.definition && fc.a) fc.definition = fc.a;
          });
        }
      });

      fs.writeFileSync(fp, JSON.stringify(data, null, 2), 'utf8');
      console.log(`  ✔ Injected & normalized flashcards into ${fp}`);
    }
  });

  // Also update units/eee/data.js
  const unitJs = path.join(__dirname, '..', 'units', 'eee', 'data.js');
  if (fs.existsSync(unitJs)) {
    try {
      const pubData = JSON.parse(fs.readFileSync(targetFiles[0], 'utf8'));
      const unitObj = pubData.data || pubData;
      const jsContent = `// Early Elizabethan England, 1558–88 Unit Data\nexport const unitData = ${JSON.stringify(unitObj, null, 2)};\nexport default unitData;\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
      fs.writeFileSync(unitJs, jsContent, 'utf8');
      console.log(`  ✔ Synchronized units/eee/data.js`);
    } catch (err) {
      console.warn(`  ⚠️ Could not update units/eee/data.js: ${err.message}`);
    }
  }

  console.log(
    `✅ Early Elizabethan England: Backfilled ${totalInjected / 2} flashcards across 7 lessons, normalized all 12 lessons.`,
  );
}

if (require.main === module) {
  backfillEeeFlashcards();
}

module.exports = { backfillEeeFlashcards, EEE_NEW_FLASHCARDS };
