const fs = require('fs');

const audit = JSON.parse(fs.readFileSync('public/data/full_curriculum_audit_report.json', 'utf8'));

// Update water_and_sanitation sources with verified entries
audit.units.water_and_sanitation.sources = [
  {
    letter: "A",
    title: "Source A: Roman Lead Water Piping (Fistula Aquaria) in Roman Britain (c.75–100 AD)",
    image: "/images/roman_lead_water_pipe_bath.jpg",
    status: "RESOLVED",
    issueType: "",
    issueDesc: "Replaced Cupid on dolphin floor mosaic with authentic Roman lead water pipe (fistula) with folded seam from Roman Baths Museum."
  },
  {
    letter: "B",
    title: "Source B: Architectural Cutaway Reconstruction of a Roman Public Bathhouse (Thermae)",
    image: "/images/roman_thermae_cross_section.jpg",
    status: "RESOLVED"
  },
  {
    letter: "C",
    title: "Source C: Roman Bronze Strigils and Oil Flask (Aryballos)",
    image: "/images/roman_strigils.jpg",
    status: "RESOLVED"
  },
  {
    letter: "A",
    title: "Source A: Municipal Court Rolls of Norwich and Winchester (1312 & 1421)",
    image: "/images/medieval_court_roll_manuscript.png",
    status: "RESOLVED"
  },
  {
    letter: "B",
    title: "Source B: Waterworks Plan of Christ Church Priory, Canterbury (c.1165)",
    image: "/images/canterbury_waterworks_plan_1165.jpg",
    status: "RESOLVED"
  },
  {
    letter: "C",
    title: "Source C: Monastic Water Management at Titchfield Abbey (1232–1537)",
    image: "/images/titchfield/titchfield_estate_map_1605.jpg",
    status: "RESOLVED"
  },
  {
    letter: "A",
    title: "Source A: Technical Schematic of Sir John Harington’s Water Closet (1596)",
    image: "/images/harington_toilet.jpg",
    status: "RESOLVED"
  },
  {
    letter: "B",
    title: "Source B: Diary of Samuel Pepys (20 October 1660)",
    image: "/images/samuel_pepys_diary_manuscript_1660.png",
    status: "RESOLVED"
  },
  {
    letter: "C",
    title: "Source C: London Plague Broadsheet and Bill of Mortality (1665)",
    image: "/images/london_bill_of_mortality_1665.jpg",
    status: "RESOLVED"
  },
  {
    letter: "A",
    title: "Source A: \"A Court for King Cholera\" (Punch Magazine, 1852)",
    image: "/images/court_for_king_cholera.png",
    status: "RESOLVED"
  },
  {
    letter: "B",
    title: "Source B: Edwin Chadwick’s Report on the Sanitary Condition of the Labouring Population (1842)",
    image: "/images/chadwick_sanitary_report_1842.jpg",
    status: "RESOLVED"
  },
  {
    letter: "A",
    title: "Source A: \"Father Thames Introducing His Offspring to the Fair City of London\" (Punch, 1858)",
    image: "/images/father_thames_punch_1858.jpg",
    status: "RESOLVED"
  },
  {
    letter: "B",
    title: "Source B: Eastney Beam Engine House (1865)",
    image: "/images/water_local_eastney.jpg",
    status: "RESOLVED"
  },
  {
    letter: "C",
    title: "Source C: Louis Pasteur’s Swan-Neck Flask Experiments (1861)",
    image: "/images/pasteur_swan_neck.jpg",
    status: "RESOLVED"
  },
  {
    letter: "A",
    title: "Source A: Dr John Snow’s 1854 Cholera Spot Map of Soho",
    image: "/images/john_snow_cholera_map.jpg",
    status: "RESOLVED"
  },
  {
    letter: "B",
    title: "Source B: Dr John Snow’s Casebook on the Broad Street Brewery & Hampstead Case (1855)",
    image: "/images/snow_treatise_page_42_brewery.jpg",
    status: "RESOLVED",
    issueType: "",
    issueDesc: "Replaced duplicate spot map with authentic Page 42 facsimile from Snow’s 1855 treatise detailing Lion Brewery workmen."
  },
  {
    letter: "A",
    title: "Source A: Dr John Snow’s 'Grand Experiment' Comparative Mortality Table (1854)",
    image: "/images/snow_grand_experiment_table_1854.jpg",
    status: "RESOLVED",
    issueType: "",
    issueDesc: "Replaced duplicate spot map with authentic Table IX facsimile from Snow’s 1855 treatise documenting ninefold mortality difference."
  },
  {
    letter: "B",
    title: "Source B: Construction of London’s Intercepting Sewers (1861)",
    image: "/images/bazalgette_sewer.jpg",
    status: "RESOLVED"
  },
  {
    letter: "C",
    title: "Source C: Robert Koch’s Identification of the Cholera Bacillus under the Microscope (1884/1897)",
    image: "/images/cholera_microscope_gummelt_1897.jpg",
    status: "RESOLVED",
    issueType: "",
    issueDesc: "Replaced duplicate Pasteur swan-neck flask with authentic chromolithograph of Bacilli Kochii (Vibrio cholerae) under the microscope."
  }
];

fs.writeFileSync('public/data/full_curriculum_audit_report.json', JSON.stringify(audit, null, 2), 'utf8');
console.log('Updated full curriculum audit report JSON successfully!');
