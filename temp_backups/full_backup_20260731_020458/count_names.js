const fs = require('fs');
const data = fs.readFileSync('./public/units/cme_new/data.js', 'utf8');

const names = [
  "Yasser Arafat", "Anwar Sadat", "Menachem Begin", "Yitzhak Rabin",
  "David Ben-Gurion", "Gamal Abdel Nasser", "Golda Meir", "Ariel Sharon",
  "Bill Clinton", "Jimmy Carter", "Yitzhak Shamir", "King Hussein", 
  "Moshe Dayan", "Anthony Eden", "Arthur Balfour", "Harry Truman",
  "Henry Kissinger", "Ehud Barak", "Benjamin Netanyahu", "Hafez al-Assad",
  "Theodor Herzl"
];

const counts = {};
names.forEach(name => {
  const aliases = [name];
  const parts = name.split(' ');
  const lastName = parts[parts.length - 1];
  
  if (["Arafat", "Sadat", "Begin", "Rabin", "Ben-Gurion", "Nasser", "Meir", "Sharon", "Shamir", "Dayan", "Eden", "Balfour", "Truman", "Kissinger", "Barak", "Netanyahu", "Herzl"].includes(lastName)) {
     aliases.push(lastName);
  }

  let searchWord = aliases.length > 1 ? aliases[1] : aliases[0];
  if (name === 'King Hussein') searchWord = 'Hussein';
  if (name === 'Bill Clinton') searchWord = 'Clinton';
  if (name === 'Jimmy Carter') searchWord = 'Carter';
  
  const regex = new RegExp(`\\b${searchWord}\\b`, 'gi');
  const matches = data.match(regex);
  if (matches) {
    counts[name] = matches.length;
  }
});

const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
sorted.forEach(([name, count]) => {
  console.log(`${name}: ${count}`);
});
