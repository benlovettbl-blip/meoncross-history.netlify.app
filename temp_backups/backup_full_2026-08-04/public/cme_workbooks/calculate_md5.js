const crypto = require('crypto');

function getWikimediaPath(filename) {
  // Wikimedia Commons replaces spaces with underscores
  const cleanName = filename.replace(/ /g, '_');
  const hash = crypto.createHash('md5').update(cleanName).digest('hex');
  const a = hash[0];
  const ab = hash.substring(0, 2);
  return `https://upload.wikimedia.org/wikipedia/commons/${a}/${ab}/${cleanName}`;
}

const testFiles = [
  'GrandMufti.jpg',
  'Intifada palestine 1987.jpg',
  'Yasser Arafat in the 1990s cropped.jpg',
  'Abdullah I of Jordan cropped.jpg',
  'King Hussein of Jordan.jpg',
  'Mahmoud Abbas (World Economic Forum) (cropped).jpg',
  'Golda Meir 1969.jpg',
  'Ariel Sharon cropped.jpg',
  'Moshe Dayan 1955.jpg',
  'Yitzhak Rabin 1993.jpg',
  'Ernest Bevin 1945.jpg',
  'Yitzhak Shamir 1981.jpg',
  'Henry Kissinger 1973.jpg',
  'JimmyCarterPortrait2.jpg',
  'Menachem Begin cropped.jpg',
  'Palestinian refugees 1948.jpg',
  'Gamal Abdel Nasser 1968.jpg',
  'George Habash 1969.jpg',
  'Anwar Sadat 1978.jpg',
  'Mikhail Gorbachev 1987 (cropped).jpg',
  'Rabin Clinton Arafat 1993-09-13.jpg',
  'Egyptian forces crossing the Suez Canal on 7 October 1973.jpg',
  'Hosni Mubarak 1982.jpg',
  'Levi Eshkol.jpg',
  'Straits of Tiran.JPG',
  'UN Palestine Partition Plan 1947.svg',
  'Saddam Hussein 1979.jpg',
  'Western wall 1967.jpg',
  'Folke Bernadotte portrait.jpg',
  'Bill Clinton.jpg',
  'Sadat Carter Begin Camp David 1978.jpg',
  'Hafez al-Assad.jpg',
  'David Ben Gurion head cropped 1948.jpg',
  '1949 Armistice Agreements Map.png',
  'Gamal Abdel Nasser nationalizing the Suez Canal 1956.jpg',
  'George H. W. Bush presidential portrait cropped.jpg'
];

testFiles.forEach(f => {
  console.log(`Original: ${f} -> Calculated: ${getWikimediaPath(f)}`);
});
