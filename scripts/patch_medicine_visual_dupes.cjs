const fs = require('fs');
const path = require('path');

const jsFiles = [
  'units/edexcel_medicine/data.js',
  'public/units/edexcel_medicine/data.js'
];

const jsonFiles = [
  'public/data/edexcel_medicine.json',
  'data/edexcel_medicine.json'
];

function patchJsContent(content) {
  // 1. Lesson 7 Source C in sources array
  let patched = content.replace(
    /("title":\s*"Source C: Renaissance Municipal Hospital Ward",\s*)"src":\s*"\/images\/hotel_dieu_hospital\.jpg",\s*"source":\s*"\/images\/hotel_dieu_hospital\.jpg",/g,
    `"title": "Source C: The Infirmary of the Hospital of Charity by Abraham Bosse (ca. 1639)",\n          "src": "/images/renaissance_hospital_ward.jpg",\n          "source": "/images/renaissance_hospital_ward.jpg",\n          "image": "/images/renaissance_hospital_ward.jpg",`
  );

  // 1b. Update Lesson 7 Source C caption & provenance in sources array
  patched = patched.replace(
    /"caption":\s*"A 17th-century hospital ward showing rows of beds cared for by matrons following the closure of religious monastic infirmaries\.",\s*"desc":\s*"Historic depiction of early modern hospital patient care\.",\s*"provenance":\s*"Engraving of the Salle Saint-Roch, Hôtel-Dieu de Paris, 17th century\. Bibliothèque nationale de France, Paris \(BnF Estampes Va-269\)\.",\s*"hinge_question":\s*"What changes in hygiene, administration, and medical supervision occurred in English hospitals following the Dissolution of the Monasteries\?",/g,
    `"caption": "A 17th-century engraving by Abraham Bosse depicting the orderly infirmary ward of the Hôpital de la Charité in Paris, with curtained patient beds, visiting physicians, and attendants administering medicine.",\n          "desc": "Historic copperplate engraving illustrating 17th-century European hospital care and bedside medical supervision.",\n          "provenance": "Etching by Abraham Bosse, L'Infirmerie de l'Hôpital de la Charité, Paris, ca. 1639. Metropolitan Museum of Art (Accession No. 26.49.53) / British Museum (BM 1868,0808.3400).",\n          "hinge_question": "How does the orderly layout and medical supervision shown in this 17th-century infirmary contrast with the medieval 'care not cure' approach seen in 14th-century monastic hospitals?",`
  );

  // 1c. Lesson 7 Act 5 narrative block source
  patched = patched.replace(
    /"title":\s*"Source C: Renaissance Municipal Hospital Ward",(\s*"src":\s*"\/images\/renaissance_hospital_ward\.jpg",\s*"source":\s*"\/images\/renaissance_hospital_ward\.jpg",\s*"image":\s*"\/images\/renaissance_hospital_ward\.jpg",\s*)"caption":\s*"A 17th-century engraving showing an early modern hospital ward with rows of simple beds, reflecting modest clinical care\.",\s*"desc":\s*"Seventeenth-century engraving of a municipal hospital ward\.",\s*"provenance":\s*"Wellcome Collection, London \(Shelfmark: Iconographic Collection 3892i\)\.",\s*"citation":\s*"Wellcome Collection, London \(Shelfmark: Iconographic Collection 3892i\)\.",/g,
    `"title": "Source C: The Infirmary of the Hospital of Charity by Abraham Bosse (ca. 1639)",$1"caption": "A 17th-century engraving by Abraham Bosse depicting the orderly infirmary ward of the Hôpital de la Charité in Paris, with curtained patient beds, visiting physicians, and attendants administering medicine.",\n            "desc": "Historic copperplate engraving illustrating 17th-century European hospital care and bedside medical supervision.",\n            "provenance": "Etching by Abraham Bosse, L'Infirmerie de l'Hôpital de la Charité, Paris, ca. 1639. Metropolitan Museum of Art (Accession No. 26.49.53) / British Museum (BM 1868,0808.3400).",\n            "citation": "Etching by Abraham Bosse, L'Infirmerie de l'Hôpital de la Charité, Paris, ca. 1639. Metropolitan Museum of Art (Accession No. 26.49.53) / British Museum (BM 1868,0808.3400).",`
  );

  // 2. Lesson 10 Source A in sources array
  patched = patched.replace(
    /"title":\s*"Source A: Night Burial in a Mass Plague Pit \(1665\)",\s*"src":\s*"\/images\/plague_burial\.jpg",\s*"source":\s*"\/images\/plague_burial\.jpg",/g,
    `"title": "Source A: Plague in 1665: Dead-Carts Collecting Victims in London",\n          "src": "/images/night_plague_burials_1665.jpg",\n          "source": "/images/night_plague_burials_1665.jpg",\n          "image": "/images/night_plague_burials_1665.jpg",`
  );

  // 2b. Lesson 10 Source A caption & provenance in sources array
  patched = patched.replace(
    /"caption":\s*"A contemporary woodcut broadsheet showing dead-carts dumping plague victims at night into a mass lime pit\.",\s*"desc":\s*"Historic woodcut broadsheet illustrating nocturnal plague burials during the 1665 epidemic\.",\s*"provenance":\s*"Woodcut broadsheet depicting burial carts at the Holywell Mount pest pit, London, 1665\. Museum of London \(Accession No\. NN2598\)\.",\s*"hinge_question":\s*"How does this scene of nocturnal mass burial convey the breakdown of civic order and normal funeral customs during the Great Plague of 1665\?",/g,
    `"caption": "A contemporary engraving titled 'Plague in 1665' illustrating a London dead-cart team collecting shrouded victims from the streets while smoking pipes to ward off miasma.",\n          "desc": "Historic engraving depicting dead-carts and night burials in London during the Great Plague of 1665.",\n          "provenance": "Contemporary 17th-century engraving titled 'Plague in 1665', London, 1665. Wellcome Collection, London (Library reference: Iconographic Collection 3892i / EPB 33261/B).",\n          "hinge_question": "How does this scene of dead-carts collecting bodies during the Great Plague of 1665 demonstrate the total collapse of customary funeral traditions?",`
  );

  // 2c. Lesson 10 Act 5 narrative block source
  patched = patched.replace(
    /"title":\s*"Source A: Night Burial in a Mass Plague Pit \(1665\)",(\s*"src":\s*"\/images\/night_plague_burials_1665\.jpg",\s*"source":\s*"\/images\/night_plague_burials_1665\.jpg",\s*"image":\s*"\/images\/night_plague_burials_1665\.jpg",\s*)"caption":\s*"A 17th-century engraving depicting night-cart orderlies dumping shrouded plague corpses into a mass lime trench by torchlight\.",\s*"desc":\s*"Seventeenth-century engraving showing nocturnal plague burials in London\.",\s*"provenance":\s*"Broadside illustration from London’s Dreadful Visitation, London: E\. Cotes, 1665\. Wellcome Collection, London \(Shelfmark: EPB 33261\/B\)\.",\s*"citation":\s*"Broadside illustration from London’s Dreadful Visitation, London: E\. Cotes, 1665\. Wellcome Collection, London \(Shelfmark: EPB 33261\/B\)\.",/g,
    `"title": "Source A: Plague in 1665: Dead-Carts Collecting Victims in London",$1"caption": "A contemporary engraving titled 'Plague in 1665' illustrating a London dead-cart team collecting shrouded victims from the streets while smoking pipes to ward off miasma.",\n            "desc": "Historic engraving depicting dead-carts and night burials in London during the Great Plague of 1665.",\n            "provenance": "Contemporary 17th-century engraving titled 'Plague in 1665', London, 1665. Wellcome Collection, London (Library reference: Iconographic Collection 3892i / EPB 33261/B).",\n            "citation": "Contemporary 17th-century engraving titled 'Plague in 1665', London, 1665. Wellcome Collection, London (Library reference: Iconographic Collection 3892i / EPB 33261/B).",`
  );

  return patched;
}

jsFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const raw = fs.readFileSync(file, 'utf8');
    const patched = patchJsContent(raw);
    if (raw !== patched) {
      fs.writeFileSync(file, patched, 'utf8');
      console.log(`✅ Patched JS file: ${file}`);
    } else {
      console.warn(`⚠️ No changes made to: ${file}`);
    }
  }
});

// Update JSON files
jsonFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    
    // Lesson 7 (index 6)
    if (data.lessons && data.lessons[6]) {
      const l7 = data.lessons[6];
      if (l7.sources && l7.sources[2]) {
        l7.sources[2].title = "Source C: The Infirmary of the Hospital of Charity by Abraham Bosse (ca. 1639)";
        l7.sources[2].src = "/images/renaissance_hospital_ward.jpg";
        l7.sources[2].source = "/images/renaissance_hospital_ward.jpg";
        l7.sources[2].image = "/images/renaissance_hospital_ward.jpg";
        l7.sources[2].caption = "A 17th-century engraving by Abraham Bosse depicting the orderly infirmary ward of the Hôpital de la Charité in Paris, with curtained patient beds, visiting physicians, and attendants administering medicine.";
        l7.sources[2].desc = "Historic copperplate engraving illustrating 17th-century European hospital care and bedside medical supervision.";
        l7.sources[2].provenance = "Etching by Abraham Bosse, L'Infirmerie de l'Hôpital de la Charité, Paris, ca. 1639. Metropolitan Museum of Art (Accession No. 26.49.53) / British Museum (BM 1868,0808.3400).";
        l7.sources[2].hinge_question = "How does the orderly layout and medical supervision shown in this 17th-century infirmary contrast with the medieval 'care not cure' approach seen in 14th-century monastic hospitals?";
      }
      if (l7.narrative_blocks) {
        l7.narrative_blocks.forEach(nb => {
          if (nb.source && (nb.source.letter === 'C' || nb.source.id === 'source_c_municipal_hospital')) {
            nb.source.title = "Source C: The Infirmary of the Hospital of Charity by Abraham Bosse (ca. 1639)";
            nb.source.src = "/images/renaissance_hospital_ward.jpg";
            nb.source.source = "/images/renaissance_hospital_ward.jpg";
            nb.source.image = "/images/renaissance_hospital_ward.jpg";
            nb.source.caption = "A 17th-century engraving by Abraham Bosse depicting the orderly infirmary ward of the Hôpital de la Charité in Paris, with curtained patient beds, visiting physicians, and attendants administering medicine.";
            nb.source.desc = "Historic copperplate engraving illustrating 17th-century European hospital care and bedside medical supervision.";
            nb.source.provenance = "Etching by Abraham Bosse, L'Infirmerie de l'Hôpital de la Charité, Paris, ca. 1639. Metropolitan Museum of Art (Accession No. 26.49.53) / British Museum (BM 1868,0808.3400).";
            nb.source.citation = "Etching by Abraham Bosse, L'Infirmerie de l'Hôpital de la Charité, Paris, ca. 1639. Metropolitan Museum of Art (Accession No. 26.49.53) / British Museum (BM 1868,0808.3400).";
            nb.source.hinge_question = "How does the orderly layout and medical supervision shown in this 17th-century infirmary contrast with the medieval 'care not cure' approach seen in 14th-century monastic hospitals?";
          }
        });
      }
    }

    // Lesson 10 (index 9)
    if (data.lessons && data.lessons[9]) {
      const l10 = data.lessons[9];
      if (l10.sources && l10.sources[0]) {
        l10.sources[0].title = "Source A: Plague in 1665: Dead-Carts Collecting Victims in London";
        l10.sources[0].src = "/images/night_plague_burials_1665.jpg";
        l10.sources[0].source = "/images/night_plague_burials_1665.jpg";
        l10.sources[0].image = "/images/night_plague_burials_1665.jpg";
        l10.sources[0].caption = "A contemporary engraving titled 'Plague in 1665' illustrating a London dead-cart team collecting shrouded victims from the streets while smoking pipes to ward off miasma.";
        l10.sources[0].desc = "Historic engraving depicting dead-carts and night burials in London during the Great Plague of 1665.";
        l10.sources[0].provenance = "Contemporary 17th-century engraving titled 'Plague in 1665', London, 1665. Wellcome Collection, London (Library reference: Iconographic Collection 3892i / EPB 33261/B).";
        l10.sources[0].hinge_question = "How does this scene of dead-carts collecting bodies during the Great Plague of 1665 demonstrate the total collapse of customary funeral traditions?";
      }
      if (l10.narrative_blocks) {
        l10.narrative_blocks.forEach(nb => {
          if (nb.source && (nb.source.letter === 'A' || nb.source.id === 'source_a_night_plague_burials')) {
            nb.source.title = "Source A: Plague in 1665: Dead-Carts Collecting Victims in London";
            nb.source.src = "/images/night_plague_burials_1665.jpg";
            nb.source.source = "/images/night_plague_burials_1665.jpg";
            nb.source.image = "/images/night_plague_burials_1665.jpg";
            nb.source.caption = "A contemporary engraving titled 'Plague in 1665' illustrating a London dead-cart team collecting shrouded victims from the streets while smoking pipes to ward off miasma.";
            nb.source.desc = "Historic engraving depicting dead-carts and night burials in London during the Great Plague of 1665.";
            nb.source.provenance = "Contemporary 17th-century engraving titled 'Plague in 1665', London, 1665. Wellcome Collection, London (Library reference: Iconographic Collection 3892i / EPB 33261/B).";
            nb.source.citation = "Contemporary 17th-century engraving titled 'Plague in 1665', London, 1665. Wellcome Collection, London (Library reference: Iconographic Collection 3892i / EPB 33261/B).";
            nb.source.hinge_question = "How does this scene of dead-carts collecting bodies during the Great Plague of 1665 demonstrate the total collapse of customary funeral traditions?";
          }
        });
      }
    }

    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log(`✅ Patched JSON file: ${file}`);
  }
});
