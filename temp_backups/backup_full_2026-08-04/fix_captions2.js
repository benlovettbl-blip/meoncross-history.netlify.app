const fs = require('fs');
let data = fs.readFileSync('./public/units/cme_new/data.js', 'utf8');

// Lesson 2
data = data.replace(
  /"caption": "The emblem of UNRWA, the UN agency established in 1949 to support displaced Palestinian refugees\."/g,
  '"caption": "Palestinian refugees displaced by the 1948 war, who would later be supported by UNRWA."'
);

// Lesson 3
data = data.replace(
  /"caption": "British Prime Minister Anthony Eden, whose career was ruined by the failure of the Suez intervention\."/g,
  '"caption": "British Prime Minister Anthony Eden (center), whose career was ruined by the failure of the Suez intervention."'
);

// Lesson 5
data = data.replace(
  /"caption": "Arab leaders meeting in Khartoum in 1967, where they issued the famous 'Three No's': No peace, no recognition, no negotiation with Israel\."/g,
  `"caption": "Egyptian President Gamal Abdel Nasser, who led the Arab rejectionist stance at the 1967 Khartoum Conference with the famous 'Three No\\'s'."`
);
data = data.replace(
  /"caption": "The UN Security Council passing Resolution 242, establishing the 'Land for Peace' formula\."/g,
  '"caption": "UN Resolution 242, which established the \'Land for Peace\' formula for resolving the Arab-Israeli conflict."'
);

// Lesson 7
data = data.replace(
  /"caption": "Egyptian President Anwar Sadat making his historic and unprecedented visit to Israel in 1977\."/g,
  '"caption": "Egyptian President Anwar Sadat, who made a historic and unprecedented visit to Israel in 1977 to pursue peace."'
);
data = data.replace(
  /"caption": "The formal signing of the Egypt-Israel Peace Treaty in Washington, officially ending 30 years of war\."/g,
  '"caption": "Israeli Prime Minister Menachem Begin, who signed the historic Egypt-Israel Peace Treaty in 1979."'
);

// Lesson 8
data = data.replace(
  /"caption": "Yasser Arafat during the 1982 Lebanon War, shortly before the PLO was forced into exile in Tunisia\."/g,
  '"caption": "Yasser Arafat, leader of the PLO, whose organization was forced into exile in Tunisia following the 1982 Lebanon War."'
);

fs.writeFileSync('./public/units/cme_new/data.js', data, 'utf8');
console.log('Fixed captions!');
