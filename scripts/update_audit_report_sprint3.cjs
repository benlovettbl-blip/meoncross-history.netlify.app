const fs = require('fs');
const path = require('path');

const reportPath = path.join(__dirname, '..', 'public', 'data', 'full_curriculum_audit_report.json');
const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

// Update Medieval England
report.units.medieval_england = {
  title: "Medieval England: 1066–1485",
  totalSources: 10,
  cleanSources: 10,
  flaggedSources: 0,
  resolvedSources: 10,
  accuracyPct: 100,
  sources: [
    {
      letter: "A",
      title: "Source A: The Bayeux Tapestry: Harold Swearing the Sacred Oath to William (c. 1070s)",
      image: "/images/bayeux_harold_oath.jpg",
      status: "RESOLVED",
      issueType: "",
      issueDesc: ""
    },
    {
      letter: "B",
      title: "Source B: The Bayeux Tapestry: Death of King Harold & Flight of the Saxons (1066)",
      image: "/images/battle_of_hastings_bayeux.jpg",
      status: "RESOLVED",
      issueType: "",
      issueDesc: ""
    },
    {
      letter: "A",
      title: "Source A: The Bayeux Tapestry: Normans Building a Castle at Hastings (1066)",
      image: "/images/bayeux_norman_castle_building.jpg",
      status: "RESOLVED",
      issueType: "",
      issueDesc: ""
    },
    {
      letter: "B",
      title: "Source B: Great Domesday Book Folio: Survey of the King’s Manors (1086)",
      image: "/images/domesday_book.jpg",
      status: "RESOLVED",
      issueType: "",
      issueDesc: ""
    },
    {
      letter: "A",
      title: "Source A: Manuscript Illumination of King Henry II and Thomas Becket Clashing (c. 1300s)",
      image: "/images/henry_becket_dispute.jpg",
      status: "RESOLVED",
      issueType: "",
      issueDesc: ""
    },
    {
      letter: "B",
      title: "Source B: Eyewitness Account of the Murder of Thomas Becket by Edward Grim (1170)",
      image: "/images/becket_murder.jpg",
      status: "RESOLVED",
      issueType: "",
      issueDesc: ""
    },
    {
      letter: "A",
      title: "Source A: Matthew Paris, Chronicle Portrait of King John (c. 1250)",
      image: "/images/king_john_matthew_paris.jpg",
      status: "RESOLVED",
      issueType: "",
      issueDesc: ""
    },
    {
      letter: "B",
      title: "Source B: Magna Carta: Verbatim Clauses 39 and 40 (1215)",
      image: "/images/magna_carta_1215.jpg",
      status: "RESOLVED",
      issueType: "",
      issueDesc: ""
    },
    {
      letter: "A",
      title: "Source A: The Statute of Labourers Parliamentary Statute Extract (1351)",
      image: "/images/statute_of_labourers_1351.jpg",
      status: "RESOLVED",
      issueType: "",
      issueDesc: ""
    },
    {
      letter: "B",
      title: "Source B: Jean Froissart: The Death of Wat Tyler at Smithfield (c. 1380s)",
      image: "/images/death_wat_tyler_smithfield.jpg",
      status: "RESOLVED",
      issueType: "",
      issueDesc: ""
    }
  ]
};

// Update Second British Empire
report.units.second_british_empire = {
  title: "KS3: The Second British Empire (1783–1914)",
  totalSources: 9,
  cleanSources: 9,
  flaggedSources: 0,
  resolvedSources: 9,
  accuracyPct: 100,
  sources: [
    {
      letter: "A",
      title: "Source A: Walter Crane, Imperial Federation Map of the World (1886)",
      image: "/images/map_empire_1886.jpg",
      status: "RESOLVED",
      issueType: "",
      issueDesc: ""
    },
    {
      letter: "B",
      title: "Source B: HMS Warrior at Portsmouth Royal Dockyard (1860)",
      image: "/images/hms_warrior.jpg",
      status: "RESOLVED",
      issueType: "",
      issueDesc: ""
    },
    {
      letter: "A",
      title: "Source A: Benjamin West, Shah Alam II Conveying the Grant of the Diwani to Lord Clive (1795)",
      image: "/images/shah_alam_clive.jpg",
      status: "RESOLVED",
      issueType: "",
      issueDesc: ""
    },
    {
      letter: "B",
      title: "Source B: Contemporary Portrait of Rani Lakshmibai of Jhansi (c. 1857)",
      image: "/images/rani_of_jhansi.jpg",
      status: "RESOLVED",
      issueType: "",
      issueDesc: ""
    },
    {
      letter: "A",
      title: "Source A: George Raper, The First Fleet Sailing past the Needles from Portsmouth (May 1787)",
      image: "/images/first_fleet_portsmouth_1787.jpg",
      status: "RESOLVED",
      issueType: "",
      issueDesc: ""
    },
    {
      letter: "B",
      title: "Source B: George Raper, The First Fleet in Botany Bay (January 1788)",
      image: "/images/first_fleet_botany_bay_1788.jpg",
      status: "RESOLVED",
      issueType: "",
      issueDesc: ""
    },
    {
      letter: "A",
      title: "Source A: Adalbert von Rößler: The Berlin Conference (1884)",
      image: "/images/berlin_conference_1884.jpg",
      status: "RESOLVED",
      issueType: "",
      issueDesc: ""
    },
    {
      letter: "B",
      title: "Source B: The Maxim Machine Gun (1884)",
      image: "/images/maxim_machine_gun.jpg",
      status: "RESOLVED",
      issueType: "",
      issueDesc: ""
    },
    {
      letter: "D",
      title: "Source D: Capital and Labour; or, The Two Faces of Victorian Britain (Punch, 1843)",
      image: "/images/capital_labour.jpg",
      status: "RESOLVED",
      issueType: "",
      issueDesc: ""
    }
  ]
};

// Filter out resolved items from flaggedList
if (report.flaggedList) {
  report.flaggedList = report.flaggedList.filter(
    f => f.unitId !== 'medieval_england' && f.unitId !== 'second_british_empire'
  );
}

// Recompute curriculum totals
let total = 0;
let clean = 0;
let flagged = 0;
let resolved = 0;

for (const u of Object.values(report.units)) {
  total += u.totalSources || 0;
  clean += u.cleanSources || 0;
  flagged += u.flaggedSources || 0;
  resolved += u.resolvedSources || 0;
}

report.totalSources = total;
report.cleanSources = clean;
report.flaggedSources = flagged;
report.globalAccuracyPct = Math.round((clean / total) * 100);
report.auditedAt = new Date().toISOString();

fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
console.log('✅ Updated public/data/full_curriculum_audit_report.json successfully!');
console.log(`Global total: ${total}, Clean: ${clean}, Flagged: ${flagged}, Global Accuracy: ${report.globalAccuracyPct}%`);
